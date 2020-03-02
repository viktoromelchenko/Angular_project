import { IDrink } from '../interface/drink.interface';


export class drink implements IDrink{

        constructor(
            public id:number,
            public categoryName:string,
            public name:string,
            public description:string,
            public price:number,
            public image:string
    ){}
}