import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Product} from '../models/products.model';
import {catchError, map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    dummyProducts: Product[];
    private apiUrl = '/api/v1/product';

    constructor(private http: HttpClient) {
    }

    fetchAllProducts(pageNumber: number, pageSize: number): Observable<{ products: Product[], total: number }> {
        return this.http.get(`${this.apiUrl}/getAllProducts/${pageNumber}/${pageSize}`).pipe(
            map((response: any) => {
                if (response.responseCode === '00' && response.data && response.data.productsList) {
                    // Map the response to Product objects
                    const products: Product[] = response.data.productsList.map(product => ({
                        id: product.id,
                        productName: product.name,
                        supplier: product.company ? product.company.companyName : '',
                        wp: product.wp,
                        code: product.code,
                        barcode: product.barcode,
                        packSize: product.packSize,
                        cartoonSize: product.cartonSize,
                        category: product.categeory ? product.categeory.categoryName : '',
                        unit: product.units,
                        tax: product.taxable,
                        hsCode: product.hsCode,
                        country: product.country,
                        length: product.length,
                        width: product.widthDepth,
                        height: product.height,
                        grossWeight: product.grossWtPc,
                    }));
                    this.dummyProducts = products;
                    return {products, total: +response.data.totalProductDetails}; // Return both products and total count
                } else {
                    throw new Error(response.responseDescription || 'Failed to fetch products');
                }
            }),
            catchError(error => {
                console.error('Error fetching products:', error);
                return [];
            })
        );
    }

    fetchProductById(productId){
       return this.http.get(`${this.apiUrl}/getProduct/`+productId);
    }

    filterProductsByName(filterValue: string): Observable<Product[]> {
        const params = new HttpParams().set('keyword', filterValue).set('searchType', 'product'); // Assuming backend expects a query parameter `name`
        return this.http.get(`${this.apiUrl}/filterProductsByName`, {params}).pipe(
            map((response: any) => {
                if (response.responseCode === '00' && response.data && response.data.productsList) {
                    return response.data.productsList.map(product => ({
                        productName: product.name,
                        supplier: product.company ? product.company.companyName : '',
                        wp: product.wp,
                        code: product.code,
                        barcode: product.barcode,
                        packSize: product.packSize,
                        cartoonSize: product.cartonSize,
                        category: product.categeory ? product.categeory.categoryName : '',
                        unit: product.units,
                        tax: product.taxable,
                        hsCode: product.hsCode,
                        country: product.country,
                        length: product.length,
                        width: product.widthDepth,
                        height: product.height,
                        grossWeight: product.grossWtPc,
                    }));
                } else {
                    throw new Error(response.responseDescription || 'Failed to filter products');
                }
            }),
            catchError(error => {
                console.error('Error filtering products:', error);
                return of([]); // Return an empty array as a fallback
            })
        );
    }

    addProduct(product: Product) {
        this.dummyProducts.push(product);
        return of(true);
    }

    uploadProductImage(formData: FormData){
        return this.http.post(`${this.apiUrl}/uploadProductImage`,formData);
    }
}
