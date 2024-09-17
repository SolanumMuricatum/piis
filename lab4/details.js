// Получаем данные о выбранной футболке из localStorage
const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));

if (selectedShirt) {
    localStorage.setItem('color', JSON.stringify('white'));
    const shirtDetails = document.getElementById('shirtDetails');

    const card = document.createElement('table');
    const row = document.createElement('tr'); 
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const name = document.createElement('h3');
    const imgFront = document.createElement('img');
    const price = document.createElement('h3');

    name.textContent = selectedShirt.name;

    imgFront.src = selectedShirt.colors.white.front; // Изображение спереди
    imgFront.className = 'imageStyle';

    price.textContent = selectedShirt.price;

    cell1.appendChild(name);
    cell1.appendChild(price);
    cell1.appendChild(imgFront);

    row.appendChild(cell1); // Добавляем первую ячейку в строку

    const table = document.createElement('table');
    const rowButtonsForImage = document.createElement('tr');

    const frontButton = document.createElement('button');
    const backButton = document.createElement('button');
    frontButton.textContent = 'Front';
    backButton.textContent = 'Back';
    frontButton.className = 'buttonStyleDetails';
    backButton.className = 'buttonStyleDetails';

    const cellFront = document.createElement('td'); // Создаем ячейку для кнопки
    cellFront.appendChild(frontButton);
    const cellBack = document.createElement('td'); // Создаем ячейку для кнопки
    cellBack.appendChild(backButton);

    rowButtonsForImage.appendChild(cellFront);
    rowButtonsForImage.appendChild(cellBack);

    const emptyRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.style.height = '5px';
    emptyRow.appendChild(emptyCell);
    
    table.appendChild(rowButtonsForImage);
    table.appendChild(emptyRow);

    const colorsArray = Object.keys(selectedShirt.colors); // Получаем массив цветов
    let rowT; 

    for (let i = 0; i < colorsArray.length; i++) {
        
        if (i % 3 === 0) {
            rowT = document.createElement('tr'); 
        }

        const color = colorsArray[i]; // Получаем цвет по индексу
        const colorButton = document.createElement('button');
        colorButton.textContent = color;
        colorButton.style.backgroundColor = color; 
        colorButton.style.color = 'black'; 
        colorButton.className = 'buttonStyleDetails';

        const cell = document.createElement('td'); // Создаем ячейку для кнопки
        cell.appendChild(colorButton);
        rowT.appendChild(cell);

        // Добавляем строку в таблицу, если это третья кнопка или последний элемент
        if (i % 3 === 2 || i === colorsArray.length - 1) {
            table.appendChild(rowT); 
        }

        colorButton.addEventListener("click", function() {   
            localStorage.setItem('color', JSON.stringify(color));
            updateImage(color);
        });
    }

    cell2.appendChild(table);
    cell2.className = 'cellStyleButtons';
    row.appendChild(cell2);
    card.appendChild(row);

    // Добавляем сгенерированные элементы на страницу
    shirtDetails.appendChild(card);

    frontButton.addEventListener("click", function() {   
        imgFront.src = selectedShirt.colors[JSON.parse(localStorage.getItem('color'))].front;
    });
    backButton.addEventListener("click", function() {   
        imgFront.src = selectedShirt.colors[JSON.parse(localStorage.getItem('color'))].back;
    });

    function updateImage(color) {
        imgFront.src = selectedShirt.colors[color].front; // Обновляем изображение спереди
    }
}