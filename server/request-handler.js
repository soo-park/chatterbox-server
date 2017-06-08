var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

// var messages = [{text: 'something', username: 'somethingelse', roomname: 'lobby'}];
var messages = [];

var requestHandler = function(request, response) {

  var statusCode;
  var headers = defaultCorsHeaders;

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  if (request.url === '/classes/messages' || request.url === '/') {
    if (request.method === 'GET') {
      statusCode = 200;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      var data = { results: messages };
      var body = JSON.stringify(data);
      response.end(body);
    } else if (request.method === 'POST') {

      statusCode = 201;
      response.writeHead(statusCode, headers);

      var message = '';
      request.on('data', function(data) {
        message += data;
      });
      
      request.on('end', function () {
        messages.push(JSON.parse(message));
      });

      response.end('Something');
    } else if (request.method === 'OPTIONS') {
      // log?
    } else {
      //asdf
    }
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('404: not found');
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
// module.exports = requestHandler;
exports.requestHandler = requestHandler;

