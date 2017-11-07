import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tast2Component } from './tast2.component';

describe('Tast2Component', () => {
  let component: Tast2Component;
  let fixture: ComponentFixture<Tast2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tast2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tast2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
