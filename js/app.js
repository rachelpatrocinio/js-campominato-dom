console.log("JS-CAMPIONATO-GRID");

//L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
// RECUPERO IL BOTTONE DAL DOM
const playBtn = document.querySelector(".play-btn");
//console.log(playBtn);
// MI METTO IN ASCOLTO DEL CLICK SUL BOTTONE
// AL CLICK GENERO UNA GRIGLIA
playBtn.addEventListener("click", startGame);

function startGame(){
    // RECUPERO LA SELECT DAL DOM
    const difficulty = document.getElementById("difficulty");
    console.log(difficulty.value);

    // 1. RECUPERO IL CONTENITORE PADRE CHE DOVRA' CONTENERE LA GRIGLIA
    const gridElement = document.querySelector(".grid");
    //console.log(gridElement);

    //RECUPERO IL DIV CHE INFORMA "IL GIOCO E' TERMINATO"
    const finishedGame = document.querySelector(".finished-game");

    gridElement.innerHTML="";
    gridElement.classList.remove("pointer-events");
    finishedGame.classList.replace("d-block", "d-none");
    // con difficoltà HARD (DEFAULT) => 100 caselle DA 1 e 100 (10 x 10)
    // con difficoltà MEDIUM => 81 caselle DA 1 e 81 (9 x 9)
    // con difficoltà EASY => 49 caselle DA 1 e 49 (7 x 7)

    const min = 1;
    let max = 100;
    let size = 10;
    if(difficulty.value === "medium"){
        size = 9;
        max = 81;
    }else if(difficulty.value === "hard"){
        size = 7;
        max = 49;
    }
    const numOfCells = size * size;

    // // GENERIAMO 16 NUMERI RANDOM DIVERSI FRA LORO

    const randomBombs = 16;
    const arrayBombs = [];

    while (arrayBombs.length < randomBombs) {
        // Genero un numero casuale
        const randomNumber = Math.floor(Math.random() * max) + min;

        //SE L'ARRAY VUOTO NON INCLUDE IL NUMERO RANDOM, ALLORA PUSHO IL NUMERO RANDOM NELL'ARRAY
        if (arrayBombs.includes(randomNumber) === false) {
            arrayBombs.push(randomNumber);
        }
    }
    console.log("Random Bombs", arrayBombs);


    // CON UN CICLO PRENDO OGNI SINGOLA CELLA
    for(let i = 0; i < numOfCells; i++){
        const num = i + 1; 
        //console.log(num);

        // 2. CREO L'ELEMENTO OGGETTO CHE DOVRO' APPENDERE NEL CONTENITORE PADRE
        const gridCell = document.createElement("div");
        // 2A. AGGIUNGO LA CLASSE CHE DIA LO STILE ALL'ELEMENTO OGGETTO
        gridCell.className ="grid-cell";
        // 2B. AGGIUNGO LA WIDTH CHE DIA LA DIMENSIONE ALL'ELEMENTO OGGETTO
        gridCell.style.width = `calc(100% / ${size})`;
        // 3. APPENDO L'ELEMENTO OGGETTO AL CONTENITORE PADRE
        gridElement.append(gridCell);
        // 4. INSERISCO IL NUMERO ALL'INTERNO DELL'ELEMENTO OGGETTO.
        gridCell.innerHTML += num;
        //Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
        // MI METTO IN ASCOLTO DEL CLICK SULLA CELLA
        gridCell.addEventListener("click", function(){
            console.log("Hai cliccato la cella", num);
            // QUANDO L'UTENTE CLICCA IL BACKGROUND-COLOR CAMBIERA'
            gridCell.classList.add("bg-azzure","pointer-events");
            //RECUPERO L'H4 CHE INFORMA I PUNTI
            const scoreInfo = document.querySelector(".score");
            console.log(scoreInfo);
            scoreInfo.innerHTML++;

            // PRENDO OGNI SINGOLO NUMERO PRESENTE NELL'ARRAY E CONTROLLO SE E' UGUALE AL NUMERO RANDOM GENERATO
            for(let i= 0; i < arrayBombs.length; i++){
                const bombCell = arrayBombs[i]; //number
                if(parseInt(gridCell.innerHTML) === bombCell){
                    console.log("Hai trovato una bomba!");
                    gridCell.classList.add("bg-red");
                    gridElement.classList.add("pointer-events");
                    scoreInfo.innerHTML--;

                    //PRENDO IL DIV CHE INFORMA "IL GIOCO E' TERMINATO" E CI AGGIUNGO D-BLOCK
                    finishedGame.classList.replace("d-none", "d-block");
                }
            }
        })
    }
} //function startGame()