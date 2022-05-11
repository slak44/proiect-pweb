import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  private readonly showCreatePostSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public readonly showCreatePost$: Observable<boolean> = this.showCreatePostSubject;

  constructor() {
  }

  public setShowCreatePost(showButton: boolean): void {
    this.showCreatePostSubject.next(showButton);
  }
}
