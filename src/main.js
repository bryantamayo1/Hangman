/*
JS: 
 - No más de 10 líneas
 - Contador de vida con corazones en html
 - Cuando se da click a una letra se cambia la transparencia y no se vuelve a pulsar
 - Un solo array en el contenga: un objeto que a su vez tenga las pistas más la palabra en sí
 - Tema: 5 películas con 10 vidas 
 
 HTML:
 - Botón Hint:
 - Botón Play again: resete de todo (F5 de toda la vida), la palabra a salir es random
 - 

 CSS:
 - Dibujo por medio de imágenes (cambiando la ruta)
 */

import { movies } from './movies.js';
var showHangmancont = 1;
var countLife = 10;
var countAccert = 0;

document.addEventListener("DOMContentLoaded", function() {
    init();
});

var minutes = 0, seconds =59;
var myMinutes = 3;
var myTime = 60*myMinutes;
var tempTime = 0;
var clock = setInterval(function(){
    minutes = Math.trunc((myTime-1)/60);

    if(tempTime != minutes) seconds=59;
    if(seconds<=9 && seconds >=0){
        document.getElementById('countdown').innerHTML= "0"+minutes+" : 0"+seconds;
    }else{
        document.getElementById('countdown').innerHTML= "0"+minutes+" : "+seconds;
    }
    tempTime = minutes;
    
    if(myTime == 0 ){
        gameOver();
    } else{
        myTime--; 
        seconds--;
    }
},1000);

function gameOver(){  
    location.reload();
    clearTimeout(clock); 
    alert ("Game Over");
     
}

function gameWin(){  
    location.reload();
    clearTimeout(clock); 
    alert ("Congrats!! You Won!");
}


//  JSON array to contain movies
function init() {
    let movieChoosen = movies[Math.floor(Math.random() * (movies.length))];
    createLetters(movieChoosen.name.toUpperCase());
    createWord(movieChoosen.name.toUpperCase());
    initEventButtons(movieChoosen);
}


function initEventButtons(movieChoosen) {
    let countHint = 0;
    let btnHint = document.getElementsByClassName("btn-hint");
    btnHint[0].addEventListener('click', function() {
        countHint++;
        seeHint(movieChoosen.hint, countHint);
    });
    let btnPlayAgain = document.getElementsByClassName("btn-play-again");
    btnPlayAgain[0].addEventListener('click', playAgain);
}


function playAgain(){
    location.reload();
}


function createLetters(movieChoosenName) {
    let alphabetContainer = document.getElementsByClassName("alphabet-container");
    let alphabetString = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    for (let i = 0; i < alphabetString.length; i++) {
        let newDiv = document.createElement("p");
        addEventsToLetters(movieChoosenName, newDiv, alphabetString[i]);
        let content = document.createTextNode(alphabetString[i]);
        newDiv.appendChild(content);
        newDiv.classList.add("letter");
        alphabetContainer[0].appendChild(newDiv);
    }
}

function addEventsToLetters(movieChoosenName, div, letter) {
    div.addEventListener("click", function() {
        checkLetterInWord(movieChoosenName, letter);
    });
}


// Create "div" as many times as letters has the word
function createWord(word) {
    let wordContainer = document.getElementsByClassName("word-container");
    for (let i = 0; i < word.length; i++) {
        checkSpaceInWords(wordContainer, word[i]);
    }
}

function checkSpaceInWords(wordContainer, letter) {
    let newDiv = document.createElement("div");
    if (letter !== " ") {
        let content = document.createTextNode("");
        newDiv.appendChild(content);
        newDiv.classList.add("word-visible");   
    }
    wordContainer[0].appendChild(newDiv);
}

function checkLetterInWord(movieChoosenName, letter) {
    let index = 0;
    let aux = false;
    while(index >= 0){
        index = movieChoosenName.indexOf(letter, index);
        if(index == -1 && aux == false){
            showHangman();
            manageLife();
        }else if(index >= 0){
            showLetter(movieChoosenName, index);
            index++;
            aux = true;
        } 
    }
}


function showHangman(){;
    let screenContainer = document.getElementsByClassName("screen-container-hangman");
    let imageUrl = "imageHangman"+showHangmancont;
    screenContainer[0].classList.add(imageUrl);

    if(showHangmancont>=10)gameOver();
    showHangmancont++;
}

function manageLife(){
    let imageLife = document.getElementsByClassName("heart");
    imageLife[countLife-1].classList.remove("heart");
    countLife--;
}


function showLetter(movieChoosenName, index) {
    let word = document.getElementsByClassName("word-visible");
    if (word[index].innerHTML = movieChoosenName[index]){
    countAccert++;
    }
    if(countAccert == (movieChoosenName.length)){
        gameWin();
    }
}


function seeHint(hint, countHint) {
    if (countHint > Object.keys(hint).length) {
        alert("NO MORE HINTS!");
    } else {
        let phraseHint = document.getElementsByClassName("phrase_hint");
        let value = "hint_" + countHint;
        phraseHint[0].textContent = hint[value];
    }
}
