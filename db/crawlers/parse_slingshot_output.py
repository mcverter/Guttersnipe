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
  if not headline or not contact_info:
    return
  lat_lng = geocode(contact_info)
  if not lat_lng or len(lat_lng) < 1:
    return
  print(headline, '\n', contact_info, '\n', lat_lng,'\n\n')
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
  get_contact(listing)
