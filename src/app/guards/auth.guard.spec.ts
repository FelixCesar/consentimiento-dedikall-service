import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, provideRouter } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let token: string | null;
  beforeEach(() => {
    token = null;
    TestBed.configureTestingModule({ providers: [provideRouter([]),
      { provide: AuthService, useValue: { getToken: () => token } }
    ] });
  });
  const run = () => TestBed.runInInjectionContext(() =>
    authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
  it('redirects unauthenticated visitors to the login page', () => {
    expect(TestBed.inject(Router).serializeUrl(run() as ReturnType<Router['createUrlTree']>)).toBe('/');
  });
  it('allows a stored session', () => {
    token = 'session-token';
    expect(run()).toBe(true);
  });
});
