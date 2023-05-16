import { Component } from '@angular/core';
import { CartModel } from '../../context/DTOs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor() {
  }
  remove(products: CartModel) {

  }
}
