import pandas as pd
import numpy as np
import sys 
import json
filename = 'EcommerceCustomers.csv'

customers = pd.read_csv ('./public/uploads/' + filename)

from sklearn.linear_model import LinearRegression

lm = LinearRegression()
y = customers['Yearly Amount Spent']

X = customers[['Avg. Session Length', 'Time on App', 'Time on Website', 'Length of Membership']]


lm.fit(X,y)

f =['Avg. Session Length', 'Time on App', 'Time on Website', 'Length of Membership']

data = {}
data["customers"] = []
d = 0
for i in lm.coef_:
    
    data["customers"].append({"name" : f[d], "value": i})
    d += 1

with open('./data/resuilt.json', 'w') as outfile:
    json.dump(data, outfile)

print(lm.coef_)




