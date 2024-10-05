let lastTap = 0; 
const element = document.querySelector('.target'); 
let isFollowing = false; 

const initialPosition = {
    top: element.style.top,
    left: element.style.left
};

function moveAt(e) {
    element.style.left = e.touches[0].pageX - element.offsetWidth / 2 + 'px';
    element.style.top = e.touches[0].pageY - element.offsetHeight / 2 + 'px';
}

function funClick(){
    isFollowing = false;
}

function detectDoubleTap() {
    const curTime = new Date().getTime();
    const tapLen = curTime - lastTap;

    if (tapLen < 500 && tapLen > 0) {
        isFollowing = true; 
        console.log('Double tapped! Following mode activated.');
    } else {
        isFollowing = false; 
        console.log('Single tapped! Following mode deactivated.');
    }
    lastTap = curTime;
}

element.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
       
        document.addEventListener('touchmove', moveAt);
    } else if (e.touches.length === 2) {
        document.removeEventListener("touchmove", moveAt);
        element.style.left = initialPosition.left;
        element.style.top = initialPosition.top;
    }
});

document.addEventListener('touchmove', (e) => {
    if (isFollowing) {
        moveAt(e); 
        document.addEventListener('click', funClick);
    }
});

document.addEventListener('touchend', () => {
    initialPosition.left = element.style.left;
    initialPosition.top = element.style.top;
    if (!isFollowing) {
        detectDoubleTap();
        document.removeEventListener('click', funClick);
        document.removeEventListener('touchmove', moveAt);
    }
});