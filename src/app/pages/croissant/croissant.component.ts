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

  constructor(private crs: CroissantService) { }

  ngOnInit() {
    this.getCroissants()
  }


  private getCroissants(): void {
    this.crs.getJSONCroissants().subscribe(
      data => {
        this.croissants = data;
      },
      err => {
        console.log(err)
      }
    );
  }
}
