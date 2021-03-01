module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/context/globalState.tsx":
/*!*************************************!*\
  !*** ./src/context/globalState.tsx ***!
  \*************************************/
/*! exports provided: GlobalContextWrapper, useGlobalContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GlobalContextWrapper\", function() { return GlobalContextWrapper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useGlobalContext\", function() { return useGlobalContext; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _jsxFileName = \"/Users/juanruelas/Desktop/Projects/link/link-web/src/context/globalState.tsx\";\n\nconst STORAGE_NAME = process.env.LOCAL_STORAGE_NAME || \"link:state\";\nconst initalContextValue = false ? undefined : {\n  mode: \"dark\"\n};\nconst GlobalContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__[\"createContext\"])(initalContextValue);\nfunction GlobalContextWrapper({\n  children\n}) {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(GlobalContext.Provider, {\n    value: initalContextValue,\n    children: [\" \", children, \" \"]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 22,\n    columnNumber: 5\n  }, this);\n}\nfunction useGlobalContext() {\n  return Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(GlobalContext);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29udGV4dC9nbG9iYWxTdGF0ZS50c3g/MDU3NCJdLCJuYW1lcyI6WyJTVE9SQUdFX05BTUUiLCJwcm9jZXNzIiwiZW52IiwiTE9DQUxfU1RPUkFHRV9OQU1FIiwiaW5pdGFsQ29udGV4dFZhbHVlIiwid2luZG93IiwibW9kZSIsIkdsb2JhbENvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiR2xvYmFsQ29udGV4dFdyYXBwZXIiLCJjaGlsZHJlbiIsInVzZUdsb2JhbENvbnRleHQiLCJ1c2VDb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUlBLE1BQU1BLFlBQVksR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGtCQUFaLElBQWtDLFlBQXZEO0FBTUEsTUFBTUMsa0JBQXdDLEdBQzVDLFFBQ0lDLFNBREosR0FJSTtBQUFFQyxNQUFJLEVBQUU7QUFBUixDQUxOO0FBT0EsTUFBTUMsYUFBYSxnQkFBR0MsMkRBQWEsQ0FBQ0osa0JBQUQsQ0FBbkM7QUFFTyxTQUFTSyxvQkFBVCxDQUE4QjtBQUFFQztBQUFGLENBQTlCLEVBQTRDO0FBQ2pELHNCQUNFLHFFQUFDLGFBQUQsQ0FBZSxRQUFmO0FBQXdCLFNBQUssRUFBRU4sa0JBQS9CO0FBQUEsZUFDRyxHQURILEVBRUdNLFFBRkgsRUFFYSxHQUZiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBTUQ7QUFFTSxTQUFTQyxnQkFBVCxHQUE0QjtBQUNqQyxTQUFPQyx3REFBVSxDQUFDTCxhQUFELENBQWpCO0FBQ0QiLCJmaWxlIjoiLi9zcmMvY29udGV4dC9nbG9iYWxTdGF0ZS50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5cbmRlY2xhcmUgdHlwZSBDb2xvck1vZGUgPSBcImxpZ2h0XCIgfCBcImRhcmtcIjtcblxuY29uc3QgU1RPUkFHRV9OQU1FID0gcHJvY2Vzcy5lbnYuTE9DQUxfU1RPUkFHRV9OQU1FIHx8IFwibGluazpzdGF0ZVwiO1xuXG5pbnRlcmZhY2UgR2xvYmFsU3RhdGVJbnRlcmZhY2UgZXh0ZW5kcyBPYmplY3Qge1xuICBtb2RlPzogQ29sb3JNb2RlO1xufVxuXG5jb25zdCBpbml0YWxDb250ZXh0VmFsdWU6IEdsb2JhbFN0YXRlSW50ZXJmYWNlID1cbiAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIlxuICAgID8gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfTkFNRSkgPT09IG51bGxcbiAgICAgID8geyBtb2RlOiBcImRhcmtcIiB9XG4gICAgICA6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX05BTUUpXG4gICAgOiB7IG1vZGU6IFwiZGFya1wiIH07XG5cbmNvbnN0IEdsb2JhbENvbnRleHQgPSBjcmVhdGVDb250ZXh0KGluaXRhbENvbnRleHRWYWx1ZSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBHbG9iYWxDb250ZXh0V3JhcHBlcih7IGNoaWxkcmVuIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8R2xvYmFsQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17aW5pdGFsQ29udGV4dFZhbHVlfT5cbiAgICAgIHtcIiBcIn1cbiAgICAgIHtjaGlsZHJlbn17XCIgXCJ9XG4gICAgPC9HbG9iYWxDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlR2xvYmFsQ29udGV4dCgpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoR2xvYmFsQ29udGV4dCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/context/globalState.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! urql */ \"urql\");\n/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _context_globalState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/globalState */ \"./src/context/globalState.tsx\");\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme */ \"./src/theme.tsx\");\n\nvar _jsxFileName = \"/Users/juanruelas/Desktop/Projects/link/link-web/src/pages/_app.tsx\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n // create our URQL\n\nconst client = Object(urql__WEBPACK_IMPORTED_MODULE_2__[\"createClient\"])({\n  url: process.env.GRAPHQL || \"http://localhost:3001/graphql\",\n  fetchOptions: {\n    credentials: \"include\"\n  }\n});\n\n\nfunction MyApp({\n  Component,\n  pageProps\n}) {\n  const globalState = Object(_context_globalState__WEBPACK_IMPORTED_MODULE_3__[\"useGlobalContext\"])();\n  console.log(\"global context\", globalState);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_context_globalState__WEBPACK_IMPORTED_MODULE_3__[\"GlobalContextWrapper\"], {\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(urql__WEBPACK_IMPORTED_MODULE_2__[\"Provider\"], {\n      value: client,\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"ChakraProvider\"], {\n        resetCSS: true,\n        theme: _theme__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"ColorModeProvider\"], {\n          options: {\n            initialColorMode: globalState.mode\n          },\n          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Component, _objectSpread({}, pageProps), void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 30,\n            columnNumber: 13\n          }, this)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 25,\n          columnNumber: 11\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 24,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 23,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 22,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MyApp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvX2FwcC50c3g/ODU0OCJdLCJuYW1lcyI6WyJjbGllbnQiLCJjcmVhdGVDbGllbnQiLCJ1cmwiLCJwcm9jZXNzIiwiZW52IiwiR1JBUEhRTCIsImZldGNoT3B0aW9ucyIsImNyZWRlbnRpYWxzIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJnbG9iYWxTdGF0ZSIsInVzZUdsb2JhbENvbnRleHQiLCJjb25zb2xlIiwibG9nIiwidGhlbWUiLCJpbml0aWFsQ29sb3JNb2RlIiwibW9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtDQUlBOztBQUNBLE1BQU1BLE1BQU0sR0FBR0MseURBQVksQ0FBQztBQUMxQkMsS0FBRyxFQUFFQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsT0FBWixJQUF1QiwrQkFERjtBQUUxQkMsY0FBWSxFQUFFO0FBQ1pDLGVBQVcsRUFBRTtBQUREO0FBRlksQ0FBRCxDQUEzQjtBQU9BOztBQUVBLFNBQVNDLEtBQVQsQ0FBZTtBQUFFQyxXQUFGO0FBQWFDO0FBQWIsQ0FBZixFQUF5QztBQUN2QyxRQUFNQyxXQUFXLEdBQUdDLDZFQUFnQixFQUFwQztBQUVBQyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QkgsV0FBOUI7QUFFQSxzQkFDRSxxRUFBQyx5RUFBRDtBQUFBLDJCQUNFLHFFQUFDLDZDQUFEO0FBQWMsV0FBSyxFQUFFWCxNQUFyQjtBQUFBLDZCQUNFLHFFQUFDLCtEQUFEO0FBQWdCLGdCQUFRLE1BQXhCO0FBQXlCLGFBQUssRUFBRWUsOENBQWhDO0FBQUEsK0JBQ0UscUVBQUMsa0VBQUQ7QUFDRSxpQkFBTyxFQUFFO0FBQ1BDLDRCQUFnQixFQUFFTCxXQUFXLENBQUVNO0FBRHhCLFdBRFg7QUFBQSxpQ0FLRSxxRUFBQyxTQUFELG9CQUFlUCxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFMRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFlRDs7QUFFY0Ysb0VBQWYiLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFrcmFQcm92aWRlciwgQ29sb3JNb2RlUHJvdmlkZXIgfSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50LCBQcm92aWRlciBhcyBQcm92aWRlclVSUUwgfSBmcm9tIFwidXJxbFwiO1xuXG5pbXBvcnQgeyBHbG9iYWxDb250ZXh0V3JhcHBlciwgdXNlR2xvYmFsQ29udGV4dCB9IGZyb20gXCIuLi9jb250ZXh0L2dsb2JhbFN0YXRlXCI7XG5cbi8vIGNyZWF0ZSBvdXIgVVJRTFxuY29uc3QgY2xpZW50ID0gY3JlYXRlQ2xpZW50KHtcbiAgdXJsOiBwcm9jZXNzLmVudi5HUkFQSFFMIHx8IFwiaHR0cDovL2xvY2FsaG9zdDozMDAxL2dyYXBocWxcIixcbiAgZmV0Y2hPcHRpb25zOiB7XG4gICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICB9LFxufSk7XG5cbmltcG9ydCB0aGVtZSBmcm9tIFwiLi4vdGhlbWVcIjtcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIGNvbnN0IGdsb2JhbFN0YXRlID0gdXNlR2xvYmFsQ29udGV4dCgpO1xuXG4gIGNvbnNvbGUubG9nKFwiZ2xvYmFsIGNvbnRleHRcIiwgZ2xvYmFsU3RhdGUpO1xuXG4gIHJldHVybiAoXG4gICAgPEdsb2JhbENvbnRleHRXcmFwcGVyPlxuICAgICAgPFByb3ZpZGVyVVJRTCB2YWx1ZT17Y2xpZW50fT5cbiAgICAgICAgPENoYWtyYVByb3ZpZGVyIHJlc2V0Q1NTIHRoZW1lPXt0aGVtZX0+XG4gICAgICAgICAgPENvbG9yTW9kZVByb3ZpZGVyXG4gICAgICAgICAgICBvcHRpb25zPXt7XG4gICAgICAgICAgICAgIGluaXRpYWxDb2xvck1vZGU6IGdsb2JhbFN0YXRlIS5tb2RlLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgICAgPC9Db2xvck1vZGVQcm92aWRlcj5cbiAgICAgICAgPC9DaGFrcmFQcm92aWRlcj5cbiAgICAgIDwvUHJvdmlkZXJVUlFMPlxuICAgIDwvR2xvYmFsQ29udGV4dFdyYXBwZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/theme.tsx":
/*!***********************!*\
  !*** ./src/theme.tsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/theme-tools */ \"@chakra-ui/theme-tools\");\n/* harmony import */ var _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _jsxFileName = \"/Users/juanruelas/Desktop/Projects/link/link-web/src/theme.tsx\";\n\n\nconst fonts = {\n  mono: `'Menlo', monospace`\n};\nconst breakpoints = Object(_chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_2__[\"createBreakpoints\"])({\n  sm: \"40em\",\n  md: \"52em\",\n  lg: \"64em\",\n  xl: \"80em\"\n});\nconst theme = Object(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"extendTheme\"])({\n  initialColorMode: \"dark\",\n  colors: {\n    black: \"#16161D\"\n  },\n  fonts,\n  breakpoints,\n  icons: {\n    logo: {\n      path: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"svg\", {\n        width: \"3000\",\n        height: \"3163\",\n        viewBox: \"0 0 3000 3163\",\n        fill: \"none\",\n        xmlns: \"http://www.w3.org/2000/svg\",\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"rect\", {\n          width: \"3000\",\n          height: \"3162.95\",\n          fill: \"none\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 31,\n          columnNumber: 11\n        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"path\", {\n          d: \"M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z\",\n          fill: \"currentColor\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 32,\n          columnNumber: 11\n        }, undefined)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 24,\n        columnNumber: 9\n      }, undefined),\n      viewBox: \"0 0 3000 3163\"\n    }\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (theme);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGhlbWUudHN4P2NhNzYiXSwibmFtZXMiOlsiZm9udHMiLCJtb25vIiwiYnJlYWtwb2ludHMiLCJjcmVhdGVCcmVha3BvaW50cyIsInNtIiwibWQiLCJsZyIsInhsIiwidGhlbWUiLCJleHRlbmRUaGVtZSIsImluaXRpYWxDb2xvck1vZGUiLCJjb2xvcnMiLCJibGFjayIsImljb25zIiwibG9nbyIsInBhdGgiLCJ2aWV3Qm94Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUEsTUFBTUEsS0FBSyxHQUFHO0FBQUVDLE1BQUksRUFBRztBQUFULENBQWQ7QUFFQSxNQUFNQyxXQUFXLEdBQUdDLGdGQUFpQixDQUFDO0FBQ3BDQyxJQUFFLEVBQUUsTUFEZ0M7QUFFcENDLElBQUUsRUFBRSxNQUZnQztBQUdwQ0MsSUFBRSxFQUFFLE1BSGdDO0FBSXBDQyxJQUFFLEVBQUU7QUFKZ0MsQ0FBRCxDQUFyQztBQU9BLE1BQU1DLEtBQUssR0FBR0Msb0VBQVcsQ0FBQztBQUN4QkMsa0JBQWdCLEVBQUUsTUFETTtBQUd4QkMsUUFBTSxFQUFFO0FBQ05DLFNBQUssRUFBRTtBQURELEdBSGdCO0FBTXhCWixPQU53QjtBQU94QkUsYUFQd0I7QUFReEJXLE9BQUssRUFBRTtBQUNMQyxRQUFJLEVBQUU7QUFDSkMsVUFBSSxlQUNGO0FBQ0UsYUFBSyxFQUFDLE1BRFI7QUFFRSxjQUFNLEVBQUMsTUFGVDtBQUdFLGVBQU8sRUFBQyxlQUhWO0FBSUUsWUFBSSxFQUFDLE1BSlA7QUFLRSxhQUFLLEVBQUMsNEJBTFI7QUFBQSxnQ0FPRTtBQUFNLGVBQUssRUFBQyxNQUFaO0FBQW1CLGdCQUFNLEVBQUMsU0FBMUI7QUFBb0MsY0FBSSxFQUFDO0FBQXpDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBUEYsZUFRRTtBQUNFLFdBQUMsRUFBQyxpSUFESjtBQUVFLGNBQUksRUFBQztBQUZQO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBUkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUZFO0FBZ0JKQyxhQUFPLEVBQUU7QUFoQkw7QUFERDtBQVJpQixDQUFELENBQXpCO0FBOEJlUixvRUFBZiIsImZpbGUiOiIuL3NyYy90aGVtZS50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHRlbmRUaGVtZSB9IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVCcmVha3BvaW50cyB9IGZyb20gXCJAY2hha3JhLXVpL3RoZW1lLXRvb2xzXCI7XG5cbmNvbnN0IGZvbnRzID0geyBtb25vOiBgJ01lbmxvJywgbW9ub3NwYWNlYCB9O1xuXG5jb25zdCBicmVha3BvaW50cyA9IGNyZWF0ZUJyZWFrcG9pbnRzKHtcbiAgc206IFwiNDBlbVwiLFxuICBtZDogXCI1MmVtXCIsXG4gIGxnOiBcIjY0ZW1cIixcbiAgeGw6IFwiODBlbVwiLFxufSk7XG5cbmNvbnN0IHRoZW1lID0gZXh0ZW5kVGhlbWUoe1xuICBpbml0aWFsQ29sb3JNb2RlOiBcImRhcmtcIixcblxuICBjb2xvcnM6IHtcbiAgICBibGFjazogXCIjMTYxNjFEXCIsXG4gIH0sXG4gIGZvbnRzLFxuICBicmVha3BvaW50cyxcbiAgaWNvbnM6IHtcbiAgICBsb2dvOiB7XG4gICAgICBwYXRoOiAoXG4gICAgICAgIDxzdmdcbiAgICAgICAgICB3aWR0aD1cIjMwMDBcIlxuICAgICAgICAgIGhlaWdodD1cIjMxNjNcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzAwMCAzMTYzXCJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgID5cbiAgICAgICAgICA8cmVjdCB3aWR0aD1cIjMwMDBcIiBoZWlnaHQ9XCIzMTYyLjk1XCIgZmlsbD1cIm5vbmVcIiAvPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPVwiTTE0NzAuODkgMTQ0OC44MUwyMTcwIDI0ODguMTlIODIwVjcwNi4zOTJIMjE3MEwxNDcwLjg5IDE0NDguODFaTTE0MDguMjEgMTUxNS4zN0w5MDkuMTk2IDIwNDUuM1YyMzkzLjQ2SDE5OTguODRMMTQwOC4yMSAxNTE1LjM3WlwiXG4gICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICksXG4gICAgICB2aWV3Qm94OiBcIjAgMCAzMDAwIDMxNjNcIixcbiAgICB9LFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHRoZW1lO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/theme.tsx\n");

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi private-next-pages/_app.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.tsx */"./src/pages/_app.tsx");


/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@chakra-ui/react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAY2hha3JhLXVpL3JlYWN0XCI/M2I2NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJAY2hha3JhLXVpL3JlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGNoYWtyYS11aS9yZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@chakra-ui/react\n");

/***/ }),

/***/ "@chakra-ui/theme-tools":
/*!*****************************************!*\
  !*** external "@chakra-ui/theme-tools" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@chakra-ui/theme-tools\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAY2hha3JhLXVpL3RoZW1lLXRvb2xzXCI/ZTYxNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJAY2hha3JhLXVpL3RoZW1lLXRvb2xzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGNoYWtyYS11aS90aGVtZS10b29sc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@chakra-ui/theme-tools\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ }),

/***/ "urql":
/*!***********************!*\
  !*** external "urql" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"urql\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1cnFsXCI/YTY2NyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJ1cnFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJxbFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///urql\n");

/***/ })

/******/ });