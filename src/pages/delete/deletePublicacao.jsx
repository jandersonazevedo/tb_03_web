import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import api from '../../services/services'
import './delete.css'

class DeletarPublicacao extends Component {
    constructor(props) {
        super(props)

        this.state = {
            publicacao: {},
            redirect: false
        }
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        const response = await api.get(`/publicacoes/${id}`)
        this.setState({ publicacao: response.data })
    }

    render() {
        const { redirect } = this.state;
        const { id } = this.props.match.params

        if (redirect) {
            return <Redirect to={"/topicos/" + this.state.publicacao.idTopico} />
        } else {
            return (
                <div className="painelDeletar">
                    <fieldset>
                        <legend>Deletar Publicação</legend>
                        <div className="publicacao-delete">
                            <p><b>Título: </b>{this.state.publicacao.title}</p>
                            <p><b>Mensagem: </b>{this.state.publicacao.mensagem}</p>
                            <p><b>Criado em: </b>{this.state.publicacao.createdAt}</p>
                           
                            <strong><p>Tem certeza que deseja remover esta publicação?</p></strong>

                            <div className="btn-CRUD">
                                <Link id="btn-voltar" to={"../../topicos/" + this.state.publicacao.idTopico}>Voltar</Link>
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

        fetch(`http://localhost:3003/api/publicacoes/${id}`, {
            method: "delete"
        })

            .then(data => {
                this.setState({ redirect: true })
            })
        event.preventDefault();
    }
}

export default DeletarPublicacao
