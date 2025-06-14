import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";

@Component({
    selector: 'app-view-product',
    templateUrl: './view-product.component.html',
    styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

    product;
    selectedFile: File | null = null;
    imagePreview: string | ArrayBuffer | null = null;
    imageSent: boolean = false;
    errorMsg: string = ''

    constructor(private route: ActivatedRoute, private productService: ProductsService) {
    }

    ngOnInit(): void {
        const productId = this.route.snapshot.paramMap.get('id');
        this.fetchProductDetails(productId);
    }

    fetchProductDetails(productId) {
        this.productService.fetchProductById(productId).subscribe(response => {
                this.product = response['data'];
            },
            error => console.error(error))
    }

    onFileSelected(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.selectedFile = fileInput.files[0];

            // Create a preview of the selected image
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(this.selectedFile);
        }
    }

    onUpload() {
        if (this.selectedFile) {
            let formData = new FormData();
            formData.set("productID", this.product.id);
            formData.set("productImage", this.selectedFile);
            this.productService.uploadProductImage(formData).subscribe((response: any) => {
                if (response.responseCode == '00') {
                    this.product.productImageURL = this.imagePreview as string; // Update product image with the preview
                    this.imageSent = true;
                    setTimeout(() => {
                        this.imageSent = false;
                    }, 3000);
                } else {
                    this.errorMsg = response.responseDescription;
                }

            })
        }
    }

}
