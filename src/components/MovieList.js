import React from 'react';
import PropTypes from 'prop-types';

const MovieList = (props) => {
    const hour = new Date().getHours() * 60;
    const min = new Date().getMinutes();
    const curtime = (hour + min);

    return (
        props.movieData.map((data, i) => {
            let sorted = data.showtimes.map((time) => {
                const split = time.split(" ");
                const amPm = split[1];
                const hm = split[0].split(":");
                const hour = amPm === "am" ? parseInt(hm[0], 10) * 60 : (parseInt(hm[0], 10) + 12) * 60;
                const min = parseInt(hm[1], 10);
                const startTime = hour + min;
                return {formatted: time, number: startTime};
            });
            sorted = sorted.sort((a, b) => a.number - b.number);
            const showtimes = sorted.map((time, i) => {
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