const startOfGame = document.getElementsByClassName("btn__reset")[0];
const overlayDiv = document.getElementById('overlay');
const h2 = overlayDiv.firstElementChild;
const qwerty = document.getElementById("qwerty");
const phrase = document.querySelector("#phrase");
const ul=phrase.getElementsByTagName("ul")[0];
const lives = document.querySelectorAll(".tries");
const keyrows = document.getElementsByClassName("keyrow");
const overlay = document.getElementById("overlay");
let missed = 0;
const phrases = [
    "The wheel of fortune turns for you",
    "Your fate is in your hands and on the wheel",
    "Take a spin on the wheel of destiny",
    "Swirl spin and score big",
    "Come and take a turn for the better",
    "Get your fortune on the wheel",
    "Wheel of fortune will change your life",
    "You never know where the wheel will take you"
];


startOfGame.addEventListener("click",function(){
    overlay.style.display ="none";

});


function getRandomPhraseAsArray(arr){
  let n=Math.floor((Math.random()*8) +1);
  let phraseArray = arr[n].split("");
  return phraseArray;
}



const phraseArray = getRandomPhraseAsArray(phrases);



function addASentence(arr){
arr.forEach(function(e){

    let li= document.createElement("li");

    li.textContent=e;

    console.log(li);
    console.log()
    if(e===" "){
        li.className = "space";
      }else{
        li.className = "letter";
      }
      ul.appendChild(li);
  });

}

addASentence(phraseArray);



function replacePhraseToDisplay(arr){
phrase.innerHTML=" ";
let newUl =document.createElement("ul");
arr.forEach(function(e){
    let li= document.createElement("li");
    li.textContent=e;
  if(e===" "){
      li.className = "space";
    }else{
      li.className = "letter";
    }
      newUl.appendChild(li);
});
phrase.appendChild(newUl);
}



function checkLetter(button){

let buttonText= button.textContent;
    let buttonMatch= null;
const letters = document.getElementsByTagName("li");
Array.from(letters).forEach(function(letter){
      if(button.textContent === letter.textContent.toLowerCase()){
      letter.classList.add("show");
        buttonMatch= buttonText;

      }
  });
  return buttonMatch;
}


// reset the game

function reset (){
startOfGame.textContent="Reset Game";
startOfGame.addEventListener("click", ()=>{
replacePhraseToDisplay(getRandomPhraseAsArray(phrases));
  missed=0;
  for(var i=0; i<lives.length;i++){
    lives[i].style.display="";
    const heartimage= lives[i].querySelectorAll("img")[0];
    heartimage.src="images/liveHeart.png";
  }
});
return overlay.style.display
}

/* Click event added to the BUTTONS*/
qwerty.addEventListener("click",(e)=>{
if (e.target.tagName== "BUTTON"){
  const button = e.target;
  checkLetter(button);
  if(checkLetter(button) == null){
    missed+= 1;
    const heartimage= lives[missed-1].querySelectorAll("img")[0];
    heartimage.src="images/lostHeart.png";
  }
  button.disabled=true;
}
checkWin();
});

      const buttons = document.querySelectorAll('.chosen');
      buttons.forEach(function (element) {
          element.classList.remove('chosen');
          element.disabled = false;
      });

   

function checkWin(){
let title = document.querySelectorAll(".title")[0];
var letterCount = document.querySelectorAll(".letter");
var showCount = document.querySelectorAll(".show");
letterCount = letterCount.length;
showCount = showCount.length;
    if(letterCount == showCount){
  overlay.style.display ="";
  overlay.className="win";
      h2.textContent="Congrats! You won!"
  reset();
}
    if(missed>= 5) {
  overlay.style.display ="";
  overlay.className="lose";
   h2.textContent = "Unfortunately, you lost!";
  reset();
  }
}