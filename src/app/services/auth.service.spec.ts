import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({providers: [provideHttpClient(), provideHttpClientTesting()]});
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    localStorage.clear();
  });
  it('stores the login token and removes it on logout', () => {
    const service = TestBed.inject(AuthService);
    service.login({email: 'test@example.com', password: 'test'}).subscribe();
    TestBed.inject(HttpTestingController).expectOne('https://consentimiento-dedikall-backend.vercel.app/auth/login').flush({token: 'test-token'});
    expect(service.getToken()).toBe('test-token');
    service.logout();
    expect(service.getToken()).toBeNull();
  });
  it('rejects a response without a token', () => {
    let rejected = false;
    const service = TestBed.inject(AuthService);
    service.login({email: 'test@example.com', password: 'test'}).subscribe({error: () => rejected = true});
    TestBed.inject(HttpTestingController).expectOne('https://consentimiento-dedikall-backend.vercel.app/auth/login').flush({});
    expect(rejected).toBe(true);
    expect(service.getToken()).toBeNull();
  });
});
