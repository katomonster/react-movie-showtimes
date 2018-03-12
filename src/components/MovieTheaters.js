import React from 'react';
import PropTypes from 'prop-types';

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

MovieTheaters.propTypes = {
    showtimes: PropTypes.array.isRequired,
    slug: PropTypes.func,
    selectedTheater: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default MovieTheaters;