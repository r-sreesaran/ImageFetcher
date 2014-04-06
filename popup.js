
 var QUERY = 'default';
 var NO_OF_IMAGES=20;
 
var imageGenerator = {
 
  requestImages: function() {
    var req = new XMLHttpRequest();
    req.open("GET",'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=e5b89a320f9a5ee8c5a6c567de7a3a7a&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page='+NO_OF_IMAGES, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  
  showPhotos_: function (e) {
    var images = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < images.length; i++) {
      var a = document.createElement('a');
      a.setAttribute('class','fancybox-thumbs');
      a.setAttribute('data-fancybox-group','gallery');
      a.href = this.constructImagesURL_(images[i]);
      var img = document.createElement('img');
      img.src = this.constructImagesURL_(images[i]);
      img.setAttribute('alt', images[i].getAttribute('title'));
      a.appendChild(img)
      document.body.appendChild(a);
    }
  },

  
  constructImagesURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_c.jpg";
  }
};

document.addEventListener('DOMContentLoaded', function () {
 
 var button = document.getElementById("click1");
 button.addEventListener("click", function () {
  
  if($('div#child').length) {
  $('div').remove('#child');
 }
 if($('img').length) {
  $('img').remove();
 }
  QUERY = document.getElementById('search').value;
  NO_OF_IMAGES = document.getElementById('imagecount').value;
  if(QUERY!=='undefined'){
  
   imageGenerator.requestImages();
 }
 },false);
});
