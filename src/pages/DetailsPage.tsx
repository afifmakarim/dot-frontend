import { Col, Row, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../services/product";
import { Product } from "../types/global";

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Product>();

  useEffect(() => {
    if (!id) navigate("/404");
  }, []);

  const { isLoading } = useQuery({
    queryKey: ["getProductDetail", id],
    queryFn: () => getProductDetail(Number(id)),
    onSuccess: (data) => {
      if (data.id === undefined) navigate("/404");
      setData(data);
    },
    onError: () => {
      message.error("Terjadi kesalahan");
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <div className="bg-white p-16 rounded-xl">
          <Row gutter={16}>
            <Col span={12}>
              <img src={data?.image} alt={data?.title} />
            </Col>
            <Col span={12} className="mt-8">
              <div className="text-2xl font-semibold">{data?.title}</div>
              <div className="text-sm font-semibold my-4">$ {data?.price}</div>
              <div className="text-sm">{data?.description}</div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
