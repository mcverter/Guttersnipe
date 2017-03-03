from bs4 import BeautifulSoup

f = open('./slingshot_output.html', 'r')
html_doc = f.read()
soup = BeautifulSoup(html_doc, 'html.parser')
contact_list = soup.find_all('dl')

def get_contact(contact_list):
  dt = contact_list

  name = 'dt'
  info = 'dd'
  dd = contact_list

def is_defunct():
  pass

for listing in contact_list:
  if is_defunct(listing):
    continue
  get_contact(listing)

print (contact_list)

