import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BasicService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  private apiUrl: string = environment.api;
  private errorMessage:any;

  constructor(private http: HttpClient) { }
  
  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.apiUrl + path)
  }
  public put(path: string, body: object = {}, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(this.apiUrl + path + { params }, JSON.stringify(body), this.options)
  }
  public post(path: string, body: object = {}): Observable<any> {
    return this.http.post(this.apiUrl + path, JSON.stringify(body), this.options)
  }
  public delete(path: string, params: HttpParams = new HttpParams()): Observable<any>{
    return this.http.delete(this.apiUrl + path +{params})
  }
}
