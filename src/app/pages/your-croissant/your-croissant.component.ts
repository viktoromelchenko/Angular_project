import { Component, OnInit } from '@angular/core';
import { IngridientsService } from 'src/app/shared/services/ingridients/ingridients.service';
import { IIngridient } from 'src/app/shared/interface/ingridient.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-your-croissant',
  templateUrl: './your-croissant.component.html',
  styleUrls: ['./your-croissant.component.scss']
})
export class YourCroissantComponent implements OnInit {

  ingridients: Array<IIngridient> = [];
  sum: number = 0;

  done: Array<IIngridient> = [];

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



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log(event.container.data);
      this.sumElem(event.container.data);
    }
  }

   sumElem(data: Array<any>){
     this.sum = data.reduce((total, elem) => {
       return total+elem.price
     }, 0)
   }
}
