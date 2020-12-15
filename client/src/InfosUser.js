import React from 'react';

export class InfosUser extends React.Component {
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-12">
                        <h1>Authentifié :</h1>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 col-lg-6">
                        <label>Nom d'utilisateur</label>
                    </div>

                    <div class="col-6 col-lg-6">
                        {this.props.user.username}
                    </div>
                </div>
                token : { JSON.stringify(this.props.user.token)}
            </div>
        );
    }
}

export default InfosUser;