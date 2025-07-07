/* eslint-disable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterPostData } from '../../interfaces/auth';
import { AuthStepperComponent } from './auth-stepper';

type ExperienceFormData = { industry: string; years: string; role: string };
type AboutUsFormData = { aboutUs: string };

describe('AuthStepperComponent', () => {
  let component: AuthStepperComponent;
  let fixture: ComponentFixture<AuthStepperComponent>;
  let router: Router;
  let authService: AuthService;
  let queryParamsSubject: BehaviorSubject<Params>;
  const activatedRouteStub = {
    queryParams: null,
  } as unknown as Partial<ActivatedRoute>;

  beforeEach(() => {
    queryParamsSubject = new BehaviorSubject<Params>({});
    activatedRouteStub.queryParams = queryParamsSubject.asObservable();

    router = { navigate: jest.fn() } as never as Router;

    authService = {
      getFromSessionStorage: jest.fn(),
      saveToLocalStorage: jest.fn(),
    } as never as AuthService;

    TestBed.configureTestingModule({
      imports: [AuthStepperComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: authService }
      ],
      schemas: [NO_ERRORS_SCHEMA], // ignore child component tags
    });

    fixture = TestBed.createComponent(AuthStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize currentStep from queryParams', () => {
    // default
    expect(component.currentStep()).toBe(0);

    queryParamsSubject.next({ step: '2' });
    expect(component.currentStep()).toBe(2);

    queryParamsSubject.next({ step: '-1' });
    expect(component.currentStep()).toBe(0);

    queryParamsSubject.next({ step: '5' });
    expect(component.currentStep()).toBe(2); // max index = totalSteps-1

    queryParamsSubject.next({ step: 'abc' });
    expect(component.currentStep()).toBe(2); // invalid ignored
  });

  it('setStep should update signal and navigate with correct params', () => {
    component.setStep(1);
    expect(component.currentStep()).toBe(1);
    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: activatedRouteStub,
      queryParams: { step: 1 },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  });

  it('onRegisterFormSubmitted should advance to next step', () => {
    // starting at 0
    (router.navigate as jest.Mock).mockClear();
    component.onRegisterFormSubmitted();
    expect(component.currentStep()).toBe(1);
    expect(router.navigate).toHaveBeenCalled(); // uses setStep internally
  });

  it('onAboutUsSubmitted should save session data and navigate to /user-card', () => {
    // @ts-ignore
    const user: RegisterPostData = { username: 'test', password: 'pw' };
    const exp: ExperienceFormData = { industry: 'X', years: '1', role: 'R' };
    const about: AboutUsFormData = { aboutUs: 'A' };

    // Mock sequential getFromSessionStorage calls
    (authService.getFromSessionStorage as jest.Mock)
      .mockReturnValueOnce(user)
      .mockReturnValueOnce(exp)
      .mockReturnValueOnce(about);

    component.onAboutUsSubmitted();

    expect(authService.saveToLocalStorage).toHaveBeenCalledWith('registeredUser', user);
    expect(authService.saveToLocalStorage).toHaveBeenCalledWith('experienceData', exp);
    expect(authService.saveToLocalStorage).toHaveBeenCalledWith('aboutUsData', about);
    expect(router.navigate).toHaveBeenCalledWith(['/user-card']);
  });
});
