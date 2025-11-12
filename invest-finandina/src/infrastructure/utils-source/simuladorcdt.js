var app = angular.module("simuladorCDT", []);
app.controller("CdtController", ["$scope", "$window", "$filter", "$location", function ($scope, $window, $filter) {
    firebase.initializeApp({
        apiKey: "AIzaSyC8vrdhMCthhxAw7CwEfN3OnVWPbHNFVpk",
        authDomain: "simuladores-75631.firebaseapp.com.firebaseapp.com",
        databaseURL: "https://simuladores-75631.firebaseio.com",
        storageBucket: "simuladores-75631.appspot.com.appspot.com"
    });

    $scope.Math = window.Math;
    $scope.data = {
        montoInversion: "",
        tasaEA: "",
        tasaEA_texto: "",
        plazoDias: "",
        fuente: 4,
        ica: 0,
        modalidad: "V",
        montoInteresNeto: "",
        totalInversion: "",
        errormonto: "",
        errordias: "",
        mindias: 90,
        maxdias: 540,
        minMontoInversion: 100000,
        maxMontoInversion: 500000000,
        cdtAutogestionado_montoHasta: 100000000,
        lstTasas: [
            { plazo: "90", plazoHasta: "119", tasa: "9.50", monto: 100000, montoHasta: 20000000 },
            { plazo: "120", plazoHasta: "179", tasa: "9.50", monto: 100000, montoHasta: 20000000 },
            { plazo: "180", plazoHasta: "359", tasa: "10.00", monto: 100000, montoHasta: 20000000 },
            { plazo: "360", plazoHasta: "540", tasa: "9.50", monto: 100000, montoHasta: 20000000 },
            { plazo: '540', plazoHasta: Infinity, tasa: '7.00', monto: 100000, montoHasta: 20000000 },
            { plazo: "90", plazoHasta: "119", tasa: "9.50", monto: 20000001, montoHasta: 100000000 },
            { plazo: "120", plazoHasta: "179", tasa: "9.50", monto: 20000001, montoHasta: 100000000 },
            { plazo: "180", plazoHasta: "359", tasa: "10.00", monto: 20000001, montoHasta: 100000000 },
            { plazo: "360", plazoHasta: "540", tasa: "9.50", monto: 20000001, montoHasta: 100000000 },
            { plazo: '540', plazoHasta: Infinity, tasa: '7.00', monto: 20000001, montoHasta: 100000000 }
        ],
        ShowModal: false,
        nombre: "",
        celular: "",
        email: "",
        origen: ""
    };

    $scope.init = function () {
        let t = window.location.search.substring(1).split("&");
        for (let o = 0; o < t.length; o++) {
            let e = t[o].split("=");
            if ("origen" == e[0].toLowerCase()) {
                $scope.data.origen = e[1];
                break;
            }
        }
    };

    $scope.CalcularTasaEA = function (t, o) {
        var e = $scope.data.lstTasas.find((a => t >= a.plazo && t <= a.plazoHasta && o >= a.monto && o <= a.montoHasta));
        if (null != e) {
            $scope.data.tasaEA = e.tasa;
            $scope.data.tasaEA_texto = e.tasa + "%";
        } else {
            var n = 0;
            var r = $scope.data.lstTasas.filter((a => t >= a.plazo && t <= a.plazoHasta));
            if (r.length > 0) {
                n = r[0].tasa;
                for (var i = 1; i < r.length; i++) {
                    var s = r[i].tasa;
                    if (s > n) {
                        n = s;
                    }
                }
            }
            $scope.data.tasaEA = n;
            $scope.data.tasaEA_texto = n + "%";
        }
    };

    $scope.calculos = function () {
        if (($scope.data.tasaEA = "", $scope.data.tasaEA_texto = "", $scope.data.errormonto = "", $scope.data.errordias = "", $scope.data.montoInteresNeto = "", $scope.data.totalInversion = "", "" == $scope.data.montoInversion)) {
            return $scope.data.errormonto = "Ingresa el monto de tu inversión", !1;
        }
        if ((_montoInversion = $scope.data.montoInversion.replace(/\,/g, ""), _montoInversion < $scope.data.minMontoInversion)) {
            return $scope.data.errormonto = "El monto mínimo de tu inversión es " + $filter("currency")($scope.data.minMontoInversion, "$", 0), !1;
        }
        if (_montoInversion > $scope.data.maxMontoInversion) {
            return $scope.data.errormonto = "El monto máximo para tu inversión es " + $filter("currency")($scope.data.maxMontoInversion, "$", 0), !1;
        }
        if ("" == $scope.data.plazoDias || null == $scope.data.plazoDias) {
            return $scope.data.errordias = "Ingresa el plazo en días, mínimo " + $scope.data.mindias, !1;
        }
        if ($scope.data.plazoDias < $scope.data.mindias) {
            return $scope.data.errordias = "Ingresa el plazo en días, mínimo " + $scope.data.mindias, !1;
        }
        /*if ($scope.data.plazoDias > $scope.data.maxdias) {
            return $scope.data.errordias = "Ingresa el plazo en días, máximo " + $scope.data.maxdias, !1;
        }*/
        if (($scope.CalcularTasaEA($scope.data.plazoDias, _montoInversion), "" == $scope.data.tasaEA)) {
            return $scope.data.errordias = "La tasa esta vacia", !1;
        }
        var t;
        t = $scope.cdtNormal(_montoInversion), $scope.data.montoInteresNeto = Math.round(t), $scope.data.totalInversion = parseInt(_montoInversion) + parseInt($scope.data.montoInteresNeto);
        let e = $scope.calcularFechaFin($scope.data.plazoDias),
            n = e.getFullYear(),
            r = (e.getMonth() + 1).toString().padStart(2, "0"),
            i = e.getDate().toString().padStart(2, "0");
        console.log(e, "Fecha final calculada"), $scope.data.fechaFinal = i + "/" + r + "/" + n
    };

    $scope.calcularFechaFin = function (a) {
        let t = new Date,
            o = t.getFullYear(),
            e = t.getMonth(),
            n = t.getDate(),
            r = Math.floor(a / 30);
        return new Date(o, e + r, n + a % 30)
    };

    $scope.CalcularFecha = function (a, t) {
        var o = a.getDate(),
            e = a.getMonth() + 1,
            n = a.getFullYear(),
            r = t.getDate(),
            i = t.getMonth() + 1,
            s = t.getFullYear(),
            l = i - e;
        return r > 30 && 0 != l && (r = 30), a.getMonth() + 1 != e && 0 != l && (o = 30), dia_dif = r - o, ano_dif = s - n, dif = 360 * ano_dif + 30 * l + dif, fn_dias360 = dif, console.log(fn_dias360, "mi calculo"), totalDias
    };

    $scope.TasaCalculaNominal = function (a, t) {
        var o = 360 / t,
            e = o * (Math.pow(1 + a, 1 / o) - 1);
        return isNaN(e) && (e = 0), e
    };

    $scope.redondeaSeisDecimas = function (a) {
        return Math.round(1e6 * a) / 1e6
    };

    $scope.cdtNormal = function (t) {
        var o = $scope.data.tasaEA / 100,
            e = $scope.TasaCalculaNominal(o, $scope.data.plazoDias),
            n = t * $scope.redondeaSeisDecimas(e) / (360 / $scope.data.plazoDias);
        return n - (n * ($scope.data.fuente / 100) + n * ($scope.data.ica / 100))
    };

    $scope.cdtDesmaterializado = function () {
        $scope.data.tasaEA;
        var t = Math.round($scope.data.tasaEA / 360 * $scope.data.plazoDias).toFixed(6),
            o = Math.round(t * $scope.data.montoInversion),
            e = o - (Math.round(o * ($scope.data.fuente / 100)) + Math.round(o * ($scope.data.ica / 100)));
        return $scope.data.montoInteresNeto = e, e
    };

    $scope.guardarInfo = function () {
        if (($scope.data.errornombre = "", $scope.data.errorcel = "", $scope.data.erroremail = "", "" == $scope.data.nombre)) {
            return $scope.data.errornombre = "Indica tu nombre y apellido", !1;
        }
        if (isNaN($scope.data.celular) || !/^3[\d]{9}$/.test($scope.data.celular)) {
            return $scope.data.errorcel = "Indica un número con el formato correcto", !1;
        }
        if ("" == $scope.data.email) {
            return $scope.data.erroremail = "Indica tu correo electrónico", !1;
        }
        if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($scope.data.email)) {
            return $scope.data.erroremail = "Indica una dirección de correo electrónico con el formato correcto", !1;
        }
        $scope.writeFirebase() && ($scope.data.ShowModal = !0)
    };

    $scope.writeFirebase = function () {
        var t = localStorage.getItem("simulacion"),
            o = JSON.parse(t),
            e = !1;
        try {
            var n = {
                DatosPersonales: {
                    nombre: $scope.data.nombre,
                    celular: $scope.data.celular,
                    email: $scope.data.email
                },
                Simulacion: o
            };
            e = firebase.database().ref("cdt").push(n)
        } catch (a) {
            console.log(a)
        }
        return localStorage.removeItem("simulacion"), e
    };

    $scope.contactenos = function () {
        if ("" != $scope.data.montoInversion && "" != $scope.data.plazoDias) {
            _montoInversion = $scope.data.montoInversion.replace(/\,/g, "");
            var o = {
                montoInversion: _montoInversion,
                tasaEA: $scope.data.tasaEA,
                periodo: "dias",
                plazoDias: $scope.data.plazoDias,
                retencionFuente: $scope.data.fuente,
                retencionIca: $scope.data.ica,
                montoInteresNeto: $scope.data.montoInteresNeto,
                totalInversion: $scope.data.totalInversion,
                fechaFinal: $scope.fechaFinal
            };
            localStorage.setItem("simulacion", JSON.stringify(o))
        }
        _montoInversion <= $scope.data.cdtAutogestionado_montoHasta ? $window.location.href = "" != $scope.data.origen ? `https://transacciones.bancofinandina.com/BP/cdt-digital?Origen=${$scope.data.origen}` : "https://transacciones.bancofinandina.com/BP/cdt-digital?Origen=simuladorSP" : _montoInversion > $scope.data.cdtAutogestionado_montoHasta ? $window.location.href = "" != $scope.data.origen ? `https://bancofinandina.com/productos/cdts/abrir-cdt?origen=${$scope.data.origen}&valorInvertir=${_montoInversion}&plazoInvertir=${$scope.data.plazoDias}#ingresar-formulario` : "https://bancofinandina.com/productos/cdts/abrir-cdt?origen=CDDigitalSimulador_mas20MM&valorInvertir=" + _montoInversion + "&plazoInvertir=" + $scope.data.plazoDias + "#ingresar-formulario" : $window.location.href = "https://bancofinandina.com/productos/cdts/abrir-cdt#ingresar-formulario"
    };

    $scope.showindex = function () {
        $window.location.href = "index.html"
    };

    $scope.day = function (t) {
        "" == $scope.data.plazoDias && ($scope.data.plazoDias = 90), t ? $scope.data.plazoDias += 1 : $scope.data.plazoDias > 0 ? $scope.data.plazoDias -= 1 : $scope.data.plazoDias = 0, $scope.calculos()
    }
}]);

app.directive("mileskeypress", (function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (a, t, o, e) {
            var n = function (a) {
                if (void 0 === a) return "";
                var t = (a = a.replace(/\,/g, "")).replace(/[^0-9,]/g, "");
                if (t !== a) e.$setViewValue(t), e.$render();
                else {
                    if (t > 999) {
                        for (var o = parseInt(t).toString().split(""), n = 0, r = [], i = o.length - 1, s = i; s >= 0; s--) {
                            var l = o[s].replace(/\,/g, "");
                            "" != l && (i >= 3 ? 2 == n && 0 != s ? (r[s] = "," + l, n = 0) : (r[s] = l, n += 1) : r[s] = l)
                        }
                        t = r.join("")
                    }
                    e.$setViewValue(t), e.$render(), e.$setValidity("onlyNumbers", !0)
                }
                return t
            };
            e.$parsers.unshift(n), e.$parsers.push(n), o.$observe("onlyNumbers", (function () {
                n(e.$ViewValue)
            }))
        }
    }
})).directive("letterkeypress", (function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (a, t, o, e) {
            var n = function (a) {
                if (void 0 === a) return "";
                var t = a.replace(/[^A-Za-z ]/g, "");
                return t !== a ? (e.$setViewValue(t), e.$render()) : e.$setValidity("onlyLetters", !0), t
            };
            e.$parsers.unshift(n), e.$parsers.push(n), o.$observe("onlyLetters", (function () {
                n(e.$ViewValue)
            }))
        }
    }
})).directive("numberkeypress", (function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (a, t, o, e) {
            var n = function (a) {
                if (void 0 === a) return "";
                var t = a.replace(/[^0-9]/g, "");
                return t !== a ? (e.$setViewValue(t), e.$render()) : e.$setValidity("onlyNumbers", !0), t
            };
            e.$parsers.unshift(n), e.$parsers.push(n), o.$observe("onlyLetters", (function () {
                n(e.$ViewValue)
            }))
        }
    }
}));