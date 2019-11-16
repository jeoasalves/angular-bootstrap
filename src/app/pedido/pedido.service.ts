import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Pedido } from './Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  public endpoint : any = 'http://localhost:8080/pedidos/';
  constructor(private http: HttpClient) { }

  cadastrarPedido(pedido: Pedido) {
    let jsonPedido: String = JSON.stringify(pedido);
    console.log(jsonPedido);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      })
    };

    this.http.post<Pedido>(this.endpoint, jsonPedido, httpOptions)
      .pipe(
        tap((pedido) => console.log(`Pedido foi criado w/ id=${pedido.id}`)),
        catchError(this.handleError<any>('cadastrarPedido'))
      ).subscribe();
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
