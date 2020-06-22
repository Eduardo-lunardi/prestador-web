import React from "react";
import { Switch, Route } from "react-router-dom";
import loadable from "react-loadable";
import Loading from "./components/Loading";
import Menu from './components/Menu';

const cadastrarUser = loadable({
  loader: () => import("./views/user/CadastroUser"),
  loading: Loading
});

const cadastroPrestadores = loadable({
  loader: () => import("./views/prestador/CadastroPrestadores"),
  loading: Loading
});

const dash = loadable({
  loader: () => import("./views/dash"),
  loading: Loading
});

const cadastroCategoria = loadable({
  loader: () => import("./views/CadCategorias"),
  loading: Loading
})

const pedidoServico = loadable({
  loader: () => import("./views/pedidoServico"),
  loading: Loading
})

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Menu />
        <div className={"container"}>
          <Switch>
            <Route exact path="/cadastrar/user" component={cadastrarUser}></Route>
            <Route exact path="/cadastro/prestador" component={cadastroPrestadores}></Route>
            <Route exact path="/" component={dash}></Route>
            <Route exact path="/cadastro/categoria" component={cadastroCategoria}></Route>
            <Route exact path="/pedido/servico/:prestador" component={pedidoServico}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}
