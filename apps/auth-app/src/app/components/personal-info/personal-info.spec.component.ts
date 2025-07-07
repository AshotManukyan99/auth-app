import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IndustryExperienceComponent } from './personal-info.component';
import { AuthService } from '../../services/auth.service';
import { Industry, UserRole } from '../../helpers';

describe('IndustryExperienceComponent', () => {
  let component: IndustryExperienceComponent;
  let fixture: ComponentFixture<IndustryExperienceComponent>;
  let mockAuthService: { getFromSessionStorage: jest.Mock; saveToSessionStorage: jest.Mock };

  beforeEach(async () => {
    mockAuthService = {
      getFromSessionStorage: jest.fn(),
      saveToSessionStorage: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [IndustryExperienceComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndustryExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with stored data in ngOnInit', () => {
    const stored = { industry: Industry.IT, years: '5', role: UserRole.Manager };
    mockAuthService.getFromSessionStorage.mockReturnValue(stored);

    component.ngOnInit();

    expect(mockAuthService.getFromSessionStorage).toHaveBeenCalledWith('experienceData');
    expect(component.experienceForm.value).toEqual(stored);
  });

  it('should not patch form if no stored data', () => {
    mockAuthService.getFromSessionStorage.mockReturnValue(null);

    component.ngOnInit();

    expect(component.experienceForm.value).toEqual({ industry: '', years: '', role: '' });
  });

  it('getters should return the respective FormControls', () => {
    expect(component.industry).toBe(component.experienceForm.get('industry'));
    expect(component.years).toBe(component.experienceForm.get('years'));
    expect(component.role).toBe(component.experienceForm.get('role'));
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should not save or emit when form is invalid', () => {
      component.experienceForm.setValue({ industry: '', years: '', role: '' });
      component.onSubmit();

      expect(mockAuthService.saveToSessionStorage).not.toHaveBeenCalled();
      expect(component.submitted()).toBe(false);
    });

    it('should save data, set submitted, emit event and reset form after timeout on valid submit', fakeAsync(() => {
      const storedValue = { industry: Industry.Marketing, years: '10', role: UserRole.Developer };
      const emitSpy = jest.spyOn(component.formSubmitted, 'emit');

      component.experienceForm.setValue(storedValue);
      component.onSubmit();

      expect(mockAuthService.saveToSessionStorage).toHaveBeenCalledWith('experienceData', storedValue);
      expect(component.submitted()).toBe(true);
      expect(emitSpy).toHaveBeenCalled();

      tick(2000);
      expect(component.submitted()).toBe(false);
      expect(component.experienceForm.value).toEqual({ industry: null, years: null, role: null });
    }));
  });
});
