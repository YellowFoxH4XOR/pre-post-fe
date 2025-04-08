import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  PreCheckRequest, 
  PreCheckResponse, 
  PostCheckRequest, 
  PostCheckResponse,
  CheckListResponse 
} from '../models/check.model';
import { BatchStatusResponse, BatchDiffResponse } from '../models/batch.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Add the missing getActiveBatches method
  getActiveBatches(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/batches/active`);
  }

  // PreCheck API
  createPreCheck(request: PreCheckRequest): Observable<PreCheckResponse> {
    return this.http.post<PreCheckResponse>(`${this.apiUrl}/precheck`, request);
  }

 // PostCheck API
  createPostCheck(request: PostCheckRequest, batchId: string): Observable<PostCheckResponse> {
    return this.http.post<PostCheckResponse>(`${this.apiUrl}/postcheck/${batchId}`, request);
  }

  getChecks(
    deviceIp?: string,
    status?: string,
    dateRange?: string,
    batchId?: string,
    page?: number
  ): Observable<CheckListResponse> {
    let params = new HttpParams();
    if (deviceIp) params = params.set('device_ip', deviceIp);
    if (status) params = params.set('status', status);
    if (dateRange) params = params.set('date_range', dateRange);
    if (batchId) params = params.set('batch_id', batchId);
    if (page) params = params.set('page', page.toString());

    return this.http.get<CheckListResponse>(`${this.apiUrl}/checks`, { params });
  }
}