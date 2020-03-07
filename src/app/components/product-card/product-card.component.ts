import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/core/model/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product: Product;

  @Output()
  sortChange = new EventEmitter();

  isDragged: boolean;

  constructor() { }

  ngOnInit() {
  }

  changePosition(productId, position) {
    this.sortChange.emit({productId: productId, position: position});
  }


}
