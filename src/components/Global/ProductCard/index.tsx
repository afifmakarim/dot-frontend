import { Card } from "antd";
import { ProductCardProps } from "./productCard.interfaces";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  id,
  title,
  price,
  image,
  description,
}: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate(`/details/${id}`);
      }}
      title={title}
      hoverable
      bordered={false}
      cover={<img alt={title} src={image} className="h-52 object-contain" />}
    >
      {description.substring(0, 80)}
      <div className="flex items-end justify-end mt-8">
        <div className="text-sm font-semibold">$ {price}</div>
      </div>
    </Card>
  );
}
