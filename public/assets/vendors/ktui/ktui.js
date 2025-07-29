(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPopper: function() { return /* binding */ createPopper; },
/* harmony export */   detectOverflow: function() { return /* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"]; },
/* harmony export */   popperGenerator: function() { return /* binding */ popperGenerator; }
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_4__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_7__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref) {
        var name = _ref.name,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            effect = _ref.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ contains; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getBoundingClientRect; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getClippingRect; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getCompositeRect; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getComputedStyle; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDocumentElement; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDocumentRect; }
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getHTMLElementScroll; }
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getLayoutRect; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getNodeName; }
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getNodeScroll; }
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOffsetParent; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getParentNode; }
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getScrollParent; }
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getViewportRect; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindow; }
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindowScroll; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindowScrollBarX; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isElement: function() { return /* binding */ isElement; },
/* harmony export */   isHTMLElement: function() { return /* binding */ isHTMLElement; },
/* harmony export */   isShadowRoot: function() { return /* binding */ isShadowRoot; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isLayoutViewport; }
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isScrollParent; }
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isTableElement; }
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ listScrollParents; }
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterMain: function() { return /* binding */ afterMain; },
/* harmony export */   afterRead: function() { return /* binding */ afterRead; },
/* harmony export */   afterWrite: function() { return /* binding */ afterWrite; },
/* harmony export */   auto: function() { return /* binding */ auto; },
/* harmony export */   basePlacements: function() { return /* binding */ basePlacements; },
/* harmony export */   beforeMain: function() { return /* binding */ beforeMain; },
/* harmony export */   beforeRead: function() { return /* binding */ beforeRead; },
/* harmony export */   beforeWrite: function() { return /* binding */ beforeWrite; },
/* harmony export */   bottom: function() { return /* binding */ bottom; },
/* harmony export */   clippingParents: function() { return /* binding */ clippingParents; },
/* harmony export */   end: function() { return /* binding */ end; },
/* harmony export */   left: function() { return /* binding */ left; },
/* harmony export */   main: function() { return /* binding */ main; },
/* harmony export */   modifierPhases: function() { return /* binding */ modifierPhases; },
/* harmony export */   placements: function() { return /* binding */ placements; },
/* harmony export */   popper: function() { return /* binding */ popper; },
/* harmony export */   read: function() { return /* binding */ read; },
/* harmony export */   reference: function() { return /* binding */ reference; },
/* harmony export */   right: function() { return /* binding */ right; },
/* harmony export */   start: function() { return /* binding */ start; },
/* harmony export */   top: function() { return /* binding */ top; },
/* harmony export */   variationPlacements: function() { return /* binding */ variationPlacements; },
/* harmony export */   viewport: function() { return /* binding */ viewport; },
/* harmony export */   write: function() { return /* binding */ write; }
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterMain: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterMain; },
/* harmony export */   afterRead: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterRead; },
/* harmony export */   afterWrite: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterWrite; },
/* harmony export */   applyStyles: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles; },
/* harmony export */   arrow: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.arrow; },
/* harmony export */   auto: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.auto; },
/* harmony export */   basePlacements: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements; },
/* harmony export */   beforeMain: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeMain; },
/* harmony export */   beforeRead: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeRead; },
/* harmony export */   beforeWrite: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeWrite; },
/* harmony export */   bottom: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom; },
/* harmony export */   clippingParents: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents; },
/* harmony export */   computeStyles: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.computeStyles; },
/* harmony export */   createPopper: function() { return /* reexport safe */ _popper_js__WEBPACK_IMPORTED_MODULE_4__.createPopper; },
/* harmony export */   createPopperBase: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.createPopper; },
/* harmony export */   createPopperLite: function() { return /* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__.createPopper; },
/* harmony export */   detectOverflow: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   end: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.end; },
/* harmony export */   eventListeners: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.eventListeners; },
/* harmony export */   flip: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.flip; },
/* harmony export */   hide: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.hide; },
/* harmony export */   left: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.left; },
/* harmony export */   main: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.main; },
/* harmony export */   modifierPhases: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases; },
/* harmony export */   offset: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.offset; },
/* harmony export */   placements: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements; },
/* harmony export */   popper: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper; },
/* harmony export */   popperGenerator: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.popperGenerator; },
/* harmony export */   popperOffsets: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.popperOffsets; },
/* harmony export */   preventOverflow: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.preventOverflow; },
/* harmony export */   read: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.read; },
/* harmony export */   reference: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference; },
/* harmony export */   right: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.right; },
/* harmony export */   start: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.start; },
/* harmony export */   top: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.top; },
/* harmony export */   variationPlacements: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements; },
/* harmony export */   viewport: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport; },
/* harmony export */   write: function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.write; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");








 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_8__["default"])(state.elements.popper, arrowElement)) {
    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapToStyles: function() { return /* binding */ mapToStyles; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
      y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyStyles: function() { return /* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   arrow: function() { return /* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   computeStyles: function() { return /* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   eventListeners: function() { return /* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   flip: function() { return /* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   hide: function() { return /* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]; },
/* harmony export */   offset: function() { return /* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]; },
/* harmony export */   popperOffsets: function() { return /* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]; },
/* harmony export */   preventOverflow: function() { return /* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"]; }
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   distanceAndSkiddingToXY: function() { return /* binding */ distanceAndSkiddingToXY; }
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPopper: function() { return /* binding */ createPopper; },
/* harmony export */   defaultModifiers: function() { return /* binding */ defaultModifiers; },
/* harmony export */   detectOverflow: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"]; },
/* harmony export */   popperGenerator: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator; }
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyStyles: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles; },
/* harmony export */   arrow: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow; },
/* harmony export */   computeStyles: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles; },
/* harmony export */   createPopper: function() { return /* binding */ createPopper; },
/* harmony export */   createPopperLite: function() { return /* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper; },
/* harmony export */   defaultModifiers: function() { return /* binding */ defaultModifiers; },
/* harmony export */   detectOverflow: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]; },
/* harmony export */   eventListeners: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners; },
/* harmony export */   flip: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip; },
/* harmony export */   hide: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide; },
/* harmony export */   offset: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset; },
/* harmony export */   popperGenerator: function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator; },
/* harmony export */   popperOffsets: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets; },
/* harmony export */   preventOverflow: function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow; }
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ computeAutoPlacement; }
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ computeOffsets; }
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ debounce; }
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ detectOverflow; }
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ expandToHashMap; }
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getAltAxis; }
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getBasePlacement; }
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getFreshSideObject; }
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getMainAxisFromPlacement; }
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOppositePlacement; }
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOppositeVariationPlacement; }
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getVariation; }
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   max: function() { return /* binding */ max; },
/* harmony export */   min: function() { return /* binding */ min; },
/* harmony export */   round: function() { return /* binding */ round; }
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergeByName; }
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergePaddingObject; }
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ orderModifiers; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ rectToClientRect; }
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/userAgent.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/userAgent.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getUAString; }
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   within: function() { return /* binding */ within; },
/* harmony export */   withinMaxClamp: function() { return /* binding */ withinMaxClamp; }
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "./src/components/accordion/accordion.ts":
/*!***********************************************!*\
  !*** ./src/components/accordion/accordion.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTAccordion = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/helpers/event-handler.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTAccordion = /** @class */ (function (_super) {
    __extends(KTAccordion, _super);
    function KTAccordion(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'accordion';
        _this._defaultConfig = {
            hiddenClass: 'hidden',
            activeClass: 'active',
            expandAll: false,
        };
        _this._config = _this._defaultConfig;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._handlers();
        return _this;
    }
    KTAccordion.prototype._handlers = function () {
        var _this = this;
        event_handler_1.default.on(this._element, '[data-kt-accordion-toggle]', 'click', function (event, target) {
            event.preventDefault();
            var accordionElement = target.closest('[data-kt-accordion-item]');
            if (accordionElement)
                _this._toggle(accordionElement);
        });
    };
    KTAccordion.prototype._toggle = function (accordionElement) {
        var payload = { cancel: false };
        this._fireEvent('toggle', payload);
        this._dispatchEvent('toggle', payload);
        if (payload.cancel === true) {
            return;
        }
        if (accordionElement.classList.contains('active')) {
            this._hide(accordionElement);
        }
        else {
            this._show(accordionElement);
        }
    };
    KTAccordion.prototype._show = function (accordionElement) {
        var _this = this;
        if (accordionElement.hasAttribute('animating') ||
            accordionElement.classList.contains(this._getOption('activeClass')))
            return;
        var toggleElement = dom_1.default.child(accordionElement, '[data-kt-accordion-toggle]');
        if (!toggleElement)
            return;
        var contentElement = dom_1.default.getElement("#".concat(toggleElement.getAttribute('aria-controls')));
        if (!contentElement)
            return;
        var payload = { cancel: false };
        this._fireEvent('show', payload);
        this._dispatchEvent('show', payload);
        if (payload.cancel === true) {
            return;
        }
        if (this._getOption('expandAll') === false) {
            this._hideSiblings(accordionElement);
        }
        accordionElement.setAttribute('aria-expanded', 'true');
        accordionElement.classList.add(this._getOption('activeClass'));
        accordionElement.setAttribute('animating', 'true');
        contentElement.classList.remove(this._getOption('hiddenClass'));
        contentElement.style.height = "0px";
        dom_1.default.reflow(contentElement);
        contentElement.style.height = "".concat(contentElement.scrollHeight, "px");
        dom_1.default.transitionEnd(contentElement, function () {
            accordionElement.removeAttribute('animating');
            contentElement.style.height = '';
            _this._fireEvent('shown');
            _this._dispatchEvent('shown');
        });
    };
    KTAccordion.prototype._hide = function (accordionElement) {
        var _this = this;
        if (accordionElement.hasAttribute('animating') ||
            !accordionElement.classList.contains(this._getOption('activeClass')))
            return;
        var toggleElement = dom_1.default.child(accordionElement, '[data-kt-accordion-toggle]');
        if (!toggleElement)
            return;
        var contentElement = dom_1.default.getElement("#".concat(toggleElement.getAttribute('aria-controls')));
        if (!contentElement)
            return;
        var payload = { cancel: false };
        this._fireEvent('hide', payload);
        this._dispatchEvent('hide', payload);
        if (payload.cancel === true) {
            return;
        }
        accordionElement.setAttribute('aria-expanded', 'false');
        contentElement.style.height = "".concat(contentElement.scrollHeight, "px");
        dom_1.default.reflow(contentElement);
        contentElement.style.height = '0px';
        accordionElement.setAttribute('animating', 'true');
        dom_1.default.transitionEnd(contentElement, function () {
            accordionElement.removeAttribute('animating');
            accordionElement.classList.remove(_this._getOption('activeClass'));
            contentElement.classList.add(_this._getOption('hiddenClass'));
            _this._fireEvent('hidden');
            _this._dispatchEvent('hidden');
        });
    };
    KTAccordion.prototype._hideSiblings = function (accordionElement) {
        var _this = this;
        var siblings = dom_1.default.siblings(accordionElement);
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
            _this._hide(sibling);
        });
    };
    KTAccordion.prototype.show = function (accordionElement) {
        this._show(accordionElement);
    };
    KTAccordion.prototype.hide = function (accordionElement) {
        this._hide(accordionElement);
    };
    KTAccordion.prototype.toggle = function (accordionElement) {
        this._toggle(accordionElement);
    };
    KTAccordion.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'accordion')) {
            return data_1.default.get(element, 'accordion');
        }
        if (element.getAttribute('data-kt-accordion-initialized') === 'true') {
            return new KTAccordion(element);
        }
        return null;
    };
    KTAccordion.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTAccordion(element, config);
    };
    KTAccordion.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-accordion]');
        elements.forEach(function (element) {
            new KTAccordion(element);
        });
    };
    KTAccordion.init = function () {
        KTAccordion.createInstances();
    };
    return KTAccordion;
}(component_1.default));
exports.KTAccordion = KTAccordion;
if (typeof window !== 'undefined') {
    window.KTAccordion = KTAccordion;
}


/***/ }),

/***/ "./src/components/accordion/index.ts":
/*!*******************************************!*\
  !*** ./src/components/accordion/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTAccordion = void 0;
var accordion_1 = __webpack_require__(/*! ./accordion */ "./src/components/accordion/accordion.ts");
Object.defineProperty(exports, "KTAccordion", ({ enumerable: true, get: function () { return accordion_1.KTAccordion; } }));


/***/ }),

/***/ "./src/components/collapse/collapse.ts":
/*!*********************************************!*\
  !*** ./src/components/collapse/collapse.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTCollapse = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTCollapse = /** @class */ (function (_super) {
    __extends(KTCollapse, _super);
    function KTCollapse(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'collapse';
        _this._defaultConfig = {
            hiddenClass: 'hidden',
            activeClass: 'active',
            target: '',
        };
        _this._config = _this._defaultConfig;
        _this._isAnimating = false;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._targetElement = _this._getTargetElement();
        if (!_this._targetElement) {
            return _this;
        }
        _this._handlers();
        return _this;
    }
    KTCollapse.prototype._getTargetElement = function () {
        return (dom_1.default.getElement(this._element.getAttribute('data-kt-collapse')) || dom_1.default.getElement(this._getOption('target')));
    };
    KTCollapse.prototype._isOpen = function () {
        return this._targetElement.classList.contains(this._getOption('activeClass'));
    };
    KTCollapse.prototype._handlers = function () {
        var _this = this;
        this._element.addEventListener('click', function (event) {
            event.preventDefault();
            _this._toggle();
        });
    };
    KTCollapse.prototype._expand = function () {
        var _this = this;
        if (this._isAnimating || this._isOpen()) {
            return;
        }
        var payload = { cancel: false };
        this._fireEvent('expand', payload);
        this._dispatchEvent('expand', payload);
        if (payload.cancel === true) {
            return;
        }
        if (this._element) {
            this._element.setAttribute('aria-expanded', 'true');
            this._element.classList.add(this._getOption('activeClass'));
        }
        this._targetElement.classList.remove(this._getOption('hiddenClass'));
        this._targetElement.classList.add(this._getOption('activeClass'));
        this._targetElement.style.height = '0px';
        this._targetElement.style.overflow = 'hidden';
        dom_1.default.reflow(this._targetElement);
        this._targetElement.style.height = "".concat(this._targetElement.scrollHeight, "px");
        this._isAnimating = true;
        dom_1.default.transitionEnd(this._targetElement, function () {
            _this._isAnimating = false;
            _this._targetElement.style.height = '';
            _this._targetElement.style.overflow = '';
            _this._fireEvent('expanded');
            _this._dispatchEvent('expanded');
        });
    };
    KTCollapse.prototype._collapse = function () {
        var _this = this;
        if (this._isAnimating || !this._isOpen()) {
            return;
        }
        var payload = { cancel: false };
        this._fireEvent('collapse', payload);
        this._dispatchEvent('collapse', payload);
        if (payload.cancel === true) {
            return;
        }
        if (!this._element)
            return;
        this._element.setAttribute('aria-expanded', 'false');
        this._element.classList.remove(this._getOption('activeClass'));
        this._targetElement.classList.remove(this._getOption('activeClass'));
        this._targetElement.style.height = "".concat(this._targetElement.scrollHeight, "px");
        dom_1.default.reflow(this._targetElement);
        this._targetElement.style.height = "0px";
        this._targetElement.style.overflow = 'hidden';
        this._isAnimating = true;
        dom_1.default.transitionEnd(this._targetElement, function () {
            _this._isAnimating = false;
            _this._targetElement.classList.add(_this._getOption('hiddenClass'));
            _this._targetElement.style.overflow = '';
            _this._fireEvent('collapsed');
            _this._dispatchEvent('collapsed');
        });
    };
    KTCollapse.prototype._toggle = function () {
        var payload = { cancel: false };
        this._fireEvent('toggle', payload);
        this._dispatchEvent('toggle', payload);
        if (payload.cancel === true) {
            return;
        }
        if (this._isOpen()) {
            this._collapse();
        }
        else {
            this._expand();
        }
    };
    KTCollapse.prototype.expand = function () {
        return this._expand();
    };
    KTCollapse.prototype.collapse = function () {
        return this._collapse();
    };
    KTCollapse.prototype.isOpen = function () {
        return this._isOpen();
    };
    KTCollapse.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'collapse')) {
            return data_1.default.get(element, 'collapse');
        }
        if (element.getAttribute('data-kt-collapse')) {
            return new KTCollapse(element);
        }
        return null;
    };
    KTCollapse.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTCollapse(element, config);
    };
    KTCollapse.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-collapse]');
        elements.forEach(function (element) {
            new KTCollapse(element);
        });
    };
    KTCollapse.init = function () {
        KTCollapse.createInstances();
    };
    return KTCollapse;
}(component_1.default));
exports.KTCollapse = KTCollapse;
if (typeof window !== 'undefined') {
    window.KTCollapse = KTCollapse;
}


/***/ }),

/***/ "./src/components/collapse/index.ts":
/*!******************************************!*\
  !*** ./src/components/collapse/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTCollapse = void 0;
var collapse_1 = __webpack_require__(/*! ./collapse */ "./src/components/collapse/collapse.ts");
Object.defineProperty(exports, "KTCollapse", ({ enumerable: true, get: function () { return collapse_1.KTCollapse; } }));


/***/ }),

/***/ "./src/components/component.ts":
/*!*************************************!*\
  !*** ./src/components/component.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var data_1 = __webpack_require__(/*! ../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../helpers/dom */ "./src/helpers/dom.ts");
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");
var config_1 = __webpack_require__(/*! ./config */ "./src/components/config.ts");
var KTComponent = /** @class */ (function () {
    function KTComponent() {
        this._dataOptionPrefix = 'kt-';
        this._uid = null;
        this._element = null;
    }
    KTComponent.prototype._init = function (element) {
        element = dom_1.default.getElement(element);
        if (!element) {
            return;
        }
        this._element = element;
        this._events = new Map();
        this._uid = utils_1.default.geUID(this._name);
        this._element.setAttribute("data-kt-".concat(this._name, "-initialized"), 'true');
        data_1.default.set(this._element, this._name, this);
    };
    KTComponent.prototype._fireEvent = function (eventType, payload) {
        var _a;
        if (payload === void 0) { payload = null; }
        (_a = this._events.get(eventType)) === null || _a === void 0 ? void 0 : _a.forEach(function (callable) {
            callable(payload);
        });
    };
    KTComponent.prototype._dispatchEvent = function (eventType, payload) {
        if (payload === void 0) { payload = null; }
        var event = new CustomEvent(eventType, {
            detail: { payload: payload },
            bubbles: true,
            cancelable: true,
            composed: false,
        });
        if (!this._element)
            return;
        this._element.dispatchEvent(event);
    };
    KTComponent.prototype._getOption = function (name) {
        var value = this._config[name];
        var reponsiveValue = dom_1.default.getCssProp(this._element, "--kt-".concat(this._name, "-").concat(utils_1.default.camelReverseCase(name)));
        return reponsiveValue || value;
    };
    KTComponent.prototype._getGlobalConfig = function () {
        if (window.KTGlobalComponentsConfig &&
            window.KTGlobalComponentsConfig[this._name]) {
            return window.KTGlobalComponentsConfig[this._name];
        }
        else if (config_1.default &&
            config_1.default[this._name]) {
            return config_1.default[this._name];
        }
        else {
            return {};
        }
    };
    KTComponent.prototype._buildConfig = function (config) {
        if (config === void 0) { config = {}; }
        if (!this._element)
            return;
        this._config = __assign(__assign(__assign(__assign({}, this._defaultConfig), this._getGlobalConfig()), dom_1.default.getDataAttributes(this._element, this._dataOptionPrefix + this._name)), config);
    };
    KTComponent.prototype.dispose = function () {
        if (!this._element)
            return;
        this._element.removeAttribute("data-kt-".concat(this._name, "-initialized"));
        data_1.default.remove(this._element, this._name);
    };
    KTComponent.prototype.on = function (eventType, callback) {
        var eventId = utils_1.default.geUID();
        if (!this._events.get(eventType)) {
            this._events.set(eventType, new Map());
        }
        this._events.get(eventType).set(eventId, callback);
        return eventId;
    };
    KTComponent.prototype.off = function (eventType, eventId) {
        var _a;
        (_a = this._events.get(eventType)) === null || _a === void 0 ? void 0 : _a.delete(eventId);
    };
    KTComponent.prototype.getOption = function (name) {
        return this._getOption(name);
    };
    KTComponent.prototype.getElement = function () {
        if (!this._element)
            return null;
        return this._element;
    };
    return KTComponent;
}());
exports["default"] = KTComponent;


/***/ }),

/***/ "./src/components/config.ts":
/*!**********************************!*\
  !*** ./src/components/config.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable max-len */
var KTGlobalComponentsConfig = {
    collapse: {
        hiddenClass: 'hidden',
    },
    dismiss: {
        hiddenClass: 'hidden',
    },
    tabs: {
        hiddenClass: 'hidden',
    },
    accordion: {
        hiddenClass: 'hidden',
    }
};
exports["default"] = KTGlobalComponentsConfig;


/***/ }),

/***/ "./src/components/datatable/datatable.ts":
/*!***********************************************!*\
  !*** ./src/components/datatable/datatable.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDataTable = void 0;
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/helpers/event-handler.ts");
var utils_1 = __webpack_require__(/*! ../../helpers/utils */ "./src/helpers/utils.ts");
var index_1 = __webpack_require__(/*! ../../index */ "./src/index.ts");
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
/**
 * Custom DataTable plugin class with server-side API, pagination, and sorting
 * @classdesc A custom KTComponent class that integrates server-side API, pagination, and sorting functionality into a table.
 * It supports fetching data from a server-side API, pagination, and sorting of the fetched data.
 * @class
 * @extends {KTComponent}
 * @param {HTMLElement} element The table element
 * @param {KTDataTableConfigInterface} [config] Additional configuration options
 */
var KTDataTable = /** @class */ (function (_super) {
    __extends(KTDataTable, _super);
    function KTDataTable(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'datatable';
        _this._originalTbodyClass = ''; // Store original tbody class
        _this._originalTrClasses = []; // Store original tr classes
        _this._originalTheadClass = ''; // Store original thead class
        _this._originalTdClasses = []; // Store original td classes as a 2D array [row][col]
        _this._originalThClasses = []; // Store original th classes
        _this._checkboxListener = function (event) {
            _this._checkboxToggle(event); // Toggle row checkbox state
        };
        // private _searchListener: (value: string) => void;
        _this._data = [];
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._defaultConfig = _this._initDefaultConfig(config);
        _this._init(element);
        _this._buildConfig();
        // Store the instance directly on the element
        element.instance = _this;
        _this._initElements();
        if (_this._config.stateSave === false) {
            _this._deleteState();
        }
        if (_this._config.stateSave) {
            _this._loadState();
        }
        _this._initTableHeader();
        _this._updateData();
        _this._fireEvent('init');
        _this._dispatchEvent('init');
        return _this;
    }
    /**
     * Initialize default configuration for the datatable
     * @param config User-provided configuration options
     * @returns Default configuration merged with user-provided options
     */
    KTDataTable.prototype._initDefaultConfig = function (config) {
        return __assign({ 
            /**
             * HTTP method for server-side API call
             */
            requestMethod: 'GET', 
            /**
             * Custom HTTP headers for the API request
             */
            requestHeaders: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }, 
            /**
             * Pagination info template
             */
            info: '{start}-{end} of {total}', 
            /**
             * Info text when there is no data
             */
            infoEmpty: 'No records found', 
            /**
             * Available page sizes
             */
            pageSizes: [5, 10, 20, 30, 50], 
            /**
             * Default page size
             */
            pageSize: 10, 
            /**
             * Enable or disable pagination more button
             */
            pageMore: true, 
            /**
             * Maximum number of pages before enabling pagination more button
             */
            pageMoreLimit: 3, 
            /**
             * Pagination button templates
             */
            pagination: {
                number: {
                    /**
                     * CSS classes to be added to the pagination button
                     */
                    class: 'size-8 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 [.active&]:bg-gray-100 dark:[.active&]:bg-gray-800 font-medium rounded-md inline-flex shrink-0 items-center justify-center focus:outline-none',
                    /**
                     * Text to be displayed in the pagination button
                     */
                    text: '{page}',
                },
                previous: {
                    /**
                     * CSS classes to be added to the previous pagination button
                     */
                    class: 'size-8 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-md inline-flex shrink-0 items-center justify-center focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
                    /**
                     * Text to be displayed in the previous pagination button
                     */
                    text: "\n\t\t\t\t\t\t<svg class=\"rtl:transform rtl:rotate-180 size-4 shrink-0\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M8.86501 16.7882V12.8481H21.1459C21.3724 12.8481 21.5897 12.7581 21.7498 12.5979C21.91 12.4378 22 12.2205 22 11.994C22 11.7675 21.91 11.5503 21.7498 11.3901C21.5897 11.2299 21.3724 11.1399 21.1459 11.1399H8.86501V7.2112C8.86628 7.10375 8.83517 6.9984 8.77573 6.90887C8.7163 6.81934 8.63129 6.74978 8.53177 6.70923C8.43225 6.66869 8.32283 6.65904 8.21775 6.68155C8.11267 6.70405 8.0168 6.75766 7.94262 6.83541L2.15981 11.6182C2.1092 11.668 2.06901 11.7274 2.04157 11.7929C2.01413 11.8584 2 11.9287 2 11.9997C2 12.0707 2.01413 12.141 2.04157 12.2065C2.06901 12.272 2.1092 12.3314 2.15981 12.3812L7.94262 17.164C8.0168 17.2417 8.11267 17.2953 8.21775 17.3178C8.32283 17.3403 8.43225 17.3307 8.53177 17.2902C8.63129 17.2496 8.7163 17.18 8.77573 17.0905C8.83517 17.001 8.86628 16.8956 8.86501 16.7882Z\" fill=\"currentColor\"/>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t",
                },
                next: {
                    /**
                     * CSS classes to be added to the next pagination button
                     */
                    class: 'size-8 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-md inline-flex shrink-0 items-center justify-center focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
                    /**
                     * Text to be displayed in the next pagination button
                     */
                    text: "\n\t\t\t\t\t\t<svg class=\"rtl:transform rtl:rotate-180 size-4 shrink-0\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M15.135 7.21144V11.1516H2.85407C2.62756 11.1516 2.41032 11.2415 2.25015 11.4017C2.08998 11.5619 2 11.7791 2 12.0056C2 12.2321 2.08998 12.4494 2.25015 12.6096C2.41032 12.7697 2.62756 12.8597 2.85407 12.8597H15.135V16.7884C15.1337 16.8959 15.1648 17.0012 15.2243 17.0908C15.2837 17.1803 15.3687 17.2499 15.4682 17.2904C15.5677 17.3309 15.6772 17.3406 15.7822 17.3181C15.8873 17.2956 15.9832 17.242 16.0574 17.1642L21.8402 12.3814C21.8908 12.3316 21.931 12.2722 21.9584 12.2067C21.9859 12.1412 22 12.0709 22 11.9999C22 11.9289 21.9859 11.8586 21.9584 11.7931C21.931 11.7276 21.8908 11.6683 21.8402 11.6185L16.0574 6.83565C15.9832 6.75791 15.8873 6.70429 15.7822 6.68179C15.6772 6.65929 15.5677 6.66893 15.4682 6.70948C15.3687 6.75002 15.2837 6.81959 15.2243 6.90911C15.1648 6.99864 15.1337 7.10399 15.135 7.21144Z\" fill=\"currentColor\"/>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t",
                },
                more: {
                    /**
                     * CSS classes to be added to the pagination more button
                     */
                    class: 'size-8 text-sm text-gray-700 dark:text-gray-200 font-medium rounded-md inline-flex shrink-0 items-center justify-center pointer-events-none',
                    /**
                     * Text to be displayed in the pagination more button
                     */
                    text: '...',
                },
            }, 
            /**
             * Sorting options
             */
            sort: {
                /**
                 * CSS classes to be added to the sortable headers
                 */
                classes: {
                    base: 'sort',
                    asc: 'asc',
                    desc: 'desc',
                },
                /**
                 * Local sorting callback function
                 * Sorts the data array based on the sort field and order
                 * @param data Data array to be sorted
                 * @param sortField Property name of the data object to be sorted by
                 * @param sortOrder Sorting order (ascending or descending)
                 * @returns Sorted data array
                 */
                callback: function (data, sortField, sortOrder) {
                    /**
                     * Compares two values by converting them to strings and removing any HTML tags or white spaces
                     * @param a First value to be compared
                     * @param b Second value to be compared
                     * @returns 1 if a > b, -1 if a < b, 0 if a === b
                     */
                    var compareValues = function (a, b) {
                        var aText = String(a).replace(/<[^>]*>|&nbsp;/g, '');
                        var bText = String(b).replace(/<[^>]*>|&nbsp;/g, '');
                        return aText > bText
                            ? sortOrder === 'asc'
                                ? 1
                                : -1
                            : aText < bText
                                ? sortOrder === 'asc'
                                    ? -1
                                    : 1
                                : 0;
                    };
                    return data.sort(function (a, b) {
                        var aValue = a[sortField];
                        var bValue = b[sortField];
                        return compareValues(aValue, bValue);
                    });
                },
            }, search: {
                /**
                 * Delay in milliseconds before the search function is applied to the data array
                 * @default 500
                 */
                delay: 500, // ms
                /**
                 * Local search callback function
                 * Filters the data array based on the search string
                 * @param data Data array to be filtered
                 * @param search Search string used to filter the data array
                 * @returns Filtered data array
                 */
                callback: function (data, search) {
                    if (!data || !search) {
                        return [];
                    }
                    return data.filter(function (item) {
                        if (!item) {
                            return false;
                        }
                        return Object.values(item).some(function (value) {
                            if (typeof value !== 'string' &&
                                typeof value !== 'number' &&
                                typeof value !== 'boolean') {
                                return false;
                            }
                            var valueText = String(value)
                                .replace(/<[^>]*>|&nbsp;/g, '')
                                .toLowerCase();
                            return valueText.includes(search.toLowerCase());
                        });
                    });
                },
            }, 
            /**
             * Loading spinner options
             */
            loading: {
                /**
                 * Template to be displayed during data fetching process
                 */
                template: "\n\t\t\t\t\t<div class=\"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2\">\n\t\t\t\t\t\t<div class=\"flex items-center gap-2 px-4 py-2 font-medium leading-none text-2sm border border-gray-200 shadow-default rounded-md text-gray-500 bg-light\">\n\t\t\t\t\t\t\t<svg class=\"animate-spin -ml-1 h-5 w-5 text-gray-600\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n\t\t\t\t\t\t\t\t<circle class=\"opacity-25\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"3\"></circle>\n\t\t\t\t\t\t\t\t<path class=\"opacity-75\" fill=\"currentColor\" d=\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"></path>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t{content}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t",
                /**
                 * Loading text to be displayed in the template
                 */
                content: 'Loading...',
            }, 
            /**
             * Selectors of the elements to be targeted
             */
            attributes: {
                /**
                 * Data table element
                 */
                table: 'table[data-kt-datatable-table="true"]',
                /**
                 * Pagination info element
                 */
                info: '[data-kt-datatable-info="true"]',
                /**
                 * Page size dropdown element
                 */
                size: '[data-kt-datatable-size="true"]',
                /**
                 * Pagination element
                 */
                pagination: '[data-kt-datatable-pagination="true"]',
                /**
                 * Spinner element
                 */
                spinner: '[data-kt-datatable-spinner="true"]',
                /**
                 * Checkbox element
                 */
                check: '[data-kt-datatable-check="true"]',
                checkbox: '[data-kt-datatable-row-check="true"]',
            }, 
            /**
             * Enable or disable state saving
             */
            stateSave: true, checkbox: {
                checkedClass: 'checked',
            }, 
            /**
             * Private properties
             */
            _state: {} }, config);
    };
    /**
     * Initialize table, tbody, thead, info, size, and pagination elements
     * @returns {void}
     */
    KTDataTable.prototype._initElements = function () {
        /**
         * Data table element
         */
        this._tableElement = this._element.querySelector(this._config.attributes.table);
        /**
         * Table body element
         */
        this._tbodyElement =
            this._tableElement.tBodies[0] || this._tableElement.createTBody();
        /**
         * Table head element
         */
        this._theadElement = this._tableElement.tHead;
        // Store original classes
        this._storeOriginalClasses();
        /**
         * Pagination info element
         */
        this._infoElement = this._element.querySelector(this._config.attributes.info);
        /**
         * Page size dropdown element
         */
        this._sizeElement = this._element.querySelector(this._config.attributes.size);
        /**
         * Pagination element
         */
        this._paginationElement = this._element.querySelector(this._config.attributes.pagination);
    };
    /**
     * Store original classes from table elements
     * @returns {void}
     */
    KTDataTable.prototype._storeOriginalClasses = function () {
        var _this = this;
        // Store tbody class
        if (this._tbodyElement) {
            this._originalTbodyClass = this._tbodyElement.className || '';
        }
        // Store thead class and th classes
        if (this._theadElement) {
            this._originalTheadClass = this._theadElement.className || '';
            // Store th classes
            var thElements = this._theadElement.querySelectorAll('th');
            this._originalThClasses = Array.from(thElements).map(function (th) { return th.className || ''; });
        }
        // Store tr and td classes
        if (this._tbodyElement) {
            var originalRows = this._tbodyElement.querySelectorAll('tr');
            this._originalTrClasses = Array.from(originalRows).map(function (row) { return row.className || ''; });
            // Store td classes as a 2D array
            this._originalTdClasses = [];
            Array.from(originalRows).forEach(function (row, rowIndex) {
                var tdElements = row.querySelectorAll('td');
                _this._originalTdClasses[rowIndex] = Array.from(tdElements).map(function (td) { return td.className || ''; });
            });
        }
    };
    /**
     * Fetch data from the server or from the DOM if `apiEndpoint` is not defined.
     * @returns {Promise<void>} Promise which is resolved after data has been fetched and checkbox plugin initialized.
     */
    KTDataTable.prototype._updateData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._showSpinner(); // Show spinner before fetching data
                // Fetch data from the DOM and initialize the checkbox plugin
                return [2 /*return*/, typeof this._config.apiEndpoint === 'undefined'
                        ? this._fetchDataFromLocal().then(this._finalize.bind(this))
                        : this._fetchDataFromServer().then(this._finalize.bind(this))];
            });
        });
    };
    /**
     * Finalize data table after data has been fetched
     * @returns {void}
     */
    KTDataTable.prototype._finalize = function () {
        this._element.classList.add('datatable-initialized');
        var headerCheckElement = this._element.querySelector(this._config.attributes.check);
        if (headerCheckElement) {
            this._initChecbox(headerCheckElement);
        }
        this._attachSearchEvent();
        if (typeof index_1.default !== 'undefined') {
            index_1.default.init();
        }
        /**
         * Hide spinner
         */
        this._hideSpinner();
    };
    /**
     * Attach search event to the search input element
     * @returns {void}
     */
    KTDataTable.prototype._attachSearchEvent = function () {
        var _this = this;
        var tableId = this._tableId();
        var searchElement = document.querySelector("[data-kt-datatable-search=\"#".concat(tableId, "\"]"));
        // Get search state
        var search = this.getState().search;
        // Set search value
        if (searchElement) {
            searchElement.value = typeof search === 'string' ? search : String(search);
        }
        if (searchElement) {
            // Check if a debounced search function already exists
            if (searchElement._debouncedSearch) {
                // Remove the existing debounced event listener
                searchElement.removeEventListener('keyup', searchElement._debouncedSearch);
            }
            // Create a new debounced search function
            var debouncedSearch = this._debounce(function () {
                _this.search(searchElement.value);
            }, this._config.search.delay);
            // Store the new debounced function as a property of the element
            searchElement._debouncedSearch = debouncedSearch;
            // Add the new debounced event listener
            searchElement.addEventListener('keyup', debouncedSearch);
        }
    };
    /**
     * Initialize the checkbox plugin
     * @param {HTMLInputElement} headerCheckElement - The header checkbox element
     * @returns {void}
     */
    KTDataTable.prototype._initChecbox = function (headerCheckElement) {
        this._headerCheckElement = headerCheckElement;
        this._headerChecked = headerCheckElement.checked;
        this._targetElements = this._element.querySelectorAll(this._config.attributes.checkbox);
        this._checkboxHandler();
    };
    /**
     * Fetch data from the DOM
     * Fetch data from the table element and save it to the `originalData` state property.
     * This method is used when the data is not fetched from the server via an API endpoint.
     */
    KTDataTable.prototype._fetchDataFromLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sortField, sortOrder, page, pageSize, search, originalData, _b, originalData_1, originalDataAttributes, _temp, startIndex, endIndex;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.getState(), sortField = _a.sortField, sortOrder = _a.sortOrder, page = _a.page, pageSize = _a.pageSize, search = _a.search;
                        originalData = this.getState().originalData;
                        // If the table element or the original data is not defined, bail
                        if (!this._tableElement ||
                            originalData === undefined ||
                            this._tableConfigInvalidate() ||
                            this._localTableHeaderInvalidate() ||
                            this._localTableContentInvalidate()) {
                            this._deleteState();
                            _b = this._localExtractTableContent(), originalData_1 = _b.originalData, originalDataAttributes = _b.originalDataAttributes;
                            this._config._state.originalData = originalData_1;
                            this._config._state.originalDataAttributes = originalDataAttributes;
                        }
                        // Update the original data variable
                        originalData = this.getState().originalData;
                        _temp = (this._data = __spreadArray([], originalData, true));
                        if (search) {
                            _temp = this._data = this._config.search.callback.call(this, this._data, search);
                        }
                        // If sorting is defined, sort the data
                        if (sortField !== undefined &&
                            sortOrder !== undefined &&
                            sortOrder !== '') {
                            if (typeof this._config.sort.callback === 'function') {
                                this._data = this._config.sort.callback.call(this, this._data, sortField, sortOrder);
                            }
                        }
                        // If there is data, slice it to the current page size
                        if (((_c = this._data) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                            startIndex = (page - 1) * pageSize;
                            endIndex = startIndex + pageSize;
                            this._data = this._data.slice(startIndex, endIndex);
                        }
                        // Determine number of total rows
                        this._config._state.totalItems = _temp.length;
                        // Draw the data
                        return [4 /*yield*/, this._draw()];
                    case 1:
                        // Draw the data
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if the table content has been invalidated by comparing the current checksum of the table body
     * with the stored checksum in the state. If the checksums are different, the state is updated with the
     * new checksum and `true` is returned. Otherwise, `false` is returned.
     *
     * @returns {boolean} `true` if the table content has been invalidated, `false` otherwise.
     */
    KTDataTable.prototype._localTableContentInvalidate = function () {
        var checksum = utils_1.default.checksum(JSON.stringify(this._tbodyElement.innerHTML));
        if (this.getState()._contentChecksum !== checksum) {
            this._config._state._contentChecksum = checksum;
            return true;
        }
        return false;
    };
    KTDataTable.prototype._tableConfigInvalidate = function () {
        // Remove _data and _state from config
        var _a = this._config, _data = _a._data, _state = _a._state, restConfig = __rest(_a, ["_data", "_state"]);
        var checksum = utils_1.default.checksum(JSON.stringify(restConfig));
        if (_state._configChecksum !== checksum) {
            this._config._state._configChecksum = checksum;
            return true;
        }
        return false;
    };
    /**
     * Extract the table content and returns it as an object containing an array of original data and an array of original data attributes.
     *
     * @returns {{originalData: T[], originalDataAttributes: KTDataTableAttributeInterface[]}} - An object containing an array of original data and an array of original data attributes.
     */
    KTDataTable.prototype._localExtractTableContent = function () {
        var originalData = [];
        var originalDataAttributes = [];
        // Re-store original classes when extracting content
        this._storeOriginalClasses();
        var rows = this._tbodyElement.querySelectorAll('tr');
        rows.forEach(function (row) {
            var dataRow = {};
            var dataRowAttribute = {};
            // Loop through each cell in the row
            row
                .querySelectorAll('td')
                .forEach(function (td, index) {
                var _a;
                var attributes = {};
                // Copy all attributes to the cell data
                Array.from(td.attributes).forEach(function (attr) {
                    attributes[attr.name] = attr.value;
                });
                // Set the data for the current row and cell
                dataRow[index] = (_a = td.innerHTML) === null || _a === void 0 ? void 0 : _a.trim();
                dataRowAttribute[index] = attributes;
            });
            // If the row has any data, add it to the original data array
            if (Object.keys(dataRow).length > 0) {
                originalData.push(dataRow);
                originalDataAttributes.push(dataRowAttribute);
            }
        });
        return { originalData: originalData, originalDataAttributes: originalDataAttributes };
    };
    /**
     * Check if the table header is invalidated
     * @returns {boolean} - Returns true if the table header is invalidated, false otherwise
     */
    KTDataTable.prototype._localTableHeaderInvalidate = function () {
        var _a;
        var originalData = this.getState().originalData;
        var currentTableHeaders = ((_a = this._getTableHeaders()) === null || _a === void 0 ? void 0 : _a.length) || 0;
        var totalColumns = originalData.length
            ? Object.keys(originalData[0]).length
            : 0;
        return currentTableHeaders !== totalColumns;
    };
    /**
     * Fetch data from the server
     */
    KTDataTable.prototype._fetchDataFromServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queryParams, response, responseData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._fireEvent('fetch');
                        this._dispatchEvent('fetch');
                        queryParams = this._getQueryParamsForFetchRequest();
                        return [4 /*yield*/, this._performFetchRequest(queryParams)];
                    case 1:
                        response = _a.sent();
                        responseData = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseData = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        this._noticeOnTable('Error parsing API response as JSON: ' + String(error_1));
                        return [2 /*return*/];
                    case 5:
                        this._fireEvent('fetched', { response: responseData });
                        this._dispatchEvent('fetched', { response: responseData });
                        // Use the mapResponse function to transform the data if provided
                        if (typeof this._config.mapResponse === 'function') {
                            responseData = this._config.mapResponse.call(this, responseData);
                        }
                        this._data = responseData.data;
                        this._config._state.totalItems = responseData.totalCount;
                        return [4 /*yield*/, this._draw()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the query params for a fetch request
     * @returns The query params for the fetch request
     */
    KTDataTable.prototype._getQueryParamsForFetchRequest = function () {
        // Get the current state of the datatable
        var _a = this.getState(), page = _a.page, pageSize = _a.pageSize, sortField = _a.sortField, sortOrder = _a.sortOrder, filters = _a.filters, search = _a.search;
        // Create a new URLSearchParams object to store the query params
        var queryParams = new URLSearchParams();
        // Add the current page number and page size to the query params
        queryParams.set('page', String(page));
        queryParams.set('size', String(pageSize));
        // If there is a sort order and field set, add them to the query params
        if (sortOrder !== undefined) {
            queryParams.set('sortOrder', String(sortOrder));
        }
        if (sortField !== undefined) {
            queryParams.set('sortField', String(sortField));
        }
        // If there are any filters set, add them to the query params
        if (Array.isArray(filters) && filters.length) {
            queryParams.set('filters', JSON.stringify(filters.map(function (filter) { return ({
                // Map the filter object to a simpler object with just the necessary properties
                column: filter.column,
                type: filter.type,
                value: filter.value,
            }); })));
        }
        if (search) {
            queryParams.set('search', typeof search === 'object' ? JSON.stringify(search) : search);
        }
        // If a mapRequest function is provided, call it with the query params object
        if (typeof this._config.mapRequest === 'function') {
            queryParams = this._config.mapRequest.call(this, queryParams);
        }
        // Return the query params object
        return queryParams;
    };
    KTDataTable.prototype._performFetchRequest = function (queryParams) {
        return __awaiter(this, void 0, void 0, function () {
            var requestMethod, requestBody, apiEndpointWithQueryParams;
            var _this = this;
            return __generator(this, function (_a) {
                requestMethod = this._config.requestMethod;
                requestBody = undefined;
                // If the request method is POST, send the query params as the request body
                if (requestMethod === 'POST') {
                    requestBody = queryParams;
                }
                else if (requestMethod === 'GET') {
                    apiEndpointWithQueryParams = new URL(this._config.apiEndpoint);
                    apiEndpointWithQueryParams.search = queryParams.toString();
                    this._config.apiEndpoint = apiEndpointWithQueryParams.toString();
                }
                return [2 /*return*/, fetch(this._config.apiEndpoint, {
                        method: requestMethod,
                        body: requestBody,
                        headers: this._config.requestHeaders,
                    }).catch(function (error) {
                        // Trigger an error event
                        _this._fireEvent('error', { error: error });
                        _this._dispatchEvent('error', { error: error });
                        _this._noticeOnTable('Error performing fetch request: ' + String(error));
                        throw error;
                    })];
            });
        });
    };
    /**
     * Update the table and pagination controls with new data
     * @returns {Promise<void>} A promise that resolves when the table and pagination controls are updated
     */
    KTDataTable.prototype._draw = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._config._state.totalPages =
                    Math.ceil(this.getState().totalItems / this.getState().pageSize) || 0;
                this._fireEvent('draw');
                this._dispatchEvent('draw');
                this._dispose();
                // Update the table and pagination controls
                if (this._theadElement && this._tbodyElement) {
                    this._updateTable();
                }
                if (this._infoElement && this._paginationElement) {
                    this._updatePagination();
                }
                this._fireEvent('drew');
                this._dispatchEvent('drew');
                this._hideSpinner(); // Hide spinner after data is fetched
                if (this._config.stateSave) {
                    this._saveState();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Update the HTML table with new data
     * @returns {HTMLTableSectionElement} The new table body element
     */
    KTDataTable.prototype._updateTable = function () {
        // Clear the existing table contents using a more efficient method
        while (this._tableElement.tBodies.length) {
            this._tableElement.removeChild(this._tableElement.tBodies[0]);
        }
        // Create the table body with the new data
        var tbodyElement = this._tableElement.createTBody();
        // Apply the original class to the new tbody element
        if (this._originalTbodyClass) {
            tbodyElement.className = this._originalTbodyClass;
        }
        this._updateTableContent(tbodyElement);
        return tbodyElement;
    };
    /**
     * Initialize the table header
     * Add sort event listener to all sortable columns
     */
    KTDataTable.prototype._initTableHeader = function () {
        var _this = this;
        if (!this._theadElement) {
            return;
        }
        // Apply the original thead class
        if (this._originalTheadClass) {
            this._theadElement.className = this._originalTheadClass;
        }
        // Set the initial sort icon
        this._setSortIcon(this.getState().sortField, this.getState().sortOrder);
        // Get all the table headers
        var headers = this._getTableHeaders();
        // Loop through each table header
        headers.forEach(function (header, index) {
            // Apply original th class if available
            if (_this._originalThClasses && _this._originalThClasses[index]) {
                // Preserve the existing sort classes if any
                var sortElement = header.querySelector(".".concat(_this._config.sort.classes.base));
                var sortClass = '';
                if (sortElement) {
                    sortClass = sortElement.className;
                }
                // Apply original class but keep the sort classes
                var originalClass = _this._originalThClasses[index];
                header.className = originalClass;
                // Restore sort element class if it existed
                if (sortElement) {
                    sortElement.className = sortClass;
                }
            }
            // If the sort class is not found, it's not a sortable column
            if (!header.querySelector(".".concat(_this._config.sort.classes.base))) {
                return;
            }
            var sortAttribute = header.getAttribute('data-kt-datatable-column-sort') ||
                header.getAttribute('data-kt-datatable-column');
            var sortField = sortAttribute
                ? sortAttribute
                : header.cellIndex;
            // Add click event listener to the header
            header.addEventListener('click', function () {
                var sortOrder = _this._toggleSortOrder(sortField);
                _this._setSortIcon(sortField, sortOrder);
                _this._sort(sortField);
            });
        });
    };
    /**
     * Returns an array of table headers as HTMLTableCellElement.
     * @returns {HTMLTableCellElement[]} An array of table headers.
     */
    KTDataTable.prototype._getTableHeaders = function () {
        if (!this._theadElement) {
            return [];
        }
        return Array.from(this._theadElement.querySelectorAll('th'));
    };
    /**
     * Sets the sort icon in the table header
     * @param sortField The field to set the sort icon for
     * @param sortOrder The sort order (ascending or descending)
     */
    KTDataTable.prototype._setSortIcon = function (sortField, sortOrder) {
        var sortClass = sortOrder
            ? sortOrder === 'asc'
                ? this._config.sort.classes.asc
                : this._config.sort.classes.desc
            : '';
        // Get the appropriate table header element
        var th = typeof sortField === 'number'
            ? this._theadElement.querySelectorAll('th')[sortField]
            : this._theadElement.querySelector("th[data-kt-datatable-column=\"".concat(String(sortField), "\"], th[data-kt-datatable-column-sort=\"").concat(String(sortField), "\"]"));
        if (th) {
            var sortElement = th.querySelector(".".concat(this._config.sort.classes.base));
            if (sortElement) {
                sortElement.className =
                    "".concat(this._config.sort.classes.base, " ").concat(sortClass).trim();
            }
        }
    };
    /**
     * Toggles the sort order of a column
     * @param sortField The field to toggle the sort order for
     * @returns The new sort order (ascending, descending or unsorted)
     */
    KTDataTable.prototype._toggleSortOrder = function (sortField) {
        var _this = this;
        // If the sort field is the same as the current sort field,
        // toggle the sort order. Otherwise, set the sort order to ascending.
        return (function () {
            if (_this.getState().sortField === sortField) {
                switch (_this.getState().sortOrder) {
                    case 'asc':
                        return 'desc'; // Descending
                    case 'desc':
                        return ''; // Unsorted
                    default:
                        return 'asc'; // Ascending
                }
            }
            return 'asc'; // Ascending
        })();
    };
    /**
     * Update the table content
     * @param tbodyElement The table body element
     * @returns {HTMLTableSectionElement} The updated table body element
     */
    KTDataTable.prototype._updateTableContent = function (tbodyElement) {
        var _this = this;
        var fragment = document.createDocumentFragment();
        tbodyElement.textContent = ''; // Clear the tbody element
        if (this._data.length === 0) {
            this._noticeOnTable(this._config.infoEmpty || '');
            return tbodyElement;
        }
        this._data.forEach(function (item, rowIndex) {
            var row = document.createElement('tr');
            // Apply original tr class if available
            if (_this._originalTrClasses && _this._originalTrClasses[rowIndex]) {
                row.className = _this._originalTrClasses[rowIndex];
            }
            if (!_this._config.columns) {
                var dataRowAttributes_1 = _this.getState().originalDataAttributes
                    ? _this.getState().originalDataAttributes[rowIndex]
                    : null;
                Object.keys(item).forEach(function (key, colIndex) {
                    var td = document.createElement('td');
                    td.innerHTML = item[key];
                    // Apply original td class if available
                    if (_this._originalTdClasses &&
                        _this._originalTdClasses[rowIndex] &&
                        _this._originalTdClasses[rowIndex][colIndex]) {
                        td.className = _this._originalTdClasses[rowIndex][colIndex];
                    }
                    if (dataRowAttributes_1) {
                        for (var attr in dataRowAttributes_1[colIndex]) {
                            td.setAttribute(attr, dataRowAttributes_1[colIndex][attr]);
                        }
                    }
                    row.appendChild(td);
                });
            }
            else {
                Object.keys(_this._config.columns).forEach(function (key, colIndex) {
                    var td = document.createElement('td');
                    var columnDef = _this._config.columns[key];
                    // Apply original td class if available
                    if (_this._originalTdClasses &&
                        _this._originalTdClasses[rowIndex] &&
                        _this._originalTdClasses[rowIndex][colIndex]) {
                        td.className = _this._originalTdClasses[rowIndex][colIndex];
                    }
                    if (typeof columnDef.render === 'function') {
                        td.innerHTML = columnDef.render.call(_this, item[key], item, _this);
                    }
                    else {
                        td.textContent = item[key];
                    }
                    if (typeof columnDef.createdCell === 'function') {
                        columnDef.createdCell.call(_this, td, item[key], item, row);
                    }
                    row.appendChild(td);
                });
            }
            fragment.appendChild(row);
        });
        tbodyElement.appendChild(fragment);
        return tbodyElement;
    };
    /**
     * Show a notice on the table
     * @param message The message to show. If empty, the message will be removed
     * @returns {void}
     */
    KTDataTable.prototype._noticeOnTable = function (message) {
        var _a;
        if (message === void 0) { message = ''; }
        var row = this._tableElement.tBodies[0].insertRow();
        var cell = row.insertCell();
        cell.colSpan = ((_a = this._getTableHeaders()) === null || _a === void 0 ? void 0 : _a.length) || 0;
        cell.innerHTML = message;
    };
    KTDataTable.prototype._updatePagination = function () {
        this._removeChildElements(this._sizeElement);
        this._createPageSizeControls(this._sizeElement);
        this._removeChildElements(this._paginationElement);
        this._createPaginationControls(this._infoElement, this._paginationElement);
    };
    /**
     * Removes all child elements from the given container element.
     * @param container The container element to remove the child elements from.
     */
    KTDataTable.prototype._removeChildElements = function (container) {
        if (!container) {
            return;
        }
        // Loop through all child elements of the container and remove them one by one
        while (container.firstChild) {
            // Remove the first child element (which is the first element in the list of child elements)
            container.removeChild(container.firstChild);
        }
    };
    /**
     * Creates a container element for the items per page selector.
     * @param _sizeElement The element to create the page size controls in.
     * @returns The container element.
     */
    KTDataTable.prototype._createPageSizeControls = function (_sizeElement) {
        var _this = this;
        // If no element is provided, return early
        if (!_sizeElement) {
            return _sizeElement;
        }
        // Create <option> elements for each page size option
        var options = this._config.pageSizes.map(function (size) {
            var option = document.createElement('option');
            option.value = String(size);
            option.text = String(size);
            option.selected = _this.getState().pageSize === size;
            return option;
        });
        // Add the <option> elements to the provided element
        _sizeElement.append.apply(_sizeElement, options);
        // Create an event listener for the "change" event on the element
        var _pageSizeControlsEvent = function (event) {
            // When the element changes, reload the page with the new page size and page number 1
            _this._reloadPageSize(Number(event.target.value), 1);
        };
        // Bind the event listener to the component instance
        _sizeElement.onchange = _pageSizeControlsEvent.bind(this);
        // Return the element
        return _sizeElement;
    };
    /**
     * Reloads the data with the specified page size and optional page number.
     * @param pageSize The new page size.
     * @param page The new page number (optional, defaults to 1).
     */
    KTDataTable.prototype._reloadPageSize = function (pageSize, page) {
        if (page === void 0) { page = 1; }
        // Update the page size and page number in the state
        this._config._state.pageSize = pageSize;
        this._config._state.page = page;
        // Update the data with the new page size and page number
        this._updateData();
    };
    /**
     * Creates the pagination controls for the component.
     * @param _infoElement The element to set the info text in.
     * @param _paginationElement The element to create the pagination controls in.
     * @return {HTMLElement} The element containing the pagination controls.
     */
    KTDataTable.prototype._createPaginationControls = function (_infoElement, _paginationElement) {
        if (!_infoElement || !_paginationElement || this._data.length === 0) {
            return null;
        }
        this._setPaginationInfoText(_infoElement);
        var paginationContainer = this._createPaginationContainer(_paginationElement);
        if (paginationContainer) {
            this._createPaginationButtons(paginationContainer);
        }
        return paginationContainer;
    };
    /**
     * Sets the info text for the pagination controls.
     * @param _infoElement The element to set the info text in.
     */
    KTDataTable.prototype._setPaginationInfoText = function (_infoElement) {
        _infoElement.textContent = this._config.info
            .replace('{start}', (this.getState().page - 1) * this.getState().pageSize + 1 + '')
            .replace('{end}', Math.min(this.getState().page * this.getState().pageSize, this.getState().totalItems) + '')
            .replace('{total}', this.getState().totalItems + '');
    };
    /**
     * Creates the container element for the pagination controls.
     * @param _paginationElement The element to create the pagination controls in.
     * @return {HTMLElement} The container element.
     */
    KTDataTable.prototype._createPaginationContainer = function (_paginationElement) {
        var paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        _paginationElement.appendChild(paginationContainer);
        return paginationContainer;
    };
    /**
     * Creates the pagination buttons for the component.
     * @param paginationContainer The container element for the pagination controls.
     */
    KTDataTable.prototype._createPaginationButtons = function (paginationContainer) {
        var _this = this;
        var _a = this.getState(), currentPage = _a.page, totalPages = _a.totalPages;
        var _b = this._config.pagination, previous = _b.previous, next = _b.next, number = _b.number, more = _b.more;
        // Helper function to create a button
        var createButton = function (text, className, disabled, handleClick) {
            var button = document.createElement('button');
            button.className = className;
            button.innerHTML = text;
            button.disabled = disabled;
            button.onclick = handleClick;
            return button;
        };
        // Add Previous Button
        paginationContainer.appendChild(createButton(previous.text, "".concat(previous.class).concat(currentPage === 1 ? ' disabled' : ''), currentPage === 1, function () { return _this._paginateData(currentPage - 1); }));
        // Calculate range of pages
        var pageMoreEnabled = this._config.pageMore;
        if (pageMoreEnabled) {
            var maxButtons = this._config.pageMoreLimit;
            var range_1 = this._calculatePageRange(currentPage, totalPages, maxButtons);
            // Add start ellipsis
            if (range_1.start > 1) {
                paginationContainer.appendChild(createButton(more.text, more.class, false, function () {
                    return _this._paginateData(Math.max(1, range_1.start - 1));
                }));
            }
            var _loop_1 = function (i) {
                paginationContainer.appendChild(createButton(number.text.replace('{page}', i.toString()), "".concat(number.class).concat(currentPage === i ? ' active disabled' : ''), currentPage === i, function () { return _this._paginateData(i); }));
            };
            // Add page buttons
            for (var i = range_1.start; i <= range_1.end; i++) {
                _loop_1(i);
            }
            // Add end ellipsis
            if (pageMoreEnabled && range_1.end < totalPages) {
                paginationContainer.appendChild(createButton(more.text, more.class, false, function () {
                    return _this._paginateData(Math.min(totalPages, range_1.end + 1));
                }));
            }
        }
        else {
            var _loop_2 = function (i) {
                paginationContainer.appendChild(createButton(number.text.replace('{page}', i.toString()), "".concat(number.class).concat(currentPage === i ? ' active disabled' : ''), currentPage === i, function () { return _this._paginateData(i); }));
            };
            // Add page buttons
            for (var i = 1; i <= totalPages; i++) {
                _loop_2(i);
            }
        }
        // Add Next Button
        paginationContainer.appendChild(createButton(next.text, "".concat(next.class).concat(currentPage === totalPages ? ' disabled' : ''), currentPage === totalPages, function () { return _this._paginateData(currentPage + 1); }));
    };
    // New helper method to calculate page range
    KTDataTable.prototype._calculatePageRange = function (currentPage, totalPages, maxButtons) {
        var startPage, endPage;
        var halfMaxButtons = Math.floor(maxButtons / 2);
        if (totalPages <= maxButtons) {
            startPage = 1;
            endPage = totalPages;
        }
        else {
            startPage = Math.max(currentPage - halfMaxButtons, 1);
            endPage = Math.min(startPage + maxButtons - 1, totalPages);
            if (endPage - startPage < maxButtons - 1) {
                startPage = Math.max(endPage - maxButtons + 1, 1);
            }
        }
        return { start: startPage, end: endPage };
    };
    /**
     * Method for handling pagination
     * @param page - The page number to navigate to
     */
    KTDataTable.prototype._paginateData = function (page) {
        if (page < 1 || !Number.isInteger(page)) {
            return;
        }
        this._fireEvent('pagination', { page: page });
        this._dispatchEvent('pagination', { page: page });
        if (page >= 1 && page <= this.getState().totalPages) {
            this._config._state.page = page;
            this._updateData();
        }
    };
    // Method to show the loading spinner
    KTDataTable.prototype._showSpinner = function () {
        var spinner = this._element.querySelector(this._config.attributes.spinner) || this._createSpinner();
        if (spinner) {
            spinner.style.display = 'block';
        }
        this._element.classList.add('loading');
    };
    // Method to hide the loading spinner
    KTDataTable.prototype._hideSpinner = function () {
        var spinner = this._element.querySelector(this._config.attributes.spinner);
        if (spinner) {
            spinner.style.display = 'none';
        }
        this._element.classList.remove('loading');
    };
    // Method to create a spinner element if it doesn't exist
    KTDataTable.prototype._createSpinner = function () {
        if (typeof this._config.loading === 'undefined') {
            return null;
        }
        var template = document.createElement('template');
        template.innerHTML = this._config.loading.template
            .trim()
            .replace('{content}', this._config.loading.content);
        var spinner = template.content.firstChild;
        spinner.setAttribute('data-kt-datatable-spinner', 'true');
        this._tableElement.appendChild(spinner);
        return spinner;
    };
    /**
     * Saves the current state of the table to local storage.
     * @returns {void}
     */
    KTDataTable.prototype._saveState = function () {
        this._fireEvent('stateSave');
        this._dispatchEvent('stateSave');
        var ns = this._tableNamespace();
        if (ns) {
            localStorage.setItem(ns, JSON.stringify(this.getState()));
        }
    };
    /**
     * Loads the saved state of the table from local storage, if it exists.
     * @returns {Object} The saved state of the table, or null if no saved state exists.
     */
    KTDataTable.prototype._loadState = function () {
        var stateString = localStorage.getItem(this._tableNamespace());
        if (!stateString)
            return null;
        try {
            var state = JSON.parse(stateString);
            if (state)
                this._config._state = state;
            return state;
        }
        catch (_a) { } // eslint-disable-line no-empty
        return null;
    };
    KTDataTable.prototype._deleteState = function () {
        var ns = this._tableNamespace();
        if (ns) {
            localStorage.removeItem(ns);
        }
    };
    /**
     * Gets the namespace for the table's state.
     * If a namespace is specified in the config, it is used.
     * Otherwise, if the table element has an ID, it is used.
     * Otherwise, if the component element has an ID, it is used.
     * Finally, the component's UID is used.
     * @returns {string} The namespace for the table's state.
     */
    KTDataTable.prototype._tableNamespace = function () {
        var _a;
        // Use the specified namespace, if one is given
        if (this._config.stateNamespace) {
            return this._config.stateNamespace;
        }
        // Fallback to the component's UID
        return (_a = this._tableId()) !== null && _a !== void 0 ? _a : this._name;
    };
    KTDataTable.prototype._tableId = function () {
        var _a, _b;
        var id = null;
        // If the table element has an ID, use that
        if ((_a = this._tableElement) === null || _a === void 0 ? void 0 : _a.getAttribute('id')) {
            id = this._tableElement.getAttribute('id');
        }
        // If the component element has an ID, use that
        if ((_b = this._element) === null || _b === void 0 ? void 0 : _b.getAttribute('id')) {
            id = this._element.getAttribute('id');
        }
        return id;
    };
    /**
     * Sorts the data in the table by the specified field.
     * @param sortField The field to sort by.
     */
    KTDataTable.prototype._sort = function (sortField) {
        // Determine the new sort order based on the current state
        var newSortOrder = this._toggleSortOrder(sortField);
        // Update the current sort field and order
        this._config._state.sortField = sortField;
        this._config._state.sortOrder = newSortOrder;
        this._fireEvent('sort', { field: sortField, order: newSortOrder });
        this._dispatchEvent('sort', { field: sortField, order: newSortOrder });
        // Fetch data from the server with the new sort order
        this._updateData();
    };
    KTDataTable.prototype._dispose = function () {
        if (this._headerCheckElement) {
            this._headerCheckElement.removeEventListener('click', this._checkboxListener);
        }
    };
    KTDataTable.prototype._debounce = function (func, wait) {
        var timeout;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var later = function () {
                clearTimeout(timeout);
                func.apply(void 0, args);
            };
            clearTimeout(timeout);
            timeout = window.setTimeout(later, wait);
        };
    };
    /**
     * Event handlers
     */
    KTDataTable.prototype._checkboxHandler = function () {
        var _this = this;
        // Handle header checkbox change event
        this._headerCheckElement.addEventListener('click', this._checkboxListener);
        // Handle target checbox change event
        event_handler_1.default.on(document.body, this._config.attributes.checkbox, 'input', function (event) {
            _this._checkboxUpdate(event); // Update checkbox state based on checked rows
        });
    };
    /**
     * Checks if element is checked
     * @returns {boolean}
     */
    KTDataTable.prototype._isChecked = function () {
        return this._headerChecked;
    };
    /**
     * Change checkbox state
     * @param checked The new state of the checkbox
     * @returns {void}
     */
    KTDataTable.prototype._change = function (checked) {
        var payload = { cancel: false };
        this._fireEvent('change', payload);
        this._dispatchEvent('change', payload);
        if (payload.cancel === true) {
            return;
        }
        this._headerChecked = checked;
        this._headerCheckElement.checked = checked;
        if (this._targetElements) {
            this._targetElements.forEach(function (element) {
                if (element) {
                    element.checked = checked;
                }
            });
        }
        this._fireEvent('changed');
        this._dispatchEvent('changed');
    };
    /**
     * Toggle checkbox state
     * @param event The event if available
     * @returns {void}
     */
    KTDataTable.prototype._checkboxToggle = function (event) {
        var checked = !this._isChecked();
        var eventType = checked ? 'checked' : 'unchecked';
        this._fireEvent(eventType);
        this._dispatchEvent(eventType);
        this._change(checked);
    };
    /**
     * Update checkbox state based on checked rows
     * @param event The event if available
     * @returns {void}
     */
    KTDataTable.prototype._checkboxUpdate = function (event) {
        var checked = 0;
        var total = this._targetElements.length;
        for (var i = 0; i < total; i++) {
            var element = this._targetElements[i];
            if (!element) {
                continue;
            }
            var row = element.closest('tr');
            if (!row) {
                continue;
            }
            if (element.checked) {
                row.classList.add(this._config.checkbox.checkedClass);
                checked++;
            }
            else {
                row.classList.remove(this._config.checkbox.checkedClass);
            }
        }
        if (checked === 0) {
            this._headerCheckElement.indeterminate = false;
            this._change(false);
        }
        if (checked > 0 && checked < total) {
            this._headerCheckElement.indeterminate = true;
        }
        if (checked === total) {
            this._headerCheckElement.indeterminate = false;
            this._change(true);
        }
    };
    /**
     * Get checked row IDs
     * @returns {string[]} An array of checked row IDs
     */
    KTDataTable.prototype._getChecked = function () {
        var checked = [];
        this._targetElements.forEach(function (element) {
            if (element && element.checked) {
                var value = element.value;
                if (value) {
                    checked.push(value);
                }
            }
        });
        return checked;
    };
    KTDataTable.prototype.isChecked = function () {
        return this._isChecked();
    };
    KTDataTable.prototype.toggle = function () {
        this._checkboxToggle();
    };
    /**
     * Check all rows
     * @returns {void}
     */
    KTDataTable.prototype.check = function () {
        this._change(true);
        this._checkboxUpdate();
    };
    /**
     * Uncheck all rows
     * @returns {void}
     */
    KTDataTable.prototype.uncheck = function () {
        this._change(false);
    };
    /**
     * Get checked row IDs
     * @returns {string[]} An array of checked row IDs
     */
    KTDataTable.prototype.getChecked = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this._getChecked();
    };
    KTDataTable.prototype.update = function () {
        this._checkboxUpdate();
    };
    /**
     * Gets the current state of the table.
     * @returns {KTDataTableStateInterface} The current state of the table.
     */
    KTDataTable.prototype.getState = function () {
        return __assign({ 
            /**
             * The current page number.
             */
            page: 1, 
            /**
             * The field that the data is sorted by.
             */
            sortField: null, 
            /**
             * The sort order (ascending or descending).
             */
            sortOrder: '', 
            /**
             * The number of rows to display per page.
             */
            pageSize: this._config.pageSize, filters: [] }, this._config._state);
    };
    /**
     * Sorts the data in the table by the specified field.
     * @param field The field to sort by.
     */
    KTDataTable.prototype.sort = function (field) {
        // Sort the data
        this._sort(field);
    };
    /**
     * Navigates to the specified page in the data table.
     * @param page The page number to navigate to.
     */
    KTDataTable.prototype.goPage = function (page) {
        if (page < 1 || !Number.isInteger(page)) {
            return;
        }
        // Navigate to the specified page
        this._paginateData(page);
    };
    /**
     * Set the page size of the data table.
     * @param pageSize The new page size.
     */
    KTDataTable.prototype.setPageSize = function (pageSize) {
        if (!Number.isInteger(pageSize)) {
            return;
        }
        /**
         * Reload the page size of the data table.
         * @param pageSize The new page size.
         */
        this._reloadPageSize(pageSize);
    };
    /**
     * Reloads the data from the server and updates the table.
     * Triggers the 'reload' event and the 'kt.datatable.reload' custom event.
     */
    KTDataTable.prototype.reload = function () {
        this._fireEvent('reload');
        this._dispatchEvent('reload');
        // Fetch the data from the server using the current sort and filter settings
        this._updateData();
    };
    KTDataTable.prototype.redraw = function (page) {
        if (page === void 0) { page = 1; }
        this._fireEvent('redraw');
        this._dispatchEvent('redraw');
        this._paginateData(page);
    };
    /**
     * Show the loading spinner of the data table.
     */
    KTDataTable.prototype.showSpinner = function () {
        /**
         * Show the loading spinner of the data table.
         */
        this._showSpinner();
    };
    /**
     * Hide the loading spinner of the data table.
     */
    KTDataTable.prototype.hideSpinner = function () {
        /**
         * Hide the loading spinner of the data table.
         */
        this._hideSpinner();
    };
    /**
     * Filter data using the specified filter object.
     * Replaces the existing filter object for the column with the new one.
     * @param filter Filter object containing the column name and its value.
     * @returns The KTDataTable instance.
     * @throws Error if the filter object is null or undefined.
     */
    KTDataTable.prototype.setFilter = function (filter) {
        this._config._state.filters = __spreadArray(__spreadArray([], (this.getState().filters || []).filter(function (f) { return f.column !== filter.column; }), true), [
            filter,
        ], false);
        return this;
    };
    KTDataTable.prototype.dispose = function () {
        this._dispose();
    };
    KTDataTable.prototype.search = function (query) {
        this._config._state.search = query;
        this.reload();
    };
    /**
     * Create KTDataTable instances for all elements with a data-kt-datatable="true" attribute.
     *
     * This function should be called after the control(s) have been
     * loaded and parsed by the browser. It will create instances of
     * KTDataTable for all elements with a data-kt-datatable="true" attribute.
     */
    KTDataTable.createInstances = function () {
        var _this = this;
        var elements = document.querySelectorAll('[data-kt-datatable="true"]');
        elements.forEach(function (element) {
            if (element.hasAttribute('data-kt-datatable') &&
                !element.classList.contains('datatable-initialized')) {
                /**
                 * Create an instance of KTDataTable for the given element
                 * @param element The element to create an instance for
                 */
                var instance = new KTDataTable(element);
                _this._instances.set(element, instance);
            }
        });
    };
    /**
     * Get the KTDataTable instance for a given element.
     *
     * @param element The element to retrieve the instance for
     * @returns The KTDataTable instance or undefined if not found
     */
    KTDataTable.getInstance = function (element) {
        return this._instances.get(element);
    };
    /**
     * Initializes all KTDataTable instances on the page.
     *
     * This function should be called after the control(s) have been
     * loaded and parsed by the browser.
     */
    KTDataTable.init = function () {
        // Create instances of KTDataTable for all elements with a
        // data-kt-datatable="true" attribute
        KTDataTable.createInstances();
    };
    /**
     * Static variables
     */
    KTDataTable._instances = new Map();
    return KTDataTable;
}(component_1.default));
exports.KTDataTable = KTDataTable;
if (typeof window !== 'undefined') {
    window.KTDataTable = KTDataTable;
}


/***/ }),

/***/ "./src/components/datatable/index.ts":
/*!*******************************************!*\
  !*** ./src/components/datatable/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDataTable = void 0;
var datatable_1 = __webpack_require__(/*! ./datatable */ "./src/components/datatable/datatable.ts");
Object.defineProperty(exports, "KTDataTable", ({ enumerable: true, get: function () { return datatable_1.KTDataTable; } }));


/***/ }),

/***/ "./src/components/datepicker/calendar.ts":
/*!***********************************************!*\
  !*** ./src/components/datepicker/calendar.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDatepickerCalendar = void 0;
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var types_1 = __webpack_require__(/*! ./types */ "./src/components/datepicker/types.ts");
var KTDatepickerCalendar = /** @class */ (function (_super) {
    __extends(KTDatepickerCalendar, _super);
    function KTDatepickerCalendar(element, state) {
        var _this = _super.call(this) || this;
        _this._name = 'datepicker-calendar';
        _this._calendarState = new Date();
        _this._dropdownElement = null;
        _this._mainDisplayElement = null;
        _this._isOpen = false;
        _this._state = state;
        _this._init(element);
        _this._buildConfig(_this._state.getConfig());
        _this._attachCalendarEventListeners();
        _this._attachMonthYearEventListeners();
        return _this;
    }
    /**
     * ========================================================================
     * Date utils
     * ========================================================================
     */
    KTDatepickerCalendar.prototype._getDaysInMonth = function (year, month) {
        return new Date(year, month + 1, 0).getDate();
    };
    KTDatepickerCalendar.prototype._getFirstDayOfMonth = function (year, month) {
        var firstDayOfWeek = this._state.getFirstDayOfWeek();
        return (new Date(year, month, 1).getDay() - firstDayOfWeek + 7) % 7;
    };
    KTDatepickerCalendar.prototype._getYear = function (date) {
        if (date === void 0) { date = new Date(); }
        return date.getFullYear();
    };
    KTDatepickerCalendar.prototype._getMonth = function (date) {
        if (date === void 0) { date = new Date(); }
        return date.getMonth();
    };
    KTDatepickerCalendar.prototype._getMonthYear = function (year, month, offset) {
        var currentMonth = (month + offset) % 12;
        var currentYear = month + offset > 11 ? year + 1 : year;
        return { currentMonth: currentMonth, currentYear: currentYear };
    };
    KTDatepickerCalendar.prototype._getMonthName = function (month) {
        var monthNames = this._state.getMonthNames();
        return monthNames[month] || monthNames[0];
    };
    KTDatepickerCalendar.prototype._setMonth = function (month) {
        this._calendarState.setMonth(month);
    };
    KTDatepickerCalendar.prototype._setYear = function (year) {
        this._calendarState.setFullYear(year);
    };
    /**
     * ========================================================================
     * Calendar UI
     * ========================================================================
     */
    KTDatepickerCalendar.prototype._renderCalendar = function (selectedData) {
        var _a;
        this._calendarState = selectedData !== null && selectedData !== void 0 ? selectedData : this._calendarState;
        var year = this._getYear(this._calendarState);
        var month = this._getMonth(this._calendarState);
        var calendarHtml = this._generateCalendarHtml(year, month);
        if (!this._dropdownContainer) {
            this._dropdownContainer = (_a = this._state
                .getTemplates()) === null || _a === void 0 ? void 0 : _a.dropdownContainer(this._state);
            this._dropdownContainer.appendChild(calendarHtml);
        }
        if (this._calendarElement) {
            this._calendarElement.replaceWith(calendarHtml);
        }
        else {
            this._element.appendChild(this._dropdownContainer);
        }
        this._calendarElement = calendarHtml;
        this._initDropdown();
        if (this._config.enableTime) {
            this._renderTimeInputDisplay(this._state.getSelectedDateInterface());
            this._attachTimeSelectorEvent();
        }
    };
    KTDatepickerCalendar.prototype._generateCalendarHtml = function (year, month) {
        var _a, _b;
        var calendar = (_a = this._state
            .getTemplates()) === null || _a === void 0 ? void 0 : _a.calendar(this._state, this._config.visibleMonths);
        // Iterate over visible months and generate content for each
        for (var i = 0; i < this._config.visibleMonths; i++) {
            var _c = this._getMonthYear(year, month, i), currentMonth = _c.currentMonth, currentYear = _c.currentYear;
            var firstDayOfMonth = this._getFirstDayOfMonth(currentYear, currentMonth);
            var daysInMonth = this._getDaysInMonth(currentYear, currentMonth);
            var weeksHtml = this._generateWeeksHtml(currentYear, currentMonth, firstDayOfMonth, daysInMonth);
            var daysOfWeekHtml = (_b = this._state
                .getTemplates()) === null || _b === void 0 ? void 0 : _b.daysOfWeek(this._state, this._state.getWeekdays()).innerHTML;
            this._updateMonthContainer(calendar, i, currentMonth, currentYear, daysOfWeekHtml, weeksHtml);
        }
        return calendar;
    };
    KTDatepickerCalendar.prototype._updateMonthContainer = function (calendar, index, month, year, daysOfWeekHtml, weeksHtml) {
        var monthContainer = calendar.querySelectorAll("[".concat(this._config.monthContainerSelector, "]"))[index];
        var monthDisplay = monthContainer.querySelector("[".concat(this._config.monthDisplaySelector, "]"));
        var yearDisplay = monthContainer.querySelector("[".concat(this._config.yearDisplaySelector, "]"));
        var daysOfWeek = monthContainer.querySelector("[".concat(this._config.daysOfWeekSelector, "]"));
        var datepickerGrid = monthContainer.querySelector("[".concat(this._config.calendarGridSelector, "]"));
        if (monthDisplay)
            monthDisplay.textContent = this._getMonthName(month);
        if (yearDisplay)
            yearDisplay.textContent = year.toString();
        if (daysOfWeek)
            daysOfWeek.innerHTML = daysOfWeekHtml;
        if (datepickerGrid)
            datepickerGrid.innerHTML = weeksHtml.join('');
    };
    KTDatepickerCalendar.prototype._generateWeeksHtml = function (year, month, firstDayOfMonth, daysInMonth) {
        var _a;
        var weeksHtml = [];
        var weekHtml = [];
        var totalCells = this._calculateTotalCells(firstDayOfMonth, daysInMonth);
        for (var i = 0; i < totalCells; i++) {
            var dayOfMonth = i - firstDayOfMonth + 1;
            var date = this._adjustDateForEdges(year, month, dayOfMonth);
            // Check if the day is disabled, which includes edge days that should be disabled
            var isDisabled = this._isDateDisabled(date, dayOfMonth, daysInMonth);
            var dayCellHtml = this._generateDayCellHtml(date, isDisabled);
            weekHtml.push(dayCellHtml);
            if ((i + 1) % 7 === 0) {
                weeksHtml.push((_a = this._state.getTemplates()) === null || _a === void 0 ? void 0 : _a.week(this._state, weekHtml).outerHTML);
                weekHtml = [];
            }
        }
        return weeksHtml;
    };
    KTDatepickerCalendar.prototype._calculateTotalCells = function (firstDayOfMonth, daysInMonth) {
        var totalDays = daysInMonth + firstDayOfMonth;
        return Math.ceil(totalDays / 7) * 7;
    };
    KTDatepickerCalendar.prototype._adjustDateForEdges = function (year, month, dayOfMonth) {
        if (dayOfMonth <= 0) {
            var prevMonth = month === 0 ? 11 : month - 1;
            var prevYear = month === 0 ? year - 1 : year;
            var daysInPrevMonth = this._getDaysInMonth(prevYear, prevMonth);
            return new Date(prevYear, prevMonth, daysInPrevMonth + dayOfMonth);
        }
        else if (dayOfMonth > this._getDaysInMonth(year, month)) {
            var nextMonth = month === 11 ? 0 : month + 1;
            var nextYear = month === 11 ? year + 1 : year;
            return new Date(nextYear, nextMonth, dayOfMonth - this._getDaysInMonth(year, month));
        }
        return new Date(year, month, dayOfMonth);
    };
    KTDatepickerCalendar.prototype._isDateDisabled = function (date, dayOfMonth, daysInMonth) {
        // Determine if the date is from a previous or next month (edge days)
        var isEdgeDay = dayOfMonth <= 0 || dayOfMonth > daysInMonth;
        // Use _isOutsideVisibleRange and _isMinMaxConfigRange to determine if the date should be disabled
        var isDisabled = isEdgeDay ||
            this._isOutsideVisibleRange(date) ||
            this._state.isMinMaxConfigRange(date);
        return isDisabled;
    };
    KTDatepickerCalendar.prototype._generateDayCellHtml = function (date, isDisabled) {
        var _a, _b, _c, _d, _e, _f;
        var isSelected = !this._config.range &&
            ((_a = this._state.getSelectedDate()) === null || _a === void 0 ? void 0 : _a.toDateString()) === date.toDateString();
        var isToday = date.toDateString() === new Date().toDateString();
        var isInRange = this._isSelectedCalendarDateInRange(date);
        var isStartDate = ((_c = (_b = this._state.getSelectedDateRange()) === null || _b === void 0 ? void 0 : _b.startDate) === null || _c === void 0 ? void 0 : _c.toDateString()) ===
            date.toDateString();
        var isEndDate = ((_e = (_d = this._state.getSelectedDateRange()) === null || _d === void 0 ? void 0 : _d.endDate) === null || _e === void 0 ? void 0 : _e.toDateString()) ===
            date.toDateString();
        var dayCell = (_f = this._state
            .getTemplates()) === null || _f === void 0 ? void 0 : _f.dayCell(this._state, date, isSelected, isToday, isDisabled, isInRange, isStartDate, isEndDate);
        if (isToday && !isDisabled) {
            dayCell.focus();
        }
        return dayCell.outerHTML;
    };
    KTDatepickerCalendar.prototype._isOutsideVisibleRange = function (date) {
        var dateYear = date.getFullYear();
        var dateMonth = date.getMonth();
        var firstVisibleMonth = this._calendarState.getMonth();
        var lastVisibleMonth = (firstVisibleMonth + this._config.visibleMonths - 1) % 12;
        var lastVisibleYear = this._calendarState.getFullYear();
        if (lastVisibleMonth < firstVisibleMonth) {
            lastVisibleYear++;
        }
        return (dateYear < this._calendarState.getFullYear() || // Previous year
            dateYear > lastVisibleYear || // Next year
            (dateYear === this._calendarState.getFullYear() &&
                dateMonth < firstVisibleMonth) || // Current year, before first visible month
            (dateYear === lastVisibleYear && dateMonth > lastVisibleMonth) || // Last visible year, after last visible month
            (dateYear === lastVisibleYear &&
                dateMonth === lastVisibleMonth &&
                date.getDate() > this._getDaysInMonth(dateYear, dateMonth)) // Last visible month, days exceeding the month's length
        );
    };
    KTDatepickerCalendar.prototype._isSelectedCalendarDateInRange = function (date) {
        var _a = this._state.getSelectedDateRange() || {}, startDate = _a.startDate, endDate = _a.endDate;
        if (startDate && endDate) {
            // Create new Date objects with time components set to 0 for accurate comparison
            var start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            var end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
            var current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            return current >= start && current <= end;
        }
        return false;
    };
    KTDatepickerCalendar.prototype._attachCalendarEventListeners = function () {
        var _this = this;
        document.addEventListener('keydown', function (event) {
            if ((event.key === 'Escape' || event.key === 'Enter') &&
                _this._isMonthYearSelectorVisible()) {
                _this._handleToggleMonthYearSelector();
            }
        });
        document.addEventListener('click', function (event) {
            var target = event.target;
            if (_this._isMonthYearSelectorVisible() &&
                !target.closest("[".concat(_this._config.monthYearDisplaySelector, "]")) &&
                !target.closest("[".concat(_this._config.monthYearSelector, "]"))) {
                _this._handleToggleMonthYearSelector();
            }
        });
        this._element.addEventListener('click', function (event) {
            var target = event.target;
            // Previous month button
            if (target.closest("[".concat(_this._config.prevBtnSelector, "]"))) {
                _this._goToCalendarPreviousMonth();
            }
            // Next month button
            else if (target.closest("[".concat(_this._config.nextBtnSelector, "]"))) {
                _this._goToCalendarNextMonth();
            }
            // Month/year display
            else if (target.closest("[".concat(_this._config.monthYearDisplaySelector, "]"))) {
                _this._renderMonthYearSelector();
            }
            // Day cells
            else if (target.closest("[".concat(_this._config.dateCellSelector, "]:not([data-disabled=\"true\"])"))) {
                _this._handleCalendarDayClick(target);
            }
        });
        this._element.addEventListener(this._config.keyboardNavigateEvent, this._handleOnDateChange.bind(this));
        this._element.addEventListener('mouseover', function (event) {
            var _a;
            var target = event.target;
            var dateCell = target.closest("[".concat(_this._config.dateCellSelector, "]:not([data-disabled=\"true\"])"));
            if (dateCell && ((_a = _this._state.getSelectedDateRange()) === null || _a === void 0 ? void 0 : _a.startDate)) {
                var day = parseInt(dateCell.dataset.day, 10);
                var month = parseInt(dateCell.dataset.month, 10);
                var year = parseInt(dateCell.dataset.year, 10);
                var hoveredDate = new Date(year, month, day);
                _this._updateCalendarHover(hoveredDate);
            }
        });
    };
    KTDatepickerCalendar.prototype._handleOnDateChange = function (event) {
        var _a = event.detail
            .payload, selectedDate = _a.selectedDate, selectedDateRange = _a.selectedDateRange;
        if (selectedDate) {
            this._state.setSelectedDate(selectedDate);
        }
        else if (selectedDateRange && this._config.range) {
            this._state.setSelectedDateRange(selectedDateRange.startDate, selectedDateRange.endDate);
        }
        this._renderCalendar(selectedDate);
    };
    KTDatepickerCalendar.prototype._goToCalendarPreviousMonth = function () {
        var month = this._calendarState.getMonth() - 1;
        this._calendarState.setMonth(month);
        this._renderCalendar();
        this._dispatchEvent(this._config.calendarPreviousMonthEvent, this._state.getSelectedDateInterface());
        this._fireEvent(this._config.calendarPreviousMonthEvent, this._state.getSelectedDateInterface());
    };
    KTDatepickerCalendar.prototype._goToCalendarNextMonth = function () {
        var month = this._calendarState.getMonth() + 1;
        this._calendarState.setMonth(month);
        this._renderCalendar();
        this._dispatchEvent(this._config.calendarNextMonthEvent, this._state.getSelectedDateInterface());
        this._fireEvent(this._config.calendarNextMonthEvent, this._state.getSelectedDateInterface());
    };
    KTDatepickerCalendar.prototype._handleCalendarDayClick = function (cell) {
        var day = parseInt(cell.dataset.day, 10);
        var month = parseInt(cell.dataset.month, 10);
        var year = parseInt(cell.dataset.year, 10);
        var newSelectedDate = new Date(year, month, day, this._calendarState.getHours(), this._calendarState.getMinutes(), this._calendarState.getSeconds());
        if (this._config.range) {
            var selectedDateRange = this._state.getSelectedDateRange();
            if (!selectedDateRange.startDate) {
                this._state.setSelectedDateRange(newSelectedDate);
            }
            else if (!selectedDateRange.endDate) {
                var startDate = selectedDateRange.startDate;
                this._state.setSelectedDateRange(newSelectedDate < startDate ? newSelectedDate : startDate, newSelectedDate > startDate ? newSelectedDate : startDate);
            }
            else {
                // If both start and end dates are already selected, reset the range with the new date as the start date
                this._state.setSelectedDateRange(newSelectedDate);
            }
        }
        else {
            this._state.setSelectedDate(newSelectedDate);
        }
        this._renderCalendar();
        this._dispatchEvent(this._config.dateChangeEvent, this._state.getSelectedDateInterface());
        this._fireEvent(this._config.dateChangeEvent, this._state.getSelectedDateInterface());
        this._dispatchEvent(this._config.calendarRenderedEvent, this._state.getSelectedDateInterface());
        this._fireEvent(this._config.calendarRenderedEvent, this._state.getSelectedDateInterface());
    };
    KTDatepickerCalendar.prototype._updateCalendarHover = function (hoveredDate) {
        var _this = this;
        var _a = this._state.getSelectedDateRange(), selectedStartDate = _a.startDate, selectedEndDate = _a.endDate;
        // Find the date cell element based on hoveredDate
        var hoveredCell = this._element.querySelector("[".concat(this._config.dateCellSelector, "][data-year=\"").concat(hoveredDate.getFullYear(), "\"][data-month=\"").concat(hoveredDate.getMonth(), "\"][data-day=\"").concat(hoveredDate.getDate(), "\"]"));
        if (!hoveredCell || !selectedStartDate || selectedEndDate) {
            return;
        }
        // Clear previous hover classes
        var allCells = this._element.querySelectorAll("[".concat(this._config.dateCellSelector, "]"));
        allCells.forEach(function (cell) {
            return cell.classList.remove(_this._config.hoveredInRangeClass);
        });
        // Set time components to zero for both dates to compare only the dates (once)
        hoveredDate.setHours(0, 0, 0, 0);
        selectedStartDate.setHours(0, 0, 0, 0);
        var startDateTimestamp = selectedStartDate.getTime();
        var hoveredDateTimestamp = hoveredDate.getTime();
        // Calculate lowerBound and upperBound only once
        var lowerBound = Math.min(startDateTimestamp, hoveredDateTimestamp);
        var upperBound = Math.max(startDateTimestamp, hoveredDateTimestamp);
        allCells.forEach(function (cell) {
            if (cell instanceof HTMLElement) {
                var cellDate = new Date(parseInt(cell.dataset.year), parseInt(cell.dataset.month), parseInt(cell.dataset.day));
                cellDate.setHours(0, 0, 0, 0); // Set time to midnight
                var cellTimestamp = cellDate.getTime();
                if (cellTimestamp >= lowerBound && cellTimestamp <= upperBound) {
                    cell.classList.add(_this._config.hoveredInRangeClass);
                }
            }
        });
    };
    /**
     * ========================================================================
     * Month/Year UI
     * ========================================================================
     */
    KTDatepickerCalendar.prototype._renderMonthYearSelector = function () {
        var _a;
        var monthYearElement = (_a = this._state
            .getTemplates()) === null || _a === void 0 ? void 0 : _a.monthYearSelector(this._state);
        this._clearAndAppend(monthYearElement); // Clear existing content and append the new selector
        this._populateMonthYearOptions(monthYearElement); // Populate month and year options
    };
    KTDatepickerCalendar.prototype._clearAndAppend = function (newContent) {
        this._clearMonthYearSelector();
        if (newContent) {
            this._element.appendChild(newContent);
        }
    };
    KTDatepickerCalendar.prototype._populateMonthOptions = function (monthYearElement, selectedMonthIndex) {
        var _a;
        var monthNames = this._state.getMonthNames();
        var monthOptionsHtml = (_a = this._state
            .getTemplates()) === null || _a === void 0 ? void 0 : _a.monthOptions(this._state, monthNames, selectedMonthIndex);
        var monthOptionsContainer = monthYearElement.querySelector("[".concat(this._config.monthOptionsSelector, "]"));
        monthOptionsContainer === null || monthOptionsContainer === void 0 ? void 0 : monthOptionsContainer.insertAdjacentHTML('beforeend', monthOptionsHtml);
    };
    KTDatepickerCalendar.prototype._populateYearOptions = function (monthYearElement, selectedYear, yearLength) {
        var _a;
        var yearOptionsHtml = (_a = this._state
            .getTemplates()) === null || _a === void 0 ? void 0 : _a.yearOptions(this._state, selectedYear, yearLength);
        var yearOptionsContainer = monthYearElement.querySelector("[".concat(this._config.yearOptionSelector, "]"));
        yearOptionsContainer === null || yearOptionsContainer === void 0 ? void 0 : yearOptionsContainer.insertAdjacentHTML('beforeend', yearOptionsHtml);
    };
    KTDatepickerCalendar.prototype._populateMonthYearOptions = function (monthYearElement) {
        var selectedYear = this._getYear(this._calendarState);
        var selectedMonthIndex = this._getMonth(this._calendarState);
        var yearLength = this._config.visibleYears;
        this._populateMonthOptions(monthYearElement, selectedMonthIndex);
        this._populateYearOptions(monthYearElement, selectedYear, yearLength);
        this._updateMonthYearDisplayTitles(monthYearElement, selectedMonthIndex, selectedYear);
    };
    KTDatepickerCalendar.prototype._isMonthYearSelectorVisible = function () {
        var monthYearElement = this._element.querySelector("[".concat(this._config.monthYearSelector, "]"));
        return (monthYearElement &&
            window.getComputedStyle(monthYearElement).display !== 'none');
    };
    KTDatepickerCalendar.prototype._attachMonthYearEventListeners = function () {
        var _this = this;
        // Attach the listener once to the main element (or a suitable parent)
        this._element.addEventListener('click', function (event) {
            var target = event.target;
            // Check if the click is within the month/year selector
            var monthYearSelector = target.closest("[".concat(_this._config.monthYearSelector, "]"));
            if (!monthYearSelector) {
                return; // Ignore clicks outside the selector
            }
            // Year buttons
            if (target.closest("[".concat(_this._config.yearOptionSelector, "]"))) {
                _this._handleYearClick(event);
            }
            // Month buttons
            else if (target.closest("[".concat(_this._config.monthOptionSelector, "]"))) {
                _this._handleMonthClick(event);
            }
            // Month/year display (to close the selector)
            else if (target.closest("[".concat(_this._config.monthYearDisplaySelector, "]"))) {
                _this._handleToggleMonthYearSelector();
            }
        });
    };
    KTDatepickerCalendar.prototype._updateMonthYearDisplayTitles = function (monthYearElement, selectedMonthIndex, selectedYear) {
        var monthDisplay = monthYearElement.querySelector("[".concat(this._config.monthDisplaySelector, "]"));
        var yearDisplay = monthYearElement.querySelector("[".concat(this._config.yearDisplaySelector, "]"));
        monthDisplay.textContent = this._getMonthName(selectedMonthIndex);
        yearDisplay.textContent = selectedYear.toString();
    };
    KTDatepickerCalendar.prototype._clearMonthYearSelector = function () {
        var _a;
        (_a = this._element
            .querySelector("[".concat(this._config.monthYearSelector, "]"))) === null || _a === void 0 ? void 0 : _a.remove();
    };
    KTDatepickerCalendar.prototype._handleMonthClick = function (event) {
        var button = event.target;
        var selectedMonth = parseInt(button.getAttribute('data-month'), 10);
        this._setMonth(selectedMonth);
        var monthYearElement = this._element.querySelector("[".concat(this._config.monthYearSelector, "]"));
        // Update the titles with the monthSelector, selectedMonth and current year
        this._updateMonthYearDisplayTitles(monthYearElement, selectedMonth, this._getYear(this._calendarState));
    };
    KTDatepickerCalendar.prototype._handleYearClick = function (event) {
        var button = event.target;
        var selectedYear = parseInt(button.getAttribute('data-year'), 10);
        this._setYear(selectedYear);
        var monthYearElement = this._element.querySelector("[".concat(this._config.monthYearSelector, "]"));
        // Update the titles with the monthSelector, current month and selectedYear
        this._updateMonthYearDisplayTitles(monthYearElement, this._getMonth(this._calendarState), selectedYear);
    };
    KTDatepickerCalendar.prototype._handleToggleMonthYearSelector = function () {
        this._clearMonthYearSelector();
        this._renderCalendar();
    };
    /**
     * ========================================================================
     * Date Time input
     * ========================================================================
     */
    KTDatepickerCalendar.prototype._renderTimeInputDisplay = function (selectedDate) {
        var _a, _b;
        var newElement = null;
        if (this._config.range && selectedDate.selectedDateRange) {
            var _c = selectedDate.selectedDateRange, startDate = _c.startDate, endDate = _c.endDate;
            var startDateTimeDisplay = this._state.getDateDisplayInterface(startDate);
            var endDateTimeDisplay = this._state.getDateDisplayInterface(endDate);
            newElement = (_a = this._state
                .getTemplates()) === null || _a === void 0 ? void 0 : _a.timeSelectorRangeDisplay(this._state, startDateTimeDisplay, endDateTimeDisplay, this._config.hourStep, this._config.minuteStep, this._config.secondStep, this._state.getDisabledHours(), this._state.getDisabledMinutes(), this._state.is12Hours(), selectedDate);
        }
        else {
            var dateTimeDisplay = this._state.getDateDisplayInterface(selectedDate.selectedDate);
            newElement = (_b = this._state
                .getTemplates()) === null || _b === void 0 ? void 0 : _b.timeSelectorDisplay(this._state, dateTimeDisplay, this._config.hourStep, this._config.minuteStep, this._config.secondStep, this._state.getDisabledHours(), this._state.getDisabledMinutes(), this._state.is12Hours(), selectedDate.selectedDate);
        }
        this._calendarElement.appendChild(newElement);
        this._timeInputDisplayElement = newElement;
    };
    KTDatepickerCalendar.prototype._attachTimeSelectorEvent = function () {
        var _this = this;
        if (this._timeInputDisplayElement) {
            this._timeInputDisplayElement.addEventListener('change', function (event) {
                var changedElement = event.target;
                // Check if the change event is from a time selector
                var timeSegment = changedElement.dataset.datepickerSegment;
                if (timeSegment) {
                    var newValue = parseInt(changedElement.value, 10);
                    if (_this._config.range) {
                        var isStartTimeSelector = changedElement.closest("[data-kt-datepicker-time-type=\"start\"]") !== null;
                        var targetDate = _this._getTargetDateForRange(isStartTimeSelector);
                        if (targetDate) {
                            _this._updateTimeComponent(targetDate, timeSegment, newValue);
                            _this._state.setSelectedDate(targetDate);
                        }
                    }
                    else {
                        _this._updateTimeComponent(_this._state.getSelectedDate(), timeSegment, newValue);
                        _this._state.setSelectedDate(_this._state.getSelectedDate());
                    }
                    _this._dispatchEvent(_this._config.dateChangeEvent, _this._state.getSelectedDateInterface());
                    _this._fireEvent(_this._config.dateChangeEvent, _this._state.getSelectedDateInterface());
                }
            });
        }
    };
    KTDatepickerCalendar.prototype._updateTimeComponent = function (dateToUpdate, timeSegment, newValue) {
        if (!dateToUpdate) {
            return;
        }
        switch (timeSegment) {
            case types_1.DatePickerSegment.Hours:
            case types_1.DatePickerSegment.EndHours:
                // Handle 12-hour format conversion if needed
                if (!this._state.is12Hours()) {
                    var currentHour_1 = dateToUpdate.getHours();
                    var isPM = currentHour_1 >= 12;
                    newValue = newValue === 12 ? 0 : newValue; // 12 AM is 0 in 24-hour format
                    newValue = isPM ? newValue + 12 : newValue; // Add 12 for PM hours
                }
                dateToUpdate.setHours(newValue);
                break;
            case types_1.DatePickerSegment.Minutes:
            case types_1.DatePickerSegment.EndMinutes:
                dateToUpdate.setMinutes(newValue);
                break;
            case types_1.DatePickerSegment.Seconds:
            case types_1.DatePickerSegment.EndSeconds:
                dateToUpdate.setSeconds(newValue);
                break;
            case types_1.DatePickerSegment.AmPm:
            case types_1.DatePickerSegment.EndAmPm:
                var currentHour = dateToUpdate.getHours();
                var newHour = newValue === 12 ? (currentHour % 12) + 12 : currentHour % 12;
                dateToUpdate.setHours(newHour);
                break;
        }
    };
    KTDatepickerCalendar.prototype._getTargetDateForRange = function (isStartTimeSelector) {
        var _a, _b;
        return isStartTimeSelector
            ? (_a = this._state.getSelectedDateRange()) === null || _a === void 0 ? void 0 : _a.startDate
            : (_b = this._state.getSelectedDateRange()) === null || _b === void 0 ? void 0 : _b.endDate;
    };
    /**
     * ========================================================================
     * Dropdown UI
     * ========================================================================
     */
    KTDatepickerCalendar.prototype._initDropdown = function () {
        this._dropdownElement = this._element.querySelector("[".concat(this._config.dropdownSelector, "]"));
        this._mainDisplayElement = this._element.querySelector("[".concat(this._config.mainDisplaySelector, "]"));
        if (this._dropdownElement) {
            // Remove existing click event
            this._mainDisplayElement.removeEventListener('click', this._toggleDropdown.bind(this));
            // Reattach the click event
            this._mainDisplayElement.addEventListener('click', this._toggleDropdown.bind(this));
        }
    };
    KTDatepickerCalendar.prototype._toggleDropdown = function () {
        console.log('toggleDropdown');
        this._isOpen ? this._closeDropdown() : this._openDropdown();
    };
    KTDatepickerCalendar.prototype._openDropdown = function () {
        if (this._isOpen)
            return;
        this._dropdownElement.classList.remove('hidden');
        this._isOpen = true;
        this._setAriaAttributes(); // Update ARIA attributes when opened
        this._dispatchEvent('show.datepicker');
        this._fireEvent('show.datepicker');
    };
    KTDatepickerCalendar.prototype._closeDropdown = function () {
        if (!this._isOpen)
            return;
        this._dropdownElement.classList.add('hidden');
        this._isOpen = false;
        this._setAriaAttributes(); // Update ARIA attributes when closed
        this._dispatchEvent('close.datepicker');
        this._fireEvent('close.datepicker');
    };
    KTDatepickerCalendar.prototype._setAriaAttributes = function () {
        this._dropdownElement.setAttribute('aria-expanded', this._isOpen.toString());
    };
    /**
     * ========================================================================
     * Public API
     * ========================================================================
     */
    KTDatepickerCalendar.prototype.renderCalendar = function () {
        this._renderCalendar();
    };
    return KTDatepickerCalendar;
}(component_1.default));
exports.KTDatepickerCalendar = KTDatepickerCalendar;


/***/ }),

/***/ "./src/components/datepicker/config.ts":
/*!*********************************************!*\
  !*** ./src/components/datepicker/config.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addLocale = exports.KTDatepickerStateManager = exports.DefaultConfig = void 0;
var locales_1 = __webpack_require__(/*! ./locales */ "./src/components/datepicker/locales.ts");
var templates_1 = __webpack_require__(/*! ./templates */ "./src/components/datepicker/templates.ts");
exports.DefaultConfig = {
    locale: 'en-US',
    locales: locales_1.DefaultLocales, // all locales
    weekDays: 'min',
    forceLeadingZero: true,
    // 0-indexed month
    // minDate: new Date(2024, 7, 20),
    // maxDate: new Date(2024, 8, 10),
    // supported formats: refer to dateFormat
    // minDate: '20/08/2024',
    // maxDate: '10/09/2024',
    // Calendar
    visibleMonths: 1, // visible months calendar to show
    visibleYears: 10, // visible years span to show on year selection
    // Date
    dateFormat: 'dd/MM/yyyy',
    // Time
    enableTime: false,
    timeFormat: 'hh:mm:ss A ZZZ', // 12-hours time format
    // timeFormat: 'HH:mm:ss ZZZ', // 24-hours time format
    am: 'AM',
    pm: 'PM',
    hourStep: 1,
    // minuteStep: 5,
    // secondStep: 10,
    // disabledHours: [0, 1, 2, 3, 4, 5, 6, 22, 23],
    // disabledMinutes: [0, 1, 2, 3],
    // Date range
    range: false,
    rangeSeparator: ' - ',
    // Element selectors
    inputSelector: 'data-kt-datepicker-input',
    startInputSelector: 'data-kt-datepicker-start',
    endInputSelector: 'data-kt-datepicker-end',
    segmentSelector: 'data-kt-datepicker-segment',
    monthContainerSelector: 'data-kt-datepicker-month-container',
    monthDisplaySelector: 'data-kt-datepicker-month-display',
    yearDisplaySelector: 'data-kt-datepicker-year-display',
    daysOfWeekSelector: 'data-kt-datepicker-days-of-week',
    calendarGridSelector: 'data-kt-datepicker-grid',
    prevBtnSelector: 'data-kt-datepicker-prev-btn',
    nextBtnSelector: 'data-kt-datepicker-next-btn',
    monthYearDisplaySelector: 'data-kt-datepicker-month-year-display',
    dateCellSelector: 'data-kt-datepicker-cell',
    monthYearSelector: 'data-kt-datepicker-month-year-selector',
    monthOptionSelector: 'data-kt-datepicker-month-option',
    yearOptionSelector: 'data-kt-datepicker-year-option',
    timeInputSelector: 'data-kt-datepicker-time-input',
    monthOptionsSelector: 'data-kt-datepicker-month-options',
    yearOptionsSelector: 'data-kt-datepicker-year-options',
    dropdownSelector: 'data-kt-datepicker-dropdown',
    mainDisplaySelector: 'data-kt-datepicker-display',
    // Events
    initEvent: 'init',
    dateChangeEvent: 'date-change',
    keyboardNavigateEvent: 'keyboard-navigate',
    calendarRenderedEvent: 'rendered',
    calendarPreviousMonthEvent: 'previous-month',
    calendarNextMonthEvent: 'next-month',
    // Classes
    selectedClass: 'selected',
    hoveredInRangeClass: 'hovered-in-range',
    containerClass: 'flex',
    monthContainerClass: 'hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer font-semibold text-sm',
    daysOfWeekClass: 'dow text-center text-sm font-medium text-gray-500 dark:text-gray-400',
    dayCellClass: 'hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-center font-semibold text-sm',
    dayCellSelectedClass: 'selected',
    dayCellCurrentClass: 'current',
    dayCellDisabledClass: 'disabled cursor-not-allowed opacity-50',
    dayCellInRangeClass: 'selected',
    dayCellStartClass: 'start',
    dayCellEndClass: 'end',
    monthYearSelectorContainerClass: 'bg-white shadow-lg rounded-md p-4',
    monthYearDisplayClass: 'flex items-center cursor-pointer',
    monthYearDisplayTextClass: 'text-lg font-bold mx-2',
    monthYearOptionsContainerClass: 'flex',
    monthOptionClass: 'py-2 px-4 text-sm hover:bg-gray-200 focus:outline-none',
    monthOptionSelectedClass: 'selected',
    monthOptionCurrentClass: 'current',
    yearOptionClass: 'py-2 px-4 text-sm hover:bg-gray-200 focus:outline-none',
    yearOptionSelectedClass: 'selected',
    yearOptionCurrentClass: 'current',
    datetimeDisplayClass: 'flex items-center space-x-2',
    datetimeSegmentClass: 'cursor-pointer',
    timeListContainerClass: 'bg-white shadow-md rounded p-3',
    timeSelectorFlexContainerClass: 'flex flex-wrap justify-center',
    timePartContainerClass: 'w-1/2 sm:w-1/4 p-1',
    timePartLabelClass: 'block text-center text-sm font-medium text-gray-700 mb-1',
    timeSelectClass: 'w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
};
var KTDatepickerStateManager = /** @class */ (function () {
    function KTDatepickerStateManager(config) {
        this._selectedDate = null;
        this._selectedDateRange = { startDate: null, endDate: null };
        this._config = this._initDefaultConfig(config);
        this._setLocale(this._config.locale || 'en-US');
    }
    KTDatepickerStateManager.prototype._setLocale = function (locale) {
        this._config.locale = locale;
        this._localeConfig = this._getLocalesConfig(locale);
    };
    KTDatepickerStateManager.prototype._getLocalesConfig = function (locale) {
        var config = this._config.locales;
        if (config[locale]) {
            return config[locale];
        }
        console.warn("Locale '".concat(locale, "' not found. Falling back to 'en-US'."));
        return config['en-US'];
    };
    KTDatepickerStateManager.prototype._initDefaultConfig = function (config) {
        return __assign(__assign(__assign({}, exports.DefaultConfig), config), { templates: __assign(__assign(__assign({}, templates_1.DefaultTemplates), exports.DefaultConfig.templates), ((config === null || config === void 0 ? void 0 : config.templates) || {})) });
    };
    KTDatepickerStateManager.prototype.padZero = function (num, maxLength, paddingChar) {
        if (maxLength === void 0) { maxLength = 2; }
        if (paddingChar === void 0) { paddingChar = '0'; }
        if (!this._config.forceLeadingZero) {
            return String(num);
        }
        return String(num).padStart(maxLength, paddingChar);
    };
    KTDatepickerStateManager.prototype.getConfig = function () {
        return this._config;
    };
    KTDatepickerStateManager.prototype.getTemplates = function () {
        return this._config.templates;
    };
    KTDatepickerStateManager.prototype.getDateFormat = function () {
        return this._config.dateFormat || 'dd/MM/yyyy';
    };
    KTDatepickerStateManager.prototype.getTimeFormat = function () {
        return this._config.timeFormat || 'hh:mm:ss A ZZZ';
    };
    KTDatepickerStateManager.prototype.getFirstDayOfWeek = function () {
        return this._localeConfig.firstDayOfWeek || 0;
    };
    KTDatepickerStateManager.prototype.getWeekdaysShort = function () {
        return this._localeConfig.dayNamesShort || this._localeConfig.dayNames.map(function (day) { return day.slice(0, 3); });
    };
    KTDatepickerStateManager.prototype.getMonthNames = function () {
        return this._localeConfig.monthNames || this._localeConfig.monthNamesShort;
    };
    KTDatepickerStateManager.prototype.getWeekdaysMin = function () {
        return this._localeConfig.dayNamesMin || this._localeConfig.dayNames.map(function (day) { return day.slice(0, 1); });
    };
    KTDatepickerStateManager.prototype.getWeekdays = function () {
        return this._config.weekDays === 'min' ? this.getWeekdaysMin() : this.getWeekdaysShort();
    };
    KTDatepickerStateManager.prototype.getDisabledHours = function () {
        return this._config.disabledHours || [];
    };
    KTDatepickerStateManager.prototype.getDisabledMinutes = function () {
        return this._config.disabledMinutes || [];
    };
    KTDatepickerStateManager.prototype.strToDate = function (dateString, format) {
        var formatParts = format.split(/[^A-Za-z]/);
        var dateParts = dateString.split(/[^0-9\s]/).map(function (part) { return part.trim(); });
        if (formatParts.length !== dateParts.length) {
            return null; // Mismatch between format and date string
        }
        var dateMap = {
            year: 0,
            month: 0,
            day: 1,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
        formatParts.forEach(function (formatPart, index) {
            var partValue = parseInt(dateParts[index], 10);
            switch (formatPart) {
                case 'YYYY':
                case 'yyyy':
                    dateMap.year = partValue;
                    break;
                case 'MM':
                    dateMap.month = partValue - 1; // Months are 0-based in JavaScript Date
                    break;
                case 'DD':
                case 'dd':
                    dateMap.day = partValue;
                    break;
                case 'HH':
                case 'hh':
                    dateMap.hours = partValue;
                    break;
                case 'mm':
                    dateMap.minutes = partValue;
                    break;
                case 'ss':
                    dateMap.seconds = partValue;
                    break;
                default:
                    break;
            }
        });
        return new Date(dateMap.year, dateMap.month, dateMap.day, dateMap.hours, dateMap.minutes, dateMap.seconds);
    };
    KTDatepickerStateManager.prototype.getAmPm = function (hours) {
        return hours < 12 ? this._config.am : this._config.pm;
    };
    KTDatepickerStateManager.prototype.formatTimezone = function (date) {
        var timezoneOffset = date.getTimezoneOffset();
        if (timezoneOffset === 0) {
            return 'UTC';
        }
        else {
            var offsetHours = this.padZero(Math.abs(timezoneOffset / 60));
            var timezoneSign = timezoneOffset >= 0 ? '-' : '+';
            return "GMT".concat(timezoneSign).concat(offsetHours);
        }
    };
    KTDatepickerStateManager.prototype.formatTime = function (date, format) {
        if (format === void 0) { format = null; }
        if (!date) {
            return '';
        }
        var timeFormat = format || this.getTimeFormat();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var amPm = this.getAmPm(hours);
        var hour = hours % 12 || 12;
        var formattedTime = timeFormat
            .replace('hh', this.padZero(hour))
            .replace('HH', this.padZero(hours))
            .replace('mm', this.padZero(minutes))
            .replace('ss', this.padZero(seconds))
            .replace('a', amPm.toLocaleLowerCase(this._config.locale))
            .replace('A', amPm.toLocaleUpperCase(this._config.locale))
            .replace('zzz', this.formatTimezone(date).toLocaleLowerCase(this._config.locale))
            .replace('ZZZ', this.formatTimezone(date).toLocaleUpperCase(this._config.locale));
        return formattedTime;
    };
    KTDatepickerStateManager.prototype.isMinMaxConfigRange = function (date) {
        var _a = this._config, minDate = _a.minDate, maxDate = _a.maxDate;
        if (minDate && date < (minDate instanceof Date ? minDate : this.parseDateString(minDate, this.getDateFormat()))) {
            return true;
        }
        if (maxDate && date > (maxDate instanceof Date ? maxDate : this.parseDateString(maxDate, this.getDateFormat()))) {
            return true;
        }
        return false;
    };
    KTDatepickerStateManager.prototype.parseDateString = function (dateString, dateFormat) {
        var dayIndex = dateFormat.indexOf('dd');
        var monthIndex = dateFormat.indexOf('MM');
        var yearIndex = dateFormat.indexOf('yyyy');
        var day = parseInt(dateString.slice(dayIndex, dayIndex + 2), 10);
        var month = parseInt(dateString.slice(monthIndex, monthIndex + 2), 10) - 1; // Months are 0-based
        var year = parseInt(dateString.slice(yearIndex, yearIndex + 4), 10);
        // Validate parsed date
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            return new Date(year, month, day);
        }
        return null; // Return null if the date could not be parsed
    };
    KTDatepickerStateManager.prototype.is12Hours = function () {
        return this._config.timeFormat.includes('hh');
    };
    KTDatepickerStateManager.prototype.getDateDisplayInterface = function (datetime) {
        var _a, _b, _c, _d, _e, _f;
        var dateFormat = this.getDateFormat();
        var timeFormat = this.getTimeFormat();
        // Extract placeholders from dateFormat and timeFormat
        var dayPlaceholder = ((_a = dateFormat.match(/d+/)) === null || _a === void 0 ? void 0 : _a[0]) || 'dd';
        var monthPlaceholder = ((_b = dateFormat.match(/M+/)) === null || _b === void 0 ? void 0 : _b[0]) || 'mm';
        var yearPlaceholder = ((_c = dateFormat.match(/y+/)) === null || _c === void 0 ? void 0 : _c[0]) || 'yyyy';
        var hoursPlaceholder = timeFormat ? (((_d = timeFormat.match(/[Hh]+/)) === null || _d === void 0 ? void 0 : _d[0]) || 'hh') : 'hh';
        var minutesPlaceholder = timeFormat ? (((_e = timeFormat.match(/m+/)) === null || _e === void 0 ? void 0 : _e[0]) || 'mm') : 'mm';
        var secondsPlaceholder = timeFormat ? (((_f = timeFormat.match(/s+/)) === null || _f === void 0 ? void 0 : _f[0]) || 'ss') : 'ss';
        if (datetime === null) {
            return {
                day: dayPlaceholder,
                month: monthPlaceholder,
                year: yearPlaceholder,
                hours: hoursPlaceholder,
                minutes: minutesPlaceholder,
                seconds: secondsPlaceholder,
                amPm: '--',
                gmtOffset: '--'
            };
        }
        var hours = this.is12Hours() ? (datetime.getHours() % 12 || 12) : datetime.getHours();
        return {
            day: this.padZero(datetime.getDate()),
            month: this.padZero(datetime.getMonth() + 1),
            year: datetime.getFullYear().toString(),
            hours: this.padZero(hours),
            minutes: this.padZero(datetime.getMinutes()),
            seconds: this.padZero(datetime.getSeconds()),
            amPm: this.getAmPm(datetime.getHours()),
            gmtOffset: this.formatTimezone(datetime)
        };
    };
    KTDatepickerStateManager.prototype.setSelectedDate = function (date) {
        var _a;
        if (date === null) {
            this._selectedDate = null;
            return;
        }
        if (isNaN(date.getTime())) {
            console.warn('Invalid date provided:', date);
            return;
        }
        if (!this._selectedDate) {
            this._selectedDate = new Date(date.getTime());
        }
        else {
            this._selectedDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        }
        if ((_a = this._selectedDateRange) === null || _a === void 0 ? void 0 : _a.startDate) {
            var startDate = this._selectedDateRange.startDate;
            this._selectedDate.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
        }
    };
    KTDatepickerStateManager.prototype.setSelectedDateRange = function (startDate, endDate) {
        if (startDate === void 0) { startDate = null; }
        if (endDate === void 0) { endDate = null; }
        this._selectedDateRange = { startDate: startDate, endDate: endDate };
    };
    KTDatepickerStateManager.prototype.setSelectedDateRangeStart = function (date) {
        this._selectedDateRange.startDate = date;
    };
    KTDatepickerStateManager.prototype.setSelectedDateRangeEnd = function (date) {
        this._selectedDateRange.endDate = date;
    };
    KTDatepickerStateManager.prototype.getSelectedDateInterface = function () {
        return { selectedDate: this._selectedDate, selectedDateRange: this._selectedDateRange };
    };
    KTDatepickerStateManager.prototype.getSelectedDate = function () {
        return this._selectedDate;
    };
    KTDatepickerStateManager.prototype.getSelectedDateRange = function () {
        return this._selectedDateRange;
    };
    Object.defineProperty(KTDatepickerStateManager.prototype, "minDate", {
        set: function (date) {
            if (date) {
                this._config.minDate = date;
            }
            else {
                delete this._config.minDate;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KTDatepickerStateManager.prototype, "maxDate", {
        set: function (date) {
            if (date) {
                this._config.maxDate = date;
            }
            else {
                delete this._config.maxDate;
            }
        },
        enumerable: false,
        configurable: true
    });
    return KTDatepickerStateManager;
}());
exports.KTDatepickerStateManager = KTDatepickerStateManager;
;
/**
 * Adds a custom locale to the `DefaultConfig.locales` object.
 *
 * @param {string} locale - The locale identifier.
 * @param {LocaleConfigInterface} config - The configuration object for the locale.
 */
var addLocale = function (locale, config) {
    var _a;
    exports.DefaultConfig.locales = __assign(__assign({}, exports.DefaultConfig.locales), (_a = {}, _a[locale] = config, _a));
};
exports.addLocale = addLocale;


/***/ }),

/***/ "./src/components/datepicker/datepicker.ts":
/*!*************************************************!*\
  !*** ./src/components/datepicker/datepicker.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDatepicker = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var calendar_1 = __webpack_require__(/*! ./calendar */ "./src/components/datepicker/calendar.ts");
var config_1 = __webpack_require__(/*! ./config */ "./src/components/datepicker/config.ts");
var keyboard_1 = __webpack_require__(/*! ./keyboard */ "./src/components/datepicker/keyboard.ts");
var KTDatepicker = /** @class */ (function (_super) {
    __extends(KTDatepicker, _super);
    /**
     * Constructor for the KTDatepicker class.
     *
     * @param {HTMLElement} element - The HTML element that the datepicker will be attached to.
     * @param {KTDatepickerConfigInterface} config - Optional configuration object for the datepicker.
     * @return {void}
     */
    function KTDatepicker(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'datepicker';
        // Check if the element already has a datepicker instance attached to it
        if (data_1.default.has(element, _this._name)) {
            return _this;
        }
        // Initialize the datepicker with the provided element
        _this._init(element);
        // Build the configuration object by merging the default config with the provided config
        _this._buildConfig(config);
        // Store the instance of the datepicker directly on the element
        element.instance = _this;
        _this._element.setAttribute('tabindex', '0');
        _this._state = new config_1.KTDatepickerStateManager(_this._config);
        _this._config = _this._state.getConfig();
        // Get input elements from HTML
        _this._getInputElements();
        _this._calendar = new calendar_1.KTDatepickerCalendar(_this._element, _this._state);
        _this._keyboard = new keyboard_1.KTDatepickerKeyboard(_this._element, _this._state);
        // Initialize the datepicker UI
        _this._initDatePicker();
        _this._dispatchEvent(_this._config.initEvent);
        _this._fireEvent(_this._config.initEvent);
        return _this;
    }
    KTDatepicker.prototype._getInputElements = function () {
        this._dateInputElement = this._element.querySelector("input[".concat(this._config.inputSelector, "]"));
        if (this._config.range) {
            this._startDateInputElement = this._element.querySelector("input[".concat(this._config.startInputSelector, "]"));
            this._endDateInputElement = this._element.querySelector("input[".concat(this._config.endInputSelector, "]"));
        }
    };
    KTDatepicker.prototype._destroy = function () {
        // Remove data attribute
        data_1.default.remove(this._element, this._name);
        // Remove instance from static map
        KTDatepicker._instances.delete(this._element);
        // Clear private properties
        this._element = null;
    };
    /**
     * ========================================================================
     * Date utils
     * ========================================================================
     */
    KTDatepicker.prototype._formatDateRange = function (dateRange, dateFormat, timeFormat) {
        return "".concat(this._formatDateTime(dateRange.startDate, dateFormat, timeFormat)).concat(this._config.rangeSeparator).concat(this._formatDateTime(dateRange.endDate, dateFormat, timeFormat));
    };
    KTDatepicker.prototype._formatDateTime = function (date, dateFormat, timeFormat) {
        if (!date) {
            return '';
        }
        var formattedDate = this._formatDateOnly(date, dateFormat);
        if (this._config.enableTime && timeFormat) {
            var formattedTime = this._state.formatTime(date, timeFormat);
            return "".concat(formattedDate, " ").concat(formattedTime);
        }
        return formattedDate;
    };
    KTDatepicker.prototype._formatDateOnly = function (date, dateFormat) {
        var _this = this;
        if (!date) {
            return '';
        }
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return dateFormat.replace(/dd|MM|yyyy/g, function (match) {
            switch (match) {
                case 'dd':
                    return _this._state.padZero(day);
                case 'MM':
                    return _this._state.padZero(month);
                case 'yyyy':
                    return String(year);
                default:
                    return match;
            }
        });
    };
    /**
     * ========================================================================
     * Date input
     * ========================================================================
     */
    KTDatepicker.prototype._updateInputValue = function (selectedDate) {
        var _a;
        if (!this._dateInputElement) {
            return;
        }
        var dateFormat = this._state.getDateFormat();
        var timeFormat = this._config.enableTime
            ? this._state.getTimeFormat()
            : undefined;
        if (this._config.range && ((_a = selectedDate.selectedDateRange) === null || _a === void 0 ? void 0 : _a.startDate)) {
            var _b = selectedDate.selectedDateRange, startDate = _b.startDate, endDate = _b.endDate;
            // Format date range and update main input
            this._dateInputElement.value = this._formatDateRange(selectedDate.selectedDateRange, dateFormat, timeFormat);
            // Update hidden inputs (if they exist)
            if (this._startDateInputElement instanceof HTMLInputElement) {
                this._startDateInputElement.value = this._formatDateTime(startDate, dateFormat, timeFormat);
            }
            if (this._endDateInputElement instanceof HTMLInputElement) {
                this._endDateInputElement.value = this._formatDateTime(endDate, dateFormat, timeFormat);
            }
        }
        else {
            // Format single date and update main input
            this._dateInputElement.value = this._formatDateTime(selectedDate.selectedDate, dateFormat, timeFormat);
        }
    };
    /**
     * ========================================================================
     * Listeners
     * ========================================================================
     */
    KTDatepicker.prototype._attachSelectedDateListener = function () {
        this._element.addEventListener(this._config.dateChangeEvent, this._handleOnDateChange.bind(this));
        this._element.addEventListener(this._config.keyboardNavigateEvent, this._handleOnCalendarUpdate.bind(this));
        this._element.addEventListener(this._config.calendarRenderedEvent, this._handleOnCalendarUpdate.bind(this));
        if (this._dateInputElement) {
            this._dateInputElement.addEventListener('change', this._handleOnDateChange.bind(this));
        }
    };
    KTDatepicker.prototype._handleOnDateChange = function (event) {
        var _a;
        var selected = (_a = event.detail.payload) !== null && _a !== void 0 ? _a : {
            selectedDate: null,
            selectedDateRange: null,
        };
        // TODO handle error on failed parse
        this._updateInputValue(selected);
    };
    KTDatepicker.prototype._handleOnCalendarUpdate = function (_event) {
        this._initKeyboardSupport();
    };
    /**
     * ========================================================================
     * Inputs UI
     * ========================================================================
     */
    KTDatepicker.prototype._initDatePicker = function () {
        this._initKeyboardSupport();
        if (this._calendar instanceof calendar_1.KTDatepickerCalendar) {
            this._calendar.renderCalendar();
        }
        this._attachSelectedDateListener();
        this._element.classList.add('datepicker-initialized');
    };
    KTDatepicker.prototype._initKeyboardSupport = function () {
        this._keyboard.setInputElement(this._dateInputElement);
        var dateInputDisplayElement = this._renderDateInputDisplay(this._state.getSelectedDateInterface());
        this._keyboard.setInputDisplayElement(dateInputDisplayElement);
    };
    KTDatepicker.prototype._renderDateInputDisplay = function (selectedDate) {
        var _a, _b;
        var newElement = null;
        if (this._config.range && selectedDate.selectedDateRange) {
            var _c = selectedDate.selectedDateRange, startDate = _c.startDate, endDate = _c.endDate;
            var startDateTimeDisplay = this._state.getDateDisplayInterface(startDate);
            var endDateTimeDisplay = this._state.getDateDisplayInterface(endDate);
            newElement = (_a = this._state
                .getTemplates()) === null || _a === void 0 ? void 0 : _a.datetimeDisplayRange(this._state, startDateTimeDisplay, endDateTimeDisplay, true, this._config.enableTime, this._config.enableTime, this._state.is12Hours());
        }
        else {
            var dateTimeDisplay = this._state.getDateDisplayInterface(selectedDate.selectedDate);
            newElement = (_b = this._state
                .getTemplates()) === null || _b === void 0 ? void 0 : _b.datetimeDisplay(this._state, dateTimeDisplay, true, this._config.enableTime, this._config.enableTime, this._state.is12Hours());
        }
        if (this._dateInputDisplayElement) {
            this._dateInputDisplayElement.replaceWith(newElement);
        }
        else {
            this._element.appendChild(newElement);
        }
        this._dateInputDisplayElement = newElement;
        return newElement;
    };
    /**
     * ========================================================================
     * Public API
     * ========================================================================
     */
    KTDatepicker.prototype.getDate = function () {
        if (this._config.range) {
            return this._state.getSelectedDateRange();
        }
        else {
            return this._state.getSelectedDate();
        }
    };
    KTDatepicker.prototype.setDate = function (date) {
        if (this._config.range) {
            this._state.setSelectedDateRange(date, null);
        }
        else {
            this._state.setSelectedDate(date);
        }
    };
    KTDatepicker.prototype.getDateRange = function () {
        return this._state.getSelectedDateRange();
    };
    KTDatepicker.prototype.setDateRange = function (start, end) {
        this._state.setSelectedDateRange(start, end);
    };
    KTDatepicker.prototype.setMinDate = function (minDate) {
        this._config.minDate = minDate;
    };
    KTDatepicker.prototype.setMaxDate = function (maxDate) {
        this._config.maxDate = maxDate;
    };
    KTDatepicker.prototype.update = function () {
        if (this._calendar instanceof calendar_1.KTDatepickerCalendar) {
            this._calendar.renderCalendar();
        }
    };
    KTDatepicker.prototype.destroy = function () {
        this._destroy();
    };
    KTDatepicker.createInstances = function () {
        var _this = this;
        var elements = document.querySelectorAll('[data-kt-datepicker]');
        elements.forEach(function (element) {
            if (element.hasAttribute('data-kt-datepicker') &&
                !element.classList.contains('datepicker-initialized')) {
                var instance = new KTDatepicker(element);
                _this._instances.set(element, instance);
            }
        });
    };
    KTDatepicker.init = function () {
        KTDatepicker.createInstances();
    };
    /**
     * ========================================================================
     * Static instances
     * ========================================================================
     */
    KTDatepicker._instances = new Map();
    return KTDatepicker;
}(component_1.default));
exports.KTDatepicker = KTDatepicker;
if (typeof window !== 'undefined') {
    window.KTDatepicker = KTDatepicker;
}


/***/ }),

/***/ "./src/components/datepicker/index.ts":
/*!********************************************!*\
  !*** ./src/components/datepicker/index.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDatepicker = void 0;
var datepicker_1 = __webpack_require__(/*! ./datepicker */ "./src/components/datepicker/datepicker.ts");
Object.defineProperty(exports, "KTDatepicker", ({ enumerable: true, get: function () { return datepicker_1.KTDatepicker; } }));


/***/ }),

/***/ "./src/components/datepicker/keyboard.ts":
/*!***********************************************!*\
  !*** ./src/components/datepicker/keyboard.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDatepickerKeyboard = void 0;
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var types_1 = __webpack_require__(/*! ./types */ "./src/components/datepicker/types.ts");
var KTDatepickerKeyboard = /** @class */ (function (_super) {
    __extends(KTDatepickerKeyboard, _super);
    function KTDatepickerKeyboard(element, stateManager) {
        var _this = _super.call(this) || this;
        _this._name = 'datepicker-keyboard';
        _this._state = stateManager;
        _this._init(element);
        _this._buildConfig(_this._state.getConfig());
        _this._attachInputEventListeners();
        _this._attachKeyboardEvent();
        return _this;
    }
    KTDatepickerKeyboard.prototype._attachInputEventListeners = function () {
        this._element.addEventListener(this._config.dateChangeEvent, this._handleOnDateChange.bind(this));
    };
    KTDatepickerKeyboard.prototype._handleOnDateChange = function (_event) {
        this._dispatchEvent(this._config.calendarRenderedEvent, this._state.getSelectedDateInterface());
        this._fireEvent(this._config.calendarRenderedEvent, this._state.getSelectedDateInterface());
    };
    KTDatepickerKeyboard.prototype._dateInputFocusOut = function (_event) {
        this._focusedSegment = null;
    };
    KTDatepickerKeyboard.prototype._updateDateInputDisplayElement = function () {
        var _this = this;
        var _a;
        this._element.querySelectorAll("[".concat(this._config.segmentSelector, "]")).forEach(function (element) {
            if (element instanceof HTMLElement) {
                element.classList.remove(_this._config.selectedClass);
            }
        });
        if (this._focusedSegment) {
            (_a = this._element.querySelector("[".concat(this._config.segmentSelector, "=\"").concat(this._focusedSegment, "\"]"))) === null || _a === void 0 ? void 0 : _a.classList.add(this._config.selectedClass);
        }
        if (this._dateInputDisplayElement) {
            this._dateInputDisplayElement.addEventListener('click', this._handleDateInputSegmentClick.bind(this));
        }
        if (this._dateInputElement) {
            this._dateInputElement.addEventListener('focusout', this._dateInputFocusOut.bind(this));
        }
    };
    KTDatepickerKeyboard.prototype._handleDateInputSegmentClick = function (event) {
        var _this = this;
        this._element.querySelectorAll("[".concat(this._config.segmentSelector, "]")).forEach(function (segmentElement) {
            segmentElement === null || segmentElement === void 0 ? void 0 : segmentElement.classList.remove(_this._config.selectedClass);
            if (segmentElement.contains(event.target)) {
                segmentElement === null || segmentElement === void 0 ? void 0 : segmentElement.classList.add(_this._config.selectedClass);
                _this._focusedSegment = segmentElement.dataset.datepickerSegment;
            }
        });
        this._dateInputElement.focus();
    };
    /**
     * ========================================================================
     * Keyboard navigation on input
     * ========================================================================
     */
    KTDatepickerKeyboard.prototype._attachKeyboardEvent = function () {
        var _this = this;
        this._element.addEventListener('keydown', function (event) {
            event.preventDefault();
            if (_this._focusedSegment) {
                _this._handleKeyboardNavigation(event.key);
                _this._updateDateInputDisplayElement();
            }
            else {
                _this._handleKeyboardNavigationCalendar(event.key);
            }
        });
    };
    KTDatepickerKeyboard.prototype._handleKeyboardNavigation = function (key) {
        var _this = this;
        var _a;
        // Check if the pressed key is a number or backspace
        if (/\d/.test(key) || key === 'Backspace') {
            this._handleKeyboardInput(key);
        }
        else {
            var segmentActions = {
                ArrowUp: function () { return _this._adjustSegmentValue(1); },
                ArrowDown: function () { return _this._adjustSegmentValue(-1); },
                ArrowLeft: function () { return _this._navigateSegment(-1); },
                ArrowRight: function () { return _this._navigateSegment(1); },
                Enter: function () { return _this._handleEnterKey(); },
                Escape: function () { return _this._focusedSegment = null; },
            };
            (_a = segmentActions[key]) === null || _a === void 0 ? void 0 : _a.call(segmentActions);
        }
        this._dispatchEvent(this._config.dateChangeEvent, this._state.getSelectedDateInterface());
        this._fireEvent(this._config.dateChangeEvent, this._state.getSelectedDateInterface());
        this._dispatchEvent(this._config.keyboardNavigateEvent, this._state.getSelectedDateInterface());
        this._fireEvent(this._config.keyboardNavigateEvent, this._state.getSelectedDateInterface());
    };
    KTDatepickerKeyboard.prototype._adjustSegmentValue = function (increment) {
        var activeDate = this._getActiveDate() || new Date();
        switch (this._focusedSegment) {
            case types_1.DatePickerSegment.Day:
            case types_1.DatePickerSegment.EndDay:
                var maxDay = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 0).getDate();
                var newDay = activeDate.getDate() + increment;
                if (newDay >= 1 && newDay <= maxDay) {
                    activeDate.setDate(newDay);
                }
                break;
            case types_1.DatePickerSegment.Month:
            case types_1.DatePickerSegment.EndMonth:
                activeDate.setMonth(activeDate.getMonth() + increment);
                break;
            case types_1.DatePickerSegment.Year:
            case types_1.DatePickerSegment.EndYear:
                activeDate.setFullYear(activeDate.getFullYear() + increment);
                break;
            case types_1.DatePickerSegment.Hours:
            case types_1.DatePickerSegment.EndHours:
                var newHours = activeDate.getHours() + increment;
                newHours = (newHours + 24) % 24; // Ensure hours stay within 0-23 range
                activeDate.setHours(newHours);
                break;
            case types_1.DatePickerSegment.Minutes:
            case types_1.DatePickerSegment.EndMinutes:
                var newMinutes = activeDate.getMinutes() + increment;
                newMinutes = (newMinutes + 60) % 60; // Ensure minutes stay within 0-59 range
                activeDate.setMinutes(newMinutes);
                break;
            case types_1.DatePickerSegment.Seconds:
            case types_1.DatePickerSegment.EndSeconds:
                var newSeconds = activeDate.getSeconds() + increment;
                newSeconds = (newSeconds + 60) % 60; // Ensure seconds stay within 0-59 range
                activeDate.setSeconds(newSeconds);
                break;
            case types_1.DatePickerSegment.AmPm:
            case types_1.DatePickerSegment.EndAmPm:
                activeDate.setHours(activeDate.getHours() + 12 * increment);
                break;
        }
        this._updateActiveDate(activeDate);
    };
    KTDatepickerKeyboard.prototype._handleKeyboardInput = function (key) {
        var _a;
        var activeDate = (_a = this._getActiveDate()) !== null && _a !== void 0 ? _a : new Date();
        var segment = this._focusedSegment;
        var currentValue = this._getSegmentValue(activeDate, segment);
        var maxValue = this._getSegmentMaxValue(activeDate, segment);
        var requiredDigits = this._getSegmentRequiredDigits(segment);
        if (key === 'Backspace') {
            currentValue = currentValue > 9 ? Math.floor(currentValue / 10) : 0;
        }
        else {
            var newDigit = parseInt(key);
            var potentialNewValue = currentValue * 10 + newDigit;
            if (potentialNewValue > maxValue) {
                currentValue = newDigit;
            }
            else if (potentialNewValue >= this._getSegmentMinValue(segment)) {
                currentValue = potentialNewValue;
            }
        }
        this._setSegmentValue(activeDate, segment, currentValue);
        // Navigate to the next segment if:
        // 1. It's the month segment (start or end) AND the current value is NOT 1
        // 2. OR the number of digits entered matches the required digits for the segment
        if (((segment === types_1.DatePickerSegment.Month || segment === types_1.DatePickerSegment.EndMonth) && currentValue !== 1)
            || currentValue.toString().length === requiredDigits) {
            this._navigateSegment(1);
        }
        this._updateActiveDate(activeDate);
    };
    KTDatepickerKeyboard.prototype._getSegmentRequiredDigits = function (segment) {
        switch (segment) {
            case types_1.DatePickerSegment.Day:
            case types_1.DatePickerSegment.EndDay:
            case types_1.DatePickerSegment.Month:
            case types_1.DatePickerSegment.EndMonth:
            case types_1.DatePickerSegment.Hours:
            case types_1.DatePickerSegment.EndHours:
            case types_1.DatePickerSegment.Minutes:
            case types_1.DatePickerSegment.EndMinutes:
            case types_1.DatePickerSegment.Seconds:
            case types_1.DatePickerSegment.EndSeconds:
                return 2;
            case types_1.DatePickerSegment.Year:
            case types_1.DatePickerSegment.EndYear:
                return 4;
            default:
                return 0;
        }
    };
    KTDatepickerKeyboard.prototype._getSegmentValue = function (date, segment) {
        switch (segment) {
            case types_1.DatePickerSegment.Day:
            case types_1.DatePickerSegment.EndDay:
                return date.getDate();
            case types_1.DatePickerSegment.Month:
            case types_1.DatePickerSegment.EndMonth:
                return date.getMonth() + 1; // Months are 0-indexed
            case types_1.DatePickerSegment.Year:
            case types_1.DatePickerSegment.EndYear:
                return date.getFullYear();
            case types_1.DatePickerSegment.Hours:
            case types_1.DatePickerSegment.EndHours:
                return date.getHours();
            case types_1.DatePickerSegment.Minutes:
            case types_1.DatePickerSegment.EndMinutes:
                return date.getMinutes();
            case types_1.DatePickerSegment.Seconds:
            case types_1.DatePickerSegment.EndSeconds:
                return date.getSeconds();
            default:
                return 0;
        }
    };
    KTDatepickerKeyboard.prototype._getSegmentMaxValue = function (date, segment) {
        switch (segment) {
            case types_1.DatePickerSegment.Day:
            case types_1.DatePickerSegment.EndDay:
                return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            case types_1.DatePickerSegment.Month:
            case types_1.DatePickerSegment.EndMonth:
                return 12;
            case types_1.DatePickerSegment.Year:
            case types_1.DatePickerSegment.EndYear:
                return 9999; // Or any reasonable upper limit you want to set
            case types_1.DatePickerSegment.Hours:
            case types_1.DatePickerSegment.EndHours:
                return 23;
            case types_1.DatePickerSegment.Minutes:
            case types_1.DatePickerSegment.EndMinutes:
            case types_1.DatePickerSegment.Seconds:
            case types_1.DatePickerSegment.EndSeconds:
                return 59;
            default:
                return 0;
        }
    };
    KTDatepickerKeyboard.prototype._getSegmentMinValue = function (segment) {
        switch (segment) {
            case types_1.DatePickerSegment.Day:
            case types_1.DatePickerSegment.EndDay:
            case types_1.DatePickerSegment.Month:
            case types_1.DatePickerSegment.EndMonth:
                return 1;
            case types_1.DatePickerSegment.Year:
            case types_1.DatePickerSegment.EndYear:
                return 1; // Or any reasonable lower limit you want to set
            case types_1.DatePickerSegment.Hours:
            case types_1.DatePickerSegment.EndHours:
            case types_1.DatePickerSegment.Minutes:
            case types_1.DatePickerSegment.EndMinutes:
            case types_1.DatePickerSegment.Seconds:
            case types_1.DatePickerSegment.EndSeconds:
                return 0;
            default:
                return 0;
        }
    };
    KTDatepickerKeyboard.prototype._setSegmentValue = function (date, segment, value) {
        switch (segment) {
            case types_1.DatePickerSegment.Day:
            case types_1.DatePickerSegment.EndDay:
                date.setDate(value);
                break;
            case types_1.DatePickerSegment.Month:
            case types_1.DatePickerSegment.EndMonth:
                date.setMonth(value - 1); // Months are 0-indexed
                break;
            case types_1.DatePickerSegment.Year:
            case types_1.DatePickerSegment.EndYear:
                date.setFullYear(value);
                break;
            case types_1.DatePickerSegment.Hours:
            case types_1.DatePickerSegment.EndHours:
                date.setHours(value);
                break;
            case types_1.DatePickerSegment.Minutes:
            case types_1.DatePickerSegment.EndMinutes:
                date.setMinutes(value);
                break;
            case types_1.DatePickerSegment.Seconds:
            case types_1.DatePickerSegment.EndSeconds:
                date.setSeconds(value);
                break;
        }
    };
    KTDatepickerKeyboard.prototype._getActiveDate = function () {
        // Set default activeInput to 'end' for range selection
        this._activeInput = this._config.range ? types_1.ActiveInput.End : types_1.ActiveInput.Start;
        // Check if the selected segment belongs to the start date
        var isStartDateSegment = Object.values(types_1.DatePickerSegment)
            .slice(0, Object.keys(types_1.DatePickerSegment).length / 2) // Get only the start date segments
            .includes(this._focusedSegment);
        if (isStartDateSegment) {
            this._activeInput = types_1.ActiveInput.Start;
        }
        var _a = this._state.getSelectedDateInterface(), selectedDate = _a.selectedDate, selectedDateRange = _a.selectedDateRange;
        return this._config.range ?
            (this._activeInput === types_1.ActiveInput.Start ? selectedDateRange === null || selectedDateRange === void 0 ? void 0 : selectedDateRange.startDate : selectedDateRange === null || selectedDateRange === void 0 ? void 0 : selectedDateRange.endDate)
            : selectedDate;
    };
    KTDatepickerKeyboard.prototype._updateActiveDate = function (date) {
        if (this._config.range) {
            if (this._activeInput === types_1.ActiveInput.Start) {
                this._state.setSelectedDateRangeStart(new Date(date));
            }
            else {
                this._state.setSelectedDateRangeEnd(new Date(date));
            }
        }
        else {
            this._state.setSelectedDate(new Date(date));
        }
    };
    KTDatepickerKeyboard.prototype._navigateSegment = function (offset) {
        var segmentValues = Object.values(types_1.DatePickerSegment);
        var segmentCount = segmentValues.length;
        var currentIndex = segmentValues.indexOf(this._focusedSegment);
        // Calculate the new index, ensuring it stays within bounds and skips time segments if not enabled
        var newIndex = currentIndex + offset;
        while (newIndex < 0 || newIndex >= segmentCount
            || (!this._config.enableTime && this._isTimeSegment(segmentValues[newIndex]))
            || (!this._config.range && this._isOutOfRangeSegment(segmentValues[newIndex])) // Skip out-of-range segments if in range mode
        ) {
            newIndex += offset; // Keep adjusting until a valid segment is found
            if (newIndex < 0) {
                newIndex = segmentCount - 1;
            }
            else if (newIndex >= segmentCount) {
                newIndex = 0;
            }
        }
        this._focusedSegment = segmentValues[newIndex];
    };
    KTDatepickerKeyboard.prototype._isOutOfRangeSegment = function (segment) {
        return [
            types_1.DatePickerSegment.EndDay,
            types_1.DatePickerSegment.EndMonth,
            types_1.DatePickerSegment.EndYear,
            types_1.DatePickerSegment.EndHours,
            types_1.DatePickerSegment.EndMinutes,
            types_1.DatePickerSegment.EndSeconds,
            types_1.DatePickerSegment.EndAmPm,
            types_1.DatePickerSegment.GmtOffset,
        ].includes(segment);
    };
    KTDatepickerKeyboard.prototype._isTimeSegment = function (segment) {
        return [
            types_1.DatePickerSegment.Hours,
            types_1.DatePickerSegment.EndHours,
            types_1.DatePickerSegment.Minutes,
            types_1.DatePickerSegment.EndMinutes,
            types_1.DatePickerSegment.Seconds,
            types_1.DatePickerSegment.EndSeconds,
            types_1.DatePickerSegment.AmPm,
            types_1.DatePickerSegment.EndAmPm,
            types_1.DatePickerSegment.GmtOffset,
        ].includes(segment);
    };
    KTDatepickerKeyboard.prototype._handleEnterKey = function () {
        console.log('enter');
    };
    /**
     * ========================================================================
     * Keyboard navigation on calendar
     * ========================================================================
     */
    KTDatepickerKeyboard.prototype._handleKeyboardNavigationCalendar = function (key) {
        var _this = this;
        var _a;
        var activeDate;
        if (this._config.range) {
            var _b = this._state.getSelectedDateRange(), startDate = _b.startDate, endDate = _b.endDate;
            activeDate = endDate < startDate ? startDate : endDate;
        }
        else {
            activeDate = this._state.getSelectedDate();
        }
        if (!activeDate) {
            activeDate = new Date();
        }
        var segmentActions = {
            ArrowUp: function () { return activeDate.setDate(activeDate.getDate() - 7); },
            ArrowDown: function () { return activeDate.setDate(activeDate.getDate() + 7); },
            ArrowLeft: function () { return activeDate.setDate(activeDate.getDate() - 1); },
            ArrowRight: function () { return activeDate.setDate(activeDate.getDate() + 1); },
            Enter: function () {
                if (_this._config.range) {
                    var _a = _this._state.getSelectedDateRange(), startDate = _a.startDate, endDate = _a.endDate;
                    if (!startDate) {
                        _this._state.setSelectedDateRangeStart(new Date());
                    }
                    if (!endDate) {
                        _this._state.setSelectedDateRangeEnd(new Date(Date.now() + 86400000));
                    }
                }
                else {
                    var selectedDate = _this._state.getSelectedDate();
                    if (!selectedDate) {
                        _this._state.setSelectedDate(new Date());
                    }
                }
            },
            Escape: function () {
                _this._focusedSegment = null;
                _this._dateInputElement.blur();
            },
        };
        (_a = segmentActions[key]) === null || _a === void 0 ? void 0 : _a.call(segmentActions);
        this._dispatchEvent(this._config.dateChangeEvent, this._state.getSelectedDateInterface());
        this._fireEvent(this._config.dateChangeEvent, this._state.getSelectedDateInterface());
        this._dispatchEvent(this._config.keyboardNavigateEvent, this._state.getSelectedDateInterface());
        this._fireEvent(this._config.keyboardNavigateEvent, this._state.getSelectedDateInterface());
    };
    /**
     * ========================================================================
     * Public API
     * ========================================================================
     */
    KTDatepickerKeyboard.prototype.setInputDisplayElement = function (element) {
        this._dateInputDisplayElement = element;
        this._updateDateInputDisplayElement();
    };
    KTDatepickerKeyboard.prototype.setInputElement = function (element) {
        this._dateInputElement = element;
    };
    return KTDatepickerKeyboard;
}(component_1.default));
exports.KTDatepickerKeyboard = KTDatepickerKeyboard;


/***/ }),

/***/ "./src/components/datepicker/locales.ts":
/*!**********************************************!*\
  !*** ./src/components/datepicker/locales.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultLocales = exports.generateLocaleConfig = void 0;
/**
 * Generates a locale configuration object based on the given locale and first day of the week.
 *
 * @param {string} locale - The locale code to generate the configuration for.
 * @param {number} firstDayOfWeek - The first day of the week, where 0 represents Sunday.
 * @return {LocaleConfigInterface} The generated locale configuration object.
 */
var generateLocaleConfig = function (locale, firstDayOfWeek) { return ({
    // Names of months (e.g., January, February, ...)
    monthNames: Array.from({ length: 12 }, function (_, month) { return new Date(0, month).toLocaleString(locale, { month: 'long' }); }),
    // Shortened names of months (e.g., Jan, Feb, ...)
    monthNamesShort: Array.from({ length: 12 }, function (_, month) { return new Date(0, month).toLocaleString(locale, { month: 'short' }); }),
    // Names of days of the week (e.g., Sunday, Monday, ...)
    dayNames: Array.from({ length: 7 }, function (_, day) { return new Date(0, 0, day + 1).toLocaleString(locale, { weekday: 'long' }); }),
    // Shortened names of days of the week (e.g., Sun, Mon, ...)
    dayNamesShort: Array.from({ length: 7 }, function (_, day) { return new Date(0, 0, day + 1).toLocaleString(locale, { weekday: 'short' }); }),
    // The first day of the week is the first day of the week in the selected locale
    firstDayOfWeek: firstDayOfWeek,
    // Names of days of the week, abbreviated (e.g., S, M, ...)
    dayNamesMin: Array.from({ length: 7 }, function (_, day) { return new Date(0, 0, day + 1).toLocaleString(locale, { weekday: 'narrow' }); }),
}); };
exports.generateLocaleConfig = generateLocaleConfig;
exports.DefaultLocales = {
    // English (United States)
    'en-US': (0, exports.generateLocaleConfig)('en-US', 0),
    // Chinese (China)
    'zh-CN': (0, exports.generateLocaleConfig)('zh-CN', 0),
    // Spanish (Spain)
    'es-ES': (0, exports.generateLocaleConfig)('es-ES', 1),
    // French (France)
    'fr-FR': (0, exports.generateLocaleConfig)('fr-FR', 1),
    // Russian (Russia)
    'ru-RU': (0, exports.generateLocaleConfig)('ru-RU', 1),
    // Japanese (Japan)
    'ja-JP': (0, exports.generateLocaleConfig)('ja-JP', 0),
    // Korean (South Korea)
    'ko-KR': (0, exports.generateLocaleConfig)('ko-KR', 0),
    // Indonesian (Indonesia)
    'id-ID': (0, exports.generateLocaleConfig)('id-ID', 0),
    // Malay (Malaysia)
    'ms-MY': (0, exports.generateLocaleConfig)('ms-MY', 1),
    // Italian (Italy)
    'it-IT': (0, exports.generateLocaleConfig)('it-IT', 1),
    // Portuguese (Portugal)
    'pt-PT': (0, exports.generateLocaleConfig)('pt-PT', 1),
    // German (Germany)
    'de-DE': (0, exports.generateLocaleConfig)('de-DE', 1),
    // Chinese (Hong Kong)
    'zh-HK': (0, exports.generateLocaleConfig)('zh-HK', 0),
    // Chinese (Taiwan)
    'zh-TW': (0, exports.generateLocaleConfig)('zh-TW', 0),
    // Vietnamese (Vietnam)
    'vi-VN': (0, exports.generateLocaleConfig)('vi-VN', 0),
    // Turkish (Turkey)
    'tr-TR': (0, exports.generateLocaleConfig)('tr-TR', 1),
    // Thai (Thailand)
    'th-TH': (0, exports.generateLocaleConfig)('th-TH', 0),
    // Arabic (Egypt)
    'ar-EG': (0, exports.generateLocaleConfig)('ar-EG', 0),
};


/***/ }),

/***/ "./src/components/datepicker/templates.ts":
/*!************************************************!*\
  !*** ./src/components/datepicker/templates.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultTemplates = void 0;
exports._html = _html;
var types_1 = __webpack_require__(/*! ./types */ "./src/components/datepicker/types.ts");
exports.DefaultTemplates = {
    dropdownContainer: function (_state) { return _html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\t<div data-kt-datepicker-dropdown class=\"hidden absolute z-10 bg-white border border-gray-300 rounded shadow-md\">\n\t\t</div>\n\t"], ["\n\t\t<div data-kt-datepicker-dropdown class=\"hidden absolute z-10 bg-white border border-gray-300 rounded shadow-md\">\n\t\t</div>\n\t"]))); },
    calendar: function (state, visibleMonths) {
        if (visibleMonths === void 0) { visibleMonths = 1; }
        return _html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\t<div data-kt-datepicker-calendar>\n\t\t\t<div>\n\t\t\t\t<button data-kt-datepicker-prev-btn aria-label=\"Previous month\">&lt;</button>\n\t\t\t\t<button data-kt-datepicker-next-btn aria-label=\"Next month\">&gt;</button>\n\t\t\t</div>\n\t\t\t<div class=\"", "\">\n\t\t\t\t", "\n\t\t\t</div>\n\t\t</div>\n\t"], ["\n\t\t<div data-kt-datepicker-calendar>\n\t\t\t<div>\n\t\t\t\t<button data-kt-datepicker-prev-btn aria-label=\"Previous month\">&lt;</button>\n\t\t\t\t<button data-kt-datepicker-next-btn aria-label=\"Next month\">&gt;</button>\n\t\t\t</div>\n\t\t\t<div class=\"", "\">\n\t\t\t\t", "\n\t\t\t</div>\n\t\t</div>\n\t"])), state.getConfig().containerClass, Array.from({ length: visibleMonths }).map(function () { return "\n\t\t\t\t\t<div data-kt-datepicker-month-container>\n\t\t\t\t\t\t<div data-kt-datepicker-month-year-display class=\"".concat(state.getConfig().monthContainerClass, "\">\n\t\t\t\t\t\t\t<span data-kt-datepicker-month-display></span> <span data-kt-datepicker-year-display></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div data-kt-datepicker-days-of-week></div>\n\t\t\t\t\t\t<div data-kt-datepicker-grid></div>\n\t\t\t\t\t</div>\n\t\t\t\t"); }).join(''));
    },
    daysOfWeek: function (_state, weekdays) { return _html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\t<div data-kt-datepicker-days-of-week>\n\t\t\t", "\n\t\t</div>\n\t"], ["\n\t\t<div data-kt-datepicker-days-of-week>\n\t\t\t", "\n\t\t</div>\n\t"])), weekdays.map(function (day) { return "\n\t\t\t\t<span>".concat(day, "</span>\n\t\t\t"); }).join('')); },
    dayCell: function (state, date, isSelected, isToday, isDisabled, isInRange, isStartDate, isEndDate) { return _html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\t\t<span data-kt-datepicker-cell class=\"", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\"\n\t\t\t\tdata-day=\"", "\"\n\t\t\t\tdata-month=\"", "\"\n\t\t\t\tdata-year=\"", "\"\n\t\t\t\t", ">\n\t\t\t", "\n\t\t</span>\n\t"], ["\n\t\t<span data-kt-datepicker-cell class=\"", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\"\n\t\t\t\tdata-day=\"", "\"\n\t\t\t\tdata-month=\"", "\"\n\t\t\t\tdata-year=\"", "\"\n\t\t\t\t", ">\n\t\t\t", "\n\t\t</span>\n\t"])), state.getConfig().dayCellClass, isSelected ? state.getConfig().dayCellSelectedClass : '', isToday ? state.getConfig().dayCellCurrentClass : '', isDisabled ? state.getConfig().dayCellDisabledClass : '', isInRange ? state.getConfig().dayCellInRangeClass : '', isStartDate ? state.getConfig().dayCellStartClass : '', isEndDate ? state.getConfig().dayCellEndClass : '', date.getDate(), String(date.getMonth()), date.getFullYear(), isDisabled ? 'data-disabled="true"' : '', date.getDate()); },
    week: function (_state, daysHtml) { return _html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\t\t<div>", "</div>\n\t"], ["\n\t\t<div>", "</div>\n\t"])), daysHtml.join('')); },
    monthYearSelector: function (state) { return _html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n\t\t<div data-kt-datepicker-month-year-selector class=\"", "\">\n\t\t\t<div class=\"flex items-center justify-between mb-4\">\n\t\t\t\t<div class=\"", "\" data-kt-datepicker-month-year-display>\n\t\t\t\t\t<span class=\"", "\" data-kt-datepicker-month-display></span>\n\t\t\t\t\t<span class=\"", "\" data-kt-datepicker-year-display></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"", "\">\n\t\t\t\t<div class=\"overflow-auto flex-shrink-0 mr-4\" data-kt-datepicker-month-options></div>\n\t\t\t\t<div class=\"overflow-auto flex-shrink-0\" data-kt-datepicker-year-options></div>\n\t\t\t</div>\n\t\t</div>\n\t"], ["\n\t\t<div data-kt-datepicker-month-year-selector class=\"", "\">\n\t\t\t<div class=\"flex items-center justify-between mb-4\">\n\t\t\t\t<div class=\"", "\" data-kt-datepicker-month-year-display>\n\t\t\t\t\t<span class=\"", "\" data-kt-datepicker-month-display></span>\n\t\t\t\t\t<span class=\"", "\" data-kt-datepicker-year-display></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"", "\">\n\t\t\t\t<div class=\"overflow-auto flex-shrink-0 mr-4\" data-kt-datepicker-month-options></div>\n\t\t\t\t<div class=\"overflow-auto flex-shrink-0\" data-kt-datepicker-year-options></div>\n\t\t\t</div>\n\t\t</div>\n\t"])), state.getConfig().monthYearSelectorContainerClass, state.getConfig().monthYearDisplayClass, state.getConfig().monthYearDisplayTextClass, state.getConfig().monthYearDisplayTextClass, state.getConfig().monthYearOptionsContainerClass); },
    monthOptions: function (state, monthNames, selectedMonthIndex) {
        return monthNames.map(function (month, monthIndex) {
            var isCurrentMonth = monthIndex === new Date().getMonth();
            return "<button data-kt-datepicker-month-option class=\"".concat(state.getConfig().monthOptionClass, " ").concat(monthIndex === selectedMonthIndex ? state.getConfig().monthOptionSelectedClass : '', " ").concat(isCurrentMonth ? state.getConfig().monthOptionCurrentClass : '', "\" data-month=\"").concat(String(monthIndex), "\">\n\t\t\t\t").concat(month, "\n\t\t\t</button>");
        }).join('');
    },
    yearOptions: function (state, selectedYear, yearLength) {
        if (yearLength === void 0) { yearLength = 10; }
        var startYear = selectedYear - Math.floor(yearLength / 2);
        return Array.from({ length: yearLength }, function (_, i) { return startYear + i; }).map(function (year) {
            var isCurrentYear = year === new Date().getFullYear();
            return "<button data-kt-datepicker-year-option class=\"".concat(state.getConfig().yearOptionClass, " ").concat(year === selectedYear ? state.getConfig().yearOptionSelectedClass : '', " ").concat(isCurrentYear ? state.getConfig().yearOptionCurrentClass : '', "\" data-year=\"").concat(year, "\">\n\t\t\t\t").concat(year, "\n\t\t\t</button>");
        }).join('');
    },
    datetimeDisplay: function (state, datetime, showDate, showTime, showGMT, is12Hours) {
        if (showDate === void 0) { showDate = true; }
        if (showTime === void 0) { showTime = false; }
        if (showGMT === void 0) { showGMT = false; }
        if (is12Hours === void 0) { is12Hours = true; }
        var config = state.getConfig();
        return _html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n\t\t\t<div class=\"", "\" data-kt-datepicker-display>\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div class=\"", "\" data-kt-datepicker-display>\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t</div>\n\t\t"])), config.datetimeDisplayClass, showDate && "\n\t\t\t\t\t<span class=\"".concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.Day, "\">").concat(datetime.day, "</span>\n\t\t\t\t\t/\n\t\t\t\t\t<span class=\"").concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.Month, "\">").concat(datetime.month, "</span>\n\t\t\t\t\t/\n\t\t\t\t\t<span class=\"").concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.Year, "\">").concat(datetime.year, "</span>\n\t\t\t\t\t").concat(showTime ? '<span>&nbsp;</span>' : '', "\n\t\t\t\t"), showTime && "\n\t\t\t\t\t<span class=\"".concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.Hours, "\">").concat(datetime.hours, "</span>\n\t\t\t\t\t:\n\t\t\t\t\t<span class=\"").concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.Minutes, "\">").concat(datetime.minutes, "</span>\n\t\t\t\t\t:\n\t\t\t\t\t<span class=\"").concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.Seconds, "\">").concat(datetime.seconds, "</span>\n\t\t\t\t\t").concat(is12Hours ? "\n\t\t\t\t\t\t<span>&nbsp;</span>\n\t\t\t\t\t\t<span class=\"".concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.AmPm, "\">").concat(datetime.amPm, "</span>\n\t\t\t\t\t") : '', "\n\t\t\t\t"), showGMT && "\n\t\t\t\t\t<span>".concat(datetime.gmtOffset, "</span>\n\t\t\t\t"));
    },
    datetimeDisplayEnd: function (state, datetime, showDate, showTime, showGMT, is12Hours) {
        if (showDate === void 0) { showDate = true; }
        if (showTime === void 0) { showTime = false; }
        if (showGMT === void 0) { showGMT = false; }
        if (is12Hours === void 0) { is12Hours = true; }
        var config = state.getConfig();
        return _html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n\t\t\t<div class=\"", "\" data-kt-datepicker-display>\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div class=\"", "\" data-kt-datepicker-display>\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t</div>\n\t\t"])), config.datetimeDisplayClass, showDate && "\n\t\t\t\t\t<span class=\"".concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.EndDay, "\">").concat(datetime.day, "</span>\n\t\t\t\t\t/\n\t\t\t\t\t<span class=\"").concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.EndMonth, "\">").concat(datetime.month, "</span>\n\t\t\t\t\t/\n\t\t\t\t\t<span class=\"").concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.EndYear, "\">").concat(datetime.year, "</span>\n\t\t\t\t\t").concat(showTime ? '<span>&nbsp;</span>' : '', "\n\t\t\t\t"), showTime && "\n\t\t\t\t\t<span class=\"".concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.EndHours, "\">").concat(datetime.hours, "</span>\n\t\t\t\t\t:\n\t\t\t\t\t<span class=\"").concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.EndMinutes, "\">").concat(datetime.minutes, "</span>\n\t\t\t\t\t:\n\t\t\t\t\t<span class=\"").concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.EndSeconds, "\">").concat(datetime.seconds, "</span>\n\t\t\t\t\t").concat(is12Hours ? "\n\t\t\t\t\t\t<span>&nbsp;</span>\n\t\t\t\t\t\t<span class=\"".concat(config.datetimeSegmentClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.EndAmPm, "\">").concat(datetime.amPm, "</span>\n\t\t\t\t\t") : '', "\n\t\t\t\t"), showGMT && "\n\t\t\t\t\t<span>".concat(datetime.gmtOffset, "</span>\n\t\t\t\t"));
    },
    datetimeDisplayRange: function (state, startDatetime, endDatetime, showDate, showTime, showGMT, is12Hours) {
        var _a, _b;
        if (showDate === void 0) { showDate = true; }
        if (showTime === void 0) { showTime = false; }
        if (showGMT === void 0) { showGMT = false; }
        if (is12Hours === void 0) { is12Hours = false; }
        return _html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n\t\t<div class=\"", "\" data-kt-datepicker-display>\n\t\t\t", "\n\t\t\t<span class=\"mx-2\">-</span>\n\t\t\t", "\n\t\t</div>\n\t"], ["\n\t\t<div class=\"", "\" data-kt-datepicker-display>\n\t\t\t", "\n\t\t\t<span class=\"mx-2\">-</span>\n\t\t\t", "\n\t\t</div>\n\t"])), state.getConfig().datetimeDisplayClass, (_a = exports.DefaultTemplates.datetimeDisplay(state, startDatetime, showDate, showTime, showGMT, is12Hours)) === null || _a === void 0 ? void 0 : _a.outerHTML, (_b = exports.DefaultTemplates.datetimeDisplayEnd(state, endDatetime, showDate, showTime, showGMT, is12Hours)) === null || _b === void 0 ? void 0 : _b.outerHTML);
    },
    timeSelectorDisplay: function (state, datetime, hourStep, minuteStep, secondStep, disabledHours, disabledMinutes, is12Hours, selected) {
        var _a;
        if (hourStep === void 0) { hourStep = 1; }
        if (minuteStep === void 0) { minuteStep = 1; }
        if (secondStep === void 0) { secondStep = 1; }
        if (disabledHours === void 0) { disabledHours = []; }
        if (disabledMinutes === void 0) { disabledMinutes = []; }
        var hours = Array.from({ length: is12Hours ? 12 / hourStep : 24 / hourStep }, function (_, i) { return (is12Hours ? 1 : 0) + i * hourStep; })
            .map(function (hour) { return ({
            value: is12Hours ? (hour % 12) || 12 : hour,
            disabled: disabledHours.includes(hour),
            displayValue: hour.toString().padStart(2, '0')
        }); });
        var minutes = Array.from({ length: 60 / minuteStep }, function (_, i) { return i * minuteStep; })
            .map(function (minute) { return ({ value: minute, disabled: disabledMinutes.includes(minute) }); });
        var seconds = Array.from({ length: 60 / secondStep }, function (_, i) { return i * secondStep; })
            .map(function (second) { return ({ value: second }); });
        return _html(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n\t\t  <div class=\"", "\">\n\t\t\t<div class=\"relative\">\n\t\t\t  ", "\n\t\t\t  <i class=\"fa fa-clock-o absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer\"></i>\n\t\t\t</div>\n\n\t\t\t<div class=\"", "\" data-time-list-container>\n\t\t\t  <div class=\"", "\">\n\t\t\t\t<div class=\"", "\" data-time-part=\"hour\">\n\t\t\t\t  <label for=\"hour-select\" class=\"", "\">Hour</label>\n\t\t\t\t  <select id=\"hour-select\" class=\"", "\" data-kt-datepicker-segment=\"", "\">\n\t\t\t\t\t", "\n\t\t\t\t  </select>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"", "\" data-time-part=\"minute\">\n\t\t\t\t  <label for=\"minute-select\" class=\"", "\">Minute</label>\n\t\t\t\t  <select id=\"minute-select\" class=\"", "\" data-kt-datepicker-segment=\"", "\">\n\t\t\t\t\t", "\n\t\t\t\t  </select>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"", "\" data-time-part=\"second\">\n\t\t\t\t  <label for=\"second-select\" class=\"", "\">Second</label>\n\t\t\t\t  <select id=\"second-select\" class=\"", "\" data-kt-datepicker-segment=\"", "\">\n\t\t\t\t\t", "\n\t\t\t\t  </select>\n\t\t\t\t</div>\n\n\t\t\t\t", "\n\t\t\t  </div>\n\t\t\t</div>\n\t\t  </div>\n\t\t"], ["\n\t\t  <div class=\"", "\">\n\t\t\t<div class=\"relative\">\n\t\t\t  ", "\n\t\t\t  <i class=\"fa fa-clock-o absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer\"></i>\n\t\t\t</div>\n\n\t\t\t<div class=\"", "\" data-time-list-container>\n\t\t\t  <div class=\"", "\">\n\t\t\t\t<div class=\"", "\" data-time-part=\"hour\">\n\t\t\t\t  <label for=\"hour-select\" class=\"", "\">Hour</label>\n\t\t\t\t  <select id=\"hour-select\" class=\"", "\" data-kt-datepicker-segment=\"", "\">\n\t\t\t\t\t", "\n\t\t\t\t  </select>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"", "\" data-time-part=\"minute\">\n\t\t\t\t  <label for=\"minute-select\" class=\"", "\">Minute</label>\n\t\t\t\t  <select id=\"minute-select\" class=\"", "\" data-kt-datepicker-segment=\"", "\">\n\t\t\t\t\t", "\n\t\t\t\t  </select>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"", "\" data-time-part=\"second\">\n\t\t\t\t  <label for=\"second-select\" class=\"", "\">Second</label>\n\t\t\t\t  <select id=\"second-select\" class=\"", "\" data-kt-datepicker-segment=\"", "\">\n\t\t\t\t\t", "\n\t\t\t\t  </select>\n\t\t\t\t</div>\n\n\t\t\t\t", "\n\t\t\t  </div>\n\t\t\t</div>\n\t\t  </div>\n\t\t"])), state.getConfig().datetimeDisplayClass, (_a = exports.DefaultTemplates.datetimeDisplay(state, datetime, false, true, true)) === null || _a === void 0 ? void 0 : _a.outerHTML, state.getConfig().timeListContainerClass, state.getConfig().timeSelectorFlexContainerClass, state.getConfig().timePartContainerClass, state.getConfig().timePartLabelClass, state.getConfig().timeSelectClass, types_1.DatePickerSegment.Hours, hours.map(function (hour) { return "\n\t\t\t\t\t  <option value=\"".concat(hour.value, "\" ").concat(hour.disabled ? 'disabled' : '', " ").concat(selected && hour.value === (is12Hours ? (selected.getHours() % 12 || 12) : selected.getHours()) ? 'selected' : '', ">\n\t\t\t\t\t\t").concat(hour.displayValue, "\n\t\t\t\t\t  </option>\n\t\t\t\t\t"); }).join(''), state.getConfig().timePartContainerClass, state.getConfig().timePartLabelClass, state.getConfig().timeSelectClass, types_1.DatePickerSegment.Minutes, minutes.map(function (minute) { return "\n\t\t\t\t\t  <option value=\"".concat(minute.value, "\" ").concat(minute.disabled ? 'disabled' : '', " ").concat(selected && minute.value === selected.getMinutes() ? 'selected' : '', ">\n\t\t\t\t\t\t").concat(minute.value.toString().padStart(2, '0'), "\n\t\t\t\t\t  </option>\n\t\t\t\t\t"); }).join(''), state.getConfig().timePartContainerClass, state.getConfig().timePartLabelClass, state.getConfig().timeSelectClass, types_1.DatePickerSegment.Seconds, seconds.map(function (second) { return "\n\t\t\t\t\t  <option value=\"".concat(second.value, "\" ").concat(selected && second.value === selected.getSeconds() ? 'selected' : '', ">\n\t\t\t\t\t\t").concat(second.value.toString().padStart(2, '0'), "\n\t\t\t\t\t  </option>\n\t\t\t\t\t"); }).join(''), is12Hours ? "\n\t\t\t\t  <div class=\"".concat(state.getConfig().timePartContainerClass, "\" data-time-part=\"am-pm\">\n\t\t\t\t\t<label for=\"am-pm-select\" class=\"").concat(state.getConfig().timePartLabelClass, "\">AM/PM</label>\n\t\t\t\t\t<select id=\"am-pm-select\" class=\"").concat(state.getConfig().timeSelectClass, "\" data-kt-datepicker-segment=\"").concat(types_1.DatePickerSegment.AmPm, "\">\n\t\t\t\t\t  <option value=\"0\" ").concat(selected && selected.getHours() < 12 ? 'selected' : '', ">AM</option>\n\t\t\t\t\t  <option value=\"12\" ").concat(selected && selected.getHours() >= 12 ? 'selected' : '', ">PM</option>\n\t\t\t\t\t</select>\n\t\t\t\t  </div>\n\t\t\t\t") : '');
    },
    timeSelectorRangeDisplay: function (state, startDateTime, endDateTime, hourStep, minuteStep, secondStep, disabledHours, disabledMinutes, is24Hours, selected) {
        var _a, _b;
        if (hourStep === void 0) { hourStep = 1; }
        if (minuteStep === void 0) { minuteStep = 1; }
        if (secondStep === void 0) { secondStep = 1; }
        if (disabledHours === void 0) { disabledHours = []; }
        if (disabledMinutes === void 0) { disabledMinutes = []; }
        return _html(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n\t\t<div class=\"flex items-center\">\n\t\t\t<div data-kt-datepicker-time-type=\"start\">\n\t\t\t\t", "\n\t\t\t</div>\n\t\t\t<span class=\"text-center w-4\">-</span>\n\t\t\t<div data-kt-datepicker-time-type=\"end\">\n\t\t\t\t", "\n\t\t\t</div>\n\t\t</div>\n\t"], ["\n\t\t<div class=\"flex items-center\">\n\t\t\t<div data-kt-datepicker-time-type=\"start\">\n\t\t\t\t", "\n\t\t\t</div>\n\t\t\t<span class=\"text-center w-4\">-</span>\n\t\t\t<div data-kt-datepicker-time-type=\"end\">\n\t\t\t\t", "\n\t\t\t</div>\n\t\t</div>\n\t"])), (_a = exports.DefaultTemplates.timeSelectorDisplay(state, startDateTime, hourStep, minuteStep, secondStep, disabledHours, disabledMinutes, is24Hours, selected.selectedDateRange.startDate)) === null || _a === void 0 ? void 0 : _a.outerHTML, (_b = exports.DefaultTemplates.timeSelectorDisplay(state, endDateTime, hourStep, minuteStep, secondStep, disabledHours, disabledMinutes, is24Hours, selected.selectedDateRange.endDate)) === null || _b === void 0 ? void 0 : _b.outerHTML);
    },
};
/**
 * Creates HTML elements from a template string.
 *
 * @param {TemplateStringsArray} strings - The template string array.
 * @param {any[]} values - The values to interpolate into the template string.
 * @return {HTMLElement} The created HTML element.
 */
function _html(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var template = document.createElement('template');
    template.innerHTML = strings.reduce(function (acc, str, i) { return acc + (values[i - 1] || '') + str; });
    return template.content.firstElementChild;
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;


/***/ }),

/***/ "./src/components/datepicker/types.ts":
/*!********************************************!*\
  !*** ./src/components/datepicker/types.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActiveInput = exports.DatePickerSegment = void 0;
var DatePickerSegment;
(function (DatePickerSegment) {
    DatePickerSegment["Day"] = "day";
    DatePickerSegment["Month"] = "month";
    DatePickerSegment["Year"] = "year";
    DatePickerSegment["Hours"] = "hours";
    DatePickerSegment["Minutes"] = "minutes";
    DatePickerSegment["Seconds"] = "seconds";
    DatePickerSegment["AmPm"] = "amPm";
    DatePickerSegment["GmtOffset"] = "gmtOffset";
    DatePickerSegment["EndDay"] = "endDay";
    DatePickerSegment["EndMonth"] = "endMonth";
    DatePickerSegment["EndYear"] = "endYear";
    DatePickerSegment["EndHours"] = "endHours";
    DatePickerSegment["EndMinutes"] = "endMinutes";
    DatePickerSegment["EndSeconds"] = "endSeconds";
    DatePickerSegment["EndAmPm"] = "endAmPm";
})(DatePickerSegment || (exports.DatePickerSegment = DatePickerSegment = {}));
var ActiveInput;
(function (ActiveInput) {
    ActiveInput["Start"] = "start";
    ActiveInput["End"] = "end";
})(ActiveInput || (exports.ActiveInput = ActiveInput = {}));
;


/***/ }),

/***/ "./src/components/dismiss/dismiss.ts":
/*!*******************************************!*\
  !*** ./src/components/dismiss/dismiss.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDismiss = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTDismiss = /** @class */ (function (_super) {
    __extends(KTDismiss, _super);
    function KTDismiss(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'dismiss';
        _this._defaultConfig = {
            hiddenClass: 'hidden',
            mode: 'remove',
            interrupt: true,
            target: '',
        };
        _this._config = _this._defaultConfig;
        _this._isAnimating = false;
        _this._targetElement = null;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._config['mode'] = _this._config['mode'];
        if (!_this._element)
            return _this;
        _this._targetElement = _this._getTargetElement();
        if (!_this._targetElement) {
            return _this;
        }
        _this._handlers();
        return _this;
    }
    KTDismiss.prototype._getTargetElement = function () {
        return (dom_1.default.getElement(this._element.getAttribute('data-kt-dismiss')) || dom_1.default.getElement(this._getOption('target')));
    };
    KTDismiss.prototype._handlers = function () {
        var _this = this;
        if (!this._element)
            return;
        this._element.addEventListener('click', function (event) {
            event.preventDefault();
            if (_this._getOption('interrupt') === true) {
                event.stopPropagation();
            }
            _this._dismiss();
        });
    };
    KTDismiss.prototype._dismiss = function () {
        var _this = this;
        if (this._isAnimating) {
            return;
        }
        var payload = { cancel: false };
        this._fireEvent('dismiss', payload);
        this._dispatchEvent('dismiss', payload);
        if (payload.cancel === true) {
            return;
        }
        if (!this._targetElement)
            return;
        this._targetElement.style.opacity = '0';
        dom_1.default.reflow(this._targetElement);
        this._isAnimating = true;
        dom_1.default.transitionEnd(this._targetElement, function () {
            if (!_this._targetElement)
                return;
            _this._isAnimating = false;
            _this._targetElement.style.opacity = '';
            if (_this._getOption('mode').toString().toLowerCase() === 'hide') {
                _this._targetElement.classList.add(_this._getOption('hiddenClass'));
            }
            else {
                dom_1.default.remove(_this._targetElement);
            }
            _this._fireEvent('dismissed');
            _this._dispatchEvent('dismissed');
        });
    };
    KTDismiss.prototype.getTargetElement = function () {
        return this._targetElement;
    };
    KTDismiss.prototype.dismiss = function () {
        this._dismiss();
    };
    KTDismiss.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'dismiss')) {
            return data_1.default.get(element, 'dismiss');
        }
        if (element.getAttribute('data-kt-dismiss')) {
            return new KTDismiss(element);
        }
        return null;
    };
    KTDismiss.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTDismiss(element, config);
    };
    KTDismiss.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-dismiss]');
        elements.forEach(function (element) {
            new KTDismiss(element);
        });
    };
    KTDismiss.init = function () {
        KTDismiss.createInstances();
    };
    return KTDismiss;
}(component_1.default));
exports.KTDismiss = KTDismiss;
if (typeof window !== 'undefined') {
    window.KTDismiss = KTDismiss;
}


/***/ }),

/***/ "./src/components/dismiss/index.ts":
/*!*****************************************!*\
  !*** ./src/components/dismiss/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDismiss = void 0;
var dismiss_1 = __webpack_require__(/*! ./dismiss */ "./src/components/dismiss/dismiss.ts");
Object.defineProperty(exports, "KTDismiss", ({ enumerable: true, get: function () { return dismiss_1.KTDismiss; } }));


/***/ }),

/***/ "./src/components/drawer/drawer.ts":
/*!*****************************************!*\
  !*** ./src/components/drawer/drawer.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDrawer = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var utils_1 = __webpack_require__(/*! ../../helpers/utils */ "./src/helpers/utils.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/helpers/event-handler.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTDrawer = /** @class */ (function (_super) {
    __extends(KTDrawer, _super);
    function KTDrawer(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'drawer';
        _this._defaultConfig = {
            zindex: '100',
            enable: true,
            class: '',
            shownClass: 'flex',
            hiddenClass: 'hidden',
            backdrop: true,
            backdropClass: 'transition-all duration-300 fixed inset-0 bg-black/10',
            backdropStatic: false,
            keyboard: true,
            disableScroll: true,
            persistent: false,
            focus: true,
        };
        _this._config = _this._defaultConfig;
        _this._isOpen = false;
        _this._isTransitioning = false;
        _this._backdropElement = null;
        _this._relatedTarget = null;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._handleClose();
        _this._update();
        return _this;
    }
    KTDrawer.prototype._handleClose = function () {
        var _this = this;
        if (!this._element)
            return;
        event_handler_1.default.on(this._element, '[data-kt-drawer-hide]', 'click', function () {
            _this._hide();
        });
    };
    KTDrawer.prototype._toggle = function (relatedTarget) {
        var payload = { cancel: false };
        this._fireEvent('toggle', payload);
        this._dispatchEvent('toggle', payload);
        if (payload.cancel === true) {
            return;
        }
        if (this._isOpen === true) {
            this._hide();
        }
        else {
            this._show(relatedTarget);
        }
    };
    KTDrawer.prototype._show = function (relatedTarget) {
        var _this = this;
        if (this._isOpen || this._isTransitioning) {
            return;
        }
        var payload = { cancel: false };
        this._fireEvent('show', payload);
        this._dispatchEvent('show', payload);
        if (payload.cancel === true) {
            return;
        }
        KTDrawer.hide();
        if (this._getOption('backdrop') === true)
            this._createBackdrop();
        if (relatedTarget)
            this._relatedTarget = relatedTarget;
        if (!this._element)
            return;
        this._isTransitioning = true;
        this._element.classList.remove(this._getOption('hiddenClass'));
        this._element.classList.add(this._getOption('shownClass'));
        this._element.setAttribute('role', 'dialog');
        this._element.setAttribute('aria-modal', 'true');
        this._element.setAttribute('tabindex', '-1');
        var zindex = parseInt(this._getOption('zindex'));
        if (zindex > 0) {
            this._element.style.zIndex = "".concat(zindex);
        }
        if (this._getOption('disableScroll')) {
            document.body.style.overflow = 'hidden';
        }
        dom_1.default.reflow(this._element);
        this._element.classList.add('open');
        dom_1.default.transitionEnd(this._element, function () {
            _this._isTransitioning = false;
            _this._isOpen = true;
            if (_this._getOption('focus') === true) {
                _this._autoFocus();
            }
            _this._fireEvent('shown');
            _this._dispatchEvent('shown');
        });
    };
    KTDrawer.prototype._hide = function () {
        var _this = this;
        if (!this._element)
            return;
        if (this._isOpen === false || this._isTransitioning) {
            return;
        }
        var payload = { cancel: false };
        this._fireEvent('hide', payload);
        this._dispatchEvent('hide', payload);
        if (payload.cancel === true) {
            return;
        }
        this._isTransitioning = true;
        this._element.removeAttribute('role');
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('tabindex');
        if (this._getOption('disableScroll')) {
            document.body.style.overflow = '';
        }
        dom_1.default.reflow(this._element);
        this._element.classList.remove('open');
        if (this._getOption('backdrop') === true) {
            this._deleteBackdrop();
        }
        dom_1.default.transitionEnd(this._element, function () {
            if (!_this._element)
                return;
            _this._isTransitioning = false;
            _this._isOpen = false;
            _this._element.classList.add(_this._getOption('hiddenClass'));
            _this._element.classList.remove(_this._getOption('shownClass'));
            _this._element.style.zIndex = '';
            _this._fireEvent('hidden');
            _this._dispatchEvent('hidden');
        });
    };
    KTDrawer.prototype._update = function () {
        var _a;
        if (((_a = this._getOption('class')) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            if (this.isEnabled()) {
                dom_1.default.addClass(this._element, this._getOption('class'));
            }
            else {
                dom_1.default.removeClass(this._element, this._getOption('class'));
            }
        }
    };
    KTDrawer.prototype._autoFocus = function () {
        if (!this._element)
            return;
        var input = this._element.querySelector('[data-kt-drawer-focus]');
        if (!input)
            return;
        else
            input.focus();
    };
    KTDrawer.prototype._createBackdrop = function () {
        var _this = this;
        if (!this._element)
            return;
        var zindex = parseInt(this._getOption('zindex'));
        this._backdropElement = document.createElement('DIV');
        this._backdropElement.style.zIndex = (zindex - 1).toString();
        document.body.append(this._backdropElement);
        dom_1.default.reflow(this._backdropElement);
        dom_1.default.addClass(this._backdropElement, this._getOption('backdropClass'));
        this._backdropElement.addEventListener('click', function (event) {
            event.preventDefault();
            if (_this._getOption('backdropStatic') === false) {
                _this._hide();
            }
        });
    };
    KTDrawer.prototype._deleteBackdrop = function () {
        var _this = this;
        if (!this._backdropElement)
            return;
        dom_1.default.reflow(this._backdropElement);
        this._backdropElement.style.opacity = '0';
        dom_1.default.transitionEnd(this._backdropElement, function () {
            if (!_this._backdropElement)
                return;
            dom_1.default.remove(_this._backdropElement);
        });
    };
    KTDrawer.prototype._isEnabled = function () {
        return utils_1.default.stringToBoolean(this._getOption('enable'));
    };
    KTDrawer.prototype.toggle = function () {
        return this._toggle();
    };
    KTDrawer.prototype.show = function (relatedTarget) {
        return this._show(relatedTarget);
    };
    KTDrawer.prototype.hide = function () {
        return this._hide();
    };
    KTDrawer.prototype.update = function () {
        return this._update();
    };
    KTDrawer.prototype.getRelatedTarget = function () {
        return this._relatedTarget;
    };
    KTDrawer.prototype.isOpen = function () {
        return this._isOpen;
    };
    KTDrawer.prototype.isEnabled = function () {
        return this._isEnabled();
    };
    KTDrawer.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'drawer')) {
            return data_1.default.get(element, 'drawer');
        }
        if (element.getAttribute('data-kt-drawer-initialized') === 'true') {
            return new KTDrawer(element);
        }
        return null;
    };
    KTDrawer.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTDrawer(element, config);
    };
    KTDrawer.hide = function () {
        var elements = document.querySelectorAll('[data-kt-drawer-initialized]');
        elements.forEach(function (element) {
            var drawer = KTDrawer.getInstance(element);
            if (drawer && drawer.isOpen()) {
                drawer.hide();
            }
        });
    };
    KTDrawer.handleResize = function () {
        window.addEventListener('resize', function () {
            var timer;
            utils_1.default.throttle(timer, function () {
                document
                    .querySelectorAll('[data-kt-drawer-initialized]')
                    .forEach(function (element) {
                    var drawer = KTDrawer.getInstance(element);
                    drawer.update();
                    if (drawer && drawer.isOpen() && !drawer.isEnabled()) {
                        drawer.hide();
                    }
                });
            }, 200);
        });
    };
    KTDrawer.handleToggle = function () {
        event_handler_1.default.on(document.body, '[data-kt-drawer-toggle]', 'click', function (event, target) {
            event.stopPropagation();
            var selector = target.getAttribute('data-kt-drawer-toggle');
            if (!selector)
                return;
            var drawerEl = document.querySelector(selector);
            var drawer = KTDrawer.getInstance(drawerEl);
            if (drawer) {
                drawer.toggle();
            }
        });
    };
    KTDrawer.handleDismiss = function () {
        event_handler_1.default.on(document.body, '[data-kt-drawer-dismiss]', 'click', function (event, target) {
            event.stopPropagation();
            var modalElement = target.closest('[data-kt-drawer="true"]');
            if (modalElement) {
                var modal = KTDrawer.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }
        });
    };
    KTDrawer.handleClickAway = function () {
        document.addEventListener('click', function (event) {
            var drawerEl = document.querySelector('.open[data-kt-drawer-initialized]');
            if (!drawerEl)
                return;
            var drawer = KTDrawer.getInstance(drawerEl);
            if (!drawer)
                return;
            if (drawer.getOption('persistent'))
                return;
            if (drawer.getOption('backdrop'))
                return;
            if (drawerEl !== event.target &&
                drawer.getRelatedTarget() !== event.target &&
                drawerEl.contains(event.target) === false) {
                drawer.hide();
            }
        });
    };
    KTDrawer.handleKeyword = function () {
        document.addEventListener('keydown', function (event) {
            var drawerEl = document.querySelector('.open[data-kt-drawer-initialized]');
            var drawer = KTDrawer.getInstance(drawerEl);
            if (!drawer) {
                return;
            }
            // if esc key was not pressed in combination with ctrl or alt or shift
            if (event.key === 'Escape' &&
                !(event.ctrlKey || event.altKey || event.shiftKey)) {
                drawer.hide();
            }
            if (event.code === 'Tab' && !event.metaKey) {
                return;
            }
        });
    };
    KTDrawer.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-drawer]');
        elements.forEach(function (element) {
            new KTDrawer(element);
        });
    };
    KTDrawer.init = function () {
        KTDrawer.createInstances();
        if (window.KT_DRAWER_INITIALIZED !== true) {
            KTDrawer.handleToggle();
            KTDrawer.handleDismiss();
            KTDrawer.handleResize();
            KTDrawer.handleClickAway();
            KTDrawer.handleKeyword();
            window.KT_DRAWER_INITIALIZED = true;
        }
    };
    return KTDrawer;
}(component_1.default));
exports.KTDrawer = KTDrawer;
if (typeof window !== 'undefined') {
    window.KTDrawer = KTDrawer;
}


/***/ }),

/***/ "./src/components/drawer/index.ts":
/*!****************************************!*\
  !*** ./src/components/drawer/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDrawer = void 0;
var drawer_1 = __webpack_require__(/*! ./drawer */ "./src/components/drawer/drawer.ts");
Object.defineProperty(exports, "KTDrawer", ({ enumerable: true, get: function () { return drawer_1.KTDrawer; } }));


/***/ }),

/***/ "./src/components/dropdown/dropdown.ts":
/*!*********************************************!*\
  !*** ./src/components/dropdown/dropdown.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDropdown = void 0;
var core_1 = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/helpers/event-handler.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var menu_1 = __webpack_require__(/*! ../menu */ "./src/components/menu/index.ts");
var KTDropdown = /** @class */ (function (_super) {
    __extends(KTDropdown, _super);
    function KTDropdown(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'dropdown';
        _this._defaultConfig = {
            zindex: 105,
            hoverTimeout: 200,
            placement: 'bottom-start',
            placementRtl: 'bottom-end',
            permanent: false,
            dismiss: false,
            keyboard: true,
            trigger: 'click',
            attach: '',
            offset: '0px, 5px',
            offsetRtl: '0px, 5px',
            hiddenClass: 'hidden',
        };
        _this._config = _this._defaultConfig;
        _this._disabled = false;
        _this._isTransitioning = false;
        _this._isOpen = false;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._toggleElement = _this._element.querySelector('[data-kt-dropdown-toggle]');
        if (!_this._toggleElement)
            return _this;
        _this._menuElement = _this._element.querySelector('[data-kt-dropdown-menu]');
        if (!_this._menuElement)
            return _this;
        data_1.default.set(_this._menuElement, 'dropdownElement', _this._element);
        _this._setupNestedDropdowns();
        return _this;
    }
    KTDropdown.prototype._setupNestedDropdowns = function () {
        var subDropdowns = this._menuElement.querySelectorAll('[data-kt-dropdown-toggle]');
        subDropdowns.forEach(function (subToggle) {
            var _a;
            var subItem = subToggle.closest('[data-kt-dropdown-item]');
            var subMenu = (_a = subToggle
                .closest('.kt-menu-item')) === null || _a === void 0 ? void 0 : _a.querySelector('[data-kt-dropdown-menu]');
            if (subItem && subMenu) {
                new KTDropdown(subItem);
            }
        });
    };
    KTDropdown.prototype._click = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._disabled)
            return;
        if (this._getOption('trigger') !== 'click')
            return;
        this._toggle();
    };
    KTDropdown.prototype._mouseover = function (event) {
        if (this._disabled)
            return;
        if (this._getOption('trigger') !== 'hover')
            return;
        if (data_1.default.get(this._element, 'hover') === '1') {
            clearTimeout(data_1.default.get(this._element, 'timeout'));
            data_1.default.remove(this._element, 'hover');
            data_1.default.remove(this._element, 'timeout');
        }
        this._show();
    };
    KTDropdown.prototype._mouseout = function (event) {
        var _this = this;
        if (this._disabled)
            return;
        if (this._getOption('trigger') !== 'hover')
            return;
        var relatedTarget = event.relatedTarget;
        var isWithinDropdown = this._element.contains(relatedTarget);
        if (isWithinDropdown)
            return;
        var timeout = setTimeout(function () {
            if (data_1.default.get(_this._element, 'hover') === '1') {
                _this._hide();
            }
        }, parseInt(this._getOption('hoverTimeout')));
        data_1.default.set(this._element, 'hover', '1');
        data_1.default.set(this._element, 'timeout', timeout);
    };
    KTDropdown.prototype._toggle = function () {
        if (this._isOpen) {
            this._hide();
        }
        else {
            this._show();
        }
    };
    KTDropdown.prototype._show = function () {
        var _this = this;
        if (this._isOpen || this._isTransitioning)
            return;
        var payload = { cancel: false };
        this._fireEvent('show', payload);
        this._dispatchEvent('show', payload);
        if (payload.cancel)
            return;
        KTDropdown.hide(this._element);
        menu_1.KTMenu.hide(this._element);
        var zIndex = parseInt(this._getOption('zindex'));
        var parentZindex = dom_1.default.getHighestZindex(this._element);
        if (parentZindex !== null && parentZindex >= zIndex) {
            zIndex = parentZindex + 1;
        }
        if (zIndex > 0) {
            this._menuElement.style.zIndex = zIndex.toString();
        }
        this._menuElement.style.display = 'block';
        this._menuElement.style.opacity = '0';
        dom_1.default.reflow(this._menuElement);
        this._menuElement.style.opacity = '1';
        this._menuElement.classList.remove(this._getOption('hiddenClass'));
        this._toggleElement.classList.add('active');
        this._menuElement.classList.add('open');
        this._element.classList.add('open');
        this._initPopper();
        dom_1.default.transitionEnd(this._menuElement, function () {
            _this._isTransitioning = false;
            _this._isOpen = true;
            _this._fireEvent('shown');
            _this._dispatchEvent('shown');
        });
    };
    KTDropdown.prototype._hide = function () {
        var _this = this;
        if (!this._isOpen || this._isTransitioning)
            return;
        var payload = { cancel: false };
        this._fireEvent('hide', payload);
        this._dispatchEvent('hide', payload);
        if (payload.cancel)
            return;
        this._menuElement.style.opacity = '1';
        dom_1.default.reflow(this._menuElement);
        this._menuElement.style.opacity = '0';
        this._menuElement.classList.remove('open');
        this._toggleElement.classList.remove('active');
        this._element.classList.remove('open');
        dom_1.default.transitionEnd(this._menuElement, function () {
            _this._isTransitioning = false;
            _this._isOpen = false;
            _this._menuElement.classList.add(_this._getOption('hiddenClass'));
            _this._menuElement.style.display = '';
            _this._menuElement.style.zIndex = '';
            _this._destroyPopper();
            _this._fireEvent('hidden');
            _this._dispatchEvent('hidden');
        });
    };
    KTDropdown.prototype._initPopper = function () {
        var isRtl = dom_1.default.isRTL();
        var reference;
        var attach = this._getOption('attach');
        if (attach) {
            reference =
                attach === 'parent'
                    ? this._toggleElement.parentNode
                    : document.querySelector(attach);
        }
        else {
            reference = this._toggleElement;
        }
        if (reference) {
            var popper = (0, core_1.createPopper)(reference, this._menuElement, this._getPopperConfig());
            data_1.default.set(this._element, 'popper', popper);
        }
    };
    KTDropdown.prototype._destroyPopper = function () {
        if (data_1.default.has(this._element, 'popper')) {
            data_1.default.get(this._element, 'popper').destroy();
            data_1.default.remove(this._element, 'popper');
        }
    };
    KTDropdown.prototype._isDropdownOpen = function () {
        return (this._element.classList.contains('open') &&
            this._menuElement.classList.contains('open'));
    };
    KTDropdown.prototype._getPopperConfig = function () {
        var isRtl = dom_1.default.isRTL();
        var placement = this._getOption('placement');
        if (isRtl && this._getOption('placementRtl')) {
            placement = this._getOption('placementRtl');
        }
        var offsetValue = this._getOption('offset');
        if (isRtl && this._getOption('offsetRtl')) {
            offsetValue = this._getOption('offsetRtl');
        }
        var offset = offsetValue
            ? offsetValue
                .toString()
                .split(',')
                .map(function (value) { return parseInt(value.trim(), 10); })
            : [0, 0];
        var strategy = this._getOption('overflow') === true ? 'absolute' : 'fixed';
        var altAxis = this._getOption('flip') !== false;
        return {
            placement: placement,
            strategy: strategy,
            modifiers: [
                {
                    name: 'offset',
                    options: { offset: offset },
                },
                {
                    name: 'preventOverflow',
                    options: { altAxis: altAxis },
                },
                {
                    name: 'flip',
                    options: { flipVariations: false },
                },
            ],
        };
    };
    KTDropdown.prototype._getToggleElement = function () {
        return this._toggleElement;
    };
    KTDropdown.prototype._getContentElement = function () {
        return this._menuElement;
    };
    // General Methods
    KTDropdown.prototype.click = function (event) {
        this._click(event);
    };
    KTDropdown.prototype.mouseover = function (event) {
        this._mouseover(event);
    };
    KTDropdown.prototype.mouseout = function (event) {
        this._mouseout(event);
    };
    KTDropdown.prototype.show = function () {
        this._show();
    };
    KTDropdown.prototype.hide = function () {
        this._hide();
    };
    KTDropdown.prototype.toggle = function () {
        this._toggle();
    };
    KTDropdown.prototype.getToggleElement = function () {
        return this._toggleElement;
    };
    KTDropdown.prototype.getContentElement = function () {
        return this._menuElement;
    };
    KTDropdown.prototype.isPermanent = function () {
        return this._getOption('permanent');
    };
    KTDropdown.prototype.disable = function () {
        this._disabled = true;
    };
    KTDropdown.prototype.enable = function () {
        this._disabled = false;
    };
    KTDropdown.prototype.isOpen = function () {
        return this._isDropdownOpen();
    };
    // Static Methods
    KTDropdown.getElement = function (reference) {
        if (reference.hasAttribute('data-kt-dropdown-initialized'))
            return reference;
        var findElement = reference.closest('[data-kt-dropdown-initialized]');
        if (findElement)
            return findElement;
        if (reference.hasAttribute('data-kt-dropdown-menu') &&
            data_1.default.has(reference, 'dropdownElement')) {
            return data_1.default.get(reference, 'dropdownElement');
        }
        return null;
    };
    KTDropdown.getInstance = function (element) {
        element = this.getElement(element);
        if (!element)
            return null;
        if (data_1.default.has(element, 'dropdown')) {
            return data_1.default.get(element, 'dropdown');
        }
        if (element.getAttribute('data-kt-dropdown-initialized') === 'true') {
            return new KTDropdown(element);
        }
        return null;
    };
    KTDropdown.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTDropdown(element, config);
    };
    KTDropdown.update = function () {
        document
            .querySelectorAll('.open[data-kt-dropdown-initialized]')
            .forEach(function (item) {
            if (data_1.default.has(item, 'popper')) {
                data_1.default.get(item, 'popper').forceUpdate();
            }
        });
    };
    KTDropdown.hide = function (skipElement) {
        document
            .querySelectorAll('.open[data-kt-dropdown-initialized]:not([data-kt-dropdown-permanent="true"])')
            .forEach(function (item) {
            if (skipElement && (skipElement === item || item.contains(skipElement)))
                return;
            var dropdown = KTDropdown.getInstance(item);
            if (dropdown)
                dropdown.hide();
        });
    };
    KTDropdown.handleClickAway = function () {
        document.addEventListener('click', function (event) {
            document
                .querySelectorAll('.open[data-kt-dropdown-initialized]:not([data-kt-dropdown-permanent="true"])')
                .forEach(function (element) {
                var dropdown = KTDropdown.getInstance(element);
                if (!dropdown)
                    return;
                var contentElement = dropdown.getContentElement();
                var toggleElement = dropdown.getToggleElement();
                if (toggleElement === event.target ||
                    toggleElement.contains(event.target) ||
                    contentElement === event.target ||
                    contentElement.contains(event.target)) {
                    return;
                }
                dropdown.hide();
            });
        });
    };
    KTDropdown.handleKeyboard = function () {
        document.addEventListener('keydown', function (event) {
            var dropdownEl = document.querySelector('.open[data-kt-dropdown-initialized]');
            var dropdown = KTDropdown.getInstance(dropdownEl);
            if (!dropdown || !dropdown._getOption('keyboard'))
                return;
            if (event.key === 'Escape' &&
                !(event.ctrlKey || event.altKey || event.shiftKey)) {
                dropdown.hide();
            }
        });
    };
    KTDropdown.handleMouseover = function () {
        event_handler_1.default.on(document.body, '[data-kt-dropdown-toggle], [data-kt-dropdown-menu]', 'mouseover', function (event, target) {
            var dropdown = KTDropdown.getInstance(target);
            if (dropdown && dropdown._getOption('trigger') === 'hover') {
                dropdown.mouseover(event);
            }
        });
    };
    KTDropdown.handleMouseout = function () {
        event_handler_1.default.on(document.body, '[data-kt-dropdown-toggle], [data-kt-dropdown-menu]', 'mouseout', function (event, target) {
            var dropdown = KTDropdown.getInstance(target);
            if (dropdown && dropdown._getOption('trigger') === 'hover') {
                dropdown.mouseout(event);
            }
        });
    };
    KTDropdown.handleClick = function () {
        event_handler_1.default.on(document.body, '[data-kt-dropdown-toggle]', 'click', function (event, target) {
            var dropdown = KTDropdown.getInstance(target);
            if (dropdown) {
                dropdown.click(event);
            }
        });
    };
    KTDropdown.handleDismiss = function () {
        event_handler_1.default.on(document.body, '[data-kt-dropdown-dismiss]', 'click', function (event, target) {
            var dropdown = KTDropdown.getInstance(target);
            if (dropdown) {
                dropdown.hide();
            }
        });
    };
    KTDropdown.initHandlers = function () {
        this.handleClickAway();
        this.handleKeyboard();
        this.handleMouseover();
        this.handleMouseout();
        this.handleClick();
        this.handleDismiss();
    };
    KTDropdown.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-dropdown]');
        elements.forEach(function (element) {
            new KTDropdown(element);
        });
    };
    KTDropdown.init = function () {
        KTDropdown.createInstances();
        if (window.KT_DROPDOWN_INITIALIZED !== true) {
            KTDropdown.initHandlers();
            window.KT_DROPDOWN_INITIALIZED = true;
        }
    };
    return KTDropdown;
}(component_1.default));
exports.KTDropdown = KTDropdown;
if (typeof window !== 'undefined') {
    window.KTDropdown = KTDropdown;
}


/***/ }),

/***/ "./src/components/dropdown/index.ts":
/*!******************************************!*\
  !*** ./src/components/dropdown/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTDropdown = void 0;
var dropdown_1 = __webpack_require__(/*! ./dropdown */ "./src/components/dropdown/dropdown.ts");
Object.defineProperty(exports, "KTDropdown", ({ enumerable: true, get: function () { return dropdown_1.KTDropdown; } }));


/***/ }),

/***/ "./src/components/image-input/image-input.ts":
/*!***************************************************!*\
  !*** ./src/components/image-input/image-input.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTImageInput = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/helpers/event-handler.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTImageInput = /** @class */ (function (_super) {
    __extends(KTImageInput, _super);
    function KTImageInput(element, config) {
        if (config === void 0) { config = null; }
        var _this = _super.call(this) || this;
        _this._name = 'image-input';
        _this._defaultConfig = {
            hiddenClass: 'hidden',
        };
        _this._previewUrl = '';
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._inputElement = _this._element.querySelector('input[type="file"]');
        _this._hiddenElement = _this._element.querySelector('input[type="hidden"]');
        _this._removeElement = _this._element.querySelector('[data-kt-image-input-remove]');
        _this._previewElement = _this._element.querySelector('[data-kt-image-input-preview]');
        _this._update();
        _this._handlers();
        return _this;
    }
    KTImageInput.prototype._handlers = function () {
        var _this = this;
        event_handler_1.default.on(this._element, '[data-kt-image-input-placeholder]', 'click', function (event) {
            event.preventDefault();
            _this._inputElement.click();
        });
        this._inputElement.addEventListener('change', function () {
            _this._change();
        });
        this._removeElement.addEventListener('click', function () {
            _this._remove();
        });
    };
    KTImageInput.prototype._change = function () {
        var _this = this;
        var payload = { cancel: false };
        this._fireEvent('change', payload);
        this._dispatchEvent('change', payload);
        if (payload.cancel === true) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function () {
            _this._previewElement.style.backgroundImage = "url(".concat(reader.result, ")");
        };
        reader.readAsDataURL(this._inputElement.files[0]);
        this._inputElement.value = '';
        this._hiddenElement.value = '';
        this._lastMode = 'new';
        this._element.classList.add('changed');
        this._removeElement.classList.remove('hidden');
        this._element.classList.remove('empty');
        this._fireEvent('changed');
        this._dispatchEvent('changed');
    };
    KTImageInput.prototype._remove = function () {
        var payload = { cancel: false };
        this._fireEvent('remove', payload);
        this._dispatchEvent('remove', payload);
        if (payload.cancel === true) {
            return;
        }
        this._element.classList.remove('empty');
        this._element.classList.remove('changed');
        if (this._lastMode == 'new') {
            if (this._previewUrl == '')
                this._removeElement.classList.add(this._getOption('hiddenClass'));
            if (this._previewUrl) {
                this._previewElement.style.backgroundImage = "url(".concat(this._previewUrl, ")");
            }
            else {
                this._previewElement.style.backgroundImage = 'none';
                this._element.classList.add('empty');
            }
            this._inputElement.value = '';
            this._hiddenElement.value = '';
            this._lastMode = 'saved';
        }
        else if (this._lastMode == 'saved') {
            if (this._previewUrl == '')
                this._removeElement.classList.add(this._getOption('hiddenClass'));
            this._previewElement.style.backgroundImage = 'none';
            this._element.classList.add('empty');
            this._hiddenElement.value = '1';
            this._inputElement.value = '';
            this._lastMode = 'placeholder';
        }
        else if (this._lastMode == 'placeholder') {
            if (this._previewUrl == '')
                this._removeElement.classList.add(this._getOption('hiddenClass'));
            if (this._previewUrl) {
                this._previewElement.style.backgroundImage = "url(".concat(this._previewUrl, ")");
            }
            else {
                this._element.classList.add('empty');
            }
            this._inputElement.value = '';
            this._hiddenElement.value = '';
            this._lastMode = 'saved';
        }
        this._fireEvent('remove');
        this._dispatchEvent('remove');
    };
    KTImageInput.prototype._update = function () {
        if (this._previewElement.style.backgroundImage) {
            this._setPreviewUrl(this._previewElement.style.backgroundImage);
            this._removeElement.classList.remove(this._getOption('hiddenClass'));
            this._lastMode = 'saved';
        }
        else {
            this._removeElement.classList.add(this._getOption('hiddenClass'));
            this._element.classList.add('empty');
            this._lastMode = 'placeholder';
        }
    };
    KTImageInput.prototype._getPreviewUrl = function () {
        return this._previewUrl;
    };
    KTImageInput.prototype._setPreviewUrl = function (url) {
        this._previewUrl = url.replace(/(url\(|\)|")/g, '');
    };
    KTImageInput.prototype.isEmpty = function () {
        return this._inputElement.value.length === 0;
    };
    KTImageInput.prototype.isChanged = function () {
        return this._inputElement.value.length > 0;
    };
    KTImageInput.prototype.remove = function () {
        this._remove();
    };
    KTImageInput.prototype.update = function () {
        this._update();
    };
    KTImageInput.prototype.setPreviewUrl = function (url) {
        this._setPreviewUrl(url);
    };
    KTImageInput.prototype.getPreviewUrl = function () {
        return this._getPreviewUrl();
    };
    KTImageInput.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'image-input')) {
            return data_1.default.get(element, 'image-input');
        }
        if (element.getAttribute('data-kt-image-input')) {
            return new KTImageInput(element);
        }
        return null;
    };
    KTImageInput.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTImageInput(element, config);
    };
    KTImageInput.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-image-input]');
        elements.forEach(function (element) {
            new KTImageInput(element);
        });
    };
    KTImageInput.init = function () {
        KTImageInput.createInstances();
    };
    return KTImageInput;
}(component_1.default));
exports.KTImageInput = KTImageInput;
if (typeof window !== 'undefined') {
    window.KTImageInput = KTImageInput;
}


/***/ }),

/***/ "./src/components/image-input/index.ts":
/*!*********************************************!*\
  !*** ./src/components/image-input/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTImageInput = void 0;
var image_input_1 = __webpack_require__(/*! ./image-input */ "./src/components/image-input/image-input.ts");
Object.defineProperty(exports, "KTImageInput", ({ enumerable: true, get: function () { return image_input_1.KTImageInput; } }));


/***/ }),

/***/ "./src/components/menu/index.ts":
/*!**************************************!*\
  !*** ./src/components/menu/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTMenu = void 0;
var menu_1 = __webpack_require__(/*! ./menu */ "./src/components/menu/menu.ts");
Object.defineProperty(exports, "KTMenu", ({ enumerable: true, get: function () { return menu_1.KTMenu; } }));


/***/ }),

/***/ "./src/components/menu/menu.ts":
/*!*************************************!*\
  !*** ./src/components/menu/menu.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTMenu = void 0;
var core_1 = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var utils_1 = __webpack_require__(/*! ../../helpers/utils */ "./src/helpers/utils.ts");
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/helpers/event-handler.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var dropdown_1 = __webpack_require__(/*! ../dropdown */ "./src/components/dropdown/index.ts");
var KTMenu = /** @class */ (function (_super) {
    __extends(KTMenu, _super);
    function KTMenu(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'menu';
        _this._defaultConfig = {
            dropdownZindex: '105',
            dropdownHoverTimeout: 200,
            dropdownPlacement: 'bottom',
            dropdownOffset: '0, 5px',
            accordionExpandAll: false,
        };
        _this._config = _this._defaultConfig;
        _this._disabled = false;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._update();
        return _this;
    }
    KTMenu.prototype._click = function (element, event) {
        if (element.hasAttribute('href') && element.getAttribute('href') !== '#') {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (this._disabled === true) {
            return;
        }
        var itemElement = this._getItemElement(element);
        if (!itemElement)
            return;
        if (this._getItemOption(itemElement, 'trigger') !== 'click') {
            return;
        }
        if (this._getItemOption(itemElement, 'toggle') === false) {
            this._show(itemElement);
        }
        else {
            this._toggle(itemElement);
        }
    };
    KTMenu.prototype._link = function (element, event) {
        if (this._disabled === true) {
            return;
        }
        var payload = {
            cancel: false,
            element: element,
            event: event,
        };
        this._fireEvent('link.click', payload);
        this._dispatchEvent('link.click', payload);
        if (payload.cancel === true) {
            return;
        }
        var itemElement = this._getItemElement(element);
        if (this._isItemDropdownPermanent(itemElement) === false) {
            KTMenu.hide();
        }
        payload = {
            element: element,
            event: event,
        };
        this._fireEvent('link.clicked', payload);
        this._dispatchEvent('link.clicked', payload);
    };
    KTMenu.prototype._dismiss = function (element) {
        var _this = this;
        var itemElement = this._getItemElement(element);
        if (!itemElement)
            return;
        var itemElements = this._getItemChildElements(itemElement);
        if (itemElement !== null &&
            this._getItemToggleMode(itemElement) === 'dropdown') {
            // hide items dropdown
            this._hide(itemElement);
            // Hide all child elements as well
            itemElements.forEach(function (each) {
                if (_this._getItemToggleMode(each) === 'dropdown') {
                    _this._hide(each);
                }
            });
        }
    };
    KTMenu.prototype._mouseover = function (element) {
        var itemElement = this._getItemElement(element);
        if (!itemElement)
            return;
        if (this._disabled === true) {
            return;
        }
        if (itemElement === null) {
            return;
        }
        if (this._getItemOption(itemElement, 'trigger') !== 'hover') {
            return;
        }
        if (data_1.default.get(itemElement, 'hover') === '1') {
            clearTimeout(data_1.default.get(itemElement, 'timeout'));
            data_1.default.remove(itemElement, 'hover');
            data_1.default.remove(itemElement, 'timeout');
        }
        this._show(itemElement);
    };
    KTMenu.prototype._mouseout = function (element) {
        var _this = this;
        var itemElement = this._getItemElement(element);
        if (!itemElement)
            return;
        if (this._disabled === true) {
            return;
        }
        if (this._getItemOption(itemElement, 'trigger') !== 'hover') {
            return;
        }
        var timeout = setTimeout(function () {
            if (data_1.default.get(itemElement, 'hover') === '1') {
                _this._hide(itemElement);
            }
        }, parseInt(this._getOption('dropdownHoverTimeout')));
        data_1.default.set(itemElement, 'hover', '1');
        data_1.default.set(itemElement, 'timeout', timeout);
    };
    KTMenu.prototype._toggle = function (itemElement) {
        if (this._isItemSubShown(itemElement) === true) {
            this._hide(itemElement);
        }
        else {
            this._show(itemElement);
        }
    };
    KTMenu.prototype._show = function (itemElement) {
        if (this._isItemSubShown(itemElement) === true) {
            return;
        }
        if (this._getItemToggleMode(itemElement) === 'dropdown') {
            this._showDropdown(itemElement);
        }
        else if (this._getItemToggleMode(itemElement) === 'accordion') {
            this._showAccordion(itemElement);
        }
        // Remember last submenu type
        data_1.default.set(itemElement, 'toggle', this._getItemToggleMode(itemElement));
    };
    KTMenu.prototype._hide = function (itemElement) {
        if (this._isItemSubShown(itemElement) === false) {
            return;
        }
        if (this._getItemToggleMode(itemElement) === 'dropdown') {
            this._hideDropdown(itemElement);
        }
        else if (this._getItemToggleMode(itemElement) === 'accordion') {
            this._hideAccordion(itemElement);
        }
    };
    KTMenu.prototype._reset = function (itemElement) {
        if (this._hasItemSub(itemElement) === false) {
            return;
        }
        var subElement = this._getItemSubElement(itemElement);
        // Reset sub state if sub type is changed during the window resize
        if (data_1.default.has(itemElement, 'toggle') &&
            data_1.default.get(itemElement, 'toggle') !== this._getItemToggleMode(itemElement)) {
            itemElement.classList.remove('show');
            subElement === null || subElement === void 0 ? void 0 : subElement.classList.remove('show');
        }
    };
    KTMenu.prototype._update = function () {
        var _this = this;
        if (!this._element)
            return;
        var itemElements = this._element.querySelectorAll('[data-kt-menu-item-trigger]');
        itemElements.forEach(function (itemElement) {
            _this._updateItemSubType(itemElement);
            _this._reset(itemElement);
        });
    };
    KTMenu.prototype._updateItemSubType = function (itemElement) {
        var subElement = this._getItemSubElement(itemElement);
        if (subElement) {
            if (this._getItemToggleMode(itemElement) === 'dropdown') {
                itemElement.classList.remove('kt-menu-item-accordion');
                itemElement.classList.add('kt-menu-item-dropdown');
                subElement.classList.remove('kt-menu-accordion');
                subElement.classList.add('kt-menu-dropdown');
            }
            else {
                itemElement.classList.remove('kt-menu-item-dropdown');
                itemElement.classList.add('kt-menu-item-accordion');
                subElement.classList.remove('kt-menu-dropdown');
                subElement.classList.add('kt-menu-accordion');
            }
        }
    };
    KTMenu.prototype._isItemSubShown = function (itemElement) {
        var subElement = this._getItemSubElement(itemElement);
        if (subElement !== null) {
            if (this._getItemToggleMode(itemElement) === 'dropdown') {
                if (subElement.classList.contains('show') === true &&
                    subElement.hasAttribute('data-popper-placement') === true) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return itemElement.classList.contains('show');
            }
        }
        else {
            return false;
        }
    };
    KTMenu.prototype._isItemDropdownPermanent = function (itemElement) {
        return this._getItemOption(itemElement, 'permanent');
    };
    KTMenu.prototype._isItemParentShown = function (itemElement) {
        var parents = dom_1.default.parents(itemElement, '.menu-item.show');
        return parents && parents.length > 0 ? true : false;
    };
    KTMenu.prototype._isItemSubElement = function (itemElement) {
        return (itemElement.classList.contains('kt-menu-dropdown') ||
            itemElement.classList.contains('kt-menu-accordion'));
    };
    KTMenu.prototype._hasItemSub = function (itemElement) {
        return (itemElement.classList.contains('kt-menu-item') &&
            itemElement.hasAttribute('data-kt-menu-item-trigger'));
    };
    KTMenu.prototype._getItemLinkElement = function (itemElement) {
        return dom_1.default.child(itemElement, '.kt-menu-link, .kt-menu-toggle');
    };
    KTMenu.prototype._getItemSubElement = function (itemElement) {
        if (itemElement.classList.contains('kt-menu-dropdown') === true ||
            itemElement.classList.contains('kt-menu-accordion') === true) {
            return itemElement;
        }
        else if (data_1.default.has(itemElement, 'sub')) {
            return data_1.default.get(itemElement, 'sub');
        }
        else {
            return dom_1.default.child(itemElement, '.kt-menu-dropdown, .kt-menu-accordion');
        }
    };
    KTMenu.prototype._getItemToggleMode = function (itemElement) {
        var itemEl = this._getItemElement(itemElement);
        if (this._getItemOption(itemEl, 'toggle') === 'dropdown') {
            return 'dropdown';
        }
        else {
            return 'accordion';
        }
    };
    KTMenu.prototype._getItemElement = function (element) {
        if (element.classList.contains('kt-menu-item') &&
            element.hasAttribute('data-kt-menu-item-toggle')) {
            return element;
        }
        // Element has item DOM reference in it's data storage
        if (data_1.default.has(element, 'item')) {
            return data_1.default.get(element, 'item');
        }
        // Item is parent of element
        var itemElement = element.closest('.kt-menu-item[data-kt-menu-item-toggle]');
        if (itemElement) {
            return itemElement;
        }
        // Element's parent has item DOM reference in it's data storage
        var subElement = element.closest('.kt-menu-dropdown, .kt-menu-accordion');
        if (subElement) {
            if (data_1.default.has(subElement, 'item') === true) {
                return data_1.default.get(subElement, 'item');
            }
        }
        return null;
    };
    KTMenu.prototype._getItemParentElement = function (itemElement) {
        var subElement = itemElement.closest('.kt-menu-dropdown, .kt-menu-accordion');
        var parentItem;
        if (subElement && data_1.default.has(subElement, 'item')) {
            return data_1.default.get(subElement, 'item');
        }
        if (subElement &&
            (parentItem = subElement.closest('.kt-menu-item[data-kt-menu-item-trigger]'))) {
            return parentItem;
        }
        return null;
    };
    KTMenu.prototype._getItemParentElements = function (itemElement) {
        var parentElements = [];
        var parentElement;
        var i = 0;
        do {
            parentElement = this._getItemParentElement(itemElement);
            if (parentElement) {
                parentElements.push(parentElement);
                itemElement = parentElement;
            }
            i++;
        } while (parent !== null && i < 20);
        return parentElements;
    };
    KTMenu.prototype._getItemChildElement = function (itemElement) {
        var selector = itemElement;
        var element;
        if (data_1.default.has(itemElement, 'sub')) {
            selector = data_1.default.get(itemElement, 'sub');
        }
        if (selector !== null) {
            //element = selector.querySelector('.show.menu-item[data-kt-menu-trigger]');
            element = selector.querySelector('.kt-menu-item[data-kt-menu-item-trigger]');
            if (element) {
                return element;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    KTMenu.prototype._getItemChildElements = function (itemElement) {
        var children = [];
        var child;
        var i = 0;
        var buffer = itemElement;
        do {
            child = this._getItemChildElement(buffer);
            if (child) {
                children.push(child);
                buffer = child;
            }
            i++;
        } while (child !== null && i < 20);
        return children;
    };
    KTMenu.prototype._showDropdown = function (itemElement) {
        var payload = { cancel: false };
        this._fireEvent('dropdown.show', payload);
        this._dispatchEvent('dropdown.show', payload);
        if (payload.cancel === true) {
            return;
        }
        // Hide all currently shown dropdowns except current one
        KTMenu.hide(itemElement);
        dropdown_1.KTDropdown.hide(itemElement);
        var subElement = this._getItemSubElement(itemElement);
        if (!subElement)
            return;
        var width = this._getItemOption(itemElement, 'width');
        var height = this._getItemOption(itemElement, 'height');
        // Set z=index
        var zindex = parseInt(this._getOption('dropdownZindex'));
        if (parseInt(dom_1.default.getCssProp(subElement, 'z-index')) > zindex) {
            zindex = parseInt(dom_1.default.getCssProp(subElement, 'z-index'));
        }
        if (dom_1.default.getHighestZindex(itemElement) > zindex) {
            zindex = dom_1.default.getHighestZindex(itemElement) + 1;
        }
        subElement.style.zIndex = String(zindex);
        // end
        if (width) {
            subElement.style.width = width;
        }
        if (height) {
            subElement.style.height = height;
        }
        subElement.style.display = '';
        subElement.style.overflow = '';
        // Init popper(new)
        this._initDropdownPopper(itemElement, subElement);
        itemElement.classList.add('show');
        itemElement.classList.add('kt-menu-item-dropdown');
        subElement.classList.add('show');
        // Append the sub the the root of the menu
        if (this._getItemOption(itemElement, 'overflow') === true) {
            document.body.appendChild(subElement);
            subElement.setAttribute('data-kt-menu-sub-overflow', 'true');
            data_1.default.set(itemElement, 'sub', subElement);
            data_1.default.set(subElement, 'item', itemElement);
            data_1.default.set(subElement, 'menu', this);
        }
        else {
            data_1.default.set(subElement, 'item', itemElement);
        }
        // Handle dropdown shown event
        this._fireEvent('dropdown.shown');
        this._dispatchEvent('dropdown.shown');
    };
    KTMenu.prototype._hideDropdown = function (itemElement) {
        var payload = { cancel: false };
        this._fireEvent('dropdown.hide', payload);
        this._dispatchEvent('dropdown.hide', payload);
        if (payload.cancel === true) {
            return;
        }
        var subElement = this._getItemSubElement(itemElement);
        if (!subElement)
            return;
        subElement.style.zIndex = '';
        subElement.style.width = '';
        subElement.style.height = '';
        itemElement.classList.remove('show');
        itemElement.classList.remove('menu-item-dropdown');
        subElement.classList.remove('show');
        // Append the sub back to it's parent
        if (this._getItemOption(itemElement, 'overflow') === true) {
            subElement.removeAttribute('data-kt-menu-sub-overflow');
            if (itemElement.classList.contains('kt-menu-item')) {
                itemElement.appendChild(subElement);
            }
            else {
                if (!this._element)
                    return;
                dom_1.default.insertAfter(this._element, itemElement);
            }
            data_1.default.remove(itemElement, 'sub');
            data_1.default.remove(subElement, 'item');
            data_1.default.remove(subElement, 'menu');
        }
        // Destroy popper(new)
        this._destroyDropdownPopper(itemElement);
        // Handle dropdown hidden event
        this._fireEvent('dropdown.hidden');
        this._dispatchEvent('dropdown.hidden');
    };
    KTMenu.prototype._initDropdownPopper = function (itemElement, subElement) {
        // Setup popper instance
        var reference;
        var attach = this._getItemOption(itemElement, 'attach');
        if (attach) {
            if (attach === 'parent') {
                reference = itemElement.parentNode;
            }
            else {
                reference = document.querySelector(attach);
            }
        }
        else {
            reference = itemElement;
        }
        if (reference) {
            var popper = (0, core_1.createPopper)(reference, subElement, this._getDropdownPopperConfig(itemElement));
            data_1.default.set(itemElement, 'popper', popper);
        }
    };
    KTMenu.prototype._destroyDropdownPopper = function (itemElement) {
        if (data_1.default.has(itemElement, 'popper')) {
            data_1.default.get(itemElement, 'popper').destroy();
            data_1.default.remove(itemElement, 'popper');
        }
    };
    KTMenu.prototype._getDropdownPopperConfig = function (itemElement) {
        var isRtl = dom_1.default.isRTL();
        // Placement
        var placement = this._getOption('dropdownPlacement');
        if (this._getItemOption(itemElement, 'placement')) {
            placement = this._getItemOption(itemElement, 'placement');
        }
        if (isRtl && this._getItemOption(itemElement, 'placementRtl')) {
            placement = this._getItemOption(itemElement, 'placementRtl');
        }
        // Offset
        var offsetValue = this._getOption('dropdownOffset');
        if (this._getItemOption(itemElement, 'offset')) {
            offsetValue = this._getItemOption(itemElement, 'offset');
        }
        if (isRtl && this._getItemOption(itemElement, 'offsetRtl')) {
            offsetValue = this._getItemOption(itemElement, 'offsetRtl');
        }
        var offset = offsetValue
            ? offsetValue
                .toString()
                .split(',')
                .map(function (value) { return parseInt(value.trim(), 10); })
            : [0, 0];
        // Strategy
        var strategy = this._getItemOption(itemElement, 'overflow') === true
            ? 'absolute'
            : 'fixed';
        var altAxis = this._getItemOption(itemElement, 'flip') !== false ? true : false;
        var popperConfig = {
            placement: placement,
            strategy: strategy,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: offset,
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        altAxis: altAxis,
                    },
                },
                {
                    name: 'flip',
                    options: {
                        flipVariations: false,
                    },
                },
            ],
        };
        return popperConfig;
    };
    KTMenu.prototype._showAccordion = function (itemElement) {
        var _this = this;
        var payload = { cancel: false };
        this._fireEvent('accordion.show', payload);
        this._dispatchEvent('accordion.show', payload);
        if (payload.cancel === true) {
            return;
        }
        var subElement = this._getItemSubElement(itemElement);
        if (!subElement)
            return;
        var expandAll = this._getOption('accordionExpandAll');
        if (this._getItemOption(itemElement, 'expandAll') === true) {
            expandAll = true;
        }
        else if (this._getItemOption(itemElement, 'expandAll') === false) {
            expandAll = false;
        }
        else if (this._element &&
            this._getItemOption(this._element, 'expandAll') === true) {
            expandAll = true;
        }
        if (expandAll === false) {
            this._hideAccordions(itemElement);
        }
        if (data_1.default.has(itemElement, 'popper') === true) {
            this._hideDropdown(itemElement);
        }
        itemElement.classList.add('transitioning');
        subElement.style.height = '0px';
        dom_1.default.reflow(subElement);
        subElement.style.display = 'flex';
        subElement.style.overflow = 'hidden';
        subElement.style.height = "".concat(subElement.scrollHeight, "px");
        itemElement.classList.add('show');
        dom_1.default.transitionEnd(subElement, function () {
            itemElement.classList.remove('transitioning');
            subElement.classList.add('show');
            subElement.style.height = '';
            subElement.style.display = '';
            subElement.style.overflow = '';
            // Handle accordion hidden event
            _this._fireEvent('accordion.shown', payload);
            _this._dispatchEvent('accordion.shown', payload);
        });
    };
    KTMenu.prototype._hideAccordion = function (itemElement) {
        var _this = this;
        var payload = { cancel: false };
        this._fireEvent('accordion.hide', payload);
        this._dispatchEvent('accordion.hide', payload);
        if (payload.cancel === true) {
            return;
        }
        var subElement = this._getItemSubElement(itemElement);
        if (!subElement)
            return;
        itemElement.classList.add('transitioning');
        itemElement.classList.remove('show');
        subElement.style.height = "".concat(subElement.scrollHeight, "px");
        dom_1.default.reflow(subElement);
        subElement.style.height = '0px';
        subElement.style.overflow = 'hidden';
        dom_1.default.transitionEnd(subElement, function () {
            subElement.style.overflow = '';
            itemElement.classList.remove('transitioning');
            subElement.classList.remove('show');
            // Handle accordion hidden event
            _this._fireEvent('accordion.hidden');
            _this._dispatchEvent('accordion.hidden');
        });
    };
    KTMenu.prototype._setActiveLink = function (linkElement) {
        var _this = this;
        var itemElement = this._getItemElement(linkElement);
        if (!itemElement)
            return;
        if (!this._element)
            return;
        var parentItems = this._getItemParentElements(itemElement);
        var activeLinks = this._element.querySelectorAll('.kt-menu-link.active');
        var activeParentItems = this._element.querySelectorAll('.kt-menu-item.here, .kt-menu-item.show');
        if (this._getItemToggleMode(itemElement) === 'accordion') {
            this._showAccordion(itemElement);
        }
        else {
            itemElement.classList.add('here');
        }
        parentItems === null || parentItems === void 0 ? void 0 : parentItems.forEach(function (parentItem) {
            if (_this._getItemToggleMode(parentItem) === 'accordion') {
                _this._showAccordion(parentItem);
            }
            else {
                parentItem.classList.add('here');
            }
        });
        activeLinks === null || activeLinks === void 0 ? void 0 : activeLinks.forEach(function (activeLink) {
            activeLink.classList.remove('active');
        });
        activeParentItems === null || activeParentItems === void 0 ? void 0 : activeParentItems.forEach(function (activeParentItem) {
            if (activeParentItem.contains(itemElement) === false) {
                activeParentItem.classList.remove('here');
                activeParentItem.classList.remove('show');
            }
        });
        linkElement.classList.add('active');
    };
    KTMenu.prototype._getLinkByAttribute = function (value, name) {
        if (name === void 0) { name = 'href'; }
        if (!this._element)
            return null;
        var linkElement = this._element.querySelector(".kt-menu-link[".concat(name, "=\"").concat(value, "\"]"));
        return linkElement && null;
    };
    KTMenu.prototype._hideAccordions = function (itemElement) {
        var _this = this;
        if (!this._element)
            return;
        var itemsToHide = this._element.querySelectorAll('.show[data-kt-menu-item-trigger]');
        itemsToHide.forEach(function (itemToHide) {
            if (_this._getItemToggleMode(itemToHide) === 'accordion' &&
                itemToHide !== itemElement &&
                (itemElement === null || itemElement === void 0 ? void 0 : itemElement.contains(itemToHide)) === false &&
                itemToHide.contains(itemElement) === false) {
                _this._hideAccordion(itemToHide);
            }
        });
    };
    KTMenu.prototype._getItemOption = function (element, name) {
        name = utils_1.default.camelReverseCase(name);
        if (element && element.hasAttribute("data-kt-menu-item-".concat(name))) {
            return (dom_1.default.getCssProp(element, "--kt-menu-item-".concat(name)) ||
                element.getAttribute("data-kt-menu-item-".concat(name)));
        }
        return null;
    };
    // General Methods
    KTMenu.prototype.getItemTriggerMode = function (itemElement) {
        return this._getItemOption(itemElement, 'trigger');
    };
    KTMenu.prototype.getItemToggleMode = function (element) {
        return this._getItemToggleMode(element);
    };
    KTMenu.prototype.click = function (element, event) {
        this._click(element, event);
    };
    KTMenu.prototype.link = function (element, event) {
        this._link(element, event);
    };
    KTMenu.prototype.dismiss = function (element) {
        this._dismiss(element);
    };
    KTMenu.prototype.mouseover = function (element) {
        this._mouseover(element);
    };
    KTMenu.prototype.mouseout = function (element) {
        this._mouseout(element);
    };
    KTMenu.prototype.show = function (itemElement) {
        return this._show(itemElement);
    };
    KTMenu.prototype.hide = function (itemElement) {
        this._hide(itemElement);
    };
    KTMenu.prototype.toggle = function (itemElement) {
        this._toggle(itemElement);
    };
    KTMenu.prototype.reset = function (itemElement) {
        this._reset(itemElement);
    };
    KTMenu.prototype.update = function () {
        this._update();
    };
    KTMenu.prototype.setActiveLink = function (link) {
        this._setActiveLink(link);
    };
    KTMenu.prototype.getLinkByAttribute = function (value, name) {
        if (name === void 0) { name = 'href'; }
        return this._getLinkByAttribute(value, name);
    };
    KTMenu.prototype.getItemLinkElement = function (itemElement) {
        return this._getItemLinkElement(itemElement);
    };
    KTMenu.prototype.getItemElement = function (element) {
        return this._getItemElement(element);
    };
    KTMenu.prototype.getItemSubElement = function (itemElement) {
        return this._getItemSubElement(itemElement);
    };
    KTMenu.prototype.getItemParentElements = function (itemElement) {
        return this._getItemParentElements(itemElement);
    };
    KTMenu.prototype.isItemSubShown = function (itemElement) {
        return this._isItemSubShown(itemElement);
    };
    KTMenu.prototype.isItemParentShown = function (itemElement) {
        return this._isItemParentShown(itemElement);
    };
    KTMenu.prototype.isItemDropdownPermanent = function (itemElement) {
        return this._isItemDropdownPermanent(itemElement);
    };
    KTMenu.prototype.disable = function () {
        this._disabled = true;
    };
    KTMenu.prototype.enable = function () {
        this._disabled = false;
    };
    KTMenu.prototype.hideAccordions = function (itemElement) {
        this._hideAccordions(itemElement);
    };
    // Statics methods
    KTMenu.getInstance = function (element) {
        if (!element) {
            return null;
        }
        // Element has menu DOM reference in it's DATA storage
        if (data_1.default.has(element, 'menu')) {
            return data_1.default.get(element, 'menu');
        }
        // Element has .menu parent
        var menuElement = element.closest('[data-kt-menu-initialized]');
        if (menuElement && data_1.default.has(menuElement, 'menu')) {
            return data_1.default.get(menuElement, 'menu');
        }
        else if (menuElement &&
            menuElement.getAttribute('data-kt-menu-initialized') === 'true') {
            return new KTMenu(menuElement);
        }
        var subElement = element.closest('[data-kt-menu-sub-overflow="true"]');
        if (subElement && data_1.default.has(subElement, 'menu')) {
            return data_1.default.get(subElement, 'menu');
        }
        // Element has a parent with DOM reference to .menu in it's DATA storage
        if (element.classList.contains('kt-menu-link') ||
            element.classList.contains('kt-menu-toggle')) {
            var subElement_1 = (element.closest('.kt-menu-dropdown') ||
                element.closest('.kt-menu-accordion'));
            if (data_1.default.has(subElement_1, 'menu')) {
                return data_1.default.get(subElement_1, 'menu');
            }
        }
        return null;
    };
    KTMenu.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTMenu(element, config);
    };
    KTMenu.hide = function (skipElement) {
        var itemElements = document.querySelectorAll('.show.kt-menu-item-dropdown[data-kt-menu-item-trigger]');
        itemElements.forEach(function (itemElement) {
            var _a;
            var menu = KTMenu.getInstance(itemElement);
            if (menu &&
                menu.getItemToggleMode(itemElement) === 'dropdown') {
                if (skipElement) {
                    if (itemElement &&
                        ((_a = menu
                            .getItemSubElement(itemElement)) === null || _a === void 0 ? void 0 : _a.contains(skipElement)) === false &&
                        itemElement.contains(skipElement) === false &&
                        itemElement !== skipElement) {
                        menu.hide(itemElement);
                    }
                }
                else {
                    menu.hide(itemElement);
                }
            }
        });
    };
    KTMenu.updateDropdowns = function () {
        var itemElements = document.querySelectorAll('.show.kt-menu-item-dropdown[data-kt-menu-item-trigger]');
        itemElements.forEach(function (itemElement) {
            if (data_1.default.has(itemElement, 'popper')) {
                data_1.default.get(itemElement, 'popper').forceUpdate();
            }
        });
    };
    KTMenu.updateByLinkAttribute = function (value, name) {
        if (name === void 0) { name = 'href'; }
        var elements = document.querySelectorAll('[data-kt-menu-initialized]');
        elements.forEach(function (element) {
            var menu = KTMenu.getInstance(element);
            if (menu) {
                var link = menu.getLinkByAttribute(value, name);
                if (link) {
                    menu.setActiveLink(link);
                }
            }
        });
    };
    KTMenu.handleClickAway = function () {
        document.addEventListener('click', function (event) {
            var itemElements = document.querySelectorAll('.show.kt-menu-item-dropdown[data-kt-menu-item-trigger]:not([data-kt-menu-item-static="true"])');
            itemElements.forEach(function (itemElement) {
                var menu = KTMenu.getInstance(itemElement);
                if (menu &&
                    menu.getItemToggleMode(itemElement) === 'dropdown') {
                    var subElement = menu.getItemSubElement(itemElement);
                    if (itemElement === event.target ||
                        itemElement.contains(event.target)) {
                        return;
                    }
                    if (subElement &&
                        (subElement === event.target ||
                            subElement.contains(event.target))) {
                        return;
                    }
                    menu.hide(itemElement);
                }
            });
        });
    };
    KTMenu.handleMouseover = function () {
        event_handler_1.default.on(document.body, '[data-kt-menu-item-trigger], .kt-menu-dropdown', 'mouseover', function (event, target) {
            var menu = KTMenu.getInstance(target);
            if (menu !== null && menu.getItemToggleMode(target) === 'dropdown') {
                return menu.mouseover(target);
            }
        });
    };
    KTMenu.handleMouseout = function () {
        event_handler_1.default.on(document.body, '[data-kt-menu-item-trigger], .kt-menu-dropdown', 'mouseout', function (event, target) {
            var menu = KTMenu.getInstance(target);
            if (menu !== null && menu.getItemToggleMode(target) === 'dropdown') {
                return menu.mouseout(target);
            }
        });
    };
    KTMenu.handleClick = function () {
        event_handler_1.default.on(document.body, '.kt-menu-item[data-kt-menu-item-trigger] > .kt-menu-link, .kt-menu-item[data-kt-menu-item-trigger] > .kt-menu-label .kt-menu-toggle, .kt-menu-item[data-kt-menu-item-trigger] > .kt-menu-toggle, [data-kt-menu-item-trigger]:not(.kt-menu-item):not([data-kt-menu-item-trigger="auto"])', 'click', function (event, target) {
            var menu = KTMenu.getInstance(target);
            if (menu !== null) {
                return menu.click(target, event);
            }
        });
        event_handler_1.default.on(document.body, '.kt-menu-item:not([data-kt-menu-item-trigger]) > .kt-menu-link', 'click', function (event, target) {
            var menu = KTMenu.getInstance(target);
            if (menu !== null) {
                if (target.tagName == 'a' || target.hasAttribute('href')) {
                    menu.dismiss(target);
                }
                return menu.link(target, event);
            }
        });
    };
    KTMenu.handleDismiss = function () {
        event_handler_1.default.on(document.body, '[data-kt-menu-dismiss="true"]', 'click', function (event, target) {
            var menu = KTMenu.getInstance(target);
            if (menu !== null) {
                return menu.dismiss(target);
            }
        });
    };
    KTMenu.handleResize = function () {
        window.addEventListener('resize', function () {
            var timer;
            utils_1.default.throttle(timer, function () {
                // Locate and update Offcanvas instances on window resize
                var elements = document.querySelectorAll('[data-kt-menu-initialized]');
                elements.forEach(function (element) {
                    var _a;
                    (_a = KTMenu.getInstance(element)) === null || _a === void 0 ? void 0 : _a.update();
                });
            }, 200);
        });
    };
    KTMenu.initHandlers = function () {
        this.handleDismiss();
        this.handleClickAway();
        this.handleMouseover();
        this.handleMouseout();
        this.handleClick();
        this.handleResize();
    };
    KTMenu.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-menu]');
        elements.forEach(function (element) {
            new KTMenu(element);
        });
    };
    KTMenu.init = function () {
        KTMenu.createInstances();
        if (window.KT_MENU_INITIALIZED !== true) {
            KTMenu.initHandlers();
            window.KT_MENU_INITIALIZED = true;
        }
    };
    return KTMenu;
}(component_1.default));
exports.KTMenu = KTMenu;


/***/ }),

/***/ "./src/components/modal/index.ts":
/*!***************************************!*\
  !*** ./src/components/modal/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTModal = void 0;
var modal_1 = __webpack_require__(/*! ./modal */ "./src/components/modal/modal.ts");
Object.defineProperty(exports, "KTModal", ({ enumerable: true, get: function () { return modal_1.KTModal; } }));


/***/ }),

/***/ "./src/components/modal/modal.ts":
/*!***************************************!*\
  !*** ./src/components/modal/modal.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTModal = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/helpers/event-handler.ts");
var utils_1 = __webpack_require__(/*! ../../helpers/utils */ "./src/helpers/utils.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTModal = /** @class */ (function (_super) {
    __extends(KTModal, _super);
    function KTModal(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'modal';
        _this._defaultConfig = {
            zindex: '90',
            backdrop: true,
            backdropClass: 'transition-all duration-300 fixed inset-0 bg-black/10',
            backdropStatic: false,
            keyboard: true,
            disableScroll: true,
            persistent: false,
            focus: true,
            hiddenClass: 'hidden',
        };
        _this._config = _this._defaultConfig;
        _this._isOpen = false;
        _this._isTransitioning = false;
        _this._backdropElement = null;
        _this._targetElement = null;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._handlers();
        return _this;
    }
    KTModal.prototype._handlers = function () {
        var _this = this;
        this._element.addEventListener('click', function (event) {
            if (_this._element !== event.target)
                return;
            if (_this._getOption('backdropStatic') === false) {
                _this._hide();
            }
        });
    };
    KTModal.prototype._toggle = function (targetElement) {
        var payload = { cancel: false };
        this._fireEvent('toggle', payload);
        this._dispatchEvent('toggle', payload);
        if (payload.cancel === true) {
            return;
        }
        if (this._isOpen === true) {
            this._hide();
        }
        else {
            this._show(targetElement);
        }
    };
    KTModal.prototype._show = function (targetElement) {
        var _this = this;
        if (this._isOpen || this._isTransitioning) {
            return;
        }
        //const beforeScroll = this.fireEvent('beforeScroll', this.el);
        //this.dispatch('beforeScroll.hs.scrollspy', this.el, this.el);
        //if (beforeScroll instanceof Promise) beforeScroll.then(() => scrollFn());
        //else scrollFn();
        if (targetElement)
            this._targetElement = targetElement;
        var payload = { cancel: false };
        this._fireEvent('show', payload);
        this._dispatchEvent('show', payload);
        if (payload.cancel === true) {
            return;
        }
        KTModal.hide();
        if (!this._element)
            return;
        this._isTransitioning = true;
        this._element.setAttribute('role', 'dialog');
        this._element.setAttribute('aria-modal', 'true');
        this._element.setAttribute('tabindex', '-1');
        this._setZindex();
        if (this._getOption('backdrop') === true)
            this._createBackdrop();
        if (this._getOption('disableScroll')) {
            document.body.style.overflow = 'hidden';
        }
        this._element.style.display = 'block';
        dom_1.default.reflow(this._element);
        this._element.classList.add('open');
        this._element.classList.remove(this._getOption('hiddenClass'));
        dom_1.default.transitionEnd(this._element, function () {
            _this._isTransitioning = false;
            _this._isOpen = true;
            if (_this._getOption('focus') === true) {
                _this._autoFocus();
            }
            _this._fireEvent('shown');
            _this._dispatchEvent('shown');
        });
    };
    KTModal.prototype._hide = function () {
        var _this = this;
        if (!this._element)
            return;
        if (this._isOpen === false || this._isTransitioning) {
            return;
        }
        var payload = { cancel: false };
        this._fireEvent('hide', payload);
        this._dispatchEvent('hide', payload);
        if (payload.cancel === true) {
            return;
        }
        this._isTransitioning = true;
        this._element.removeAttribute('role');
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('tabindex');
        if (this._getOption('disableScroll')) {
            document.body.style.overflow = '';
        }
        dom_1.default.reflow(this._element);
        this._element.classList.remove('open');
        if (this._getOption('backdrop') === true) {
            this._deleteBackdrop();
        }
        dom_1.default.transitionEnd(this._element, function () {
            if (!_this._element)
                return;
            _this._isTransitioning = false;
            _this._isOpen = false;
            _this._element.style.display = '';
            _this._element.classList.add(_this._getOption('hiddenClass'));
            _this._fireEvent('hidden');
            _this._dispatchEvent('hidden');
        });
    };
    KTModal.prototype._setZindex = function () {
        var zindex = parseInt(this._getOption('zindex'));
        if (parseInt(dom_1.default.getCssProp(this._element, 'z-index')) > zindex) {
            zindex = parseInt(dom_1.default.getCssProp(this._element, 'z-index'));
        }
        if (dom_1.default.getHighestZindex(this._element) > zindex) {
            zindex = dom_1.default.getHighestZindex(this._element) + 1;
        }
        this._element.style.zIndex = String(zindex);
    };
    KTModal.prototype._autoFocus = function () {
        if (!this._element)
            return;
        var input = this._element.querySelector('[data-kt-modal-input-focus]');
        if (!input)
            return;
        else
            input.focus();
    };
    KTModal.prototype._createBackdrop = function () {
        if (!this._element)
            return;
        var zindex = parseInt(dom_1.default.getCssProp(this._element, 'z-index'));
        this._backdropElement = document.createElement('DIV');
        this._backdropElement.style.zIndex = (zindex - 1).toString();
        document.body.append(this._backdropElement);
        dom_1.default.reflow(this._backdropElement);
        dom_1.default.addClass(this._backdropElement, this._getOption('backdropClass'));
    };
    KTModal.prototype._deleteBackdrop = function () {
        var _this = this;
        if (!this._backdropElement)
            return;
        dom_1.default.reflow(this._backdropElement);
        this._backdropElement.style.opacity = '0';
        dom_1.default.transitionEnd(this._backdropElement, function () {
            if (!_this._backdropElement)
                return;
            dom_1.default.remove(_this._backdropElement);
        });
    };
    KTModal.prototype.toggle = function (targetElement) {
        return this._toggle(targetElement);
    };
    KTModal.prototype.show = function (targetElement) {
        return this._show(targetElement);
    };
    KTModal.prototype.hide = function () {
        return this._hide();
    };
    KTModal.prototype.getTargetElement = function () {
        return this._targetElement;
    };
    KTModal.prototype.isOpen = function () {
        return this._isOpen;
    };
    KTModal.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'modal')) {
            return data_1.default.get(element, 'modal');
        }
        if (element.getAttribute('data-kt-modal')) {
            return new KTModal(element);
        }
        return null;
    };
    KTModal.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTModal(element, config);
    };
    KTModal.hide = function () {
        var elements = document.querySelectorAll('[data-kt-modal-initialized]');
        elements.forEach(function (element) {
            var modal = KTModal.getInstance(element);
            if (modal && modal.isOpen()) {
                modal.hide();
            }
        });
    };
    KTModal.handleToggle = function () {
        event_handler_1.default.on(document.body, '[data-kt-modal-toggle]', 'click', function (event, target) {
            event.stopPropagation();
            var selector = target.getAttribute('data-kt-modal-toggle');
            if (!selector)
                return;
            var modalElement = document.querySelector(selector);
            var modal = KTModal.getInstance(modalElement);
            if (modal) {
                modal.toggle(target);
            }
        });
    };
    KTModal.handleDismiss = function () {
        event_handler_1.default.on(document.body, '[data-kt-modal-dismiss]', 'click', function (event, target) {
            event.stopPropagation();
            var modalElement = target.closest('[data-kt-modal-initialized]');
            if (modalElement) {
                var modal = KTModal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }
        });
    };
    KTModal.handleClickAway = function () {
        document.addEventListener('click', function (event) {
            var modalElement = document.querySelector('.open[data-kt-modal-initialized]');
            if (!modalElement)
                return;
            var modal = KTModal.getInstance(modalElement);
            if (!modal)
                return;
            if (utils_1.default.stringToBoolean(modal.getOption('persistent')) === true)
                return;
            if (utils_1.default.stringToBoolean(modal.getOption('backdrop')) === true)
                return;
            if (modalElement !== event.target &&
                modal.getTargetElement() !== event.target &&
                modalElement.contains(event.target) === false) {
                modal.hide();
            }
        });
    };
    KTModal.handleKeyword = function () {
        document.addEventListener('keydown', function (event) {
            var modalElement = document.querySelector('.open[data-kt-modal-initialized]');
            var modal = KTModal.getInstance(modalElement);
            if (!modal) {
                return;
            }
            // if esc key was not pressed in combination with ctrl or alt or shift
            if (event.key === 'Escape' &&
                !(event.ctrlKey || event.altKey || event.shiftKey)) {
                modal.hide();
            }
            if (event.code === 'Tab' && !event.metaKey) {
                return;
            }
        });
    };
    KTModal.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-modal]');
        elements.forEach(function (element) {
            new KTModal(element);
        });
    };
    KTModal.init = function () {
        KTModal.createInstances();
        if (window.KT_MODAL_INITIALIZED !== true) {
            KTModal.handleToggle();
            KTModal.handleDismiss();
            KTModal.handleClickAway();
            KTModal.handleKeyword();
            window.KT_MODAL_INITIALIZED = true;
        }
    };
    return KTModal;
}(component_1.default));
exports.KTModal = KTModal;
if (typeof window !== 'undefined') {
    window.KTModal = KTModal;
}


/***/ }),

/***/ "./src/components/reparent/index.ts":
/*!******************************************!*\
  !*** ./src/components/reparent/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTReparent = void 0;
var reparent_1 = __webpack_require__(/*! ./reparent */ "./src/components/reparent/reparent.ts");
Object.defineProperty(exports, "KTReparent", ({ enumerable: true, get: function () { return reparent_1.KTReparent; } }));


/***/ }),

/***/ "./src/components/reparent/reparent.ts":
/*!*********************************************!*\
  !*** ./src/components/reparent/reparent.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTReparent = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var utils_1 = __webpack_require__(/*! ../../helpers/utils */ "./src/helpers/utils.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTReparent = /** @class */ (function (_super) {
    __extends(KTReparent, _super);
    function KTReparent(element, config) {
        if (config === void 0) { config = null; }
        var _this = _super.call(this) || this;
        _this._name = 'reparent';
        _this._defaultConfig = {
            mode: '',
            target: '',
        };
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._update();
        return _this;
    }
    KTReparent.prototype._update = function () {
        if (!this._element)
            return;
        var target = this._getOption('target');
        var targetEl = dom_1.default.getElement(target);
        var mode = this._getOption('mode');
        if (targetEl && this._element.parentNode !== targetEl) {
            if (mode === 'prepend') {
                targetEl.prepend(this._element);
            }
            else if (mode === 'append') {
                targetEl.append(this._element);
            }
        }
    };
    KTReparent.prototype.update = function () {
        this._update();
    };
    KTReparent.handleResize = function () {
        window.addEventListener('resize', function () {
            var timer;
            utils_1.default.throttle(timer, function () {
                document
                    .querySelectorAll('[data-kt-reparent-initialized]')
                    .forEach(function (element) {
                    var reparent = KTReparent.getInstance(element);
                    reparent === null || reparent === void 0 ? void 0 : reparent.update();
                });
            }, 200);
        });
    };
    KTReparent.getInstance = function (element) {
        return data_1.default.get(element, 'reparent');
    };
    KTReparent.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTReparent(element, config);
    };
    KTReparent.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-reparent]');
        elements.forEach(function (element) {
            new KTReparent(element);
        });
    };
    KTReparent.init = function () {
        KTReparent.createInstances();
        if (window.KT_REPARENT_INITIALIZED !== true) {
            KTReparent.handleResize();
            window.KT_REPARENT_INITIALIZED = true;
        }
    };
    return KTReparent;
}(component_1.default));
exports.KTReparent = KTReparent;
if (typeof window !== 'undefined') {
    window.KTReparent = KTReparent;
}


/***/ }),

/***/ "./src/components/scrollable/index.ts":
/*!********************************************!*\
  !*** ./src/components/scrollable/index.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTScrollable = void 0;
var scrollable_1 = __webpack_require__(/*! ./scrollable */ "./src/components/scrollable/scrollable.ts");
Object.defineProperty(exports, "KTScrollable", ({ enumerable: true, get: function () { return scrollable_1.KTScrollable; } }));


/***/ }),

/***/ "./src/components/scrollable/scrollable.ts":
/*!*************************************************!*\
  !*** ./src/components/scrollable/scrollable.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTScrollable = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var utils_1 = __webpack_require__(/*! ../../helpers/utils */ "./src/helpers/utils.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTScrollable = /** @class */ (function (_super) {
    __extends(KTScrollable, _super);
    function KTScrollable(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'scrollable';
        _this._defaultConfig = {
            save: true,
            dependencies: '',
            wrappers: '',
            offset: '',
        };
        _this._config = _this._defaultConfig;
        _this._elementId = null;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        if (!_this._element)
            return _this;
        _this._elementId = _this._element.getAttribute('id');
        _this._handlers();
        _this._update();
        return _this;
    }
    KTScrollable.prototype._handlers = function () {
        var _this = this;
        if (!this._element)
            return;
        this._element.addEventListener('scroll', function () {
            if (!_this._element)
                return;
            localStorage.setItem("".concat(_this._elementId, "st"), _this._element.scrollTop.toString());
        });
    };
    KTScrollable.prototype._update = function () {
        this._setupHeight();
        this._setupState();
    };
    KTScrollable.prototype._setupHeight = function () {
        if (!this._element)
            return;
        var heightType = this._getHeightType();
        var height = this._getHeight();
        // Set height
        if (height && height != '0' && height.length > 0) {
            this._element.style.setProperty(heightType, height);
        }
        else {
            this._element.style.setProperty(heightType, '');
        }
    };
    KTScrollable.prototype._setupState = function () {
        if (!this._element)
            return;
        var stateEnabled = this._getOption('state') === true;
        var elementIdExists = Boolean(this._elementId);
        if (stateEnabled && elementIdExists) {
            var storedPosition = localStorage.getItem(this._elementId + 'st');
            if (storedPosition) {
                var pos = parseInt(storedPosition);
                if (pos > 0) {
                    this._element.scroll({
                        top: pos,
                        behavior: 'instant',
                    });
                }
            }
        }
    };
    KTScrollable.prototype._getHeight = function () {
        var height = this._getHeightOption();
        if (height !== null &&
            typeof height === 'string' &&
            height.toLowerCase() === 'auto') {
            return this._getAutoHeight();
        }
        else if (height) {
            return parseInt(height).toString() + 'px';
        }
        else {
            return '0';
        }
    };
    KTScrollable.prototype._getAutoHeight = function () {
        var _this = this;
        if (!this._element)
            return '';
        var height = dom_1.default.getViewPort().height;
        var dependencies = this._getOption('dependencies');
        var wrappers = this._getOption('wrappers');
        var offset = this._getOption('offset');
        height -= this._getElementSpacing(this._element);
        if (dependencies && dependencies.length > 0) {
            var elements = document.querySelectorAll(dependencies);
            elements.forEach(function (element) {
                if (dom_1.default.getCssProp(element, 'display') === 'none') {
                    return;
                }
                height -= _this._getElementHeight(element);
            });
        }
        if (wrappers && wrappers.length > 0) {
            var elements = document.querySelectorAll(wrappers);
            elements.forEach(function (element) {
                if (dom_1.default.getCssProp(element, 'display') === 'none') {
                    return;
                }
                height -= _this._getElementSpacing(element);
            });
        }
        if (offset && offset.length > 0) {
            height -= parseInt(offset);
        }
        return height.toString() + 'px';
    };
    KTScrollable.prototype._getElementHeight = function (element) {
        var height = 0;
        if (!element) {
            return height;
        }
        var computedStyle = window.getComputedStyle(element);
        if (computedStyle.height) {
            height += parseInt(computedStyle.height);
        }
        if (computedStyle.marginTop) {
            height += parseInt(computedStyle.marginTop);
        }
        if (computedStyle.marginBottom) {
            height += parseInt(computedStyle.marginBottom);
        }
        if (computedStyle.borderTopWidth) {
            height += parseInt(computedStyle.borderTopWidth);
        }
        if (computedStyle.borderBottomWidth) {
            height += parseInt(computedStyle.borderBottomWidth);
        }
        return height;
    };
    KTScrollable.prototype._getElementSpacing = function (element) {
        var spacing = 0;
        if (!element) {
            return spacing;
        }
        var computedStyle = window.getComputedStyle(element);
        if (computedStyle.marginTop) {
            spacing += parseInt(computedStyle.marginTop);
        }
        if (computedStyle.marginBottom) {
            spacing += parseInt(computedStyle.marginBottom);
        }
        if (computedStyle.paddingTop) {
            spacing += parseInt(computedStyle.paddingTop);
        }
        if (computedStyle.paddingBottom) {
            spacing += parseInt(computedStyle.paddingBottom);
        }
        if (computedStyle.borderTopWidth) {
            spacing += parseInt(computedStyle.borderTopWidth);
        }
        if (computedStyle.borderBottomWidth) {
            spacing += parseInt(computedStyle.borderBottomWidth);
        }
        return spacing;
    };
    KTScrollable.prototype._getHeightType = function () {
        if (this._getOption('minHeight')) {
            return 'min-height';
        }
        if (this._getOption('maxHeight')) {
            return 'max-height';
        }
        else {
            return 'height';
        }
    };
    KTScrollable.prototype._getHeightOption = function () {
        var heightType = this._getHeightType();
        if (heightType == 'min-height') {
            return this._getOption('minHeight');
        }
        if (heightType == 'max-height') {
            return this._getOption('maxHeight');
        }
        else {
            return this._getOption('height');
        }
    };
    KTScrollable.prototype.update = function () {
        return this._update();
    };
    KTScrollable.prototype.getHeight = function () {
        return this._getHeight();
    };
    KTScrollable.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'scrollable')) {
            return data_1.default.get(element, 'scrollable');
        }
        if (element.getAttribute('data-kt-scrollable')) {
            return new KTScrollable(element);
        }
        return null;
    };
    KTScrollable.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTScrollable(element, config);
    };
    KTScrollable.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-scrollable]');
        elements.forEach(function (element) {
            new KTScrollable(element);
        });
    };
    KTScrollable.handleResize = function () {
        window.addEventListener('resize', function () {
            var timer;
            utils_1.default.throttle(timer, function () {
                // Locate and update scrollable instances on window resize
                var elements = document.querySelectorAll('[data-kt-scrollable-initialized]');
                elements.forEach(function (element) {
                    var _a;
                    (_a = KTScrollable.getInstance(element)) === null || _a === void 0 ? void 0 : _a.update();
                });
            }, 200);
        });
    };
    KTScrollable.init = function () {
        KTScrollable.createInstances();
        if (window.KT_SCROLL_INITIALIZED !== true) {
            KTScrollable.handleResize();
            window.KT_SCROLL_INITIALIZED = true;
        }
    };
    return KTScrollable;
}(component_1.default));
exports.KTScrollable = KTScrollable;
if (typeof window !== 'undefined') {
    window.KTScrollable = KTScrollable;
}


/***/ }),

/***/ "./src/components/scrollspy/index.ts":
/*!*******************************************!*\
  !*** ./src/components/scrollspy/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTScrollspy = void 0;
var scrollspy_1 = __webpack_require__(/*! ./scrollspy */ "./src/components/scrollspy/scrollspy.ts");
Object.defineProperty(exports, "KTScrollspy", ({ enumerable: true, get: function () { return scrollspy_1.KTScrollspy; } }));


/***/ }),

/***/ "./src/components/scrollspy/scrollspy.ts":
/*!***********************************************!*\
  !*** ./src/components/scrollspy/scrollspy.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTScrollspy = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/helpers/event-handler.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTScrollspy = /** @class */ (function (_super) {
    __extends(KTScrollspy, _super);
    function KTScrollspy(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'scrollspy';
        _this._defaultConfig = {
            target: 'body',
            offset: 0,
            smooth: true,
        };
        _this._config = _this._defaultConfig;
        _this._targetElement = null;
        _this._anchorElements = null;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        if (!_this._element)
            return _this;
        var targetElement = _this._getTarget() === 'body'
            ? document
            : dom_1.default.getElement(_this._getTarget());
        if (!targetElement)
            return _this;
        _this._targetElement = targetElement;
        _this._anchorElements = _this._element.querySelectorAll('[data-kt-scrollspy-anchor]');
        if (!_this._anchorElements)
            return _this;
        _this._handlers();
        _this._update();
        return _this;
    }
    KTScrollspy.prototype._getTarget = function () {
        return (this._element.getAttribute('data-kt-scrollspy-target') ||
            this._getOption('target'));
    };
    KTScrollspy.prototype._handlers = function () {
        var _this = this;
        if (!this._anchorElements)
            return;
        this._targetElement.addEventListener('scroll', function () {
            _this._anchorElements.forEach(function (anchorElement) {
                _this._updateAnchor(anchorElement);
            });
        });
        event_handler_1.default.on(this._element, '[data-kt-scrollspy-anchor]', 'click', function (event, target) {
            event.preventDefault();
            _this._scrollTo(target);
        });
    };
    KTScrollspy.prototype._scrollTo = function (anchorElement) {
        if (!anchorElement)
            return;
        var sectionElement = dom_1.default.getElement(anchorElement.getAttribute('href'));
        if (!sectionElement)
            return;
        var targetElement = this._targetElement === document ? window : this._targetElement;
        if (!targetElement)
            return;
        var offset = parseInt(this._getOption('offset'));
        if (anchorElement.getAttribute('data-kt-scrollspy-anchor-offset')) {
            offset = parseInt(anchorElement.getAttribute('data-kt-scrollspy-anchor-offset'));
        }
        var scrollTop = sectionElement.offsetTop - offset;
        if ('scrollTo' in targetElement) {
            targetElement.scrollTo({
                top: scrollTop,
                left: 0,
                behavior: this._getOption('smooth') ? 'smooth' : 'instant',
            });
        }
    };
    KTScrollspy.prototype._updateAnchor = function (anchorElement) {
        var sectionElement = dom_1.default.getElement(anchorElement.getAttribute('href'));
        if (!sectionElement)
            return;
        if (!dom_1.default.isVisible(anchorElement))
            return;
        if (!this._anchorElements)
            return;
        var scrollPosition = this._targetElement === document
            ? document.documentElement.scrollTop || document.body.scrollTop
            : this._targetElement.scrollTop;
        var offset = parseInt(this._getOption('offset'));
        if (anchorElement.getAttribute('data-kt-scrollspy-anchor-offset')) {
            offset = parseInt(anchorElement.getAttribute('data-kt-scrollspy-anchor-offset'));
        }
        var offsetTop = sectionElement.offsetTop;
        if (scrollPosition + offset >= offsetTop) {
            this._anchorElements.forEach(function (anchorElement) {
                anchorElement.classList.remove('active');
            });
            var payload = { element: anchorElement };
            this._fireEvent('activate', payload);
            this._dispatchEvent('activate', payload);
            anchorElement.classList.add('active');
            var parentAnchorElements = dom_1.default.parents(anchorElement, '[data-kt-scrollspy-group]');
            if (parentAnchorElements) {
                parentAnchorElements.forEach(function (parentAnchorElement) {
                    var _a;
                    (_a = parentAnchorElement
                        .querySelector('[data-kt-scrollspy-anchor]')) === null || _a === void 0 ? void 0 : _a.classList.add('active');
                });
            }
        }
    };
    KTScrollspy.prototype._update = function () {
        var _this = this;
        if (!this._anchorElements)
            return;
        this._anchorElements.forEach(function (anchorElement) {
            _this._updateAnchor(anchorElement);
        });
    };
    KTScrollspy.prototype._isActive = function (anchorElement) {
        return anchorElement.classList.contains('active');
    };
    KTScrollspy.prototype.updateAnchor = function (anchorElement) {
        this._updateAnchor(anchorElement);
    };
    KTScrollspy.prototype.isActive = function (anchorElement) {
        return this._isActive(anchorElement);
    };
    KTScrollspy.prototype.update = function () {
        this.update();
    };
    KTScrollspy.prototype.scrollTo = function (anchorElement) {
        this._scrollTo(anchorElement);
    };
    KTScrollspy.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'scrollspy')) {
            return data_1.default.get(element, 'scrollspy');
        }
        if (element.getAttribute('data-kt-scrollspy')) {
            return new KTScrollspy(element);
        }
        return null;
    };
    KTScrollspy.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTScrollspy(element, config);
    };
    KTScrollspy.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-scrollspy]');
        elements.forEach(function (element) {
            new KTScrollspy(element);
        });
    };
    KTScrollspy.init = function () {
        KTScrollspy.createInstances();
    };
    return KTScrollspy;
}(component_1.default));
exports.KTScrollspy = KTScrollspy;
if (typeof window !== 'undefined') {
    window.KTScrollspy = KTScrollspy;
}


/***/ }),

/***/ "./src/components/scrollto/index.ts":
/*!******************************************!*\
  !*** ./src/components/scrollto/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTScrollto = void 0;
var scrollto_1 = __webpack_require__(/*! ./scrollto */ "./src/components/scrollto/scrollto.ts");
Object.defineProperty(exports, "KTScrollto", ({ enumerable: true, get: function () { return scrollto_1.KTScrollto; } }));


/***/ }),

/***/ "./src/components/scrollto/scrollto.ts":
/*!*********************************************!*\
  !*** ./src/components/scrollto/scrollto.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTScrollto = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTScrollto = /** @class */ (function (_super) {
    __extends(KTScrollto, _super);
    function KTScrollto(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'scrollto';
        _this._defaultConfig = {
            smooth: true,
            parent: 'body',
            target: '',
            offset: 0,
        };
        _this._config = _this._defaultConfig;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        if (!_this._element)
            return _this;
        _this._targetElement = _this._getTargetElement();
        if (!_this._targetElement) {
            return _this;
        }
        _this._handlers();
        return _this;
    }
    KTScrollto.prototype._getTargetElement = function () {
        return (dom_1.default.getElement(this._element.getAttribute('data-kt-scrollto')) || dom_1.default.getElement(this._getOption('target')));
    };
    KTScrollto.prototype._handlers = function () {
        var _this = this;
        if (!this._element)
            return;
        this._element.addEventListener('click', function (event) {
            event.preventDefault();
            _this._scroll();
        });
    };
    KTScrollto.prototype._scroll = function () {
        var pos = this._targetElement.offsetTop +
            parseInt(this._getOption('offset'));
        var parent = dom_1.default.getElement(this._getOption('parent'));
        if (!parent || parent === document.body) {
            parent = window;
        }
        parent.scrollTo({
            top: pos,
            behavior: this._getOption('smooth') ? 'smooth' : 'instant',
        });
    };
    KTScrollto.prototype.scroll = function () {
        this._scroll();
    };
    KTScrollto.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'scrollto')) {
            return data_1.default.get(element, 'scrollto');
        }
        if (element.getAttribute('data-kt-scrollto')) {
            return new KTScrollto(element);
        }
        return null;
    };
    KTScrollto.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTScrollto(element, config);
    };
    KTScrollto.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-scrollto]');
        elements.forEach(function (element) {
            new KTScrollto(element);
        });
    };
    KTScrollto.init = function () {
        KTScrollto.createInstances();
    };
    return KTScrollto;
}(component_1.default));
exports.KTScrollto = KTScrollto;
if (typeof window !== 'undefined') {
    window.KTScrollto = KTScrollto;
}


/***/ }),

/***/ "./src/components/select/combobox.ts":
/*!*******************************************!*\
  !*** ./src/components/select/combobox.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTSelectCombobox = void 0;
var utils_1 = __webpack_require__(/*! ./utils */ "./src/components/select/utils.ts");
/**
 * KTSelectCombobox - Handles combobox-specific functionality for KTSelect
 */
var KTSelectCombobox = /** @class */ (function () {
    function KTSelectCombobox(select) {
        this._select = select;
        this._config = select.getConfig();
        // Get the display element (could be the input directly or a parent div)
        var displayElement = select.getValueDisplayElement();
        // Find the input element - either it's the display element itself or a child
        this._searchInputElement = displayElement.tagName === 'INPUT'
            ? displayElement
            : displayElement.querySelector('input[data-kt-select-search]');
        // Find the clear button
        this._clearButtonElement = displayElement.tagName === 'DIV'
            ? displayElement.querySelector('[data-kt-select-clear-button]')
            : null;
        // Create bound handler references to allow proper cleanup
        this._boundKeyNavHandler = this._handleComboboxKeyNav.bind(this);
        this._boundInputHandler = this._handleComboboxInput.bind(this);
        this._boundClearHandler = this._handleClearButtonClick.bind(this);
        // Attach event listeners
        this._attachEventListeners();
        console.log('KTSelectCombobox initialized');
    }
    /**
     * Attach event listeners specific to combobox
     */
    KTSelectCombobox.prototype._attachEventListeners = function () {
        // First remove any existing listeners to prevent duplicates
        this._removeEventListeners();
        // Add input event handler to filter options as user types
        this._searchInputElement.addEventListener('input', this._boundInputHandler);
        // Add keyboard navigation for the combobox
        this._searchInputElement.addEventListener('keydown', this._boundKeyNavHandler);
        // Add clear button click event listener
        if (this._clearButtonElement) {
            this._clearButtonElement.addEventListener('click', this._boundClearHandler);
        }
        console.log('Combobox event listeners attached to:', this._searchInputElement);
    };
    /**
     * Remove event listeners to prevent memory leaks or duplicates
     */
    KTSelectCombobox.prototype._removeEventListeners = function () {
        if (this._searchInputElement) {
            this._searchInputElement.removeEventListener('input', this._boundInputHandler);
            this._searchInputElement.removeEventListener('keydown', this._boundKeyNavHandler);
        }
        if (this._clearButtonElement) {
            this._clearButtonElement.removeEventListener('click', this._boundClearHandler);
        }
    };
    /**
     * Handle combobox input events
     */
    KTSelectCombobox.prototype._handleComboboxInput = function (event) {
        var inputElement = event.target;
        var query = inputElement.value.toLowerCase();
        console.log('Combobox input event, query:', query);
        // Toggle clear button visibility based on input value
        this._toggleClearButtonVisibility(query);
        // If dropdown isn't open, open it when user starts typing
        if (!this._select._dropdownIsOpen) {
            this._select.openDropdown();
        }
        // Filter options based on input
        this._filterOptionsForCombobox(query);
    };
    /**
     * Handle clear button click
     */
    KTSelectCombobox.prototype._handleClearButtonClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        // Clear the input
        this._searchInputElement.value = '';
        // Hide the clear button
        this._toggleClearButtonVisibility('');
        // Show all options and open dropdown
        this._select.showAllOptions();
        this._select.openDropdown();
        // Clear the current selection
        this._select.clearSelection();
        // Focus on the input
        this._searchInputElement.focus();
    };
    /**
     * Toggle clear button visibility based on input value
     */
    KTSelectCombobox.prototype._toggleClearButtonVisibility = function (value) {
        if (!this._clearButtonElement)
            return;
        if (value.length > 0) {
            this._clearButtonElement.classList.remove('hidden');
        }
        else {
            this._clearButtonElement.classList.add('hidden');
        }
    };
    /**
     * Filter options for combobox based on input query
     */
    KTSelectCombobox.prototype._filterOptionsForCombobox = function (query) {
        // Access the private method through type assertion
        this._select._filterOptionsForCombobox(query);
    };
    /**
     * Handle keyboard navigation in combobox mode
     */
    KTSelectCombobox.prototype._handleComboboxKeyNav = function (event) {
        console.log('Combobox keydown event:', event.key);
        // Prevent event propagation to stop bubbling to other handlers
        event.stopPropagation();
        // Handle clear with Escape when dropdown is closed
        if (event.key === 'Escape' && !this._select._dropdownIsOpen && this._searchInputElement.value !== '') {
            event.preventDefault();
            this._searchInputElement.value = '';
            this._toggleClearButtonVisibility('');
            this._select.clearSelection();
            return;
        }
        // Handle dropdown visibility with special keys
        if (!this._select._dropdownIsOpen &&
            (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter')) {
            console.log('Opening dropdown from keyboard in combobox');
            this._select.openDropdown();
            event.preventDefault();
            // If it's arrow keys, also move focus
            if (event.key === 'ArrowDown') {
                this._select._focusNextOption();
            }
            else if (event.key === 'ArrowUp') {
                this._select._focusPreviousOption();
            }
            return;
        }
        // Use the shared keyboard navigation handler
        (0, utils_1.handleDropdownKeyNavigation)(event, this._select, {
            multiple: this._config.multiple,
            closeOnSelect: this._config.closeOnSelect
        });
    };
    /**
     * Update the combobox input value when an option is selected
     */
    KTSelectCombobox.prototype.updateSelectedValue = function (selectedText) {
        if (this._searchInputElement) {
            // Extract just the text content if it contains HTML
            var cleanText = selectedText;
            // If the text might contain HTML (when description is present)
            if (selectedText.includes('<') || selectedText.includes('>')) {
                // Create a temporary element to extract just the text
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = selectedText;
                // Find and use only the option-title text if available
                var titleElement = tempDiv.querySelector('.option-title');
                if (titleElement) {
                    cleanText = titleElement.textContent || selectedText;
                }
                else {
                    // Fallback to all text content if option-title not found
                    cleanText = tempDiv.textContent || selectedText;
                }
            }
            // Set the input value directly for immediate feedback
            this._searchInputElement.value = cleanText;
            // Show the clear button if there's a value
            this._toggleClearButtonVisibility(cleanText);
            // Trigger an input event to ensure any input-based listeners are notified
            var inputEvent = new Event('input', { bubbles: true });
            this._searchInputElement.dispatchEvent(inputEvent);
            console.log('Combobox value updated to:', cleanText);
        }
    };
    /**
     * Reset the input value to match the current selection
     * This can be called to sync the input with the current state
     */
    KTSelectCombobox.prototype.resetInputValueToSelection = function () {
        var _a, _b;
        var selectedOptions = this._select.getSelectedOptions();
        if (selectedOptions.length > 0) {
            var selectedOption = Array.from(this._select.getOptionsElement())
                .find(function (opt) { return opt.dataset.value === selectedOptions[0]; });
            if (selectedOption) {
                // Find the option-title element to get just the title text
                var titleElement = selectedOption.querySelector('.option-title');
                var selectedText = '';
                if (titleElement) {
                    // If it has a structured content with a title element
                    selectedText = ((_a = titleElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                }
                else {
                    // Fallback to the whole text content
                    selectedText = ((_b = selectedOption.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
                }
                this.updateSelectedValue(selectedText);
            }
        }
        else {
            // No selection, clear the input
            if (this._searchInputElement) {
                this._searchInputElement.value = '';
                this._toggleClearButtonVisibility('');
            }
        }
    };
    /**
     * Destroy the combobox component and clean up event listeners
     */
    KTSelectCombobox.prototype.destroy = function () {
        this._removeEventListeners();
    };
    return KTSelectCombobox;
}());
exports.KTSelectCombobox = KTSelectCombobox;


/***/ }),

/***/ "./src/components/select/config.ts":
/*!*****************************************!*\
  !*** ./src/components/select/config.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectOptionDefaultConfig = exports.KTSelectState = exports.DefaultConfig = void 0;
exports.DefaultConfig = {
    // General Display
    placeholder: 'Select an option', // Default placeholder text when no option is selected
    dropdownZindex: null, // Initial z-index value for the dropdown
    // Data Handling
    items: [], // Static list of options
    isLoading: false, // Indicates if options are being loaded asynchronously
    onFetch: null, // Callback function to fetch options asynchronously
    // Remote Data Configuration
    remote: false, // Enable/disable remote data fetching
    dataUrl: null, // URL to fetch options from
    apiDataProperty: null, // Property in the response object that contains the options
    remoteErrorMessage: 'Failed to load data', // Error message to display if remote data fetch fails
    // Field Mapping
    dataValueField: null, // Property in the option object that contains the value (default: 'id')
    dataFieldText: null, // Property in the option object that contains the text (default: 'title')
    dataFieldDescription: null, // Property in the option object that contains the description
    dataFieldIcon: null, // Property in the option object that contains the icon
    dataFieldIconWidth: null, // Property in the option object that contains the icon width
    dataFieldIconHeight: null, // Property in the option object that contains the icon height
    // Search Configuration
    searchParam: '', // Query parameter for API search requests
    searchDebounce: 300, // Debounce delay for search (in ms)
    // Pagination Configuration
    pagination: false, // Enable/disable pagination for remote data
    paginationLimit: 10, // Items per page
    paginationPageParam: 'page', // Parameter name for page number
    paginationLimitParam: 'limit', // Parameter name for items per page
    paginationTotalParam: 'total', // Parameter name for total items
    // Selection Behavior
    multiple: false, // Enable/disable multi-select
    maxSelections: null, // Maximum number of selections allowed in multi-select mode (null for unlimited)
    closeOnSelect: true, // Close the dropdown after selecting an option (single-select only)
    disabled: false, // Disable the select component
    isRequired: false, // Make selection required
    mode: null, // Select mode: tags or combobox
    // Search Functionality
    enableSearch: false, // Enable/disable search functionality within the dropdown
    searchPlaceholder: 'Search...', // Placeholder text for the search input
    searchAutofocus: true, // Autofocus on search input when dropdown opens
    searchMinLength: 0, // Minimum characters required to trigger search
    searchMaxItems: 50, // Maximum number of search results to display
    searchNotFoundText: 'No results found', // Text to display when no search results are found
    searchHighlight: true, // Highlight matching search terms within the options
    // Multi-Select Display
    selectAllText: 'Select all', // Text for the "Select All" option (if implemented)
    clearAllText: 'Clear all', // Text for the "Clear All" option (if implemented)
    showSelectedCount: true, // Show the number of selected options in multi-select mode
    renderSelected: null, // Custom function to render the selected value(s) in the display area
    // Accessibility & Usability
    label: 'Select an option', // Label for the select component (for screen readers)
    height: 250, // Maximum height of the dropdown menu in pixels (if exceeded, a scrollbar will appear)
    // DOM Selectors
    displaySelector: 'data-kt-select-display',
    dropdownContentSelector: 'data-kt-select-dropdown-content',
    searchSelector: 'data-kt-select-search',
    valueSelector: 'data-kt-select-value',
    optionSelector: 'data-kt-select-option',
    // Dropdown Configuration
    dropdownPlacement: null,
    dropdownFlip: false,
    dropdownPreventOverflow: false,
    dropdownStrategy: null,
};
var KTSelectState = /** @class */ (function () {
    function KTSelectState(config) {
        this._selectedOptions = [];
        this._config = this._initDefaultConfig(config);
    }
    KTSelectState.prototype._initDefaultConfig = function (config) {
        return __assign(__assign({}, exports.DefaultConfig), config);
    };
    KTSelectState.prototype.setItems = function (items, query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (items) {
                _this._config.items = items;
                resolve();
            }
            else if (_this._config.dataUrl) {
                _this._fetchRemoteData(query)
                    .then(resolve) // Resolve after _fetchRemoteData completes
                    .catch(reject);
            }
            else if (_this._config.onFetch) {
                _this._config.isLoading = true;
                _this._config.onFetch(query)
                    .then(function (items) {
                    _this._config.items = items;
                    resolve(); // Resolve after onFetch completes
                })
                    .catch(function (error) {
                    console.error("Error fetching data:", error);
                    reject(error); // Reject on error
                })
                    .finally(function () {
                    _this._config.isLoading = false;
                });
            }
            else {
                resolve();
            }
        });
    };
    KTSelectState.prototype._fetchRemoteData = function (query) {
        var _this = this;
        this._config.isLoading = true; // Show loading indicator
        var url = this._config.dataUrl;
        if (query) {
            url += "?".concat(this._config.searchParam, "=").concat(encodeURIComponent(query));
        }
        return fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (_this._config.apiDataProperty) {
                // Extract the data property from the response
                if (_this._config.apiDataProperty in data) {
                    data = data[_this._config.apiDataProperty];
                }
                else {
                    console.error("Error fetching data:", "Property '".concat(_this._config.apiDataProperty, "' not found in response"));
                    return;
                }
            }
            _this._config.items = data;
        })
            .catch(function (error) {
            console.error("Error fetching data:", error);
            // Handle error (e.g., display an error message)
        })
            .finally(function () {
            _this._config.isLoading = false; // Hide loading indicator
        });
    };
    KTSelectState.prototype.getItems = function () {
        return this._config.items || [];
    };
    KTSelectState.prototype.setItemsFromOptions = function (options) {
        this._config.items = options.map(function (option) { return ({
            id: option.value,
            title: option.textContent || '',
            // Add other properties from option element if needed
        }); });
    };
    KTSelectState.prototype.getConfig = function () {
        return this._config;
    };
    KTSelectState.prototype.setSelectedOptions = function (value) {
        if (this._config.multiple && typeof value === 'string' && !this._selectedOptions.includes(value)) {
            this._selectedOptions.push(value);
        }
        else if (!this._config.multiple) {
            // For single select, replace the previous selection with the new one
            this._selectedOptions = typeof value === 'string' ? [value] : [value[0]];
        }
        else if (this._config.multiple && Array.isArray(value)) {
            // For multiple select with array input, use the provided array
            this._selectedOptions = __spreadArray([], value, true);
        }
    };
    KTSelectState.prototype.toggleSelectedOptions = function (value) {
        if (!this._config.multiple) {
            // For non-multiple, always set the new value
            this._selectedOptions = [value];
            return;
        }
        // For multiple selection, toggle the value
        var index = this._selectedOptions.indexOf(value);
        if (index > -1) {
            this._selectedOptions.splice(index, 1);
        }
        else {
            this._selectedOptions.push(value);
        }
    };
    KTSelectState.prototype.getSelectedOptions = function () {
        return this._selectedOptions;
    };
    KTSelectState.prototype.isSelected = function (value) {
        return this._selectedOptions.includes(value);
    };
    KTSelectState.prototype.modifyConfig = function (config) {
        this._config = __assign(__assign({}, this._config), config);
    };
    return KTSelectState;
}());
exports.KTSelectState = KTSelectState;
exports.SelectOptionDefaultConfig = {
    description: '',
    icon: null,
};


/***/ }),

/***/ "./src/components/select/dropdown.ts":
/*!*******************************************!*\
  !*** ./src/components/select/dropdown.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTSelectDropdown = void 0;
var core_1 = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/components/select/utils.ts");
/**
 * KTSelectDropdown
 *
 * A specialized dropdown implementation for the KTSelect component.
 * This module handles the dropdown functionality for the select component,
 * including positioning, showing/hiding, and keyboard navigation.
 */
var KTSelectDropdown = /** @class */ (function (_super) {
    __extends(KTSelectDropdown, _super);
    /**
     * Constructor
     * @param element The parent element (select wrapper)
     * @param toggleElement The element that triggers the dropdown
     * @param dropdownElement The dropdown content element
     * @param config The configuration options
     */
    function KTSelectDropdown(element, toggleElement, dropdownElement, config) {
        var _this = _super.call(this) || this;
        _this._name = 'select-dropdown';
        // State
        _this._isOpen = false;
        _this._isTransitioning = false;
        _this._popperInstance = null;
        _this._element = element;
        _this._toggleElement = toggleElement;
        _this._dropdownElement = dropdownElement;
        _this._config = config;
        _this._eventManager = new utils_1.EventManager();
        _this._focusManager = new utils_1.FocusManager(dropdownElement);
        _this._setupEventListeners();
        return _this;
    }
    /**
     * Set up event listeners for the dropdown
     */
    KTSelectDropdown.prototype._setupEventListeners = function () {
        // Toggle click
        this._eventManager.addListener(this._toggleElement, 'click', this._handleToggleClick.bind(this));
        // Keyboard navigation
        this._eventManager.addListener(this._element, 'keydown', this._handleKeyDown.bind(this));
        // Close on outside click
        this._eventManager.addListener(document, 'click', this._handleOutsideClick.bind(this));
    };
    /**
     * Handle toggle element click
     */
    KTSelectDropdown.prototype._handleToggleClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.toggle();
    };
    /**
     * Handle keyboard events
     */
    KTSelectDropdown.prototype._handleKeyDown = function (event) {
        if (!this._isOpen)
            return;
        switch (event.key) {
            case 'Escape':
                event.preventDefault();
                this.close();
                this._toggleElement.focus();
                break;
            case 'ArrowDown':
                event.preventDefault();
                this._focusManager.focusNext();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this._focusManager.focusPrevious();
                break;
            case 'Home':
                event.preventDefault();
                // Focus first visible option
                var firstOption = this._focusManager.getVisibleOptions()[0];
                if (firstOption) {
                    this._focusManager.applyFocus(firstOption);
                    this._focusManager.scrollIntoView(firstOption);
                }
                break;
            case 'End':
                event.preventDefault();
                // Focus last visible option
                var visibleOptions = this._focusManager.getVisibleOptions();
                var lastOption = visibleOptions[visibleOptions.length - 1];
                if (lastOption) {
                    this._focusManager.applyFocus(lastOption);
                    this._focusManager.scrollIntoView(lastOption);
                }
                break;
        }
    };
    /**
     * Handle clicks outside the dropdown
     */
    KTSelectDropdown.prototype._handleOutsideClick = function (event) {
        if (!this._isOpen)
            return;
        var target = event.target;
        if (!this._element.contains(target) &&
            !this._dropdownElement.contains(target)) {
            this.close();
        }
    };
    /**
     * Initialize the Popper instance for dropdown positioning
     */
    KTSelectDropdown.prototype._initPopper = function () {
        // Destroy existing popper instance if it exists
        this._destroyPopper();
        // Default offset
        var offsetValue = '0, 5';
        // Get configuration options
        var placement = this._config.dropdownPlacement || 'bottom-start';
        var strategy = this._config.dropdownStrategy || 'fixed';
        var preventOverflow = this._config.dropdownPreventOverflow !== false;
        var flip = this._config.dropdownFlip !== false;
        // Create new popper instance
        this._popperInstance = (0, core_1.createPopper)(this._toggleElement, this._dropdownElement, {
            placement: placement,
            strategy: strategy,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: this._parseOffset(offsetValue),
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        boundary: 'viewport',
                        altAxis: preventOverflow,
                    },
                },
                {
                    name: 'flip',
                    options: {
                        enabled: flip,
                        fallbackPlacements: ['top-start', 'bottom-end', 'top-end'],
                    },
                },
            ],
        });
    };
    /**
     * Parse offset string into an array of numbers
     */
    KTSelectDropdown.prototype._parseOffset = function (offset) {
        return offset
            .split(',')
            .map(function (value) { return parseInt(value.trim(), 10); });
    };
    /**
     * Destroy the Popper instance
     */
    KTSelectDropdown.prototype._destroyPopper = function () {
        if (this._popperInstance) {
            this._popperInstance.destroy();
            this._popperInstance = null;
        }
    };
    /**
     * Update dropdown position
     */
    KTSelectDropdown.prototype.updatePosition = function () {
        if (this._popperInstance) {
            this._popperInstance.update();
        }
    };
    /**
     * Toggle the dropdown
     */
    KTSelectDropdown.prototype.toggle = function () {
        if (this._isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Open the dropdown
     */
    KTSelectDropdown.prototype.open = function () {
        var _this = this;
        if (this._isOpen || this._isTransitioning)
            return;
        // Fire before show event
        var beforeShowEvent = new CustomEvent('kt.select.dropdown.show', {
            bubbles: true,
            cancelable: true,
        });
        this._element.dispatchEvent(beforeShowEvent);
        if (beforeShowEvent.defaultPrevented)
            return;
        // Begin opening transition
        this._isTransitioning = true;
        // Set initial styles
        this._dropdownElement.style.display = 'block';
        this._dropdownElement.style.opacity = '0';
        // Make sure the element is visible for transitioning
        dom_1.default.reflow(this._dropdownElement);
        // Apply z-index if configured
        if (this._config.dropdownZindex) {
            this._dropdownElement.style.zIndex = this._config.dropdownZindex.toString();
        }
        else {
            // Auto-calculate z-index
            var parentZindex = dom_1.default.getHighestZindex(this._element);
            if (parentZindex) {
                this._dropdownElement.style.zIndex = (parentZindex + 1).toString();
            }
        }
        // Initialize popper for positioning
        this._initPopper();
        // Add active classes
        this._dropdownElement.classList.remove('hidden');
        this._dropdownElement.classList.add('open');
        this._toggleElement.classList.add('active');
        this._toggleElement.setAttribute('aria-expanded', 'true');
        // Start transition
        this._dropdownElement.style.opacity = '1';
        // Handle transition end
        dom_1.default.transitionEnd(this._dropdownElement, function () {
            _this._isTransitioning = false;
            _this._isOpen = true;
            // Focus the first item if search is enabled
            if (_this._config.enableSearch) {
                var searchInput = _this._dropdownElement.querySelector('input[type="search"]');
                if (searchInput) {
                    searchInput.focus();
                }
                else {
                    _this._focusFirstOption();
                }
            }
            else {
                _this._focusFirstOption();
            }
            // Fire after show event
            var afterShowEvent = new CustomEvent('kt.select.dropdown.shown', {
                bubbles: true,
            });
            _this._element.dispatchEvent(afterShowEvent);
        });
    };
    /**
     * Focus the first option in the dropdown
     */
    KTSelectDropdown.prototype._focusFirstOption = function () {
        var firstOption = this._focusManager.getVisibleOptions()[0];
        if (firstOption) {
            this._focusManager.applyFocus(firstOption);
            this._focusManager.scrollIntoView(firstOption);
        }
    };
    /**
     * Close the dropdown
     */
    KTSelectDropdown.prototype.close = function () {
        var _this = this;
        if (!this._isOpen || this._isTransitioning)
            return;
        // Fire before hide event
        var beforeHideEvent = new CustomEvent('kt.select.dropdown.hide', {
            bubbles: true,
            cancelable: true,
        });
        this._element.dispatchEvent(beforeHideEvent);
        if (beforeHideEvent.defaultPrevented)
            return;
        // Begin closing transition
        this._isTransitioning = true;
        // Start transition
        this._dropdownElement.style.opacity = '0';
        // Handle transition end
        dom_1.default.transitionEnd(this._dropdownElement, function () {
            // Remove active classes
            _this._dropdownElement.classList.add('hidden');
            _this._dropdownElement.classList.remove('open');
            _this._toggleElement.classList.remove('active');
            _this._toggleElement.setAttribute('aria-expanded', 'false');
            // Reset styles
            _this._dropdownElement.style.display = 'none';
            _this._dropdownElement.style.opacity = '';
            _this._dropdownElement.style.zIndex = '';
            // Destroy popper
            _this._destroyPopper();
            // Update state
            _this._isTransitioning = false;
            _this._isOpen = false;
            // Fire after hide event
            var afterHideEvent = new CustomEvent('kt.select.dropdown.hidden', {
                bubbles: true,
            });
            _this._element.dispatchEvent(afterHideEvent);
        });
    };
    /**
     * Check if dropdown is open
     */
    KTSelectDropdown.prototype.isOpen = function () {
        return this._isOpen;
    };
    /**
     * Clean up component
     */
    KTSelectDropdown.prototype.dispose = function () {
        // Destroy popper
        this._destroyPopper();
        // Remove event listeners
        this._eventManager.removeAllListeners(this._element);
        this._eventManager.removeAllListeners(this._toggleElement);
        this._eventManager.removeAllListeners(document);
        // Clean up state
        this._isOpen = false;
        this._isTransitioning = false;
        // Remove data reference
        data_1.default.remove(this._element, this._name);
    };
    return KTSelectDropdown;
}(component_1.default));
exports.KTSelectDropdown = KTSelectDropdown;


/***/ }),

/***/ "./src/components/select/index.ts":
/*!****************************************!*\
  !*** ./src/components/select/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventManager = exports.FocusManager = exports.filterOptions = exports.KTSelectDropdown = exports.KTSelectTags = exports.KTSelectSearch = exports.KTSelectCombobox = exports.KTSelectRemote = exports.KTSelect = void 0;
var select_1 = __webpack_require__(/*! ./select */ "./src/components/select/select.ts");
Object.defineProperty(exports, "KTSelect", ({ enumerable: true, get: function () { return select_1.KTSelect; } }));
var remote_1 = __webpack_require__(/*! ./remote */ "./src/components/select/remote.ts");
Object.defineProperty(exports, "KTSelectRemote", ({ enumerable: true, get: function () { return remote_1.KTSelectRemote; } }));
var combobox_1 = __webpack_require__(/*! ./combobox */ "./src/components/select/combobox.ts");
Object.defineProperty(exports, "KTSelectCombobox", ({ enumerable: true, get: function () { return combobox_1.KTSelectCombobox; } }));
var search_1 = __webpack_require__(/*! ./search */ "./src/components/select/search.ts");
Object.defineProperty(exports, "KTSelectSearch", ({ enumerable: true, get: function () { return search_1.KTSelectSearch; } }));
var tags_1 = __webpack_require__(/*! ./tags */ "./src/components/select/tags.ts");
Object.defineProperty(exports, "KTSelectTags", ({ enumerable: true, get: function () { return tags_1.KTSelectTags; } }));
var dropdown_1 = __webpack_require__(/*! ./dropdown */ "./src/components/select/dropdown.ts");
Object.defineProperty(exports, "KTSelectDropdown", ({ enumerable: true, get: function () { return dropdown_1.KTSelectDropdown; } }));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/components/select/utils.ts");
Object.defineProperty(exports, "filterOptions", ({ enumerable: true, get: function () { return utils_1.filterOptions; } }));
Object.defineProperty(exports, "FocusManager", ({ enumerable: true, get: function () { return utils_1.FocusManager; } }));
Object.defineProperty(exports, "EventManager", ({ enumerable: true, get: function () { return utils_1.EventManager; } }));


/***/ }),

/***/ "./src/components/select/option.ts":
/*!*****************************************!*\
  !*** ./src/components/select/option.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTSelectOption = void 0;
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var templates_1 = __webpack_require__(/*! ./templates */ "./src/components/select/templates.ts");
var KTSelectOption = /** @class */ (function (_super) {
    __extends(KTSelectOption, _super);
    function KTSelectOption(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'select-option';
        // Always initialize a new option instance
        _this._init(element);
        _this._buildConfig();
        _this._globalConfig = config;
        // Don't store in KTData to avoid Singleton pattern issues
        // Each option should be a unique instance
        element.instance = _this;
        return _this;
    }
    KTSelectOption.prototype.getHTMLOptionElement = function () {
        return this._element;
    };
    KTSelectOption.prototype.render = function () {
        var optionElement = this.getHTMLOptionElement();
        var theme = templates_1.Templates.getTheme();
        // Use the global config if available, or create a minimal valid config
        var config = this._globalConfig || { height: 250 };
        // Create a new option element every time
        return templates_1.defaultTemplates.option(optionElement, config, theme);
    };
    return KTSelectOption;
}(component_1.default));
exports.KTSelectOption = KTSelectOption;


/***/ }),

/***/ "./src/components/select/remote.ts":
/*!*****************************************!*\
  !*** ./src/components/select/remote.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTSelectRemote = void 0;
/**
 * KTSelectRemote class
 * Handles fetching remote data for the KTSelect component
 */
var KTSelectRemote = /** @class */ (function () {
    /**
     * Constructor
     * @param config KTSelect configuration
     * @param element The select element
     */
    function KTSelectRemote(config, element) {
        this._isLoading = false;
        this._hasError = false;
        this._errorMessage = '';
        this._currentPage = 1;
        this._totalPages = 1;
        this._lastQuery = '';
        this._element = null;
        this._cachedData = new Map(); // Cache for API responses
        this._config = config;
        this._element = element || null;
    }
    /**
     * Fetch data from remote URL
     * @param query Optional search query
     * @param page Page number for pagination
     * @param forceRefresh Whether to bypass cache and force a refresh
     * @returns Promise with fetched items
     */
    KTSelectRemote.prototype.fetchData = function (query, page, forceRefresh) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (forceRefresh === void 0) { forceRefresh = false; }
        var cacheKey = "".concat(query || '', ":").concat(page);
        // Check cache first if not forcing refresh
        if (!forceRefresh && this._cachedData.has(cacheKey)) {
            console.log('Using cached data for query:', query, 'page:', page);
            return Promise.resolve(this._cachedData.get(cacheKey) || []);
        }
        this._isLoading = true;
        this._hasError = false;
        this._errorMessage = '';
        this._lastQuery = query || '';
        this._currentPage = page;
        var url = this._buildUrl(query, page);
        console.log('Fetching remote data from:', url);
        // Dispatch search start event
        this._dispatchEvent('remoteSearchStart');
        return fetch(url)
            .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error! Status: ".concat(response.status));
            }
            return response.json();
        })
            .then(function (data) {
            // Process the data
            var processedData = _this._processData(data);
            // Cache the processed data
            _this._cachedData.set(cacheKey, processedData);
            return processedData;
        })
            .catch(function (error) {
            console.error('Error fetching remote data:', error);
            _this._hasError = true;
            _this._errorMessage = _this._config.remoteErrorMessage || 'Failed to load data';
            return [];
        })
            .finally(function () {
            _this._isLoading = false;
            // Dispatch search end event
            _this._dispatchEvent('remoteSearchEnd');
        });
    };
    /**
     * Dispatch custom events to notify about search state changes
     * @param eventName Name of the event to dispatch
     */
    KTSelectRemote.prototype._dispatchEvent = function (eventName) {
        if (!this._element)
            return;
        var event = new CustomEvent("ktselect.".concat(eventName), {
            bubbles: true,
            detail: {
                query: this._lastQuery,
                isLoading: this._isLoading,
                hasError: this._hasError,
                errorMessage: this._errorMessage
            }
        });
        this._element.dispatchEvent(event);
    };
    /**
     * Build the URL for the API request
     * @param query Search query
     * @param page Page number
     * @returns Fully formed URL
     */
    KTSelectRemote.prototype._buildUrl = function (query, page) {
        if (page === void 0) { page = 1; }
        var url = this._config.dataUrl;
        if (!url) {
            console.error("No URL specified for remote data");
            return '';
        }
        // Add parameters
        var params = new URLSearchParams();
        // Add search parameter if provided
        if (query && this._config.searchParam) {
            params.append(this._config.searchParam, query);
        }
        // Add pagination parameters if enabled
        if (this._config.pagination) {
            var limitParam = this._config.paginationLimitParam || 'limit';
            var pageParam = this._config.paginationPageParam || 'page';
            var limit = this._config.paginationLimit || 10;
            params.append(limitParam, limit.toString());
            params.append(pageParam, page.toString());
        }
        // Append parameters to URL if there are any
        var paramsString = params.toString();
        if (paramsString) {
            url += (url.includes('?') ? '&' : '?') + paramsString;
        }
        return url;
    };
    /**
     * Process the API response data
     * @param data API response data
     * @returns Array of KTSelectOptionData
     */
    KTSelectRemote.prototype._processData = function (data) {
        var _this = this;
        try {
            console.log('Processing API response:', data);
            var processedData = data;
            // Extract data from the API property if specified
            if (this._config.apiDataProperty && data[this._config.apiDataProperty]) {
                console.log("Extracting data from property: ".concat(this._config.apiDataProperty));
                // If pagination metadata is available, extract it
                if (this._config.pagination) {
                    if (data.total_pages) {
                        this._totalPages = data.total_pages;
                        console.log("Total pages found: ".concat(this._totalPages));
                    }
                    if (data.total) {
                        this._totalPages = Math.ceil(data.total / (this._config.paginationLimit || 10));
                        console.log("Calculated total pages: ".concat(this._totalPages, " from total: ").concat(data.total));
                    }
                }
                processedData = data[this._config.apiDataProperty];
            }
            // Ensure data is an array
            if (!Array.isArray(processedData)) {
                console.warn('Remote data is not an array:', processedData);
                return [];
            }
            console.log("Mapping ".concat(processedData.length, " items to KTSelectOptionData format"));
            // Map data to KTSelectOptionData format
            var mappedData = processedData.map(function (item) {
                var mappedItem = _this._mapItemToOption(item);
                console.log("Mapped item: ".concat(item.id || 'unknown', " => ").concat(mappedItem.id, ":").concat(mappedItem.title));
                return mappedItem;
            });
            console.log("Returned ".concat(mappedData.length, " mapped items"));
            return mappedData;
        }
        catch (error) {
            console.error('Error processing remote data:', error);
            this._hasError = true;
            this._errorMessage = 'Error processing data';
            return [];
        }
    };
    /**
     * Map a data item to KTSelectOptionData format
     * @param item Data item from API
     * @returns KTSelectOptionData object
     */
    KTSelectRemote.prototype._mapItemToOption = function (item) {
        // Get the field mapping from config with fallbacks for common field names
        var valueField = this._config.dataValueField || 'id';
        var labelField = this._config.dataFieldText || 'title';
        var descriptionField = this._config.dataFieldDescription || 'description';
        var iconField = this._config.dataFieldIcon || 'icon';
        console.log("Mapping fields: value=".concat(valueField, ", label=").concat(labelField, ", description=").concat(descriptionField));
        console.log('Item data:', JSON.stringify(item).substring(0, 200) + '...'); // Trimmed for readability
        // Extract values using dot notation if needed
        var getValue = function (obj, path) {
            if (!path)
                return null;
            // Handle dot notation to access nested properties
            var result = path.split('.').reduce(function (prev, curr) {
                return prev && prev[curr] !== undefined ? prev[curr] : null;
            }, obj);
            console.log("Extracting [".concat(path, "] => ").concat(result !== null ? JSON.stringify(result) : 'null'));
            return result;
        };
        // Try to get a usable ID, with fallbacks
        var id = getValue(item, valueField);
        id = id !== null ? String(id) : (item.id ? String(item.id) : '');
        console.log("ID field [".concat(valueField, "]:"), id);
        // Try to get a usable title, with fallbacks
        var title = getValue(item, labelField);
        title = title !== null ? String(title) : '';
        console.log("Title/label field [".concat(labelField, "]:"), title);
        // If title is still empty, try common field names
        if (!title) {
            // Try common field names if the configured one doesn't work
            if (item.name)
                title = String(item.name);
            else if (item.title)
                title = String(item.title);
            else if (item.label)
                title = String(item.label);
            else if (item.text)
                title = String(item.text);
            console.log('After fallback checks, title:', title);
        }
        // Get description - make sure we don't pass null, undefined, or "null" string values
        var description = getValue(item, descriptionField);
        if (description === null || description === undefined || String(description) === 'null' || String(description) === 'undefined') {
            description = null;
        }
        else {
            description = String(description);
        }
        // Try to get an icon - make sure we don't pass null, undefined, or "null" string values
        var icon = getValue(item, iconField);
        if (icon === null || icon === undefined || String(icon) === 'null' || String(icon) === 'undefined') {
            icon = null;
        }
        else {
            icon = String(icon);
        }
        // Create the option object with non-empty values
        var result = {
            id: id || '',
            title: title || 'Unnamed option',
            description: description,
            icon: icon
        };
        console.log('Final mapped item:', result);
        return result;
    };
    /**
     * Load the next page of results
     * @returns Promise with fetched items
     */
    KTSelectRemote.prototype.loadNextPage = function () {
        if (this._currentPage < this._totalPages) {
            return this.fetchData(this._lastQuery, this._currentPage + 1);
        }
        return Promise.resolve([]);
    };
    /**
     * Check if there are more pages available
     * @returns Boolean indicating if more pages exist
     */
    KTSelectRemote.prototype.hasMorePages = function () {
        return this._currentPage < this._totalPages;
    };
    /**
     * Get loading state
     * @returns Boolean indicating if data is loading
     */
    KTSelectRemote.prototype.isLoading = function () {
        return this._isLoading;
    };
    /**
     * Get error state
     * @returns Boolean indicating if there was an error
     */
    KTSelectRemote.prototype.hasError = function () {
        return this._hasError;
    };
    /**
     * Get error message
     * @returns Error message
     */
    KTSelectRemote.prototype.getErrorMessage = function () {
        return this._errorMessage;
    };
    /**
     * Reset the remote data state
     */
    KTSelectRemote.prototype.reset = function () {
        this._isLoading = false;
        this._hasError = false;
        this._errorMessage = '';
        this._currentPage = 1;
        this._totalPages = 1;
        this._lastQuery = '';
    };
    /**
     * Set the select element for event dispatching
     * @param element The select element
     */
    KTSelectRemote.prototype.setElement = function (element) {
        this._element = element;
    };
    return KTSelectRemote;
}());
exports.KTSelectRemote = KTSelectRemote;


/***/ }),

/***/ "./src/components/select/search.ts":
/*!*****************************************!*\
  !*** ./src/components/select/search.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTSelectSearch = void 0;
var templates_1 = __webpack_require__(/*! ./templates */ "./src/components/select/templates.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/components/select/utils.ts");
var KTSelectSearch = /** @class */ (function () {
    function KTSelectSearch(select) {
        this._noResultsElement = null;
        this._originalOptionContents = new Map();
        this._select = select;
        this._searchInput = select.getSearchInput();
        this._eventManager = new utils_1.EventManager();
        // Initialize focus manager after dropdown element is available
        this._focusManager = new utils_1.FocusManager(this._select.getDropdownElement());
        // Create bound handler references to allow proper cleanup
        this._boundKeyNavHandler = this._handleKeyboardNavigation.bind(this);
        // Bind the search input handler with context
        this.handleSearchInput = this._handleSearchInput.bind(this);
        // Cache original option contents for later restoration
        this._cacheOriginalOptionContents();
    }
    KTSelectSearch.prototype.init = function () {
        var _this = this;
        if (this._select.getConfig().enableSearch) {
            this._searchInput = this._select.getSearchInput();
            if (this._searchInput) {
                console.log('Initializing search module with input:', this._searchInput);
                // First remove any existing listeners to prevent duplicates
                this._removeEventListeners();
                // Add the event listener
                this._eventManager.addListener(this._searchInput, 'input', this.handleSearchInput);
                // Add blur event listener to ensure highlights are cleared when focus is lost
                this._eventManager.addListener(this._searchInput, 'blur', function () {
                    if (!_this._searchInput.value) {
                        _this._resetAllOptions();
                    }
                });
                // Listen for remote search events to coordinate with remote search functionality
                if (this._select.getConfig().remote && this._select.getConfig().searchParam) {
                    this._select.getElement().addEventListener('ktselect.remoteSearchStart', function () {
                        // Reset focused option when remote search starts
                        _this._focusManager.resetFocus();
                    });
                    this._select.getElement().addEventListener('ktselect.remoteSearchEnd', function () {
                        // After remote search completes, refresh our option cache
                        _this.refreshOptionCache();
                    });
                }
                // Add keyboard navigation for search results
                // This is stopping event propagation to prevent conflicts
                this._eventManager.addListener(this._searchInput, 'keydown', this._boundKeyNavHandler);
                // Listen for dropdown close to reset options if search is empty
                this._select.getElement().addEventListener('dropdown.close', function () {
                    _this._focusManager.resetFocus();
                    if (!_this._searchInput.value) {
                        _this._resetAllOptions();
                    }
                });
                // Clear highlights when an option is selected
                this._select.getElement().addEventListener('ktselect.change', function () {
                    _this.clearSearchHighlights();
                    // Close dropdown if configured to do so
                    if (_this._select.getConfig().closeOnSelect && !_this._select.getConfig().multiple) {
                        _this._select.closeDropdown();
                    }
                });
                // Autofocus on search input
                if (this._select.getConfig().searchAutofocus) {
                    this._select.getElement().addEventListener('dropdown.show', function () {
                        setTimeout(function () {
                            var _a;
                            // Add slight delay to ensure the dropdown and search input are visible
                            (_a = _this._searchInput) === null || _a === void 0 ? void 0 : _a.focus();
                        }, 50);
                    });
                }
            }
        }
    };
    /**
     * Remove event listeners to prevent memory leaks or duplicates
     */
    KTSelectSearch.prototype._removeEventListeners = function () {
        if (this._searchInput) {
            this._eventManager.removeAllListeners(this._searchInput);
        }
    };
    /**
     * Handle keyboard navigation for search results
     */
    KTSelectSearch.prototype._handleKeyboardNavigation = function (event) {
        var _this = this;
        // Stop propagation to prevent multiple handlers from firing
        event.stopPropagation();
        console.log('Search module keydown:', event.key);
        var visibleOptions = this._focusManager.getVisibleOptions();
        if (visibleOptions.length === 0)
            return;
        // Use the shared keyboard navigation handler with custom callbacks
        (0, utils_1.handleDropdownKeyNavigation)(event, this._select, {
            multiple: this._select.getConfig().multiple,
            closeOnSelect: this._select.getConfig().closeOnSelect
        }, {
            onArrowDown: function () { return _this._focusManager.focusNext(); },
            onArrowUp: function () { return _this._focusManager.focusPrevious(); },
            onEnter: function () { return _this._selectFocusedOption(); },
            onClose: function () {
                if (event.key === 'Escape') {
                    _this.clearSearchHighlights();
                }
            }
        });
    };
    /**
     * Select the currently focused option
     */
    KTSelectSearch.prototype._selectFocusedOption = function () {
        var focusedOption = this._focusManager.getFocusedOption();
        if (focusedOption) {
            var optionValue = focusedOption.getAttribute('data-value');
            if (optionValue) {
                // Trigger the selection in the main select component
                this._select['_selectOption'](optionValue);
            }
        }
    };
    /**
     * Store original HTML content of all options for later restoration
     * This prevents losing formatting when clearing search
     */
    KTSelectSearch.prototype._cacheOriginalOptionContents = function () {
        var _this = this;
        // Wait for options to be initialized
        setTimeout(function () {
            var options = Array.from(_this._select.getOptionsElement());
            options.forEach(function (option) {
                var value = option.getAttribute('data-value');
                if (value) {
                    _this._originalOptionContents.set(value, option.innerHTML);
                }
            });
        }, 0);
    };
    KTSelectSearch.prototype._handleSearchInput = function (event) {
        var query = event.target.value.toLowerCase();
        var config = this._select.getConfig();
        // Reset focused option when search changes
        this._focusManager.resetFocus();
        // For remote search, we don't filter locally
        // The KTSelect component will handle the remote search
        if (config.remote && config.searchParam) {
            // If query is too short, reset all options to visible state
            if (query.length < config.searchMinLength) {
                this._resetAllOptions();
                this._clearNoResultsMessage();
            }
            // Otherwise, let KTSelect handle remote search
            return;
        }
        // For local search
        if (query.length >= config.searchMinLength) {
            this._filterOptions(query);
        }
        else {
            this._resetAllOptions();
            this._clearNoResultsMessage();
        }
    };
    KTSelectSearch.prototype._filterOptions = function (query) {
        var _this = this;
        var options = Array.from(this._select.getOptionsElement());
        var config = this._select.getConfig();
        var dropdownElement = this._select.getDropdownElement();
        // Cache original option HTML if not already cached
        if (this._originalOptionContents.size === 0) {
            this._cacheOriginalOptionContents();
        }
        // Use the shared filterOptions utility
        (0, utils_1.filterOptions)(options, query, config, dropdownElement, function (visibleCount) { return _this._handleNoResults(visibleCount); });
        // Apply specialized text highlighting if needed
        if (config.searchHighlight && query.trim() !== '') {
            this._applyHighlightToDisplay(query);
        }
    };
    /**
     * Apply highlighting to the display element for multi-select
     */
    KTSelectSearch.prototype._applyHighlightToDisplay = function (query) {
        // Implementation for display highlighting
    };
    /**
     * Reset all options to their original state
     */
    KTSelectSearch.prototype._resetAllOptions = function () {
        var _this = this;
        // Show all options and reset their HTML content
        var options = Array.from(this._select.getOptionsElement());
        options.forEach(function (option) {
            option.style.display = 'block';
            // Restore from cache if available (fastest approach)
            var value = option.getAttribute('data-value');
            if (value && _this._originalOptionContents.has(value)) {
                option.innerHTML = _this._originalOptionContents.get(value);
            }
        });
    };
    /**
     * Handle the case when no results are found
     */
    KTSelectSearch.prototype._handleNoResults = function (visibleOptionsCount) {
        if (visibleOptionsCount === 0) {
            this._showNoResultsMessage();
        }
        else {
            this._clearNoResultsMessage();
        }
    };
    KTSelectSearch.prototype._showNoResultsMessage = function () {
        if (!this._noResultsElement) {
            var config = this._select.getConfig();
            var theme = templates_1.Templates.getTheme();
            this._noResultsElement = templates_1.defaultTemplates.noResults(config, theme);
            var optionsContainer = this._select.getDropdownElement().querySelector('[data-kt-select-options-container]');
            if (optionsContainer) {
                optionsContainer.appendChild(this._noResultsElement);
            }
            else {
                this._select.getDropdownElement().appendChild(this._noResultsElement);
            }
        }
    };
    KTSelectSearch.prototype._clearNoResultsMessage = function () {
        if (this._noResultsElement) {
            this._noResultsElement.remove();
            this._noResultsElement = null;
        }
    };
    /**
     * Public method to explicitly clear all search highlights
     * Can be called when needed from outside
     */
    KTSelectSearch.prototype.clearSearchHighlights = function () {
        if (this._searchInput) {
            this._searchInput.value = '';
        }
        this._resetAllOptions();
        this._clearNoResultsMessage();
        // Also clear highlights from the display element
        this._clearDisplayHighlights();
    };
    /**
     * Clear any highlights from the display element (selected values)
     */
    KTSelectSearch.prototype._clearDisplayHighlights = function () {
        // Implementation for clearing display highlights
    };
    /**
     * Refresh option cache after remote data is loaded
     * This ensures that search highlighting works correctly with new options
     */
    KTSelectSearch.prototype.refreshOptionCache = function () {
        var _this = this;
        // Clear existing cache
        this._originalOptionContents.clear();
        // Re-cache all options
        var options = Array.from(this._select.getOptionsElement());
        options.forEach(function (option) {
            var value = option.getAttribute('data-value');
            if (value) {
                _this._originalOptionContents.set(value, option.innerHTML);
            }
        });
    };
    /**
     * Destroy the search module and clean up
     */
    KTSelectSearch.prototype.destroy = function () {
        this._removeEventListeners();
        this._originalOptionContents.clear();
    };
    return KTSelectSearch;
}());
exports.KTSelectSearch = KTSelectSearch;


/***/ }),

/***/ "./src/components/select/select.ts":
/*!*****************************************!*\
  !*** ./src/components/select/select.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTSelect = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var config_1 = __webpack_require__(/*! ./config */ "./src/components/select/config.ts");
var option_1 = __webpack_require__(/*! ./option */ "./src/components/select/option.ts");
var remote_1 = __webpack_require__(/*! ./remote */ "./src/components/select/remote.ts");
var search_1 = __webpack_require__(/*! ./search */ "./src/components/select/search.ts");
var templates_1 = __webpack_require__(/*! ./templates */ "./src/components/select/templates.ts");
var combobox_1 = __webpack_require__(/*! ./combobox */ "./src/components/select/combobox.ts");
var dropdown_1 = __webpack_require__(/*! ./dropdown */ "./src/components/select/dropdown.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/components/select/utils.ts");
var tags_1 = __webpack_require__(/*! ./tags */ "./src/components/select/tags.ts");
var types_1 = __webpack_require__(/*! ./types */ "./src/components/select/types.ts");
var KTSelect = /** @class */ (function (_super) {
    __extends(KTSelect, _super);
    /**
     * Constructor: Initializes the select component
     */
    function KTSelect(element, config) {
        var _this = _super.call(this) || this;
        // Core properties
        _this._name = 'select';
        // State
        _this._dropdownIsOpen = false;
        _this._comboboxModule = null;
        _this._tagsModule = null;
        _this._dropdownModule = null;
        _this._loadMoreIndicator = null;
        // Search debounce timeout
        _this._searchDebounceTimeout = null;
        // Store original options HTML for restoring after search
        _this._originalOptionsHtml = null;
        if (data_1.default.has(element, _this._name)) {
            return _this;
        }
        _this._init(element);
        _this._buildConfig(config);
        _this._state = new config_1.KTSelectState(_this._config);
        _this._config = _this._state.getConfig();
        element.instance = _this;
        // Initialize event manager
        _this._eventManager = new utils_1.EventManager();
        // Initialize remote module if remote data is enabled
        if (_this._config.remote) {
            _this._remoteModule = new remote_1.KTSelectRemote(_this._config, _this._element);
            _this._initializeRemoteData();
        }
        else {
            _this._state
                .setItems()
                .then(function () {
                console.log('Setting up component after remote data is loaded');
                _this._setupComponent();
            })
                .catch(function (error) {
                console.error('Error setting items:', error);
                // Handle the error, e.g., display an error message to the user
            });
        }
        return _this;
    }
    /**
     * Initialize remote data fetching
     */
    KTSelect.prototype._initializeRemoteData = function () {
        var _this = this;
        if (!this._remoteModule || !this._config.remote)
            return;
        console.log('Initializing remote data with URL:', this._config.dataUrl);
        // Show loading state
        this._renderLoadingState();
        // Fetch remote data
        this._remoteModule.fetchData()
            .then(function (items) {
            console.log('Remote data fetched:', items);
            // Remove placeholder/loading options before setting new items
            _this._clearExistingOptions();
            // Update state with fetched items
            _this._state.setItems(items)
                .then(function () {
                // Generate options from the fetched data
                _this._generateOptionsHtml(_this._element);
                console.log('Generating options HTML from remote data');
                _this._setupComponent();
                _this._renderLoadedState();
                // Add pagination "Load More" button if needed
                if (_this._config.pagination && _this._remoteModule.hasMorePages()) {
                    _this._addLoadMoreButton();
                }
            })
                .catch(function (error) {
                console.error('Error setting items:', error);
                _this._renderErrorState(error.message || 'Failed to load data');
            });
        })
            .catch(function (error) {
            console.error('Error fetching remote data:', error);
            _this._renderErrorState(_this._remoteModule.getErrorMessage() || 'Failed to load data');
        });
    };
    /**
     * Clear existing options from the select element
     */
    KTSelect.prototype._clearExistingOptions = function () {
        // Keep only the empty/placeholder option and remove the rest
        var options = Array.from(this._element.querySelectorAll('option:not([value=""])'));
        options.forEach(function (option) { return option.remove(); });
        // Ensure we have at least an empty option
        if (this._element.querySelectorAll('option').length === 0) {
            var emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = this._config.placeholder || 'Select...';
            this._element.appendChild(emptyOption);
        }
    };
    /**
     * Render loading state in dropdown
     */
    KTSelect.prototype._renderLoadingState = function () {
        // Create temporary loading option if the select is empty
        if (this._element.querySelectorAll('option').length <= 1) {
            var loadingOption = document.createElement('option');
            loadingOption.value = '';
            loadingOption.textContent = 'Loading...';
            loadingOption.disabled = true;
            loadingOption.selected = true;
            this._element.appendChild(loadingOption);
        }
    };
    /**
     * Render loaded state
     */
    KTSelect.prototype._renderLoadedState = function () {
        // Remove any loading options
        var loadingOptions = this._element.querySelectorAll('option[disabled]:not([value])');
        loadingOptions.forEach(function (option) {
            if (option.textContent === 'Loading...') {
                option.remove();
            }
        });
    };
    /**
     * Render error state
     * @param message Error message
     */
    KTSelect.prototype._renderErrorState = function (message) {
        // Create error option if the select is empty
        if (this._element.querySelectorAll('option').length <= 1) {
            // Remove any loading options first
            var loadingOptions = this._element.querySelectorAll('option[disabled]:not([value])');
            loadingOptions.forEach(function (option) { return option.remove(); });
            // Add error option
            var errorOption = document.createElement('option');
            errorOption.value = '';
            errorOption.textContent = message;
            errorOption.disabled = true;
            errorOption.selected = true;
            this._element.appendChild(errorOption);
        }
        // If dropdown is already created, show error message there
        if (this._dropdownContentElement) {
            // Remove any existing options
            var optionsContainer = this._dropdownContentElement.querySelector('[data-kt-select-options-container]');
            if (optionsContainer) {
                optionsContainer.innerHTML = "<div class=\"p-4 text-red-500\">".concat(message, "</div>");
            }
        }
        // Complete component setup even if there's an error
        if (!this._wrapperElement) {
            console.log('Setting up component after error');
            this._setupComponent();
        }
    };
    /**
     * Add "Load More" button for pagination
     */
    KTSelect.prototype._addLoadMoreButton = function () {
        if (!this._dropdownContentElement || !this._config.pagination)
            return;
        // Remove existing button if any
        if (this._loadMoreIndicator) {
            this._loadMoreIndicator.remove();
            this._loadMoreIndicator = null;
        }
        // Create load more button
        this._loadMoreIndicator = document.createElement('div');
        this._loadMoreIndicator.className = 'py-2 px-4 text-center text-gray-600 cursor-pointer hover:bg-gray-100';
        this._loadMoreIndicator.textContent = 'Load more...';
        this._loadMoreIndicator.setAttribute('data-kt-select-load-more', '');
        // Add to dropdown
        var optionsContainer = this._dropdownContentElement.querySelector('[data-kt-select-options-container]');
        if (optionsContainer) {
            optionsContainer.appendChild(this._loadMoreIndicator);
        }
        else {
            this._dropdownContentElement.appendChild(this._loadMoreIndicator);
        }
        // Add event listener
        this._loadMoreIndicator.addEventListener('click', this._handleLoadMore.bind(this));
    };
    /**
     * Handle load more button click
     */
    KTSelect.prototype._handleLoadMore = function () {
        var _this = this;
        if (!this._remoteModule || !this._config.pagination)
            return;
        // Show loading state
        if (this._loadMoreIndicator) {
            this._loadMoreIndicator.textContent = 'Loading...';
            this._loadMoreIndicator.classList.add('opacity-50');
            this._loadMoreIndicator.classList.remove('cursor-pointer', 'hover:bg-gray-100');
        }
        // Fetch next page
        this._remoteModule.loadNextPage()
            .then(function (newItems) {
            // Get existing items
            var existingItems = _this._state.getItems();
            // Combine new items with existing items
            _this._state.setItems(__spreadArray(__spreadArray([], existingItems, true), newItems, true))
                .then(function () {
                // Update options in the dropdown
                _this._updateOptionsInDropdown(newItems);
                // Check if there are more pages
                if (_this._remoteModule.hasMorePages()) {
                    // Reset load more button
                    if (_this._loadMoreIndicator) {
                        _this._loadMoreIndicator.textContent = 'Load more...';
                        _this._loadMoreIndicator.classList.remove('opacity-50');
                        _this._loadMoreIndicator.classList.add('cursor-pointer', 'hover:bg-gray-100');
                    }
                }
                else {
                    // Remove load more button if no more pages
                    if (_this._loadMoreIndicator) {
                        _this._loadMoreIndicator.remove();
                        _this._loadMoreIndicator = null;
                    }
                }
            })
                .catch(function (error) {
                console.error('Error updating items:', error);
                // Reset load more button
                if (_this._loadMoreIndicator) {
                    _this._loadMoreIndicator.textContent = 'Error loading more items';
                    _this._loadMoreIndicator.classList.remove('opacity-50');
                    _this._loadMoreIndicator.classList.add('cursor-pointer', 'hover:bg-gray-100');
                }
            });
        })
            .catch(function (error) {
            console.error('Error loading more items:', error);
            // Reset load more button
            if (_this._loadMoreIndicator) {
                _this._loadMoreIndicator.textContent = 'Error loading more items';
                _this._loadMoreIndicator.classList.remove('opacity-50');
                _this._loadMoreIndicator.classList.add('cursor-pointer', 'hover:bg-gray-100');
            }
        });
    };
    /**
     * Update options in the dropdown
     * @param newItems New items to add to the dropdown
     */
    KTSelect.prototype._updateOptionsInDropdown = function (newItems) {
        var _this = this;
        if (!this._dropdownContentElement || !newItems.length)
            return;
        var optionsContainer = this._dropdownContentElement.querySelector('[data-kt-select-options-container]');
        if (!optionsContainer)
            return;
        // Get the load more button
        var loadMoreButton = optionsContainer.querySelector('[data-kt-select-load-more]');
        // Process each new item
        newItems.forEach(function (item) {
            // Create option for the original select
            var selectOption = document.createElement('option');
            selectOption.value = item.id || '';
            selectOption.textContent = item.title || 'Unnamed option';
            // Add description and icon attributes if available and valid
            if (item.description && item.description !== 'null' && item.description !== 'undefined') {
                selectOption.setAttribute('data-kt-select-option-description', item.description);
            }
            if (item.icon && item.icon !== 'null' && item.icon !== 'undefined') {
                selectOption.setAttribute('data-kt-select-option-icon', item.icon);
            }
            // Add the option to the original select element
            _this._element.appendChild(selectOption);
            // Create option element for the dropdown using the KTSelectOption class
            // This ensures consistent option rendering
            var ktOption = new option_1.KTSelectOption(selectOption, _this._config);
            var renderedOption = ktOption.render();
            // Add to dropdown container
            if (loadMoreButton) {
                // Insert before the load more button
                optionsContainer.insertBefore(renderedOption, loadMoreButton);
            }
            else {
                // Append to the end
                optionsContainer.appendChild(renderedOption);
            }
        });
        // Update options NodeList to include the new options
        this._options = this._wrapperElement.querySelectorAll("[data-kt-select-option]");
        console.log("Added ".concat(newItems.length, " more options to dropdown"));
    };
    /**
     * ========================================================================
     * INITIALIZATION METHODS
     * ========================================================================
     */
    /**
     * Set up the component after everything is initialized
     */
    KTSelect.prototype._setupComponent = function () {
        // Setup HTML structure
        this._createHtmlStructure();
        this._setupElementReferences();
        this._initZIndex();
        // Initialize options
        this._initializeOptionsHtml();
        this._preSelectOptions(this._element);
        // Apply disabled state if needed
        this._applyInitialDisabledState();
        // Initialize search if enabled
        if (this._config.enableSearch) {
            this._initializeSearchModule();
        }
        // Initialize combobox if enabled
        if (this._config.mode === types_1.SelectMode.COMBOBOX) {
            this._comboboxModule = new combobox_1.KTSelectCombobox(this);
        }
        // Initialize tags if enabled
        if (this._config.mode === types_1.SelectMode.TAGS) {
            this._tagsModule = new tags_1.KTSelectTags(this);
        }
        // Initialize focus manager after dropdown element is created
        this._focusManager = new utils_1.FocusManager(this._dropdownContentElement);
        // Initialize dropdown module after all elements are created
        this._dropdownModule = new dropdown_1.KTSelectDropdown(this._wrapperElement, this._displayElement, this._dropdownContentElement, this._config);
        // Update display and set ARIA attributes
        this._updateDisplayAndAriaAttributes();
        this.updateSelectedOptionDisplay();
        this._setAriaAttributes();
        // Attach event listeners after all modules are initialized
        this._attachEventListeners();
        // Add flag to indicate initialization is complete
        this._addInitializationFlag();
        this._addKeyboardNavigationStyles();
    };
    /**
     * Initialize options HTML from data
     */
    KTSelect.prototype._initializeOptionsHtml = function () {
        this._generateOptionsHtml(this._element);
    };
    /**
     * Creates the HTML structure for the select component
     */
    KTSelect.prototype._createHtmlStructure = function () {
        var _this = this;
        var options = Array.from(this._element.querySelectorAll('option'));
        console.log('Options found:', options.length, options.map(function (opt) { return opt.textContent; }));
        var theme = templates_1.Templates.getTheme();
        // Create wrapper and display elements
        var wrapperElement = templates_1.defaultTemplates.main(this._config, theme);
        var displayElement = templates_1.defaultTemplates.display(this._config, theme);
        // Add the display element to the wrapper
        wrapperElement.appendChild(displayElement);
        // Create an empty dropdown first (without options)
        var dropdownElement = document.createElement('div');
        dropdownElement.setAttribute('data-kt-select-dropdown-content', '');
        dropdownElement.className = "".concat(theme.dropdown, " hidden");
        if (this._config.dropdownZindex) {
            dropdownElement.style.zIndex = this._config.dropdownZindex.toString();
        }
        // Add search input if needed
        var isCombobox = this._config.mode === types_1.SelectMode.COMBOBOX;
        var hasSearch = this._config.enableSearch && !isCombobox;
        if (hasSearch) {
            var searchElement = templates_1.defaultTemplates.search(this._config, theme);
            dropdownElement.appendChild(searchElement);
        }
        // Create options container
        var optionsContainer = document.createElement('ul');
        optionsContainer.setAttribute('role', 'listbox');
        optionsContainer.setAttribute('aria-label', this._config.label || 'Options');
        optionsContainer.setAttribute('data-kt-select-options-container', '');
        optionsContainer.style.maxHeight = "".concat(this._config.height, "px");
        optionsContainer.style.overflowY = 'auto';
        // Add each option directly to the container
        options.forEach(function (optionElement) {
            // Skip empty placeholder options (only if BOTH value AND text are empty)
            // This allows options with empty value but visible text to display in dropdown
            if (optionElement.value === '' && optionElement.textContent.trim() === '') {
                return;
            }
            // Create new KTSelectOption instance for each option
            var selectOption = new option_1.KTSelectOption(optionElement, _this._config);
            var renderedOption = selectOption.render();
            // Append directly to options container
            optionsContainer.appendChild(renderedOption);
        });
        // Add options container to dropdown
        dropdownElement.appendChild(optionsContainer);
        // Add dropdown to wrapper
        wrapperElement.appendChild(dropdownElement);
        // Insert after the original element
        this._element.after(wrapperElement);
        this._element.style.display = 'none';
        // Add CSS for keyboard navigation
        this._addKeyboardNavigationStyles();
    };
    /**
     * Add CSS styles for keyboard navigation
     */
    KTSelect.prototype._addKeyboardNavigationStyles = function () {
        // Check if styles already exist
        if (document.getElementById('kt-select-keyboard-styles')) {
            return;
        }
        // Create style element
        var style = document.createElement('style');
        style.id = 'kt-select-keyboard-styles';
        // TODO: Styles will be moved to the component's CSS file
        style.textContent = "\n\t\t\t[data-kt-select-option].hovered,\n\t\t\t[data-kt-select-option].option-focused {\n\t\t\t\tbackground-color: #f3f4f6;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.dark [data-kt-select-option].hovered,\n\t\t\t.dark [data-kt-select-option].option-focused {\n\t\t\t\tbackground-color: #374151;\n\t\t\t}\n\t\t\t[data-kt-select-option].option-focused {\n\t\t\t\toutline: 2px solid #e5e7eb;\n\t\t\t}\n\t\t\t.dark [data-kt-select-option].option-focused {\n\t\t\t\toutline: 2px solid #4b5563;\n\t\t\t}\n\n\t\t\t/* Style for selected option */\n\t\t\t[data-kt-select-option].selected {\n\t\t\t\tbackground-color: #e5e7eb;\n\t\t\t\tfont-weight: 500;\n\t\t\t}\n\t\t\t.dark [data-kt-select-option].selected {\n\t\t\t\tbackground-color: #4b5563;\n\t\t\t}\n\n\t\t\t/* Combined styles for both focused and selected */\n\t\t\t[data-kt-select-option].option-focused.selected {\n\t\t\t\tbackground-color: #dbeafe;\n\t\t\t\toutline: 2px solid #bfdbfe;\n\t\t\t}\n\t\t\t.dark [data-kt-select-option].option-focused.selected {\n\t\t\t\tbackground-color: #1e40af;\n\t\t\t\toutline: 2px solid #3b82f6;\n\t\t\t}\n\t\t";
        document.head.appendChild(style);
    };
    /**
     * Setup all element references after DOM is created
     */
    KTSelect.prototype._setupElementReferences = function () {
        this._wrapperElement = this._element.nextElementSibling;
        // Get display element
        this._displayElement = this._wrapperElement.querySelector("[data-kt-select-display]");
        // Get dropdown content element - this is critical for dropdown functionality
        this._dropdownContentElement = this._wrapperElement.querySelector("[data-kt-select-dropdown-content]");
        if (!this._dropdownContentElement) {
            console.error('Dropdown content element not found', this._wrapperElement);
        }
        // Get search input element - this is used for the search functionality
        // First check if it's in dropdown, then check if it's in display (for combobox)
        this._searchInputElement = this._dropdownContentElement.querySelector("[data-kt-select-search]");
        // If not found in dropdown, check if it's the display element itself (for combobox)
        if (!this._searchInputElement && this._config.mode === types_1.SelectMode.COMBOBOX) {
            this._searchInputElement = this._displayElement;
        }
        console.log('Search input found:', this._searchInputElement ? 'Yes' : 'No', 'Mode:', this._config.mode, 'EnableSearch:', this._config.enableSearch);
        this._valueDisplayElement = this._wrapperElement.querySelector("[data-kt-select-value]");
        this._options = this._wrapperElement.querySelectorAll("[data-kt-select-option]");
    };
    /**
     * Attach all event listeners to elements
     */
    KTSelect.prototype._attachEventListeners = function () {
        // Document level event listeners
        document.addEventListener('click', this._handleDocumentClick.bind(this));
        document.addEventListener('keydown', this._handleEscKey.bind(this));
        // Dropdown option click events
        this._eventManager.addListener(this._dropdownContentElement, 'click', this._handleDropdownOptionClick.bind(this));
        // Only attach click handler to display element
        this._eventManager.addListener(this._displayElement, 'click', this._handleDropdownClick.bind(this));
        // Only attach keyboard navigation to display element if NOT in combobox mode
        // This prevents conflicts with the combobox module's keyboard handler
        if (this._config.mode !== types_1.SelectMode.COMBOBOX) {
            console.log('Attaching keyboard navigation to display element (non-combobox mode)');
            this._eventManager.addListener(this._displayElement, 'keydown', this._handleDropdownKeyDown.bind(this));
        }
    };
    /**
     * Initialize search module if search is enabled
     */
    KTSelect.prototype._initializeSearchModule = function () {
        if (this._config.enableSearch) {
            this._searchModule = new search_1.KTSelectSearch(this);
            this._searchModule.init();
            // If remote search is enabled, add event listener for search input
            if (this._config.remote && this._config.searchParam && this._searchInputElement) {
                this._searchInputElement.addEventListener('input', this._handleRemoteSearch.bind(this));
            }
        }
    };
    /**
     * Apply ARIA attributes and update display
     */
    KTSelect.prototype._updateDisplayAndAriaAttributes = function () {
        this.updateSelectedOptionDisplay();
        this._setAriaAttributes();
    };
    /**
     * Apply initial disabled state if configured
     */
    KTSelect.prototype._applyInitialDisabledState = function () {
        if (this._config.disabled) {
            this.getElement().classList.add('disabled');
            this.getElement().setAttribute('disabled', 'disabled');
            this._wrapperElement.classList.add('disabled');
        }
    };
    /**
     * Add initialization flag to mark component as initialized
     */
    KTSelect.prototype._addInitializationFlag = function () {
        this._wrapperElement.classList.add('select-initialized');
    };
    /**
     * Generate options HTML from data items
     */
    KTSelect.prototype._generateOptionsHtml = function (element) {
        var _this = this;
        var items = this._state.getItems() || [];
        console.log("Generating options HTML from ".concat(items.length, " items"));
        // Only modify options if we have items to replace them with
        if (items && items.length > 0) {
            // Clear existing options except the first empty one
            var options = element.querySelectorAll('option:not(:first-child)');
            options.forEach(function (option) { return option.remove(); });
            // Generate options from data
            items.forEach(function (item) {
                var optionElement = document.createElement('option');
                // Get value - use item.id directly if available, otherwise try dataValueField
                var value = '';
                if (item.id !== undefined) {
                    value = String(item.id);
                }
                else if (_this._config.dataValueField) {
                    var extractedValue = _this._getValueByKey(item, _this._config.dataValueField);
                    value = extractedValue !== null ? String(extractedValue) : '';
                }
                // Get label - use item.title directly if available, otherwise try dataFieldText
                var label = '';
                if (item.title !== undefined) {
                    label = String(item.title);
                }
                else if (_this._config.dataFieldText) {
                    var extractedLabel = _this._getValueByKey(item, _this._config.dataFieldText);
                    label = extractedLabel !== null ? String(extractedLabel) : 'Unnamed option';
                }
                // Get description - skip if null, undefined, or "null" string
                var description = null;
                if (item.description !== undefined && item.description !== null &&
                    String(item.description) !== 'null' && String(item.description) !== 'undefined') {
                    description = String(item.description);
                }
                else if (_this._config.dataFieldDescription) {
                    var extractedDesc = _this._getValueByKey(item, _this._config.dataFieldDescription);
                    if (extractedDesc !== null && extractedDesc !== undefined &&
                        String(extractedDesc) !== 'null' && String(extractedDesc) !== 'undefined') {
                        description = String(extractedDesc);
                    }
                }
                // Get icon - skip if null, undefined, or "null" string
                var icon = null;
                if (item.icon !== undefined && item.icon !== null &&
                    String(item.icon) !== 'null' && String(item.icon) !== 'undefined') {
                    icon = String(item.icon);
                }
                else if (_this._config.dataFieldIcon) {
                    var extractedIcon = _this._getValueByKey(item, _this._config.dataFieldIcon);
                    if (extractedIcon !== null && extractedIcon !== undefined &&
                        String(extractedIcon) !== 'null' && String(extractedIcon) !== 'undefined') {
                        icon = String(extractedIcon);
                    }
                }
                // Log the extracted values for debugging
                console.log("Option: value=".concat(value, ", label=").concat(label, ", desc=").concat(description ? description : 'none', ", icon=").concat(icon ? icon : 'none'));
                // Set option attributes
                optionElement.value = value;
                optionElement.textContent = label || 'Unnamed option';
                if (description) {
                    optionElement.setAttribute('data-kt-select-option-description', description);
                }
                if (icon) {
                    optionElement.setAttribute('data-kt-select-option-icon', icon);
                }
                if (item.selected) {
                    optionElement.setAttribute('selected', 'selected');
                }
                element.appendChild(optionElement);
            });
            console.log("Added ".concat(items.length, " options to select element"));
        }
        else {
            console.log('No items to generate options from');
        }
    };
    /**
     * Extract nested property value from object using dot notation
     */
    KTSelect.prototype._getValueByKey = function (obj, key) {
        if (!key || !obj)
            return null;
        // Use reduce to walk through the object by splitting the key on dots
        var result = key
            .split('.')
            .reduce(function (o, k) { return (o && o[k] !== undefined ? o[k] : null); }, obj);
        console.log("Extracting [".concat(key, "] from object => ").concat(result !== null ? JSON.stringify(result) : 'null'));
        return result;
    };
    /**
     * Pre-select options that have the selected attribute
     */
    KTSelect.prototype._preSelectOptions = function (element) {
        var _this = this;
        // Handle options with selected attribute
        Array.from(element.querySelectorAll('option[selected]')).forEach(function (option) {
            var value = option.value;
            _this._selectOption(value);
        });
        // Handle data-kt-select-pre-selected attribute for React compatibility
        var preSelectedValues = element.getAttribute('data-kt-select-pre-selected');
        if (preSelectedValues) {
            var values = preSelectedValues.split(',').map(function (v) { return v.trim(); });
            values.forEach(function (value) {
                if (value) {
                    _this._selectOption(value);
                }
            });
        }
    };
    /**
     * Set appropriate z-index for dropdown
     */
    KTSelect.prototype._initZIndex = function () {
        var zindex = this._config.dropdownZindex;
        if (parseInt(dom_1.default.getCssProp(this._dropdownContentElement, 'z-index')) >
            zindex) {
            zindex = parseInt(dom_1.default.getCssProp(this._dropdownContentElement, 'z-index'));
        }
        if (dom_1.default.getHighestZindex(this._wrapperElement) > zindex) {
            zindex = dom_1.default.getHighestZindex(this._wrapperElement) + 1;
        }
        this._dropdownContentElement.style.zIndex = String(zindex);
    };
    /**
     * ========================================================================
     * DROPDOWN MANAGEMENT
     * ========================================================================
     */
    /**
     * Toggle dropdown visibility
     */
    KTSelect.prototype.toggleDropdown = function () {
        if (this._dropdownModule) {
            this._dropdownModule.toggle();
            this._dropdownIsOpen = this._dropdownModule.isOpen();
        }
    };
    /**
     * Open the dropdown if it's closed
     */
    KTSelect.prototype.openDropdown = function () {
        if (this._dropdownModule && !this._dropdownIsOpen) {
            // Fire before show event
            var event_1 = new CustomEvent('kt.select.show', {
                bubbles: true,
                cancelable: true,
            });
            this._element.dispatchEvent(event_1);
            if (event_1.defaultPrevented) {
                return;
            }
            // Make sure all options are visible when opening the dropdown
            // But skip regenerating options for remote data if they're already loaded
            if (!this._config.remote ||
                !this._dropdownContentElement.querySelector('[data-kt-select-option]')) {
                this.showAllOptions();
            }
            else {
                console.log('Preserving existing remote options in dropdown');
            }
            // Open the dropdown
            this._dropdownModule.open();
            this._dropdownIsOpen = true;
            // Focus selected option if applicable
            this._focusSelectedOption();
            // Update dropdown position
            this.updateDropdownPosition();
            // Set ARIA attributes
            this._setAriaAttributes();
            // Fire after show event
            this._element.dispatchEvent(new CustomEvent('kt.select.shown', {
                bubbles: true,
            }));
        }
    };
    /**
     * Close the dropdown if it's open
     */
    KTSelect.prototype.closeDropdown = function () {
        if (this._dropdownModule && this._dropdownIsOpen) {
            // Fire before hide event
            var event_2 = new CustomEvent('kt.select.hide', {
                bubbles: true,
                cancelable: true,
            });
            this._element.dispatchEvent(event_2);
            if (event_2.defaultPrevented) {
                return;
            }
            // Close the dropdown
            this._dropdownModule.close();
            this._dropdownIsOpen = false;
            // Set ARIA attributes
            this._setAriaAttributes();
            // Fire after hide event
            this._element.dispatchEvent(new CustomEvent('kt.select.hidden', {
                bubbles: true,
            }));
        }
    };
    /**
     * Update dropdown position
     */
    KTSelect.prototype.updateDropdownPosition = function () {
        if (this._dropdownModule) {
            this._dropdownModule.updatePosition();
        }
    };
    /**
     * Focus on the first selected option if any exists in the dropdown
     */
    KTSelect.prototype._focusSelectedOption = function () {
        // Get selected options
        var selectedOptions = this.getSelectedOptions();
        if (selectedOptions.length === 0)
            return;
        // Get the first selected option element
        var firstSelectedValue = selectedOptions[0];
        // Use the FocusManager to focus on the option
        this._focusManager.focusOptionByValue(firstSelectedValue);
    };
    /**
     * ========================================================================
     * SELECTION MANAGEMENT
     * ========================================================================
     */
    /**
     * Select an option by value
     */
    KTSelect.prototype._selectOption = function (value) {
        // Get current selection state
        var isSelected = this._state.isSelected(value);
        // Toggle selection in state
        if (this._config.multiple) {
            // Toggle in multiple mode
            this._state.toggleSelectedOptions(value);
        }
        else {
            // Set as only selection in single mode
            this._state.setSelectedOptions(value);
        }
        // Update the original select element's option selected state
        var optionEl = Array.from(this._element.querySelectorAll('option')).find(function (opt) { return opt.value === value; });
        if (optionEl) {
            if (this._config.multiple) {
                // Toggle the selection for multiple select
                optionEl.selected = !isSelected;
            }
            else {
                // Set as only selection for single select
                Array.from(this._element.querySelectorAll('option')).forEach(function (opt) {
                    opt.selected = opt.value === value;
                });
            }
        }
        // Update the visual display of selected options
        this.updateSelectedOptionDisplay();
        // Update option classes without re-rendering the dropdown content
        this._updateSelectedOptionClass();
        // Dispatch standard and custom change events
        var changeEvent = new Event('change', { bubbles: true });
        this._element.dispatchEvent(changeEvent);
        // Dispatch custom ktselect.change event with detailed information
        var customEvent = new CustomEvent('ktselect.change', {
            bubbles: true,
            detail: {
                value: value,
                selected: !isSelected,
                selectedOptions: this.getSelectedOptions()
            }
        });
        this._element.dispatchEvent(customEvent);
    };
    /**
     * Update selected option display value
     */
    KTSelect.prototype.updateSelectedOptionDisplay = function () {
        var _this = this;
        var selectedOptions = this.getSelectedOptions();
        if (this._config.renderSelected) {
            // Use the custom renderSelected function if provided
            this._updateValueDisplay(this._config.renderSelected(selectedOptions));
        }
        else {
            if (selectedOptions.length === 0) {
                if (this._config.mode !== types_1.SelectMode.COMBOBOX) {
                    this._updateValueDisplay(this._config.placeholder); // Use innerHTML for placeholder
                }
            }
            else if (this._config.multiple) {
                if (this._config.mode === types_1.SelectMode.TAGS) {
                    // Use the tags module to render selected options as tags
                    if (this._tagsModule) {
                        this._tagsModule.updateTagsDisplay(selectedOptions);
                    }
                    else {
                        // Fallback if tags module not initialized for some reason
                        this._updateValueDisplay(selectedOptions.join(', '));
                    }
                }
                else {
                    // Render as comma-separated values
                    var displayText = selectedOptions
                        .map(function (option) { return _this._getOptionInnerHtml(option) || ''; })
                        .join(', ');
                    this._updateValueDisplay(displayText);
                }
            }
            else {
                var selectedOption = selectedOptions[0];
                if (selectedOption) {
                    var selectedText = this._getOptionInnerHtml(selectedOption);
                    this._updateValueDisplay(selectedText);
                    // Update combobox input value if in combobox mode
                    if (this._config.mode === types_1.SelectMode.COMBOBOX && this._comboboxModule) {
                        this._comboboxModule.updateSelectedValue(selectedText);
                    }
                }
                else {
                    this._updateValueDisplay(this._config.placeholder);
                }
            }
        }
        // Update any debug display boxes if they exist
        this._updateDebugDisplays();
    };
    /**
     * Update the value display element
     */
    KTSelect.prototype._updateValueDisplay = function (value) {
        if (this._config.mode === types_1.SelectMode.COMBOBOX) {
            // For combobox, we only update the hidden value element, not the input
            // The combobox module will handle updating the input value
            if (!this._comboboxModule) {
                this._valueDisplayElement.value = value;
            }
        }
        else {
            this._valueDisplayElement.innerHTML = value;
        }
    };
    /**
     * Update debug displays if present
     */
    KTSelect.prototype._updateDebugDisplays = function () {
        // Check if we're in a test environment with debug boxes
        var selectId = this.getElement().id;
        if (selectId) {
            var debugElement = document.getElementById("".concat(selectId, "-value"));
            if (debugElement) {
                var selectedOptions = this.getSelectedOptions();
                // Format display based on selection mode
                if (this._config.multiple) {
                    // For multiple selection, show comma-separated list
                    debugElement.textContent = selectedOptions.length > 0 ?
                        selectedOptions.join(', ') : 'None';
                }
                else {
                    // For single selection, show just the one value
                    debugElement.textContent = selectedOptions.length > 0 ?
                        selectedOptions[0] : 'None';
                }
            }
        }
    };
    /**
     * Get option inner HTML content by option value
     */
    KTSelect.prototype._getOptionInnerHtml = function (optionValue) {
        var option = Array.from(this._options).find(function (opt) { return opt.dataset.value === optionValue; });
        if (this._config.mode == types_1.SelectMode.COMBOBOX) {
            return option.textContent;
        }
        return option.innerHTML; // Get the entire HTML content of the option
    };
    /**
     * Update CSS classes for selected options
     */
    KTSelect.prototype._updateSelectedOptionClass = function () {
        var _this = this;
        // Get all options in the dropdown
        var allOptions = this._wrapperElement.querySelectorAll("[data-kt-select-option]");
        // Get currently selected options from state
        var selectedValues = this._state.getSelectedOptions();
        console.log('Updating selected classes for options, selected values:', selectedValues);
        // Keep track of options we've already processed (for duplicate option values)
        var processedOptionValues = new Set();
        // Update each option's selected state
        allOptions.forEach(function (option) {
            var optionValue = option.getAttribute('data-value');
            if (!optionValue)
                return;
            // For duplicate options (same value), only process the first one we encounter
            if (processedOptionValues.has(optionValue)) {
                // If this is a duplicate, remove it - this fixes the duplicate options issue
                if (_this._config.remote) {
                    // Only remove in remote data case (where duplicates are problematic)
                    option.remove();
                }
                return;
            }
            // Mark this option as processed
            processedOptionValues.add(optionValue);
            // Check if this option is in the selected values
            var isSelected = selectedValues.includes(optionValue);
            // Update class accordingly
            if (isSelected) {
                option.classList.add('selected');
                option.setAttribute('aria-selected', 'true');
            }
            else {
                option.classList.remove('selected');
                option.setAttribute('aria-selected', 'false');
            }
        });
    };
    /**
     * Clear all selected options
     */
    KTSelect.prototype.clearSelection = function () {
        // Clear the current selection
        this._state.setSelectedOptions([]);
        this.updateSelectedOptionDisplay();
        this._updateSelectedOptionClass();
        // For combobox, also clear the input value
        if (this._config.mode === types_1.SelectMode.COMBOBOX) {
            if (this._searchInputElement) {
                this._searchInputElement.value = '';
            }
            // If combobox has a clear button, hide it
            if (this._comboboxModule) {
                // The combobox module will handle hiding the clear button
                this._comboboxModule.resetInputValueToSelection();
            }
        }
        // Dispatch change event
        this._dispatchEvent('change');
        this._fireEvent('change');
    };
    /**
     * Set selected options programmatically
     */
    KTSelect.prototype.setSelectedOptions = function (options) {
        var values = Array.from(options).map(function (option) { return option.value; });
        this._state.setSelectedOptions(values);
    };
    /**
     * ========================================================================
     * KEYBOARD NAVIGATION
     * ========================================================================
     */
    /**
     * Handle dropdown key down events for keyboard navigation
     * Only used for standard (non-combobox) dropdowns
     */
    KTSelect.prototype._handleDropdownKeyDown = function (event) {
        // Log event for debugging
        console.log('Standard dropdown keydown:', event.key);
        // Use the shared handler
        (0, utils_1.handleDropdownKeyNavigation)(event, this, {
            multiple: this._config.multiple,
            closeOnSelect: this._config.closeOnSelect
        });
    };
    /**
     * Focus next option in dropdown
     */
    KTSelect.prototype._focusNextOption = function () {
        return this._focusManager.focusNext();
    };
    /**
     * Focus previous option in dropdown
     */
    KTSelect.prototype._focusPreviousOption = function () {
        return this._focusManager.focusPrevious();
    };
    /**
     * Apply hover/focus state to focused option
     */
    KTSelect.prototype._hoverFocusedOption = function (option) {
        this._focusManager.applyFocus(option);
    };
    /**
     * Scroll option into view when navigating
     */
    KTSelect.prototype._scrollOptionIntoView = function (option) {
        this._focusManager.scrollIntoView(option);
    };
    /**
     * Select the currently focused option
     */
    KTSelect.prototype.selectFocusedOption = function () {
        var _a, _b;
        var focusedOption = this._focusManager.getFocusedOption();
        if (focusedOption) {
            var selectedValue = focusedOption.dataset.value;
            // Extract just the title text, not including description
            var selectedText = '';
            var titleElement = focusedOption.querySelector('.option-title');
            if (titleElement) {
                // If it has a structured content with title element
                selectedText = ((_a = titleElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            }
            else {
                // Fallback to the whole text content
                selectedText = ((_b = focusedOption.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
            }
            // First trigger the selection to ensure state is updated properly
            if (selectedValue) {
                this._selectOption(selectedValue);
            }
            // For combobox mode, update input value AFTER selection to ensure consistency
            if (this._config.mode === types_1.SelectMode.COMBOBOX && this._comboboxModule) {
                this._comboboxModule.updateSelectedValue(selectedText);
                // Also directly update the input value for immediate visual feedback
                if (this._searchInputElement) {
                    this._searchInputElement.value = selectedText;
                }
            }
        }
    };
    /**
     * ========================================================================
     * COMBOBOX SPECIFIC METHODS
     * ========================================================================
     */
    /**
     * Handle combobox input events
     */
    KTSelect.prototype._handleComboboxInput = function (event) {
        if (this._comboboxModule) {
            return;
        }
        var inputElement = event.target;
        var query = inputElement.value.toLowerCase();
        // If dropdown isn't open, open it when user starts typing
        if (!this._dropdownIsOpen) {
            this.openDropdown();
        }
        // Filter options based on input
        this._filterOptionsForCombobox(query);
    };
    /**
     * Filter options for combobox based on input query
     * Uses the shared filterOptions function
     */
    KTSelect.prototype._filterOptionsForCombobox = function (query) {
        var options = Array.from(this._dropdownContentElement.querySelectorAll('[data-kt-select-option]'));
        (0, utils_1.filterOptions)(options, query, this._config, this._dropdownContentElement);
    };
    /**
     * ========================================================================
     * EVENT HANDLERS
     * ========================================================================
     */
    /**
     * Handle display element click
     */
    KTSelect.prototype._handleDropdownClick = function (event) {
        console.log('Display element clicked', event.target);
        event.preventDefault();
        event.stopPropagation(); // Prevent event bubbling
        this.toggleDropdown();
    };
    /**
     * Handle click within the dropdown
     */
    KTSelect.prototype._handleDropdownOptionClick = function (event) {
        var optionElement = event.target.closest("[".concat(this._config.optionSelector, "]"));
        // If an option is clicked, handle the option click
        if (optionElement) {
            this._handleOptionClick(event);
        }
    };
    /**
     * Handle clicking on an option in the dropdown
     */
    KTSelect.prototype._handleOptionClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        // Find the clicked option element
        var clickedOption = event.target.closest("[".concat(this._config.optionSelector, "]"));
        if (!clickedOption)
            return;
        // Check if the option is disabled
        if (clickedOption.getAttribute('aria-disabled') === 'true') {
            return;
        }
        // Use dataset.value to get the option value
        var optionValue = clickedOption.dataset.value;
        if (optionValue === undefined)
            return;
        console.log('Option clicked:', optionValue);
        // Use toggleSelection instead of _selectOption to prevent re-rendering
        this.toggleSelection(optionValue);
    };
    /**
     * Handle document click for closing dropdown
     */
    KTSelect.prototype._handleDocumentClick = function (event) {
        var targetElement = event.target;
        // Check if the click is outside the dropdown and the display element
        if (!this._wrapperElement.contains(targetElement)) {
            this.closeDropdown();
        }
    };
    /**
     * Handle escape key press
     */
    KTSelect.prototype._handleEscKey = function (event) {
        if (event.key === 'Escape' && this._dropdownIsOpen) {
            this.closeDropdown();
        }
    };
    /**
     * ========================================================================
     * ACCESSIBILITY METHODS
     * ========================================================================
     */
    /**
     * Set ARIA attributes for accessibility
     */
    KTSelect.prototype._setAriaAttributes = function () {
        this._displayElement.setAttribute('aria-expanded', this._dropdownIsOpen.toString());
    };
    /**
     * Handle focus events
     */
    KTSelect.prototype._handleFocus = function () {
        // Implementation pending
    };
    /**
     * Handle blur events
     */
    KTSelect.prototype._handleBlur = function () {
        // Implementation pending
    };
    /**
     * ========================================================================
     * PUBLIC API
     * ========================================================================
     */
    /**
     * Get the search input element
     */
    KTSelect.prototype.getSearchInput = function () {
        return this._searchInputElement;
    };
    /**
     * Get selected options
     */
    KTSelect.prototype.getSelectedOptions = function () {
        return this._state.getSelectedOptions();
    };
    /**
     * Get configuration
     */
    KTSelect.prototype.getConfig = function () {
        return this._config;
    };
    /**
     * Get option elements
     */
    KTSelect.prototype.getOptionsElement = function () {
        return this._options;
    };
    /**
     * Get dropdown element
     */
    KTSelect.prototype.getDropdownElement = function () {
        return this._dropdownContentElement;
    };
    /**
     * Get value display element
     */
    KTSelect.prototype.getValueDisplayElement = function () {
        return this._valueDisplayElement;
    };
    /**
     * Show all options in the dropdown
     */
    KTSelect.prototype.showAllOptions = function () {
        // If there are no remote data or options are already visible, just show all existing options
        if (!this._config.remote || this._dropdownIsOpen) {
            var options = Array.from(this.getOptionsElement());
            options.forEach(function (option) {
                option.style.display = 'block';
            });
            // If search input exists, clear it
            if (this._searchInputElement && this._config.mode !== types_1.SelectMode.COMBOBOX) {
                this._searchInputElement.value = '';
                // If we have a search module, clear any search filtering
                if (this._searchModule) {
                    this._searchModule.clearSearchHighlights();
                }
            }
            return;
        }
        // For remote data that's not yet loaded/visible, we may need to load options
        // But this should only happen on first open, not during selection changes
        console.log('Showing remote options - first dropdown open');
    };
    /**
     * Toggle multi-select functionality
     */
    KTSelect.prototype.enableMultiSelect = function () {
        this._state.modifyConfig({ multiple: true });
    };
    /**
     * Disable multi-select functionality
     */
    KTSelect.prototype.disableMultiSelect = function () {
        this._state.modifyConfig({ multiple: false });
    };
    /**
     * Toggle the selection of an option
     */
    KTSelect.prototype.toggleSelection = function (value) {
        // Get current selection state
        var isSelected = this._state.isSelected(value);
        // If already selected in single select mode, do nothing (can't deselect in single select)
        if (isSelected && !this._config.multiple) {
            return;
        }
        console.log("Toggling selection for option: ".concat(value, ", currently selected: ").concat(isSelected));
        // Toggle the selection in the state
        this._state.toggleSelectedOptions(value);
        // Update the original select element's option selected state
        var optionEl = Array.from(this._element.querySelectorAll('option')).find(function (opt) { return opt.value === value; });
        if (optionEl) {
            // For multiple select, toggle the 'selected' attribute
            if (this._config.multiple) {
                optionEl.selected = !isSelected;
            }
            else {
                // For single select, deselect all other options and select this one
                Array.from(this._element.querySelectorAll('option')).forEach(function (opt) {
                    opt.selected = opt.value === value;
                });
            }
        }
        // Update the display element value
        this.updateSelectedOptionDisplay();
        // Update option classes without re-rendering the dropdown content
        this._updateSelectedOptionClass();
        // Preserve options currently in the dropdown rather than re-fetching
        if (this._config.remote && this._dropdownIsOpen) {
            // Don't regenerate options for remote data - just update selection state
            console.log('Preserving remote options in dropdown after selection');
        }
        // If it's single select without multiple, close the dropdown
        if (!this._config.multiple && this._config.closeOnSelect) {
            this.closeDropdown();
        }
        // Dispatch change event
        var changeEvent = new Event('change', { bubbles: true });
        this._element.dispatchEvent(changeEvent);
        // Dispatch custom change event with additional data
        var customChangeEvent = new CustomEvent('ktselect.change', {
            bubbles: true,
            detail: {
                value: value,
                selected: !isSelected,
                selectedOptions: this.getSelectedOptions()
            }
        });
        this._element.dispatchEvent(customChangeEvent);
    };
    /**
     * Clean up all resources when the component is destroyed
     * This overrides the parent dispose method
     */
    KTSelect.prototype.dispose = function () {
        // Clean up event listeners
        this._eventManager.removeAllListeners(null);
        // Dispose modules
        if (this._dropdownModule) {
            this._dropdownModule.dispose();
        }
        if (this._comboboxModule) {
            if (typeof this._comboboxModule.destroy === 'function') {
                this._comboboxModule.destroy();
            }
        }
        if (this._tagsModule) {
            if (typeof this._tagsModule.destroy === 'function') {
                this._tagsModule.destroy();
            }
        }
        if (this._searchModule) {
            if (typeof this._searchModule.destroy === 'function') {
                this._searchModule.destroy();
            }
        }
        // Remove DOM elements
        if (this._wrapperElement && this._wrapperElement.parentNode) {
            this._wrapperElement.parentNode.removeChild(this._wrapperElement);
        }
        // Call parent dispose to clean up data
        _super.prototype.dispose.call(this);
    };
    /**
     * Create instances of KTSelect for all matching elements
     */
    KTSelect.createInstances = function () {
        var _this = this;
        var elements = document.querySelectorAll('[data-kt-select]');
        elements.forEach(function (element) {
            if (element.hasAttribute('data-kt-select') &&
                !element.classList.contains('select-initialized')) {
                var instance = new KTSelect(element);
                _this._instances.set(element, instance);
            }
        });
    };
    /**
     * Initialize all KTSelect instances
     */
    KTSelect.init = function () {
        KTSelect.createInstances();
    };
    /**
     * Handle remote search
     * @param event Input event
     */
    KTSelect.prototype._handleRemoteSearch = function (event) {
        var _this = this;
        if (!this._remoteModule || !this._config.remote || !this._config.searchParam)
            return;
        var query = event.target.value;
        // Check if the query is long enough
        if (query.length < (this._config.searchMinLength || 0)) {
            return;
        }
        // Debounce the search
        if (this._searchDebounceTimeout) {
            clearTimeout(this._searchDebounceTimeout);
        }
        this._searchDebounceTimeout = window.setTimeout(function () {
            // Show loading state
            _this._renderSearchLoadingState();
            // Fetch remote data with search query
            _this._remoteModule.fetchData(query)
                .then(function (items) {
                // Update state with fetched items
                _this._state.setItems(items)
                    .then(function () {
                    // Update options in the dropdown
                    _this._updateSearchResults(items);
                    // Refresh the search module's option cache if search is enabled
                    if (_this._searchModule && _this._config.enableSearch) {
                        _this._searchModule.refreshOptionCache();
                    }
                })
                    .catch(function (error) {
                    console.error('Error updating search results:', error);
                    _this._renderSearchErrorState(error.message || 'Failed to load search results');
                });
            })
                .catch(function (error) {
                console.error('Error fetching search results:', error);
                _this._renderSearchErrorState(_this._remoteModule.getErrorMessage() || 'Failed to load search results');
            });
        }, this._config.searchDebounce || 300);
    };
    /**
     * Render loading state for search
     */
    KTSelect.prototype._renderSearchLoadingState = function () {
        if (!this._dropdownContentElement)
            return;
        var optionsContainer = this._dropdownContentElement.querySelector('[data-kt-select-options-container]');
        if (!optionsContainer)
            return;
        // Save current options HTML
        if (!this._originalOptionsHtml) {
            this._originalOptionsHtml = optionsContainer.innerHTML;
        }
        // Show loading message
        optionsContainer.innerHTML = '<div class="p-4 text-gray-500">Searching...</div>';
    };
    /**
     * Render error state for search
     * @param message Error message
     */
    KTSelect.prototype._renderSearchErrorState = function (message) {
        if (!this._dropdownContentElement)
            return;
        var optionsContainer = this._dropdownContentElement.querySelector('[data-kt-select-options-container]');
        if (!optionsContainer)
            return;
        // Show error message
        optionsContainer.innerHTML = "<div class=\"p-4 text-red-500\">".concat(message, "</div>");
    };
    /**
     * Update search results in the dropdown
     * @param items Search result items
     */
    KTSelect.prototype._updateSearchResults = function (items) {
        var _this = this;
        if (!this._dropdownContentElement)
            return;
        var optionsContainer = this._dropdownContentElement.querySelector('[data-kt-select-options-container]');
        if (!optionsContainer)
            return;
        // Clear current options
        optionsContainer.innerHTML = '';
        if (items.length === 0) {
            // Show no results message
            optionsContainer.innerHTML = "<div class=\"p-4 text-gray-500\">".concat(this._config.searchNotFoundText || 'No results found', "</div>");
            return;
        }
        // Process each item individually to create options
        items.forEach(function (item) {
            // Create option for the original select
            var selectOption = document.createElement('option');
            selectOption.value = item.id;
            selectOption.textContent = item.title;
            if (item.description) {
                selectOption.setAttribute('data-kt-select-option-description', item.description);
            }
            if (item.icon) {
                selectOption.setAttribute('data-kt-select-option-icon', item.icon);
            }
            // Create option element for the dropdown
            var ktOption = new option_1.KTSelectOption(selectOption, _this._config);
            var renderedOption = ktOption.render();
            // Add to dropdown container
            optionsContainer.appendChild(renderedOption);
        });
        // Add pagination "Load More" button if needed
        if (this._config.pagination && this._remoteModule.hasMorePages()) {
            this._addLoadMoreButton();
        }
        // Update options NodeList
        this._options = this._wrapperElement.querySelectorAll("[data-kt-select-option]");
    };
    /**
     * Filter options by query
     */
    KTSelect.prototype.filterOptions = function (query) {
        this._filterOptionsForCombobox(query);
    };
    /**
     * Check if dropdown is open
     */
    KTSelect.prototype.isDropdownOpen = function () {
        return this._dropdownIsOpen;
    };
    /**
     * ========================================================================
     * STATIC METHODS
     * ========================================================================
     */
    KTSelect._instances = new Map();
    return KTSelect;
}(component_1.default));
exports.KTSelect = KTSelect;


/***/ }),

/***/ "./src/components/select/tags.ts":
/*!***************************************!*\
  !*** ./src/components/select/tags.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTSelectTags = void 0;
var templates_1 = __webpack_require__(/*! ./templates */ "./src/components/select/templates.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/components/select/utils.ts");
/**
 * KTSelectTags - Handles tags-specific functionality for KTSelect
 */
var KTSelectTags = /** @class */ (function () {
    /**
     * Constructor: Initializes the tags component
     */
    function KTSelectTags(select) {
        this._select = select;
        this._config = select.getConfig();
        this._valueDisplayElement = select.getValueDisplayElement();
        this._eventManager = new utils_1.EventManager();
        console.log('KTSelectTags initialized');
    }
    /**
     * Update selected tags display
     * Renders selected options as tags in the display element
     */
    KTSelectTags.prototype.updateTagsDisplay = function (selectedOptions) {
        var _this = this;
        // Clear existing content
        this._valueDisplayElement.innerHTML = '';
        // If no options selected, show placeholder
        if (selectedOptions.length === 0) {
            this._valueDisplayElement.textContent = this._config.placeholder || '';
            return;
        }
        // Create and append a tag element for each selected option
        selectedOptions.forEach(function (optionValue) {
            var tagElement = _this._createTagElement(optionValue);
            _this._valueDisplayElement.appendChild(tagElement);
        });
    };
    /**
     * Create tag element for a selected option
     */
    KTSelectTags.prototype._createTagElement = function (optionValue) {
        var _this = this;
        var optionLabel = this._getOptionLabel(optionValue);
        var theme = templates_1.Templates.getTheme();
        // Create a mock option object to pass to the tag template
        var mockOption = {
            id: optionValue,
            title: optionLabel,
            selected: true
        };
        // Use the tag template
        var tag = templates_1.defaultTemplates.tag(mockOption, this._config, theme);
        // Add event listener to the close button
        var closeButton = tag.querySelector("[data-kt-select-remove-button]");
        if (closeButton) {
            this._eventManager.addListener(closeButton, 'click', function (event) {
                event.stopPropagation();
                _this._removeTag(optionValue);
            });
        }
        return tag;
    };
    /**
     * Get the label/text for an option by its value
     */
    KTSelectTags.prototype._getOptionLabel = function (optionValue) {
        var _a, _b;
        // First look for an option element in the dropdown with matching value
        var optionElements = this._select.getOptionsElement();
        for (var _i = 0, _c = Array.from(optionElements); _i < _c.length; _i++) {
            var option = _c[_i];
            if (option.dataset.value === optionValue) {
                return ((_a = option.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || optionValue;
            }
        }
        // If not found in dropdown, look in original select element
        var originalOptions = this._select.getElement().querySelectorAll('option');
        for (var _d = 0, _e = Array.from(originalOptions); _d < _e.length; _d++) {
            var option = _e[_d];
            if (option.value === optionValue) {
                return ((_b = option.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || optionValue;
            }
        }
        // If still not found, return the value itself
        return optionValue;
    };
    /**
     * Remove a tag and its selection
     */
    KTSelectTags.prototype._removeTag = function (optionValue) {
        // Delegate to the select component to handle state changes
        this._select.toggleSelection(optionValue);
    };
    /**
     * Clean up resources used by this module
     */
    KTSelectTags.prototype.destroy = function () {
        this._eventManager.removeAllListeners(null);
    };
    return KTSelectTags;
}());
exports.KTSelectTags = KTSelectTags;


/***/ }),

/***/ "./src/components/select/templates.ts":
/*!********************************************!*\
  !*** ./src/components/select/templates.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {


var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Templates = exports.TemplateRegistry = exports.defaultTemplates = exports.defaultTheme = void 0;
exports._html = _html;
/**
 * Default theme using Tailwind-compatible classes
 */
exports.defaultTheme = {
    // Base container
    wrapper: "relative",
    // Display (trigger) element
    display: "flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400",
    displayActive: "border-blue-400 ring-2 ring-blue-200",
    displayDisabled: "bg-gray-100 opacity-70 cursor-not-allowed",
    // Dropdown
    dropdown: "absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto",
    dropdownOpen: "block",
    // Option elements
    option: "px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center",
    optionSelected: "bg-blue-50 font-medium",
    optionDisabled: "opacity-50 cursor-not-allowed",
    optionHighlighted: "bg-gray-100",
    // Option group
    optionGroup: "py-1",
    optionGroupHeader: "px-3 py-1 text-xs font-semibold text-gray-500 uppercase",
    // Search input
    searchWrapper: "px-3 py-2 border-b border-gray-200",
    search: "w-full border-none focus:outline-none text-sm",
    searchHighlight: "bg-yellow-100 font-medium",
    // Multi-select
    tag: "inline-flex items-center bg-blue-50 border border-blue-100 rounded px-2 py-1 text-sm mr-1 mb-1",
    tagRemove: "ml-1 text-blue-400 hover:text-blue-600 cursor-pointer",
    // States
    loading: "px-3 py-2 text-gray-500 italic",
    noResults: "px-3 py-2 text-gray-500"
};
/**
 * Default templates for KTSelect component
 */
exports.defaultTemplates = {
    /**
     * Renders the main container for the select component
     */
    main: function (config, theme) {
        return _html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div data-kt-select-wrapper class=\"", "\" data-kt-select-mode=\"", "\"></div>"], ["<div data-kt-select-wrapper class=\"", "\" data-kt-select-mode=\"", "\"></div>"])), theme.wrapper, config.mode || 'default');
    },
    /**
     * Renders the display element (trigger) for the select
     */
    display: function (config, theme) {
        var isCombobox = config.mode === 'combobox';
        if (isCombobox) {
            return _html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\t\t\t<div class=\"relative flex items-center w-full\">\n\t\t\t\t\t<input\n\t\t\t\t\t\tdata-kt-select-search\n\t\t\t\t\t\tdata-kt-select-display\n\t\t\t\t\t\tdata-kt-select-value\n\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\tclass=\"", "\"\n\t\t\t\t\t\tplaceholder=\"", "\"\n\t\t\t\t\t\trole=\"searchbox\"\n\t\t\t\t\t\taria-label=\"", "\"\n\t\t\t\t\t\t", "\n\t\t\t\t\t/>\n\t\t\t\t\t<button\n\t\t\t\t\t\ttype=\"button\"\n\t\t\t\t\t\tdata-kt-select-clear-button\n\t\t\t\t\t\tclass=\"absolute right-3 hidden text-gray-400 hover:text-gray-600\"\n\t\t\t\t\t\taria-label=\"Clear selection\">\n\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t\t\t\t\t\t<line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n\t\t\t\t\t\t\t<line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t"], ["\n\t\t\t\t<div class=\"relative flex items-center w-full\">\n\t\t\t\t\t<input\n\t\t\t\t\t\tdata-kt-select-search\n\t\t\t\t\t\tdata-kt-select-display\n\t\t\t\t\t\tdata-kt-select-value\n\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\tclass=\"", "\"\n\t\t\t\t\t\tplaceholder=\"", "\"\n\t\t\t\t\t\trole=\"searchbox\"\n\t\t\t\t\t\taria-label=\"", "\"\n\t\t\t\t\t\t", "\n\t\t\t\t\t/>\n\t\t\t\t\t<button\n\t\t\t\t\t\ttype=\"button\"\n\t\t\t\t\t\tdata-kt-select-clear-button\n\t\t\t\t\t\tclass=\"absolute right-3 hidden text-gray-400 hover:text-gray-600\"\n\t\t\t\t\t\taria-label=\"Clear selection\">\n\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t\t\t\t\t\t<line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n\t\t\t\t\t\t\t<line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t"])), theme.display, config.placeholder || 'Select...', config.label || config.placeholder || 'Select...', config.disabled ? 'disabled' : '');
        }
        return _html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\t\t<div\n\t\t\t\tdata-kt-select-display\n\t\t\t\tclass=\"", "\"\n\t\t\t\ttabindex=\"", "\"\n\t\t\t\trole=\"button\"\n\t\t\t\taria-haspopup=\"listbox\"\n\t\t\t\taria-expanded=\"false\"\n\t\t\t\taria-label=\"", "\"\n\t\t\t\t", "\n\t\t\t>\n\t\t\t\t<span data-kt-select-value>", "</span>\n\t\t\t\t<span data-kt-select-arrow class=\"ml-2\">\n\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t\t\t\t\t<polyline points=\"6 9 12 15 18 9\"></polyline>\n\t\t\t\t\t</svg>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div\n\t\t\t\tdata-kt-select-display\n\t\t\t\tclass=\"", "\"\n\t\t\t\ttabindex=\"", "\"\n\t\t\t\trole=\"button\"\n\t\t\t\taria-haspopup=\"listbox\"\n\t\t\t\taria-expanded=\"false\"\n\t\t\t\taria-label=\"", "\"\n\t\t\t\t", "\n\t\t\t>\n\t\t\t\t<span data-kt-select-value>", "</span>\n\t\t\t\t<span data-kt-select-arrow class=\"ml-2\">\n\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t\t\t\t\t<polyline points=\"6 9 12 15 18 9\"></polyline>\n\t\t\t\t\t</svg>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t"])), theme.display, config.disabled ? '-1' : '0', config.label || config.placeholder || 'Select...', config.disabled ? 'aria-disabled="true"' : '', config.placeholder || 'Select...');
    },
    /**
     * Renders the dropdown content container
     */
    dropdown: function (config, theme, optionsHtml) {
        var isCombobox = config.mode === 'combobox';
        var hasSearch = config.enableSearch && !isCombobox;
        // First create the dropdown element
        var dropdownElement = document.createElement('div');
        dropdownElement.setAttribute('data-kt-select-dropdown-content', '');
        dropdownElement.className = "".concat(theme.dropdown, " hidden");
        if (config.dropdownZindex) {
            dropdownElement.style.zIndex = config.dropdownZindex.toString();
        }
        // Add search input at the top if needed
        if (hasSearch) {
            // Add the search input directly as the first child
            var searchElement = exports.defaultTemplates.search(config, theme);
            dropdownElement.appendChild(searchElement);
        }
        // Add options container
        var optionsContainer = document.createElement('ul');
        optionsContainer.setAttribute('role', 'listbox');
        optionsContainer.setAttribute('aria-label', config.label || 'Options');
        optionsContainer.setAttribute('data-kt-select-options-container', '');
        optionsContainer.style.maxHeight = "".concat(config.height, "px");
        optionsContainer.style.overflowY = 'auto';
        optionsContainer.innerHTML = optionsHtml;
        // Add options container as the second child (or first if no search)
        dropdownElement.appendChild(optionsContainer);
        return dropdownElement;
    },
    /**
     * Renders a single option
     */
    option: function (option, config, theme) {
        // Handle both direct KTSelectOption objects and HTMLOptionElements
        var isHtmlOption = option instanceof HTMLOptionElement;
        var value = isHtmlOption ? option.value : option.id;
        var text = isHtmlOption ? option.text : option.title;
        var disabled = isHtmlOption ? option.disabled : option.disabled === true;
        var selected = isHtmlOption ? option.selected : !!option.selected;
        // Get additional data attributes from option
        var description = isHtmlOption
            ? option.getAttribute('data-kt-select-option-description')
            : option.description;
        var icon = isHtmlOption
            ? option.getAttribute('data-kt-select-option-icon')
            : option.icon;
        // Process icon with width and height if available
        var iconHtml = '';
        if (icon && icon !== 'null' && icon !== 'undefined') {
            // Check if it's an image URL
            if (icon.includes('http') || icon.includes('.')) {
                var imgElement = document.createElement('img');
                imgElement.src = icon;
                imgElement.alt = "Icon";
                // Apply default dimensions
                imgElement.style.width = '24px';
                imgElement.style.height = '24px';
                // Override with config values if available
                if (config.dataFieldIconWidth) {
                    imgElement.style.width = config.dataFieldIconWidth;
                }
                if (config.dataFieldIconHeight) {
                    imgElement.style.height = config.dataFieldIconHeight;
                }
                iconHtml = "<span class=\"option-icon mr-2\">".concat(imgElement.outerHTML, "</span>");
            }
            else {
                // It's HTML content
                iconHtml = "<span class=\"option-icon mr-2\">".concat(icon, "</span>");
            }
        }
        // Build option element with proper accessibility attributes
        return _html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\t\t\t<li\n\t\t\t\tdata-kt-select-option\n\t\t\t\tdata-value=\"", "\"\n\t\t\t\tclass=\"", " ", " ", "\"\n\t\t\t\trole=\"option\"\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t>\n\t\t\t\t", "\n\t\t\t\t<div class=\"option-content\">\n\t\t\t\t\t<div class=\"option-title\">", "</div>\n\t\t\t\t\t", "\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t"], ["\n\t\t\t<li\n\t\t\t\tdata-kt-select-option\n\t\t\t\tdata-value=\"", "\"\n\t\t\t\tclass=\"", " ", " ", "\"\n\t\t\t\trole=\"option\"\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t>\n\t\t\t\t", "\n\t\t\t\t<div class=\"option-content\">\n\t\t\t\t\t<div class=\"option-title\">", "</div>\n\t\t\t\t\t", "\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t"])), value, theme.option, selected ? theme.optionSelected : '', disabled ? theme.optionDisabled : '', selected ? 'aria-selected="true"' : 'aria-selected="false"', disabled ? 'aria-disabled="true"' : '', iconHtml ? iconHtml : '', text, description && description !== 'null' && description !== 'undefined' ? "<div class=\"option-description text-sm text-gray-500\">".concat(description, "</div>") : '');
    },
    /**
     * Renders an option group with header
     */
    optionGroup: function (label, optionsHtml, config, theme) {
        return _html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\t\t\t<li role=\"group\" aria-label=\"", "\" class=\"", "\">\n\t\t\t\t<div class=\"", "\">", "</div>\n\t\t\t\t<ul>", "</ul>\n\t\t\t</li>\n\t\t"], ["\n\t\t\t<li role=\"group\" aria-label=\"", "\" class=\"", "\">\n\t\t\t\t<div class=\"", "\">", "</div>\n\t\t\t\t<ul>", "</ul>\n\t\t\t</li>\n\t\t"])), label, theme.optionGroup, theme.optionGroupHeader, label, optionsHtml);
    },
    /**
     * Renders the search input
     */
    search: function (config, theme) {
        return _html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n\t\t\t<div class=\"", "\">\n\t\t\t\t<input\n\t\t\t\t\ttype=\"text\"\n\t\t\t\t\tdata-kt-select-search\n\t\t\t\t\tplaceholder=\"", "\"\n\t\t\t\t\tclass=\"", "\"\n\t\t\t\t\trole=\"searchbox\"\n\t\t\t\t\taria-label=\"", "\"\n\t\t\t\t/>\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div class=\"", "\">\n\t\t\t\t<input\n\t\t\t\t\ttype=\"text\"\n\t\t\t\t\tdata-kt-select-search\n\t\t\t\t\tplaceholder=\"", "\"\n\t\t\t\t\tclass=\"", "\"\n\t\t\t\t\trole=\"searchbox\"\n\t\t\t\t\taria-label=\"", "\"\n\t\t\t\t/>\n\t\t\t</div>\n\t\t"])), theme.searchWrapper, config.searchPlaceholder || 'Search...', theme.search, config.searchPlaceholder || 'Search...');
    },
    /**
     * Renders the no results message
     */
    noResults: function (config, theme) {
        return _html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n\t\t\t<li class=\"", "\" role=\"status\">\n\t\t\t\t", "\n\t\t\t</li>\n\t\t"], ["\n\t\t\t<li class=\"", "\" role=\"status\">\n\t\t\t\t", "\n\t\t\t</li>\n\t\t"])), theme.noResults, config.searchNotFoundText || 'No results found');
    },
    /**
     * Renders the loading state
     */
    loading: function (config, theme) {
        return _html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n\t\t\t<li class=\"", "\" role=\"status\" aria-live=\"polite\">\n\t\t\t\tLoading options...\n\t\t\t</li>\n\t\t"], ["\n\t\t\t<li class=\"", "\" role=\"status\" aria-live=\"polite\">\n\t\t\t\tLoading options...\n\t\t\t</li>\n\t\t"])), theme.loading);
    },
    /**
     * Renders a tag for multi-select
     */
    tag: function (option, config, theme) {
        // Escape HTML characters for aria-label to prevent HTML injection
        var escapeHTML = function (str) {
            return str.replace(/[&<>"']/g, function (match) {
                var escapeMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                };
                return escapeMap[match];
            });
        };
        // Ensure we have plain text for the aria-label
        var safeTitle = escapeHTML(option.title);
        return _html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n\t\t\t<div data-kt-select-tag class=\"", "\">\n\t\t\t\t<span>", "</span>\n\t\t\t\t<span\n\t\t\t\t\tdata-kt-select-remove-button\n\t\t\t\t\tdata-value=\"", "\"\n\t\t\t\t\tclass=\"", "\"\n\t\t\t\t\trole=\"button\"\n\t\t\t\t\taria-label=\"Remove ", "\"\n\t\t\t\t\ttabindex=\"0\"\n\t\t\t\t>\n\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t\t\t\t\t<line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n\t\t\t\t\t\t<line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n\t\t\t\t\t</svg>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div data-kt-select-tag class=\"", "\">\n\t\t\t\t<span>", "</span>\n\t\t\t\t<span\n\t\t\t\t\tdata-kt-select-remove-button\n\t\t\t\t\tdata-value=\"", "\"\n\t\t\t\t\tclass=\"", "\"\n\t\t\t\t\trole=\"button\"\n\t\t\t\t\taria-label=\"Remove ", "\"\n\t\t\t\t\ttabindex=\"0\"\n\t\t\t\t>\n\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t\t\t\t\t<line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n\t\t\t\t\t\t<line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n\t\t\t\t\t</svg>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t"])), theme.tag, option.title, option.id, theme.tagRemove, safeTitle);
    },
    /**
     * Formats the display of selected values
     */
    selectedDisplay: function (selectedOptions, config, theme) {
        if (!selectedOptions || selectedOptions.length === 0) {
            return config.placeholder || 'Select...';
        }
        if (config.multiple) {
            if (config.renderSelected && typeof config.renderSelected === 'function') {
                return config.renderSelected(selectedOptions);
            }
            if (config.showSelectedCount) {
                var count = selectedOptions.length;
                return "".concat(count, " ").concat(count === 1 ? 'item' : 'items', " selected");
            }
            return selectedOptions.map(function (option) { return option.title; }).join(', ');
        }
        else {
            return selectedOptions[0].title;
        }
    },
    /**
     * Highlights search term in an option
     */
    highlightSearchTerm: function (element, query, theme) {
        if (!query || query.trim() === '') {
            return element;
        }
        var regex = new RegExp("(".concat(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), ")"), 'gi');
        function highlightTextNodes(node) {
            var _a;
            if (node.nodeType === Node.TEXT_NODE) {
                var text = node.nodeValue || '';
                if (text.trim() === '')
                    return;
                var highlightedText = text.replace(regex, "<span class=\"".concat(theme.searchHighlight, "\">$1</span>"));
                if (highlightedText !== text) {
                    var tempElement = document.createElement('span');
                    tempElement.innerHTML = highlightedText;
                    (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(tempElement, node);
                }
            }
            else if (node.nodeType === Node.ELEMENT_NODE) {
                // Skip elements that already have highlighting
                if (node.nodeName === 'SPAN' && node.classList.contains(theme.searchHighlight.split(' ')[0])) {
                    return;
                }
                // Recursively traverse child nodes
                Array.from(node.childNodes).forEach(highlightTextNodes);
            }
        }
        // Create a clone to avoid modifying the original element
        var clonedElement = element.cloneNode(true);
        // Process only the text content part of the option
        var textContainer = clonedElement.querySelector('.option-title') || clonedElement;
        Array.from(textContainer.childNodes).forEach(highlightTextNodes);
        return clonedElement;
    }
};
/**
 * Template registry to store and manage custom templates
 */
var TemplateRegistry = /** @class */ (function () {
    function TemplateRegistry() {
        this._templates = new Map();
        this._themes = new Map();
        // Initialize with default templates
        this._templates.set('default', exports.defaultTemplates);
        this._themes.set('default', exports.defaultTheme);
    }
    TemplateRegistry.getInstance = function () {
        if (!TemplateRegistry._instance) {
            TemplateRegistry._instance = new TemplateRegistry();
        }
        return TemplateRegistry._instance;
    };
    /**
     * Register a complete template set
     */
    TemplateRegistry.prototype.registerTemplates = function (name, templates) {
        var existing = this.getTemplates('default');
        this._templates.set(name, __assign(__assign({}, existing), templates));
    };
    /**
     * Register a single template method
     */
    TemplateRegistry.prototype.registerTemplate = function (templateSet, templateName, template) {
        var _a;
        var templates = this.getTemplates(templateSet);
        this._templates.set(templateSet, __assign(__assign({}, templates), (_a = {}, _a[templateName] = template, _a)));
    };
    /**
     * Register a theme
     */
    TemplateRegistry.prototype.registerTheme = function (name, theme) {
        var existing = this.getTheme('default');
        this._themes.set(name, __assign(__assign({}, existing), theme));
    };
    /**
     * Get a complete template set
     */
    TemplateRegistry.prototype.getTemplates = function (name) {
        if (name === void 0) { name = 'default'; }
        return this._templates.get(name) || exports.defaultTemplates;
    };
    /**
     * Get a theme
     */
    TemplateRegistry.prototype.getTheme = function (name) {
        if (name === void 0) { name = 'default'; }
        return this._themes.get(name) || exports.defaultTheme;
    };
    return TemplateRegistry;
}());
exports.TemplateRegistry = TemplateRegistry;
/**
 * Helper function to create HTML elements from template strings
 */
function _html(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var template = document.createElement('template');
    template.innerHTML = strings.reduce(function (acc, str, i) { return acc + str + (values[i] || ''); }, '').trim();
    return template.content.firstElementChild;
}
// Export the templates registry for ease of use
exports.Templates = TemplateRegistry.getInstance();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;


/***/ }),

/***/ "./src/components/select/types.ts":
/*!****************************************!*\
  !*** ./src/components/select/types.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Common type interfaces for the KTSelect component
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectMode = void 0;
/**
 * Select mode options
 */
var SelectMode;
(function (SelectMode) {
    SelectMode["TAGS"] = "tags";
    SelectMode["COMBOBOX"] = "combobox";
})(SelectMode || (exports.SelectMode = SelectMode = {}));


/***/ }),

/***/ "./src/components/select/utils.ts":
/*!****************************************!*\
  !*** ./src/components/select/utils.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// utils.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventManager = exports.FocusManager = void 0;
exports.formatCurrency = formatCurrency;
exports.filterOptions = filterOptions;
exports.highlightTextInElement = highlightTextInElement;
exports.highlightMatchingText = highlightMatchingText;
exports.handleDropdownKeyNavigation = handleDropdownKeyNavigation;
exports.debounce = debounce;
var templates_1 = __webpack_require__(/*! ./templates */ "./src/components/select/templates.ts");
/**
 * Format a number as a currency string
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}
/**
 * Filter options based on a search query
 */
function filterOptions(options, query, config, dropdownElement, onVisibleCount) {
    var _a;
    var visibleOptionsCount = 0;
    var theme = templates_1.Templates.getTheme();
    // Clear existing "no results" messages
    var noResultsElement = dropdownElement.querySelector('[data-kt-select-no-results]');
    if (noResultsElement) {
        noResultsElement.remove();
    }
    // Filter options based on query
    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var option = options_1[_i];
        var optionText = ((_a = option.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
        var isMatch = optionText.includes(query);
        if (isMatch || query.trim() === '') {
            option.style.display = 'block';
            visibleOptionsCount++;
            // Apply highlighting if needed - but preserve the option structure
            if (isMatch && config.searchHighlight && query.trim() !== '') {
                // Clone option elements that contain icons or descriptions
                var hasIcon = option.querySelector('.option-icon') !== null;
                var hasDescription = option.querySelector('.option-description') !== null;
                if (hasIcon || hasDescription) {
                    // Only highlight the text part without changing structure
                    var titleElement = option.querySelector('.option-title');
                    if (titleElement) {
                        var originalText = titleElement.textContent || '';
                        highlightTextInElement(titleElement, query, theme.searchHighlight);
                    }
                }
                else {
                    // Simple option with just text - standard highlighting
                    highlightMatchingText(option, query, theme);
                }
            }
        }
        else {
            option.style.display = 'none';
        }
        // Early exit if maxItems limit is reached
        if (config.searchMaxItems && visibleOptionsCount >= config.searchMaxItems) {
            break;
        }
    }
    // Handle "no results" state
    if (visibleOptionsCount === 0 && query.trim() !== '') {
        var noResultsElement_1 = templates_1.defaultTemplates.noResults(config, theme);
        noResultsElement_1.setAttribute('data-kt-select-no-results', '');
        var optionsContainer = dropdownElement.querySelector('[data-kt-select-options-container]');
        if (optionsContainer) {
            optionsContainer.appendChild(noResultsElement_1);
        }
        else {
            dropdownElement.appendChild(noResultsElement_1);
        }
    }
    // Call the callback with the visible count if provided
    if (onVisibleCount) {
        onVisibleCount(visibleOptionsCount);
    }
    return visibleOptionsCount;
}
/**
 * Highlight text only within a specific element, preserving other elements
 */
function highlightTextInElement(element, query, highlightClass) {
    if (!element || !query || query.trim() === '')
        return;
    var originalText = element.textContent || '';
    var queryLower = query.toLowerCase();
    var textLower = originalText.toLowerCase();
    var html = '';
    var lastIndex = 0;
    // Find all occurrences of the query in the text
    var startIndex = textLower.indexOf(queryLower);
    while (startIndex !== -1) {
        // Add text before the match
        html += originalText.substring(lastIndex, startIndex);
        // Add the highlighted match
        var matchEnd = startIndex + query.length;
        var matchedText = originalText.substring(startIndex, matchEnd);
        html += "<span class=\"".concat(highlightClass, "\">").concat(matchedText, "</span>");
        // Move to the next position
        lastIndex = matchEnd;
        startIndex = textLower.indexOf(queryLower, lastIndex);
    }
    // Add any remaining text after the last match
    if (lastIndex < originalText.length) {
        html += originalText.substring(lastIndex);
    }
    // Update the element
    element.innerHTML = html;
}
/**
 * Highlight matching text within an option element
 */
function highlightMatchingText(element, query, theme) {
    if (!element || !query || query.trim() === '')
        return;
    var optionText = element.textContent || '';
    var searchHighlightClass = theme.searchHighlight;
    // Use the more targeted function
    highlightTextInElement(element, query, searchHighlightClass);
}
/**
 * Focus manager for keyboard navigation
 * Consolidates redundant focus management logic into shared functions
 */
var FocusManager = /** @class */ (function () {
    function FocusManager(element, optionsSelector) {
        if (optionsSelector === void 0) { optionsSelector = '[data-kt-select-option]'; }
        this._focusedOptionIndex = null;
        this._focusClass = 'option-focused';
        this._hoverClass = 'hovered';
        this._element = element;
        this._optionsSelector = optionsSelector;
    }
    /**
     * Get all visible options
     */
    FocusManager.prototype.getVisibleOptions = function () {
        return Array.from(this._element.querySelectorAll(this._optionsSelector)).filter(function (option) { return option.style.display !== 'none'; });
    };
    /**
     * Focus the next visible option
     */
    FocusManager.prototype.focusNext = function () {
        var options = this.getVisibleOptions();
        if (options.length === 0)
            return null;
        this.resetFocus();
        if (this._focusedOptionIndex === null) {
            this._focusedOptionIndex = 0;
        }
        else {
            this._focusedOptionIndex = (this._focusedOptionIndex + 1) % options.length;
        }
        var option = options[this._focusedOptionIndex];
        this.applyFocus(option);
        this.scrollIntoView(option);
        return option;
    };
    /**
     * Focus the previous visible option
     */
    FocusManager.prototype.focusPrevious = function () {
        var options = this.getVisibleOptions();
        if (options.length === 0)
            return null;
        this.resetFocus();
        if (this._focusedOptionIndex === null) {
            this._focusedOptionIndex = options.length - 1;
        }
        else {
            this._focusedOptionIndex = (this._focusedOptionIndex - 1 + options.length) % options.length;
        }
        var option = options[this._focusedOptionIndex];
        this.applyFocus(option);
        this.scrollIntoView(option);
        return option;
    };
    /**
     * Apply focus to a specific option
     */
    FocusManager.prototype.applyFocus = function (option) {
        if (!option)
            return;
        // Remove focus from all options
        this.resetFocus();
        // Add focus to this option
        option.classList.add(this._focusClass);
        option.classList.add(this._hoverClass);
    };
    /**
     * Reset focus on all options
     */
    FocusManager.prototype.resetFocus = function () {
        var _this = this;
        var focusedOptions = this._element.querySelectorAll("".concat(this._optionsSelector, ".").concat(this._focusClass, ", ").concat(this._optionsSelector, ".").concat(this._hoverClass));
        focusedOptions.forEach(function (option) {
            option.classList.remove(_this._focusClass);
            option.classList.remove(_this._hoverClass);
        });
        // Reset index if visible options have changed
        var visibleOptions = this.getVisibleOptions();
        if (this._focusedOptionIndex !== null && this._focusedOptionIndex >= visibleOptions.length) {
            this._focusedOptionIndex = null;
        }
    };
    /**
     * Ensure the focused option is visible in the scrollable container
     */
    FocusManager.prototype.scrollIntoView = function (option) {
        if (!option)
            return;
        var container = this._element.querySelector('[data-kt-select-options-container]');
        if (!container)
            return;
        var optionRect = option.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect();
        // Check if option is below the visible area
        if (optionRect.bottom > containerRect.bottom) {
            option.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
        // Check if option is above the visible area
        else if (optionRect.top < containerRect.top) {
            option.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    };
    /**
     * Focus a specific option by its value
     */
    FocusManager.prototype.focusOptionByValue = function (value) {
        var options = this.getVisibleOptions();
        var index = options.findIndex(function (option) { return option.dataset.value === value; });
        if (index >= 0) {
            this._focusedOptionIndex = index;
            this.applyFocus(options[index]);
            this.scrollIntoView(options[index]);
            return true;
        }
        return false;
    };
    /**
     * Get the currently focused option
     */
    FocusManager.prototype.getFocusedOption = function () {
        var options = this.getVisibleOptions();
        if (this._focusedOptionIndex !== null && this._focusedOptionIndex < options.length) {
            return options[this._focusedOptionIndex];
        }
        return null;
    };
    /**
     * Get the index of the currently focused option
     */
    FocusManager.prototype.getFocusedIndex = function () {
        return this._focusedOptionIndex;
    };
    /**
     * Set the focused option index directly
     */
    FocusManager.prototype.setFocusedIndex = function (index) {
        this._focusedOptionIndex = index;
    };
    return FocusManager;
}());
exports.FocusManager = FocusManager;
/**
 * Shared keyboard navigation handler for dropdown options
 * Can be used by both combobox and search modules
 */
function handleDropdownKeyNavigation(event, select, config, callbacks) {
    try {
        // Get the dropdown state
        var isDropdownOpen = select._dropdownIsOpen;
        // Log the event to help debug
        var origin_1 = 'handleDropdownKeyNavigation';
        console.log("[".concat(origin_1, "] Key: ").concat(event.key, ", Dropdown open: ").concat(isDropdownOpen));
        // Handle basic keyboard navigation
        switch (event.key) {
            case 'ArrowDown':
                if (!isDropdownOpen) {
                    console.log("[".concat(origin_1, "] Opening dropdown on ArrowDown"));
                    select.openDropdown();
                    // Focus the first option after opening
                    setTimeout(function () {
                        select._focusNextOption();
                    }, 50);
                }
                else if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onArrowDown) {
                    console.log("[".concat(origin_1, "] Using custom onArrowDown callback"));
                    callbacks.onArrowDown();
                }
                else {
                    console.log("[".concat(origin_1, "] Using default _focusNextOption"));
                    var focusedOption = select._focusNextOption();
                    // Ensure we have a focused option
                    if (focusedOption) {
                        console.log("[".concat(origin_1, "] Focused next option:"), focusedOption);
                    }
                }
                event.preventDefault();
                break;
            case 'ArrowUp':
                if (!isDropdownOpen) {
                    console.log("[".concat(origin_1, "] Opening dropdown on ArrowUp"));
                    select.openDropdown();
                    // Focus the last option after opening
                    setTimeout(function () {
                        select._focusPreviousOption();
                    }, 50);
                }
                else if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onArrowUp) {
                    console.log("[".concat(origin_1, "] Using custom onArrowUp callback"));
                    callbacks.onArrowUp();
                }
                else {
                    console.log("[".concat(origin_1, "] Using default _focusPreviousOption"));
                    var focusedOption = select._focusPreviousOption();
                    // Ensure we have a focused option
                    if (focusedOption) {
                        console.log("[".concat(origin_1, "] Focused previous option:"), focusedOption);
                    }
                }
                event.preventDefault();
                break;
            case 'Enter':
                // Prevent form submission
                event.preventDefault();
                if (isDropdownOpen) {
                    console.log("[".concat(origin_1, "] Enter pressed with dropdown open"));
                    // For combobox mode, ensure we update the input value directly
                    var isCombobox = select.getConfig().mode === 'combobox';
                    var comboboxModule = select._comboboxModule;
                    if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onEnter) {
                        console.log("[".concat(origin_1, "] Using custom onEnter callback"));
                        callbacks.onEnter();
                    }
                    else {
                        console.log("[".concat(origin_1, "] Using default selectFocusedOption"));
                        // Make sure there is a focused option before trying to select it
                        if (select._focusManager && select._focusManager.getFocusedOption()) {
                            select.selectFocusedOption();
                        }
                        else {
                            // If no option is focused, try to focus the first one
                            var focusedOption = select._focusNextOption();
                            // Only select if an option was successfully focused
                            if (focusedOption) {
                                select.selectFocusedOption();
                            }
                        }
                    }
                    // Close dropdown after selection if not multiple and closeOnSelect is true
                    if (!config.multiple && config.closeOnSelect !== false) {
                        console.log("[".concat(origin_1, "] Closing dropdown after selection"));
                        select.closeDropdown();
                    }
                }
                else {
                    // If dropdown is closed, open it on Enter
                    console.log("[".concat(origin_1, "] Opening dropdown on Enter"));
                    select.openDropdown();
                    // Focus the first option after opening
                    setTimeout(function () {
                        select._focusNextOption();
                    }, 50);
                }
                break;
            case 'Tab':
                // Only handle tab if dropdown is open
                if (isDropdownOpen) {
                    console.log("[".concat(origin_1, "] Closing dropdown on Tab"));
                    select.closeDropdown();
                    if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onClose) {
                        callbacks.onClose();
                    }
                    // Don't prevent default tab behavior - let it move focus naturally
                }
                break;
            case 'Escape':
                // Only handle escape if dropdown is open
                if (isDropdownOpen) {
                    console.log("[".concat(origin_1, "] Closing dropdown on Escape"));
                    select.closeDropdown();
                    if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onClose) {
                        callbacks.onClose();
                    }
                    event.preventDefault(); // Prevent other escape handlers
                }
                break;
            case ' ': // Space key
                // If dropdown is closed, space should open it (but not if in combobox mode)
                if (!isDropdownOpen && !(select.getConfig().mode === 'combobox')) {
                    console.log("[".concat(origin_1, "] Opening dropdown on Space"));
                    select.openDropdown();
                    // Focus the first option after opening
                    setTimeout(function () {
                        select._focusNextOption();
                    }, 50);
                    event.preventDefault();
                }
                break;
        }
    }
    catch (error) {
        console.error('Error in keyboard navigation handler:', error);
    }
}
/**
 * Centralized event listener management
 */
var EventManager = /** @class */ (function () {
    function EventManager() {
        this._boundHandlers = new Map();
    }
    /**
     * Add an event listener with a bound context
     */
    EventManager.prototype.addListener = function (element, event, handler, context) {
        if (!element)
            return;
        // Create a bound version of the handler if context provided
        var boundHandler = context && typeof handler === 'function'
            ? handler.bind(context)
            : handler;
        // Store the relationship between original and bound handler
        if (!this._boundHandlers.has(event)) {
            this._boundHandlers.set(event, new Map());
        }
        var eventMap = this._boundHandlers.get(event);
        eventMap.set(handler, boundHandler);
        // Add the event listener
        element.addEventListener(event, boundHandler);
    };
    /**
     * Remove an event listener
     */
    EventManager.prototype.removeListener = function (element, event, handler) {
        if (!element)
            return;
        var eventMap = this._boundHandlers.get(event);
        if (!eventMap)
            return;
        // Get the bound version of the handler
        var boundHandler = eventMap.get(handler);
        if (!boundHandler)
            return;
        // Remove the event listener
        element.removeEventListener(event, boundHandler);
        // Clean up the map
        eventMap.delete(handler);
        if (eventMap.size === 0) {
            this._boundHandlers.delete(event);
        }
    };
    /**
     * Remove all event listeners
     */
    EventManager.prototype.removeAllListeners = function (element) {
        if (!element)
            return;
        // Go through each event type
        this._boundHandlers.forEach(function (eventMap, event) {
            // For each event type, go through each handler
            eventMap.forEach(function (boundHandler, originalHandler) {
                element.removeEventListener(event, boundHandler);
            });
        });
        // Clear the maps
        this._boundHandlers.clear();
    };
    return EventManager;
}());
exports.EventManager = EventManager;
/**
 * Debounce function to limit how often a function can be called
 */
function debounce(func, delay) {
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () { return func.apply(void 0, args); }, delay);
    };
}


/***/ }),

/***/ "./src/components/stepper/index.ts":
/*!*****************************************!*\
  !*** ./src/components/stepper/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTStepper = void 0;
var stepper_1 = __webpack_require__(/*! ./stepper */ "./src/components/stepper/stepper.ts");
Object.defineProperty(exports, "KTStepper", ({ enumerable: true, get: function () { return stepper_1.KTStepper; } }));


/***/ }),

/***/ "./src/components/stepper/stepper.ts":
/*!*******************************************!*\
  !*** ./src/components/stepper/stepper.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTStepper = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTStepper = /** @class */ (function (_super) {
    __extends(KTStepper, _super);
    function KTStepper(element, config) {
        if (config === void 0) { config = null; }
        var _this = _super.call(this) || this;
        _this._name = 'stepper';
        _this._defaultConfig = {
            hiddenClass: 'hidden',
            activeStep: 1,
        };
        _this._config = _this._defaultConfig;
        _this._activeStep = 0;
        _this._nextElement = null;
        _this._backElement = null;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        if (!_this._element)
            return _this;
        _this._nextElement = _this._element.querySelector('[data-kt-stepper-next]');
        _this._backElement = _this._element.querySelector('[data-kt-stepper-back]');
        _this._activeStep = 1;
        if (_this._getOption('activeStep') !== _this._activeStep) {
            _this._go(_this._getOption('activeStep'));
        }
        _this._update();
        _this._handlers();
        return _this;
    }
    KTStepper.prototype._handlers = function () {
        var _this = this;
        if (!this._nextElement) {
            console.error('data-kt-stepper-next not found');
            return;
        }
        if (this._nextElement) {
            this._nextElement.addEventListener('click', function (event) {
                event.preventDefault();
                _this._goNext();
            });
        }
        if (this._backElement) {
            this._backElement.addEventListener('click', function (event) {
                event.preventDefault();
                _this._goBack();
            });
        }
    };
    KTStepper.prototype._update = function () {
        var _this = this;
        if (!this._element)
            return;
        var state = '';
        if (this._activeStep === this._getTotalSteps()) {
            state = 'last';
        }
        else if (this._activeStep === 1) {
            state = 'first';
        }
        else {
            state = 'between';
        }
        this._element.classList.remove('first');
        this._element.classList.remove('last');
        this._element.classList.remove('between');
        this._element.classList.add(state);
        this._getItemElements().forEach(function (element, index) {
            var contentElement = dom_1.default.getElement(element.getAttribute('data-kt-stepper-item'));
            if (!contentElement)
                return;
            element.classList.remove('active');
            element.classList.remove('completed');
            element.classList.remove('pending');
            var numberElement = element.querySelector('[data-kt-stepper-number]');
            if (numberElement)
                numberElement.innerHTML = String(index + 1);
            if (index + 1 == _this._activeStep) {
                element.classList.add('active');
                contentElement.classList.remove(_this._getOption('hiddenClass'));
            }
            else {
                contentElement.classList.add(_this._getOption('hiddenClass'));
                if (index + 1 < _this._activeStep) {
                    element.classList.add('completed');
                }
                else {
                    element.classList.add('pending');
                }
            }
        });
    };
    KTStepper.prototype._getItemElements = function () {
        var elements = [];
        this._element
            .querySelectorAll('[data-kt-stepper-item]')
            .forEach(function (element) {
            if (dom_1.default.isVisible(element)) {
                elements.push(element);
            }
        });
        return elements;
    };
    KTStepper.prototype._go = function (step) {
        if (step === this._activeStep || step > this._getTotalSteps() || step < 0)
            return;
        var payload = { step: step, cancel: false };
        this._fireEvent('change', payload);
        this._dispatchEvent('change', payload);
        if (payload.cancel === true) {
            return;
        }
        this._activeStep = step;
        this._update();
        this._fireEvent('changed');
        this._dispatchEvent('changed');
    };
    KTStepper.prototype._goTo = function (itemElement) {
        var step = this._getStep(itemElement);
        this._go(step);
    };
    KTStepper.prototype._getStep = function (itemElement) {
        var step = -1;
        this._getItemElements().forEach(function (element, index) {
            if (element === itemElement) {
                step = index + 1;
                return;
            }
        });
        return step;
    };
    KTStepper.prototype._getItemElement = function (step) {
        return this._getItemElements()[step - 1];
    };
    KTStepper.prototype._getTotalSteps = function () {
        return this._getItemElements().length;
    };
    KTStepper.prototype._goNext = function () {
        var step;
        if (this._getTotalSteps() >= this._activeStep + 1) {
            step = this._activeStep + 1;
        }
        else {
            step = this._getTotalSteps();
        }
        this._go(step);
    };
    KTStepper.prototype._goBack = function () {
        var step;
        if (this._activeStep - 1 > 1) {
            step = this._activeStep - 1;
        }
        else {
            step = 1;
        }
        this._go(step);
    };
    KTStepper.prototype._goLast = function () {
        var step = this._getTotalSteps();
        this._go(step);
    };
    KTStepper.prototype._goFirst = function () {
        var step = 1;
        this._go(step);
    };
    KTStepper.prototype._isLast = function () {
        return this._getTotalSteps() === this._activeStep + 1;
    };
    KTStepper.prototype._isFirst = function () {
        return this._activeStep === 1;
    };
    KTStepper.prototype.isLast = function () {
        return this._isLast();
    };
    KTStepper.prototype.isFirst = function () {
        return this._isFirst();
    };
    KTStepper.prototype.go = function (step) {
        this._go(step);
    };
    KTStepper.prototype.goTo = function (itemElement) {
        this.goTo(itemElement);
    };
    KTStepper.prototype.goFirst = function () {
        this._goFirst();
    };
    KTStepper.prototype.goLast = function () {
        this._goLast();
    };
    KTStepper.prototype.goNext = function () {
        this._goNext();
    };
    KTStepper.prototype.goBack = function () {
        this._goBack();
    };
    KTStepper.prototype.update = function () {
        this._update();
    };
    KTStepper.prototype.getStep = function (itemElement) {
        return this._getStep(itemElement);
    };
    KTStepper.prototype.getItemElement = function (step) {
        return this._getItemElement(step);
    };
    KTStepper.prototype.getTotalSteps = function () {
        return this._getTotalSteps();
    };
    KTStepper.prototype.getItemElements = function () {
        return this._getItemElements();
    };
    KTStepper.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'stepper')) {
            return data_1.default.get(element, 'stepper');
        }
        if (element.getAttribute('data-kt-stepper')) {
            return new KTStepper(element);
        }
        return null;
    };
    KTStepper.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTStepper(element, config);
    };
    KTStepper.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-stepper]');
        elements.forEach(function (element) {
            new KTStepper(element);
        });
    };
    KTStepper.init = function () {
        KTStepper.createInstances();
    };
    return KTStepper;
}(component_1.default));
exports.KTStepper = KTStepper;
if (typeof window !== 'undefined') {
    window.KTStepper = KTStepper;
}


/***/ }),

/***/ "./src/components/sticky/index.ts":
/*!****************************************!*\
  !*** ./src/components/sticky/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTSticky = void 0;
var sticky_1 = __webpack_require__(/*! ./sticky */ "./src/components/sticky/sticky.ts");
Object.defineProperty(exports, "KTSticky", ({ enumerable: true, get: function () { return sticky_1.KTSticky; } }));


/***/ }),

/***/ "./src/components/sticky/sticky.ts":
/*!*****************************************!*\
  !*** ./src/components/sticky/sticky.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTSticky = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var utils_1 = __webpack_require__(/*! ../../helpers/utils */ "./src/helpers/utils.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTSticky = /** @class */ (function (_super) {
    __extends(KTSticky, _super);
    function KTSticky(element, config) {
        if (config === void 0) { config = null; }
        var _this = _super.call(this) || this;
        _this._name = 'sticky';
        _this._defaultConfig = {
            target: 'body',
            name: '',
            class: '',
            top: '',
            start: '',
            end: '',
            width: '',
            zindex: '',
            offset: 0,
            reverse: false,
            release: '',
            activate: '',
        };
        _this._config = _this._defaultConfig;
        _this._targetElement = null;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._releaseElement = dom_1.default.getElement(_this._getOption('release'));
        _this._activateElement = dom_1.default.getElement(_this._getOption('activate'));
        _this._wrapperElement = _this._element.closest('[data-kt-sticky-wrapper]');
        _this._attributeRoot = "data-kt-sticky-".concat(_this._getOption('name'));
        _this._eventTriggerState = true;
        _this._lastScrollTop = 0;
        var targetElement = _this._getTarget() === 'body'
            ? document
            : dom_1.default.getElement(_this._getTarget());
        if (!targetElement)
            return _this;
        _this._targetElement = targetElement;
        _this._handlers();
        _this._process();
        _this._update();
        return _this;
    }
    KTSticky.prototype._getTarget = function () {
        return (this._element.getAttribute('data-kt-sticky-target') ||
            this._getOption('target'));
    };
    KTSticky.prototype._handlers = function () {
        var _this = this;
        window.addEventListener('resize', function () {
            var timer;
            utils_1.default.throttle(timer, function () {
                _this._update();
            }, 200);
        });
        this._targetElement.addEventListener('scroll', function () {
            _this._process();
        });
    };
    KTSticky.prototype._process = function () {
        var reverse = this._getOption('reverse');
        var offset = this._getOffset();
        if (offset < 0) {
            this._disable();
            return;
        }
        var st = this._getTarget() === 'body'
            ? dom_1.default.getScrollTop()
            : this._targetElement.scrollTop;
        var release = this._releaseElement && dom_1.default.isPartiallyInViewport(this._releaseElement);
        // Release on reverse scroll mode
        if (reverse === true) {
            // Forward scroll mode
            if (st > offset && !release) {
                if (document.body.hasAttribute(this._attributeRoot) === false) {
                    if (this._enable() === false) {
                        return;
                    }
                    document.body.setAttribute(this._attributeRoot, 'on');
                }
                if (this._eventTriggerState === true) {
                    var payload = { active: true };
                    this._fireEvent('change', payload);
                    this._dispatchEvent('change', payload);
                    this._eventTriggerState = false;
                }
                // Back scroll mode
            }
            else {
                if (document.body.hasAttribute(this._attributeRoot) === true) {
                    this._disable();
                    if (release) {
                        this._element.classList.add('release');
                    }
                    document.body.removeAttribute(this._attributeRoot);
                }
                if (this._eventTriggerState === false) {
                    var payload = { active: false };
                    this._fireEvent('change', payload);
                    this._dispatchEvent('change', payload);
                    this._eventTriggerState = true;
                }
            }
            this._lastScrollTop = st;
            // Classic scroll mode
        }
        else {
            // Forward scroll mode
            if (st > offset && !release) {
                if (document.body.hasAttribute(this._attributeRoot) === false) {
                    if (this._enable() === false) {
                        return;
                    }
                    document.body.setAttribute(this._attributeRoot, 'on');
                }
                if (this._eventTriggerState === true) {
                    var payload = { active: true };
                    this._fireEvent('change', payload);
                    this._dispatchEvent('change', payload);
                    this._eventTriggerState = false;
                }
                // Back scroll mode
            }
            else {
                // back scroll mode
                if (document.body.hasAttribute(this._attributeRoot) === true) {
                    this._disable();
                    if (release) {
                        this._element.classList.add('release');
                    }
                    document.body.removeAttribute(this._attributeRoot);
                }
                if (this._eventTriggerState === false) {
                    var payload = { active: false };
                    this._fireEvent('change', payload);
                    this._dispatchEvent('change', payload);
                    this._eventTriggerState = true;
                }
            }
        }
    };
    KTSticky.prototype._getOffset = function () {
        var offset = parseInt(this._getOption('offset'));
        var activateElement = dom_1.default.getElement(this._getOption('activate'));
        if (activateElement) {
            offset = Math.abs(offset - activateElement.offsetTop);
        }
        return offset;
    };
    KTSticky.prototype._enable = function () {
        if (!this._element)
            return false;
        var width = this._getOption('width');
        var top = this._getOption('top');
        var start = this._getOption('start');
        var end = this._getOption('end');
        var height = this._calculateHeight();
        var zindex = this._getOption('zindex');
        var classList = this._getOption('class');
        if (height + parseInt(top) > dom_1.default.getViewPort().height) {
            return false;
        }
        if (width) {
            var targetElement = document.querySelector(width);
            if (targetElement) {
                width = dom_1.default.getCssProp(targetElement, 'width');
            }
            else if (width == 'auto') {
                width = dom_1.default.getCssProp(this._element, 'width');
            }
            this._element.style.width = "".concat(Math.round(parseFloat(width)), "px");
        }
        if (top) {
            this._element.style.top = "".concat(top, "px");
        }
        if (start) {
            if (start === 'auto') {
                var offsetLeft = dom_1.default.offset(this._element).left;
                if (offsetLeft >= 0) {
                    this._element.style.insetInlineStart = "".concat(offsetLeft, "px");
                }
            }
            else {
                this._element.style.insetInlineStart = "".concat(start, "px");
            }
        }
        if (end) {
            if (end === 'auto') {
                var offseRight = dom_1.default.offset(this._element).right;
                if (offseRight >= 0) {
                    this._element.style.insetInlineEnd = "".concat(offseRight, "px");
                }
            }
            else {
                this._element.style.insetInlineEnd = "".concat(end, "px");
            }
        }
        if (zindex) {
            this._element.style.zIndex = zindex;
            this._element.style.position = 'fixed';
        }
        if (classList) {
            dom_1.default.addClass(this._element, classList);
        }
        if (this._wrapperElement) {
            this._wrapperElement.style.height = "".concat(height, "px");
        }
        this._element.classList.add('active');
        this._element.classList.remove('release');
        return true;
    };
    KTSticky.prototype._disable = function () {
        if (!this._element)
            return;
        this._element.style.top = '';
        this._element.style.width = '';
        this._element.style.left = '';
        this._element.style.right = '';
        this._element.style.zIndex = '';
        this._element.style.position = '';
        var classList = this._getOption('class');
        if (this._wrapperElement) {
            this._wrapperElement.style.height = '';
        }
        if (classList) {
            dom_1.default.removeClass(this._element, classList);
        }
        this._element.classList.remove('active');
    };
    KTSticky.prototype._update = function () {
        if (this._isActive()) {
            this._disable();
            this._enable();
        }
        else {
            this._disable();
        }
    };
    KTSticky.prototype._calculateHeight = function () {
        if (!this._element)
            return 0;
        var height = parseFloat(dom_1.default.getCssProp(this._element, 'height'));
        height += parseFloat(dom_1.default.getCssProp(this._element, 'margin-top'));
        height += parseFloat(dom_1.default.getCssProp(this._element, 'margin-bottom'));
        if (dom_1.default.getCssProp(this._element, 'border-top')) {
            height =
                height + parseFloat(dom_1.default.getCssProp(this._element, 'border-top'));
        }
        if (dom_1.default.getCssProp(this._element, 'border-bottom')) {
            height =
                height + parseFloat(dom_1.default.getCssProp(this._element, 'border-bottom'));
        }
        return height;
    };
    KTSticky.prototype._isActive = function () {
        return this._element.classList.contains('active');
    };
    KTSticky.prototype.update = function () {
        this._update();
    };
    KTSticky.prototype.isActive = function () {
        return this._isActive();
    };
    KTSticky.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'sticky')) {
            return data_1.default.get(element, 'sticky');
        }
        if (element.getAttribute('data-kt-sticky')) {
            return new KTSticky(element);
        }
        return null;
    };
    KTSticky.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTSticky(element, config);
    };
    KTSticky.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-sticky]');
        elements.forEach(function (element) {
            new KTSticky(element);
        });
    };
    KTSticky.init = function () {
        KTSticky.createInstances();
    };
    return KTSticky;
}(component_1.default));
exports.KTSticky = KTSticky;
if (typeof window !== 'undefined') {
    window.KTSticky = KTSticky;
}


/***/ }),

/***/ "./src/components/tabs/index.ts":
/*!**************************************!*\
  !*** ./src/components/tabs/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTTabs = void 0;
var tabs_1 = __webpack_require__(/*! ./tabs */ "./src/components/tabs/tabs.ts");
Object.defineProperty(exports, "KTTabs", ({ enumerable: true, get: function () { return tabs_1.KTTabs; } }));


/***/ }),

/***/ "./src/components/tabs/tabs.ts":
/*!*************************************!*\
  !*** ./src/components/tabs/tabs.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTTabs = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/helpers/event-handler.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTTabs = /** @class */ (function (_super) {
    __extends(KTTabs, _super);
    function KTTabs(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'tabs';
        _this._defaultConfig = {
            hiddenClass: '',
        };
        _this._config = _this._defaultConfig;
        _this._currentTabElement = null;
        _this._currentContentElement = null;
        _this._lastTabElement = null;
        _this._lastContentElement = null;
        _this._tabElements = null;
        _this._isTransitioning = false;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        if (!_this._element)
            return _this;
        _this._tabElements = _this._element.querySelectorAll('[data-kt-tab-toggle]');
        _this._currentTabElement = _this._element.querySelector('.active[data-kt-tab-toggle]');
        _this._currentContentElement =
            (_this._currentTabElement &&
                (dom_1.default.getElement(_this._currentTabElement.getAttribute('data-kt-tab-toggle')) ||
                    dom_1.default.getElement(_this._currentTabElement.getAttribute('href')))) ||
                null;
        _this._handlers();
        return _this;
    }
    KTTabs.prototype._handlers = function () {
        var _this = this;
        if (!this._element)
            return;
        event_handler_1.default.on(this._element, '[data-kt-tab-toggle]', 'click', function (event, target) {
            event.preventDefault();
            _this._show(target);
        });
    };
    KTTabs.prototype._show = function (tabElement) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        if (this._isShown(tabElement) || this._isTransitioning)
            return;
        var payload = { cancel: false };
        this._fireEvent('show', payload);
        this._dispatchEvent('show', payload);
        if (payload.cancel === true) {
            return;
        }
        (_a = this._currentTabElement) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
        (_b = this._currentContentElement) === null || _b === void 0 ? void 0 : _b.classList.add(this._getOption('hiddenClass'));
        this._lastTabElement = this._currentTabElement;
        (_c = this._getDropdownToggleElement(this._lastTabElement)) === null || _c === void 0 ? void 0 : _c.classList.remove('active');
        this._lastContentElement = this._currentContentElement;
        this._currentTabElement = tabElement;
        this._currentContentElement =
            dom_1.default.getElement(tabElement.getAttribute('data-kt-tab-toggle')) ||
                dom_1.default.getElement(tabElement.getAttribute('href'));
        (_d = this._currentTabElement) === null || _d === void 0 ? void 0 : _d.classList.add('active');
        (_e = this._currentContentElement) === null || _e === void 0 ? void 0 : _e.classList.remove(this._getOption('hiddenClass'));
        (_f = this._getDropdownToggleElement(this._currentTabElement)) === null || _f === void 0 ? void 0 : _f.classList.add('active');
        this._currentContentElement.style.opacity = '0';
        dom_1.default.reflow(this._currentContentElement);
        this._currentContentElement.style.opacity = '1';
        dom_1.default.transitionEnd(this._currentContentElement, function () {
            _this._isTransitioning = false;
            _this._currentContentElement.style.opacity = '';
            _this._fireEvent('shown');
            _this._dispatchEvent('shown');
        });
    };
    KTTabs.prototype._getDropdownToggleElement = function (element) {
        var containerElement = element.closest('[data-kt-dropdown-initialized], [data-kt-menu-initialized]');
        if (containerElement) {
            return containerElement.querySelector('[data-kt-dropdown-toggle], [data-kt-menu-toggle]');
        }
        else {
            return null;
        }
    };
    KTTabs.prototype._isShown = function (tabElement) {
        return tabElement.classList.contains('active');
    };
    KTTabs.prototype.isShown = function (tabElement) {
        return this._isShown(tabElement);
    };
    KTTabs.prototype.show = function (tabElement) {
        return this._show(tabElement);
    };
    KTTabs.keyboardArrow = function () { };
    KTTabs.keyboardJump = function () { };
    KTTabs.handleAccessibility = function () { };
    KTTabs.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'tabs')) {
            return data_1.default.get(element, 'tabs');
        }
        if (element.getAttribute('data-kt-tabs')) {
            return new KTTabs(element);
        }
        return null;
    };
    KTTabs.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTTabs(element, config);
    };
    KTTabs.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-tabs]');
        elements.forEach(function (element) {
            new KTTabs(element);
        });
    };
    KTTabs.init = function () {
        KTTabs.createInstances();
        if (window.KT_TABS_INITIALIZED !== true) {
            KTTabs.handleAccessibility();
            window.KT_TABS_INITIALIZED = true;
        }
    };
    return KTTabs;
}(component_1.default));
exports.KTTabs = KTTabs;
if (typeof window !== 'undefined') {
    window.KTTabs = KTTabs;
}


/***/ }),

/***/ "./src/components/theme-switch/index.ts":
/*!**********************************************!*\
  !*** ./src/components/theme-switch/index.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTThemeSwitch = void 0;
var theme_switch_1 = __webpack_require__(/*! ./theme-switch */ "./src/components/theme-switch/theme-switch.ts");
Object.defineProperty(exports, "KTThemeSwitch", ({ enumerable: true, get: function () { return theme_switch_1.KTThemeSwitch; } }));


/***/ }),

/***/ "./src/components/theme-switch/theme-switch.ts":
/*!*****************************************************!*\
  !*** ./src/components/theme-switch/theme-switch.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTThemeSwitch = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var event_handler_1 = __webpack_require__(/*! ../../helpers/event-handler */ "./src/helpers/event-handler.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTThemeSwitch = /** @class */ (function (_super) {
    __extends(KTThemeSwitch, _super);
    function KTThemeSwitch(element, config) {
        if (config === void 0) { config = null; }
        var _this = _super.call(this) || this;
        _this._name = 'theme-swtich';
        _this._defaultConfig = {
            mode: 'light',
        };
        _this._mode = null;
        _this._currentMode = null;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._setMode((localStorage.getItem('kt-theme') ||
            _this._getOption('mode')));
        _this._handlers();
        return _this;
    }
    KTThemeSwitch.prototype._handlers = function () {
        var _this = this;
        if (!this._element)
            return;
        event_handler_1.default.on(document.body, '[data-kt-theme-switch-toggle]', 'click', function () {
            _this._toggle();
        });
        event_handler_1.default.on(document.body, '[data-kt-theme-switch-set]', 'click', function (event, target) {
            event.preventDefault();
            var mode = target.getAttribute('data-kt-theme-switch-set');
            _this._setMode(mode);
        });
    };
    KTThemeSwitch.prototype._toggle = function () {
        var mode = this._currentMode === 'light' ? 'dark' : 'light';
        this._setMode(mode);
    };
    KTThemeSwitch.prototype._setMode = function (mode) {
        if (!this._element)
            return;
        var payload = { cancel: false };
        this._fireEvent('change', payload);
        this._dispatchEvent('change', payload);
        if (payload.cancel === true) {
            return;
        }
        var currentMode = mode;
        if (mode === 'system') {
            currentMode = this._getSystemMode();
        }
        this._mode = mode;
        this._currentMode = currentMode;
        this._bindMode();
        this._updateState();
        localStorage.setItem('kt-theme', this._mode);
        this._element.setAttribute('data-kt-theme-switch-mode', mode);
        this._fireEvent('changed', {});
        this._dispatchEvent('changed', {});
    };
    KTThemeSwitch.prototype._getMode = function () {
        return (localStorage.getItem('kt-theme') || this._mode);
    };
    KTThemeSwitch.prototype._getSystemMode = function () {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    };
    KTThemeSwitch.prototype._bindMode = function () {
        if (!this._currentMode || !this._element) {
            return;
        }
        this._element.classList.remove('dark');
        this._element.classList.remove('light');
        this._element.removeAttribute(this._getOption('attribute'));
        this._element.classList.add(this._currentMode);
    };
    KTThemeSwitch.prototype._updateState = function () {
        var _this = this;
        var elements = document.querySelectorAll('input[type="checkbox"][data-kt-theme-switch-state]');
        elements.forEach(function (element) {
            if (element.getAttribute('data-kt-theme-switch-state') === _this._mode) {
                element.checked = true;
            }
        });
    };
    KTThemeSwitch.prototype.getMode = function () {
        return this._getMode();
    };
    KTThemeSwitch.prototype.setMode = function (mode) {
        this.setMode(mode);
    };
    KTThemeSwitch.getInstance = function () {
        var root = document.documentElement;
        if (data_1.default.has(root, 'theme-switch')) {
            return data_1.default.get(root, 'theme-switch');
        }
        if (root) {
            return new KTThemeSwitch(root);
        }
        return null;
    };
    KTThemeSwitch.createInstances = function () {
        var root = document.documentElement;
        if (root)
            new KTThemeSwitch(root);
    };
    KTThemeSwitch.init = function () {
        KTThemeSwitch.createInstances();
    };
    return KTThemeSwitch;
}(component_1.default));
exports.KTThemeSwitch = KTThemeSwitch;


/***/ }),

/***/ "./src/components/toggle-password/index.ts":
/*!*************************************************!*\
  !*** ./src/components/toggle-password/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTTogglePassword = void 0;
var toggle_password_1 = __webpack_require__(/*! ./toggle-password */ "./src/components/toggle-password/toggle-password.ts");
Object.defineProperty(exports, "KTTogglePassword", ({ enumerable: true, get: function () { return toggle_password_1.KTTogglePassword; } }));


/***/ }),

/***/ "./src/components/toggle-password/toggle-password.ts":
/*!***********************************************************!*\
  !*** ./src/components/toggle-password/toggle-password.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTTogglePassword = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTTogglePassword = /** @class */ (function (_super) {
    __extends(KTTogglePassword, _super);
    function KTTogglePassword(element, config) {
        if (config === void 0) { config = null; }
        var _this = _super.call(this) || this;
        _this._name = 'toggle-password';
        _this._defaultConfig = {
            permanent: false,
        };
        _this._config = _this._defaultConfig;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._triggerElement = _this._element.querySelector('[data-kt-toggle-password-trigger]');
        _this._inputElement = _this._element.querySelector('input');
        if (!_this._triggerElement || !_this._inputElement) {
            return _this;
        }
        _this._handlers();
        return _this;
    }
    KTTogglePassword.prototype._handlers = function () {
        var _this = this;
        if (!this._element)
            return;
        this._triggerElement.addEventListener('click', function () {
            _this._toggle();
        });
        this._inputElement.addEventListener('input', function () {
            _this._update();
        });
    };
    KTTogglePassword.prototype._toggle = function () {
        if (!this._element)
            return;
        var payload = { cancel: false };
        this._fireEvent('toggle', payload);
        this._dispatchEvent('toggle', payload);
        if (payload.cancel === true) {
            return;
        }
        if (this._isVisible()) {
            this._element.classList.remove('active');
            this._setVisible(false);
        }
        else {
            this._element.classList.add('active');
            this._setVisible(true);
        }
        this._fireEvent('toggled');
        this._dispatchEvent('toggled');
    };
    KTTogglePassword.prototype._update = function () {
        if (!this._element)
            return;
        if (this._getOption('permanent') === false) {
            if (this._isVisible()) {
                this._setVisible(false);
            }
        }
    };
    KTTogglePassword.prototype._isVisible = function () {
        return this._inputElement.getAttribute('type') === 'text';
    };
    KTTogglePassword.prototype._setVisible = function (flag) {
        if (flag) {
            this._inputElement.setAttribute('type', 'text');
        }
        else {
            this._inputElement.setAttribute('type', 'password');
        }
    };
    KTTogglePassword.prototype.toggle = function () {
        this._toggle();
    };
    KTTogglePassword.prototype.setVisible = function (flag) {
        this._setVisible(flag);
    };
    KTTogglePassword.prototype.isVisible = function () {
        return this._isVisible();
    };
    KTTogglePassword.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'toggle-password')) {
            return data_1.default.get(element, 'toggle-password');
        }
        if (element.getAttribute('data-kt-toggle-password')) {
            return new KTTogglePassword(element);
        }
        return null;
    };
    KTTogglePassword.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTTogglePassword(element, config);
    };
    KTTogglePassword.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-toggle-password]');
        elements.forEach(function (element) {
            new KTTogglePassword(element);
        });
    };
    KTTogglePassword.init = function () {
        KTTogglePassword.createInstances();
    };
    return KTTogglePassword;
}(component_1.default));
exports.KTTogglePassword = KTTogglePassword;
if (typeof window !== 'undefined') {
    window.KTTogglePassword = KTTogglePassword;
}


/***/ }),

/***/ "./src/components/toggle/index.ts":
/*!****************************************!*\
  !*** ./src/components/toggle/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTToggle = void 0;
var toggle_1 = __webpack_require__(/*! ./toggle */ "./src/components/toggle/toggle.ts");
Object.defineProperty(exports, "KTToggle", ({ enumerable: true, get: function () { return toggle_1.KTToggle; } }));


/***/ }),

/***/ "./src/components/toggle/toggle.ts":
/*!*****************************************!*\
  !*** ./src/components/toggle/toggle.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTToggle = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var KTToggle = /** @class */ (function (_super) {
    __extends(KTToggle, _super);
    function KTToggle(element, config) {
        if (config === void 0) { config = null; }
        var _this = _super.call(this) || this;
        _this._name = 'toggle';
        _this._defaultConfig = {
            target: '',
            activeClass: 'active',
            class: '',
            removeClass: '',
            attribute: '',
        };
        _this._config = _this._defaultConfig;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._targetElement = _this._getTargetElement();
        if (!_this._targetElement) {
            return _this;
        }
        _this._handlers();
        return _this;
    }
    KTToggle.prototype._handlers = function () {
        var _this = this;
        if (!this._element)
            return;
        this._element.addEventListener('click', function () {
            _this._toggle();
        });
    };
    KTToggle.prototype._getTargetElement = function () {
        return (dom_1.default.getElement(this._element.getAttribute('data-kt-toggle')) || dom_1.default.getElement(this._getOption('target')));
    };
    KTToggle.prototype._toggle = function () {
        if (!this._element)
            return;
        var payload = { cancel: false };
        this._fireEvent('toggle', payload);
        this._dispatchEvent('toggle', payload);
        if (payload.cancel === true) {
            return;
        }
        this._element.classList.toggle(this._getOption('activeClass'));
        this._update();
        this._fireEvent('toggled');
        this._dispatchEvent('toggled');
    };
    KTToggle.prototype._update = function () {
        if (!this._targetElement)
            return;
        if (this._getOption('removeClass')) {
            dom_1.default.removeClass(this._targetElement, this._getOption('removeClass'));
        }
        if (!this._isActive()) {
            if (this._getOption('class')) {
                dom_1.default.addClass(this._targetElement, this._getOption('class'));
            }
            if (this._getOption('attribute')) {
                this._targetElement.setAttribute(this._getOption('attribute'), 'true');
            }
        }
        else {
            if (this._getOption('class')) {
                dom_1.default.removeClass(this._targetElement, this._getOption('class'));
            }
            if (this._getOption('attribute')) {
                this._targetElement.removeAttribute(this._getOption('attribute'));
            }
        }
    };
    KTToggle.prototype._isActive = function () {
        if (!this._element)
            return false;
        return (dom_1.default.hasClass(this._targetElement, this._getOption('class')) ||
            this._targetElement.hasAttribute(this._getOption('attribute')));
    };
    KTToggle.prototype.toggle = function () {
        this._toggle();
    };
    KTToggle.prototype.update = function () {
        this._update();
    };
    KTToggle.prototype.isActive = function () {
        return this._isActive();
    };
    KTToggle.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'toggle')) {
            return data_1.default.get(element, 'toggle');
        }
        if (element.getAttribute('data-kt-toggle')) {
            return new KTToggle(element);
        }
        return null;
    };
    KTToggle.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTToggle(element, config);
    };
    KTToggle.createInstances = function () {
        var elements = document.querySelectorAll('[data-kt-toggle]');
        elements.forEach(function (element) {
            new KTToggle(element);
        });
    };
    KTToggle.init = function () {
        KTToggle.createInstances();
    };
    return KTToggle;
}(component_1.default));
exports.KTToggle = KTToggle;
if (typeof window !== 'undefined') {
    window.KTToggle = KTToggle;
}


/***/ }),

/***/ "./src/components/tooltip/index.ts":
/*!*****************************************!*\
  !*** ./src/components/tooltip/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTTooltip = void 0;
var tooltip_1 = __webpack_require__(/*! ./tooltip */ "./src/components/tooltip/tooltip.ts");
Object.defineProperty(exports, "KTTooltip", ({ enumerable: true, get: function () { return tooltip_1.KTTooltip; } }));


/***/ }),

/***/ "./src/components/tooltip/tooltip.ts":
/*!*******************************************!*\
  !*** ./src/components/tooltip/tooltip.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTTooltip = void 0;
var data_1 = __webpack_require__(/*! ../../helpers/data */ "./src/helpers/data.ts");
var dom_1 = __webpack_require__(/*! ../../helpers/dom */ "./src/helpers/dom.ts");
var component_1 = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var core_1 = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
var KTTooltip = /** @class */ (function (_super) {
    __extends(KTTooltip, _super);
    function KTTooltip(element, config) {
        if (config === void 0) { config = null; }
        var _this = _super.call(this) || this;
        _this._name = 'tooltip';
        _this._defaultConfig = {
            target: '',
            hiddenClass: 'hidden',
            trigger: 'hover',
            placement: 'top',
            placementRtl: 'top',
            container: '',
            strategy: 'fixed',
            offset: '0, 5px',
            offsetRtl: '0, 5px',
            delayShow: 0,
            delayHide: 0,
            permanent: false,
            zindex: '100',
        };
        _this._config = _this._defaultConfig;
        _this._isOpen = false;
        _this._transitioning = false;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        _this._targetElement = _this._getTargetElement();
        if (!_this._targetElement) {
            return _this;
        }
        _this._handlers();
        return _this;
    }
    KTTooltip.prototype._getTargetElement = function () {
        return (dom_1.default.getElement(this._element.getAttribute('data-kt-tooltip')) ||
            this._element.querySelector('.tooltip, .popover, [data-kt-tooltip-content]') ||
            dom_1.default.getElement(this._getOption('target')));
    };
    KTTooltip.prototype._handlers = function () {
        var _this = this;
        if (!this._element)
            return;
        if (this._getOption('trigger') === 'click') {
            this._element.addEventListener('click', function () { return _this._toggle(); });
        }
        if (this._getOption('trigger') === 'focus') {
            this._element.addEventListener('focus', function () { return _this._toggle(); });
            this._element.addEventListener('blur', function () { return _this._hide(); });
        }
        if (this._getOption('trigger') === 'hover') {
            this._element.addEventListener('mouseenter', function () { return _this._show(); });
            this._element.addEventListener('mouseleave', function () { return _this._hide(); });
        }
    };
    KTTooltip.prototype._show = function () {
        var _this = this;
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        if (this._isOpen)
            return;
        this._timeout = setTimeout(function () {
            var payload = { cancel: false };
            _this._fireEvent('show', payload);
            _this._dispatchEvent('show', payload);
            if (payload.cancel === true) {
                return;
            }
            if (!_this._targetElement) {
                return;
            }
            if (!_this._element)
                return;
            _this._createPopper();
            _this._handleContainer();
            _this._setZindex();
            _this._targetElement.classList.add('show');
            _this._targetElement.classList.remove(_this._getOption('hiddenClass'));
            _this._targetElement.style.opacity = '0';
            dom_1.default.reflow(_this._targetElement);
            _this._targetElement.style.opacity = '1';
            _this._transitioning = true;
            _this._isOpen = true;
            dom_1.default.transitionEnd(_this._targetElement, function () {
                _this._targetElement.style.opacity = '';
                _this._transitioning = false;
                _this._fireEvent('shown');
                _this._dispatchEvent('shown');
            });
        }, this._getOption('delayShow'));
    };
    KTTooltip.prototype._hide = function () {
        var _this = this;
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        if (!this._isOpen)
            return;
        this._timeout = setTimeout(function () {
            var payload = { cancel: false };
            _this._fireEvent('hide', payload);
            _this._dispatchEvent('hide', payload);
            if (payload.cancel === true) {
                return;
            }
            if (!_this._targetElement) {
                return;
            }
            _this._targetElement.style.opacity = '1';
            dom_1.default.reflow(_this._targetElement);
            _this._targetElement.style.opacity = '0';
            _this._transitioning = true;
            _this._isOpen = false;
            dom_1.default.transitionEnd(_this._targetElement, function () {
                _this._popper.destroy();
                _this._targetElement.classList.remove('show');
                _this._targetElement.classList.add(_this._getOption('hiddenClass'));
                _this._targetElement.style.opacity = '';
                _this._transitioning = false;
                _this._fireEvent('hidden');
                _this._dispatchEvent('hidden');
            });
        }, this._getOption('delayHide'));
    };
    KTTooltip.prototype._toggle = function () {
        var payload = { cancel: false };
        this._fireEvent('toggle', payload);
        this._dispatchEvent('toggle', payload);
        if (payload.cancel === true) {
            return;
        }
        if (this._isOpen) {
            this._hide();
        }
        else {
            this._show();
        }
    };
    KTTooltip.prototype._createPopper = function () {
        if (!this._element)
            return;
        var isRtl = dom_1.default.isRTL();
        // Placement
        var placement = this._getOption('placement');
        if (isRtl && this._getOption('placementRtl')) {
            placement = this._getOption('placementRtl');
        }
        // Offset
        var offsetValue = this._getOption('offset');
        if (isRtl && this._getOption('offsetRtl')) {
            offsetValue = this._getOption('offsetRtl');
        }
        var offset = offsetValue
            ? offsetValue
                .toString()
                .split(',')
                .map(function (value) { return parseInt(value.trim(), 10); })
            : [0, 0];
        if (!this._targetElement) {
            return;
        }
        this._popper = (0, core_1.createPopper)(this._element, this._targetElement, {
            placement: placement,
            strategy: this._getOption('strategy'),
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: offset,
                    },
                },
            ],
        });
    };
    KTTooltip.prototype._handleContainer = function () {
        var _a;
        if (this._getOption('container')) {
            if (this._getOption('container') === 'body') {
                document.body.appendChild(this._targetElement);
            }
            else {
                (_a = document
                    .querySelector(this._getOption('container'))) === null || _a === void 0 ? void 0 : _a.appendChild(this._targetElement);
            }
        }
    };
    KTTooltip.prototype._setZindex = function () {
        var zindex = parseInt(this._getOption('zindex'));
        if (parseInt(dom_1.default.getCssProp(this._element, 'z-index')) > zindex) {
            zindex = parseInt(dom_1.default.getCssProp(this._element, 'z-index'));
        }
        if (dom_1.default.getHighestZindex(this._element) > zindex) {
            zindex = dom_1.default.getHighestZindex(this._element) + 1;
        }
        this._targetElement.style.zIndex = String(zindex);
    };
    KTTooltip.prototype.show = function () {
        this._show();
    };
    KTTooltip.prototype.hide = function () {
        this._hide();
    };
    KTTooltip.prototype.toggle = function () {
        this._toggle();
    };
    KTTooltip.prototype.getContentElement = function () {
        return this._targetElement;
    };
    KTTooltip.prototype.isOpen = function () {
        return this._isOpen;
    };
    KTTooltip.prototype.getTriggerOption = function () {
        return this._getOption('trigger');
    };
    KTTooltip.prototype.isPermanent = function () {
        return this._getOption('permanent');
    };
    KTTooltip.initHandlers = function () {
        document.addEventListener('click', function (event) {
            document
                .querySelectorAll('[data-kt-tooltip-initialized]')
                .forEach(function (tooltipElement) {
                var tooltip = KTTooltip.getInstance(tooltipElement);
                if (tooltip &&
                    tooltip.isOpen() &&
                    tooltip.getTriggerOption() !== 'hover' &&
                    !tooltip.isPermanent()) {
                    var contentElement = tooltip.getContentElement();
                    if (contentElement &&
                        (contentElement === event.target ||
                            contentElement.contains(event.target))) {
                        return;
                    }
                    else {
                        tooltip.hide();
                    }
                }
            });
        });
    };
    KTTooltip.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'tooltip')) {
            return data_1.default.get(element, 'tooltip');
        }
        if (element.getAttribute('data-kt-tooltip')) {
            return new KTTooltip(element);
        }
        return null;
    };
    KTTooltip.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTTooltip(element, config);
    };
    KTTooltip.createInstances = function () {
        document.querySelectorAll('[data-kt-tooltip]').forEach(function (element) {
            new KTTooltip(element);
        });
    };
    KTTooltip.init = function () {
        KTTooltip.createInstances();
        if (window.KT_TOOLTIP_INITIALIZED !== true) {
            KTTooltip.initHandlers();
            window.KT_TOOLTIP_INITIALIZED = true;
        }
    };
    return KTTooltip;
}(component_1.default));
exports.KTTooltip = KTTooltip;
if (typeof window !== 'undefined') {
    window.KTTooltip = KTTooltip;
}


/***/ }),

/***/ "./src/helpers/data.ts":
/*!*****************************!*\
  !*** ./src/helpers/data.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var KTElementMap = new Map();
var KTData = {
    set: function (element, key, value) {
        if (!KTElementMap.has(element)) {
            KTElementMap.set(element, new Map());
        }
        var valueMap = KTElementMap.get(element);
        valueMap.set(key, value);
    },
    get: function (element, key) {
        if (KTElementMap.has(element)) {
            return KTElementMap.get(element).get(key) || null;
        }
        return null;
    },
    has: function (element, key) {
        return KTElementMap.has(element) && KTElementMap.get(element).has(key);
    },
    remove: function (element, key) {
        if (!KTElementMap.has(element) || !KTElementMap.get(element).has(key)) {
            return;
        }
        var valueMap = KTElementMap.get(element);
        valueMap.delete(key);
        if (valueMap.size === 0) {
            KTElementMap.delete(element);
        }
    }
};
exports["default"] = KTData;


/***/ }),

/***/ "./src/helpers/dom.ts":
/*!****************************!*\
  !*** ./src/helpers/dom.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable max-len */
var utils_1 = __webpack_require__(/*! ./utils */ "./src/helpers/utils.ts");
var KTDom = {
    isRTL: function () {
        var htmlTag = document.documentElement; // Access the <html> tag
        // Check if the "dir" attribute is present and its value is "rtl"
        var dir = htmlTag.getAttribute('dir');
        return dir === 'rtl';
    },
    isElement: function (element) {
        if (element && element instanceof HTMLElement) {
            return true;
        }
        else {
            return false;
        }
    },
    getElement: function (element) {
        if (this.isElement(element)) {
            return element;
        }
        if (element && element.length > 0) {
            return document.querySelector(utils_1.default.parseSelector(element));
        }
        return null;
    },
    remove: function (element) {
        if (this.isElement(element) && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },
    hasClass: function (element, className) {
        // Split classNames string into an array of individual class names
        var classes = className.split(' ');
        // Loop through each class name
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var className_1 = classes_1[_i];
            // Check if the element has the current class name
            if (!element.classList.contains(className_1)) {
                // Return false if any class is missing
                return false;
            }
        }
        // Return true if all classes are present
        return true;
    },
    addClass: function (element, className) {
        var classNames = className.split(' ');
        if (element.classList) {
            for (var i = 0; i < classNames.length; i++) {
                if (classNames[i] && classNames[i].length > 0) {
                    element.classList.add(classNames[i].trim());
                }
            }
        }
        else if (!this.hasClass(element, className)) {
            for (var x = 0; x < classNames.length; x++) {
                element.className += ' ' + classNames[x].trim();
            }
        }
    },
    removeClass: function (element, className) {
        var classNames = className.split(' ');
        if (element.classList) {
            for (var i = 0; i < classNames.length; i++) {
                element.classList.remove(classNames[i].trim());
            }
        }
        else if (this.hasClass(element, className)) {
            for (var x = 0; x < classNames.length; x++) {
                element.className = element.className.replace(new RegExp('\\b' + classNames[x].trim() + '\\b', 'g'), '');
            }
        }
    },
    getCssProp: function (element, prop) {
        return (element ? window.getComputedStyle(element).getPropertyValue(prop) : '').replace(' ', '');
    },
    setCssProp: function (element, prop, value) {
        if (element) {
            window.getComputedStyle(element).setProperty(prop, value);
        }
    },
    offset: function (element) {
        if (!element)
            return { top: 0, left: 0, right: 0, bottom: 0 };
        var rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            right: window.innerWidth - rect.right,
            bottom: window.innerHeight - rect.top,
        };
    },
    getIndex: function (element) {
        var _a;
        var children = Array.from(((_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.children) || []);
        return children.indexOf(element);
    },
    parents: function (element, selector) {
        var parents = [];
        // Push each parent element to the array
        for (element && element !== document.documentElement; (element = element.parentElement);) {
            if (selector) {
                if (element.matches(selector)) {
                    parents.push(element);
                }
                continue;
            }
            parents.push(element);
        }
        // Return our parent array
        return parents;
    },
    siblings: function (element) {
        var parent = element.parentNode;
        if (!parent)
            return [];
        return Array.from(parent.children).filter(function (child) { return child !== element; });
    },
    children: function (element, selector) {
        if (!element || !element.childNodes) {
            return null;
        }
        var result = [];
        var l = element.childNodes.length;
        var i = 0;
        for (i = 0; i < l; i++) {
            if (element.childNodes[i].nodeType == 1 &&
                element.childNodes[i].matches(selector)) {
                result.push(element.childNodes[i]);
            }
        }
        return result;
    },
    child: function (element, selector) {
        var children = KTDom.children(element, selector);
        return children ? children[0] : null;
    },
    isVisible: function (element) {
        if (!this.isElement(element) || element.getClientRects().length === 0) {
            return false;
        }
        // eslint-disable-next-line max-len
        return (getComputedStyle(element).getPropertyValue('visibility') === 'visible');
    },
    isDisabled: function (element) {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
        }
        if (element.classList.contains('disabled')) {
            return true;
        }
        if (typeof element.disabled !== 'undefined') {
            return element.disabled;
        }
        return (element.hasAttribute('disabled') &&
            element.getAttribute('disabled') !== 'false');
    },
    transitionEnd: function (element, callback) {
        var duration = this.getCSSTransitionDuration(element);
        setTimeout(function () {
            callback();
        }, duration);
    },
    animationEnd: function (element, callback) {
        var duration = this.getCSSAnimationDuration(element);
        setTimeout(function () {
            callback();
        }, duration);
    },
    getCSSTransitionDuration: function (element) {
        return (parseFloat(window.getComputedStyle(element).transitionDuration) * 1000);
    },
    getCSSAnimationDuration: function (element) {
        return (parseFloat(window.getComputedStyle(element).animationDuration) * 1000);
    },
    reflow: function (element) {
        element.offsetHeight;
    },
    insertAfter: function (element, referenceNode) {
        var parentNode = referenceNode.parentNode;
        if (parentNode) {
            parentNode.insertBefore(element, referenceNode.nextSibling);
        }
    },
    getHighestZindex: function (element) {
        var position, value;
        while (element && element !== document.documentElement) {
            // Ignore z-index if position is set to a value where z-index is ignored by the browser
            // This makes behavior of this function consistent across browsers
            // WebKit always returns auto if the element is positioned
            position = element.style.position;
            if (position === 'absolute' ||
                position === 'relative' ||
                position === 'fixed') {
                // IE returns 0 when zIndex is not specified
                // other browsers return a string
                // we ignore the case of nested elements with an explicit value of 0
                // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
                value = parseInt(element.style.zIndex);
                if (!isNaN(value) && value !== 0) {
                    return value;
                }
            }
            element = element.parentNode;
        }
        return 1;
    },
    isParentOrElementHidden: function (element) {
        if (!element) {
            return false;
        }
        var computedStyle = window.getComputedStyle(element);
        if (computedStyle.display === 'none') {
            return true;
        }
        return this.isParentOrElementHidden(element.parentElement);
    },
    getViewPort: function () {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    },
    getScrollTop: function () {
        return (document.scrollingElement || document.documentElement).scrollTop;
    },
    isInViewport: function (element) {
        var rect = element.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    },
    isPartiallyInViewport: function (element) {
        var x = element.getBoundingClientRect().left;
        var y = element.getBoundingClientRect().top;
        var ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var hw = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var w = element.clientWidth;
        var h = element.clientHeight;
        return y < hw && y + h > 0 && x < ww && x + w > 0;
    },
    isVisibleInParent: function (child, parent) {
        var childRect = child.getBoundingClientRect();
        var parentRect = parent.getBoundingClientRect();
        // Check if the child element is visible
        if (child.offsetParent === null ||
            getComputedStyle(child).visibility === 'hidden' ||
            getComputedStyle(child).display === 'none') {
            return false;
        }
        // Check if the child is within the vertical bounds of the parent
        var isVisibleVertically = childRect.top >= parentRect.top && childRect.bottom <= parentRect.bottom;
        // Check if the child is within the horizontal bounds of the parent
        var isVisibleHorizontally = childRect.left >= parentRect.left && childRect.right <= parentRect.right;
        return isVisibleVertically && isVisibleHorizontally;
    },
    getRelativeTopPosition: function (child, parent) {
        var childRect = child.getBoundingClientRect();
        var parentRect = parent.getBoundingClientRect();
        // Calculate the relative top position
        var relativeTop = childRect.top - parentRect.top;
        return relativeTop;
    },
    getDataAttributes: function (element, prefix) {
        if (!element) {
            return {};
        }
        prefix = utils_1.default.camelCase(prefix);
        var attributes = {};
        var keys = Object.keys(element.dataset).filter(function (key) {
            return key.startsWith(prefix);
        });
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var normalizedKey = key.replace(prefix, '');
            normalizedKey = utils_1.default.uncapitalize(normalizedKey);
            attributes[normalizedKey] = utils_1.default.parseDataAttribute(element.dataset[key]);
        }
        return attributes;
    },
    ready: function (callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                callback();
            });
        }
        else {
            callback();
        }
    },
};
exports["default"] = KTDom;


/***/ }),

/***/ "./src/helpers/event-handler.ts":
/*!**************************************!*\
  !*** ./src/helpers/event-handler.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/helpers/utils.ts");
var KTDelegatedEventHandlers = {};
var KTEventHandler = {
    on: function (element, selector, eventName, handler) {
        var _this = this;
        if (element === null) {
            return null;
        }
        var eventId = utils_1.default.geUID('event');
        KTDelegatedEventHandlers[eventId] = function (event) {
            var targets = element.querySelectorAll(selector);
            var target = event.target;
            while (target && target !== element) {
                for (var i = 0, j = targets.length; i < j; i++) {
                    if (target === targets[i]) {
                        handler.call(_this, event, target);
                    }
                }
                target = target.parentNode;
            }
        };
        element.addEventListener(eventName, KTDelegatedEventHandlers[eventId]);
        return eventId;
    },
    off: function (element, eventName, eventId) {
        if (!element || KTDelegatedEventHandlers[eventId] === null) {
            return;
        }
        element.removeEventListener(eventName, KTDelegatedEventHandlers[eventId]);
        delete KTDelegatedEventHandlers[eventId];
    }
};
exports["default"] = KTEventHandler;


/***/ }),

/***/ "./src/helpers/utils.ts":
/*!******************************!*\
  !*** ./src/helpers/utils.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var KTUtils = {
    geUID: function (prefix) {
        if (prefix === void 0) { prefix = ''; }
        return prefix + Math.floor(Math.random() * new Date().getTime());
    },
    getCssVar: function (variable) {
        var hex = getComputedStyle(document.documentElement).getPropertyValue(variable);
        if (hex && hex.length > 0) {
            hex = hex.trim();
        }
        return hex;
    },
    parseDataAttribute: function (value) {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        if (value === Number(value).toString()) {
            return Number(value);
        }
        if (value === '' || value === 'null') {
            return null;
        }
        if (typeof value !== 'string') {
            return value;
        }
        try {
            return KTUtils.parseJson(value);
        }
        catch (_a) {
            return value;
        }
    },
    parseJson: function (value) {
        return value && value.length > 0
            ? JSON.parse(decodeURIComponent(value))
            : null;
    },
    parseSelector: function (selector) {
        if (selector && window.CSS && window.CSS.escape) {
            // Escape any IDs in the selector using CSS.escape
            selector = selector.replace(/#([^\s"#']+)/g, function (match, id) { return "#".concat(window.CSS.escape(id)); });
        }
        return selector;
    },
    capitalize: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    },
    uncapitalize: function (value) {
        return value.charAt(0).toLowerCase() + value.slice(1);
    },
    camelCase: function (value) {
        return value.replace(/-([a-z])/g, function (match, letter) {
            return letter.toUpperCase();
        });
    },
    camelReverseCase: function (str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },
    isRTL: function () {
        var htmlElement = document.querySelector('html');
        return Boolean(htmlElement && htmlElement.getAttribute('direction') === 'rtl');
    },
    throttle: function (timer, func, delay) {
        // If setTimeout is already scheduled, no need to do anything
        if (timer) {
            return;
        }
        // Schedule a setTimeout after delay seconds
        timer = setTimeout(function () {
            func();
            // Once setTimeout function execution is finished, timerId = undefined so that in <br>
            // the next scroll event function execution can be scheduled by the setTimeout
            clearTimeout(timer);
        }, delay);
    },
    checksum: function (value) {
        var hash = 0;
        for (var i = 0; i < value.length; i++) {
            hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
        }
        return ('0000000' + (hash >>> 0).toString(16)).slice(-8);
    },
    stringToBoolean: function (value) {
        if (typeof value === 'boolean')
            return value;
        if (typeof value !== 'string')
            return null;
        var cleanedStr = value.toLowerCase().trim();
        if (cleanedStr === 'true')
            return true;
        if (cleanedStr === 'false')
            return false;
        return null;
    },
    stringToObject: function (value) {
        try {
            var parsed = JSON.parse(value.toString());
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                return parsed;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    },
    stringToInteger: function (value) {
        // If already a number, return it as an integer
        if (typeof value === 'number' && !isNaN(value)) {
            return Math.floor(value);
        }
        // If not a string, return null
        if (typeof value !== 'string')
            return null;
        var cleanedStr = value.trim();
        var num = parseInt(cleanedStr, 10);
        if (!isNaN(num) && cleanedStr !== '') {
            return num;
        }
        return null;
    },
    stringToFloat: function (value) {
        // If already a number, return it as is
        if (typeof value === 'number' && !isNaN(value)) {
            return value;
        }
        // If not a string, return null
        if (typeof value !== 'string')
            return null;
        var cleanedStr = value.trim();
        var num = parseFloat(cleanedStr);
        if (!isNaN(num) && cleanedStr !== '') {
            return num;
        }
        return null;
    },
};
exports["default"] = KTUtils;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/*
 * ReUI
 * @version: 1.0.0
 * @author: Keenthemes
 * Copyright 2024 Keenthemes
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KTSelect = exports.KTDatepicker = exports.KTDataTable = exports.KTTogglePassword = exports.KTImageInput = exports.KTThemeSwitch = exports.KTStepper = exports.KTTooltip = exports.KTToggle = exports.KTReparent = exports.KTSticky = exports.KTScrollto = exports.KTScrollable = exports.KTScrollspy = exports.KTAccordion = exports.KTTabs = exports.KTDismiss = exports.KTCollapse = exports.KTDrawer = exports.KTModal = exports.KTDropdown = void 0;
var dom_1 = __webpack_require__(/*! ./helpers/dom */ "./src/helpers/dom.ts");
var dropdown_1 = __webpack_require__(/*! ./components/dropdown */ "./src/components/dropdown/index.ts");
var modal_1 = __webpack_require__(/*! ./components/modal */ "./src/components/modal/index.ts");
var drawer_1 = __webpack_require__(/*! ./components/drawer */ "./src/components/drawer/index.ts");
var collapse_1 = __webpack_require__(/*! ./components/collapse */ "./src/components/collapse/index.ts");
var dismiss_1 = __webpack_require__(/*! ./components/dismiss */ "./src/components/dismiss/index.ts");
var tabs_1 = __webpack_require__(/*! ./components/tabs */ "./src/components/tabs/index.ts");
var accordion_1 = __webpack_require__(/*! ./components/accordion */ "./src/components/accordion/index.ts");
var scrollspy_1 = __webpack_require__(/*! ./components/scrollspy */ "./src/components/scrollspy/index.ts");
var scrollable_1 = __webpack_require__(/*! ./components/scrollable */ "./src/components/scrollable/index.ts");
var scrollto_1 = __webpack_require__(/*! ./components/scrollto */ "./src/components/scrollto/index.ts");
var sticky_1 = __webpack_require__(/*! ./components/sticky */ "./src/components/sticky/index.ts");
var reparent_1 = __webpack_require__(/*! ./components/reparent */ "./src/components/reparent/index.ts");
var toggle_1 = __webpack_require__(/*! ./components/toggle */ "./src/components/toggle/index.ts");
var tooltip_1 = __webpack_require__(/*! ./components/tooltip */ "./src/components/tooltip/index.ts");
var stepper_1 = __webpack_require__(/*! ./components/stepper */ "./src/components/stepper/index.ts");
var theme_switch_1 = __webpack_require__(/*! ./components/theme-switch */ "./src/components/theme-switch/index.ts");
var image_input_1 = __webpack_require__(/*! ./components/image-input */ "./src/components/image-input/index.ts");
var toggle_password_1 = __webpack_require__(/*! ./components/toggle-password */ "./src/components/toggle-password/index.ts");
var datatable_1 = __webpack_require__(/*! ./components/datatable */ "./src/components/datatable/index.ts");
var datepicker_1 = __webpack_require__(/*! ./components/datepicker */ "./src/components/datepicker/index.ts");
var select_1 = __webpack_require__(/*! ./components/select */ "./src/components/select/index.ts");
var dropdown_2 = __webpack_require__(/*! ./components/dropdown */ "./src/components/dropdown/index.ts");
Object.defineProperty(exports, "KTDropdown", ({ enumerable: true, get: function () { return dropdown_2.KTDropdown; } }));
var modal_2 = __webpack_require__(/*! ./components/modal */ "./src/components/modal/index.ts");
Object.defineProperty(exports, "KTModal", ({ enumerable: true, get: function () { return modal_2.KTModal; } }));
var drawer_2 = __webpack_require__(/*! ./components/drawer */ "./src/components/drawer/index.ts");
Object.defineProperty(exports, "KTDrawer", ({ enumerable: true, get: function () { return drawer_2.KTDrawer; } }));
var collapse_2 = __webpack_require__(/*! ./components/collapse */ "./src/components/collapse/index.ts");
Object.defineProperty(exports, "KTCollapse", ({ enumerable: true, get: function () { return collapse_2.KTCollapse; } }));
var dismiss_2 = __webpack_require__(/*! ./components/dismiss */ "./src/components/dismiss/index.ts");
Object.defineProperty(exports, "KTDismiss", ({ enumerable: true, get: function () { return dismiss_2.KTDismiss; } }));
var tabs_2 = __webpack_require__(/*! ./components/tabs */ "./src/components/tabs/index.ts");
Object.defineProperty(exports, "KTTabs", ({ enumerable: true, get: function () { return tabs_2.KTTabs; } }));
var accordion_2 = __webpack_require__(/*! ./components/accordion */ "./src/components/accordion/index.ts");
Object.defineProperty(exports, "KTAccordion", ({ enumerable: true, get: function () { return accordion_2.KTAccordion; } }));
var scrollspy_2 = __webpack_require__(/*! ./components/scrollspy */ "./src/components/scrollspy/index.ts");
Object.defineProperty(exports, "KTScrollspy", ({ enumerable: true, get: function () { return scrollspy_2.KTScrollspy; } }));
var scrollable_2 = __webpack_require__(/*! ./components/scrollable */ "./src/components/scrollable/index.ts");
Object.defineProperty(exports, "KTScrollable", ({ enumerable: true, get: function () { return scrollable_2.KTScrollable; } }));
var scrollto_2 = __webpack_require__(/*! ./components/scrollto */ "./src/components/scrollto/index.ts");
Object.defineProperty(exports, "KTScrollto", ({ enumerable: true, get: function () { return scrollto_2.KTScrollto; } }));
var sticky_2 = __webpack_require__(/*! ./components/sticky */ "./src/components/sticky/index.ts");
Object.defineProperty(exports, "KTSticky", ({ enumerable: true, get: function () { return sticky_2.KTSticky; } }));
var reparent_2 = __webpack_require__(/*! ./components/reparent */ "./src/components/reparent/index.ts");
Object.defineProperty(exports, "KTReparent", ({ enumerable: true, get: function () { return reparent_2.KTReparent; } }));
var toggle_2 = __webpack_require__(/*! ./components/toggle */ "./src/components/toggle/index.ts");
Object.defineProperty(exports, "KTToggle", ({ enumerable: true, get: function () { return toggle_2.KTToggle; } }));
var tooltip_2 = __webpack_require__(/*! ./components/tooltip */ "./src/components/tooltip/index.ts");
Object.defineProperty(exports, "KTTooltip", ({ enumerable: true, get: function () { return tooltip_2.KTTooltip; } }));
var stepper_2 = __webpack_require__(/*! ./components/stepper */ "./src/components/stepper/index.ts");
Object.defineProperty(exports, "KTStepper", ({ enumerable: true, get: function () { return stepper_2.KTStepper; } }));
var theme_switch_2 = __webpack_require__(/*! ./components/theme-switch */ "./src/components/theme-switch/index.ts");
Object.defineProperty(exports, "KTThemeSwitch", ({ enumerable: true, get: function () { return theme_switch_2.KTThemeSwitch; } }));
var image_input_2 = __webpack_require__(/*! ./components/image-input */ "./src/components/image-input/index.ts");
Object.defineProperty(exports, "KTImageInput", ({ enumerable: true, get: function () { return image_input_2.KTImageInput; } }));
var toggle_password_2 = __webpack_require__(/*! ./components/toggle-password */ "./src/components/toggle-password/index.ts");
Object.defineProperty(exports, "KTTogglePassword", ({ enumerable: true, get: function () { return toggle_password_2.KTTogglePassword; } }));
var datatable_2 = __webpack_require__(/*! ./components/datatable */ "./src/components/datatable/index.ts");
Object.defineProperty(exports, "KTDataTable", ({ enumerable: true, get: function () { return datatable_2.KTDataTable; } }));
var datepicker_2 = __webpack_require__(/*! ./components/datepicker */ "./src/components/datepicker/index.ts");
Object.defineProperty(exports, "KTDatepicker", ({ enumerable: true, get: function () { return datepicker_2.KTDatepicker; } }));
var select_2 = __webpack_require__(/*! ./components/select */ "./src/components/select/index.ts");
Object.defineProperty(exports, "KTSelect", ({ enumerable: true, get: function () { return select_2.KTSelect; } }));
var KTComponents = {
    init: function () {
        dropdown_1.KTDropdown.init();
        modal_1.KTModal.init();
        drawer_1.KTDrawer.init();
        collapse_1.KTCollapse.init();
        dismiss_1.KTDismiss.init();
        tabs_1.KTTabs.init();
        accordion_1.KTAccordion.init();
        scrollspy_1.KTScrollspy.init();
        scrollable_1.KTScrollable.init();
        scrollto_1.KTScrollto.init();
        sticky_1.KTSticky.init();
        reparent_1.KTReparent.init();
        toggle_1.KTToggle.init();
        tooltip_1.KTTooltip.init();
        stepper_1.KTStepper.init();
        theme_switch_1.KTThemeSwitch.init();
        image_input_1.KTImageInput.init();
        toggle_password_1.KTTogglePassword.init();
        datatable_1.KTDataTable.init();
        datepicker_1.KTDatepicker.init();
        select_1.KTSelect.init();
    },
};
exports["default"] = KTComponents;
dom_1.default.ready(function () {
    KTComponents.init();
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});