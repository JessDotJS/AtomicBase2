import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomicObjectComponent } from './atomic-object.component';

describe('AtomicObjectComponent', () => {
  let component: AtomicObjectComponent;
  let fixture: ComponentFixture<AtomicObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtomicObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomicObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
