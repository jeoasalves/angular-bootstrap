import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Pedido } from './pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  public endpoint : any = 'http://localhost:4200/api/pedidos/';

  constructor(private http: HttpClient) { }

  cadastrarPedido(pedido: Pedido) : Observable<any> {
    let jsonPedido: String = JSON.stringify(pedido);
    
    console.log('Body: ' + jsonPedido);

    let bearer = btoa("admin:password");
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Basic ' + bearer
      })
    }; 

    console.log('Content-Type: ' + httpOptions.headers.getAll('Content-Type'));
    console.log('Cache-Control: ' + httpOptions.headers.getAll('Cache-Control'));
    console.log('Authorization: ' + httpOptions.headers.getAll('Authorization'));

    return this.http.post<Pedido>(this.endpoint, jsonPedido, httpOptions);

    /*
    this.http.post<Pedido>(this.endpoint, jsonPedido, httpOptions)
    .pipe(
      tap((pedido) => console.log(pedido)),
      catchError(this.handleError<any>('cadastrarPedido'))
    ).subscribe();*/

  }

  getPedidos(): Observable<any> {
    return this.http.get(this.endpoint).pipe(
      map(this.extractData));
  }

  getPedido(id): Observable<any> {
    return this.http.get(this.endpoint + '/v2/' + id).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
