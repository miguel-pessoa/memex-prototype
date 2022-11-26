import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Pagination } from 'app/core/request/request.model';
import { Observable } from 'rxjs';
import { UserProfile } from './user-profile.model';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/user-profiles');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.resourceUrl, userProfile);
  }

  update(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(this.resourceUrl, userProfile);
  }

  find(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.resourceUrl}/id/${id}`);
  }

  findByUsername(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.resourceUrl}/username/${username}`);
  }

  findAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.resourceUrl}`);
  }

  query(req?: Pagination): Observable<HttpResponse<UserProfile[]>> {
    const options = createRequestOption(req);
    return this.http.get<UserProfile[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`);
  }
}
