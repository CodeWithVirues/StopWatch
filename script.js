// Variables to track time and interval
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 0;

// HTML Elements
const timeDisplay = document.querySelector("h1");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");
const lapBtn = document.querySelector("#lapBtn");
const lapsList = document.querySelector("#lapsList");
const stopwatchContainer = document.querySelector(".stopwatch-container");

// Event Listeners
startBtn.addEventListener("click", startStopwatch);
stopBtn.addEventListener("click", stopStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

// Start the stopwatch
function startStopwatch(){
    if (!running){
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000);
        running = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        console.log("Start 1");
    }
    console.log("Start 2");
}

// Stop the stopwatch
function stopStopwatch() {
    if (running){
        clearInterval(tInterval);
        running = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

// Reset the stopwatch
function resetStopwatch(){
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCounter = 0;
    timeDisplay.textContent = "00:00:00";
    lapsList.innerHTML = ''; // Clear lap list
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
 
    // Collapse container to original height
    stopwatchContainer.classList.remove("expanded");
}

// Record lap time
function recordLap(){
    const lapTime = timeDisplay.textContent;
    lapCounter++;
    const lapItem = document.createElement('li');
    lapItem.textContent = `#${lapCounter}: ${lapTime}`;
    lapsList.appendChild(lapItem);

    if(!stopwatchContainer.classList.contains("expanded")){
        stopwatchContainer.classList.add("expanded");
    }
}

// Update time display
function updateTime(){
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}