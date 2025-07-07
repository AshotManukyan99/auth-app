import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let mockRouter: { navigate: never };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clearData', () => {
    beforeEach(() => {
      jest.spyOn(sessionStorage, 'removeItem');
      jest.spyOn(localStorage, 'clear');
      component.userData = { email: 'test', password: '123' };
      component.experienceData = { industry: 'x', years: 'y', role: 'z' };
      component.aboutUsData = { aboutUs: 'desc' };
    });

    it('should clear all stored data and navigate to /auth', () => {
      component.clearData();

      expect(sessionStorage.removeItem).toHaveBeenCalledWith('registeredUser');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('experienceData');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('aboutUsData');
      expect(localStorage.clear).toHaveBeenCalled();

      expect(component.userData).toBeNull();
      expect(component.experienceData).toBeNull();
      expect(component.aboutUsData).toBeNull();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth']);
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      jest.spyOn(sessionStorage, 'removeItem');
      component.userData = { email: 'test', password: '123' };
      component.experienceData = { industry: 'x', years: 'y', role: 'z' };
      component.aboutUsData = { aboutUs: 'desc' };
    });

    it('should remove items and navigate to login', () => {
      component.logout();

      expect(sessionStorage.removeItem).toHaveBeenCalledWith('registeredUser');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('experienceData');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('aboutUsData');

      expect(component.userData).toBeNull();
      expect(component.experienceData).toBeNull();
      expect(component.aboutUsData).toBeNull();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
    });
  });
});
