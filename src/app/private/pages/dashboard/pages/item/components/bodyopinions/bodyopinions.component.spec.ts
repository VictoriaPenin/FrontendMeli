import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyopinionsComponent } from './bodyopinions.component';

describe('BodyopinionsComponent', () => {
  let component: BodyopinionsComponent;
  let fixture: ComponentFixture<BodyopinionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyopinionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyopinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
