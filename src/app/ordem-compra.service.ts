import { Injectable } from '../../node_modules/@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { Pedido } from './shared/pedido.model';
import { URL_APIONLINE } from './app.api';

@Injectable()
export class OrdemCompraService {
  constructor(private http: HttpClient) {}
  public efetivarCompra(pedido: Pedido): Observable<Pedido> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<Pedido>(
      `${URL_APIONLINE}/pedido`,
      JSON.stringify(pedido),
      httpOptions,
    );
  }
}
