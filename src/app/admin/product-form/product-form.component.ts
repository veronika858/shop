import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../category.service';
import {ProductService} from '../../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: any;
  id;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService)
  {
    this.categories$ = this.categoryService.getCategories();
    console.log('category', this.categories$);
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id, 'id');
    this.product = {};
    if (this.id) {
      this.productService.getProduct(this.id)
        .pipe(take(1)).subscribe(p => {
        this.product = p.payload.val();
        console.log(this.product);
      });
    }
  }

  // tslint:disable-next-line:typedef
  save(product) {
    if (this.id){
      this.productService.update(this.id, product);
    }
    else {
    this.productService.create(product);
    console.log(product); }
    this.router.navigate(['/admin/products']);
  }
  // tslint:disable-next-line:typedef
  delete(){
    if (confirm('Do you want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit(): void {
  }

}
