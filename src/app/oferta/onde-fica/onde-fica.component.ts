import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasService],
})
export class OndeFicaComponent implements OnInit {
  public ondeFica: string;
  public dados: boolean = false;

  constructor(
    private ofertasService: OfertasService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(parametros => {
      this.ofertasService
        .getOndeFicaPorId(parametros.id)
        .then((descricao: string) => {
          this.ondeFica = descricao;
          this.dados = true;
        });
    });
  }
}
