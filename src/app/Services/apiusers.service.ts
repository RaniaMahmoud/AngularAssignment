import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardViewModel } from '../ViewModels/Card-view-model';
import { LogIn } from '../ViewModels/LogIn-view-model';
import { AuthData } from '../ViewModels/AuthData-view-model';
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
  getUserByID(pID:string):Observable<User>{
    return this.httpClient.get<User>(`${environment.APIUrl}/user/${pID}`)
  }

  getUser(UserID:string):Observable<User>{
    console.log(UserID);
    return this.httpClient.get<User>(`${environment.APINewURL}/Account/${UserID}`)
  }

  addUser(user:User):Observable<User>{
    console.log(JSON.stringify(user))
    return this.httpClient.post<User>(`${environment.APINewURL}/Account/Register`,JSON.stringify(user),this.httpOptions);
  }
  
  LogIn(user:LogIn):Observable<AuthData>{
    return this.httpClient.post<AuthData>(`${environment.APINewURL}/Account/logIn`,JSON.stringify(user),this.httpOptions)
  }

  updateUser(ID: string, User: User):Observable<User>
  {
    console.log(JSON.stringify(User))
    return this.httpClient.patch<User>(`${environment.APIUrl}/user/${ID}`,JSON.stringify(User),this.httpOptions);
  }

  update(UserEditID: string, User: User):Observable<User>
  {
    console.log(JSON.stringify(User))
    return this.httpClient.patch<User>(`${environment.APINewURL}/Account/${UserEditID}`,JSON.stringify(User),this.httpOptions);
  }

  deleteUser(ID:number):Observable<User>
  {
    return this.httpClient.delete<User>(`${environment.APIUrl}/user/${ID}`,this.httpOptions);
  }
  AddToCard(Card:CardViewModel):Observable<CardViewModel>{
    console.log(JSON.stringify(Card))
    return this.httpClient.post<CardViewModel>(`${environment.APINewURL}/Cards`,JSON.stringify(Card),this.httpOptions);
  }

  GetAllItem(UserID:string):Observable<CardViewModel>{
    console.log(UserID)
    return this.httpClient.post<CardViewModel>(`${environment.APINewURL}/Cards/${UserID}`,this.httpOptions);
  }

}
