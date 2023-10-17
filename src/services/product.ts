import { productInstance } from "./axiosInstance";

export const getProductList = async () => {
  const response = await productInstance.get("/products");
  return response.data;
};

export const getProductDetail = async (productId: number) => {
  const response = await productInstance.get(`/products/${productId}`);
  return response.data;
};
