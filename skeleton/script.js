var API_BASE_URL = "https://api.instagram.com/v1";
var recentMediaPath = "/users/self/media/recent";

$(document).ready(function() {
  var token = window.location.hash;
  if (!token) {
    window.location.replace("./login.html");
  }
  token = token.replace("#", "?"); // Prepare for query param.
  var mediaUrl = API_BASE_URL + recentMediaPath + token;

  $.ajax({
    url: mediaUrl,
    dataType: "jsonp",
    success: function(response) {
      // TODO: Process response
    }
  })
});