from bs4 import BeautifulSoup
import geocoder
import re

f = open('./slingshot_output.html', 'r')
html_doc = f.read()
soup = BeautifulSoup(html_doc, 'html.parser')
contact_list = soup.find_all('dl')


def geocode1(address):
  g = geocoder.mapzen(address)
  latlng = g.latlng
  return latlng

def geocode2(address) :
  g = geocoder.google(address)
  latlng = g.latlng
  return latlng

def geocode3(address):
  g = geocoder.freegeoip(address)
  latlng = g.latlng
  return latlng

def get_contact_list(listing):
  dt_list = listing.find_all('dt')
  dd_list = listing.find_all('dd')
  if len(dd_list) != len(dt_list):
    print ("lists not equal")
    print(dt_list[0].text)

  for x in range (len(dd_list)):
    headline = dt_list[x].text
    if re.match('Neverland', headline) is not None:
      pass
    contact_info = dd_list[x].text
    if not headline or not contact_info:
      print ('No headline and/or contact. head:',headline, " contact: ", contact_info)
      return
    lat_lng = geocode1(contact_info)
    if not lat_lng or len(lat_lng) < 1:
      lat_lng = geocode2(contact_info)
      if not lat_lng or len(lat_lng) < 1:
        lat_lng = geocode3(contact_info)


    if not lat_lng or len(lat_lng) < 1:
      print(headline, '\t', contact_info, '\t', 'NoGeocode')
    else:
      print(headline, '\t', contact_info, '\t', lat_lng)
  return 1+1

def is_defunct(listing):
  if listing.find(class_ = "valid"):
    ret = False

  elif listing.find(class_ = "defunct"):
    ret = True

  else:
    ret = False
  return ret

for listing in contact_list:
  if is_defunct(listing):
    continue
  get_contact_list(listing)
