import React from 'react';

class Search extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            searchText: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeSearchText = this.handleChangeSearchText.bind(this);
    }

    /**
     * Handle the onChange of search Input
     * @param {Event} event onChange event
     */
    handleChangeSearchText (event) {
        this.setState({
            searchText: event.target.value
        });
    }

    /**
     * Call the search function passed via the props
     */
    handleSearch (event) {
        event.preventDefault();

        this.props.searchFunction(this.state.searchText);
    }

    render() {
        return (
            <form onSubmit={this.handleSearch}>
                <input
                    placeholder="Recherche" type="text" required
                    value={this.state.searchText} onChange={this.handleChangeSearchText}
                />
                <input type="submit" value="O\" />
            </form>
        );
    }
}

export default Search;