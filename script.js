const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const intro = document.getElementById("intro");
const letterSection = document.getElementById("letterSection");
const mapSection = document.getElementById("mapSection");
const finalSection = document.getElementById("finalSection");

const mapSecret = document.getElementById("mapSecret");
const swearButton = document.getElementById("swearButton");


/* =========================================
   UTILIDAD — cambiar de página con animación
========================================= */

function showPage(next, current) {
    if (current) {
        current.classList.add("hidden");
        current.classList.remove("fade-in");
    }
    next.classList.remove("hidden");
    next.classList.add("fade-in");
}


/* =========================================
   PANTALLA 1 → 2 : Abrir carta
========================================= */

function openLetter() {
    showPage(letterSection, intro);
    musicBtn.classList.add("show");

    music.volume = 0.55;
    music.play()
        .then(() => {
            musicBtn.textContent = "🎵 Música: ON";
        })
        .catch(() => {
            musicBtn.textContent = "🎵 Tocar música";
        });

    createMagic(55);
}


/* =========================================
   PANTALLA 2 → 3 : Ir al mapa
========================================= */

function goToMap() {
    showPage(mapSection, letterSection);
    createMagic(25);
}


/* =========================================
   MÚSICA
========================================= */

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.textContent = "🎵 Música: ON";
    } else {
        music.pause();
        musicBtn.textContent = "🎵 Música: OFF";
    }
}


/* =========================================
   REVELAR EL MAPA (dentro de la misma página)
========================================= */

function revealMap() {
    if (mapSecret.classList.contains("revealed")) return;

    mapSecret.classList.add("revealed");
    createMagic(35);
    createFootprints();

    swearButton.textContent = "✦ Los secretos han sido revelados ✦";
    swearButton.style.cursor = "default";
    swearButton.style.textDecoration = "none";
}


/* =========================================
   PANTALLA 3 → 4 : Mensaje final
========================================= */

function showFinal() {
    showPage(finalSection, mapSection);
    createMagic(40);
}


/* =========================================
   PARTÍCULAS MÁGICAS
========================================= */

function createMagic(amount) {
    const symbols = ["✨", "✦", "✧", "⭐", "🪄"];

    for (let i = 0; i < amount; i++) {
        setTimeout(() => {
            const spark = document.createElement("div");
            spark.className = "spark";
            spark.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            spark.style.left = Math.random() * 100 + "vw";
            spark.style.top = (45 + Math.random() * 50) + "vh";
            spark.style.fontSize = (10 + Math.random() * 15) + "px";
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 2600);
        }, i * 45);
    }
}


/* =========================================
   HUELLAS
========================================= */

function createFootprints() {
    for (let i = 0; i < 18; i++) {
        setTimeout(() => {
            const footprint = document.createElement("div");
            footprint.className = "footprint";
            footprint.textContent = "👣";
            footprint.style.left = (18 + i * 3.5) + "%";
            footprint.style.top = (62 + Math.sin(i) * 9) + "%";
            footprint.style.transform = "rotate(" + (i % 2 ? 15 : -15) + "deg)";
            document.body.appendChild(footprint);
            setTimeout(() => footprint.remove(), 1900);
        }, i * 110);
    }
}


/* =========================================
   TECLA ENTER
========================================= */

swearButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        revealMap();
    }
});