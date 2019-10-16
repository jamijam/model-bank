import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IDVerificationComponent } from './id-verification.component';

describe('IDVerificationComponent', () => {
  let component: IDVerificationComponent;
  let fixture: ComponentFixture<IDVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
