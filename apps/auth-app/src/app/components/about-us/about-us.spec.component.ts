import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './about-us.component';
import { AuthService } from '../../services/auth.service';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      getFromSessionStorage: jest.fn(),
      saveToSessionStorage: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        AboutUsComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with stored data in ngOnInit', () => {
    const stored = { aboutUs: 'Hello World' };
    (mockAuthService.getFromSessionStorage as jest.Mock).mockReturnValue(stored);

    component.ngOnInit();
    expect(component.aboutUsForm.value.aboutUs).toBe('Hello World');
    expect(mockAuthService.getFromSessionStorage).toHaveBeenCalledWith('aboutUsData');
  });

  it('should not patch form if no stored data', () => {
    (mockAuthService.getFromSessionStorage as jest.Mock).mockReturnValue(null);

    component.ngOnInit();
    expect(component.aboutUsForm.value.aboutUs).toBe('');
  });

  it('getter aboutUs should return the FormControl', () => {
    const ctrl = component.aboutUs;
    expect(ctrl.value).toBe(component.aboutUsForm.get('aboutUs')?.value);
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      fixture.detectChanges();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should not submit invalid form', () => {
      component.onSubmit();
      expect(mockAuthService.saveToSessionStorage).not.toHaveBeenCalled();
    });

    it('should submit valid form and reset', fakeAsync(() => {
      const spyEmit = jest.spyOn(component.formSubmitted, 'emit');
      const testValue = 'About description';

      component.aboutUsForm.setValue({ aboutUs: testValue });
      component.onSubmit();

      expect(mockAuthService.saveToSessionStorage).toHaveBeenCalledWith('aboutUsData', { aboutUs: testValue });
      expect(component.submitted()).toBe(true);
      expect(component.aboutUsForm.value.aboutUs).toBeNull();

      tick(3000);
      expect(component.submitted()).toBe(false);
      expect(spyEmit).toHaveBeenCalled();
    }));
  });
});
