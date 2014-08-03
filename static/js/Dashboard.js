$(function () {
    var m = new MorrisRealtime({
        element: 'apiRequestsRealtime',
        data: [],
        xkey: 'ts',
        ykeys: ['requests'],
        labels: ['Requests'],
        ymin: 'auto',
        fillOpacity: 0.5
    });
    m.start();
    m.testInterval();

    var r = new RealtimeCallsLeft({
        element: 'apiCallsProgress',
        max: 1000,
        current: 100
    });
    r.testInterval();

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
});
