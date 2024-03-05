import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationMlComponent } from './authorization-ml.component';

describe('AuthorizationMlComponent', () => {
  let component: AuthorizationMlComponent;
  let fixture: ComponentFixture<AuthorizationMlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizationMlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorizationMlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
