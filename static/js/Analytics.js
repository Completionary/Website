/* global $ */
(function () {
  "use strict";
  var now =  Math.floor(Date.now()/1000);
  var areaChartData = [
    {
      label: "Queries",
      values: [ {time: now, y: 0} ]
    },
    {
      label: "Successfull",
      values: [ {time:now , y: 0} ]

    }
  ];
  var userData = [
    {
      label: "User",
      values: [{time:now,y:0}]
    }
  ];
  $(function () {
    var realtime = $("#realtimeChart").epoch({
      type: 'time.area',
      data: areaChartData,
      axes: ['left', 'bottom', 'right']
    });


    var realtimeUser = $("#realtimeUserChart").epoch({
      type: 'time.line',
      data: userData,
      axes: ['left', 'bottom', 'right']
    });

    function data() {
      var ts =  Math.floor(Date.now()/1000);
      realtime.push([{time: ts, y: Math.floor(Math.random() * 20) + 10}, {time: ts, y: Math.floor(Math.random() * 5) + 1}]);
      realtimeUser.push([{time: ts, y: Math.floor(Math.random() * 20) + 10}]);
      setTimeout(function () {
        data();
      }, 1000);
    }

    data();
  });
})();
