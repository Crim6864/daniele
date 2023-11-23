// Setting the 2d field and color.
const WIDTH = 500,
        HEIGHT = 500,
        canvas = document.getElementById('canvas'), 
        context = canvas.getContext('2d');

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

// Initialize the blocks
function InitializeBlocks() {
    for(let i=0;i<numBlockCol;i++){
        for(let j=0;j<numBlockRow;j++){
            blockArr[blockIndex]=new Block(padding/2+(i+1)*(colWidth)-colWidth/2,colWidth+j*(colWidth-2*padding),blockProp.w-padding,blockProp.h,true)
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