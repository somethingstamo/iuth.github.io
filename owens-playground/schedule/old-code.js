
class Element {
    constructor() {

    }


}

class Time {
    constructor(hour, minute, AMPM) {
        this.hour = hour
        this.minute = minute
        this.ampm = AMPM
    }
}
function getTime(string_format) {
    string_format = string_format.split(":")
    minute = ""
    ampm = ""
    for(let i = 0; i < string_format[1].length; i++) {
        if(isNaN(string_format[1][i])) {
            ampm += string_format[1][i]
        } else {
            minute += string_format[1][i]
        }
    }
    hour = parseInt(string_format[0])
    minute = parseInt(minute)
    ampm.toLowerCase()
    if(ampm === "a" || ampm === "") {
        ampm = "am"
    } else if (ampm === "p") {
        ampm = "pm"
    }

    return new Time(hour, minute, ampm)
}
 
class Period {
    constructor(display_name, teacher) {
        this.display_name = display_name
        this.teacher = teacher
    }
}

class Class {
    constructor(period_number, start_time) {
        this.period_number = period_number
        this.start_time = start_time
    }
}

// Periods array starts at index 1
periods = {
    1: new Period("Free Period", false),
    2: new Period("Chemistry", "Mr. Davis"),
    3: new Period("Euro History", "Ms. Cesena"),
    4: new Period("English", "Ms. McCann"),
    5: new Period("Programming", "Mr. Klackle"),
    6: new Period("Calculus", "Mr. Karditzas"),
    7: new Period("Spanish III", "Sr. Allen"),
    nucleus: new Period("Nucleus", "Ms. Cesena"),
    break: new Period("Break", false),
    lunch: new Period("Lunch", false),
    passing: new Period(false, false),
    end: new Period(false, false )
}
console.log(periods[1])

function gc(period_number, start_time) {
    return new Class(period_number, getTime(start_time))
}

schedule = {
    mon: [gc(1, "8:00a"), gc("break", "8:45a"), gc(3, "9:00a"), gc("passing", "10:25a"), gc(5, "10:30a"), 
          gc("lunch", "11:55a"), gc("nucleus", "12:30p"), gc("passing", "1:45p"), gc(7, "1:50p"), gc("end", "3:15p")],

    tue: [gc(1, "8:00a"), gc("break", "8:45a"), gc(2, "9:00a"), gc("passing", "10:25a"), gc(4, "10:30a"), 
          gc("lunch", "11:55a"), gc(6, "12:30p"), gc("end", "3:15p")],

    wed: [gc(1, "8:00a"), gc("break", "8:45a"), gc(3, "9:00a"), gc("passing", "10:25a"), gc(5, "10:30a"), 
          gc("lunch", "11:55a"), gc("nucleus", "12:30p"), gc("passing", "1:45p"), gc(7, "1:50p"), gc("end", "3:15p")],
          
    thu: [gc(1, "8:00a"), gc("break", "8:45a"), gc(2, "9:00a"), gc("passing", "10:25a"), gc(4, "10:30a"), 
          gc("lunch", "11:55a"), gc("nucleus", "12:30p"), gc("passing", "1:45p"), gc(6, "1:50p"), gc("end", "3:15p")],

    fri: [gc(1, "8:00a"), gc("break", "8:45"), gc(2, "9:00a"), gc("passing", "9:50a"), gc(3, "9:55a"), gc("passing", "10:45a"), gc(4, "10:50a"), gc("lunch", "11:40"),
          gc("passing", "12:10p"), gc(5, "12:15p"), gc("passing", "1:05p"), gc(6, "1:10p"), gc("passing", "2:00p"), gc(7, "2:05p"), gc("end", "2:55p")]
}
console.log(schedule)

// Make an editor like:
// M  T  W  