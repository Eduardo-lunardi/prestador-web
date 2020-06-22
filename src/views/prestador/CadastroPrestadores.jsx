import React from "react";
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import server from "../../services/api";

class Parceiros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                nome: "",
                email: "",
                telefone: "",
                servico: "",
                senha: ""
            },
            errors: {},
            categorias: []
        }
        this.cadastrarPrestador = this.cadastrarPrestador.bind(this);
        this.handleStates = this.handleStates.bind(this);
        this.validarEmail = this.validarEmail.bind(this);
        this.validacaoPadrao = this.validacaoPadrao.bind(this);
        this.buscarDados = this.buscarDados.bind(this);
        this.listItem = this.listItem.bind(this);
    }

    cadastrarPrestador(event) {
        event.preventDefault();
        server
            .post("prestador", this.state.form, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            })
            .then(res => {
                console.log(res);
            }, err => {
                console.log(err);

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

    verificarCampos() {
        let err = this.state.erros || {};
        for (let x in this.state.form) {
            if (!this.state.form[x] || this.state.form[x].length <= 0) {
                err[x] = true;
            }
        }
        return Object.keys(err).length > 0;
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

    validarEmail() {
        let erros = this.state.errors;
        if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w+)+$/.test(this.state.form.email)) {
            erros.email = false;
        } else {
            erros.email = true;
        }
        this.setState({
            errors: erros,
        });
    }

    componentDidMount() {
        this.buscarDados()
    }

    buscarDados() {
        server
            .get("categoria")
            .then(res => {
                let list = this.state.categorias
                list = list.concat(res.data)
                this.setState({ categorias: list })
            }, err => {
                if (err.response.data.erro) {
                    this.setState({ erroBack: err.response.data.erro })
                }
            });
    }

    listItem() {
        let dados = []
        this.state.categorias.forEach((servico) => {
            dados.push(
                <option key={servico._id}>{servico.nome}</option>
            )
        })

        return dados
    }

    render() {
        let options = this.listItem();
        let btnDisabled = this.verificarCampos();
        return (
            <div className={'container'}>
                <div className='col-lg-12 col-sm-12 col-md-12'>
                    <form onSubmit={this.cadastrarPrestador}>
                        <div className="form-group col-lg-12 col-sm-12 col-md-12">
                            {/* nome */}
                            <input
                                type="text"
                                className={
                                    "form-control custom-input" +
                                    (this.state.errors.nome ? " is-invalid" : " ")
                                }
                                placeholder="Nome do prestador"
                                defaultValue={this.state.form.nome}
                                name="nome"
                                onChange={(str) => this.handleStates(str, null)}
                                onBlur={() => this.validacaoPadrao('nome')}
                            />
                            <div className="invalid-feedback">Campo obrigatório</div>
                        </div>
                        <div className="form-group col-lg-12 col-sm-12 col-md-12">
                            {/* email */}
                            <input
                                type="text"
                                className={
                                    "form-control custom-input" +
                                    (this.state.errors.email ? " is-invalid" : " ")
                                }
                                placeholder="Email"
                                defaultValue={this.state.form.email}
                                name="email"
                                onChange={(str) => this.handleStates(str, null)}
                                onBlur={this.validarEmail}
                            />
                            <div className="invalid-feedback">Campo obrigatório</div>
                        </div>
                        <div className="form-group col-lg-12 col-sm-12 col-md-12">
                            <select
                                onChange={(str) => this.handleStates(str, null)}
                                name="servico"
                                className={
                                    "form-control custom-input" +
                                    (this.state.errors.servico ? " is-invalid" : " ")
                                }
                                onBlur={() => this.validacaoPadrao('servico')}
                            >
                                <option value={-1} className='d-none'>Serviço</option>
                                {options}
                            </select>
                            <div className="invalid-feedback">Campo obrigatório</div>
                        </div>
                        <div className="form-group col-lg-12 col-sm-12 col-md-12">
                            {/* telefone */}
                            <input
                                type="text"
                                className={
                                    "form-control custom-input" +
                                    (this.state.errors.telefone ? " is-invalid" : " ")
                                }
                                placeholder="Número de telefone"
                                defaultValue={this.state.form.telefone}
                                name="telefone"
                                onChange={(str) => this.handleStates(str, null)}
                                onBlur={() => this.validacaoPadrao('telefone')}
                            />
                            <div className="invalid-feedback">Campo obrigatório</div>
                        </div>

                        <div className="form-group col-lg-12 col-sm-12 col-md-12">
                            {/* senha */}

                            <input
                                type="password"
                                className={
                                    "form-control custom-input" +
                                    (this.state.errors.senha ? " is-invalid" : " ")
                                }
                                placeholder="Senha"
                                defaultValue={this.state.form.senha}
                                name="senha"
                                onChange={(str) => this.handleStates(str, null)}
                                onBlur={() => this.validacaoPadrao('senha')}
                            />
                            <div className="invalid-feedback">Campo obrigatório</div>
                        </div>
                        <div className={"form-group text-center mt-5"}>
                            <button className='btn-custom-primary' onClick={this.cadastrarPrestador} disabled={btnDisabled} >Conluir Cadastro</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Parceiros)