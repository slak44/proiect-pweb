import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserType } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  public readonly currentUser$: Observable<User | null> = this.currentUserSubject;

  public readonly isCurrentUserAdmin$: Observable<boolean> = of(false); // FIXME

  constructor() {
    this.refreshCurrentUser();
  }

  public refreshCurrentUser(): void {
    // FIXME:
    this.currentUserSubject.next({
      id: 123,
      username: 'gives_stuff99',
      email: 'gives_stuff99@example.com',
      picture: '/assets/test.png',
      type: UserType.USER,
      isUserVerified: true,
      isEnabled: true,
    });
  }

  public logout(): void {
    // TODO
  }

  public getUserById(id: number): Observable<User> {
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

  public getUserList(): Observable<User[]> {
    // FIXME
    const a = {
      id: 123546,
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

  public changeAccountType(userId: number, type: UserType): Observable<void> {
    // FIXME
    void userId;
    void type;
    return of(void null);
  }

  public updateEnabledState(userId: number, enabled: boolean): Observable<void> {
    // FIXME
    void userId;
    void enabled;
    return of(void null);
  }

  public updateVerifiedState(userId: number, verified: boolean): Observable<void> {
    // FIXME
    void userId;
    void verified;
    return of(void null);
  }

  public updateUserDetails(userId: number, username: string, email: string, picture?: File): Observable<void> {
    // FIXME
    void username;
    void email;
    void picture;
    return of(void null);
  }
}
