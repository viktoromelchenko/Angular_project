import { Component, OnInit } from '@angular/core';
import { ICroissant } from 'src/app/shared/interface/croissant.interface';
import { CroissantService } from 'src/app/shared/services/croissant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detalis',
  templateUrl: './product-detalis.component.html',
  styleUrls: ['./product-detalis.component.scss']
})
export class ProductDetalisComponent implements OnInit {

  view: ICroissant;
  croissantsRandom: ICroissant;
  croissantsRandom1: ICroissant;
  croissantsRandom2: ICroissant;

  constructor(private crs: CroissantService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMyCroissant();
    this.getRandom();
    this.getRandom1();
    this.getRandom2();

  }


  getMyCroissant():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.crs.getJSONOneCroissant(id).subscribe(
      data => {
        this.view = data;
      }
    )
  }

  getRandom():void {
    const number = Math.random()*9;
    this.crs.getJSONOneCroissant((Math.round(number))).subscribe(
      data => {
        this.croissantsRandom = data;
      }
    )
  }

  getRandom1():void {
    const number = Math.random()*9;
    this.crs.getJSONOneCroissant((Math.round(number))).subscribe(
      data => {
        this.croissantsRandom1 = data;
      }
    )
  }

  getRandom2():void {
    const number = Math.random()*9;
    this.crs.getJSONOneCroissant((Math.round(number))).subscribe(
      data => {
        this.croissantsRandom2 = data;
      }
    )
  }

}
