import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderHistoryComponent } from './myorder-history.component';

describe('MyorderHistoryComponent', () => {
  let component: MyorderHistoryComponent;
  let fixture: ComponentFixture<MyorderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyorderHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
