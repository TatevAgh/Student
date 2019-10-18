import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditGroupsComponent } from './create-edit-groups.component';

describe('CreateEditGroupsComponent', () => {
  let component: CreateEditGroupsComponent;
  let fixture: ComponentFixture<CreateEditGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
