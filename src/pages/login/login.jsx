import React, { Component } from 'react'
import './login.css'
import { Redirect } from 'react-router-dom'
import api from '../../services/services'

class LoginUsuario extends Component {

    constructor(props){
        super(props);

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

    async componentDidMount(){
        const {id} = this.props.match.params
        const response = await api.get(`/usuarios`)
        this.setState({usuario:response.data})
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <div className="painelLogin">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Entrar</legend>
                            <div className="usuario-login">
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
                            <div className="usuario-login">
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
                            <div className="botoes-login">
                                <button id="btn-entrar" type="submit" >Entrar</button>
                                <br/>
                                <a id="btn-criar-conta" href="/criarusuario">Criar uma nova conta</a>
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
        sessionStorage.setItem('ID_USER', '6069bddfedccb01a88e8cc92')
        this.setState({ redirect: true })
        event.preventDefault()
    }
}

export default LoginUsuario