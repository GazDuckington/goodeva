from pathlib import Path

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib


DATA_PATH = Path(__file__).parent.parent / "data" / "sales_data.csv"
MODEL_DIR = Path(__file__).parent / "model"
MODEL_PATH = MODEL_DIR / "classifier.joblib"


def train_model() -> dict:
    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    df = pd.read_csv(DATA_PATH)

    X = df[["jumlah_penjualan", "harga", "diskon"]]
    y = df["status"].map({"Laris": "laris", "Tidak": "tidak laris"})

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, output_dict=True)

    joblib.dump(model, MODEL_PATH)

    return {
        "status": "success",
        "accuracy": accuracy,
        "model_path": str(MODEL_PATH),
        "report": report,
    }


if __name__ == "__main__":
    result = train_model()
    print(result)
