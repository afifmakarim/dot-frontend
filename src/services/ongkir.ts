import { Cost } from "../types/global";
import { cekOngkirInstance } from "./axiosInstance";

export const getProvinceList = async () => {
  const response = await cekOngkirInstance.get("/starter/province");
  return response.data.rajaongkir.results;
};

export const getCityList = async (provinceId: string) => {
  const response = await cekOngkirInstance.get(
    `/starter/city?province=${provinceId}`
  );
  return response.data.rajaongkir.results;
};

export const getCost = async (payload: Cost) => {
  const response = await cekOngkirInstance.post("/starter/cost", payload);
  return response.data.rajaongkir.results[0].costs;
};
