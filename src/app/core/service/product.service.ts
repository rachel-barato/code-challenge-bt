import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  productPhoto: string = "https://qa-m1-dr.abi-sandbox.net/media/catalog/product/-/R/-R002151.png";

  private products: Product[] = [
    {
      id: 1,
      image: this.productPhoto,
      name:'Modelo Negra',
      quantity: 12,
      description:'33oz Bottle' ,
      price: 32.00,
      promotion:'Buy 3, get 1 free.',
      order: 1
    },
    {
      id: 2,
      image: this.productPhoto,
      name:'President Light',
      quantity: 16,
      description:'330ml Bottle' ,
      price: 43.00,
      promotion:'Buy 3, get 1 free Red Bull or 2 Pepsi Black.',
      order: 0
    },
    {
      id: 3,
      image: this.productPhoto,
      name:'Brahma Light very very light 33Onz - Caja[12 Botellas]',
      quantity: 16,
      description:'330ml Bottle' ,
      price: 43.00,
      promotion:'For every 5 you buy, you get up to 2 free.',
      order: 2
    },
    {
      id: 4,
      image: this.productPhoto,
      name:'Budweiser',
      quantity: 16,
      description:'330ml Bottle and long summary on multiple lines' ,
      price: 26,
      promotion:'For every 5 you buy, you get up to 3 free Red Bull or 2 Pepsi Black.',
      order: 3
    }
  ]

  productChange: Subject<Product[]> = new Subject<Product[]>();

  constructor() { }

  getProducts(){
    return this.products;
  }

  setProduct(id: number, newProperties: object) {
    const productIndex = this.products.findIndex(product => product.id = id);
    this.products[productIndex] = {...this.products[productIndex], ...newProperties};
    this.productChange.next(this.products);
  }

  setProductOrder(id: number, newOrder) {
    let looped = false;
    if (!looped && newOrder < 0) {
      newOrder = this.products.length - 1;
      looped = true;
    }

    if (!looped && newOrder >= this.products.length) {
      newOrder = 0;
      looped = true;
    }

    const productA = this.products.find(product => product.id == id);
    const productB = this.products.find(product => product.order == newOrder);

    const oldProductBOrder = productB.order;
    productB.order = productA.order;
    productA.order = oldProductBOrder;

    this.productChange.next(this.getOrderedProducts());
  }

  getOrderedProducts() {
    return this.products.sort(
      (productA, productB) => productA.order - productB.order
    );
  }


}
