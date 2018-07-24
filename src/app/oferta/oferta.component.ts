import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Oferta } from './../shared/oferta.model';
import { OfertasService } from './../ofertas.service';
import { CarrinhoService } from './../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService],
})
export class OfertaComponent implements OnInit {
  public Oferta: Oferta;
  constructor(
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService,
    private ofertasService: OfertasService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService
        .getOfertasPorId(parametros.id)
        .then((oferta: Oferta) => {
          console.log(oferta);
          this.Oferta = oferta;
        });
    });
  }
  public adicionarItemCarrinho(oferta: Oferta): void {
    console.log(oferta);
    this.carrinhoService.adicionarItemCarrinho(oferta);
    console.log(this.carrinhoService.getItens());
  }
}
