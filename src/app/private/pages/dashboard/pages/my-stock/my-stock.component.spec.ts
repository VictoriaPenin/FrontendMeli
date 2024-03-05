import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyStockComponent } from './my-stock.component';


describe('MyStockComponent', () => {
  let component: MyStockComponent;
  let fixture: ComponentFixture<MyStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyStockComponent]
    })
    .compileComponents();
<<<<<<< HEAD

=======
    
>>>>>>> 4ac7c9d42bc6be4de3def1176809243de56bd3f7
    fixture = TestBed.createComponent(MyStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
