//have a IIFY to bind all data into a single function...
(function () {
    //taret the input-Field DOMs and btn DOMs...
    let hr = document.querySelector('.hour');
    let min = document.querySelector('.min');
    let sec = document.querySelector('.sec');
    
    let btnStart = document.querySelector('.container__btn--start');
    let btnPause = document.querySelector('.container__btn--pause'); 
    let btnReset = document.querySelector('.container__btn--reset'); 

    // A Functional global to handle the timer instance...
    let myTimer = null;

    //Handle the click on the start btn...
    btnStart.addEventListener('click', () => {
        //If my timer has nothing, Why should we start the timer --> Just Return...
        if(!hr.value && !min.value && !sec.value)
            return;
        
        // Handle the visibility of start and pause btn...
        btnStart.style.display = 'none';
        btnPause.style.display = 'initial';

        //Lets have an function to handle the timer...
        myTimer = setInterval(() => {
                        handlerTimer();
                    }, 1000);
    });

    const handlerTimer = () => {
        let secVal = sec.value || 0;
        let minVal = min.value || 0;
        let hrVal = hr.value || 0;
        if(parseInt(secVal) !== 0) {
            sec.value = parseInt(secVal-1) < 10 ? `0${secVal-1}`: `${secVal-1}`;
        } else if(parseInt(secVal) == 0 && parseInt(minVal) !== 0) {
            sec.value = 59;
            min.value = parseInt(minVal-1) < 10 ? `0${minVal-1}`: `${minVal-1}`;
        } else if(parseInt(minVal) == 0 && parseInt(hrVal) !== 0) {
            min.value = 60;
            hr.value = parseInt(hrVal-1) < 10 ? `0${hrVal-1}`: `${hrVal-1}`;
        } else {
            resetTimer('clear');
        }
    }

    //Handle click on Pause btn... --> clear the timer Instance and handle btn Visibility...
    btnPause.addEventListener('click', () => {
        resetTimer('pause');
    })

    //handle reset btn click --> clear the timerInstance and reset the field...
    btnReset.addEventListener('click', () => {
        resetTimer('clear');
    })

    const resetTimer = (state) => {
        //Once Timer is back on it's resetValue... 
        if(state !== 'pause') {
            hr.value = '';    
            min.value = '';    
            sec.value = '';    
        }
        btnStart.style.display = 'initial';
        btnPause.style.display = 'none';
        clearInterval(myTimer);
    }
    
    //Handle the Event when we focusout, The values should get properly distributed...
    hr.addEventListener('blur', () => {
        onFocusOutEvent()
    });
    min.addEventListener('blur', () => { 
        onFocusOutEvent()
    });
    sec.addEventListener('blur', () => { 
        onFocusOutEvent()
    });

    const onFocusOutEvent = () => {
        let secVal = sec.value || 0;
        let minVal = min.value || 0;
        let hrVal = hr.value || 0;

        if(secVal > 60) {
            min.value = parseInt(minVal) + 1;
            sec.value = parseInt(secVal) - 60
        } else if(minVal > 60) {
            hr.value = parseInt(hrVal) + 1;
            min.value = parseInt(minVal) - 60;
        }
    }

})();
