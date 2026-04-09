import { subMonths, format, addMonths, startOfMonth } from 'date-fns';

export interface DataPoint {
  date: string;
  cpi: number;
  priceIndex: number;
  sentiment: number;
  wageGrowth: number;
}

export interface ForecastPoint extends DataPoint {
  isForecast: boolean;
}

export class DataSimulator {
  private static seed = 123;

  private static random() {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  static generateHistoricalData(months: number = 36): DataPoint[] {
    const data: DataPoint[] = [];
    const now = new Date();
    
    let currentCPI = 100;
    let currentPriceIndex = 100;
    let currentSentiment = 0.5;
    let currentWageGrowth = 0.03;

    for (let i = months; i >= 0; i--) {
      const date = startOfMonth(subMonths(now, i));
      
      // Add some noise and trends
      const trend = 0.002; // 0.2% monthly inflation trend
      const noise = (this.random() - 0.5) * 0.005;
      
      currentCPI *= (1 + trend + noise);
      currentPriceIndex *= (1 + trend + noise * 1.5 + (this.random() - 0.5) * 0.01);
      currentSentiment = 0.4 + this.random() * 0.2 + Math.sin(i / 6) * 0.1;
      currentWageGrowth = 0.02 + this.random() * 0.02 + (currentCPI > 105 ? 0.01 : 0);

      data.push({
        date: format(date, 'yyyy-MM-dd'),
        cpi: parseFloat(currentCPI.toFixed(2)),
        priceIndex: parseFloat(currentPriceIndex.toFixed(2)),
        sentiment: parseFloat(currentSentiment.toFixed(3)),
        wageGrowth: parseFloat(currentWageGrowth.toFixed(4)),
      });
    }

    return data;
  }

  static generateMockBigData() {
    // Simulate "millions of records" by providing summary stats
    return {
      ecommerce: {
        totalRecords: 12450000,
        categories: ['Electronics', 'Groceries', 'Apparel', 'Home'],
        dailyVolume: 450000,
        lastUpdated: new Date().toISOString()
      },
      social: {
        totalPosts: 8500000,
        platforms: ['Twitter', 'Reddit', 'News'],
        sentimentDistribution: { positive: 0.3, neutral: 0.5, negative: 0.2 }
      },
      jobs: {
        totalPostings: 1200000,
        topSectors: ['Tech', 'Healthcare', 'Retail', 'Manufacturing'],
        wageTrend: '+4.2% YoY'
      }
    };
  }
}
