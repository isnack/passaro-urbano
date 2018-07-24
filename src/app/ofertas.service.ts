import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { Oferta } from './shared/oferta.model';
import { URL_APIONLINE } from './app.api';

@Injectable()
export class OfertasService {
  constructor(private http: Http) {}

  public getOfertas(): Promise<Oferta[]> {
    return this.http
      .get(`${URL_APIONLINE}/ofertas`)
      .toPromise()
      .then((resposta: Response) => resposta.json());
  }
  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http
      .get(`${URL_APIONLINE}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((resposta: Response) => resposta.json());
  }
  public getOfertasPorId(id: number): Promise<Oferta> {
    return this.http
      .get(`${URL_APIONLINE}/ofertas?id=${id}`)
      .toPromise()
      .then((resposta: Response) => resposta.json()[0]);
  }
  public getComoUsarPorId(id: number): Promise<String> {
    return this.http
      .get(`${URL_APIONLINE}/como-usar?id=${id}`)
      .toPromise()
      .then((resposta: Response) => resposta.json()[0]);
  }
  public getOndeFicaPorId(id: number): Promise<String> {
    return this.http
      .get(`${URL_APIONLINE}/onde-fica?id=${id}`)
      .toPromise()
      .then((resposta: Response) => resposta.json()[0]);
  }
  public pesquisaOferta(termo: string): Observable<Oferta[]> {
    return this.http
      .get(`${URL_APIONLINE}/ofertas?descricao_oferta_like=${termo}`)
      .pipe(
        map((resposta: Response) => resposta.json()),
        retry(10),
      );
  }
}
