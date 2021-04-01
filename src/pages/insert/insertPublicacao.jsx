import React, { Component } from 'react'
import './insert.css'
import { Redirect } from 'react-router-dom'

class CriarPublicacao extends Component {
    constructor() {
        super();

        this.state = {
            publicacao: {
                title: "",
                mensagem: "",
                idAutor: "",
                idTopico: "",
            },
            redirect: false,
        }
    }

    render() {
        const { redirect } = this.state;
        const idTopico = this.props.idTopico
        this.state.publicacao.idTopico = idTopico
        this.state.publicacao.idAutor = sessionStorage.getItem('ID_USER')
        if (redirect) {
            return <Redirect to={"/topicos/"+idTopico} />
        } else {
            return (
                <div className="painelCadastro">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Criar Publicação</legend>
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
                                    placeholder="Digite a mensagem"
                                    minLength="10"
                                    maxLength="1000"
                                    required
                                    value={this.state.publicacao.mensagem}
                                    onChange={this.handleInputChange}
                                ></textarea>
                            </div>
                            <div className="publicacao-insert">
                                <br />
                                <input
                                    type="hidden"
                                    id="idAutor"
                                    name="idAutor"
                                    required
                                    value={this.state.publicacao.idAutor}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <div className="publicacao-insert">
                                <input
                                    type="hidden"
                                    id="idTopico"
                                    name="idTopico"
                                    required
                                    value={this.state.publicacao.idTopico}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="btn-CRUD">
                                <a id="btn-voltar" href="/">Voltar</a>
                                <button id="btn-cadastrar" type="submit" >Postar</button>
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
        fetch("http://localhost:3003/api/publicacoes", {
            method: "post",
            body: JSON.stringify(this.state.publicacao),
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true })
                } else {
                    alert("Este login já está sendo usado por outro usuário.")
                }
            })

        event.preventDefault()
    }
}

export default CriarPublicacao
