import joblib
import numpy as np

model = joblib.load("ml/fraud_model.pkl")
scaler = joblib.load("ml/scaler.pkl")
feature_columns = joblib.load("ml/feature_columns.pkl")

def predict_fraud(data):
    features = {col: 0 for col in feature_columns}
    features["day_of_week"] = data["day_of_week"]
    features["hour"] = data["hour"]
    features["amount"] = data["amount"]
    features["is_new_device"] = int(data["is_new_device"])
    features["distance_from_home_km"] = (data["distance_from_home_km"])
    features["is_international"] = int(data["is_international"])
    features["txn_velocity_1h"] = (data["txn_velocity_1h"])
    features["account_age_days"] = (data["account_age_days"])
    category = (f"merchant_category_{data['merchant_category']}")
    if category in features:
        features[category] = 1
    X = np.array(list(features.values())).reshape(1, -1)
    X = scaler.transform(X)
    prediction = model.predict(X)
    probability = model.predict_proba(X)[0][1]
    return {
        "prediction": int(prediction[0]),
        "probability": float(probability)
    }