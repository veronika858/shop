import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilerComponent } from './product-filer.component';

describe('ProductFilerComponent', () => {
  let component: ProductFilerComponent;
  let fixture: ComponentFixture<ProductFilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFilerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
