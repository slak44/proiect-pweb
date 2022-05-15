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
}
