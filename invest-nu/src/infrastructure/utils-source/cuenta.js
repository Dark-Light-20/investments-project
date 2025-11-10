(window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [11],
  {
    "4j2H": function (e, t, a) {
      "use strict";
      var n = a("LHL8"),
        i = a("ERkP"),
        s = a.n(i),
        o = a("mC2l"),
        r = (a("dMLx"), a("g13E")),
        l = a("gIKY"),
        c = a("zDEw"),
        p = a("9VO8"),
        O = a("covK"),
        d = a("C23i"),
        g = a("j/s1"),
        I = a("C+fP"),
        b = a.n(I),
        m = a("kQwz"),
        A = a("AEx+"),
        S = a.n(A),
        u = a("LG/d"),
        E = a.n(u),
        j = a("V0VH"),
        T = a("Lkob"),
        N = a.n(T),
        x = a("jg1C");
      var L = ({
          imageSet: e,
          imageAltTag: t,
          titleTag: a,
          articleLinkTag: n,
        }) => {
          const { formatMessage: s } = Object(m.a)(),
            o = Object(i.useMemo)(() =>
              s({
                id: t,
              })
            ),
            r = Object(i.useMemo)(() =>
              s({
                id: n,
              })
            );
          return Object(x.jsxs)(S.a, {
            gap: {
              sm: "25px",
            },
            children: [
              Object(x.jsx)(N.a, {
                className: "articleImage",
                alt: o,
                title: o,
                srcSet: e,
                maxHeight: {
                  lg: "220px",
                },
                maxWidth: {
                  lg: "430px",
                },
              }),
              Object(x.jsx)(E.a, {
                href: r,
                children: Object(x.jsx)(b.a, {
                  className: "articleTitle",
                  variant: "heading3",
                  textAlign: "center",
                  color: "black.default",
                  intlKey: a,
                  intlValues: {
                    br: Object(x.jsx)("br", {}),
                  },
                }),
              }),
            ],
          });
        },
        h = a("8HIL");
      const C = g.default.section.withConfig({
        displayName: "BlogContainer",
        componentId: "sc-1yejeni-0",
      })(
        ["", ""],
        Object(h.breakpointsMedia)({
          xs: Object(g.css)([
            "display:flex;flex-direction:column;padding:64px 16px 16px;gap:24px;background-color:#F2EEEE;.legend{justify-content:center;}.articleTitle{margin-top:25px;}",
          ]),
          md: Object(g.css)([""]),
          lg: Object(g.css)([
            "display:grid;padding:93px 30px 62px;grid-template-columns:repeat(3,1fr);grid-gap:24px;.heading{grid-area:1 / 1 / span 1 / span 3;}.legend{grid-area:3 / 1 / span 1 / span 3;}.articleTitle{font-size:20px;line-height:120%;}.articleImage{margin-left:auto;margin-right:auto;}",
          ]),
        })
      );
      function y(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      C.displayName = "BlogContainer";
      var f = ({
          titleTag: e,
          articles: t,
          blogLegendTag: a,
          blogLinkTag: s,
          specificColor: o,
        }) => {
          const { formatMessage: r } = Object(m.a)(),
            l = Object(i.useMemo)(() =>
              r({
                id: e,
              })
            ),
            c = Object(i.useMemo)(() =>
              r({
                id: a,
              })
            ),
            p = Object(i.useMemo)(() =>
              r({
                id: s,
              })
            );
          return Object(x.jsxs)(C, {
            children: [
              Object(x.jsx)(S.a, {
                className: "heading",
                children: Object(x.jsx)(R, {
                  color: "black.default",
                  variant: "heading2",
                  dangerouslySetInnerHTML: {
                    __html: l,
                  },
                  textAlign: "center",
                  $_css: o.startsWith("#")
                    ? o
                    : Object(j.nuDSColor)("primary", o),
                }),
              }),
              t.map((e) =>
                Object(x.jsx)(
                  L,
                  (function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var a = null != arguments[t] ? arguments[t] : {};
                      t % 2
                        ? y(Object(a), !0).forEach(function (t) {
                            Object(n.a)(e, t, a[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                            e,
                            Object.getOwnPropertyDescriptors(a)
                          )
                        : y(Object(a)).forEach(function (t) {
                            Object.defineProperty(
                              e,
                              t,
                              Object.getOwnPropertyDescriptor(a, t)
                            );
                          });
                    }
                    return e;
                  })({}, e),
                  e.titleTag
                )
              ),
              Object(x.jsx)(E.a, {
                className: "legend",
                color: "black",
                variant: "action",
                href: p,
                children: c,
              }),
            ],
          });
        },
        R = Object(g.default)(b.a).withConfig({
          displayName: "Blog___StyledTypography",
          componentId: "sc-63j5ip-0",
        })(["span{color:", ";}"], (e) => e.$_css),
        _ = a("NRi+"),
        P = a("Se+g"),
        D = (a("IeIk"), a("17x9")),
        v = a.n(D);
      v.a.shape({
        anualYieldRatePercentage: v.a.number,
        incomeTaxExemptionPercentage: v.a.number,
        incomeTaxRatePercentage: v.a.number,
        taxValueUnit: v.a.number,
      }),
        v.a.shape({
          balanceGross: v.a.number,
          balanceNet: v.a.number,
          savings: v.a.number,
        });
      var G = a("ub57"),
        M = a("VSrG"),
        V = a.n(M);
      const w = Object(g.default)(S.a).withConfig({
          displayName: "YieldDataEntrystyles__ComponentWrapper",
          componentId: "sc-hyng7-0",
        })(
          ["", ""],
          Object(h.breakpointsMedia)({
            xs: Object(g.css)(["width:100%;"]),
            lg: Object(g.css)(["width:auto;"]),
          })
        ),
        U = Object(g.default)(S.a).withConfig({
          displayName: "YieldDataEntrystyles__ButtonsWrapper",
          componentId: "sc-hyng7-1",
        })(
          ["display:flex;padding:", ";", " "],
          Object(j.spacing)("4x", 0, "6x"),
          Object(h.breakpointsMedia)({
            xs: Object(g.css)(["column-gap:19px;"]),
            md: Object(g.css)(["column-gap:30px;"]),
          })
        ),
        F = Object(g.default)(b.a).withConfig({
          displayName: "YieldDataEntrystyles__InputWrapper",
          componentId: "sc-hyng7-2",
        })(
          [
            "align-items:center;display:flex;flex:1;",
            "  > span{font-size:inherit;}& > input{background-color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;font-weight:inherit;letter-spacing:inherit;min-width:0;",
            "}",
          ],
          Object(h.breakpointsMedia)({
            xs: Object(g.css)(["font-size:28px;"]),
            md: Object(g.css)(["font-size:36px;"]),
          }),
          Object(h.breakpointsMedia)({
            xs: Object(g.css)(["width:170px;"]),
            lg: Object(g.css)(["width:220px;"]),
          })
        ),
        B = Object(g.default)(b.a).withConfig({
          displayName: "YieldDataEntrystyles__BigInputWrapper",
          componentId: "sc-hyng7-3",
        })(
          [
            "align-items:center;display:flex;flex:1;font-weight:500;max-width:100%;",
            "  > span{ont-size:inherit;}& > input{background-color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;font-weight:inherit;letter-spacing:inherit;min-width:0;",
            "}",
          ],
          Object(h.breakpointsMedia)({
            xs: Object(g.css)(["font-size:28px;"]),
            md: Object(g.css)(["font-size:48px;"]),
          }),
          ({ inputSize: e }) =>
            e ? Object(g.css)(["width:", "ch;"], e) : "width: 8ch"
        ),
        k = Object(g.default)("button").withConfig({
          displayName: "YieldDataEntrystyles__StyledButton",
          componentId: "sc-hyng7-4",
        })([
          "display:flex;justify-content:center;align-items:center;flex:none;background-color:#820AD1;border-radius:100%;box-sizing:content-box;height:48px;margin:0;width:48px;:disabled{color:#113;background:rgb(17 17 17 /10%);cursor:not-allowed;>svg{fill:none;color:darkgray;}};:focus{background-color:#A129F0;}",
        ]),
        H = Object(g.default)(V.a).withConfig({
          displayName: "YieldDataEntrystyles__StyledIcon",
          componentId: "sc-hyng7-5",
        })(["color:white;"]);
      (w.displayName = "ComponentWrapper"),
        (U.displayName = "ButtonsWrapper"),
        (F.displayName = "InputWrapper"),
        (B.displayName = "BigInputWrapper"),
        (k.displayName = "StyledButton");
      const Y = (e) => Number.parseInt(e, 10),
        K = (e) => e / 100,
        W = (e, t, a) => {
          let n = 0;
          return e > t && (n = e * a), n;
        };
      var Q = a("xriH");
      function z(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function q(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? z(Object(a), !0).forEach(function (t) {
                Object(n.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : z(Object(a)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      const X = {
          increase: 1e5,
          decrease: -1e5,
        },
        $ = {
          increase: 1e5,
          decrease: -1e5,
        },
        J = {
          increase: 1,
          decrease: -1,
        },
        Z = {
          initialBalance: 5e5,
          monthlyDeposits: 1e5,
          durationInMonths: 6,
        },
        ee = {
          initialBalance: {
            min: 0,
            max: 1e8,
          },
          monthlyDeposits: {
            min: 0,
            max: 1e8,
          },
          durationInMonths: {
            min: 1,
            max: 12,
          },
        },
        te = ({ onBalanceChange: e, baseRates: t, calculateBalance: a }) => {
          const { formatMessage: n } = Object(m.a)(),
            { 0: s, 1: o } = Object(i.useState)(Z);
          Object(i.useEffect)(() => {
            const {
                initialBalance: n,
                monthlyDeposits: i,
                durationInMonths: o,
              } = s,
              {
                savings: r,
                balanceGross: l,
                balanceNet: c,
                totalTax: p,
                totalEarnings: O,
              } = a(t, {
                initialBalance: n,
                monthlyDeposits: i,
                durationInMonths: o,
              });
            e({
              savings: r,
              balanceGross: l,
              balanceNet: c,
              durationInMonths: o,
              totalTax: p,
              totalEarnings: O,
            });
          }, [s]);
          const r = Object(i.useCallback)(
            (e, t, a) => (n) => {
              n.preventDefault(), a && Object(G.a)(a);
              const i = Y(t ? s[e] + t : n.target.value.replace(/\./g, "")),
                r = ((e, { min: t, max: a }) => (e <= t ? t : e >= a ? a : e))(
                  i >= 0 ? i : 0,
                  ee[e]
                );
              o(
                q(
                  q({}, s),
                  {},
                  {
                    [e]: r,
                  }
                )
              );
            },
            [s]
          );
          return Object(x.jsxs)(w, {
            tag: "div",
            children: [
              Object(x.jsx)(b.a, {
                tag: "label",
                htmlFor: "calculator-initial-balance",
                variant: "heading4",
                intlKey: "SAVINGS.YIELD_CALCULATOR.INITIAL_DEPOSIT.LABEL",
              }),
              Object(x.jsxs)(U, {
                children: [
                  Object(x.jsxs)(F, {
                    tag: "div",
                    variant: "heading2",
                    children: [
                      Object(x.jsx)("span", {
                        children: "$",
                      }),
                      Object(x.jsx)("input", {
                        inputMode: "numeric",
                        value: "".concat(Object(Q.a)(s.initialBalance, 0, !1)),
                        "data-testid": "calculator-initial-balance",
                        onChange: r("initialBalance"),
                      }),
                    ],
                  }),
                  Object(x.jsx)(k, {
                    "data-testid": "calculator-initial-balance-decrease",
                    disabled: s.initialBalance <= ee.initialBalance.min,
                    onClick: r(
                      "initialBalance",
                      X.decrease,
                      "SAVINGS_CALCULATOR_INITIAL_DEPOSIT_DECREASE"
                    ),
                    children: Object(x.jsx)(H, {
                      name: "minus",
                      size: "small",
                    }),
                  }),
                  Object(x.jsx)(k, {
                    "data-testid": "calculator-initial-balance-increase",
                    disabled: s.initialBalance >= ee.initialBalance.max,
                    onClick: r(
                      "initialBalance",
                      X.increase,
                      "SAVINGS_CALCULATOR_INITIAL_DEPOSIT_INCREASE"
                    ),
                    children: Object(x.jsx)(H, {
                      name: "plus",
                      size: "small",
                    }),
                  }),
                ],
              }),
              Object(x.jsx)(b.a, {
                tag: "label",
                htmlFor: "calculator-monthly-deposits",
                variant: "heading4",
                intlKey: "SAVINGS.YIELD_CALCULATOR.MONTHLY_DEPOSIT.LABEL",
              }),
              Object(x.jsxs)(U, {
                children: [
                  Object(x.jsxs)(F, {
                    tag: "div",
                    variant: "heading2",
                    children: [
                      Object(x.jsx)("span", {
                        children: "$",
                      }),
                      Object(x.jsx)("input", {
                        inputMode: "numeric",
                        value: "".concat(Object(Q.a)(s.monthlyDeposits, 0, !1)),
                        "data-testid": "calculator-monthly-deposits",
                        onChange: r("monthlyDeposits"),
                      }),
                    ],
                  }),
                  Object(x.jsx)(k, {
                    "data-testid": "calculator-monthly-deposits-decrease",
                    disabled: s.monthlyDeposits <= ee.monthlyDeposits.min,
                    onClick: r(
                      "monthlyDeposits",
                      $.decrease,
                      "SAVINGS_CALCULATOR_MONTHLY_DEPOSIT_DECREASE"
                    ),
                    children: Object(x.jsx)(H, {
                      name: "minus",
                      size: "small",
                    }),
                  }),
                  Object(x.jsx)(k, {
                    "data-testid": "calculator-monthly-deposits-increase",
                    disabled: s.monthlyDeposits >= ee.monthlyDeposits.max,
                    onClick: r(
                      "monthlyDeposits",
                      $.increase,
                      "SAVINGS_CALCULATOR_MONTHLY_DEPOSIT_INCREASE"
                    ),
                    children: Object(x.jsx)(H, {
                      name: "plus",
                      size: "small",
                    }),
                  }),
                ],
              }),
              Object(x.jsx)(b.a, {
                tag: "label",
                htmlFor: "calculator-period-in-years",
                variant: "heading4",
                intlKey: "SAVINGS.YIELD_CALCULATOR.DURATION_IN_MONTHS.LABEL",
              }),
              Object(x.jsxs)(U, {
                children: [
                  Object(x.jsxs)(B, {
                    tag: "div",
                    variant: "heading2",
                    inputSize: s.durationInMonths.toString().length,
                    children: [
                      Object(x.jsx)("input", {
                        inputMode: "numeric",
                        value: s.durationInMonths,
                        "data-testid": "calculator-duration-in-months",
                        onChange: r("durationInMonths"),
                      }),
                      Object(x.jsx)("span", {
                        children: n({
                          id:
                            1 === s.durationInMonths
                              ? "SAVINGS.YIELD_CALCULATOR.DURATION_IN_MONTHS.LABEL.SINGULAR"
                              : "SAVINGS.YIELD_CALCULATOR.DURATION_IN_MONTHS.LABEL.PLURAL",
                        }),
                      }),
                    ],
                  }),
                  Object(x.jsx)(k, {
                    "data-testid": "calculator-duration-in-months-decrease",
                    disabled: s.durationInMonths <= ee.durationInMonths.min,
                    onClick: r(
                      "durationInMonths",
                      J.decrease,
                      "SAVINGS_CALCULATOR_DURATION_DECREASE"
                    ),
                    children: Object(x.jsx)(H, {
                      name: "minus",
                      size: "small",
                    }),
                  }),
                  Object(x.jsx)(k, {
                    "data-testid": "calculator-duration-in-months-increase",
                    disabled: s.durationInMonths >= ee.durationInMonths.max,
                    onClick: r(
                      "durationInMonths",
                      J.increase,
                      "SAVINGS_CALCULATOR_DURATION_INCREASE"
                    ),
                    children: Object(x.jsx)(H, {
                      name: "plus",
                      size: "small",
                    }),
                  }),
                ],
              }),
            ],
          });
        };
      te.defaultProps = {
        calculateBalance: (e = {}, t = {}) => {
          const {
              initialBalance: a = 0,
              monthlyDeposits: n = 0,
              durationInMonths: i = 0,
            } = t,
            s = ((e) => (1 + e) ** (1 / 12) - 1)(
              K(100 * e.anualYieldRatePercentage)
            ),
            o = K(e.incomeTaxExemptionPercentage),
            r = ((e, t) => e * t * 30)(e.taxValueUnit, o),
            l = K(e.incomeTaxRatePercentage);
          let c = Y(a),
            p = 0,
            O = 0,
            d = 0,
            g = 0,
            I = 0,
            b = Y(a),
            m = 0;
          for (let A = 0; A < i; A += 1)
            (c += Y(n)),
              (d = c + O - p),
              (g = d * s),
              (O += g),
              (I = W(g, r, l)),
              (p += I),
              (b += Y(n) + m),
              (m = b * s);
          return {
            durationInMonths: i,
            savings: c,
            balanceGross: b + m,
            balanceNet: c + O - p,
            totalTax: p,
            totalEarnings: O,
          };
        },
        onBalanceChange: () => {},
      };
      var ae = s.a.memo(te);
      const ne = Object(g.default)(b.a).withConfig({
          displayName: "YieldEstimationstyles__StyledTypography",
          componentId: "sc-26zxx5-0",
        })(
          [
            "line-height:1;font-weight:600;letter-spacing:-0.06rem;word-break:break-word;padding:5% 0;border-bottom:.25rem solid ",
            ";",
            "",
          ],
          Object(j.nuDSColor)("primary"),
          Object(h.breakpointsMedia)({
            xs: Object(g.css)(["font-size:28px;"]),
            md: Object(g.css)(["font-size:48px;"]),
          })
        ),
        ie = Object(g.default)(S.a).withConfig({
          displayName: "YieldEstimationstyles__ComponentWrapper",
          componentId: "sc-26zxx5-1",
        })(
          [
            "display:flex;flex-direction:column;justify-content:space-evenly;flex:1;",
            "",
          ],
          Object(h.breakpointsMedia)({
            lg: Object(g.css)(["margin-right:200px;"]),
          })
        ),
        se = Object(g.default)(S.a).withConfig({
          displayName: "YieldEstimationstyles__EstimationWrapper",
          componentId: "sc-26zxx5-2",
        })(["display:flex;justify-content:space-between;"]);
      (ne.displayName = "StyledTypography"),
        (ie.displayName = "ComponentWrapper"),
        (se.displayName = "EstimationWrapper");
      const oe = !0,
        re = ({
          balance: e,
          yieldRate: t,
          incomeTaxRate: a,
          withholdingAmount: n,
        }) => {
          const { formatMessage: i } = Object(m.a)();
          return Object(x.jsxs)(ie, {
            tag: "div",
            children: [
              Object(x.jsx)(b.a, {
                variant: "heading4",
                intlKey:
                  1 ===
                  (null === e || void 0 === e ? void 0 : e.durationInMonths)
                    ? "SAVINGS.YIELD_CALCULATOR.YIELD_ESTIMATION.DURATION.LABEL.SINGULAR"
                    : "SAVINGS.YIELD_CALCULATOR.YIELD_ESTIMATION.DURATION.LABEL.PLURAL",
                intlValues: {
                  duration:
                    null === e || void 0 === e ? void 0 : e.durationInMonths,
                },
              }),
              Object(x.jsx)(ne, {
                children: Object(Q.a)(
                  null === e || void 0 === e ? void 0 : e.balanceNet,
                  oe,
                  2
                ),
              }),
              Object(x.jsxs)(x.Fragment, {
                children: [
                  Object(x.jsxs)(se, {
                    children: [
                      Object(x.jsx)(b.a, {
                        variant: "subtitle1",
                        strong: !0,
                        paddingTop: "2x",
                        marginBottom: "1x",
                        intlKey:
                          "SAVINGS.YIELD_CALCULATOR.ESTIMATION.TOTAL_DEPOSITS.LABEL",
                      }),
                      Object(x.jsx)(b.a, {
                        variant: "subtitle1",
                        strong: !0,
                        paddingTop: "2x",
                        marginBottom: "1x",
                        intlKey: "SAVINGS.YIELD_CALCULATOR.ESTIMATION.VALUE",
                        intlValues: {
                          value: Object(Q.a)(
                            null === e || void 0 === e ? void 0 : e.savings,
                            oe,
                            2
                          ),
                        },
                      }),
                    ],
                  }),
                  Object(x.jsxs)(se, {
                    children: [
                      Object(x.jsx)(b.a, {
                        variant: "subtitle1",
                        strong: !0,
                        marginBottom: "1x",
                        intlKey:
                          "SAVINGS.YIELD_CALCULATOR.ESTIMATION.WITHOUT_WITHOLDING.LABEL",
                      }),
                      Object(x.jsx)(b.a, {
                        variant: "subtitle1",
                        strong: !0,
                        marginBottom: "1x",
                        intlKey: "SAVINGS.YIELD_CALCULATOR.ESTIMATION.VALUE",
                        intlValues: {
                          value: Object(Q.a)(
                            null === e || void 0 === e
                              ? void 0
                              : e.totalEarnings,
                            oe,
                            2
                          ),
                        },
                      }),
                    ],
                  }),
                  Object(x.jsxs)(se, {
                    children: [
                      Object(x.jsx)(b.a, {
                        variant: "subtitle1",
                        marginBottom: "1x",
                        intlKey:
                          "SAVINGS.YIELD_CALCULATOR.ESTIMATION.TOTAL_WITHOLDING.LABEL",
                      }),
                      Object(x.jsx)(b.a, {
                        variant: "subtitle1",
                        marginBottom: "1x",
                        intlKey: "SAVINGS.YIELD_CALCULATOR.ESTIMATION.VALUE",
                        intlValues: {
                          value: Object(Q.a)(
                            null === e || void 0 === e ? void 0 : e.totalTax,
                            oe,
                            2
                          ),
                        },
                      }),
                    ],
                  }),
                ],
              }),
              Object(x.jsx)(b.a, {
                variant: "subtitle2",
                intlKey: "SAVINGS.YIELD_CALCULATOR.LABEL.DISCLAIMER",
                intlValues: {
                  br: Object(x.jsxs)(x.Fragment, {
                    children: [
                      Object(x.jsx)("br", {}),
                      Object(x.jsx)("br", {}),
                    ],
                  }),
                  link: Object(x.jsx)(E.a, {
                    typographyProps: {
                      color: "black",
                      textDecoration: "underline",
                    },
                    rel: "noopener",
                    target: "_blank",
                    href: i({
                      id: "SAVINGS.YIELD_CALCULATOR.DISCLAIMER.HREF",
                    }),
                    intlKey: "SAVINGS.YIELD_CALCULATOR.DISCLAIMER.HREF.LABEL",
                  }),
                  a: (e) =>
                    Object(x.jsx)("a", {
                      href: i({
                        id: "SAVINGS.YIELD_CALCULATOR.DISCLAIMER.HREF",
                      }),
                      target: "_blank",
                      style: {
                        textDecoration: "underline",
                      },
                      rel: "noreferrer",
                      children: e,
                    }),
                  yieldRate: Object(P.b)(t),
                  incomeTaxRate: a,
                  withholdingAmount: Object(Q.a)(n, oe, 2),
                },
              }),
            ],
          });
        };
      re.defaultProps = {
        balance: {},
      };
      var le = s.a.memo(re);
      const ce = Object(g.default)(S.a).withConfig({
          displayName: "YieldCalculatorstyles__ComponentWrapper",
          componentId: "sc-1mekq2b-0",
        })(
          [
            "background-color:#E7DBFF;display:flex;flex-direction:column;row-gap:",
            ";max-width:100%;",
            ";",
          ],
          Object(j.spacing)("2x"),
          Object(h.breakpointsMedia)({
            xs: Object(g.css)(["padding:28px;"]),
            md: Object(g.css)(
              ["padding:", " 100px;"],
              Object(j.spacing)("24x")
            ),
            lg: Object(g.css)(
              ["padding:", " 200px;max-height:784px"],
              Object(j.spacing)("24x")
            ),
          })
        ),
        pe = Object(g.default)(S.a).withConfig({
          displayName: "YieldCalculatorstyles__CalculationsWrapper",
          componentId: "sc-1mekq2b-1",
        })(
          [
            "display:flex;justify-content:space-between;padding-top:",
            ";row-gap:50px;flex-wrap:wrap;max-width:100%;",
            ";",
          ],
          Object(j.spacing)("5x"),
          Object(h.breakpointsMedia)({
            md: Object(g.css)(["column-gap:40px;"]),
            lg: Object(g.css)(["column-gap:140px;"]),
          })
        ),
        Oe = Object(g.default)(b.a).withConfig({
          displayName: "YieldCalculatorstyles__HeaderText",
          componentId: "sc-1mekq2b-2",
        })(
          ["", ";"],
          Object(h.breakpointsMedia)({
            xs: Object(g.css)(["padding-right:5%;"]),
            md: Object(g.css)(["padding-right:10%;"]),
          })
        );
      function de(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function ge(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? de(Object(a), !0).forEach(function (t) {
                Object(n.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : de(Object(a)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Ie({ baseRates: e, anualYieldRatePercentage: t }) {
        const { 0: a, 1: n } = Object(i.useState)(void 0),
          s = 0 !== Object.keys(e).length,
          o = ge(
            ge({}, e),
            {},
            {
              anualYieldRatePercentage: t,
            }
          );
        return Object(x.jsxs)(me, {
          tag: "section",
          $_css: null === t ? Object(g.css)(["display:none;"]) : "",
          children: [
            Object(x.jsx)(Oe, {
              tag: "h2",
              variant: "heading2",
              intlKey: "SAVINGS.YIELD_CALCULATOR.TITLE",
            }),
            Object(x.jsx)(Ae, {
              tag: "label",
              variant: "heading4",
              color: "rgba(17,17,17,0.7)",
              intlKey: "SAVINGS.YIELD_CALCULATOR.SUBTITLE",
              intlValues: {
                yieldRate: Object(P.b)(o.anualYieldRatePercentage),
                strong: (e) =>
                  Object(x.jsx)("strong", {
                    children: e,
                  }),
              },
            }),
            Object(x.jsx)(pe, {
              children:
                s &&
                Object(x.jsxs)(x.Fragment, {
                  children: [
                    Object(x.jsx)(ae, {
                      onBalanceChange: n,
                      baseRates: o,
                    }),
                    Object(x.jsx)(le, {
                      balance: a,
                      yieldRate: o.anualYieldRatePercentage,
                      incomeTaxRate: o.incomeTaxRatePercentage,
                      withholdingAmount: 2588,
                    }),
                  ],
                }),
            }),
          ],
        });
      }
      (ce.displayName = "ComponentWrapper"),
        (pe.displayName = "CalculationsWrapper"),
        (Oe.displayName = "HeaderText"),
        (Ie.defaultProps = {
          anualYieldRatePercentage: null,
        });
      var be = s.a.memo(Ie),
        me = Object(g.default)(ce).withConfig({
          displayName: "YieldCalculator___StyledComponentWrapper",
          componentId: "sc-yi2z9j-0",
        })(["", ""], (e) => e.$_css),
        Ae = Object(g.default)(Oe).withConfig({
          displayName: "YieldCalculator___StyledHeaderText",
          componentId: "sc-yi2z9j-1",
        })(["strong{color:black;}"]),
        Se = a("+84M");
      var ue = {
        hero: {
          title: "SAVINGS.HERO.TITLE",
          subtitle: "SAVINGS.HERO.SUBTITLE",
          alt: "SAVINGS.HERO.IMAGE.ALT",
          heroImages: {
            xs: "savings/hero/savings-hero-xs.jpg",
            md: "savings/hero/savings-hero-md.jpg",
            lg: "savings/hero/savings-hero-lg.jpg",
          },
          form: {
            label: "SAVINGS.HERO.FORM.LABEL",
            placeholder: "SAVINGS.HERO.FORM.PLACEHOLDER",
            btnLabel: "SAVINGS.HERO.FORM.BUTTON_LABEL",
            btnStyleVariant: "primary",
            validateDisabled: !1,
          },
          specificColor: "#A376FF",
          tag: "SAVINGS.HERO.IMAGE.TEXT",
        },
        disclaimer: {
          message: "SAVINGS.HERO.BLUR.LABEL",
          show: !0,
        },
        fixedBanner: {
          imageSrc: "savings/vigilado-xl.png",
          label: "SAVINGS.FIXED_BANNER.LABEL",
        },
        nuPromise: {
          boldColor: "",
          cardColor: "#F6ECFF",
          links: [
            {
              summary: "SAVINGS.PROMISE.FIRST.TITLE",
              linkText: "SAVINGS.PROMISE.FIRST.CONTENT",
              promiseImage: {
                xs: "savings/promise/iPhone12pro_1.png",
                md: "savings/promise/iPhone12pro_1.png",
                lg: "savings/promise/iPhone12pro_1.png",
              },
              imagePosition: "below",
            },
            {
              summary: "SAVINGS.PROMISE.SECOND.TITLE",
              linkText: "SAVINGS.PROMISE.SECOND.CONTENT",
              promiseImage: {
                xs: "savings/promise/iPhone12pro_2.png",
                md: "savings/promise/iPhone12pro_2.png",
                lg: "savings/promise/iPhone12pro_2.png",
              },
              imagePosition: "below",
            },
            {
              summary: "SAVINGS.PROMISE.THIRD.TITLE",
              linkText: "SAVINGS.PROMISE.THIRD.CONTENT",
              linkTextFallback: "SAVINGS.PROMISE.THIRD.CONTENT.FALLBACK",
              promiseImage: {
                xs: "savings/promise/iPhone12pro_3.png",
                md: "savings/promise/iPhone12pro_3.png",
                lg: "savings/promise/iPhone12pro_3.png",
              },
              imagePosition: "below",
            },
          ],
          titleColor: "black",
          subtitleColor: "rgba(17,17,17,0.7)",
          titleVariant: "heading3",
          subtitleVariant: "heading4",
          styleOverride:
            "\n.nu-promise-container {\n  @media (min-width: 768px) {\n    padding: 56px 40px 0px;\n  }\n  @media (max-width: 768px) {\n    padding: 56px 24px 0px;\n  }\n  .nu-promise-title {\n    flex: 1;\n    @media (max-width: 768px) {\n      font-size: 30px;\n    }\n    @media (min-width: 768px) {\n      font-size: 40px;\n    }\n  },\n  .nu-promise-subtitle {\n    flex: 1;\n    @media (max-width: 768px) {\n      font-size: 20px;\n    }\n    @media (min-width: 768px) {\n      font-size: 24px;\n    }\n  },\n  .nu-promise-image {\n    width: 100%;\n    margin-bottom: 0px;\n    flex: 2;\n  },\n},\n",
        },
        nuMessage: {
          title: "SAVINGS.MESSAGE.TEXT",
          spanColor: "#A175F2",
        },
        valueProposal: {
          alt: "SAVINGS.VALUE_PROPOSAL.IMAGE.ALT",
          backGroungColor: "#F6ECFF",
          buttonColor: "white",
          heroImages: {
            xs: "savings/value_proposal_xs.png",
            md: "savings/value_proposal_md.png",
            lg: "savings/value_proposal_lg.png",
          },
          imageSize: "",
          title: "SAVINGS.VALUE_PROPOSAL.TITLE",
          titleColor: "#A376FF",
          content: "SAVINGS.VALUE_PROPOSAL.TEXT_CONTENT",
          contentColor: "rgba(17,17,17,0.7)",
          gridLargeOrder: '"valueProps picture"',
          styleOverride:
            "\n  @media (min-width: 1025px) {\n    height: 550px;\n  }\n  .vp-text-container {\n    display: flex;\n    flex-direction: column;\n    max-width: 580px;\n    justify-self: end;\n    @media (min-width: 1025px) {\n      padding: 0;\n    }\n  },\n  .vp-image-container {\n    @media (max-width: 768px) {\n      justify-content: left;\n    }\n    @media (min-width: 1025px) {\n      padding: 3rem;\n      picture:first-child  img {\n        max-width: 580px;\n      } \n    }\n  }\n",
          subtitleVariant: "heading4",
        },
        nuPlaca: {
          boldColor: "",
          cardColor: "#F3ECFC",
          links: [
            {
              id: "first",
              summary: "SAVINGS.NU_PLACA.FIRST.TITLE",
              linkText: "SAVINGS.NU_PLACA.FIRST.CONTENT",
              promiseImage: {
                xs: "savings/placa/WhatIsNuPlaca.png",
                md: "savings/placa/WhatIsNuPlaca.png",
                lg: "savings/placa/WhatIsNuPlaca.png",
              },
              imagePosition: "above",
            },
            {
              id: "second",
              summary: "SAVINGS.NU_PLACA.SECOND.TITLE",
              linkText: "SAVINGS.NU_PLACA.SECOND.CONTENT",
              promiseImage: {
                xs: "savings/placa/WhereCanISeeIt.png",
                md: "savings/placa/WhereCanISeeIt.png",
                lg: "savings/placa/WhereCanISeeIt.png",
              },
              imagePosition: "above",
            },
          ],
          titleColor: "black",
          subtitleColor: "black",
          subtitleVariant: "subtitle1",
          styleOverride:
            "\n.nu-promise-container {\n  text-align: center;\n},\n.nu-promise-image {\n  width: 100%;\n},\n.nu-promise-subtitle {\n  span {\n    font-weight: bold;\n  }\n},\n",
        },
        customerFeedback: {
          title: "MULTI_PRODUCT_HOME.SAVINGS.FEEDBACKS.TITLE",
          backGroungColor: "#FFFFFF",
          feedbacks: [
            {
              description: "MULTI_PRODUCT_HOME.FEEDBACKS.1.DESCRIPTION",
              owner: "MULTI_PRODUCT_HOME.FEEDBACKS.1.OWNER",
              location: "MULTI_PRODUCT_HOME.FEEDBACKS.1.LOCATION",
            },
            {
              description: "MULTI_PRODUCT_HOME.FEEDBACKS.2.DESCRIPTION",
              owner: "MULTI_PRODUCT_HOME.FEEDBACKS.2.OWNER",
              location: "MULTI_PRODUCT_HOME.FEEDBACKS.2.LOCATION",
            },
            {
              description: "MULTI_PRODUCT_HOME.FEEDBACKS.3.DESCRIPTION",
              owner: "MULTI_PRODUCT_HOME.FEEDBACKS.3.OWNER",
              location: "MULTI_PRODUCT_HOME.FEEDBACKS.3.LOCATION",
            },
            {
              description: "MULTI_PRODUCT_HOME.FEEDBACKS.4.DESCRIPTION",
              owner: "MULTI_PRODUCT_HOME.FEEDBACKS.4.OWNER",
              location: "MULTI_PRODUCT_HOME.FEEDBACKS.4.LOCATION",
            },
          ],
        },
        blog: {
          titleTag: "SAVINGS.BLOG.TITLE.LABEL",
          blogLegendTag: "SAVINGS.BLOG.LEGEND.LABEL",
          blogLinkTag: "SAVINGS.BLOG.LEGEND.LINK",
          specificColor: "#7B4DD6",
          articles: [
            {
              imageSet: {
                xs: "savings/blog/cajita-xs.png",
                md: "savings/blog/cajita-lg.png",
                lg: "savings/blog/cajita-lg.png",
              },
              imageAltTag: "SAVINGS.BLOG.ARTICLE1.ALT",
              titleTag: "SAVINGS.BLOG.ARTICLE1.LABEL",
              articleLinkTag: "SAVINGS.BLOG.ARTICLE1.LINK",
            },
            {
              imageSet: {
                xs: "savings/blog/blog4-xs.png",
                md: "savings/blog/blog4-lg.png",
                lg: "savings/blog/blog4-lg.png",
              },
              imageAltTag: "SAVINGS.BLOG.ARTICLE2.ALT",
              titleTag: "SAVINGS.BLOG.ARTICLE2.LABEL",
              articleLinkTag: "SAVINGS.BLOG.ARTICLE2.LINK",
            },
            {
              imageSet: {
                xs: "savings/blog/blog3a-xs.jpg",
                md: "savings/blog/blog3a-lg.jpg",
                lg: "savings/blog/blog3a-lg.jpg",
              },
              imageAltTag: "SAVINGS.BLOG.ARTICLE3.ALT",
              titleTag: "SAVINGS.BLOG.ARTICLE3.LABEL",
              articleLinkTag: "SAVINGS.BLOG.ARTICLE3.LINK",
            },
          ],
        },
        productInformation: {
          alt: "CREDIT_CARD.PRODUCT_INFORMATION.ALT",
          blogImages: {
            xs: "savings/product-information/product-information-xs-1x.jpg",
            md: "savings/product-information/product-information-md-1x.jpg",
            lg: "savings/product-information/product-information-lg-1x.jpg",
          },
          title: "SAVINGS.PRODUCT_INFORMATION.TITLE",
          titleVariant: "heading4",
          subtitle: "SAVINGS.PRODUCT_INFORMATION.SUBTITLE",
          subtitleVariant: "heading4",
          subtitleColor: "#A376FF",
          link: "SAVINGS.PRODUCT_INFORMATION.LINK",
          linkText: "SAVINGS.PRODUCT_INFORMATION.LINK.TEXT",
          buttonColor: "#A376FF",
          showSecondCard: !0,
          secondCard: {
            title: "SAVINGS.PRODUCT_INFORMATION.SECOND.TITLE",
            items: [
              {
                itemTitle: "SAVINGS.PRODUCT_INFORMATION.SECOND.FIRST.TITLE",
                label: "SAVINGS.PRODUCT_INFORMATION.SECOND.FIRST.LABEL",
                avatar: {
                  xs: "savings/product-information/add-person-avatar-4x.png",
                  md: "savings/product-information/add-person-avatar-4x.png",
                  lg: "savings/product-information/add-person-avatar-4x.png",
                },
              },
              {
                itemTitle:
                  "CREDIT.PRODUCT_INFORMATION.SECOND.SECOND_ITEM.TITLE",
                label: "CREDIT.PRODUCT_INFORMATION.SECOND.SECOND_ITEM.LABEL",
                avatar: {
                  xs: "savings/product-information/app-avatar-4x.png",
                  md: "savings/product-information/app-avatar-4x.png",
                  lg: "savings/product-information/app-avatar-4x.png",
                },
              },
            ],
          },
        },
        faq: {
          title: "SAVINGS.FAQ.TITLE",
          questions: [
            {
              question: "SAVINGS.FAQ.QUESTION.FIRST",
              answer: "SAVINGS.FAQ.QUESTION.ANSWER.FIRST",
              initiallyOpen: !0,
            },
            {
              question: "SAVINGS.FAQ.QUESTION.SECOND",
              answer: "SAVINGS.FAQ.QUESTION.ANSWER.SECOND",
              fallback: "SAVINGS.FAQ.QUESTION.ANSWER.SECOND.FALLBACK",
              initiallyOpen: !0,
            },
            {
              question: "SAVINGS.FAQ.QUESTION.THIRD",
              answer: "SAVINGS.FAQ.QUESTION.ANSWER.THIRD",
              initiallyOpen: !0,
            },
            {
              question: "SAVINGS.FAQ.QUESTION.FOURTH",
              answer: "SAVINGS.FAQ.QUESTION.ANSWER.FOURTH",
              initiallyOpen: !0,
            },
            {
              question: "SAVINGS.FAQ.QUESTION.FIFTH",
              answer: "SAVINGS.FAQ.QUESTION.ANSWER.FIFTH",
              initiallyOpen: !0,
            },
            {
              question: "SAVINGS.FAQ.QUESTION.SIXTH",
              answer: "SAVINGS.FAQ.QUESTION.ANSWER.SIXTH",
              href: "SAVINGS.FAQ.QUESTION.HREF.SIXTH",
              initiallyOpen: !0,
            },
            {
              question: "SAVINGS.FAQ.QUESTION.EIGHTH",
              answer: "SAVINGS.FAQ.QUESTION.ANSWER.EIGHTH",
              initiallyOpen: !0,
            },
            {
              question: "SAVINGS.FAQ.QUESTION.NINETH",
              answer: "SAVINGS.FAQ.QUESTION.ANSWER.NINETH",
              href: "SAVINGS.FAQ.QUESTION.HREF.NINETH",
              initiallyOpen: !0,
            },
          ],
        },
        calculator: {
          baseRates: {
            anualYieldRatePercentage: 0,
            incomeTaxExemptionPercentage: 5.5,
            incomeTaxRatePercentage: 7,
            taxValueUnit: 49799,
          },
        },
        pay: {
          paymentOptions: [
            {
              id: "google",
              imgSrc: "savings/pay/google-pay.png",
              imgAlt: "HOME.PAY.GOOGLE_PAY.IMG.ALT",
              miniImgSrc: "savings/pay/google-wallet-mini.png",
              miniImgAlt: "HOME.PAY.GOOGLE_PAY.MINI_IMG.ALT",
              description: "HOME.PAY.GOOGLE_PAY.DESCRIPTION",
              description2: "HOME.PAY.GOOGLE_PAY.DESCRIPTION.ADDITIONAL",
              link: "HOME.PAY.GOOGLE_PAY.LINK",
              linkLabel: "HOME.PAY.GOOGLE_PAY.LINK.LABEL",
            },
            {
              id: "apple",
              imgSrc: "savings/pay/apple-pay.png",
              imgAlt: "HOME.PAY.APPLE_PAY.IMG.ALT",
              miniImgSrc: "savings/pay/apple-pay-mini.png",
              miniImgAlt: "HOME.PAY.APPLE_PAY.MINI_IMG.ALT",
              description: "HOME.PAY.APPLE_PAY.DESCRIPTION",
              description2: "HOME.PAY.APPLE_PAY.DESCRIPTION.ADDITIONAL",
              link: "HOME.PAY.APPLE_PAY.LINK",
              linkLabel: "HOME.PAY.APPLE_PAY.LINK.LABEL",
            },
          ],
        },
      };
      function Ee(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function je(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ee(Object(a), !0).forEach(function (t) {
                Object(n.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Ee(Object(a)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      const {
        hero: Te,
        nuPromise: Ne,
        valueProposal: xe,
        nuMessage: Le,
        nuPlaca: he,
        calculator: Ce,
        customerFeedback: ye,
        blog: fe,
        productInformation: Re,
        faq: _e,
        fixedBanner: Pe,
        pay: De,
      } = ue;
      t.a = () => {
        const { 0: e, 1: t } = Object(i.useState)(null);
        return (
          Object(i.useEffect)(() => {
            (async () => {
              try {
                const e = await Object(P.a)();
                t(e);
              } catch (e) {
                t(null);
              }
            })();
          }, []),
          Object(x.jsxs)(x.Fragment, {
            children: [
              Object(x.jsx)(_.a, je({}, Pe)),
              Object(x.jsx)(o.a, je({}, Te)),
              Object(x.jsx)(
                c.a,
                je(
                  {
                    rate: null === e || void 0 === e ? void 0 : e.cajitas,
                  },
                  Ne
                )
              ),
              Object(x.jsx)(l.a, je({}, Le)),
              Object(x.jsx)(r.a, je({}, xe)),
              Object(x.jsx)(
                be,
                je(
                  {
                    anualYieldRatePercentage:
                      null === e || void 0 === e
                        ? void 0
                        : e.cajitas.yield_rate,
                  },
                  Ce
                )
              ),
              Object(x.jsx)(c.a, je({}, he)),
              Object(x.jsx)(O.a, je({}, ye)),
              Object(x.jsx)(f, je({}, fe)),
              Object(x.jsx)(Se.a, je({}, De)),
              Object(x.jsx)(p.a, je({}, Re)),
              Object(x.jsx)(
                d.a,
                je(
                  je({}, _e),
                  {},
                  {
                    rate:
                      null === e || void 0 === e
                        ? void 0
                        : e.cajitas.yield_rate,
                  }
                )
              ),
            ],
          })
        );
      };
    },
    xriH: function (e, t, a) {
      "use strict";
      function n(e = 0, t = 0, a = !0, n = "COP", i = "es-CO") {
        if (isNaN(e))
          throw new Error(
            '"'.concat(e, '" need to be a number to be formated as currency')
          );
        const s = {
          style: a ? "currency" : "decimal",
          currency: a ? n : void 0,
          maximumFractionDigits: t,
          minimumFractionDigits: t,
        };
        return Intl.NumberFormat(i, s).format(e);
      }
      a.d(t, "a", function () {
        return n;
      });
    },
  },
]);
//# sourceMappingURL=157d676d4472a72e1fcf3b689dd22c667bd49d51.08ef803d5be56cc0766d.js.map
