function adjustTime(whichTime, amount) {
  console.log('adjustTime: ' + whichTime + ' by: ' + amount);
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
