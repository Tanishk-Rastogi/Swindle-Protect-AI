from config.constants import (ML_RISK_WEIGHT, MAX_RISK_SCORE, RISK_THRESHOLD)


def calculate_final_risk(fraud, ml_result):

    ml_probability = ml_result["probability"]
    ml_risk = int(ml_probability * ML_RISK_WEIGHT)
    fraud["risk_score"] += ml_risk
    fraud["risk_score"] = min(fraud["risk_score"], MAX_RISK_SCORE)

    if ml_probability >= 0.5:
        fraud["reasons"].append(
            f"ML model detected suspicious activity ({ml_probability:.2f})"
        )

    fraud["is_fraud"] = (fraud["risk_score"] >= RISK_THRESHOLD)
    return fraud