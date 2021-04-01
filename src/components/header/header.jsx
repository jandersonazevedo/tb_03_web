import React from "react";
import "./header.css";

sessionStorage.setItem('ID_USER', '0')//ALTERAR, COLOQUE 0 para deslogar ou um id de algum usuário

function Autentic(){
  if (sessionStorage.getItem('ID_USER')) {
    if(sessionStorage.getItem('ID_USER') != '0'){
      return (<div className="linkHeader">
        <a id="btn-sair" href="/deslogar">
          Sair
        </a>
      </div>
      )
    }else{
      return (
      <div className="linkHeader">
        <a id="btn-criar" href="/criarUsuario">
          Crir uma conta
        </a>
        <a id="btn-login" href="/login">
          Entrar
        </a>
      </div>
      ) 
    }
  }
}

const Header = () => (
  <header id="main">
    <span onClick={() => (window.location.href = "/")}>Forúm</span>
    <Autentic/>
  </header>
);

export default Header;
