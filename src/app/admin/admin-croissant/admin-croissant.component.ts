import { Component, OnInit } from '@angular/core';
import { ICroissant } from 'src/app/shared/interface/croissant.interface';
import { CroissantService } from 'src/app/shared/services/croissant.service';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Croissant } from 'src/app/shared/classes/croissant.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interface/category.interface';


@Component({
  selector: 'app-admin-croissant',
  templateUrl: './admin-croissant.component.html',
  styleUrls: ['./admin-croissant.component.scss']
})
export class AdminCroissantComponent implements OnInit {

  modalRef: BsModalRef;
  croissantsAdmin: Array<ICroissant> = [];
  categoryAdmin: Array<ICategory> = [];

  NameCroissant: string;
  IngridientsCroissant: string;
  PriceCroissant: number;
  category: string;
  croissantID : number;
  editStatus: boolean;




  constructor(private croissantService: CroissantService,
              private categoryService: CategoryService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getAdminCroissants();
    this.getAdminCategory()
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  
  private getAdminCroissants(): void {
    this.croissantService.getJSONCroissants().subscribe(
      data => {
        this.croissantsAdmin = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  private getAdminCategory(): void {
    this.categoryService.getJSONCategory().subscribe(
      data => {
        this.categoryAdmin = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  addCroissant(): void {
    const newCroissant: ICroissant = new Croissant(
      1,
      this.category,
      this.NameCroissant,
      this.IngridientsCroissant,
      this.PriceCroissant,
      

    );
    if(this.croissantsAdmin.length > 0){
      const id = this.croissantsAdmin.slice(-1)[0].id + 1;
      newCroissant.id = id;
      
    }
    if(this.editStatus){
      newCroissant.id = this.croissantID;
      this.croissantService.updateJSONCroissants(newCroissant).subscribe(
        () => {
          this.getAdminCroissants();
        }
      );
    } 
    else {
      this.croissantService.addJSONCroissants(newCroissant).subscribe(
        () => {
          this.getAdminCroissants();
        }
      );
    }
    this.resetForm();
    this.editStatus = false;
  }

  deleteCroissant(croissant: ICroissant):void {
    this.croissantService.deletetJSONCroissants(croissant.id).subscribe(
      ()=>{
        this.getAdminCroissants();
      }
    )
  }

  editCroissant(croissant: ICroissant):void{
    this.category = croissant.categoryName,
    this.NameCroissant = croissant.name,
    this.IngridientsCroissant = croissant.ingredients,
    this.PriceCroissant = croissant.price,
    this.croissantID = croissant.id,
    this.editStatus = true
  }

  resetForm():void{
    this.category = '';
    this.NameCroissant = '';
    this.IngridientsCroissant = '';
    this.PriceCroissant = null
  }

}
