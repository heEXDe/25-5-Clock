function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "bDecr",











    () => {
      this.setState({ breakTime: this.state.breakTime <= 60 ? 60 : this.state.breakTime - 60 });
    });_defineProperty(this, "bIncr",

    () => {
      this.setState({ breakTime: this.state.breakTime >= 3600 ? 3600 : this.state.breakTime + 60 });
    });_defineProperty(this, "sDecr",

    () => {
      this.setState({ sessionTime: this.state.sessionTime <= 60 ? 60 : this.state.sessionTime - 60 });
    });_defineProperty(this, "sIncr",

    () => {
      this.setState({ sessionTime: this.state.sessionTime >= 3600 ? 3600 : this.state.sessionTime + 60 });
    });_defineProperty(this, "tick",



















    () => {
      if (this.state.currentTime > 0) {
        this.setState({ currentTime: this.state.currentTime - 1 });
      } else {
        // play audio
        document.getElementById("beep").play();
        // stop audio after 3 seconds
        setTimeout(() => {document.getElementById("beep").pause();}, 3000);
        // Switch currentlyRunning when time's up
        if (this.state.currentlyRunning === 'Session') {
          this.setState({ currentlyRunning: 'Break', currentTime: this.state.breakTime });
        } else {
          this.setState({ currentlyRunning: 'Session', currentTime: this.state.sessionTime });
        }
      }
    });_defineProperty(this, "componentDidUpdate",

    (prevProps, prevState) => {
      if (this.state.isRunning && !prevState.isRunning) {
        this.setState({ intervalId: setInterval(this.tick, 1000) }); // 1000ms = 1s
      } else if (!this.state.isRunning && prevState.isRunning) {
        clearInterval(this.state.intervalId);
        this.setState({ intervalId: null });
      }
    });_defineProperty(this, "componentWillUnmount",

    () => {
      if (this.state.intervalId) clearInterval(this.state.intervalId);
    });_defineProperty(this, "startOrpause",

    () => {
      this.setState({ isRunning: !this.state.isRunning });
      if (this.state.valuesAreDefault == true) {this.setState({ currentTime: this.state.sessionTime, valuesAreDefault: false });};
    });_defineProperty(this, "resetF",

    () => {
      document.getElementById("beep").pause();
      document.getElementById("beep").currentTime = 0;
      this.setState({ sessionTime: 1500, breakTime: 300, valuesAreDefault: true });
      this.setState({ isRunning: false, currentlyRunning: 'Session', currentTime: this.state.sessionTime });
      if (this.state.intervalId) clearInterval(this.state.intervalId);
      this.setState({ intervalId: null });
      // this.pauseTimer()
      // this.setState({ currentTime: 1500 });
      // clearInterval(this.intervalId);
    });_defineProperty(this, "formatTime",

    time => {
      return `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
    });this.state = { sessionTime: 1500, breakTime: 300, isRunning: false, currentTime: 1500, currentlyRunning: "Session", intervalId: null, valuesAreDefault: true };}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "clock" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("div", { id: "break-length" }, Math.floor(this.state.breakTime / 60)), /*#__PURE__*/
      React.createElement("div", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("div", { id: "session-length" }, Math.floor(this.state.sessionTime / 60)), /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.state.currentlyRunning), /*#__PURE__*/
      React.createElement("div", { id: "time-left" },
      this.state.isRunning == true ?
      this.formatTime(this.state.currentTime) :
      this.state.valuesAreDefault == true ?
      this.formatTime(this.state.sessionTime) :
      this.formatTime(this.state.currentTime)), /*#__PURE__*/

      React.createElement("button", { id: "break-decrement", onClick: this.bDecr }, "B-"), /*#__PURE__*/
      React.createElement("button", { id: "break-increment", onClick: this.bIncr }, "B+"), /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", onClick: this.sDecr }, "S-"), /*#__PURE__*/
      React.createElement("button", { id: "session-increment", onClick: this.sIncr }, "S+"), /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.startOrpause }, "\u25B6\u23F8"), /*#__PURE__*/
      React.createElement("button", { id: "reset", onClick: this.resetF }, "\u21BA"), /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "https://cdn.freesound.org/previews/266/266566_4900575-lq.mp3" }), /*#__PURE__*/
      React.createElement("br", null)));


  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));