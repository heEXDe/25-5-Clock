import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionTime: 1500,
      breakTime: 300,
      isRunning: false,
      currentTime: 1500,
      currentlyRunning: "Session",
      intervalId: null,
      valuesAreDefault: true
    }
  }
  
  bDecr = () => {
    this.setState({breakTime: this.state.breakTime <= 60 ? 60 : this.state.breakTime - 60});
  };
  
  bIncr = () => {
    this.setState({breakTime: this.state.breakTime >= 3600 ? 3600 : this.state.breakTime + 60});
  };
  
  sDecr = () => {
    this.setState({sessionTime: this.state.sessionTime <= 60 ? 60 : this.state.sessionTime - 60 });
  };
  
  sIncr = () => {
    this.setState({sessionTime: this.state.sessionTime >= 3600 ? 3600 : this.state.sessionTime + 60 });
  };
  
  /*
  startTimer = () => {
    this.setState({ isRunning: true });
    if(this.state.currentlyRunning == "session"){
      if(this.state.currentTime == 0){this.setState({ currentlyRunning: "break", currentTime:  this.state.breakTime});};
      if(this.state.currentTime == 1500){this.setState({ currentTime:  this.state.sessionTime});};
      if(this.state.currentTime > 0 && this.state.currentTime !== 1500){this.setState({ currentTime:  this.state.currentTime});};
      // this.intervalId = setInterval(() => this.setState({ currentTime: this.state.currentTime - 1 }), 1000);
    };
    if(this.state.currentlyRunning == "break"){
      if(this.state.currentTime == 0){this.setState({ currentlyRunning: "session",  currentTime:  this.state.sessionTime});};
      if(this.state.currentTime == 1500){this.setState({ currentTime:  this.state.breakTime});};
      if(this.state.currentTime > 0 && this.state.currentTime !== 1500){this.setState({ currentTime:  this.state.currentTime});};
      // this.intervalId = setInterval(() => this.setState({ currentTime: this.state.currentTime - 1 }), 1000);
    };
  };
  */
  
  tick = () => {
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
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.isRunning && !prevState.isRunning) {
      this.setState({ intervalId: setInterval(this.tick, 1000) }); // 1000ms = 1s
    } else if (!this.state.isRunning && prevState.isRunning) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: null });
    }
  }
  
  componentWillUnmount = () => {
    if (this.state.intervalId) clearInterval(this.state.intervalId);
  }
    
  startOrpause = () => {
    this.setState({ isRunning: !this.state.isRunning });
    if(this.state.valuesAreDefault == true){this.setState({ currentTime: this.state.sessionTime, valuesAreDefault: false });};
  };
  
  resetF = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState({ sessionTime: 1500, breakTime: 300, valuesAreDefault: true });
    this.setState({ isRunning: false, currentlyRunning: 'Session', currentTime: this.state.sessionTime });
    if (this.state.intervalId) clearInterval(this.state.intervalId);
    this.setState({ intervalId: null });
    // this.pauseTimer()
    // this.setState({ currentTime: 1500 });
    // clearInterval(this.intervalId);
  };
  
  formatTime = (time) => {
    return `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
  };
  
  render(){
    return (
    <div id={"clock"}>
        <div id="break-label">Break Length</div>
        <div id="break-length">{Math.floor(this.state.breakTime / 60)}</div>
        <div id="session-label">Session Length</div>
        <div id="session-length">{Math.floor(this.state.sessionTime / 60)}</div>
        <div id="timer-label">{this.state.currentlyRunning}</div>
        <div id="time-left">{
            this.state.isRunning == true ? 
            this.formatTime(this.state.currentTime) :
            this.state.valuesAreDefault == true ?
            this.formatTime(this.state.sessionTime) :
            this.formatTime(this.state.currentTime)
          }</div>
        <button id="break-decrement" onClick={this.bDecr}>B-</button>
        <button id="break-increment" onClick={this.bIncr}>B+</button>
        <button id="session-decrement" onClick={this.sDecr}>S-</button>
        <button id="session-increment" onClick={this.sIncr}>S+</button>
        <button id="start_stop" onClick={this.startOrpause}>&#9654;&#9208;</button>
        <button id="reset" onClick={this.resetF}>&#8634;</button>
        <audio id="beep" src="https://cdn.freesound.org/previews/266/266566_4900575-lq.mp3"></audio>
      <br />
    </div>
    );
  }
}
ReactDOM.render(<App/>,document.getElementById('root'));

