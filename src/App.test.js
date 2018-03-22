import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './../public/json/movieMetaData.json';
import assert from 'assert';

let app;

const metaData = [
    {
        "id": "440cc42b43bbcb8b5d38fbdede9e22f1",
        "title": "The Great Wall",
        "rating": "PG-13",
        "poster": "movie_posters/the_great_wall.jpg"
    },
    {
        "id": "b4c2c326a4d335da654d4fd944bf88d0",
        "title": "Fifty Shades Darker",
        "rating": "R",
        "poster": "movie_posters/fifty_shades_darker.jpg"
    },
    {
        "id": "f94447a9a91123041f6eb0679f01d80d",
        "title": "Doctor Strange",
        "rating": "PG-13",
        "poster": "movie_posters/doctor_strange.jpg"
    },
    {
        "id": "56a14924d53cc5f82f75505b52deffbd",
        "title": "Nocturnal Animals",
        "rating": "R",
        "poster": "movie_posters/nocturnal_animals.jpg"
    },
    {
        "id": "52208a5a1900898799ddef74d62ca710",
        "title": "Jurassic World",
        "rating": "PG-13",
        "poster": "movie_posters/jurassic_world.jpg"
    },
    {
        "id": "83eca80b80a52736a16663dded65e5f2",
        "title": "Suicide Squad",
        "rating": "R",
        "poster": "movie_posters/suicide_squad.jpg"
    },
    {
        "id": "bb768d6cd40339bd98c948be36ed8fe7",
        "title": "War Dogs",
        "rating": "R",
        "poster": "movie_posters/war_dogs.jpg"
    },
    {
        "id": "eb97596c1083cce466f1c664994983bb",
        "title": "Mad Max: Fury Road",
        "rating": "R",
        "poster": "movie_posters/mad_max.jpg"
    },
    {
        "id": "1150762c2724f57b7cf83b5cb5c9fad5",
        "title": "Anthropoid",
        "rating": "R",
        "poster": "movie_posters/anthropoid.jpg"
    }
];

const showtimesData = [
    {
        "id": "2030c64ce72b4e4605cb01f2ba405b7d",
        "name": "Arclight",
        "showtimes": {
            "b4c2c326a4d335da654d4fd944bf88d0": [
              "11:30 pm", "2:45 pm", "8:35 pm", "4:15 pm", "10:30 pm"
            ],
            "f94447a9a91123041f6eb0679f01d80d": [
              "10:30 am", "6:20 pm", "2:25 pm", "9:40 pm"
            ],
            "56a14924d53cc5f82f75505b52deffbd": [
              "10:00 am", "12:30 pm", "5:25 pm", "3:30 pm", "9:15 pm", "11:55 pm"
            ],
            "52208a5a1900898799ddef74d62ca710": [
              "12:20 pm", "12:50 pm", "5:15 pm", "3:50 pm", "9:55 pm", "12:35 am"
            ],
            "bb768d6cd40339bd98c948be36ed8fe7": [
              "12:05 pm", "8:30 am", "7:25 pm", "4:10 pm", "9:25 pm", "1:25 pm"
            ],
            "eb97596c1083cce466f1c664994983bb": [
              "11:00 am", "2:35 pm", "5:35 pm", "3:10 pm", "9:25 pm", "11:25 pm"
            ],
            "1150762c2724f57b7cf83b5cb5c9fad5": [
              "10:45 am", "12:15 pm", "5:40 pm", "11:20 am", "8:05 pm"
            ]
        }
    },
    {
        "id": "58f3356c0ffe87bcb324454056587b67",
        "name": "Pacific Theatres",
        "showtimes": {
            "f94447a9a91123041f6eb0679f01d80d": [
              "11:30 pm", "2:45 pm", "8:35 pm", "4:15 pm", "10:30 pm"
            ],
            "56a14924d53cc5f82f75505b52deffbd": [
              "10:30 am", "6:20 pm", "2:25 pm", "9:40 pm"
            ],
            "52208a5a1900898799ddef74d62ca710": [
              "12:05 pm", "8:30 am", "7:25 pm", "4:10 pm", "9:25 pm", "1:25 pm"
            ],
            "83eca80b80a52736a16663dded65e5f2": [
              "12:20 pm", "12:50 pm", "5:15 pm", "3:50 pm", "9:55 pm", "12:35 am"
            ],
            "bb768d6cd40339bd98c948be36ed8fe7": [
              "10:40 am", "6:30 pm", "2:15 pm", "9:45 pm"
            ],
            "eb97596c1083cce466f1c664994983bb": [
              "9:30 am", "11:20 pm", "5:25 pm", "11:10 am", "8:15 pm"
            ],
            "1150762c2724f57b7cf83b5cb5c9fad5": [
              "10:00 am", "12:30 pm", "5:25 pm", "3:30 pm", "9:15 pm", "11:55 pm"
            ]
        }
    }
];

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
	ReactDOM.unmountComponentAtNode(div);
});
beforeEach(() => {
	console.log('before each');
	app = new App();
});

describe('Hello World', () => {
	const foo = 'hello world';
	expect(foo).toBe('hello world');
});

describe('#getSortedShowtimes', () => {
	it('sorts showtimes into formatted and number in an object', () => {
		const showtimes = [
			'11:30 pm', '10:30 am'
		];
		const getSortedShowtimes = app.getSortedShowtimes;
		expect(getSortedShowtimes(showtimes)).toEqual([{formatted: '10:30 am', number: 630}, {formatted: '11:30 pm', number: 1410}]);
	});
	it('sorts showtimes into formatted and number in an object', () => {
		const showtimes = [
			'1:30 pm', '10:30 am'
		];
		const getSortedShowtimes = app.getSortedShowtimes;
		expect(getSortedShowtimes(showtimes)).toEqual([{formatted: '10:30 am', number: 630}, {formatted: '1:30 pm', number: 810}]);
	});
});

describe('#stringSlugify', () => {
	const string = "hello my friend";
	const string2 = 'Antwerp';
	it('replaces spaces to hyphen in a string', () => {
		expect(app.stringSlugify(string)).toEqual('hello-my-friend');
	});
	it('returns original string if no space', () => {
		expect(app.stringSlugify(string2)).toEqual('antwerp');
	});
});

describe('Shows the correct data value', () => {
	it('shows the correct movie poster for the first index', () => {
		app.state.movieMetaData = metaData;
		app.state.movieShowtimes = showtimesData;
		const data = app.getMovieData(metaData, showtimesData);
		assert(data.data[0].movieInfo[0].poster === 'movie_posters/anthropoid.jpg');
	})

	it('shows the correct selected theater', () => {
		app.state.movieMetaData = metaData;
		app.state.movieShowtimes = showtimesData;
		const data = app.getMovieData(metaData, showtimesData);
		assert(data.selectedTheater === "arclight");
	})
});

describe('#getMetaData', () => {
	it('shows empty object when passing empty object', () => {
		const data = app.getMovieData([], []);
		expect(data).toEqual([]);
	});

	it('shows empty object when passing at least empty object', () => {
		const data = app.getMovieData(metaData, []);
		expect(data).toEqual([]);
	});

	it('shows empty object when passing at least empty object', () => {
		const data = app.getMovieData([], showtimesData);
		expect(data).toEqual([]);
	});

	it('shows movie data info for each theater', () => {
		app.state.movieMetaData = metaData;
		app.state.movieShowtimes = showtimesData;
		const data = app.getMovieData(metaData, showtimesData);
		expect(data).toEqual({
			"data": [
				{
					"movieInfo": [
						{
							"poster": "movie_posters/anthropoid.jpg",
							"rating": "R",
							"showtimes": [
								{"formatted": "10:45 am", "number": 645},
								{"formatted": "11:20 am", "number": 680},
								{"formatted": "5:40 pm", "number": 1060},
								{"formatted": "8:05 pm", "number": 1205},
								{"formatted": "12:15 pm", "number": 1455}
							],
							"title": "Anthropoid"
						},
						{
							"poster": "movie_posters/doctor_strange.jpg",
							"rating": "PG-13",
							"showtimes": [
								{"formatted": "10:30 am", "number": 630},
								{"formatted": "2:25 pm", "number": 865},
								{"formatted": "6:20 pm", "number": 1100},
								{"formatted": "9:40 pm", "number": 1300}
							],
							"title": "Doctor Strange"
						},
						{
							"poster": "movie_posters/fifty_shades_darker.jpg",
							"rating": "R",
							"showtimes": [
								{"formatted": "2:45 pm", "number": 885},
								{"formatted": "4:15 pm", "number": 975},
								{"formatted": "8:35 pm", "number": 1235},
								{"formatted": "10:30 pm", "number": 1350},
								{"formatted": "11:30 pm", "number": 1410}
							],
							"title": "Fifty Shades Darker"
						},
						{
							"poster": "movie_posters/jurassic_world.jpg",
							"rating": "PG-13",
							"showtimes": [
								{"formatted": "12:35 am", "number": 755},
								{"formatted": "3:50 pm", "number": 950},
								{"formatted": "5:15 pm", "number": 1035},
								{"formatted": "9:55 pm", "number": 1315},
								{"formatted": "12:20 pm", "number": 1460},
								{"formatted": "12:50 pm", "number": 1490}
							],
						"title": "Jurassic World"},
						{
							"poster": "movie_posters/mad_max.jpg",
							"rating": "R",
							"showtimes": [
								{"formatted": "11:00 am", "number": 660},
								{"formatted": "2:35 pm", "number": 875},
								{"formatted": "3:10 pm", "number": 910},
								{"formatted": "5:35 pm", "number": 1055},
								{"formatted": "9:25 pm", "number": 1285},
								{"formatted": "11:25 pm", "number": 1405}
							],
							"title": "Mad Max: Fury Road"
						}, {
							"poster": "movie_posters/nocturnal_animals.jpg",
							"rating": "R",
							"showtimes": [
								{"formatted": "10:00 am", "number": 600},
								{"formatted": "3:30 pm", "number": 930},
								{"formatted": "5:25 pm", "number": 1045},
								{"formatted": "9:15 pm", "number": 1275}, 
								{"formatted": "11:55 pm", "number": 1435},
								{"formatted": "12:30 pm", "number": 1470}
							],
							"title": "Nocturnal Animals"
						},
						{
							"poster": "movie_posters/war_dogs.jpg",
							"rating": "R",
							"showtimes": [
								{"formatted": "8:30 am", "number": 510},
								{"formatted": "1:25 pm", "number": 805},
								{"formatted": "4:10 pm", "number": 970},
								{"formatted": "7:25 pm", "number": 1165},
								{"formatted": "9:25 pm", "number": 1285},
								{"formatted": "12:05 pm", "number": 1445}
							],
							"title": "War Dogs"
						}
					],
					"name": "Arclight"
				},
				{
					"movieInfo": [
						{
							"poster": "movie_posters/anthropoid.jpg",
							"rating": "R",
							"showtimes": [
								{"formatted": "10:00 am", "number": 600},
								{"formatted": "3:30 pm", "number": 930},
								{"formatted": "5:25 pm", "number": 1045},
								{"formatted": "9:15 pm", "number": 1275},
								{"formatted": "11:55 pm", "number": 1435},
								{"formatted": "12:30 pm", "number": 1470}
							],
							"title": "Anthropoid"
						}, {
							"poster": "movie_posters/doctor_strange.jpg",
							"rating": "PG-13",
							"showtimes": [
								{"formatted": "2:45 pm", "number": 885},
								{"formatted": "4:15 pm", "number": 975},
								{"formatted": "8:35 pm", "number": 1235},
								{"formatted": "10:30 pm", "number": 1350},
								{"formatted": "11:30 pm", "number": 1410}
							],
							"title": "Doctor Strange"
						},
						{
							"poster": "movie_posters/jurassic_world.jpg",
							"rating": "PG-13",
							"showtimes": [
								{"formatted": "8:30 am", "number": 510},
								{"formatted": "1:25 pm", "number": 805},
								{"formatted": "4:10 pm", "number": 970},
								{"formatted": "7:25 pm", "number": 1165},
								{"formatted": "9:25 pm", "number": 1285},
								{"formatted": "12:05 pm", "number": 1445}
							],
							"title": "Jurassic World"
						},
						{
							"poster": "movie_posters/mad_max.jpg",
							"rating": "R",
							"showtimes": [
								{"formatted": "9:30 am", "number": 570},
								{"formatted": "11:10 am", "number": 670},
								{"formatted": "5:25 pm", "number": 1045},
								{"formatted": "8:15 pm", "number": 1215},
								{"formatted": "11:20 pm", "number": 1400}
							],
							"title": "Mad Max: Fury Road"
						},
						{
							"poster": "movie_posters/nocturnal_animals.jpg",
							"rating": "R",
							"showtimes": [
								{"formatted": "10:30 am", "number": 630},
								{"formatted": "2:25 pm", "number": 865},
								{"formatted": "6:20 pm", "number": 1100},
								{"formatted": "9:40 pm", "number": 1300}
							],
							"title": "Nocturnal Animals"
						},
						{
							"poster": "movie_posters/suicide_squad.jpg",
							"rating": "R",
							"showtimes": [
								{"formatted": "12:35 am", "number": 755},
								{"formatted": "3:50 pm", "number": 950},
								{"formatted": "5:15 pm", "number": 1035},
								{"formatted": "9:55 pm", "number": 1315},
								{"formatted": "12:20 pm", "number": 1460},
								{"formatted": "12:50 pm", "number": 1490}
							],
							"title": "Suicide Squad"
						},
						{
							"poster": "movie_posters/war_dogs.jpg",
							"rating": "R",
							"showtimes": [
								{"formatted": "10:40 am", "number": 640},
								{"formatted": "2:15 pm", "number": 855},
								{"formatted": "6:30 pm", "number": 1110},
								{"formatted": "9:45 pm", "number": 1305}
							],
							"title": "War Dogs"
						}
					],
					"name": "Pacific Theatres"
				}
			],	
			"fullSelectedData": [
				{
					"poster": "movie_posters/anthropoid.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "10:45 am", "number": 645},
						{"formatted": "11:20 am", "number": 680},
						{"formatted": "5:40 pm", "number": 1060},
						{"formatted": "8:05 pm", "number": 1205},
						{"formatted": "12:15 pm", "number": 1455}
					],
					"title": "Anthropoid"
				},
				{
					"poster": "movie_posters/doctor_strange.jpg",
					"rating": "PG-13",
					"showtimes": [
						{"formatted": "10:30 am", "number": 630},
						{"formatted": "2:25 pm", "number": 865},
						{"formatted": "6:20 pm", "number": 1100},
						{"formatted": "9:40 pm", "number": 1300}
					],
					"title": "Doctor Strange"
				},
				{
					"poster": "movie_posters/fifty_shades_darker.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "2:45 pm", "number": 885},
						{"formatted": "4:15 pm", "number": 975},
						{"formatted": "8:35 pm", "number": 1235},
						{"formatted": "10:30 pm", "number": 1350},
						{"formatted": "11:30 pm", "number": 1410}
					],
					"title": "Fifty Shades Darker"
				},
				{
					"poster": "movie_posters/jurassic_world.jpg",
					"rating": "PG-13",
					"showtimes": [
						{"formatted": "12:35 am", "number": 755},
						{"formatted": "3:50 pm", "number": 950},
						{"formatted": "5:15 pm", "number": 1035},
						{"formatted": "9:55 pm", "number": 1315},
						{"formatted": "12:20 pm", "number": 1460},
						{"formatted": "12:50 pm", "number": 1490}
					],
					"title": "Jurassic World"
				},
				{
					"poster": "movie_posters/mad_max.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "11:00 am", "number": 660},
						{"formatted": "2:35 pm", "number": 875},
						{"formatted": "3:10 pm", "number": 910},
						{"formatted": "5:35 pm", "number": 1055},
						{"formatted": "9:25 pm", "number": 1285},
						{"formatted": "11:25 pm", "number": 1405}
					],
					"title": "Mad Max: Fury Road"
				},
				{
					"poster": "movie_posters/nocturnal_animals.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "10:00 am", "number": 600},
						{"formatted": "3:30 pm", "number": 930},
						{"formatted": "5:25 pm", "number": 1045},
						{"formatted": "9:15 pm", "number": 1275},
						{"formatted": "11:55 pm", "number": 1435},
						{"formatted": "12:30 pm", "number": 1470}
					],
					"title": "Nocturnal Animals"
				},
				{
					"poster": "movie_posters/war_dogs.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "8:30 am", "number": 510},
						{"formatted": "1:25 pm", "number": 805},
						{"formatted": "4:10 pm", "number": 970},
						{"formatted": "7:25 pm", "number": 1165},
						{"formatted": "9:25 pm", "number": 1285},
						{"formatted": "12:05 pm", "number": 1445}
					],
					"title": "War Dogs"
				}
			],
			"selectedData": [
				{
					"poster": "movie_posters/anthropoid.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "10:45 am", "number": 645},
						{"formatted": "11:20 am", "number": 680},
						{"formatted": "5:40 pm", "number": 1060},
						{"formatted": "8:05 pm", "number": 1205},
						{"formatted": "12:15 pm", "number": 1455}
					],
					"title": "Anthropoid"
				},
				{
					"poster": "movie_posters/doctor_strange.jpg",
					"rating": "PG-13",
					"showtimes": [
						{"formatted": "10:30 am", "number": 630},
						{"formatted": "2:25 pm", "number": 865},
						{"formatted": "6:20 pm", "number": 1100},
						{"formatted": "9:40 pm", "number": 1300}
					],
					"title": "Doctor Strange"
				},
				{
					"poster": "movie_posters/fifty_shades_darker.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "2:45 pm", "number": 885},
						{"formatted": "4:15 pm", "number": 975},
						{"formatted": "8:35 pm", "number": 1235},
						{"formatted": "10:30 pm", "number": 1350},
						{"formatted": "11:30 pm", "number": 1410}
					],
					"title": "Fifty Shades Darker"
				},
				{
					"poster": "movie_posters/jurassic_world.jpg",
					"rating": "PG-13",
					"showtimes": [
						{"formatted": "12:35 am", "number": 755},
						{"formatted": "3:50 pm", "number": 950},
						{"formatted": "5:15 pm", "number": 1035},
						{"formatted": "9:55 pm", "number": 1315},
						{"formatted": "12:20 pm", "number": 1460},
						{"formatted": "12:50 pm", "number": 1490}
					],
					"title": "Jurassic World"
				},
				{
					"poster": "movie_posters/mad_max.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "11:00 am", "number": 660},
						{"formatted": "2:35 pm", "number": 875},
						{"formatted": "3:10 pm", "number": 910},
						{"formatted": "5:35 pm", "number": 1055},
						{"formatted": "9:25 pm", "number": 1285},
						{"formatted": "11:25 pm", "number": 1405}
					],
					"title": "Mad Max: Fury Road"
				},
				{
					"poster": "movie_posters/nocturnal_animals.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "10:00 am", "number": 600},
						{"formatted": "3:30 pm", "number": 930},
						{"formatted": "5:25 pm", "number": 1045},
						{"formatted": "9:15 pm", "number": 1275},
						{"formatted": "11:55 pm", "number": 1435},
						{"formatted": "12:30 pm", "number": 1470}
					],
					"title": "Nocturnal Animals"
				},
				{
					"poster": "movie_posters/war_dogs.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "8:30 am", "number": 510},
						{"formatted": "1:25 pm", "number": 805},
						{"formatted": "4:10 pm", "number": 970},
						{"formatted": "7:25 pm", "number": 1165},
						{"formatted": "9:25 pm", "number": 1285},
						{"formatted": "12:05 pm", "number": 1445}
					],
					"title": "War Dogs"
				}
			],
			"selectedTheater": "arclight"
		});
	});

	it('shows movie data info for each theater', () => {
		app.state.movieMetaData = metaData;
		app.state.movieShowtimes = showtimesData;
		const data = app.getMovieData(metaData, showtimesData);
		expect(data.data[0].movieInfo).toEqual(
			[
				{
					"poster": "movie_posters/anthropoid.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "10:45 am", "number": 645},
						{"formatted": "11:20 am", "number": 680},
						{"formatted": "5:40 pm", "number": 1060},
						{"formatted": "8:05 pm", "number": 1205},
						{"formatted": "12:15 pm", "number": 1455}
					],
					"title": "Anthropoid"
				},
				{
					"poster": "movie_posters/doctor_strange.jpg",
					"rating": "PG-13",
					"showtimes": [
						{"formatted": "10:30 am", "number": 630},
						{"formatted": "2:25 pm", "number": 865},
						{"formatted": "6:20 pm", "number": 1100},
						{"formatted": "9:40 pm", "number": 1300}
					],
					"title": "Doctor Strange"
				},
				{
					"poster": "movie_posters/fifty_shades_darker.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "2:45 pm", "number": 885},
						{"formatted": "4:15 pm", "number": 975},
						{"formatted": "8:35 pm", "number": 1235},
						{"formatted": "10:30 pm", "number": 1350},
						{"formatted": "11:30 pm", "number": 1410}
					],
					"title": "Fifty Shades Darker"
				},
				{
					"poster": "movie_posters/jurassic_world.jpg",
					"rating": "PG-13",
					"showtimes": [
						{"formatted": "12:35 am", "number": 755},
						{"formatted": "3:50 pm", "number": 950},
						{"formatted": "5:15 pm", "number": 1035},
						{"formatted": "9:55 pm", "number": 1315},
						{"formatted": "12:20 pm", "number": 1460},
						{"formatted": "12:50 pm", "number": 1490}
					],
				"title": "Jurassic World"},
				{
					"poster": "movie_posters/mad_max.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "11:00 am", "number": 660},
						{"formatted": "2:35 pm", "number": 875},
						{"formatted": "3:10 pm", "number": 910},
						{"formatted": "5:35 pm", "number": 1055},
						{"formatted": "9:25 pm", "number": 1285},
						{"formatted": "11:25 pm", "number": 1405}
					],
					"title": "Mad Max: Fury Road"
				}, {
					"poster": "movie_posters/nocturnal_animals.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "10:00 am", "number": 600},
						{"formatted": "3:30 pm", "number": 930},
						{"formatted": "5:25 pm", "number": 1045},
						{"formatted": "9:15 pm", "number": 1275}, 
						{"formatted": "11:55 pm", "number": 1435},
						{"formatted": "12:30 pm", "number": 1470}
					],
					"title": "Nocturnal Animals"
				},
				{
					"poster": "movie_posters/war_dogs.jpg",
					"rating": "R",
					"showtimes": [
						{"formatted": "8:30 am", "number": 510},
						{"formatted": "1:25 pm", "number": 805},
						{"formatted": "4:10 pm", "number": 970},
						{"formatted": "7:25 pm", "number": 1165},
						{"formatted": "9:25 pm", "number": 1285},
						{"formatted": "12:05 pm", "number": 1445}
					],
					"title": "War Dogs"
				}
			]
		);

	});
});

