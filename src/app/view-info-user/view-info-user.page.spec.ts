import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInfoUserPage } from './view-info-user.page';

describe('ViewInfoUserPage', () => {
  let component: ViewInfoUserPage;
  let fixture: ComponentFixture<ViewInfoUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInfoUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInfoUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
