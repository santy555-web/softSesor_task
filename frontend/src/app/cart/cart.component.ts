import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: any = [];
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe(a => this.cart.push(a));
    console.log(this.cart)
  }
  getCartProductItems() {
    const cart = JSON.stringify(localStorage.getItem('Cart'));
    this.cart = JSON.parse(cart);
  }
  onRemoveProductsFromCart(id: number) {
    this.cart = this.cart.filter((a) => {
      a.id != id;
    });
    localStorage.removeItem('Cart');
    this.cartService.updateCartItemCount(this.cart.length);
    this.cartService.updateSmallCart(this.cart);
    this.cartService.deleteShoppingCart(id).subscribe((res)=>console.log("Delete Successfully")
    );
    location.reload();
  }
}
