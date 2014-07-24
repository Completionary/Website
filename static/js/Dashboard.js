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
    this.set('realtimeChart', m);
});
