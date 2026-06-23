def calculate_risk(transaction):
    
    risk = 0

    reasons = []

    if transaction.amount > 10000:
        risk += 25
        reasons.append(
            "High amount transaction"
        )

    if transaction.is_new_device:
        risk += 10
        reasons.append(
            "New device detected"
        )

    if transaction.is_international:
        risk += 15
        reasons.append(
            "International transaction"
        )

    if transaction.txn_velocity_1h > 5:
        risk += 10
        reasons.append(
            "High transaction velocity"
        )

    if transaction.distance_from_home_km > 50:
        risk += 10
        reasons.append(
            "Far from home location"
        )

    if transaction.account_age_days < 30:
        risk += 10
        reasons.append(
            "New account"
        )

    return {
        "risk_score": risk,
        "is_fraud": False,
        "reasons": reasons
    }