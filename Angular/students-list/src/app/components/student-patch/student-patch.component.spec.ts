import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPatchComponent } from './student-patch.component';

describe('StudentPatchComponent', () => {
  let component: StudentPatchComponent;
  let fixture: ComponentFixture<StudentPatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
