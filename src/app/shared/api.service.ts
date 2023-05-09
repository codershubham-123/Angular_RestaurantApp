import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  // Here i will define the post, get, put, delete
  // Create Restaurent Using post method
  postRestaurent(data: any){
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res:any)=>{
      return res;
    }))
  }
  // Get Restaurent data using Get Method
  getRestaurent(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }
  // Update Restaurent using PUT method
  updateRestaurent(data: any, id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id, data).pipe(map((res:any)=>{
      return res
    }))
  }
  // Delete Restaurent using Delete Methods
  deleteRestaurent(id: number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  // This is done...
}
