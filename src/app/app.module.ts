import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { YourCroissantComponent } from './pages/your-croissant/your-croissant.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminComponent } from './admin/admin.component';
import { CroissantComponent } from './pages/croissant/croissant.component';
import { ProductDetalisComponent } from './pages/product-detalis/product-detalis.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AdminCroissantComponent } from './admin/admin-croissant/admin-croissant.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchPipe } from './shared/pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DrinksComponent,
    YourCroissantComponent,
    BasketComponent,
    AdminComponent,
    CroissantComponent,
    ProductDetalisComponent,
    AdminCroissantComponent,
    AdminCategoryComponent,
    SearchPipe,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
