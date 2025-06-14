import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Order, OrderProducts} from '../models/orders.model';


@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    dummyOrders: Order[] = [
        {
            orderId: 'ORD001',
            customerName: 'John Doe',
            orderOn: '2024-08-01',
            distributorName: 'Distributor X',
            productsQuantity: 10,
            orderStatus: 'Processing'
        },
        {
            orderId: 'ORD002',
            customerName: 'Jane Smith',
            orderOn: '2024-08-02',
            distributorName: 'Distributor Y',
            productsQuantity: 15,
            orderStatus: 'Processing'
        },
        {
            orderId: 'ORD003',
            customerName: 'Alice Johnson',
            orderOn: '2024-08-03',
            distributorName: 'Distributor Z',
            productsQuantity: 20,
            orderStatus: 'Processing'
        },
        {
            orderId: 'ORD004',
            customerName: 'Bob Brown',
            orderOn: '2024-08-04',
            distributorName: 'Distributor W',
            productsQuantity: 5,
            orderStatus: 'Processing'
        },
        {
            orderId: 'ORD005',
            customerName: 'Charlie Davis',
            orderOn: '2024-08-05',
            distributorName: 'Distributor V',
            productsQuantity: 12,
            orderStatus: 'Cancelled'
        },
        {
            orderId: 'ORD006',
            customerName: 'Daisy Evans',
            orderOn: '2024-08-06',
            distributorName: 'Distributor U',
            productsQuantity: 8,
            orderStatus: 'Delivered'
        },
        {
            orderId: 'ORD007',
            customerName: 'Evan Foster',
            orderOn: '2024-08-07',
            distributorName: 'Distributor T',
            productsQuantity: 18,
            orderStatus: 'Processing'
        },
        {
            orderId: 'ORD008',
            customerName: 'Fiona Green',
            orderOn: '2024-08-08',
            distributorName: 'Distributor S',
            productsQuantity: 25,
            orderStatus: 'Processing'
        },
        {
            orderId: 'ORD009',
            customerName: 'George Harris',
            orderOn: '2024-08-09',
            distributorName: 'Distributor R',
            productsQuantity: 7,
            orderStatus: 'Processing'
        },
        {
            orderId: 'ORD010',
            customerName: 'Hannah Ingram',
            orderOn: '2024-08-10',
            distributorName: 'Distributor Q',
            productsQuantity: 30,
            orderStatus: 'Processing'
        }
    ];

    dummyOrderProducts: OrderProducts[] = [
        {
            productName: 'Paracetamol',
            quatity: 100,
            description: 'Pain reliever and fever reducer',
            remarks: 'Frequently prescribed for mild pain and fever'
        },
        {
            productName: 'Amoxicillin',
            quatity: 50,
            description: 'Antibiotic for bacterial infections',
            remarks: 'High demand due to common infections'
        },
        {
            productName: 'Ibuprofen',
            quatity: 200,
            description: 'Nonsteroidal anti-inflammatory drug (NSAID)',
            remarks: 'Popular for pain and inflammation'
        },
        {
            productName: 'Lisinopril',
            quatity: 75,
            description: 'Medication for high blood pressure',
            remarks: 'Essential for hypertension management'
        },
        {
            productName: 'Metformin',
            quatity: 120,
            description: 'Medication for type 2 diabetes',
            remarks: 'Commonly used for blood sugar control'
        }
    ];


    constructor(private http: HttpClient) {
    }

    fetchAllOrders() {
        return of(this.dummyOrders);
    }

    fetchAllOrderProducts() {
        return of(this.dummyOrderProducts);
    }

}
