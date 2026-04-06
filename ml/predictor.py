from pathlib import Path

import joblib


MODEL_PATH = Path(__file__).parent / "model" / "classifier.joblib"


def predict(jumlah_penjualan: int, harga: int, diskon: int) -> dict:
    if not MODEL_PATH.exists():
        return {"error": "Model not found. Please train the model first."}

    model = joblib.load(MODEL_PATH)

    X = [[jumlah_penjualan, harga, diskon]]
    prediction = model.predict(X)[0]

    return {"prediction": prediction}


if __name__ == "__main__":
    result = predict(jumlah_penjualan=100, harga=50000, diskon=10)
    print(result)
