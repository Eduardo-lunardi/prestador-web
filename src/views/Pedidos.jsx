import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { faEllipsisH, faPenFancy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import server from "../services/api";

class pedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedido: [],
            erroBack: '',
            avaliacao: null
        }
        this.buscarDados = this.buscarDados.bind(this);
        this.listItem = this.listItem.bind(this);
        this.limparPedido = this.limparPedido.bind(this);
        this.avaliar = this.avaliar.bind(this);
    }

    componentDidMount() {
        this.buscarDados()
    }

    buscarDados() {
        server
            .get(`pedido/${localStorage.getItem("id")}`)
            .then(res => {
                console.log(res);

                let list = this.state.pedido
                list = list.concat(res.data)
                this.setState({ pedido: list })
            }, err => {
                if (err.response.data.erro) {
                    this.setState({ erroBack: err.response.data.erro })
                }
            })
    }

    listItem() {
        console.log(this.state.pedido);
        let dados = []
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
                                <>
                                    <label>Em analise</label>
                                </>
                                :
                                null
                            }
                            {cards.status === "aceito" ?
                                <>
                                    <label>Serviço aceito</label>
                                </>
                                :
                                null
                            }
                            {cards.status === "finalizado" ?
                                <>
                                    <label>Serviço Finalzido</label>
                                    <div className='justify-content-center row'>
                                        <input onChange={(val) => (this.setState({ avaliacao: val.target.value }))} className='w-25' type="number" max={5} min={0} placeholder={"Avalição"} />
                                        <button onClick={() => this.avaliar(cards._id)} >OK</button>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                        :
                        <>
                            <div
                                className={"card p-5"}
                            >
                                <label><strong>Descrição:</strong> {cards.descricao}</label>
                                <label><strong>Localização:</strong> {cards.localizacao}</label>
                                <label><strong>Data Hora:</strong> {cards.datahora}</label>
                                <label>Serviço Recusado</label>
                                <button onClick={() => this.limparPedido(cards._id)}  >REMOVER</button>
                            </div>
                        </>
                    }
                </div>
            )
        })
        return dados
    }

    avaliar(_id) {
        let pontos = this.state.avaliacao
        server
            .patch(`pedido/avaliar/${_id}`, { avaliacao: pontos })
            .then(res => {
                console.log(res);

            }, err => {
                console.log(err);
            })
    }

    limparPedido(id) {
        console.log("sdljhsdlj", id);
        server
            .delete(`pedido/${id}`)
            .then(res => {
                console.log(res);

            }, err => {
                console.log(err);
            })
    }

    render() {
        let listagem = this.listItem()
        return (
            <div>
                {listagem}
            </div>
        );
    }
}

export default withRouter(pedidos)