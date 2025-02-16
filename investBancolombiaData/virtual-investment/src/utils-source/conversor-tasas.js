"use strict";

// var capital = document.getElementById('periodicidad-nominal').val;
// console.log(capital);

var interes1;
var periodicidad1;
var capitalizacion1;

var interes2;
var periodicidad2;
var capitalizacion2;

var interes3;
var periodicidad3;

var interes4;
var periodicidad4;

function getInteres1() {
  interes1 = document.getElementById("interes").value / 100;
  if (interes1 && periodicidad1 && capitalizacion1) {
    operacion1(interes1, periodicidad1, capitalizacion1);
  }
}

function getSelects1() {
  /* Para obtener el valor */
  periodicidad1 = document.getElementById("periodicidad-deseada").value;
  capitalizacion1 = document.getElementById("capitalizacion").value;
  if (interes1 && periodicidad1 && capitalizacion1) {
    operacion1(interes1, periodicidad1, capitalizacion1);
  }
}

/* primera operación*/
function operacion1(interes1, periodicidad1, capitalizacion1) {
  if (interes1 && periodicidad1 && capitalizacion1) {
    var one = (1 + interes1 / capitalizacion1) ** capitalizacion1;
    var subtotal = one ** (1 / periodicidad1) - 1;
    var total = subtotal * 100;
    var imprimir = total.toFixed(2);
    console.log(imprimir + " %");
    document.getElementById("respuesta").innerHTML = imprimir + " %";
  }
}

/*------------------------------------------------------------------------------------------------------*/

function getInteres2() {
  interes2 = document.getElementById("interes2").value / 100;
  if (interes2 && periodicidad2 && capitalizacion2) {
    operacion2(interes2, periodicidad2, capitalizacion2);
  }
}

function getSelects2() {
  /* Para obtener el valor */
  periodicidad2 = document.getElementById("periocidad2").value;
  capitalizacion2 = document.getElementById("capitalizacion2").value;
  if (interes2 && periodicidad2 && capitalizacion2) {
    operacion2(interes2, periodicidad2, capitalizacion2);
  }
}
/* oPERACIÓN NÚMERO 2 */
function operacion2(interes2, periodicidad2, capitalizacion2) {
  if (interes2 && periodicidad2 && capitalizacion2) {
    var one = (1 + interes2) ** periodicidad2;
    var subtotal = (one ** (1 / capitalizacion2) - 1) * capitalizacion2;
    var total = subtotal * 100;
    var imprimir = total.toFixed(2);
    console.log(imprimir + " %");
    document.getElementById("respuesta2").innerHTML = imprimir + " %";
  }
}

/*------------------------------------------------------------------------------------------------------*/

function getInteres3() {
  interes3 = document.getElementById("interes3").value / 100;
  if (interes3 && periodicidad3) {
    operacion3(interes3, periodicidad3);
  }
}

function getSelects3() {
  /* Para obtener el valor */
  periodicidad3 = document.getElementById("periocidad3").value;
  if (interes3 && periodicidad3) {
    operacion3(interes3, periodicidad3);
  }
}
function operacion3(interes3, periodicidad3) {
  if (interes3 && periodicidad3) {
    var one = 1 + interes3;
    var subtotal = one ** (1 / periodicidad3) - 1;
    var total = subtotal * 100;
    var imprimir = total.toFixed(2);
    console.log(imprimir + " %");
    document.getElementById("respuesta3").innerHTML = imprimir + " %";
  }
}

/*------------------------------------------------------------------------------------------------------*/

function getInteres4() {
  interes4 = document.getElementById("interes4").value / 100;
  if (interes4 && periodicidad4) {
    operacion4(interes4, periodicidad4);
  }
}

function getSelects4() {
  /* Para obtener el valor */
  periodicidad4 = document.getElementById("periocidad4").value;
  if (interes4 && periodicidad4) {
    operacion4(interes4, periodicidad4);
  }
}
function operacion4(interes4, periodicidad4) {
  if (interes4 && periodicidad4) {
    var one = 1 + interes4;
    var subtotal = one ** (1 / periodicidad4) - 1;
    var total = subtotal * 100;
    var imprimir = total.toFixed(2);
    console.log(imprimir + " %");
    document.getElementById("respuesta4").innerHTML = imprimir + " %";
  }
}
//# sourceMappingURL=main.js.map

document
  .querySelector("#btntoolUno")
  .addEventListener("click", function (event) {
    scrollTo(
      document.documentElement,
      document.querySelector("#toolUno").offsetHeight + 400,
      1000
    );
  });
document
  .querySelector("#btntoolDos")
  .addEventListener("click", function (event) {
    scrollTo(
      document.documentElement,
      document.querySelector("#toolDos").offsetHeight + 1100,
      800
    );
  });
document
  .querySelector("#btntoolTres")
  .addEventListener("click", function (event) {
    scrollTo(
      document.documentElement,
      document.querySelector("#toolTres").offsetHeight + 1600,
      800
    );
  });
document
  .querySelector("#btntoolCuatro")
  .addEventListener("click", function (event) {
    scrollTo(
      document.documentElement,
      document.querySelector("#toolCuatro").offsetHeight + 2000,
      800
    );
  });

function scrollTo(element, to, duration) {
  var start = element.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 20;

  var animateScroll = function () {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
//# sourceMappingURL=main.js.map
