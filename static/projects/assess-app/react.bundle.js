"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["react"],{

/***/ "./node_modules/@react-aria/ssr/dist/SSRProvider.mjs":
/*!***********************************************************!*\
  !*** ./node_modules/@react-aria/ssr/dist/SSRProvider.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SSRProvider: () => (/* binding */ $b5e257d569688ac6$export$9f8ac96af4b1b2ae),
/* harmony export */   useIsSSR: () => (/* binding */ $b5e257d569688ac6$export$535bd6ca7f90a273),
/* harmony export */   useSSRSafeId: () => (/* binding */ $b5e257d569688ac6$export$619500959fc48b26)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // We must avoid a circular dependency with @react-aria/utils, and this useLayoutEffect is
// guarded by a check that it only runs on the client side.
// eslint-disable-next-line rulesdir/useLayoutEffectRule

// Default context value to use in case there is no SSRProvider. This is fine for
// client-only apps. In order to support multiple copies of React Aria potentially
// being on the page at once, the prefix is set to a random number. SSRProvider
// will reset this to zero for consistency between server and client, so in the
// SSR case multiple copies of React Aria is not supported.
const $b5e257d569688ac6$var$defaultContext = {
    prefix: String(Math.round(Math.random() * 10000000000)),
    current: 0
};
const $b5e257d569688ac6$var$SSRContext = /*#__PURE__*/ (0, react__WEBPACK_IMPORTED_MODULE_0__).createContext($b5e257d569688ac6$var$defaultContext);
const $b5e257d569688ac6$var$IsSSRContext = /*#__PURE__*/ (0, react__WEBPACK_IMPORTED_MODULE_0__).createContext(false);
// This is only used in React < 18.
function $b5e257d569688ac6$var$LegacySSRProvider(props) {
    let cur = (0, react__WEBPACK_IMPORTED_MODULE_0__.useContext)($b5e257d569688ac6$var$SSRContext);
    let counter = $b5e257d569688ac6$var$useCounter(cur === $b5e257d569688ac6$var$defaultContext);
    let [isSSR, setIsSSR] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    let value = (0, react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            // If this is the first SSRProvider, start with an empty string prefix, otherwise
            // append and increment the counter.
            prefix: cur === $b5e257d569688ac6$var$defaultContext ? '' : `${cur.prefix}-${counter}`,
            current: 0
        }), [
        cur,
        counter
    ]);
    // If on the client, and the component was initially server rendered,
    // then schedule a layout effect to update the component after hydration.
    if (typeof document !== 'undefined') // This if statement technically breaks the rules of hooks, but is safe
    // because the condition never changes after mounting.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{
        setIsSSR(false);
    }, []);
    return /*#__PURE__*/ (0, react__WEBPACK_IMPORTED_MODULE_0__).createElement($b5e257d569688ac6$var$SSRContext.Provider, {
        value: value
    }, /*#__PURE__*/ (0, react__WEBPACK_IMPORTED_MODULE_0__).createElement($b5e257d569688ac6$var$IsSSRContext.Provider, {
        value: isSSR
    }, props.children));
}
let $b5e257d569688ac6$var$warnedAboutSSRProvider = false;
function $b5e257d569688ac6$export$9f8ac96af4b1b2ae(props) {
    if (typeof (0, react__WEBPACK_IMPORTED_MODULE_0__)['useId'] === 'function') {
        if ( true && !$b5e257d569688ac6$var$warnedAboutSSRProvider) {
            console.warn('In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.');
            $b5e257d569688ac6$var$warnedAboutSSRProvider = true;
        }
        return /*#__PURE__*/ (0, react__WEBPACK_IMPORTED_MODULE_0__).createElement((0, react__WEBPACK_IMPORTED_MODULE_0__).Fragment, null, props.children);
    }
    return /*#__PURE__*/ (0, react__WEBPACK_IMPORTED_MODULE_0__).createElement($b5e257d569688ac6$var$LegacySSRProvider, props);
}
let $b5e257d569688ac6$var$canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
let $b5e257d569688ac6$var$componentIds = new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled = false) {
    let ctx = (0, react__WEBPACK_IMPORTED_MODULE_0__.useContext)($b5e257d569688ac6$var$SSRContext);
    let ref = (0, react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    // eslint-disable-next-line rulesdir/pure-render
    if (ref.current === null && !isDisabled) {
        var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        // In strict mode, React renders components twice, and the ref will be reset to null on the second render.
        // This means our id counter will be incremented twice instead of once. This is a problem because on the
        // server, components are only rendered once and so ids generated on the server won't match the client.
        // In React 18, useId was introduced to solve this, but it is not available in older versions. So to solve this
        // we need to use some React internals to access the underlying Fiber instance, which is stable between renders.
        // This is exposed as ReactCurrentOwner in development, which is all we need since StrictMode only runs in development.
        // To ensure that we only increment the global counter once, we store the starting id for this component in
        // a weak map associated with the Fiber. On the second render, we reset the global counter to this value.
        // Since React runs the second render immediately after the first, this is safe.
        // @ts-ignore
        let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = (0, react__WEBPACK_IMPORTED_MODULE_0__).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 ? void 0 : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
        if (currentOwner) {
            let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
            if (prevComponentValue == null) // On the first render, and first call to useId, store the id and state in our weak map.
            $b5e257d569688ac6$var$componentIds.set(currentOwner, {
                id: ctx.current,
                state: currentOwner.memoizedState
            });
            else if (currentOwner.memoizedState !== prevComponentValue.state) {
                // On the second render, the memoizedState gets reset by React.
                // Reset the counter, and remove from the weak map so we don't
                // do this for subsequent useId calls.
                ctx.current = prevComponentValue.id;
                $b5e257d569688ac6$var$componentIds.delete(currentOwner);
            }
        }
        // eslint-disable-next-line rulesdir/pure-render
        ref.current = ++ctx.current;
    }
    // eslint-disable-next-line rulesdir/pure-render
    return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
    let ctx = (0, react__WEBPACK_IMPORTED_MODULE_0__.useContext)($b5e257d569688ac6$var$SSRContext);
    // If we are rendering in a non-DOM environment, and there's no SSRProvider,
    // provide a warning to hint to the developer to add one.
    if (ctx === $b5e257d569688ac6$var$defaultContext && !$b5e257d569688ac6$var$canUseDOM && "development" !== 'production') console.warn('When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.');
    let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
    let prefix = ctx === $b5e257d569688ac6$var$defaultContext && "development" === 'test' ? 0 : `react-aria${ctx.prefix}`;
    return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
    let id = (0, react__WEBPACK_IMPORTED_MODULE_0__).useId();
    let [didSSR] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)($b5e257d569688ac6$export$535bd6ca7f90a273());
    let prefix = didSSR || "development" === 'test' ? 'react-aria' : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
    return defaultId || `${prefix}-${id}`;
}
const $b5e257d569688ac6$export$619500959fc48b26 = typeof (0, react__WEBPACK_IMPORTED_MODULE_0__)['useId'] === 'function' ? $b5e257d569688ac6$var$useModernSSRSafeId : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
    return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
    return true;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
    // noop
    return ()=>{};
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
    // In React 18, we can use useSyncExternalStore to detect if we're server rendering or hydrating.
    if (typeof (0, react__WEBPACK_IMPORTED_MODULE_0__)['useSyncExternalStore'] === 'function') return (0, react__WEBPACK_IMPORTED_MODULE_0__)['useSyncExternalStore']($b5e257d569688ac6$var$subscribe, $b5e257d569688ac6$var$getSnapshot, $b5e257d569688ac6$var$getServerSnapshot);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (0, react__WEBPACK_IMPORTED_MODULE_0__.useContext)($b5e257d569688ac6$var$IsSSRContext);
}



//# sourceMappingURL=SSRProvider.module.js.map


/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useCallbackRef.js":
/*!***********************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useCallbackRef.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useCallbackRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * A convenience hook around `useState` designed to be paired with
 * the component [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) api.
 * Callback refs are useful over `useRef()` when you need to respond to the ref being set
 * instead of lazily accessing it in an effect.
 *
 * ```ts
 * const [element, attachRef] = useCallbackRef<HTMLDivElement>()
 *
 * useEffect(() => {
 *   if (!element) return
 *
 *   const calendar = new FullCalendar.Calendar(element)
 *
 *   return () => {
 *     calendar.destroy()
 *   }
 * }, [element])
 *
 * return <div ref={attachRef} />
 * ```
 *
 * @category refs
 */
function useCallbackRef() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useMounted.js":
/*!*******************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useMounted.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useMounted)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Track whether a component is current mounted. Generally less preferable than
 * properlly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @returns a function that returns the current isMounted state of the component
 *
 * ```ts
 * const [data, setData] = useState(null)
 * const isMounted = useMounted()
 *
 * useEffect(() => {
 *   fetchdata().then((newData) => {
 *      if (isMounted()) {
 *        setData(newData);
 *      }
 *   })
 * })
 * ```
 */
function useMounted() {
  const mounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  const isMounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(() => mounted.current);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useTimeout.js":
/*!*******************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useTimeout.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useTimeout)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useMounted__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useMounted */ "./node_modules/@restart/hooks/esm/useMounted.js");
/* harmony import */ var _useWillUnmount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useWillUnmount */ "./node_modules/@restart/hooks/esm/useWillUnmount.js");




/*
 * Browsers including Internet Explorer, Chrome, Safari, and Firefox store the
 * delay as a 32-bit signed integer internally. This causes an integer overflow
 * when using delays larger than 2,147,483,647 ms (about 24.8 days),
 * resulting in the timeout being executed immediately.
 *
 * via: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
const MAX_DELAY_MS = 2 ** 31 - 1;
function setChainedTimeout(handleRef, fn, timeoutAtMs) {
  const delayMs = timeoutAtMs - Date.now();
  handleRef.current = delayMs <= MAX_DELAY_MS ? setTimeout(fn, delayMs) : setTimeout(() => setChainedTimeout(handleRef, fn, timeoutAtMs), MAX_DELAY_MS);
}

/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 *
 *
 *
 * ```tsx
 * const { set, clear } = useTimeout();
 * const [hello, showHello] = useState(false);
 * //Display hello after 5 seconds
 * set(() => showHello(true), 5000);
 * return (
 *   <div className="App">
 *     {hello ? <h3>Hello</h3> : null}
 *   </div>
 * );
 * ```
 */
function useTimeout() {
  const isMounted = (0,_useMounted__WEBPACK_IMPORTED_MODULE_1__["default"])();

  // types are confused between node and web here IDK
  const handleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,_useWillUnmount__WEBPACK_IMPORTED_MODULE_2__["default"])(() => clearTimeout(handleRef.current));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const clear = () => clearTimeout(handleRef.current);
    function set(fn, delayMs = 0) {
      if (!isMounted()) return;
      clear();
      if (delayMs <= MAX_DELAY_MS) {
        // For simplicity, if the timeout is short, just set a normal timeout.
        handleRef.current = setTimeout(fn, delayMs);
      } else {
        setChainedTimeout(handleRef, fn, Date.now() + delayMs);
      }
    }
    return {
      set,
      clear,
      handleRef
    };
  }, []);
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useUpdateEffect.js":
/*!************************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useUpdateEffect.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Runs an effect only when the dependencies have changed, skipping the
 * initial "on mount" run. Caution, if the dependency list never changes,
 * the effect is **never run**
 *
 * ```ts
 *  const ref = useRef<HTMLInput>(null);
 *
 *  // focuses an element only if the focus changes, and not on mount
 *  useUpdateEffect(() => {
 *    const element = ref.current?.children[focusedIdx] as HTMLElement
 *
 *    element?.focus()
 *
 *  }, [focusedIndex])
 * ```
 * @param effect An effect to run on mount
 *
 * @category effects
 */
function useUpdateEffect(fn, deps) {
  const isFirst = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    return fn();
  }, deps);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useUpdateEffect);

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useUpdatedRef.js":
/*!**********************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useUpdatedRef.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useUpdatedRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Returns a ref that is immediately updated with the new value
 *
 * @param value The Ref value
 * @category refs
 */
function useUpdatedRef(value) {
  const valueRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
  valueRef.current = value;
  return valueRef;
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useWillUnmount.js":
/*!***********************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useWillUnmount.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useWillUnmount)
/* harmony export */ });
/* harmony import */ var _useUpdatedRef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useUpdatedRef */ "./node_modules/@restart/hooks/esm/useUpdatedRef.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Attach a callback that fires when a component unmounts
 *
 * @param fn Handler to run when the component unmounts
 * @category effects
 */
function useWillUnmount(fn) {
  const onUnmount = (0,_useUpdatedRef__WEBPACK_IMPORTED_MODULE_0__["default"])(fn);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => () => onUnmount.current(), []);
}

/***/ }),

/***/ "./node_modules/@restart/ui/esm/Anchor.js":
/*!************************************************!*\
  !*** ./node_modules/@restart/ui/esm/Anchor.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isTrivialHref: () => (/* binding */ isTrivialHref)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _restart_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @restart/hooks */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/index.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Button */ "./node_modules/@restart/ui/esm/Button.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["onKeyDown"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */





function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
/**
 * An generic `<a>` component that covers a few A11y cases, ensuring that
 * cases where the `href` is missing or trivial like "#" are treated like buttons.
 */
const Anchor = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((_ref, ref) => {
  let {
      onKeyDown
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [buttonProps] = (0,_Button__WEBPACK_IMPORTED_MODULE_3__.useButtonProps)(Object.assign({
    tagName: 'a'
  }, props));
  const handleKeyDown = (0,_restart_hooks__WEBPACK_IMPORTED_MODULE_1__.useEventCallback)(e => {
    buttonProps.onKeyDown(e);
    onKeyDown == null ? void 0 : onKeyDown(e);
  });
  if (isTrivialHref(props.href) || props.role === 'button') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", Object.assign({
      ref: ref
    }, props, buttonProps, {
      onKeyDown: handleKeyDown
    }));
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", Object.assign({
    ref: ref
  }, props, {
    onKeyDown: onKeyDown
  }));
});
Anchor.displayName = 'Anchor';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Anchor);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/Button.js":
/*!************************************************!*\
  !*** ./node_modules/@restart/ui/esm/Button.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isTrivialHref: () => (/* binding */ isTrivialHref),
/* harmony export */   useButtonProps: () => (/* binding */ useButtonProps)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["as", "disabled"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }


function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
function useButtonProps({
  tagName,
  disabled,
  href,
  target,
  rel,
  role,
  onClick,
  tabIndex = 0,
  type
}) {
  if (!tagName) {
    if (href != null || target != null || rel != null) {
      tagName = 'a';
    } else {
      tagName = 'button';
    }
  }
  const meta = {
    tagName
  };
  if (tagName === 'button') {
    return [{
      type: type || 'button',
      disabled
    }, meta];
  }
  const handleClick = event => {
    if (disabled || tagName === 'a' && isTrivialHref(href)) {
      event.preventDefault();
    }
    if (disabled) {
      event.stopPropagation();
      return;
    }
    onClick == null ? void 0 : onClick(event);
  };
  const handleKeyDown = event => {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };
  if (tagName === 'a') {
    // Ensure there's a href so Enter can trigger anchor button.
    href || (href = '#');
    if (disabled) {
      href = undefined;
    }
  }
  return [{
    role: role != null ? role : 'button',
    // explicitly undefined so that it overrides the props disabled in a spread
    // e.g. <Tag {...props} {...hookProps} />
    disabled: undefined,
    tabIndex: disabled ? undefined : tabIndex,
    href,
    target: tagName === 'a' ? target : undefined,
    'aria-disabled': !disabled ? undefined : disabled,
    rel: tagName === 'a' ? rel : undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown
  }, meta];
}
const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((_ref, ref) => {
  let {
      as: asProp,
      disabled
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [buttonProps, {
    tagName: Component
  }] = useButtonProps(Object.assign({
    tagName: asProp,
    disabled
  }, props));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Component, Object.assign({}, props, buttonProps, {
    ref: ref
  }));
});
Button.displayName = 'Button';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/Dropdown.js":
/*!**************************************************!*\
  !*** ./node_modules/@restart/ui/esm/Dropdown.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/querySelectorAll */ "./node_modules/dom-helpers/esm/querySelectorAll.js");
/* harmony import */ var dom_helpers_addEventListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/addEventListener */ "./node_modules/dom-helpers/esm/addEventListener.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uncontrollable */ "./node_modules/@restart/ui/node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _restart_hooks_usePrevious__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/usePrevious */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/usePrevious.js");
/* harmony import */ var _restart_hooks_useForceUpdate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @restart/hooks/useForceUpdate */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useForceUpdate.js");
/* harmony import */ var _restart_hooks_useEventListener__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @restart/hooks/useEventListener */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventListener.js");
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _DropdownContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./DropdownContext */ "./node_modules/@restart/ui/esm/DropdownContext.js");
/* harmony import */ var _DropdownMenu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./DropdownMenu */ "./node_modules/@restart/ui/esm/DropdownMenu.js");
/* harmony import */ var _DropdownToggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./DropdownToggle */ "./node_modules/@restart/ui/esm/DropdownToggle.js");
/* harmony import */ var _DropdownItem__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./DropdownItem */ "./node_modules/@restart/ui/esm/DropdownItem.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/@restart/ui/esm/SelectableContext.js");
/* harmony import */ var _DataKey__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DataKey */ "./node_modules/@restart/ui/esm/DataKey.js");
/* harmony import */ var _useWindow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./useWindow */ "./node_modules/@restart/ui/esm/useWindow.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

















function useRefWithUpdate() {
  const forceUpdate = (0,_restart_hooks_useForceUpdate__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const attachRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(element => {
    ref.current = element;
    // ensure that a menu set triggers an update for consumers
    forceUpdate();
  }, [forceUpdate]);
  return [ref, attachRef];
}

/**
 * @displayName Dropdown
 * @public
 */
function Dropdown({
  defaultShow,
  show: rawShow,
  onSelect,
  onToggle: rawOnToggle,
  itemSelector = `* [${(0,_DataKey__WEBPACK_IMPORTED_MODULE_9__.dataAttr)('dropdown-item')}]`,
  focusFirstItemOnShow,
  placement = 'bottom-start',
  children
}) {
  const window = (0,_useWindow__WEBPACK_IMPORTED_MODULE_10__["default"])();
  const [show, onToggle] = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_3__.useUncontrolledProp)(rawShow, defaultShow, rawOnToggle);

  // We use normal refs instead of useCallbackRef in order to populate the
  // the value as quickly as possible, otherwise the effect to focus the element
  // may run before the state value is set
  const [menuRef, setMenu] = useRefWithUpdate();
  const menuElement = menuRef.current;
  const [toggleRef, setToggle] = useRefWithUpdate();
  const toggleElement = toggleRef.current;
  const lastShow = (0,_restart_hooks_usePrevious__WEBPACK_IMPORTED_MODULE_4__["default"])(show);
  const lastSourceEvent = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const focusInDropdown = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(false);
  const onSelectCtx = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_SelectableContext__WEBPACK_IMPORTED_MODULE_11__["default"]);
  const toggle = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((nextShow, event, source = event == null ? void 0 : event.type) => {
    onToggle(nextShow, {
      originalEvent: event,
      source
    });
  }, [onToggle]);
  const handleSelect = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_7__["default"])((key, event) => {
    onSelect == null ? void 0 : onSelect(key, event);
    toggle(false, event, 'select');
    if (!event.isPropagationStopped()) {
      onSelectCtx == null ? void 0 : onSelectCtx(key, event);
    }
  });
  const context = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => ({
    toggle,
    placement,
    show,
    menuElement,
    toggleElement,
    setMenu,
    setToggle
  }), [toggle, placement, show, menuElement, toggleElement, setMenu, setToggle]);
  if (menuElement && lastShow && !show) {
    focusInDropdown.current = menuElement.contains(menuElement.ownerDocument.activeElement);
  }
  const focusToggle = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_7__["default"])(() => {
    if (toggleElement && toggleElement.focus) {
      toggleElement.focus();
    }
  });
  const maybeFocusFirst = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_7__["default"])(() => {
    const type = lastSourceEvent.current;
    let focusType = focusFirstItemOnShow;
    if (focusType == null) {
      focusType = menuRef.current && (0,_DropdownToggle__WEBPACK_IMPORTED_MODULE_12__.isRoleMenu)(menuRef.current) ? 'keyboard' : false;
    }
    if (focusType === false || focusType === 'keyboard' && !/^key.+$/.test(type)) {
      return;
    }
    const first = (0,dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_0__["default"])(menuRef.current, itemSelector)[0];
    if (first && first.focus) first.focus();
  });
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (show) maybeFocusFirst();else if (focusInDropdown.current) {
      focusInDropdown.current = false;
      focusToggle();
    }
    // only `show` should be changing
  }, [show, focusInDropdown, focusToggle, maybeFocusFirst]);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    lastSourceEvent.current = null;
  });
  const getNextFocusedChild = (current, offset) => {
    if (!menuRef.current) return null;
    const items = (0,dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_0__["default"])(menuRef.current, itemSelector);
    let index = items.indexOf(current) + offset;
    index = Math.max(0, Math.min(index, items.length));
    return items[index];
  };
  (0,_restart_hooks_useEventListener__WEBPACK_IMPORTED_MODULE_6__["default"])((0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => window.document, [window]), 'keydown', event => {
    var _menuRef$current, _toggleRef$current;
    const {
      key
    } = event;
    const target = event.target;
    const fromMenu = (_menuRef$current = menuRef.current) == null ? void 0 : _menuRef$current.contains(target);
    const fromToggle = (_toggleRef$current = toggleRef.current) == null ? void 0 : _toggleRef$current.contains(target);

    // Second only to https://github.com/twbs/bootstrap/blob/8cfbf6933b8a0146ac3fbc369f19e520bd1ebdac/js/src/dropdown.js#L400
    // in inscrutability
    const isInput = /input|textarea/i.test(target.tagName);
    if (isInput && (key === ' ' || key !== 'Escape' && fromMenu || key === 'Escape' && target.type === 'search')) {
      return;
    }
    if (!fromMenu && !fromToggle) {
      return;
    }
    if (key === 'Tab' && (!menuRef.current || !show)) {
      return;
    }
    lastSourceEvent.current = event.type;
    const meta = {
      originalEvent: event,
      source: event.type
    };
    switch (key) {
      case 'ArrowUp':
        {
          const next = getNextFocusedChild(target, -1);
          if (next && next.focus) next.focus();
          event.preventDefault();
          return;
        }
      case 'ArrowDown':
        event.preventDefault();
        if (!show) {
          onToggle(true, meta);
        } else {
          const next = getNextFocusedChild(target, 1);
          if (next && next.focus) next.focus();
        }
        return;
      case 'Tab':
        // on keydown the target is the element being tabbed FROM, we need that
        // to know if this event is relevant to this dropdown (e.g. in this menu).
        // On `keyup` the target is the element being tagged TO which we use to check
        // if focus has left the menu
        (0,dom_helpers_addEventListener__WEBPACK_IMPORTED_MODULE_1__["default"])(target.ownerDocument, 'keyup', e => {
          var _menuRef$current2;
          if (e.key === 'Tab' && !e.target || !((_menuRef$current2 = menuRef.current) != null && _menuRef$current2.contains(e.target))) {
            onToggle(false, meta);
          }
        }, {
          once: true
        });
        break;
      case 'Escape':
        if (key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
        }
        onToggle(false, meta);
        break;
      default:
    }
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_SelectableContext__WEBPACK_IMPORTED_MODULE_11__["default"].Provider, {
    value: handleSelect,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_DropdownContext__WEBPACK_IMPORTED_MODULE_13__["default"].Provider, {
      value: context,
      children: children
    })
  });
}
Dropdown.displayName = 'Dropdown';
Dropdown.Menu = _DropdownMenu__WEBPACK_IMPORTED_MODULE_14__["default"];
Dropdown.Toggle = _DropdownToggle__WEBPACK_IMPORTED_MODULE_12__["default"];
Dropdown.Item = _DropdownItem__WEBPACK_IMPORTED_MODULE_15__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropdown);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/DropdownContext.js":
/*!*********************************************************!*\
  !*** ./node_modules/@restart/ui/esm/DropdownContext.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const DropdownContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownContext);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/DropdownItem.js":
/*!******************************************************!*\
  !*** ./node_modules/@restart/ui/esm/DropdownItem.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useDropdownItem: () => (/* binding */ useDropdownItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/@restart/ui/esm/SelectableContext.js");
/* harmony import */ var _NavContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavContext */ "./node_modules/@restart/ui/esm/NavContext.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Button */ "./node_modules/@restart/ui/esm/Button.js");
/* harmony import */ var _DataKey__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataKey */ "./node_modules/@restart/ui/esm/DataKey.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["eventKey", "disabled", "onClick", "active", "as"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }








/**
 * Create a dropdown item. Returns a set of props for the dropdown item component
 * including an `onClick` handler that prevents selection when the item is disabled
 */
function useDropdownItem({
  key,
  href,
  active,
  disabled,
  onClick
}) {
  const onSelectCtx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_SelectableContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  const navContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_NavContext__WEBPACK_IMPORTED_MODULE_4__["default"]);
  const {
    activeKey
  } = navContext || {};
  const eventKey = (0,_SelectableContext__WEBPACK_IMPORTED_MODULE_3__.makeEventKey)(key, href);
  const isActive = active == null && key != null ? (0,_SelectableContext__WEBPACK_IMPORTED_MODULE_3__.makeEventKey)(activeKey) === eventKey : active;
  const handleClick = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_1__["default"])(event => {
    if (disabled) return;
    onClick == null ? void 0 : onClick(event);
    if (onSelectCtx && !event.isPropagationStopped()) {
      onSelectCtx(eventKey, event);
    }
  });
  return [{
    onClick: handleClick,
    'aria-disabled': disabled || undefined,
    'aria-selected': isActive,
    [(0,_DataKey__WEBPACK_IMPORTED_MODULE_5__.dataAttr)('dropdown-item')]: ''
  }, {
    isActive
  }];
}
const DropdownItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((_ref, ref) => {
  let {
      eventKey,
      disabled,
      onClick,
      active,
      as: Component = _Button__WEBPACK_IMPORTED_MODULE_6__["default"]
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [dropdownItemProps] = useDropdownItem({
    key: eventKey,
    href: props.href,
    disabled,
    onClick,
    active
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, Object.assign({}, props, {
    ref: ref
  }, dropdownItemProps));
});
DropdownItem.displayName = 'DropdownItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownItem);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/DropdownMenu.js":
/*!******************************************************!*\
  !*** ./node_modules/@restart/ui/esm/DropdownMenu.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useDropdownMenu: () => (/* binding */ useDropdownMenu)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @restart/hooks/useCallbackRef */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCallbackRef.js");
/* harmony import */ var _DropdownContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropdownContext */ "./node_modules/@restart/ui/esm/DropdownContext.js");
/* harmony import */ var _usePopper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usePopper */ "./node_modules/@restart/ui/esm/usePopper.js");
/* harmony import */ var _useClickOutside__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useClickOutside */ "./node_modules/@restart/ui/esm/useClickOutside.js");
/* harmony import */ var _mergeOptionsWithPopperConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mergeOptionsWithPopperConfig */ "./node_modules/@restart/ui/esm/mergeOptionsWithPopperConfig.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["children", "usePopper"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }








const noop = () => {};

/**
 * @memberOf Dropdown
 * @param {object}  options
 * @param {boolean} options.flip Automatically adjust the menu `drop` position based on viewport edge detection
 * @param {[number, number]} options.offset Define an offset distance between the Menu and the Toggle
 * @param {boolean} options.show Display the menu manually, ignored in the context of a `Dropdown`
 * @param {boolean} options.usePopper opt in/out of using PopperJS to position menus. When disabled you must position it yourself.
 * @param {string}  options.rootCloseEvent The pointer event to listen for when determining "clicks outside" the menu for triggering a close.
 * @param {object}  options.popperConfig Options passed to the [`usePopper`](/api/usePopper) hook.
 */
function useDropdownMenu(options = {}) {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_DropdownContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  const [arrowElement, attachArrowRef] = (0,_restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const hasShownRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const {
    flip,
    offset,
    rootCloseEvent,
    fixed = false,
    placement: placementOverride,
    popperConfig = {},
    enableEventListeners = true,
    usePopper: shouldUsePopper = !!context
  } = options;
  const show = (context == null ? void 0 : context.show) == null ? !!options.show : context.show;
  if (show && !hasShownRef.current) {
    hasShownRef.current = true;
  }
  const handleClose = e => {
    context == null ? void 0 : context.toggle(false, e);
  };
  const {
    placement,
    setMenu,
    menuElement,
    toggleElement
  } = context || {};
  const popper = (0,_usePopper__WEBPACK_IMPORTED_MODULE_4__["default"])(toggleElement, menuElement, (0,_mergeOptionsWithPopperConfig__WEBPACK_IMPORTED_MODULE_5__["default"])({
    placement: placementOverride || placement || 'bottom-start',
    enabled: shouldUsePopper,
    enableEvents: enableEventListeners == null ? show : enableEventListeners,
    offset,
    flip,
    fixed,
    arrowElement,
    popperConfig
  }));
  const menuProps = Object.assign({
    ref: setMenu || noop,
    'aria-labelledby': toggleElement == null ? void 0 : toggleElement.id
  }, popper.attributes.popper, {
    style: popper.styles.popper
  });
  const metadata = {
    show,
    placement,
    hasShown: hasShownRef.current,
    toggle: context == null ? void 0 : context.toggle,
    popper: shouldUsePopper ? popper : null,
    arrowProps: shouldUsePopper ? Object.assign({
      ref: attachArrowRef
    }, popper.attributes.arrow, {
      style: popper.styles.arrow
    }) : {}
  };
  (0,_useClickOutside__WEBPACK_IMPORTED_MODULE_6__["default"])(menuElement, handleClose, {
    clickTrigger: rootCloseEvent,
    disabled: !show
  });
  return [menuProps, metadata];
}
/**
 * Also exported as `<Dropdown.Menu>` from `Dropdown`.
 *
 * @displayName DropdownMenu
 * @memberOf Dropdown
 */
function DropdownMenu(_ref) {
  let {
      children,
      usePopper: usePopperProp = true
    } = _ref,
    options = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [props, meta] = useDropdownMenu(Object.assign({}, options, {
    usePopper: usePopperProp
  }));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: children(props, meta)
  });
}
DropdownMenu.displayName = 'DropdownMenu';

/** @component */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownMenu);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/DropdownToggle.js":
/*!********************************************************!*\
  !*** ./node_modules/@restart/ui/esm/DropdownToggle.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isRoleMenu: () => (/* binding */ isRoleMenu),
/* harmony export */   useDropdownToggle: () => (/* binding */ useDropdownToggle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ssr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ssr */ "./node_modules/@react-aria/ssr/dist/SSRProvider.mjs");
/* harmony import */ var _DropdownContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropdownContext */ "./node_modules/@restart/ui/esm/DropdownContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





const isRoleMenu = el => {
  var _el$getAttribute;
  return ((_el$getAttribute = el.getAttribute('role')) == null ? void 0 : _el$getAttribute.toLowerCase()) === 'menu';
};
const noop = () => {};

/**
 * Wires up Dropdown toggle functionality, returning a set a props to attach
 * to the element that functions as the dropdown toggle (generally a button).
 *
 * @memberOf Dropdown
 */
function useDropdownToggle() {
  const id = (0,_ssr__WEBPACK_IMPORTED_MODULE_2__.useSSRSafeId)();
  const {
    show = false,
    toggle = noop,
    setToggle,
    menuElement
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_DropdownContext__WEBPACK_IMPORTED_MODULE_3__["default"]) || {};
  const handleClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e => {
    toggle(!show, e);
  }, [show, toggle]);
  const props = {
    id,
    ref: setToggle || noop,
    onClick: handleClick,
    'aria-expanded': !!show
  };

  // This is maybe better down in an effect, but
  // the component is going to update anyway when the menu element
  // is set so might return new props.
  if (menuElement && isRoleMenu(menuElement)) {
    props['aria-haspopup'] = true;
  }
  return [props, {
    show,
    toggle
  }];
}
/**
 * Also exported as `<Dropdown.Toggle>` from `Dropdown`.
 *
 * @displayName DropdownToggle
 * @memberOf Dropdown
 */
function DropdownToggle({
  children
}) {
  const [props, meta] = useDropdownToggle();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: children(props, meta)
  });
}
DropdownToggle.displayName = 'DropdownToggle';

/** @component */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownToggle);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/Nav.js":
/*!*********************************************!*\
  !*** ./node_modules/@restart/ui/esm/Nav.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/querySelectorAll */ "./node_modules/dom-helpers/esm/querySelectorAll.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_hooks_useForceUpdate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/hooks/useForceUpdate */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useForceUpdate.js");
/* harmony import */ var _restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/hooks/useMergedRefs */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergedRefs.js");
/* harmony import */ var _NavContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NavContext */ "./node_modules/@restart/ui/esm/NavContext.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/@restart/ui/esm/SelectableContext.js");
/* harmony import */ var _TabContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TabContext */ "./node_modules/@restart/ui/esm/TabContext.js");
/* harmony import */ var _DataKey__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataKey */ "./node_modules/@restart/ui/esm/DataKey.js");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NavItem */ "./node_modules/@restart/ui/esm/NavItem.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["as", "onSelect", "activeKey", "role", "onKeyDown"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }











// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
const EVENT_KEY_ATTR = (0,_DataKey__WEBPACK_IMPORTED_MODULE_5__.dataAttr)('event-key');
const Nav = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((_ref, ref) => {
  let {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      onSelect,
      activeKey,
      role,
      onKeyDown
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  // A ref and forceUpdate for refocus, b/c we only want to trigger when needed
  // and don't want to reset the set in the effect
  const forceUpdate = (0,_restart_hooks_useForceUpdate__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const needsRefocusRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  const parentOnSelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["default"]);
  const tabContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_TabContext__WEBPACK_IMPORTED_MODULE_7__["default"]);
  let getControlledId, getControllerId;
  if (tabContext) {
    role = role || 'tablist';
    activeKey = tabContext.activeKey;
    // TODO: do we need to duplicate these?
    getControlledId = tabContext.getControlledId;
    getControllerId = tabContext.getControllerId;
  }
  const listNode = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const getNextActiveTab = offset => {
    const currentListNode = listNode.current;
    if (!currentListNode) return null;
    const items = (0,dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_0__["default"])(currentListNode, `[${EVENT_KEY_ATTR}]:not([aria-disabled=true])`);
    const activeChild = currentListNode.querySelector('[aria-selected=true]');
    if (!activeChild || activeChild !== document.activeElement) return null;
    const index = items.indexOf(activeChild);
    if (index === -1) return null;
    let nextIndex = index + offset;
    if (nextIndex >= items.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = items.length - 1;
    return items[nextIndex];
  };
  const handleSelect = (key, event) => {
    if (key == null) return;
    onSelect == null ? void 0 : onSelect(key, event);
    parentOnSelect == null ? void 0 : parentOnSelect(key, event);
  };
  const handleKeyDown = event => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (!tabContext) {
      return;
    }
    let nextActiveChild;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextActiveChild = getNextActiveTab(-1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextActiveChild = getNextActiveTab(1);
        break;
      default:
        return;
    }
    if (!nextActiveChild) return;
    event.preventDefault();
    handleSelect(nextActiveChild.dataset[(0,_DataKey__WEBPACK_IMPORTED_MODULE_5__.dataProp)('EventKey')] || null, event);
    needsRefocusRef.current = true;
    forceUpdate();
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (listNode.current && needsRefocusRef.current) {
      const activeChild = listNode.current.querySelector(`[${EVENT_KEY_ATTR}][aria-selected=true]`);
      activeChild == null ? void 0 : activeChild.focus();
    }
    needsRefocusRef.current = false;
  });
  const mergedRef = (0,_restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__["default"])(ref, listNode);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
    value: handleSelect,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_NavContext__WEBPACK_IMPORTED_MODULE_8__["default"].Provider, {
      value: {
        role,
        // used by NavLink to determine it's role
        activeKey: (0,_SelectableContext__WEBPACK_IMPORTED_MODULE_6__.makeEventKey)(activeKey),
        getControlledId: getControlledId || noop,
        getControllerId: getControllerId || noop
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Component, Object.assign({}, props, {
        onKeyDown: handleKeyDown,
        ref: mergedRef,
        role: role
      }))
    })
  });
});
Nav.displayName = 'Nav';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Nav, {
  Item: _NavItem__WEBPACK_IMPORTED_MODULE_9__["default"]
}));

/***/ }),

/***/ "./node_modules/@restart/ui/esm/NavContext.js":
/*!****************************************************!*\
  !*** ./node_modules/@restart/ui/esm/NavContext.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const NavContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
NavContext.displayName = 'NavContext';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavContext);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/NavItem.js":
/*!*************************************************!*\
  !*** ./node_modules/@restart/ui/esm/NavItem.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useNavItem: () => (/* binding */ useNavItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _NavContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavContext */ "./node_modules/@restart/ui/esm/NavContext.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/@restart/ui/esm/SelectableContext.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Button */ "./node_modules/@restart/ui/esm/Button.js");
/* harmony import */ var _DataKey__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DataKey */ "./node_modules/@restart/ui/esm/DataKey.js");
/* harmony import */ var _TabContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TabContext */ "./node_modules/@restart/ui/esm/TabContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["as", "active", "eventKey"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }









function useNavItem({
  key,
  onClick,
  active,
  id,
  role,
  disabled
}) {
  const parentOnSelect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_SelectableContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  const navContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_NavContext__WEBPACK_IMPORTED_MODULE_4__["default"]);
  const tabContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_TabContext__WEBPACK_IMPORTED_MODULE_5__["default"]);
  let isActive = active;
  const props = {
    role
  };
  if (navContext) {
    if (!role && navContext.role === 'tablist') props.role = 'tab';
    const contextControllerId = navContext.getControllerId(key != null ? key : null);
    const contextControlledId = navContext.getControlledId(key != null ? key : null);

    // @ts-ignore
    props[(0,_DataKey__WEBPACK_IMPORTED_MODULE_6__.dataAttr)('event-key')] = key;
    props.id = contextControllerId || id;
    isActive = active == null && key != null ? navContext.activeKey === key : active;

    /**
     * Simplified scenario for `mountOnEnter`.
     *
     * While it would make sense to keep 'aria-controls' for tabs that have been mounted at least
     * once, it would also complicate the code quite a bit, for very little gain.
     * The following implementation is probably good enough.
     *
     * @see https://github.com/react-restart/ui/pull/40#issuecomment-1009971561
     */
    if (isActive || !(tabContext != null && tabContext.unmountOnExit) && !(tabContext != null && tabContext.mountOnEnter)) props['aria-controls'] = contextControlledId;
  }
  if (props.role === 'tab') {
    props['aria-selected'] = isActive;
    if (!isActive) {
      props.tabIndex = -1;
    }
    if (disabled) {
      props.tabIndex = -1;
      props['aria-disabled'] = true;
    }
  }
  props.onClick = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_1__["default"])(e => {
    if (disabled) return;
    onClick == null ? void 0 : onClick(e);
    if (key == null) {
      return;
    }
    if (parentOnSelect && !e.isPropagationStopped()) {
      parentOnSelect(key, e);
    }
  });
  return [props, {
    isActive
  }];
}
const NavItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((_ref, ref) => {
  let {
      as: Component = _Button__WEBPACK_IMPORTED_MODULE_7__["default"],
      active,
      eventKey
    } = _ref,
    options = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [props, meta] = useNavItem(Object.assign({
    key: (0,_SelectableContext__WEBPACK_IMPORTED_MODULE_3__.makeEventKey)(eventKey, options.href),
    active
  }, options));

  // @ts-ignore
  props[(0,_DataKey__WEBPACK_IMPORTED_MODULE_6__.dataAttr)('active')] = meta.isActive;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, Object.assign({}, options, props, {
    ref: ref
  }));
});
NavItem.displayName = 'NavItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavItem);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/Overlay.js":
/*!*************************************************!*\
  !*** ./node_modules/@restart/ui/esm/Overlay.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/hooks/useCallbackRef */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCallbackRef.js");
/* harmony import */ var _restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/hooks/useMergedRefs */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergedRefs.js");
/* harmony import */ var _usePopper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./usePopper */ "./node_modules/@restart/ui/esm/usePopper.js");
/* harmony import */ var _useRootClose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useRootClose */ "./node_modules/@restart/ui/esm/useRootClose.js");
/* harmony import */ var _useWaitForDOMRef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useWaitForDOMRef */ "./node_modules/@restart/ui/esm/useWaitForDOMRef.js");
/* harmony import */ var _mergeOptionsWithPopperConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mergeOptionsWithPopperConfig */ "./node_modules/@restart/ui/esm/mergeOptionsWithPopperConfig.js");
/* harmony import */ var _ImperativeTransition__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ImperativeTransition */ "./node_modules/@restart/ui/esm/ImperativeTransition.js");










/**
 * Built on top of `Popper.js`, the overlay component is
 * great for custom tooltip overlays.
 */
const Overlay = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, outerRef) => {
  const {
    flip,
    offset,
    placement,
    containerPadding,
    popperConfig = {},
    transition: Transition,
    runTransition
  } = props;
  const [rootElement, attachRef] = (0,_restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const [arrowElement, attachArrowRef] = (0,_restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const mergedRef = (0,_restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__["default"])(attachRef, outerRef);
  const container = (0,_useWaitForDOMRef__WEBPACK_IMPORTED_MODULE_4__["default"])(props.container);
  const target = (0,_useWaitForDOMRef__WEBPACK_IMPORTED_MODULE_4__["default"])(props.target);
  const [exited, setExited] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!props.show);
  const popper = (0,_usePopper__WEBPACK_IMPORTED_MODULE_5__["default"])(target, rootElement, (0,_mergeOptionsWithPopperConfig__WEBPACK_IMPORTED_MODULE_6__["default"])({
    placement,
    enableEvents: !!props.show,
    containerPadding: containerPadding || 5,
    flip,
    offset,
    arrowElement,
    popperConfig
  }));

  // TODO: I think this needs to be in an effect
  if (props.show && exited) {
    setExited(false);
  }
  const handleHidden = (...args) => {
    setExited(true);
    if (props.onExited) {
      props.onExited(...args);
    }
  };

  // Don't un-render the overlay while it's transitioning out.
  const mountOverlay = props.show || !exited;
  (0,_useRootClose__WEBPACK_IMPORTED_MODULE_7__["default"])(rootElement, props.onHide, {
    disabled: !props.rootClose || props.rootCloseDisabled,
    clickTrigger: props.rootCloseEvent
  });
  if (!mountOverlay) {
    // Don't bother showing anything if we don't have to.
    return null;
  }
  const {
    onExit,
    onExiting,
    onEnter,
    onEntering,
    onEntered
  } = props;
  let child = props.children(Object.assign({}, popper.attributes.popper, {
    style: popper.styles.popper,
    ref: mergedRef
  }), {
    popper,
    placement,
    show: !!props.show,
    arrowProps: Object.assign({}, popper.attributes.arrow, {
      style: popper.styles.arrow,
      ref: attachArrowRef
    })
  });
  child = (0,_ImperativeTransition__WEBPACK_IMPORTED_MODULE_8__.renderTransition)(Transition, runTransition, {
    in: !!props.show,
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
    children: child,
    onExit,
    onExiting,
    onExited: handleHidden,
    onEnter,
    onEntering,
    onEntered
  });
  return container ? /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(child, container) : null;
});
Overlay.displayName = 'Overlay';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Overlay);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/TabContext.js":
/*!****************************************************!*\
  !*** ./node_modules/@restart/ui/esm/TabContext.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const TabContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabContext);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/TabPanel.js":
/*!**************************************************!*\
  !*** ./node_modules/@restart/ui/esm/TabPanel.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useTabPanel: () => (/* binding */ useTabPanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TabContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabContext */ "./node_modules/@restart/ui/esm/TabContext.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/@restart/ui/esm/SelectableContext.js");
/* harmony import */ var _NoopTransition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NoopTransition */ "./node_modules/@restart/ui/esm/NoopTransition.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["active", "eventKey", "mountOnEnter", "transition", "unmountOnExit", "role", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"],
  _excluded2 = ["activeKey", "getControlledId", "getControllerId"],
  _excluded3 = ["as"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }






function useTabPanel(_ref) {
  let {
      active,
      eventKey,
      mountOnEnter,
      transition,
      unmountOnExit,
      role = 'tabpanel',
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_TabContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
  if (!context) return [Object.assign({}, props, {
    role
  }), {
    eventKey,
    isActive: active,
    mountOnEnter,
    transition,
    unmountOnExit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  }];
  const {
      activeKey,
      getControlledId,
      getControllerId
    } = context,
    rest = _objectWithoutPropertiesLoose(context, _excluded2);
  const key = (0,_SelectableContext__WEBPACK_IMPORTED_MODULE_3__.makeEventKey)(eventKey);
  return [Object.assign({}, props, {
    role,
    id: getControlledId(eventKey),
    'aria-labelledby': getControllerId(eventKey)
  }), {
    eventKey,
    isActive: active == null && key != null ? (0,_SelectableContext__WEBPACK_IMPORTED_MODULE_3__.makeEventKey)(activeKey) === key : active,
    transition: transition || rest.transition,
    mountOnEnter: mountOnEnter != null ? mountOnEnter : rest.mountOnEnter,
    unmountOnExit: unmountOnExit != null ? unmountOnExit : rest.unmountOnExit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  }];
}
const TabPanel = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
(_ref2, ref) => {
  let {
      as: Component = 'div'
    } = _ref2,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded3);
  const [tabPanelProps, {
    isActive,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    mountOnEnter,
    unmountOnExit,
    transition: Transition = _NoopTransition__WEBPACK_IMPORTED_MODULE_4__["default"]
  }] = useTabPanel(props);
  // We provide an empty the TabContext so `<Nav>`s in `<TabPanel>`s don't
  // conflict with the top level one.
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_TabContext__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: null,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_SelectableContext__WEBPACK_IMPORTED_MODULE_3__["default"].Provider, {
      value: null,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Transition, {
        in: isActive,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: onExited,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Component, Object.assign({}, tabPanelProps, {
          ref: ref,
          hidden: !isActive,
          "aria-hidden": !isActive
        }))
      })
    })
  });
});
TabPanel.displayName = 'TabPanel';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabPanel);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/Tabs.js":
/*!**********************************************!*\
  !*** ./node_modules/@restart/ui/esm/Tabs.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uncontrollable */ "./node_modules/@restart/ui/node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _ssr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ssr */ "./node_modules/@react-aria/ssr/dist/SSRProvider.mjs");
/* harmony import */ var _TabContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TabContext */ "./node_modules/@restart/ui/esm/TabContext.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/@restart/ui/esm/SelectableContext.js");
/* harmony import */ var _TabPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TabPanel */ "./node_modules/@restart/ui/esm/TabPanel.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








const Tabs = props => {
  const {
    id: userId,
    generateChildId: generateCustomChildId,
    onSelect: propsOnSelect,
    activeKey: propsActiveKey,
    defaultActiveKey,
    transition,
    mountOnEnter,
    unmountOnExit,
    children
  } = props;
  const [activeKey, onSelect] = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_1__.useUncontrolledProp)(propsActiveKey, defaultActiveKey, propsOnSelect);
  const id = (0,_ssr__WEBPACK_IMPORTED_MODULE_3__.useSSRSafeId)(userId);
  const generateChildId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => generateCustomChildId || ((key, type) => id ? `${id}-${type}-${key}` : null), [id, generateCustomChildId]);
  const tabContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    onSelect,
    activeKey,
    transition,
    mountOnEnter: mountOnEnter || false,
    unmountOnExit: unmountOnExit || false,
    getControlledId: key => generateChildId(key, 'tabpane'),
    getControllerId: key => generateChildId(key, 'tab')
  }), [onSelect, activeKey, transition, mountOnEnter, unmountOnExit, generateChildId]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_TabContext__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
    value: tabContext,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_SelectableContext__WEBPACK_IMPORTED_MODULE_5__["default"].Provider, {
      value: onSelect || null,
      children: children
    })
  });
};
Tabs.Panel = _TabPanel__WEBPACK_IMPORTED_MODULE_6__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tabs);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/mergeOptionsWithPopperConfig.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@restart/ui/esm/mergeOptionsWithPopperConfig.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeOptionsWithPopperConfig),
/* harmony export */   toModifierArray: () => (/* binding */ toModifierArray),
/* harmony export */   toModifierMap: () => (/* binding */ toModifierMap)
/* harmony export */ });
function toModifierMap(modifiers) {
  const result = {};
  if (!Array.isArray(modifiers)) {
    return modifiers || result;
  }

  // eslint-disable-next-line no-unused-expressions
  modifiers == null ? void 0 : modifiers.forEach(m => {
    result[m.name] = m;
  });
  return result;
}
function toModifierArray(map = {}) {
  if (Array.isArray(map)) return map;
  return Object.keys(map).map(k => {
    map[k].name = k;
    return map[k];
  });
}
function mergeOptionsWithPopperConfig({
  enabled,
  enableEvents,
  placement,
  flip,
  offset,
  fixed,
  containerPadding,
  arrowElement,
  popperConfig = {}
}) {
  var _modifiers$eventListe, _modifiers$preventOve, _modifiers$preventOve2, _modifiers$offset, _modifiers$arrow;
  const modifiers = toModifierMap(popperConfig.modifiers);
  return Object.assign({}, popperConfig, {
    placement,
    enabled,
    strategy: fixed ? 'fixed' : popperConfig.strategy,
    modifiers: toModifierArray(Object.assign({}, modifiers, {
      eventListeners: {
        enabled: enableEvents,
        options: (_modifiers$eventListe = modifiers.eventListeners) == null ? void 0 : _modifiers$eventListe.options
      },
      preventOverflow: Object.assign({}, modifiers.preventOverflow, {
        options: containerPadding ? Object.assign({
          padding: containerPadding
        }, (_modifiers$preventOve = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve.options) : (_modifiers$preventOve2 = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve2.options
      }),
      offset: {
        options: Object.assign({
          offset
        }, (_modifiers$offset = modifiers.offset) == null ? void 0 : _modifiers$offset.options)
      },
      arrow: Object.assign({}, modifiers.arrow, {
        enabled: !!arrowElement,
        options: Object.assign({}, (_modifiers$arrow = modifiers.arrow) == null ? void 0 : _modifiers$arrow.options, {
          element: arrowElement
        })
      }),
      flip: Object.assign({
        enabled: !!flip
      }, modifiers.flip)
    }))
  });
}

/***/ }),

/***/ "./node_modules/@restart/ui/esm/popper.js":
/*!************************************************!*\
  !*** ./node_modules/@restart/ui/esm/popper.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPopper: () => (/* binding */ createPopper),
/* harmony export */   placements: () => (/* reexport safe */ _popperjs_core_lib_enums__WEBPACK_IMPORTED_MODULE_9__.placements)
/* harmony export */ });
/* harmony import */ var _popperjs_core_lib_modifiers_arrow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @popperjs/core/lib/modifiers/arrow */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _popperjs_core_lib_modifiers_computeStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @popperjs/core/lib/modifiers/computeStyles */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _popperjs_core_lib_modifiers_eventListeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @popperjs/core/lib/modifiers/eventListeners */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _popperjs_core_lib_modifiers_flip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @popperjs/core/lib/modifiers/flip */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _popperjs_core_lib_modifiers_hide__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @popperjs/core/lib/modifiers/hide */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popperjs_core_lib_modifiers_offset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @popperjs/core/lib/modifiers/offset */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperjs_core_lib_modifiers_popperOffsets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @popperjs/core/lib/modifiers/popperOffsets */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _popperjs_core_lib_modifiers_preventOverflow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @popperjs/core/lib/modifiers/preventOverflow */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _popperjs_core_lib_enums__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @popperjs/core/lib/enums */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _popperjs_core_lib_popper_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core/lib/popper-base */ "./node_modules/@popperjs/core/lib/createPopper.js");











// For the common JS build we will turn this file into a bundle with no imports.
// This is b/c the Popper lib is all esm files, and would break in a common js only environment
const createPopper = (0,_popperjs_core_lib_popper_base__WEBPACK_IMPORTED_MODULE_0__.popperGenerator)({
  defaultModifiers: [_popperjs_core_lib_modifiers_hide__WEBPACK_IMPORTED_MODULE_1__["default"], _popperjs_core_lib_modifiers_popperOffsets__WEBPACK_IMPORTED_MODULE_2__["default"], _popperjs_core_lib_modifiers_computeStyles__WEBPACK_IMPORTED_MODULE_3__["default"], _popperjs_core_lib_modifiers_eventListeners__WEBPACK_IMPORTED_MODULE_4__["default"], _popperjs_core_lib_modifiers_offset__WEBPACK_IMPORTED_MODULE_5__["default"], _popperjs_core_lib_modifiers_flip__WEBPACK_IMPORTED_MODULE_6__["default"], _popperjs_core_lib_modifiers_preventOverflow__WEBPACK_IMPORTED_MODULE_7__["default"], _popperjs_core_lib_modifiers_arrow__WEBPACK_IMPORTED_MODULE_8__["default"]]
});


/***/ }),

/***/ "./node_modules/@restart/ui/esm/useClickOutside.js":
/*!*********************************************************!*\
  !*** ./node_modules/@restart/ui/esm/useClickOutside.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getRefTarget: () => (/* binding */ getRefTarget)
/* harmony export */ });
/* harmony import */ var dom_helpers_contains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/contains */ "./node_modules/dom-helpers/esm/contains.js");
/* harmony import */ var dom_helpers_listen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/listen */ "./node_modules/dom-helpers/esm/listen.js");
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dom-helpers/ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_5__);






const noop = () => {};
function isLeftClickEvent(event) {
  return event.button === 0;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
const getRefTarget = ref => ref && ('current' in ref ? ref.current : ref);
const InitialTriggerEvents = {
  click: 'mousedown',
  mouseup: 'mousedown',
  pointerup: 'pointerdown'
};

/**
 * The `useClickOutside` hook registers your callback on the document that fires
 * when a pointer event is registered outside of the provided ref or element.
 *
 * @param {Ref<HTMLElement>| HTMLElement} ref  The element boundary
 * @param {function} onClickOutside
 * @param {object=}  options
 * @param {boolean=} options.disabled
 * @param {string=}  options.clickTrigger The DOM event name (click, mousedown, etc) to attach listeners on
 */
function useClickOutside(ref, onClickOutside = noop, {
  disabled,
  clickTrigger = 'click'
} = {}) {
  const preventMouseClickOutsideRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(false);
  const waitingForTrigger = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(false);
  const handleMouseCapture = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(e => {
    const currentTarget = getRefTarget(ref);
    warning__WEBPACK_IMPORTED_MODULE_5___default()(!!currentTarget, 'ClickOutside captured a close event but does not have a ref to compare it to. ' + 'useClickOutside(), should be passed a ref that resolves to a DOM node');
    preventMouseClickOutsideRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!(0,dom_helpers_contains__WEBPACK_IMPORTED_MODULE_0__["default"])(currentTarget, e.target) || waitingForTrigger.current;
    waitingForTrigger.current = false;
  }, [ref]);
  const handleInitialMouse = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__["default"])(e => {
    const currentTarget = getRefTarget(ref);
    if (currentTarget && (0,dom_helpers_contains__WEBPACK_IMPORTED_MODULE_0__["default"])(currentTarget, e.target)) {
      waitingForTrigger.current = true;
    } else {
      // When clicking on scrollbars within current target, click events are not triggered, so this ref
      // is never reset inside `handleMouseCapture`. This would cause a bug where it requires 2 clicks
      // to close the overlay.
      waitingForTrigger.current = false;
    }
  });
  const handleMouse = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__["default"])(e => {
    if (!preventMouseClickOutsideRef.current) {
      onClickOutside(e);
    }
  });
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    var _ownerWindow$event, _ownerWindow$parent;
    if (disabled || ref == null) return undefined;
    const doc = (0,dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_2__["default"])(getRefTarget(ref));
    const ownerWindow = doc.defaultView || window;

    // Store the current event to avoid triggering handlers immediately
    // For things rendered in an iframe, the event might originate on the parent window
    // so we should fall back to that global event if the local one doesn't exist
    // https://github.com/facebook/react/issues/20074
    let currentEvent = (_ownerWindow$event = ownerWindow.event) != null ? _ownerWindow$event : (_ownerWindow$parent = ownerWindow.parent) == null ? void 0 : _ownerWindow$parent.event;
    let removeInitialTriggerListener = null;
    if (InitialTriggerEvents[clickTrigger]) {
      removeInitialTriggerListener = (0,dom_helpers_listen__WEBPACK_IMPORTED_MODULE_1__["default"])(doc, InitialTriggerEvents[clickTrigger], handleInitialMouse, true);
    }

    // Use capture for this listener so it fires before React's listener, to
    // avoid false positives in the contains() check below if the target DOM
    // element is removed in the React mouse callback.
    const removeMouseCaptureListener = (0,dom_helpers_listen__WEBPACK_IMPORTED_MODULE_1__["default"])(doc, clickTrigger, handleMouseCapture, true);
    const removeMouseListener = (0,dom_helpers_listen__WEBPACK_IMPORTED_MODULE_1__["default"])(doc, clickTrigger, e => {
      // skip if this event is the same as the one running when we added the handlers
      if (e === currentEvent) {
        currentEvent = undefined;
        return;
      }
      handleMouse(e);
    });
    let mobileSafariHackListeners = [];
    if ('ontouchstart' in doc.documentElement) {
      mobileSafariHackListeners = [].slice.call(doc.body.children).map(el => (0,dom_helpers_listen__WEBPACK_IMPORTED_MODULE_1__["default"])(el, 'mousemove', noop));
    }
    return () => {
      removeInitialTriggerListener == null ? void 0 : removeInitialTriggerListener();
      removeMouseCaptureListener();
      removeMouseListener();
      mobileSafariHackListeners.forEach(remove => remove());
    };
  }, [ref, disabled, clickTrigger, handleMouseCapture, handleInitialMouse, handleMouse]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useClickOutside);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/usePopper.js":
/*!***************************************************!*\
  !*** ./node_modules/@restart/ui/esm/usePopper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dequal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dequal */ "./node_modules/dequal/dist/index.mjs");
/* harmony import */ var _restart_hooks_useSafeState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/hooks/useSafeState */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useSafeState.js");
/* harmony import */ var _popper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popper */ "./node_modules/@restart/ui/esm/popper.js");
const _excluded = ["enabled", "placement", "strategy", "modifiers"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }




const disabledApplyStylesModifier = {
  name: 'applyStyles',
  enabled: false,
  phase: 'afterWrite',
  fn: () => undefined
};

// until docjs supports type exports...

const ariaDescribedByModifier = {
  name: 'ariaDescribedBy',
  enabled: true,
  phase: 'afterWrite',
  effect: ({
    state
  }) => () => {
    const {
      reference,
      popper
    } = state.elements;
    if ('removeAttribute' in reference) {
      const ids = (reference.getAttribute('aria-describedby') || '').split(',').filter(id => id.trim() !== popper.id);
      if (!ids.length) reference.removeAttribute('aria-describedby');else reference.setAttribute('aria-describedby', ids.join(','));
    }
  },
  fn: ({
    state
  }) => {
    var _popper$getAttribute;
    const {
      popper,
      reference
    } = state.elements;
    const role = (_popper$getAttribute = popper.getAttribute('role')) == null ? void 0 : _popper$getAttribute.toLowerCase();
    if (popper.id && role === 'tooltip' && 'setAttribute' in reference) {
      const ids = reference.getAttribute('aria-describedby');
      if (ids && ids.split(',').indexOf(popper.id) !== -1) {
        return;
      }
      reference.setAttribute('aria-describedby', ids ? `${ids},${popper.id}` : popper.id);
    }
  }
};
const EMPTY_MODIFIERS = [];
/**
 * Position an element relative some reference element using Popper.js
 *
 * @param referenceElement
 * @param popperElement
 * @param {object}      options
 * @param {object=}     options.modifiers Popper.js modifiers
 * @param {boolean=}    options.enabled toggle the popper functionality on/off
 * @param {string=}     options.placement The popper element placement relative to the reference element
 * @param {string=}     options.strategy the positioning strategy
 * @param {function=}   options.onCreate called when the popper is created
 * @param {function=}   options.onUpdate called when the popper is updated
 *
 * @returns {UsePopperState} The popper state
 */
function usePopper(referenceElement, popperElement, _ref = {}) {
  let {
      enabled = true,
      placement = 'bottom',
      strategy = 'absolute',
      modifiers = EMPTY_MODIFIERS
    } = _ref,
    config = _objectWithoutPropertiesLoose(_ref, _excluded);
  const prevModifiers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(modifiers);
  const popperInstanceRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const update = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    var _popperInstanceRef$cu;
    (_popperInstanceRef$cu = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu.update();
  }, []);
  const forceUpdate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    var _popperInstanceRef$cu2;
    (_popperInstanceRef$cu2 = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu2.forceUpdate();
  }, []);
  const [popperState, setState] = (0,_restart_hooks_useSafeState__WEBPACK_IMPORTED_MODULE_2__["default"])((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    placement,
    update,
    forceUpdate,
    attributes: {},
    styles: {
      popper: {},
      arrow: {}
    }
  }));
  const updateModifier = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    name: 'updateStateModifier',
    enabled: true,
    phase: 'write',
    requires: ['computeStyles'],
    fn: ({
      state
    }) => {
      const styles = {};
      const attributes = {};
      Object.keys(state.elements).forEach(element => {
        styles[element] = state.styles[element];
        attributes[element] = state.attributes[element];
      });
      setState({
        state,
        styles,
        attributes,
        update,
        forceUpdate,
        placement: state.placement
      });
    }
  }), [update, forceUpdate, setState]);
  const nextModifiers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!(0,dequal__WEBPACK_IMPORTED_MODULE_1__.dequal)(prevModifiers.current, modifiers)) {
      prevModifiers.current = modifiers;
    }
    return prevModifiers.current;
  }, [modifiers]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!popperInstanceRef.current || !enabled) return;
    popperInstanceRef.current.setOptions({
      placement,
      strategy,
      modifiers: [...nextModifiers, updateModifier, disabledApplyStylesModifier]
    });
  }, [strategy, placement, updateModifier, enabled, nextModifiers]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!enabled || referenceElement == null || popperElement == null) {
      return undefined;
    }
    popperInstanceRef.current = (0,_popper__WEBPACK_IMPORTED_MODULE_3__.createPopper)(referenceElement, popperElement, Object.assign({}, config, {
      placement,
      strategy,
      modifiers: [...nextModifiers, ariaDescribedByModifier, updateModifier]
    }));
    return () => {
      if (popperInstanceRef.current != null) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = undefined;
        setState(s => Object.assign({}, s, {
          attributes: {},
          styles: {
            popper: {}
          }
        }));
      }
    };
    // This is only run once to _create_ the popper
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, referenceElement, popperElement]);
  return popperState;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (usePopper);

/***/ }),

/***/ "./node_modules/@restart/ui/esm/useRootClose.js":
/*!******************************************************!*\
  !*** ./node_modules/@restart/ui/esm/useRootClose.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dom_helpers_listen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/listen */ "./node_modules/dom-helpers/esm/listen.js");
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _useClickOutside__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useClickOutside */ "./node_modules/@restart/ui/esm/useClickOutside.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./node_modules/@restart/ui/esm/utils.js");






const noop = () => {};
/**
 * The `useRootClose` hook registers your callback on the document
 * when rendered. Powers the `<Overlay/>` component. This is used achieve modal
 * style behavior where your callback is triggered when the user tries to
 * interact with the rest of the document or hits the `esc` key.
 *
 * @param {Ref<HTMLElement>| HTMLElement} ref  The element boundary
 * @param {function} onRootClose
 * @param {object=}  options
 * @param {boolean=} options.disabled
 * @param {string=}  options.clickTrigger The DOM event name (click, mousedown, etc) to attach listeners on
 */
function useRootClose(ref, onRootClose, {
  disabled,
  clickTrigger
} = {}) {
  const onClose = onRootClose || noop;
  (0,_useClickOutside__WEBPACK_IMPORTED_MODULE_4__["default"])(ref, onClose, {
    disabled,
    clickTrigger
  });
  const handleKeyUp = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_3__["default"])(e => {
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_5__.isEscKey)(e)) {
      onClose(e);
    }
  });
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (disabled || ref == null) return undefined;
    const doc = (0,dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_useClickOutside__WEBPACK_IMPORTED_MODULE_4__.getRefTarget)(ref));

    // Store the current event to avoid triggering handlers immediately
    // https://github.com/facebook/react/issues/20074
    let currentEvent = (doc.defaultView || window).event;
    const removeKeyupListener = (0,dom_helpers_listen__WEBPACK_IMPORTED_MODULE_0__["default"])(doc, 'keyup', e => {
      // skip if this event is the same as the one running when we added the handlers
      if (e === currentEvent) {
        currentEvent = undefined;
        return;
      }
      handleKeyUp(e);
    });
    return () => {
      removeKeyupListener();
    };
  }, [ref, disabled, handleKeyUp]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useRootClose);

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCallbackRef: () => (/* reexport safe */ _useCallbackRef__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   useCommittedRef: () => (/* reexport safe */ _useCommittedRef__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   useEventCallback: () => (/* reexport safe */ _useEventCallback__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   useEventListener: () => (/* reexport safe */ _useEventListener__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   useGlobalListener: () => (/* reexport safe */ _useGlobalListener__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   useImage: () => (/* reexport safe */ _useImage__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   useInterval: () => (/* reexport safe */ _useInterval__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   useMergeState: () => (/* reexport safe */ _useMergeState__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   useMergeStateFromProps: () => (/* reexport safe */ _useMergeStateFromProps__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   useMounted: () => (/* reexport safe */ _useMounted__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   usePrevious: () => (/* reexport safe */ _usePrevious__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   useRafInterval: () => (/* reexport safe */ _useRafInterval__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   useResizeObserver: () => (/* reexport safe */ _useResizeObserver__WEBPACK_IMPORTED_MODULE_12__["default"])
/* harmony export */ });
/* harmony import */ var _useCallbackRef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useCallbackRef */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCallbackRef.js");
/* harmony import */ var _useCommittedRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useCommittedRef */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCommittedRef.js");
/* harmony import */ var _useEventCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useEventCallback */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _useEventListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useEventListener */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventListener.js");
/* harmony import */ var _useGlobalListener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useGlobalListener */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useGlobalListener.js");
/* harmony import */ var _useInterval__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useInterval */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useInterval.js");
/* harmony import */ var _useRafInterval__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useRafInterval */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useRafInterval.js");
/* harmony import */ var _useMergeState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useMergeState */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergeState.js");
/* harmony import */ var _useMergeStateFromProps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useMergeStateFromProps */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergeStateFromProps.js");
/* harmony import */ var _useMounted__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./useMounted */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMounted.js");
/* harmony import */ var _usePrevious__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./usePrevious */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/usePrevious.js");
/* harmony import */ var _useImage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./useImage */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useImage.js");
/* harmony import */ var _useResizeObserver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./useResizeObserver */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useResizeObserver.js");















/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCallbackRef.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCallbackRef.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useCallbackRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * A convenience hook around `useState` designed to be paired with
 * the component [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) api.
 * Callback refs are useful over `useRef()` when you need to respond to the ref being set
 * instead of lazily accessing it in an effect.
 *
 * ```ts
 * const [element, attachRef] = useCallbackRef<HTMLDivElement>()
 *
 * useEffect(() => {
 *   if (!element) return
 *
 *   const calendar = new FullCalendar.Calendar(element)
 *
 *   return () => {
 *     calendar.destroy()
 *   }
 * }, [element])
 *
 * return <div ref={attachRef} />
 * ```
 *
 * @category refs
 */
function useCallbackRef() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
}

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventListener.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventListener.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useEventListener)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useEventCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useEventCallback */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventCallback.js");


/**
 * Attaches an event handler outside directly to specified DOM element
 * bypassing the react synthetic event system.
 *
 * @param element The target to listen for events on
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
function useEventListener(eventTarget, event, listener, capture = false) {
  const handler = (0,_useEventCallback__WEBPACK_IMPORTED_MODULE_1__["default"])(listener);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
    target.addEventListener(event, handler, capture);
    return () => target.removeEventListener(event, handler, capture);
  }, [eventTarget]);
}

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useForceUpdate.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useForceUpdate.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useForceUpdate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Returns a function that triggers a component update. the hook equivalent to
 * `this.forceUpdate()` in a class component. In most cases using a state value directly
 * is preferable but may be required in some advanced usages of refs for interop or
 * when direct DOM manipulation is required.
 *
 * ```ts
 * const forceUpdate = useForceUpdate();
 *
 * const updateOnClick = useCallback(() => {
 *  forceUpdate()
 * }, [forceUpdate])
 *
 * return <button type="button" onClick={updateOnClick}>Hi there</button>
 * ```
 */
function useForceUpdate() {
  // The toggling state value is designed to defeat React optimizations for skipping
  // updates when they are strictly equal to the last state value
  const [, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(revision => revision + 1, 0);
  return dispatch;
}

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useGlobalListener.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useGlobalListener.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useGlobalListener)
/* harmony export */ });
/* harmony import */ var _useEventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useEventListener */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventListener.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Attaches an event handler outside directly to the `document`,
 * bypassing the react synthetic event system.
 *
 * ```ts
 * useGlobalListener('keydown', (event) => {
 *  console.log(event.key)
 * })
 * ```
 *
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
function useGlobalListener(event, handler, capture = false) {
  const documentTarget = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => document, []);
  return (0,_useEventListener__WEBPACK_IMPORTED_MODULE_0__["default"])(documentTarget, event, handler, capture);
}

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useImage.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useImage.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useImage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Fetch and load an image for programatic use such as in a `<canvas>` element.
 *
 * @param imageOrUrl The `HtmlImageElement` or image url to load
 * @param crossOrigin The `crossorigin` attribute to set
 *
 * ```ts
 * const { image, error } = useImage('/static/kittens.png')
 * const ref = useRef<HTMLCanvasElement>()
 *
 * useEffect(() => {
 *   const ctx = ref.current.getContext('2d')
 *
 *   if (image) {
 *     ctx.drawImage(image, 0, 0)
 *   }
 * }, [ref, image])
 *
 * return (
 *   <>
 *     {error && "there was a problem loading the image"}
 *     <canvas ref={ref} />
 *   </>
 * ```
 */
function useImage(imageOrUrl, crossOrigin) {
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    image: null,
    error: null
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!imageOrUrl) return undefined;
    let image;
    if (typeof imageOrUrl === 'string') {
      image = new Image();
      if (crossOrigin) image.crossOrigin = crossOrigin;
      image.src = imageOrUrl;
    } else {
      image = imageOrUrl;
      if (image.complete && image.naturalHeight > 0) {
        setState({
          image,
          error: null
        });
        return;
      }
    }
    function onLoad() {
      setState({
        image,
        error: null
      });
    }
    function onError(error) {
      setState({
        image,
        error
      });
    }
    image.addEventListener('load', onLoad);
    image.addEventListener('error', onError);
    return () => {
      image.removeEventListener('load', onLoad);
      image.removeEventListener('error', onError);
    };
  }, [imageOrUrl, crossOrigin]);
  return state;
}

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useInterval.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useInterval.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useCommittedRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useCommittedRef */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCommittedRef.js");



/**
 * Creates a `setInterval` that is properly cleaned up when a component unmounted
 *
 * ```tsx
 *  function Timer() {
 *    const [timer, setTimer] = useState(0)
 *    useInterval(() => setTimer(i => i + 1), 1000)
 *
 *    return <span>{timer} seconds past</span>
 *  }
 * ```
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 */

/**
 * Creates a pausable `setInterval` that is properly cleaned up when a component unmounted
 *
 * ```tsx
 *  const [paused, setPaused] = useState(false)
 *  const [timer, setTimer] = useState(0)
 *
 *  useInterval(() => setTimer(i => i + 1), 1000, paused)
 *
 *  return (
 *    <span>
 *      {timer} seconds past
 *
 *      <button onClick={() => setPaused(p => !p)}>{paused ? 'Play' : 'Pause' }</button>
 *    </span>
 * )
 * ```
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 * @param paused Whether or not the interval is currently running
 */

/**
 * Creates a pausable `setInterval` that _fires_ immediately and is
 * properly cleaned up when a component unmounted
 *
 * ```tsx
 *  const [timer, setTimer] = useState(-1)
 *  useInterval(() => setTimer(i => i + 1), 1000, false, true)
 *
 *  // will update to 0 on the first effect
 *  return <span>{timer} seconds past</span>
 * ```
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 * @param paused Whether or not the interval is currently running
 * @param runImmediately Whether to run the function immediately on mount or unpause
 * rather than waiting for the first interval to elapse
 *

 */

function useInterval(fn, ms, paused = false, runImmediately = false) {
  let handle;
  const fnRef = (0,_useCommittedRef__WEBPACK_IMPORTED_MODULE_1__["default"])(fn);
  // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.
  const pausedRef = (0,_useCommittedRef__WEBPACK_IMPORTED_MODULE_1__["default"])(paused);
  const tick = () => {
    if (pausedRef.current) return;
    fnRef.current();
    schedule(); // eslint-disable-line no-use-before-define
  };

  const schedule = () => {
    clearTimeout(handle);
    handle = setTimeout(tick, ms);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (runImmediately) {
      tick();
    } else {
      schedule();
    }
    return () => clearTimeout(handle);
  }, [paused, runImmediately]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useInterval);

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergeState.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergeState.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useMergeState)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Updates state, partial updates are merged into existing state values
 */

/**
 * Mimics a React class component's state model, of having a single unified
 * `state` object and an updater that merges updates into the existing state, as
 * opposed to replacing it.
 *
 * ```js
 * const [state, setState] = useMergeState({ name: 'Betsy', age: 24 })
 *
 * setState({ name: 'Johan' }) // { name: 'Johan', age: 24 }
 *
 * setState(state => ({ age: state.age + 10 })) // { name: 'Johan', age: 34 }
 * ```
 *
 * @param initialState The initial state object
 */
function useMergeState(initialState) {
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialState);
  const updater = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(update => {
    if (update === null) return;
    if (typeof update === 'function') {
      setState(state => {
        const nextState = update(state);
        return nextState == null ? state : Object.assign({}, state, nextState);
      });
    } else {
      setState(state => Object.assign({}, state, update));
    }
  }, [setState]);
  return [state, updater];
}

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergeStateFromProps.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergeStateFromProps.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useMergeStateFromProps)
/* harmony export */ });
/* harmony import */ var _useMergeState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMergeState */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergeState.js");

function useMergeStateFromProps(props, gDSFP, initialState) {
  const [state, setState] = (0,_useMergeState__WEBPACK_IMPORTED_MODULE_0__["default"])(initialState);
  const nextState = gDSFP(props, state);
  if (nextState !== null) setState(nextState);
  return [state, setState];
}

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useRafInterval.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useRafInterval.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useCommittedRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useCommittedRef */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCommittedRef.js");


function useRafInterval(fn, ms, paused = false) {
  let handle;
  let start = new Date().getTime();
  const fnRef = (0,_useCommittedRef__WEBPACK_IMPORTED_MODULE_1__["default"])(fn);
  // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.
  const pausedRef = (0,_useCommittedRef__WEBPACK_IMPORTED_MODULE_1__["default"])(paused);
  function loop() {
    const current = new Date().getTime();
    const delta = current - start;
    if (pausedRef.current) return;
    if (delta >= ms && fnRef.current) {
      fnRef.current();
      start = new Date().getTime();
    }
    cancelAnimationFrame(handle);
    handle = requestAnimationFrame(loop);
  }
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    handle = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(handle);
  }, []);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useRafInterval);

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useResizeObserver.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useResizeObserver.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useResizeObserver)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useIsomorphicEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useIsomorphicEffect */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useIsomorphicEffect.js");


const targetMap = new WeakMap();
let resizeObserver;
function getResizeObserver() {
  // eslint-disable-next-line no-return-assign
  return resizeObserver = resizeObserver || new window.ResizeObserver(entries => {
    entries.forEach(entry => {
      const handler = targetMap.get(entry.target);
      if (handler) handler(entry.contentRect);
    });
  });
}

/**
 * Efficiently observe size changes on an element. Depends on the `ResizeObserver` api,
 * and polyfills are needed in older browsers.
 *
 * ```ts
 * const [ref, attachRef] = useCallbackRef(null);
 *
 * const rect = useResizeObserver(ref);
 *
 * return (
 *  <div ref={attachRef}>
 *    {JSON.stringify(rect)}
 *  </div>
 * )
 * ```
 *
 * @param element The DOM element to observe
 */
function useResizeObserver(element) {
  const [rect, setRect] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,_useIsomorphicEffect__WEBPACK_IMPORTED_MODULE_1__["default"])(() => {
    if (!element) return;
    getResizeObserver().observe(element);
    setRect(element.getBoundingClientRect());
    targetMap.set(element, rect => {
      setRect(rect);
    });
    return () => {
      targetMap.delete(element);
    };
  }, [element]);
  return rect;
}

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useSafeState.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useSafeState.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useMounted__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useMounted */ "./node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMounted.js");



/**
 * `useSafeState` takes the return value of a `useState` hook and wraps the
 * setter to prevent updates onces the component has unmounted. Can used
 * with `useMergeState` and `useStateAsync` as well
 *
 * @param state The return value of a useStateHook
 *
 * ```ts
 * const [show, setShow] = useSafeState(useState(true));
 * ```
 */

function useSafeState(state) {
  const isMounted = (0,_useMounted__WEBPACK_IMPORTED_MODULE_1__["default"])();
  return [state[0], (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(nextState => {
    if (!isMounted()) return;
    return state[1](nextState);
  }, [isMounted, state[1]])];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSafeState);

/***/ }),

/***/ "./node_modules/@restart/ui/node_modules/uncontrollable/lib/esm/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@restart/ui/node_modules/uncontrollable/lib/esm/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultKey: () => (/* binding */ defaultKey),
/* harmony export */   useUncontrolled: () => (/* binding */ useUncontrolled),
/* harmony export */   useUncontrolledProp: () => (/* binding */ useUncontrolledProp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}
function useUncontrolledProp(propValue, defaultValue, handler) {
  const wasPropRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(propValue !== undefined);
  const [stateValue, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue);
  const isProp = propValue !== undefined;
  const wasProp = wasPropRef.current;
  wasPropRef.current = isProp;

  /**
   * If a prop switches from controlled to Uncontrolled
   * reset its value to the defaultValue
   */
  if (!isProp && wasProp && stateValue !== defaultValue) {
    setState(defaultValue);
  }
  return [isProp ? propValue : stateValue, (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((...args) => {
    const [value, ...rest] = args;
    let returnValue = handler == null ? void 0 : handler(value, ...rest);
    setState(value);
    return returnValue;
  }, [handler])];
}

function useUncontrolled(props, config) {
  return Object.keys(config).reduce((result, fieldName) => {
    const _ref = result,
      _defaultKey = defaultKey(fieldName),
      {
        [_defaultKey]: defaultValue,
        [fieldName]: propsValue
      } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, [_defaultKey, fieldName].map(_toPropertyKey));
    const handlerName = config[fieldName];
    const [value, handler] = useUncontrolledProp(propsValue, defaultValue, props[handlerName]);
    return Object.assign({}, rest, {
      [fieldName]: value,
      [handlerName]: handler
    });
  }, props);
}

/***/ }),

/***/ "./node_modules/dequal/dist/index.mjs":
/*!********************************************!*\
  !*** ./node_modules/dequal/dist/index.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dequal: () => (/* binding */ dequal)
/* harmony export */ });
var has = Object.prototype.hasOwnProperty;

function find(iter, tar, key) {
	for (key of iter.keys()) {
		if (dequal(key, tar)) return key;
	}
}

function dequal(foo, bar) {
	var ctor, len, tmp;
	if (foo === bar) return true;

	if (foo && bar && (ctor=foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();

		if (ctor === Array) {
			if ((len=foo.length) === bar.length) {
				while (len-- && dequal(foo[len], bar[len]));
			}
			return len === -1;
		}

		if (ctor === Set) {
			if (foo.size !== bar.size) {
				return false;
			}
			for (len of foo) {
				tmp = len;
				if (tmp && typeof tmp === 'object') {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!bar.has(tmp)) return false;
			}
			return true;
		}

		if (ctor === Map) {
			if (foo.size !== bar.size) {
				return false;
			}
			for (len of foo) {
				tmp = len[0];
				if (tmp && typeof tmp === 'object') {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!dequal(len[1], bar.get(tmp))) {
					return false;
				}
			}
			return true;
		}

		if (ctor === ArrayBuffer) {
			foo = new Uint8Array(foo);
			bar = new Uint8Array(bar);
		} else if (ctor === DataView) {
			if ((len=foo.byteLength) === bar.byteLength) {
				while (len-- && foo.getInt8(len) === bar.getInt8(len));
			}
			return len === -1;
		}

		if (ArrayBuffer.isView(foo)) {
			if ((len=foo.byteLength) === bar.byteLength) {
				while (len-- && foo[len] === bar[len]);
			}
			return len === -1;
		}

		if (!ctor || typeof foo === 'object') {
			len = 0;
			for (ctor in foo) {
				if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
				if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
			}
			return Object.keys(bar).length === len;
		}
	}

	return foo !== foo && bar !== bar;
}


/***/ }),

/***/ "./node_modules/dom-helpers/esm/scrollbarSize.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-helpers/esm/scrollbarSize.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ scrollbarSize)
/* harmony export */ });
/* harmony import */ var _canUseDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canUseDOM */ "./node_modules/dom-helpers/esm/canUseDOM.js");

var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (_canUseDOM__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      var scrollDiv = document.createElement('div');
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
}

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Accordion.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Accordion.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _AccordionBody__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./AccordionBody */ "./node_modules/react-bootstrap/esm/AccordionBody.js");
/* harmony import */ var _AccordionButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AccordionButton */ "./node_modules/react-bootstrap/esm/AccordionButton.js");
/* harmony import */ var _AccordionCollapse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AccordionCollapse */ "./node_modules/react-bootstrap/esm/AccordionCollapse.js");
/* harmony import */ var _AccordionContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AccordionContext */ "./node_modules/react-bootstrap/esm/AccordionContext.js");
/* harmony import */ var _AccordionHeader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AccordionHeader */ "./node_modules/react-bootstrap/esm/AccordionHeader.js");
/* harmony import */ var _AccordionItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AccordionItem */ "./node_modules/react-bootstrap/esm/AccordionItem.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";













const Accordion = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((props, ref) => {
  const {
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    activeKey,
    bsPrefix,
    className,
    onSelect,
    flush,
    alwaysOpen,
    ...controlledProps
  } = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_2__.useUncontrolled)(props, {
    activeKey: 'onSelect'
  });
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'accordion');
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    activeEventKey: activeKey,
    onSelect,
    alwaysOpen
  }), [activeKey, onSelect, alwaysOpen]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_AccordionContext__WEBPACK_IMPORTED_MODULE_5__["default"].Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Component, {
      ref: ref,
      ...controlledProps,
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix, flush && `${prefix}-flush`)
    })
  });
});
Accordion.displayName = 'Accordion';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Accordion, {
  Button: _AccordionButton__WEBPACK_IMPORTED_MODULE_6__["default"],
  Collapse: _AccordionCollapse__WEBPACK_IMPORTED_MODULE_7__["default"],
  Item: _AccordionItem__WEBPACK_IMPORTED_MODULE_8__["default"],
  Header: _AccordionHeader__WEBPACK_IMPORTED_MODULE_9__["default"],
  Body: _AccordionBody__WEBPACK_IMPORTED_MODULE_10__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AccordionBody.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AccordionBody.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _AccordionCollapse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AccordionCollapse */ "./node_modules/react-bootstrap/esm/AccordionCollapse.js");
/* harmony import */ var _AccordionItemContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AccordionItemContext */ "./node_modules/react-bootstrap/esm/AccordionItemContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";








const AccordionBody = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  bsPrefix,
  className,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'accordion-body');
  const {
    eventKey
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_AccordionItemContext__WEBPACK_IMPORTED_MODULE_4__["default"]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_AccordionCollapse__WEBPACK_IMPORTED_MODULE_5__["default"], {
    eventKey: eventKey,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
      ref: ref,
      ...props,
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix)
    })
  });
});
AccordionBody.displayName = 'AccordionBody';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccordionBody);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AccordionButton.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AccordionButton.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useAccordionButton: () => (/* binding */ useAccordionButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AccordionContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AccordionContext */ "./node_modules/react-bootstrap/esm/AccordionContext.js");
/* harmony import */ var _AccordionItemContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AccordionItemContext */ "./node_modules/react-bootstrap/esm/AccordionItemContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";








function useAccordionButton(eventKey, onClick) {
  const {
    activeEventKey,
    onSelect,
    alwaysOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_AccordionContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  return e => {
    /*
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    let eventKeyPassed = eventKey === activeEventKey ? null : eventKey;
    if (alwaysOpen) {
      if (Array.isArray(activeEventKey)) {
        if (activeEventKey.includes(eventKey)) {
          eventKeyPassed = activeEventKey.filter(k => k !== eventKey);
        } else {
          eventKeyPassed = [...activeEventKey, eventKey];
        }
      } else {
        // activeEventKey is undefined.
        eventKeyPassed = [eventKey];
      }
    }
    onSelect == null || onSelect(eventKeyPassed, e);
    onClick == null || onClick(e);
  };
}
const AccordionButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'button',
  bsPrefix,
  className,
  onClick,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'accordion-button');
  const {
    eventKey
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_AccordionItemContext__WEBPACK_IMPORTED_MODULE_5__["default"]);
  const accordionOnClick = useAccordionButton(eventKey, onClick);
  const {
    activeEventKey
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_AccordionContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  if (Component === 'button') {
    props.type = 'button';
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    onClick: accordionOnClick,
    ...props,
    "aria-expanded": Array.isArray(activeEventKey) ? activeEventKey.includes(eventKey) : eventKey === activeEventKey,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix, !(0,_AccordionContext__WEBPACK_IMPORTED_MODULE_3__.isAccordionItemSelected)(activeEventKey, eventKey) && 'collapsed')
  });
});
AccordionButton.displayName = 'AccordionButton';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccordionButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AccordionCollapse.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AccordionCollapse.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _Collapse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Collapse */ "./node_modules/react-bootstrap/esm/Collapse.js");
/* harmony import */ var _AccordionContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AccordionContext */ "./node_modules/react-bootstrap/esm/AccordionContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";








/**
 * This component accepts all of [`Collapse`'s props](/docs/utilities/transitions#collapse-1).
 */
const AccordionCollapse = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  as: Component = 'div',
  bsPrefix,
  className,
  children,
  eventKey,
  ...props
}, ref) => {
  const {
    activeEventKey
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_AccordionContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'accordion-collapse');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Collapse__WEBPACK_IMPORTED_MODULE_5__["default"], {
    ref: ref,
    in: (0,_AccordionContext__WEBPACK_IMPORTED_MODULE_3__.isAccordionItemSelected)(activeEventKey, eventKey),
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
      children: react__WEBPACK_IMPORTED_MODULE_1__.Children.only(children)
    })
  });
});
AccordionCollapse.displayName = 'AccordionCollapse';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccordionCollapse);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AccordionContext.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AccordionContext.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isAccordionItemSelected: () => (/* binding */ isAccordionItemSelected)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
"use client";


function isAccordionItemSelected(activeEventKey, eventKey) {
  return Array.isArray(activeEventKey) ? activeEventKey.includes(eventKey) : activeEventKey === eventKey;
}
const context = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({});
context.displayName = 'AccordionContext';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (context);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AccordionHeader.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AccordionHeader.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _AccordionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AccordionButton */ "./node_modules/react-bootstrap/esm/AccordionButton.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const AccordionHeader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'h2',
  'aria-controls': ariaControls,
  bsPrefix,
  className,
  children,
  onClick,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'accordion-header');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_AccordionButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      onClick: onClick,
      "aria-controls": ariaControls,
      children: children
    })
  });
});
AccordionHeader.displayName = 'AccordionHeader';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccordionHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AccordionItem.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AccordionItem.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _AccordionItemContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AccordionItemContext */ "./node_modules/react-bootstrap/esm/AccordionItemContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";







const AccordionItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  bsPrefix,
  className,
  eventKey,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'accordion-item');
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    eventKey
  }), [eventKey]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_AccordionItemContext__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
      ref: ref,
      ...props,
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix)
    })
  });
});
AccordionItem.displayName = 'AccordionItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccordionItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AccordionItemContext.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AccordionItemContext.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
"use client";


const context = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  eventKey: ''
});
context.displayName = 'AccordionItemContext';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (context);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Alert.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Alert.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _AlertHeading__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AlertHeading */ "./node_modules/react-bootstrap/esm/AlertHeading.js");
/* harmony import */ var _AlertLink__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AlertLink */ "./node_modules/react-bootstrap/esm/AlertLink.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/esm/CloseButton.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";












const Alert = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((uncontrolledProps, ref) => {
  const {
    bsPrefix,
    show = true,
    closeLabel = 'Close alert',
    closeVariant,
    className,
    children,
    variant = 'primary',
    onClose,
    dismissible,
    transition = _Fade__WEBPACK_IMPORTED_MODULE_5__["default"],
    ...props
  } = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_2__.useUncontrolled)(uncontrolledProps, {
    show: 'onClose'
  });
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__.useBootstrapPrefix)(bsPrefix, 'alert');
  const handleClose = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_3__["default"])(e => {
    if (onClose) {
      onClose(false, e);
    }
  });
  const Transition = transition === true ? _Fade__WEBPACK_IMPORTED_MODULE_5__["default"] : transition;
  const alert = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    role: "alert",
    ...(!Transition ? props : undefined),
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix, variant && `${prefix}-${variant}`, dismissible && `${prefix}-dismissible`),
    children: [dismissible && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_CloseButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
      onClick: handleClose,
      "aria-label": closeLabel,
      variant: closeVariant
    }), children]
  });
  if (!Transition) return show ? alert : null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Transition, {
    unmountOnExit: true,
    ...props,
    ref: undefined,
    in: show,
    children: alert
  });
});
Alert.displayName = 'Alert';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Alert, {
  Link: _AlertLink__WEBPACK_IMPORTED_MODULE_8__["default"],
  Heading: _AlertHeading__WEBPACK_IMPORTED_MODULE_9__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AlertHeading.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AlertHeading.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _divWithClassName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./divWithClassName */ "./node_modules/react-bootstrap/esm/divWithClassName.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const DivStyledAsH4 = (0,_divWithClassName__WEBPACK_IMPORTED_MODULE_3__["default"])('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';
const AlertHeading = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'alert-heading');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
AlertHeading.displayName = 'AlertHeading';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlertHeading);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AlertLink.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AlertLink.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/ui/Anchor */ "./node_modules/@restart/ui/esm/Anchor.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const AlertLink = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_3__["default"],
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'alert-link');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
AlertLink.displayName = 'AlertLink';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlertLink);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Anchor.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Anchor.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @restart/ui/Anchor */ "./node_modules/@restart/ui/esm/Anchor.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Badge.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Badge.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const Badge = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  bg = 'primary',
  pill = false,
  text,
  className,
  as: Component = 'span',
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'badge');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix, pill && `rounded-pill`, text && `text-${text}`, bg && `bg-${bg}`)
  });
});
Badge.displayName = 'Badge';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Badge);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Breadcrumb.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Breadcrumb.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BreadcrumbItem */ "./node_modules/react-bootstrap/esm/BreadcrumbItem.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const Breadcrumb = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  listProps = {},
  children,
  label = 'breadcrumb',
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'nav',
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'breadcrumb');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    "aria-label": label,
    className: className,
    ref: ref,
    ...props,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ol", {
      ...listProps,
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(prefix, listProps == null ? void 0 : listProps.className),
      children: children
    })
  });
});
Breadcrumb.displayName = 'Breadcrumb';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Breadcrumb, {
  Item: _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_4__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/BreadcrumbItem.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/BreadcrumbItem.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/ui/Anchor */ "./node_modules/@restart/ui/esm/Anchor.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const BreadcrumbItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  active = false,
  children,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'li',
  linkAs: LinkComponent = _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_3__["default"],
  linkProps = {},
  href,
  title,
  target,
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'breadcrumb-item');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(prefix, className, {
      active
    }),
    "aria-current": active ? 'page' : undefined,
    children: active ? children : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(LinkComponent, {
      ...linkProps,
      href: href,
      title: title,
      target: target,
      children: children
    })
  });
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BreadcrumbItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Button.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Button.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/ui/Button */ "./node_modules/@restart/ui/esm/Button.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  as,
  bsPrefix,
  variant = 'primary',
  size,
  active = false,
  disabled = false,
  className,
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'btn');
  const [buttonProps, {
    tagName
  }] = (0,_restart_ui_Button__WEBPACK_IMPORTED_MODULE_4__.useButtonProps)({
    tagName: as,
    disabled,
    ...props
  });
  const Component = tagName;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ...buttonProps,
    ...props,
    ref: ref,
    disabled: disabled,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix, active && 'active', variant && `${prefix}-${variant}`, size && `${prefix}-${size}`, props.href && disabled && 'disabled')
  });
});
Button.displayName = 'Button';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ButtonGroup.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ButtonGroup.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const ButtonGroup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  size,
  vertical = false,
  className,
  role = 'group',
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...rest
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'btn-group');
  let baseClass = prefix;
  if (vertical) baseClass = `${prefix}-vertical`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ...rest,
    ref: ref,
    role: role,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, baseClass, size && `${prefix}-${size}`)
  });
});
ButtonGroup.displayName = 'ButtonGroup';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ButtonToolbar.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ButtonToolbar.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const ButtonToolbar = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  role = 'toolbar',
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'btn-toolbar');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    ...props,
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix),
    role: role
  });
});
ButtonToolbar.displayName = 'ButtonToolbar';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonToolbar);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Card.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Card.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _CardBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CardBody */ "./node_modules/react-bootstrap/esm/CardBody.js");
/* harmony import */ var _CardFooter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./CardFooter */ "./node_modules/react-bootstrap/esm/CardFooter.js");
/* harmony import */ var _CardHeader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CardHeader */ "./node_modules/react-bootstrap/esm/CardHeader.js");
/* harmony import */ var _CardImg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CardImg */ "./node_modules/react-bootstrap/esm/CardImg.js");
/* harmony import */ var _CardImgOverlay__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./CardImgOverlay */ "./node_modules/react-bootstrap/esm/CardImgOverlay.js");
/* harmony import */ var _CardLink__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CardLink */ "./node_modules/react-bootstrap/esm/CardLink.js");
/* harmony import */ var _CardSubtitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CardSubtitle */ "./node_modules/react-bootstrap/esm/CardSubtitle.js");
/* harmony import */ var _CardText__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CardText */ "./node_modules/react-bootstrap/esm/CardText.js");
/* harmony import */ var _CardTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CardTitle */ "./node_modules/react-bootstrap/esm/CardTitle.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";














const Card = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  bg,
  text,
  border,
  body = false,
  children,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'card');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix, bg && `bg-${bg}`, text && `text-${text}`, border && `border-${border}`),
    children: body ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_CardBody__WEBPACK_IMPORTED_MODULE_4__["default"], {
      children: children
    }) : children
  });
});
Card.displayName = 'Card';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Card, {
  Img: _CardImg__WEBPACK_IMPORTED_MODULE_5__["default"],
  Title: _CardTitle__WEBPACK_IMPORTED_MODULE_6__["default"],
  Subtitle: _CardSubtitle__WEBPACK_IMPORTED_MODULE_7__["default"],
  Body: _CardBody__WEBPACK_IMPORTED_MODULE_4__["default"],
  Link: _CardLink__WEBPACK_IMPORTED_MODULE_8__["default"],
  Text: _CardText__WEBPACK_IMPORTED_MODULE_9__["default"],
  Header: _CardHeader__WEBPACK_IMPORTED_MODULE_10__["default"],
  Footer: _CardFooter__WEBPACK_IMPORTED_MODULE_11__["default"],
  ImgOverlay: _CardImgOverlay__WEBPACK_IMPORTED_MODULE_12__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardBody.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardBody.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const CardBody = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'card-body');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
CardBody.displayName = 'CardBody';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardBody);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardFooter.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardFooter.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const CardFooter = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'card-footer');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
CardFooter.displayName = 'CardFooter';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardFooter);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardGroup.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardGroup.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const CardGroup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'card-group');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
CardGroup.displayName = 'CardGroup';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardHeader.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardHeader.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _CardHeaderContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CardHeaderContext */ "./node_modules/react-bootstrap/esm/CardHeaderContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";







const CardHeader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'card-header');
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    cardHeaderBsPrefix: prefix
  }), [prefix]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_CardHeaderContext__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
      ref: ref,
      ...props,
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix)
    })
  });
});
CardHeader.displayName = 'CardHeader';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardHeaderContext.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardHeaderContext.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
"use client";


const context = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
context.displayName = 'CardHeaderContext';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (context);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardImg.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardImg.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const CardImg = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
({
  bsPrefix,
  className,
  variant,
  as: Component = 'img',
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'card-img');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(variant ? `${prefix}-${variant}` : prefix, className),
    ...props
  });
});
CardImg.displayName = 'CardImg';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardImg);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardImgOverlay.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardImgOverlay.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const CardImgOverlay = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'card-img-overlay');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
CardImgOverlay.displayName = 'CardImgOverlay';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardImgOverlay);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardLink.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardLink.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const CardLink = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'a',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'card-link');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
CardLink.displayName = 'CardLink';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardLink);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardSubtitle.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardSubtitle.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _divWithClassName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./divWithClassName */ "./node_modules/react-bootstrap/esm/divWithClassName.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const DivStyledAsH6 = (0,_divWithClassName__WEBPACK_IMPORTED_MODULE_3__["default"])('h6');
const CardSubtitle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH6,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'card-subtitle');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
CardSubtitle.displayName = 'CardSubtitle';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardSubtitle);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardText.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardText.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const CardText = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'p',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'card-text');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
CardText.displayName = 'CardText';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardText);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardTitle.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardTitle.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _divWithClassName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./divWithClassName */ "./node_modules/react-bootstrap/esm/divWithClassName.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const DivStyledAsH5 = (0,_divWithClassName__WEBPACK_IMPORTED_MODULE_3__["default"])('h5');
const CardTitle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH5,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'card-title');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
CardTitle.displayName = 'CardTitle';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardTitle);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Carousel.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Carousel.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _restart_hooks_useUpdateEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @restart/hooks/useUpdateEffect */ "./node_modules/@restart/hooks/esm/useUpdateEffect.js");
/* harmony import */ var _restart_hooks_useCommittedRef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/hooks/useCommittedRef */ "./node_modules/@restart/hooks/esm/useCommittedRef.js");
/* harmony import */ var _restart_hooks_useTimeout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/hooks/useTimeout */ "./node_modules/@restart/hooks/esm/useTimeout.js");
/* harmony import */ var _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @restart/ui/Anchor */ "./node_modules/@restart/ui/esm/Anchor.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _CarouselCaption__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./CarouselCaption */ "./node_modules/react-bootstrap/esm/CarouselCaption.js");
/* harmony import */ var _CarouselItem__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CarouselItem */ "./node_modules/react-bootstrap/esm/CarouselItem.js");
/* harmony import */ var _ElementChildren__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ElementChildren */ "./node_modules/react-bootstrap/esm/ElementChildren.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _transitionEndListener__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./transitionEndListener */ "./node_modules/react-bootstrap/esm/transitionEndListener.js");
/* harmony import */ var _triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./triggerBrowserReflow */ "./node_modules/react-bootstrap/esm/triggerBrowserReflow.js");
/* harmony import */ var _TransitionWrapper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./TransitionWrapper */ "./node_modules/react-bootstrap/esm/TransitionWrapper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";




















const SWIPE_THRESHOLD = 40;
function isVisible(element) {
  if (!element || !element.style || !element.parentNode || !element.parentNode.style) {
    return false;
  }
  const elementStyle = getComputedStyle(element);
  return elementStyle.display !== 'none' && elementStyle.visibility !== 'hidden' && getComputedStyle(element.parentNode).display !== 'none';
}
const Carousel = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.forwardRef(({
  defaultActiveIndex = 0,
  ...uncontrolledProps
}, ref) => {
  const {
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    bsPrefix,
    slide = true,
    fade = false,
    controls = true,
    indicators = true,
    indicatorLabels = [],
    activeIndex,
    onSelect,
    onSlide,
    onSlid,
    interval = 5000,
    keyboard = true,
    onKeyDown,
    pause = 'hover',
    onMouseOver,
    onMouseOut,
    wrap = true,
    touch = true,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    prevIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
      "aria-hidden": "true",
      className: "carousel-control-prev-icon"
    }),
    prevLabel = 'Previous',
    nextIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
      "aria-hidden": "true",
      className: "carousel-control-next-icon"
    }),
    nextLabel = 'Next',
    variant,
    className,
    children,
    ...props
  } = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_6__.useUncontrolled)({
    defaultActiveIndex,
    ...uncontrolledProps
  }, {
    activeIndex: 'onSelect'
  });
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_8__.useBootstrapPrefix)(bsPrefix, 'carousel');
  const isRTL = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_8__.useIsRTL)();
  const nextDirectionRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(null);
  const [direction, setDirection] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)('next');
  const [paused, setPaused] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
  const [isSliding, setIsSliding] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
  const [renderedActiveIndex, setRenderedActiveIndex] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(activeIndex || 0);
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    if (!isSliding && activeIndex !== renderedActiveIndex) {
      if (nextDirectionRef.current) {
        setDirection(nextDirectionRef.current);
      } else {
        setDirection((activeIndex || 0) > renderedActiveIndex ? 'next' : 'prev');
      }
      if (slide) {
        setIsSliding(true);
      }
      setRenderedActiveIndex(activeIndex || 0);
    }
  }, [activeIndex, isSliding, renderedActiveIndex, slide]);
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    if (nextDirectionRef.current) {
      nextDirectionRef.current = null;
    }
  });
  let numChildren = 0;
  let activeChildInterval;

  // Iterate to grab all of the children's interval values
  // (and count them, too)
  (0,_ElementChildren__WEBPACK_IMPORTED_MODULE_9__.forEach)(children, (child, index) => {
    ++numChildren;
    if (index === activeIndex) {
      activeChildInterval = child.props.interval;
    }
  });
  const activeChildIntervalRef = (0,_restart_hooks_useCommittedRef__WEBPACK_IMPORTED_MODULE_2__["default"])(activeChildInterval);
  const prev = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(event => {
    if (isSliding) {
      return;
    }
    let nextActiveIndex = renderedActiveIndex - 1;
    if (nextActiveIndex < 0) {
      if (!wrap) {
        return;
      }
      nextActiveIndex = numChildren - 1;
    }
    nextDirectionRef.current = 'prev';
    onSelect == null || onSelect(nextActiveIndex, event);
  }, [isSliding, renderedActiveIndex, onSelect, wrap, numChildren]);

  // This is used in the setInterval, so it should not invalidate.
  const next = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_0__["default"])(event => {
    if (isSliding) {
      return;
    }
    let nextActiveIndex = renderedActiveIndex + 1;
    if (nextActiveIndex >= numChildren) {
      if (!wrap) {
        return;
      }
      nextActiveIndex = 0;
    }
    nextDirectionRef.current = 'next';
    onSelect == null || onSelect(nextActiveIndex, event);
  });
  const elementRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useImperativeHandle)(ref, () => ({
    element: elementRef.current,
    prev,
    next
  }));

  // This is used in the setInterval, so it should not invalidate.
  const nextWhenVisible = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_0__["default"])(() => {
    if (!document.hidden && isVisible(elementRef.current)) {
      if (isRTL) {
        prev();
      } else {
        next();
      }
    }
  });
  const slideDirection = direction === 'next' ? 'start' : 'end';
  (0,_restart_hooks_useUpdateEffect__WEBPACK_IMPORTED_MODULE_1__["default"])(() => {
    if (slide) {
      // These callbacks will be handled by the <Transition> callbacks.
      return;
    }
    onSlide == null || onSlide(renderedActiveIndex, slideDirection);
    onSlid == null || onSlid(renderedActiveIndex, slideDirection);
  }, [renderedActiveIndex]);
  const orderClassName = `${prefix}-item-${direction}`;
  const directionalClassName = `${prefix}-item-${slideDirection}`;
  const handleEnter = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(node => {
    (0,_triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_10__["default"])(node);
    onSlide == null || onSlide(renderedActiveIndex, slideDirection);
  }, [onSlide, renderedActiveIndex, slideDirection]);
  const handleEntered = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(() => {
    setIsSliding(false);
    onSlid == null || onSlid(renderedActiveIndex, slideDirection);
  }, [onSlid, renderedActiveIndex, slideDirection]);
  const handleKeyDown = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(event => {
    if (keyboard && !/input|textarea/i.test(event.target.tagName)) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (isRTL) {
            next(event);
          } else {
            prev(event);
          }
          return;
        case 'ArrowRight':
          event.preventDefault();
          if (isRTL) {
            prev(event);
          } else {
            next(event);
          }
          return;
        default:
      }
    }
    onKeyDown == null || onKeyDown(event);
  }, [keyboard, onKeyDown, prev, next, isRTL]);
  const handleMouseOver = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(event => {
    if (pause === 'hover') {
      setPaused(true);
    }
    onMouseOver == null || onMouseOver(event);
  }, [pause, onMouseOver]);
  const handleMouseOut = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(event => {
    setPaused(false);
    onMouseOut == null || onMouseOut(event);
  }, [onMouseOut]);
  const touchStartXRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(0);
  const touchDeltaXRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(0);
  const touchUnpauseTimeout = (0,_restart_hooks_useTimeout__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const handleTouchStart = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(event => {
    touchStartXRef.current = event.touches[0].clientX;
    touchDeltaXRef.current = 0;
    if (pause === 'hover') {
      setPaused(true);
    }
    onTouchStart == null || onTouchStart(event);
  }, [pause, onTouchStart]);
  const handleTouchMove = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(event => {
    if (event.touches && event.touches.length > 1) {
      touchDeltaXRef.current = 0;
    } else {
      touchDeltaXRef.current = event.touches[0].clientX - touchStartXRef.current;
    }
    onTouchMove == null || onTouchMove(event);
  }, [onTouchMove]);
  const handleTouchEnd = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(event => {
    if (touch) {
      const touchDeltaX = touchDeltaXRef.current;
      if (Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
        if (touchDeltaX > 0) {
          prev(event);
        } else {
          next(event);
        }
      }
    }
    if (pause === 'hover') {
      touchUnpauseTimeout.set(() => {
        setPaused(false);
      }, interval || undefined);
    }
    onTouchEnd == null || onTouchEnd(event);
  }, [touch, pause, prev, next, touchUnpauseTimeout, interval, onTouchEnd]);
  const shouldPlay = interval != null && !paused && !isSliding;
  const intervalHandleRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    var _ref, _activeChildIntervalR;
    if (!shouldPlay) {
      return undefined;
    }
    const nextFunc = isRTL ? prev : next;
    intervalHandleRef.current = window.setInterval(document.visibilityState ? nextWhenVisible : nextFunc, (_ref = (_activeChildIntervalR = activeChildIntervalRef.current) != null ? _activeChildIntervalR : interval) != null ? _ref : undefined);
    return () => {
      if (intervalHandleRef.current !== null) {
        clearInterval(intervalHandleRef.current);
      }
    };
  }, [shouldPlay, prev, next, activeChildIntervalRef, interval, nextWhenVisible, isRTL]);
  const indicatorOnClicks = (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => indicators && Array.from({
    length: numChildren
  }, (_, index) => event => {
    onSelect == null || onSelect(index, event);
  }), [indicators, numChildren, onSelect]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(Component, {
    ref: elementRef,
    ...props,
    onKeyDown: handleKeyDown,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(className, prefix, slide && 'slide', fade && `${prefix}-fade`, variant && `${prefix}-${variant}`),
    children: [indicators && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: `${prefix}-indicators`,
      children: (0,_ElementChildren__WEBPACK_IMPORTED_MODULE_9__.map)(children, (_, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
        type: "button",
        "data-bs-target": "" // Bootstrap requires this in their css.
        ,
        "aria-label": indicatorLabels != null && indicatorLabels.length ? indicatorLabels[index] : `Slide ${index + 1}`,
        className: index === renderedActiveIndex ? 'active' : undefined,
        onClick: indicatorOnClicks ? indicatorOnClicks[index] : undefined,
        "aria-current": index === renderedActiveIndex
      }, index))
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: `${prefix}-inner`,
      children: (0,_ElementChildren__WEBPACK_IMPORTED_MODULE_9__.map)(children, (child, index) => {
        const isActive = index === renderedActiveIndex;
        return slide ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_TransitionWrapper__WEBPACK_IMPORTED_MODULE_11__["default"], {
          in: isActive,
          onEnter: isActive ? handleEnter : undefined,
          onEntered: isActive ? handleEntered : undefined,
          addEndListener: _transitionEndListener__WEBPACK_IMPORTED_MODULE_12__["default"],
          children: (status, innerProps) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.cloneElement(child, {
            ...innerProps,
            className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(child.props.className, isActive && status !== 'entered' && orderClassName, (status === 'entered' || status === 'exiting') && 'active', (status === 'entering' || status === 'exiting') && directionalClassName)
          })
        }) : ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.cloneElement(child, {
          className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(child.props.className, isActive && 'active')
        }));
      })
    }), controls && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
      children: [(wrap || activeIndex !== 0) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_13__["default"], {
        className: `${prefix}-control-prev`,
        onClick: prev,
        children: [prevIcon, prevLabel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
          className: "visually-hidden",
          children: prevLabel
        })]
      }), (wrap || activeIndex !== numChildren - 1) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_13__["default"], {
        className: `${prefix}-control-next`,
        onClick: next,
        children: [nextIcon, nextLabel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
          className: "visually-hidden",
          children: nextLabel
        })]
      })]
    })]
  });
});
Carousel.displayName = 'Carousel';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Carousel, {
  Caption: _CarouselCaption__WEBPACK_IMPORTED_MODULE_14__["default"],
  Item: _CarouselItem__WEBPACK_IMPORTED_MODULE_15__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CarouselCaption.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CarouselCaption.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const CarouselCaption = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'carousel-caption');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
CarouselCaption.displayName = 'CarouselCaption';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarouselCaption);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CarouselItem.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CarouselItem.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const CarouselItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  bsPrefix,
  className,
  ...props
}, ref) => {
  const finalClassName = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'carousel-item'));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    ...props,
    className: finalClassName
  });
});
CarouselItem.displayName = 'CarouselItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarouselItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Dropdown.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Dropdown.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_Dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @restart/ui/Dropdown */ "./node_modules/@restart/ui/esm/Dropdown.js");
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _DropdownContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DropdownContext */ "./node_modules/react-bootstrap/esm/DropdownContext.js");
/* harmony import */ var _DropdownDivider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./DropdownDivider */ "./node_modules/react-bootstrap/esm/DropdownDivider.js");
/* harmony import */ var _DropdownHeader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./DropdownHeader */ "./node_modules/react-bootstrap/esm/DropdownHeader.js");
/* harmony import */ var _DropdownItem__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./DropdownItem */ "./node_modules/react-bootstrap/esm/DropdownItem.js");
/* harmony import */ var _DropdownItemText__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./DropdownItemText */ "./node_modules/react-bootstrap/esm/DropdownItemText.js");
/* harmony import */ var _DropdownMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DropdownMenu */ "./node_modules/react-bootstrap/esm/DropdownMenu.js");
/* harmony import */ var _DropdownToggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DropdownToggle */ "./node_modules/react-bootstrap/esm/DropdownToggle.js");
/* harmony import */ var _InputGroupContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InputGroupContext */ "./node_modules/react-bootstrap/esm/InputGroupContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";


















const Dropdown = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((pProps, ref) => {
  const {
    bsPrefix,
    drop = 'down',
    show,
    className,
    align = 'start',
    onSelect,
    onToggle,
    focusFirstItemOnShow,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    navbar: _4,
    autoClose = true,
    ...props
  } = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_2__.useUncontrolled)(pProps, {
    show: 'onToggle'
  });
  const isInputGroup = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_InputGroupContext__WEBPACK_IMPORTED_MODULE_5__["default"]);
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__.useBootstrapPrefix)(bsPrefix, 'dropdown');
  const isRTL = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__.useIsRTL)();
  const isClosingPermitted = source => {
    // autoClose=false only permits close on button click
    if (autoClose === false) return source === 'click';

    // autoClose=inside doesn't permit close on rootClose
    if (autoClose === 'inside') return source !== 'rootClose';

    // autoClose=outside doesn't permit close on select
    if (autoClose === 'outside') return source !== 'select';
    return true;
  };
  const handleToggle = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_3__["default"])((nextShow, meta) => {
    var _meta$originalEvent;
    /** Checking if target of event is ToggleButton,
     * if it is then nullify mousedown event
     */
    const isToggleButton = (_meta$originalEvent = meta.originalEvent) == null || (_meta$originalEvent = _meta$originalEvent.target) == null ? void 0 : _meta$originalEvent.classList.contains('dropdown-toggle');
    if (isToggleButton && meta.source === 'mousedown') {
      return;
    }
    if (meta.originalEvent.currentTarget === document && (meta.source !== 'keydown' || meta.originalEvent.key === 'Escape')) meta.source = 'rootClose';
    if (isClosingPermitted(meta.source)) onToggle == null || onToggle(nextShow, meta);
  });
  const alignEnd = align === 'end';
  const placement = (0,_DropdownMenu__WEBPACK_IMPORTED_MODULE_7__.getDropdownMenuPlacement)(alignEnd, drop, isRTL);
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    align,
    drop,
    isRTL
  }), [align, drop, isRTL]);
  const directionClasses = {
    down: prefix,
    'down-centered': `${prefix}-center`,
    up: 'dropup',
    'up-centered': 'dropup-center dropup',
    end: 'dropend',
    start: 'dropstart'
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_DropdownContext__WEBPACK_IMPORTED_MODULE_8__["default"].Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_restart_ui_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"], {
      placement: placement,
      show: show,
      onSelect: onSelect,
      onToggle: handleToggle,
      focusFirstItemOnShow: focusFirstItemOnShow,
      itemSelector: `.${prefix}-item:not(.disabled):not(:disabled)`,
      children: isInputGroup ? props.children : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Component, {
        ...props,
        ref: ref,
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, show && 'show', directionClasses[drop])
      })
    })
  });
});
Dropdown.displayName = 'Dropdown';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Dropdown, {
  Toggle: _DropdownToggle__WEBPACK_IMPORTED_MODULE_10__["default"],
  Menu: _DropdownMenu__WEBPACK_IMPORTED_MODULE_7__["default"],
  Item: _DropdownItem__WEBPACK_IMPORTED_MODULE_11__["default"],
  ItemText: _DropdownItemText__WEBPACK_IMPORTED_MODULE_12__["default"],
  Divider: _DropdownDivider__WEBPACK_IMPORTED_MODULE_13__["default"],
  Header: _DropdownHeader__WEBPACK_IMPORTED_MODULE_14__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/DropdownButton.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/DropdownButton.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/esm/Dropdown.js");
/* harmony import */ var _DropdownToggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DropdownToggle */ "./node_modules/react-bootstrap/esm/DropdownToggle.js");
/* harmony import */ var _DropdownMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DropdownMenu */ "./node_modules/react-bootstrap/esm/DropdownMenu.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./node_modules/react-bootstrap/esm/types.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








const propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string}
   */
  id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** An `href` passed to the Toggle component */
  href: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** An `onClick` handler passed to the Toggle component */
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  /** The content of the non-toggle Button.  */
  title: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node).isRequired,
  /** Disables both Buttons  */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  /**
   * Aligns the dropdown menu.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: _types__WEBPACK_IMPORTED_MODULE_3__.alignPropType,
  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  rootCloseEvent: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /**
   * Menu color variant.
   *
   * Omitting this will use the default light color.
   */
  menuVariant: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf(['dark']),
  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   *
   */
  flip: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  /** @ignore */
  bsPrefix: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** @ignore */
  variant: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** @ignore */
  size: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
};

/**
 * A convenience component for simple or general use dropdowns. Renders a `Button` toggle and all `children`
 * are passed directly to the default `Dropdown.Menu`. This component accepts all of
 * [`Dropdown`'s props](#dropdown-props).
 *
 * _All unknown props are passed through to the `Dropdown` component._ Only
 * the Button `variant`, `size` and `bsPrefix` props are passed to the toggle,
 * along with menu-related props are passed to the `Dropdown.Menu`
 */
const DropdownButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  title,
  children,
  bsPrefix,
  rootCloseEvent,
  variant,
  size,
  menuRole,
  renderMenuOnMount,
  disabled,
  href,
  id,
  menuVariant,
  flip,
  ...props
}, ref) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"], {
  ref: ref,
  ...props,
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_DropdownToggle__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: id,
    href: href,
    size: size,
    variant: variant,
    disabled: disabled,
    childBsPrefix: bsPrefix,
    children: title
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_DropdownMenu__WEBPACK_IMPORTED_MODULE_6__["default"], {
    role: menuRole,
    renderOnMount: renderMenuOnMount,
    rootCloseEvent: rootCloseEvent,
    variant: menuVariant,
    flip: flip,
    children: children
  })]
}));
DropdownButton.displayName = 'DropdownButton';
DropdownButton.propTypes = propTypes;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/DropdownContext.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/DropdownContext.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
"use client";


const DropdownContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({});
DropdownContext.displayName = 'DropdownContext';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/DropdownDivider.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/DropdownDivider.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const DropdownDivider = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'hr',
  role = 'separator',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'dropdown-divider');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    role: role,
    ...props
  });
});
DropdownDivider.displayName = 'DropdownDivider';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownDivider);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/DropdownHeader.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/DropdownHeader.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const DropdownHeader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  role = 'heading',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'dropdown-header');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    role: role,
    ...props
  });
});
DropdownHeader.displayName = 'DropdownHeader';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/DropdownItem.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/DropdownItem.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_DropdownItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @restart/ui/DropdownItem */ "./node_modules/@restart/ui/esm/DropdownItem.js");
/* harmony import */ var _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/ui/Anchor */ "./node_modules/@restart/ui/esm/Anchor.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";







const DropdownItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  eventKey,
  disabled = false,
  onClick,
  active,
  as: Component = _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_3__["default"],
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'dropdown-item');
  const [dropdownItemProps, meta] = (0,_restart_ui_DropdownItem__WEBPACK_IMPORTED_MODULE_5__.useDropdownItem)({
    key: eventKey,
    href: props.href,
    disabled,
    onClick,
    active
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ...props,
    ...dropdownItemProps,
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix, meta.isActive && 'active', disabled && 'disabled')
  });
});
DropdownItem.displayName = 'DropdownItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/DropdownItemText.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/DropdownItemText.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const DropdownItemText = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'span',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'dropdown-item-text');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
DropdownItemText.displayName = 'DropdownItemText';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownItemText);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/DropdownMenu.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/DropdownMenu.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getDropdownMenuPlacement: () => (/* binding */ getDropdownMenuPlacement)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_DropdownMenu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @restart/ui/DropdownMenu */ "./node_modules/@restart/ui/esm/DropdownMenu.js");
/* harmony import */ var _restart_hooks_useIsomorphicEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/hooks/useIsomorphicEffect */ "./node_modules/@restart/hooks/esm/useIsomorphicEffect.js");
/* harmony import */ var _restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/hooks/useMergedRefs */ "./node_modules/@restart/hooks/esm/useMergedRefs.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _DropdownContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DropdownContext */ "./node_modules/react-bootstrap/esm/DropdownContext.js");
/* harmony import */ var _InputGroupContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./InputGroupContext */ "./node_modules/react-bootstrap/esm/InputGroupContext.js");
/* harmony import */ var _NavbarContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NavbarContext */ "./node_modules/react-bootstrap/esm/NavbarContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _useWrappedRefWithWarning__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./useWrappedRefWithWarning */ "./node_modules/react-bootstrap/esm/useWrappedRefWithWarning.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";















function getDropdownMenuPlacement(alignEnd, dropDirection, isRTL) {
  const topStart = isRTL ? 'top-end' : 'top-start';
  const topEnd = isRTL ? 'top-start' : 'top-end';
  const bottomStart = isRTL ? 'bottom-end' : 'bottom-start';
  const bottomEnd = isRTL ? 'bottom-start' : 'bottom-end';
  const leftStart = isRTL ? 'right-start' : 'left-start';
  const leftEnd = isRTL ? 'right-end' : 'left-end';
  const rightStart = isRTL ? 'left-start' : 'right-start';
  const rightEnd = isRTL ? 'left-end' : 'right-end';
  let placement = alignEnd ? bottomEnd : bottomStart;
  if (dropDirection === 'up') placement = alignEnd ? topEnd : topStart;else if (dropDirection === 'end') placement = alignEnd ? rightEnd : rightStart;else if (dropDirection === 'start') placement = alignEnd ? leftEnd : leftStart;else if (dropDirection === 'down-centered') placement = 'bottom';else if (dropDirection === 'up-centered') placement = 'top';
  return placement;
}
const DropdownMenu = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  align,
  rootCloseEvent,
  flip = true,
  show: showProps,
  renderOnMount,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  popperConfig,
  variant,
  ...props
}, ref) => {
  let alignEnd = false;
  const isNavbar = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_NavbarContext__WEBPACK_IMPORTED_MODULE_6__["default"]);
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_7__.useBootstrapPrefix)(bsPrefix, 'dropdown-menu');
  const {
    align: contextAlign,
    drop,
    isRTL
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_DropdownContext__WEBPACK_IMPORTED_MODULE_8__["default"]);
  align = align || contextAlign;
  const isInputGroup = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_InputGroupContext__WEBPACK_IMPORTED_MODULE_9__["default"]);
  const alignClasses = [];
  if (align) {
    if (typeof align === 'object') {
      const keys = Object.keys(align);
       true ? warning__WEBPACK_IMPORTED_MODULE_4___default()(keys.length === 1, 'There should only be 1 breakpoint when passing an object to `align`') : 0;
      if (keys.length) {
        const brkPoint = keys[0];
        const direction = align[brkPoint];

        // .dropdown-menu-end is required for responsively aligning
        // left in addition to align left classes.
        alignEnd = direction === 'start';
        alignClasses.push(`${prefix}-${brkPoint}-${direction}`);
      }
    } else if (align === 'end') {
      alignEnd = true;
    }
  }
  const placement = getDropdownMenuPlacement(alignEnd, drop, isRTL);
  const [menuProps, {
    hasShown,
    popper,
    show,
    toggle
  }] = (0,_restart_ui_DropdownMenu__WEBPACK_IMPORTED_MODULE_10__.useDropdownMenu)({
    flip,
    rootCloseEvent,
    show: showProps,
    usePopper: !isNavbar && alignClasses.length === 0,
    offset: [0, 2],
    popperConfig,
    placement
  });
  menuProps.ref = (0,_restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_useWrappedRefWithWarning__WEBPACK_IMPORTED_MODULE_11__["default"])(ref, 'DropdownMenu'), menuProps.ref);
  (0,_restart_hooks_useIsomorphicEffect__WEBPACK_IMPORTED_MODULE_2__["default"])(() => {
    // Popper's initial position for the menu is incorrect when
    // renderOnMount=true. Need to call update() to correct it.
    if (show) popper == null || popper.update();
  }, [show]);
  if (!hasShown && !renderOnMount && !isInputGroup) return null;

  // For custom components provide additional, non-DOM, props;
  if (typeof Component !== 'string') {
    menuProps.show = show;
    menuProps.close = () => toggle == null ? void 0 : toggle(false);
    menuProps.align = align;
  }
  let style = props.style;
  if (popper != null && popper.placement) {
    // we don't need the default popper style,
    // menus are display: none when not shown.
    style = {
      ...props.style,
      ...menuProps.style
    };
    props['x-placement'] = popper.placement;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Component, {
    ...props,
    ...menuProps,
    style: style
    // Bootstrap css requires this data attrib to style responsive menus.
    ,
    ...((alignClasses.length || isNavbar) && {
      'data-bs-popper': 'static'
    }),
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix, show && 'show', alignEnd && `${prefix}-end`, variant && `${prefix}-${variant}`, ...alignClasses)
  });
});
DropdownMenu.displayName = 'DropdownMenu';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownMenu);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/DropdownToggle.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/DropdownToggle.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @restart/hooks/useMergedRefs */ "./node_modules/@restart/hooks/esm/useMergedRefs.js");
/* harmony import */ var _restart_ui_DropdownContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @restart/ui/DropdownContext */ "./node_modules/@restart/ui/esm/DropdownContext.js");
/* harmony import */ var _restart_ui_DropdownToggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @restart/ui/DropdownToggle */ "./node_modules/@restart/ui/esm/DropdownToggle.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _useWrappedRefWithWarning__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useWrappedRefWithWarning */ "./node_modules/react-bootstrap/esm/useWrappedRefWithWarning.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";











const DropdownToggle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(({
  bsPrefix,
  split,
  className,
  childBsPrefix,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = _Button__WEBPACK_IMPORTED_MODULE_4__["default"],
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.useBootstrapPrefix)(bsPrefix, 'dropdown-toggle');
  const dropdownContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_restart_ui_DropdownContext__WEBPACK_IMPORTED_MODULE_6__["default"]);
  if (childBsPrefix !== undefined) {
    props.bsPrefix = childBsPrefix;
  }
  const [toggleProps] = (0,_restart_ui_DropdownToggle__WEBPACK_IMPORTED_MODULE_7__.useDropdownToggle)();
  toggleProps.ref = (0,_restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_0__["default"])(toggleProps.ref, (0,_useWrappedRefWithWarning__WEBPACK_IMPORTED_MODULE_8__["default"])(ref, 'DropdownToggle'));

  // This intentionally forwards size and variant (if set) to the
  // underlying component, to allow it to render size and style variants.
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Component, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, prefix, split && `${prefix}-split`, (dropdownContext == null ? void 0 : dropdownContext.show) && 'show'),
    ...toggleProps,
    ...props
  });
});
DropdownToggle.displayName = 'DropdownToggle';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownToggle);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Figure.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Figure.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FigureImage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FigureImage */ "./node_modules/react-bootstrap/esm/FigureImage.js");
/* harmony import */ var _FigureCaption__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FigureCaption */ "./node_modules/react-bootstrap/esm/FigureCaption.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";







const Figure = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'figure',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'figure');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
Figure.displayName = 'Figure';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Figure, {
  Image: _FigureImage__WEBPACK_IMPORTED_MODULE_4__["default"],
  Caption: _FigureCaption__WEBPACK_IMPORTED_MODULE_5__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/FigureCaption.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/FigureCaption.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const FigureCaption = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'figcaption',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'figure-caption');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
FigureCaption.displayName = 'FigureCaption';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FigureCaption);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/FigureImage.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/FigureImage.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Image */ "./node_modules/react-bootstrap/esm/Image.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




const FigureImage = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  className,
  fluid = true,
  ...props
}, ref) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Image__WEBPACK_IMPORTED_MODULE_3__["default"], {
  ref: ref,
  ...props,
  fluid: fluid,
  className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, 'figure-img')
}));
FigureImage.displayName = 'FigureImage';
FigureImage.propTypes = _Image__WEBPACK_IMPORTED_MODULE_3__.propTypes;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FigureImage);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Image.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Image.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   propTypes: () => (/* binding */ propTypes)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const propTypes = {
  /**
   * @default 'img'
   */
  bsPrefix: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  /**
   * Sets image as fluid image.
   */
  fluid: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  /**
   * Sets image shape as rounded.
   */
  rounded: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  /**
   * Sets image shape as circle.
   */
  roundedCircle: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool)
};
const Image = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  fluid = false,
  rounded = false,
  roundedCircle = false,
  thumbnail = false,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'img');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
    // eslint-disable-line jsx-a11y/alt-text
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, fluid && `${bsPrefix}-fluid`, rounded && `rounded`, roundedCircle && `rounded-circle`, thumbnail && `${bsPrefix}-thumbnail`)
  });
});
Image.displayName = 'Image';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Image);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/InputGroup.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/InputGroup.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _FormCheckInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FormCheckInput */ "./node_modules/react-bootstrap/esm/FormCheckInput.js");
/* harmony import */ var _InputGroupContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./InputGroupContext */ "./node_modules/react-bootstrap/esm/InputGroupContext.js");
/* harmony import */ var _InputGroupText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InputGroupText */ "./node_modules/react-bootstrap/esm/InputGroupText.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";









const InputGroupCheckbox = props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_InputGroupText__WEBPACK_IMPORTED_MODULE_3__["default"], {
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_FormCheckInput__WEBPACK_IMPORTED_MODULE_4__["default"], {
    type: "checkbox",
    ...props
  })
});
const InputGroupRadio = props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_InputGroupText__WEBPACK_IMPORTED_MODULE_3__["default"], {
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_FormCheckInput__WEBPACK_IMPORTED_MODULE_4__["default"], {
    type: "radio",
    ...props
  })
});
const InputGroup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  size,
  hasValidation,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.useBootstrapPrefix)(bsPrefix, 'input-group');

  // Intentionally an empty object. Used in detecting if a dropdown
  // exists under an input group.
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({}), []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_InputGroupContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
      ref: ref,
      ...props,
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix, size && `${bsPrefix}-${size}`, hasValidation && 'has-validation')
    })
  });
});
InputGroup.displayName = 'InputGroup';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(InputGroup, {
  Text: _InputGroupText__WEBPACK_IMPORTED_MODULE_3__["default"],
  Radio: InputGroupRadio,
  Checkbox: InputGroupCheckbox
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/InputGroupContext.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/InputGroupContext.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
"use client";


const context = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
context.displayName = 'InputGroupContext';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (context);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/InputGroupText.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/InputGroupText.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const InputGroupText = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'span',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'input-group-text');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
InputGroupText.displayName = 'InputGroupText';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputGroupText);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ListGroup.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ListGroup.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _restart_ui_Nav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @restart/ui/Nav */ "./node_modules/@restart/ui/esm/Nav.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _ListGroupItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ListGroupItem */ "./node_modules/react-bootstrap/esm/ListGroupItem.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";









const ListGroup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((props, ref) => {
  const {
    className,
    bsPrefix: initialBsPrefix,
    variant,
    horizontal,
    numbered,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as = 'div',
    ...controlledProps
  } = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_3__.useUncontrolled)(props, {
    activeKey: 'onSelect'
  });
  const bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.useBootstrapPrefix)(initialBsPrefix, 'list-group');
  let horizontalVariant;
  if (horizontal) {
    horizontalVariant = horizontal === true ? 'horizontal' : `horizontal-${horizontal}`;
  }
   true ? warning__WEBPACK_IMPORTED_MODULE_2___default()(!(horizontal && variant === 'flush'), '`variant="flush"` and `horizontal` should not be used together.') : 0;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_restart_ui_Nav__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ref: ref,
    ...controlledProps,
    as: as,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix, variant && `${bsPrefix}-${variant}`, horizontalVariant && `${bsPrefix}-${horizontalVariant}`, numbered && `${bsPrefix}-numbered`)
  });
});
ListGroup.displayName = 'ListGroup';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(ListGroup, {
  Item: _ListGroupItem__WEBPACK_IMPORTED_MODULE_7__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ListGroupItem.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ListGroupItem.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _restart_ui_NavItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @restart/ui/NavItem */ "./node_modules/@restart/ui/esm/NavItem.js");
/* harmony import */ var _restart_ui_SelectableContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @restart/ui/SelectableContext */ "./node_modules/@restart/ui/esm/SelectableContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";









const ListGroupItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  active,
  disabled,
  eventKey,
  className,
  variant,
  action,
  as,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.useBootstrapPrefix)(bsPrefix, 'list-group-item');
  const [navItemProps, meta] = (0,_restart_ui_NavItem__WEBPACK_IMPORTED_MODULE_6__.useNavItem)({
    key: (0,_restart_ui_SelectableContext__WEBPACK_IMPORTED_MODULE_7__.makeEventKey)(eventKey, props.href),
    active,
    ...props
  });
  const handleClick = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_3__["default"])(event => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    navItemProps.onClick(event);
  });
  if (disabled && props.tabIndex === undefined) {
    props.tabIndex = -1;
    props['aria-disabled'] = true;
  }

  // eslint-disable-next-line no-nested-ternary
  const Component = as || (action ? props.href ? 'a' : 'button' : 'div');
   true ? warning__WEBPACK_IMPORTED_MODULE_2___default()(as || !(!action && props.href), '`action=false` and `href` should not be used together.') : 0;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Component, {
    ref: ref,
    ...props,
    ...navItemProps,
    onClick: handleClick,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix, meta.isActive && 'active', disabled && 'disabled', variant && `${bsPrefix}-${variant}`, action && `${bsPrefix}-action`)
  });
});
ListGroupItem.displayName = 'ListGroupItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListGroupItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Modal.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Modal.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dom_helpers_addEventListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/addEventListener */ "./node_modules/dom-helpers/esm/addEventListener.js");
/* harmony import */ var dom_helpers_canUseDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dom-helpers/canUseDOM */ "./node_modules/dom-helpers/esm/canUseDOM.js");
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");
/* harmony import */ var dom_helpers_removeEventListener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/removeEventListener */ "./node_modules/dom-helpers/esm/removeEventListener.js");
/* harmony import */ var dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dom-helpers/scrollbarSize */ "./node_modules/dom-helpers/esm/scrollbarSize.js");
/* harmony import */ var _restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @restart/hooks/useCallbackRef */ "./node_modules/@restart/hooks/esm/useCallbackRef.js");
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @restart/hooks/useMergedRefs */ "./node_modules/@restart/hooks/esm/useMergedRefs.js");
/* harmony import */ var _restart_hooks_useWillUnmount__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @restart/hooks/useWillUnmount */ "./node_modules/@restart/hooks/esm/useWillUnmount.js");
/* harmony import */ var dom_helpers_transitionEnd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! dom-helpers/transitionEnd */ "./node_modules/dom-helpers/esm/transitionEnd.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _restart_ui_Modal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @restart/ui/Modal */ "./node_modules/@restart/ui/esm/Modal.js");
/* harmony import */ var _BootstrapModalManager__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./BootstrapModalManager */ "./node_modules/react-bootstrap/esm/BootstrapModalManager.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony import */ var _ModalBody__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./ModalBody */ "./node_modules/react-bootstrap/esm/ModalBody.js");
/* harmony import */ var _ModalContext__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ModalContext */ "./node_modules/react-bootstrap/esm/ModalContext.js");
/* harmony import */ var _ModalDialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ModalDialog */ "./node_modules/react-bootstrap/esm/ModalDialog.js");
/* harmony import */ var _ModalFooter__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./ModalFooter */ "./node_modules/react-bootstrap/esm/ModalFooter.js");
/* harmony import */ var _ModalHeader__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ModalHeader */ "./node_modules/react-bootstrap/esm/ModalHeader.js");
/* harmony import */ var _ModalTitle__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./ModalTitle */ "./node_modules/react-bootstrap/esm/ModalTitle.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";

























/* eslint-disable no-use-before-define, react/no-multi-comp */
function DialogTransition(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_Fade__WEBPACK_IMPORTED_MODULE_13__["default"], {
    ...props,
    timeout: null
  });
}
function BackdropTransition(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_Fade__WEBPACK_IMPORTED_MODULE_13__["default"], {
    ...props,
    timeout: null
  });
}

/* eslint-enable no-use-before-define */
const Modal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11__.forwardRef(({
  bsPrefix,
  className,
  style,
  dialogClassName,
  contentClassName,
  children,
  dialogAs: Dialog = _ModalDialog__WEBPACK_IMPORTED_MODULE_14__["default"],
  'data-bs-theme': dataBsTheme,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-label': ariaLabel,
  /* BaseModal props */

  show = false,
  animation = true,
  backdrop = true,
  keyboard = true,
  onEscapeKeyDown,
  onShow,
  onHide,
  container,
  autoFocus = true,
  enforceFocus = true,
  restoreFocus = true,
  restoreFocusOptions,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  backdropClassName,
  manager: propsManager,
  ...props
}, ref) => {
  const [modalStyle, setStyle] = (0,react__WEBPACK_IMPORTED_MODULE_11__.useState)({});
  const [animateStaticModal, setAnimateStaticModal] = (0,react__WEBPACK_IMPORTED_MODULE_11__.useState)(false);
  const waitingForMouseUpRef = (0,react__WEBPACK_IMPORTED_MODULE_11__.useRef)(false);
  const ignoreBackdropClickRef = (0,react__WEBPACK_IMPORTED_MODULE_11__.useRef)(false);
  const removeStaticModalAnimationRef = (0,react__WEBPACK_IMPORTED_MODULE_11__.useRef)(null);
  const [modal, setModalRef] = (0,_restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const mergedRef = (0,_restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_8__["default"])(ref, setModalRef);
  const handleHide = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_7__["default"])(onHide);
  const isRTL = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_15__.useIsRTL)();
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_15__.useBootstrapPrefix)(bsPrefix, 'modal');
  const modalContext = (0,react__WEBPACK_IMPORTED_MODULE_11__.useMemo)(() => ({
    onHide: handleHide
  }), [handleHide]);
  function getModalManager() {
    if (propsManager) return propsManager;
    return (0,_BootstrapModalManager__WEBPACK_IMPORTED_MODULE_16__.getSharedManager)({
      isRTL
    });
  }
  function updateDialogStyle(node) {
    if (!dom_helpers_canUseDOM__WEBPACK_IMPORTED_MODULE_2__["default"]) return;
    const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;
    const modalIsOverflowing = node.scrollHeight > (0,dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_3__["default"])(node).documentElement.clientHeight;
    setStyle({
      paddingRight: containerIsOverflowing && !modalIsOverflowing ? (0,dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_5__["default"])() : undefined,
      paddingLeft: !containerIsOverflowing && modalIsOverflowing ? (0,dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_5__["default"])() : undefined
    });
  }
  const handleWindowResize = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_7__["default"])(() => {
    if (modal) {
      updateDialogStyle(modal.dialog);
    }
  });
  (0,_restart_hooks_useWillUnmount__WEBPACK_IMPORTED_MODULE_9__["default"])(() => {
    (0,dom_helpers_removeEventListener__WEBPACK_IMPORTED_MODULE_4__["default"])(window, 'resize', handleWindowResize);
    removeStaticModalAnimationRef.current == null || removeStaticModalAnimationRef.current();
  });

  // We prevent the modal from closing during a drag by detecting where the
  // click originates from. If it starts in the modal and then ends outside
  // don't close.
  const handleDialogMouseDown = () => {
    waitingForMouseUpRef.current = true;
  };
  const handleMouseUp = e => {
    if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
      ignoreBackdropClickRef.current = true;
    }
    waitingForMouseUpRef.current = false;
  };
  const handleStaticModalAnimation = () => {
    setAnimateStaticModal(true);
    removeStaticModalAnimationRef.current = (0,dom_helpers_transitionEnd__WEBPACK_IMPORTED_MODULE_10__["default"])(modal.dialog, () => {
      setAnimateStaticModal(false);
    });
  };
  const handleStaticBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    handleStaticModalAnimation();
  };
  const handleClick = e => {
    if (backdrop === 'static') {
      handleStaticBackdropClick(e);
      return;
    }
    if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
      ignoreBackdropClickRef.current = false;
      return;
    }
    onHide == null || onHide();
  };
  const handleEscapeKeyDown = e => {
    if (keyboard) {
      onEscapeKeyDown == null || onEscapeKeyDown(e);
    } else {
      // Call preventDefault to stop modal from closing in @restart/ui.
      e.preventDefault();
      if (backdrop === 'static') {
        // Play static modal animation.
        handleStaticModalAnimation();
      }
    }
  };
  const handleEnter = (node, isAppearing) => {
    if (node) {
      updateDialogStyle(node);
    }
    onEnter == null || onEnter(node, isAppearing);
  };
  const handleExit = node => {
    removeStaticModalAnimationRef.current == null || removeStaticModalAnimationRef.current();
    onExit == null || onExit(node);
  };
  const handleEntering = (node, isAppearing) => {
    onEntering == null || onEntering(node, isAppearing);

    // FIXME: This should work even when animation is disabled.
    (0,dom_helpers_addEventListener__WEBPACK_IMPORTED_MODULE_1__["default"])(window, 'resize', handleWindowResize);
  };
  const handleExited = node => {
    if (node) node.style.display = ''; // RHL removes it sometimes
    onExited == null || onExited(node);

    // FIXME: This should work even when animation is disabled.
    (0,dom_helpers_removeEventListener__WEBPACK_IMPORTED_MODULE_4__["default"])(window, 'resize', handleWindowResize);
  };
  const renderBackdrop = (0,react__WEBPACK_IMPORTED_MODULE_11__.useCallback)(backdropProps => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
    ...backdropProps,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(`${bsPrefix}-backdrop`, backdropClassName, !animation && 'show')
  }), [animation, backdropClassName, bsPrefix]);
  const baseModalStyle = {
    ...style,
    ...modalStyle
  };

  // If `display` is not set to block, autoFocus inside the modal fails
  // https://github.com/react-bootstrap/react-bootstrap/issues/5102
  baseModalStyle.display = 'block';
  const renderDialog = dialogProps => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
    role: "dialog",
    ...dialogProps,
    style: baseModalStyle,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix, animateStaticModal && `${bsPrefix}-static`, !animation && 'show'),
    onClick: backdrop ? handleClick : undefined,
    onMouseUp: handleMouseUp,
    "data-bs-theme": dataBsTheme,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(Dialog, {
      ...props,
      onMouseDown: handleDialogMouseDown,
      className: dialogClassName,
      contentClassName: contentClassName,
      children: children
    })
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_ModalContext__WEBPACK_IMPORTED_MODULE_17__["default"].Provider, {
    value: modalContext,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_restart_ui_Modal__WEBPACK_IMPORTED_MODULE_18__["default"], {
      show: show,
      ref: mergedRef,
      backdrop: backdrop,
      container: container,
      keyboard: true // Always set true - see handleEscapeKeyDown
      ,
      autoFocus: autoFocus,
      enforceFocus: enforceFocus,
      restoreFocus: restoreFocus,
      restoreFocusOptions: restoreFocusOptions,
      onEscapeKeyDown: handleEscapeKeyDown,
      onShow: onShow,
      onHide: onHide,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered: onEntered,
      onExit: handleExit,
      onExiting: onExiting,
      onExited: handleExited,
      manager: getModalManager(),
      transition: animation ? DialogTransition : undefined,
      backdropTransition: animation ? BackdropTransition : undefined,
      renderBackdrop: renderBackdrop,
      renderDialog: renderDialog
    })
  });
});
Modal.displayName = 'Modal';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Modal, {
  Body: _ModalBody__WEBPACK_IMPORTED_MODULE_19__["default"],
  Header: _ModalHeader__WEBPACK_IMPORTED_MODULE_20__["default"],
  Title: _ModalTitle__WEBPACK_IMPORTED_MODULE_21__["default"],
  Footer: _ModalFooter__WEBPACK_IMPORTED_MODULE_22__["default"],
  Dialog: _ModalDialog__WEBPACK_IMPORTED_MODULE_14__["default"],
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalBody.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalBody.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const ModalBody = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'modal-body');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
ModalBody.displayName = 'ModalBody';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalBody);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalDialog.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalDialog.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const ModalDialog = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  contentClassName,
  centered,
  size,
  fullscreen,
  children,
  scrollable,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'modal');
  const dialogClass = `${bsPrefix}-dialog`;
  const fullScreenClass = typeof fullscreen === 'string' ? `${bsPrefix}-fullscreen-${fullscreen}` : `${bsPrefix}-fullscreen`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    ...props,
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(dialogClass, className, size && `${bsPrefix}-${size}`, centered && `${dialogClass}-centered`, scrollable && `${dialogClass}-scrollable`, fullscreen && fullScreenClass),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(`${bsPrefix}-content`, contentClassName),
      children: children
    })
  });
});
ModalDialog.displayName = 'ModalDialog';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalDialog);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalFooter.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalFooter.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const ModalFooter = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'modal-footer');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
ModalFooter.displayName = 'ModalFooter';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalFooter);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalHeader.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalHeader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _AbstractModalHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AbstractModalHeader */ "./node_modules/react-bootstrap/esm/AbstractModalHeader.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const ModalHeader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  closeLabel = 'Close',
  closeButton = false,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'modal-header');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_AbstractModalHeader__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix),
    closeLabel: closeLabel,
    closeButton: closeButton
  });
});
ModalHeader.displayName = 'ModalHeader';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalTitle.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalTitle.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _divWithClassName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./divWithClassName */ "./node_modules/react-bootstrap/esm/divWithClassName.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const DivStyledAsH4 = (0,_divWithClassName__WEBPACK_IMPORTED_MODULE_3__["default"])('h4');
const ModalTitle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'modal-title');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
ModalTitle.displayName = 'ModalTitle';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalTitle);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Nav.js":
/*!*************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Nav.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _restart_ui_Nav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @restart/ui/Nav */ "./node_modules/@restart/ui/esm/Nav.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _NavbarContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavbarContext */ "./node_modules/react-bootstrap/esm/NavbarContext.js");
/* harmony import */ var _CardHeaderContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CardHeaderContext */ "./node_modules/react-bootstrap/esm/CardHeaderContext.js");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NavItem */ "./node_modules/react-bootstrap/esm/NavItem.js");
/* harmony import */ var _NavLink__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NavLink */ "./node_modules/react-bootstrap/esm/NavLink.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";












const Nav = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((uncontrolledProps, ref) => {
  const {
    as = 'div',
    bsPrefix: initialBsPrefix,
    variant,
    fill = false,
    justify = false,
    navbar,
    navbarScroll,
    className,
    activeKey,
    ...props
  } = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_2__.useUncontrolled)(uncontrolledProps, {
    activeKey: 'onSelect'
  });
  const bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(initialBsPrefix, 'nav');
  let navbarBsPrefix;
  let cardHeaderBsPrefix;
  let isNavbar = false;
  const navbarContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_NavbarContext__WEBPACK_IMPORTED_MODULE_5__["default"]);
  const cardHeaderContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_CardHeaderContext__WEBPACK_IMPORTED_MODULE_6__["default"]);
  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    isNavbar = navbar == null ? true : navbar;
  } else if (cardHeaderContext) {
    ({
      cardHeaderBsPrefix
    } = cardHeaderContext);
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_restart_ui_Nav__WEBPACK_IMPORTED_MODULE_7__["default"], {
    as: as,
    ref: ref,
    activeKey: activeKey,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, {
      [bsPrefix]: !isNavbar,
      [`${navbarBsPrefix}-nav`]: isNavbar,
      [`${navbarBsPrefix}-nav-scroll`]: isNavbar && navbarScroll,
      [`${cardHeaderBsPrefix}-${variant}`]: !!cardHeaderBsPrefix,
      [`${bsPrefix}-${variant}`]: !!variant,
      [`${bsPrefix}-fill`]: fill,
      [`${bsPrefix}-justified`]: justify
    }),
    ...props
  });
});
Nav.displayName = 'Nav';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Nav, {
  Item: _NavItem__WEBPACK_IMPORTED_MODULE_8__["default"],
  Link: _NavLink__WEBPACK_IMPORTED_MODULE_9__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/NavDropdown.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/NavDropdown.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/esm/Dropdown.js");
/* harmony import */ var _NavLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavLink */ "./node_modules/react-bootstrap/esm/NavLink.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";








const NavDropdown = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  id,
  title,
  children,
  bsPrefix,
  className,
  rootCloseEvent,
  menuRole,
  disabled,
  active,
  renderMenuOnMount,
  menuVariant,
  ...props
}, ref) => {
  /* NavItem has no additional logic, it's purely presentational. Can set nav item class here to support "as" */
  const navItemPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(undefined, 'nav-item');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, navItemPrefix),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Toggle, {
      id: id,
      eventKey: null,
      active: active,
      disabled: disabled,
      childBsPrefix: bsPrefix,
      as: _NavLink__WEBPACK_IMPORTED_MODULE_5__["default"],
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Menu, {
      role: menuRole,
      renderOnMount: renderMenuOnMount,
      rootCloseEvent: rootCloseEvent,
      variant: menuVariant,
      children: children
    })]
  });
});
NavDropdown.displayName = 'NavDropdown';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(NavDropdown, {
  Item: _Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Item,
  ItemText: _Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].ItemText,
  Divider: _Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Divider,
  Header: _Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Header
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/NavItem.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/NavItem.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const NavItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'nav-item');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
NavItem.displayName = 'NavItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/NavLink.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/NavLink.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/ui/Anchor */ "./node_modules/@restart/ui/esm/Anchor.js");
/* harmony import */ var _restart_ui_NavItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @restart/ui/NavItem */ "./node_modules/@restart/ui/esm/NavItem.js");
/* harmony import */ var _restart_ui_SelectableContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @restart/ui/SelectableContext */ "./node_modules/@restart/ui/esm/SelectableContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";








const NavLink = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  as: Component = _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_3__["default"],
  active,
  eventKey,
  disabled = false,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'nav-link');
  const [navItemProps, meta] = (0,_restart_ui_NavItem__WEBPACK_IMPORTED_MODULE_5__.useNavItem)({
    key: (0,_restart_ui_SelectableContext__WEBPACK_IMPORTED_MODULE_6__.makeEventKey)(eventKey, props.href),
    active,
    disabled,
    ...props
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ...props,
    ...navItemProps,
    ref: ref,
    disabled: disabled,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix, disabled && 'disabled', meta.isActive && 'active')
  });
});
NavLink.displayName = 'NavLink';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavLink);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Overlay.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Overlay.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_Overlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @restart/ui/Overlay */ "./node_modules/@restart/ui/esm/Overlay.js");
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _restart_hooks_useIsomorphicEffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/hooks/useIsomorphicEffect */ "./node_modules/@restart/hooks/esm/useIsomorphicEffect.js");
/* harmony import */ var _restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useMergedRefs */ "./node_modules/@restart/hooks/esm/useMergedRefs.js");
/* harmony import */ var _useOverlayOffset__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useOverlayOffset */ "./node_modules/react-bootstrap/esm/useOverlayOffset.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony import */ var _safeFindDOMNode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./safeFindDOMNode */ "./node_modules/react-bootstrap/esm/safeFindDOMNode.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";












function wrapRefs(props, arrowProps) {
  const {
    ref
  } = props;
  const {
    ref: aRef
  } = arrowProps;
  props.ref = ref.__wrapped || (ref.__wrapped = r => ref((0,_safeFindDOMNode__WEBPACK_IMPORTED_MODULE_6__["default"])(r)));
  arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = r => aRef((0,_safeFindDOMNode__WEBPACK_IMPORTED_MODULE_6__["default"])(r)));
}
const Overlay = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  children: overlay,
  transition = _Fade__WEBPACK_IMPORTED_MODULE_7__["default"],
  popperConfig = {},
  rootClose = false,
  placement = 'top',
  show: outerShow = false,
  ...outerProps
}, outerRef) => {
  const popperRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
  const [firstRenderedState, setFirstRenderedState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [ref, modifiers] = (0,_useOverlayOffset__WEBPACK_IMPORTED_MODULE_8__["default"])(outerProps.offset);
  const mergedRef = (0,_restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_4__["default"])(outerRef, ref);
  const actualTransition = transition === true ? _Fade__WEBPACK_IMPORTED_MODULE_7__["default"] : transition || undefined;
  const handleFirstUpdate = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_2__["default"])(state => {
    setFirstRenderedState(state);
    popperConfig == null || popperConfig.onFirstUpdate == null || popperConfig.onFirstUpdate(state);
  });
  (0,_restart_hooks_useIsomorphicEffect__WEBPACK_IMPORTED_MODULE_3__["default"])(() => {
    if (firstRenderedState && outerProps.target) {
      // Must wait for target element to resolve before updating popper.
      popperRef.current.scheduleUpdate == null || popperRef.current.scheduleUpdate();
    }
  }, [firstRenderedState, outerProps.target]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!outerShow) {
      setFirstRenderedState(null);
    }
  }, [outerShow]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_restart_ui_Overlay__WEBPACK_IMPORTED_MODULE_9__["default"], {
    ...outerProps,
    ref: mergedRef,
    popperConfig: {
      ...popperConfig,
      modifiers: modifiers.concat(popperConfig.modifiers || []),
      onFirstUpdate: handleFirstUpdate
    },
    transition: actualTransition,
    rootClose: rootClose,
    placement: placement,
    show: outerShow,
    children: (overlayProps, {
      arrowProps,
      popper: popperObj,
      show
    }) => {
      var _popperObj$state;
      wrapRefs(overlayProps, arrowProps);
      // Need to get placement from popper object, handling case when overlay is flipped using 'flip' prop
      const updatedPlacement = popperObj == null ? void 0 : popperObj.placement;
      const popper = Object.assign(popperRef.current, {
        state: popperObj == null ? void 0 : popperObj.state,
        scheduleUpdate: popperObj == null ? void 0 : popperObj.update,
        placement: updatedPlacement,
        outOfBoundaries: (popperObj == null || (_popperObj$state = popperObj.state) == null || (_popperObj$state = _popperObj$state.modifiersData.hide) == null ? void 0 : _popperObj$state.isReferenceHidden) || false,
        strategy: popperConfig.strategy
      });
      const hasDoneInitialMeasure = !!firstRenderedState;
      if (typeof overlay === 'function') return overlay({
        ...overlayProps,
        placement: updatedPlacement,
        show,
        ...(!transition && show && {
          className: 'show'
        }),
        popper,
        arrowProps,
        hasDoneInitialMeasure
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(overlay, {
        ...overlayProps,
        placement: updatedPlacement,
        arrowProps,
        popper,
        hasDoneInitialMeasure,
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(overlay.props.className, !transition && show && 'show'),
        style: {
          ...overlay.props.style,
          ...overlayProps.style
        }
      });
    }
  });
});
Overlay.displayName = 'Overlay';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Overlay);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/OverlayTrigger.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/OverlayTrigger.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dom_helpers_contains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/contains */ "./node_modules/dom-helpers/esm/contains.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_hooks_useTimeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/hooks/useTimeout */ "./node_modules/@restart/hooks/esm/useTimeout.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @restart/hooks/useMergedRefs */ "./node_modules/@restart/hooks/esm/useMergedRefs.js");
/* harmony import */ var _restart_ui_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @restart/ui/utils */ "./node_modules/@restart/ui/esm/utils.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Overlay */ "./node_modules/react-bootstrap/esm/Overlay.js");
/* harmony import */ var _safeFindDOMNode__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./safeFindDOMNode */ "./node_modules/react-bootstrap/esm/safeFindDOMNode.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";















function normalizeDelay(delay) {
  return delay && typeof delay === 'object' ? delay : {
    show: delay,
    hide: delay
  };
}

// Simple implementation of mouseEnter and mouseLeave.
// React's built version is broken: https://github.com/facebook/react/issues/4251
// for cases when the trigger is disabled and mouseOut/Over can cause flicker
// moving from one child element to another.
function handleMouseOverOut(
// eslint-disable-next-line @typescript-eslint/no-shadow
handler, args, relatedNative) {
  const [e] = args;
  const target = e.currentTarget;
  const related = e.relatedTarget || e.nativeEvent[relatedNative];
  if ((!related || related !== target) && !(0,dom_helpers_contains__WEBPACK_IMPORTED_MODULE_0__["default"])(target, related)) {
    handler(...args);
  }
}
const triggerType = prop_types__WEBPACK_IMPORTED_MODULE_7___default().oneOf(['click', 'hover', 'focus']);
const OverlayTrigger = ({
  trigger = ['hover', 'focus'],
  overlay,
  children,
  popperConfig = {},
  show: propsShow,
  defaultShow = false,
  onToggle,
  delay: propsDelay,
  placement,
  flip = placement && placement.indexOf('auto') !== -1,
  ...props
}) => {
  const triggerNodeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const mergedRef = (0,_restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_5__["default"])(triggerNodeRef, (0,_restart_ui_utils__WEBPACK_IMPORTED_MODULE_8__.getChildRef)(children));
  const timeout = (0,_restart_hooks_useTimeout__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const hoverStateRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)('');
  const [show, setShow] = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_4__.useUncontrolledProp)(propsShow, defaultShow, onToggle);
  const delay = normalizeDelay(propsDelay);
  const {
    onFocus,
    onBlur,
    onClick
  } = typeof children !== 'function' ? react__WEBPACK_IMPORTED_MODULE_1__.Children.only(children).props : {};
  const attachRef = r => {
    mergedRef((0,_safeFindDOMNode__WEBPACK_IMPORTED_MODULE_9__["default"])(r));
  };
  const handleShow = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    timeout.clear();
    hoverStateRef.current = 'show';
    if (!delay.show) {
      setShow(true);
      return;
    }
    timeout.set(() => {
      if (hoverStateRef.current === 'show') setShow(true);
    }, delay.show);
  }, [delay.show, setShow, timeout]);
  const handleHide = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    timeout.clear();
    hoverStateRef.current = 'hide';
    if (!delay.hide) {
      setShow(false);
      return;
    }
    timeout.set(() => {
      if (hoverStateRef.current === 'hide') setShow(false);
    }, delay.hide);
  }, [delay.hide, setShow, timeout]);
  const handleFocus = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((...args) => {
    handleShow();
    onFocus == null || onFocus(...args);
  }, [handleShow, onFocus]);
  const handleBlur = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((...args) => {
    handleHide();
    onBlur == null || onBlur(...args);
  }, [handleHide, onBlur]);
  const handleClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((...args) => {
    setShow(!show);
    onClick == null || onClick(...args);
  }, [onClick, setShow, show]);
  const handleMouseOver = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((...args) => {
    handleMouseOverOut(handleShow, args, 'fromElement');
  }, [handleShow]);
  const handleMouseOut = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((...args) => {
    handleMouseOverOut(handleHide, args, 'toElement');
  }, [handleHide]);
  const triggers = trigger == null ? [] : [].concat(trigger);
  const triggerProps = {
    ref: attachRef
  };
  if (triggers.indexOf('click') !== -1) {
    triggerProps.onClick = handleClick;
  }
  if (triggers.indexOf('focus') !== -1) {
    triggerProps.onFocus = handleFocus;
    triggerProps.onBlur = handleBlur;
  }
  if (triggers.indexOf('hover') !== -1) {
     true ? warning__WEBPACK_IMPORTED_MODULE_3___default()(triggers.length > 1, '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibility of the overlay to just mouse users. Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.') : 0;
    triggerProps.onMouseOver = handleMouseOver;
    triggerProps.onMouseOut = handleMouseOut;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [typeof children === 'function' ? children(triggerProps) : /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(children, triggerProps), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Overlay__WEBPACK_IMPORTED_MODULE_10__["default"], {
      ...props,
      show: show,
      onHide: handleHide,
      flip: flip,
      placement: placement,
      popperConfig: popperConfig,
      target: triggerNodeRef.current,
      children: overlay
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OverlayTrigger);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/PageItem.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/PageItem.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ellipsis: () => (/* binding */ Ellipsis),
/* harmony export */   First: () => (/* binding */ First),
/* harmony export */   Last: () => (/* binding */ Last),
/* harmony export */   Next: () => (/* binding */ Next),
/* harmony export */   Prev: () => (/* binding */ Prev),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @restart/ui/Anchor */ "./node_modules/@restart/ui/esm/Anchor.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* eslint-disable react/no-multi-comp */





const PageItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  active = false,
  disabled = false,
  className,
  style,
  activeLabel = '(current)',
  children,
  linkStyle,
  linkClassName,
  as = _restart_ui_Anchor__WEBPACK_IMPORTED_MODULE_3__["default"],
  ...props
}, ref) => {
  const Component = active || disabled ? 'span' : as;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
    ref: ref,
    style: style,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, 'page-item', {
      active,
      disabled
    }),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(Component, {
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('page-link', linkClassName),
      style: linkStyle,
      ...props,
      children: [children, active && activeLabel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "visually-hidden",
        children: activeLabel
      })]
    })
  });
});
PageItem.displayName = 'PageItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageItem);
function createButton(name, defaultValue, label = name) {
  const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
    children,
    ...props
  }, ref) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(PageItem, {
    ...props,
    ref: ref,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
      "aria-hidden": "true",
      children: children || defaultValue
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
      className: "visually-hidden",
      children: label
    })]
  }));
  Button.displayName = name;
  return Button;
}
const First = createButton('First', '«');
const Prev = createButton('Prev', '‹', 'Previous');
const Ellipsis = createButton('Ellipsis', '…', 'More');
const Next = createButton('Next', '›');
const Last = createButton('Last', '»');

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Pagination.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Pagination.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _PageItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PageItem */ "./node_modules/react-bootstrap/esm/PageItem.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const Pagination = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  size,
  ...props
}, ref) => {
  const decoratedBsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'pagination');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, decoratedBsPrefix, size && `${decoratedBsPrefix}-${size}`)
  });
});
Pagination.displayName = 'Pagination';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Pagination, {
  First: _PageItem__WEBPACK_IMPORTED_MODULE_4__.First,
  Prev: _PageItem__WEBPACK_IMPORTED_MODULE_4__.Prev,
  Ellipsis: _PageItem__WEBPACK_IMPORTED_MODULE_4__.Ellipsis,
  Item: _PageItem__WEBPACK_IMPORTED_MODULE_4__["default"],
  Next: _PageItem__WEBPACK_IMPORTED_MODULE_4__.Next,
  Last: _PageItem__WEBPACK_IMPORTED_MODULE_4__.Last
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Placeholder.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Placeholder.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _usePlaceholder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./usePlaceholder */ "./node_modules/react-bootstrap/esm/usePlaceholder.js");
/* harmony import */ var _PlaceholderButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PlaceholderButton */ "./node_modules/react-bootstrap/esm/PlaceholderButton.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




const Placeholder = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  as: Component = 'span',
  ...props
}, ref) => {
  const placeholderProps = (0,_usePlaceholder__WEBPACK_IMPORTED_MODULE_2__["default"])(props);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Component, {
    ...placeholderProps,
    ref: ref
  });
});
Placeholder.displayName = 'Placeholder';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Placeholder, {
  Button: _PlaceholderButton__WEBPACK_IMPORTED_MODULE_3__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/PlaceholderButton.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/PlaceholderButton.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony import */ var _usePlaceholder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./usePlaceholder */ "./node_modules/react-bootstrap/esm/usePlaceholder.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




const PlaceholderButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {
  const placeholderProps = (0,_usePlaceholder__WEBPACK_IMPORTED_MODULE_2__["default"])(props);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ...placeholderProps,
    ref: ref,
    disabled: true,
    tabIndex: -1
  });
});
PlaceholderButton.displayName = 'PlaceholderButton';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaceholderButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Popover.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Popover.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _PopoverHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PopoverHeader */ "./node_modules/react-bootstrap/esm/PopoverHeader.js");
/* harmony import */ var _PopoverBody__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PopoverBody */ "./node_modules/react-bootstrap/esm/PopoverBody.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./node_modules/react-bootstrap/esm/helpers.js");
/* harmony import */ var _getInitialPopperStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getInitialPopperStyles */ "./node_modules/react-bootstrap/esm/getInitialPopperStyles.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";










const Popover = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  placement = 'right',
  className,
  style,
  children,
  body,
  arrowProps,
  hasDoneInitialMeasure,
  popper,
  show,
  ...props
}, ref) => {
  const decoratedBsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'popover');
  const isRTL = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useIsRTL)();
  const [primaryPlacement] = (placement == null ? void 0 : placement.split('-')) || [];
  const bsDirection = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.getOverlayDirection)(primaryPlacement, isRTL);
  let computedStyle = style;
  if (show && !hasDoneInitialMeasure) {
    computedStyle = {
      ...style,
      ...(0,_getInitialPopperStyles__WEBPACK_IMPORTED_MODULE_5__["default"])(popper == null ? void 0 : popper.strategy)
    };
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    ref: ref,
    role: "tooltip",
    style: computedStyle,
    "x-placement": primaryPlacement,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, decoratedBsPrefix, primaryPlacement && `bs-popover-${bsDirection}`),
    ...props,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "popover-arrow",
      ...arrowProps
    }), body ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_PopoverBody__WEBPACK_IMPORTED_MODULE_6__["default"], {
      children: children
    }) : children]
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Popover, {
  Header: _PopoverHeader__WEBPACK_IMPORTED_MODULE_7__["default"],
  Body: _PopoverBody__WEBPACK_IMPORTED_MODULE_6__["default"],
  // Default popover offset.
  // https://github.com/twbs/bootstrap/blob/5c32767e0e0dbac2d934bcdee03719a65d3f1187/js/src/popover.js#L28
  POPPER_OFFSET: [0, 8]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/PopoverBody.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/PopoverBody.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const PopoverBody = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'popover-body');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
PopoverBody.displayName = 'PopoverBody';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopoverBody);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/PopoverHeader.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/PopoverHeader.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const PopoverHeader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'popover-header');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
PopoverHeader.displayName = 'PopoverHeader';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopoverHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ProgressBar.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ProgressBar.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _ElementChildren__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ElementChildren */ "./node_modules/react-bootstrap/esm/ElementChildren.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";







const ROUND_PRECISION = 1000;

/**
 * Validate that children, if any, are instances of `ProgressBar`.
 */
function onlyProgressBar(props, propName, componentName) {
  const children = props[propName];
  if (!children) {
    return null;
  }
  let error = null;
  react__WEBPACK_IMPORTED_MODULE_1__.Children.forEach(children, child => {
    if (error) {
      return;
    }

    /**
     * Compare types in a way that works with libraries that patch and proxy
     * components like react-hot-loader.
     *
     * see https://github.com/gaearon/react-hot-loader#checking-element-types
     */
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const element = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ProgressBar, {});
    if (child.type === element.type) return;
    const childType = child.type;
    const childIdentifier = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.isValidElement(child) ? childType.displayName || childType.name || childType : child;
    error = new Error(`Children of ${componentName} can contain only ProgressBar ` + `components. Found ${childIdentifier}.`);
  });
  return error;
}
function getPercentage(now, min, max) {
  const percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}
function renderProgressBar({
  min,
  now,
  max,
  label,
  visuallyHidden,
  striped,
  animated,
  className,
  style,
  variant,
  bsPrefix,
  ...props
}, ref) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    ref: ref,
    ...props,
    role: "progressbar",
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, `${bsPrefix}-bar`, {
      [`bg-${variant}`]: variant,
      [`${bsPrefix}-bar-animated`]: animated,
      [`${bsPrefix}-bar-striped`]: animated || striped
    }),
    style: {
      width: `${getPercentage(now, min, max)}%`,
      ...style
    },
    "aria-valuenow": now,
    "aria-valuemin": min,
    "aria-valuemax": max,
    children: visuallyHidden ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
      className: "visually-hidden",
      children: label
    }) : label
  });
}
const ProgressBar = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  isChild = false,
  ...rest
}, ref) => {
  const props = {
    min: 0,
    max: 100,
    animated: false,
    visuallyHidden: false,
    striped: false,
    ...rest
  };
  props.bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(props.bsPrefix, 'progress');
  if (isChild) {
    return renderProgressBar(props, ref);
  }
  const {
    min,
    now,
    max,
    label,
    visuallyHidden,
    striped,
    animated,
    bsPrefix,
    variant,
    className,
    children,
    ...wrapperProps
  } = props;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    ref: ref,
    ...wrapperProps,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix),
    children: children ? (0,_ElementChildren__WEBPACK_IMPORTED_MODULE_4__.map)(children, child => /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(child, {
      isChild: true
    })) : renderProgressBar({
      min,
      now,
      max,
      label,
      visuallyHidden,
      striped,
      animated,
      bsPrefix,
      variant
    }, ref)
  });
});
ProgressBar.displayName = 'ProgressBar';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressBar);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Ratio.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Ratio.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





function toPercent(num) {
  if (num <= 0) return '100%';
  if (num < 1) return `${num * 100}%`;
  return `${num}%`;
}
const Ratio = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  children,
  aspectRatio = '1x1',
  style,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'ratio');
  const isCustomRatio = typeof aspectRatio === 'number';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    ref: ref,
    ...props,
    style: {
      ...style,
      ...(isCustomRatio && {
        '--bs-aspect-ratio': toPercent(aspectRatio)
      })
    },
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(bsPrefix, className, !isCustomRatio && `${bsPrefix}-${aspectRatio}`),
    children: react__WEBPACK_IMPORTED_MODULE_1__.Children.only(children)
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ratio);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/SSRProvider.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/SSRProvider.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restart_ui_ssr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @restart/ui/ssr */ "./node_modules/@react-aria/ssr/dist/SSRProvider.mjs");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_restart_ui_ssr__WEBPACK_IMPORTED_MODULE_0__.SSRProvider);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Spinner.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Spinner.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const Spinner = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  variant,
  animation = 'border',
  size,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'spinner');
  const bsSpinnerPrefix = `${bsPrefix}-${animation}`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsSpinnerPrefix, size && `${bsSpinnerPrefix}-${size}`, variant && `text-${variant}`)
  });
});
Spinner.displayName = 'Spinner';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spinner);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/SplitButton.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/SplitButton.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony import */ var _ButtonGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ButtonGroup */ "./node_modules/react-bootstrap/esm/ButtonGroup.js");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/esm/Dropdown.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./node_modules/react-bootstrap/esm/types.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








const propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string}
   * @required
   */
  id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** An `href` passed to the non-toggle Button */
  href: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** An anchor `target` passed to the non-toggle Button */
  target: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** An `onClick` handler passed to the non-toggle Button */
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  /** The content of the non-toggle Button.  */
  title: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node).isRequired,
  /** A `type` passed to the non-toggle Button */
  type: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** Disables both Buttons  */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  /**
   * Aligns the dropdown menu.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: _types__WEBPACK_IMPORTED_MODULE_3__.alignPropType,
  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  rootCloseEvent: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   *
   */
  flip: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  /** @ignore */
  bsPrefix: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** @ignore */
  variant: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  /** @ignore */
  size: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
};

/**
 * A convenience component for simple or general use split button dropdowns. Renders a
 * `ButtonGroup` containing a `Button` and a `Button` toggle for the `Dropdown`. All `children`
 * are passed directly to the default `Dropdown.Menu`. This component accepts all of [`Dropdown`'s
 * props](#dropdown-props).
 *
 * _All unknown props are passed through to the `Dropdown` component._
 * The Button `variant`, `size` and `bsPrefix` props are passed to the button and toggle,
 * and menu-related props are passed to the `Dropdown.Menu`
 */
const SplitButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  id,
  bsPrefix,
  size,
  variant,
  title,
  type = 'button',
  toggleLabel = 'Toggle dropdown',
  children,
  onClick,
  href,
  target,
  menuRole,
  renderMenuOnMount,
  rootCloseEvent,
  flip,
  ...props
}, ref) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"], {
  ref: ref,
  ...props,
  as: _ButtonGroup__WEBPACK_IMPORTED_MODULE_5__["default"],
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: size,
    variant: variant,
    disabled: props.disabled,
    bsPrefix: bsPrefix,
    href: href,
    target: target,
    onClick: onClick,
    type: type,
    children: title
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Toggle, {
    split: true,
    id: id,
    size: size,
    variant: variant,
    disabled: props.disabled,
    childBsPrefix: bsPrefix,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      className: "visually-hidden",
      children: toggleLabel
    })
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Menu, {
    role: menuRole,
    renderOnMount: renderMenuOnMount,
    rootCloseEvent: rootCloseEvent,
    flip: flip,
    children: children
  })]
}));
SplitButton.propTypes = propTypes;
SplitButton.displayName = 'SplitButton';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SplitButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Stack.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Stack.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _createUtilityClasses__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createUtilityClasses */ "./node_modules/react-bootstrap/esm/createUtilityClasses.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const Stack = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  as: Component = 'div',
  bsPrefix,
  className,
  direction,
  gap,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, direction === 'horizontal' ? 'hstack' : 'vstack');
  const breakpoints = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapBreakpoints)();
  const minBreakpoint = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapMinBreakpoint)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ...props,
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix, ...(0,_createUtilityClasses__WEBPACK_IMPORTED_MODULE_4__["default"])({
      gap
    }, breakpoints, minBreakpoint))
  });
});
Stack.displayName = 'Stack';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Stack);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Tab.js":
/*!*************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Tab.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TabContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TabContainer */ "./node_modules/react-bootstrap/esm/TabContainer.js");
/* harmony import */ var _TabContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabContent */ "./node_modules/react-bootstrap/esm/TabContent.js");
/* harmony import */ var _TabPane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TabPane */ "./node_modules/react-bootstrap/esm/TabPane.js");




/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  eventKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_0___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number)]),
  /**
   * Content for the tab title.
   */
  title: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node).isRequired,
  /**
   * The disabled state of the tab.
   */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool),
  /**
   * Class to pass to the underlying nav link.
   */
  tabClassName: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  /**
   * Object containing attributes to pass to underlying nav link.
   */
  tabAttrs: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)
};
const Tab = () => {
  throw new Error('ReactBootstrap: The `Tab` component is not meant to be rendered! ' + "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " + 'For custom tabs components use TabPane and TabsContainer directly');
};
Tab.propTypes = propTypes;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Tab, {
  Container: _TabContainer__WEBPACK_IMPORTED_MODULE_1__["default"],
  Content: _TabContent__WEBPACK_IMPORTED_MODULE_2__["default"],
  Pane: _TabPane__WEBPACK_IMPORTED_MODULE_3__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/TabContainer.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/TabContainer.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _restart_ui_Tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/ui/Tabs */ "./node_modules/@restart/ui/esm/Tabs.js");
/* harmony import */ var _getTabTransitionComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTabTransitionComponent */ "./node_modules/react-bootstrap/esm/getTabTransitionComponent.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




const TabContainer = ({
  transition,
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_restart_ui_Tabs__WEBPACK_IMPORTED_MODULE_2__["default"], {
  ...props,
  transition: (0,_getTabTransitionComponent__WEBPACK_IMPORTED_MODULE_3__["default"])(transition)
});
TabContainer.displayName = 'TabContainer';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabContainer);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/TabContent.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/TabContent.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const TabContent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'tab-content');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
TabContent.displayName = 'TabContent';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabContent);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/TabPane.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/TabPane.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_ui_SelectableContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @restart/ui/SelectableContext */ "./node_modules/@restart/ui/esm/SelectableContext.js");
/* harmony import */ var _restart_ui_TabContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @restart/ui/TabContext */ "./node_modules/@restart/ui/esm/TabContext.js");
/* harmony import */ var _restart_ui_TabPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/ui/TabPanel */ "./node_modules/@restart/ui/esm/TabPanel.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony import */ var _getTabTransitionComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getTabTransitionComponent */ "./node_modules/react-bootstrap/esm/getTabTransitionComponent.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";










const TabPane = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  transition,
  ...props
}, ref) => {
  const [{
    className,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    ...rest
  }, {
    isActive,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    mountOnEnter,
    unmountOnExit,
    transition: Transition = _Fade__WEBPACK_IMPORTED_MODULE_3__["default"]
  }] = (0,_restart_ui_TabPanel__WEBPACK_IMPORTED_MODULE_4__.useTabPanel)({
    ...props,
    transition: (0,_getTabTransitionComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(transition)
  });
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__.useBootstrapPrefix)(bsPrefix, 'tab-pane');

  // We provide an empty the TabContext so `<Nav>`s in `<TabPanel>`s don't
  // conflict with the top level one.
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_restart_ui_TabContext__WEBPACK_IMPORTED_MODULE_7__["default"].Provider, {
    value: null,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_restart_ui_SelectableContext__WEBPACK_IMPORTED_MODULE_8__["default"].Provider, {
      value: null,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Transition, {
        in: isActive,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: onExited,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
          ...rest,
          ref: ref,
          className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, prefix, isActive && 'active')
        })
      })
    })
  });
});
TabPane.displayName = 'TabPane';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabPane);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Table.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Table.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const Table = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  striped,
  bordered,
  borderless,
  hover,
  size,
  variant,
  responsive,
  ...props
}, ref) => {
  const decoratedBsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'table');
  const classes = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, decoratedBsPrefix, variant && `${decoratedBsPrefix}-${variant}`, size && `${decoratedBsPrefix}-${size}`, striped && `${decoratedBsPrefix}-${typeof striped === 'string' ? `striped-${striped}` : 'striped'}`, bordered && `${decoratedBsPrefix}-bordered`, borderless && `${decoratedBsPrefix}-borderless`, hover && `${decoratedBsPrefix}-hover`);
  const table = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("table", {
    ...props,
    className: classes,
    ref: ref
  });
  if (responsive) {
    let responsiveClass = `${decoratedBsPrefix}-responsive`;
    if (typeof responsive === 'string') {
      responsiveClass = `${responsiveClass}-${responsive}`;
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: responsiveClass,
      children: table
    });
  }
  return table;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Tabs.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Tabs.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _restart_ui_Tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @restart/ui/Tabs */ "./node_modules/@restart/ui/esm/Tabs.js");
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Nav */ "./node_modules/react-bootstrap/esm/Nav.js");
/* harmony import */ var _NavLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavLink */ "./node_modules/react-bootstrap/esm/NavLink.js");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavItem */ "./node_modules/react-bootstrap/esm/NavItem.js");
/* harmony import */ var _TabContent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TabContent */ "./node_modules/react-bootstrap/esm/TabContent.js");
/* harmony import */ var _TabPane__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TabPane */ "./node_modules/react-bootstrap/esm/TabPane.js");
/* harmony import */ var _ElementChildren__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ElementChildren */ "./node_modules/react-bootstrap/esm/ElementChildren.js");
/* harmony import */ var _getTabTransitionComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getTabTransitionComponent */ "./node_modules/react-bootstrap/esm/getTabTransitionComponent.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");












function getDefaultActiveKey(children) {
  let defaultActiveKey;
  (0,_ElementChildren__WEBPACK_IMPORTED_MODULE_3__.forEach)(children, child => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}
function renderTab(child) {
  const {
    title,
    eventKey,
    disabled,
    tabClassName,
    tabAttrs,
    id
  } = child.props;
  if (title == null) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_NavItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
    as: "li",
    role: "presentation",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_NavLink__WEBPACK_IMPORTED_MODULE_5__["default"], {
      as: "button",
      type: "button",
      eventKey: eventKey,
      disabled: disabled,
      id: id,
      className: tabClassName,
      ...tabAttrs,
      children: title
    })
  });
}
const Tabs = props => {
  const {
    id,
    onSelect,
    transition,
    mountOnEnter = false,
    unmountOnExit = false,
    variant = 'tabs',
    children,
    activeKey = getDefaultActiveKey(children),
    ...controlledProps
  } = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_1__.useUncontrolled)(props, {
    activeKey: 'onSelect'
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_restart_ui_Tabs__WEBPACK_IMPORTED_MODULE_6__["default"], {
    id: id,
    activeKey: activeKey,
    onSelect: onSelect,
    transition: (0,_getTabTransitionComponent__WEBPACK_IMPORTED_MODULE_7__["default"])(transition),
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Nav__WEBPACK_IMPORTED_MODULE_8__["default"], {
      id: id,
      ...controlledProps,
      role: "tablist",
      as: "ul",
      variant: variant,
      children: (0,_ElementChildren__WEBPACK_IMPORTED_MODULE_3__.map)(children, renderTab)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_TabContent__WEBPACK_IMPORTED_MODULE_9__["default"], {
      children: (0,_ElementChildren__WEBPACK_IMPORTED_MODULE_3__.map)(children, child => {
        const childProps = {
          ...child.props
        };
        delete childProps.title;
        delete childProps.disabled;
        delete childProps.tabClassName;
        delete childProps.tabAttrs;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_TabPane__WEBPACK_IMPORTED_MODULE_10__["default"], {
          ...childProps
        });
      })
    })]
  });
};
Tabs.displayName = 'Tabs';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tabs);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Toast.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Toast.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_hooks_useTimeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/hooks/useTimeout */ "./node_modules/@restart/hooks/esm/useTimeout.js");
/* harmony import */ var _ToastFade__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ToastFade */ "./node_modules/react-bootstrap/esm/ToastFade.js");
/* harmony import */ var _ToastHeader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ToastHeader */ "./node_modules/react-bootstrap/esm/ToastHeader.js");
/* harmony import */ var _ToastBody__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ToastBody */ "./node_modules/react-bootstrap/esm/ToastBody.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _ToastContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ToastContext */ "./node_modules/react-bootstrap/esm/ToastContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";











const Toast = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  bsPrefix,
  className,
  transition: Transition = _ToastFade__WEBPACK_IMPORTED_MODULE_4__["default"],
  show = true,
  animation = true,
  delay = 5000,
  autohide = false,
  onClose,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  bg,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.useBootstrapPrefix)(bsPrefix, 'toast');

  // We use refs for these, because we don't want to restart the autohide
  // timer in case these values change.
  const delayRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(delay);
  const onCloseRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onClose);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    delayRef.current = delay;
    onCloseRef.current = onClose;
  }, [delay, onClose]);
  const autohideTimeout = (0,_restart_hooks_useTimeout__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const autohideToast = !!(autohide && show);
  const autohideFunc = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (autohideToast) {
      onCloseRef.current == null || onCloseRef.current();
    }
  }, [autohideToast]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Only reset timer if show or autohide changes.
    autohideTimeout.set(autohideFunc, delayRef.current);
  }, [autohideTimeout, autohideFunc]);
  const toastContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    onClose
  }), [onClose]);
  const hasAnimation = !!(Transition && animation);
  const toast = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    ...props,
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(bsPrefix, className, bg && `bg-${bg}`, !hasAnimation && (show ? 'show' : 'hide')),
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ToastContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
    value: toastContext,
    children: hasAnimation && Transition ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Transition, {
      in: show,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered,
      onExit: onExit,
      onExiting: onExiting,
      onExited: onExited,
      unmountOnExit: true,
      children: toast
    }) : toast
  });
});
Toast.displayName = 'Toast';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Toast, {
  Body: _ToastBody__WEBPACK_IMPORTED_MODULE_7__["default"],
  Header: _ToastHeader__WEBPACK_IMPORTED_MODULE_8__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToastBody.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToastBody.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const ToastBody = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'toast-body');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, bsPrefix),
    ...props
  });
});
ToastBody.displayName = 'ToastBody';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToastBody);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToastContainer.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToastContainer.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const positionClasses = {
  'top-start': 'top-0 start-0',
  'top-center': 'top-0 start-50 translate-middle-x',
  'top-end': 'top-0 end-0',
  'middle-start': 'top-50 start-0 translate-middle-y',
  'middle-center': 'top-50 start-50 translate-middle',
  'middle-end': 'top-50 end-0 translate-middle-y',
  'bottom-start': 'bottom-0 start-0',
  'bottom-center': 'bottom-0 start-50 translate-middle-x',
  'bottom-end': 'bottom-0 end-0'
};
const ToastContainer = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  position,
  containerPosition,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'toast-container');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(bsPrefix, position && positionClasses[position], containerPosition && `position-${containerPosition}`, className)
  });
});
ToastContainer.displayName = 'ToastContainer';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToastContainer);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToastContext.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToastContext.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
"use client";


const ToastContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose() {}
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToastContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToastFade.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToastFade.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group/Transition */ "./node_modules/react-transition-group/esm/Transition.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




const fadeStyles = {
  [react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2__.ENTERING]: 'showing',
  [react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2__.EXITING]: 'showing show'
};
const ToastFade = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Fade__WEBPACK_IMPORTED_MODULE_3__["default"], {
  ...props,
  ref: ref,
  transitionClasses: fadeStyles
}));
ToastFade.displayName = 'ToastFade';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToastFade);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToastHeader.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToastHeader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/esm/CloseButton.js");
/* harmony import */ var _ToastContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ToastContext */ "./node_modules/react-bootstrap/esm/ToastContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";










const ToastHeader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  closeLabel = 'Close',
  closeVariant,
  closeButton = true,
  className,
  children,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'toast-header');
  const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_ToastContext__WEBPACK_IMPORTED_MODULE_5__["default"]);
  const handleClick = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_2__["default"])(e => {
    context == null || context.onClose == null || context.onClose(e);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(bsPrefix, className),
    children: [children, closeButton && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_CloseButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
      "aria-label": closeLabel,
      variant: closeVariant,
      onClick: handleClick,
      "data-dismiss": "toast"
    })]
  });
});
ToastHeader.displayName = 'ToastHeader';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToastHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToggleButton.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToggleButton.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";








const noop = () => undefined;
const ToggleButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  name,
  className,
  checked,
  type,
  onChange,
  value,
  disabled,
  id,
  inputRef,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'btn-check');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
      className: bsPrefix,
      name: name,
      type: type,
      value: value,
      ref: inputRef,
      autoComplete: "off",
      checked: !!checked,
      disabled: !!disabled,
      onChange: onChange || noop,
      id: id
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ...props,
      ref: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, disabled && 'disabled'),
      type: undefined,
      role: undefined,
      as: "label",
      htmlFor: id
    })]
  });
});
ToggleButton.displayName = 'ToggleButton';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToggleButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToggleButtonGroup.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToggleButtonGroup.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/lib/esm/index.js");
/* harmony import */ var _createChainedFunction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createChainedFunction */ "./node_modules/react-bootstrap/esm/createChainedFunction.js");
/* harmony import */ var _ElementChildren__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ElementChildren */ "./node_modules/react-bootstrap/esm/ElementChildren.js");
/* harmony import */ var _ButtonGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ButtonGroup */ "./node_modules/react-bootstrap/esm/ButtonGroup.js");
/* harmony import */ var _ToggleButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ToggleButton */ "./node_modules/react-bootstrap/esm/ToggleButton.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








const ToggleButtonGroup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {
  const {
    children,
    type = 'radio',
    name,
    value,
    onChange,
    vertical = false,
    ...controlledProps
  } = (0,uncontrollable__WEBPACK_IMPORTED_MODULE_2__.useUncontrolled)(props, {
    value: 'onChange'
  });
  const getValues = () => value == null ? [] : [].concat(value);
  const handleToggle = (inputVal, event) => {
    if (!onChange) {
      return;
    }
    const values = getValues();
    const isActive = values.indexOf(inputVal) !== -1;
    if (type === 'radio') {
      if (!isActive) onChange(inputVal, event);
      return;
    }
    if (isActive) {
      onChange(values.filter(n => n !== inputVal), event);
    } else {
      onChange([...values, inputVal], event);
    }
  };
  !(type !== 'radio' || !!name) ?  true ? invariant__WEBPACK_IMPORTED_MODULE_1___default()(false, 'A `name` is required to group the toggle buttons when the `type` ' + 'is set to "radio"') : 0 : void 0;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ...controlledProps,
    ref: ref,
    vertical: vertical,
    children: (0,_ElementChildren__WEBPACK_IMPORTED_MODULE_5__.map)(children, child => {
      const values = getValues();
      const {
        value: childVal,
        onChange: childOnChange
      } = child.props;
      const handler = e => handleToggle(childVal, e);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child, {
        type,
        name: child.name || name,
        checked: values.indexOf(childVal) !== -1,
        onChange: (0,_createChainedFunction__WEBPACK_IMPORTED_MODULE_6__["default"])(childOnChange, handler)
      });
    })
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(ToggleButtonGroup, {
  Button: _ToggleButton__WEBPACK_IMPORTED_MODULE_7__["default"]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Tooltip.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Tooltip.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./node_modules/react-bootstrap/esm/helpers.js");
/* harmony import */ var _getInitialPopperStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getInitialPopperStyles */ "./node_modules/react-bootstrap/esm/getInitialPopperStyles.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";








const Tooltip = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  placement = 'right',
  className,
  style,
  children,
  arrowProps,
  hasDoneInitialMeasure,
  popper,
  show,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'tooltip');
  const isRTL = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useIsRTL)();
  const [primaryPlacement] = (placement == null ? void 0 : placement.split('-')) || [];
  const bsDirection = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.getOverlayDirection)(primaryPlacement, isRTL);
  let computedStyle = style;
  if (show && !hasDoneInitialMeasure) {
    computedStyle = {
      ...style,
      ...(0,_getInitialPopperStyles__WEBPACK_IMPORTED_MODULE_5__["default"])(popper == null ? void 0 : popper.strategy)
    };
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    ref: ref,
    style: computedStyle,
    role: "tooltip",
    "x-placement": primaryPlacement,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, bsPrefix, `bs-tooltip-${bsDirection}`),
    ...props,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "tooltip-arrow",
      ...arrowProps
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: `${bsPrefix}-inner`,
      children: children
    })]
  });
});
Tooltip.displayName = 'Tooltip';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Tooltip, {
  // Default tooltip offset.
  // https://github.com/twbs/bootstrap/blob/beca2a6c7f6bc88b6449339fc76edcda832c59e5/js/src/tooltip.js#L65
  TOOLTIP_OFFSET: [0, 6]
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/createUtilityClasses.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/createUtilityClasses.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createUtilityClassName),
/* harmony export */   responsivePropType: () => (/* binding */ responsivePropType)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");


function responsivePropType(propType) {
  return prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([propType, prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
    xs: propType,
    sm: propType,
    md: propType,
    lg: propType,
    xl: propType,
    xxl: propType
  })]);
}
function createUtilityClassName(utilityValues, breakpoints = _ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_BREAKPOINTS, minBreakpoint = _ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_MIN_BREAKPOINT) {
  const classes = [];
  Object.entries(utilityValues).forEach(([utilName, utilValue]) => {
    if (utilValue != null) {
      if (typeof utilValue === 'object') {
        breakpoints.forEach(brkPoint => {
          const bpValue = utilValue[brkPoint];
          if (bpValue != null) {
            const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
            classes.push(`${utilName}${infix}-${bpValue}`);
          }
        });
      } else {
        classes.push(`${utilName}-${utilValue}`);
      }
    }
  });
  return classes;
}

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/getInitialPopperStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/getInitialPopperStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getInitialPopperStyles)
/* harmony export */ });
function getInitialPopperStyles(position = 'absolute') {
  return {
    position,
    top: '0',
    left: '0',
    opacity: '0',
    pointerEvents: 'none'
  };
}

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/getTabTransitionComponent.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/getTabTransitionComponent.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTabTransitionComponent)
/* harmony export */ });
/* harmony import */ var _restart_ui_NoopTransition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @restart/ui/NoopTransition */ "./node_modules/@restart/ui/esm/NoopTransition.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");


function getTabTransitionComponent(transition) {
  if (typeof transition === 'boolean') {
    return transition ? _Fade__WEBPACK_IMPORTED_MODULE_0__["default"] : _restart_ui_NoopTransition__WEBPACK_IMPORTED_MODULE_1__["default"];
  }
  return transition;
}

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/helpers.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/helpers.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BsPrefixComponent: () => (/* binding */ BsPrefixComponent),
/* harmony export */   getOverlayDirection: () => (/* binding */ getOverlayDirection)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class BsPrefixComponent extends react__WEBPACK_IMPORTED_MODULE_0__.Component {}

// Need to use this instead of typeof Component to get proper type checking.

function getOverlayDirection(placement, isRTL) {
  let bsDirection = placement;
  if (placement === 'left') {
    bsDirection = isRTL ? 'end' : 'start';
  } else if (placement === 'right') {
    bsDirection = isRTL ? 'start' : 'end';
  }
  return bsDirection;
}

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Accordion: () => (/* reexport safe */ _Accordion__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   AccordionBody: () => (/* reexport safe */ _AccordionBody__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   AccordionButton: () => (/* reexport safe */ _AccordionButton__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   AccordionCollapse: () => (/* reexport safe */ _AccordionCollapse__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   AccordionContext: () => (/* reexport safe */ _AccordionContext__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   AccordionHeader: () => (/* reexport safe */ _AccordionHeader__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   AccordionItem: () => (/* reexport safe */ _AccordionItem__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   Alert: () => (/* reexport safe */ _Alert__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   AlertHeading: () => (/* reexport safe */ _AlertHeading__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   AlertLink: () => (/* reexport safe */ _AlertLink__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   Anchor: () => (/* reexport safe */ _Anchor__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   Badge: () => (/* reexport safe */ _Badge__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   Breadcrumb: () => (/* reexport safe */ _Breadcrumb__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   BreadcrumbItem: () => (/* reexport safe */ _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   Button: () => (/* reexport safe */ _Button__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   ButtonGroup: () => (/* reexport safe */ _ButtonGroup__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   ButtonToolbar: () => (/* reexport safe */ _ButtonToolbar__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   Card: () => (/* reexport safe */ _Card__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   CardBody: () => (/* reexport safe */ _CardBody__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   CardFooter: () => (/* reexport safe */ _CardFooter__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   CardGroup: () => (/* reexport safe */ _CardGroup__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   CardHeader: () => (/* reexport safe */ _CardHeader__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   CardImg: () => (/* reexport safe */ _CardImg__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   CardImgOverlay: () => (/* reexport safe */ _CardImgOverlay__WEBPACK_IMPORTED_MODULE_23__["default"]),
/* harmony export */   CardLink: () => (/* reexport safe */ _CardLink__WEBPACK_IMPORTED_MODULE_24__["default"]),
/* harmony export */   CardSubtitle: () => (/* reexport safe */ _CardSubtitle__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   CardText: () => (/* reexport safe */ _CardText__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   CardTitle: () => (/* reexport safe */ _CardTitle__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   Carousel: () => (/* reexport safe */ _Carousel__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   CarouselCaption: () => (/* reexport safe */ _CarouselCaption__WEBPACK_IMPORTED_MODULE_29__["default"]),
/* harmony export */   CarouselItem: () => (/* reexport safe */ _CarouselItem__WEBPACK_IMPORTED_MODULE_30__["default"]),
/* harmony export */   CloseButton: () => (/* reexport safe */ _CloseButton__WEBPACK_IMPORTED_MODULE_31__["default"]),
/* harmony export */   Col: () => (/* reexport safe */ _Col__WEBPACK_IMPORTED_MODULE_32__["default"]),
/* harmony export */   Collapse: () => (/* reexport safe */ _Collapse__WEBPACK_IMPORTED_MODULE_33__["default"]),
/* harmony export */   Container: () => (/* reexport safe */ _Container__WEBPACK_IMPORTED_MODULE_34__["default"]),
/* harmony export */   Dropdown: () => (/* reexport safe */ _Dropdown__WEBPACK_IMPORTED_MODULE_35__["default"]),
/* harmony export */   DropdownButton: () => (/* reexport safe */ _DropdownButton__WEBPACK_IMPORTED_MODULE_36__["default"]),
/* harmony export */   DropdownDivider: () => (/* reexport safe */ _DropdownDivider__WEBPACK_IMPORTED_MODULE_37__["default"]),
/* harmony export */   DropdownHeader: () => (/* reexport safe */ _DropdownHeader__WEBPACK_IMPORTED_MODULE_38__["default"]),
/* harmony export */   DropdownItem: () => (/* reexport safe */ _DropdownItem__WEBPACK_IMPORTED_MODULE_39__["default"]),
/* harmony export */   DropdownItemText: () => (/* reexport safe */ _DropdownItemText__WEBPACK_IMPORTED_MODULE_40__["default"]),
/* harmony export */   DropdownMenu: () => (/* reexport safe */ _DropdownMenu__WEBPACK_IMPORTED_MODULE_41__["default"]),
/* harmony export */   DropdownToggle: () => (/* reexport safe */ _DropdownToggle__WEBPACK_IMPORTED_MODULE_42__["default"]),
/* harmony export */   Fade: () => (/* reexport safe */ _Fade__WEBPACK_IMPORTED_MODULE_43__["default"]),
/* harmony export */   Figure: () => (/* reexport safe */ _Figure__WEBPACK_IMPORTED_MODULE_44__["default"]),
/* harmony export */   FigureCaption: () => (/* reexport safe */ _FigureCaption__WEBPACK_IMPORTED_MODULE_45__["default"]),
/* harmony export */   FigureImage: () => (/* reexport safe */ _FigureImage__WEBPACK_IMPORTED_MODULE_46__["default"]),
/* harmony export */   FloatingLabel: () => (/* reexport safe */ _FloatingLabel__WEBPACK_IMPORTED_MODULE_51__["default"]),
/* harmony export */   Form: () => (/* reexport safe */ _Form__WEBPACK_IMPORTED_MODULE_47__["default"]),
/* harmony export */   FormCheck: () => (/* reexport safe */ _FormCheck__WEBPACK_IMPORTED_MODULE_49__["default"]),
/* harmony export */   FormControl: () => (/* reexport safe */ _FormControl__WEBPACK_IMPORTED_MODULE_48__["default"]),
/* harmony export */   FormFloating: () => (/* reexport safe */ _FormFloating__WEBPACK_IMPORTED_MODULE_50__["default"]),
/* harmony export */   FormGroup: () => (/* reexport safe */ _FormGroup__WEBPACK_IMPORTED_MODULE_52__["default"]),
/* harmony export */   FormLabel: () => (/* reexport safe */ _FormLabel__WEBPACK_IMPORTED_MODULE_53__["default"]),
/* harmony export */   FormSelect: () => (/* reexport safe */ _FormSelect__WEBPACK_IMPORTED_MODULE_55__["default"]),
/* harmony export */   FormText: () => (/* reexport safe */ _FormText__WEBPACK_IMPORTED_MODULE_54__["default"]),
/* harmony export */   Image: () => (/* reexport safe */ _Image__WEBPACK_IMPORTED_MODULE_56__["default"]),
/* harmony export */   InputGroup: () => (/* reexport safe */ _InputGroup__WEBPACK_IMPORTED_MODULE_57__["default"]),
/* harmony export */   ListGroup: () => (/* reexport safe */ _ListGroup__WEBPACK_IMPORTED_MODULE_58__["default"]),
/* harmony export */   ListGroupItem: () => (/* reexport safe */ _ListGroupItem__WEBPACK_IMPORTED_MODULE_59__["default"]),
/* harmony export */   Modal: () => (/* reexport safe */ _Modal__WEBPACK_IMPORTED_MODULE_60__["default"]),
/* harmony export */   ModalBody: () => (/* reexport safe */ _ModalBody__WEBPACK_IMPORTED_MODULE_61__["default"]),
/* harmony export */   ModalDialog: () => (/* reexport safe */ _ModalDialog__WEBPACK_IMPORTED_MODULE_62__["default"]),
/* harmony export */   ModalFooter: () => (/* reexport safe */ _ModalFooter__WEBPACK_IMPORTED_MODULE_63__["default"]),
/* harmony export */   ModalHeader: () => (/* reexport safe */ _ModalHeader__WEBPACK_IMPORTED_MODULE_64__["default"]),
/* harmony export */   ModalTitle: () => (/* reexport safe */ _ModalTitle__WEBPACK_IMPORTED_MODULE_65__["default"]),
/* harmony export */   Nav: () => (/* reexport safe */ _Nav__WEBPACK_IMPORTED_MODULE_66__["default"]),
/* harmony export */   NavDropdown: () => (/* reexport safe */ _NavDropdown__WEBPACK_IMPORTED_MODULE_73__["default"]),
/* harmony export */   NavItem: () => (/* reexport safe */ _NavItem__WEBPACK_IMPORTED_MODULE_74__["default"]),
/* harmony export */   NavLink: () => (/* reexport safe */ _NavLink__WEBPACK_IMPORTED_MODULE_75__["default"]),
/* harmony export */   Navbar: () => (/* reexport safe */ _Navbar__WEBPACK_IMPORTED_MODULE_67__["default"]),
/* harmony export */   NavbarBrand: () => (/* reexport safe */ _NavbarBrand__WEBPACK_IMPORTED_MODULE_68__["default"]),
/* harmony export */   NavbarCollapse: () => (/* reexport safe */ _NavbarCollapse__WEBPACK_IMPORTED_MODULE_69__["default"]),
/* harmony export */   NavbarOffcanvas: () => (/* reexport safe */ _NavbarOffcanvas__WEBPACK_IMPORTED_MODULE_70__["default"]),
/* harmony export */   NavbarText: () => (/* reexport safe */ _NavbarText__WEBPACK_IMPORTED_MODULE_71__["default"]),
/* harmony export */   NavbarToggle: () => (/* reexport safe */ _NavbarToggle__WEBPACK_IMPORTED_MODULE_72__["default"]),
/* harmony export */   Offcanvas: () => (/* reexport safe */ _Offcanvas__WEBPACK_IMPORTED_MODULE_76__["default"]),
/* harmony export */   OffcanvasBody: () => (/* reexport safe */ _OffcanvasBody__WEBPACK_IMPORTED_MODULE_77__["default"]),
/* harmony export */   OffcanvasHeader: () => (/* reexport safe */ _OffcanvasHeader__WEBPACK_IMPORTED_MODULE_78__["default"]),
/* harmony export */   OffcanvasTitle: () => (/* reexport safe */ _OffcanvasTitle__WEBPACK_IMPORTED_MODULE_79__["default"]),
/* harmony export */   OffcanvasToggling: () => (/* reexport safe */ _OffcanvasToggling__WEBPACK_IMPORTED_MODULE_80__["default"]),
/* harmony export */   Overlay: () => (/* reexport safe */ _Overlay__WEBPACK_IMPORTED_MODULE_81__["default"]),
/* harmony export */   OverlayTrigger: () => (/* reexport safe */ _OverlayTrigger__WEBPACK_IMPORTED_MODULE_82__["default"]),
/* harmony export */   PageItem: () => (/* reexport safe */ _PageItem__WEBPACK_IMPORTED_MODULE_83__["default"]),
/* harmony export */   Pagination: () => (/* reexport safe */ _Pagination__WEBPACK_IMPORTED_MODULE_84__["default"]),
/* harmony export */   Placeholder: () => (/* reexport safe */ _Placeholder__WEBPACK_IMPORTED_MODULE_85__["default"]),
/* harmony export */   PlaceholderButton: () => (/* reexport safe */ _PlaceholderButton__WEBPACK_IMPORTED_MODULE_86__["default"]),
/* harmony export */   Popover: () => (/* reexport safe */ _Popover__WEBPACK_IMPORTED_MODULE_87__["default"]),
/* harmony export */   PopoverBody: () => (/* reexport safe */ _PopoverBody__WEBPACK_IMPORTED_MODULE_88__["default"]),
/* harmony export */   PopoverHeader: () => (/* reexport safe */ _PopoverHeader__WEBPACK_IMPORTED_MODULE_89__["default"]),
/* harmony export */   ProgressBar: () => (/* reexport safe */ _ProgressBar__WEBPACK_IMPORTED_MODULE_90__["default"]),
/* harmony export */   Ratio: () => (/* reexport safe */ _Ratio__WEBPACK_IMPORTED_MODULE_91__["default"]),
/* harmony export */   Row: () => (/* reexport safe */ _Row__WEBPACK_IMPORTED_MODULE_92__["default"]),
/* harmony export */   SSRProvider: () => (/* reexport safe */ _SSRProvider__WEBPACK_IMPORTED_MODULE_95__["default"]),
/* harmony export */   Spinner: () => (/* reexport safe */ _Spinner__WEBPACK_IMPORTED_MODULE_93__["default"]),
/* harmony export */   SplitButton: () => (/* reexport safe */ _SplitButton__WEBPACK_IMPORTED_MODULE_94__["default"]),
/* harmony export */   Stack: () => (/* reexport safe */ _Stack__WEBPACK_IMPORTED_MODULE_96__["default"]),
/* harmony export */   Tab: () => (/* reexport safe */ _Tab__WEBPACK_IMPORTED_MODULE_97__["default"]),
/* harmony export */   TabContainer: () => (/* reexport safe */ _TabContainer__WEBPACK_IMPORTED_MODULE_98__["default"]),
/* harmony export */   TabContent: () => (/* reexport safe */ _TabContent__WEBPACK_IMPORTED_MODULE_99__["default"]),
/* harmony export */   TabPane: () => (/* reexport safe */ _TabPane__WEBPACK_IMPORTED_MODULE_101__["default"]),
/* harmony export */   Table: () => (/* reexport safe */ _Table__WEBPACK_IMPORTED_MODULE_100__["default"]),
/* harmony export */   Tabs: () => (/* reexport safe */ _Tabs__WEBPACK_IMPORTED_MODULE_102__["default"]),
/* harmony export */   ThemeProvider: () => (/* reexport safe */ _ThemeProvider__WEBPACK_IMPORTED_MODULE_103__["default"]),
/* harmony export */   Toast: () => (/* reexport safe */ _Toast__WEBPACK_IMPORTED_MODULE_104__["default"]),
/* harmony export */   ToastBody: () => (/* reexport safe */ _ToastBody__WEBPACK_IMPORTED_MODULE_105__["default"]),
/* harmony export */   ToastContainer: () => (/* reexport safe */ _ToastContainer__WEBPACK_IMPORTED_MODULE_106__["default"]),
/* harmony export */   ToastHeader: () => (/* reexport safe */ _ToastHeader__WEBPACK_IMPORTED_MODULE_107__["default"]),
/* harmony export */   ToggleButton: () => (/* reexport safe */ _ToggleButton__WEBPACK_IMPORTED_MODULE_108__["default"]),
/* harmony export */   ToggleButtonGroup: () => (/* reexport safe */ _ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_109__["default"]),
/* harmony export */   Tooltip: () => (/* reexport safe */ _Tooltip__WEBPACK_IMPORTED_MODULE_110__["default"]),
/* harmony export */   useAccordionButton: () => (/* reexport safe */ _AccordionButton__WEBPACK_IMPORTED_MODULE_3__.useAccordionButton)
/* harmony export */ });
/* harmony import */ var _Accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Accordion */ "./node_modules/react-bootstrap/esm/Accordion.js");
/* harmony import */ var _AccordionContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccordionContext */ "./node_modules/react-bootstrap/esm/AccordionContext.js");
/* harmony import */ var _AccordionCollapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AccordionCollapse */ "./node_modules/react-bootstrap/esm/AccordionCollapse.js");
/* harmony import */ var _AccordionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AccordionButton */ "./node_modules/react-bootstrap/esm/AccordionButton.js");
/* harmony import */ var _AccordionBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AccordionBody */ "./node_modules/react-bootstrap/esm/AccordionBody.js");
/* harmony import */ var _AccordionHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AccordionHeader */ "./node_modules/react-bootstrap/esm/AccordionHeader.js");
/* harmony import */ var _AccordionItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AccordionItem */ "./node_modules/react-bootstrap/esm/AccordionItem.js");
/* harmony import */ var _Alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Alert */ "./node_modules/react-bootstrap/esm/Alert.js");
/* harmony import */ var _AlertHeading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AlertHeading */ "./node_modules/react-bootstrap/esm/AlertHeading.js");
/* harmony import */ var _AlertLink__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AlertLink */ "./node_modules/react-bootstrap/esm/AlertLink.js");
/* harmony import */ var _Anchor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Anchor */ "./node_modules/react-bootstrap/esm/Anchor.js");
/* harmony import */ var _Badge__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Badge */ "./node_modules/react-bootstrap/esm/Badge.js");
/* harmony import */ var _Breadcrumb__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Breadcrumb */ "./node_modules/react-bootstrap/esm/Breadcrumb.js");
/* harmony import */ var _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./BreadcrumbItem */ "./node_modules/react-bootstrap/esm/BreadcrumbItem.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony import */ var _ButtonGroup__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ButtonGroup */ "./node_modules/react-bootstrap/esm/ButtonGroup.js");
/* harmony import */ var _ButtonToolbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ButtonToolbar */ "./node_modules/react-bootstrap/esm/ButtonToolbar.js");
/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Card */ "./node_modules/react-bootstrap/esm/Card.js");
/* harmony import */ var _CardBody__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./CardBody */ "./node_modules/react-bootstrap/esm/CardBody.js");
/* harmony import */ var _CardFooter__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./CardFooter */ "./node_modules/react-bootstrap/esm/CardFooter.js");
/* harmony import */ var _CardGroup__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./CardGroup */ "./node_modules/react-bootstrap/esm/CardGroup.js");
/* harmony import */ var _CardHeader__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./CardHeader */ "./node_modules/react-bootstrap/esm/CardHeader.js");
/* harmony import */ var _CardImg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./CardImg */ "./node_modules/react-bootstrap/esm/CardImg.js");
/* harmony import */ var _CardImgOverlay__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./CardImgOverlay */ "./node_modules/react-bootstrap/esm/CardImgOverlay.js");
/* harmony import */ var _CardLink__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./CardLink */ "./node_modules/react-bootstrap/esm/CardLink.js");
/* harmony import */ var _CardSubtitle__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./CardSubtitle */ "./node_modules/react-bootstrap/esm/CardSubtitle.js");
/* harmony import */ var _CardText__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./CardText */ "./node_modules/react-bootstrap/esm/CardText.js");
/* harmony import */ var _CardTitle__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./CardTitle */ "./node_modules/react-bootstrap/esm/CardTitle.js");
/* harmony import */ var _Carousel__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./Carousel */ "./node_modules/react-bootstrap/esm/Carousel.js");
/* harmony import */ var _CarouselCaption__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./CarouselCaption */ "./node_modules/react-bootstrap/esm/CarouselCaption.js");
/* harmony import */ var _CarouselItem__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./CarouselItem */ "./node_modules/react-bootstrap/esm/CarouselItem.js");
/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/esm/CloseButton.js");
/* harmony import */ var _Col__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./Col */ "./node_modules/react-bootstrap/esm/Col.js");
/* harmony import */ var _Collapse__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./Collapse */ "./node_modules/react-bootstrap/esm/Collapse.js");
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./Container */ "./node_modules/react-bootstrap/esm/Container.js");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/esm/Dropdown.js");
/* harmony import */ var _DropdownButton__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./DropdownButton */ "./node_modules/react-bootstrap/esm/DropdownButton.js");
/* harmony import */ var _DropdownDivider__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./DropdownDivider */ "./node_modules/react-bootstrap/esm/DropdownDivider.js");
/* harmony import */ var _DropdownHeader__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./DropdownHeader */ "./node_modules/react-bootstrap/esm/DropdownHeader.js");
/* harmony import */ var _DropdownItem__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./DropdownItem */ "./node_modules/react-bootstrap/esm/DropdownItem.js");
/* harmony import */ var _DropdownItemText__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./DropdownItemText */ "./node_modules/react-bootstrap/esm/DropdownItemText.js");
/* harmony import */ var _DropdownMenu__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./DropdownMenu */ "./node_modules/react-bootstrap/esm/DropdownMenu.js");
/* harmony import */ var _DropdownToggle__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./DropdownToggle */ "./node_modules/react-bootstrap/esm/DropdownToggle.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony import */ var _Figure__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./Figure */ "./node_modules/react-bootstrap/esm/Figure.js");
/* harmony import */ var _FigureCaption__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./FigureCaption */ "./node_modules/react-bootstrap/esm/FigureCaption.js");
/* harmony import */ var _FigureImage__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./FigureImage */ "./node_modules/react-bootstrap/esm/FigureImage.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./Form */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var _FormControl__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./FormControl */ "./node_modules/react-bootstrap/esm/FormControl.js");
/* harmony import */ var _FormCheck__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./FormCheck */ "./node_modules/react-bootstrap/esm/FormCheck.js");
/* harmony import */ var _FormFloating__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./FormFloating */ "./node_modules/react-bootstrap/esm/FormFloating.js");
/* harmony import */ var _FloatingLabel__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./FloatingLabel */ "./node_modules/react-bootstrap/esm/FloatingLabel.js");
/* harmony import */ var _FormGroup__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./FormGroup */ "./node_modules/react-bootstrap/esm/FormGroup.js");
/* harmony import */ var _FormLabel__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./FormLabel */ "./node_modules/react-bootstrap/esm/FormLabel.js");
/* harmony import */ var _FormText__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./FormText */ "./node_modules/react-bootstrap/esm/FormText.js");
/* harmony import */ var _FormSelect__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./FormSelect */ "./node_modules/react-bootstrap/esm/FormSelect.js");
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./Image */ "./node_modules/react-bootstrap/esm/Image.js");
/* harmony import */ var _InputGroup__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./InputGroup */ "./node_modules/react-bootstrap/esm/InputGroup.js");
/* harmony import */ var _ListGroup__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./ListGroup */ "./node_modules/react-bootstrap/esm/ListGroup.js");
/* harmony import */ var _ListGroupItem__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./ListGroupItem */ "./node_modules/react-bootstrap/esm/ListGroupItem.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./Modal */ "./node_modules/react-bootstrap/esm/Modal.js");
/* harmony import */ var _ModalBody__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./ModalBody */ "./node_modules/react-bootstrap/esm/ModalBody.js");
/* harmony import */ var _ModalDialog__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./ModalDialog */ "./node_modules/react-bootstrap/esm/ModalDialog.js");
/* harmony import */ var _ModalFooter__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./ModalFooter */ "./node_modules/react-bootstrap/esm/ModalFooter.js");
/* harmony import */ var _ModalHeader__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./ModalHeader */ "./node_modules/react-bootstrap/esm/ModalHeader.js");
/* harmony import */ var _ModalTitle__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./ModalTitle */ "./node_modules/react-bootstrap/esm/ModalTitle.js");
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./Nav */ "./node_modules/react-bootstrap/esm/Nav.js");
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./Navbar */ "./node_modules/react-bootstrap/esm/Navbar.js");
/* harmony import */ var _NavbarBrand__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./NavbarBrand */ "./node_modules/react-bootstrap/esm/NavbarBrand.js");
/* harmony import */ var _NavbarCollapse__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./NavbarCollapse */ "./node_modules/react-bootstrap/esm/NavbarCollapse.js");
/* harmony import */ var _NavbarOffcanvas__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./NavbarOffcanvas */ "./node_modules/react-bootstrap/esm/NavbarOffcanvas.js");
/* harmony import */ var _NavbarText__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./NavbarText */ "./node_modules/react-bootstrap/esm/NavbarText.js");
/* harmony import */ var _NavbarToggle__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./NavbarToggle */ "./node_modules/react-bootstrap/esm/NavbarToggle.js");
/* harmony import */ var _NavDropdown__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./NavDropdown */ "./node_modules/react-bootstrap/esm/NavDropdown.js");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./NavItem */ "./node_modules/react-bootstrap/esm/NavItem.js");
/* harmony import */ var _NavLink__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./NavLink */ "./node_modules/react-bootstrap/esm/NavLink.js");
/* harmony import */ var _Offcanvas__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./Offcanvas */ "./node_modules/react-bootstrap/esm/Offcanvas.js");
/* harmony import */ var _OffcanvasBody__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./OffcanvasBody */ "./node_modules/react-bootstrap/esm/OffcanvasBody.js");
/* harmony import */ var _OffcanvasHeader__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./OffcanvasHeader */ "./node_modules/react-bootstrap/esm/OffcanvasHeader.js");
/* harmony import */ var _OffcanvasTitle__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./OffcanvasTitle */ "./node_modules/react-bootstrap/esm/OffcanvasTitle.js");
/* harmony import */ var _OffcanvasToggling__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./OffcanvasToggling */ "./node_modules/react-bootstrap/esm/OffcanvasToggling.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./Overlay */ "./node_modules/react-bootstrap/esm/Overlay.js");
/* harmony import */ var _OverlayTrigger__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./OverlayTrigger */ "./node_modules/react-bootstrap/esm/OverlayTrigger.js");
/* harmony import */ var _PageItem__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./PageItem */ "./node_modules/react-bootstrap/esm/PageItem.js");
/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./Pagination */ "./node_modules/react-bootstrap/esm/Pagination.js");
/* harmony import */ var _Placeholder__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./Placeholder */ "./node_modules/react-bootstrap/esm/Placeholder.js");
/* harmony import */ var _PlaceholderButton__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./PlaceholderButton */ "./node_modules/react-bootstrap/esm/PlaceholderButton.js");
/* harmony import */ var _Popover__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./Popover */ "./node_modules/react-bootstrap/esm/Popover.js");
/* harmony import */ var _PopoverBody__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./PopoverBody */ "./node_modules/react-bootstrap/esm/PopoverBody.js");
/* harmony import */ var _PopoverHeader__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./PopoverHeader */ "./node_modules/react-bootstrap/esm/PopoverHeader.js");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./ProgressBar */ "./node_modules/react-bootstrap/esm/ProgressBar.js");
/* harmony import */ var _Ratio__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./Ratio */ "./node_modules/react-bootstrap/esm/Ratio.js");
/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./Row */ "./node_modules/react-bootstrap/esm/Row.js");
/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./Spinner */ "./node_modules/react-bootstrap/esm/Spinner.js");
/* harmony import */ var _SplitButton__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./SplitButton */ "./node_modules/react-bootstrap/esm/SplitButton.js");
/* harmony import */ var _SSRProvider__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./SSRProvider */ "./node_modules/react-bootstrap/esm/SSRProvider.js");
/* harmony import */ var _Stack__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./Stack */ "./node_modules/react-bootstrap/esm/Stack.js");
/* harmony import */ var _Tab__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./Tab */ "./node_modules/react-bootstrap/esm/Tab.js");
/* harmony import */ var _TabContainer__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./TabContainer */ "./node_modules/react-bootstrap/esm/TabContainer.js");
/* harmony import */ var _TabContent__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./TabContent */ "./node_modules/react-bootstrap/esm/TabContent.js");
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./Table */ "./node_modules/react-bootstrap/esm/Table.js");
/* harmony import */ var _TabPane__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./TabPane */ "./node_modules/react-bootstrap/esm/TabPane.js");
/* harmony import */ var _Tabs__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./Tabs */ "./node_modules/react-bootstrap/esm/Tabs.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./Toast */ "./node_modules/react-bootstrap/esm/Toast.js");
/* harmony import */ var _ToastBody__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./ToastBody */ "./node_modules/react-bootstrap/esm/ToastBody.js");
/* harmony import */ var _ToastContainer__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./ToastContainer */ "./node_modules/react-bootstrap/esm/ToastContainer.js");
/* harmony import */ var _ToastHeader__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./ToastHeader */ "./node_modules/react-bootstrap/esm/ToastHeader.js");
/* harmony import */ var _ToggleButton__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./ToggleButton */ "./node_modules/react-bootstrap/esm/ToggleButton.js");
/* harmony import */ var _ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./ToggleButtonGroup */ "./node_modules/react-bootstrap/esm/ToggleButtonGroup.js");
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./Tooltip */ "./node_modules/react-bootstrap/esm/Tooltip.js");
















































































































/***/ }),

/***/ "./node_modules/react-bootstrap/esm/types.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/types.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alignPropType: () => (/* binding */ alignPropType)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

const alignDirection = prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOf(['start', 'end']);
const alignPropType = prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([alignDirection, prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  sm: alignDirection
}), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  md: alignDirection
}), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  lg: alignDirection
}), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  xl: alignDirection
}), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  xxl: alignDirection
}), (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)]);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/useOverlayOffset.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/useOverlayOffset.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useOverlayOffset)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dom_helpers_hasClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/hasClass */ "./node_modules/dom-helpers/esm/hasClass.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _Popover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Popover */ "./node_modules/react-bootstrap/esm/Popover.js");
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tooltip */ "./node_modules/react-bootstrap/esm/Tooltip.js");
"use client";







// This is meant for internal use.
// This applies a custom offset to the overlay if it's a popover or tooltip.
function useOverlayOffset(customOffset) {
  const overlayRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const popoverClass = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.useBootstrapPrefix)(undefined, 'popover');
  const tooltipClass = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.useBootstrapPrefix)(undefined, 'tooltip');
  const offset = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    name: 'offset',
    options: {
      offset: () => {
        if (customOffset) {
          return customOffset;
        }
        if (overlayRef.current) {
          if ((0,dom_helpers_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(overlayRef.current, popoverClass)) {
            return _Popover__WEBPACK_IMPORTED_MODULE_3__["default"].POPPER_OFFSET;
          }
          if ((0,dom_helpers_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(overlayRef.current, tooltipClass)) {
            return _Tooltip__WEBPACK_IMPORTED_MODULE_4__["default"].TOOLTIP_OFFSET;
          }
        }
        return [0, 0];
      }
    }
  }), [customOffset, popoverClass, tooltipClass]);
  return [overlayRef, [offset]];
}

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/usePlaceholder.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/usePlaceholder.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ usePlaceholder)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _Col__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Col */ "./node_modules/react-bootstrap/esm/Col.js");
"use client";




function usePlaceholder({
  animation,
  bg,
  bsPrefix,
  size,
  ...props
}) {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.useBootstrapPrefix)(bsPrefix, 'placeholder');
  const [{
    className,
    ...colProps
  }] = (0,_Col__WEBPACK_IMPORTED_MODULE_2__.useCol)(props);
  return {
    ...colProps,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, animation ? `${bsPrefix}-${animation}` : bsPrefix, size && `${bsPrefix}-${size}`, bg && `bg-${bg}`)
  };
}

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/useWrappedRefWithWarning.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/useWrappedRefWithWarning.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useWrappedRefWithWarning)
/* harmony export */ });
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/hooks/useMergedRefs */ "./node_modules/@restart/hooks/esm/useMergedRefs.js");



function useWrappedRefWithWarning(ref, componentName) {
  // @ts-ignore
  if (false) {}

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const warningRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(refValue => {
    !(refValue == null || !refValue.isReactComponent) ?  true ? invariant__WEBPACK_IMPORTED_MODULE_0___default()(false, `${componentName} injected a ref to a provided \`as\` component that resolved to a component instance instead of a DOM element. ` + 'Use `React.forwardRef` to provide the injected ref to the class component as a prop in order to pass it directly to a DOM element') : 0 : void 0;
  }, [componentName]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (0,_restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_2__["default"])(warningRef, ref);
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_react-bootstrap_esm_Container_js-node_modules_react-bootstrap_esm_Form_j-3b1a02","vendors-node_modules_popperjs_core_lib_createPopper_js-node_modules_popperjs_core_lib_modifie-cefbfd"], () => (__webpack_exec__("./node_modules/react-bootstrap/esm/index.js"), __webpack_exec__("./node_modules/react-router-dom/dist/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsVUFBVSx5QkFBeUIsU0FBUyxHQUFHLEtBQUssZUFBZSxHQUFHO0FBQ3RJO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQmtDO0FBQ0U7QUFDcUI7QUFDMUM7QUFDZjtBQUNBLE1BQU0sS0FBd0MsRUFBRSxFQUFXOztBQUUzRDtBQUNBLHFCQUFxQixrREFBVztBQUNoQyx3REFBd0QsS0FBcUMsR0FBRyxnREFBUyxXQUFXLGVBQWUseVBBQXlQLENBQWdCO0FBQzVZLEdBQUc7QUFDSDtBQUNBLFNBQVMsd0VBQWE7QUFDdEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlYWN0LWFyaWEvc3NyL2Rpc3QvU1NSUHJvdmlkZXIubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC9ob29rcy9lc20vdXNlQ2FsbGJhY2tSZWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VNb3VudGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC9ob29rcy9lc20vdXNlVGltZW91dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvaG9va3MvZXNtL3VzZVVwZGF0ZUVmZmVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvaG9va3MvZXNtL3VzZVVwZGF0ZWRSZWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VXaWxsVW5tb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvZXNtL0FuY2hvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvZXNtL0J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvZXNtL0Ryb3Bkb3duLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9lc20vRHJvcGRvd25Db250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9lc20vRHJvcGRvd25JdGVtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9lc20vRHJvcGRvd25NZW51LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9lc20vRHJvcGRvd25Ub2dnbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L3VpL2VzbS9OYXYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L3VpL2VzbS9OYXZDb250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9lc20vTmF2SXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvZXNtL092ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L3VpL2VzbS9UYWJDb250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9lc20vVGFiUGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L3VpL2VzbS9UYWJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9lc20vbWVyZ2VPcHRpb25zV2l0aFBvcHBlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvZXNtL3BvcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvZXNtL3VzZUNsaWNrT3V0c2lkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvZXNtL3VzZVBvcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvZXNtL3VzZVJvb3RDbG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VDYWxsYmFja1JlZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VFdmVudExpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9ub2RlX21vZHVsZXMvQHJlc3RhcnQvaG9va3MvZXNtL3VzZUZvcmNlVXBkYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9ub2RlX21vZHVsZXMvQHJlc3RhcnQvaG9va3MvZXNtL3VzZUdsb2JhbExpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9ub2RlX21vZHVsZXMvQHJlc3RhcnQvaG9va3MvZXNtL3VzZUltYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9ub2RlX21vZHVsZXMvQHJlc3RhcnQvaG9va3MvZXNtL3VzZUludGVydmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC91aS9ub2RlX21vZHVsZXMvQHJlc3RhcnQvaG9va3MvZXNtL3VzZU1lcmdlU3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L3VpL25vZGVfbW9kdWxlcy9AcmVzdGFydC9ob29rcy9lc20vdXNlTWVyZ2VTdGF0ZUZyb21Qcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VSYWZJbnRlcnZhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VSZXNpemVPYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvdWkvbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VTYWZlU3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L3VpL25vZGVfbW9kdWxlcy91bmNvbnRyb2xsYWJsZS9saWIvZXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZXF1YWwvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2VzbS9zY3JvbGxiYXJTaXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0FjY29yZGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9BY2NvcmRpb25Cb2R5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0FjY29yZGlvbkJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9BY2NvcmRpb25Db2xsYXBzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9BY2NvcmRpb25Db250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0FjY29yZGlvbkhlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9BY2NvcmRpb25JdGVtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0FjY29yZGlvbkl0ZW1Db250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0FsZXJ0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0FsZXJ0SGVhZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9BbGVydExpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQW5jaG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0JhZGdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0JyZWFkY3J1bWIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQnJlYWRjcnVtYkl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQnV0dG9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0J1dHRvbkdyb3VwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0J1dHRvblRvb2xiYXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9DYXJkQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9DYXJkRm9vdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0NhcmRHcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9DYXJkSGVhZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0NhcmRIZWFkZXJDb250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0NhcmRJbWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQ2FyZEltZ092ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQ2FyZExpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQ2FyZFN1YnRpdGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0NhcmRUZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0NhcmRUaXRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9DYXJvdXNlbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9DYXJvdXNlbENhcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQ2Fyb3VzZWxJdGVtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0Ryb3Bkb3duLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0Ryb3Bkb3duQnV0dG9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0Ryb3Bkb3duQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Ecm9wZG93bkRpdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vRHJvcGRvd25IZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vRHJvcGRvd25JdGVtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0Ryb3Bkb3duSXRlbVRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vRHJvcGRvd25NZW51LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0Ryb3Bkb3duVG9nZ2xlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0ZpZ3VyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9GaWd1cmVDYXB0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0ZpZ3VyZUltYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0ltYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0lucHV0R3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vSW5wdXRHcm91cENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vSW5wdXRHcm91cFRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vTGlzdEdyb3VwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0xpc3RHcm91cEl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vTW9kYWxCb2R5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL01vZGFsRGlhbG9nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL01vZGFsRm9vdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL01vZGFsSGVhZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL01vZGFsVGl0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vTmF2LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL05hdkRyb3Bkb3duLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL05hdkl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vTmF2TGluay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9PdmVybGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL092ZXJsYXlUcmlnZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1BhZ2VJdGVtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1BhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vUGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vUGxhY2Vob2xkZXJCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vUG9wb3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Qb3BvdmVyQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Qb3BvdmVySGVhZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1JhdGlvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1NTUlByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1NwaW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vU3BsaXRCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vU3RhY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVGFiLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1RhYkNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9UYWJDb250ZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1RhYlBhbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVGFicy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Ub2FzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Ub2FzdEJvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVG9hc3RDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVG9hc3RDb250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1RvYXN0RmFkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Ub2FzdEhlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Ub2dnbGVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVG9nZ2xlQnV0dG9uR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVG9vbHRpcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9jcmVhdGVVdGlsaXR5Q2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9nZXRJbml0aWFsUG9wcGVyU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL2dldFRhYlRyYW5zaXRpb25Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS91c2VPdmVybGF5T2Zmc2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL3VzZVBsYWNlaG9sZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL3VzZVdyYXBwZWRSZWZXaXRoV2FybmluZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJDY3MGdCJHJlYWN0LCB7dXNlQ29udGV4dCBhcyAkNjcwZ0IkdXNlQ29udGV4dCwgdXNlU3RhdGUgYXMgJDY3MGdCJHVzZVN0YXRlLCB1c2VNZW1vIGFzICQ2NzBnQiR1c2VNZW1vLCB1c2VMYXlvdXRFZmZlY3QgYXMgJDY3MGdCJHVzZUxheW91dEVmZmVjdCwgdXNlUmVmIGFzICQ2NzBnQiR1c2VSZWZ9IGZyb20gXCJyZWFjdFwiO1xuXG4vKlxuICogQ29weXJpZ2h0IDIwMjAgQWRvYmUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGZpbGUgaXMgbGljZW5zZWQgdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlclxuICogdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgUkVQUkVTRU5UQVRJT05TXG4gKiBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2VcbiAqIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi8gLy8gV2UgbXVzdCBhdm9pZCBhIGNpcmN1bGFyIGRlcGVuZGVuY3kgd2l0aCBAcmVhY3QtYXJpYS91dGlscywgYW5kIHRoaXMgdXNlTGF5b3V0RWZmZWN0IGlzXG4vLyBndWFyZGVkIGJ5IGEgY2hlY2sgdGhhdCBpdCBvbmx5IHJ1bnMgb24gdGhlIGNsaWVudCBzaWRlLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJ1bGVzZGlyL3VzZUxheW91dEVmZmVjdFJ1bGVcblxuLy8gRGVmYXVsdCBjb250ZXh0IHZhbHVlIHRvIHVzZSBpbiBjYXNlIHRoZXJlIGlzIG5vIFNTUlByb3ZpZGVyLiBUaGlzIGlzIGZpbmUgZm9yXG4vLyBjbGllbnQtb25seSBhcHBzLiBJbiBvcmRlciB0byBzdXBwb3J0IG11bHRpcGxlIGNvcGllcyBvZiBSZWFjdCBBcmlhIHBvdGVudGlhbGx5XG4vLyBiZWluZyBvbiB0aGUgcGFnZSBhdCBvbmNlLCB0aGUgcHJlZml4IGlzIHNldCB0byBhIHJhbmRvbSBudW1iZXIuIFNTUlByb3ZpZGVyXG4vLyB3aWxsIHJlc2V0IHRoaXMgdG8gemVybyBmb3IgY29uc2lzdGVuY3kgYmV0d2VlbiBzZXJ2ZXIgYW5kIGNsaWVudCwgc28gaW4gdGhlXG4vLyBTU1IgY2FzZSBtdWx0aXBsZSBjb3BpZXMgb2YgUmVhY3QgQXJpYSBpcyBub3Qgc3VwcG9ydGVkLlxuY29uc3QgJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJGRlZmF1bHRDb250ZXh0ID0ge1xuICAgIHByZWZpeDogU3RyaW5nKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDAwKSksXG4gICAgY3VycmVudDogMFxufTtcbmNvbnN0ICRiNWUyNTdkNTY5Njg4YWM2JHZhciRTU1JDb250ZXh0ID0gLyojX19QVVJFX18qLyAoMCwgJDY3MGdCJHJlYWN0KS5jcmVhdGVDb250ZXh0KCRiNWUyNTdkNTY5Njg4YWM2JHZhciRkZWZhdWx0Q29udGV4dCk7XG5jb25zdCAkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkSXNTU1JDb250ZXh0ID0gLyojX19QVVJFX18qLyAoMCwgJDY3MGdCJHJlYWN0KS5jcmVhdGVDb250ZXh0KGZhbHNlKTtcbi8vIFRoaXMgaXMgb25seSB1c2VkIGluIFJlYWN0IDwgMTguXG5mdW5jdGlvbiAkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkTGVnYWN5U1NSUHJvdmlkZXIocHJvcHMpIHtcbiAgICBsZXQgY3VyID0gKDAsICQ2NzBnQiR1c2VDb250ZXh0KSgkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkU1NSQ29udGV4dCk7XG4gICAgbGV0IGNvdW50ZXIgPSAkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkdXNlQ291bnRlcihjdXIgPT09ICRiNWUyNTdkNTY5Njg4YWM2JHZhciRkZWZhdWx0Q29udGV4dCk7XG4gICAgbGV0IFtpc1NTUiwgc2V0SXNTU1JdID0gKDAsICQ2NzBnQiR1c2VTdGF0ZSkodHJ1ZSk7XG4gICAgbGV0IHZhbHVlID0gKDAsICQ2NzBnQiR1c2VNZW1vKSgoKT0+KHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IFNTUlByb3ZpZGVyLCBzdGFydCB3aXRoIGFuIGVtcHR5IHN0cmluZyBwcmVmaXgsIG90aGVyd2lzZVxuICAgICAgICAgICAgLy8gYXBwZW5kIGFuZCBpbmNyZW1lbnQgdGhlIGNvdW50ZXIuXG4gICAgICAgICAgICBwcmVmaXg6IGN1ciA9PT0gJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJGRlZmF1bHRDb250ZXh0ID8gJycgOiBgJHtjdXIucHJlZml4fS0ke2NvdW50ZXJ9YCxcbiAgICAgICAgICAgIGN1cnJlbnQ6IDBcbiAgICAgICAgfSksIFtcbiAgICAgICAgY3VyLFxuICAgICAgICBjb3VudGVyXG4gICAgXSk7XG4gICAgLy8gSWYgb24gdGhlIGNsaWVudCwgYW5kIHRoZSBjb21wb25lbnQgd2FzIGluaXRpYWxseSBzZXJ2ZXIgcmVuZGVyZWQsXG4gICAgLy8gdGhlbiBzY2hlZHVsZSBhIGxheW91dCBlZmZlY3QgdG8gdXBkYXRlIHRoZSBjb21wb25lbnQgYWZ0ZXIgaHlkcmF0aW9uLlxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSAvLyBUaGlzIGlmIHN0YXRlbWVudCB0ZWNobmljYWxseSBicmVha3MgdGhlIHJ1bGVzIG9mIGhvb2tzLCBidXQgaXMgc2FmZVxuICAgIC8vIGJlY2F1c2UgdGhlIGNvbmRpdGlvbiBuZXZlciBjaGFuZ2VzIGFmdGVyIG1vdW50aW5nLlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9ydWxlcy1vZi1ob29rc1xuICAgICgwLCAkNjcwZ0IkdXNlTGF5b3V0RWZmZWN0KSgoKT0+e1xuICAgICAgICBzZXRJc1NTUihmYWxzZSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAvKiNfX1BVUkVfXyovICgwLCAkNjcwZ0IkcmVhY3QpLmNyZWF0ZUVsZW1lbnQoJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJFNTUkNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSwgLyojX19QVVJFX18qLyAoMCwgJDY3MGdCJHJlYWN0KS5jcmVhdGVFbGVtZW50KCRiNWUyNTdkNTY5Njg4YWM2JHZhciRJc1NTUkNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgICAgdmFsdWU6IGlzU1NSXG4gICAgfSwgcHJvcHMuY2hpbGRyZW4pKTtcbn1cbmxldCAkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkd2FybmVkQWJvdXRTU1JQcm92aWRlciA9IGZhbHNlO1xuZnVuY3Rpb24gJGI1ZTI1N2Q1Njk2ODhhYzYkZXhwb3J0JDlmOGFjOTZhZjRiMWIyYWUocHJvcHMpIHtcbiAgICBpZiAodHlwZW9mICgwLCAkNjcwZ0IkcmVhY3QpWyd1c2VJZCddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgISRiNWUyNTdkNTY5Njg4YWM2JHZhciR3YXJuZWRBYm91dFNTUlByb3ZpZGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0luIFJlYWN0IDE4LCBTU1JQcm92aWRlciBpcyBub3QgbmVjZXNzYXJ5IGFuZCBpcyBhIG5vb3AuIFlvdSBjYW4gcmVtb3ZlIGl0IGZyb20geW91ciBhcHAuJyk7XG4gICAgICAgICAgICAkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkd2FybmVkQWJvdXRTU1JQcm92aWRlciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi8gKDAsICQ2NzBnQiRyZWFjdCkuY3JlYXRlRWxlbWVudCgoMCwgJDY3MGdCJHJlYWN0KS5GcmFnbWVudCwgbnVsbCwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgICByZXR1cm4gLyojX19QVVJFX18qLyAoMCwgJDY3MGdCJHJlYWN0KS5jcmVhdGVFbGVtZW50KCRiNWUyNTdkNTY5Njg4YWM2JHZhciRMZWdhY3lTU1JQcm92aWRlciwgcHJvcHMpO1xufVxubGV0ICRiNWUyNTdkNTY5Njg4YWM2JHZhciRjYW5Vc2VET00gPSBCb29sZWFuKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5sZXQgJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJGNvbXBvbmVudElkcyA9IG5ldyBXZWFrTWFwKCk7XG5mdW5jdGlvbiAkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkdXNlQ291bnRlcihpc0Rpc2FibGVkID0gZmFsc2UpIHtcbiAgICBsZXQgY3R4ID0gKDAsICQ2NzBnQiR1c2VDb250ZXh0KSgkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkU1NSQ29udGV4dCk7XG4gICAgbGV0IHJlZiA9ICgwLCAkNjcwZ0IkdXNlUmVmKShudWxsKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcnVsZXNkaXIvcHVyZS1yZW5kZXJcbiAgICBpZiAocmVmLmN1cnJlbnQgPT09IG51bGwgJiYgIWlzRGlzYWJsZWQpIHtcbiAgICAgICAgdmFyIF9SZWFjdF9fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRF9SZWFjdEN1cnJlbnRPd25lciwgX1JlYWN0X19fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEO1xuICAgICAgICAvLyBJbiBzdHJpY3QgbW9kZSwgUmVhY3QgcmVuZGVycyBjb21wb25lbnRzIHR3aWNlLCBhbmQgdGhlIHJlZiB3aWxsIGJlIHJlc2V0IHRvIG51bGwgb24gdGhlIHNlY29uZCByZW5kZXIuXG4gICAgICAgIC8vIFRoaXMgbWVhbnMgb3VyIGlkIGNvdW50ZXIgd2lsbCBiZSBpbmNyZW1lbnRlZCB0d2ljZSBpbnN0ZWFkIG9mIG9uY2UuIFRoaXMgaXMgYSBwcm9ibGVtIGJlY2F1c2Ugb24gdGhlXG4gICAgICAgIC8vIHNlcnZlciwgY29tcG9uZW50cyBhcmUgb25seSByZW5kZXJlZCBvbmNlIGFuZCBzbyBpZHMgZ2VuZXJhdGVkIG9uIHRoZSBzZXJ2ZXIgd29uJ3QgbWF0Y2ggdGhlIGNsaWVudC5cbiAgICAgICAgLy8gSW4gUmVhY3QgMTgsIHVzZUlkIHdhcyBpbnRyb2R1Y2VkIHRvIHNvbHZlIHRoaXMsIGJ1dCBpdCBpcyBub3QgYXZhaWxhYmxlIGluIG9sZGVyIHZlcnNpb25zLiBTbyB0byBzb2x2ZSB0aGlzXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gdXNlIHNvbWUgUmVhY3QgaW50ZXJuYWxzIHRvIGFjY2VzcyB0aGUgdW5kZXJseWluZyBGaWJlciBpbnN0YW5jZSwgd2hpY2ggaXMgc3RhYmxlIGJldHdlZW4gcmVuZGVycy5cbiAgICAgICAgLy8gVGhpcyBpcyBleHBvc2VkIGFzIFJlYWN0Q3VycmVudE93bmVyIGluIGRldmVsb3BtZW50LCB3aGljaCBpcyBhbGwgd2UgbmVlZCBzaW5jZSBTdHJpY3RNb2RlIG9ubHkgcnVucyBpbiBkZXZlbG9wbWVudC5cbiAgICAgICAgLy8gVG8gZW5zdXJlIHRoYXQgd2Ugb25seSBpbmNyZW1lbnQgdGhlIGdsb2JhbCBjb3VudGVyIG9uY2UsIHdlIHN0b3JlIHRoZSBzdGFydGluZyBpZCBmb3IgdGhpcyBjb21wb25lbnQgaW5cbiAgICAgICAgLy8gYSB3ZWFrIG1hcCBhc3NvY2lhdGVkIHdpdGggdGhlIEZpYmVyLiBPbiB0aGUgc2Vjb25kIHJlbmRlciwgd2UgcmVzZXQgdGhlIGdsb2JhbCBjb3VudGVyIHRvIHRoaXMgdmFsdWUuXG4gICAgICAgIC8vIFNpbmNlIFJlYWN0IHJ1bnMgdGhlIHNlY29uZCByZW5kZXIgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIGZpcnN0LCB0aGlzIGlzIHNhZmUuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGN1cnJlbnRPd25lciA9IChfUmVhY3RfX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQgPSAoMCwgJDY3MGdCJHJlYWN0KS5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCkgPT09IG51bGwgfHwgX1JlYWN0X19fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX1JlYWN0X19fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEX1JlYWN0Q3VycmVudE93bmVyID0gX1JlYWN0X19fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVELlJlYWN0Q3VycmVudE93bmVyKSA9PT0gbnVsbCB8fCBfUmVhY3RfX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRURfUmVhY3RDdXJyZW50T3duZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9SZWFjdF9fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRF9SZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgICAgICBpZiAoY3VycmVudE93bmVyKSB7XG4gICAgICAgICAgICBsZXQgcHJldkNvbXBvbmVudFZhbHVlID0gJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJGNvbXBvbmVudElkcy5nZXQoY3VycmVudE93bmVyKTtcbiAgICAgICAgICAgIGlmIChwcmV2Q29tcG9uZW50VmFsdWUgPT0gbnVsbCkgLy8gT24gdGhlIGZpcnN0IHJlbmRlciwgYW5kIGZpcnN0IGNhbGwgdG8gdXNlSWQsIHN0b3JlIHRoZSBpZCBhbmQgc3RhdGUgaW4gb3VyIHdlYWsgbWFwLlxuICAgICAgICAgICAgJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJGNvbXBvbmVudElkcy5zZXQoY3VycmVudE93bmVyLCB7XG4gICAgICAgICAgICAgICAgaWQ6IGN0eC5jdXJyZW50LFxuICAgICAgICAgICAgICAgIHN0YXRlOiBjdXJyZW50T3duZXIubWVtb2l6ZWRTdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50T3duZXIubWVtb2l6ZWRTdGF0ZSAhPT0gcHJldkNvbXBvbmVudFZhbHVlLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gT24gdGhlIHNlY29uZCByZW5kZXIsIHRoZSBtZW1vaXplZFN0YXRlIGdldHMgcmVzZXQgYnkgUmVhY3QuXG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgdGhlIGNvdW50ZXIsIGFuZCByZW1vdmUgZnJvbSB0aGUgd2VhayBtYXAgc28gd2UgZG9uJ3RcbiAgICAgICAgICAgICAgICAvLyBkbyB0aGlzIGZvciBzdWJzZXF1ZW50IHVzZUlkIGNhbGxzLlxuICAgICAgICAgICAgICAgIGN0eC5jdXJyZW50ID0gcHJldkNvbXBvbmVudFZhbHVlLmlkO1xuICAgICAgICAgICAgICAgICRiNWUyNTdkNTY5Njg4YWM2JHZhciRjb21wb25lbnRJZHMuZGVsZXRlKGN1cnJlbnRPd25lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJ1bGVzZGlyL3B1cmUtcmVuZGVyXG4gICAgICAgIHJlZi5jdXJyZW50ID0gKytjdHguY3VycmVudDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJ1bGVzZGlyL3B1cmUtcmVuZGVyXG4gICAgcmV0dXJuIHJlZi5jdXJyZW50O1xufVxuZnVuY3Rpb24gJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJHVzZUxlZ2FjeVNTUlNhZmVJZChkZWZhdWx0SWQpIHtcbiAgICBsZXQgY3R4ID0gKDAsICQ2NzBnQiR1c2VDb250ZXh0KSgkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkU1NSQ29udGV4dCk7XG4gICAgLy8gSWYgd2UgYXJlIHJlbmRlcmluZyBpbiBhIG5vbi1ET00gZW52aXJvbm1lbnQsIGFuZCB0aGVyZSdzIG5vIFNTUlByb3ZpZGVyLFxuICAgIC8vIHByb3ZpZGUgYSB3YXJuaW5nIHRvIGhpbnQgdG8gdGhlIGRldmVsb3BlciB0byBhZGQgb25lLlxuICAgIGlmIChjdHggPT09ICRiNWUyNTdkNTY5Njg4YWM2JHZhciRkZWZhdWx0Q29udGV4dCAmJiAhJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJGNhblVzZURPTSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBjb25zb2xlLndhcm4oJ1doZW4gc2VydmVyIHJlbmRlcmluZywgeW91IG11c3Qgd3JhcCB5b3VyIGFwcGxpY2F0aW9uIGluIGFuIDxTU1JQcm92aWRlcj4gdG8gZW5zdXJlIGNvbnNpc3RlbnQgaWRzIGFyZSBnZW5lcmF0ZWQgYmV0d2VlbiB0aGUgY2xpZW50IGFuZCBzZXJ2ZXIuJyk7XG4gICAgbGV0IGNvdW50ZXIgPSAkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkdXNlQ291bnRlcighIWRlZmF1bHRJZCk7XG4gICAgbGV0IHByZWZpeCA9IGN0eCA9PT0gJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJGRlZmF1bHRDb250ZXh0ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcgPyAncmVhY3QtYXJpYScgOiBgcmVhY3QtYXJpYSR7Y3R4LnByZWZpeH1gO1xuICAgIHJldHVybiBkZWZhdWx0SWQgfHwgYCR7cHJlZml4fS0ke2NvdW50ZXJ9YDtcbn1cbmZ1bmN0aW9uICRiNWUyNTdkNTY5Njg4YWM2JHZhciR1c2VNb2Rlcm5TU1JTYWZlSWQoZGVmYXVsdElkKSB7XG4gICAgbGV0IGlkID0gKDAsICQ2NzBnQiRyZWFjdCkudXNlSWQoKTtcbiAgICBsZXQgW2RpZFNTUl0gPSAoMCwgJDY3MGdCJHVzZVN0YXRlKSgkYjVlMjU3ZDU2OTY4OGFjNiRleHBvcnQkNTM1YmQ2Y2E3ZjkwYTI3MygpKTtcbiAgICBsZXQgcHJlZml4ID0gZGlkU1NSIHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcgPyAncmVhY3QtYXJpYScgOiBgcmVhY3QtYXJpYSR7JGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJGRlZmF1bHRDb250ZXh0LnByZWZpeH1gO1xuICAgIHJldHVybiBkZWZhdWx0SWQgfHwgYCR7cHJlZml4fS0ke2lkfWA7XG59XG5jb25zdCAkYjVlMjU3ZDU2OTY4OGFjNiRleHBvcnQkNjE5NTAwOTU5ZmM0OGIyNiA9IHR5cGVvZiAoMCwgJDY3MGdCJHJlYWN0KVsndXNlSWQnXSA9PT0gJ2Z1bmN0aW9uJyA/ICRiNWUyNTdkNTY5Njg4YWM2JHZhciR1c2VNb2Rlcm5TU1JTYWZlSWQgOiAkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkdXNlTGVnYWN5U1NSU2FmZUlkO1xuZnVuY3Rpb24gJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJGdldFNuYXBzaG90KCkge1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uICRiNWUyNTdkNTY5Njg4YWM2JHZhciRnZXRTZXJ2ZXJTbmFwc2hvdCgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbmZ1bmN0aW9uICRiNWUyNTdkNTY5Njg4YWM2JHZhciRzdWJzY3JpYmUob25TdG9yZUNoYW5nZSkge1xuICAgIC8vIG5vb3BcbiAgICByZXR1cm4gKCk9Pnt9O1xufVxuZnVuY3Rpb24gJGI1ZTI1N2Q1Njk2ODhhYzYkZXhwb3J0JDUzNWJkNmNhN2Y5MGEyNzMoKSB7XG4gICAgLy8gSW4gUmVhY3QgMTgsIHdlIGNhbiB1c2UgdXNlU3luY0V4dGVybmFsU3RvcmUgdG8gZGV0ZWN0IGlmIHdlJ3JlIHNlcnZlciByZW5kZXJpbmcgb3IgaHlkcmF0aW5nLlxuICAgIGlmICh0eXBlb2YgKDAsICQ2NzBnQiRyZWFjdClbJ3VzZVN5bmNFeHRlcm5hbFN0b3JlJ10gPT09ICdmdW5jdGlvbicpIHJldHVybiAoMCwgJDY3MGdCJHJlYWN0KVsndXNlU3luY0V4dGVybmFsU3RvcmUnXSgkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkc3Vic2NyaWJlLCAkYjVlMjU3ZDU2OTY4OGFjNiR2YXIkZ2V0U25hcHNob3QsICRiNWUyNTdkNTY5Njg4YWM2JHZhciRnZXRTZXJ2ZXJTbmFwc2hvdCk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzXG4gICAgcmV0dXJuICgwLCAkNjcwZ0IkdXNlQ29udGV4dCkoJGI1ZTI1N2Q1Njk2ODhhYzYkdmFyJElzU1NSQ29udGV4dCk7XG59XG5cblxuZXhwb3J0IHskYjVlMjU3ZDU2OTY4OGFjNiRleHBvcnQkOWY4YWM5NmFmNGIxYjJhZSBhcyBTU1JQcm92aWRlciwgJGI1ZTI1N2Q1Njk2ODhhYzYkZXhwb3J0JDUzNWJkNmNhN2Y5MGEyNzMgYXMgdXNlSXNTU1IsICRiNWUyNTdkNTY5Njg4YWM2JGV4cG9ydCQ2MTk1MDA5NTlmYzQ4YjI2IGFzIHVzZVNTUlNhZmVJZH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TU1JQcm92aWRlci5tb2R1bGUuanMubWFwXG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBBIGNvbnZlbmllbmNlIGhvb2sgYXJvdW5kIGB1c2VTdGF0ZWAgZGVzaWduZWQgdG8gYmUgcGFpcmVkIHdpdGhcbiAqIHRoZSBjb21wb25lbnQgW2NhbGxiYWNrIHJlZl0oaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlZnMtYW5kLXRoZS1kb20uaHRtbCNjYWxsYmFjay1yZWZzKSBhcGkuXG4gKiBDYWxsYmFjayByZWZzIGFyZSB1c2VmdWwgb3ZlciBgdXNlUmVmKClgIHdoZW4geW91IG5lZWQgdG8gcmVzcG9uZCB0byB0aGUgcmVmIGJlaW5nIHNldFxuICogaW5zdGVhZCBvZiBsYXppbHkgYWNjZXNzaW5nIGl0IGluIGFuIGVmZmVjdC5cbiAqXG4gKiBgYGB0c1xuICogY29uc3QgW2VsZW1lbnQsIGF0dGFjaFJlZl0gPSB1c2VDYWxsYmFja1JlZjxIVE1MRGl2RWxlbWVudD4oKVxuICpcbiAqIHVzZUVmZmVjdCgoKSA9PiB7XG4gKiAgIGlmICghZWxlbWVudCkgcmV0dXJuXG4gKlxuICogICBjb25zdCBjYWxlbmRhciA9IG5ldyBGdWxsQ2FsZW5kYXIuQ2FsZW5kYXIoZWxlbWVudClcbiAqXG4gKiAgIHJldHVybiAoKSA9PiB7XG4gKiAgICAgY2FsZW5kYXIuZGVzdHJveSgpXG4gKiAgIH1cbiAqIH0sIFtlbGVtZW50XSlcbiAqXG4gKiByZXR1cm4gPGRpdiByZWY9e2F0dGFjaFJlZn0gLz5cbiAqIGBgYFxuICpcbiAqIEBjYXRlZ29yeSByZWZzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZUNhbGxiYWNrUmVmKCkge1xuICByZXR1cm4gdXNlU3RhdGUobnVsbCk7XG59IiwiaW1wb3J0IHsgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbi8qKlxuICogVHJhY2sgd2hldGhlciBhIGNvbXBvbmVudCBpcyBjdXJyZW50IG1vdW50ZWQuIEdlbmVyYWxseSBsZXNzIHByZWZlcmFibGUgdGhhblxuICogcHJvcGVybGx5IGNhbmNlbGluZyBlZmZlY3RzIHNvIHRoZXkgZG9uJ3QgcnVuIGFmdGVyIGEgY29tcG9uZW50IGlzIHVubW91bnRlZCxcbiAqIGJ1dCBoZWxwZnVsIGluIGNhc2VzIHdoZXJlIHRoYXQgaXNuJ3QgZmVhc2libGUsIHN1Y2ggYXMgYSBgUHJvbWlzZWAgcmVzb2x1dGlvbi5cbiAqXG4gKiBAcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCBpc01vdW50ZWQgc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICpcbiAqIGBgYHRzXG4gKiBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKVxuICogY29uc3QgaXNNb3VudGVkID0gdXNlTW91bnRlZCgpXG4gKlxuICogdXNlRWZmZWN0KCgpID0+IHtcbiAqICAgZmV0Y2hkYXRhKCkudGhlbigobmV3RGF0YSkgPT4ge1xuICogICAgICBpZiAoaXNNb3VudGVkKCkpIHtcbiAqICAgICAgICBzZXREYXRhKG5ld0RhdGEpO1xuICogICAgICB9XG4gKiAgIH0pXG4gKiB9KVxuICogYGBgXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZU1vdW50ZWQoKSB7XG4gIGNvbnN0IG1vdW50ZWQgPSB1c2VSZWYodHJ1ZSk7XG4gIGNvbnN0IGlzTW91bnRlZCA9IHVzZVJlZigoKSA9PiBtb3VudGVkLmN1cnJlbnQpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG1vdW50ZWQuY3VycmVudCA9IHRydWU7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIG1vdW50ZWQuY3VycmVudCA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFtdKTtcbiAgcmV0dXJuIGlzTW91bnRlZC5jdXJyZW50O1xufSIsImltcG9ydCB7IHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1c2VNb3VudGVkIGZyb20gJy4vdXNlTW91bnRlZCc7XG5pbXBvcnQgdXNlV2lsbFVubW91bnQgZnJvbSAnLi91c2VXaWxsVW5tb3VudCc7XG5cbi8qXG4gKiBCcm93c2VycyBpbmNsdWRpbmcgSW50ZXJuZXQgRXhwbG9yZXIsIENocm9tZSwgU2FmYXJpLCBhbmQgRmlyZWZveCBzdG9yZSB0aGVcbiAqIGRlbGF5IGFzIGEgMzItYml0IHNpZ25lZCBpbnRlZ2VyIGludGVybmFsbHkuIFRoaXMgY2F1c2VzIGFuIGludGVnZXIgb3ZlcmZsb3dcbiAqIHdoZW4gdXNpbmcgZGVsYXlzIGxhcmdlciB0aGFuIDIsMTQ3LDQ4Myw2NDcgbXMgKGFib3V0IDI0LjggZGF5cyksXG4gKiByZXN1bHRpbmcgaW4gdGhlIHRpbWVvdXQgYmVpbmcgZXhlY3V0ZWQgaW1tZWRpYXRlbHkuXG4gKlxuICogdmlhOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93T3JXb3JrZXJHbG9iYWxTY29wZS9zZXRUaW1lb3V0XG4gKi9cbmNvbnN0IE1BWF9ERUxBWV9NUyA9IDIgKiogMzEgLSAxO1xuZnVuY3Rpb24gc2V0Q2hhaW5lZFRpbWVvdXQoaGFuZGxlUmVmLCBmbiwgdGltZW91dEF0TXMpIHtcbiAgY29uc3QgZGVsYXlNcyA9IHRpbWVvdXRBdE1zIC0gRGF0ZS5ub3coKTtcbiAgaGFuZGxlUmVmLmN1cnJlbnQgPSBkZWxheU1zIDw9IE1BWF9ERUxBWV9NUyA/IHNldFRpbWVvdXQoZm4sIGRlbGF5TXMpIDogc2V0VGltZW91dCgoKSA9PiBzZXRDaGFpbmVkVGltZW91dChoYW5kbGVSZWYsIGZuLCB0aW1lb3V0QXRNcyksIE1BWF9ERUxBWV9NUyk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNvbnRyb2xsZXIgb2JqZWN0IGZvciBzZXR0aW5nIGEgdGltZW91dCB0aGF0IGlzIHByb3Blcmx5IGNsZWFuZWQgdXBcbiAqIG9uY2UgdGhlIGNvbXBvbmVudCB1bm1vdW50cy4gTmV3IHRpbWVvdXRzIGNhbmNlbCBhbmQgcmVwbGFjZSBleGlzdGluZyBvbmVzLlxuICpcbiAqXG4gKlxuICogYGBgdHN4XG4gKiBjb25zdCB7IHNldCwgY2xlYXIgfSA9IHVzZVRpbWVvdXQoKTtcbiAqIGNvbnN0IFtoZWxsbywgc2hvd0hlbGxvXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAqIC8vRGlzcGxheSBoZWxsbyBhZnRlciA1IHNlY29uZHNcbiAqIHNldCgoKSA9PiBzaG93SGVsbG8odHJ1ZSksIDUwMDApO1xuICogcmV0dXJuIChcbiAqICAgPGRpdiBjbGFzc05hbWU9XCJBcHBcIj5cbiAqICAgICB7aGVsbG8gPyA8aDM+SGVsbG88L2gzPiA6IG51bGx9XG4gKiAgIDwvZGl2PlxuICogKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VUaW1lb3V0KCkge1xuICBjb25zdCBpc01vdW50ZWQgPSB1c2VNb3VudGVkKCk7XG5cbiAgLy8gdHlwZXMgYXJlIGNvbmZ1c2VkIGJldHdlZW4gbm9kZSBhbmQgd2ViIGhlcmUgSURLXG4gIGNvbnN0IGhhbmRsZVJlZiA9IHVzZVJlZigpO1xuICB1c2VXaWxsVW5tb3VudCgoKSA9PiBjbGVhclRpbWVvdXQoaGFuZGxlUmVmLmN1cnJlbnQpKTtcbiAgcmV0dXJuIHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFyID0gKCkgPT4gY2xlYXJUaW1lb3V0KGhhbmRsZVJlZi5jdXJyZW50KTtcbiAgICBmdW5jdGlvbiBzZXQoZm4sIGRlbGF5TXMgPSAwKSB7XG4gICAgICBpZiAoIWlzTW91bnRlZCgpKSByZXR1cm47XG4gICAgICBjbGVhcigpO1xuICAgICAgaWYgKGRlbGF5TXMgPD0gTUFYX0RFTEFZX01TKSB7XG4gICAgICAgIC8vIEZvciBzaW1wbGljaXR5LCBpZiB0aGUgdGltZW91dCBpcyBzaG9ydCwganVzdCBzZXQgYSBub3JtYWwgdGltZW91dC5cbiAgICAgICAgaGFuZGxlUmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KGZuLCBkZWxheU1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldENoYWluZWRUaW1lb3V0KGhhbmRsZVJlZiwgZm4sIERhdGUubm93KCkgKyBkZWxheU1zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldCxcbiAgICAgIGNsZWFyLFxuICAgICAgaGFuZGxlUmVmXG4gICAgfTtcbiAgfSwgW10pO1xufSIsImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIFJ1bnMgYW4gZWZmZWN0IG9ubHkgd2hlbiB0aGUgZGVwZW5kZW5jaWVzIGhhdmUgY2hhbmdlZCwgc2tpcHBpbmcgdGhlXG4gKiBpbml0aWFsIFwib24gbW91bnRcIiBydW4uIENhdXRpb24sIGlmIHRoZSBkZXBlbmRlbmN5IGxpc3QgbmV2ZXIgY2hhbmdlcyxcbiAqIHRoZSBlZmZlY3QgaXMgKipuZXZlciBydW4qKlxuICpcbiAqIGBgYHRzXG4gKiAgY29uc3QgcmVmID0gdXNlUmVmPEhUTUxJbnB1dD4obnVsbCk7XG4gKlxuICogIC8vIGZvY3VzZXMgYW4gZWxlbWVudCBvbmx5IGlmIHRoZSBmb2N1cyBjaGFuZ2VzLCBhbmQgbm90IG9uIG1vdW50XG4gKiAgdXNlVXBkYXRlRWZmZWN0KCgpID0+IHtcbiAqICAgIGNvbnN0IGVsZW1lbnQgPSByZWYuY3VycmVudD8uY2hpbGRyZW5bZm9jdXNlZElkeF0gYXMgSFRNTEVsZW1lbnRcbiAqXG4gKiAgICBlbGVtZW50Py5mb2N1cygpXG4gKlxuICogIH0sIFtmb2N1c2VkSW5kZXhdKVxuICogYGBgXG4gKiBAcGFyYW0gZWZmZWN0IEFuIGVmZmVjdCB0byBydW4gb24gbW91bnRcbiAqXG4gKiBAY2F0ZWdvcnkgZWZmZWN0c1xuICovXG5mdW5jdGlvbiB1c2VVcGRhdGVFZmZlY3QoZm4sIGRlcHMpIHtcbiAgY29uc3QgaXNGaXJzdCA9IHVzZVJlZih0cnVlKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNGaXJzdC5jdXJyZW50KSB7XG4gICAgICBpc0ZpcnN0LmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGZuKCk7XG4gIH0sIGRlcHMpO1xufVxuZXhwb3J0IGRlZmF1bHQgdXNlVXBkYXRlRWZmZWN0OyIsImltcG9ydCB7IHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVmIHRoYXQgaXMgaW1tZWRpYXRlbHkgdXBkYXRlZCB3aXRoIHRoZSBuZXcgdmFsdWVcbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIFJlZiB2YWx1ZVxuICogQGNhdGVnb3J5IHJlZnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlVXBkYXRlZFJlZih2YWx1ZSkge1xuICBjb25zdCB2YWx1ZVJlZiA9IHVzZVJlZih2YWx1ZSk7XG4gIHZhbHVlUmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlUmVmO1xufSIsImltcG9ydCB1c2VVcGRhdGVkUmVmIGZyb20gJy4vdXNlVXBkYXRlZFJlZic7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbi8qKlxuICogQXR0YWNoIGEgY2FsbGJhY2sgdGhhdCBmaXJlcyB3aGVuIGEgY29tcG9uZW50IHVubW91bnRzXG4gKlxuICogQHBhcmFtIGZuIEhhbmRsZXIgdG8gcnVuIHdoZW4gdGhlIGNvbXBvbmVudCB1bm1vdW50c1xuICogQGNhdGVnb3J5IGVmZmVjdHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlV2lsbFVubW91bnQoZm4pIHtcbiAgY29uc3Qgb25Vbm1vdW50ID0gdXNlVXBkYXRlZFJlZihmbik7XG4gIHVzZUVmZmVjdCgoKSA9PiAoKSA9PiBvblVubW91bnQuY3VycmVudCgpLCBbXSk7XG59IiwiY29uc3QgX2V4Y2x1ZGVkID0gW1wib25LZXlEb3duXCJdO1xuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UociwgZSkgeyBpZiAobnVsbCA9PSByKSByZXR1cm4ge307IHZhciB0ID0ge307IGZvciAodmFyIG4gaW4gcikgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwociwgbikpIHsgaWYgKGUuaW5kZXhPZihuKSA+PSAwKSBjb250aW51ZTsgdFtuXSA9IHJbbl07IH0gcmV0dXJuIHQ7IH1cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvYW5jaG9yLWhhcy1jb250ZW50ICovXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUV2ZW50Q2FsbGJhY2sgfSBmcm9tICdAcmVzdGFydC9ob29rcyc7XG5pbXBvcnQgeyB1c2VCdXR0b25Qcm9wcyB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5leHBvcnQgZnVuY3Rpb24gaXNUcml2aWFsSHJlZihocmVmKSB7XG4gIHJldHVybiAhaHJlZiB8fCBocmVmLnRyaW0oKSA9PT0gJyMnO1xufVxuLyoqXG4gKiBBbiBnZW5lcmljIGA8YT5gIGNvbXBvbmVudCB0aGF0IGNvdmVycyBhIGZldyBBMTF5IGNhc2VzLCBlbnN1cmluZyB0aGF0XG4gKiBjYXNlcyB3aGVyZSB0aGUgYGhyZWZgIGlzIG1pc3Npbmcgb3IgdHJpdmlhbCBsaWtlIFwiI1wiIGFyZSB0cmVhdGVkIGxpa2UgYnV0dG9ucy5cbiAqL1xuY29uc3QgQW5jaG9yID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKF9yZWYsIHJlZikgPT4ge1xuICBsZXQge1xuICAgICAgb25LZXlEb3duXG4gICAgfSA9IF9yZWYsXG4gICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBfZXhjbHVkZWQpO1xuICBjb25zdCBbYnV0dG9uUHJvcHNdID0gdXNlQnV0dG9uUHJvcHMoT2JqZWN0LmFzc2lnbih7XG4gICAgdGFnTmFtZTogJ2EnXG4gIH0sIHByb3BzKSk7XG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSB1c2VFdmVudENhbGxiYWNrKGUgPT4ge1xuICAgIGJ1dHRvblByb3BzLm9uS2V5RG93bihlKTtcbiAgICBvbktleURvd24gPT0gbnVsbCA/IHZvaWQgMCA6IG9uS2V5RG93bihlKTtcbiAgfSk7XG4gIGlmIChpc1RyaXZpYWxIcmVmKHByb3BzLmhyZWYpIHx8IHByb3BzLnJvbGUgPT09ICdidXR0b24nKSB7XG4gICAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KFwiYVwiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgIHJlZjogcmVmXG4gICAgfSwgcHJvcHMsIGJ1dHRvblByb3BzLCB7XG4gICAgICBvbktleURvd246IGhhbmRsZUtleURvd25cbiAgICB9KSk7XG4gIH1cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KFwiYVwiLCBPYmplY3QuYXNzaWduKHtcbiAgICByZWY6IHJlZlxuICB9LCBwcm9wcywge1xuICAgIG9uS2V5RG93bjogb25LZXlEb3duXG4gIH0pKTtcbn0pO1xuQW5jaG9yLmRpc3BsYXlOYW1lID0gJ0FuY2hvcic7XG5leHBvcnQgZGVmYXVsdCBBbmNob3I7IiwiY29uc3QgX2V4Y2x1ZGVkID0gW1wiYXNcIiwgXCJkaXNhYmxlZFwiXTtcbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHIsIGUpIHsgaWYgKG51bGwgPT0gcikgcmV0dXJuIHt9OyB2YXIgdCA9IHt9OyBmb3IgKHZhciBuIGluIHIpIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHIsIG4pKSB7IGlmIChlLmluZGV4T2YobikgPj0gMCkgY29udGludWU7IHRbbl0gPSByW25dOyB9IHJldHVybiB0OyB9XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIGlzVHJpdmlhbEhyZWYoaHJlZikge1xuICByZXR1cm4gIWhyZWYgfHwgaHJlZi50cmltKCkgPT09ICcjJztcbn1cbmV4cG9ydCBmdW5jdGlvbiB1c2VCdXR0b25Qcm9wcyh7XG4gIHRhZ05hbWUsXG4gIGRpc2FibGVkLFxuICBocmVmLFxuICB0YXJnZXQsXG4gIHJlbCxcbiAgcm9sZSxcbiAgb25DbGljayxcbiAgdGFiSW5kZXggPSAwLFxuICB0eXBlXG59KSB7XG4gIGlmICghdGFnTmFtZSkge1xuICAgIGlmIChocmVmICE9IG51bGwgfHwgdGFyZ2V0ICE9IG51bGwgfHwgcmVsICE9IG51bGwpIHtcbiAgICAgIHRhZ05hbWUgPSAnYSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhZ05hbWUgPSAnYnV0dG9uJztcbiAgICB9XG4gIH1cbiAgY29uc3QgbWV0YSA9IHtcbiAgICB0YWdOYW1lXG4gIH07XG4gIGlmICh0YWdOYW1lID09PSAnYnV0dG9uJykge1xuICAgIHJldHVybiBbe1xuICAgICAgdHlwZTogdHlwZSB8fCAnYnV0dG9uJyxcbiAgICAgIGRpc2FibGVkXG4gICAgfSwgbWV0YV07XG4gIH1cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSBldmVudCA9PiB7XG4gICAgaWYgKGRpc2FibGVkIHx8IHRhZ05hbWUgPT09ICdhJyAmJiBpc1RyaXZpYWxIcmVmKGhyZWYpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbkNsaWNrID09IG51bGwgPyB2b2lkIDAgOiBvbkNsaWNrKGV2ZW50KTtcbiAgfTtcbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnICcpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBoYW5kbGVDbGljayhldmVudCk7XG4gICAgfVxuICB9O1xuICBpZiAodGFnTmFtZSA9PT0gJ2EnKSB7XG4gICAgLy8gRW5zdXJlIHRoZXJlJ3MgYSBocmVmIHNvIEVudGVyIGNhbiB0cmlnZ2VyIGFuY2hvciBidXR0b24uXG4gICAgaHJlZiB8fCAoaHJlZiA9ICcjJyk7XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICBocmVmID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gW3tcbiAgICByb2xlOiByb2xlICE9IG51bGwgPyByb2xlIDogJ2J1dHRvbicsXG4gICAgLy8gZXhwbGljaXRseSB1bmRlZmluZWQgc28gdGhhdCBpdCBvdmVycmlkZXMgdGhlIHByb3BzIGRpc2FibGVkIGluIGEgc3ByZWFkXG4gICAgLy8gZS5nLiA8VGFnIHsuLi5wcm9wc30gey4uLmhvb2tQcm9wc30gLz5cbiAgICBkaXNhYmxlZDogdW5kZWZpbmVkLFxuICAgIHRhYkluZGV4OiBkaXNhYmxlZCA/IHVuZGVmaW5lZCA6IHRhYkluZGV4LFxuICAgIGhyZWYsXG4gICAgdGFyZ2V0OiB0YWdOYW1lID09PSAnYScgPyB0YXJnZXQgOiB1bmRlZmluZWQsXG4gICAgJ2FyaWEtZGlzYWJsZWQnOiAhZGlzYWJsZWQgPyB1bmRlZmluZWQgOiBkaXNhYmxlZCxcbiAgICByZWw6IHRhZ05hbWUgPT09ICdhJyA/IHJlbCA6IHVuZGVmaW5lZCxcbiAgICBvbkNsaWNrOiBoYW5kbGVDbGljayxcbiAgICBvbktleURvd246IGhhbmRsZUtleURvd25cbiAgfSwgbWV0YV07XG59XG5jb25zdCBCdXR0b24gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoX3JlZiwgcmVmKSA9PiB7XG4gIGxldCB7XG4gICAgICBhczogYXNQcm9wLFxuICAgICAgZGlzYWJsZWRcbiAgICB9ID0gX3JlZixcbiAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIF9leGNsdWRlZCk7XG4gIGNvbnN0IFtidXR0b25Qcm9wcywge1xuICAgIHRhZ05hbWU6IENvbXBvbmVudFxuICB9XSA9IHVzZUJ1dHRvblByb3BzKE9iamVjdC5hc3NpZ24oe1xuICAgIHRhZ05hbWU6IGFzUHJvcCxcbiAgICBkaXNhYmxlZFxuICB9LCBwcm9wcykpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCBPYmplY3QuYXNzaWduKHt9LCBwcm9wcywgYnV0dG9uUHJvcHMsIHtcbiAgICByZWY6IHJlZlxuICB9KSk7XG59KTtcbkJ1dHRvbi5kaXNwbGF5TmFtZSA9ICdCdXR0b24nO1xuZXhwb3J0IGRlZmF1bHQgQnV0dG9uOyIsImltcG9ydCBxc2EgZnJvbSAnZG9tLWhlbHBlcnMvcXVlcnlTZWxlY3RvckFsbCc7XG5pbXBvcnQgYWRkRXZlbnRMaXN0ZW5lciBmcm9tICdkb20taGVscGVycy9hZGRFdmVudExpc3RlbmVyJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVVuY29udHJvbGxlZFByb3AgfSBmcm9tICd1bmNvbnRyb2xsYWJsZSc7XG5pbXBvcnQgdXNlUHJldmlvdXMgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlUHJldmlvdXMnO1xuaW1wb3J0IHVzZUZvcmNlVXBkYXRlIGZyb20gJ0ByZXN0YXJ0L2hvb2tzL3VzZUZvcmNlVXBkYXRlJztcbmltcG9ydCB1c2VFdmVudExpc3RlbmVyIGZyb20gJ0ByZXN0YXJ0L2hvb2tzL3VzZUV2ZW50TGlzdGVuZXInO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgRHJvcGRvd25Db250ZXh0IGZyb20gJy4vRHJvcGRvd25Db250ZXh0JztcbmltcG9ydCBEcm9wZG93bk1lbnUgZnJvbSAnLi9Ecm9wZG93bk1lbnUnO1xuaW1wb3J0IERyb3Bkb3duVG9nZ2xlLCB7IGlzUm9sZU1lbnUgfSBmcm9tICcuL0Ryb3Bkb3duVG9nZ2xlJztcbmltcG9ydCBEcm9wZG93bkl0ZW0gZnJvbSAnLi9Ecm9wZG93bkl0ZW0nO1xuaW1wb3J0IFNlbGVjdGFibGVDb250ZXh0IGZyb20gJy4vU2VsZWN0YWJsZUNvbnRleHQnO1xuaW1wb3J0IHsgZGF0YUF0dHIgfSBmcm9tICcuL0RhdGFLZXknO1xuaW1wb3J0IHVzZVdpbmRvdyBmcm9tICcuL3VzZVdpbmRvdyc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gdXNlUmVmV2l0aFVwZGF0ZSgpIHtcbiAgY29uc3QgZm9yY2VVcGRhdGUgPSB1c2VGb3JjZVVwZGF0ZSgpO1xuICBjb25zdCByZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGF0dGFjaFJlZiA9IHVzZUNhbGxiYWNrKGVsZW1lbnQgPT4ge1xuICAgIHJlZi5jdXJyZW50ID0gZWxlbWVudDtcbiAgICAvLyBlbnN1cmUgdGhhdCBhIG1lbnUgc2V0IHRyaWdnZXJzIGFuIHVwZGF0ZSBmb3IgY29uc3VtZXJzXG4gICAgZm9yY2VVcGRhdGUoKTtcbiAgfSwgW2ZvcmNlVXBkYXRlXSk7XG4gIHJldHVybiBbcmVmLCBhdHRhY2hSZWZdO1xufVxuXG4vKipcbiAqIEBkaXNwbGF5TmFtZSBEcm9wZG93blxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBEcm9wZG93bih7XG4gIGRlZmF1bHRTaG93LFxuICBzaG93OiByYXdTaG93LFxuICBvblNlbGVjdCxcbiAgb25Ub2dnbGU6IHJhd09uVG9nZ2xlLFxuICBpdGVtU2VsZWN0b3IgPSBgKiBbJHtkYXRhQXR0cignZHJvcGRvd24taXRlbScpfV1gLFxuICBmb2N1c0ZpcnN0SXRlbU9uU2hvdyxcbiAgcGxhY2VtZW50ID0gJ2JvdHRvbS1zdGFydCcsXG4gIGNoaWxkcmVuXG59KSB7XG4gIGNvbnN0IHdpbmRvdyA9IHVzZVdpbmRvdygpO1xuICBjb25zdCBbc2hvdywgb25Ub2dnbGVdID0gdXNlVW5jb250cm9sbGVkUHJvcChyYXdTaG93LCBkZWZhdWx0U2hvdywgcmF3T25Ub2dnbGUpO1xuXG4gIC8vIFdlIHVzZSBub3JtYWwgcmVmcyBpbnN0ZWFkIG9mIHVzZUNhbGxiYWNrUmVmIGluIG9yZGVyIHRvIHBvcHVsYXRlIHRoZVxuICAvLyB0aGUgdmFsdWUgYXMgcXVpY2tseSBhcyBwb3NzaWJsZSwgb3RoZXJ3aXNlIHRoZSBlZmZlY3QgdG8gZm9jdXMgdGhlIGVsZW1lbnRcbiAgLy8gbWF5IHJ1biBiZWZvcmUgdGhlIHN0YXRlIHZhbHVlIGlzIHNldFxuICBjb25zdCBbbWVudVJlZiwgc2V0TWVudV0gPSB1c2VSZWZXaXRoVXBkYXRlKCk7XG4gIGNvbnN0IG1lbnVFbGVtZW50ID0gbWVudVJlZi5jdXJyZW50O1xuICBjb25zdCBbdG9nZ2xlUmVmLCBzZXRUb2dnbGVdID0gdXNlUmVmV2l0aFVwZGF0ZSgpO1xuICBjb25zdCB0b2dnbGVFbGVtZW50ID0gdG9nZ2xlUmVmLmN1cnJlbnQ7XG4gIGNvbnN0IGxhc3RTaG93ID0gdXNlUHJldmlvdXMoc2hvdyk7XG4gIGNvbnN0IGxhc3RTb3VyY2VFdmVudCA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgZm9jdXNJbkRyb3Bkb3duID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3Qgb25TZWxlY3RDdHggPSB1c2VDb250ZXh0KFNlbGVjdGFibGVDb250ZXh0KTtcbiAgY29uc3QgdG9nZ2xlID0gdXNlQ2FsbGJhY2soKG5leHRTaG93LCBldmVudCwgc291cmNlID0gZXZlbnQgPT0gbnVsbCA/IHZvaWQgMCA6IGV2ZW50LnR5cGUpID0+IHtcbiAgICBvblRvZ2dsZShuZXh0U2hvdywge1xuICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICBzb3VyY2VcbiAgICB9KTtcbiAgfSwgW29uVG9nZ2xlXSk7XG4gIGNvbnN0IGhhbmRsZVNlbGVjdCA9IHVzZUV2ZW50Q2FsbGJhY2soKGtleSwgZXZlbnQpID0+IHtcbiAgICBvblNlbGVjdCA9PSBudWxsID8gdm9pZCAwIDogb25TZWxlY3Qoa2V5LCBldmVudCk7XG4gICAgdG9nZ2xlKGZhbHNlLCBldmVudCwgJ3NlbGVjdCcpO1xuICAgIGlmICghZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSkge1xuICAgICAgb25TZWxlY3RDdHggPT0gbnVsbCA/IHZvaWQgMCA6IG9uU2VsZWN0Q3R4KGtleSwgZXZlbnQpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGNvbnRleHQgPSB1c2VNZW1vKCgpID0+ICh7XG4gICAgdG9nZ2xlLFxuICAgIHBsYWNlbWVudCxcbiAgICBzaG93LFxuICAgIG1lbnVFbGVtZW50LFxuICAgIHRvZ2dsZUVsZW1lbnQsXG4gICAgc2V0TWVudSxcbiAgICBzZXRUb2dnbGVcbiAgfSksIFt0b2dnbGUsIHBsYWNlbWVudCwgc2hvdywgbWVudUVsZW1lbnQsIHRvZ2dsZUVsZW1lbnQsIHNldE1lbnUsIHNldFRvZ2dsZV0pO1xuICBpZiAobWVudUVsZW1lbnQgJiYgbGFzdFNob3cgJiYgIXNob3cpIHtcbiAgICBmb2N1c0luRHJvcGRvd24uY3VycmVudCA9IG1lbnVFbGVtZW50LmNvbnRhaW5zKG1lbnVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gIH1cbiAgY29uc3QgZm9jdXNUb2dnbGUgPSB1c2VFdmVudENhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAodG9nZ2xlRWxlbWVudCAmJiB0b2dnbGVFbGVtZW50LmZvY3VzKSB7XG4gICAgICB0b2dnbGVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgbWF5YmVGb2N1c0ZpcnN0ID0gdXNlRXZlbnRDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgdHlwZSA9IGxhc3RTb3VyY2VFdmVudC5jdXJyZW50O1xuICAgIGxldCBmb2N1c1R5cGUgPSBmb2N1c0ZpcnN0SXRlbU9uU2hvdztcbiAgICBpZiAoZm9jdXNUeXBlID09IG51bGwpIHtcbiAgICAgIGZvY3VzVHlwZSA9IG1lbnVSZWYuY3VycmVudCAmJiBpc1JvbGVNZW51KG1lbnVSZWYuY3VycmVudCkgPyAna2V5Ym9hcmQnIDogZmFsc2U7XG4gICAgfVxuICAgIGlmIChmb2N1c1R5cGUgPT09IGZhbHNlIHx8IGZvY3VzVHlwZSA9PT0gJ2tleWJvYXJkJyAmJiAhL15rZXkuKyQvLnRlc3QodHlwZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlyc3QgPSBxc2EobWVudVJlZi5jdXJyZW50LCBpdGVtU2VsZWN0b3IpWzBdO1xuICAgIGlmIChmaXJzdCAmJiBmaXJzdC5mb2N1cykgZmlyc3QuZm9jdXMoKTtcbiAgfSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNob3cpIG1heWJlRm9jdXNGaXJzdCgpO2Vsc2UgaWYgKGZvY3VzSW5Ecm9wZG93bi5jdXJyZW50KSB7XG4gICAgICBmb2N1c0luRHJvcGRvd24uY3VycmVudCA9IGZhbHNlO1xuICAgICAgZm9jdXNUb2dnbGUoKTtcbiAgICB9XG4gICAgLy8gb25seSBgc2hvd2Agc2hvdWxkIGJlIGNoYW5naW5nXG4gIH0sIFtzaG93LCBmb2N1c0luRHJvcGRvd24sIGZvY3VzVG9nZ2xlLCBtYXliZUZvY3VzRmlyc3RdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsYXN0U291cmNlRXZlbnQuY3VycmVudCA9IG51bGw7XG4gIH0pO1xuICBjb25zdCBnZXROZXh0Rm9jdXNlZENoaWxkID0gKGN1cnJlbnQsIG9mZnNldCkgPT4ge1xuICAgIGlmICghbWVudVJlZi5jdXJyZW50KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBpdGVtcyA9IHFzYShtZW51UmVmLmN1cnJlbnQsIGl0ZW1TZWxlY3Rvcik7XG4gICAgbGV0IGluZGV4ID0gaXRlbXMuaW5kZXhPZihjdXJyZW50KSArIG9mZnNldDtcbiAgICBpbmRleCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGluZGV4LCBpdGVtcy5sZW5ndGgpKTtcbiAgICByZXR1cm4gaXRlbXNbaW5kZXhdO1xuICB9O1xuICB1c2VFdmVudExpc3RlbmVyKHVzZUNhbGxiYWNrKCgpID0+IHdpbmRvdy5kb2N1bWVudCwgW3dpbmRvd10pLCAna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgICB2YXIgX21lbnVSZWYkY3VycmVudCwgX3RvZ2dsZVJlZiRjdXJyZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGtleVxuICAgIH0gPSBldmVudDtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgZnJvbU1lbnUgPSAoX21lbnVSZWYkY3VycmVudCA9IG1lbnVSZWYuY3VycmVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9tZW51UmVmJGN1cnJlbnQuY29udGFpbnModGFyZ2V0KTtcbiAgICBjb25zdCBmcm9tVG9nZ2xlID0gKF90b2dnbGVSZWYkY3VycmVudCA9IHRvZ2dsZVJlZi5jdXJyZW50KSA9PSBudWxsID8gdm9pZCAwIDogX3RvZ2dsZVJlZiRjdXJyZW50LmNvbnRhaW5zKHRhcmdldCk7XG5cbiAgICAvLyBTZWNvbmQgb25seSB0byBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi84Y2ZiZjY5MzNiOGEwMTQ2YWMzZmJjMzY5ZjE5ZTUyMGJkMWViZGFjL2pzL3NyYy9kcm9wZG93bi5qcyNMNDAwXG4gICAgLy8gaW4gaW5zY3J1dGFiaWxpdHlcbiAgICBjb25zdCBpc0lucHV0ID0gL2lucHV0fHRleHRhcmVhL2kudGVzdCh0YXJnZXQudGFnTmFtZSk7XG4gICAgaWYgKGlzSW5wdXQgJiYgKGtleSA9PT0gJyAnIHx8IGtleSAhPT0gJ0VzY2FwZScgJiYgZnJvbU1lbnUgfHwga2V5ID09PSAnRXNjYXBlJyAmJiB0YXJnZXQudHlwZSA9PT0gJ3NlYXJjaCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZnJvbU1lbnUgJiYgIWZyb21Ub2dnbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGtleSA9PT0gJ1RhYicgJiYgKCFtZW51UmVmLmN1cnJlbnQgfHwgIXNob3cpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxhc3RTb3VyY2VFdmVudC5jdXJyZW50ID0gZXZlbnQudHlwZTtcbiAgICBjb25zdCBtZXRhID0ge1xuICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICBzb3VyY2U6IGV2ZW50LnR5cGVcbiAgICB9O1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG5leHQgPSBnZXROZXh0Rm9jdXNlZENoaWxkKHRhcmdldCwgLTEpO1xuICAgICAgICAgIGlmIChuZXh0ICYmIG5leHQuZm9jdXMpIG5leHQuZm9jdXMoKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCFzaG93KSB7XG4gICAgICAgICAgb25Ub2dnbGUodHJ1ZSwgbWV0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgbmV4dCA9IGdldE5leHRGb2N1c2VkQ2hpbGQodGFyZ2V0LCAxKTtcbiAgICAgICAgICBpZiAobmV4dCAmJiBuZXh0LmZvY3VzKSBuZXh0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgLy8gb24ga2V5ZG93biB0aGUgdGFyZ2V0IGlzIHRoZSBlbGVtZW50IGJlaW5nIHRhYmJlZCBGUk9NLCB3ZSBuZWVkIHRoYXRcbiAgICAgICAgLy8gdG8ga25vdyBpZiB0aGlzIGV2ZW50IGlzIHJlbGV2YW50IHRvIHRoaXMgZHJvcGRvd24gKGUuZy4gaW4gdGhpcyBtZW51KS5cbiAgICAgICAgLy8gT24gYGtleXVwYCB0aGUgdGFyZ2V0IGlzIHRoZSBlbGVtZW50IGJlaW5nIHRhZ2dlZCBUTyB3aGljaCB3ZSB1c2UgdG8gY2hlY2tcbiAgICAgICAgLy8gaWYgZm9jdXMgaGFzIGxlZnQgdGhlIG1lbnVcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQub3duZXJEb2N1bWVudCwgJ2tleXVwJywgZSA9PiB7XG4gICAgICAgICAgdmFyIF9tZW51UmVmJGN1cnJlbnQyO1xuICAgICAgICAgIGlmIChlLmtleSA9PT0gJ1RhYicgJiYgIWUudGFyZ2V0IHx8ICEoKF9tZW51UmVmJGN1cnJlbnQyID0gbWVudVJlZi5jdXJyZW50KSAhPSBudWxsICYmIF9tZW51UmVmJGN1cnJlbnQyLmNvbnRhaW5zKGUudGFyZ2V0KSkpIHtcbiAgICAgICAgICAgIG9uVG9nZ2xlKGZhbHNlLCBtZXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICBvbmNlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgIGlmIChrZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBvblRvZ2dsZShmYWxzZSwgbWV0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goU2VsZWN0YWJsZUNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZTogaGFuZGxlU2VsZWN0LFxuICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChEcm9wZG93bkNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgIHZhbHVlOiBjb250ZXh0LFxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgfSlcbiAgfSk7XG59XG5Ecm9wZG93bi5kaXNwbGF5TmFtZSA9ICdEcm9wZG93bic7XG5Ecm9wZG93bi5NZW51ID0gRHJvcGRvd25NZW51O1xuRHJvcGRvd24uVG9nZ2xlID0gRHJvcGRvd25Ub2dnbGU7XG5Ecm9wZG93bi5JdGVtID0gRHJvcGRvd25JdGVtO1xuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd247IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuY29uc3QgRHJvcGRvd25Db250ZXh0ID0gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUNvbnRleHQobnVsbCk7XG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bkNvbnRleHQ7IiwiY29uc3QgX2V4Y2x1ZGVkID0gW1wiZXZlbnRLZXlcIiwgXCJkaXNhYmxlZFwiLCBcIm9uQ2xpY2tcIiwgXCJhY3RpdmVcIiwgXCJhc1wiXTtcbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHIsIGUpIHsgaWYgKG51bGwgPT0gcikgcmV0dXJuIHt9OyB2YXIgdCA9IHt9OyBmb3IgKHZhciBuIGluIHIpIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHIsIG4pKSB7IGlmIChlLmluZGV4T2YobikgPj0gMCkgY29udGludWU7IHRbbl0gPSByW25dOyB9IHJldHVybiB0OyB9XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgU2VsZWN0YWJsZUNvbnRleHQsIHsgbWFrZUV2ZW50S2V5IH0gZnJvbSAnLi9TZWxlY3RhYmxlQ29udGV4dCc7XG5pbXBvcnQgTmF2Q29udGV4dCBmcm9tICcuL05hdkNvbnRleHQnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL0J1dHRvbic7XG5pbXBvcnQgeyBkYXRhQXR0ciB9IGZyb20gJy4vRGF0YUtleSc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLyoqXG4gKiBDcmVhdGUgYSBkcm9wZG93biBpdGVtLiBSZXR1cm5zIGEgc2V0IG9mIHByb3BzIGZvciB0aGUgZHJvcGRvd24gaXRlbSBjb21wb25lbnRcbiAqIGluY2x1ZGluZyBhbiBgb25DbGlja2AgaGFuZGxlciB0aGF0IHByZXZlbnRzIHNlbGVjdGlvbiB3aGVuIHRoZSBpdGVtIGlzIGRpc2FibGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VEcm9wZG93bkl0ZW0oe1xuICBrZXksXG4gIGhyZWYsXG4gIGFjdGl2ZSxcbiAgZGlzYWJsZWQsXG4gIG9uQ2xpY2tcbn0pIHtcbiAgY29uc3Qgb25TZWxlY3RDdHggPSB1c2VDb250ZXh0KFNlbGVjdGFibGVDb250ZXh0KTtcbiAgY29uc3QgbmF2Q29udGV4dCA9IHVzZUNvbnRleHQoTmF2Q29udGV4dCk7XG4gIGNvbnN0IHtcbiAgICBhY3RpdmVLZXlcbiAgfSA9IG5hdkNvbnRleHQgfHwge307XG4gIGNvbnN0IGV2ZW50S2V5ID0gbWFrZUV2ZW50S2V5KGtleSwgaHJlZik7XG4gIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlID09IG51bGwgJiYga2V5ICE9IG51bGwgPyBtYWtlRXZlbnRLZXkoYWN0aXZlS2V5KSA9PT0gZXZlbnRLZXkgOiBhY3RpdmU7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gdXNlRXZlbnRDYWxsYmFjayhldmVudCA9PiB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG4gICAgb25DbGljayA9PSBudWxsID8gdm9pZCAwIDogb25DbGljayhldmVudCk7XG4gICAgaWYgKG9uU2VsZWN0Q3R4ICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpKSB7XG4gICAgICBvblNlbGVjdEN0eChldmVudEtleSwgZXZlbnQpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBbe1xuICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgICdhcmlhLWRpc2FibGVkJzogZGlzYWJsZWQgfHwgdW5kZWZpbmVkLFxuICAgICdhcmlhLXNlbGVjdGVkJzogaXNBY3RpdmUsXG4gICAgW2RhdGFBdHRyKCdkcm9wZG93bi1pdGVtJyldOiAnJ1xuICB9LCB7XG4gICAgaXNBY3RpdmVcbiAgfV07XG59XG5jb25zdCBEcm9wZG93bkl0ZW0gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoX3JlZiwgcmVmKSA9PiB7XG4gIGxldCB7XG4gICAgICBldmVudEtleSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgb25DbGljayxcbiAgICAgIGFjdGl2ZSxcbiAgICAgIGFzOiBDb21wb25lbnQgPSBCdXR0b25cbiAgICB9ID0gX3JlZixcbiAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIF9leGNsdWRlZCk7XG4gIGNvbnN0IFtkcm9wZG93bkl0ZW1Qcm9wc10gPSB1c2VEcm9wZG93bkl0ZW0oe1xuICAgIGtleTogZXZlbnRLZXksXG4gICAgaHJlZjogcHJvcHMuaHJlZixcbiAgICBkaXNhYmxlZCxcbiAgICBvbkNsaWNrLFxuICAgIGFjdGl2ZVxuICB9KTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICByZWY6IHJlZlxuICB9LCBkcm9wZG93bkl0ZW1Qcm9wcykpO1xufSk7XG5Ecm9wZG93bkl0ZW0uZGlzcGxheU5hbWUgPSAnRHJvcGRvd25JdGVtJztcbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duSXRlbTsiLCJjb25zdCBfZXhjbHVkZWQgPSBbXCJjaGlsZHJlblwiLCBcInVzZVBvcHBlclwiXTtcbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHIsIGUpIHsgaWYgKG51bGwgPT0gcikgcmV0dXJuIHt9OyB2YXIgdCA9IHt9OyBmb3IgKHZhciBuIGluIHIpIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHIsIG4pKSB7IGlmIChlLmluZGV4T2YobikgPj0gMCkgY29udGludWU7IHRbbl0gPSByW25dOyB9IHJldHVybiB0OyB9XG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlQ2FsbGJhY2tSZWYgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlQ2FsbGJhY2tSZWYnO1xuaW1wb3J0IERyb3Bkb3duQ29udGV4dCBmcm9tICcuL0Ryb3Bkb3duQ29udGV4dCc7XG5pbXBvcnQgdXNlUG9wcGVyIGZyb20gJy4vdXNlUG9wcGVyJztcbmltcG9ydCB1c2VDbGlja091dHNpZGUgZnJvbSAnLi91c2VDbGlja091dHNpZGUnO1xuaW1wb3J0IG1lcmdlT3B0aW9uc1dpdGhQb3BwZXJDb25maWcgZnJvbSAnLi9tZXJnZU9wdGlvbnNXaXRoUG9wcGVyQ29uZmlnJztcbmltcG9ydCB7IEZyYWdtZW50IGFzIF9GcmFnbWVudCwganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuLyoqXG4gKiBAbWVtYmVyT2YgRHJvcGRvd25cbiAqIEBwYXJhbSB7b2JqZWN0fSAgb3B0aW9uc1xuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmZsaXAgQXV0b21hdGljYWxseSBhZGp1c3QgdGhlIG1lbnUgYGRyb3BgIHBvc2l0aW9uIGJhc2VkIG9uIHZpZXdwb3J0IGVkZ2UgZGV0ZWN0aW9uXG4gKiBAcGFyYW0ge1tudW1iZXIsIG51bWJlcl19IG9wdGlvbnMub2Zmc2V0IERlZmluZSBhbiBvZmZzZXQgZGlzdGFuY2UgYmV0d2VlbiB0aGUgTWVudSBhbmQgdGhlIFRvZ2dsZVxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnNob3cgRGlzcGxheSB0aGUgbWVudSBtYW51YWxseSwgaWdub3JlZCBpbiB0aGUgY29udGV4dCBvZiBhIGBEcm9wZG93bmBcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy51c2VQb3BwZXIgb3B0IGluL291dCBvZiB1c2luZyBQb3BwZXJKUyB0byBwb3NpdGlvbiBtZW51cy4gV2hlbiBkaXNhYmxlZCB5b3UgbXVzdCBwb3NpdGlvbiBpdCB5b3Vyc2VsZi5cbiAqIEBwYXJhbSB7c3RyaW5nfSAgb3B0aW9ucy5yb290Q2xvc2VFdmVudCBUaGUgcG9pbnRlciBldmVudCB0byBsaXN0ZW4gZm9yIHdoZW4gZGV0ZXJtaW5pbmcgXCJjbGlja3Mgb3V0c2lkZVwiIHRoZSBtZW51IGZvciB0cmlnZ2VyaW5nIGEgY2xvc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gIG9wdGlvbnMucG9wcGVyQ29uZmlnIE9wdGlvbnMgcGFzc2VkIHRvIHRoZSBbYHVzZVBvcHBlcmBdKC9hcGkvdXNlUG9wcGVyKSBob29rLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlRHJvcGRvd25NZW51KG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChEcm9wZG93bkNvbnRleHQpO1xuICBjb25zdCBbYXJyb3dFbGVtZW50LCBhdHRhY2hBcnJvd1JlZl0gPSB1c2VDYWxsYmFja1JlZigpO1xuICBjb25zdCBoYXNTaG93blJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHtcbiAgICBmbGlwLFxuICAgIG9mZnNldCxcbiAgICByb290Q2xvc2VFdmVudCxcbiAgICBmaXhlZCA9IGZhbHNlLFxuICAgIHBsYWNlbWVudDogcGxhY2VtZW50T3ZlcnJpZGUsXG4gICAgcG9wcGVyQ29uZmlnID0ge30sXG4gICAgZW5hYmxlRXZlbnRMaXN0ZW5lcnMgPSB0cnVlLFxuICAgIHVzZVBvcHBlcjogc2hvdWxkVXNlUG9wcGVyID0gISFjb250ZXh0XG4gIH0gPSBvcHRpb25zO1xuICBjb25zdCBzaG93ID0gKGNvbnRleHQgPT0gbnVsbCA/IHZvaWQgMCA6IGNvbnRleHQuc2hvdykgPT0gbnVsbCA/ICEhb3B0aW9ucy5zaG93IDogY29udGV4dC5zaG93O1xuICBpZiAoc2hvdyAmJiAhaGFzU2hvd25SZWYuY3VycmVudCkge1xuICAgIGhhc1Nob3duUmVmLmN1cnJlbnQgPSB0cnVlO1xuICB9XG4gIGNvbnN0IGhhbmRsZUNsb3NlID0gZSA9PiB7XG4gICAgY29udGV4dCA9PSBudWxsID8gdm9pZCAwIDogY29udGV4dC50b2dnbGUoZmFsc2UsIGUpO1xuICB9O1xuICBjb25zdCB7XG4gICAgcGxhY2VtZW50LFxuICAgIHNldE1lbnUsXG4gICAgbWVudUVsZW1lbnQsXG4gICAgdG9nZ2xlRWxlbWVudFxuICB9ID0gY29udGV4dCB8fCB7fTtcbiAgY29uc3QgcG9wcGVyID0gdXNlUG9wcGVyKHRvZ2dsZUVsZW1lbnQsIG1lbnVFbGVtZW50LCBtZXJnZU9wdGlvbnNXaXRoUG9wcGVyQ29uZmlnKHtcbiAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudE92ZXJyaWRlIHx8IHBsYWNlbWVudCB8fCAnYm90dG9tLXN0YXJ0JyxcbiAgICBlbmFibGVkOiBzaG91bGRVc2VQb3BwZXIsXG4gICAgZW5hYmxlRXZlbnRzOiBlbmFibGVFdmVudExpc3RlbmVycyA9PSBudWxsID8gc2hvdyA6IGVuYWJsZUV2ZW50TGlzdGVuZXJzLFxuICAgIG9mZnNldCxcbiAgICBmbGlwLFxuICAgIGZpeGVkLFxuICAgIGFycm93RWxlbWVudCxcbiAgICBwb3BwZXJDb25maWdcbiAgfSkpO1xuICBjb25zdCBtZW51UHJvcHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICByZWY6IHNldE1lbnUgfHwgbm9vcCxcbiAgICAnYXJpYS1sYWJlbGxlZGJ5JzogdG9nZ2xlRWxlbWVudCA9PSBudWxsID8gdm9pZCAwIDogdG9nZ2xlRWxlbWVudC5pZFxuICB9LCBwb3BwZXIuYXR0cmlidXRlcy5wb3BwZXIsIHtcbiAgICBzdHlsZTogcG9wcGVyLnN0eWxlcy5wb3BwZXJcbiAgfSk7XG4gIGNvbnN0IG1ldGFkYXRhID0ge1xuICAgIHNob3csXG4gICAgcGxhY2VtZW50LFxuICAgIGhhc1Nob3duOiBoYXNTaG93blJlZi5jdXJyZW50LFxuICAgIHRvZ2dsZTogY29udGV4dCA9PSBudWxsID8gdm9pZCAwIDogY29udGV4dC50b2dnbGUsXG4gICAgcG9wcGVyOiBzaG91bGRVc2VQb3BwZXIgPyBwb3BwZXIgOiBudWxsLFxuICAgIGFycm93UHJvcHM6IHNob3VsZFVzZVBvcHBlciA/IE9iamVjdC5hc3NpZ24oe1xuICAgICAgcmVmOiBhdHRhY2hBcnJvd1JlZlxuICAgIH0sIHBvcHBlci5hdHRyaWJ1dGVzLmFycm93LCB7XG4gICAgICBzdHlsZTogcG9wcGVyLnN0eWxlcy5hcnJvd1xuICAgIH0pIDoge31cbiAgfTtcbiAgdXNlQ2xpY2tPdXRzaWRlKG1lbnVFbGVtZW50LCBoYW5kbGVDbG9zZSwge1xuICAgIGNsaWNrVHJpZ2dlcjogcm9vdENsb3NlRXZlbnQsXG4gICAgZGlzYWJsZWQ6ICFzaG93XG4gIH0pO1xuICByZXR1cm4gW21lbnVQcm9wcywgbWV0YWRhdGFdO1xufVxuLyoqXG4gKiBBbHNvIGV4cG9ydGVkIGFzIGA8RHJvcGRvd24uTWVudT5gIGZyb20gYERyb3Bkb3duYC5cbiAqXG4gKiBAZGlzcGxheU5hbWUgRHJvcGRvd25NZW51XG4gKiBAbWVtYmVyT2YgRHJvcGRvd25cbiAqL1xuZnVuY3Rpb24gRHJvcGRvd25NZW51KF9yZWYpIHtcbiAgbGV0IHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdXNlUG9wcGVyOiB1c2VQb3BwZXJQcm9wID0gdHJ1ZVxuICAgIH0gPSBfcmVmLFxuICAgIG9wdGlvbnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBfZXhjbHVkZWQpO1xuICBjb25zdCBbcHJvcHMsIG1ldGFdID0gdXNlRHJvcGRvd25NZW51KE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICB1c2VQb3BwZXI6IHVzZVBvcHBlclByb3BcbiAgfSkpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goX0ZyYWdtZW50LCB7XG4gICAgY2hpbGRyZW46IGNoaWxkcmVuKHByb3BzLCBtZXRhKVxuICB9KTtcbn1cbkRyb3Bkb3duTWVudS5kaXNwbGF5TmFtZSA9ICdEcm9wZG93bk1lbnUnO1xuXG4vKiogQGNvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd25NZW51OyIsImltcG9ydCB7IHVzZUNvbnRleHQsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU1NSU2FmZUlkIH0gZnJvbSAnLi9zc3InO1xuaW1wb3J0IERyb3Bkb3duQ29udGV4dCBmcm9tICcuL0Ryb3Bkb3duQ29udGV4dCc7XG5pbXBvcnQgeyBGcmFnbWVudCBhcyBfRnJhZ21lbnQsIGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5leHBvcnQgY29uc3QgaXNSb2xlTWVudSA9IGVsID0+IHtcbiAgdmFyIF9lbCRnZXRBdHRyaWJ1dGU7XG4gIHJldHVybiAoKF9lbCRnZXRBdHRyaWJ1dGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9lbCRnZXRBdHRyaWJ1dGUudG9Mb3dlckNhc2UoKSkgPT09ICdtZW51Jztcbn07XG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbi8qKlxuICogV2lyZXMgdXAgRHJvcGRvd24gdG9nZ2xlIGZ1bmN0aW9uYWxpdHksIHJldHVybmluZyBhIHNldCBhIHByb3BzIHRvIGF0dGFjaFxuICogdG8gdGhlIGVsZW1lbnQgdGhhdCBmdW5jdGlvbnMgYXMgdGhlIGRyb3Bkb3duIHRvZ2dsZSAoZ2VuZXJhbGx5IGEgYnV0dG9uKS5cbiAqXG4gKiBAbWVtYmVyT2YgRHJvcGRvd25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZURyb3Bkb3duVG9nZ2xlKCkge1xuICBjb25zdCBpZCA9IHVzZVNTUlNhZmVJZCgpO1xuICBjb25zdCB7XG4gICAgc2hvdyA9IGZhbHNlLFxuICAgIHRvZ2dsZSA9IG5vb3AsXG4gICAgc2V0VG9nZ2xlLFxuICAgIG1lbnVFbGVtZW50XG4gIH0gPSB1c2VDb250ZXh0KERyb3Bkb3duQ29udGV4dCkgfHwge307XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gdXNlQ2FsbGJhY2soZSA9PiB7XG4gICAgdG9nZ2xlKCFzaG93LCBlKTtcbiAgfSwgW3Nob3csIHRvZ2dsZV0pO1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBpZCxcbiAgICByZWY6IHNldFRvZ2dsZSB8fCBub29wLFxuICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgICdhcmlhLWV4cGFuZGVkJzogISFzaG93XG4gIH07XG5cbiAgLy8gVGhpcyBpcyBtYXliZSBiZXR0ZXIgZG93biBpbiBhbiBlZmZlY3QsIGJ1dFxuICAvLyB0aGUgY29tcG9uZW50IGlzIGdvaW5nIHRvIHVwZGF0ZSBhbnl3YXkgd2hlbiB0aGUgbWVudSBlbGVtZW50XG4gIC8vIGlzIHNldCBzbyBtaWdodCByZXR1cm4gbmV3IHByb3BzLlxuICBpZiAobWVudUVsZW1lbnQgJiYgaXNSb2xlTWVudShtZW51RWxlbWVudCkpIHtcbiAgICBwcm9wc1snYXJpYS1oYXNwb3B1cCddID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gW3Byb3BzLCB7XG4gICAgc2hvdyxcbiAgICB0b2dnbGVcbiAgfV07XG59XG4vKipcbiAqIEFsc28gZXhwb3J0ZWQgYXMgYDxEcm9wZG93bi5Ub2dnbGU+YCBmcm9tIGBEcm9wZG93bmAuXG4gKlxuICogQGRpc3BsYXlOYW1lIERyb3Bkb3duVG9nZ2xlXG4gKiBAbWVtYmVyT2YgRHJvcGRvd25cbiAqL1xuZnVuY3Rpb24gRHJvcGRvd25Ub2dnbGUoe1xuICBjaGlsZHJlblxufSkge1xuICBjb25zdCBbcHJvcHMsIG1ldGFdID0gdXNlRHJvcGRvd25Ub2dnbGUoKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KF9GcmFnbWVudCwge1xuICAgIGNoaWxkcmVuOiBjaGlsZHJlbihwcm9wcywgbWV0YSlcbiAgfSk7XG59XG5Ecm9wZG93blRvZ2dsZS5kaXNwbGF5TmFtZSA9ICdEcm9wZG93blRvZ2dsZSc7XG5cbi8qKiBAY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93blRvZ2dsZTsiLCJjb25zdCBfZXhjbHVkZWQgPSBbXCJhc1wiLCBcIm9uU2VsZWN0XCIsIFwiYWN0aXZlS2V5XCIsIFwicm9sZVwiLCBcIm9uS2V5RG93blwiXTtcbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHIsIGUpIHsgaWYgKG51bGwgPT0gcikgcmV0dXJuIHt9OyB2YXIgdCA9IHt9OyBmb3IgKHZhciBuIGluIHIpIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHIsIG4pKSB7IGlmIChlLmluZGV4T2YobikgPj0gMCkgY29udGludWU7IHRbbl0gPSByW25dOyB9IHJldHVybiB0OyB9XG5pbXBvcnQgcXNhIGZyb20gJ2RvbS1oZWxwZXJzL3F1ZXJ5U2VsZWN0b3JBbGwnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlRm9yY2VVcGRhdGUgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRm9yY2VVcGRhdGUnO1xuaW1wb3J0IHVzZU1lcmdlZFJlZnMgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlTWVyZ2VkUmVmcyc7XG5pbXBvcnQgTmF2Q29udGV4dCBmcm9tICcuL05hdkNvbnRleHQnO1xuaW1wb3J0IFNlbGVjdGFibGVDb250ZXh0LCB7IG1ha2VFdmVudEtleSB9IGZyb20gJy4vU2VsZWN0YWJsZUNvbnRleHQnO1xuaW1wb3J0IFRhYkNvbnRleHQgZnJvbSAnLi9UYWJDb250ZXh0JztcbmltcG9ydCB7IGRhdGFBdHRyLCBkYXRhUHJvcCB9IGZyb20gJy4vRGF0YUtleSc7XG5pbXBvcnQgTmF2SXRlbSBmcm9tICcuL05hdkl0ZW0nO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcbmNvbnN0IEVWRU5UX0tFWV9BVFRSID0gZGF0YUF0dHIoJ2V2ZW50LWtleScpO1xuY29uc3QgTmF2ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKF9yZWYsIHJlZikgPT4ge1xuICBsZXQge1xuICAgICAgLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuICAgICAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAgICAgb25TZWxlY3QsXG4gICAgICBhY3RpdmVLZXksXG4gICAgICByb2xlLFxuICAgICAgb25LZXlEb3duXG4gICAgfSA9IF9yZWYsXG4gICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBfZXhjbHVkZWQpO1xuICAvLyBBIHJlZiBhbmQgZm9yY2VVcGRhdGUgZm9yIHJlZm9jdXMsIGIvYyB3ZSBvbmx5IHdhbnQgdG8gdHJpZ2dlciB3aGVuIG5lZWRlZFxuICAvLyBhbmQgZG9uJ3Qgd2FudCB0byByZXNldCB0aGUgc2V0IGluIHRoZSBlZmZlY3RcbiAgY29uc3QgZm9yY2VVcGRhdGUgPSB1c2VGb3JjZVVwZGF0ZSgpO1xuICBjb25zdCBuZWVkc1JlZm9jdXNSZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBwYXJlbnRPblNlbGVjdCA9IHVzZUNvbnRleHQoU2VsZWN0YWJsZUNvbnRleHQpO1xuICBjb25zdCB0YWJDb250ZXh0ID0gdXNlQ29udGV4dChUYWJDb250ZXh0KTtcbiAgbGV0IGdldENvbnRyb2xsZWRJZCwgZ2V0Q29udHJvbGxlcklkO1xuICBpZiAodGFiQ29udGV4dCkge1xuICAgIHJvbGUgPSByb2xlIHx8ICd0YWJsaXN0JztcbiAgICBhY3RpdmVLZXkgPSB0YWJDb250ZXh0LmFjdGl2ZUtleTtcbiAgICAvLyBUT0RPOiBkbyB3ZSBuZWVkIHRvIGR1cGxpY2F0ZSB0aGVzZT9cbiAgICBnZXRDb250cm9sbGVkSWQgPSB0YWJDb250ZXh0LmdldENvbnRyb2xsZWRJZDtcbiAgICBnZXRDb250cm9sbGVySWQgPSB0YWJDb250ZXh0LmdldENvbnRyb2xsZXJJZDtcbiAgfVxuICBjb25zdCBsaXN0Tm9kZSA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgZ2V0TmV4dEFjdGl2ZVRhYiA9IG9mZnNldCA9PiB7XG4gICAgY29uc3QgY3VycmVudExpc3ROb2RlID0gbGlzdE5vZGUuY3VycmVudDtcbiAgICBpZiAoIWN1cnJlbnRMaXN0Tm9kZSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgaXRlbXMgPSBxc2EoY3VycmVudExpc3ROb2RlLCBgWyR7RVZFTlRfS0VZX0FUVFJ9XTpub3QoW2FyaWEtZGlzYWJsZWQ9dHJ1ZV0pYCk7XG4gICAgY29uc3QgYWN0aXZlQ2hpbGQgPSBjdXJyZW50TGlzdE5vZGUucXVlcnlTZWxlY3RvcignW2FyaWEtc2VsZWN0ZWQ9dHJ1ZV0nKTtcbiAgICBpZiAoIWFjdGl2ZUNoaWxkIHx8IGFjdGl2ZUNoaWxkICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBpbmRleCA9IGl0ZW1zLmluZGV4T2YoYWN0aXZlQ2hpbGQpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHJldHVybiBudWxsO1xuICAgIGxldCBuZXh0SW5kZXggPSBpbmRleCArIG9mZnNldDtcbiAgICBpZiAobmV4dEluZGV4ID49IGl0ZW1zLmxlbmd0aCkgbmV4dEluZGV4ID0gMDtcbiAgICBpZiAobmV4dEluZGV4IDwgMCkgbmV4dEluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gaXRlbXNbbmV4dEluZGV4XTtcbiAgfTtcbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gKGtleSwgZXZlbnQpID0+IHtcbiAgICBpZiAoa2V5ID09IG51bGwpIHJldHVybjtcbiAgICBvblNlbGVjdCA9PSBudWxsID8gdm9pZCAwIDogb25TZWxlY3Qoa2V5LCBldmVudCk7XG4gICAgcGFyZW50T25TZWxlY3QgPT0gbnVsbCA/IHZvaWQgMCA6IHBhcmVudE9uU2VsZWN0KGtleSwgZXZlbnQpO1xuICB9O1xuICBjb25zdCBoYW5kbGVLZXlEb3duID0gZXZlbnQgPT4ge1xuICAgIG9uS2V5RG93biA9PSBudWxsID8gdm9pZCAwIDogb25LZXlEb3duKGV2ZW50KTtcbiAgICBpZiAoIXRhYkNvbnRleHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IG5leHRBY3RpdmVDaGlsZDtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBuZXh0QWN0aXZlQ2hpbGQgPSBnZXROZXh0QWN0aXZlVGFiKC0xKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIG5leHRBY3RpdmVDaGlsZCA9IGdldE5leHRBY3RpdmVUYWIoMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIW5leHRBY3RpdmVDaGlsZCkgcmV0dXJuO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGFuZGxlU2VsZWN0KG5leHRBY3RpdmVDaGlsZC5kYXRhc2V0W2RhdGFQcm9wKCdFdmVudEtleScpXSB8fCBudWxsLCBldmVudCk7XG4gICAgbmVlZHNSZWZvY3VzUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGZvcmNlVXBkYXRlKCk7XG4gIH07XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGxpc3ROb2RlLmN1cnJlbnQgJiYgbmVlZHNSZWZvY3VzUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IGFjdGl2ZUNoaWxkID0gbGlzdE5vZGUuY3VycmVudC5xdWVyeVNlbGVjdG9yKGBbJHtFVkVOVF9LRVlfQVRUUn1dW2FyaWEtc2VsZWN0ZWQ9dHJ1ZV1gKTtcbiAgICAgIGFjdGl2ZUNoaWxkID09IG51bGwgPyB2b2lkIDAgOiBhY3RpdmVDaGlsZC5mb2N1cygpO1xuICAgIH1cbiAgICBuZWVkc1JlZm9jdXNSZWYuY3VycmVudCA9IGZhbHNlO1xuICB9KTtcbiAgY29uc3QgbWVyZ2VkUmVmID0gdXNlTWVyZ2VkUmVmcyhyZWYsIGxpc3ROb2RlKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KFNlbGVjdGFibGVDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IGhhbmRsZVNlbGVjdCxcbiAgICBjaGlsZHJlbjogLyojX19QVVJFX18qL19qc3goTmF2Q29udGV4dC5Qcm92aWRlciwge1xuICAgICAgdmFsdWU6IHtcbiAgICAgICAgcm9sZSxcbiAgICAgICAgLy8gdXNlZCBieSBOYXZMaW5rIHRvIGRldGVybWluZSBpdCdzIHJvbGVcbiAgICAgICAgYWN0aXZlS2V5OiBtYWtlRXZlbnRLZXkoYWN0aXZlS2V5KSxcbiAgICAgICAgZ2V0Q29udHJvbGxlZElkOiBnZXRDb250cm9sbGVkSWQgfHwgbm9vcCxcbiAgICAgICAgZ2V0Q29udHJvbGxlcklkOiBnZXRDb250cm9sbGVySWQgfHwgbm9vcFxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIE9iamVjdC5hc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgIG9uS2V5RG93bjogaGFuZGxlS2V5RG93bixcbiAgICAgICAgcmVmOiBtZXJnZWRSZWYsXG4gICAgICAgIHJvbGU6IHJvbGVcbiAgICAgIH0pKVxuICAgIH0pXG4gIH0pO1xufSk7XG5OYXYuZGlzcGxheU5hbWUgPSAnTmF2JztcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oTmF2LCB7XG4gIEl0ZW06IE5hdkl0ZW1cbn0pOyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IE5hdkNvbnRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlQ29udGV4dChudWxsKTtcbk5hdkNvbnRleHQuZGlzcGxheU5hbWUgPSAnTmF2Q29udGV4dCc7XG5leHBvcnQgZGVmYXVsdCBOYXZDb250ZXh0OyIsImNvbnN0IF9leGNsdWRlZCA9IFtcImFzXCIsIFwiYWN0aXZlXCIsIFwiZXZlbnRLZXlcIl07XG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShyLCBlKSB7IGlmIChudWxsID09IHIpIHJldHVybiB7fTsgdmFyIHQgPSB7fTsgZm9yICh2YXIgbiBpbiByKSBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChyLCBuKSkgeyBpZiAoZS5pbmRleE9mKG4pID49IDApIGNvbnRpbnVlOyB0W25dID0gcltuXTsgfSByZXR1cm4gdDsgfVxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1c2VFdmVudENhbGxiYWNrIGZyb20gJ0ByZXN0YXJ0L2hvb2tzL3VzZUV2ZW50Q2FsbGJhY2snO1xuaW1wb3J0IE5hdkNvbnRleHQgZnJvbSAnLi9OYXZDb250ZXh0JztcbmltcG9ydCBTZWxlY3RhYmxlQ29udGV4dCwgeyBtYWtlRXZlbnRLZXkgfSBmcm9tICcuL1NlbGVjdGFibGVDb250ZXh0JztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHsgZGF0YUF0dHIgfSBmcm9tICcuL0RhdGFLZXknO1xuaW1wb3J0IFRhYkNvbnRleHQgZnJvbSAnLi9UYWJDb250ZXh0JztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5leHBvcnQgZnVuY3Rpb24gdXNlTmF2SXRlbSh7XG4gIGtleSxcbiAgb25DbGljayxcbiAgYWN0aXZlLFxuICBpZCxcbiAgcm9sZSxcbiAgZGlzYWJsZWRcbn0pIHtcbiAgY29uc3QgcGFyZW50T25TZWxlY3QgPSB1c2VDb250ZXh0KFNlbGVjdGFibGVDb250ZXh0KTtcbiAgY29uc3QgbmF2Q29udGV4dCA9IHVzZUNvbnRleHQoTmF2Q29udGV4dCk7XG4gIGNvbnN0IHRhYkNvbnRleHQgPSB1c2VDb250ZXh0KFRhYkNvbnRleHQpO1xuICBsZXQgaXNBY3RpdmUgPSBhY3RpdmU7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIHJvbGVcbiAgfTtcbiAgaWYgKG5hdkNvbnRleHQpIHtcbiAgICBpZiAoIXJvbGUgJiYgbmF2Q29udGV4dC5yb2xlID09PSAndGFibGlzdCcpIHByb3BzLnJvbGUgPSAndGFiJztcbiAgICBjb25zdCBjb250ZXh0Q29udHJvbGxlcklkID0gbmF2Q29udGV4dC5nZXRDb250cm9sbGVySWQoa2V5ICE9IG51bGwgPyBrZXkgOiBudWxsKTtcbiAgICBjb25zdCBjb250ZXh0Q29udHJvbGxlZElkID0gbmF2Q29udGV4dC5nZXRDb250cm9sbGVkSWQoa2V5ICE9IG51bGwgPyBrZXkgOiBudWxsKTtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcm9wc1tkYXRhQXR0cignZXZlbnQta2V5JyldID0ga2V5O1xuICAgIHByb3BzLmlkID0gY29udGV4dENvbnRyb2xsZXJJZCB8fCBpZDtcbiAgICBpc0FjdGl2ZSA9IGFjdGl2ZSA9PSBudWxsICYmIGtleSAhPSBudWxsID8gbmF2Q29udGV4dC5hY3RpdmVLZXkgPT09IGtleSA6IGFjdGl2ZTtcblxuICAgIC8qKlxuICAgICAqIFNpbXBsaWZpZWQgc2NlbmFyaW8gZm9yIGBtb3VudE9uRW50ZXJgLlxuICAgICAqXG4gICAgICogV2hpbGUgaXQgd291bGQgbWFrZSBzZW5zZSB0byBrZWVwICdhcmlhLWNvbnRyb2xzJyBmb3IgdGFicyB0aGF0IGhhdmUgYmVlbiBtb3VudGVkIGF0IGxlYXN0XG4gICAgICogb25jZSwgaXQgd291bGQgYWxzbyBjb21wbGljYXRlIHRoZSBjb2RlIHF1aXRlIGEgYml0LCBmb3IgdmVyeSBsaXR0bGUgZ2Fpbi5cbiAgICAgKiBUaGUgZm9sbG93aW5nIGltcGxlbWVudGF0aW9uIGlzIHByb2JhYmx5IGdvb2QgZW5vdWdoLlxuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVhY3QtcmVzdGFydC91aS9wdWxsLzQwI2lzc3VlY29tbWVudC0xMDA5OTcxNTYxXG4gICAgICovXG4gICAgaWYgKGlzQWN0aXZlIHx8ICEodGFiQ29udGV4dCAhPSBudWxsICYmIHRhYkNvbnRleHQudW5tb3VudE9uRXhpdCkgJiYgISh0YWJDb250ZXh0ICE9IG51bGwgJiYgdGFiQ29udGV4dC5tb3VudE9uRW50ZXIpKSBwcm9wc1snYXJpYS1jb250cm9scyddID0gY29udGV4dENvbnRyb2xsZWRJZDtcbiAgfVxuICBpZiAocHJvcHMucm9sZSA9PT0gJ3RhYicpIHtcbiAgICBwcm9wc1snYXJpYS1zZWxlY3RlZCddID0gaXNBY3RpdmU7XG4gICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgcHJvcHMudGFiSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICBwcm9wcy50YWJJbmRleCA9IC0xO1xuICAgICAgcHJvcHNbJ2FyaWEtZGlzYWJsZWQnXSA9IHRydWU7XG4gICAgfVxuICB9XG4gIHByb3BzLm9uQ2xpY2sgPSB1c2VFdmVudENhbGxiYWNrKGUgPT4ge1xuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgIG9uQ2xpY2sgPT0gbnVsbCA/IHZvaWQgMCA6IG9uQ2xpY2soZSk7XG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChwYXJlbnRPblNlbGVjdCAmJiAhZS5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpKSB7XG4gICAgICBwYXJlbnRPblNlbGVjdChrZXksIGUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBbcHJvcHMsIHtcbiAgICBpc0FjdGl2ZVxuICB9XTtcbn1cbmNvbnN0IE5hdkl0ZW0gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoX3JlZiwgcmVmKSA9PiB7XG4gIGxldCB7XG4gICAgICBhczogQ29tcG9uZW50ID0gQnV0dG9uLFxuICAgICAgYWN0aXZlLFxuICAgICAgZXZlbnRLZXlcbiAgICB9ID0gX3JlZixcbiAgICBvcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgX2V4Y2x1ZGVkKTtcbiAgY29uc3QgW3Byb3BzLCBtZXRhXSA9IHVzZU5hdkl0ZW0oT2JqZWN0LmFzc2lnbih7XG4gICAga2V5OiBtYWtlRXZlbnRLZXkoZXZlbnRLZXksIG9wdGlvbnMuaHJlZiksXG4gICAgYWN0aXZlXG4gIH0sIG9wdGlvbnMpKTtcblxuICAvLyBAdHMtaWdub3JlXG4gIHByb3BzW2RhdGFBdHRyKCdhY3RpdmUnKV0gPSBtZXRhLmlzQWN0aXZlO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCBwcm9wcywge1xuICAgIHJlZjogcmVmXG4gIH0pKTtcbn0pO1xuTmF2SXRlbS5kaXNwbGF5TmFtZSA9ICdOYXZJdGVtJztcbmV4cG9ydCBkZWZhdWx0IE5hdkl0ZW07IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgdXNlQ2FsbGJhY2tSZWYgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlQ2FsbGJhY2tSZWYnO1xuaW1wb3J0IHVzZU1lcmdlZFJlZnMgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlTWVyZ2VkUmVmcyc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1c2VQb3BwZXIgZnJvbSAnLi91c2VQb3BwZXInO1xuaW1wb3J0IHVzZVJvb3RDbG9zZSBmcm9tICcuL3VzZVJvb3RDbG9zZSc7XG5pbXBvcnQgdXNlV2FpdEZvckRPTVJlZiBmcm9tICcuL3VzZVdhaXRGb3JET01SZWYnO1xuaW1wb3J0IG1lcmdlT3B0aW9uc1dpdGhQb3BwZXJDb25maWcgZnJvbSAnLi9tZXJnZU9wdGlvbnNXaXRoUG9wcGVyQ29uZmlnJztcbmltcG9ydCB7IHJlbmRlclRyYW5zaXRpb24gfSBmcm9tICcuL0ltcGVyYXRpdmVUcmFuc2l0aW9uJztcbi8qKlxuICogQnVpbHQgb24gdG9wIG9mIGBQb3BwZXIuanNgLCB0aGUgb3ZlcmxheSBjb21wb25lbnQgaXNcbiAqIGdyZWF0IGZvciBjdXN0b20gdG9vbHRpcCBvdmVybGF5cy5cbiAqL1xuY29uc3QgT3ZlcmxheSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgb3V0ZXJSZWYpID0+IHtcbiAgY29uc3Qge1xuICAgIGZsaXAsXG4gICAgb2Zmc2V0LFxuICAgIHBsYWNlbWVudCxcbiAgICBjb250YWluZXJQYWRkaW5nLFxuICAgIHBvcHBlckNvbmZpZyA9IHt9LFxuICAgIHRyYW5zaXRpb246IFRyYW5zaXRpb24sXG4gICAgcnVuVHJhbnNpdGlvblxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IFtyb290RWxlbWVudCwgYXR0YWNoUmVmXSA9IHVzZUNhbGxiYWNrUmVmKCk7XG4gIGNvbnN0IFthcnJvd0VsZW1lbnQsIGF0dGFjaEFycm93UmVmXSA9IHVzZUNhbGxiYWNrUmVmKCk7XG4gIGNvbnN0IG1lcmdlZFJlZiA9IHVzZU1lcmdlZFJlZnMoYXR0YWNoUmVmLCBvdXRlclJlZik7XG4gIGNvbnN0IGNvbnRhaW5lciA9IHVzZVdhaXRGb3JET01SZWYocHJvcHMuY29udGFpbmVyKTtcbiAgY29uc3QgdGFyZ2V0ID0gdXNlV2FpdEZvckRPTVJlZihwcm9wcy50YXJnZXQpO1xuICBjb25zdCBbZXhpdGVkLCBzZXRFeGl0ZWRdID0gdXNlU3RhdGUoIXByb3BzLnNob3cpO1xuICBjb25zdCBwb3BwZXIgPSB1c2VQb3BwZXIodGFyZ2V0LCByb290RWxlbWVudCwgbWVyZ2VPcHRpb25zV2l0aFBvcHBlckNvbmZpZyh7XG4gICAgcGxhY2VtZW50LFxuICAgIGVuYWJsZUV2ZW50czogISFwcm9wcy5zaG93LFxuICAgIGNvbnRhaW5lclBhZGRpbmc6IGNvbnRhaW5lclBhZGRpbmcgfHwgNSxcbiAgICBmbGlwLFxuICAgIG9mZnNldCxcbiAgICBhcnJvd0VsZW1lbnQsXG4gICAgcG9wcGVyQ29uZmlnXG4gIH0pKTtcblxuICAvLyBUT0RPOiBJIHRoaW5rIHRoaXMgbmVlZHMgdG8gYmUgaW4gYW4gZWZmZWN0XG4gIGlmIChwcm9wcy5zaG93ICYmIGV4aXRlZCkge1xuICAgIHNldEV4aXRlZChmYWxzZSk7XG4gIH1cbiAgY29uc3QgaGFuZGxlSGlkZGVuID0gKC4uLmFyZ3MpID0+IHtcbiAgICBzZXRFeGl0ZWQodHJ1ZSk7XG4gICAgaWYgKHByb3BzLm9uRXhpdGVkKSB7XG4gICAgICBwcm9wcy5vbkV4aXRlZCguLi5hcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRG9uJ3QgdW4tcmVuZGVyIHRoZSBvdmVybGF5IHdoaWxlIGl0J3MgdHJhbnNpdGlvbmluZyBvdXQuXG4gIGNvbnN0IG1vdW50T3ZlcmxheSA9IHByb3BzLnNob3cgfHwgIWV4aXRlZDtcbiAgdXNlUm9vdENsb3NlKHJvb3RFbGVtZW50LCBwcm9wcy5vbkhpZGUsIHtcbiAgICBkaXNhYmxlZDogIXByb3BzLnJvb3RDbG9zZSB8fCBwcm9wcy5yb290Q2xvc2VEaXNhYmxlZCxcbiAgICBjbGlja1RyaWdnZXI6IHByb3BzLnJvb3RDbG9zZUV2ZW50XG4gIH0pO1xuICBpZiAoIW1vdW50T3ZlcmxheSkge1xuICAgIC8vIERvbid0IGJvdGhlciBzaG93aW5nIGFueXRoaW5nIGlmIHdlIGRvbid0IGhhdmUgdG8uXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3Qge1xuICAgIG9uRXhpdCxcbiAgICBvbkV4aXRpbmcsXG4gICAgb25FbnRlcixcbiAgICBvbkVudGVyaW5nLFxuICAgIG9uRW50ZXJlZFxuICB9ID0gcHJvcHM7XG4gIGxldCBjaGlsZCA9IHByb3BzLmNoaWxkcmVuKE9iamVjdC5hc3NpZ24oe30sIHBvcHBlci5hdHRyaWJ1dGVzLnBvcHBlciwge1xuICAgIHN0eWxlOiBwb3BwZXIuc3R5bGVzLnBvcHBlcixcbiAgICByZWY6IG1lcmdlZFJlZlxuICB9KSwge1xuICAgIHBvcHBlcixcbiAgICBwbGFjZW1lbnQsXG4gICAgc2hvdzogISFwcm9wcy5zaG93LFxuICAgIGFycm93UHJvcHM6IE9iamVjdC5hc3NpZ24oe30sIHBvcHBlci5hdHRyaWJ1dGVzLmFycm93LCB7XG4gICAgICBzdHlsZTogcG9wcGVyLnN0eWxlcy5hcnJvdyxcbiAgICAgIHJlZjogYXR0YWNoQXJyb3dSZWZcbiAgICB9KVxuICB9KTtcbiAgY2hpbGQgPSByZW5kZXJUcmFuc2l0aW9uKFRyYW5zaXRpb24sIHJ1blRyYW5zaXRpb24sIHtcbiAgICBpbjogISFwcm9wcy5zaG93LFxuICAgIGFwcGVhcjogdHJ1ZSxcbiAgICBtb3VudE9uRW50ZXI6IHRydWUsXG4gICAgdW5tb3VudE9uRXhpdDogdHJ1ZSxcbiAgICBjaGlsZHJlbjogY2hpbGQsXG4gICAgb25FeGl0LFxuICAgIG9uRXhpdGluZyxcbiAgICBvbkV4aXRlZDogaGFuZGxlSGlkZGVuLFxuICAgIG9uRW50ZXIsXG4gICAgb25FbnRlcmluZyxcbiAgICBvbkVudGVyZWRcbiAgfSk7XG4gIHJldHVybiBjb250YWluZXIgPyAvKiNfX1BVUkVfXyovUmVhY3RET00uY3JlYXRlUG9ydGFsKGNoaWxkLCBjb250YWluZXIpIDogbnVsbDtcbn0pO1xuT3ZlcmxheS5kaXNwbGF5TmFtZSA9ICdPdmVybGF5JztcbmV4cG9ydCBkZWZhdWx0IE92ZXJsYXk7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuY29uc3QgVGFiQ29udGV4dCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVDb250ZXh0KG51bGwpO1xuZXhwb3J0IGRlZmF1bHQgVGFiQ29udGV4dDsiLCJjb25zdCBfZXhjbHVkZWQgPSBbXCJhY3RpdmVcIiwgXCJldmVudEtleVwiLCBcIm1vdW50T25FbnRlclwiLCBcInRyYW5zaXRpb25cIiwgXCJ1bm1vdW50T25FeGl0XCIsIFwicm9sZVwiLCBcIm9uRW50ZXJcIiwgXCJvbkVudGVyaW5nXCIsIFwib25FbnRlcmVkXCIsIFwib25FeGl0XCIsIFwib25FeGl0aW5nXCIsIFwib25FeGl0ZWRcIl0sXG4gIF9leGNsdWRlZDIgPSBbXCJhY3RpdmVLZXlcIiwgXCJnZXRDb250cm9sbGVkSWRcIiwgXCJnZXRDb250cm9sbGVySWRcIl0sXG4gIF9leGNsdWRlZDMgPSBbXCJhc1wiXTtcbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHIsIGUpIHsgaWYgKG51bGwgPT0gcikgcmV0dXJuIHt9OyB2YXIgdCA9IHt9OyBmb3IgKHZhciBuIGluIHIpIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHIsIG4pKSB7IGlmIChlLmluZGV4T2YobikgPj0gMCkgY29udGludWU7IHRbbl0gPSByW25dOyB9IHJldHVybiB0OyB9XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRhYkNvbnRleHQgZnJvbSAnLi9UYWJDb250ZXh0JztcbmltcG9ydCBTZWxlY3RhYmxlQ29udGV4dCwgeyBtYWtlRXZlbnRLZXkgfSBmcm9tICcuL1NlbGVjdGFibGVDb250ZXh0JztcbmltcG9ydCBOb29wVHJhbnNpdGlvbiBmcm9tICcuL05vb3BUcmFuc2l0aW9uJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5leHBvcnQgZnVuY3Rpb24gdXNlVGFiUGFuZWwoX3JlZikge1xuICBsZXQge1xuICAgICAgYWN0aXZlLFxuICAgICAgZXZlbnRLZXksXG4gICAgICBtb3VudE9uRW50ZXIsXG4gICAgICB0cmFuc2l0aW9uLFxuICAgICAgdW5tb3VudE9uRXhpdCxcbiAgICAgIHJvbGUgPSAndGFicGFuZWwnLFxuICAgICAgb25FbnRlcixcbiAgICAgIG9uRW50ZXJpbmcsXG4gICAgICBvbkVudGVyZWQsXG4gICAgICBvbkV4aXQsXG4gICAgICBvbkV4aXRpbmcsXG4gICAgICBvbkV4aXRlZFxuICAgIH0gPSBfcmVmLFxuICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgX2V4Y2x1ZGVkKTtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoVGFiQ29udGV4dCk7XG4gIGlmICghY29udGV4dCkgcmV0dXJuIFtPYmplY3QuYXNzaWduKHt9LCBwcm9wcywge1xuICAgIHJvbGVcbiAgfSksIHtcbiAgICBldmVudEtleSxcbiAgICBpc0FjdGl2ZTogYWN0aXZlLFxuICAgIG1vdW50T25FbnRlcixcbiAgICB0cmFuc2l0aW9uLFxuICAgIHVubW91bnRPbkV4aXQsXG4gICAgb25FbnRlcixcbiAgICBvbkVudGVyaW5nLFxuICAgIG9uRW50ZXJlZCxcbiAgICBvbkV4aXQsXG4gICAgb25FeGl0aW5nLFxuICAgIG9uRXhpdGVkXG4gIH1dO1xuICBjb25zdCB7XG4gICAgICBhY3RpdmVLZXksXG4gICAgICBnZXRDb250cm9sbGVkSWQsXG4gICAgICBnZXRDb250cm9sbGVySWRcbiAgICB9ID0gY29udGV4dCxcbiAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoY29udGV4dCwgX2V4Y2x1ZGVkMik7XG4gIGNvbnN0IGtleSA9IG1ha2VFdmVudEtleShldmVudEtleSk7XG4gIHJldHVybiBbT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICByb2xlLFxuICAgIGlkOiBnZXRDb250cm9sbGVkSWQoZXZlbnRLZXkpLFxuICAgICdhcmlhLWxhYmVsbGVkYnknOiBnZXRDb250cm9sbGVySWQoZXZlbnRLZXkpXG4gIH0pLCB7XG4gICAgZXZlbnRLZXksXG4gICAgaXNBY3RpdmU6IGFjdGl2ZSA9PSBudWxsICYmIGtleSAhPSBudWxsID8gbWFrZUV2ZW50S2V5KGFjdGl2ZUtleSkgPT09IGtleSA6IGFjdGl2ZSxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uIHx8IHJlc3QudHJhbnNpdGlvbixcbiAgICBtb3VudE9uRW50ZXI6IG1vdW50T25FbnRlciAhPSBudWxsID8gbW91bnRPbkVudGVyIDogcmVzdC5tb3VudE9uRW50ZXIsXG4gICAgdW5tb3VudE9uRXhpdDogdW5tb3VudE9uRXhpdCAhPSBudWxsID8gdW5tb3VudE9uRXhpdCA6IHJlc3QudW5tb3VudE9uRXhpdCxcbiAgICBvbkVudGVyLFxuICAgIG9uRW50ZXJpbmcsXG4gICAgb25FbnRlcmVkLFxuICAgIG9uRXhpdCxcbiAgICBvbkV4aXRpbmcsXG4gICAgb25FeGl0ZWRcbiAgfV07XG59XG5jb25zdCBUYWJQYW5lbCA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKFxuLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuKF9yZWYyLCByZWYpID0+IHtcbiAgbGV0IHtcbiAgICAgIGFzOiBDb21wb25lbnQgPSAnZGl2J1xuICAgIH0gPSBfcmVmMixcbiAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYyLCBfZXhjbHVkZWQzKTtcbiAgY29uc3QgW3RhYlBhbmVsUHJvcHMsIHtcbiAgICBpc0FjdGl2ZSxcbiAgICBvbkVudGVyLFxuICAgIG9uRW50ZXJpbmcsXG4gICAgb25FbnRlcmVkLFxuICAgIG9uRXhpdCxcbiAgICBvbkV4aXRpbmcsXG4gICAgb25FeGl0ZWQsXG4gICAgbW91bnRPbkVudGVyLFxuICAgIHVubW91bnRPbkV4aXQsXG4gICAgdHJhbnNpdGlvbjogVHJhbnNpdGlvbiA9IE5vb3BUcmFuc2l0aW9uXG4gIH1dID0gdXNlVGFiUGFuZWwocHJvcHMpO1xuICAvLyBXZSBwcm92aWRlIGFuIGVtcHR5IHRoZSBUYWJDb250ZXh0IHNvIGA8TmF2PmBzIGluIGA8VGFiUGFuZWw+YHMgZG9uJ3RcbiAgLy8gY29uZmxpY3Qgd2l0aCB0aGUgdG9wIGxldmVsIG9uZS5cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KFRhYkNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZTogbnVsbCxcbiAgICBjaGlsZHJlbjogLyojX19QVVJFX18qL19qc3goU2VsZWN0YWJsZUNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi9fanN4KFRyYW5zaXRpb24sIHtcbiAgICAgICAgaW46IGlzQWN0aXZlLFxuICAgICAgICBvbkVudGVyOiBvbkVudGVyLFxuICAgICAgICBvbkVudGVyaW5nOiBvbkVudGVyaW5nLFxuICAgICAgICBvbkVudGVyZWQ6IG9uRW50ZXJlZCxcbiAgICAgICAgb25FeGl0OiBvbkV4aXQsXG4gICAgICAgIG9uRXhpdGluZzogb25FeGl0aW5nLFxuICAgICAgICBvbkV4aXRlZDogb25FeGl0ZWQsXG4gICAgICAgIG1vdW50T25FbnRlcjogbW91bnRPbkVudGVyLFxuICAgICAgICB1bm1vdW50T25FeGl0OiB1bm1vdW50T25FeGl0LFxuICAgICAgICBjaGlsZHJlbjogLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCBPYmplY3QuYXNzaWduKHt9LCB0YWJQYW5lbFByb3BzLCB7XG4gICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgICAgaGlkZGVuOiAhaXNBY3RpdmUsXG4gICAgICAgICAgXCJhcmlhLWhpZGRlblwiOiAhaXNBY3RpdmVcbiAgICAgICAgfSkpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pO1xufSk7XG5UYWJQYW5lbC5kaXNwbGF5TmFtZSA9ICdUYWJQYW5lbCc7XG5leHBvcnQgZGVmYXVsdCBUYWJQYW5lbDsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlVW5jb250cm9sbGVkUHJvcCB9IGZyb20gJ3VuY29udHJvbGxhYmxlJztcbmltcG9ydCB7IHVzZVNTUlNhZmVJZCB9IGZyb20gJy4vc3NyJztcbmltcG9ydCBUYWJDb250ZXh0IGZyb20gJy4vVGFiQ29udGV4dCc7XG5pbXBvcnQgU2VsZWN0YWJsZUNvbnRleHQgZnJvbSAnLi9TZWxlY3RhYmxlQ29udGV4dCc7XG5pbXBvcnQgVGFiUGFuZWwgZnJvbSAnLi9UYWJQYW5lbCc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgVGFicyA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIGlkOiB1c2VySWQsXG4gICAgZ2VuZXJhdGVDaGlsZElkOiBnZW5lcmF0ZUN1c3RvbUNoaWxkSWQsXG4gICAgb25TZWxlY3Q6IHByb3BzT25TZWxlY3QsXG4gICAgYWN0aXZlS2V5OiBwcm9wc0FjdGl2ZUtleSxcbiAgICBkZWZhdWx0QWN0aXZlS2V5LFxuICAgIHRyYW5zaXRpb24sXG4gICAgbW91bnRPbkVudGVyLFxuICAgIHVubW91bnRPbkV4aXQsXG4gICAgY2hpbGRyZW5cbiAgfSA9IHByb3BzO1xuICBjb25zdCBbYWN0aXZlS2V5LCBvblNlbGVjdF0gPSB1c2VVbmNvbnRyb2xsZWRQcm9wKHByb3BzQWN0aXZlS2V5LCBkZWZhdWx0QWN0aXZlS2V5LCBwcm9wc09uU2VsZWN0KTtcbiAgY29uc3QgaWQgPSB1c2VTU1JTYWZlSWQodXNlcklkKTtcbiAgY29uc3QgZ2VuZXJhdGVDaGlsZElkID0gdXNlTWVtbygoKSA9PiBnZW5lcmF0ZUN1c3RvbUNoaWxkSWQgfHwgKChrZXksIHR5cGUpID0+IGlkID8gYCR7aWR9LSR7dHlwZX0tJHtrZXl9YCA6IG51bGwpLCBbaWQsIGdlbmVyYXRlQ3VzdG9tQ2hpbGRJZF0pO1xuICBjb25zdCB0YWJDb250ZXh0ID0gdXNlTWVtbygoKSA9PiAoe1xuICAgIG9uU2VsZWN0LFxuICAgIGFjdGl2ZUtleSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIG1vdW50T25FbnRlcjogbW91bnRPbkVudGVyIHx8IGZhbHNlLFxuICAgIHVubW91bnRPbkV4aXQ6IHVubW91bnRPbkV4aXQgfHwgZmFsc2UsXG4gICAgZ2V0Q29udHJvbGxlZElkOiBrZXkgPT4gZ2VuZXJhdGVDaGlsZElkKGtleSwgJ3RhYnBhbmUnKSxcbiAgICBnZXRDb250cm9sbGVySWQ6IGtleSA9PiBnZW5lcmF0ZUNoaWxkSWQoa2V5LCAndGFiJylcbiAgfSksIFtvblNlbGVjdCwgYWN0aXZlS2V5LCB0cmFuc2l0aW9uLCBtb3VudE9uRW50ZXIsIHVubW91bnRPbkV4aXQsIGdlbmVyYXRlQ2hpbGRJZF0pO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goVGFiQ29udGV4dC5Qcm92aWRlciwge1xuICAgIHZhbHVlOiB0YWJDb250ZXh0LFxuICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChTZWxlY3RhYmxlQ29udGV4dC5Qcm92aWRlciwge1xuICAgICAgdmFsdWU6IG9uU2VsZWN0IHx8IG51bGwsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICB9KVxuICB9KTtcbn07XG5UYWJzLlBhbmVsID0gVGFiUGFuZWw7XG5leHBvcnQgZGVmYXVsdCBUYWJzOyIsImV4cG9ydCBmdW5jdGlvbiB0b01vZGlmaWVyTWFwKG1vZGlmaWVycykge1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG1vZGlmaWVycykpIHtcbiAgICByZXR1cm4gbW9kaWZpZXJzIHx8IHJlc3VsdDtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgbW9kaWZpZXJzID09IG51bGwgPyB2b2lkIDAgOiBtb2RpZmllcnMuZm9yRWFjaChtID0+IHtcbiAgICByZXN1bHRbbS5uYW1lXSA9IG07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRvTW9kaWZpZXJBcnJheShtYXAgPSB7fSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXApKSByZXR1cm4gbWFwO1xuICByZXR1cm4gT2JqZWN0LmtleXMobWFwKS5tYXAoayA9PiB7XG4gICAgbWFwW2tdLm5hbWUgPSBrO1xuICAgIHJldHVybiBtYXBba107XG4gIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VPcHRpb25zV2l0aFBvcHBlckNvbmZpZyh7XG4gIGVuYWJsZWQsXG4gIGVuYWJsZUV2ZW50cyxcbiAgcGxhY2VtZW50LFxuICBmbGlwLFxuICBvZmZzZXQsXG4gIGZpeGVkLFxuICBjb250YWluZXJQYWRkaW5nLFxuICBhcnJvd0VsZW1lbnQsXG4gIHBvcHBlckNvbmZpZyA9IHt9XG59KSB7XG4gIHZhciBfbW9kaWZpZXJzJGV2ZW50TGlzdGUsIF9tb2RpZmllcnMkcHJldmVudE92ZSwgX21vZGlmaWVycyRwcmV2ZW50T3ZlMiwgX21vZGlmaWVycyRvZmZzZXQsIF9tb2RpZmllcnMkYXJyb3c7XG4gIGNvbnN0IG1vZGlmaWVycyA9IHRvTW9kaWZpZXJNYXAocG9wcGVyQ29uZmlnLm1vZGlmaWVycyk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwb3BwZXJDb25maWcsIHtcbiAgICBwbGFjZW1lbnQsXG4gICAgZW5hYmxlZCxcbiAgICBzdHJhdGVneTogZml4ZWQgPyAnZml4ZWQnIDogcG9wcGVyQ29uZmlnLnN0cmF0ZWd5LFxuICAgIG1vZGlmaWVyczogdG9Nb2RpZmllckFycmF5KE9iamVjdC5hc3NpZ24oe30sIG1vZGlmaWVycywge1xuICAgICAgZXZlbnRMaXN0ZW5lcnM6IHtcbiAgICAgICAgZW5hYmxlZDogZW5hYmxlRXZlbnRzLFxuICAgICAgICBvcHRpb25zOiAoX21vZGlmaWVycyRldmVudExpc3RlID0gbW9kaWZpZXJzLmV2ZW50TGlzdGVuZXJzKSA9PSBudWxsID8gdm9pZCAwIDogX21vZGlmaWVycyRldmVudExpc3RlLm9wdGlvbnNcbiAgICAgIH0sXG4gICAgICBwcmV2ZW50T3ZlcmZsb3c6IE9iamVjdC5hc3NpZ24oe30sIG1vZGlmaWVycy5wcmV2ZW50T3ZlcmZsb3csIHtcbiAgICAgICAgb3B0aW9uczogY29udGFpbmVyUGFkZGluZyA/IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgIHBhZGRpbmc6IGNvbnRhaW5lclBhZGRpbmdcbiAgICAgICAgfSwgKF9tb2RpZmllcnMkcHJldmVudE92ZSA9IG1vZGlmaWVycy5wcmV2ZW50T3ZlcmZsb3cpID09IG51bGwgPyB2b2lkIDAgOiBfbW9kaWZpZXJzJHByZXZlbnRPdmUub3B0aW9ucykgOiAoX21vZGlmaWVycyRwcmV2ZW50T3ZlMiA9IG1vZGlmaWVycy5wcmV2ZW50T3ZlcmZsb3cpID09IG51bGwgPyB2b2lkIDAgOiBfbW9kaWZpZXJzJHByZXZlbnRPdmUyLm9wdGlvbnNcbiAgICAgIH0pLFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgIG9mZnNldFxuICAgICAgICB9LCAoX21vZGlmaWVycyRvZmZzZXQgPSBtb2RpZmllcnMub2Zmc2V0KSA9PSBudWxsID8gdm9pZCAwIDogX21vZGlmaWVycyRvZmZzZXQub3B0aW9ucylcbiAgICAgIH0sXG4gICAgICBhcnJvdzogT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXJzLmFycm93LCB7XG4gICAgICAgIGVuYWJsZWQ6ICEhYXJyb3dFbGVtZW50LFxuICAgICAgICBvcHRpb25zOiBPYmplY3QuYXNzaWduKHt9LCAoX21vZGlmaWVycyRhcnJvdyA9IG1vZGlmaWVycy5hcnJvdykgPT0gbnVsbCA/IHZvaWQgMCA6IF9tb2RpZmllcnMkYXJyb3cub3B0aW9ucywge1xuICAgICAgICAgIGVsZW1lbnQ6IGFycm93RWxlbWVudFxuICAgICAgICB9KVxuICAgICAgfSksXG4gICAgICBmbGlwOiBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgZW5hYmxlZDogISFmbGlwXG4gICAgICB9LCBtb2RpZmllcnMuZmxpcClcbiAgICB9KSlcbiAgfSk7XG59IiwiaW1wb3J0IGFycm93IGZyb20gJ0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvYXJyb3cnO1xuaW1wb3J0IGNvbXB1dGVTdHlsZXMgZnJvbSAnQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9jb21wdXRlU3R5bGVzJztcbmltcG9ydCBldmVudExpc3RlbmVycyBmcm9tICdAcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzJztcbmltcG9ydCBmbGlwIGZyb20gJ0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvZmxpcCc7XG5pbXBvcnQgaGlkZSBmcm9tICdAcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2hpZGUnO1xuaW1wb3J0IG9mZnNldCBmcm9tICdAcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL29mZnNldCc7XG5pbXBvcnQgcG9wcGVyT2Zmc2V0cyBmcm9tICdAcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3BvcHBlck9mZnNldHMnO1xuaW1wb3J0IHByZXZlbnRPdmVyZmxvdyBmcm9tICdAcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3ByZXZlbnRPdmVyZmxvdyc7XG5pbXBvcnQgeyBwbGFjZW1lbnRzIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUvbGliL2VudW1zJztcbmltcG9ydCB7IHBvcHBlckdlbmVyYXRvciB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlL2xpYi9wb3BwZXItYmFzZSc7XG5cbi8vIEZvciB0aGUgY29tbW9uIEpTIGJ1aWxkIHdlIHdpbGwgdHVybiB0aGlzIGZpbGUgaW50byBhIGJ1bmRsZSB3aXRoIG5vIGltcG9ydHMuXG4vLyBUaGlzIGlzIGIvYyB0aGUgUG9wcGVyIGxpYiBpcyBhbGwgZXNtIGZpbGVzLCBhbmQgd291bGQgYnJlYWsgaW4gYSBjb21tb24ganMgb25seSBlbnZpcm9ubWVudFxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBvcHBlciA9IHBvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IFtoaWRlLCBwb3BwZXJPZmZzZXRzLCBjb21wdXRlU3R5bGVzLCBldmVudExpc3RlbmVycywgb2Zmc2V0LCBmbGlwLCBwcmV2ZW50T3ZlcmZsb3csIGFycm93XVxufSk7XG5leHBvcnQgeyBwbGFjZW1lbnRzIH07IiwiaW1wb3J0IGNvbnRhaW5zIGZyb20gJ2RvbS1oZWxwZXJzL2NvbnRhaW5zJztcbmltcG9ydCBsaXN0ZW4gZnJvbSAnZG9tLWhlbHBlcnMvbGlzdGVuJztcbmltcG9ydCBvd25lckRvY3VtZW50IGZyb20gJ2RvbS1oZWxwZXJzL293bmVyRG9jdW1lbnQnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcbmZ1bmN0aW9uIGlzTGVmdENsaWNrRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LmJ1dHRvbiA9PT0gMDtcbn1cbmZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudCkge1xuICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSk7XG59XG5leHBvcnQgY29uc3QgZ2V0UmVmVGFyZ2V0ID0gcmVmID0+IHJlZiAmJiAoJ2N1cnJlbnQnIGluIHJlZiA/IHJlZi5jdXJyZW50IDogcmVmKTtcbmNvbnN0IEluaXRpYWxUcmlnZ2VyRXZlbnRzID0ge1xuICBjbGljazogJ21vdXNlZG93bicsXG4gIG1vdXNldXA6ICdtb3VzZWRvd24nLFxuICBwb2ludGVydXA6ICdwb2ludGVyZG93bidcbn07XG5cbi8qKlxuICogVGhlIGB1c2VDbGlja091dHNpZGVgIGhvb2sgcmVnaXN0ZXJzIHlvdXIgY2FsbGJhY2sgb24gdGhlIGRvY3VtZW50IHRoYXQgZmlyZXNcbiAqIHdoZW4gYSBwb2ludGVyIGV2ZW50IGlzIHJlZ2lzdGVyZWQgb3V0c2lkZSBvZiB0aGUgcHJvdmlkZWQgcmVmIG9yIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtSZWY8SFRNTEVsZW1lbnQ+fCBIVE1MRWxlbWVudH0gcmVmICBUaGUgZWxlbWVudCBib3VuZGFyeVxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25DbGlja091dHNpZGVcbiAqIEBwYXJhbSB7b2JqZWN0PX0gIG9wdGlvbnNcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdGlvbnMuZGlzYWJsZWRcbiAqIEBwYXJhbSB7c3RyaW5nPX0gIG9wdGlvbnMuY2xpY2tUcmlnZ2VyIFRoZSBET00gZXZlbnQgbmFtZSAoY2xpY2ssIG1vdXNlZG93biwgZXRjKSB0byBhdHRhY2ggbGlzdGVuZXJzIG9uXG4gKi9cbmZ1bmN0aW9uIHVzZUNsaWNrT3V0c2lkZShyZWYsIG9uQ2xpY2tPdXRzaWRlID0gbm9vcCwge1xuICBkaXNhYmxlZCxcbiAgY2xpY2tUcmlnZ2VyID0gJ2NsaWNrJ1xufSA9IHt9KSB7XG4gIGNvbnN0IHByZXZlbnRNb3VzZUNsaWNrT3V0c2lkZVJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHdhaXRpbmdGb3JUcmlnZ2VyID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlTW91c2VDYXB0dXJlID0gdXNlQ2FsbGJhY2soZSA9PiB7XG4gICAgY29uc3QgY3VycmVudFRhcmdldCA9IGdldFJlZlRhcmdldChyZWYpO1xuICAgIHdhcm5pbmcoISFjdXJyZW50VGFyZ2V0LCAnQ2xpY2tPdXRzaWRlIGNhcHR1cmVkIGEgY2xvc2UgZXZlbnQgYnV0IGRvZXMgbm90IGhhdmUgYSByZWYgdG8gY29tcGFyZSBpdCB0by4gJyArICd1c2VDbGlja091dHNpZGUoKSwgc2hvdWxkIGJlIHBhc3NlZCBhIHJlZiB0aGF0IHJlc29sdmVzIHRvIGEgRE9NIG5vZGUnKTtcbiAgICBwcmV2ZW50TW91c2VDbGlja091dHNpZGVSZWYuY3VycmVudCA9ICFjdXJyZW50VGFyZ2V0IHx8IGlzTW9kaWZpZWRFdmVudChlKSB8fCAhaXNMZWZ0Q2xpY2tFdmVudChlKSB8fCAhIWNvbnRhaW5zKGN1cnJlbnRUYXJnZXQsIGUudGFyZ2V0KSB8fCB3YWl0aW5nRm9yVHJpZ2dlci5jdXJyZW50O1xuICAgIHdhaXRpbmdGb3JUcmlnZ2VyLmN1cnJlbnQgPSBmYWxzZTtcbiAgfSwgW3JlZl0pO1xuICBjb25zdCBoYW5kbGVJbml0aWFsTW91c2UgPSB1c2VFdmVudENhbGxiYWNrKGUgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSBnZXRSZWZUYXJnZXQocmVmKTtcbiAgICBpZiAoY3VycmVudFRhcmdldCAmJiBjb250YWlucyhjdXJyZW50VGFyZ2V0LCBlLnRhcmdldCkpIHtcbiAgICAgIHdhaXRpbmdGb3JUcmlnZ2VyLmN1cnJlbnQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXaGVuIGNsaWNraW5nIG9uIHNjcm9sbGJhcnMgd2l0aGluIGN1cnJlbnQgdGFyZ2V0LCBjbGljayBldmVudHMgYXJlIG5vdCB0cmlnZ2VyZWQsIHNvIHRoaXMgcmVmXG4gICAgICAvLyBpcyBuZXZlciByZXNldCBpbnNpZGUgYGhhbmRsZU1vdXNlQ2FwdHVyZWAuIFRoaXMgd291bGQgY2F1c2UgYSBidWcgd2hlcmUgaXQgcmVxdWlyZXMgMiBjbGlja3NcbiAgICAgIC8vIHRvIGNsb3NlIHRoZSBvdmVybGF5LlxuICAgICAgd2FpdGluZ0ZvclRyaWdnZXIuY3VycmVudCA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGhhbmRsZU1vdXNlID0gdXNlRXZlbnRDYWxsYmFjayhlID0+IHtcbiAgICBpZiAoIXByZXZlbnRNb3VzZUNsaWNrT3V0c2lkZVJlZi5jdXJyZW50KSB7XG4gICAgICBvbkNsaWNrT3V0c2lkZShlKTtcbiAgICB9XG4gIH0pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHZhciBfb3duZXJXaW5kb3ckZXZlbnQsIF9vd25lcldpbmRvdyRwYXJlbnQ7XG4gICAgaWYgKGRpc2FibGVkIHx8IHJlZiA9PSBudWxsKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGRvYyA9IG93bmVyRG9jdW1lbnQoZ2V0UmVmVGFyZ2V0KHJlZikpO1xuICAgIGNvbnN0IG93bmVyV2luZG93ID0gZG9jLmRlZmF1bHRWaWV3IHx8IHdpbmRvdztcblxuICAgIC8vIFN0b3JlIHRoZSBjdXJyZW50IGV2ZW50IHRvIGF2b2lkIHRyaWdnZXJpbmcgaGFuZGxlcnMgaW1tZWRpYXRlbHlcbiAgICAvLyBGb3IgdGhpbmdzIHJlbmRlcmVkIGluIGFuIGlmcmFtZSwgdGhlIGV2ZW50IG1pZ2h0IG9yaWdpbmF0ZSBvbiB0aGUgcGFyZW50IHdpbmRvd1xuICAgIC8vIHNvIHdlIHNob3VsZCBmYWxsIGJhY2sgdG8gdGhhdCBnbG9iYWwgZXZlbnQgaWYgdGhlIGxvY2FsIG9uZSBkb2Vzbid0IGV4aXN0XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8yMDA3NFxuICAgIGxldCBjdXJyZW50RXZlbnQgPSAoX293bmVyV2luZG93JGV2ZW50ID0gb3duZXJXaW5kb3cuZXZlbnQpICE9IG51bGwgPyBfb3duZXJXaW5kb3ckZXZlbnQgOiAoX293bmVyV2luZG93JHBhcmVudCA9IG93bmVyV2luZG93LnBhcmVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9vd25lcldpbmRvdyRwYXJlbnQuZXZlbnQ7XG4gICAgbGV0IHJlbW92ZUluaXRpYWxUcmlnZ2VyTGlzdGVuZXIgPSBudWxsO1xuICAgIGlmIChJbml0aWFsVHJpZ2dlckV2ZW50c1tjbGlja1RyaWdnZXJdKSB7XG4gICAgICByZW1vdmVJbml0aWFsVHJpZ2dlckxpc3RlbmVyID0gbGlzdGVuKGRvYywgSW5pdGlhbFRyaWdnZXJFdmVudHNbY2xpY2tUcmlnZ2VyXSwgaGFuZGxlSW5pdGlhbE1vdXNlLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBVc2UgY2FwdHVyZSBmb3IgdGhpcyBsaXN0ZW5lciBzbyBpdCBmaXJlcyBiZWZvcmUgUmVhY3QncyBsaXN0ZW5lciwgdG9cbiAgICAvLyBhdm9pZCBmYWxzZSBwb3NpdGl2ZXMgaW4gdGhlIGNvbnRhaW5zKCkgY2hlY2sgYmVsb3cgaWYgdGhlIHRhcmdldCBET01cbiAgICAvLyBlbGVtZW50IGlzIHJlbW92ZWQgaW4gdGhlIFJlYWN0IG1vdXNlIGNhbGxiYWNrLlxuICAgIGNvbnN0IHJlbW92ZU1vdXNlQ2FwdHVyZUxpc3RlbmVyID0gbGlzdGVuKGRvYywgY2xpY2tUcmlnZ2VyLCBoYW5kbGVNb3VzZUNhcHR1cmUsIHRydWUpO1xuICAgIGNvbnN0IHJlbW92ZU1vdXNlTGlzdGVuZXIgPSBsaXN0ZW4oZG9jLCBjbGlja1RyaWdnZXIsIGUgPT4ge1xuICAgICAgLy8gc2tpcCBpZiB0aGlzIGV2ZW50IGlzIHRoZSBzYW1lIGFzIHRoZSBvbmUgcnVubmluZyB3aGVuIHdlIGFkZGVkIHRoZSBoYW5kbGVyc1xuICAgICAgaWYgKGUgPT09IGN1cnJlbnRFdmVudCkge1xuICAgICAgICBjdXJyZW50RXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhhbmRsZU1vdXNlKGUpO1xuICAgIH0pO1xuICAgIGxldCBtb2JpbGVTYWZhcmlIYWNrTGlzdGVuZXJzID0gW107XG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvYy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgIG1vYmlsZVNhZmFyaUhhY2tMaXN0ZW5lcnMgPSBbXS5zbGljZS5jYWxsKGRvYy5ib2R5LmNoaWxkcmVuKS5tYXAoZWwgPT4gbGlzdGVuKGVsLCAnbW91c2Vtb3ZlJywgbm9vcCkpO1xuICAgIH1cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVtb3ZlSW5pdGlhbFRyaWdnZXJMaXN0ZW5lciA9PSBudWxsID8gdm9pZCAwIDogcmVtb3ZlSW5pdGlhbFRyaWdnZXJMaXN0ZW5lcigpO1xuICAgICAgcmVtb3ZlTW91c2VDYXB0dXJlTGlzdGVuZXIoKTtcbiAgICAgIHJlbW92ZU1vdXNlTGlzdGVuZXIoKTtcbiAgICAgIG1vYmlsZVNhZmFyaUhhY2tMaXN0ZW5lcnMuZm9yRWFjaChyZW1vdmUgPT4gcmVtb3ZlKCkpO1xuICAgIH07XG4gIH0sIFtyZWYsIGRpc2FibGVkLCBjbGlja1RyaWdnZXIsIGhhbmRsZU1vdXNlQ2FwdHVyZSwgaGFuZGxlSW5pdGlhbE1vdXNlLCBoYW5kbGVNb3VzZV0pO1xufVxuZXhwb3J0IGRlZmF1bHQgdXNlQ2xpY2tPdXRzaWRlOyIsImNvbnN0IF9leGNsdWRlZCA9IFtcImVuYWJsZWRcIiwgXCJwbGFjZW1lbnRcIiwgXCJzdHJhdGVneVwiLCBcIm1vZGlmaWVyc1wiXTtcbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHIsIGUpIHsgaWYgKG51bGwgPT0gcikgcmV0dXJuIHt9OyB2YXIgdCA9IHt9OyBmb3IgKHZhciBuIGluIHIpIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHIsIG4pKSB7IGlmIChlLmluZGV4T2YobikgPj0gMCkgY29udGludWU7IHRbbl0gPSByW25dOyB9IHJldHVybiB0OyB9XG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZGVxdWFsIH0gZnJvbSAnZGVxdWFsJztcbmltcG9ydCB1c2VTYWZlU3RhdGUgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlU2FmZVN0YXRlJztcbmltcG9ydCB7IGNyZWF0ZVBvcHBlciB9IGZyb20gJy4vcG9wcGVyJztcbmNvbnN0IGRpc2FibGVkQXBwbHlTdHlsZXNNb2RpZmllciA9IHtcbiAgbmFtZTogJ2FwcGx5U3R5bGVzJyxcbiAgZW5hYmxlZDogZmFsc2UsXG4gIHBoYXNlOiAnYWZ0ZXJXcml0ZScsXG4gIGZuOiAoKSA9PiB1bmRlZmluZWRcbn07XG5cbi8vIHVudGlsIGRvY2pzIHN1cHBvcnRzIHR5cGUgZXhwb3J0cy4uLlxuXG5jb25zdCBhcmlhRGVzY3JpYmVkQnlNb2RpZmllciA9IHtcbiAgbmFtZTogJ2FyaWFEZXNjcmliZWRCeScsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnYWZ0ZXJXcml0ZScsXG4gIGVmZmVjdDogKHtcbiAgICBzdGF0ZVxuICB9KSA9PiAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgcmVmZXJlbmNlLFxuICAgICAgcG9wcGVyXG4gICAgfSA9IHN0YXRlLmVsZW1lbnRzO1xuICAgIGlmICgncmVtb3ZlQXR0cmlidXRlJyBpbiByZWZlcmVuY2UpIHtcbiAgICAgIGNvbnN0IGlkcyA9IChyZWZlcmVuY2UuZ2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JykgfHwgJycpLnNwbGl0KCcsJykuZmlsdGVyKGlkID0+IGlkLnRyaW0oKSAhPT0gcG9wcGVyLmlkKTtcbiAgICAgIGlmICghaWRzLmxlbmd0aCkgcmVmZXJlbmNlLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScpO2Vsc2UgcmVmZXJlbmNlLnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIGlkcy5qb2luKCcsJykpO1xuICAgIH1cbiAgfSxcbiAgZm46ICh7XG4gICAgc3RhdGVcbiAgfSkgPT4ge1xuICAgIHZhciBfcG9wcGVyJGdldEF0dHJpYnV0ZTtcbiAgICBjb25zdCB7XG4gICAgICBwb3BwZXIsXG4gICAgICByZWZlcmVuY2VcbiAgICB9ID0gc3RhdGUuZWxlbWVudHM7XG4gICAgY29uc3Qgcm9sZSA9IChfcG9wcGVyJGdldEF0dHJpYnV0ZSA9IHBvcHBlci5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9wb3BwZXIkZ2V0QXR0cmlidXRlLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHBvcHBlci5pZCAmJiByb2xlID09PSAndG9vbHRpcCcgJiYgJ3NldEF0dHJpYnV0ZScgaW4gcmVmZXJlbmNlKSB7XG4gICAgICBjb25zdCBpZHMgPSByZWZlcmVuY2UuZ2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5Jyk7XG4gICAgICBpZiAoaWRzICYmIGlkcy5zcGxpdCgnLCcpLmluZGV4T2YocG9wcGVyLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVmZXJlbmNlLnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIGlkcyA/IGAke2lkc30sJHtwb3BwZXIuaWR9YCA6IHBvcHBlci5pZCk7XG4gICAgfVxuICB9XG59O1xuY29uc3QgRU1QVFlfTU9ESUZJRVJTID0gW107XG4vKipcbiAqIFBvc2l0aW9uIGFuIGVsZW1lbnQgcmVsYXRpdmUgc29tZSByZWZlcmVuY2UgZWxlbWVudCB1c2luZyBQb3BwZXIuanNcbiAqXG4gKiBAcGFyYW0gcmVmZXJlbmNlRWxlbWVudFxuICogQHBhcmFtIHBvcHBlckVsZW1lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgIG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0PX0gICAgIG9wdGlvbnMubW9kaWZpZXJzIFBvcHBlci5qcyBtb2RpZmllcnNcbiAqIEBwYXJhbSB7Ym9vbGVhbj19ICAgIG9wdGlvbnMuZW5hYmxlZCB0b2dnbGUgdGhlIHBvcHBlciBmdW5jdGlvbmFsaXR5IG9uL29mZlxuICogQHBhcmFtIHtzdHJpbmc9fSAgICAgb3B0aW9ucy5wbGFjZW1lbnQgVGhlIHBvcHBlciBlbGVtZW50IHBsYWNlbWVudCByZWxhdGl2ZSB0byB0aGUgcmVmZXJlbmNlIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nPX0gICAgIG9wdGlvbnMuc3RyYXRlZ3kgdGhlIHBvc2l0aW9uaW5nIHN0cmF0ZWd5XG4gKiBAcGFyYW0ge2Z1bmN0aW9uPX0gICBvcHRpb25zLm9uQ3JlYXRlIGNhbGxlZCB3aGVuIHRoZSBwb3BwZXIgaXMgY3JlYXRlZFxuICogQHBhcmFtIHtmdW5jdGlvbj19ICAgb3B0aW9ucy5vblVwZGF0ZSBjYWxsZWQgd2hlbiB0aGUgcG9wcGVyIGlzIHVwZGF0ZWRcbiAqXG4gKiBAcmV0dXJucyB7VXNlUG9wcGVyU3RhdGV9IFRoZSBwb3BwZXIgc3RhdGVcbiAqL1xuZnVuY3Rpb24gdXNlUG9wcGVyKHJlZmVyZW5jZUVsZW1lbnQsIHBvcHBlckVsZW1lbnQsIF9yZWYgPSB7fSkge1xuICBsZXQge1xuICAgICAgZW5hYmxlZCA9IHRydWUsXG4gICAgICBwbGFjZW1lbnQgPSAnYm90dG9tJyxcbiAgICAgIHN0cmF0ZWd5ID0gJ2Fic29sdXRlJyxcbiAgICAgIG1vZGlmaWVycyA9IEVNUFRZX01PRElGSUVSU1xuICAgIH0gPSBfcmVmLFxuICAgIGNvbmZpZyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIF9leGNsdWRlZCk7XG4gIGNvbnN0IHByZXZNb2RpZmllcnMgPSB1c2VSZWYobW9kaWZpZXJzKTtcbiAgY29uc3QgcG9wcGVySW5zdGFuY2VSZWYgPSB1c2VSZWYoKTtcbiAgY29uc3QgdXBkYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHZhciBfcG9wcGVySW5zdGFuY2VSZWYkY3U7XG4gICAgKF9wb3BwZXJJbnN0YW5jZVJlZiRjdSA9IHBvcHBlckluc3RhbmNlUmVmLmN1cnJlbnQpID09IG51bGwgPyB2b2lkIDAgOiBfcG9wcGVySW5zdGFuY2VSZWYkY3UudXBkYXRlKCk7XG4gIH0sIFtdKTtcbiAgY29uc3QgZm9yY2VVcGRhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgdmFyIF9wb3BwZXJJbnN0YW5jZVJlZiRjdTI7XG4gICAgKF9wb3BwZXJJbnN0YW5jZVJlZiRjdTIgPSBwb3BwZXJJbnN0YW5jZVJlZi5jdXJyZW50KSA9PSBudWxsID8gdm9pZCAwIDogX3BvcHBlckluc3RhbmNlUmVmJGN1Mi5mb3JjZVVwZGF0ZSgpO1xuICB9LCBbXSk7XG4gIGNvbnN0IFtwb3BwZXJTdGF0ZSwgc2V0U3RhdGVdID0gdXNlU2FmZVN0YXRlKHVzZVN0YXRlKHtcbiAgICBwbGFjZW1lbnQsXG4gICAgdXBkYXRlLFxuICAgIGZvcmNlVXBkYXRlLFxuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIHN0eWxlczoge1xuICAgICAgcG9wcGVyOiB7fSxcbiAgICAgIGFycm93OiB7fVxuICAgIH1cbiAgfSkpO1xuICBjb25zdCB1cGRhdGVNb2RpZmllciA9IHVzZU1lbW8oKCkgPT4gKHtcbiAgICBuYW1lOiAndXBkYXRlU3RhdGVNb2RpZmllcicsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBwaGFzZTogJ3dyaXRlJyxcbiAgICByZXF1aXJlczogWydjb21wdXRlU3R5bGVzJ10sXG4gICAgZm46ICh7XG4gICAgICBzdGF0ZVxuICAgIH0pID0+IHtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHt9O1xuICAgICAgY29uc3QgYXR0cmlidXRlcyA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoc3RhdGUuZWxlbWVudHMpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIHN0eWxlc1tlbGVtZW50XSA9IHN0YXRlLnN0eWxlc1tlbGVtZW50XTtcbiAgICAgICAgYXR0cmlidXRlc1tlbGVtZW50XSA9IHN0YXRlLmF0dHJpYnV0ZXNbZWxlbWVudF07XG4gICAgICB9KTtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgc3RhdGUsXG4gICAgICAgIHN0eWxlcyxcbiAgICAgICAgYXR0cmlidXRlcyxcbiAgICAgICAgdXBkYXRlLFxuICAgICAgICBmb3JjZVVwZGF0ZSxcbiAgICAgICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgICAgIH0pO1xuICAgIH1cbiAgfSksIFt1cGRhdGUsIGZvcmNlVXBkYXRlLCBzZXRTdGF0ZV0pO1xuICBjb25zdCBuZXh0TW9kaWZpZXJzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFkZXF1YWwocHJldk1vZGlmaWVycy5jdXJyZW50LCBtb2RpZmllcnMpKSB7XG4gICAgICBwcmV2TW9kaWZpZXJzLmN1cnJlbnQgPSBtb2RpZmllcnM7XG4gICAgfVxuICAgIHJldHVybiBwcmV2TW9kaWZpZXJzLmN1cnJlbnQ7XG4gIH0sIFttb2RpZmllcnNdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXBvcHBlckluc3RhbmNlUmVmLmN1cnJlbnQgfHwgIWVuYWJsZWQpIHJldHVybjtcbiAgICBwb3BwZXJJbnN0YW5jZVJlZi5jdXJyZW50LnNldE9wdGlvbnMoe1xuICAgICAgcGxhY2VtZW50LFxuICAgICAgc3RyYXRlZ3ksXG4gICAgICBtb2RpZmllcnM6IFsuLi5uZXh0TW9kaWZpZXJzLCB1cGRhdGVNb2RpZmllciwgZGlzYWJsZWRBcHBseVN0eWxlc01vZGlmaWVyXVxuICAgIH0pO1xuICB9LCBbc3RyYXRlZ3ksIHBsYWNlbWVudCwgdXBkYXRlTW9kaWZpZXIsIGVuYWJsZWQsIG5leHRNb2RpZmllcnNdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVuYWJsZWQgfHwgcmVmZXJlbmNlRWxlbWVudCA9PSBudWxsIHx8IHBvcHBlckVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcG9wcGVySW5zdGFuY2VSZWYuY3VycmVudCA9IGNyZWF0ZVBvcHBlcihyZWZlcmVuY2VFbGVtZW50LCBwb3BwZXJFbGVtZW50LCBPYmplY3QuYXNzaWduKHt9LCBjb25maWcsIHtcbiAgICAgIHBsYWNlbWVudCxcbiAgICAgIHN0cmF0ZWd5LFxuICAgICAgbW9kaWZpZXJzOiBbLi4ubmV4dE1vZGlmaWVycywgYXJpYURlc2NyaWJlZEJ5TW9kaWZpZXIsIHVwZGF0ZU1vZGlmaWVyXVxuICAgIH0pKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHBvcHBlckluc3RhbmNlUmVmLmN1cnJlbnQgIT0gbnVsbCkge1xuICAgICAgICBwb3BwZXJJbnN0YW5jZVJlZi5jdXJyZW50LmRlc3Ryb3koKTtcbiAgICAgICAgcG9wcGVySW5zdGFuY2VSZWYuY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgc2V0U3RhdGUocyA9PiBPYmplY3QuYXNzaWduKHt9LCBzLCB7XG4gICAgICAgICAgYXR0cmlidXRlczoge30sXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICBwb3BwZXI6IHt9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBUaGlzIGlzIG9ubHkgcnVuIG9uY2UgdG8gX2NyZWF0ZV8gdGhlIHBvcHBlclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW2VuYWJsZWQsIHJlZmVyZW5jZUVsZW1lbnQsIHBvcHBlckVsZW1lbnRdKTtcbiAgcmV0dXJuIHBvcHBlclN0YXRlO1xufVxuZXhwb3J0IGRlZmF1bHQgdXNlUG9wcGVyOyIsImltcG9ydCBsaXN0ZW4gZnJvbSAnZG9tLWhlbHBlcnMvbGlzdGVuJztcbmltcG9ydCBvd25lckRvY3VtZW50IGZyb20gJ2RvbS1oZWxwZXJzL293bmVyRG9jdW1lbnQnO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgdXNlQ2xpY2tPdXRzaWRlLCB7IGdldFJlZlRhcmdldCB9IGZyb20gJy4vdXNlQ2xpY2tPdXRzaWRlJztcbmltcG9ydCB7IGlzRXNjS2V5IH0gZnJvbSAnLi91dGlscyc7XG5jb25zdCBub29wID0gKCkgPT4ge307XG4vKipcbiAqIFRoZSBgdXNlUm9vdENsb3NlYCBob29rIHJlZ2lzdGVycyB5b3VyIGNhbGxiYWNrIG9uIHRoZSBkb2N1bWVudFxuICogd2hlbiByZW5kZXJlZC4gUG93ZXJzIHRoZSBgPE92ZXJsYXkvPmAgY29tcG9uZW50LiBUaGlzIGlzIHVzZWQgYWNoaWV2ZSBtb2RhbFxuICogc3R5bGUgYmVoYXZpb3Igd2hlcmUgeW91ciBjYWxsYmFjayBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgdXNlciB0cmllcyB0b1xuICogaW50ZXJhY3Qgd2l0aCB0aGUgcmVzdCBvZiB0aGUgZG9jdW1lbnQgb3IgaGl0cyB0aGUgYGVzY2Aga2V5LlxuICpcbiAqIEBwYXJhbSB7UmVmPEhUTUxFbGVtZW50PnwgSFRNTEVsZW1lbnR9IHJlZiAgVGhlIGVsZW1lbnQgYm91bmRhcnlcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uUm9vdENsb3NlXG4gKiBAcGFyYW0ge29iamVjdD19ICBvcHRpb25zXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRpb25zLmRpc2FibGVkXG4gKiBAcGFyYW0ge3N0cmluZz19ICBvcHRpb25zLmNsaWNrVHJpZ2dlciBUaGUgRE9NIGV2ZW50IG5hbWUgKGNsaWNrLCBtb3VzZWRvd24sIGV0YykgdG8gYXR0YWNoIGxpc3RlbmVycyBvblxuICovXG5mdW5jdGlvbiB1c2VSb290Q2xvc2UocmVmLCBvblJvb3RDbG9zZSwge1xuICBkaXNhYmxlZCxcbiAgY2xpY2tUcmlnZ2VyXG59ID0ge30pIHtcbiAgY29uc3Qgb25DbG9zZSA9IG9uUm9vdENsb3NlIHx8IG5vb3A7XG4gIHVzZUNsaWNrT3V0c2lkZShyZWYsIG9uQ2xvc2UsIHtcbiAgICBkaXNhYmxlZCxcbiAgICBjbGlja1RyaWdnZXJcbiAgfSk7XG4gIGNvbnN0IGhhbmRsZUtleVVwID0gdXNlRXZlbnRDYWxsYmFjayhlID0+IHtcbiAgICBpZiAoaXNFc2NLZXkoZSkpIHtcbiAgICAgIG9uQ2xvc2UoZSk7XG4gICAgfVxuICB9KTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZGlzYWJsZWQgfHwgcmVmID09IG51bGwpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgZG9jID0gb3duZXJEb2N1bWVudChnZXRSZWZUYXJnZXQocmVmKSk7XG5cbiAgICAvLyBTdG9yZSB0aGUgY3VycmVudCBldmVudCB0byBhdm9pZCB0cmlnZ2VyaW5nIGhhbmRsZXJzIGltbWVkaWF0ZWx5XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8yMDA3NFxuICAgIGxldCBjdXJyZW50RXZlbnQgPSAoZG9jLmRlZmF1bHRWaWV3IHx8IHdpbmRvdykuZXZlbnQ7XG4gICAgY29uc3QgcmVtb3ZlS2V5dXBMaXN0ZW5lciA9IGxpc3Rlbihkb2MsICdrZXl1cCcsIGUgPT4ge1xuICAgICAgLy8gc2tpcCBpZiB0aGlzIGV2ZW50IGlzIHRoZSBzYW1lIGFzIHRoZSBvbmUgcnVubmluZyB3aGVuIHdlIGFkZGVkIHRoZSBoYW5kbGVyc1xuICAgICAgaWYgKGUgPT09IGN1cnJlbnRFdmVudCkge1xuICAgICAgICBjdXJyZW50RXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhhbmRsZUtleVVwKGUpO1xuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVLZXl1cExpc3RlbmVyKCk7XG4gICAgfTtcbiAgfSwgW3JlZiwgZGlzYWJsZWQsIGhhbmRsZUtleVVwXSk7XG59XG5leHBvcnQgZGVmYXVsdCB1c2VSb290Q2xvc2U7IiwiaW1wb3J0IHVzZUNhbGxiYWNrUmVmIGZyb20gJy4vdXNlQ2FsbGJhY2tSZWYnO1xuaW1wb3J0IHVzZUNvbW1pdHRlZFJlZiBmcm9tICcuL3VzZUNvbW1pdHRlZFJlZic7XG5pbXBvcnQgdXNlRXZlbnRDYWxsYmFjayBmcm9tICcuL3VzZUV2ZW50Q2FsbGJhY2snO1xuaW1wb3J0IHVzZUV2ZW50TGlzdGVuZXIgZnJvbSAnLi91c2VFdmVudExpc3RlbmVyJztcbmltcG9ydCB1c2VHbG9iYWxMaXN0ZW5lciBmcm9tICcuL3VzZUdsb2JhbExpc3RlbmVyJztcbmltcG9ydCB1c2VJbnRlcnZhbCBmcm9tICcuL3VzZUludGVydmFsJztcbmltcG9ydCB1c2VSYWZJbnRlcnZhbCBmcm9tICcuL3VzZVJhZkludGVydmFsJztcbmltcG9ydCB1c2VNZXJnZVN0YXRlIGZyb20gJy4vdXNlTWVyZ2VTdGF0ZSc7XG5pbXBvcnQgdXNlTWVyZ2VTdGF0ZUZyb21Qcm9wcyBmcm9tICcuL3VzZU1lcmdlU3RhdGVGcm9tUHJvcHMnO1xuaW1wb3J0IHVzZU1vdW50ZWQgZnJvbSAnLi91c2VNb3VudGVkJztcbmltcG9ydCB1c2VQcmV2aW91cyBmcm9tICcuL3VzZVByZXZpb3VzJztcbmltcG9ydCB1c2VJbWFnZSBmcm9tICcuL3VzZUltYWdlJztcbmltcG9ydCB1c2VSZXNpemVPYnNlcnZlciBmcm9tICcuL3VzZVJlc2l6ZU9ic2VydmVyJztcbmV4cG9ydCB7IHVzZUNhbGxiYWNrUmVmLCB1c2VDb21taXR0ZWRSZWYsIHVzZUV2ZW50Q2FsbGJhY2ssIHVzZUV2ZW50TGlzdGVuZXIsIHVzZUdsb2JhbExpc3RlbmVyLCB1c2VJbnRlcnZhbCwgdXNlUmFmSW50ZXJ2YWwsIHVzZU1lcmdlU3RhdGUsIHVzZU1lcmdlU3RhdGVGcm9tUHJvcHMsIHVzZU1vdW50ZWQsIHVzZVByZXZpb3VzLCB1c2VJbWFnZSwgdXNlUmVzaXplT2JzZXJ2ZXIgfTsiLCJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBBIGNvbnZlbmllbmNlIGhvb2sgYXJvdW5kIGB1c2VTdGF0ZWAgZGVzaWduZWQgdG8gYmUgcGFpcmVkIHdpdGhcbiAqIHRoZSBjb21wb25lbnQgW2NhbGxiYWNrIHJlZl0oaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlZnMtYW5kLXRoZS1kb20uaHRtbCNjYWxsYmFjay1yZWZzKSBhcGkuXG4gKiBDYWxsYmFjayByZWZzIGFyZSB1c2VmdWwgb3ZlciBgdXNlUmVmKClgIHdoZW4geW91IG5lZWQgdG8gcmVzcG9uZCB0byB0aGUgcmVmIGJlaW5nIHNldFxuICogaW5zdGVhZCBvZiBsYXppbHkgYWNjZXNzaW5nIGl0IGluIGFuIGVmZmVjdC5cbiAqXG4gKiBgYGB0c1xuICogY29uc3QgW2VsZW1lbnQsIGF0dGFjaFJlZl0gPSB1c2VDYWxsYmFja1JlZjxIVE1MRGl2RWxlbWVudD4oKVxuICpcbiAqIHVzZUVmZmVjdCgoKSA9PiB7XG4gKiAgIGlmICghZWxlbWVudCkgcmV0dXJuXG4gKlxuICogICBjb25zdCBjYWxlbmRhciA9IG5ldyBGdWxsQ2FsZW5kYXIuQ2FsZW5kYXIoZWxlbWVudClcbiAqXG4gKiAgIHJldHVybiAoKSA9PiB7XG4gKiAgICAgY2FsZW5kYXIuZGVzdHJveSgpXG4gKiAgIH1cbiAqIH0sIFtlbGVtZW50XSlcbiAqXG4gKiByZXR1cm4gPGRpdiByZWY9e2F0dGFjaFJlZn0gLz5cbiAqIGBgYFxuICpcbiAqIEBjYXRlZ29yeSByZWZzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZUNhbGxiYWNrUmVmKCkge1xuICByZXR1cm4gdXNlU3RhdGUobnVsbCk7XG59IiwiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnLi91c2VFdmVudENhbGxiYWNrJztcbi8qKlxuICogQXR0YWNoZXMgYW4gZXZlbnQgaGFuZGxlciBvdXRzaWRlIGRpcmVjdGx5IHRvIHNwZWNpZmllZCBET00gZWxlbWVudFxuICogYnlwYXNzaW5nIHRoZSByZWFjdCBzeW50aGV0aWMgZXZlbnQgc3lzdGVtLlxuICpcbiAqIEBwYXJhbSBlbGVtZW50IFRoZSB0YXJnZXQgdG8gbGlzdGVuIGZvciBldmVudHMgb25cbiAqIEBwYXJhbSBldmVudCBUaGUgRE9NIGV2ZW50IG5hbWVcbiAqIEBwYXJhbSBoYW5kbGVyIEFuIGV2ZW50IGhhbmRsZXJcbiAqIEBwYXJhbSBjYXB0dXJlIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiBkdXJpbmcgdGhlIGNhcHR1cmUgZXZlbnQgcGhhc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlRXZlbnRMaXN0ZW5lcihldmVudFRhcmdldCwgZXZlbnQsIGxpc3RlbmVyLCBjYXB0dXJlID0gZmFsc2UpIHtcbiAgY29uc3QgaGFuZGxlciA9IHVzZUV2ZW50Q2FsbGJhY2sobGlzdGVuZXIpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IHR5cGVvZiBldmVudFRhcmdldCA9PT0gJ2Z1bmN0aW9uJyA/IGV2ZW50VGFyZ2V0KCkgOiBldmVudFRhcmdldDtcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY2FwdHVyZSk7XG4gICAgcmV0dXJuICgpID0+IHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlKTtcbiAgfSwgW2V2ZW50VGFyZ2V0XSk7XG59IiwiaW1wb3J0IHsgdXNlUmVkdWNlciB9IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB0cmlnZ2VycyBhIGNvbXBvbmVudCB1cGRhdGUuIHRoZSBob29rIGVxdWl2YWxlbnQgdG9cbiAqIGB0aGlzLmZvcmNlVXBkYXRlKClgIGluIGEgY2xhc3MgY29tcG9uZW50LiBJbiBtb3N0IGNhc2VzIHVzaW5nIGEgc3RhdGUgdmFsdWUgZGlyZWN0bHlcbiAqIGlzIHByZWZlcmFibGUgYnV0IG1heSBiZSByZXF1aXJlZCBpbiBzb21lIGFkdmFuY2VkIHVzYWdlcyBvZiByZWZzIGZvciBpbnRlcm9wIG9yXG4gKiB3aGVuIGRpcmVjdCBET00gbWFuaXB1bGF0aW9uIGlzIHJlcXVpcmVkLlxuICpcbiAqIGBgYHRzXG4gKiBjb25zdCBmb3JjZVVwZGF0ZSA9IHVzZUZvcmNlVXBkYXRlKCk7XG4gKlxuICogY29uc3QgdXBkYXRlT25DbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAqICBmb3JjZVVwZGF0ZSgpXG4gKiB9LCBbZm9yY2VVcGRhdGVdKVxuICpcbiAqIHJldHVybiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt1cGRhdGVPbkNsaWNrfT5IaSB0aGVyZTwvYnV0dG9uPlxuICogYGBgXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZUZvcmNlVXBkYXRlKCkge1xuICAvLyBUaGUgdG9nZ2xpbmcgc3RhdGUgdmFsdWUgaXMgZGVzaWduZWQgdG8gZGVmZWF0IFJlYWN0IG9wdGltaXphdGlvbnMgZm9yIHNraXBwaW5nXG4gIC8vIHVwZGF0ZXMgd2hlbiB0aGV5IGFyZSBzdHJpY3RseSBlcXVhbCB0byB0aGUgbGFzdCBzdGF0ZSB2YWx1ZVxuICBjb25zdCBbLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKHJldmlzaW9uID0+IHJldmlzaW9uICsgMSwgMCk7XG4gIHJldHVybiBkaXNwYXRjaDtcbn0iLCJpbXBvcnQgdXNlRXZlbnRMaXN0ZW5lciBmcm9tICcuL3VzZUV2ZW50TGlzdGVuZXInO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG4vKipcbiAqIEF0dGFjaGVzIGFuIGV2ZW50IGhhbmRsZXIgb3V0c2lkZSBkaXJlY3RseSB0byB0aGUgYGRvY3VtZW50YCxcbiAqIGJ5cGFzc2luZyB0aGUgcmVhY3Qgc3ludGhldGljIGV2ZW50IHN5c3RlbS5cbiAqXG4gKiBgYGB0c1xuICogdXNlR2xvYmFsTGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAqICBjb25zb2xlLmxvZyhldmVudC5rZXkpXG4gKiB9KVxuICogYGBgXG4gKlxuICogQHBhcmFtIGV2ZW50IFRoZSBET00gZXZlbnQgbmFtZVxuICogQHBhcmFtIGhhbmRsZXIgQW4gZXZlbnQgaGFuZGxlclxuICogQHBhcmFtIGNhcHR1cmUgV2hldGhlciBvciBub3QgdG8gbGlzdGVuIGR1cmluZyB0aGUgY2FwdHVyZSBldmVudCBwaGFzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VHbG9iYWxMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY2FwdHVyZSA9IGZhbHNlKSB7XG4gIGNvbnN0IGRvY3VtZW50VGFyZ2V0ID0gdXNlQ2FsbGJhY2soKCkgPT4gZG9jdW1lbnQsIFtdKTtcbiAgcmV0dXJuIHVzZUV2ZW50TGlzdGVuZXIoZG9jdW1lbnRUYXJnZXQsIGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlKTtcbn0iLCJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBGZXRjaCBhbmQgbG9hZCBhbiBpbWFnZSBmb3IgcHJvZ3JhbWF0aWMgdXNlIHN1Y2ggYXMgaW4gYSBgPGNhbnZhcz5gIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIGltYWdlT3JVcmwgVGhlIGBIdG1sSW1hZ2VFbGVtZW50YCBvciBpbWFnZSB1cmwgdG8gbG9hZFxuICogQHBhcmFtIGNyb3NzT3JpZ2luIFRoZSBgY3Jvc3NvcmlnaW5gIGF0dHJpYnV0ZSB0byBzZXRcbiAqXG4gKiBgYGB0c1xuICogY29uc3QgeyBpbWFnZSwgZXJyb3IgfSA9IHVzZUltYWdlKCcvc3RhdGljL2tpdHRlbnMucG5nJylcbiAqIGNvbnN0IHJlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudD4oKVxuICpcbiAqIHVzZUVmZmVjdCgoKSA9PiB7XG4gKiAgIGNvbnN0IGN0eCA9IHJlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJylcbiAqXG4gKiAgIGlmIChpbWFnZSkge1xuICogICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApXG4gKiAgIH1cbiAqIH0sIFtyZWYsIGltYWdlXSlcbiAqXG4gKiByZXR1cm4gKFxuICogICA8PlxuICogICAgIHtlcnJvciAmJiBcInRoZXJlIHdhcyBhIHByb2JsZW0gbG9hZGluZyB0aGUgaW1hZ2VcIn1cbiAqICAgICA8Y2FudmFzIHJlZj17cmVmfSAvPlxuICogICA8Lz5cbiAqIGBgYFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VJbWFnZShpbWFnZU9yVXJsLCBjcm9zc09yaWdpbikge1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKHtcbiAgICBpbWFnZTogbnVsbCxcbiAgICBlcnJvcjogbnVsbFxuICB9KTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWltYWdlT3JVcmwpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgbGV0IGltYWdlO1xuICAgIGlmICh0eXBlb2YgaW1hZ2VPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICBpZiAoY3Jvc3NPcmlnaW4pIGltYWdlLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XG4gICAgICBpbWFnZS5zcmMgPSBpbWFnZU9yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbWFnZSA9IGltYWdlT3JVcmw7XG4gICAgICBpZiAoaW1hZ2UuY29tcGxldGUgJiYgaW1hZ2UubmF0dXJhbEhlaWdodCA+IDApIHtcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGltYWdlLFxuICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgaW1hZ2UsXG4gICAgICAgIGVycm9yOiBudWxsXG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBpbWFnZSxcbiAgICAgICAgZXJyb3JcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpbWFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbiAgICAgIGltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgfTtcbiAgfSwgW2ltYWdlT3JVcmwsIGNyb3NzT3JpZ2luXSk7XG4gIHJldHVybiBzdGF0ZTtcbn0iLCJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlQ29tbWl0dGVkUmVmIGZyb20gJy4vdXNlQ29tbWl0dGVkUmVmJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgYHNldEludGVydmFsYCB0aGF0IGlzIHByb3Blcmx5IGNsZWFuZWQgdXAgd2hlbiBhIGNvbXBvbmVudCB1bm1vdW50ZWRcbiAqXG4gKiBgYGB0c3hcbiAqICBmdW5jdGlvbiBUaW1lcigpIHtcbiAqICAgIGNvbnN0IFt0aW1lciwgc2V0VGltZXJdID0gdXNlU3RhdGUoMClcbiAqICAgIHVzZUludGVydmFsKCgpID0+IHNldFRpbWVyKGkgPT4gaSArIDEpLCAxMDAwKVxuICpcbiAqICAgIHJldHVybiA8c3Bhbj57dGltZXJ9IHNlY29uZHMgcGFzdDwvc3Bhbj5cbiAqICB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gZm4gYW4gZnVuY3Rpb24gcnVuIG9uIGVhY2ggaW50ZXJ2YWxcbiAqIEBwYXJhbSBtcyBUaGUgbWlsbGlzZWNvbmRzIGR1cmF0aW9uIG9mIHRoZSBpbnRlcnZhbFxuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIHBhdXNhYmxlIGBzZXRJbnRlcnZhbGAgdGhhdCBpcyBwcm9wZXJseSBjbGVhbmVkIHVwIHdoZW4gYSBjb21wb25lbnQgdW5tb3VudGVkXG4gKlxuICogYGBgdHN4XG4gKiAgY29uc3QgW3BhdXNlZCwgc2V0UGF1c2VkXSA9IHVzZVN0YXRlKGZhbHNlKVxuICogIGNvbnN0IFt0aW1lciwgc2V0VGltZXJdID0gdXNlU3RhdGUoMClcbiAqXG4gKiAgdXNlSW50ZXJ2YWwoKCkgPT4gc2V0VGltZXIoaSA9PiBpICsgMSksIDEwMDAsIHBhdXNlZClcbiAqXG4gKiAgcmV0dXJuIChcbiAqICAgIDxzcGFuPlxuICogICAgICB7dGltZXJ9IHNlY29uZHMgcGFzdFxuICpcbiAqICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRQYXVzZWQocCA9PiAhcCl9PntwYXVzZWQgPyAnUGxheScgOiAnUGF1c2UnIH08L2J1dHRvbj5cbiAqICAgIDwvc3Bhbj5cbiAqIClcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBmbiBhbiBmdW5jdGlvbiBydW4gb24gZWFjaCBpbnRlcnZhbFxuICogQHBhcmFtIG1zIFRoZSBtaWxsaXNlY29uZHMgZHVyYXRpb24gb2YgdGhlIGludGVydmFsXG4gKiBAcGFyYW0gcGF1c2VkIFdoZXRoZXIgb3Igbm90IHRoZSBpbnRlcnZhbCBpcyBjdXJyZW50bHkgcnVubmluZ1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIHBhdXNhYmxlIGBzZXRJbnRlcnZhbGAgdGhhdCBfZmlyZXNfIGltbWVkaWF0ZWx5IGFuZCBpc1xuICogcHJvcGVybHkgY2xlYW5lZCB1cCB3aGVuIGEgY29tcG9uZW50IHVubW91bnRlZFxuICpcbiAqIGBgYHRzeFxuICogIGNvbnN0IFt0aW1lciwgc2V0VGltZXJdID0gdXNlU3RhdGUoLTEpXG4gKiAgdXNlSW50ZXJ2YWwoKCkgPT4gc2V0VGltZXIoaSA9PiBpICsgMSksIDEwMDAsIGZhbHNlLCB0cnVlKVxuICpcbiAqICAvLyB3aWxsIHVwZGF0ZSB0byAwIG9uIHRoZSBmaXJzdCBlZmZlY3RcbiAqICByZXR1cm4gPHNwYW4+e3RpbWVyfSBzZWNvbmRzIHBhc3Q8L3NwYW4+XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gZm4gYW4gZnVuY3Rpb24gcnVuIG9uIGVhY2ggaW50ZXJ2YWxcbiAqIEBwYXJhbSBtcyBUaGUgbWlsbGlzZWNvbmRzIGR1cmF0aW9uIG9mIHRoZSBpbnRlcnZhbFxuICogQHBhcmFtIHBhdXNlZCBXaGV0aGVyIG9yIG5vdCB0aGUgaW50ZXJ2YWwgaXMgY3VycmVudGx5IHJ1bm5pbmdcbiAqIEBwYXJhbSBydW5JbW1lZGlhdGVseSBXaGV0aGVyIHRvIHJ1biB0aGUgZnVuY3Rpb24gaW1tZWRpYXRlbHkgb24gbW91bnQgb3IgdW5wYXVzZVxuICogcmF0aGVyIHRoYW4gd2FpdGluZyBmb3IgdGhlIGZpcnN0IGludGVydmFsIHRvIGVsYXBzZVxuICpcblxuICovXG5cbmZ1bmN0aW9uIHVzZUludGVydmFsKGZuLCBtcywgcGF1c2VkID0gZmFsc2UsIHJ1bkltbWVkaWF0ZWx5ID0gZmFsc2UpIHtcbiAgbGV0IGhhbmRsZTtcbiAgY29uc3QgZm5SZWYgPSB1c2VDb21taXR0ZWRSZWYoZm4pO1xuICAvLyB0aGlzIHJlZiBpcyBuZWNlc3NhcnkgYi9jIHVzZUVmZmVjdCB3aWxsIHNvbWV0aW1lcyBtaXNzIGEgcGF1c2VkIHRvZ2dsZVxuICAvLyBvcnBoYW5pbmcgYSBzZXRUaW1lb3V0IGNoYWluIGluIHRoZSBhZXRoZXIsIHNvIHJlbHlpbmcgb24gaXQncyByZWZyZXNoIGxvZ2ljIGlzIG5vdCByZWxpYWJsZS5cbiAgY29uc3QgcGF1c2VkUmVmID0gdXNlQ29tbWl0dGVkUmVmKHBhdXNlZCk7XG4gIGNvbnN0IHRpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHBhdXNlZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgZm5SZWYuY3VycmVudCgpO1xuICAgIHNjaGVkdWxlKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgfTtcblxuICBjb25zdCBzY2hlZHVsZSA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICBoYW5kbGUgPSBzZXRUaW1lb3V0KHRpY2ssIG1zKTtcbiAgfTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocnVuSW1tZWRpYXRlbHkpIHtcbiAgICAgIHRpY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NoZWR1bGUoKTtcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dChoYW5kbGUpO1xuICB9LCBbcGF1c2VkLCBydW5JbW1lZGlhdGVseV0pO1xufVxuZXhwb3J0IGRlZmF1bHQgdXNlSW50ZXJ2YWw7IiwiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIFVwZGF0ZXMgc3RhdGUsIHBhcnRpYWwgdXBkYXRlcyBhcmUgbWVyZ2VkIGludG8gZXhpc3Rpbmcgc3RhdGUgdmFsdWVzXG4gKi9cblxuLyoqXG4gKiBNaW1pY3MgYSBSZWFjdCBjbGFzcyBjb21wb25lbnQncyBzdGF0ZSBtb2RlbCwgb2YgaGF2aW5nIGEgc2luZ2xlIHVuaWZpZWRcbiAqIGBzdGF0ZWAgb2JqZWN0IGFuZCBhbiB1cGRhdGVyIHRoYXQgbWVyZ2VzIHVwZGF0ZXMgaW50byB0aGUgZXhpc3Rpbmcgc3RhdGUsIGFzXG4gKiBvcHBvc2VkIHRvIHJlcGxhY2luZyBpdC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VNZXJnZVN0YXRlKHsgbmFtZTogJ0JldHN5JywgYWdlOiAyNCB9KVxuICpcbiAqIHNldFN0YXRlKHsgbmFtZTogJ0pvaGFuJyB9KSAvLyB7IG5hbWU6ICdKb2hhbicsIGFnZTogMjQgfVxuICpcbiAqIHNldFN0YXRlKHN0YXRlID0+ICh7IGFnZTogc3RhdGUuYWdlICsgMTAgfSkpIC8vIHsgbmFtZTogJ0pvaGFuJywgYWdlOiAzNCB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gaW5pdGlhbFN0YXRlIFRoZSBpbml0aWFsIHN0YXRlIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VNZXJnZVN0YXRlKGluaXRpYWxTdGF0ZSkge1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKGluaXRpYWxTdGF0ZSk7XG4gIGNvbnN0IHVwZGF0ZXIgPSB1c2VDYWxsYmFjayh1cGRhdGUgPT4ge1xuICAgIGlmICh1cGRhdGUgPT09IG51bGwpIHJldHVybjtcbiAgICBpZiAodHlwZW9mIHVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB1cGRhdGUoc3RhdGUpO1xuICAgICAgICByZXR1cm4gbmV4dFN0YXRlID09IG51bGwgPyBzdGF0ZSA6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXh0U3RhdGUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFN0YXRlKHN0YXRlID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB1cGRhdGUpKTtcbiAgICB9XG4gIH0sIFtzZXRTdGF0ZV0pO1xuICByZXR1cm4gW3N0YXRlLCB1cGRhdGVyXTtcbn0iLCJpbXBvcnQgdXNlTWVyZ2VTdGF0ZSBmcm9tICcuL3VzZU1lcmdlU3RhdGUnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlTWVyZ2VTdGF0ZUZyb21Qcm9wcyhwcm9wcywgZ0RTRlAsIGluaXRpYWxTdGF0ZSkge1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZU1lcmdlU3RhdGUoaW5pdGlhbFN0YXRlKTtcbiAgY29uc3QgbmV4dFN0YXRlID0gZ0RTRlAocHJvcHMsIHN0YXRlKTtcbiAgaWYgKG5leHRTdGF0ZSAhPT0gbnVsbCkgc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgcmV0dXJuIFtzdGF0ZSwgc2V0U3RhdGVdO1xufSIsImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1c2VDb21taXR0ZWRSZWYgZnJvbSAnLi91c2VDb21taXR0ZWRSZWYnO1xuZnVuY3Rpb24gdXNlUmFmSW50ZXJ2YWwoZm4sIG1zLCBwYXVzZWQgPSBmYWxzZSkge1xuICBsZXQgaGFuZGxlO1xuICBsZXQgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgY29uc3QgZm5SZWYgPSB1c2VDb21taXR0ZWRSZWYoZm4pO1xuICAvLyB0aGlzIHJlZiBpcyBuZWNlc3NhcnkgYi9jIHVzZUVmZmVjdCB3aWxsIHNvbWV0aW1lcyBtaXNzIGEgcGF1c2VkIHRvZ2dsZVxuICAvLyBvcnBoYW5pbmcgYSBzZXRUaW1lb3V0IGNoYWluIGluIHRoZSBhZXRoZXIsIHNvIHJlbHlpbmcgb24gaXQncyByZWZyZXNoIGxvZ2ljIGlzIG5vdCByZWxpYWJsZS5cbiAgY29uc3QgcGF1c2VkUmVmID0gdXNlQ29tbWl0dGVkUmVmKHBhdXNlZCk7XG4gIGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgY29uc3QgY3VycmVudCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGRlbHRhID0gY3VycmVudCAtIHN0YXJ0O1xuICAgIGlmIChwYXVzZWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGlmIChkZWx0YSA+PSBtcyAmJiBmblJlZi5jdXJyZW50KSB7XG4gICAgICBmblJlZi5jdXJyZW50KCk7XG4gICAgICBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUpO1xuICAgIGhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgfVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICByZXR1cm4gKCkgPT4gY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlKTtcbiAgfSwgW10pO1xufVxuZXhwb3J0IGRlZmF1bHQgdXNlUmFmSW50ZXJ2YWw7IiwiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlRWZmZWN0IGZyb20gJy4vdXNlSXNvbW9ycGhpY0VmZmVjdCc7XG5jb25zdCB0YXJnZXRNYXAgPSBuZXcgV2Vha01hcCgpO1xubGV0IHJlc2l6ZU9ic2VydmVyO1xuZnVuY3Rpb24gZ2V0UmVzaXplT2JzZXJ2ZXIoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXR1cm4tYXNzaWduXG4gIHJldHVybiByZXNpemVPYnNlcnZlciA9IHJlc2l6ZU9ic2VydmVyIHx8IG5ldyB3aW5kb3cuUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSB0YXJnZXRNYXAuZ2V0KGVudHJ5LnRhcmdldCk7XG4gICAgICBpZiAoaGFuZGxlcikgaGFuZGxlcihlbnRyeS5jb250ZW50UmVjdCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEVmZmljaWVudGx5IG9ic2VydmUgc2l6ZSBjaGFuZ2VzIG9uIGFuIGVsZW1lbnQuIERlcGVuZHMgb24gdGhlIGBSZXNpemVPYnNlcnZlcmAgYXBpLFxuICogYW5kIHBvbHlmaWxscyBhcmUgbmVlZGVkIGluIG9sZGVyIGJyb3dzZXJzLlxuICpcbiAqIGBgYHRzXG4gKiBjb25zdCBbcmVmLCBhdHRhY2hSZWZdID0gdXNlQ2FsbGJhY2tSZWYobnVsbCk7XG4gKlxuICogY29uc3QgcmVjdCA9IHVzZVJlc2l6ZU9ic2VydmVyKHJlZik7XG4gKlxuICogcmV0dXJuIChcbiAqICA8ZGl2IHJlZj17YXR0YWNoUmVmfT5cbiAqICAgIHtKU09OLnN0cmluZ2lmeShyZWN0KX1cbiAqICA8L2Rpdj5cbiAqIClcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBlbGVtZW50IFRoZSBET00gZWxlbWVudCB0byBvYnNlcnZlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVJlc2l6ZU9ic2VydmVyKGVsZW1lbnQpIHtcbiAgY29uc3QgW3JlY3QsIHNldFJlY3RdID0gdXNlU3RhdGUobnVsbCk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFlbGVtZW50KSByZXR1cm47XG4gICAgZ2V0UmVzaXplT2JzZXJ2ZXIoKS5vYnNlcnZlKGVsZW1lbnQpO1xuICAgIHNldFJlY3QoZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG4gICAgdGFyZ2V0TWFwLnNldChlbGVtZW50LCByZWN0ID0+IHtcbiAgICAgIHNldFJlY3QocmVjdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRhcmdldE1hcC5kZWxldGUoZWxlbWVudCk7XG4gICAgfTtcbiAgfSwgW2VsZW1lbnRdKTtcbiAgcmV0dXJuIHJlY3Q7XG59IiwiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlTW91bnRlZCBmcm9tICcuL3VzZU1vdW50ZWQnO1xuXG4vKipcbiAqIGB1c2VTYWZlU3RhdGVgIHRha2VzIHRoZSByZXR1cm4gdmFsdWUgb2YgYSBgdXNlU3RhdGVgIGhvb2sgYW5kIHdyYXBzIHRoZVxuICogc2V0dGVyIHRvIHByZXZlbnQgdXBkYXRlcyBvbmNlcyB0aGUgY29tcG9uZW50IGhhcyB1bm1vdW50ZWQuIENhbiB1c2VkXG4gKiB3aXRoIGB1c2VNZXJnZVN0YXRlYCBhbmQgYHVzZVN0YXRlQXN5bmNgIGFzIHdlbGxcbiAqXG4gKiBAcGFyYW0gc3RhdGUgVGhlIHJldHVybiB2YWx1ZSBvZiBhIHVzZVN0YXRlSG9va1xuICpcbiAqIGBgYHRzXG4gKiBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VTYWZlU3RhdGUodXNlU3RhdGUodHJ1ZSkpO1xuICogYGBgXG4gKi9cblxuZnVuY3Rpb24gdXNlU2FmZVN0YXRlKHN0YXRlKSB7XG4gIGNvbnN0IGlzTW91bnRlZCA9IHVzZU1vdW50ZWQoKTtcbiAgcmV0dXJuIFtzdGF0ZVswXSwgdXNlQ2FsbGJhY2sobmV4dFN0YXRlID0+IHtcbiAgICBpZiAoIWlzTW91bnRlZCgpKSByZXR1cm47XG4gICAgcmV0dXJuIHN0YXRlWzFdKG5leHRTdGF0ZSk7XG4gIH0sIFtpc01vdW50ZWQsIHN0YXRlWzFdXSldO1xufVxuZXhwb3J0IGRlZmF1bHQgdXNlU2FmZVN0YXRlOyIsImZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHsgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307IHZhciB0YXJnZXQgPSB7fTsgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpOyB2YXIga2V5LCBpOyBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykgeyBrZXkgPSBzb3VyY2VLZXlzW2ldOyBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlOyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IHJldHVybiB0YXJnZXQ7IH1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykgeyB2YXIga2V5ID0gX3RvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7IHJldHVybiB0eXBlb2Yga2V5ID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkgeyBpZiAodHlwZW9mIGlucHV0ICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7IHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkgeyB2YXIgcmVzID0gcHJpbS5jYWxsKGlucHV0LCBoaW50IHx8IFwiZGVmYXVsdFwiKTsgaWYgKHR5cGVvZiByZXMgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTsgfSByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTsgfVxuaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEtleShrZXkpIHtcbiAgcmV0dXJuICdkZWZhdWx0JyArIGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zdWJzdHIoMSk7XG59XG5mdW5jdGlvbiB1c2VVbmNvbnRyb2xsZWRQcm9wKHByb3BWYWx1ZSwgZGVmYXVsdFZhbHVlLCBoYW5kbGVyKSB7XG4gIGNvbnN0IHdhc1Byb3BSZWYgPSB1c2VSZWYocHJvcFZhbHVlICE9PSB1bmRlZmluZWQpO1xuICBjb25zdCBbc3RhdGVWYWx1ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoZGVmYXVsdFZhbHVlKTtcbiAgY29uc3QgaXNQcm9wID0gcHJvcFZhbHVlICE9PSB1bmRlZmluZWQ7XG4gIGNvbnN0IHdhc1Byb3AgPSB3YXNQcm9wUmVmLmN1cnJlbnQ7XG4gIHdhc1Byb3BSZWYuY3VycmVudCA9IGlzUHJvcDtcblxuICAvKipcbiAgICogSWYgYSBwcm9wIHN3aXRjaGVzIGZyb20gY29udHJvbGxlZCB0byBVbmNvbnRyb2xsZWRcbiAgICogcmVzZXQgaXRzIHZhbHVlIHRvIHRoZSBkZWZhdWx0VmFsdWVcbiAgICovXG4gIGlmICghaXNQcm9wICYmIHdhc1Byb3AgJiYgc3RhdGVWYWx1ZSAhPT0gZGVmYXVsdFZhbHVlKSB7XG4gICAgc2V0U3RhdGUoZGVmYXVsdFZhbHVlKTtcbiAgfVxuICByZXR1cm4gW2lzUHJvcCA/IHByb3BWYWx1ZSA6IHN0YXRlVmFsdWUsIHVzZUNhbGxiYWNrKCguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgW3ZhbHVlLCAuLi5yZXN0XSA9IGFyZ3M7XG4gICAgbGV0IHJldHVyblZhbHVlID0gaGFuZGxlciA9PSBudWxsID8gdm9pZCAwIDogaGFuZGxlcih2YWx1ZSwgLi4ucmVzdCk7XG4gICAgc2V0U3RhdGUodmFsdWUpO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfSwgW2hhbmRsZXJdKV07XG59XG5leHBvcnQgeyB1c2VVbmNvbnRyb2xsZWRQcm9wIH07XG5leHBvcnQgZnVuY3Rpb24gdXNlVW5jb250cm9sbGVkKHByb3BzLCBjb25maWcpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGNvbmZpZykucmVkdWNlKChyZXN1bHQsIGZpZWxkTmFtZSkgPT4ge1xuICAgIGNvbnN0IF9yZWYgPSByZXN1bHQsXG4gICAgICBfZGVmYXVsdEtleSA9IGRlZmF1bHRLZXkoZmllbGROYW1lKSxcbiAgICAgIHtcbiAgICAgICAgW19kZWZhdWx0S2V5XTogZGVmYXVsdFZhbHVlLFxuICAgICAgICBbZmllbGROYW1lXTogcHJvcHNWYWx1ZVxuICAgICAgfSA9IF9yZWYsXG4gICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW19kZWZhdWx0S2V5LCBmaWVsZE5hbWVdLm1hcChfdG9Qcm9wZXJ0eUtleSkpO1xuICAgIGNvbnN0IGhhbmRsZXJOYW1lID0gY29uZmlnW2ZpZWxkTmFtZV07XG4gICAgY29uc3QgW3ZhbHVlLCBoYW5kbGVyXSA9IHVzZVVuY29udHJvbGxlZFByb3AocHJvcHNWYWx1ZSwgZGVmYXVsdFZhbHVlLCBwcm9wc1toYW5kbGVyTmFtZV0pO1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZXN0LCB7XG4gICAgICBbZmllbGROYW1lXTogdmFsdWUsXG4gICAgICBbaGFuZGxlck5hbWVdOiBoYW5kbGVyXG4gICAgfSk7XG4gIH0sIHByb3BzKTtcbn0iLCJ2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZmluZChpdGVyLCB0YXIsIGtleSkge1xuXHRmb3IgKGtleSBvZiBpdGVyLmtleXMoKSkge1xuXHRcdGlmIChkZXF1YWwoa2V5LCB0YXIpKSByZXR1cm4ga2V5O1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXF1YWwoZm9vLCBiYXIpIHtcblx0dmFyIGN0b3IsIGxlbiwgdG1wO1xuXHRpZiAoZm9vID09PSBiYXIpIHJldHVybiB0cnVlO1xuXG5cdGlmIChmb28gJiYgYmFyICYmIChjdG9yPWZvby5jb25zdHJ1Y3RvcikgPT09IGJhci5jb25zdHJ1Y3Rvcikge1xuXHRcdGlmIChjdG9yID09PSBEYXRlKSByZXR1cm4gZm9vLmdldFRpbWUoKSA9PT0gYmFyLmdldFRpbWUoKTtcblx0XHRpZiAoY3RvciA9PT0gUmVnRXhwKSByZXR1cm4gZm9vLnRvU3RyaW5nKCkgPT09IGJhci50b1N0cmluZygpO1xuXG5cdFx0aWYgKGN0b3IgPT09IEFycmF5KSB7XG5cdFx0XHRpZiAoKGxlbj1mb28ubGVuZ3RoKSA9PT0gYmFyLmxlbmd0aCkge1xuXHRcdFx0XHR3aGlsZSAobGVuLS0gJiYgZGVxdWFsKGZvb1tsZW5dLCBiYXJbbGVuXSkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGxlbiA9PT0gLTE7XG5cdFx0fVxuXG5cdFx0aWYgKGN0b3IgPT09IFNldCkge1xuXHRcdFx0aWYgKGZvby5zaXplICE9PSBiYXIuc2l6ZSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxlbiBvZiBmb28pIHtcblx0XHRcdFx0dG1wID0gbGVuO1xuXHRcdFx0XHRpZiAodG1wICYmIHR5cGVvZiB0bXAgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dG1wID0gZmluZChiYXIsIHRtcCk7XG5cdFx0XHRcdFx0aWYgKCF0bXApIHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIWJhci5oYXModG1wKSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGN0b3IgPT09IE1hcCkge1xuXHRcdFx0aWYgKGZvby5zaXplICE9PSBiYXIuc2l6ZSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxlbiBvZiBmb28pIHtcblx0XHRcdFx0dG1wID0gbGVuWzBdO1xuXHRcdFx0XHRpZiAodG1wICYmIHR5cGVvZiB0bXAgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dG1wID0gZmluZChiYXIsIHRtcCk7XG5cdFx0XHRcdFx0aWYgKCF0bXApIHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIWRlcXVhbChsZW5bMV0sIGJhci5nZXQodG1wKSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmIChjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuXHRcdFx0Zm9vID0gbmV3IFVpbnQ4QXJyYXkoZm9vKTtcblx0XHRcdGJhciA9IG5ldyBVaW50OEFycmF5KGJhcik7XG5cdFx0fSBlbHNlIGlmIChjdG9yID09PSBEYXRhVmlldykge1xuXHRcdFx0aWYgKChsZW49Zm9vLmJ5dGVMZW5ndGgpID09PSBiYXIuYnl0ZUxlbmd0aCkge1xuXHRcdFx0XHR3aGlsZSAobGVuLS0gJiYgZm9vLmdldEludDgobGVuKSA9PT0gYmFyLmdldEludDgobGVuKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbGVuID09PSAtMTtcblx0XHR9XG5cblx0XHRpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGZvbykpIHtcblx0XHRcdGlmICgobGVuPWZvby5ieXRlTGVuZ3RoKSA9PT0gYmFyLmJ5dGVMZW5ndGgpIHtcblx0XHRcdFx0d2hpbGUgKGxlbi0tICYmIGZvb1tsZW5dID09PSBiYXJbbGVuXSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbGVuID09PSAtMTtcblx0XHR9XG5cblx0XHRpZiAoIWN0b3IgfHwgdHlwZW9mIGZvbyA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGxlbiA9IDA7XG5cdFx0XHRmb3IgKGN0b3IgaW4gZm9vKSB7XG5cdFx0XHRcdGlmIChoYXMuY2FsbChmb28sIGN0b3IpICYmICsrbGVuICYmICFoYXMuY2FsbChiYXIsIGN0b3IpKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICghKGN0b3IgaW4gYmFyKSB8fCAhZGVxdWFsKGZvb1tjdG9yXSwgYmFyW2N0b3JdKSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKGJhcikubGVuZ3RoID09PSBsZW47XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZvbyAhPT0gZm9vICYmIGJhciAhPT0gYmFyO1xufVxuIiwiaW1wb3J0IGNhblVzZURPTSBmcm9tICcuL2NhblVzZURPTSc7XG52YXIgc2l6ZTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjcm9sbGJhclNpemUocmVjYWxjKSB7XG4gIGlmICghc2l6ZSAmJiBzaXplICE9PSAwIHx8IHJlY2FsYykge1xuICAgIGlmIChjYW5Vc2VET00pIHtcbiAgICAgIHZhciBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHNjcm9sbERpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUudG9wID0gJy05OTk5cHgnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLndpZHRoID0gJzUwcHgnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLmhlaWdodCA9ICc1MHB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuICAgICAgc2l6ZSA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2l6ZTtcbn0iLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlVW5jb250cm9sbGVkIH0gZnJvbSAndW5jb250cm9sbGFibGUnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCBBY2NvcmRpb25Cb2R5IGZyb20gJy4vQWNjb3JkaW9uQm9keSc7XG5pbXBvcnQgQWNjb3JkaW9uQnV0dG9uIGZyb20gJy4vQWNjb3JkaW9uQnV0dG9uJztcbmltcG9ydCBBY2NvcmRpb25Db2xsYXBzZSBmcm9tICcuL0FjY29yZGlvbkNvbGxhcHNlJztcbmltcG9ydCBBY2NvcmRpb25Db250ZXh0IGZyb20gJy4vQWNjb3JkaW9uQ29udGV4dCc7XG5pbXBvcnQgQWNjb3JkaW9uSGVhZGVyIGZyb20gJy4vQWNjb3JkaW9uSGVhZGVyJztcbmltcG9ydCBBY2NvcmRpb25JdGVtIGZyb20gJy4vQWNjb3JkaW9uSXRlbSc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgQWNjb3JkaW9uID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcbiAgY29uc3Qge1xuICAgIC8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbiAgICBhczogQ29tcG9uZW50ID0gJ2RpdicsXG4gICAgYWN0aXZlS2V5LFxuICAgIGJzUHJlZml4LFxuICAgIGNsYXNzTmFtZSxcbiAgICBvblNlbGVjdCxcbiAgICBmbHVzaCxcbiAgICBhbHdheXNPcGVuLFxuICAgIC4uLmNvbnRyb2xsZWRQcm9wc1xuICB9ID0gdXNlVW5jb250cm9sbGVkKHByb3BzLCB7XG4gICAgYWN0aXZlS2V5OiAnb25TZWxlY3QnXG4gIH0pO1xuICBjb25zdCBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdhY2NvcmRpb24nKTtcbiAgY29uc3QgY29udGV4dFZhbHVlID0gdXNlTWVtbygoKSA9PiAoe1xuICAgIGFjdGl2ZUV2ZW50S2V5OiBhY3RpdmVLZXksXG4gICAgb25TZWxlY3QsXG4gICAgYWx3YXlzT3BlblxuICB9KSwgW2FjdGl2ZUtleSwgb25TZWxlY3QsIGFsd2F5c09wZW5dKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KEFjY29yZGlvbkNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZTogY29udGV4dFZhbHVlLFxuICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICAgIHJlZjogcmVmLFxuICAgICAgLi4uY29udHJvbGxlZFByb3BzLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgcHJlZml4LCBmbHVzaCAmJiBgJHtwcmVmaXh9LWZsdXNoYClcbiAgICB9KVxuICB9KTtcbn0pO1xuQWNjb3JkaW9uLmRpc3BsYXlOYW1lID0gJ0FjY29yZGlvbic7XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEFjY29yZGlvbiwge1xuICBCdXR0b246IEFjY29yZGlvbkJ1dHRvbixcbiAgQ29sbGFwc2U6IEFjY29yZGlvbkNvbGxhcHNlLFxuICBJdGVtOiBBY2NvcmRpb25JdGVtLFxuICBIZWFkZXI6IEFjY29yZGlvbkhlYWRlcixcbiAgQm9keTogQWNjb3JkaW9uQm9keVxufSk7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgQWNjb3JkaW9uQ29sbGFwc2UgZnJvbSAnLi9BY2NvcmRpb25Db2xsYXBzZSc7XG5pbXBvcnQgQWNjb3JkaW9uSXRlbUNvbnRleHQgZnJvbSAnLi9BY2NvcmRpb25JdGVtQ29udGV4dCc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgQWNjb3JkaW9uQm9keSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIC8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICBic1ByZWZpeCxcbiAgY2xhc3NOYW1lLFxuICBvbkVudGVyLFxuICBvbkVudGVyaW5nLFxuICBvbkVudGVyZWQsXG4gIG9uRXhpdCxcbiAgb25FeGl0aW5nLFxuICBvbkV4aXRlZCxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2FjY29yZGlvbi1ib2R5Jyk7XG4gIGNvbnN0IHtcbiAgICBldmVudEtleVxuICB9ID0gdXNlQ29udGV4dChBY2NvcmRpb25JdGVtQ29udGV4dCk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChBY2NvcmRpb25Db2xsYXBzZSwge1xuICAgIGV2ZW50S2V5OiBldmVudEtleSxcbiAgICBvbkVudGVyOiBvbkVudGVyLFxuICAgIG9uRW50ZXJpbmc6IG9uRW50ZXJpbmcsXG4gICAgb25FbnRlcmVkOiBvbkVudGVyZWQsXG4gICAgb25FeGl0OiBvbkV4aXQsXG4gICAgb25FeGl0aW5nOiBvbkV4aXRpbmcsXG4gICAgb25FeGl0ZWQ6IG9uRXhpdGVkLFxuICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICAgIHJlZjogcmVmLFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeClcbiAgICB9KVxuICB9KTtcbn0pO1xuQWNjb3JkaW9uQm9keS5kaXNwbGF5TmFtZSA9ICdBY2NvcmRpb25Cb2R5JztcbmV4cG9ydCBkZWZhdWx0IEFjY29yZGlvbkJvZHk7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBBY2NvcmRpb25Db250ZXh0LCB7IGlzQWNjb3JkaW9uSXRlbVNlbGVjdGVkIH0gZnJvbSAnLi9BY2NvcmRpb25Db250ZXh0JztcbmltcG9ydCBBY2NvcmRpb25JdGVtQ29udGV4dCBmcm9tICcuL0FjY29yZGlvbkl0ZW1Db250ZXh0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUFjY29yZGlvbkJ1dHRvbihldmVudEtleSwgb25DbGljaykge1xuICBjb25zdCB7XG4gICAgYWN0aXZlRXZlbnRLZXksXG4gICAgb25TZWxlY3QsXG4gICAgYWx3YXlzT3BlblxuICB9ID0gdXNlQ29udGV4dChBY2NvcmRpb25Db250ZXh0KTtcbiAgcmV0dXJuIGUgPT4ge1xuICAgIC8qXG4gICAgICBDb21wYXJlIHRoZSBldmVudCBrZXkgaW4gY29udGV4dCB3aXRoIHRoZSBnaXZlbiBldmVudCBrZXkuXG4gICAgICBJZiB0aGV5IGFyZSB0aGUgc2FtZSwgdGhlbiBjb2xsYXBzZSB0aGUgY29tcG9uZW50LlxuICAgICovXG4gICAgbGV0IGV2ZW50S2V5UGFzc2VkID0gZXZlbnRLZXkgPT09IGFjdGl2ZUV2ZW50S2V5ID8gbnVsbCA6IGV2ZW50S2V5O1xuICAgIGlmIChhbHdheXNPcGVuKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhY3RpdmVFdmVudEtleSkpIHtcbiAgICAgICAgaWYgKGFjdGl2ZUV2ZW50S2V5LmluY2x1ZGVzKGV2ZW50S2V5KSkge1xuICAgICAgICAgIGV2ZW50S2V5UGFzc2VkID0gYWN0aXZlRXZlbnRLZXkuZmlsdGVyKGsgPT4gayAhPT0gZXZlbnRLZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZW50S2V5UGFzc2VkID0gWy4uLmFjdGl2ZUV2ZW50S2V5LCBldmVudEtleV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFjdGl2ZUV2ZW50S2V5IGlzIHVuZGVmaW5lZC5cbiAgICAgICAgZXZlbnRLZXlQYXNzZWQgPSBbZXZlbnRLZXldO1xuICAgICAgfVxuICAgIH1cbiAgICBvblNlbGVjdCA9PSBudWxsIHx8IG9uU2VsZWN0KGV2ZW50S2V5UGFzc2VkLCBlKTtcbiAgICBvbkNsaWNrID09IG51bGwgfHwgb25DbGljayhlKTtcbiAgfTtcbn1cbmNvbnN0IEFjY29yZGlvbkJ1dHRvbiA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIC8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbiAgYXM6IENvbXBvbmVudCA9ICdidXR0b24nLFxuICBic1ByZWZpeCxcbiAgY2xhc3NOYW1lLFxuICBvbkNsaWNrLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYWNjb3JkaW9uLWJ1dHRvbicpO1xuICBjb25zdCB7XG4gICAgZXZlbnRLZXlcbiAgfSA9IHVzZUNvbnRleHQoQWNjb3JkaW9uSXRlbUNvbnRleHQpO1xuICBjb25zdCBhY2NvcmRpb25PbkNsaWNrID0gdXNlQWNjb3JkaW9uQnV0dG9uKGV2ZW50S2V5LCBvbkNsaWNrKTtcbiAgY29uc3Qge1xuICAgIGFjdGl2ZUV2ZW50S2V5XG4gIH0gPSB1c2VDb250ZXh0KEFjY29yZGlvbkNvbnRleHQpO1xuICBpZiAoQ29tcG9uZW50ID09PSAnYnV0dG9uJykge1xuICAgIHByb3BzLnR5cGUgPSAnYnV0dG9uJztcbiAgfVxuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgb25DbGljazogYWNjb3JkaW9uT25DbGljayxcbiAgICAuLi5wcm9wcyxcbiAgICBcImFyaWEtZXhwYW5kZWRcIjogQXJyYXkuaXNBcnJheShhY3RpdmVFdmVudEtleSkgPyBhY3RpdmVFdmVudEtleS5pbmNsdWRlcyhldmVudEtleSkgOiBldmVudEtleSA9PT0gYWN0aXZlRXZlbnRLZXksXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgsICFpc0FjY29yZGlvbkl0ZW1TZWxlY3RlZChhY3RpdmVFdmVudEtleSwgZXZlbnRLZXkpICYmICdjb2xsYXBzZWQnKVxuICB9KTtcbn0pO1xuQWNjb3JkaW9uQnV0dG9uLmRpc3BsYXlOYW1lID0gJ0FjY29yZGlvbkJ1dHRvbic7XG5leHBvcnQgZGVmYXVsdCBBY2NvcmRpb25CdXR0b247IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgQ29sbGFwc2UgZnJvbSAnLi9Db2xsYXBzZSc7XG5pbXBvcnQgQWNjb3JkaW9uQ29udGV4dCwgeyBpc0FjY29yZGlvbkl0ZW1TZWxlY3RlZCB9IGZyb20gJy4vQWNjb3JkaW9uQ29udGV4dCc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBhY2NlcHRzIGFsbCBvZiBbYENvbGxhcHNlYCdzIHByb3BzXSgvZG9jcy91dGlsaXRpZXMvdHJhbnNpdGlvbnMjY29sbGFwc2UtMSkuXG4gKi9cbmNvbnN0IEFjY29yZGlvbkNvbGxhcHNlID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICBic1ByZWZpeCxcbiAgY2xhc3NOYW1lLFxuICBjaGlsZHJlbixcbiAgZXZlbnRLZXksXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgY29uc3Qge1xuICAgIGFjdGl2ZUV2ZW50S2V5XG4gIH0gPSB1c2VDb250ZXh0KEFjY29yZGlvbkNvbnRleHQpO1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2FjY29yZGlvbi1jb2xsYXBzZScpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29sbGFwc2UsIHtcbiAgICByZWY6IHJlZixcbiAgICBpbjogaXNBY2NvcmRpb25JdGVtU2VsZWN0ZWQoYWN0aXZlRXZlbnRLZXksIGV2ZW50S2V5KSxcbiAgICAuLi5wcm9wcyxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCksXG4gICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgICAgY2hpbGRyZW46IFJlYWN0LkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pXG4gICAgfSlcbiAgfSk7XG59KTtcbkFjY29yZGlvbkNvbGxhcHNlLmRpc3BsYXlOYW1lID0gJ0FjY29yZGlvbkNvbGxhcHNlJztcbmV4cG9ydCBkZWZhdWx0IEFjY29yZGlvbkNvbGxhcHNlOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5leHBvcnQgZnVuY3Rpb24gaXNBY2NvcmRpb25JdGVtU2VsZWN0ZWQoYWN0aXZlRXZlbnRLZXksIGV2ZW50S2V5KSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFjdGl2ZUV2ZW50S2V5KSA/IGFjdGl2ZUV2ZW50S2V5LmluY2x1ZGVzKGV2ZW50S2V5KSA6IGFjdGl2ZUV2ZW50S2V5ID09PSBldmVudEtleTtcbn1cbmNvbnN0IGNvbnRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlQ29udGV4dCh7fSk7XG5jb250ZXh0LmRpc3BsYXlOYW1lID0gJ0FjY29yZGlvbkNvbnRleHQnO1xuZXhwb3J0IGRlZmF1bHQgY29udGV4dDsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IEFjY29yZGlvbkJ1dHRvbiBmcm9tICcuL0FjY29yZGlvbkJ1dHRvbic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgQWNjb3JkaW9uSGVhZGVyID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuICBhczogQ29tcG9uZW50ID0gJ2gyJyxcbiAgJ2FyaWEtY29udHJvbHMnOiBhcmlhQ29udHJvbHMsXG4gIGJzUHJlZml4LFxuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxuICBvbkNsaWNrLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYWNjb3JkaW9uLWhlYWRlcicpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgLi4ucHJvcHMsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChBY2NvcmRpb25CdXR0b24sIHtcbiAgICAgIG9uQ2xpY2s6IG9uQ2xpY2ssXG4gICAgICBcImFyaWEtY29udHJvbHNcIjogYXJpYUNvbnRyb2xzLFxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgfSlcbiAgfSk7XG59KTtcbkFjY29yZGlvbkhlYWRlci5kaXNwbGF5TmFtZSA9ICdBY2NvcmRpb25IZWFkZXInO1xuZXhwb3J0IGRlZmF1bHQgQWNjb3JkaW9uSGVhZGVyOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IEFjY29yZGlvbkl0ZW1Db250ZXh0IGZyb20gJy4vQWNjb3JkaW9uSXRlbUNvbnRleHQnO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IEFjY29yZGlvbkl0ZW0gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICAvLyBOZWVkIHRvIGRlZmluZSB0aGUgZGVmYXVsdCBcImFzXCIgZHVyaW5nIHByb3AgZGVzdHJ1Y3R1cmluZyB0byBiZSBjb21wYXRpYmxlIHdpdGggc3R5bGVkLWNvbXBvbmVudHMgZ2l0aHViLmNvbS9yZWFjdC1ib290c3RyYXAvcmVhY3QtYm9vdHN0cmFwL2lzc3Vlcy8zNTk1XG4gIGFzOiBDb21wb25lbnQgPSAnZGl2JyxcbiAgYnNQcmVmaXgsXG4gIGNsYXNzTmFtZSxcbiAgZXZlbnRLZXksXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgYnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdhY2NvcmRpb24taXRlbScpO1xuICBjb25zdCBjb250ZXh0VmFsdWUgPSB1c2VNZW1vKCgpID0+ICh7XG4gICAgZXZlbnRLZXlcbiAgfSksIFtldmVudEtleV0pO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQWNjb3JkaW9uSXRlbUNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZTogY29udGV4dFZhbHVlLFxuICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICAgIHJlZjogcmVmLFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeClcbiAgICB9KVxuICB9KTtcbn0pO1xuQWNjb3JkaW9uSXRlbS5kaXNwbGF5TmFtZSA9ICdBY2NvcmRpb25JdGVtJztcbmV4cG9ydCBkZWZhdWx0IEFjY29yZGlvbkl0ZW07IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IGNvbnRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlQ29udGV4dCh7XG4gIGV2ZW50S2V5OiAnJ1xufSk7XG5jb250ZXh0LmRpc3BsYXlOYW1lID0gJ0FjY29yZGlvbkl0ZW1Db250ZXh0JztcbmV4cG9ydCBkZWZhdWx0IGNvbnRleHQ7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlVW5jb250cm9sbGVkIH0gZnJvbSAndW5jb250cm9sbGFibGUnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IEFsZXJ0SGVhZGluZyBmcm9tICcuL0FsZXJ0SGVhZGluZyc7XG5pbXBvcnQgQWxlcnRMaW5rIGZyb20gJy4vQWxlcnRMaW5rJztcbmltcG9ydCBGYWRlIGZyb20gJy4vRmFkZSc7XG5pbXBvcnQgQ2xvc2VCdXR0b24gZnJvbSAnLi9DbG9zZUJ1dHRvbic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgQWxlcnQgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigodW5jb250cm9sbGVkUHJvcHMsIHJlZikgPT4ge1xuICBjb25zdCB7XG4gICAgYnNQcmVmaXgsXG4gICAgc2hvdyA9IHRydWUsXG4gICAgY2xvc2VMYWJlbCA9ICdDbG9zZSBhbGVydCcsXG4gICAgY2xvc2VWYXJpYW50LFxuICAgIGNsYXNzTmFtZSxcbiAgICBjaGlsZHJlbixcbiAgICB2YXJpYW50ID0gJ3ByaW1hcnknLFxuICAgIG9uQ2xvc2UsXG4gICAgZGlzbWlzc2libGUsXG4gICAgdHJhbnNpdGlvbiA9IEZhZGUsXG4gICAgLi4ucHJvcHNcbiAgfSA9IHVzZVVuY29udHJvbGxlZCh1bmNvbnRyb2xsZWRQcm9wcywge1xuICAgIHNob3c6ICdvbkNsb3NlJ1xuICB9KTtcbiAgY29uc3QgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYWxlcnQnKTtcbiAgY29uc3QgaGFuZGxlQ2xvc2UgPSB1c2VFdmVudENhbGxiYWNrKGUgPT4ge1xuICAgIGlmIChvbkNsb3NlKSB7XG4gICAgICBvbkNsb3NlKGZhbHNlLCBlKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBUcmFuc2l0aW9uID0gdHJhbnNpdGlvbiA9PT0gdHJ1ZSA/IEZhZGUgOiB0cmFuc2l0aW9uO1xuICBjb25zdCBhbGVydCA9IC8qI19fUFVSRV9fKi9fanN4cyhcImRpdlwiLCB7XG4gICAgcm9sZTogXCJhbGVydFwiLFxuICAgIC4uLighVHJhbnNpdGlvbiA/IHByb3BzIDogdW5kZWZpbmVkKSxcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBwcmVmaXgsIHZhcmlhbnQgJiYgYCR7cHJlZml4fS0ke3ZhcmlhbnR9YCwgZGlzbWlzc2libGUgJiYgYCR7cHJlZml4fS1kaXNtaXNzaWJsZWApLFxuICAgIGNoaWxkcmVuOiBbZGlzbWlzc2libGUgJiYgLyojX19QVVJFX18qL19qc3goQ2xvc2VCdXR0b24sIHtcbiAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsb3NlLFxuICAgICAgXCJhcmlhLWxhYmVsXCI6IGNsb3NlTGFiZWwsXG4gICAgICB2YXJpYW50OiBjbG9zZVZhcmlhbnRcbiAgICB9KSwgY2hpbGRyZW5dXG4gIH0pO1xuICBpZiAoIVRyYW5zaXRpb24pIHJldHVybiBzaG93ID8gYWxlcnQgOiBudWxsO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goVHJhbnNpdGlvbiwge1xuICAgIHVubW91bnRPbkV4aXQ6IHRydWUsXG4gICAgLi4ucHJvcHMsXG4gICAgcmVmOiB1bmRlZmluZWQsXG4gICAgaW46IHNob3csXG4gICAgY2hpbGRyZW46IGFsZXJ0XG4gIH0pO1xufSk7XG5BbGVydC5kaXNwbGF5TmFtZSA9ICdBbGVydCc7XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEFsZXJ0LCB7XG4gIExpbms6IEFsZXJ0TGluayxcbiAgSGVhZGluZzogQWxlcnRIZWFkaW5nXG59KTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IGRpdldpdGhDbGFzc05hbWUgZnJvbSAnLi9kaXZXaXRoQ2xhc3NOYW1lJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBEaXZTdHlsZWRBc0g0ID0gZGl2V2l0aENsYXNzTmFtZSgnaDQnKTtcbkRpdlN0eWxlZEFzSDQuZGlzcGxheU5hbWUgPSAnRGl2U3R5bGVkQXNINCc7XG5jb25zdCBBbGVydEhlYWRpbmcgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBjbGFzc05hbWUsXG4gIGJzUHJlZml4LFxuICBhczogQ29tcG9uZW50ID0gRGl2U3R5bGVkQXNINCxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2FsZXJ0LWhlYWRpbmcnKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgIHJlZjogcmVmLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4KSxcbiAgICAuLi5wcm9wc1xuICB9KTtcbn0pO1xuQWxlcnRIZWFkaW5nLmRpc3BsYXlOYW1lID0gJ0FsZXJ0SGVhZGluZyc7XG5leHBvcnQgZGVmYXVsdCBBbGVydEhlYWRpbmc7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IEFuY2hvciBmcm9tICdAcmVzdGFydC91aS9BbmNob3InO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBBbGVydExpbmsgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBjbGFzc05hbWUsXG4gIGJzUHJlZml4LFxuICBhczogQ29tcG9uZW50ID0gQW5jaG9yLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYWxlcnQtbGluaycpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5BbGVydExpbmsuZGlzcGxheU5hbWUgPSAnQWxlcnRMaW5rJztcbmV4cG9ydCBkZWZhdWx0IEFsZXJ0TGluazsiLCJpbXBvcnQgQW5jaG9yIGZyb20gJ0ByZXN0YXJ0L3VpL0FuY2hvcic7XG5leHBvcnQgZGVmYXVsdCBBbmNob3I7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBCYWRnZSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGJzUHJlZml4LFxuICBiZyA9ICdwcmltYXJ5JyxcbiAgcGlsbCA9IGZhbHNlLFxuICB0ZXh0LFxuICBjbGFzc05hbWUsXG4gIGFzOiBDb21wb25lbnQgPSAnc3BhbicsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgY29uc3QgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYmFkZ2UnKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgIHJlZjogcmVmLFxuICAgIC4uLnByb3BzLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIHByZWZpeCwgcGlsbCAmJiBgcm91bmRlZC1waWxsYCwgdGV4dCAmJiBgdGV4dC0ke3RleHR9YCwgYmcgJiYgYGJnLSR7Ymd9YClcbiAgfSk7XG59KTtcbkJhZGdlLmRpc3BsYXlOYW1lID0gJ0JhZGdlJztcbmV4cG9ydCBkZWZhdWx0IEJhZGdlOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgQnJlYWRjcnVtYkl0ZW0gZnJvbSAnLi9CcmVhZGNydW1iSXRlbSc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgQnJlYWRjcnVtYiA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGJzUHJlZml4LFxuICBjbGFzc05hbWUsXG4gIGxpc3RQcm9wcyA9IHt9LFxuICBjaGlsZHJlbixcbiAgbGFiZWwgPSAnYnJlYWRjcnVtYicsXG4gIC8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbiAgYXM6IENvbXBvbmVudCA9ICduYXYnLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGNvbnN0IHByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2JyZWFkY3J1bWInKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgIFwiYXJpYS1sYWJlbFwiOiBsYWJlbCxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICByZWY6IHJlZixcbiAgICAuLi5wcm9wcyxcbiAgICBjaGlsZHJlbjogLyojX19QVVJFX18qL19qc3goXCJvbFwiLCB7XG4gICAgICAuLi5saXN0UHJvcHMsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMocHJlZml4LCBsaXN0UHJvcHMgPT0gbnVsbCA/IHZvaWQgMCA6IGxpc3RQcm9wcy5jbGFzc05hbWUpLFxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgfSlcbiAgfSk7XG59KTtcbkJyZWFkY3J1bWIuZGlzcGxheU5hbWUgPSAnQnJlYWRjcnVtYic7XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEJyZWFkY3J1bWIsIHtcbiAgSXRlbTogQnJlYWRjcnVtYkl0ZW1cbn0pOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBBbmNob3IgZnJvbSAnQHJlc3RhcnQvdWkvQW5jaG9yJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgQnJlYWRjcnVtYkl0ZW0gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgYWN0aXZlID0gZmFsc2UsXG4gIGNoaWxkcmVuLFxuICBjbGFzc05hbWUsXG4gIC8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbiAgYXM6IENvbXBvbmVudCA9ICdsaScsXG4gIGxpbmtBczogTGlua0NvbXBvbmVudCA9IEFuY2hvcixcbiAgbGlua1Byb3BzID0ge30sXG4gIGhyZWYsXG4gIHRpdGxlLFxuICB0YXJnZXQsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgY29uc3QgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYnJlYWRjcnVtYi1pdGVtJyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICAuLi5wcm9wcyxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMocHJlZml4LCBjbGFzc05hbWUsIHtcbiAgICAgIGFjdGl2ZVxuICAgIH0pLFxuICAgIFwiYXJpYS1jdXJyZW50XCI6IGFjdGl2ZSA/ICdwYWdlJyA6IHVuZGVmaW5lZCxcbiAgICBjaGlsZHJlbjogYWN0aXZlID8gY2hpbGRyZW4gOiAvKiNfX1BVUkVfXyovX2pzeChMaW5rQ29tcG9uZW50LCB7XG4gICAgICAuLi5saW5rUHJvcHMsXG4gICAgICBocmVmOiBocmVmLFxuICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICB9KVxuICB9KTtcbn0pO1xuQnJlYWRjcnVtYkl0ZW0uZGlzcGxheU5hbWUgPSAnQnJlYWRjcnVtYkl0ZW0nO1xuZXhwb3J0IGRlZmF1bHQgQnJlYWRjcnVtYkl0ZW07IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQnV0dG9uUHJvcHMgfSBmcm9tICdAcmVzdGFydC91aS9CdXR0b24nO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBCdXR0b24gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBhcyxcbiAgYnNQcmVmaXgsXG4gIHZhcmlhbnQgPSAncHJpbWFyeScsXG4gIHNpemUsXG4gIGFjdGl2ZSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBjbGFzc05hbWUsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgY29uc3QgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYnRuJyk7XG4gIGNvbnN0IFtidXR0b25Qcm9wcywge1xuICAgIHRhZ05hbWVcbiAgfV0gPSB1c2VCdXR0b25Qcm9wcyh7XG4gICAgdGFnTmFtZTogYXMsXG4gICAgZGlzYWJsZWQsXG4gICAgLi4ucHJvcHNcbiAgfSk7XG4gIGNvbnN0IENvbXBvbmVudCA9IHRhZ05hbWU7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICAuLi5idXR0b25Qcm9wcyxcbiAgICAuLi5wcm9wcyxcbiAgICByZWY6IHJlZixcbiAgICBkaXNhYmxlZDogZGlzYWJsZWQsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgcHJlZml4LCBhY3RpdmUgJiYgJ2FjdGl2ZScsIHZhcmlhbnQgJiYgYCR7cHJlZml4fS0ke3ZhcmlhbnR9YCwgc2l6ZSAmJiBgJHtwcmVmaXh9LSR7c2l6ZX1gLCBwcm9wcy5ocmVmICYmIGRpc2FibGVkICYmICdkaXNhYmxlZCcpXG4gIH0pO1xufSk7XG5CdXR0b24uZGlzcGxheU5hbWUgPSAnQnV0dG9uJztcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IEJ1dHRvbkdyb3VwID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIHNpemUsXG4gIHZlcnRpY2FsID0gZmFsc2UsXG4gIGNsYXNzTmFtZSxcbiAgcm9sZSA9ICdncm91cCcsXG4gIC8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAuLi5yZXN0XG59LCByZWYpID0+IHtcbiAgY29uc3QgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYnRuLWdyb3VwJyk7XG4gIGxldCBiYXNlQ2xhc3MgPSBwcmVmaXg7XG4gIGlmICh2ZXJ0aWNhbCkgYmFzZUNsYXNzID0gYCR7cHJlZml4fS12ZXJ0aWNhbGA7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICAuLi5yZXN0LFxuICAgIHJlZjogcmVmLFxuICAgIHJvbGU6IHJvbGUsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYmFzZUNsYXNzLCBzaXplICYmIGAke3ByZWZpeH0tJHtzaXplfWApXG4gIH0pO1xufSk7XG5CdXR0b25Hcm91cC5kaXNwbGF5TmFtZSA9ICdCdXR0b25Hcm91cCc7XG5leHBvcnQgZGVmYXVsdCBCdXR0b25Hcm91cDsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IEJ1dHRvblRvb2xiYXIgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgY2xhc3NOYW1lLFxuICByb2xlID0gJ3Rvb2xiYXInLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGNvbnN0IHByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2J0bi10b29sYmFyJyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChcImRpdlwiLCB7XG4gICAgLi4ucHJvcHMsXG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgcHJlZml4KSxcbiAgICByb2xlOiByb2xlXG4gIH0pO1xufSk7XG5CdXR0b25Ub29sYmFyLmRpc3BsYXlOYW1lID0gJ0J1dHRvblRvb2xiYXInO1xuZXhwb3J0IGRlZmF1bHQgQnV0dG9uVG9vbGJhcjsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IENhcmRCb2R5IGZyb20gJy4vQ2FyZEJvZHknO1xuaW1wb3J0IENhcmRGb290ZXIgZnJvbSAnLi9DYXJkRm9vdGVyJztcbmltcG9ydCBDYXJkSGVhZGVyIGZyb20gJy4vQ2FyZEhlYWRlcic7XG5pbXBvcnQgQ2FyZEltZyBmcm9tICcuL0NhcmRJbWcnO1xuaW1wb3J0IENhcmRJbWdPdmVybGF5IGZyb20gJy4vQ2FyZEltZ092ZXJsYXknO1xuaW1wb3J0IENhcmRMaW5rIGZyb20gJy4vQ2FyZExpbmsnO1xuaW1wb3J0IENhcmRTdWJ0aXRsZSBmcm9tICcuL0NhcmRTdWJ0aXRsZSc7XG5pbXBvcnQgQ2FyZFRleHQgZnJvbSAnLi9DYXJkVGV4dCc7XG5pbXBvcnQgQ2FyZFRpdGxlIGZyb20gJy4vQ2FyZFRpdGxlJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBDYXJkID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIGNsYXNzTmFtZSxcbiAgYmcsXG4gIHRleHQsXG4gIGJvcmRlcixcbiAgYm9keSA9IGZhbHNlLFxuICBjaGlsZHJlbixcbiAgLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuICBhczogQ29tcG9uZW50ID0gJ2RpdicsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgY29uc3QgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnY2FyZCcpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgLi4ucHJvcHMsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgcHJlZml4LCBiZyAmJiBgYmctJHtiZ31gLCB0ZXh0ICYmIGB0ZXh0LSR7dGV4dH1gLCBib3JkZXIgJiYgYGJvcmRlci0ke2JvcmRlcn1gKSxcbiAgICBjaGlsZHJlbjogYm9keSA/IC8qI19fUFVSRV9fKi9fanN4KENhcmRCb2R5LCB7XG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICB9KSA6IGNoaWxkcmVuXG4gIH0pO1xufSk7XG5DYXJkLmRpc3BsYXlOYW1lID0gJ0NhcmQnO1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihDYXJkLCB7XG4gIEltZzogQ2FyZEltZyxcbiAgVGl0bGU6IENhcmRUaXRsZSxcbiAgU3VidGl0bGU6IENhcmRTdWJ0aXRsZSxcbiAgQm9keTogQ2FyZEJvZHksXG4gIExpbms6IENhcmRMaW5rLFxuICBUZXh0OiBDYXJkVGV4dCxcbiAgSGVhZGVyOiBDYXJkSGVhZGVyLFxuICBGb290ZXI6IENhcmRGb290ZXIsXG4gIEltZ092ZXJsYXk6IENhcmRJbWdPdmVybGF5XG59KTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IENhcmRCb2R5ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBic1ByZWZpeCxcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnY2FyZC1ib2R5Jyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCksXG4gICAgLi4ucHJvcHNcbiAgfSk7XG59KTtcbkNhcmRCb2R5LmRpc3BsYXlOYW1lID0gJ0NhcmRCb2R5JztcbmV4cG9ydCBkZWZhdWx0IENhcmRCb2R5OyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgQ2FyZEZvb3RlciA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGNsYXNzTmFtZSxcbiAgYnNQcmVmaXgsXG4gIGFzOiBDb21wb25lbnQgPSAnZGl2JyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2NhcmQtZm9vdGVyJyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCksXG4gICAgLi4ucHJvcHNcbiAgfSk7XG59KTtcbkNhcmRGb290ZXIuZGlzcGxheU5hbWUgPSAnQ2FyZEZvb3Rlcic7XG5leHBvcnQgZGVmYXVsdCBDYXJkRm9vdGVyOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgQ2FyZEdyb3VwID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBic1ByZWZpeCxcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnY2FyZC1ncm91cCcpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5DYXJkR3JvdXAuZGlzcGxheU5hbWUgPSAnQ2FyZEdyb3VwJztcbmV4cG9ydCBkZWZhdWx0IENhcmRHcm91cDsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCBDYXJkSGVhZGVyQ29udGV4dCBmcm9tICcuL0NhcmRIZWFkZXJDb250ZXh0JztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBDYXJkSGVhZGVyID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIGNsYXNzTmFtZSxcbiAgLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuICBhczogQ29tcG9uZW50ID0gJ2RpdicsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgY29uc3QgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnY2FyZC1oZWFkZXInKTtcbiAgY29uc3QgY29udGV4dFZhbHVlID0gdXNlTWVtbygoKSA9PiAoe1xuICAgIGNhcmRIZWFkZXJCc1ByZWZpeDogcHJlZml4XG4gIH0pLCBbcHJlZml4XSk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDYXJkSGVhZGVyQ29udGV4dC5Qcm92aWRlciwge1xuICAgIHZhbHVlOiBjb250ZXh0VmFsdWUsXG4gICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgICAgcmVmOiByZWYsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIHByZWZpeClcbiAgICB9KVxuICB9KTtcbn0pO1xuQ2FyZEhlYWRlci5kaXNwbGF5TmFtZSA9ICdDYXJkSGVhZGVyJztcbmV4cG9ydCBkZWZhdWx0IENhcmRIZWFkZXI7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IGNvbnRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlQ29udGV4dChudWxsKTtcbmNvbnRleHQuZGlzcGxheU5hbWUgPSAnQ2FyZEhlYWRlckNvbnRleHQnO1xuZXhwb3J0IGRlZmF1bHQgY29udGV4dDsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IENhcmRJbWcgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihcbi8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbih7XG4gIGJzUHJlZml4LFxuICBjbGFzc05hbWUsXG4gIHZhcmlhbnQsXG4gIGFzOiBDb21wb25lbnQgPSAnaW1nJyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBjb25zdCBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdjYXJkLWltZycpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKHZhcmlhbnQgPyBgJHtwcmVmaXh9LSR7dmFyaWFudH1gIDogcHJlZml4LCBjbGFzc05hbWUpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5DYXJkSW1nLmRpc3BsYXlOYW1lID0gJ0NhcmRJbWcnO1xuZXhwb3J0IGRlZmF1bHQgQ2FyZEltZzsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IENhcmRJbWdPdmVybGF5ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBic1ByZWZpeCxcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnY2FyZC1pbWctb3ZlcmxheScpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5DYXJkSW1nT3ZlcmxheS5kaXNwbGF5TmFtZSA9ICdDYXJkSW1nT3ZlcmxheSc7XG5leHBvcnQgZGVmYXVsdCBDYXJkSW1nT3ZlcmxheTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IENhcmRMaW5rID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBic1ByZWZpeCxcbiAgYXM6IENvbXBvbmVudCA9ICdhJyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2NhcmQtbGluaycpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5DYXJkTGluay5kaXNwbGF5TmFtZSA9ICdDYXJkTGluayc7XG5leHBvcnQgZGVmYXVsdCBDYXJkTGluazsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IGRpdldpdGhDbGFzc05hbWUgZnJvbSAnLi9kaXZXaXRoQ2xhc3NOYW1lJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBEaXZTdHlsZWRBc0g2ID0gZGl2V2l0aENsYXNzTmFtZSgnaDYnKTtcbmNvbnN0IENhcmRTdWJ0aXRsZSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGNsYXNzTmFtZSxcbiAgYnNQcmVmaXgsXG4gIGFzOiBDb21wb25lbnQgPSBEaXZTdHlsZWRBc0g2LFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnY2FyZC1zdWJ0aXRsZScpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5DYXJkU3VidGl0bGUuZGlzcGxheU5hbWUgPSAnQ2FyZFN1YnRpdGxlJztcbmV4cG9ydCBkZWZhdWx0IENhcmRTdWJ0aXRsZTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IENhcmRUZXh0ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBic1ByZWZpeCxcbiAgYXM6IENvbXBvbmVudCA9ICdwJyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2NhcmQtdGV4dCcpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5DYXJkVGV4dC5kaXNwbGF5TmFtZSA9ICdDYXJkVGV4dCc7XG5leHBvcnQgZGVmYXVsdCBDYXJkVGV4dDsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IGRpdldpdGhDbGFzc05hbWUgZnJvbSAnLi9kaXZXaXRoQ2xhc3NOYW1lJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBEaXZTdHlsZWRBc0g1ID0gZGl2V2l0aENsYXNzTmFtZSgnaDUnKTtcbmNvbnN0IENhcmRUaXRsZSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGNsYXNzTmFtZSxcbiAgYnNQcmVmaXgsXG4gIGFzOiBDb21wb25lbnQgPSBEaXZTdHlsZWRBc0g1LFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnY2FyZC10aXRsZScpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5DYXJkVGl0bGUuZGlzcGxheU5hbWUgPSAnQ2FyZFRpdGxlJztcbmV4cG9ydCBkZWZhdWx0IENhcmRUaXRsZTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgdXNlVXBkYXRlRWZmZWN0IGZyb20gJ0ByZXN0YXJ0L2hvb2tzL3VzZVVwZGF0ZUVmZmVjdCc7XG5pbXBvcnQgdXNlQ29tbWl0dGVkUmVmIGZyb20gJ0ByZXN0YXJ0L2hvb2tzL3VzZUNvbW1pdHRlZFJlZic7XG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICdAcmVzdGFydC9ob29rcy91c2VUaW1lb3V0JztcbmltcG9ydCBBbmNob3IgZnJvbSAnQHJlc3RhcnQvdWkvQW5jaG9yJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlSW1wZXJhdGl2ZUhhbmRsZSwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVVuY29udHJvbGxlZCB9IGZyb20gJ3VuY29udHJvbGxhYmxlJztcbmltcG9ydCBDYXJvdXNlbENhcHRpb24gZnJvbSAnLi9DYXJvdXNlbENhcHRpb24nO1xuaW1wb3J0IENhcm91c2VsSXRlbSBmcm9tICcuL0Nhcm91c2VsSXRlbSc7XG5pbXBvcnQgeyBtYXAsIGZvckVhY2ggfSBmcm9tICcuL0VsZW1lbnRDaGlsZHJlbic7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXgsIHVzZUlzUlRMIH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB0cmFuc2l0aW9uRW5kTGlzdGVuZXIgZnJvbSAnLi90cmFuc2l0aW9uRW5kTGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJCcm93c2VyUmVmbG93IGZyb20gJy4vdHJpZ2dlckJyb3dzZXJSZWZsb3cnO1xuaW1wb3J0IFRyYW5zaXRpb25XcmFwcGVyIGZyb20gJy4vVHJhbnNpdGlvbldyYXBwZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IEZyYWdtZW50IGFzIF9GcmFnbWVudCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgU1dJUEVfVEhSRVNIT0xEID0gNDA7XG5mdW5jdGlvbiBpc1Zpc2libGUoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQuc3R5bGUgfHwgIWVsZW1lbnQucGFyZW50Tm9kZSB8fCAhZWxlbWVudC5wYXJlbnROb2RlLnN0eWxlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGVsZW1lbnRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gIHJldHVybiBlbGVtZW50U3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnICYmIGVsZW1lbnRTdHlsZS52aXNpYmlsaXR5ICE9PSAnaGlkZGVuJyAmJiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQucGFyZW50Tm9kZSkuZGlzcGxheSAhPT0gJ25vbmUnO1xufVxuY29uc3QgQ2Fyb3VzZWwgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBkZWZhdWx0QWN0aXZlSW5kZXggPSAwLFxuICAuLi51bmNvbnRyb2xsZWRQcm9wc1xufSwgcmVmKSA9PiB7XG4gIGNvbnN0IHtcbiAgICAvLyBOZWVkIHRvIGRlZmluZSB0aGUgZGVmYXVsdCBcImFzXCIgZHVyaW5nIHByb3AgZGVzdHJ1Y3R1cmluZyB0byBiZSBjb21wYXRpYmxlIHdpdGggc3R5bGVkLWNvbXBvbmVudHMgZ2l0aHViLmNvbS9yZWFjdC1ib290c3RyYXAvcmVhY3QtYm9vdHN0cmFwL2lzc3Vlcy8zNTk1XG4gICAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAgIGJzUHJlZml4LFxuICAgIHNsaWRlID0gdHJ1ZSxcbiAgICBmYWRlID0gZmFsc2UsXG4gICAgY29udHJvbHMgPSB0cnVlLFxuICAgIGluZGljYXRvcnMgPSB0cnVlLFxuICAgIGluZGljYXRvckxhYmVscyA9IFtdLFxuICAgIGFjdGl2ZUluZGV4LFxuICAgIG9uU2VsZWN0LFxuICAgIG9uU2xpZGUsXG4gICAgb25TbGlkLFxuICAgIGludGVydmFsID0gNTAwMCxcbiAgICBrZXlib2FyZCA9IHRydWUsXG4gICAgb25LZXlEb3duLFxuICAgIHBhdXNlID0gJ2hvdmVyJyxcbiAgICBvbk1vdXNlT3ZlcixcbiAgICBvbk1vdXNlT3V0LFxuICAgIHdyYXAgPSB0cnVlLFxuICAgIHRvdWNoID0gdHJ1ZSxcbiAgICBvblRvdWNoU3RhcnQsXG4gICAgb25Ub3VjaE1vdmUsXG4gICAgb25Ub3VjaEVuZCxcbiAgICBwcmV2SWNvbiA9IC8qI19fUFVSRV9fKi9fanN4KFwic3BhblwiLCB7XG4gICAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgICAgY2xhc3NOYW1lOiBcImNhcm91c2VsLWNvbnRyb2wtcHJldi1pY29uXCJcbiAgICB9KSxcbiAgICBwcmV2TGFiZWwgPSAnUHJldmlvdXMnLFxuICAgIG5leHRJY29uID0gLyojX19QVVJFX18qL19qc3goXCJzcGFuXCIsIHtcbiAgICAgIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsXG4gICAgICBjbGFzc05hbWU6IFwiY2Fyb3VzZWwtY29udHJvbC1uZXh0LWljb25cIlxuICAgIH0pLFxuICAgIG5leHRMYWJlbCA9ICdOZXh0JyxcbiAgICB2YXJpYW50LFxuICAgIGNsYXNzTmFtZSxcbiAgICBjaGlsZHJlbixcbiAgICAuLi5wcm9wc1xuICB9ID0gdXNlVW5jb250cm9sbGVkKHtcbiAgICBkZWZhdWx0QWN0aXZlSW5kZXgsXG4gICAgLi4udW5jb250cm9sbGVkUHJvcHNcbiAgfSwge1xuICAgIGFjdGl2ZUluZGV4OiAnb25TZWxlY3QnXG4gIH0pO1xuICBjb25zdCBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdjYXJvdXNlbCcpO1xuICBjb25zdCBpc1JUTCA9IHVzZUlzUlRMKCk7XG4gIGNvbnN0IG5leHREaXJlY3Rpb25SZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IFtkaXJlY3Rpb24sIHNldERpcmVjdGlvbl0gPSB1c2VTdGF0ZSgnbmV4dCcpO1xuICBjb25zdCBbcGF1c2VkLCBzZXRQYXVzZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNTbGlkaW5nLCBzZXRJc1NsaWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcmVuZGVyZWRBY3RpdmVJbmRleCwgc2V0UmVuZGVyZWRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZShhY3RpdmVJbmRleCB8fCAwKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzU2xpZGluZyAmJiBhY3RpdmVJbmRleCAhPT0gcmVuZGVyZWRBY3RpdmVJbmRleCkge1xuICAgICAgaWYgKG5leHREaXJlY3Rpb25SZWYuY3VycmVudCkge1xuICAgICAgICBzZXREaXJlY3Rpb24obmV4dERpcmVjdGlvblJlZi5jdXJyZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldERpcmVjdGlvbigoYWN0aXZlSW5kZXggfHwgMCkgPiByZW5kZXJlZEFjdGl2ZUluZGV4ID8gJ25leHQnIDogJ3ByZXYnKTtcbiAgICAgIH1cbiAgICAgIGlmIChzbGlkZSkge1xuICAgICAgICBzZXRJc1NsaWRpbmcodHJ1ZSk7XG4gICAgICB9XG4gICAgICBzZXRSZW5kZXJlZEFjdGl2ZUluZGV4KGFjdGl2ZUluZGV4IHx8IDApO1xuICAgIH1cbiAgfSwgW2FjdGl2ZUluZGV4LCBpc1NsaWRpbmcsIHJlbmRlcmVkQWN0aXZlSW5kZXgsIHNsaWRlXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG5leHREaXJlY3Rpb25SZWYuY3VycmVudCkge1xuICAgICAgbmV4dERpcmVjdGlvblJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gIH0pO1xuICBsZXQgbnVtQ2hpbGRyZW4gPSAwO1xuICBsZXQgYWN0aXZlQ2hpbGRJbnRlcnZhbDtcblxuICAvLyBJdGVyYXRlIHRvIGdyYWIgYWxsIG9mIHRoZSBjaGlsZHJlbidzIGludGVydmFsIHZhbHVlc1xuICAvLyAoYW5kIGNvdW50IHRoZW0sIHRvbylcbiAgZm9yRWFjaChjaGlsZHJlbiwgKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICsrbnVtQ2hpbGRyZW47XG4gICAgaWYgKGluZGV4ID09PSBhY3RpdmVJbmRleCkge1xuICAgICAgYWN0aXZlQ2hpbGRJbnRlcnZhbCA9IGNoaWxkLnByb3BzLmludGVydmFsO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGFjdGl2ZUNoaWxkSW50ZXJ2YWxSZWYgPSB1c2VDb21taXR0ZWRSZWYoYWN0aXZlQ2hpbGRJbnRlcnZhbCk7XG4gIGNvbnN0IHByZXYgPSB1c2VDYWxsYmFjayhldmVudCA9PiB7XG4gICAgaWYgKGlzU2xpZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgbmV4dEFjdGl2ZUluZGV4ID0gcmVuZGVyZWRBY3RpdmVJbmRleCAtIDE7XG4gICAgaWYgKG5leHRBY3RpdmVJbmRleCA8IDApIHtcbiAgICAgIGlmICghd3JhcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuZXh0QWN0aXZlSW5kZXggPSBudW1DaGlsZHJlbiAtIDE7XG4gICAgfVxuICAgIG5leHREaXJlY3Rpb25SZWYuY3VycmVudCA9ICdwcmV2JztcbiAgICBvblNlbGVjdCA9PSBudWxsIHx8IG9uU2VsZWN0KG5leHRBY3RpdmVJbmRleCwgZXZlbnQpO1xuICB9LCBbaXNTbGlkaW5nLCByZW5kZXJlZEFjdGl2ZUluZGV4LCBvblNlbGVjdCwgd3JhcCwgbnVtQ2hpbGRyZW5dKTtcblxuICAvLyBUaGlzIGlzIHVzZWQgaW4gdGhlIHNldEludGVydmFsLCBzbyBpdCBzaG91bGQgbm90IGludmFsaWRhdGUuXG4gIGNvbnN0IG5leHQgPSB1c2VFdmVudENhbGxiYWNrKGV2ZW50ID0+IHtcbiAgICBpZiAoaXNTbGlkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBuZXh0QWN0aXZlSW5kZXggPSByZW5kZXJlZEFjdGl2ZUluZGV4ICsgMTtcbiAgICBpZiAobmV4dEFjdGl2ZUluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICBpZiAoIXdyYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbmV4dEFjdGl2ZUluZGV4ID0gMDtcbiAgICB9XG4gICAgbmV4dERpcmVjdGlvblJlZi5jdXJyZW50ID0gJ25leHQnO1xuICAgIG9uU2VsZWN0ID09IG51bGwgfHwgb25TZWxlY3QobmV4dEFjdGl2ZUluZGV4LCBldmVudCk7XG4gIH0pO1xuICBjb25zdCBlbGVtZW50UmVmID0gdXNlUmVmKCk7XG4gIHVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCAoKSA9PiAoe1xuICAgIGVsZW1lbnQ6IGVsZW1lbnRSZWYuY3VycmVudCxcbiAgICBwcmV2LFxuICAgIG5leHRcbiAgfSkpO1xuXG4gIC8vIFRoaXMgaXMgdXNlZCBpbiB0aGUgc2V0SW50ZXJ2YWwsIHNvIGl0IHNob3VsZCBub3QgaW52YWxpZGF0ZS5cbiAgY29uc3QgbmV4dFdoZW5WaXNpYmxlID0gdXNlRXZlbnRDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFkb2N1bWVudC5oaWRkZW4gJiYgaXNWaXNpYmxlKGVsZW1lbnRSZWYuY3VycmVudCkpIHtcbiAgICAgIGlmIChpc1JUTCkge1xuICAgICAgICBwcmV2KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgY29uc3Qgc2xpZGVEaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09ICduZXh0JyA/ICdzdGFydCcgOiAnZW5kJztcbiAgdXNlVXBkYXRlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc2xpZGUpIHtcbiAgICAgIC8vIFRoZXNlIGNhbGxiYWNrcyB3aWxsIGJlIGhhbmRsZWQgYnkgdGhlIDxUcmFuc2l0aW9uPiBjYWxsYmFja3MuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uU2xpZGUgPT0gbnVsbCB8fCBvblNsaWRlKHJlbmRlcmVkQWN0aXZlSW5kZXgsIHNsaWRlRGlyZWN0aW9uKTtcbiAgICBvblNsaWQgPT0gbnVsbCB8fCBvblNsaWQocmVuZGVyZWRBY3RpdmVJbmRleCwgc2xpZGVEaXJlY3Rpb24pO1xuICB9LCBbcmVuZGVyZWRBY3RpdmVJbmRleF0pO1xuICBjb25zdCBvcmRlckNsYXNzTmFtZSA9IGAke3ByZWZpeH0taXRlbS0ke2RpcmVjdGlvbn1gO1xuICBjb25zdCBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IGAke3ByZWZpeH0taXRlbS0ke3NsaWRlRGlyZWN0aW9ufWA7XG4gIGNvbnN0IGhhbmRsZUVudGVyID0gdXNlQ2FsbGJhY2sobm9kZSA9PiB7XG4gICAgdHJpZ2dlckJyb3dzZXJSZWZsb3cobm9kZSk7XG4gICAgb25TbGlkZSA9PSBudWxsIHx8IG9uU2xpZGUocmVuZGVyZWRBY3RpdmVJbmRleCwgc2xpZGVEaXJlY3Rpb24pO1xuICB9LCBbb25TbGlkZSwgcmVuZGVyZWRBY3RpdmVJbmRleCwgc2xpZGVEaXJlY3Rpb25dKTtcbiAgY29uc3QgaGFuZGxlRW50ZXJlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRJc1NsaWRpbmcoZmFsc2UpO1xuICAgIG9uU2xpZCA9PSBudWxsIHx8IG9uU2xpZChyZW5kZXJlZEFjdGl2ZUluZGV4LCBzbGlkZURpcmVjdGlvbik7XG4gIH0sIFtvblNsaWQsIHJlbmRlcmVkQWN0aXZlSW5kZXgsIHNsaWRlRGlyZWN0aW9uXSk7XG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSB1c2VDYWxsYmFjayhldmVudCA9PiB7XG4gICAgaWYgKGtleWJvYXJkICYmICEvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSkge1xuICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmIChpc1JUTCkge1xuICAgICAgICAgICAgbmV4dChldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXYoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaWYgKGlzUlRMKSB7XG4gICAgICAgICAgICBwcmV2KGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dChldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9XG4gICAgb25LZXlEb3duID09IG51bGwgfHwgb25LZXlEb3duKGV2ZW50KTtcbiAgfSwgW2tleWJvYXJkLCBvbktleURvd24sIHByZXYsIG5leHQsIGlzUlRMXSk7XG4gIGNvbnN0IGhhbmRsZU1vdXNlT3ZlciA9IHVzZUNhbGxiYWNrKGV2ZW50ID0+IHtcbiAgICBpZiAocGF1c2UgPT09ICdob3ZlcicpIHtcbiAgICAgIHNldFBhdXNlZCh0cnVlKTtcbiAgICB9XG4gICAgb25Nb3VzZU92ZXIgPT0gbnVsbCB8fCBvbk1vdXNlT3ZlcihldmVudCk7XG4gIH0sIFtwYXVzZSwgb25Nb3VzZU92ZXJdKTtcbiAgY29uc3QgaGFuZGxlTW91c2VPdXQgPSB1c2VDYWxsYmFjayhldmVudCA9PiB7XG4gICAgc2V0UGF1c2VkKGZhbHNlKTtcbiAgICBvbk1vdXNlT3V0ID09IG51bGwgfHwgb25Nb3VzZU91dChldmVudCk7XG4gIH0sIFtvbk1vdXNlT3V0XSk7XG4gIGNvbnN0IHRvdWNoU3RhcnRYUmVmID0gdXNlUmVmKDApO1xuICBjb25zdCB0b3VjaERlbHRhWFJlZiA9IHVzZVJlZigwKTtcbiAgY29uc3QgdG91Y2hVbnBhdXNlVGltZW91dCA9IHVzZVRpbWVvdXQoKTtcbiAgY29uc3QgaGFuZGxlVG91Y2hTdGFydCA9IHVzZUNhbGxiYWNrKGV2ZW50ID0+IHtcbiAgICB0b3VjaFN0YXJ0WFJlZi5jdXJyZW50ID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYO1xuICAgIHRvdWNoRGVsdGFYUmVmLmN1cnJlbnQgPSAwO1xuICAgIGlmIChwYXVzZSA9PT0gJ2hvdmVyJykge1xuICAgICAgc2V0UGF1c2VkKHRydWUpO1xuICAgIH1cbiAgICBvblRvdWNoU3RhcnQgPT0gbnVsbCB8fCBvblRvdWNoU3RhcnQoZXZlbnQpO1xuICB9LCBbcGF1c2UsIG9uVG91Y2hTdGFydF0pO1xuICBjb25zdCBoYW5kbGVUb3VjaE1vdmUgPSB1c2VDYWxsYmFjayhldmVudCA9PiB7XG4gICAgaWYgKGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0b3VjaERlbHRhWFJlZi5jdXJyZW50ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdG91Y2hEZWx0YVhSZWYuY3VycmVudCA9IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCAtIHRvdWNoU3RhcnRYUmVmLmN1cnJlbnQ7XG4gICAgfVxuICAgIG9uVG91Y2hNb3ZlID09IG51bGwgfHwgb25Ub3VjaE1vdmUoZXZlbnQpO1xuICB9LCBbb25Ub3VjaE1vdmVdKTtcbiAgY29uc3QgaGFuZGxlVG91Y2hFbmQgPSB1c2VDYWxsYmFjayhldmVudCA9PiB7XG4gICAgaWYgKHRvdWNoKSB7XG4gICAgICBjb25zdCB0b3VjaERlbHRhWCA9IHRvdWNoRGVsdGFYUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoTWF0aC5hYnModG91Y2hEZWx0YVgpID4gU1dJUEVfVEhSRVNIT0xEKSB7XG4gICAgICAgIGlmICh0b3VjaERlbHRhWCA+IDApIHtcbiAgICAgICAgICBwcmV2KGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGF1c2UgPT09ICdob3ZlcicpIHtcbiAgICAgIHRvdWNoVW5wYXVzZVRpbWVvdXQuc2V0KCgpID0+IHtcbiAgICAgICAgc2V0UGF1c2VkKGZhbHNlKTtcbiAgICAgIH0sIGludGVydmFsIHx8IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIG9uVG91Y2hFbmQgPT0gbnVsbCB8fCBvblRvdWNoRW5kKGV2ZW50KTtcbiAgfSwgW3RvdWNoLCBwYXVzZSwgcHJldiwgbmV4dCwgdG91Y2hVbnBhdXNlVGltZW91dCwgaW50ZXJ2YWwsIG9uVG91Y2hFbmRdKTtcbiAgY29uc3Qgc2hvdWxkUGxheSA9IGludGVydmFsICE9IG51bGwgJiYgIXBhdXNlZCAmJiAhaXNTbGlkaW5nO1xuICBjb25zdCBpbnRlcnZhbEhhbmRsZVJlZiA9IHVzZVJlZigpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHZhciBfcmVmLCBfYWN0aXZlQ2hpbGRJbnRlcnZhbFI7XG4gICAgaWYgKCFzaG91bGRQbGF5KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBuZXh0RnVuYyA9IGlzUlRMID8gcHJldiA6IG5leHQ7XG4gICAgaW50ZXJ2YWxIYW5kbGVSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRJbnRlcnZhbChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPyBuZXh0V2hlblZpc2libGUgOiBuZXh0RnVuYywgKF9yZWYgPSAoX2FjdGl2ZUNoaWxkSW50ZXJ2YWxSID0gYWN0aXZlQ2hpbGRJbnRlcnZhbFJlZi5jdXJyZW50KSAhPSBudWxsID8gX2FjdGl2ZUNoaWxkSW50ZXJ2YWxSIDogaW50ZXJ2YWwpICE9IG51bGwgPyBfcmVmIDogdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGludGVydmFsSGFuZGxlUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbEhhbmRsZVJlZi5jdXJyZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbc2hvdWxkUGxheSwgcHJldiwgbmV4dCwgYWN0aXZlQ2hpbGRJbnRlcnZhbFJlZiwgaW50ZXJ2YWwsIG5leHRXaGVuVmlzaWJsZSwgaXNSVExdKTtcbiAgY29uc3QgaW5kaWNhdG9yT25DbGlja3MgPSB1c2VNZW1vKCgpID0+IGluZGljYXRvcnMgJiYgQXJyYXkuZnJvbSh7XG4gICAgbGVuZ3RoOiBudW1DaGlsZHJlblxuICB9LCAoXywgaW5kZXgpID0+IGV2ZW50ID0+IHtcbiAgICBvblNlbGVjdCA9PSBudWxsIHx8IG9uU2VsZWN0KGluZGV4LCBldmVudCk7XG4gIH0pLCBbaW5kaWNhdG9ycywgbnVtQ2hpbGRyZW4sIG9uU2VsZWN0XSk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeHMoQ29tcG9uZW50LCB7XG4gICAgcmVmOiBlbGVtZW50UmVmLFxuICAgIC4uLnByb3BzLFxuICAgIG9uS2V5RG93bjogaGFuZGxlS2V5RG93bixcbiAgICBvbk1vdXNlT3ZlcjogaGFuZGxlTW91c2VPdmVyLFxuICAgIG9uTW91c2VPdXQ6IGhhbmRsZU1vdXNlT3V0LFxuICAgIG9uVG91Y2hTdGFydDogaGFuZGxlVG91Y2hTdGFydCxcbiAgICBvblRvdWNoTW92ZTogaGFuZGxlVG91Y2hNb3ZlLFxuICAgIG9uVG91Y2hFbmQ6IGhhbmRsZVRvdWNoRW5kLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIHByZWZpeCwgc2xpZGUgJiYgJ3NsaWRlJywgZmFkZSAmJiBgJHtwcmVmaXh9LWZhZGVgLCB2YXJpYW50ICYmIGAke3ByZWZpeH0tJHt2YXJpYW50fWApLFxuICAgIGNoaWxkcmVuOiBbaW5kaWNhdG9ycyAmJiAvKiNfX1BVUkVfXyovX2pzeChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IGAke3ByZWZpeH0taW5kaWNhdG9yc2AsXG4gICAgICBjaGlsZHJlbjogbWFwKGNoaWxkcmVuLCAoXywgaW5kZXgpID0+IC8qI19fUFVSRV9fKi9fanN4KFwiYnV0dG9uXCIsIHtcbiAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgXCJkYXRhLWJzLXRhcmdldFwiOiBcIlwiIC8vIEJvb3RzdHJhcCByZXF1aXJlcyB0aGlzIGluIHRoZWlyIGNzcy5cbiAgICAgICAgLFxuICAgICAgICBcImFyaWEtbGFiZWxcIjogaW5kaWNhdG9yTGFiZWxzICE9IG51bGwgJiYgaW5kaWNhdG9yTGFiZWxzLmxlbmd0aCA/IGluZGljYXRvckxhYmVsc1tpbmRleF0gOiBgU2xpZGUgJHtpbmRleCArIDF9YCxcbiAgICAgICAgY2xhc3NOYW1lOiBpbmRleCA9PT0gcmVuZGVyZWRBY3RpdmVJbmRleCA/ICdhY3RpdmUnIDogdW5kZWZpbmVkLFxuICAgICAgICBvbkNsaWNrOiBpbmRpY2F0b3JPbkNsaWNrcyA/IGluZGljYXRvck9uQ2xpY2tzW2luZGV4XSA6IHVuZGVmaW5lZCxcbiAgICAgICAgXCJhcmlhLWN1cnJlbnRcIjogaW5kZXggPT09IHJlbmRlcmVkQWN0aXZlSW5kZXhcbiAgICAgIH0sIGluZGV4KSlcbiAgICB9KSwgLyojX19QVVJFX18qL19qc3goXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiBgJHtwcmVmaXh9LWlubmVyYCxcbiAgICAgIGNoaWxkcmVuOiBtYXAoY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpbmRleCA9PT0gcmVuZGVyZWRBY3RpdmVJbmRleDtcbiAgICAgICAgcmV0dXJuIHNsaWRlID8gLyojX19QVVJFX18qL19qc3goVHJhbnNpdGlvbldyYXBwZXIsIHtcbiAgICAgICAgICBpbjogaXNBY3RpdmUsXG4gICAgICAgICAgb25FbnRlcjogaXNBY3RpdmUgPyBoYW5kbGVFbnRlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBvbkVudGVyZWQ6IGlzQWN0aXZlID8gaGFuZGxlRW50ZXJlZCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBhZGRFbmRMaXN0ZW5lcjogdHJhbnNpdGlvbkVuZExpc3RlbmVyLFxuICAgICAgICAgIGNoaWxkcmVuOiAoc3RhdHVzLCBpbm5lclByb3BzKSA9PiAvKiNfX1BVUkVfXyovUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAuLi5pbm5lclByb3BzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNoaWxkLnByb3BzLmNsYXNzTmFtZSwgaXNBY3RpdmUgJiYgc3RhdHVzICE9PSAnZW50ZXJlZCcgJiYgb3JkZXJDbGFzc05hbWUsIChzdGF0dXMgPT09ICdlbnRlcmVkJyB8fCBzdGF0dXMgPT09ICdleGl0aW5nJykgJiYgJ2FjdGl2ZScsIChzdGF0dXMgPT09ICdlbnRlcmluZycgfHwgc3RhdHVzID09PSAnZXhpdGluZycpICYmIGRpcmVjdGlvbmFsQ2xhc3NOYW1lKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pIDogKCAvKiNfX1BVUkVfXyovUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNoaWxkLnByb3BzLmNsYXNzTmFtZSwgaXNBY3RpdmUgJiYgJ2FjdGl2ZScpXG4gICAgICAgIH0pKTtcbiAgICAgIH0pXG4gICAgfSksIGNvbnRyb2xzICYmIC8qI19fUFVSRV9fKi9fanN4cyhfRnJhZ21lbnQsIHtcbiAgICAgIGNoaWxkcmVuOiBbKHdyYXAgfHwgYWN0aXZlSW5kZXggIT09IDApICYmIC8qI19fUFVSRV9fKi9fanN4cyhBbmNob3IsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBgJHtwcmVmaXh9LWNvbnRyb2wtcHJldmAsXG4gICAgICAgIG9uQ2xpY2s6IHByZXYsXG4gICAgICAgIGNoaWxkcmVuOiBbcHJldkljb24sIHByZXZMYWJlbCAmJiAvKiNfX1BVUkVfXyovX2pzeChcInNwYW5cIiwge1xuICAgICAgICAgIGNsYXNzTmFtZTogXCJ2aXN1YWxseS1oaWRkZW5cIixcbiAgICAgICAgICBjaGlsZHJlbjogcHJldkxhYmVsXG4gICAgICAgIH0pXVxuICAgICAgfSksICh3cmFwIHx8IGFjdGl2ZUluZGV4ICE9PSBudW1DaGlsZHJlbiAtIDEpICYmIC8qI19fUFVSRV9fKi9fanN4cyhBbmNob3IsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBgJHtwcmVmaXh9LWNvbnRyb2wtbmV4dGAsXG4gICAgICAgIG9uQ2xpY2s6IG5leHQsXG4gICAgICAgIGNoaWxkcmVuOiBbbmV4dEljb24sIG5leHRMYWJlbCAmJiAvKiNfX1BVUkVfXyovX2pzeChcInNwYW5cIiwge1xuICAgICAgICAgIGNsYXNzTmFtZTogXCJ2aXN1YWxseS1oaWRkZW5cIixcbiAgICAgICAgICBjaGlsZHJlbjogbmV4dExhYmVsXG4gICAgICAgIH0pXVxuICAgICAgfSldXG4gICAgfSldXG4gIH0pO1xufSk7XG5DYXJvdXNlbC5kaXNwbGF5TmFtZSA9ICdDYXJvdXNlbCc7XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKENhcm91c2VsLCB7XG4gIENhcHRpb246IENhcm91c2VsQ2FwdGlvbixcbiAgSXRlbTogQ2Fyb3VzZWxJdGVtXG59KTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IENhcm91c2VsQ2FwdGlvbiA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGNsYXNzTmFtZSxcbiAgYnNQcmVmaXgsXG4gIGFzOiBDb21wb25lbnQgPSAnZGl2JyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2Nhcm91c2VsLWNhcHRpb24nKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgIHJlZjogcmVmLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4KSxcbiAgICAuLi5wcm9wc1xuICB9KTtcbn0pO1xuQ2Fyb3VzZWxDYXB0aW9uLmRpc3BsYXlOYW1lID0gJ0Nhcm91c2VsQ2FwdGlvbic7XG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbENhcHRpb247IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBDYXJvdXNlbEl0ZW0gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICAvLyBOZWVkIHRvIGRlZmluZSB0aGUgZGVmYXVsdCBcImFzXCIgZHVyaW5nIHByb3AgZGVzdHJ1Y3R1cmluZyB0byBiZSBjb21wYXRpYmxlIHdpdGggc3R5bGVkLWNvbXBvbmVudHMgZ2l0aHViLmNvbS9yZWFjdC1ib290c3RyYXAvcmVhY3QtYm9vdHN0cmFwL2lzc3Vlcy8zNTk1XG4gIGFzOiBDb21wb25lbnQgPSAnZGl2JyxcbiAgYnNQcmVmaXgsXG4gIGNsYXNzTmFtZSxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBjb25zdCBmaW5hbENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdjYXJvdXNlbC1pdGVtJykpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgLi4ucHJvcHMsXG4gICAgY2xhc3NOYW1lOiBmaW5hbENsYXNzTmFtZVxuICB9KTtcbn0pO1xuQ2Fyb3VzZWxJdGVtLmRpc3BsYXlOYW1lID0gJ0Nhcm91c2VsSXRlbSc7XG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbEl0ZW07IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQ29udGV4dCwgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBCYXNlRHJvcGRvd24gZnJvbSAnQHJlc3RhcnQvdWkvRHJvcGRvd24nO1xuaW1wb3J0IHsgdXNlVW5jb250cm9sbGVkIH0gZnJvbSAndW5jb250cm9sbGFibGUnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgRHJvcGRvd25Db250ZXh0IGZyb20gJy4vRHJvcGRvd25Db250ZXh0JztcbmltcG9ydCBEcm9wZG93bkRpdmlkZXIgZnJvbSAnLi9Ecm9wZG93bkRpdmlkZXInO1xuaW1wb3J0IERyb3Bkb3duSGVhZGVyIGZyb20gJy4vRHJvcGRvd25IZWFkZXInO1xuaW1wb3J0IERyb3Bkb3duSXRlbSBmcm9tICcuL0Ryb3Bkb3duSXRlbSc7XG5pbXBvcnQgRHJvcGRvd25JdGVtVGV4dCBmcm9tICcuL0Ryb3Bkb3duSXRlbVRleHQnO1xuaW1wb3J0IERyb3Bkb3duTWVudSwgeyBnZXREcm9wZG93bk1lbnVQbGFjZW1lbnQgfSBmcm9tICcuL0Ryb3Bkb3duTWVudSc7XG5pbXBvcnQgRHJvcGRvd25Ub2dnbGUgZnJvbSAnLi9Ecm9wZG93blRvZ2dsZSc7XG5pbXBvcnQgSW5wdXRHcm91cENvbnRleHQgZnJvbSAnLi9JbnB1dEdyb3VwQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXgsIHVzZUlzUlRMIH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IGFsaWduUHJvcFR5cGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBEcm9wZG93biA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKChwUHJvcHMsIHJlZikgPT4ge1xuICBjb25zdCB7XG4gICAgYnNQcmVmaXgsXG4gICAgZHJvcCA9ICdkb3duJyxcbiAgICBzaG93LFxuICAgIGNsYXNzTmFtZSxcbiAgICBhbGlnbiA9ICdzdGFydCcsXG4gICAgb25TZWxlY3QsXG4gICAgb25Ub2dnbGUsXG4gICAgZm9jdXNGaXJzdEl0ZW1PblNob3csXG4gICAgLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuICAgIGFzOiBDb21wb25lbnQgPSAnZGl2JyxcbiAgICBuYXZiYXI6IF80LFxuICAgIGF1dG9DbG9zZSA9IHRydWUsXG4gICAgLi4ucHJvcHNcbiAgfSA9IHVzZVVuY29udHJvbGxlZChwUHJvcHMsIHtcbiAgICBzaG93OiAnb25Ub2dnbGUnXG4gIH0pO1xuICBjb25zdCBpc0lucHV0R3JvdXAgPSB1c2VDb250ZXh0KElucHV0R3JvdXBDb250ZXh0KTtcbiAgY29uc3QgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnZHJvcGRvd24nKTtcbiAgY29uc3QgaXNSVEwgPSB1c2VJc1JUTCgpO1xuICBjb25zdCBpc0Nsb3NpbmdQZXJtaXR0ZWQgPSBzb3VyY2UgPT4ge1xuICAgIC8vIGF1dG9DbG9zZT1mYWxzZSBvbmx5IHBlcm1pdHMgY2xvc2Ugb24gYnV0dG9uIGNsaWNrXG4gICAgaWYgKGF1dG9DbG9zZSA9PT0gZmFsc2UpIHJldHVybiBzb3VyY2UgPT09ICdjbGljayc7XG5cbiAgICAvLyBhdXRvQ2xvc2U9aW5zaWRlIGRvZXNuJ3QgcGVybWl0IGNsb3NlIG9uIHJvb3RDbG9zZVxuICAgIGlmIChhdXRvQ2xvc2UgPT09ICdpbnNpZGUnKSByZXR1cm4gc291cmNlICE9PSAncm9vdENsb3NlJztcblxuICAgIC8vIGF1dG9DbG9zZT1vdXRzaWRlIGRvZXNuJ3QgcGVybWl0IGNsb3NlIG9uIHNlbGVjdFxuICAgIGlmIChhdXRvQ2xvc2UgPT09ICdvdXRzaWRlJykgcmV0dXJuIHNvdXJjZSAhPT0gJ3NlbGVjdCc7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIGNvbnN0IGhhbmRsZVRvZ2dsZSA9IHVzZUV2ZW50Q2FsbGJhY2soKG5leHRTaG93LCBtZXRhKSA9PiB7XG4gICAgdmFyIF9tZXRhJG9yaWdpbmFsRXZlbnQ7XG4gICAgLyoqIENoZWNraW5nIGlmIHRhcmdldCBvZiBldmVudCBpcyBUb2dnbGVCdXR0b24sXG4gICAgICogaWYgaXQgaXMgdGhlbiBudWxsaWZ5IG1vdXNlZG93biBldmVudFxuICAgICAqL1xuICAgIGNvbnN0IGlzVG9nZ2xlQnV0dG9uID0gKF9tZXRhJG9yaWdpbmFsRXZlbnQgPSBtZXRhLm9yaWdpbmFsRXZlbnQpID09IG51bGwgfHwgKF9tZXRhJG9yaWdpbmFsRXZlbnQgPSBfbWV0YSRvcmlnaW5hbEV2ZW50LnRhcmdldCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9tZXRhJG9yaWdpbmFsRXZlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi10b2dnbGUnKTtcbiAgICBpZiAoaXNUb2dnbGVCdXR0b24gJiYgbWV0YS5zb3VyY2UgPT09ICdtb3VzZWRvd24nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChtZXRhLm9yaWdpbmFsRXZlbnQuY3VycmVudFRhcmdldCA9PT0gZG9jdW1lbnQgJiYgKG1ldGEuc291cmNlICE9PSAna2V5ZG93bicgfHwgbWV0YS5vcmlnaW5hbEV2ZW50LmtleSA9PT0gJ0VzY2FwZScpKSBtZXRhLnNvdXJjZSA9ICdyb290Q2xvc2UnO1xuICAgIGlmIChpc0Nsb3NpbmdQZXJtaXR0ZWQobWV0YS5zb3VyY2UpKSBvblRvZ2dsZSA9PSBudWxsIHx8IG9uVG9nZ2xlKG5leHRTaG93LCBtZXRhKTtcbiAgfSk7XG4gIGNvbnN0IGFsaWduRW5kID0gYWxpZ24gPT09ICdlbmQnO1xuICBjb25zdCBwbGFjZW1lbnQgPSBnZXREcm9wZG93bk1lbnVQbGFjZW1lbnQoYWxpZ25FbmQsIGRyb3AsIGlzUlRMKTtcbiAgY29uc3QgY29udGV4dFZhbHVlID0gdXNlTWVtbygoKSA9PiAoe1xuICAgIGFsaWduLFxuICAgIGRyb3AsXG4gICAgaXNSVExcbiAgfSksIFthbGlnbiwgZHJvcCwgaXNSVExdKTtcbiAgY29uc3QgZGlyZWN0aW9uQ2xhc3NlcyA9IHtcbiAgICBkb3duOiBwcmVmaXgsXG4gICAgJ2Rvd24tY2VudGVyZWQnOiBgJHtwcmVmaXh9LWNlbnRlcmAsXG4gICAgdXA6ICdkcm9wdXAnLFxuICAgICd1cC1jZW50ZXJlZCc6ICdkcm9wdXAtY2VudGVyIGRyb3B1cCcsXG4gICAgZW5kOiAnZHJvcGVuZCcsXG4gICAgc3RhcnQ6ICdkcm9wc3RhcnQnXG4gIH07XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChEcm9wZG93bkNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZTogY29udGV4dFZhbHVlLFxuICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChCYXNlRHJvcGRvd24sIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgc2hvdzogc2hvdyxcbiAgICAgIG9uU2VsZWN0OiBvblNlbGVjdCxcbiAgICAgIG9uVG9nZ2xlOiBoYW5kbGVUb2dnbGUsXG4gICAgICBmb2N1c0ZpcnN0SXRlbU9uU2hvdzogZm9jdXNGaXJzdEl0ZW1PblNob3csXG4gICAgICBpdGVtU2VsZWN0b3I6IGAuJHtwcmVmaXh9LWl0ZW06bm90KC5kaXNhYmxlZCk6bm90KDpkaXNhYmxlZClgLFxuICAgICAgY2hpbGRyZW46IGlzSW5wdXRHcm91cCA/IHByb3BzLmNoaWxkcmVuIDogLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICByZWY6IHJlZixcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgc2hvdyAmJiAnc2hvdycsIGRpcmVjdGlvbkNsYXNzZXNbZHJvcF0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0pO1xufSk7XG5Ecm9wZG93bi5kaXNwbGF5TmFtZSA9ICdEcm9wZG93bic7XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKERyb3Bkb3duLCB7XG4gIFRvZ2dsZTogRHJvcGRvd25Ub2dnbGUsXG4gIE1lbnU6IERyb3Bkb3duTWVudSxcbiAgSXRlbTogRHJvcGRvd25JdGVtLFxuICBJdGVtVGV4dDogRHJvcGRvd25JdGVtVGV4dCxcbiAgRGl2aWRlcjogRHJvcGRvd25EaXZpZGVyLFxuICBIZWFkZXI6IERyb3Bkb3duSGVhZGVyXG59KTsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IERyb3Bkb3duIGZyb20gJy4vRHJvcGRvd24nO1xuaW1wb3J0IERyb3Bkb3duVG9nZ2xlIGZyb20gJy4vRHJvcGRvd25Ub2dnbGUnO1xuaW1wb3J0IERyb3Bkb3duTWVudSBmcm9tICcuL0Ryb3Bkb3duTWVudSc7XG5pbXBvcnQgeyBhbGlnblByb3BUeXBlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgcHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogQW4gaHRtbCBpZCBhdHRyaWJ1dGUgZm9yIHRoZSBUb2dnbGUgYnV0dG9uLCBuZWNlc3NhcnkgZm9yIGFzc2lzdGl2ZSB0ZWNobm9sb2dpZXMsIHN1Y2ggYXMgc2NyZWVuIHJlYWRlcnMuXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgLyoqIEFuIGBocmVmYCBwYXNzZWQgdG8gdGhlIFRvZ2dsZSBjb21wb25lbnQgKi9cbiAgaHJlZjogUHJvcFR5cGVzLnN0cmluZyxcbiAgLyoqIEFuIGBvbkNsaWNrYCBoYW5kbGVyIHBhc3NlZCB0byB0aGUgVG9nZ2xlIGNvbXBvbmVudCAqL1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgLyoqIFRoZSBjb250ZW50IG9mIHRoZSBub24tdG9nZ2xlIEJ1dHRvbi4gICovXG4gIHRpdGxlOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAvKiogRGlzYWJsZXMgYm90aCBCdXR0b25zICAqL1xuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIC8qKlxuICAgKiBBbGlnbnMgdGhlIGRyb3Bkb3duIG1lbnUuXG4gICAqXG4gICAqIF9zZWUgW0Ryb3Bkb3duTWVudV0oI2Ryb3Bkb3duLW1lbnUtcHJvcHMpIGZvciBtb3JlIGRldGFpbHNfXG4gICAqXG4gICAqIEB0eXBlIHtcInN0YXJ0XCJ8XCJlbmRcInx7IHNtOiBcInN0YXJ0XCJ8XCJlbmRcIiB9fHsgbWQ6IFwic3RhcnRcInxcImVuZFwiIH18eyBsZzogXCJzdGFydFwifFwiZW5kXCIgfXx7IHhsOiBcInN0YXJ0XCJ8XCJlbmRcIn18eyB4eGw6IFwic3RhcnRcInxcImVuZFwifSB9XG4gICAqL1xuICBhbGlnbjogYWxpZ25Qcm9wVHlwZSxcbiAgLyoqIEFuIEFSSUEgYWNjZXNzaWJsZSByb2xlIGFwcGxpZWQgdG8gdGhlIE1lbnUgY29tcG9uZW50LiBXaGVuIHNldCB0byAnbWVudScsIFRoZSBkcm9wZG93biAqL1xuICBtZW51Um9sZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgLyoqIFdoZXRoZXIgdG8gcmVuZGVyIHRoZSBkcm9wZG93biBtZW51IGluIHRoZSBET00gYmVmb3JlIHRoZSBmaXJzdCB0aW1lIGl0IGlzIHNob3duICovXG4gIHJlbmRlck1lbnVPbk1vdW50OiBQcm9wVHlwZXMuYm9vbCxcbiAgLyoqXG4gICAqICBXaGljaCBldmVudCB3aGVuIGZpcmVkIG91dHNpZGUgdGhlIGNvbXBvbmVudCB3aWxsIGNhdXNlIGl0IHRvIGJlIGNsb3NlZC5cbiAgICpcbiAgICogX3NlZSBbRHJvcGRvd25NZW51XSgjZHJvcGRvd24tbWVudS1wcm9wcykgZm9yIG1vcmUgZGV0YWlsc19cbiAgICovXG4gIHJvb3RDbG9zZUV2ZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAvKipcbiAgICogTWVudSBjb2xvciB2YXJpYW50LlxuICAgKlxuICAgKiBPbWl0dGluZyB0aGlzIHdpbGwgdXNlIHRoZSBkZWZhdWx0IGxpZ2h0IGNvbG9yLlxuICAgKi9cbiAgbWVudVZhcmlhbnQ6IFByb3BUeXBlcy5vbmVPZihbJ2RhcmsnXSksXG4gIC8qKlxuICAgKiBBbGxvdyBEcm9wZG93biB0byBmbGlwIGluIGNhc2Ugb2YgYW4gb3ZlcmxhcHBpbmcgb24gdGhlIHJlZmVyZW5jZSBlbGVtZW50LiBGb3IgbW9yZSBpbmZvcm1hdGlvbiByZWZlciB0b1xuICAgKiBQb3BwZXIuanMncyBmbGlwIFtkb2NzXShodHRwczovL3BvcHBlci5qcy5vcmcvZG9jcy92Mi9tb2RpZmllcnMvZmxpcC8pLlxuICAgKlxuICAgKi9cbiAgZmxpcDogUHJvcFR5cGVzLmJvb2wsXG4gIC8qKiBAaWdub3JlICovXG4gIGJzUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAvKiogQGlnbm9yZSAqL1xuICB2YXJpYW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAvKiogQGlnbm9yZSAqL1xuICBzaXplOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG4vKipcbiAqIEEgY29udmVuaWVuY2UgY29tcG9uZW50IGZvciBzaW1wbGUgb3IgZ2VuZXJhbCB1c2UgZHJvcGRvd25zLiBSZW5kZXJzIGEgYEJ1dHRvbmAgdG9nZ2xlIGFuZCBhbGwgYGNoaWxkcmVuYFxuICogYXJlIHBhc3NlZCBkaXJlY3RseSB0byB0aGUgZGVmYXVsdCBgRHJvcGRvd24uTWVudWAuIFRoaXMgY29tcG9uZW50IGFjY2VwdHMgYWxsIG9mXG4gKiBbYERyb3Bkb3duYCdzIHByb3BzXSgjZHJvcGRvd24tcHJvcHMpLlxuICpcbiAqIF9BbGwgdW5rbm93biBwcm9wcyBhcmUgcGFzc2VkIHRocm91Z2ggdG8gdGhlIGBEcm9wZG93bmAgY29tcG9uZW50Ll8gT25seVxuICogdGhlIEJ1dHRvbiBgdmFyaWFudGAsIGBzaXplYCBhbmQgYGJzUHJlZml4YCBwcm9wcyBhcmUgcGFzc2VkIHRvIHRoZSB0b2dnbGUsXG4gKiBhbG9uZyB3aXRoIG1lbnUtcmVsYXRlZCBwcm9wcyBhcmUgcGFzc2VkIHRvIHRoZSBgRHJvcGRvd24uTWVudWBcbiAqL1xuY29uc3QgRHJvcGRvd25CdXR0b24gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICB0aXRsZSxcbiAgY2hpbGRyZW4sXG4gIGJzUHJlZml4LFxuICByb290Q2xvc2VFdmVudCxcbiAgdmFyaWFudCxcbiAgc2l6ZSxcbiAgbWVudVJvbGUsXG4gIHJlbmRlck1lbnVPbk1vdW50LFxuICBkaXNhYmxlZCxcbiAgaHJlZixcbiAgaWQsXG4gIG1lbnVWYXJpYW50LFxuICBmbGlwLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiAvKiNfX1BVUkVfXyovX2pzeHMoRHJvcGRvd24sIHtcbiAgcmVmOiByZWYsXG4gIC4uLnByb3BzLFxuICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi9fanN4KERyb3Bkb3duVG9nZ2xlLCB7XG4gICAgaWQ6IGlkLFxuICAgIGhyZWY6IGhyZWYsXG4gICAgc2l6ZTogc2l6ZSxcbiAgICB2YXJpYW50OiB2YXJpYW50LFxuICAgIGRpc2FibGVkOiBkaXNhYmxlZCxcbiAgICBjaGlsZEJzUHJlZml4OiBic1ByZWZpeCxcbiAgICBjaGlsZHJlbjogdGl0bGVcbiAgfSksIC8qI19fUFVSRV9fKi9fanN4KERyb3Bkb3duTWVudSwge1xuICAgIHJvbGU6IG1lbnVSb2xlLFxuICAgIHJlbmRlck9uTW91bnQ6IHJlbmRlck1lbnVPbk1vdW50LFxuICAgIHJvb3RDbG9zZUV2ZW50OiByb290Q2xvc2VFdmVudCxcbiAgICB2YXJpYW50OiBtZW51VmFyaWFudCxcbiAgICBmbGlwOiBmbGlwLFxuICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICB9KV1cbn0pKTtcbkRyb3Bkb3duQnV0dG9uLmRpc3BsYXlOYW1lID0gJ0Ryb3Bkb3duQnV0dG9uJztcbkRyb3Bkb3duQnV0dG9uLnByb3BUeXBlcyA9IHByb3BUeXBlcztcbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duQnV0dG9uOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5jb25zdCBEcm9wZG93bkNvbnRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlQ29udGV4dCh7fSk7XG5Ecm9wZG93bkNvbnRleHQuZGlzcGxheU5hbWUgPSAnRHJvcGRvd25Db250ZXh0JztcbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duQ29udGV4dDsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IERyb3Bkb3duRGl2aWRlciA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGNsYXNzTmFtZSxcbiAgYnNQcmVmaXgsXG4gIGFzOiBDb21wb25lbnQgPSAnaHInLFxuICByb2xlID0gJ3NlcGFyYXRvcicsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgYnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdkcm9wZG93bi1kaXZpZGVyJyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCksXG4gICAgcm9sZTogcm9sZSxcbiAgICAuLi5wcm9wc1xuICB9KTtcbn0pO1xuRHJvcGRvd25EaXZpZGVyLmRpc3BsYXlOYW1lID0gJ0Ryb3Bkb3duRGl2aWRlcic7XG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bkRpdmlkZXI7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBEcm9wZG93bkhlYWRlciA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGNsYXNzTmFtZSxcbiAgYnNQcmVmaXgsXG4gIGFzOiBDb21wb25lbnQgPSAnZGl2JyxcbiAgcm9sZSA9ICdoZWFkaW5nJyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2Ryb3Bkb3duLWhlYWRlcicpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIHJvbGU6IHJvbGUsXG4gICAgLi4ucHJvcHNcbiAgfSk7XG59KTtcbkRyb3Bkb3duSGVhZGVyLmRpc3BsYXlOYW1lID0gJ0Ryb3Bkb3duSGVhZGVyJztcbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duSGVhZGVyOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZURyb3Bkb3duSXRlbSB9IGZyb20gJ0ByZXN0YXJ0L3VpL0Ryb3Bkb3duSXRlbSc7XG5pbXBvcnQgQW5jaG9yIGZyb20gJ0ByZXN0YXJ0L3VpL0FuY2hvcic7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IERyb3Bkb3duSXRlbSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGJzUHJlZml4LFxuICBjbGFzc05hbWUsXG4gIGV2ZW50S2V5LFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBvbkNsaWNrLFxuICBhY3RpdmUsXG4gIGFzOiBDb21wb25lbnQgPSBBbmNob3IsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgY29uc3QgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnZHJvcGRvd24taXRlbScpO1xuICBjb25zdCBbZHJvcGRvd25JdGVtUHJvcHMsIG1ldGFdID0gdXNlRHJvcGRvd25JdGVtKHtcbiAgICBrZXk6IGV2ZW50S2V5LFxuICAgIGhyZWY6IHByb3BzLmhyZWYsXG4gICAgZGlzYWJsZWQsXG4gICAgb25DbGljayxcbiAgICBhY3RpdmVcbiAgfSk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICAuLi5wcm9wcyxcbiAgICAuLi5kcm9wZG93bkl0ZW1Qcm9wcyxcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBwcmVmaXgsIG1ldGEuaXNBY3RpdmUgJiYgJ2FjdGl2ZScsIGRpc2FibGVkICYmICdkaXNhYmxlZCcpXG4gIH0pO1xufSk7XG5Ecm9wZG93bkl0ZW0uZGlzcGxheU5hbWUgPSAnRHJvcGRvd25JdGVtJztcbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duSXRlbTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IERyb3Bkb3duSXRlbVRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBjbGFzc05hbWUsXG4gIGJzUHJlZml4LFxuICBhczogQ29tcG9uZW50ID0gJ3NwYW4nLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnZHJvcGRvd24taXRlbS10ZXh0Jyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCksXG4gICAgLi4ucHJvcHNcbiAgfSk7XG59KTtcbkRyb3Bkb3duSXRlbVRleHQuZGlzcGxheU5hbWUgPSAnRHJvcGRvd25JdGVtVGV4dCc7XG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bkl0ZW1UZXh0OyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VEcm9wZG93bk1lbnUgfSBmcm9tICdAcmVzdGFydC91aS9Ecm9wZG93bk1lbnUnO1xuaW1wb3J0IHVzZUlzb21vcnBoaWNFZmZlY3QgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlSXNvbW9ycGhpY0VmZmVjdCc7XG5pbXBvcnQgdXNlTWVyZ2VkUmVmcyBmcm9tICdAcmVzdGFydC9ob29rcy91c2VNZXJnZWRSZWZzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IERyb3Bkb3duQ29udGV4dCBmcm9tICcuL0Ryb3Bkb3duQ29udGV4dCc7XG5pbXBvcnQgSW5wdXRHcm91cENvbnRleHQgZnJvbSAnLi9JbnB1dEdyb3VwQ29udGV4dCc7XG5pbXBvcnQgTmF2YmFyQ29udGV4dCBmcm9tICcuL05hdmJhckNvbnRleHQnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB1c2VXcmFwcGVkUmVmV2l0aFdhcm5pbmcgZnJvbSAnLi91c2VXcmFwcGVkUmVmV2l0aFdhcm5pbmcnO1xuaW1wb3J0IHsgYWxpZ25Qcm9wVHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXREcm9wZG93bk1lbnVQbGFjZW1lbnQoYWxpZ25FbmQsIGRyb3BEaXJlY3Rpb24sIGlzUlRMKSB7XG4gIGNvbnN0IHRvcFN0YXJ0ID0gaXNSVEwgPyAndG9wLWVuZCcgOiAndG9wLXN0YXJ0JztcbiAgY29uc3QgdG9wRW5kID0gaXNSVEwgPyAndG9wLXN0YXJ0JyA6ICd0b3AtZW5kJztcbiAgY29uc3QgYm90dG9tU3RhcnQgPSBpc1JUTCA/ICdib3R0b20tZW5kJyA6ICdib3R0b20tc3RhcnQnO1xuICBjb25zdCBib3R0b21FbmQgPSBpc1JUTCA/ICdib3R0b20tc3RhcnQnIDogJ2JvdHRvbS1lbmQnO1xuICBjb25zdCBsZWZ0U3RhcnQgPSBpc1JUTCA/ICdyaWdodC1zdGFydCcgOiAnbGVmdC1zdGFydCc7XG4gIGNvbnN0IGxlZnRFbmQgPSBpc1JUTCA/ICdyaWdodC1lbmQnIDogJ2xlZnQtZW5kJztcbiAgY29uc3QgcmlnaHRTdGFydCA9IGlzUlRMID8gJ2xlZnQtc3RhcnQnIDogJ3JpZ2h0LXN0YXJ0JztcbiAgY29uc3QgcmlnaHRFbmQgPSBpc1JUTCA/ICdsZWZ0LWVuZCcgOiAncmlnaHQtZW5kJztcbiAgbGV0IHBsYWNlbWVudCA9IGFsaWduRW5kID8gYm90dG9tRW5kIDogYm90dG9tU3RhcnQ7XG4gIGlmIChkcm9wRGlyZWN0aW9uID09PSAndXAnKSBwbGFjZW1lbnQgPSBhbGlnbkVuZCA/IHRvcEVuZCA6IHRvcFN0YXJ0O2Vsc2UgaWYgKGRyb3BEaXJlY3Rpb24gPT09ICdlbmQnKSBwbGFjZW1lbnQgPSBhbGlnbkVuZCA/IHJpZ2h0RW5kIDogcmlnaHRTdGFydDtlbHNlIGlmIChkcm9wRGlyZWN0aW9uID09PSAnc3RhcnQnKSBwbGFjZW1lbnQgPSBhbGlnbkVuZCA/IGxlZnRFbmQgOiBsZWZ0U3RhcnQ7ZWxzZSBpZiAoZHJvcERpcmVjdGlvbiA9PT0gJ2Rvd24tY2VudGVyZWQnKSBwbGFjZW1lbnQgPSAnYm90dG9tJztlbHNlIGlmIChkcm9wRGlyZWN0aW9uID09PSAndXAtY2VudGVyZWQnKSBwbGFjZW1lbnQgPSAndG9wJztcbiAgcmV0dXJuIHBsYWNlbWVudDtcbn1cbmNvbnN0IERyb3Bkb3duTWVudSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGJzUHJlZml4LFxuICBjbGFzc05hbWUsXG4gIGFsaWduLFxuICByb290Q2xvc2VFdmVudCxcbiAgZmxpcCA9IHRydWUsXG4gIHNob3c6IHNob3dQcm9wcyxcbiAgcmVuZGVyT25Nb3VudCxcbiAgLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuICBhczogQ29tcG9uZW50ID0gJ2RpdicsXG4gIHBvcHBlckNvbmZpZyxcbiAgdmFyaWFudCxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBsZXQgYWxpZ25FbmQgPSBmYWxzZTtcbiAgY29uc3QgaXNOYXZiYXIgPSB1c2VDb250ZXh0KE5hdmJhckNvbnRleHQpO1xuICBjb25zdCBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdkcm9wZG93bi1tZW51Jyk7XG4gIGNvbnN0IHtcbiAgICBhbGlnbjogY29udGV4dEFsaWduLFxuICAgIGRyb3AsXG4gICAgaXNSVExcbiAgfSA9IHVzZUNvbnRleHQoRHJvcGRvd25Db250ZXh0KTtcbiAgYWxpZ24gPSBhbGlnbiB8fCBjb250ZXh0QWxpZ247XG4gIGNvbnN0IGlzSW5wdXRHcm91cCA9IHVzZUNvbnRleHQoSW5wdXRHcm91cENvbnRleHQpO1xuICBjb25zdCBhbGlnbkNsYXNzZXMgPSBbXTtcbiAgaWYgKGFsaWduKSB7XG4gICAgaWYgKHR5cGVvZiBhbGlnbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhbGlnbik7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGtleXMubGVuZ3RoID09PSAxLCAnVGhlcmUgc2hvdWxkIG9ubHkgYmUgMSBicmVha3BvaW50IHdoZW4gcGFzc2luZyBhbiBvYmplY3QgdG8gYGFsaWduYCcpIDogdm9pZCAwO1xuICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGJya1BvaW50ID0ga2V5c1swXTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gYWxpZ25bYnJrUG9pbnRdO1xuXG4gICAgICAgIC8vIC5kcm9wZG93bi1tZW51LWVuZCBpcyByZXF1aXJlZCBmb3IgcmVzcG9uc2l2ZWx5IGFsaWduaW5nXG4gICAgICAgIC8vIGxlZnQgaW4gYWRkaXRpb24gdG8gYWxpZ24gbGVmdCBjbGFzc2VzLlxuICAgICAgICBhbGlnbkVuZCA9IGRpcmVjdGlvbiA9PT0gJ3N0YXJ0JztcbiAgICAgICAgYWxpZ25DbGFzc2VzLnB1c2goYCR7cHJlZml4fS0ke2Jya1BvaW50fS0ke2RpcmVjdGlvbn1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFsaWduID09PSAnZW5kJykge1xuICAgICAgYWxpZ25FbmQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBjb25zdCBwbGFjZW1lbnQgPSBnZXREcm9wZG93bk1lbnVQbGFjZW1lbnQoYWxpZ25FbmQsIGRyb3AsIGlzUlRMKTtcbiAgY29uc3QgW21lbnVQcm9wcywge1xuICAgIGhhc1Nob3duLFxuICAgIHBvcHBlcixcbiAgICBzaG93LFxuICAgIHRvZ2dsZVxuICB9XSA9IHVzZURyb3Bkb3duTWVudSh7XG4gICAgZmxpcCxcbiAgICByb290Q2xvc2VFdmVudCxcbiAgICBzaG93OiBzaG93UHJvcHMsXG4gICAgdXNlUG9wcGVyOiAhaXNOYXZiYXIgJiYgYWxpZ25DbGFzc2VzLmxlbmd0aCA9PT0gMCxcbiAgICBvZmZzZXQ6IFswLCAyXSxcbiAgICBwb3BwZXJDb25maWcsXG4gICAgcGxhY2VtZW50XG4gIH0pO1xuICBtZW51UHJvcHMucmVmID0gdXNlTWVyZ2VkUmVmcyh1c2VXcmFwcGVkUmVmV2l0aFdhcm5pbmcocmVmLCAnRHJvcGRvd25NZW51JyksIG1lbnVQcm9wcy5yZWYpO1xuICB1c2VJc29tb3JwaGljRWZmZWN0KCgpID0+IHtcbiAgICAvLyBQb3BwZXIncyBpbml0aWFsIHBvc2l0aW9uIGZvciB0aGUgbWVudSBpcyBpbmNvcnJlY3Qgd2hlblxuICAgIC8vIHJlbmRlck9uTW91bnQ9dHJ1ZS4gTmVlZCB0byBjYWxsIHVwZGF0ZSgpIHRvIGNvcnJlY3QgaXQuXG4gICAgaWYgKHNob3cpIHBvcHBlciA9PSBudWxsIHx8IHBvcHBlci51cGRhdGUoKTtcbiAgfSwgW3Nob3ddKTtcbiAgaWYgKCFoYXNTaG93biAmJiAhcmVuZGVyT25Nb3VudCAmJiAhaXNJbnB1dEdyb3VwKSByZXR1cm4gbnVsbDtcblxuICAvLyBGb3IgY3VzdG9tIGNvbXBvbmVudHMgcHJvdmlkZSBhZGRpdGlvbmFsLCBub24tRE9NLCBwcm9wcztcbiAgaWYgKHR5cGVvZiBDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgbWVudVByb3BzLnNob3cgPSBzaG93O1xuICAgIG1lbnVQcm9wcy5jbG9zZSA9ICgpID0+IHRvZ2dsZSA9PSBudWxsID8gdm9pZCAwIDogdG9nZ2xlKGZhbHNlKTtcbiAgICBtZW51UHJvcHMuYWxpZ24gPSBhbGlnbjtcbiAgfVxuICBsZXQgc3R5bGUgPSBwcm9wcy5zdHlsZTtcbiAgaWYgKHBvcHBlciAhPSBudWxsICYmIHBvcHBlci5wbGFjZW1lbnQpIHtcbiAgICAvLyB3ZSBkb24ndCBuZWVkIHRoZSBkZWZhdWx0IHBvcHBlciBzdHlsZSxcbiAgICAvLyBtZW51cyBhcmUgZGlzcGxheTogbm9uZSB3aGVuIG5vdCBzaG93bi5cbiAgICBzdHlsZSA9IHtcbiAgICAgIC4uLnByb3BzLnN0eWxlLFxuICAgICAgLi4ubWVudVByb3BzLnN0eWxlXG4gICAgfTtcbiAgICBwcm9wc1sneC1wbGFjZW1lbnQnXSA9IHBvcHBlci5wbGFjZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgIC4uLnByb3BzLFxuICAgIC4uLm1lbnVQcm9wcyxcbiAgICBzdHlsZTogc3R5bGVcbiAgICAvLyBCb290c3RyYXAgY3NzIHJlcXVpcmVzIHRoaXMgZGF0YSBhdHRyaWIgdG8gc3R5bGUgcmVzcG9uc2l2ZSBtZW51cy5cbiAgICAsXG4gICAgLi4uKChhbGlnbkNsYXNzZXMubGVuZ3RoIHx8IGlzTmF2YmFyKSAmJiB7XG4gICAgICAnZGF0YS1icy1wb3BwZXInOiAnc3RhdGljJ1xuICAgIH0pLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIHByZWZpeCwgc2hvdyAmJiAnc2hvdycsIGFsaWduRW5kICYmIGAke3ByZWZpeH0tZW5kYCwgdmFyaWFudCAmJiBgJHtwcmVmaXh9LSR7dmFyaWFudH1gLCAuLi5hbGlnbkNsYXNzZXMpXG4gIH0pO1xufSk7XG5Ecm9wZG93bk1lbnUuZGlzcGxheU5hbWUgPSAnRHJvcGRvd25NZW51JztcbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duTWVudTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IHVzZU1lcmdlZFJlZnMgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlTWVyZ2VkUmVmcyc7XG5pbXBvcnQgRHJvcGRvd25Db250ZXh0IGZyb20gJ0ByZXN0YXJ0L3VpL0Ryb3Bkb3duQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VEcm9wZG93blRvZ2dsZSB9IGZyb20gJ0ByZXN0YXJ0L3VpL0Ryb3Bkb3duVG9nZ2xlJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB1c2VXcmFwcGVkUmVmV2l0aFdhcm5pbmcgZnJvbSAnLi91c2VXcmFwcGVkUmVmV2l0aFdhcm5pbmcnO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IERyb3Bkb3duVG9nZ2xlID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIHNwbGl0LFxuICBjbGFzc05hbWUsXG4gIGNoaWxkQnNQcmVmaXgsXG4gIC8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbiAgYXM6IENvbXBvbmVudCA9IEJ1dHRvbixcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBjb25zdCBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdkcm9wZG93bi10b2dnbGUnKTtcbiAgY29uc3QgZHJvcGRvd25Db250ZXh0ID0gdXNlQ29udGV4dChEcm9wZG93bkNvbnRleHQpO1xuICBpZiAoY2hpbGRCc1ByZWZpeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHJvcHMuYnNQcmVmaXggPSBjaGlsZEJzUHJlZml4O1xuICB9XG4gIGNvbnN0IFt0b2dnbGVQcm9wc10gPSB1c2VEcm9wZG93blRvZ2dsZSgpO1xuICB0b2dnbGVQcm9wcy5yZWYgPSB1c2VNZXJnZWRSZWZzKHRvZ2dsZVByb3BzLnJlZiwgdXNlV3JhcHBlZFJlZldpdGhXYXJuaW5nKHJlZiwgJ0Ryb3Bkb3duVG9nZ2xlJykpO1xuXG4gIC8vIFRoaXMgaW50ZW50aW9uYWxseSBmb3J3YXJkcyBzaXplIGFuZCB2YXJpYW50IChpZiBzZXQpIHRvIHRoZVxuICAvLyB1bmRlcmx5aW5nIGNvbXBvbmVudCwgdG8gYWxsb3cgaXQgdG8gcmVuZGVyIHNpemUgYW5kIHN0eWxlIHZhcmlhbnRzLlxuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgcHJlZml4LCBzcGxpdCAmJiBgJHtwcmVmaXh9LXNwbGl0YCwgKGRyb3Bkb3duQ29udGV4dCA9PSBudWxsID8gdm9pZCAwIDogZHJvcGRvd25Db250ZXh0LnNob3cpICYmICdzaG93JyksXG4gICAgLi4udG9nZ2xlUHJvcHMsXG4gICAgLi4ucHJvcHNcbiAgfSk7XG59KTtcbkRyb3Bkb3duVG9nZ2xlLmRpc3BsYXlOYW1lID0gJ0Ryb3Bkb3duVG9nZ2xlJztcbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duVG9nZ2xlOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBGaWd1cmVJbWFnZSBmcm9tICcuL0ZpZ3VyZUltYWdlJztcbmltcG9ydCBGaWd1cmVDYXB0aW9uIGZyb20gJy4vRmlndXJlQ2FwdGlvbic7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IEZpZ3VyZSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGNsYXNzTmFtZSxcbiAgYnNQcmVmaXgsXG4gIGFzOiBDb21wb25lbnQgPSAnZmlndXJlJyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2ZpZ3VyZScpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5GaWd1cmUuZGlzcGxheU5hbWUgPSAnRmlndXJlJztcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oRmlndXJlLCB7XG4gIEltYWdlOiBGaWd1cmVJbWFnZSxcbiAgQ2FwdGlvbjogRmlndXJlQ2FwdGlvblxufSk7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBGaWd1cmVDYXB0aW9uID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBic1ByZWZpeCxcbiAgYXM6IENvbXBvbmVudCA9ICdmaWdjYXB0aW9uJyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2ZpZ3VyZS1jYXB0aW9uJyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCksXG4gICAgLi4ucHJvcHNcbiAgfSk7XG59KTtcbkZpZ3VyZUNhcHRpb24uZGlzcGxheU5hbWUgPSAnRmlndXJlQ2FwdGlvbic7XG5leHBvcnQgZGVmYXVsdCBGaWd1cmVDYXB0aW9uOyIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEltYWdlLCB7IHByb3BUeXBlcyBhcyBpbWFnZVByb3BUeXBlcyB9IGZyb20gJy4vSW1hZ2UnO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IEZpZ3VyZUltYWdlID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBmbHVpZCA9IHRydWUsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IC8qI19fUFVSRV9fKi9fanN4KEltYWdlLCB7XG4gIHJlZjogcmVmLFxuICAuLi5wcm9wcyxcbiAgZmx1aWQ6IGZsdWlkLFxuICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCAnZmlndXJlLWltZycpXG59KSk7XG5GaWd1cmVJbWFnZS5kaXNwbGF5TmFtZSA9ICdGaWd1cmVJbWFnZSc7XG5GaWd1cmVJbWFnZS5wcm9wVHlwZXMgPSBpbWFnZVByb3BUeXBlcztcbmV4cG9ydCBkZWZhdWx0IEZpZ3VyZUltYWdlOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmV4cG9ydCBjb25zdCBwcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBAZGVmYXVsdCAnaW1nJ1xuICAgKi9cbiAgYnNQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG4gIC8qKlxuICAgKiBTZXRzIGltYWdlIGFzIGZsdWlkIGltYWdlLlxuICAgKi9cbiAgZmx1aWQ6IFByb3BUeXBlcy5ib29sLFxuICAvKipcbiAgICogU2V0cyBpbWFnZSBzaGFwZSBhcyByb3VuZGVkLlxuICAgKi9cbiAgcm91bmRlZDogUHJvcFR5cGVzLmJvb2wsXG4gIC8qKlxuICAgKiBTZXRzIGltYWdlIHNoYXBlIGFzIGNpcmNsZS5cbiAgICovXG4gIHJvdW5kZWRDaXJjbGU6IFByb3BUeXBlcy5ib29sLFxuICAvKipcbiAgICogU2V0cyBpbWFnZSBzaGFwZSBhcyB0aHVtYm5haWwuXG4gICAqL1xuICB0aHVtYm5haWw6IFByb3BUeXBlcy5ib29sXG59O1xuY29uc3QgSW1hZ2UgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgY2xhc3NOYW1lLFxuICBmbHVpZCA9IGZhbHNlLFxuICByb3VuZGVkID0gZmFsc2UsXG4gIHJvdW5kZWRDaXJjbGUgPSBmYWxzZSxcbiAgdGh1bWJuYWlsID0gZmFsc2UsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgYnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdpbWcnKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KFwiaW1nXCIsIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGpzeC1hMTF5L2FsdC10ZXh0XG4gICAgcmVmOiByZWYsXG4gICAgLi4ucHJvcHMsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgZmx1aWQgJiYgYCR7YnNQcmVmaXh9LWZsdWlkYCwgcm91bmRlZCAmJiBgcm91bmRlZGAsIHJvdW5kZWRDaXJjbGUgJiYgYHJvdW5kZWQtY2lyY2xlYCwgdGh1bWJuYWlsICYmIGAke2JzUHJlZml4fS10aHVtYm5haWxgKVxuICB9KTtcbn0pO1xuSW1hZ2UuZGlzcGxheU5hbWUgPSAnSW1hZ2UnO1xuZXhwb3J0IGRlZmF1bHQgSW1hZ2U7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgRm9ybUNoZWNrSW5wdXQgZnJvbSAnLi9Gb3JtQ2hlY2tJbnB1dCc7XG5pbXBvcnQgSW5wdXRHcm91cENvbnRleHQgZnJvbSAnLi9JbnB1dEdyb3VwQ29udGV4dCc7XG5pbXBvcnQgSW5wdXRHcm91cFRleHQgZnJvbSAnLi9JbnB1dEdyb3VwVGV4dCc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgSW5wdXRHcm91cENoZWNrYm94ID0gcHJvcHMgPT4gLyojX19QVVJFX18qL19qc3goSW5wdXRHcm91cFRleHQsIHtcbiAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi9fanN4KEZvcm1DaGVja0lucHV0LCB7XG4gICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgIC4uLnByb3BzXG4gIH0pXG59KTtcbmNvbnN0IElucHV0R3JvdXBSYWRpbyA9IHByb3BzID0+IC8qI19fUFVSRV9fKi9fanN4KElucHV0R3JvdXBUZXh0LCB7XG4gIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChGb3JtQ2hlY2tJbnB1dCwge1xuICAgIHR5cGU6IFwicmFkaW9cIixcbiAgICAuLi5wcm9wc1xuICB9KVxufSk7XG5jb25zdCBJbnB1dEdyb3VwID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIHNpemUsXG4gIGhhc1ZhbGlkYXRpb24sXG4gIGNsYXNzTmFtZSxcbiAgLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuICBhczogQ29tcG9uZW50ID0gJ2RpdicsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgYnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdpbnB1dC1ncm91cCcpO1xuXG4gIC8vIEludGVudGlvbmFsbHkgYW4gZW1wdHkgb2JqZWN0LiBVc2VkIGluIGRldGVjdGluZyBpZiBhIGRyb3Bkb3duXG4gIC8vIGV4aXN0cyB1bmRlciBhbiBpbnB1dCBncm91cC5cbiAgY29uc3QgY29udGV4dFZhbHVlID0gdXNlTWVtbygoKSA9PiAoe30pLCBbXSk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChJbnB1dEdyb3VwQ29udGV4dC5Qcm92aWRlciwge1xuICAgIHZhbHVlOiBjb250ZXh0VmFsdWUsXG4gICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgICAgcmVmOiByZWYsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4LCBzaXplICYmIGAke2JzUHJlZml4fS0ke3NpemV9YCwgaGFzVmFsaWRhdGlvbiAmJiAnaGFzLXZhbGlkYXRpb24nKVxuICAgIH0pXG4gIH0pO1xufSk7XG5JbnB1dEdyb3VwLmRpc3BsYXlOYW1lID0gJ0lucHV0R3JvdXAnO1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihJbnB1dEdyb3VwLCB7XG4gIFRleHQ6IElucHV0R3JvdXBUZXh0LFxuICBSYWRpbzogSW5wdXRHcm91cFJhZGlvLFxuICBDaGVja2JveDogSW5wdXRHcm91cENoZWNrYm94XG59KTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuY29uc3QgY29udGV4dCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVDb250ZXh0KG51bGwpO1xuY29udGV4dC5kaXNwbGF5TmFtZSA9ICdJbnB1dEdyb3VwQ29udGV4dCc7XG5leHBvcnQgZGVmYXVsdCBjb250ZXh0OyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgSW5wdXRHcm91cFRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBjbGFzc05hbWUsXG4gIGJzUHJlZml4LFxuICBhczogQ29tcG9uZW50ID0gJ3NwYW4nLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnaW5wdXQtZ3JvdXAtdGV4dCcpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5JbnB1dEdyb3VwVGV4dC5kaXNwbGF5TmFtZSA9ICdJbnB1dEdyb3VwVGV4dCc7XG5leHBvcnQgZGVmYXVsdCBJbnB1dEdyb3VwVGV4dDsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcbmltcG9ydCB7IHVzZVVuY29udHJvbGxlZCB9IGZyb20gJ3VuY29udHJvbGxhYmxlJztcbmltcG9ydCBCYXNlTmF2IGZyb20gJ0ByZXN0YXJ0L3VpL05hdic7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IExpc3RHcm91cEl0ZW0gZnJvbSAnLi9MaXN0R3JvdXBJdGVtJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBMaXN0R3JvdXAgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuICBjb25zdCB7XG4gICAgY2xhc3NOYW1lLFxuICAgIGJzUHJlZml4OiBpbml0aWFsQnNQcmVmaXgsXG4gICAgdmFyaWFudCxcbiAgICBob3Jpem9udGFsLFxuICAgIG51bWJlcmVkLFxuICAgIC8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbiAgICBhcyA9ICdkaXYnLFxuICAgIC4uLmNvbnRyb2xsZWRQcm9wc1xuICB9ID0gdXNlVW5jb250cm9sbGVkKHByb3BzLCB7XG4gICAgYWN0aXZlS2V5OiAnb25TZWxlY3QnXG4gIH0pO1xuICBjb25zdCBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChpbml0aWFsQnNQcmVmaXgsICdsaXN0LWdyb3VwJyk7XG4gIGxldCBob3Jpem9udGFsVmFyaWFudDtcbiAgaWYgKGhvcml6b250YWwpIHtcbiAgICBob3Jpem9udGFsVmFyaWFudCA9IGhvcml6b250YWwgPT09IHRydWUgPyAnaG9yaXpvbnRhbCcgOiBgaG9yaXpvbnRhbC0ke2hvcml6b250YWx9YDtcbiAgfVxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEoaG9yaXpvbnRhbCAmJiB2YXJpYW50ID09PSAnZmx1c2gnKSwgJ2B2YXJpYW50PVwiZmx1c2hcImAgYW5kIGBob3Jpem9udGFsYCBzaG91bGQgbm90IGJlIHVzZWQgdG9nZXRoZXIuJykgOiB2b2lkIDA7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChCYXNlTmF2LCB7XG4gICAgcmVmOiByZWYsXG4gICAgLi4uY29udHJvbGxlZFByb3BzLFxuICAgIGFzOiBhcyxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCwgdmFyaWFudCAmJiBgJHtic1ByZWZpeH0tJHt2YXJpYW50fWAsIGhvcml6b250YWxWYXJpYW50ICYmIGAke2JzUHJlZml4fS0ke2hvcml6b250YWxWYXJpYW50fWAsIG51bWJlcmVkICYmIGAke2JzUHJlZml4fS1udW1iZXJlZGApXG4gIH0pO1xufSk7XG5MaXN0R3JvdXAuZGlzcGxheU5hbWUgPSAnTGlzdEdyb3VwJztcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oTGlzdEdyb3VwLCB7XG4gIEl0ZW06IExpc3RHcm91cEl0ZW1cbn0pOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgeyB1c2VOYXZJdGVtIH0gZnJvbSAnQHJlc3RhcnQvdWkvTmF2SXRlbSc7XG5pbXBvcnQgeyBtYWtlRXZlbnRLZXkgfSBmcm9tICdAcmVzdGFydC91aS9TZWxlY3RhYmxlQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IExpc3RHcm91cEl0ZW0gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgYWN0aXZlLFxuICBkaXNhYmxlZCxcbiAgZXZlbnRLZXksXG4gIGNsYXNzTmFtZSxcbiAgdmFyaWFudCxcbiAgYWN0aW9uLFxuICBhcyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2xpc3QtZ3JvdXAtaXRlbScpO1xuICBjb25zdCBbbmF2SXRlbVByb3BzLCBtZXRhXSA9IHVzZU5hdkl0ZW0oe1xuICAgIGtleTogbWFrZUV2ZW50S2V5KGV2ZW50S2V5LCBwcm9wcy5ocmVmKSxcbiAgICBhY3RpdmUsXG4gICAgLi4ucHJvcHNcbiAgfSk7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gdXNlRXZlbnRDYWxsYmFjayhldmVudCA9PiB7XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5hdkl0ZW1Qcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgfSk7XG4gIGlmIChkaXNhYmxlZCAmJiBwcm9wcy50YWJJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcHJvcHMudGFiSW5kZXggPSAtMTtcbiAgICBwcm9wc1snYXJpYS1kaXNhYmxlZCddID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICBjb25zdCBDb21wb25lbnQgPSBhcyB8fCAoYWN0aW9uID8gcHJvcHMuaHJlZiA/ICdhJyA6ICdidXR0b24nIDogJ2RpdicpO1xuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGFzIHx8ICEoIWFjdGlvbiAmJiBwcm9wcy5ocmVmKSwgJ2BhY3Rpb249ZmFsc2VgIGFuZCBgaHJlZmAgc2hvdWxkIG5vdCBiZSB1c2VkIHRvZ2V0aGVyLicpIDogdm9pZCAwO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgLi4ucHJvcHMsXG4gICAgLi4ubmF2SXRlbVByb3BzLFxuICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4LCBtZXRhLmlzQWN0aXZlICYmICdhY3RpdmUnLCBkaXNhYmxlZCAmJiAnZGlzYWJsZWQnLCB2YXJpYW50ICYmIGAke2JzUHJlZml4fS0ke3ZhcmlhbnR9YCwgYWN0aW9uICYmIGAke2JzUHJlZml4fS1hY3Rpb25gKVxuICB9KTtcbn0pO1xuTGlzdEdyb3VwSXRlbS5kaXNwbGF5TmFtZSA9ICdMaXN0R3JvdXBJdGVtJztcbmV4cG9ydCBkZWZhdWx0IExpc3RHcm91cEl0ZW07IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGFkZEV2ZW50TGlzdGVuZXIgZnJvbSAnZG9tLWhlbHBlcnMvYWRkRXZlbnRMaXN0ZW5lcic7XG5pbXBvcnQgY2FuVXNlRE9NIGZyb20gJ2RvbS1oZWxwZXJzL2NhblVzZURPTSc7XG5pbXBvcnQgb3duZXJEb2N1bWVudCBmcm9tICdkb20taGVscGVycy9vd25lckRvY3VtZW50JztcbmltcG9ydCByZW1vdmVFdmVudExpc3RlbmVyIGZyb20gJ2RvbS1oZWxwZXJzL3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuaW1wb3J0IGdldFNjcm9sbGJhclNpemUgZnJvbSAnZG9tLWhlbHBlcnMvc2Nyb2xsYmFyU2l6ZSc7XG5pbXBvcnQgdXNlQ2FsbGJhY2tSZWYgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlQ2FsbGJhY2tSZWYnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgdXNlTWVyZ2VkUmVmcyBmcm9tICdAcmVzdGFydC9ob29rcy91c2VNZXJnZWRSZWZzJztcbmltcG9ydCB1c2VXaWxsVW5tb3VudCBmcm9tICdAcmVzdGFydC9ob29rcy91c2VXaWxsVW5tb3VudCc7XG5pbXBvcnQgdHJhbnNpdGlvbkVuZCBmcm9tICdkb20taGVscGVycy90cmFuc2l0aW9uRW5kJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEJhc2VNb2RhbCBmcm9tICdAcmVzdGFydC91aS9Nb2RhbCc7XG5pbXBvcnQgeyBnZXRTaGFyZWRNYW5hZ2VyIH0gZnJvbSAnLi9Cb290c3RyYXBNb2RhbE1hbmFnZXInO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9GYWRlJztcbmltcG9ydCBNb2RhbEJvZHkgZnJvbSAnLi9Nb2RhbEJvZHknO1xuaW1wb3J0IE1vZGFsQ29udGV4dCBmcm9tICcuL01vZGFsQ29udGV4dCc7XG5pbXBvcnQgTW9kYWxEaWFsb2cgZnJvbSAnLi9Nb2RhbERpYWxvZyc7XG5pbXBvcnQgTW9kYWxGb290ZXIgZnJvbSAnLi9Nb2RhbEZvb3Rlcic7XG5pbXBvcnQgTW9kYWxIZWFkZXIgZnJvbSAnLi9Nb2RhbEhlYWRlcic7XG5pbXBvcnQgTW9kYWxUaXRsZSBmcm9tICcuL01vZGFsVGl0bGUnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4LCB1c2VJc1JUTCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cbmZ1bmN0aW9uIERpYWxvZ1RyYW5zaXRpb24ocHJvcHMpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KEZhZGUsIHtcbiAgICAuLi5wcm9wcyxcbiAgICB0aW1lb3V0OiBudWxsXG4gIH0pO1xufVxuZnVuY3Rpb24gQmFja2Ryb3BUcmFuc2l0aW9uKHByb3BzKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChGYWRlLCB7XG4gICAgLi4ucHJvcHMsXG4gICAgdGltZW91dDogbnVsbFxuICB9KTtcbn1cblxuLyogZXNsaW50LWVuYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuY29uc3QgTW9kYWwgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgY2xhc3NOYW1lLFxuICBzdHlsZSxcbiAgZGlhbG9nQ2xhc3NOYW1lLFxuICBjb250ZW50Q2xhc3NOYW1lLFxuICBjaGlsZHJlbixcbiAgZGlhbG9nQXM6IERpYWxvZyA9IE1vZGFsRGlhbG9nLFxuICAnZGF0YS1icy10aGVtZSc6IGRhdGFCc1RoZW1lLFxuICAnYXJpYS1sYWJlbGxlZGJ5JzogYXJpYUxhYmVsbGVkYnksXG4gICdhcmlhLWRlc2NyaWJlZGJ5JzogYXJpYURlc2NyaWJlZGJ5LFxuICAnYXJpYS1sYWJlbCc6IGFyaWFMYWJlbCxcbiAgLyogQmFzZU1vZGFsIHByb3BzICovXG5cbiAgc2hvdyA9IGZhbHNlLFxuICBhbmltYXRpb24gPSB0cnVlLFxuICBiYWNrZHJvcCA9IHRydWUsXG4gIGtleWJvYXJkID0gdHJ1ZSxcbiAgb25Fc2NhcGVLZXlEb3duLFxuICBvblNob3csXG4gIG9uSGlkZSxcbiAgY29udGFpbmVyLFxuICBhdXRvRm9jdXMgPSB0cnVlLFxuICBlbmZvcmNlRm9jdXMgPSB0cnVlLFxuICByZXN0b3JlRm9jdXMgPSB0cnVlLFxuICByZXN0b3JlRm9jdXNPcHRpb25zLFxuICBvbkVudGVyZWQsXG4gIG9uRXhpdCxcbiAgb25FeGl0aW5nLFxuICBvbkVudGVyLFxuICBvbkVudGVyaW5nLFxuICBvbkV4aXRlZCxcbiAgYmFja2Ryb3BDbGFzc05hbWUsXG4gIG1hbmFnZXI6IHByb3BzTWFuYWdlcixcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBjb25zdCBbbW9kYWxTdHlsZSwgc2V0U3R5bGVdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbYW5pbWF0ZVN0YXRpY01vZGFsLCBzZXRBbmltYXRlU3RhdGljTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCB3YWl0aW5nRm9yTW91c2VVcFJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGlnbm9yZUJhY2tkcm9wQ2xpY2tSZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCByZW1vdmVTdGF0aWNNb2RhbEFuaW1hdGlvblJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW21vZGFsLCBzZXRNb2RhbFJlZl0gPSB1c2VDYWxsYmFja1JlZigpO1xuICBjb25zdCBtZXJnZWRSZWYgPSB1c2VNZXJnZWRSZWZzKHJlZiwgc2V0TW9kYWxSZWYpO1xuICBjb25zdCBoYW5kbGVIaWRlID0gdXNlRXZlbnRDYWxsYmFjayhvbkhpZGUpO1xuICBjb25zdCBpc1JUTCA9IHVzZUlzUlRMKCk7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnbW9kYWwnKTtcbiAgY29uc3QgbW9kYWxDb250ZXh0ID0gdXNlTWVtbygoKSA9PiAoe1xuICAgIG9uSGlkZTogaGFuZGxlSGlkZVxuICB9KSwgW2hhbmRsZUhpZGVdKTtcbiAgZnVuY3Rpb24gZ2V0TW9kYWxNYW5hZ2VyKCkge1xuICAgIGlmIChwcm9wc01hbmFnZXIpIHJldHVybiBwcm9wc01hbmFnZXI7XG4gICAgcmV0dXJuIGdldFNoYXJlZE1hbmFnZXIoe1xuICAgICAgaXNSVExcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiB1cGRhdGVEaWFsb2dTdHlsZShub2RlKSB7XG4gICAgaWYgKCFjYW5Vc2VET00pIHJldHVybjtcbiAgICBjb25zdCBjb250YWluZXJJc092ZXJmbG93aW5nID0gZ2V0TW9kYWxNYW5hZ2VyKCkuZ2V0U2Nyb2xsYmFyV2lkdGgoKSA+IDA7XG4gICAgY29uc3QgbW9kYWxJc092ZXJmbG93aW5nID0gbm9kZS5zY3JvbGxIZWlnaHQgPiBvd25lckRvY3VtZW50KG5vZGUpLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgc2V0U3R5bGUoe1xuICAgICAgcGFkZGluZ1JpZ2h0OiBjb250YWluZXJJc092ZXJmbG93aW5nICYmICFtb2RhbElzT3ZlcmZsb3dpbmcgPyBnZXRTY3JvbGxiYXJTaXplKCkgOiB1bmRlZmluZWQsXG4gICAgICBwYWRkaW5nTGVmdDogIWNvbnRhaW5lcklzT3ZlcmZsb3dpbmcgJiYgbW9kYWxJc092ZXJmbG93aW5nID8gZ2V0U2Nyb2xsYmFyU2l6ZSgpIDogdW5kZWZpbmVkXG4gICAgfSk7XG4gIH1cbiAgY29uc3QgaGFuZGxlV2luZG93UmVzaXplID0gdXNlRXZlbnRDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKG1vZGFsKSB7XG4gICAgICB1cGRhdGVEaWFsb2dTdHlsZShtb2RhbC5kaWFsb2cpO1xuICAgIH1cbiAgfSk7XG4gIHVzZVdpbGxVbm1vdW50KCgpID0+IHtcbiAgICByZW1vdmVFdmVudExpc3RlbmVyKHdpbmRvdywgJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgcmVtb3ZlU3RhdGljTW9kYWxBbmltYXRpb25SZWYuY3VycmVudCA9PSBudWxsIHx8IHJlbW92ZVN0YXRpY01vZGFsQW5pbWF0aW9uUmVmLmN1cnJlbnQoKTtcbiAgfSk7XG5cbiAgLy8gV2UgcHJldmVudCB0aGUgbW9kYWwgZnJvbSBjbG9zaW5nIGR1cmluZyBhIGRyYWcgYnkgZGV0ZWN0aW5nIHdoZXJlIHRoZVxuICAvLyBjbGljayBvcmlnaW5hdGVzIGZyb20uIElmIGl0IHN0YXJ0cyBpbiB0aGUgbW9kYWwgYW5kIHRoZW4gZW5kcyBvdXRzaWRlXG4gIC8vIGRvbid0IGNsb3NlLlxuICBjb25zdCBoYW5kbGVEaWFsb2dNb3VzZURvd24gPSAoKSA9PiB7XG4gICAgd2FpdGluZ0Zvck1vdXNlVXBSZWYuY3VycmVudCA9IHRydWU7XG4gIH07XG4gIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSBlID0+IHtcbiAgICBpZiAod2FpdGluZ0Zvck1vdXNlVXBSZWYuY3VycmVudCAmJiBtb2RhbCAmJiBlLnRhcmdldCA9PT0gbW9kYWwuZGlhbG9nKSB7XG4gICAgICBpZ25vcmVCYWNrZHJvcENsaWNrUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIH1cbiAgICB3YWl0aW5nRm9yTW91c2VVcFJlZi5jdXJyZW50ID0gZmFsc2U7XG4gIH07XG4gIGNvbnN0IGhhbmRsZVN0YXRpY01vZGFsQW5pbWF0aW9uID0gKCkgPT4ge1xuICAgIHNldEFuaW1hdGVTdGF0aWNNb2RhbCh0cnVlKTtcbiAgICByZW1vdmVTdGF0aWNNb2RhbEFuaW1hdGlvblJlZi5jdXJyZW50ID0gdHJhbnNpdGlvbkVuZChtb2RhbC5kaWFsb2csICgpID0+IHtcbiAgICAgIHNldEFuaW1hdGVTdGF0aWNNb2RhbChmYWxzZSk7XG4gICAgfSk7XG4gIH07XG4gIGNvbnN0IGhhbmRsZVN0YXRpY0JhY2tkcm9wQ2xpY2sgPSBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQgIT09IGUuY3VycmVudFRhcmdldCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoYW5kbGVTdGF0aWNNb2RhbEFuaW1hdGlvbigpO1xuICB9O1xuICBjb25zdCBoYW5kbGVDbGljayA9IGUgPT4ge1xuICAgIGlmIChiYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgIGhhbmRsZVN0YXRpY0JhY2tkcm9wQ2xpY2soZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpZ25vcmVCYWNrZHJvcENsaWNrUmVmLmN1cnJlbnQgfHwgZS50YXJnZXQgIT09IGUuY3VycmVudFRhcmdldCkge1xuICAgICAgaWdub3JlQmFja2Ryb3BDbGlja1JlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uSGlkZSA9PSBudWxsIHx8IG9uSGlkZSgpO1xuICB9O1xuICBjb25zdCBoYW5kbGVFc2NhcGVLZXlEb3duID0gZSA9PiB7XG4gICAgaWYgKGtleWJvYXJkKSB7XG4gICAgICBvbkVzY2FwZUtleURvd24gPT0gbnVsbCB8fCBvbkVzY2FwZUtleURvd24oZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENhbGwgcHJldmVudERlZmF1bHQgdG8gc3RvcCBtb2RhbCBmcm9tIGNsb3NpbmcgaW4gQHJlc3RhcnQvdWkuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoYmFja2Ryb3AgPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIC8vIFBsYXkgc3RhdGljIG1vZGFsIGFuaW1hdGlvbi5cbiAgICAgICAgaGFuZGxlU3RhdGljTW9kYWxBbmltYXRpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGNvbnN0IGhhbmRsZUVudGVyID0gKG5vZGUsIGlzQXBwZWFyaW5nKSA9PiB7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHVwZGF0ZURpYWxvZ1N0eWxlKG5vZGUpO1xuICAgIH1cbiAgICBvbkVudGVyID09IG51bGwgfHwgb25FbnRlcihub2RlLCBpc0FwcGVhcmluZyk7XG4gIH07XG4gIGNvbnN0IGhhbmRsZUV4aXQgPSBub2RlID0+IHtcbiAgICByZW1vdmVTdGF0aWNNb2RhbEFuaW1hdGlvblJlZi5jdXJyZW50ID09IG51bGwgfHwgcmVtb3ZlU3RhdGljTW9kYWxBbmltYXRpb25SZWYuY3VycmVudCgpO1xuICAgIG9uRXhpdCA9PSBudWxsIHx8IG9uRXhpdChub2RlKTtcbiAgfTtcbiAgY29uc3QgaGFuZGxlRW50ZXJpbmcgPSAobm9kZSwgaXNBcHBlYXJpbmcpID0+IHtcbiAgICBvbkVudGVyaW5nID09IG51bGwgfHwgb25FbnRlcmluZyhub2RlLCBpc0FwcGVhcmluZyk7XG5cbiAgICAvLyBGSVhNRTogVGhpcyBzaG91bGQgd29yayBldmVuIHdoZW4gYW5pbWF0aW9uIGlzIGRpc2FibGVkLlxuICAgIGFkZEV2ZW50TGlzdGVuZXIod2luZG93LCAncmVzaXplJywgaGFuZGxlV2luZG93UmVzaXplKTtcbiAgfTtcbiAgY29uc3QgaGFuZGxlRXhpdGVkID0gbm9kZSA9PiB7XG4gICAgaWYgKG5vZGUpIG5vZGUuc3R5bGUuZGlzcGxheSA9ICcnOyAvLyBSSEwgcmVtb3ZlcyBpdCBzb21ldGltZXNcbiAgICBvbkV4aXRlZCA9PSBudWxsIHx8IG9uRXhpdGVkKG5vZGUpO1xuXG4gICAgLy8gRklYTUU6IFRoaXMgc2hvdWxkIHdvcmsgZXZlbiB3aGVuIGFuaW1hdGlvbiBpcyBkaXNhYmxlZC5cbiAgICByZW1vdmVFdmVudExpc3RlbmVyKHdpbmRvdywgJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gIH07XG4gIGNvbnN0IHJlbmRlckJhY2tkcm9wID0gdXNlQ2FsbGJhY2soYmFja2Ryb3BQcm9wcyA9PiAvKiNfX1BVUkVfXyovX2pzeChcImRpdlwiLCB7XG4gICAgLi4uYmFja2Ryb3BQcm9wcyxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoYCR7YnNQcmVmaXh9LWJhY2tkcm9wYCwgYmFja2Ryb3BDbGFzc05hbWUsICFhbmltYXRpb24gJiYgJ3Nob3cnKVxuICB9KSwgW2FuaW1hdGlvbiwgYmFja2Ryb3BDbGFzc05hbWUsIGJzUHJlZml4XSk7XG4gIGNvbnN0IGJhc2VNb2RhbFN0eWxlID0ge1xuICAgIC4uLnN0eWxlLFxuICAgIC4uLm1vZGFsU3R5bGVcbiAgfTtcblxuICAvLyBJZiBgZGlzcGxheWAgaXMgbm90IHNldCB0byBibG9jaywgYXV0b0ZvY3VzIGluc2lkZSB0aGUgbW9kYWwgZmFpbHNcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzUxMDJcbiAgYmFzZU1vZGFsU3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGNvbnN0IHJlbmRlckRpYWxvZyA9IGRpYWxvZ1Byb3BzID0+IC8qI19fUFVSRV9fKi9fanN4KFwiZGl2XCIsIHtcbiAgICByb2xlOiBcImRpYWxvZ1wiLFxuICAgIC4uLmRpYWxvZ1Byb3BzLFxuICAgIHN0eWxlOiBiYXNlTW9kYWxTdHlsZSxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCwgYW5pbWF0ZVN0YXRpY01vZGFsICYmIGAke2JzUHJlZml4fS1zdGF0aWNgLCAhYW5pbWF0aW9uICYmICdzaG93JyksXG4gICAgb25DbGljazogYmFja2Ryb3AgPyBoYW5kbGVDbGljayA6IHVuZGVmaW5lZCxcbiAgICBvbk1vdXNlVXA6IGhhbmRsZU1vdXNlVXAsXG4gICAgXCJkYXRhLWJzLXRoZW1lXCI6IGRhdGFCc1RoZW1lLFxuICAgIFwiYXJpYS1sYWJlbFwiOiBhcmlhTGFiZWwsXG4gICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogYXJpYUxhYmVsbGVkYnksXG4gICAgXCJhcmlhLWRlc2NyaWJlZGJ5XCI6IGFyaWFEZXNjcmliZWRieSxcbiAgICBjaGlsZHJlbjogLyojX19QVVJFX18qL19qc3goRGlhbG9nLCB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIG9uTW91c2VEb3duOiBoYW5kbGVEaWFsb2dNb3VzZURvd24sXG4gICAgICBjbGFzc05hbWU6IGRpYWxvZ0NsYXNzTmFtZSxcbiAgICAgIGNvbnRlbnRDbGFzc05hbWU6IGNvbnRlbnRDbGFzc05hbWUsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICB9KVxuICB9KTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KE1vZGFsQ29udGV4dC5Qcm92aWRlciwge1xuICAgIHZhbHVlOiBtb2RhbENvbnRleHQsXG4gICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi9fanN4KEJhc2VNb2RhbCwge1xuICAgICAgc2hvdzogc2hvdyxcbiAgICAgIHJlZjogbWVyZ2VkUmVmLFxuICAgICAgYmFja2Ryb3A6IGJhY2tkcm9wLFxuICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICBrZXlib2FyZDogdHJ1ZSAvLyBBbHdheXMgc2V0IHRydWUgLSBzZWUgaGFuZGxlRXNjYXBlS2V5RG93blxuICAgICAgLFxuICAgICAgYXV0b0ZvY3VzOiBhdXRvRm9jdXMsXG4gICAgICBlbmZvcmNlRm9jdXM6IGVuZm9yY2VGb2N1cyxcbiAgICAgIHJlc3RvcmVGb2N1czogcmVzdG9yZUZvY3VzLFxuICAgICAgcmVzdG9yZUZvY3VzT3B0aW9uczogcmVzdG9yZUZvY3VzT3B0aW9ucyxcbiAgICAgIG9uRXNjYXBlS2V5RG93bjogaGFuZGxlRXNjYXBlS2V5RG93bixcbiAgICAgIG9uU2hvdzogb25TaG93LFxuICAgICAgb25IaWRlOiBvbkhpZGUsXG4gICAgICBvbkVudGVyOiBoYW5kbGVFbnRlcixcbiAgICAgIG9uRW50ZXJpbmc6IGhhbmRsZUVudGVyaW5nLFxuICAgICAgb25FbnRlcmVkOiBvbkVudGVyZWQsXG4gICAgICBvbkV4aXQ6IGhhbmRsZUV4aXQsXG4gICAgICBvbkV4aXRpbmc6IG9uRXhpdGluZyxcbiAgICAgIG9uRXhpdGVkOiBoYW5kbGVFeGl0ZWQsXG4gICAgICBtYW5hZ2VyOiBnZXRNb2RhbE1hbmFnZXIoKSxcbiAgICAgIHRyYW5zaXRpb246IGFuaW1hdGlvbiA/IERpYWxvZ1RyYW5zaXRpb24gOiB1bmRlZmluZWQsXG4gICAgICBiYWNrZHJvcFRyYW5zaXRpb246IGFuaW1hdGlvbiA/IEJhY2tkcm9wVHJhbnNpdGlvbiA6IHVuZGVmaW5lZCxcbiAgICAgIHJlbmRlckJhY2tkcm9wOiByZW5kZXJCYWNrZHJvcCxcbiAgICAgIHJlbmRlckRpYWxvZzogcmVuZGVyRGlhbG9nXG4gICAgfSlcbiAgfSk7XG59KTtcbk1vZGFsLmRpc3BsYXlOYW1lID0gJ01vZGFsJztcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oTW9kYWwsIHtcbiAgQm9keTogTW9kYWxCb2R5LFxuICBIZWFkZXI6IE1vZGFsSGVhZGVyLFxuICBUaXRsZTogTW9kYWxUaXRsZSxcbiAgRm9vdGVyOiBNb2RhbEZvb3RlcixcbiAgRGlhbG9nOiBNb2RhbERpYWxvZyxcbiAgVFJBTlNJVElPTl9EVVJBVElPTjogMzAwLFxuICBCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OOiAxNTBcbn0pOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgTW9kYWxCb2R5ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBic1ByZWZpeCxcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnbW9kYWwtYm9keScpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5Nb2RhbEJvZHkuZGlzcGxheU5hbWUgPSAnTW9kYWxCb2R5JztcbmV4cG9ydCBkZWZhdWx0IE1vZGFsQm9keTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IE1vZGFsRGlhbG9nID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIGNsYXNzTmFtZSxcbiAgY29udGVudENsYXNzTmFtZSxcbiAgY2VudGVyZWQsXG4gIHNpemUsXG4gIGZ1bGxzY3JlZW4sXG4gIGNoaWxkcmVuLFxuICBzY3JvbGxhYmxlLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnbW9kYWwnKTtcbiAgY29uc3QgZGlhbG9nQ2xhc3MgPSBgJHtic1ByZWZpeH0tZGlhbG9nYDtcbiAgY29uc3QgZnVsbFNjcmVlbkNsYXNzID0gdHlwZW9mIGZ1bGxzY3JlZW4gPT09ICdzdHJpbmcnID8gYCR7YnNQcmVmaXh9LWZ1bGxzY3JlZW4tJHtmdWxsc2NyZWVufWAgOiBgJHtic1ByZWZpeH0tZnVsbHNjcmVlbmA7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChcImRpdlwiLCB7XG4gICAgLi4ucHJvcHMsXG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGRpYWxvZ0NsYXNzLCBjbGFzc05hbWUsIHNpemUgJiYgYCR7YnNQcmVmaXh9LSR7c2l6ZX1gLCBjZW50ZXJlZCAmJiBgJHtkaWFsb2dDbGFzc30tY2VudGVyZWRgLCBzY3JvbGxhYmxlICYmIGAke2RpYWxvZ0NsYXNzfS1zY3JvbGxhYmxlYCwgZnVsbHNjcmVlbiAmJiBmdWxsU2NyZWVuQ2xhc3MpLFxuICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoYCR7YnNQcmVmaXh9LWNvbnRlbnRgLCBjb250ZW50Q2xhc3NOYW1lKSxcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICAgIH0pXG4gIH0pO1xufSk7XG5Nb2RhbERpYWxvZy5kaXNwbGF5TmFtZSA9ICdNb2RhbERpYWxvZyc7XG5leHBvcnQgZGVmYXVsdCBNb2RhbERpYWxvZzsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IE1vZGFsRm9vdGVyID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBic1ByZWZpeCxcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnbW9kYWwtZm9vdGVyJyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCksXG4gICAgLi4ucHJvcHNcbiAgfSk7XG59KTtcbk1vZGFsRm9vdGVyLmRpc3BsYXlOYW1lID0gJ01vZGFsRm9vdGVyJztcbmV4cG9ydCBkZWZhdWx0IE1vZGFsRm9vdGVyOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgQWJzdHJhY3RNb2RhbEhlYWRlciBmcm9tICcuL0Fic3RyYWN0TW9kYWxIZWFkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IE1vZGFsSGVhZGVyID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIGNsYXNzTmFtZSxcbiAgY2xvc2VMYWJlbCA9ICdDbG9zZScsXG4gIGNsb3NlQnV0dG9uID0gZmFsc2UsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgYnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdtb2RhbC1oZWFkZXInKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KEFic3RyYWN0TW9kYWxIZWFkZXIsIHtcbiAgICByZWY6IHJlZixcbiAgICAuLi5wcm9wcyxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCksXG4gICAgY2xvc2VMYWJlbDogY2xvc2VMYWJlbCxcbiAgICBjbG9zZUJ1dHRvbjogY2xvc2VCdXR0b25cbiAgfSk7XG59KTtcbk1vZGFsSGVhZGVyLmRpc3BsYXlOYW1lID0gJ01vZGFsSGVhZGVyJztcbmV4cG9ydCBkZWZhdWx0IE1vZGFsSGVhZGVyOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBkaXZXaXRoQ2xhc3NOYW1lIGZyb20gJy4vZGl2V2l0aENsYXNzTmFtZSc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IERpdlN0eWxlZEFzSDQgPSBkaXZXaXRoQ2xhc3NOYW1lKCdoNCcpO1xuY29uc3QgTW9kYWxUaXRsZSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGNsYXNzTmFtZSxcbiAgYnNQcmVmaXgsXG4gIGFzOiBDb21wb25lbnQgPSBEaXZTdHlsZWRBc0g0LFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnbW9kYWwtdGl0bGUnKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgIHJlZjogcmVmLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4KSxcbiAgICAuLi5wcm9wc1xuICB9KTtcbn0pO1xuTW9kYWxUaXRsZS5kaXNwbGF5TmFtZSA9ICdNb2RhbFRpdGxlJztcbmV4cG9ydCBkZWZhdWx0IE1vZGFsVGl0bGU7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVVuY29udHJvbGxlZCB9IGZyb20gJ3VuY29udHJvbGxhYmxlJztcbmltcG9ydCBCYXNlTmF2IGZyb20gJ0ByZXN0YXJ0L3VpL05hdic7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IE5hdmJhckNvbnRleHQgZnJvbSAnLi9OYXZiYXJDb250ZXh0JztcbmltcG9ydCBDYXJkSGVhZGVyQ29udGV4dCBmcm9tICcuL0NhcmRIZWFkZXJDb250ZXh0JztcbmltcG9ydCBOYXZJdGVtIGZyb20gJy4vTmF2SXRlbSc7XG5pbXBvcnQgTmF2TGluayBmcm9tICcuL05hdkxpbmsnO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IE5hdiA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh1bmNvbnRyb2xsZWRQcm9wcywgcmVmKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBhcyA9ICdkaXYnLFxuICAgIGJzUHJlZml4OiBpbml0aWFsQnNQcmVmaXgsXG4gICAgdmFyaWFudCxcbiAgICBmaWxsID0gZmFsc2UsXG4gICAganVzdGlmeSA9IGZhbHNlLFxuICAgIG5hdmJhcixcbiAgICBuYXZiYXJTY3JvbGwsXG4gICAgY2xhc3NOYW1lLFxuICAgIGFjdGl2ZUtleSxcbiAgICAuLi5wcm9wc1xuICB9ID0gdXNlVW5jb250cm9sbGVkKHVuY29udHJvbGxlZFByb3BzLCB7XG4gICAgYWN0aXZlS2V5OiAnb25TZWxlY3QnXG4gIH0pO1xuICBjb25zdCBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChpbml0aWFsQnNQcmVmaXgsICduYXYnKTtcbiAgbGV0IG5hdmJhckJzUHJlZml4O1xuICBsZXQgY2FyZEhlYWRlckJzUHJlZml4O1xuICBsZXQgaXNOYXZiYXIgPSBmYWxzZTtcbiAgY29uc3QgbmF2YmFyQ29udGV4dCA9IHVzZUNvbnRleHQoTmF2YmFyQ29udGV4dCk7XG4gIGNvbnN0IGNhcmRIZWFkZXJDb250ZXh0ID0gdXNlQ29udGV4dChDYXJkSGVhZGVyQ29udGV4dCk7XG4gIGlmIChuYXZiYXJDb250ZXh0KSB7XG4gICAgbmF2YmFyQnNQcmVmaXggPSBuYXZiYXJDb250ZXh0LmJzUHJlZml4O1xuICAgIGlzTmF2YmFyID0gbmF2YmFyID09IG51bGwgPyB0cnVlIDogbmF2YmFyO1xuICB9IGVsc2UgaWYgKGNhcmRIZWFkZXJDb250ZXh0KSB7XG4gICAgKHtcbiAgICAgIGNhcmRIZWFkZXJCc1ByZWZpeFxuICAgIH0gPSBjYXJkSGVhZGVyQ29udGV4dCk7XG4gIH1cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KEJhc2VOYXYsIHtcbiAgICBhczogYXMsXG4gICAgcmVmOiByZWYsXG4gICAgYWN0aXZlS2V5OiBhY3RpdmVLZXksXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwge1xuICAgICAgW2JzUHJlZml4XTogIWlzTmF2YmFyLFxuICAgICAgW2Ake25hdmJhckJzUHJlZml4fS1uYXZgXTogaXNOYXZiYXIsXG4gICAgICBbYCR7bmF2YmFyQnNQcmVmaXh9LW5hdi1zY3JvbGxgXTogaXNOYXZiYXIgJiYgbmF2YmFyU2Nyb2xsLFxuICAgICAgW2Ake2NhcmRIZWFkZXJCc1ByZWZpeH0tJHt2YXJpYW50fWBdOiAhIWNhcmRIZWFkZXJCc1ByZWZpeCxcbiAgICAgIFtgJHtic1ByZWZpeH0tJHt2YXJpYW50fWBdOiAhIXZhcmlhbnQsXG4gICAgICBbYCR7YnNQcmVmaXh9LWZpbGxgXTogZmlsbCxcbiAgICAgIFtgJHtic1ByZWZpeH0tanVzdGlmaWVkYF06IGp1c3RpZnlcbiAgICB9KSxcbiAgICAuLi5wcm9wc1xuICB9KTtcbn0pO1xuTmF2LmRpc3BsYXlOYW1lID0gJ05hdic7XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKE5hdiwge1xuICBJdGVtOiBOYXZJdGVtLFxuICBMaW5rOiBOYXZMaW5rXG59KTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IERyb3Bkb3duIGZyb20gJy4vRHJvcGRvd24nO1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnLi9OYXZMaW5rJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBOYXZEcm9wZG93biA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGlkLFxuICB0aXRsZSxcbiAgY2hpbGRyZW4sXG4gIGJzUHJlZml4LFxuICBjbGFzc05hbWUsXG4gIHJvb3RDbG9zZUV2ZW50LFxuICBtZW51Um9sZSxcbiAgZGlzYWJsZWQsXG4gIGFjdGl2ZSxcbiAgcmVuZGVyTWVudU9uTW91bnQsXG4gIG1lbnVWYXJpYW50LFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIC8qIE5hdkl0ZW0gaGFzIG5vIGFkZGl0aW9uYWwgbG9naWMsIGl0J3MgcHVyZWx5IHByZXNlbnRhdGlvbmFsLiBDYW4gc2V0IG5hdiBpdGVtIGNsYXNzIGhlcmUgdG8gc3VwcG9ydCBcImFzXCIgKi9cbiAgY29uc3QgbmF2SXRlbVByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeCh1bmRlZmluZWQsICduYXYtaXRlbScpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3hzKERyb3Bkb3duLCB7XG4gICAgcmVmOiByZWYsXG4gICAgLi4ucHJvcHMsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgbmF2SXRlbVByZWZpeCksXG4gICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovX2pzeChEcm9wZG93bi5Ub2dnbGUsIHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGV2ZW50S2V5OiBudWxsLFxuICAgICAgYWN0aXZlOiBhY3RpdmUsXG4gICAgICBkaXNhYmxlZDogZGlzYWJsZWQsXG4gICAgICBjaGlsZEJzUHJlZml4OiBic1ByZWZpeCxcbiAgICAgIGFzOiBOYXZMaW5rLFxuICAgICAgY2hpbGRyZW46IHRpdGxlXG4gICAgfSksIC8qI19fUFVSRV9fKi9fanN4KERyb3Bkb3duLk1lbnUsIHtcbiAgICAgIHJvbGU6IG1lbnVSb2xlLFxuICAgICAgcmVuZGVyT25Nb3VudDogcmVuZGVyTWVudU9uTW91bnQsXG4gICAgICByb290Q2xvc2VFdmVudDogcm9vdENsb3NlRXZlbnQsXG4gICAgICB2YXJpYW50OiBtZW51VmFyaWFudCxcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICAgIH0pXVxuICB9KTtcbn0pO1xuTmF2RHJvcGRvd24uZGlzcGxheU5hbWUgPSAnTmF2RHJvcGRvd24nO1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihOYXZEcm9wZG93biwge1xuICBJdGVtOiBEcm9wZG93bi5JdGVtLFxuICBJdGVtVGV4dDogRHJvcGRvd24uSXRlbVRleHQsXG4gIERpdmlkZXI6IERyb3Bkb3duLkRpdmlkZXIsXG4gIEhlYWRlcjogRHJvcGRvd24uSGVhZGVyXG59KTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IE5hdkl0ZW0gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBjbGFzc05hbWUsXG4gIGJzUHJlZml4LFxuICBhczogQ29tcG9uZW50ID0gJ2RpdicsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgYnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICduYXYtaXRlbScpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5OYXZJdGVtLmRpc3BsYXlOYW1lID0gJ05hdkl0ZW0nO1xuZXhwb3J0IGRlZmF1bHQgTmF2SXRlbTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQW5jaG9yIGZyb20gJ0ByZXN0YXJ0L3VpL0FuY2hvcic7XG5pbXBvcnQgeyB1c2VOYXZJdGVtIH0gZnJvbSAnQHJlc3RhcnQvdWkvTmF2SXRlbSc7XG5pbXBvcnQgeyBtYWtlRXZlbnRLZXkgfSBmcm9tICdAcmVzdGFydC91aS9TZWxlY3RhYmxlQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IE5hdkxpbmsgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgY2xhc3NOYW1lLFxuICBhczogQ29tcG9uZW50ID0gQW5jaG9yLFxuICBhY3RpdmUsXG4gIGV2ZW50S2V5LFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnbmF2LWxpbmsnKTtcbiAgY29uc3QgW25hdkl0ZW1Qcm9wcywgbWV0YV0gPSB1c2VOYXZJdGVtKHtcbiAgICBrZXk6IG1ha2VFdmVudEtleShldmVudEtleSwgcHJvcHMuaHJlZiksXG4gICAgYWN0aXZlLFxuICAgIGRpc2FibGVkLFxuICAgIC4uLnByb3BzXG4gIH0pO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgLi4ucHJvcHMsXG4gICAgLi4ubmF2SXRlbVByb3BzLFxuICAgIHJlZjogcmVmLFxuICAgIGRpc2FibGVkOiBkaXNhYmxlZCxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCwgZGlzYWJsZWQgJiYgJ2Rpc2FibGVkJywgbWV0YS5pc0FjdGl2ZSAmJiAnYWN0aXZlJylcbiAgfSk7XG59KTtcbk5hdkxpbmsuZGlzcGxheU5hbWUgPSAnTmF2TGluayc7XG5leHBvcnQgZGVmYXVsdCBOYXZMaW5rOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBCYXNlT3ZlcmxheSBmcm9tICdAcmVzdGFydC91aS9PdmVybGF5JztcbmltcG9ydCB1c2VFdmVudENhbGxiYWNrIGZyb20gJ0ByZXN0YXJ0L2hvb2tzL3VzZUV2ZW50Q2FsbGJhY2snO1xuaW1wb3J0IHVzZUlzb21vcnBoaWNFZmZlY3QgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlSXNvbW9ycGhpY0VmZmVjdCc7XG5pbXBvcnQgdXNlTWVyZ2VkUmVmcyBmcm9tICdAcmVzdGFydC9ob29rcy91c2VNZXJnZWRSZWZzJztcbmltcG9ydCB1c2VPdmVybGF5T2Zmc2V0IGZyb20gJy4vdXNlT3ZlcmxheU9mZnNldCc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL0ZhZGUnO1xuaW1wb3J0IHNhZmVGaW5kRE9NTm9kZSBmcm9tICcuL3NhZmVGaW5kRE9NTm9kZSc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gd3JhcFJlZnMocHJvcHMsIGFycm93UHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIHJlZlxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IHtcbiAgICByZWY6IGFSZWZcbiAgfSA9IGFycm93UHJvcHM7XG4gIHByb3BzLnJlZiA9IHJlZi5fX3dyYXBwZWQgfHwgKHJlZi5fX3dyYXBwZWQgPSByID0+IHJlZihzYWZlRmluZERPTU5vZGUocikpKTtcbiAgYXJyb3dQcm9wcy5yZWYgPSBhUmVmLl9fd3JhcHBlZCB8fCAoYVJlZi5fX3dyYXBwZWQgPSByID0+IGFSZWYoc2FmZUZpbmRET01Ob2RlKHIpKSk7XG59XG5jb25zdCBPdmVybGF5ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2hpbGRyZW46IG92ZXJsYXksXG4gIHRyYW5zaXRpb24gPSBGYWRlLFxuICBwb3BwZXJDb25maWcgPSB7fSxcbiAgcm9vdENsb3NlID0gZmFsc2UsXG4gIHBsYWNlbWVudCA9ICd0b3AnLFxuICBzaG93OiBvdXRlclNob3cgPSBmYWxzZSxcbiAgLi4ub3V0ZXJQcm9wc1xufSwgb3V0ZXJSZWYpID0+IHtcbiAgY29uc3QgcG9wcGVyUmVmID0gdXNlUmVmKHt9KTtcbiAgY29uc3QgW2ZpcnN0UmVuZGVyZWRTdGF0ZSwgc2V0Rmlyc3RSZW5kZXJlZFN0YXRlXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbcmVmLCBtb2RpZmllcnNdID0gdXNlT3ZlcmxheU9mZnNldChvdXRlclByb3BzLm9mZnNldCk7XG4gIGNvbnN0IG1lcmdlZFJlZiA9IHVzZU1lcmdlZFJlZnMob3V0ZXJSZWYsIHJlZik7XG4gIGNvbnN0IGFjdHVhbFRyYW5zaXRpb24gPSB0cmFuc2l0aW9uID09PSB0cnVlID8gRmFkZSA6IHRyYW5zaXRpb24gfHwgdW5kZWZpbmVkO1xuICBjb25zdCBoYW5kbGVGaXJzdFVwZGF0ZSA9IHVzZUV2ZW50Q2FsbGJhY2soc3RhdGUgPT4ge1xuICAgIHNldEZpcnN0UmVuZGVyZWRTdGF0ZShzdGF0ZSk7XG4gICAgcG9wcGVyQ29uZmlnID09IG51bGwgfHwgcG9wcGVyQ29uZmlnLm9uRmlyc3RVcGRhdGUgPT0gbnVsbCB8fCBwb3BwZXJDb25maWcub25GaXJzdFVwZGF0ZShzdGF0ZSk7XG4gIH0pO1xuICB1c2VJc29tb3JwaGljRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZmlyc3RSZW5kZXJlZFN0YXRlICYmIG91dGVyUHJvcHMudGFyZ2V0KSB7XG4gICAgICAvLyBNdXN0IHdhaXQgZm9yIHRhcmdldCBlbGVtZW50IHRvIHJlc29sdmUgYmVmb3JlIHVwZGF0aW5nIHBvcHBlci5cbiAgICAgIHBvcHBlclJlZi5jdXJyZW50LnNjaGVkdWxlVXBkYXRlID09IG51bGwgfHwgcG9wcGVyUmVmLmN1cnJlbnQuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICB9XG4gIH0sIFtmaXJzdFJlbmRlcmVkU3RhdGUsIG91dGVyUHJvcHMudGFyZ2V0XSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvdXRlclNob3cpIHtcbiAgICAgIHNldEZpcnN0UmVuZGVyZWRTdGF0ZShudWxsKTtcbiAgICB9XG4gIH0sIFtvdXRlclNob3ddKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KEJhc2VPdmVybGF5LCB7XG4gICAgLi4ub3V0ZXJQcm9wcyxcbiAgICByZWY6IG1lcmdlZFJlZixcbiAgICBwb3BwZXJDb25maWc6IHtcbiAgICAgIC4uLnBvcHBlckNvbmZpZyxcbiAgICAgIG1vZGlmaWVyczogbW9kaWZpZXJzLmNvbmNhdChwb3BwZXJDb25maWcubW9kaWZpZXJzIHx8IFtdKSxcbiAgICAgIG9uRmlyc3RVcGRhdGU6IGhhbmRsZUZpcnN0VXBkYXRlXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uOiBhY3R1YWxUcmFuc2l0aW9uLFxuICAgIHJvb3RDbG9zZTogcm9vdENsb3NlLFxuICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgIHNob3c6IG91dGVyU2hvdyxcbiAgICBjaGlsZHJlbjogKG92ZXJsYXlQcm9wcywge1xuICAgICAgYXJyb3dQcm9wcyxcbiAgICAgIHBvcHBlcjogcG9wcGVyT2JqLFxuICAgICAgc2hvd1xuICAgIH0pID0+IHtcbiAgICAgIHZhciBfcG9wcGVyT2JqJHN0YXRlO1xuICAgICAgd3JhcFJlZnMob3ZlcmxheVByb3BzLCBhcnJvd1Byb3BzKTtcbiAgICAgIC8vIE5lZWQgdG8gZ2V0IHBsYWNlbWVudCBmcm9tIHBvcHBlciBvYmplY3QsIGhhbmRsaW5nIGNhc2Ugd2hlbiBvdmVybGF5IGlzIGZsaXBwZWQgdXNpbmcgJ2ZsaXAnIHByb3BcbiAgICAgIGNvbnN0IHVwZGF0ZWRQbGFjZW1lbnQgPSBwb3BwZXJPYmogPT0gbnVsbCA/IHZvaWQgMCA6IHBvcHBlck9iai5wbGFjZW1lbnQ7XG4gICAgICBjb25zdCBwb3BwZXIgPSBPYmplY3QuYXNzaWduKHBvcHBlclJlZi5jdXJyZW50LCB7XG4gICAgICAgIHN0YXRlOiBwb3BwZXJPYmogPT0gbnVsbCA/IHZvaWQgMCA6IHBvcHBlck9iai5zdGF0ZSxcbiAgICAgICAgc2NoZWR1bGVVcGRhdGU6IHBvcHBlck9iaiA9PSBudWxsID8gdm9pZCAwIDogcG9wcGVyT2JqLnVwZGF0ZSxcbiAgICAgICAgcGxhY2VtZW50OiB1cGRhdGVkUGxhY2VtZW50LFxuICAgICAgICBvdXRPZkJvdW5kYXJpZXM6IChwb3BwZXJPYmogPT0gbnVsbCB8fCAoX3BvcHBlck9iaiRzdGF0ZSA9IHBvcHBlck9iai5zdGF0ZSkgPT0gbnVsbCB8fCAoX3BvcHBlck9iaiRzdGF0ZSA9IF9wb3BwZXJPYmokc3RhdGUubW9kaWZpZXJzRGF0YS5oaWRlKSA9PSBudWxsID8gdm9pZCAwIDogX3BvcHBlck9iaiRzdGF0ZS5pc1JlZmVyZW5jZUhpZGRlbikgfHwgZmFsc2UsXG4gICAgICAgIHN0cmF0ZWd5OiBwb3BwZXJDb25maWcuc3RyYXRlZ3lcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGFzRG9uZUluaXRpYWxNZWFzdXJlID0gISFmaXJzdFJlbmRlcmVkU3RhdGU7XG4gICAgICBpZiAodHlwZW9mIG92ZXJsYXkgPT09ICdmdW5jdGlvbicpIHJldHVybiBvdmVybGF5KHtcbiAgICAgICAgLi4ub3ZlcmxheVByb3BzLFxuICAgICAgICBwbGFjZW1lbnQ6IHVwZGF0ZWRQbGFjZW1lbnQsXG4gICAgICAgIHNob3csXG4gICAgICAgIC4uLighdHJhbnNpdGlvbiAmJiBzaG93ICYmIHtcbiAgICAgICAgICBjbGFzc05hbWU6ICdzaG93J1xuICAgICAgICB9KSxcbiAgICAgICAgcG9wcGVyLFxuICAgICAgICBhcnJvd1Byb3BzLFxuICAgICAgICBoYXNEb25lSW5pdGlhbE1lYXN1cmVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jbG9uZUVsZW1lbnQob3ZlcmxheSwge1xuICAgICAgICAuLi5vdmVybGF5UHJvcHMsXG4gICAgICAgIHBsYWNlbWVudDogdXBkYXRlZFBsYWNlbWVudCxcbiAgICAgICAgYXJyb3dQcm9wcyxcbiAgICAgICAgcG9wcGVyLFxuICAgICAgICBoYXNEb25lSW5pdGlhbE1lYXN1cmUsXG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhvdmVybGF5LnByb3BzLmNsYXNzTmFtZSwgIXRyYW5zaXRpb24gJiYgc2hvdyAmJiAnc2hvdycpLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIC4uLm92ZXJsYXkucHJvcHMuc3R5bGUsXG4gICAgICAgICAgLi4ub3ZlcmxheVByb3BzLnN0eWxlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59KTtcbk92ZXJsYXkuZGlzcGxheU5hbWUgPSAnT3ZlcmxheSc7XG5leHBvcnQgZGVmYXVsdCBPdmVybGF5OyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY29udGFpbnMgZnJvbSAnZG9tLWhlbHBlcnMvY29udGFpbnMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNsb25lRWxlbWVudCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJ0ByZXN0YXJ0L2hvb2tzL3VzZVRpbWVvdXQnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5pbXBvcnQgeyB1c2VVbmNvbnRyb2xsZWRQcm9wIH0gZnJvbSAndW5jb250cm9sbGFibGUnO1xuaW1wb3J0IHVzZU1lcmdlZFJlZnMgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlTWVyZ2VkUmVmcyc7XG5pbXBvcnQgeyBnZXRDaGlsZFJlZiB9IGZyb20gJ0ByZXN0YXJ0L3VpL3V0aWxzJztcbmltcG9ydCBPdmVybGF5IGZyb20gJy4vT3ZlcmxheSc7XG5pbXBvcnQgc2FmZUZpbmRET01Ob2RlIGZyb20gJy4vc2FmZUZpbmRET01Ob2RlJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBGcmFnbWVudCBhcyBfRnJhZ21lbnQgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIG5vcm1hbGl6ZURlbGF5KGRlbGF5KSB7XG4gIHJldHVybiBkZWxheSAmJiB0eXBlb2YgZGVsYXkgPT09ICdvYmplY3QnID8gZGVsYXkgOiB7XG4gICAgc2hvdzogZGVsYXksXG4gICAgaGlkZTogZGVsYXlcbiAgfTtcbn1cblxuLy8gU2ltcGxlIGltcGxlbWVudGF0aW9uIG9mIG1vdXNlRW50ZXIgYW5kIG1vdXNlTGVhdmUuXG4vLyBSZWFjdCdzIGJ1aWx0IHZlcnNpb24gaXMgYnJva2VuOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzQyNTFcbi8vIGZvciBjYXNlcyB3aGVuIHRoZSB0cmlnZ2VyIGlzIGRpc2FibGVkIGFuZCBtb3VzZU91dC9PdmVyIGNhbiBjYXVzZSBmbGlja2VyXG4vLyBtb3ZpbmcgZnJvbSBvbmUgY2hpbGQgZWxlbWVudCB0byBhbm90aGVyLlxuZnVuY3Rpb24gaGFuZGxlTW91c2VPdmVyT3V0KFxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1zaGFkb3dcbmhhbmRsZXIsIGFyZ3MsIHJlbGF0ZWROYXRpdmUpIHtcbiAgY29uc3QgW2VdID0gYXJncztcbiAgY29uc3QgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xuICBjb25zdCByZWxhdGVkID0gZS5yZWxhdGVkVGFyZ2V0IHx8IGUubmF0aXZlRXZlbnRbcmVsYXRlZE5hdGl2ZV07XG4gIGlmICgoIXJlbGF0ZWQgfHwgcmVsYXRlZCAhPT0gdGFyZ2V0KSAmJiAhY29udGFpbnModGFyZ2V0LCByZWxhdGVkKSkge1xuICAgIGhhbmRsZXIoLi4uYXJncyk7XG4gIH1cbn1cbmNvbnN0IHRyaWdnZXJUeXBlID0gUHJvcFR5cGVzLm9uZU9mKFsnY2xpY2snLCAnaG92ZXInLCAnZm9jdXMnXSk7XG5jb25zdCBPdmVybGF5VHJpZ2dlciA9ICh7XG4gIHRyaWdnZXIgPSBbJ2hvdmVyJywgJ2ZvY3VzJ10sXG4gIG92ZXJsYXksXG4gIGNoaWxkcmVuLFxuICBwb3BwZXJDb25maWcgPSB7fSxcbiAgc2hvdzogcHJvcHNTaG93LFxuICBkZWZhdWx0U2hvdyA9IGZhbHNlLFxuICBvblRvZ2dsZSxcbiAgZGVsYXk6IHByb3BzRGVsYXksXG4gIHBsYWNlbWVudCxcbiAgZmxpcCA9IHBsYWNlbWVudCAmJiBwbGFjZW1lbnQuaW5kZXhPZignYXV0bycpICE9PSAtMSxcbiAgLi4ucHJvcHNcbn0pID0+IHtcbiAgY29uc3QgdHJpZ2dlck5vZGVSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IG1lcmdlZFJlZiA9IHVzZU1lcmdlZFJlZnModHJpZ2dlck5vZGVSZWYsIGdldENoaWxkUmVmKGNoaWxkcmVuKSk7XG4gIGNvbnN0IHRpbWVvdXQgPSB1c2VUaW1lb3V0KCk7XG4gIGNvbnN0IGhvdmVyU3RhdGVSZWYgPSB1c2VSZWYoJycpO1xuICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VVbmNvbnRyb2xsZWRQcm9wKHByb3BzU2hvdywgZGVmYXVsdFNob3csIG9uVG9nZ2xlKTtcbiAgY29uc3QgZGVsYXkgPSBub3JtYWxpemVEZWxheShwcm9wc0RlbGF5KTtcbiAgY29uc3Qge1xuICAgIG9uRm9jdXMsXG4gICAgb25CbHVyLFxuICAgIG9uQ2xpY2tcbiAgfSA9IHR5cGVvZiBjaGlsZHJlbiAhPT0gJ2Z1bmN0aW9uJyA/IFJlYWN0LkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pLnByb3BzIDoge307XG4gIGNvbnN0IGF0dGFjaFJlZiA9IHIgPT4ge1xuICAgIG1lcmdlZFJlZihzYWZlRmluZERPTU5vZGUocikpO1xuICB9O1xuICBjb25zdCBoYW5kbGVTaG93ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHRpbWVvdXQuY2xlYXIoKTtcbiAgICBob3ZlclN0YXRlUmVmLmN1cnJlbnQgPSAnc2hvdyc7XG4gICAgaWYgKCFkZWxheS5zaG93KSB7XG4gICAgICBzZXRTaG93KHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aW1lb3V0LnNldCgoKSA9PiB7XG4gICAgICBpZiAoaG92ZXJTdGF0ZVJlZi5jdXJyZW50ID09PSAnc2hvdycpIHNldFNob3codHJ1ZSk7XG4gICAgfSwgZGVsYXkuc2hvdyk7XG4gIH0sIFtkZWxheS5zaG93LCBzZXRTaG93LCB0aW1lb3V0XSk7XG4gIGNvbnN0IGhhbmRsZUhpZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgdGltZW91dC5jbGVhcigpO1xuICAgIGhvdmVyU3RhdGVSZWYuY3VycmVudCA9ICdoaWRlJztcbiAgICBpZiAoIWRlbGF5LmhpZGUpIHtcbiAgICAgIHNldFNob3coZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aW1lb3V0LnNldCgoKSA9PiB7XG4gICAgICBpZiAoaG92ZXJTdGF0ZVJlZi5jdXJyZW50ID09PSAnaGlkZScpIHNldFNob3coZmFsc2UpO1xuICAgIH0sIGRlbGF5LmhpZGUpO1xuICB9LCBbZGVsYXkuaGlkZSwgc2V0U2hvdywgdGltZW91dF0pO1xuICBjb25zdCBoYW5kbGVGb2N1cyA9IHVzZUNhbGxiYWNrKCguLi5hcmdzKSA9PiB7XG4gICAgaGFuZGxlU2hvdygpO1xuICAgIG9uRm9jdXMgPT0gbnVsbCB8fCBvbkZvY3VzKC4uLmFyZ3MpO1xuICB9LCBbaGFuZGxlU2hvdywgb25Gb2N1c10pO1xuICBjb25zdCBoYW5kbGVCbHVyID0gdXNlQ2FsbGJhY2soKC4uLmFyZ3MpID0+IHtcbiAgICBoYW5kbGVIaWRlKCk7XG4gICAgb25CbHVyID09IG51bGwgfHwgb25CbHVyKC4uLmFyZ3MpO1xuICB9LCBbaGFuZGxlSGlkZSwgb25CbHVyXSk7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gdXNlQ2FsbGJhY2soKC4uLmFyZ3MpID0+IHtcbiAgICBzZXRTaG93KCFzaG93KTtcbiAgICBvbkNsaWNrID09IG51bGwgfHwgb25DbGljayguLi5hcmdzKTtcbiAgfSwgW29uQ2xpY2ssIHNldFNob3csIHNob3ddKTtcbiAgY29uc3QgaGFuZGxlTW91c2VPdmVyID0gdXNlQ2FsbGJhY2soKC4uLmFyZ3MpID0+IHtcbiAgICBoYW5kbGVNb3VzZU92ZXJPdXQoaGFuZGxlU2hvdywgYXJncywgJ2Zyb21FbGVtZW50Jyk7XG4gIH0sIFtoYW5kbGVTaG93XSk7XG4gIGNvbnN0IGhhbmRsZU1vdXNlT3V0ID0gdXNlQ2FsbGJhY2soKC4uLmFyZ3MpID0+IHtcbiAgICBoYW5kbGVNb3VzZU92ZXJPdXQoaGFuZGxlSGlkZSwgYXJncywgJ3RvRWxlbWVudCcpO1xuICB9LCBbaGFuZGxlSGlkZV0pO1xuICBjb25zdCB0cmlnZ2VycyA9IHRyaWdnZXIgPT0gbnVsbCA/IFtdIDogW10uY29uY2F0KHRyaWdnZXIpO1xuICBjb25zdCB0cmlnZ2VyUHJvcHMgPSB7XG4gICAgcmVmOiBhdHRhY2hSZWZcbiAgfTtcbiAgaWYgKHRyaWdnZXJzLmluZGV4T2YoJ2NsaWNrJykgIT09IC0xKSB7XG4gICAgdHJpZ2dlclByb3BzLm9uQ2xpY2sgPSBoYW5kbGVDbGljaztcbiAgfVxuICBpZiAodHJpZ2dlcnMuaW5kZXhPZignZm9jdXMnKSAhPT0gLTEpIHtcbiAgICB0cmlnZ2VyUHJvcHMub25Gb2N1cyA9IGhhbmRsZUZvY3VzO1xuICAgIHRyaWdnZXJQcm9wcy5vbkJsdXIgPSBoYW5kbGVCbHVyO1xuICB9XG4gIGlmICh0cmlnZ2Vycy5pbmRleE9mKCdob3ZlcicpICE9PSAtMSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcodHJpZ2dlcnMubGVuZ3RoID4gMSwgJ1tyZWFjdC1ib290c3RyYXBdIFNwZWNpZnlpbmcgb25seSB0aGUgYFwiaG92ZXJcImAgdHJpZ2dlciBsaW1pdHMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG92ZXJsYXkgdG8ganVzdCBtb3VzZSB1c2Vycy4gQ29uc2lkZXIgYWxzbyBpbmNsdWRpbmcgdGhlIGBcImZvY3VzXCJgIHRyaWdnZXIgc28gdGhhdCB0b3VjaCBhbmQga2V5Ym9hcmQgb25seSB1c2VycyBjYW4gc2VlIHRoZSBvdmVybGF5IGFzIHdlbGwuJykgOiB2b2lkIDA7XG4gICAgdHJpZ2dlclByb3BzLm9uTW91c2VPdmVyID0gaGFuZGxlTW91c2VPdmVyO1xuICAgIHRyaWdnZXJQcm9wcy5vbk1vdXNlT3V0ID0gaGFuZGxlTW91c2VPdXQ7XG4gIH1cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4cyhfRnJhZ21lbnQsIHtcbiAgICBjaGlsZHJlbjogW3R5cGVvZiBjaGlsZHJlbiA9PT0gJ2Z1bmN0aW9uJyA/IGNoaWxkcmVuKHRyaWdnZXJQcm9wcykgOiAvKiNfX1BVUkVfXyovY2xvbmVFbGVtZW50KGNoaWxkcmVuLCB0cmlnZ2VyUHJvcHMpLCAvKiNfX1BVUkVfXyovX2pzeChPdmVybGF5LCB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIHNob3c6IHNob3csXG4gICAgICBvbkhpZGU6IGhhbmRsZUhpZGUsXG4gICAgICBmbGlwOiBmbGlwLFxuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBwb3BwZXJDb25maWc6IHBvcHBlckNvbmZpZyxcbiAgICAgIHRhcmdldDogdHJpZ2dlck5vZGVSZWYuY3VycmVudCxcbiAgICAgIGNoaWxkcmVuOiBvdmVybGF5XG4gICAgfSldXG4gIH0pO1xufTtcbmV4cG9ydCBkZWZhdWx0IE92ZXJsYXlUcmlnZ2VyOyIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFuY2hvciBmcm9tICdAcmVzdGFydC91aS9BbmNob3InO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IFBhZ2VJdGVtID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYWN0aXZlID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIGNsYXNzTmFtZSxcbiAgc3R5bGUsXG4gIGFjdGl2ZUxhYmVsID0gJyhjdXJyZW50KScsXG4gIGNoaWxkcmVuLFxuICBsaW5rU3R5bGUsXG4gIGxpbmtDbGFzc05hbWUsXG4gIGFzID0gQW5jaG9yLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IGFjdGl2ZSB8fCBkaXNhYmxlZCA/ICdzcGFuJyA6IGFzO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goXCJsaVwiLCB7XG4gICAgcmVmOiByZWYsXG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsICdwYWdlLWl0ZW0nLCB7XG4gICAgICBhY3RpdmUsXG4gICAgICBkaXNhYmxlZFxuICAgIH0pLFxuICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeHMoQ29tcG9uZW50LCB7XG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoJ3BhZ2UtbGluaycsIGxpbmtDbGFzc05hbWUpLFxuICAgICAgc3R5bGU6IGxpbmtTdHlsZSxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgY2hpbGRyZW46IFtjaGlsZHJlbiwgYWN0aXZlICYmIGFjdGl2ZUxhYmVsICYmIC8qI19fUFVSRV9fKi9fanN4KFwic3BhblwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJ2aXN1YWxseS1oaWRkZW5cIixcbiAgICAgICAgY2hpbGRyZW46IGFjdGl2ZUxhYmVsXG4gICAgICB9KV1cbiAgICB9KVxuICB9KTtcbn0pO1xuUGFnZUl0ZW0uZGlzcGxheU5hbWUgPSAnUGFnZUl0ZW0nO1xuZXhwb3J0IGRlZmF1bHQgUGFnZUl0ZW07XG5mdW5jdGlvbiBjcmVhdGVCdXR0b24obmFtZSwgZGVmYXVsdFZhbHVlLCBsYWJlbCA9IG5hbWUpIHtcbiAgY29uc3QgQnV0dG9uID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgICBjaGlsZHJlbixcbiAgICAuLi5wcm9wc1xuICB9LCByZWYpID0+IC8qI19fUFVSRV9fKi9fanN4cyhQYWdlSXRlbSwge1xuICAgIC4uLnByb3BzLFxuICAgIHJlZjogcmVmLFxuICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qL19qc3goXCJzcGFuXCIsIHtcbiAgICAgIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4gfHwgZGVmYXVsdFZhbHVlXG4gICAgfSksIC8qI19fUFVSRV9fKi9fanN4KFwic3BhblwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwidmlzdWFsbHktaGlkZGVuXCIsXG4gICAgICBjaGlsZHJlbjogbGFiZWxcbiAgICB9KV1cbiAgfSkpO1xuICBCdXR0b24uZGlzcGxheU5hbWUgPSBuYW1lO1xuICByZXR1cm4gQnV0dG9uO1xufVxuZXhwb3J0IGNvbnN0IEZpcnN0ID0gY3JlYXRlQnV0dG9uKCdGaXJzdCcsICfCqycpO1xuZXhwb3J0IGNvbnN0IFByZXYgPSBjcmVhdGVCdXR0b24oJ1ByZXYnLCAn4oC5JywgJ1ByZXZpb3VzJyk7XG5leHBvcnQgY29uc3QgRWxsaXBzaXMgPSBjcmVhdGVCdXR0b24oJ0VsbGlwc2lzJywgJ+KApicsICdNb3JlJyk7XG5leHBvcnQgY29uc3QgTmV4dCA9IGNyZWF0ZUJ1dHRvbignTmV4dCcsICfigLonKTtcbmV4cG9ydCBjb25zdCBMYXN0ID0gY3JlYXRlQnV0dG9uKCdMYXN0JywgJ8K7Jyk7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCBQYWdlSXRlbSwgeyBFbGxpcHNpcywgRmlyc3QsIExhc3QsIE5leHQsIFByZXYgfSBmcm9tICcuL1BhZ2VJdGVtJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBQYWdpbmF0aW9uID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIGNsYXNzTmFtZSxcbiAgc2l6ZSxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBjb25zdCBkZWNvcmF0ZWRCc1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3BhZ2luYXRpb24nKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KFwidWxcIiwge1xuICAgIHJlZjogcmVmLFxuICAgIC4uLnByb3BzLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGRlY29yYXRlZEJzUHJlZml4LCBzaXplICYmIGAke2RlY29yYXRlZEJzUHJlZml4fS0ke3NpemV9YClcbiAgfSk7XG59KTtcblBhZ2luYXRpb24uZGlzcGxheU5hbWUgPSAnUGFnaW5hdGlvbic7XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFBhZ2luYXRpb24sIHtcbiAgRmlyc3QsXG4gIFByZXYsXG4gIEVsbGlwc2lzLFxuICBJdGVtOiBQYWdlSXRlbSxcbiAgTmV4dCxcbiAgTGFzdFxufSk7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZVBsYWNlaG9sZGVyIGZyb20gJy4vdXNlUGxhY2Vob2xkZXInO1xuaW1wb3J0IFBsYWNlaG9sZGVyQnV0dG9uIGZyb20gJy4vUGxhY2Vob2xkZXJCdXR0b24nO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IFBsYWNlaG9sZGVyID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYXM6IENvbXBvbmVudCA9ICdzcGFuJyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBjb25zdCBwbGFjZWhvbGRlclByb3BzID0gdXNlUGxhY2Vob2xkZXIocHJvcHMpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgLi4ucGxhY2Vob2xkZXJQcm9wcyxcbiAgICByZWY6IHJlZlxuICB9KTtcbn0pO1xuUGxhY2Vob2xkZXIuZGlzcGxheU5hbWUgPSAnUGxhY2Vob2xkZXInO1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihQbGFjZWhvbGRlciwge1xuICBCdXR0b246IFBsYWNlaG9sZGVyQnV0dG9uXG59KTsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB1c2VQbGFjZWhvbGRlciBmcm9tICcuL3VzZVBsYWNlaG9sZGVyJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBQbGFjZWhvbGRlckJ1dHRvbiA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG4gIGNvbnN0IHBsYWNlaG9sZGVyUHJvcHMgPSB1c2VQbGFjZWhvbGRlcihwcm9wcyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChCdXR0b24sIHtcbiAgICAuLi5wbGFjZWhvbGRlclByb3BzLFxuICAgIHJlZjogcmVmLFxuICAgIGRpc2FibGVkOiB0cnVlLFxuICAgIHRhYkluZGV4OiAtMVxuICB9KTtcbn0pO1xuUGxhY2Vob2xkZXJCdXR0b24uZGlzcGxheU5hbWUgPSAnUGxhY2Vob2xkZXJCdXR0b24nO1xuZXhwb3J0IGRlZmF1bHQgUGxhY2Vob2xkZXJCdXR0b247IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4LCB1c2VJc1JUTCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgUG9wb3ZlckhlYWRlciBmcm9tICcuL1BvcG92ZXJIZWFkZXInO1xuaW1wb3J0IFBvcG92ZXJCb2R5IGZyb20gJy4vUG9wb3ZlckJvZHknO1xuaW1wb3J0IHsgZ2V0T3ZlcmxheURpcmVjdGlvbiB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgZ2V0SW5pdGlhbFBvcHBlclN0eWxlcyBmcm9tICcuL2dldEluaXRpYWxQb3BwZXJTdHlsZXMnO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IFBvcG92ZXIgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgcGxhY2VtZW50ID0gJ3JpZ2h0JyxcbiAgY2xhc3NOYW1lLFxuICBzdHlsZSxcbiAgY2hpbGRyZW4sXG4gIGJvZHksXG4gIGFycm93UHJvcHMsXG4gIGhhc0RvbmVJbml0aWFsTWVhc3VyZSxcbiAgcG9wcGVyLFxuICBzaG93LFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGNvbnN0IGRlY29yYXRlZEJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAncG9wb3ZlcicpO1xuICBjb25zdCBpc1JUTCA9IHVzZUlzUlRMKCk7XG4gIGNvbnN0IFtwcmltYXJ5UGxhY2VtZW50XSA9IChwbGFjZW1lbnQgPT0gbnVsbCA/IHZvaWQgMCA6IHBsYWNlbWVudC5zcGxpdCgnLScpKSB8fCBbXTtcbiAgY29uc3QgYnNEaXJlY3Rpb24gPSBnZXRPdmVybGF5RGlyZWN0aW9uKHByaW1hcnlQbGFjZW1lbnQsIGlzUlRMKTtcbiAgbGV0IGNvbXB1dGVkU3R5bGUgPSBzdHlsZTtcbiAgaWYgKHNob3cgJiYgIWhhc0RvbmVJbml0aWFsTWVhc3VyZSkge1xuICAgIGNvbXB1dGVkU3R5bGUgPSB7XG4gICAgICAuLi5zdHlsZSxcbiAgICAgIC4uLmdldEluaXRpYWxQb3BwZXJTdHlsZXMocG9wcGVyID09IG51bGwgPyB2b2lkIDAgOiBwb3BwZXIuc3RyYXRlZ3kpXG4gICAgfTtcbiAgfVxuICByZXR1cm4gLyojX19QVVJFX18qL19qc3hzKFwiZGl2XCIsIHtcbiAgICByZWY6IHJlZixcbiAgICByb2xlOiBcInRvb2x0aXBcIixcbiAgICBzdHlsZTogY29tcHV0ZWRTdHlsZSxcbiAgICBcIngtcGxhY2VtZW50XCI6IHByaW1hcnlQbGFjZW1lbnQsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgZGVjb3JhdGVkQnNQcmVmaXgsIHByaW1hcnlQbGFjZW1lbnQgJiYgYGJzLXBvcG92ZXItJHtic0RpcmVjdGlvbn1gKSxcbiAgICAuLi5wcm9wcyxcbiAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi9fanN4KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJwb3BvdmVyLWFycm93XCIsXG4gICAgICAuLi5hcnJvd1Byb3BzXG4gICAgfSksIGJvZHkgPyAvKiNfX1BVUkVfXyovX2pzeChQb3BvdmVyQm9keSwge1xuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgfSkgOiBjaGlsZHJlbl1cbiAgfSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oUG9wb3Zlciwge1xuICBIZWFkZXI6IFBvcG92ZXJIZWFkZXIsXG4gIEJvZHk6IFBvcG92ZXJCb2R5LFxuICAvLyBEZWZhdWx0IHBvcG92ZXIgb2Zmc2V0LlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi81YzMyNzY3ZTBlMGRiYWMyZDkzNGJjZGVlMDM3MTlhNjVkM2YxMTg3L2pzL3NyYy9wb3BvdmVyLmpzI0wyOFxuICBQT1BQRVJfT0ZGU0VUOiBbMCwgOF1cbn0pOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgUG9wb3ZlckJvZHkgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBjbGFzc05hbWUsXG4gIGJzUHJlZml4LFxuICBhczogQ29tcG9uZW50ID0gJ2RpdicsXG4gIC4uLnByb3BzXG59LCByZWYpID0+IHtcbiAgYnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdwb3BvdmVyLWJvZHknKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgIHJlZjogcmVmLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4KSxcbiAgICAuLi5wcm9wc1xuICB9KTtcbn0pO1xuUG9wb3ZlckJvZHkuZGlzcGxheU5hbWUgPSAnUG9wb3ZlckJvZHknO1xuZXhwb3J0IGRlZmF1bHQgUG9wb3ZlckJvZHk7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBQb3BvdmVySGVhZGVyID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBic1ByZWZpeCxcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAncG9wb3Zlci1oZWFkZXInKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KENvbXBvbmVudCwge1xuICAgIHJlZjogcmVmLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4KSxcbiAgICAuLi5wcm9wc1xuICB9KTtcbn0pO1xuUG9wb3ZlckhlYWRlci5kaXNwbGF5TmFtZSA9ICdQb3BvdmVySGVhZGVyJztcbmV4cG9ydCBkZWZhdWx0IFBvcG92ZXJIZWFkZXI7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY2xvbmVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4vRWxlbWVudENoaWxkcmVuJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBST1VORF9QUkVDSVNJT04gPSAxMDAwO1xuXG4vKipcbiAqIFZhbGlkYXRlIHRoYXQgY2hpbGRyZW4sIGlmIGFueSwgYXJlIGluc3RhbmNlcyBvZiBgUHJvZ3Jlc3NCYXJgLlxuICovXG5mdW5jdGlvbiBvbmx5UHJvZ3Jlc3NCYXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gcHJvcHNbcHJvcE5hbWVdO1xuICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgbGV0IGVycm9yID0gbnVsbDtcbiAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgY2hpbGQgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBhcmUgdHlwZXMgaW4gYSB3YXkgdGhhdCB3b3JrcyB3aXRoIGxpYnJhcmllcyB0aGF0IHBhdGNoIGFuZCBwcm94eVxuICAgICAqIGNvbXBvbmVudHMgbGlrZSByZWFjdC1ob3QtbG9hZGVyLlxuICAgICAqXG4gICAgICogc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWVhcm9uL3JlYWN0LWhvdC1sb2FkZXIjY2hlY2tpbmctZWxlbWVudC10eXBlc1xuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICBjb25zdCBlbGVtZW50ID0gLyojX19QVVJFX18qL19qc3goUHJvZ3Jlc3NCYXIsIHt9KTtcbiAgICBpZiAoY2hpbGQudHlwZSA9PT0gZWxlbWVudC50eXBlKSByZXR1cm47XG4gICAgY29uc3QgY2hpbGRUeXBlID0gY2hpbGQudHlwZTtcbiAgICBjb25zdCBjaGlsZElkZW50aWZpZXIgPSAvKiNfX1BVUkVfXyovUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpID8gY2hpbGRUeXBlLmRpc3BsYXlOYW1lIHx8IGNoaWxkVHlwZS5uYW1lIHx8IGNoaWxkVHlwZSA6IGNoaWxkO1xuICAgIGVycm9yID0gbmV3IEVycm9yKGBDaGlsZHJlbiBvZiAke2NvbXBvbmVudE5hbWV9IGNhbiBjb250YWluIG9ubHkgUHJvZ3Jlc3NCYXIgYCArIGBjb21wb25lbnRzLiBGb3VuZCAke2NoaWxkSWRlbnRpZmllcn0uYCk7XG4gIH0pO1xuICByZXR1cm4gZXJyb3I7XG59XG5mdW5jdGlvbiBnZXRQZXJjZW50YWdlKG5vdywgbWluLCBtYXgpIHtcbiAgY29uc3QgcGVyY2VudGFnZSA9IChub3cgLSBtaW4pIC8gKG1heCAtIG1pbikgKiAxMDA7XG4gIHJldHVybiBNYXRoLnJvdW5kKHBlcmNlbnRhZ2UgKiBST1VORF9QUkVDSVNJT04pIC8gUk9VTkRfUFJFQ0lTSU9OO1xufVxuZnVuY3Rpb24gcmVuZGVyUHJvZ3Jlc3NCYXIoe1xuICBtaW4sXG4gIG5vdyxcbiAgbWF4LFxuICBsYWJlbCxcbiAgdmlzdWFsbHlIaWRkZW4sXG4gIHN0cmlwZWQsXG4gIGFuaW1hdGVkLFxuICBjbGFzc05hbWUsXG4gIHN0eWxlLFxuICB2YXJpYW50LFxuICBic1ByZWZpeCxcbiAgLi4ucHJvcHNcbn0sIHJlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goXCJkaXZcIiwge1xuICAgIHJlZjogcmVmLFxuICAgIC4uLnByb3BzLFxuICAgIHJvbGU6IFwicHJvZ3Jlc3NiYXJcIixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBgJHtic1ByZWZpeH0tYmFyYCwge1xuICAgICAgW2BiZy0ke3ZhcmlhbnR9YF06IHZhcmlhbnQsXG4gICAgICBbYCR7YnNQcmVmaXh9LWJhci1hbmltYXRlZGBdOiBhbmltYXRlZCxcbiAgICAgIFtgJHtic1ByZWZpeH0tYmFyLXN0cmlwZWRgXTogYW5pbWF0ZWQgfHwgc3RyaXBlZFxuICAgIH0pLFxuICAgIHN0eWxlOiB7XG4gICAgICB3aWR0aDogYCR7Z2V0UGVyY2VudGFnZShub3csIG1pbiwgbWF4KX0lYCxcbiAgICAgIC4uLnN0eWxlXG4gICAgfSxcbiAgICBcImFyaWEtdmFsdWVub3dcIjogbm93LFxuICAgIFwiYXJpYS12YWx1ZW1pblwiOiBtaW4sXG4gICAgXCJhcmlhLXZhbHVlbWF4XCI6IG1heCxcbiAgICBjaGlsZHJlbjogdmlzdWFsbHlIaWRkZW4gPyAvKiNfX1BVUkVfXyovX2pzeChcInNwYW5cIiwge1xuICAgICAgY2xhc3NOYW1lOiBcInZpc3VhbGx5LWhpZGRlblwiLFxuICAgICAgY2hpbGRyZW46IGxhYmVsXG4gICAgfSkgOiBsYWJlbFxuICB9KTtcbn1cbmNvbnN0IFByb2dyZXNzQmFyID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgaXNDaGlsZCA9IGZhbHNlLFxuICAuLi5yZXN0XG59LCByZWYpID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgbWluOiAwLFxuICAgIG1heDogMTAwLFxuICAgIGFuaW1hdGVkOiBmYWxzZSxcbiAgICB2aXN1YWxseUhpZGRlbjogZmFsc2UsXG4gICAgc3RyaXBlZDogZmFsc2UsXG4gICAgLi4ucmVzdFxuICB9O1xuICBwcm9wcy5ic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChwcm9wcy5ic1ByZWZpeCwgJ3Byb2dyZXNzJyk7XG4gIGlmIChpc0NoaWxkKSB7XG4gICAgcmV0dXJuIHJlbmRlclByb2dyZXNzQmFyKHByb3BzLCByZWYpO1xuICB9XG4gIGNvbnN0IHtcbiAgICBtaW4sXG4gICAgbm93LFxuICAgIG1heCxcbiAgICBsYWJlbCxcbiAgICB2aXN1YWxseUhpZGRlbixcbiAgICBzdHJpcGVkLFxuICAgIGFuaW1hdGVkLFxuICAgIGJzUHJlZml4LFxuICAgIHZhcmlhbnQsXG4gICAgY2xhc3NOYW1lLFxuICAgIGNoaWxkcmVuLFxuICAgIC4uLndyYXBwZXJQcm9wc1xuICB9ID0gcHJvcHM7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChcImRpdlwiLCB7XG4gICAgcmVmOiByZWYsXG4gICAgLi4ud3JhcHBlclByb3BzLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4KSxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4gPyBtYXAoY2hpbGRyZW4sIGNoaWxkID0+IC8qI19fUFVSRV9fKi9jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgIGlzQ2hpbGQ6IHRydWVcbiAgICB9KSkgOiByZW5kZXJQcm9ncmVzc0Jhcih7XG4gICAgICBtaW4sXG4gICAgICBub3csXG4gICAgICBtYXgsXG4gICAgICBsYWJlbCxcbiAgICAgIHZpc3VhbGx5SGlkZGVuLFxuICAgICAgc3RyaXBlZCxcbiAgICAgIGFuaW1hdGVkLFxuICAgICAgYnNQcmVmaXgsXG4gICAgICB2YXJpYW50XG4gICAgfSwgcmVmKVxuICB9KTtcbn0pO1xuUHJvZ3Jlc3NCYXIuZGlzcGxheU5hbWUgPSAnUHJvZ3Jlc3NCYXInO1xuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiB0b1BlcmNlbnQobnVtKSB7XG4gIGlmIChudW0gPD0gMCkgcmV0dXJuICcxMDAlJztcbiAgaWYgKG51bSA8IDEpIHJldHVybiBgJHtudW0gKiAxMDB9JWA7XG4gIHJldHVybiBgJHtudW19JWA7XG59XG5jb25zdCBSYXRpbyA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGJzUHJlZml4LFxuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxuICBhc3BlY3RSYXRpbyA9ICcxeDEnLFxuICBzdHlsZSxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3JhdGlvJyk7XG4gIGNvbnN0IGlzQ3VzdG9tUmF0aW8gPSB0eXBlb2YgYXNwZWN0UmF0aW8gPT09ICdudW1iZXInO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goXCJkaXZcIiwge1xuICAgIHJlZjogcmVmLFxuICAgIC4uLnByb3BzLFxuICAgIHN0eWxlOiB7XG4gICAgICAuLi5zdHlsZSxcbiAgICAgIC4uLihpc0N1c3RvbVJhdGlvICYmIHtcbiAgICAgICAgJy0tYnMtYXNwZWN0LXJhdGlvJzogdG9QZXJjZW50KGFzcGVjdFJhdGlvKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhic1ByZWZpeCwgY2xhc3NOYW1lLCAhaXNDdXN0b21SYXRpbyAmJiBgJHtic1ByZWZpeH0tJHthc3BlY3RSYXRpb31gKSxcbiAgICBjaGlsZHJlbjogUmVhY3QuQ2hpbGRyZW4ub25seShjaGlsZHJlbilcbiAgfSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IFJhdGlvOyIsImltcG9ydCB7IFNTUlByb3ZpZGVyIH0gZnJvbSAnQHJlc3RhcnQvdWkvc3NyJztcbmV4cG9ydCBkZWZhdWx0IFNTUlByb3ZpZGVyOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgU3Bpbm5lciA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGJzUHJlZml4LFxuICB2YXJpYW50LFxuICBhbmltYXRpb24gPSAnYm9yZGVyJyxcbiAgc2l6ZSxcbiAgLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuICBhczogQ29tcG9uZW50ID0gJ2RpdicsXG4gIGNsYXNzTmFtZSxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3NwaW5uZXInKTtcbiAgY29uc3QgYnNTcGlubmVyUHJlZml4ID0gYCR7YnNQcmVmaXh9LSR7YW5pbWF0aW9ufWA7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICAuLi5wcm9wcyxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1NwaW5uZXJQcmVmaXgsIHNpemUgJiYgYCR7YnNTcGlubmVyUHJlZml4fS0ke3NpemV9YCwgdmFyaWFudCAmJiBgdGV4dC0ke3ZhcmlhbnR9YClcbiAgfSk7XG59KTtcblNwaW5uZXIuZGlzcGxheU5hbWUgPSAnU3Bpbm5lcic7XG5leHBvcnQgZGVmYXVsdCBTcGlubmVyOyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCBCdXR0b25Hcm91cCBmcm9tICcuL0J1dHRvbkdyb3VwJztcbmltcG9ydCBEcm9wZG93biBmcm9tICcuL0Ryb3Bkb3duJztcbmltcG9ydCB7IGFsaWduUHJvcFR5cGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBwcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBBbiBodG1sIGlkIGF0dHJpYnV0ZSBmb3IgdGhlIFRvZ2dsZSBidXR0b24sIG5lY2Vzc2FyeSBmb3IgYXNzaXN0aXZlIHRlY2hub2xvZ2llcywgc3VjaCBhcyBzY3JlZW4gcmVhZGVycy5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHJlcXVpcmVkXG4gICAqL1xuICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgLyoqXG4gICAqIEFjY2Vzc2libGUgbGFiZWwgZm9yIHRoZSB0b2dnbGU7IHRoZSB2YWx1ZSBvZiBgdGl0bGVgIGlmIG5vdCBzcGVjaWZpZWQuXG4gICAqL1xuICB0b2dnbGVMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgLyoqIEFuIGBocmVmYCBwYXNzZWQgdG8gdGhlIG5vbi10b2dnbGUgQnV0dG9uICovXG4gIGhyZWY6IFByb3BUeXBlcy5zdHJpbmcsXG4gIC8qKiBBbiBhbmNob3IgYHRhcmdldGAgcGFzc2VkIHRvIHRoZSBub24tdG9nZ2xlIEJ1dHRvbiAqL1xuICB0YXJnZXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIC8qKiBBbiBgb25DbGlja2AgaGFuZGxlciBwYXNzZWQgdG8gdGhlIG5vbi10b2dnbGUgQnV0dG9uICovXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAvKiogVGhlIGNvbnRlbnQgb2YgdGhlIG5vbi10b2dnbGUgQnV0dG9uLiAgKi9cbiAgdGl0bGU6IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIC8qKiBBIGB0eXBlYCBwYXNzZWQgdG8gdGhlIG5vbi10b2dnbGUgQnV0dG9uICovXG4gIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIC8qKiBEaXNhYmxlcyBib3RoIEJ1dHRvbnMgICovXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgLyoqXG4gICAqIEFsaWducyB0aGUgZHJvcGRvd24gbWVudS5cbiAgICpcbiAgICogX3NlZSBbRHJvcGRvd25NZW51XSgjZHJvcGRvd24tbWVudS1wcm9wcykgZm9yIG1vcmUgZGV0YWlsc19cbiAgICpcbiAgICogQHR5cGUge1wic3RhcnRcInxcImVuZFwifHsgc206IFwic3RhcnRcInxcImVuZFwiIH18eyBtZDogXCJzdGFydFwifFwiZW5kXCIgfXx7IGxnOiBcInN0YXJ0XCJ8XCJlbmRcIiB9fHsgeGw6IFwic3RhcnRcInxcImVuZFwifXx7IHh4bDogXCJzdGFydFwifFwiZW5kXCJ9IH1cbiAgICovXG4gIGFsaWduOiBhbGlnblByb3BUeXBlLFxuICAvKiogQW4gQVJJQSBhY2Nlc3NpYmxlIHJvbGUgYXBwbGllZCB0byB0aGUgTWVudSBjb21wb25lbnQuIFdoZW4gc2V0IHRvICdtZW51JywgVGhlIGRyb3Bkb3duICovXG4gIG1lbnVSb2xlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAvKiogV2hldGhlciB0byByZW5kZXIgdGhlIGRyb3Bkb3duIG1lbnUgaW4gdGhlIERPTSBiZWZvcmUgdGhlIGZpcnN0IHRpbWUgaXQgaXMgc2hvd24gKi9cbiAgcmVuZGVyTWVudU9uTW91bnQ6IFByb3BUeXBlcy5ib29sLFxuICAvKipcbiAgICogIFdoaWNoIGV2ZW50IHdoZW4gZmlyZWQgb3V0c2lkZSB0aGUgY29tcG9uZW50IHdpbGwgY2F1c2UgaXQgdG8gYmUgY2xvc2VkLlxuICAgKlxuICAgKiBfc2VlIFtEcm9wZG93bk1lbnVdKCNkcm9wZG93bi1tZW51LXByb3BzKSBmb3IgbW9yZSBkZXRhaWxzX1xuICAgKi9cbiAgcm9vdENsb3NlRXZlbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIC8qKlxuICAgKiBBbGxvdyBEcm9wZG93biB0byBmbGlwIGluIGNhc2Ugb2YgYW4gb3ZlcmxhcHBpbmcgb24gdGhlIHJlZmVyZW5jZSBlbGVtZW50LiBGb3IgbW9yZSBpbmZvcm1hdGlvbiByZWZlciB0b1xuICAgKiBQb3BwZXIuanMncyBmbGlwIFtkb2NzXShodHRwczovL3BvcHBlci5qcy5vcmcvZG9jcy92Mi9tb2RpZmllcnMvZmxpcC8pLlxuICAgKlxuICAgKi9cbiAgZmxpcDogUHJvcFR5cGVzLmJvb2wsXG4gIC8qKiBAaWdub3JlICovXG4gIGJzUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAvKiogQGlnbm9yZSAqL1xuICB2YXJpYW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAvKiogQGlnbm9yZSAqL1xuICBzaXplOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG4vKipcbiAqIEEgY29udmVuaWVuY2UgY29tcG9uZW50IGZvciBzaW1wbGUgb3IgZ2VuZXJhbCB1c2Ugc3BsaXQgYnV0dG9uIGRyb3Bkb3ducy4gUmVuZGVycyBhXG4gKiBgQnV0dG9uR3JvdXBgIGNvbnRhaW5pbmcgYSBgQnV0dG9uYCBhbmQgYSBgQnV0dG9uYCB0b2dnbGUgZm9yIHRoZSBgRHJvcGRvd25gLiBBbGwgYGNoaWxkcmVuYFxuICogYXJlIHBhc3NlZCBkaXJlY3RseSB0byB0aGUgZGVmYXVsdCBgRHJvcGRvd24uTWVudWAuIFRoaXMgY29tcG9uZW50IGFjY2VwdHMgYWxsIG9mIFtgRHJvcGRvd25gJ3NcbiAqIHByb3BzXSgjZHJvcGRvd24tcHJvcHMpLlxuICpcbiAqIF9BbGwgdW5rbm93biBwcm9wcyBhcmUgcGFzc2VkIHRocm91Z2ggdG8gdGhlIGBEcm9wZG93bmAgY29tcG9uZW50Ll9cbiAqIFRoZSBCdXR0b24gYHZhcmlhbnRgLCBgc2l6ZWAgYW5kIGBic1ByZWZpeGAgcHJvcHMgYXJlIHBhc3NlZCB0byB0aGUgYnV0dG9uIGFuZCB0b2dnbGUsXG4gKiBhbmQgbWVudS1yZWxhdGVkIHByb3BzIGFyZSBwYXNzZWQgdG8gdGhlIGBEcm9wZG93bi5NZW51YFxuICovXG5jb25zdCBTcGxpdEJ1dHRvbiA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGlkLFxuICBic1ByZWZpeCxcbiAgc2l6ZSxcbiAgdmFyaWFudCxcbiAgdGl0bGUsXG4gIHR5cGUgPSAnYnV0dG9uJyxcbiAgdG9nZ2xlTGFiZWwgPSAnVG9nZ2xlIGRyb3Bkb3duJyxcbiAgY2hpbGRyZW4sXG4gIG9uQ2xpY2ssXG4gIGhyZWYsXG4gIHRhcmdldCxcbiAgbWVudVJvbGUsXG4gIHJlbmRlck1lbnVPbk1vdW50LFxuICByb290Q2xvc2VFdmVudCxcbiAgZmxpcCxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4gLyojX19QVVJFX18qL19qc3hzKERyb3Bkb3duLCB7XG4gIHJlZjogcmVmLFxuICAuLi5wcm9wcyxcbiAgYXM6IEJ1dHRvbkdyb3VwLFxuICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi9fanN4KEJ1dHRvbiwge1xuICAgIHNpemU6IHNpemUsXG4gICAgdmFyaWFudDogdmFyaWFudCxcbiAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWQsXG4gICAgYnNQcmVmaXg6IGJzUHJlZml4LFxuICAgIGhyZWY6IGhyZWYsXG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgb25DbGljazogb25DbGljayxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGNoaWxkcmVuOiB0aXRsZVxuICB9KSwgLyojX19QVVJFX18qL19qc3goRHJvcGRvd24uVG9nZ2xlLCB7XG4gICAgc3BsaXQ6IHRydWUsXG4gICAgaWQ6IGlkLFxuICAgIHNpemU6IHNpemUsXG4gICAgdmFyaWFudDogdmFyaWFudCxcbiAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWQsXG4gICAgY2hpbGRCc1ByZWZpeDogYnNQcmVmaXgsXG4gICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi9fanN4KFwic3BhblwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwidmlzdWFsbHktaGlkZGVuXCIsXG4gICAgICBjaGlsZHJlbjogdG9nZ2xlTGFiZWxcbiAgICB9KVxuICB9KSwgLyojX19QVVJFX18qL19qc3goRHJvcGRvd24uTWVudSwge1xuICAgIHJvbGU6IG1lbnVSb2xlLFxuICAgIHJlbmRlck9uTW91bnQ6IHJlbmRlck1lbnVPbk1vdW50LFxuICAgIHJvb3RDbG9zZUV2ZW50OiByb290Q2xvc2VFdmVudCxcbiAgICBmbGlwOiBmbGlwLFxuICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICB9KV1cbn0pKTtcblNwbGl0QnV0dG9uLnByb3BUeXBlcyA9IHByb3BUeXBlcztcblNwbGl0QnV0dG9uLmRpc3BsYXlOYW1lID0gJ1NwbGl0QnV0dG9uJztcbmV4cG9ydCBkZWZhdWx0IFNwbGl0QnV0dG9uOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCwgdXNlQm9vdHN0cmFwQnJlYWtwb2ludHMsIHVzZUJvb3RzdHJhcE1pbkJyZWFrcG9pbnQgfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IGNyZWF0ZVV0aWxpdHlDbGFzc05hbWUsIHsgcmVzcG9uc2l2ZVByb3BUeXBlIH0gZnJvbSAnLi9jcmVhdGVVdGlsaXR5Q2xhc3Nlcyc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgU3RhY2sgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBhczogQ29tcG9uZW50ID0gJ2RpdicsXG4gIGJzUHJlZml4LFxuICBjbGFzc05hbWUsXG4gIGRpcmVjdGlvbixcbiAgZ2FwLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCBkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/ICdoc3RhY2snIDogJ3ZzdGFjaycpO1xuICBjb25zdCBicmVha3BvaW50cyA9IHVzZUJvb3RzdHJhcEJyZWFrcG9pbnRzKCk7XG4gIGNvbnN0IG1pbkJyZWFrcG9pbnQgPSB1c2VCb290c3RyYXBNaW5CcmVha3BvaW50KCk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICAuLi5wcm9wcyxcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCwgLi4uY3JlYXRlVXRpbGl0eUNsYXNzTmFtZSh7XG4gICAgICBnYXBcbiAgICB9LCBicmVha3BvaW50cywgbWluQnJlYWtwb2ludCkpXG4gIH0pO1xufSk7XG5TdGFjay5kaXNwbGF5TmFtZSA9ICdTdGFjayc7XG5leHBvcnQgZGVmYXVsdCBTdGFjazsiLCJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRhYkNvbnRhaW5lciBmcm9tICcuL1RhYkNvbnRhaW5lcic7XG5pbXBvcnQgVGFiQ29udGVudCBmcm9tICcuL1RhYkNvbnRlbnQnO1xuaW1wb3J0IFRhYlBhbmUgZnJvbSAnLi9UYWJQYW5lJztcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzICovXG5jb25zdCBwcm9wVHlwZXMgPSB7XG4gIGV2ZW50S2V5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gIC8qKlxuICAgKiBDb250ZW50IGZvciB0aGUgdGFiIHRpdGxlLlxuICAgKi9cbiAgdGl0bGU6IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIC8qKlxuICAgKiBUaGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIHRhYi5cbiAgICovXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgLyoqXG4gICAqIENsYXNzIHRvIHBhc3MgdG8gdGhlIHVuZGVybHlpbmcgbmF2IGxpbmsuXG4gICAqL1xuICB0YWJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIC8qKlxuICAgKiBPYmplY3QgY29udGFpbmluZyBhdHRyaWJ1dGVzIHRvIHBhc3MgdG8gdW5kZXJseWluZyBuYXYgbGluay5cbiAgICovXG4gIHRhYkF0dHJzOiBQcm9wVHlwZXMub2JqZWN0XG59O1xuY29uc3QgVGFiID0gKCkgPT4ge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWN0Qm9vdHN0cmFwOiBUaGUgYFRhYmAgY29tcG9uZW50IGlzIG5vdCBtZWFudCB0byBiZSByZW5kZXJlZCEgJyArIFwiSXQncyBhbiBhYnN0cmFjdCBjb21wb25lbnQgdGhhdCBpcyBvbmx5IHZhbGlkIGFzIGEgZGlyZWN0IENoaWxkIG9mIHRoZSBgVGFic2AgQ29tcG9uZW50LiBcIiArICdGb3IgY3VzdG9tIHRhYnMgY29tcG9uZW50cyB1c2UgVGFiUGFuZSBhbmQgVGFic0NvbnRhaW5lciBkaXJlY3RseScpO1xufTtcblRhYi5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFRhYiwge1xuICBDb250YWluZXI6IFRhYkNvbnRhaW5lcixcbiAgQ29udGVudDogVGFiQ29udGVudCxcbiAgUGFuZTogVGFiUGFuZVxufSk7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRhYnMgZnJvbSAnQHJlc3RhcnQvdWkvVGFicyc7XG5pbXBvcnQgZ2V0VGFiVHJhbnNpdGlvbkNvbXBvbmVudCBmcm9tICcuL2dldFRhYlRyYW5zaXRpb25Db21wb25lbnQnO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IFRhYkNvbnRhaW5lciA9ICh7XG4gIHRyYW5zaXRpb24sXG4gIC4uLnByb3BzXG59KSA9PiAvKiNfX1BVUkVfXyovX2pzeChUYWJzLCB7XG4gIC4uLnByb3BzLFxuICB0cmFuc2l0aW9uOiBnZXRUYWJUcmFuc2l0aW9uQ29tcG9uZW50KHRyYW5zaXRpb24pXG59KTtcblRhYkNvbnRhaW5lci5kaXNwbGF5TmFtZSA9ICdUYWJDb250YWluZXInO1xuZXhwb3J0IGRlZmF1bHQgVGFiQ29udGFpbmVyOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgVGFiQ29udGVudCA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKCh7XG4gIGNsYXNzTmFtZSxcbiAgYnNQcmVmaXgsXG4gIGFzOiBDb21wb25lbnQgPSAnZGl2JyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3RhYi1jb250ZW50Jyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeCksXG4gICAgLi4ucHJvcHNcbiAgfSk7XG59KTtcblRhYkNvbnRlbnQuZGlzcGxheU5hbWUgPSAnVGFiQ29udGVudCc7XG5leHBvcnQgZGVmYXVsdCBUYWJDb250ZW50OyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3RhYmxlQ29udGV4dCBmcm9tICdAcmVzdGFydC91aS9TZWxlY3RhYmxlQ29udGV4dCc7XG5pbXBvcnQgVGFiQ29udGV4dCBmcm9tICdAcmVzdGFydC91aS9UYWJDb250ZXh0JztcbmltcG9ydCB7IHVzZVRhYlBhbmVsIH0gZnJvbSAnQHJlc3RhcnQvdWkvVGFiUGFuZWwnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCBGYWRlIGZyb20gJy4vRmFkZSc7XG5pbXBvcnQgZ2V0VGFiVHJhbnNpdGlvbkNvbXBvbmVudCBmcm9tICcuL2dldFRhYlRyYW5zaXRpb25Db21wb25lbnQnO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IFRhYlBhbmUgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgdHJhbnNpdGlvbixcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBjb25zdCBbe1xuICAgIGNsYXNzTmFtZSxcbiAgICAvLyBOZWVkIHRvIGRlZmluZSB0aGUgZGVmYXVsdCBcImFzXCIgZHVyaW5nIHByb3AgZGVzdHJ1Y3R1cmluZyB0byBiZSBjb21wYXRpYmxlIHdpdGggc3R5bGVkLWNvbXBvbmVudHMgZ2l0aHViLmNvbS9yZWFjdC1ib290c3RyYXAvcmVhY3QtYm9vdHN0cmFwL2lzc3Vlcy8zNTk1XG4gICAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAgIC4uLnJlc3RcbiAgfSwge1xuICAgIGlzQWN0aXZlLFxuICAgIG9uRW50ZXIsXG4gICAgb25FbnRlcmluZyxcbiAgICBvbkVudGVyZWQsXG4gICAgb25FeGl0LFxuICAgIG9uRXhpdGluZyxcbiAgICBvbkV4aXRlZCxcbiAgICBtb3VudE9uRW50ZXIsXG4gICAgdW5tb3VudE9uRXhpdCxcbiAgICB0cmFuc2l0aW9uOiBUcmFuc2l0aW9uID0gRmFkZVxuICB9XSA9IHVzZVRhYlBhbmVsKHtcbiAgICAuLi5wcm9wcyxcbiAgICB0cmFuc2l0aW9uOiBnZXRUYWJUcmFuc2l0aW9uQ29tcG9uZW50KHRyYW5zaXRpb24pXG4gIH0pO1xuICBjb25zdCBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICd0YWItcGFuZScpO1xuXG4gIC8vIFdlIHByb3ZpZGUgYW4gZW1wdHkgdGhlIFRhYkNvbnRleHQgc28gYDxOYXY+YHMgaW4gYDxUYWJQYW5lbD5gcyBkb24ndFxuICAvLyBjb25mbGljdCB3aXRoIHRoZSB0b3AgbGV2ZWwgb25lLlxuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goVGFiQ29udGV4dC5Qcm92aWRlciwge1xuICAgIHZhbHVlOiBudWxsLFxuICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChTZWxlY3RhYmxlQ29udGV4dC5Qcm92aWRlciwge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjaGlsZHJlbjogLyojX19QVVJFX18qL19qc3goVHJhbnNpdGlvbiwge1xuICAgICAgICBpbjogaXNBY3RpdmUsXG4gICAgICAgIG9uRW50ZXI6IG9uRW50ZXIsXG4gICAgICAgIG9uRW50ZXJpbmc6IG9uRW50ZXJpbmcsXG4gICAgICAgIG9uRW50ZXJlZDogb25FbnRlcmVkLFxuICAgICAgICBvbkV4aXQ6IG9uRXhpdCxcbiAgICAgICAgb25FeGl0aW5nOiBvbkV4aXRpbmcsXG4gICAgICAgIG9uRXhpdGVkOiBvbkV4aXRlZCxcbiAgICAgICAgbW91bnRPbkVudGVyOiBtb3VudE9uRW50ZXIsXG4gICAgICAgIHVubW91bnRPbkV4aXQ6IHVubW91bnRPbkV4aXQsXG4gICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovX2pzeChDb21wb25lbnQsIHtcbiAgICAgICAgICAuLi5yZXN0LFxuICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIHByZWZpeCwgaXNBY3RpdmUgJiYgJ2FjdGl2ZScpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0pO1xufSk7XG5UYWJQYW5lLmRpc3BsYXlOYW1lID0gJ1RhYlBhbmUnO1xuZXhwb3J0IGRlZmF1bHQgVGFiUGFuZTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IFRhYmxlID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIGNsYXNzTmFtZSxcbiAgc3RyaXBlZCxcbiAgYm9yZGVyZWQsXG4gIGJvcmRlcmxlc3MsXG4gIGhvdmVyLFxuICBzaXplLFxuICB2YXJpYW50LFxuICByZXNwb25zaXZlLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGNvbnN0IGRlY29yYXRlZEJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAndGFibGUnKTtcbiAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBkZWNvcmF0ZWRCc1ByZWZpeCwgdmFyaWFudCAmJiBgJHtkZWNvcmF0ZWRCc1ByZWZpeH0tJHt2YXJpYW50fWAsIHNpemUgJiYgYCR7ZGVjb3JhdGVkQnNQcmVmaXh9LSR7c2l6ZX1gLCBzdHJpcGVkICYmIGAke2RlY29yYXRlZEJzUHJlZml4fS0ke3R5cGVvZiBzdHJpcGVkID09PSAnc3RyaW5nJyA/IGBzdHJpcGVkLSR7c3RyaXBlZH1gIDogJ3N0cmlwZWQnfWAsIGJvcmRlcmVkICYmIGAke2RlY29yYXRlZEJzUHJlZml4fS1ib3JkZXJlZGAsIGJvcmRlcmxlc3MgJiYgYCR7ZGVjb3JhdGVkQnNQcmVmaXh9LWJvcmRlcmxlc3NgLCBob3ZlciAmJiBgJHtkZWNvcmF0ZWRCc1ByZWZpeH0taG92ZXJgKTtcbiAgY29uc3QgdGFibGUgPSAvKiNfX1BVUkVfXyovX2pzeChcInRhYmxlXCIsIHtcbiAgICAuLi5wcm9wcyxcbiAgICBjbGFzc05hbWU6IGNsYXNzZXMsXG4gICAgcmVmOiByZWZcbiAgfSk7XG4gIGlmIChyZXNwb25zaXZlKSB7XG4gICAgbGV0IHJlc3BvbnNpdmVDbGFzcyA9IGAke2RlY29yYXRlZEJzUHJlZml4fS1yZXNwb25zaXZlYDtcbiAgICBpZiAodHlwZW9mIHJlc3BvbnNpdmUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXNwb25zaXZlQ2xhc3MgPSBgJHtyZXNwb25zaXZlQ2xhc3N9LSR7cmVzcG9uc2l2ZX1gO1xuICAgIH1cbiAgICByZXR1cm4gLyojX19QVVJFX18qL19qc3goXCJkaXZcIiwge1xuICAgICAgY2xhc3NOYW1lOiByZXNwb25zaXZlQ2xhc3MsXG4gICAgICBjaGlsZHJlbjogdGFibGVcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGFibGU7XG59KTtcbmV4cG9ydCBkZWZhdWx0IFRhYmxlOyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVVuY29udHJvbGxlZCB9IGZyb20gJ3VuY29udHJvbGxhYmxlJztcbmltcG9ydCBCYXNlVGFicyBmcm9tICdAcmVzdGFydC91aS9UYWJzJztcbmltcG9ydCBOYXYgZnJvbSAnLi9OYXYnO1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnLi9OYXZMaW5rJztcbmltcG9ydCBOYXZJdGVtIGZyb20gJy4vTmF2SXRlbSc7XG5pbXBvcnQgVGFiQ29udGVudCBmcm9tICcuL1RhYkNvbnRlbnQnO1xuaW1wb3J0IFRhYlBhbmUgZnJvbSAnLi9UYWJQYW5lJztcbmltcG9ydCB7IGZvckVhY2gsIG1hcCB9IGZyb20gJy4vRWxlbWVudENoaWxkcmVuJztcbmltcG9ydCBnZXRUYWJUcmFuc2l0aW9uQ29tcG9uZW50IGZyb20gJy4vZ2V0VGFiVHJhbnNpdGlvbkNvbXBvbmVudCc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gZ2V0RGVmYXVsdEFjdGl2ZUtleShjaGlsZHJlbikge1xuICBsZXQgZGVmYXVsdEFjdGl2ZUtleTtcbiAgZm9yRWFjaChjaGlsZHJlbiwgY2hpbGQgPT4ge1xuICAgIGlmIChkZWZhdWx0QWN0aXZlS2V5ID09IG51bGwpIHtcbiAgICAgIGRlZmF1bHRBY3RpdmVLZXkgPSBjaGlsZC5wcm9wcy5ldmVudEtleTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZGVmYXVsdEFjdGl2ZUtleTtcbn1cbmZ1bmN0aW9uIHJlbmRlclRhYihjaGlsZCkge1xuICBjb25zdCB7XG4gICAgdGl0bGUsXG4gICAgZXZlbnRLZXksXG4gICAgZGlzYWJsZWQsXG4gICAgdGFiQ2xhc3NOYW1lLFxuICAgIHRhYkF0dHJzLFxuICAgIGlkXG4gIH0gPSBjaGlsZC5wcm9wcztcbiAgaWYgKHRpdGxlID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goTmF2SXRlbSwge1xuICAgIGFzOiBcImxpXCIsXG4gICAgcm9sZTogXCJwcmVzZW50YXRpb25cIixcbiAgICBjaGlsZHJlbjogLyojX19QVVJFX18qL19qc3goTmF2TGluaywge1xuICAgICAgYXM6IFwiYnV0dG9uXCIsXG4gICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgZXZlbnRLZXk6IGV2ZW50S2V5LFxuICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkLFxuICAgICAgaWQ6IGlkLFxuICAgICAgY2xhc3NOYW1lOiB0YWJDbGFzc05hbWUsXG4gICAgICAuLi50YWJBdHRycyxcbiAgICAgIGNoaWxkcmVuOiB0aXRsZVxuICAgIH0pXG4gIH0pO1xufVxuY29uc3QgVGFicyA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIGlkLFxuICAgIG9uU2VsZWN0LFxuICAgIHRyYW5zaXRpb24sXG4gICAgbW91bnRPbkVudGVyID0gZmFsc2UsXG4gICAgdW5tb3VudE9uRXhpdCA9IGZhbHNlLFxuICAgIHZhcmlhbnQgPSAndGFicycsXG4gICAgY2hpbGRyZW4sXG4gICAgYWN0aXZlS2V5ID0gZ2V0RGVmYXVsdEFjdGl2ZUtleShjaGlsZHJlbiksXG4gICAgLi4uY29udHJvbGxlZFByb3BzXG4gIH0gPSB1c2VVbmNvbnRyb2xsZWQocHJvcHMsIHtcbiAgICBhY3RpdmVLZXk6ICdvblNlbGVjdCdcbiAgfSk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeHMoQmFzZVRhYnMsIHtcbiAgICBpZDogaWQsXG4gICAgYWN0aXZlS2V5OiBhY3RpdmVLZXksXG4gICAgb25TZWxlY3Q6IG9uU2VsZWN0LFxuICAgIHRyYW5zaXRpb246IGdldFRhYlRyYW5zaXRpb25Db21wb25lbnQodHJhbnNpdGlvbiksXG4gICAgbW91bnRPbkVudGVyOiBtb3VudE9uRW50ZXIsXG4gICAgdW5tb3VudE9uRXhpdDogdW5tb3VudE9uRXhpdCxcbiAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi9fanN4KE5hdiwge1xuICAgICAgaWQ6IGlkLFxuICAgICAgLi4uY29udHJvbGxlZFByb3BzLFxuICAgICAgcm9sZTogXCJ0YWJsaXN0XCIsXG4gICAgICBhczogXCJ1bFwiLFxuICAgICAgdmFyaWFudDogdmFyaWFudCxcbiAgICAgIGNoaWxkcmVuOiBtYXAoY2hpbGRyZW4sIHJlbmRlclRhYilcbiAgICB9KSwgLyojX19QVVJFX18qL19qc3goVGFiQ29udGVudCwge1xuICAgICAgY2hpbGRyZW46IG1hcChjaGlsZHJlbiwgY2hpbGQgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZFByb3BzID0ge1xuICAgICAgICAgIC4uLmNoaWxkLnByb3BzXG4gICAgICAgIH07XG4gICAgICAgIGRlbGV0ZSBjaGlsZFByb3BzLnRpdGxlO1xuICAgICAgICBkZWxldGUgY2hpbGRQcm9wcy5kaXNhYmxlZDtcbiAgICAgICAgZGVsZXRlIGNoaWxkUHJvcHMudGFiQ2xhc3NOYW1lO1xuICAgICAgICBkZWxldGUgY2hpbGRQcm9wcy50YWJBdHRycztcbiAgICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4KFRhYlBhbmUsIHtcbiAgICAgICAgICAuLi5jaGlsZFByb3BzXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9KV1cbiAgfSk7XG59O1xuVGFicy5kaXNwbGF5TmFtZSA9ICdUYWJzJztcbmV4cG9ydCBkZWZhdWx0IFRhYnM7IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlVGltZW91dCc7XG5pbXBvcnQgVG9hc3RGYWRlIGZyb20gJy4vVG9hc3RGYWRlJztcbmltcG9ydCBUb2FzdEhlYWRlciBmcm9tICcuL1RvYXN0SGVhZGVyJztcbmltcG9ydCBUb2FzdEJvZHkgZnJvbSAnLi9Ub2FzdEJvZHknO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCBUb2FzdENvbnRleHQgZnJvbSAnLi9Ub2FzdENvbnRleHQnO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IFRvYXN0ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIGNsYXNzTmFtZSxcbiAgdHJhbnNpdGlvbjogVHJhbnNpdGlvbiA9IFRvYXN0RmFkZSxcbiAgc2hvdyA9IHRydWUsXG4gIGFuaW1hdGlvbiA9IHRydWUsXG4gIGRlbGF5ID0gNTAwMCxcbiAgYXV0b2hpZGUgPSBmYWxzZSxcbiAgb25DbG9zZSxcbiAgb25FbnRlcmVkLFxuICBvbkV4aXQsXG4gIG9uRXhpdGluZyxcbiAgb25FbnRlcixcbiAgb25FbnRlcmluZyxcbiAgb25FeGl0ZWQsXG4gIGJnLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAndG9hc3QnKTtcblxuICAvLyBXZSB1c2UgcmVmcyBmb3IgdGhlc2UsIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byByZXN0YXJ0IHRoZSBhdXRvaGlkZVxuICAvLyB0aW1lciBpbiBjYXNlIHRoZXNlIHZhbHVlcyBjaGFuZ2UuXG4gIGNvbnN0IGRlbGF5UmVmID0gdXNlUmVmKGRlbGF5KTtcbiAgY29uc3Qgb25DbG9zZVJlZiA9IHVzZVJlZihvbkNsb3NlKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkZWxheVJlZi5jdXJyZW50ID0gZGVsYXk7XG4gICAgb25DbG9zZVJlZi5jdXJyZW50ID0gb25DbG9zZTtcbiAgfSwgW2RlbGF5LCBvbkNsb3NlXSk7XG4gIGNvbnN0IGF1dG9oaWRlVGltZW91dCA9IHVzZVRpbWVvdXQoKTtcbiAgY29uc3QgYXV0b2hpZGVUb2FzdCA9ICEhKGF1dG9oaWRlICYmIHNob3cpO1xuICBjb25zdCBhdXRvaGlkZUZ1bmMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGF1dG9oaWRlVG9hc3QpIHtcbiAgICAgIG9uQ2xvc2VSZWYuY3VycmVudCA9PSBudWxsIHx8IG9uQ2xvc2VSZWYuY3VycmVudCgpO1xuICAgIH1cbiAgfSwgW2F1dG9oaWRlVG9hc3RdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBPbmx5IHJlc2V0IHRpbWVyIGlmIHNob3cgb3IgYXV0b2hpZGUgY2hhbmdlcy5cbiAgICBhdXRvaGlkZVRpbWVvdXQuc2V0KGF1dG9oaWRlRnVuYywgZGVsYXlSZWYuY3VycmVudCk7XG4gIH0sIFthdXRvaGlkZVRpbWVvdXQsIGF1dG9oaWRlRnVuY10pO1xuICBjb25zdCB0b2FzdENvbnRleHQgPSB1c2VNZW1vKCgpID0+ICh7XG4gICAgb25DbG9zZVxuICB9KSwgW29uQ2xvc2VdKTtcbiAgY29uc3QgaGFzQW5pbWF0aW9uID0gISEoVHJhbnNpdGlvbiAmJiBhbmltYXRpb24pO1xuICBjb25zdCB0b2FzdCA9IC8qI19fUFVSRV9fKi9fanN4KFwiZGl2XCIsIHtcbiAgICAuLi5wcm9wcyxcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoYnNQcmVmaXgsIGNsYXNzTmFtZSwgYmcgJiYgYGJnLSR7Ymd9YCwgIWhhc0FuaW1hdGlvbiAmJiAoc2hvdyA/ICdzaG93JyA6ICdoaWRlJykpLFxuICAgIHJvbGU6IFwiYWxlcnRcIixcbiAgICBcImFyaWEtbGl2ZVwiOiBcImFzc2VydGl2ZVwiLFxuICAgIFwiYXJpYS1hdG9taWNcIjogXCJ0cnVlXCJcbiAgfSk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeChUb2FzdENvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZTogdG9hc3RDb250ZXh0LFxuICAgIGNoaWxkcmVuOiBoYXNBbmltYXRpb24gJiYgVHJhbnNpdGlvbiA/IC8qI19fUFVSRV9fKi9fanN4KFRyYW5zaXRpb24sIHtcbiAgICAgIGluOiBzaG93LFxuICAgICAgb25FbnRlcjogb25FbnRlcixcbiAgICAgIG9uRW50ZXJpbmc6IG9uRW50ZXJpbmcsXG4gICAgICBvbkVudGVyZWQ6IG9uRW50ZXJlZCxcbiAgICAgIG9uRXhpdDogb25FeGl0LFxuICAgICAgb25FeGl0aW5nOiBvbkV4aXRpbmcsXG4gICAgICBvbkV4aXRlZDogb25FeGl0ZWQsXG4gICAgICB1bm1vdW50T25FeGl0OiB0cnVlLFxuICAgICAgY2hpbGRyZW46IHRvYXN0XG4gICAgfSkgOiB0b2FzdFxuICB9KTtcbn0pO1xuVG9hc3QuZGlzcGxheU5hbWUgPSAnVG9hc3QnO1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihUb2FzdCwge1xuICBCb2R5OiBUb2FzdEJvZHksXG4gIEhlYWRlcjogVG9hc3RIZWFkZXJcbn0pOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgVG9hc3RCb2R5ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgY2xhc3NOYW1lLFxuICBic1ByZWZpeCxcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAndG9hc3QtYm9keScpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpLFxuICAgIC4uLnByb3BzXG4gIH0pO1xufSk7XG5Ub2FzdEJvZHkuZGlzcGxheU5hbWUgPSAnVG9hc3RCb2R5JztcbmV4cG9ydCBkZWZhdWx0IFRvYXN0Qm9keTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IHBvc2l0aW9uQ2xhc3NlcyA9IHtcbiAgJ3RvcC1zdGFydCc6ICd0b3AtMCBzdGFydC0wJyxcbiAgJ3RvcC1jZW50ZXInOiAndG9wLTAgc3RhcnQtNTAgdHJhbnNsYXRlLW1pZGRsZS14JyxcbiAgJ3RvcC1lbmQnOiAndG9wLTAgZW5kLTAnLFxuICAnbWlkZGxlLXN0YXJ0JzogJ3RvcC01MCBzdGFydC0wIHRyYW5zbGF0ZS1taWRkbGUteScsXG4gICdtaWRkbGUtY2VudGVyJzogJ3RvcC01MCBzdGFydC01MCB0cmFuc2xhdGUtbWlkZGxlJyxcbiAgJ21pZGRsZS1lbmQnOiAndG9wLTUwIGVuZC0wIHRyYW5zbGF0ZS1taWRkbGUteScsXG4gICdib3R0b20tc3RhcnQnOiAnYm90dG9tLTAgc3RhcnQtMCcsXG4gICdib3R0b20tY2VudGVyJzogJ2JvdHRvbS0wIHN0YXJ0LTUwIHRyYW5zbGF0ZS1taWRkbGUteCcsXG4gICdib3R0b20tZW5kJzogJ2JvdHRvbS0wIGVuZC0wJ1xufTtcbmNvbnN0IFRvYXN0Q29udGFpbmVyID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIHBvc2l0aW9uLFxuICBjb250YWluZXJQb3NpdGlvbixcbiAgY2xhc3NOYW1lLFxuICAvLyBOZWVkIHRvIGRlZmluZSB0aGUgZGVmYXVsdCBcImFzXCIgZHVyaW5nIHByb3AgZGVzdHJ1Y3R1cmluZyB0byBiZSBjb21wYXRpYmxlIHdpdGggc3R5bGVkLWNvbXBvbmVudHMgZ2l0aHViLmNvbS9yZWFjdC1ib290c3RyYXAvcmVhY3QtYm9vdHN0cmFwL2lzc3Vlcy8zNTk1XG4gIGFzOiBDb21wb25lbnQgPSAnZGl2JyxcbiAgLi4ucHJvcHNcbn0sIHJlZikgPT4ge1xuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3RvYXN0LWNvbnRhaW5lcicpO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQ29tcG9uZW50LCB7XG4gICAgcmVmOiByZWYsXG4gICAgLi4ucHJvcHMsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGJzUHJlZml4LCBwb3NpdGlvbiAmJiBwb3NpdGlvbkNsYXNzZXNbcG9zaXRpb25dLCBjb250YWluZXJQb3NpdGlvbiAmJiBgcG9zaXRpb24tJHtjb250YWluZXJQb3NpdGlvbn1gLCBjbGFzc05hbWUpXG4gIH0pO1xufSk7XG5Ub2FzdENvbnRhaW5lci5kaXNwbGF5TmFtZSA9ICdUb2FzdENvbnRhaW5lcic7XG5leHBvcnQgZGVmYXVsdCBUb2FzdENvbnRhaW5lcjsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuY29uc3QgVG9hc3RDb250ZXh0ID0gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUNvbnRleHQoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG4gIG9uQ2xvc2UoKSB7fVxufSk7XG5leHBvcnQgZGVmYXVsdCBUb2FzdENvbnRleHQ7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRU5URVJJTkcsIEVYSVRJTkcgfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwL1RyYW5zaXRpb24nO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9GYWRlJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBmYWRlU3R5bGVzID0ge1xuICBbRU5URVJJTkddOiAnc2hvd2luZycsXG4gIFtFWElUSU5HXTogJ3Nob3dpbmcgc2hvdydcbn07XG5jb25zdCBUb2FzdEZhZGUgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4gLyojX19QVVJFX18qL19qc3goRmFkZSwge1xuICAuLi5wcm9wcyxcbiAgcmVmOiByZWYsXG4gIHRyYW5zaXRpb25DbGFzc2VzOiBmYWRlU3R5bGVzXG59KSk7XG5Ub2FzdEZhZGUuZGlzcGxheU5hbWUgPSAnVG9hc3RGYWRlJztcbmV4cG9ydCBkZWZhdWx0IFRvYXN0RmFkZTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IENsb3NlQnV0dG9uIGZyb20gJy4vQ2xvc2VCdXR0b24nO1xuaW1wb3J0IFRvYXN0Q29udGV4dCBmcm9tICcuL1RvYXN0Q29udGV4dCc7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuY29uc3QgVG9hc3RIZWFkZXIgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgY2xvc2VMYWJlbCA9ICdDbG9zZScsXG4gIGNsb3NlVmFyaWFudCxcbiAgY2xvc2VCdXR0b24gPSB0cnVlLFxuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAndG9hc3QtaGVhZGVyJyk7XG4gIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KFRvYXN0Q29udGV4dCk7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gdXNlRXZlbnRDYWxsYmFjayhlID0+IHtcbiAgICBjb250ZXh0ID09IG51bGwgfHwgY29udGV4dC5vbkNsb3NlID09IG51bGwgfHwgY29udGV4dC5vbkNsb3NlKGUpO1xuICB9KTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fanN4cyhcImRpdlwiLCB7XG4gICAgcmVmOiByZWYsXG4gICAgLi4ucHJvcHMsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGJzUHJlZml4LCBjbGFzc05hbWUpLFxuICAgIGNoaWxkcmVuOiBbY2hpbGRyZW4sIGNsb3NlQnV0dG9uICYmIC8qI19fUFVSRV9fKi9fanN4KENsb3NlQnV0dG9uLCB7XG4gICAgICBcImFyaWEtbGFiZWxcIjogY2xvc2VMYWJlbCxcbiAgICAgIHZhcmlhbnQ6IGNsb3NlVmFyaWFudCxcbiAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgICAgXCJkYXRhLWRpc21pc3NcIjogXCJ0b2FzdFwiXG4gICAgfSldXG4gIH0pO1xufSk7XG5Ub2FzdEhlYWRlci5kaXNwbGF5TmFtZSA9ICdUb2FzdEhlYWRlcic7XG5leHBvcnQgZGVmYXVsdCBUb2FzdEhlYWRlcjsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL0J1dHRvbic7XG5pbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgRnJhZ21lbnQgYXMgX0ZyYWdtZW50IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBub29wID0gKCkgPT4gdW5kZWZpbmVkO1xuY29uc3QgVG9nZ2xlQnV0dG9uID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoKHtcbiAgYnNQcmVmaXgsXG4gIG5hbWUsXG4gIGNsYXNzTmFtZSxcbiAgY2hlY2tlZCxcbiAgdHlwZSxcbiAgb25DaGFuZ2UsXG4gIHZhbHVlLFxuICBkaXNhYmxlZCxcbiAgaWQsXG4gIGlucHV0UmVmLFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYnRuLWNoZWNrJyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX2pzeHMoX0ZyYWdtZW50LCB7XG4gICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovX2pzeChcImlucHV0XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogYnNQcmVmaXgsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHJlZjogaW5wdXRSZWYsXG4gICAgICBhdXRvQ29tcGxldGU6IFwib2ZmXCIsXG4gICAgICBjaGVja2VkOiAhIWNoZWNrZWQsXG4gICAgICBkaXNhYmxlZDogISFkaXNhYmxlZCxcbiAgICAgIG9uQ2hhbmdlOiBvbkNoYW5nZSB8fCBub29wLFxuICAgICAgaWQ6IGlkXG4gICAgfSksIC8qI19fUFVSRV9fKi9fanN4KEJ1dHRvbiwge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICByZWY6IHJlZixcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGRpc2FibGVkICYmICdkaXNhYmxlZCcpLFxuICAgICAgdHlwZTogdW5kZWZpbmVkLFxuICAgICAgcm9sZTogdW5kZWZpbmVkLFxuICAgICAgYXM6IFwibGFiZWxcIixcbiAgICAgIGh0bWxGb3I6IGlkXG4gICAgfSldXG4gIH0pO1xufSk7XG5Ub2dnbGVCdXR0b24uZGlzcGxheU5hbWUgPSAnVG9nZ2xlQnV0dG9uJztcbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZUJ1dHRvbjsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgeyB1c2VVbmNvbnRyb2xsZWQgfSBmcm9tICd1bmNvbnRyb2xsYWJsZSc7XG5pbXBvcnQgY2hhaW5GdW5jdGlvbiBmcm9tICcuL2NyZWF0ZUNoYWluZWRGdW5jdGlvbic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICcuL0VsZW1lbnRDaGlsZHJlbic7XG5pbXBvcnQgQnV0dG9uR3JvdXAgZnJvbSAnLi9CdXR0b25Hcm91cCc7XG5pbXBvcnQgVG9nZ2xlQnV0dG9uIGZyb20gJy4vVG9nZ2xlQnV0dG9uJztcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5jb25zdCBUb2dnbGVCdXR0b25Hcm91cCA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjaGlsZHJlbixcbiAgICB0eXBlID0gJ3JhZGlvJyxcbiAgICBuYW1lLFxuICAgIHZhbHVlLFxuICAgIG9uQ2hhbmdlLFxuICAgIHZlcnRpY2FsID0gZmFsc2UsXG4gICAgLi4uY29udHJvbGxlZFByb3BzXG4gIH0gPSB1c2VVbmNvbnRyb2xsZWQocHJvcHMsIHtcbiAgICB2YWx1ZTogJ29uQ2hhbmdlJ1xuICB9KTtcbiAgY29uc3QgZ2V0VmFsdWVzID0gKCkgPT4gdmFsdWUgPT0gbnVsbCA/IFtdIDogW10uY29uY2F0KHZhbHVlKTtcbiAgY29uc3QgaGFuZGxlVG9nZ2xlID0gKGlucHV0VmFsLCBldmVudCkgPT4ge1xuICAgIGlmICghb25DaGFuZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdmFsdWVzID0gZ2V0VmFsdWVzKCk7XG4gICAgY29uc3QgaXNBY3RpdmUgPSB2YWx1ZXMuaW5kZXhPZihpbnB1dFZhbCkgIT09IC0xO1xuICAgIGlmICh0eXBlID09PSAncmFkaW8nKSB7XG4gICAgICBpZiAoIWlzQWN0aXZlKSBvbkNoYW5nZShpbnB1dFZhbCwgZXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIG9uQ2hhbmdlKHZhbHVlcy5maWx0ZXIobiA9PiBuICE9PSBpbnB1dFZhbCksIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25DaGFuZ2UoWy4uLnZhbHVlcywgaW5wdXRWYWxdLCBldmVudCk7XG4gICAgfVxuICB9O1xuICAhKHR5cGUgIT09ICdyYWRpbycgfHwgISFuYW1lKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgJ0EgYG5hbWVgIGlzIHJlcXVpcmVkIHRvIGdyb3VwIHRoZSB0b2dnbGUgYnV0dG9ucyB3aGVuIHRoZSBgdHlwZWAgJyArICdpcyBzZXQgdG8gXCJyYWRpb1wiJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICByZXR1cm4gLyojX19QVVJFX18qL19qc3goQnV0dG9uR3JvdXAsIHtcbiAgICAuLi5jb250cm9sbGVkUHJvcHMsXG4gICAgcmVmOiByZWYsXG4gICAgdmVydGljYWw6IHZlcnRpY2FsLFxuICAgIGNoaWxkcmVuOiBtYXAoY2hpbGRyZW4sIGNoaWxkID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IGdldFZhbHVlcygpO1xuICAgICAgY29uc3Qge1xuICAgICAgICB2YWx1ZTogY2hpbGRWYWwsXG4gICAgICAgIG9uQ2hhbmdlOiBjaGlsZE9uQ2hhbmdlXG4gICAgICB9ID0gY2hpbGQucHJvcHM7XG4gICAgICBjb25zdCBoYW5kbGVyID0gZSA9PiBoYW5kbGVUb2dnbGUoY2hpbGRWYWwsIGUpO1xuICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgbmFtZTogY2hpbGQubmFtZSB8fCBuYW1lLFxuICAgICAgICBjaGVja2VkOiB2YWx1ZXMuaW5kZXhPZihjaGlsZFZhbCkgIT09IC0xLFxuICAgICAgICBvbkNoYW5nZTogY2hhaW5GdW5jdGlvbihjaGlsZE9uQ2hhbmdlLCBoYW5kbGVyKVxuICAgICAgfSk7XG4gICAgfSlcbiAgfSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oVG9nZ2xlQnV0dG9uR3JvdXAsIHtcbiAgQnV0dG9uOiBUb2dnbGVCdXR0b25cbn0pOyIsIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCwgdXNlSXNSVEwgfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IHsgZ2V0T3ZlcmxheURpcmVjdGlvbiB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgZ2V0SW5pdGlhbFBvcHBlclN0eWxlcyBmcm9tICcuL2dldEluaXRpYWxQb3BwZXJTdHlsZXMnO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IFRvb2x0aXAgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoe1xuICBic1ByZWZpeCxcbiAgcGxhY2VtZW50ID0gJ3JpZ2h0JyxcbiAgY2xhc3NOYW1lLFxuICBzdHlsZSxcbiAgY2hpbGRyZW4sXG4gIGFycm93UHJvcHMsXG4gIGhhc0RvbmVJbml0aWFsTWVhc3VyZSxcbiAgcG9wcGVyLFxuICBzaG93LFxuICAuLi5wcm9wc1xufSwgcmVmKSA9PiB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAndG9vbHRpcCcpO1xuICBjb25zdCBpc1JUTCA9IHVzZUlzUlRMKCk7XG4gIGNvbnN0IFtwcmltYXJ5UGxhY2VtZW50XSA9IChwbGFjZW1lbnQgPT0gbnVsbCA/IHZvaWQgMCA6IHBsYWNlbWVudC5zcGxpdCgnLScpKSB8fCBbXTtcbiAgY29uc3QgYnNEaXJlY3Rpb24gPSBnZXRPdmVybGF5RGlyZWN0aW9uKHByaW1hcnlQbGFjZW1lbnQsIGlzUlRMKTtcbiAgbGV0IGNvbXB1dGVkU3R5bGUgPSBzdHlsZTtcbiAgaWYgKHNob3cgJiYgIWhhc0RvbmVJbml0aWFsTWVhc3VyZSkge1xuICAgIGNvbXB1dGVkU3R5bGUgPSB7XG4gICAgICAuLi5zdHlsZSxcbiAgICAgIC4uLmdldEluaXRpYWxQb3BwZXJTdHlsZXMocG9wcGVyID09IG51bGwgPyB2b2lkIDAgOiBwb3BwZXIuc3RyYXRlZ3kpXG4gICAgfTtcbiAgfVxuICByZXR1cm4gLyojX19QVVJFX18qL19qc3hzKFwiZGl2XCIsIHtcbiAgICByZWY6IHJlZixcbiAgICBzdHlsZTogY29tcHV0ZWRTdHlsZSxcbiAgICByb2xlOiBcInRvb2x0aXBcIixcbiAgICBcIngtcGxhY2VtZW50XCI6IHByaW1hcnlQbGFjZW1lbnQsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgsIGBicy10b29sdGlwLSR7YnNEaXJlY3Rpb259YCksXG4gICAgLi4ucHJvcHMsXG4gICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovX2pzeChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwidG9vbHRpcC1hcnJvd1wiLFxuICAgICAgLi4uYXJyb3dQcm9wc1xuICAgIH0pLCAvKiNfX1BVUkVfXyovX2pzeChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IGAke2JzUHJlZml4fS1pbm5lcmAsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICB9KV1cbiAgfSk7XG59KTtcblRvb2x0aXAuZGlzcGxheU5hbWUgPSAnVG9vbHRpcCc7XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFRvb2x0aXAsIHtcbiAgLy8gRGVmYXVsdCB0b29sdGlwIG9mZnNldC5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvYmVjYTJhNmM3ZjZiYzg4YjY0NDkzMzlmYzc2ZWRjZGE4MzJjNTllNS9qcy9zcmMvdG9vbHRpcC5qcyNMNjVcbiAgVE9PTFRJUF9PRkZTRVQ6IFswLCA2XVxufSk7IiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IERFRkFVTFRfQlJFQUtQT0lOVFMsIERFRkFVTFRfTUlOX0JSRUFLUE9JTlQgfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNpdmVQcm9wVHlwZShwcm9wVHlwZSkge1xuICByZXR1cm4gUHJvcFR5cGVzLm9uZU9mVHlwZShbcHJvcFR5cGUsIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgeHM6IHByb3BUeXBlLFxuICAgIHNtOiBwcm9wVHlwZSxcbiAgICBtZDogcHJvcFR5cGUsXG4gICAgbGc6IHByb3BUeXBlLFxuICAgIHhsOiBwcm9wVHlwZSxcbiAgICB4eGw6IHByb3BUeXBlXG4gIH0pXSk7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVVdGlsaXR5Q2xhc3NOYW1lKHV0aWxpdHlWYWx1ZXMsIGJyZWFrcG9pbnRzID0gREVGQVVMVF9CUkVBS1BPSU5UUywgbWluQnJlYWtwb2ludCA9IERFRkFVTFRfTUlOX0JSRUFLUE9JTlQpIHtcbiAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICBPYmplY3QuZW50cmllcyh1dGlsaXR5VmFsdWVzKS5mb3JFYWNoKChbdXRpbE5hbWUsIHV0aWxWYWx1ZV0pID0+IHtcbiAgICBpZiAodXRpbFZhbHVlICE9IG51bGwpIHtcbiAgICAgIGlmICh0eXBlb2YgdXRpbFZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBicmVha3BvaW50cy5mb3JFYWNoKGJya1BvaW50ID0+IHtcbiAgICAgICAgICBjb25zdCBicFZhbHVlID0gdXRpbFZhbHVlW2Jya1BvaW50XTtcbiAgICAgICAgICBpZiAoYnBWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZpeCA9IGJya1BvaW50ICE9PSBtaW5CcmVha3BvaW50ID8gYC0ke2Jya1BvaW50fWAgOiAnJztcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChgJHt1dGlsTmFtZX0ke2luZml4fS0ke2JwVmFsdWV9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgJHt1dGlsTmFtZX0tJHt1dGlsVmFsdWV9YCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNsYXNzZXM7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SW5pdGlhbFBvcHBlclN0eWxlcyhwb3NpdGlvbiA9ICdhYnNvbHV0ZScpIHtcbiAgcmV0dXJuIHtcbiAgICBwb3NpdGlvbixcbiAgICB0b3A6ICcwJyxcbiAgICBsZWZ0OiAnMCcsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHBvaW50ZXJFdmVudHM6ICdub25lJ1xuICB9O1xufSIsImltcG9ydCBOb29wVHJhbnNpdGlvbiBmcm9tICdAcmVzdGFydC91aS9Ob29wVHJhbnNpdGlvbic7XG5pbXBvcnQgRmFkZSBmcm9tICcuL0ZhZGUnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VGFiVHJhbnNpdGlvbkNvbXBvbmVudCh0cmFuc2l0aW9uKSB7XG4gIGlmICh0eXBlb2YgdHJhbnNpdGlvbiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHRyYW5zaXRpb24gPyBGYWRlIDogTm9vcFRyYW5zaXRpb247XG4gIH1cbiAgcmV0dXJuIHRyYW5zaXRpb247XG59IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuZXhwb3J0IGNsYXNzIEJzUHJlZml4Q29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHt9XG5cbi8vIE5lZWQgdG8gdXNlIHRoaXMgaW5zdGVhZCBvZiB0eXBlb2YgQ29tcG9uZW50IHRvIGdldCBwcm9wZXIgdHlwZSBjaGVja2luZy5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE92ZXJsYXlEaXJlY3Rpb24ocGxhY2VtZW50LCBpc1JUTCkge1xuICBsZXQgYnNEaXJlY3Rpb24gPSBwbGFjZW1lbnQ7XG4gIGlmIChwbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgIGJzRGlyZWN0aW9uID0gaXNSVEwgPyAnZW5kJyA6ICdzdGFydCc7XG4gIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSAncmlnaHQnKSB7XG4gICAgYnNEaXJlY3Rpb24gPSBpc1JUTCA/ICdzdGFydCcgOiAnZW5kJztcbiAgfVxuICByZXR1cm4gYnNEaXJlY3Rpb247XG59IiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBBY2NvcmRpb24gfSBmcm9tICcuL0FjY29yZGlvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEFjY29yZGlvbkNvbnRleHQgfSBmcm9tICcuL0FjY29yZGlvbkNvbnRleHQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBBY2NvcmRpb25Db2xsYXBzZSB9IGZyb20gJy4vQWNjb3JkaW9uQ29sbGFwc2UnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBBY2NvcmRpb25CdXR0b24sIHVzZUFjY29yZGlvbkJ1dHRvbiB9IGZyb20gJy4vQWNjb3JkaW9uQnV0dG9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQWNjb3JkaW9uQm9keSB9IGZyb20gJy4vQWNjb3JkaW9uQm9keSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEFjY29yZGlvbkhlYWRlciB9IGZyb20gJy4vQWNjb3JkaW9uSGVhZGVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQWNjb3JkaW9uSXRlbSB9IGZyb20gJy4vQWNjb3JkaW9uSXRlbSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEFsZXJ0IH0gZnJvbSAnLi9BbGVydCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEFsZXJ0SGVhZGluZyB9IGZyb20gJy4vQWxlcnRIZWFkaW5nJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQWxlcnRMaW5rIH0gZnJvbSAnLi9BbGVydExpbmsnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBBbmNob3IgfSBmcm9tICcuL0FuY2hvcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEJhZGdlIH0gZnJvbSAnLi9CYWRnZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEJyZWFkY3J1bWIgfSBmcm9tICcuL0JyZWFkY3J1bWInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBCcmVhZGNydW1iSXRlbSB9IGZyb20gJy4vQnJlYWRjcnVtYkl0ZW0nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBCdXR0b24gfSBmcm9tICcuL0J1dHRvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEJ1dHRvbkdyb3VwIH0gZnJvbSAnLi9CdXR0b25Hcm91cCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEJ1dHRvblRvb2xiYXIgfSBmcm9tICcuL0J1dHRvblRvb2xiYXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYXJkIH0gZnJvbSAnLi9DYXJkJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2FyZEJvZHkgfSBmcm9tICcuL0NhcmRCb2R5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2FyZEZvb3RlciB9IGZyb20gJy4vQ2FyZEZvb3Rlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENhcmRHcm91cCB9IGZyb20gJy4vQ2FyZEdyb3VwJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2FyZEhlYWRlciB9IGZyb20gJy4vQ2FyZEhlYWRlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENhcmRJbWcgfSBmcm9tICcuL0NhcmRJbWcnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYXJkSW1nT3ZlcmxheSB9IGZyb20gJy4vQ2FyZEltZ092ZXJsYXknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYXJkTGluayB9IGZyb20gJy4vQ2FyZExpbmsnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYXJkU3VidGl0bGUgfSBmcm9tICcuL0NhcmRTdWJ0aXRsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENhcmRUZXh0IH0gZnJvbSAnLi9DYXJkVGV4dCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENhcmRUaXRsZSB9IGZyb20gJy4vQ2FyZFRpdGxlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2Fyb3VzZWwgfSBmcm9tICcuL0Nhcm91c2VsJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2Fyb3VzZWxDYXB0aW9uIH0gZnJvbSAnLi9DYXJvdXNlbENhcHRpb24nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYXJvdXNlbEl0ZW0gfSBmcm9tICcuL0Nhcm91c2VsSXRlbSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENsb3NlQnV0dG9uIH0gZnJvbSAnLi9DbG9zZUJ1dHRvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENvbCB9IGZyb20gJy4vQ29sJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ29sbGFwc2UgfSBmcm9tICcuL0NvbGxhcHNlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ29udGFpbmVyIH0gZnJvbSAnLi9Db250YWluZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEcm9wZG93biB9IGZyb20gJy4vRHJvcGRvd24nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEcm9wZG93bkJ1dHRvbiB9IGZyb20gJy4vRHJvcGRvd25CdXR0b24nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEcm9wZG93bkRpdmlkZXIgfSBmcm9tICcuL0Ryb3Bkb3duRGl2aWRlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERyb3Bkb3duSGVhZGVyIH0gZnJvbSAnLi9Ecm9wZG93bkhlYWRlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERyb3Bkb3duSXRlbSB9IGZyb20gJy4vRHJvcGRvd25JdGVtJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHJvcGRvd25JdGVtVGV4dCB9IGZyb20gJy4vRHJvcGRvd25JdGVtVGV4dCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERyb3Bkb3duTWVudSB9IGZyb20gJy4vRHJvcGRvd25NZW51JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHJvcGRvd25Ub2dnbGUgfSBmcm9tICcuL0Ryb3Bkb3duVG9nZ2xlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRmFkZSB9IGZyb20gJy4vRmFkZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEZpZ3VyZSB9IGZyb20gJy4vRmlndXJlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRmlndXJlQ2FwdGlvbiB9IGZyb20gJy4vRmlndXJlQ2FwdGlvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEZpZ3VyZUltYWdlIH0gZnJvbSAnLi9GaWd1cmVJbWFnZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEZvcm0gfSBmcm9tICcuL0Zvcm0nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBGb3JtQ29udHJvbCB9IGZyb20gJy4vRm9ybUNvbnRyb2wnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBGb3JtQ2hlY2sgfSBmcm9tICcuL0Zvcm1DaGVjayc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEZvcm1GbG9hdGluZyB9IGZyb20gJy4vRm9ybUZsb2F0aW5nJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRmxvYXRpbmdMYWJlbCB9IGZyb20gJy4vRmxvYXRpbmdMYWJlbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEZvcm1Hcm91cCB9IGZyb20gJy4vRm9ybUdyb3VwJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRm9ybUxhYmVsIH0gZnJvbSAnLi9Gb3JtTGFiZWwnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBGb3JtVGV4dCB9IGZyb20gJy4vRm9ybVRleHQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBGb3JtU2VsZWN0IH0gZnJvbSAnLi9Gb3JtU2VsZWN0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW1hZ2UgfSBmcm9tICcuL0ltYWdlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW5wdXRHcm91cCB9IGZyb20gJy4vSW5wdXRHcm91cCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIExpc3RHcm91cCB9IGZyb20gJy4vTGlzdEdyb3VwJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTGlzdEdyb3VwSXRlbSB9IGZyb20gJy4vTGlzdEdyb3VwSXRlbSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1vZGFsQm9keSB9IGZyb20gJy4vTW9kYWxCb2R5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW9kYWxEaWFsb2cgfSBmcm9tICcuL01vZGFsRGlhbG9nJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW9kYWxGb290ZXIgfSBmcm9tICcuL01vZGFsRm9vdGVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW9kYWxIZWFkZXIgfSBmcm9tICcuL01vZGFsSGVhZGVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW9kYWxUaXRsZSB9IGZyb20gJy4vTW9kYWxUaXRsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5hdiB9IGZyb20gJy4vTmF2JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTmF2YmFyIH0gZnJvbSAnLi9OYXZiYXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOYXZiYXJCcmFuZCB9IGZyb20gJy4vTmF2YmFyQnJhbmQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOYXZiYXJDb2xsYXBzZSB9IGZyb20gJy4vTmF2YmFyQ29sbGFwc2UnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOYXZiYXJPZmZjYW52YXMgfSBmcm9tICcuL05hdmJhck9mZmNhbnZhcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5hdmJhclRleHQgfSBmcm9tICcuL05hdmJhclRleHQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOYXZiYXJUb2dnbGUgfSBmcm9tICcuL05hdmJhclRvZ2dsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5hdkRyb3Bkb3duIH0gZnJvbSAnLi9OYXZEcm9wZG93bic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5hdkl0ZW0gfSBmcm9tICcuL05hdkl0ZW0nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOYXZMaW5rIH0gZnJvbSAnLi9OYXZMaW5rJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgT2ZmY2FudmFzIH0gZnJvbSAnLi9PZmZjYW52YXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBPZmZjYW52YXNCb2R5IH0gZnJvbSAnLi9PZmZjYW52YXNCb2R5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgT2ZmY2FudmFzSGVhZGVyIH0gZnJvbSAnLi9PZmZjYW52YXNIZWFkZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBPZmZjYW52YXNUaXRsZSB9IGZyb20gJy4vT2ZmY2FudmFzVGl0bGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBPZmZjYW52YXNUb2dnbGluZyB9IGZyb20gJy4vT2ZmY2FudmFzVG9nZ2xpbmcnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgT3ZlcmxheVRyaWdnZXIgfSBmcm9tICcuL092ZXJsYXlUcmlnZ2VyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGFnZUl0ZW0gfSBmcm9tICcuL1BhZ2VJdGVtJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGFnaW5hdGlvbiB9IGZyb20gJy4vUGFnaW5hdGlvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFBsYWNlaG9sZGVyIH0gZnJvbSAnLi9QbGFjZWhvbGRlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFBsYWNlaG9sZGVyQnV0dG9uIH0gZnJvbSAnLi9QbGFjZWhvbGRlckJ1dHRvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFBvcG92ZXIgfSBmcm9tICcuL1BvcG92ZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQb3BvdmVyQm9keSB9IGZyb20gJy4vUG9wb3ZlckJvZHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQb3BvdmVySGVhZGVyIH0gZnJvbSAnLi9Qb3BvdmVySGVhZGVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHJvZ3Jlc3NCYXIgfSBmcm9tICcuL1Byb2dyZXNzQmFyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUmF0aW8gfSBmcm9tICcuL1JhdGlvJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUm93IH0gZnJvbSAnLi9Sb3cnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTcGlubmVyIH0gZnJvbSAnLi9TcGlubmVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3BsaXRCdXR0b24gfSBmcm9tICcuL1NwbGl0QnV0dG9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU1NSUHJvdmlkZXIgfSBmcm9tICcuL1NTUlByb3ZpZGVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3RhY2sgfSBmcm9tICcuL1N0YWNrJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGFiIH0gZnJvbSAnLi9UYWInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUYWJDb250YWluZXIgfSBmcm9tICcuL1RhYkNvbnRhaW5lcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRhYkNvbnRlbnQgfSBmcm9tICcuL1RhYkNvbnRlbnQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUYWJsZSB9IGZyb20gJy4vVGFibGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUYWJQYW5lIH0gZnJvbSAnLi9UYWJQYW5lJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGFicyB9IGZyb20gJy4vVGFicyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRoZW1lUHJvdmlkZXIgfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUb2FzdCB9IGZyb20gJy4vVG9hc3QnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUb2FzdEJvZHkgfSBmcm9tICcuL1RvYXN0Qm9keSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvYXN0Q29udGFpbmVyIH0gZnJvbSAnLi9Ub2FzdENvbnRhaW5lcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvYXN0SGVhZGVyIH0gZnJvbSAnLi9Ub2FzdEhlYWRlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvZ2dsZUJ1dHRvbiB9IGZyb20gJy4vVG9nZ2xlQnV0dG9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG9nZ2xlQnV0dG9uR3JvdXAgfSBmcm9tICcuL1RvZ2dsZUJ1dHRvbkdyb3VwJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG9vbHRpcCB9IGZyb20gJy4vVG9vbHRpcCc7IiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmNvbnN0IGFsaWduRGlyZWN0aW9uID0gUHJvcFR5cGVzLm9uZU9mKFsnc3RhcnQnLCAnZW5kJ10pO1xuZXhwb3J0IGNvbnN0IGFsaWduUHJvcFR5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFthbGlnbkRpcmVjdGlvbiwgUHJvcFR5cGVzLnNoYXBlKHtcbiAgc206IGFsaWduRGlyZWN0aW9uXG59KSwgUHJvcFR5cGVzLnNoYXBlKHtcbiAgbWQ6IGFsaWduRGlyZWN0aW9uXG59KSwgUHJvcFR5cGVzLnNoYXBlKHtcbiAgbGc6IGFsaWduRGlyZWN0aW9uXG59KSwgUHJvcFR5cGVzLnNoYXBlKHtcbiAgeGw6IGFsaWduRGlyZWN0aW9uXG59KSwgUHJvcFR5cGVzLnNoYXBlKHtcbiAgeHhsOiBhbGlnbkRpcmVjdGlvblxufSksIFByb3BUeXBlcy5vYmplY3RdKTsiLCJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IHsgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGhhc0NsYXNzIGZyb20gJ2RvbS1oZWxwZXJzL2hhc0NsYXNzJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgUG9wb3ZlciBmcm9tICcuL1BvcG92ZXInO1xuaW1wb3J0IFRvb2x0aXAgZnJvbSAnLi9Ub29sdGlwJztcblxuLy8gVGhpcyBpcyBtZWFudCBmb3IgaW50ZXJuYWwgdXNlLlxuLy8gVGhpcyBhcHBsaWVzIGEgY3VzdG9tIG9mZnNldCB0byB0aGUgb3ZlcmxheSBpZiBpdCdzIGEgcG9wb3ZlciBvciB0b29sdGlwLlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlT3ZlcmxheU9mZnNldChjdXN0b21PZmZzZXQpIHtcbiAgY29uc3Qgb3ZlcmxheVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgcG9wb3ZlckNsYXNzID0gdXNlQm9vdHN0cmFwUHJlZml4KHVuZGVmaW5lZCwgJ3BvcG92ZXInKTtcbiAgY29uc3QgdG9vbHRpcENsYXNzID0gdXNlQm9vdHN0cmFwUHJlZml4KHVuZGVmaW5lZCwgJ3Rvb2x0aXAnKTtcbiAgY29uc3Qgb2Zmc2V0ID0gdXNlTWVtbygoKSA9PiAoe1xuICAgIG5hbWU6ICdvZmZzZXQnLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIG9mZnNldDogKCkgPT4ge1xuICAgICAgICBpZiAoY3VzdG9tT2Zmc2V0KSB7XG4gICAgICAgICAgcmV0dXJuIGN1c3RvbU9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3ZlcmxheVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgaWYgKGhhc0NsYXNzKG92ZXJsYXlSZWYuY3VycmVudCwgcG9wb3ZlckNsYXNzKSkge1xuICAgICAgICAgICAgcmV0dXJuIFBvcG92ZXIuUE9QUEVSX09GRlNFVDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhc0NsYXNzKG92ZXJsYXlSZWYuY3VycmVudCwgdG9vbHRpcENsYXNzKSkge1xuICAgICAgICAgICAgcmV0dXJuIFRvb2x0aXAuVE9PTFRJUF9PRkZTRVQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbMCwgMF07XG4gICAgICB9XG4gICAgfVxuICB9KSwgW2N1c3RvbU9mZnNldCwgcG9wb3ZlckNsYXNzLCB0b29sdGlwQ2xhc3NdKTtcbiAgcmV0dXJuIFtvdmVybGF5UmVmLCBbb2Zmc2V0XV07XG59IiwiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IHVzZUNvbCB9IGZyb20gJy4vQ29sJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVBsYWNlaG9sZGVyKHtcbiAgYW5pbWF0aW9uLFxuICBiZyxcbiAgYnNQcmVmaXgsXG4gIHNpemUsXG4gIC4uLnByb3BzXG59KSB7XG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAncGxhY2Vob2xkZXInKTtcbiAgY29uc3QgW3tcbiAgICBjbGFzc05hbWUsXG4gICAgLi4uY29sUHJvcHNcbiAgfV0gPSB1c2VDb2wocHJvcHMpO1xuICByZXR1cm4ge1xuICAgIC4uLmNvbFByb3BzLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGFuaW1hdGlvbiA/IGAke2JzUHJlZml4fS0ke2FuaW1hdGlvbn1gIDogYnNQcmVmaXgsIHNpemUgJiYgYCR7YnNQcmVmaXh9LSR7c2l6ZX1gLCBiZyAmJiBgYmctJHtiZ31gKVxuICB9O1xufSIsImltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZU1lcmdlZFJlZnMgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlTWVyZ2VkUmVmcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VXcmFwcGVkUmVmV2l0aFdhcm5pbmcocmVmLCBjb21wb25lbnROYW1lKSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkgcmV0dXJuIHJlZjtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvcnVsZXMtb2YtaG9va3NcbiAgY29uc3Qgd2FybmluZ1JlZiA9IHVzZUNhbGxiYWNrKHJlZlZhbHVlID0+IHtcbiAgICAhKHJlZlZhbHVlID09IG51bGwgfHwgIXJlZlZhbHVlLmlzUmVhY3RDb21wb25lbnQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBgJHtjb21wb25lbnROYW1lfSBpbmplY3RlZCBhIHJlZiB0byBhIHByb3ZpZGVkIFxcYGFzXFxgIGNvbXBvbmVudCB0aGF0IHJlc29sdmVkIHRvIGEgY29tcG9uZW50IGluc3RhbmNlIGluc3RlYWQgb2YgYSBET00gZWxlbWVudC4gYCArICdVc2UgYFJlYWN0LmZvcndhcmRSZWZgIHRvIHByb3ZpZGUgdGhlIGluamVjdGVkIHJlZiB0byB0aGUgY2xhc3MgY29tcG9uZW50IGFzIGEgcHJvcCBpbiBvcmRlciB0byBwYXNzIGl0IGRpcmVjdGx5IHRvIGEgRE9NIGVsZW1lbnQnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIH0sIFtjb21wb25lbnROYW1lXSk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9ydWxlcy1vZi1ob29rc1xuICByZXR1cm4gdXNlTWVyZ2VkUmVmcyh3YXJuaW5nUmVmLCByZWYpO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==