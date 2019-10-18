import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditStudentComponent } from './create-edit-student.component';

describe('CreateEditStudentComponent', () => {
  let component: CreateEditStudentComponent;
  let fixture: ComponentFixture<CreateEditStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
