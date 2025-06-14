import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCircularComponent } from './view-circular.component';

describe('ViewRawMaterialComponent', () => {
  let component: ViewCircularComponent;
  let fixture: ComponentFixture<ViewCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCircularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
