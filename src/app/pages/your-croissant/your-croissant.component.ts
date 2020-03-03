import { Component, OnInit } from '@angular/core';
import { IngridientsService } from 'src/app/shared/services/ingridients/ingridients.service';
import { IIngridient } from 'src/app/shared/interface/ingridient.interface';


@Component({
  selector: 'app-your-croissant',
  templateUrl: './your-croissant.component.html',
  styleUrls: ['./your-croissant.component.scss']
})
export class YourCroissantComponent implements OnInit {

  ingridients: Array<IIngridient> = [];
 
  itemObjectsRight: Array<IIngridient> = [];


  constructor(private ingridientsService: IngridientsService) { }

  ngOnInit() {
    this.getIngridients()
  }

  getIngridients(): void {
    this.ingridientsService.getJSONIngridients().subscribe(
      data => {
        this.ingridients = data;
      },
      err => {
        console.log(err)
      }
      );
  }
}
