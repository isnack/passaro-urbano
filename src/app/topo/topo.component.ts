import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {
  switchMap,
  debounceTime,
  distinctUntilChanged,
  catchError,
} from 'rxjs/operators';
import { OfertasService } from './../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService],
})
export class TopoComponent implements OnInit {
  private subjectPesquisa: Subject<string> = new Subject<string>();
  public Ofertas: Observable<Oferta[]>;
  public listOfertas: Oferta[];
  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
    this.Ofertas = this.subjectPesquisa.pipe(
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap((termo: string) => {
        console.log('api', termo);
        if (termo.trim() === '') {
          return of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOferta(termo);
      }),
      catchError(erro => {
        console.log(erro);

        return of<Oferta[]>([]);
      }),
    );
  }
  public pesquisa(termoDaBusca: string): void {
    console.log('tecla', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }
  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }
}
