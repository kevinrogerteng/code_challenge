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
  var currentImage = document.createElement("img"); 
  currentImage.setAttribute("src", images[0].image);
  currentImage.setAttribute("id", images[0].id);
  var prevButton = document.getElementById('prevButton');
  var parentDiv = prevButton.parentNode;
  parentDiv.insertBefore(currentImage, prevButton);

  //next thing is to list all images onto the scrollablefilm strip
  images.forEach(function(el, index){
    var list = document.createElement("li");
    list.setAttribute("id", el.id);
    var image = document.createElement("img");
    image.setAttribute("src", el.image);
    list.appendChild(image);
    document.getElementById('imageList').appendChild(list);
  });

};

function nextImage(){
    var currentImage = document.getElementById("main");
    console.log(currentImage.getElementsByTagName("img")[0].id);
};
