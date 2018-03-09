import React, { Component } from 'react';
import './App.css';
const MOVIE_META_DATA = require('./movieMetaData.json');
const MOVIE_SHOWTIMES = require('./movieShowtimes.json');


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedData: [],
            fullSelectedData:[],
            selectedTheater: ''
        }

        this.movieMetaData = MOVIE_META_DATA;

        this.movieShowtimes = MOVIE_SHOWTIMES;
    }

    componentWillMount() {
       
        this.getMovieData();
    }

    componentDidMount() {
        document.querySelector(".btn--theater").click();
    }

    getMovieData(id) {
        // get current theater's data.
        let movieData = [];
        this.movieShowtimes.forEach((theater) => {
            const showtimes = theater.showtimes;
            const movieIds = Array.from(Object.keys(showtimes));
            let movieArr = [];
            movieIds.forEach((id, i) => {
                for (const data of this.movieMetaData) {
                    if (id === data.id) {
                        //console.log(id);
                        movieArr.push({title: data.title, rating: data.rating, poster: data.poster, showtimes: showtimes[id]});
                    }
                }
            });
            movieData.push({ name: theater.name, movieInfo: movieArr.sort((a, b) => a.title.localeCompare(b.title)) });
            
        });
        this.setState({data: movieData});
    }

    render() {
        return (
            <div className="App">
                <div className="search--wrapper">
                    <input type="text" id="search--input" placeholder="Search Movies..." onChange={(e) => this.searchMovie(e)}/>
                </div>
                <nav className="nav--theaters">
                    <MovieTheaters showtimes={this.movieShowtimes} selectedTheater={this.state.selectedTheater} onChange={(name) => this.setCurrentData(name)}></MovieTheaters>
                </nav>
                <ul className="results--wrapper">
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
                movieTheater = data.name.toLowerCase().replace(" ", "-");
            }
        });
        this.setState({
            selectedData: movieInfo,
            fullSelectedData: movieInfo,
            selectedTheater: movieTheater
        });
    }
}

class MovieTheaters extends Component {
    render() {
        return (
            this.props.showtimes.map((showtime, i) => {
                return (
                    <a key={i} className={this.props.selectedTheater === showtime.name.toLowerCase().replace(" ", "-") ? "active" : ""}>
                        <input type="radio" name="theaters" id={`${showtime.name.toLowerCase()}-btn`} onChange={() => this.props.onChange(showtime.name)} className="btn--theater"/>
                        <label htmlFor ={`${showtime.name.toLowerCase()}-btn`}>{showtime.name}</label>
                    </a>
                );
            })
        );
    }
}

class MovieList extends Component {
    
    render() {
        
        return (
            this.props.movieData.map((data, i) => {
                const showtimes = data.showtimes.map((time, i) => {
                    return (
                        <span key={i}>{time}</span>
                    );
                });
                return (
                    <li key={i} className="results--item">
                        <div>
                            <figure>
                                <img src={data.poster} alt={`${data.title} poster`}/>
                            </figure>
                            <div className="result--info">
                                <h2>{data.title}<span>{`(${data.rating})`}</span></h2>
                                <div className="result--showtime">{showtimes}</div>
                            </div>
                        </div>
                    </li>
                );
            })
        );
    }
}

export default App;
