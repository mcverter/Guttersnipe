
import wget
import os

BASE_URL = "http://slingshot.tao.ca/contacts/#st-us-"

states = ('al', 'ak', 'az', 'ak', 'ca', 'co', 'ct', 'dc',
          'fl', 'ga, hi', 'id', 'il', 'in', 'io', 'ks', 'ky',
          'la', 'me', 'md', 'ms', 'mi', 'mn', 'ms', 'mo',
          'mt', 'nb', 'nv', 'nj', 'nm', 'ny', 'nc', 'nd',
          'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'te',
          'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy')

for state in states:
  url = BASE_URL + state
  filename = wget.download(url)
  os.rename(filename,
            '../results/slingshot/' + state + "_slingshot.html")
