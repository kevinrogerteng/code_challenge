//utility section 

function imagePlaceholder (){
   var imagePlaceholder = [
        {id: 1, image: 'https://s3.amazonaws.com/ooomf-com-files/ikZyw45kT4m16vHkHe7u_9647713235_29ce0305d2_o.jpg'},
        {id: 2, image: 'https://s3.amazonaws.com/ooomf-com-files/74xDBSTTjJdmPG76VpZw_2.JPG'},
        {id: 3, image: 'https://s3.amazonaws.com/ooomf-com-files/wkjFpgTwSPnxksbAxnkA_IMG_5192.jpg'},
        {id: 4, image: 'https://s3.amazonaws.com/ooomf-com-files/BIR62RGGjGxN5nrbnzwu_3.jpg'},
        {id: 5, image: 'https://s3.amazonaws.com/ooomf-com-files/hKViPxgDRGuiGns6wv5S_IMG_5317.jpeg'},
        {id: 6, image: 'https://s3.amazonaws.com/ooomf-com-files/4ALUVYYlQLC004zkGhd9_Sunset%20at%20Windermere.jpg'},
        {id: 7, image: 'http://i.imgur.com/yfrXMKY.jpg'},
        {id: 8, image: 'http://i.imgur.com/asYkywf.jpg'},
        {id: 9, image: 'http://i.imgur.com/HNbUooJ.jpg'},
        {id: 10, image: 'http://i.imgur.com/srmyqVk.jpg'},
        {id: 11, image: 'http://i.imgur.com/58juVt9.jpg'},
        {id: 12, image: 'http://i.imgur.com/UjEFYj1.jpg'},
        {id: 13, image: 'http://i.imgur.com/FZS1Ycd.jpg'},
        {id:14, image: 'http://i.imgur.com/5HcjHTD.jpg'},
        {id:15, image: 'http://i.imgur.com/4Gftgvd.png'}
      ];

    return imagePlaceholder;
};

function checkAll (){
  var listedImage = document.getElementsByClassName('listedImage')
  for(var i = 0; i < listedImage.length; i++){
    listedImage[i].firstChild.checked = "checked";
  };
};

//hide widget when on submit

function hideWidgetConfig (){
  document.getElementById('configureWidget').style.display = "none";
};

//add more fields for #imageForm
function addField(){
  var form = document.getElementById("imageForm");
  var newInput = document.createElement("input");
  var br = document.createElement("br");
  newInput.name = "imageField";
  newInput.placeholder = "Paste URL of image";
  form.appendChild(newInput);
  form.appendChild(br);
};

//function to set currentImage upon load of chosen mode

function setCurrentImage(images){
  var onLoadcurrentImage = document.createElement("img"); 
  onLoadcurrentImage.setAttribute("src", images[0].image);
  onLoadcurrentImage.setAttribute("id", images[0].id);
  return onLoadcurrentImage;
};

//function to grab currentImage element
function grabCurrentImage(mode){
  var image = mode.firstElementChild;
  return image;
};

//function to grab index of currentImage
function grabCurrentImageIndex(currentImage, images){
  var imageIndex = images.map(function(image) {return image.id}).indexOf(currentImage.id);
  return imageIndex;
};

//function for nextImage
function nextImage (element, images){
  
  var currentImage = grabCurrentImage(element);
  var currentImageIndex = grabCurrentImageIndex(currentImage, images);
  console.log(currentImageIndex);
  var nextImageObject = images[currentImageIndex +1];
  if (currentImageIndex == images.length-1){
    currentImage.id = images[0].id;
    currentImage.src = images[0].image;
  } else {
    currentImage.id = nextImageObject.id;
    currentImage.src = nextImageObject.image;
  }
};

//function for prevImage

function prevImage (element, images){
  var currentImage = grabCurrentImage(element);
    var currentImageIndex = grabCurrentImageIndex(currentImage, images);
    var prevImageObject = images[currentImageIndex -1];
    if (currentImageIndex == 0){
      currentImage.id = images[images.length-1].id;
      currentImage.src = images[images.length-1].image;

    } else {
      currentImage.id = prevImageObject.id;
      currentImage.src = prevImageObject.image;
    };
}