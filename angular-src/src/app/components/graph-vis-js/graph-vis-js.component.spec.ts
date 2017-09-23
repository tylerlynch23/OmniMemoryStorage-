import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphVisJsComponent } from './graph-vis-js.component';

describe('GraphVisJsComponent', () => {
  let component: GraphVisJsComponent;
  let fixture: ComponentFixture<GraphVisJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphVisJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphVisJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
