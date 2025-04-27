// Basic Game Setup
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const connectWalletBtn = document.getElementById("connect-wallet-btn");
const walletInfoDiv = document.getElementById("wallet-info");
const walletAddressSpan = document.getElementById("wallet-address");
const shuffBalanceSpan = document.getElementById("shuff-balance");
const swingCostSelect = document.getElementById("swing-cost");
const swingBtn = document.getElementById("swing-btn");
const statusDiv = document.getElementById("status");
const leaderboardDiv = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboard-list");

// Game state variables
let walletConnected = false;
let playerAddress = null;
let shuffBalance = 0;
let ballPosition = { x: 100, y: 550 }; // Starting position (tee)
const holePosition = { x: 700, y: 100 };
const teePosition = { x: 100, y: 550 };
let currentSwings = []; // Store swings for leaderboard

// --- Drawing Functions ---
function drawGreen() {
    ctx.fillStyle = "#a0d4a0"; // Lighter green for the green
    ctx.beginPath();
    ctx.ellipse(holePosition.x, holePosition.y + 50, 150, 80, Math.PI / 2, 0, 2 * Math.PI);
    ctx.fill();
}

function drawHole() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(holePosition.x, holePosition.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    // Flag
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(holePosition.x, holePosition.y);
    ctx.lineTo(holePosition.x, holePosition.y - 40);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(holePosition.x, holePosition.y - 40);
    ctx.lineTo(holePosition.x + 20, holePosition.y - 35);
    ctx.lineTo(holePosition.x, holePosition.y - 30);
    ctx.closePath();
    ctx.fill();
}

function drawTee() {
    ctx.fillStyle = "#d2b48c"; // Light brown for tee box
    ctx.fillRect(teePosition.x - 20, teePosition.y - 10, 40, 20);
}

function drawBall() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(ballPosition.x, ballPosition.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = "#e8f8e8"; // Background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGreen();
    drawTee();
    drawHole();
    drawBall();
}

// --- Animation --- 
function animateBall(targetX, targetY) {
    let currentX = teePosition.x;
    let currentY = teePosition.y;
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(1, Math.floor(distance / 5)); // Adjust speed here
    const stepX = dx / steps;
    const stepY = dy / steps;
    let stepCount = 0;

    function animationStep() {
        if (stepCount >= steps) {
            ballPosition.x = targetX;
            ballPosition.y = targetY;
            drawGame();
            updateStatus(`Swing complete! Landed near (${Math.round(targetX)}, ${Math.round(targetY)}).`);
            swingBtn.disabled = false;
            addLeaderboardEntry(playerAddress, targetX, targetY);
            return;
        }
        ballPosition.x += stepX;
        ballPosition.y += stepY;
        drawGame();
        stepCount++;
        requestAnimationFrame(animationStep);
    }
    animationStep();
}

// --- Wallet Simulation ---
function connectWallet() {
    if (walletConnected) return;
    // Simulate connecting
    playerAddress = "Simulated_Wallet_" + Math.random().toString(16).substring(2, 10);
    shuffBalance = 10000; // Give some mock balance
    walletConnected = true;

    walletAddressSpan.textContent = playerAddress;
    shuffBalanceSpan.textContent = shuffBalance;
    walletInfoDiv.style.display = "block";
    connectWalletBtn.style.display = "none";
    swingBtn.disabled = false;
    updateStatus("Wallet connected. Ready to swing!");
}

// --- Game Logic Simulation ---
function takeSwing() {
    if (!walletConnected) {
        updateStatus("Please connect your wallet first.");
        return;
    }

    const cost = parseInt(swingCostSelect.value);
    if (shuffBalance < cost) {
        updateStatus("Insufficient $SHUFF balance for this swing.");
        return;
    }

    swingBtn.disabled = true;
    updateStatus("Processing swing transaction...");

    // Simulate transaction delay and blockchain interaction
    setTimeout(() => {
        shuffBalance -= cost;
        shuffBalanceSpan.textContent = shuffBalance;
        updateStatus("Transaction confirmed. Calculating swing...");

        // Simulate VRF outcome influenced by cost
        // Higher cost = less randomness (closer to hole)
        const maxRandomness = 150; // Max deviation pixels
        const costFactor = 1 / (cost / 50); // Higher cost -> smaller factor
        const randomness = maxRandomness * costFactor * Math.random();
        const randomAngle = Math.random() * 2 * Math.PI;

        const targetX = holePosition.x + Math.cos(randomAngle) * randomness;
        const targetY = holePosition.y + Math.sin(randomAngle) * randomness;

        // Start animation
        animateBall(targetX, targetY);

    }, 2000); // 2 second delay simulation
}

// --- Leaderboard Simulation ---
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function addLeaderboardEntry(address, x, y) {
    const distance = calculateDistance(x, y, holePosition.x, holePosition.y);
    currentSwings.push({ address: address.substring(0, 18) + "...", distance: distance.toFixed(2) });

    // Sort by distance (closest first)
    currentSwings.sort((a, b) => a.distance - b.distance);

    // Update leaderboard display
    leaderboardList.innerHTML = ""; // Clear previous entries
    currentSwings.slice(0, 5).forEach((swing, index) => { // Show top 5
        const li = document.createElement("li");
        li.textContent = `#${index + 1}: ${swing.address} - ${swing.distance} units away`;
        leaderboardList.appendChild(li);
    });

    leaderboardDiv.style.display = "block";
}

// --- Utility Functions ---
function updateStatus(message) {
    statusDiv.textContent = "Status: " + message;
    console.log("Status:", message);
}

// --- Event Listeners ---
connectWalletBtn.addEventListener("click", connectWallet);
swingBtn.addEventListener("click", takeSwing);

// --- Initial Setup ---
function init() {
    drawGame();
    updateStatus("Please connect your wallet to play.");
}

init();

