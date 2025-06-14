import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddMarketDialogComponent} from "./add-market-dialog/add-market-dialog.component";
import {RouteService} from "../services/route.service";


interface MarketPlaceImage {
    imageURL: string;
    placeName: string;
}

interface Market {
    marketName: string;
    address: string;
    marketPlaceImages: MarketPlaceImage[];
    id: number;
}

@Component({
    selector: 'app-market',
    templateUrl: './market.component.html',
    styleUrls: ['./market.component.css'],
})
export class MarketComponent implements OnInit {

    markets: Market[] = [];
    selectedMarket: Market | null = null;

    constructor(public dialog: MatDialog, private routeService: RouteService) {
    }

    ngOnInit(): void {
        this.loadMarkets();
    }


    loadMarkets(): void {
        this.routeService.fetchAllMarkets().subscribe(
            (response) => {
                if (response.responseCode === '00') {
                    this.markets = response.data;
                } else {
                    console.error('Error loading markets:', response.responseDescription);
                }
            },
            (error) => {
                console.error('Error loading markets:', error);
            }
        );
        this.selectedMarket = null;
    }

    // Select a market from the dropdown
    onMarketSelect(marketName: string) {
        this.selectedMarket = this.markets.find((market) => market.marketName === marketName) || null;
    }

    // Delete the selected market
    deleteSelectedMarket(): void {
        if (this.selectedMarket) {
            this.routeService.deleteMarketById(this.selectedMarket.id).subscribe((response) => {
                    if (response.responseCode === '00') {
                        this.loadMarkets();
                    } else {
                        console.error('Error deleting market:', response.responseDescription);
                    }
                },
                (error) => {
                    console.error('Error deleting market:', error);
                }
            );
        }
    }


    openAddMarketDialog(): void {
        const dialogRef = this.dialog.open(AddMarketDialogComponent, {
            width: '600px',
        });

        dialogRef.afterClosed().subscribe((formData: FormData) => {
            if (formData) {
                this.submitMarket(formData);
            }
        });
    }

    submitMarket(formData: FormData) {
        this.routeService.addMarket(formData).subscribe(
            (response) => {
                this.loadMarkets();
            },
            (error) => {
                console.error('Error adding market', error);
                // Handle error (e.g., show error message)
            }
        );
    }
}
