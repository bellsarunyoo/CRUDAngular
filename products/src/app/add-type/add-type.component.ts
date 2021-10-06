import { Component, OnInit } from '@angular/core';
import { Types } from '../../app/models/types.model';
import { DataService } from '../services/data.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
  types?: Types[];
  public addTypes = { name: '' };
  public typeAll?: any;
  public index = 0;
  constructor(private dataService: DataService,
  private router: Router) { }

  ngOnInit(): void {
    this.load_type();
  }
  load_type() {
    this.dataService.getType()
      .subscribe(data => {
        this.types = data;
        this.typeAll = JSON.stringify(this.types);
        console.log(JSON.stringify(data));
      },
        error => {
          console.log(error);
        });
  }

  addType(type: string) {
   if  (type != null){
    // alert(type);
    const data = {
      name: type,

    };
    this.dataService.addType(data)
      .subscribe(
        response => {
          console.log(response);

        },
        error => {
          console.log(error);
        });
     this.load_type();
      (document.getElementById("typeName") as HTMLInputElement).focus();
      (document.getElementById("typeName") as HTMLInputElement).value = '';
    }
  }

  editType(idType:any) {
        this.router.navigateByUrl('/edit-type?id='+idType);
   }

  delType(id: any) {
    this.dataService.deleteType(id)
      .subscribe(
        response => {
          console.log(response);

        },
        error => {
          console.log(error);
        });
    this.load_type();


  }

}
