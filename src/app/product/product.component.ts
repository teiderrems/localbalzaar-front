import {AfterViewInit, Component, OnInit, signal, ViewChild} from '@angular/core';
import {ProductService} from './product.service';
import {catchError, map, of} from 'rxjs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {PaginationResponse, Product} from '../../interfaces/PaginationResponse';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [MatTableModule, MatPaginatorModule, CurrencyPipe, DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit,AfterViewInit{


  displayedColumns: string[] = ['id', 'name', 'price', 'isAvailable','quantity','shop','createdAt','updatedAt'];
  dataSource = new MatTableDataSource<Product>([]);


  // @ViewChild(MatPaginator) paginator: MatPaginator;
  //
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data)
  }

  limit=signal<number>(20);
  total=signal<number>(0);
  offset=signal<number>(0);
  search=signal<string|undefined>(undefined);

  data=signal<PaginationResponse<Product>>({
    pageSize:this.limit(),
    total:this.total(),
    data:[]
  })


  constructor(private readonly productService:ProductService) {}

  ngOnInit() {

    this.productService.findAll()
      .pipe(
        map(value => value),
        catchError((err)=>of(err))
      ).subscribe(
      (result)=>{
        if (result?.data){
          this.limit.set(result.pageSize);
          this.total.set(result.total);
          this.data.set(result);
        }
        else if (result.response){
          console.log(result.response);
        }
      }
    )
  }
}
