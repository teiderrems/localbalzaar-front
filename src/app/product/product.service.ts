import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaginationResponse, Product, Query} from '../../interfaces/PaginationResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(@Inject('API_BASE_URL') private baseUrl:string,private  readonly httpClient:HttpClient) {}

  findAll(querie:Query={limit:20,offset:0,search:undefined}){
    return this.httpClient.get<PaginationResponse<Product>>(`${this.baseUrl}/v1/products?limit=${querie.limit}&offset=${querie.offset}&search=${querie.search!==undefined?querie.search:''}`);
  }

  findOne(id:number){
    return this.httpClient.get<Product>(`${this.baseUrl}/v1/products/${id}`);
  }
}
