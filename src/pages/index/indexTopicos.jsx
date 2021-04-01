import React, { Component } from 'react'
import api from '../../services/services'
import { Link } from 'react-router-dom'
import './index.css'

import CriarTopico from '../insert/insertTopico'

function Autentic(){
    if (sessionStorage.getItem('ID_USER')) {
      if(sessionStorage.getItem('ID_USER') != '0'){
        return <CriarTopico/>
      }
      else{
        return ('')
      }
  }
}

export default class Topicos extends Component {
    state = {
        topicos: [],
        topicosinfo: {},
        page: 1
    }

    componentDidMount(){
        this.loadTopicos()
    }

    loadTopicos = async (page = 1) => {
        const response = await api.get(`/topicos?page=${page}`)
        const{docs, ...topicosinfo} = response.data
        this.setState ({ topicos: docs, topicosinfo, page })
    }
    prevPage = () => {
        const { page } = this.state;
        if(page === 1) return;

        const pageNumber = page - 1;
        this.loadTopicos(pageNumber);
    }

    nextPage = () => {
        const { page, topicosinfo } = this.state;
        if(page === topicosinfo.pages) return;
        const pageNumber = page + 1;
        this.loadTopicos(pageNumber);
    }

    render(){
        const { topicos, topicosinfo, page} = this.state
        return (
            <div className = "topico-list">
                {this.state.topicos.reverse().map(topico => (
                    <article key={topico._id}>
                        <strong>
                            {topico.title}
                            <p>{topico.createdAt}</p>
                        </strong>
                        <p>{topico.conteudo}</p>
                        <p><small>{topico.idAutor}</small></p>
                        <p><Link to={`/topicos/${topico._id}`}>Abrir discursão</Link></p>
                    </article>
                ))}
                <div className="actions">
                    <button className="action-prev" disabled={page===1} onClick={this.prevPage}>Anterior</button>
                    <button className="action-next" disabled={page===topicosinfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
                <Autentic/>
            </div>
            
            
        )
    }
}
