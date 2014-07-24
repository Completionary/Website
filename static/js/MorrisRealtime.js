// This is a simple wrapper around morrisjs (http://www.oesmith.co.uk/morris.js)
// To change the way it gets the realtime data, just call the `pushData`
// with the number you want to add to the current interval.
// Let's say the graph updates itself every second. After 200ms 3 requests
// occured to the api. The socket then transmit the information of these
// requests. After another 800ms th graph will try to update itself.
// It pulls the number of requests that happend from the
// `getDataSinceLastInterval` function and shows the new data while clearing
// some of the old of the screen.
(function () {

  function MorrisRealtime (morrisOptions) {
    this._intervalId = null;
    this._intervalMS = 5000;
    this._bufferSize = 25;
    this._tempData = 0;
    this._data = [];
    for (var i = 0; i < this._bufferSize; i++) {
      this._data.push({ts: Date.now() - (this._intervalMS * i), requests: 0});
    };
    this._morris = new Morris.Area(morrisOptions);
  }

  MorrisRealtime.prototype.start = function () {
    if (this._intervalId) {
      console.warn('MorrisRealtime already started for the graph');
      return;
    }
    var self = this;
    function interval () {
      var newData = self.getDataSinceLastInterval();
      self._data.shift();
      self._data.push(newData);
      self._morris.setData(self._data);
    }
    interval();
    this._intervalId = window.setInterval(interval, this._intervalMS);
  };


  MorrisRealtime.prototype.stop = function () {
    if (!this._intervalId) {
      console.warn('MorrisRealtime did not start the interval for the \
        given graph');
      return;
    }
    window.clearInterval(this._intervalId);
    this._intervalId = null;
  }

  MorrisRealtime.prototype.getDataSinceLastInterval = function () {
    var t = this._tempData;
    this._tempData = 0;
    return {
      ts: Date.now(),
      requests: t
    };
  }

  MorrisRealtime.prototype.pushData = function (num) {
    this._tempData += !num ? 1 : num;
  }

  MorrisRealtime.prototype.testInterval = function () {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var randTime = getRandomInt(100, 1200);
    var self = this;
    this._debugTimeout = window.setTimeout(function () {
      self.pushData(getRandomInt(1, 4));
      self.testInterval();
    }, randTime)
  }

  window.MorrisRealtime = MorrisRealtime;
})();
