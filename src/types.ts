export interface PredictionData {
  _id?: string;
  busNumber: string;
  source: string;
  destination: string;
  distance: number;
  traffic: string;
  time: string;
  busFrequency: number;
  predictedArrival: number;
  createdAt?: string;
}

export interface MLInfo {
  modelName: string;
  nEstimators: number;
  maxDepth: number;
  mae: number;
  r2Score: number;
  trainTestSplit: string;
  datasetCount: number;
  features: string[];
  target: string;
}

export type PageView = 'home' | 'predict' | 'result' | 'history' | 'ml-explorer';
