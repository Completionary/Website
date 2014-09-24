$(function () {
    // SockJS
    var sock = new SockJS('/websocket');
    sock.onopen = function () {
      sock.send(window.ENDPOINT_ID);
      console.log('open');
    };
    sock.onmessage = function(e) {
      console.log('message', JSON.parse(e.data));
    };
    sock.onclose = function() {
      console.log('close');
    };

    // // API Chart
    // var apiChart = c3.generate({
    //   data: {
    //     columns: [
    //       ['used', 98]
    //     ],
    //     names: {
    //       'used': 'Used'
    //     },
    //     type : 'gauge'
    //   },
    //   color: {
    //     pattern: ['#2ecc71', '#e67e22', '#e74c3c'],
    //     threshold: {
    //       values: [60, 90, 100]
    //     }
    //   },
    //   bindto: '#apiChart'
    // });
});
