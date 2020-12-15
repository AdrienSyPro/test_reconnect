import React from 'react';

export class AddForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: ''
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    /**
     * Handle the onChange of search Input
     * @param {Event} event onChange event
     */
    handleChangeName (event) {
        this.setState({
            name: event.target.value
        });
    }

    /**
     * Call the search function passed via the props
     */
    handleAdd (event) {
        event.preventDefault();

        this.props.addFunction(this.state.name);
    }

    render() {
        return (
            <form onSubmit={this.handleAdd}>
                <input
                    placeholder="Nom" type="text" required
                    value={this.state.name} onChange={this.handleChangeName}
                />
                <input type="submit" value="Ajouter" />
            </form>
        );
    }
}