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

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=101)

lm.fit(X_train,y_train)

f =['Avg. Session Length', 'Time on App', 'Time on Website', 'Length of Membership']
t = ['minute','minute','minute', 'year']
data = {}
data["customers"] = []
d = 0
for i in lm.coef_:
    
    data["customers"].append({"name" : f[d], "value": i, "unit": t[d]})
    d += 1

with open('./data/result.json', 'w') as outfile:
    json.dump(data, outfile)

predictions = lm.predict(X_test)
predict= pd.DataFrame(predictions)

resI =[]
for i in range(y_test.size):
    resI.append(i)
y_test = y_test.reset_index()

y_test = y_test.drop(columns=['index'])
y_test.to_json(path_or_buf='./data/y.json', orient='columns')

predict.to_json(path_or_buf='./data/predict.json', orient='columns')

print(predict)
print(y_test)



