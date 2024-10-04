const element = document.querySelector('.target'); // Ваш div

element.addEventListener('touchstart', (e) => {
    //e.preventDefault(); // Отменяем действие по умолчанию
    document.addEventListener('touchmove', moveAt); // Передаем функцию, а не ее результат
});

document.addEventListener('touchend', () => {
    document.removeEventListener('touchmove', moveAt); // Удаляем обработчик при завершении касания
});

function moveAt(e) {
   // e.preventDefault(); // Отменяем действие по умолчанию
    element.style.left = e.touches[0].pageX - element.offsetWidth / 2 + 'px';
    element.style.top = e.touches[0].pageY - element.offsetHeight / 2 + 'px';
}