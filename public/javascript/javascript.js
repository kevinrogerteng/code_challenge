//main file for index.html
function submitForm(){
  hideWidgetConfig();
  var inputs = document.getElementById("imageForm").children, imagePlaceholder =[];
  for(var i = 0; i < inputs.length; i++){
    if(inputs[i].value !== undefined && inputs[i].value !== ""){
      imagePlaceholder.push({id: imagePlaceholder.length + 1, image: inputs[i].value});
    }
  };
  if (document.querySelector('input[name="widgetMode"]:checked').value === "thumbnail"){
    thumbnailMode(imagePlaceholder);
  } else{
    singleMode(imagePlaceholder);
    };
};

function sample(){
    var imagePlaceholder = [
        {id: 1, image: 'https://s3.amazonaws.com/ooomf-com-files/ikZyw45kT4m16vHkHe7u_9647713235_29ce0305d2_o.jpg'},
        {id: 2, image: 'https://s3.amazonaws.com/ooomf-com-files/74xDBSTTjJdmPG76VpZw_2.JPG'},
        {id: 3, image: 'https://s3.amazonaws.com/ooomf-com-files/wkjFpgTwSPnxksbAxnkA_IMG_5192.jpg'},
        {id: 4, image: 'https://s3.amazonaws.com/ooomf-com-files/BIR62RGGjGxN5nrbnzwu_3.jpg'},
        {id: 5, image: 'https://s3.amazonaws.com/ooomf-com-files/hKViPxgDRGuiGns6wv5S_IMG_5317.jpeg'},
        {id: 6, image: 'https://s3.amazonaws.com/ooomf-com-files/4ALUVYYlQLC004zkGhd9_Sunset%20at%20Windermere.jpg'}
      ];
    //make array of images into strings using JSON stringify
    var imagesStringed = JSON.stringify(imagePlaceholder);
    //parse imagesStringed to make it into a JSON object
    var images = JSON.parse(imagesStringed);
    hideWidgetConfig();

    if (document.querySelector('input[name="widgetMode"]:checked').value === "thumbnail"){
      thumbnailMode(imagePlaceholder);
    } else{
      singleMode(imagePlaceholder);
      };
}

function addField(){
  var form = document.getElementById("imageForm");
  var newInput = document.createElement("input");
  var br = document.createElement("br");
  newInput.name = "imageField";
  newInput.placeholder = "Paste URL of image";
  form.appendChild(newInput);
  form.appendChild(br);
};

function thumbnailMode(images){
  //on initialize we want to set a current image by inserting
  //the new image element into the div main, I want to make sure it 
  //is added before the buttons
  document.getElementById("containerThumbnail").style.display = "block";
  var mainImageThumbnail = document.getElementById('mainImageThumbnail');
  mainImageThumbnail.appendChild(setCurrentImage(images));
  //list all images onto the scrollablefilm strip
  images.forEach(function(el, index){
    var list = document.createElement("li");
    list.id = el.id
    list.onclick = function(){
      var currentImage = grabCurrentImage(mainImageThumbnail);
      currentImage.src = this.firstChild.src;
      currentImage.id = this.id;
      }
    var image = document.createElement("img");
    image.setAttribute("src", el.image);
    list.appendChild(image);
    document.getElementById('imageList').appendChild(list);
  });

  //create two buttons one for next and the other for previous

  var mainButtons = document.getElementById("mainButtons");
  var nextButton = document.createElement("button");
  nextButton.onclick = function(){
    var currentImage = grabCurrentImage(mainImageThumbnail);
    var currentImageIndex = grabCurrentImageIndex(currentImage, images);
    var nextImageObject = images[currentImageIndex +1];
    if (currentImageIndex == images.length-1){
      currentImage.id = images[0].id;
      currentImage.src = images[0].image;
    } else {
      currentImage.id = nextImageObject.id;
      currentImage.src = nextImageObject.image;
    }
  };
  nextButton.innerText = "Next";

  var prevButton = document.createElement("button");
  prevButton.onclick = function(){
    var currentImage = grabCurrentImage(mainImageThumbnail);
    var currentImageIndex = grabCurrentImageIndex(currentImage, images);
    var prevImageObject = images[currentImageIndex -1];
    if (currentImageIndex == 0){
      currentImage.id = images[images.length-1].id;
      currentImage.src = images[images.length-1].image;

    } else {
      currentImage.id = prevImageObject.id;
      currentImage.src = prevImageObject.image;
    };
  };
  prevButton.innerText = "Previous"
  mainButtons.appendChild(prevButton);
  mainButtons.appendChild(nextButton);

};

function singleMode(images){
  document.getElementById("containerSingle").style.display = "block";
  var mainImageSingle = document.getElementById('mainImageSingle');
  mainImageSingle.appendChild(setCurrentImage(images));
  mainImageSingle.firstElementChild.onclick = function(){
    var currentImage = grabCurrentImage(mainImageSingle);
    var currentImageIndex = grabCurrentImageIndex(currentImage, images);
    var nextImageObject = images[currentImageIndex +1];
    if (currentImageIndex == images.length-1){
      currentImage.id = images[0].id;
      currentImage.src = images[0].image;
    } else {
      currentImage.id = nextImageObject.id;
      currentImage.src = nextImageObject.image;
    };
  }
};

//utility section 
//create a function to set currentImage upon load

function hideWidgetConfig (){
  document.getElementById('configureWidget').style.display = "none";
};

function setCurrentImage(images){
  var onLoadcurrentImage = document.createElement("img"); 
  onLoadcurrentImage.setAttribute("src", images[0].image);
  onLoadcurrentImage.setAttribute("id", images[0].id);
  return onLoadcurrentImage;
};

//create a function to grab currentImage element
function grabCurrentImage(mode){
  var image = mode.firstElementChild;
  return image;
};

//create a function to grab index of currentImage
function grabCurrentImageIndex(currentImage, images){
  var imageIndex = images.map(function(image) {return image.id}).indexOf(parseInt(currentImage.id));
  return imageIndex;
};


