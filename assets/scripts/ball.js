// Setting the 2d field and color.
const WIDTH = 500,
        HEIGHT = 500,
        canvas=document.getElementById('canvas'), 
        context=canvas.getContext('2d');

canvas.width=WIDTH;
canvas.height=HEIGHT;
canvas.style.background="#123456";

// Variables for the blocks
var blockArr=[],
    blockIndex=0,
    numBlockCol=7,
    numBlockRow=4,
    colWidth=WIDTH/numBlockCol,
    padding=colWidth/4;

// Block Properties
var blockProp={
    w:colWidth,
    h:padding
}

InitializeBlocks();

// Initialize the blocks
function InitializeBlocks() {
    for(let i=1;i<numBlockCol;i++){
        for(let j=0;j<numBlockRow;j++){
            blockArr[blockIndex]=new Block(padding/2+(i)*(colWidth)-colWidth/2,colWidth+j*(colWidth-2*padding),blockProp.w-padding,blockProp.h,true);
            blockIndex++;
        }
    }
}

// Block function
function Block(x, y, width, height, isShow){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.isShow=isShow;
}

// Display the Blocks
function DisplayBlocks(){
    blockArr.forEach((b)=>{
        if(b.isShow){
            context.beginPath();
            context.fillStyle='#E15517';
            context.fillRect(b.x, b.y, b.width, b.height);
            context.closePath();
        }
    });
}

// Draws the Game
function drawGame(){
    DisplayBlocks();
}

drawGame();