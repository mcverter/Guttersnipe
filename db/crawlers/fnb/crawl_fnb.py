
import wget
import os
import re

BASE_URL = "https://foodnotbombs.net/new_site/map/"
fnb_list_file = open('../fnb/fnb_list.txt', 'r')
states = []
for line in fnb_list_file:
  if re.match('.*\.html', line):
    states.append(line.replace('\n', ''))
print(states)
for state in states:
  url = BASE_URL + state
  filename = wget.download(url)
  os.rename(filename, state + "_fnb.html")
