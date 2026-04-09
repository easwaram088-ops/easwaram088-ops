# InflationPulse AI 🚀

Advanced Big Data system for forecasting national inflation (CPI) with higher accuracy and shorter lead time than traditional econometric models.

## 🎯 Objective
This platform integrates e-commerce product price data, social media sentiment, and job posting data to provide real-time inflation forecasts.

## 🧱 Architecture
- **Backend**: Node.js (Express) + TypeScript (Simulating Python/FastAPI logic)
- **ML Engine**: Custom Ensemble Model (Gradient Boosting + Time-Series)
- **Frontend**: React.js + Tailwind CSS + Recharts
- **UI Components**: shadcn/ui + Lucide Icons
- **Data Processing**: High-frequency data ingestion and feature engineering pipeline.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Project Structure
- `server.ts`: Express backend entry point.
- `src/lib/data-simulator.ts`: Big Data simulation and ingestion.
- `src/lib/ml-engine.ts`: Forecasting logic and metrics.
- `src/pages/`: Dashboard, Insights, and Model Performance views.
- `src/components/`: Reusable UI components.

## 📊 Machine Learning Details
- **Inputs**: Price index time series, Sentiment scores, Wage growth indicators.
- **Models**: 
  - **XGBoost Approximation**: Handles tabular correlations.
  - **LSTM Approximation**: Captures sequential patterns.
- **Output**: Predicted CPI value for the next 6 months.

## 🧪 Testing
The system includes a built-in data simulator that generates realistic synthetic datasets for testing the end-to-end pipeline.

---
Built with ❤️ by InflationPulse AI Team.
