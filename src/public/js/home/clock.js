const newTime = document.getElementById('clock');
    
    function watch() {
        const Time = new Date(); 
        const year = Time.getFullYear(); 
        const month = Time.getMonth() + 1; 
        const date = Time.getDate(); 
        const day = Time.getDay(); 
        const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)']; 
        const hours = Time.getHours(); 
        const minutes = Time.getMinutes(); 
        const seconds = Time.getSeconds(); 

        newTime.innerHTML = year + '년 ' + zero(month) + '월 ' + zero(date) + '일 ' + week[day] + '<br>' + zero(hours) + '시 ' + zero(minutes) + '분 ' + zero(seconds) + '초 ';
    }

    function zero(num) {
        if(num < 10) {
            num = '0' + num;
        }
        return num;
    }

    function init() {
        watch();
        setInterval(watch, 1000);
    }

    init();