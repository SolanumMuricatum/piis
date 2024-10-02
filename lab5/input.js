var rectangles = document.querySelectorAll(".target");

rectangles.forEach(rectangle =>{

  const initialPosition = {
    top: rectangle.style.top,
    left: rectangle.style.left
  };

  document.addEventListener('keydown', function(event) {
    console.log(`Вы нажали клавишу: ${event.key}`);
    if (event.key === 'Escape') {
      document.removeEventListener("mousemove", moveAt);
      rectangle.style.left = initialPosition.left;
      rectangle.style.top = initialPosition.top;
      rectangle.style.backgroundColor = "red";
    }
  });

  rectangle.ondragstart = function() {
    return false;
  };

  function moveAt(e){
    rectangle.style.left = e.pageX - rectangle.offsetWidth/2 + 'px';
    rectangle.style.top = e.pageY - rectangle.offsetHeight/2 + 'px';
  }

  rectangle.addEventListener("mousedown", (e)=>{

    rectangle.style.zIndex = 10;

    document.addEventListener("mousemove", moveAt);

    document.addEventListener("mouseup", ()=>{
      initialPosition.left = rectangle.style.left;
      initialPosition.top = rectangle.style.top;
      document.removeEventListener("mousemove", moveAt);
      document.removeEventListener("mouseup");
    });

  });

  rectangle.addEventListener("dblclick", (e)=>{
    
    rectangle.style.zIndex = 10;
    rectangle.style.backgroundColor = "green";

    document.addEventListener("mousemove", moveAt);

    document.addEventListener("mouseup", ()=>{
      initialPosition.left = rectangle.style.left;
      initialPosition.top = rectangle.style.top;
      rectangle.style.backgroundColor = "red";
      document.removeEventListener("mousemove", moveAt);
      document.removeEventListener("mouseup");
    });

  });
  
});
