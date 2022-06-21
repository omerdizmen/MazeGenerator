var cols, rows;

var w = 10;
var grid = [];

width = 800;
height = 800;

canvasWitdh = 800;
canvasHeight = 800;

var current;
var stack = [];

heightDiffer = (canvasHeight - height)/2;
widthDiffer = (canvasWitdh - width)/2;

function setup(){
    createCanvas(canvasWitdh, canvasHeight);    
    
    cols = floor(width/w);
    rows = floor(height/w);

    console.log(cols, rows);

    for (var j = 0; j < rows; j++){
        for (var i = 0; i < cols; i++){
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }

    current = grid[0];
    current.visited = true;
    stack.push(current);

}

function draw(){
    background(40);
    for (var i = 0; i < grid.length; i++){
        grid[i].show();

    }

    if (stack.length > 0){
        
        current = stack.pop();
        var next = current.checkNeighbours();   
        
        if (next){
            stack.push(current);
            removeWall(current, next)
            next.visited = true;
            stack.push(next);
        }

    }
}


// function draw(){
//     background(40);
//     for (var i = 0; i < grid.length; i++){
//         grid[i].show();
//     }

//     if (stack){
//         // current = stack.pop()
        
//     }

//     current.visited = true;
//     var next = current.checkNeighbours();

//     if (next){
//         next.visited = true;
//         current = next;
//     }
// }




function index(i, j){
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;        
    }

    return i + j * cols;
}


function Cell(i, j){
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbours = function(){
        var neighbours = [];

        // var index = i + (j-1) * cols
        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i-1, j)];

        if (top && !top.visited){
            neighbours.push(top)
        }

        if (right && !right.visited){
            neighbours.push(right)
        }

        
        if (bottom && !bottom.visited){
            neighbours.push(bottom)
        }

        
        if (left && !left.visited){
            neighbours.push(left)
        }

        if (neighbours.length > 0){
            var r = floor(random(0, neighbours.length));
            return neighbours[r];
            
        }else{
            return undefined;
        }
    }

    this.show = function(){
        var x = this.i*w + widthDiffer;
        var y = this.j*w + heightDiffer;
        stroke(255);
        if (this.walls[0])
        line(x, y, x + w, y);
        if (this.walls[1])
        line(x + w, y, x + w, y + w)
        if (this.walls[2])
        line(x+w, y+w, x, y+w);
        if (this. walls[3]) 
        line(x, y+w, x, y);                
        
        if (this.visited){       
        // stroke(0)     
        // fill(255,0, 255, 100);
        // rect(x,y,w,w);
        
        }
    }

}

function removeWall (current, neighbour){
    curi = current.i;
    curj = current.j;

    neigi = neighbour.i;
    neighj = neighbour.j;

    if (curj - neighj == - 1){
        // bottom
        current.walls[2] = false;
        neighbour.walls[0] = false;
    }

    if (curj - neighj == 1){
        // top
        current.walls[0] = false;
        neighbour.walls[2] = false;
    }

    if (curi - neigi == 1){
        // left
        current.walls[3] = false;
        neighbour.walls[1] = false;
    }

    if (curi - neigi == -1){
        // right
        current.walls[1] = false;
        neighbour.walls[3] = false;
    }
}