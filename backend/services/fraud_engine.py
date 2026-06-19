def calculate_risk(amount: float):
    risk = 0
    reasons = []
    if amount > 10000:
        risk += 40
        reasons.append("High amount")
    is_fraud = risk >= 70
    return {
        "risk_score": risk,
        "is_fraud": is_fraud,
        "reasons": reasons
    }