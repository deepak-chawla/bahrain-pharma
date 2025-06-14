import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private apiUrl = '/api/v1/route';

    private marketApiUrl = '/api/v1/market';

    constructor(private http: HttpClient) {}

    // Fetch all routes
    getRoutes(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAllRoutes`);
    }

    // Add a new route
    addRoute(route: any): Observable<any> {
        return this.http.post(`/api/v1/route/addRoute`, route);
    }

    // Assign route to a user
    assignRouteToUser(assignRouteRequest: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/assignRouteToUser`, assignRouteRequest);
    }

    // Fetch user routes by day
    getUserRoutesByDay(day: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/getUserRoutesByDay?days=${day}`);
    }

    // Fetch all user routes
    getAllUserRoutes(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAllAssignedRoutes`);
    }

    // Delete a route by ID
    deleteRoute(routeID: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/deleteRouteByID/${routeID}`);
    }

    getAllUsers(): Observable<any>{
        return this.http.get(`/api/v1/user/getAllUsers`);
    }

    addMarket(formData: any): Observable<any> {
        return this.http.post(`${this.marketApiUrl}/addMarket`, formData);
    }

    fetchAllMarkets(): Observable<any> {
        return this.http.get(`${this.marketApiUrl}/getAllMarkets`);
    }

    deleteMarketById(id:any): Observable<any> {
        return this.http.delete(`${this.marketApiUrl}/deleteMarketByID/${id}`);
    }
}
