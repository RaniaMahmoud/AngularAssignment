import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../ViewModels/user-view-model';

@Injectable({
  providedIn: 'root'
})
export class APIUsersService {

  private httpOptions;
  constructor(private httpClient: HttpClient) {
    this.httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${environment.APIUrl}/user`);
  }
  getUserByID(pID:number):Observable<User>{
    return this.httpClient.get<User>(`${environment.APIUrl}/user/${pID}`)
  }
  addUser(productvm:User):Observable<User>{
    console.log(JSON.stringify(productvm))
    return this.httpClient.post<User>(`${environment.APIUrl}/user`,JSON.stringify(productvm),this.httpOptions);
  } 

  updateUser(ID: number, User: User):Observable<User>
  {
    console.log(JSON.stringify(User))
    return this.httpClient.patch<User>(`${environment.APIUrl}/user/${ID}`,JSON.stringify(User),this.httpOptions);
  }

  deleteUser(ID:number):Observable<User>
  {
    return this.httpClient.delete<User>(`${environment.APIUrl}/user/${ID}`,this.httpOptions);
  }
}
