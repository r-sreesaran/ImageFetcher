
 var QUERY = 'default';
 var NO_OF_IMAGES=20;
 
var kittenGenerator = {
 
  requestKittens: function() {
    var req = new XMLHttpRequest();
    req.open("GET",'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page='+NO_OF_IMAGES, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  
  showPhotos_: function (e) {
    var kittens = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < kittens.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructKittenURL_(kittens[i]);
      img.setAttribute('alt', kittens[i].getAttribute('title'));
      var div = document.createElement('div');
      div.setAttribute("id","child");
      div.appendChild(img);
      document.body.appendChild(div);
    }
  },

  
  constructKittenURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
  }
};

document.addEventListener('DOMContentLoaded', function () {
 
 var button = document.getElementById("click1");
 button.addEventListener("click", function () {
  
  if($('div#child').length) {
  $('div').remove('#child');
 }
  QUERY = document.getElementById('search').value;
  NO_OF_IMAGES = document.getElementById('imagecount').value;
  if(QUERY!=='undefined'){
  
   kittenGenerator.requestKittens();
 }
 },false);
});
