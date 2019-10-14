import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureDetailsComponent } from './capture-details.component';

describe('CaptureDetailsComponent', () => {
  let component: CaptureDetailsComponent;
  let fixture: ComponentFixture<CaptureDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
