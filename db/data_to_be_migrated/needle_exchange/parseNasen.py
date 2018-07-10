from bs4 import BeautifulSoup
import re

import os
import glob

'''
				 processAddress(40.70079445838928, -73.80700059235096);



			<h3>Contact information</h3>

					<h4>Website</h4>
					<p><a href="http://www.acqc.org/" rel="nofollow">www.acqc.org</a></p>


					<h4>Phone number</h4>
					<p>

							<strong>Primary:</strong> (718) 896-2500<br>

					</p>



				<h4>Email Address</h4>
					<p>

						<strong>Information:</strong> <a href="mailto:evasquez@acqc.org">evasquez@acqc.org</a><br>

					</p>





				<h3>Point of contact</h3>

					<div class="program-poc-enry">
						<h4>Erika Vasquez</h4>
						<p>




					</p></div>





				<h3>Address</h3>
					<div id="address_container" class="row">
						<div id="address_set">

							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title text-info">PRIMARY ADDRESS</h4>
								</div>
								<div class="panel-body">
									<div class="alert alert-info" role="alert">In auto shop parking lot</div>

									<p>
										147-23 Archer Avenue<br>

										Jamaica, NY 11432<br>
										<a href="https://bing.com/maps/default.aspx?where1=147-23%20Archer%20Avenue,%20Jamaica,%20NY%2011432">Get directions</a>
									</p>
								</div>
							</div>

						</div>
					</div>




			</div> <!-- Close details container div -->


		</div>
    ID	Headline	Summary	Thing	Space	Time
    Thing id	What	How	MainType	SubTypes	Tags	Notes
    Space SpaceID	Longitude	Latitude	POINT	notes
    Time  ID	Notes	ScheduleID
		MainType	Subtypes	Tags	Schedule	Events	RecurrenceRules


'''

def parseNasenFile(file_path):
  fh = open(file_path, 'r')
  contents = fh.read()
  soup = BeautifulSoup(contents, 'html.parser')
  match_obj = re.search('processAddress\((\d\d\.\d*), (-\d\d\.\d*)', contents)
  latitude = match_obj.group(1)
  longitude = match_obj.group(2)
  headline = soup.title.string
  h4s = soup.find_all('h4')
  phone = ''
  website = ''
  email = ''
  for h4 in h4s:
    text = h4.string
    if text == 'Website':
      website = h4.next_sibling.next_sibling.find('a')['href']
    elif text == 'Phone number':
      phone = h4.next_sibling.next_sibling.contents[2]
    elif text == 'Email Address':
      email = h4.next_sibling.next_sibling.contents[3].string
  summary = "North American Syringe Exchange Network (NASEN)"
  what="Needle Exchange"
  contact_person = soup.find("div", "program-poc-enry").find("h4").string
  how = "Talk to " + contact_person
  type="medical"
  subtypes=["needle exchange"]
  space= ''
    #"POINT (" + latitude + ', ' + longitude +')'
  canonical_address = re.sub(" \s*", " ", soup.find(id="address_container").find("p").text \
         .replace("Get directions", "").replace("\n", "").replace("\t", " "))

  time = ''
  events = ''
  time_notes = ''
  output = '''
      {
    "headline" : "%s",
    "summary"  : "%s",
    "notes"    : "",
    "number_ratings" : 0,
    "total_ratings" : 0,
    "thing"    : {
      "description_how" : "%s",
      "description_what" : "Needle Exchange",
      "main_type": "medical",
      "subtypes": [ "needle exchage"],
      "tags": [],
      "notes": ''
    },
    "space"    : {
      "longitude" : "%s",
      "latitude": "%s",
      "canonical_address": "%s",
      "alternate_names": [],
      "notes": ""
    },
    "time"    : {
      "notes" : "not actual dates",
      "calendar" : {
        "events": [
          {
            "dt_start": "2017-01-01T18:00:00",
            "dt_end": "2017-01-01T22:00:00",
            "tz_id": "American/NewYork",
            "recurrence_rule" : {
              "freq": "weekly",
              "byDay": "mo",
              "interval": "1"
            }
          }
        ]
      }
    }
  },

    '''% (headline, summary, how, longitude, latitude, canonical_address)

  print (output)

  '''
  print ('headline ', headline,
         ' website ', website, 'phone', phone, 'email', email,
         '\nsummary', summary, 'what', what, 'how', how,
        '\nlongitude', longitude, 'latitude', latitude, 'subtypes', subtypes,
         '\ntypes', type, 'canonical address', canonical_address)
  '''
  1+1
files = glob.glob('*.html')
for file_path in files:
  parseNasenFile(file_path)
