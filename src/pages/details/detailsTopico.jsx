import React, { Component } from "react";
import api from "../../services/services";
import { Link } from "react-router-dom";

import "./details.css";

import ListarPublicacoes from "../index/indexPublicacao";
import PostarPublicacoes from "../insert/insertPublicacao";

export default class Topico extends Component {
  state = {
    topico: {
      title: "",
      conteudo: "",
      idAutor: "",
      createdAt: "",
      publicacoes: [],
    },
    usuario: {
      nome: "",
    },
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/topicos/${id}`);
    this.setState({ topico: response.data });

    const response2 = await api.get(`/usuarios/${this.state.topico.idAutor}`);
    this.setState({ usuario: response2.data });
  }

  Autentic = () => {
    const { topico } = this.state;
    if (sessionStorage.getItem("ID_USER")) {
      if (sessionStorage.getItem("ID_USER") == this.state.topico.idAutor) {
        return (
          <>
            <Link id="btn-editar" to={`/EditarTopico/${topico._id}`}>
              Editar
            </Link>
            <Link id="btn-deletar" to={`/DeletarTopico/${topico._id}`}>
              Deletar
            </Link>
          </>
        );
      } else {
        return "";
      }
    }
  };

  Autenticado = () => {
    const { topico } = this.state;
    if (sessionStorage.getItem("ID_USER")) {
      if (sessionStorage.getItem("ID_USER") != "0") {
        return <PostarPublicacoes idTopico={topico._id} />
      } else {
        return "";
      }
    }
  };

  render() {
    const { topico } = this.state;
    return (
      <>
        <div className="topico-info">
          <strong>{topico.title}</strong>
          <p>{topico.createdAt}</p>
          <span>{topico.conteudo}</span>
          <p>
            <p>
              Criado por: <small>{this.state.usuario.login}</small>
            </p>
          </p>
          <div className="btn-CRUD">
            <Link id="btn-voltar" to="/">
              Voltar
            </Link>
            <this.Autentic />
          </div>
        </div>
        <ListarPublicacoes idTopico={this.state.topico._id} />
        <this.Autenticado />
      </>
    );
  }
}
