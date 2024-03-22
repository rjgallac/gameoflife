// console.log("HERE")

let size = 10;

let grid = new Array();
for(i=0;i<size;i++){
    let row = new Array();
    for(j=0;j<size;j++){
        let rndNo = Math.floor(Math.random() * 2);
        row.push(rndNo);
    }
    grid.push(row)


}



console.table(grid);
printGrid(grid)

newgrid = nextGrid(grid)
let count = 0;
var interval = setInterval(()=>{
    newgrid = nextGrid(newgrid)
    printGrid(newgrid)
    console.table(newgrid)
    count ++;
    if(count == 10){
        clearInterval(interval)
    }
},1000);



function printGrid(grid){
    outputStr = ""
    for(i=0;i<grid.length;i++){
        for(j=0;j<grid.length;j++){
            outputStr += grid[i][j]==1 ? "&#9724;" : "&#9723;" ;
        
        }
        outputStr += "<br />"

    }
    document.getElementById("display").innerHTML = outputStr;
}

function nextGrid(grid){
    let newgrid = [...grid];

    for(i=0;i<grid.length;i++){
        for(j=0;j<grid.length;j++){
            cell = checkSurroundingCells(i, j, grid)
            console.log(cell);
            if(cell.live < 2) {
                newgrid[i][j] = 0;
            }
            if(cell.live == 2 || cell.live ==3) {
                newgrid[i][j] = 1;
            }
            if(cell.live > 3 ) {
                newgrid[i][j] = 0;
            }
            if(cell.dead == 3) {
                newgrid[i][j] = 1;
            }
        }
    }
    return newgrid;
}

function checkSurroundingCells(col, row, grid) {

    liveCells = 0;

    if(validCell(col-1, row-1, grid) && grid[col - 1][row - 1] == 1){
        liveCells=liveCells+1;
    }
    if(validCell(col, row-1, grid) && grid[col][row-1] == 1){
        liveCells=liveCells+1;
    }
    if(validCell(col+1, row-1, grid) && grid[col + 1][row - 1] == 1){
        liveCells=liveCells+1; 
    }

    if(validCell(col-1, row, grid) && grid[col-1][row] == 1){
        liveCells=liveCells+1; 
    }
    if(validCell(col+1, row, grid) && grid[col+1][row] == 1){
        liveCells=liveCells+1; 
    }

    if(validCell(col-1, row+1, grid) && grid[col - 1][row + 1] == 1){
        liveCells=liveCells+1; 
    }
    if(validCell(col, row+1, grid) && grid[col][row + 1] == 1){
        liveCells=liveCells+1; 
    }
    if(validCell(col+1, row+1, grid) && grid[col + 1][row + 1] == 1){
        liveCells=liveCells+1; 
    }

    return {
        "live": liveCells,
        "dead": 8 - liveCells
    }

}

function validCell(col, row, grid){
    if((col < 0  || row < 0) || (col > grid.length -1  || row > grid.length-1 ) ){
        return false;
    }   
    return true;
}