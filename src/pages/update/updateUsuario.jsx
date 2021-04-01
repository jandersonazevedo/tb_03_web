import React, { Component } from 'react'
import './update.css'
import { Redirect, Link } from 'react-router-dom'
import api from '../../services/services'

class EditarUsuario extends Component{
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
        const response = await api.get(`/usuarios/${id}`)
        this.setState({usuario:response.data})
    }

    render() {
        const {id} = this.props.match.params
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={"/usuarios/"+id} />
        } else {
            return (
                <div className="painelEdite">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Usuário</legend>
                        <div className="usuario-update">
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
                        <div className="usuario-update">
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
                        <div className="usuario-update">
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
                        <div className="usuario-update">
                            <label htmlFor="dataNascimento">Nasciemento</label>
                            <br />
                            <input
                                type="date"
                                id="dataNascimento"
                                name="dataNascimento"
                                required
                                value={(this.state.usuario.dataNascimento).substring(0,10)}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        
                        <div className="btn-CRUD"> 
                            <Link id="btn-voltar" to={"../../usuario/"+id}>Voltar</Link>
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
            usuario: { ...prevState.usuario, [name]: value }
        }))
    }

    handleSubmit = event => {
        const {id} = this.props.match.params;

        fetch(`http://localhost:3003/api/usuarios/${id}`, {
            method: "put",
            id: id,
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })

        .then(data => {
            if(data.ok){
                this.setState({redirect: true})
            }
        })

        event.preventDefault()
    }
}

export default EditarUsuario