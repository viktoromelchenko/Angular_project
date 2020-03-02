import { Component, OnInit, TemplateRef } from '@angular/core';
import { DrinkService } from 'src/app/shared/services/drinks/drink.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { IDrink } from 'src/app/shared/interface/drink.interface';
import { drink } from 'src/app/shared/classes/drink.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { ICategory } from 'src/app/shared/interface/category.interface';
import { Observable } from 'rxjs';
import { map , finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-drink',
  templateUrl: './admin-drink.component.html',
  styleUrls: ['./admin-drink.component.scss']
})
export class AdminDrinkComponent implements OnInit {

  modalRef: BsModalRef;


  AdminDrinks: Array<IDrink> = [];
  categoryAdmin: Array<ICategory> = [];

  category:string;
  NameDrink:string;
  DescriptionDrink:string;
  PriceDrink:number;
  image:string;
  editDrink:boolean;
  drinkID:number;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;


  constructor(private drinkService: DrinkService,
              private categoryService: CategoryService,
              private modalService: BsModalService,
              private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.getAdminDrinks();
    this.getAdminCategory()
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  private getAdminDrinks(): void {
    this.drinkService.getJSONDrinks().subscribe(
      data => {
        this.AdminDrinks = data;
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

  addDrink(): void {
    const newDrink: IDrink = new drink(
      1,
      this.category,
      this.NameDrink,
      this.DescriptionDrink,
      this.PriceDrink,
      this.image
      

    );
    if(this.AdminDrinks.length > 0){
      const id = this.AdminDrinks.slice(-1)[0].id + 1;
      newDrink.id = id;
      
    }
    if(this.editDrink){
      newDrink.id = this.drinkID;
      this.drinkService.updateJSONDrinks(newDrink).subscribe(
        () => {
          this.getAdminDrinks();
        }
      );
    }else{
      this.drinkService.addJSONDrinks(newDrink).subscribe(
        () => {
          this.getAdminDrinks();
        }
      );
    }
    this.editDrink = false;
    this.resetForm();
  }

  deleteDrink(drink: IDrink):void {
    this.drinkService.deletetJSONDrinks(drink.id).subscribe(
      ()=>{
        this.getAdminDrinks();
      }
    )
  }

  editDrinks(drink: IDrink, template):void{
    this.category = drink.categoryName,
    this.NameDrink = drink.name,
    this.DescriptionDrink = drink.description,
    this.PriceDrink = drink.price,
    this.drinkID = drink.id,
    this.editDrink = true,
    this.image = drink.image

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  resetForm():void{
    this.category = '';
    this.NameDrink = '';
    this.DescriptionDrink = '';
    this.PriceDrink = null
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
