//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyCeq3IhQTe905tQoN5tiHEbtVm6zDT0370",
      authDomain: "qwitter-45038.firebaseapp.com",
      databaseURL: "https://qwitter-45038-default-rtdb.firebaseio.com",
      projectId: "qwitter-45038",
      storageBucket: "qwitter-45038.appspot.com",
      messagingSenderId: "652376200875",
      appId: "1:652376200875:web:4a516f9349b5bc6a3989ee",
      measurementId: "G-ZBCMLES6XW"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        name_ = message_data['name']; // From the msg data we are extrating the name of the person and saveing it in the varablie. name_
                        message = message_data['message']; 
                        like = message_data['like'];
                        name_with_tag = "<h4> "+ name_ +"<img class='user_tick' src='tick.png'>";// we are creating html tags
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";//like button
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";//adds thumbs up
                        row = name_with_tag + message_with_tag +like_button + span_with_tag;//joining all the tags
                        document.getElementById("output").innerHTML += row;//we are dispalying all the tags such as name tags ect. in the row output element.
                        //End code
                  }
            });
      });
}
user_name = localStorage.getItem("username");
room_name = localStorage.getItem("room_name");
getData();
function send() {
      msg = document.getElementById("msg").value;//we are saving the message in the msg var
      firebase.database().ref(room_name).push(
            {
                  name: user_name,//this is adding username to the firebase
                  message: msg,
                  like: 0
            });
document.getElementById("msg").value="";//for clearing out the meassage box after sending a massage.



}
function logout(){
window.location= "index.html";
localStorage.removeItem("username");
localStorage.removeItem("room_name");
}
function updateLike(message_id){
      button_id = message_id; 
      likes = document.getElementById(button_id).value; //when every you click on the the like button it saves in the varable.
      updated_likes = Number(likes) + 1;//we are converting string"likes" into numbers
      firebase.database().ref(room_name).child(message_id).update
      ({ like : updated_likes });// we are updating the nuber of likes in teh fire base
}

