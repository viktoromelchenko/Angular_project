import { Component, OnInit, TemplateRef } from '@angular/core';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  arrBasket: Array<any> = [];
  sum: number = 0;
  count:number;

  modalRef: BsModalRef;



  constructor(private basketService: BasketService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.checkCount();
  }

  checkCount(){
    this.basketService.basket.subscribe( data => {
      this.arrBasket.push(data)
      this.sumElem(this.arrBasket)
      console.log(this.arrBasket)
    })
  }

  sumElem(data: Array<any>){
    this.sum = data.reduce((total, elem) => {
      return total+elem.price
    }, 0)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }));
  }


  deleteProduct(i:number){
    this.arrBasket.splice(i,1);
    console.log(i);
    console.log(this.arrBasket);
  }
}
