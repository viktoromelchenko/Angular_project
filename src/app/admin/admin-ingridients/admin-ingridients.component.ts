import { Component, OnInit, TemplateRef } from '@angular/core';
import { IngridientsService } from 'src/app/shared/services/ingridients/ingridients.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IIngridient } from 'src/app/shared/interface/ingridient.interface';
import { Ingridient } from 'src/app/shared/classes/ingridient.model';
import { ICategory } from 'src/app/shared/interface/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map , finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-ingridients',
  templateUrl: './admin-ingridients.component.html',
  styleUrls: ['./admin-ingridients.component.scss']
})
export class AdminIngridientsComponent implements OnInit {

  modalRef: BsModalRef;
  ingridientsAdmin: Array<IIngridient> = [];
  categoryAdmin: Array<ICategory> = [];

  category: string;
  NameIngridients: string;
  PriceIngridients: number;
  image: string;

  editStatus: boolean;
  ingridientsID: number;


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;


  constructor(private ingridientsService: IngridientsService,
              private modalService: BsModalService,
              private categoryService: CategoryService,
              private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.getAdminIngridients();
    this.getAdminCategory();
  }


  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  private getAdminIngridients(): void {
    this.ingridientsService.getJSONIngridients().subscribe(
      data => {
        this.ingridientsAdmin = data;
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

  addIngridients(): void {
    const newIngridients: IIngridient = new Ingridient(
      1,
      this.category,
      this.NameIngridients,
      this.PriceIngridients,
      this.image
    );
    if(this.ingridientsAdmin.length > 0){
      const id = this.ingridientsAdmin.slice(-1)[0].id + 1;
      newIngridients.id = id;
    }
    if(this.editStatus){
      newIngridients.id = this.ingridientsID;
      this.ingridientsService.updateJSONCroissants(newIngridients).subscribe(
        () => {
          this.getAdminIngridients();
        }
      );
    }
    else{this.ingridientsService.addJSONIngridients(newIngridients).subscribe(
      () => {
        this.getAdminIngridients();
      }
    );
    }
    this.editStatus = false;
    this.resetForm();
  }

  deleteIngridient(ingridient: IIngridient ):void {
    this.ingridientsService.deletetJSONIngridients(ingridient.id).subscribe(
      ()=>{
        this.getAdminIngridients();
      }
    )
  }

  editIngridient(ingridient: IIngridient, template):void{
    this.category = ingridient.categoryName,
    this.NameIngridients = ingridient.name,
    this.PriceIngridients = ingridient.price,
    this.ingridientsID = ingridient.id,
    this.editStatus = true,
    this.image = ingridient.image

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  resetForm():void{
    this.category = '';
    this.NameIngridients = '';
    this.PriceIngridients = null
  }

  public upload(event: any): void {
    const file = event.target.files[0];
    const filePath = `Images/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges()
    .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
    .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`Images/${e.metadata.name}`).getDownloadURL().subscribe(data => {
        this.image = data;
      });
    });
  }

  public createUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


}
