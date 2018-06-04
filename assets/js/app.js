/**
 * A helper script that mimics the Drupal Javascript API.
 *
 * This allows for scripts to be written like they would for Drupal (by
 * attaching behaviors) in the styleguide. As a result, scripts function
 * properly for the styleguide and may simply be symlinked to the /themes
 * directory in Drupal.
 *
 * from  https://github.com/palantirnet/butler/blob/7c0cea5f04bf9ad372fbdffe64ccebc477b13dc4/STYLEGUIDE_TEMPLATE/source/code/libraries/drupal-attach-behaviors.js
 */

window.Drupal = {behaviors: {}, locale: {}};

(function ($) {
  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || {};
    var behaviors = Drupal.behaviors;
    // Execute all of them.
    for (var i in behaviors) {
      if (behaviors.hasOwnProperty(i) && typeof behaviors[i].attach === 'function') {
        // Don't stop the execution of behaviors in case of an error.
        try {
          behaviors[i].attach(context, settings);
        }
        catch (e) {
          console.log(e);
        }
      }
    }
  };

  // Attach all behaviors.
  $('document').ready(function () { Drupal.attachBehaviors(document, {}); });
})(jQuery);

/*!
* jquery.inputmask.bundle.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2018 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.0-beta.51
*/

!function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 3);
}([ function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, factory;
    "function" == typeof Symbol && Symbol.iterator;
    factory = function($) {
        return $;
    }, __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(2) ], void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, factory, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    factory = function($, window, document, undefined) {
        var ua = navigator.userAgent, mobile = isInputEventSupported("touchstart"), iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
        function Inputmask(alias, options, internal) {
            if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
            this.el = undefined, this.events = {}, this.maskset = undefined, this.refreshValue = !1, 
            !0 !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {}, 
            alias && (options.alias = alias)), this.opts = $.extend(!0, {}, this.defaults, options), 
            this.noMasksCache = options && options.definitions !== undefined, this.userOptions = options || {}, 
            this.isRTL = this.opts.numericInput, resolveAlias(this.opts.alias, options, this.opts));
        }
        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
            return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, undefined, opts), 
            $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), 
            !1);
        }
        function generateMaskSet(opts, nocache) {
            function generateMask(mask, metadata, opts) {
                var regexMask = !1;
                if (null !== mask && "" !== mask || ((regexMask = null !== opts.regex) ? mask = (mask = opts.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (regexMask = !0, 
                mask = ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 
                opts.repeat > 0 || "*" === opts.repeat || "+" === opts.repeat) {
                    var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                    mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
                }
                var masksetDefinition, maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
                return Inputmask.prototype.masksCache[maskdefKey] === undefined || !0 === nocache ? (masksetDefinition = {
                    mask: mask,
                    maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                    validPositions: {},
                    _buffer: undefined,
                    buffer: undefined,
                    tests: {},
                    excludes: {},
                    metadata: metadata,
                    maskLength: undefined
                }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, 
                masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), 
                masksetDefinition;
            }
            if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
                if (opts.mask.length > 1) {
                    if (null === opts.keepStatic) {
                        opts.keepStatic = "auto";
                        for (var i = 0; i < opts.mask.length; i++) if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
                            opts.keepStatic = !0;
                            break;
                        }
                    }
                    var altMask = opts.groupmarker[0];
                    return $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function(ndx, msk) {
                        altMask.length > 1 && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), 
                        msk.mask === undefined || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask;
                    }), generateMask(altMask += opts.groupmarker[1], opts.mask, opts);
                }
                opts.mask = opts.mask.pop();
            }
            return opts.mask && opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts);
        }
        function isInputEventSupported(eventName) {
            var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
            return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]), 
            el = null, isSupported;
        }
        function maskScope(actionObj, maskset, opts) {
            maskset = maskset || this.maskset, opts = opts || this.opts;
            var undoValue, $el, maxLength, colorMask, inputmask = this, el = this.el, isRTL = this.isRTL, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1, mouseEnter = !1, trackCaret = !1;
            function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
                var greedy = opts.greedy;
                clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;
                var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0, lvp = getLastValidPosition();
                do {
                    if (!0 === baseOnInput && getMaskSet().validPositions[pos]) test = (testPos = !clearOptionalTail || !0 !== getMaskSet().validPositions[pos].match.optionality || !0 !== getMaskSet().validPositions[pos].generatedInput && getMaskSet().validPositions[pos].input != opts.skipOptionalPartCharacter || getMaskSet().validPositions[pos + 1] !== undefined ? getMaskSet().validPositions[pos] : determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1))).match, 
                    ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test)); else {
                        test = (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1)).match, ndxIntlzr = testPos.locator.slice();
                        var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
                        (!1 === jitMasking || jitMasking === undefined || pos < lvp || "number" == typeof jitMasking && isFinite(jitMasking) && jitMasking > pos) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test));
                    }
                    "auto" === opts.keepStatic && test.newBlockMarker && null !== test.fn && (opts.keepStatic = pos - 1), 
                    pos++;
                } while ((maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || minimalPos > pos);
                return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && getMaskSet().maskLength !== undefined || (getMaskSet().maskLength = pos - 1), 
                opts.greedy = greedy, maskTemplate;
            }
            function getMaskSet() {
                return maskset;
            }
            function resetMaskSet(soft) {
                var maskset = getMaskSet();
                maskset.buffer = undefined, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
            }
            function getLastValidPosition(closestTo, strict, validPositions) {
                var before = -1, after = -1, valids = validPositions || getMaskSet().validPositions;
                for (var posNdx in closestTo === undefined && (closestTo = -1), valids) {
                    var psNdx = parseInt(posNdx);
                    valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), 
                    psNdx >= closestTo && (after = psNdx));
                }
                return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after;
            }
            function determineTestTemplate(pos, tests, guessNextBest) {
                for (var testPos, altTest = getTest(pos = pos > 0 ? pos - 1 : 0, tests), altArr = altTest.alternation !== undefined ? altTest.locator[altTest.alternation].toString().split(",") : [], ndx = 0; ndx < tests.length && (!((testPos = tests[ndx]).match && (opts.greedy && !0 !== testPos.match.optionalQuantifier || (!1 === testPos.match.optionality || !1 === testPos.match.newBlockMarker) && !0 !== testPos.match.optionalQuantifier) && (altTest.alternation === undefined || altTest.alternation !== testPos.alternation || testPos.locator[altTest.alternation] !== undefined && checkAlternationMatch(testPos.locator[altTest.alternation].toString().split(","), altArr))) || !0 === guessNextBest && (null !== testPos.match.fn || /[0-9a-bA-Z]/.test(testPos.match.def))); ndx++) ;
                return testPos;
            }
            function getDecisionTaker(tst) {
                var decisionTaker = tst.locator[tst.alternation];
                return "string" == typeof decisionTaker && decisionTaker.length > 0 && (decisionTaker = decisionTaker.split(",")[0]), 
                decisionTaker !== undefined ? decisionTaker.toString() : "";
            }
            function getLocator(tst, align) {
                for (var locator = (tst.alternation != undefined ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join(""); locator.length < align; ) locator += "0";
                return locator;
            }
            function getTestTemplate(pos, ndxIntlzr, tstPs) {
                return getMaskSet().validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
            }
            function getTest(pos, tests) {
                return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos] : (tests || getTests(pos))[0];
            }
            function positionCanMatchDefinition(pos, def) {
                for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match.def === def) {
                    valid = !0;
                    break;
                }
                return valid;
            }
            function getTests(pos, ndxIntlzr, tstPs) {
                var latestMatch, maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [ 0 ], matches = [], insertStop = !1, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
                function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                    function handleMatch(match, loopNdx, quantifierRecurse) {
                        function isFirstMatch(latestMatch, tokenGroup) {
                            var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                            return firstMatch || $.each(tokenGroup.matches, function(ndx, match) {
                                if (!0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : !0 === match.isOptional ? firstMatch = isFirstMatch(latestMatch, match) : !0 === match.isAlternate && (firstMatch = isFirstMatch(latestMatch, match)), 
                                firstMatch) return !1;
                            }), firstMatch;
                        }
                        function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                            var bestMatch, indexPos;
                            if ((getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) && $.each(getMaskSet().tests[pos] || [ getMaskSet().validPositions[pos] ], function(ndx, lmnt) {
                                if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
                                var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation, ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                                (indexPos === undefined || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, 
                                indexPos = ndxPos);
                            }), bestMatch) {
                                var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation];
                                return (bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator).slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1);
                            }
                            return targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
                        }
                        function isSubsetOf(source, target) {
                            function expand(pattern) {
                                for (var start, end, expanded = [], i = 0, l = pattern.length; i < l; i++) if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end; ) expanded.push(String.fromCharCode(start)); else start = pattern.charCodeAt(i), 
                                expanded.push(pattern.charAt(i));
                                return expanded.join("");
                            }
                            return opts.regex && null !== source.match.fn && null !== target.match.fn ? -1 !== expand(target.match.def.replace(/[\[\]]/g, "")).indexOf(expand(source.match.def.replace(/[\[\]]/g, ""))) : source.match.def === target.match.nativeDef;
                        }
                        function setMergeLocators(targetMatch, altMatch) {
                            if (altMatch === undefined || targetMatch.alternation === altMatch.alternation && -1 === targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation])) {
                                targetMatch.mloc = targetMatch.mloc || {};
                                var locNdx = targetMatch.locator[targetMatch.alternation];
                                if (locNdx !== undefined) {
                                    if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), targetMatch.mloc[locNdx] === undefined && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), 
                                    altMatch !== undefined) {
                                        for (var ndx in altMatch.mloc) "string" == typeof ndx && (ndx = ndx.split(",")[0]), 
                                        targetMatch.mloc[ndx] === undefined && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                                        targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",");
                                    }
                                    return !0;
                                }
                                targetMatch.alternation = undefined;
                            }
                            return !1;
                        }
                        if (testPos > 5e3) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                        if (testPos === pos && match.matches === undefined) return matches.push({
                            match: match,
                            locator: loopNdx.reverse(),
                            cd: cacheDependency,
                            mloc: {}
                        }), !0;
                        if (match.matches !== undefined) {
                            if (match.isGroup && quantifierRecurse !== match) {
                                if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx)) return !0;
                            } else if (match.isOptional) {
                                var optionalToken = match;
                                if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
                                    if (latestMatch = matches[matches.length - 1].match, quantifierRecurse !== undefined || !isFirstMatch(latestMatch, optionalToken)) return !0;
                                    insertStop = !0, testPos = pos;
                                }
                            } else if (match.isAlternator) {
                                var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                                if (-1 === altIndex || "string" == typeof altIndex) {
                                    var amndx, currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
                                    if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
                                    if (getMaskSet().excludes[pos]) {
                                        for (var altIndexArrClone = altIndexArr.slice(), i = 0, el = getMaskSet().excludes[pos].length; i < el; i++) altIndexArr.splice(altIndexArr.indexOf(getMaskSet().excludes[pos][i].toString()), 1);
                                        0 === altIndexArr.length && (getMaskSet().excludes[pos] = undefined, altIndexArr = altIndexArrClone);
                                    }
                                    (!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
                                    for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
                                        amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), 
                                        alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), 
                                        maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                        for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                            var altMatch = maltMatches[ndx1], dropMatch = !1;
                                            altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, 
                                            setMergeLocators(altMatch);
                                            for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                                var altMatch2 = malternateMatches[ndx2];
                                                if ("string" != typeof altIndex || altMatch.alternation !== undefined && -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                                                    if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                                        dropMatch = !0, setMergeLocators(altMatch2, altMatch);
                                                        break;
                                                    }
                                                    if (isSubsetOf(altMatch, altMatch2)) {
                                                        setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break;
                                                    }
                                                    if (isSubsetOf(altMatch2, altMatch)) {
                                                        setMergeLocators(altMatch2, altMatch);
                                                        break;
                                                    }
                                                    if (target = altMatch2, null === (source = altMatch).match.fn && null !== target.match.fn && target.match.fn.test(source.match.def, getMaskSet(), pos, !1, opts, !1)) {
                                                        setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break;
                                                    }
                                                }
                                            }
                                            dropMatch || malternateMatches.push(altMatch);
                                        }
                                    }
                                    matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = matches.length > 0, 
                                    match = malternateMatches.length > 0, ndxInitializer = ndxInitializerClone.slice();
                                } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
                                if (match) return !0;
                            } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                                var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup)) {
                                    if ((latestMatch = matches[matches.length - 1].match).optionalQuantifier = qndx > qt.quantifier.min - 1, 
                                    latestMatch.jit = qndx + tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, 
                                    isFirstMatch(latestMatch, tokenGroup) && qndx > qt.quantifier.min - 1) {
                                        insertStop = !0, testPos = pos;
                                        break;
                                    }
                                    if (qt.quantifier.jit !== undefined && isNaN(qt.quantifier.max) && latestMatch.optionalQuantifier && getMaskSet().validPositions[pos - 1] === undefined) {
                                        matches.pop(), insertStop = !0, testPos = pos, cacheDependency = undefined;
                                        break;
                                    }
                                    return !0;
                                }
                            } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0;
                        } else testPos++;
                        var source, target;
                    }
                    for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
                        var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                        if (match && testPos === pos) return match;
                        if (testPos > pos) break;
                    }
                }
                if (pos > -1) {
                    if (ndxIntlzr === undefined) {
                        for (var test, previousPos = pos - 1; (test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) === undefined && previousPos > -1; ) previousPos--;
                        test !== undefined && previousPos > -1 && (ndxInitializer = function(pos, tests) {
                            var locator = [];
                            return $.isArray(tests) || (tests = [ tests ]), tests.length > 0 && (tests[0].alternation === undefined ? 0 === (locator = determineTestTemplate(pos, tests.slice()).locator.slice()).length && (locator = tests[0].locator.slice()) : $.each(tests, function(ndx, tst) {
                                if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice(); else for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i]);
                            })), locator;
                        }(previousPos, test), cacheDependency = ndxInitializer.join(""), testPos = previousPos);
                    }
                    if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) return getMaskSet().tests[pos];
                    for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                        if (resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]) && testPos === pos || testPos > pos) break;
                    }
                }
                return (0 === matches.length || insertStop) && matches.push({
                    match: {
                        fn: null,
                        optionality: !0,
                        casing: null,
                        def: "",
                        placeholder: ""
                    },
                    locator: [],
                    mloc: {},
                    cd: cacheDependency
                }), ndxIntlzr !== undefined && getMaskSet().tests[pos] ? $.extend(!0, [], matches) : (getMaskSet().tests[pos] = $.extend(!0, [], matches), 
                getMaskSet().tests[pos]);
            }
            function getBufferTemplate() {
                return getMaskSet()._buffer === undefined && (getMaskSet()._buffer = getMaskTemplate(!1, 1), 
                getMaskSet().buffer === undefined && (getMaskSet().buffer = getMaskSet()._buffer.slice())), 
                getMaskSet()._buffer;
            }
            function getBuffer(noCache) {
                return getMaskSet().buffer !== undefined && !0 !== noCache || (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0)), 
                getMaskSet().buffer;
            }
            function refreshFromBuffer(start, end, buffer) {
                var i, p;
                if (!0 === start) resetMaskSet(), start = 0, end = buffer.length; else for (i = start; i < end; i++) delete getMaskSet().validPositions[i];
                for (p = start, i = start; i < end; i++) if (resetMaskSet(!0), buffer[i] !== opts.skipOptionalPartCharacter) {
                    var valResult = isValid(p, buffer[i], !0, !0);
                    !1 !== valResult && (resetMaskSet(!0), p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1);
                }
            }
            function checkAlternationMatch(altArr1, altArr2, na) {
                for (var naNdx, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = na !== undefined ? na.split(",") : [], i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
                for (var alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                    isMatch = !0;
                    break;
                }
                return isMatch;
            }
            function alternate(pos, c, strict, fromSetValid, rAltPos) {
                var lastAlt, alternation, altPos, prevAltPos, i, validPos, decisionPos, validPsClone = $.extend(!0, {}, getMaskSet().validPositions), isValidRslt = !1, lAltPos = rAltPos !== undefined ? rAltPos : getLastValidPosition();
                if (-1 === lAltPos && rAltPos === undefined) alternation = (prevAltPos = getTest(lastAlt = 0)).alternation; else for (;lAltPos >= 0; lAltPos--) if ((altPos = getMaskSet().validPositions[lAltPos]) && altPos.alternation !== undefined) {
                    if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                    lastAlt = lAltPos, alternation = getMaskSet().validPositions[lastAlt].alternation, 
                    prevAltPos = altPos;
                }
                if (alternation !== undefined) {
                    decisionPos = parseInt(lastAlt), getMaskSet().excludes[decisionPos] = getMaskSet().excludes[decisionPos] || [], 
                    !0 !== pos && getMaskSet().excludes[decisionPos].push(getDecisionTaker(prevAltPos));
                    var validInputsClone = [], staticInputsBeforePos = 0;
                    for (i = decisionPos; i < getLastValidPosition(undefined, !0) + 1; i++) (validPos = getMaskSet().validPositions[i]) && !0 !== validPos.generatedInput ? validInputsClone.push(validPos.input) : i < pos && staticInputsBeforePos++, 
                    delete getMaskSet().validPositions[i];
                    for (;getMaskSet().excludes[decisionPos] && getMaskSet().excludes[decisionPos].length < 10; ) {
                        var posOffset = -1 * staticInputsBeforePos, validInputs = validInputsClone.slice();
                        for (getMaskSet().tests[decisionPos] = undefined, resetMaskSet(!0), isValidRslt = !0; validInputs.length > 0; ) {
                            var input = validInputs.shift();
                            if (!(isValidRslt = isValid(getLastValidPosition(undefined, !0) + 1, input, !1, fromSetValid, !0))) break;
                        }
                        if (isValidRslt && c !== undefined) {
                            var targetLvp = getLastValidPosition(pos) + 1;
                            for (i = decisionPos; i < getLastValidPosition() + 1; i++) ((validPos = getMaskSet().validPositions[i]) === undefined || null == validPos.match.fn) && i < pos + posOffset && posOffset++;
                            isValidRslt = isValid((pos += posOffset) > targetLvp ? targetLvp : pos, c, strict, fromSetValid, !0);
                        }
                        if (isValidRslt) break;
                        if (resetMaskSet(), prevAltPos = getTest(decisionPos), getMaskSet().validPositions = $.extend(!0, {}, validPsClone), 
                        !getMaskSet().excludes[decisionPos]) {
                            isValidRslt = alternate(pos, c, strict, fromSetValid, decisionPos - 1);
                            break;
                        }
                        var decisionTaker = getDecisionTaker(prevAltPos);
                        if (-1 !== getMaskSet().excludes[decisionPos].indexOf(decisionTaker)) {
                            isValidRslt = alternate(pos, c, strict, fromSetValid, decisionPos - 1);
                            break;
                        }
                        for (getMaskSet().excludes[decisionPos].push(decisionTaker), i = decisionPos; i < getLastValidPosition(undefined, !0) + 1; i++) delete getMaskSet().validPositions[i];
                    }
                }
                return getMaskSet().excludes[decisionPos] = undefined, isValidRslt;
            }
            function isValid(pos, c, strict, fromSetValid, fromAlternate, validateOnly) {
                function isSelection(posObj) {
                    return isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end == 1 : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin == 1;
                }
                strict = !0 === strict;
                var maskPos = pos;
                function _isValid(position, c, strict) {
                    var rslt = !1;
                    return $.each(getTests(position), function(ndx, tst) {
                        var test = tst.match;
                        if (getBuffer(!0), !1 !== (rslt = null != test.fn ? test.fn.test(c, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                            c: getPlaceholder(position, test, !0) || test.def,
                            pos: position
                        })) {
                            var elem = rslt.c !== undefined ? rslt.c : c, validatedPos = position;
                            return elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? getPlaceholder(position, test, !0) || test.def : elem, 
                            rslt.remove !== undefined && ($.isArray(rslt.remove) || (rslt.remove = [ rslt.remove ]), 
                            $.each(rslt.remove.sort(function(a, b) {
                                return b - a;
                            }), function(ndx, lmnt) {
                                revalidateMask({
                                    begin: lmnt,
                                    end: lmnt + 1
                                });
                            })), rslt.insert !== undefined && ($.isArray(rslt.insert) || (rslt.insert = [ rslt.insert ]), 
                            $.each(rslt.insert.sort(function(a, b) {
                                return a - b;
                            }), function(ndx, lmnt) {
                                isValid(lmnt.pos, lmnt.c, !0, fromSetValid);
                            })), !0 !== rslt && rslt.pos !== undefined && rslt.pos !== position && (validatedPos = rslt.pos), 
                            !0 !== rslt && rslt.pos === undefined && rslt.c === undefined ? !1 : (revalidateMask(pos, $.extend({}, tst, {
                                input: function(elem, test, pos) {
                                    switch (opts.casing || test.casing) {
                                      case "upper":
                                        elem = elem.toUpperCase();
                                        break;

                                      case "lower":
                                        elem = elem.toLowerCase();
                                        break;

                                      case "title":
                                        var posBefore = getMaskSet().validPositions[pos - 1];
                                        elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
                                        break;

                                      default:
                                        if ($.isFunction(opts.casing)) {
                                            var args = Array.prototype.slice.call(arguments);
                                            args.push(getMaskSet().validPositions), elem = opts.casing.apply(this, args);
                                        }
                                    }
                                    return elem;
                                }(elem, test, validatedPos)
                            }), fromSetValid, validatedPos) || (rslt = !1), !1);
                        }
                    }), rslt;
                }
                pos.begin !== undefined && (maskPos = isRTL ? pos.end : pos.begin);
                var result = !0, positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
                if ($.isFunction(opts.preValidation) && !strict && !0 !== fromSetValid && !0 !== validateOnly && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts, getMaskSet())), 
                !0 === result) {
                    if (trackbackPositions(undefined, maskPos, !0), (maxLength === undefined || maskPos < maxLength) && (result = _isValid(maskPos, c, strict), 
                    (!strict || !0 === fromSetValid) && !1 === result && !0 !== validateOnly)) {
                        var currentPosValid = getMaskSet().validPositions[maskPos];
                        if (!currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                            if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined) && !isMask(maskPos, !0)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) if (!1 !== (result = _isValid(nPos, c, strict))) {
                                result = trackbackPositions(maskPos, result.pos !== undefined ? result.pos : nPos) || result, 
                                maskPos = nPos;
                                break;
                            }
                        } else result = {
                            caret: seekNext(maskPos)
                        };
                    }
                    !1 !== result || !1 === opts.keepStatic || null != opts.regex && !isComplete(getBuffer()) || strict || !0 === fromAlternate || (result = alternate(maskPos, c, strict, fromSetValid)), 
                    !0 === result && (result = {
                        pos: maskPos
                    });
                }
                if ($.isFunction(opts.postValidation) && !1 !== result && !strict && !0 !== fromSetValid && !0 !== validateOnly) {
                    var postResult = opts.postValidation(getBuffer(!0), result, opts);
                    if (postResult !== undefined) {
                        if (postResult.refreshFromBuffer && postResult.buffer) {
                            var refresh = postResult.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, postResult.buffer);
                        }
                        result = !0 === postResult ? result : postResult;
                    }
                }
                return result && result.pos === undefined && (result.pos = maskPos), !1 !== result && !0 !== validateOnly || (resetMaskSet(!0), 
                getMaskSet().validPositions = $.extend(!0, {}, positionsClone)), result;
            }
            function trackbackPositions(originalPos, newPos, fillOnly) {
                var result;
                if (originalPos === undefined) for (originalPos = newPos - 1; originalPos > 0 && !getMaskSet().validPositions[originalPos]; originalPos--) ;
                for (var ps = originalPos; ps < newPos; ps++) if (getMaskSet().validPositions[ps] === undefined && !isMask(ps, !0)) {
                    var vp = 0 == ps ? getTest(ps) : getMaskSet().validPositions[ps - 1];
                    if (vp) {
                        var tstLocator, targetLocator = getLocator(vp), tests = getTests(ps).slice(), closest = undefined, bestMatch = getTest(ps);
                        if ("" === tests[tests.length - 1].match.def && tests.pop(), $.each(tests, function(ndx, tst) {
                            tstLocator = getLocator(tst, targetLocator.length);
                            var distance = Math.abs(tstLocator - targetLocator);
                            (closest === undefined || distance < closest) && null === tst.match.fn && !0 !== tst.match.optionality && !0 !== tst.match.optionalQuantifier && (closest = distance, 
                            bestMatch = tst);
                        }), (bestMatch = $.extend({}, bestMatch, {
                            input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def
                        })).generatedInput = !0, revalidateMask(ps, bestMatch, !0), !0 !== fillOnly) {
                            var cvpInput = getMaskSet().validPositions[newPos].input;
                            getMaskSet().validPositions[newPos] = undefined, result = isValid(newPos, cvpInput, !0, !0);
                        }
                    }
                }
                return result;
            }
            function revalidateMask(pos, validTest, fromSetValid, validatedPos) {
                function IsEnclosedStatic(pos, valids, selection) {
                    var posMatch = valids[pos];
                    if (posMatch !== undefined && (null === posMatch.match.fn && !0 !== posMatch.match.optionality || posMatch.input === opts.radixPoint)) {
                        var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && null === valids[pos - 1].match.fn && valids[pos - 1] : valids[pos - 1], nextMatch = selection.end > pos + 1 ? valids[pos + 1] && null === valids[pos + 1].match.fn && valids[pos + 1] : valids[pos + 1];
                        return prevMatch && nextMatch;
                    }
                    return !1;
                }
                var begin = pos.begin !== undefined ? pos.begin : pos, end = pos.end !== undefined ? pos.end : pos;
                if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), validatedPos = validatedPos !== undefined ? validatedPos : begin, 
                begin !== end || opts.insertMode && getMaskSet().validPositions[validatedPos] !== undefined && fromSetValid === undefined) {
                    var positionsClone = $.extend(!0, {}, getMaskSet().validPositions), lvp = getLastValidPosition(undefined, !0);
                    for (getMaskSet().p = begin, i = lvp; i >= begin; i--) getMaskSet().validPositions[i] && "+" === getMaskSet().validPositions[i].match.nativeDef && (opts.isNegative = !1), 
                    delete getMaskSet().validPositions[i];
                    var valid = !0, j = validatedPos, needsValidation = (getMaskSet().validPositions, 
                    !1), posMatch = j, i = j;
                    for (validTest && (getMaskSet().validPositions[validatedPos] = $.extend(!0, {}, validTest), 
                    posMatch++, j++, begin < end && i++); i <= lvp; i++) {
                        var t = positionsClone[i];
                        if (t !== undefined && (i >= end || i >= begin && !0 !== t.generatedInput && IsEnclosedStatic(i, positionsClone, {
                            begin: begin,
                            end: end
                        }))) {
                            for (;"" !== getTest(posMatch).match.def; ) {
                                if (!1 === needsValidation && positionsClone[posMatch] && positionsClone[posMatch].match.nativeDef === t.match.nativeDef) getMaskSet().validPositions[posMatch] = $.extend(!0, {}, positionsClone[posMatch]), 
                                getMaskSet().validPositions[posMatch].input = t.input, trackbackPositions(undefined, posMatch, !0), 
                                j = posMatch + 1, valid = !0; else if (positionCanMatchDefinition(posMatch, t.match.def)) {
                                    var result = isValid(posMatch, t.input, !0, !0);
                                    valid = !1 !== result, j = result.caret || result.insert ? getLastValidPosition() : posMatch + 1, 
                                    needsValidation = !0;
                                } else if (!(valid = !0 === t.generatedInput || t.input === opts.radixPoint && !0 === opts.numericInput) && "" === getTest(posMatch).match.def) break;
                                if (valid) break;
                                posMatch++;
                            }
                            "" == getTest(posMatch).match.def && (valid = !1), posMatch = j;
                        }
                        if (!valid) break;
                    }
                    if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
                    resetMaskSet(!0), !1;
                } else validTest && (getMaskSet().validPositions[validatedPos] = $.extend(!0, {}, validTest));
                return resetMaskSet(!0), !0;
            }
            function isMask(pos, strict) {
                var test = getTestTemplate(pos).match;
                if ("" === test.def && (test = getTest(pos).match), null != test.fn) return test.fn;
                if (!0 !== strict && pos > -1) {
                    var tests = getTests(pos);
                    return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
                }
                return !1;
            }
            function seekNext(pos, newBlock) {
                for (var position = pos + 1; "" !== getTest(position).match.def && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position)) || !0 !== newBlock && !isMask(position)); ) position++;
                return position;
            }
            function seekPrevious(pos, newBlock) {
                var tests, position = pos;
                if (position <= 0) return 0;
                for (;--position > 0 && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position) && ((tests = getTests(position)).length < 2 || 2 === tests.length && "" === tests[1].match.def)); ) ;
                return position;
            }
            function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
                if (event && $.isFunction(opts.onBeforeWrite)) {
                    var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                    if (result) {
                        if (result.refreshFromBuffer) {
                            var refresh = result.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), 
                            buffer = getBuffer(!0);
                        }
                        caretPos !== undefined && (caretPos = result.caret !== undefined ? result.caret : caretPos);
                    }
                }
                if (input !== undefined && (input.inputmask._valueSet(buffer.join("")), caretPos === undefined || event !== undefined && "blur" === event.type ? renderColorMask(input, caretPos, 0 === buffer.length) : caret(input, caretPos), 
                !0 === triggerEvents)) {
                    var $input = $(input), nptVal = input.inputmask._valueGet();
                    skipInputEvent = !0, $input.trigger("input"), setTimeout(function() {
                        nptVal === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(buffer) && $input.trigger("complete");
                    }, 0);
                }
            }
            function getPlaceholder(pos, test, returnPL) {
                if ((test = test || getTest(pos).match).placeholder !== undefined || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
                if (null === test.fn) {
                    if (pos > -1 && getMaskSet().validPositions[pos] === undefined) {
                        var prevTest, tests = getTests(pos), staticAlternations = [];
                        if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if (!0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (null === tests[i].match.fn || prevTest === undefined || !1 !== tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, !0, opts)) && (staticAlternations.push(tests[i]), 
                        null === tests[i].match.fn && (prevTest = tests[i]), staticAlternations.length > 1 && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
                    }
                    return test.def;
                }
                return opts.placeholder.charAt(pos % opts.placeholder.length);
            }
            var valueBuffer, EventRuler = {
                on: function(input, eventName, eventHandler) {
                    var ev = function(e) {
                        var that = this;
                        if (that.inputmask === undefined && "FORM" !== this.nodeName) {
                            var imOpts = $.data(that, "_inputmask_opts");
                            imOpts ? new Inputmask(imOpts).mask(that) : EventRuler.off(that);
                        } else {
                            if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === Inputmask.keyCode.TAB))) {
                                switch (e.type) {
                                  case "input":
                                    if (!0 === skipInputEvent) return skipInputEvent = !1, e.preventDefault();
                                    if (mobile) {
                                        trackCaret = !0;
                                        var args = arguments;
                                        return setTimeout(function() {
                                            eventHandler.apply(that, args);
                                        }, 0), !1;
                                    }
                                    break;

                                  case "keydown":
                                    skipKeyPressEvent = !1, skipInputEvent = !1;
                                    break;

                                  case "keypress":
                                    if (!0 === skipKeyPressEvent) return e.preventDefault();
                                    skipKeyPressEvent = !0;
                                    break;

                                  case "click":
                                    if (iemobile || iphone) {
                                        args = arguments;
                                        return setTimeout(function() {
                                            eventHandler.apply(that, args);
                                        }, 0), !1;
                                    }
                                }
                                var returnVal = eventHandler.apply(that, arguments);
                                return trackCaret && (trackCaret = !1, setTimeout(function() {
                                    caret(that, that.inputmask.caretPos, undefined, !0);
                                })), !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
                            }
                            e.preventDefault();
                        }
                    };
                    input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), 
                    -1 !== $.inArray(eventName, [ "submit", "reset" ]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev);
                },
                off: function(input, event) {
                    var events;
                    input.inputmask && input.inputmask.events && (event ? (events = [])[event] = input.inputmask.events[event] : events = input.inputmask.events, 
                    $.each(events, function(eventName, evArr) {
                        for (;evArr.length > 0; ) {
                            var ev = evArr.pop();
                            -1 !== $.inArray(eventName, [ "submit", "reset" ]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
                        }
                        delete input.inputmask.events[eventName];
                    }));
                }
            }, EventHandlers = {
                keydownEvent: function(e) {
                    var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
                    if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !isInputEventSupported("cut")) e.preventDefault(), 
                    handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join("")); else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
                        e.preventDefault();
                        var caretPos = seekNext(getLastValidPosition());
                        opts.insertMode || caretPos !== getMaskSet().maskLength || e.shiftKey || caretPos--, 
                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
                    } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), 
                    caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")), 
                    $input.trigger("click")) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !0 === opts.tabThrough && k === Inputmask.keyCode.TAB ? (!0 === e.shiftKey ? (null === getTest(pos.begin).match.fn && (pos.begin = seekNext(pos.begin)), 
                    pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), 
                    pos.end = seekNext(pos.begin, !0), pos.end < getMaskSet().maskLength && pos.end--), 
                    pos.begin < getMaskSet().maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || !1 === opts.insertMode && (k === Inputmask.keyCode.RIGHT ? setTimeout(function() {
                        var caretPos = caret(input);
                        caret(input, caretPos.begin);
                    }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function() {
                        var caretPos = caret(input);
                        caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
                    }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin !== getMaskSet().maskLength ? pos.begin : pos.begin - 1));
                    opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = -1 !== $.inArray(k, opts.ignorables);
                },
                keypressEvent: function(e, checkval, writeOut, strict, ndx) {
                    var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
                    if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), 
                    setTimeout(function() {
                        $input.trigger("change");
                    }, 0)), !0;
                    if (k) {
                        46 === k && !1 === e.shiftKey && "" !== opts.radixPoint && (k = opts.radixPoint.charCodeAt(0));
                        var forwardPosition, pos = checkval ? {
                            begin: ndx,
                            end: ndx
                        } : caret(input), c = String.fromCharCode(k), offset = 0;
                        if (opts._radixDance && opts.numericInput) {
                            var caretPos = getBuffer().indexOf(opts.radixPoint.charAt(0)) + 1;
                            pos.begin <= caretPos && (k === opts.radixPoint.charCodeAt(0) && (offset = 1), pos.begin -= 1, 
                            pos.end -= 1);
                        }
                        getMaskSet().writeOutBuffer = !0;
                        var valResult = isValid(pos, c, strict);
                        if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = valResult.caret !== undefined ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos), 
                        getMaskSet().p = forwardPosition), forwardPosition = (opts.numericInput && valResult.caret === undefined ? seekPrevious(forwardPosition) : forwardPosition) + offset, 
                        !1 !== writeOut && (setTimeout(function() {
                            opts.onKeyValidation.call(input, k, valResult, opts);
                        }, 0), getMaskSet().writeOutBuffer && !1 !== valResult)) {
                            var buffer = getBuffer();
                            writeBuffer(input, buffer, forwardPosition, e, !0 !== checkval);
                        }
                        if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), 
                        valResult;
                    }
                },
                pasteEvent: function(e) {
                    var tempValue, ev = e.originalEvent || e, inputValue = ($(this), this.inputmask._valueGet(!0)), caretPos = caret(this);
                    isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
                    var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                    if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
                    valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), 
                    isRTL && (tempValue = valueBeforeCaret, valueBeforeCaret = valueAfterCaret, valueAfterCaret = tempValue), 
                    window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
                        if (!ev.clipboardData || !ev.clipboardData.getData) return !0;
                        inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret;
                    }
                    var pasteValue = inputValue;
                    if ($.isFunction(opts.onBeforePaste)) {
                        if (!1 === (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts))) return e.preventDefault();
                        pasteValue || (pasteValue = inputValue);
                    }
                    return checkVal(this, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split("")), 
                    writeBuffer(this, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), 
                    e.preventDefault();
                },
                inputFallBackEvent: function(e) {
                    var input = this, inputValue = input.inputmask._valueGet();
                    if (getBuffer().join("") !== inputValue) {
                        var caretPos = caret(input);
                        if (inputValue = function(input, inputValue, caretPos) {
                            if (iemobile) {
                                var inputChar = inputValue.replace(getBuffer().join(""), "");
                                if (1 === inputChar.length) {
                                    var iv = inputValue.split("");
                                    iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("");
                                }
                            }
                            return inputValue;
                        }(0, inputValue = function(input, inputValue, caretPos) {
                            return "." === inputValue.charAt(caretPos.begin - 1) && "" !== opts.radixPoint && ((inputValue = inputValue.split(""))[caretPos.begin - 1] = opts.radixPoint.charAt(0), 
                            inputValue = inputValue.join("")), inputValue;
                        }(0, inputValue, caretPos), caretPos), getBuffer().join("") !== inputValue) {
                            var buffer = getBuffer().join(""), offset = !opts.numericInput && inputValue.length > buffer.length ? -1 : 0, frontPart = inputValue.substr(0, caretPos.begin), backPart = inputValue.substr(caretPos.begin), frontBufferPart = buffer.substr(0, caretPos.begin + offset), backBufferPart = buffer.substr(caretPos.begin + offset), selection = caretPos, entries = "", isEntry = !1;
                            if (frontPart !== frontBufferPart) {
                                for (var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length, i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) ;
                                isEntry && (0 === offset && (selection.begin = i), entries += frontPart.slice(i, selection.end));
                            }
                            if (backPart !== backBufferPart && (backPart.length > backBufferPart.length ? entries += backPart.slice(0, 1) : backPart.length < backBufferPart.length && (selection.end += backBufferPart.length - backPart.length, 
                            isEntry || "" === opts.radixPoint || "" !== backPart || frontPart.charAt(selection.begin + offset - 1) !== opts.radixPoint || (selection.begin--, 
                            entries = opts.radixPoint))), writeBuffer(input, getBuffer(), {
                                begin: selection.begin + offset,
                                end: selection.end + offset
                            }), entries.length > 0) $.each(entries.split(""), function(ndx, entry) {
                                var keypress = new $.Event("keypress");
                                keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
                            }); else {
                                selection.begin === selection.end - 1 && (selection.begin = seekPrevious(selection.begin + 1), 
                                selection.begin === selection.end - 1 ? caret(input, selection.begin) : caret(input, selection.begin, selection.end));
                                var keydown = new $.Event("keydown");
                                keydown.keyCode = opts.numericInput ? Inputmask.keyCode.BACKSPACE : Inputmask.keyCode.DELETE, 
                                EventHandlers.keydownEvent.call(input, keydown), !1 === opts.insertMode && caret(input, caret(input).begin - 1);
                            }
                            e.preventDefault();
                        }
                    }
                },
                setValueEvent: function(e) {
                    this.inputmask.refreshValue = !1;
                    var value = (value = e && e.detail ? e.detail[0] : arguments[1]) || this.inputmask._valueGet(!0);
                    $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), 
                    value = value.split(""), checkVal(this, !0, !1, isRTL ? value.reverse() : value), 
                    undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && this.inputmask._valueGet() === getBufferTemplate().join("") && this.inputmask._valueSet("");
                },
                focusEvent: function(e) {
                    var nptValue = this.inputmask._valueGet();
                    opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" === nptValue) && (this.inputmask._valueGet() !== getBuffer().join("") ? writeBuffer(this, getBuffer(), seekNext(getLastValidPosition())) : !1 === mouseEnter && caret(this, seekNext(getLastValidPosition()))), 
                    !0 === opts.positionCaretOnTab && !1 === mouseEnter && EventHandlers.clickEvent.apply(this, [ e, !0 ]), 
                    undoValue = getBuffer().join("");
                },
                mouseleaveEvent: function(e) {
                    if (mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== this) {
                        var buffer = getBuffer().slice(), nptValue = this.inputmask._valueGet();
                        nptValue !== this.getAttribute("placeholder") && "" !== nptValue && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer), 
                        writeBuffer(this, buffer));
                    }
                },
                clickEvent: function(e, tabbed) {
                    var input = this;
                    setTimeout(function() {
                        if (document.activeElement === input) {
                            var selectedCaret = caret(input);
                            if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), 
                            selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
                              case "none":
                                break;

                              case "select":
                                caret(input, 0, getBuffer().length);
                                break;

                              case "radixFocus":
                                if (function(clickPos) {
                                    if ("" !== opts.radixPoint) {
                                        var vps = getMaskSet().validPositions;
                                        if (vps[clickPos] === undefined || vps[clickPos].input === getPlaceholder(clickPos)) {
                                            if (clickPos < seekNext(-1)) return !0;
                                            var radixPos = $.inArray(opts.radixPoint, getBuffer());
                                            if (-1 !== radixPos) {
                                                for (var vp in vps) if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                                                return !0;
                                            }
                                        }
                                    }
                                    return !1;
                                }(selectedCaret.begin)) {
                                    var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                                    caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
                                    break;
                                }

                              case "ignore":
                                caret(input, seekNext(getLastValidPosition()));
                                break;

                              default:
                                var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition(clickPosition, !0), lastPosition = seekNext(lvclickPosition);
                                if (clickPosition < lastPosition) caret(input, isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition)); else {
                                    var lvp = getMaskSet().validPositions[lvclickPosition], tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp), placeholder = getPlaceholder(lastPosition, tt.match);
                                    if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
                                        var newPos = seekNext(lastPosition);
                                        (clickPosition >= newPos || clickPosition === lastPosition) && (lastPosition = newPos);
                                    }
                                    caret(input, lastPosition);
                                }
                            }
                        }
                    }, 0);
                },
                dblclickEvent: function(e) {
                    var input = this;
                    setTimeout(function() {
                        caret(input, 0, seekNext(getLastValidPosition()));
                    }, 0);
                },
                cutEvent: function(e) {
                    $(this);
                    var pos = caret(this), ev = e.originalEvent || e, clipboardData = window.clipboardData || ev.clipboardData, clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
                    clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), 
                    document.execCommand && document.execCommand("copy"), handleRemove(this, Inputmask.keyCode.DELETE, pos), 
                    writeBuffer(this, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join(""));
                },
                blurEvent: function(e) {
                    var $input = $(this);
                    if (this.inputmask) {
                        var nptValue = this.inputmask._valueGet(), buffer = getBuffer().slice();
                        "" === nptValue && colorMask === undefined || (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), 
                        !1 === isComplete(buffer) && (setTimeout(function() {
                            $input.trigger("incomplete");
                        }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), 
                        writeBuffer(this, buffer, undefined, e)), undoValue !== getBuffer().join("") && (undoValue = buffer.join(""), 
                        $input.trigger("change"));
                    }
                },
                mouseenterEvent: function(e) {
                    mouseEnter = !0, document.activeElement !== this && opts.showMaskOnHover && this.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(this, getBuffer());
                },
                submitEvent: function(e) {
                    undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), 
                    opts.clearIncomplete && !1 === isComplete(getBuffer()) && el.inputmask._valueSet(""), 
                    opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), 
                    setTimeout(function() {
                        writeBuffer(el, getBuffer());
                    }, 0));
                },
                resetEvent: function(e) {
                    el.inputmask.refreshValue = !0, setTimeout(function() {
                        $el.trigger("setvalue");
                    }, 0);
                }
            };
            function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
                var inputValue = nptvl.slice(), charCodes = "", initialNdx = -1, result = undefined;
                if (resetMaskSet(), strict || !0 === opts.autoUnmask) initialNdx = seekNext(initialNdx); else {
                    var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""), matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
                    matches && matches.length > 0 && (inputValue.splice(0, matches.length * staticInput.length), 
                    initialNdx = seekNext(initialNdx));
                }
                -1 === initialNdx ? (getMaskSet().p = seekNext(initialNdx), initialNdx = 0) : getMaskSet().p = initialNdx, 
                $.each(inputValue, function(ndx, charCode) {
                    if (charCode !== undefined) if (getMaskSet().validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, undefined, undefined, !0)) getMaskSet().p++; else {
                        var keypress = new $.Event("_checkval");
                        keypress.which = charCode.charCodeAt(0), charCodes += charCode;
                        var lvp = getLastValidPosition(undefined, !0), prevTest = getTest(lvp), nextTest = getTestTemplate(lvp + 1, prevTest ? prevTest.locator.slice() : undefined, lvp);
                        if (!function(ndx, charCodes) {
                            return -1 !== getMaskTemplate(!0, 0, !1).slice(ndx, seekNext(ndx)).join("").indexOf(charCodes) && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || " " === getTest(ndx).match.nativeDef && getTest(ndx + 1).match.nativeDef === charCodes.charAt(0));
                        }(initialNdx, charCodes) || strict || opts.autoUnmask) {
                            var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                            (result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, pos)) && (initialNdx = pos + 1, 
                            charCodes = "");
                        } else result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
                        writeBuffer(undefined, getBuffer(), result.forwardPosition, keypress, !1);
                    }
                }), writeOut && writeBuffer(input, getBuffer(), result ? result.forwardPosition : undefined, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type);
            }
            function unmaskedvalue(input) {
                if (input) {
                    if (input.inputmask === undefined) return input.value;
                    input.inputmask && input.inputmask.refreshValue && EventHandlers.setValueEvent.call(input);
                }
                var umValue = [], vps = getMaskSet().validPositions;
                for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
                var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
                if ($.isFunction(opts.onUnMask)) {
                    var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                    unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
                }
                return unmaskedValue;
            }
            function translatePosition(pos) {
                return !isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || (pos = el.inputmask._valueGet().length - pos), 
                pos;
            }
            function caret(input, begin, end, notranslate) {
                var range;
                if (begin === undefined) return input.setSelectionRange ? (begin = input.selectionStart, 
                end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, 
                end = range.endOffset) : document.selection && document.selection.createRange && (end = (begin = 0 - (range = document.selection.createRange()).duplicate().moveStart("character", -input.inputmask._valueGet().length)) + range.text.length), 
                {
                    begin: notranslate ? begin : translatePosition(begin),
                    end: notranslate ? end : translatePosition(end)
                };
                if ($.isArray(begin) && (end = isRTL ? begin[0] : begin[1], begin = isRTL ? begin[1] : begin[0]), 
                begin.begin !== undefined && (end = isRTL ? begin.begin : begin.end, begin = isRTL ? begin.end : begin.begin), 
                "number" == typeof begin) {
                    begin = notranslate ? begin : translatePosition(begin), end = "number" == typeof (end = notranslate ? end : translatePosition(end)) ? end : begin;
                    var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                    if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, iphone || !1 !== opts.insertMode || begin !== end || end++, 
                    input.inputmask.caretPos = {
                        begin: begin,
                        end: end
                    }, input.setSelectionRange) input.selectionStart = begin, input.selectionEnd = end; else if (window.getSelection) {
                        if (range = document.createRange(), input.firstChild === undefined || null === input.firstChild) {
                            var textNode = document.createTextNode("");
                            input.appendChild(textNode);
                        }
                        range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), 
                        range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), 
                        range.collapse(!0);
                        var sel = window.getSelection();
                        sel.removeAllRanges(), sel.addRange(range);
                    } else input.createTextRange && ((range = input.createTextRange()).collapse(!0), 
                    range.moveEnd("character", end), range.moveStart("character", begin), range.select());
                    renderColorMask(input, {
                        begin: begin,
                        end: end
                    });
                }
            }
            function determineLastRequiredPosition(returnDefinition) {
                var pos, testPos, buffer = getMaskTemplate(!0, getLastValidPosition(), !0, !0), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined;
                for (pos = lvp + 1; pos < buffer.length; pos++) ndxIntlzr = (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1)).locator.slice(), 
                positions[pos] = $.extend(!0, {}, testPos);
                var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
                for (pos = bl - 1; pos > lvp && (((testPos = positions[pos]).match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
                return returnDefinition ? {
                    l: bl,
                    def: positions[bl] ? positions[bl].match : undefined
                } : bl;
            }
            function clearOptionalTail(buffer) {
                buffer.length = 0;
                for (var lmnt, template = getMaskTemplate(!0, 0, !0, undefined, !0); (lmnt = template.shift()) !== undefined; ) buffer.push(lmnt);
                return buffer;
            }
            function isComplete(buffer) {
                if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
                if ("*" === opts.repeat) return undefined;
                var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
                if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                    complete = !0;
                    for (var i = 0; i <= aml; i++) {
                        var test = getTestTemplate(i).match;
                        if (null !== test.fn && getMaskSet().validPositions[i] === undefined && !0 !== test.optionality && !0 !== test.optionalQuantifier || null === test.fn && buffer[i] !== getPlaceholder(i, test)) {
                            complete = !1;
                            break;
                        }
                    }
                }
                return complete;
            }
            function handleRemove(input, k, pos, strict, fromIsValid) {
                if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), 
                isRTL)) {
                    var pend = pos.end;
                    pos.end = pos.begin, pos.begin = pend;
                }
                if (k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || !1 === opts.insertMode) ? (pos.begin = seekPrevious(pos.begin), 
                getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.begin--, 
                !1 === opts.insertMode && pos.end !== getMaskSet().maskLength && pos.end--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0) && getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint ? pos.end + 1 : seekNext(pos.end) + 1, 
                getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.end++), 
                revalidateMask(pos), !0 !== strict && !1 !== opts.keepStatic || null !== opts.regex) {
                    var result = alternate(!0);
                    if (result) {
                        var newPos = result.caret !== undefined ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, !0);
                        (k !== Inputmask.keyCode.DELETE || pos.begin > newPos) && pos.begin;
                    }
                }
                var lvp = getLastValidPosition(pos.begin, !0);
                if (lvp < pos.begin || -1 === pos.begin) getMaskSet().p = seekNext(lvp); else if (!0 !== strict && (getMaskSet().p = pos.begin, 
                !0 !== fromIsValid)) for (;getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined; ) getMaskSet().p++;
            }
            function initializeColorMask(input) {
                var computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null);
                var template = document.createElement("div");
                template.style.width = computedStyle.width, template.style.textAlign = computedStyle.textAlign, 
                colorMask = document.createElement("div"), input.inputmask.colorMask = colorMask, 
                colorMask.className = "im-colormask", input.parentNode.insertBefore(colorMask, input), 
                input.parentNode.removeChild(input), colorMask.appendChild(input), colorMask.appendChild(template), 
                input.style.left = template.offsetLeft + "px", $(colorMask).on("mouseleave", function(e) {
                    return EventHandlers.mouseleaveEvent.call(input, [ e ]);
                }), $(colorMask).on("mouseenter", function(e) {
                    return EventHandlers.mouseenterEvent.call(input, [ e ]);
                }), $(colorMask).on("click", function(e) {
                    return caret(input, function(clientx) {
                        var caretPos, e = document.createElement("span");
                        for (var style in computedStyle) isNaN(style) && -1 !== style.indexOf("font") && (e.style[style] = computedStyle[style]);
                        e.style.textTransform = computedStyle.textTransform, e.style.letterSpacing = computedStyle.letterSpacing, 
                        e.style.position = "absolute", e.style.height = "auto", e.style.width = "auto", 
                        e.style.visibility = "hidden", e.style.whiteSpace = "nowrap", document.body.appendChild(e);
                        var itl, inputText = input.inputmask._valueGet(), previousWidth = 0;
                        for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
                            if (e.innerHTML += inputText.charAt(caretPos) || "_", e.offsetWidth >= clientx) {
                                var offset1 = clientx - previousWidth, offset2 = e.offsetWidth - clientx;
                                e.innerHTML = inputText.charAt(caretPos), caretPos = (offset1 -= e.offsetWidth / 3) < offset2 ? caretPos - 1 : caretPos;
                                break;
                            }
                            previousWidth = e.offsetWidth;
                        }
                        return document.body.removeChild(e), caretPos;
                    }(e.clientX)), EventHandlers.clickEvent.call(input, [ e ]);
                }), $(input).on("keydown", function(e) {
                    e.shiftKey || !1 === opts.insertMode || setTimeout(function() {
                        renderColorMask(input);
                    }, 0);
                });
            }
            function renderColorMask(input, caretPos, clear) {
                var test, testPos, ndxIntlzr, maskTemplate = [], isStatic = !1, pos = 0;
                function setEntry(entry) {
                    if (entry === undefined && (entry = ""), isStatic || null !== test.fn && testPos.input !== undefined) if (isStatic && (null !== test.fn && testPos.input !== undefined || "" === test.def)) {
                        isStatic = !1;
                        var mtl = maskTemplate.length;
                        maskTemplate[mtl - 1] = maskTemplate[mtl - 1] + "</span>", maskTemplate.push(entry);
                    } else maskTemplate.push(entry); else isStatic = !0, maskTemplate.push("<span class='im-static'>" + entry);
                }
                if (colorMask !== undefined) {
                    var buffer = getBuffer();
                    if (caretPos === undefined ? caretPos = caret(input) : caretPos.begin === undefined && (caretPos = {
                        begin: caretPos,
                        end: caretPos
                    }), !0 !== clear) {
                        var lvp = getLastValidPosition();
                        do {
                            getMaskSet().validPositions[pos] ? (testPos = getMaskSet().validPositions[pos], 
                            test = testPos.match, ndxIntlzr = testPos.locator.slice(), setEntry(buffer[pos])) : (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
                            test = testPos.match, ndxIntlzr = testPos.locator.slice(), !1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos ? setEntry(getPlaceholder(pos, test)) : isStatic = !1), 
                            pos++;
                        } while ((maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || lvp > pos || isStatic);
                        isStatic && setEntry(), document.activeElement === input && (maskTemplate.splice(caretPos.begin, 0, caretPos.begin === caretPos.end || caretPos.end > getMaskSet().maskLength ? '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">' : '<mark class="im-caret-select">'), 
                        maskTemplate.splice(caretPos.end + 1, 0, "</mark>"));
                    }
                    var template = colorMask.getElementsByTagName("div")[0];
                    template.innerHTML = maskTemplate.join(""), input.inputmask.positionColorMask(input, template);
                }
            }
            if (Inputmask.prototype.positionColorMask = function(input, template) {
                input.style.left = template.offsetLeft + "px";
            }, actionObj !== undefined) switch (actionObj.action) {
              case "isComplete":
                return el = actionObj.el, isComplete(getBuffer());

              case "unmaskedvalue":
                return el !== undefined && actionObj.value === undefined || (valueBuffer = actionObj.value, 
                valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer).split(""), 
                checkVal(undefined, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts)), 
                unmaskedvalue(el);

              case "mask":
                !function(elem) {
                    EventRuler.off(elem);
                    var isSupported = function(input, opts) {
                        var elementType = input.getAttribute("type"), isSupported = "INPUT" === input.tagName && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "TEXTAREA" === input.tagName;
                        if (!isSupported) if ("INPUT" === input.tagName) {
                            var el = document.createElement("input");
                            el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
                        } else isSupported = "partial";
                        return !1 !== isSupported ? function(npt) {
                            var valueGet, valueSet;
                            function getter() {
                                return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
                            }
                            function setter(value) {
                                valueSet.call(this, value), this.inputmask && $(this).trigger("setvalue", [ value ]);
                            }
                            if (!npt.inputmask.__valueGet) {
                                if (!0 !== opts.noValuePatching) {
                                    if (Object.getOwnPropertyDescriptor) {
                                        "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function(object) {
                                            return object.__proto__;
                                        } : function(object) {
                                            return object.constructor.prototype;
                                        });
                                        var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
                                        valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, 
                                        valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                            get: getter,
                                            set: setter,
                                            configurable: !0
                                        })) : "INPUT" !== npt.tagName && (valueGet = function() {
                                            return this.textContent;
                                        }, valueSet = function(value) {
                                            this.textContent = value;
                                        }, Object.defineProperty(npt, "value", {
                                            get: getter,
                                            set: setter,
                                            configurable: !0
                                        }));
                                    } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), 
                                    valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
                                    npt.__defineSetter__("value", setter));
                                    npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
                                }
                                npt.inputmask._valueGet = function(overruleRTL) {
                                    return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                                }, npt.inputmask._valueSet = function(value, overruleRTL) {
                                    valueSet.call(this.el, null === value || value === undefined ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value);
                                }, valueGet === undefined && (valueGet = function() {
                                    return this.value;
                                }, valueSet = function(value) {
                                    this.value = value;
                                }, function(type) {
                                    if ($.valHooks && ($.valHooks[type] === undefined || !0 !== $.valHooks[type].inputmaskpatch)) {
                                        var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                                            return elem.value;
                                        }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                                            return elem.value = value, elem;
                                        };
                                        $.valHooks[type] = {
                                            get: function(elem) {
                                                if (elem.inputmask) {
                                                    if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                                    var result = valhookGet(elem);
                                                    return -1 !== getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
                                                }
                                                return valhookGet(elem);
                                            },
                                            set: function(elem, value) {
                                                var result, $elem = $(elem);
                                                return result = valhookSet(elem, value), elem.inputmask && $elem.trigger("setvalue", [ value ]), 
                                                result;
                                            },
                                            inputmaskpatch: !0
                                        };
                                    }
                                }(npt.type), function(npt) {
                                    EventRuler.on(npt, "mouseenter", function(event) {
                                        var $input = $(this);
                                        this.inputmask._valueGet() !== getBuffer().join("") && $input.trigger("setvalue");
                                    });
                                }(npt));
                            }
                        }(input) : input.inputmask = undefined, isSupported;
                    }(elem, opts);
                    if (!1 !== isSupported && ($el = $(el = elem), -1 === (maxLength = el !== undefined ? el.maxLength : undefined) && (maxLength = undefined), 
                    !0 === opts.colorMask && initializeColorMask(el), mobile && ("inputmode" in el && (el.inputmode = opts.inputmode, 
                    el.setAttribute("inputmode", opts.inputmode)), !0 === opts.disablePredictiveText && ("autocorrect" in el ? el.autocorrect = !1 : (!0 !== opts.colorMask && initializeColorMask(el), 
                    el.type = "password"))), !0 === isSupported && (EventRuler.on(el, "submit", EventHandlers.submitEvent), 
                    EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "blur", EventHandlers.blurEvent), 
                    EventRuler.on(el, "focus", EventHandlers.focusEvent), !0 !== opts.colorMask && (EventRuler.on(el, "click", EventHandlers.clickEvent), 
                    EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent)), 
                    EventRuler.on(el, "dblclick", EventHandlers.dblclickEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent), 
                    EventRuler.on(el, "dragdrop", EventHandlers.pasteEvent), EventRuler.on(el, "drop", EventHandlers.pasteEvent), 
                    EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete), 
                    EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), 
                    mobile || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent), 
                    EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "compositionstart", $.noop), 
                    EventRuler.on(el, "compositionupdate", $.noop), EventRuler.on(el, "compositionend", $.noop), 
                    EventRuler.on(el, "keyup", $.noop), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent), 
                    EventRuler.on(el, "beforeinput", $.noop)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent), 
                    undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
                        var initialValue = $.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, el.inputmask._valueGet(!0), opts) || el.inputmask._valueGet(!0);
                        "" !== initialValue && checkVal(el, !0, !1, isRTL ? initialValue.split("").reverse() : initialValue.split(""));
                        var buffer = getBuffer().slice();
                        undoValue = buffer.join(""), !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(), 
                        opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), 
                        (!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && document.activeElement === el || "" !== el.inputmask._valueGet(!0)) && writeBuffer(el, buffer), 
                        document.activeElement === el && caret(el, seekNext(getLastValidPosition()));
                    }
                }(el);
                break;

              case "format":
                return valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), 
                checkVal(undefined, !0, !1, isRTL ? valueBuffer.reverse() : valueBuffer), actionObj.metadata ? {
                    value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                    metadata: maskScope.call(this, {
                        action: "getmetadata"
                    }, maskset, opts)
                } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

              case "isValid":
                actionObj.value ? (valueBuffer = actionObj.value.split(""), checkVal(undefined, !0, !0, isRTL ? valueBuffer.reverse() : valueBuffer)) : actionObj.value = getBuffer().join("");
                for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
                return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === getBuffer().join("");

              case "getemptymask":
                return getBufferTemplate().join("");

              case "remove":
                if (el && el.inputmask) $.data(el, "_inputmask_opts", null), $el = $(el), el.inputmask._valueSet(opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(!0)), 
                EventRuler.off(el), el.inputmask.colorMask && ((colorMask = el.inputmask.colorMask).removeChild(el), 
                colorMask.parentNode.insertBefore(el, colorMask), colorMask.parentNode.removeChild(colorMask)), 
                Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value") && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                    get: el.inputmask.__valueGet,
                    set: el.inputmask.__valueSet,
                    configurable: !0
                }) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), 
                el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = undefined;
                return el;

              case "getmetadata":
                if ($.isArray(maskset.metadata)) {
                    var maskTarget = getMaskTemplate(!0, 0, !1).join("");
                    return $.each(maskset.metadata, function(ndx, mtdt) {
                        if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1;
                    }), maskTarget;
                }
                return maskset.metadata;
            }
        }
        return Inputmask.prototype = {
            dataAttribute: "data-inputmask",
            defaults: {
                placeholder: "_",
                optionalmarker: [ "[", "]" ],
                quantifiermarker: [ "{", "}" ],
                groupmarker: [ "(", ")" ],
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                regex: null,
                oncomplete: $.noop,
                onincomplete: $.noop,
                oncleared: $.noop,
                repeat: 0,
                greedy: !1,
                autoUnmask: !1,
                removeMaskOnSubmit: !1,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                clearIncomplete: !1,
                alias: null,
                onKeyDown: $.noop,
                onBeforeMask: null,
                onBeforePaste: function(pastedValue, opts) {
                    return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
                },
                onBeforeWrite: null,
                onUnMask: null,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: $.noop,
                skipOptionalPartCharacter: " ",
                numericInput: !1,
                rightAlign: !1,
                undoOnEscape: !0,
                radixPoint: "",
                _radixDance: !1,
                groupSeparator: "",
                keepStatic: null,
                positionCaretOnTab: !0,
                tabThrough: !1,
                supportsInputType: [ "text", "tel", "password", "search" ],
                ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
                isComplete: null,
                preValidation: null,
                postValidation: null,
                staticDefinitionSymbol: undefined,
                jitMasking: !1,
                nullable: !0,
                inputEventOnly: !1,
                noValuePatching: !1,
                positionCaretOnClick: "lvp",
                casing: null,
                inputmode: "verbatim",
                colorMask: !1,
                disablePredictiveText: !1,
                importDataAttributes: !0
            },
            definitions: {
                9: {
                    validator: "[0-9１-９]",
                    definitionSymbol: "*"
                },
                a: {
                    validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                    definitionSymbol: "*"
                },
                "*": {
                    validator: "[0-9１-９A-Za-zА-яЁёÀ-ÿµ]"
                }
            },
            aliases: {},
            masksCache: {},
            mask: function(elems) {
                var that = this;
                return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
                elems = elems.nodeName ? [ elems ] : elems, $.each(elems, function(ndx, el) {
                    var scopedOpts = $.extend(!0, {}, that.opts);
                    if (function(npt, opts, userOptions, dataAttribute) {
                        if (!0 === opts.importDataAttributes) {
                            var option, dataoptions, optionData, p, importOption = function(option, optionData) {
                                null !== (optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option)) && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), 
                                userOptions[option] = optionData);
                            }, attrOptions = npt.getAttribute(dataAttribute);
                            if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), 
                            dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) for (p in optionData = undefined, 
                            dataoptions) if ("alias" === p.toLowerCase()) {
                                optionData = dataoptions[p];
                                break;
                            }
                            for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), 
                            opts) {
                                if (dataoptions) for (p in optionData = undefined, dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                                    optionData = dataoptions[p];
                                    break;
                                }
                                importOption(option, optionData);
                            }
                        }
                        return $.extend(!0, opts, userOptions), ("rtl" === npt.dir || opts.rightAlign) && (npt.style.textAlign = "right"), 
                        ("rtl" === npt.dir || opts.numericInput) && (npt.dir = "ltr", npt.removeAttribute("dir"), 
                        opts.isRTL = !0), Object.keys(userOptions).length;
                    }(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute)) {
                        var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                        maskset !== undefined && (el.inputmask !== undefined && (el.inputmask.opts.autoUnmask = !0, 
                        el.inputmask.remove()), el.inputmask = new Inputmask(undefined, undefined, !0), 
                        el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), 
                        el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el, 
                        el.inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {
                            action: "mask"
                        }));
                    }
                }), elems && elems[0] && elems[0].inputmask || this;
            },
            option: function(options, noremask) {
                return "string" == typeof options ? this.opts[options] : "object" === (void 0 === options ? "undefined" : _typeof(options)) ? ($.extend(this.userOptions, options), 
                this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
            },
            unmaskedvalue: function(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "unmaskedvalue",
                    value: value
                });
            },
            remove: function() {
                return maskScope.call(this, {
                    action: "remove"
                });
            },
            getemptymask: function() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "getemptymask"
                });
            },
            hasMaskedValue: function() {
                return !this.opts.autoUnmask;
            },
            isComplete: function() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "isComplete"
                });
            },
            getmetadata: function() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "getmetadata"
                });
            },
            isValid: function(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "isValid",
                    value: value
                });
            },
            format: function(value, metadata) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "format",
                    value: value,
                    metadata: metadata
                });
            },
            setValue: function(value) {
                this.el && $(this.el).trigger("setvalue", [ value ]);
            },
            analyseMask: function(mask, regexMask, opts) {
                var match, m, openingToken, currentOpeningToken, alternator, lastMatch, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?(?:\|[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), openenings = [], maskTokens = [];
                function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                    this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, 
                    this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
                    this.quantifier = {
                        min: 1,
                        max: 1
                    };
                }
                function insertTestDefinition(mtoken, element, position) {
                    position = position !== undefined ? position : mtoken.matches.length;
                    var prevMatch = mtoken.matches[position - 1];
                    if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
                        fn: new RegExp(element, opts.casing ? "i" : ""),
                        optionality: mtoken.isOptional,
                        newBlockMarker: prevMatch === undefined || prevMatch.def !== element,
                        casing: null,
                        def: element,
                        placeholder: undefined,
                        nativeDef: element
                    }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function(ndx, lmnt) {
                        prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                            fn: null,
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || prevMatch.def !== lmnt && null !== prevMatch.fn,
                            casing: null,
                            def: opts.staticDefinitionSymbol || lmnt,
                            placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
                            nativeDef: lmnt
                        });
                    })), escaped = !1; else {
                        var maskdef = (opts.definitions ? opts.definitions[element] : undefined) || Inputmask.prototype.definitions[element];
                        maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
                            fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function() {
                                this.test = maskdef.validator;
                            }() : new RegExp("."),
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                            casing: maskdef.casing,
                            def: maskdef.definitionSymbol || element,
                            placeholder: maskdef.placeholder,
                            nativeDef: element
                        }) : (mtoken.matches.splice(position++, 0, {
                            fn: null,
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || prevMatch.def !== element && null !== prevMatch.fn,
                            casing: null,
                            def: opts.staticDefinitionSymbol || element,
                            placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
                            nativeDef: element
                        }), escaped = !1);
                    }
                }
                function defaultCase() {
                    if (openenings.length > 0) {
                        if (insertTestDefinition(currentOpeningToken = openenings[openenings.length - 1], m), 
                        currentOpeningToken.isAlternator) {
                            alternator = openenings.pop();
                            for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
                            openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1]).matches.push(alternator) : currentToken.matches.push(alternator);
                        }
                    } else insertTestDefinition(currentToken, m);
                }
                function groupify(matches) {
                    var groupToken = new MaskToken(!0);
                    return groupToken.openGroup = !1, groupToken.matches = matches, groupToken;
                }
                for (regexMask && (opts.optionalmarker[0] = undefined, opts.optionalmarker[1] = undefined); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask); ) {
                    if (m = match[0], regexMask) switch (m.charAt(0)) {
                      case "?":
                        m = "{0,1}";
                        break;

                      case "+":
                      case "*":
                        m = "{" + m + "}";
                    }
                    if (escaped) defaultCase(); else switch (m.charAt(0)) {
                      case opts.escapeChar:
                        escaped = !0, regexMask && defaultCase();
                        break;

                      case opts.optionalmarker[1]:
                      case opts.groupmarker[1]:
                        if ((openingToken = openenings.pop()).openGroup = !1, openingToken !== undefined) if (openenings.length > 0) {
                            if ((currentOpeningToken = openenings[openenings.length - 1]).matches.push(openingToken), 
                            currentOpeningToken.isAlternator) {
                                alternator = openenings.pop();
                                for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, 
                                alternator.matches[mndx].alternatorGroup = !1;
                                openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1]).matches.push(alternator) : currentToken.matches.push(alternator);
                            }
                        } else currentToken.matches.push(openingToken); else defaultCase();
                        break;

                      case opts.optionalmarker[0]:
                        openenings.push(new MaskToken(!1, !0));
                        break;

                      case opts.groupmarker[0]:
                        openenings.push(new MaskToken(!0));
                        break;

                      case opts.quantifiermarker[0]:
                        var quantifier = new MaskToken(!1, !1, !0), mqj = (m = m.replace(/[{}]/g, "")).split("|"), mq = mqj[0].split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                        "*" !== mq1 && "+" !== mq1 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                            min: mq0,
                            max: mq1,
                            jit: mqj[1]
                        };
                        var matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
                        if ((match = matches.pop()).isAlternator) {
                            matches.push(match), matches = match.matches;
                            var groupToken = new MaskToken(!0), tmpMatch = matches.pop();
                            matches.push(groupToken), matches = groupToken.matches, match = tmpMatch;
                        }
                        match.isGroup || (match = groupify([ match ])), matches.push(match), matches.push(quantifier);
                        break;

                      case opts.alternatormarker:
                        var groupQuantifier = function(matches) {
                            var lastMatch = matches.pop();
                            return lastMatch.isQuantifier && (lastMatch = groupify([ matches.pop(), lastMatch ])), 
                            lastMatch;
                        };
                        if (openenings.length > 0) {
                            var subToken = (currentOpeningToken = openenings[openenings.length - 1]).matches[currentOpeningToken.matches.length - 1];
                            lastMatch = currentOpeningToken.openGroup && (subToken.matches === undefined || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches);
                        } else lastMatch = groupQuantifier(currentToken.matches);
                        if (lastMatch.isAlternator) openenings.push(lastMatch); else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), 
                        lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), 
                        openenings.push(alternator), lastMatch.openGroup) {
                            lastMatch.openGroup = !1;
                            var alternatorGroup = new MaskToken(!0);
                            alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
                        }
                        break;

                      default:
                        defaultCase();
                    }
                }
                for (;openenings.length > 0; ) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
                return currentToken.matches.length > 0 && (!function verifyGroupMarker(maskToken) {
                    maskToken && maskToken.matches && $.each(maskToken.matches, function(ndx, token) {
                        var nextToken = maskToken.matches[ndx + 1];
                        (nextToken === undefined || nextToken.matches === undefined || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, 
                        regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), 
                        verifyGroupMarker(token);
                    });
                }(currentToken), maskTokens.push(currentToken)), (opts.numericInput || opts.isRTL) && function reverseTokens(maskToken) {
                    for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches) if (maskToken.matches.hasOwnProperty(match)) {
                        var intMatch = parseInt(match);
                        if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                            var qt = maskToken.matches[match];
                            maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                        }
                        maskToken.matches[match].matches !== undefined ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = ((st = maskToken.matches[match]) === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), 
                        st);
                    }
                    var st;
                    return maskToken;
                }(maskTokens[0]), maskTokens;
            }
        }, Inputmask.extendDefaults = function(options) {
            $.extend(!0, Inputmask.prototype.defaults, options);
        }, Inputmask.extendDefinitions = function(definition) {
            $.extend(!0, Inputmask.prototype.definitions, definition);
        }, Inputmask.extendAliases = function(alias) {
            $.extend(!0, Inputmask.prototype.aliases, alias);
        }, Inputmask.format = function(value, options, metadata) {
            return Inputmask(options).format(value, metadata);
        }, Inputmask.unmask = function(value, options) {
            return Inputmask(options).unmaskedvalue(value);
        }, Inputmask.isValid = function(value, options) {
            return Inputmask(options).isValid(value);
        }, Inputmask.remove = function(elems) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
            elems = elems.nodeName ? [ elems ] : elems, $.each(elems, function(ndx, el) {
                el.inputmask && el.inputmask.remove();
            });
        }, Inputmask.setValue = function(elems, value) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
            elems = elems.nodeName ? [ elems ] : elems, $.each(elems, function(ndx, el) {
                el.inputmask ? el.inputmask.setValue(value) : $(el).trigger("setvalue", [ value ]);
            });
        }, Inputmask.escapeRegex = function(str) {
            return str.replace(new RegExp("(\\" + [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ].join("|\\") + ")", "gim"), "\\$1");
        }, Inputmask.keyCode = {
            BACKSPACE: 8,
            BACKSPACE_SAFARI: 127,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            X: 88,
            CONTROL: 17
        }, Inputmask;
    }, __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(5), __webpack_require__(6) ], 
    void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports) {
    module.exports = jQuery;
}, function(module, exports, __webpack_require__) {
    "use strict";
    __webpack_require__(4), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9);
    var _inputmask2 = _interopRequireDefault(__webpack_require__(1)), _inputmask4 = _interopRequireDefault(__webpack_require__(0)), _jquery2 = _interopRequireDefault(__webpack_require__(2));
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    _inputmask4.default === _jquery2.default && __webpack_require__(10), window.Inputmask = _inputmask2.default;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, factory;
    "function" == typeof Symbol && Symbol.iterator;
    factory = function($, Inputmask) {
        var formatCode = {
            d: [ "[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate ],
            dd: [ "0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function() {
                return pad(Date.prototype.getDate.call(this), 2);
            } ],
            ddd: [ "" ],
            dddd: [ "" ],
            m: [ "[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
                return Date.prototype.getMonth.call(this) + 1;
            } ],
            mm: [ "0[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
                return pad(Date.prototype.getMonth.call(this) + 1, 2);
            } ],
            mmm: [ "" ],
            mmmm: [ "" ],
            yy: [ "[0-9]{2}", Date.prototype.setFullYear, "year", function() {
                return pad(Date.prototype.getFullYear.call(this), 2);
            } ],
            yyyy: [ "[0-9]{4}", Date.prototype.setFullYear, "year", function() {
                return pad(Date.prototype.getFullYear.call(this), 4);
            } ],
            h: [ "[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
            hh: [ "0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function() {
                return pad(Date.prototype.getHours.call(this), 2);
            } ],
            hhh: [ "[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours ],
            H: [ "1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
            HH: [ "[01][0-9]|2[0-3]", Date.prototype.setHours, "hours", function() {
                return pad(Date.prototype.getHours.call(this), 2);
            } ],
            HHH: [ "[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours ],
            M: [ "[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes ],
            MM: [ "[0-5][0-9]", Date.prototype.setMinutes, "minutes", function() {
                return pad(Date.prototype.getMinutes.call(this), 2);
            } ],
            s: [ "[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds ],
            ss: [ "[0-5][0-9]", Date.prototype.setSeconds, "seconds", function() {
                return pad(Date.prototype.getSeconds.call(this), 2);
            } ],
            l: [ "[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function() {
                return pad(Date.prototype.getMilliseconds.call(this), 3);
            } ],
            L: [ "[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function() {
                return pad(Date.prototype.getMilliseconds.call(this), 2);
            } ],
            t: [ "[ap]" ],
            tt: [ "[ap]m" ],
            T: [ "[AP]" ],
            TT: [ "[AP]M" ],
            Z: [ "" ],
            o: [ "" ],
            S: [ "" ]
        }, formatAlias = {
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };
        function getTokenizer(opts) {
            if (!opts.tokenizer) {
                var tokens = [];
                for (var ndx in formatCode) -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
                opts.tokenizer = "(" + tokens.join("+|") + ")+?|.", opts.tokenizer = new RegExp(opts.tokenizer, "g");
            }
            return opts.tokenizer;
        }
        function parse(format, dateObjValue, opts) {
            for (var match, mask = ""; match = getTokenizer(opts).exec(format); ) {
                if (void 0 === dateObjValue) if (formatCode[match[0]]) mask += "(" + formatCode[match[0]][0] + ")"; else switch (match[0]) {
                  case "[":
                    mask += "(";
                    break;

                  case "]":
                    mask += ")?";
                    break;

                  default:
                    mask += Inputmask.escapeRegex(match[0]);
                } else if (formatCode[match[0]]) mask += formatCode[match[0]][3].call(dateObjValue.date); else mask += match[0];
            }
            return mask;
        }
        function pad(val, len) {
            for (val = String(val), len = len || 2; val.length < len; ) val = "0" + val;
            return val;
        }
        function analyseMask(maskString, format, opts) {
            var targetProp, match, dateOperation, dateObj = {
                date: new Date(1, 0, 1)
            }, mask = maskString;
            function extendYear(year) {
                var correctedyear = 4 === year.length ? year : new Date().getFullYear().toString().substr(0, 4 - year.length) + year;
                return opts.min && opts.min.year && opts.max && opts.max.year ? (correctedyear = correctedyear.replace(/[^0-9]/g, ""), 
                correctedyear += opts.min.year == opts.max.year ? opts.min.year.substr(correctedyear.length) : ("" !== correctedyear && 0 == opts.max.year.indexOf(correctedyear) ? parseInt(opts.max.year) - 1 : parseInt(opts.min.year) + 1).toString().substr(correctedyear.length)) : correctedyear = correctedyear.replace(/[^0-9]/g, "0"), 
                correctedyear;
            }
            function setValue(dateObj, value, opts) {
                "year" === targetProp ? (dateObj[targetProp] = extendYear(value), dateObj["raw" + targetProp] = value) : dateObj[targetProp] = opts.min && value.match(/[^0-9]/) ? opts.min[targetProp] : value, 
                void 0 !== dateOperation && dateOperation.call(dateObj.date, "month" == targetProp ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
            }
            if ("string" == typeof mask) {
                for (;match = getTokenizer(opts).exec(format); ) {
                    var value = mask.slice(0, match[0].length);
                    formatCode.hasOwnProperty(match[0]) && (targetProp = formatCode[match[0]][2], dateOperation = formatCode[match[0]][1], 
                    setValue(dateObj, value, opts)), mask = mask.slice(value.length);
                }
                return dateObj;
            }
        }
        return Inputmask.extendAliases({
            datetime: {
                mask: function(opts) {
                    return formatCode.S = opts.i18n.ordinalSuffix.join("|"), opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, 
                    opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, 
                    opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, 
                    opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[\[\]]/, ""), 
                    opts.min = analyseMask(opts.min, opts.inputFormat, opts), opts.max = analyseMask(opts.max, opts.inputFormat, opts), 
                    opts.regex = parse(opts.inputFormat, void 0, opts), null;
                },
                placeholder: "",
                inputFormat: "isoDateTime",
                displayFormat: void 0,
                outputFormat: void 0,
                min: null,
                max: null,
                i18n: {
                    dayNames: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                    monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                    ordinalSuffix: [ "st", "nd", "rd", "th" ]
                },
                postValidation: function(buffer, currentResult, opts) {
                    var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                    return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = (result = function(dateParts, currentResult) {
                        return (!isFinite(dateParts.day) || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.month) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) && currentResult;
                    }(dateParts, result)) && function(dateParts, opts) {
                        var result = !0;
                        return opts.min && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime()), 
                        result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), 
                        result;
                    }(dateParts, opts)), result;
                },
                onKeyDown: function(e, buffer, caretPos, opts) {
                    if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                        for (var match, today = new Date(), date = ""; match = getTokenizer(opts).exec(opts.inputFormat); ) "d" === match[0].charAt(0) ? date += pad(today.getDate(), match[0].length) : "m" === match[0].charAt(0) ? date += pad(today.getMonth() + 1, match[0].length) : "yyyy" === match[0] ? date += today.getFullYear().toString() : "y" === match[0].charAt(0) && (date += pad(today.getYear(), match[0].length));
                        this.inputmask._valueSet(date), $(this).trigger("setvalue");
                    }
                },
                onUnMask: function(maskedValue, unmaskedValue, opts) {
                    return parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts);
                },
                casing: function(elem, test, pos, validPositions) {
                    return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem;
                },
                insertMode: !1
            }
        }), Inputmask;
    }, __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(1) ], 
    void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_RESULT__;
    "function" == typeof Symbol && Symbol.iterator;
    void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return window;
    }.call(exports, __webpack_require__, exports, module)) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_RESULT__;
    "function" == typeof Symbol && Symbol.iterator;
    void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return document;
    }.call(exports, __webpack_require__, exports, module)) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, factory;
    "function" == typeof Symbol && Symbol.iterator;
    factory = function($, Inputmask) {
        return Inputmask.extendDefinitions({
            A: {
                validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                casing: "upper"
            },
            "&": {
                validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]",
                casing: "upper"
            },
            "#": {
                validator: "[0-9A-Fa-f]",
                casing: "upper"
            }
        }), Inputmask.extendAliases({
            cssunit: {
                regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
            },
            url: {
                regex: "(https?|ftp)//.*",
                autoUnmask: !1
            },
            ip: {
                mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
                definitions: {
                    i: {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return pos - 1 > -1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, 
                            chrs = pos - 2 > -1 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : chrs = "00" + chrs, 
                            new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                        }
                    }
                },
                onUnMask: function(maskedValue, unmaskedValue, opts) {
                    return maskedValue;
                },
                inputmode: "numeric"
            },
            email: {
                mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                greedy: !1,
                casing: "lower",
                onBeforePaste: function(pastedValue, opts) {
                    return (pastedValue = pastedValue.toLowerCase()).replace("mailto:", "");
                },
                definitions: {
                    "*": {
                        validator: "[0-9１-９A-Za-zА-яЁёÀ-ÿµ!#$%&'*+/=?^_`{|}~-]"
                    },
                    "-": {
                        validator: "[0-9A-Za-z-]"
                    }
                },
                onUnMask: function(maskedValue, unmaskedValue, opts) {
                    return maskedValue;
                },
                inputmode: "email"
            },
            mac: {
                mask: "##:##:##:##:##:##"
            },
            vin: {
                mask: "V{13}9{4}",
                definitions: {
                    V: {
                        validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                        casing: "upper"
                    }
                },
                clearIncomplete: !0,
                autoUnmask: !0
            }
        }), Inputmask;
    }, __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(1) ], 
    void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, factory;
    "function" == typeof Symbol && Symbol.iterator;
    factory = function($, Inputmask, undefined) {
        function autoEscape(txt, opts) {
            for (var escapedTxt = "", i = 0; i < txt.length; i++) Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
            return escapedTxt;
        }
        return Inputmask.extendAliases({
            numeric: {
                mask: function(opts) {
                    if (0 !== opts.repeat && isNaN(opts.integerDigits) && (opts.integerDigits = opts.repeat), 
                    opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), 
                    " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = undefined), opts.autoGroup = opts.autoGroup && "" !== opts.groupSeparator, 
                    opts.autoGroup && ("string" == typeof opts.groupSize && isFinite(opts.groupSize) && (opts.groupSize = parseInt(opts.groupSize)), 
                    isFinite(opts.integerDigits))) {
                        var seps = Math.floor(opts.integerDigits / opts.groupSize), mod = opts.integerDigits % opts.groupSize;
                        opts.integerDigits = parseInt(opts.integerDigits) + (0 === mod ? seps - 1 : seps), 
                        opts.integerDigits < 1 && (opts.integerDigits = "*");
                    }
                    opts.placeholder.length > 1 && (opts.placeholder = opts.placeholder.charAt(0)), 
                    "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && !1 === opts.integerOptional && (opts.positionCaretOnClick = "lvp"), 
                    opts.definitions[";"] = opts.definitions["~"], opts.definitions[";"].definitionSymbol = "~", 
                    !0 === opts.numericInput && (opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, 
                    opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts.decimalProtect = !1);
                    var mask = "[+]";
                    if (mask += autoEscape(opts.prefix, opts), !0 === opts.integerOptional ? mask += "~{1," + opts.integerDigits + "}" : mask += "~{" + opts.integerDigits + "}", 
                    opts.digits !== undefined) {
                        var radixDef = opts.decimalProtect ? ":" : opts.radixPoint, dq = opts.digits.toString().split(",");
                        isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += radixDef + ";{" + opts.digits + "}" : (isNaN(opts.digits) || parseInt(opts.digits) > 0) && (opts.digitsOptional ? mask += "[" + radixDef + ";{1," + opts.digits + "}]" : mask += radixDef + ";{" + opts.digits + "}");
                    }
                    return mask += autoEscape(opts.suffix, opts), mask += "[-]", opts.greedy = !1, mask;
                },
                placeholder: "",
                greedy: !1,
                digits: "*",
                digitsOptional: !0,
                enforceDigitsOnBlur: !1,
                radixPoint: ".",
                positionCaretOnClick: "radixFocus",
                groupSize: 3,
                groupSeparator: "",
                autoGroup: !1,
                allowMinus: !0,
                negationSymbol: {
                    front: "-",
                    back: ""
                },
                integerDigits: "+",
                integerOptional: !0,
                prefix: "",
                suffix: "",
                rightAlign: !0,
                decimalProtect: !0,
                min: null,
                max: null,
                step: 1,
                insertMode: !0,
                autoUnmask: !1,
                unmaskAsNumber: !1,
                inputmode: "numeric",
                preValidation: function(buffer, pos, c, isSelection, opts, maskset) {
                    if ("-" === c || c === opts.negationSymbol.front) return !0 === opts.allowMinus && (opts.isNegative = opts.isNegative === undefined || !opts.isNegative, 
                    "" === buffer.join("") || {
                        caret: pos,
                        dopost: !0
                    });
                    if (!1 === isSelection && c === opts.radixPoint && opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
                        var radixPos = $.inArray(opts.radixPoint, buffer);
                        if (-1 !== radixPos && maskset.validPositions[radixPos] !== undefined) return !0 === opts.numericInput ? pos === radixPos : {
                            caret: radixPos + 1
                        };
                    }
                    return !0;
                },
                postValidation: function(buffer, currentResult, opts) {
                    var suffix = opts.suffix.split(""), prefix = opts.prefix.split("");
                    if (currentResult.pos === undefined && currentResult.caret !== undefined && !0 !== currentResult.dopost) return currentResult;
                    var caretPos = currentResult.caret !== undefined ? currentResult.caret : currentResult.pos, maskedValue = buffer.slice();
                    opts.numericInput && (caretPos = maskedValue.length - caretPos - 1, maskedValue = maskedValue.reverse());
                    var charAtPos = maskedValue[caretPos];
                    if (charAtPos === opts.groupSeparator && (charAtPos = maskedValue[caretPos += 1]), 
                    caretPos === maskedValue.length - opts.suffix.length - 1 && charAtPos === opts.radixPoint) return currentResult;
                    charAtPos !== undefined && charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back && (maskedValue[caretPos] = "?", 
                    opts.prefix.length > 0 && caretPos >= (!1 === opts.isNegative ? 1 : 0) && caretPos < opts.prefix.length - 1 + (!1 === opts.isNegative ? 1 : 0) ? prefix[caretPos - (!1 === opts.isNegative ? 1 : 0)] = "?" : opts.suffix.length > 0 && caretPos >= maskedValue.length - opts.suffix.length - (!1 === opts.isNegative ? 1 : 0) && (suffix[caretPos - (maskedValue.length - opts.suffix.length - (!1 === opts.isNegative ? 1 : 0))] = "?")), 
                    prefix = prefix.join(""), suffix = suffix.join("");
                    var processValue = maskedValue.join("").replace(prefix, "");
                    if (processValue = (processValue = (processValue = (processValue = processValue.replace(suffix, "")).replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "")).replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "")).replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), 
                    isNaN(opts.placeholder) && (processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "")), 
                    processValue.length > 1 && 1 !== processValue.indexOf(opts.radixPoint) && ("0" === charAtPos && (processValue = processValue.replace(/^\?/g, "")), 
                    processValue = processValue.replace(/^0/g, "")), processValue.charAt(0) === opts.radixPoint && "" !== opts.radixPoint && !0 !== opts.numericInput && (processValue = "0" + processValue), 
                    "" !== processValue) {
                        if (processValue = processValue.split(""), (!opts.digitsOptional || opts.enforceDigitsOnBlur && "blur" === currentResult.event) && isFinite(opts.digits)) {
                            var radixPosition = $.inArray(opts.radixPoint, processValue), rpb = $.inArray(opts.radixPoint, maskedValue);
                            -1 === radixPosition && (processValue.push(opts.radixPoint), radixPosition = processValue.length - 1);
                            for (var i = 1; i <= opts.digits; i++) opts.digitsOptional && (!opts.enforceDigitsOnBlur || "blur" !== currentResult.event) || processValue[radixPosition + i] !== undefined && processValue[radixPosition + i] !== opts.placeholder.charAt(0) ? -1 !== rpb && maskedValue[rpb + i] !== undefined && (processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i]) : processValue[radixPosition + i] = currentResult.placeholder || opts.placeholder.charAt(0);
                        }
                        if (!0 !== opts.autoGroup || "" === opts.groupSeparator || charAtPos === opts.radixPoint && currentResult.pos === undefined && !currentResult.dopost) processValue = processValue.join(""); else {
                            var addRadix = processValue[processValue.length - 1] === opts.radixPoint && currentResult.c === opts.radixPoint;
                            processValue = Inputmask(function(buffer, opts) {
                                var postMask = "";
                                if (postMask += "(" + opts.groupSeparator + "*{" + opts.groupSize + "}){*}", "" !== opts.radixPoint) {
                                    var radixSplit = buffer.join("").split(opts.radixPoint);
                                    radixSplit[1] && (postMask += opts.radixPoint + "*{" + radixSplit[1].match(/^\d*\??\d*/)[0].length + "}");
                                }
                                return postMask;
                            }(processValue, opts), {
                                numericInput: !0,
                                jitMasking: !0,
                                definitions: {
                                    "*": {
                                        validator: "[0-9?]",
                                        cardinality: 1
                                    }
                                }
                            }).format(processValue.join("")), addRadix && (processValue += opts.radixPoint), 
                            processValue.charAt(0) === opts.groupSeparator && processValue.substr(1);
                        }
                    }
                    if (opts.isNegative && "blur" === currentResult.event && (opts.isNegative = "0" !== processValue), 
                    processValue = prefix + processValue, processValue += suffix, opts.isNegative && (processValue = opts.negationSymbol.front + processValue, 
                    processValue += opts.negationSymbol.back), processValue = processValue.split(""), 
                    charAtPos !== undefined) if (charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back) (caretPos = $.inArray("?", processValue)) > -1 ? processValue[caretPos] = charAtPos : caretPos = currentResult.caret || 0; else if (charAtPos === opts.radixPoint || charAtPos === opts.negationSymbol.front || charAtPos === opts.negationSymbol.back) {
                        var newCaretPos = $.inArray(charAtPos, processValue);
                        -1 !== newCaretPos && (caretPos = newCaretPos);
                    }
                    opts.numericInput && (caretPos = processValue.length - caretPos - 1, processValue = processValue.reverse());
                    var rslt = {
                        caret: charAtPos === undefined || currentResult.pos !== undefined ? caretPos + (opts.numericInput ? -1 : 1) : caretPos,
                        buffer: processValue,
                        refreshFromBuffer: currentResult.dopost || buffer.join("") !== processValue.join("")
                    };
                    return rslt.refreshFromBuffer ? rslt : currentResult;
                },
                onBeforeWrite: function(e, buffer, caretPos, opts) {
                    if (e) switch (e.type) {
                      case "keydown":
                        return opts.postValidation(buffer, {
                            caret: caretPos,
                            dopost: !0
                        }, opts);

                      case "blur":
                      case "checkval":
                        var unmasked;
                        if (function(opts) {
                            opts.parseMinMaxOptions === undefined && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                            "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), 
                            opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), 
                            null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                            "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), 
                            opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), 
                            opts.parseMinMaxOptions = "done");
                        }(opts), null !== opts.min || null !== opts.max) {
                            if (unmasked = opts.onUnMask(buffer.join(""), undefined, $.extend({}, opts, {
                                unmaskAsNumber: !0
                            })), null !== opts.min && unmasked < opts.min) return opts.isNegative = opts.min < 0, 
                            opts.postValidation(opts.min.toString().replace(".", opts.radixPoint).split(""), {
                                caret: caretPos,
                                dopost: !0,
                                placeholder: "0"
                            }, opts);
                            if (null !== opts.max && unmasked > opts.max) return opts.isNegative = opts.max < 0, 
                            opts.postValidation(opts.max.toString().replace(".", opts.radixPoint).split(""), {
                                caret: caretPos,
                                dopost: !0,
                                placeholder: "0"
                            }, opts);
                        }
                        return opts.postValidation(buffer, {
                            caret: caretPos,
                            placeholder: "0",
                            event: "blur"
                        }, opts);

                      case "_checkval":
                        return {
                            caret: caretPos
                        };
                    }
                },
                regex: {
                    integerPart: function(opts, emptyCheck) {
                        return emptyCheck ? new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?") : new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?\\d+");
                    },
                    integerNPart: function(opts) {
                        return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
                    }
                },
                definitions: {
                    "~": {
                        validator: function(chrs, maskset, pos, strict, opts, isSelection) {
                            var isValid;
                            if ("k" === chrs || "m" === chrs) {
                                isValid = {
                                    insert: [],
                                    c: 0
                                };
                                for (var i = 0, l = "k" === chrs ? 2 : 5; i < l; i++) isValid.insert.push({
                                    pos: pos + i,
                                    c: 0
                                });
                                return isValid.pos = pos + l, isValid;
                            }
                            if (!0 === (isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs))) {
                                if (!0 !== opts.numericInput && maskset.validPositions[pos] !== undefined && "~" === maskset.validPositions[pos].match.def && !isSelection) {
                                    var processValue = maskset.buffer.join(""), pvRadixSplit = (processValue = (processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "")).replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "")).split(opts.radixPoint);
                                    pvRadixSplit.length > 1 && (pvRadixSplit[1] = pvRadixSplit[1].replace(/0/g, opts.placeholder.charAt(0))), 
                                    "0" === pvRadixSplit[0] && (pvRadixSplit[0] = pvRadixSplit[0].replace(/0/g, opts.placeholder.charAt(0))), 
                                    processValue = pvRadixSplit[0] + opts.radixPoint + pvRadixSplit[1] || "";
                                    var bufferTemplate = maskset._buffer.join("");
                                    for (processValue === opts.radixPoint && (processValue = bufferTemplate); null === processValue.match(Inputmask.escapeRegex(bufferTemplate) + "$"); ) bufferTemplate = bufferTemplate.slice(1);
                                    isValid = (processValue = (processValue = processValue.replace(bufferTemplate, "")).split(""))[pos] === undefined ? {
                                        pos: pos,
                                        remove: pos
                                    } : {
                                        pos: pos
                                    };
                                }
                            } else strict || chrs !== opts.radixPoint || maskset.validPositions[pos - 1] !== undefined || (isValid = {
                                insert: {
                                    pos: pos,
                                    c: 0
                                },
                                pos: pos + 1
                            });
                            return isValid;
                        },
                        cardinality: 1
                    },
                    "+": {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front);
                        },
                        cardinality: 1,
                        placeholder: ""
                    },
                    "-": {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && chrs === opts.negationSymbol.back;
                        },
                        cardinality: 1,
                        placeholder: ""
                    },
                    ":": {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]", isValid = new RegExp(radix).test(chrs);
                            return isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint && (isValid = {
                                caret: pos + 1
                            }), isValid;
                        },
                        cardinality: 1,
                        placeholder: function(opts) {
                            return opts.radixPoint;
                        }
                    }
                },
                onUnMask: function(maskedValue, unmaskedValue, opts) {
                    if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
                    var processValue = maskedValue.replace(opts.prefix, "");
                    return processValue = (processValue = processValue.replace(opts.suffix, "")).replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                    "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), 
                    opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), 
                    processValue = (processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-")).replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), 
                    Number(processValue)) : processValue;
                },
                isComplete: function(buffer, opts) {
                    var maskedValue = buffer.join("");
                    if (buffer.slice().join("") !== maskedValue) return !1;
                    var processValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
                    return processValue = (processValue = (processValue = (processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "")).replace(opts.prefix, "")).replace(opts.suffix, "")).replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), 
                    "," === opts.radixPoint && (processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), 
                    isFinite(processValue);
                },
                onBeforeMask: function(initialValue, opts) {
                    if (opts.isNegative = undefined, "number" == typeof initialValue && "" !== opts.radixPoint && (initialValue = initialValue.toString().replace(".", opts.radixPoint)), 
                    initialValue = initialValue.toString().charAt(initialValue.length - 1) === opts.radixPoint ? initialValue.toString().substr(0, initialValue.length - 1) : initialValue.toString(), 
                    "" !== opts.radixPoint && isFinite(initialValue)) {
                        var vs = initialValue.split("."), groupSize = "" !== opts.groupSeparator ? parseInt(opts.groupSize) : 0;
                        2 === vs.length && (vs[0].length > groupSize || vs[1].length > groupSize || vs[0].length <= groupSize && vs[1].length < groupSize) && (initialValue = initialValue.replace(".", opts.radixPoint));
                    }
                    var kommaMatches = initialValue.match(/,/g), dotMatches = initialValue.match(/\./g);
                    if (initialValue = dotMatches && kommaMatches ? dotMatches.length > kommaMatches.length ? (initialValue = initialValue.replace(/\./g, "")).replace(",", opts.radixPoint) : kommaMatches.length > dotMatches.length ? (initialValue = initialValue.replace(/,/g, "")).replace(".", opts.radixPoint) : initialValue.indexOf(".") < initialValue.indexOf(",") ? initialValue.replace(/\./g, "") : initialValue.replace(/,/g, "") : initialValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                    0 === opts.digits && (-1 !== initialValue.indexOf(".") ? initialValue = initialValue.substring(0, initialValue.indexOf(".")) : -1 !== initialValue.indexOf(",") && (initialValue = initialValue.substring(0, initialValue.indexOf(",")))), 
                    "" !== opts.radixPoint && isFinite(opts.digits) && -1 !== initialValue.indexOf(opts.radixPoint)) {
                        var decPart = initialValue.split(opts.radixPoint)[1].match(new RegExp("\\d*"))[0];
                        if (parseInt(opts.digits) < decPart.toString().length) {
                            var digitsFactor = Math.pow(10, parseInt(opts.digits));
                            initialValue = initialValue.replace(Inputmask.escapeRegex(opts.radixPoint), "."), 
                            initialValue = (initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor).toString().replace(".", opts.radixPoint);
                        }
                    }
                    return initialValue;
                },
                onKeyDown: function(e, buffer, caretPos, opts) {
                    var $input = $(this);
                    if (e.ctrlKey) switch (e.keyCode) {
                      case Inputmask.keyCode.UP:
                        $input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue");
                        break;

                      case Inputmask.keyCode.DOWN:
                        $input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue");
                    }
                }
            },
            currency: {
                prefix: "$ ",
                groupSeparator: ",",
                alias: "numeric",
                placeholder: "0",
                autoGroup: !0,
                digits: 2,
                digitsOptional: !1,
                clearMaskOnLostFocus: !1
            },
            decimal: {
                alias: "numeric"
            },
            integer: {
                alias: "numeric",
                digits: 0,
                radixPoint: ""
            },
            percentage: {
                alias: "numeric",
                digits: 2,
                digitsOptional: !0,
                radixPoint: ".",
                placeholder: "0",
                autoGroup: !1,
                min: 0,
                max: 100,
                suffix: " %",
                allowMinus: !1
            }
        }), Inputmask;
    }, __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(1) ], 
    void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, factory;
    "function" == typeof Symbol && Symbol.iterator;
    factory = function($, Inputmask) {
        function maskSort(a, b) {
            var maska = (a.mask || a).replace(/#/g, "0").replace(/\)/, "0").replace(/[+()#-]/g, ""), maskb = (b.mask || b).replace(/#/g, "0").replace(/\)/, "0").replace(/[+()#-]/g, "");
            return maska.localeCompare(maskb);
        }
        var analyseMaskBase = Inputmask.prototype.analyseMask;
        return Inputmask.prototype.analyseMask = function(mask, regexMask, opts) {
            var maskGroups = {};
            return opts.phoneCodes && (opts.phoneCodes && opts.phoneCodes.length > 1e3 && (function reduceVariations(masks, previousVariation, previousmaskGroup) {
                previousVariation = previousVariation || "", previousmaskGroup = previousmaskGroup || maskGroups, 
                "" !== previousVariation && (previousmaskGroup[previousVariation] = {});
                for (var variation = "", maskGroup = previousmaskGroup[previousVariation] || previousmaskGroup, i = masks.length - 1; i >= 0; i--) maskGroup[variation = (mask = masks[i].mask || masks[i]).substr(0, 1)] = maskGroup[variation] || [], 
                maskGroup[variation].unshift(mask.substr(1)), masks.splice(i, 1);
                for (var ndx in maskGroup) maskGroup[ndx].length > 500 && reduceVariations(maskGroup[ndx].slice(), ndx, maskGroup);
            }((mask = mask.substr(1, mask.length - 2)).split(opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0])), 
            mask = function rebuild(maskGroup) {
                var mask = "", submasks = [];
                for (var ndx in maskGroup) $.isArray(maskGroup[ndx]) ? 1 === maskGroup[ndx].length ? submasks.push(ndx + maskGroup[ndx]) : submasks.push(ndx + opts.groupmarker[0] + maskGroup[ndx].join(opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]) + opts.groupmarker[1]) : submasks.push(ndx + rebuild(maskGroup[ndx]));
                return 1 === submasks.length ? mask += submasks[0] : mask += opts.groupmarker[0] + submasks.join(opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]) + opts.groupmarker[1], 
                mask;
            }(maskGroups)), mask = mask.replace(/9/g, "\\9")), analyseMaskBase.call(this, mask, regexMask, opts);
        }, Inputmask.extendAliases({
            abstractphone: {
                groupmarker: [ "<", ">" ],
                countrycode: "",
                phoneCodes: [],
                keepStatic: "auto",
                mask: function(opts) {
                    return opts.definitions = {
                        "#": Inputmask.prototype.definitions[9]
                    }, opts.phoneCodes.sort(maskSort);
                },
                onBeforeMask: function(value, opts) {
                    var processedValue = value.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
                    return (processedValue.indexOf(opts.countrycode) > 1 || -1 === processedValue.indexOf(opts.countrycode)) && (processedValue = "+" + opts.countrycode + processedValue), 
                    processedValue;
                },
                onUnMask: function(maskedValue, unmaskedValue, opts) {
                    return maskedValue.replace(/[()#-]/g, "");
                },
                inputmode: "tel"
            }
        }), Inputmask;
    }, __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(1) ], 
    void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, factory, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    factory = function($, Inputmask) {
        return void 0 === $.fn.inputmask && ($.fn.inputmask = function(fn, options) {
            var nptmask, input = this[0];
            if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
              case "unmaskedvalue":
                return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();

              case "remove":
                return this.each(function() {
                    this.inputmask && this.inputmask.remove();
                });

              case "getemptymask":
                return input && input.inputmask ? input.inputmask.getemptymask() : "";

              case "hasMaskedValue":
                return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();

              case "isComplete":
                return !input || !input.inputmask || input.inputmask.isComplete();

              case "getmetadata":
                return input && input.inputmask ? input.inputmask.getmetadata() : void 0;

              case "setvalue":
                Inputmask.setValue(input, options);
                break;

              case "option":
                if ("string" != typeof options) return this.each(function() {
                    if (void 0 !== this.inputmask) return this.inputmask.option(options);
                });
                if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
                break;

              default:
                return options.alias = fn, nptmask = new Inputmask(options), this.each(function() {
                    nptmask.mask(this);
                });
            } else {
                if ("object" == (void 0 === fn ? "undefined" : _typeof(fn))) return nptmask = new Inputmask(fn), 
                void 0 === fn.mask && void 0 === fn.alias ? this.each(function() {
                    if (void 0 !== this.inputmask) return this.inputmask.option(fn);
                    nptmask.mask(this);
                }) : this.each(function() {
                    nptmask.mask(this);
                });
                if (void 0 === fn) return this.each(function() {
                    (nptmask = new Inputmask(options)).mask(this);
                });
            }
        }), $.fn.inputmask;
    }, __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(2), __webpack_require__(1) ], 
    void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
} ]);
/*====== jQuery UI accordion ======*/

(function($) {
    $( ".ama__accordion" ).accordion({
        heightStyle: "content",
        collapsible: true
    });
})(jQuery);

/**
 * @file
 * Form fields masking
 */

(function ($, Drupal) {
  Drupal.behaviors.formItems = {
    attach: function (context, settings) {
      (function ($) {
        $(document).ready(function(){

          $('.multiselect').multiselect();

          $('.ama__tooltip').tooltip({
            tooltipClass: "ama__tooltip-bubble"
          });

          function count_remaining_character() {
            var max_length = 150;
            var character_entered = $('.textarea').val().length;
            var character_remaining = max_length - character_entered;
            $('.character-count').html(character_remaining);
            if (max_length < character_entered) {
              $('.textarea').addClass('error');
              $('.character-count').addClass('error');
            } else {
              $('.textarea').removeClass('error');
              $('.character-count').removeClass('error');
            }
          }

          // Start search filter

          var availableTags = [
            "Alabama",
            "Alaska",
            "American Samoa",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "District Of Columbia",
            "Federated States Of Micronesia",
            "Florida",
            "Georgia",
            "Guam",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Marshall Islands",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Northern Mariana Islands",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Palau",
            "Pennsylvania",
            "Puerto Rico",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virgin Islands",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
          ];

          $( "#search_filter" ).autocomplete({
            source: availableTags
          });

          $.ui.autocomplete.prototype._resizeMenu = function () {
            var ul = this.menu.element;
            ul.outerWidth(this.element.outerWidth());
          };


          // Start search filter with checkboxes

          var dataModel = [
            {text: 'Alabama', value: '2'},
            {text: 'Alaska', value: '2'},
            {text: 'American Samoa', value: '2'},
            {text: 'Arizona', value: '2'},
            {text: 'Arkansas', value: '2'},
            {text: 'California', value: '2'},
            {text: 'Colorado', value: '2'},
            {text: 'Connecticut', value: '2'},
            {text: 'Delaware', value: '2'},
            {text: 'District Of Columbia', value: '2'},
            {text: 'Federated States Of Micronesia', value: '2'},
            {text: 'Florida', value: '2'},
            {text: 'Georgia', value: '2'},
            {text: 'Guam', value: '2'},
            {text: 'Hawaii', value: '2'},
            {text: 'Idaho', value: '2'},
            {text: 'Illinois', value: '2'},
            {text: 'Indiana', value: '2'},
            {text: 'Iowa', value: '2'},
            {text: 'Kansas', value: '2'},
            {text: 'Kentucky', value: '2'},
            {text: 'Louisiana', value: '2'},
            {text: 'Maine', value: '2'},
            {text: 'Marshall Islands', value: '2'},
            {text: 'Maryland', value: '2'},
            {text: 'Massachusetts', value: '2'},
            {text: 'Michigan', value: '2'},
            {text: 'Minnesota', value: '2'},
            {text: 'Mississippi', value: '2'},
            {text: 'Missouri', value: '2'},
            {text: 'Montana', value: '2'},
            {text: 'Nebraska', value: '2'},
            {text: 'Nevada', value: '2'},
            {text: 'New Hampshire', value: '2'},
            {text: 'New Jersey', value: '2'},
            {text: 'New Mexico', value: '2'},
            {text: 'New York', value: '2'},
            {text: 'North Carolina', value: '2'},
            {text: 'North Dakota', value: '2'},
            {text: 'Northern Mariana Islands', value: '2'},
            {text: 'Ohio', value: '2'},
            {text: 'Oklahoma', value: '2'},
            {text: 'Oregon', value: '2'},
            {text: 'Palau', value: '2'},
            {text: 'Pennsylvania', value: '2'},
            {text: 'Puerto Rico', value: '2'},
            {text: 'Rhode Island', value: '2'},
            {text: 'South Carolina', value: '2'},
            {text: 'South Dakota', value: '2'},
            {text: 'Tennessee', value: '2'},
            {text: 'Texas', value: '2'},
            {text: 'Utah', value: '2'},
            {text: 'Vermont', value: '2'},
            {text: 'Virgin Islands', value: '2'},
            {text: 'Virginia', value: '2'},
            {text: 'Washington', value: '2'},
            {text: 'West Virginia', value: '2'},
            {text: 'Wisconsin', value: '2'},
            {text: 'Wyoming', value: '2'},
            {text: '', value: ''}
          ];

          function selChange(){
            var selection = $('#myCheckList').checkList('getSelection');

            $('#selectedItems').text(JSON.stringify(selection));
          }

          $('#filterList').checkList({
            listItems: dataModel,
            onChange: selChange
          });

          $('[type=checkbox]').checkboxradio();
          $('[type=radio]').checkboxradio().buttonset().find('label').css('width', '19.4%');
          $('.ama__select-menu__select').selectmenu();


          $('.textarea').keyup(function() {
            count_remaining_character();
          });

          // Range Field
          var legend = $('.ama__range-field__legend');
          var handle = $( "#currentValue" );

          $(".ama__range-field").slider({
            animate: true,
            range: 'min',
            value: 1,
            min: 2000,
            max: 5000,
            step: 1,
            create: function(){
              var handle = jQuery(this).find('.ui-slider-handle');
              var bubble = jQuery('<div class="ama__range-field__valuebox"></div>');
              handle.append(bubble);
            },
            slide: function(evt, ui) {
              ui.handle.childNodes[0].innerHTML = '$' + ui.value;
            }
          }).append(legend);

          // Form accordion
          $( ".tablist" ).accordion({
            header: ".ama__form-steps__step",
            heightStyle: "content"
          });

          // Expand list
          $( ".ama__expand-list" ).accordion({
            multiple: true,
            icons: false,
            heightStyle: "content",
            collapsible: true,
            active: false,
            animate: 500,
            activate : function (event, ui)
            {
              if($(ui.newPanel).hasClass('ui-accordion-content-active')) {
                $(ui.newPanel).prev().addClass('active');
              } else {
                $(ui.oldPanel).prev().removeClass('active');
              }
            }
          });

          // Collapse all accordion panels
          $('.ama__filter__collapse-panels button').click(function(){
            $('.ama__expand-list .ui-accordion-header').each( function() {
              if($(this).hasClass('ui-state-active') || $(this).hasClass('active')) {
                $(this).click();
              }
            });
          });

          // Open accordion panels for mobile
          $('.ama__applied-filters__show-filters').click(function(){
            $('.ama__expand-list, .ama__applied-filters__tags').slideDown();
            $('.ama__filter__see-results').fadeIn();
            $(this).fadeOut();
          });

          // Close accordion panels
          $('.ama__filter__see-results').click(function(){
            $('.ama__expand-list, .ama__applied-filters__tags').slideUp();
            $('.ama__applied-filters__show-filters').fadeIn();
            $(this).fadeOut();
          });

          // search filter
          function listFilter(input, list) { // header is any element, list is an unordered list
            // custom css expression for a case-insensitive contains()
            jQuery.expr[':'].Contains = function(a,i,m){
              return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
            };

            $(input).change( function () {
                var filter = $(this).val();
                if(filter) {
                  // this finds all links in a list that contain the input,
                  // and hide the ones not containing the input while showing the ones that do
                  $(list).find("span:not(:Contains(" + filter + "))").parent().hide();
                  $(list).find("span:Contains(" + filter + ")").parent().show();
                } else {
                  $(list).find("label").show();
                }
                return false;
                // only show results after 3 characters are entered
              }).keyup( function() {
                if( this.value.length < 4 ) return;
                  $(this).change();
              });
          }

          listFilter($("#ama__search__location"), $(".ama__form-group"));

        });
      })(jQuery);
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.formValidate = {
    attach: function (context, settings) {
      (function ($) {
        $(document).ready(function(){
          $('#test-form').validate({
            rules: {
              textfield: "required",
              dob: "required"
            },
            messages: {
              textfield: "This field is required",
              dob: "Date of birth is required"
            }
          });
        });
      })(jQuery);
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Responsive Tables.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.responsiveGate = {
    attach: function(context, settings) {
      if ($('.ama__gate', context).length) {
        var heightGate = $('.ama__tags').offset().top - $('.ama__gate').offset().top;
        $('.ama__gate', context).height(heightGate);
        $('.ama__gate').nextUntil('.ama__tags').wrapAll('<div class="ama__gate__blurry" />');
      }
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Initialization script for global processes
 */

(function ($, Drupal) {

/**
 *
 * Initialize fitVid for YouTube vieos.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */

	Drupal.behaviors.fitvidinit = {
	 attach: function (context, settings) {
			(function ($) {
				$(document).ready(function(){
					$('.video-container').fitVids();
				});
			})(jQuery);
		}
	};

	Drupal.behaviors.jumpMenu = {
		attach: function (context, settings) {
			$('.js-dropdown-select').on('change', function () {
				window.location = $(this).find(':selected').data('url');
			});
		}
	};

})(jQuery, Drupal);

/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {

  Drupal.behaviors.ribbonnav = {
    attach: function (context, settings) {

      $('.ama__ribbon__dropdown').each(function () {
        var class_active = 'is-active';

        $('.ama__ribbon__dropdown__trigger', this).on('click', function(e) {
          e.stopPropagation();
          // Unfocus on the dropdown.
          $(this).blur();
          // Add our class for CSS.
          $(this).toggleClass(class_active);
          // Add our class to the dropdown UL.
          $(this).children().toggleClass(class_active);
        });

        $(document).click( function(){
          $('.ama__ribbon__dropdown__trigger', this).removeClass(class_active).children().removeClass(class_active)
        });
      })
    }
  }
})(jQuery, Drupal);

/**
 * @file
 * Responsive Tables.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.responsiveTables = {
    attach: function(context, settings) {
      $("th", context).each(function () {
        var eq = $(this).index();
        var child = eq + 1;
        var label = $(this).text();
        $("td:nth-child(" + child + ")").append("&nbsp;").attr("data-title", label).addClass("responsive");
      });
    }
  };
})(jQuery, Drupal);

/*=======Resource Tabs=======*/

$('*[data-resource]').click(function(){
  // Figure out which tab to display.
  $tab = findTab($(this));
  // Show the tab.
  showTab($tab);
});

// function showTab() - shows and hides the tab.
function showTab($tab) {
  $('.--is-active').removeClass('--is-active');
  // Show the section.
  $('.ama__resource-tabs__content section#' + $tab.attr('id')).addClass('--is-active');
  // Put an active state on the tab.
  $('.ama__resource-tabs__nav li[data-resource="' + $tab.attr('id') + '"]').addClass('--is-active');
}

// function findTab() - return object that is the section to be displayed.
function findTab($obj) {
  // Get the ID for the section to display.
  var resourceData =_getSectionID($obj);
  // Find out which tab the sectionID corresponds to.
  $('.ama__resource-tabs section').each(function() {
    var attrID = $(this).attr('id');
    if(attrID.indexOf(resourceData['sectionID']) >= 0) {
      $tab = $(this);
    }
  });
  return $tab;
}

// function _getSectionID() - return array containing the specific resource to show and the section element's ID attribute.
function _getSectionID($obj) {
  // Parse out the section ID from the clicked object.
  var resourceData = [];
  resourceData['resourceID'] = $obj.attr('data-resource');
  resourceData['sectionID'] = resourceData['resourceID']
    .substr(0, resourceData['resourceID'].indexOf('-'));
  if (!resourceData['sectionID']) {
    resourceData['sectionID'] = resourceData['resourceID'];
  }
  return resourceData;
}
/*====== jQuery UI tabs ======*/


(function($) {
    $( ".ama__tabs" ).tabs({
        activate: function (event, ui) {
          window.location.hash = ui.newPanel.attr('id');
          return false;
        }
      });

    //Simulate click event on actual simpleTabs tab from mobile drop down.
    $('.ama__tabs-navigation--mobile select').on( "selectmenuchange", function( event, ui ) {
        var selectedValue = ui.item.value;
        $('a[href="#'+selectedValue+'"]').click();
    } );
})(jQuery);

/**
 * @file
 * Interactions for wayfinder.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.wayfinder = {
    attach: function (context, settings) {
      (function ($) {
        if($.cookie('ama_wayfinder_cookie')) {
          $.cookie.json = true;
          // Read wayfinder cookies set from ama-assn domains
          var ama_wayfinder_cookie = $.cookie('ama_wayfinder_cookie');
          if (typeof ama_wayfinder_cookie !== 'undefined' || $('.referred').length > 0) {
            $('.ama__wayfinder--referrer a').fadeIn().css('display', 'flex');
            $('.ama__wayfinder--referrer a').attr("href", ama_wayfinder_cookie[1]);
            $('.ama__wayfinder--referrer a').text(ama_wayfinder_cookie[0]);
          } else {
            $('.ama_wayfinder_referrer--link-back').fadeOut();
          }
        }
      })(jQuery);
    }
  };
})(jQuery, Drupal);

/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('name')){
          var videoName = 'fitvid' + $.fn.fitVids._count;
          $this.attr('name', videoName);
          $.fn.fitVids._count++;
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };

  // Internal counter for unique video names.
  $.fn.fitVids._count = 0;
})( jQuery );
/*
*	jQueryUI.Accordion.Multiple, v1.0.1
*	(c) 2014–2017 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
*	https://github.com/asleepwalker/jquery-ui.tabs.neighbors.js
*/

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = function (root, jQuery) {
			if (jQuery === undefined) {
				if (typeof window !== 'undefined') {
					jQuery = require('jquery');
				} else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		factory(jQuery);
	}
}(function ($) {

	var originalToggle = $.ui.accordion.prototype._toggle;

	$.extend($.ui.accordion.prototype, {
		multiple: false,
		_toggle: function (data) {
			if (this.options.multiple && data.newPanel.length) {
				data.oldPanel = data.oldHeader = this.prevShow = $('');

				if (this.options.collapsible && data.newPanel.is(':visible')) {
					data.oldPanel = data.newPanel;
					data.newPanel = $('');
				}
			}
			originalToggle.apply(this, arguments);
		}
	});

}));

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

(function($) {
  $.widget("ui.checkList", {
    options: {
      listItems : [],
      selectedItems: [],
      effect: 'blink',
      onChange: {},
      objList: '',
      icount: 0,
    },

    _create: function() {
      var self = this, o = self.options, el = self.element;
      var placeholder = "Search List";

      // generate outer div
      var container = $('<div/>').addClass('search-list');

      // generate toolbar
      var toolbar = $('<div/>').addClass('toolbar');

      var txtfilter = $('<input/>').attr({type:'text', placeholder: placeholder}).addClass('txtFilter').keyup(function(){
        self._filter($(this).val());
      });

      toolbar.append($('<div/>').addClass('filterbox').append(txtfilter));

      // generate list table object
      o.objList = $('<ul role="group" aria-labelledby="checkboxGroup1"/>').addClass('ama__list filter');

      container.append(toolbar);
      container.append(o.objList);
      el.append(container);

      self.loadList();
    },

    _addItem: function(listItem){
      var self = this, o = self.options, el = self.element;

      var itemId = 'itm' + (o.icount++);	// generate item id
      var itm = $('<li role="menuitem" />');
      var chk = $('<input role="checkbox" />').attr('type','checkbox').attr('id',itemId)
        .addClass('chk')
        .attr('data-text',listItem.text)
        .attr('data-value',listItem.value);
      var label = $('<label />').attr('for',itemId).text(listItem.text);

      itm.append(chk, label);
      o.objList.append(itm);

      // bind selection-change
      el.delegate('.chk','click', function(){
        self._selChange();
      });
    },


    loadList: function(){
      var self = this, o = self.options, el = self.element;

      o.objList.empty().hide();

      $.each(o.listItems,function(){
        self._addItem(this);
      });
    },

    _selChange: function(){
      var self = this, o = self.options, el = self.element;

      // empty selection
      o.selectedItems = [];

      // scan elements, find checked ones
      o.objList.find('.chk').each(function(){

        if($(this).prop('checked')){
          o.selectedItems.push({
            text: $(this).attr('data-text'),
            value: $(this).attr('data-value')
          });

          $(this).parent().addClass('highlight').siblings().addClass('highlight');
        } else {
          $(this).parent().removeClass('highlight').siblings().removeClass('highlight');
        }
      });

      // fire onChange event
      o.onChange.call();
    },

    _filter: function(filter){
      var self = this, o = self.options;

      o.objList.find('.chk').each(function(){

        if($(this).attr('data-text').toLowerCase().indexOf(filter.toLowerCase()) > -1)
        {
          $(this).parent().show();
          $(this).parent().parent().hide();
        }
        else{
          $(this).parent().hide();
          $(this).parent().parent().show();
        }
      });
    },


    getSelection: function(){
      var self = this,
        o = self.options
      return o.selectedItems;
    },

    setData: function(dataModel){
      var self = this,
        o = self.options
      o.listItems = dataModel;
      self.loadList();
      self._selChange();
    }
  });
})($);

/*!
 * jQuery Validation Plugin v1.15.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend( $.fn, {

	// http://jqueryvalidation.org/validate/
	validate: function( options ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// Check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.on( "click.validate", ":submit", function( event ) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = event.target;
				}

				// Allow suppressing validation by adding a cancel class to the submit button
				if ( $( this ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			} );

			// Validate the form on submit
			this.on( "submit.validate", function( event ) {
				if ( validator.settings.debug ) {

					// Prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden, result;
					if ( validator.settings.submitHandler ) {
						if ( validator.submitButton ) {

							// Insert a hidden input as a replacement for the missing submit button
							hidden = $( "<input type='hidden'/>" )
								.attr( "name", validator.submitButton.name )
								.val( $( validator.submitButton ).val() )
								.appendTo( validator.currentForm );
						}
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) {

							// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// Prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			} );
		}

		return validator;
	},

	// http://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator, errorList;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			errorList = [];
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
				if ( !valid ) {
					errorList = errorList.concat( validator.errorList );
				}
			} );
			validator.errorList = errorList;
		}
		return valid;
	},

	// http://jqueryvalidation.org/rules/
	rules: function( command, argument ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			return;
		}

		var element = this[ 0 ],
			settings, staticRules, existingRules, data, param, filtered;

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );

				// Remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
					if ( method === "required" ) {
						$( element ).removeAttr( "aria-required" );
					}
				} );
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// Make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
			$( element ).attr( "aria-required", "true" );
		}

		// Make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param } );
		}

		return data;
	}
} );

// Custom selectors
$.extend( $.expr[ ":" ], {

	// http://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},

	// http://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		var val = $( a ).val();
		return val !== null && !!$.trim( "" + val );
	},

	// http://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
} );

// Constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( params === undefined ) {
		return source;
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		} );
	} );
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		pendingClass: "pending",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {

			// Avoid revalidate the field when pressing one of the following keys
			// Shift       => 16
			// Ctrl        => 17
			// Alt         => 18
			// Caps lock   => 20
			// End         => 35
			// Home        => 36
			// Left arrow  => 37
			// Up arrow    => 38
			// Right arrow => 39
			// Down arrow  => 40
			// Insert      => 45
			// Num lock    => 144
			// AltGr key   => 225
			var excludedKeys = [
				16, 17, 18, 20, 35, 36, 37,
				38, 39, 40, 45, 144, 225
			];

			if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
				return;
			} else if ( element.name in this.submitted || element.name in this.invalid ) {
				this.element( element );
			}
		},
		onclick: function( element ) {

			// Click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// Or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date ( ISO ).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				} );
			} );
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			} );

			function delegate( event ) {
				var validator = $.data( this.form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this, event );
				}
			}

			$( this.currentForm )
				.on( "focusin.validate focusout.validate keyup.validate",
					":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
					"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
					"[type='radio'], [type='checkbox'], [contenteditable]", delegate )

				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
			}

			// Add aria-required to any Static/Data/Class required fields before first validation
			// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
			$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
		},

		// http://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend( {}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// http://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				v = this,
				result = true,
				rs, group;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				// If this element is grouped, then validate all group elements already
				// containing a value
				group = this.groups[ checkElement.name ];
				if ( group ) {
					$.each( this.groups, function( name, testgroup ) {
						if ( testgroup === group && name !== checkElement.name ) {
							cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
							if ( cleanElement && cleanElement.name in v.invalid ) {
								v.currentElements.push( cleanElement );
								result = result && v.check( cleanElement );
							}
						}
					} );
				}

				rs = this.check( checkElement ) !== false;
				result = result && rs;
				if ( rs ) {
					this.invalid[ checkElement.name ] = false;
				} else {
					this.invalid[ checkElement.name ] = true;
				}

				if ( !this.numberOfInvalids() ) {

					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();

				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !rs );
			}

			return result;
		},

		// http://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				var validator = this;

				// Add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = $.map( this.errorMap, function( message, name ) {
					return {
						message: message,
						element: validator.findByName( name )[ 0 ]
					};
				} );

				// Remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				} );
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.invalid = {};
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			var elements = this.elements()
				.removeData( "previousValue" )
				.removeAttr( "aria-invalid" );

			this.resetElements( elements );
		},

		resetElements: function( elements ) {
			var i;

			if ( this.settings.unhighlight ) {
				for ( i = 0; elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ],
						this.settings.errorClass, "" );
					this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
				}
			} else {
				elements
					.removeClass( this.settings.errorClass )
					.removeClass( this.settings.validClass );
			}
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {
				if ( obj[ i ] ) {
					count++;
				}
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
					.filter( ":visible" )
					.focus()

					// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {

					// Ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			} ).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// Select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea, [contenteditable]" )
			.not( ":submit, :reset, :image, :disabled" )
			.not( this.settings.ignore )
			.filter( function() {
				var name = this.name || $( this ).attr( "name" ); // For contenteditable
				if ( !name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// Set form expando on contenteditable
				if ( this.hasAttribute( "contenteditable" ) ) {
					this.form = $( this ).closest( "form" )[ 0 ];
				}

				// Select only the first element for each name, and only those with rules specified
				if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ name ] = true;
				return true;
			} );
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		resetInternals: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
		},

		reset: function() {
			this.resetInternals();
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var $element = $( element ),
				type = element.type,
				val, idx;

			if ( type === "radio" || type === "checkbox" ) {
				return this.findByName( element.name ).filter( ":checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? "NaN" : $element.val();
			}

			if ( element.hasAttribute( "contenteditable" ) ) {
				val = $element.text();
			} else {
				val = $element.val();
			}

			if ( type === "file" ) {

				// Modern browser (chrome & safari)
				if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
					return val.substr( 12 );
				}

				// Legacy browsers
				// Unix-based path
				idx = val.lastIndexOf( "/" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Windows-based path
				idx = val.lastIndexOf( "\\" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Just the file name
				return val;
			}

			if ( typeof val === "string" ) {
				return val.replace( /\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				} ).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule;

			// If a normalizer is defined for this element, then
			// call it to retreive the changed value instead
			// of using the real one.
			// Note that `this` in the normalizer is `element`.
			if ( typeof rules.normalizer === "function" ) {
				val = rules.normalizer.call( element, val );

				if ( typeof val !== "string" ) {
					throw new TypeError( "The normalizer should return a string value." );
				}

				// Delete the normalizer from rules to avoid treating
				// it as a pre-defined method.
				delete rules.normalizer;
			}

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {
					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// If a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					if ( e instanceof TypeError ) {
						e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
					}

					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// Return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// Return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ] );
		},

		// Return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++ ) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, rule ) {
			var message = this.findDefined(
					this.customMessage( element.name, rule.method ),
					this.customDataMessage( element, rule.method ),

					// 'title' is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ rule.method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}

			return message;
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule );

			this.errorList.push( {
				message: message,
				element: element,
				method: rule.method
			} );

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map( function() {
				return this.element;
			} );
		},

		showLabel: function( element, message ) {
			var place, group, errorID, v,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );

			if ( error.length ) {

				// Refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// Replace message on existing label
				error.html( message );
			} else {

				// Create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {

					// Make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement( place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {

					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );

					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby
				} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
					errorID = error.attr( "id" );

					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {

						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						v = this;
						$.each( v.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						} );
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.escapeCssMeta( this.idOrName( element ) ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// 'aria-describedby' should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + this.escapeCssMeta( describer )
					.replace( /\s+/g, ", #" );
			}

			return this
				.errors()
				.filter( selector );
		},

		// See https://api.jquery.com/category/selectors/, for CSS
		// meta-characters that should be escaped in order to be used with JQuery
		// as a literal part of a name/id or any selector.
		escapeCssMeta: function( string ) {
			return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				$( element ).addClass( this.settings.pendingClass );
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;

			// Sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			$( element ).removeClass( this.settings.pendingClass );
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();
				this.formSubmitted = false;
			} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				this.formSubmitted = false;
			}
		},

		previousValue: function( element, method ) {
			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, { method: method } )
			} );
		},

		// Cleans up all forms and elements, removes validator-specific events
		destroy: function() {
			this.resetForm();

			$( this.currentForm )
				.off( ".validate" )
				.removeData( "validator" )
				.find( ".validate-equalTo-blur" )
					.off( ".validate-equalTo" )
					.removeClass( "validate-equalTo-blur" );
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ] );
				}
			} );
		}
		return rules;
	},

	normalizeAttributeRule: function( rules, type, method, value ) {

		// Convert the value to a number for number inputs, and for text for backwards compability
		// allows type="date" and others to be compared as strings
		if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
			value = Number( value );

			// Support Opera Mini, which returns NaN for undefined minlength
			if ( isNaN( value ) ) {
				value = undefined;
			}
		}

		if ( value || value === 0 ) {
			rules[ method ] = value;
		} else if ( type === method && type !== "range" ) {

			// Exception: the jquery validate 'range' method
			// does not test for the html5 'range' type
			rules[ method ] = true;
		}
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// Support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );

				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}

				// Force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}

		// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
			this.normalizeAttributeRule( rules, type, method, value );
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {

		// Handle dependency check
		$.each( rules, function( prop, val ) {

			// Ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					$.data( element.form, "validator" ).resetElements( $( element ) );
					delete rules[ prop ];
				}
			}
		} );

		// Evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
		} );

		// Clean number parameters
		$.each( [ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		} );
		$.each( [ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
				}
			}
		} );

		if ( $.validator.autoCreateRanges ) {

			// Auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			} );
			data = transformed;
		}
		return data;
	},

	// http://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.methods/
	methods: {

		// http://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {

			// Check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {

				// Could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return value.length > 0;
		},

		// http://jqueryvalidation.org/email-method/
		email: function( value, element ) {

			// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// http://jqueryvalidation.org/url-method/
		url: function( value, element ) {

			// Copyright (c) 2010-2013 Diego Perini, MIT licensed
			// https://gist.github.com/dperini/729294
			// see also https://mathiasbynens.be/demo/url-regex
			// modified to allow protocol-relative URLs
			return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
		},

		// http://jqueryvalidation.org/date-method/
		date: function( value, element ) {
			return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
		},

		// http://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// http://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// http://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// http://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length >= param;
		},

		// http://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length <= param;
		},

		// http://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// http://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// http://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/step-method/
		step: function( value, element, param ) {
			var type = $( element ).attr( "type" ),
				errorMessage = "Step attribute on input type " + type + " is not supported.",
				supportedTypes = [ "text", "number", "range" ],
				re = new RegExp( "\\b" + type + "\\b" ),
				notSupported = type && !re.test( supportedTypes.join() );

			// Works only for text, number and range input types
			// TODO find a way to support input types date, datetime, datetime-local, month, time and week
			if ( notSupported ) {
				throw new Error( errorMessage );
			}
			return this.optional( element ) || ( value % param === 0 );
		},

		// http://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {

			// Bind to the blur event of the target in order to revalidate whenever the target field is updated
			var target = $( param );
			if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
				target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
					$( element ).valid();
				} );
			}
			return value === target.val();
		},

		// http://jqueryvalidation.org/remote-method/
		remote: function( value, element, param, method ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			method = typeof method === "string" && method || "remote";

			var previous = this.previousValue( element, method ),
				validator, data, optionDataString;

			if ( !this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
			this.settings.messages[ element.name ][ method ] = previous.message;

			param = typeof param === "string" && { url: param } || param;
			optionDataString = $.param( $.extend( { data: value }, param.data ) );
			if ( previous.old === optionDataString ) {
				return previous.valid;
			}

			previous.old = optionDataString;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.resetInternals();
						validator.toHide = validator.errorsFor( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						validator.invalid[ element.name ] = false;
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, { method: method, parameters: value } );
						errors[ element.name ] = previous.message = message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}
	}

} );

// Ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;

// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter( function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = xhr;
		}
	} );
} else {

	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = ajax.apply( this, arguments );
			return pendingRequests[ port ];
		}
		return ajax.apply( this, arguments );
	};
}

}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRydXBhbC1hdHRhY2gtYmVoYXZpb3JzLmpzIiwianF1ZXJ5LmlucHV0bWFzay5idW5kbGUuanMiLCJhY2NvcmRpb24uanMiLCJmb3JtLWl0ZW1zLmpzIiwiZm9ybS12YWxpZGF0ZS5qcyIsImdhdGUuanMiLCJpbml0LmpzIiwibmF2LmpzIiwidGFibGVzLmpzIiwidGFicy5qcyIsIndheWZpbmRlci5qcyIsInZlbmRvci9maXR2aWRzLmpzIiwidmVuZG9yL2pxdWVyeS11aS5hY2NvcmRpb24ubXVsdGlwbGUuanMiLCJ2ZW5kb3IvanF1ZXJ5LmNvb2tpZS5qcyIsInZlbmRvci9qcXVlcnkudWkuY2hlY2tMaXN0LmpzIiwidmVuZG9yL2pxdWVyeS52YWxpZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzd6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBoZWxwZXIgc2NyaXB0IHRoYXQgbWltaWNzIHRoZSBEcnVwYWwgSmF2YXNjcmlwdCBBUEkuXG4gKlxuICogVGhpcyBhbGxvd3MgZm9yIHNjcmlwdHMgdG8gYmUgd3JpdHRlbiBsaWtlIHRoZXkgd291bGQgZm9yIERydXBhbCAoYnlcbiAqIGF0dGFjaGluZyBiZWhhdmlvcnMpIGluIHRoZSBzdHlsZWd1aWRlLiBBcyBhIHJlc3VsdCwgc2NyaXB0cyBmdW5jdGlvblxuICogcHJvcGVybHkgZm9yIHRoZSBzdHlsZWd1aWRlIGFuZCBtYXkgc2ltcGx5IGJlIHN5bWxpbmtlZCB0byB0aGUgL3RoZW1lc1xuICogZGlyZWN0b3J5IGluIERydXBhbC5cbiAqXG4gKiBmcm9tICBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXJuZXQvYnV0bGVyL2Jsb2IvN2MwY2VhNWYwNGJmOWFkMzcyZmJkZmZlNjRjY2ViYzQ3N2IxM2RjNC9TVFlMRUdVSURFX1RFTVBMQVRFL3NvdXJjZS9jb2RlL2xpYnJhcmllcy9kcnVwYWwtYXR0YWNoLWJlaGF2aW9ycy5qc1xuICovXG5cbndpbmRvdy5EcnVwYWwgPSB7YmVoYXZpb3JzOiB7fSwgbG9jYWxlOiB7fX07XG5cbihmdW5jdGlvbiAoJCkge1xuICBEcnVwYWwuYXR0YWNoQmVoYXZpb3JzID0gZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgY29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5ncyB8fCB7fTtcbiAgICB2YXIgYmVoYXZpb3JzID0gRHJ1cGFsLmJlaGF2aW9ycztcbiAgICAvLyBFeGVjdXRlIGFsbCBvZiB0aGVtLlxuICAgIGZvciAodmFyIGkgaW4gYmVoYXZpb3JzKSB7XG4gICAgICBpZiAoYmVoYXZpb3JzLmhhc093blByb3BlcnR5KGkpICYmIHR5cGVvZiBiZWhhdmlvcnNbaV0uYXR0YWNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIERvbid0IHN0b3AgdGhlIGV4ZWN1dGlvbiBvZiBiZWhhdmlvcnMgaW4gY2FzZSBvZiBhbiBlcnJvci5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBiZWhhdmlvcnNbaV0uYXR0YWNoKGNvbnRleHQsIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIEF0dGFjaCBhbGwgYmVoYXZpb3JzLlxuICAkKCdkb2N1bWVudCcpLnJlYWR5KGZ1bmN0aW9uICgpIHsgRHJ1cGFsLmF0dGFjaEJlaGF2aW9ycyhkb2N1bWVudCwge30pOyB9KTtcbn0pKGpRdWVyeSk7XG4iLCIvKiFcbioganF1ZXJ5LmlucHV0bWFzay5idW5kbGUuanNcbiogaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiogQ29weXJpZ2h0IChjKSAyMDEwIC0gMjAxOCBSb2JpbiBIZXJib3RzXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHApXG4qIFZlcnNpb246IDQuMC4wLWJldGEuNTFcbiovXG5cbiFmdW5jdGlvbihtb2R1bGVzKSB7XG4gICAgdmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbiAgICBmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4gICAgICAgIGlmIChpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkgcmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gICAgICAgIHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiAgICAgICAgICAgIGk6IG1vZHVsZUlkLFxuICAgICAgICAgICAgbDogITEsXG4gICAgICAgICAgICBleHBvcnRzOiB7fVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyksIFxuICAgICAgICBtb2R1bGUubCA9ICEwLCBtb2R1bGUuZXhwb3J0cztcbiAgICB9XG4gICAgX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcywgX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcywgX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gICAgICAgIF9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSB8fCBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiAhMSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6ICEwLFxuICAgICAgICAgICAgZ2V0OiBnZXR0ZXJcbiAgICAgICAgfSk7XG4gICAgfSwgX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gICAgICAgIHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgPyBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgfSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIFwiYVwiLCBnZXR0ZXIpLCBnZXR0ZXI7XG4gICAgfSwgX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpO1xuICAgIH0sIF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCIsIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG59KFsgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18sIGZhY3Rvcnk7XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICAgIGZhY3RvcnkgPSBmdW5jdGlvbigkKSB7XG4gICAgICAgIHJldHVybiAkO1xuICAgIH0sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18gPSBbIF9fd2VicGFja19yZXF1aXJlX18oMikgXSwgdm9pZCAwID09PSAoX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIChfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18gPSBmYWN0b3J5KSA/IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXy5hcHBseShleHBvcnRzLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fKSA6IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXykgfHwgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pO1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18sIGZhY3RvcnksIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfSA6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gICAgZmFjdG9yeSA9IGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LCBtb2JpbGUgPSBpc0lucHV0RXZlbnRTdXBwb3J0ZWQoXCJ0b3VjaHN0YXJ0XCIpLCBpZW1vYmlsZSA9IC9pZW1vYmlsZS9pLnRlc3QodWEpLCBpcGhvbmUgPSAvaXBob25lL2kudGVzdCh1YSkgJiYgIWllbW9iaWxlO1xuICAgICAgICBmdW5jdGlvbiBJbnB1dG1hc2soYWxpYXMsIG9wdGlvbnMsIGludGVybmFsKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgSW5wdXRtYXNrKSkgcmV0dXJuIG5ldyBJbnB1dG1hc2soYWxpYXMsIG9wdGlvbnMsIGludGVybmFsKTtcbiAgICAgICAgICAgIHRoaXMuZWwgPSB1bmRlZmluZWQsIHRoaXMuZXZlbnRzID0ge30sIHRoaXMubWFza3NldCA9IHVuZGVmaW5lZCwgdGhpcy5yZWZyZXNoVmFsdWUgPSAhMSwgXG4gICAgICAgICAgICAhMCAhPT0gaW50ZXJuYWwgJiYgKCQuaXNQbGFpbk9iamVjdChhbGlhcykgPyBvcHRpb25zID0gYWxpYXMgOiAob3B0aW9ucyA9IG9wdGlvbnMgfHwge30sIFxuICAgICAgICAgICAgYWxpYXMgJiYgKG9wdGlvbnMuYWxpYXMgPSBhbGlhcykpLCB0aGlzLm9wdHMgPSAkLmV4dGVuZCghMCwge30sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMpLCBcbiAgICAgICAgICAgIHRoaXMubm9NYXNrc0NhY2hlID0gb3B0aW9ucyAmJiBvcHRpb25zLmRlZmluaXRpb25zICE9PSB1bmRlZmluZWQsIHRoaXMudXNlck9wdGlvbnMgPSBvcHRpb25zIHx8IHt9LCBcbiAgICAgICAgICAgIHRoaXMuaXNSVEwgPSB0aGlzLm9wdHMubnVtZXJpY0lucHV0LCByZXNvbHZlQWxpYXModGhpcy5vcHRzLmFsaWFzLCBvcHRpb25zLCB0aGlzLm9wdHMpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlQWxpYXMoYWxpYXNTdHIsIG9wdGlvbnMsIG9wdHMpIHtcbiAgICAgICAgICAgIHZhciBhbGlhc0RlZmluaXRpb24gPSBJbnB1dG1hc2sucHJvdG90eXBlLmFsaWFzZXNbYWxpYXNTdHJdO1xuICAgICAgICAgICAgcmV0dXJuIGFsaWFzRGVmaW5pdGlvbiA/IChhbGlhc0RlZmluaXRpb24uYWxpYXMgJiYgcmVzb2x2ZUFsaWFzKGFsaWFzRGVmaW5pdGlvbi5hbGlhcywgdW5kZWZpbmVkLCBvcHRzKSwgXG4gICAgICAgICAgICAkLmV4dGVuZCghMCwgb3B0cywgYWxpYXNEZWZpbml0aW9uKSwgJC5leHRlbmQoITAsIG9wdHMsIG9wdGlvbnMpLCAhMCkgOiAobnVsbCA9PT0gb3B0cy5tYXNrICYmIChvcHRzLm1hc2sgPSBhbGlhc1N0ciksIFxuICAgICAgICAgICAgITEpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlTWFza1NldChvcHRzLCBub2NhY2hlKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZU1hc2sobWFzaywgbWV0YWRhdGEsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVnZXhNYXNrID0gITE7XG4gICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IG1hc2sgJiYgXCJcIiAhPT0gbWFzayB8fCAoKHJlZ2V4TWFzayA9IG51bGwgIT09IG9wdHMucmVnZXgpID8gbWFzayA9IChtYXNrID0gb3B0cy5yZWdleCkucmVwbGFjZSgvXihcXF4pKC4qKShcXCQpJC8sIFwiJDJcIikgOiAocmVnZXhNYXNrID0gITAsIFxuICAgICAgICAgICAgICAgIG1hc2sgPSBcIi4qXCIpKSwgMSA9PT0gbWFzay5sZW5ndGggJiYgITEgPT09IG9wdHMuZ3JlZWR5ICYmIDAgIT09IG9wdHMucmVwZWF0ICYmIChvcHRzLnBsYWNlaG9sZGVyID0gXCJcIiksIFxuICAgICAgICAgICAgICAgIG9wdHMucmVwZWF0ID4gMCB8fCBcIipcIiA9PT0gb3B0cy5yZXBlYXQgfHwgXCIrXCIgPT09IG9wdHMucmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXBlYXRTdGFydCA9IFwiKlwiID09PSBvcHRzLnJlcGVhdCA/IDAgOiBcIitcIiA9PT0gb3B0cy5yZXBlYXQgPyAxIDogb3B0cy5yZXBlYXQ7XG4gICAgICAgICAgICAgICAgICAgIG1hc2sgPSBvcHRzLmdyb3VwbWFya2VyWzBdICsgbWFzayArIG9wdHMuZ3JvdXBtYXJrZXJbMV0gKyBvcHRzLnF1YW50aWZpZXJtYXJrZXJbMF0gKyByZXBlYXRTdGFydCArIFwiLFwiICsgb3B0cy5yZXBlYXQgKyBvcHRzLnF1YW50aWZpZXJtYXJrZXJbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBtYXNrc2V0RGVmaW5pdGlvbiwgbWFza2RlZktleSA9IHJlZ2V4TWFzayA/IFwicmVnZXhfXCIgKyBvcHRzLnJlZ2V4IDogb3B0cy5udW1lcmljSW5wdXQgPyBtYXNrLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogbWFzaztcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5wdXRtYXNrLnByb3RvdHlwZS5tYXNrc0NhY2hlW21hc2tkZWZLZXldID09PSB1bmRlZmluZWQgfHwgITAgPT09IG5vY2FjaGUgPyAobWFza3NldERlZmluaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IG1hc2ssXG4gICAgICAgICAgICAgICAgICAgIG1hc2tUb2tlbjogSW5wdXRtYXNrLnByb3RvdHlwZS5hbmFseXNlTWFzayhtYXNrLCByZWdleE1hc2ssIG9wdHMpLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZFBvc2l0aW9uczoge30sXG4gICAgICAgICAgICAgICAgICAgIF9idWZmZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIHRlc3RzOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgZXhjbHVkZXM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgIG1hc2tMZW5ndGg6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0sICEwICE9PSBub2NhY2hlICYmIChJbnB1dG1hc2sucHJvdG90eXBlLm1hc2tzQ2FjaGVbbWFza2RlZktleV0gPSBtYXNrc2V0RGVmaW5pdGlvbiwgXG4gICAgICAgICAgICAgICAgbWFza3NldERlZmluaXRpb24gPSAkLmV4dGVuZCghMCwge30sIElucHV0bWFzay5wcm90b3R5cGUubWFza3NDYWNoZVttYXNrZGVmS2V5XSkpKSA6IG1hc2tzZXREZWZpbml0aW9uID0gJC5leHRlbmQoITAsIHt9LCBJbnB1dG1hc2sucHJvdG90eXBlLm1hc2tzQ2FjaGVbbWFza2RlZktleV0pLCBcbiAgICAgICAgICAgICAgICBtYXNrc2V0RGVmaW5pdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24ob3B0cy5tYXNrKSAmJiAob3B0cy5tYXNrID0gb3B0cy5tYXNrKG9wdHMpKSwgJC5pc0FycmF5KG9wdHMubWFzaykpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5tYXNrLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgPT09IG9wdHMua2VlcFN0YXRpYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5rZWVwU3RhdGljID0gXCJhdXRvXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdHMubWFzay5sZW5ndGg7IGkrKykgaWYgKG9wdHMubWFza1tpXS5jaGFyQXQoMCkgIT09IG9wdHMubWFza1swXS5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmtlZXBTdGF0aWMgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgYWx0TWFzayA9IG9wdHMuZ3JvdXBtYXJrZXJbMF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLmVhY2gob3B0cy5pc1JUTCA/IG9wdHMubWFzay5yZXZlcnNlKCkgOiBvcHRzLm1hc2ssIGZ1bmN0aW9uKG5keCwgbXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHRNYXNrLmxlbmd0aCA+IDEgJiYgKGFsdE1hc2sgKz0gb3B0cy5ncm91cG1hcmtlclsxXSArIG9wdHMuYWx0ZXJuYXRvcm1hcmtlciArIG9wdHMuZ3JvdXBtYXJrZXJbMF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zay5tYXNrID09PSB1bmRlZmluZWQgfHwgJC5pc0Z1bmN0aW9uKG1zay5tYXNrKSA/IGFsdE1hc2sgKz0gbXNrIDogYWx0TWFzayArPSBtc2subWFzaztcbiAgICAgICAgICAgICAgICAgICAgfSksIGdlbmVyYXRlTWFzayhhbHRNYXNrICs9IG9wdHMuZ3JvdXBtYXJrZXJbMV0sIG9wdHMubWFzaywgb3B0cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdHMubWFzayA9IG9wdHMubWFzay5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcHRzLm1hc2sgJiYgb3B0cy5tYXNrLm1hc2sgIT09IHVuZGVmaW5lZCAmJiAhJC5pc0Z1bmN0aW9uKG9wdHMubWFzay5tYXNrKSA/IGdlbmVyYXRlTWFzayhvcHRzLm1hc2subWFzaywgb3B0cy5tYXNrLCBvcHRzKSA6IGdlbmVyYXRlTWFzayhvcHRzLm1hc2ssIG9wdHMubWFzaywgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaXNJbnB1dEV2ZW50U3VwcG9ydGVkKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpLCBldk5hbWUgPSBcIm9uXCIgKyBldmVudE5hbWUsIGlzU3VwcG9ydGVkID0gZXZOYW1lIGluIGVsO1xuICAgICAgICAgICAgcmV0dXJuIGlzU3VwcG9ydGVkIHx8IChlbC5zZXRBdHRyaWJ1dGUoZXZOYW1lLCBcInJldHVybjtcIiksIGlzU3VwcG9ydGVkID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBlbFtldk5hbWVdKSwgXG4gICAgICAgICAgICBlbCA9IG51bGwsIGlzU3VwcG9ydGVkO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG1hc2tTY29wZShhY3Rpb25PYmosIG1hc2tzZXQsIG9wdHMpIHtcbiAgICAgICAgICAgIG1hc2tzZXQgPSBtYXNrc2V0IHx8IHRoaXMubWFza3NldCwgb3B0cyA9IG9wdHMgfHwgdGhpcy5vcHRzO1xuICAgICAgICAgICAgdmFyIHVuZG9WYWx1ZSwgJGVsLCBtYXhMZW5ndGgsIGNvbG9yTWFzaywgaW5wdXRtYXNrID0gdGhpcywgZWwgPSB0aGlzLmVsLCBpc1JUTCA9IHRoaXMuaXNSVEwsIHNraXBLZXlQcmVzc0V2ZW50ID0gITEsIHNraXBJbnB1dEV2ZW50ID0gITEsIGlnbm9yYWJsZSA9ICExLCBtb3VzZUVudGVyID0gITEsIHRyYWNrQ2FyZXQgPSAhMTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1hc2tUZW1wbGF0ZShiYXNlT25JbnB1dCwgbWluaW1hbFBvcywgaW5jbHVkZU1vZGUsIG5vSml0LCBjbGVhck9wdGlvbmFsVGFpbCkge1xuICAgICAgICAgICAgICAgIHZhciBncmVlZHkgPSBvcHRzLmdyZWVkeTtcbiAgICAgICAgICAgICAgICBjbGVhck9wdGlvbmFsVGFpbCAmJiAob3B0cy5ncmVlZHkgPSAhMSksIG1pbmltYWxQb3MgPSBtaW5pbWFsUG9zIHx8IDA7XG4gICAgICAgICAgICAgICAgdmFyIG5keEludGx6ciwgdGVzdCwgdGVzdFBvcywgbWFza1RlbXBsYXRlID0gW10sIHBvcyA9IDAsIGx2cCA9IGdldExhc3RWYWxpZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoITAgPT09IGJhc2VPbklucHV0ICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdKSB0ZXN0ID0gKHRlc3RQb3MgPSAhY2xlYXJPcHRpb25hbFRhaWwgfHwgITAgIT09IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdLm1hdGNoLm9wdGlvbmFsaXR5IHx8ICEwICE9PSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXS5nZW5lcmF0ZWRJbnB1dCAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXS5pbnB1dCAhPSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgfHwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3BvcyArIDFdICE9PSB1bmRlZmluZWQgPyBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSA6IGRldGVybWluZVRlc3RUZW1wbGF0ZShwb3MsIGdldFRlc3RzKHBvcywgbmR4SW50bHpyLCBwb3MgLSAxKSkpLm1hdGNoLCBcbiAgICAgICAgICAgICAgICAgICAgbmR4SW50bHpyID0gdGVzdFBvcy5sb2NhdG9yLnNsaWNlKCksIG1hc2tUZW1wbGF0ZS5wdXNoKCEwID09PSBpbmNsdWRlTW9kZSA/IHRlc3RQb3MuaW5wdXQgOiAhMSA9PT0gaW5jbHVkZU1vZGUgPyB0ZXN0Lm5hdGl2ZURlZiA6IGdldFBsYWNlaG9sZGVyKHBvcywgdGVzdCkpOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3QgPSAodGVzdFBvcyA9IGdldFRlc3RUZW1wbGF0ZShwb3MsIG5keEludGx6ciwgcG9zIC0gMSkpLm1hdGNoLCBuZHhJbnRsenIgPSB0ZXN0UG9zLmxvY2F0b3Iuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqaXRNYXNraW5nID0gITAgIT09IG5vSml0ICYmICghMSAhPT0gb3B0cy5qaXRNYXNraW5nID8gb3B0cy5qaXRNYXNraW5nIDogdGVzdC5qaXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgKCExID09PSBqaXRNYXNraW5nIHx8IGppdE1hc2tpbmcgPT09IHVuZGVmaW5lZCB8fCBwb3MgPCBsdnAgfHwgXCJudW1iZXJcIiA9PSB0eXBlb2Ygaml0TWFza2luZyAmJiBpc0Zpbml0ZShqaXRNYXNraW5nKSAmJiBqaXRNYXNraW5nID4gcG9zKSAmJiBtYXNrVGVtcGxhdGUucHVzaCghMSA9PT0gaW5jbHVkZU1vZGUgPyB0ZXN0Lm5hdGl2ZURlZiA6IGdldFBsYWNlaG9sZGVyKHBvcywgdGVzdCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFwiYXV0b1wiID09PSBvcHRzLmtlZXBTdGF0aWMgJiYgdGVzdC5uZXdCbG9ja01hcmtlciAmJiBudWxsICE9PSB0ZXN0LmZuICYmIChvcHRzLmtlZXBTdGF0aWMgPSBwb3MgLSAxKSwgXG4gICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIH0gd2hpbGUgKChtYXhMZW5ndGggPT09IHVuZGVmaW5lZCB8fCBwb3MgPCBtYXhMZW5ndGgpICYmIChudWxsICE9PSB0ZXN0LmZuIHx8IFwiXCIgIT09IHRlc3QuZGVmKSB8fCBtaW5pbWFsUG9zID4gcG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIiA9PT0gbWFza1RlbXBsYXRlW21hc2tUZW1wbGF0ZS5sZW5ndGggLSAxXSAmJiBtYXNrVGVtcGxhdGUucG9wKCksICExID09PSBpbmNsdWRlTW9kZSAmJiBnZXRNYXNrU2V0KCkubWFza0xlbmd0aCAhPT0gdW5kZWZpbmVkIHx8IChnZXRNYXNrU2V0KCkubWFza0xlbmd0aCA9IHBvcyAtIDEpLCBcbiAgICAgICAgICAgICAgICBvcHRzLmdyZWVkeSA9IGdyZWVkeSwgbWFza1RlbXBsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TWFza1NldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFza3NldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc2V0TWFza1NldChzb2Z0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hc2tzZXQgPSBnZXRNYXNrU2V0KCk7XG4gICAgICAgICAgICAgICAgbWFza3NldC5idWZmZXIgPSB1bmRlZmluZWQsICEwICE9PSBzb2Z0ICYmIChtYXNrc2V0LnZhbGlkUG9zaXRpb25zID0ge30sIG1hc2tzZXQucCA9IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TGFzdFZhbGlkUG9zaXRpb24oY2xvc2VzdFRvLCBzdHJpY3QsIHZhbGlkUG9zaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJlZm9yZSA9IC0xLCBhZnRlciA9IC0xLCB2YWxpZHMgPSB2YWxpZFBvc2l0aW9ucyB8fCBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnM7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcG9zTmR4IGluIGNsb3Nlc3RUbyA9PT0gdW5kZWZpbmVkICYmIChjbG9zZXN0VG8gPSAtMSksIHZhbGlkcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHNOZHggPSBwYXJzZUludChwb3NOZHgpO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZHNbcHNOZHhdICYmIChzdHJpY3QgfHwgITAgIT09IHZhbGlkc1twc05keF0uZ2VuZXJhdGVkSW5wdXQpICYmIChwc05keCA8PSBjbG9zZXN0VG8gJiYgKGJlZm9yZSA9IHBzTmR4KSwgXG4gICAgICAgICAgICAgICAgICAgIHBzTmR4ID49IGNsb3Nlc3RUbyAmJiAoYWZ0ZXIgPSBwc05keCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gLTEgPT09IGJlZm9yZSB8fCBiZWZvcmUgPT0gY2xvc2VzdFRvID8gYWZ0ZXIgOiAtMSA9PSBhZnRlciA/IGJlZm9yZSA6IGNsb3Nlc3RUbyAtIGJlZm9yZSA8IGFmdGVyIC0gY2xvc2VzdFRvID8gYmVmb3JlIDogYWZ0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBkZXRlcm1pbmVUZXN0VGVtcGxhdGUocG9zLCB0ZXN0cywgZ3Vlc3NOZXh0QmVzdCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHRlc3RQb3MsIGFsdFRlc3QgPSBnZXRUZXN0KHBvcyA9IHBvcyA+IDAgPyBwb3MgLSAxIDogMCwgdGVzdHMpLCBhbHRBcnIgPSBhbHRUZXN0LmFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQgPyBhbHRUZXN0LmxvY2F0b3JbYWx0VGVzdC5hbHRlcm5hdGlvbl0udG9TdHJpbmcoKS5zcGxpdChcIixcIikgOiBbXSwgbmR4ID0gMDsgbmR4IDwgdGVzdHMubGVuZ3RoICYmICghKCh0ZXN0UG9zID0gdGVzdHNbbmR4XSkubWF0Y2ggJiYgKG9wdHMuZ3JlZWR5ICYmICEwICE9PSB0ZXN0UG9zLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciB8fCAoITEgPT09IHRlc3RQb3MubWF0Y2gub3B0aW9uYWxpdHkgfHwgITEgPT09IHRlc3RQb3MubWF0Y2gubmV3QmxvY2tNYXJrZXIpICYmICEwICE9PSB0ZXN0UG9zLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllcikgJiYgKGFsdFRlc3QuYWx0ZXJuYXRpb24gPT09IHVuZGVmaW5lZCB8fCBhbHRUZXN0LmFsdGVybmF0aW9uICE9PSB0ZXN0UG9zLmFsdGVybmF0aW9uIHx8IHRlc3RQb3MubG9jYXRvclthbHRUZXN0LmFsdGVybmF0aW9uXSAhPT0gdW5kZWZpbmVkICYmIGNoZWNrQWx0ZXJuYXRpb25NYXRjaCh0ZXN0UG9zLmxvY2F0b3JbYWx0VGVzdC5hbHRlcm5hdGlvbl0udG9TdHJpbmcoKS5zcGxpdChcIixcIiksIGFsdEFycikpKSB8fCAhMCA9PT0gZ3Vlc3NOZXh0QmVzdCAmJiAobnVsbCAhPT0gdGVzdFBvcy5tYXRjaC5mbiB8fCAvWzAtOWEtYkEtWl0vLnRlc3QodGVzdFBvcy5tYXRjaC5kZWYpKSk7IG5keCsrKSA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlc3RQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREZWNpc2lvblRha2VyKHRzdCkge1xuICAgICAgICAgICAgICAgIHZhciBkZWNpc2lvblRha2VyID0gdHN0LmxvY2F0b3JbdHN0LmFsdGVybmF0aW9uXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIiA9PSB0eXBlb2YgZGVjaXNpb25UYWtlciAmJiBkZWNpc2lvblRha2VyLmxlbmd0aCA+IDAgJiYgKGRlY2lzaW9uVGFrZXIgPSBkZWNpc2lvblRha2VyLnNwbGl0KFwiLFwiKVswXSksIFxuICAgICAgICAgICAgICAgIGRlY2lzaW9uVGFrZXIgIT09IHVuZGVmaW5lZCA/IGRlY2lzaW9uVGFrZXIudG9TdHJpbmcoKSA6IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRMb2NhdG9yKHRzdCwgYWxpZ24pIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsb2NhdG9yID0gKHRzdC5hbHRlcm5hdGlvbiAhPSB1bmRlZmluZWQgPyB0c3QubWxvY1tnZXREZWNpc2lvblRha2VyKHRzdCldIDogdHN0LmxvY2F0b3IpLmpvaW4oXCJcIik7IGxvY2F0b3IubGVuZ3RoIDwgYWxpZ247ICkgbG9jYXRvciArPSBcIjBcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFRlc3RUZW1wbGF0ZShwb3MsIG5keEludGx6ciwgdHN0UHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10gfHwgZGV0ZXJtaW5lVGVzdFRlbXBsYXRlKHBvcywgZ2V0VGVzdHMocG9zLCBuZHhJbnRsenIgPyBuZHhJbnRsenIuc2xpY2UoKSA6IG5keEludGx6ciwgdHN0UHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFRlc3QocG9zLCB0ZXN0cykge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSA/IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdIDogKHRlc3RzIHx8IGdldFRlc3RzKHBvcykpWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcG9zaXRpb25DYW5NYXRjaERlZmluaXRpb24ocG9zLCBkZWYpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB2YWxpZCA9ICExLCB0ZXN0cyA9IGdldFRlc3RzKHBvcyksIHRuZHggPSAwOyB0bmR4IDwgdGVzdHMubGVuZ3RoOyB0bmR4KyspIGlmICh0ZXN0c1t0bmR4XS5tYXRjaCAmJiB0ZXN0c1t0bmR4XS5tYXRjaC5kZWYgPT09IGRlZikge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9ICEwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VGVzdHMocG9zLCBuZHhJbnRsenIsIHRzdFBzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhdGVzdE1hdGNoLCBtYXNrVG9rZW5zID0gZ2V0TWFza1NldCgpLm1hc2tUb2tlbiwgdGVzdFBvcyA9IG5keEludGx6ciA/IHRzdFBzIDogMCwgbmR4SW5pdGlhbGl6ZXIgPSBuZHhJbnRsenIgPyBuZHhJbnRsenIuc2xpY2UoKSA6IFsgMCBdLCBtYXRjaGVzID0gW10sIGluc2VydFN0b3AgPSAhMSwgY2FjaGVEZXBlbmRlbmN5ID0gbmR4SW50bHpyID8gbmR4SW50bHpyLmpvaW4oXCJcIikgOiBcIlwiO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc29sdmVUZXN0RnJvbVRva2VuKG1hc2tUb2tlbiwgbmR4SW5pdGlhbGl6ZXIsIGxvb3BOZHgsIHF1YW50aWZpZXJSZWN1cnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZU1hdGNoKG1hdGNoLCBsb29wTmR4LCBxdWFudGlmaWVyUmVjdXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gaXNGaXJzdE1hdGNoKGxhdGVzdE1hdGNoLCB0b2tlbkdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0TWF0Y2ggPSAwID09PSAkLmluQXJyYXkobGF0ZXN0TWF0Y2gsIHRva2VuR3JvdXAubWF0Y2hlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpcnN0TWF0Y2ggfHwgJC5lYWNoKHRva2VuR3JvdXAubWF0Y2hlcywgZnVuY3Rpb24obmR4LCBtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgPT09IG1hdGNoLmlzUXVhbnRpZmllciA/IGZpcnN0TWF0Y2ggPSBpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIHRva2VuR3JvdXAubWF0Y2hlc1tuZHggLSAxXSkgOiAhMCA9PT0gbWF0Y2guaXNPcHRpb25hbCA/IGZpcnN0TWF0Y2ggPSBpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIG1hdGNoKSA6ICEwID09PSBtYXRjaC5pc0FsdGVybmF0ZSAmJiAoZmlyc3RNYXRjaCA9IGlzRmlyc3RNYXRjaChsYXRlc3RNYXRjaCwgbWF0Y2gpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TWF0Y2gpIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgZmlyc3RNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc29sdmVOZHhJbml0aWFsaXplcihwb3MsIGFsdGVybmF0ZU5keCwgdGFyZ2V0QWx0ZXJuYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmVzdE1hdGNoLCBpbmRleFBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGdldE1hc2tTZXQoKS50ZXN0c1twb3NdIHx8IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdKSAmJiAkLmVhY2goZ2V0TWFza1NldCgpLnRlc3RzW3Bvc10gfHwgWyBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSBdLCBmdW5jdGlvbihuZHgsIGxtbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxtbnQubWxvY1thbHRlcm5hdGVOZHhdKSByZXR1cm4gYmVzdE1hdGNoID0gbG1udCwgITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHRlcm5hdGlvbiA9IHRhcmdldEFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQgPyB0YXJnZXRBbHRlcm5hdGlvbiA6IGxtbnQuYWx0ZXJuYXRpb24sIG5keFBvcyA9IGxtbnQubG9jYXRvclthbHRlcm5hdGlvbl0gIT09IHVuZGVmaW5lZCA/IGxtbnQubG9jYXRvclthbHRlcm5hdGlvbl0udG9TdHJpbmcoKS5pbmRleE9mKGFsdGVybmF0ZU5keCkgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZGV4UG9zID09PSB1bmRlZmluZWQgfHwgbmR4UG9zIDwgaW5kZXhQb3MpICYmIC0xICE9PSBuZHhQb3MgJiYgKGJlc3RNYXRjaCA9IGxtbnQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleFBvcyA9IG5keFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGJlc3RNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmVzdE1hdGNoQWx0SW5kZXggPSBiZXN0TWF0Y2gubG9jYXRvcltiZXN0TWF0Y2guYWx0ZXJuYXRpb25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGJlc3RNYXRjaC5tbG9jW2FsdGVybmF0ZU5keF0gfHwgYmVzdE1hdGNoLm1sb2NbYmVzdE1hdGNoQWx0SW5kZXhdIHx8IGJlc3RNYXRjaC5sb2NhdG9yKS5zbGljZSgodGFyZ2V0QWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCA/IHRhcmdldEFsdGVybmF0aW9uIDogYmVzdE1hdGNoLmFsdGVybmF0aW9uKSArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0QWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCA/IHJlc29sdmVOZHhJbml0aWFsaXplcihwb3MsIGFsdGVybmF0ZU5keCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBpc1N1YnNldE9mKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZXhwYW5kKHBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgc3RhcnQsIGVuZCwgZXhwYW5kZWQgPSBbXSwgaSA9IDAsIGwgPSBwYXR0ZXJuLmxlbmd0aDsgaSA8IGw7IGkrKykgaWYgKFwiLVwiID09PSBwYXR0ZXJuLmNoYXJBdChpKSkgZm9yIChlbmQgPSBwYXR0ZXJuLmNoYXJDb2RlQXQoaSArIDEpOyArK3N0YXJ0IDwgZW5kOyApIGV4cGFuZGVkLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShzdGFydCkpOyBlbHNlIHN0YXJ0ID0gcGF0dGVybi5jaGFyQ29kZUF0KGkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWQucHVzaChwYXR0ZXJuLmNoYXJBdChpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleHBhbmRlZC5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5yZWdleCAmJiBudWxsICE9PSBzb3VyY2UubWF0Y2guZm4gJiYgbnVsbCAhPT0gdGFyZ2V0Lm1hdGNoLmZuID8gLTEgIT09IGV4cGFuZCh0YXJnZXQubWF0Y2guZGVmLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXCIpKS5pbmRleE9mKGV4cGFuZChzb3VyY2UubWF0Y2guZGVmLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXCIpKSkgOiBzb3VyY2UubWF0Y2guZGVmID09PSB0YXJnZXQubWF0Y2gubmF0aXZlRGVmO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0TWVyZ2VMb2NhdG9ycyh0YXJnZXRNYXRjaCwgYWx0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWx0TWF0Y2ggPT09IHVuZGVmaW5lZCB8fCB0YXJnZXRNYXRjaC5hbHRlcm5hdGlvbiA9PT0gYWx0TWF0Y2guYWx0ZXJuYXRpb24gJiYgLTEgPT09IHRhcmdldE1hdGNoLmxvY2F0b3JbdGFyZ2V0TWF0Y2guYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkuaW5kZXhPZihhbHRNYXRjaC5sb2NhdG9yW2FsdE1hdGNoLmFsdGVybmF0aW9uXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2gubWxvYyA9IHRhcmdldE1hdGNoLm1sb2MgfHwge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2NOZHggPSB0YXJnZXRNYXRjaC5sb2NhdG9yW3RhcmdldE1hdGNoLmFsdGVybmF0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY05keCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgbG9jTmR4ICYmIChsb2NOZHggPSBsb2NOZHguc3BsaXQoXCIsXCIpWzBdKSwgdGFyZ2V0TWF0Y2gubWxvY1tsb2NOZHhdID09PSB1bmRlZmluZWQgJiYgKHRhcmdldE1hdGNoLm1sb2NbbG9jTmR4XSA9IHRhcmdldE1hdGNoLmxvY2F0b3Iuc2xpY2UoKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0TWF0Y2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG5keCBpbiBhbHRNYXRjaC5tbG9jKSBcInN0cmluZ1wiID09IHR5cGVvZiBuZHggJiYgKG5keCA9IG5keC5zcGxpdChcIixcIilbMF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaC5tbG9jW25keF0gPT09IHVuZGVmaW5lZCAmJiAodGFyZ2V0TWF0Y2gubWxvY1tuZHhdID0gYWx0TWF0Y2gubWxvY1tuZHhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaC5sb2NhdG9yW3RhcmdldE1hdGNoLmFsdGVybmF0aW9uXSA9IE9iamVjdC5rZXlzKHRhcmdldE1hdGNoLm1sb2MpLmpvaW4oXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoLmFsdGVybmF0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFBvcyA+IDVlMykgdGhyb3cgXCJJbnB1dG1hc2s6IFRoZXJlIGlzIHByb2JhYmx5IGFuIGVycm9yIGluIHlvdXIgbWFzayBkZWZpbml0aW9uIG9yIGluIHRoZSBjb2RlLiBDcmVhdGUgYW4gaXNzdWUgb24gZ2l0aHViIHdpdGggYW4gZXhhbXBsZSBvZiB0aGUgbWFzayB5b3UgYXJlIHVzaW5nLiBcIiArIGdldE1hc2tTZXQoKS5tYXNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RQb3MgPT09IHBvcyAmJiBtYXRjaC5tYXRjaGVzID09PSB1bmRlZmluZWQpIHJldHVybiBtYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoOiBtYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdG9yOiBsb29wTmR4LnJldmVyc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZDogY2FjaGVEZXBlbmRlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1sb2M6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwgITA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gubWF0Y2hlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoLmlzR3JvdXAgJiYgcXVhbnRpZmllclJlY3Vyc2UgIT09IG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9IGhhbmRsZU1hdGNoKG1hc2tUb2tlbi5tYXRjaGVzWyQuaW5BcnJheShtYXRjaCwgbWFza1Rva2VuLm1hdGNoZXMpICsgMV0sIGxvb3BOZHgpKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaC5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb25hbFRva2VuID0gbWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9IHJlc29sdmVUZXN0RnJvbVRva2VuKG1hdGNoLCBuZHhJbml0aWFsaXplciwgbG9vcE5keCwgcXVhbnRpZmllclJlY3Vyc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGF0ZXN0TWF0Y2ggPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0ubWF0Y2gsIHF1YW50aWZpZXJSZWN1cnNlICE9PSB1bmRlZmluZWQgfHwgIWlzRmlyc3RNYXRjaChsYXRlc3RNYXRjaCwgb3B0aW9uYWxUb2tlbikpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydFN0b3AgPSAhMCwgdGVzdFBvcyA9IHBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2guaXNBbHRlcm5hdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWx0TWF0Y2hlcywgYWx0ZXJuYXRlVG9rZW4gPSBtYXRjaCwgbWFsdGVybmF0ZU1hdGNoZXMgPSBbXSwgY3VycmVudE1hdGNoZXMgPSBtYXRjaGVzLnNsaWNlKCksIGxvb3BOZHhDbnQgPSBsb29wTmR4Lmxlbmd0aCwgYWx0SW5kZXggPSBuZHhJbml0aWFsaXplci5sZW5ndGggPiAwID8gbmR4SW5pdGlhbGl6ZXIuc2hpZnQoKSA6IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgPT09IGFsdEluZGV4IHx8IFwic3RyaW5nXCIgPT0gdHlwZW9mIGFsdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYW1uZHgsIGN1cnJlbnRQb3MgPSB0ZXN0UG9zLCBuZHhJbml0aWFsaXplckNsb25lID0gbmR4SW5pdGlhbGl6ZXIuc2xpY2UoKSwgYWx0SW5kZXhBcnIgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBhbHRJbmRleCkgYWx0SW5kZXhBcnIgPSBhbHRJbmRleC5zcGxpdChcIixcIik7IGVsc2UgZm9yIChhbW5keCA9IDA7IGFtbmR4IDwgYWx0ZXJuYXRlVG9rZW4ubWF0Y2hlcy5sZW5ndGg7IGFtbmR4KyspIGFsdEluZGV4QXJyLnB1c2goYW1uZHgudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW3Bvc10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBhbHRJbmRleEFyckNsb25lID0gYWx0SW5kZXhBcnIuc2xpY2UoKSwgaSA9IDAsIGVsID0gZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW3Bvc10ubGVuZ3RoOyBpIDwgZWw7IGkrKykgYWx0SW5kZXhBcnIuc3BsaWNlKGFsdEluZGV4QXJyLmluZGV4T2YoZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW3Bvc11baV0udG9TdHJpbmcoKSksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgPT09IGFsdEluZGV4QXJyLmxlbmd0aCAmJiAoZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW3Bvc10gPSB1bmRlZmluZWQsIGFsdEluZGV4QXJyID0gYWx0SW5kZXhBcnJDbG9uZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoITAgPT09IG9wdHMua2VlcFN0YXRpYyB8fCBpc0Zpbml0ZShwYXJzZUludChvcHRzLmtlZXBTdGF0aWMpKSAmJiBjdXJyZW50UG9zID49IG9wdHMua2VlcFN0YXRpYykgJiYgKGFsdEluZGV4QXJyID0gYWx0SW5kZXhBcnIuc2xpY2UoMCwgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdW5NYXRjaGVkQWx0ZXJuYXRpb24gPSAhMSwgbmR4ID0gMDsgbmR4IDwgYWx0SW5kZXhBcnIubGVuZ3RoOyBuZHgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtbmR4ID0gcGFyc2VJbnQoYWx0SW5kZXhBcnJbbmR4XSksIG1hdGNoZXMgPSBbXSwgbmR4SW5pdGlhbGl6ZXIgPSBcInN0cmluZ1wiID09IHR5cGVvZiBhbHRJbmRleCAmJiByZXNvbHZlTmR4SW5pdGlhbGl6ZXIodGVzdFBvcywgYW1uZHgsIGxvb3BOZHhDbnQpIHx8IG5keEluaXRpYWxpemVyQ2xvbmUuc2xpY2UoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRlVG9rZW4ubWF0Y2hlc1thbW5keF0gJiYgaGFuZGxlTWF0Y2goYWx0ZXJuYXRlVG9rZW4ubWF0Y2hlc1thbW5keF0sIFsgYW1uZHggXS5jb25jYXQobG9vcE5keCksIHF1YW50aWZpZXJSZWN1cnNlKSA/IG1hdGNoID0gITAgOiAwID09PSBuZHggJiYgKHVuTWF0Y2hlZEFsdGVybmF0aW9uID0gITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWx0TWF0Y2hlcyA9IG1hdGNoZXMuc2xpY2UoKSwgdGVzdFBvcyA9IGN1cnJlbnRQb3MsIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuZHgxID0gMDsgbmR4MSA8IG1hbHRNYXRjaGVzLmxlbmd0aDsgbmR4MSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHRNYXRjaCA9IG1hbHRNYXRjaGVzW25keDFdLCBkcm9wTWF0Y2ggPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0TWF0Y2gubWF0Y2guaml0ID0gYWx0TWF0Y2gubWF0Y2guaml0IHx8IHVuTWF0Y2hlZEFsdGVybmF0aW9uLCBhbHRNYXRjaC5hbHRlcm5hdGlvbiA9IGFsdE1hdGNoLmFsdGVybmF0aW9uIHx8IGxvb3BOZHhDbnQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXJnZUxvY2F0b3JzKGFsdE1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbmR4MiA9IDA7IG5keDIgPCBtYWx0ZXJuYXRlTWF0Y2hlcy5sZW5ndGg7IG5keDIrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsdE1hdGNoMiA9IG1hbHRlcm5hdGVNYXRjaGVzW25keDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgIT0gdHlwZW9mIGFsdEluZGV4IHx8IGFsdE1hdGNoLmFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQgJiYgLTEgIT09ICQuaW5BcnJheShhbHRNYXRjaC5sb2NhdG9yW2FsdE1hdGNoLmFsdGVybmF0aW9uXS50b1N0cmluZygpLCBhbHRJbmRleEFycikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWx0TWF0Y2gubWF0Y2gubmF0aXZlRGVmID09PSBhbHRNYXRjaDIubWF0Y2gubmF0aXZlRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BNYXRjaCA9ICEwLCBzZXRNZXJnZUxvY2F0b3JzKGFsdE1hdGNoMiwgYWx0TWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3Vic2V0T2YoYWx0TWF0Y2gsIGFsdE1hdGNoMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVyZ2VMb2NhdG9ycyhhbHRNYXRjaCwgYWx0TWF0Y2gyKSAmJiAoZHJvcE1hdGNoID0gITAsIG1hbHRlcm5hdGVNYXRjaGVzLnNwbGljZShtYWx0ZXJuYXRlTWF0Y2hlcy5pbmRleE9mKGFsdE1hdGNoMiksIDAsIGFsdE1hdGNoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNTdWJzZXRPZihhbHRNYXRjaDIsIGFsdE1hdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXJnZUxvY2F0b3JzKGFsdE1hdGNoMiwgYWx0TWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9IGFsdE1hdGNoMiwgbnVsbCA9PT0gKHNvdXJjZSA9IGFsdE1hdGNoKS5tYXRjaC5mbiAmJiBudWxsICE9PSB0YXJnZXQubWF0Y2guZm4gJiYgdGFyZ2V0Lm1hdGNoLmZuLnRlc3Qoc291cmNlLm1hdGNoLmRlZiwgZ2V0TWFza1NldCgpLCBwb3MsICExLCBvcHRzLCAhMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVyZ2VMb2NhdG9ycyhhbHRNYXRjaCwgYWx0TWF0Y2gyKSAmJiAoZHJvcE1hdGNoID0gITAsIG1hbHRlcm5hdGVNYXRjaGVzLnNwbGljZShtYWx0ZXJuYXRlTWF0Y2hlcy5pbmRleE9mKGFsdE1hdGNoMiksIDAsIGFsdE1hdGNoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wTWF0Y2ggfHwgbWFsdGVybmF0ZU1hdGNoZXMucHVzaChhbHRNYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IGN1cnJlbnRNYXRjaGVzLmNvbmNhdChtYWx0ZXJuYXRlTWF0Y2hlcyksIHRlc3RQb3MgPSBwb3MsIGluc2VydFN0b3AgPSBtYXRjaGVzLmxlbmd0aCA+IDAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBtYWx0ZXJuYXRlTWF0Y2hlcy5sZW5ndGggPiAwLCBuZHhJbml0aWFsaXplciA9IG5keEluaXRpYWxpemVyQ2xvbmUuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIG1hdGNoID0gaGFuZGxlTWF0Y2goYWx0ZXJuYXRlVG9rZW4ubWF0Y2hlc1thbHRJbmRleF0gfHwgbWFza1Rva2VuLm1hdGNoZXNbYWx0SW5kZXhdLCBbIGFsdEluZGV4IF0uY29uY2F0KGxvb3BOZHgpLCBxdWFudGlmaWVyUmVjdXJzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2guaXNRdWFudGlmaWVyICYmIHF1YW50aWZpZXJSZWN1cnNlICE9PSBtYXNrVG9rZW4ubWF0Y2hlc1skLmluQXJyYXkobWF0Y2gsIG1hc2tUb2tlbi5tYXRjaGVzKSAtIDFdKSBmb3IgKHZhciBxdCA9IG1hdGNoLCBxbmR4ID0gbmR4SW5pdGlhbGl6ZXIubGVuZ3RoID4gMCA/IG5keEluaXRpYWxpemVyLnNoaWZ0KCkgOiAwOyBxbmR4IDwgKGlzTmFOKHF0LnF1YW50aWZpZXIubWF4KSA/IHFuZHggKyAxIDogcXQucXVhbnRpZmllci5tYXgpICYmIHRlc3RQb3MgPD0gcG9zOyBxbmR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuR3JvdXAgPSBtYXNrVG9rZW4ubWF0Y2hlc1skLmluQXJyYXkocXQsIG1hc2tUb2tlbi5tYXRjaGVzKSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSBoYW5kbGVNYXRjaCh0b2tlbkdyb3VwLCBbIHFuZHggXS5jb25jYXQobG9vcE5keCksIHRva2VuR3JvdXApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxhdGVzdE1hdGNoID0gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdLm1hdGNoKS5vcHRpb25hbFF1YW50aWZpZXIgPSBxbmR4ID4gcXQucXVhbnRpZmllci5taW4gLSAxLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVzdE1hdGNoLmppdCA9IHFuZHggKyB0b2tlbkdyb3VwLm1hdGNoZXMuaW5kZXhPZihsYXRlc3RNYXRjaCkgPj0gcXQucXVhbnRpZmllci5qaXQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGaXJzdE1hdGNoKGxhdGVzdE1hdGNoLCB0b2tlbkdyb3VwKSAmJiBxbmR4ID4gcXQucXVhbnRpZmllci5taW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0U3RvcCA9ICEwLCB0ZXN0UG9zID0gcG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF0LnF1YW50aWZpZXIuaml0ICE9PSB1bmRlZmluZWQgJiYgaXNOYU4ocXQucXVhbnRpZmllci5tYXgpICYmIGxhdGVzdE1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zIC0gMV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMucG9wKCksIGluc2VydFN0b3AgPSAhMCwgdGVzdFBvcyA9IHBvcywgY2FjaGVEZXBlbmRlbmN5ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaCA9IHJlc29sdmVUZXN0RnJvbVRva2VuKG1hdGNoLCBuZHhJbml0aWFsaXplciwgbG9vcE5keCwgcXVhbnRpZmllclJlY3Vyc2UpKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgdGVzdFBvcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZSwgdGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHRuZHggPSBuZHhJbml0aWFsaXplci5sZW5ndGggPiAwID8gbmR4SW5pdGlhbGl6ZXIuc2hpZnQoKSA6IDA7IHRuZHggPCBtYXNrVG9rZW4ubWF0Y2hlcy5sZW5ndGg7IHRuZHgrKykgaWYgKCEwICE9PSBtYXNrVG9rZW4ubWF0Y2hlc1t0bmR4XS5pc1F1YW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IGhhbmRsZU1hdGNoKG1hc2tUb2tlbi5tYXRjaGVzW3RuZHhdLCBbIHRuZHggXS5jb25jYXQobG9vcE5keCksIHF1YW50aWZpZXJSZWN1cnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCAmJiB0ZXN0UG9zID09PSBwb3MpIHJldHVybiBtYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UG9zID4gcG9zKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocG9zID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5keEludGx6ciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0ZXN0LCBwcmV2aW91c1BvcyA9IHBvcyAtIDE7ICh0ZXN0ID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3ByZXZpb3VzUG9zXSB8fCBnZXRNYXNrU2V0KCkudGVzdHNbcHJldmlvdXNQb3NdKSA9PT0gdW5kZWZpbmVkICYmIHByZXZpb3VzUG9zID4gLTE7ICkgcHJldmlvdXNQb3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3QgIT09IHVuZGVmaW5lZCAmJiBwcmV2aW91c1BvcyA+IC0xICYmIChuZHhJbml0aWFsaXplciA9IGZ1bmN0aW9uKHBvcywgdGVzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG9jYXRvciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLmlzQXJyYXkodGVzdHMpIHx8ICh0ZXN0cyA9IFsgdGVzdHMgXSksIHRlc3RzLmxlbmd0aCA+IDAgJiYgKHRlc3RzWzBdLmFsdGVybmF0aW9uID09PSB1bmRlZmluZWQgPyAwID09PSAobG9jYXRvciA9IGRldGVybWluZVRlc3RUZW1wbGF0ZShwb3MsIHRlc3RzLnNsaWNlKCkpLmxvY2F0b3Iuc2xpY2UoKSkubGVuZ3RoICYmIChsb2NhdG9yID0gdGVzdHNbMF0ubG9jYXRvci5zbGljZSgpKSA6ICQuZWFjaCh0ZXN0cywgZnVuY3Rpb24obmR4LCB0c3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgIT09IHRzdC5kZWYpIGlmICgwID09PSBsb2NhdG9yLmxlbmd0aCkgbG9jYXRvciA9IHRzdC5sb2NhdG9yLnNsaWNlKCk7IGVsc2UgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdG9yLmxlbmd0aDsgaSsrKSB0c3QubG9jYXRvcltpXSAmJiAtMSA9PT0gbG9jYXRvcltpXS50b1N0cmluZygpLmluZGV4T2YodHN0LmxvY2F0b3JbaV0pICYmIChsb2NhdG9yW2ldICs9IFwiLFwiICsgdHN0LmxvY2F0b3JbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSwgbG9jYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0ocHJldmlvdXNQb3MsIHRlc3QpLCBjYWNoZURlcGVuZGVuY3kgPSBuZHhJbml0aWFsaXplci5qb2luKFwiXCIpLCB0ZXN0UG9zID0gcHJldmlvdXNQb3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChnZXRNYXNrU2V0KCkudGVzdHNbcG9zXSAmJiBnZXRNYXNrU2V0KCkudGVzdHNbcG9zXVswXS5jZCA9PT0gY2FjaGVEZXBlbmRlbmN5KSByZXR1cm4gZ2V0TWFza1NldCgpLnRlc3RzW3Bvc107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG10bmR4ID0gbmR4SW5pdGlhbGl6ZXIuc2hpZnQoKTsgbXRuZHggPCBtYXNrVG9rZW5zLmxlbmd0aDsgbXRuZHgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc29sdmVUZXN0RnJvbVRva2VuKG1hc2tUb2tlbnNbbXRuZHhdLCBuZHhJbml0aWFsaXplciwgWyBtdG5keCBdKSAmJiB0ZXN0UG9zID09PSBwb3MgfHwgdGVzdFBvcyA+IHBvcykgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwID09PSBtYXRjaGVzLmxlbmd0aCB8fCBpbnNlcnRTdG9wKSAmJiBtYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBtYXRjaDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbGl0eTogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWY6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsb2NhdG9yOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgbWxvYzoge30sXG4gICAgICAgICAgICAgICAgICAgIGNkOiBjYWNoZURlcGVuZGVuY3lcbiAgICAgICAgICAgICAgICB9KSwgbmR4SW50bHpyICE9PSB1bmRlZmluZWQgJiYgZ2V0TWFza1NldCgpLnRlc3RzW3Bvc10gPyAkLmV4dGVuZCghMCwgW10sIG1hdGNoZXMpIDogKGdldE1hc2tTZXQoKS50ZXN0c1twb3NdID0gJC5leHRlbmQoITAsIFtdLCBtYXRjaGVzKSwgXG4gICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLnRlc3RzW3Bvc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QnVmZmVyVGVtcGxhdGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldE1hc2tTZXQoKS5fYnVmZmVyID09PSB1bmRlZmluZWQgJiYgKGdldE1hc2tTZXQoKS5fYnVmZmVyID0gZ2V0TWFza1RlbXBsYXRlKCExLCAxKSwgXG4gICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLmJ1ZmZlciA9PT0gdW5kZWZpbmVkICYmIChnZXRNYXNrU2V0KCkuYnVmZmVyID0gZ2V0TWFza1NldCgpLl9idWZmZXIuc2xpY2UoKSkpLCBcbiAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkuX2J1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEJ1ZmZlcihub0NhY2hlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldE1hc2tTZXQoKS5idWZmZXIgIT09IHVuZGVmaW5lZCAmJiAhMCAhPT0gbm9DYWNoZSB8fCAoZ2V0TWFza1NldCgpLmJ1ZmZlciA9IGdldE1hc2tUZW1wbGF0ZSghMCwgZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSwgITApKSwgXG4gICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLmJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlZnJlc2hGcm9tQnVmZmVyKHN0YXJ0LCBlbmQsIGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIHZhciBpLCBwO1xuICAgICAgICAgICAgICAgIGlmICghMCA9PT0gc3RhcnQpIHJlc2V0TWFza1NldCgpLCBzdGFydCA9IDAsIGVuZCA9IGJ1ZmZlci5sZW5ndGg7IGVsc2UgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykgZGVsZXRlIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICBmb3IgKHAgPSBzdGFydCwgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIGlmIChyZXNldE1hc2tTZXQoITApLCBidWZmZXJbaV0gIT09IG9wdHMuc2tpcE9wdGlvbmFsUGFydENoYXJhY3Rlcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsUmVzdWx0ID0gaXNWYWxpZChwLCBidWZmZXJbaV0sICEwLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICExICE9PSB2YWxSZXN1bHQgJiYgKHJlc2V0TWFza1NldCghMCksIHAgPSB2YWxSZXN1bHQuY2FyZXQgIT09IHVuZGVmaW5lZCA/IHZhbFJlc3VsdC5jYXJldCA6IHZhbFJlc3VsdC5wb3MgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja0FsdGVybmF0aW9uTWF0Y2goYWx0QXJyMSwgYWx0QXJyMiwgbmEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuYU5keCwgYWx0QXJyQyA9IG9wdHMuZ3JlZWR5ID8gYWx0QXJyMiA6IGFsdEFycjIuc2xpY2UoMCwgMSksIGlzTWF0Y2ggPSAhMSwgbmFBcnIgPSBuYSAhPT0gdW5kZWZpbmVkID8gbmEuc3BsaXQoXCIsXCIpIDogW10sIGkgPSAwOyBpIDwgbmFBcnIubGVuZ3RoOyBpKyspIC0xICE9PSAobmFOZHggPSBhbHRBcnIxLmluZGV4T2YobmFBcnJbaV0pKSAmJiBhbHRBcnIxLnNwbGljZShuYU5keCwgMSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYWxuZHggPSAwOyBhbG5keCA8IGFsdEFycjEubGVuZ3RoOyBhbG5keCsrKSBpZiAoLTEgIT09ICQuaW5BcnJheShhbHRBcnIxW2FsbmR4XSwgYWx0QXJyQykpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNNYXRjaCA9ICEwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzTWF0Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBhbHRlcm5hdGUocG9zLCBjLCBzdHJpY3QsIGZyb21TZXRWYWxpZCwgckFsdFBvcykge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0QWx0LCBhbHRlcm5hdGlvbiwgYWx0UG9zLCBwcmV2QWx0UG9zLCBpLCB2YWxpZFBvcywgZGVjaXNpb25Qb3MsIHZhbGlkUHNDbG9uZSA9ICQuZXh0ZW5kKCEwLCB7fSwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zKSwgaXNWYWxpZFJzbHQgPSAhMSwgbEFsdFBvcyA9IHJBbHRQb3MgIT09IHVuZGVmaW5lZCA/IHJBbHRQb3MgOiBnZXRMYXN0VmFsaWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICgtMSA9PT0gbEFsdFBvcyAmJiByQWx0UG9zID09PSB1bmRlZmluZWQpIGFsdGVybmF0aW9uID0gKHByZXZBbHRQb3MgPSBnZXRUZXN0KGxhc3RBbHQgPSAwKSkuYWx0ZXJuYXRpb247IGVsc2UgZm9yICg7bEFsdFBvcyA+PSAwOyBsQWx0UG9zLS0pIGlmICgoYWx0UG9zID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2xBbHRQb3NdKSAmJiBhbHRQb3MuYWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldkFsdFBvcyAmJiBwcmV2QWx0UG9zLmxvY2F0b3JbYWx0UG9zLmFsdGVybmF0aW9uXSAhPT0gYWx0UG9zLmxvY2F0b3JbYWx0UG9zLmFsdGVybmF0aW9uXSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RBbHQgPSBsQWx0UG9zLCBhbHRlcm5hdGlvbiA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tsYXN0QWx0XS5hbHRlcm5hdGlvbiwgXG4gICAgICAgICAgICAgICAgICAgIHByZXZBbHRQb3MgPSBhbHRQb3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhbHRlcm5hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY2lzaW9uUG9zID0gcGFyc2VJbnQobGFzdEFsdCksIGdldE1hc2tTZXQoKS5leGNsdWRlc1tkZWNpc2lvblBvc10gPSBnZXRNYXNrU2V0KCkuZXhjbHVkZXNbZGVjaXNpb25Qb3NdIHx8IFtdLCBcbiAgICAgICAgICAgICAgICAgICAgITAgIT09IHBvcyAmJiBnZXRNYXNrU2V0KCkuZXhjbHVkZXNbZGVjaXNpb25Qb3NdLnB1c2goZ2V0RGVjaXNpb25UYWtlcihwcmV2QWx0UG9zKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWxpZElucHV0c0Nsb25lID0gW10sIHN0YXRpY0lucHV0c0JlZm9yZVBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IGRlY2lzaW9uUG9zOyBpIDwgZ2V0TGFzdFZhbGlkUG9zaXRpb24odW5kZWZpbmVkLCAhMCkgKyAxOyBpKyspICh2YWxpZFBvcyA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXSkgJiYgITAgIT09IHZhbGlkUG9zLmdlbmVyYXRlZElucHV0ID8gdmFsaWRJbnB1dHNDbG9uZS5wdXNoKHZhbGlkUG9zLmlucHV0KSA6IGkgPCBwb3MgJiYgc3RhdGljSW5wdXRzQmVmb3JlUG9zKyssIFxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDtnZXRNYXNrU2V0KCkuZXhjbHVkZXNbZGVjaXNpb25Qb3NdICYmIGdldE1hc2tTZXQoKS5leGNsdWRlc1tkZWNpc2lvblBvc10ubGVuZ3RoIDwgMTA7ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc09mZnNldCA9IC0xICogc3RhdGljSW5wdXRzQmVmb3JlUG9zLCB2YWxpZElucHV0cyA9IHZhbGlkSW5wdXRzQ2xvbmUuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoZ2V0TWFza1NldCgpLnRlc3RzW2RlY2lzaW9uUG9zXSA9IHVuZGVmaW5lZCwgcmVzZXRNYXNrU2V0KCEwKSwgaXNWYWxpZFJzbHQgPSAhMDsgdmFsaWRJbnB1dHMubGVuZ3RoID4gMDsgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdmFsaWRJbnB1dHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpc1ZhbGlkUnNsdCA9IGlzVmFsaWQoZ2V0TGFzdFZhbGlkUG9zaXRpb24odW5kZWZpbmVkLCAhMCkgKyAxLCBpbnB1dCwgITEsIGZyb21TZXRWYWxpZCwgITApKSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZFJzbHQgJiYgYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldEx2cCA9IGdldExhc3RWYWxpZFBvc2l0aW9uKHBvcykgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IGRlY2lzaW9uUG9zOyBpIDwgZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSArIDE7IGkrKykgKCh2YWxpZFBvcyA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXSkgPT09IHVuZGVmaW5lZCB8fCBudWxsID09IHZhbGlkUG9zLm1hdGNoLmZuKSAmJiBpIDwgcG9zICsgcG9zT2Zmc2V0ICYmIHBvc09mZnNldCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWRSc2x0ID0gaXNWYWxpZCgocG9zICs9IHBvc09mZnNldCkgPiB0YXJnZXRMdnAgPyB0YXJnZXRMdnAgOiBwb3MsIGMsIHN0cmljdCwgZnJvbVNldFZhbGlkLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZFJzbHQpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc2V0TWFza1NldCgpLCBwcmV2QWx0UG9zID0gZ2V0VGVzdChkZWNpc2lvblBvcyksIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucyA9ICQuZXh0ZW5kKCEwLCB7fSwgdmFsaWRQc0Nsb25lKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAhZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWRSc2x0ID0gYWx0ZXJuYXRlKHBvcywgYywgc3RyaWN0LCBmcm9tU2V0VmFsaWQsIGRlY2lzaW9uUG9zIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVjaXNpb25UYWtlciA9IGdldERlY2lzaW9uVGFrZXIocHJldkFsdFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgIT09IGdldE1hc2tTZXQoKS5leGNsdWRlc1tkZWNpc2lvblBvc10uaW5kZXhPZihkZWNpc2lvblRha2VyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWRSc2x0ID0gYWx0ZXJuYXRlKHBvcywgYywgc3RyaWN0LCBmcm9tU2V0VmFsaWQsIGRlY2lzaW9uUG9zIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGdldE1hc2tTZXQoKS5leGNsdWRlc1tkZWNpc2lvblBvc10ucHVzaChkZWNpc2lvblRha2VyKSwgaSA9IGRlY2lzaW9uUG9zOyBpIDwgZ2V0TGFzdFZhbGlkUG9zaXRpb24odW5kZWZpbmVkLCAhMCkgKyAxOyBpKyspIGRlbGV0ZSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldE1hc2tTZXQoKS5leGNsdWRlc1tkZWNpc2lvblBvc10gPSB1bmRlZmluZWQsIGlzVmFsaWRSc2x0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaXNWYWxpZChwb3MsIGMsIHN0cmljdCwgZnJvbVNldFZhbGlkLCBmcm9tQWx0ZXJuYXRlLCB2YWxpZGF0ZU9ubHkpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpc1NlbGVjdGlvbihwb3NPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzUlRMID8gcG9zT2JqLmJlZ2luIC0gcG9zT2JqLmVuZCA+IDEgfHwgcG9zT2JqLmJlZ2luIC0gcG9zT2JqLmVuZCA9PSAxIDogcG9zT2JqLmVuZCAtIHBvc09iai5iZWdpbiA+IDEgfHwgcG9zT2JqLmVuZCAtIHBvc09iai5iZWdpbiA9PSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHJpY3QgPSAhMCA9PT0gc3RyaWN0O1xuICAgICAgICAgICAgICAgIHZhciBtYXNrUG9zID0gcG9zO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIF9pc1ZhbGlkKHBvc2l0aW9uLCBjLCBzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJzbHQgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuZWFjaChnZXRUZXN0cyhwb3NpdGlvbiksIGZ1bmN0aW9uKG5keCwgdHN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IHRzdC5tYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRCdWZmZXIoITApLCAhMSAhPT0gKHJzbHQgPSBudWxsICE9IHRlc3QuZm4gPyB0ZXN0LmZuLnRlc3QoYywgZ2V0TWFza1NldCgpLCBwb3NpdGlvbiwgc3RyaWN0LCBvcHRzLCBpc1NlbGVjdGlvbihwb3MpKSA6IChjID09PSB0ZXN0LmRlZiB8fCBjID09PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpICYmIFwiXCIgIT09IHRlc3QuZGVmICYmIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOiBnZXRQbGFjZWhvbGRlcihwb3NpdGlvbiwgdGVzdCwgITApIHx8IHRlc3QuZGVmLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0gPSByc2x0LmMgIT09IHVuZGVmaW5lZCA/IHJzbHQuYyA6IGMsIHZhbGlkYXRlZFBvcyA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtID0gZWxlbSA9PT0gb3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyICYmIG51bGwgPT09IHRlc3QuZm4gPyBnZXRQbGFjZWhvbGRlcihwb3NpdGlvbiwgdGVzdCwgITApIHx8IHRlc3QuZGVmIDogZWxlbSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNsdC5yZW1vdmUgIT09IHVuZGVmaW5lZCAmJiAoJC5pc0FycmF5KHJzbHQucmVtb3ZlKSB8fCAocnNsdC5yZW1vdmUgPSBbIHJzbHQucmVtb3ZlIF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gocnNsdC5yZW1vdmUuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiIC0gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgZnVuY3Rpb24obmR4LCBsbW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGVNYXNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBsbW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBsbW50ICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksIHJzbHQuaW5zZXJ0ICE9PSB1bmRlZmluZWQgJiYgKCQuaXNBcnJheShyc2x0Lmluc2VydCkgfHwgKHJzbHQuaW5zZXJ0ID0gWyByc2x0Lmluc2VydCBdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJzbHQuaW5zZXJ0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGZ1bmN0aW9uKG5keCwgbG1udCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkKGxtbnQucG9zLCBsbW50LmMsICEwLCBmcm9tU2V0VmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSwgITAgIT09IHJzbHQgJiYgcnNsdC5wb3MgIT09IHVuZGVmaW5lZCAmJiByc2x0LnBvcyAhPT0gcG9zaXRpb24gJiYgKHZhbGlkYXRlZFBvcyA9IHJzbHQucG9zKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgITAgIT09IHJzbHQgJiYgcnNsdC5wb3MgPT09IHVuZGVmaW5lZCAmJiByc2x0LmMgPT09IHVuZGVmaW5lZCA/ICExIDogKHJldmFsaWRhdGVNYXNrKHBvcywgJC5leHRlbmQoe30sIHRzdCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oZWxlbSwgdGVzdCwgcG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wdHMuY2FzaW5nIHx8IHRlc3QuY2FzaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cHBlclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxvd2VyXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGl0bGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zQmVmb3JlID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3BvcyAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSAwID09PSBwb3MgfHwgcG9zQmVmb3JlICYmIHBvc0JlZm9yZS5pbnB1dCA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZShJbnB1dG1hc2sua2V5Q29kZS5TUEFDRSkgPyBlbGVtLnRvVXBwZXJDYXNlKCkgOiBlbGVtLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9wdHMuY2FzaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnMpLCBlbGVtID0gb3B0cy5jYXNpbmcuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oZWxlbSwgdGVzdCwgdmFsaWRhdGVkUG9zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBmcm9tU2V0VmFsaWQsIHZhbGlkYXRlZFBvcykgfHwgKHJzbHQgPSAhMSksICExKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSksIHJzbHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcy5iZWdpbiAhPT0gdW5kZWZpbmVkICYmIChtYXNrUG9zID0gaXNSVEwgPyBwb3MuZW5kIDogcG9zLmJlZ2luKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gITAsIHBvc2l0aW9uc0Nsb25lID0gJC5leHRlbmQoITAsIHt9LCBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnMpO1xuICAgICAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24ob3B0cy5wcmVWYWxpZGF0aW9uKSAmJiAhc3RyaWN0ICYmICEwICE9PSBmcm9tU2V0VmFsaWQgJiYgITAgIT09IHZhbGlkYXRlT25seSAmJiAocmVzdWx0ID0gb3B0cy5wcmVWYWxpZGF0aW9uKGdldEJ1ZmZlcigpLCBtYXNrUG9zLCBjLCBpc1NlbGVjdGlvbihwb3MpLCBvcHRzLCBnZXRNYXNrU2V0KCkpKSwgXG4gICAgICAgICAgICAgICAgITAgPT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2tiYWNrUG9zaXRpb25zKHVuZGVmaW5lZCwgbWFza1BvcywgITApLCAobWF4TGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbWFza1BvcyA8IG1heExlbmd0aCkgJiYgKHJlc3VsdCA9IF9pc1ZhbGlkKG1hc2tQb3MsIGMsIHN0cmljdCksIFxuICAgICAgICAgICAgICAgICAgICAoIXN0cmljdCB8fCAhMCA9PT0gZnJvbVNldFZhbGlkKSAmJiAhMSA9PT0gcmVzdWx0ICYmICEwICE9PSB2YWxpZGF0ZU9ubHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFBvc1ZhbGlkID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW21hc2tQb3NdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50UG9zVmFsaWQgfHwgbnVsbCAhPT0gY3VycmVudFBvc1ZhbGlkLm1hdGNoLmZuIHx8IGN1cnJlbnRQb3NWYWxpZC5tYXRjaC5kZWYgIT09IGMgJiYgYyAhPT0gb3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChvcHRzLmluc2VydE1vZGUgfHwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3NlZWtOZXh0KG1hc2tQb3MpXSA9PT0gdW5kZWZpbmVkKSAmJiAhaXNNYXNrKG1hc2tQb3MsICEwKSkgZm9yICh2YXIgblBvcyA9IG1hc2tQb3MgKyAxLCBzblBvcyA9IHNlZWtOZXh0KG1hc2tQb3MpOyBuUG9zIDw9IHNuUG9zOyBuUG9zKyspIGlmICghMSAhPT0gKHJlc3VsdCA9IF9pc1ZhbGlkKG5Qb3MsIGMsIHN0cmljdCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyYWNrYmFja1Bvc2l0aW9ucyhtYXNrUG9zLCByZXN1bHQucG9zICE9PSB1bmRlZmluZWQgPyByZXN1bHQucG9zIDogblBvcykgfHwgcmVzdWx0LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza1BvcyA9IG5Qb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IHNlZWtOZXh0KG1hc2tQb3MpXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICExICE9PSByZXN1bHQgfHwgITEgPT09IG9wdHMua2VlcFN0YXRpYyB8fCBudWxsICE9IG9wdHMucmVnZXggJiYgIWlzQ29tcGxldGUoZ2V0QnVmZmVyKCkpIHx8IHN0cmljdCB8fCAhMCA9PT0gZnJvbUFsdGVybmF0ZSB8fCAocmVzdWx0ID0gYWx0ZXJuYXRlKG1hc2tQb3MsIGMsIHN0cmljdCwgZnJvbVNldFZhbGlkKSksIFxuICAgICAgICAgICAgICAgICAgICAhMCA9PT0gcmVzdWx0ICYmIChyZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3M6IG1hc2tQb3NcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24ob3B0cy5wb3N0VmFsaWRhdGlvbikgJiYgITEgIT09IHJlc3VsdCAmJiAhc3RyaWN0ICYmICEwICE9PSBmcm9tU2V0VmFsaWQgJiYgITAgIT09IHZhbGlkYXRlT25seSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zdFJlc3VsdCA9IG9wdHMucG9zdFZhbGlkYXRpb24oZ2V0QnVmZmVyKCEwKSwgcmVzdWx0LCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3RSZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3RSZXN1bHQucmVmcmVzaEZyb21CdWZmZXIgJiYgcG9zdFJlc3VsdC5idWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmcmVzaCA9IHBvc3RSZXN1bHQucmVmcmVzaEZyb21CdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaEZyb21CdWZmZXIoITAgPT09IHJlZnJlc2ggPyByZWZyZXNoIDogcmVmcmVzaC5zdGFydCwgcmVmcmVzaC5lbmQsIHBvc3RSZXN1bHQuYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9ICEwID09PSBwb3N0UmVzdWx0ID8gcmVzdWx0IDogcG9zdFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICYmIHJlc3VsdC5wb3MgPT09IHVuZGVmaW5lZCAmJiAocmVzdWx0LnBvcyA9IG1hc2tQb3MpLCAhMSAhPT0gcmVzdWx0ICYmICEwICE9PSB2YWxpZGF0ZU9ubHkgfHwgKHJlc2V0TWFza1NldCghMCksIFxuICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucyA9ICQuZXh0ZW5kKCEwLCB7fSwgcG9zaXRpb25zQ2xvbmUpKSwgcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdHJhY2tiYWNrUG9zaXRpb25zKG9yaWdpbmFsUG9zLCBuZXdQb3MsIGZpbGxPbmx5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxQb3MgPT09IHVuZGVmaW5lZCkgZm9yIChvcmlnaW5hbFBvcyA9IG5ld1BvcyAtIDE7IG9yaWdpbmFsUG9zID4gMCAmJiAhZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW29yaWdpbmFsUG9zXTsgb3JpZ2luYWxQb3MtLSkgO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHBzID0gb3JpZ2luYWxQb3M7IHBzIDwgbmV3UG9zOyBwcysrKSBpZiAoZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3BzXSA9PT0gdW5kZWZpbmVkICYmICFpc01hc2socHMsICEwKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdnAgPSAwID09IHBzID8gZ2V0VGVzdChwcykgOiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcHMgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHN0TG9jYXRvciwgdGFyZ2V0TG9jYXRvciA9IGdldExvY2F0b3IodnApLCB0ZXN0cyA9IGdldFRlc3RzKHBzKS5zbGljZSgpLCBjbG9zZXN0ID0gdW5kZWZpbmVkLCBiZXN0TWF0Y2ggPSBnZXRUZXN0KHBzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIlwiID09PSB0ZXN0c1t0ZXN0cy5sZW5ndGggLSAxXS5tYXRjaC5kZWYgJiYgdGVzdHMucG9wKCksICQuZWFjaCh0ZXN0cywgZnVuY3Rpb24obmR4LCB0c3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0c3RMb2NhdG9yID0gZ2V0TG9jYXRvcih0c3QsIHRhcmdldExvY2F0b3IubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLmFicyh0c3RMb2NhdG9yIC0gdGFyZ2V0TG9jYXRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsb3Nlc3QgPT09IHVuZGVmaW5lZCB8fCBkaXN0YW5jZSA8IGNsb3Nlc3QpICYmIG51bGwgPT09IHRzdC5tYXRjaC5mbiAmJiAhMCAhPT0gdHN0Lm1hdGNoLm9wdGlvbmFsaXR5ICYmICEwICE9PSB0c3QubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICYmIChjbG9zZXN0ID0gZGlzdGFuY2UsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaCA9IHRzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwgKGJlc3RNYXRjaCA9ICQuZXh0ZW5kKHt9LCBiZXN0TWF0Y2gsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogZ2V0UGxhY2Vob2xkZXIocHMsIGJlc3RNYXRjaC5tYXRjaCwgITApIHx8IGJlc3RNYXRjaC5tYXRjaC5kZWZcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKS5nZW5lcmF0ZWRJbnB1dCA9ICEwLCByZXZhbGlkYXRlTWFzayhwcywgYmVzdE1hdGNoLCAhMCksICEwICE9PSBmaWxsT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdnBJbnB1dCA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tuZXdQb3NdLmlucHV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tuZXdQb3NdID0gdW5kZWZpbmVkLCByZXN1bHQgPSBpc1ZhbGlkKG5ld1BvcywgY3ZwSW5wdXQsICEwLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJldmFsaWRhdGVNYXNrKHBvcywgdmFsaWRUZXN0LCBmcm9tU2V0VmFsaWQsIHZhbGlkYXRlZFBvcykge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIElzRW5jbG9zZWRTdGF0aWMocG9zLCB2YWxpZHMsIHNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zTWF0Y2ggPSB2YWxpZHNbcG9zXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc01hdGNoICE9PSB1bmRlZmluZWQgJiYgKG51bGwgPT09IHBvc01hdGNoLm1hdGNoLmZuICYmICEwICE9PSBwb3NNYXRjaC5tYXRjaC5vcHRpb25hbGl0eSB8fCBwb3NNYXRjaC5pbnB1dCA9PT0gb3B0cy5yYWRpeFBvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZNYXRjaCA9IHNlbGVjdGlvbi5iZWdpbiA8PSBwb3MgLSAxID8gdmFsaWRzW3BvcyAtIDFdICYmIG51bGwgPT09IHZhbGlkc1twb3MgLSAxXS5tYXRjaC5mbiAmJiB2YWxpZHNbcG9zIC0gMV0gOiB2YWxpZHNbcG9zIC0gMV0sIG5leHRNYXRjaCA9IHNlbGVjdGlvbi5lbmQgPiBwb3MgKyAxID8gdmFsaWRzW3BvcyArIDFdICYmIG51bGwgPT09IHZhbGlkc1twb3MgKyAxXS5tYXRjaC5mbiAmJiB2YWxpZHNbcG9zICsgMV0gOiB2YWxpZHNbcG9zICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldk1hdGNoICYmIG5leHRNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBiZWdpbiA9IHBvcy5iZWdpbiAhPT0gdW5kZWZpbmVkID8gcG9zLmJlZ2luIDogcG9zLCBlbmQgPSBwb3MuZW5kICE9PSB1bmRlZmluZWQgPyBwb3MuZW5kIDogcG9zO1xuICAgICAgICAgICAgICAgIGlmIChwb3MuYmVnaW4gPiBwb3MuZW5kICYmIChiZWdpbiA9IHBvcy5lbmQsIGVuZCA9IHBvcy5iZWdpbiksIHZhbGlkYXRlZFBvcyA9IHZhbGlkYXRlZFBvcyAhPT0gdW5kZWZpbmVkID8gdmFsaWRhdGVkUG9zIDogYmVnaW4sIFxuICAgICAgICAgICAgICAgIGJlZ2luICE9PSBlbmQgfHwgb3B0cy5pbnNlcnRNb2RlICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1t2YWxpZGF0ZWRQb3NdICE9PSB1bmRlZmluZWQgJiYgZnJvbVNldFZhbGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uc0Nsb25lID0gJC5leHRlbmQoITAsIHt9LCBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnMpLCBsdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbih1bmRlZmluZWQsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChnZXRNYXNrU2V0KCkucCA9IGJlZ2luLCBpID0gbHZwOyBpID49IGJlZ2luOyBpLS0pIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXSAmJiBcIitcIiA9PT0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldLm1hdGNoLm5hdGl2ZURlZiAmJiAob3B0cy5pc05lZ2F0aXZlID0gITEpLCBcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbGlkID0gITAsIGogPSB2YWxpZGF0ZWRQb3MsIG5lZWRzVmFsaWRhdGlvbiA9IChnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnMsIFxuICAgICAgICAgICAgICAgICAgICAhMSksIHBvc01hdGNoID0gaiwgaSA9IGo7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFsaWRUZXN0ICYmIChnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbdmFsaWRhdGVkUG9zXSA9ICQuZXh0ZW5kKCEwLCB7fSwgdmFsaWRUZXN0KSwgXG4gICAgICAgICAgICAgICAgICAgIHBvc01hdGNoKyssIGorKywgYmVnaW4gPCBlbmQgJiYgaSsrKTsgaSA8PSBsdnA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBwb3NpdGlvbnNDbG9uZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ICE9PSB1bmRlZmluZWQgJiYgKGkgPj0gZW5kIHx8IGkgPj0gYmVnaW4gJiYgITAgIT09IHQuZ2VuZXJhdGVkSW5wdXQgJiYgSXNFbmNsb3NlZFN0YXRpYyhpLCBwb3NpdGlvbnNDbG9uZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBiZWdpbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGVuZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7XCJcIiAhPT0gZ2V0VGVzdChwb3NNYXRjaCkubWF0Y2guZGVmOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCExID09PSBuZWVkc1ZhbGlkYXRpb24gJiYgcG9zaXRpb25zQ2xvbmVbcG9zTWF0Y2hdICYmIHBvc2l0aW9uc0Nsb25lW3Bvc01hdGNoXS5tYXRjaC5uYXRpdmVEZWYgPT09IHQubWF0Y2gubmF0aXZlRGVmKSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zTWF0Y2hdID0gJC5leHRlbmQoITAsIHt9LCBwb3NpdGlvbnNDbG9uZVtwb3NNYXRjaF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc01hdGNoXS5pbnB1dCA9IHQuaW5wdXQsIHRyYWNrYmFja1Bvc2l0aW9ucyh1bmRlZmluZWQsIHBvc01hdGNoLCAhMCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqID0gcG9zTWF0Y2ggKyAxLCB2YWxpZCA9ICEwOyBlbHNlIGlmIChwb3NpdGlvbkNhbk1hdGNoRGVmaW5pdGlvbihwb3NNYXRjaCwgdC5tYXRjaC5kZWYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gaXNWYWxpZChwb3NNYXRjaCwgdC5pbnB1dCwgITAsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gITEgIT09IHJlc3VsdCwgaiA9IHJlc3VsdC5jYXJldCB8fCByZXN1bHQuaW5zZXJ0ID8gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSA6IHBvc01hdGNoICsgMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWVkc1ZhbGlkYXRpb24gPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghKHZhbGlkID0gITAgPT09IHQuZ2VuZXJhdGVkSW5wdXQgfHwgdC5pbnB1dCA9PT0gb3B0cy5yYWRpeFBvaW50ICYmICEwID09PSBvcHRzLm51bWVyaWNJbnB1dCkgJiYgXCJcIiA9PT0gZ2V0VGVzdChwb3NNYXRjaCkubWF0Y2guZGVmKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zTWF0Y2grKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiA9PSBnZXRUZXN0KHBvc01hdGNoKS5tYXRjaC5kZWYgJiYgKHZhbGlkID0gITEpLCBwb3NNYXRjaCA9IGo7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbGlkKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbGlkKSByZXR1cm4gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zID0gJC5leHRlbmQoITAsIHt9LCBwb3NpdGlvbnNDbG9uZSksIFxuICAgICAgICAgICAgICAgICAgICByZXNldE1hc2tTZXQoITApLCAhMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgdmFsaWRUZXN0ICYmIChnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbdmFsaWRhdGVkUG9zXSA9ICQuZXh0ZW5kKCEwLCB7fSwgdmFsaWRUZXN0KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc2V0TWFza1NldCghMCksICEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaXNNYXNrKHBvcywgc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlc3QgPSBnZXRUZXN0VGVtcGxhdGUocG9zKS5tYXRjaDtcbiAgICAgICAgICAgICAgICBpZiAoXCJcIiA9PT0gdGVzdC5kZWYgJiYgKHRlc3QgPSBnZXRUZXN0KHBvcykubWF0Y2gpLCBudWxsICE9IHRlc3QuZm4pIHJldHVybiB0ZXN0LmZuO1xuICAgICAgICAgICAgICAgIGlmICghMCAhPT0gc3RyaWN0ICYmIHBvcyA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0cyA9IGdldFRlc3RzKHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0cy5sZW5ndGggPiAxICsgKFwiXCIgPT09IHRlc3RzW3Rlc3RzLmxlbmd0aCAtIDFdLm1hdGNoLmRlZiA/IDEgOiAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICExO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gc2Vla05leHQocG9zLCBuZXdCbG9jaykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHBvc2l0aW9uID0gcG9zICsgMTsgXCJcIiAhPT0gZ2V0VGVzdChwb3NpdGlvbikubWF0Y2guZGVmICYmICghMCA9PT0gbmV3QmxvY2sgJiYgKCEwICE9PSBnZXRUZXN0KHBvc2l0aW9uKS5tYXRjaC5uZXdCbG9ja01hcmtlciB8fCAhaXNNYXNrKHBvc2l0aW9uKSkgfHwgITAgIT09IG5ld0Jsb2NrICYmICFpc01hc2socG9zaXRpb24pKTsgKSBwb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlZWtQcmV2aW91cyhwb3MsIG5ld0Jsb2NrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlc3RzLCBwb3NpdGlvbiA9IHBvcztcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gMCkgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgZm9yICg7LS1wb3NpdGlvbiA+IDAgJiYgKCEwID09PSBuZXdCbG9jayAmJiAhMCAhPT0gZ2V0VGVzdChwb3NpdGlvbikubWF0Y2gubmV3QmxvY2tNYXJrZXIgfHwgITAgIT09IG5ld0Jsb2NrICYmICFpc01hc2socG9zaXRpb24pICYmICgodGVzdHMgPSBnZXRUZXN0cyhwb3NpdGlvbikpLmxlbmd0aCA8IDIgfHwgMiA9PT0gdGVzdHMubGVuZ3RoICYmIFwiXCIgPT09IHRlc3RzWzFdLm1hdGNoLmRlZikpOyApIDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB3cml0ZUJ1ZmZlcihpbnB1dCwgYnVmZmVyLCBjYXJldFBvcywgZXZlbnQsIHRyaWdnZXJFdmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgJiYgJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVXcml0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG9wdHMub25CZWZvcmVXcml0ZS5jYWxsKGlucHV0bWFzaywgZXZlbnQsIGJ1ZmZlciwgY2FyZXRQb3MsIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlZnJlc2hGcm9tQnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZnJlc2ggPSByZXN1bHQucmVmcmVzaEZyb21CdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaEZyb21CdWZmZXIoITAgPT09IHJlZnJlc2ggPyByZWZyZXNoIDogcmVmcmVzaC5zdGFydCwgcmVmcmVzaC5lbmQsIHJlc3VsdC5idWZmZXIgfHwgYnVmZmVyKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gZ2V0QnVmZmVyKCEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0UG9zICE9PSB1bmRlZmluZWQgJiYgKGNhcmV0UG9zID0gcmVzdWx0LmNhcmV0ICE9PSB1bmRlZmluZWQgPyByZXN1bHQuY2FyZXQgOiBjYXJldFBvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0ICE9PSB1bmRlZmluZWQgJiYgKGlucHV0LmlucHV0bWFzay5fdmFsdWVTZXQoYnVmZmVyLmpvaW4oXCJcIikpLCBjYXJldFBvcyA9PT0gdW5kZWZpbmVkIHx8IGV2ZW50ICE9PSB1bmRlZmluZWQgJiYgXCJibHVyXCIgPT09IGV2ZW50LnR5cGUgPyByZW5kZXJDb2xvck1hc2soaW5wdXQsIGNhcmV0UG9zLCAwID09PSBidWZmZXIubGVuZ3RoKSA6IGNhcmV0KGlucHV0LCBjYXJldFBvcyksIFxuICAgICAgICAgICAgICAgICEwID09PSB0cmlnZ2VyRXZlbnRzKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJChpbnB1dCksIG5wdFZhbCA9IGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2tpcElucHV0RXZlbnQgPSAhMCwgJGlucHV0LnRyaWdnZXIoXCJpbnB1dFwiKSwgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdFZhbCA9PT0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpID8gJGlucHV0LnRyaWdnZXIoXCJjbGVhcmVkXCIpIDogITAgPT09IGlzQ29tcGxldGUoYnVmZmVyKSAmJiAkaW5wdXQudHJpZ2dlcihcImNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQbGFjZWhvbGRlcihwb3MsIHRlc3QsIHJldHVyblBMKSB7XG4gICAgICAgICAgICAgICAgaWYgKCh0ZXN0ID0gdGVzdCB8fCBnZXRUZXN0KHBvcykubWF0Y2gpLnBsYWNlaG9sZGVyICE9PSB1bmRlZmluZWQgfHwgITAgPT09IHJldHVyblBMKSByZXR1cm4gJC5pc0Z1bmN0aW9uKHRlc3QucGxhY2Vob2xkZXIpID8gdGVzdC5wbGFjZWhvbGRlcihvcHRzKSA6IHRlc3QucGxhY2Vob2xkZXI7XG4gICAgICAgICAgICAgICAgaWYgKG51bGwgPT09IHRlc3QuZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyA+IC0xICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2VGVzdCwgdGVzdHMgPSBnZXRUZXN0cyhwb3MpLCBzdGF0aWNBbHRlcm5hdGlvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0cy5sZW5ndGggPiAxICsgKFwiXCIgPT09IHRlc3RzW3Rlc3RzLmxlbmd0aCAtIDFdLm1hdGNoLmRlZiA/IDEgOiAwKSkgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXN0cy5sZW5ndGg7IGkrKykgaWYgKCEwICE9PSB0ZXN0c1tpXS5tYXRjaC5vcHRpb25hbGl0eSAmJiAhMCAhPT0gdGVzdHNbaV0ubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICYmIChudWxsID09PSB0ZXN0c1tpXS5tYXRjaC5mbiB8fCBwcmV2VGVzdCA9PT0gdW5kZWZpbmVkIHx8ICExICE9PSB0ZXN0c1tpXS5tYXRjaC5mbi50ZXN0KHByZXZUZXN0Lm1hdGNoLmRlZiwgZ2V0TWFza1NldCgpLCBwb3MsICEwLCBvcHRzKSkgJiYgKHN0YXRpY0FsdGVybmF0aW9ucy5wdXNoKHRlc3RzW2ldKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsID09PSB0ZXN0c1tpXS5tYXRjaC5mbiAmJiAocHJldlRlc3QgPSB0ZXN0c1tpXSksIHN0YXRpY0FsdGVybmF0aW9ucy5sZW5ndGggPiAxICYmIC9bMC05YS1iQS1aXS8udGVzdChzdGF0aWNBbHRlcm5hdGlvbnNbMF0ubWF0Y2guZGVmKSkpIHJldHVybiBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdChwb3MgJSBvcHRzLnBsYWNlaG9sZGVyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlc3QuZGVmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5wbGFjZWhvbGRlci5jaGFyQXQocG9zICUgb3B0cy5wbGFjZWhvbGRlci5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHZhbHVlQnVmZmVyLCBFdmVudFJ1bGVyID0ge1xuICAgICAgICAgICAgICAgIG9uOiBmdW5jdGlvbihpbnB1dCwgZXZlbnROYW1lLCBldmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuaW5wdXRtYXNrID09PSB1bmRlZmluZWQgJiYgXCJGT1JNXCIgIT09IHRoaXMubm9kZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1PcHRzID0gJC5kYXRhKHRoYXQsIFwiX2lucHV0bWFza19vcHRzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltT3B0cyA/IG5ldyBJbnB1dG1hc2soaW1PcHRzKS5tYXNrKHRoYXQpIDogRXZlbnRSdWxlci5vZmYodGhhdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInNldHZhbHVlXCIgPT09IGUudHlwZSB8fCBcIkZPUk1cIiA9PT0gdGhpcy5ub2RlTmFtZSB8fCAhKHRoYXQuZGlzYWJsZWQgfHwgdGhhdC5yZWFkT25seSAmJiAhKFwia2V5ZG93blwiID09PSBlLnR5cGUgJiYgZS5jdHJsS2V5ICYmIDY3ID09PSBlLmtleUNvZGUgfHwgITEgPT09IG9wdHMudGFiVGhyb3VnaCAmJiBlLmtleUNvZGUgPT09IElucHV0bWFzay5rZXlDb2RlLlRBQikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgPT09IHNraXBJbnB1dEV2ZW50KSByZXR1cm4gc2tpcElucHV0RXZlbnQgPSAhMSwgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrQ2FyZXQgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApLCAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImtleWRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraXBLZXlQcmVzc0V2ZW50ID0gITEsIHNraXBJbnB1dEV2ZW50ID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJrZXlwcmVzc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwID09PSBza2lwS2V5UHJlc3NFdmVudCkgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraXBLZXlQcmVzc0V2ZW50ID0gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGlja1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGllbW9iaWxlIHx8IGlwaG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlci5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKSwgITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVyblZhbCA9IGV2ZW50SGFuZGxlci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2tDYXJldCAmJiAodHJhY2tDYXJldCA9ICExLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQodGhhdCwgdGhhdC5pbnB1dG1hc2suY2FyZXRQb3MsIHVuZGVmaW5lZCwgITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksICExID09PSByZXR1cm5WYWwgJiYgKGUucHJldmVudERlZmF1bHQoKSwgZS5zdG9wUHJvcGFnYXRpb24oKSksIHJldHVyblZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5pbnB1dG1hc2suZXZlbnRzW2V2ZW50TmFtZV0gPSBpbnB1dC5pbnB1dG1hc2suZXZlbnRzW2V2ZW50TmFtZV0gfHwgW10sIGlucHV0LmlucHV0bWFzay5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGV2KSwgXG4gICAgICAgICAgICAgICAgICAgIC0xICE9PSAkLmluQXJyYXkoZXZlbnROYW1lLCBbIFwic3VibWl0XCIsIFwicmVzZXRcIiBdKSA/IG51bGwgIT09IGlucHV0LmZvcm0gJiYgJChpbnB1dC5mb3JtKS5vbihldmVudE5hbWUsIGV2KSA6ICQoaW5wdXQpLm9uKGV2ZW50TmFtZSwgZXYpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb2ZmOiBmdW5jdGlvbihpbnB1dCwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50cztcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuaW5wdXRtYXNrICYmIGlucHV0LmlucHV0bWFzay5ldmVudHMgJiYgKGV2ZW50ID8gKGV2ZW50cyA9IFtdKVtldmVudF0gPSBpbnB1dC5pbnB1dG1hc2suZXZlbnRzW2V2ZW50XSA6IGV2ZW50cyA9IGlucHV0LmlucHV0bWFzay5ldmVudHMsIFxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goZXZlbnRzLCBmdW5jdGlvbihldmVudE5hbWUsIGV2QXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDtldkFyci5sZW5ndGggPiAwOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXYgPSBldkFyci5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtMSAhPT0gJC5pbkFycmF5KGV2ZW50TmFtZSwgWyBcInN1Ym1pdFwiLCBcInJlc2V0XCIgXSkgPyBudWxsICE9PSBpbnB1dC5mb3JtICYmICQoaW5wdXQuZm9ybSkub2ZmKGV2ZW50TmFtZSwgZXYpIDogJChpbnB1dCkub2ZmKGV2ZW50TmFtZSwgZXYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGlucHV0LmlucHV0bWFzay5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIEV2ZW50SGFuZGxlcnMgPSB7XG4gICAgICAgICAgICAgICAga2V5ZG93bkV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsICRpbnB1dCA9ICQoaW5wdXQpLCBrID0gZS5rZXlDb2RlLCBwb3MgPSBjYXJldChpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09PSBJbnB1dG1hc2sua2V5Q29kZS5CQUNLU1BBQ0UgfHwgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuREVMRVRFIHx8IGlwaG9uZSAmJiBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5CQUNLU1BBQ0VfU0FGQVJJIHx8IGUuY3RybEtleSAmJiBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5YICYmICFpc0lucHV0RXZlbnRTdXBwb3J0ZWQoXCJjdXRcIikpIGUucHJldmVudERlZmF1bHQoKSwgXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlbW92ZShpbnB1dCwgaywgcG9zKSwgd3JpdGVCdWZmZXIoaW5wdXQsIGdldEJ1ZmZlcighMCksIGdldE1hc2tTZXQoKS5wLCBlLCBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikpOyBlbHNlIGlmIChrID09PSBJbnB1dG1hc2sua2V5Q29kZS5FTkQgfHwgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuUEFHRV9ET1dOKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3MgPSBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuaW5zZXJ0TW9kZSB8fCBjYXJldFBvcyAhPT0gZ2V0TWFza1NldCgpLm1hc2tMZW5ndGggfHwgZS5zaGlmdEtleSB8fCBjYXJldFBvcy0tLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBlLnNoaWZ0S2V5ID8gcG9zLmJlZ2luIDogY2FyZXRQb3MsIGNhcmV0UG9zLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5IT01FICYmICFlLnNoaWZ0S2V5IHx8IGsgPT09IElucHV0bWFzay5rZXlDb2RlLlBBR0VfVVAgPyAoZS5wcmV2ZW50RGVmYXVsdCgpLCBcbiAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIDAsIGUuc2hpZnRLZXkgPyBwb3MuYmVnaW4gOiAwLCAhMCkpIDogKG9wdHMudW5kb09uRXNjYXBlICYmIGsgPT09IElucHV0bWFzay5rZXlDb2RlLkVTQ0FQRSB8fCA5MCA9PT0gayAmJiBlLmN0cmxLZXkpICYmICEwICE9PSBlLmFsdEtleSA/IChjaGVja1ZhbChpbnB1dCwgITAsICExLCB1bmRvVmFsdWUuc3BsaXQoXCJcIikpLCBcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJjbGlja1wiKSkgOiBrICE9PSBJbnB1dG1hc2sua2V5Q29kZS5JTlNFUlQgfHwgZS5zaGlmdEtleSB8fCBlLmN0cmxLZXkgPyAhMCA9PT0gb3B0cy50YWJUaHJvdWdoICYmIGsgPT09IElucHV0bWFzay5rZXlDb2RlLlRBQiA/ICghMCA9PT0gZS5zaGlmdEtleSA/IChudWxsID09PSBnZXRUZXN0KHBvcy5iZWdpbikubWF0Y2guZm4gJiYgKHBvcy5iZWdpbiA9IHNlZWtOZXh0KHBvcy5iZWdpbikpLCBcbiAgICAgICAgICAgICAgICAgICAgcG9zLmVuZCA9IHNlZWtQcmV2aW91cyhwb3MuYmVnaW4sICEwKSwgcG9zLmJlZ2luID0gc2Vla1ByZXZpb3VzKHBvcy5lbmQsICEwKSkgOiAocG9zLmJlZ2luID0gc2Vla05leHQocG9zLmJlZ2luLCAhMCksIFxuICAgICAgICAgICAgICAgICAgICBwb3MuZW5kID0gc2Vla05leHQocG9zLmJlZ2luLCAhMCksIHBvcy5lbmQgPCBnZXRNYXNrU2V0KCkubWFza0xlbmd0aCAmJiBwb3MuZW5kLS0pLCBcbiAgICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luIDwgZ2V0TWFza1NldCgpLm1hc2tMZW5ndGggJiYgKGUucHJldmVudERlZmF1bHQoKSwgY2FyZXQoaW5wdXQsIHBvcy5iZWdpbiwgcG9zLmVuZCkpKSA6IGUuc2hpZnRLZXkgfHwgITEgPT09IG9wdHMuaW5zZXJ0TW9kZSAmJiAoayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuUklHSFQgPyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gY2FyZXQoaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIGNhcmV0UG9zLmJlZ2luKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCkgOiBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5MRUZUICYmIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3MgPSBjYXJldChpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgaXNSVEwgPyBjYXJldFBvcy5iZWdpbiArIDEgOiBjYXJldFBvcy5iZWdpbiAtIDEpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKSkgOiAob3B0cy5pbnNlcnRNb2RlID0gIW9wdHMuaW5zZXJ0TW9kZSwgY2FyZXQoaW5wdXQsIG9wdHMuaW5zZXJ0TW9kZSB8fCBwb3MuYmVnaW4gIT09IGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoID8gcG9zLmJlZ2luIDogcG9zLmJlZ2luIC0gMSkpO1xuICAgICAgICAgICAgICAgICAgICBvcHRzLm9uS2V5RG93bi5jYWxsKHRoaXMsIGUsIGdldEJ1ZmZlcigpLCBjYXJldChpbnB1dCkuYmVnaW4sIG9wdHMpLCBpZ25vcmFibGUgPSAtMSAhPT0gJC5pbkFycmF5KGssIG9wdHMuaWdub3JhYmxlcyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBrZXlwcmVzc0V2ZW50OiBmdW5jdGlvbihlLCBjaGVja3ZhbCwgd3JpdGVPdXQsIHN0cmljdCwgbmR4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsICRpbnB1dCA9ICQoaW5wdXQpLCBrID0gZS53aGljaCB8fCBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoITAgPT09IGNoZWNrdmFsIHx8IGUuY3RybEtleSAmJiBlLmFsdEtleSkgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkgfHwgaWdub3JhYmxlKSkgcmV0dXJuIGsgPT09IElucHV0bWFzay5rZXlDb2RlLkVOVEVSICYmIHVuZG9WYWx1ZSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSAmJiAodW5kb1ZhbHVlID0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudHJpZ2dlcihcImNoYW5nZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCkpLCAhMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDQ2ID09PSBrICYmICExID09PSBlLnNoaWZ0S2V5ICYmIFwiXCIgIT09IG9wdHMucmFkaXhQb2ludCAmJiAoayA9IG9wdHMucmFkaXhQb2ludC5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3J3YXJkUG9zaXRpb24sIHBvcyA9IGNoZWNrdmFsID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBuZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBuZHhcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gOiBjYXJldChpbnB1dCksIGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGspLCBvZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuX3JhZGl4RGFuY2UgJiYgb3B0cy5udW1lcmljSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3MgPSBnZXRCdWZmZXIoKS5pbmRleE9mKG9wdHMucmFkaXhQb2ludC5jaGFyQXQoMCkpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MuYmVnaW4gPD0gY2FyZXRQb3MgJiYgKGsgPT09IG9wdHMucmFkaXhQb2ludC5jaGFyQ29kZUF0KDApICYmIChvZmZzZXQgPSAxKSwgcG9zLmJlZ2luIC09IDEsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgLT0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkud3JpdGVPdXRCdWZmZXIgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWxSZXN1bHQgPSBpc1ZhbGlkKHBvcywgYywgc3RyaWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMSAhPT0gdmFsUmVzdWx0ICYmIChyZXNldE1hc2tTZXQoITApLCBmb3J3YXJkUG9zaXRpb24gPSB2YWxSZXN1bHQuY2FyZXQgIT09IHVuZGVmaW5lZCA/IHZhbFJlc3VsdC5jYXJldCA6IHNlZWtOZXh0KHZhbFJlc3VsdC5wb3MuYmVnaW4gPyB2YWxSZXN1bHQucG9zLmJlZ2luIDogdmFsUmVzdWx0LnBvcyksIFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLnAgPSBmb3J3YXJkUG9zaXRpb24pLCBmb3J3YXJkUG9zaXRpb24gPSAob3B0cy5udW1lcmljSW5wdXQgJiYgdmFsUmVzdWx0LmNhcmV0ID09PSB1bmRlZmluZWQgPyBzZWVrUHJldmlvdXMoZm9yd2FyZFBvc2l0aW9uKSA6IGZvcndhcmRQb3NpdGlvbikgKyBvZmZzZXQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgITEgIT09IHdyaXRlT3V0ICYmIChzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMub25LZXlWYWxpZGF0aW9uLmNhbGwoaW5wdXQsIGssIHZhbFJlc3VsdCwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKSwgZ2V0TWFza1NldCgpLndyaXRlT3V0QnVmZmVyICYmICExICE9PSB2YWxSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEJ1ZmZlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGlucHV0LCBidWZmZXIsIGZvcndhcmRQb3NpdGlvbiwgZSwgITAgIT09IGNoZWNrdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KCksIGNoZWNrdmFsKSByZXR1cm4gITEgIT09IHZhbFJlc3VsdCAmJiAodmFsUmVzdWx0LmZvcndhcmRQb3NpdGlvbiA9IGZvcndhcmRQb3NpdGlvbiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwYXN0ZUV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wVmFsdWUsIGV2ID0gZS5vcmlnaW5hbEV2ZW50IHx8IGUsIGlucHV0VmFsdWUgPSAoJCh0aGlzKSwgdGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSksIGNhcmV0UG9zID0gY2FyZXQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlzUlRMICYmICh0ZW1wVmFsdWUgPSBjYXJldFBvcy5lbmQsIGNhcmV0UG9zLmVuZCA9IGNhcmV0UG9zLmJlZ2luLCBjYXJldFBvcy5iZWdpbiA9IHRlbXBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZUJlZm9yZUNhcmV0ID0gaW5wdXRWYWx1ZS5zdWJzdHIoMCwgY2FyZXRQb3MuYmVnaW4pLCB2YWx1ZUFmdGVyQ2FyZXQgPSBpbnB1dFZhbHVlLnN1YnN0cihjYXJldFBvcy5lbmQsIGlucHV0VmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlQmVmb3JlQ2FyZXQgPT09IChpc1JUTCA/IGdldEJ1ZmZlclRlbXBsYXRlKCkucmV2ZXJzZSgpIDogZ2V0QnVmZmVyVGVtcGxhdGUoKSkuc2xpY2UoMCwgY2FyZXRQb3MuYmVnaW4pLmpvaW4oXCJcIikgJiYgKHZhbHVlQmVmb3JlQ2FyZXQgPSBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlQWZ0ZXJDYXJldCA9PT0gKGlzUlRMID8gZ2V0QnVmZmVyVGVtcGxhdGUoKS5yZXZlcnNlKCkgOiBnZXRCdWZmZXJUZW1wbGF0ZSgpKS5zbGljZShjYXJldFBvcy5lbmQpLmpvaW4oXCJcIikgJiYgKHZhbHVlQWZ0ZXJDYXJldCA9IFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgaXNSVEwgJiYgKHRlbXBWYWx1ZSA9IHZhbHVlQmVmb3JlQ2FyZXQsIHZhbHVlQmVmb3JlQ2FyZXQgPSB2YWx1ZUFmdGVyQ2FyZXQsIHZhbHVlQWZ0ZXJDYXJldCA9IHRlbXBWYWx1ZSksIFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xpcGJvYXJkRGF0YSAmJiB3aW5kb3cuY2xpcGJvYXJkRGF0YS5nZXREYXRhKSBpbnB1dFZhbHVlID0gdmFsdWVCZWZvcmVDYXJldCArIHdpbmRvdy5jbGlwYm9hcmREYXRhLmdldERhdGEoXCJUZXh0XCIpICsgdmFsdWVBZnRlckNhcmV0OyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXYuY2xpcGJvYXJkRGF0YSB8fCAhZXYuY2xpcGJvYXJkRGF0YS5nZXREYXRhKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gdmFsdWVCZWZvcmVDYXJldCArIGV2LmNsaXBib2FyZERhdGEuZ2V0RGF0YShcInRleHQvcGxhaW5cIikgKyB2YWx1ZUFmdGVyQ2FyZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhc3RlVmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVQYXN0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMSA9PT0gKHBhc3RlVmFsdWUgPSBvcHRzLm9uQmVmb3JlUGFzdGUuY2FsbChpbnB1dG1hc2ssIGlucHV0VmFsdWUsIG9wdHMpKSkgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3RlVmFsdWUgfHwgKHBhc3RlVmFsdWUgPSBpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hlY2tWYWwodGhpcywgITEsICExLCBpc1JUTCA/IHBhc3RlVmFsdWUuc3BsaXQoXCJcIikucmV2ZXJzZSgpIDogcGFzdGVWYWx1ZS50b1N0cmluZygpLnNwbGl0KFwiXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKHRoaXMsIGdldEJ1ZmZlcigpLCBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKSwgZSwgdW5kb1ZhbHVlICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0RmFsbEJhY2tFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLCBpbnB1dFZhbHVlID0gaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QnVmZmVyKCkuam9pbihcIlwiKSAhPT0gaW5wdXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gY2FyZXQoaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0VmFsdWUgPSBmdW5jdGlvbihpbnB1dCwgaW5wdXRWYWx1ZSwgY2FyZXRQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWVtb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0Q2hhciA9IGlucHV0VmFsdWUucmVwbGFjZShnZXRCdWZmZXIoKS5qb2luKFwiXCIpLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT09IGlucHV0Q2hhci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdiA9IGlucHV0VmFsdWUuc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdi5zcGxpY2UoY2FyZXRQb3MuYmVnaW4sIDAsIGlucHV0Q2hhciksIGlucHV0VmFsdWUgPSBpdi5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSgwLCBpbnB1dFZhbHVlID0gZnVuY3Rpb24oaW5wdXQsIGlucHV0VmFsdWUsIGNhcmV0UG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiLlwiID09PSBpbnB1dFZhbHVlLmNoYXJBdChjYXJldFBvcy5iZWdpbiAtIDEpICYmIFwiXCIgIT09IG9wdHMucmFkaXhQb2ludCAmJiAoKGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnNwbGl0KFwiXCIpKVtjYXJldFBvcy5iZWdpbiAtIDFdID0gb3B0cy5yYWRpeFBvaW50LmNoYXJBdCgwKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuam9pbihcIlwiKSksIGlucHV0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KDAsIGlucHV0VmFsdWUsIGNhcmV0UG9zKSwgY2FyZXRQb3MpLCBnZXRCdWZmZXIoKS5qb2luKFwiXCIpICE9PSBpbnB1dFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEJ1ZmZlcigpLmpvaW4oXCJcIiksIG9mZnNldCA9ICFvcHRzLm51bWVyaWNJbnB1dCAmJiBpbnB1dFZhbHVlLmxlbmd0aCA+IGJ1ZmZlci5sZW5ndGggPyAtMSA6IDAsIGZyb250UGFydCA9IGlucHV0VmFsdWUuc3Vic3RyKDAsIGNhcmV0UG9zLmJlZ2luKSwgYmFja1BhcnQgPSBpbnB1dFZhbHVlLnN1YnN0cihjYXJldFBvcy5iZWdpbiksIGZyb250QnVmZmVyUGFydCA9IGJ1ZmZlci5zdWJzdHIoMCwgY2FyZXRQb3MuYmVnaW4gKyBvZmZzZXQpLCBiYWNrQnVmZmVyUGFydCA9IGJ1ZmZlci5zdWJzdHIoY2FyZXRQb3MuYmVnaW4gKyBvZmZzZXQpLCBzZWxlY3Rpb24gPSBjYXJldFBvcywgZW50cmllcyA9IFwiXCIsIGlzRW50cnkgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJvbnRQYXJ0ICE9PSBmcm9udEJ1ZmZlclBhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZnBsID0gKGlzRW50cnkgPSBmcm9udFBhcnQubGVuZ3RoID49IGZyb250QnVmZmVyUGFydC5sZW5ndGgpID8gZnJvbnRQYXJ0Lmxlbmd0aCA6IGZyb250QnVmZmVyUGFydC5sZW5ndGgsIGkgPSAwOyBmcm9udFBhcnQuY2hhckF0KGkpID09PSBmcm9udEJ1ZmZlclBhcnQuY2hhckF0KGkpICYmIGkgPCBmcGw7IGkrKykgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0VudHJ5ICYmICgwID09PSBvZmZzZXQgJiYgKHNlbGVjdGlvbi5iZWdpbiA9IGkpLCBlbnRyaWVzICs9IGZyb250UGFydC5zbGljZShpLCBzZWxlY3Rpb24uZW5kKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYWNrUGFydCAhPT0gYmFja0J1ZmZlclBhcnQgJiYgKGJhY2tQYXJ0Lmxlbmd0aCA+IGJhY2tCdWZmZXJQYXJ0Lmxlbmd0aCA/IGVudHJpZXMgKz0gYmFja1BhcnQuc2xpY2UoMCwgMSkgOiBiYWNrUGFydC5sZW5ndGggPCBiYWNrQnVmZmVyUGFydC5sZW5ndGggJiYgKHNlbGVjdGlvbi5lbmQgKz0gYmFja0J1ZmZlclBhcnQubGVuZ3RoIC0gYmFja1BhcnQubGVuZ3RoLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0VudHJ5IHx8IFwiXCIgPT09IG9wdHMucmFkaXhQb2ludCB8fCBcIlwiICE9PSBiYWNrUGFydCB8fCBmcm9udFBhcnQuY2hhckF0KHNlbGVjdGlvbi5iZWdpbiArIG9mZnNldCAtIDEpICE9PSBvcHRzLnJhZGl4UG9pbnQgfHwgKHNlbGVjdGlvbi5iZWdpbi0tLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyaWVzID0gb3B0cy5yYWRpeFBvaW50KSkpLCB3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QnVmZmVyKCksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IHNlbGVjdGlvbi5iZWdpbiArIG9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBzZWxlY3Rpb24uZW5kICsgb2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGVudHJpZXMubGVuZ3RoID4gMCkgJC5lYWNoKGVudHJpZXMuc3BsaXQoXCJcIiksIGZ1bmN0aW9uKG5keCwgZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleXByZXNzID0gbmV3ICQuRXZlbnQoXCJrZXlwcmVzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cHJlc3Mud2hpY2ggPSBlbnRyeS5jaGFyQ29kZUF0KDApLCBpZ25vcmFibGUgPSAhMSwgRXZlbnRIYW5kbGVycy5rZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQsIGtleXByZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5iZWdpbiA9PT0gc2VsZWN0aW9uLmVuZCAtIDEgJiYgKHNlbGVjdGlvbi5iZWdpbiA9IHNlZWtQcmV2aW91cyhzZWxlY3Rpb24uYmVnaW4gKyAxKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5iZWdpbiA9PT0gc2VsZWN0aW9uLmVuZCAtIDEgPyBjYXJldChpbnB1dCwgc2VsZWN0aW9uLmJlZ2luKSA6IGNhcmV0KGlucHV0LCBzZWxlY3Rpb24uYmVnaW4sIHNlbGVjdGlvbi5lbmQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleWRvd24gPSBuZXcgJC5FdmVudChcImtleWRvd25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleWRvd24ua2V5Q29kZSA9IG9wdHMubnVtZXJpY0lucHV0ID8gSW5wdXRtYXNrLmtleUNvZGUuQkFDS1NQQUNFIDogSW5wdXRtYXNrLmtleUNvZGUuREVMRVRFLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXZlbnRIYW5kbGVycy5rZXlkb3duRXZlbnQuY2FsbChpbnB1dCwga2V5ZG93biksICExID09PSBvcHRzLmluc2VydE1vZGUgJiYgY2FyZXQoaW5wdXQsIGNhcmV0KGlucHV0KS5iZWdpbiAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldFZhbHVlRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dG1hc2sucmVmcmVzaFZhbHVlID0gITE7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICh2YWx1ZSA9IGUgJiYgZS5kZXRhaWwgPyBlLmRldGFpbFswXSA6IGFyZ3VtZW50c1sxXSkgfHwgdGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKTtcbiAgICAgICAgICAgICAgICAgICAgJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVNYXNrKSAmJiAodmFsdWUgPSBvcHRzLm9uQmVmb3JlTWFzay5jYWxsKGlucHV0bWFzaywgdmFsdWUsIG9wdHMpIHx8IHZhbHVlKSwgXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCJcIiksIGNoZWNrVmFsKHRoaXMsICEwLCAhMSwgaXNSVEwgPyB2YWx1ZS5yZXZlcnNlKCkgOiB2YWx1ZSksIFxuICAgICAgICAgICAgICAgICAgICB1bmRvVmFsdWUgPSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpLCAob3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyB8fCBvcHRzLmNsZWFySW5jb21wbGV0ZSkgJiYgdGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgPT09IGdldEJ1ZmZlclRlbXBsYXRlKCkuam9pbihcIlwiKSAmJiB0aGlzLmlucHV0bWFzay5fdmFsdWVTZXQoXCJcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmb2N1c0V2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBucHRWYWx1ZSA9IHRoaXMuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRzLnNob3dNYXNrT25Gb2N1cyAmJiAoIW9wdHMuc2hvd01hc2tPbkhvdmVyIHx8IG9wdHMuc2hvd01hc2tPbkhvdmVyICYmIFwiXCIgPT09IG5wdFZhbHVlKSAmJiAodGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikgPyB3cml0ZUJ1ZmZlcih0aGlzLCBnZXRCdWZmZXIoKSwgc2Vla05leHQoZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSkpIDogITEgPT09IG1vdXNlRW50ZXIgJiYgY2FyZXQodGhpcywgc2Vla05leHQoZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSkpKSwgXG4gICAgICAgICAgICAgICAgICAgICEwID09PSBvcHRzLnBvc2l0aW9uQ2FyZXRPblRhYiAmJiAhMSA9PT0gbW91c2VFbnRlciAmJiBFdmVudEhhbmRsZXJzLmNsaWNrRXZlbnQuYXBwbHkodGhpcywgWyBlLCAhMCBdKSwgXG4gICAgICAgICAgICAgICAgICAgIHVuZG9WYWx1ZSA9IGdldEJ1ZmZlcigpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb3VzZWxlYXZlRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vdXNlRW50ZXIgPSAhMSwgb3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QnVmZmVyKCkuc2xpY2UoKSwgbnB0VmFsdWUgPSB0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdFZhbHVlICE9PSB0aGlzLmdldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIpICYmIFwiXCIgIT09IG5wdFZhbHVlICYmICgtMSA9PT0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSAmJiBucHRWYWx1ZSA9PT0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpID8gYnVmZmVyID0gW10gOiBjbGVhck9wdGlvbmFsVGFpbChidWZmZXIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKHRoaXMsIGJ1ZmZlcikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbGlja0V2ZW50OiBmdW5jdGlvbihlLCB0YWJiZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZENhcmV0ID0gY2FyZXQoaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWJiZWQgJiYgKGlzUlRMID8gc2VsZWN0ZWRDYXJldC5lbmQgPSBzZWxlY3RlZENhcmV0LmJlZ2luIDogc2VsZWN0ZWRDYXJldC5iZWdpbiA9IHNlbGVjdGVkQ2FyZXQuZW5kKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJldC5iZWdpbiA9PT0gc2VsZWN0ZWRDYXJldC5lbmQpIHN3aXRjaCAob3B0cy5wb3NpdGlvbkNhcmV0T25DbGljaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vbmVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIDAsIGdldEJ1ZmZlcigpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmFkaXhGb2N1c1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnVuY3Rpb24oY2xpY2tQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdnBzID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2cHNbY2xpY2tQb3NdID09PSB1bmRlZmluZWQgfHwgdnBzW2NsaWNrUG9zXS5pbnB1dCA9PT0gZ2V0UGxhY2Vob2xkZXIoY2xpY2tQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGlja1BvcyA8IHNlZWtOZXh0KC0xKSkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhQb3MgPSAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBnZXRCdWZmZXIoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtMSAhPT0gcmFkaXhQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHZwIGluIHZwcykgaWYgKHJhZGl4UG9zIDwgdnAgJiYgdnBzW3ZwXS5pbnB1dCAhPT0gZ2V0UGxhY2Vob2xkZXIodnApKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oc2VsZWN0ZWRDYXJldC5iZWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRpeFBvcyA9IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikuaW5kZXhPZihvcHRzLnJhZGl4UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIG9wdHMubnVtZXJpY0lucHV0ID8gc2Vla05leHQocmFkaXhQb3MpIDogcmFkaXhQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlnbm9yZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgc2Vla05leHQoZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWNrUG9zaXRpb24gPSBzZWxlY3RlZENhcmV0LmJlZ2luLCBsdmNsaWNrUG9zaXRpb24gPSBnZXRMYXN0VmFsaWRQb3NpdGlvbihjbGlja1Bvc2l0aW9uLCAhMCksIGxhc3RQb3NpdGlvbiA9IHNlZWtOZXh0KGx2Y2xpY2tQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGlja1Bvc2l0aW9uIDwgbGFzdFBvc2l0aW9uKSBjYXJldChpbnB1dCwgaXNNYXNrKGNsaWNrUG9zaXRpb24sICEwKSB8fCBpc01hc2soY2xpY2tQb3NpdGlvbiAtIDEsICEwKSA/IGNsaWNrUG9zaXRpb24gOiBzZWVrTmV4dChjbGlja1Bvc2l0aW9uKSk7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tsdmNsaWNrUG9zaXRpb25dLCB0dCA9IGdldFRlc3RUZW1wbGF0ZShsYXN0UG9zaXRpb24sIGx2cCA/IGx2cC5tYXRjaC5sb2NhdG9yIDogdW5kZWZpbmVkLCBsdnApLCBwbGFjZWhvbGRlciA9IGdldFBsYWNlaG9sZGVyKGxhc3RQb3NpdGlvbiwgdHQubWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgIT09IHBsYWNlaG9sZGVyICYmIGdldEJ1ZmZlcigpW2xhc3RQb3NpdGlvbl0gIT09IHBsYWNlaG9sZGVyICYmICEwICE9PSB0dC5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgJiYgITAgIT09IHR0Lm1hdGNoLm5ld0Jsb2NrTWFya2VyIHx8ICFpc01hc2sobGFzdFBvc2l0aW9uLCBvcHRzLmtlZXBTdGF0aWMpICYmIHR0Lm1hdGNoLmRlZiA9PT0gcGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UG9zID0gc2Vla05leHQobGFzdFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2tQb3NpdGlvbiA+PSBuZXdQb3MgfHwgY2xpY2tQb3NpdGlvbiA9PT0gbGFzdFBvc2l0aW9uKSAmJiAobGFzdFBvc2l0aW9uID0gbmV3UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBsYXN0UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRibGNsaWNrRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCAwLCBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY3V0RXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGNhcmV0KHRoaXMpLCBldiA9IGUub3JpZ2luYWxFdmVudCB8fCBlLCBjbGlwYm9hcmREYXRhID0gd2luZG93LmNsaXBib2FyZERhdGEgfHwgZXYuY2xpcGJvYXJkRGF0YSwgY2xpcERhdGEgPSBpc1JUTCA/IGdldEJ1ZmZlcigpLnNsaWNlKHBvcy5lbmQsIHBvcy5iZWdpbikgOiBnZXRCdWZmZXIoKS5zbGljZShwb3MuYmVnaW4sIHBvcy5lbmQpO1xuICAgICAgICAgICAgICAgICAgICBjbGlwYm9hcmREYXRhLnNldERhdGEoXCJ0ZXh0XCIsIGlzUlRMID8gY2xpcERhdGEucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiBjbGlwRGF0YS5qb2luKFwiXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kICYmIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKSwgaGFuZGxlUmVtb3ZlKHRoaXMsIElucHV0bWFzay5rZXlDb2RlLkRFTEVURSwgcG9zKSwgXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKHRoaXMsIGdldEJ1ZmZlcigpLCBnZXRNYXNrU2V0KCkucCwgZSwgdW5kb1ZhbHVlICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJsdXJFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRtYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnB0VmFsdWUgPSB0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoKSwgYnVmZmVyID0gZ2V0QnVmZmVyKCkuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIgPT09IG5wdFZhbHVlICYmIGNvbG9yTWFzayA9PT0gdW5kZWZpbmVkIHx8IChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzICYmICgtMSA9PT0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSAmJiBucHRWYWx1ZSA9PT0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpID8gYnVmZmVyID0gW10gOiBjbGVhck9wdGlvbmFsVGFpbChidWZmZXIpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAhMSA9PT0gaXNDb21wbGV0ZShidWZmZXIpICYmIChzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiaW5jb21wbGV0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApLCBvcHRzLmNsZWFySW5jb21wbGV0ZSAmJiAocmVzZXRNYXNrU2V0KCksIGJ1ZmZlciA9IG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgPyBbXSA6IGdldEJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoKSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKHRoaXMsIGJ1ZmZlciwgdW5kZWZpbmVkLCBlKSksIHVuZG9WYWx1ZSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSAmJiAodW5kb1ZhbHVlID0gYnVmZmVyLmpvaW4oXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJjaGFuZ2VcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb3VzZWVudGVyRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbW91c2VFbnRlciA9ICEwLCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzICYmIG9wdHMuc2hvd01hc2tPbkhvdmVyICYmIHRoaXMuaW5wdXRtYXNrLl92YWx1ZUdldCgpICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpICYmIHdyaXRlQnVmZmVyKHRoaXMsIGdldEJ1ZmZlcigpKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Ym1pdEV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuZG9WYWx1ZSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSAmJiAkZWwudHJpZ2dlcihcImNoYW5nZVwiKSwgb3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiAtMSA9PT0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSAmJiBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0ICYmIGVsLmlucHV0bWFzay5fdmFsdWVHZXQoKSA9PT0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpICYmIGVsLmlucHV0bWFzay5fdmFsdWVTZXQoXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLmNsZWFySW5jb21wbGV0ZSAmJiAhMSA9PT0gaXNDb21wbGV0ZShnZXRCdWZmZXIoKSkgJiYgZWwuaW5wdXRtYXNrLl92YWx1ZVNldChcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucmVtb3ZlTWFza09uU3VibWl0ICYmIChlbC5pbnB1dG1hc2suX3ZhbHVlU2V0KGVsLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCksICEwKSwgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihlbCwgZ2V0QnVmZmVyKCkpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXNldEV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmlucHV0bWFzay5yZWZyZXNoVmFsdWUgPSAhMCwgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC50cmlnZ2VyKFwic2V0dmFsdWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1ZhbChpbnB1dCwgd3JpdGVPdXQsIHN0cmljdCwgbnB0dmwsIGluaXRpYXRpbmdFdmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dFZhbHVlID0gbnB0dmwuc2xpY2UoKSwgY2hhckNvZGVzID0gXCJcIiwgaW5pdGlhbE5keCA9IC0xLCByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgaWYgKHJlc2V0TWFza1NldCgpLCBzdHJpY3QgfHwgITAgPT09IG9wdHMuYXV0b1VubWFzaykgaW5pdGlhbE5keCA9IHNlZWtOZXh0KGluaXRpYWxOZHgpOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRpY0lucHV0ID0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5zbGljZSgwLCBzZWVrTmV4dCgtMSkpLmpvaW4oXCJcIiksIG1hdGNoZXMgPSBpbnB1dFZhbHVlLmpvaW4oXCJcIikubWF0Y2gobmV3IFJlZ0V4cChcIl5cIiArIElucHV0bWFzay5lc2NhcGVSZWdleChzdGF0aWNJbnB1dCksIFwiZ1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAwICYmIChpbnB1dFZhbHVlLnNwbGljZSgwLCBtYXRjaGVzLmxlbmd0aCAqIHN0YXRpY0lucHV0Lmxlbmd0aCksIFxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsTmR4ID0gc2Vla05leHQoaW5pdGlhbE5keCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAtMSA9PT0gaW5pdGlhbE5keCA/IChnZXRNYXNrU2V0KCkucCA9IHNlZWtOZXh0KGluaXRpYWxOZHgpLCBpbml0aWFsTmR4ID0gMCkgOiBnZXRNYXNrU2V0KCkucCA9IGluaXRpYWxOZHgsIFxuICAgICAgICAgICAgICAgICQuZWFjaChpbnB1dFZhbHVlLCBmdW5jdGlvbihuZHgsIGNoYXJDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSAhPT0gdW5kZWZpbmVkKSBpZiAoZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW25keF0gPT09IHVuZGVmaW5lZCAmJiBpbnB1dFZhbHVlW25keF0gPT09IGdldFBsYWNlaG9sZGVyKG5keCkgJiYgaXNNYXNrKG5keCwgITApICYmICExID09PSBpc1ZhbGlkKG5keCwgaW5wdXRWYWx1ZVtuZHhdLCAhMCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsICEwKSkgZ2V0TWFza1NldCgpLnArKzsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5cHJlc3MgPSBuZXcgJC5FdmVudChcIl9jaGVja3ZhbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXByZXNzLndoaWNoID0gY2hhckNvZGUuY2hhckNvZGVBdCgwKSwgY2hhckNvZGVzICs9IGNoYXJDb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IGdldExhc3RWYWxpZFBvc2l0aW9uKHVuZGVmaW5lZCwgITApLCBwcmV2VGVzdCA9IGdldFRlc3QobHZwKSwgbmV4dFRlc3QgPSBnZXRUZXN0VGVtcGxhdGUobHZwICsgMSwgcHJldlRlc3QgPyBwcmV2VGVzdC5sb2NhdG9yLnNsaWNlKCkgOiB1bmRlZmluZWQsIGx2cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZ1bmN0aW9uKG5keCwgY2hhckNvZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xICE9PSBnZXRNYXNrVGVtcGxhdGUoITAsIDAsICExKS5zbGljZShuZHgsIHNlZWtOZXh0KG5keCkpLmpvaW4oXCJcIikuaW5kZXhPZihjaGFyQ29kZXMpICYmICFpc01hc2sobmR4KSAmJiAoZ2V0VGVzdChuZHgpLm1hdGNoLm5hdGl2ZURlZiA9PT0gY2hhckNvZGVzLmNoYXJBdCgwKSB8fCBcIiBcIiA9PT0gZ2V0VGVzdChuZHgpLm1hdGNoLm5hdGl2ZURlZiAmJiBnZXRUZXN0KG5keCArIDEpLm1hdGNoLm5hdGl2ZURlZiA9PT0gY2hhckNvZGVzLmNoYXJBdCgwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KGluaXRpYWxOZHgsIGNoYXJDb2RlcykgfHwgc3RyaWN0IHx8IG9wdHMuYXV0b1VubWFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBzdHJpY3QgPyBuZHggOiBudWxsID09IG5leHRUZXN0Lm1hdGNoLmZuICYmIG5leHRUZXN0Lm1hdGNoLm9wdGlvbmFsaXR5ICYmIGx2cCArIDEgPCBnZXRNYXNrU2V0KCkucCA/IGx2cCArIDEgOiBnZXRNYXNrU2V0KCkucDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVzdWx0ID0gRXZlbnRIYW5kbGVycy5rZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQsIGtleXByZXNzLCAhMCwgITEsIHN0cmljdCwgcG9zKSkgJiYgKGluaXRpYWxOZHggPSBwb3MgKyAxLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZXMgPSBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSBFdmVudEhhbmRsZXJzLmtleXByZXNzRXZlbnQuY2FsbChpbnB1dCwga2V5cHJlc3MsICEwLCAhMSwgITAsIGx2cCArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIodW5kZWZpbmVkLCBnZXRCdWZmZXIoKSwgcmVzdWx0LmZvcndhcmRQb3NpdGlvbiwga2V5cHJlc3MsICExKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCB3cml0ZU91dCAmJiB3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QnVmZmVyKCksIHJlc3VsdCA/IHJlc3VsdC5mb3J3YXJkUG9zaXRpb24gOiB1bmRlZmluZWQsIGluaXRpYXRpbmdFdmVudCB8fCBuZXcgJC5FdmVudChcImNoZWNrdmFsXCIpLCBpbml0aWF0aW5nRXZlbnQgJiYgXCJpbnB1dFwiID09PSBpbml0aWF0aW5nRXZlbnQudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB1bm1hc2tlZHZhbHVlKGlucHV0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5pbnB1dG1hc2sgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5pbnB1dG1hc2sgJiYgaW5wdXQuaW5wdXRtYXNrLnJlZnJlc2hWYWx1ZSAmJiBFdmVudEhhbmRsZXJzLnNldFZhbHVlRXZlbnQuY2FsbChpbnB1dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB1bVZhbHVlID0gW10sIHZwcyA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwbmR4IGluIHZwcykgdnBzW3BuZHhdLm1hdGNoICYmIG51bGwgIT0gdnBzW3BuZHhdLm1hdGNoLmZuICYmIHVtVmFsdWUucHVzaCh2cHNbcG5keF0uaW5wdXQpO1xuICAgICAgICAgICAgICAgIHZhciB1bm1hc2tlZFZhbHVlID0gMCA9PT0gdW1WYWx1ZS5sZW5ndGggPyBcIlwiIDogKGlzUlRMID8gdW1WYWx1ZS5yZXZlcnNlKCkgOiB1bVZhbHVlKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24ob3B0cy5vblVuTWFzaykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlclZhbHVlID0gKGlzUlRMID8gZ2V0QnVmZmVyKCkuc2xpY2UoKS5yZXZlcnNlKCkgOiBnZXRCdWZmZXIoKSkuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdW5tYXNrZWRWYWx1ZSA9IG9wdHMub25Vbk1hc2suY2FsbChpbnB1dG1hc2ssIGJ1ZmZlclZhbHVlLCB1bm1hc2tlZFZhbHVlLCBvcHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVubWFza2VkVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB0cmFuc2xhdGVQb3NpdGlvbihwb3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWlzUlRMIHx8IFwibnVtYmVyXCIgIT0gdHlwZW9mIHBvcyB8fCBvcHRzLmdyZWVkeSAmJiBcIlwiID09PSBvcHRzLnBsYWNlaG9sZGVyIHx8IChwb3MgPSBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoIC0gcG9zKSwgXG4gICAgICAgICAgICAgICAgcG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gY2FyZXQoaW5wdXQsIGJlZ2luLCBlbmQsIG5vdHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlO1xuICAgICAgICAgICAgICAgIGlmIChiZWdpbiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gaW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2UgPyAoYmVnaW4gPSBpbnB1dC5zZWxlY3Rpb25TdGFydCwgXG4gICAgICAgICAgICAgICAgZW5kID0gaW5wdXQuc2VsZWN0aW9uRW5kKSA6IHdpbmRvdy5nZXRTZWxlY3Rpb24gPyAocmFuZ2UgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKSkuY29tbW9uQW5jZXN0b3JDb250YWluZXIucGFyZW50Tm9kZSAhPT0gaW5wdXQgJiYgcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXIgIT09IGlucHV0IHx8IChiZWdpbiA9IHJhbmdlLnN0YXJ0T2Zmc2V0LCBcbiAgICAgICAgICAgICAgICBlbmQgPSByYW5nZS5lbmRPZmZzZXQpIDogZG9jdW1lbnQuc2VsZWN0aW9uICYmIGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSAmJiAoZW5kID0gKGJlZ2luID0gMCAtIChyYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpKS5kdXBsaWNhdGUoKS5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIiwgLWlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKS5sZW5ndGgpKSArIHJhbmdlLnRleHQubGVuZ3RoKSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbjogbm90cmFuc2xhdGUgPyBiZWdpbiA6IHRyYW5zbGF0ZVBvc2l0aW9uKGJlZ2luKSxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBub3RyYW5zbGF0ZSA/IGVuZCA6IHRyYW5zbGF0ZVBvc2l0aW9uKGVuZClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICgkLmlzQXJyYXkoYmVnaW4pICYmIChlbmQgPSBpc1JUTCA/IGJlZ2luWzBdIDogYmVnaW5bMV0sIGJlZ2luID0gaXNSVEwgPyBiZWdpblsxXSA6IGJlZ2luWzBdKSwgXG4gICAgICAgICAgICAgICAgYmVnaW4uYmVnaW4gIT09IHVuZGVmaW5lZCAmJiAoZW5kID0gaXNSVEwgPyBiZWdpbi5iZWdpbiA6IGJlZ2luLmVuZCwgYmVnaW4gPSBpc1JUTCA/IGJlZ2luLmVuZCA6IGJlZ2luLmJlZ2luKSwgXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIiA9PSB0eXBlb2YgYmVnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW4gPSBub3RyYW5zbGF0ZSA/IGJlZ2luIDogdHJhbnNsYXRlUG9zaXRpb24oYmVnaW4pLCBlbmQgPSBcIm51bWJlclwiID09IHR5cGVvZiAoZW5kID0gbm90cmFuc2xhdGUgPyBlbmQgOiB0cmFuc2xhdGVQb3NpdGlvbihlbmQpKSA/IGVuZCA6IGJlZ2luO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsQ2FsYyA9IHBhcnNlSW50KCgoaW5wdXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cpLmdldENvbXB1dGVkU3R5bGUgPyAoaW5wdXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cpLmdldENvbXB1dGVkU3R5bGUoaW5wdXQsIG51bGwpIDogaW5wdXQuY3VycmVudFN0eWxlKS5mb250U2l6ZSkgKiBlbmQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5zY3JvbGxMZWZ0ID0gc2Nyb2xsQ2FsYyA+IGlucHV0LnNjcm9sbFdpZHRoID8gc2Nyb2xsQ2FsYyA6IDAsIGlwaG9uZSB8fCAhMSAhPT0gb3B0cy5pbnNlcnRNb2RlIHx8IGJlZ2luICE9PSBlbmQgfHwgZW5kKyssIFxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5pbnB1dG1hc2suY2FyZXRQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogYmVnaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGVuZFxuICAgICAgICAgICAgICAgICAgICB9LCBpbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSkgaW5wdXQuc2VsZWN0aW9uU3RhcnQgPSBiZWdpbiwgaW5wdXQuc2VsZWN0aW9uRW5kID0gZW5kOyBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLCBpbnB1dC5maXJzdENoaWxkID09PSB1bmRlZmluZWQgfHwgbnVsbCA9PT0gaW5wdXQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KGlucHV0LmZpcnN0Q2hpbGQsIGJlZ2luIDwgaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCA/IGJlZ2luIDogaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2V0RW5kKGlucHV0LmZpcnN0Q2hpbGQsIGVuZCA8IGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKS5sZW5ndGggPyBlbmQgOiBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSghMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpLCBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaW5wdXQuY3JlYXRlVGV4dFJhbmdlICYmICgocmFuZ2UgPSBpbnB1dC5jcmVhdGVUZXh0UmFuZ2UoKSkuY29sbGFwc2UoITApLCBcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UubW92ZUVuZChcImNoYXJhY3RlclwiLCBlbmQpLCByYW5nZS5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIiwgYmVnaW4pLCByYW5nZS5zZWxlY3QoKSk7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbG9yTWFzayhpbnB1dCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IGJlZ2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBlbmRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZGV0ZXJtaW5lTGFzdFJlcXVpcmVkUG9zaXRpb24ocmV0dXJuRGVmaW5pdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciBwb3MsIHRlc3RQb3MsIGJ1ZmZlciA9IGdldE1hc2tUZW1wbGF0ZSghMCwgZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSwgITAsICEwKSwgYmwgPSBidWZmZXIubGVuZ3RoLCBsdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpLCBwb3NpdGlvbnMgPSB7fSwgbHZUZXN0ID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2x2cF0sIG5keEludGx6ciA9IGx2VGVzdCAhPT0gdW5kZWZpbmVkID8gbHZUZXN0LmxvY2F0b3Iuc2xpY2UoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBmb3IgKHBvcyA9IGx2cCArIDE7IHBvcyA8IGJ1ZmZlci5sZW5ndGg7IHBvcysrKSBuZHhJbnRsenIgPSAodGVzdFBvcyA9IGdldFRlc3RUZW1wbGF0ZShwb3MsIG5keEludGx6ciwgcG9zIC0gMSkpLmxvY2F0b3Iuc2xpY2UoKSwgXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zW3Bvc10gPSAkLmV4dGVuZCghMCwge30sIHRlc3RQb3MpO1xuICAgICAgICAgICAgICAgIHZhciBsdlRlc3RBbHQgPSBsdlRlc3QgJiYgbHZUZXN0LmFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQgPyBsdlRlc3QubG9jYXRvcltsdlRlc3QuYWx0ZXJuYXRpb25dIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGZvciAocG9zID0gYmwgLSAxOyBwb3MgPiBsdnAgJiYgKCgodGVzdFBvcyA9IHBvc2l0aW9uc1twb3NdKS5tYXRjaC5vcHRpb25hbGl0eSB8fCB0ZXN0UG9zLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciAmJiB0ZXN0UG9zLm1hdGNoLm5ld0Jsb2NrTWFya2VyIHx8IGx2VGVzdEFsdCAmJiAobHZUZXN0QWx0ICE9PSBwb3NpdGlvbnNbcG9zXS5sb2NhdG9yW2x2VGVzdC5hbHRlcm5hdGlvbl0gJiYgbnVsbCAhPSB0ZXN0UG9zLm1hdGNoLmZuIHx8IG51bGwgPT09IHRlc3RQb3MubWF0Y2guZm4gJiYgdGVzdFBvcy5sb2NhdG9yW2x2VGVzdC5hbHRlcm5hdGlvbl0gJiYgY2hlY2tBbHRlcm5hdGlvbk1hdGNoKHRlc3RQb3MubG9jYXRvcltsdlRlc3QuYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpLCBsdlRlc3RBbHQudG9TdHJpbmcoKS5zcGxpdChcIixcIikpICYmIFwiXCIgIT09IGdldFRlc3RzKHBvcylbMF0uZGVmKSkgJiYgYnVmZmVyW3Bvc10gPT09IGdldFBsYWNlaG9sZGVyKHBvcywgdGVzdFBvcy5tYXRjaCkpOyBwb3MtLSkgYmwtLTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuRGVmaW5pdGlvbiA/IHtcbiAgICAgICAgICAgICAgICAgICAgbDogYmwsXG4gICAgICAgICAgICAgICAgICAgIGRlZjogcG9zaXRpb25zW2JsXSA/IHBvc2l0aW9uc1tibF0ubWF0Y2ggOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9IDogYmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhck9wdGlvbmFsVGFpbChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsbW50LCB0ZW1wbGF0ZSA9IGdldE1hc2tUZW1wbGF0ZSghMCwgMCwgITAsIHVuZGVmaW5lZCwgITApOyAobG1udCA9IHRlbXBsYXRlLnNoaWZ0KCkpICE9PSB1bmRlZmluZWQ7ICkgYnVmZmVyLnB1c2gobG1udCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzQ29tcGxldGUoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRzLmlzQ29tcGxldGUpKSByZXR1cm4gb3B0cy5pc0NvbXBsZXRlKGJ1ZmZlciwgb3B0cyk7XG4gICAgICAgICAgICAgICAgaWYgKFwiKlwiID09PSBvcHRzLnJlcGVhdCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB2YXIgY29tcGxldGUgPSAhMSwgbHJwID0gZGV0ZXJtaW5lTGFzdFJlcXVpcmVkUG9zaXRpb24oITApLCBhbWwgPSBzZWVrUHJldmlvdXMobHJwLmwpO1xuICAgICAgICAgICAgICAgIGlmIChscnAuZGVmID09PSB1bmRlZmluZWQgfHwgbHJwLmRlZi5uZXdCbG9ja01hcmtlciB8fCBscnAuZGVmLm9wdGlvbmFsaXR5IHx8IGxycC5kZWYub3B0aW9uYWxRdWFudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gITA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGFtbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IGdldFRlc3RUZW1wbGF0ZShpKS5tYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSB0ZXN0LmZuICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXSA9PT0gdW5kZWZpbmVkICYmICEwICE9PSB0ZXN0Lm9wdGlvbmFsaXR5ICYmICEwICE9PSB0ZXN0Lm9wdGlvbmFsUXVhbnRpZmllciB8fCBudWxsID09PSB0ZXN0LmZuICYmIGJ1ZmZlcltpXSAhPT0gZ2V0UGxhY2Vob2xkZXIoaSwgdGVzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wbGV0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlbW92ZShpbnB1dCwgaywgcG9zLCBzdHJpY3QsIGZyb21Jc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgaWYgKChvcHRzLm51bWVyaWNJbnB1dCB8fCBpc1JUTCkgJiYgKGsgPT09IElucHV0bWFzay5rZXlDb2RlLkJBQ0tTUEFDRSA/IGsgPSBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEUgOiBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEUgJiYgKGsgPSBJbnB1dG1hc2sua2V5Q29kZS5CQUNLU1BBQ0UpLCBcbiAgICAgICAgICAgICAgICBpc1JUTCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmQgPSBwb3MuZW5kO1xuICAgICAgICAgICAgICAgICAgICBwb3MuZW5kID0gcG9zLmJlZ2luLCBwb3MuYmVnaW4gPSBwZW5kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuQkFDS1NQQUNFICYmIChwb3MuZW5kIC0gcG9zLmJlZ2luIDwgMSB8fCAhMSA9PT0gb3B0cy5pbnNlcnRNb2RlKSA/IChwb3MuYmVnaW4gPSBzZWVrUHJldmlvdXMocG9zLmJlZ2luKSwgXG4gICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvcy5iZWdpbl0gIT09IHVuZGVmaW5lZCAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zLmJlZ2luXS5pbnB1dCA9PT0gb3B0cy5ncm91cFNlcGFyYXRvciAmJiBwb3MuYmVnaW4tLSwgXG4gICAgICAgICAgICAgICAgITEgPT09IG9wdHMuaW5zZXJ0TW9kZSAmJiBwb3MuZW5kICE9PSBnZXRNYXNrU2V0KCkubWFza0xlbmd0aCAmJiBwb3MuZW5kLS0pIDogayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuREVMRVRFICYmIHBvcy5iZWdpbiA9PT0gcG9zLmVuZCAmJiAocG9zLmVuZCA9IGlzTWFzayhwb3MuZW5kLCAhMCkgJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvcy5lbmRdICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3MuZW5kXS5pbnB1dCAhPT0gb3B0cy5yYWRpeFBvaW50ID8gcG9zLmVuZCArIDEgOiBzZWVrTmV4dChwb3MuZW5kKSArIDEsIFxuICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3MuYmVnaW5dICE9PSB1bmRlZmluZWQgJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvcy5iZWdpbl0uaW5wdXQgPT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IgJiYgcG9zLmVuZCsrKSwgXG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZU1hc2socG9zKSwgITAgIT09IHN0cmljdCAmJiAhMSAhPT0gb3B0cy5rZWVwU3RhdGljIHx8IG51bGwgIT09IG9wdHMucmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGFsdGVybmF0ZSghMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdQb3MgPSByZXN1bHQuY2FyZXQgIT09IHVuZGVmaW5lZCA/IHJlc3VsdC5jYXJldCA6IHJlc3VsdC5wb3MgPyBzZWVrTmV4dChyZXN1bHQucG9zLmJlZ2luID8gcmVzdWx0LnBvcy5iZWdpbiA6IHJlc3VsdC5wb3MpIDogZ2V0TGFzdFZhbGlkUG9zaXRpb24oLTEsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIChrICE9PSBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEUgfHwgcG9zLmJlZ2luID4gbmV3UG9zKSAmJiBwb3MuYmVnaW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGx2cCA9IGdldExhc3RWYWxpZFBvc2l0aW9uKHBvcy5iZWdpbiwgITApO1xuICAgICAgICAgICAgICAgIGlmIChsdnAgPCBwb3MuYmVnaW4gfHwgLTEgPT09IHBvcy5iZWdpbikgZ2V0TWFza1NldCgpLnAgPSBzZWVrTmV4dChsdnApOyBlbHNlIGlmICghMCAhPT0gc3RyaWN0ICYmIChnZXRNYXNrU2V0KCkucCA9IHBvcy5iZWdpbiwgXG4gICAgICAgICAgICAgICAgITAgIT09IGZyb21Jc1ZhbGlkKSkgZm9yICg7Z2V0TWFza1NldCgpLnAgPCBsdnAgJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2dldE1hc2tTZXQoKS5wXSA9PT0gdW5kZWZpbmVkOyApIGdldE1hc2tTZXQoKS5wKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXplQ29sb3JNYXNrKGlucHV0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXB1dGVkU3R5bGUgPSAoaW5wdXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cpLmdldENvbXB1dGVkU3R5bGUoaW5wdXQsIG51bGwpO1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUuc3R5bGUud2lkdGggPSBjb21wdXRlZFN0eWxlLndpZHRoLCB0ZW1wbGF0ZS5zdHlsZS50ZXh0QWxpZ24gPSBjb21wdXRlZFN0eWxlLnRleHRBbGlnbiwgXG4gICAgICAgICAgICAgICAgY29sb3JNYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgaW5wdXQuaW5wdXRtYXNrLmNvbG9yTWFzayA9IGNvbG9yTWFzaywgXG4gICAgICAgICAgICAgICAgY29sb3JNYXNrLmNsYXNzTmFtZSA9IFwiaW0tY29sb3JtYXNrXCIsIGlucHV0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbG9yTWFzaywgaW5wdXQpLCBcbiAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlucHV0KSwgY29sb3JNYXNrLmFwcGVuZENoaWxkKGlucHV0KSwgY29sb3JNYXNrLmFwcGVuZENoaWxkKHRlbXBsYXRlKSwgXG4gICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUubGVmdCA9IHRlbXBsYXRlLm9mZnNldExlZnQgKyBcInB4XCIsICQoY29sb3JNYXNrKS5vbihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRXZlbnRIYW5kbGVycy5tb3VzZWxlYXZlRXZlbnQuY2FsbChpbnB1dCwgWyBlIF0pO1xuICAgICAgICAgICAgICAgIH0pLCAkKGNvbG9yTWFzaykub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEV2ZW50SGFuZGxlcnMubW91c2VlbnRlckV2ZW50LmNhbGwoaW5wdXQsIFsgZSBdKTtcbiAgICAgICAgICAgICAgICB9KSwgJChjb2xvck1hc2spLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FyZXQoaW5wdXQsIGZ1bmN0aW9uKGNsaWVudHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcywgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgc3R5bGUgaW4gY29tcHV0ZWRTdHlsZSkgaXNOYU4oc3R5bGUpICYmIC0xICE9PSBzdHlsZS5pbmRleE9mKFwiZm9udFwiKSAmJiAoZS5zdHlsZVtzdHlsZV0gPSBjb21wdXRlZFN0eWxlW3N0eWxlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0eWxlLnRleHRUcmFuc2Zvcm0gPSBjb21wdXRlZFN0eWxlLnRleHRUcmFuc2Zvcm0sIGUuc3R5bGUubGV0dGVyU3BhY2luZyA9IGNvbXB1dGVkU3R5bGUubGV0dGVyU3BhY2luZywgXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiLCBlLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiLCBlLnN0eWxlLndpZHRoID0gXCJhdXRvXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIiwgZS5zdHlsZS53aGl0ZVNwYWNlID0gXCJub3dyYXBcIiwgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGwsIGlucHV0VGV4dCA9IGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKSwgcHJldmlvdXNXaWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNhcmV0UG9zID0gMCwgaXRsID0gaW5wdXRUZXh0Lmxlbmd0aDsgY2FyZXRQb3MgPD0gaXRsOyBjYXJldFBvcysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuaW5uZXJIVE1MICs9IGlucHV0VGV4dC5jaGFyQXQoY2FyZXRQb3MpIHx8IFwiX1wiLCBlLm9mZnNldFdpZHRoID49IGNsaWVudHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldDEgPSBjbGllbnR4IC0gcHJldmlvdXNXaWR0aCwgb2Zmc2V0MiA9IGUub2Zmc2V0V2lkdGggLSBjbGllbnR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmlubmVySFRNTCA9IGlucHV0VGV4dC5jaGFyQXQoY2FyZXRQb3MpLCBjYXJldFBvcyA9IChvZmZzZXQxIC09IGUub2Zmc2V0V2lkdGggLyAzKSA8IG9mZnNldDIgPyBjYXJldFBvcyAtIDEgOiBjYXJldFBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzV2lkdGggPSBlLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZSksIGNhcmV0UG9zO1xuICAgICAgICAgICAgICAgICAgICB9KGUuY2xpZW50WCkpLCBFdmVudEhhbmRsZXJzLmNsaWNrRXZlbnQuY2FsbChpbnB1dCwgWyBlIF0pO1xuICAgICAgICAgICAgICAgIH0pLCAkKGlucHV0KS5vbihcImtleWRvd25cIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnNoaWZ0S2V5IHx8ICExID09PSBvcHRzLmluc2VydE1vZGUgfHwgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbG9yTWFzayhpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcmVuZGVyQ29sb3JNYXNrKGlucHV0LCBjYXJldFBvcywgY2xlYXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVzdCwgdGVzdFBvcywgbmR4SW50bHpyLCBtYXNrVGVtcGxhdGUgPSBbXSwgaXNTdGF0aWMgPSAhMSwgcG9zID0gMDtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZXRFbnRyeShlbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCAmJiAoZW50cnkgPSBcIlwiKSwgaXNTdGF0aWMgfHwgbnVsbCAhPT0gdGVzdC5mbiAmJiB0ZXN0UG9zLmlucHV0ICE9PSB1bmRlZmluZWQpIGlmIChpc1N0YXRpYyAmJiAobnVsbCAhPT0gdGVzdC5mbiAmJiB0ZXN0UG9zLmlucHV0ICE9PSB1bmRlZmluZWQgfHwgXCJcIiA9PT0gdGVzdC5kZWYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N0YXRpYyA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG10bCA9IG1hc2tUZW1wbGF0ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrVGVtcGxhdGVbbXRsIC0gMV0gPSBtYXNrVGVtcGxhdGVbbXRsIC0gMV0gKyBcIjwvc3Bhbj5cIiwgbWFza1RlbXBsYXRlLnB1c2goZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgbWFza1RlbXBsYXRlLnB1c2goZW50cnkpOyBlbHNlIGlzU3RhdGljID0gITAsIG1hc2tUZW1wbGF0ZS5wdXNoKFwiPHNwYW4gY2xhc3M9J2ltLXN0YXRpYyc+XCIgKyBlbnRyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb2xvck1hc2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QnVmZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXJldFBvcyA9PT0gdW5kZWZpbmVkID8gY2FyZXRQb3MgPSBjYXJldChpbnB1dCkgOiBjYXJldFBvcy5iZWdpbiA9PT0gdW5kZWZpbmVkICYmIChjYXJldFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBjYXJldFBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogY2FyZXRQb3NcbiAgICAgICAgICAgICAgICAgICAgfSksICEwICE9PSBjbGVhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IGdldExhc3RWYWxpZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10gPyAodGVzdFBvcyA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0ID0gdGVzdFBvcy5tYXRjaCwgbmR4SW50bHpyID0gdGVzdFBvcy5sb2NhdG9yLnNsaWNlKCksIHNldEVudHJ5KGJ1ZmZlcltwb3NdKSkgOiAodGVzdFBvcyA9IGdldFRlc3RUZW1wbGF0ZShwb3MsIG5keEludGx6ciwgcG9zIC0gMSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3QgPSB0ZXN0UG9zLm1hdGNoLCBuZHhJbnRsenIgPSB0ZXN0UG9zLmxvY2F0b3Iuc2xpY2UoKSwgITEgPT09IG9wdHMuaml0TWFza2luZyB8fCBwb3MgPCBsdnAgfHwgXCJudW1iZXJcIiA9PSB0eXBlb2Ygb3B0cy5qaXRNYXNraW5nICYmIGlzRmluaXRlKG9wdHMuaml0TWFza2luZykgJiYgb3B0cy5qaXRNYXNraW5nID4gcG9zID8gc2V0RW50cnkoZ2V0UGxhY2Vob2xkZXIocG9zLCB0ZXN0KSkgOiBpc1N0YXRpYyA9ICExKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlICgobWF4TGVuZ3RoID09PSB1bmRlZmluZWQgfHwgcG9zIDwgbWF4TGVuZ3RoKSAmJiAobnVsbCAhPT0gdGVzdC5mbiB8fCBcIlwiICE9PSB0ZXN0LmRlZikgfHwgbHZwID4gcG9zIHx8IGlzU3RhdGljKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU3RhdGljICYmIHNldEVudHJ5KCksIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGlucHV0ICYmIChtYXNrVGVtcGxhdGUuc3BsaWNlKGNhcmV0UG9zLmJlZ2luLCAwLCBjYXJldFBvcy5iZWdpbiA9PT0gY2FyZXRQb3MuZW5kIHx8IGNhcmV0UG9zLmVuZCA+IGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoID8gJzxtYXJrIGNsYXNzPVwiaW0tY2FyZXRcIiBzdHlsZT1cImJvcmRlci1yaWdodC13aWR0aDogMXB4O2JvcmRlci1yaWdodC1zdHlsZTogc29saWQ7XCI+JyA6ICc8bWFyayBjbGFzcz1cImltLWNhcmV0LXNlbGVjdFwiPicpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tUZW1wbGF0ZS5zcGxpY2UoY2FyZXRQb3MuZW5kICsgMSwgMCwgXCI8L21hcms+XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBjb2xvck1hc2suZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJkaXZcIilbMF07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IG1hc2tUZW1wbGF0ZS5qb2luKFwiXCIpLCBpbnB1dC5pbnB1dG1hc2sucG9zaXRpb25Db2xvck1hc2soaW5wdXQsIHRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoSW5wdXRtYXNrLnByb3RvdHlwZS5wb3NpdGlvbkNvbG9yTWFzayA9IGZ1bmN0aW9uKGlucHV0LCB0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmxlZnQgPSB0ZW1wbGF0ZS5vZmZzZXRMZWZ0ICsgXCJweFwiO1xuICAgICAgICAgICAgfSwgYWN0aW9uT2JqICE9PSB1bmRlZmluZWQpIHN3aXRjaCAoYWN0aW9uT2JqLmFjdGlvbikge1xuICAgICAgICAgICAgICBjYXNlIFwiaXNDb21wbGV0ZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBlbCA9IGFjdGlvbk9iai5lbCwgaXNDb21wbGV0ZShnZXRCdWZmZXIoKSk7XG5cbiAgICAgICAgICAgICAgY2FzZSBcInVubWFza2VkdmFsdWVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwgIT09IHVuZGVmaW5lZCAmJiBhY3Rpb25PYmoudmFsdWUgPT09IHVuZGVmaW5lZCB8fCAodmFsdWVCdWZmZXIgPSBhY3Rpb25PYmoudmFsdWUsIFxuICAgICAgICAgICAgICAgIHZhbHVlQnVmZmVyID0gKCQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlTWFzaykgJiYgb3B0cy5vbkJlZm9yZU1hc2suY2FsbChpbnB1dG1hc2ssIHZhbHVlQnVmZmVyLCBvcHRzKSB8fCB2YWx1ZUJ1ZmZlcikuc3BsaXQoXCJcIiksIFxuICAgICAgICAgICAgICAgIGNoZWNrVmFsKHVuZGVmaW5lZCwgITEsICExLCBpc1JUTCA/IHZhbHVlQnVmZmVyLnJldmVyc2UoKSA6IHZhbHVlQnVmZmVyKSwgJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVXcml0ZSkgJiYgb3B0cy5vbkJlZm9yZVdyaXRlLmNhbGwoaW5wdXRtYXNrLCB1bmRlZmluZWQsIGdldEJ1ZmZlcigpLCAwLCBvcHRzKSksIFxuICAgICAgICAgICAgICAgIHVubWFza2VkdmFsdWUoZWwpO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJtYXNrXCI6XG4gICAgICAgICAgICAgICAgIWZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vZmYoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1N1cHBvcnRlZCA9IGZ1bmN0aW9uKGlucHV0LCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudFR5cGUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpLCBpc1N1cHBvcnRlZCA9IFwiSU5QVVRcIiA9PT0gaW5wdXQudGFnTmFtZSAmJiAtMSAhPT0gJC5pbkFycmF5KGVsZW1lbnRUeXBlLCBvcHRzLnN1cHBvcnRzSW5wdXRUeXBlKSB8fCBpbnB1dC5pc0NvbnRlbnRFZGl0YWJsZSB8fCBcIlRFWFRBUkVBXCIgPT09IGlucHV0LnRhZ05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU3VwcG9ydGVkKSBpZiAoXCJJTlBVVFwiID09PSBpbnB1dC50YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgZWxlbWVudFR5cGUpLCBpc1N1cHBvcnRlZCA9IFwidGV4dFwiID09PSBlbC50eXBlLCBlbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaXNTdXBwb3J0ZWQgPSBcInBhcnRpYWxcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMSAhPT0gaXNTdXBwb3J0ZWQgPyBmdW5jdGlvbihucHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVHZXQsIHZhbHVlU2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldHRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRtYXNrID8gdGhpcy5pbnB1dG1hc2sub3B0cy5hdXRvVW5tYXNrID8gdGhpcy5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpIDogLTEgIT09IGdldExhc3RWYWxpZFBvc2l0aW9uKCkgfHwgITAgIT09IG9wdHMubnVsbGFibGUgPyBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzICYmIG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgPyAoaXNSVEwgPyBjbGVhck9wdGlvbmFsVGFpbChnZXRCdWZmZXIoKS5zbGljZSgpKS5yZXZlcnNlKCkgOiBjbGVhck9wdGlvbmFsVGFpbChnZXRCdWZmZXIoKS5zbGljZSgpKSkuam9pbihcIlwiKSA6IHZhbHVlR2V0LmNhbGwodGhpcykgOiBcIlwiIDogdmFsdWVHZXQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0dGVyKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcywgdmFsdWUpLCB0aGlzLmlucHV0bWFzayAmJiAkKHRoaXMpLnRyaWdnZXIoXCJzZXR2YWx1ZVwiLCBbIHZhbHVlIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5wdC5pbnB1dG1hc2suX192YWx1ZUdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgIT09IG9wdHMubm9WYWx1ZVBhdGNoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YgPSBcIm9iamVjdFwiID09PSBfdHlwZW9mKFwidGVzdFwiLl9fcHJvdG9fXykgPyBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5fX3Byb3RvX187XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVQcm9wZXJ0eSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKG5wdCksIFwidmFsdWVcIikgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eSAmJiB2YWx1ZVByb3BlcnR5LmdldCAmJiB2YWx1ZVByb3BlcnR5LnNldCA/ICh2YWx1ZUdldCA9IHZhbHVlUHJvcGVydHkuZ2V0LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldCA9IHZhbHVlUHJvcGVydHkuc2V0LCBPYmplY3QuZGVmaW5lUHJvcGVydHkobnB0LCBcInZhbHVlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldDogc2V0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIDogXCJJTlBVVFwiICE9PSBucHQudGFnTmFtZSAmJiAodmFsdWVHZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdmFsdWVTZXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5wdCwgXCJ2YWx1ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IHNldHRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiAhMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBkb2N1bWVudC5fX2xvb2t1cEdldHRlcl9fICYmIG5wdC5fX2xvb2t1cEdldHRlcl9fKFwidmFsdWVcIikgJiYgKHZhbHVlR2V0ID0gbnB0Ll9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldCA9IG5wdC5fX2xvb2t1cFNldHRlcl9fKFwidmFsdWVcIiksIG5wdC5fX2RlZmluZUdldHRlcl9fKFwidmFsdWVcIiwgZ2V0dGVyKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBucHQuX19kZWZpbmVTZXR0ZXJfXyhcInZhbHVlXCIsIHNldHRlcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnB0LmlucHV0bWFzay5fX3ZhbHVlR2V0ID0gdmFsdWVHZXQsIG5wdC5pbnB1dG1hc2suX192YWx1ZVNldCA9IHZhbHVlU2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5pbnB1dG1hc2suX3ZhbHVlR2V0ID0gZnVuY3Rpb24ob3ZlcnJ1bGVSVEwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1JUTCAmJiAhMCAhPT0gb3ZlcnJ1bGVSVEwgPyB2YWx1ZUdldC5jYWxsKHRoaXMuZWwpLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogdmFsdWVHZXQuY2FsbCh0aGlzLmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgbnB0LmlucHV0bWFzay5fdmFsdWVTZXQgPSBmdW5jdGlvbih2YWx1ZSwgb3ZlcnJ1bGVSVEwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcy5lbCwgbnVsbCA9PT0gdmFsdWUgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiAhMCAhPT0gb3ZlcnJ1bGVSVEwgJiYgaXNSVEwgPyB2YWx1ZS5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdmFsdWVHZXQgPT09IHVuZGVmaW5lZCAmJiAodmFsdWVHZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB2YWx1ZVNldCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnZhbEhvb2tzICYmICgkLnZhbEhvb2tzW3R5cGVdID09PSB1bmRlZmluZWQgfHwgITAgIT09ICQudmFsSG9va3NbdHlwZV0uaW5wdXRtYXNrcGF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbGhvb2tHZXQgPSAkLnZhbEhvb2tzW3R5cGVdICYmICQudmFsSG9va3NbdHlwZV0uZ2V0ID8gJC52YWxIb29rc1t0eXBlXS5nZXQgOiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHZhbGhvb2tTZXQgPSAkLnZhbEhvb2tzW3R5cGVdICYmICQudmFsSG9va3NbdHlwZV0uc2V0ID8gJC52YWxIb29rc1t0eXBlXS5zZXQgOiBmdW5jdGlvbihlbGVtLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS52YWx1ZSA9IHZhbHVlLCBlbGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC52YWxIb29rc1t0eXBlXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5pbnB1dG1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5pbnB1dG1hc2sub3B0cy5hdXRvVW5tYXNrKSByZXR1cm4gZWxlbS5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWxob29rR2V0KGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMSAhPT0gZ2V0TGFzdFZhbGlkUG9zaXRpb24odW5kZWZpbmVkLCB1bmRlZmluZWQsIGVsZW0uaW5wdXRtYXNrLm1hc2tzZXQudmFsaWRQb3NpdGlvbnMpIHx8ICEwICE9PSBvcHRzLm51bGxhYmxlID8gcmVzdWx0IDogXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWxob29rR2V0KGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKGVsZW0sIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0LCAkZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ID0gdmFsaG9va1NldChlbGVtLCB2YWx1ZSksIGVsZW0uaW5wdXRtYXNrICYmICRlbGVtLnRyaWdnZXIoXCJzZXR2YWx1ZVwiLCBbIHZhbHVlIF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRtYXNrcGF0Y2g6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfShucHQudHlwZSksIGZ1bmN0aW9uKG5wdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihucHQsIFwibW91c2VlbnRlclwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRtYXNrLl92YWx1ZUdldCgpICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpICYmICRpbnB1dC50cmlnZ2VyKFwic2V0dmFsdWVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfShucHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KGlucHV0KSA6IGlucHV0LmlucHV0bWFzayA9IHVuZGVmaW5lZCwgaXNTdXBwb3J0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIH0oZWxlbSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghMSAhPT0gaXNTdXBwb3J0ZWQgJiYgKCRlbCA9ICQoZWwgPSBlbGVtKSwgLTEgPT09IChtYXhMZW5ndGggPSBlbCAhPT0gdW5kZWZpbmVkID8gZWwubWF4TGVuZ3RoIDogdW5kZWZpbmVkKSAmJiAobWF4TGVuZ3RoID0gdW5kZWZpbmVkKSwgXG4gICAgICAgICAgICAgICAgICAgICEwID09PSBvcHRzLmNvbG9yTWFzayAmJiBpbml0aWFsaXplQ29sb3JNYXNrKGVsKSwgbW9iaWxlICYmIChcImlucHV0bW9kZVwiIGluIGVsICYmIChlbC5pbnB1dG1vZGUgPSBvcHRzLmlucHV0bW9kZSwgXG4gICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImlucHV0bW9kZVwiLCBvcHRzLmlucHV0bW9kZSkpLCAhMCA9PT0gb3B0cy5kaXNhYmxlUHJlZGljdGl2ZVRleHQgJiYgKFwiYXV0b2NvcnJlY3RcIiBpbiBlbCA/IGVsLmF1dG9jb3JyZWN0ID0gITEgOiAoITAgIT09IG9wdHMuY29sb3JNYXNrICYmIGluaXRpYWxpemVDb2xvck1hc2soZWwpLCBcbiAgICAgICAgICAgICAgICAgICAgZWwudHlwZSA9IFwicGFzc3dvcmRcIikpKSwgITAgPT09IGlzU3VwcG9ydGVkICYmIChFdmVudFJ1bGVyLm9uKGVsLCBcInN1Ym1pdFwiLCBFdmVudEhhbmRsZXJzLnN1Ym1pdEV2ZW50KSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwicmVzZXRcIiwgRXZlbnRIYW5kbGVycy5yZXNldEV2ZW50KSwgRXZlbnRSdWxlci5vbihlbCwgXCJibHVyXCIsIEV2ZW50SGFuZGxlcnMuYmx1ckV2ZW50KSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwiZm9jdXNcIiwgRXZlbnRIYW5kbGVycy5mb2N1c0V2ZW50KSwgITAgIT09IG9wdHMuY29sb3JNYXNrICYmIChFdmVudFJ1bGVyLm9uKGVsLCBcImNsaWNrXCIsIEV2ZW50SGFuZGxlcnMuY2xpY2tFdmVudCksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcIm1vdXNlbGVhdmVcIiwgRXZlbnRIYW5kbGVycy5tb3VzZWxlYXZlRXZlbnQpLCBFdmVudFJ1bGVyLm9uKGVsLCBcIm1vdXNlZW50ZXJcIiwgRXZlbnRIYW5kbGVycy5tb3VzZWVudGVyRXZlbnQpKSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwiZGJsY2xpY2tcIiwgRXZlbnRIYW5kbGVycy5kYmxjbGlja0V2ZW50KSwgRXZlbnRSdWxlci5vbihlbCwgXCJwYXN0ZVwiLCBFdmVudEhhbmRsZXJzLnBhc3RlRXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJkcmFnZHJvcFwiLCBFdmVudEhhbmRsZXJzLnBhc3RlRXZlbnQpLCBFdmVudFJ1bGVyLm9uKGVsLCBcImRyb3BcIiwgRXZlbnRIYW5kbGVycy5wYXN0ZUV2ZW50KSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwiY3V0XCIsIEV2ZW50SGFuZGxlcnMuY3V0RXZlbnQpLCBFdmVudFJ1bGVyLm9uKGVsLCBcImNvbXBsZXRlXCIsIG9wdHMub25jb21wbGV0ZSksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcImluY29tcGxldGVcIiwgb3B0cy5vbmluY29tcGxldGUpLCBFdmVudFJ1bGVyLm9uKGVsLCBcImNsZWFyZWRcIiwgb3B0cy5vbmNsZWFyZWQpLCBcbiAgICAgICAgICAgICAgICAgICAgbW9iaWxlIHx8ICEwID09PSBvcHRzLmlucHV0RXZlbnRPbmx5ID8gZWwucmVtb3ZlQXR0cmlidXRlKFwibWF4TGVuZ3RoXCIpIDogKEV2ZW50UnVsZXIub24oZWwsIFwia2V5ZG93blwiLCBFdmVudEhhbmRsZXJzLmtleWRvd25FdmVudCksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcImtleXByZXNzXCIsIEV2ZW50SGFuZGxlcnMua2V5cHJlc3NFdmVudCkpLCBFdmVudFJ1bGVyLm9uKGVsLCBcImNvbXBvc2l0aW9uc3RhcnRcIiwgJC5ub29wKSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwiY29tcG9zaXRpb251cGRhdGVcIiwgJC5ub29wKSwgRXZlbnRSdWxlci5vbihlbCwgXCJjb21wb3NpdGlvbmVuZFwiLCAkLm5vb3ApLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJrZXl1cFwiLCAkLm5vb3ApLCBFdmVudFJ1bGVyLm9uKGVsLCBcImlucHV0XCIsIEV2ZW50SGFuZGxlcnMuaW5wdXRGYWxsQmFja0V2ZW50KSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwiYmVmb3JlaW5wdXRcIiwgJC5ub29wKSksIEV2ZW50UnVsZXIub24oZWwsIFwic2V0dmFsdWVcIiwgRXZlbnRIYW5kbGVycy5zZXRWYWx1ZUV2ZW50KSwgXG4gICAgICAgICAgICAgICAgICAgIHVuZG9WYWx1ZSA9IGdldEJ1ZmZlclRlbXBsYXRlKCkuam9pbihcIlwiKSwgXCJcIiAhPT0gZWwuaW5wdXRtYXNrLl92YWx1ZUdldCghMCkgfHwgITEgPT09IG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbFZhbHVlID0gJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVNYXNrKSAmJiBvcHRzLm9uQmVmb3JlTWFzay5jYWxsKGlucHV0bWFzaywgZWwuaW5wdXRtYXNrLl92YWx1ZUdldCghMCksIG9wdHMpIHx8IGVsLmlucHV0bWFzay5fdmFsdWVHZXQoITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gaW5pdGlhbFZhbHVlICYmIGNoZWNrVmFsKGVsLCAhMCwgITEsIGlzUlRMID8gaW5pdGlhbFZhbHVlLnNwbGl0KFwiXCIpLnJldmVyc2UoKSA6IGluaXRpYWxWYWx1ZS5zcGxpdChcIlwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QnVmZmVyKCkuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZG9WYWx1ZSA9IGJ1ZmZlci5qb2luKFwiXCIpLCAhMSA9PT0gaXNDb21wbGV0ZShidWZmZXIpICYmIG9wdHMuY2xlYXJJbmNvbXBsZXRlICYmIHJlc2V0TWFza1NldCgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZWwgJiYgKC0xID09PSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpID8gYnVmZmVyID0gW10gOiBjbGVhck9wdGlvbmFsVGFpbChidWZmZXIpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAoITEgPT09IG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgfHwgb3B0cy5zaG93TWFza09uRm9jdXMgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZWwgfHwgXCJcIiAhPT0gZWwuaW5wdXRtYXNrLl92YWx1ZUdldCghMCkpICYmIHdyaXRlQnVmZmVyKGVsLCBidWZmZXIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsICYmIGNhcmV0KGVsLCBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KGVsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIFwiZm9ybWF0XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlQnVmZmVyID0gKCQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlTWFzaykgJiYgb3B0cy5vbkJlZm9yZU1hc2suY2FsbChpbnB1dG1hc2ssIGFjdGlvbk9iai52YWx1ZSwgb3B0cykgfHwgYWN0aW9uT2JqLnZhbHVlKS5zcGxpdChcIlwiKSwgXG4gICAgICAgICAgICAgICAgY2hlY2tWYWwodW5kZWZpbmVkLCAhMCwgITEsIGlzUlRMID8gdmFsdWVCdWZmZXIucmV2ZXJzZSgpIDogdmFsdWVCdWZmZXIpLCBhY3Rpb25PYmoubWV0YWRhdGEgPyB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpc1JUTCA/IGdldEJ1ZmZlcigpLnNsaWNlKCkucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiBnZXRCdWZmZXIoKS5qb2luKFwiXCIpLFxuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YTogbWFza1Njb3BlLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcImdldG1ldGFkYXRhXCJcbiAgICAgICAgICAgICAgICAgICAgfSwgbWFza3NldCwgb3B0cylcbiAgICAgICAgICAgICAgICB9IDogaXNSVEwgPyBnZXRCdWZmZXIoKS5zbGljZSgpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogZ2V0QnVmZmVyKCkuam9pbihcIlwiKTtcblxuICAgICAgICAgICAgICBjYXNlIFwiaXNWYWxpZFwiOlxuICAgICAgICAgICAgICAgIGFjdGlvbk9iai52YWx1ZSA/ICh2YWx1ZUJ1ZmZlciA9IGFjdGlvbk9iai52YWx1ZS5zcGxpdChcIlwiKSwgY2hlY2tWYWwodW5kZWZpbmVkLCAhMCwgITAsIGlzUlRMID8gdmFsdWVCdWZmZXIucmV2ZXJzZSgpIDogdmFsdWVCdWZmZXIpKSA6IGFjdGlvbk9iai52YWx1ZSA9IGdldEJ1ZmZlcigpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYnVmZmVyID0gZ2V0QnVmZmVyKCksIHJsID0gZGV0ZXJtaW5lTGFzdFJlcXVpcmVkUG9zaXRpb24oKSwgbG1pYiA9IGJ1ZmZlci5sZW5ndGggLSAxOyBsbWliID4gcmwgJiYgIWlzTWFzayhsbWliKTsgbG1pYi0tKSA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlci5zcGxpY2UocmwsIGxtaWIgKyAxIC0gcmwpLCBpc0NvbXBsZXRlKGJ1ZmZlcikgJiYgYWN0aW9uT2JqLnZhbHVlID09PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJnZXRlbXB0eW1hc2tcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJyZW1vdmVcIjpcbiAgICAgICAgICAgICAgICBpZiAoZWwgJiYgZWwuaW5wdXRtYXNrKSAkLmRhdGEoZWwsIFwiX2lucHV0bWFza19vcHRzXCIsIG51bGwpLCAkZWwgPSAkKGVsKSwgZWwuaW5wdXRtYXNrLl92YWx1ZVNldChvcHRzLmF1dG9Vbm1hc2sgPyB1bm1hc2tlZHZhbHVlKGVsKSA6IGVsLmlucHV0bWFzay5fdmFsdWVHZXQoITApKSwgXG4gICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vZmYoZWwpLCBlbC5pbnB1dG1hc2suY29sb3JNYXNrICYmICgoY29sb3JNYXNrID0gZWwuaW5wdXRtYXNrLmNvbG9yTWFzaykucmVtb3ZlQ2hpbGQoZWwpLCBcbiAgICAgICAgICAgICAgICBjb2xvck1hc2sucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIGNvbG9yTWFzayksIGNvbG9yTWFzay5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNvbG9yTWFzaykpLCBcbiAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKGVsKSwgXCJ2YWx1ZVwiKSAmJiBlbC5pbnB1dG1hc2suX192YWx1ZUdldCAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIFwidmFsdWVcIiwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGVsLmlucHV0bWFzay5fX3ZhbHVlR2V0LFxuICAgICAgICAgICAgICAgICAgICBzZXQ6IGVsLmlucHV0bWFzay5fX3ZhbHVlU2V0LFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICAgICAgfSkgOiBkb2N1bWVudC5fX2xvb2t1cEdldHRlcl9fICYmIGVsLl9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSAmJiBlbC5pbnB1dG1hc2suX192YWx1ZUdldCAmJiAoZWwuX19kZWZpbmVHZXR0ZXJfXyhcInZhbHVlXCIsIGVsLmlucHV0bWFzay5fX3ZhbHVlR2V0KSwgXG4gICAgICAgICAgICAgICAgZWwuX19kZWZpbmVTZXR0ZXJfXyhcInZhbHVlXCIsIGVsLmlucHV0bWFzay5fX3ZhbHVlU2V0KSksIGVsLmlucHV0bWFzayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG5cbiAgICAgICAgICAgICAgY2FzZSBcImdldG1ldGFkYXRhXCI6XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNBcnJheShtYXNrc2V0Lm1ldGFkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFza1RhcmdldCA9IGdldE1hc2tUZW1wbGF0ZSghMCwgMCwgITEpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLmVhY2gobWFza3NldC5tZXRhZGF0YSwgZnVuY3Rpb24obmR4LCBtdGR0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXRkdC5tYXNrID09PSBtYXNrVGFyZ2V0KSByZXR1cm4gbWFza1RhcmdldCA9IG10ZHQsICExO1xuICAgICAgICAgICAgICAgICAgICB9KSwgbWFza1RhcmdldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tzZXQubWV0YWRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIElucHV0bWFzay5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBkYXRhQXR0cmlidXRlOiBcImRhdGEtaW5wdXRtYXNrXCIsXG4gICAgICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIl9cIixcbiAgICAgICAgICAgICAgICBvcHRpb25hbG1hcmtlcjogWyBcIltcIiwgXCJdXCIgXSxcbiAgICAgICAgICAgICAgICBxdWFudGlmaWVybWFya2VyOiBbIFwie1wiLCBcIn1cIiBdLFxuICAgICAgICAgICAgICAgIGdyb3VwbWFya2VyOiBbIFwiKFwiLCBcIilcIiBdLFxuICAgICAgICAgICAgICAgIGFsdGVybmF0b3JtYXJrZXI6IFwifFwiLFxuICAgICAgICAgICAgICAgIGVzY2FwZUNoYXI6IFwiXFxcXFwiLFxuICAgICAgICAgICAgICAgIG1hc2s6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVnZXg6IG51bGwsXG4gICAgICAgICAgICAgICAgb25jb21wbGV0ZTogJC5ub29wLFxuICAgICAgICAgICAgICAgIG9uaW5jb21wbGV0ZTogJC5ub29wLFxuICAgICAgICAgICAgICAgIG9uY2xlYXJlZDogJC5ub29wLFxuICAgICAgICAgICAgICAgIHJlcGVhdDogMCxcbiAgICAgICAgICAgICAgICBncmVlZHk6ICExLFxuICAgICAgICAgICAgICAgIGF1dG9Vbm1hc2s6ICExLFxuICAgICAgICAgICAgICAgIHJlbW92ZU1hc2tPblN1Ym1pdDogITEsXG4gICAgICAgICAgICAgICAgY2xlYXJNYXNrT25Mb3N0Rm9jdXM6ICEwLFxuICAgICAgICAgICAgICAgIGluc2VydE1vZGU6ICEwLFxuICAgICAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogITEsXG4gICAgICAgICAgICAgICAgYWxpYXM6IG51bGwsXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiAkLm5vb3AsXG4gICAgICAgICAgICAgICAgb25CZWZvcmVNYXNrOiBudWxsLFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlUGFzdGU6IGZ1bmN0aW9uKHBhc3RlZFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLmlzRnVuY3Rpb24ob3B0cy5vbkJlZm9yZU1hc2spID8gb3B0cy5vbkJlZm9yZU1hc2suY2FsbCh0aGlzLCBwYXN0ZWRWYWx1ZSwgb3B0cykgOiBwYXN0ZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlV3JpdGU6IG51bGwsXG4gICAgICAgICAgICAgICAgb25Vbk1hc2s6IG51bGwsXG4gICAgICAgICAgICAgICAgc2hvd01hc2tPbkZvY3VzOiAhMCxcbiAgICAgICAgICAgICAgICBzaG93TWFza09uSG92ZXI6ICEwLFxuICAgICAgICAgICAgICAgIG9uS2V5VmFsaWRhdGlvbjogJC5ub29wLFxuICAgICAgICAgICAgICAgIHNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXI6IFwiIFwiLFxuICAgICAgICAgICAgICAgIG51bWVyaWNJbnB1dDogITEsXG4gICAgICAgICAgICAgICAgcmlnaHRBbGlnbjogITEsXG4gICAgICAgICAgICAgICAgdW5kb09uRXNjYXBlOiAhMCxcbiAgICAgICAgICAgICAgICByYWRpeFBvaW50OiBcIlwiLFxuICAgICAgICAgICAgICAgIF9yYWRpeERhbmNlOiAhMSxcbiAgICAgICAgICAgICAgICBncm91cFNlcGFyYXRvcjogXCJcIixcbiAgICAgICAgICAgICAgICBrZWVwU3RhdGljOiBudWxsLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uQ2FyZXRPblRhYjogITAsXG4gICAgICAgICAgICAgICAgdGFiVGhyb3VnaDogITEsXG4gICAgICAgICAgICAgICAgc3VwcG9ydHNJbnB1dFR5cGU6IFsgXCJ0ZXh0XCIsIFwidGVsXCIsIFwicGFzc3dvcmRcIiwgXCJzZWFyY2hcIiBdLFxuICAgICAgICAgICAgICAgIGlnbm9yYWJsZXM6IFsgOCwgOSwgMTMsIDE5LCAyNywgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLCA0NSwgNDYsIDkzLCAxMTIsIDExMywgMTE0LCAxMTUsIDExNiwgMTE3LCAxMTgsIDExOSwgMTIwLCAxMjEsIDEyMiwgMTIzLCAwLCAyMjkgXSxcbiAgICAgICAgICAgICAgICBpc0NvbXBsZXRlOiBudWxsLFxuICAgICAgICAgICAgICAgIHByZVZhbGlkYXRpb246IG51bGwsXG4gICAgICAgICAgICAgICAgcG9zdFZhbGlkYXRpb246IG51bGwsXG4gICAgICAgICAgICAgICAgc3RhdGljRGVmaW5pdGlvblN5bWJvbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGppdE1hc2tpbmc6ICExLFxuICAgICAgICAgICAgICAgIG51bGxhYmxlOiAhMCxcbiAgICAgICAgICAgICAgICBpbnB1dEV2ZW50T25seTogITEsXG4gICAgICAgICAgICAgICAgbm9WYWx1ZVBhdGNoaW5nOiAhMSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkNhcmV0T25DbGljazogXCJsdnBcIixcbiAgICAgICAgICAgICAgICBjYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgaW5wdXRtb2RlOiBcInZlcmJhdGltXCIsXG4gICAgICAgICAgICAgICAgY29sb3JNYXNrOiAhMSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlUHJlZGljdGl2ZVRleHQ6ICExLFxuICAgICAgICAgICAgICAgIGltcG9ydERhdGFBdHRyaWJ1dGVzOiAhMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgOToge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOe+8kS3vvJldXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25TeW1ib2w6IFwiKlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1aYS160JAt0Y/QgdGRw4Atw7/CtV1cIixcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvblN5bWJvbDogXCIqXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiKlwiOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC0577yRLe+8mUEtWmEtetCQLdGP0IHRkcOALcO/wrVdXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxpYXNlczoge30sXG4gICAgICAgICAgICBtYXNrc0NhY2hlOiB7fSxcbiAgICAgICAgICAgIG1hc2s6IGZ1bmN0aW9uKGVsZW1zKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiID09IHR5cGVvZiBlbGVtcyAmJiAoZWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtcykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtcykpLCBcbiAgICAgICAgICAgICAgICBlbGVtcyA9IGVsZW1zLm5vZGVOYW1lID8gWyBlbGVtcyBdIDogZWxlbXMsICQuZWFjaChlbGVtcywgZnVuY3Rpb24obmR4LCBlbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2NvcGVkT3B0cyA9ICQuZXh0ZW5kKCEwLCB7fSwgdGhhdC5vcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmN0aW9uKG5wdCwgb3B0cywgdXNlck9wdGlvbnMsIGRhdGFBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gb3B0cy5pbXBvcnREYXRhQXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24sIGRhdGFvcHRpb25zLCBvcHRpb25EYXRhLCBwLCBpbXBvcnRPcHRpb24gPSBmdW5jdGlvbihvcHRpb24sIG9wdGlvbkRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCAhPT0gKG9wdGlvbkRhdGEgPSBvcHRpb25EYXRhICE9PSB1bmRlZmluZWQgPyBvcHRpb25EYXRhIDogbnB0LmdldEF0dHJpYnV0ZShkYXRhQXR0cmlidXRlICsgXCItXCIgKyBvcHRpb24pKSAmJiAoXCJzdHJpbmdcIiA9PSB0eXBlb2Ygb3B0aW9uRGF0YSAmJiAoMCA9PT0gb3B0aW9uLmluZGV4T2YoXCJvblwiKSA/IG9wdGlvbkRhdGEgPSB3aW5kb3dbb3B0aW9uRGF0YV0gOiBcImZhbHNlXCIgPT09IG9wdGlvbkRhdGEgPyBvcHRpb25EYXRhID0gITEgOiBcInRydWVcIiA9PT0gb3B0aW9uRGF0YSAmJiAob3B0aW9uRGF0YSA9ICEwKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyT3B0aW9uc1tvcHRpb25dID0gb3B0aW9uRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgYXR0ck9wdGlvbnMgPSBucHQuZ2V0QXR0cmlidXRlKGRhdGFBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyT3B0aW9ucyAmJiBcIlwiICE9PSBhdHRyT3B0aW9ucyAmJiAoYXR0ck9wdGlvbnMgPSBhdHRyT3B0aW9ucy5yZXBsYWNlKC8nL2csICdcIicpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhb3B0aW9ucyA9IEpTT04ucGFyc2UoXCJ7XCIgKyBhdHRyT3B0aW9ucyArIFwifVwiKSksIGRhdGFvcHRpb25zKSBmb3IgKHAgaW4gb3B0aW9uRGF0YSA9IHVuZGVmaW5lZCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YW9wdGlvbnMpIGlmIChcImFsaWFzXCIgPT09IHAudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25EYXRhID0gZGF0YW9wdGlvbnNbcF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKG9wdGlvbiBpbiBpbXBvcnRPcHRpb24oXCJhbGlhc1wiLCBvcHRpb25EYXRhKSwgdXNlck9wdGlvbnMuYWxpYXMgJiYgcmVzb2x2ZUFsaWFzKHVzZXJPcHRpb25zLmFsaWFzLCB1c2VyT3B0aW9ucywgb3B0cyksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFvcHRpb25zKSBmb3IgKHAgaW4gb3B0aW9uRGF0YSA9IHVuZGVmaW5lZCwgZGF0YW9wdGlvbnMpIGlmIChwLnRvTG93ZXJDYXNlKCkgPT09IG9wdGlvbi50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25EYXRhID0gZGF0YW9wdGlvbnNbcF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRPcHRpb24ob3B0aW9uLCBvcHRpb25EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5leHRlbmQoITAsIG9wdHMsIHVzZXJPcHRpb25zKSwgKFwicnRsXCIgPT09IG5wdC5kaXIgfHwgb3B0cy5yaWdodEFsaWduKSAmJiAobnB0LnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgKFwicnRsXCIgPT09IG5wdC5kaXIgfHwgb3B0cy5udW1lcmljSW5wdXQpICYmIChucHQuZGlyID0gXCJsdHJcIiwgbnB0LnJlbW92ZUF0dHJpYnV0ZShcImRpclwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmlzUlRMID0gITApLCBPYmplY3Qua2V5cyh1c2VyT3B0aW9ucykubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9KGVsLCBzY29wZWRPcHRzLCAkLmV4dGVuZCghMCwge30sIHRoYXQudXNlck9wdGlvbnMpLCB0aGF0LmRhdGFBdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFza3NldCA9IGdlbmVyYXRlTWFza1NldChzY29wZWRPcHRzLCB0aGF0Lm5vTWFza3NDYWNoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0ICE9PSB1bmRlZmluZWQgJiYgKGVsLmlucHV0bWFzayAhPT0gdW5kZWZpbmVkICYmIChlbC5pbnB1dG1hc2sub3B0cy5hdXRvVW5tYXNrID0gITAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuaW5wdXRtYXNrLnJlbW92ZSgpKSwgZWwuaW5wdXRtYXNrID0gbmV3IElucHV0bWFzayh1bmRlZmluZWQsIHVuZGVmaW5lZCwgITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmlucHV0bWFzay5vcHRzID0gc2NvcGVkT3B0cywgZWwuaW5wdXRtYXNrLm5vTWFza3NDYWNoZSA9IHRoYXQubm9NYXNrc0NhY2hlLCBlbC5pbnB1dG1hc2sudXNlck9wdGlvbnMgPSAkLmV4dGVuZCghMCwge30sIHRoYXQudXNlck9wdGlvbnMpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmlucHV0bWFzay5pc1JUTCA9IHNjb3BlZE9wdHMuaXNSVEwgfHwgc2NvcGVkT3B0cy5udW1lcmljSW5wdXQsIGVsLmlucHV0bWFzay5lbCA9IGVsLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmlucHV0bWFzay5tYXNrc2V0ID0gbWFza3NldCwgJC5kYXRhKGVsLCBcIl9pbnB1dG1hc2tfb3B0c1wiLCBzY29wZWRPcHRzKSwgbWFza1Njb3BlLmNhbGwoZWwuaW5wdXRtYXNrLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcIm1hc2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIGVsZW1zICYmIGVsZW1zWzBdICYmIGVsZW1zWzBdLmlucHV0bWFzayB8fCB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbjogZnVuY3Rpb24ob3B0aW9ucywgbm9yZW1hc2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIiA9PSB0eXBlb2Ygb3B0aW9ucyA/IHRoaXMub3B0c1tvcHRpb25zXSA6IFwib2JqZWN0XCIgPT09ICh2b2lkIDAgPT09IG9wdGlvbnMgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvcHRpb25zKSkgPyAoJC5leHRlbmQodGhpcy51c2VyT3B0aW9ucywgb3B0aW9ucyksIFxuICAgICAgICAgICAgICAgIHRoaXMuZWwgJiYgITAgIT09IG5vcmVtYXNrICYmIHRoaXMubWFzayh0aGlzLmVsKSwgdGhpcykgOiB2b2lkIDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5tYXNrZWR2YWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8IGdlbmVyYXRlTWFza1NldCh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgbWFza1Njb3BlLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwidW5tYXNrZWR2YWx1ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJyZW1vdmVcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldGVtcHR5bWFzazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFza3NldCA9IHRoaXMubWFza3NldCB8fCBnZW5lcmF0ZU1hc2tTZXQodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSksIFxuICAgICAgICAgICAgICAgIG1hc2tTY29wZS5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcImdldGVtcHR5bWFza1wiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzTWFza2VkVmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5vcHRzLmF1dG9Vbm1hc2s7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFza3NldCA9IHRoaXMubWFza3NldCB8fCBnZW5lcmF0ZU1hc2tTZXQodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSksIFxuICAgICAgICAgICAgICAgIG1hc2tTY29wZS5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcImlzQ29tcGxldGVcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldG1ldGFkYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8IGdlbmVyYXRlTWFza1NldCh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgbWFza1Njb3BlLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiZ2V0bWV0YWRhdGFcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzVmFsaWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFza3NldCA9IHRoaXMubWFza3NldCB8fCBnZW5lcmF0ZU1hc2tTZXQodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSksIFxuICAgICAgICAgICAgICAgIG1hc2tTY29wZS5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcImlzVmFsaWRcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbih2YWx1ZSwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8IGdlbmVyYXRlTWFza1NldCh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgbWFza1Njb3BlLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiZm9ybWF0XCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbCAmJiAkKHRoaXMuZWwpLnRyaWdnZXIoXCJzZXR2YWx1ZVwiLCBbIHZhbHVlIF0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuYWx5c2VNYXNrOiBmdW5jdGlvbihtYXNrLCByZWdleE1hc2ssIG9wdHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2gsIG0sIG9wZW5pbmdUb2tlbiwgY3VycmVudE9wZW5pbmdUb2tlbiwgYWx0ZXJuYXRvciwgbGFzdE1hdGNoLCB0b2tlbml6ZXIgPSAvKD86Wz8qK118XFx7WzAtOVxcK1xcKl0rKD86LFswLTlcXCtcXCpdKik/KD86XFx8WzAtOVxcK1xcKl0qKT9cXH0pfFteLj8qK14ke1tdKCl8XFxcXF0rfC4vZywgcmVnZXhUb2tlbml6ZXIgPSAvXFxbXFxeP10/KD86W15cXFxcXFxdXSt8XFxcXFtcXFNcXHNdPykqXT98XFxcXCg/OjAoPzpbMC0zXVswLTddezAsMn18WzQtN11bMC03XT8pP3xbMS05XVswLTldKnx4WzAtOUEtRmEtZl17Mn18dVswLTlBLUZhLWZdezR9fGNbQS1aYS16XXxbXFxTXFxzXT8pfFxcKCg/OlxcP1s6PSFdPyk/fCg/Ols/KitdfFxce1swLTldKyg/OixbMC05XSopP1xcfSlcXD8/fFteLj8qK14ke1soKXxcXFxcXSt8Li9nLCBlc2NhcGVkID0gITEsIGN1cnJlbnRUb2tlbiA9IG5ldyBNYXNrVG9rZW4oKSwgb3BlbmVuaW5ncyA9IFtdLCBtYXNrVG9rZW5zID0gW107XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gTWFza1Rva2VuKGlzR3JvdXAsIGlzT3B0aW9uYWwsIGlzUXVhbnRpZmllciwgaXNBbHRlcm5hdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdLCB0aGlzLm9wZW5Hcm91cCA9IGlzR3JvdXAgfHwgITEsIHRoaXMuYWx0ZXJuYXRvckdyb3VwID0gITEsIHRoaXMuaXNHcm91cCA9IGlzR3JvdXAgfHwgITEsIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT3B0aW9uYWwgPSBpc09wdGlvbmFsIHx8ICExLCB0aGlzLmlzUXVhbnRpZmllciA9IGlzUXVhbnRpZmllciB8fCAhMSwgdGhpcy5pc0FsdGVybmF0b3IgPSBpc0FsdGVybmF0b3IgfHwgITEsIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1YW50aWZpZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXg6IDFcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5zZXJ0VGVzdERlZmluaXRpb24obXRva2VuLCBlbGVtZW50LCBwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uICE9PSB1bmRlZmluZWQgPyBwb3NpdGlvbiA6IG10b2tlbi5tYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZNYXRjaCA9IG10b2tlbi5tYXRjaGVzW3Bvc2l0aW9uIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWdleE1hc2spIDAgPT09IGVsZW1lbnQuaW5kZXhPZihcIltcIikgfHwgZXNjYXBlZCAmJiAvXFxcXGR8XFxcXHN8XFxcXHddL2kudGVzdChlbGVtZW50KSB8fCBcIi5cIiA9PT0gZWxlbWVudCA/IG10b2tlbi5tYXRjaGVzLnNwbGljZShwb3NpdGlvbisrLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbjogbmV3IFJlZ0V4cChlbGVtZW50LCBvcHRzLmNhc2luZyA/IFwiaVwiIDogXCJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbGl0eTogbXRva2VuLmlzT3B0aW9uYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdCbG9ja01hcmtlcjogcHJldk1hdGNoID09PSB1bmRlZmluZWQgfHwgcHJldk1hdGNoLmRlZiAhPT0gZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZjogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVEZWY6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSkgOiAoZXNjYXBlZCAmJiAoZWxlbWVudCA9IGVsZW1lbnRbZWxlbWVudC5sZW5ndGggLSAxXSksICQuZWFjaChlbGVtZW50LnNwbGl0KFwiXCIpLCBmdW5jdGlvbihuZHgsIGxtbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZNYXRjaCA9IG10b2tlbi5tYXRjaGVzW3Bvc2l0aW9uIC0gMV0sIG10b2tlbi5tYXRjaGVzLnNwbGljZShwb3NpdGlvbisrLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxpdHk6IG10b2tlbi5pc09wdGlvbmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyOiBwcmV2TWF0Y2ggPT09IHVuZGVmaW5lZCB8fCBwcmV2TWF0Y2guZGVmICE9PSBsbW50ICYmIG51bGwgIT09IHByZXZNYXRjaC5mbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmOiBvcHRzLnN0YXRpY0RlZmluaXRpb25TeW1ib2wgfHwgbG1udCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogb3B0cy5zdGF0aWNEZWZpbml0aW9uU3ltYm9sICE9PSB1bmRlZmluZWQgPyBsbW50IDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZURlZjogbG1udFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKSwgZXNjYXBlZCA9ICExOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXNrZGVmID0gKG9wdHMuZGVmaW5pdGlvbnMgPyBvcHRzLmRlZmluaXRpb25zW2VsZW1lbnRdIDogdW5kZWZpbmVkKSB8fCBJbnB1dG1hc2sucHJvdG90eXBlLmRlZmluaXRpb25zW2VsZW1lbnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFza2RlZiAmJiAhZXNjYXBlZCA/IG10b2tlbi5tYXRjaGVzLnNwbGljZShwb3NpdGlvbisrLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IG1hc2tkZWYudmFsaWRhdG9yID8gXCJzdHJpbmdcIiA9PSB0eXBlb2YgbWFza2RlZi52YWxpZGF0b3IgPyBuZXcgUmVnRXhwKG1hc2tkZWYudmFsaWRhdG9yLCBvcHRzLmNhc2luZyA/IFwiaVwiIDogXCJcIikgOiBuZXcgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdCA9IG1hc2tkZWYudmFsaWRhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oKSA6IG5ldyBSZWdFeHAoXCIuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsaXR5OiBtdG9rZW4uaXNPcHRpb25hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdCbG9ja01hcmtlcjogcHJldk1hdGNoID09PSB1bmRlZmluZWQgfHwgcHJldk1hdGNoLmRlZiAhPT0gKG1hc2tkZWYuZGVmaW5pdGlvblN5bWJvbCB8fCBlbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IG1hc2tkZWYuY2FzaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZjogbWFza2RlZi5kZWZpbml0aW9uU3ltYm9sIHx8IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IG1hc2tkZWYucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlRGVmOiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSA6IChtdG9rZW4ubWF0Y2hlcy5zcGxpY2UocG9zaXRpb24rKywgMCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsaXR5OiBtdG9rZW4uaXNPcHRpb25hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdCbG9ja01hcmtlcjogcHJldk1hdGNoID09PSB1bmRlZmluZWQgfHwgcHJldk1hdGNoLmRlZiAhPT0gZWxlbWVudCAmJiBudWxsICE9PSBwcmV2TWF0Y2guZm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZjogb3B0cy5zdGF0aWNEZWZpbml0aW9uU3ltYm9sIHx8IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IG9wdHMuc3RhdGljRGVmaW5pdGlvblN5bWJvbCAhPT0gdW5kZWZpbmVkID8gZWxlbWVudCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVEZWY6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBlc2NhcGVkID0gITEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlZmF1bHRDYXNlKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVuaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zZXJ0VGVzdERlZmluaXRpb24oY3VycmVudE9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3Nbb3BlbmVuaW5ncy5sZW5ndGggLSAxXSwgbSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE9wZW5pbmdUb2tlbi5pc0FsdGVybmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdG9yID0gb3BlbmVuaW5ncy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtbmR4ID0gMDsgbW5keCA8IGFsdGVybmF0b3IubWF0Y2hlcy5sZW5ndGg7IG1uZHgrKykgYWx0ZXJuYXRvci5tYXRjaGVzW21uZHhdLmlzR3JvdXAgJiYgKGFsdGVybmF0b3IubWF0Y2hlc1ttbmR4XS5pc0dyb3VwID0gITEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lbmluZ3MubGVuZ3RoID4gMCA/IChjdXJyZW50T3BlbmluZ1Rva2VuID0gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdKS5tYXRjaGVzLnB1c2goYWx0ZXJuYXRvcikgOiBjdXJyZW50VG9rZW4ubWF0Y2hlcy5wdXNoKGFsdGVybmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaW5zZXJ0VGVzdERlZmluaXRpb24oY3VycmVudFRva2VuLCBtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZ3JvdXBpZnkobWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBUb2tlbiA9IG5ldyBNYXNrVG9rZW4oITApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXBUb2tlbi5vcGVuR3JvdXAgPSAhMSwgZ3JvdXBUb2tlbi5tYXRjaGVzID0gbWF0Y2hlcywgZ3JvdXBUb2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChyZWdleE1hc2sgJiYgKG9wdHMub3B0aW9uYWxtYXJrZXJbMF0gPSB1bmRlZmluZWQsIG9wdHMub3B0aW9uYWxtYXJrZXJbMV0gPSB1bmRlZmluZWQpOyBtYXRjaCA9IHJlZ2V4TWFzayA/IHJlZ2V4VG9rZW5pemVyLmV4ZWMobWFzaykgOiB0b2tlbml6ZXIuZXhlYyhtYXNrKTsgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtID0gbWF0Y2hbMF0sIHJlZ2V4TWFzaykgc3dpdGNoIChtLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCI/XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gXCJ7MCwxfVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiK1wiOlxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCIqXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gXCJ7XCIgKyBtICsgXCJ9XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVzY2FwZWQpIGRlZmF1bHRDYXNlKCk7IGVsc2Ugc3dpdGNoIChtLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5lc2NhcGVDaGFyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlZCA9ICEwLCByZWdleE1hc2sgJiYgZGVmYXVsdENhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLm9wdGlvbmFsbWFya2VyWzFdOlxuICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5ncm91cG1hcmtlclsxXTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgob3BlbmluZ1Rva2VuID0gb3BlbmVuaW5ncy5wb3AoKSkub3Blbkdyb3VwID0gITEsIG9wZW5pbmdUb2tlbiAhPT0gdW5kZWZpbmVkKSBpZiAob3BlbmVuaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjdXJyZW50T3BlbmluZ1Rva2VuID0gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdKS5tYXRjaGVzLnB1c2gob3BlbmluZ1Rva2VuKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE9wZW5pbmdUb2tlbi5pc0FsdGVybmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRvciA9IG9wZW5lbmluZ3MucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1uZHggPSAwOyBtbmR4IDwgYWx0ZXJuYXRvci5tYXRjaGVzLmxlbmd0aDsgbW5keCsrKSBhbHRlcm5hdG9yLm1hdGNoZXNbbW5keF0uaXNHcm91cCA9ICExLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRvci5tYXRjaGVzW21uZHhdLmFsdGVybmF0b3JHcm91cCA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZW5pbmdzLmxlbmd0aCA+IDAgPyAoY3VycmVudE9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3Nbb3BlbmVuaW5ncy5sZW5ndGggLSAxXSkubWF0Y2hlcy5wdXNoKGFsdGVybmF0b3IpIDogY3VycmVudFRva2VuLm1hdGNoZXMucHVzaChhbHRlcm5hdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgY3VycmVudFRva2VuLm1hdGNoZXMucHVzaChvcGVuaW5nVG9rZW4pOyBlbHNlIGRlZmF1bHRDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5vcHRpb25hbG1hcmtlclswXTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lbmluZ3MucHVzaChuZXcgTWFza1Rva2VuKCExLCAhMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9wdHMuZ3JvdXBtYXJrZXJbMF06XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZW5pbmdzLnB1c2gobmV3IE1hc2tUb2tlbighMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9wdHMucXVhbnRpZmllcm1hcmtlclswXTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBxdWFudGlmaWVyID0gbmV3IE1hc2tUb2tlbighMSwgITEsICEwKSwgbXFqID0gKG0gPSBtLnJlcGxhY2UoL1t7fV0vZywgXCJcIikpLnNwbGl0KFwifFwiKSwgbXEgPSBtcWpbMF0uc3BsaXQoXCIsXCIpLCBtcTAgPSBpc05hTihtcVswXSkgPyBtcVswXSA6IHBhcnNlSW50KG1xWzBdKSwgbXExID0gMSA9PT0gbXEubGVuZ3RoID8gbXEwIDogaXNOYU4obXFbMV0pID8gbXFbMV0gOiBwYXJzZUludChtcVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIipcIiAhPT0gbXExICYmIFwiK1wiICE9PSBtcTEgfHwgKG1xMCA9IFwiKlwiID09PSBtcTEgPyAwIDogMSksIHF1YW50aWZpZXIucXVhbnRpZmllciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW46IG1xMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IG1xMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqaXQ6IG1xalsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gb3BlbmVuaW5ncy5sZW5ndGggPiAwID8gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdLm1hdGNoZXMgOiBjdXJyZW50VG9rZW4ubWF0Y2hlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWF0Y2ggPSBtYXRjaGVzLnBvcCgpKS5pc0FsdGVybmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2gobWF0Y2gpLCBtYXRjaGVzID0gbWF0Y2gubWF0Y2hlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBUb2tlbiA9IG5ldyBNYXNrVG9rZW4oITApLCB0bXBNYXRjaCA9IG1hdGNoZXMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGdyb3VwVG9rZW4pLCBtYXRjaGVzID0gZ3JvdXBUb2tlbi5tYXRjaGVzLCBtYXRjaCA9IHRtcE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2guaXNHcm91cCB8fCAobWF0Y2ggPSBncm91cGlmeShbIG1hdGNoIF0pKSwgbWF0Y2hlcy5wdXNoKG1hdGNoKSwgbWF0Y2hlcy5wdXNoKHF1YW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9wdHMuYWx0ZXJuYXRvcm1hcmtlcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncm91cFF1YW50aWZpZXIgPSBmdW5jdGlvbihtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RNYXRjaCA9IG1hdGNoZXMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RNYXRjaC5pc1F1YW50aWZpZXIgJiYgKGxhc3RNYXRjaCA9IGdyb3VwaWZ5KFsgbWF0Y2hlcy5wb3AoKSwgbGFzdE1hdGNoIF0pKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVuZW5pbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViVG9rZW4gPSAoY3VycmVudE9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3Nbb3BlbmVuaW5ncy5sZW5ndGggLSAxXSkubWF0Y2hlc1tjdXJyZW50T3BlbmluZ1Rva2VuLm1hdGNoZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE1hdGNoID0gY3VycmVudE9wZW5pbmdUb2tlbi5vcGVuR3JvdXAgJiYgKHN1YlRva2VuLm1hdGNoZXMgPT09IHVuZGVmaW5lZCB8fCAhMSA9PT0gc3ViVG9rZW4uaXNHcm91cCAmJiAhMSA9PT0gc3ViVG9rZW4uaXNBbHRlcm5hdG9yKSA/IG9wZW5lbmluZ3MucG9wKCkgOiBncm91cFF1YW50aWZpZXIoY3VycmVudE9wZW5pbmdUb2tlbi5tYXRjaGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBsYXN0TWF0Y2ggPSBncm91cFF1YW50aWZpZXIoY3VycmVudFRva2VuLm1hdGNoZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RNYXRjaC5pc0FsdGVybmF0b3IpIG9wZW5lbmluZ3MucHVzaChsYXN0TWF0Y2gpOyBlbHNlIGlmIChsYXN0TWF0Y2guYWx0ZXJuYXRvckdyb3VwID8gKGFsdGVybmF0b3IgPSBvcGVuZW5pbmdzLnBvcCgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaC5hbHRlcm5hdG9yR3JvdXAgPSAhMSkgOiBhbHRlcm5hdG9yID0gbmV3IE1hc2tUb2tlbighMSwgITEsICExLCAhMCksIGFsdGVybmF0b3IubWF0Y2hlcy5wdXNoKGxhc3RNYXRjaCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVuaW5ncy5wdXNoKGFsdGVybmF0b3IpLCBsYXN0TWF0Y2gub3Blbkdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE1hdGNoLm9wZW5Hcm91cCA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHRlcm5hdG9yR3JvdXAgPSBuZXcgTWFza1Rva2VuKCEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdG9yR3JvdXAuYWx0ZXJuYXRvckdyb3VwID0gITAsIG9wZW5lbmluZ3MucHVzaChhbHRlcm5hdG9yR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdENhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKDtvcGVuZW5pbmdzLmxlbmd0aCA+IDA7ICkgb3BlbmluZ1Rva2VuID0gb3BlbmVuaW5ncy5wb3AoKSwgY3VycmVudFRva2VuLm1hdGNoZXMucHVzaChvcGVuaW5nVG9rZW4pO1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50VG9rZW4ubWF0Y2hlcy5sZW5ndGggPiAwICYmICghZnVuY3Rpb24gdmVyaWZ5R3JvdXBNYXJrZXIobWFza1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hc2tUb2tlbiAmJiBtYXNrVG9rZW4ubWF0Y2hlcyAmJiAkLmVhY2gobWFza1Rva2VuLm1hdGNoZXMsIGZ1bmN0aW9uKG5keCwgdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0VG9rZW4gPSBtYXNrVG9rZW4ubWF0Y2hlc1tuZHggKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIChuZXh0VG9rZW4gPT09IHVuZGVmaW5lZCB8fCBuZXh0VG9rZW4ubWF0Y2hlcyA9PT0gdW5kZWZpbmVkIHx8ICExID09PSBuZXh0VG9rZW4uaXNRdWFudGlmaWVyKSAmJiB0b2tlbiAmJiB0b2tlbi5pc0dyb3VwICYmICh0b2tlbi5pc0dyb3VwID0gITEsIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXhNYXNrIHx8IChpbnNlcnRUZXN0RGVmaW5pdGlvbih0b2tlbiwgb3B0cy5ncm91cG1hcmtlclswXSwgMCksICEwICE9PSB0b2tlbi5vcGVuR3JvdXAgJiYgaW5zZXJ0VGVzdERlZmluaXRpb24odG9rZW4sIG9wdHMuZ3JvdXBtYXJrZXJbMV0pKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyaWZ5R3JvdXBNYXJrZXIodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KGN1cnJlbnRUb2tlbiksIG1hc2tUb2tlbnMucHVzaChjdXJyZW50VG9rZW4pKSwgKG9wdHMubnVtZXJpY0lucHV0IHx8IG9wdHMuaXNSVEwpICYmIGZ1bmN0aW9uIHJldmVyc2VUb2tlbnMobWFza1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1hdGNoIGluIG1hc2tUb2tlbi5tYXRjaGVzID0gbWFza1Rva2VuLm1hdGNoZXMucmV2ZXJzZSgpLCBtYXNrVG9rZW4ubWF0Y2hlcykgaWYgKG1hc2tUb2tlbi5tYXRjaGVzLmhhc093blByb3BlcnR5KG1hdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGludE1hdGNoID0gcGFyc2VJbnQobWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXS5pc1F1YW50aWZpZXIgJiYgbWFza1Rva2VuLm1hdGNoZXNbaW50TWF0Y2ggKyAxXSAmJiBtYXNrVG9rZW4ubWF0Y2hlc1tpbnRNYXRjaCArIDFdLmlzR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcXQgPSBtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza1Rva2VuLm1hdGNoZXMuc3BsaWNlKG1hdGNoLCAxKSwgbWFza1Rva2VuLm1hdGNoZXMuc3BsaWNlKGludE1hdGNoICsgMSwgMCwgcXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdLm1hdGNoZXMgIT09IHVuZGVmaW5lZCA/IG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXSA9IHJldmVyc2VUb2tlbnMobWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdKSA6IG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXSA9ICgoc3QgPSBtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF0pID09PSBvcHRzLm9wdGlvbmFsbWFya2VyWzBdID8gc3QgPSBvcHRzLm9wdGlvbmFsbWFya2VyWzFdIDogc3QgPT09IG9wdHMub3B0aW9uYWxtYXJrZXJbMV0gPyBzdCA9IG9wdHMub3B0aW9uYWxtYXJrZXJbMF0gOiBzdCA9PT0gb3B0cy5ncm91cG1hcmtlclswXSA/IHN0ID0gb3B0cy5ncm91cG1hcmtlclsxXSA6IHN0ID09PSBvcHRzLmdyb3VwbWFya2VyWzFdICYmIChzdCA9IG9wdHMuZ3JvdXBtYXJrZXJbMF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgc3Q7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNrVG9rZW47XG4gICAgICAgICAgICAgICAgfShtYXNrVG9rZW5zWzBdKSwgbWFza1Rva2VucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgSW5wdXRtYXNrLmV4dGVuZERlZmF1bHRzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgJC5leHRlbmQoITAsIElucHV0bWFzay5wcm90b3R5cGUuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICB9LCBJbnB1dG1hc2suZXh0ZW5kRGVmaW5pdGlvbnMgPSBmdW5jdGlvbihkZWZpbml0aW9uKSB7XG4gICAgICAgICAgICAkLmV4dGVuZCghMCwgSW5wdXRtYXNrLnByb3RvdHlwZS5kZWZpbml0aW9ucywgZGVmaW5pdGlvbik7XG4gICAgICAgIH0sIElucHV0bWFzay5leHRlbmRBbGlhc2VzID0gZnVuY3Rpb24oYWxpYXMpIHtcbiAgICAgICAgICAgICQuZXh0ZW5kKCEwLCBJbnB1dG1hc2sucHJvdG90eXBlLmFsaWFzZXMsIGFsaWFzKTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLmZvcm1hdCA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIElucHV0bWFzayhvcHRpb25zKS5mb3JtYXQodmFsdWUsIG1ldGFkYXRhKTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLnVubWFzayA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gSW5wdXRtYXNrKG9wdGlvbnMpLnVubWFza2VkdmFsdWUodmFsdWUpO1xuICAgICAgICB9LCBJbnB1dG1hc2suaXNWYWxpZCA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gSW5wdXRtYXNrKG9wdGlvbnMpLmlzVmFsaWQodmFsdWUpO1xuICAgICAgICB9LCBJbnB1dG1hc2sucmVtb3ZlID0gZnVuY3Rpb24oZWxlbXMpIHtcbiAgICAgICAgICAgIFwic3RyaW5nXCIgPT0gdHlwZW9mIGVsZW1zICYmIChlbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1zKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1zKSksIFxuICAgICAgICAgICAgZWxlbXMgPSBlbGVtcy5ub2RlTmFtZSA/IFsgZWxlbXMgXSA6IGVsZW1zLCAkLmVhY2goZWxlbXMsIGZ1bmN0aW9uKG5keCwgZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2sgJiYgZWwuaW5wdXRtYXNrLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIElucHV0bWFzay5zZXRWYWx1ZSA9IGZ1bmN0aW9uKGVsZW1zLCB2YWx1ZSkge1xuICAgICAgICAgICAgXCJzdHJpbmdcIiA9PSB0eXBlb2YgZWxlbXMgJiYgKGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbXMpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbXMpKSwgXG4gICAgICAgICAgICBlbGVtcyA9IGVsZW1zLm5vZGVOYW1lID8gWyBlbGVtcyBdIDogZWxlbXMsICQuZWFjaChlbGVtcywgZnVuY3Rpb24obmR4LCBlbCkge1xuICAgICAgICAgICAgICAgIGVsLmlucHV0bWFzayA/IGVsLmlucHV0bWFzay5zZXRWYWx1ZSh2YWx1ZSkgOiAkKGVsKS50cmlnZ2VyKFwic2V0dmFsdWVcIiwgWyB2YWx1ZSBdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBJbnB1dG1hc2suZXNjYXBlUmVnZXggPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKFwiKFxcXFxcIiArIFsgXCIvXCIsIFwiLlwiLCBcIipcIiwgXCIrXCIsIFwiP1wiLCBcInxcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiLCBcIn1cIiwgXCJcXFxcXCIsIFwiJFwiLCBcIl5cIiBdLmpvaW4oXCJ8XFxcXFwiKSArIFwiKVwiLCBcImdpbVwiKSwgXCJcXFxcJDFcIik7XG4gICAgICAgIH0sIElucHV0bWFzay5rZXlDb2RlID0ge1xuICAgICAgICAgICAgQkFDS1NQQUNFOiA4LFxuICAgICAgICAgICAgQkFDS1NQQUNFX1NBRkFSSTogMTI3LFxuICAgICAgICAgICAgREVMRVRFOiA0NixcbiAgICAgICAgICAgIERPV046IDQwLFxuICAgICAgICAgICAgRU5EOiAzNSxcbiAgICAgICAgICAgIEVOVEVSOiAxMyxcbiAgICAgICAgICAgIEVTQ0FQRTogMjcsXG4gICAgICAgICAgICBIT01FOiAzNixcbiAgICAgICAgICAgIElOU0VSVDogNDUsXG4gICAgICAgICAgICBMRUZUOiAzNyxcbiAgICAgICAgICAgIFBBR0VfRE9XTjogMzQsXG4gICAgICAgICAgICBQQUdFX1VQOiAzMyxcbiAgICAgICAgICAgIFJJR0hUOiAzOSxcbiAgICAgICAgICAgIFNQQUNFOiAzMixcbiAgICAgICAgICAgIFRBQjogOSxcbiAgICAgICAgICAgIFVQOiAzOCxcbiAgICAgICAgICAgIFg6IDg4LFxuICAgICAgICAgICAgQ09OVFJPTDogMTdcbiAgICAgICAgfSwgSW5wdXRtYXNrO1xuICAgIH0sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18gPSBbIF9fd2VicGFja19yZXF1aXJlX18oMCksIF9fd2VicGFja19yZXF1aXJlX18oNSksIF9fd2VicGFja19yZXF1aXJlX18oNikgXSwgXG4gICAgdm9pZCAwID09PSAoX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIChfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18gPSBmYWN0b3J5KSA/IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXy5hcHBseShleHBvcnRzLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fKSA6IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXykgfHwgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pO1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuICAgIHZhciBfaW5wdXRtYXNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXygxKSksIF9pbnB1dG1hc2s0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSwgX2pxdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMikpO1xuICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2lucHV0bWFzazQuZGVmYXVsdCA9PT0gX2pxdWVyeTIuZGVmYXVsdCAmJiBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKSwgd2luZG93LklucHV0bWFzayA9IF9pbnB1dG1hc2syLmRlZmF1bHQ7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXywgZmFjdG9yeTtcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gICAgZmFjdG9yeSA9IGZ1bmN0aW9uKCQsIElucHV0bWFzaykge1xuICAgICAgICB2YXIgZm9ybWF0Q29kZSA9IHtcbiAgICAgICAgICAgIGQ6IFsgXCJbMS05XXxbMTJdWzAtOV18M1swMV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0RGF0ZSwgXCJkYXlcIiwgRGF0ZS5wcm90b3R5cGUuZ2V0RGF0ZSBdLFxuICAgICAgICAgICAgZGQ6IFsgXCIwWzEtOV18WzEyXVswLTldfDNbMDFdXCIsIERhdGUucHJvdG90eXBlLnNldERhdGUsIFwiZGF5XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0RGF0ZS5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIGRkZDogWyBcIlwiIF0sXG4gICAgICAgICAgICBkZGRkOiBbIFwiXCIgXSxcbiAgICAgICAgICAgIG06IFsgXCJbMS05XXwxWzAxMl1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TW9udGgsIFwibW9udGhcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGUucHJvdG90eXBlLmdldE1vbnRoLmNhbGwodGhpcykgKyAxO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgbW06IFsgXCIwWzEtOV18MVswMTJdXCIsIERhdGUucHJvdG90eXBlLnNldE1vbnRoLCBcIm1vbnRoXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0TW9udGguY2FsbCh0aGlzKSArIDEsIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgbW1tOiBbIFwiXCIgXSxcbiAgICAgICAgICAgIG1tbW06IFsgXCJcIiBdLFxuICAgICAgICAgICAgeXk6IFsgXCJbMC05XXsyfVwiLCBEYXRlLnByb3RvdHlwZS5zZXRGdWxsWWVhciwgXCJ5ZWFyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0RnVsbFllYXIuY2FsbCh0aGlzKSwgMik7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICB5eXl5OiBbIFwiWzAtOV17NH1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0RnVsbFllYXIsIFwieWVhclwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldEZ1bGxZZWFyLmNhbGwodGhpcyksIDQpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgaDogWyBcIlsxLTldfDFbMC0yXVwiLCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBEYXRlLnByb3RvdHlwZS5nZXRIb3VycyBdLFxuICAgICAgICAgICAgaGg6IFsgXCIwWzEtOV18MVswLTJdXCIsIERhdGUucHJvdG90eXBlLnNldEhvdXJzLCBcImhvdXJzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0SG91cnMuY2FsbCh0aGlzKSwgMik7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBoaGg6IFsgXCJbMC05XStcIiwgRGF0ZS5wcm90b3R5cGUuc2V0SG91cnMsIFwiaG91cnNcIiwgRGF0ZS5wcm90b3R5cGUuZ2V0SG91cnMgXSxcbiAgICAgICAgICAgIEg6IFsgXCIxP1swLTldfDJbMC0zXVwiLCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBEYXRlLnByb3RvdHlwZS5nZXRIb3VycyBdLFxuICAgICAgICAgICAgSEg6IFsgXCJbMDFdWzAtOV18MlswLTNdXCIsIERhdGUucHJvdG90eXBlLnNldEhvdXJzLCBcImhvdXJzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0SG91cnMuY2FsbCh0aGlzKSwgMik7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBISEg6IFsgXCJbMC05XStcIiwgRGF0ZS5wcm90b3R5cGUuc2V0SG91cnMsIFwiaG91cnNcIiwgRGF0ZS5wcm90b3R5cGUuZ2V0SG91cnMgXSxcbiAgICAgICAgICAgIE06IFsgXCJbMS01XT9bMC05XVwiLCBEYXRlLnByb3RvdHlwZS5zZXRNaW51dGVzLCBcIm1pbnV0ZXNcIiwgRGF0ZS5wcm90b3R5cGUuZ2V0TWludXRlcyBdLFxuICAgICAgICAgICAgTU06IFsgXCJbMC01XVswLTldXCIsIERhdGUucHJvdG90eXBlLnNldE1pbnV0ZXMsIFwibWludXRlc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldE1pbnV0ZXMuY2FsbCh0aGlzKSwgMik7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBzOiBbIFwiWzEtNV0/WzAtOV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0U2Vjb25kcywgXCJzZWNvbmRzXCIsIERhdGUucHJvdG90eXBlLmdldFNlY29uZHMgXSxcbiAgICAgICAgICAgIHNzOiBbIFwiWzAtNV1bMC05XVwiLCBEYXRlLnByb3RvdHlwZS5zZXRTZWNvbmRzLCBcInNlY29uZHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRTZWNvbmRzLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgbDogWyBcIlswLTldezN9XCIsIERhdGUucHJvdG90eXBlLnNldE1pbGxpc2Vjb25kcywgXCJtaWxsaXNlY29uZHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRNaWxsaXNlY29uZHMuY2FsbCh0aGlzKSwgMyk7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBMOiBbIFwiWzAtOV17Mn1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TWlsbGlzZWNvbmRzLCBcIm1pbGxpc2Vjb25kc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldE1pbGxpc2Vjb25kcy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIHQ6IFsgXCJbYXBdXCIgXSxcbiAgICAgICAgICAgIHR0OiBbIFwiW2FwXW1cIiBdLFxuICAgICAgICAgICAgVDogWyBcIltBUF1cIiBdLFxuICAgICAgICAgICAgVFQ6IFsgXCJbQVBdTVwiIF0sXG4gICAgICAgICAgICBaOiBbIFwiXCIgXSxcbiAgICAgICAgICAgIG86IFsgXCJcIiBdLFxuICAgICAgICAgICAgUzogWyBcIlwiIF1cbiAgICAgICAgfSwgZm9ybWF0QWxpYXMgPSB7XG4gICAgICAgICAgICBpc29EYXRlOiBcInl5eXktbW0tZGRcIixcbiAgICAgICAgICAgIGlzb1RpbWU6IFwiSEg6TU06c3NcIixcbiAgICAgICAgICAgIGlzb0RhdGVUaW1lOiBcInl5eXktbW0tZGQnVCdISDpNTTpzc1wiLFxuICAgICAgICAgICAgaXNvVXRjRGF0ZVRpbWU6IFwiVVRDOnl5eXktbW0tZGQnVCdISDpNTTpzcydaJ1wiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGdldFRva2VuaXplcihvcHRzKSB7XG4gICAgICAgICAgICBpZiAoIW9wdHMudG9rZW5pemVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5keCBpbiBmb3JtYXRDb2RlKSAtMSA9PT0gdG9rZW5zLmluZGV4T2YobmR4WzBdKSAmJiB0b2tlbnMucHVzaChuZHhbMF0pO1xuICAgICAgICAgICAgICAgIG9wdHMudG9rZW5pemVyID0gXCIoXCIgKyB0b2tlbnMuam9pbihcIit8XCIpICsgXCIpKz98LlwiLCBvcHRzLnRva2VuaXplciA9IG5ldyBSZWdFeHAob3B0cy50b2tlbml6ZXIsIFwiZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcHRzLnRva2VuaXplcjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwYXJzZShmb3JtYXQsIGRhdGVPYmpWYWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgbWF0Y2gsIG1hc2sgPSBcIlwiOyBtYXRjaCA9IGdldFRva2VuaXplcihvcHRzKS5leGVjKGZvcm1hdCk7ICkge1xuICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IGRhdGVPYmpWYWx1ZSkgaWYgKGZvcm1hdENvZGVbbWF0Y2hbMF1dKSBtYXNrICs9IFwiKFwiICsgZm9ybWF0Q29kZVttYXRjaFswXV1bMF0gKyBcIilcIjsgZWxzZSBzd2l0Y2ggKG1hdGNoWzBdKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiW1wiOlxuICAgICAgICAgICAgICAgICAgICBtYXNrICs9IFwiKFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgY2FzZSBcIl1cIjpcbiAgICAgICAgICAgICAgICAgICAgbWFzayArPSBcIik/XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBtYXNrICs9IElucHV0bWFzay5lc2NhcGVSZWdleChtYXRjaFswXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb3JtYXRDb2RlW21hdGNoWzBdXSkgbWFzayArPSBmb3JtYXRDb2RlW21hdGNoWzBdXVszXS5jYWxsKGRhdGVPYmpWYWx1ZS5kYXRlKTsgZWxzZSBtYXNrICs9IG1hdGNoWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hc2s7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGFkKHZhbCwgbGVuKSB7XG4gICAgICAgICAgICBmb3IgKHZhbCA9IFN0cmluZyh2YWwpLCBsZW4gPSBsZW4gfHwgMjsgdmFsLmxlbmd0aCA8IGxlbjsgKSB2YWwgPSBcIjBcIiArIHZhbDtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYW5hbHlzZU1hc2sobWFza1N0cmluZywgZm9ybWF0LCBvcHRzKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0UHJvcCwgbWF0Y2gsIGRhdGVPcGVyYXRpb24sIGRhdGVPYmogPSB7XG4gICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoMSwgMCwgMSlcbiAgICAgICAgICAgIH0sIG1hc2sgPSBtYXNrU3RyaW5nO1xuICAgICAgICAgICAgZnVuY3Rpb24gZXh0ZW5kWWVhcih5ZWFyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcnJlY3RlZHllYXIgPSA0ID09PSB5ZWFyLmxlbmd0aCA/IHllYXIgOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKS5zdWJzdHIoMCwgNCAtIHllYXIubGVuZ3RoKSArIHllYXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMubWluICYmIG9wdHMubWluLnllYXIgJiYgb3B0cy5tYXggJiYgb3B0cy5tYXgueWVhciA/IChjb3JyZWN0ZWR5ZWFyID0gY29ycmVjdGVkeWVhci5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIiksIFxuICAgICAgICAgICAgICAgIGNvcnJlY3RlZHllYXIgKz0gb3B0cy5taW4ueWVhciA9PSBvcHRzLm1heC55ZWFyID8gb3B0cy5taW4ueWVhci5zdWJzdHIoY29ycmVjdGVkeWVhci5sZW5ndGgpIDogKFwiXCIgIT09IGNvcnJlY3RlZHllYXIgJiYgMCA9PSBvcHRzLm1heC55ZWFyLmluZGV4T2YoY29ycmVjdGVkeWVhcikgPyBwYXJzZUludChvcHRzLm1heC55ZWFyKSAtIDEgOiBwYXJzZUludChvcHRzLm1pbi55ZWFyKSArIDEpLnRvU3RyaW5nKCkuc3Vic3RyKGNvcnJlY3RlZHllYXIubGVuZ3RoKSkgOiBjb3JyZWN0ZWR5ZWFyID0gY29ycmVjdGVkeWVhci5yZXBsYWNlKC9bXjAtOV0vZywgXCIwXCIpLCBcbiAgICAgICAgICAgICAgICBjb3JyZWN0ZWR5ZWFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0VmFsdWUoZGF0ZU9iaiwgdmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICBcInllYXJcIiA9PT0gdGFyZ2V0UHJvcCA/IChkYXRlT2JqW3RhcmdldFByb3BdID0gZXh0ZW5kWWVhcih2YWx1ZSksIGRhdGVPYmpbXCJyYXdcIiArIHRhcmdldFByb3BdID0gdmFsdWUpIDogZGF0ZU9ialt0YXJnZXRQcm9wXSA9IG9wdHMubWluICYmIHZhbHVlLm1hdGNoKC9bXjAtOV0vKSA/IG9wdHMubWluW3RhcmdldFByb3BdIDogdmFsdWUsIFxuICAgICAgICAgICAgICAgIHZvaWQgMCAhPT0gZGF0ZU9wZXJhdGlvbiAmJiBkYXRlT3BlcmF0aW9uLmNhbGwoZGF0ZU9iai5kYXRlLCBcIm1vbnRoXCIgPT0gdGFyZ2V0UHJvcCA/IHBhcnNlSW50KGRhdGVPYmpbdGFyZ2V0UHJvcF0pIC0gMSA6IGRhdGVPYmpbdGFyZ2V0UHJvcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIG1hc2spIHtcbiAgICAgICAgICAgICAgICBmb3IgKDttYXRjaCA9IGdldFRva2VuaXplcihvcHRzKS5leGVjKGZvcm1hdCk7ICkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBtYXNrLnNsaWNlKDAsIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdENvZGUuaGFzT3duUHJvcGVydHkobWF0Y2hbMF0pICYmICh0YXJnZXRQcm9wID0gZm9ybWF0Q29kZVttYXRjaFswXV1bMl0sIGRhdGVPcGVyYXRpb24gPSBmb3JtYXRDb2RlW21hdGNoWzBdXVsxXSwgXG4gICAgICAgICAgICAgICAgICAgIHNldFZhbHVlKGRhdGVPYmosIHZhbHVlLCBvcHRzKSksIG1hc2sgPSBtYXNrLnNsaWNlKHZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlT2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBJbnB1dG1hc2suZXh0ZW5kQWxpYXNlcyh7XG4gICAgICAgICAgICBkYXRldGltZToge1xuICAgICAgICAgICAgICAgIG1hc2s6IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdENvZGUuUyA9IG9wdHMuaTE4bi5vcmRpbmFsU3VmZml4LmpvaW4oXCJ8XCIpLCBvcHRzLmlucHV0Rm9ybWF0ID0gZm9ybWF0QWxpYXNbb3B0cy5pbnB1dEZvcm1hdF0gfHwgb3B0cy5pbnB1dEZvcm1hdCwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGlzcGxheUZvcm1hdCA9IGZvcm1hdEFsaWFzW29wdHMuZGlzcGxheUZvcm1hdF0gfHwgb3B0cy5kaXNwbGF5Rm9ybWF0IHx8IG9wdHMuaW5wdXRGb3JtYXQsIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLm91dHB1dEZvcm1hdCA9IGZvcm1hdEFsaWFzW29wdHMub3V0cHV0Rm9ybWF0XSB8fCBvcHRzLm91dHB1dEZvcm1hdCB8fCBvcHRzLmlucHV0Rm9ybWF0LCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wbGFjZWhvbGRlciA9IFwiXCIgIT09IG9wdHMucGxhY2Vob2xkZXIgPyBvcHRzLnBsYWNlaG9sZGVyIDogb3B0cy5pbnB1dEZvcm1hdC5yZXBsYWNlKC9bXFxbXFxdXS8sIFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5taW4gPSBhbmFseXNlTWFzayhvcHRzLm1pbiwgb3B0cy5pbnB1dEZvcm1hdCwgb3B0cyksIG9wdHMubWF4ID0gYW5hbHlzZU1hc2sob3B0cy5tYXgsIG9wdHMuaW5wdXRGb3JtYXQsIG9wdHMpLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5yZWdleCA9IHBhcnNlKG9wdHMuaW5wdXRGb3JtYXQsIHZvaWQgMCwgb3B0cyksIG51bGw7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJcIixcbiAgICAgICAgICAgICAgICBpbnB1dEZvcm1hdDogXCJpc29EYXRlVGltZVwiLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlGb3JtYXQ6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICBvdXRwdXRGb3JtYXQ6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICBtaW46IG51bGwsXG4gICAgICAgICAgICAgICAgbWF4OiBudWxsLFxuICAgICAgICAgICAgICAgIGkxOG46IHtcbiAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXM6IFsgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIiwgXCJTdW5cIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiLCBcIlN1bmRheVwiIF0sXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXM6IFsgXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIiwgXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiIF0sXG4gICAgICAgICAgICAgICAgICAgIG9yZGluYWxTdWZmaXg6IFsgXCJzdFwiLCBcIm5kXCIsIFwicmRcIiwgXCJ0aFwiIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvc3RWYWxpZGF0aW9uOiBmdW5jdGlvbihidWZmZXIsIGN1cnJlbnRSZXN1bHQsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGN1cnJlbnRSZXN1bHQsIGRhdGVQYXJ0cyA9IGFuYWx5c2VNYXNrKGJ1ZmZlci5qb2luKFwiXCIpLCBvcHRzLmlucHV0Rm9ybWF0LCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAmJiBkYXRlUGFydHMuZGF0ZS5nZXRUaW1lKCkgPT0gZGF0ZVBhcnRzLmRhdGUuZ2V0VGltZSgpICYmIChyZXN1bHQgPSAocmVzdWx0ID0gZnVuY3Rpb24oZGF0ZVBhcnRzLCBjdXJyZW50UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCFpc0Zpbml0ZShkYXRlUGFydHMuZGF5KSB8fCBcIjI5XCIgPT0gZGF0ZVBhcnRzLmRheSAmJiAhaXNGaW5pdGUoZGF0ZVBhcnRzLnJhd3llYXIpIHx8IG5ldyBEYXRlKGRhdGVQYXJ0cy5kYXRlLmdldEZ1bGxZZWFyKCksIGlzRmluaXRlKGRhdGVQYXJ0cy5tb250aCkgPyBkYXRlUGFydHMubW9udGggOiBkYXRlUGFydHMuZGF0ZS5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpID49IGRhdGVQYXJ0cy5kYXkpICYmIGN1cnJlbnRSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH0oZGF0ZVBhcnRzLCByZXN1bHQpKSAmJiBmdW5jdGlvbihkYXRlUGFydHMsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLm1pbiAmJiBvcHRzLm1pbi5kYXRlLmdldFRpbWUoKSA9PSBvcHRzLm1pbi5kYXRlLmdldFRpbWUoKSAmJiAocmVzdWx0ID0gb3B0cy5taW4uZGF0ZS5nZXRUaW1lKCkgPD0gZGF0ZVBhcnRzLmRhdGUuZ2V0VGltZSgpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgJiYgb3B0cy5tYXggJiYgb3B0cy5tYXguZGF0ZS5nZXRUaW1lKCkgPT0gb3B0cy5tYXguZGF0ZS5nZXRUaW1lKCkgJiYgKHJlc3VsdCA9IG9wdHMubWF4LmRhdGUuZ2V0VGltZSgpID49IGRhdGVQYXJ0cy5kYXRlLmdldFRpbWUoKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KGRhdGVQYXJ0cywgb3B0cykpLCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbktleURvd246IGZ1bmN0aW9uKGUsIGJ1ZmZlciwgY2FyZXRQb3MsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuY3RybEtleSAmJiBlLmtleUNvZGUgPT09IElucHV0bWFzay5rZXlDb2RlLlJJR0hUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtYXRjaCwgdG9kYXkgPSBuZXcgRGF0ZSgpLCBkYXRlID0gXCJcIjsgbWF0Y2ggPSBnZXRUb2tlbml6ZXIob3B0cykuZXhlYyhvcHRzLmlucHV0Rm9ybWF0KTsgKSBcImRcIiA9PT0gbWF0Y2hbMF0uY2hhckF0KDApID8gZGF0ZSArPSBwYWQodG9kYXkuZ2V0RGF0ZSgpLCBtYXRjaFswXS5sZW5ndGgpIDogXCJtXCIgPT09IG1hdGNoWzBdLmNoYXJBdCgwKSA/IGRhdGUgKz0gcGFkKHRvZGF5LmdldE1vbnRoKCkgKyAxLCBtYXRjaFswXS5sZW5ndGgpIDogXCJ5eXl5XCIgPT09IG1hdGNoWzBdID8gZGF0ZSArPSB0b2RheS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkgOiBcInlcIiA9PT0gbWF0Y2hbMF0uY2hhckF0KDApICYmIChkYXRlICs9IHBhZCh0b2RheS5nZXRZZWFyKCksIG1hdGNoWzBdLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dG1hc2suX3ZhbHVlU2V0KGRhdGUpLCAkKHRoaXMpLnRyaWdnZXIoXCJzZXR2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Vbk1hc2s6IGZ1bmN0aW9uKG1hc2tlZFZhbHVlLCB1bm1hc2tlZFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZShvcHRzLm91dHB1dEZvcm1hdCwgYW5hbHlzZU1hc2sobWFza2VkVmFsdWUsIG9wdHMuaW5wdXRGb3JtYXQsIG9wdHMpLCBvcHRzKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNhc2luZzogZnVuY3Rpb24oZWxlbSwgdGVzdCwgcG9zLCB2YWxpZFBvc2l0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMCA9PSB0ZXN0Lm5hdGl2ZURlZi5pbmRleE9mKFwiW2FwXVwiKSA/IGVsZW0udG9Mb3dlckNhc2UoKSA6IDAgPT0gdGVzdC5uYXRpdmVEZWYuaW5kZXhPZihcIltBUF1cIikgPyBlbGVtLnRvVXBwZXJDYXNlKCkgOiBlbGVtO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5zZXJ0TW9kZTogITFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIElucHV0bWFzaztcbiAgICB9LCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fID0gWyBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpIF0sIFxuICAgIHZvaWQgMCA9PT0gKF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiAoX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fID0gZmFjdG9yeSkgPyBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18uYXBwbHkoZXhwb3J0cywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXykgOiBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18pIHx8IChtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fKTtcbn0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXztcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gICAgdm9pZCAwID09PSAoX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9LmNhbGwoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXywgZXhwb3J0cywgbW9kdWxlKSkgfHwgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pO1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fO1xuICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgICB2b2lkIDAgPT09IChfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgfS5jYWxsKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18sIGV4cG9ydHMsIG1vZHVsZSkpIHx8IChtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fKTtcbn0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fLCBmYWN0b3J5O1xuICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgICBmYWN0b3J5ID0gZnVuY3Rpb24oJCwgSW5wdXRtYXNrKSB7XG4gICAgICAgIHJldHVybiBJbnB1dG1hc2suZXh0ZW5kRGVmaW5pdGlvbnMoe1xuICAgICAgICAgICAgQToge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1aYS160JAt0Y/QgdGRw4Atw7/CtV1cIixcbiAgICAgICAgICAgICAgICBjYXNpbmc6IFwidXBwZXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiJlwiOiB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTlBLVphLXrQkC3Rj9CB0ZHDgC3Dv8K1XVwiLFxuICAgICAgICAgICAgICAgIGNhc2luZzogXCJ1cHBlclwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIjXCI6IHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtRmEtZl1cIixcbiAgICAgICAgICAgICAgICBjYXNpbmc6IFwidXBwZXJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgSW5wdXRtYXNrLmV4dGVuZEFsaWFzZXMoe1xuICAgICAgICAgICAgY3NzdW5pdDoge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlsrLV0/WzAtOV0rXFxcXC4/KFswLTldKyk/KHB4fGVtfHJlbXxleHwlfGlufGNtfG1tfHB0fHBjKVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXJsOiB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKGh0dHBzP3xmdHApLy8uKlwiLFxuICAgICAgICAgICAgICAgIGF1dG9Vbm1hc2s6ICExXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXA6IHtcbiAgICAgICAgICAgICAgICBtYXNrOiBcImlbaVtpXV0uaVtpW2ldXS5pW2lbaV1dLmlbaVtpXV1cIixcbiAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBpOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKGNocnMsIG1hc2tzZXQsIHBvcywgc3RyaWN0LCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvcyAtIDEgPiAtMSAmJiBcIi5cIiAhPT0gbWFza3NldC5idWZmZXJbcG9zIC0gMV0gPyAoY2hycyA9IG1hc2tzZXQuYnVmZmVyW3BvcyAtIDFdICsgY2hycywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hycyA9IHBvcyAtIDIgPiAtMSAmJiBcIi5cIiAhPT0gbWFza3NldC5idWZmZXJbcG9zIC0gMl0gPyBtYXNrc2V0LmJ1ZmZlcltwb3MgLSAyXSArIGNocnMgOiBcIjBcIiArIGNocnMpIDogY2hycyA9IFwiMDBcIiArIGNocnMsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoXCIyNVswLTVdfDJbMC00XVswLTldfFswMV1bMC05XVswLTldXCIpLnRlc3QoY2hycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5NYXNrOiBmdW5jdGlvbihtYXNrZWRWYWx1ZSwgdW5tYXNrZWRWYWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFza2VkVmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnB1dG1vZGU6IFwibnVtZXJpY1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgICAgICBtYXNrOiBcIip7MSw2NH1bLip7MSw2NH1dWy4qezEsNjR9XVsuKnsxLDYzfV1ALXsxLDYzfS4tezEsNjN9Wy4tezEsNjN9XVsuLXsxLDYzfV1cIixcbiAgICAgICAgICAgICAgICBncmVlZHk6ICExLFxuICAgICAgICAgICAgICAgIGNhc2luZzogXCJsb3dlclwiLFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlUGFzdGU6IGZ1bmN0aW9uKHBhc3RlZFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocGFzdGVkVmFsdWUgPSBwYXN0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpKS5yZXBsYWNlKFwibWFpbHRvOlwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiKlwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOe+8kS3vvJlBLVphLXrQkC3Rj9CB0ZHDgC3Dv8K1ISMkJSYnKisvPT9eX2B7fH1+LV1cIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcIi1cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTlBLVphLXotXVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5NYXNrOiBmdW5jdGlvbihtYXNrZWRWYWx1ZSwgdW5tYXNrZWRWYWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFza2VkVmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnB1dG1vZGU6IFwiZW1haWxcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hYzoge1xuICAgICAgICAgICAgICAgIG1hc2s6IFwiIyM6IyM6IyM6IyM6IyM6IyNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpbjoge1xuICAgICAgICAgICAgICAgIG1hc2s6IFwiVnsxM305ezR9XCIsXG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgVjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIltBLUhKLU5QUi1aYS1oai1ucHItelxcXFxkXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBcInVwcGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiAhMCxcbiAgICAgICAgICAgICAgICBhdXRvVW5tYXNrOiAhMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgSW5wdXRtYXNrO1xuICAgIH0sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18gPSBbIF9fd2VicGFja19yZXF1aXJlX18oMCksIF9fd2VicGFja19yZXF1aXJlX18oMSkgXSwgXG4gICAgdm9pZCAwID09PSAoX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIChfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18gPSBmYWN0b3J5KSA/IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXy5hcHBseShleHBvcnRzLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fKSA6IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXykgfHwgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pO1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18sIGZhY3Rvcnk7XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICAgIGZhY3RvcnkgPSBmdW5jdGlvbigkLCBJbnB1dG1hc2ssIHVuZGVmaW5lZCkge1xuICAgICAgICBmdW5jdGlvbiBhdXRvRXNjYXBlKHR4dCwgb3B0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgZXNjYXBlZFR4dCA9IFwiXCIsIGkgPSAwOyBpIDwgdHh0Lmxlbmd0aDsgaSsrKSBJbnB1dG1hc2sucHJvdG90eXBlLmRlZmluaXRpb25zW3R4dC5jaGFyQXQoaSldIHx8IG9wdHMuZGVmaW5pdGlvbnNbdHh0LmNoYXJBdChpKV0gfHwgb3B0cy5vcHRpb25hbG1hcmtlci5zdGFydCA9PT0gdHh0LmNoYXJBdChpKSB8fCBvcHRzLm9wdGlvbmFsbWFya2VyLmVuZCA9PT0gdHh0LmNoYXJBdChpKSB8fCBvcHRzLnF1YW50aWZpZXJtYXJrZXIuc3RhcnQgPT09IHR4dC5jaGFyQXQoaSkgfHwgb3B0cy5xdWFudGlmaWVybWFya2VyLmVuZCA9PT0gdHh0LmNoYXJBdChpKSB8fCBvcHRzLmdyb3VwbWFya2VyLnN0YXJ0ID09PSB0eHQuY2hhckF0KGkpIHx8IG9wdHMuZ3JvdXBtYXJrZXIuZW5kID09PSB0eHQuY2hhckF0KGkpIHx8IG9wdHMuYWx0ZXJuYXRvcm1hcmtlciA9PT0gdHh0LmNoYXJBdChpKSA/IGVzY2FwZWRUeHQgKz0gXCJcXFxcXCIgKyB0eHQuY2hhckF0KGkpIDogZXNjYXBlZFR4dCArPSB0eHQuY2hhckF0KGkpO1xuICAgICAgICAgICAgcmV0dXJuIGVzY2FwZWRUeHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIElucHV0bWFzay5leHRlbmRBbGlhc2VzKHtcbiAgICAgICAgICAgIG51bWVyaWM6IHtcbiAgICAgICAgICAgICAgICBtYXNrOiBmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgwICE9PSBvcHRzLnJlcGVhdCAmJiBpc05hTihvcHRzLmludGVnZXJEaWdpdHMpICYmIChvcHRzLmludGVnZXJEaWdpdHMgPSBvcHRzLnJlcGVhdCksIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLnJlcGVhdCA9IDAsIG9wdHMuZ3JvdXBTZXBhcmF0b3IgPT09IG9wdHMucmFkaXhQb2ludCAmJiBvcHRzLmRpZ2l0cyAmJiBcIjBcIiAhPT0gb3B0cy5kaWdpdHMgJiYgKFwiLlwiID09PSBvcHRzLnJhZGl4UG9pbnQgPyBvcHRzLmdyb3VwU2VwYXJhdG9yID0gXCIsXCIgOiBcIixcIiA9PT0gb3B0cy5yYWRpeFBvaW50ID8gb3B0cy5ncm91cFNlcGFyYXRvciA9IFwiLlwiIDogb3B0cy5ncm91cFNlcGFyYXRvciA9IFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgPT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IgJiYgKG9wdHMuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciA9IHVuZGVmaW5lZCksIG9wdHMuYXV0b0dyb3VwID0gb3B0cy5hdXRvR3JvdXAgJiYgXCJcIiAhPT0gb3B0cy5ncm91cFNlcGFyYXRvciwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuYXV0b0dyb3VwICYmIChcInN0cmluZ1wiID09IHR5cGVvZiBvcHRzLmdyb3VwU2l6ZSAmJiBpc0Zpbml0ZShvcHRzLmdyb3VwU2l6ZSkgJiYgKG9wdHMuZ3JvdXBTaXplID0gcGFyc2VJbnQob3B0cy5ncm91cFNpemUpKSwgXG4gICAgICAgICAgICAgICAgICAgIGlzRmluaXRlKG9wdHMuaW50ZWdlckRpZ2l0cykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VwcyA9IE1hdGguZmxvb3Iob3B0cy5pbnRlZ2VyRGlnaXRzIC8gb3B0cy5ncm91cFNpemUpLCBtb2QgPSBvcHRzLmludGVnZXJEaWdpdHMgJSBvcHRzLmdyb3VwU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuaW50ZWdlckRpZ2l0cyA9IHBhcnNlSW50KG9wdHMuaW50ZWdlckRpZ2l0cykgKyAoMCA9PT0gbW9kID8gc2VwcyAtIDEgOiBzZXBzKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmludGVnZXJEaWdpdHMgPCAxICYmIChvcHRzLmludGVnZXJEaWdpdHMgPSBcIipcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wbGFjZWhvbGRlci5sZW5ndGggPiAxICYmIChvcHRzLnBsYWNlaG9sZGVyID0gb3B0cy5wbGFjZWhvbGRlci5jaGFyQXQoMCkpLCBcbiAgICAgICAgICAgICAgICAgICAgXCJyYWRpeEZvY3VzXCIgPT09IG9wdHMucG9zaXRpb25DYXJldE9uQ2xpY2sgJiYgXCJcIiA9PT0gb3B0cy5wbGFjZWhvbGRlciAmJiAhMSA9PT0gb3B0cy5pbnRlZ2VyT3B0aW9uYWwgJiYgKG9wdHMucG9zaXRpb25DYXJldE9uQ2xpY2sgPSBcImx2cFwiKSwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGVmaW5pdGlvbnNbXCI7XCJdID0gb3B0cy5kZWZpbml0aW9uc1tcIn5cIl0sIG9wdHMuZGVmaW5pdGlvbnNbXCI7XCJdLmRlZmluaXRpb25TeW1ib2wgPSBcIn5cIiwgXG4gICAgICAgICAgICAgICAgICAgICEwID09PSBvcHRzLm51bWVyaWNJbnB1dCAmJiAob3B0cy5wb3NpdGlvbkNhcmV0T25DbGljayA9IFwicmFkaXhGb2N1c1wiID09PSBvcHRzLnBvc2l0aW9uQ2FyZXRPbkNsaWNrID8gXCJsdnBcIiA6IG9wdHMucG9zaXRpb25DYXJldE9uQ2xpY2ssIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLmRpZ2l0c09wdGlvbmFsID0gITEsIGlzTmFOKG9wdHMuZGlnaXRzKSAmJiAob3B0cy5kaWdpdHMgPSAyKSwgb3B0cy5kZWNpbWFsUHJvdGVjdCA9ICExKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2sgPSBcIlsrXVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFzayArPSBhdXRvRXNjYXBlKG9wdHMucHJlZml4LCBvcHRzKSwgITAgPT09IG9wdHMuaW50ZWdlck9wdGlvbmFsID8gbWFzayArPSBcIn57MSxcIiArIG9wdHMuaW50ZWdlckRpZ2l0cyArIFwifVwiIDogbWFzayArPSBcIn57XCIgKyBvcHRzLmludGVnZXJEaWdpdHMgKyBcIn1cIiwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGlnaXRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRpeERlZiA9IG9wdHMuZGVjaW1hbFByb3RlY3QgPyBcIjpcIiA6IG9wdHMucmFkaXhQb2ludCwgZHEgPSBvcHRzLmRpZ2l0cy50b1N0cmluZygpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRmluaXRlKGRxWzBdKSAmJiBkcVsxXSAmJiBpc0Zpbml0ZShkcVsxXSkgPyBtYXNrICs9IHJhZGl4RGVmICsgXCI7e1wiICsgb3B0cy5kaWdpdHMgKyBcIn1cIiA6IChpc05hTihvcHRzLmRpZ2l0cykgfHwgcGFyc2VJbnQob3B0cy5kaWdpdHMpID4gMCkgJiYgKG9wdHMuZGlnaXRzT3B0aW9uYWwgPyBtYXNrICs9IFwiW1wiICsgcmFkaXhEZWYgKyBcIjt7MSxcIiArIG9wdHMuZGlnaXRzICsgXCJ9XVwiIDogbWFzayArPSByYWRpeERlZiArIFwiO3tcIiArIG9wdHMuZGlnaXRzICsgXCJ9XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNrICs9IGF1dG9Fc2NhcGUob3B0cy5zdWZmaXgsIG9wdHMpLCBtYXNrICs9IFwiWy1dXCIsIG9wdHMuZ3JlZWR5ID0gITEsIG1hc2s7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJcIixcbiAgICAgICAgICAgICAgICBncmVlZHk6ICExLFxuICAgICAgICAgICAgICAgIGRpZ2l0czogXCIqXCIsXG4gICAgICAgICAgICAgICAgZGlnaXRzT3B0aW9uYWw6ICEwLFxuICAgICAgICAgICAgICAgIGVuZm9yY2VEaWdpdHNPbkJsdXI6ICExLFxuICAgICAgICAgICAgICAgIHJhZGl4UG9pbnQ6IFwiLlwiLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uQ2FyZXRPbkNsaWNrOiBcInJhZGl4Rm9jdXNcIixcbiAgICAgICAgICAgICAgICBncm91cFNpemU6IDMsXG4gICAgICAgICAgICAgICAgZ3JvdXBTZXBhcmF0b3I6IFwiXCIsXG4gICAgICAgICAgICAgICAgYXV0b0dyb3VwOiAhMSxcbiAgICAgICAgICAgICAgICBhbGxvd01pbnVzOiAhMCxcbiAgICAgICAgICAgICAgICBuZWdhdGlvblN5bWJvbDoge1xuICAgICAgICAgICAgICAgICAgICBmcm9udDogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgIGJhY2s6IFwiXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGludGVnZXJEaWdpdHM6IFwiK1wiLFxuICAgICAgICAgICAgICAgIGludGVnZXJPcHRpb25hbDogITAsXG4gICAgICAgICAgICAgICAgcHJlZml4OiBcIlwiLFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogXCJcIixcbiAgICAgICAgICAgICAgICByaWdodEFsaWduOiAhMCxcbiAgICAgICAgICAgICAgICBkZWNpbWFsUHJvdGVjdDogITAsXG4gICAgICAgICAgICAgICAgbWluOiBudWxsLFxuICAgICAgICAgICAgICAgIG1heDogbnVsbCxcbiAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgIGluc2VydE1vZGU6ICEwLFxuICAgICAgICAgICAgICAgIGF1dG9Vbm1hc2s6ICExLFxuICAgICAgICAgICAgICAgIHVubWFza0FzTnVtYmVyOiAhMSxcbiAgICAgICAgICAgICAgICBpbnB1dG1vZGU6IFwibnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHByZVZhbGlkYXRpb246IGZ1bmN0aW9uKGJ1ZmZlciwgcG9zLCBjLCBpc1NlbGVjdGlvbiwgb3B0cywgbWFza3NldCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXCItXCIgPT09IGMgfHwgYyA9PT0gb3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCkgcmV0dXJuICEwID09PSBvcHRzLmFsbG93TWludXMgJiYgKG9wdHMuaXNOZWdhdGl2ZSA9IG9wdHMuaXNOZWdhdGl2ZSA9PT0gdW5kZWZpbmVkIHx8ICFvcHRzLmlzTmVnYXRpdmUsIFxuICAgICAgICAgICAgICAgICAgICBcIlwiID09PSBidWZmZXIuam9pbihcIlwiKSB8fCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogcG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9wb3N0OiAhMFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCExID09PSBpc1NlbGVjdGlvbiAmJiBjID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgb3B0cy5kaWdpdHMgIT09IHVuZGVmaW5lZCAmJiAoaXNOYU4ob3B0cy5kaWdpdHMpIHx8IHBhcnNlSW50KG9wdHMuZGlnaXRzKSA+IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhQb3MgPSAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0xICE9PSByYWRpeFBvcyAmJiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3JhZGl4UG9zXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gITAgPT09IG9wdHMubnVtZXJpY0lucHV0ID8gcG9zID09PSByYWRpeFBvcyA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogcmFkaXhQb3MgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvc3RWYWxpZGF0aW9uOiBmdW5jdGlvbihidWZmZXIsIGN1cnJlbnRSZXN1bHQsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IG9wdHMuc3VmZml4LnNwbGl0KFwiXCIpLCBwcmVmaXggPSBvcHRzLnByZWZpeC5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRSZXN1bHQucG9zID09PSB1bmRlZmluZWQgJiYgY3VycmVudFJlc3VsdC5jYXJldCAhPT0gdW5kZWZpbmVkICYmICEwICE9PSBjdXJyZW50UmVzdWx0LmRvcG9zdCkgcmV0dXJuIGN1cnJlbnRSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGN1cnJlbnRSZXN1bHQuY2FyZXQgIT09IHVuZGVmaW5lZCA/IGN1cnJlbnRSZXN1bHQuY2FyZXQgOiBjdXJyZW50UmVzdWx0LnBvcywgbWFza2VkVmFsdWUgPSBidWZmZXIuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5udW1lcmljSW5wdXQgJiYgKGNhcmV0UG9zID0gbWFza2VkVmFsdWUubGVuZ3RoIC0gY2FyZXRQb3MgLSAxLCBtYXNrZWRWYWx1ZSA9IG1hc2tlZFZhbHVlLnJldmVyc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFyQXRQb3MgPSBtYXNrZWRWYWx1ZVtjYXJldFBvc107XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFyQXRQb3MgPT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IgJiYgKGNoYXJBdFBvcyA9IG1hc2tlZFZhbHVlW2NhcmV0UG9zICs9IDFdKSwgXG4gICAgICAgICAgICAgICAgICAgIGNhcmV0UG9zID09PSBtYXNrZWRWYWx1ZS5sZW5ndGggLSBvcHRzLnN1ZmZpeC5sZW5ndGggLSAxICYmIGNoYXJBdFBvcyA9PT0gb3B0cy5yYWRpeFBvaW50KSByZXR1cm4gY3VycmVudFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgY2hhckF0UG9zICE9PSB1bmRlZmluZWQgJiYgY2hhckF0UG9zICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgY2hhckF0UG9zICE9PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250ICYmIGNoYXJBdFBvcyAhPT0gb3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrICYmIChtYXNrZWRWYWx1ZVtjYXJldFBvc10gPSBcIj9cIiwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucHJlZml4Lmxlbmd0aCA+IDAgJiYgY2FyZXRQb3MgPj0gKCExID09PSBvcHRzLmlzTmVnYXRpdmUgPyAxIDogMCkgJiYgY2FyZXRQb3MgPCBvcHRzLnByZWZpeC5sZW5ndGggLSAxICsgKCExID09PSBvcHRzLmlzTmVnYXRpdmUgPyAxIDogMCkgPyBwcmVmaXhbY2FyZXRQb3MgLSAoITEgPT09IG9wdHMuaXNOZWdhdGl2ZSA/IDEgOiAwKV0gPSBcIj9cIiA6IG9wdHMuc3VmZml4Lmxlbmd0aCA+IDAgJiYgY2FyZXRQb3MgPj0gbWFza2VkVmFsdWUubGVuZ3RoIC0gb3B0cy5zdWZmaXgubGVuZ3RoIC0gKCExID09PSBvcHRzLmlzTmVnYXRpdmUgPyAxIDogMCkgJiYgKHN1ZmZpeFtjYXJldFBvcyAtIChtYXNrZWRWYWx1ZS5sZW5ndGggLSBvcHRzLnN1ZmZpeC5sZW5ndGggLSAoITEgPT09IG9wdHMuaXNOZWdhdGl2ZSA/IDEgOiAwKSldID0gXCI/XCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeCA9IHByZWZpeC5qb2luKFwiXCIpLCBzdWZmaXggPSBzdWZmaXguam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NWYWx1ZSA9IG1hc2tlZFZhbHVlLmpvaW4oXCJcIikucmVwbGFjZShwcmVmaXgsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc1ZhbHVlID0gKHByb2Nlc3NWYWx1ZSA9IChwcm9jZXNzVmFsdWUgPSAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2Uoc3VmZml4LCBcIlwiKSkucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLmdyb3VwU2VwYXJhdG9yKSwgXCJnXCIpLCBcIlwiKSkucmVwbGFjZShuZXcgUmVnRXhwKFwiWy1cIiArIElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KSArIFwiXVwiLCBcImdcIiksIFwiXCIpKS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMubmVnYXRpb25TeW1ib2wuYmFjaykgKyBcIiRcIiksIFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgaXNOYU4ob3B0cy5wbGFjZWhvbGRlcikgJiYgKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMucGxhY2Vob2xkZXIpLCBcImdcIiksIFwiXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NWYWx1ZS5sZW5ndGggPiAxICYmIDEgIT09IHByb2Nlc3NWYWx1ZS5pbmRleE9mKG9wdHMucmFkaXhQb2ludCkgJiYgKFwiMFwiID09PSBjaGFyQXRQb3MgJiYgKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKC9eXFw/L2csIFwiXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKC9eMC9nLCBcIlwiKSksIHByb2Nlc3NWYWx1ZS5jaGFyQXQoMCkgPT09IG9wdHMucmFkaXhQb2ludCAmJiBcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgITAgIT09IG9wdHMubnVtZXJpY0lucHV0ICYmIChwcm9jZXNzVmFsdWUgPSBcIjBcIiArIHByb2Nlc3NWYWx1ZSksIFxuICAgICAgICAgICAgICAgICAgICBcIlwiICE9PSBwcm9jZXNzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUuc3BsaXQoXCJcIiksICghb3B0cy5kaWdpdHNPcHRpb25hbCB8fCBvcHRzLmVuZm9yY2VEaWdpdHNPbkJsdXIgJiYgXCJibHVyXCIgPT09IGN1cnJlbnRSZXN1bHQuZXZlbnQpICYmIGlzRmluaXRlKG9wdHMuZGlnaXRzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRpeFBvc2l0aW9uID0gJC5pbkFycmF5KG9wdHMucmFkaXhQb2ludCwgcHJvY2Vzc1ZhbHVlKSwgcnBiID0gJC5pbkFycmF5KG9wdHMucmFkaXhQb2ludCwgbWFza2VkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0xID09PSByYWRpeFBvc2l0aW9uICYmIChwcm9jZXNzVmFsdWUucHVzaChvcHRzLnJhZGl4UG9pbnQpLCByYWRpeFBvc2l0aW9uID0gcHJvY2Vzc1ZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IG9wdHMuZGlnaXRzOyBpKyspIG9wdHMuZGlnaXRzT3B0aW9uYWwgJiYgKCFvcHRzLmVuZm9yY2VEaWdpdHNPbkJsdXIgfHwgXCJibHVyXCIgIT09IGN1cnJlbnRSZXN1bHQuZXZlbnQpIHx8IHByb2Nlc3NWYWx1ZVtyYWRpeFBvc2l0aW9uICsgaV0gIT09IHVuZGVmaW5lZCAmJiBwcm9jZXNzVmFsdWVbcmFkaXhQb3NpdGlvbiArIGldICE9PSBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSA/IC0xICE9PSBycGIgJiYgbWFza2VkVmFsdWVbcnBiICsgaV0gIT09IHVuZGVmaW5lZCAmJiAocHJvY2Vzc1ZhbHVlW3JhZGl4UG9zaXRpb24gKyBpXSA9IHByb2Nlc3NWYWx1ZVtyYWRpeFBvc2l0aW9uICsgaV0gfHwgbWFza2VkVmFsdWVbcnBiICsgaV0pIDogcHJvY2Vzc1ZhbHVlW3JhZGl4UG9zaXRpb24gKyBpXSA9IGN1cnJlbnRSZXN1bHQucGxhY2Vob2xkZXIgfHwgb3B0cy5wbGFjZWhvbGRlci5jaGFyQXQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgIT09IG9wdHMuYXV0b0dyb3VwIHx8IFwiXCIgPT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IgfHwgY2hhckF0UG9zID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgY3VycmVudFJlc3VsdC5wb3MgPT09IHVuZGVmaW5lZCAmJiAhY3VycmVudFJlc3VsdC5kb3Bvc3QpIHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5qb2luKFwiXCIpOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWRkUmFkaXggPSBwcm9jZXNzVmFsdWVbcHJvY2Vzc1ZhbHVlLmxlbmd0aCAtIDFdID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgY3VycmVudFJlc3VsdC5jID09PSBvcHRzLnJhZGl4UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlID0gSW5wdXRtYXNrKGZ1bmN0aW9uKGJ1ZmZlciwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zdE1hc2sgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zdE1hc2sgKz0gXCIoXCIgKyBvcHRzLmdyb3VwU2VwYXJhdG9yICsgXCIqe1wiICsgb3B0cy5ncm91cFNpemUgKyBcIn0peyp9XCIsIFwiXCIgIT09IG9wdHMucmFkaXhQb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGl4U3BsaXQgPSBidWZmZXIuam9pbihcIlwiKS5zcGxpdChvcHRzLnJhZGl4UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXhTcGxpdFsxXSAmJiAocG9zdE1hc2sgKz0gb3B0cy5yYWRpeFBvaW50ICsgXCIqe1wiICsgcmFkaXhTcGxpdFsxXS5tYXRjaCgvXlxcZCpcXD8/XFxkKi8pWzBdLmxlbmd0aCArIFwifVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zdE1hc2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfShwcm9jZXNzVmFsdWUsIG9wdHMpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWVyaWNJbnB1dDogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGppdE1hc2tpbmc6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIqXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOT9dXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZvcm1hdChwcm9jZXNzVmFsdWUuam9pbihcIlwiKSksIGFkZFJhZGl4ICYmIChwcm9jZXNzVmFsdWUgKz0gb3B0cy5yYWRpeFBvaW50KSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlLmNoYXJBdCgwKSA9PT0gb3B0cy5ncm91cFNlcGFyYXRvciAmJiBwcm9jZXNzVmFsdWUuc3Vic3RyKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmlzTmVnYXRpdmUgJiYgXCJibHVyXCIgPT09IGN1cnJlbnRSZXN1bHQuZXZlbnQgJiYgKG9wdHMuaXNOZWdhdGl2ZSA9IFwiMFwiICE9PSBwcm9jZXNzVmFsdWUpLCBcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlID0gcHJlZml4ICsgcHJvY2Vzc1ZhbHVlLCBwcm9jZXNzVmFsdWUgKz0gc3VmZml4LCBvcHRzLmlzTmVnYXRpdmUgJiYgKHByb2Nlc3NWYWx1ZSA9IG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQgKyBwcm9jZXNzVmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzVmFsdWUgKz0gb3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrKSwgcHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnNwbGl0KFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgY2hhckF0UG9zICE9PSB1bmRlZmluZWQpIGlmIChjaGFyQXRQb3MgIT09IG9wdHMucmFkaXhQb2ludCAmJiBjaGFyQXRQb3MgIT09IG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQgJiYgY2hhckF0UG9zICE9PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2spIChjYXJldFBvcyA9ICQuaW5BcnJheShcIj9cIiwgcHJvY2Vzc1ZhbHVlKSkgPiAtMSA/IHByb2Nlc3NWYWx1ZVtjYXJldFBvc10gPSBjaGFyQXRQb3MgOiBjYXJldFBvcyA9IGN1cnJlbnRSZXN1bHQuY2FyZXQgfHwgMDsgZWxzZSBpZiAoY2hhckF0UG9zID09PSBvcHRzLnJhZGl4UG9pbnQgfHwgY2hhckF0UG9zID09PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250IHx8IGNoYXJBdFBvcyA9PT0gb3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Q2FyZXRQb3MgPSAkLmluQXJyYXkoY2hhckF0UG9zLCBwcm9jZXNzVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLTEgIT09IG5ld0NhcmV0UG9zICYmIChjYXJldFBvcyA9IG5ld0NhcmV0UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvcHRzLm51bWVyaWNJbnB1dCAmJiAoY2FyZXRQb3MgPSBwcm9jZXNzVmFsdWUubGVuZ3RoIC0gY2FyZXRQb3MgLSAxLCBwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmV2ZXJzZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJzbHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogY2hhckF0UG9zID09PSB1bmRlZmluZWQgfHwgY3VycmVudFJlc3VsdC5wb3MgIT09IHVuZGVmaW5lZCA/IGNhcmV0UG9zICsgKG9wdHMubnVtZXJpY0lucHV0ID8gLTEgOiAxKSA6IGNhcmV0UG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiBwcm9jZXNzVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlcjogY3VycmVudFJlc3VsdC5kb3Bvc3QgfHwgYnVmZmVyLmpvaW4oXCJcIikgIT09IHByb2Nlc3NWYWx1ZS5qb2luKFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByc2x0LnJlZnJlc2hGcm9tQnVmZmVyID8gcnNsdCA6IGN1cnJlbnRSZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkJlZm9yZVdyaXRlOiBmdW5jdGlvbihlLCBidWZmZXIsIGNhcmV0UG9zLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlKSBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJrZXlkb3duXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5wb3N0VmFsaWRhdGlvbihidWZmZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogY2FyZXRQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9wb3N0OiAhMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgb3B0cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYmx1clwiOlxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjaGVja3ZhbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVubWFza2VkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnBhcnNlTWluTWF4T3B0aW9ucyA9PT0gdW5kZWZpbmVkICYmIChudWxsICE9PSBvcHRzLm1pbiAmJiAob3B0cy5taW4gPSBvcHRzLm1pbi50b1N0cmluZygpLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5ncm91cFNlcGFyYXRvciksIFwiZ1wiKSwgXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLFwiID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgKG9wdHMubWluID0gb3B0cy5taW4ucmVwbGFjZShvcHRzLnJhZGl4UG9pbnQsIFwiLlwiKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMubWluID0gaXNGaW5pdGUob3B0cy5taW4pID8gcGFyc2VGbG9hdChvcHRzLm1pbikgOiBOYU4sIGlzTmFOKG9wdHMubWluKSAmJiAob3B0cy5taW4gPSBOdW1iZXIuTUlOX1ZBTFVFKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgIT09IG9wdHMubWF4ICYmIChvcHRzLm1heCA9IG9wdHMubWF4LnRvU3RyaW5nKCkucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLmdyb3VwU2VwYXJhdG9yKSwgXCJnXCIpLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIsXCIgPT09IG9wdHMucmFkaXhQb2ludCAmJiAob3B0cy5tYXggPSBvcHRzLm1heC5yZXBsYWNlKG9wdHMucmFkaXhQb2ludCwgXCIuXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5tYXggPSBpc0Zpbml0ZShvcHRzLm1heCkgPyBwYXJzZUZsb2F0KG9wdHMubWF4KSA6IE5hTiwgaXNOYU4ob3B0cy5tYXgpICYmIChvcHRzLm1heCA9IE51bWJlci5NQVhfVkFMVUUpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5wYXJzZU1pbk1heE9wdGlvbnMgPSBcImRvbmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KG9wdHMpLCBudWxsICE9PSBvcHRzLm1pbiB8fCBudWxsICE9PSBvcHRzLm1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bm1hc2tlZCA9IG9wdHMub25Vbk1hc2soYnVmZmVyLmpvaW4oXCJcIiksIHVuZGVmaW5lZCwgJC5leHRlbmQoe30sIG9wdHMsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5tYXNrQXNOdW1iZXI6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCBudWxsICE9PSBvcHRzLm1pbiAmJiB1bm1hc2tlZCA8IG9wdHMubWluKSByZXR1cm4gb3B0cy5pc05lZ2F0aXZlID0gb3B0cy5taW4gPCAwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnBvc3RWYWxpZGF0aW9uKG9wdHMubWluLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgb3B0cy5yYWRpeFBvaW50KS5zcGxpdChcIlwiKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogY2FyZXRQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvcG9zdDogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBvcHRzLm1heCAmJiB1bm1hc2tlZCA+IG9wdHMubWF4KSByZXR1cm4gb3B0cy5pc05lZ2F0aXZlID0gb3B0cy5tYXggPCAwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnBvc3RWYWxpZGF0aW9uKG9wdHMubWF4LnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgb3B0cy5yYWRpeFBvaW50KS5zcGxpdChcIlwiKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogY2FyZXRQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvcG9zdDogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMucG9zdFZhbGlkYXRpb24oYnVmZmVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IGNhcmV0UG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDogXCJibHVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIl9jaGVja3ZhbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogY2FyZXRQb3NcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZ2V4OiB7XG4gICAgICAgICAgICAgICAgICAgIGludGVnZXJQYXJ0OiBmdW5jdGlvbihvcHRzLCBlbXB0eUNoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHlDaGVjayA/IG5ldyBSZWdFeHAoXCJbXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCkgKyBcIitdP1wiKSA6IG5ldyBSZWdFeHAoXCJbXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCkgKyBcIitdP1xcXFxkK1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW50ZWdlck5QYXJ0OiBmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcIltcXFxcZFwiICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMuZ3JvdXBTZXBhcmF0b3IpICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KDApKSArIFwiXStcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiflwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKGNocnMsIG1hc2tzZXQsIHBvcywgc3RyaWN0LCBvcHRzLCBpc1NlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcImtcIiA9PT0gY2hycyB8fCBcIm1cIiA9PT0gY2hycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBcImtcIiA9PT0gY2hycyA/IDIgOiA1OyBpIDwgbDsgaSsrKSBpc1ZhbGlkLmluc2VydC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zICsgaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkLnBvcyA9IHBvcyArIGwsIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gKGlzVmFsaWQgPSBzdHJpY3QgPyBuZXcgUmVnRXhwKFwiWzAtOVwiICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMuZ3JvdXBTZXBhcmF0b3IpICsgXCJdXCIpLnRlc3QoY2hycykgOiBuZXcgUmVnRXhwKFwiWzAtOV1cIikudGVzdChjaHJzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwICE9PSBvcHRzLm51bWVyaWNJbnB1dCAmJiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Bvc10gIT09IHVuZGVmaW5lZCAmJiBcIn5cIiA9PT0gbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3NdLm1hdGNoLmRlZiAmJiAhaXNTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzVmFsdWUgPSBtYXNrc2V0LmJ1ZmZlci5qb2luKFwiXCIpLCBwdlJhZGl4U3BsaXQgPSAocHJvY2Vzc1ZhbHVlID0gKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJbLVwiICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQpICsgXCJdXCIsIFwiZ1wiKSwgXCJcIikpLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrKSArIFwiJFwiKSwgXCJcIikpLnNwbGl0KG9wdHMucmFkaXhQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdlJhZGl4U3BsaXQubGVuZ3RoID4gMSAmJiAocHZSYWRpeFNwbGl0WzFdID0gcHZSYWRpeFNwbGl0WzFdLnJlcGxhY2UoLzAvZywgb3B0cy5wbGFjZWhvbGRlci5jaGFyQXQoMCkpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjBcIiA9PT0gcHZSYWRpeFNwbGl0WzBdICYmIChwdlJhZGl4U3BsaXRbMF0gPSBwdlJhZGl4U3BsaXRbMF0ucmVwbGFjZSgvMC9nLCBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NWYWx1ZSA9IHB2UmFkaXhTcGxpdFswXSArIG9wdHMucmFkaXhQb2ludCArIHB2UmFkaXhTcGxpdFsxXSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlclRlbXBsYXRlID0gbWFza3NldC5fYnVmZmVyLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHByb2Nlc3NWYWx1ZSA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIChwcm9jZXNzVmFsdWUgPSBidWZmZXJUZW1wbGF0ZSk7IG51bGwgPT09IHByb2Nlc3NWYWx1ZS5tYXRjaChJbnB1dG1hc2suZXNjYXBlUmVnZXgoYnVmZmVyVGVtcGxhdGUpICsgXCIkXCIpOyApIGJ1ZmZlclRlbXBsYXRlID0gYnVmZmVyVGVtcGxhdGUuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gKHByb2Nlc3NWYWx1ZSA9IChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShidWZmZXJUZW1wbGF0ZSwgXCJcIikpLnNwbGl0KFwiXCIpKVtwb3NdID09PSB1bmRlZmluZWQgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBwb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlOiBwb3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBwb3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugc3RyaWN0IHx8IGNocnMgIT09IG9wdHMucmFkaXhQb2ludCB8fCBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3BvcyAtIDFdICE9PSB1bmRlZmluZWQgfHwgKGlzVmFsaWQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBwb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiK1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKGNocnMsIG1hc2tzZXQsIHBvcywgc3RyaWN0LCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMuYWxsb3dNaW51cyAmJiAoXCItXCIgPT09IGNocnMgfHwgY2hycyA9PT0gb3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcIi1cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLmFsbG93TWludXMgJiYgY2hycyA9PT0gb3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCI6XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24oY2hycywgbWFza3NldCwgcG9zLCBzdHJpY3QsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXggPSBcIltcIiArIElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLnJhZGl4UG9pbnQpICsgXCJdXCIsIGlzVmFsaWQgPSBuZXcgUmVnRXhwKHJhZGl4KS50ZXN0KGNocnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkICYmIG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcG9zXSAmJiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Bvc10ubWF0Y2gucGxhY2Vob2xkZXIgPT09IG9wdHMucmFkaXhQb2ludCAmJiAoaXNWYWxpZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IHBvcyArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgaXNWYWxpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMucmFkaXhQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Vbk1hc2s6IGZ1bmN0aW9uKG1hc2tlZFZhbHVlLCB1bm1hc2tlZFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcIlwiID09PSB1bm1hc2tlZFZhbHVlICYmICEwID09PSBvcHRzLm51bGxhYmxlKSByZXR1cm4gdW5tYXNrZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NWYWx1ZSA9IG1hc2tlZFZhbHVlLnJlcGxhY2Uob3B0cy5wcmVmaXgsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc1ZhbHVlID0gKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKG9wdHMuc3VmZml4LCBcIlwiKSkucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLmdyb3VwU2VwYXJhdG9yKSwgXCJnXCIpLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFwiXCIgIT09IG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KDApICYmIChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KDApLCBcImdcIiksIFwiMFwiKSksIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLnVubWFza0FzTnVtYmVyID8gKFwiXCIgIT09IG9wdHMucmFkaXhQb2ludCAmJiAtMSAhPT0gcHJvY2Vzc1ZhbHVlLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KSAmJiAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4LmNhbGwodGhpcywgb3B0cy5yYWRpeFBvaW50KSwgXCIuXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NWYWx1ZSA9IChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKFwiXlwiICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQpKSwgXCItXCIpKS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMubmVnYXRpb25TeW1ib2wuYmFjaykgKyBcIiRcIiksIFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgTnVtYmVyKHByb2Nlc3NWYWx1ZSkpIDogcHJvY2Vzc1ZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24oYnVmZmVyLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXNrZWRWYWx1ZSA9IGJ1ZmZlci5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLnNsaWNlKCkuam9pbihcIlwiKSAhPT0gbWFza2VkVmFsdWUpIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NWYWx1ZSA9IG1hc2tlZFZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChcIl5cIiArIElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KSksIFwiLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NWYWx1ZSA9IChwcm9jZXNzVmFsdWUgPSAocHJvY2Vzc1ZhbHVlID0gKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMubmVnYXRpb25TeW1ib2wuYmFjaykgKyBcIiRcIiksIFwiXCIpKS5yZXBsYWNlKG9wdHMucHJlZml4LCBcIlwiKSkucmVwbGFjZShvcHRzLnN1ZmZpeCwgXCJcIikpLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5ncm91cFNlcGFyYXRvcikgKyBcIihbMC05XXszfSlcIiwgXCJnXCIpLCBcIiQxXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgXCIsXCIgPT09IG9wdHMucmFkaXhQb2ludCAmJiAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMucmFkaXhQb2ludCksIFwiLlwiKSksIFxuICAgICAgICAgICAgICAgICAgICBpc0Zpbml0ZShwcm9jZXNzVmFsdWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25CZWZvcmVNYXNrOiBmdW5jdGlvbihpbml0aWFsVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuaXNOZWdhdGl2ZSA9IHVuZGVmaW5lZCwgXCJudW1iZXJcIiA9PSB0eXBlb2YgaW5pdGlhbFZhbHVlICYmIFwiXCIgIT09IG9wdHMucmFkaXhQb2ludCAmJiAoaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgb3B0cy5yYWRpeFBvaW50KSksIFxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWUudG9TdHJpbmcoKS5jaGFyQXQoaW5pdGlhbFZhbHVlLmxlbmd0aCAtIDEpID09PSBvcHRzLnJhZGl4UG9pbnQgPyBpbml0aWFsVmFsdWUudG9TdHJpbmcoKS5zdWJzdHIoMCwgaW5pdGlhbFZhbHVlLmxlbmd0aCAtIDEpIDogaW5pdGlhbFZhbHVlLnRvU3RyaW5nKCksIFxuICAgICAgICAgICAgICAgICAgICBcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgaXNGaW5pdGUoaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZzID0gaW5pdGlhbFZhbHVlLnNwbGl0KFwiLlwiKSwgZ3JvdXBTaXplID0gXCJcIiAhPT0gb3B0cy5ncm91cFNlcGFyYXRvciA/IHBhcnNlSW50KG9wdHMuZ3JvdXBTaXplKSA6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAyID09PSB2cy5sZW5ndGggJiYgKHZzWzBdLmxlbmd0aCA+IGdyb3VwU2l6ZSB8fCB2c1sxXS5sZW5ndGggPiBncm91cFNpemUgfHwgdnNbMF0ubGVuZ3RoIDw9IGdyb3VwU2l6ZSAmJiB2c1sxXS5sZW5ndGggPCBncm91cFNpemUpICYmIChpbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWUucmVwbGFjZShcIi5cIiwgb3B0cy5yYWRpeFBvaW50KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGtvbW1hTWF0Y2hlcyA9IGluaXRpYWxWYWx1ZS5tYXRjaCgvLC9nKSwgZG90TWF0Y2hlcyA9IGluaXRpYWxWYWx1ZS5tYXRjaCgvXFwuL2cpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbFZhbHVlID0gZG90TWF0Y2hlcyAmJiBrb21tYU1hdGNoZXMgPyBkb3RNYXRjaGVzLmxlbmd0aCA+IGtvbW1hTWF0Y2hlcy5sZW5ndGggPyAoaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnJlcGxhY2UoL1xcLi9nLCBcIlwiKSkucmVwbGFjZShcIixcIiwgb3B0cy5yYWRpeFBvaW50KSA6IGtvbW1hTWF0Y2hlcy5sZW5ndGggPiBkb3RNYXRjaGVzLmxlbmd0aCA/IChpbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWUucmVwbGFjZSgvLC9nLCBcIlwiKSkucmVwbGFjZShcIi5cIiwgb3B0cy5yYWRpeFBvaW50KSA6IGluaXRpYWxWYWx1ZS5pbmRleE9mKFwiLlwiKSA8IGluaXRpYWxWYWx1ZS5pbmRleE9mKFwiLFwiKSA/IGluaXRpYWxWYWx1ZS5yZXBsYWNlKC9cXC4vZywgXCJcIikgOiBpbml0aWFsVmFsdWUucmVwbGFjZSgvLC9nLCBcIlwiKSA6IGluaXRpYWxWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMuZ3JvdXBTZXBhcmF0b3IpLCBcImdcIiksIFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgMCA9PT0gb3B0cy5kaWdpdHMgJiYgKC0xICE9PSBpbml0aWFsVmFsdWUuaW5kZXhPZihcIi5cIikgPyBpbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWUuc3Vic3RyaW5nKDAsIGluaXRpYWxWYWx1ZS5pbmRleE9mKFwiLlwiKSkgOiAtMSAhPT0gaW5pdGlhbFZhbHVlLmluZGV4T2YoXCIsXCIpICYmIChpbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWUuc3Vic3RyaW5nKDAsIGluaXRpYWxWYWx1ZS5pbmRleE9mKFwiLFwiKSkpKSwgXG4gICAgICAgICAgICAgICAgICAgIFwiXCIgIT09IG9wdHMucmFkaXhQb2ludCAmJiBpc0Zpbml0ZShvcHRzLmRpZ2l0cykgJiYgLTEgIT09IGluaXRpYWxWYWx1ZS5pbmRleE9mKG9wdHMucmFkaXhQb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWNQYXJ0ID0gaW5pdGlhbFZhbHVlLnNwbGl0KG9wdHMucmFkaXhQb2ludClbMV0ubWF0Y2gobmV3IFJlZ0V4cChcIlxcXFxkKlwiKSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQob3B0cy5kaWdpdHMpIDwgZGVjUGFydC50b1N0cmluZygpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWdpdHNGYWN0b3IgPSBNYXRoLnBvdygxMCwgcGFyc2VJbnQob3B0cy5kaWdpdHMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWUucmVwbGFjZShJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5yYWRpeFBvaW50KSwgXCIuXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSAoaW5pdGlhbFZhbHVlID0gTWF0aC5yb3VuZChwYXJzZUZsb2F0KGluaXRpYWxWYWx1ZSkgKiBkaWdpdHNGYWN0b3IpIC8gZGlnaXRzRmFjdG9yKS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIG9wdHMucmFkaXhQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxWYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uS2V5RG93bjogZnVuY3Rpb24oZSwgYnVmZmVyLCBjYXJldFBvcywgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuY3RybEtleSkgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIElucHV0bWFzay5rZXlDb2RlLlVQOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnZhbChwYXJzZUZsb2F0KHRoaXMuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSkgKyBwYXJzZUludChvcHRzLnN0ZXApKSwgJGlucHV0LnRyaWdnZXIoXCJzZXR2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnB1dG1hc2sua2V5Q29kZS5ET1dOOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnZhbChwYXJzZUZsb2F0KHRoaXMuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSkgLSBwYXJzZUludChvcHRzLnN0ZXApKSwgJGlucHV0LnRyaWdnZXIoXCJzZXR2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgICAgICAgIHByZWZpeDogXCIkIFwiLFxuICAgICAgICAgICAgICAgIGdyb3VwU2VwYXJhdG9yOiBcIixcIixcbiAgICAgICAgICAgICAgICBhbGlhczogXCJudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiMFwiLFxuICAgICAgICAgICAgICAgIGF1dG9Hcm91cDogITAsXG4gICAgICAgICAgICAgICAgZGlnaXRzOiAyLFxuICAgICAgICAgICAgICAgIGRpZ2l0c09wdGlvbmFsOiAhMSxcbiAgICAgICAgICAgICAgICBjbGVhck1hc2tPbkxvc3RGb2N1czogITFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWNpbWFsOiB7XG4gICAgICAgICAgICAgICAgYWxpYXM6IFwibnVtZXJpY1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW50ZWdlcjoge1xuICAgICAgICAgICAgICAgIGFsaWFzOiBcIm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICBkaWdpdHM6IDAsXG4gICAgICAgICAgICAgICAgcmFkaXhQb2ludDogXCJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBlcmNlbnRhZ2U6IHtcbiAgICAgICAgICAgICAgICBhbGlhczogXCJudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgZGlnaXRzOiAyLFxuICAgICAgICAgICAgICAgIGRpZ2l0c09wdGlvbmFsOiAhMCxcbiAgICAgICAgICAgICAgICByYWRpeFBvaW50OiBcIi5cIixcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCIwXCIsXG4gICAgICAgICAgICAgICAgYXV0b0dyb3VwOiAhMSxcbiAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgICAgICAgICAgc3VmZml4OiBcIiAlXCIsXG4gICAgICAgICAgICAgICAgYWxsb3dNaW51czogITFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIElucHV0bWFzaztcbiAgICB9LCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fID0gWyBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpIF0sIFxuICAgIHZvaWQgMCA9PT0gKF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiAoX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fID0gZmFjdG9yeSkgPyBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18uYXBwbHkoZXhwb3J0cywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXykgOiBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18pIHx8IChtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fKTtcbn0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fLCBmYWN0b3J5O1xuICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgICBmYWN0b3J5ID0gZnVuY3Rpb24oJCwgSW5wdXRtYXNrKSB7XG4gICAgICAgIGZ1bmN0aW9uIG1hc2tTb3J0KGEsIGIpIHtcbiAgICAgICAgICAgIHZhciBtYXNrYSA9IChhLm1hc2sgfHwgYSkucmVwbGFjZSgvIy9nLCBcIjBcIikucmVwbGFjZSgvXFwpLywgXCIwXCIpLnJlcGxhY2UoL1srKCkjLV0vZywgXCJcIiksIG1hc2tiID0gKGIubWFzayB8fCBiKS5yZXBsYWNlKC8jL2csIFwiMFwiKS5yZXBsYWNlKC9cXCkvLCBcIjBcIikucmVwbGFjZSgvWysoKSMtXS9nLCBcIlwiKTtcbiAgICAgICAgICAgIHJldHVybiBtYXNrYS5sb2NhbGVDb21wYXJlKG1hc2tiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYW5hbHlzZU1hc2tCYXNlID0gSW5wdXRtYXNrLnByb3RvdHlwZS5hbmFseXNlTWFzaztcbiAgICAgICAgcmV0dXJuIElucHV0bWFzay5wcm90b3R5cGUuYW5hbHlzZU1hc2sgPSBmdW5jdGlvbihtYXNrLCByZWdleE1hc2ssIG9wdHMpIHtcbiAgICAgICAgICAgIHZhciBtYXNrR3JvdXBzID0ge307XG4gICAgICAgICAgICByZXR1cm4gb3B0cy5waG9uZUNvZGVzICYmIChvcHRzLnBob25lQ29kZXMgJiYgb3B0cy5waG9uZUNvZGVzLmxlbmd0aCA+IDFlMyAmJiAoZnVuY3Rpb24gcmVkdWNlVmFyaWF0aW9ucyhtYXNrcywgcHJldmlvdXNWYXJpYXRpb24sIHByZXZpb3VzbWFza0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNWYXJpYXRpb24gPSBwcmV2aW91c1ZhcmlhdGlvbiB8fCBcIlwiLCBwcmV2aW91c21hc2tHcm91cCA9IHByZXZpb3VzbWFza0dyb3VwIHx8IG1hc2tHcm91cHMsIFxuICAgICAgICAgICAgICAgIFwiXCIgIT09IHByZXZpb3VzVmFyaWF0aW9uICYmIChwcmV2aW91c21hc2tHcm91cFtwcmV2aW91c1ZhcmlhdGlvbl0gPSB7fSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdmFyaWF0aW9uID0gXCJcIiwgbWFza0dyb3VwID0gcHJldmlvdXNtYXNrR3JvdXBbcHJldmlvdXNWYXJpYXRpb25dIHx8IHByZXZpb3VzbWFza0dyb3VwLCBpID0gbWFza3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIG1hc2tHcm91cFt2YXJpYXRpb24gPSAobWFzayA9IG1hc2tzW2ldLm1hc2sgfHwgbWFza3NbaV0pLnN1YnN0cigwLCAxKV0gPSBtYXNrR3JvdXBbdmFyaWF0aW9uXSB8fCBbXSwgXG4gICAgICAgICAgICAgICAgbWFza0dyb3VwW3ZhcmlhdGlvbl0udW5zaGlmdChtYXNrLnN1YnN0cigxKSksIG1hc2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuZHggaW4gbWFza0dyb3VwKSBtYXNrR3JvdXBbbmR4XS5sZW5ndGggPiA1MDAgJiYgcmVkdWNlVmFyaWF0aW9ucyhtYXNrR3JvdXBbbmR4XS5zbGljZSgpLCBuZHgsIG1hc2tHcm91cCk7XG4gICAgICAgICAgICB9KChtYXNrID0gbWFzay5zdWJzdHIoMSwgbWFzay5sZW5ndGggLSAyKSkuc3BsaXQob3B0cy5ncm91cG1hcmtlclsxXSArIG9wdHMuYWx0ZXJuYXRvcm1hcmtlciArIG9wdHMuZ3JvdXBtYXJrZXJbMF0pKSwgXG4gICAgICAgICAgICBtYXNrID0gZnVuY3Rpb24gcmVidWlsZChtYXNrR3JvdXApIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFzayA9IFwiXCIsIHN1Ym1hc2tzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmR4IGluIG1hc2tHcm91cCkgJC5pc0FycmF5KG1hc2tHcm91cFtuZHhdKSA/IDEgPT09IG1hc2tHcm91cFtuZHhdLmxlbmd0aCA/IHN1Ym1hc2tzLnB1c2gobmR4ICsgbWFza0dyb3VwW25keF0pIDogc3VibWFza3MucHVzaChuZHggKyBvcHRzLmdyb3VwbWFya2VyWzBdICsgbWFza0dyb3VwW25keF0uam9pbihvcHRzLmdyb3VwbWFya2VyWzFdICsgb3B0cy5hbHRlcm5hdG9ybWFya2VyICsgb3B0cy5ncm91cG1hcmtlclswXSkgKyBvcHRzLmdyb3VwbWFya2VyWzFdKSA6IHN1Ym1hc2tzLnB1c2gobmR4ICsgcmVidWlsZChtYXNrR3JvdXBbbmR4XSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiAxID09PSBzdWJtYXNrcy5sZW5ndGggPyBtYXNrICs9IHN1Ym1hc2tzWzBdIDogbWFzayArPSBvcHRzLmdyb3VwbWFya2VyWzBdICsgc3VibWFza3Muam9pbihvcHRzLmdyb3VwbWFya2VyWzFdICsgb3B0cy5hbHRlcm5hdG9ybWFya2VyICsgb3B0cy5ncm91cG1hcmtlclswXSkgKyBvcHRzLmdyb3VwbWFya2VyWzFdLCBcbiAgICAgICAgICAgICAgICBtYXNrO1xuICAgICAgICAgICAgfShtYXNrR3JvdXBzKSksIG1hc2sgPSBtYXNrLnJlcGxhY2UoLzkvZywgXCJcXFxcOVwiKSksIGFuYWx5c2VNYXNrQmFzZS5jYWxsKHRoaXMsIG1hc2ssIHJlZ2V4TWFzaywgb3B0cyk7XG4gICAgICAgIH0sIElucHV0bWFzay5leHRlbmRBbGlhc2VzKHtcbiAgICAgICAgICAgIGFic3RyYWN0cGhvbmU6IHtcbiAgICAgICAgICAgICAgICBncm91cG1hcmtlcjogWyBcIjxcIiwgXCI+XCIgXSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5Y29kZTogXCJcIixcbiAgICAgICAgICAgICAgICBwaG9uZUNvZGVzOiBbXSxcbiAgICAgICAgICAgICAgICBrZWVwU3RhdGljOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICBtYXNrOiBmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLmRlZmluaXRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIjXCI6IElucHV0bWFzay5wcm90b3R5cGUuZGVmaW5pdGlvbnNbOV1cbiAgICAgICAgICAgICAgICAgICAgfSwgb3B0cy5waG9uZUNvZGVzLnNvcnQobWFza1NvcnQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25CZWZvcmVNYXNrOiBmdW5jdGlvbih2YWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkVmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9eMHsxLDJ9LywgXCJcIikucmVwbGFjZSgvW1xcc10vZywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocHJvY2Vzc2VkVmFsdWUuaW5kZXhPZihvcHRzLmNvdW50cnljb2RlKSA+IDEgfHwgLTEgPT09IHByb2Nlc3NlZFZhbHVlLmluZGV4T2Yob3B0cy5jb3VudHJ5Y29kZSkpICYmIChwcm9jZXNzZWRWYWx1ZSA9IFwiK1wiICsgb3B0cy5jb3VudHJ5Y29kZSArIHByb2Nlc3NlZFZhbHVlKSwgXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZFZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Vbk1hc2s6IGZ1bmN0aW9uKG1hc2tlZFZhbHVlLCB1bm1hc2tlZFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNrZWRWYWx1ZS5yZXBsYWNlKC9bKCkjLV0vZywgXCJcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnB1dG1vZGU6IFwidGVsXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIElucHV0bWFzaztcbiAgICB9LCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fID0gWyBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpIF0sIFxuICAgIHZvaWQgMCA9PT0gKF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiAoX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fID0gZmFjdG9yeSkgPyBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18uYXBwbHkoZXhwb3J0cywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXykgOiBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18pIHx8IChtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fKTtcbn0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fLCBmYWN0b3J5LCBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH0gOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICAgIGZhY3RvcnkgPSBmdW5jdGlvbigkLCBJbnB1dG1hc2spIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMCA9PT0gJC5mbi5pbnB1dG1hc2sgJiYgKCQuZm4uaW5wdXRtYXNrID0gZnVuY3Rpb24oZm4sIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBucHRtYXNrLCBpbnB1dCA9IHRoaXNbMF07XG4gICAgICAgICAgICBpZiAodm9pZCAwID09PSBvcHRpb25zICYmIChvcHRpb25zID0ge30pLCBcInN0cmluZ1wiID09IHR5cGVvZiBmbikgc3dpdGNoIChmbikge1xuICAgICAgICAgICAgICBjYXNlIFwidW5tYXNrZWR2YWx1ZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dCAmJiBpbnB1dC5pbnB1dG1hc2sgPyBpbnB1dC5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpIDogJChpbnB1dCkudmFsKCk7XG5cbiAgICAgICAgICAgICAgY2FzZSBcInJlbW92ZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRtYXNrICYmIHRoaXMuaW5wdXRtYXNrLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJnZXRlbXB0eW1hc2tcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQgJiYgaW5wdXQuaW5wdXRtYXNrID8gaW5wdXQuaW5wdXRtYXNrLmdldGVtcHR5bWFzaygpIDogXCJcIjtcblxuICAgICAgICAgICAgICBjYXNlIFwiaGFzTWFza2VkVmFsdWVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gISghaW5wdXQgfHwgIWlucHV0LmlucHV0bWFzaykgJiYgaW5wdXQuaW5wdXRtYXNrLmhhc01hc2tlZFZhbHVlKCk7XG5cbiAgICAgICAgICAgICAgY2FzZSBcImlzQ29tcGxldGVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gIWlucHV0IHx8ICFpbnB1dC5pbnB1dG1hc2sgfHwgaW5wdXQuaW5wdXRtYXNrLmlzQ29tcGxldGUoKTtcblxuICAgICAgICAgICAgICBjYXNlIFwiZ2V0bWV0YWRhdGFcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQgJiYgaW5wdXQuaW5wdXRtYXNrID8gaW5wdXQuaW5wdXRtYXNrLmdldG1ldGFkYXRhKCkgOiB2b2lkIDA7XG5cbiAgICAgICAgICAgICAgY2FzZSBcInNldHZhbHVlXCI6XG4gICAgICAgICAgICAgICAgSW5wdXRtYXNrLnNldFZhbHVlKGlucHV0LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIFwib3B0aW9uXCI6XG4gICAgICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgIT0gdHlwZW9mIG9wdGlvbnMpIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IHRoaXMuaW5wdXRtYXNrKSByZXR1cm4gdGhpcy5pbnB1dG1hc2sub3B0aW9uKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dCAmJiB2b2lkIDAgIT09IGlucHV0LmlucHV0bWFzaykgcmV0dXJuIGlucHV0LmlucHV0bWFzay5vcHRpb24ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5hbGlhcyA9IGZuLCBucHRtYXNrID0gbmV3IElucHV0bWFzayhvcHRpb25zKSwgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBucHRtYXNrLm1hc2sodGhpcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChcIm9iamVjdFwiID09ICh2b2lkIDAgPT09IGZuID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoZm4pKSkgcmV0dXJuIG5wdG1hc2sgPSBuZXcgSW5wdXRtYXNrKGZuKSwgXG4gICAgICAgICAgICAgICAgdm9pZCAwID09PSBmbi5tYXNrICYmIHZvaWQgMCA9PT0gZm4uYWxpYXMgPyB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IHRoaXMuaW5wdXRtYXNrKSByZXR1cm4gdGhpcy5pbnB1dG1hc2sub3B0aW9uKGZuKTtcbiAgICAgICAgICAgICAgICAgICAgbnB0bWFzay5tYXNrKHRoaXMpO1xuICAgICAgICAgICAgICAgIH0pIDogdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBucHRtYXNrLm1hc2sodGhpcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gZm4pIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIChucHRtYXNrID0gbmV3IElucHV0bWFzayhvcHRpb25zKSkubWFzayh0aGlzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksICQuZm4uaW5wdXRtYXNrO1xuICAgIH0sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18gPSBbIF9fd2VicGFja19yZXF1aXJlX18oMiksIF9fd2VicGFja19yZXF1aXJlX18oMSkgXSwgXG4gICAgdm9pZCAwID09PSAoX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIChfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18gPSBmYWN0b3J5KSA/IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXy5hcHBseShleHBvcnRzLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fKSA6IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXykgfHwgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pO1xufSBdKTsiLCIvKj09PT09PSBqUXVlcnkgVUkgYWNjb3JkaW9uID09PT09PSovXG5cbihmdW5jdGlvbigkKSB7XG4gICAgJCggXCIuYW1hX19hY2NvcmRpb25cIiApLmFjY29yZGlvbih7XG4gICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcbiAgICAgICAgY29sbGFwc2libGU6IHRydWVcbiAgICB9KTtcbn0pKGpRdWVyeSk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBGb3JtIGZpZWxkcyBtYXNraW5nXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5mb3JtSXRlbXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG4gICAgICAgICAgJCgnLm11bHRpc2VsZWN0JykubXVsdGlzZWxlY3QoKTtcblxuICAgICAgICAgICQoJy5hbWFfX3Rvb2x0aXAnKS50b29sdGlwKHtcbiAgICAgICAgICAgIHRvb2x0aXBDbGFzczogXCJhbWFfX3Rvb2x0aXAtYnViYmxlXCJcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKSB7XG4gICAgICAgICAgICB2YXIgbWF4X2xlbmd0aCA9IDE1MDtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfZW50ZXJlZCA9ICQoJy50ZXh0YXJlYScpLnZhbCgpLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfcmVtYWluaW5nID0gbWF4X2xlbmd0aCAtIGNoYXJhY3Rlcl9lbnRlcmVkO1xuICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLmh0bWwoY2hhcmFjdGVyX3JlbWFpbmluZyk7XG4gICAgICAgICAgICBpZiAobWF4X2xlbmd0aCA8IGNoYXJhY3Rlcl9lbnRlcmVkKSB7XG4gICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFN0YXJ0IHNlYXJjaCBmaWx0ZXJcblxuICAgICAgICAgIHZhciBhdmFpbGFibGVUYWdzID0gW1xuICAgICAgICAgICAgXCJBbGFiYW1hXCIsXG4gICAgICAgICAgICBcIkFsYXNrYVwiLFxuICAgICAgICAgICAgXCJBbWVyaWNhbiBTYW1vYVwiLFxuICAgICAgICAgICAgXCJBcml6b25hXCIsXG4gICAgICAgICAgICBcIkFya2Fuc2FzXCIsXG4gICAgICAgICAgICBcIkNhbGlmb3JuaWFcIixcbiAgICAgICAgICAgIFwiQ29sb3JhZG9cIixcbiAgICAgICAgICAgIFwiQ29ubmVjdGljdXRcIixcbiAgICAgICAgICAgIFwiRGVsYXdhcmVcIixcbiAgICAgICAgICAgIFwiRGlzdHJpY3QgT2YgQ29sdW1iaWFcIixcbiAgICAgICAgICAgIFwiRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhXCIsXG4gICAgICAgICAgICBcIkZsb3JpZGFcIixcbiAgICAgICAgICAgIFwiR2VvcmdpYVwiLFxuICAgICAgICAgICAgXCJHdWFtXCIsXG4gICAgICAgICAgICBcIkhhd2FpaVwiLFxuICAgICAgICAgICAgXCJJZGFob1wiLFxuICAgICAgICAgICAgXCJJbGxpbm9pc1wiLFxuICAgICAgICAgICAgXCJJbmRpYW5hXCIsXG4gICAgICAgICAgICBcIklvd2FcIixcbiAgICAgICAgICAgIFwiS2Fuc2FzXCIsXG4gICAgICAgICAgICBcIktlbnR1Y2t5XCIsXG4gICAgICAgICAgICBcIkxvdWlzaWFuYVwiLFxuICAgICAgICAgICAgXCJNYWluZVwiLFxuICAgICAgICAgICAgXCJNYXJzaGFsbCBJc2xhbmRzXCIsXG4gICAgICAgICAgICBcIk1hcnlsYW5kXCIsXG4gICAgICAgICAgICBcIk1hc3NhY2h1c2V0dHNcIixcbiAgICAgICAgICAgIFwiTWljaGlnYW5cIixcbiAgICAgICAgICAgIFwiTWlubmVzb3RhXCIsXG4gICAgICAgICAgICBcIk1pc3Npc3NpcHBpXCIsXG4gICAgICAgICAgICBcIk1pc3NvdXJpXCIsXG4gICAgICAgICAgICBcIk1vbnRhbmFcIixcbiAgICAgICAgICAgIFwiTmVicmFza2FcIixcbiAgICAgICAgICAgIFwiTmV2YWRhXCIsXG4gICAgICAgICAgICBcIk5ldyBIYW1wc2hpcmVcIixcbiAgICAgICAgICAgIFwiTmV3IEplcnNleVwiLFxuICAgICAgICAgICAgXCJOZXcgTWV4aWNvXCIsXG4gICAgICAgICAgICBcIk5ldyBZb3JrXCIsXG4gICAgICAgICAgICBcIk5vcnRoIENhcm9saW5hXCIsXG4gICAgICAgICAgICBcIk5vcnRoIERha290YVwiLFxuICAgICAgICAgICAgXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIixcbiAgICAgICAgICAgIFwiT2hpb1wiLFxuICAgICAgICAgICAgXCJPa2xhaG9tYVwiLFxuICAgICAgICAgICAgXCJPcmVnb25cIixcbiAgICAgICAgICAgIFwiUGFsYXVcIixcbiAgICAgICAgICAgIFwiUGVubnN5bHZhbmlhXCIsXG4gICAgICAgICAgICBcIlB1ZXJ0byBSaWNvXCIsXG4gICAgICAgICAgICBcIlJob2RlIElzbGFuZFwiLFxuICAgICAgICAgICAgXCJTb3V0aCBDYXJvbGluYVwiLFxuICAgICAgICAgICAgXCJTb3V0aCBEYWtvdGFcIixcbiAgICAgICAgICAgIFwiVGVubmVzc2VlXCIsXG4gICAgICAgICAgICBcIlRleGFzXCIsXG4gICAgICAgICAgICBcIlV0YWhcIixcbiAgICAgICAgICAgIFwiVmVybW9udFwiLFxuICAgICAgICAgICAgXCJWaXJnaW4gSXNsYW5kc1wiLFxuICAgICAgICAgICAgXCJWaXJnaW5pYVwiLFxuICAgICAgICAgICAgXCJXYXNoaW5ndG9uXCIsXG4gICAgICAgICAgICBcIldlc3QgVmlyZ2luaWFcIixcbiAgICAgICAgICAgIFwiV2lzY29uc2luXCIsXG4gICAgICAgICAgICBcIld5b21pbmdcIlxuICAgICAgICAgIF07XG5cbiAgICAgICAgICAkKCBcIiNzZWFyY2hfZmlsdGVyXCIgKS5hdXRvY29tcGxldGUoe1xuICAgICAgICAgICAgc291cmNlOiBhdmFpbGFibGVUYWdzXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkLnVpLmF1dG9jb21wbGV0ZS5wcm90b3R5cGUuX3Jlc2l6ZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdWwgPSB0aGlzLm1lbnUuZWxlbWVudDtcbiAgICAgICAgICAgIHVsLm91dGVyV2lkdGgodGhpcy5lbGVtZW50Lm91dGVyV2lkdGgoKSk7XG4gICAgICAgICAgfTtcblxuXG4gICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlciB3aXRoIGNoZWNrYm94ZXNcblxuICAgICAgICAgIHZhciBkYXRhTW9kZWwgPSBbXG4gICAgICAgICAgICB7dGV4dDogJ0FsYWJhbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQWxhc2thJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0FtZXJpY2FuIFNhbW9hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0FyaXpvbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQXJrYW5zYXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQ2FsaWZvcm5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdDb2xvcmFkbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdDb25uZWN0aWN1dCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdEZWxhd2FyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnRmxvcmlkYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdHZW9yZ2lhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0d1YW0nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSGF3YWlpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0lkYWhvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0lsbGlub2lzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0luZGlhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSW93YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdLYW5zYXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnS2VudHVja3knLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTG91aXNpYW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01haW5lJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01hcnNoYWxsIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFyeWxhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFzc2FjaHVzZXR0cycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaWNoaWdhbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaW5uZXNvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWlzc2lzc2lwcGknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWlzc291cmknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTW9udGFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZWJyYXNrYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXZhZGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEhhbXBzaGlyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXcgSmVyc2V5JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldyBNZXhpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV3IFlvcmsnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdPaGlvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ09rbGFob21hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ09yZWdvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdQYWxhdScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdQZW5uc3lsdmFuaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnUHVlcnRvIFJpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnUmhvZGUgSXNsYW5kJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1NvdXRoIENhcm9saW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1NvdXRoIERha290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdUZW5uZXNzZWUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVGV4YXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVXRhaCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdWZXJtb250JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbiBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1dhc2hpbmd0b24nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnV2VzdCBWaXJnaW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdXaXNjb25zaW4nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnV3lvbWluZycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICcnLCB2YWx1ZTogJyd9XG4gICAgICAgICAgXTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHNlbENoYW5nZSgpe1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9ICQoJyNteUNoZWNrTGlzdCcpLmNoZWNrTGlzdCgnZ2V0U2VsZWN0aW9uJyk7XG5cbiAgICAgICAgICAgICQoJyNzZWxlY3RlZEl0ZW1zJykudGV4dChKU09OLnN0cmluZ2lmeShzZWxlY3Rpb24pKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkKCcjZmlsdGVyTGlzdCcpLmNoZWNrTGlzdCh7XG4gICAgICAgICAgICBsaXN0SXRlbXM6IGRhdGFNb2RlbCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBzZWxDaGFuZ2VcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoJ1t0eXBlPWNoZWNrYm94XScpLmNoZWNrYm94cmFkaW8oKTtcbiAgICAgICAgICAkKCdbdHlwZT1yYWRpb10nKS5jaGVja2JveHJhZGlvKCkuYnV0dG9uc2V0KCkuZmluZCgnbGFiZWwnKS5jc3MoJ3dpZHRoJywgJzE5LjQlJyk7XG4gICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLnNlbGVjdG1lbnUoKTtcblxuXG4gICAgICAgICAgJCgnLnRleHRhcmVhJykua2V5dXAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb3VudF9yZW1haW5pbmdfY2hhcmFjdGVyKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBSYW5nZSBGaWVsZFxuICAgICAgICAgIHZhciBsZWdlbmQgPSAkKCcuYW1hX19yYW5nZS1maWVsZF9fbGVnZW5kJyk7XG4gICAgICAgICAgdmFyIGhhbmRsZSA9ICQoIFwiI2N1cnJlbnRWYWx1ZVwiICk7XG5cbiAgICAgICAgICAkKFwiLmFtYV9fcmFuZ2UtZmllbGRcIikuc2xpZGVyKHtcbiAgICAgICAgICAgIGFuaW1hdGU6IHRydWUsXG4gICAgICAgICAgICByYW5nZTogJ21pbicsXG4gICAgICAgICAgICB2YWx1ZTogMSxcbiAgICAgICAgICAgIG1pbjogMjAwMCxcbiAgICAgICAgICAgIG1heDogNTAwMCxcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHZhciBoYW5kbGUgPSBqUXVlcnkodGhpcykuZmluZCgnLnVpLXNsaWRlci1oYW5kbGUnKTtcbiAgICAgICAgICAgICAgdmFyIGJ1YmJsZSA9IGpRdWVyeSgnPGRpdiBjbGFzcz1cImFtYV9fcmFuZ2UtZmllbGRfX3ZhbHVlYm94XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgIGhhbmRsZS5hcHBlbmQoYnViYmxlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZ0LCB1aSkge1xuICAgICAgICAgICAgICB1aS5oYW5kbGUuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSAnJCcgKyB1aS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5hcHBlbmQobGVnZW5kKTtcblxuICAgICAgICAgIC8vIEZvcm0gYWNjb3JkaW9uXG4gICAgICAgICAgJCggXCIudGFibGlzdFwiICkuYWNjb3JkaW9uKHtcbiAgICAgICAgICAgIGhlYWRlcjogXCIuYW1hX19mb3JtLXN0ZXBzX19zdGVwXCIsXG4gICAgICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCJcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIEV4cGFuZCBsaXN0XG4gICAgICAgICAgJCggXCIuYW1hX19leHBhbmQtbGlzdFwiICkuYWNjb3JkaW9uKHtcbiAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxuICAgICAgICAgICAgaWNvbnM6IGZhbHNlLFxuICAgICAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiLFxuICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgYW5pbWF0ZTogNTAwLFxuICAgICAgICAgICAgYWN0aXZhdGUgOiBmdW5jdGlvbiAoZXZlbnQsIHVpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZigkKHVpLm5ld1BhbmVsKS5oYXNDbGFzcygndWktYWNjb3JkaW9uLWNvbnRlbnQtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHVpLm5ld1BhbmVsKS5wcmV2KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodWkub2xkUGFuZWwpLnByZXYoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIENvbGxhcHNlIGFsbCBhY2NvcmRpb24gcGFuZWxzXG4gICAgICAgICAgJCgnLmFtYV9fZmlsdGVyX19jb2xsYXBzZS1wYW5lbHMgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0IC51aS1hY2NvcmRpb24taGVhZGVyJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ3VpLXN0YXRlLWFjdGl2ZScpIHx8ICQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jbGljaygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIE9wZW4gYWNjb3JkaW9uIHBhbmVscyBmb3IgbW9iaWxlXG4gICAgICAgICAgJCgnLmFtYV9fYXBwbGllZC1maWx0ZXJzX19zaG93LWZpbHRlcnMnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QsIC5hbWFfX2FwcGxpZWQtZmlsdGVyc19fdGFncycpLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgJCgnLmFtYV9fZmlsdGVyX19zZWUtcmVzdWx0cycpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCh0aGlzKS5mYWRlT3V0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBDbG9zZSBhY2NvcmRpb24gcGFuZWxzXG4gICAgICAgICAgJCgnLmFtYV9fZmlsdGVyX19zZWUtcmVzdWx0cycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcuYW1hX19leHBhbmQtbGlzdCwgLmFtYV9fYXBwbGllZC1maWx0ZXJzX190YWdzJykuc2xpZGVVcCgpO1xuICAgICAgICAgICAgJCgnLmFtYV9fYXBwbGllZC1maWx0ZXJzX19zaG93LWZpbHRlcnMnKS5mYWRlSW4oKTtcbiAgICAgICAgICAgICQodGhpcykuZmFkZU91dCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gc2VhcmNoIGZpbHRlclxuICAgICAgICAgIGZ1bmN0aW9uIGxpc3RGaWx0ZXIoaW5wdXQsIGxpc3QpIHsgLy8gaGVhZGVyIGlzIGFueSBlbGVtZW50LCBsaXN0IGlzIGFuIHVub3JkZXJlZCBsaXN0XG4gICAgICAgICAgICAvLyBjdXN0b20gY3NzIGV4cHJlc3Npb24gZm9yIGEgY2FzZS1pbnNlbnNpdGl2ZSBjb250YWlucygpXG4gICAgICAgICAgICBqUXVlcnkuZXhwclsnOiddLkNvbnRhaW5zID0gZnVuY3Rpb24oYSxpLG0pe1xuICAgICAgICAgICAgICByZXR1cm4gKGEudGV4dENvbnRlbnQgfHwgYS5pbm5lclRleHQgfHwgXCJcIikudG9VcHBlckNhc2UoKS5pbmRleE9mKG1bM10udG9VcHBlckNhc2UoKSk+PTA7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkKGlucHV0KS5jaGFuZ2UoIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgICBpZihmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgZmluZHMgYWxsIGxpbmtzIGluIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGlucHV0LFxuICAgICAgICAgICAgICAgICAgLy8gYW5kIGhpZGUgdGhlIG9uZXMgbm90IGNvbnRhaW5pbmcgdGhlIGlucHV0IHdoaWxlIHNob3dpbmcgdGhlIG9uZXMgdGhhdCBkb1xuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3Bhbjpub3QoOkNvbnRhaW5zKFwiICsgZmlsdGVyICsgXCIpKVwiKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJzcGFuOkNvbnRhaW5zKFwiICsgZmlsdGVyICsgXCIpXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwibGFiZWxcIikuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gb25seSBzaG93IHJlc3VsdHMgYWZ0ZXIgMyBjaGFyYWN0ZXJzIGFyZSBlbnRlcmVkXG4gICAgICAgICAgICAgIH0pLmtleXVwKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiggdGhpcy52YWx1ZS5sZW5ndGggPCA0ICkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGFuZ2UoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdEZpbHRlcigkKFwiI2FtYV9fc2VhcmNoX19sb2NhdGlvblwiKSwgJChcIi5hbWFfX2Zvcm0tZ3JvdXBcIikpO1xuXG4gICAgICAgIH0pO1xuICAgICAgfSkoalF1ZXJ5KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmZvcm1WYWxpZGF0ZSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnI3Rlc3QtZm9ybScpLnZhbGlkYXRlKHtcbiAgICAgICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgICAgIHRleHRmaWVsZDogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICBkb2I6IFwicmVxdWlyZWRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgIHRleHRmaWVsZDogXCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgIGRvYjogXCJEYXRlIG9mIGJpcnRoIGlzIHJlcXVpcmVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFJlc3BvbnNpdmUgVGFibGVzLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnJlc3BvbnNpdmVHYXRlID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIGlmICgkKCcuYW1hX19nYXRlJywgY29udGV4dCkubGVuZ3RoKSB7XG4gICAgICAgIHZhciBoZWlnaHRHYXRlID0gJCgnLmFtYV9fdGFncycpLm9mZnNldCgpLnRvcCAtICQoJy5hbWFfX2dhdGUnKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJy5hbWFfX2dhdGUnLCBjb250ZXh0KS5oZWlnaHQoaGVpZ2h0R2F0ZSk7XG4gICAgICAgICQoJy5hbWFfX2dhdGUnKS5uZXh0VW50aWwoJy5hbWFfX3RhZ3MnKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYW1hX19nYXRlX19ibHVycnlcIiAvPicpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEluaXRpYWxpemF0aW9uIHNjcmlwdCBmb3IgZ2xvYmFsIHByb2Nlc3Nlc1xuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cbi8qKlxuICpcbiAqIEluaXRpYWxpemUgZml0VmlkIGZvciBZb3VUdWJlIHZpZW9zLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG5cblx0RHJ1cGFsLmJlaGF2aW9ycy5maXR2aWRpbml0ID0ge1xuXHQgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblx0XHRcdChmdW5jdGlvbiAoJCkge1xuXHRcdFx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCQoJy52aWRlby1jb250YWluZXInKS5maXRWaWRzKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSkoalF1ZXJ5KTtcblx0XHR9XG5cdH07XG5cblx0RHJ1cGFsLmJlaGF2aW9ycy5qdW1wTWVudSA9IHtcblx0XHRhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXHRcdFx0JCgnLmpzLWRyb3Bkb3duLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9ICQodGhpcykuZmluZCgnOnNlbGVjdGVkJykuZGF0YSgndXJsJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFJpYmJvbiBuYXYgdXNlciBpbnRlcmFjdGlvbnMuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5yaWJib25uYXYgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xhc3NfYWN0aXZlID0gJ2lzLWFjdGl2ZSc7XG5cbiAgICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bl9fdHJpZ2dlcicsIHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIC8vIFVuZm9jdXMgb24gdGhlIGRyb3Bkb3duLlxuICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgZm9yIENTUy5cbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyB0byB0aGUgZHJvcGRvd24gVUwuXG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKCBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBSZXNwb25zaXZlIFRhYmxlcy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5yZXNwb25zaXZlVGFibGVzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICQoXCJ0aFwiLCBjb250ZXh0KS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVxID0gJCh0aGlzKS5pbmRleCgpO1xuICAgICAgICB2YXIgY2hpbGQgPSBlcSArIDE7XG4gICAgICAgIHZhciBsYWJlbCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAkKFwidGQ6bnRoLWNoaWxkKFwiICsgY2hpbGQgKyBcIilcIikuYXBwZW5kKFwiJm5ic3A7XCIpLmF0dHIoXCJkYXRhLXRpdGxlXCIsIGxhYmVsKS5hZGRDbGFzcyhcInJlc3BvbnNpdmVcIik7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKj09PT09PT1SZXNvdXJjZSBUYWJzPT09PT09PSovXG5cbiQoJypbZGF0YS1yZXNvdXJjZV0nKS5jbGljayhmdW5jdGlvbigpe1xuICAvLyBGaWd1cmUgb3V0IHdoaWNoIHRhYiB0byBkaXNwbGF5LlxuICAkdGFiID0gZmluZFRhYigkKHRoaXMpKTtcbiAgLy8gU2hvdyB0aGUgdGFiLlxuICBzaG93VGFiKCR0YWIpO1xufSk7XG5cbi8vIGZ1bmN0aW9uIHNob3dUYWIoKSAtIHNob3dzIGFuZCBoaWRlcyB0aGUgdGFiLlxuZnVuY3Rpb24gc2hvd1RhYigkdGFiKSB7XG4gICQoJy4tLWlzLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCctLWlzLWFjdGl2ZScpO1xuICAvLyBTaG93IHRoZSBzZWN0aW9uLlxuICAkKCcuYW1hX19yZXNvdXJjZS10YWJzX19jb250ZW50IHNlY3Rpb24jJyArICR0YWIuYXR0cignaWQnKSkuYWRkQ2xhc3MoJy0taXMtYWN0aXZlJyk7XG4gIC8vIFB1dCBhbiBhY3RpdmUgc3RhdGUgb24gdGhlIHRhYi5cbiAgJCgnLmFtYV9fcmVzb3VyY2UtdGFic19fbmF2IGxpW2RhdGEtcmVzb3VyY2U9XCInICsgJHRhYi5hdHRyKCdpZCcpICsgJ1wiXScpLmFkZENsYXNzKCctLWlzLWFjdGl2ZScpO1xufVxuXG4vLyBmdW5jdGlvbiBmaW5kVGFiKCkgLSByZXR1cm4gb2JqZWN0IHRoYXQgaXMgdGhlIHNlY3Rpb24gdG8gYmUgZGlzcGxheWVkLlxuZnVuY3Rpb24gZmluZFRhYigkb2JqKSB7XG4gIC8vIEdldCB0aGUgSUQgZm9yIHRoZSBzZWN0aW9uIHRvIGRpc3BsYXkuXG4gIHZhciByZXNvdXJjZURhdGEgPV9nZXRTZWN0aW9uSUQoJG9iaik7XG4gIC8vIEZpbmQgb3V0IHdoaWNoIHRhYiB0aGUgc2VjdGlvbklEIGNvcnJlc3BvbmRzIHRvLlxuICAkKCcuYW1hX19yZXNvdXJjZS10YWJzIHNlY3Rpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBhdHRySUQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgaWYoYXR0cklELmluZGV4T2YocmVzb3VyY2VEYXRhWydzZWN0aW9uSUQnXSkgPj0gMCkge1xuICAgICAgJHRhYiA9ICQodGhpcyk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuICR0YWI7XG59XG5cbi8vIGZ1bmN0aW9uIF9nZXRTZWN0aW9uSUQoKSAtIHJldHVybiBhcnJheSBjb250YWluaW5nIHRoZSBzcGVjaWZpYyByZXNvdXJjZSB0byBzaG93IGFuZCB0aGUgc2VjdGlvbiBlbGVtZW50J3MgSUQgYXR0cmlidXRlLlxuZnVuY3Rpb24gX2dldFNlY3Rpb25JRCgkb2JqKSB7XG4gIC8vIFBhcnNlIG91dCB0aGUgc2VjdGlvbiBJRCBmcm9tIHRoZSBjbGlja2VkIG9iamVjdC5cbiAgdmFyIHJlc291cmNlRGF0YSA9IFtdO1xuICByZXNvdXJjZURhdGFbJ3Jlc291cmNlSUQnXSA9ICRvYmouYXR0cignZGF0YS1yZXNvdXJjZScpO1xuICByZXNvdXJjZURhdGFbJ3NlY3Rpb25JRCddID0gcmVzb3VyY2VEYXRhWydyZXNvdXJjZUlEJ11cbiAgICAuc3Vic3RyKDAsIHJlc291cmNlRGF0YVsncmVzb3VyY2VJRCddLmluZGV4T2YoJy0nKSk7XG4gIGlmICghcmVzb3VyY2VEYXRhWydzZWN0aW9uSUQnXSkge1xuICAgIHJlc291cmNlRGF0YVsnc2VjdGlvbklEJ10gPSByZXNvdXJjZURhdGFbJ3Jlc291cmNlSUQnXTtcbiAgfVxuICByZXR1cm4gcmVzb3VyY2VEYXRhO1xufVxuLyo9PT09PT0galF1ZXJ5IFVJIHRhYnMgPT09PT09Ki9cblxuXG4oZnVuY3Rpb24oJCkge1xuICAgICQoIFwiLmFtYV9fdGFic1wiICkudGFicyh7XG4gICAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB1aS5uZXdQYW5lbC5hdHRyKCdpZCcpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAvL1NpbXVsYXRlIGNsaWNrIGV2ZW50IG9uIGFjdHVhbCBzaW1wbGVUYWJzIHRhYiBmcm9tIG1vYmlsZSBkcm9wIGRvd24uXG4gICAgJCgnLmFtYV9fdGFicy1uYXZpZ2F0aW9uLS1tb2JpbGUgc2VsZWN0Jykub24oIFwic2VsZWN0bWVudWNoYW5nZVwiLCBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IHVpLml0ZW0udmFsdWU7XG4gICAgICAgICQoJ2FbaHJlZj1cIiMnK3NlbGVjdGVkVmFsdWUrJ1wiXScpLmNsaWNrKCk7XG4gICAgfSApO1xufSkoalF1ZXJ5KTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEludGVyYWN0aW9ucyBmb3Igd2F5ZmluZGVyLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLndheWZpbmRlciA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgIGlmKCQuY29va2llKCdhbWFfd2F5ZmluZGVyX2Nvb2tpZScpKSB7XG4gICAgICAgICAgJC5jb29raWUuanNvbiA9IHRydWU7XG4gICAgICAgICAgLy8gUmVhZCB3YXlmaW5kZXIgY29va2llcyBzZXQgZnJvbSBhbWEtYXNzbiBkb21haW5zXG4gICAgICAgICAgdmFyIGFtYV93YXlmaW5kZXJfY29va2llID0gJC5jb29raWUoJ2FtYV93YXlmaW5kZXJfY29va2llJyk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhbWFfd2F5ZmluZGVyX2Nvb2tpZSAhPT0gJ3VuZGVmaW5lZCcgfHwgJCgnLnJlZmVycmVkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCgnLmFtYV9fd2F5ZmluZGVyLS1yZWZlcnJlciBhJykuZmFkZUluKCkuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLmF0dHIoXCJocmVmXCIsIGFtYV93YXlmaW5kZXJfY29va2llWzFdKTtcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLnRleHQoYW1hX3dheWZpbmRlcl9jb29raWVbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuYW1hX3dheWZpbmRlcl9yZWZlcnJlci0tbGluay1iYWNrJykuZmFkZU91dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkoalF1ZXJ5KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKmpzaGludCBicm93c2VyOnRydWUgKi9cbi8qIVxuKiBGaXRWaWRzIDEuMVxuKlxuKiBDb3B5cmlnaHQgMjAxMywgQ2hyaXMgQ295aWVyIC0gaHR0cDovL2Nzcy10cmlja3MuY29tICsgRGF2ZSBSdXBlcnQgLSBodHRwOi8vZGF2ZXJ1cGVydC5jb21cbiogQ3JlZGl0IHRvIFRoaWVycnkgS29ibGVudHogLSBodHRwOi8vd3d3LmFsaXN0YXBhcnQuY29tL2FydGljbGVzL2NyZWF0aW5nLWludHJpbnNpYy1yYXRpb3MtZm9yLXZpZGVvL1xuKiBSZWxlYXNlZCB1bmRlciB0aGUgV1RGUEwgbGljZW5zZSAtIGh0dHA6Ly9zYW0uem95Lm9yZy93dGZwbC9cbipcbiovXG5cbjsoZnVuY3Rpb24oICQgKXtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgJC5mbi5maXRWaWRzID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG4gICAgdmFyIHNldHRpbmdzID0ge1xuICAgICAgY3VzdG9tU2VsZWN0b3I6IG51bGwsXG4gICAgICBpZ25vcmU6IG51bGxcbiAgICB9O1xuXG4gICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXQtdmlkcy1zdHlsZScpKSB7XG4gICAgICAvLyBhcHBlbmRTdHlsZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS90b2RkbW90dG8vZmx1aWR2aWRzL2Jsb2IvbWFzdGVyL2Rpc3QvZmx1aWR2aWRzLmpzXG4gICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgIHZhciBjc3MgPSAnLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXJ7d2lkdGg6MTAwJTtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjA7fS5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIGlmcmFtZSwuZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlciBvYmplY3QsLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXIgZW1iZWQge3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO30nO1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gJzxwPng8L3A+PHN0eWxlIGlkPVwiZml0LXZpZHMtc3R5bGVcIj4nICsgY3NzICsgJzwvc3R5bGU+JztcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoZGl2LmNoaWxkTm9kZXNbMV0pO1xuICAgIH1cblxuICAgIGlmICggb3B0aW9ucyApIHtcbiAgICAgICQuZXh0ZW5kKCBzZXR0aW5ncywgb3B0aW9ucyApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciBzZWxlY3RvcnMgPSBbXG4gICAgICAgICdpZnJhbWVbc3JjKj1cInBsYXllci52aW1lby5jb21cIl0nLFxuICAgICAgICAnaWZyYW1lW3NyYyo9XCJ5b3V0dWJlLmNvbVwiXScsXG4gICAgICAgICdpZnJhbWVbc3JjKj1cInlvdXR1YmUtbm9jb29raWUuY29tXCJdJyxcbiAgICAgICAgJ2lmcmFtZVtzcmMqPVwia2lja3N0YXJ0ZXIuY29tXCJdW3NyYyo9XCJ2aWRlby5odG1sXCJdJyxcbiAgICAgICAgJ29iamVjdCcsXG4gICAgICAgICdlbWJlZCdcbiAgICAgIF07XG5cbiAgICAgIGlmIChzZXR0aW5ncy5jdXN0b21TZWxlY3Rvcikge1xuICAgICAgICBzZWxlY3RvcnMucHVzaChzZXR0aW5ncy5jdXN0b21TZWxlY3Rvcik7XG4gICAgICB9XG5cbiAgICAgIHZhciBpZ25vcmVMaXN0ID0gJy5maXR2aWRzaWdub3JlJztcblxuICAgICAgaWYoc2V0dGluZ3MuaWdub3JlKSB7XG4gICAgICAgIGlnbm9yZUxpc3QgPSBpZ25vcmVMaXN0ICsgJywgJyArIHNldHRpbmdzLmlnbm9yZTtcbiAgICAgIH1cblxuICAgICAgdmFyICRhbGxWaWRlb3MgPSAkKHRoaXMpLmZpbmQoc2VsZWN0b3JzLmpvaW4oJywnKSk7XG4gICAgICAkYWxsVmlkZW9zID0gJGFsbFZpZGVvcy5ub3QoJ29iamVjdCBvYmplY3QnKTsgLy8gU3dmT2JqIGNvbmZsaWN0IHBhdGNoXG4gICAgICAkYWxsVmlkZW9zID0gJGFsbFZpZGVvcy5ub3QoaWdub3JlTGlzdCk7IC8vIERpc2FibGUgRml0VmlkcyBvbiB0aGlzIHZpZGVvLlxuXG4gICAgICAkYWxsVmlkZW9zLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgaWYoJHRoaXMucGFyZW50cyhpZ25vcmVMaXN0KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuOyAvLyBEaXNhYmxlIEZpdFZpZHMgb24gdGhpcyB2aWRlby5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdlbWJlZCcgJiYgJHRoaXMucGFyZW50KCdvYmplY3QnKS5sZW5ndGggfHwgJHRoaXMucGFyZW50KCcuZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlcicpLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKCghJHRoaXMuY3NzKCdoZWlnaHQnKSAmJiAhJHRoaXMuY3NzKCd3aWR0aCcpKSAmJiAoaXNOYU4oJHRoaXMuYXR0cignaGVpZ2h0JykpIHx8IGlzTmFOKCR0aGlzLmF0dHIoJ3dpZHRoJykpKSlcbiAgICAgICAge1xuICAgICAgICAgICR0aGlzLmF0dHIoJ2hlaWdodCcsIDkpO1xuICAgICAgICAgICR0aGlzLmF0dHIoJ3dpZHRoJywgMTYpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoZWlnaHQgPSAoIHRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnb2JqZWN0JyB8fCAoJHRoaXMuYXR0cignaGVpZ2h0JykgJiYgIWlzTmFOKHBhcnNlSW50KCR0aGlzLmF0dHIoJ2hlaWdodCcpLCAxMCkpKSApID8gcGFyc2VJbnQoJHRoaXMuYXR0cignaGVpZ2h0JyksIDEwKSA6ICR0aGlzLmhlaWdodCgpLFxuICAgICAgICAgICAgd2lkdGggPSAhaXNOYU4ocGFyc2VJbnQoJHRoaXMuYXR0cignd2lkdGgnKSwgMTApKSA/IHBhcnNlSW50KCR0aGlzLmF0dHIoJ3dpZHRoJyksIDEwKSA6ICR0aGlzLndpZHRoKCksXG4gICAgICAgICAgICBhc3BlY3RSYXRpbyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICBpZighJHRoaXMuYXR0cignbmFtZScpKXtcbiAgICAgICAgICB2YXIgdmlkZW9OYW1lID0gJ2ZpdHZpZCcgKyAkLmZuLmZpdFZpZHMuX2NvdW50O1xuICAgICAgICAgICR0aGlzLmF0dHIoJ25hbWUnLCB2aWRlb05hbWUpO1xuICAgICAgICAgICQuZm4uZml0Vmlkcy5fY291bnQrKztcbiAgICAgICAgfVxuICAgICAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwiZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlclwiPjwvZGl2PicpLnBhcmVudCgnLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXInKS5jc3MoJ3BhZGRpbmctdG9wJywgKGFzcGVjdFJhdGlvICogMTAwKSsnJScpO1xuICAgICAgICAkdGhpcy5yZW1vdmVBdHRyKCdoZWlnaHQnKS5yZW1vdmVBdHRyKCd3aWR0aCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gSW50ZXJuYWwgY291bnRlciBmb3IgdW5pcXVlIHZpZGVvIG5hbWVzLlxuICAkLmZuLmZpdFZpZHMuX2NvdW50ID0gMDtcbn0pKCBqUXVlcnkgKTsiLCIvKlxuKlx0alF1ZXJ5VUkuQWNjb3JkaW9uLk11bHRpcGxlLCB2MS4wLjFcbipcdChjKSAyMDE04oCTMjAxNyBBcnR5b20gXCJTbGVlcHdhbGtlclwiIEZlZG9zb3YgPG1haWxAYXNsZWVwd2Fsa2VyLnJ1PlxuKlx0aHR0cHM6Ly9naXRodWIuY29tL2FzbGVlcHdhbGtlci9qcXVlcnktdWkudGFicy5uZWlnaGJvcnMuanNcbiovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocm9vdCwgalF1ZXJ5KSB7XG5cdFx0XHRpZiAoalF1ZXJ5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0alF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0alF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jykocm9vdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGZhY3RvcnkoalF1ZXJ5KTtcblx0XHRcdHJldHVybiBqUXVlcnk7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRmYWN0b3J5KGpRdWVyeSk7XG5cdH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuXHR2YXIgb3JpZ2luYWxUb2dnbGUgPSAkLnVpLmFjY29yZGlvbi5wcm90b3R5cGUuX3RvZ2dsZTtcblxuXHQkLmV4dGVuZCgkLnVpLmFjY29yZGlvbi5wcm90b3R5cGUsIHtcblx0XHRtdWx0aXBsZTogZmFsc2UsXG5cdFx0X3RvZ2dsZTogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMubXVsdGlwbGUgJiYgZGF0YS5uZXdQYW5lbC5sZW5ndGgpIHtcblx0XHRcdFx0ZGF0YS5vbGRQYW5lbCA9IGRhdGEub2xkSGVhZGVyID0gdGhpcy5wcmV2U2hvdyA9ICQoJycpO1xuXG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuY29sbGFwc2libGUgJiYgZGF0YS5uZXdQYW5lbC5pcygnOnZpc2libGUnKSkge1xuXHRcdFx0XHRcdGRhdGEub2xkUGFuZWwgPSBkYXRhLm5ld1BhbmVsO1xuXHRcdFx0XHRcdGRhdGEubmV3UGFuZWwgPSAkKCcnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b3JpZ2luYWxUb2dnbGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9XG5cdH0pO1xuXG59KSk7XG4iLCIvKiFcbiAqIGpRdWVyeSBDb29raWUgUGx1Z2luIHYxLjQuMVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NhcmhhcnRsL2pxdWVyeS1jb29raWVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMyBLbGF1cyBIYXJ0bFxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0ZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gQnJvd3NlciBnbG9iYWxzXG5cdFx0ZmFjdG9yeShqUXVlcnkpO1xuXHR9XG59KGZ1bmN0aW9uICgkKSB7XG5cblx0dmFyIHBsdXNlcyA9IC9cXCsvZztcblxuXHRmdW5jdGlvbiBlbmNvZGUocykge1xuXHRcdHJldHVybiBjb25maWcucmF3ID8gcyA6IGVuY29kZVVSSUNvbXBvbmVudChzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRlY29kZShzKSB7XG5cdFx0cmV0dXJuIGNvbmZpZy5yYXcgPyBzIDogZGVjb2RlVVJJQ29tcG9uZW50KHMpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RyaW5naWZ5Q29va2llVmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gZW5jb2RlKGNvbmZpZy5qc29uID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogU3RyaW5nKHZhbHVlKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBwYXJzZUNvb2tpZVZhbHVlKHMpIHtcblx0XHRpZiAocy5pbmRleE9mKCdcIicpID09PSAwKSB7XG5cdFx0XHQvLyBUaGlzIGlzIGEgcXVvdGVkIGNvb2tpZSBhcyBhY2NvcmRpbmcgdG8gUkZDMjA2OCwgdW5lc2NhcGUuLi5cblx0XHRcdHMgPSBzLnNsaWNlKDEsIC0xKS5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykucmVwbGFjZSgvXFxcXFxcXFwvZywgJ1xcXFwnKTtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gUmVwbGFjZSBzZXJ2ZXItc2lkZSB3cml0dGVuIHBsdXNlcyB3aXRoIHNwYWNlcy5cblx0XHRcdC8vIElmIHdlIGNhbid0IGRlY29kZSB0aGUgY29va2llLCBpZ25vcmUgaXQsIGl0J3MgdW51c2FibGUuXG5cdFx0XHQvLyBJZiB3ZSBjYW4ndCBwYXJzZSB0aGUgY29va2llLCBpZ25vcmUgaXQsIGl0J3MgdW51c2FibGUuXG5cdFx0XHRzID0gZGVjb2RlVVJJQ29tcG9uZW50KHMucmVwbGFjZShwbHVzZXMsICcgJykpO1xuXHRcdFx0cmV0dXJuIGNvbmZpZy5qc29uID8gSlNPTi5wYXJzZShzKSA6IHM7XG5cdFx0fSBjYXRjaChlKSB7fVxuXHR9XG5cblx0ZnVuY3Rpb24gcmVhZChzLCBjb252ZXJ0ZXIpIHtcblx0XHR2YXIgdmFsdWUgPSBjb25maWcucmF3ID8gcyA6IHBhcnNlQ29va2llVmFsdWUocyk7XG5cdFx0cmV0dXJuICQuaXNGdW5jdGlvbihjb252ZXJ0ZXIpID8gY29udmVydGVyKHZhbHVlKSA6IHZhbHVlO1xuXHR9XG5cblx0dmFyIGNvbmZpZyA9ICQuY29va2llID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcblxuXHRcdC8vIFdyaXRlXG5cblx0XHRpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhJC5pc0Z1bmN0aW9uKHZhbHVlKSkge1xuXHRcdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBjb25maWcuZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMuZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0dmFyIGRheXMgPSBvcHRpb25zLmV4cGlyZXMsIHQgPSBvcHRpb25zLmV4cGlyZXMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHR0LnNldFRpbWUoK3QgKyBkYXlzICogODY0ZSs1KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChkb2N1bWVudC5jb29raWUgPSBbXG5cdFx0XHRcdGVuY29kZShrZXkpLCAnPScsIHN0cmluZ2lmeUNvb2tpZVZhbHVlKHZhbHVlKSxcblx0XHRcdFx0b3B0aW9ucy5leHBpcmVzID8gJzsgZXhwaXJlcz0nICsgb3B0aW9ucy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJywgLy8gdXNlIGV4cGlyZXMgYXR0cmlidXRlLCBtYXgtYWdlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUVcblx0XHRcdFx0b3B0aW9ucy5wYXRoICAgID8gJzsgcGF0aD0nICsgb3B0aW9ucy5wYXRoIDogJycsXG5cdFx0XHRcdG9wdGlvbnMuZG9tYWluICA/ICc7IGRvbWFpbj0nICsgb3B0aW9ucy5kb21haW4gOiAnJyxcblx0XHRcdFx0b3B0aW9ucy5zZWN1cmUgID8gJzsgc2VjdXJlJyA6ICcnXG5cdFx0XHRdLmpvaW4oJycpKTtcblx0XHR9XG5cblx0XHQvLyBSZWFkXG5cblx0XHR2YXIgcmVzdWx0ID0ga2V5ID8gdW5kZWZpbmVkIDoge307XG5cblx0XHQvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG5cdFx0Ly8gaW4gY2FzZSB0aGVyZSBhcmUgbm8gY29va2llcyBhdCBhbGwuIEFsc28gcHJldmVudHMgb2RkIHJlc3VsdCB3aGVuXG5cdFx0Ly8gY2FsbGluZyAkLmNvb2tpZSgpLlxuXHRcdHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llID8gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IGNvb2tpZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHR2YXIgcGFydHMgPSBjb29raWVzW2ldLnNwbGl0KCc9Jyk7XG5cdFx0XHR2YXIgbmFtZSA9IGRlY29kZShwYXJ0cy5zaGlmdCgpKTtcblx0XHRcdHZhciBjb29raWUgPSBwYXJ0cy5qb2luKCc9Jyk7XG5cblx0XHRcdGlmIChrZXkgJiYga2V5ID09PSBuYW1lKSB7XG5cdFx0XHRcdC8vIElmIHNlY29uZCBhcmd1bWVudCAodmFsdWUpIGlzIGEgZnVuY3Rpb24gaXQncyBhIGNvbnZlcnRlci4uLlxuXHRcdFx0XHRyZXN1bHQgPSByZWFkKGNvb2tpZSwgdmFsdWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0Ly8gUHJldmVudCBzdG9yaW5nIGEgY29va2llIHRoYXQgd2UgY291bGRuJ3QgZGVjb2RlLlxuXHRcdFx0aWYgKCFrZXkgJiYgKGNvb2tpZSA9IHJlYWQoY29va2llKSkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXN1bHRbbmFtZV0gPSBjb29raWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHRjb25maWcuZGVmYXVsdHMgPSB7fTtcblxuXHQkLnJlbW92ZUNvb2tpZSA9IGZ1bmN0aW9uIChrZXksIG9wdGlvbnMpIHtcblx0XHRpZiAoJC5jb29raWUoa2V5KSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gTXVzdCBub3QgYWx0ZXIgb3B0aW9ucywgdGh1cyBleHRlbmRpbmcgYSBmcmVzaCBvYmplY3QuLi5cblx0XHQkLmNvb2tpZShrZXksICcnLCAkLmV4dGVuZCh7fSwgb3B0aW9ucywgeyBleHBpcmVzOiAtMSB9KSk7XG5cdFx0cmV0dXJuICEkLmNvb2tpZShrZXkpO1xuXHR9O1xuXG59KSk7XG4iLCIoZnVuY3Rpb24oJCkge1xyXG4gICQud2lkZ2V0KFwidWkuY2hlY2tMaXN0XCIsIHtcclxuICAgIG9wdGlvbnM6IHtcclxuICAgICAgbGlzdEl0ZW1zIDogW10sXHJcbiAgICAgIHNlbGVjdGVkSXRlbXM6IFtdLFxyXG4gICAgICBlZmZlY3Q6ICdibGluaycsXHJcbiAgICAgIG9uQ2hhbmdlOiB7fSxcclxuICAgICAgb2JqTGlzdDogJycsXHJcbiAgICAgIGljb3VudDogMCxcclxuICAgIH0sXHJcblxyXG4gICAgX2NyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcywgbyA9IHNlbGYub3B0aW9ucywgZWwgPSBzZWxmLmVsZW1lbnQ7XHJcbiAgICAgIHZhciBwbGFjZWhvbGRlciA9IFwiU2VhcmNoIExpc3RcIjtcclxuXHJcbiAgICAgIC8vIGdlbmVyYXRlIG91dGVyIGRpdlxyXG4gICAgICB2YXIgY29udGFpbmVyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3NlYXJjaC1saXN0Jyk7XHJcblxyXG4gICAgICAvLyBnZW5lcmF0ZSB0b29sYmFyXHJcbiAgICAgIHZhciB0b29sYmFyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3Rvb2xiYXInKTtcclxuXHJcbiAgICAgIHZhciB0eHRmaWx0ZXIgPSAkKCc8aW5wdXQvPicpLmF0dHIoe3R5cGU6J3RleHQnLCBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXJ9KS5hZGRDbGFzcygndHh0RmlsdGVyJykua2V5dXAoZnVuY3Rpb24oKXtcclxuICAgICAgICBzZWxmLl9maWx0ZXIoJCh0aGlzKS52YWwoKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdG9vbGJhci5hcHBlbmQoJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ2ZpbHRlcmJveCcpLmFwcGVuZCh0eHRmaWx0ZXIpKTtcclxuXHJcbiAgICAgIC8vIGdlbmVyYXRlIGxpc3QgdGFibGUgb2JqZWN0XHJcbiAgICAgIG8ub2JqTGlzdCA9ICQoJzx1bCByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsbGVkYnk9XCJjaGVja2JveEdyb3VwMVwiLz4nKS5hZGRDbGFzcygnYW1hX19saXN0IGZpbHRlcicpO1xyXG5cclxuICAgICAgY29udGFpbmVyLmFwcGVuZCh0b29sYmFyKTtcclxuICAgICAgY29udGFpbmVyLmFwcGVuZChvLm9iakxpc3QpO1xyXG4gICAgICBlbC5hcHBlbmQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgIHNlbGYubG9hZExpc3QoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2FkZEl0ZW06IGZ1bmN0aW9uKGxpc3RJdGVtKXtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLCBvID0gc2VsZi5vcHRpb25zLCBlbCA9IHNlbGYuZWxlbWVudDtcclxuXHJcbiAgICAgIHZhciBpdGVtSWQgPSAnaXRtJyArIChvLmljb3VudCsrKTtcdC8vIGdlbmVyYXRlIGl0ZW0gaWRcclxuICAgICAgdmFyIGl0bSA9ICQoJzxsaSByb2xlPVwibWVudWl0ZW1cIiAvPicpO1xyXG4gICAgICB2YXIgY2hrID0gJCgnPGlucHV0IHJvbGU9XCJjaGVja2JveFwiIC8+JykuYXR0cigndHlwZScsJ2NoZWNrYm94JykuYXR0cignaWQnLGl0ZW1JZClcclxuICAgICAgICAuYWRkQ2xhc3MoJ2NoaycpXHJcbiAgICAgICAgLmF0dHIoJ2RhdGEtdGV4dCcsbGlzdEl0ZW0udGV4dClcclxuICAgICAgICAuYXR0cignZGF0YS12YWx1ZScsbGlzdEl0ZW0udmFsdWUpO1xyXG4gICAgICB2YXIgbGFiZWwgPSAkKCc8bGFiZWwgLz4nKS5hdHRyKCdmb3InLGl0ZW1JZCkudGV4dChsaXN0SXRlbS50ZXh0KTtcclxuXHJcbiAgICAgIGl0bS5hcHBlbmQoY2hrLCBsYWJlbCk7XHJcbiAgICAgIG8ub2JqTGlzdC5hcHBlbmQoaXRtKTtcclxuXHJcbiAgICAgIC8vIGJpbmQgc2VsZWN0aW9uLWNoYW5nZVxyXG4gICAgICBlbC5kZWxlZ2F0ZSgnLmNoaycsJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBzZWxmLl9zZWxDaGFuZ2UoKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBsb2FkTGlzdDogZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLCBvID0gc2VsZi5vcHRpb25zLCBlbCA9IHNlbGYuZWxlbWVudDtcclxuXHJcbiAgICAgIG8ub2JqTGlzdC5lbXB0eSgpLmhpZGUoKTtcclxuXHJcbiAgICAgICQuZWFjaChvLmxpc3RJdGVtcyxmdW5jdGlvbigpe1xyXG4gICAgICAgIHNlbGYuX2FkZEl0ZW0odGhpcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc2VsQ2hhbmdlOiBmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsIG8gPSBzZWxmLm9wdGlvbnMsIGVsID0gc2VsZi5lbGVtZW50O1xyXG5cclxuICAgICAgLy8gZW1wdHkgc2VsZWN0aW9uXHJcbiAgICAgIG8uc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG5cclxuICAgICAgLy8gc2NhbiBlbGVtZW50cywgZmluZCBjaGVja2VkIG9uZXNcclxuICAgICAgby5vYmpMaXN0LmZpbmQoJy5jaGsnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIGlmKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKXtcclxuICAgICAgICAgIG8uc2VsZWN0ZWRJdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgdGV4dDogJCh0aGlzKS5hdHRyKCdkYXRhLXRleHQnKSxcclxuICAgICAgICAgICAgdmFsdWU6ICQodGhpcykuYXR0cignZGF0YS12YWx1ZScpXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdoaWdobGlnaHQnKS5zaWJsaW5ncygpLmFkZENsYXNzKCdoaWdobGlnaHQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlnaGxpZ2h0Jykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnaGlnaGxpZ2h0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGZpcmUgb25DaGFuZ2UgZXZlbnRcclxuICAgICAgby5vbkNoYW5nZS5jYWxsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9maWx0ZXI6IGZ1bmN0aW9uKGZpbHRlcil7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcywgbyA9IHNlbGYub3B0aW9ucztcclxuXHJcbiAgICAgIG8ub2JqTGlzdC5maW5kKCcuY2hrJykuZWFjaChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBpZigkKHRoaXMpLmF0dHIoJ2RhdGEtdGV4dCcpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudG9Mb3dlckNhc2UoKSkgPiAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnNob3coKTtcclxuICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XHJcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgZ2V0U2VsZWN0aW9uOiBmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbyA9IHNlbGYub3B0aW9uc1xyXG4gICAgICByZXR1cm4gby5zZWxlY3RlZEl0ZW1zO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXREYXRhOiBmdW5jdGlvbihkYXRhTW9kZWwpe1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbyA9IHNlbGYub3B0aW9uc1xyXG4gICAgICBvLmxpc3RJdGVtcyA9IGRhdGFNb2RlbDtcclxuICAgICAgc2VsZi5sb2FkTGlzdCgpO1xyXG4gICAgICBzZWxmLl9zZWxDaGFuZ2UoKTtcclxuICAgIH1cclxuICB9KTtcclxufSkoJCk7XHJcbiIsIi8qIVxyXG4gKiBqUXVlcnkgVmFsaWRhdGlvbiBQbHVnaW4gdjEuMTUuMFxyXG4gKlxyXG4gKiBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvXHJcbiAqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNiBKw7ZybiBaYWVmZmVyZXJcclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4oZnVuY3Rpb24oIGZhY3RvcnkgKSB7XHJcblx0aWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcclxuXHRcdGRlZmluZSggW1wianF1ZXJ5XCJdLCBmYWN0b3J5ICk7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoIHJlcXVpcmUoIFwianF1ZXJ5XCIgKSApO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRmYWN0b3J5KCBqUXVlcnkgKTtcclxuXHR9XHJcbn0oZnVuY3Rpb24oICQgKSB7XHJcblxyXG4kLmV4dGVuZCggJC5mbiwge1xuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy92YWxpZGF0ZS9cblx0dmFsaWRhdGU6IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdFx0Ly8gSWYgbm90aGluZyBpcyBzZWxlY3RlZCwgcmV0dXJuIG5vdGhpbmc7IGNhbid0IGNoYWluIGFueXdheVxuXHRcdGlmICggIXRoaXMubGVuZ3RoICkge1xuXHRcdFx0aWYgKCBvcHRpb25zICYmIG9wdGlvbnMuZGVidWcgJiYgd2luZG93LmNvbnNvbGUgKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybiggXCJOb3RoaW5nIHNlbGVjdGVkLCBjYW4ndCB2YWxpZGF0ZSwgcmV0dXJuaW5nIG5vdGhpbmcuXCIgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBpZiBhIHZhbGlkYXRvciBmb3IgdGhpcyBmb3JtIHdhcyBhbHJlYWR5IGNyZWF0ZWRcblx0XHR2YXIgdmFsaWRhdG9yID0gJC5kYXRhKCB0aGlzWyAwIF0sIFwidmFsaWRhdG9yXCIgKTtcblx0XHRpZiAoIHZhbGlkYXRvciApIHtcblx0XHRcdHJldHVybiB2YWxpZGF0b3I7XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIG5vdmFsaWRhdGUgdGFnIGlmIEhUTUw1LlxuXHRcdHRoaXMuYXR0ciggXCJub3ZhbGlkYXRlXCIsIFwibm92YWxpZGF0ZVwiICk7XG5cblx0XHR2YWxpZGF0b3IgPSBuZXcgJC52YWxpZGF0b3IoIG9wdGlvbnMsIHRoaXNbIDAgXSApO1xuXHRcdCQuZGF0YSggdGhpc1sgMCBdLCBcInZhbGlkYXRvclwiLCB2YWxpZGF0b3IgKTtcblxuXHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLm9uc3VibWl0ICkge1xuXG5cdFx0XHR0aGlzLm9uKCBcImNsaWNrLnZhbGlkYXRlXCIsIFwiOnN1Ym1pdFwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLnN1Ym1pdEhhbmRsZXIgKSB7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLnN1Ym1pdEJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFsbG93IHN1cHByZXNzaW5nIHZhbGlkYXRpb24gYnkgYWRkaW5nIGEgY2FuY2VsIGNsYXNzIHRvIHRoZSBzdWJtaXQgYnV0dG9uXG5cdFx0XHRcdGlmICggJCggdGhpcyApLmhhc0NsYXNzKCBcImNhbmNlbFwiICkgKSB7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLmNhbmNlbFN1Ym1pdCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBbGxvdyBzdXBwcmVzc2luZyB2YWxpZGF0aW9uIGJ5IGFkZGluZyB0aGUgaHRtbDUgZm9ybW5vdmFsaWRhdGUgYXR0cmlidXRlIHRvIHRoZSBzdWJtaXQgYnV0dG9uXG5cdFx0XHRcdGlmICggJCggdGhpcyApLmF0dHIoIFwiZm9ybW5vdmFsaWRhdGVcIiApICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLmNhbmNlbFN1Ym1pdCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblxuXHRcdFx0Ly8gVmFsaWRhdGUgdGhlIGZvcm0gb24gc3VibWl0XG5cdFx0XHR0aGlzLm9uKCBcInN1Ym1pdC52YWxpZGF0ZVwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLmRlYnVnICkge1xuXG5cdFx0XHRcdFx0Ly8gUHJldmVudCBmb3JtIHN1Ym1pdCB0byBiZSBhYmxlIHRvIHNlZSBjb25zb2xlIG91dHB1dFxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZnVuY3Rpb24gaGFuZGxlKCkge1xuXHRcdFx0XHRcdHZhciBoaWRkZW4sIHJlc3VsdDtcblx0XHRcdFx0XHRpZiAoIHZhbGlkYXRvci5zZXR0aW5ncy5zdWJtaXRIYW5kbGVyICkge1xuXHRcdFx0XHRcdFx0aWYgKCB2YWxpZGF0b3Iuc3VibWl0QnV0dG9uICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEluc2VydCBhIGhpZGRlbiBpbnB1dCBhcyBhIHJlcGxhY2VtZW50IGZvciB0aGUgbWlzc2luZyBzdWJtaXQgYnV0dG9uXG5cdFx0XHRcdFx0XHRcdGhpZGRlbiA9ICQoIFwiPGlucHV0IHR5cGU9J2hpZGRlbicvPlwiIClcblx0XHRcdFx0XHRcdFx0XHQuYXR0ciggXCJuYW1lXCIsIHZhbGlkYXRvci5zdWJtaXRCdXR0b24ubmFtZSApXG5cdFx0XHRcdFx0XHRcdFx0LnZhbCggJCggdmFsaWRhdG9yLnN1Ym1pdEJ1dHRvbiApLnZhbCgpIClcblx0XHRcdFx0XHRcdFx0XHQuYXBwZW5kVG8oIHZhbGlkYXRvci5jdXJyZW50Rm9ybSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdmFsaWRhdG9yLnNldHRpbmdzLnN1Ym1pdEhhbmRsZXIuY2FsbCggdmFsaWRhdG9yLCB2YWxpZGF0b3IuY3VycmVudEZvcm0sIGV2ZW50ICk7XG5cdFx0XHRcdFx0XHRpZiAoIHZhbGlkYXRvci5zdWJtaXRCdXR0b24gKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQW5kIGNsZWFuIHVwIGFmdGVyd2FyZHM7IHRoYW5rcyB0byBuby1ibG9jay1zY29wZSwgaGlkZGVuIGNhbiBiZSByZWZlcmVuY2VkXG5cdFx0XHRcdFx0XHRcdGhpZGRlbi5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICggcmVzdWx0ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUHJldmVudCBzdWJtaXQgZm9yIGludmFsaWQgZm9ybXMgb3IgY3VzdG9tIHN1Ym1pdCBoYW5kbGVyc1xuXHRcdFx0XHRpZiAoIHZhbGlkYXRvci5jYW5jZWxTdWJtaXQgKSB7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLmNhbmNlbFN1Ym1pdCA9IGZhbHNlO1xuXHRcdFx0XHRcdHJldHVybiBoYW5kbGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIHZhbGlkYXRvci5mb3JtKCkgKSB7XG5cdFx0XHRcdFx0aWYgKCB2YWxpZGF0b3IucGVuZGluZ1JlcXVlc3QgKSB7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3IuZm9ybVN1Ym1pdHRlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBoYW5kbGUoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuZm9jdXNJbnZhbGlkKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbGlkYXRvcjtcblx0fSxcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvdmFsaWQvXG5cdHZhbGlkOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgdmFsaWQsIHZhbGlkYXRvciwgZXJyb3JMaXN0O1xuXG5cdFx0aWYgKCAkKCB0aGlzWyAwIF0gKS5pcyggXCJmb3JtXCIgKSApIHtcblx0XHRcdHZhbGlkID0gdGhpcy52YWxpZGF0ZSgpLmZvcm0oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXJyb3JMaXN0ID0gW107XG5cdFx0XHR2YWxpZCA9IHRydWU7XG5cdFx0XHR2YWxpZGF0b3IgPSAkKCB0aGlzWyAwIF0uZm9ybSApLnZhbGlkYXRlKCk7XG5cdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YWxpZCA9IHZhbGlkYXRvci5lbGVtZW50KCB0aGlzICkgJiYgdmFsaWQ7XG5cdFx0XHRcdGlmICggIXZhbGlkICkge1xuXHRcdFx0XHRcdGVycm9yTGlzdCA9IGVycm9yTGlzdC5jb25jYXQoIHZhbGlkYXRvci5lcnJvckxpc3QgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdFx0dmFsaWRhdG9yLmVycm9yTGlzdCA9IGVycm9yTGlzdDtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbGlkO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9ydWxlcy9cblx0cnVsZXM6IGZ1bmN0aW9uKCBjb21tYW5kLCBhcmd1bWVudCApIHtcblxuXHRcdC8vIElmIG5vdGhpbmcgaXMgc2VsZWN0ZWQsIHJldHVybiBub3RoaW5nOyBjYW4ndCBjaGFpbiBhbnl3YXlcblx0XHRpZiAoICF0aGlzLmxlbmd0aCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgZWxlbWVudCA9IHRoaXNbIDAgXSxcblx0XHRcdHNldHRpbmdzLCBzdGF0aWNSdWxlcywgZXhpc3RpbmdSdWxlcywgZGF0YSwgcGFyYW0sIGZpbHRlcmVkO1xuXG5cdFx0aWYgKCBjb21tYW5kICkge1xuXHRcdFx0c2V0dGluZ3MgPSAkLmRhdGEoIGVsZW1lbnQuZm9ybSwgXCJ2YWxpZGF0b3JcIiApLnNldHRpbmdzO1xuXHRcdFx0c3RhdGljUnVsZXMgPSBzZXR0aW5ncy5ydWxlcztcblx0XHRcdGV4aXN0aW5nUnVsZXMgPSAkLnZhbGlkYXRvci5zdGF0aWNSdWxlcyggZWxlbWVudCApO1xuXHRcdFx0c3dpdGNoICggY29tbWFuZCApIHtcblx0XHRcdGNhc2UgXCJhZGRcIjpcblx0XHRcdFx0JC5leHRlbmQoIGV4aXN0aW5nUnVsZXMsICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoIGFyZ3VtZW50ICkgKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgbWVzc2FnZXMgZnJvbSBydWxlcywgYnV0IGFsbG93IHRoZW0gdG8gYmUgc2V0IHNlcGFyYXRlbHlcblx0XHRcdFx0ZGVsZXRlIGV4aXN0aW5nUnVsZXMubWVzc2FnZXM7XG5cdFx0XHRcdHN0YXRpY1J1bGVzWyBlbGVtZW50Lm5hbWUgXSA9IGV4aXN0aW5nUnVsZXM7XG5cdFx0XHRcdGlmICggYXJndW1lbnQubWVzc2FnZXMgKSB7XG5cdFx0XHRcdFx0c2V0dGluZ3MubWVzc2FnZXNbIGVsZW1lbnQubmFtZSBdID0gJC5leHRlbmQoIHNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXSwgYXJndW1lbnQubWVzc2FnZXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJyZW1vdmVcIjpcblx0XHRcdFx0aWYgKCAhYXJndW1lbnQgKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHN0YXRpY1J1bGVzWyBlbGVtZW50Lm5hbWUgXTtcblx0XHRcdFx0XHRyZXR1cm4gZXhpc3RpbmdSdWxlcztcblx0XHRcdFx0fVxuXHRcdFx0XHRmaWx0ZXJlZCA9IHt9O1xuXHRcdFx0XHQkLmVhY2goIGFyZ3VtZW50LnNwbGl0KCAvXFxzLyApLCBmdW5jdGlvbiggaW5kZXgsIG1ldGhvZCApIHtcblx0XHRcdFx0XHRmaWx0ZXJlZFsgbWV0aG9kIF0gPSBleGlzdGluZ1J1bGVzWyBtZXRob2QgXTtcblx0XHRcdFx0XHRkZWxldGUgZXhpc3RpbmdSdWxlc1sgbWV0aG9kIF07XG5cdFx0XHRcdFx0aWYgKCBtZXRob2QgPT09IFwicmVxdWlyZWRcIiApIHtcblx0XHRcdFx0XHRcdCQoIGVsZW1lbnQgKS5yZW1vdmVBdHRyKCBcImFyaWEtcmVxdWlyZWRcIiApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdFx0XHRyZXR1cm4gZmlsdGVyZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZGF0YSA9ICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGVzKFxuXHRcdCQuZXh0ZW5kKFxuXHRcdFx0e30sXG5cdFx0XHQkLnZhbGlkYXRvci5jbGFzc1J1bGVzKCBlbGVtZW50ICksXG5cdFx0XHQkLnZhbGlkYXRvci5hdHRyaWJ1dGVSdWxlcyggZWxlbWVudCApLFxuXHRcdFx0JC52YWxpZGF0b3IuZGF0YVJ1bGVzKCBlbGVtZW50ICksXG5cdFx0XHQkLnZhbGlkYXRvci5zdGF0aWNSdWxlcyggZWxlbWVudCApXG5cdFx0KSwgZWxlbWVudCApO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHJlcXVpcmVkIGlzIGF0IGZyb250XG5cdFx0aWYgKCBkYXRhLnJlcXVpcmVkICkge1xuXHRcdFx0cGFyYW0gPSBkYXRhLnJlcXVpcmVkO1xuXHRcdFx0ZGVsZXRlIGRhdGEucmVxdWlyZWQ7XG5cdFx0XHRkYXRhID0gJC5leHRlbmQoIHsgcmVxdWlyZWQ6IHBhcmFtIH0sIGRhdGEgKTtcblx0XHRcdCQoIGVsZW1lbnQgKS5hdHRyKCBcImFyaWEtcmVxdWlyZWRcIiwgXCJ0cnVlXCIgKTtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgcmVtb3RlIGlzIGF0IGJhY2tcblx0XHRpZiAoIGRhdGEucmVtb3RlICkge1xuXHRcdFx0cGFyYW0gPSBkYXRhLnJlbW90ZTtcblx0XHRcdGRlbGV0ZSBkYXRhLnJlbW90ZTtcblx0XHRcdGRhdGEgPSAkLmV4dGVuZCggZGF0YSwgeyByZW1vdGU6IHBhcmFtIH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxufSApO1xuXG4vLyBDdXN0b20gc2VsZWN0b3JzXG4kLmV4dGVuZCggJC5leHByWyBcIjpcIiBdLCB7XG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2JsYW5rLXNlbGVjdG9yL1xuXHRibGFuazogZnVuY3Rpb24oIGEgKSB7XG5cdFx0cmV0dXJuICEkLnRyaW0oIFwiXCIgKyAkKCBhICkudmFsKCkgKTtcblx0fSxcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZmlsbGVkLXNlbGVjdG9yL1xuXHRmaWxsZWQ6IGZ1bmN0aW9uKCBhICkge1xuXHRcdHZhciB2YWwgPSAkKCBhICkudmFsKCk7XG5cdFx0cmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhISQudHJpbSggXCJcIiArIHZhbCApO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy91bmNoZWNrZWQtc2VsZWN0b3IvXG5cdHVuY2hlY2tlZDogZnVuY3Rpb24oIGEgKSB7XG5cdFx0cmV0dXJuICEkKCBhICkucHJvcCggXCJjaGVja2VkXCIgKTtcblx0fVxufSApO1xuXG4vLyBDb25zdHJ1Y3RvciBmb3IgdmFsaWRhdG9yXG4kLnZhbGlkYXRvciA9IGZ1bmN0aW9uKCBvcHRpb25zLCBmb3JtICkge1xuXHR0aGlzLnNldHRpbmdzID0gJC5leHRlbmQoIHRydWUsIHt9LCAkLnZhbGlkYXRvci5kZWZhdWx0cywgb3B0aW9ucyApO1xuXHR0aGlzLmN1cnJlbnRGb3JtID0gZm9ybTtcblx0dGhpcy5pbml0KCk7XG59O1xuXG4vLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQvXG4kLnZhbGlkYXRvci5mb3JtYXQgPSBmdW5jdGlvbiggc291cmNlLCBwYXJhbXMgKSB7XG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgYXJncyA9ICQubWFrZUFycmF5KCBhcmd1bWVudHMgKTtcblx0XHRcdGFyZ3MudW5zaGlmdCggc291cmNlICk7XG5cdFx0XHRyZXR1cm4gJC52YWxpZGF0b3IuZm9ybWF0LmFwcGx5KCB0aGlzLCBhcmdzICk7XG5cdFx0fTtcblx0fVxuXHRpZiAoIHBhcmFtcyA9PT0gdW5kZWZpbmVkICkge1xuXHRcdHJldHVybiBzb3VyY2U7XG5cdH1cblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBwYXJhbXMuY29uc3RydWN0b3IgIT09IEFycmF5ICApIHtcblx0XHRwYXJhbXMgPSAkLm1ha2VBcnJheSggYXJndW1lbnRzICkuc2xpY2UoIDEgKTtcblx0fVxuXHRpZiAoIHBhcmFtcy5jb25zdHJ1Y3RvciAhPT0gQXJyYXkgKSB7XG5cdFx0cGFyYW1zID0gWyBwYXJhbXMgXTtcblx0fVxuXHQkLmVhY2goIHBhcmFtcywgZnVuY3Rpb24oIGksIG4gKSB7XG5cdFx0c291cmNlID0gc291cmNlLnJlcGxhY2UoIG5ldyBSZWdFeHAoIFwiXFxcXHtcIiArIGkgKyBcIlxcXFx9XCIsIFwiZ1wiICksIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIG47XG5cdFx0fSApO1xuXHR9ICk7XG5cdHJldHVybiBzb3VyY2U7XG59O1xuXG4kLmV4dGVuZCggJC52YWxpZGF0b3IsIHtcblxuXHRkZWZhdWx0czoge1xuXHRcdG1lc3NhZ2VzOiB7fSxcblx0XHRncm91cHM6IHt9LFxuXHRcdHJ1bGVzOiB7fSxcblx0XHRlcnJvckNsYXNzOiBcImVycm9yXCIsXG5cdFx0cGVuZGluZ0NsYXNzOiBcInBlbmRpbmdcIixcblx0XHR2YWxpZENsYXNzOiBcInZhbGlkXCIsXG5cdFx0ZXJyb3JFbGVtZW50OiBcImxhYmVsXCIsXG5cdFx0Zm9jdXNDbGVhbnVwOiBmYWxzZSxcblx0XHRmb2N1c0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JDb250YWluZXI6ICQoIFtdICksXG5cdFx0ZXJyb3JMYWJlbENvbnRhaW5lcjogJCggW10gKSxcblx0XHRvbnN1Ym1pdDogdHJ1ZSxcblx0XHRpZ25vcmU6IFwiOmhpZGRlblwiLFxuXHRcdGlnbm9yZVRpdGxlOiBmYWxzZSxcblx0XHRvbmZvY3VzaW46IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0dGhpcy5sYXN0QWN0aXZlID0gZWxlbWVudDtcblxuXHRcdFx0Ly8gSGlkZSBlcnJvciBsYWJlbCBhbmQgcmVtb3ZlIGVycm9yIGNsYXNzIG9uIGZvY3VzIGlmIGVuYWJsZWRcblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5mb2N1c0NsZWFudXAgKSB7XG5cdFx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodCApIHtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0LmNhbGwoIHRoaXMsIGVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcywgdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5oaWRlVGhlc2UoIHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICkgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdG9uZm9jdXNvdXQ6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0aWYgKCAhdGhpcy5jaGVja2FibGUoIGVsZW1lbnQgKSAmJiAoIGVsZW1lbnQubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZCB8fCAhdGhpcy5vcHRpb25hbCggZWxlbWVudCApICkgKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudCggZWxlbWVudCApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0b25rZXl1cDogZnVuY3Rpb24oIGVsZW1lbnQsIGV2ZW50ICkge1xuXG5cdFx0XHQvLyBBdm9pZCByZXZhbGlkYXRlIHRoZSBmaWVsZCB3aGVuIHByZXNzaW5nIG9uZSBvZiB0aGUgZm9sbG93aW5nIGtleXNcblx0XHRcdC8vIFNoaWZ0ICAgICAgID0+IDE2XG5cdFx0XHQvLyBDdHJsICAgICAgICA9PiAxN1xuXHRcdFx0Ly8gQWx0ICAgICAgICAgPT4gMThcblx0XHRcdC8vIENhcHMgbG9jayAgID0+IDIwXG5cdFx0XHQvLyBFbmQgICAgICAgICA9PiAzNVxuXHRcdFx0Ly8gSG9tZSAgICAgICAgPT4gMzZcblx0XHRcdC8vIExlZnQgYXJyb3cgID0+IDM3XG5cdFx0XHQvLyBVcCBhcnJvdyAgICA9PiAzOFxuXHRcdFx0Ly8gUmlnaHQgYXJyb3cgPT4gMzlcblx0XHRcdC8vIERvd24gYXJyb3cgID0+IDQwXG5cdFx0XHQvLyBJbnNlcnQgICAgICA9PiA0NVxuXHRcdFx0Ly8gTnVtIGxvY2sgICAgPT4gMTQ0XG5cdFx0XHQvLyBBbHRHciBrZXkgICA9PiAyMjVcblx0XHRcdHZhciBleGNsdWRlZEtleXMgPSBbXG5cdFx0XHRcdDE2LCAxNywgMTgsIDIwLCAzNSwgMzYsIDM3LFxuXHRcdFx0XHQzOCwgMzksIDQwLCA0NSwgMTQ0LCAyMjVcblx0XHRcdF07XG5cblx0XHRcdGlmICggZXZlbnQud2hpY2ggPT09IDkgJiYgdGhpcy5lbGVtZW50VmFsdWUoIGVsZW1lbnQgKSA9PT0gXCJcIiB8fCAkLmluQXJyYXkoIGV2ZW50LmtleUNvZGUsIGV4Y2x1ZGVkS2V5cyApICE9PSAtMSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIGlmICggZWxlbWVudC5uYW1lIGluIHRoaXMuc3VibWl0dGVkIHx8IGVsZW1lbnQubmFtZSBpbiB0aGlzLmludmFsaWQgKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudCggZWxlbWVudCApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0b25jbGljazogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cblx0XHRcdC8vIENsaWNrIG9uIHNlbGVjdHMsIHJhZGlvYnV0dG9ucyBhbmQgY2hlY2tib3hlc1xuXHRcdFx0aWYgKCBlbGVtZW50Lm5hbWUgaW4gdGhpcy5zdWJtaXR0ZWQgKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudCggZWxlbWVudCApO1xuXG5cdFx0XHQvLyBPciBvcHRpb24gZWxlbWVudHMsIGNoZWNrIHBhcmVudCBzZWxlY3QgaW4gdGhhdCBjYXNlXG5cdFx0XHR9IGVsc2UgaWYgKCBlbGVtZW50LnBhcmVudE5vZGUubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZCApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50LnBhcmVudE5vZGUgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGhpZ2hsaWdodDogZnVuY3Rpb24oIGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MgKSB7XG5cdFx0XHRpZiAoIGVsZW1lbnQudHlwZSA9PT0gXCJyYWRpb1wiICkge1xuXHRcdFx0XHR0aGlzLmZpbmRCeU5hbWUoIGVsZW1lbnQubmFtZSApLmFkZENsYXNzKCBlcnJvckNsYXNzICkucmVtb3ZlQ2xhc3MoIHZhbGlkQ2xhc3MgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoIGVsZW1lbnQgKS5hZGRDbGFzcyggZXJyb3JDbGFzcyApLnJlbW92ZUNsYXNzKCB2YWxpZENsYXNzICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR1bmhpZ2hsaWdodDogZnVuY3Rpb24oIGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MgKSB7XG5cdFx0XHRpZiAoIGVsZW1lbnQudHlwZSA9PT0gXCJyYWRpb1wiICkge1xuXHRcdFx0XHR0aGlzLmZpbmRCeU5hbWUoIGVsZW1lbnQubmFtZSApLnJlbW92ZUNsYXNzKCBlcnJvckNsYXNzICkuYWRkQ2xhc3MoIHZhbGlkQ2xhc3MgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoIGVsZW1lbnQgKS5yZW1vdmVDbGFzcyggZXJyb3JDbGFzcyApLmFkZENsYXNzKCB2YWxpZENsYXNzICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9qUXVlcnkudmFsaWRhdG9yLnNldERlZmF1bHRzL1xuXHRzZXREZWZhdWx0czogZnVuY3Rpb24oIHNldHRpbmdzICkge1xuXHRcdCQuZXh0ZW5kKCAkLnZhbGlkYXRvci5kZWZhdWx0cywgc2V0dGluZ3MgKTtcblx0fSxcblxuXHRtZXNzYWdlczoge1xuXHRcdHJlcXVpcmVkOiBcIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCIsXG5cdFx0cmVtb3RlOiBcIlBsZWFzZSBmaXggdGhpcyBmaWVsZC5cIixcblx0XHRlbWFpbDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiLFxuXHRcdHVybDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwuXCIsXG5cdFx0ZGF0ZTogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlLlwiLFxuXHRcdGRhdGVJU086IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZSAoIElTTyApLlwiLFxuXHRcdG51bWJlcjogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBudW1iZXIuXCIsXG5cdFx0ZGlnaXRzOiBcIlBsZWFzZSBlbnRlciBvbmx5IGRpZ2l0cy5cIixcblx0XHRlcXVhbFRvOiBcIlBsZWFzZSBlbnRlciB0aGUgc2FtZSB2YWx1ZSBhZ2Fpbi5cIixcblx0XHRtYXhsZW5ndGg6ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgbm8gbW9yZSB0aGFuIHswfSBjaGFyYWN0ZXJzLlwiICksXG5cdFx0bWlubGVuZ3RoOiAkLnZhbGlkYXRvci5mb3JtYXQoIFwiUGxlYXNlIGVudGVyIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiICksXG5cdFx0cmFuZ2VsZW5ndGg6ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9IGNoYXJhY3RlcnMgbG9uZy5cIiApLFxuXHRcdHJhbmdlOiAkLnZhbGlkYXRvci5mb3JtYXQoIFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgYmV0d2VlbiB7MH0gYW5kIHsxfS5cIiApLFxuXHRcdG1heDogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIgKSxcblx0XHRtaW46ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gezB9LlwiICksXG5cdFx0c3RlcDogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBhIG11bHRpcGxlIG9mIHswfS5cIiApXG5cdH0sXG5cblx0YXV0b0NyZWF0ZVJhbmdlczogZmFsc2UsXG5cblx0cHJvdG90eXBlOiB7XG5cblx0XHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMubGFiZWxDb250YWluZXIgPSAkKCB0aGlzLnNldHRpbmdzLmVycm9yTGFiZWxDb250YWluZXIgKTtcblx0XHRcdHRoaXMuZXJyb3JDb250ZXh0ID0gdGhpcy5sYWJlbENvbnRhaW5lci5sZW5ndGggJiYgdGhpcy5sYWJlbENvbnRhaW5lciB8fCAkKCB0aGlzLmN1cnJlbnRGb3JtICk7XG5cdFx0XHR0aGlzLmNvbnRhaW5lcnMgPSAkKCB0aGlzLnNldHRpbmdzLmVycm9yQ29udGFpbmVyICkuYWRkKCB0aGlzLnNldHRpbmdzLmVycm9yTGFiZWxDb250YWluZXIgKTtcblx0XHRcdHRoaXMuc3VibWl0dGVkID0ge307XG5cdFx0XHR0aGlzLnZhbHVlQ2FjaGUgPSB7fTtcblx0XHRcdHRoaXMucGVuZGluZ1JlcXVlc3QgPSAwO1xuXHRcdFx0dGhpcy5wZW5kaW5nID0ge307XG5cdFx0XHR0aGlzLmludmFsaWQgPSB7fTtcblx0XHRcdHRoaXMucmVzZXQoKTtcblxuXHRcdFx0dmFyIGdyb3VwcyA9ICggdGhpcy5ncm91cHMgPSB7fSApLFxuXHRcdFx0XHRydWxlcztcblx0XHRcdCQuZWFjaCggdGhpcy5zZXR0aW5ncy5ncm91cHMsIGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnNwbGl0KCAvXFxzLyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCQuZWFjaCggdmFsdWUsIGZ1bmN0aW9uKCBpbmRleCwgbmFtZSApIHtcblx0XHRcdFx0XHRncm91cHNbIG5hbWUgXSA9IGtleTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fSApO1xuXHRcdFx0cnVsZXMgPSB0aGlzLnNldHRpbmdzLnJ1bGVzO1xuXHRcdFx0JC5lYWNoKCBydWxlcywgZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdHJ1bGVzWyBrZXkgXSA9ICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoIHZhbHVlICk7XG5cdFx0XHR9ICk7XG5cblx0XHRcdGZ1bmN0aW9uIGRlbGVnYXRlKCBldmVudCApIHtcblx0XHRcdFx0dmFyIHZhbGlkYXRvciA9ICQuZGF0YSggdGhpcy5mb3JtLCBcInZhbGlkYXRvclwiICksXG5cdFx0XHRcdFx0ZXZlbnRUeXBlID0gXCJvblwiICsgZXZlbnQudHlwZS5yZXBsYWNlKCAvXnZhbGlkYXRlLywgXCJcIiApLFxuXHRcdFx0XHRcdHNldHRpbmdzID0gdmFsaWRhdG9yLnNldHRpbmdzO1xuXHRcdFx0XHRpZiAoIHNldHRpbmdzWyBldmVudFR5cGUgXSAmJiAhJCggdGhpcyApLmlzKCBzZXR0aW5ncy5pZ25vcmUgKSApIHtcblx0XHRcdFx0XHRzZXR0aW5nc1sgZXZlbnRUeXBlIF0uY2FsbCggdmFsaWRhdG9yLCB0aGlzLCBldmVudCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKVxuXHRcdFx0XHQub24oIFwiZm9jdXNpbi52YWxpZGF0ZSBmb2N1c291dC52YWxpZGF0ZSBrZXl1cC52YWxpZGF0ZVwiLFxuXHRcdFx0XHRcdFwiOnRleHQsIFt0eXBlPSdwYXNzd29yZCddLCBbdHlwZT0nZmlsZSddLCBzZWxlY3QsIHRleHRhcmVhLCBbdHlwZT0nbnVtYmVyJ10sIFt0eXBlPSdzZWFyY2gnXSwgXCIgK1xuXHRcdFx0XHRcdFwiW3R5cGU9J3RlbCddLCBbdHlwZT0ndXJsJ10sIFt0eXBlPSdlbWFpbCddLCBbdHlwZT0nZGF0ZXRpbWUnXSwgW3R5cGU9J2RhdGUnXSwgW3R5cGU9J21vbnRoJ10sIFwiICtcblx0XHRcdFx0XHRcIlt0eXBlPSd3ZWVrJ10sIFt0eXBlPSd0aW1lJ10sIFt0eXBlPSdkYXRldGltZS1sb2NhbCddLCBbdHlwZT0ncmFuZ2UnXSwgW3R5cGU9J2NvbG9yJ10sIFwiICtcblx0XHRcdFx0XHRcIlt0eXBlPSdyYWRpbyddLCBbdHlwZT0nY2hlY2tib3gnXSwgW2NvbnRlbnRlZGl0YWJsZV1cIiwgZGVsZWdhdGUgKVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSwgb2xkSUVcblx0XHRcdFx0Ly8gXCJzZWxlY3RcIiBpcyBwcm92aWRlZCBhcyBldmVudC50YXJnZXQgd2hlbiBjbGlja2luZyBhIG9wdGlvblxuXHRcdFx0XHQub24oIFwiY2xpY2sudmFsaWRhdGVcIiwgXCJzZWxlY3QsIG9wdGlvbiwgW3R5cGU9J3JhZGlvJ10sIFt0eXBlPSdjaGVja2JveCddXCIsIGRlbGVnYXRlICk7XG5cblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5pbnZhbGlkSGFuZGxlciApIHtcblx0XHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApLm9uKCBcImludmFsaWQtZm9ybS52YWxpZGF0ZVwiLCB0aGlzLnNldHRpbmdzLmludmFsaWRIYW5kbGVyICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBhcmlhLXJlcXVpcmVkIHRvIGFueSBTdGF0aWMvRGF0YS9DbGFzcyByZXF1aXJlZCBmaWVsZHMgYmVmb3JlIGZpcnN0IHZhbGlkYXRpb25cblx0XHRcdC8vIFNjcmVlbiByZWFkZXJzIHJlcXVpcmUgdGhpcyBhdHRyaWJ1dGUgdG8gYmUgcHJlc2VudCBiZWZvcmUgdGhlIGluaXRpYWwgc3VibWlzc2lvbiBodHRwOi8vd3d3LnczLm9yZy9UUi9XQ0FHLVRFQ0hTL0FSSUEyLmh0bWxcblx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKS5maW5kKCBcIltyZXF1aXJlZF0sIFtkYXRhLXJ1bGUtcmVxdWlyZWRdLCAucmVxdWlyZWRcIiApLmF0dHIoIFwiYXJpYS1yZXF1aXJlZFwiLCBcInRydWVcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvVmFsaWRhdG9yLmZvcm0vXG5cdFx0Zm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmNoZWNrRm9ybSgpO1xuXHRcdFx0JC5leHRlbmQoIHRoaXMuc3VibWl0dGVkLCB0aGlzLmVycm9yTWFwICk7XG5cdFx0XHR0aGlzLmludmFsaWQgPSAkLmV4dGVuZCgge30sIHRoaXMuZXJyb3JNYXAgKTtcblx0XHRcdGlmICggIXRoaXMudmFsaWQoKSApIHtcblx0XHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApLnRyaWdnZXJIYW5kbGVyKCBcImludmFsaWQtZm9ybVwiLCBbIHRoaXMgXSApO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zaG93RXJyb3JzKCk7XG5cdFx0XHRyZXR1cm4gdGhpcy52YWxpZCgpO1xuXHRcdH0sXG5cblx0XHRjaGVja0Zvcm06IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5wcmVwYXJlRm9ybSgpO1xuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBlbGVtZW50cyA9ICggdGhpcy5jdXJyZW50RWxlbWVudHMgPSB0aGlzLmVsZW1lbnRzKCkgKTsgZWxlbWVudHNbIGkgXTsgaSsrICkge1xuXHRcdFx0XHR0aGlzLmNoZWNrKCBlbGVtZW50c1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy52YWxpZCgpO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvVmFsaWRhdG9yLmVsZW1lbnQvXG5cdFx0ZWxlbWVudDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR2YXIgY2xlYW5FbGVtZW50ID0gdGhpcy5jbGVhbiggZWxlbWVudCApLFxuXHRcdFx0XHRjaGVja0VsZW1lbnQgPSB0aGlzLnZhbGlkYXRpb25UYXJnZXRGb3IoIGNsZWFuRWxlbWVudCApLFxuXHRcdFx0XHR2ID0gdGhpcyxcblx0XHRcdFx0cmVzdWx0ID0gdHJ1ZSxcblx0XHRcdFx0cnMsIGdyb3VwO1xuXG5cdFx0XHRpZiAoIGNoZWNrRWxlbWVudCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRkZWxldGUgdGhpcy5pbnZhbGlkWyBjbGVhbkVsZW1lbnQubmFtZSBdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5wcmVwYXJlRWxlbWVudCggY2hlY2tFbGVtZW50ICk7XG5cdFx0XHRcdHRoaXMuY3VycmVudEVsZW1lbnRzID0gJCggY2hlY2tFbGVtZW50ICk7XG5cblx0XHRcdFx0Ly8gSWYgdGhpcyBlbGVtZW50IGlzIGdyb3VwZWQsIHRoZW4gdmFsaWRhdGUgYWxsIGdyb3VwIGVsZW1lbnRzIGFscmVhZHlcblx0XHRcdFx0Ly8gY29udGFpbmluZyBhIHZhbHVlXG5cdFx0XHRcdGdyb3VwID0gdGhpcy5ncm91cHNbIGNoZWNrRWxlbWVudC5uYW1lIF07XG5cdFx0XHRcdGlmICggZ3JvdXAgKSB7XG5cdFx0XHRcdFx0JC5lYWNoKCB0aGlzLmdyb3VwcywgZnVuY3Rpb24oIG5hbWUsIHRlc3Rncm91cCApIHtcblx0XHRcdFx0XHRcdGlmICggdGVzdGdyb3VwID09PSBncm91cCAmJiBuYW1lICE9PSBjaGVja0VsZW1lbnQubmFtZSApIHtcblx0XHRcdFx0XHRcdFx0Y2xlYW5FbGVtZW50ID0gdi52YWxpZGF0aW9uVGFyZ2V0Rm9yKCB2LmNsZWFuKCB2LmZpbmRCeU5hbWUoIG5hbWUgKSApICk7XG5cdFx0XHRcdFx0XHRcdGlmICggY2xlYW5FbGVtZW50ICYmIGNsZWFuRWxlbWVudC5uYW1lIGluIHYuaW52YWxpZCApIHtcblx0XHRcdFx0XHRcdFx0XHR2LmN1cnJlbnRFbGVtZW50cy5wdXNoKCBjbGVhbkVsZW1lbnQgKTtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQgJiYgdi5jaGVjayggY2xlYW5FbGVtZW50ICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRycyA9IHRoaXMuY2hlY2soIGNoZWNrRWxlbWVudCApICE9PSBmYWxzZTtcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0ICYmIHJzO1xuXHRcdFx0XHRpZiAoIHJzICkge1xuXHRcdFx0XHRcdHRoaXMuaW52YWxpZFsgY2hlY2tFbGVtZW50Lm5hbWUgXSA9IGZhbHNlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuaW52YWxpZFsgY2hlY2tFbGVtZW50Lm5hbWUgXSA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoICF0aGlzLm51bWJlck9mSW52YWxpZHMoKSApIHtcblxuXHRcdFx0XHRcdC8vIEhpZGUgZXJyb3IgY29udGFpbmVycyBvbiBsYXN0IGVycm9yXG5cdFx0XHRcdFx0dGhpcy50b0hpZGUgPSB0aGlzLnRvSGlkZS5hZGQoIHRoaXMuY29udGFpbmVycyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9ycygpO1xuXG5cdFx0XHRcdC8vIEFkZCBhcmlhLWludmFsaWQgc3RhdHVzIGZvciBzY3JlZW4gcmVhZGVyc1xuXHRcdFx0XHQkKCBlbGVtZW50ICkuYXR0ciggXCJhcmlhLWludmFsaWRcIiwgIXJzICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3Iuc2hvd0Vycm9ycy9cblx0XHRzaG93RXJyb3JzOiBmdW5jdGlvbiggZXJyb3JzICkge1xuXHRcdFx0aWYgKCBlcnJvcnMgKSB7XG5cdFx0XHRcdHZhciB2YWxpZGF0b3IgPSB0aGlzO1xuXG5cdFx0XHRcdC8vIEFkZCBpdGVtcyB0byBlcnJvciBsaXN0IGFuZCBtYXBcblx0XHRcdFx0JC5leHRlbmQoIHRoaXMuZXJyb3JNYXAsIGVycm9ycyApO1xuXHRcdFx0XHR0aGlzLmVycm9yTGlzdCA9ICQubWFwKCB0aGlzLmVycm9yTWFwLCBmdW5jdGlvbiggbWVzc2FnZSwgbmFtZSApIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZSxcblx0XHRcdFx0XHRcdGVsZW1lbnQ6IHZhbGlkYXRvci5maW5kQnlOYW1lKCBuYW1lIClbIDAgXVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgaXRlbXMgZnJvbSBzdWNjZXNzIGxpc3Rcblx0XHRcdFx0dGhpcy5zdWNjZXNzTGlzdCA9ICQuZ3JlcCggdGhpcy5zdWNjZXNzTGlzdCwgZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuICEoIGVsZW1lbnQubmFtZSBpbiBlcnJvcnMgKTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLnNob3dFcnJvcnMgKSB7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3Muc2hvd0Vycm9ycy5jYWxsKCB0aGlzLCB0aGlzLmVycm9yTWFwLCB0aGlzLmVycm9yTGlzdCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0U2hvd0Vycm9ycygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvVmFsaWRhdG9yLnJlc2V0Rm9ybS9cblx0XHRyZXNldEZvcm06IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAkLmZuLnJlc2V0Rm9ybSApIHtcblx0XHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApLnJlc2V0Rm9ybSgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5pbnZhbGlkID0ge307XG5cdFx0XHR0aGlzLnN1Ym1pdHRlZCA9IHt9O1xuXHRcdFx0dGhpcy5wcmVwYXJlRm9ybSgpO1xuXHRcdFx0dGhpcy5oaWRlRXJyb3JzKCk7XG5cdFx0XHR2YXIgZWxlbWVudHMgPSB0aGlzLmVsZW1lbnRzKClcblx0XHRcdFx0LnJlbW92ZURhdGEoIFwicHJldmlvdXNWYWx1ZVwiIClcblx0XHRcdFx0LnJlbW92ZUF0dHIoIFwiYXJpYS1pbnZhbGlkXCIgKTtcblxuXHRcdFx0dGhpcy5yZXNldEVsZW1lbnRzKCBlbGVtZW50cyApO1xuXHRcdH0sXG5cblx0XHRyZXNldEVsZW1lbnRzOiBmdW5jdGlvbiggZWxlbWVudHMgKSB7XG5cdFx0XHR2YXIgaTtcblxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0ICkge1xuXHRcdFx0XHRmb3IgKCBpID0gMDsgZWxlbWVudHNbIGkgXTsgaSsrICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQuY2FsbCggdGhpcywgZWxlbWVudHNbIGkgXSxcblx0XHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcywgXCJcIiApO1xuXHRcdFx0XHRcdHRoaXMuZmluZEJ5TmFtZSggZWxlbWVudHNbIGkgXS5uYW1lICkucmVtb3ZlQ2xhc3MoIHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50c1xuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzIClcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoIHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRudW1iZXJPZkludmFsaWRzOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm9iamVjdExlbmd0aCggdGhpcy5pbnZhbGlkICk7XG5cdFx0fSxcblxuXHRcdG9iamVjdExlbmd0aDogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRcdC8qIGpzaGludCB1bnVzZWQ6IGZhbHNlICovXG5cdFx0XHR2YXIgY291bnQgPSAwLFxuXHRcdFx0XHRpO1xuXHRcdFx0Zm9yICggaSBpbiBvYmogKSB7XG5cdFx0XHRcdGlmICggb2JqWyBpIF0gKSB7XG5cdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNvdW50O1xuXHRcdH0sXG5cblx0XHRoaWRlRXJyb3JzOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaGlkZVRoZXNlKCB0aGlzLnRvSGlkZSApO1xuXHRcdH0sXG5cblx0XHRoaWRlVGhlc2U6IGZ1bmN0aW9uKCBlcnJvcnMgKSB7XG5cdFx0XHRlcnJvcnMubm90KCB0aGlzLmNvbnRhaW5lcnMgKS50ZXh0KCBcIlwiICk7XG5cdFx0XHR0aGlzLmFkZFdyYXBwZXIoIGVycm9ycyApLmhpZGUoKTtcblx0XHR9LFxuXG5cdFx0dmFsaWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc2l6ZSgpID09PSAwO1xuXHRcdH0sXG5cblx0XHRzaXplOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmVycm9yTGlzdC5sZW5ndGg7XG5cdFx0fSxcblxuXHRcdGZvY3VzSW52YWxpZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3MuZm9jdXNJbnZhbGlkICkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdCQoIHRoaXMuZmluZExhc3RBY3RpdmUoKSB8fCB0aGlzLmVycm9yTGlzdC5sZW5ndGggJiYgdGhpcy5lcnJvckxpc3RbIDAgXS5lbGVtZW50IHx8IFtdIClcblx0XHRcdFx0XHQuZmlsdGVyKCBcIjp2aXNpYmxlXCIgKVxuXHRcdFx0XHRcdC5mb2N1cygpXG5cblx0XHRcdFx0XHQvLyBNYW51YWxseSB0cmlnZ2VyIGZvY3VzaW4gZXZlbnQ7IHdpdGhvdXQgaXQsIGZvY3VzaW4gaGFuZGxlciBpc24ndCBjYWxsZWQsIGZpbmRMYXN0QWN0aXZlIHdvbid0IGhhdmUgYW55dGhpbmcgdG8gZmluZFxuXHRcdFx0XHRcdC50cmlnZ2VyKCBcImZvY3VzaW5cIiApO1xuXHRcdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRcdC8vIElnbm9yZSBJRSB0aHJvd2luZyBlcnJvcnMgd2hlbiBmb2N1c2luZyBoaWRkZW4gZWxlbWVudHNcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRmaW5kTGFzdEFjdGl2ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbGFzdEFjdGl2ZSA9IHRoaXMubGFzdEFjdGl2ZTtcblx0XHRcdHJldHVybiBsYXN0QWN0aXZlICYmICQuZ3JlcCggdGhpcy5lcnJvckxpc3QsIGZ1bmN0aW9uKCBuICkge1xuXHRcdFx0XHRyZXR1cm4gbi5lbGVtZW50Lm5hbWUgPT09IGxhc3RBY3RpdmUubmFtZTtcblx0XHRcdH0gKS5sZW5ndGggPT09IDEgJiYgbGFzdEFjdGl2ZTtcblx0XHR9LFxuXG5cdFx0ZWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHZhbGlkYXRvciA9IHRoaXMsXG5cdFx0XHRcdHJ1bGVzQ2FjaGUgPSB7fTtcblxuXHRcdFx0Ly8gU2VsZWN0IGFsbCB2YWxpZCBpbnB1dHMgaW5zaWRlIHRoZSBmb3JtIChubyBzdWJtaXQgb3IgcmVzZXQgYnV0dG9ucylcblx0XHRcdHJldHVybiAkKCB0aGlzLmN1cnJlbnRGb3JtIClcblx0XHRcdC5maW5kKCBcImlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbY29udGVudGVkaXRhYmxlXVwiIClcblx0XHRcdC5ub3QoIFwiOnN1Ym1pdCwgOnJlc2V0LCA6aW1hZ2UsIDpkaXNhYmxlZFwiIClcblx0XHRcdC5ub3QoIHRoaXMuc2V0dGluZ3MuaWdub3JlIClcblx0XHRcdC5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgbmFtZSA9IHRoaXMubmFtZSB8fCAkKCB0aGlzICkuYXR0ciggXCJuYW1lXCIgKTsgLy8gRm9yIGNvbnRlbnRlZGl0YWJsZVxuXHRcdFx0XHRpZiAoICFuYW1lICYmIHZhbGlkYXRvci5zZXR0aW5ncy5kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSApIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCBcIiVvIGhhcyBubyBuYW1lIGFzc2lnbmVkXCIsIHRoaXMgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNldCBmb3JtIGV4cGFuZG8gb24gY29udGVudGVkaXRhYmxlXG5cdFx0XHRcdGlmICggdGhpcy5oYXNBdHRyaWJ1dGUoIFwiY29udGVudGVkaXRhYmxlXCIgKSApIHtcblx0XHRcdFx0XHR0aGlzLmZvcm0gPSAkKCB0aGlzICkuY2xvc2VzdCggXCJmb3JtXCIgKVsgMCBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2VsZWN0IG9ubHkgdGhlIGZpcnN0IGVsZW1lbnQgZm9yIGVhY2ggbmFtZSwgYW5kIG9ubHkgdGhvc2Ugd2l0aCBydWxlcyBzcGVjaWZpZWRcblx0XHRcdFx0aWYgKCBuYW1lIGluIHJ1bGVzQ2FjaGUgfHwgIXZhbGlkYXRvci5vYmplY3RMZW5ndGgoICQoIHRoaXMgKS5ydWxlcygpICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cnVsZXNDYWNoZVsgbmFtZSBdID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9ICk7XG5cdFx0fSxcblxuXHRcdGNsZWFuOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0XHRyZXR1cm4gJCggc2VsZWN0b3IgKVsgMCBdO1xuXHRcdH0sXG5cblx0XHRlcnJvcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGVycm9yQ2xhc3MgPSB0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3Muc3BsaXQoIFwiIFwiICkuam9pbiggXCIuXCIgKTtcblx0XHRcdHJldHVybiAkKCB0aGlzLnNldHRpbmdzLmVycm9yRWxlbWVudCArIFwiLlwiICsgZXJyb3JDbGFzcywgdGhpcy5lcnJvckNvbnRleHQgKTtcblx0XHR9LFxuXG5cdFx0cmVzZXRJbnRlcm5hbHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5zdWNjZXNzTGlzdCA9IFtdO1xuXHRcdFx0dGhpcy5lcnJvckxpc3QgPSBbXTtcblx0XHRcdHRoaXMuZXJyb3JNYXAgPSB7fTtcblx0XHRcdHRoaXMudG9TaG93ID0gJCggW10gKTtcblx0XHRcdHRoaXMudG9IaWRlID0gJCggW10gKTtcblx0XHR9LFxuXG5cdFx0cmVzZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5yZXNldEludGVybmFscygpO1xuXHRcdFx0dGhpcy5jdXJyZW50RWxlbWVudHMgPSAkKCBbXSApO1xuXHRcdH0sXG5cblx0XHRwcmVwYXJlRm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0XHR0aGlzLnRvSGlkZSA9IHRoaXMuZXJyb3JzKCkuYWRkKCB0aGlzLmNvbnRhaW5lcnMgKTtcblx0XHR9LFxuXG5cdFx0cHJlcGFyZUVsZW1lbnQ6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0dGhpcy5yZXNldCgpO1xuXHRcdFx0dGhpcy50b0hpZGUgPSB0aGlzLmVycm9yc0ZvciggZWxlbWVudCApO1xuXHRcdH0sXG5cblx0XHRlbGVtZW50VmFsdWU6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0dmFyICRlbGVtZW50ID0gJCggZWxlbWVudCApLFxuXHRcdFx0XHR0eXBlID0gZWxlbWVudC50eXBlLFxuXHRcdFx0XHR2YWwsIGlkeDtcblxuXHRcdFx0aWYgKCB0eXBlID09PSBcInJhZGlvXCIgfHwgdHlwZSA9PT0gXCJjaGVja2JveFwiICkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5maW5kQnlOYW1lKCBlbGVtZW50Lm5hbWUgKS5maWx0ZXIoIFwiOmNoZWNrZWRcIiApLnZhbCgpO1xuXHRcdFx0fSBlbHNlIGlmICggdHlwZSA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgZWxlbWVudC52YWxpZGl0eSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdFx0cmV0dXJuIGVsZW1lbnQudmFsaWRpdHkuYmFkSW5wdXQgPyBcIk5hTlwiIDogJGVsZW1lbnQudmFsKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZWxlbWVudC5oYXNBdHRyaWJ1dGUoIFwiY29udGVudGVkaXRhYmxlXCIgKSApIHtcblx0XHRcdFx0dmFsID0gJGVsZW1lbnQudGV4dCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFsID0gJGVsZW1lbnQudmFsKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggdHlwZSA9PT0gXCJmaWxlXCIgKSB7XG5cblx0XHRcdFx0Ly8gTW9kZXJuIGJyb3dzZXIgKGNocm9tZSAmIHNhZmFyaSlcblx0XHRcdFx0aWYgKCB2YWwuc3Vic3RyKCAwLCAxMiApID09PSBcIkM6XFxcXGZha2VwYXRoXFxcXFwiICkge1xuXHRcdFx0XHRcdHJldHVybiB2YWwuc3Vic3RyKCAxMiApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTGVnYWN5IGJyb3dzZXJzXG5cdFx0XHRcdC8vIFVuaXgtYmFzZWQgcGF0aFxuXHRcdFx0XHRpZHggPSB2YWwubGFzdEluZGV4T2YoIFwiL1wiICk7XG5cdFx0XHRcdGlmICggaWR4ID49IDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbC5zdWJzdHIoIGlkeCArIDEgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFdpbmRvd3MtYmFzZWQgcGF0aFxuXHRcdFx0XHRpZHggPSB2YWwubGFzdEluZGV4T2YoIFwiXFxcXFwiICk7XG5cdFx0XHRcdGlmICggaWR4ID49IDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbC5zdWJzdHIoIGlkeCArIDEgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEp1c3QgdGhlIGZpbGUgbmFtZVxuXHRcdFx0XHRyZXR1cm4gdmFsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdHJldHVybiB2YWwucmVwbGFjZSggL1xcci9nLCBcIlwiICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsO1xuXHRcdH0sXG5cblx0XHRjaGVjazogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRlbGVtZW50ID0gdGhpcy52YWxpZGF0aW9uVGFyZ2V0Rm9yKCB0aGlzLmNsZWFuKCBlbGVtZW50ICkgKTtcblxuXHRcdFx0dmFyIHJ1bGVzID0gJCggZWxlbWVudCApLnJ1bGVzKCksXG5cdFx0XHRcdHJ1bGVzQ291bnQgPSAkLm1hcCggcnVsZXMsIGZ1bmN0aW9uKCBuLCBpICkge1xuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHR9ICkubGVuZ3RoLFxuXHRcdFx0XHRkZXBlbmRlbmN5TWlzbWF0Y2ggPSBmYWxzZSxcblx0XHRcdFx0dmFsID0gdGhpcy5lbGVtZW50VmFsdWUoIGVsZW1lbnQgKSxcblx0XHRcdFx0cmVzdWx0LCBtZXRob2QsIHJ1bGU7XG5cblx0XHRcdC8vIElmIGEgbm9ybWFsaXplciBpcyBkZWZpbmVkIGZvciB0aGlzIGVsZW1lbnQsIHRoZW5cblx0XHRcdC8vIGNhbGwgaXQgdG8gcmV0cmVpdmUgdGhlIGNoYW5nZWQgdmFsdWUgaW5zdGVhZFxuXHRcdFx0Ly8gb2YgdXNpbmcgdGhlIHJlYWwgb25lLlxuXHRcdFx0Ly8gTm90ZSB0aGF0IGB0aGlzYCBpbiB0aGUgbm9ybWFsaXplciBpcyBgZWxlbWVudGAuXG5cdFx0XHRpZiAoIHR5cGVvZiBydWxlcy5ub3JtYWxpemVyID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cdFx0XHRcdHZhbCA9IHJ1bGVzLm5vcm1hbGl6ZXIuY2FsbCggZWxlbWVudCwgdmFsICk7XG5cblx0XHRcdFx0aWYgKCB0eXBlb2YgdmFsICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoIFwiVGhlIG5vcm1hbGl6ZXIgc2hvdWxkIHJldHVybiBhIHN0cmluZyB2YWx1ZS5cIiApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRGVsZXRlIHRoZSBub3JtYWxpemVyIGZyb20gcnVsZXMgdG8gYXZvaWQgdHJlYXRpbmdcblx0XHRcdFx0Ly8gaXQgYXMgYSBwcmUtZGVmaW5lZCBtZXRob2QuXG5cdFx0XHRcdGRlbGV0ZSBydWxlcy5ub3JtYWxpemVyO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKCBtZXRob2QgaW4gcnVsZXMgKSB7XG5cdFx0XHRcdHJ1bGUgPSB7IG1ldGhvZDogbWV0aG9kLCBwYXJhbWV0ZXJzOiBydWxlc1sgbWV0aG9kIF0gfTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXN1bHQgPSAkLnZhbGlkYXRvci5tZXRob2RzWyBtZXRob2QgXS5jYWxsKCB0aGlzLCB2YWwsIGVsZW1lbnQsIHJ1bGUucGFyYW1ldGVycyApO1xuXG5cdFx0XHRcdFx0Ly8gSWYgYSBtZXRob2QgaW5kaWNhdGVzIHRoYXQgdGhlIGZpZWxkIGlzIG9wdGlvbmFsIGFuZCB0aGVyZWZvcmUgdmFsaWQsXG5cdFx0XHRcdFx0Ly8gZG9uJ3QgbWFyayBpdCBhcyB2YWxpZCB3aGVuIHRoZXJlIGFyZSBubyBvdGhlciBydWxlc1xuXHRcdFx0XHRcdGlmICggcmVzdWx0ID09PSBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIiAmJiBydWxlc0NvdW50ID09PSAxICkge1xuXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeU1pc21hdGNoID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZXBlbmRlbmN5TWlzbWF0Y2ggPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICggcmVzdWx0ID09PSBcInBlbmRpbmdcIiApIHtcblx0XHRcdFx0XHRcdHRoaXMudG9IaWRlID0gdGhpcy50b0hpZGUubm90KCB0aGlzLmVycm9yc0ZvciggZWxlbWVudCApICk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCAhcmVzdWx0ICkge1xuXHRcdFx0XHRcdFx0dGhpcy5mb3JtYXRBbmRBZGQoIGVsZW1lbnQsIHJ1bGUgKTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSApIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCBcIkV4Y2VwdGlvbiBvY2N1cnJlZCB3aGVuIGNoZWNraW5nIGVsZW1lbnQgXCIgKyBlbGVtZW50LmlkICsgXCIsIGNoZWNrIHRoZSAnXCIgKyBydWxlLm1ldGhvZCArIFwiJyBtZXRob2QuXCIsIGUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBlIGluc3RhbmNlb2YgVHlwZUVycm9yICkge1xuXHRcdFx0XHRcdFx0ZS5tZXNzYWdlICs9IFwiLiAgRXhjZXB0aW9uIG9jY3VycmVkIHdoZW4gY2hlY2tpbmcgZWxlbWVudCBcIiArIGVsZW1lbnQuaWQgKyBcIiwgY2hlY2sgdGhlICdcIiArIHJ1bGUubWV0aG9kICsgXCInIG1ldGhvZC5cIjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGRlcGVuZGVuY3lNaXNtYXRjaCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLm9iamVjdExlbmd0aCggcnVsZXMgKSApIHtcblx0XHRcdFx0dGhpcy5zdWNjZXNzTGlzdC5wdXNoKCBlbGVtZW50ICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJuIHRoZSBjdXN0b20gbWVzc2FnZSBmb3IgdGhlIGdpdmVuIGVsZW1lbnQgYW5kIHZhbGlkYXRpb24gbWV0aG9kXG5cdFx0Ly8gc3BlY2lmaWVkIGluIHRoZSBlbGVtZW50J3MgSFRNTDUgZGF0YSBhdHRyaWJ1dGVcblx0XHQvLyByZXR1cm4gdGhlIGdlbmVyaWMgbWVzc2FnZSBpZiBwcmVzZW50IGFuZCBubyBtZXRob2Qgc3BlY2lmaWMgbWVzc2FnZSBpcyBwcmVzZW50XG5cdFx0Y3VzdG9tRGF0YU1lc3NhZ2U6IGZ1bmN0aW9uKCBlbGVtZW50LCBtZXRob2QgKSB7XG5cdFx0XHRyZXR1cm4gJCggZWxlbWVudCApLmRhdGEoIFwibXNnXCIgKyBtZXRob2QuY2hhckF0KCAwICkudG9VcHBlckNhc2UoKSArXG5cdFx0XHRcdG1ldGhvZC5zdWJzdHJpbmcoIDEgKS50b0xvd2VyQ2FzZSgpICkgfHwgJCggZWxlbWVudCApLmRhdGEoIFwibXNnXCIgKTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJuIHRoZSBjdXN0b20gbWVzc2FnZSBmb3IgdGhlIGdpdmVuIGVsZW1lbnQgbmFtZSBhbmQgdmFsaWRhdGlvbiBtZXRob2Rcblx0XHRjdXN0b21NZXNzYWdlOiBmdW5jdGlvbiggbmFtZSwgbWV0aG9kICkge1xuXHRcdFx0dmFyIG0gPSB0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBuYW1lIF07XG5cdFx0XHRyZXR1cm4gbSAmJiAoIG0uY29uc3RydWN0b3IgPT09IFN0cmluZyA/IG0gOiBtWyBtZXRob2QgXSApO1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm4gdGhlIGZpcnN0IGRlZmluZWQgYXJndW1lbnQsIGFsbG93aW5nIGVtcHR5IHN0cmluZ3Ncblx0XHRmaW5kRGVmaW5lZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGlmICggYXJndW1lbnRzWyBpIF0gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzWyBpIF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fSxcblxuXHRcdGRlZmF1bHRNZXNzYWdlOiBmdW5jdGlvbiggZWxlbWVudCwgcnVsZSApIHtcblx0XHRcdHZhciBtZXNzYWdlID0gdGhpcy5maW5kRGVmaW5lZChcblx0XHRcdFx0XHR0aGlzLmN1c3RvbU1lc3NhZ2UoIGVsZW1lbnQubmFtZSwgcnVsZS5tZXRob2QgKSxcblx0XHRcdFx0XHR0aGlzLmN1c3RvbURhdGFNZXNzYWdlKCBlbGVtZW50LCBydWxlLm1ldGhvZCApLFxuXG5cdFx0XHRcdFx0Ly8gJ3RpdGxlJyBpcyBuZXZlciB1bmRlZmluZWQsIHNvIGhhbmRsZSBlbXB0eSBzdHJpbmcgYXMgdW5kZWZpbmVkXG5cdFx0XHRcdFx0IXRoaXMuc2V0dGluZ3MuaWdub3JlVGl0bGUgJiYgZWxlbWVudC50aXRsZSB8fCB1bmRlZmluZWQsXG5cdFx0XHRcdFx0JC52YWxpZGF0b3IubWVzc2FnZXNbIHJ1bGUubWV0aG9kIF0sXG5cdFx0XHRcdFx0XCI8c3Ryb25nPldhcm5pbmc6IE5vIG1lc3NhZ2UgZGVmaW5lZCBmb3IgXCIgKyBlbGVtZW50Lm5hbWUgKyBcIjwvc3Ryb25nPlwiXG5cdFx0XHRcdCksXG5cdFx0XHRcdHRoZXJlZ2V4ID0gL1xcJD9cXHsoXFxkKylcXH0vZztcblx0XHRcdGlmICggdHlwZW9mIG1lc3NhZ2UgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0XHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2UuY2FsbCggdGhpcywgcnVsZS5wYXJhbWV0ZXJzLCBlbGVtZW50ICk7XG5cdFx0XHR9IGVsc2UgaWYgKCB0aGVyZWdleC50ZXN0KCBtZXNzYWdlICkgKSB7XG5cdFx0XHRcdG1lc3NhZ2UgPSAkLnZhbGlkYXRvci5mb3JtYXQoIG1lc3NhZ2UucmVwbGFjZSggdGhlcmVnZXgsIFwieyQxfVwiICksIHJ1bGUucGFyYW1ldGVycyApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWVzc2FnZTtcblx0XHR9LFxuXG5cdFx0Zm9ybWF0QW5kQWRkOiBmdW5jdGlvbiggZWxlbWVudCwgcnVsZSApIHtcblx0XHRcdHZhciBtZXNzYWdlID0gdGhpcy5kZWZhdWx0TWVzc2FnZSggZWxlbWVudCwgcnVsZSApO1xuXG5cdFx0XHR0aGlzLmVycm9yTGlzdC5wdXNoKCB7XG5cdFx0XHRcdG1lc3NhZ2U6IG1lc3NhZ2UsXG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdG1ldGhvZDogcnVsZS5tZXRob2Rcblx0XHRcdH0gKTtcblxuXHRcdFx0dGhpcy5lcnJvck1hcFsgZWxlbWVudC5uYW1lIF0gPSBtZXNzYWdlO1xuXHRcdFx0dGhpcy5zdWJtaXR0ZWRbIGVsZW1lbnQubmFtZSBdID0gbWVzc2FnZTtcblx0XHR9LFxuXG5cdFx0YWRkV3JhcHBlcjogZnVuY3Rpb24oIHRvVG9nZ2xlICkge1xuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLndyYXBwZXIgKSB7XG5cdFx0XHRcdHRvVG9nZ2xlID0gdG9Ub2dnbGUuYWRkKCB0b1RvZ2dsZS5wYXJlbnQoIHRoaXMuc2V0dGluZ3Mud3JhcHBlciApICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdG9Ub2dnbGU7XG5cdFx0fSxcblxuXHRcdGRlZmF1bHRTaG93RXJyb3JzOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpLCBlbGVtZW50cywgZXJyb3I7XG5cdFx0XHRmb3IgKCBpID0gMDsgdGhpcy5lcnJvckxpc3RbIGkgXTsgaSsrICkge1xuXHRcdFx0XHRlcnJvciA9IHRoaXMuZXJyb3JMaXN0WyBpIF07XG5cdFx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5oaWdobGlnaHQgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5oaWdobGlnaHQuY2FsbCggdGhpcywgZXJyb3IuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLCB0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnNob3dMYWJlbCggZXJyb3IuZWxlbWVudCwgZXJyb3IubWVzc2FnZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLmVycm9yTGlzdC5sZW5ndGggKSB7XG5cdFx0XHRcdHRoaXMudG9TaG93ID0gdGhpcy50b1Nob3cuYWRkKCB0aGlzLmNvbnRhaW5lcnMgKTtcblx0XHRcdH1cblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5zdWNjZXNzICkge1xuXHRcdFx0XHRmb3IgKCBpID0gMDsgdGhpcy5zdWNjZXNzTGlzdFsgaSBdOyBpKysgKSB7XG5cdFx0XHRcdFx0dGhpcy5zaG93TGFiZWwoIHRoaXMuc3VjY2Vzc0xpc3RbIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwLCBlbGVtZW50cyA9IHRoaXMudmFsaWRFbGVtZW50cygpOyBlbGVtZW50c1sgaSBdOyBpKysgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodC5jYWxsKCB0aGlzLCBlbGVtZW50c1sgaSBdLCB0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MsIHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnRvSGlkZSA9IHRoaXMudG9IaWRlLm5vdCggdGhpcy50b1Nob3cgKTtcblx0XHRcdHRoaXMuaGlkZUVycm9ycygpO1xuXHRcdFx0dGhpcy5hZGRXcmFwcGVyKCB0aGlzLnRvU2hvdyApLnNob3coKTtcblx0XHR9LFxuXG5cdFx0dmFsaWRFbGVtZW50czogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jdXJyZW50RWxlbWVudHMubm90KCB0aGlzLmludmFsaWRFbGVtZW50cygpICk7XG5cdFx0fSxcblxuXHRcdGludmFsaWRFbGVtZW50czogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gJCggdGhpcy5lcnJvckxpc3QgKS5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50O1xuXHRcdFx0fSApO1xuXHRcdH0sXG5cblx0XHRzaG93TGFiZWw6IGZ1bmN0aW9uKCBlbGVtZW50LCBtZXNzYWdlICkge1xuXHRcdFx0dmFyIHBsYWNlLCBncm91cCwgZXJyb3JJRCwgdixcblx0XHRcdFx0ZXJyb3IgPSB0aGlzLmVycm9yc0ZvciggZWxlbWVudCApLFxuXHRcdFx0XHRlbGVtZW50SUQgPSB0aGlzLmlkT3JOYW1lKCBlbGVtZW50ICksXG5cdFx0XHRcdGRlc2NyaWJlZEJ5ID0gJCggZWxlbWVudCApLmF0dHIoIFwiYXJpYS1kZXNjcmliZWRieVwiICk7XG5cblx0XHRcdGlmICggZXJyb3IubGVuZ3RoICkge1xuXG5cdFx0XHRcdC8vIFJlZnJlc2ggZXJyb3Ivc3VjY2VzcyBjbGFzc1xuXHRcdFx0XHRlcnJvci5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICkuYWRkQ2xhc3MoIHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyApO1xuXG5cdFx0XHRcdC8vIFJlcGxhY2UgbWVzc2FnZSBvbiBleGlzdGluZyBsYWJlbFxuXHRcdFx0XHRlcnJvci5odG1sKCBtZXNzYWdlICk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIENyZWF0ZSBlcnJvciBlbGVtZW50XG5cdFx0XHRcdGVycm9yID0gJCggXCI8XCIgKyB0aGlzLnNldHRpbmdzLmVycm9yRWxlbWVudCArIFwiPlwiIClcblx0XHRcdFx0XHQuYXR0ciggXCJpZFwiLCBlbGVtZW50SUQgKyBcIi1lcnJvclwiIClcblx0XHRcdFx0XHQuYWRkQ2xhc3MoIHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyApXG5cdFx0XHRcdFx0Lmh0bWwoIG1lc3NhZ2UgfHwgXCJcIiApO1xuXG5cdFx0XHRcdC8vIE1haW50YWluIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCB0byBiZSBwbGFjZWQgaW50byB0aGUgRE9NXG5cdFx0XHRcdHBsYWNlID0gZXJyb3I7XG5cdFx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy53cmFwcGVyICkge1xuXG5cdFx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoZSBlbGVtZW50IGlzIHZpc2libGUsIGV2ZW4gaW4gSUVcblx0XHRcdFx0XHQvLyBhY3R1YWxseSBzaG93aW5nIHRoZSB3cmFwcGVkIGVsZW1lbnQgaXMgaGFuZGxlZCBlbHNld2hlcmVcblx0XHRcdFx0XHRwbGFjZSA9IGVycm9yLmhpZGUoKS5zaG93KCkud3JhcCggXCI8XCIgKyB0aGlzLnNldHRpbmdzLndyYXBwZXIgKyBcIi8+XCIgKS5wYXJlbnQoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIHRoaXMubGFiZWxDb250YWluZXIubGVuZ3RoICkge1xuXHRcdFx0XHRcdHRoaXMubGFiZWxDb250YWluZXIuYXBwZW5kKCBwbGFjZSApO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCB0aGlzLnNldHRpbmdzLmVycm9yUGxhY2VtZW50ICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuZXJyb3JQbGFjZW1lbnQoIHBsYWNlLCAkKCBlbGVtZW50ICkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwbGFjZS5pbnNlcnRBZnRlciggZWxlbWVudCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTGluayBlcnJvciBiYWNrIHRvIHRoZSBlbGVtZW50XG5cdFx0XHRcdGlmICggZXJyb3IuaXMoIFwibGFiZWxcIiApICkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIGVycm9yIGlzIGEgbGFiZWwsIHRoZW4gYXNzb2NpYXRlIHVzaW5nICdmb3InXG5cdFx0XHRcdFx0ZXJyb3IuYXR0ciggXCJmb3JcIiwgZWxlbWVudElEICk7XG5cblx0XHRcdFx0XHQvLyBJZiB0aGUgZWxlbWVudCBpcyBub3QgYSBjaGlsZCBvZiBhbiBhc3NvY2lhdGVkIGxhYmVsLCB0aGVuIGl0J3MgbmVjZXNzYXJ5XG5cdFx0XHRcdFx0Ly8gdG8gZXhwbGljaXRseSBhcHBseSBhcmlhLWRlc2NyaWJlZGJ5XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGVycm9yLnBhcmVudHMoIFwibGFiZWxbZm9yPSdcIiArIHRoaXMuZXNjYXBlQ3NzTWV0YSggZWxlbWVudElEICkgKyBcIiddXCIgKS5sZW5ndGggPT09IDAgKSB7XG5cdFx0XHRcdFx0ZXJyb3JJRCA9IGVycm9yLmF0dHIoIFwiaWRcIiApO1xuXG5cdFx0XHRcdFx0Ly8gUmVzcGVjdCBleGlzdGluZyBub24tZXJyb3IgYXJpYS1kZXNjcmliZWRieVxuXHRcdFx0XHRcdGlmICggIWRlc2NyaWJlZEJ5ICkge1xuXHRcdFx0XHRcdFx0ZGVzY3JpYmVkQnkgPSBlcnJvcklEO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoICFkZXNjcmliZWRCeS5tYXRjaCggbmV3IFJlZ0V4cCggXCJcXFxcYlwiICsgdGhpcy5lc2NhcGVDc3NNZXRhKCBlcnJvcklEICkgKyBcIlxcXFxiXCIgKSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBBZGQgdG8gZW5kIG9mIGxpc3QgaWYgbm90IGFscmVhZHkgcHJlc2VudFxuXHRcdFx0XHRcdFx0ZGVzY3JpYmVkQnkgKz0gXCIgXCIgKyBlcnJvcklEO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkKCBlbGVtZW50ICkuYXR0ciggXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIGRlc2NyaWJlZEJ5ICk7XG5cblx0XHRcdFx0XHQvLyBJZiB0aGlzIGVsZW1lbnQgaXMgZ3JvdXBlZCwgdGhlbiBhc3NpZ24gdG8gYWxsIGVsZW1lbnRzIGluIHRoZSBzYW1lIGdyb3VwXG5cdFx0XHRcdFx0Z3JvdXAgPSB0aGlzLmdyb3Vwc1sgZWxlbWVudC5uYW1lIF07XG5cdFx0XHRcdFx0aWYgKCBncm91cCApIHtcblx0XHRcdFx0XHRcdHYgPSB0aGlzO1xuXHRcdFx0XHRcdFx0JC5lYWNoKCB2Lmdyb3VwcywgZnVuY3Rpb24oIG5hbWUsIHRlc3Rncm91cCApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCB0ZXN0Z3JvdXAgPT09IGdyb3VwICkge1xuXHRcdFx0XHRcdFx0XHRcdCQoIFwiW25hbWU9J1wiICsgdi5lc2NhcGVDc3NNZXRhKCBuYW1lICkgKyBcIiddXCIsIHYuY3VycmVudEZvcm0gKVxuXHRcdFx0XHRcdFx0XHRcdFx0LmF0dHIoIFwiYXJpYS1kZXNjcmliZWRieVwiLCBlcnJvci5hdHRyKCBcImlkXCIgKSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoICFtZXNzYWdlICYmIHRoaXMuc2V0dGluZ3Muc3VjY2VzcyApIHtcblx0XHRcdFx0ZXJyb3IudGV4dCggXCJcIiApO1xuXHRcdFx0XHRpZiAoIHR5cGVvZiB0aGlzLnNldHRpbmdzLnN1Y2Nlc3MgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0ZXJyb3IuYWRkQ2xhc3MoIHRoaXMuc2V0dGluZ3Muc3VjY2VzcyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3Muc3VjY2VzcyggZXJyb3IsIGVsZW1lbnQgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy50b1Nob3cgPSB0aGlzLnRvU2hvdy5hZGQoIGVycm9yICk7XG5cdFx0fSxcblxuXHRcdGVycm9yc0ZvcjogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR2YXIgbmFtZSA9IHRoaXMuZXNjYXBlQ3NzTWV0YSggdGhpcy5pZE9yTmFtZSggZWxlbWVudCApICksXG5cdFx0XHRcdGRlc2NyaWJlciA9ICQoIGVsZW1lbnQgKS5hdHRyKCBcImFyaWEtZGVzY3JpYmVkYnlcIiApLFxuXHRcdFx0XHRzZWxlY3RvciA9IFwibGFiZWxbZm9yPSdcIiArIG5hbWUgKyBcIiddLCBsYWJlbFtmb3I9J1wiICsgbmFtZSArIFwiJ10gKlwiO1xuXG5cdFx0XHQvLyAnYXJpYS1kZXNjcmliZWRieScgc2hvdWxkIGRpcmVjdGx5IHJlZmVyZW5jZSB0aGUgZXJyb3IgZWxlbWVudFxuXHRcdFx0aWYgKCBkZXNjcmliZXIgKSB7XG5cdFx0XHRcdHNlbGVjdG9yID0gc2VsZWN0b3IgKyBcIiwgI1wiICsgdGhpcy5lc2NhcGVDc3NNZXRhKCBkZXNjcmliZXIgKVxuXHRcdFx0XHRcdC5yZXBsYWNlKCAvXFxzKy9nLCBcIiwgI1wiICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0XHRcdC5lcnJvcnMoKVxuXHRcdFx0XHQuZmlsdGVyKCBzZWxlY3RvciApO1xuXHRcdH0sXG5cblx0XHQvLyBTZWUgaHR0cHM6Ly9hcGkuanF1ZXJ5LmNvbS9jYXRlZ29yeS9zZWxlY3RvcnMvLCBmb3IgQ1NTXG5cdFx0Ly8gbWV0YS1jaGFyYWN0ZXJzIHRoYXQgc2hvdWxkIGJlIGVzY2FwZWQgaW4gb3JkZXIgdG8gYmUgdXNlZCB3aXRoIEpRdWVyeVxuXHRcdC8vIGFzIGEgbGl0ZXJhbCBwYXJ0IG9mIGEgbmFtZS9pZCBvciBhbnkgc2VsZWN0b3IuXG5cdFx0ZXNjYXBlQ3NzTWV0YTogZnVuY3Rpb24oIHN0cmluZyApIHtcblx0XHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSggLyhbXFxcXCFcIiMkJSYnKCkqKywuLzo7PD0+P0BcXFtcXF1eYHt8fX5dKS9nLCBcIlxcXFwkMVwiICk7XG5cdFx0fSxcblxuXHRcdGlkT3JOYW1lOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdHJldHVybiB0aGlzLmdyb3Vwc1sgZWxlbWVudC5uYW1lIF0gfHwgKCB0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApID8gZWxlbWVudC5uYW1lIDogZWxlbWVudC5pZCB8fCBlbGVtZW50Lm5hbWUgKTtcblx0XHR9LFxuXG5cdFx0dmFsaWRhdGlvblRhcmdldEZvcjogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cblx0XHRcdC8vIElmIHJhZGlvL2NoZWNrYm94LCB2YWxpZGF0ZSBmaXJzdCBlbGVtZW50IGluIGdyb3VwIGluc3RlYWRcblx0XHRcdGlmICggdGhpcy5jaGVja2FibGUoIGVsZW1lbnQgKSApIHtcblx0XHRcdFx0ZWxlbWVudCA9IHRoaXMuZmluZEJ5TmFtZSggZWxlbWVudC5uYW1lICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFsd2F5cyBhcHBseSBpZ25vcmUgZmlsdGVyXG5cdFx0XHRyZXR1cm4gJCggZWxlbWVudCApLm5vdCggdGhpcy5zZXR0aW5ncy5pZ25vcmUgKVsgMCBdO1xuXHRcdH0sXG5cblx0XHRjaGVja2FibGU6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuICggL3JhZGlvfGNoZWNrYm94L2kgKS50ZXN0KCBlbGVtZW50LnR5cGUgKTtcblx0XHR9LFxuXG5cdFx0ZmluZEJ5TmFtZTogZnVuY3Rpb24oIG5hbWUgKSB7XG5cdFx0XHRyZXR1cm4gJCggdGhpcy5jdXJyZW50Rm9ybSApLmZpbmQoIFwiW25hbWU9J1wiICsgdGhpcy5lc2NhcGVDc3NNZXRhKCBuYW1lICkgKyBcIiddXCIgKTtcblx0XHR9LFxuXG5cdFx0Z2V0TGVuZ3RoOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cdFx0XHRzd2l0Y2ggKCBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKSB7XG5cdFx0XHRjYXNlIFwic2VsZWN0XCI6XG5cdFx0XHRcdHJldHVybiAkKCBcIm9wdGlvbjpzZWxlY3RlZFwiLCBlbGVtZW50ICkubGVuZ3RoO1xuXHRcdFx0Y2FzZSBcImlucHV0XCI6XG5cdFx0XHRcdGlmICggdGhpcy5jaGVja2FibGUoIGVsZW1lbnQgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5maW5kQnlOYW1lKCBlbGVtZW50Lm5hbWUgKS5maWx0ZXIoIFwiOmNoZWNrZWRcIiApLmxlbmd0aDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aDtcblx0XHR9LFxuXG5cdFx0ZGVwZW5kOiBmdW5jdGlvbiggcGFyYW0sIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kZXBlbmRUeXBlc1sgdHlwZW9mIHBhcmFtIF0gPyB0aGlzLmRlcGVuZFR5cGVzWyB0eXBlb2YgcGFyYW0gXSggcGFyYW0sIGVsZW1lbnQgKSA6IHRydWU7XG5cdFx0fSxcblxuXHRcdGRlcGVuZFR5cGVzOiB7XG5cdFx0XHRcImJvb2xlYW5cIjogZnVuY3Rpb24oIHBhcmFtICkge1xuXHRcdFx0XHRyZXR1cm4gcGFyYW07XG5cdFx0XHR9LFxuXHRcdFx0XCJzdHJpbmdcIjogZnVuY3Rpb24oIHBhcmFtLCBlbGVtZW50ICkge1xuXHRcdFx0XHRyZXR1cm4gISEkKCBwYXJhbSwgZWxlbWVudC5mb3JtICkubGVuZ3RoO1xuXHRcdFx0fSxcblx0XHRcdFwiZnVuY3Rpb25cIjogZnVuY3Rpb24oIHBhcmFtLCBlbGVtZW50ICkge1xuXHRcdFx0XHRyZXR1cm4gcGFyYW0oIGVsZW1lbnQgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0b3B0aW9uYWw6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0dmFyIHZhbCA9IHRoaXMuZWxlbWVudFZhbHVlKCBlbGVtZW50ICk7XG5cdFx0XHRyZXR1cm4gISQudmFsaWRhdG9yLm1ldGhvZHMucmVxdWlyZWQuY2FsbCggdGhpcywgdmFsLCBlbGVtZW50ICkgJiYgXCJkZXBlbmRlbmN5LW1pc21hdGNoXCI7XG5cdFx0fSxcblxuXHRcdHN0YXJ0UmVxdWVzdDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRpZiAoICF0aGlzLnBlbmRpbmdbIGVsZW1lbnQubmFtZSBdICkge1xuXHRcdFx0XHR0aGlzLnBlbmRpbmdSZXF1ZXN0Kys7XG5cdFx0XHRcdCQoIGVsZW1lbnQgKS5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5wZW5kaW5nQ2xhc3MgKTtcblx0XHRcdFx0dGhpcy5wZW5kaW5nWyBlbGVtZW50Lm5hbWUgXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHN0b3BSZXF1ZXN0OiBmdW5jdGlvbiggZWxlbWVudCwgdmFsaWQgKSB7XG5cdFx0XHR0aGlzLnBlbmRpbmdSZXF1ZXN0LS07XG5cblx0XHRcdC8vIFNvbWV0aW1lcyBzeW5jaHJvbml6YXRpb24gZmFpbHMsIG1ha2Ugc3VyZSBwZW5kaW5nUmVxdWVzdCBpcyBuZXZlciA8IDBcblx0XHRcdGlmICggdGhpcy5wZW5kaW5nUmVxdWVzdCA8IDAgKSB7XG5cdFx0XHRcdHRoaXMucGVuZGluZ1JlcXVlc3QgPSAwO1xuXHRcdFx0fVxuXHRcdFx0ZGVsZXRlIHRoaXMucGVuZGluZ1sgZWxlbWVudC5uYW1lIF07XG5cdFx0XHQkKCBlbGVtZW50ICkucmVtb3ZlQ2xhc3MoIHRoaXMuc2V0dGluZ3MucGVuZGluZ0NsYXNzICk7XG5cdFx0XHRpZiAoIHZhbGlkICYmIHRoaXMucGVuZGluZ1JlcXVlc3QgPT09IDAgJiYgdGhpcy5mb3JtU3VibWl0dGVkICYmIHRoaXMuZm9ybSgpICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkuc3VibWl0KCk7XG5cdFx0XHRcdHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICggIXZhbGlkICYmIHRoaXMucGVuZGluZ1JlcXVlc3QgPT09IDAgJiYgdGhpcy5mb3JtU3VibWl0dGVkICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkudHJpZ2dlckhhbmRsZXIoIFwiaW52YWxpZC1mb3JtXCIsIFsgdGhpcyBdICk7XG5cdFx0XHRcdHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRwcmV2aW91c1ZhbHVlOiBmdW5jdGlvbiggZWxlbWVudCwgbWV0aG9kICkge1xuXHRcdFx0cmV0dXJuICQuZGF0YSggZWxlbWVudCwgXCJwcmV2aW91c1ZhbHVlXCIgKSB8fCAkLmRhdGEoIGVsZW1lbnQsIFwicHJldmlvdXNWYWx1ZVwiLCB7XG5cdFx0XHRcdG9sZDogbnVsbCxcblx0XHRcdFx0dmFsaWQ6IHRydWUsXG5cdFx0XHRcdG1lc3NhZ2U6IHRoaXMuZGVmYXVsdE1lc3NhZ2UoIGVsZW1lbnQsIHsgbWV0aG9kOiBtZXRob2QgfSApXG5cdFx0XHR9ICk7XG5cdFx0fSxcblxuXHRcdC8vIENsZWFucyB1cCBhbGwgZm9ybXMgYW5kIGVsZW1lbnRzLCByZW1vdmVzIHZhbGlkYXRvci1zcGVjaWZpYyBldmVudHNcblx0XHRkZXN0cm95OiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMucmVzZXRGb3JtKCk7XG5cblx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKVxuXHRcdFx0XHQub2ZmKCBcIi52YWxpZGF0ZVwiIClcblx0XHRcdFx0LnJlbW92ZURhdGEoIFwidmFsaWRhdG9yXCIgKVxuXHRcdFx0XHQuZmluZCggXCIudmFsaWRhdGUtZXF1YWxUby1ibHVyXCIgKVxuXHRcdFx0XHRcdC5vZmYoIFwiLnZhbGlkYXRlLWVxdWFsVG9cIiApXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCBcInZhbGlkYXRlLWVxdWFsVG8tYmx1clwiICk7XG5cdFx0fVxuXG5cdH0sXG5cblx0Y2xhc3NSdWxlU2V0dGluZ3M6IHtcblx0XHRyZXF1aXJlZDogeyByZXF1aXJlZDogdHJ1ZSB9LFxuXHRcdGVtYWlsOiB7IGVtYWlsOiB0cnVlIH0sXG5cdFx0dXJsOiB7IHVybDogdHJ1ZSB9LFxuXHRcdGRhdGU6IHsgZGF0ZTogdHJ1ZSB9LFxuXHRcdGRhdGVJU086IHsgZGF0ZUlTTzogdHJ1ZSB9LFxuXHRcdG51bWJlcjogeyBudW1iZXI6IHRydWUgfSxcblx0XHRkaWdpdHM6IHsgZGlnaXRzOiB0cnVlIH0sXG5cdFx0Y3JlZGl0Y2FyZDogeyBjcmVkaXRjYXJkOiB0cnVlIH1cblx0fSxcblxuXHRhZGRDbGFzc1J1bGVzOiBmdW5jdGlvbiggY2xhc3NOYW1lLCBydWxlcyApIHtcblx0XHRpZiAoIGNsYXNzTmFtZS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nICkge1xuXHRcdFx0dGhpcy5jbGFzc1J1bGVTZXR0aW5nc1sgY2xhc3NOYW1lIF0gPSBydWxlcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5leHRlbmQoIHRoaXMuY2xhc3NSdWxlU2V0dGluZ3MsIGNsYXNzTmFtZSApO1xuXHRcdH1cblx0fSxcblxuXHRjbGFzc1J1bGVzOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHR2YXIgcnVsZXMgPSB7fSxcblx0XHRcdGNsYXNzZXMgPSAkKCBlbGVtZW50ICkuYXR0ciggXCJjbGFzc1wiICk7XG5cblx0XHRpZiAoIGNsYXNzZXMgKSB7XG5cdFx0XHQkLmVhY2goIGNsYXNzZXMuc3BsaXQoIFwiIFwiICksIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgaW4gJC52YWxpZGF0b3IuY2xhc3NSdWxlU2V0dGluZ3MgKSB7XG5cdFx0XHRcdFx0JC5leHRlbmQoIHJ1bGVzLCAkLnZhbGlkYXRvci5jbGFzc1J1bGVTZXR0aW5nc1sgdGhpcyBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdG5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGU6IGZ1bmN0aW9uKCBydWxlcywgdHlwZSwgbWV0aG9kLCB2YWx1ZSApIHtcblxuXHRcdC8vIENvbnZlcnQgdGhlIHZhbHVlIHRvIGEgbnVtYmVyIGZvciBudW1iZXIgaW5wdXRzLCBhbmQgZm9yIHRleHQgZm9yIGJhY2t3YXJkcyBjb21wYWJpbGl0eVxuXHRcdC8vIGFsbG93cyB0eXBlPVwiZGF0ZVwiIGFuZCBvdGhlcnMgdG8gYmUgY29tcGFyZWQgYXMgc3RyaW5nc1xuXHRcdGlmICggL21pbnxtYXh8c3RlcC8udGVzdCggbWV0aG9kICkgJiYgKCB0eXBlID09PSBudWxsIHx8IC9udW1iZXJ8cmFuZ2V8dGV4dC8udGVzdCggdHlwZSApICkgKSB7XG5cdFx0XHR2YWx1ZSA9IE51bWJlciggdmFsdWUgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydCBPcGVyYSBNaW5pLCB3aGljaCByZXR1cm5zIE5hTiBmb3IgdW5kZWZpbmVkIG1pbmxlbmd0aFxuXHRcdFx0aWYgKCBpc05hTiggdmFsdWUgKSApIHtcblx0XHRcdFx0dmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCB2YWx1ZSB8fCB2YWx1ZSA9PT0gMCApIHtcblx0XHRcdHJ1bGVzWyBtZXRob2QgXSA9IHZhbHVlO1xuXHRcdH0gZWxzZSBpZiAoIHR5cGUgPT09IG1ldGhvZCAmJiB0eXBlICE9PSBcInJhbmdlXCIgKSB7XG5cblx0XHRcdC8vIEV4Y2VwdGlvbjogdGhlIGpxdWVyeSB2YWxpZGF0ZSAncmFuZ2UnIG1ldGhvZFxuXHRcdFx0Ly8gZG9lcyBub3QgdGVzdCBmb3IgdGhlIGh0bWw1ICdyYW5nZScgdHlwZVxuXHRcdFx0cnVsZXNbIG1ldGhvZCBdID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cblx0YXR0cmlidXRlUnVsZXM6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdHZhciBydWxlcyA9IHt9LFxuXHRcdFx0JGVsZW1lbnQgPSAkKCBlbGVtZW50ICksXG5cdFx0XHR0eXBlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICksXG5cdFx0XHRtZXRob2QsIHZhbHVlO1xuXG5cdFx0Zm9yICggbWV0aG9kIGluICQudmFsaWRhdG9yLm1ldGhvZHMgKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQgZm9yIDxpbnB1dCByZXF1aXJlZD4gaW4gYm90aCBodG1sNSBhbmQgb2xkZXIgYnJvd3NlcnNcblx0XHRcdGlmICggbWV0aG9kID09PSBcInJlcXVpcmVkXCIgKSB7XG5cdFx0XHRcdHZhbHVlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoIG1ldGhvZCApO1xuXG5cdFx0XHRcdC8vIFNvbWUgYnJvd3NlcnMgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyBmb3IgdGhlIHJlcXVpcmVkIGF0dHJpYnV0ZVxuXHRcdFx0XHQvLyBhbmQgbm9uLUhUTUw1IGJyb3dzZXJzIG1pZ2h0IGhhdmUgcmVxdWlyZWQ9XCJcIiBtYXJrdXBcblx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gXCJcIiApIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGb3JjZSBub24tSFRNTDUgYnJvd3NlcnMgdG8gcmV0dXJuIGJvb2xcblx0XHRcdFx0dmFsdWUgPSAhIXZhbHVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFsdWUgPSAkZWxlbWVudC5hdHRyKCBtZXRob2QgKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5ub3JtYWxpemVBdHRyaWJ1dGVSdWxlKCBydWxlcywgdHlwZSwgbWV0aG9kLCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdC8vICdtYXhsZW5ndGgnIG1heSBiZSByZXR1cm5lZCBhcyAtMSwgMjE0NzQ4MzY0NyAoIElFICkgYW5kIDUyNDI4OCAoIHNhZmFyaSApIGZvciB0ZXh0IGlucHV0c1xuXHRcdGlmICggcnVsZXMubWF4bGVuZ3RoICYmIC8tMXwyMTQ3NDgzNjQ3fDUyNDI4OC8udGVzdCggcnVsZXMubWF4bGVuZ3RoICkgKSB7XG5cdFx0XHRkZWxldGUgcnVsZXMubWF4bGVuZ3RoO1xuXHRcdH1cblxuXHRcdHJldHVybiBydWxlcztcblx0fSxcblxuXHRkYXRhUnVsZXM6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdHZhciBydWxlcyA9IHt9LFxuXHRcdFx0JGVsZW1lbnQgPSAkKCBlbGVtZW50ICksXG5cdFx0XHR0eXBlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICksXG5cdFx0XHRtZXRob2QsIHZhbHVlO1xuXG5cdFx0Zm9yICggbWV0aG9kIGluICQudmFsaWRhdG9yLm1ldGhvZHMgKSB7XG5cdFx0XHR2YWx1ZSA9ICRlbGVtZW50LmRhdGEoIFwicnVsZVwiICsgbWV0aG9kLmNoYXJBdCggMCApLnRvVXBwZXJDYXNlKCkgKyBtZXRob2Quc3Vic3RyaW5nKCAxICkudG9Mb3dlckNhc2UoKSApO1xuXHRcdFx0dGhpcy5ub3JtYWxpemVBdHRyaWJ1dGVSdWxlKCBydWxlcywgdHlwZSwgbWV0aG9kLCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gcnVsZXM7XG5cdH0sXG5cblx0c3RhdGljUnVsZXM6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdHZhciBydWxlcyA9IHt9LFxuXHRcdFx0dmFsaWRhdG9yID0gJC5kYXRhKCBlbGVtZW50LmZvcm0sIFwidmFsaWRhdG9yXCIgKTtcblxuXHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLnJ1bGVzICkge1xuXHRcdFx0cnVsZXMgPSAkLnZhbGlkYXRvci5ub3JtYWxpemVSdWxlKCB2YWxpZGF0b3Iuc2V0dGluZ3MucnVsZXNbIGVsZW1lbnQubmFtZSBdICkgfHwge307XG5cdFx0fVxuXHRcdHJldHVybiBydWxlcztcblx0fSxcblxuXHRub3JtYWxpemVSdWxlczogZnVuY3Rpb24oIHJ1bGVzLCBlbGVtZW50ICkge1xuXG5cdFx0Ly8gSGFuZGxlIGRlcGVuZGVuY3kgY2hlY2tcblx0XHQkLmVhY2goIHJ1bGVzLCBmdW5jdGlvbiggcHJvcCwgdmFsICkge1xuXG5cdFx0XHQvLyBJZ25vcmUgcnVsZSB3aGVuIHBhcmFtIGlzIGV4cGxpY2l0bHkgZmFsc2UsIGVnLiByZXF1aXJlZDpmYWxzZVxuXHRcdFx0aWYgKCB2YWwgPT09IGZhbHNlICkge1xuXHRcdFx0XHRkZWxldGUgcnVsZXNbIHByb3AgXTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB2YWwucGFyYW0gfHwgdmFsLmRlcGVuZHMgKSB7XG5cdFx0XHRcdHZhciBrZWVwUnVsZSA9IHRydWU7XG5cdFx0XHRcdHN3aXRjaCAoIHR5cGVvZiB2YWwuZGVwZW5kcyApIHtcblx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdGtlZXBSdWxlID0gISEkKCB2YWwuZGVwZW5kcywgZWxlbWVudC5mb3JtICkubGVuZ3RoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZnVuY3Rpb25cIjpcblx0XHRcdFx0XHRrZWVwUnVsZSA9IHZhbC5kZXBlbmRzLmNhbGwoIGVsZW1lbnQsIGVsZW1lbnQgKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGtlZXBSdWxlICkge1xuXHRcdFx0XHRcdHJ1bGVzWyBwcm9wIF0gPSB2YWwucGFyYW0gIT09IHVuZGVmaW5lZCA/IHZhbC5wYXJhbSA6IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JC5kYXRhKCBlbGVtZW50LmZvcm0sIFwidmFsaWRhdG9yXCIgKS5yZXNldEVsZW1lbnRzKCAkKCBlbGVtZW50ICkgKTtcblx0XHRcdFx0XHRkZWxldGUgcnVsZXNbIHByb3AgXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdC8vIEV2YWx1YXRlIHBhcmFtZXRlcnNcblx0XHQkLmVhY2goIHJ1bGVzLCBmdW5jdGlvbiggcnVsZSwgcGFyYW1ldGVyICkge1xuXHRcdFx0cnVsZXNbIHJ1bGUgXSA9ICQuaXNGdW5jdGlvbiggcGFyYW1ldGVyICkgJiYgcnVsZSAhPT0gXCJub3JtYWxpemVyXCIgPyBwYXJhbWV0ZXIoIGVsZW1lbnQgKSA6IHBhcmFtZXRlcjtcblx0XHR9ICk7XG5cblx0XHQvLyBDbGVhbiBudW1iZXIgcGFyYW1ldGVyc1xuXHRcdCQuZWFjaCggWyBcIm1pbmxlbmd0aFwiLCBcIm1heGxlbmd0aFwiIF0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBydWxlc1sgdGhpcyBdICkge1xuXHRcdFx0XHRydWxlc1sgdGhpcyBdID0gTnVtYmVyKCBydWxlc1sgdGhpcyBdICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdCQuZWFjaCggWyBcInJhbmdlbGVuZ3RoXCIsIFwicmFuZ2VcIiBdLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBwYXJ0cztcblx0XHRcdGlmICggcnVsZXNbIHRoaXMgXSApIHtcblx0XHRcdFx0aWYgKCAkLmlzQXJyYXkoIHJ1bGVzWyB0aGlzIF0gKSApIHtcblx0XHRcdFx0XHRydWxlc1sgdGhpcyBdID0gWyBOdW1iZXIoIHJ1bGVzWyB0aGlzIF1bIDAgXSApLCBOdW1iZXIoIHJ1bGVzWyB0aGlzIF1bIDEgXSApIF07XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBydWxlc1sgdGhpcyBdID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdHBhcnRzID0gcnVsZXNbIHRoaXMgXS5yZXBsYWNlKCAvW1xcW1xcXV0vZywgXCJcIiApLnNwbGl0KCAvW1xccyxdKy8gKTtcblx0XHRcdFx0XHRydWxlc1sgdGhpcyBdID0gWyBOdW1iZXIoIHBhcnRzWyAwIF0gKSwgTnVtYmVyKCBwYXJ0c1sgMSBdICkgXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdGlmICggJC52YWxpZGF0b3IuYXV0b0NyZWF0ZVJhbmdlcyApIHtcblxuXHRcdFx0Ly8gQXV0by1jcmVhdGUgcmFuZ2VzXG5cdFx0XHRpZiAoIHJ1bGVzLm1pbiAhPSBudWxsICYmIHJ1bGVzLm1heCAhPSBudWxsICkge1xuXHRcdFx0XHRydWxlcy5yYW5nZSA9IFsgcnVsZXMubWluLCBydWxlcy5tYXggXTtcblx0XHRcdFx0ZGVsZXRlIHJ1bGVzLm1pbjtcblx0XHRcdFx0ZGVsZXRlIHJ1bGVzLm1heDtcblx0XHRcdH1cblx0XHRcdGlmICggcnVsZXMubWlubGVuZ3RoICE9IG51bGwgJiYgcnVsZXMubWF4bGVuZ3RoICE9IG51bGwgKSB7XG5cdFx0XHRcdHJ1bGVzLnJhbmdlbGVuZ3RoID0gWyBydWxlcy5taW5sZW5ndGgsIHJ1bGVzLm1heGxlbmd0aCBdO1xuXHRcdFx0XHRkZWxldGUgcnVsZXMubWlubGVuZ3RoO1xuXHRcdFx0XHRkZWxldGUgcnVsZXMubWF4bGVuZ3RoO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBydWxlcztcblx0fSxcblxuXHQvLyBDb252ZXJ0cyBhIHNpbXBsZSBzdHJpbmcgdG8gYSB7c3RyaW5nOiB0cnVlfSBydWxlLCBlLmcuLCBcInJlcXVpcmVkXCIgdG8ge3JlcXVpcmVkOnRydWV9XG5cdG5vcm1hbGl6ZVJ1bGU6IGZ1bmN0aW9uKCBkYXRhICkge1xuXHRcdGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHR2YXIgdHJhbnNmb3JtZWQgPSB7fTtcblx0XHRcdCQuZWFjaCggZGF0YS5zcGxpdCggL1xccy8gKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRyYW5zZm9ybWVkWyB0aGlzIF0gPSB0cnVlO1xuXHRcdFx0fSApO1xuXHRcdFx0ZGF0YSA9IHRyYW5zZm9ybWVkO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fSxcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvalF1ZXJ5LnZhbGlkYXRvci5hZGRNZXRob2QvXG5cdGFkZE1ldGhvZDogZnVuY3Rpb24oIG5hbWUsIG1ldGhvZCwgbWVzc2FnZSApIHtcblx0XHQkLnZhbGlkYXRvci5tZXRob2RzWyBuYW1lIF0gPSBtZXRob2Q7XG5cdFx0JC52YWxpZGF0b3IubWVzc2FnZXNbIG5hbWUgXSA9IG1lc3NhZ2UgIT09IHVuZGVmaW5lZCA/IG1lc3NhZ2UgOiAkLnZhbGlkYXRvci5tZXNzYWdlc1sgbmFtZSBdO1xuXHRcdGlmICggbWV0aG9kLmxlbmd0aCA8IDMgKSB7XG5cdFx0XHQkLnZhbGlkYXRvci5hZGRDbGFzc1J1bGVzKCBuYW1lLCAkLnZhbGlkYXRvci5ub3JtYWxpemVSdWxlKCBuYW1lICkgKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2pRdWVyeS52YWxpZGF0b3IubWV0aG9kcy9cblx0bWV0aG9kczoge1xuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3JlcXVpcmVkLW1ldGhvZC9cblx0XHRyZXF1aXJlZDogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgZGVwZW5kZW5jeSBpcyBtZXRcblx0XHRcdGlmICggIXRoaXMuZGVwZW5kKCBwYXJhbSwgZWxlbWVudCApICkge1xuXHRcdFx0XHRyZXR1cm4gXCJkZXBlbmRlbmN5LW1pc21hdGNoXCI7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzZWxlY3RcIiApIHtcblxuXHRcdFx0XHQvLyBDb3VsZCBiZSBhbiBhcnJheSBmb3Igc2VsZWN0LW11bHRpcGxlIG9yIGEgc3RyaW5nLCBib3RoIGFyZSBmaW5lIHRoaXMgd2F5XG5cdFx0XHRcdHZhciB2YWwgPSAkKCBlbGVtZW50ICkudmFsKCk7XG5cdFx0XHRcdHJldHVybiB2YWwgJiYgdmFsLmxlbmd0aCA+IDA7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMuY2hlY2thYmxlKCBlbGVtZW50ICkgKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldExlbmd0aCggdmFsdWUsIGVsZW1lbnQgKSA+IDA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2VtYWlsLW1ldGhvZC9cblx0XHRlbWFpbDogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXG5cdFx0XHQvLyBGcm9tIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjdmFsaWQtZS1tYWlsLWFkZHJlc3Ncblx0XHRcdC8vIFJldHJpZXZlZCAyMDE0LTAxLTE0XG5cdFx0XHQvLyBJZiB5b3UgaGF2ZSBhIHByb2JsZW0gd2l0aCB0aGlzIGltcGxlbWVudGF0aW9uLCByZXBvcnQgYSBidWcgYWdhaW5zdCB0aGUgYWJvdmUgc3BlY1xuXHRcdFx0Ly8gT3IgdXNlIGN1c3RvbSBtZXRob2RzIHRvIGltcGxlbWVudCB5b3VyIG93biBlbWFpbCB2YWxpZGF0aW9uXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eW2EtekEtWjAtOS4hIyQlJicqK1xcLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKiQvLnRlc3QoIHZhbHVlICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy91cmwtbWV0aG9kL1xuXHRcdHVybDogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXG5cdFx0XHQvLyBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMyBEaWVnbyBQZXJpbmksIE1JVCBsaWNlbnNlZFxuXHRcdFx0Ly8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZHBlcmluaS83MjkyOTRcblx0XHRcdC8vIHNlZSBhbHNvIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9kZW1vL3VybC1yZWdleFxuXHRcdFx0Ly8gbW9kaWZpZWQgdG8gYWxsb3cgcHJvdG9jb2wtcmVsYXRpdmUgVVJMc1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAvXig/Oig/Oig/Omh0dHBzP3xmdHApOik/XFwvXFwvKSg/OlxcUysoPzo6XFxTKik/QCk/KD86KD8hKD86MTB8MTI3KSg/OlxcLlxcZHsxLDN9KXszfSkoPyEoPzoxNjlcXC4yNTR8MTkyXFwuMTY4KSg/OlxcLlxcZHsxLDN9KXsyfSkoPyExNzJcXC4oPzoxWzYtOV18MlxcZHwzWzAtMV0pKD86XFwuXFxkezEsM30pezJ9KSg/OlsxLTldXFxkP3wxXFxkXFxkfDJbMDFdXFxkfDIyWzAtM10pKD86XFwuKD86MT9cXGR7MSwyfXwyWzAtNF1cXGR8MjVbMC01XSkpezJ9KD86XFwuKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNF0pKXwoPzooPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKD86XFwuKD86W2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0tKikqW2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0rKSooPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmXXsyLH0pKS4/KSg/OjpcXGR7Miw1fSk/KD86Wy8/I11cXFMqKT8kL2kudGVzdCggdmFsdWUgKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2RhdGUtbWV0aG9kL1xuXHRcdGRhdGU6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgIS9JbnZhbGlkfE5hTi8udGVzdCggbmV3IERhdGUoIHZhbHVlICkudG9TdHJpbmcoKSApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZGF0ZUlTTy1tZXRob2QvXG5cdFx0ZGF0ZUlTTzogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAvXlxcZHs0fVtcXC9cXC1dKDA/WzEtOV18MVswMTJdKVtcXC9cXC1dKDA/WzEtOV18WzEyXVswLTldfDNbMDFdKSQvLnRlc3QoIHZhbHVlICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9udW1iZXItbWV0aG9kL1xuXHRcdG51bWJlcjogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAvXig/Oi0/XFxkK3wtP1xcZHsxLDN9KD86LFxcZHszfSkrKT8oPzpcXC5cXGQrKT8kLy50ZXN0KCB2YWx1ZSApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZGlnaXRzLW1ldGhvZC9cblx0XHRkaWdpdHM6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgL15cXGQrJC8udGVzdCggdmFsdWUgKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21pbmxlbmd0aC1tZXRob2QvXG5cdFx0bWlubGVuZ3RoOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0dmFyIGxlbmd0aCA9ICQuaXNBcnJheSggdmFsdWUgKSA/IHZhbHVlLmxlbmd0aCA6IHRoaXMuZ2V0TGVuZ3RoKCB2YWx1ZSwgZWxlbWVudCApO1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCBsZW5ndGggPj0gcGFyYW07XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9tYXhsZW5ndGgtbWV0aG9kL1xuXHRcdG1heGxlbmd0aDogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblx0XHRcdHZhciBsZW5ndGggPSAkLmlzQXJyYXkoIHZhbHVlICkgPyB2YWx1ZS5sZW5ndGggOiB0aGlzLmdldExlbmd0aCggdmFsdWUsIGVsZW1lbnQgKTtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgbGVuZ3RoIDw9IHBhcmFtO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvcmFuZ2VsZW5ndGgtbWV0aG9kL1xuXHRcdHJhbmdlbGVuZ3RoOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0dmFyIGxlbmd0aCA9ICQuaXNBcnJheSggdmFsdWUgKSA/IHZhbHVlLmxlbmd0aCA6IHRoaXMuZ2V0TGVuZ3RoKCB2YWx1ZSwgZWxlbWVudCApO1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAoIGxlbmd0aCA+PSBwYXJhbVsgMCBdICYmIGxlbmd0aCA8PSBwYXJhbVsgMSBdICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9taW4tbWV0aG9kL1xuXHRcdG1pbjogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgdmFsdWUgPj0gcGFyYW07XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9tYXgtbWV0aG9kL1xuXHRcdG1heDogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgdmFsdWUgPD0gcGFyYW07XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9yYW5nZS1tZXRob2QvXG5cdFx0cmFuZ2U6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8ICggdmFsdWUgPj0gcGFyYW1bIDAgXSAmJiB2YWx1ZSA8PSBwYXJhbVsgMSBdICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9zdGVwLW1ldGhvZC9cblx0XHRzdGVwOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0dmFyIHR5cGUgPSAkKCBlbGVtZW50ICkuYXR0ciggXCJ0eXBlXCIgKSxcblx0XHRcdFx0ZXJyb3JNZXNzYWdlID0gXCJTdGVwIGF0dHJpYnV0ZSBvbiBpbnB1dCB0eXBlIFwiICsgdHlwZSArIFwiIGlzIG5vdCBzdXBwb3J0ZWQuXCIsXG5cdFx0XHRcdHN1cHBvcnRlZFR5cGVzID0gWyBcInRleHRcIiwgXCJudW1iZXJcIiwgXCJyYW5nZVwiIF0sXG5cdFx0XHRcdHJlID0gbmV3IFJlZ0V4cCggXCJcXFxcYlwiICsgdHlwZSArIFwiXFxcXGJcIiApLFxuXHRcdFx0XHRub3RTdXBwb3J0ZWQgPSB0eXBlICYmICFyZS50ZXN0KCBzdXBwb3J0ZWRUeXBlcy5qb2luKCkgKTtcblxuXHRcdFx0Ly8gV29ya3Mgb25seSBmb3IgdGV4dCwgbnVtYmVyIGFuZCByYW5nZSBpbnB1dCB0eXBlc1xuXHRcdFx0Ly8gVE9ETyBmaW5kIGEgd2F5IHRvIHN1cHBvcnQgaW5wdXQgdHlwZXMgZGF0ZSwgZGF0ZXRpbWUsIGRhdGV0aW1lLWxvY2FsLCBtb250aCwgdGltZSBhbmQgd2Vla1xuXHRcdFx0aWYgKCBub3RTdXBwb3J0ZWQgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggZXJyb3JNZXNzYWdlICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8ICggdmFsdWUgJSBwYXJhbSA9PT0gMCApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZXF1YWxUby1tZXRob2QvXG5cdFx0ZXF1YWxUbzogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblxuXHRcdFx0Ly8gQmluZCB0byB0aGUgYmx1ciBldmVudCBvZiB0aGUgdGFyZ2V0IGluIG9yZGVyIHRvIHJldmFsaWRhdGUgd2hlbmV2ZXIgdGhlIHRhcmdldCBmaWVsZCBpcyB1cGRhdGVkXG5cdFx0XHR2YXIgdGFyZ2V0ID0gJCggcGFyYW0gKTtcblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5vbmZvY3Vzb3V0ICYmIHRhcmdldC5ub3QoIFwiLnZhbGlkYXRlLWVxdWFsVG8tYmx1clwiICkubGVuZ3RoICkge1xuXHRcdFx0XHR0YXJnZXQuYWRkQ2xhc3MoIFwidmFsaWRhdGUtZXF1YWxUby1ibHVyXCIgKS5vbiggXCJibHVyLnZhbGlkYXRlLWVxdWFsVG9cIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JCggZWxlbWVudCApLnZhbGlkKCk7XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdGFyZ2V0LnZhbCgpO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvcmVtb3RlLW1ldGhvZC9cblx0XHRyZW1vdGU6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0sIG1ldGhvZCApIHtcblx0XHRcdGlmICggdGhpcy5vcHRpb25hbCggZWxlbWVudCApICkge1xuXHRcdFx0XHRyZXR1cm4gXCJkZXBlbmRlbmN5LW1pc21hdGNoXCI7XG5cdFx0XHR9XG5cblx0XHRcdG1ldGhvZCA9IHR5cGVvZiBtZXRob2QgPT09IFwic3RyaW5nXCIgJiYgbWV0aG9kIHx8IFwicmVtb3RlXCI7XG5cblx0XHRcdHZhciBwcmV2aW91cyA9IHRoaXMucHJldmlvdXNWYWx1ZSggZWxlbWVudCwgbWV0aG9kICksXG5cdFx0XHRcdHZhbGlkYXRvciwgZGF0YSwgb3B0aW9uRGF0YVN0cmluZztcblxuXHRcdFx0aWYgKCAhdGhpcy5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF0gKSB7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MubWVzc2FnZXNbIGVsZW1lbnQubmFtZSBdID0ge307XG5cdFx0XHR9XG5cdFx0XHRwcmV2aW91cy5vcmlnaW5hbE1lc3NhZ2UgPSBwcmV2aW91cy5vcmlnaW5hbE1lc3NhZ2UgfHwgdGhpcy5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF1bIG1ldGhvZCBdO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF1bIG1ldGhvZCBdID0gcHJldmlvdXMubWVzc2FnZTtcblxuXHRcdFx0cGFyYW0gPSB0eXBlb2YgcGFyYW0gPT09IFwic3RyaW5nXCIgJiYgeyB1cmw6IHBhcmFtIH0gfHwgcGFyYW07XG5cdFx0XHRvcHRpb25EYXRhU3RyaW5nID0gJC5wYXJhbSggJC5leHRlbmQoIHsgZGF0YTogdmFsdWUgfSwgcGFyYW0uZGF0YSApICk7XG5cdFx0XHRpZiAoIHByZXZpb3VzLm9sZCA9PT0gb3B0aW9uRGF0YVN0cmluZyApIHtcblx0XHRcdFx0cmV0dXJuIHByZXZpb3VzLnZhbGlkO1xuXHRcdFx0fVxuXG5cdFx0XHRwcmV2aW91cy5vbGQgPSBvcHRpb25EYXRhU3RyaW5nO1xuXHRcdFx0dmFsaWRhdG9yID0gdGhpcztcblx0XHRcdHRoaXMuc3RhcnRSZXF1ZXN0KCBlbGVtZW50ICk7XG5cdFx0XHRkYXRhID0ge307XG5cdFx0XHRkYXRhWyBlbGVtZW50Lm5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0JC5hamF4KCAkLmV4dGVuZCggdHJ1ZSwge1xuXHRcdFx0XHRtb2RlOiBcImFib3J0XCIsXG5cdFx0XHRcdHBvcnQ6IFwidmFsaWRhdGVcIiArIGVsZW1lbnQubmFtZSxcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRjb250ZXh0OiB2YWxpZGF0b3IuY3VycmVudEZvcm0sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCByZXNwb25zZSApIHtcblx0XHRcdFx0XHR2YXIgdmFsaWQgPSByZXNwb25zZSA9PT0gdHJ1ZSB8fCByZXNwb25zZSA9PT0gXCJ0cnVlXCIsXG5cdFx0XHRcdFx0XHRlcnJvcnMsIG1lc3NhZ2UsIHN1Ym1pdHRlZDtcblxuXHRcdFx0XHRcdHZhbGlkYXRvci5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF1bIG1ldGhvZCBdID0gcHJldmlvdXMub3JpZ2luYWxNZXNzYWdlO1xuXHRcdFx0XHRcdGlmICggdmFsaWQgKSB7XG5cdFx0XHRcdFx0XHRzdWJtaXR0ZWQgPSB2YWxpZGF0b3IuZm9ybVN1Ym1pdHRlZDtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5yZXNldEludGVybmFscygpO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnRvSGlkZSA9IHZhbGlkYXRvci5lcnJvcnNGb3IoIGVsZW1lbnQgKTtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5mb3JtU3VibWl0dGVkID0gc3VibWl0dGVkO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnN1Y2Nlc3NMaXN0LnB1c2goIGVsZW1lbnQgKTtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5pbnZhbGlkWyBlbGVtZW50Lm5hbWUgXSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnNob3dFcnJvcnMoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXJyb3JzID0ge307XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gcmVzcG9uc2UgfHwgdmFsaWRhdG9yLmRlZmF1bHRNZXNzYWdlKCBlbGVtZW50LCB7IG1ldGhvZDogbWV0aG9kLCBwYXJhbWV0ZXJzOiB2YWx1ZSB9ICk7XG5cdFx0XHRcdFx0XHRlcnJvcnNbIGVsZW1lbnQubmFtZSBdID0gcHJldmlvdXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3IuaW52YWxpZFsgZWxlbWVudC5uYW1lIF0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnNob3dFcnJvcnMoIGVycm9ycyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwcmV2aW91cy52YWxpZCA9IHZhbGlkO1xuXHRcdFx0XHRcdHZhbGlkYXRvci5zdG9wUmVxdWVzdCggZWxlbWVudCwgdmFsaWQgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgcGFyYW0gKSApO1xuXHRcdFx0cmV0dXJuIFwicGVuZGluZ1wiO1xuXHRcdH1cblx0fVxuXG59ICk7XG5cclxuLy8gQWpheCBtb2RlOiBhYm9ydFxuLy8gdXNhZ2U6ICQuYWpheCh7IG1vZGU6IFwiYWJvcnRcIlssIHBvcnQ6IFwidW5pcXVlcG9ydFwiXX0pO1xuLy8gaWYgbW9kZTpcImFib3J0XCIgaXMgdXNlZCwgdGhlIHByZXZpb3VzIHJlcXVlc3Qgb24gdGhhdCBwb3J0IChwb3J0IGNhbiBiZSB1bmRlZmluZWQpIGlzIGFib3J0ZWQgdmlhIFhNTEh0dHBSZXF1ZXN0LmFib3J0KClcblxudmFyIHBlbmRpbmdSZXF1ZXN0cyA9IHt9LFxuXHRhamF4O1xuXG4vLyBVc2UgYSBwcmVmaWx0ZXIgaWYgYXZhaWxhYmxlICgxLjUrKVxuaWYgKCAkLmFqYXhQcmVmaWx0ZXIgKSB7XG5cdCQuYWpheFByZWZpbHRlciggZnVuY3Rpb24oIHNldHRpbmdzLCBfLCB4aHIgKSB7XG5cdFx0dmFyIHBvcnQgPSBzZXR0aW5ncy5wb3J0O1xuXHRcdGlmICggc2V0dGluZ3MubW9kZSA9PT0gXCJhYm9ydFwiICkge1xuXHRcdFx0aWYgKCBwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXSApIHtcblx0XHRcdFx0cGVuZGluZ1JlcXVlc3RzWyBwb3J0IF0uYWJvcnQoKTtcblx0XHRcdH1cblx0XHRcdHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdID0geGhyO1xuXHRcdH1cblx0fSApO1xufSBlbHNlIHtcblxuXHQvLyBQcm94eSBhamF4XG5cdGFqYXggPSAkLmFqYXg7XG5cdCQuYWpheCA9IGZ1bmN0aW9uKCBzZXR0aW5ncyApIHtcblx0XHR2YXIgbW9kZSA9ICggXCJtb2RlXCIgaW4gc2V0dGluZ3MgPyBzZXR0aW5ncyA6ICQuYWpheFNldHRpbmdzICkubW9kZSxcblx0XHRcdHBvcnQgPSAoIFwicG9ydFwiIGluIHNldHRpbmdzID8gc2V0dGluZ3MgOiAkLmFqYXhTZXR0aW5ncyApLnBvcnQ7XG5cdFx0aWYgKCBtb2RlID09PSBcImFib3J0XCIgKSB7XG5cdFx0XHRpZiAoIHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdICkge1xuXHRcdFx0XHRwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXS5hYm9ydCgpO1xuXHRcdFx0fVxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzWyBwb3J0IF0gPSBhamF4LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdHJldHVybiBwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXTtcblx0XHR9XG5cdFx0cmV0dXJuIGFqYXguYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHR9O1xufVxuXHJcbn0pKTtcclxuIl19
