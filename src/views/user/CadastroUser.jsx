import React from "react";
import { withRouter } from "react-router";
import server from "../../services/api"

class cadastrarSocio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                nome: "",
                senha: "",
                email: "",
                roles: "user",
            },
            errors: {},
        };
        this.cadastroUser = this.cadastroUser.bind(this);
        this.handleStates = this.handleStates.bind(this);
        this.validacaoPadrao = this.validacaoPadrao.bind(this);
        this.validarEmail = this.validarEmail.bind(this);
        this.verificarInputs = this.verificarInputs.bind(this);
    }

    cadastroUser(event) {
        event.preventDefault();
        server
            .post("usuario", this.state.form, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    form: {
                        nome: "",
                        senha: "",
                        email: "",
                    }
                })

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

    verificarInputs() {
        let err = this.state.erros || {};
        for (let x in this.state.form) {
            if (!this.state.form[x] || this.state.form[x].length <= 0) {
                err[x] = true;
            }
        }
        return Object.keys(err).length > 0;
    }

    render() {
        let btnDisabled = this.verificarInputs();
        return (
            <div className="container">
                <div className="col-lg-12">
                    {/* <div className='align-items-center mt-3 row'>
                        <BtnVoltar /> <h1>Cadastrar Usuário</h1>
                    </div> */}
                    <form onSubmit={this.cadastroUser}>
                        <div className="form-row">
                            <div className="form-group col-lg-8">
                                {/* nome */}
                                <input
                                    type="text"
                                    className={
                                        "form-control custom-input" +
                                        (this.state.errors.nome ? " is-invalid" : " ")
                                    }
                                    placeholder="Nome do user"
                                    defaultValue={this.state.form.nome}
                                    name="nome"
                                    onChange={(str) => this.handleStates(str, null)}
                                    onBlur={this.validarNome}
                                />
                                <div className="invalid-feedback">Nome e Sobrenome</div>
                            </div>
                            <div className="form-group col-lg-4">
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
                                <div className="invalid-feedback">Campo obrigatório!</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-lg-5">
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
                                <div className="invalid-feedback">
                                    Verifique seu email.
                                </div>
                            </div>
                            <div className={"form-group text-center mt-5"}>
                                <button className='btn-custom-primary' onClick={this.cadastroUser} disabled={btnDisabled} >Concluir Cadastro</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(cadastrarSocio);
