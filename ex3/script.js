document.addEventListener("DOMContentLoaded", function(event) {

const wsUri = "wss://echo.websocket.org/";

const output = document.querySelector('.chat-window');
const btnSend = document.querySelector('.btn-submit');
const btnMap = document.querySelector('.btn-geo');
const input = document.querySelector('.message-text');

const error = () => {
    let pre = document.createElement("div");
    pre.classList.add("chat","chat-error");
    pre.innerHTML = 'Невозможно получить ваше местоположение';
    output.prepend(pre);
}

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  let pre = document.createElement("div");
  pre.classList.add("chat","chat-map");
  pre.innerHTML = '<a href="https://www.openstreetmap.org/#map=18/'+latitude+'/'+longitude+'" target="_blank">Ссылка на карту</a>';
  output.prepend(pre);
}

btnMap.addEventListener('click', () => {
  if (!navigator.geolocation) {

    let pre = document.createElement("div");
    pre.classList.add("chat","chat-error");
    pre.innerHTML = 'Geolocation не поддерживается вашим браузером';
    output.prepend(pre);

    chatError.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});



let websocket;

function startWebSocket(){
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    // writeToScreen("CONNECTED");
  };
  websocket.onclose = function(evt) {
    // writeToScreen("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    let pre = document.createElement("div");
    pre.classList.add("chat","chat-answer");
    pre.innerHTML = evt.data;
    output.prepend(pre);
    
    // writeToScreen(
        
    //   '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
    // );
  };
  websocket.onerror = function(evt) {
    let pre = document.createElement("div");
    pre.classList.add("chat","chat-error");
    pre.innerHTML = evt.data;
    output.prepend(pre);
   
    // writeToScreen(
    //   '<span style="color: red;">ERROR:</span> ' + evt.data
    // );
  };
}

startWebSocket();


btnSend.addEventListener('click', () => {
  const message = input.value;
  if (message != ""){
  let pre = document.createElement("div");
    pre.classList.add("chat","chat-question");
    pre.innerHTML = message;
    output.prepend(pre);
    websocket.send(message);
  } else {
    let pre = document.createElement("div");
    pre.classList.add("chat","chat-error");
    pre.innerHTML = 'Вы ввели пустое сообщение';
    output.prepend(pre);
   }
});

})