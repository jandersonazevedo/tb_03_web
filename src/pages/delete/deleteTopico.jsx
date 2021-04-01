import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import api from '../../services/services'
import './delete.css'

class DeletarTopico extends Component {
    constructor(props) {
        super(props)

        this.state = {
            topico: {},
            redirect: false
        }
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        const response = await api.get(`/topicos/${id}`)
        this.setState({ topico: response.data })
    }

    render() {
        const { redirect } = this.state;
        const { id } = this.props.match.params

        if (redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <div className="painelDeletar">
                    <fieldset>
                        <legend>Deletar Topico</legend>
                        <div className="topico-delete">
                            <p><b>Título: </b>{this.state.topico.title}</p>
                            <p><b>Conteúdo: </b>{this.state.topico.conteudo}</p>
                            <p><b>Criado em: </b>{this.state.topico.createdAt}</p>
                            <p><b>Tem certeza que deseja remover este tópico?</b></p>

                            
                            <div className="btn-CRUD">
                                <Link id="btn-voltar" to={"../../topicos/" + id}>Voltar</Link>
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

        fetch(`http://localhost:3003/api/topicos/${id}`, {
            method: "delete"
        })

            .then(data => {
                this.setState({ redirect: true })
            })
        event.preventDefault();
    }
}

export default DeletarTopico
