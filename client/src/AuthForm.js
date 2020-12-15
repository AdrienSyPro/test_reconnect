import React from 'react';
import { User } from './model/User';

export class AuthForm extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            formValues: {
                username: '',
                password: ''
            },
            authError: null
        };

        this.handleChangeUsernameText = this.handleChangeUsernameText.bind(this);
        this.handleChangePasswordText = this.handleChangePasswordText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Handle the onChange of username Input
     * @param {Event} event onChange event
     */
    handleChangeUsernameText(event) {
        const value = event.target.value;
        this.setState((state, props) => ({
            formValues: {
                ...state.formValues,
                username: value
            }
        }));
    }

    /**
     * Handle the onChange of password Input
     * @param {Event} event onChange event
     */
    handleChangePasswordText(event) {
        const value = event.target.value;
        this.setState((state, props) => ({
            formValues: {
                ...state.formValues,
                password: value 
            }
        }));
    }

    /**
     * Handle the form onSubmit event
     * @param {*} event 
     */
    handleSubmit(event) {
        event.preventDefault();

        let headers = new Headers({
            "Content-Type": "application/json"
        });

        fetch("http://localhost:8000/token/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(this.state.formValues)
        })
        .then(
            (response) => {
                this.setState({
                    authError: ''
                })

                if (response.status === 401) {
                    this.setState({
                        authError: 'Username ou password incorrect'
                    })

                    throw new Error('Username ou password incorrect');
                }

                return response.json();
            },
            (error) => {
                console.log(error);
            }
        )
        .then(
            (token) => {
                let user = new User();

                user.username = this.state.formValues.username;
                user.token = token;

                this.props.handleAuthentication([user]);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    render() {
        const authError = this.state.authError;
        return (
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-12">
                        <h1>Authentification :</h1>
                    </div>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div class="row">
                        <div class="col-6 col-lg-6">
                            <label>Nom d'utilisateur</label>
                        </div>

                        <div class="col-6 col-lg-6">
                            <input
                                type="text"
                                required
                                value={this.state.formValues.username} onChange={this.handleChangeUsernameText}
                            />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6 col-lg-6">
                            <label>Mot de passe</label>
                        </div>

                        <div class="col-6 col-lg-6">
                            <input
                                type="text"
                                required
                                value={this.state.formValues.password} onChange={this.handleChangePasswordText}
                            />
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12 col-lg-12">
                            <input type="submit" value="Valider" />
                        </div>
                    </div>
                </form>

                {authError &&
                    <div>
                        ERREUR : { authError }
                    </div>
                }
            </div>
        );
    }
}

export default AuthForm;