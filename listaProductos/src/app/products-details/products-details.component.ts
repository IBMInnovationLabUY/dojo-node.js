import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsDetailComponent implements OnInit {

  product = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getProductDetail(this.route.snapshot.params['id']);
  }

  getProductDetail(id) {
    this.http.get('/product/'+id).subscribe(data => {
      this.product = data;
    });
  }

  deleteProduct(id) {
    this.http.delete('/product/'+id)
      .subscribe(res => {
          this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  
}