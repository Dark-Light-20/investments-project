const _0x256fdf = _0x353c;
(function (_0x5527a3, _0x39a651) {
  const _0x2d2c1d = _0x353c,
    _0x190a4e = _0x5527a3();
  while (!![]) {
    try {
      const _0x2ec09a =
        parseInt(_0x2d2c1d(0x148)) / 0x1 +
        (parseInt(_0x2d2c1d(0x136)) / 0x2) *
          (-parseInt(_0x2d2c1d(0x112)) / 0x3) +
        (-parseInt(_0x2d2c1d(0x13a)) / 0x4) *
          (parseInt(_0x2d2c1d(0x15e)) / 0x5) +
        (-parseInt(_0x2d2c1d(0x13b)) / 0x6) *
          (parseInt(_0x2d2c1d(0x126)) / 0x7) +
        -parseInt(_0x2d2c1d(0x100)) / 0x8 +
        (-parseInt(_0x2d2c1d(0x111)) / 0x9) *
          (parseInt(_0x2d2c1d(0x142)) / 0xa) +
        parseInt(_0x2d2c1d(0x106)) / 0xb;
      if (_0x2ec09a === _0x39a651) break;
      else _0x190a4e["push"](_0x190a4e["shift"]());
    } catch (_0x255cc1) {
      _0x190a4e["push"](_0x190a4e["shift"]());
    }
  }
})(_0x453d, 0xeb384);
const MONTH = 0x1e;
let rate = 0x0,
  valueAmount = "0",
  valueDays = 0x0,
  validAmount = !0x1,
  validDays = !0x1;
function activeButtonSimulate() {
  const _0x14d6e5 = _0x353c;
  validAmount && validDays
    ? $(_0x14d6e5(0x15c))[_0x14d6e5(0xf8)](_0x14d6e5(0x13c), !0x1)
    : $(_0x14d6e5(0x15c))[_0x14d6e5(0xf8)](_0x14d6e5(0x13c), !0x0);
}
function _0x353c(_0x5dfea9, _0x4b24a6) {
  const _0x453dfa = _0x453d();
  return (
    (_0x353c = function (_0x353c50, _0x2d0c4e) {
      _0x353c50 = _0x353c50 - 0xf5;
      let _0x4d86d2 = _0x453dfa[_0x353c50];
      return _0x4d86d2;
    }),
    _0x353c(_0x5dfea9, _0x4b24a6)
  );
}
function addClickToSimulate() {
  const _0xbee320 = _0x353c;
  $(_0xbee320(0xfd))["click"](function (_0x2f92ae) {
    const _0x4b3feb = _0xbee320;
    (amount = valueAmount["toString"]()),
      (timeType = _0x4b3feb(0x119)),
      (timeLimit = valueDays),
      submitForm({
        amount: amount,
        timeType: timeType,
        timeLimit: timeLimit,
      }),
      _0x2f92ae[_0x4b3feb(0x128)]();
  });
}
function submitForm(_0x1dd071) {
  const _0x6ab81d = _0x353c;
  $[_0x6ab81d(0x11b)]({
    type: _0x6ab81d(0x145),
    url: _0x6ab81d(0x116),
    contentType: _0x6ab81d(0xf7),
    dataType: _0x6ab81d(0x115),
    async: !0x0,
    success: function (_0x90465) {
      calculateCDTIncome(_0x1dd071, _0x90465, function (_0x5dc2d2) {
        const _0x35c704 = _0x353c;
        $[_0x35c704(0x140)](_0x5dc2d2, function (_0x4f8174, _0x4595a1) {
          const _0x188560 = _0x35c704;
          let _0x354292 = $("." + _0x4f8174);
          _0x354292[_0x188560(0x105)] > 0x0 &&
            _0x354292[_0x188560(0x107)](_0x4595a1);
        }),
          jumpId("0"),
          0x0 !== rate
            ? ($(_0x35c704(0xf9))[_0x35c704(0x125)](_0x35c704(0x158)),
              $(_0x35c704(0x122))["addClass"](_0x35c704(0x11e)))
            : ((amount = ""),
              (timeType = ""),
              (timeLimit = ""),
              swal({
                button: "Aceptar",
                className: _0x35c704(0x130),
                title: _0x35c704(0x127),
                text: "Por\x20favor\x20inténtalo\x20en\x20unos\x20minutos",
              }));
      });
    },
    error: function (_0x1208c5, _0xd72dcd, _0x49a2ff) {
      const _0x3cd04c = _0x6ab81d;
      console[_0x3cd04c(0x12e)](_0x3cd04c(0x12e), _0x1208c5, _0x49a2ff);
    },
  });
}
function returnSimulate() {
  const _0x15b4d6 = _0x353c;
  (rate = 0x0),
    (valueAmount = "0"),
    (valueDays = 0x0),
    (validAmount = !0x1),
    (validDays = !0x1),
    $(_0x15b4d6(0x113))[0x0][_0x15b4d6(0x10a)](),
    $(_0x15b4d6(0x11f))[_0x15b4d6(0x10e)](_0x15b4d6(0x101)),
    $(_0x15b4d6(0x15c))[_0x15b4d6(0xf8)]("disabled", !0x0),
    $(_0x15b4d6(0xf9))[_0x15b4d6(0x10e)](_0x15b4d6(0x158)),
    $(".simulator__result")["removeClass"](_0x15b4d6(0x11e)),
    (document[_0x15b4d6(0x118)](_0x15b4d6(0xfe))[_0x15b4d6(0x146)] = ""),
    (document[_0x15b4d6(0x118)](_0x15b4d6(0x133))["value"] = []),
    (document["querySelector"]("#calendarInput")[_0x15b4d6(0x132)][
      "querySelector"
    ](_0x15b4d6(0x14f))[_0x15b4d6(0x146)] = ""),
    onIniInputs(),
    jumpId("0");
}
function calculateCDTIncome(_0x49dffb, _0x4a49fd, _0x5f5849) {
  const _0x2d57c7 = _0x353c;
  let _0x275b5f,
    _0x1866be,
    _0x306479,
    _0x4b0982,
    _0x163511 = _0x49dffb[_0x2d57c7(0x11d)],
    _0x5df256 = _0x49dffb["timeLimit"],
    _0x947dcd = formatValue(_0x49dffb["amount"], _0x2d57c7(0x129)),
    _0x2aeecf = _0x2d57c7(0x119) === _0x163511 ? "2" : "1",
    _0x4ca084 =
      "month" === _0x163511 ? parseInt(_0x5df256 * MONTH) : parseInt(_0x5df256),
    _0x1da664 = [];
  $[_0x2d57c7(0x140)](_0x4a49fd, function (_0x550bc8) {
    const _0x3a358f = _0x2d57c7;
    _0x4a49fd[_0x550bc8][_0x3a358f(0xff)][_0x3a358f(0x11c)](0x3) ===
      _0x2aeecf && (_0x1da664 = _0x4a49fd[_0x550bc8][_0x3a358f(0x103)]);
  }),
    $[_0x2d57c7(0x140)](_0x1da664, function (_0x642938) {
      const _0x2f1eb1 = _0x2d57c7;
      Number["parseInt"](_0x1da664[_0x642938][_0x2f1eb1(0x14a)]) <=
        Number[_0x2f1eb1(0x10b)](_0x5df256) &&
        Number[_0x2f1eb1(0x10b)](_0x1da664[_0x642938][_0x2f1eb1(0x139)]) >=
          Number[_0x2f1eb1(0x10b)](_0x5df256) &&
        Number[_0x2f1eb1(0x10b)](_0x1da664[_0x642938][_0x2f1eb1(0x15f)]) <=
          Number[_0x2f1eb1(0x10b)](_0x947dcd) &&
        Number[_0x2f1eb1(0x10b)](_0x1da664[_0x642938][_0x2f1eb1(0x12a)]) >=
          Number[_0x2f1eb1(0x10b)](_0x947dcd) &&
        (rate = parseFloat(_0x1da664[_0x642938][_0x2f1eb1(0x114)]));
    }),
    (_0x275b5f =
      Math[_0x2d57c7(0x14d)](
        0x1 + rate / 0x64,
        _0x4ca084 / ("month" === _0x163511 ? 0x168 : 0x16d)
      ) - 0x1),
    (_0x1866be = Math[_0x2d57c7(0x153)](_0x947dcd * _0x275b5f)),
    (_0x306479 = Math["round"](0.04 * _0x1866be)),
    (_0x4b0982 = Math[_0x2d57c7(0x153)](
      parseFloat(_0x947dcd) + parseFloat(_0x1866be - _0x306479)
    )),
    _0x2d57c7(0x155) == typeof _0x5f5849 &&
      _0x5f5849({
        initialInvestment: formatValue(_0x947dcd, _0x2d57c7(0x117)),
        rate: formatValue(rate, _0x2d57c7(0x154)),
        deadLine: formatValue(
          {
            deadLine: _0x5df256,
            deadLineType: _0x163511,
          },
          _0x2d57c7(0x151)
        ),
        tax: formatValue(0.04, _0x2d57c7(0x13d)),
        totalIncome: formatValue(_0x1866be, _0x2d57c7(0x117)),
        incomeDiscount: formatValue(_0x306479, _0x2d57c7(0x117)),
        totalPayment: formatValue(_0x4b0982, _0x2d57c7(0x117)),
        paymentDate: formatValue(_0x4ca084, _0x2d57c7(0x104)),
      });
}
function formatValue(_0x1d7b23, _0x43fc44) {
  const _0x374e2b = _0x353c;
  let _0x3da311 = "",
    _0x375691 = 0x0;
  switch (_0x43fc44) {
    case _0x374e2b(0x13d):
      let _0x540484 = [];
      _0x3da311 =
        (_0x540484 = getCustomFormatNumber(
          new Intl[_0x374e2b(0x12b)](_0x374e2b(0x12d), {
            maximumFractionDigits: 0x3,
          })[_0x374e2b(0xfb)](0x64 * _0x1d7b23),
          ",",
          {
            formatdecimal: !0x0,
            limitdecimals: !0x0,
            decimalqt: 0x2,
          }
        ))[_0x374e2b(0x10f)] +
        "," +
        _0x540484["decimalpart"] +
        "%";
      break;
    case _0x374e2b(0x154):
      let _0x4c9a2e = [];
      _0x3da311 =
        (_0x4c9a2e = getCustomFormatNumber(
          new Intl["NumberFormat"](_0x374e2b(0x12d), {
            maximumFractionDigits: 0x3,
          })[_0x374e2b(0xfb)](_0x1d7b23),
          ",",
          {
            formatdecimal: !0x0,
            limitdecimals: !0x0,
            decimalqt: 0x2,
          }
        ))["intpart"] +
        "," +
        _0x4c9a2e[_0x374e2b(0x12f)] +
        "%";
      break;
    case "deadline":
      const _0x39d766 = {
        month: _0x374e2b(0x123),
        dia: _0x374e2b(0x14c),
        months: "meses",
        days: "días",
      };
      let _0x497b2e = parseInt(_0x1d7b23[_0x374e2b(0x156)]);
      _0x3da311 =
        _0x497b2e +
        "\x20" +
        (0x1 === _0x497b2e
          ? _0x39d766[_0x1d7b23[_0x374e2b(0x137)]]
          : _0x39d766[_0x1d7b23[_0x374e2b(0x137)] + "s"]);
      break;
    case _0x374e2b(0x129):
      _0x3da311 = _0x1d7b23["replace"](/\$|,|\./gi, "");
      break;
    case _0x374e2b(0x104):
      _0x3da311 = getDateFormat(new Date()[_0x374e2b(0x149)](_0x1d7b23), !0x0)[
        _0x374e2b(0x131)
      ];
      break;
    case _0x374e2b(0x117):
      let _0x1d7fbe = "",
        _0x117915 = [];
      return (
        (_0x1d7fbe =
          _0x374e2b(0x138) +
          (_0x117915 = getCustomFormatNumber(_0x1d7b23, ".", {
            formatdecimal: !0x0,
            limitdecimals: !0x0,
            decimalqt: 0x2,
          }))["intpart"] +
          _0x374e2b(0x15d)),
        "" !== _0x117915[_0x374e2b(0x12f)] &&
          (_0x1d7fbe +=
            _0x374e2b(0x143) + _0x117915[_0x374e2b(0x12f)] + "</span>"),
        _0x1d7fbe
      );
    default:
      _0x3da311 =
        "$" +
        (_0x375691 = new Intl["NumberFormat"](_0x374e2b(0x12d), {
          maximumFractionDigits: 0x0,
        })[_0x374e2b(0xfb)](_0x1d7b23));
  }
  return _0x3da311;
}
function getCustomFormatNumber(_0x1e0a85, _0x3421f9, _0x14a2e9) {
  const _0x54d535 = _0x353c;
  let _0x106e9c = {
    intpart: "",
    decimalpart: "",
  };
  if (
    (void 0x0 === _0x3421f9 && (_0x3421f9 = ","),
    ([intpart, decimalpart] =
      _0x1e0a85[_0x54d535(0x121)]()[_0x54d535(0x14e)](_0x3421f9)),
    ((void 0x0 !== _0x14a2e9 && _0x14a2e9["formatdecimal"]) ||
      void 0x0 === _0x14a2e9) &&
      (intpart = Number[_0x54d535(0x134)](intpart)[_0x54d535(0x12c)](
        _0x54d535(0x12d)
      )),
    (_0x106e9c[_0x54d535(0x10f)] = "" + intpart),
    (decimalpart = null != decimalpart ? decimalpart : "0000"),
    Number[_0x54d535(0x10b)](decimalpart) < 0xa &&
      (decimalpart = decimalpart + _0x54d535(0xfc)),
    (void 0x0 !== _0x14a2e9 && _0x14a2e9[_0x54d535(0x10c)]) ||
      void 0x0 === _0x14a2e9)
  ) {
    let _0x101dbd =
      void 0x0 !== _0x14a2e9[_0x54d535(0x159)]
        ? _0x14a2e9[_0x54d535(0x159)]
        : 0x2;
    decimalpart = decimalpart[_0x54d535(0x121)]()
      [_0x54d535(0x157)](/\./, "")
      [_0x54d535(0x102)](0x0, _0x101dbd);
  }
  return (_0x106e9c[_0x54d535(0x12f)] = "" + decimalpart), _0x106e9c;
}
function getDateFormat(_0x2203f4, _0x871af8) {
  const _0x2dd8c1 = _0x353c,
    _0x8443a0 =
      _0x2203f4[_0x2dd8c1(0x124)]() +
      "-" +
      ("0" + (_0x2203f4[_0x2dd8c1(0x147)]() + 0x1))[_0x2dd8c1(0xf5)](-0x2) +
      "-" +
      ("0" + _0x2203f4["getDate"]())["slice"](-0x2),
    _0x50a7dc =
      ("0" + _0x2203f4[_0x2dd8c1(0x15a)]())[_0x2dd8c1(0xf5)](-0x2) +
      ":" +
      ("0" + _0x2203f4[_0x2dd8c1(0x135)]())[_0x2dd8c1(0xf5)](-0x2) +
      ":" +
      ("0" + _0x2203f4["getSeconds"]())["slice"](-0x2);
  if (_0x871af8)
    return {
      "yy-mm-dd": _0x8443a0,
      "hh:mm:ss": _0x50a7dc,
      "dd/mm/yy":
        ("0" + _0x2203f4["getDate"]())[_0x2dd8c1(0xf5)](-0x2) +
        "/" +
        ("0" + (_0x2203f4[_0x2dd8c1(0x147)]() + 0x1))[_0x2dd8c1(0xf5)](-0x2) +
        "/" +
        _0x2203f4["getFullYear"](),
      "hh:mm":
        ("0" + _0x2203f4[_0x2dd8c1(0x15a)]())[_0x2dd8c1(0xf5)](-0x2) +
        ":" +
        ("0" + _0x2203f4[_0x2dd8c1(0x135)]())[_0x2dd8c1(0xf5)](-0x2),
    };
  return _0x8443a0 + "T" + _0x50a7dc;
}
function isInteger(_0x568e1f) {
  return parseInt(_0x568e1f, 0xa) > 0x0;
}
function currency(_0x3350ac, _0x57cc10, _0x13805b = [".", ".", ","]) {
  const _0x47755e = _0x353c;
  _0x57cc10 = _0x57cc10 >= 0x0 ? parseInt(_0x57cc10, 0x0) : 0x2;
  const _0x210e6d = (Math[_0x47755e(0x144)](parseFloat(_0x3350ac)) || 0x0)[
    _0x47755e(0x108)
  ](_0x57cc10);
  if (_0x210e6d[_0x47755e(0x105)] <= 0x4 + _0x57cc10)
    return _0x210e6d["replace"](
      ".",
      _0x13805b[_0x13805b[_0x47755e(0x105)] - 0x1]
    );
  const _0x10a199 = _0x210e6d[_0x47755e(0x14e)](/[-.]/);
  let _0x3e16d3 =
      (_0x3350ac =
        _0x10a199[_0x10a199["length"] > 0x1 ? _0x10a199["length"] - 0x2 : 0x0])[
        _0x47755e(0x102)
      ](_0x3350ac["length"] - 0x3, 0x3) +
      (_0x10a199["length"] > 0x1
        ? _0x13805b[_0x13805b[_0x47755e(0x105)] - 0x1] +
          _0x10a199[_0x10a199[_0x47755e(0x105)] - 0x1]
        : ""),
    _0x303dfa = _0x3350ac["length"] - 0x6,
    _0x1d3d23 = 0x0;
  for (; _0x303dfa > -0x3; )
    (_0x3e16d3 =
      (_0x303dfa > 0x0
        ? _0x3350ac["substr"](_0x303dfa, 0x3)
        : _0x3350ac[_0x47755e(0x102)](0x0, 0x3 + _0x303dfa)) +
      _0x13805b[_0x1d3d23] +
      _0x3e16d3),
      (_0x1d3d23 = ++_0x1d3d23 % 0x2),
      (_0x303dfa -= 0x3);
  return (0x3 === _0x10a199["length"] ? "-" : "") + _0x3e16d3;
}
$(function () {
  const _0x4fd35a = _0x353c;
  let _0x175f73 = document[_0x4fd35a(0x118)](_0x4fd35a(0xfe));
  _0x175f73[_0x4fd35a(0x161)](_0x4fd35a(0x152), (_0x14ca3c) => {
    const _0x365ba6 = _0x4fd35a;
    valueAmount = _0x14ca3c[_0x365ba6(0x13e)][_0x365ba6(0x146)];
    let _0x2708e1 = Number(formatValue(valueAmount, _0x365ba6(0x129)));
    (validAmount =
      _0x2708e1 >= OPENING_MIN_AMOUNT && _0x2708e1 <= OPENING_MAX_AMOUNT)
      ? _0x175f73[_0x365ba6(0xf6)](_0x365ba6(0x11a), _0x365ba6(0x120))
      : _0x175f73[_0x365ba6(0xf6)](_0x365ba6(0x11a), _0x365ba6(0x160)),
      activeButtonSimulate();
  });
  const _0x5df166 = document["querySelector"](_0x4fd35a(0x133));
  _0x5df166[_0x4fd35a(0x161)](_0x4fd35a(0x13f), (_0x387bbc) => {
    const _0x203d5d = _0x4fd35a,
      _0x568900 = new Date();
    _0x568900["setHours"](0x0, 0x0, 0x0, 0x0);
    const _0x40535d = new Date(_0x387bbc[_0x203d5d(0x13e)]);
    if ((_0x40535d["setHours"](0x0, 0x0, 0x0, 0x0), _0x40535d > _0x568900)) {
      const _0x517956 = _0x40535d[_0x203d5d(0x109)]() - _0x568900["getTime"]();
      valueDays = Math[_0x203d5d(0x153)](Math["abs"](_0x517956 / 0x5265c00));
    } else valueDays = 0x0;
    if (
      (validDays =
        valueDays >= OPENING_MIN_DAYS && valueDays <= OPENING_MAX_DAYS)
    )
      _0x5df166["setAttribute"](
        "message",
        _0x203d5d(0x141) + valueDays[_0x203d5d(0x121)]() + _0x203d5d(0x10d)
      ),
        _0x5df166[_0x203d5d(0xf6)](_0x203d5d(0x11a), _0x203d5d(0x120));
    else {
      let _0x4db1f4 = new Date();
      _0x4db1f4[_0x203d5d(0xfa)](0x0, 0x0, 0x0, 0x0),
        _0x4db1f4[_0x203d5d(0x110)](
          _0x4db1f4[_0x203d5d(0x14b)]() + OPENING_MIN_DAYS
        ),
        (_0x5df166["message"] =
          _0x203d5d(0x15b) +
          ("0" + _0x4db1f4["getDate"]())[_0x203d5d(0xf5)](-0x2) +
          "/" +
          ("0" + (_0x4db1f4["getMonth"]() + 0x1))[_0x203d5d(0xf5)](-0x2) +
          "/" +
          _0x4db1f4[_0x203d5d(0x124)]()),
        (_0x5df166[_0x203d5d(0x11a)] = _0x203d5d(0x160));
    }
    activeButtonSimulate();
  }),
    addClickToSimulate();
}),
  (Date[_0x256fdf(0x150)][_0x256fdf(0x149)] = function (_0x266250) {
    const _0x14a4a2 = _0x256fdf;
    var _0x9ef5ea = new Date(this["valueOf"]());
    return (
      _0x9ef5ea[_0x14a4a2(0x110)](_0x9ef5ea[_0x14a4a2(0x14b)]() + _0x266250),
      _0x9ef5ea
    );
  });
function _0x453d() {
  const _0x14eaeb = [
    "día",
    "pow",
    "split",
    "bdb-at-input",
    "prototype",
    "deadline",
    "atInputChanged",
    "round",
    "rate",
    "function",
    "deadLine",
    "replace",
    "close",
    "decimalqt",
    "getHours",
    "Selecciona\x20una\x20fecha\x20a\x20partir\x20del\x20",
    "#simulatorForm\x20button",
    "<span>",
    "15lzDMaV",
    "MontoMinimo",
    "ERROR",
    "addEventListener",
    "slice",
    "setAttribute",
    "application/json",
    "attr",
    ".simulator,\x20.simulator__container,\x20.simulator__message",
    "setHours",
    "format",
    "000",
    "#simulatorButton",
    "#amountInput",
    "channel",
    "10533848ByixpG",
    ".open",
    "substr",
    "ratesAttributes",
    "date",
    "length",
    "42674951UPXCGJ",
    "html",
    "toFixed",
    "getTime",
    "reset",
    "parseInt",
    "limitdecimals",
    "\x20días",
    "removeClass",
    "intpart",
    "setDate",
    "449289bHHjmW",
    "40659KTnzLS",
    "#simulatorForm",
    "TasaSpread",
    "json",
    "js/data/cdtRates.json",
    "money",
    "querySelector",
    "day",
    "status",
    "ajax",
    "charAt",
    "timeType",
    "open",
    ".top",
    "HELP",
    "toString",
    ".simulator__result",
    "mes",
    "getFullYear",
    "addClass",
    "1337RFwWPH",
    "Estamos\x20presentando\x20inconvenientes",
    "preventDefault",
    "integer",
    "MontoMaximo",
    "NumberFormat",
    "toLocaleString",
    "de-DE",
    "error",
    "decimalpart",
    "cdt-alert",
    "dd/mm/yy",
    "shadowRoot",
    "#calendarInput",
    "parseFloat",
    "getMinutes",
    "118sxjxBR",
    "deadLineType",
    "<span>$",
    "PlazoMaximo",
    "705036JSoipU",
    "15558sslssf",
    "disabled",
    "percentage",
    "detail",
    "liteCalendarChanged",
    "each",
    "El\x20plazo\x20de\x20tu\x20CDT\x20es\x20de\x20",
    "310stBGiJ",
    "<span\x20class=\x22simulator__resume--decimals\x22>,",
    "abs",
    "GET",
    "value",
    "getMonth",
    "1771868egloVM",
    "addDays",
    "PlazoMinimo",
    "getDate",
  ];
  _0x453d = function () {
    return _0x14eaeb;
  };
  return _0x453d();
}
