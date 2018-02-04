var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('LT');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
      from: message.from,
      text: message.text,
      createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (location) {
    var formattedTime = moment(location.createdAt).format('LT');
    var template = jQuery('#location-message-template').html(); 
    // 文字型の引数のみ
    var html = Mustache.render(template, {
      from: location.from,
      url: location.url,
      createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]')
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextBox.val()
    }, function () {
        messageTextBox.val("");
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation not support by your browser.')
  }
  locationButton.attr('disabled', 'disabled').text("Sending location....");
  navigator.geolocation.getCurrentPosition( function (position) {
    locationButton.removeAttr('disabled').text("Send Location");
    socket.emit('createLocationMessage', {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text("Send Location");
    alert('Unable to fetch location.');
  });
});

