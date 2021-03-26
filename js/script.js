let solver = document.querySelector(".solve button");
let reseter = document.querySelector(".reset button");
let creator = document.querySelector(".create button");
let grid = new Array();
let elements = new Array();

function get_values(row){
    let temp = row.querySelectorAll('.cell');
    let cells = new Array();
    let inputs = new Array();
    for (i=0; i<9;i++){
        let num_input = temp[i];
        cells[i] = num_input.querySelector("input").value;
        inputs[i] = num_input;
    }
    return [cells, inputs];
}

function get_cells(row){
    let values = get_values(row); 
    grid.push(values[0]);
    elements.push(values[1]);
}

function get_grid(){
    let rows = document.querySelectorAll(".row");
    rows.forEach(get_cells);
}

function reset_all(inpt){
    for(i=0;i<9;i++){
        for (j=0;j<9;j++){
        elements[i][j].querySelector('input').value = "";
        }
    }
}

function get_empty(grid){
    for (i=0;i<9;i++){
        for (j=0;j<9;j++){
            if (grid[i][j] == "" || grid[i][j] == 0){
                return [i, j];
            }
        }
    }
    return false;
}

function is_possible(x, y, n, grid){
    for (i=0;i<9;i++){
        if ((grid[i][y] == n && i != x) || (grid[x][i] == n && i != y)){
            return false;
        }
    }
    
    let x0 = (Math.floor(x / 3))*3;
    let y0 = (Math.floor(y / 3))*3;
    for (i=0;i<3;i++){
        for (j=0;j<3;j++){
            if (grid[x0+i][y0+j] == n && (x, y) != (x0+i, y0+j)){
            return false;
            }
        }
    }
    return true;

}
    // for (let i = 0; i < 9; i++) {
    //     let m = 3 * Math.floor(x / 3) + Math.floor(i / 3);
    //     let k = 3 * Math.floor(y / 3) + i % 3;
    //     if (grid[x][i] == n || grid[i][y] == n || grid[m][k] == n) {
    //         return false;
    //     }
    // }
    // return true;
// }

function write(elements, grid){
    for(i=0;i<9;i++){
        for (j=0;j<9;j++){
            elements[i][j].querySelector('input').value = grid[i][j];
        }
    }
    
}

function find_solution(){
    let empty = get_empty(grid);
    if (empty){
        let x = empty[0];
        let y = empty[1];
        for (n=1;n<10;n++){
            if (is_possible(x, y, n, grid)){
                grid[x][y] = n;
                if (find_solution()){
                    return true;
                }else{
                    grid[x][y] = 0;
                }
            }
        }return false;
    }else{
        return true;
    }
}

function check_valid(board){
    for (row_counter=0;row_counter<9;row_counter++){
        for (colm_counter=0;colm_counter<9;colm_counter++){
            if (board[row_counter][colm_counter] === "" || board[row_counter][colm_counter] === 0){
                continue;
            }else{
                if (! is_possible(row_counter, colm_counter, board[row_counter][colm_counter], board)){
                    return false;
                }
            }
        }
    }return true; 
}

function solve(){
    grid = [];
    elements = [];
    get_grid();
    if (check_valid(grid)){ 
        find_random_solution(grid);
        write(elements, grid);
    }else{
        alert('WARNING... this is NOT a valid grid!!');
    }
}

function waiting(sec){
    let ms = sec * 1000;
    let start_time = new Date();
    let curr = null;
    do{
        curr = new Date();
    }while(curr - start_time < ms);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function find_random_solution(board) {
    let empty = get_empty(board);
    if (empty){
        let x = empty[0];
        let y = empty[1];
        let choices = [];

        for (n=1;n<10;n++){choices.push(n);}
        shuffle(choices);
        for (n of choices){
            if (is_possible(x, y, n, board)){
                // let target_element = elements[x][y].querySelector('input');
                board[x][y] = n;
                if (find_random_solution(board)){
                    return true;
                }else{
                    board[x][y] = 0;
                }
            }
        }return false;
    }else{return true;}
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function create(board){
    find_random_solution(board);
    let start_answer = Object.assign([], board);
    let latest_question = Object.assign([], board);
    let temp_question, target_colm, target_row;
    for (i=0;i<50;i++){
        target_row = getRndInteger(0, 8);
        target_colm = getRndInteger(0, 8);
        board = Object.assign([], latest_question);
        if (board[target_row][target_colm] == 0 ){continue;}
        board[target_row][target_colm]= "";
        console.log(board);
        temp_question = Object.assign([], board);
        find_random_solution(board);
        if (board == start_answer){
            latest_question = Object.assign([], temp_question);
        }else{
            break;
        }
    }
    return latest_question;
    // write(elements, latest_question);
}

function create_puzzle(){
    get_grid();
    grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
    
    write(elements, create(grid));
}

solver.addEventListener("click", solve);
reseter.addEventListener("click", reset_all);
creator.addEventListener("click", create_puzzle);
