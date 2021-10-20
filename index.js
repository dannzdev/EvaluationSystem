const contenedor = document.getElementById("test");
const botonRes = document.getElementById("boton");
const resultadoTest = document.getElementById("resultado");


const API = "http://localhost:3000/preguntas";


const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
      console.error(error);
  }
}

const preguntas = await getData(API)

async function mostrarTest() {
  const preguntasYrespuestas = [];
  
  preguntas.forEach((preguntaActual, numeroDePregunta) => {
    const respuestas = [];
    let letraRespuesta = 0;

    for (letraRespuesta in preguntaActual.respuestas) {
      //Array Respuestas
      respuestas.push(
      `<label class="quizz-title">
      <input type="radio" name="${numeroDePregunta}" value="${letraRespuesta}" />
      <p>${letraRespuesta} : ${preguntaActual.respuestas[letraRespuesta]}</p>
      </label>`
      );
    }
      //Array Preguntas + Respuestas
      preguntasYrespuestas.push(
      `<div class="quizz-title cuestion">${preguntaActual.pregunta}</div>
        <div class="test--card respuestas">${respuestas.join("")} </div>
          `
    );
  });
  contenedor.innerHTML = preguntasYrespuestas.join("");
}

mostrarTest();

async function mostrarResultado() {
  let respuestas = contenedor.querySelectorAll(".respuestas");
  let respuestasCorrectas = 0;

  preguntas.forEach((preguntaActual, numeroDePregunta) => {
    const todasLasRespuestas = respuestas[numeroDePregunta];
    
    const checkboxRespuestas = `input[name='${numeroDePregunta}']:checked`;
    console.log(checkboxRespuestas);
    const respuestaElegida = (todasLasRespuestas.querySelector(checkboxRespuestas) || {}
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