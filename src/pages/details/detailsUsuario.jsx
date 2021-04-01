import React, { Component } from 'react'
import api from '../../services/services'
import { Link } from 'react-router-dom'

import './details.css'

export default class Usuario extends Component {
    state = {
        usuario: {
            nome: "",
            login: "",
            dataNascimento: "",
            createdAt: ""
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/usuarios/${id}`)
        this.setState({ usuario: response.data })
    }

    render() {
        const { usuario } = this.state;

        return (
            <div className="usuario-info">
                <p><b>Nome: {usuario.nome}</b></p>
                <p><b>Login: </b>{usuario.login}</p>
                <p><b>ID: </b>{usuario._id}</p>
                <p><b>Data de nasciemento: </b>{usuario.dataNascimento}</p>
                <p><b>Data de cadastro: </b>{usuario.createdAt}</p>
                <div className="btn-CRUD">
                    <Link id="btn-voltar" to="/usuarios">Voltar</Link>
                    <Link id="btn-editar" to={`/EditarUsuario/${usuario._id}`}>Editar</Link>
                    <Link id="btn-deletar" to={`/DeletarUsuario/${usuario._id}`}>Deletar</Link>
                </div>
            </div>
        )
    }
}