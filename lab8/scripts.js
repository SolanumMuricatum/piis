const canvas = document.getElementById('canvasElement');
const ctx = canvas.getContext('2d');
let shapes = [];
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
  } else {
      console.log('Пожалуйста, выберите фигуру и цвет.');
  }
});

function createRectangle(color) {
  let startX, startY, width, height; 

  function onMouseDown(event) {
    startX = event.offsetX;
    startY = event.offsetY;

    document.addEventListener('mousemove', onMouseMove);
  }

  function onMouseMove(event) {
    // Очищаем canvas перед рисованием
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Перерисовываем все сохраненные фигуры
    drawAllShapes();

    const currentX = event.offsetX;
    const currentY = event.offsetY;
    
    // Вычисляем ширину и высоту прямоугольника
    width = currentX - startX; 
    height = currentY - startY; 

    //открываем поток для рисования
    ctx.fillStyle = color; 
    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.fill();

    ctx.strokeStyle = "black"; 
    ctx.stroke();
  }

  function onMouseUp() {
    // Сохраняем прямоугольник в массив
    shapes.push({
      type: 'rectangle',
      startX,
      startY,
      width,
      height,
      fillColor: color,
      strokeColor: "black"
    });

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
}

function createCircle(color) {
  let startX, startY, radius; 

  function onMouseDown(event) {
    startX = event.offsetX;
    startY = event.offsetY;

    document.addEventListener('mousemove', onMouseMove);
  }

  function onMouseMove(event) {
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawAllShapes();

    const currentX = event.offsetX;
    const currentY = event.offsetY;
    
    radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));

    // Открываем поток для рисования
    ctx.fillStyle = color; 
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "black"; 
    ctx.stroke();
  }

  function onMouseUp() {
    // Сохраняем круг в массив
    shapes.push({
      type: 'circle',
      startX,
      startY,
      radius,
      fillColor: color,
      strokeColor: "black"
    });

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
}

function drawAllShapes() {
  shapes.forEach(shape => {
    if (shape.type === 'rectangle') {
      ctx.fillStyle = shape.fillColor;
      ctx.fillRect(shape.startX, shape.startY, shape.width, shape.height);
      ctx.strokeStyle = shape.strokeColor;
      ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
    } else if (shape.type === 'circle') {
      ctx.fillStyle = shape.fillColor;
      ctx.beginPath();
      ctx.arc(shape.startX, shape.startY, shape.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = shape.strokeColor;
      ctx.stroke();
    }
  });
}