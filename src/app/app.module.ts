import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';

/* Firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


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
import { AdminDrinkComponent } from './admin/admin-drink/admin-drink.component';
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
    AdminDrinkComponent,
    SearchPipe,
    AdminDrinkComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD3Zz_Ef6gIKNdOjm0c3reXM-08uoNVtAg'
    }),
    AngularFireModule.initializeApp(environment.firebase, 'project'), // imports firebase/app needed for everything
    AngularFireAnalyticsModule, // dynamically imports firebase/analytics
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
