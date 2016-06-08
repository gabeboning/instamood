var picList = $("#list");
var locList = $("#locations");
locList.hide();
picList.hide();

navigator.geolocation.getCurrentPosition(function(position) {
  $("#locmessage").text("Finding nearby locations...");
  getInstaLocationsByLatLng(position.coords.latitude, position.coords.longitude);
});

// when location selected, show pictures
$("#locations ol").on("click", "a", function(e) {
  e.preventDefault();
  
  var locId = $(this).parent().data("locId"); // id is attached to the parent <li>
  getInstaPicsByLocation(locId);
});

function getInstaLocationsByLatLng(lat, lng) {
  var path = "/locations/search";
  var mediaUrl = INSTA_API_BASE_URL + path + "?lat=" + lat + "&lng=" + lng + "&" + window.token;
  $.ajax({
    method: "GET",
    url: mediaUrl,
    dataType: "jsonp",
    success: function(response) {
      showLocations(response.data);
    }
  });
}

function getInstaPicsByLocation(locId) {
  var path = "/locations/"+locId+"/media/recent";
  var mediaUrl = INSTA_API_BASE_URL + path + "?" + window.token;
  $.ajax({
    method: "GET",
    url: mediaUrl,
    dataType: "jsonp",
    success: function(response) {
      showPictures(response.data);
    }
  });
}

function showLocations(locations) {
  $("#locmessage").hide();
  var list = $("#locations ol");
  list.html("");
  $.each(locations, function(i,l) {
    var locEl = $("<li><a href='#'></a></li>");
    locEl.addClass("loc");
    // Mark this as this with this ID so we can find it for sentiment analysis.
    locEl.data("locId", l.id); 
    locEl.find("a").html(l.name);
    list.append(locEl);
  });
  locList.show();
}