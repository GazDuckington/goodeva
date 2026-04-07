FROM python:3.12-slim

WORKDIR /app

COPY backend/ ./
COPY ml/trainer.py ml/predictor.py ml/__init__.py ./ml/
COPY ml/model ./ml/model

RUN pip install "numpy>=2.4.4" "pandas>=3.0.2" "scikit-learn>=1.6.1" "joblib>=1.4.2" "fastapi[standard]>=0.135.3"

EXPOSE 8000

CMD ["python", "main.py"]
