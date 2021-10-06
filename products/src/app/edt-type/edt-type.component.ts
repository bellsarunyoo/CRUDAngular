import { Component, OnInit } from '@angular/core';
import { Types } from '../../app/models/types.model';
import { DataService } from '../services/data.service'
import { Router,ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-edt-type',
  templateUrl: './edt-type.component.html',
  styleUrls: ['./edt-type.component.css']
})
export class EdtTypeComponent implements OnInit {
  types?: Types[];
  public addTypes = { name: '' };
  public typeAll?: any;
  public index = 0;
  id? : any;
  constructor(private dataService: DataService,
  private router: Router,private route : ActivatedRoute) { }

  ngOnInit(): void {
     this.id = this.route.snapshot.queryParams;
    console.log(this.id.id);
     this.load_type();
  }
  load_type() {
    this.dataService.getEditType(this.id.id)
      .subscribe(data => {
        this.types = data;
        this.typeAll = JSON.stringify(this.types);
        console.log(JSON.stringify(data));
      },
        error => {
          console.log(error);
        });
  }
  editType(type: any) {
      if  (type != null){
      const data = {
      name: type,

    };
    this.dataService.UpdateType(this.id.id,data)
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
}
