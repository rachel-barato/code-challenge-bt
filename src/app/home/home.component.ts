import { Component, OnInit } from '@angular/core';

import { Product } from '../core/model/product';
import { ProductService } from '../core/service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  _subscription: Subscription;

  products: Product[];

  constructor(
    private productService: ProductService
  ) {
    this._subscription = this.productService.productChange.subscribe(newProducts => {
      this.products = newProducts
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {
     this._subscription.unsubscribe();
   }

  private getProducts() {
   this.products = this.productService.getOrderedProducts();
  }

  changePosition(event) {
    this.productService.setProductOrder(event.productId, event.position)
  }

}
