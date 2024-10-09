
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const selectedFigure = document.querySelector('input[name="figure"]:checked');
  const selectedColor = document.querySelector('input[name="color"]:checked');

  if (selectedFigure && selectedColor) {
    if(selectedFigure.value === "rectangle"){
      createRectangle(selectedColor.value)
    }
    else if(selectedFigure.value === "circle"){
      createCircle(selectedColor.value)
    }
    else if(selectedFigure.value === "square"){
      createSquare(selectedColor.value)
    }
    else if(selectedFigure.value === "star"){
      createStar(selectedColor.value);
    }
    
  } else {
      console.log('Пожалуйста, выберите фигуру и цвет.');
  }
});

function createRectangle(color) {
  var svg = document.getElementById("svgElement");
  let rect;
  let startX, startY; 

  function onMouseDown(event){
    // Запоминаем начальную позицию
    startX = event.offsetX;
    startY = event.offsetY;

    rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute('x', startX);
    rect.setAttribute('y', startY);
    rect.setAttribute('width', 0); 
    rect.setAttribute('height', 0); 
    rect.setAttribute('fill', color); 
    rect.setAttribute('stroke', 'black');
    svg.appendChild(rect);

    document.addEventListener('mousemove', onMouseMove);
  }

  function onMouseMove(event) {
    const currentX = event.offsetX;
    const currentY = event.offsetY;

    // Вычисляем ширину и высоту прямоугольника
    const width = currentX - startX; 
    const height = currentY - startY; 

    // Устанавливаем ширину и высоту
    rect.setAttribute('width', Math.abs(width));
    rect.setAttribute('height', Math.abs(height));

    // Корректируем положение прямоугольника в зависимости от направления рисования
    if (width < 0) {
        rect.setAttribute('x', currentX);
    }
    if (height < 0) {
        rect.setAttribute('y', currentY);
    }
  }

  function onMouseUp(){
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);

}


function createCircle(color) {
  var svg = document.getElementById("svgElement");
  let circle;
  let startX, startY; // Объявляем переменные для начальной позиции

  function onMouseDown(event){
      startX = event.offsetX;
      startY = event.offsetY;

      circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute('cx', startX);
      circle.setAttribute('cy', startY);
      circle.setAttribute('r', 0); // Начальный радиус 0
      circle.setAttribute('fill', color); 
      circle.setAttribute('stroke', 'black');
      svg.appendChild(circle);

      document.addEventListener('mousemove', onMouseMove);
  }

  function onMouseMove(event) {
      const currentX = event.offsetX;
      const currentY = event.offsetY;

      const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));

      circle.setAttribute('r', radius); // Устанавливаем радиус
  }

  function onMouseUp(){
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
}

function createSquare(color) {
  var svg = document.getElementById("svgElement");
  let sq;
  let startX, startY; 

  function onMouseDown(event) {
      // Запоминаем начальную позицию
      startX = event.offsetX;
      startY = event.offsetY;

      sq = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      sq.setAttribute('x', startX);
      sq.setAttribute('y', startY);
      sq.setAttribute('width', 0); 
      sq.setAttribute('height', 0); 
      sq.setAttribute('fill', color); 
      sq.setAttribute('stroke', 'black');
      svg.appendChild(sq);

      document.addEventListener('mousemove', onMouseMove);
  }

  function onMouseMove(event) {
      const currentX = event.offsetX;
      const currentY = event.offsetY;

      // Вычисляем длину стороны квадрата
      const edge = Math.max(Math.abs(currentX - startX), Math.abs(currentY - startY)); 

      // Устанавливаем ширину и высоту
      sq.setAttribute('width', edge);
      sq.setAttribute('height', edge);

    
      if (currentX < startX) {
          sq.setAttribute('x', startX - edge); // Если курсор движется влево
      } else {
          sq.setAttribute('x', startX); // Если курсор движется вправо
      }

      if (currentY < startY) {
          sq.setAttribute('y', startY - edge); // Если курсор движется вверх
      } else {
          sq.setAttribute('y', startY); // Если курсор движется вниз
      }
  }

  function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
}

function createStar(color) {
  var svg = document.getElementById("svgElement");
  let star;
  let startX, startY;

  function onMouseDown(event) {

      startX = event.offsetX;
      startY = event.offsetY;

      star = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      svg.appendChild(star);

      document.addEventListener('mousemove', onMouseMove);
  }

  function onMouseMove(event) {
      const currentX = event.offsetX;
      const currentY = event.offsetY;

      const edge = Math.max(Math.abs(currentX - startX), Math.abs(currentY - startY)); // Максимальное значение по осям

      const spikes = 5; // Количество верхушек
      const outerRadius = edge; // Внешний радиус
      const innerRadius = outerRadius * 0.4; // Внутренний радиус
      let points = [];

      // Вычисляем точки звезды, начиная с верхней точки
      for (let i = 0; i < spikes * 2; i++) { //радиусы чередуются, поэтому умножаем на 2
          const angle = (i * Math.PI) / spikes - Math.PI / 2; // Смещение на 90 градусов
          const radius = i % 2 === 0 ? outerRadius : innerRadius; // Чередуем внешние и внутренние радиусы
          const x = startX + Math.cos(angle) * radius; // Координату X вычисляем через косинус
          const y = startY + Math.sin(angle) * radius; // Координату Y вычисляем через синус
          points.push(`${x},${y}`); // Добавляем точку в массив
      }

      star.setAttribute('points', points.join(' ')); //Разделяем пробелами, чтобы получился массив координат
      star.setAttribute('fill', color);
      star.setAttribute('stroke', 'black');
      star.setAttribute('stroke-width', 1);
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
}

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
}