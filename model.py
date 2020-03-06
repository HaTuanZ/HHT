import pandas as pd
import numpy as np
import sys 
import json
import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True
#mean



def per(A, B):
    return float(100*(A - B)/A)


@app.route('/getresult', methods=['GET'])
def home():

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
    t = ['đơn vị','đơn vị','đơn vị', 'đơn vị']
    data = {}
    data["customers"] = []
    d = 0
    for i in lm.coef_:
        
        data["customers"].append({"name" : f[d], "value": i, "unit": t[d]})
        d += 1


    predictions = lm.predict(X_test)

    from sklearn import metrics


    predict= pd.DataFrame(predictions)

    resI =[]
    for i in range(y_test.size):
        resI.append(i)
    y_test = y_test.reset_index()

    y_test = y_test.drop(columns=['index'])
    y_test = y_test.to_json(orient='columns')

    predict = predict.to_json(orient='columns')

    return {"data": data, "y_test": y_test, "predict": predict}

@app.route('/getmean', methods=['GET'])
def getmean():
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
        n.to_json(orient='split')
    mean = []
    for key in liup:
        p = per(l[key], n[key])
        if(p < 0):
            p *= -1
            mean.append({"per" : p, "status": "in"})
        else:
            mean.append({"per" : p, "status": "de"})
    return mean
app.run()




