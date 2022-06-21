import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditticketComponent } from './editticket.component';

describe('EditticketComponent', () => {
  let component: EditticketComponent;
  let fixture: ComponentFixture<EditticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
