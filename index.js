const contenedor = document.getElementById("test");
const botonRes = document.getElementById("boton");
const resultadoTest = document.getElementById("resultado");


const preguntas = [
  {
    pregunta: "1. Quien es Darth Vader?",
    respuestas: {
      a: "Padre de Luke",
      b: "Padre del Wookie",
      c: "Padre de Luke y Leia",
    },
    respuestaCorrecta: "c",
  },
  {
    pregunta: "2. Como se creo C3PO?",
    respuestas: {
      a: "Lo creo Anakinit",
      b: "Es de Jabba",
      c: "BobbaFet lo creo",
    },
    respuestaCorrecta: "a",
  },
  {
    pregunta: "3. Quien es R2D2?",
    respuestas: {
      a: "Un robot",
      b: "El mejor amigo de Obi-wan",
      c: "un Cyborg",
      d: "Un ente",
    },
    respuestaCorrecta: "b",
  },
  {
    pregunta: "4. Leia y Luke son Hermanos?",
    respuestas: {
      a: "Si",
      b: "No" ,
      c: "Tal Vez",
      d: "Imposible",
    },
    respuestaCorrecta: "a",
  },
  {
    pregunta: "5. Darth Sirius esta muerto?",
    respuestas: {
      a: "Si",
      b: "No" ,
      c: "Tal Vez",
      d: "Imposible",
    },
    respuestaCorrecta: "b",
  }
]




function mostrarTest(val) {
  const preguntasYrespuestas = [];
  
  preguntas.forEach((preguntaActual, numeroDePregunta) => {
    const respuestas = [];
    let letraRespuesta = 0;

    for (letraRespuesta in preguntaActual.respuestas) {
      respuestas.push(
        `
        <label class="quizz-title">
                  <input type="radio" name="${numeroDePregunta}" value="${letraRespuesta}" />
                  ${letraRespuesta} : ${preguntaActual.respuestas[letraRespuesta]}
              </label>`
      );
    }

    preguntasYrespuestas.push(
      `<div class="quizz-title cuestion">${preguntaActual.pregunta}</div>
          <div class="test--card respuestas"> ${respuestas.join("")} </div>
          `
    );
  });

  contenedor.innerHTML = preguntasYrespuestas.join("");
}

mostrarTest();

function mostrarResultado() {
  const respuestas = contenedor.querySelectorAll(".respuestas");
  let respuestasCorrectas = 0;
  preguntas.forEach((preguntaActual, numeroDePregunta) => {
    const todasLasRespuestas = respuestas[numeroDePregunta];
    const checkboxRespuestas = `input[name='${numeroDePregunta}']:checked`;
    const respuestaElegida = (
      todasLasRespuestas.querySelector(checkboxRespuestas) || {}
    ).value;
    

    if (respuestaElegida === preguntaActual.respuestaCorrecta) {
      respuestasCorrectas++;

      respuestas[numeroDePregunta].style.color = "blue";
    } else {
      respuestas[numeroDePregunta].style.color = "red";
    }
  });

  resultadoTest.innerHTML =
    "Usted ha acertado " +
    respuestasCorrectas +
    " preguntas de un total de " +
    preguntas.length;
}

botonRes.addEventListener("click", mostrarResultado);