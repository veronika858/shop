import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {RouterModule} from '@angular/router';
import {CustomFormsModule} from 'ngx-custom-validators';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment.prod';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';
import {UserService} from './user.service';
import {AdminAuthGuardService} from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {CategoryService} from './category.service';
import {FormsModule} from '@angular/forms';
import {ProductService} from './product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DataTablesModule} from 'angular-datatables';
import {CommonModule} from '@angular/common';
import { ProductFilerComponent } from './products/product-filer/product-filer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import {OrderService} from './order.service';
import {ShoppingCartService} from './shopping-cart.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilerComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService]}
    ]),
    NgbModule,
    FormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    DataTablesModule, CommonModule
  ],
  providers: [AuthService, AuthGuardService, UserService, AdminAuthGuardService, CategoryService, ProductService, ShoppingCartService,
    OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
