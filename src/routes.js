import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import IndexUsuario from './pages/index/indexUsuario'
import IndexTopico from './pages/index/indexTopicos'
import IndexPublicaco from './pages/index/indexPublicacao'

import DetailsUsuario from './pages/details/detailsUsuario'
import DetailsTopico from './pages/details/detailsTopico'

import InsertUsuario from './pages/insert/insertUsuario'
import InsertTopico from './pages/insert/insertTopico'
import InsertPublicacao from './pages/insert/insertPublicacao'


import UpdateUsuario from './pages/update/updateUsuario'
import UpdateTopico from './pages/update/updateTopico'
import updatePublicacao from './pages/update/updatePublicacao'


import DeleteUsuario from './pages/delete/deleteUsuario'
import DeleteTopico from './pages/delete/deleteTopico'
import DeletePublicacao from './pages/delete/deletePublicacao'

import LoginUsuario from './pages/login/login'
import DeslogarUsuario from './pages/login/delogar'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={IndexTopico} />
            <Route path="/usuarios" component={IndexUsuario} />
            <Route path="/publicacoes" component={IndexPublicaco} />

            <Route path="/usuario/:id" component={DetailsUsuario} />
            <Route path="/topicos/:id" component={DetailsTopico} />

            <Route path="/CriarUsuario" component={InsertUsuario} />
            <Route path="/CriarTopico" component={InsertTopico} />
            <Route path="/CriarPublicacao" component={InsertPublicacao} />

            <Route path="/EditarUsuario/:id" component={UpdateUsuario} />
            <Route path="/EditarTopico/:id" component={UpdateTopico} />
            <Route path="/EditarPublicacao/:id" component={updatePublicacao} />

            <Route path="/DeletarUsuario/:id" component={DeleteUsuario} />
            <Route path="/DeletarTopico/:id" component={DeleteTopico} />
            <Route path="/DeletarPublicacao/:id" component={DeletePublicacao} />

            <Route path="/Login" component={LoginUsuario} />
            <Route path="/deslogar" component={DeslogarUsuario}/>
        </Switch>
    </BrowserRouter>
)

export default Routes