from random import random
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from flask import Flask
from flask import jsonify

app = Flask(__name__)

def get_rand_info():
    ua = ['Mozilla/5.0 (Windows NT 4.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36', 
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36', 
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', 
      'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', 
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240', 
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', 
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', 
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36']

    return ua[(random()*(len(ua))).__floor__()]

def initialize_param():
    opts = Options()
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-extensions")
    opts.add_argument(f'--user-agent={get_rand_info()}')
    opts.add_argument("--headless")
    return opts

def organize(loc_name_lis:list, info_lis:list):
    assert len(loc_name_lis)==len(info_lis)
    dictionary = {}
    for i in range(len(info_lis)):
        dictionary[loc_name_lis[i]] = info_lis[i]
    return dictionary

def remove_dir(lis:list):
    temp = []
    for i in lis:
        if i.get_attribute("textContent").strip()=="Directions":
            pass
        else:
            temp.append(i)
    return temp

def scrape(loc:str): 
    driver = webdriver.Chrome(options = initialize_param())

    driver.get(f"https://www.hud.gov/findshelter/Search?search-for=shelter&place={loc}&keyword=")
    name_lis = driver.find_elements(By.XPATH, "//ul[@id='results']/li/h6")
    info_lis = driver.find_elements(By.XPATH, "//ul[@id='results']/li/ul/li")

    for i in range(len(name_lis)): 
        name_lis[i] = name_lis[i].get_attribute("textContent")

    parent = info_lis[0].find_element(By.XPATH, "..")
    group = []
    temp = []
    count = 1
    info_lis = remove_dir(info_lis)
    for i in range(len(info_lis)):
        x = info_lis[i]
        if i==(len(info_lis)-1):
            count+=1
            temp.append(x.get_attribute("textContent"))
            group.append(temp)
        if parent == x.find_element(By.XPATH, ".."):
            temp.append(x.get_attribute("textContent"))
        else:
            count+=1
            parent = x.find_element(By.XPATH, "..")
            group.append(temp)
            temp = []
            temp.append(x.get_attribute("textContent"))
    return organize(name_lis, group)

@app.route("/shelter_loc/<loc>")
def shelter_loc(loc):
    return jsonify(scrape(loc))

if __name__ == "__main__":
    shelter_loc("irvine")