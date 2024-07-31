import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta
import sys

def load_and_preprocess_data(file_path):
    # Load your period data
    data = pd.read_csv(file_path)  # CSV file with columns: user_id, period_start_date, period_end_date
    
    # Preprocess the data
    data['period_start_date'] = pd.to_datetime(data['period_start_date'])
    data['period_end_date'] = pd.to_datetime(data['period_end_date'])
    data['period_duration'] = (data['period_end_date'] - data['period_start_date']).dt.days + 1

    # Calculate intervals
    data['days_between_periods'] = data['period_start_date'].diff().dt.days
    data = data.dropna()

    return data

def train_model(data):
    # Features and target
    X = data[['days_between_periods']].values
    y = data['period_duration'].values

    # Train model
    model = LinearRegression()
    model.fit(X, y)
    return model

def predict_next_period(model, last_period_start, last_period_end, days_since_last_period):
    last_period_start = pd.to_datetime(last_period_start)
    last_period_end = pd.to_datetime(last_period_end)
    next_period_start = last_period_end + timedelta(days=days_since_last_period)
    next_period_duration = model.predict([[days_since_last_period]])[0]
    next_period_end = next_period_start + timedelta(days=next_period_duration - 1)
    return next_period_start, next_period_end

def main():
    # Read input arguments
    if len(sys.argv) != 4:
        print("Usage: python predict.py <last_period_start> <last_period_end> <days_since_last_period>")
        sys.exit(1)

    last_period_start = sys.argv[1]
    last_period_end = sys.argv[2]
    days_since_last_period = int(sys.argv[3])

    # File path to your period data
    file_path = 'period_data.csv'

    # Load and preprocess data
    data = load_and_preprocess_data(file_path)

    # Train model
    model = train_model(data)

    # Predict the next period
    next_period_start, next_period_end = predict_next_period(model, last_period_start, last_period_end, days_since_last_period)
    print(f"{next_period_start.date()}, {next_period_end.date()}")

if __name__ == "__main__":
    main()