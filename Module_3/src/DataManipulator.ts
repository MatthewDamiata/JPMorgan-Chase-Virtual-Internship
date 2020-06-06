import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = (priceABC / priceDEF); // Calculating ratio from top prices for each stock
    const upperBound = 1.05;
    const lowerBound = 0.95;
      return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
        // Get the most recent timestamp. If timestamp 0 is greater, display it, otherwise, display timestamp 1
        timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        // If the ratio of the two stocks ever goes above or below the set bounds, trigger an alert
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      };
    }
}
