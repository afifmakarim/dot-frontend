import { useQuery } from "react-query";
import CekOngkirForm from "../components/Home/CekOngkirForm";
import { Typography, message } from "antd";
import { getProductList } from "../services/product";
import ProductCard from "../components/Global/ProductCard";
import { useState } from "react";
import { Product } from "../types/global";

const { Title } = Typography;

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  const { isLoading } = useQuery("getProductList", getProductList, {
    onSuccess: (data) => {
      setProducts(data);
    },
    onError: () => {
      message.error("Terjadi kesalahan");
    },
  });

  return (
    <>
      <CekOngkirForm />
      <Title level={3} className="my-8">
        Produk
      </Title>
      {!isLoading && (
        <div className="grid grid-cols-3 gap-4">
          {products?.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      )}
    </>
  );
}
