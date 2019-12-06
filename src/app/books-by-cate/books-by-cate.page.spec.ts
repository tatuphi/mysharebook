import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksByCatePage } from './books-by-cate.page';

describe('BooksByCatePage', () => {
  let component: BooksByCatePage;
  let fixture: ComponentFixture<BooksByCatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksByCatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksByCatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
