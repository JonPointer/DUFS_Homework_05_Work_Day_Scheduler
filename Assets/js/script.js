
// Set time variables

$(document).ready(function () {

    var schedule = localStorage.getItem("schedule");

    var startTime = 9;
    var endTime = 17;
    var numSlots = endTime - startTime;
    var AMPM = "AM";

    function writeTimeSlot(timeSlot, enteredTime, enteredAMPM) {
        var textID = "text" + enteredTime + enteredAMPM;
        schedule[timeSlot] = document.getElementById(textID).textContent;
    }

    // Loop to add time rows and button event handlers
    for (i = 0; i <= numSlots; i++) {
        var time = i + startTime;
        if (time >= 12) {
            AMPM = "PM";
        }
        if (time > 12) {
            time = time - 12;
        }
        var tmpString = "row";
        var rowID = (tmpString.concat(time.toString())).concat(AMPM);
        $(".container").append("<div class='row' id=" + rowID + "><div");
        var rowPrefix = "#";
        var rowJQName = rowPrefix.concat(rowID);
        $(rowJQName).append("<div class='hour col-1 text-right pt-2'>" + time + " " + AMPM + " </div>");
        var textID = "text" + time + AMPM;
        $(rowJQName).append("<textarea type='text' id=" + textID + " class='future col-10'></textarea>");
        var buttonID = "button" + time + AMPM;
        $(rowJQName).append("<button class='btn saveBtn col-1' type='button' id=" + buttonID + "><i><span class='fas fa-save i'></span></i></button>");

        var buttonJQ = "#".concat(buttonID);
        $(buttonJQ).on('click', function () {
            console.log(this.id);
            // Call function to write data in that time slot
            writeTimeSlot(i, time, AMPM);
        });

    }

    // Check to see if the "schedule" variable exists - read it in and display if it does.
    if (schedule === null) {
        // There is no schedule in local memory, so build the blank structure
        for (i = 0; i < numSlots; i++) {
            schedule[i] = " ";
        }
        // This was first time, so save new array of TBD,0 to local storage
        localStorage.setItem("schedule", JSON.stringify(schedule));
    } else {
        // Schedule already existed in local storage, so read in and display
        schedule = JSON.parse(schedule);
        for (i = 0; i < numSlots; i++) {
            var time = i + startTime;
            if (time >= 12) {
                AMPM = "PM";
            }
            if (time > 12) {
                time = time - 12;
            }
            var textIDJQ = "#text" + time + AMPM;
            $(textIDJQ).text = schedule[i];
        }
    }







})

