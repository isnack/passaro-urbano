import { Component, OnInit } from '@angular/core';
import { OfertasService } from './../ofertas.service';
import { Oferta } from './../shared/oferta.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertasService],
})
export class DiversaoComponent implements OnInit {
  constructor(private ofertasService: OfertasService) {}
  public Ofertas: Oferta[];
  ngOnInit() {
    this.ofertasService
      .getOfertasPorCategoria('diversao')
      .then((ofertas: Oferta[]) => {
        this.Ofertas = ofertas;
      });
  }
}
