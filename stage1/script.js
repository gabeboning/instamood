$(document).ready(function() {
  var token = window.location.hash;
  // Hard coding so it will work in the stage1 directory.
  var token = "#access_token=35772159.178d9be.551bc4977f874decb00c600b12b68e46";
  if (!token) {
    window.location.replace("./login.html");
  }
  token = token.replace("#", "?"); // Ready for query param.
  var API_BASE_URL = "https://api.instagram.com/v1";
  var path = "/users/self/media/recent";
  var mediaUrl = API_BASE_URL + path + token;
  $.ajax({
    url: mediaUrl,
    dataType: "jsonp",
    success: function(response) {
      showPictures(response.data);
    }
  });
});

function showPictures(data) {
  console.log(data);
  $("#list").html("");
  for (var i=0; i<data.length; i++) {
    var picData = data[i];
    var postDiv = $("<div></div>");
    postDiv.addClass("post");
    var img = $("<img />")
    img.attr("src", picData.images.standard_resolution.url);
    var caption = $("<p></p>");
    caption.addClass("caption");
    caption.html(picData.caption.text);
    postDiv.append(img).append(caption);
    $("#list").append(postDiv);
  }
}