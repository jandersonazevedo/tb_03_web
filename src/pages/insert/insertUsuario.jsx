import React, { Component } from 'react'
import './insert.css'
import { Redirect } from 'react-router-dom'

class CriarUsuario extends Component {
    constructor() {
        super();

        this.state = {
            usuario: {
                nome: "",
                login: "",
                senha: "",
                dataNascimento: "0000-00-00",
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
                            <legend>Criar uma conta</legend>
                            <div className="usuario-insert">
                                <label htmlFor="nome">Nome</label>
                                <br />
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    placeholder="Insira seu nome"
                                    minLength="3"
                                    maxLength="30"
                                    required
                                    value={this.state.usuario.nome}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="usuario-insert">
                                <label htmlFor="login">Login</label>
                                <br />
                                <input
                                    type="text"
                                    id="login"
                                    name="login"
                                    placeholder="Insira um login"
                                    minLength="3"
                                    maxLength="20"
                                    required
                                    value={this.state.usuario.login}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="usuario-insert">
                                <label htmlFor="senha">Senha</label>
                                <br />
                                <input
                                    type="password"
                                    id="senha"
                                    name="senha"
                                    placeholder="Digite a senha"
                                    minLength="6"
                                    maxLength="20"
                                    required
                                    value={this.state.usuario.senha}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="usuario-insert">
                                <label htmlFor="dataNascimento">Nasciemento</label>
                                <br />
                                <input
                                    type="date"
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    required
                                    value={this.state.usuario.dataNascimento}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="btn-CRUD">
                                <a id="btn-voltar" onClick={() => window.history.go(-1)}>Voltar</a>
                                <button id="btn-cadastrar" type="submit" >Cadastrar</button>
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
            usuario: { ...prevState.usuario, [name]: value }
        }))
    }

    handleSubmit = event => {
        fetch("http://localhost:3003/api/usuarios", {
            method: "post",
            body: JSON.stringify(this.state.usuario),
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

export default CriarUsuario