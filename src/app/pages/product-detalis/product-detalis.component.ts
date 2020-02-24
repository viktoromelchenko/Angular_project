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
  constructor(private crs: CroissantService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMyCroissant();
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
