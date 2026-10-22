const PUZZLE_SIZE = 3;
let puzzleTiles = [];
let emptyTile = { x: 2, y: 2 };

function startPuzzle(imageSrc) {
    document.getElementById('puzzle-area').classList.remove('hidden');
    document.getElementById('puzzle-win').classList.add('hidden');
    const board = document.getElementById('puzzle-board');
    board.innerHTML = '';
    
    puzzleTiles = [];
    emptyTile = { x: PUZZLE_SIZE - 1, y: PUZZLE_SIZE - 1 };

    // Create tiles
    for (let y = 0; y < PUZZLE_SIZE; y++) {
        for (let x = 0; x < PUZZLE_SIZE; x++) {
            if (x === PUZZLE_SIZE - 1 && y === PUZZLE_SIZE - 1) continue; // Empty space

            const tile = document.createElement('div');
            tile.className = 'absolute transition-all duration-300 cursor-pointer shadow-inner hover:brightness-110';
            tile.style.width = `${100 / PUZZLE_SIZE}%`;
            tile.style.height = `${100 / PUZZLE_SIZE}%`;
            tile.style.backgroundImage = `url(${imageSrc})`;
            tile.style.backgroundSize = `${PUZZLE_SIZE * 100}% ${PUZZLE_SIZE * 100}%`;
            tile.style.backgroundPosition = `${(x / (PUZZLE_SIZE - 1)) * 100}% ${(y / (PUZZLE_SIZE - 1)) * 100}%`;
            tile.style.border = '1px solid rgba(255,255,255,0.1)';
            
            // Current position starts at the correct position, then we shuffle
            const tileObj = { x, y, correctX: x, correctY: y, element: tile };
            puzzleTiles.push(tileObj);
            board.appendChild(tile);

            tile.addEventListener('click', () => moveTile(tileObj));
        }
    }
    
    shufflePuzzle();
    updateBoard();
    
    // Scroll to puzzle
    document.getElementById('puzzle-area').scrollIntoView({ behavior: 'smooth' });
}

function moveTile(tile) {
    // Check if adjacent to empty
    const isAdjacent = (Math.abs(tile.x - emptyTile.x) === 1 && tile.y === emptyTile.y) ||
                       (Math.abs(tile.y - emptyTile.y) === 1 && tile.x === emptyTile.x);
    if (isAdjacent) {
        const tempX = tile.x;
        const tempY = tile.y;
        tile.x = emptyTile.x;
        tile.y = emptyTile.y;
        emptyTile.x = tempX;
        emptyTile.y = tempY;
        updateBoard();
        checkWin();
    }
}

function updateBoard() {
    puzzleTiles.forEach(tile => {
        tile.element.style.left = `${(tile.x / PUZZLE_SIZE) * 100}%`;
        tile.element.style.top = `${(tile.y / PUZZLE_SIZE) * 100}%`;
    });
}

function shufflePuzzle() {
    // Basic shuffle by doing random valid moves
    for (let i = 0; i < 200; i++) {
        const movable = puzzleTiles.filter(tile => 
            (Math.abs(tile.x - emptyTile.x) === 1 && tile.y === emptyTile.y) ||
            (Math.abs(tile.y - emptyTile.y) === 1 && tile.x === emptyTile.x)
        );
        const randomTile = movable[Math.floor(Math.random() * movable.length)];
        
        const tempX = randomTile.x;
        const tempY = randomTile.y;
        randomTile.x = emptyTile.x;
        randomTile.y = emptyTile.y;
        emptyTile.x = tempX;
        emptyTile.y = tempY;
    }
}

function checkWin() {
    const isWin = puzzleTiles.every(t => t.x === t.correctX && t.y === t.correctY);
    if (isWin) {
        document.getElementById('puzzle-win').classList.remove('hidden');
    }
}

function closePuzzle() {
    document.getElementById('puzzle-area').classList.add('hidden');
}
