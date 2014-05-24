var imagePlaceholder = [
    {id: 1, image: 'http://placekitten.com/500/400'},
    {id: 2, image: 'http://placekitten.com/200/200'},
    {id: 3, image: 'http://placekitten.com/200/300'}
  ];
//make array of images into strings using JSON stringify
var imagesStringed = JSON.stringify(imagePlaceholder);
//parse imagesStringed to make it into a JSON object
var images = JSON.parse(imagesStringed);

window.onload = function initialize(){
  //on initialize we want to set a current image by inserting
  //the new image element into the div main, I want to make sure it 
  //is added before the buttons
  var onLoadcurrentImage = document.createElement("img"); 
  onLoadcurrentImage.setAttribute("src", images[0].image);
  onLoadcurrentImage.setAttribute("id", images[0].id);
  var prevButton = document.getElementById('prevButton');
  var parentDiv = prevButton.parentNode;
  parentDiv.insertBefore(onLoadcurrentImage, prevButton);

  //list all images onto the scrollablefilm strip
  images.forEach(function(el, index){
    var list = document.createElement("li");
    list.id = el.id
    list.onclick = function(){
      var currentImage = grabCurrentImage();
      currentImage.src = this.firstChild.src;
      currentImage.id = this.id;
      }
    var image = document.createElement("img");
    image.setAttribute("src", el.image);
    list.appendChild(image);
    document.getElementById('imageList').appendChild(list);
  });

};

//create a function to grab currentImage element
function grabCurrentImage(){
  var image = document.getElementById("main").getElementsByTagName("img")[0];
  return image;
}

//create a function to grab index of currentImage
function grabCurrentImageIndex(currentImage){
  var imageIndex = images.map(function(image) {return image.id}).indexOf(parseInt(currentImage.id));
  return imageIndex;
}

function nextImage(){
  var currentImage = grabCurrentImage();
  var currentImageIndex = grabCurrentImageIndex(currentImage);
  var nextImageObject = images[currentImageIndex +1];
  if (currentImageIndex == images.length-1){
    currentImage.id = images[0].id;
    currentImage.src = images[0].image;
  } else {
    currentImage.id = nextImageObject.id;
    currentImage.src = nextImageObject.image;
  }

};

function prevImage(){
  var currentImage = grabCurrentImage();
  var currentImageIndex = grabCurrentImageIndex(currentImage);
  var prevImageObject = images[currentImageIndex -1];
  if (currentImageIndex == 0){
    currentImage.id = images[images.length-1].id;
    currentImage.src = images[images.length-1].image;

  } else {
    currentImage.id = prevImageObject.id;
    currentImage.src = prevImageObject.image;
  }
}


