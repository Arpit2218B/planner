export const getDayIndex = (next = false) => {
    let d = new Date();
    let y = d.toLocaleDateString();
    if (next) {
        d.setDate(d.getDate() + 1)
        y = d.toLocaleDateString();
    }
    y = y.replaceAll('/', '-');
    return y;
}

export const getWeekIndex = (next = false) => {
    Date.prototype.getWeek = function() {
        var date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                              - 3 + (week1.getDay() + 6) % 7) / 7);
      }
      
    // Returns the four-digit year corresponding to the ISO week of the date.
    Date.prototype.getWeekYear = function() {
        var date = new Date(this.getTime());
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        return date.getFullYear();
    }
    let d = new Date();
    let y = d.getWeekYear();
    let w = d.getWeek();

    if(next) {
        w = w + 1;
        if(w > 52) {
            w = 1;
            y = y + 1;
        }
    }
    return `${y}${w}`;
}

// [
//     {
//         "task": "someTask",
//         "subtask": ["a", "b"]
//     },
//     {
//         "task": "someTask",
//         "subtask": ["a", "b"]
//     }
// ]