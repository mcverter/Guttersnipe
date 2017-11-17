import re
import geocoder
import time
from server.create_sqlalchemy.create_shareable_from_json import create_shareable

def geocode1(address):
  print("mapzen")
  g = geocoder.mapzen(address)
  latlng = g.latlng
  return latlng

def geocode2(address) :
  print("google")
  g = geocoder.google(address)
  latlng = g.latlng
  return latlng

def create_shareable_from_report(report):
  if report:
    if 'Name' in report and \
        'Where' in report and \
        'location' in report and \
        report['location'] != "NoGeocode":
      shareable = {}
      shareable['headline'] = report['Name']
      shareable['summary'] = report['Summary'] if 'Summary' in report else None

      shareable['thing'] = {}
      shareable['thing']['main_type'] = 'food'
      shareable['thing']['subtypes'] = ['dumpster']
      shareable['thing']['description_what'] = report['What'] if 'What' in report else None
      shareable['thing']['description_how'] = report['How'] if 'How' in report else None


      shareable['space'] = {}
      shareable['space']['canonical_address'] = report['Where'] if 'Where' in report else None
      shareable['space']['latitude'] = report['location'][0]
      shareable['space']['longitude'] = report['location'][1]
      shareable['space']['notes'] = report['SpaceNotes'] if 'SpaceNotes' in report else None

      shareable['time'] = {
        'time_notes' : report['When'] if 'When' in report else None,
        'calendar': {'events': None}
      }
      create_shareable(shareable)


foo = 1 + 1


def geocode_dumpster(hash_entry):
  if 'Name' in hash_entry and 'Where' in hash_entry:
    address = hash_entry['Name'] + " " + hash_entry['Where']
    lat_lng = None # geocode1(address)
    if not lat_lng or len(lat_lng) < 1:
      lat_lng = geocode2(address)
      print("giigle", lat_lng)
      time.sleep(3)
    if lat_lng:
      hash_entry['location'] = lat_lng
    else:
      hash_entry['location'] = 'NoGeocode'
    return hash_entry
  print('no data', hash_entry)



dumpster_list_file = open ('./dumpster_raw.txt')


dumpster_reports = []
fnb_dict = {}
full_file = dumpster_list_file.read()
dumpster_entries = full_file.split("\n\n")
for entry in dumpster_entries:
  dumpster_report = {}
  hash_entries = entry.split('\n')
  for hash_entry in hash_entries:
    m = re.match('^(\w*):\s*([\w\W]*)', hash_entry)
    if m :
      dumpster_report[m.group(1) ] = m.group(2)
  dumpster_report = geocode_dumpster(dumpster_report)
  # dumpster_reports.append(dumpster_report)
  create_shareable_from_report(dumpster_report)

#for report in dumpster_reports:

'''
for line in dumpster_list_file:
  m = re.search('^(\w*):\s*([\w\W]*)', line)
  if m is not None:
    k = m.group(1)
    v = m.group(2).strip()
    if k == "Name":
      if 'Name' in fnb_dict:
        address = fnb_dict['Name'] + " " + fnb_dict['Where'] + ", New York, NY USA"
        lat_lng = geocode1(address)
        if not lat_lng or len(lat_lng) < 1:
          lat_lng = geocode2(address)
          print("giigle", lat_lng)
          time.sleep(10)

      fnb_dict['location'] = lat_lng


      copy = fnb_dict.copy()
      dumpster_reports.append(copy)
      fnb_dict = {}

    fnb_dict[k] = v

print (dumpster_reports)
'''
