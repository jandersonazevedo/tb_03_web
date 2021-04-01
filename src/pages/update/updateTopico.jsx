import React, { Component } from 'react'
import './update.css'
import { Redirect, Link } from 'react-router-dom'
import api from '../../services/services'

class EditarTopico extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topico: {
                title: "",
                conteudo: "",
            },
            redirect: false,
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const response = await api.get(`/topicos/${id}`)
        this.setState({ topico: response.data })
    }

    render() {
        const { id } = this.props.match.params
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={"/topicos/" + id} />
        } else {
            return (
                <div className="painelEdite">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Editar Tópico</legend>
                            <div className="topico-update">
                                <label htmlFor="title">Título</label>
                                <br />
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Insira seu nome"
                                    minLength="3"
                                    maxLength="100"
                                    required
                                    value={this.state.topico.title}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="topico-update">
                                <label htmlFor="conteudo">Conteúdo</label>
                                <br />
                                <textarea
                                    id="conteudo"
                                    name="conteudo"
                                    placeholder="Insira o conteudo"
                                    minLength="10"
                                    maxLength="1000"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.topico.conteudo}
                                ></textarea>
                            </div>
                            <div className="btn-CRUD">
                                <Link id="btn-voltar" to={"../../topicos/" + id}>Voltar</Link>
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
            topico: { ...prevState.topico, [name]: value }
        }))
    }

    handleSubmit = event => {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/api/topicos/${id}`, {
            method: "put",
            id: id,
            body: JSON.stringify(this.state.topico),
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

export default EditarTopico
