import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  // ProductArr = [];
  // totalprice:number;
  // itemCount: number = 0;
  private ItemCount = new BehaviorSubject(0);
  count: Observable<number> = this.ItemCount.asObservable();
 // private shoppingCart = [];
//  cart = this.shoppingCart.asObservable();
  private smallCart = new BehaviorSubject([]);
  cart = this.smallCart.asObservable();
  constructor(private http:HttpClient) {
    let isEmptyCart: boolean = localStorage.getItem('Cart') == null;
    this.updateCartItemCount(isEmptyCart ? 0 : JSON.parse(localStorage.getItem('Cart')).length);
    this.updateSmallCart(isEmptyCart ? [] :JSON.parse(localStorage.getItem('Cart')));
    this.getItems();
  }
  getItems() {
    return this.http.get(environment.url+`addtocart`);
  }
  updateCartItemCount(count: number){
    this.ItemCount.next(count);
  }
  updateShoppingCart(cartItems: any){
   return this.http.post(environment.url+`addtocart`, cartItems);
  }
  updateSmallCart(cartItems: any[]){
    localStorage.setItem("Cart", JSON.stringify(cartItems));
    this.smallCart.next(cartItems);
   }
   deleteShoppingCart(id: any){
    return this.http.delete(environment.url+`addtocart/${id}`);
   }
   onSearchString(event){

   }
}
