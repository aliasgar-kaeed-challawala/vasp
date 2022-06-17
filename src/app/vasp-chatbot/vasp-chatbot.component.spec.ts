import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaspChatbotComponent } from './vasp-chatbot.component';

describe('VaspChatbotComponent', () => {
  let component: VaspChatbotComponent;
  let fixture: ComponentFixture<VaspChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaspChatbotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaspChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
