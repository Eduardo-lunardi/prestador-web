import React from "react";
import { withRouter } from "react-router";
import server from "../services/api";
import "../styles/login.scss";


class CadCategorias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                nome: ""
            },
            errors: {},
        }
        this.handleStates = this.handleStates.bind(this);
        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
        this.verificarInputs = this.verificarInputs.bind(this);
    }

    cadastrarCategoria(event) {
        event.preventDefault();
        server
            .post("categoria", this.state.form)
            .then(res => {
                if (res.statusText === "OK") {
                    this.setState({ form: { nome: "" } })
                }
            }, err => {
                // aqui armazena o erro em um msg para mostrar para o user
            });
    }

    handleStates(obj, value) {
        let tipo = obj.target ? obj.target.name : obj.props.name;
        let valor = obj.target ? obj.target.value : value;
        this.setState((oldState) => ({
            ...oldState.form,
            form: {
                [tipo]: valor,
            }
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
        if (!this.state.form.nome || this.state.form.nome.length <= 0) {
            err.nome = true;
        }
        return Object.keys(err).length > 0;
    }

    render() {
        let btnDisabled = this.verificarInputs();
        return (
            <div>
                <form onSubmit={this.cadastrarCategoria} >
                    <div className='form-group col-lg-6'>
                        <input
                            type="text"
                            className={
                                "form-control custom-input" +
                                (this.state.errors.nome ? " is-invalid" : " ")
                            }
                            placeholder="Nome da categoria"
                            value={this.state.form.nome}
                            name="nome"
                            onChange={(str) => this.handleStates(str, null)}
                            onBlur={() => this.validacaoPadrao("nome")}
                        />
                        <div className="invalid-feedback">Campo obrigatório!</div>
                    </div>
                    <div className={"form-group text-center mt-5"}>
                        <button className='btn-custom-primary' onClick={this.cadastrarCategoria} disabled={btnDisabled} >Concluir Cadastro</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(CadCategorias);
