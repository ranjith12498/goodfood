import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../../app/Order';
import { Menu } from '../../../app/Menu';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Output() onAddnewOrder: EventEmitter<Order> = new EventEmitter();
  @Input() hideValue: boolean;
  id;
  name: string = '';
  address: string;
  distance: number;
  menu: string;
  price: number;
  status: string;
  menudetail: Menu;
  buttonType;
  hideSaveBtn: boolean = false;
  updateBtn: boolean = false;
  statusArr = ['Preparing', 'Completed', 'Delivering'];

  orderList: Order[] = [];
  menuList: Menu[] = [];

  constructor(private service: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllOrder().subscribe((o) => (this.orderList = o));
    this.service.getAllMenu().subscribe((m) => (this.menuList = m));
    //console.log(this.orderList);
  }

  getAllOrder() {
    this.service.getAllOrder().subscribe((o) => (this.orderList = o));
  }

  onSubmit(btntype) {
    //console.log(btntype);
    switch (btntype) {
      case 'Save':
        this.updateBtn = !this.updateBtn;

        if (!this.name || !this.address || !this.distance) {
          alert('Enter values for all fields');
        } else {
          //console.log(this.menuList[this.menu].Price);
          let order = {
            name: this.name,
            address: this.address,
            menu: this.menuList[this.menu].MenuDetails,
            distance: this.distance,
            price: this.menuList[this.menu].Price,
            status: 'Preparing',
          };
          this.service.createOrder(order).subscribe((data) => {});
          window.location.reload();
          let currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });

          this.name = '';
          this.address = '';
          this.distance = undefined;
          this.menu = undefined;
        }
        break;
      case 'Update':
        let order = {
          id: this.id,
          name: this.name,
          address: this.address,
          menu: this.menu,
          distance: this.distance,
          price: this.price,
          status: this.status,
        };
        //console.log(order);
        this.service.updateOrder(order).subscribe((data) => {
          this.orderList.push(order);
          // this.getAllOrder();
        });
        window.location.reload();
        break;
      case 'Delete':
        //console.log(this.id);
        this.service
          .deleteOrder(this.id)
          .subscribe(
            () => (this.orderList = this.orderList.filter((o) => o.id !== o.id))
          );
        this.hideSaveBtn = !this.hideSaveBtn;

        this.name = '';
        this.address = '';
        this.distance = undefined;
        this.menu = undefined;
        this.status = undefined;
    }
  }

  update(order) {
    this.id = order.id;
    this.name = order.name;
    this.address = order.address;
    this.distance = order.distance;
    this.menu = order.menu;
    this.price = order.price;
    this.status = order.status;
    this.hideValue = !this.hideValue;
    this.hideSaveBtn = !this.hideSaveBtn;
  }
}
