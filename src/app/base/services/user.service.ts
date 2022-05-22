import { Injectable } from '@angular/core';
import { BehaviorSubject, first, from, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { AppUser, UserType } from '../models/user.model';
import { AuthService, User } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { fileToDataUrl } from '../file-data-url';

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
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  constructor(
    private readonly authService: AuthService,
    private readonly httpClient: HttpClient,
  ) {
    this.authService.user$.pipe(
      first((user): user is User => !!user),
      switchMap((user) => this.getCurrentUser().pipe(
        map((appUser) => {
          if (appUser.email === null) {
            this.updateUserDetails(user.sub!, user.name!, user.email!).subscribe();
          }

          this.currentUserSubject.next({
            ...appUser,
            id: user.sub!,
            username: appUser.username || user.name!,
            picture: appUser.picture || user.picture,
            email: appUser.email || user.email!,
          });
        })),
      ),
    ).subscribe();
  }

  public getCurrentUser(): Observable<AppUser> {
    return this.httpClient.get<AppUser>(`${environment.baseUrl}/api/users/current`);
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
    return this.httpClient.post<void>(`${environment.baseUrl}/api/users/${userId}/change-enabled/${enabled}`, {});
  }

  public updateVerifiedState(userId: string, verified: boolean): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/api/users/${userId}/change-verified/${verified}`, {});
  }

  public updateUserDetails(userId: string, username: string, email: string, picture?: File): Observable<void> {
    const dataUrl$ = picture ? from(fileToDataUrl(picture)) : of('');

    return dataUrl$.pipe(
      switchMap(dataUrl => this.httpClient.put<void>(`${environment.baseUrl}/api/users/${userId}`, {
        username,
        email,
        picture: dataUrl,
      }))
    );
  }
}
