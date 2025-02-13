import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  getItem(key:string){
    return localStorage.getItem(key)??null;
  }

   setItem(key:string,value:any){
     console.log(key,value);
    localStorage.setItem(key,value);
  }

   removeItem(key:string){
    localStorage.removeItem(key);
  }

   clear(){
    localStorage.clear();
  }
}
