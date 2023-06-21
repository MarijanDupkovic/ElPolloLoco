let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let audio = true;
function init() {
    canvas = document.getElementById('canvas');

    world = new World(canvas, keyboard);

    addMobileListener();
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.THROW = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.THROW = false;
    }
});

function setKeybordLeft(e, bool) {
    e.preventDefault();
    keyboard.LEFT = bool;
}
function setKeybordRight(e, bool) {
    e.preventDefault();
    keyboard.RIGHT = bool;
}
function setKeybordJump(e, bool) {
    e.preventDefault();
    keyboard.SPACE = bool;
}

function setKeybordThrow(e, bool) {
    e.preventDefault();
    keyboard.THROW = bool;
}
function setKeybordCommand(e, bool) {
    e.preventDefault();
    keyboard.COMMAND = bool;
}
function setKeybordRestart(e, bool) {
    e.preventDefault();
    keyboard.RESTART = bool;
}
function addMobileListenersToBtnLeft() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => setKeybordLeft(e, true));
    document.getElementById('btnLeft').addEventListener('touchend', (e) => setKeybordLeft(e, false));
}
function addMobileListenersToBtnRight() {
    document.getElementById('btnRight').addEventListener('touchstart', (e) => setKeybordRight(e, true));
    document.getElementById('btnRight').addEventListener('touchend', (e) => setKeybordRight(e, false));
}
function addMobileListenersToBtnJump() {
    document.getElementById('btnJump').addEventListener('touchstart', (e) => setKeybordJump(e, true));
    document.getElementById('btnJump').addEventListener('touchend', (e) => setKeybordJump(e, false));
}
function addMobileListenersToBtnThrow() {
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => setKeybordThrow(e, true));
    document.getElementById('btnThrow').addEventListener('touchend', (e) => setKeybordThrow(e, false));
}
function addMobileListenersToBtnCommand() {
    document.getElementById('commandButton').addEventListener('touchstart', (e) => setKeybordCommand(e, true));
    document.getElementById('commandButton').addEventListener('touchend', (e) => setKeybordCommand(e, false));
}
function addMobileListenersToBtnRestart() {
    document.getElementById('restartButton').addEventListener('touchstart', (e) => setKeybordRestart(e, true));
    document.getElementById('restartButton').addEventListener('touchend', (e) => setKeybordRestart(e, false));
}

function addMobileListener() {
    addMobileListenersToBtnLeft();
    addMobileListenersToBtnRight();
    addMobileListenersToBtnJump();
    addMobileListenersToBtnThrow();
    addMobileListenersToBtnCommand();
    addMobileListenersToBtnRestart();
    setAudioOnOff();
    showHideCommands();
}

function addRestartEventlistener() {
    let restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => resetGame(restartButton));
    restartButton.addEventListener('touchstart', () => resetGame(restartButton));
}

function resetGame() {
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    restartButton.classList.add('d-none');
    init();

}

function addCommandsEventlistener() {
    let commandButton = document.getElementById('commandButton');
    let commandContainer = document.getElementById('command-container');
    commandButton.addEventListener('click', () => setCommandsContainer(commandContainer));
    commandButton.addEventListener('touchstart', () => setCommandsContainer(commandContainer));
}

function setCommandsContainer(commandContainer) {
    if (commandContainer.classList.contains('d-none')) showCommands();
    else hideCommands();
}

function addBackButtonListener() {
    let backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => hideCommands());
}

function showHideCommands() {
    addCommandsEventlistener();
    addBackButtonListener();
    addRestartEventlistener();
}

function hideCommands() {
    if (world.checkGameStartet()) {
        document.getElementById('command-container').classList.add('d-none');
        document.getElementById('canvas').classList.remove('d-none');
    } else {
        document.getElementById('command-container').classList.add('d-none');
        document.getElementById('startScreen').classList.remove('d-none');
    }
}

function showCommands() {
    if (world.checkGameStartet()) {
        document.getElementById('command-container').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
    } else {
        document.getElementById('command-container').classList.remove('d-none');
        document.getElementById('startScreen').classList.add('d-none');
    }
}

function setAudioOnOff() {
    let audioBtn = document.getElementById('audioButton');
    audioBtn.addEventListener('touchstart', (e) => setAudioOn(e));
    audioBtn.addEventListener('click', (e) => setAudioOn(e));
}

function setAudioOn(e) {
    e.preventDefault();
    if (audio && world.checkGameStartet()) muteSound();
    else if (!audio && world.checkGameStartet()) activateSound();
}

function setAudioActiveEnemies(enemy, volume) {
    if (enemy.AUDIO_DEATH) enemy.AUDIO_DEATH.volume = volume;
}

function setAudioActivePickables(tile, volume) {
    if (tile.AUDIO_PICK) tile.AUDIO_PICK.volume = volume;
}

function activateSound() {
    let audioBtn = document.getElementById('audioButton');
    audio = true;
    writeToSessionStorage();
    audioBtn.style = 'background-image:url("./img/speakerOn.png");';
    world.character.WALKING_SOUND.volume = 0.5;
    world.level.enemies.forEach((enemy) => setAudioActiveEnemies(enemy, 0.5));
    world.bottles.forEach((bottle) => setAudioActivePickables(bottle, 0.5));
    world.coins.forEach((coin) => setAudioActivePickables(coin, 0.5));
}

function muteSound() {
    let audioBtn = document.getElementById('audioButton');
    audio = false;
    writeToSessionStorage();
    audioBtn.style = 'background-image:url("./img/speakerOff.png");';
    world.character.WALKING_SOUND.volume = 0;
    world.coins.forEach((coin) => setAudioActivePickables(coin, 0));
    world.bottles.forEach((bottle) => setAudioActivePickables(bottle, 0));
    world.level.enemies.forEach((enemy) => setAudioActiveEnemies(enemy, 0));
}
writeToSessionStorage();
function writeToSessionStorage() {
    sessionStorage.setItem('audio', JSON.stringify(audio));
}

function loadAudioONOff() {
    if (audio) {
        activateSound();
    } else muteSound();
}

function loadFromSStorage() {
    if (sessionStorage.audio) audio = JSON.parse(sessionStorage.audio);
    loadAudioONOff();
}
