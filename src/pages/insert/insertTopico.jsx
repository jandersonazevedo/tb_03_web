import React, { Component } from 'react'
import './insert.css'
import { Redirect } from 'react-router-dom'

class CriarTopico extends Component {
    constructor() {
        super();

        this.state = {
            topico: {
                title: "",
                conteudo: "",
                idAutor: sessionStorage.getItem('ID_USER'),
            },
            redirect: false,
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <div className="painelCadastro">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Criar Tópico</legend>
                            <div className="topico-insert">
                                <label htmlFor="title">Título</label>
                                <br />
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Insira seu title"
                                    minLength="3"
                                    maxLength="30"
                                    required
                                    value={this.state.topico.title}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="topico-insert">
                                <label htmlFor="conteudo">Conteúdo</label>
                                <br />
                                <textarea
                                    id="conteudo"
                                    name="conteudo"
                                    placeholder="Digite o conteudo"
                                    minLength="10"
                                    maxLength="1000"
                                    required
                                    value={this.state.topico.conteudo}
                                    onChange={this.handleInputChange}
                                ></textarea>
                            </div>
                            <div className="topico-insert">
                                <input
                                    type="hidden"
                                    id="idAutor"
                                    name="idAutor"
                                    required
                                    value={this.state.topico.idAutor}
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
            topico: { ...prevState.topico, [name]: value }
        }))
    }

    handleSubmit = event => {
        fetch("http://localhost:3003/api/topicos", {

            method: "post",
            body: JSON.stringify(this.state.topico),
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

export default CriarTopico
