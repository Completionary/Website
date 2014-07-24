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
});
