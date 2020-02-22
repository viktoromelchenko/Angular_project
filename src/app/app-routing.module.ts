import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CroissantComponent } from './pages/croissant/croissant.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ProductDetalisComponent } from './pages/product-detalis/product-detalis.component';
import { AdminComponent } from './admin/admin.component';
import { YourCroissantComponent } from './pages/your-croissant/your-croissant.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminCroissantComponent } from './admin/admin-croissant/admin-croissant.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'croissant', component: CroissantComponent},
  {path: 'drinks', component: DrinksComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'product-detalis', component: ProductDetalisComponent },
  {path: 'admin', component: AdminComponent, children:[
    {path: ' ' , redirectTo:'admin-category',pathMatch: 'full'},
    {path: 'admin-category', component: AdminCategoryComponent},
    {path: 'admin-croissant', component: AdminCroissantComponent}
  ]},
  {path: 'your-croissant', component: YourCroissantComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
