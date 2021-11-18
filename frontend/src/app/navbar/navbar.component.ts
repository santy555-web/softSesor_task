import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  itemCount: number;
  flag : boolean = true;
  searchString:string;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.count.subscribe(count => this.itemCount = count);
  }
  onclick()
  {
    this.flag= !this.flag;
  }
  onSearch(event){
    this.cartService.onSearchString(event)
  }
}
