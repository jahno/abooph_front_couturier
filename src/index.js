import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.scss';

import PrivateRoute from './components/private-route';

import { ScrollContext } from 'react-router-scroll-4';

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

// Ajout de antd
import 'antd/dist/antd.css';

// Global components
import { Provider } from 'react-redux';
import store from './redux/store';

//Pages
import Dashboard from './components/pages/dashboard';
import Login from './components/pages/auth/login';
import Article from './components/pages/article';
import Order from 'components/pages/order';
import Profile from './components/pages/profile';

import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();

function Root() {
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <ScrollContext>
                    <Switch>
                        {/* public */}
                        <Route exact path={`/login`} component={Login} />

                        {/* private */}
                        <PrivateRoute exact path={`/`} component={Dashboard} />
                        
                        <PrivateRoute path={`/profil`} component={Profile} />

                        <PrivateRoute path={`/articles`} component={Article} />
                        
                        <PrivateRoute path={`/commandes`} component={Order} />

                        <Redirect to={`/`} />
                    </Switch>
                </ScrollContext>
            </Router>

            <ToastContainer/>
        </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));


