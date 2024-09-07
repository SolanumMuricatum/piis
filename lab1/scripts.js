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

  // Проверяем, существует ли фильм
  let movieKey = lastMovie;
  let count = 1;
  
  while (personalMovieDB.movies[movieKey] !== undefined) {
    movieKey = lastMovie + ' (' + count + ')'; // Добавляем суффикс
    count++;
  }

  do {
    movieRating = prompt('На сколько оцените его?', '');
  } while (movieRating.trim() === '' || movieRating == null || isNaN(movieRating));

  personalMovieDB.movies[movieKey] = movieRating; // Сохраняем с уникальным ключом
}

console.log(personalMovieDB)
