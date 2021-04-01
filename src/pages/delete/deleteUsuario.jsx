import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import api from '../../services/services'
import './delete.css'

class DeletarUsuario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usuario: {},
            redirect: false
        }
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        const response = await api.get(`/usuarios/${id}`)
        this.setState({ usuario: response.data })
    }

    render() {
        const { redirect } = this.state;
        const { id } = this.props.match.params

        if (redirect) {
            return <Redirect to="/usuarios" />
        } else {
            return (
                <div className="painelDeletar">
                    <fieldset>
                        <legend>Deletar Usuario</legend>
                        <div className="usuario-delete">
                            <p><b>Nome: </b>{this.state.usuario.nome}</p>
                            <p><b>Login: </b>{this.state.usuario.login}</p>
                            <p><b>ID: </b>{this.state.usuario._id}</p>
                            <b>Tem certeza que deseja excluir este usuário?</b>

                            <div className="btn-CRUD">
                                <Link id="btn-voltar" to={"../../usuarios/" + id}>Voltar</Link>
                                <button id="btn-deletar" onClick={this.handleClick}>Remover</button>
                            </div>

                        </div>
                    </fieldset>
                </div>
            )
        }
    }

    handleClick = event => {
        const { id } = this.props.match.params

        fetch(`http://localhost:3003/api/usuarios/${id}`, {
            method: "delete"
        })

            .then(data => {
                this.setState({ redirect: true })
            })
        event.preventDefault();
    }
}

export default DeletarUsuario