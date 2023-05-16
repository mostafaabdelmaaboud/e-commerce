import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartModel } from '../../context/DTOs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartItems = inject(CartService);
  public viewCartItems = [...this.cartItems.cartItems()];
  constructor() {
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.viewCartItems = [...this.cartItems.cartItems()]
  }
  removeCart(cart: any, i: number) {
    debugger;
    this.cartItems.removeProductSignal(cart);
    this.viewCartItems = [...this.viewCartItems.filter((a, index) => index !== i)];

  }
}
