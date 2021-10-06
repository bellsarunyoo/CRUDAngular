import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtTypeComponent } from './edt-type.component';

describe('EdtTypeComponent', () => {
  let component: EdtTypeComponent;
  let fixture: ComponentFixture<EdtTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdtTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdtTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
