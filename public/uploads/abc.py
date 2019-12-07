import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

customers = pd.read_csv('EcommerceCustomers.csv')

X= customers[['Avg. Session Length', 'Time on App',
       'Time on Website', 'Length of Membership']]

y= customers ['Yearly Amount Spent']

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=101)

# X_train = pd.concat([X_train,y_train], axis = 1) 
# X_test = pd.concat([X_test,y_test], axis = 1) 
# X_train.to_csv('train.csv')
# X_test.to_csv('test.csv')
from sklearn.linear_model import LinearRegression

lm = LinearRegression()

lm.fit(X_train, y_train)

print(lm.coef_)

predictions = lm.predict(X_test)

from sklearn import metrics

print (metrics.r2_score(y_test, predictions))

sns.distplot(y_test-predictions)

plt.show()