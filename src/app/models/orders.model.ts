export interface Order{
  orderId: string;
  customerName: string;
  orderOn: string;
  distributorName: string;
  productsQuantity: number;
  orderStatus: string;
}

export interface OrderProducts{
  productName: string;
  quatity: number;
  description: string;
  remarks: string;
}
