import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderailComponent } from './siderail.component';

describe('SiderailComponent', () => {
  let component: SiderailComponent;
  let fixture: ComponentFixture<SiderailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiderailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiderailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
