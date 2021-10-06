import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Products } from '../../app/models/products.model';
import { Types } from '../../app/models/types.model';
import { DataService } from '../services/data.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  types? : Types[];
  results?: Products[];
  index = 0;
  public pdAll? : any;
  public typeAll?: any;
  constructor(private http: HttpClient,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.load_type();
    this.load_product();
  }
  load_product() {
   this.dataService.getAll()
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
        // this.typeAll=JSON.stringify(this.types);
          console.log(this.types);
        },
        error => {
          console.log(error);
        });
  }

  alert() { }

  addProducts(pdName:string,pdType:string) {
    if  (pdName != null && pdType != null){
    // alert(type);
    const data = {
      name: pdName,
      type: pdType
    };

    this.dataService.addProduct(data)
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

  editPd(pdId:any) {
    this.router.navigateByUrl('/edit-product?id='+pdId);
  }

  delPd(id:any) {
    this.dataService.deletePD(id)
      .subscribe(
        response => {
          console.log(response);

        },
        error => {
          console.log(error);
        });
    this.load_type();
    this.load_product();
  }
}
