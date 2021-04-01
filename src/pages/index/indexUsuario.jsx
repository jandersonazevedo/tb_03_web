import React, { Component } from 'react'
import api from '../../services/services'
import { Link } from 'react-router-dom'
import './index.css'

export default class Usuarios extends Component {
    state = {
        usuarios: [],
        usuariosinfo: {},
        page: 1
    }

    componentDidMount(){
        this.loadUsuarios()
    }

    loadUsuarios = async (page = 1) => {
        const response = await api.get(`/usuarios?page=${page}`)
        const{docs, ...usuariosinfo} = response.data
        this.setState ({ usuarios: docs, usuariosinfo, page })
    }
    prevPage = () => {
        const { page } = this.state;
        if(page === 1) return;

        const pageNumber = page - 1;
        this.loadUsuarios(pageNumber);
    }

    nextPage = () => {
        const { page, usuariosinfo } = this.state;
        if(page === usuariosinfo.pages) return;
        const pageNumber = page + 1;
        this.loadUsuarios(pageNumber);
    }

    render(){
        const { usuarios, usuariosinfo, page} = this.state
        return (
            <div className = "usuario-list">
                {this.state.usuarios.map(usuario => (
                    <article key={usuario._id}>
                        <strong>{usuario.nome}</strong>
                        <p>Login: {usuario.login}</p>
                        <p>ID: {usuario._id}</p>
                        <div className="btn-CRUD">
                            <Link id="btn-abrir"to={`/usuario/${usuario._id}`}>Ver detalhes</Link>
                        </div>
                    </article>
                ))}
                <div className="actions">
                    <button className="action-prev" disabled={page===1} onClick={this.prevPage}>Anterior</button>
                    <button className="action-next" disabled={page===usuariosinfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>

            
        )
    }
}