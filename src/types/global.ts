export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
}

export interface Cost {
  origin: number;
  destination: number;
  weight: number;
  courier: string;
}
