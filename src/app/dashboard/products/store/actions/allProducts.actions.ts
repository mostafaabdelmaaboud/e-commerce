import { state } from "@angular/animations"
import { AddProductModel, Filteration } from "../../context/DTOs"

export class GetAllProducts {
  static readonly type = "[Products] Get All Products";
  constructor(public payload: Filteration | null) { }
}
export class AddProduct {
  static readonly type = "[Products] Add Product";
  constructor(public payload: AddProductModel) {

  }
}
export class DeleteProduct {
  static readonly type = "[Products] Delete Product";
  constructor(public id: string) {
  }
}
export class UpdateProduct {
  static readonly type = "[Products] Update Product";
  constructor(public payload: AddProductModel, public id: number) {

  }
}
