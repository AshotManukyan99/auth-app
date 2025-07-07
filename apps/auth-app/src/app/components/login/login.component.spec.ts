import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: { getUserDetails: jest.Mock };
  let mockRouter: { navigate: jest.Mock };
  let mockSnackBar: { open: jest.Mock };

  beforeEach(async () => {
    mockAuthService = { getUserDetails: jest.fn() };
    mockRouter = { navigate: jest.fn() };
    mockSnackBar = { open: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle hidePassword signal', () => {
    // default is true
    expect(component.hidePassword()).toBe(true);
    component.togglePassword(new MouseEvent('click'));
    expect(component.hidePassword()).toBe(false);
    component.togglePassword(new MouseEvent('click'));
    expect(component.hidePassword()).toBe(true);
  });

  it('should not attempt login when form is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onLogin();
    expect(mockAuthService.getUserDetails).not.toHaveBeenCalled();
  });

  it('should navigate to user-card on valid credentials', () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    (mockAuthService.getUserDetails as jest.Mock).mockReturnValue(of([{ id: 1 }]));

    component.loginForm.setValue({ email: testEmail, password: testPassword });
    component.onLogin();

    expect(mockAuthService.getUserDetails).toHaveBeenCalledWith(testEmail, testPassword);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/user-card']);
  });

  it('should show snackBar on invalid credentials', () => {
    const testEmail = 'bad@example.com';
    const testPassword = 'wrong';
    (mockAuthService.getUserDetails as jest.Mock).mockReturnValue(of([]));

    component.loginForm.setValue({ email: testEmail, password: testPassword });
    component.onLogin();

    expect(mockAuthService.getUserDetails).toHaveBeenCalledWith(testEmail, testPassword);
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Invalid credentials',
      'Close',
      expect.objectContaining({ duration: 3000 })
    );
  });

  it('should show snackBar on login error', fakeAsync(() => {
    const testEmail = 'error@example.com';
    const testPassword = 'error';
    (mockAuthService.getUserDetails as jest.Mock).mockReturnValue(
      throwError(() => new Error('Network error'))
    );

    component.loginForm.setValue({ email: testEmail, password: testPassword });
    component.onLogin();
    tick();

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Login failed. Please try again.',
      'Close',
      expect.objectContaining({ duration: 3000 })
    );
  }));

  it('getter email should return the email FormControl', () => {
    expect(component.email).toBe(component.loginForm.get('email'));
  });

  it('getter password should return the password FormControl', () => {
    expect(component.password).toBe(component.loginForm.get('password'));
  });
});
