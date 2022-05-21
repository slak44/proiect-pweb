import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, first, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { AppUser, UserType } from '../models/user.model';
import { AuthService, User } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly currentUserSubject: BehaviorSubject<AppUser | null> = new BehaviorSubject<AppUser | null>(null);

  public readonly currentUser$: Observable<AppUser | null> = this.currentUserSubject;

  public readonly isCurrentUserAdmin$: Observable<boolean> = this.currentUser$.pipe(
    switchMap(() => this.authService.getAccessTokenSilently()),
    map(token => {
      const claimsBase64 = token.split('.')[1];
      const claimsStr = atob(claimsBase64);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const claims = JSON.parse(claimsStr);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      const roles: string[] = claims['https://pweb-app.example.com/roles'];

      return roles.includes(UserType.ADMIN);
    }),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  constructor(
    private readonly authService: AuthService,
    private readonly httpClient: HttpClient,
  ) {
    this.authService.user$.pipe(first((user): user is User => !!user)).subscribe((user) => {
      this.currentUserSubject.next({
        id: '123',
        username: user.name!,
        picture: user.picture,
        isEnabled: true,
        isUserVerified: true,
        type: UserType.USER,
        email: user.email!
      });

      // this.changeAccountType(user.sub!, UserType.ADMIN).subscribe(console.log);
    });
  }

  public logout(): void {
    this.authService.logout({ returnTo: window.location.origin });
  }

  public getUserById(id: string): Observable<AppUser> {
    return this.httpClient.get<AppUser>(`${environment.baseUrl}/api/users/${id}`);
  }

  public getUserList(): Observable<AppUser[]> {
    return this.httpClient.get<AppUser[]>(`${environment.baseUrl}/api/users`);
  }

  public changeAccountType(userId: string, type: UserType): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/api/users/${userId}/change-role/${type}`, {});
  }

  public updateEnabledState(userId: string, enabled: boolean): Observable<void> {
    // FIXME
    void userId;
    void enabled;
    return of(void null);
  }

  public updateVerifiedState(userId: string, verified: boolean): Observable<void> {
    // FIXME
    void userId;
    void verified;
    return of(void null);
  }

  public updateUserDetails(userId: string, username: string, email: string, picture?: File): Observable<void> {
    // FIXME
    void username;
    void email;
    void picture;
    return of(void null);
  }
}
