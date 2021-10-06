import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { EdtProductComponent } from './edt-product/edt-product.component';
import { EdtTypeComponent } from './edt-type/edt-type.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'Product', component: AddProductComponent },
  { path: 'Type', component: AddTypeComponent },
  { path: 'edit-product', component: EdtProductComponent },
  { path: 'edit-type', component: EdtTypeComponent },
  // { path: 'add-product', component:  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
