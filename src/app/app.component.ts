import { Component } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { PedidoService } from './pedido/pedido.service';
import { Pedido } from './pedido/pedido';
import { Credenciamento } from './pedido/credenciamento';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public error: String;
  public info: String;
  public situacoes : String[];
  private pedido: Pedido;

  constructor(private formBuilder: FormBuilder, private pedidoService: PedidoService) { }

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
      this.error = 'Verifique os dados e tente novamente';
      return;
    }

    this.pedido = this.getPedido();

    this.logPedido();

    this.pedidoService.cadastrarPedido(this.pedido);

    this.info = 'Cadastrado com sucesso';
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
    this.error = '';
    this.info = '';
    this.pedido = null;
  }

  logPedido(){
    console.log("Codigo Pedido: " + this.pedido.codigoPedido);
    console.log("Situacao: " + this.pedido.situacao);
    console.log("Codigo credenciamento: " + this.pedido.credenciamento.codigo);
  }
}