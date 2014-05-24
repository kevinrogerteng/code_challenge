//main file for index.html

window.onload = function (){
  var images = imagePlaceholder();
  var imageList = document.getElementById("imageSelection");
  for(var i = 0; i < images.length; i++){
    var div = document.createElement("div");
    div.className = "listedImage";
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.name = "selectedImage";
    input.value = images[i].id;
    input.className = "checkbox"
    var img = document.createElement('img');
    img.src = images[i].image;
    img.onclick = function(){
      if (this.parentNode.firstChild.checked){
        this.parentNode.firstChild.checked = false;
      } else {
        this.parentNode.firstChild.checked = true;
      }
    };
    imageList.appendChild(div);
    div.appendChild(input);
    div.appendChild(img);
  }
};


//submit form with URL images
function submitForm(){
  hideWidgetConfig();
  var imagePlaceholder = [];
  var listedImage = document.getElementsByClassName('listedImage');
  for(var i = 0; i < listedImage.length; i++){
    if (listedImage[i].firstChild.checked){
      imagePlaceholder.push({id: listedImage[i].firstChild.value, image: listedImage[i].lastChild.src});
    }
  };
  
  if (document.querySelector('input[name="widgetMode"]:checked').value === "thumbnail"){
    thumbnailMode(imagePlaceholder);
  } else{
    singleMode(imagePlaceholder);
    };
};

//thumbnail mode 
function thumbnailMode(images){
  document.getElementById("containerThumbnail").style.display = "block";
  var mainImageThumbnail = document.getElementById('mainImageThumbnail');
  mainImageThumbnail.appendChild(setCurrentImage(images));

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
    nextImage(mainImageThumbnail, images);//check utilities.js for this function
  }

  var prevButton = document.createElement("button");
  prevButton.onclick = function(){
    prevImage(mainImageThumbnail, images)//check utilities.js for this function
  };

  nextButton.innerText = "Next";
  prevButton.innerText = "Previous"
  mainButtons.appendChild(prevButton);
  mainButtons.appendChild(nextButton);
};

//singleMode

function singleMode(images){
  document.getElementById("containerSingle").style.display = "block";
  var mainImageSingle = document.getElementById('mainImageSingle');
  mainImageSingle.appendChild(setCurrentImage(images));
  mainImageSingle.firstElementChild.onclick = function(){
    nextImage(mainImageSingle, images); //check utilities.js for this function
  }
};



