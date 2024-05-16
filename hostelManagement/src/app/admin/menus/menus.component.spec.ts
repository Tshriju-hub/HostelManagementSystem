import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenussComponent } from './menus.component';

describe('MenussComponent', () => {
  let component: MenussComponent;
  let fixture: ComponentFixture<MenussComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenussComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
