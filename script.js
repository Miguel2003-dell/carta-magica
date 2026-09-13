```javascript
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

const intro = document.getElementById("intro");
const letter = document.getElementById("letter");
const mapSection = document.getElementById("mapSection");
const finalSection = document.getElementById("finalSection");

const openLetterButton = document.getElementById("openLetter");
const continueToMapButton = document.getElementById("continueToMap");

const swearButton = document.getElementById("swearButton");
const mapSecret = document.getElementById("mapSecret");

const finalButton = document.getElementById("finalButton");


/* =========================================
   ABRIR CARTA
========================================= */

openLetterButton.addEventListener("click", async () => {

    intro.classList.add("hidden");

    letter.classList.remove("hidden");

    musicButton.classList.remove("hidden");

    /*
     * La música empieza después del click,
     * así que el navegador permite reproducirla.
     */

    music.volume = 0.55;

    try {
        await music.play();

        musicButton.textContent = "🎵 Música: ON";

    } catch (error) {

        console.log("No se pudo iniciar la música:", error);

        musicButton.textContent = "🎵 Música";
    }

    createMagic(50);

    /*
     * Nos aseguramos de que empiece
     * desde arriba de la carta.
     */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* =========================================
   BOTÓN DE MÚSICA
========================================= */

musicButton.addEventListener("click", async () => {

    if (music.paused) {

        try {
            await music.play();

            musicButton.textContent = "🎵 Música: ON";

        } catch (error) {

            console.log(error);
        }

    } else {

        music.pause();

        musicButton.textContent = "🔇 Música: OFF";
    }
});


/* =========================================
   CARTA → MAPA
========================================= */

continueToMapButton.addEventListener("click", () => {

    /*
     * Quitamos completamente la carta.
     */

    letter.classList.add("hidden");

    /*
     * Mostramos el mapa.
     */

    mapSection.classList.remove("hidden");

    /*
     * Volvemos al principio de la nueva etapa.
     */

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    createMagic(35);
});


/* =========================================
   JURAMENTO DEL MAPA
========================================= */

swearButton.addEventListener("click", () => {

    /*
     * Evita que se pueda activar varias veces.
     */

    if (!mapSecret.classList.contains("hidden")) {
        return;
    }

    mapSecret.classList.remove("hidden");

    swearButton.textContent =
        "✦ Los secretos han sido revelados ✦";

    swearButton.disabled = true;

    swearButton.style.cursor = "default";

    swearButton.style.opacity = "0.6";

    createMagic(70);

    createFootprints();
});


/* =========================================
   REVELAR MENSAJE FINAL
========================================= */

finalButton.addEventListener("click", () => {

    /*
     * Desaparece completamente el mapa.
     */

    mapSection.classList.add("hidden");

    /*
     * Aparece el mensaje final.
     */

    finalSection.classList.remove("hidden");

    /*
     * Regresamos arriba de la nueva pantalla.
     */

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    createMagic(100);
});


/* =========================================
   PARTÍCULAS MÁGICAS
========================================= */

function createMagic(amount = 30) {

    const symbols = [
        "✨",
        "✦",
        "✧",
        "⭐",
        "🪄"
    ];

    for (let i = 0; i < amount; i++) {

        const particle = document.createElement("div");

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.position = "fixed";

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.top =
            Math.random() * 100 + "vh";

        particle.style.pointerEvents = "none";

        particle.style.zIndex = "9999";

        particle.style.fontSize =
            (Math.random() * 1.2 + 0.7) + "rem";

        particle.style.opacity = "0";

        particle.style.transition =
            "all 1.8s ease-out";

        document.body.appendChild(particle);


        requestAnimationFrame(() => {

            particle.style.opacity =
                Math.random() * 0.7 + 0.3;

            particle.style.transform =
                `translate(
                    ${(Math.random() - 0.5) * 200}px,
                    ${(Math.random() - 0.5) * 200}px
                )`;
        });


        setTimeout(() => {

            particle.remove();

        }, 1900);
    }
}


/* =========================================
   HUELLAS DEL MAPA
========================================= */

function createFootprints() {

    for (let i = 0; i < 18; i++) {

        const footprint =
            document.createElement("div");

        footprint.textContent = "👣";

        footprint.style.position = "fixed";

        footprint.style.left =
            Math.random() * 90 + 5 + "vw";

        footprint.style.top =
            Math.random() * 80 + 10 + "vh";

        footprint.style.pointerEvents = "none";

        footprint.style.opacity = "0";

        footprint.style.zIndex = "9998";

        footprint.style.fontSize = "1.2rem";

        footprint.style.transition =
            "opacity 0.8s ease";

        document.body.appendChild(footprint);

        setTimeout(() => {

            footprint.style.opacity = "0.7";

        }, i * 80);

        setTimeout(() => {

            footprint.style.opacity = "0";

        }, 2500 + i * 80);

        setTimeout(() => {

            footprint.remove();

        }, 3500 + i * 80);
    }
}


/* =========================================
   TECLA ENTER
========================================= */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" &&
        !mapSection.classList.contains("hidden") &&
        mapSecret.classList.contains("hidden")
    ) {

        swearButton.click();
    }

});
```