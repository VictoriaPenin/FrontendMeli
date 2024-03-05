import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypublicationsComponent } from './mypublications.component';

describe('MypublicationsComponent', () => {
  let component: MypublicationsComponent;
  let fixture: ComponentFixture<MypublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MypublicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MypublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
