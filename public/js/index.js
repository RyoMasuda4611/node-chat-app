var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (location) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>')
    a.attr('href', location.url);
    li.text(`${location.from}:`)
    li.append(a);
    jQuery('#messages').append(li);
  });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
      from: 'User',
      text:  jQuery('[name=message]').val()
    }, function () {
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation not support by your browser.')
  }
  navigator.geolocation.getCurrentPosition( function (position) {
    socket.emit('createLocationMessage', {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});

