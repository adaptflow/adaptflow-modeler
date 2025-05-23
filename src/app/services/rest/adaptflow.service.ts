import { Injectable } from '@angular/core';
import { CREDENTIAL_PROVIDERS, GENERATE_EMBEDDINGS, GET_ALL_CREDENTIALS, LLM_PROVIDER, PROCESS_DEFINITION, STORE_EMBEDDINGS } from './adaptflow-mock.data';
import * as Constants from '../../constants/elements.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AF_URLS } from './url.constant';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { UserDetails } from '../../interface/user-details.interface';

@Injectable({
  providedIn: 'root'
})
export class AdaptflowService {
  private apiBaseUrl = environment.apiBaseUrl;
  private httpOptions = { withCredentials: true };

  constructor(private http: HttpClient) { }

  getElement(type: string) {
    if(type==Constants.ELEMENT_TYPE_LLM_PROVIDER) {
      return LLM_PROVIDER;
    }
    if(type==Constants.ELEMENT_TYPE_EMBEDDINGS_GENERATE) {
      return GENERATE_EMBEDDINGS;
    }
    if(type==Constants.ELEMENT_TYPE_EMBEDDINGS_STORE) {
      return STORE_EMBEDDINGS;
    }
    return null;
  }

  getCredentialProviders() {
    return CREDENTIAL_PROVIDERS;
  }

  getAllCredentials() {
    return GET_ALL_CREDENTIALS;
  }

  getAllCredential() {
    const res = this.http.get<any>(this.apiBaseUrl + AF_URLS.getAllCredentialsUrl());
    console.log(res);
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiBaseUrl + AF_URLS.getLoginUrl(), { username, password }, { headers, ...this.httpOptions });
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + AF_URLS.getLogoutUrl(), {}, this.httpOptions);
  }

  getUserDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>(this.apiBaseUrl + AF_URLS.getUserDetailsUrl(), this.httpOptions);
  }

  getProcessDefinition(processId: string): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + AF_URLS.getProcessDefinitionByIdUrl(processId), this.httpOptions);
    // return of(PROCESS_DEFINITION);
  }

  getAllProcessDefinitions(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + AF_URLS.getAllProcessDefinitionsUrl(), this.httpOptions);
  }

  deleteProcessDefinition(processId: string): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + AF_URLS.getProcessDefinitionByIdUrl(processId), this.httpOptions);
  }

  saveProcessDefinition(payload) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiBaseUrl + AF_URLS.getProcessDefinitionSaveUrl(), payload, { headers, ...this.httpOptions })
    .pipe(
      catchError((error) => {
        return this.handleErrorResponse(error.error);
      })
    );
  }

  updateProcessDefinition(processId: string, payload) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiBaseUrl + AF_URLS.getProcessDefinitionByIdUrl(processId), payload, { headers, ...this.httpOptions })
    .pipe(
      catchError((error) => {
        return this.handleErrorResponse(error.error);
      })
    );
  }

  handleErrorResponse(error) {
    return throwError(error.errorCode + " | " + error.errorMessage);
  }
}
