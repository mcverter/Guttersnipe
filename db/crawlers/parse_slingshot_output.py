from bs4 import BeautifulSoup
import geocoder

f = open('./slingshot_output.html', 'r')
html_doc = f.read()
soup = BeautifulSoup(html_doc, 'html.parser')
contact_list = soup.find_all('dl')

def geocode(address) :
  g = geocoder.google(address)
  latlng = g.latlng
  return latlng

def get_contact(listing):
  headline = listing.find('dt').text
  contact_info = listing.find('dd').text
  lat_lng = geocode(contact_info)
  print(headline, '\n', contact_info, '\n\n')
  return 1+1

def is_defunct(listing):
  return False

for listing in contact_list:
  if is_defunct(listing):
    continue
  get_contact(listing)
