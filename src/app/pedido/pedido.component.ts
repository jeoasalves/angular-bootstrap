import { Component } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { PedidoService } from './pedido.service';
import { Pedido } from './pedido';
import { Credenciamento } from './credenciamento';
import { Observable, of, pipe } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Form } from '../shared/form';

@Component({
  selector: 'pedido-root',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent extends Form {
   
  public situacoes : String[];
  private pedido: Pedido;

  constructor(private formBuilder: FormBuilder, private pedidoService: PedidoService) { 
    super();
  }

  contatoForm = this.formBuilder.group({
    codigoPedido: ["", [Validators.required, Validators.minLength(3)]],
    situacao: ["", Validators.required],
    codigoCredenciamento: ["", [Validators.required, Validators.minLength(3)]]
  });

  ngOnInit() {
    this.clear();
    this.situacoes = ['', 'SEND_TO_SELLER', 'WAITING_BILLING', 'REFUND', 'ERROR_VALIDATION_SELLER'];
  }

  onSubmit() {
    this.clear();
    
    if (!this.contatoForm.valid) {
      this.setError('Verifique os dados e tente novamente');
      return;
    }

    this.pedido = this.getPedido();

    //this.logPedido();

    this.pedidoService.cadastrarPedido(this.pedido).pipe(
      tap((pedido) =>  this.setInfo('Pedido _id: [' + pedido.id + '] cadastrado com sucesso.')),
      catchError(this.tratarErro<any>('cadastrarPedido'))
    ).subscribe();


  }
  private tratarErro<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      
      if(operation === 'cadastrarPedido'){
        this.setError('Não foi possível cadastrar o pedido, tente novamente.');
      } else {
        this.setError('Tente novamente.');
      }

      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getPedido() {
    let pedido = new Pedido();
    pedido.codigoPedido = this.contatoForm.get("codigoPedido").value;
    pedido.situacao = this.contatoForm.get("situacao").value;
    pedido.credenciamento = new Credenciamento();
    pedido.credenciamento.codigo = this.contatoForm.get("codigoCredenciamento").value;

    return pedido;
  }

  clear() {
    this.mensagem = '';
    this.estiloMensagem = '';
    this.pedido = null;
  }

  reset() {
    this.clear();
    this.contatoForm.reset();
  }

  logPedido(){
    console.log("Codigo Pedido: " + this.pedido.codigoPedido);
    console.log("Situacao: " + this.pedido.situacao);
    console.log("Codigo credenciamento: " + this.pedido.credenciamento.codigo);
  }


}