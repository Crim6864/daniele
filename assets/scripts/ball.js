// Setting the 2d field and color.
const WIDTH = 500,
        HEIGHT = 500,
        canvas = document.getElementById('canvas'), 
        context = canvas.getContext('2d');

canvas.width=WIDTH;
canvas.height=HEIGHT;
canvas.style.background="#123456";

//Variables for the blocks
var blockArr=[],
    blockIndex=0,
    numBlockCol=7,
    numBlockRow=4,
    colWidth=WIDTH/numBlockCol,
    padding=colWidth/4;