import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QueryDTO} from '../DTO/query.interface';


@Injectable({
  providedIn: 'root'
})
export class CardService {
  http = inject(HttpClient)



  private apiKey = '47264f69a6b8ef732a4b688529cae4b6beb658dda349998125563209ab10493f'

  getProducts(query:string){
    const queryDTO = new QueryDTO(query, 10, 0)
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.apiKey}`
    );

    return this.http.post<ApiResponse>('/search/api/query', queryDTO, { headers })
  }
}
