document.addEventListener("DOMContentLoaded", main, false);

//Selecciona todos los elementos 'button' del HTML
const keys = document.querySelectorAll('.filaT button');
const guessesWords = [[]];
//Se usará para saber si la casilla está ocupada o no
let availableSpace = 1;
//Cada vez que se carga la pagina, genera una palabra del Array
let word = genPalabra();
//Para saber las letras acertadas 
let guessedWordCount = 0;

function main() {

    console.log(word)
    crearTablero()

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
            console.log(letter);

            if (letter === 'enter') {
                handleSubmitWord()
                return;
            }

            if (letter === 'del') {
                handleDelete();
                return;
            }

            updateGuessesWords(letter);
        }
    }
}


/**
 * Esta función crea elementos dic con la clase "casilla" y los 
 * hace hijos del elemento "tablero"
 */
function crearTablero() {
    const tableroJuego = document.getElementById("tablero")

    for (let i = 0; i < 30; i++) {
        let casilla = document.createElement("div");
        casilla.classList.add("casilla");
        casilla.setAttribute("id", i + 1);
        tableroJuego.appendChild(casilla);
    }
}

function updateGuessesWords(letter) {
    const currentWordArr = getCurrentWordArr()
    if (currentWordArr && currentWordArr.length < 5) {
        currentWordArr.push(letter);
        /**
         * Cuando creamos las casillas les dimos un ID, lo usamos
         *  ahora para comprobar los espacios vacíos
         */
        const availableSpaceElem = document.getElementById(String(availableSpace))
        availableSpace = availableSpace + 1;
        availableSpaceElem.textContent = letter;
    }
}

/**
 * Esta funcion devuelve el numero actual de pabras que el usuario ha
 *  intentado adivinar
 * @returns 
 */
function getCurrentWordArr() {
    const numbGuessedWords = guessesWords.length
    return guessesWords[numbGuessedWords - 1]
}

function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length !== 5) {
        window.alert("Tienes que introducir al menos 5 letras")
    }

    const currentWord = currentWordArr.join("");

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);
        //Si la letra no contiene
        if (!isCorrectLetter) {
            return "rgb(58,58,60)";
        }

        const letterInPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInPosition;

        //Si la letra contiene y está en la posicion
        if (isCorrectPosition) {
            return "rgb(83, 142, 78)";
        }

        return "rgb(181,141,59)";
    }


    //Para conseguir el ID de la primera letra
    const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 200;
    currentWordArr.forEach((letter, index) => {
        setTimeout(() => {
            const tileColor = getTileColor(letter, index);

            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            letterEl.style = `background-color: ${tileColor};
                            border-color:${tileColor};
                            color:#a7a9be;`
        }, interval * index)
    })

    guessedWordCount += 1;

    if (currentWord === word) {
        window.alert("Has acertado la palabra!");
    }

    if (currentWord !== word && currentWord.length === 5) {
        const intentos = document.getElementById('intentos');
        intentos.innerHTML += currentWord + " no es la palabra correcta" + "<br>"
    }

    if (guessesWords.length === 6) {
        window.alert("Has perdido! La palabra era " + word);
    }
    guessesWords.push([])
}


function handleDelete(){
    const currentWordArr = getCurrentWordArr();
    const removedLetter = currentWordArr.pop();

    guessesWords[guessesWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));
    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
}