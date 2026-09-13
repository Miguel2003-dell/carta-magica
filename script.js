const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const intro = document.getElementById("intro");
const letterSection = document.getElementById("letterSection");

const mapSecret = document.getElementById("mapSecret");

const mapSection = document.getElementById("mapSection");
const finalSection = document.getElementById("finalSection");

const swearButton = document.getElementById("swearButton");


/* =========================================
   ABRIR CARTA
========================================= */

function openLetter() {

    intro.classList.add("hidden");

    letterSection.classList.add("show");

    musicBtn.classList.add("show");


    /*
     * El usuario acaba de hacer clic,
     * por lo que el navegador permite
     * iniciar la música.
     */

    music.volume = 0.55;


    music.play()
        .then(() => {

            musicBtn.textContent =
                "🎵 Música: ON";

        })
        .catch(() => {

            musicBtn.textContent =
                "🎵 Tocar música";

        });


    /*
     * Partículas mágicas
     */

    createMagic(55);


    /*
     * Llevar al usuario a la carta.
     */

    setTimeout(() => {

        letterSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 250);
}


/* =========================================
   MÚSICA
========================================= */

function toggleMusic() {

    if (music.paused) {

        music.play();

        musicBtn.textContent =
            "🎵 Música: ON";

    } else {

        music.pause();

        musicBtn.textContent =
            "🎵 Música: OFF";
    }
}


/* =========================================
   REVELAR EL MAPA
========================================= */

function revealMap() {

    /*
     * Evitamos que la animación
     * se pueda activar varias veces.
     */

    if (mapSecret.classList.contains("revealed")) {
        return;
    }


    /*
     * Revelar el contenido secreto.
     */

    mapSecret.classList.add("revealed");


    /*
     * Efectos mágicos.
     */

    createMagic(35);

    createFootprints();


    /*
     * Cambiar la frase del botón.
     */

    swearButton.textContent =
        "✦ Los secretos han sido revelados ✦";


    swearButton.style.cursor =
        "default";


    swearButton.style.textDecoration =
        "none";
}


/* =========================================
   MENSAJE FINAL
========================================= */

function showFinal() {

    /*
     * Ocultar el mapa.
     */

    mapSection.classList.add("hidden");


    /*
     * Mostrar mensaje final.
     */

    finalSection.classList.remove("hidden");


    /*
     * Efectos mágicos.

     */

    createMagic(40);


    /*
     * Esperamos un poco antes de
     * llevar al usuario al mensaje.
     */

    setTimeout(() => {

        finalSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 150);
}


/* =========================================
   PARTÍCULAS MÁGICAS
========================================= */

function createMagic(amount) {

    const symbols = [
        "✨",
        "✦",
        "✧",
        "⭐",
        "🪄"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(() => {

            const spark =
                document.createElement("div");


            spark.className =
                "spark";


            spark.textContent =
                symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
                ];


            spark.style.left =
                Math.random() *
                100 +
                "vw";


            spark.style.top =
                (
                    45 +
                    Math.random() *
                    50
                ) +
                "vh";


            spark.style.fontSize =
                (
                    10 +
                    Math.random() *
                    15
                ) +
                "px";


            document.body.appendChild(
                spark
            );


            setTimeout(() => {

                spark.remove();

            }, 2600);

        }, i * 45);
    }
}


/* =========================================
   HUELLAS
========================================= */

function createFootprints() {

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        setTimeout(() => {

            const footprint =
                document.createElement("div");


            footprint.className =
                "footprint";


            footprint.textContent =
                "👣";


            footprint.style.left =
                (
                    18 +
                    i * 3.5
                ) +
                "%";


            footprint.style.top =
                (
                    62 +
                    Math.sin(i) * 9
                ) +
                "%";


            footprint.style.transform =
                "rotate(" +
                (i % 2 ? 15 : -15) +
                "deg)";


            document.body.appendChild(
                footprint
            );


            setTimeout(() => {

                footprint.remove();

            }, 1900);

        }, i * 110);
    }
}


/* =========================================
   TECLA ENTER
========================================= */

swearButton.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            revealMap();

        }

    }
);