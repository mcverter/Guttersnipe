from bs4 import BeautifulSoup
import geocoder
import re
import time
import os
import glob
import sys

out = ''

all_lines = {}
path = '../results/fnb/*html'

for filename in glob.glob(path):
  print (filename)
  html_doc = open(filename, 'r')
  print_out = False

  for line in html_doc:
    if re.search('<b>', line, re.IGNORECASE) is not None:
      print_out = True
    if re.search('size="?2"?', line):
      continue
    if print_out :
      sys.stdout.write(line)
    #   if re.match('update', line, re.IGNORECASE | re.MULTILINE) is not None:
    # if line not in all_lines:
    #out += line
    #all_lines[line] = True

#print (out)
