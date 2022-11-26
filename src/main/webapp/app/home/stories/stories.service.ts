import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Pagination } from 'app/core/request/request.model';
import { Observable } from 'rxjs';
import { Story } from './story/story.model';

@Injectable({ providedIn: 'root' })
export class StoriesService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/stories');

  private stories: Story[] = [];
  private imageStory = '';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getStories(): Story[] {
    return this.stories;
  }

  pushStory(story: Story): void {
    this.stories.push(story);
  }

  create(story: Story): Observable<Story> {
    return this.http.post<Story>(this.resourceUrl, story);
  }

  update(story: Story): Observable<Story> {
    return this.http.put<Story>(this.resourceUrl, story);
  }

  find(id: number): Observable<Story> {
    return this.http.get<Story>(`${this.resourceUrl}`);
  }

  findAll(): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.resourceUrl}`);
  }

  query(req?: Pagination): Observable<HttpResponse<Story[]>> {
    const options = createRequestOption(req);
    return this.http.get<Story[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  addImage(image: string): void {
    this.imageStory = image;
  }

  getImageStory(): string {
    return this.imageStory;
  }
}
