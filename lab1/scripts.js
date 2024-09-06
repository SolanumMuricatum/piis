let numberOfFilms;

do {
  numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?', '');
} while (numberOfFilms.trim() === '' || numberOfFilms === null || isNaN(numberOfFilms));

const personalMovieDB = {
   count: numberOfFilms,
   movies: {},
};

for (let i = 0; i < 2; i++) {
  let lastMovie, movieRating;

  do {
      lastMovie = prompt('Один из последних просмотренных фильмов?', '');
  } while (lastMovie.trim() === '' || lastMovie == null || lastMovie.length > 50);

  do {
      movieRating = prompt('На сколько оцените его?', '');
  } while (movieRating.trim() === '' || movieRating == null || isNaN(movieRating));

  personalMovieDB.movies[lastMovie] = movieRating; 
}

console.log(personalMovieDB)
