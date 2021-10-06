import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtProductComponent } from './edt-product.component';

describe('EdtProductComponent', () => {
  let component: EdtProductComponent;
  let fixture: ComponentFixture<EdtProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdtProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdtProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
