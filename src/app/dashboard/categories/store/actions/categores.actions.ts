import { FilterCategoriesModel } from "../../context/DTOs";

export class GetCategorieUser {
  static readonly type = "[Categories] Get All";
}
export class GetAllProducts {
  static readonly type = "[Products] Get All Products"
}
export class GetProductsByCategory {
  static readonly type = "[Products] Get Products By Category"
  constructor(public nameCategory: string) { }
}
