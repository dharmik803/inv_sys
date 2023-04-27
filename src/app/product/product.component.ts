import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  newProduct: any = {};
  selectedProduct: any = {};

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addProduct(): void {

      this.productService.addProduct(this.newProduct).subscribe(product => {
        this.products.push(product);
        this.newProduct = {};
      });
    }
  
  editProduct(product: any): void {

    this.selectedProduct = { ...product };
    $('#update').removeClass('d-none')
    setTimeout(() => {
      $('#update').addClass('d-none')
    }, 60000)
  }
  updateProduct(): void {

    if (this.selectedProduct.title == null || this.selectedProduct.title == "") {
      alert("Enter Product Name!");
    }
    else if (this.selectedProduct.category == null || this.selectedProduct.category == "") {
      alert("Enter Product Category!");
    }
    else {
      this.productService.updateProduct(this.selectedProduct).subscribe(() => {
        const index = this.products.findIndex(p => p.id === this.selectedProduct.id);
        this.products[index] = { ...this.selectedProduct };
        this.selectedProduct = {};
        $('#update').addClass('d-none')
      });
    }
  }
  deleteProduct(product: any): void {
    if (confirm(`Are you sure you want to delete ${product.title}?`)) {
      this.productService.deleteProduct(product).subscribe(() => {
        const index = this.products.findIndex(p => p.id === product.id);
        this.products.splice(index, 1);
      });
    }
  }
}
