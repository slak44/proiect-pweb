import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, of } from 'rxjs';
import { AppUser, UserType } from '../models/user.model';
import { AuthService, User } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly currentUserSubject: BehaviorSubject<AppUser | null> = new BehaviorSubject<AppUser | null>(null);

  public readonly currentUser$: Observable<AppUser | null> = this.currentUserSubject;

  public readonly isCurrentUserAdmin$: Observable<boolean> = of(false); // FIXME

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

      this.httpClient.get('http://localhost:8080/api/posts').subscribe(console.log);
    });
  }

  public logout(): void {
    this.authService.logout({ returnTo: window.location.origin });
  }

  public getUserById(id: string): Observable<AppUser> {
    // FIXME
    return of({
      id,
      username: 'gives_stuff99',
      email: 'gives_stuff99@example.com',
      picture: '/assets/test.png',
      type: UserType.USER,
      isUserVerified: true,
      isEnabled: true,
    });
  }

  public getUserList(): Observable<AppUser[]> {
    // FIXME
    const a = {
      id: '123546',
      username: 'gives_stuff99',
      email: 'gives_stuff99@example.com',
      picture: '/assets/test.png',
      type: UserType.USER,
      isUserVerified: true,
      isEnabled: true,
    };

    return of([
      a, a, a, a, a,
    ]);
  }

  public changeAccountType(userId: string, type: UserType): Observable<void> {
    // FIXME
    void userId;
    void type;
    return of(void null);
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
