import { Component, OnInit } from '@angular/core';
import { OfertasService } from './../../ofertas.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService],
})
export class ComoUsarComponent implements OnInit {
  public comoUsar: string;
  public dados: boolean = false;

  constructor(
    private ofertasService: OfertasService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe((parametros: Params) => {
      this.ofertasService
        .getComoUsarPorId(parametros.id)
        .then((descricao: string) => {
          this.comoUsar = descricao;
          this.dados = true;
        });
    });
  }
}
