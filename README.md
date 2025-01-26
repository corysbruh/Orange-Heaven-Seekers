# ShelterSCAN

## Inspiration

Given the rising cases of national emergencies, many have experienced their homes being eradicated and often times, resulting in homelessness. With this mass dilemma, we hope to migiate it with already established organization offering a helping hand for those who are in need. 

## What It Does

Shelter Scan is a simple but sophisticated web application that allows the user to input their location or even somebody elses and will be given a ranked list of the closest emergency shelters. While browsing through the selection, you can get a real-time view of the driving route going from point A to point B on a map that is provided and synced with the ranked selection. 

## How We Built It

The main powerhouse of this web application is provided by Google's Map API Module and the databases provided by the U.S Department of Housing and Urban Development (U.S HUD). With the addition of Python's selenium and Flask libararies, we were able to extract and analyze the databases from the U.S HUB and convert that mass data into JSON file types. In addition, we implemented various API's provided in the Map API module, which include, but not limited to: Geocoder API, Places API, Routes API, and Javascript Map API. Which were used for unlocking features such as retreiving the longitude and latitude of certain locations and to compare it with the coordinates of the surrounding establised-shelters. With that, we were able to rank them based on how close they were to a given location by the user. For the front end, we relied heavily on HTML and Javascript, while utilizing CSS for our quirky, yet professional styling on the web page. 

## Challenges We Ran Into

- Timing problem with the crawler via Selenium and not being able to utilize Flask for our web application. (Python End)
- Frontend not being able to sync up with backend, which had us in panick mode for a bit :/.

## Accomplishments That We're Proud Of

- Given the limited time, we are proud that we were able to implement any API successfully, given that this was our first time trying to do something with a API.
- The ranking of the shelters based on the users' input took a while and a bunch of debugging that we strongly believe it deserves to be highlighted.
- Implementing the selenium module and utilizing flask for the first time to successfully crawl and scrap the large databases, and to convert them into managable JSON files.
- Our beautiful styles on the frontend of the project, as it was a total game changer compared to what we had planned.
- Lastly, the unique feature and surprise cameo of our favorite basketball player!

## What We Learned

- Time managment is key to a successful project. Even though *MANY* say that, it truely is a blessing to have good time management. Hence, we now know to plan ahead and try the hardest to future-proof.
- While we did learn a far share of implmentations of API, python modules, and even how to create an AI video, we definitely were able to sharpen our knowledge on what was initially familar with us.

## What's Next For Shelter Scan

- Make it on a larger scale; connect with bigger organizations/governments throughout the world and be able to provide this information to the masses.
- Implement other useful features, like the space avalability, what unique services are offered, and such.
- Establish third-party connections such as RideShare, Uber, and other local facilities to help contribute to helping the need.
