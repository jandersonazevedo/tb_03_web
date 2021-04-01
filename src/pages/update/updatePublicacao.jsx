import React, { Component } from 'react'
import './update.css'
import { Redirect, Link } from 'react-router-dom'
import api from '../../services/services'

class EditarPublicacao extends Component {
    constructor(props) {
        super(props);

        this.state = {
            publicacao: {
                title: "",
                mensagem: "",
                idAutor: "",
                idPublicacao: "",
            },
            redirect: false,
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const response = await api.get(`/publicacoes/${id}`)
        this.setState({ publicacao: response.data })
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={"/topicos/"+this.state.publicacao.idTopico} />
        } else {
            return (
                <div className="painelEdite">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Editar Publicação</legend>
                            <div className="publicacao-insert">
                                <label htmlFor="title">Título</label>
                                <br />
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Insira seu title"
                                    minLength="3"
                                    maxLength="100"
                                    required
                                    value={this.state.publicacao.title}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="publicacao-insert">
                                <label htmlFor="mensagem">Conteúdo</label>
                                <br />
                                <textarea
                                    id="mensagem"
                                    name="mensagem"
                                    placeholder="Digite o mensagem"
                                    minLength="10"
                                    maxLength="1000"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.publicacao.mensagem}
                                >{this.state.publicacao.mensagem}</textarea>
                            </div>
                            <div className="btn-CRUD">
                                <Link id="btn-voltar" to={"../../topicos/" + this.state.publicacao.idTopico}>Voltar</Link>
                                <button id="btn-cadastrar" type="submit" >Salvar</button>
                            </div>
                            
                            
                        </fieldset>
                    </form>
                </div>
            )
        }
    }

    handleInputChange = event => {
        const target = event.target
        const name = target.name
        const value = target.value

        this.setState(prevState => ({
            publicacao: { ...prevState.publicacao, [name]: value }
        }))
    }

    handleSubmit = event => {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/api/publicacoes/${id}`, {
            method: "put",
            id: id,
            body: JSON.stringify(this.state.publicacao),
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true })
                }
            })

        event.preventDefault()
    }
}

export default EditarPublicacao
