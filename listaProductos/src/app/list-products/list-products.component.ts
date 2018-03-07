import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  products: any
  constructor(private http: HttpClient) {

   }

  ngOnInit() {
    this.http.get('/product').subscribe(data => {
      this.products = data;
    });
  }
}
