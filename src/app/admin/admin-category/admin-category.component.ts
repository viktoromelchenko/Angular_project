import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interface/category.interface';
import { category } from 'src/app/shared/classes/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  modalRef: BsModalRef;
  category: string;
  categoryAdmin: Array<ICategory> = [];
  editStatus: boolean;
  categoryID: number;
  cateorySearch: string;
  
  constructor(private categoryService: CategoryService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getAdminCategory();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

  addCategory(): void{
    const newCategory:ICategory = new category (
      1,
      this.category
    );
    if(this.categoryAdmin.length > 0){
      const id = this.categoryAdmin.slice(-1)[0].id + 1;
      newCategory.id = id;
    }
    if(this.editStatus){
      newCategory.id = this.categoryID;
      this.categoryService.updateJSONCategory(newCategory).subscribe(
        () => {
          this.getAdminCategory();
        }
      );
    } 
    else{ this.categoryService.addJSONCategory(newCategory).subscribe(
      () => {
        this.getAdminCategory();
      }
    );
    }
    this.editStatus = false;
    this.resetForm();
  }

  deleteCategory(category : ICategory ):void{
    this.categoryService.deletetJSONCategory(category.id).subscribe(
      ()=>{
        this.getAdminCategory();
      }
    );
  }

  editCategory(category: ICategory):void{
    this.categoryID = category.id;
    this.category = category.name;
    this.editStatus = true
  }

  resetForm(): void{
    this.category = '';
  }

}
