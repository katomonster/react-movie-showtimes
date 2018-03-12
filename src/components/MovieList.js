import React from 'react';
import PropTypes from 'prop-types';

const MovieList = (props) => {
    const hour = new Date().getHours() * 60;
    const min = new Date().getMinutes();
    const curtime = (hour + min);

    return (
        props.movieData.map((data, i) => {
            const showtimes = data.showtimes.map((time, i) => {
                return (
                    <span key={i} className = {time.number < curtime ? "time--past" : ""}>{time.formatted}</span>
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

MovieList.propTypes = {
    movieData: PropTypes.array.isRequired
}

export default MovieList;