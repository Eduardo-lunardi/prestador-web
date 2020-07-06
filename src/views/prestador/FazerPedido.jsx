import React from "react"
import { withRouter } from "react-router";
import server from "../../services/api";
import moment from "moment";

moment.locale('pt');
moment.updateLocale('pt', {
    months: [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]
});

class FazerPedido extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                descricao: "",
                datahora: "",
                localizacao: "",
                prest_Id: "",
                user_id: "",
                status: "analise"
            },
            errors: {},
            erroBack: ''
        }
        this.concluirPedido = this.concluirPedido.bind(this);
        this.handeStates = this.handleStates.bind(this);
        this.validacaoPadrao = this.validacaoPadrao.bind(this);
        this.verificarInputs = this.verificarInputs.bind(this);
    }

    componentDidMount() {
        this.setState((oldState) => ({
            ...oldState.form,
            form: {
                descricao: "",
                datahora: moment().format("DD MM YYYY hh:mm:ss"),
                localizacao: "",
                prest_Id: this.props.match.params.id,
                user_id: localStorage.getItem("id"),
                status: "analise"
            }
        }))
    }

    concluirPedido(event) {
        console.log(this.state.form);
        event.preventDefault();
        server
            .post("pedido", this.state.form)
            .then(res => {
                console.log(res);
            }, err => {
                if (err.response.data.erro) {
                    this.setState({ erroBack: err.response.data.erro })
                }
            });
    }

    handleStates(obj, value) {
        let tipo = obj.target ? obj.target.name : obj.props.name;
        let valor = obj.target ? obj.target.value : value;
        this.setState((oldState) => ({
            form: {
                ...oldState.form,
                [tipo]: valor,
            },
        }));
    }

    validacaoPadrao(campo, length = 1) {
        let erros = this.state.errors;

        if (this.state.form[campo].length >= length) {
            delete erros[campo];
        } else {
            erros[campo] = true;
        }

        this.setState({
            errors: erros,
        });
    }

    verificarInputs() {
        let err = this.state.erros || {};
        for (let x in this.state.form) {
            if (!this.state.form[x] || this.state.form[x].length <= 0) {
                if ([x] != "horaData") {
                    err[x] = true;
                }
            }
        }
        return Object.keys(err).length > 0;
    }

    render() {
        let btnDisabled = this.verificarInputs();

        return (
            <>
                <form onSubmit={this.concluirPedido}>
                    <div className="form-row">
                        <div className="form-group col-lg-4">
                            Nome do prestador: <strong>{this.props.match.params.id}</strong>
                            Area de atuação: <strong>{this.props.match.params.id}</strong>
                        </div>
                        <div className="form-group col-lg-4">
                            <label>Descrição</label>
                            <textarea
                                type="text"
                                className={
                                    "form-control custom-input" +
                                    (this.state.errors.descricao ? " is-invalid" : " ")
                                }
                                placeholder="Descrção do serviço"
                                defaultValue={this.state.form.descricao}
                                name="descricao"
                                onChange={(str) => this.handleStates(str, null)}
                                onBlur={(str) => this.validacaoPadrao("descricao")}
                                rows={"4"}
                            >
                            </textarea>
                            <div className='invalid-feedback'>Descrição obrigatório</div>
                        </div>
                        <div className="form-group col-lg-4">
                            <label>Localização</label>
                            <input
                                type="text"
                                className={
                                    "form-control custom-input" +
                                    (this.state.errors.localizacao ? " is-invalid" : " ")
                                }
                                placeholder="Localização"
                                defaultValue={this.state.form.localizacao}
                                name="localizacao"
                                onChange={(str) => this.handleStates(str, null)}
                                onBlur={(str) => this.validacaoPadrao("localizacao")}
                            />
                            <div className='invalid-feedback'>Localização obrigatório</div>
                        </div>
                    </div>
                    <div className='form-group col-lg-4 text-right'>
                        <button
                            type='button'
                            onClick={this.concluirPedido}
                            disabled={btnDisabled}
                        >
                            Concluir pedido
                        </button>
                    </div>
                </form>
            </>
        )
    }
}


export default withRouter(FazerPedido)