var macRE = /^(([a-fA-F0-9][a-fA-F0-9]+[:]){5}([a-fA-F0-9][a-fA-F0-9]))/g;

var config = {
  apiKey: "AIzaSyCPwYE23C9M0GoDvRPg6DIMad5aQ30uZjU",
  authDomain: "climatologia-f7724.firebaseapp.com",
  databaseURL: "https://climatologia-f7724.firebaseio.com",
  projectId: "climatologia-f7724",
  storageBucket: "",
  messagingSenderId: "284313377522"
};
firebase.initializeApp(config);

var database = firebase.database();

var estacionesRef = database.ref('estaciones');
var medicionesRef = database.ref('mediciones');

// start appestaciones
var appEstaciones = new Vue({
  el: '#app',
  data: {
    nuevo: {
      nombre: '',
      mac: '',
      ubicacion: ''
    }
  },
  firebase: {
    estaciones: estacionesRef
  },
  computed: {
    validation: function() {
      return {
        name: !!this.nuevo.nombre.trim(),
        email: macRE.test(this.nuevo.mac)
      }
    },
    isValid: function() {
      var validation = this.validation
      return Object.keys(validation).every(function(key) {
        return validation[key]
      })
    }
  },
  methods: {
    registrar: function() {
      if (this.isValid) {
        estacionesRef.push(this.nuevo)
        this.nuevo = {
          nombre: '',
          mac: '',
          ubicacion: ''
        }
      }
    },
    borrar: function(estacion) {
      estacionesRef.child(estacion['.key']).remove();
    }
  }
})
