'use strict';

(function () {

  var makeSlider = function (controls, callback) {
    var slider = {
      line: controls.line,
      level: controls.level,
      pin: controls.pin,
      input: controls.input,
      minValuePosition: 0,
      maxValuePosition: 0,
      curentPosition: 0,
      getValue: function () {
        return Math.round(this.level.offsetWidth / this.line.offsetWidth * 100);
      },
      resetToDefault: function () {
        var leftPositon = this.line.getBoundingClientRect().left;
        var rightPositon = this.line.getBoundingClientRect().right;

        this.pin.style.left = rightPositon - leftPositon + 'px';
        this.level.style.width = rightPositon - leftPositon + 'px';
        this.input.value = this.getValue();
      },
      setStartValues: function (position) {
        this.minValuePosition = controls.line.getBoundingClientRect().left;
        this.maxValuePosition = controls.line.getBoundingClientRect().right;
        this.curentPosition = position;
        this.input.value = this.getValue();
      },
      updatePosition: function (newPosition) {
        if (newPosition < this.minValuePosition || newPosition > this.maxValuePosition) {
          return;
        }

        var shift = this.curentPosition - newPosition;
        this.curentPosition = newPosition;

        this.pin.style.left = (this.pin.offsetLeft - shift) + 'px';
        this.level.style.width = (this.level.offsetWidth - shift) + 'px';

        this.input.value = this.getValue();
      }
    };

    var onScalePinControlMousedown = function (evt) {
      evt.preventDefault();
      slider.setStartValues(evt.clientX, controls.line.getBoundingClientRect());

      var onScalePinControlMousemove = function (moveEvt) {
        moveEvt.preventDefault();
        slider.updatePosition(moveEvt.clientX);
        callback();
      };

      var onScalePinControlMouseup = function (upEvt) {
        upEvt.preventDefault();
        slider.updatePosition(upEvt.clientX);
        callback();

        document.removeEventListener('mousemove', onScalePinControlMousemove);
        document.removeEventListener('mouseup', onScalePinControlMouseup);
      };

      document.addEventListener('mousemove', onScalePinControlMousemove);
      document.addEventListener('mouseup', onScalePinControlMouseup);
    };

    slider.pin.addEventListener('mousedown', onScalePinControlMousedown);

    return slider;
  };

  window.makeSlider = makeSlider;
})();
