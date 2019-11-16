import { Credenciamento } from './Credenciamento';

export class Pedido {
    public id : String;
    public codigoPedido : String;
    public situacao : String;
    public credenciamento : Credenciamento;
    
}