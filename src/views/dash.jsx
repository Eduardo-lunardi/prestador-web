import React from "react";
import { withRouter } from "react-router";
import server from "../services/api";
import "../styles/login.scss";
import { Link } from 'react-router-dom'

class dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
            erroBack: ''
        }
        this.buscarDados = this.buscarDados.bind(this)
        this.listItem = this.listItem.bind(this);
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

    render() {
        let cards = this.listItem()
        return (
            <div className='mt-3'>
                <div className={"row"}>
                    {cards}
                </div>
                <Link className="btn" to="cadastro/categoria" > Nova categoria </Link>
            </div>
        )
    }
}

export default withRouter(dash);
