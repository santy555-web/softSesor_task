import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
//import { AppService } from '../app.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
  cart: any[] = [];
  counter: number = 0;
  Totalprice: number;
  quantity: number = 1;
  today: number = Date.now() + 10;
 // @ViewChildren('subTotalWrap') subTotalItems: QueryList<ElementRef>;
 // @ViewChildren('subTotalWrap_existing')
  subTotalItems_existing: QueryList<ElementRef>;
  constructor(
    private cartService: CartService,
    private currencyPipe:CurrencyPipe
  ) {}

  ngOnInit(): void {
    //this.cart = this.cartService.getItems();
   // this.cartService.getItems().subscribe((a) => (this.cart = a));
    this.cartService.getItems().subscribe(a =>
      {
        this.cart.push(a)
      });
      console.log(this.cart)
    this.getTotal();
    this.cartService.count.subscribe((count) => (this.counter = count));
  }
  onRemove(item) {
    this.cart = this.cart.filter((a) => a.id != item.id);
    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.cartService.updateCartItemCount(this.cart.length);
    this.cartService.updateShoppingCart(this.cart);
    this.cartService.deleteShoppingCart(item.id).subscribe((res)=>console.log("Delete Successfully")
    );
    location.reload();
    this.getTotal();
  }
  // getTotal() {
  //   this.Totalprice = 0;
  //   this.cart.forEach((element) => {
  //     this.Totalprice = this.Totalprice + element.Price * this.quantity;
  //   });

  // }
  get total() {
    return this.cart.reduce(
      (sum, x) => ({
        quantity: 1,
        price: sum.price + x.quantity * x.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  onUpdateQuantity(type, item) {
       const qty = item.quantity;
      const amt = item.price;
       const subTotal = amt * qty;
      const subTotal_converted = this.currencyPipe.transform(subTotal, "USD");
      //this.subTotalItems.toArray()[ item.id ].nativeElement.innerHTML = subTotal_converted;
    // this.cartService.saveCart();
    // console.log(this.quantity,id);
    //  if(type == 1){

    //     this.cart.forEach((element, index) => {
    //       console.log("cart",this.cart)
    //       if(element.id == item.id){
    //         this.Totalprice = this.Totalprice + element.price * this.quantity;
    //         this.quantity= this.quantity + 1;
    //         console.log("if",this.Totalprice)
    //       }
    //     });
    //   } else {
    //     this.cart.forEach((element, index) => {
    //       if(element.id == item.id){
    //         console.log(element)
    //         this.Totalprice = this.Totalprice - element.price * this.quantity;
    //         this.quantity= this.quantity - 1;
    //       }
    //     });
    //  }
    this.getTotal();
  }
  getTotal() {
    this.Totalprice = 0;
    this.cart.forEach((element) => {
      this.Totalprice = this.total + element.price * element.quantity;
    });
  }
}
