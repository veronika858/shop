import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';

@Component({
  selector: 'app-product-filer',
  templateUrl: './product-filer.component.html',
  styleUrls: ['./product-filer.component.css']
})
export class ProductFilerComponent implements OnInit {
  @Input('category') category;
  categories$;
  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void {
  }

}
