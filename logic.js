src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"

src="https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min.js"

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2oTtP6YbafB1zN8q3pTo3NJ7xkMFyb54",
    authDomain: "qdotclass-train-scheduler.firebaseapp.com",
    databaseURL: "https://qdotclass-train-scheduler.firebaseio.com",
    projectId: "qdotclass-train-scheduler",
    storageBucket: "",
    messagingSenderId: "1085198697643"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit-add").on("click", function(event){
    event.preventDefault();
		var newTrainName = $("#train-name").val();
		var newDestination = $("#destination").val();
		var newFirstTrainTime = $("#first-train-time").val();
		var newTrainFrequency = $("#train-frequency").val();

database.ref().push({
    trainName: newTrainName,
    destination: newDestination,
    firstTrainTime: newFirstTrainTime,
    trainFrequency: newTrainFrequency,
    dataAdded: firebase.database.ServerValue.TIMESTAMP
 

   });
});


database.ref("/").on("child_added", function(snapshot) {
var nextArrival = 0;
var convertedDate = moment(snapshot.val().firstTrainTime, "hh:mm");
var minutesPassed = (moment(convertedDate).diff(moment(), "minutes")*-1);
trainsPassed = Math.floor (minutesPassed/snapshot.val().trainFrequency);
incomingTrainNum = trainsPassed + 1;

minutesAway = (((snapshot.val().trainFrequency)*incomingTrainNum)-minutesPassed);

var nextArrival = moment().add(minutesAway, 'minutes').format('hh:mm A');

$("tbody").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");


 // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

