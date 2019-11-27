import pandas as pd
import numpy as np
import json

last = pd.read_csv ('./public/uploads/Lastweek.csv')
now = pd.read_csv ('./public/uploads/Now.csv')
li = ['Avg. Session Length', 'Time on App', 'Time on Website']
last = last[li]
now = now[li]
liup = ["Total Users Visits"]
for k in li:
    liup.append(k)
meanlast = last.mean()
meannow = now.mean()
totallast = len(last.axes[0])
totalnow = len(now.axes[0])
ser = pd.Series([totallast], index =["Total Users Visits"])
l = ser.append(meanlast)
ser = pd.Series([totalnow], index =["Total Users Visits"])
n = ser.append(meannow)
n.to_json(path_or_buf='./data/mean.json', orient='split')


def per(A, B):
    return float(100*(A - B)/A)

data = []
for key in liup:
    p = per(l[key], n[key])
    if(p < 0):
        p *= -1
        data.append({"per" : p, "status": "in"})
    else:
        data.append({"per" : p, "status": "de"})

with open('./data/week.json', 'w') as outfile:
    json.dump(data, outfile)



# ser = pd.Series([total], index =["Total Users"])
# a = ser.append(mean)
# a.to_json(path_or_buf='./data/mean.json', orient='split')

print(n)