import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/main.scss";

ReactDOM.render(<Routes/>, document.getElementById('root'));

serviceWorker.unregister();
