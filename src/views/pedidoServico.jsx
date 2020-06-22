import React from "react";
import { withRouter } from "react-router";
import Table from 'react-bootstrap/Table';
import { faEllipsisH, faPenFancy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import server from "../services/api";

class pedidoServico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prestadores: [],
            erroBack: ''
        }
        this.buscarDados = this.buscarDados.bind(this)
        this.listItem = this.listItem.bind(this);
    }

    componentDidMount() {
        this.buscarDados()
    }

    buscarDados() {
        let prestador = this.props.match.params.prestador;
        server
            .get(`prestador/${prestador}`)
            .then(res => {
                let list = this.state.prestadores
                list = list.concat(res.data)
                this.setState({ prestadores: list })
            }, err => {
                if (err.response.data.erro) {
                    this.setState({ erroBack: err.response.data.erro })
                }
            });
    }

    listItem() {
        let dados = []
        this.state.prestadores.forEach((prestador) => {
            dados.push(
                <tr key={prestador._id}>
                    <td>{prestador.nome}</td>
                    <td>{prestador.email}</td>
                    <td>{prestador.telefone}</td>
                    <td className='text-center'>
                        <button className="border-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </button>
                        <div className="dropdown-menu text-left">
                            <button className="dropdown-item"  ><FontAwesomeIcon icon={faPenFancy} className='mr-2 fa-fw' />Fazer Pedido</button>
                        </div>
                    </td>
                </tr>
            )
        })
        return dados
    }

    render() {
        let listagem = this.listItem()
        return (
            <div>
                <Table responsive id='mytable'>
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                            <th className="text-center" scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listagem}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default withRouter(pedidoServico)