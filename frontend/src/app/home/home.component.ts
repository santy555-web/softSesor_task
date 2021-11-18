import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { Product } from "./product";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 product:any = [];
 itemCount: number = 1;
 flag : boolean = true;

  constructor(private service:ProductService,private cartService: CartService) { }

  ngOnInit(): void {
    this.service.getData().subscribe((data:any)=>{
      this.product.push(data);
    });
  }
  onAddProductToCart(item:any) {
    this.cartService.updateCartItemCount(this.itemCount);
    this.cartService.updateShoppingCart(item).subscribe((res)=>console.log('added successfully'));
    let itemcart = [];
    itemcart.push(item);
    this.cartService.updateSmallCart(itemcart);
    this.itemCount++;
  }
}
