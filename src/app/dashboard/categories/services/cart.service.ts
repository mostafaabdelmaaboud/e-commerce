import { Injectable, computed, signal } from '@angular/core';
import { CartModel } from '../context/DTOs';

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
  constructor() { }
  addProductSignal(product: CartModel) {
    this.cartItems.mutate((val) => {
      val.push(product);
    })
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
        val.splice(findIndex, 1);
      }
    })
  }
}
