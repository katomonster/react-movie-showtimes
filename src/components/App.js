import React, { Component } from 'react';
import MovieTheaters from './MovieTheaters';
import MovieList from './MovieList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedData: [],
            fullSelectedData:[],
            selectedTheater: "",
            movieShowtimes: [],
            movieMetaData: []
        }
    }

    componentWillMount() {
        const getMeta = fetch('json/movieMetaData.json')
        .then((res) => res.json());

        const getShowtimes = fetch('json/movieShowtimes.json')
        .then((res) => res.json());

        Promise.all([getMeta, getShowtimes])
        .then((val) => {
            this.setState({
                movieMetaData: val[0],
                movieShowtimes: val[1]
            });
            this.getMovieData();
        })
        .catch((error) => {
            console.log("error! ", error);
        });
    }

    getMovieData(meta, showtimes) {
        let movieData = [];

        this.state.movieShowtimes.forEach((theater) => {
            const showtimes = theater.showtimes;
            const movieIds = Array.from(Object.keys(showtimes));
            let movieArr = [];
            movieIds.forEach((id, i) => {
                this.state.movieMetaData.forEach((data) => {
                    if (id === data.id) {
                        movieArr.push({title: data.title, rating: data.rating, poster: data.poster, showtimes: showtimes[id]});
                    }
                });
            });
            movieData.push({ name: theater.name, movieInfo: movieArr.sort((a, b) => a.title.localeCompare(b.title)) });  
        });

        this.setState({
            data: movieData,
            selectedData: movieData[0].movieInfo,
            fullSelectedData: movieData[0].movieInfo,
            selectedTheater: this.stringSlugify(movieData[0].name)
        });
    }

    stringSlugify(str) {
        return str.toLowerCase().replace(/\s/g, "-");
    }

    render() {
        return (
            <div className="App">
                <div className="search__wrapper">
                    <input type="text" id="search--input" placeholder="Search Movies..." onChange={(e) => this.searchMovie(e)}/>
                </div>
                <nav className="nav--theaters">
                    <MovieTheaters showtimes={this.state.movieShowtimes} selectedTheater={this.state.selectedTheater} onChange={(name) => this.setCurrentData(name)} slug={this.stringSlugify}></MovieTheaters>
                </nav>
                <ul className="results__wrapper">
                    <MovieList movieData={this.state.selectedData}></MovieList>
                </ul>
            </div>
        );
    }

    searchMovie(e) {
        const val = e.target.value.toLowerCase();
        let matches = [];

        for (const data of this.state.selectedData) {
            if (val && val === data.title.toLowerCase().slice(0, val.length)) {
                matches.push(data);
            }
        }

        if (matches.length) {
            this.setState({selectedData: matches});
        } else {
            this.setState({selectedData: this.state.fullSelectedData});
        }
    }

    setCurrentData(name) {
        let movieInfo;
        let movieTheater;

        this.state.data.forEach((data)=> {
            if (data.name === name) {
                movieInfo = data.movieInfo;
                movieTheater = this.stringSlugify(data.name);
            }
        });

        this.setState({
            selectedData: movieInfo,
            fullSelectedData: movieInfo,
            selectedTheater: movieTheater
        });
    }
}

export default App;