def create_alert(risk_score: int):
    
    if risk_score >= 70:
        return {
            "severity": "high",
            "message": "Potential fraud detected"
        }

    if risk_score >= 30:
        return {
            "severity": "medium",
            "message": "Suspicious activity detected"
        }

    return None