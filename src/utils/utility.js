export  function isNull(obj){
    if(obj != undefined || obj != null){
        return false;
    }else{
        return true;
    }
}
export function getFormatedDateString(timestamp,withTime){
    let d = new Date(timestamp);
    let formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    let hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    let minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    let formattedTime = hours + ":" + minutes;
    if(withTime){
        return formattedDate = formattedDate + " " + formattedTime;
    }else{
        return formattedDate = d.getDate() + "/" + (d.getMonth() + 1) ;
    }
}

export function getFormatedDate(timestamp){
    let d = new Date(timestamp);
    return new Date(d.getFullYear(), (d.getMonth()), d.getDate())
}

export function getDayFromDate(date){
    return date.getDate() + "/" + (date.getMonth() + 1)+ "/" +date.getFullYear()
}

export function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return parseFloat(minutes + "." + (seconds < 10 ? '0' : '') + seconds);
  }

export function getFormatedDateForKey(timestamp){
    let d = new Date(timestamp);
    return d.getFullYear()+"-"+ (d.getMonth() + 1)+"-"+d.getDate()
}

export function getTimeToDisplay(millisec) {
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "0";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    //if (hours != "") {
        return hours + ":" + minutes + ":" + seconds;
    //}
    //return minutes + ":" + seconds;
}

export function getDateFromString(time){
    let year = time.substring(0,time.indexOf('-'));
    let month = time.substring(time.indexOf('-')+1,time.lastIndexOf('-'));
    let date = time.substring(time.lastIndexOf('-')+1,time.length);
    console.log("year:"+year+",month:"+month+",date:"+date);
    return new Date(year,month-1,date)
}