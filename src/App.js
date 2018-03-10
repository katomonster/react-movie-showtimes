import React, { Component } from 'react';

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
                <div className="search--wrapper">
                    <input type="text" id="search--input" placeholder="Search Movies..." onChange={(e) => this.searchMovie(e)}/>
                </div>
                <nav className="nav--theaters">
                    <MovieTheaters showtimes={this.state.movieShowtimes} selectedTheater={this.state.selectedTheater} onChange={(name) => this.setCurrentData(name)} slug={this.stringSlugify}></MovieTheaters>
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

const MovieTheaters = (props) => {
    return (
        props.showtimes.map((showtime, i) => {
            const showtimeName = props.slug(showtime.name);
            return (
                <a key={i} className={props.selectedTheater === showtimeName ? "active" : ""}>
                    <input type="radio" name="theaters" id={`${showtimeName}-btn`} onChange={() => props.onChange(showtime.name)} className="btn--theater"/>
                    <label htmlFor ={`${showtimeName}-btn`}>{showtime.name}</label>
                </a>
            );
        })
    );
}

const MovieList = (props) => {
    return (
        props.movieData.map((data, i) => {
            const showtimes = data.showtimes.map((time, i) => {
                return (
                    <span key={i}>{time}</span>
                );
            });
            return (
                <li key={i} className="results--item">
                    <figure>
                        <img src={data.poster} alt={`${data.title} poster`}/>
                    </figure>
                    <div className="result--info">
                        <h2>{data.title}<span>{`(${data.rating})`}</span></h2>
                        <div className="result--showtime">{showtimes}</div>
                    </div>
                </li>
            );
        })
    );
}

export default App;
