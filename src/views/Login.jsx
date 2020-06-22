import React from "react";
import { login } from "../services/auth";
import { withRouter } from "react-router";
import server from "../services/api";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: "",
        senha: "",
      },
      init: true,
      errors: {},
      erroBack: null,
    };
    this.handlePassword = this.handlePassword.bind(this);
    this.handleCpf = this.handleCpf.bind(this);
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
    this.setState({ errors: errors, init: false });
  }

  // verificar todos os inputs
  verificarInputs() {
    let errors = this.state.errors;
    if (
      process.env.NODE_ENV === "development" &&
      this.state.form.cpf === "666.666.666-66"
    ) {
      delete errors.cpf;
    } else {

      delete errors.cpf;

    }

    if (this.state.form.senha.length <= 2) {
      errors.senha = true;
    } else {
      delete errors.senha;
    }

    this.setState({ errors: errors, init: false });
    return Object.keys(errors).length;
  }

  fazerLogin(event) {
    event.preventDefault();

    if (this.verificarInputs() === 0) {
      server
        .post("/login", this.state.form)
        .then(
          (res) => {
            login({ token: res.data.token, refreshToken: res.data.refreshToken, nome: res.data.usuario.nome });
            this.props.history.push("/dash");
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

  handlePassword({ target }) {
    let { value } = target;
    this.setState((old) => ({
      form: {
        ...old.form,
        senha: value,
      },
    }));
  }

  handleCpf(str) {
    this.setState((old) => ({
      form: {
        ...old.form,
        cpf: str,
      },
    }));
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
    return (
      <section className={"container container-login"}>
        <div className="col-lg-7 col-md-9 col-sm-12 m-auto">
          <div className="card card-login">
            <form className="text-center">
              {/* <img
                src="/assets/logo.svg"
                className=""
                alt="Logo"
              /> */}
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
                  defaultValue={this.state.form.email}
                  name="email"
                  onChange={(str) => this.handleStates(str, null)}
                // onBlur={this.validarEmail}
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
                  onChange={this.handlePassword}
                  onBlur={this.validarSenha}
                />
                <div className="invalid-feedback">Campo obrigatório.</div>
              </div>
              <div className={"form-group text-center mt-md-5 mt-4"}>
                <button
                  disabled={
                    Object.keys(this.state.errors).length > 0 || this.state.init
                      ? "disabled"
                      : ""
                  }
                  type="submit"
                  className={"btn btn-custom-primary"}
                  onClick={this.fazerLogin}
                >
                  ENTRAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Login);
