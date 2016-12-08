function adjustTime(whichTime, amount) {
  var currentTime = parseInt(document.querySelector('#ctrl-' + whichTime + '-display').innerText, 10);
  var newTime = currentTime + amount;

  if (newTime < 1) {
    newTime = 1;
  }

  document.querySelector('#ctrl-' + whichTime + '-display').innerText = newTime;
}


function autorun()
{
  document.querySelector('#ctrl-break-adjust-minus').addEventListener('click', adjustTime.bind(this, 'break', -1));
  document.querySelector('#ctrl-break-adjust-plus').addEventListener('click', adjustTime.bind(this, 'break', 1));
  document.querySelector('#ctrl-session-adjust-minus').addEventListener('click', adjustTime.bind(this, 'session', -1));
  document.querySelector('#ctrl-session-adjust-plus').addEventListener('click', adjustTime.bind(this, 'session', 1));
}

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
