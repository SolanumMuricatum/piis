let lastTap = 0; 
const element = document.querySelector('.target'); 
let isFollowing = false; 
let lastFollowing = false;

const initialPosition = {
    top: element.style.top,
    left: element.style.left
};

function moveAt(e) {
    element.style.left = e.touches[0].pageX - element.offsetWidth / 2 + 'px';
    element.style.top = e.touches[0].pageY - element.offsetHeight / 2 + 'px';
}

function funClick(){
    lastFollowing = isFollowing;
    isFollowing = false;
}

function detectDoubleTap(e) {
    const curTime = new Date().getTime();
    const tapLen = curTime - lastTap;

    if (tapLen < 500 && tapLen > 0) {
        lastFollowing = isFollowing;
        isFollowing = true; 
        console.log('Double tapped! Following mode activated.');
    } else {
        lastFollowing = isFollowing;
        isFollowing = false; 
        console.log('Single tapped! Following mode deactivated.');
    }
    lastTap = curTime;
}

element.addEventListener('touchstart', (e) => {
   // if (e.touches.length === 1) {
       
        document.addEventListener('touchmove', moveAt);
    // } else if (e.touches.length === 2) {
    //     document.removeEventListener("touchmove", moveAt);
    //     element.style.left = initialPosition.left;
    //     element.style.top = initialPosition.top;
    // }
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        if (isFollowing) {
            moveAt(e); 
            document.addEventListener('click', funClick);
        }
    } else if (e.touches.length === 2){
        document.removeEventListener("touchmove", moveAt);
        isFollowing = lastFollowing;
        element.style.left = initialPosition.left;
        element.style.top = initialPosition.top;
    }
});

document.addEventListener('touchend', (e) => {
    initialPosition.left = element.style.left;
    initialPosition.top = element.style.top;
    if (!isFollowing) {
        detectDoubleTap(e);
        document.removeEventListener('click', funClick);
        document.removeEventListener('touchmove', moveAt);
    }
});