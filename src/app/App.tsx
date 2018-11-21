import 'mustard-ui';
import './App.css';

import * as React from 'react';
import User from '../lib/user';
import Login from '../components/Login';
import Homepage from '../components/Homepage';
import Dashboard from '../components/Dashboard';
import { RouteComponentProps } from 'react-router';
import { Switch, Route, withRouter } from 'react-router-dom';

/**
 * Path params - this.props.match.params.*
 */
type pathParamsType = {};

/**
 * Properties (other properties)
 */
type Props = RouteComponentProps<pathParamsType> & {};

class App extends React.Component<Props> {

    public props: Props;

    constructor( props: Props ) {

        super(props);

        // Bindings (super-weird, right!) see: https://reactjs.org/docs/handling-events.html
        this.onUserLoggedIn = this.onUserLoggedIn.bind(this);

    }

    public onUserLoggedIn(user: User) {

        // Navigate to home page
        this.props.history.push('/');

    }

    public render() {

        let user = User.loggedIn();

        let startPage = false === user ?

            // User is not logged in
            ( <Homepage language="en" title="Talent Browse Demo" cta="Let's find some talent"/> ) :

            // Render dashboard for user
            ( <Dashboard language="en" user={user}/> );

        return (

            <Switch>
                <Route exact={true} path="/" render={() => startPage}/>
                <Route
                    exact={true}
                    path="/login"
                    render={() => <Login onLoginSuccess={this.onUserLoggedIn}/>}
                />
                <Route
                    path="/dashboard/:id"
                    render={() => <h1>Welcome to dashboard... </h1>}
                />
            </Switch>
        );

    }

}

export default withRouter( App );
