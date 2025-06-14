import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CircularService {
    private apiUrl = '/api/v1/circular'; // Replace with your actual API endpoint

    constructor(private http: HttpClient) {}

    // Method to upload a new circular
    uploadCircular(circularName: string, company: string, document: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('circularName', circularName);
        formData.append('company', company);
        formData.append('document', document);
        return this.http.post<any>(`${this.apiUrl}/addCircular`, formData);
    }

    fetchCirculars(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getAllCirculars`);
    }

    deleteCircular(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteCircularByID/${id}`);
    }

}
