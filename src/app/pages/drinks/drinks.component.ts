import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/shared/services/drinks/drink.service';
import { IDrink } from 'src/app/shared/interface/drink.interface';
import { BasketService } from 'src/app/shared/services/basket/basket.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {


  Drinks: Array<IDrink> = [];
  arrBasket: Array<any> = [];

  constructor( private drinkService: DrinkService,
               private basketService: BasketService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks():void{
    this.drinkService.getJSONDrinks().subscribe(
      data => {
        this.Drinks = data
      },
      err => {
        console.log(err)
      }
    );
  }


  addBasket(drink:IDrink):void{
    this.basketService.basket.next(drink);
  }



}
