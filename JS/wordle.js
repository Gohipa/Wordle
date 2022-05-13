document.addEventListener("DOMContentLoaded", crearTablero)

function crearTablero() {
    const tableroJuego = document.getElementById("tablero")

    for (let i = 0; i < 30; i++) {
        let casilla = document.createElement("div");
        casilla.classList.add("casilla");
        casilla.setAttribute("id", i+1);
        tableroJuego.appendChild(casilla);
    }
}