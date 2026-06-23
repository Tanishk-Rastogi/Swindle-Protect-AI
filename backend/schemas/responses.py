from pydantic import BaseModel


class TransactionResponse(BaseModel):

    message: str

    rule_score: int

    ml_prediction: int

    ml_probability: float

    final_risk_score: int

    is_fraud: bool

    reasons: list[str]

    alert: dict | None