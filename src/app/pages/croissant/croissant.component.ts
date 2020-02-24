import { Component, OnInit } from '@angular/core';
import { CroissantService } from 'src/app/shared/services/croissant.service';
import { ICroissant } from 'src/app/shared/interface/croissant.interface';

@Component({
  selector: 'app-croissant',
  templateUrl: './croissant.component.html',
  styleUrls: ['./croissant.component.scss']
})
export class CroissantComponent implements OnInit {

  croissants: Array<ICroissant> = [];
  croissantStatus:boolean = true;

  constructor(private crs: CroissantService) { }

  ngOnInit() {
    this.sendwitchCroissants()
  }


  sendwitchCroissants(): void {
  if(this.croissantStatus){
  this.crs.getJSONCroissants().subscribe(
    data => {
      this.croissants = data.filter(croissant => croissant.categoryName === 'sendwitch');
    },
    err => {
      console.log(err)
    }
    );
    }
    this.croissantStatus = false;
  }

  sweetCroissants():void{
  if (!this.croissantStatus){
      this.crs.getJSONCroissants().subscribe(
        data => {
          this.croissants = data.filter(croissant => croissant.categoryName === 'sweet');
        },
        err => {
          console.log(err)
        }
        );
    }
    this.croissantStatus = true;
  }

}
