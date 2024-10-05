let lastTap = 0; 
const element = document.querySelector('.target'); 
let isFollowing = false; 
let lastFollowing = false;
let initSecondTouch = false;

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
        if(initSecondTouch){
            lastFollowing = isFollowing;
            isFollowing = true; 
            console.log('Double tapped! Following mode activated.');
        }
        else{
            isFollowing = lastFollowing;
        }
        
    } else {
        lastFollowing = isFollowing;
        isFollowing = false; 
        console.log('Single tapped! Following mode deactivated.');
    }
    lastTap = curTime;
}

element.addEventListener('touchstart', () => {
    
    document.addEventListener('touchmove', moveAt);
   
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        if (isFollowing) {
            moveAt(e); 
            document.addEventListener('click', funClick);
        }
    } else if (e.touches.length === 2){
        initSecondTouch = true;
        element.style.left = initialPosition.left;
        element.style.top = initialPosition.top;
        isFollowing = lastFollowing;
        document.removeEventListener("touchmove", moveAt);
        document.removeEventListener('touchend', (e));
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