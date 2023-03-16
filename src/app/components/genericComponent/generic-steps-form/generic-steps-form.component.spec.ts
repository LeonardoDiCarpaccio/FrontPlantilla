import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericStepsFormComponent } from './generic-steps-form.component';

describe('GenericStepsFormComponent', () => {
  let component: GenericStepsFormComponent;
  let fixture: ComponentFixture<GenericStepsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericStepsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericStepsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
