import React from "react";
import { withRouter } from "react-router";
import server from "../services/api";
import { Link } from 'react-router-dom'

class dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
            pedido: [],
            erroBack: '',
            roles: localStorage.getItem("roles")
        }
        this.buscarDados = this.buscarDados.bind(this)
        this.listItem = this.listItem.bind(this);
    }

    componentDidMount() {
        this.buscarDados()
    }

    buscarDados() {
        this.state.roles === "prestador" ?
            server
                .get(`pedido/${localStorage.getItem("id")}`)
                .then(res => {
                    let list = this.state.pedido
                    list = list.concat(res.data)
                    this.setState({ pedido: list })
                }, err => {
                    if (err.response.data.erro) {
                        this.setState({ erroBack: err.response.data.erro })
                    }
                })
            :
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

        this.state.roles === "prestador" ?
            this.state.pedido.forEach((cards) => {
                dados.push(

                    <div key={cards._id} className={"col-lg-4 text-center mb-3"}>
                        {cards.status != "recusado" ?
                            <div
                                className={"card p-5"}
                            >
                                <label><strong>Descrição:</strong> {cards.descricao}</label>
                                <label><strong>Localização:</strong> {cards.localizacao}</label>
                                <label><strong>Data Hora:</strong> {cards.datahora}</label>

                                {cards.status === "analise" ?
                                    <div>
                                        <button onClick={() => this.mudarStatus(cards._id, "aceito")}>Aceitar</button>
                                        <button onClick={() => this.mudarStatus(cards._id, "recusado")}>Recusar</button>
                                    </div>
                                    :
                                    <div>
                                        <label>Serviço aceito</label><br/>
                                        <button onClick={() => this.mudarStatus(cards._id, "finalizado")}>Finalizar</button>
                                    </div>
                                }
                            </div>
                            : null}
                    </div>
                )
            })
            :
            this.state.categorias.forEach((cards) => {
                dados.push(
                    <div key={cards._id} className={"col-lg-4 text-center mb-3"}>
                        <div
                            className={"card p-5"}
                        >
                            <Link
                                to={`/pedido/servico/${cards.nome}`}
                            >
                                {cards.nome}
                            </Link>
                        </div>
                    </div>
                )
            })

        return dados
    }

    mudarStatus(_id, valor) {

        server
            .patch(`pedido/${_id}`, { status: valor })
            .then(res => {
                console.log(res);
            }, err => {
                if (err.response.data.erro) {
                    this.setState({ erroBack: err.response.data.erro })
                }
            });
    }

    render() {
        let cards = this.listItem()
        return (
            <div className='mt-3'>
                <div className={"row"}>
                    {cards}
                </div>
                {this.state.roles === "adm" ?
                    <Link className="btn" to="cadastro/categoria" > Nova categoria </Link>
                    :
                    null
                }
            </div>
        )
    }
}

export default withRouter(dash);
