import pandas as pd
import numpy as np

filename = 'EcommerceCustomers.csv'

customers = pd.read_csv ('./public/uploads/' + filename)
customers = customers[['Avg. Session Length', 'Time on App', 'Time on Website']]
mean = customers.mean()
total = len(customers.axes[0])

ser = pd.Series([total], index =["Total Users"])
a = ser.append(mean)
a.to_json(path_or_buf='./data/mean.json', orient='split')

print(a)