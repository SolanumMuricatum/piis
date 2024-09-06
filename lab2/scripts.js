var values = [true, false];
const privat = values[Math.floor(Math.random() * values.length)]

const personalMovieDB = {
  privat,
  movies: {
    "August Rush" : 10,
    "White Chicks" : 10,
    "Coraline In Country Nightmares" : 10,
  },
};

document.getElementById("privat").innerText = personalMovieDB.privat;

if (!personalMovieDB.privat) {
  tableAppend();
}

function tableAppend(){
  const table = document.createElement('table');
  document.body.append(table);

  const headerRow = document.createElement('tr');
  const movieHeader = document.createElement('th');
  const ratingHeader = document.createElement('th');

  movieHeader.textContent = 'Фильм';
  ratingHeader.textContent = 'Оценка';

  headerRow.append(movieHeader);
  headerRow.append(ratingHeader);
  table.append(headerRow);


  for (const [movie, rating] of Object.entries(personalMovieDB.movies)) {
    const row = document.createElement('tr');
    
    const movieCell = document.createElement('td');
    const ratingCell = document.createElement('td');

    movieCell.textContent = movie; // Название фильма
    ratingCell.textContent = rating; // Оценка

    row.append(movieCell);
    row.append(ratingCell);

    table.append(row);
  }
}



