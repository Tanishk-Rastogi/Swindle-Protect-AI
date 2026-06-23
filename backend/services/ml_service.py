from ml.predict import predict_fraud


def get_ml_result(transaction):
    merchant_category = (
        transaction.merchant_category
        .strip()
        .lower()
        .replace(" ", "_")
        .replace("-", "_")
    )
    ml_input = {
        "day_of_week": transaction.day_of_week,
        "hour": transaction.hour,
        "amount": transaction.amount,
        "is_new_device": transaction.is_new_device,
        "distance_from_home_km": transaction.distance_from_home_km,
        "is_international": transaction.is_international,
        "txn_velocity_1h": transaction.txn_velocity_1h,
        "account_age_days": transaction.account_age_days,
        "merchant_category": merchant_category
    }

    return predict_fraud(ml_input)