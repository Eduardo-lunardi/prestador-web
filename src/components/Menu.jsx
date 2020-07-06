import React from "react";
import { logout } from "../services/auth";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/js/dist/dropdown';
import "../styles/menu.scss"
import { Link } from 'react-router-dom'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: localStorage.getItem("nome"),
      roles: localStorage.getItem("roles")
    }
    this.fazerLogout = this.fazerLogout.bind(this)
  }

  fazerLogout() {
    logout();
    this.props.history.push('/login')
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light main-nav">
        <div className="container">
          <ul className="align-items-center navbar-nav">
            <li className="nav-item d-lg-block" href="#">
              <div className="btn-group">
                <div type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" href="#" aria-expanded="false">
                  <FontAwesomeIcon icon={faUser} className={"mr-2"} />
                  {this.state.nome}
                </div>

                {this.state.roles === "adm" ?
                  <div className="dropdown-menu text-center">
                    <Link className="dropdown-item" to="/cadastro/prestador">Prestadores</Link>
                    <Link className="dropdown-item" to="/cadastrar/user">User</Link>
                    <Link className="dropdown-item" to="/">Home</Link>
                    <div className="dropdown-divider mr-4 ml-4"></div>
                    <div className='drop'></div>
                    <a className="dropdown-item" href="/login" onClick={this.fazerLogout}>Fazer logout</a>
                  </div>
                  :
                  null
                }
                {this.state.roles === "user" ?
                  <div className="dropdown-menu text-center">
                    <Link className="dropdown-item" to="/">Home</Link>
                    <Link className="dropdown-item" to="/pedidos">Pedidos</Link>
                    <div className="dropdown-divider mr-4 ml-4"></div>
                    <div className='drop'></div>
                    <a className="dropdown-item" href="/login" onClick={this.fazerLogout}>Fazer logout</a>
                  </div>
                  :
                  null
                }
                {this.state.roles === "prestador" ?
                  <div className="dropdown-menu text-center">
                    <Link className="dropdown-item" to="/">Home</Link>
                    <div className="dropdown-divider mr-4 ml-4"></div>
                    <a className="dropdown-item" href="/login" onClick={this.fazerLogout}>Fazer logout</a>
                  </div>
                  :
                  null
                }
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Menu)