from random import random
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from flask import Flask
from flask import jsonify
from time import sleep

app = Flask(__name__)

def check_loaded(path:str, dri:webdriver.Chrome):
    while True:
        try:
            ele = dri.find_elements(By.XPATH, path)
            if len(ele)==0:
                raise ValueError("Nothing found")
            return ele
        except ValueError as e:
            print(e)
            sleep(1)

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
    organized = []
    for i in range(len(info_lis)):
        dix = {}
        dix["name"] = loc_name_lis[i].get_attribute("textContent")
        for num in info_lis[i]:
            dix[num.get_attribute("class")] = num.get_attribute("textContent")
        organized.append(dix)
    return organized

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

    name_lis = check_loaded("//ul[@id='results']/li/h6", driver)
    info_lis = check_loaded("//ul[@id='results']/li/ul/li", driver)

    parent = info_lis[0].find_element(By.XPATH, "..")
    group = []
    temp = []
    info_lis = remove_dir(info_lis)
    for i in range(len(info_lis)):
        x = info_lis[i]
        if i==(len(info_lis)-1):
            temp.append(x)
            group.append(temp)
        if parent == x.find_element(By.XPATH, ".."):
            temp.append(x)
        else:
            parent = x.find_element(By.XPATH, "..")
            group.append(temp)
            temp = []
            temp.append(x)
    final = {"dix":organize(name_lis, group)}
    print(final)
    return final

@app.route("/shelter_loc/<loc>", methods=['GET'])
def shelter_loc(loc):
    res = jsonify(scrape(loc))
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

if __name__ == "__main__":
    shelter_loc("irvine")