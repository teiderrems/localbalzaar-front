import {AfterViewInit, Component, OnInit, signal} from '@angular/core';
import {ProductService} from './product.service';
import {catchError, map, of} from 'rxjs';
import {PaginationResponse, Product} from '../../interfaces/PaginationResponse';
import {FormControl, FormsModule} from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-product',
  imports: [FormsModule, NzCardModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{


  limit=signal<number>(20);
  total=signal<number>(0);
  offset=signal<number>(0);
  search=new FormControl('');

  data=signal<PaginationResponse<Product>>({
    pageSize:this.limit(),
    total:this.total(),
    data:[]
  });
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
