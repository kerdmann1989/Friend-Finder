// var path = require("path");
// var friends = require("../app/data/friends");

// module.exports = function(app) {
//     app.get("/api/friends", function (req, res) {
//         res.json(friends);
//     });


//     app.post("/api/friends", function (req, res) {
//     //    res.json(friends);
//       var newFriendScore = req.body.scores;
//       var scoresArray = [];
//       var friendCount = 0;
//       var bestMatch = 0;

//       for(var i=0; i<friends.length; i++) {
//           var scoresDiff = 0;
//           for (var j=0; i<newFriendScore.length; j++) {
//               scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScore) ))
//           }
//           scoresArray.push(scoresDiff);
//       }

//       for (var i=0; i < scoresArray.length; i++) {
//           if(scoresArray[i] <= scoresArray[bestMatch]) {

//           }
//       }

//       var bff = friends[bestMatch];
//       res.json(bff);
//       friends.push(req.body);
//     });
// };
    //    var userData = req.body;
    //    var userResponses = userData.scores

    //    for (var i=0; i<friends.length; i++) {
    //     var sum = 0;
    //     // console.log("hey the outer object i'm on is " + friends[i])
    //     for (var j = 0; j<friends[i].scores.length; j++){
    //     sum += parseInt(friends[i].scores[j]);
    //   }
      
    //   console.log(sum);
    // }

//     var bestMatch = {
//         name: "",
//         photo: "",
//         friendDifference: Infinity
//       };
  
//       // Here we take the result of the user"s survey POST and parse it.
//       var userData = req.body;
//       var userScores = userData.scores;
  
//       // This variable will calculate the difference between the user"s scores and the scores of
//       // each user in the database
//       var totalDifference;
  
//       // Here we loop through all the friend possibilities in the database.
//       for (var i = 0; i < friends.length; i++) {
//         var currentFriend = friends[i];
//         totalDifference = 0;
  
//         console.log(currentFriend.name);
  
//         // We then loop through all the scores of each friend
//         for (var j = 0; j < currentFriend.scores.length; j++) {
//           var currentFriendScore = currentFriend.scores[j];
//           var currentUserScore = userScores[j];
  
//           // We calculate the difference between the scores and sum them into the totalDifference
//           totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
//         }
  
//         // If the sum of differences is less then the differences of the current "best match"
//         if (totalDifference <= bestMatch.friendDifference) {
//           // Reset the bestMatch to be the new friend.
//           bestMatch.name = currentFriend.name;
//           bestMatch.photo = currentFriend.photo;
//           bestMatch.friendDifference = totalDifference;
//         }
//       }
  
//       // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
//       // the database will always return that the user is the user's best friend).
//       friends.push(userData);
  
//       // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
//       res.json(bestMatch);
//     });

// };


var friendList = require('../app/data/friends.js');

module.exports = function(app){
  //a GET route that displays JSON of all possible friends
  app.get('/api/friends', function(req,res){
    res.json(friendList);
  });

  app.post('/api/friends', function(req,res){
    //grabs the new friend's scores to compare with friends in friendList array
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    //runs through all current friends in list
    for(var i=0; i<friendList.length; i++){
      var scoresDiff = 0;
      //run through scores to compare friends
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //push results into scoresArray
      scoresArray.push(scoresDiff);
    }

    //after all friends are compared, find best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var bff = friendList[bestMatch];
    res.json(bff);
console.log(bff);
    //pushes new submission into the friendsList array
    friendList.push(req.body);
  });
};