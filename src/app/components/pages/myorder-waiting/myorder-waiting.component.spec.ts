import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderWaitingComponent } from './myorder-waiting.component';

describe('MyorderWaitingComponent', () => {
  let component: MyorderWaitingComponent;
  let fixture: ComponentFixture<MyorderWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyorderWaitingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
