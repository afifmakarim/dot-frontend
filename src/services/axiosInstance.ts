import axios from "axios";

const cekOngkirInstance = axios.create({
  baseURL: process.env.REACT_APP_RAJAONGKIR_URL,
  headers: {
    key: process.env.REACT_APP_RAJAONGKIR_API_KEY,
  },
});

const productInstance = axios.create({
  baseURL: process.env.REACT_APP_FAKE_STORE_URL,
});

export { cekOngkirInstance, productInstance };
