from server.shareables.models import Shareable, Time, Thing
import re

class FNB_Entry:
  def  __init__(self, data):


    pass


fnb_list_file = open('../results/nyfnb.txt', 'r')
for line in fnb_list_file:
  m = re.search('\$(\w*)\s*([\w\W]*)', line)
  fnb_dict = {}
  if m is not None:
    print ("match")
    k = (m.group (1))
    v = m.group(2).strip()
    if re.search('^:', v):
      v = v[1:]
    if (k=="headline"):
      print("Headline")

    pass
