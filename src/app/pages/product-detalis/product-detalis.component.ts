import { Component, OnInit } from '@angular/core';
import { ICroissant } from 'src/app/shared/interface/croissant.interface';
import { CroissantService } from 'src/app/shared/services/croissant.service';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/shared/services/basket/basket.service';

@Component({
  selector: 'app-product-detalis',
  templateUrl: './product-detalis.component.html',
  styleUrls: ['./product-detalis.component.scss']
})
export class ProductDetalisComponent implements OnInit {

  view: ICroissant;
  


  constructor(private crs: CroissantService,
              private route: ActivatedRoute, 
              private basketService: BasketService) { }

  ngOnInit() {
    this.getMyCroissant();

  }

  addBasket(view: ICroissant){
    this.basketService.basket.next(view);
  }


  getMyCroissant():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.crs.getJSONOneCroissant(id).subscribe(
      data => {
        this.view = data;
      }
    )
  }

}
