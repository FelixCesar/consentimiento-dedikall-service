import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  const api = 'https://consentimiento-dedikall-backend.vercel.app/datos';
  const logout = vi.fn();
  beforeEach(() => {
    logout.mockClear();
    TestBed.configureTestingModule({providers: [
      provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting(), provideRouter([]),
      {provide: AuthService, useValue: {getToken: () => 'session-token', logout}}
    ]});
  });
  afterEach(() => TestBed.inject(HttpTestingController).verify());
  it('attaches the token to the data API', () => {
    TestBed.inject(HttpClient).get(api).subscribe();
    const request = TestBed.inject(HttpTestingController).expectOne(api);
    expect(request.request.headers.get('Authorization')).toBe('Bearer session-token');
    request.flush({});
  });
  it('does not send the token to another origin', () => {
    const url = 'https://example.com/datos';
    TestBed.inject(HttpClient).get(url).subscribe();
    const request = TestBed.inject(HttpTestingController).expectOne(url);
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({});
  });
  it('clears the session and returns to login on an unauthorized API response', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    TestBed.inject(HttpClient).get(api).subscribe({error: () => {}});
    TestBed.inject(HttpTestingController).expectOne(api).flush({}, {status: 401, statusText: 'Unauthorized'});
    expect(logout).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/']);
  });
});
