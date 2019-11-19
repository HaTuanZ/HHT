import pandas as pd
import numpy as np
import sys 
import json
import seaborn as sns
filename = sys.argv[1]

customers = pd.read_csv ('./uploads/' + filename)

from sklearn.linear_model import LinearRegression

lm = LinearRegression()
y = customers['Yearly Amount Spent']

X = customers[['Avg. Session Length', 'Time on App', 'Time on Website', 'Length of Membership']]


#sns.jointplot(x='Avg. Session Length', y='Yearly Amount Spent', data=customers)
#sns.jointplot(x='Time on App', y='Yearly Amount Spent', data=customers)
#sns.jointplot(x='Time on Website', y='Yearly Amount Spent', data=customers)
# pl = sns.lmplot(x='Length of Membership', y='Yearly Amount Spent', data=customers)
# pl.savefig("output.png")
#sns.pairplot(customers)
customers[['Avg. Session Length', 'Time on App', 'Time on Website', 'Length of Membership','Yearly Amount Spent']].describe().to_csv("./public/my_description.csv")
lm.fit(X,y)

f =['Avg. Session Length', 'Time on App', 'Time on Website', 'Length of Membership']

data = {}
data["customers"] = []
d = 0
for i in lm.coef_:
    
    data["customers"].append({"name" : f[d], "value": i})
    d += 1

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)
print(lm.coef_)