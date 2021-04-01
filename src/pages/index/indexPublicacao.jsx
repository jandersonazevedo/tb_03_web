import React, { Component } from "react";
import api from "../../services/services";
import { Link } from "react-router-dom";
import "./index.css";

export default class Publicacoes extends Component {
  state = {
    publicacoes: [],
    publicacoesinfo: {},
    page: 1,
  };

  componentDidMount() {
    this.loadPublicacoes();
  }

  loadPublicacoes = async (page = 1) => {
    const response = await api.get(`/publicacoes?page=${page}`);
    const { docs, ...publicacoesinfo } = response.data;
    this.setState({ publicacoes: docs, publicacoesinfo, page });
  };
  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;

    const pageNumber = page - 1;
    this.loadPublicacoes(pageNumber);
  };

  nextPage = () => {
    const { page, publicacoesinfo } = this.state;
    if (page === publicacoesinfo.pages) return;
    const pageNumber = page + 1;
    this.loadPublicacoes(pageNumber);
  };

  Botoes = (props) =>{
    return(
      <div className="btn-CRUD">
              <Link id="btn-editar" to={`/EditarPublicacao/${props.idPubli}`}>
                Editar
              </Link>
              <Link
                id="btn-deletar"
                to={`/DeletarPublicacao/${props.idPubli}`}
              >
                Deletar
              </Link>
            </div>
    )
  }

  render() {
    const { publicacoes, publicacoesinfo, page } = this.state;
    const idTopico = this.props.idTopico;

    let pubFilter = this.state.publicacoes.filter(function (publicacao) 
    {
        if(publicacao.idTopico === idTopico){
            return true
        }else{
            return false
        }
    });
    return (
      <div className="publicacao-list">
        {pubFilter.map((publicacao) => (
          <article key={publicacao._id}>
            <strong>
              
              {publicacao.title}
              <p>{publicacao.createdAt}</p>
            </strong>
            <p>{publicacao.mensagem}</p>
            <small>{publicacao.idAutor}</small>
            {(publicacao.idAutor == sessionStorage.getItem('ID_USER'))?<this.Botoes idPubli={publicacao._id}/>:""}
          </article>
        ))}

        <div className="actions">
          <button
            className="action-prev"
            disabled={page === 1}
            onClick={this.prevPage}
          >
            Anterior
          </button>
          <button
            className="action-next"
            disabled={page === publicacoesinfo.pages}
            onClick={this.nextPage}
          >
            Próximo
          </button>
        </div>
      </div>
    );
  }
}
