import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: { getFromSessionStorage: jest.Mock; saveToSessionStorage: jest.Mock };
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockAuthService = {
      getFromSessionStorage: jest.fn(),
      saveToSessionStorage: jest.fn(),
    };
    mockRouter = {};

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form values from session on ngOnInit when data exists', () => {
    const stored = { email: 'a@b.com', password: 'pass123' };
    mockAuthService.getFromSessionStorage.mockReturnValue(stored);

    component.ngOnInit();

    expect(mockAuthService.getFromSessionStorage).toHaveBeenCalledWith('registeredUser');
    expect(component.registerForm.value).toEqual({
      email: stored.email,
      password: stored.password,
      confirmPassword: stored.password,
    });
  });

  it('should not patch form when no session data', () => {
    mockAuthService.getFromSessionStorage.mockReturnValue(null);

    component.ngOnInit();

    expect(component.registerForm.value).toEqual({
      email: '', password: '', confirmPassword: ''
    });
  });

  it('togglePassword should invert hidePassword signal', () => {
    const initial = component.hidePassword();
    component.togglePassword(new MouseEvent('click'));
    expect(component.hidePassword()).toBe(!initial);
  });

  it('toggleConfirmPassword should invert hideConfirmPassword signal', () => {
    const initial = component.hideConfirmPassword();
    component.toggleConfirmPassword(new MouseEvent('click'));
    expect(component.hideConfirmPassword()).toBe(!initial);
  });

  it('getter email should return the email form control', () => {
    expect(component.email).toBe(component.registerForm.get('email'));
  });

  it('getter password should return the password form control', () => {
    expect(component.password).toBe(component.registerForm.get('password'));
  });

  it('getter confirmPassword should return the confirmPassword form control', () => {
    expect(component.confirmPassword).toBe(component.registerForm.get('confirmPassword'));
  });

  describe('onRegister', () => {
    it('should not call save or emit when form is invalid', () => {
      component.registerForm.setValue({ email: '', password: '', confirmPassword: '' });
      const emitSpy = jest.spyOn(component.formSubmitted, 'emit');

      component.onRegister();

      expect(mockAuthService.saveToSessionStorage).not.toHaveBeenCalled();
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should save and emit when form is valid', () => {
      const validData = { email: 'x@y.com', password: 'abc', confirmPassword: 'abc' };
      component.registerForm.setValue(validData);
      const emitSpy = jest.spyOn(component.formSubmitted, 'emit');

      component.onRegister();

      expect(mockAuthService.saveToSessionStorage).toHaveBeenCalledWith(
        'registeredUser',
        { email: 'x@y.com', password: 'abc', confirmPassword: 'abc' }
      );
      expect(emitSpy).toHaveBeenCalled();
    });
  });
});
