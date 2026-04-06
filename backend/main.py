from trainer import train_model
from pydantic import BaseModel
from predictor import predict
from fastapi import FastAPI
import uvicorn
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "ml"))


app = FastAPI()


class PredictRequest(BaseModel):
    jumlah_penjualan: int
    harga: int
    diskon: int


@app.get("/")
def root():
    return {"message": "Goodeva API is running"}


@app.post("/predict")
def predict_sales(request: PredictRequest) -> dict:
    return predict(request.jumlah_penjualan, request.harga, request.diskon)


@app.post("/retrain")
def retrain() -> dict:
    return train_model()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
