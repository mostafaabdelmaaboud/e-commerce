import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, PLATFORM_ID, Inject } from '@angular/core';
import { ProductsModel } from 'src/app/dashboard/products/context/DTOs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() product!: ProductsModel;
  @Output() item = new EventEmitter();
  amount!: string;
  switchAddCard = false;
  editCart = false;
  plateformId: object;

  constructor(@Inject(PLATFORM_ID) plateformId: object) {
    this.plateformId = plateformId;

  }
  ngOnInit(): void {
    debugger;
    let checkSession: boolean = false;
    if (isPlatformBrowser(this.plateformId)) {
      checkSession = "cart" in sessionStorage
    }
    if (checkSession) {
      let checkCart;
      if (isPlatformBrowser(this.plateformId)) {
        checkCart = JSON.parse(sessionStorage.getItem("cart")!);

      } else {
        checkCart = JSON.parse(sessionStorage.getItem("cart")!);

      }
      let existCart = checkCart.find((list: any) => list.item.id === this.product.id);
      if (existCart) {
        this.editCart = true;
        this.switchAddCard = false;
        this.amount = existCart.quantity;
      }
    }
  }
  addAmout(amout: string) {
    debugger;
    console.log("amout", amout);
    if (parseInt(amout) > 0) {
      this.item.emit({ item: this.product, quantity: parseInt(amout) });
      this.editCart = true;
      this.switchAddCard = false;

    } else {
      this.switchAddCard = true;

    }

  }
  addCart() {
    this.switchAddCard = true;

  }
}
