// Simple wrapper for displaying a chaning status bar in bootstrap.
(function () {

    // Constructor.
    // options Object:
    //   - element  The progress bar id
    //   - max      The max number of requests allowed for this endpoint
    //   - current  The current number of requests already queried at this endpoint
    //   - green    The percentage for displaying a green bar
    //   - yellow   The percentage for displaying a yellow bar
    function RealtimeCallsLeft(options) {
        this._id = options.element;
        this._element = $('#'+this._id);
        this._bar = $(this._element.children()[0]);
        this._max = options.max || 100;
        this.current = options.current || 0;
        this._percentage = 0;
        this._switches = {
            green: options.green || 75,
            yellow: options.yellow || 90
        };
        this.update();
        return this;
    };

    RealtimeCallsLeft.prototype.update = function() {
        this._percentage = Math.floor(this.current / this._max * 100);
        this._percentage = Math.min(this._percentage, 100);
        if (this._percentage <= this._switches.green) {
            this._bar.attr('class', 'progress-bar progress-bar-success');
        } else if (this._percentage <= this._switches.yellow) {
            this._bar.attr('class', 'progress-bar progress-bar-warning');
        } else {
            this._bar.attr('class', 'progress-bar progress-bar-danger');
        }
        this._bar.css('width', this._percentage+'%');
        this._bar.attr('aria-valuenow', this._percentage);
        this._bar.text(this._percentage+'%');
    };

    RealtimeCallsLeft.prototype.testInterval = function () {
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
        var randTime = getRandomInt(100, 200);
        var self = this;
        this._debugTimeout = window.setTimeout(function () {
          self.current++;
          self.update();
          self.testInterval();
        }, randTime)
    };

    window.RealtimeCallsLeft = RealtimeCallsLeft;
})();
