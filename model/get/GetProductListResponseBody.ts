import { GetProductResponseBody } from "./GetProductResponseBody";

export interface GetProductListResponse {
  products: GetProductResponseBody[];
  total: number;
  skip: number;
  limit: number;
}