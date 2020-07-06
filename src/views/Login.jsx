import React from "react";
import { login } from "../services/auth";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import server from "../services/api";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: "",
        senha: "",
      },
      errors: {},
      erroBack: null,
    };
    this.fazerLogin = this.fazerLogin.bind(this);
    this.verificarInputs = this.verificarInputs.bind(this);
    this.validarEmail = this.validarEmail.bind(this);
    this.validarSenha = this.validarSenha.bind(this);
    this.handleStates = this.handleStates.bind(this);
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

  validarSenha() {
    let errors = this.state.errors;
    if (this.state.form.senha.length <= 2) {
      errors.senha = true;
    } else {
      delete errors.senha;
    }
    this.setState({ errors: errors });
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

  fazerLogin(event) {
    event.preventDefault();
    if (this.verificarInputs() === false) {
      server
        .post("/login", this.state.form)
        .then(
          (res) => {
            console.log(res);
            
            login({ token: res.data.token, refreshToken: res.data.refreshToken, nome: res.data.usuario.nome, roles: res.data.usuario.roles, prest_id: res.data.usuario._id });
            this.props.history.push("/");
          },
          (err) => {
            if (err.response && err.response.data.erro) {
              console.log(err.response, err.response.data);

              this.setState({ erroBack: err.response.data });
            }
          }
        );
    }
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

  render() {
    let erro = this.state.erroBack ? (
      <div className="alert alert-danger">{this.state.erroBack}</div>
    ) : null;
    let btnDisabled = this.verificarInputs()

    return (
      <section className={"container"}>
        <div className="col-lg-7 col-md-9 col-sm-12 m-auto card">
          <form>
            <h1 className="font-weight-bold text-center titulo-login mb-4">
              Login
              </h1>
            <div className={"form-group mb-4 text-left"}>
              {erro}
              <input
                type="text"
                className={
                  "form-control custom-input" +
                  (this.state.errors.email ? " is-invalid" : " ")
                }
                placeholder="Email"
                value={this.state.form.email}
                name="email"
                onChange={(str) => this.handleStates(str, null)}
                onBlur={this.validarEmail}
              />
              <div className="invalid-feedback">Verifique o seu email.</div>
            </div>
            <div className="form-group text-left">
              <input
                type="password"
                className={
                  "form-control custom-input" +
                  (this.state.errors.senha ? " is-invalid" : " ")
                }
                placeholder="Senha"
                name="senha"
                value={this.state.form.senha}
                onChange={(str) => this.handleStates(str, null)}
                onBlur={this.validarSenha}
              />
              <div className="invalid-feedback">Campo obrigatório.</div>
            </div>
            <div>
              <Link to={"/cadastrar/usuario"}>
                Fazer cadastro
              </Link>
            </div>
            <div className={"form-group text-center mt-md-5 mt-4"}>
              <button
                disabled={btnDisabled}
                type="submit"
                className={"btn btn-custom-primary"}
                onClick={this.fazerLogin}
              >
                ENTRAR
                </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
export default withRouter(Login);
