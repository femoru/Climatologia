moment.locale('es');
var config = {
  apiKey: "AIzaSyCPwYE23C9M0GoDvRPg6DIMad5aQ30uZjU",
  authDomain: "climatologia-f7724.firebaseapp.com",
  databaseURL: "https://climatologia-f7724.firebaseio.com",
  projectId: "climatologia-f7724",
  storageBucket: "",
  messagingSenderId: "284313377522"
};
firebase.initializeApp(config);

var medicionesRef = firebase.database().ref('mediciones');

var indexApp = new Vue({
  el:'#app',
  data:{},
  firebase:{
    mediciones:medicionesRef
  }
});
