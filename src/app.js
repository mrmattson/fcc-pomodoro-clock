function adjustTime(timer, whichTime, amount) {
  var newTime = timer[whichTime] + amount;
  if (newTime < 1) {
    newTime = 1;
  }
  timer[whichTime] = newTime;

  updateDisplay(timer);
}

function startStopTimer(timer) {
  console.log('start/stop timer');
}

function updateDisplay(timer) {
  console.log(timer);

  document.querySelector('#ctrl-break-display').innerText = timer.break;
  document.querySelector('#ctrl-session-display').innerText = timer.session;

  var timerMin = "" + timer.runningTime.min;
  var timerSec = "";
  if (timer.runningTime.sec < 10) {
    timerSec += "0" + timer.runningTime.sec;
  } else {
    timerSec += timer.runningTime.sec;
  }
  document.querySelector('.ctrl-timer-countdown').innerText = timerMin + ":" + timerSec;
}


function autorun()
{
  var wrappedTimer = {
    break: 5,
    session:25,
    runningTime: {
      min: 25,
      sec: 0
    }
  };

  document.querySelector('#ctrl-break-adjust-minus').addEventListener('click', adjustTime.bind(this, wrappedTimer, 'break', -1));
  document.querySelector('#ctrl-break-adjust-plus').addEventListener('click', adjustTime.bind(this, wrappedTimer, 'break', 1));
  document.querySelector('#ctrl-session-adjust-minus').addEventListener('click', adjustTime.bind(this, wrappedTimer, 'session', -1));
  document.querySelector('#ctrl-session-adjust-plus').addEventListener('click', adjustTime.bind(this, wrappedTimer, 'session', 1));
  document.querySelector('.ctrl-start-stop').addEventListener('click', startStopTimer.bind(this, wrappedTimer));

  updateDisplay(wrappedTimer);
}

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
