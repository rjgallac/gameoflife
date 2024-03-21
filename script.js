// console.log("HERE")
let grid = [[1,0,1],
            [0,1,0],
            [0,0,0]];


console.table(grid);


newgrid = nextGrid(grid)
setInterval(()=>{
    newgrid = nextGrid(newgrid)
    printGrid(newgrid)
    console.table(newgrid)
},3000);



function printGrid(grid){
    document.getElementById("display").innerHTML = grid[0][0] + "" +grid[0][1]+ "" +grid[0][2] + "<br />" + grid[1][0] + "" +grid[1][1]+ "" +grid[1][2] + "<br />" + grid[2][0] + "" +grid[2][1]+ "" +grid[2][2] + "<br />"
}

function nextGrid(grid){
    let newgrid =[...grid];

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