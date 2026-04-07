import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ml.predictor import predict
from ml.trainer import train_model
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


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
