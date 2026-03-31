const startBtn = document.getElementById("startBtn");
const blueScreen = document.getElementById("blueScreen");
const percentText = document.getElementById("percent");
const matrix = document.getElementById("matrix");

// START
startBtn.onclick = async () => {
    document.documentElement.requestFullscreen();

    // 📳 VIBRATION
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

    // 🔊 VOICE
    let msg = new SpeechSynthesisUtterance("Warning. Your system has been hacked.");
    speechSynthesis.speak(msg);

    // 📸 CAMERA PERMISSION
    try {
        await navigator.mediaDevices.getUserMedia({ video: true });
    } catch(e) {}


    document.getElementById("startScreen").style.display = "none";
    blueScreen.style.display = "block";

    let p = 0;
    let interval = setInterval(() => {
        p++;
        percentText.innerText = p + "% complete";
        if (p >= 100) {
            clearInterval(interval);
            setTimeout(startMatrix, 1000);
        }
    }, 50);
};

function startMatrix() {
    blueScreen.style.display = "none";
    matrix.classList.remove("hidden");

    let ctx = matrix.getContext("2d");

    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;

    let letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    letters = letters.split("");

    let fontSize = 14;
    let columns = matrix.width / fontSize;

    let drops = [];
    for (let x = 0; x < columns; x++)
        drops[x] = 1;

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, matrix.width, matrix.height);

        ctx.fillStyle = "#0f0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            let text = letters[Math.floor(Math.random()*letters.length)];
            ctx.fillText(text, i*fontSize, drops[i]*fontSize);

            if (drops[i]*fontSize > matrix.height && Math.random() > 0.975)
                drops[i] = 0;

            drops[i]++;
        }
    }

    setInterval(draw, 50);

    setTimeout(() => {
        alert("😂 APRIL FOOL! Don't worry Your system is safe!");
        location.reload();
    }, 6000);
}

document.addEventListener("keydown", () => {
    location.reload();
});