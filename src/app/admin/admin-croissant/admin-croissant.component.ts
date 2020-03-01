import { Component, OnInit } from '@angular/core';
import { ICroissant } from 'src/app/shared/interface/croissant.interface';
import { CroissantService } from 'src/app/shared/services/croissant.service';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Croissant } from 'src/app/shared/classes/croissant.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interface/category.interface';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map , finalize } from 'rxjs/operators';


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
  image:string;
  editStatus: boolean;


  // Upload image variables
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;


  constructor(private croissantService: CroissantService,
              private categoryService: CategoryService,
              private modalService: BsModalService,
              private afStorage: AngularFireStorage) { }

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
      this.image
      

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

  editCroissant(croissant: ICroissant, template):void{
    this.category = croissant.categoryName,
    this.NameCroissant = croissant.name,
    this.IngridientsCroissant = croissant.ingredients,
    this.PriceCroissant = croissant.price,
    this.croissantID = croissant.id,
    this.editStatus = true,
    this.image = croissant.image

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  resetForm():void{
    this.category = '';
    this.NameCroissant = '';
    this.IngridientsCroissant = '';
    this.PriceCroissant = null
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
