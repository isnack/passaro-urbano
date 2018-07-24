import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { Oferta } from './shared/oferta.model';

@Injectable()
export class OfertasService {
  constructor(private http: Http) {}

  public getOfertas(): Promise<Oferta[]> {
    return this.http
      .get('http://localhost:3000/ofertas')
      .toPromise()
      .then((resposta: Response) => resposta.json());
  }
  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http
      .get(`http://localhost:3000/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((resposta: Response) => resposta.json());
  }
  public getOfertasPorId(id: number): Promise<Oferta> {
    return this.http
      .get(`http://localhost:3000/ofertas?id=${id}`)
      .toPromise()
      .then((resposta: Response) => resposta.json()[0]);
  }
  public getComoUsarPorId(id: number): Promise<String> {
    return this.http
      .get(`http://localhost:3000/como-usar?id=${id}`)
      .toPromise()
      .then((resposta: Response) => resposta.json()[0]);
  }
  public getOndeFicaPorId(id: number): Promise<String> {
    return this.http
      .get(`http://localhost:3000/onde-fica?id=${id}`)
      .toPromise()
      .then((resposta: Response) => resposta.json()[0]);
  }
  public pesquisaOferta(termo: string): Observable<Oferta[]> {
    return this.http
      .get(`http://localhost:3000/ofertas?descricao_oferta_like=${termo}`)
      .pipe(
        map((resposta: Response) => resposta.json()),
        retry(10),
      );
  }
}
