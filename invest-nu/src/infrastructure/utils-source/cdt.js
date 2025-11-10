_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [28],
  {
    "/b/I": function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return c;
      });
      var n = a("ERkP"),
        i = a("xwtD");
      const c = () => {
        const { 0: e, 1: t } = Object(n.useState)(null);
        return (
          Object(n.useEffect)(() => {
            (async () => {
              try {
                const e = await Object(i.e)();
                t(e);
              } catch (e) {
                t(null);
              }
            })();
          }, []),
          e
        );
      };
    },
    "2Zaa": function (e, t, a) {
      "use strict";
      a.d(t, "c", function () {
        return y;
      }),
        a.d(t, "b", function () {
          return C;
        });
      var n = a("LHL8"),
        i = (a("ERkP"), a("kOo4")),
        c = a("+lpl"),
        s = a("nFln"),
        o = a("1JoE"),
        l = a("Or0h"),
        r = a("kQwz"),
        d = a("cbIG"),
        p = a.n(d),
        b = a("Bwlr"),
        j = a("DgQ0"),
        m = a("y7qy"),
        O = a("jg1C");
      const g = ({ routeKey: e, openGraphResource: t }) => {
        const a = Object(r.a)(),
          {
            intlKey: n,
            noindex: i,
            nofollow: c,
            canonicals: s = {},
            alternate: o,
          } = j[e],
          l = a.formatMessage({
            id: "".concat(n || e, ".HEAD.TITLE"),
          }),
          d = a.formatMessage({
            id: "".concat(n || e, ".HEAD.META_DESCRIPTION"),
          }),
          g = p()(a, "".concat(e, ".HEAD.BREADCRUMB_TITLE")),
          u = s[a.locale];
        return Object(O.jsx)(b.a, {
          pageTitle: l,
          description: d,
          noindex: i,
          nofollow: c,
          canonicalPage: u,
          alternatePages: o,
          breadcrumbTitle: g,
          domain: m.c,
          images: t.images,
          baseBreadcrumb: m.a,
          siteName: "Nu",
          corporateContactData: m.b,
        });
      };
      g.defaultProps = {
        openGraphResource: m.d.default,
      };
      var u = g,
        h = a("N7K2");
      function x(e, t) {
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
      function f(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? x(Object(a), !0).forEach(function (t) {
                Object(n.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : x(Object(a)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      const y = {
          NO_APPLICATION: {
            showHeaderCTA: !1,
          },
          NO_APPLICATION_NO_MENU: {
            showHeaderCTA: !1,
            showHeaderMenu: !1,
            showHeaderTopMenu: !1,
          },
          ALL: {
            showHeaderCTA: !0,
            showHeaderMenu: !0,
            showHeaderTopMenu: !0,
          },
        },
        C = {
          NONE: {
            showFooter: !1,
          },
          ALL: {
            showFooter: !0,
          },
        },
        w = {
          routeKey: "HOME",
          header: {
            layout: y.ALL,
            cta: Object(O.jsx)(l.a, {}),
          },
          footer: C.ALL,
        },
        T = ({ hocOptions: e }) => {
          const { components: t } = e,
            a = null === t || void 0 === t ? void 0 : t.header;
          if (a) return Object(O.jsx)(a, {});
          const { header: n } = e,
            i = f(f({}, w.header), n),
            { cta: c, layout: s, nuLogoHref: o } = i,
            {
              showHeaderCTA: l,
              showHeaderMenu: r,
              showHeaderTopMenu: d,
              evalExpShowHeaderCTA: p,
              experiment: b,
            } = s;
          return Object(O.jsx)(h.a, {
            showCTA: l,
            evalExpShowHeaderCTA: p,
            CTA: c,
            showMenuBtn: r,
            showHeaderTopMenu: d,
            nuLogoHref: o,
            experiment: b,
          });
        },
        _ = ({ hocOptions: e }) => {
          const { components: t } = e,
            a = null === t || void 0 === t ? void 0 : t.footer;
          if (a)
            return Object(O.jsx)(a, {
              hocOptions: e,
            });
          const { footer: n } = e,
            c = f(f({}, w.footer), n),
            { showFooter: s } = c;
          return s && Object(O.jsx)(i.a, {});
        };
      t.a = (e, t) => {
        const { routeKey: a, openGraphResource: n } = f(f({}, w), t),
          i = (i) =>
            Object(O.jsxs)(O.Fragment, {
              children: [
                Object(O.jsx)(u, {
                  routeKey: a,
                  openGraphResource: n,
                }),
                Object(O.jsx)(T, {
                  hocOptions: t,
                }),
                Object(O.jsx)(c.a, {}),
                Object(O.jsx)(s.a, {}),
                Object(O.jsx)(
                  o.a,
                  f(
                    f({}, t),
                    {},
                    {
                      children: Object(O.jsx)(e, f({}, i)),
                    }
                  )
                ),
                Object(O.jsx)(_, {
                  hocOptions: t,
                }),
              ],
            });
        return (
          (i.getInitialProps = async (t) => {
            let a = {};
            return (
              e.getInitialProps && (a = await e.getInitialProps(t)), f({}, a)
            );
          }),
          i
        );
      };
    },
    ACvf: function (e, t, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/cdt",
        function () {
          return a("woSI");
        },
      ]);
    },
    QjSz: function (e, t, a) {
      "use strict";
      function n(e = 0, t = 2, a = 2) {
        if (isNaN(e))
          throw new Error(
            '"'.concat(e, '" need to be a number to be formated as percentage')
          );
        return Number(e).toLocaleString(void 0, {
          style: "percent",
          minimumFractionDigits: t,
          maximumFractionDigits: a,
        });
      }
      a.d(t, "a", function () {
        return n;
      });
    },
    mnxz: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return i;
      });
      a("ERkP");
      var n = a("jg1C");
      const i = (e) => {
        switch (e) {
          case "lightbulb":
            return Object(n.jsxs)("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              children: [
                Object(n.jsx)("path", {
                  d: "M16.1538 15.7887C16.1538 15.1349 16.4872 14.5363 16.9623 14.0871C18.3118 12.8111 19.1538 11.0039 19.1538 9C19.1538 5.13401 16.0198 2 12.1538 2C8.28782 2 5.15381 5.13401 5.15381 9C5.15381 11.0039 5.99582 12.8111 7.34534 14.0871C7.8204 14.5363 8.15381 15.1349 8.15381 15.7887V18H16.1538V15.7887ZM17.1538 9C17.1538 10.4315 16.5548 11.7199 15.5882 12.6339C14.8348 13.3463 14.1538 14.438 14.1538 15.7887V16H10.1538V15.7887C10.1538 14.438 9.4728 13.3462 8.71944 12.6339C7.75279 11.7199 7.15381 10.4315 7.15381 9C7.15381 6.23858 9.39239 4 12.1538 4C14.9152 4 17.1538 6.23858 17.1538 9Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
                Object(n.jsx)("path", {
                  d: "M9.15381 20V22H15.1538V20H9.15381Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
              ],
            });
          case "youtube":
            return Object(n.jsxs)("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "25",
              height: "24",
              viewBox: "0 0 25 24",
              fill: "none",
              children: [
                Object(n.jsx)("path", {
                  d: "M15.6819 12.0003L10.4546 14.9741V9.02637L15.6819 12.0003Z",
                  fill: "#111111",
                }),
                Object(n.jsx)("path", {
                  d: "M2.5 9C2.5 6.23858 4.73858 4 7.5 4H17.5C20.2614 4 22.5 6.23858 22.5 9V15C22.5 17.7614 20.2614 20 17.5 20H7.5C4.73858 20 2.5 17.7614 2.5 15V9ZM7.5 6C5.84315 6 4.5 7.34315 4.5 9V15C4.5 16.6569 5.84315 18 7.5 18H17.5C19.1569 18 20.5 16.6569 20.5 15V9C20.5 7.34315 19.1569 6 17.5 6H7.5Z",
                  fill: "#111111",
                }),
              ],
            });
          case "dollar_shield":
            return Object(n.jsxs)("svg", {
              width: "17",
              height: "21",
              viewBox: "0 0 17 21",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                Object(n.jsx)("path", {
                  d: "M7.4396 8.10689C7.25821 8.10689 7.10204 8.23492 7.06647 8.41278C7.02475 8.62141 7.1622 8.82372 7.37153 8.86178L10.044 9.34769C11.3338 9.58219 12.1807 10.8287 11.9236 12.1142C11.7044 13.2101 10.7422 13.9989 9.62461 13.9989H9.26837V14.9809H7.30436V13.9989H5.0946V12.0349H9.62461C9.806 12.0349 9.96216 11.9069 9.99774 11.729C10.0395 11.5204 9.90201 11.3181 9.69268 11.28L7.0202 10.7941C5.73041 10.5596 4.88352 9.31308 5.14061 8.02761C5.35089 6.97619 6.24515 6.20741 7.30436 6.14675V5.16089H9.26837V6.14289H10.9866V8.10689H7.4396Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
                Object(n.jsx)("path", {
                  d: "M7.65743 20.0961C7.87803 20.2281 8.10293 20.3625 8.33203 20.5C8.56113 20.3625 8.78603 20.2281 9.00663 20.0961C13.6007 17.3491 16.332 15.7158 16.332 11.5V4L8.33203 0L0.332031 4V11.5C0.332031 15.7158 3.06341 17.3491 7.65743 20.0961ZM14.332 11.5C14.332 13.1303 13.8295 14.1199 12.8205 15.0905C11.8132 16.0595 10.3806 16.9404 8.33203 18.1685C6.28348 16.9404 4.85088 16.0595 3.84358 15.0905C2.83459 14.1199 2.33203 13.1303 2.33203 11.5V5.23607L8.33203 2.23607L14.332 5.23607V11.5Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
              ],
            });
          case "pig_locked":
            return Object(n.jsxs)("svg", {
              width: "23",
              height: "20",
              viewBox: "0 0 23 20",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                Object(n.jsx)("path", {
                  d: "M2.3598 4.21053H1.34452V8.42105C1.34452 9.58376 2.25363 10.5263 3.37507 10.5263H7.43618C8.55762 10.5263 9.46673 9.58376 9.46673 8.42105V4.21053H8.45145V3.15789C8.45145 1.41384 7.08779 0 5.40563 0C3.72346 0 2.3598 1.41384 2.3598 3.15789V4.21053ZM7.43618 8.42105H3.37507V6.31579H7.43618V8.42105ZM4.39035 4.21053V3.15789C4.39035 2.57654 4.8449 2.10526 5.40563 2.10526C5.96635 2.10526 6.4209 2.57654 6.4209 3.15789V4.21053H4.39035Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
                Object(n.jsx)("path", {
                  d: "M19.6195 1.05263H11.1436V3.15789H17.589V3.57L15.4562 4.95206L17.8352 8.65185C18.4803 9.65512 19.5024 10.3144 20.6348 10.4834V12.5412C20.1221 12.9095 19.6566 13.278 19.2351 13.6115L19.2045 13.6358C17.7786 14.7642 16.7986 15.5057 15.3784 15.7895H5.16003C3.88232 14.5736 3.23614 13.631 2.88021 12.8077C2.85492 12.7492 2.83074 12.6906 2.80764 12.6316H0.665359C1.12043 14.315 2.15009 15.9038 4.3904 17.8947V20H6.42095V17.8947H13.5279V20H15.5584V17.8947C17.6197 17.5385 18.9835 16.4592 20.4365 15.3092C21.1305 14.76 21.8449 14.1946 22.6654 13.6842V8.42105H21.2125C20.5341 8.42057 19.901 8.06934 19.5247 7.48406L18.3056 5.58823L19.6195 4.73684V1.05263Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
                Object(n.jsx)("path", {
                  d: "M14.5432 8.42105H16.5737V10.5263H14.5432V8.42105Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
              ],
            });
          case "yield":
            return Object(n.jsxs)("svg", {
              width: "14",
              height: "16",
              viewBox: "0 0 14 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                Object(n.jsx)("path", {
                  d: "M11.9987 16H13.9987L13.9987 0H11.9987L11.9987 16Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
                Object(n.jsx)("path", {
                  d: "M9.99872 4V16H7.99872V4H9.99872Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
                Object(n.jsx)("path", {
                  d: "M3.99872 16H5.99872V8H3.99872V16Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
                Object(n.jsx)("path", {
                  d: "M1.99872 16V12H-0.00128174V16H1.99872Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
              ],
            });
          case "arrow_back":
            return Object(n.jsx)("svg", {
              width: "9",
              height: "16",
              viewBox: "0 0 9 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: Object(n.jsx)("path", {
                d: "M0.244078 7.41081L6.91074 0.744141L8.08926 1.92265L2.01184 8.00006L8.08926 14.0775L6.91074 15.256L0.244078 8.58932C-0.0813592 8.26388 -0.0813592 7.73624 0.244078 7.41081Z",
                fill: "white",
              }),
            });
          case "arrow_next":
            return Object(n.jsx)("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 20 20",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: Object(n.jsx)("path", {
                d: "M14.7559 10.5892L8.08926 17.2559L6.91074 16.0773L12.9882 9.99994L6.91075 3.92252L8.08926 2.74401L14.7559 9.41068C15.0814 9.73612 15.0814 10.2638 14.7559 10.5892Z",
                fill: "white",
              }),
            });
          case "eye_sparkle":
            return Object(n.jsxs)("svg", {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                Object(n.jsx)("path", {
                  d: "M12.0042 4.99658C13.8219 4.99658 15.336 5.36974 16.6152 5.97148L15.0852 7.50154C14.1935 7.18075 13.1779 6.99658 12.0042 6.99658C6.99446 6.99658 4.8663 10.3515 2.95532 13.3641L2.8484 13.5326L1.15997 12.4606C1.21985 12.3663 1.28053 12.2703 1.3421 12.173C3.20352 9.23036 5.88167 4.99658 12.0042 4.99658Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
                Object(n.jsx)("path", {
                  d: "M16.0042 12.9966C16.0042 15.2057 14.2133 16.9966 12.0042 16.9966C9.79502 16.9966 8.00416 15.2057 8.00416 12.9966C8.00416 10.7874 9.79502 8.99658 12.0042 8.99658C14.2133 8.99658 16.0042 10.7874 16.0042 12.9966ZM14.0042 12.9966C14.0042 11.892 13.1087 10.9966 12.0042 10.9966C10.8996 10.9966 10.0042 11.892 10.0042 12.9966C10.0042 14.1012 10.8996 14.9966 12.0042 14.9966C13.1087 14.9966 14.0042 14.1012 14.0042 12.9966Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
                Object(n.jsx)("path", {
                  d: "M19.5061 5.99658L20.6728 8.32992L23.0061 9.49658L20.6728 10.6632L19.5061 12.9966L18.3394 10.6632L16.0061 9.49658L18.3394 8.32992L19.5061 5.99658Z",
                  fill: "black",
                  fillOpacity: "0.96",
                }),
              ],
            });
          case "calendar_scheduled":
            return Object(n.jsx)("svg", {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: Object(n.jsx)("path", {
                d: "M8.15381 4H16.1538V2H18.1538V4H19.1538H21.1538V6V8V10V20V22H19.1538H5.15381H3.15381V20V10V8V6V4H5.15381H6.15381V2H8.15381V4ZM19.1538 20V10H12.1538H5.15381V20H19.1538ZM19.1538 6H5.15381V8H12.1538H19.1538V6ZM17.1538 14H13.1538V18H17.1538V14Z",
                fill: "black",
                fillOpacity: "0.96",
              }),
            });
          default:
            throw new Error("IconBuilder: Icon ".concat(e, " not found"));
        }
      };
    },
    "sO/O": function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return c;
      });
      var n = a("ERkP"),
        i = a("Se+g");
      const c = function () {
        const { 0: e, 1: t } = Object(n.useState)([]);
        return (
          Object(n.useEffect)(() => {
            (async () => {
              try {
                const e = await Object(i.a)();
                t(e);
              } catch (e) {
                t(null);
              }
            })();
          }, []),
          e
        );
      };
    },
    woSI: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("ERkP"),
        i = a.n(n),
        c = a("2Zaa"),
        s = a("LHL8"),
        o = a("eJka"),
        l = a("C23i"),
        r = a("xwtD"),
        d = a("wuNQ"),
        p = a("NRi+"),
        b = a("j/s1"),
        j = a("kQwz"),
        m = a("C+fP"),
        O = a.n(m),
        g = a("OLg7"),
        u = a("ub57"),
        h = a("AEx+"),
        x = a.n(h),
        f = a("VSrG"),
        y = a.n(f),
        C = a("V0VH"),
        w = a("8HIL");
      const T = Object(b.default)(x.a).withConfig({
          displayName: "YieldDataEntrystyles__ComponentWrapper",
          componentId: "sc-ococzj-0",
        })(
          ["margin-top:32px;", ""],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["width:100%;"]),
            lg: Object(b.css)(["width:50%;"]),
          })
        ),
        _ = Object(b.default)(x.a).withConfig({
          displayName: "YieldDataEntrystyles__ButtonsWrapper",
          componentId: "sc-ococzj-1",
        })(
          [
            "display:grid;grid-template-columns:194px 48px 48px;padding:",
            ";",
            " ",
          ],
          Object(C.spacing)("4x", 0, "6x"),
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["column-gap:19px;"]),
            md: Object(b.css)(["column-gap:24px;display:flex;"]),
          })
        ),
        I = Object(b.default)(x.a).withConfig({
          displayName: "YieldDataEntrystyles__RateWrapper",
          componentId: "sc-ococzj-2",
        })(
          ["display:flex;padding:", ";", " "],
          Object(C.spacing)("4x", 0, "6x"),
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["column-gap:19px;"]),
            md: Object(b.css)(["column-gap:24px;"]),
          })
        ),
        N = Object(b.default)(O.a).withConfig({
          displayName: "YieldDataEntrystyles__InputWrapper",
          componentId: "sc-ococzj-3",
        })(
          [
            "align-items:center;display:flex;flex:1;",
            "  > span{font-size:inherit;}& > input{background-color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;font-weight:inherit;letter-spacing:inherit;min-width:0;}",
          ],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["font-size:28px;"]),
            md: Object(b.css)(["font-size:36px;"]),
            lg: Object(b.css)(["font-size:48px;"]),
          })
        ),
        E = Object(b.default)(O.a).withConfig({
          displayName: "YieldDataEntrystyles__SmallInputWrapper",
          componentId: "sc-ococzj-4",
        })(
          [
            "align-items:center;display:flex;flex:1;",
            "  > span{font-size:inherit;}& > input{background-color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;font-weight:inherit;letter-spacing:inherit;min-width:0;}",
          ],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["font-size:28px;"]),
            md: Object(b.css)(["font-size:24px;"]),
          })
        ),
        v = Object(b.default)("button").withConfig({
          displayName: "YieldDataEntrystyles__StyledButton",
          componentId: "sc-ococzj-5",
        })([
          "display:flex;justify-content:center;align-items:center;flex:none;background-color:#820AD1;border-radius:100%;box-sizing:content-box;height:48px;margin:0;width:48px;:disabled{color:#113;background:rgb(17 17 17 /10%);cursor:not-allowed;>svg{fill:none;color:darkgray;}};:focus{background-color:#A129F0;}",
        ]),
        A = Object(b.default)(y.a).withConfig({
          displayName: "YieldDataEntrystyles__StyledIcon",
          componentId: "sc-ococzj-6",
        })(["color:white;"]);
      (T.displayName = "ComponentWrapper"),
        (_.displayName = "ButtonsWrapper"),
        (N.displayName = "InputWrapper"),
        (E.displayName = "SmallInputWrapper"),
        (v.displayName = "StyledButton");
      const D = (e) => Number.parseInt(e, 10);
      function L(e, t = 0, a = "UP") {
        const n = 10 ** t;
        return "UP" === a ? Math.ceil(e * n) / n : Math.round(e * n) / n;
      }
      var S = a("xriH"),
        M = a("mnxz"),
        k = a("jg1C");
      function R(e, t) {
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
      function H(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? R(Object(a), !0).forEach(function (t) {
                Object(s.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : R(Object(a)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      const V = ({
        onBalanceChange: e,
        calculateBalance: t,
        cdtMinOpeninng: a,
        packages: i,
        maxYield: c,
      }) => {
        var s, o, l, r, d, p, b;
        const m = ((e, t) => e.map((e) => e.formattedYield).indexOf(t))(i, c),
          O = Object(g.useBreakpointsMediaDown)("md"),
          h = {
            balance: a,
            formattedYield:
              null === (s = i[m]) || void 0 === s ? void 0 : s.formattedYield,
            percentageYield:
              null === (o = i[m]) || void 0 === o ? void 0 : o.yield,
            durationInDays:
              null === (l = i[m]) || void 0 === l ? void 0 : l.days,
            currentPackage: m,
          },
          x = {
            balance: {
              min: 0,
              max: 1e8,
            },
            currentPackage: {
              min: 0,
              max: i.length - 1,
            },
          },
          { formatMessage: f } = Object(j.a)(),
          { 0: y, 1: C } = Object(n.useState)(h);
        Object(n.useEffect)(() => {
          var a, n;
          const { balance: c, currentPackage: s } = y,
            o = null === (a = i[s]) || void 0 === a ? void 0 : a.yield,
            l = null === (n = i[s]) || void 0 === n ? void 0 : n.days,
            {
              term: r,
              grossBalance: d,
              netBalance: p,
              tax: b,
              earnings: j,
            } = t({
              balance: c,
              percentageYield: o,
              durationInDays: l,
            });
          e({
            term: r,
            grossBalance: d,
            netBalance: p,
            tax: b,
            earnings: j,
          });
        }, [y]);
        const w = Object(n.useCallback)(
          (e, t, a) => (n) => {
            n.preventDefault(), a && Object(u.a)(a);
            const i = D(t ? y[e] + t : n.target.value.replace(/\./g, "")),
              c = ((e, { min: t, max: a }) => (e <= t ? t : e >= a ? a : e))(
                i >= 0 ? i : 0,
                x[e]
              );
            C(
              H(
                H({}, y),
                {},
                {
                  [e]: c,
                }
              )
            );
          },
          [y]
        );
        return Object(k.jsxs)(T, {
          tag: "div",
          children: [
            Object(k.jsx)(F, {
              tag: "label",
              htmlFor: "cdt-calculator-initial-balance",
              variant: "subtitle1",
              strong: !0,
              intlKey: "CDT.YIELD_CALCULATOR.INITIAL_DEPOSIT.LABEL",
            }),
            Object(k.jsxs)(_, {
              children: [
                Object(k.jsxs)(N, {
                  tag: "div",
                  variant: "heading2",
                  children: [
                    Object(k.jsx)("span", {
                      children: "$",
                    }),
                    Object(k.jsx)("input", {
                      inputMode: "numeric",
                      size:
                        (null === y || void 0 === y
                          ? void 0
                          : y.balance.toString().length) + (O ? 3 : 1),
                      value: "".concat(Object(S.a)(y.balance, 0, !1)),
                      "data-testid": "cdt-calculator-initial-balance",
                      onChange: w("balance"),
                    }),
                  ],
                }),
                Object(k.jsx)(v, {
                  "data-testid": "cdt-calculator-initial-balance-decrease",
                  disabled: y.balance <= x.balance.min,
                  onClick: w(
                    "balance",
                    -1 * a,
                    "CDT_CALCULATOR_INITIAL_DEPOSIT_DECREASE"
                  ),
                  children: Object(k.jsx)(A, {
                    name: "minus",
                    size: "small",
                  }),
                }),
                Object(k.jsx)(v, {
                  "data-testid": "cdt-calculator-initial-balance-increase",
                  disabled: y.balance >= x.balance.max,
                  onClick: w(
                    "balance",
                    a,
                    "CDT_CALCULATOR_INITIAL_DEPOSIT_INCREASE"
                  ),
                  children: Object(k.jsx)(A, {
                    name: "plus",
                    size: "small",
                  }),
                }),
              ],
            }),
            Object(k.jsx)(B, {
              tag: "label",
              htmlFor: "cdt-calculator-duration-in-days",
              variant: "subtitle1",
              strong: !0,
              intlKey: "CDT.YIELD_CALCULATOR.DURATION_IN_DAYS.LABEL",
            }),
            Object(k.jsxs)(_, {
              children: [
                Object(k.jsxs)(N, {
                  tag: "div",
                  variant: "heading2",
                  children: [
                    Object(k.jsx)("input", {
                      inputMode: "numeric",
                      size:
                        (null === (r = i[y.currentPackage]) || void 0 === r
                          ? void 0
                          : r.days.toString().length) + O,
                      value:
                        null === (d = i[y.currentPackage]) || void 0 === d
                          ? void 0
                          : d.days,
                      "data-testid": "cdt-calculator-duration-in-days",
                      onChange: w("durationInDays"),
                    }),
                    Object(k.jsx)("span", {
                      children: f({
                        id:
                          1 ===
                          (null === (p = i[y.currentPackage]) || void 0 === p
                            ? void 0
                            : p.days)
                            ? "CDT.YIELD_CALCULATOR.DURATION_IN_DAYS.LABEL.SINGULAR"
                            : "CDT.YIELD_CALCULATOR.DURATION_IN_DAYS.LABEL.PLURAL",
                      }),
                    }),
                  ],
                }),
                Object(k.jsx)(v, {
                  "data-testid": "cdt-calculator-duration-in-days-decrease",
                  disabled: y.currentPackage <= x.currentPackage.min,
                  onClick: w(
                    "currentPackage",
                    -1,
                    "CDT_CALCULATOR_DURATION_DECREASE"
                  ),
                  children: Object(M.a)("arrow_back"),
                }),
                Object(k.jsx)(v, {
                  "data-testid": "cdt-calculator-duration-in-days-increase",
                  disabled: y.currentPackage >= x.currentPackage.max,
                  onClick: w(
                    "currentPackage",
                    1,
                    "CDT_CALCULATOR_DURATION_INCREASE"
                  ),
                  children: Object(M.a)("arrow_next"),
                }),
              ],
            }),
            Object(k.jsx)(Y, {
              tag: "label",
              htmlFor: "calculator-yield",
              variant: "subtitle1",
              strong: !0,
              intlKey: "CDT.YIELD_CALCULATOR.YIELD.LABEL",
            }),
            Object(k.jsx)(I, {
              children: Object(k.jsx)(E, {
                tag: "div",
                variant: "heading4",
                children: Object(k.jsx)("input", {
                  inputMode: "text",
                  value: f(
                    {
                      id: "CDT.YIELD_CALCULATOR.YIELD.VALUE.LABEL",
                    },
                    {
                      yieldRate:
                        null === (b = i[y.currentPackage]) || void 0 === b
                          ? void 0
                          : b.formattedYield,
                    }
                  ),
                  "data-testid": "calculator-yield",
                  onChange: w("percentageYield"),
                }),
              }),
            }),
          ],
        });
      };
      V.defaultProps = {
        calculateBalance: (e = {}) => {
          const {
              balance: t = 0,
              percentageYield: a = 0,
              durationInDays: n = 0,
            } = e,
            i = t,
            c = L((1 + a) ** (n / 365) - 1, 6),
            s = L((c + 1) * i, 2, "DOWN"),
            o = L(0.04 * (s - i), 2),
            l = s - o;
          return {
            term: n,
            tax: o,
            grossBalance: s,
            netBalance: l,
            earnings: L(l - i + o, 2, "DOWN"),
          };
        },
        onBalanceChange: () => {},
      };
      var P = i.a.memo(V),
        F = Object(b.default)(O.a).withConfig({
          displayName: "YieldDataEntry___StyledTypography",
          componentId: "sc-1pijrb8-0",
        })(["color:rgb(0 0 0 / 64%);"]),
        B = Object(b.default)(O.a).withConfig({
          displayName: "YieldDataEntry___StyledTypography2",
          componentId: "sc-1pijrb8-1",
        })(["color:rgb(0 0 0 / 64%);"]),
        Y = Object(b.default)(O.a).withConfig({
          displayName: "YieldDataEntry___StyledTypography3",
          componentId: "sc-1pijrb8-2",
        })(["color:rgb(0 0 0 / 64%);"]),
        z = a("17x9"),
        U = a.n(z);
      U.a.shape({
        balanceGross: U.a.number,
        balanceNet: U.a.number,
        savings: U.a.number,
      });
      const K = Object(b.default)(O.a).withConfig({
          displayName: "YieldEstimationstyles__StyledTypography",
          componentId: "sc-7emoeo-0",
        })(
          [
            "line-height:1;font-weight:600;word-break:break-word;padding:16px 0;border-bottom:.25rem solid ",
            ";",
            "",
          ],
          Object(C.nuDSColor)("primary"),
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["font-size:28px;"]),
            md: Object(b.css)(["font-size:36px;"]),
            lg: Object(b.css)(["font-size:48px;"]),
          })
        ),
        W = Object(b.default)(x.a).withConfig({
          displayName: "YieldEstimationstyles__ComponentWrapper",
          componentId: "sc-7emoeo-1",
        })([
          "align-self:start;margin-top:32px;display:flex;flex-direction:column;flex:1;width:50%;",
        ]),
        q = Object(b.default)(x.a).withConfig({
          displayName: "YieldEstimationstyles__EstimationWrapper",
          componentId: "sc-7emoeo-2",
        })(["display:flex;justify-content:space-between;"]);
      (K.displayName = "StyledTypography"),
        (W.displayName = "ComponentWrapper"),
        (q.displayName = "EstimationWrapper");
      const Z = !0,
        Q = ({ balance: e }) =>
          Object(k.jsxs)(W, {
            tag: "div",
            children: [
              Object(k.jsx)($, {
                variant: "subtitle1",
                strong: !0,
                intlKey: "CDT.YIELD_CALCULATOR.YIELD_ESTIMATION.DURATION.LABEL",
              }),
              Object(k.jsx)(K, {
                children: Object(S.a)(
                  null === e || void 0 === e ? void 0 : e.netBalance,
                  2,
                  Z
                ),
              }),
              Object(k.jsxs)(k.Fragment, {
                children: [
                  Object(k.jsxs)(q, {
                    children: [
                      Object(k.jsx)(O.a, {
                        marginTop: "16px",
                        variant: "subtitle1",
                        strong: !0,
                        intlKey:
                          "CDT.YIELD_CALCULATOR.ESTIMATION.WITHOUT_WITHOLDING.LABEL",
                      }),
                      Object(k.jsx)(O.a, {
                        marginTop: "16px",
                        variant: "subtitle1",
                        strong: !0,
                        intlKey: "CDT.YIELD_CALCULATOR.ESTIMATION.VALUE",
                        intlValues: {
                          value: Object(S.a)(
                            null === e || void 0 === e ? void 0 : e.earnings,
                            2,
                            Z
                          ),
                        },
                      }),
                    ],
                  }),
                  Object(k.jsxs)(q, {
                    children: [
                      Object(k.jsx)(O.a, {
                        marginTop: "8px",
                        variant: "subtitle1",
                        intlKey:
                          "CDT.YIELD_CALCULATOR.ESTIMATION.TOTAL_WITHOLDING.LABEL",
                      }),
                      Object(k.jsx)(O.a, {
                        marginTop: "8px",
                        variant: "subtitle1",
                        intlKey: "CDT.YIELD_CALCULATOR.ESTIMATION.VALUE",
                        intlValues: {
                          value: Object(S.a)(
                            null === e || void 0 === e ? void 0 : e.tax,
                            2,
                            Z
                          ),
                        },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
      Q.defaultProps = {
        balance: {},
      };
      var J = i.a.memo(Q),
        $ = Object(b.default)(O.a).withConfig({
          displayName: "YieldEstimation___StyledTypography",
          componentId: "sc-13u0uoy-0",
        })(["color:rgb(0 0 0 / 64%);"]);
      const G = Object(b.default)(x.a).withConfig({
          displayName: "CdtYieldCalculatorstyles__ComponentWrapper",
          componentId: "sc-1f4dsns-0",
        })(
          [
            "background-color:#F6ECFF;display:flex;flex-direction:column;row-gap:",
            ";",
            ";",
          ],
          Object(C.spacing)("2x"),
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["padding:28px;"]),
            md: Object(b.css)(["padding:64px 140px;"]),
            lg: Object(b.css)(["padding:64px 110px;max-height:784px;"]),
            xl: Object(b.css)(["padding:64px 220px;"]),
          })
        ),
        X = Object(b.default)(x.a).withConfig({
          displayName: "CdtYieldCalculatorstyles__CalculationsWrapper",
          componentId: "sc-1f4dsns-1",
        })(
          [
            "display:flex;justify-content:space-between;flex-wrap:wrap;max-width:826px;",
            ";",
          ],
          Object(w.breakpointsMedia)({
            md: Object(b.css)(["column-gap:40px;"]),
            lg: Object(b.css)(["column-gap:8%;max-width:100%;"]),
          })
        ),
        ee = Object(b.default)(O.a).withConfig({
          displayName: "CdtYieldCalculatorstyles__HeaderText",
          componentId: "sc-1f4dsns-2",
        })(
          ["", ";"],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["padding-right:5%;"]),
            md: Object(b.css)(["padding-right:10%;"]),
          })
        );
      function te({ cdtMinOpenning: e, yieldRates: t }) {
        const { 0: a, 1: i } = Object(n.useState)(void 0),
          c = Object(r.c)(t).yield_rate,
          s = Object(r.f)(t);
        return Object(k.jsxs)(G, {
          tag: "section",
          children: [
            Object(k.jsx)(ee, {
              tag: "h2",
              variant: "heading3",
              intlKey: "CDT.YIELD_CALCULATOR.TITLE",
            }),
            Object(k.jsx)(X, {
              children: Object(k.jsxs)(k.Fragment, {
                children: [
                  Object(k.jsx)(P, {
                    cdtMinOpeninng: e,
                    onBalanceChange: i,
                    packages: s,
                    maxYield: c,
                  }),
                  Object(k.jsx)(J, {
                    balance: a,
                  }),
                ],
              }),
            }),
          ],
        });
      }
      (G.displayName = "ComponentWrapper"),
        (X.displayName = "CalculationsWrapper"),
        (ee.displayName = "HeaderText"),
        (te.defaultProps = {
          cdtMinOpenning: 5e4,
        });
      var ae = i.a.memo(te);
      const ne = b.default.div.withConfig({
          displayName: "Card",
          componentId: "sc-zftflw-0",
        })(
          [
            "border-radius:16px;border:2px solid #efefef;padding:16px;flex-direction:column;margin:10px;width:100%;max-width:340px;",
            ";",
          ],
          Object(w.breakpointsMedia)({
            md: Object(b.css)(["height:110px;padding:16px;"]),
          })
        ),
        ie = b.default.div.withConfig({
          displayName: "Card__CardContent",
          componentId: "sc-zftflw-1",
        })([
          "display:flex;flex-direction:row;justify-content:space-between;width:100%;",
        ]),
        ce = b.default.div.withConfig({
          displayName: "Card__Container",
          componentId: "sc-zftflw-2",
        })(
          [
            "",
            " display:flex;flex-direction:column;align-items:center;justify-content:center;",
          ],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["padding:64px 24px;"]),
          })
        ),
        se = b.default.div.withConfig({
          displayName: "Card__CardContainer",
          componentId: "sc-zftflw-3",
        })(
          [
            "display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;",
            "",
          ],
          Object(w.breakpointsMedia)({
            md: Object(b.css)(["flex-direction:row;align-items:center;"]),
            lg: Object(b.css)(["width:66vw;"]),
          })
        ),
        oe = (e) => {
          const { formatMessage: t } = Object(j.a)();
          return Object(n.useMemo)(
            () =>
              t({
                id: e,
              }),
            [e, t]
          );
        };
      var le = ({ title: e, links: t }) =>
          Object(k.jsx)(k.Fragment, {
            children: Object(k.jsxs)(ce, {
              children: [
                Object(k.jsx)(re, {
                  variant: "heading2",
                  dangerouslySetInnerHTML: {
                    __html: oe(e),
                  },
                  $_css: Object(w.breakpointsMedia)({
                    md: Object(b.css)(["margin:20px 0;"]),
                  }),
                }),
                Object(k.jsx)(se, {
                  children: t.map((e) =>
                    Object(k.jsxs)(
                      ne,
                      {
                        onClick: () => {
                          window.open(e.url, "_blank");
                        },
                        children: [
                          Object(M.a)(e.icon),
                          Object(k.jsxs)(ie, {
                            children: [
                              Object(k.jsx)(de, {
                                variant: "subtitle1",
                                dangerouslySetInnerHTML: {
                                  __html: oe(e.link),
                                },
                              }),
                              Object(k.jsx)(y.a, {
                                name: "arrow-up-right",
                              }),
                            ],
                          }),
                        ],
                      },
                      e.link
                    )
                  ),
                }),
              ],
            }),
          }),
        re = Object(b.default)(O.a).withConfig({
          displayName: "KnowMore___StyledTypography",
          componentId: "sc-ndxdhe-0",
        })(["margin:10px 20px;", ";"], (e) => e.$_css),
        de = Object(b.default)(O.a).withConfig({
          displayName: "KnowMore___StyledTypography2",
          componentId: "sc-ndxdhe-1",
        })(["font-weight:bold;"]),
        pe = a("LG/d"),
        be = a.n(pe),
        je = a("Lkob"),
        me = a.n(je);
      const Oe = Object(b.default)(O.a).withConfig({
          displayName: "Stamp__TypographyStyled",
          componentId: "sc-xcaw7m-0",
        })(
          ["margin:10px 20px;text-align:center;max-width:700px;", ""],
          Object(w.breakpointsMedia)({
            lg: "max-width: 826px;",
          })
        ),
        ge = b.default.div.withConfig({
          displayName: "Stamp__Container",
          componentId: "sc-xcaw7m-1",
        })(
          [
            "",
            " display:flex;flex-direction:column;align-items:center;justify-content:center;",
          ],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["padding:64px 24px;"]),
          })
        ),
        ue = (e) => {
          const { formatMessage: t } = Object(j.a)();
          return Object(n.useMemo)(
            () =>
              t({
                id: e,
              }),
            [e, t]
          );
        };
      var he = function ({ typography: e, image: t }) {
          const { title: a, specificColor: n } = e,
            { alt: i, images: c, link: s } = t;
          return Object(k.jsx)(k.Fragment, {
            children: Object(k.jsxs)(ge, {
              children: [
                Object(k.jsx)(xe, {
                  "data-testid": "stamp-title",
                  variant: "heading2",
                  dangerouslySetInnerHTML: {
                    __html: ue(a),
                  },
                  $_css: ue(n),
                }),
                Object(k.jsx)(fe, {
                  href: ue(s),
                  children: Object(k.jsx)(me.a, {
                    alt: ue(i),
                    srcSet: c,
                    webp: !0,
                  }),
                }),
              ],
            }),
          });
        },
        xe = Object(b.default)(Oe).withConfig({
          displayName: "Stamp___StyledTypographyStyled",
          componentId: "sc-qfie0s-0",
        })(["span{color:", ";}"], (e) => e.$_css),
        fe = Object(b.default)(be.a).withConfig({
          displayName: "Stamp___StyledLink",
          componentId: "sc-qfie0s-1",
        })(["width:162px;padding-top:16px;"]),
        ye = a("sO/O"),
        Ce = a("/b/I"),
        we = a("QL4c"),
        Te = a("1uEp"),
        _e = a("Sdre"),
        Ie = a("fco8");
      const Ne = Object(b.default)(O.a).withConfig({
        displayName: "Typography__StyledTypography",
        componentId: "sc-zvbwqs-0",
      })(["color:rgb(0 0 0 / 64%);"]);
      Ne.displayName = "StyledTypography";
      const Ee = b.default.section.withConfig({
        displayName: "HeroContainer",
        componentId: "sc-1fkesif-0",
      })(
        ["display:flex;flex-direction:column;background-color:#F6ECFF;", ""],
        Object(w.breakpointsMedia)({
          xs: Object(b.css)([""]),
          md: Object(b.css)(["flex-direction:column;"]),
          lg: Object(b.css)(["flex-direction:row;height:640px;"]),
        })
      );
      Ee.displayName = "HeroContainer";
      var ve,
        Ae,
        De,
        Le,
        Se = a("n66V");
      const Me = b.default.picture.withConfig({
        displayName: "HeroPicture",
        componentId: "sc-1nvu13h-0",
      })(
        ["display:block;img{height:auto;width:100%;", " ", " ", "}", ""],
        Object(w.mobile480)(
          ve || (ve = Object(Se.a)(["\n      margin-top: 60px;\n    "]))
        ),
        Object(w.tablet768)(
          Ae || (Ae = Object(Se.a)(["\n      width: 100%;\n    "]))
        ),
        Object(w.desktop1024)(
          De ||
            (De = Object(Se.a)([
              "\n      margin-top: 40px;\n      height: 600px;\n      margin-left: 0px;\n      margin-right: auto;\n    ",
            ]))
        ),
        Object(w.desktop1024)(
          Le || (Le = Object(Se.a)(["\n    order: 0;\n  "]))
        )
      );
      var ke;
      Me.displayName = "HeroPicture";
      const Re = b.default.div.withConfig({
        displayName: "HeroForm",
        componentId: "sc-jgyvhr-0",
      })(
        ["padding:1.5rem;order:3;", ""],
        Object(w.tablet768)(
          ke ||
            (ke = Object(Se.a)([
              "\n    padding: 2.5rem;\n    flex-grow: 1;\n    width: 100%;\n    order: 2;\n    flex-basis: 50%;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    padding: 3.5rem;\n  ",
            ]))
        )
      );
      Re.displayName = "HeroForm";
      const He = b.default.div.withConfig({
        displayName: "JumpToTitle",
        componentId: "sc-1p12vwg-0",
      })([
        "margin-top:25px;display:flex;justify-content:start;align-items:center;position:relative;cursor:pointer;",
      ]);
      function Ve(e, t) {
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
      function Pe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ve(Object(a), !0).forEach(function (t) {
                Object(s.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Ve(Object(a)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      He.displayName = "JumpToTitle";
      const Fe = ({
        alt: e,
        heroImages: t,
        descriptionImage: a,
        title: i,
        subtitle: c,
        specificColor: s,
        knowMore: o,
        isClarityExperimentOn: l,
        form: r,
        showApplicationForm: d,
      }) => {
        const { formatMessage: p } = Object(j.a)(),
          b = Object(n.useMemo)(() =>
            p({
              id: i,
            })
          ),
          m = Object(n.useMemo)(() =>
            p({
              id: c,
            })
          ),
          O = Object(n.useMemo)(() =>
            p({
              id: o,
            })
          ),
          g = Pe(
            Pe({}, r),
            {},
            {
              isClarityExperimentOn: l,
            }
          );
        return Object(k.jsxs)(Ee, {
          children: [
            Object(k.jsx)(we.a, {
              srcSet: t,
            }),
            Object(k.jsxs)(Re, {
              children: [
                Object(k.jsx)(Te.a, {
                  children: Object(k.jsx)(Ye, {
                    "data-testid": "hero-title",
                    variant: "heading1",
                    gutterBottom: 1,
                    dangerouslySetInnerHTML: {
                      __html: b,
                    },
                    $_css: s.startsWith("#")
                      ? s
                      : Object(C.nuDSColor)("primary", s),
                  }),
                }),
                Object(k.jsx)(Te.a, {
                  children: Object(k.jsx)(ze, {
                    "data-testid": "hero-subtitle",
                    variant: "heading4",
                    gutterBottom: 1,
                    marginBottom: 36,
                    dangerouslySetInnerHTML: {
                      __html: m,
                    },
                  }),
                }),
                d &&
                  Object(k.jsx)(_e.a, {
                    color: l ? "#000000" : s,
                    children: Object(k.jsx)(Ie.a, Pe({}, g)),
                  }),
                Object(k.jsxs)(He, {
                  onClick: (e) =>
                    ((e) => {
                      Object(u.a)("CDT_KNOW_MORE_SCROLL"),
                        e.preventDefault(),
                        document
                          .getElementById("cdt-main-values")
                          .scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                    })(e),
                  children: [
                    Object(k.jsx)(Ue, {
                      "data-testid": "hero-subtitle",
                      variant: "subtitle1",
                      gutterBottom: 1,
                      marginBottom: 36,
                      dangerouslySetInnerHTML: {
                        __html: O,
                      },
                    }),
                    Object(k.jsx)(Ke, {
                      name: "arrow-down",
                    }),
                  ],
                }),
              ],
            }),
            Object(k.jsx)(Me, {
              children: Object(k.jsx)(x.a, {
                children: Object(k.jsx)(me.a, {
                  srcSet: t,
                  loading: "lazy",
                  alt: e,
                  title: a,
                  webp: !0,
                }),
              }),
            }),
          ],
        });
      };
      Fe.defaultProps = {
        specificColor: "default",
        isClarityExperimentOn: !1,
        showApplicationForm: !1,
      };
      var Be = Fe,
        Ye = Object(b.default)(O.a).withConfig({
          displayName: "Hero___StyledTypography",
          componentId: "sc-1tiau5k-0",
        })(["span{color:", ";}"], (e) => e.$_css),
        ze = Object(b.default)(Ne).withConfig({
          displayName: "Hero___StyledStyledTypography",
          componentId: "sc-1tiau5k-1",
        })(["span{color:black;}"]),
        Ue = Object(b.default)(Ne).withConfig({
          displayName: "Hero___StyledStyledTypography2",
          componentId: "sc-1tiau5k-2",
        })(["font-weight:800;color:#820ad1;margin:0 5px 0 0;"]),
        Ke = Object(b.default)(y.a).withConfig({
          displayName: "Hero___StyledIcon",
          componentId: "sc-1tiau5k-3",
        })(["color:#820ad1;"]);
      const We = b.default.section.withConfig({
          displayName: "Card__MainSection",
          componentId: "sc-1aftuw1-0",
        })([
          "display:flex;width:100%;justify-content:center;padding-top:60px;",
        ]),
        qe = b.default.div.withConfig({
          displayName: "Card",
          componentId: "sc-1aftuw1-1",
        })(
          [
            "border-radius:16px;border:2px solid #efefef;padding:16px;flex-direction:column;margin:10px;",
            ";",
          ],
          Object(w.breakpointsMedia)({
            md: Object(b.css)(["height:232px;"]),
            lg: Object(b.css)(["height:160px;width:30%"]),
            xs: Object(b.css)(["height:136px;width:100%"]),
          })
        ),
        Ze = b.default.div.withConfig({
          displayName: "Card__CardContent",
          componentId: "sc-1aftuw1-2",
        })(["justify-content:space-between;width:90%;"]),
        Qe = b.default.div.withConfig({
          displayName: "Card__Container",
          componentId: "sc-1aftuw1-3",
        })(
          [
            "display:flex;box-sizing:border-box;flex-direction:column;align-items:center;justify-content:center;",
            ";",
          ],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["width:90%;"]),
            md: Object(b.css)(["width:85%;"]),
            lg: Object(b.css)(["width:61%;"]),
          })
        ),
        Je = b.default.div.withConfig({
          displayName: "Card__CardContainer",
          componentId: "sc-1aftuw1-4",
        })(
          ["margin-top:24px;display:flex;", ""],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["flex-direction:column;"]),
            md: Object(b.css)(["flex-direction:row;"]),
            lg: Object(b.css)(["flex-direction:row;"]),
          })
        ),
        $e = ({ title: e, subtitle: t, values: a, yieldRates: n }) => {
          let i = null;
          return (
            null !== n && "cdts" in n && (i = Object(r.c)(n.cdts)),
            Object(k.jsx)(k.Fragment, {
              children: Object(k.jsx)(We, {
                tag: "section",
                backgroundColor: "white",
                id: "cdt-main-values",
                children: Object(k.jsxs)(Qe, {
                  children: [
                    Object(k.jsx)(Xe, {
                      strong: !0,
                      variant: "subtitle1",
                      intlKey: e,
                    }),
                    Object(k.jsx)(O.a, {
                      marginTop: "12px",
                      marginLeft: "10px",
                      variant: "heading2",
                      intlKey: t,
                    }),
                    Object(k.jsxs)(Je, {
                      children: [
                        a.map((e, t) => {
                          var a;
                          return (
                            !(!i && 0 === t) &&
                            Object(k.jsxs)(
                              qe,
                              {
                                children: [
                                  Object(M.a)(e.icon),
                                  Object(k.jsx)("br", {}),
                                  Object(k.jsx)("br", {}),
                                  Object(k.jsx)(Ze, {
                                    children: Object(k.jsx)(et, {
                                      variant: "subtitle1",
                                      intlKey: e.content,
                                      intlValues: {
                                        yield:
                                          null === (a = i) || void 0 === a
                                            ? void 0
                                            : a.yield_rate,
                                        span: (e) =>
                                          Object(k.jsx)("span", {
                                            children: e,
                                          }),
                                      },
                                    }),
                                  }),
                                ],
                              },
                              e.content
                            )
                          );
                        }),
                        Object(k.jsx)("br", {}),
                        Object(k.jsx)("br", {}),
                      ],
                    }),
                  ],
                }),
              }),
            })
          );
        };
      $e.defaultProps = {
        yieldRates: {
          cdts: [],
        },
      };
      var Ge = $e,
        Xe = Object(b.default)(O.a).withConfig({
          displayName: "MainValues___StyledTypography",
          componentId: "sc-1ul5f84-0",
        })(["color:rgb(0 0 0 / 64%);align-self:start;margin-left:10px;"]),
        et = Object(b.default)(O.a).withConfig({
          displayName: "MainValues___StyledTypography2",
          componentId: "sc-1ul5f84-1",
        })(["span{font-weight:bold;}"]);
      const tt = b.default.section.withConfig({
          displayName: "StyledComponents__MainSection",
          componentId: "sc-29ux6p-0",
        })([
          "display:flex;width:100%;justify-content:center;align-items:center;padding-top:60px;",
        ]),
        at = b.default.div.withConfig({
          displayName: "StyledComponents__Container",
          componentId: "sc-29ux6p-1",
        })(
          [
            "box-sizing:border-box;flex-direction:column;align-items:center;justify-content:center;",
            ";",
          ],
          Object(w.breakpointsMedia)({
            md: Object(b.css)(["width:85%"]),
            lg: Object(b.css)(["width:77%"]),
            xs: Object(b.css)(["width:87%"]),
          })
        );
      var nt = ({ images: e, alt: t }) => {
          const { formatMessage: a } = Object(j.a)(),
            i = Object(n.useMemo)(() =>
              a({
                id: t,
              })
            );
          return Object(k.jsx)(k.Fragment, {
            children: Object(k.jsx)(tt, {
              tag: "section",
              backgroundColor: "white",
              children: Object(k.jsx)(at, {
                children: Object(k.jsx)(it, {
                  srcSet: e,
                  loading: "lazy",
                  alt: i,
                  webp: !0,
                }),
              }),
            }),
          });
        },
        it = Object(b.default)(me.a).withConfig({
          displayName: "DecorativeSection___StyledImage",
          componentId: "sc-1sqcm8i-0",
        })(["border-radius:20px;"]);
      const ct = b.default.section.withConfig({
          displayName: "Card__MainSection",
          componentId: "sc-1nsr34y-0",
        })([
          "display:flex;width:100%;justify-content:center;padding-top:64px;padding-bottom:64px;",
        ]),
        st = b.default.div.withConfig({
          displayName: "Card",
          componentId: "sc-1nsr34y-1",
        })(
          [
            "border-radius:16px;border:2px solid #efefef;padding-top:16px;flex-direction:column;margin:4px;",
            ";",
          ],
          Object(w.breakpointsMedia)({
            md: Object(b.css)(["height:108px;"]),
            lg: Object(b.css)(["height:108px;width:32%"]),
            xs: Object(b.css)(["height:92px;width:31%"]),
          })
        ),
        ot = b.default.div.withConfig({
          displayName: "Card__CardContent",
          componentId: "sc-1nsr34y-2",
        })(["width:100%;align-items:center;justify-content:center;"]),
        lt = b.default.div.withConfig({
          displayName: "Card__Container",
          componentId: "sc-1nsr34y-3",
        })(
          [
            "display:flex;box-sizing:border-box;flex-direction:column;align-items:center;justify-content:center;",
            ";",
          ],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["width:90%;max-width:327px;"]),
            md: Object(b.css)(["width:85%;max-width:656px;"]),
            lg: Object(b.css)(["width:61%;max-width:826px;"]),
          })
        ),
        rt = b.default.div.withConfig({
          displayName: "Card__CardContainer",
          componentId: "sc-1nsr34y-4",
        })([
          "padding-top:16px;justify-content:center;width:100%;display:flex;text-align:center;flex-direction:row;",
        ]);
      var dt = ({ title: e, subtitle: t, disclaimer: a, yieldRates: n }) => {
          const i = Object(r.c)(n),
            c = Object(r.f)(n),
            s = Object(r.d)(i);
          return Object(k.jsx)(k.Fragment, {
            children: Object(k.jsx)(ct, {
              tag: "section",
              backgroundColor: "white",
              children: Object(k.jsxs)(lt, {
                children: [
                  Object(k.jsx)(mt, {
                    strong: !0,
                    variant: "heading2",
                    intlKey: e,
                  }),
                  Object(k.jsx)(Ot, {
                    variant: "subtitle1",
                    intlKey: t,
                  }),
                  Object(k.jsxs)(rt, {
                    children: [
                      c.map((e) =>
                        ((e, t) => {
                          let a = "#820AD1",
                            n = "#490B75",
                            i = "#F6ECFF";
                          return (
                            e.formattedYield === t &&
                              ((a = "#FFFFFF"),
                              (n = "#FFFFFF"),
                              (i = "#820AD1")),
                            Object(k.jsx)(
                              pt,
                              {
                                $_css: i,
                                children: Object(k.jsxs)(ot, {
                                  children: [
                                    Object(k.jsx)(bt, {
                                      strong: !0,
                                      variant: "subtitle2",
                                      intlKey: "CDT.YIELD_VS_TERM.PACKAGE.DAYS",
                                      intlValues: {
                                        days: e.days,
                                      },
                                      $_css2: a,
                                    }),
                                    Object(k.jsx)(jt, {
                                      variant: "heading3",
                                      intlKey:
                                        "CDT.YIELD_VS_TERM.PACKAGE.YIELDS",
                                      intlValues: {
                                        yield: e.formattedYield,
                                      },
                                      $_css3: n,
                                    }),
                                  ],
                                }),
                              },
                              e.formattedYield
                            )
                          );
                        })(e, i.yield_rate)
                      ),
                      Object(k.jsx)("br", {}),
                      Object(k.jsx)("br", {}),
                    ],
                  }),
                  Object(k.jsx)(gt, {
                    variant: "subtitle2",
                    intlKey: a,
                    intlValues: {
                      date: s,
                    },
                  }),
                ],
              }),
            }),
          });
        },
        pt = Object(b.default)(st).withConfig({
          displayName: "YieldVsTerm___StyledCard",
          componentId: "sc-17hr5qc-0",
        })(["background-color:", ""], (e) => e.$_css),
        bt = Object(b.default)(O.a).withConfig({
          displayName: "YieldVsTerm___StyledTypography",
          componentId: "sc-17hr5qc-1",
        })(["color:", ";span{font-weight:bold;}"], (e) => e.$_css2),
        jt = Object(b.default)(O.a).withConfig({
          displayName: "YieldVsTerm___StyledTypography2",
          componentId: "sc-17hr5qc-2",
        })(["color:", ";span{font-weight:bold;}"], (e) => e.$_css3),
        mt = Object(b.default)(O.a).withConfig({
          displayName: "YieldVsTerm___StyledTypography3",
          componentId: "sc-17hr5qc-3",
        })(["text-align:center;"]),
        Ot = Object(b.default)(O.a).withConfig({
          displayName: "YieldVsTerm___StyledTypography4",
          componentId: "sc-17hr5qc-4",
        })(["text-align:center;margin-top:8px;"]),
        gt = Object(b.default)(O.a).withConfig({
          displayName: "YieldVsTerm___StyledTypography5",
          componentId: "sc-17hr5qc-5",
        })(["text-align:center;color:rgb(0 0 0 / 64%);margin-top:16px;"]),
        ut = a("2F3a"),
        ht = a.n(ut),
        xt = a("gPhM"),
        ft = a.n(xt),
        yt = a("iY3x"),
        Ct = a.n(yt),
        wt = a("Kfyg");
      const Tt = b.default.div.withConfig({
        displayName: "FormContainer",
        componentId: "sc-1wsjd5x-0",
      })([
        "display:block;width:100%;input{max-width:27rem;}@media (orientation:portrait){button{max-width:21rem;}}",
      ]);
      Tt.displayName = "FormContainer";
      const _t = ({
        idTextField: e,
        placeholder: t,
        label: a,
        btnLabel: i,
        validateDisabled: c,
      }) => {
        const { formatMessage: s } = Object(j.a)(),
          { setProspectEmail: o, toggleRegistrationForm: l } = Object(
            n.useContext
          )(wt.a),
          { 0: r, 1: d } = Object(n.useState)(!1);
        return (
          Object(n.useEffect)(() => {
            d(!0);
          }, []),
          r &&
            Object(k.jsx)(ft.a, {
              children: Object(k.jsx)(ft.a.Step, {
                initialValues: {
                  email: "",
                },
                onSubmit: async ({ values: e, setSubmitting: t }) => {
                  o(e.email),
                    t(!1),
                    l(),
                    Object(u.a)("CDT_PROSPECT_REGISTRATION_WAITLIST_STARTED");
                },
                enableReinitialize: !0,
                children: ({ isSubmitting: n, isDisabled: o }) =>
                  Object(k.jsxs)(Tt, {
                    className: "cdt-banner-form-container",
                    children: [
                      Object(k.jsx)(ht.a, {
                        id: e,
                        type: "email",
                        name: "email",
                        placeholder: s({
                          id: t,
                        }),
                        label: s({
                          id: a,
                        }),
                        "data-gtm": "cdt-banner-email-field",
                        autoComplete: "off",
                        syncValidations: {
                          required: s({
                            id: "HOME.HERO.FORM.EMAIL_REQUIRED",
                          }),
                          email: s({
                            id: "HOME.HERO.FORM.EMAIL_VALIDATION",
                          }),
                        },
                        className: "cdt-banner-signup-form-text",
                      }),
                      Object(k.jsx)(Ct.a, {
                        extended: !0,
                        id: "email-on-banner-submit-btn",
                        "data-testid": "email-on-banner-submit-btn",
                        "data-gtm": "cdt-banner-email-cta-btn",
                        disabled: (c && o) || n,
                        type: "submit",
                        variant: "contained",
                        styleVariant: "primary",
                        color: "white",
                        intlKey: i,
                        iconProps: {
                          name: "arrow-right",
                        },
                        className: "cdt-banner-signup-form-button",
                      }),
                    ],
                  }),
              }),
            })
        );
      };
      _t.defaultProps = {
        btnLabel: "HOME.HERO.FORM.BUTTON_LABEL",
        idTextField: "email-on-banner",
        label: "HOME.HERO.FORM.LABEL",
        placeholder: "HOME.HERO.FORM.PLACEHOLDER",
        validateDisabled: !1,
      };
      var It = _t;
      const Nt = b.default.section.withConfig({
          displayName: "MainSection",
          componentId: "sc-1u93l21-0",
        })([
          "display:flex;width:100%;justify-content:center;padding-top:64px;padding-bottom:64px;background-color:#EFEFEF;",
        ]),
        Et = b.default.div.withConfig({
          displayName: "MainSection__Container",
          componentId: "sc-1u93l21-1",
        })(
          [
            "display:flex;box-sizing:border-box;flex-direction:column;align-items:center;justify-content:center;",
            ";",
          ],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["width:90%;max-width:327px;"]),
            md: Object(b.css)(["width:85%;max-width:656px;"]),
            lg: Object(b.css)(["width:61%;max-width:826px;"]),
          })
        ),
        vt = b.default.div.withConfig({
          displayName: "SignUpFormContainer",
          componentId: "sc-a3yfw1-0",
        })(
          [
            "#label-email{div{",
            " span{font-style:normal;font-weight:500;font-size:24px;line-height:122%;letter-spacing:-0.02em;font-feature-settings:'tnum' on,'lnum' on,'ss05' on;color:",
            ";padding-bottom:16px;width:100%;}}};.cdt-banner-form-container{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;div:first-child{",
            "}};.cdt-banner-signup-form-text{font-size:18px;",
            " ::placeholder{color:",
            ";}};background-color:",
            ";border-radius:16px;width:100%;",
          ],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["white-space:pre-line;"]),
            lg: Object(b.css)(["white-space:nowrap;"]),
          }),
          ({ color: e }) => e,
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["width:100%;"]),
            lg: Object(b.css)(["width:inherit;"]),
          }),
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["width:100%"]),
          }),
          Object(C.nuDSColor)("black", "defaultT20"),
          Object(C.nuDSColor)("white", "default")
        );
      vt.displayName = "SignUpFormContainer";
      var At = ({ title: e, subtitle: t, form: a }) =>
          Object(k.jsx)(k.Fragment, {
            children: Object(k.jsx)(Nt, {
              tag: "section",
              id: "cdt-application-banner",
              children: Object(k.jsxs)(Et, {
                children: [
                  Object(k.jsx)(Dt, {
                    strong: !0,
                    variant: "heading2",
                    intlKey: e,
                  }),
                  Object(k.jsx)(Lt, {
                    strong: !0,
                    variant: "subtitle1",
                    intlKey: t,
                  }),
                  Object(k.jsxs)(x.a, {
                    backgroundColor: "white.default",
                    padding: 24,
                    paddingBottom: 8,
                    borderRadius: 16,
                    maxWidth: {
                      lg: 400,
                    },
                    width: {
                      lg: "50%",
                    },
                    children: [
                      Object(k.jsx)(O.a, {
                        strong: !0,
                        variant: "subtitle1",
                        intlKey: a.title,
                      }),
                      Object(k.jsx)(vt, {
                        children: Object(k.jsx)(It, {
                          idTextField: "email-on-banner",
                          btnLabel: a.btnLabel,
                          label: a.label,
                          placeholder: a.placeholder,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        Dt = Object(b.default)(O.a).withConfig({
          displayName: "ApplicationBanner___StyledTypography",
          componentId: "sc-1dxqyc2-0",
        })(["text-align:center;"]),
        Lt = Object(b.default)(O.a).withConfig({
          displayName: "ApplicationBanner___StyledTypography2",
          componentId: "sc-1dxqyc2-1",
        })([
          "color:rgb(0 0 0 / 64%);text-align:center;margin-top:12px;margin-bottom:24px;",
        ]);
      var St = {
          hero: {
            title: "CDT.HERO.TITLE",
            subtitle: "CDT.HERO.SUBTITLE",
            knowMore: "CDT.HERO.KNOW_MORE",
            alt: "CDT.HERO.IMAGE.ALT",
            heroImages: {
              xs: "cdt/hero/hero-xs.jpg",
              md: "cdt/hero/hero-md.jpg",
              lg: "cdt/hero/hero-lg.jpg",
            },
            specificColor: "#820AD1",
            descriptionImage: "CDT.HEAD.META_DESCRIPTION",
            form: {
              label: "CDT.HERO.FORM.LABEL",
              placeholder: "CDT.HERO.FORM.PLACEHOLDER",
              btnLabel: "CDT.HERO.FORM.BUTTON_LABEL",
              btnStyleVariant: "primary",
              validateDisabled: !1,
            },
          },
          mainValues: {
            title: "CDT.MAIN_VALUES.TITLE",
            subtitle: "CDT.MAIN_VALUES.SUBTITLE",
            values: [
              {
                content: "CDT.MAIN_VALUES.CONTENT1",
                icon: "dollar_shield",
                yield: null,
              },
              {
                content: "CDT.MAIN_VALUES.CONTENT2",
                icon: "pig_locked",
                yield: null,
              },
              {
                content: "CDT.MAIN_VALUES.CONTENT3",
                icon: "yield",
                yield: null,
              },
            ],
          },
          decorativeSection: {
            alt: "CDT.DECORATIVE_SECTION.ALT",
            images: {
              xs: "cdt/decorative-section/bars-xs.jpg",
              md: "cdt/decorative-section/bars-md.jpg",
              lg: "cdt/decorative-section/bars-lg.jpg",
            },
          },
          mechanics: {
            title: "CDT.MECHANICS.TITLE",
            cards: [
              {
                title: "CDT.MECHANICS.CARD1.TITLE",
                image: {
                  xs: "cdt/mechanics/choose-money-box.gif",
                },
              },
              {
                title: "CDT.MECHANICS.CARD2.TITLE",
                image: {
                  xs: "cdt/mechanics/define-investment.png",
                },
              },
              {
                title: "CDT.MECHANICS.CARD3.TITLE",
                image: {
                  xs: "cdt/mechanics/choose-maturity-period.png",
                },
              },
              {
                title: "CDT.MECHANICS.CARD4.TITLE",
                image: {
                  xs: "cdt/mechanics/look-earnings.png",
                },
              },
              {
                title: "CDT.MECHANICS.CARD5.TITLE",
                image: {
                  xs: "cdt/mechanics/get-earnings.gif",
                },
              },
            ],
          },
          yieldVsTerm: {
            title: "CDT.YIELD_VS_TERM.TITLE",
            subtitle: "CDT.YIELD_VS_TERM.SUBTITLE",
            disclaimer: "CDT.YIELD_VS_TERM.DISCLAIMER",
            values: [
              {
                content: "CDT.YIELD_VS_TERM.CONTENT1",
                icon: "dollar_shield",
              },
              {
                content: "CDT.YIELD_VS_TERM.CONTENT2",
                icon: "pig_locked",
              },
              {
                content: "CDT.YIELD_VS_TERM.CONTENT3",
                icon: "yield",
              },
            ],
            maxYield: "",
            packages: [],
            maxYieldSince: "",
          },
          calculator: {
            maxYield: "",
            packages: [],
            baseRates: {
              anualYieldRatePercentage: 0,
              incomeTaxExemptionPercentage: 5.5,
              incomeTaxRatePercentage: 7,
              taxValueUnit: 49799,
            },
          },
          applicationBanner: {
            title: "CDT.APPLICATION_BANNER.TITLE",
            subtitle: "CDT.APPLICATION_BANNER.SUBTITLE",
            form: {
              title: "CDT.APPLICATION_BANNER.FORM.TITLE",
              label: "CDT.APPLICATION_BANNER.FORM.LABEL",
              placeholder: "CDT.APPLICATION_BANNER.FORM.PLACEHOLDER",
              btnLabel: "CDT.APPLICATION_BANNER.FORM.BUTTON_LABEL",
              btnStyleVariant: "primary",
              validateDisabled: !1,
            },
          },
          knowMore: {
            title: "CDT.KNOW_MORE.TITLE",
            links: [
              {
                link: "CDT.KNOW_MORE.CONTENT1",
                icon: "lightbulb",
                url: "http://blog.nu.com.co/CDT-Nu-haz-que-tu-dinero-crezca",
              },
            ],
          },
          faq: {
            title: "CDT.FAQ.TITLE",
            backgroundColor: "#EFEFEF",
            questions: [
              {
                question: "CDT.FAQ.QUESTION.FIRST",
                answer: "CDT.FAQ.QUESTION.ANSWER.FIRST",
                href: "CDT.FAQ.QUESTION.HREF.FIRST",
                initiallyOpen: !0,
              },
              {
                question: "CDT.FAQ.QUESTION.SECOND",
                answer: "CDT.FAQ.QUESTION.ANSWER.SECOND",
                initiallyOpen: !1,
              },
              {
                question: "CDT.FAQ.QUESTION.THIRD",
                answer: "CDT.FAQ.QUESTION.ANSWER.THIRD",
                href: "CDT.FAQ.QUESTION.HREF.THIRD",
                target: "_self",
                initiallyOpen: !1,
              },
              {
                question: "CDT.FAQ.QUESTION.FOURTH",
                answer: "CDT.FAQ.QUESTION.ANSWER.FOURTH",
                initiallyOpen: !1,
              },
            ],
          },
          stamp: {
            typography: {
              title: "CDT.STAMP.TITLE",
              specificColor: "CDT.STAMP.TITLE.SPECIFIC_COLOR",
            },
            image: {
              alt: "CDT.STAMP.IMAGE.ALT",
              link: "CDT.STAMP.IMAGE.LINK",
              images: {
                xs: "multi-product-home/footer/footer-fogafin-cucuta-4x.png",
                md: "multi-product-home/footer/footer-fogafin-cucuta-4x.png",
                lg: "multi-product-home/footer/footer-fogafin-cucuta-4x.png",
              },
            },
          },
          cdtVsCajitas: {
            title: "CDT.CDTVSCAJITAS.TITLE",
            description: "CDT.CDTVSCAJITAS.DESCRIPTION",
          },
        },
        Mt = a("QjSz");
      const kt = b.default.div.withConfig({
        displayName: "CdtVsCajitas__Cell",
        componentId: "sc-44vgn0-0",
      })(
        [
          "height:80px;display:flex;flex-direction:column;justify-content:center;align-items:center;span{background:#820AD1;color:#FFF;border-radius:4px;width:76px;}.normal-cell{display:flex;flex-direction:column;font-size:14px;max-width:80px;",
          ";}.main-cell{align-self:start;font-size:16px;color:#000000A3;font-weight:bold;text-align:start;max-width:80px;",
          ";}",
        ],
        Object(w.breakpointsMedia)({
          md: Object(b.css)(["max-width:100%;"]),
        }),
        Object(w.breakpointsMedia)({
          md: Object(b.css)(["max-width:100%;"]),
        })
      );
      kt.displayName = "Cell";
      const Rt = b.default.div.withConfig({
        displayName: "CdtVsCajitas__Column",
        componentId: "sc-44vgn0-1",
      })([".border-cell{border-bottom:1px solid #E5E5E5;}"]);
      Rt.displayName = "Column";
      const Ht = b.default.div.withConfig({
        displayName: "CdtVsCajitas__HeaderCell",
        componentId: "sc-44vgn0-2",
      })([
        "height:140px;display:flex;flex-direction:column;justify-content:center;align-items:center;.cdt-header{color:#820AD1;font-size:18px;max-width:100%;}.cajitas-header{font-size:18px;color:#000000A3}",
      ]);
      Ht.displayName = "HeaderCell";
      const Vt = b.default.div.withConfig({
        displayName: "CdtVsCajitas__TableContainer",
        componentId: "sc-44vgn0-3",
      })([
        "display:flex;max-width:600px;width:100%;justify-content:center;margin-top:20px;",
      ]);
      Vt.displayName = "TableContainer";
      const Pt = b.default.div.withConfig({
        displayName: "CdtVsCajitas__Table",
        componentId: "sc-44vgn0-4",
      })([
        "display:grid;width:100%;grid-template-columns:1fr 1fr 12px 1fr;text-align:center;.column{display:flex;flex-direction:column;}.cdt-column{background:#ECD9FF;border-radius:16px;font-weight:bold;}.cajitas-column{background:#F6ECFF;border-radius:16px;font-weight:bold;}.cell{padding:10px;}",
      ]);
      Pt.displayName = "Table";
      const Ft = b.default.div.withConfig({
        displayName: "CdtVsCajitas__Container",
        componentId: "sc-44vgn0-5",
      })(
        [
          "display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px;",
          ";",
        ],
        Object(w.breakpointsMedia)({
          xs: Object(b.css)(["padding:56px 24px;"]),
        })
      );
      Ft.displayName = "Container";
      const Bt = b.default.div.withConfig({
        displayName: "CdtVsCajitas__TypographyContainer",
        componentId: "sc-44vgn0-6",
      })(
        [
          "display:flex;flex-direction:column;justify-content:center;max-width:826px;",
          ";",
        ],
        Object(w.breakpointsMedia)({
          md: Object(b.css)(["align-items:center;"]),
        })
      );
      var Yt = ({
          title: e,
          description: t,
          yieldRates: a,
          cajitasYield: n,
          minOpeninng: i,
        }) => {
          const c = n.yield_rate,
            s = Object(r.c)(a),
            o = Object(r.a)(a);
          return Object(k.jsx)(k.Fragment, {
            children: Object(k.jsxs)(Ft, {
              children: [
                Object(k.jsxs)(Bt, {
                  children: [
                    Object(k.jsx)(zt, {
                      intlKey: t,
                      variant: "heading4",
                      $_css: Object(w.breakpointsMedia)({
                        lg: Object(b.css)(["font-size:24px;"]),
                      }),
                    }),
                    Object(k.jsx)(Ut, {
                      intlKey: e,
                      variant: "heading2",
                      $_css2: Object(w.breakpointsMedia)({
                        md: Object(b.css)(["text-align:center;font-size:30px"]),
                        lg: Object(b.css)([
                          "text-align:center;font-size:48px;",
                        ]),
                      }),
                    }),
                  ],
                }),
                Object(k.jsx)(Vt, {
                  children: Object(k.jsxs)(Pt, {
                    children: [
                      Object(k.jsxs)(Rt, {
                        children: [
                          Object(k.jsx)(Ht, {}),
                          Object(k.jsx)(kt, {
                            className: "border-cell",
                            children: Object(k.jsx)(O.a, {
                              variant: "subtitle2",
                              className: "main-cell",
                              intlKey: "CDT.CDTVSCAJITAS.MAIN.ROW1",
                            }),
                          }),
                          Object(k.jsx)(kt, {
                            className: "border-cell",
                            children: Object(k.jsx)(O.a, {
                              variant: "subtitle2",
                              className: "main-cell",
                              intlKey: "CDT.CDTVSCAJITAS.MAIN.ROW2",
                            }),
                          }),
                          Object(k.jsx)(kt, {
                            className: "main-cell",
                            children: Object(k.jsx)(O.a, {
                              variant: "subtitle2",
                              className: "main-cell",
                              intlKey: "CDT.CDTVSCAJITAS.MAIN.ROW3",
                            }),
                          }),
                        ],
                      }),
                      Object(k.jsxs)(Rt, {
                        className: "cdt-column",
                        children: [
                          Object(k.jsxs)(Ht, {
                            children: [
                              Object(k.jsx)(O.a, {
                                className: "cdt-header",
                                intlKey: "CDT.CDTVSCAJITAS.CDT.HEADER",
                                variant: "heading4",
                              }),
                              Object(k.jsx)(me.a, {
                                width: "82px",
                                height: "82px",
                                alt: "cdt-header",
                                srcSet: {
                                  xs: "cdt/cdt-vs-cajitas/cajita-con-cdt-nu.png",
                                  md: "cdt/cdt-vs-cajitas/cajita-con-cdt-nu.png",
                                  lg: "cdt/cdt-vs-cajitas/cajita-con-cdt-nu.png",
                                },
                              }),
                            ],
                          }),
                          Object(k.jsx)(kt, {
                            children: Object(k.jsx)(O.a, {
                              variant: "subtitle2",
                              className: "normal-cell",
                              intlKey: "CDT.CDTVSCAJITAS.CDT.ROW1",
                              intlValues: {
                                cdtMinOpening: Object(r.b)(i),
                              },
                            }),
                          }),
                          Object(k.jsx)(kt, {
                            children: Object(k.jsx)(O.a, {
                              variant: "subtitle2",
                              className: "normal-cell",
                              intlKey: "CDT.CDTVSCAJITAS.CDT.ROW2",
                              intlValues: {
                                periods: o,
                              },
                            }),
                          }),
                          Object(k.jsx)(kt, {
                            children: Object(k.jsx)(O.a, {
                              variant: "subtitle2",
                              className: "normal-cell",
                              intlKey: "CDT.CDTVSCAJITAS.CDT.ROW3",
                              intlValues: {
                                cdtYield: Object(k.jsxs)(O.a, {
                                  variant: "caption",
                                  children: [s.yield_rate, " ", "E.A"],
                                }),
                              },
                            }),
                          }),
                        ],
                      }),
                      Object(k.jsxs)(Rt, {
                        children: [
                          Object(k.jsx)(Ht, {}),
                          Object(k.jsx)(kt, {
                            className: "border-cell",
                          }),
                          Object(k.jsx)(kt, {
                            className: "border-cell",
                          }),
                          Object(k.jsx)(kt, {
                            className: "normal-cell",
                          }),
                        ],
                      }),
                      Object(k.jsxs)(Rt, {
                        className: "cajitas-column",
                        children: [
                          Object(k.jsxs)(Ht, {
                            children: [
                              Object(k.jsx)(O.a, {
                                className: "cajitas-header",
                                intlKey: "CDT.CDTVSCAJITAS.CAJITAS.HEADER",
                                variant: "heading4",
                              }),
                              Object(k.jsx)(me.a, {
                                width: "82px",
                                height: "82px",
                                alt: "cajitas-header",
                                srcSet: {
                                  xs: "cdt/cdt-vs-cajitas/cajita-nu.png",
                                  md: "cdt/cdt-vs-cajitas/cajita-nu.png",
                                  lg: "cdt/cdt-vs-cajitas/cajita-nu.png",
                                },
                              }),
                            ],
                          }),
                          Object(k.jsx)(kt, {
                            children: Object(k.jsx)(O.a, {
                              variant: "subtitle2",
                              intlKey: "CDT.CDTVSCAJITAS.CAJITAS.ROW1",
                            }),
                          }),
                          Object(k.jsx)(kt, {
                            children: Object(k.jsx)(O.a, {
                              variant: "subtitle2",
                              intlKey: "CDT.CDTVSCAJITAS.CAJITAS.ROW2",
                            }),
                          }),
                          Object(k.jsx)(kt, {
                            children: Object(k.jsx)(O.a, {
                              variant: "subtitle2",
                              intlKey: "CDT.CDTVSCAJITAS.CAJITAS.ROW3",
                              intlValues: {
                                cajitasYield: Object(Mt.a)(c, 0),
                              },
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          });
        },
        zt = Object(b.default)(O.a).withConfig({
          displayName: "CdtVsCajitas___StyledTypography",
          componentId: "sc-1xh5tdj-0",
        })(["color:#820AD1;", ""], (e) => e.$_css),
        Ut = Object(b.default)(O.a).withConfig({
          displayName: "CdtVsCajitas___StyledTypography2",
          componentId: "sc-1xh5tdj-1",
        })(["padding-top:16px;", ";"], (e) => e.$_css2),
        Kt = a("aF83");
      const Wt = Object(b.default)(x.a).withConfig({
        displayName: "Card",
        componentId: "sc-una0gf-0",
      })(
        [
          "display:inline-flex;flex-direction:column;white-space:normal;align-items:start;justify-content:start;border:2px solid #efefef;border-radius:16px;z-index:1;padding:24px;padding-bottom:0;",
          ";width:300px;height:360px;margin:10px 20px;",
          " & > *:last-child{margin-top:auto;align-self:center;}",
        ],
        Object(w.breakpointsMedia)({
          xs: Object(b.css)(["margin:10px 0;max-width:100%;"]),
        }),
        (e) => e.first && "\n      margin-left: 0px;\n  "
      );
      Wt.displayName = "Card";
      const qt = b.default.div.withConfig({
        displayName: "Card__CardContainer",
        componentId: "sc-una0gf-1",
      })(["display:inline-block;"]);
      qt.displayName = "CardContainer";
      const Zt = b.default.div.withConfig({
        displayName: "Card__Index",
        componentId: "sc-una0gf-2",
      })(
        [
          "border-radius:50%;color:rgb(0 0 0 / 96%);font-weight:bold;display:inline-flex;align-items:center;justify-content:center;",
          ";",
        ],
        Object(w.breakpointsMedia)({
          xs: Object(b.css)(["min-width:32px;min-height:32px;"]),
          md: Object(b.css)([
            "min-width:48px;min-height:48px;padding:28px,51px;",
          ]),
        })
      );
      Zt.displayName = "Index";
      const Qt = b.default.section.withConfig({
          displayName: "Container__MainSection",
          componentId: "sc-qdmvp8-0",
        })([
          "display:flex;width:100%;justify-content:center;padding-top:60px;",
        ]),
        Jt = b.default.div.withConfig({
          displayName: "Container",
          componentId: "sc-qdmvp8-1",
        })(
          ["display:flex;box-sizing:border-box;flex-direction:column;", ";"],
          Object(w.breakpointsMedia)({
            xs: Object(b.css)(["width:93%;margin-left:7%;"]),
            md: Object(b.css)(["width:93%;margin-left:0%;"]),
            lg: Object(b.css)([";width:75%;"]),
          })
        ),
        $t = b.default.div.withConfig({
          displayName: "Container__CardScrollContainer",
          componentId: "sc-qdmvp8-2",
        })([
          "display:flex;justify-content:space-between;align-items:center;position:relative;",
        ]);
      $t.displayName = "CardScrollContainer";
      const Gt = b.default.div.withConfig({
        displayName: "Container__ControlScrollContainer",
        componentId: "sc-qdmvp8-3",
      })(
        [
          "margin-top:16px;display:flex;gap:36px;justify-content:center;margin-right:7%;",
          ";",
        ],
        Object(w.breakpointsMedia)({
          md: Object(b.css)(["margin-right:0%;"]),
        })
      );
      Gt.displayName = "ControlScrollContainer";
      const Xt = b.default.div.withConfig({
        displayName: "Container__ScrollButton",
        componentId: "sc-qdmvp8-4",
      })(["padding:4px;"]);
      Xt.displayName = "ScrollButton";
      const ea = b.default.div.withConfig({
        displayName: "Container__CardScroll",
        componentId: "sc-qdmvp8-5",
      })(
        [
          "",
          " display:flex;flex-direction:row;align-items:start;position:relative;overflow-x:auto;white-space:nowrap;width:100%;&::-webkit-scrollbar{display:none;}",
        ],
        Object(w.breakpointsMedia)({
          xs: Object(b.css)([
            "display:flex;flex-direction:column;align-items:center;width:100%;",
          ]),
        })
      );
      var ta = ({ cards: e, title: t }) => {
          const a = Object(w.useBreakpointsMediaDown)("md"),
            i = Object(w.useBreakpointsMediaUp)("lg"),
            c = Object(n.useRef)(null);
          let s = 0;
          const o = Array.from(
              {
                length: e.length,
              },
              () => Object(n.useRef)(null)
            ),
            l = () =>
              a
                ? s === e.length - 1
                : i
                ? s === e.length - 3
                : s === e.length - 2,
            r = () => {
              const t = document.querySelector("#scroll-left-action"),
                a = document.querySelector("#scroll-right-action");
              (t.style = s > 0 ? "color: black" : "color: gray"),
                l() ? (a.style = "color: gray") : (a.style = "color: black"),
                s <= e.length - 1 &&
                  o[s].current.scrollIntoView({
                    behavior: "smooth",
                    inline: "start",
                    block: "nearest",
                  });
            },
            d = e.map((e, t) =>
              Object(k.jsx)(
                qt,
                {
                  ref: o[t],
                  children: Object(k.jsxs)(
                    Wt,
                    {
                      first: 0 === t,
                      children: [
                        Object(k.jsxs)(aa, {
                          $_css: t < 3 ? "#EFEFEF" : "#DDF5E5",
                          children: [
                            t < 3 &&
                              Object(k.jsx)(na, {
                                "data-testid": "hero-title",
                                variant: "heading4",
                                dangerouslySetInnerHTML: {
                                  __html: t + 1,
                                },
                              }),
                            3 === t && Object(M.a)("eye_sparkle"),
                            4 === t && Object(M.a)("calendar_scheduled"),
                          ],
                        }),
                        Object(k.jsx)(ia, {
                          "data-testid": "hero-title",
                          variant: "heading4",
                          intlKey: e.title,
                          intlValues: {
                            span: (e) =>
                              Object(k.jsx)("span", {
                                children: e,
                              }),
                          },
                        }),
                        Object(k.jsx)(ca, {
                          srcSet: e.image,
                          loading: "lazy",
                          alt: "placeholder",
                          title: "placeholder",
                          webp: !0,
                        }),
                      ],
                    },
                    "card-history-path-".concat(e.title)
                  ),
                },
                e.title
              )
            );
          return Object(k.jsx)(k.Fragment, {
            children: Object(k.jsx)(Qt, {
              tag: "section",
              backgroundColor: "white",
              id: "cdt-mechanics-2",
              children: Object(k.jsxs)(Jt, {
                children: [
                  Object(k.jsx)(sa, {
                    marginTop: "12px",
                    marginLeft: "10px",
                    variant: "heading2",
                    intlKey: t,
                    $_css2: Object(w.breakpointsMedia)({
                      md: Object(b.css)(["text-align:center;"]),
                    }),
                  }),
                  Object(k.jsx)("br", {}),
                  Object(k.jsx)("br", {}),
                  Object(k.jsx)($t, {
                    children: Object(k.jsx)(ea, {
                      ref: c,
                      children: d,
                    }),
                  }),
                  Object(k.jsxs)(Gt, {
                    children: [
                      Object(k.jsx)(oa, {
                        id: "scroll-left-action",
                        onClick: () => {
                          s > 0 && ((s -= 1), r());
                        },
                        children: Object(k.jsx)(Kt.Icon, {
                          name: "arrow-left",
                        }),
                      }),
                      Object(k.jsx)(Xt, {
                        id: "scroll-right-action",
                        onClick: () => {
                          l() || ((s += 1), r());
                        },
                        children: Object(k.jsx)(Kt.Icon, {
                          name: "arrow-right",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          });
        },
        aa = Object(b.default)(Zt).withConfig({
          displayName: "Mechanics___StyledIndex",
          componentId: "sc-vhyxaz-0",
        })(["background-color:", ";"], (e) => e.$_css),
        na = Object(b.default)(O.a).withConfig({
          displayName: "Mechanics___StyledTypography",
          componentId: "sc-vhyxaz-1",
        })(["margin:0;"]),
        ia = Object(b.default)(O.a).withConfig({
          displayName: "Mechanics___StyledTypography2",
          componentId: "sc-vhyxaz-2",
        })(["margin:10px 0;font-size:20px;span{color:#820AD1;}"]),
        ca = Object(b.default)(me.a).withConfig({
          displayName: "Mechanics___StyledImage",
          componentId: "sc-vhyxaz-3",
        })(["height:196px;"]),
        sa = Object(b.default)(O.a).withConfig({
          displayName: "Mechanics___StyledTypography3",
          componentId: "sc-vhyxaz-4",
        })(["", ""], (e) => e.$_css2),
        oa = Object(b.default)(Xt).withConfig({
          displayName: "Mechanics___StyledScrollButton",
          componentId: "sc-vhyxaz-5",
        })(["color:gray"]);
      function la(e, t) {
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
      function ra(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? la(Object(a), !0).forEach(function (t) {
                Object(s.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : la(Object(a)).forEach(function (t) {
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
          hero: da,
          faq: pa,
          mainValues: ba,
          decorativeSection: ja,
          yieldVsTerm: ma,
          calculator: Oa,
          applicationBanner: ga,
          knowMore: ua,
          stamp: ha,
          mechanics: xa,
          cdtVsCajitas: fa,
        } = St,
        ya = {
          imageSrc: "savings/vigilado-xl.png",
          label: "SAVINGS.FIXED_BANNER.LABEL",
        };
      var Ca = () => {
          const e = Object(Ce.a)(),
            t = Object(ye.a)(),
            a =
              Object(o.a)(d.INCREASE_CLARITY.id) ===
              d.INCREASE_CLARITY.treatment,
            n =
              Object(o.a)(d.CDT_APPLICATION_BANNER.id) ===
              d.CDT_APPLICATION_BANNER.treatment,
            i =
              null !== t &&
              "object" === typeof t &&
              "cdts" in t &&
              "cajitas" in t;
          return Object(k.jsxs)(k.Fragment, {
            children: [
              Object(k.jsx)(p.a, ra({}, ya)),
              Object(k.jsx)(
                Be,
                ra(
                  ra({}, da),
                  {},
                  {
                    showApplicationForm: n,
                    isClarityExperimentOn: a,
                  }
                )
              ),
              Object(k.jsx)(
                Ge,
                ra(
                  ra({}, ba),
                  {},
                  {
                    yieldRates: t,
                  }
                )
              ),
              Object(k.jsx)(nt, ra({}, ja)),
              Object(k.jsx)(ta, ra({}, xa)),
              i &&
                Object(k.jsx)(
                  dt,
                  ra(
                    ra({}, ma),
                    {},
                    {
                      yieldRates: t.cdts,
                    }
                  )
                ),
              i &&
                e &&
                Object(k.jsx)(
                  ae,
                  ra(
                    ra({}, Oa),
                    {},
                    {
                      cdtMinOpeninng: e,
                      yieldRates: t.cdts,
                    }
                  )
                ),
              i &&
                e &&
                Object(k.jsx)(
                  Yt,
                  ra(
                    ra({}, fa),
                    {},
                    {
                      yieldRates: t.cdts,
                      cajitasYield: t.cajitas,
                      minOpeninng: e,
                    }
                  )
                ),
              !n && Object(k.jsx)(At, ra({}, ga)),
              Object(k.jsx)(he, ra({}, ha)),
              e &&
                Object(k.jsx)(
                  l.a,
                  ra(
                    ra({}, pa),
                    {},
                    {
                      cdtMinOpeninng: Object(r.b)(e),
                    }
                  )
                ),
              Object(k.jsx)(le, ra({}, ua)),
            ],
          });
        },
        wa = a("+XhP"),
        Ta = a("kOo4"),
        _a = a("jtTf"),
        Ia = a("y7qy");
      t.default = Object(c.a)(Ca, {
        routeKey: "CDT",
        openGraphResource: Ia.d.savings,
        footerType: Ta.b.FULL,
        companyFooterType: _a.a.ONLY_SAVINGS,
        components: {
          footer: Ta.a,
        },
        header: {
          cta: Object(k.jsx)(wa.a, {
            hiddenHeight: {
              xs: 647,
              sm: 1135,
              md: 723,
              lg: 723,
              xl: 723,
            },
            btnLabel: "CDT.HERO.FORM.BUTTON_LABEL",
            styleVariant: "primary",
          }),
          nuLogoHref: "/",
          layout: {
            showHeaderCTA: !0,
            evalExpShowHeaderCTA: !0,
            showHeaderMenu: !0,
            experiment: {
              id: d.CDT_APPLICATION_BANNER.id,
              variant: d.CDT_APPLICATION_BANNER.treatment,
            },
          },
        },
      });
    },
    xriH: function (e, t, a) {
      "use strict";
      function n(e = 0, t = 0, a = !0, n = "COP", i = "es-CO") {
        if (isNaN(e))
          throw new Error(
            '"'.concat(e, '" need to be a number to be formated as currency')
          );
        const c = {
          style: a ? "currency" : "decimal",
          currency: a ? n : void 0,
          maximumFractionDigits: t,
          minimumFractionDigits: t,
        };
        return Intl.NumberFormat(i, c).format(e);
      }
      a.d(t, "a", function () {
        return n;
      });
    },
    xwtD: function (e, t, a) {
      "use strict";
      a.d(t, "e", function () {
        return r;
      }),
        a.d(t, "b", function () {
          return d;
        }),
        a.d(t, "a", function () {
          return p;
        }),
        a.d(t, "c", function () {
          return b;
        }),
        a.d(t, "f", function () {
          return j;
        }),
        a.d(t, "d", function () {
          return m;
        });
      var n = a("LHL8"),
        i = a("QjSz");
      var c = a("xriH"),
        s = a("bW5u");
      function o(e, t) {
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
      function l(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? o(Object(a), !0).forEach(function (t) {
                Object(n.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : o(Object(a)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      const r = async () => {
          const e = Object(s.c)(),
            t = await fetch(e).then((e) => e.json());
          return (function (e) {
            const t = new Date("".concat(e, "T05:00:00.000Z")),
              a = Date.now(),
              n = new Date(a);
            return (
              t.getFullYear() === n.getFullYear() &&
              t.getMonth() === n.getMonth() &&
              t.getDate() === n.getDate()
            );
          })(t.date)
            ? t.locked_deposits_minimum_amount
            : null;
        },
        d = (e) => Object(c.a)(e, 0, !0).replace(/\s/g, ""),
        p = (e) =>
          e
            .map((e) => e.maturity)
            .reduce((t, a, n) =>
              n === e.length - 1
                ? "".concat(t, " o ").concat(a)
                : "".concat(t, ", ").concat(a)
            ),
        b = (e) => {
          const t = e.reduce((e, t) =>
            e && e.yield_rate > t.yield_rate ? e : t
          );
          return l(
            l({}, t),
            {},
            {
              yield_rate: Object(i.a)(t.yield_rate),
            }
          );
        },
        j = (e) =>
          e.map((e) => ({
            formattedYield: Object(i.a)(e.yield_rate),
            yield: e.yield_rate,
            days: e.maturity,
          })),
        m = (
          e,
          t = {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ) =>
          new Date("".concat(e.raw_since, "T05:00")).toLocaleDateString(
            "es-CO",
            t
          );
    },
  },
  [["ACvf", 2, 1, 0, 3, 4, 5, 6, 7]],
]);
//# sourceMappingURL=cdt-17c7726bb04662bd4c0f.js.map
