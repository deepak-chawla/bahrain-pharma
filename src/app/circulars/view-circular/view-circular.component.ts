import {Component, OnInit} from '@angular/core';
import {CircularService} from "../../services/circular.service";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-view-raw-material',
    templateUrl: './view-circular.component.html',
    styleUrls: ['./view-circular.component.css'],
})
export class ViewCircularComponent implements OnInit {
    circulars = [];
    newCircular: any = {};
    selectedFile: File | null = null;
    companies: string[] = ['Company A', 'Company B', 'Company C']; // Example companies list

    constructor(private circularService: CircularService) {
    }

    ngOnInit(): void {
        this.loadCirculars();
    }

    uploadCircular(form: NgForm) {
        if (!this.newCircular.title || !this.newCircular.company || !this.selectedFile) {
            console.error('Please fill in all fields and select a file.');
            return;
        }

        this.circularService.uploadCircular(this.newCircular.title, this.newCircular.company, this.selectedFile)
            .subscribe({
                next: (response) => {
                    this.loadCirculars(); // Refresh the list of circulars
                    this.resetForm(form);            },
                error: (error) => {
                    console.error('Error uploading circular:', error);
                }
            });
    }

    // Method to handle file selection
    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0]; // Store the selected file
        }
    }


    loadCirculars() {
        this.circularService.fetchCirculars().subscribe({
            next: (response) => {
                this.circulars = response.data; // Assuming the response structure has a 'data' field
            },
            error: (error) => {
                console.error('Error fetching circulars:', error);
            }
        });
    }

    editCircular(circular): void {
        const newTitle = prompt('Edit Circular Title', circular.title);
        if (newTitle) {
            circular.title = newTitle;
        }
    }

    deleteCircular(id: number) {
        this.circularService.deleteCircular(id).subscribe({
            next: (response) => {
                this.loadCirculars(); // Refresh the list of circulars after deletion
            },
            error: (error) => {
                console.error('Error deleting circular:', error);
            }
        });
    }

    // Method to reset form fields
    resetForm(form: NgForm) {
        form.resetForm(); //
        this.newCircular = { title: '', company: '' }; // Reset the newCircular object
        this.selectedFile = null; // Clear the selected file
    }

}
