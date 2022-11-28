import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Pagination } from 'app/core/request/request.model';
import { Observable } from 'rxjs';
import { Journey } from './journey/journey.model';

@Injectable({ providedIn: 'root' })
export class JourneysService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/journeys');
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(story: Journey): Observable<Journey> {
    return this.http.post<Journey>(this.resourceUrl, story);
  }

  update(story: Journey): Observable<Journey> {
    return this.http.put<Journey>(this.resourceUrl, story);
  }

  find(id: number): Observable<Journey> {
    return this.http.get<Journey>(`${this.resourceUrl}`);
  }

  findAll(): Observable<Journey[]> {
    return this.http.get<Journey[]>(`${this.resourceUrl}`);
  }

  query(req?: Pagination): Observable<HttpResponse<Journey[]>> {
    const options = createRequestOption(req);
    return this.http.get<Journey[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }
}
