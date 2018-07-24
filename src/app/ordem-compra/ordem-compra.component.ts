import { Component, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { CarrinhoService } from './../carrinho.service';
import { Pedido } from '../shared/pedido.model';
import { ItemCarrinho } from './../shared/itemCarrinho.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService],
})
export class OrdemCompraComponent implements OnInit {
  public formulario: FormGroup;
  public idPedidoCompra: number;
  public ItemCarrinho: ItemCarrinho[];

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.ItemCarrinho = this.carrinhoService.getItens();
    this.formulario = this.formBuilder.group({
      endereco: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(120),
        ],
      ],
      numero: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      complemento: [null, []],
      formaPagamento: [null, [Validators.required]],
    });
  }

  public confirmarCompra(): void {
    let quantidadeItens: number = this.ItemCarrinho.length;
    console.log(this.carrinhoService.verificarItemMaiorZero(this.ItemCarrinho));
    if (
      quantidadeItens > 0 &&
      this.carrinhoService.verificarItemMaiorZero(this.ItemCarrinho)
    ) {
      let pedido = new Pedido(
        undefined,
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.ItemCarrinho,
      );

      //console.log(pedido);
      this.ordemCompraService
        .efetivarCompra(pedido)
        .subscribe((resposta: Pedido) => {
          this.idPedidoCompra = resposta.id;
          this.carrinhoService.limparItens();
        });
    }
  }
  public alterarQuantidadeItem(item: ItemCarrinho, param: string): void {
    this.carrinhoService.alterarQuantidadeItem(item, param);
  }
}
