import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Products } from '../../app/models/products.model';
import { Types } from '../../app/models/types.model';
import { DataService } from '../services/data.service'
import { Router,ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-edt-product',
  templateUrl: './edt-product.component.html',
  styleUrls: ['./edt-product.component.css']
})
export class EdtProductComponent implements OnInit {

  constructor(private dataService: DataService,
  private router: Router,private route : ActivatedRoute) { }
  types? : Types[];
  results? : Products[];
  public pdAll? : any;
  public typeAll?: any;
  id? : any;
  getId = "";
  ngOnInit(): void {

    this.id = this.route.snapshot.queryParams;
    console.log(this.id.id);
    this.load_type();
    this.load_product();
  }
    load_product() {
   this.dataService.getEditPD(this.id.id)
      .subscribe(data => {
        this.results = data;
        this.pdAll=JSON.stringify(this.results);
          console.log(JSON.stringify(data));
        },
        error => {
          console.log(error);
        });
  }
   load_type() {
   this.dataService.getType()
      .subscribe(data => {
        this.types = data;
        this.typeAll=this.types;
           console.log(this.types);
        },
        error => {
          console.log(error);
        });
  }

  updateProducts(pdName:string,pdType:string) {
    if  (pdName != null && pdType != null){

      const data = {
       name: pdName,
      type: pdType
    };
      console.log(data);
    this.dataService.UpdatePD(this.id.id,data)
      .subscribe(
        response => {
          console.log(response);

        },
        error => {
          console.log(error);
        });


    }
      this.load_type();
       this.load_product();
      (document.getElementById("pdName") as HTMLInputElement).focus();
      (document.getElementById("pdName") as HTMLInputElement).value = '';
   }

}
