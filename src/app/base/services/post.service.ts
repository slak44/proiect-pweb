import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post, PostCategory, PostType, Tag } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor() {
  }

  public getLatestPost(): Observable<Post> {
    // FIXME
    return of({
      id: 123,
      category: PostCategory.FOOD,
      description: 'I am offering the thing in the picture. Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      imageUrl: '/assets/test-post.png',
      isRetired: false,
      ownerId: 123,
      type: PostType.OFFER,
      title: 'Offering free soup to people in this city',
      upvotes: 54,
      upvoted: true,
      downvoted: false,
      interactions: 2,
      tags: [
        { id: 1, text: 'cool' },
        { id: 2, text: 'Very Important And Stuff' },
        { id: 3, text: 'puckfutin' },
        { id: 4, text: 'hello' },
      ],
    });
  }

  public addTag(postId: number, tagText: string): Observable<Tag> {
    // FIXME
    void postId;
    return of({ id: 1234, text: tagText });
  }

  public removeTag(postId: number, tagId: number): Observable<void> {
    // FIXME
    void postId;
    void tagId;
    return of(void null);
  }
}
