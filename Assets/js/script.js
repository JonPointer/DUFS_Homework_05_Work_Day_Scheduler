
$(document).ready(function () {

    // Display the current day at the top
    $("#currentDay").text(moment().format('dddd, MMMM Do'));
    var currentHour = parseInt(moment().format('H'));
    console.log(currentHour);

    // Set time variables

    var startTime = 9;
    var endTime = 17;
    var numSlots = endTime - startTime;
    var AMPM = "AM";

    // Since the schedule will always be 9-5, there will always be 9 time slots.  Therefor, the code will keep track of them and their values 
    // as timeSlot 0-8

    // The schedule array will hold the text of the 0-8 time slots
    var schedule = [];

    function writeTimeSlot(timeSlot) {
        console.log("Time Slot is " + timeSlot);
        // Need to get the number of the button passed.  Given an ID passed of "button#", this will always be the 6th position on the string
        var indexPos = timeSlot.substring(6);
        console.log(indexPos);
        var indexNum = parseInt(indexPos);
        console.log(indexNum);
        // Given this index, build the text ID and jQuery selector
        var textID = "text".concat(indexPos);
        var textJQName = "#".concat(textID);
        // Store the text from the specified text ID to the index position in the schedule array
        // ***  Console log the constructed jQuery selector.  This looks correct. 
        console.log(textJQName);
        // *** Now console log the content of that ID and nothing is displayed, it is an empty string.
        console.log($(textJQName).val());
        schedule[indexNum] = $(textJQName).val();
        // Now rewrite the schedule to storage
        localStorage.setItem("schedule", JSON.stringify(schedule));
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
        // Create a row in the container
        var rowID = "row".concat(i);
        var rowJQName = "#".concat(rowID);
        $(".container").append("<div class='row' id=" + rowID + "><div");
        // Now append the time text to that row
        $(rowJQName).append("<div class='hour col-1 text-right pt-2'>" + time + " " + AMPM + " </div>");
        // Now append a text box to that row after the time text
        var textID = "text".concat(i);
        $(rowJQName).append("<textarea type='text' id=" + textID + " class='future col-10'></textarea>");
        // And, lastly, append a button to the row.
        var buttonID = "button".concat(i);
        var buttonJQName = "#".concat(buttonID);
        $(rowJQName).append("<button class='btn saveBtn col-1' type='button' id=" + buttonID + "><i><span class='fas fa-save i'></span></i></button>");

        // Now create an on click event for each button
        $(buttonJQName).on('click', function () {
            // console.log(this.id);
            // Call function to write data in that time slot
            // writeTimeSlot(i, time, AMPM);
            writeTimeSlot(this.id);
        });

    }

    // Check to see if the "schedule" variable exists - read it in and display if it does.

    schedule = localStorage.getItem("schedule");

    if (schedule === null) {
        // There is no schedule in local memory, so build the blank structure
        schedule = [];
        for (i = 0; i <= numSlots; i++) {
            schedule[i] = " ";
        }
        // This was first time, so save new array of TBD,0 to local storage
        localStorage.setItem("schedule", JSON.stringify(schedule));
    } else {
        // Schedule already existed in local storage, so read in and display
        schedule = JSON.parse(schedule);
        for (i = 0; i <= numSlots; i++) {
            // Given this index, build the text ID and jQuery selector
            var textID = "text".concat(i);
            var textJQName = "#".concat(textID);
            // Write this schedule index to it's text box
            $(textJQName).text(schedule[i]);
        }
    }
})

