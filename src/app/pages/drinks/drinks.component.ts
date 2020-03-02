import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/shared/services/drinks/drink.service';
import { IDrink } from 'src/app/shared/interface/drink.interface';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {


  Drinks: Array<IDrink> = [];

  constructor( private drinkService: DrinkService) { }

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


}
