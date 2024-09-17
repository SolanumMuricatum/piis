import { shirts } from './shirts.js'; 

function createTable(shirtsArray, containerId) {

    const container = document.getElementById(containerId);
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (let i = 0; i < shirtsArray.length; i++) {

        if (i % 3 === 0) {
            var row = document.createElement('tr');
        }

        const cell = document.createElement('td');
        const card = document.createElement('div');
        const name = document.createElement('h3');
        const img = document.createElement('img');
        const colors = document.createElement('span');
        const button1 = document.createElement('button');
        const button2 = document.createElement('button');

        name.textContent = shirtsArray[i].name; // Имя футболки

        img.src = shirtsArray[i].colors.white.front; // Изображение
        img.className = 'imageStyle';

        colors.textContent = "Available in " + Object.keys(shirtsArray[i].colors).length + " colors"; //считаем поля объекта colors
        button1.textContent = "Quick View";
        button2.textContent = "See Page";

        cell.className = 'cellStyle';

        button1.className = 'buttonStyle';
        button2.className = 'buttonStyle';

        const buttonsHolder = document.createElement('div');
        buttonsHolder.style.paddingTop = "10px";
        buttonsHolder.appendChild(button1);
        buttonsHolder.appendChild(button2);

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(colors);
        card.appendChild(buttonsHolder);
        cell.appendChild(card);
        row.appendChild(cell);

        if (i % 3 === 2 || i === shirtsArray.length - 1) { //добавляем строку в тело когда добавили 3 столбца + если это последний элемент 
            tbody.appendChild(row);
        }

        tbody.appendChild(row);

        button1.addEventListener("click", function() {   //навешиваем обработчик на кнопку
           
            const modal = document.getElementById('modal')  //чистим модальное окно перед запуском
            modal.innerHTML = '';
            
            const cell = document.createElement('td');
            const card = document.createElement('div');
            const name = document.createElement('h3');
            const price = document.createElement('h3');
            const imgFront = document.createElement('img');
            const imgBack = document.createElement('img');
            const buttonClose = document.createElement('button');

            buttonClose.textContent = "Close";
            buttonClose.className = 'buttonStyle';

            name.textContent = shirtsArray[i].name; // Имя футболки
            price.textContent = shirtsArray[i].price; // Цена футболки

            imgFront.src = shirtsArray[i].colors.white.front; // Изображение спереди
            imgFront.className = 'imageStyle';

            imgBack.src = shirtsArray[i].colors.white.back; // Изображение сзади
            imgBack.className = 'imageStyle';

            cell.className = 'cellStyle';

            card.appendChild(imgFront);
            card.appendChild(imgBack);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(buttonClose);
            cell.appendChild(card);
            modal.appendChild(cell); // Добавляем содержимое в модальное окно

            modal.style.display = "block"; // Открываем модальное окно

            // Обработчик закрытия
            buttonClose.addEventListener("click", function() {
                modal.style.display = "none";
            });
        });

        button2.addEventListener("click", function() {   //навешиваем обработчик на кнопку
            localStorage.setItem('selectedShirt', JSON.stringify(shirtsArray[i]));
            // Переходим на страницу details.html
            window.location.href = 'details.html';
        });
    }

    table.appendChild(tbody);
    container.appendChild(table);
}

createTable(shirts, 'tableId')