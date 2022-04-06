//This file reads totals.json and merges them into the overlay
var update_loop = 0;
var stored_change_ID = -1;

const cap_names = ["wingCap", "metalCap", "vanishCap"];

//update_ looks at the json and updates things. 
function update_() {



  var course_loop = 0;

  //runs through the 16 courses defined in json. course '16' is the holder for all the data of the castle secret stars + the data on the cap boxes
  while (course_loop < 16) {

    //runs through the stars in each course. if course '16' runs through it 15 times not 7 (7 for the 100 coin star)
    var star_loop = 1;
    var star_loop_count;

    if (course_loop == 15) { star_loop_count = 15; }
    else { star_loop_count = 7; }

    //if the star is 'gotten' makes it opaque, otherwise makes it mostly transparent
    while (star_loop <= star_loop_count) {
      var star_opacity_output;
      if (star_totals[course_loop]["stars"]["star".concat(star_loop)] == 1) {
        star_opacity_output = 1;
      }
      else {
        star_opacity_output = 0.2;
      }
      document.getElementById("s".concat(star_totals[course_loop]["courseID"], "-", star_loop)).style.opacity = star_opacity_output;
      star_loop++;
    }

    //updates all the coin counts for the 15 main courses
    if (course_loop < 15) {
      document.getElementById("c".concat(star_totals[course_loop]["courseID"])).innerHTML = star_totals[course_loop]["coinCount"]
    }

    //while course is '16', looks at the box values and updates those.
    if (course_loop == 15) {
      var cap_loop = 0;

      while (cap_loop < 3) {
        var cap_output;

        if (star_totals[course_loop]["capBoxes"][cap_names[cap_loop]] == 1) {
          cap_output = 1;
        }
        else {
          cap_output = 0.2;
        }
        document.getElementById(cap_names[cap_loop]).style.opacity = cap_output;
        cap_loop++;
      }

    }

    course_loop++;
  }
  //console.log(update_loop);
  //update_loop ++;
}

//this looks ate totals.json every 100 ms and updates it.
setInterval(

  function get_new_data() {
    fetch("./totals.json")
      .then(response => {
        return response.json();
      })
      .then(function (data) {
        changeID = data["changeID"]
        if (changeID != stored_change_ID) { //checks to make sure the data is new
          star_totals = data["totals_data"];
          update_();
          stored_change_ID = changeID; //updates the stored changeID in the active code so it doesn't run the code every time
        }
        //console.log(poke_data);
      });
  },

  100);