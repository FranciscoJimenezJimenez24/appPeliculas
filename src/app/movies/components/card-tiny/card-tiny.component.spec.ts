import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTinyComponent } from './card-tiny.component';

describe('CardTinyComponent', () => {
  let component: CardTinyComponent;
  let fixture: ComponentFixture<CardTinyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTinyComponent]
    });
    fixture = TestBed.createComponent(CardTinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
