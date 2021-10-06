import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products.model';
import { Types } from '../models/types.model';
const baseUrl = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

   getAll(): Observable<Products[]> {
    return this.http.get<Products[]>(baseUrl+"All");
   }

  getType(): Observable<Types[]> {
    return this.http.get<Types[]>(baseUrl+"gtypes");
  }

   addType(data: any): Observable<any> {
    return this.http.post(baseUrl+"psTypes", data);
  }

   addProduct(data: any): Observable<any> {
    return this.http.post(baseUrl+"psNames", data);
   }
  getEditPD(id: any): Observable<any>{
      return this.http.get(baseUrl+"aName/"+id);
  }

  UpdatePD(id: any, data: any): Observable<any>{
      return this.http.put(baseUrl+"puNames/"+id, data);
  }

  deletePD(id: any): Observable<any> {
    return this.http.delete(baseUrl+"delName/"+id);
  }

    getEditType(id: any): Observable<any>{
      return this.http.get(baseUrl+"aType/"+id);
  }

  UpdateType(id: any, data: any): Observable<any>{
      return this.http.put(baseUrl+"puTypes/"+id, data);
  }

  deleteType(id: any): Observable<any> {
    return this.http.delete(baseUrl+"delType/"+id);
  }
}
