import { ProductsModel } from "../../products/context/DTOs";

export interface FilterCategoriesModel {
  page: number;
}
export interface CategoriesModel {
  _id: string;
  title: string;
  userId: string;
  image: string;
  description: string;
  deadline: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  isLoading?: boolean;

}
export interface CartModel {
  item: ProductsModel,
  quantity: number

}
export interface UserData {
  email: string;
  exp: number;
  iat: number;
  userId: string;
}
