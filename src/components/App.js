import React, { Component } from 'react';


const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {

    state = { artistQuery : 'Rahman', artist : null, tracks : []}

    componentDidMount(){
        this.searchArtist();
    }

    updateArtistQuery = (event) => {
        
        this.setState({artistQuery : event.target.value });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter'){
            this.searchArtist();
        }
    }

    searchArtist = () => {
       
        fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
        .then(response => response.json())
        .then(json => {
            
            if(json.artists.total > 0){
                const artist = json.artists.items[0];
                
                this.setState({artist});

                fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
                .then(response => response.json())
                .then(json => {
                    
                    this.setState({tracks : json.tracks});
                })
                .catch(error => alert(error.message));
            } 
        })
        .catch(error => alert(error.message));
    }
    render(){
        console.log('state', this.state);
        return(
            <div>
                <h1>Music Finder!</h1>
                <input 
                    onChange={this.updateArtistQuery} 
                    onKeyPress={this.handleKeyPress}
                    placeholder='Search for an Artist' >
                </input>
                <button onClick={this.searchArtist} >Search</button>
            </div>
        );
    }
}

export default App;