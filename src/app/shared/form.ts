export abstract class Form {
    public mensagem: String;
    public estiloMensagem: String;

    constructor() { }


    //especifico do bootstrap
    setInfo(msg: String) {
        this.mensagem = msg;
        this.estiloMensagem = 'alert alert-info'
    }

    setSuccess(msg: String) {
        this.mensagem = msg;
        this.estiloMensagem = 'alert alert-success'
    }

    setError(msg: String) {
        this.mensagem = msg;
        this.estiloMensagem = 'alert alert-danger'
    }

    setWarning(msg: String) {
        this.mensagem = msg;
        this.estiloMensagem = 'alert alert-warning'
    }

}
