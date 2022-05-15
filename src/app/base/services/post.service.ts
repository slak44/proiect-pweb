import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import {
  CreatePost,
  CreateInteraction,
  Post,
  PostCategory,
  PostType,
  OwnedPost,
  Interaction,
} from '../models/post.model';

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
      interactionCount: 2,
      tags: [
        'cool',
        'Very Important And Stuff',
        'puckfutin',
        'hello',
      ],
    });
  }

  public getAllPosts(): Observable<Post[]> {
    const a = {
      id: 123,
      category: PostCategory.FOOD,
      description: 'I am offering the thing in the picture. Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      imageUrl: '/assets/test-post.png',
      isRetired: false,
      ownerId: 1221343,
      type: PostType.OFFER,
      title: 'Offering free soup to people in this city',
      upvotes: 54,
      upvoted: true,
      downvoted: false,
      interactionCount: 2,
      tags: [
        'cool',
        'Very Important And Stuff',
        'puckfutin',
        'hello',
      ],
    };

    return of([a, a, a, a, a, a, a, a, a]);
  }

  public getMyPosts(): Observable<OwnedPost[]> {
    const i: Interaction = {
      phone: '0777777777',
      text: 'I need it for something that is very very very very very very important',
      email: 'gigel@example.com',
      name: 'Gigel Popescu'
    };

    const a: OwnedPost = {
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
      interactionCount: 2,
      tags: [
        'cool',
        'Very Important And Stuff',
        'puckfutin',
        'hello',
      ],
      interactions: [
        i, i, i, i
      ]
    };

    return of([a, a, a, a, a, a, a, a, a]);
  }


  public addTag(postId: number, tagText: string): Observable<void> {
    // FIXME
    void postId;
    void tagText;
    return of(void null);
  }

  public removeTag(postId: number, tagText: string): Observable<void> {
    // FIXME
    void postId;
    void tagText;
    return of(void null);
  }

  public createPost(createPost: CreatePost): Observable<Post> {
    // FIXME
    return of({
      id: 12354,
      ...createPost,
      upvotes: 54,
      upvoted: true,
      downvoted: false,
      interactionCount: 2,
      isRetired: false,
      ownerId: 123,
    }).pipe(delay(2000));
  }

  public interact(postId: number, interaction: CreateInteraction): Observable<void> {
    // FIXME
    void postId;
    void interaction;
    return of(void null);
  }
}
