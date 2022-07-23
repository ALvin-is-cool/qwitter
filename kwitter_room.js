// firebase is a database. databse is where all datas are stored.
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
//ADD YOUR FIREBASE LINKS HERE
userName = localStorage.getItem("username");
document.getElementById("username").innerHTML = "Welcome " + userName + " !";
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("Room Name - " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;//document means html page,"."means inside
                  //End code
            });
      });
}
getData();
function logout() {
      window.location = "index.html";
      localStorage.removeItem("username");
localStorage.removeItem("room_name");
}
function addroom() {
      // funtion should allways have ()
      room_name = document.getElementById("room_name").value;//we are storing room name that we have enterd in the input box in a variable called room_name 
      localStorage.setItem("room_name", room_name);//we are storing data in local storage so that other pages can use this room name
      firebase.database().ref("/").child(room_name).update({ //we are creating a child(sub folder) in database
            purpose: "adding room name"//data is stored in database in key : value format
      });//here key is purpose and value is adding room name

}
 function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}


















