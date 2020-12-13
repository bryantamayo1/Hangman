/*
Bryan: contador, adivinar letras
Laura: vida 
Jose: localstage:
	var objeto={
		time= ....,
		countlife:....,
		countWordAccetped: ..;
	}
Sebas: contador, adivinar letras

03:00
02:59

tiempo
vida
letras adivinadas y acertadas
record
*/

///////////////////////// 05/10/20 ///////////////////////
var person ={
    name:"Bryan",
    email:"ddddddd@hotmail.com"
}
var personString = JSON.stringify(person);
console.log(personString);

var personObject = JSON.parse(personString);
console.log(personString);
localStorage.setItem("test",JSON.stringify(person));

console.log(localStorage.getItem("test"));
/*
fetch('https://omdbapi.com?t=titanic').then(function(response){
    return response.jason().then(function(data){
        console.log(data);
    })
});
*/


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

 /**************************  Backup_v1  ******************************** */
i/*
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
document.addEventListener("DOMContentLoaded", function() {
    init();
});

var minutes = 0, seconds =59;
var myMinutes = 1;
var myTime = 60*myMinutes;
var tempTime = 0;
var clock = setInterval(function(){
    minutes =Math.trunc((myTime-1)/60);
    if(tempTime != minutes) seconds=59;
    if(seconds<=9 && seconds >=0){
        document.getElementById('countdown').innerHTML= "0"+minutes+" : 0"+seconds;
    }else{
        document.getElementById('countdown').innerHTML= "0"+minutes+" : "+seconds;
    }
    tempTime = minutes;
    seconds--;
    myTime--; 
    if(myTime==0) gameOver();
},1000);

function gameOver(){
    clearTimeout(clock);   
    alert("Game over");
}

//  JSON array to contain movies

function init() {
    let movieChoosen = movies[Math.floor(Math.random() * (movies.length))];
    createLetters(movieChoosen.name);
    createWord(movieChoosen.name);
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

function checkSpaceInWords(wordContainer, word) {
    let newDiv = document.createElement("div");
    if (word !== " ") {
        let content = document.createTextNode(word.toUpperCase());
        newDiv.appendChild(content);
        newDiv.classList.add("word-hidden");
    }
    wordContainer[0].appendChild(newDiv);
}

function checkLetterInWord(movieChoosenName, letter) {
    console.log("word: ", letter);
    let movieChoosenNameUpper = movieChoosenName.toUpperCase();

    //console.log(showHangmancont);
    let index = 0;
    while (index >= 0) {
        index = movieChoosenNameUpper.indexOf(letter, index);
        (index== -1)? showHangman():showLetter(index);
    }
}

function showHangman(){;
    let screenContainer = document.getElementsByClassName("screen-container-hangman");
    let imageUrl = "imageHangman"+showHangmancont;
    screenContainer[0].classList.add(imageUrl);
    if(showHangmancont>=11)gameOver();
    showHangmancont++;
    console.log(showHangmancont);
}

function showLetter(index) {
    let word = document.getElementsByClassName("word-hidden");
    console.log(index);
    word[index ].classList.remove("word-hidden");
    word[index ].classList.add("word-visible");
    
    for (let i = 0; i < word.length; i++) {
        word[index ].classList.remove("word-hidden");
        word[index ].classList.add("word-visible");
    }
    
}

function seeHint(hint, countHint) {
    console.log(Object.keys(hint).length)
    if (countHint > Object.keys(hint).length) {
        alert("NO MORE HINTS!");
    } else {
        let phraseHint = document.getElementsByClassName("phrase_hint");
        let value = "hint_" + countHint;
        phraseHint[0].textContent = hint[value];
    }
}


