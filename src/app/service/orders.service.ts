import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Order } from '../Order';
import { Menu } from '../Menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  head = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  createOrder(value) {
    const url = 'http://localhost:3000/createorder';
    return this.httpClient.post<Order>(url, value, { headers: this.head });
  }

  getAllOrder(): Observable<Order[]> {
    const url = 'http://localhost:3000/getallorders';
    return this.httpClient.get<Order[]>(url, { headers: this.head });
  }

  updateOrder(value) {
    const url = 'http://localhost:3000/update';
    return this.httpClient.patch<Order>(url, value, { headers: this.head });
  }

  deleteOrder(id) {
    const url = `http://localhost:3000/delete/${id}`;
    return this.httpClient.delete<Order>(url);
  }

  getAllMenu(): Observable<Menu[]> {
    const url = 'http://localhost:3000/getallmenu';
    return this.httpClient.get<Menu[]>(url, { headers: this.head });
  }

  // getPrice(value): Observable<Menu[]> {
  //   const url = `http://localhost:3000/getmenu/${value}`;
  //   return this.httpClient.get<Menu[]>(url, { headers: this.head });
  // }
}
