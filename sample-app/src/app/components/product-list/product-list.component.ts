import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../model/iproduct';
import { ProductService } from '../../services/product.service';
import { ProductParamsBagService } from 'src/app/services/product-params-bag.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = 'Product List';
  imageWidth: number = 60;
  imageMargin: number = 5;
 
  public get displayImage(): boolean {
    return this.productParamsBagService.displayImage;
  }
  public set displayImage(value: boolean) {
    this.productParamsBagService.displayImage = value;
  }

  errMessage: string;

 
   get listFilter(): string {
    return this.productParamsBagService.listFilter;
  }
   set listFilter(value: string) {
    this.productParamsBagService.listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFiltering(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private productService: ProductService, private productParamsBagService:ProductParamsBagService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.performFilteringOnInit(this.listFilter, this.products);
      },
      error: err => this.errMessage = err
    });
    
  }
  toggleImage(): void {
    this.displayImage = !this.displayImage;
  }

  performFiltering(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performFilteringOnInit(filterBy: string, products:IProduct[]): IProduct[] {
    if (filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
    return products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      
    } else {
      return products;
    }
  }

  onRatingClicked(notification: string): void {
    this.pageTitle = "Product List " + notification;
  }

}
