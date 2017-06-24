import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomicArrayComponent } from './atomic-array.component';

describe('AtomicArrayComponent', () => {
  let component: AtomicArrayComponent;
  let fixture: ComponentFixture<AtomicArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtomicArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomicArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
