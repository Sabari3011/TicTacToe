const cells=document.querySelectorAll(".cell");
const statusText=document.getElementById('statusText');
const restartbtn=document.getElementById('restart');
const winConditions=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]

]
let options=["","","","","","","","",""];
let currentplayer="X";
let running =false;
initializeGame();

function initializeGame(){
    cells.forEach(cell=> cell.addEventListener("click",cellClicked));
    restartbtn.addEventListener("click",restartGame);
    statusText.textContent=`${currentplayer}'s turn`;
    running=true;
}
function cellClicked(){
    const cellIndex= this.getAttribute("cellIndex");
    if (options[cellIndex]!="" || !running){
        return;
    }
    cellUpdate(this,cellIndex);
    checkWinner();
}
function cellUpdate(cell,index){
    options[index]=currentplayer;
    cell.textContent=currentplayer;
}
function changePlayer(){
    currentplayer=(currentplayer=="X")?"O":"X"
    //currentplayer=(currentplayer=="X")?statusText.style.transform="transitionX(2cm)":
    statusText.textContent=`${currentplayer}'s turn`;
    statusText.classList.toggle('transfer');
    
}
function checkWinner(){
    let roundWon=false;
    let colorCell;
    for(let i=0;i<winConditions.length;i++){
        const condition =winConditions[i];
        colorCell=condition;
        const cellA= options[condition[0]];
        const cellB= options[condition[1]];
        const cellC= options[condition[2]];

        if(cellA=="" || cellB=="" || cellC==""  ){
            continue;
        }
        if(cellA==cellB && cellB==cellC){
            roundWon=true;
            break
        }
    }
    if(roundWon){
        changeColor(colorCell);
        statusText.textContent=`${currentplayer} WIN !!!`
        running=false;
    }
    else if(!options.includes("")){
        changeColor(colorCell);
        statusText.textContent="--DRAW--"
    }
    else{
        changePlayer();
    }

}
function restartGame(){
    currentplayer=(currentplayer=="X")?"O":"X";
    options=["","","","","","","","",""];
    cells.forEach(cell => cell.textContent="");
    cells.forEach(cell=> cell.classList.remove("color"))
    document.getElementById('cellContainer').classList.remove("blur");
    statusText.classList.remove("move");
    restartbtn.classList.remove("borderbtn")
    initializeGame();
    
}
function changeColor(colorCell){
colorCell.forEach(cell => document.getElementById(cell).classList.add("color"));
document.getElementById('cellContainer').classList.add("blur");
statusText.classList.remove("transfer");
statusText.classList.add("move");
restartbtn.classList.add("borderbtn")
}
