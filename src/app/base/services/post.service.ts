import { Injectable } from '@angular/core';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { CreateInteraction, CreatePost, OwnedPost, Post } from '../models/post.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { fileToDataUrl } from '../file-data-url';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getLatestPost(): Observable<Post | null> {
    return this.httpClient.get<Post>(`${environment.baseUrl}/api/posts/latest`).pipe(
      map(post => !('type' in post) ? null : post),
    );
  }

  public getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${environment.baseUrl}/api/posts`);
  }

  public getMyPosts(): Observable<OwnedPost[]> {
    return this.httpClient.get<OwnedPost[]>(`${environment.baseUrl}/api/posts/get-user-posts`);
  }

  public addTags(postId: number, tags: string[]): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/api/posts/${postId}/add-tags`, { tags });
  }

  public removeTag(postId: number, tag: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/api/posts/${postId}/remove-tag`, { tag });
  }

  public upvote(postId: number): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/api/posts/${postId}/upvote`, {});
  }

  public downvote(postId: number): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/api/posts/${postId}/downvote`, {});
  }

  public createPost(createPost: CreatePost): Observable<Post> {
    const image$ = createPost.image ? from(fileToDataUrl(createPost.image)) : of('');

    return image$.pipe(
      map(image => ({ ...createPost, image })),
      switchMap(body => this.httpClient.post<Post>(`${environment.baseUrl}/api/posts`, body)),
    );
  }

  public interact(postId: number, interaction: CreateInteraction): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/api/posts/${postId}/interact`, interaction);
  }

  public deletePost(postId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseUrl}/api/posts/${postId}`);
  }

  public retirePost(postId: number): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/api/posts/${postId}/retire`, {});
  }

  public editDescription(postId: number, description: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/api/posts/${postId}/edit-description`, { description });
  }
}
