var socket = io();

var config = {
    apiKey: "AIzaSyDXrdrk09dWo0GpF1pF9kqdODU3dZ3fDGU",
    authDomain: "xversusy-b971a.firebaseapp.com",
    databaseURL: "https://xversusy-b971a.firebaseio.com",
    projectId: "xversusy-b971a",
    storageBucket: "xversusy-b971a.appspot.com",
    messagingSenderId: "882747754299"
};
firebase.initializeApp(config);

var database = firebase.database();


socket.on('timer', function(data){
    document.getElementById('counter').innerHTML = data.x;
});

socket.on('imageSwapper', function(data){
    document.getElementById('img1').src = data.pic1;
    document.getElementById('img2').src = data.pic2;            
});
        
function voteX(){
    console.log("Vote x")    
    database.ref().child("CurrentX").child("votes").transaction(function(votes) {
        if (votes) {
          votes = votes + 1;
        }

        if(votes == 0) {
            votes = 1; 
        }
        return votes;
      });
}
       
function voteY(){
    
    console.log("vote y")
    //database.ref().child("timer").child("x").set(5);
    
   // database.ref().child("CurrentY").child("votes").set(5);
   // database.ref().child("CurrentY").child("name").set("test"); 
    database.ref().child("CurrentY").child("votes").transaction(function(votes) {
        if (votes) {
          votes = votes + 1;
        }

        if (votes == 0) {
            votes = 1; 
        }
        return votes;
      });
}

//set listener for x votes
database.ref().child("CurrentX").child("votes").on("value", function(snapshot){
    console.log(snapshot.val());
    document.getElementById("XVotes").innerHTML = "XVotes: " + snapshot.val();    
})


//set listener for y votes
database.ref().child("CurrentY").child("votes").on("value", function(snapshot){
    console.log(snapshot.val());
    document.getElementById("YVotes").innerHTML = "YVotes: " + snapshot.val();    
})