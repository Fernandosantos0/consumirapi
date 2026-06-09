import React from 'react';
import { Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';

import MyRoute from './MyRoute';

export default function Routes() {
    return (
        <Switch>
            <MyRoute exact path='/' isClosed={false} component={Alunos} />
            <MyRoute exact path='/aluno/:id/edit' isClosed component={Aluno} />
            <MyRoute exact path='/aluno' isClosed component={Aluno} />
            <MyRoute exact path='/fotos/:id' isClosed component={Fotos} />
            <MyRoute exact path='/login' isClosed={false} component={Login} />
            <MyRoute exact path='/register' isClosed={false} component={Register} />
            <MyRoute path='*' component={Page404} />
        </Switch>
    );
}
