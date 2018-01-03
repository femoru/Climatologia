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

Vue.component("line-chart", {
  extends: VueChartJs.Line,
  props: ["data", 'labels'],
  mounted() {
    this.renderLineChart();
  },
  computed: {
    tempData: function() {
      return this.data.map(a => a.data.T)
    },
    presionData: function() {
      return this.data.map(a => a.data.P)
    },
    altitudData: function() {
      return this.data.map(a => a.data.A)
    },
    humedadData: function() {
      return this.data.map(a => a.data.h)
    },
    lluviaData: function() {
      return this.data.map(a => a.data.ag)
    },
    chartData: function() {
      return this.data;
    },
    chartLabel: function() {
      return this.labels;
    }
  },
  methods: {
    renderLineChart: function() {
      this.renderChart({
        labels: this.chartLabel,
        datasets: [{
          label: 'Temperatura',
          backgroundColor: '#121255',
          borderColor: '#121255',
          data: this.tempData,
          fill: false,
          yAxisID: 'y-axis-1'
        }, {
          label: 'Presion',
          backgroundColor: '#874284',
          borderColor: '#874284',
          data: this.presionData,
          fill: false,
          yAxisID: 'y-axis-2'
        }, {
          label: 'Altitud',
          backgroundColor: '#FFF785',
          borderColor: '#FFF785',
          data: this.altitudData,
          fill: false,
          yAxisID: 'y-axis-2'
        }, {
          label: 'Humedad',
          backgroundColor: '#75FFBA',
          borderColor: '#75FFBA',
          data: this.humedadData,
          fill: false,
          yAxisID: 'y-axis-4'
        }, {
          label: 'Nivel de lluvia',
          backgroundColor: '#4381FF',
          borderColor: '#4381FF',
          data: this.lluviaData,
          fill: false,
          yAxisID: 'y-axis-5'
        }]
      }, {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: true
        },
        scales: {
          yAxes: [{
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "left",
              id: "y-axis-1",
            },
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "right",
              id: "y-axis-2",
            },
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "right",
              id: "y-axis-4",
            },
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "right",
              id: "y-axis-5",
            }
          ],
        }

      });
    }
  },
  watch: {
    data: function() {
      //this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    }
  }
});
medicionesRef.on('value', snap => {
  var tempData = [],
    tempLabels = [];
  var meds = snap.val();
  for (var med in meds) {
    tempData.push(meds[med].y);
    tempLabels.push(moment(meds[med].x).format('DD/MM h:mm:ss'));
  }
  indexApp.dataChart = tempData;
  indexApp.labels = tempLabels;
});

var indexApp = new Vue({
  el: '#app',
  data: {
    labels: [],
    dataChart: []
  },

  firebase: {
    mediciones: medicionesRef
  }
});
