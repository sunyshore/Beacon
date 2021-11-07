/* This is the java code for the survey portion of our website. Yay! */

// Get a reference to the button
let btn = document.getElementById("submit");

// Add an event handler for the click event
btn.addEventListener("click", myFunction);

function myFunction(){
    
}

// function to calculate the result of the survey
function tabulateAnswers() {
    // initialize variables for each choice's score
    // If you add more choices and outcomes, you must add another variable here.
    var total_score=0

    
    // get a list of the radio inputs on the page
    var choices = document.getElementsByTagName('input');
    // loop through all the radio inputs
    for (i=0; i<choices.length; i++) {
      // if the radio is checked..
      if (choices[i].checked) {
        // add to user's score
        if (choices[i].value == '1') {
            total_score = total_score + 0;
        }
        if (choices[i].value == '2') {
            total_score = total_score + 1;
        }
        if (choices[i].value == '3') {
            total_score = total_score + 2;
        }
        if (choices[i].value == '4') {
            total_score = total_score + 3;
        }
        else {
            total_score = total_score + 0;
        }
      }
    }
    
    // Display answer corresponding to that choice
    var answerbox = document.getElementById('answer');
    if (0<total_score<5) {
      answerbox.innerHTML = "Depression Severity: None/Minimal. Action: Patient may not need depression treatment.";
    }
    else if (5<total_score<10) {
      answerbox.innerHTML = "Depression Severity: Mild. Action: Use clinical judgment about treatment, based on patient’s duration of symptoms and functional impairment.";
    }
    else if (10<total_score<15) {
      answerbox.innerHTML = "Depression Severity: Moderate. Action: Use clinical judgment about treatment, based on patient’s duration of symptoms and functional impairment.";
    }
    else if (15<total_score<20) {
      answerbox.innerHTML = "Depression Severity: Moderately Severe. Action: Treat using antidepressants, psychotherapy or a combination of treatment.";
    }
    else if (20<total_score<30) {
      answerbox.innerHTML = "Depression Severity: Severe. Action: Treat using antidepressants with or without psychotherapy";
    }
  }
  
  // program the reset button
  function resetAnswer() {
    var answerbox = document.getElementById('answer');
    answerbox.innerHTML = "Your result will show up here!";
  }