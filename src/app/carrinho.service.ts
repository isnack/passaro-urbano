import { of } from 'rxjs';
import { ItemCarrinho } from './shared/itemCarrinho.model';
import { Oferta } from './shared/oferta.model';

export class CarrinhoService {
  private itens: ItemCarrinho[] = [];

  public getItens(): ItemCarrinho[] {
    return this.itens;
  }

  public adicionarItemCarrinho(oferta: Oferta): void {
    let itemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1,
    );

    let itemEncontrado = this.itens.find(
      (item: ItemCarrinho) => item.id == itemCarrinho.id,
    );

    if (itemEncontrado) {
      itemEncontrado.quantidade++;
    } else {
      this.itens.push(itemCarrinho);
    }
  }

  public alterarQuantidadeItem(
    itemCarrinho: ItemCarrinho,
    param: string,
  ): void {
    let itemEncontrado = this.itens.find(
      (item: ItemCarrinho) => item.id == itemCarrinho.id,
    );

    if (param == '+') {
      itemEncontrado.quantidade++;
    } else if (param == '-') {
      if (itemEncontrado.quantidade < 1) {
        this.itens.splice(this.itens.indexOf(itemEncontrado), 1);
      }
      itemEncontrado.quantidade--;
    }
  }

  public totalValor(): number {
    let total: number = 0;
    this.itens.map((item: ItemCarrinho) => {
      total = total + item.quantidade * item.valor;
    });
    return total;
  }

  public limparItens(): void {
    this.itens = [];
  }
  public verificarItemMaiorZero(itemCarrinho: ItemCarrinho[]): boolean {
    let retorno: boolean = true;
    itemCarrinho.map((item: ItemCarrinho) => {
      if (item.quantidade === 0) retorno = false;
    });
    return retorno;
  }
}
