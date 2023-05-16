import { Injectable, computed, signal, Injector } from '@angular/core';
import { CartModel } from '../context/DTOs';
import { ProductsModel } from '../../products/context/DTOs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems = signal<CartModel[]>([]);

  public totalItems = computed(() => {
    debugger;
    return this.cartItems().length
  })
  public subTotal = computed(() => {
    return this.cartItems().reduce((prev: any, next: CartModel) => {
      return prev + (next.item.price * next.quantity)
    }, 0)
  })
  cartProducts: { item: ProductsModel, quantity: number }[] = [];
  toastr = this.injector.get(ToastrService);

  constructor(private injector: Injector) { }
  addProductSignal(product: CartModel) {
    this.cartProducts.push(product);
    debugger;
    sessionStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.cartItems.mutate((val) => {
      val.push(product);
    })
  }
  updateProductSignal(product: CartModel) {
    this.cartProducts = JSON.parse(sessionStorage.getItem("cart")!);
    let existIndex = this.cartProducts.findIndex(list => list.item.id === product.item.id);
    debugger;
    if (existIndex >= 0) {
      if (this.cartProducts[existIndex].quantity != product.quantity) {
        debugger;
        this.cartProducts[existIndex].quantity = product.quantity;
        sessionStorage.setItem("cart", JSON.stringify(this.cartProducts));
        this.cartItems.mutate((val) => {
          let indexProduct = val.findIndex(item => item.item.id === product.item.id);
          val[indexProduct] = product;
          debugger;
          val = val;
        })
        this.toastr.success('Update Quantity', 'Success', {
          timeOut: 2000
        });
      }
    }
  }
  cartItemsCheckStorage() {
    this.cartItems.mutate((val) => {
      debugger;
      if ("cart" in sessionStorage) {
        val.push(...JSON.parse(sessionStorage.getItem("cart")!));
      }
    })
  }
  removeProductSignal(product: CartModel) {
    this.cartItems.mutate(val => {
      let findIndex = val.findIndex((item: CartModel) => item.item.id === product.item.id);
      if (findIndex >= 0) {
        debugger
        val.splice(findIndex, 1);
        debugger
        sessionStorage.setItem("cart", JSON.stringify(val));
        this.toastr.error('Product is Removed ', 'Success', {
          timeOut: 2000
        });
      }
    })
  }
}
