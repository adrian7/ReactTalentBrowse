/**
 * Login page
 * @author adrian7
 * @version 1.0
 */

import './assets/styles.css';
import * as React from 'react';
import { FormEvent } from 'react';
import User from '../../lib/user';
import { Alignment } from '../../lib/util';
import { TextInput, PasswordInput } from '../Input';

interface Props {
    language?: string;
    onLoginSuccess?: ( (u: User) => void );
}

/**
 * Form validation errors
 */
enum FormValidationErrors {
    emailMinRequired    = 'Please enter a valid email address... ',
    emailRegexInvalid   = 'Please enter a valid email address... ',
    passwordMinRequired = 'Password should have at least %s characters... '
}

function validateEmail(value: string): string {

    // Regexp
    let match = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    if ( value.trim().length < 4 ) {

        // Email should have at least x chars
        return FormValidationErrors.emailMinRequired;

    }

    if ( match == null ) {

        return FormValidationErrors.emailRegexInvalid;

    }

    // Validation passed
    return '';

}

function validatePassword(value: string): string {

    if ( value.trim().length < 7 ) {

        return FormValidationErrors.passwordMinRequired;

    }

    // Validation passed
    return '';

}

class Login extends React.Component<Props> {

    // Component default properties
    public static defaultProps = {
        language: 'en',
        onLoginSuccess: Login.defaultLoginSuccessAction
    };

    // Component state
    public state = {

        email           : '',
        emailErrorMsg   : '',

        password        : '',
        passwordErrorMsg: '',

        formErrorMsg: ''

    };

    /**
     * Default login success action
     * @param {User} user
     */
    public static defaultLoginSuccessAction(user: User) {
        alert( 'Successful login for user: ' + user.getUsername() ); // TODO...
    }

    /**
     * Component constructor
     * @param {Props} props
     */
    constructor(props: Props) {

        // Call parent constructor
        super(props);

        // Bindings
        this.onPasswordUpdate = this.onPasswordUpdate.bind(this);
        this.onEmailUpdate    = this.onEmailUpdate.bind(this);
        this.onSubmit         = this.onSubmit.bind(this);

        this.state.email = '';
        this.state.password = '';

    }

    /**
     * Form submit action
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    onSubmit(e: FormEvent<HTMLFormElement>) {

        // Prevent form submit via POST
        e.preventDefault();

        // Validate form again just to be sure
        let emailErr     = validateEmail(this.state.email);
        let passwordErr  = validatePassword(this.state.password);
        let formIsValid  = ( emailErr.length === 0 && passwordErr.length === 0 );

        // Get onLoginSuccess Callback
        let onLoginSuccess = this.props.onLoginSuccess === undefined ?
            Login.defaultLoginSuccessAction :
            this.props.onLoginSuccess;

        if ( formIsValid ) {

            // Try log in
            let user = User.logIn(this.state.email, this.state.password);

            if ( user ) {

                // In case the input was highlighted as error previously
                this.setState({
                    formErrorMsg: '',
                });

                // Invoke callback
                onLoginSuccess(user);

            }
            else {

                // Can't log in user form, push state
                this.setState({
                    formErrorMsg: 'Could not log you in, please try again!'
                });

            }

        }
        else {

            // Invalid form, push state
            this.setState({
                emailErrorMsg: emailErr,
                passwordErrorMsg: passwordErr,
            });

            return;

        }

    }

    /**
     * Captures and validates user email
     * @param {React.FormEvent<HTMLInputElement>} e
     */
    onEmailUpdate(e: FormEvent<HTMLInputElement>) {

        let validationErr = validateEmail( e.currentTarget.value );

        // Calculate new state
        let newState = {
            email           : e.currentTarget.value,
            emailErrorMsg   : validationErr
        };

        // Update email and validation state
        this.setState(newState);

    }

    /**
     * Captures and validates user password
     * @param {React.FormEvent<HTMLInputElement>} e
     */
    onPasswordUpdate(e: FormEvent<HTMLInputElement>) {

        let validationErr = validatePassword( e.currentTarget.value );

        // Calculate new state
        let newState = {
            password           : e.currentTarget.value,
            passwordErrorMsg   : validationErr
        };

        // Update password and validation state
        this.setState(newState);

    }

    componentWillMount() {

        // Set default state to valid
        this.setState({
            emailValid      : true,
            passwordValid   : true
        });

    }

    render() {

        let alert = ( this.state.formErrorMsg.length === 0 ) ?
            ( <p className="alert alert-info alert-border">Enter your credentials to log in</p> ) :
            ( <p className="alert alert-warning alert-border">{this.state.formErrorMsg}</p> );

        // Render component
        return (

            <div className="row align-center login-form-wrapper">
                <div className="col-lg-12">
                    <h1>Login</h1>
                    <div className="row">
                        <div className="col-lg-12 login-form-container">

                            {alert}

                            <form name="loginForm" method="post" target="_self" onSubmit={this.onSubmit}>

                                <TextInput
                                    placeholder="enter your email... "
                                    label="Email:"
                                    error={this.state.emailErrorMsg}
                                    align={Alignment.left}
                                    onChange={this.onEmailUpdate}
                                    value={this.state.email}
                                />

                                <PasswordInput
                                    placeholder="enter your password... "
                                    label="Password:"
                                    error={this.state.passwordErrorMsg}
                                    onChange={this.onPasswordUpdate}
                                    value={this.state.password}
                                />

                                <button
                                    className="button-primary clear-fix"
                                    type="submit"
                                >
                                    Log in
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>

        );

    }

}

export default Login;