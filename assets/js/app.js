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

/*====== jQuery UI accordion ======*/

(function($) {
    $( ".ama__accordion" ).accordion({
        heightStyle: "content",
        collapsible: true
    });
})(jQuery);

(function($) {
  $('.ama__subcategory-featured-content-as-carousel .ama__category-page-article-stub__container').slick({
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: false,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
})(jQuery);

$('.ama__display-switch').click(function(){
  $('.ama__display-switch--active').toggleClass('ama__display-switch--active');
  $(this).toggleClass('ama__display-switch--active');
});

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

$('.ama__subcategory-exploration__show-more').click(function() {
  $('.ama__subcategory-exploration__list').toggleClass('ama__subcategory-exploration__list--expanded');
  $(this).toggleClass('ama__subcategory-exploration__show-more--expanded');
});

/**
 * @file
 * Subcategory
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.subcategories = {
    attach: function(context, settings) {

      function checkSize(){
        var subcategoryWrapper = $('.ama__subcategory-exploration-with-images').outerWidth();
        var subcategoryTitle = $('.ama__subcategory-exploration-with-images__title').outerWidth();
        subcategory = $('.ama__subcategory-exploration__subcategory');
        subcategory.hide();

        if (subcategoryWrapper > 0 && subcategoryWrapper < 290 && subcategoryTitle > 200 ) {
          subcategory.slice(0, 2).css('display', 'block');
        } else if (subcategoryWrapper > 290 && subcategoryWrapper < 600 && subcategoryTitle > 200 ) {
          subcategory.slice(0, 3).css('display', 'block');
        } else if ((subcategoryWrapper > 300 && subcategoryWrapper < 700) && subcategoryTitle < 200) {
          subcategory.slice(0, 2).css('display', 'block');
        } else if ((subcategoryWrapper > 700 && subcategoryWrapper < 1000) && subcategoryTitle < 200) {
          subcategory.slice(0, 3).css('display', 'block');
        } else if ((subcategoryWrapper > 1000 && subcategoryWrapper < 1200) && subcategoryTitle < 200) {
          subcategory.slice(0, 4).css('display', 'block');
        } else {
          subcategory.slice(0, 5).css('display', 'block');
        }
      }

      function viewMore() {
        $('.ama__subcategory-exploration-with-images__view-less').hide();
        $('.ama__subcategory-exploration-with-images__view-all').show();

        $('.viewAll').click(function() {
          subcategory.fadeIn();
          $('.ama__subcategory-exploration-with-images__view-all').hide();
          $('.ama__subcategory-exploration-with-images__view-less').show();
        });

        $('.viewLess').click(function() {
          subcategory.hide();
          checkSize();
          $('.ama__subcategory-exploration-with-images__view-less').hide();
          $('.ama__subcategory-exploration-with-images__view-all').show();
        });
      }

      // run test on initial page load
      checkSize();
      viewMore();

      // run test on resize of the window
      $( window ).resize(function() {
        checkSize();
        viewMore();
      });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRydXBhbC1hdHRhY2gtYmVoYXZpb3JzLmpzIiwianF1ZXJ5LmlucHV0bWFzay5idW5kbGUuanMiLCJqcXVlcnkudmFsaWRhdGUuanMiLCJmaXR2aWRzLmpzIiwianF1ZXJ5LnVpLmNoZWNrTGlzdC5qcyIsImpxdWVyeS11aS5hY2NvcmRpb24ubXVsdGlwbGUuanMiLCJhY2NvcmRpb24uanMiLCJjYXRlZ29yeS1jYXJvdXNlbC5qcyIsImRpc3BsYXktc3dpdGNoLmpzIiwiZm9ybS1pdGVtcy5qcyIsImZvcm0tdmFsaWRhdGUuanMiLCJnYXRlLmpzIiwiaW5pdC5qcyIsIm5hdi5qcyIsInN1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLmpzIiwic3ViY2F0ZWdvcnkuanMiLCJ0YWJsZXMuanMiLCJ0YWJzLmpzIiwid2F5ZmluZGVyLmpzIiwidmVuZG9yL2pxdWVyeS5jb29raWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3ekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzUvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgaGVscGVyIHNjcmlwdCB0aGF0IG1pbWljcyB0aGUgRHJ1cGFsIEphdmFzY3JpcHQgQVBJLlxuICpcbiAqIFRoaXMgYWxsb3dzIGZvciBzY3JpcHRzIHRvIGJlIHdyaXR0ZW4gbGlrZSB0aGV5IHdvdWxkIGZvciBEcnVwYWwgKGJ5XG4gKiBhdHRhY2hpbmcgYmVoYXZpb3JzKSBpbiB0aGUgc3R5bGVndWlkZS4gQXMgYSByZXN1bHQsIHNjcmlwdHMgZnVuY3Rpb25cbiAqIHByb3Blcmx5IGZvciB0aGUgc3R5bGVndWlkZSBhbmQgbWF5IHNpbXBseSBiZSBzeW1saW5rZWQgdG8gdGhlIC90aGVtZXNcbiAqIGRpcmVjdG9yeSBpbiBEcnVwYWwuXG4gKlxuICogZnJvbSAgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlybmV0L2J1dGxlci9ibG9iLzdjMGNlYTVmMDRiZjlhZDM3MmZiZGZmZTY0Y2NlYmM0NzdiMTNkYzQvU1RZTEVHVUlERV9URU1QTEFURS9zb3VyY2UvY29kZS9saWJyYXJpZXMvZHJ1cGFsLWF0dGFjaC1iZWhhdmlvcnMuanNcbiAqL1xuXG53aW5kb3cuRHJ1cGFsID0ge2JlaGF2aW9yczoge30sIGxvY2FsZToge319O1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgRHJ1cGFsLmF0dGFjaEJlaGF2aW9ycyA9IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XG4gICAgdmFyIGJlaGF2aW9ycyA9IERydXBhbC5iZWhhdmlvcnM7XG4gICAgLy8gRXhlY3V0ZSBhbGwgb2YgdGhlbS5cbiAgICBmb3IgKHZhciBpIGluIGJlaGF2aW9ycykge1xuICAgICAgaWYgKGJlaGF2aW9ycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YgYmVoYXZpb3JzW2ldLmF0dGFjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBEb24ndCBzdG9wIHRoZSBleGVjdXRpb24gb2YgYmVoYXZpb3JzIGluIGNhc2Ugb2YgYW4gZXJyb3IuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYmVoYXZpb3JzW2ldLmF0dGFjaChjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBBdHRhY2ggYWxsIGJlaGF2aW9ycy5cbiAgJCgnZG9jdW1lbnQnKS5yZWFkeShmdW5jdGlvbiAoKSB7IERydXBhbC5hdHRhY2hCZWhhdmlvcnMoZG9jdW1lbnQsIHt9KTsgfSk7XG59KShqUXVlcnkpO1xuIiwiLyohXG4qIGpxdWVyeS5pbnB1dG1hc2suYnVuZGxlLmpzXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4qIENvcHlyaWdodCAoYykgMjAxMCAtIDIwMTggUm9iaW4gSGVyYm90c1xuKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgKGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwKVxuKiBWZXJzaW9uOiA0LjAuMC1iZXRhLjUxXG4qL1xuXG4hZnVuY3Rpb24obW9kdWxlcykge1xuICAgIHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4gICAgZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuICAgICAgICBpZiAoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuICAgICAgICB2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gICAgICAgICAgICBpOiBtb2R1bGVJZCxcbiAgICAgICAgICAgIGw6ICExLFxuICAgICAgICAgICAgZXhwb3J0czoge31cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pLCBcbiAgICAgICAgbW9kdWxlLmwgPSAhMCwgbW9kdWxlLmV4cG9ydHM7XG4gICAgfVxuICAgIF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXMsIF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXMsIF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuICAgICAgICBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkgfHwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITEsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgICAgICAgIGdldDogZ2V0dGVyXG4gICAgICAgIH0pO1xuICAgIH0sIF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuICAgICAgICB2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID8gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlLmRlZmF1bHQ7XG4gICAgICAgIH0gOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCBcImFcIiwgZ2V0dGVyKSwgZ2V0dGVyO1xuICAgIH0sIF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTtcbiAgICB9LCBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xufShbIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fLCBmYWN0b3J5O1xuICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgICBmYWN0b3J5ID0gZnVuY3Rpb24oJCkge1xuICAgICAgICByZXR1cm4gJDtcbiAgICB9LCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fID0gWyBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpIF0sIHZvaWQgMCA9PT0gKF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiAoX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fID0gZmFjdG9yeSkgPyBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18uYXBwbHkoZXhwb3J0cywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXykgOiBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18pIHx8IChtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fKTtcbn0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fLCBmYWN0b3J5LCBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH0gOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICAgIGZhY3RvcnkgPSBmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCwgbW9iaWxlID0gaXNJbnB1dEV2ZW50U3VwcG9ydGVkKFwidG91Y2hzdGFydFwiKSwgaWVtb2JpbGUgPSAvaWVtb2JpbGUvaS50ZXN0KHVhKSwgaXBob25lID0gL2lwaG9uZS9pLnRlc3QodWEpICYmICFpZW1vYmlsZTtcbiAgICAgICAgZnVuY3Rpb24gSW5wdXRtYXNrKGFsaWFzLCBvcHRpb25zLCBpbnRlcm5hbCkge1xuICAgICAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIElucHV0bWFzaykpIHJldHVybiBuZXcgSW5wdXRtYXNrKGFsaWFzLCBvcHRpb25zLCBpbnRlcm5hbCk7XG4gICAgICAgICAgICB0aGlzLmVsID0gdW5kZWZpbmVkLCB0aGlzLmV2ZW50cyA9IHt9LCB0aGlzLm1hc2tzZXQgPSB1bmRlZmluZWQsIHRoaXMucmVmcmVzaFZhbHVlID0gITEsIFxuICAgICAgICAgICAgITAgIT09IGludGVybmFsICYmICgkLmlzUGxhaW5PYmplY3QoYWxpYXMpID8gb3B0aW9ucyA9IGFsaWFzIDogKG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9LCBcbiAgICAgICAgICAgIGFsaWFzICYmIChvcHRpb25zLmFsaWFzID0gYWxpYXMpKSwgdGhpcy5vcHRzID0gJC5leHRlbmQoITAsIHt9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zKSwgXG4gICAgICAgICAgICB0aGlzLm5vTWFza3NDYWNoZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5kZWZpbml0aW9ucyAhPT0gdW5kZWZpbmVkLCB0aGlzLnVzZXJPcHRpb25zID0gb3B0aW9ucyB8fCB7fSwgXG4gICAgICAgICAgICB0aGlzLmlzUlRMID0gdGhpcy5vcHRzLm51bWVyaWNJbnB1dCwgcmVzb2x2ZUFsaWFzKHRoaXMub3B0cy5hbGlhcywgb3B0aW9ucywgdGhpcy5vcHRzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZUFsaWFzKGFsaWFzU3RyLCBvcHRpb25zLCBvcHRzKSB7XG4gICAgICAgICAgICB2YXIgYWxpYXNEZWZpbml0aW9uID0gSW5wdXRtYXNrLnByb3RvdHlwZS5hbGlhc2VzW2FsaWFzU3RyXTtcbiAgICAgICAgICAgIHJldHVybiBhbGlhc0RlZmluaXRpb24gPyAoYWxpYXNEZWZpbml0aW9uLmFsaWFzICYmIHJlc29sdmVBbGlhcyhhbGlhc0RlZmluaXRpb24uYWxpYXMsIHVuZGVmaW5lZCwgb3B0cyksIFxuICAgICAgICAgICAgJC5leHRlbmQoITAsIG9wdHMsIGFsaWFzRGVmaW5pdGlvbiksICQuZXh0ZW5kKCEwLCBvcHRzLCBvcHRpb25zKSwgITApIDogKG51bGwgPT09IG9wdHMubWFzayAmJiAob3B0cy5tYXNrID0gYWxpYXNTdHIpLCBcbiAgICAgICAgICAgICExKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZU1hc2tTZXQob3B0cywgbm9jYWNoZSkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVNYXNrKG1hc2ssIG1ldGFkYXRhLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ2V4TWFzayA9ICExO1xuICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBtYXNrICYmIFwiXCIgIT09IG1hc2sgfHwgKChyZWdleE1hc2sgPSBudWxsICE9PSBvcHRzLnJlZ2V4KSA/IG1hc2sgPSAobWFzayA9IG9wdHMucmVnZXgpLnJlcGxhY2UoL14oXFxeKSguKikoXFwkKSQvLCBcIiQyXCIpIDogKHJlZ2V4TWFzayA9ICEwLCBcbiAgICAgICAgICAgICAgICBtYXNrID0gXCIuKlwiKSksIDEgPT09IG1hc2subGVuZ3RoICYmICExID09PSBvcHRzLmdyZWVkeSAmJiAwICE9PSBvcHRzLnJlcGVhdCAmJiAob3B0cy5wbGFjZWhvbGRlciA9IFwiXCIpLCBcbiAgICAgICAgICAgICAgICBvcHRzLnJlcGVhdCA+IDAgfHwgXCIqXCIgPT09IG9wdHMucmVwZWF0IHx8IFwiK1wiID09PSBvcHRzLnJlcGVhdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVwZWF0U3RhcnQgPSBcIipcIiA9PT0gb3B0cy5yZXBlYXQgPyAwIDogXCIrXCIgPT09IG9wdHMucmVwZWF0ID8gMSA6IG9wdHMucmVwZWF0O1xuICAgICAgICAgICAgICAgICAgICBtYXNrID0gb3B0cy5ncm91cG1hcmtlclswXSArIG1hc2sgKyBvcHRzLmdyb3VwbWFya2VyWzFdICsgb3B0cy5xdWFudGlmaWVybWFya2VyWzBdICsgcmVwZWF0U3RhcnQgKyBcIixcIiArIG9wdHMucmVwZWF0ICsgb3B0cy5xdWFudGlmaWVybWFya2VyWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbWFza3NldERlZmluaXRpb24sIG1hc2tkZWZLZXkgPSByZWdleE1hc2sgPyBcInJlZ2V4X1wiICsgb3B0cy5yZWdleCA6IG9wdHMubnVtZXJpY0lucHV0ID8gbWFzay5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IG1hc2s7XG4gICAgICAgICAgICAgICAgcmV0dXJuIElucHV0bWFzay5wcm90b3R5cGUubWFza3NDYWNoZVttYXNrZGVmS2V5XSA9PT0gdW5kZWZpbmVkIHx8ICEwID09PSBub2NhY2hlID8gKG1hc2tzZXREZWZpbml0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBtYXNrOiBtYXNrLFxuICAgICAgICAgICAgICAgICAgICBtYXNrVG9rZW46IElucHV0bWFzay5wcm90b3R5cGUuYW5hbHlzZU1hc2sobWFzaywgcmVnZXhNYXNrLCBvcHRzKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRQb3NpdGlvbnM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBfYnVmZmVyOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICB0ZXN0czoge30sXG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVzOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICBtYXNrTGVuZ3RoOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9LCAhMCAhPT0gbm9jYWNoZSAmJiAoSW5wdXRtYXNrLnByb3RvdHlwZS5tYXNrc0NhY2hlW21hc2tkZWZLZXldID0gbWFza3NldERlZmluaXRpb24sIFxuICAgICAgICAgICAgICAgIG1hc2tzZXREZWZpbml0aW9uID0gJC5leHRlbmQoITAsIHt9LCBJbnB1dG1hc2sucHJvdG90eXBlLm1hc2tzQ2FjaGVbbWFza2RlZktleV0pKSkgOiBtYXNrc2V0RGVmaW5pdGlvbiA9ICQuZXh0ZW5kKCEwLCB7fSwgSW5wdXRtYXNrLnByb3RvdHlwZS5tYXNrc0NhY2hlW21hc2tkZWZLZXldKSwgXG4gICAgICAgICAgICAgICAgbWFza3NldERlZmluaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9wdHMubWFzaykgJiYgKG9wdHMubWFzayA9IG9wdHMubWFzayhvcHRzKSksICQuaXNBcnJheShvcHRzLm1hc2spKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMubWFzay5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChudWxsID09PSBvcHRzLmtlZXBTdGF0aWMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMua2VlcFN0YXRpYyA9IFwiYXV0b1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcHRzLm1hc2subGVuZ3RoOyBpKyspIGlmIChvcHRzLm1hc2tbaV0uY2hhckF0KDApICE9PSBvcHRzLm1hc2tbMF0uY2hhckF0KDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5rZWVwU3RhdGljID0gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFsdE1hc2sgPSBvcHRzLmdyb3VwbWFya2VyWzBdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5lYWNoKG9wdHMuaXNSVEwgPyBvcHRzLm1hc2sucmV2ZXJzZSgpIDogb3B0cy5tYXNrLCBmdW5jdGlvbihuZHgsIG1zaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWx0TWFzay5sZW5ndGggPiAxICYmIChhbHRNYXNrICs9IG9wdHMuZ3JvdXBtYXJrZXJbMV0gKyBvcHRzLmFsdGVybmF0b3JtYXJrZXIgKyBvcHRzLmdyb3VwbWFya2VyWzBdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtc2subWFzayA9PT0gdW5kZWZpbmVkIHx8ICQuaXNGdW5jdGlvbihtc2subWFzaykgPyBhbHRNYXNrICs9IG1zayA6IGFsdE1hc2sgKz0gbXNrLm1hc2s7XG4gICAgICAgICAgICAgICAgICAgIH0pLCBnZW5lcmF0ZU1hc2soYWx0TWFzayArPSBvcHRzLmdyb3VwbWFya2VyWzFdLCBvcHRzLm1hc2ssIG9wdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRzLm1hc2sgPSBvcHRzLm1hc2sucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3B0cy5tYXNrICYmIG9wdHMubWFzay5tYXNrICE9PSB1bmRlZmluZWQgJiYgISQuaXNGdW5jdGlvbihvcHRzLm1hc2subWFzaykgPyBnZW5lcmF0ZU1hc2sob3B0cy5tYXNrLm1hc2ssIG9wdHMubWFzaywgb3B0cykgOiBnZW5lcmF0ZU1hc2sob3B0cy5tYXNrLCBvcHRzLm1hc2ssIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzSW5wdXRFdmVudFN1cHBvcnRlZChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSwgZXZOYW1lID0gXCJvblwiICsgZXZlbnROYW1lLCBpc1N1cHBvcnRlZCA9IGV2TmFtZSBpbiBlbDtcbiAgICAgICAgICAgIHJldHVybiBpc1N1cHBvcnRlZCB8fCAoZWwuc2V0QXR0cmlidXRlKGV2TmFtZSwgXCJyZXR1cm47XCIpLCBpc1N1cHBvcnRlZCA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZWxbZXZOYW1lXSksIFxuICAgICAgICAgICAgZWwgPSBudWxsLCBpc1N1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBtYXNrU2NvcGUoYWN0aW9uT2JqLCBtYXNrc2V0LCBvcHRzKSB7XG4gICAgICAgICAgICBtYXNrc2V0ID0gbWFza3NldCB8fCB0aGlzLm1hc2tzZXQsIG9wdHMgPSBvcHRzIHx8IHRoaXMub3B0cztcbiAgICAgICAgICAgIHZhciB1bmRvVmFsdWUsICRlbCwgbWF4TGVuZ3RoLCBjb2xvck1hc2ssIGlucHV0bWFzayA9IHRoaXMsIGVsID0gdGhpcy5lbCwgaXNSVEwgPSB0aGlzLmlzUlRMLCBza2lwS2V5UHJlc3NFdmVudCA9ICExLCBza2lwSW5wdXRFdmVudCA9ICExLCBpZ25vcmFibGUgPSAhMSwgbW91c2VFbnRlciA9ICExLCB0cmFja0NhcmV0ID0gITE7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRNYXNrVGVtcGxhdGUoYmFzZU9uSW5wdXQsIG1pbmltYWxQb3MsIGluY2x1ZGVNb2RlLCBub0ppdCwgY2xlYXJPcHRpb25hbFRhaWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ3JlZWR5ID0gb3B0cy5ncmVlZHk7XG4gICAgICAgICAgICAgICAgY2xlYXJPcHRpb25hbFRhaWwgJiYgKG9wdHMuZ3JlZWR5ID0gITEpLCBtaW5pbWFsUG9zID0gbWluaW1hbFBvcyB8fCAwO1xuICAgICAgICAgICAgICAgIHZhciBuZHhJbnRsenIsIHRlc3QsIHRlc3RQb3MsIG1hc2tUZW1wbGF0ZSA9IFtdLCBwb3MgPSAwLCBsdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEwID09PSBiYXNlT25JbnB1dCAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSkgdGVzdCA9ICh0ZXN0UG9zID0gIWNsZWFyT3B0aW9uYWxUYWlsIHx8ICEwICE9PSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXS5tYXRjaC5vcHRpb25hbGl0eSB8fCAhMCAhPT0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10uZ2VuZXJhdGVkSW5wdXQgJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10uaW5wdXQgIT0gb3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyIHx8IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3MgKyAxXSAhPT0gdW5kZWZpbmVkID8gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10gOiBkZXRlcm1pbmVUZXN0VGVtcGxhdGUocG9zLCBnZXRUZXN0cyhwb3MsIG5keEludGx6ciwgcG9zIC0gMSkpKS5tYXRjaCwgXG4gICAgICAgICAgICAgICAgICAgIG5keEludGx6ciA9IHRlc3RQb3MubG9jYXRvci5zbGljZSgpLCBtYXNrVGVtcGxhdGUucHVzaCghMCA9PT0gaW5jbHVkZU1vZGUgPyB0ZXN0UG9zLmlucHV0IDogITEgPT09IGluY2x1ZGVNb2RlID8gdGVzdC5uYXRpdmVEZWYgOiBnZXRQbGFjZWhvbGRlcihwb3MsIHRlc3QpKTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0ID0gKHRlc3RQb3MgPSBnZXRUZXN0VGVtcGxhdGUocG9zLCBuZHhJbnRsenIsIHBvcyAtIDEpKS5tYXRjaCwgbmR4SW50bHpyID0gdGVzdFBvcy5sb2NhdG9yLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaml0TWFza2luZyA9ICEwICE9PSBub0ppdCAmJiAoITEgIT09IG9wdHMuaml0TWFza2luZyA/IG9wdHMuaml0TWFza2luZyA6IHRlc3Quaml0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICghMSA9PT0gaml0TWFza2luZyB8fCBqaXRNYXNraW5nID09PSB1bmRlZmluZWQgfHwgcG9zIDwgbHZwIHx8IFwibnVtYmVyXCIgPT0gdHlwZW9mIGppdE1hc2tpbmcgJiYgaXNGaW5pdGUoaml0TWFza2luZykgJiYgaml0TWFza2luZyA+IHBvcykgJiYgbWFza1RlbXBsYXRlLnB1c2goITEgPT09IGluY2x1ZGVNb2RlID8gdGVzdC5uYXRpdmVEZWYgOiBnZXRQbGFjZWhvbGRlcihwb3MsIHRlc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcImF1dG9cIiA9PT0gb3B0cy5rZWVwU3RhdGljICYmIHRlc3QubmV3QmxvY2tNYXJrZXIgJiYgbnVsbCAhPT0gdGVzdC5mbiAmJiAob3B0cy5rZWVwU3RhdGljID0gcG9zIC0gMSksIFxuICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB9IHdoaWxlICgobWF4TGVuZ3RoID09PSB1bmRlZmluZWQgfHwgcG9zIDwgbWF4TGVuZ3RoKSAmJiAobnVsbCAhPT0gdGVzdC5mbiB8fCBcIlwiICE9PSB0ZXN0LmRlZikgfHwgbWluaW1hbFBvcyA+IHBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCIgPT09IG1hc2tUZW1wbGF0ZVttYXNrVGVtcGxhdGUubGVuZ3RoIC0gMV0gJiYgbWFza1RlbXBsYXRlLnBvcCgpLCAhMSA9PT0gaW5jbHVkZU1vZGUgJiYgZ2V0TWFza1NldCgpLm1hc2tMZW5ndGggIT09IHVuZGVmaW5lZCB8fCAoZ2V0TWFza1NldCgpLm1hc2tMZW5ndGggPSBwb3MgLSAxKSwgXG4gICAgICAgICAgICAgICAgb3B0cy5ncmVlZHkgPSBncmVlZHksIG1hc2tUZW1wbGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1hc2tTZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiByZXNldE1hc2tTZXQoc29mdCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXNrc2V0ID0gZ2V0TWFza1NldCgpO1xuICAgICAgICAgICAgICAgIG1hc2tzZXQuYnVmZmVyID0gdW5kZWZpbmVkLCAhMCAhPT0gc29mdCAmJiAobWFza3NldC52YWxpZFBvc2l0aW9ucyA9IHt9LCBtYXNrc2V0LnAgPSAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldExhc3RWYWxpZFBvc2l0aW9uKGNsb3Nlc3RUbywgc3RyaWN0LCB2YWxpZFBvc2l0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciBiZWZvcmUgPSAtMSwgYWZ0ZXIgPSAtMSwgdmFsaWRzID0gdmFsaWRQb3NpdGlvbnMgfHwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHBvc05keCBpbiBjbG9zZXN0VG8gPT09IHVuZGVmaW5lZCAmJiAoY2xvc2VzdFRvID0gLTEpLCB2YWxpZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBzTmR4ID0gcGFyc2VJbnQocG9zTmR4KTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRzW3BzTmR4XSAmJiAoc3RyaWN0IHx8ICEwICE9PSB2YWxpZHNbcHNOZHhdLmdlbmVyYXRlZElucHV0KSAmJiAocHNOZHggPD0gY2xvc2VzdFRvICYmIChiZWZvcmUgPSBwc05keCksIFxuICAgICAgICAgICAgICAgICAgICBwc05keCA+PSBjbG9zZXN0VG8gJiYgKGFmdGVyID0gcHNOZHgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xID09PSBiZWZvcmUgfHwgYmVmb3JlID09IGNsb3Nlc3RUbyA/IGFmdGVyIDogLTEgPT0gYWZ0ZXIgPyBiZWZvcmUgOiBjbG9zZXN0VG8gLSBiZWZvcmUgPCBhZnRlciAtIGNsb3Nlc3RUbyA/IGJlZm9yZSA6IGFmdGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZGV0ZXJtaW5lVGVzdFRlbXBsYXRlKHBvcywgdGVzdHMsIGd1ZXNzTmV4dEJlc3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0ZXN0UG9zLCBhbHRUZXN0ID0gZ2V0VGVzdChwb3MgPSBwb3MgPiAwID8gcG9zIC0gMSA6IDAsIHRlc3RzKSwgYWx0QXJyID0gYWx0VGVzdC5hbHRlcm5hdGlvbiAhPT0gdW5kZWZpbmVkID8gYWx0VGVzdC5sb2NhdG9yW2FsdFRlc3QuYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpIDogW10sIG5keCA9IDA7IG5keCA8IHRlc3RzLmxlbmd0aCAmJiAoISgodGVzdFBvcyA9IHRlc3RzW25keF0pLm1hdGNoICYmIChvcHRzLmdyZWVkeSAmJiAhMCAhPT0gdGVzdFBvcy5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgfHwgKCExID09PSB0ZXN0UG9zLm1hdGNoLm9wdGlvbmFsaXR5IHx8ICExID09PSB0ZXN0UG9zLm1hdGNoLm5ld0Jsb2NrTWFya2VyKSAmJiAhMCAhPT0gdGVzdFBvcy5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIpICYmIChhbHRUZXN0LmFsdGVybmF0aW9uID09PSB1bmRlZmluZWQgfHwgYWx0VGVzdC5hbHRlcm5hdGlvbiAhPT0gdGVzdFBvcy5hbHRlcm5hdGlvbiB8fCB0ZXN0UG9zLmxvY2F0b3JbYWx0VGVzdC5hbHRlcm5hdGlvbl0gIT09IHVuZGVmaW5lZCAmJiBjaGVja0FsdGVybmF0aW9uTWF0Y2godGVzdFBvcy5sb2NhdG9yW2FsdFRlc3QuYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpLCBhbHRBcnIpKSkgfHwgITAgPT09IGd1ZXNzTmV4dEJlc3QgJiYgKG51bGwgIT09IHRlc3RQb3MubWF0Y2guZm4gfHwgL1swLTlhLWJBLVpdLy50ZXN0KHRlc3RQb3MubWF0Y2guZGVmKSkpOyBuZHgrKykgO1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0UG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RGVjaXNpb25UYWtlcih0c3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVjaXNpb25UYWtlciA9IHRzdC5sb2NhdG9yW3RzdC5hbHRlcm5hdGlvbl07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCIgPT0gdHlwZW9mIGRlY2lzaW9uVGFrZXIgJiYgZGVjaXNpb25UYWtlci5sZW5ndGggPiAwICYmIChkZWNpc2lvblRha2VyID0gZGVjaXNpb25UYWtlci5zcGxpdChcIixcIilbMF0pLCBcbiAgICAgICAgICAgICAgICBkZWNpc2lvblRha2VyICE9PSB1bmRlZmluZWQgPyBkZWNpc2lvblRha2VyLnRvU3RyaW5nKCkgOiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TG9jYXRvcih0c3QsIGFsaWduKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbG9jYXRvciA9ICh0c3QuYWx0ZXJuYXRpb24gIT0gdW5kZWZpbmVkID8gdHN0Lm1sb2NbZ2V0RGVjaXNpb25UYWtlcih0c3QpXSA6IHRzdC5sb2NhdG9yKS5qb2luKFwiXCIpOyBsb2NhdG9yLmxlbmd0aCA8IGFsaWduOyApIGxvY2F0b3IgKz0gXCIwXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2F0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRUZXN0VGVtcGxhdGUocG9zLCBuZHhJbnRsenIsIHRzdFBzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdIHx8IGRldGVybWluZVRlc3RUZW1wbGF0ZShwb3MsIGdldFRlc3RzKHBvcywgbmR4SW50bHpyID8gbmR4SW50bHpyLnNsaWNlKCkgOiBuZHhJbnRsenIsIHRzdFBzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRUZXN0KHBvcywgdGVzdHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10gPyBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSA6ICh0ZXN0cyB8fCBnZXRUZXN0cyhwb3MpKVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHBvc2l0aW9uQ2FuTWF0Y2hEZWZpbml0aW9uKHBvcywgZGVmKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdmFsaWQgPSAhMSwgdGVzdHMgPSBnZXRUZXN0cyhwb3MpLCB0bmR4ID0gMDsgdG5keCA8IHRlc3RzLmxlbmd0aDsgdG5keCsrKSBpZiAodGVzdHNbdG5keF0ubWF0Y2ggJiYgdGVzdHNbdG5keF0ubWF0Y2guZGVmID09PSBkZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFRlc3RzKHBvcywgbmR4SW50bHpyLCB0c3RQcykge1xuICAgICAgICAgICAgICAgIHZhciBsYXRlc3RNYXRjaCwgbWFza1Rva2VucyA9IGdldE1hc2tTZXQoKS5tYXNrVG9rZW4sIHRlc3RQb3MgPSBuZHhJbnRsenIgPyB0c3RQcyA6IDAsIG5keEluaXRpYWxpemVyID0gbmR4SW50bHpyID8gbmR4SW50bHpyLnNsaWNlKCkgOiBbIDAgXSwgbWF0Y2hlcyA9IFtdLCBpbnNlcnRTdG9wID0gITEsIGNhY2hlRGVwZW5kZW5jeSA9IG5keEludGx6ciA/IG5keEludGx6ci5qb2luKFwiXCIpIDogXCJcIjtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXNvbHZlVGVzdEZyb21Ub2tlbihtYXNrVG9rZW4sIG5keEluaXRpYWxpemVyLCBsb29wTmR4LCBxdWFudGlmaWVyUmVjdXJzZSkge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVNYXRjaChtYXRjaCwgbG9vcE5keCwgcXVhbnRpZmllclJlY3Vyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlzRmlyc3RNYXRjaChsYXRlc3RNYXRjaCwgdG9rZW5Hcm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdE1hdGNoID0gMCA9PT0gJC5pbkFycmF5KGxhdGVzdE1hdGNoLCB0b2tlbkdyb3VwLm1hdGNoZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdE1hdGNoIHx8ICQuZWFjaCh0b2tlbkdyb3VwLm1hdGNoZXMsIGZ1bmN0aW9uKG5keCwgbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwID09PSBtYXRjaC5pc1F1YW50aWZpZXIgPyBmaXJzdE1hdGNoID0gaXNGaXJzdE1hdGNoKGxhdGVzdE1hdGNoLCB0b2tlbkdyb3VwLm1hdGNoZXNbbmR4IC0gMV0pIDogITAgPT09IG1hdGNoLmlzT3B0aW9uYWwgPyBmaXJzdE1hdGNoID0gaXNGaXJzdE1hdGNoKGxhdGVzdE1hdGNoLCBtYXRjaCkgOiAhMCA9PT0gbWF0Y2guaXNBbHRlcm5hdGUgJiYgKGZpcnN0TWF0Y2ggPSBpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIG1hdGNoKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE1hdGNoKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGZpcnN0TWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXNvbHZlTmR4SW5pdGlhbGl6ZXIocG9zLCBhbHRlcm5hdGVOZHgsIHRhcmdldEFsdGVybmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJlc3RNYXRjaCwgaW5kZXhQb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChnZXRNYXNrU2V0KCkudGVzdHNbcG9zXSB8fCBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSkgJiYgJC5lYWNoKGdldE1hc2tTZXQoKS50ZXN0c1twb3NdIHx8IFsgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10gXSwgZnVuY3Rpb24obmR4LCBsbW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsbW50Lm1sb2NbYWx0ZXJuYXRlTmR4XSkgcmV0dXJuIGJlc3RNYXRjaCA9IGxtbnQsICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0ZXJuYXRpb24gPSB0YXJnZXRBbHRlcm5hdGlvbiAhPT0gdW5kZWZpbmVkID8gdGFyZ2V0QWx0ZXJuYXRpb24gOiBsbW50LmFsdGVybmF0aW9uLCBuZHhQb3MgPSBsbW50LmxvY2F0b3JbYWx0ZXJuYXRpb25dICE9PSB1bmRlZmluZWQgPyBsbW50LmxvY2F0b3JbYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkuaW5kZXhPZihhbHRlcm5hdGVOZHgpIDogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRleFBvcyA9PT0gdW5kZWZpbmVkIHx8IG5keFBvcyA8IGluZGV4UG9zKSAmJiAtMSAhPT0gbmR4UG9zICYmIChiZXN0TWF0Y2ggPSBsbW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhQb3MgPSBuZHhQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBiZXN0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJlc3RNYXRjaEFsdEluZGV4ID0gYmVzdE1hdGNoLmxvY2F0b3JbYmVzdE1hdGNoLmFsdGVybmF0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChiZXN0TWF0Y2gubWxvY1thbHRlcm5hdGVOZHhdIHx8IGJlc3RNYXRjaC5tbG9jW2Jlc3RNYXRjaEFsdEluZGV4XSB8fCBiZXN0TWF0Y2gubG9jYXRvcikuc2xpY2UoKHRhcmdldEFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQgPyB0YXJnZXRBbHRlcm5hdGlvbiA6IGJlc3RNYXRjaC5hbHRlcm5hdGlvbikgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldEFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQgPyByZXNvbHZlTmR4SW5pdGlhbGl6ZXIocG9zLCBhbHRlcm5hdGVOZHgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gaXNTdWJzZXRPZihzb3VyY2UsIHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGV4cGFuZChwYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHN0YXJ0LCBlbmQsIGV4cGFuZGVkID0gW10sIGkgPSAwLCBsID0gcGF0dGVybi5sZW5ndGg7IGkgPCBsOyBpKyspIGlmIChcIi1cIiA9PT0gcGF0dGVybi5jaGFyQXQoaSkpIGZvciAoZW5kID0gcGF0dGVybi5jaGFyQ29kZUF0KGkgKyAxKTsgKytzdGFydCA8IGVuZDsgKSBleHBhbmRlZC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoc3RhcnQpKTsgZWxzZSBzdGFydCA9IHBhdHRlcm4uY2hhckNvZGVBdChpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkLnB1c2gocGF0dGVybi5jaGFyQXQoaSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhwYW5kZWQuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMucmVnZXggJiYgbnVsbCAhPT0gc291cmNlLm1hdGNoLmZuICYmIG51bGwgIT09IHRhcmdldC5tYXRjaC5mbiA/IC0xICE9PSBleHBhbmQodGFyZ2V0Lm1hdGNoLmRlZi5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlwiKSkuaW5kZXhPZihleHBhbmQoc291cmNlLm1hdGNoLmRlZi5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlwiKSkpIDogc291cmNlLm1hdGNoLmRlZiA9PT0gdGFyZ2V0Lm1hdGNoLm5hdGl2ZURlZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldE1lcmdlTG9jYXRvcnModGFyZ2V0TWF0Y2gsIGFsdE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsdE1hdGNoID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0TWF0Y2guYWx0ZXJuYXRpb24gPT09IGFsdE1hdGNoLmFsdGVybmF0aW9uICYmIC0xID09PSB0YXJnZXRNYXRjaC5sb2NhdG9yW3RhcmdldE1hdGNoLmFsdGVybmF0aW9uXS50b1N0cmluZygpLmluZGV4T2YoYWx0TWF0Y2gubG9jYXRvclthbHRNYXRjaC5hbHRlcm5hdGlvbl0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoLm1sb2MgPSB0YXJnZXRNYXRjaC5tbG9jIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG9jTmR4ID0gdGFyZ2V0TWF0Y2gubG9jYXRvclt0YXJnZXRNYXRjaC5hbHRlcm5hdGlvbl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NOZHggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGxvY05keCAmJiAobG9jTmR4ID0gbG9jTmR4LnNwbGl0KFwiLFwiKVswXSksIHRhcmdldE1hdGNoLm1sb2NbbG9jTmR4XSA9PT0gdW5kZWZpbmVkICYmICh0YXJnZXRNYXRjaC5tbG9jW2xvY05keF0gPSB0YXJnZXRNYXRjaC5sb2NhdG9yLnNsaWNlKCkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdE1hdGNoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuZHggaW4gYWx0TWF0Y2gubWxvYykgXCJzdHJpbmdcIiA9PSB0eXBlb2YgbmR4ICYmIChuZHggPSBuZHguc3BsaXQoXCIsXCIpWzBdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2gubWxvY1tuZHhdID09PSB1bmRlZmluZWQgJiYgKHRhcmdldE1hdGNoLm1sb2NbbmR4XSA9IGFsdE1hdGNoLm1sb2NbbmR4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2gubG9jYXRvclt0YXJnZXRNYXRjaC5hbHRlcm5hdGlvbl0gPSBPYmplY3Qua2V5cyh0YXJnZXRNYXRjaC5tbG9jKS5qb2luKFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaC5hbHRlcm5hdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RQb3MgPiA1ZTMpIHRocm93IFwiSW5wdXRtYXNrOiBUaGVyZSBpcyBwcm9iYWJseSBhbiBlcnJvciBpbiB5b3VyIG1hc2sgZGVmaW5pdGlvbiBvciBpbiB0aGUgY29kZS4gQ3JlYXRlIGFuIGlzc3VlIG9uIGdpdGh1YiB3aXRoIGFuIGV4YW1wbGUgb2YgdGhlIG1hc2sgeW91IGFyZSB1c2luZy4gXCIgKyBnZXRNYXNrU2V0KCkubWFzaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UG9zID09PSBwb3MgJiYgbWF0Y2gubWF0Y2hlcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbWF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaDogbWF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRvcjogbG9vcE5keC5yZXZlcnNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Q6IGNhY2hlRGVwZW5kZW5jeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtbG9jOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoLm1hdGNoZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaC5pc0dyb3VwICYmIHF1YW50aWZpZXJSZWN1cnNlICE9PSBtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSBoYW5kbGVNYXRjaChtYXNrVG9rZW4ubWF0Y2hlc1skLmluQXJyYXkobWF0Y2gsIG1hc2tUb2tlbi5tYXRjaGVzKSArIDFdLCBsb29wTmR4KSkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2guaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uYWxUb2tlbiA9IG1hdGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSByZXNvbHZlVGVzdEZyb21Ub2tlbihtYXRjaCwgbmR4SW5pdGlhbGl6ZXIsIGxvb3BOZHgsIHF1YW50aWZpZXJSZWN1cnNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhdGVzdE1hdGNoID0gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdLm1hdGNoLCBxdWFudGlmaWVyUmVjdXJzZSAhPT0gdW5kZWZpbmVkIHx8ICFpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIG9wdGlvbmFsVG9rZW4pKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRTdG9wID0gITAsIHRlc3RQb3MgPSBwb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoLmlzQWx0ZXJuYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFsdE1hdGNoZXMsIGFsdGVybmF0ZVRva2VuID0gbWF0Y2gsIG1hbHRlcm5hdGVNYXRjaGVzID0gW10sIGN1cnJlbnRNYXRjaGVzID0gbWF0Y2hlcy5zbGljZSgpLCBsb29wTmR4Q250ID0gbG9vcE5keC5sZW5ndGgsIGFsdEluZGV4ID0gbmR4SW5pdGlhbGl6ZXIubGVuZ3RoID4gMCA/IG5keEluaXRpYWxpemVyLnNoaWZ0KCkgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0xID09PSBhbHRJbmRleCB8fCBcInN0cmluZ1wiID09IHR5cGVvZiBhbHRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFtbmR4LCBjdXJyZW50UG9zID0gdGVzdFBvcywgbmR4SW5pdGlhbGl6ZXJDbG9uZSA9IG5keEluaXRpYWxpemVyLnNsaWNlKCksIGFsdEluZGV4QXJyID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgYWx0SW5kZXgpIGFsdEluZGV4QXJyID0gYWx0SW5kZXguc3BsaXQoXCIsXCIpOyBlbHNlIGZvciAoYW1uZHggPSAwOyBhbW5keCA8IGFsdGVybmF0ZVRva2VuLm1hdGNoZXMubGVuZ3RoOyBhbW5keCsrKSBhbHRJbmRleEFyci5wdXNoKGFtbmR4LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldE1hc2tTZXQoKS5leGNsdWRlc1twb3NdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYWx0SW5kZXhBcnJDbG9uZSA9IGFsdEluZGV4QXJyLnNsaWNlKCksIGkgPSAwLCBlbCA9IGdldE1hc2tTZXQoKS5leGNsdWRlc1twb3NdLmxlbmd0aDsgaSA8IGVsOyBpKyspIGFsdEluZGV4QXJyLnNwbGljZShhbHRJbmRleEFyci5pbmRleE9mKGdldE1hc2tTZXQoKS5leGNsdWRlc1twb3NdW2ldLnRvU3RyaW5nKCkpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwID09PSBhbHRJbmRleEFyci5sZW5ndGggJiYgKGdldE1hc2tTZXQoKS5leGNsdWRlc1twb3NdID0gdW5kZWZpbmVkLCBhbHRJbmRleEFyciA9IGFsdEluZGV4QXJyQ2xvbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCEwID09PSBvcHRzLmtlZXBTdGF0aWMgfHwgaXNGaW5pdGUocGFyc2VJbnQob3B0cy5rZWVwU3RhdGljKSkgJiYgY3VycmVudFBvcyA+PSBvcHRzLmtlZXBTdGF0aWMpICYmIChhbHRJbmRleEFyciA9IGFsdEluZGV4QXJyLnNsaWNlKDAsIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHVuTWF0Y2hlZEFsdGVybmF0aW9uID0gITEsIG5keCA9IDA7IG5keCA8IGFsdEluZGV4QXJyLmxlbmd0aDsgbmR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW5keCA9IHBhcnNlSW50KGFsdEluZGV4QXJyW25keF0pLCBtYXRjaGVzID0gW10sIG5keEluaXRpYWxpemVyID0gXCJzdHJpbmdcIiA9PSB0eXBlb2YgYWx0SW5kZXggJiYgcmVzb2x2ZU5keEluaXRpYWxpemVyKHRlc3RQb3MsIGFtbmR4LCBsb29wTmR4Q250KSB8fCBuZHhJbml0aWFsaXplckNsb25lLnNsaWNlKCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0ZVRva2VuLm1hdGNoZXNbYW1uZHhdICYmIGhhbmRsZU1hdGNoKGFsdGVybmF0ZVRva2VuLm1hdGNoZXNbYW1uZHhdLCBbIGFtbmR4IF0uY29uY2F0KGxvb3BOZHgpLCBxdWFudGlmaWVyUmVjdXJzZSkgPyBtYXRjaCA9ICEwIDogMCA9PT0gbmR4ICYmICh1bk1hdGNoZWRBbHRlcm5hdGlvbiA9ICEwKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFsdE1hdGNoZXMgPSBtYXRjaGVzLnNsaWNlKCksIHRlc3RQb3MgPSBjdXJyZW50UG9zLCBtYXRjaGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbmR4MSA9IDA7IG5keDEgPCBtYWx0TWF0Y2hlcy5sZW5ndGg7IG5keDErKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0TWF0Y2ggPSBtYWx0TWF0Y2hlc1tuZHgxXSwgZHJvcE1hdGNoID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdE1hdGNoLm1hdGNoLmppdCA9IGFsdE1hdGNoLm1hdGNoLmppdCB8fCB1bk1hdGNoZWRBbHRlcm5hdGlvbiwgYWx0TWF0Y2guYWx0ZXJuYXRpb24gPSBhbHRNYXRjaC5hbHRlcm5hdGlvbiB8fCBsb29wTmR4Q250LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVyZ2VMb2NhdG9ycyhhbHRNYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG5keDIgPSAwOyBuZHgyIDwgbWFsdGVybmF0ZU1hdGNoZXMubGVuZ3RoOyBuZHgyKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHRNYXRjaDIgPSBtYWx0ZXJuYXRlTWF0Y2hlc1tuZHgyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiICE9IHR5cGVvZiBhbHRJbmRleCB8fCBhbHRNYXRjaC5hbHRlcm5hdGlvbiAhPT0gdW5kZWZpbmVkICYmIC0xICE9PSAkLmluQXJyYXkoYWx0TWF0Y2gubG9jYXRvclthbHRNYXRjaC5hbHRlcm5hdGlvbl0udG9TdHJpbmcoKSwgYWx0SW5kZXhBcnIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsdE1hdGNoLm1hdGNoLm5hdGl2ZURlZiA9PT0gYWx0TWF0Y2gyLm1hdGNoLm5hdGl2ZURlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wTWF0Y2ggPSAhMCwgc2V0TWVyZ2VMb2NhdG9ycyhhbHRNYXRjaDIsIGFsdE1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1N1YnNldE9mKGFsdE1hdGNoLCBhbHRNYXRjaDIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lcmdlTG9jYXRvcnMoYWx0TWF0Y2gsIGFsdE1hdGNoMikgJiYgKGRyb3BNYXRjaCA9ICEwLCBtYWx0ZXJuYXRlTWF0Y2hlcy5zcGxpY2UobWFsdGVybmF0ZU1hdGNoZXMuaW5kZXhPZihhbHRNYXRjaDIpLCAwLCBhbHRNYXRjaCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3Vic2V0T2YoYWx0TWF0Y2gyLCBhbHRNYXRjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVyZ2VMb2NhdG9ycyhhbHRNYXRjaDIsIGFsdE1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPSBhbHRNYXRjaDIsIG51bGwgPT09IChzb3VyY2UgPSBhbHRNYXRjaCkubWF0Y2guZm4gJiYgbnVsbCAhPT0gdGFyZ2V0Lm1hdGNoLmZuICYmIHRhcmdldC5tYXRjaC5mbi50ZXN0KHNvdXJjZS5tYXRjaC5kZWYsIGdldE1hc2tTZXQoKSwgcG9zLCAhMSwgb3B0cywgITEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lcmdlTG9jYXRvcnMoYWx0TWF0Y2gsIGFsdE1hdGNoMikgJiYgKGRyb3BNYXRjaCA9ICEwLCBtYWx0ZXJuYXRlTWF0Y2hlcy5zcGxpY2UobWFsdGVybmF0ZU1hdGNoZXMuaW5kZXhPZihhbHRNYXRjaDIpLCAwLCBhbHRNYXRjaCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE1hdGNoIHx8IG1hbHRlcm5hdGVNYXRjaGVzLnB1c2goYWx0TWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBjdXJyZW50TWF0Y2hlcy5jb25jYXQobWFsdGVybmF0ZU1hdGNoZXMpLCB0ZXN0UG9zID0gcG9zLCBpbnNlcnRTdG9wID0gbWF0Y2hlcy5sZW5ndGggPiAwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gbWFsdGVybmF0ZU1hdGNoZXMubGVuZ3RoID4gMCwgbmR4SW5pdGlhbGl6ZXIgPSBuZHhJbml0aWFsaXplckNsb25lLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBtYXRjaCA9IGhhbmRsZU1hdGNoKGFsdGVybmF0ZVRva2VuLm1hdGNoZXNbYWx0SW5kZXhdIHx8IG1hc2tUb2tlbi5tYXRjaGVzW2FsdEluZGV4XSwgWyBhbHRJbmRleCBdLmNvbmNhdChsb29wTmR4KSwgcXVhbnRpZmllclJlY3Vyc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoLmlzUXVhbnRpZmllciAmJiBxdWFudGlmaWVyUmVjdXJzZSAhPT0gbWFza1Rva2VuLm1hdGNoZXNbJC5pbkFycmF5KG1hdGNoLCBtYXNrVG9rZW4ubWF0Y2hlcykgLSAxXSkgZm9yICh2YXIgcXQgPSBtYXRjaCwgcW5keCA9IG5keEluaXRpYWxpemVyLmxlbmd0aCA+IDAgPyBuZHhJbml0aWFsaXplci5zaGlmdCgpIDogMDsgcW5keCA8IChpc05hTihxdC5xdWFudGlmaWVyLm1heCkgPyBxbmR4ICsgMSA6IHF0LnF1YW50aWZpZXIubWF4KSAmJiB0ZXN0UG9zIDw9IHBvczsgcW5keCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbkdyb3VwID0gbWFza1Rva2VuLm1hdGNoZXNbJC5pbkFycmF5KHF0LCBtYXNrVG9rZW4ubWF0Y2hlcykgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoID0gaGFuZGxlTWF0Y2godG9rZW5Hcm91cCwgWyBxbmR4IF0uY29uY2F0KGxvb3BOZHgpLCB0b2tlbkdyb3VwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsYXRlc3RNYXRjaCA9IG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGggLSAxXS5tYXRjaCkub3B0aW9uYWxRdWFudGlmaWVyID0gcW5keCA+IHF0LnF1YW50aWZpZXIubWluIC0gMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXRlc3RNYXRjaC5qaXQgPSBxbmR4ICsgdG9rZW5Hcm91cC5tYXRjaGVzLmluZGV4T2YobGF0ZXN0TWF0Y2gpID49IHF0LnF1YW50aWZpZXIuaml0LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRmlyc3RNYXRjaChsYXRlc3RNYXRjaCwgdG9rZW5Hcm91cCkgJiYgcW5keCA+IHF0LnF1YW50aWZpZXIubWluIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydFN0b3AgPSAhMCwgdGVzdFBvcyA9IHBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdC5xdWFudGlmaWVyLmppdCAhPT0gdW5kZWZpbmVkICYmIGlzTmFOKHF0LnF1YW50aWZpZXIubWF4KSAmJiBsYXRlc3RNYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3BvcyAtIDFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLnBvcCgpLCBpbnNlcnRTdG9wID0gITAsIHRlc3RQb3MgPSBwb3MsIGNhY2hlRGVwZW5kZW5jeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2ggPSByZXNvbHZlVGVzdEZyb21Ub2tlbihtYXRjaCwgbmR4SW5pdGlhbGl6ZXIsIGxvb3BOZHgsIHF1YW50aWZpZXJSZWN1cnNlKSkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHRlc3RQb3MrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2UsIHRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0bmR4ID0gbmR4SW5pdGlhbGl6ZXIubGVuZ3RoID4gMCA/IG5keEluaXRpYWxpemVyLnNoaWZ0KCkgOiAwOyB0bmR4IDwgbWFza1Rva2VuLm1hdGNoZXMubGVuZ3RoOyB0bmR4KyspIGlmICghMCAhPT0gbWFza1Rva2VuLm1hdGNoZXNbdG5keF0uaXNRdWFudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBoYW5kbGVNYXRjaChtYXNrVG9rZW4ubWF0Y2hlc1t0bmR4XSwgWyB0bmR4IF0uY29uY2F0KGxvb3BOZHgpLCBxdWFudGlmaWVyUmVjdXJzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggJiYgdGVzdFBvcyA9PT0gcG9zKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFBvcyA+IHBvcykgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZHhJbnRsenIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdGVzdCwgcHJldmlvdXNQb3MgPSBwb3MgLSAxOyAodGVzdCA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twcmV2aW91c1Bvc10gfHwgZ2V0TWFza1NldCgpLnRlc3RzW3ByZXZpb3VzUG9zXSkgPT09IHVuZGVmaW5lZCAmJiBwcmV2aW91c1BvcyA+IC0xOyApIHByZXZpb3VzUG9zLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0ICE9PSB1bmRlZmluZWQgJiYgcHJldmlvdXNQb3MgPiAtMSAmJiAobmR4SW5pdGlhbGl6ZXIgPSBmdW5jdGlvbihwb3MsIHRlc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2F0b3IgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5pc0FycmF5KHRlc3RzKSB8fCAodGVzdHMgPSBbIHRlc3RzIF0pLCB0ZXN0cy5sZW5ndGggPiAwICYmICh0ZXN0c1swXS5hbHRlcm5hdGlvbiA9PT0gdW5kZWZpbmVkID8gMCA9PT0gKGxvY2F0b3IgPSBkZXRlcm1pbmVUZXN0VGVtcGxhdGUocG9zLCB0ZXN0cy5zbGljZSgpKS5sb2NhdG9yLnNsaWNlKCkpLmxlbmd0aCAmJiAobG9jYXRvciA9IHRlc3RzWzBdLmxvY2F0b3Iuc2xpY2UoKSkgOiAkLmVhY2godGVzdHMsIGZ1bmN0aW9uKG5keCwgdHN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIlwiICE9PSB0c3QuZGVmKSBpZiAoMCA9PT0gbG9jYXRvci5sZW5ndGgpIGxvY2F0b3IgPSB0c3QubG9jYXRvci5zbGljZSgpOyBlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRvci5sZW5ndGg7IGkrKykgdHN0LmxvY2F0b3JbaV0gJiYgLTEgPT09IGxvY2F0b3JbaV0udG9TdHJpbmcoKS5pbmRleE9mKHRzdC5sb2NhdG9yW2ldKSAmJiAobG9jYXRvcltpXSArPSBcIixcIiArIHRzdC5sb2NhdG9yW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksIGxvY2F0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KHByZXZpb3VzUG9zLCB0ZXN0KSwgY2FjaGVEZXBlbmRlbmN5ID0gbmR4SW5pdGlhbGl6ZXIuam9pbihcIlwiKSwgdGVzdFBvcyA9IHByZXZpb3VzUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0TWFza1NldCgpLnRlc3RzW3Bvc10gJiYgZ2V0TWFza1NldCgpLnRlc3RzW3Bvc11bMF0uY2QgPT09IGNhY2hlRGVwZW5kZW5jeSkgcmV0dXJuIGdldE1hc2tTZXQoKS50ZXN0c1twb3NdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtdG5keCA9IG5keEluaXRpYWxpemVyLnNoaWZ0KCk7IG10bmR4IDwgbWFza1Rva2Vucy5sZW5ndGg7IG10bmR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlVGVzdEZyb21Ub2tlbihtYXNrVG9rZW5zW210bmR4XSwgbmR4SW5pdGlhbGl6ZXIsIFsgbXRuZHggXSkgJiYgdGVzdFBvcyA9PT0gcG9zIHx8IHRlc3RQb3MgPiBwb3MpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAoMCA9PT0gbWF0Y2hlcy5sZW5ndGggfHwgaW5zZXJ0U3RvcCkgJiYgbWF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxpdHk6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRvcjogW10sXG4gICAgICAgICAgICAgICAgICAgIG1sb2M6IHt9LFxuICAgICAgICAgICAgICAgICAgICBjZDogY2FjaGVEZXBlbmRlbmN5XG4gICAgICAgICAgICAgICAgfSksIG5keEludGx6ciAhPT0gdW5kZWZpbmVkICYmIGdldE1hc2tTZXQoKS50ZXN0c1twb3NdID8gJC5leHRlbmQoITAsIFtdLCBtYXRjaGVzKSA6IChnZXRNYXNrU2V0KCkudGVzdHNbcG9zXSA9ICQuZXh0ZW5kKCEwLCBbXSwgbWF0Y2hlcyksIFxuICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS50ZXN0c1twb3NdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEJ1ZmZlclRlbXBsYXRlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRNYXNrU2V0KCkuX2J1ZmZlciA9PT0gdW5kZWZpbmVkICYmIChnZXRNYXNrU2V0KCkuX2J1ZmZlciA9IGdldE1hc2tUZW1wbGF0ZSghMSwgMSksIFxuICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS5idWZmZXIgPT09IHVuZGVmaW5lZCAmJiAoZ2V0TWFza1NldCgpLmJ1ZmZlciA9IGdldE1hc2tTZXQoKS5fYnVmZmVyLnNsaWNlKCkpKSwgXG4gICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLl9idWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRCdWZmZXIobm9DYWNoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRNYXNrU2V0KCkuYnVmZmVyICE9PSB1bmRlZmluZWQgJiYgITAgIT09IG5vQ2FjaGUgfHwgKGdldE1hc2tTZXQoKS5idWZmZXIgPSBnZXRNYXNrVGVtcGxhdGUoITAsIGdldExhc3RWYWxpZFBvc2l0aW9uKCksICEwKSksIFxuICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS5idWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiByZWZyZXNoRnJvbUJ1ZmZlcihzdGFydCwgZW5kLCBidWZmZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgcDtcbiAgICAgICAgICAgICAgICBpZiAoITAgPT09IHN0YXJ0KSByZXNldE1hc2tTZXQoKSwgc3RhcnQgPSAwLCBlbmQgPSBidWZmZXIubGVuZ3RoOyBlbHNlIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIGRlbGV0ZSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgZm9yIChwID0gc3RhcnQsIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSBpZiAocmVzZXRNYXNrU2V0KCEwKSwgYnVmZmVyW2ldICE9PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbFJlc3VsdCA9IGlzVmFsaWQocCwgYnVmZmVyW2ldLCAhMCwgITApO1xuICAgICAgICAgICAgICAgICAgICAhMSAhPT0gdmFsUmVzdWx0ICYmIChyZXNldE1hc2tTZXQoITApLCBwID0gdmFsUmVzdWx0LmNhcmV0ICE9PSB1bmRlZmluZWQgPyB2YWxSZXN1bHQuY2FyZXQgOiB2YWxSZXN1bHQucG9zICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tBbHRlcm5hdGlvbk1hdGNoKGFsdEFycjEsIGFsdEFycjIsIG5hKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFOZHgsIGFsdEFyckMgPSBvcHRzLmdyZWVkeSA/IGFsdEFycjIgOiBhbHRBcnIyLnNsaWNlKDAsIDEpLCBpc01hdGNoID0gITEsIG5hQXJyID0gbmEgIT09IHVuZGVmaW5lZCA/IG5hLnNwbGl0KFwiLFwiKSA6IFtdLCBpID0gMDsgaSA8IG5hQXJyLmxlbmd0aDsgaSsrKSAtMSAhPT0gKG5hTmR4ID0gYWx0QXJyMS5pbmRleE9mKG5hQXJyW2ldKSkgJiYgYWx0QXJyMS5zcGxpY2UobmFOZHgsIDEpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGFsbmR4ID0gMDsgYWxuZHggPCBhbHRBcnIxLmxlbmd0aDsgYWxuZHgrKykgaWYgKC0xICE9PSAkLmluQXJyYXkoYWx0QXJyMVthbG5keF0sIGFsdEFyckMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzTWF0Y2ggPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpc01hdGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gYWx0ZXJuYXRlKHBvcywgYywgc3RyaWN0LCBmcm9tU2V0VmFsaWQsIHJBbHRQb3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdEFsdCwgYWx0ZXJuYXRpb24sIGFsdFBvcywgcHJldkFsdFBvcywgaSwgdmFsaWRQb3MsIGRlY2lzaW9uUG9zLCB2YWxpZFBzQ2xvbmUgPSAkLmV4dGVuZCghMCwge30sIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucyksIGlzVmFsaWRSc2x0ID0gITEsIGxBbHRQb3MgPSByQWx0UG9zICE9PSB1bmRlZmluZWQgPyByQWx0UG9zIDogZ2V0TGFzdFZhbGlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoLTEgPT09IGxBbHRQb3MgJiYgckFsdFBvcyA9PT0gdW5kZWZpbmVkKSBhbHRlcm5hdGlvbiA9IChwcmV2QWx0UG9zID0gZ2V0VGVzdChsYXN0QWx0ID0gMCkpLmFsdGVybmF0aW9uOyBlbHNlIGZvciAoO2xBbHRQb3MgPj0gMDsgbEFsdFBvcy0tKSBpZiAoKGFsdFBvcyA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tsQWx0UG9zXSkgJiYgYWx0UG9zLmFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZBbHRQb3MgJiYgcHJldkFsdFBvcy5sb2NhdG9yW2FsdFBvcy5hbHRlcm5hdGlvbl0gIT09IGFsdFBvcy5sb2NhdG9yW2FsdFBvcy5hbHRlcm5hdGlvbl0pIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBsYXN0QWx0ID0gbEFsdFBvcywgYWx0ZXJuYXRpb24gPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbGFzdEFsdF0uYWx0ZXJuYXRpb24sIFxuICAgICAgICAgICAgICAgICAgICBwcmV2QWx0UG9zID0gYWx0UG9zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBkZWNpc2lvblBvcyA9IHBhcnNlSW50KGxhc3RBbHQpLCBnZXRNYXNrU2V0KCkuZXhjbHVkZXNbZGVjaXNpb25Qb3NdID0gZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXSB8fCBbXSwgXG4gICAgICAgICAgICAgICAgICAgICEwICE9PSBwb3MgJiYgZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXS5wdXNoKGdldERlY2lzaW9uVGFrZXIocHJldkFsdFBvcykpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWRJbnB1dHNDbG9uZSA9IFtdLCBzdGF0aWNJbnB1dHNCZWZvcmVQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBkZWNpc2lvblBvczsgaSA8IGdldExhc3RWYWxpZFBvc2l0aW9uKHVuZGVmaW5lZCwgITApICsgMTsgaSsrKSAodmFsaWRQb3MgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV0pICYmICEwICE9PSB2YWxpZFBvcy5nZW5lcmF0ZWRJbnB1dCA/IHZhbGlkSW5wdXRzQ2xvbmUucHVzaCh2YWxpZFBvcy5pbnB1dCkgOiBpIDwgcG9zICYmIHN0YXRpY0lucHV0c0JlZm9yZVBvcysrLCBcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7Z2V0TWFza1NldCgpLmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXSAmJiBnZXRNYXNrU2V0KCkuZXhjbHVkZXNbZGVjaXNpb25Qb3NdLmxlbmd0aCA8IDEwOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3NPZmZzZXQgPSAtMSAqIHN0YXRpY0lucHV0c0JlZm9yZVBvcywgdmFsaWRJbnB1dHMgPSB2YWxpZElucHV0c0Nsb25lLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGdldE1hc2tTZXQoKS50ZXN0c1tkZWNpc2lvblBvc10gPSB1bmRlZmluZWQsIHJlc2V0TWFza1NldCghMCksIGlzVmFsaWRSc2x0ID0gITA7IHZhbGlkSW5wdXRzLmxlbmd0aCA+IDA7ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHZhbGlkSW5wdXRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaXNWYWxpZFJzbHQgPSBpc1ZhbGlkKGdldExhc3RWYWxpZFBvc2l0aW9uKHVuZGVmaW5lZCwgITApICsgMSwgaW5wdXQsICExLCBmcm9tU2V0VmFsaWQsICEwKSkpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWRSc2x0ICYmIGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRMdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbihwb3MpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBkZWNpc2lvblBvczsgaSA8IGdldExhc3RWYWxpZFBvc2l0aW9uKCkgKyAxOyBpKyspICgodmFsaWRQb3MgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV0pID09PSB1bmRlZmluZWQgfHwgbnVsbCA9PSB2YWxpZFBvcy5tYXRjaC5mbikgJiYgaSA8IHBvcyArIHBvc09mZnNldCAmJiBwb3NPZmZzZXQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkUnNsdCA9IGlzVmFsaWQoKHBvcyArPSBwb3NPZmZzZXQpID4gdGFyZ2V0THZwID8gdGFyZ2V0THZwIDogcG9zLCBjLCBzdHJpY3QsIGZyb21TZXRWYWxpZCwgITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWRSc2x0KSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNldE1hc2tTZXQoKSwgcHJldkFsdFBvcyA9IGdldFRlc3QoZGVjaXNpb25Qb3MpLCBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnMgPSAkLmV4dGVuZCghMCwge30sIHZhbGlkUHNDbG9uZSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgIWdldE1hc2tTZXQoKS5leGNsdWRlc1tkZWNpc2lvblBvc10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkUnNsdCA9IGFsdGVybmF0ZShwb3MsIGMsIHN0cmljdCwgZnJvbVNldFZhbGlkLCBkZWNpc2lvblBvcyAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlY2lzaW9uVGFrZXIgPSBnZXREZWNpc2lvblRha2VyKHByZXZBbHRQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0xICE9PSBnZXRNYXNrU2V0KCkuZXhjbHVkZXNbZGVjaXNpb25Qb3NdLmluZGV4T2YoZGVjaXNpb25UYWtlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkUnNsdCA9IGFsdGVybmF0ZShwb3MsIGMsIHN0cmljdCwgZnJvbVNldFZhbGlkLCBkZWNpc2lvblBvcyAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChnZXRNYXNrU2V0KCkuZXhjbHVkZXNbZGVjaXNpb25Qb3NdLnB1c2goZGVjaXNpb25UYWtlciksIGkgPSBkZWNpc2lvblBvczsgaSA8IGdldExhc3RWYWxpZFBvc2l0aW9uKHVuZGVmaW5lZCwgITApICsgMTsgaSsrKSBkZWxldGUgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRNYXNrU2V0KCkuZXhjbHVkZXNbZGVjaXNpb25Qb3NdID0gdW5kZWZpbmVkLCBpc1ZhbGlkUnNsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzVmFsaWQocG9zLCBjLCBzdHJpY3QsIGZyb21TZXRWYWxpZCwgZnJvbUFsdGVybmF0ZSwgdmFsaWRhdGVPbmx5KSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaXNTZWxlY3Rpb24ocG9zT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1JUTCA/IHBvc09iai5iZWdpbiAtIHBvc09iai5lbmQgPiAxIHx8IHBvc09iai5iZWdpbiAtIHBvc09iai5lbmQgPT0gMSA6IHBvc09iai5lbmQgLSBwb3NPYmouYmVnaW4gPiAxIHx8IHBvc09iai5lbmQgLSBwb3NPYmouYmVnaW4gPT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyaWN0ID0gITAgPT09IHN0cmljdDtcbiAgICAgICAgICAgICAgICB2YXIgbWFza1BvcyA9IHBvcztcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBfaXNWYWxpZChwb3NpdGlvbiwgYywgc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByc2x0ID0gITE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLmVhY2goZ2V0VGVzdHMocG9zaXRpb24pLCBmdW5jdGlvbihuZHgsIHRzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3QgPSB0c3QubWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QnVmZmVyKCEwKSwgITEgIT09IChyc2x0ID0gbnVsbCAhPSB0ZXN0LmZuID8gdGVzdC5mbi50ZXN0KGMsIGdldE1hc2tTZXQoKSwgcG9zaXRpb24sIHN0cmljdCwgb3B0cywgaXNTZWxlY3Rpb24ocG9zKSkgOiAoYyA9PT0gdGVzdC5kZWYgfHwgYyA9PT0gb3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyKSAmJiBcIlwiICE9PSB0ZXN0LmRlZiAmJiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogZ2V0UGxhY2Vob2xkZXIocG9zaXRpb24sIHRlc3QsICEwKSB8fCB0ZXN0LmRlZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtID0gcnNsdC5jICE9PSB1bmRlZmluZWQgPyByc2x0LmMgOiBjLCB2YWxpZGF0ZWRQb3MgPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbSA9IGVsZW0gPT09IG9wdHMuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciAmJiBudWxsID09PSB0ZXN0LmZuID8gZ2V0UGxhY2Vob2xkZXIocG9zaXRpb24sIHRlc3QsICEwKSB8fCB0ZXN0LmRlZiA6IGVsZW0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzbHQucmVtb3ZlICE9PSB1bmRlZmluZWQgJiYgKCQuaXNBcnJheShyc2x0LnJlbW92ZSkgfHwgKHJzbHQucmVtb3ZlID0gWyByc2x0LnJlbW92ZSBdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJzbHQucmVtb3ZlLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYiAtIGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGZ1bmN0aW9uKG5keCwgbG1udCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlTWFzayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogbG1udCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogbG1udCArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCByc2x0Lmluc2VydCAhPT0gdW5kZWZpbmVkICYmICgkLmlzQXJyYXkocnNsdC5pbnNlcnQpIHx8IChyc2x0Lmluc2VydCA9IFsgcnNsdC5pbnNlcnQgXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChyc2x0Lmluc2VydC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBmdW5jdGlvbihuZHgsIGxtbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZChsbW50LnBvcywgbG1udC5jLCAhMCwgZnJvbVNldFZhbGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksICEwICE9PSByc2x0ICYmIHJzbHQucG9zICE9PSB1bmRlZmluZWQgJiYgcnNsdC5wb3MgIT09IHBvc2l0aW9uICYmICh2YWxpZGF0ZWRQb3MgPSByc2x0LnBvcyksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICEwICE9PSByc2x0ICYmIHJzbHQucG9zID09PSB1bmRlZmluZWQgJiYgcnNsdC5jID09PSB1bmRlZmluZWQgPyAhMSA6IChyZXZhbGlkYXRlTWFzayhwb3MsICQuZXh0ZW5kKHt9LCB0c3QsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKGVsZW0sIHRlc3QsIHBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcHRzLmNhc2luZyB8fCB0ZXN0LmNhc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidXBwZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsb3dlclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRpdGxlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc0JlZm9yZSA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3MgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gMCA9PT0gcG9zIHx8IHBvc0JlZm9yZSAmJiBwb3NCZWZvcmUuaW5wdXQgPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoSW5wdXRtYXNrLmtleUNvZGUuU1BBQ0UpID8gZWxlbS50b1VwcGVyQ2FzZSgpIDogZWxlbS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRzLmNhc2luZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zKSwgZWxlbSA9IG9wdHMuY2FzaW5nLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGVsZW0sIHRlc3QsIHZhbGlkYXRlZFBvcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgZnJvbVNldFZhbGlkLCB2YWxpZGF0ZWRQb3MpIHx8IChyc2x0ID0gITEpLCAhMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLCByc2x0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MuYmVnaW4gIT09IHVuZGVmaW5lZCAmJiAobWFza1BvcyA9IGlzUlRMID8gcG9zLmVuZCA6IHBvcy5iZWdpbik7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICEwLCBwb3NpdGlvbnNDbG9uZSA9ICQuZXh0ZW5kKCEwLCB7fSwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zKTtcbiAgICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9wdHMucHJlVmFsaWRhdGlvbikgJiYgIXN0cmljdCAmJiAhMCAhPT0gZnJvbVNldFZhbGlkICYmICEwICE9PSB2YWxpZGF0ZU9ubHkgJiYgKHJlc3VsdCA9IG9wdHMucHJlVmFsaWRhdGlvbihnZXRCdWZmZXIoKSwgbWFza1BvcywgYywgaXNTZWxlY3Rpb24ocG9zKSwgb3B0cywgZ2V0TWFza1NldCgpKSksIFxuICAgICAgICAgICAgICAgICEwID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWNrYmFja1Bvc2l0aW9ucyh1bmRlZmluZWQsIG1hc2tQb3MsICEwKSwgKG1heExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IG1hc2tQb3MgPCBtYXhMZW5ndGgpICYmIChyZXN1bHQgPSBfaXNWYWxpZChtYXNrUG9zLCBjLCBzdHJpY3QpLCBcbiAgICAgICAgICAgICAgICAgICAgKCFzdHJpY3QgfHwgITAgPT09IGZyb21TZXRWYWxpZCkgJiYgITEgPT09IHJlc3VsdCAmJiAhMCAhPT0gdmFsaWRhdGVPbmx5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRQb3NWYWxpZCA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1ttYXNrUG9zXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFBvc1ZhbGlkIHx8IG51bGwgIT09IGN1cnJlbnRQb3NWYWxpZC5tYXRjaC5mbiB8fCBjdXJyZW50UG9zVmFsaWQubWF0Y2guZGVmICE9PSBjICYmIGMgIT09IG9wdHMuc2tpcE9wdGlvbmFsUGFydENoYXJhY3Rlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgob3B0cy5pbnNlcnRNb2RlIHx8IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tzZWVrTmV4dChtYXNrUG9zKV0gPT09IHVuZGVmaW5lZCkgJiYgIWlzTWFzayhtYXNrUG9zLCAhMCkpIGZvciAodmFyIG5Qb3MgPSBtYXNrUG9zICsgMSwgc25Qb3MgPSBzZWVrTmV4dChtYXNrUG9zKTsgblBvcyA8PSBzblBvczsgblBvcysrKSBpZiAoITEgIT09IChyZXN1bHQgPSBfaXNWYWxpZChuUG9zLCBjLCBzdHJpY3QpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cmFja2JhY2tQb3NpdGlvbnMobWFza1BvcywgcmVzdWx0LnBvcyAhPT0gdW5kZWZpbmVkID8gcmVzdWx0LnBvcyA6IG5Qb3MpIHx8IHJlc3VsdCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tQb3MgPSBuUG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBzZWVrTmV4dChtYXNrUG9zKVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAhMSAhPT0gcmVzdWx0IHx8ICExID09PSBvcHRzLmtlZXBTdGF0aWMgfHwgbnVsbCAhPSBvcHRzLnJlZ2V4ICYmICFpc0NvbXBsZXRlKGdldEJ1ZmZlcigpKSB8fCBzdHJpY3QgfHwgITAgPT09IGZyb21BbHRlcm5hdGUgfHwgKHJlc3VsdCA9IGFsdGVybmF0ZShtYXNrUG9zLCBjLCBzdHJpY3QsIGZyb21TZXRWYWxpZCkpLCBcbiAgICAgICAgICAgICAgICAgICAgITAgPT09IHJlc3VsdCAmJiAocmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBtYXNrUG9zXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9wdHMucG9zdFZhbGlkYXRpb24pICYmICExICE9PSByZXN1bHQgJiYgIXN0cmljdCAmJiAhMCAhPT0gZnJvbVNldFZhbGlkICYmICEwICE9PSB2YWxpZGF0ZU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc3RSZXN1bHQgPSBvcHRzLnBvc3RWYWxpZGF0aW9uKGdldEJ1ZmZlcighMCksIHJlc3VsdCwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3N0UmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3N0UmVzdWx0LnJlZnJlc2hGcm9tQnVmZmVyICYmIHBvc3RSZXN1bHQuYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZnJlc2ggPSBwb3N0UmVzdWx0LnJlZnJlc2hGcm9tQnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hGcm9tQnVmZmVyKCEwID09PSByZWZyZXNoID8gcmVmcmVzaCA6IHJlZnJlc2guc3RhcnQsIHJlZnJlc2guZW5kLCBwb3N0UmVzdWx0LmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAhMCA9PT0gcG9zdFJlc3VsdCA/IHJlc3VsdCA6IHBvc3RSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAmJiByZXN1bHQucG9zID09PSB1bmRlZmluZWQgJiYgKHJlc3VsdC5wb3MgPSBtYXNrUG9zKSwgITEgIT09IHJlc3VsdCAmJiAhMCAhPT0gdmFsaWRhdGVPbmx5IHx8IChyZXNldE1hc2tTZXQoITApLCBcbiAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnMgPSAkLmV4dGVuZCghMCwge30sIHBvc2l0aW9uc0Nsb25lKSksIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRyYWNrYmFja1Bvc2l0aW9ucyhvcmlnaW5hbFBvcywgbmV3UG9zLCBmaWxsT25seSkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsUG9zID09PSB1bmRlZmluZWQpIGZvciAob3JpZ2luYWxQb3MgPSBuZXdQb3MgLSAxOyBvcmlnaW5hbFBvcyA+IDAgJiYgIWdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tvcmlnaW5hbFBvc107IG9yaWdpbmFsUG9zLS0pIDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcyA9IG9yaWdpbmFsUG9zOyBwcyA8IG5ld1BvczsgcHMrKykgaWYgKGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twc10gPT09IHVuZGVmaW5lZCAmJiAhaXNNYXNrKHBzLCAhMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZwID0gMCA9PSBwcyA/IGdldFRlc3QocHMpIDogZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3BzIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRzdExvY2F0b3IsIHRhcmdldExvY2F0b3IgPSBnZXRMb2NhdG9yKHZwKSwgdGVzdHMgPSBnZXRUZXN0cyhwcykuc2xpY2UoKSwgY2xvc2VzdCA9IHVuZGVmaW5lZCwgYmVzdE1hdGNoID0gZ2V0VGVzdChwcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiA9PT0gdGVzdHNbdGVzdHMubGVuZ3RoIC0gMV0ubWF0Y2guZGVmICYmIHRlc3RzLnBvcCgpLCAkLmVhY2godGVzdHMsIGZ1bmN0aW9uKG5keCwgdHN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHN0TG9jYXRvciA9IGdldExvY2F0b3IodHN0LCB0YXJnZXRMb2NhdG9yLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5hYnModHN0TG9jYXRvciAtIHRhcmdldExvY2F0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbG9zZXN0ID09PSB1bmRlZmluZWQgfHwgZGlzdGFuY2UgPCBjbG9zZXN0KSAmJiBudWxsID09PSB0c3QubWF0Y2guZm4gJiYgITAgIT09IHRzdC5tYXRjaC5vcHRpb25hbGl0eSAmJiAhMCAhPT0gdHN0Lm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciAmJiAoY2xvc2VzdCA9IGRpc3RhbmNlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2ggPSB0c3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksIChiZXN0TWF0Y2ggPSAkLmV4dGVuZCh7fSwgYmVzdE1hdGNoLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGdldFBsYWNlaG9sZGVyKHBzLCBiZXN0TWF0Y2gubWF0Y2gsICEwKSB8fCBiZXN0TWF0Y2gubWF0Y2guZGVmXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkuZ2VuZXJhdGVkSW5wdXQgPSAhMCwgcmV2YWxpZGF0ZU1hc2socHMsIGJlc3RNYXRjaCwgITApLCAhMCAhPT0gZmlsbE9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3ZwSW5wdXQgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbmV3UG9zXS5pbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbmV3UG9zXSA9IHVuZGVmaW5lZCwgcmVzdWx0ID0gaXNWYWxpZChuZXdQb3MsIGN2cElucHV0LCAhMCwgITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiByZXZhbGlkYXRlTWFzayhwb3MsIHZhbGlkVGVzdCwgZnJvbVNldFZhbGlkLCB2YWxpZGF0ZWRQb3MpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBJc0VuY2xvc2VkU3RhdGljKHBvcywgdmFsaWRzLCBzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc01hdGNoID0gdmFsaWRzW3Bvc107XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NNYXRjaCAhPT0gdW5kZWZpbmVkICYmIChudWxsID09PSBwb3NNYXRjaC5tYXRjaC5mbiAmJiAhMCAhPT0gcG9zTWF0Y2gubWF0Y2gub3B0aW9uYWxpdHkgfHwgcG9zTWF0Y2guaW5wdXQgPT09IG9wdHMucmFkaXhQb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2TWF0Y2ggPSBzZWxlY3Rpb24uYmVnaW4gPD0gcG9zIC0gMSA/IHZhbGlkc1twb3MgLSAxXSAmJiBudWxsID09PSB2YWxpZHNbcG9zIC0gMV0ubWF0Y2guZm4gJiYgdmFsaWRzW3BvcyAtIDFdIDogdmFsaWRzW3BvcyAtIDFdLCBuZXh0TWF0Y2ggPSBzZWxlY3Rpb24uZW5kID4gcG9zICsgMSA/IHZhbGlkc1twb3MgKyAxXSAmJiBudWxsID09PSB2YWxpZHNbcG9zICsgMV0ubWF0Y2guZm4gJiYgdmFsaWRzW3BvcyArIDFdIDogdmFsaWRzW3BvcyArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZNYXRjaCAmJiBuZXh0TWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgYmVnaW4gPSBwb3MuYmVnaW4gIT09IHVuZGVmaW5lZCA/IHBvcy5iZWdpbiA6IHBvcywgZW5kID0gcG9zLmVuZCAhPT0gdW5kZWZpbmVkID8gcG9zLmVuZCA6IHBvcztcbiAgICAgICAgICAgICAgICBpZiAocG9zLmJlZ2luID4gcG9zLmVuZCAmJiAoYmVnaW4gPSBwb3MuZW5kLCBlbmQgPSBwb3MuYmVnaW4pLCB2YWxpZGF0ZWRQb3MgPSB2YWxpZGF0ZWRQb3MgIT09IHVuZGVmaW5lZCA/IHZhbGlkYXRlZFBvcyA6IGJlZ2luLCBcbiAgICAgICAgICAgICAgICBiZWdpbiAhPT0gZW5kIHx8IG9wdHMuaW5zZXJ0TW9kZSAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbdmFsaWRhdGVkUG9zXSAhPT0gdW5kZWZpbmVkICYmIGZyb21TZXRWYWxpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbnNDbG9uZSA9ICQuZXh0ZW5kKCEwLCB7fSwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zKSwgbHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24odW5kZWZpbmVkLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoZ2V0TWFza1NldCgpLnAgPSBiZWdpbiwgaSA9IGx2cDsgaSA+PSBiZWdpbjsgaS0tKSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV0gJiYgXCIrXCIgPT09IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXS5tYXRjaC5uYXRpdmVEZWYgJiYgKG9wdHMuaXNOZWdhdGl2ZSA9ICExKSwgXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWxpZCA9ICEwLCBqID0gdmFsaWRhdGVkUG9zLCBuZWVkc1ZhbGlkYXRpb24gPSAoZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zLCBcbiAgICAgICAgICAgICAgICAgICAgITEpLCBwb3NNYXRjaCA9IGosIGkgPSBqO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhbGlkVGVzdCAmJiAoZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3ZhbGlkYXRlZFBvc10gPSAkLmV4dGVuZCghMCwge30sIHZhbGlkVGVzdCksIFxuICAgICAgICAgICAgICAgICAgICBwb3NNYXRjaCsrLCBqKyssIGJlZ2luIDwgZW5kICYmIGkrKyk7IGkgPD0gbHZwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gcG9zaXRpb25zQ2xvbmVbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodCAhPT0gdW5kZWZpbmVkICYmIChpID49IGVuZCB8fCBpID49IGJlZ2luICYmICEwICE9PSB0LmdlbmVyYXRlZElucHV0ICYmIElzRW5jbG9zZWRTdGF0aWMoaSwgcG9zaXRpb25zQ2xvbmUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogYmVnaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoO1wiXCIgIT09IGdldFRlc3QocG9zTWF0Y2gpLm1hdGNoLmRlZjsgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMSA9PT0gbmVlZHNWYWxpZGF0aW9uICYmIHBvc2l0aW9uc0Nsb25lW3Bvc01hdGNoXSAmJiBwb3NpdGlvbnNDbG9uZVtwb3NNYXRjaF0ubWF0Y2gubmF0aXZlRGVmID09PSB0Lm1hdGNoLm5hdGl2ZURlZikgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc01hdGNoXSA9ICQuZXh0ZW5kKCEwLCB7fSwgcG9zaXRpb25zQ2xvbmVbcG9zTWF0Y2hdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NNYXRjaF0uaW5wdXQgPSB0LmlucHV0LCB0cmFja2JhY2tQb3NpdGlvbnModW5kZWZpbmVkLCBwb3NNYXRjaCwgITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IHBvc01hdGNoICsgMSwgdmFsaWQgPSAhMDsgZWxzZSBpZiAocG9zaXRpb25DYW5NYXRjaERlZmluaXRpb24ocG9zTWF0Y2gsIHQubWF0Y2guZGVmKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGlzVmFsaWQocG9zTWF0Y2gsIHQuaW5wdXQsICEwLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9ICExICE9PSByZXN1bHQsIGogPSByZXN1bHQuY2FyZXQgfHwgcmVzdWx0Lmluc2VydCA/IGdldExhc3RWYWxpZFBvc2l0aW9uKCkgOiBwb3NNYXRjaCArIDEsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVlZHNWYWxpZGF0aW9uID0gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoISh2YWxpZCA9ICEwID09PSB0LmdlbmVyYXRlZElucHV0IHx8IHQuaW5wdXQgPT09IG9wdHMucmFkaXhQb2ludCAmJiAhMCA9PT0gb3B0cy5udW1lcmljSW5wdXQpICYmIFwiXCIgPT09IGdldFRlc3QocG9zTWF0Y2gpLm1hdGNoLmRlZikgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc01hdGNoKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIgPT0gZ2V0VGVzdChwb3NNYXRjaCkubWF0Y2guZGVmICYmICh2YWxpZCA9ICExKSwgcG9zTWF0Y2ggPSBqO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkgcmV0dXJuIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucyA9ICQuZXh0ZW5kKCEwLCB7fSwgcG9zaXRpb25zQ2xvbmUpLCBcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRNYXNrU2V0KCEwKSwgITE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHZhbGlkVGVzdCAmJiAoZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3ZhbGlkYXRlZFBvc10gPSAkLmV4dGVuZCghMCwge30sIHZhbGlkVGVzdCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNldE1hc2tTZXQoITApLCAhMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzTWFzayhwb3MsIHN0cmljdCkge1xuICAgICAgICAgICAgICAgIHZhciB0ZXN0ID0gZ2V0VGVzdFRlbXBsYXRlKHBvcykubWF0Y2g7XG4gICAgICAgICAgICAgICAgaWYgKFwiXCIgPT09IHRlc3QuZGVmICYmICh0ZXN0ID0gZ2V0VGVzdChwb3MpLm1hdGNoKSwgbnVsbCAhPSB0ZXN0LmZuKSByZXR1cm4gdGVzdC5mbjtcbiAgICAgICAgICAgICAgICBpZiAoITAgIT09IHN0cmljdCAmJiBwb3MgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdHMgPSBnZXRUZXN0cyhwb3MpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVzdHMubGVuZ3RoID4gMSArIChcIlwiID09PSB0ZXN0c1t0ZXN0cy5sZW5ndGggLSAxXS5tYXRjaC5kZWYgPyAxIDogMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlZWtOZXh0KHBvcywgbmV3QmxvY2spIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwb3NpdGlvbiA9IHBvcyArIDE7IFwiXCIgIT09IGdldFRlc3QocG9zaXRpb24pLm1hdGNoLmRlZiAmJiAoITAgPT09IG5ld0Jsb2NrICYmICghMCAhPT0gZ2V0VGVzdChwb3NpdGlvbikubWF0Y2gubmV3QmxvY2tNYXJrZXIgfHwgIWlzTWFzayhwb3NpdGlvbikpIHx8ICEwICE9PSBuZXdCbG9jayAmJiAhaXNNYXNrKHBvc2l0aW9uKSk7ICkgcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBzZWVrUHJldmlvdXMocG9zLCBuZXdCbG9jaykge1xuICAgICAgICAgICAgICAgIHZhciB0ZXN0cywgcG9zaXRpb24gPSBwb3M7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IDApIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIGZvciAoOy0tcG9zaXRpb24gPiAwICYmICghMCA9PT0gbmV3QmxvY2sgJiYgITAgIT09IGdldFRlc3QocG9zaXRpb24pLm1hdGNoLm5ld0Jsb2NrTWFya2VyIHx8ICEwICE9PSBuZXdCbG9jayAmJiAhaXNNYXNrKHBvc2l0aW9uKSAmJiAoKHRlc3RzID0gZ2V0VGVzdHMocG9zaXRpb24pKS5sZW5ndGggPCAyIHx8IDIgPT09IHRlc3RzLmxlbmd0aCAmJiBcIlwiID09PSB0ZXN0c1sxXS5tYXRjaC5kZWYpKTsgKSA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlciwgY2FyZXRQb3MsIGV2ZW50LCB0cmlnZ2VyRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmICQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlV3JpdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBvcHRzLm9uQmVmb3JlV3JpdGUuY2FsbChpbnB1dG1hc2ssIGV2ZW50LCBidWZmZXIsIGNhcmV0UG9zLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZWZyZXNoRnJvbUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZyZXNoID0gcmVzdWx0LnJlZnJlc2hGcm9tQnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hGcm9tQnVmZmVyKCEwID09PSByZWZyZXNoID8gcmVmcmVzaCA6IHJlZnJlc2guc3RhcnQsIHJlZnJlc2guZW5kLCByZXN1bHQuYnVmZmVyIHx8IGJ1ZmZlciksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGdldEJ1ZmZlcighMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldFBvcyAhPT0gdW5kZWZpbmVkICYmIChjYXJldFBvcyA9IHJlc3VsdC5jYXJldCAhPT0gdW5kZWZpbmVkID8gcmVzdWx0LmNhcmV0IDogY2FyZXRQb3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbnB1dCAhPT0gdW5kZWZpbmVkICYmIChpbnB1dC5pbnB1dG1hc2suX3ZhbHVlU2V0KGJ1ZmZlci5qb2luKFwiXCIpKSwgY2FyZXRQb3MgPT09IHVuZGVmaW5lZCB8fCBldmVudCAhPT0gdW5kZWZpbmVkICYmIFwiYmx1clwiID09PSBldmVudC50eXBlID8gcmVuZGVyQ29sb3JNYXNrKGlucHV0LCBjYXJldFBvcywgMCA9PT0gYnVmZmVyLmxlbmd0aCkgOiBjYXJldChpbnB1dCwgY2FyZXRQb3MpLCBcbiAgICAgICAgICAgICAgICAhMCA9PT0gdHJpZ2dlckV2ZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQoaW5wdXQpLCBucHRWYWwgPSBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNraXBJbnB1dEV2ZW50ID0gITAsICRpbnB1dC50cmlnZ2VyKFwiaW5wdXRcIiksIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBucHRWYWwgPT09IGdldEJ1ZmZlclRlbXBsYXRlKCkuam9pbihcIlwiKSA/ICRpbnB1dC50cmlnZ2VyKFwiY2xlYXJlZFwiKSA6ICEwID09PSBpc0NvbXBsZXRlKGJ1ZmZlcikgJiYgJGlucHV0LnRyaWdnZXIoXCJjb21wbGV0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UGxhY2Vob2xkZXIocG9zLCB0ZXN0LCByZXR1cm5QTCkge1xuICAgICAgICAgICAgICAgIGlmICgodGVzdCA9IHRlc3QgfHwgZ2V0VGVzdChwb3MpLm1hdGNoKS5wbGFjZWhvbGRlciAhPT0gdW5kZWZpbmVkIHx8ICEwID09PSByZXR1cm5QTCkgcmV0dXJuICQuaXNGdW5jdGlvbih0ZXN0LnBsYWNlaG9sZGVyKSA/IHRlc3QucGxhY2Vob2xkZXIob3B0cykgOiB0ZXN0LnBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgICAgIGlmIChudWxsID09PSB0ZXN0LmZuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3MgPiAtMSAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldlRlc3QsIHRlc3RzID0gZ2V0VGVzdHMocG9zKSwgc3RhdGljQWx0ZXJuYXRpb25zID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVzdHMubGVuZ3RoID4gMSArIChcIlwiID09PSB0ZXN0c1t0ZXN0cy5sZW5ndGggLSAxXS5tYXRjaC5kZWYgPyAxIDogMCkpIGZvciAodmFyIGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspIGlmICghMCAhPT0gdGVzdHNbaV0ubWF0Y2gub3B0aW9uYWxpdHkgJiYgITAgIT09IHRlc3RzW2ldLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciAmJiAobnVsbCA9PT0gdGVzdHNbaV0ubWF0Y2guZm4gfHwgcHJldlRlc3QgPT09IHVuZGVmaW5lZCB8fCAhMSAhPT0gdGVzdHNbaV0ubWF0Y2guZm4udGVzdChwcmV2VGVzdC5tYXRjaC5kZWYsIGdldE1hc2tTZXQoKSwgcG9zLCAhMCwgb3B0cykpICYmIChzdGF0aWNBbHRlcm5hdGlvbnMucHVzaCh0ZXN0c1tpXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA9PT0gdGVzdHNbaV0ubWF0Y2guZm4gJiYgKHByZXZUZXN0ID0gdGVzdHNbaV0pLCBzdGF0aWNBbHRlcm5hdGlvbnMubGVuZ3RoID4gMSAmJiAvWzAtOWEtYkEtWl0vLnRlc3Qoc3RhdGljQWx0ZXJuYXRpb25zWzBdLm1hdGNoLmRlZikpKSByZXR1cm4gb3B0cy5wbGFjZWhvbGRlci5jaGFyQXQocG9zICUgb3B0cy5wbGFjZWhvbGRlci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0LmRlZjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KHBvcyAlIG9wdHMucGxhY2Vob2xkZXIubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZUJ1ZmZlciwgRXZlbnRSdWxlciA9IHtcbiAgICAgICAgICAgICAgICBvbjogZnVuY3Rpb24oaW5wdXQsIGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldiA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmlucHV0bWFzayA9PT0gdW5kZWZpbmVkICYmIFwiRk9STVwiICE9PSB0aGlzLm5vZGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltT3B0cyA9ICQuZGF0YSh0aGF0LCBcIl9pbnB1dG1hc2tfb3B0c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbU9wdHMgPyBuZXcgSW5wdXRtYXNrKGltT3B0cykubWFzayh0aGF0KSA6IEV2ZW50UnVsZXIub2ZmKHRoYXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJzZXR2YWx1ZVwiID09PSBlLnR5cGUgfHwgXCJGT1JNXCIgPT09IHRoaXMubm9kZU5hbWUgfHwgISh0aGF0LmRpc2FibGVkIHx8IHRoYXQucmVhZE9ubHkgJiYgIShcImtleWRvd25cIiA9PT0gZS50eXBlICYmIGUuY3RybEtleSAmJiA2NyA9PT0gZS5rZXlDb2RlIHx8ICExID09PSBvcHRzLnRhYlRocm91Z2ggJiYgZS5rZXlDb2RlID09PSBJbnB1dG1hc2sua2V5Q29kZS5UQUIpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbnB1dFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwID09PSBza2lwSW5wdXRFdmVudCkgcmV0dXJuIHNraXBJbnB1dEV2ZW50ID0gITEsIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFja0NhcmV0ID0gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlci5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKSwgITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJrZXlkb3duXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwS2V5UHJlc3NFdmVudCA9ICExLCBza2lwSW5wdXRFdmVudCA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwia2V5cHJlc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gc2tpcEtleVByZXNzRXZlbnQpIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwS2V5UHJlc3NFdmVudCA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2xpY2tcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZW1vYmlsZSB8fCBpcGhvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIuYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCksICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5WYWwgPSBldmVudEhhbmRsZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNrQ2FyZXQgJiYgKHRyYWNrQ2FyZXQgPSAhMSwgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KHRoYXQsIHRoYXQuaW5wdXRtYXNrLmNhcmV0UG9zLCB1bmRlZmluZWQsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCAhMSA9PT0gcmV0dXJuVmFsICYmIChlLnByZXZlbnREZWZhdWx0KCksIGUuc3RvcFByb3BhZ2F0aW9uKCkpLCByZXR1cm5WYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuaW5wdXRtYXNrLmV2ZW50c1tldmVudE5hbWVdID0gaW5wdXQuaW5wdXRtYXNrLmV2ZW50c1tldmVudE5hbWVdIHx8IFtdLCBpbnB1dC5pbnB1dG1hc2suZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChldiksIFxuICAgICAgICAgICAgICAgICAgICAtMSAhPT0gJC5pbkFycmF5KGV2ZW50TmFtZSwgWyBcInN1Ym1pdFwiLCBcInJlc2V0XCIgXSkgPyBudWxsICE9PSBpbnB1dC5mb3JtICYmICQoaW5wdXQuZm9ybSkub24oZXZlbnROYW1lLCBldikgOiAkKGlucHV0KS5vbihldmVudE5hbWUsIGV2KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9mZjogZnVuY3Rpb24oaW5wdXQsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldmVudHM7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmlucHV0bWFzayAmJiBpbnB1dC5pbnB1dG1hc2suZXZlbnRzICYmIChldmVudCA/IChldmVudHMgPSBbXSlbZXZlbnRdID0gaW5wdXQuaW5wdXRtYXNrLmV2ZW50c1tldmVudF0gOiBldmVudHMgPSBpbnB1dC5pbnB1dG1hc2suZXZlbnRzLCBcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGV2ZW50cywgZnVuY3Rpb24oZXZlbnROYW1lLCBldkFycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7ZXZBcnIubGVuZ3RoID4gMDsgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ID0gZXZBcnIucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLTEgIT09ICQuaW5BcnJheShldmVudE5hbWUsIFsgXCJzdWJtaXRcIiwgXCJyZXNldFwiIF0pID8gbnVsbCAhPT0gaW5wdXQuZm9ybSAmJiAkKGlucHV0LmZvcm0pLm9mZihldmVudE5hbWUsIGV2KSA6ICQoaW5wdXQpLm9mZihldmVudE5hbWUsIGV2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnB1dC5pbnB1dG1hc2suZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBFdmVudEhhbmRsZXJzID0ge1xuICAgICAgICAgICAgICAgIGtleWRvd25FdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLCAkaW5wdXQgPSAkKGlucHV0KSwgayA9IGUua2V5Q29kZSwgcG9zID0gY2FyZXQoaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuQkFDS1NQQUNFIHx8IGsgPT09IElucHV0bWFzay5rZXlDb2RlLkRFTEVURSB8fCBpcGhvbmUgJiYgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuQkFDS1NQQUNFX1NBRkFSSSB8fCBlLmN0cmxLZXkgJiYgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuWCAmJiAhaXNJbnB1dEV2ZW50U3VwcG9ydGVkKFwiY3V0XCIpKSBlLnByZXZlbnREZWZhdWx0KCksIFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZW1vdmUoaW5wdXQsIGssIHBvcyksIHdyaXRlQnVmZmVyKGlucHV0LCBnZXRCdWZmZXIoITApLCBnZXRNYXNrU2V0KCkucCwgZSwgaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpKTsgZWxzZSBpZiAoayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuRU5EIHx8IGsgPT09IElucHV0bWFzay5rZXlDb2RlLlBBR0VfRE9XTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gc2Vla05leHQoZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmluc2VydE1vZGUgfHwgY2FyZXRQb3MgIT09IGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoIHx8IGUuc2hpZnRLZXkgfHwgY2FyZXRQb3MtLSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgZS5zaGlmdEtleSA/IHBvcy5iZWdpbiA6IGNhcmV0UG9zLCBjYXJldFBvcywgITApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuSE9NRSAmJiAhZS5zaGlmdEtleSB8fCBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5QQUdFX1VQID8gKGUucHJldmVudERlZmF1bHQoKSwgXG4gICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCAwLCBlLnNoaWZ0S2V5ID8gcG9zLmJlZ2luIDogMCwgITApKSA6IChvcHRzLnVuZG9PbkVzY2FwZSAmJiBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5FU0NBUEUgfHwgOTAgPT09IGsgJiYgZS5jdHJsS2V5KSAmJiAhMCAhPT0gZS5hbHRLZXkgPyAoY2hlY2tWYWwoaW5wdXQsICEwLCAhMSwgdW5kb1ZhbHVlLnNwbGl0KFwiXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiY2xpY2tcIikpIDogayAhPT0gSW5wdXRtYXNrLmtleUNvZGUuSU5TRVJUIHx8IGUuc2hpZnRLZXkgfHwgZS5jdHJsS2V5ID8gITAgPT09IG9wdHMudGFiVGhyb3VnaCAmJiBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5UQUIgPyAoITAgPT09IGUuc2hpZnRLZXkgPyAobnVsbCA9PT0gZ2V0VGVzdChwb3MuYmVnaW4pLm1hdGNoLmZuICYmIChwb3MuYmVnaW4gPSBzZWVrTmV4dChwb3MuYmVnaW4pKSwgXG4gICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBzZWVrUHJldmlvdXMocG9zLmJlZ2luLCAhMCksIHBvcy5iZWdpbiA9IHNlZWtQcmV2aW91cyhwb3MuZW5kLCAhMCkpIDogKHBvcy5iZWdpbiA9IHNlZWtOZXh0KHBvcy5iZWdpbiwgITApLCBcbiAgICAgICAgICAgICAgICAgICAgcG9zLmVuZCA9IHNlZWtOZXh0KHBvcy5iZWdpbiwgITApLCBwb3MuZW5kIDwgZ2V0TWFza1NldCgpLm1hc2tMZW5ndGggJiYgcG9zLmVuZC0tKSwgXG4gICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA8IGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoICYmIChlLnByZXZlbnREZWZhdWx0KCksIGNhcmV0KGlucHV0LCBwb3MuYmVnaW4sIHBvcy5lbmQpKSkgOiBlLnNoaWZ0S2V5IHx8ICExID09PSBvcHRzLmluc2VydE1vZGUgJiYgKGsgPT09IElucHV0bWFzay5rZXlDb2RlLlJJR0hUID8gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBjYXJldFBvcy5iZWdpbik7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApIDogayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuTEVGVCAmJiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gY2FyZXQoaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIGlzUlRMID8gY2FyZXRQb3MuYmVnaW4gKyAxIDogY2FyZXRQb3MuYmVnaW4gLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCkpIDogKG9wdHMuaW5zZXJ0TW9kZSA9ICFvcHRzLmluc2VydE1vZGUsIGNhcmV0KGlucHV0LCBvcHRzLmluc2VydE1vZGUgfHwgcG9zLmJlZ2luICE9PSBnZXRNYXNrU2V0KCkubWFza0xlbmd0aCA/IHBvcy5iZWdpbiA6IHBvcy5iZWdpbiAtIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5vbktleURvd24uY2FsbCh0aGlzLCBlLCBnZXRCdWZmZXIoKSwgY2FyZXQoaW5wdXQpLmJlZ2luLCBvcHRzKSwgaWdub3JhYmxlID0gLTEgIT09ICQuaW5BcnJheShrLCBvcHRzLmlnbm9yYWJsZXMpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAga2V5cHJlc3NFdmVudDogZnVuY3Rpb24oZSwgY2hlY2t2YWwsIHdyaXRlT3V0LCBzdHJpY3QsIG5keCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLCAkaW5wdXQgPSAkKGlucHV0KSwgayA9IGUud2hpY2ggfHwgZS5jaGFyQ29kZSB8fCBlLmtleUNvZGU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKCEwID09PSBjaGVja3ZhbCB8fCBlLmN0cmxLZXkgJiYgZS5hbHRLZXkpICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5IHx8IGlnbm9yYWJsZSkpIHJldHVybiBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5FTlRFUiAmJiB1bmRvVmFsdWUgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikgJiYgKHVuZG9WYWx1ZSA9IGdldEJ1ZmZlcigpLmpvaW4oXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJjaGFuZ2VcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApKSwgITA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICA0NiA9PT0gayAmJiAhMSA9PT0gZS5zaGlmdEtleSAmJiBcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgKGsgPSBvcHRzLnJhZGl4UG9pbnQuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yd2FyZFBvc2l0aW9uLCBwb3MgPSBjaGVja3ZhbCA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogbmR4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogbmR4XG4gICAgICAgICAgICAgICAgICAgICAgICB9IDogY2FyZXQoaW5wdXQpLCBjID0gU3RyaW5nLmZyb21DaGFyQ29kZShrKSwgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLl9yYWRpeERhbmNlICYmIG9wdHMubnVtZXJpY0lucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gZ2V0QnVmZmVyKCkuaW5kZXhPZihvcHRzLnJhZGl4UG9pbnQuY2hhckF0KDApKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luIDw9IGNhcmV0UG9zICYmIChrID09PSBvcHRzLnJhZGl4UG9pbnQuY2hhckNvZGVBdCgwKSAmJiAob2Zmc2V0ID0gMSksIHBvcy5iZWdpbiAtPSAxLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kIC09IDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLndyaXRlT3V0QnVmZmVyID0gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsUmVzdWx0ID0gaXNWYWxpZChwb3MsIGMsIHN0cmljdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoITEgIT09IHZhbFJlc3VsdCAmJiAocmVzZXRNYXNrU2V0KCEwKSwgZm9yd2FyZFBvc2l0aW9uID0gdmFsUmVzdWx0LmNhcmV0ICE9PSB1bmRlZmluZWQgPyB2YWxSZXN1bHQuY2FyZXQgOiBzZWVrTmV4dCh2YWxSZXN1bHQucG9zLmJlZ2luID8gdmFsUmVzdWx0LnBvcy5iZWdpbiA6IHZhbFJlc3VsdC5wb3MpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS5wID0gZm9yd2FyZFBvc2l0aW9uKSwgZm9yd2FyZFBvc2l0aW9uID0gKG9wdHMubnVtZXJpY0lucHV0ICYmIHZhbFJlc3VsdC5jYXJldCA9PT0gdW5kZWZpbmVkID8gc2Vla1ByZXZpb3VzKGZvcndhcmRQb3NpdGlvbikgOiBmb3J3YXJkUG9zaXRpb24pICsgb2Zmc2V0LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICExICE9PSB3cml0ZU91dCAmJiAoc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLm9uS2V5VmFsaWRhdGlvbi5jYWxsKGlucHV0LCBrLCB2YWxSZXN1bHQsIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCksIGdldE1hc2tTZXQoKS53cml0ZU91dEJ1ZmZlciAmJiAhMSAhPT0gdmFsUmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBnZXRCdWZmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgYnVmZmVyLCBmb3J3YXJkUG9zaXRpb24sIGUsICEwICE9PSBjaGVja3ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCgpLCBjaGVja3ZhbCkgcmV0dXJuICExICE9PSB2YWxSZXN1bHQgJiYgKHZhbFJlc3VsdC5mb3J3YXJkUG9zaXRpb24gPSBmb3J3YXJkUG9zaXRpb24pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGFzdGVFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcFZhbHVlLCBldiA9IGUub3JpZ2luYWxFdmVudCB8fCBlLCBpbnB1dFZhbHVlID0gKCQodGhpcyksIHRoaXMuaW5wdXRtYXNrLl92YWx1ZUdldCghMCkpLCBjYXJldFBvcyA9IGNhcmV0KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpc1JUTCAmJiAodGVtcFZhbHVlID0gY2FyZXRQb3MuZW5kLCBjYXJldFBvcy5lbmQgPSBjYXJldFBvcy5iZWdpbiwgY2FyZXRQb3MuYmVnaW4gPSB0ZW1wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVCZWZvcmVDYXJldCA9IGlucHV0VmFsdWUuc3Vic3RyKDAsIGNhcmV0UG9zLmJlZ2luKSwgdmFsdWVBZnRlckNhcmV0ID0gaW5wdXRWYWx1ZS5zdWJzdHIoY2FyZXRQb3MuZW5kLCBpbnB1dFZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZUJlZm9yZUNhcmV0ID09PSAoaXNSVEwgPyBnZXRCdWZmZXJUZW1wbGF0ZSgpLnJldmVyc2UoKSA6IGdldEJ1ZmZlclRlbXBsYXRlKCkpLnNsaWNlKDAsIGNhcmV0UG9zLmJlZ2luKS5qb2luKFwiXCIpICYmICh2YWx1ZUJlZm9yZUNhcmV0ID0gXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUFmdGVyQ2FyZXQgPT09IChpc1JUTCA/IGdldEJ1ZmZlclRlbXBsYXRlKCkucmV2ZXJzZSgpIDogZ2V0QnVmZmVyVGVtcGxhdGUoKSkuc2xpY2UoY2FyZXRQb3MuZW5kKS5qb2luKFwiXCIpICYmICh2YWx1ZUFmdGVyQ2FyZXQgPSBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIGlzUlRMICYmICh0ZW1wVmFsdWUgPSB2YWx1ZUJlZm9yZUNhcmV0LCB2YWx1ZUJlZm9yZUNhcmV0ID0gdmFsdWVBZnRlckNhcmV0LCB2YWx1ZUFmdGVyQ2FyZXQgPSB0ZW1wVmFsdWUpLCBcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsaXBib2FyZERhdGEgJiYgd2luZG93LmNsaXBib2FyZERhdGEuZ2V0RGF0YSkgaW5wdXRWYWx1ZSA9IHZhbHVlQmVmb3JlQ2FyZXQgKyB3aW5kb3cuY2xpcGJvYXJkRGF0YS5nZXREYXRhKFwiVGV4dFwiKSArIHZhbHVlQWZ0ZXJDYXJldDsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWV2LmNsaXBib2FyZERhdGEgfHwgIWV2LmNsaXBib2FyZERhdGEuZ2V0RGF0YSkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IHZhbHVlQmVmb3JlQ2FyZXQgKyBldi5jbGlwYm9hcmREYXRhLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpICsgdmFsdWVBZnRlckNhcmV0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXN0ZVZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlUGFzdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoITEgPT09IChwYXN0ZVZhbHVlID0gb3B0cy5vbkJlZm9yZVBhc3RlLmNhbGwoaW5wdXRtYXNrLCBpbnB1dFZhbHVlLCBvcHRzKSkpIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXN0ZVZhbHVlIHx8IChwYXN0ZVZhbHVlID0gaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrVmFsKHRoaXMsICExLCAhMSwgaXNSVEwgPyBwYXN0ZVZhbHVlLnNwbGl0KFwiXCIpLnJldmVyc2UoKSA6IHBhc3RlVmFsdWUudG9TdHJpbmcoKS5zcGxpdChcIlwiKSksIFxuICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcih0aGlzLCBnZXRCdWZmZXIoKSwgc2Vla05leHQoZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSksIGUsIHVuZG9WYWx1ZSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSksIFxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnB1dEZhbGxCYWNrRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcywgaW5wdXRWYWx1ZSA9IGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdldEJ1ZmZlcigpLmpvaW4oXCJcIikgIT09IGlucHV0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dFZhbHVlID0gZnVuY3Rpb24oaW5wdXQsIGlucHV0VmFsdWUsIGNhcmV0UG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGllbW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dENoYXIgPSBpbnB1dFZhbHVlLnJlcGxhY2UoZ2V0QnVmZmVyKCkuam9pbihcIlwiKSwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxID09PSBpbnB1dENoYXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXYgPSBpbnB1dFZhbHVlLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXYuc3BsaWNlKGNhcmV0UG9zLmJlZ2luLCAwLCBpbnB1dENoYXIpLCBpbnB1dFZhbHVlID0gaXYuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0oMCwgaW5wdXRWYWx1ZSA9IGZ1bmN0aW9uKGlucHV0LCBpbnB1dFZhbHVlLCBjYXJldFBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIi5cIiA9PT0gaW5wdXRWYWx1ZS5jaGFyQXQoY2FyZXRQb3MuYmVnaW4gLSAxKSAmJiBcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgKChpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zcGxpdChcIlwiKSlbY2FyZXRQb3MuYmVnaW4gLSAxXSA9IG9wdHMucmFkaXhQb2ludC5jaGFyQXQoMCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLmpvaW4oXCJcIikpLCBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSgwLCBpbnB1dFZhbHVlLCBjYXJldFBvcyksIGNhcmV0UG9zKSwgZ2V0QnVmZmVyKCkuam9pbihcIlwiKSAhPT0gaW5wdXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpLCBvZmZzZXQgPSAhb3B0cy5udW1lcmljSW5wdXQgJiYgaW5wdXRWYWx1ZS5sZW5ndGggPiBidWZmZXIubGVuZ3RoID8gLTEgOiAwLCBmcm9udFBhcnQgPSBpbnB1dFZhbHVlLnN1YnN0cigwLCBjYXJldFBvcy5iZWdpbiksIGJhY2tQYXJ0ID0gaW5wdXRWYWx1ZS5zdWJzdHIoY2FyZXRQb3MuYmVnaW4pLCBmcm9udEJ1ZmZlclBhcnQgPSBidWZmZXIuc3Vic3RyKDAsIGNhcmV0UG9zLmJlZ2luICsgb2Zmc2V0KSwgYmFja0J1ZmZlclBhcnQgPSBidWZmZXIuc3Vic3RyKGNhcmV0UG9zLmJlZ2luICsgb2Zmc2V0KSwgc2VsZWN0aW9uID0gY2FyZXRQb3MsIGVudHJpZXMgPSBcIlwiLCBpc0VudHJ5ID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZyb250UGFydCAhPT0gZnJvbnRCdWZmZXJQYXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGZwbCA9IChpc0VudHJ5ID0gZnJvbnRQYXJ0Lmxlbmd0aCA+PSBmcm9udEJ1ZmZlclBhcnQubGVuZ3RoKSA/IGZyb250UGFydC5sZW5ndGggOiBmcm9udEJ1ZmZlclBhcnQubGVuZ3RoLCBpID0gMDsgZnJvbnRQYXJ0LmNoYXJBdChpKSA9PT0gZnJvbnRCdWZmZXJQYXJ0LmNoYXJBdChpKSAmJiBpIDwgZnBsOyBpKyspIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbnRyeSAmJiAoMCA9PT0gb2Zmc2V0ICYmIChzZWxlY3Rpb24uYmVnaW4gPSBpKSwgZW50cmllcyArPSBmcm9udFBhcnQuc2xpY2UoaSwgc2VsZWN0aW9uLmVuZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFja1BhcnQgIT09IGJhY2tCdWZmZXJQYXJ0ICYmIChiYWNrUGFydC5sZW5ndGggPiBiYWNrQnVmZmVyUGFydC5sZW5ndGggPyBlbnRyaWVzICs9IGJhY2tQYXJ0LnNsaWNlKDAsIDEpIDogYmFja1BhcnQubGVuZ3RoIDwgYmFja0J1ZmZlclBhcnQubGVuZ3RoICYmIChzZWxlY3Rpb24uZW5kICs9IGJhY2tCdWZmZXJQYXJ0Lmxlbmd0aCAtIGJhY2tQYXJ0Lmxlbmd0aCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbnRyeSB8fCBcIlwiID09PSBvcHRzLnJhZGl4UG9pbnQgfHwgXCJcIiAhPT0gYmFja1BhcnQgfHwgZnJvbnRQYXJ0LmNoYXJBdChzZWxlY3Rpb24uYmVnaW4gKyBvZmZzZXQgLSAxKSAhPT0gb3B0cy5yYWRpeFBvaW50IHx8IChzZWxlY3Rpb24uYmVnaW4tLSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cmllcyA9IG9wdHMucmFkaXhQb2ludCkpKSwgd3JpdGVCdWZmZXIoaW5wdXQsIGdldEJ1ZmZlcigpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBzZWxlY3Rpb24uYmVnaW4gKyBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogc2VsZWN0aW9uLmVuZCArIG9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBlbnRyaWVzLmxlbmd0aCA+IDApICQuZWFjaChlbnRyaWVzLnNwbGl0KFwiXCIpLCBmdW5jdGlvbihuZHgsIGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlwcmVzcyA9IG5ldyAkLkV2ZW50KFwia2V5cHJlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXByZXNzLndoaWNoID0gZW50cnkuY2hhckNvZGVBdCgwKSwgaWdub3JhYmxlID0gITEsIEV2ZW50SGFuZGxlcnMua2V5cHJlc3NFdmVudC5jYWxsKGlucHV0LCBrZXlwcmVzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYmVnaW4gPT09IHNlbGVjdGlvbi5lbmQgLSAxICYmIChzZWxlY3Rpb24uYmVnaW4gPSBzZWVrUHJldmlvdXMoc2VsZWN0aW9uLmJlZ2luICsgMSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYmVnaW4gPT09IHNlbGVjdGlvbi5lbmQgLSAxID8gY2FyZXQoaW5wdXQsIHNlbGVjdGlvbi5iZWdpbikgOiBjYXJldChpbnB1dCwgc2VsZWN0aW9uLmJlZ2luLCBzZWxlY3Rpb24uZW5kKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlkb3duID0gbmV3ICQuRXZlbnQoXCJrZXlkb3duXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlkb3duLmtleUNvZGUgPSBvcHRzLm51bWVyaWNJbnB1dCA/IElucHV0bWFzay5rZXlDb2RlLkJBQ0tTUEFDRSA6IElucHV0bWFzay5rZXlDb2RlLkRFTEVURSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV2ZW50SGFuZGxlcnMua2V5ZG93bkV2ZW50LmNhbGwoaW5wdXQsIGtleWRvd24pLCAhMSA9PT0gb3B0cy5pbnNlcnRNb2RlICYmIGNhcmV0KGlucHV0LCBjYXJldChpbnB1dCkuYmVnaW4gLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRWYWx1ZUV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRtYXNrLnJlZnJlc2hWYWx1ZSA9ICExO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAodmFsdWUgPSBlICYmIGUuZGV0YWlsID8gZS5kZXRhaWxbMF0gOiBhcmd1bWVudHNbMV0pIHx8IHRoaXMuaW5wdXRtYXNrLl92YWx1ZUdldCghMCk7XG4gICAgICAgICAgICAgICAgICAgICQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlTWFzaykgJiYgKHZhbHVlID0gb3B0cy5vbkJlZm9yZU1hc2suY2FsbChpbnB1dG1hc2ssIHZhbHVlLCBvcHRzKSB8fCB2YWx1ZSksIFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiXCIpLCBjaGVja1ZhbCh0aGlzLCAhMCwgITEsIGlzUlRMID8gdmFsdWUucmV2ZXJzZSgpIDogdmFsdWUpLCBcbiAgICAgICAgICAgICAgICAgICAgdW5kb1ZhbHVlID0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSwgKG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgfHwgb3B0cy5jbGVhckluY29tcGxldGUpICYmIHRoaXMuaW5wdXRtYXNrLl92YWx1ZUdldCgpID09PSBnZXRCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oXCJcIikgJiYgdGhpcy5pbnB1dG1hc2suX3ZhbHVlU2V0KFwiXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZm9jdXNFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnB0VmFsdWUgPSB0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5zaG93TWFza09uRm9jdXMgJiYgKCFvcHRzLnNob3dNYXNrT25Ib3ZlciB8fCBvcHRzLnNob3dNYXNrT25Ib3ZlciAmJiBcIlwiID09PSBucHRWYWx1ZSkgJiYgKHRoaXMuaW5wdXRtYXNrLl92YWx1ZUdldCgpICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpID8gd3JpdGVCdWZmZXIodGhpcywgZ2V0QnVmZmVyKCksIHNlZWtOZXh0KGdldExhc3RWYWxpZFBvc2l0aW9uKCkpKSA6ICExID09PSBtb3VzZUVudGVyICYmIGNhcmV0KHRoaXMsIHNlZWtOZXh0KGdldExhc3RWYWxpZFBvc2l0aW9uKCkpKSksIFxuICAgICAgICAgICAgICAgICAgICAhMCA9PT0gb3B0cy5wb3NpdGlvbkNhcmV0T25UYWIgJiYgITEgPT09IG1vdXNlRW50ZXIgJiYgRXZlbnRIYW5kbGVycy5jbGlja0V2ZW50LmFwcGx5KHRoaXMsIFsgZSwgITAgXSksIFxuICAgICAgICAgICAgICAgICAgICB1bmRvVmFsdWUgPSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW91c2VsZWF2ZUV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb3VzZUVudGVyID0gITEsIG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEJ1ZmZlcigpLnNsaWNlKCksIG5wdFZhbHVlID0gdGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBucHRWYWx1ZSAhPT0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiKSAmJiBcIlwiICE9PSBucHRWYWx1ZSAmJiAoLTEgPT09IGdldExhc3RWYWxpZFBvc2l0aW9uKCkgJiYgbnB0VmFsdWUgPT09IGdldEJ1ZmZlclRlbXBsYXRlKCkuam9pbihcIlwiKSA/IGJ1ZmZlciA9IFtdIDogY2xlYXJPcHRpb25hbFRhaWwoYnVmZmVyKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcih0aGlzLCBidWZmZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xpY2tFdmVudDogZnVuY3Rpb24oZSwgdGFiYmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRDYXJldCA9IGNhcmV0KGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFiYmVkICYmIChpc1JUTCA/IHNlbGVjdGVkQ2FyZXQuZW5kID0gc2VsZWN0ZWRDYXJldC5iZWdpbiA6IHNlbGVjdGVkQ2FyZXQuYmVnaW4gPSBzZWxlY3RlZENhcmV0LmVuZCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2FyZXQuYmVnaW4gPT09IHNlbGVjdGVkQ2FyZXQuZW5kKSBzd2l0Y2ggKG9wdHMucG9zaXRpb25DYXJldE9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJub25lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCAwLCBnZXRCdWZmZXIoKS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJhZGl4Rm9jdXNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmN0aW9uKGNsaWNrUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiAhPT0gb3B0cy5yYWRpeFBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZwcyA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodnBzW2NsaWNrUG9zXSA9PT0gdW5kZWZpbmVkIHx8IHZwc1tjbGlja1Bvc10uaW5wdXQgPT09IGdldFBsYWNlaG9sZGVyKGNsaWNrUG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tQb3MgPCBzZWVrTmV4dCgtMSkpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGl4UG9zID0gJC5pbkFycmF5KG9wdHMucmFkaXhQb2ludCwgZ2V0QnVmZmVyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgIT09IHJhZGl4UG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB2cCBpbiB2cHMpIGlmIChyYWRpeFBvcyA8IHZwICYmIHZwc1t2cF0uaW5wdXQgIT09IGdldFBsYWNlaG9sZGVyKHZwKSkgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KHNlbGVjdGVkQ2FyZXQuYmVnaW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhQb3MgPSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBvcHRzLm51bWVyaWNJbnB1dCA/IHNlZWtOZXh0KHJhZGl4UG9zKSA6IHJhZGl4UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpZ25vcmVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIHNlZWtOZXh0KGdldExhc3RWYWxpZFBvc2l0aW9uKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGlja1Bvc2l0aW9uID0gc2VsZWN0ZWRDYXJldC5iZWdpbiwgbHZjbGlja1Bvc2l0aW9uID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oY2xpY2tQb3NpdGlvbiwgITApLCBsYXN0UG9zaXRpb24gPSBzZWVrTmV4dChsdmNsaWNrUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tQb3NpdGlvbiA8IGxhc3RQb3NpdGlvbikgY2FyZXQoaW5wdXQsIGlzTWFzayhjbGlja1Bvc2l0aW9uLCAhMCkgfHwgaXNNYXNrKGNsaWNrUG9zaXRpb24gLSAxLCAhMCkgPyBjbGlja1Bvc2l0aW9uIDogc2Vla05leHQoY2xpY2tQb3NpdGlvbikpOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsdnAgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbHZjbGlja1Bvc2l0aW9uXSwgdHQgPSBnZXRUZXN0VGVtcGxhdGUobGFzdFBvc2l0aW9uLCBsdnAgPyBsdnAubWF0Y2gubG9jYXRvciA6IHVuZGVmaW5lZCwgbHZwKSwgcGxhY2Vob2xkZXIgPSBnZXRQbGFjZWhvbGRlcihsYXN0UG9zaXRpb24sIHR0Lm1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIlwiICE9PSBwbGFjZWhvbGRlciAmJiBnZXRCdWZmZXIoKVtsYXN0UG9zaXRpb25dICE9PSBwbGFjZWhvbGRlciAmJiAhMCAhPT0gdHQubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICYmICEwICE9PSB0dC5tYXRjaC5uZXdCbG9ja01hcmtlciB8fCAhaXNNYXNrKGxhc3RQb3NpdGlvbiwgb3B0cy5rZWVwU3RhdGljKSAmJiB0dC5tYXRjaC5kZWYgPT09IHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BvcyA9IHNlZWtOZXh0KGxhc3RQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrUG9zaXRpb24gPj0gbmV3UG9zIHx8IGNsaWNrUG9zaXRpb24gPT09IGxhc3RQb3NpdGlvbikgJiYgKGxhc3RQb3NpdGlvbiA9IG5ld1Bvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgbGFzdFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYmxjbGlja0V2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgMCwgc2Vla05leHQoZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSkpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGN1dEV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBjYXJldCh0aGlzKSwgZXYgPSBlLm9yaWdpbmFsRXZlbnQgfHwgZSwgY2xpcGJvYXJkRGF0YSA9IHdpbmRvdy5jbGlwYm9hcmREYXRhIHx8IGV2LmNsaXBib2FyZERhdGEsIGNsaXBEYXRhID0gaXNSVEwgPyBnZXRCdWZmZXIoKS5zbGljZShwb3MuZW5kLCBwb3MuYmVnaW4pIDogZ2V0QnVmZmVyKCkuc2xpY2UocG9zLmJlZ2luLCBwb3MuZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgY2xpcGJvYXJkRGF0YS5zZXREYXRhKFwidGV4dFwiLCBpc1JUTCA/IGNsaXBEYXRhLnJldmVyc2UoKS5qb2luKFwiXCIpIDogY2xpcERhdGEuam9pbihcIlwiKSksIFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCAmJiBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIiksIGhhbmRsZVJlbW92ZSh0aGlzLCBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEUsIHBvcyksIFxuICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcih0aGlzLCBnZXRCdWZmZXIoKSwgZ2V0TWFza1NldCgpLnAsIGUsIHVuZG9WYWx1ZSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBibHVyRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0bWFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5wdFZhbHVlID0gdGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCksIGJ1ZmZlciA9IGdldEJ1ZmZlcigpLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIlwiID09PSBucHRWYWx1ZSAmJiBjb2xvck1hc2sgPT09IHVuZGVmaW5lZCB8fCAob3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiAoLTEgPT09IGdldExhc3RWYWxpZFBvc2l0aW9uKCkgJiYgbnB0VmFsdWUgPT09IGdldEJ1ZmZlclRlbXBsYXRlKCkuam9pbihcIlwiKSA/IGJ1ZmZlciA9IFtdIDogY2xlYXJPcHRpb25hbFRhaWwoYnVmZmVyKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgITEgPT09IGlzQ29tcGxldGUoYnVmZmVyKSAmJiAoc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudHJpZ2dlcihcImluY29tcGxldGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKSwgb3B0cy5jbGVhckluY29tcGxldGUgJiYgKHJlc2V0TWFza1NldCgpLCBidWZmZXIgPSBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzID8gW10gOiBnZXRCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKCkpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcih0aGlzLCBidWZmZXIsIHVuZGVmaW5lZCwgZSkpLCB1bmRvVmFsdWUgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikgJiYgKHVuZG9WYWx1ZSA9IGJ1ZmZlci5qb2luKFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiY2hhbmdlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW91c2VlbnRlckV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdXNlRW50ZXIgPSAhMCwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcyAmJiBvcHRzLnNob3dNYXNrT25Ib3ZlciAmJiB0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoKSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSAmJiB3cml0ZUJ1ZmZlcih0aGlzLCBnZXRCdWZmZXIoKSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdWJtaXRFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB1bmRvVmFsdWUgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikgJiYgJGVsLnRyaWdnZXIoXCJjaGFuZ2VcIiksIG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgJiYgLTEgPT09IGdldExhc3RWYWxpZFBvc2l0aW9uKCkgJiYgZWwuaW5wdXRtYXNrLl92YWx1ZUdldCAmJiBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgPT09IGdldEJ1ZmZlclRlbXBsYXRlKCkuam9pbihcIlwiKSAmJiBlbC5pbnB1dG1hc2suX3ZhbHVlU2V0KFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5jbGVhckluY29tcGxldGUgJiYgITEgPT09IGlzQ29tcGxldGUoZ2V0QnVmZmVyKCkpICYmIGVsLmlucHV0bWFzay5fdmFsdWVTZXQoXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLnJlbW92ZU1hc2tPblN1Ym1pdCAmJiAoZWwuaW5wdXRtYXNrLl92YWx1ZVNldChlbC5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpLCAhMCksIFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoZWwsIGdldEJ1ZmZlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzZXRFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2sucmVmcmVzaFZhbHVlID0gITAsIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwudHJpZ2dlcihcInNldHZhbHVlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tWYWwoaW5wdXQsIHdyaXRlT3V0LCBzdHJpY3QsIG5wdHZsLCBpbml0aWF0aW5nRXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRWYWx1ZSA9IG5wdHZsLnNsaWNlKCksIGNoYXJDb2RlcyA9IFwiXCIsIGluaXRpYWxOZHggPSAtMSwgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGlmIChyZXNldE1hc2tTZXQoKSwgc3RyaWN0IHx8ICEwID09PSBvcHRzLmF1dG9Vbm1hc2spIGluaXRpYWxOZHggPSBzZWVrTmV4dChpbml0aWFsTmR4KTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0aWNJbnB1dCA9IGdldEJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoMCwgc2Vla05leHQoLTEpKS5qb2luKFwiXCIpLCBtYXRjaGVzID0gaW5wdXRWYWx1ZS5qb2luKFwiXCIpLm1hdGNoKG5ldyBSZWdFeHAoXCJeXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgoc3RhdGljSW5wdXQpLCBcImdcIikpO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID4gMCAmJiAoaW5wdXRWYWx1ZS5zcGxpY2UoMCwgbWF0Y2hlcy5sZW5ndGggKiBzdGF0aWNJbnB1dC5sZW5ndGgpLCBcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbE5keCA9IHNlZWtOZXh0KGluaXRpYWxOZHgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLTEgPT09IGluaXRpYWxOZHggPyAoZ2V0TWFza1NldCgpLnAgPSBzZWVrTmV4dChpbml0aWFsTmR4KSwgaW5pdGlhbE5keCA9IDApIDogZ2V0TWFza1NldCgpLnAgPSBpbml0aWFsTmR4LCBcbiAgICAgICAgICAgICAgICAkLmVhY2goaW5wdXRWYWx1ZSwgZnVuY3Rpb24obmR4LCBjaGFyQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgIT09IHVuZGVmaW5lZCkgaWYgKGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tuZHhdID09PSB1bmRlZmluZWQgJiYgaW5wdXRWYWx1ZVtuZHhdID09PSBnZXRQbGFjZWhvbGRlcihuZHgpICYmIGlzTWFzayhuZHgsICEwKSAmJiAhMSA9PT0gaXNWYWxpZChuZHgsIGlucHV0VmFsdWVbbmR4XSwgITAsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCAhMCkpIGdldE1hc2tTZXQoKS5wKys7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleXByZXNzID0gbmV3ICQuRXZlbnQoXCJfY2hlY2t2YWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlwcmVzcy53aGljaCA9IGNoYXJDb2RlLmNoYXJDb2RlQXQoMCksIGNoYXJDb2RlcyArPSBjaGFyQ29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbih1bmRlZmluZWQsICEwKSwgcHJldlRlc3QgPSBnZXRUZXN0KGx2cCksIG5leHRUZXN0ID0gZ2V0VGVzdFRlbXBsYXRlKGx2cCArIDEsIHByZXZUZXN0ID8gcHJldlRlc3QubG9jYXRvci5zbGljZSgpIDogdW5kZWZpbmVkLCBsdnApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmdW5jdGlvbihuZHgsIGNoYXJDb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMSAhPT0gZ2V0TWFza1RlbXBsYXRlKCEwLCAwLCAhMSkuc2xpY2UobmR4LCBzZWVrTmV4dChuZHgpKS5qb2luKFwiXCIpLmluZGV4T2YoY2hhckNvZGVzKSAmJiAhaXNNYXNrKG5keCkgJiYgKGdldFRlc3QobmR4KS5tYXRjaC5uYXRpdmVEZWYgPT09IGNoYXJDb2Rlcy5jaGFyQXQoMCkgfHwgXCIgXCIgPT09IGdldFRlc3QobmR4KS5tYXRjaC5uYXRpdmVEZWYgJiYgZ2V0VGVzdChuZHggKyAxKS5tYXRjaC5uYXRpdmVEZWYgPT09IGNoYXJDb2Rlcy5jaGFyQXQoMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfShpbml0aWFsTmR4LCBjaGFyQ29kZXMpIHx8IHN0cmljdCB8fCBvcHRzLmF1dG9Vbm1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gc3RyaWN0ID8gbmR4IDogbnVsbCA9PSBuZXh0VGVzdC5tYXRjaC5mbiAmJiBuZXh0VGVzdC5tYXRjaC5vcHRpb25hbGl0eSAmJiBsdnAgKyAxIDwgZ2V0TWFza1NldCgpLnAgPyBsdnAgKyAxIDogZ2V0TWFza1NldCgpLnA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCA9IEV2ZW50SGFuZGxlcnMua2V5cHJlc3NFdmVudC5jYWxsKGlucHV0LCBrZXlwcmVzcywgITAsICExLCBzdHJpY3QsIHBvcykpICYmIChpbml0aWFsTmR4ID0gcG9zICsgMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGVzID0gXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcmVzdWx0ID0gRXZlbnRIYW5kbGVycy5rZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQsIGtleXByZXNzLCAhMCwgITEsICEwLCBsdnAgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKHVuZGVmaW5lZCwgZ2V0QnVmZmVyKCksIHJlc3VsdC5mb3J3YXJkUG9zaXRpb24sIGtleXByZXNzLCAhMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSwgd3JpdGVPdXQgJiYgd3JpdGVCdWZmZXIoaW5wdXQsIGdldEJ1ZmZlcigpLCByZXN1bHQgPyByZXN1bHQuZm9yd2FyZFBvc2l0aW9uIDogdW5kZWZpbmVkLCBpbml0aWF0aW5nRXZlbnQgfHwgbmV3ICQuRXZlbnQoXCJjaGVja3ZhbFwiKSwgaW5pdGlhdGluZ0V2ZW50ICYmIFwiaW5wdXRcIiA9PT0gaW5pdGlhdGluZ0V2ZW50LnR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdW5tYXNrZWR2YWx1ZShpbnB1dCkge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuaW5wdXRtYXNrID09PSB1bmRlZmluZWQpIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuaW5wdXRtYXNrICYmIGlucHV0LmlucHV0bWFzay5yZWZyZXNoVmFsdWUgJiYgRXZlbnRIYW5kbGVycy5zZXRWYWx1ZUV2ZW50LmNhbGwoaW5wdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdW1WYWx1ZSA9IFtdLCB2cHMgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnM7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcG5keCBpbiB2cHMpIHZwc1twbmR4XS5tYXRjaCAmJiBudWxsICE9IHZwc1twbmR4XS5tYXRjaC5mbiAmJiB1bVZhbHVlLnB1c2godnBzW3BuZHhdLmlucHV0KTtcbiAgICAgICAgICAgICAgICB2YXIgdW5tYXNrZWRWYWx1ZSA9IDAgPT09IHVtVmFsdWUubGVuZ3RoID8gXCJcIiA6IChpc1JUTCA/IHVtVmFsdWUucmV2ZXJzZSgpIDogdW1WYWx1ZSkuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9wdHMub25Vbk1hc2spKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXJWYWx1ZSA9IChpc1JUTCA/IGdldEJ1ZmZlcigpLnNsaWNlKCkucmV2ZXJzZSgpIDogZ2V0QnVmZmVyKCkpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHVubWFza2VkVmFsdWUgPSBvcHRzLm9uVW5NYXNrLmNhbGwoaW5wdXRtYXNrLCBidWZmZXJWYWx1ZSwgdW5tYXNrZWRWYWx1ZSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB1bm1hc2tlZFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdHJhbnNsYXRlUG9zaXRpb24ocG9zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFpc1JUTCB8fCBcIm51bWJlclwiICE9IHR5cGVvZiBwb3MgfHwgb3B0cy5ncmVlZHkgJiYgXCJcIiA9PT0gb3B0cy5wbGFjZWhvbGRlciB8fCAocG9zID0gZWwuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCAtIHBvcyksIFxuICAgICAgICAgICAgICAgIHBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhcmV0KGlucHV0LCBiZWdpbiwgZW5kLCBub3RyYW5zbGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciByYW5nZTtcbiAgICAgICAgICAgICAgICBpZiAoYmVnaW4gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGlucHV0LnNldFNlbGVjdGlvblJhbmdlID8gKGJlZ2luID0gaW5wdXQuc2VsZWN0aW9uU3RhcnQsIFxuICAgICAgICAgICAgICAgIGVuZCA9IGlucHV0LnNlbGVjdGlvbkVuZCkgOiB3aW5kb3cuZ2V0U2VsZWN0aW9uID8gKHJhbmdlID0gd2luZG93LmdldFNlbGVjdGlvbigpLmdldFJhbmdlQXQoMCkpLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyLnBhcmVudE5vZGUgIT09IGlucHV0ICYmIHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyICE9PSBpbnB1dCB8fCAoYmVnaW4gPSByYW5nZS5zdGFydE9mZnNldCwgXG4gICAgICAgICAgICAgICAgZW5kID0gcmFuZ2UuZW5kT2Zmc2V0KSA6IGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UgJiYgKGVuZCA9IChiZWdpbiA9IDAgLSAocmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKSkuZHVwbGljYXRlKCkubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIC1pbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoKSkgKyByYW5nZS50ZXh0Lmxlbmd0aCksIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW46IG5vdHJhbnNsYXRlID8gYmVnaW4gOiB0cmFuc2xhdGVQb3NpdGlvbihiZWdpbiksXG4gICAgICAgICAgICAgICAgICAgIGVuZDogbm90cmFuc2xhdGUgPyBlbmQgOiB0cmFuc2xhdGVQb3NpdGlvbihlbmQpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoJC5pc0FycmF5KGJlZ2luKSAmJiAoZW5kID0gaXNSVEwgPyBiZWdpblswXSA6IGJlZ2luWzFdLCBiZWdpbiA9IGlzUlRMID8gYmVnaW5bMV0gOiBiZWdpblswXSksIFxuICAgICAgICAgICAgICAgIGJlZ2luLmJlZ2luICE9PSB1bmRlZmluZWQgJiYgKGVuZCA9IGlzUlRMID8gYmVnaW4uYmVnaW4gOiBiZWdpbi5lbmQsIGJlZ2luID0gaXNSVEwgPyBiZWdpbi5lbmQgOiBiZWdpbi5iZWdpbiksIFxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCIgPT0gdHlwZW9mIGJlZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luID0gbm90cmFuc2xhdGUgPyBiZWdpbiA6IHRyYW5zbGF0ZVBvc2l0aW9uKGJlZ2luKSwgZW5kID0gXCJudW1iZXJcIiA9PSB0eXBlb2YgKGVuZCA9IG5vdHJhbnNsYXRlID8gZW5kIDogdHJhbnNsYXRlUG9zaXRpb24oZW5kKSkgPyBlbmQgOiBiZWdpbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbENhbGMgPSBwYXJzZUludCgoKGlucHV0Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93KS5nZXRDb21wdXRlZFN0eWxlID8gKGlucHV0Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93KS5nZXRDb21wdXRlZFN0eWxlKGlucHV0LCBudWxsKSA6IGlucHV0LmN1cnJlbnRTdHlsZSkuZm9udFNpemUpICogZW5kO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuc2Nyb2xsTGVmdCA9IHNjcm9sbENhbGMgPiBpbnB1dC5zY3JvbGxXaWR0aCA/IHNjcm9sbENhbGMgOiAwLCBpcGhvbmUgfHwgITEgIT09IG9wdHMuaW5zZXJ0TW9kZSB8fCBiZWdpbiAhPT0gZW5kIHx8IGVuZCsrLCBcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuaW5wdXRtYXNrLmNhcmV0UG9zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IGJlZ2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBlbmRcbiAgICAgICAgICAgICAgICAgICAgfSwgaW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2UpIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gYmVnaW4sIGlucHV0LnNlbGVjdGlvbkVuZCA9IGVuZDsgZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKSwgaW5wdXQuZmlyc3RDaGlsZCA9PT0gdW5kZWZpbmVkIHx8IG51bGwgPT09IGlucHV0LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zZXRTdGFydChpbnB1dC5maXJzdENoaWxkLCBiZWdpbiA8IGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKS5sZW5ndGggPyBiZWdpbiA6IGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKS5sZW5ndGgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLnNldEVuZChpbnB1dC5maXJzdENoaWxkLCBlbmQgPCBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoID8gZW5kIDogaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UoITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKSwgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlucHV0LmNyZWF0ZVRleHRSYW5nZSAmJiAoKHJhbmdlID0gaW5wdXQuY3JlYXRlVGV4dFJhbmdlKCkpLmNvbGxhcHNlKCEwKSwgXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIiwgZW5kKSwgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIGJlZ2luKSwgcmFuZ2Uuc2VsZWN0KCkpO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJDb2xvck1hc2soaW5wdXQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBiZWdpbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogZW5kXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRldGVybWluZUxhc3RSZXF1aXJlZFBvc2l0aW9uKHJldHVybkRlZmluaXRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zLCB0ZXN0UG9zLCBidWZmZXIgPSBnZXRNYXNrVGVtcGxhdGUoITAsIGdldExhc3RWYWxpZFBvc2l0aW9uKCksICEwLCAhMCksIGJsID0gYnVmZmVyLmxlbmd0aCwgbHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSwgcG9zaXRpb25zID0ge30sIGx2VGVzdCA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tsdnBdLCBuZHhJbnRsenIgPSBsdlRlc3QgIT09IHVuZGVmaW5lZCA/IGx2VGVzdC5sb2NhdG9yLnNsaWNlKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgZm9yIChwb3MgPSBsdnAgKyAxOyBwb3MgPCBidWZmZXIubGVuZ3RoOyBwb3MrKykgbmR4SW50bHpyID0gKHRlc3RQb3MgPSBnZXRUZXN0VGVtcGxhdGUocG9zLCBuZHhJbnRsenIsIHBvcyAtIDEpKS5sb2NhdG9yLnNsaWNlKCksIFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uc1twb3NdID0gJC5leHRlbmQoITAsIHt9LCB0ZXN0UG9zKTtcbiAgICAgICAgICAgICAgICB2YXIgbHZUZXN0QWx0ID0gbHZUZXN0ICYmIGx2VGVzdC5hbHRlcm5hdGlvbiAhPT0gdW5kZWZpbmVkID8gbHZUZXN0LmxvY2F0b3JbbHZUZXN0LmFsdGVybmF0aW9uXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBmb3IgKHBvcyA9IGJsIC0gMTsgcG9zID4gbHZwICYmICgoKHRlc3RQb3MgPSBwb3NpdGlvbnNbcG9zXSkubWF0Y2gub3B0aW9uYWxpdHkgfHwgdGVzdFBvcy5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgJiYgdGVzdFBvcy5tYXRjaC5uZXdCbG9ja01hcmtlciB8fCBsdlRlc3RBbHQgJiYgKGx2VGVzdEFsdCAhPT0gcG9zaXRpb25zW3Bvc10ubG9jYXRvcltsdlRlc3QuYWx0ZXJuYXRpb25dICYmIG51bGwgIT0gdGVzdFBvcy5tYXRjaC5mbiB8fCBudWxsID09PSB0ZXN0UG9zLm1hdGNoLmZuICYmIHRlc3RQb3MubG9jYXRvcltsdlRlc3QuYWx0ZXJuYXRpb25dICYmIGNoZWNrQWx0ZXJuYXRpb25NYXRjaCh0ZXN0UG9zLmxvY2F0b3JbbHZUZXN0LmFsdGVybmF0aW9uXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKSwgbHZUZXN0QWx0LnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpKSAmJiBcIlwiICE9PSBnZXRUZXN0cyhwb3MpWzBdLmRlZikpICYmIGJ1ZmZlcltwb3NdID09PSBnZXRQbGFjZWhvbGRlcihwb3MsIHRlc3RQb3MubWF0Y2gpKTsgcG9zLS0pIGJsLS07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkRlZmluaXRpb24gPyB7XG4gICAgICAgICAgICAgICAgICAgIGw6IGJsLFxuICAgICAgICAgICAgICAgICAgICBkZWY6IHBvc2l0aW9uc1tibF0gPyBwb3NpdGlvbnNbYmxdLm1hdGNoIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSA6IGJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gY2xlYXJPcHRpb25hbFRhaWwoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbG1udCwgdGVtcGxhdGUgPSBnZXRNYXNrVGVtcGxhdGUoITAsIDAsICEwLCB1bmRlZmluZWQsICEwKTsgKGxtbnQgPSB0ZW1wbGF0ZS5zaGlmdCgpKSAhPT0gdW5kZWZpbmVkOyApIGJ1ZmZlci5wdXNoKGxtbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBpc0NvbXBsZXRlKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24ob3B0cy5pc0NvbXBsZXRlKSkgcmV0dXJuIG9wdHMuaXNDb21wbGV0ZShidWZmZXIsIG9wdHMpO1xuICAgICAgICAgICAgICAgIGlmIChcIipcIiA9PT0gb3B0cy5yZXBlYXQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRlID0gITEsIGxycCA9IGRldGVybWluZUxhc3RSZXF1aXJlZFBvc2l0aW9uKCEwKSwgYW1sID0gc2Vla1ByZXZpb3VzKGxycC5sKTtcbiAgICAgICAgICAgICAgICBpZiAobHJwLmRlZiA9PT0gdW5kZWZpbmVkIHx8IGxycC5kZWYubmV3QmxvY2tNYXJrZXIgfHwgbHJwLmRlZi5vcHRpb25hbGl0eSB8fCBscnAuZGVmLm9wdGlvbmFsUXVhbnRpZmllcikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSA9ICEwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBhbWw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3QgPSBnZXRUZXN0VGVtcGxhdGUoaSkubWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVsbCAhPT0gdGVzdC5mbiAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV0gPT09IHVuZGVmaW5lZCAmJiAhMCAhPT0gdGVzdC5vcHRpb25hbGl0eSAmJiAhMCAhPT0gdGVzdC5vcHRpb25hbFF1YW50aWZpZXIgfHwgbnVsbCA9PT0gdGVzdC5mbiAmJiBidWZmZXJbaV0gIT09IGdldFBsYWNlaG9sZGVyKGksIHRlc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcGxldGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVSZW1vdmUoaW5wdXQsIGssIHBvcywgc3RyaWN0LCBmcm9tSXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIGlmICgob3B0cy5udW1lcmljSW5wdXQgfHwgaXNSVEwpICYmIChrID09PSBJbnB1dG1hc2sua2V5Q29kZS5CQUNLU1BBQ0UgPyBrID0gSW5wdXRtYXNrLmtleUNvZGUuREVMRVRFIDogayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuREVMRVRFICYmIChrID0gSW5wdXRtYXNrLmtleUNvZGUuQkFDS1NQQUNFKSwgXG4gICAgICAgICAgICAgICAgaXNSVEwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZW5kID0gcG9zLmVuZDtcbiAgICAgICAgICAgICAgICAgICAgcG9zLmVuZCA9IHBvcy5iZWdpbiwgcG9zLmJlZ2luID0gcGVuZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09IElucHV0bWFzay5rZXlDb2RlLkJBQ0tTUEFDRSAmJiAocG9zLmVuZCAtIHBvcy5iZWdpbiA8IDEgfHwgITEgPT09IG9wdHMuaW5zZXJ0TW9kZSkgPyAocG9zLmJlZ2luID0gc2Vla1ByZXZpb3VzKHBvcy5iZWdpbiksIFxuICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3MuYmVnaW5dICE9PSB1bmRlZmluZWQgJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvcy5iZWdpbl0uaW5wdXQgPT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IgJiYgcG9zLmJlZ2luLS0sIFxuICAgICAgICAgICAgICAgICExID09PSBvcHRzLmluc2VydE1vZGUgJiYgcG9zLmVuZCAhPT0gZ2V0TWFza1NldCgpLm1hc2tMZW5ndGggJiYgcG9zLmVuZC0tKSA6IGsgPT09IElucHV0bWFzay5rZXlDb2RlLkRFTEVURSAmJiBwb3MuYmVnaW4gPT09IHBvcy5lbmQgJiYgKHBvcy5lbmQgPSBpc01hc2socG9zLmVuZCwgITApICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3MuZW5kXSAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zLmVuZF0uaW5wdXQgIT09IG9wdHMucmFkaXhQb2ludCA/IHBvcy5lbmQgKyAxIDogc2Vla05leHQocG9zLmVuZCkgKyAxLCBcbiAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zLmJlZ2luXSAhPT0gdW5kZWZpbmVkICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3MuYmVnaW5dLmlucHV0ID09PSBvcHRzLmdyb3VwU2VwYXJhdG9yICYmIHBvcy5lbmQrKyksIFxuICAgICAgICAgICAgICAgIHJldmFsaWRhdGVNYXNrKHBvcyksICEwICE9PSBzdHJpY3QgJiYgITEgIT09IG9wdHMua2VlcFN0YXRpYyB8fCBudWxsICE9PSBvcHRzLnJlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBhbHRlcm5hdGUoITApO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UG9zID0gcmVzdWx0LmNhcmV0ICE9PSB1bmRlZmluZWQgPyByZXN1bHQuY2FyZXQgOiByZXN1bHQucG9zID8gc2Vla05leHQocmVzdWx0LnBvcy5iZWdpbiA/IHJlc3VsdC5wb3MuYmVnaW4gOiByZXN1bHQucG9zKSA6IGdldExhc3RWYWxpZFBvc2l0aW9uKC0xLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAoayAhPT0gSW5wdXRtYXNrLmtleUNvZGUuREVMRVRFIHx8IHBvcy5iZWdpbiA+IG5ld1BvcykgJiYgcG9zLmJlZ2luO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBsdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbihwb3MuYmVnaW4sICEwKTtcbiAgICAgICAgICAgICAgICBpZiAobHZwIDwgcG9zLmJlZ2luIHx8IC0xID09PSBwb3MuYmVnaW4pIGdldE1hc2tTZXQoKS5wID0gc2Vla05leHQobHZwKTsgZWxzZSBpZiAoITAgIT09IHN0cmljdCAmJiAoZ2V0TWFza1NldCgpLnAgPSBwb3MuYmVnaW4sIFxuICAgICAgICAgICAgICAgICEwICE9PSBmcm9tSXNWYWxpZCkpIGZvciAoO2dldE1hc2tTZXQoKS5wIDwgbHZwICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tnZXRNYXNrU2V0KCkucF0gPT09IHVuZGVmaW5lZDsgKSBnZXRNYXNrU2V0KCkucCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbG9yTWFzayhpbnB1dCkge1xuICAgICAgICAgICAgICAgIHZhciBjb21wdXRlZFN0eWxlID0gKGlucHV0Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93KS5nZXRDb21wdXRlZFN0eWxlKGlucHV0LCBudWxsKTtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlLnN0eWxlLndpZHRoID0gY29tcHV0ZWRTdHlsZS53aWR0aCwgdGVtcGxhdGUuc3R5bGUudGV4dEFsaWduID0gY29tcHV0ZWRTdHlsZS50ZXh0QWxpZ24sIFxuICAgICAgICAgICAgICAgIGNvbG9yTWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksIGlucHV0LmlucHV0bWFzay5jb2xvck1hc2sgPSBjb2xvck1hc2ssIFxuICAgICAgICAgICAgICAgIGNvbG9yTWFzay5jbGFzc05hbWUgPSBcImltLWNvbG9ybWFza1wiLCBpbnB1dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjb2xvck1hc2ssIGlucHV0KSwgXG4gICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnB1dCksIGNvbG9yTWFzay5hcHBlbmRDaGlsZChpbnB1dCksIGNvbG9yTWFzay5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSksIFxuICAgICAgICAgICAgICAgIGlucHV0LnN0eWxlLmxlZnQgPSB0ZW1wbGF0ZS5vZmZzZXRMZWZ0ICsgXCJweFwiLCAkKGNvbG9yTWFzaykub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEV2ZW50SGFuZGxlcnMubW91c2VsZWF2ZUV2ZW50LmNhbGwoaW5wdXQsIFsgZSBdKTtcbiAgICAgICAgICAgICAgICB9KSwgJChjb2xvck1hc2spLm9uKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBFdmVudEhhbmRsZXJzLm1vdXNlZW50ZXJFdmVudC5jYWxsKGlucHV0LCBbIGUgXSk7XG4gICAgICAgICAgICAgICAgfSksICQoY29sb3JNYXNrKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcmV0KGlucHV0LCBmdW5jdGlvbihjbGllbnR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3MsIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHN0eWxlIGluIGNvbXB1dGVkU3R5bGUpIGlzTmFOKHN0eWxlKSAmJiAtMSAhPT0gc3R5bGUuaW5kZXhPZihcImZvbnRcIikgJiYgKGUuc3R5bGVbc3R5bGVdID0gY29tcHV0ZWRTdHlsZVtzdHlsZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdHlsZS50ZXh0VHJhbnNmb3JtID0gY29tcHV0ZWRTdHlsZS50ZXh0VHJhbnNmb3JtLCBlLnN0eWxlLmxldHRlclNwYWNpbmcgPSBjb21wdXRlZFN0eWxlLmxldHRlclNwYWNpbmcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIiwgZS5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIiwgZS5zdHlsZS53aWR0aCA9IFwiYXV0b1wiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCIsIGUuc3R5bGUud2hpdGVTcGFjZSA9IFwibm93cmFwXCIsIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRsLCBpbnB1dFRleHQgPSBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCksIHByZXZpb3VzV2lkdGggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjYXJldFBvcyA9IDAsIGl0bCA9IGlucHV0VGV4dC5sZW5ndGg7IGNhcmV0UG9zIDw9IGl0bDsgY2FyZXRQb3MrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmlubmVySFRNTCArPSBpbnB1dFRleHQuY2hhckF0KGNhcmV0UG9zKSB8fCBcIl9cIiwgZS5vZmZzZXRXaWR0aCA+PSBjbGllbnR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQxID0gY2xpZW50eCAtIHByZXZpb3VzV2lkdGgsIG9mZnNldDIgPSBlLm9mZnNldFdpZHRoIC0gY2xpZW50eDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5pbm5lckhUTUwgPSBpbnB1dFRleHQuY2hhckF0KGNhcmV0UG9zKSwgY2FyZXRQb3MgPSAob2Zmc2V0MSAtPSBlLm9mZnNldFdpZHRoIC8gMykgPCBvZmZzZXQyID8gY2FyZXRQb3MgLSAxIDogY2FyZXRQb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1dpZHRoID0gZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGUpLCBjYXJldFBvcztcbiAgICAgICAgICAgICAgICAgICAgfShlLmNsaWVudFgpKSwgRXZlbnRIYW5kbGVycy5jbGlja0V2ZW50LmNhbGwoaW5wdXQsIFsgZSBdKTtcbiAgICAgICAgICAgICAgICB9KSwgJChpbnB1dCkub24oXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zaGlmdEtleSB8fCAhMSA9PT0gb3B0cy5pbnNlcnRNb2RlIHx8IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJDb2xvck1hc2soaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbmRlckNvbG9yTWFzayhpbnB1dCwgY2FyZXRQb3MsIGNsZWFyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlc3QsIHRlc3RQb3MsIG5keEludGx6ciwgbWFza1RlbXBsYXRlID0gW10sIGlzU3RhdGljID0gITEsIHBvcyA9IDA7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0RW50cnkoZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQgJiYgKGVudHJ5ID0gXCJcIiksIGlzU3RhdGljIHx8IG51bGwgIT09IHRlc3QuZm4gJiYgdGVzdFBvcy5pbnB1dCAhPT0gdW5kZWZpbmVkKSBpZiAoaXNTdGF0aWMgJiYgKG51bGwgIT09IHRlc3QuZm4gJiYgdGVzdFBvcy5pbnB1dCAhPT0gdW5kZWZpbmVkIHx8IFwiXCIgPT09IHRlc3QuZGVmKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNTdGF0aWMgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtdGwgPSBtYXNrVGVtcGxhdGUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFza1RlbXBsYXRlW210bCAtIDFdID0gbWFza1RlbXBsYXRlW210bCAtIDFdICsgXCI8L3NwYW4+XCIsIG1hc2tUZW1wbGF0ZS5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIG1hc2tUZW1wbGF0ZS5wdXNoKGVudHJ5KTsgZWxzZSBpc1N0YXRpYyA9ICEwLCBtYXNrVGVtcGxhdGUucHVzaChcIjxzcGFuIGNsYXNzPSdpbS1zdGF0aWMnPlwiICsgZW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29sb3JNYXNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEJ1ZmZlcigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZXRQb3MgPT09IHVuZGVmaW5lZCA/IGNhcmV0UG9zID0gY2FyZXQoaW5wdXQpIDogY2FyZXRQb3MuYmVnaW4gPT09IHVuZGVmaW5lZCAmJiAoY2FyZXRQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogY2FyZXRQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGNhcmV0UG9zXG4gICAgICAgICAgICAgICAgICAgIH0pLCAhMCAhPT0gY2xlYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdID8gKHRlc3RQb3MgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdCA9IHRlc3RQb3MubWF0Y2gsIG5keEludGx6ciA9IHRlc3RQb3MubG9jYXRvci5zbGljZSgpLCBzZXRFbnRyeShidWZmZXJbcG9zXSkpIDogKHRlc3RQb3MgPSBnZXRUZXN0VGVtcGxhdGUocG9zLCBuZHhJbnRsenIsIHBvcyAtIDEpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0ID0gdGVzdFBvcy5tYXRjaCwgbmR4SW50bHpyID0gdGVzdFBvcy5sb2NhdG9yLnNsaWNlKCksICExID09PSBvcHRzLmppdE1hc2tpbmcgfHwgcG9zIDwgbHZwIHx8IFwibnVtYmVyXCIgPT0gdHlwZW9mIG9wdHMuaml0TWFza2luZyAmJiBpc0Zpbml0ZShvcHRzLmppdE1hc2tpbmcpICYmIG9wdHMuaml0TWFza2luZyA+IHBvcyA/IHNldEVudHJ5KGdldFBsYWNlaG9sZGVyKHBvcywgdGVzdCkpIDogaXNTdGF0aWMgPSAhMSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoKG1heExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IHBvcyA8IG1heExlbmd0aCkgJiYgKG51bGwgIT09IHRlc3QuZm4gfHwgXCJcIiAhPT0gdGVzdC5kZWYpIHx8IGx2cCA+IHBvcyB8fCBpc1N0YXRpYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N0YXRpYyAmJiBzZXRFbnRyeSgpLCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpbnB1dCAmJiAobWFza1RlbXBsYXRlLnNwbGljZShjYXJldFBvcy5iZWdpbiwgMCwgY2FyZXRQb3MuYmVnaW4gPT09IGNhcmV0UG9zLmVuZCB8fCBjYXJldFBvcy5lbmQgPiBnZXRNYXNrU2V0KCkubWFza0xlbmd0aCA/ICc8bWFyayBjbGFzcz1cImltLWNhcmV0XCIgc3R5bGU9XCJib3JkZXItcmlnaHQtd2lkdGg6IDFweDtib3JkZXItcmlnaHQtc3R5bGU6IHNvbGlkO1wiPicgOiAnPG1hcmsgY2xhc3M9XCJpbS1jYXJldC1zZWxlY3RcIj4nKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrVGVtcGxhdGUuc3BsaWNlKGNhcmV0UG9zLmVuZCArIDEsIDAsIFwiPC9tYXJrPlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gY29sb3JNYXNrLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZGl2XCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBtYXNrVGVtcGxhdGUuam9pbihcIlwiKSwgaW5wdXQuaW5wdXRtYXNrLnBvc2l0aW9uQ29sb3JNYXNrKGlucHV0LCB0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKElucHV0bWFzay5wcm90b3R5cGUucG9zaXRpb25Db2xvck1hc2sgPSBmdW5jdGlvbihpbnB1dCwgdGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICBpbnB1dC5zdHlsZS5sZWZ0ID0gdGVtcGxhdGUub2Zmc2V0TGVmdCArIFwicHhcIjtcbiAgICAgICAgICAgIH0sIGFjdGlvbk9iaiAhPT0gdW5kZWZpbmVkKSBzd2l0Y2ggKGFjdGlvbk9iai5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgY2FzZSBcImlzQ29tcGxldGVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwgPSBhY3Rpb25PYmouZWwsIGlzQ29tcGxldGUoZ2V0QnVmZmVyKCkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJ1bm1hc2tlZHZhbHVlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsICE9PSB1bmRlZmluZWQgJiYgYWN0aW9uT2JqLnZhbHVlID09PSB1bmRlZmluZWQgfHwgKHZhbHVlQnVmZmVyID0gYWN0aW9uT2JqLnZhbHVlLCBcbiAgICAgICAgICAgICAgICB2YWx1ZUJ1ZmZlciA9ICgkLmlzRnVuY3Rpb24ob3B0cy5vbkJlZm9yZU1hc2spICYmIG9wdHMub25CZWZvcmVNYXNrLmNhbGwoaW5wdXRtYXNrLCB2YWx1ZUJ1ZmZlciwgb3B0cykgfHwgdmFsdWVCdWZmZXIpLnNwbGl0KFwiXCIpLCBcbiAgICAgICAgICAgICAgICBjaGVja1ZhbCh1bmRlZmluZWQsICExLCAhMSwgaXNSVEwgPyB2YWx1ZUJ1ZmZlci5yZXZlcnNlKCkgOiB2YWx1ZUJ1ZmZlciksICQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlV3JpdGUpICYmIG9wdHMub25CZWZvcmVXcml0ZS5jYWxsKGlucHV0bWFzaywgdW5kZWZpbmVkLCBnZXRCdWZmZXIoKSwgMCwgb3B0cykpLCBcbiAgICAgICAgICAgICAgICB1bm1hc2tlZHZhbHVlKGVsKTtcblxuICAgICAgICAgICAgICBjYXNlIFwibWFza1wiOlxuICAgICAgICAgICAgICAgICFmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub2ZmKGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbihpbnB1dCwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRUeXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSwgaXNTdXBwb3J0ZWQgPSBcIklOUFVUXCIgPT09IGlucHV0LnRhZ05hbWUgJiYgLTEgIT09ICQuaW5BcnJheShlbGVtZW50VHlwZSwgb3B0cy5zdXBwb3J0c0lucHV0VHlwZSkgfHwgaW5wdXQuaXNDb250ZW50RWRpdGFibGUgfHwgXCJURVhUQVJFQVwiID09PSBpbnB1dC50YWdOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1N1cHBvcnRlZCkgaWYgKFwiSU5QVVRcIiA9PT0gaW5wdXQudGFnTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIGVsZW1lbnRUeXBlKSwgaXNTdXBwb3J0ZWQgPSBcInRleHRcIiA9PT0gZWwudHlwZSwgZWwgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlzU3VwcG9ydGVkID0gXCJwYXJ0aWFsXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITEgIT09IGlzU3VwcG9ydGVkID8gZnVuY3Rpb24obnB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlR2V0LCB2YWx1ZVNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXR0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0bWFzayA/IHRoaXMuaW5wdXRtYXNrLm9wdHMuYXV0b1VubWFzayA/IHRoaXMuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSA6IC0xICE9PSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpIHx8ICEwICE9PSBvcHRzLm51bGxhYmxlID8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcyAmJiBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzID8gKGlzUlRMID8gY2xlYXJPcHRpb25hbFRhaWwoZ2V0QnVmZmVyKCkuc2xpY2UoKSkucmV2ZXJzZSgpIDogY2xlYXJPcHRpb25hbFRhaWwoZ2V0QnVmZmVyKCkuc2xpY2UoKSkpLmpvaW4oXCJcIikgOiB2YWx1ZUdldC5jYWxsKHRoaXMpIDogXCJcIiA6IHZhbHVlR2V0LmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldHRlcih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldC5jYWxsKHRoaXMsIHZhbHVlKSwgdGhpcy5pbnB1dG1hc2sgJiYgJCh0aGlzKS50cmlnZ2VyKFwic2V0dmFsdWVcIiwgWyB2YWx1ZSBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFucHQuaW5wdXRtYXNrLl9fdmFsdWVHZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwICE9PSBvcHRzLm5vVmFsdWVQYXRjaGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiAoT2JqZWN0LmdldFByb3RvdHlwZU9mID0gXCJvYmplY3RcIiA9PT0gX3R5cGVvZihcInRlc3RcIi5fX3Byb3RvX18pID8gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3QuX19wcm90b19fO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlUHJvcGVydHkgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZihucHQpLCBcInZhbHVlXCIpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlUHJvcGVydHkgJiYgdmFsdWVQcm9wZXJ0eS5nZXQgJiYgdmFsdWVQcm9wZXJ0eS5zZXQgPyAodmFsdWVHZXQgPSB2YWx1ZVByb3BlcnR5LmdldCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXQgPSB2YWx1ZVByb3BlcnR5LnNldCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5wdCwgXCJ2YWx1ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IHNldHRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiAhMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSA6IFwiSU5QVVRcIiAhPT0gbnB0LnRhZ05hbWUgJiYgKHZhbHVlR2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHZhbHVlU2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucHQsIFwidmFsdWVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGdldHRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBzZXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgZG9jdW1lbnQuX19sb29rdXBHZXR0ZXJfXyAmJiBucHQuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpICYmICh2YWx1ZUdldCA9IG5wdC5fX2xvb2t1cEdldHRlcl9fKFwidmFsdWVcIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXQgPSBucHQuX19sb29rdXBTZXR0ZXJfXyhcInZhbHVlXCIpLCBucHQuX19kZWZpbmVHZXR0ZXJfXyhcInZhbHVlXCIsIGdldHRlciksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll9fZGVmaW5lU2V0dGVyX18oXCJ2YWx1ZVwiLCBzZXR0ZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5pbnB1dG1hc2suX192YWx1ZUdldCA9IHZhbHVlR2V0LCBucHQuaW5wdXRtYXNrLl9fdmFsdWVTZXQgPSB2YWx1ZVNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBucHQuaW5wdXRtYXNrLl92YWx1ZUdldCA9IGZ1bmN0aW9uKG92ZXJydWxlUlRMKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNSVEwgJiYgITAgIT09IG92ZXJydWxlUlRMID8gdmFsdWVHZXQuY2FsbCh0aGlzLmVsKS5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IHZhbHVlR2V0LmNhbGwodGhpcy5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG5wdC5pbnB1dG1hc2suX3ZhbHVlU2V0ID0gZnVuY3Rpb24odmFsdWUsIG92ZXJydWxlUlRMKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldC5jYWxsKHRoaXMuZWwsIG51bGwgPT09IHZhbHVlIHx8IHZhbHVlID09PSB1bmRlZmluZWQgPyBcIlwiIDogITAgIT09IG92ZXJydWxlUlRMICYmIGlzUlRMID8gdmFsdWUuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHZhbHVlR2V0ID09PSB1bmRlZmluZWQgJiYgKHZhbHVlR2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdmFsdWVTZXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC52YWxIb29rcyAmJiAoJC52YWxIb29rc1t0eXBlXSA9PT0gdW5kZWZpbmVkIHx8ICEwICE9PSAkLnZhbEhvb2tzW3R5cGVdLmlucHV0bWFza3BhdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWxob29rR2V0ID0gJC52YWxIb29rc1t0eXBlXSAmJiAkLnZhbEhvb2tzW3R5cGVdLmdldCA/ICQudmFsSG9va3NbdHlwZV0uZ2V0IDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB2YWxob29rU2V0ID0gJC52YWxIb29rc1t0eXBlXSAmJiAkLnZhbEhvb2tzW3R5cGVdLnNldCA/ICQudmFsSG9va3NbdHlwZV0uc2V0IDogZnVuY3Rpb24oZWxlbSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0udmFsdWUgPSB2YWx1ZSwgZWxlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQudmFsSG9va3NbdHlwZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0uaW5wdXRtYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0uaW5wdXRtYXNrLm9wdHMuYXV0b1VubWFzaykgcmV0dXJuIGVsZW0uaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdmFsaG9va0dldChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTEgIT09IGdldExhc3RWYWxpZFBvc2l0aW9uKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBlbGVtLmlucHV0bWFzay5tYXNrc2V0LnZhbGlkUG9zaXRpb25zKSB8fCAhMCAhPT0gb3B0cy5udWxsYWJsZSA/IHJlc3VsdCA6IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaG9va0dldChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbihlbGVtLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgJGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCA9IHZhbGhvb2tTZXQoZWxlbSwgdmFsdWUpLCBlbGVtLmlucHV0bWFzayAmJiAkZWxlbS50cmlnZ2VyKFwic2V0dmFsdWVcIiwgWyB2YWx1ZSBdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0bWFza3BhdGNoOiAhMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0obnB0LnR5cGUpLCBmdW5jdGlvbihucHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24obnB0LCBcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoKSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSAmJiAkaW5wdXQudHJpZ2dlcihcInNldHZhbHVlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0obnB0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfShpbnB1dCkgOiBpbnB1dC5pbnB1dG1hc2sgPSB1bmRlZmluZWQsIGlzU3VwcG9ydGVkO1xuICAgICAgICAgICAgICAgICAgICB9KGVsZW0sIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoITEgIT09IGlzU3VwcG9ydGVkICYmICgkZWwgPSAkKGVsID0gZWxlbSksIC0xID09PSAobWF4TGVuZ3RoID0gZWwgIT09IHVuZGVmaW5lZCA/IGVsLm1heExlbmd0aCA6IHVuZGVmaW5lZCkgJiYgKG1heExlbmd0aCA9IHVuZGVmaW5lZCksIFxuICAgICAgICAgICAgICAgICAgICAhMCA9PT0gb3B0cy5jb2xvck1hc2sgJiYgaW5pdGlhbGl6ZUNvbG9yTWFzayhlbCksIG1vYmlsZSAmJiAoXCJpbnB1dG1vZGVcIiBpbiBlbCAmJiAoZWwuaW5wdXRtb2RlID0gb3B0cy5pbnB1dG1vZGUsIFxuICAgICAgICAgICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJpbnB1dG1vZGVcIiwgb3B0cy5pbnB1dG1vZGUpKSwgITAgPT09IG9wdHMuZGlzYWJsZVByZWRpY3RpdmVUZXh0ICYmIChcImF1dG9jb3JyZWN0XCIgaW4gZWwgPyBlbC5hdXRvY29ycmVjdCA9ICExIDogKCEwICE9PSBvcHRzLmNvbG9yTWFzayAmJiBpbml0aWFsaXplQ29sb3JNYXNrKGVsKSwgXG4gICAgICAgICAgICAgICAgICAgIGVsLnR5cGUgPSBcInBhc3N3b3JkXCIpKSksICEwID09PSBpc1N1cHBvcnRlZCAmJiAoRXZlbnRSdWxlci5vbihlbCwgXCJzdWJtaXRcIiwgRXZlbnRIYW5kbGVycy5zdWJtaXRFdmVudCksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcInJlc2V0XCIsIEV2ZW50SGFuZGxlcnMucmVzZXRFdmVudCksIEV2ZW50UnVsZXIub24oZWwsIFwiYmx1clwiLCBFdmVudEhhbmRsZXJzLmJsdXJFdmVudCksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcImZvY3VzXCIsIEV2ZW50SGFuZGxlcnMuZm9jdXNFdmVudCksICEwICE9PSBvcHRzLmNvbG9yTWFzayAmJiAoRXZlbnRSdWxlci5vbihlbCwgXCJjbGlja1wiLCBFdmVudEhhbmRsZXJzLmNsaWNrRXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJtb3VzZWxlYXZlXCIsIEV2ZW50SGFuZGxlcnMubW91c2VsZWF2ZUV2ZW50KSwgRXZlbnRSdWxlci5vbihlbCwgXCJtb3VzZWVudGVyXCIsIEV2ZW50SGFuZGxlcnMubW91c2VlbnRlckV2ZW50KSksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcImRibGNsaWNrXCIsIEV2ZW50SGFuZGxlcnMuZGJsY2xpY2tFdmVudCksIEV2ZW50UnVsZXIub24oZWwsIFwicGFzdGVcIiwgRXZlbnRIYW5kbGVycy5wYXN0ZUV2ZW50KSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwiZHJhZ2Ryb3BcIiwgRXZlbnRIYW5kbGVycy5wYXN0ZUV2ZW50KSwgRXZlbnRSdWxlci5vbihlbCwgXCJkcm9wXCIsIEV2ZW50SGFuZGxlcnMucGFzdGVFdmVudCksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcImN1dFwiLCBFdmVudEhhbmRsZXJzLmN1dEV2ZW50KSwgRXZlbnRSdWxlci5vbihlbCwgXCJjb21wbGV0ZVwiLCBvcHRzLm9uY29tcGxldGUpLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJpbmNvbXBsZXRlXCIsIG9wdHMub25pbmNvbXBsZXRlKSwgRXZlbnRSdWxlci5vbihlbCwgXCJjbGVhcmVkXCIsIG9wdHMub25jbGVhcmVkKSwgXG4gICAgICAgICAgICAgICAgICAgIG1vYmlsZSB8fCAhMCA9PT0gb3B0cy5pbnB1dEV2ZW50T25seSA/IGVsLnJlbW92ZUF0dHJpYnV0ZShcIm1heExlbmd0aFwiKSA6IChFdmVudFJ1bGVyLm9uKGVsLCBcImtleWRvd25cIiwgRXZlbnRIYW5kbGVycy5rZXlkb3duRXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJrZXlwcmVzc1wiLCBFdmVudEhhbmRsZXJzLmtleXByZXNzRXZlbnQpKSwgRXZlbnRSdWxlci5vbihlbCwgXCJjb21wb3NpdGlvbnN0YXJ0XCIsICQubm9vcCksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcImNvbXBvc2l0aW9udXBkYXRlXCIsICQubm9vcCksIEV2ZW50UnVsZXIub24oZWwsIFwiY29tcG9zaXRpb25lbmRcIiwgJC5ub29wKSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwia2V5dXBcIiwgJC5ub29wKSwgRXZlbnRSdWxlci5vbihlbCwgXCJpbnB1dFwiLCBFdmVudEhhbmRsZXJzLmlucHV0RmFsbEJhY2tFdmVudCksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcImJlZm9yZWlucHV0XCIsICQubm9vcCkpLCBFdmVudFJ1bGVyLm9uKGVsLCBcInNldHZhbHVlXCIsIEV2ZW50SGFuZGxlcnMuc2V0VmFsdWVFdmVudCksIFxuICAgICAgICAgICAgICAgICAgICB1bmRvVmFsdWUgPSBnZXRCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oXCJcIiksIFwiXCIgIT09IGVsLmlucHV0bWFzay5fdmFsdWVHZXQoITApIHx8ICExID09PSBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzIHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluaXRpYWxWYWx1ZSA9ICQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlTWFzaykgJiYgb3B0cy5vbkJlZm9yZU1hc2suY2FsbChpbnB1dG1hc2ssIGVsLmlucHV0bWFzay5fdmFsdWVHZXQoITApLCBvcHRzKSB8fCBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIgIT09IGluaXRpYWxWYWx1ZSAmJiBjaGVja1ZhbChlbCwgITAsICExLCBpc1JUTCA/IGluaXRpYWxWYWx1ZS5zcGxpdChcIlwiKS5yZXZlcnNlKCkgOiBpbml0aWFsVmFsdWUuc3BsaXQoXCJcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEJ1ZmZlcigpLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRvVmFsdWUgPSBidWZmZXIuam9pbihcIlwiKSwgITEgPT09IGlzQ29tcGxldGUoYnVmZmVyKSAmJiBvcHRzLmNsZWFySW5jb21wbGV0ZSAmJiByZXNldE1hc2tTZXQoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGVsICYmICgtMSA9PT0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSA/IGJ1ZmZlciA9IFtdIDogY2xlYXJPcHRpb25hbFRhaWwoYnVmZmVyKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgKCExID09PSBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzIHx8IG9wdHMuc2hvd01hc2tPbkZvY3VzICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsIHx8IFwiXCIgIT09IGVsLmlucHV0bWFzay5fdmFsdWVHZXQoITApKSAmJiB3cml0ZUJ1ZmZlcihlbCwgYnVmZmVyKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlbCAmJiBjYXJldChlbCwgc2Vla05leHQoZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfShlbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSBcImZvcm1hdFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZUJ1ZmZlciA9ICgkLmlzRnVuY3Rpb24ob3B0cy5vbkJlZm9yZU1hc2spICYmIG9wdHMub25CZWZvcmVNYXNrLmNhbGwoaW5wdXRtYXNrLCBhY3Rpb25PYmoudmFsdWUsIG9wdHMpIHx8IGFjdGlvbk9iai52YWx1ZSkuc3BsaXQoXCJcIiksIFxuICAgICAgICAgICAgICAgIGNoZWNrVmFsKHVuZGVmaW5lZCwgITAsICExLCBpc1JUTCA/IHZhbHVlQnVmZmVyLnJldmVyc2UoKSA6IHZhbHVlQnVmZmVyKSwgYWN0aW9uT2JqLm1ldGFkYXRhID8ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXNSVEwgPyBnZXRCdWZmZXIoKS5zbGljZSgpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogZ2V0QnVmZmVyKCkuam9pbihcIlwiKSxcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGE6IG1hc2tTY29wZS5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJnZXRtZXRhZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgIH0sIG1hc2tzZXQsIG9wdHMpXG4gICAgICAgICAgICAgICAgfSA6IGlzUlRMID8gZ2V0QnVmZmVyKCkuc2xpY2UoKS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IGdldEJ1ZmZlcigpLmpvaW4oXCJcIik7XG5cbiAgICAgICAgICAgICAgY2FzZSBcImlzVmFsaWRcIjpcbiAgICAgICAgICAgICAgICBhY3Rpb25PYmoudmFsdWUgPyAodmFsdWVCdWZmZXIgPSBhY3Rpb25PYmoudmFsdWUuc3BsaXQoXCJcIiksIGNoZWNrVmFsKHVuZGVmaW5lZCwgITAsICEwLCBpc1JUTCA/IHZhbHVlQnVmZmVyLnJldmVyc2UoKSA6IHZhbHVlQnVmZmVyKSkgOiBhY3Rpb25PYmoudmFsdWUgPSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGJ1ZmZlciA9IGdldEJ1ZmZlcigpLCBybCA9IGRldGVybWluZUxhc3RSZXF1aXJlZFBvc2l0aW9uKCksIGxtaWIgPSBidWZmZXIubGVuZ3RoIC0gMTsgbG1pYiA+IHJsICYmICFpc01hc2sobG1pYik7IGxtaWItLSkgO1xuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXIuc3BsaWNlKHJsLCBsbWliICsgMSAtIHJsKSwgaXNDb21wbGV0ZShidWZmZXIpICYmIGFjdGlvbk9iai52YWx1ZSA9PT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKTtcblxuICAgICAgICAgICAgICBjYXNlIFwiZ2V0ZW1wdHltYXNrXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEJ1ZmZlclRlbXBsYXRlKCkuam9pbihcIlwiKTtcblxuICAgICAgICAgICAgICBjYXNlIFwicmVtb3ZlXCI6XG4gICAgICAgICAgICAgICAgaWYgKGVsICYmIGVsLmlucHV0bWFzaykgJC5kYXRhKGVsLCBcIl9pbnB1dG1hc2tfb3B0c1wiLCBudWxsKSwgJGVsID0gJChlbCksIGVsLmlucHV0bWFzay5fdmFsdWVTZXQob3B0cy5hdXRvVW5tYXNrID8gdW5tYXNrZWR2YWx1ZShlbCkgOiBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSksIFxuICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub2ZmKGVsKSwgZWwuaW5wdXRtYXNrLmNvbG9yTWFzayAmJiAoKGNvbG9yTWFzayA9IGVsLmlucHV0bWFzay5jb2xvck1hc2spLnJlbW92ZUNoaWxkKGVsKSwgXG4gICAgICAgICAgICAgICAgY29sb3JNYXNrLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCBjb2xvck1hc2spLCBjb2xvck1hc2sucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjb2xvck1hc2spKSwgXG4gICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZihlbCksIFwidmFsdWVcIikgJiYgZWwuaW5wdXRtYXNrLl9fdmFsdWVHZXQgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsLCBcInZhbHVlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBlbC5pbnB1dG1hc2suX192YWx1ZUdldCxcbiAgICAgICAgICAgICAgICAgICAgc2V0OiBlbC5pbnB1dG1hc2suX192YWx1ZVNldCxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiAhMFxuICAgICAgICAgICAgICAgIH0pIDogZG9jdW1lbnQuX19sb29rdXBHZXR0ZXJfXyAmJiBlbC5fX2xvb2t1cEdldHRlcl9fKFwidmFsdWVcIikgJiYgZWwuaW5wdXRtYXNrLl9fdmFsdWVHZXQgJiYgKGVsLl9fZGVmaW5lR2V0dGVyX18oXCJ2YWx1ZVwiLCBlbC5pbnB1dG1hc2suX192YWx1ZUdldCksIFxuICAgICAgICAgICAgICAgIGVsLl9fZGVmaW5lU2V0dGVyX18oXCJ2YWx1ZVwiLCBlbC5pbnB1dG1hc2suX192YWx1ZVNldCkpLCBlbC5pbnB1dG1hc2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJnZXRtZXRhZGF0YVwiOlxuICAgICAgICAgICAgICAgIGlmICgkLmlzQXJyYXkobWFza3NldC5tZXRhZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tUYXJnZXQgPSBnZXRNYXNrVGVtcGxhdGUoITAsIDAsICExKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5lYWNoKG1hc2tzZXQubWV0YWRhdGEsIGZ1bmN0aW9uKG5keCwgbXRkdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG10ZHQubWFzayA9PT0gbWFza1RhcmdldCkgcmV0dXJuIG1hc2tUYXJnZXQgPSBtdGR0LCAhMTtcbiAgICAgICAgICAgICAgICAgICAgfSksIG1hc2tUYXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtYXNrc2V0Lm1ldGFkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBJbnB1dG1hc2sucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgZGF0YUF0dHJpYnV0ZTogXCJkYXRhLWlucHV0bWFza1wiLFxuICAgICAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJfXCIsXG4gICAgICAgICAgICAgICAgb3B0aW9uYWxtYXJrZXI6IFsgXCJbXCIsIFwiXVwiIF0sXG4gICAgICAgICAgICAgICAgcXVhbnRpZmllcm1hcmtlcjogWyBcIntcIiwgXCJ9XCIgXSxcbiAgICAgICAgICAgICAgICBncm91cG1hcmtlcjogWyBcIihcIiwgXCIpXCIgXSxcbiAgICAgICAgICAgICAgICBhbHRlcm5hdG9ybWFya2VyOiBcInxcIixcbiAgICAgICAgICAgICAgICBlc2NhcGVDaGFyOiBcIlxcXFxcIixcbiAgICAgICAgICAgICAgICBtYXNrOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBudWxsLFxuICAgICAgICAgICAgICAgIG9uY29tcGxldGU6ICQubm9vcCxcbiAgICAgICAgICAgICAgICBvbmluY29tcGxldGU6ICQubm9vcCxcbiAgICAgICAgICAgICAgICBvbmNsZWFyZWQ6ICQubm9vcCxcbiAgICAgICAgICAgICAgICByZXBlYXQ6IDAsXG4gICAgICAgICAgICAgICAgZ3JlZWR5OiAhMSxcbiAgICAgICAgICAgICAgICBhdXRvVW5tYXNrOiAhMSxcbiAgICAgICAgICAgICAgICByZW1vdmVNYXNrT25TdWJtaXQ6ICExLFxuICAgICAgICAgICAgICAgIGNsZWFyTWFza09uTG9zdEZvY3VzOiAhMCxcbiAgICAgICAgICAgICAgICBpbnNlcnRNb2RlOiAhMCxcbiAgICAgICAgICAgICAgICBjbGVhckluY29tcGxldGU6ICExLFxuICAgICAgICAgICAgICAgIGFsaWFzOiBudWxsLFxuICAgICAgICAgICAgICAgIG9uS2V5RG93bjogJC5ub29wLFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlTWFzazogbnVsbCxcbiAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihwYXN0ZWRWYWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVNYXNrKSA/IG9wdHMub25CZWZvcmVNYXNrLmNhbGwodGhpcywgcGFzdGVkVmFsdWUsIG9wdHMpIDogcGFzdGVkVmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkJlZm9yZVdyaXRlOiBudWxsLFxuICAgICAgICAgICAgICAgIG9uVW5NYXNrOiBudWxsLFxuICAgICAgICAgICAgICAgIHNob3dNYXNrT25Gb2N1czogITAsXG4gICAgICAgICAgICAgICAgc2hvd01hc2tPbkhvdmVyOiAhMCxcbiAgICAgICAgICAgICAgICBvbktleVZhbGlkYXRpb246ICQubm9vcCxcbiAgICAgICAgICAgICAgICBza2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyOiBcIiBcIixcbiAgICAgICAgICAgICAgICBudW1lcmljSW5wdXQ6ICExLFxuICAgICAgICAgICAgICAgIHJpZ2h0QWxpZ246ICExLFxuICAgICAgICAgICAgICAgIHVuZG9PbkVzY2FwZTogITAsXG4gICAgICAgICAgICAgICAgcmFkaXhQb2ludDogXCJcIixcbiAgICAgICAgICAgICAgICBfcmFkaXhEYW5jZTogITEsXG4gICAgICAgICAgICAgICAgZ3JvdXBTZXBhcmF0b3I6IFwiXCIsXG4gICAgICAgICAgICAgICAga2VlcFN0YXRpYzogbnVsbCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkNhcmV0T25UYWI6ICEwLFxuICAgICAgICAgICAgICAgIHRhYlRocm91Z2g6ICExLFxuICAgICAgICAgICAgICAgIHN1cHBvcnRzSW5wdXRUeXBlOiBbIFwidGV4dFwiLCBcInRlbFwiLCBcInBhc3N3b3JkXCIsIFwic2VhcmNoXCIgXSxcbiAgICAgICAgICAgICAgICBpZ25vcmFibGVzOiBbIDgsIDksIDEzLCAxOSwgMjcsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MCwgNDUsIDQ2LCA5MywgMTEyLCAxMTMsIDExNCwgMTE1LCAxMTYsIDExNywgMTE4LCAxMTksIDEyMCwgMTIxLCAxMjIsIDEyMywgMCwgMjI5IF0sXG4gICAgICAgICAgICAgICAgaXNDb21wbGV0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBwcmVWYWxpZGF0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgIHBvc3RWYWxpZGF0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgIHN0YXRpY0RlZmluaXRpb25TeW1ib2w6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBqaXRNYXNraW5nOiAhMSxcbiAgICAgICAgICAgICAgICBudWxsYWJsZTogITAsXG4gICAgICAgICAgICAgICAgaW5wdXRFdmVudE9ubHk6ICExLFxuICAgICAgICAgICAgICAgIG5vVmFsdWVQYXRjaGluZzogITEsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25DYXJldE9uQ2xpY2s6IFwibHZwXCIsXG4gICAgICAgICAgICAgICAgY2FzaW5nOiBudWxsLFxuICAgICAgICAgICAgICAgIGlucHV0bW9kZTogXCJ2ZXJiYXRpbVwiLFxuICAgICAgICAgICAgICAgIGNvbG9yTWFzazogITEsXG4gICAgICAgICAgICAgICAgZGlzYWJsZVByZWRpY3RpdmVUZXh0OiAhMSxcbiAgICAgICAgICAgICAgICBpbXBvcnREYXRhQXR0cmlidXRlczogITBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWZpbml0aW9uczoge1xuICAgICAgICAgICAgICAgIDk6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTnvvJEt77yZXVwiLFxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uU3ltYm9sOiBcIipcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiW0EtWmEtetCQLdGP0IHRkcOALcO/wrVdXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25TeW1ib2w6IFwiKlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIipcIjoge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOe+8kS3vvJlBLVphLXrQkC3Rj9CB0ZHDgC3Dv8K1XVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsaWFzZXM6IHt9LFxuICAgICAgICAgICAgbWFza3NDYWNoZToge30sXG4gICAgICAgICAgICBtYXNrOiBmdW5jdGlvbihlbGVtcykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIiA9PSB0eXBlb2YgZWxlbXMgJiYgKGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbXMpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbXMpKSwgXG4gICAgICAgICAgICAgICAgZWxlbXMgPSBlbGVtcy5ub2RlTmFtZSA/IFsgZWxlbXMgXSA6IGVsZW1zLCAkLmVhY2goZWxlbXMsIGZ1bmN0aW9uKG5keCwgZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjb3BlZE9wdHMgPSAkLmV4dGVuZCghMCwge30sIHRoYXQub3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jdGlvbihucHQsIG9wdHMsIHVzZXJPcHRpb25zLCBkYXRhQXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgPT09IG9wdHMuaW1wb3J0RGF0YUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uLCBkYXRhb3B0aW9ucywgb3B0aW9uRGF0YSwgcCwgaW1wb3J0T3B0aW9uID0gZnVuY3Rpb24ob3B0aW9uLCBvcHRpb25EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgIT09IChvcHRpb25EYXRhID0gb3B0aW9uRGF0YSAhPT0gdW5kZWZpbmVkID8gb3B0aW9uRGF0YSA6IG5wdC5nZXRBdHRyaWJ1dGUoZGF0YUF0dHJpYnV0ZSArIFwiLVwiICsgb3B0aW9uKSkgJiYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIG9wdGlvbkRhdGEgJiYgKDAgPT09IG9wdGlvbi5pbmRleE9mKFwib25cIikgPyBvcHRpb25EYXRhID0gd2luZG93W29wdGlvbkRhdGFdIDogXCJmYWxzZVwiID09PSBvcHRpb25EYXRhID8gb3B0aW9uRGF0YSA9ICExIDogXCJ0cnVlXCIgPT09IG9wdGlvbkRhdGEgJiYgKG9wdGlvbkRhdGEgPSAhMCkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlck9wdGlvbnNbb3B0aW9uXSA9IG9wdGlvbkRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGF0dHJPcHRpb25zID0gbnB0LmdldEF0dHJpYnV0ZShkYXRhQXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ck9wdGlvbnMgJiYgXCJcIiAhPT0gYXR0ck9wdGlvbnMgJiYgKGF0dHJPcHRpb25zID0gYXR0ck9wdGlvbnMucmVwbGFjZSgvJy9nLCAnXCInKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YW9wdGlvbnMgPSBKU09OLnBhcnNlKFwie1wiICsgYXR0ck9wdGlvbnMgKyBcIn1cIikpLCBkYXRhb3B0aW9ucykgZm9yIChwIGluIG9wdGlvbkRhdGEgPSB1bmRlZmluZWQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFvcHRpb25zKSBpZiAoXCJhbGlhc1wiID09PSBwLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uRGF0YSA9IGRhdGFvcHRpb25zW3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChvcHRpb24gaW4gaW1wb3J0T3B0aW9uKFwiYWxpYXNcIiwgb3B0aW9uRGF0YSksIHVzZXJPcHRpb25zLmFsaWFzICYmIHJlc29sdmVBbGlhcyh1c2VyT3B0aW9ucy5hbGlhcywgdXNlck9wdGlvbnMsIG9wdHMpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhb3B0aW9ucykgZm9yIChwIGluIG9wdGlvbkRhdGEgPSB1bmRlZmluZWQsIGRhdGFvcHRpb25zKSBpZiAocC50b0xvd2VyQ2FzZSgpID09PSBvcHRpb24udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uRGF0YSA9IGRhdGFvcHRpb25zW3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0T3B0aW9uKG9wdGlvbiwgb3B0aW9uRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKCEwLCBvcHRzLCB1c2VyT3B0aW9ucyksIChcInJ0bFwiID09PSBucHQuZGlyIHx8IG9wdHMucmlnaHRBbGlnbikgJiYgKG5wdC5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIChcInJ0bFwiID09PSBucHQuZGlyIHx8IG9wdHMubnVtZXJpY0lucHV0KSAmJiAobnB0LmRpciA9IFwibHRyXCIsIG5wdC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXJcIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5pc1JUTCA9ICEwKSwgT2JqZWN0LmtleXModXNlck9wdGlvbnMpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfShlbCwgc2NvcGVkT3B0cywgJC5leHRlbmQoITAsIHt9LCB0aGF0LnVzZXJPcHRpb25zKSwgdGhhdC5kYXRhQXR0cmlidXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tzZXQgPSBnZW5lcmF0ZU1hc2tTZXQoc2NvcGVkT3B0cywgdGhhdC5ub01hc2tzQ2FjaGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldCAhPT0gdW5kZWZpbmVkICYmIChlbC5pbnB1dG1hc2sgIT09IHVuZGVmaW5lZCAmJiAoZWwuaW5wdXRtYXNrLm9wdHMuYXV0b1VubWFzayA9ICEwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmlucHV0bWFzay5yZW1vdmUoKSksIGVsLmlucHV0bWFzayA9IG5ldyBJbnB1dG1hc2sodW5kZWZpbmVkLCB1bmRlZmluZWQsICEwKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2sub3B0cyA9IHNjb3BlZE9wdHMsIGVsLmlucHV0bWFzay5ub01hc2tzQ2FjaGUgPSB0aGF0Lm5vTWFza3NDYWNoZSwgZWwuaW5wdXRtYXNrLnVzZXJPcHRpb25zID0gJC5leHRlbmQoITAsIHt9LCB0aGF0LnVzZXJPcHRpb25zKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2suaXNSVEwgPSBzY29wZWRPcHRzLmlzUlRMIHx8IHNjb3BlZE9wdHMubnVtZXJpY0lucHV0LCBlbC5pbnB1dG1hc2suZWwgPSBlbCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2subWFza3NldCA9IG1hc2tzZXQsICQuZGF0YShlbCwgXCJfaW5wdXRtYXNrX29wdHNcIiwgc2NvcGVkT3B0cyksIG1hc2tTY29wZS5jYWxsKGVsLmlucHV0bWFzaywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJtYXNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCBlbGVtcyAmJiBlbGVtc1swXSAmJiBlbGVtc1swXS5pbnB1dG1hc2sgfHwgdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRpb246IGZ1bmN0aW9uKG9wdGlvbnMsIG5vcmVtYXNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCIgPT0gdHlwZW9mIG9wdGlvbnMgPyB0aGlzLm9wdHNbb3B0aW9uc10gOiBcIm9iamVjdFwiID09PSAodm9pZCAwID09PSBvcHRpb25zID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob3B0aW9ucykpID8gKCQuZXh0ZW5kKHRoaXMudXNlck9wdGlvbnMsIG9wdGlvbnMpLCBcbiAgICAgICAgICAgICAgICB0aGlzLmVsICYmICEwICE9PSBub3JlbWFzayAmJiB0aGlzLm1hc2sodGhpcy5lbCksIHRoaXMpIDogdm9pZCAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVubWFza2VkdmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFza3NldCA9IHRoaXMubWFza3NldCB8fCBnZW5lcmF0ZU1hc2tTZXQodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSksIFxuICAgICAgICAgICAgICAgIG1hc2tTY29wZS5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcInVubWFza2VkdmFsdWVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFza1Njb3BlLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwicmVtb3ZlXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRlbXB0eW1hc2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgZ2VuZXJhdGVNYXNrU2V0KHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpLCBcbiAgICAgICAgICAgICAgICBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJnZXRlbXB0eW1hc2tcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc01hc2tlZFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMub3B0cy5hdXRvVW5tYXNrO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgZ2VuZXJhdGVNYXNrU2V0KHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpLCBcbiAgICAgICAgICAgICAgICBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJpc0NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRtZXRhZGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFza3NldCA9IHRoaXMubWFza3NldCB8fCBnZW5lcmF0ZU1hc2tTZXQodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSksIFxuICAgICAgICAgICAgICAgIG1hc2tTY29wZS5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcImdldG1ldGFkYXRhXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1ZhbGlkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgZ2VuZXJhdGVNYXNrU2V0KHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpLCBcbiAgICAgICAgICAgICAgICBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJpc1ZhbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24odmFsdWUsIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFza3NldCA9IHRoaXMubWFza3NldCB8fCBnZW5lcmF0ZU1hc2tTZXQodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSksIFxuICAgICAgICAgICAgICAgIG1hc2tTY29wZS5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcImZvcm1hdFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwgJiYgJCh0aGlzLmVsKS50cmlnZ2VyKFwic2V0dmFsdWVcIiwgWyB2YWx1ZSBdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmFseXNlTWFzazogZnVuY3Rpb24obWFzaywgcmVnZXhNYXNrLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoLCBtLCBvcGVuaW5nVG9rZW4sIGN1cnJlbnRPcGVuaW5nVG9rZW4sIGFsdGVybmF0b3IsIGxhc3RNYXRjaCwgdG9rZW5pemVyID0gLyg/Ols/KitdfFxce1swLTlcXCtcXCpdKyg/OixbMC05XFwrXFwqXSopPyg/OlxcfFswLTlcXCtcXCpdKik/XFx9KXxbXi4/KiteJHtbXSgpfFxcXFxdK3wuL2csIHJlZ2V4VG9rZW5pemVyID0gL1xcW1xcXj9dPyg/OlteXFxcXFxcXV0rfFxcXFxbXFxTXFxzXT8pKl0/fFxcXFwoPzowKD86WzAtM11bMC03XXswLDJ9fFs0LTddWzAtN10/KT98WzEtOV1bMC05XSp8eFswLTlBLUZhLWZdezJ9fHVbMC05QS1GYS1mXXs0fXxjW0EtWmEtel18W1xcU1xcc10/KXxcXCgoPzpcXD9bOj0hXT8pP3woPzpbPyorXXxcXHtbMC05XSsoPzosWzAtOV0qKT9cXH0pXFw/P3xbXi4/KiteJHtbKCl8XFxcXF0rfC4vZywgZXNjYXBlZCA9ICExLCBjdXJyZW50VG9rZW4gPSBuZXcgTWFza1Rva2VuKCksIG9wZW5lbmluZ3MgPSBbXSwgbWFza1Rva2VucyA9IFtdO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIE1hc2tUb2tlbihpc0dyb3VwLCBpc09wdGlvbmFsLCBpc1F1YW50aWZpZXIsIGlzQWx0ZXJuYXRvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXSwgdGhpcy5vcGVuR3JvdXAgPSBpc0dyb3VwIHx8ICExLCB0aGlzLmFsdGVybmF0b3JHcm91cCA9ICExLCB0aGlzLmlzR3JvdXAgPSBpc0dyb3VwIHx8ICExLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wdGlvbmFsID0gaXNPcHRpb25hbCB8fCAhMSwgdGhpcy5pc1F1YW50aWZpZXIgPSBpc1F1YW50aWZpZXIgfHwgITEsIHRoaXMuaXNBbHRlcm5hdG9yID0gaXNBbHRlcm5hdG9yIHx8ICExLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWFudGlmaWVyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiAxXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGluc2VydFRlc3REZWZpbml0aW9uKG10b2tlbiwgZWxlbWVudCwgcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbiAhPT0gdW5kZWZpbmVkID8gcG9zaXRpb24gOiBtdG9rZW4ubWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2TWF0Y2ggPSBtdG9rZW4ubWF0Y2hlc1twb3NpdGlvbiAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVnZXhNYXNrKSAwID09PSBlbGVtZW50LmluZGV4T2YoXCJbXCIpIHx8IGVzY2FwZWQgJiYgL1xcXFxkfFxcXFxzfFxcXFx3XS9pLnRlc3QoZWxlbWVudCkgfHwgXCIuXCIgPT09IGVsZW1lbnQgPyBtdG9rZW4ubWF0Y2hlcy5zcGxpY2UocG9zaXRpb24rKywgMCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm46IG5ldyBSZWdFeHAoZWxlbWVudCwgb3B0cy5jYXNpbmcgPyBcImlcIiA6IFwiXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxpdHk6IG10b2tlbi5pc09wdGlvbmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXI6IHByZXZNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IHByZXZNYXRjaC5kZWYgIT09IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWY6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlRGVmOiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH0pIDogKGVzY2FwZWQgJiYgKGVsZW1lbnQgPSBlbGVtZW50W2VsZW1lbnQubGVuZ3RoIC0gMV0pLCAkLmVhY2goZWxlbWVudC5zcGxpdChcIlwiKSwgZnVuY3Rpb24obmR4LCBsbW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2TWF0Y2ggPSBtdG9rZW4ubWF0Y2hlc1twb3NpdGlvbiAtIDFdLCBtdG9rZW4ubWF0Y2hlcy5zcGxpY2UocG9zaXRpb24rKywgMCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsaXR5OiBtdG9rZW4uaXNPcHRpb25hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdCbG9ja01hcmtlcjogcHJldk1hdGNoID09PSB1bmRlZmluZWQgfHwgcHJldk1hdGNoLmRlZiAhPT0gbG1udCAmJiBudWxsICE9PSBwcmV2TWF0Y2guZm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZjogb3B0cy5zdGF0aWNEZWZpbml0aW9uU3ltYm9sIHx8IGxtbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IG9wdHMuc3RhdGljRGVmaW5pdGlvblN5bWJvbCAhPT0gdW5kZWZpbmVkID8gbG1udCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVEZWY6IGxtbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KSksIGVzY2FwZWQgPSAhMTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFza2RlZiA9IChvcHRzLmRlZmluaXRpb25zID8gb3B0cy5kZWZpbml0aW9uc1tlbGVtZW50XSA6IHVuZGVmaW5lZCkgfHwgSW5wdXRtYXNrLnByb3RvdHlwZS5kZWZpbml0aW9uc1tlbGVtZW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tkZWYgJiYgIWVzY2FwZWQgPyBtdG9rZW4ubWF0Y2hlcy5zcGxpY2UocG9zaXRpb24rKywgMCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBtYXNrZGVmLnZhbGlkYXRvciA/IFwic3RyaW5nXCIgPT0gdHlwZW9mIG1hc2tkZWYudmFsaWRhdG9yID8gbmV3IFJlZ0V4cChtYXNrZGVmLnZhbGlkYXRvciwgb3B0cy5jYXNpbmcgPyBcImlcIiA6IFwiXCIpIDogbmV3IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlc3QgPSBtYXNrZGVmLnZhbGlkYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KCkgOiBuZXcgUmVnRXhwKFwiLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbGl0eTogbXRva2VuLmlzT3B0aW9uYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXI6IHByZXZNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IHByZXZNYXRjaC5kZWYgIT09IChtYXNrZGVmLmRlZmluaXRpb25TeW1ib2wgfHwgZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBtYXNrZGVmLmNhc2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWY6IG1hc2tkZWYuZGVmaW5pdGlvblN5bWJvbCB8fCBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBtYXNrZGVmLnBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZURlZjogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgOiAobXRva2VuLm1hdGNoZXMuc3BsaWNlKHBvc2l0aW9uKyssIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbGl0eTogbXRva2VuLmlzT3B0aW9uYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXI6IHByZXZNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IHByZXZNYXRjaC5kZWYgIT09IGVsZW1lbnQgJiYgbnVsbCAhPT0gcHJldk1hdGNoLmZuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWY6IG9wdHMuc3RhdGljRGVmaW5pdGlvblN5bWJvbCB8fCBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBvcHRzLnN0YXRpY0RlZmluaXRpb25TeW1ib2wgIT09IHVuZGVmaW5lZCA/IGVsZW1lbnQgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlRGVmOiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwgZXNjYXBlZCA9ICExKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkZWZhdWx0Q2FzZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZW5lbmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc2VydFRlc3REZWZpbml0aW9uKGN1cnJlbnRPcGVuaW5nVG9rZW4gPSBvcGVuZW5pbmdzW29wZW5lbmluZ3MubGVuZ3RoIC0gMV0sIG0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRPcGVuaW5nVG9rZW4uaXNBbHRlcm5hdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRvciA9IG9wZW5lbmluZ3MucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbW5keCA9IDA7IG1uZHggPCBhbHRlcm5hdG9yLm1hdGNoZXMubGVuZ3RoOyBtbmR4KyspIGFsdGVybmF0b3IubWF0Y2hlc1ttbmR4XS5pc0dyb3VwICYmIChhbHRlcm5hdG9yLm1hdGNoZXNbbW5keF0uaXNHcm91cCA9ICExKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZW5pbmdzLmxlbmd0aCA+IDAgPyAoY3VycmVudE9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3Nbb3BlbmVuaW5ncy5sZW5ndGggLSAxXSkubWF0Y2hlcy5wdXNoKGFsdGVybmF0b3IpIDogY3VycmVudFRva2VuLm1hdGNoZXMucHVzaChhbHRlcm5hdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGluc2VydFRlc3REZWZpbml0aW9uKGN1cnJlbnRUb2tlbiwgbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdyb3VwaWZ5KG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwVG9rZW4gPSBuZXcgTWFza1Rva2VuKCEwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwVG9rZW4ub3Blbkdyb3VwID0gITEsIGdyb3VwVG9rZW4ubWF0Y2hlcyA9IG1hdGNoZXMsIGdyb3VwVG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAocmVnZXhNYXNrICYmIChvcHRzLm9wdGlvbmFsbWFya2VyWzBdID0gdW5kZWZpbmVkLCBvcHRzLm9wdGlvbmFsbWFya2VyWzFdID0gdW5kZWZpbmVkKTsgbWF0Y2ggPSByZWdleE1hc2sgPyByZWdleFRva2VuaXplci5leGVjKG1hc2spIDogdG9rZW5pemVyLmV4ZWMobWFzayk7ICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobSA9IG1hdGNoWzBdLCByZWdleE1hc2spIHN3aXRjaCAobS5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiP1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbSA9IFwiezAsMX1cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIitcIjpcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiKlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbSA9IFwie1wiICsgbSArIFwifVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChlc2NhcGVkKSBkZWZhdWx0Q2FzZSgpOyBlbHNlIHN3aXRjaCAobS5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9wdHMuZXNjYXBlQ2hhcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVzY2FwZWQgPSAhMCwgcmVnZXhNYXNrICYmIGRlZmF1bHRDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5vcHRpb25hbG1hcmtlclsxXTpcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9wdHMuZ3JvdXBtYXJrZXJbMV06XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3MucG9wKCkpLm9wZW5Hcm91cCA9ICExLCBvcGVuaW5nVG9rZW4gIT09IHVuZGVmaW5lZCkgaWYgKG9wZW5lbmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY3VycmVudE9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3Nbb3BlbmVuaW5ncy5sZW5ndGggLSAxXSkubWF0Y2hlcy5wdXNoKG9wZW5pbmdUb2tlbiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRPcGVuaW5nVG9rZW4uaXNBbHRlcm5hdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0b3IgPSBvcGVuZW5pbmdzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtbmR4ID0gMDsgbW5keCA8IGFsdGVybmF0b3IubWF0Y2hlcy5sZW5ndGg7IG1uZHgrKykgYWx0ZXJuYXRvci5tYXRjaGVzW21uZHhdLmlzR3JvdXAgPSAhMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0b3IubWF0Y2hlc1ttbmR4XS5hbHRlcm5hdG9yR3JvdXAgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVuaW5ncy5sZW5ndGggPiAwID8gKGN1cnJlbnRPcGVuaW5nVG9rZW4gPSBvcGVuZW5pbmdzW29wZW5lbmluZ3MubGVuZ3RoIC0gMV0pLm1hdGNoZXMucHVzaChhbHRlcm5hdG9yKSA6IGN1cnJlbnRUb2tlbi5tYXRjaGVzLnB1c2goYWx0ZXJuYXRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGN1cnJlbnRUb2tlbi5tYXRjaGVzLnB1c2gob3BlbmluZ1Rva2VuKTsgZWxzZSBkZWZhdWx0Q2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9wdHMub3B0aW9uYWxtYXJrZXJbMF06XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZW5pbmdzLnB1c2gobmV3IE1hc2tUb2tlbighMSwgITApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLmdyb3VwbWFya2VyWzBdOlxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVuaW5ncy5wdXNoKG5ldyBNYXNrVG9rZW4oITApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLnF1YW50aWZpZXJtYXJrZXJbMF06XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcXVhbnRpZmllciA9IG5ldyBNYXNrVG9rZW4oITEsICExLCAhMCksIG1xaiA9IChtID0gbS5yZXBsYWNlKC9be31dL2csIFwiXCIpKS5zcGxpdChcInxcIiksIG1xID0gbXFqWzBdLnNwbGl0KFwiLFwiKSwgbXEwID0gaXNOYU4obXFbMF0pID8gbXFbMF0gOiBwYXJzZUludChtcVswXSksIG1xMSA9IDEgPT09IG1xLmxlbmd0aCA/IG1xMCA6IGlzTmFOKG1xWzFdKSA/IG1xWzFdIDogcGFyc2VJbnQobXFbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIqXCIgIT09IG1xMSAmJiBcIitcIiAhPT0gbXExIHx8IChtcTAgPSBcIipcIiA9PT0gbXExID8gMCA6IDEpLCBxdWFudGlmaWVyLnF1YW50aWZpZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiBtcTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiBtcTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaml0OiBtcWpbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IG9wZW5lbmluZ3MubGVuZ3RoID4gMCA/IG9wZW5lbmluZ3Nbb3BlbmVuaW5ncy5sZW5ndGggLSAxXS5tYXRjaGVzIDogY3VycmVudFRva2VuLm1hdGNoZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcy5wb3AoKSkuaXNBbHRlcm5hdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKG1hdGNoKSwgbWF0Y2hlcyA9IG1hdGNoLm1hdGNoZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwVG9rZW4gPSBuZXcgTWFza1Rva2VuKCEwKSwgdG1wTWF0Y2ggPSBtYXRjaGVzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChncm91cFRva2VuKSwgbWF0Y2hlcyA9IGdyb3VwVG9rZW4ubWF0Y2hlcywgbWF0Y2ggPSB0bXBNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoLmlzR3JvdXAgfHwgKG1hdGNoID0gZ3JvdXBpZnkoWyBtYXRjaCBdKSksIG1hdGNoZXMucHVzaChtYXRjaCksIG1hdGNoZXMucHVzaChxdWFudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLmFsdGVybmF0b3JtYXJrZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBRdWFudGlmaWVyID0gZnVuY3Rpb24obWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXN0TWF0Y2ggPSBtYXRjaGVzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsYXN0TWF0Y2guaXNRdWFudGlmaWVyICYmIChsYXN0TWF0Y2ggPSBncm91cGlmeShbIG1hdGNoZXMucG9wKCksIGxhc3RNYXRjaCBdKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVuaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YlRva2VuID0gKGN1cnJlbnRPcGVuaW5nVG9rZW4gPSBvcGVuZW5pbmdzW29wZW5lbmluZ3MubGVuZ3RoIC0gMV0pLm1hdGNoZXNbY3VycmVudE9wZW5pbmdUb2tlbi5tYXRjaGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaCA9IGN1cnJlbnRPcGVuaW5nVG9rZW4ub3Blbkdyb3VwICYmIChzdWJUb2tlbi5tYXRjaGVzID09PSB1bmRlZmluZWQgfHwgITEgPT09IHN1YlRva2VuLmlzR3JvdXAgJiYgITEgPT09IHN1YlRva2VuLmlzQWx0ZXJuYXRvcikgPyBvcGVuZW5pbmdzLnBvcCgpIDogZ3JvdXBRdWFudGlmaWVyKGN1cnJlbnRPcGVuaW5nVG9rZW4ubWF0Y2hlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgbGFzdE1hdGNoID0gZ3JvdXBRdWFudGlmaWVyKGN1cnJlbnRUb2tlbi5tYXRjaGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0TWF0Y2guaXNBbHRlcm5hdG9yKSBvcGVuZW5pbmdzLnB1c2gobGFzdE1hdGNoKTsgZWxzZSBpZiAobGFzdE1hdGNoLmFsdGVybmF0b3JHcm91cCA/IChhbHRlcm5hdG9yID0gb3BlbmVuaW5ncy5wb3AoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2guYWx0ZXJuYXRvckdyb3VwID0gITEpIDogYWx0ZXJuYXRvciA9IG5ldyBNYXNrVG9rZW4oITEsICExLCAhMSwgITApLCBhbHRlcm5hdG9yLm1hdGNoZXMucHVzaChsYXN0TWF0Y2gpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lbmluZ3MucHVzaChhbHRlcm5hdG9yKSwgbGFzdE1hdGNoLm9wZW5Hcm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaC5vcGVuR3JvdXAgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0ZXJuYXRvckdyb3VwID0gbmV3IE1hc2tUb2tlbighMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRvckdyb3VwLmFsdGVybmF0b3JHcm91cCA9ICEwLCBvcGVuZW5pbmdzLnB1c2goYWx0ZXJuYXRvckdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICg7b3BlbmVuaW5ncy5sZW5ndGggPiAwOyApIG9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3MucG9wKCksIGN1cnJlbnRUb2tlbi5tYXRjaGVzLnB1c2gob3BlbmluZ1Rva2VuKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFRva2VuLm1hdGNoZXMubGVuZ3RoID4gMCAmJiAoIWZ1bmN0aW9uIHZlcmlmeUdyb3VwTWFya2VyKG1hc2tUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICBtYXNrVG9rZW4gJiYgbWFza1Rva2VuLm1hdGNoZXMgJiYgJC5lYWNoKG1hc2tUb2tlbi5tYXRjaGVzLCBmdW5jdGlvbihuZHgsIHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dFRva2VuID0gbWFza1Rva2VuLm1hdGNoZXNbbmR4ICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAobmV4dFRva2VuID09PSB1bmRlZmluZWQgfHwgbmV4dFRva2VuLm1hdGNoZXMgPT09IHVuZGVmaW5lZCB8fCAhMSA9PT0gbmV4dFRva2VuLmlzUXVhbnRpZmllcikgJiYgdG9rZW4gJiYgdG9rZW4uaXNHcm91cCAmJiAodG9rZW4uaXNHcm91cCA9ICExLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4TWFzayB8fCAoaW5zZXJ0VGVzdERlZmluaXRpb24odG9rZW4sIG9wdHMuZ3JvdXBtYXJrZXJbMF0sIDApLCAhMCAhPT0gdG9rZW4ub3Blbkdyb3VwICYmIGluc2VydFRlc3REZWZpbml0aW9uKHRva2VuLCBvcHRzLmdyb3VwbWFya2VyWzFdKSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcmlmeUdyb3VwTWFya2VyKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfShjdXJyZW50VG9rZW4pLCBtYXNrVG9rZW5zLnB1c2goY3VycmVudFRva2VuKSksIChvcHRzLm51bWVyaWNJbnB1dCB8fCBvcHRzLmlzUlRMKSAmJiBmdW5jdGlvbiByZXZlcnNlVG9rZW5zKG1hc2tUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtYXRjaCBpbiBtYXNrVG9rZW4ubWF0Y2hlcyA9IG1hc2tUb2tlbi5tYXRjaGVzLnJldmVyc2UoKSwgbWFza1Rva2VuLm1hdGNoZXMpIGlmIChtYXNrVG9rZW4ubWF0Y2hlcy5oYXNPd25Qcm9wZXJ0eShtYXRjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnRNYXRjaCA9IHBhcnNlSW50KG1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF0uaXNRdWFudGlmaWVyICYmIG1hc2tUb2tlbi5tYXRjaGVzW2ludE1hdGNoICsgMV0gJiYgbWFza1Rva2VuLm1hdGNoZXNbaW50TWF0Y2ggKyAxXS5pc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHF0ID0gbWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tUb2tlbi5tYXRjaGVzLnNwbGljZShtYXRjaCwgMSksIG1hc2tUb2tlbi5tYXRjaGVzLnNwbGljZShpbnRNYXRjaCArIDEsIDAsIHF0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXS5tYXRjaGVzICE9PSB1bmRlZmluZWQgPyBtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF0gPSByZXZlcnNlVG9rZW5zKG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXSkgOiBtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF0gPSAoKHN0ID0gbWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdKSA9PT0gb3B0cy5vcHRpb25hbG1hcmtlclswXSA/IHN0ID0gb3B0cy5vcHRpb25hbG1hcmtlclsxXSA6IHN0ID09PSBvcHRzLm9wdGlvbmFsbWFya2VyWzFdID8gc3QgPSBvcHRzLm9wdGlvbmFsbWFya2VyWzBdIDogc3QgPT09IG9wdHMuZ3JvdXBtYXJrZXJbMF0gPyBzdCA9IG9wdHMuZ3JvdXBtYXJrZXJbMV0gOiBzdCA9PT0gb3B0cy5ncm91cG1hcmtlclsxXSAmJiAoc3QgPSBvcHRzLmdyb3VwbWFya2VyWzBdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBzdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFza1Rva2VuO1xuICAgICAgICAgICAgICAgIH0obWFza1Rva2Vuc1swXSksIG1hc2tUb2tlbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIElucHV0bWFzay5leHRlbmREZWZhdWx0cyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICQuZXh0ZW5kKCEwLCBJbnB1dG1hc2sucHJvdG90eXBlLmRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLmV4dGVuZERlZmluaXRpb25zID0gZnVuY3Rpb24oZGVmaW5pdGlvbikge1xuICAgICAgICAgICAgJC5leHRlbmQoITAsIElucHV0bWFzay5wcm90b3R5cGUuZGVmaW5pdGlvbnMsIGRlZmluaXRpb24pO1xuICAgICAgICB9LCBJbnB1dG1hc2suZXh0ZW5kQWxpYXNlcyA9IGZ1bmN0aW9uKGFsaWFzKSB7XG4gICAgICAgICAgICAkLmV4dGVuZCghMCwgSW5wdXRtYXNrLnByb3RvdHlwZS5hbGlhc2VzLCBhbGlhcyk7XG4gICAgICAgIH0sIElucHV0bWFzay5mb3JtYXQgPSBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucywgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBJbnB1dG1hc2sob3B0aW9ucykuZm9ybWF0KHZhbHVlLCBtZXRhZGF0YSk7XG4gICAgICAgIH0sIElucHV0bWFzay51bm1hc2sgPSBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIElucHV0bWFzayhvcHRpb25zKS51bm1hc2tlZHZhbHVlKHZhbHVlKTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLmlzVmFsaWQgPSBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIElucHV0bWFzayhvcHRpb25zKS5pc1ZhbGlkKHZhbHVlKTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLnJlbW92ZSA9IGZ1bmN0aW9uKGVsZW1zKSB7XG4gICAgICAgICAgICBcInN0cmluZ1wiID09IHR5cGVvZiBlbGVtcyAmJiAoZWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtcykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtcykpLCBcbiAgICAgICAgICAgIGVsZW1zID0gZWxlbXMubm9kZU5hbWUgPyBbIGVsZW1zIF0gOiBlbGVtcywgJC5lYWNoKGVsZW1zLCBmdW5jdGlvbihuZHgsIGVsKSB7XG4gICAgICAgICAgICAgICAgZWwuaW5wdXRtYXNrICYmIGVsLmlucHV0bWFzay5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBJbnB1dG1hc2suc2V0VmFsdWUgPSBmdW5jdGlvbihlbGVtcywgdmFsdWUpIHtcbiAgICAgICAgICAgIFwic3RyaW5nXCIgPT0gdHlwZW9mIGVsZW1zICYmIChlbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1zKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1zKSksIFxuICAgICAgICAgICAgZWxlbXMgPSBlbGVtcy5ub2RlTmFtZSA/IFsgZWxlbXMgXSA6IGVsZW1zLCAkLmVhY2goZWxlbXMsIGZ1bmN0aW9uKG5keCwgZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2sgPyBlbC5pbnB1dG1hc2suc2V0VmFsdWUodmFsdWUpIDogJChlbCkudHJpZ2dlcihcInNldHZhbHVlXCIsIFsgdmFsdWUgXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIihcXFxcXCIgKyBbIFwiL1wiLCBcIi5cIiwgXCIqXCIsIFwiK1wiLCBcIj9cIiwgXCJ8XCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIFwiXFxcXFwiLCBcIiRcIiwgXCJeXCIgXS5qb2luKFwifFxcXFxcIikgKyBcIilcIiwgXCJnaW1cIiksIFwiXFxcXCQxXCIpO1xuICAgICAgICB9LCBJbnB1dG1hc2sua2V5Q29kZSA9IHtcbiAgICAgICAgICAgIEJBQ0tTUEFDRTogOCxcbiAgICAgICAgICAgIEJBQ0tTUEFDRV9TQUZBUkk6IDEyNyxcbiAgICAgICAgICAgIERFTEVURTogNDYsXG4gICAgICAgICAgICBET1dOOiA0MCxcbiAgICAgICAgICAgIEVORDogMzUsXG4gICAgICAgICAgICBFTlRFUjogMTMsXG4gICAgICAgICAgICBFU0NBUEU6IDI3LFxuICAgICAgICAgICAgSE9NRTogMzYsXG4gICAgICAgICAgICBJTlNFUlQ6IDQ1LFxuICAgICAgICAgICAgTEVGVDogMzcsXG4gICAgICAgICAgICBQQUdFX0RPV046IDM0LFxuICAgICAgICAgICAgUEFHRV9VUDogMzMsXG4gICAgICAgICAgICBSSUdIVDogMzksXG4gICAgICAgICAgICBTUEFDRTogMzIsXG4gICAgICAgICAgICBUQUI6IDksXG4gICAgICAgICAgICBVUDogMzgsXG4gICAgICAgICAgICBYOiA4OCxcbiAgICAgICAgICAgIENPTlRST0w6IDE3XG4gICAgICAgIH0sIElucHV0bWFzaztcbiAgICB9LCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fID0gWyBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpIF0sIFxuICAgIHZvaWQgMCA9PT0gKF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiAoX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fID0gZmFjdG9yeSkgPyBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18uYXBwbHkoZXhwb3J0cywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXykgOiBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18pIHx8IChtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fKTtcbn0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0galF1ZXJ5O1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgX193ZWJwYWNrX3JlcXVpcmVfXyg0KSwgX193ZWJwYWNrX3JlcXVpcmVfXyg3KSwgX193ZWJwYWNrX3JlcXVpcmVfXyg4KSwgX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcbiAgICB2YXIgX2lucHV0bWFzazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMSkpLCBfaW5wdXRtYXNrNCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXygwKSksIF9qcXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfX3dlYnBhY2tfcmVxdWlyZV9fKDIpKTtcbiAgICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgICAgIH07XG4gICAgfVxuICAgIF9pbnB1dG1hc2s0LmRlZmF1bHQgPT09IF9qcXVlcnkyLmRlZmF1bHQgJiYgX193ZWJwYWNrX3JlcXVpcmVfXygxMCksIHdpbmRvdy5JbnB1dG1hc2sgPSBfaW5wdXRtYXNrMi5kZWZhdWx0O1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18sIGZhY3Rvcnk7XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICAgIGZhY3RvcnkgPSBmdW5jdGlvbigkLCBJbnB1dG1hc2spIHtcbiAgICAgICAgdmFyIGZvcm1hdENvZGUgPSB7XG4gICAgICAgICAgICBkOiBbIFwiWzEtOV18WzEyXVswLTldfDNbMDFdXCIsIERhdGUucHJvdG90eXBlLnNldERhdGUsIFwiZGF5XCIsIERhdGUucHJvdG90eXBlLmdldERhdGUgXSxcbiAgICAgICAgICAgIGRkOiBbIFwiMFsxLTldfFsxMl1bMC05XXwzWzAxXVwiLCBEYXRlLnByb3RvdHlwZS5zZXREYXRlLCBcImRheVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldERhdGUuY2FsbCh0aGlzKSwgMik7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBkZGQ6IFsgXCJcIiBdLFxuICAgICAgICAgICAgZGRkZDogWyBcIlwiIF0sXG4gICAgICAgICAgICBtOiBbIFwiWzEtOV18MVswMTJdXCIsIERhdGUucHJvdG90eXBlLnNldE1vbnRoLCBcIm1vbnRoXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEYXRlLnByb3RvdHlwZS5nZXRNb250aC5jYWxsKHRoaXMpICsgMTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIG1tOiBbIFwiMFsxLTldfDFbMDEyXVwiLCBEYXRlLnByb3RvdHlwZS5zZXRNb250aCwgXCJtb250aFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldE1vbnRoLmNhbGwodGhpcykgKyAxLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIG1tbTogWyBcIlwiIF0sXG4gICAgICAgICAgICBtbW1tOiBbIFwiXCIgXSxcbiAgICAgICAgICAgIHl5OiBbIFwiWzAtOV17Mn1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0RnVsbFllYXIsIFwieWVhclwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldEZ1bGxZZWFyLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgeXl5eTogWyBcIlswLTldezR9XCIsIERhdGUucHJvdG90eXBlLnNldEZ1bGxZZWFyLCBcInllYXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRGdWxsWWVhci5jYWxsKHRoaXMpLCA0KTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIGg6IFsgXCJbMS05XXwxWzAtMl1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0SG91cnMsIFwiaG91cnNcIiwgRGF0ZS5wcm90b3R5cGUuZ2V0SG91cnMgXSxcbiAgICAgICAgICAgIGhoOiBbIFwiMFsxLTldfDFbMC0yXVwiLCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldEhvdXJzLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgaGhoOiBbIFwiWzAtOV0rXCIsIERhdGUucHJvdG90eXBlLnNldEhvdXJzLCBcImhvdXJzXCIsIERhdGUucHJvdG90eXBlLmdldEhvdXJzIF0sXG4gICAgICAgICAgICBIOiBbIFwiMT9bMC05XXwyWzAtM11cIiwgRGF0ZS5wcm90b3R5cGUuc2V0SG91cnMsIFwiaG91cnNcIiwgRGF0ZS5wcm90b3R5cGUuZ2V0SG91cnMgXSxcbiAgICAgICAgICAgIEhIOiBbIFwiWzAxXVswLTldfDJbMC0zXVwiLCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldEhvdXJzLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgSEhIOiBbIFwiWzAtOV0rXCIsIERhdGUucHJvdG90eXBlLnNldEhvdXJzLCBcImhvdXJzXCIsIERhdGUucHJvdG90eXBlLmdldEhvdXJzIF0sXG4gICAgICAgICAgICBNOiBbIFwiWzEtNV0/WzAtOV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TWludXRlcywgXCJtaW51dGVzXCIsIERhdGUucHJvdG90eXBlLmdldE1pbnV0ZXMgXSxcbiAgICAgICAgICAgIE1NOiBbIFwiWzAtNV1bMC05XVwiLCBEYXRlLnByb3RvdHlwZS5zZXRNaW51dGVzLCBcIm1pbnV0ZXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRNaW51dGVzLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgczogWyBcIlsxLTVdP1swLTldXCIsIERhdGUucHJvdG90eXBlLnNldFNlY29uZHMsIFwic2Vjb25kc1wiLCBEYXRlLnByb3RvdHlwZS5nZXRTZWNvbmRzIF0sXG4gICAgICAgICAgICBzczogWyBcIlswLTVdWzAtOV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0U2Vjb25kcywgXCJzZWNvbmRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0U2Vjb25kcy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIGw6IFsgXCJbMC05XXszfVwiLCBEYXRlLnByb3RvdHlwZS5zZXRNaWxsaXNlY29uZHMsIFwibWlsbGlzZWNvbmRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0TWlsbGlzZWNvbmRzLmNhbGwodGhpcyksIDMpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgTDogWyBcIlswLTldezJ9XCIsIERhdGUucHJvdG90eXBlLnNldE1pbGxpc2Vjb25kcywgXCJtaWxsaXNlY29uZHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRNaWxsaXNlY29uZHMuY2FsbCh0aGlzKSwgMik7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICB0OiBbIFwiW2FwXVwiIF0sXG4gICAgICAgICAgICB0dDogWyBcIlthcF1tXCIgXSxcbiAgICAgICAgICAgIFQ6IFsgXCJbQVBdXCIgXSxcbiAgICAgICAgICAgIFRUOiBbIFwiW0FQXU1cIiBdLFxuICAgICAgICAgICAgWjogWyBcIlwiIF0sXG4gICAgICAgICAgICBvOiBbIFwiXCIgXSxcbiAgICAgICAgICAgIFM6IFsgXCJcIiBdXG4gICAgICAgIH0sIGZvcm1hdEFsaWFzID0ge1xuICAgICAgICAgICAgaXNvRGF0ZTogXCJ5eXl5LW1tLWRkXCIsXG4gICAgICAgICAgICBpc29UaW1lOiBcIkhIOk1NOnNzXCIsXG4gICAgICAgICAgICBpc29EYXRlVGltZTogXCJ5eXl5LW1tLWRkJ1QnSEg6TU06c3NcIixcbiAgICAgICAgICAgIGlzb1V0Y0RhdGVUaW1lOiBcIlVUQzp5eXl5LW1tLWRkJ1QnSEg6TU06c3MnWidcIlxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXRUb2tlbml6ZXIob3B0cykge1xuICAgICAgICAgICAgaWYgKCFvcHRzLnRva2VuaXplcikge1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuZHggaW4gZm9ybWF0Q29kZSkgLTEgPT09IHRva2Vucy5pbmRleE9mKG5keFswXSkgJiYgdG9rZW5zLnB1c2gobmR4WzBdKTtcbiAgICAgICAgICAgICAgICBvcHRzLnRva2VuaXplciA9IFwiKFwiICsgdG9rZW5zLmpvaW4oXCIrfFwiKSArIFwiKSs/fC5cIiwgb3B0cy50b2tlbml6ZXIgPSBuZXcgUmVnRXhwKG9wdHMudG9rZW5pemVyLCBcImdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3B0cy50b2tlbml6ZXI7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGFyc2UoZm9ybWF0LCBkYXRlT2JqVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIG1hdGNoLCBtYXNrID0gXCJcIjsgbWF0Y2ggPSBnZXRUb2tlbml6ZXIob3B0cykuZXhlYyhmb3JtYXQpOyApIHtcbiAgICAgICAgICAgICAgICBpZiAodm9pZCAwID09PSBkYXRlT2JqVmFsdWUpIGlmIChmb3JtYXRDb2RlW21hdGNoWzBdXSkgbWFzayArPSBcIihcIiArIGZvcm1hdENvZGVbbWF0Y2hbMF1dWzBdICsgXCIpXCI7IGVsc2Ugc3dpdGNoIChtYXRjaFswXSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcIltcIjpcbiAgICAgICAgICAgICAgICAgICAgbWFzayArPSBcIihcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJdXCI6XG4gICAgICAgICAgICAgICAgICAgIG1hc2sgKz0gXCIpP1wiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgbWFzayArPSBJbnB1dG1hc2suZXNjYXBlUmVnZXgobWF0Y2hbMF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0Q29kZVttYXRjaFswXV0pIG1hc2sgKz0gZm9ybWF0Q29kZVttYXRjaFswXV1bM10uY2FsbChkYXRlT2JqVmFsdWUuZGF0ZSk7IGVsc2UgbWFzayArPSBtYXRjaFswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtYXNrO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHBhZCh2YWwsIGxlbikge1xuICAgICAgICAgICAgZm9yICh2YWwgPSBTdHJpbmcodmFsKSwgbGVuID0gbGVuIHx8IDI7IHZhbC5sZW5ndGggPCBsZW47ICkgdmFsID0gXCIwXCIgKyB2YWw7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFuYWx5c2VNYXNrKG1hc2tTdHJpbmcsIGZvcm1hdCwgb3B0cykge1xuICAgICAgICAgICAgdmFyIHRhcmdldFByb3AsIG1hdGNoLCBkYXRlT3BlcmF0aW9uLCBkYXRlT2JqID0ge1xuICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKDEsIDAsIDEpXG4gICAgICAgICAgICB9LCBtYXNrID0gbWFza1N0cmluZztcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4dGVuZFllYXIoeWVhcikge1xuICAgICAgICAgICAgICAgIHZhciBjb3JyZWN0ZWR5ZWFyID0gNCA9PT0geWVhci5sZW5ndGggPyB5ZWFyIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkuc3Vic3RyKDAsIDQgLSB5ZWFyLmxlbmd0aCkgKyB5ZWFyO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLm1pbiAmJiBvcHRzLm1pbi55ZWFyICYmIG9wdHMubWF4ICYmIG9wdHMubWF4LnllYXIgPyAoY29ycmVjdGVkeWVhciA9IGNvcnJlY3RlZHllYXIucmVwbGFjZSgvW14wLTldL2csIFwiXCIpLCBcbiAgICAgICAgICAgICAgICBjb3JyZWN0ZWR5ZWFyICs9IG9wdHMubWluLnllYXIgPT0gb3B0cy5tYXgueWVhciA/IG9wdHMubWluLnllYXIuc3Vic3RyKGNvcnJlY3RlZHllYXIubGVuZ3RoKSA6IChcIlwiICE9PSBjb3JyZWN0ZWR5ZWFyICYmIDAgPT0gb3B0cy5tYXgueWVhci5pbmRleE9mKGNvcnJlY3RlZHllYXIpID8gcGFyc2VJbnQob3B0cy5tYXgueWVhcikgLSAxIDogcGFyc2VJbnQob3B0cy5taW4ueWVhcikgKyAxKS50b1N0cmluZygpLnN1YnN0cihjb3JyZWN0ZWR5ZWFyLmxlbmd0aCkpIDogY29ycmVjdGVkeWVhciA9IGNvcnJlY3RlZHllYXIucmVwbGFjZSgvW14wLTldL2csIFwiMFwiKSwgXG4gICAgICAgICAgICAgICAgY29ycmVjdGVkeWVhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFZhbHVlKGRhdGVPYmosIHZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgXCJ5ZWFyXCIgPT09IHRhcmdldFByb3AgPyAoZGF0ZU9ialt0YXJnZXRQcm9wXSA9IGV4dGVuZFllYXIodmFsdWUpLCBkYXRlT2JqW1wicmF3XCIgKyB0YXJnZXRQcm9wXSA9IHZhbHVlKSA6IGRhdGVPYmpbdGFyZ2V0UHJvcF0gPSBvcHRzLm1pbiAmJiB2YWx1ZS5tYXRjaCgvW14wLTldLykgPyBvcHRzLm1pblt0YXJnZXRQcm9wXSA6IHZhbHVlLCBcbiAgICAgICAgICAgICAgICB2b2lkIDAgIT09IGRhdGVPcGVyYXRpb24gJiYgZGF0ZU9wZXJhdGlvbi5jYWxsKGRhdGVPYmouZGF0ZSwgXCJtb250aFwiID09IHRhcmdldFByb3AgPyBwYXJzZUludChkYXRlT2JqW3RhcmdldFByb3BdKSAtIDEgOiBkYXRlT2JqW3RhcmdldFByb3BdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBtYXNrKSB7XG4gICAgICAgICAgICAgICAgZm9yICg7bWF0Y2ggPSBnZXRUb2tlbml6ZXIob3B0cykuZXhlYyhmb3JtYXQpOyApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gbWFzay5zbGljZSgwLCBtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXRDb2RlLmhhc093blByb3BlcnR5KG1hdGNoWzBdKSAmJiAodGFyZ2V0UHJvcCA9IGZvcm1hdENvZGVbbWF0Y2hbMF1dWzJdLCBkYXRlT3BlcmF0aW9uID0gZm9ybWF0Q29kZVttYXRjaFswXV1bMV0sIFxuICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZShkYXRlT2JqLCB2YWx1ZSwgb3B0cykpLCBtYXNrID0gbWFzay5zbGljZSh2YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZU9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSW5wdXRtYXNrLmV4dGVuZEFsaWFzZXMoe1xuICAgICAgICAgICAgZGF0ZXRpbWU6IHtcbiAgICAgICAgICAgICAgICBtYXNrOiBmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRDb2RlLlMgPSBvcHRzLmkxOG4ub3JkaW5hbFN1ZmZpeC5qb2luKFwifFwiKSwgb3B0cy5pbnB1dEZvcm1hdCA9IGZvcm1hdEFsaWFzW29wdHMuaW5wdXRGb3JtYXRdIHx8IG9wdHMuaW5wdXRGb3JtYXQsIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLmRpc3BsYXlGb3JtYXQgPSBmb3JtYXRBbGlhc1tvcHRzLmRpc3BsYXlGb3JtYXRdIHx8IG9wdHMuZGlzcGxheUZvcm1hdCB8fCBvcHRzLmlucHV0Rm9ybWF0LCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5vdXRwdXRGb3JtYXQgPSBmb3JtYXRBbGlhc1tvcHRzLm91dHB1dEZvcm1hdF0gfHwgb3B0cy5vdXRwdXRGb3JtYXQgfHwgb3B0cy5pbnB1dEZvcm1hdCwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGxhY2Vob2xkZXIgPSBcIlwiICE9PSBvcHRzLnBsYWNlaG9sZGVyID8gb3B0cy5wbGFjZWhvbGRlciA6IG9wdHMuaW5wdXRGb3JtYXQucmVwbGFjZSgvW1xcW1xcXV0vLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMubWluID0gYW5hbHlzZU1hc2sob3B0cy5taW4sIG9wdHMuaW5wdXRGb3JtYXQsIG9wdHMpLCBvcHRzLm1heCA9IGFuYWx5c2VNYXNrKG9wdHMubWF4LCBvcHRzLmlucHV0Rm9ybWF0LCBvcHRzKSwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucmVnZXggPSBwYXJzZShvcHRzLmlucHV0Rm9ybWF0LCB2b2lkIDAsIG9wdHMpLCBudWxsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgaW5wdXRGb3JtYXQ6IFwiaXNvRGF0ZVRpbWVcIixcbiAgICAgICAgICAgICAgICBkaXNwbGF5Rm9ybWF0OiB2b2lkIDAsXG4gICAgICAgICAgICAgICAgb3V0cHV0Rm9ybWF0OiB2b2lkIDAsXG4gICAgICAgICAgICAgICAgbWluOiBudWxsLFxuICAgICAgICAgICAgICAgIG1heDogbnVsbCxcbiAgICAgICAgICAgICAgICBpMThuOiB7XG4gICAgICAgICAgICAgICAgICAgIGRheU5hbWVzOiBbIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCIsIFwiU3VuXCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIiwgXCJTdW5kYXlcIiBdLFxuICAgICAgICAgICAgICAgICAgICBtb250aE5hbWVzOiBbIFwiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCIsIFwiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIiBdLFxuICAgICAgICAgICAgICAgICAgICBvcmRpbmFsU3VmZml4OiBbIFwic3RcIiwgXCJuZFwiLCBcInJkXCIsIFwidGhcIiBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3N0VmFsaWRhdGlvbjogZnVuY3Rpb24oYnVmZmVyLCBjdXJyZW50UmVzdWx0LCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjdXJyZW50UmVzdWx0LCBkYXRlUGFydHMgPSBhbmFseXNlTWFzayhidWZmZXIuam9pbihcIlwiKSwgb3B0cy5pbnB1dEZvcm1hdCwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgJiYgZGF0ZVBhcnRzLmRhdGUuZ2V0VGltZSgpID09IGRhdGVQYXJ0cy5kYXRlLmdldFRpbWUoKSAmJiAocmVzdWx0ID0gKHJlc3VsdCA9IGZ1bmN0aW9uKGRhdGVQYXJ0cywgY3VycmVudFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICghaXNGaW5pdGUoZGF0ZVBhcnRzLmRheSkgfHwgXCIyOVwiID09IGRhdGVQYXJ0cy5kYXkgJiYgIWlzRmluaXRlKGRhdGVQYXJ0cy5yYXd5ZWFyKSB8fCBuZXcgRGF0ZShkYXRlUGFydHMuZGF0ZS5nZXRGdWxsWWVhcigpLCBpc0Zpbml0ZShkYXRlUGFydHMubW9udGgpID8gZGF0ZVBhcnRzLm1vbnRoIDogZGF0ZVBhcnRzLmRhdGUuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKSA+PSBkYXRlUGFydHMuZGF5KSAmJiBjdXJyZW50UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KGRhdGVQYXJ0cywgcmVzdWx0KSkgJiYgZnVuY3Rpb24oZGF0ZVBhcnRzLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5taW4gJiYgb3B0cy5taW4uZGF0ZS5nZXRUaW1lKCkgPT0gb3B0cy5taW4uZGF0ZS5nZXRUaW1lKCkgJiYgKHJlc3VsdCA9IG9wdHMubWluLmRhdGUuZ2V0VGltZSgpIDw9IGRhdGVQYXJ0cy5kYXRlLmdldFRpbWUoKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICYmIG9wdHMubWF4ICYmIG9wdHMubWF4LmRhdGUuZ2V0VGltZSgpID09IG9wdHMubWF4LmRhdGUuZ2V0VGltZSgpICYmIChyZXN1bHQgPSBvcHRzLm1heC5kYXRlLmdldFRpbWUoKSA+PSBkYXRlUGFydHMuZGF0ZS5nZXRUaW1lKCkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfShkYXRlUGFydHMsIG9wdHMpKSwgcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiBmdW5jdGlvbihlLCBidWZmZXIsIGNhcmV0UG9zLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmN0cmxLZXkgJiYgZS5rZXlDb2RlID09PSBJbnB1dG1hc2sua2V5Q29kZS5SSUdIVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbWF0Y2gsIHRvZGF5ID0gbmV3IERhdGUoKSwgZGF0ZSA9IFwiXCI7IG1hdGNoID0gZ2V0VG9rZW5pemVyKG9wdHMpLmV4ZWMob3B0cy5pbnB1dEZvcm1hdCk7ICkgXCJkXCIgPT09IG1hdGNoWzBdLmNoYXJBdCgwKSA/IGRhdGUgKz0gcGFkKHRvZGF5LmdldERhdGUoKSwgbWF0Y2hbMF0ubGVuZ3RoKSA6IFwibVwiID09PSBtYXRjaFswXS5jaGFyQXQoMCkgPyBkYXRlICs9IHBhZCh0b2RheS5nZXRNb250aCgpICsgMSwgbWF0Y2hbMF0ubGVuZ3RoKSA6IFwieXl5eVwiID09PSBtYXRjaFswXSA/IGRhdGUgKz0gdG9kYXkuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpIDogXCJ5XCIgPT09IG1hdGNoWzBdLmNoYXJBdCgwKSAmJiAoZGF0ZSArPSBwYWQodG9kYXkuZ2V0WWVhcigpLCBtYXRjaFswXS5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRtYXNrLl92YWx1ZVNldChkYXRlKSwgJCh0aGlzKS50cmlnZ2VyKFwic2V0dmFsdWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5NYXNrOiBmdW5jdGlvbihtYXNrZWRWYWx1ZSwgdW5tYXNrZWRWYWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2Uob3B0cy5vdXRwdXRGb3JtYXQsIGFuYWx5c2VNYXNrKG1hc2tlZFZhbHVlLCBvcHRzLmlucHV0Rm9ybWF0LCBvcHRzKSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjYXNpbmc6IGZ1bmN0aW9uKGVsZW0sIHRlc3QsIHBvcywgdmFsaWRQb3NpdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAgPT0gdGVzdC5uYXRpdmVEZWYuaW5kZXhPZihcIlthcF1cIikgPyBlbGVtLnRvTG93ZXJDYXNlKCkgOiAwID09IHRlc3QubmF0aXZlRGVmLmluZGV4T2YoXCJbQVBdXCIpID8gZWxlbS50b1VwcGVyQ2FzZSgpIDogZWxlbTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGluc2VydE1vZGU6ICExXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCBJbnB1dG1hc2s7XG4gICAgfSwgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXyA9IFsgX193ZWJwYWNrX3JlcXVpcmVfXygwKSwgX193ZWJwYWNrX3JlcXVpcmVfXygxKSBdLCBcbiAgICB2b2lkIDAgPT09IChfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXyA9IGZhY3RvcnkpID8gX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLmFwcGx5KGV4cG9ydHMsIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18pIDogX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fKSB8fCAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyk7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX187XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICAgIHZvaWQgMCA9PT0gKF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfS5jYWxsKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18sIGV4cG9ydHMsIG1vZHVsZSkpIHx8IChtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fKTtcbn0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXztcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gICAgdm9pZCAwID09PSAoX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH0uY2FsbChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fLCBleHBvcnRzLCBtb2R1bGUpKSB8fCAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyk7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXywgZmFjdG9yeTtcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gICAgZmFjdG9yeSA9IGZ1bmN0aW9uKCQsIElucHV0bWFzaykge1xuICAgICAgICByZXR1cm4gSW5wdXRtYXNrLmV4dGVuZERlZmluaXRpb25zKHtcbiAgICAgICAgICAgIEE6IHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiW0EtWmEtetCQLdGP0IHRkcOALcO/wrVdXCIsXG4gICAgICAgICAgICAgICAgY2FzaW5nOiBcInVwcGVyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIiZcIjoge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1aYS160JAt0Y/QgdGRw4Atw7/CtV1cIixcbiAgICAgICAgICAgICAgICBjYXNpbmc6IFwidXBwZXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiI1wiOiB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTlBLUZhLWZdXCIsXG4gICAgICAgICAgICAgICAgY2FzaW5nOiBcInVwcGVyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIElucHV0bWFzay5leHRlbmRBbGlhc2VzKHtcbiAgICAgICAgICAgIGNzc3VuaXQ6IHtcbiAgICAgICAgICAgICAgICByZWdleDogXCJbKy1dP1swLTldK1xcXFwuPyhbMC05XSspPyhweHxlbXxyZW18ZXh8JXxpbnxjbXxtbXxwdHxwYylcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVybDoge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihodHRwcz98ZnRwKS8vLipcIixcbiAgICAgICAgICAgICAgICBhdXRvVW5tYXNrOiAhMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlwOiB7XG4gICAgICAgICAgICAgICAgbWFzazogXCJpW2lbaV1dLmlbaVtpXV0uaVtpW2ldXS5pW2lbaV1dXCIsXG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb3MgLSAxID4gLTEgJiYgXCIuXCIgIT09IG1hc2tzZXQuYnVmZmVyW3BvcyAtIDFdID8gKGNocnMgPSBtYXNrc2V0LmJ1ZmZlcltwb3MgLSAxXSArIGNocnMsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocnMgPSBwb3MgLSAyID4gLTEgJiYgXCIuXCIgIT09IG1hc2tzZXQuYnVmZmVyW3BvcyAtIDJdID8gbWFza3NldC5idWZmZXJbcG9zIC0gMl0gKyBjaHJzIDogXCIwXCIgKyBjaHJzKSA6IGNocnMgPSBcIjAwXCIgKyBjaHJzLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFwiMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdWzAtOV1bMC05XVwiKS50ZXN0KGNocnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuTWFzazogZnVuY3Rpb24obWFza2VkVmFsdWUsIHVubWFza2VkVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tlZFZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXRtb2RlOiBcIm51bWVyaWNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgICAgICAgbWFzazogXCIqezEsNjR9Wy4qezEsNjR9XVsuKnsxLDY0fV1bLip7MSw2M31dQC17MSw2M30uLXsxLDYzfVsuLXsxLDYzfV1bLi17MSw2M31dXCIsXG4gICAgICAgICAgICAgICAgZ3JlZWR5OiAhMSxcbiAgICAgICAgICAgICAgICBjYXNpbmc6IFwibG93ZXJcIixcbiAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihwYXN0ZWRWYWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBhc3RlZFZhbHVlID0gcGFzdGVkVmFsdWUudG9Mb3dlckNhc2UoKSkucmVwbGFjZShcIm1haWx0bzpcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBcIipcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTnvvJEt77yZQS1aYS160JAt0Y/QgdGRw4Atw7/CtSEjJCUmJyorLz0/Xl9ge3x9fi1dXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCItXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1aYS16LV1cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuTWFzazogZnVuY3Rpb24obWFza2VkVmFsdWUsIHVubWFza2VkVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tlZFZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXRtb2RlOiBcImVtYWlsXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYWM6IHtcbiAgICAgICAgICAgICAgICBtYXNrOiBcIiMjOiMjOiMjOiMjOiMjOiMjXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aW46IHtcbiAgICAgICAgICAgICAgICBtYXNrOiBcIlZ7MTN9OXs0fVwiLFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIFY6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1ISi1OUFItWmEtaGotbnByLXpcXFxcZF1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogXCJ1cHBlclwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogITAsXG4gICAgICAgICAgICAgICAgYXV0b1VubWFzazogITBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIElucHV0bWFzaztcbiAgICB9LCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fID0gWyBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpIF0sIFxuICAgIHZvaWQgMCA9PT0gKF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiAoX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fID0gZmFjdG9yeSkgPyBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18uYXBwbHkoZXhwb3J0cywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXykgOiBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18pIHx8IChtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fKTtcbn0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fLCBmYWN0b3J5O1xuICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgICBmYWN0b3J5ID0gZnVuY3Rpb24oJCwgSW5wdXRtYXNrLCB1bmRlZmluZWQpIHtcbiAgICAgICAgZnVuY3Rpb24gYXV0b0VzY2FwZSh0eHQsIG9wdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGVzY2FwZWRUeHQgPSBcIlwiLCBpID0gMDsgaSA8IHR4dC5sZW5ndGg7IGkrKykgSW5wdXRtYXNrLnByb3RvdHlwZS5kZWZpbml0aW9uc1t0eHQuY2hhckF0KGkpXSB8fCBvcHRzLmRlZmluaXRpb25zW3R4dC5jaGFyQXQoaSldIHx8IG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQgPT09IHR4dC5jaGFyQXQoaSkgfHwgb3B0cy5vcHRpb25hbG1hcmtlci5lbmQgPT09IHR4dC5jaGFyQXQoaSkgfHwgb3B0cy5xdWFudGlmaWVybWFya2VyLnN0YXJ0ID09PSB0eHQuY2hhckF0KGkpIHx8IG9wdHMucXVhbnRpZmllcm1hcmtlci5lbmQgPT09IHR4dC5jaGFyQXQoaSkgfHwgb3B0cy5ncm91cG1hcmtlci5zdGFydCA9PT0gdHh0LmNoYXJBdChpKSB8fCBvcHRzLmdyb3VwbWFya2VyLmVuZCA9PT0gdHh0LmNoYXJBdChpKSB8fCBvcHRzLmFsdGVybmF0b3JtYXJrZXIgPT09IHR4dC5jaGFyQXQoaSkgPyBlc2NhcGVkVHh0ICs9IFwiXFxcXFwiICsgdHh0LmNoYXJBdChpKSA6IGVzY2FwZWRUeHQgKz0gdHh0LmNoYXJBdChpKTtcbiAgICAgICAgICAgIHJldHVybiBlc2NhcGVkVHh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBJbnB1dG1hc2suZXh0ZW5kQWxpYXNlcyh7XG4gICAgICAgICAgICBudW1lcmljOiB7XG4gICAgICAgICAgICAgICAgbWFzazogZnVuY3Rpb24ob3B0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoMCAhPT0gb3B0cy5yZXBlYXQgJiYgaXNOYU4ob3B0cy5pbnRlZ2VyRGlnaXRzKSAmJiAob3B0cy5pbnRlZ2VyRGlnaXRzID0gb3B0cy5yZXBlYXQpLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5yZXBlYXQgPSAwLCBvcHRzLmdyb3VwU2VwYXJhdG9yID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgb3B0cy5kaWdpdHMgJiYgXCIwXCIgIT09IG9wdHMuZGlnaXRzICYmIChcIi5cIiA9PT0gb3B0cy5yYWRpeFBvaW50ID8gb3B0cy5ncm91cFNlcGFyYXRvciA9IFwiLFwiIDogXCIsXCIgPT09IG9wdHMucmFkaXhQb2ludCA/IG9wdHMuZ3JvdXBTZXBhcmF0b3IgPSBcIi5cIiA6IG9wdHMuZ3JvdXBTZXBhcmF0b3IgPSBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiID09PSBvcHRzLmdyb3VwU2VwYXJhdG9yICYmIChvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgPSB1bmRlZmluZWQpLCBvcHRzLmF1dG9Hcm91cCA9IG9wdHMuYXV0b0dyb3VwICYmIFwiXCIgIT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IsIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLmF1dG9Hcm91cCAmJiAoXCJzdHJpbmdcIiA9PSB0eXBlb2Ygb3B0cy5ncm91cFNpemUgJiYgaXNGaW5pdGUob3B0cy5ncm91cFNpemUpICYmIChvcHRzLmdyb3VwU2l6ZSA9IHBhcnNlSW50KG9wdHMuZ3JvdXBTaXplKSksIFxuICAgICAgICAgICAgICAgICAgICBpc0Zpbml0ZShvcHRzLmludGVnZXJEaWdpdHMpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcHMgPSBNYXRoLmZsb29yKG9wdHMuaW50ZWdlckRpZ2l0cyAvIG9wdHMuZ3JvdXBTaXplKSwgbW9kID0gb3B0cy5pbnRlZ2VyRGlnaXRzICUgb3B0cy5ncm91cFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmludGVnZXJEaWdpdHMgPSBwYXJzZUludChvcHRzLmludGVnZXJEaWdpdHMpICsgKDAgPT09IG1vZCA/IHNlcHMgLSAxIDogc2VwcyksIFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5pbnRlZ2VyRGlnaXRzIDwgMSAmJiAob3B0cy5pbnRlZ2VyRGlnaXRzID0gXCIqXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGxhY2Vob2xkZXIubGVuZ3RoID4gMSAmJiAob3B0cy5wbGFjZWhvbGRlciA9IG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KDApKSwgXG4gICAgICAgICAgICAgICAgICAgIFwicmFkaXhGb2N1c1wiID09PSBvcHRzLnBvc2l0aW9uQ2FyZXRPbkNsaWNrICYmIFwiXCIgPT09IG9wdHMucGxhY2Vob2xkZXIgJiYgITEgPT09IG9wdHMuaW50ZWdlck9wdGlvbmFsICYmIChvcHRzLnBvc2l0aW9uQ2FyZXRPbkNsaWNrID0gXCJsdnBcIiksIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLmRlZmluaXRpb25zW1wiO1wiXSA9IG9wdHMuZGVmaW5pdGlvbnNbXCJ+XCJdLCBvcHRzLmRlZmluaXRpb25zW1wiO1wiXS5kZWZpbml0aW9uU3ltYm9sID0gXCJ+XCIsIFxuICAgICAgICAgICAgICAgICAgICAhMCA9PT0gb3B0cy5udW1lcmljSW5wdXQgJiYgKG9wdHMucG9zaXRpb25DYXJldE9uQ2xpY2sgPSBcInJhZGl4Rm9jdXNcIiA9PT0gb3B0cy5wb3NpdGlvbkNhcmV0T25DbGljayA/IFwibHZwXCIgOiBvcHRzLnBvc2l0aW9uQ2FyZXRPbkNsaWNrLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5kaWdpdHNPcHRpb25hbCA9ICExLCBpc05hTihvcHRzLmRpZ2l0cykgJiYgKG9wdHMuZGlnaXRzID0gMiksIG9wdHMuZGVjaW1hbFByb3RlY3QgPSAhMSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXNrID0gXCJbK11cIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2sgKz0gYXV0b0VzY2FwZShvcHRzLnByZWZpeCwgb3B0cyksICEwID09PSBvcHRzLmludGVnZXJPcHRpb25hbCA/IG1hc2sgKz0gXCJ+ezEsXCIgKyBvcHRzLmludGVnZXJEaWdpdHMgKyBcIn1cIiA6IG1hc2sgKz0gXCJ+e1wiICsgb3B0cy5pbnRlZ2VyRGlnaXRzICsgXCJ9XCIsIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLmRpZ2l0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhEZWYgPSBvcHRzLmRlY2ltYWxQcm90ZWN0ID8gXCI6XCIgOiBvcHRzLnJhZGl4UG9pbnQsIGRxID0gb3B0cy5kaWdpdHMudG9TdHJpbmcoKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0Zpbml0ZShkcVswXSkgJiYgZHFbMV0gJiYgaXNGaW5pdGUoZHFbMV0pID8gbWFzayArPSByYWRpeERlZiArIFwiO3tcIiArIG9wdHMuZGlnaXRzICsgXCJ9XCIgOiAoaXNOYU4ob3B0cy5kaWdpdHMpIHx8IHBhcnNlSW50KG9wdHMuZGlnaXRzKSA+IDApICYmIChvcHRzLmRpZ2l0c09wdGlvbmFsID8gbWFzayArPSBcIltcIiArIHJhZGl4RGVmICsgXCI7ezEsXCIgKyBvcHRzLmRpZ2l0cyArIFwifV1cIiA6IG1hc2sgKz0gcmFkaXhEZWYgKyBcIjt7XCIgKyBvcHRzLmRpZ2l0cyArIFwifVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFzayArPSBhdXRvRXNjYXBlKG9wdHMuc3VmZml4LCBvcHRzKSwgbWFzayArPSBcIlstXVwiLCBvcHRzLmdyZWVkeSA9ICExLCBtYXNrO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgZ3JlZWR5OiAhMSxcbiAgICAgICAgICAgICAgICBkaWdpdHM6IFwiKlwiLFxuICAgICAgICAgICAgICAgIGRpZ2l0c09wdGlvbmFsOiAhMCxcbiAgICAgICAgICAgICAgICBlbmZvcmNlRGlnaXRzT25CbHVyOiAhMSxcbiAgICAgICAgICAgICAgICByYWRpeFBvaW50OiBcIi5cIixcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkNhcmV0T25DbGljazogXCJyYWRpeEZvY3VzXCIsXG4gICAgICAgICAgICAgICAgZ3JvdXBTaXplOiAzLFxuICAgICAgICAgICAgICAgIGdyb3VwU2VwYXJhdG9yOiBcIlwiLFxuICAgICAgICAgICAgICAgIGF1dG9Hcm91cDogITEsXG4gICAgICAgICAgICAgICAgYWxsb3dNaW51czogITAsXG4gICAgICAgICAgICAgICAgbmVnYXRpb25TeW1ib2w6IHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbnQ6IFwiLVwiLFxuICAgICAgICAgICAgICAgICAgICBiYWNrOiBcIlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnRlZ2VyRGlnaXRzOiBcIitcIixcbiAgICAgICAgICAgICAgICBpbnRlZ2VyT3B0aW9uYWw6ICEwLFxuICAgICAgICAgICAgICAgIHByZWZpeDogXCJcIixcbiAgICAgICAgICAgICAgICBzdWZmaXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgcmlnaHRBbGlnbjogITAsXG4gICAgICAgICAgICAgICAgZGVjaW1hbFByb3RlY3Q6ICEwLFxuICAgICAgICAgICAgICAgIG1pbjogbnVsbCxcbiAgICAgICAgICAgICAgICBtYXg6IG51bGwsXG4gICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICBpbnNlcnRNb2RlOiAhMCxcbiAgICAgICAgICAgICAgICBhdXRvVW5tYXNrOiAhMSxcbiAgICAgICAgICAgICAgICB1bm1hc2tBc051bWJlcjogITEsXG4gICAgICAgICAgICAgICAgaW5wdXRtb2RlOiBcIm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICBwcmVWYWxpZGF0aW9uOiBmdW5jdGlvbihidWZmZXIsIHBvcywgYywgaXNTZWxlY3Rpb24sIG9wdHMsIG1hc2tzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiLVwiID09PSBjIHx8IGMgPT09IG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQpIHJldHVybiAhMCA9PT0gb3B0cy5hbGxvd01pbnVzICYmIChvcHRzLmlzTmVnYXRpdmUgPSBvcHRzLmlzTmVnYXRpdmUgPT09IHVuZGVmaW5lZCB8fCAhb3B0cy5pc05lZ2F0aXZlLCBcbiAgICAgICAgICAgICAgICAgICAgXCJcIiA9PT0gYnVmZmVyLmpvaW4oXCJcIikgfHwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IHBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvcG9zdDogITBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghMSA9PT0gaXNTZWxlY3Rpb24gJiYgYyA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIG9wdHMuZGlnaXRzICE9PSB1bmRlZmluZWQgJiYgKGlzTmFOKG9wdHMuZGlnaXRzKSB8fCBwYXJzZUludChvcHRzLmRpZ2l0cykgPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGl4UG9zID0gJC5pbkFycmF5KG9wdHMucmFkaXhQb2ludCwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtMSAhPT0gcmFkaXhQb3MgJiYgbWFza3NldC52YWxpZFBvc2l0aW9uc1tyYWRpeFBvc10gIT09IHVuZGVmaW5lZCkgcmV0dXJuICEwID09PSBvcHRzLm51bWVyaWNJbnB1dCA/IHBvcyA9PT0gcmFkaXhQb3MgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IHJhZGl4UG9zICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3N0VmFsaWRhdGlvbjogZnVuY3Rpb24oYnVmZmVyLCBjdXJyZW50UmVzdWx0LCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWZmaXggPSBvcHRzLnN1ZmZpeC5zcGxpdChcIlwiKSwgcHJlZml4ID0gb3B0cy5wcmVmaXguc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UmVzdWx0LnBvcyA9PT0gdW5kZWZpbmVkICYmIGN1cnJlbnRSZXN1bHQuY2FyZXQgIT09IHVuZGVmaW5lZCAmJiAhMCAhPT0gY3VycmVudFJlc3VsdC5kb3Bvc3QpIHJldHVybiBjdXJyZW50UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3MgPSBjdXJyZW50UmVzdWx0LmNhcmV0ICE9PSB1bmRlZmluZWQgPyBjdXJyZW50UmVzdWx0LmNhcmV0IDogY3VycmVudFJlc3VsdC5wb3MsIG1hc2tlZFZhbHVlID0gYnVmZmVyLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMubnVtZXJpY0lucHV0ICYmIChjYXJldFBvcyA9IG1hc2tlZFZhbHVlLmxlbmd0aCAtIGNhcmV0UG9zIC0gMSwgbWFza2VkVmFsdWUgPSBtYXNrZWRWYWx1ZS5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hhckF0UG9zID0gbWFza2VkVmFsdWVbY2FyZXRQb3NdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckF0UG9zID09PSBvcHRzLmdyb3VwU2VwYXJhdG9yICYmIChjaGFyQXRQb3MgPSBtYXNrZWRWYWx1ZVtjYXJldFBvcyArPSAxXSksIFxuICAgICAgICAgICAgICAgICAgICBjYXJldFBvcyA9PT0gbWFza2VkVmFsdWUubGVuZ3RoIC0gb3B0cy5zdWZmaXgubGVuZ3RoIC0gMSAmJiBjaGFyQXRQb3MgPT09IG9wdHMucmFkaXhQb2ludCkgcmV0dXJuIGN1cnJlbnRSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJBdFBvcyAhPT0gdW5kZWZpbmVkICYmIGNoYXJBdFBvcyAhPT0gb3B0cy5yYWRpeFBvaW50ICYmIGNoYXJBdFBvcyAhPT0gb3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCAmJiBjaGFyQXRQb3MgIT09IG9wdHMubmVnYXRpb25TeW1ib2wuYmFjayAmJiAobWFza2VkVmFsdWVbY2FyZXRQb3NdID0gXCI/XCIsIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLnByZWZpeC5sZW5ndGggPiAwICYmIGNhcmV0UG9zID49ICghMSA9PT0gb3B0cy5pc05lZ2F0aXZlID8gMSA6IDApICYmIGNhcmV0UG9zIDwgb3B0cy5wcmVmaXgubGVuZ3RoIC0gMSArICghMSA9PT0gb3B0cy5pc05lZ2F0aXZlID8gMSA6IDApID8gcHJlZml4W2NhcmV0UG9zIC0gKCExID09PSBvcHRzLmlzTmVnYXRpdmUgPyAxIDogMCldID0gXCI/XCIgOiBvcHRzLnN1ZmZpeC5sZW5ndGggPiAwICYmIGNhcmV0UG9zID49IG1hc2tlZFZhbHVlLmxlbmd0aCAtIG9wdHMuc3VmZml4Lmxlbmd0aCAtICghMSA9PT0gb3B0cy5pc05lZ2F0aXZlID8gMSA6IDApICYmIChzdWZmaXhbY2FyZXRQb3MgLSAobWFza2VkVmFsdWUubGVuZ3RoIC0gb3B0cy5zdWZmaXgubGVuZ3RoIC0gKCExID09PSBvcHRzLmlzTmVnYXRpdmUgPyAxIDogMCkpXSA9IFwiP1wiKSksIFxuICAgICAgICAgICAgICAgICAgICBwcmVmaXggPSBwcmVmaXguam9pbihcIlwiKSwgc3VmZml4ID0gc3VmZml4LmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzVmFsdWUgPSBtYXNrZWRWYWx1ZS5qb2luKFwiXCIpLnJlcGxhY2UocHJlZml4LCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NWYWx1ZSA9IChwcm9jZXNzVmFsdWUgPSAocHJvY2Vzc1ZhbHVlID0gKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKHN1ZmZpeCwgXCJcIikpLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5ncm91cFNlcGFyYXRvciksIFwiZ1wiKSwgXCJcIikpLnJlcGxhY2UobmV3IFJlZ0V4cChcIlstXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCkgKyBcIl1cIiwgXCJnXCIpLCBcIlwiKSkucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2spICsgXCIkXCIpLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIGlzTmFOKG9wdHMucGxhY2Vob2xkZXIpICYmIChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLnBsYWNlaG9sZGVyKSwgXCJnXCIpLCBcIlwiKSksIFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzVmFsdWUubGVuZ3RoID4gMSAmJiAxICE9PSBwcm9jZXNzVmFsdWUuaW5kZXhPZihvcHRzLnJhZGl4UG9pbnQpICYmIChcIjBcIiA9PT0gY2hhckF0UG9zICYmIChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZSgvXlxcPy9nLCBcIlwiKSksIFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZSgvXjAvZywgXCJcIikpLCBwcm9jZXNzVmFsdWUuY2hhckF0KDApID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgXCJcIiAhPT0gb3B0cy5yYWRpeFBvaW50ICYmICEwICE9PSBvcHRzLm51bWVyaWNJbnB1dCAmJiAocHJvY2Vzc1ZhbHVlID0gXCIwXCIgKyBwcm9jZXNzVmFsdWUpLCBcbiAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gcHJvY2Vzc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnNwbGl0KFwiXCIpLCAoIW9wdHMuZGlnaXRzT3B0aW9uYWwgfHwgb3B0cy5lbmZvcmNlRGlnaXRzT25CbHVyICYmIFwiYmx1clwiID09PSBjdXJyZW50UmVzdWx0LmV2ZW50KSAmJiBpc0Zpbml0ZShvcHRzLmRpZ2l0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhQb3NpdGlvbiA9ICQuaW5BcnJheShvcHRzLnJhZGl4UG9pbnQsIHByb2Nlc3NWYWx1ZSksIHJwYiA9ICQuaW5BcnJheShvcHRzLnJhZGl4UG9pbnQsIG1hc2tlZFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtMSA9PT0gcmFkaXhQb3NpdGlvbiAmJiAocHJvY2Vzc1ZhbHVlLnB1c2gob3B0cy5yYWRpeFBvaW50KSwgcmFkaXhQb3NpdGlvbiA9IHByb2Nlc3NWYWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBvcHRzLmRpZ2l0czsgaSsrKSBvcHRzLmRpZ2l0c09wdGlvbmFsICYmICghb3B0cy5lbmZvcmNlRGlnaXRzT25CbHVyIHx8IFwiYmx1clwiICE9PSBjdXJyZW50UmVzdWx0LmV2ZW50KSB8fCBwcm9jZXNzVmFsdWVbcmFkaXhQb3NpdGlvbiArIGldICE9PSB1bmRlZmluZWQgJiYgcHJvY2Vzc1ZhbHVlW3JhZGl4UG9zaXRpb24gKyBpXSAhPT0gb3B0cy5wbGFjZWhvbGRlci5jaGFyQXQoMCkgPyAtMSAhPT0gcnBiICYmIG1hc2tlZFZhbHVlW3JwYiArIGldICE9PSB1bmRlZmluZWQgJiYgKHByb2Nlc3NWYWx1ZVtyYWRpeFBvc2l0aW9uICsgaV0gPSBwcm9jZXNzVmFsdWVbcmFkaXhQb3NpdGlvbiArIGldIHx8IG1hc2tlZFZhbHVlW3JwYiArIGldKSA6IHByb2Nlc3NWYWx1ZVtyYWRpeFBvc2l0aW9uICsgaV0gPSBjdXJyZW50UmVzdWx0LnBsYWNlaG9sZGVyIHx8IG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwICE9PSBvcHRzLmF1dG9Hcm91cCB8fCBcIlwiID09PSBvcHRzLmdyb3VwU2VwYXJhdG9yIHx8IGNoYXJBdFBvcyA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIGN1cnJlbnRSZXN1bHQucG9zID09PSB1bmRlZmluZWQgJiYgIWN1cnJlbnRSZXN1bHQuZG9wb3N0KSBwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUuam9pbihcIlwiKTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkZFJhZGl4ID0gcHJvY2Vzc1ZhbHVlW3Byb2Nlc3NWYWx1ZS5sZW5ndGggLSAxXSA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIGN1cnJlbnRSZXN1bHQuYyA9PT0gb3B0cy5yYWRpeFBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NWYWx1ZSA9IElucHV0bWFzayhmdW5jdGlvbihidWZmZXIsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc3RNYXNrID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3RNYXNrICs9IFwiKFwiICsgb3B0cy5ncm91cFNlcGFyYXRvciArIFwiKntcIiArIG9wdHMuZ3JvdXBTaXplICsgXCJ9KXsqfVwiLCBcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRpeFNwbGl0ID0gYnVmZmVyLmpvaW4oXCJcIikuc3BsaXQob3B0cy5yYWRpeFBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl4U3BsaXRbMV0gJiYgKHBvc3RNYXNrICs9IG9wdHMucmFkaXhQb2ludCArIFwiKntcIiArIHJhZGl4U3BsaXRbMV0ubWF0Y2goL15cXGQqXFw/P1xcZCovKVswXS5sZW5ndGggKyBcIn1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvc3RNYXNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0ocHJvY2Vzc1ZhbHVlLCBvcHRzKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1lcmljSW5wdXQ6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqaXRNYXNraW5nOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiKlwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTk/XVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mb3JtYXQocHJvY2Vzc1ZhbHVlLmpvaW4oXCJcIikpLCBhZGRSYWRpeCAmJiAocHJvY2Vzc1ZhbHVlICs9IG9wdHMucmFkaXhQb2ludCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NWYWx1ZS5jaGFyQXQoMCkgPT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IgJiYgcHJvY2Vzc1ZhbHVlLnN1YnN0cigxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5pc05lZ2F0aXZlICYmIFwiYmx1clwiID09PSBjdXJyZW50UmVzdWx0LmV2ZW50ICYmIChvcHRzLmlzTmVnYXRpdmUgPSBcIjBcIiAhPT0gcHJvY2Vzc1ZhbHVlKSwgXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NWYWx1ZSA9IHByZWZpeCArIHByb2Nlc3NWYWx1ZSwgcHJvY2Vzc1ZhbHVlICs9IHN1ZmZpeCwgb3B0cy5pc05lZ2F0aXZlICYmIChwcm9jZXNzVmFsdWUgPSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250ICsgcHJvY2Vzc1ZhbHVlLCBcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlICs9IG9wdHMubmVnYXRpb25TeW1ib2wuYmFjayksIHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5zcGxpdChcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIGNoYXJBdFBvcyAhPT0gdW5kZWZpbmVkKSBpZiAoY2hhckF0UG9zICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgY2hhckF0UG9zICE9PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250ICYmIGNoYXJBdFBvcyAhPT0gb3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrKSAoY2FyZXRQb3MgPSAkLmluQXJyYXkoXCI/XCIsIHByb2Nlc3NWYWx1ZSkpID4gLTEgPyBwcm9jZXNzVmFsdWVbY2FyZXRQb3NdID0gY2hhckF0UG9zIDogY2FyZXRQb3MgPSBjdXJyZW50UmVzdWx0LmNhcmV0IHx8IDA7IGVsc2UgaWYgKGNoYXJBdFBvcyA9PT0gb3B0cy5yYWRpeFBvaW50IHx8IGNoYXJBdFBvcyA9PT0gb3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCB8fCBjaGFyQXRQb3MgPT09IG9wdHMubmVnYXRpb25TeW1ib2wuYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0NhcmV0UG9zID0gJC5pbkFycmF5KGNoYXJBdFBvcywgcHJvY2Vzc1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xICE9PSBuZXdDYXJldFBvcyAmJiAoY2FyZXRQb3MgPSBuZXdDYXJldFBvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3B0cy5udW1lcmljSW5wdXQgJiYgKGNhcmV0UG9zID0gcHJvY2Vzc1ZhbHVlLmxlbmd0aCAtIGNhcmV0UG9zIC0gMSwgcHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJldmVyc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByc2x0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IGNoYXJBdFBvcyA9PT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRSZXN1bHQucG9zICE9PSB1bmRlZmluZWQgPyBjYXJldFBvcyArIChvcHRzLm51bWVyaWNJbnB1dCA/IC0xIDogMSkgOiBjYXJldFBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogcHJvY2Vzc1ZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaEZyb21CdWZmZXI6IGN1cnJlbnRSZXN1bHQuZG9wb3N0IHx8IGJ1ZmZlci5qb2luKFwiXCIpICE9PSBwcm9jZXNzVmFsdWUuam9pbihcIlwiKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnNsdC5yZWZyZXNoRnJvbUJ1ZmZlciA/IHJzbHQgOiBjdXJyZW50UmVzdWx0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25CZWZvcmVXcml0ZTogZnVuY3Rpb24oZSwgYnVmZmVyLCBjYXJldFBvcywgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSkgc3dpdGNoIChlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwia2V5ZG93blwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMucG9zdFZhbGlkYXRpb24oYnVmZmVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IGNhcmV0UG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvcG9zdDogITBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImJsdXJcIjpcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2hlY2t2YWxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1bm1hc2tlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5wYXJzZU1pbk1heE9wdGlvbnMgPT09IHVuZGVmaW5lZCAmJiAobnVsbCAhPT0gb3B0cy5taW4gJiYgKG9wdHMubWluID0gb3B0cy5taW4udG9TdHJpbmcoKS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMuZ3JvdXBTZXBhcmF0b3IpLCBcImdcIiksIFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIixcIiA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIChvcHRzLm1pbiA9IG9wdHMubWluLnJlcGxhY2Uob3B0cy5yYWRpeFBvaW50LCBcIi5cIikpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLm1pbiA9IGlzRmluaXRlKG9wdHMubWluKSA/IHBhcnNlRmxvYXQob3B0cy5taW4pIDogTmFOLCBpc05hTihvcHRzLm1pbikgJiYgKG9wdHMubWluID0gTnVtYmVyLk1JTl9WQUxVRSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsICE9PSBvcHRzLm1heCAmJiAob3B0cy5tYXggPSBvcHRzLm1heC50b1N0cmluZygpLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5ncm91cFNlcGFyYXRvciksIFwiZ1wiKSwgXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLFwiID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgKG9wdHMubWF4ID0gb3B0cy5tYXgucmVwbGFjZShvcHRzLnJhZGl4UG9pbnQsIFwiLlwiKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMubWF4ID0gaXNGaW5pdGUob3B0cy5tYXgpID8gcGFyc2VGbG9hdChvcHRzLm1heCkgOiBOYU4sIGlzTmFOKG9wdHMubWF4KSAmJiAob3B0cy5tYXggPSBOdW1iZXIuTUFYX1ZBTFVFKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMucGFyc2VNaW5NYXhPcHRpb25zID0gXCJkb25lXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfShvcHRzKSwgbnVsbCAhPT0gb3B0cy5taW4gfHwgbnVsbCAhPT0gb3B0cy5tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5tYXNrZWQgPSBvcHRzLm9uVW5NYXNrKGJ1ZmZlci5qb2luKFwiXCIpLCB1bmRlZmluZWQsICQuZXh0ZW5kKHt9LCBvcHRzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubWFza0FzTnVtYmVyOiAhMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSwgbnVsbCAhPT0gb3B0cy5taW4gJiYgdW5tYXNrZWQgPCBvcHRzLm1pbikgcmV0dXJuIG9wdHMuaXNOZWdhdGl2ZSA9IG9wdHMubWluIDwgMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5wb3N0VmFsaWRhdGlvbihvcHRzLm1pbi50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIG9wdHMucmFkaXhQb2ludCkuc3BsaXQoXCJcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IGNhcmV0UG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3Bvc3Q6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVsbCAhPT0gb3B0cy5tYXggJiYgdW5tYXNrZWQgPiBvcHRzLm1heCkgcmV0dXJuIG9wdHMuaXNOZWdhdGl2ZSA9IG9wdHMubWF4IDwgMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5wb3N0VmFsaWRhdGlvbihvcHRzLm1heC50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIG9wdHMucmFkaXhQb2ludCkuc3BsaXQoXCJcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IGNhcmV0UG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3Bvc3Q6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLnBvc3RWYWxpZGF0aW9uKGJ1ZmZlciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBjYXJldFBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IFwiYmx1clwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvcHRzKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJfY2hlY2t2YWxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IGNhcmV0UG9zXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWdleDoge1xuICAgICAgICAgICAgICAgICAgICBpbnRlZ2VyUGFydDogZnVuY3Rpb24ob3B0cywgZW1wdHlDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5Q2hlY2sgPyBuZXcgUmVnRXhwKFwiW1wiICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQpICsgXCIrXT9cIikgOiBuZXcgUmVnRXhwKFwiW1wiICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQpICsgXCIrXT9cXFxcZCtcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGludGVnZXJOUGFydDogZnVuY3Rpb24ob3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJbXFxcXGRcIiArIElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLmdyb3VwU2VwYXJhdG9yKSArIElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSkgKyBcIl0rXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBcIn5cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cywgaXNTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJrXCIgPT09IGNocnMgfHwgXCJtXCIgPT09IGNocnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydDogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gXCJrXCIgPT09IGNocnMgPyAyIDogNTsgaSA8IGw7IGkrKykgaXNWYWxpZC5pbnNlcnQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvcyArIGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNWYWxpZC5wb3MgPSBwb3MgKyBsLCBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgPT09IChpc1ZhbGlkID0gc3RyaWN0ID8gbmV3IFJlZ0V4cChcIlswLTlcIiArIElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLmdyb3VwU2VwYXJhdG9yKSArIFwiXVwiKS50ZXN0KGNocnMpIDogbmV3IFJlZ0V4cChcIlswLTldXCIpLnRlc3QoY2hycykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCAhPT0gb3B0cy5udW1lcmljSW5wdXQgJiYgbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3NdICE9PSB1bmRlZmluZWQgJiYgXCJ+XCIgPT09IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcG9zXS5tYXRjaC5kZWYgJiYgIWlzU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc1ZhbHVlID0gbWFza3NldC5idWZmZXIuam9pbihcIlwiKSwgcHZSYWRpeFNwbGl0ID0gKHByb2Nlc3NWYWx1ZSA9IChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKFwiWy1cIiArIElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KSArIFwiXVwiLCBcImdcIiksIFwiXCIpKS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMubmVnYXRpb25TeW1ib2wuYmFjaykgKyBcIiRcIiksIFwiXCIpKS5zcGxpdChvcHRzLnJhZGl4UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHZSYWRpeFNwbGl0Lmxlbmd0aCA+IDEgJiYgKHB2UmFkaXhTcGxpdFsxXSA9IHB2UmFkaXhTcGxpdFsxXS5yZXBsYWNlKC8wL2csIG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KDApKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIwXCIgPT09IHB2UmFkaXhTcGxpdFswXSAmJiAocHZSYWRpeFNwbGl0WzBdID0gcHZSYWRpeFNwbGl0WzBdLnJlcGxhY2UoLzAvZywgb3B0cy5wbGFjZWhvbGRlci5jaGFyQXQoMCkpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzVmFsdWUgPSBwdlJhZGl4U3BsaXRbMF0gKyBvcHRzLnJhZGl4UG9pbnQgKyBwdlJhZGl4U3BsaXRbMV0gfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXJUZW1wbGF0ZSA9IG1hc2tzZXQuX2J1ZmZlci5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChwcm9jZXNzVmFsdWUgPT09IG9wdHMucmFkaXhQb2ludCAmJiAocHJvY2Vzc1ZhbHVlID0gYnVmZmVyVGVtcGxhdGUpOyBudWxsID09PSBwcm9jZXNzVmFsdWUubWF0Y2goSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KGJ1ZmZlclRlbXBsYXRlKSArIFwiJFwiKTsgKSBidWZmZXJUZW1wbGF0ZSA9IGJ1ZmZlclRlbXBsYXRlLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IChwcm9jZXNzVmFsdWUgPSAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UoYnVmZmVyVGVtcGxhdGUsIFwiXCIpKS5zcGxpdChcIlwiKSlbcG9zXSA9PT0gdW5kZWZpbmVkID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZTogcG9zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHN0cmljdCB8fCBjaHJzICE9PSBvcHRzLnJhZGl4UG9pbnQgfHwgbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3MgLSAxXSAhPT0gdW5kZWZpbmVkIHx8IChpc1ZhbGlkID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvcyArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcIitcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLmFsbG93TWludXMgJiYgKFwiLVwiID09PSBjaHJzIHx8IGNocnMgPT09IG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCItXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24oY2hycywgbWFza3NldCwgcG9zLCBzdHJpY3QsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5hbGxvd01pbnVzICYmIGNocnMgPT09IG9wdHMubmVnYXRpb25TeW1ib2wuYmFjaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiOlwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKGNocnMsIG1hc2tzZXQsIHBvcywgc3RyaWN0LCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGl4ID0gXCJbXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5yYWRpeFBvaW50KSArIFwiXVwiLCBpc1ZhbGlkID0gbmV3IFJlZ0V4cChyYWRpeCkudGVzdChjaHJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNWYWxpZCAmJiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Bvc10gJiYgbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3NdLm1hdGNoLnBsYWNlaG9sZGVyID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgKGlzVmFsaWQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBwb3MgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogZnVuY3Rpb24ob3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLnJhZGl4UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5NYXNrOiBmdW5jdGlvbihtYXNrZWRWYWx1ZSwgdW5tYXNrZWRWYWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiA9PT0gdW5tYXNrZWRWYWx1ZSAmJiAhMCA9PT0gb3B0cy5udWxsYWJsZSkgcmV0dXJuIHVubWFza2VkVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzVmFsdWUgPSBtYXNrZWRWYWx1ZS5yZXBsYWNlKG9wdHMucHJlZml4LCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NWYWx1ZSA9IChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShvcHRzLnN1ZmZpeCwgXCJcIikpLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5ncm91cFNlcGFyYXRvciksIFwiZ1wiKSwgXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBcIlwiICE9PSBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSAmJiAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSwgXCJnXCIpLCBcIjBcIikpLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy51bm1hc2tBc051bWJlciA/IChcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgLTEgIT09IHByb2Nlc3NWYWx1ZS5pbmRleE9mKG9wdHMucmFkaXhQb2ludCkgJiYgKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKElucHV0bWFzay5lc2NhcGVSZWdleC5jYWxsKHRoaXMsIG9wdHMucmFkaXhQb2ludCksIFwiLlwiKSksIFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzVmFsdWUgPSAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChcIl5cIiArIElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KSksIFwiLVwiKSkucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2spICsgXCIkXCIpLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIE51bWJlcihwcm9jZXNzVmFsdWUpKSA6IHByb2Nlc3NWYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uKGJ1ZmZlciwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFza2VkVmFsdWUgPSBidWZmZXIuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlci5zbGljZSgpLmpvaW4oXCJcIikgIT09IG1hc2tlZFZhbHVlKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzVmFsdWUgPSBtYXNrZWRWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCkpLCBcIi1cIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzVmFsdWUgPSAocHJvY2Vzc1ZhbHVlID0gKHByb2Nlc3NWYWx1ZSA9IChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2spICsgXCIkXCIpLCBcIlwiKSkucmVwbGFjZShvcHRzLnByZWZpeCwgXCJcIikpLnJlcGxhY2Uob3B0cy5zdWZmaXgsIFwiXCIpKS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMuZ3JvdXBTZXBhcmF0b3IpICsgXCIoWzAtOV17M30pXCIsIFwiZ1wiKSwgXCIkMVwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFwiLFwiID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLnJhZGl4UG9pbnQpLCBcIi5cIikpLCBcbiAgICAgICAgICAgICAgICAgICAgaXNGaW5pdGUocHJvY2Vzc1ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlTWFzazogZnVuY3Rpb24oaW5pdGlhbFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmlzTmVnYXRpdmUgPSB1bmRlZmluZWQsIFwibnVtYmVyXCIgPT0gdHlwZW9mIGluaXRpYWxWYWx1ZSAmJiBcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgKGluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIG9wdHMucmFkaXhQb2ludCkpLCBcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnRvU3RyaW5nKCkuY2hhckF0KGluaXRpYWxWYWx1ZS5sZW5ndGggLSAxKSA9PT0gb3B0cy5yYWRpeFBvaW50ID8gaW5pdGlhbFZhbHVlLnRvU3RyaW5nKCkuc3Vic3RyKDAsIGluaXRpYWxWYWx1ZS5sZW5ndGggLSAxKSA6IGluaXRpYWxWYWx1ZS50b1N0cmluZygpLCBcbiAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gb3B0cy5yYWRpeFBvaW50ICYmIGlzRmluaXRlKGluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2cyA9IGluaXRpYWxWYWx1ZS5zcGxpdChcIi5cIiksIGdyb3VwU2l6ZSA9IFwiXCIgIT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IgPyBwYXJzZUludChvcHRzLmdyb3VwU2l6ZSkgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgMiA9PT0gdnMubGVuZ3RoICYmICh2c1swXS5sZW5ndGggPiBncm91cFNpemUgfHwgdnNbMV0ubGVuZ3RoID4gZ3JvdXBTaXplIHx8IHZzWzBdLmxlbmd0aCA8PSBncm91cFNpemUgJiYgdnNbMV0ubGVuZ3RoIDwgZ3JvdXBTaXplKSAmJiAoaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnJlcGxhY2UoXCIuXCIsIG9wdHMucmFkaXhQb2ludCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBrb21tYU1hdGNoZXMgPSBpbml0aWFsVmFsdWUubWF0Y2goLywvZyksIGRvdE1hdGNoZXMgPSBpbml0aWFsVmFsdWUubWF0Y2goL1xcLi9nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWxWYWx1ZSA9IGRvdE1hdGNoZXMgJiYga29tbWFNYXRjaGVzID8gZG90TWF0Y2hlcy5sZW5ndGggPiBrb21tYU1hdGNoZXMubGVuZ3RoID8gKGluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZS5yZXBsYWNlKC9cXC4vZywgXCJcIikpLnJlcGxhY2UoXCIsXCIsIG9wdHMucmFkaXhQb2ludCkgOiBrb21tYU1hdGNoZXMubGVuZ3RoID4gZG90TWF0Y2hlcy5sZW5ndGggPyAoaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnJlcGxhY2UoLywvZywgXCJcIikpLnJlcGxhY2UoXCIuXCIsIG9wdHMucmFkaXhQb2ludCkgOiBpbml0aWFsVmFsdWUuaW5kZXhPZihcIi5cIikgPCBpbml0aWFsVmFsdWUuaW5kZXhPZihcIixcIikgPyBpbml0aWFsVmFsdWUucmVwbGFjZSgvXFwuL2csIFwiXCIpIDogaW5pdGlhbFZhbHVlLnJlcGxhY2UoLywvZywgXCJcIikgOiBpbml0aWFsVmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLmdyb3VwU2VwYXJhdG9yKSwgXCJnXCIpLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIDAgPT09IG9wdHMuZGlnaXRzICYmICgtMSAhPT0gaW5pdGlhbFZhbHVlLmluZGV4T2YoXCIuXCIpID8gaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnN1YnN0cmluZygwLCBpbml0aWFsVmFsdWUuaW5kZXhPZihcIi5cIikpIDogLTEgIT09IGluaXRpYWxWYWx1ZS5pbmRleE9mKFwiLFwiKSAmJiAoaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnN1YnN0cmluZygwLCBpbml0aWFsVmFsdWUuaW5kZXhPZihcIixcIikpKSksIFxuICAgICAgICAgICAgICAgICAgICBcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgaXNGaW5pdGUob3B0cy5kaWdpdHMpICYmIC0xICE9PSBpbml0aWFsVmFsdWUuaW5kZXhPZihvcHRzLnJhZGl4UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVjUGFydCA9IGluaXRpYWxWYWx1ZS5zcGxpdChvcHRzLnJhZGl4UG9pbnQpWzFdLm1hdGNoKG5ldyBSZWdFeHAoXCJcXFxcZCpcIikpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KG9wdHMuZGlnaXRzKSA8IGRlY1BhcnQudG9TdHJpbmcoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlnaXRzRmFjdG9yID0gTWF0aC5wb3coMTAsIHBhcnNlSW50KG9wdHMuZGlnaXRzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnJlcGxhY2UoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMucmFkaXhQb2ludCksIFwiLlwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gKGluaXRpYWxWYWx1ZSA9IE1hdGgucm91bmQocGFyc2VGbG9hdChpbml0aWFsVmFsdWUpICogZGlnaXRzRmFjdG9yKSAvIGRpZ2l0c0ZhY3RvcikudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBvcHRzLnJhZGl4UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbml0aWFsVmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbktleURvd246IGZ1bmN0aW9uKGUsIGJ1ZmZlciwgY2FyZXRQb3MsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmN0cmxLZXkpIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnB1dG1hc2sua2V5Q29kZS5VUDpcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC52YWwocGFyc2VGbG9hdCh0aGlzLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCkpICsgcGFyc2VJbnQob3B0cy5zdGVwKSksICRpbnB1dC50cmlnZ2VyKFwic2V0dmFsdWVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSW5wdXRtYXNrLmtleUNvZGUuRE9XTjpcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC52YWwocGFyc2VGbG9hdCh0aGlzLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCkpIC0gcGFyc2VJbnQob3B0cy5zdGVwKSksICRpbnB1dC50cmlnZ2VyKFwic2V0dmFsdWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICAgICAgICBwcmVmaXg6IFwiJCBcIixcbiAgICAgICAgICAgICAgICBncm91cFNlcGFyYXRvcjogXCIsXCIsXG4gICAgICAgICAgICAgICAgYWxpYXM6IFwibnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIjBcIixcbiAgICAgICAgICAgICAgICBhdXRvR3JvdXA6ICEwLFxuICAgICAgICAgICAgICAgIGRpZ2l0czogMixcbiAgICAgICAgICAgICAgICBkaWdpdHNPcHRpb25hbDogITEsXG4gICAgICAgICAgICAgICAgY2xlYXJNYXNrT25Mb3N0Rm9jdXM6ICExXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVjaW1hbDoge1xuICAgICAgICAgICAgICAgIGFsaWFzOiBcIm51bWVyaWNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGludGVnZXI6IHtcbiAgICAgICAgICAgICAgICBhbGlhczogXCJudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgZGlnaXRzOiAwLFxuICAgICAgICAgICAgICAgIHJhZGl4UG9pbnQ6IFwiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwZXJjZW50YWdlOiB7XG4gICAgICAgICAgICAgICAgYWxpYXM6IFwibnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIGRpZ2l0czogMixcbiAgICAgICAgICAgICAgICBkaWdpdHNPcHRpb25hbDogITAsXG4gICAgICAgICAgICAgICAgcmFkaXhQb2ludDogXCIuXCIsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiMFwiLFxuICAgICAgICAgICAgICAgIGF1dG9Hcm91cDogITEsXG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogXCIgJVwiLFxuICAgICAgICAgICAgICAgIGFsbG93TWludXM6ICExXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCBJbnB1dG1hc2s7XG4gICAgfSwgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXyA9IFsgX193ZWJwYWNrX3JlcXVpcmVfXygwKSwgX193ZWJwYWNrX3JlcXVpcmVfXygxKSBdLCBcbiAgICB2b2lkIDAgPT09IChfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXyA9IGZhY3RvcnkpID8gX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLmFwcGx5KGV4cG9ydHMsIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18pIDogX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fKSB8fCAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyk7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXywgZmFjdG9yeTtcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gICAgZmFjdG9yeSA9IGZ1bmN0aW9uKCQsIElucHV0bWFzaykge1xuICAgICAgICBmdW5jdGlvbiBtYXNrU29ydChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgbWFza2EgPSAoYS5tYXNrIHx8IGEpLnJlcGxhY2UoLyMvZywgXCIwXCIpLnJlcGxhY2UoL1xcKS8sIFwiMFwiKS5yZXBsYWNlKC9bKygpIy1dL2csIFwiXCIpLCBtYXNrYiA9IChiLm1hc2sgfHwgYikucmVwbGFjZSgvIy9nLCBcIjBcIikucmVwbGFjZSgvXFwpLywgXCIwXCIpLnJlcGxhY2UoL1srKCkjLV0vZywgXCJcIik7XG4gICAgICAgICAgICByZXR1cm4gbWFza2EubG9jYWxlQ29tcGFyZShtYXNrYik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFuYWx5c2VNYXNrQmFzZSA9IElucHV0bWFzay5wcm90b3R5cGUuYW5hbHlzZU1hc2s7XG4gICAgICAgIHJldHVybiBJbnB1dG1hc2sucHJvdG90eXBlLmFuYWx5c2VNYXNrID0gZnVuY3Rpb24obWFzaywgcmVnZXhNYXNrLCBvcHRzKSB7XG4gICAgICAgICAgICB2YXIgbWFza0dyb3VwcyA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIG9wdHMucGhvbmVDb2RlcyAmJiAob3B0cy5waG9uZUNvZGVzICYmIG9wdHMucGhvbmVDb2Rlcy5sZW5ndGggPiAxZTMgJiYgKGZ1bmN0aW9uIHJlZHVjZVZhcmlhdGlvbnMobWFza3MsIHByZXZpb3VzVmFyaWF0aW9uLCBwcmV2aW91c21hc2tHcm91cCkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzVmFyaWF0aW9uID0gcHJldmlvdXNWYXJpYXRpb24gfHwgXCJcIiwgcHJldmlvdXNtYXNrR3JvdXAgPSBwcmV2aW91c21hc2tHcm91cCB8fCBtYXNrR3JvdXBzLCBcbiAgICAgICAgICAgICAgICBcIlwiICE9PSBwcmV2aW91c1ZhcmlhdGlvbiAmJiAocHJldmlvdXNtYXNrR3JvdXBbcHJldmlvdXNWYXJpYXRpb25dID0ge30pO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHZhcmlhdGlvbiA9IFwiXCIsIG1hc2tHcm91cCA9IHByZXZpb3VzbWFza0dyb3VwW3ByZXZpb3VzVmFyaWF0aW9uXSB8fCBwcmV2aW91c21hc2tHcm91cCwgaSA9IG1hc2tzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBtYXNrR3JvdXBbdmFyaWF0aW9uID0gKG1hc2sgPSBtYXNrc1tpXS5tYXNrIHx8IG1hc2tzW2ldKS5zdWJzdHIoMCwgMSldID0gbWFza0dyb3VwW3ZhcmlhdGlvbl0gfHwgW10sIFxuICAgICAgICAgICAgICAgIG1hc2tHcm91cFt2YXJpYXRpb25dLnVuc2hpZnQobWFzay5zdWJzdHIoMSkpLCBtYXNrcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmR4IGluIG1hc2tHcm91cCkgbWFza0dyb3VwW25keF0ubGVuZ3RoID4gNTAwICYmIHJlZHVjZVZhcmlhdGlvbnMobWFza0dyb3VwW25keF0uc2xpY2UoKSwgbmR4LCBtYXNrR3JvdXApO1xuICAgICAgICAgICAgfSgobWFzayA9IG1hc2suc3Vic3RyKDEsIG1hc2subGVuZ3RoIC0gMikpLnNwbGl0KG9wdHMuZ3JvdXBtYXJrZXJbMV0gKyBvcHRzLmFsdGVybmF0b3JtYXJrZXIgKyBvcHRzLmdyb3VwbWFya2VyWzBdKSksIFxuICAgICAgICAgICAgbWFzayA9IGZ1bmN0aW9uIHJlYnVpbGQobWFza0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hc2sgPSBcIlwiLCBzdWJtYXNrcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5keCBpbiBtYXNrR3JvdXApICQuaXNBcnJheShtYXNrR3JvdXBbbmR4XSkgPyAxID09PSBtYXNrR3JvdXBbbmR4XS5sZW5ndGggPyBzdWJtYXNrcy5wdXNoKG5keCArIG1hc2tHcm91cFtuZHhdKSA6IHN1Ym1hc2tzLnB1c2gobmR4ICsgb3B0cy5ncm91cG1hcmtlclswXSArIG1hc2tHcm91cFtuZHhdLmpvaW4ob3B0cy5ncm91cG1hcmtlclsxXSArIG9wdHMuYWx0ZXJuYXRvcm1hcmtlciArIG9wdHMuZ3JvdXBtYXJrZXJbMF0pICsgb3B0cy5ncm91cG1hcmtlclsxXSkgOiBzdWJtYXNrcy5wdXNoKG5keCArIHJlYnVpbGQobWFza0dyb3VwW25keF0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSA9PT0gc3VibWFza3MubGVuZ3RoID8gbWFzayArPSBzdWJtYXNrc1swXSA6IG1hc2sgKz0gb3B0cy5ncm91cG1hcmtlclswXSArIHN1Ym1hc2tzLmpvaW4ob3B0cy5ncm91cG1hcmtlclsxXSArIG9wdHMuYWx0ZXJuYXRvcm1hcmtlciArIG9wdHMuZ3JvdXBtYXJrZXJbMF0pICsgb3B0cy5ncm91cG1hcmtlclsxXSwgXG4gICAgICAgICAgICAgICAgbWFzaztcbiAgICAgICAgICAgIH0obWFza0dyb3VwcykpLCBtYXNrID0gbWFzay5yZXBsYWNlKC85L2csIFwiXFxcXDlcIikpLCBhbmFseXNlTWFza0Jhc2UuY2FsbCh0aGlzLCBtYXNrLCByZWdleE1hc2ssIG9wdHMpO1xuICAgICAgICB9LCBJbnB1dG1hc2suZXh0ZW5kQWxpYXNlcyh7XG4gICAgICAgICAgICBhYnN0cmFjdHBob25lOiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBtYXJrZXI6IFsgXCI8XCIsIFwiPlwiIF0sXG4gICAgICAgICAgICAgICAgY291bnRyeWNvZGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgcGhvbmVDb2RlczogW10sXG4gICAgICAgICAgICAgICAga2VlcFN0YXRpYzogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgbWFzazogZnVuY3Rpb24ob3B0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5kZWZpbml0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiI1wiOiBJbnB1dG1hc2sucHJvdG90eXBlLmRlZmluaXRpb25zWzldXG4gICAgICAgICAgICAgICAgICAgIH0sIG9wdHMucGhvbmVDb2Rlcy5zb3J0KG1hc2tTb3J0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlTWFzazogZnVuY3Rpb24odmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFZhbHVlID0gdmFsdWUucmVwbGFjZSgvXjB7MSwyfS8sIFwiXCIpLnJlcGxhY2UoL1tcXHNdL2csIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHByb2Nlc3NlZFZhbHVlLmluZGV4T2Yob3B0cy5jb3VudHJ5Y29kZSkgPiAxIHx8IC0xID09PSBwcm9jZXNzZWRWYWx1ZS5pbmRleE9mKG9wdHMuY291bnRyeWNvZGUpKSAmJiAocHJvY2Vzc2VkVmFsdWUgPSBcIitcIiArIG9wdHMuY291bnRyeWNvZGUgKyBwcm9jZXNzZWRWYWx1ZSksIFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5NYXNrOiBmdW5jdGlvbihtYXNrZWRWYWx1ZSwgdW5tYXNrZWRWYWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFza2VkVmFsdWUucmVwbGFjZSgvWygpIy1dL2csIFwiXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXRtb2RlOiBcInRlbFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCBJbnB1dG1hc2s7XG4gICAgfSwgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXyA9IFsgX193ZWJwYWNrX3JlcXVpcmVfXygwKSwgX193ZWJwYWNrX3JlcXVpcmVfXygxKSBdLCBcbiAgICB2b2lkIDAgPT09IChfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXyA9IGZhY3RvcnkpID8gX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLmFwcGx5KGV4cG9ydHMsIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18pIDogX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fKSB8fCAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyk7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXywgZmFjdG9yeSwgX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9IDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgICBmYWN0b3J5ID0gZnVuY3Rpb24oJCwgSW5wdXRtYXNrKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDAgPT09ICQuZm4uaW5wdXRtYXNrICYmICgkLmZuLmlucHV0bWFzayA9IGZ1bmN0aW9uKGZuLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgbnB0bWFzaywgaW5wdXQgPSB0aGlzWzBdO1xuICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gb3B0aW9ucyAmJiAob3B0aW9ucyA9IHt9KSwgXCJzdHJpbmdcIiA9PSB0eXBlb2YgZm4pIHN3aXRjaCAoZm4pIHtcbiAgICAgICAgICAgICAgY2FzZSBcInVubWFza2VkdmFsdWVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQgJiYgaW5wdXQuaW5wdXRtYXNrID8gaW5wdXQuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSA6ICQoaW5wdXQpLnZhbCgpO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJyZW1vdmVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0bWFzayAmJiB0aGlzLmlucHV0bWFzay5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBjYXNlIFwiZ2V0ZW1wdHltYXNrXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0ICYmIGlucHV0LmlucHV0bWFzayA/IGlucHV0LmlucHV0bWFzay5nZXRlbXB0eW1hc2soKSA6IFwiXCI7XG5cbiAgICAgICAgICAgICAgY2FzZSBcImhhc01hc2tlZFZhbHVlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICEoIWlucHV0IHx8ICFpbnB1dC5pbnB1dG1hc2spICYmIGlucHV0LmlucHV0bWFzay5oYXNNYXNrZWRWYWx1ZSgpO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJpc0NvbXBsZXRlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICFpbnB1dCB8fCAhaW5wdXQuaW5wdXRtYXNrIHx8IGlucHV0LmlucHV0bWFzay5pc0NvbXBsZXRlKCk7XG5cbiAgICAgICAgICAgICAgY2FzZSBcImdldG1ldGFkYXRhXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0ICYmIGlucHV0LmlucHV0bWFzayA/IGlucHV0LmlucHV0bWFzay5nZXRtZXRhZGF0YSgpIDogdm9pZCAwO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJzZXR2YWx1ZVwiOlxuICAgICAgICAgICAgICAgIElucHV0bWFzay5zZXRWYWx1ZShpbnB1dCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSBcIm9wdGlvblwiOlxuICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiICE9IHR5cGVvZiBvcHRpb25zKSByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSB0aGlzLmlucHV0bWFzaykgcmV0dXJuIHRoaXMuaW5wdXRtYXNrLm9wdGlvbihvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQgJiYgdm9pZCAwICE9PSBpbnB1dC5pbnB1dG1hc2spIHJldHVybiBpbnB1dC5pbnB1dG1hc2sub3B0aW9uKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuYWxpYXMgPSBmbiwgbnB0bWFzayA9IG5ldyBJbnB1dG1hc2sob3B0aW9ucyksIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbnB0bWFzay5tYXNrKHRoaXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoXCJvYmplY3RcIiA9PSAodm9pZCAwID09PSBmbiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGZuKSkpIHJldHVybiBucHRtYXNrID0gbmV3IElucHV0bWFzayhmbiksIFxuICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gZm4ubWFzayAmJiB2b2lkIDAgPT09IGZuLmFsaWFzID8gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSB0aGlzLmlucHV0bWFzaykgcmV0dXJuIHRoaXMuaW5wdXRtYXNrLm9wdGlvbihmbik7XG4gICAgICAgICAgICAgICAgICAgIG5wdG1hc2subWFzayh0aGlzKTtcbiAgICAgICAgICAgICAgICB9KSA6IHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbnB0bWFzay5tYXNrKHRoaXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IGZuKSByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAobnB0bWFzayA9IG5ldyBJbnB1dG1hc2sob3B0aW9ucykpLm1hc2sodGhpcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCAkLmZuLmlucHV0bWFzaztcbiAgICB9LCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fID0gWyBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpIF0sIFxuICAgIHZvaWQgMCA9PT0gKF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiAoX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fID0gZmFjdG9yeSkgPyBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18uYXBwbHkoZXhwb3J0cywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXykgOiBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18pIHx8IChtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fKTtcbn0gXSk7IiwiLyohXHJcbiAqIGpRdWVyeSBWYWxpZGF0aW9uIFBsdWdpbiB2MS4xNS4wXHJcbiAqXHJcbiAqIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9cclxuICpcclxuICogQ29weXJpZ2h0IChjKSAyMDE2IErDtnJuIFphZWZmZXJlclxyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbihmdW5jdGlvbiggZmFjdG9yeSApIHtcclxuXHRpZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xyXG5cdFx0ZGVmaW5lKCBbXCJqcXVlcnlcIl0sIGZhY3RvcnkgKTtcclxuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSggcmVxdWlyZSggXCJqcXVlcnlcIiApICk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGZhY3RvcnkoIGpRdWVyeSApO1xyXG5cdH1cclxufShmdW5jdGlvbiggJCApIHtcclxuXHJcbiQuZXh0ZW5kKCAkLmZuLCB7XG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3ZhbGlkYXRlL1xuXHR2YWxpZGF0ZTogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cblx0XHQvLyBJZiBub3RoaW5nIGlzIHNlbGVjdGVkLCByZXR1cm4gbm90aGluZzsgY2FuJ3QgY2hhaW4gYW55d2F5XG5cdFx0aWYgKCAhdGhpcy5sZW5ndGggKSB7XG5cdFx0XHRpZiAoIG9wdGlvbnMgJiYgb3B0aW9ucy5kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSApIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKCBcIk5vdGhpbmcgc2VsZWN0ZWQsIGNhbid0IHZhbGlkYXRlLCByZXR1cm5pbmcgbm90aGluZy5cIiApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGlmIGEgdmFsaWRhdG9yIGZvciB0aGlzIGZvcm0gd2FzIGFscmVhZHkgY3JlYXRlZFxuXHRcdHZhciB2YWxpZGF0b3IgPSAkLmRhdGEoIHRoaXNbIDAgXSwgXCJ2YWxpZGF0b3JcIiApO1xuXHRcdGlmICggdmFsaWRhdG9yICkge1xuXHRcdFx0cmV0dXJuIHZhbGlkYXRvcjtcblx0XHR9XG5cblx0XHQvLyBBZGQgbm92YWxpZGF0ZSB0YWcgaWYgSFRNTDUuXG5cdFx0dGhpcy5hdHRyKCBcIm5vdmFsaWRhdGVcIiwgXCJub3ZhbGlkYXRlXCIgKTtcblxuXHRcdHZhbGlkYXRvciA9IG5ldyAkLnZhbGlkYXRvciggb3B0aW9ucywgdGhpc1sgMCBdICk7XG5cdFx0JC5kYXRhKCB0aGlzWyAwIF0sIFwidmFsaWRhdG9yXCIsIHZhbGlkYXRvciApO1xuXG5cdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3Mub25zdWJtaXQgKSB7XG5cblx0XHRcdHRoaXMub24oIFwiY2xpY2sudmFsaWRhdGVcIiwgXCI6c3VibWl0XCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3Muc3VibWl0SGFuZGxlciApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3Iuc3VibWl0QnV0dG9uID0gZXZlbnQudGFyZ2V0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWxsb3cgc3VwcHJlc3NpbmcgdmFsaWRhdGlvbiBieSBhZGRpbmcgYSBjYW5jZWwgY2xhc3MgdG8gdGhlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0aWYgKCAkKCB0aGlzICkuaGFzQ2xhc3MoIFwiY2FuY2VsXCIgKSApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuY2FuY2VsU3VibWl0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFsbG93IHN1cHByZXNzaW5nIHZhbGlkYXRpb24gYnkgYWRkaW5nIHRoZSBodG1sNSBmb3Jtbm92YWxpZGF0ZSBhdHRyaWJ1dGUgdG8gdGhlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0aWYgKCAkKCB0aGlzICkuYXR0ciggXCJmb3Jtbm92YWxpZGF0ZVwiICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuY2FuY2VsU3VibWl0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXG5cdFx0XHQvLyBWYWxpZGF0ZSB0aGUgZm9ybSBvbiBzdWJtaXRcblx0XHRcdHRoaXMub24oIFwic3VibWl0LnZhbGlkYXRlXCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3MuZGVidWcgKSB7XG5cblx0XHRcdFx0XHQvLyBQcmV2ZW50IGZvcm0gc3VibWl0IHRvIGJlIGFibGUgdG8gc2VlIGNvbnNvbGUgb3V0cHV0XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmdW5jdGlvbiBoYW5kbGUoKSB7XG5cdFx0XHRcdFx0dmFyIGhpZGRlbiwgcmVzdWx0O1xuXHRcdFx0XHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLnN1Ym1pdEhhbmRsZXIgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHZhbGlkYXRvci5zdWJtaXRCdXR0b24gKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gSW5zZXJ0IGEgaGlkZGVuIGlucHV0IGFzIGEgcmVwbGFjZW1lbnQgZm9yIHRoZSBtaXNzaW5nIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0XHRcdFx0aGlkZGVuID0gJCggXCI8aW5wdXQgdHlwZT0naGlkZGVuJy8+XCIgKVxuXHRcdFx0XHRcdFx0XHRcdC5hdHRyKCBcIm5hbWVcIiwgdmFsaWRhdG9yLnN1Ym1pdEJ1dHRvbi5uYW1lIClcblx0XHRcdFx0XHRcdFx0XHQudmFsKCAkKCB2YWxpZGF0b3Iuc3VibWl0QnV0dG9uICkudmFsKCkgKVxuXHRcdFx0XHRcdFx0XHRcdC5hcHBlbmRUbyggdmFsaWRhdG9yLmN1cnJlbnRGb3JtICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB2YWxpZGF0b3Iuc2V0dGluZ3Muc3VibWl0SGFuZGxlci5jYWxsKCB2YWxpZGF0b3IsIHZhbGlkYXRvci5jdXJyZW50Rm9ybSwgZXZlbnQgKTtcblx0XHRcdFx0XHRcdGlmICggdmFsaWRhdG9yLnN1Ym1pdEJ1dHRvbiApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBbmQgY2xlYW4gdXAgYWZ0ZXJ3YXJkczsgdGhhbmtzIHRvIG5vLWJsb2NrLXNjb3BlLCBoaWRkZW4gY2FuIGJlIHJlZmVyZW5jZWRcblx0XHRcdFx0XHRcdFx0aGlkZGVuLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCByZXN1bHQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcmV2ZW50IHN1Ym1pdCBmb3IgaW52YWxpZCBmb3JtcyBvciBjdXN0b20gc3VibWl0IGhhbmRsZXJzXG5cdFx0XHRcdGlmICggdmFsaWRhdG9yLmNhbmNlbFN1Ym1pdCApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuY2FuY2VsU3VibWl0ID0gZmFsc2U7XG5cdFx0XHRcdFx0cmV0dXJuIGhhbmRsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggdmFsaWRhdG9yLmZvcm0oKSApIHtcblx0XHRcdFx0XHRpZiAoIHZhbGlkYXRvci5wZW5kaW5nUmVxdWVzdCApIHtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5mb3JtU3VibWl0dGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGhhbmRsZSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbGlkYXRvci5mb2N1c0ludmFsaWQoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsaWRhdG9yO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy92YWxpZC9cblx0dmFsaWQ6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB2YWxpZCwgdmFsaWRhdG9yLCBlcnJvckxpc3Q7XG5cblx0XHRpZiAoICQoIHRoaXNbIDAgXSApLmlzKCBcImZvcm1cIiApICkge1xuXHRcdFx0dmFsaWQgPSB0aGlzLnZhbGlkYXRlKCkuZm9ybSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlcnJvckxpc3QgPSBbXTtcblx0XHRcdHZhbGlkID0gdHJ1ZTtcblx0XHRcdHZhbGlkYXRvciA9ICQoIHRoaXNbIDAgXS5mb3JtICkudmFsaWRhdGUoKTtcblx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhbGlkID0gdmFsaWRhdG9yLmVsZW1lbnQoIHRoaXMgKSAmJiB2YWxpZDtcblx0XHRcdFx0aWYgKCAhdmFsaWQgKSB7XG5cdFx0XHRcdFx0ZXJyb3JMaXN0ID0gZXJyb3JMaXN0LmNvbmNhdCggdmFsaWRhdG9yLmVycm9yTGlzdCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0XHR2YWxpZGF0b3IuZXJyb3JMaXN0ID0gZXJyb3JMaXN0O1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsaWQ7XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3J1bGVzL1xuXHRydWxlczogZnVuY3Rpb24oIGNvbW1hbmQsIGFyZ3VtZW50ICkge1xuXG5cdFx0Ly8gSWYgbm90aGluZyBpcyBzZWxlY3RlZCwgcmV0dXJuIG5vdGhpbmc7IGNhbid0IGNoYWluIGFueXdheVxuXHRcdGlmICggIXRoaXMubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBlbGVtZW50ID0gdGhpc1sgMCBdLFxuXHRcdFx0c2V0dGluZ3MsIHN0YXRpY1J1bGVzLCBleGlzdGluZ1J1bGVzLCBkYXRhLCBwYXJhbSwgZmlsdGVyZWQ7XG5cblx0XHRpZiAoIGNvbW1hbmQgKSB7XG5cdFx0XHRzZXR0aW5ncyA9ICQuZGF0YSggZWxlbWVudC5mb3JtLCBcInZhbGlkYXRvclwiICkuc2V0dGluZ3M7XG5cdFx0XHRzdGF0aWNSdWxlcyA9IHNldHRpbmdzLnJ1bGVzO1xuXHRcdFx0ZXhpc3RpbmdSdWxlcyA9ICQudmFsaWRhdG9yLnN0YXRpY1J1bGVzKCBlbGVtZW50ICk7XG5cdFx0XHRzd2l0Y2ggKCBjb21tYW5kICkge1xuXHRcdFx0Y2FzZSBcImFkZFwiOlxuXHRcdFx0XHQkLmV4dGVuZCggZXhpc3RpbmdSdWxlcywgJC52YWxpZGF0b3Iubm9ybWFsaXplUnVsZSggYXJndW1lbnQgKSApO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBtZXNzYWdlcyBmcm9tIHJ1bGVzLCBidXQgYWxsb3cgdGhlbSB0byBiZSBzZXQgc2VwYXJhdGVseVxuXHRcdFx0XHRkZWxldGUgZXhpc3RpbmdSdWxlcy5tZXNzYWdlcztcblx0XHRcdFx0c3RhdGljUnVsZXNbIGVsZW1lbnQubmFtZSBdID0gZXhpc3RpbmdSdWxlcztcblx0XHRcdFx0aWYgKCBhcmd1bWVudC5tZXNzYWdlcyApIHtcblx0XHRcdFx0XHRzZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF0gPSAkLmV4dGVuZCggc2V0dGluZ3MubWVzc2FnZXNbIGVsZW1lbnQubmFtZSBdLCBhcmd1bWVudC5tZXNzYWdlcyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInJlbW92ZVwiOlxuXHRcdFx0XHRpZiAoICFhcmd1bWVudCApIHtcblx0XHRcdFx0XHRkZWxldGUgc3RhdGljUnVsZXNbIGVsZW1lbnQubmFtZSBdO1xuXHRcdFx0XHRcdHJldHVybiBleGlzdGluZ1J1bGVzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZpbHRlcmVkID0ge307XG5cdFx0XHRcdCQuZWFjaCggYXJndW1lbnQuc3BsaXQoIC9cXHMvICksIGZ1bmN0aW9uKCBpbmRleCwgbWV0aG9kICkge1xuXHRcdFx0XHRcdGZpbHRlcmVkWyBtZXRob2QgXSA9IGV4aXN0aW5nUnVsZXNbIG1ldGhvZCBdO1xuXHRcdFx0XHRcdGRlbGV0ZSBleGlzdGluZ1J1bGVzWyBtZXRob2QgXTtcblx0XHRcdFx0XHRpZiAoIG1ldGhvZCA9PT0gXCJyZXF1aXJlZFwiICkge1xuXHRcdFx0XHRcdFx0JCggZWxlbWVudCApLnJlbW92ZUF0dHIoIFwiYXJpYS1yZXF1aXJlZFwiICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdHJldHVybiBmaWx0ZXJlZDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRkYXRhID0gJC52YWxpZGF0b3Iubm9ybWFsaXplUnVsZXMoXG5cdFx0JC5leHRlbmQoXG5cdFx0XHR7fSxcblx0XHRcdCQudmFsaWRhdG9yLmNsYXNzUnVsZXMoIGVsZW1lbnQgKSxcblx0XHRcdCQudmFsaWRhdG9yLmF0dHJpYnV0ZVJ1bGVzKCBlbGVtZW50ICksXG5cdFx0XHQkLnZhbGlkYXRvci5kYXRhUnVsZXMoIGVsZW1lbnQgKSxcblx0XHRcdCQudmFsaWRhdG9yLnN0YXRpY1J1bGVzKCBlbGVtZW50IClcblx0XHQpLCBlbGVtZW50ICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgcmVxdWlyZWQgaXMgYXQgZnJvbnRcblx0XHRpZiAoIGRhdGEucmVxdWlyZWQgKSB7XG5cdFx0XHRwYXJhbSA9IGRhdGEucmVxdWlyZWQ7XG5cdFx0XHRkZWxldGUgZGF0YS5yZXF1aXJlZDtcblx0XHRcdGRhdGEgPSAkLmV4dGVuZCggeyByZXF1aXJlZDogcGFyYW0gfSwgZGF0YSApO1xuXHRcdFx0JCggZWxlbWVudCApLmF0dHIoIFwiYXJpYS1yZXF1aXJlZFwiLCBcInRydWVcIiApO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSByZW1vdGUgaXMgYXQgYmFja1xuXHRcdGlmICggZGF0YS5yZW1vdGUgKSB7XG5cdFx0XHRwYXJhbSA9IGRhdGEucmVtb3RlO1xuXHRcdFx0ZGVsZXRlIGRhdGEucmVtb3RlO1xuXHRcdFx0ZGF0YSA9ICQuZXh0ZW5kKCBkYXRhLCB7IHJlbW90ZTogcGFyYW0gfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG59ICk7XG5cbi8vIEN1c3RvbSBzZWxlY3RvcnNcbiQuZXh0ZW5kKCAkLmV4cHJbIFwiOlwiIF0sIHtcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvYmxhbmstc2VsZWN0b3IvXG5cdGJsYW5rOiBmdW5jdGlvbiggYSApIHtcblx0XHRyZXR1cm4gISQudHJpbSggXCJcIiArICQoIGEgKS52YWwoKSApO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9maWxsZWQtc2VsZWN0b3IvXG5cdGZpbGxlZDogZnVuY3Rpb24oIGEgKSB7XG5cdFx0dmFyIHZhbCA9ICQoIGEgKS52YWwoKTtcblx0XHRyZXR1cm4gdmFsICE9PSBudWxsICYmICEhJC50cmltKCBcIlwiICsgdmFsICk7XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3VuY2hlY2tlZC1zZWxlY3Rvci9cblx0dW5jaGVja2VkOiBmdW5jdGlvbiggYSApIHtcblx0XHRyZXR1cm4gISQoIGEgKS5wcm9wKCBcImNoZWNrZWRcIiApO1xuXHR9XG59ICk7XG5cbi8vIENvbnN0cnVjdG9yIGZvciB2YWxpZGF0b3JcbiQudmFsaWRhdG9yID0gZnVuY3Rpb24oIG9wdGlvbnMsIGZvcm0gKSB7XG5cdHRoaXMuc2V0dGluZ3MgPSAkLmV4dGVuZCggdHJ1ZSwge30sICQudmFsaWRhdG9yLmRlZmF1bHRzLCBvcHRpb25zICk7XG5cdHRoaXMuY3VycmVudEZvcm0gPSBmb3JtO1xuXHR0aGlzLmluaXQoKTtcbn07XG5cbi8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9qUXVlcnkudmFsaWRhdG9yLmZvcm1hdC9cbiQudmFsaWRhdG9yLmZvcm1hdCA9IGZ1bmN0aW9uKCBzb3VyY2UsIHBhcmFtcyApIHtcblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID09PSAxICkge1xuXHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBhcmdzID0gJC5tYWtlQXJyYXkoIGFyZ3VtZW50cyApO1xuXHRcdFx0YXJncy51bnNoaWZ0KCBzb3VyY2UgKTtcblx0XHRcdHJldHVybiAkLnZhbGlkYXRvci5mb3JtYXQuYXBwbHkoIHRoaXMsIGFyZ3MgKTtcblx0XHR9O1xuXHR9XG5cdGlmICggcGFyYW1zID09PSB1bmRlZmluZWQgKSB7XG5cdFx0cmV0dXJuIHNvdXJjZTtcblx0fVxuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIHBhcmFtcy5jb25zdHJ1Y3RvciAhPT0gQXJyYXkgICkge1xuXHRcdHBhcmFtcyA9ICQubWFrZUFycmF5KCBhcmd1bWVudHMgKS5zbGljZSggMSApO1xuXHR9XG5cdGlmICggcGFyYW1zLmNvbnN0cnVjdG9yICE9PSBBcnJheSApIHtcblx0XHRwYXJhbXMgPSBbIHBhcmFtcyBdO1xuXHR9XG5cdCQuZWFjaCggcGFyYW1zLCBmdW5jdGlvbiggaSwgbiApIHtcblx0XHRzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSggbmV3IFJlZ0V4cCggXCJcXFxce1wiICsgaSArIFwiXFxcXH1cIiwgXCJnXCIgKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gbjtcblx0XHR9ICk7XG5cdH0gKTtcblx0cmV0dXJuIHNvdXJjZTtcbn07XG5cbiQuZXh0ZW5kKCAkLnZhbGlkYXRvciwge1xuXG5cdGRlZmF1bHRzOiB7XG5cdFx0bWVzc2FnZXM6IHt9LFxuXHRcdGdyb3Vwczoge30sXG5cdFx0cnVsZXM6IHt9LFxuXHRcdGVycm9yQ2xhc3M6IFwiZXJyb3JcIixcblx0XHRwZW5kaW5nQ2xhc3M6IFwicGVuZGluZ1wiLFxuXHRcdHZhbGlkQ2xhc3M6IFwidmFsaWRcIixcblx0XHRlcnJvckVsZW1lbnQ6IFwibGFiZWxcIixcblx0XHRmb2N1c0NsZWFudXA6IGZhbHNlLFxuXHRcdGZvY3VzSW52YWxpZDogdHJ1ZSxcblx0XHRlcnJvckNvbnRhaW5lcjogJCggW10gKSxcblx0XHRlcnJvckxhYmVsQ29udGFpbmVyOiAkKCBbXSApLFxuXHRcdG9uc3VibWl0OiB0cnVlLFxuXHRcdGlnbm9yZTogXCI6aGlkZGVuXCIsXG5cdFx0aWdub3JlVGl0bGU6IGZhbHNlLFxuXHRcdG9uZm9jdXNpbjogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR0aGlzLmxhc3RBY3RpdmUgPSBlbGVtZW50O1xuXG5cdFx0XHQvLyBIaWRlIGVycm9yIGxhYmVsIGFuZCByZW1vdmUgZXJyb3IgY2xhc3Mgb24gZm9jdXMgaWYgZW5hYmxlZFxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmZvY3VzQ2xlYW51cCApIHtcblx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0ICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQuY2FsbCggdGhpcywgZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLCB0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmhpZGVUaGVzZSggdGhpcy5lcnJvcnNGb3IoIGVsZW1lbnQgKSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0b25mb2N1c291dDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRpZiAoICF0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApICYmICggZWxlbWVudC5uYW1lIGluIHRoaXMuc3VibWl0dGVkIHx8ICF0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgKSApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50ICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvbmtleXVwOiBmdW5jdGlvbiggZWxlbWVudCwgZXZlbnQgKSB7XG5cblx0XHRcdC8vIEF2b2lkIHJldmFsaWRhdGUgdGhlIGZpZWxkIHdoZW4gcHJlc3Npbmcgb25lIG9mIHRoZSBmb2xsb3dpbmcga2V5c1xuXHRcdFx0Ly8gU2hpZnQgICAgICAgPT4gMTZcblx0XHRcdC8vIEN0cmwgICAgICAgID0+IDE3XG5cdFx0XHQvLyBBbHQgICAgICAgICA9PiAxOFxuXHRcdFx0Ly8gQ2FwcyBsb2NrICAgPT4gMjBcblx0XHRcdC8vIEVuZCAgICAgICAgID0+IDM1XG5cdFx0XHQvLyBIb21lICAgICAgICA9PiAzNlxuXHRcdFx0Ly8gTGVmdCBhcnJvdyAgPT4gMzdcblx0XHRcdC8vIFVwIGFycm93ICAgID0+IDM4XG5cdFx0XHQvLyBSaWdodCBhcnJvdyA9PiAzOVxuXHRcdFx0Ly8gRG93biBhcnJvdyAgPT4gNDBcblx0XHRcdC8vIEluc2VydCAgICAgID0+IDQ1XG5cdFx0XHQvLyBOdW0gbG9jayAgICA9PiAxNDRcblx0XHRcdC8vIEFsdEdyIGtleSAgID0+IDIyNVxuXHRcdFx0dmFyIGV4Y2x1ZGVkS2V5cyA9IFtcblx0XHRcdFx0MTYsIDE3LCAxOCwgMjAsIDM1LCAzNiwgMzcsXG5cdFx0XHRcdDM4LCAzOSwgNDAsIDQ1LCAxNDQsIDIyNVxuXHRcdFx0XTtcblxuXHRcdFx0aWYgKCBldmVudC53aGljaCA9PT0gOSAmJiB0aGlzLmVsZW1lbnRWYWx1ZSggZWxlbWVudCApID09PSBcIlwiIHx8ICQuaW5BcnJheSggZXZlbnQua2V5Q29kZSwgZXhjbHVkZWRLZXlzICkgIT09IC0xICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2UgaWYgKCBlbGVtZW50Lm5hbWUgaW4gdGhpcy5zdWJtaXR0ZWQgfHwgZWxlbWVudC5uYW1lIGluIHRoaXMuaW52YWxpZCApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50ICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvbmNsaWNrOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblxuXHRcdFx0Ly8gQ2xpY2sgb24gc2VsZWN0cywgcmFkaW9idXR0b25zIGFuZCBjaGVja2JveGVzXG5cdFx0XHRpZiAoIGVsZW1lbnQubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZCApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50ICk7XG5cblx0XHRcdC8vIE9yIG9wdGlvbiBlbGVtZW50cywgY2hlY2sgcGFyZW50IHNlbGVjdCBpbiB0aGF0IGNhc2Vcblx0XHRcdH0gZWxzZSBpZiAoIGVsZW1lbnQucGFyZW50Tm9kZS5uYW1lIGluIHRoaXMuc3VibWl0dGVkICkge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQoIGVsZW1lbnQucGFyZW50Tm9kZSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0aGlnaGxpZ2h0OiBmdW5jdGlvbiggZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcyApIHtcblx0XHRcdGlmICggZWxlbWVudC50eXBlID09PSBcInJhZGlvXCIgKSB7XG5cdFx0XHRcdHRoaXMuZmluZEJ5TmFtZSggZWxlbWVudC5uYW1lICkuYWRkQ2xhc3MoIGVycm9yQ2xhc3MgKS5yZW1vdmVDbGFzcyggdmFsaWRDbGFzcyApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCggZWxlbWVudCApLmFkZENsYXNzKCBlcnJvckNsYXNzICkucmVtb3ZlQ2xhc3MoIHZhbGlkQ2xhc3MgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHVuaGlnaGxpZ2h0OiBmdW5jdGlvbiggZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcyApIHtcblx0XHRcdGlmICggZWxlbWVudC50eXBlID09PSBcInJhZGlvXCIgKSB7XG5cdFx0XHRcdHRoaXMuZmluZEJ5TmFtZSggZWxlbWVudC5uYW1lICkucmVtb3ZlQ2xhc3MoIGVycm9yQ2xhc3MgKS5hZGRDbGFzcyggdmFsaWRDbGFzcyApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCggZWxlbWVudCApLnJlbW92ZUNsYXNzKCBlcnJvckNsYXNzICkuYWRkQ2xhc3MoIHZhbGlkQ2xhc3MgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2pRdWVyeS52YWxpZGF0b3Iuc2V0RGVmYXVsdHMvXG5cdHNldERlZmF1bHRzOiBmdW5jdGlvbiggc2V0dGluZ3MgKSB7XG5cdFx0JC5leHRlbmQoICQudmFsaWRhdG9yLmRlZmF1bHRzLCBzZXR0aW5ncyApO1xuXHR9LFxuXG5cdG1lc3NhZ2VzOiB7XG5cdFx0cmVxdWlyZWQ6IFwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIixcblx0XHRyZW1vdGU6IFwiUGxlYXNlIGZpeCB0aGlzIGZpZWxkLlwiLFxuXHRcdGVtYWlsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCIsXG5cdFx0dXJsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIFVSTC5cIixcblx0XHRkYXRlOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGUuXCIsXG5cdFx0ZGF0ZUlTTzogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlICggSVNPICkuXCIsXG5cdFx0bnVtYmVyOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlci5cIixcblx0XHRkaWdpdHM6IFwiUGxlYXNlIGVudGVyIG9ubHkgZGlnaXRzLlwiLFxuXHRcdGVxdWFsVG86IFwiUGxlYXNlIGVudGVyIHRoZSBzYW1lIHZhbHVlIGFnYWluLlwiLFxuXHRcdG1heGxlbmd0aDogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBubyBtb3JlIHRoYW4gezB9IGNoYXJhY3RlcnMuXCIgKSxcblx0XHRtaW5sZW5ndGg6ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIgKSxcblx0XHRyYW5nZWxlbmd0aDogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGJldHdlZW4gezB9IGFuZCB7MX0gY2hhcmFjdGVycyBsb25nLlwiICksXG5cdFx0cmFuZ2U6ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9LlwiICksXG5cdFx0bWF4OiAkLnZhbGlkYXRvci5mb3JtYXQoIFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHswfS5cIiApLFxuXHRcdG1pbjogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIgKSxcblx0XHRzdGVwOiAkLnZhbGlkYXRvci5mb3JtYXQoIFwiUGxlYXNlIGVudGVyIGEgbXVsdGlwbGUgb2YgezB9LlwiIClcblx0fSxcblxuXHRhdXRvQ3JlYXRlUmFuZ2VzOiBmYWxzZSxcblxuXHRwcm90b3R5cGU6IHtcblxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5sYWJlbENvbnRhaW5lciA9ICQoIHRoaXMuc2V0dGluZ3MuZXJyb3JMYWJlbENvbnRhaW5lciApO1xuXHRcdFx0dGhpcy5lcnJvckNvbnRleHQgPSB0aGlzLmxhYmVsQ29udGFpbmVyLmxlbmd0aCAmJiB0aGlzLmxhYmVsQ29udGFpbmVyIHx8ICQoIHRoaXMuY3VycmVudEZvcm0gKTtcblx0XHRcdHRoaXMuY29udGFpbmVycyA9ICQoIHRoaXMuc2V0dGluZ3MuZXJyb3JDb250YWluZXIgKS5hZGQoIHRoaXMuc2V0dGluZ3MuZXJyb3JMYWJlbENvbnRhaW5lciApO1xuXHRcdFx0dGhpcy5zdWJtaXR0ZWQgPSB7fTtcblx0XHRcdHRoaXMudmFsdWVDYWNoZSA9IHt9O1xuXHRcdFx0dGhpcy5wZW5kaW5nUmVxdWVzdCA9IDA7XG5cdFx0XHR0aGlzLnBlbmRpbmcgPSB7fTtcblx0XHRcdHRoaXMuaW52YWxpZCA9IHt9O1xuXHRcdFx0dGhpcy5yZXNldCgpO1xuXG5cdFx0XHR2YXIgZ3JvdXBzID0gKCB0aGlzLmdyb3VwcyA9IHt9ICksXG5cdFx0XHRcdHJ1bGVzO1xuXHRcdFx0JC5lYWNoKCB0aGlzLnNldHRpbmdzLmdyb3VwcywgZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUuc3BsaXQoIC9cXHMvICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JC5lYWNoKCB2YWx1ZSwgZnVuY3Rpb24oIGluZGV4LCBuYW1lICkge1xuXHRcdFx0XHRcdGdyb3Vwc1sgbmFtZSBdID0ga2V5O1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9ICk7XG5cdFx0XHRydWxlcyA9IHRoaXMuc2V0dGluZ3MucnVsZXM7XG5cdFx0XHQkLmVhY2goIHJ1bGVzLCBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcblx0XHRcdFx0cnVsZXNbIGtleSBdID0gJC52YWxpZGF0b3Iubm9ybWFsaXplUnVsZSggdmFsdWUgKTtcblx0XHRcdH0gKTtcblxuXHRcdFx0ZnVuY3Rpb24gZGVsZWdhdGUoIGV2ZW50ICkge1xuXHRcdFx0XHR2YXIgdmFsaWRhdG9yID0gJC5kYXRhKCB0aGlzLmZvcm0sIFwidmFsaWRhdG9yXCIgKSxcblx0XHRcdFx0XHRldmVudFR5cGUgPSBcIm9uXCIgKyBldmVudC50eXBlLnJlcGxhY2UoIC9edmFsaWRhdGUvLCBcIlwiICksXG5cdFx0XHRcdFx0c2V0dGluZ3MgPSB2YWxpZGF0b3Iuc2V0dGluZ3M7XG5cdFx0XHRcdGlmICggc2V0dGluZ3NbIGV2ZW50VHlwZSBdICYmICEkKCB0aGlzICkuaXMoIHNldHRpbmdzLmlnbm9yZSApICkge1xuXHRcdFx0XHRcdHNldHRpbmdzWyBldmVudFR5cGUgXS5jYWxsKCB2YWxpZGF0b3IsIHRoaXMsIGV2ZW50ICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApXG5cdFx0XHRcdC5vbiggXCJmb2N1c2luLnZhbGlkYXRlIGZvY3Vzb3V0LnZhbGlkYXRlIGtleXVwLnZhbGlkYXRlXCIsXG5cdFx0XHRcdFx0XCI6dGV4dCwgW3R5cGU9J3Bhc3N3b3JkJ10sIFt0eXBlPSdmaWxlJ10sIHNlbGVjdCwgdGV4dGFyZWEsIFt0eXBlPSdudW1iZXInXSwgW3R5cGU9J3NlYXJjaCddLCBcIiArXG5cdFx0XHRcdFx0XCJbdHlwZT0ndGVsJ10sIFt0eXBlPSd1cmwnXSwgW3R5cGU9J2VtYWlsJ10sIFt0eXBlPSdkYXRldGltZSddLCBbdHlwZT0nZGF0ZSddLCBbdHlwZT0nbW9udGgnXSwgXCIgK1xuXHRcdFx0XHRcdFwiW3R5cGU9J3dlZWsnXSwgW3R5cGU9J3RpbWUnXSwgW3R5cGU9J2RhdGV0aW1lLWxvY2FsJ10sIFt0eXBlPSdyYW5nZSddLCBbdHlwZT0nY29sb3InXSwgXCIgK1xuXHRcdFx0XHRcdFwiW3R5cGU9J3JhZGlvJ10sIFt0eXBlPSdjaGVja2JveCddLCBbY29udGVudGVkaXRhYmxlXVwiLCBkZWxlZ2F0ZSApXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lLCBvbGRJRVxuXHRcdFx0XHQvLyBcInNlbGVjdFwiIGlzIHByb3ZpZGVkIGFzIGV2ZW50LnRhcmdldCB3aGVuIGNsaWNraW5nIGEgb3B0aW9uXG5cdFx0XHRcdC5vbiggXCJjbGljay52YWxpZGF0ZVwiLCBcInNlbGVjdCwgb3B0aW9uLCBbdHlwZT0ncmFkaW8nXSwgW3R5cGU9J2NoZWNrYm94J11cIiwgZGVsZWdhdGUgKTtcblxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmludmFsaWRIYW5kbGVyICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkub24oIFwiaW52YWxpZC1mb3JtLnZhbGlkYXRlXCIsIHRoaXMuc2V0dGluZ3MuaW52YWxpZEhhbmRsZXIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGFyaWEtcmVxdWlyZWQgdG8gYW55IFN0YXRpYy9EYXRhL0NsYXNzIHJlcXVpcmVkIGZpZWxkcyBiZWZvcmUgZmlyc3QgdmFsaWRhdGlvblxuXHRcdFx0Ly8gU2NyZWVuIHJlYWRlcnMgcmVxdWlyZSB0aGlzIGF0dHJpYnV0ZSB0byBiZSBwcmVzZW50IGJlZm9yZSB0aGUgaW5pdGlhbCBzdWJtaXNzaW9uIGh0dHA6Ly93d3cudzMub3JnL1RSL1dDQUctVEVDSFMvQVJJQTIuaHRtbFxuXHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApLmZpbmQoIFwiW3JlcXVpcmVkXSwgW2RhdGEtcnVsZS1yZXF1aXJlZF0sIC5yZXF1aXJlZFwiICkuYXR0ciggXCJhcmlhLXJlcXVpcmVkXCIsIFwidHJ1ZVwiICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3IuZm9ybS9cblx0XHRmb3JtOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuY2hlY2tGb3JtKCk7XG5cdFx0XHQkLmV4dGVuZCggdGhpcy5zdWJtaXR0ZWQsIHRoaXMuZXJyb3JNYXAgKTtcblx0XHRcdHRoaXMuaW52YWxpZCA9ICQuZXh0ZW5kKCB7fSwgdGhpcy5lcnJvck1hcCApO1xuXHRcdFx0aWYgKCAhdGhpcy52YWxpZCgpICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkudHJpZ2dlckhhbmRsZXIoIFwiaW52YWxpZC1mb3JtXCIsIFsgdGhpcyBdICk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNob3dFcnJvcnMoKTtcblx0XHRcdHJldHVybiB0aGlzLnZhbGlkKCk7XG5cdFx0fSxcblxuXHRcdGNoZWNrRm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnByZXBhcmVGb3JtKCk7XG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGVsZW1lbnRzID0gKCB0aGlzLmN1cnJlbnRFbGVtZW50cyA9IHRoaXMuZWxlbWVudHMoKSApOyBlbGVtZW50c1sgaSBdOyBpKysgKSB7XG5cdFx0XHRcdHRoaXMuY2hlY2soIGVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLnZhbGlkKCk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3IuZWxlbWVudC9cblx0XHRlbGVtZW50OiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdHZhciBjbGVhbkVsZW1lbnQgPSB0aGlzLmNsZWFuKCBlbGVtZW50ICksXG5cdFx0XHRcdGNoZWNrRWxlbWVudCA9IHRoaXMudmFsaWRhdGlvblRhcmdldEZvciggY2xlYW5FbGVtZW50ICksXG5cdFx0XHRcdHYgPSB0aGlzLFxuXHRcdFx0XHRyZXN1bHQgPSB0cnVlLFxuXHRcdFx0XHRycywgZ3JvdXA7XG5cblx0XHRcdGlmICggY2hlY2tFbGVtZW50ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmludmFsaWRbIGNsZWFuRWxlbWVudC5uYW1lIF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnByZXBhcmVFbGVtZW50KCBjaGVja0VsZW1lbnQgKTtcblx0XHRcdFx0dGhpcy5jdXJyZW50RWxlbWVudHMgPSAkKCBjaGVja0VsZW1lbnQgKTtcblxuXHRcdFx0XHQvLyBJZiB0aGlzIGVsZW1lbnQgaXMgZ3JvdXBlZCwgdGhlbiB2YWxpZGF0ZSBhbGwgZ3JvdXAgZWxlbWVudHMgYWxyZWFkeVxuXHRcdFx0XHQvLyBjb250YWluaW5nIGEgdmFsdWVcblx0XHRcdFx0Z3JvdXAgPSB0aGlzLmdyb3Vwc1sgY2hlY2tFbGVtZW50Lm5hbWUgXTtcblx0XHRcdFx0aWYgKCBncm91cCApIHtcblx0XHRcdFx0XHQkLmVhY2goIHRoaXMuZ3JvdXBzLCBmdW5jdGlvbiggbmFtZSwgdGVzdGdyb3VwICkge1xuXHRcdFx0XHRcdFx0aWYgKCB0ZXN0Z3JvdXAgPT09IGdyb3VwICYmIG5hbWUgIT09IGNoZWNrRWxlbWVudC5uYW1lICkge1xuXHRcdFx0XHRcdFx0XHRjbGVhbkVsZW1lbnQgPSB2LnZhbGlkYXRpb25UYXJnZXRGb3IoIHYuY2xlYW4oIHYuZmluZEJ5TmFtZSggbmFtZSApICkgKTtcblx0XHRcdFx0XHRcdFx0aWYgKCBjbGVhbkVsZW1lbnQgJiYgY2xlYW5FbGVtZW50Lm5hbWUgaW4gdi5pbnZhbGlkICkge1xuXHRcdFx0XHRcdFx0XHRcdHYuY3VycmVudEVsZW1lbnRzLnB1c2goIGNsZWFuRWxlbWVudCApO1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdCAmJiB2LmNoZWNrKCBjbGVhbkVsZW1lbnQgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJzID0gdGhpcy5jaGVjayggY2hlY2tFbGVtZW50ICkgIT09IGZhbHNlO1xuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHQgJiYgcnM7XG5cdFx0XHRcdGlmICggcnMgKSB7XG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkWyBjaGVja0VsZW1lbnQubmFtZSBdID0gZmFsc2U7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkWyBjaGVja0VsZW1lbnQubmFtZSBdID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggIXRoaXMubnVtYmVyT2ZJbnZhbGlkcygpICkge1xuXG5cdFx0XHRcdFx0Ly8gSGlkZSBlcnJvciBjb250YWluZXJzIG9uIGxhc3QgZXJyb3Jcblx0XHRcdFx0XHR0aGlzLnRvSGlkZSA9IHRoaXMudG9IaWRlLmFkZCggdGhpcy5jb250YWluZXJzICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zaG93RXJyb3JzKCk7XG5cblx0XHRcdFx0Ly8gQWRkIGFyaWEtaW52YWxpZCBzdGF0dXMgZm9yIHNjcmVlbiByZWFkZXJzXG5cdFx0XHRcdCQoIGVsZW1lbnQgKS5hdHRyKCBcImFyaWEtaW52YWxpZFwiLCAhcnMgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL1ZhbGlkYXRvci5zaG93RXJyb3JzL1xuXHRcdHNob3dFcnJvcnM6IGZ1bmN0aW9uKCBlcnJvcnMgKSB7XG5cdFx0XHRpZiAoIGVycm9ycyApIHtcblx0XHRcdFx0dmFyIHZhbGlkYXRvciA9IHRoaXM7XG5cblx0XHRcdFx0Ly8gQWRkIGl0ZW1zIHRvIGVycm9yIGxpc3QgYW5kIG1hcFxuXHRcdFx0XHQkLmV4dGVuZCggdGhpcy5lcnJvck1hcCwgZXJyb3JzICk7XG5cdFx0XHRcdHRoaXMuZXJyb3JMaXN0ID0gJC5tYXAoIHRoaXMuZXJyb3JNYXAsIGZ1bmN0aW9uKCBtZXNzYWdlLCBuYW1lICkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBtZXNzYWdlLFxuXHRcdFx0XHRcdFx0ZWxlbWVudDogdmFsaWRhdG9yLmZpbmRCeU5hbWUoIG5hbWUgKVsgMCBdXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSApO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBpdGVtcyBmcm9tIHN1Y2Nlc3MgbGlzdFxuXHRcdFx0XHR0aGlzLnN1Y2Nlc3NMaXN0ID0gJC5ncmVwKCB0aGlzLnN1Y2Nlc3NMaXN0LCBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdFx0XHRyZXR1cm4gISggZWxlbWVudC5uYW1lIGluIGVycm9ycyApO1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3Muc2hvd0Vycm9ycyApIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5zaG93RXJyb3JzLmNhbGwoIHRoaXMsIHRoaXMuZXJyb3JNYXAsIHRoaXMuZXJyb3JMaXN0ICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRTaG93RXJyb3JzKCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3IucmVzZXRGb3JtL1xuXHRcdHJlc2V0Rm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoICQuZm4ucmVzZXRGb3JtICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkucmVzZXRGb3JtKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmludmFsaWQgPSB7fTtcblx0XHRcdHRoaXMuc3VibWl0dGVkID0ge307XG5cdFx0XHR0aGlzLnByZXBhcmVGb3JtKCk7XG5cdFx0XHR0aGlzLmhpZGVFcnJvcnMoKTtcblx0XHRcdHZhciBlbGVtZW50cyA9IHRoaXMuZWxlbWVudHMoKVxuXHRcdFx0XHQucmVtb3ZlRGF0YSggXCJwcmV2aW91c1ZhbHVlXCIgKVxuXHRcdFx0XHQucmVtb3ZlQXR0ciggXCJhcmlhLWludmFsaWRcIiApO1xuXG5cdFx0XHR0aGlzLnJlc2V0RWxlbWVudHMoIGVsZW1lbnRzICk7XG5cdFx0fSxcblxuXHRcdHJlc2V0RWxlbWVudHM6IGZ1bmN0aW9uKCBlbGVtZW50cyApIHtcblx0XHRcdHZhciBpO1xuXG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyBlbGVtZW50c1sgaSBdOyBpKysgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodC5jYWxsKCB0aGlzLCBlbGVtZW50c1sgaSBdLFxuXHRcdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLCBcIlwiICk7XG5cdFx0XHRcdFx0dGhpcy5maW5kQnlOYW1lKCBlbGVtZW50c1sgaSBdLm5hbWUgKS5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnRzXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCB0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MgKVxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG51bWJlck9mSW52YWxpZHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMub2JqZWN0TGVuZ3RoKCB0aGlzLmludmFsaWQgKTtcblx0XHR9LFxuXG5cdFx0b2JqZWN0TGVuZ3RoOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdFx0LyoganNoaW50IHVudXNlZDogZmFsc2UgKi9cblx0XHRcdHZhciBjb3VudCA9IDAsXG5cdFx0XHRcdGk7XG5cdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0aWYgKCBvYmpbIGkgXSApIHtcblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY291bnQ7XG5cdFx0fSxcblxuXHRcdGhpZGVFcnJvcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5oaWRlVGhlc2UoIHRoaXMudG9IaWRlICk7XG5cdFx0fSxcblxuXHRcdGhpZGVUaGVzZTogZnVuY3Rpb24oIGVycm9ycyApIHtcblx0XHRcdGVycm9ycy5ub3QoIHRoaXMuY29udGFpbmVycyApLnRleHQoIFwiXCIgKTtcblx0XHRcdHRoaXMuYWRkV3JhcHBlciggZXJyb3JzICkuaGlkZSgpO1xuXHRcdH0sXG5cblx0XHR2YWxpZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zaXplKCkgPT09IDA7XG5cdFx0fSxcblxuXHRcdHNpemU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZXJyb3JMaXN0Lmxlbmd0aDtcblx0XHR9LFxuXG5cdFx0Zm9jdXNJbnZhbGlkOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5mb2N1c0ludmFsaWQgKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0JCggdGhpcy5maW5kTGFzdEFjdGl2ZSgpIHx8IHRoaXMuZXJyb3JMaXN0Lmxlbmd0aCAmJiB0aGlzLmVycm9yTGlzdFsgMCBdLmVsZW1lbnQgfHwgW10gKVxuXHRcdFx0XHRcdC5maWx0ZXIoIFwiOnZpc2libGVcIiApXG5cdFx0XHRcdFx0LmZvY3VzKClcblxuXHRcdFx0XHRcdC8vIE1hbnVhbGx5IHRyaWdnZXIgZm9jdXNpbiBldmVudDsgd2l0aG91dCBpdCwgZm9jdXNpbiBoYW5kbGVyIGlzbid0IGNhbGxlZCwgZmluZExhc3RBY3RpdmUgd29uJ3QgaGF2ZSBhbnl0aGluZyB0byBmaW5kXG5cdFx0XHRcdFx0LnRyaWdnZXIoIFwiZm9jdXNpblwiICk7XG5cdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdFx0Ly8gSWdub3JlIElFIHRocm93aW5nIGVycm9ycyB3aGVuIGZvY3VzaW5nIGhpZGRlbiBlbGVtZW50c1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGZpbmRMYXN0QWN0aXZlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBsYXN0QWN0aXZlID0gdGhpcy5sYXN0QWN0aXZlO1xuXHRcdFx0cmV0dXJuIGxhc3RBY3RpdmUgJiYgJC5ncmVwKCB0aGlzLmVycm9yTGlzdCwgZnVuY3Rpb24oIG4gKSB7XG5cdFx0XHRcdHJldHVybiBuLmVsZW1lbnQubmFtZSA9PT0gbGFzdEFjdGl2ZS5uYW1lO1xuXHRcdFx0fSApLmxlbmd0aCA9PT0gMSAmJiBsYXN0QWN0aXZlO1xuXHRcdH0sXG5cblx0XHRlbGVtZW50czogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdmFsaWRhdG9yID0gdGhpcyxcblx0XHRcdFx0cnVsZXNDYWNoZSA9IHt9O1xuXG5cdFx0XHQvLyBTZWxlY3QgYWxsIHZhbGlkIGlucHV0cyBpbnNpZGUgdGhlIGZvcm0gKG5vIHN1Ym1pdCBvciByZXNldCBidXR0b25zKVxuXHRcdFx0cmV0dXJuICQoIHRoaXMuY3VycmVudEZvcm0gKVxuXHRcdFx0LmZpbmQoIFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFtjb250ZW50ZWRpdGFibGVdXCIgKVxuXHRcdFx0Lm5vdCggXCI6c3VibWl0LCA6cmVzZXQsIDppbWFnZSwgOmRpc2FibGVkXCIgKVxuXHRcdFx0Lm5vdCggdGhpcy5zZXR0aW5ncy5pZ25vcmUgKVxuXHRcdFx0LmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBuYW1lID0gdGhpcy5uYW1lIHx8ICQoIHRoaXMgKS5hdHRyKCBcIm5hbWVcIiApOyAvLyBGb3IgY29udGVudGVkaXRhYmxlXG5cdFx0XHRcdGlmICggIW5hbWUgJiYgdmFsaWRhdG9yLnNldHRpbmdzLmRlYnVnICYmIHdpbmRvdy5jb25zb2xlICkge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoIFwiJW8gaGFzIG5vIG5hbWUgYXNzaWduZWRcIiwgdGhpcyApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2V0IGZvcm0gZXhwYW5kbyBvbiBjb250ZW50ZWRpdGFibGVcblx0XHRcdFx0aWYgKCB0aGlzLmhhc0F0dHJpYnV0ZSggXCJjb250ZW50ZWRpdGFibGVcIiApICkge1xuXHRcdFx0XHRcdHRoaXMuZm9ybSA9ICQoIHRoaXMgKS5jbG9zZXN0KCBcImZvcm1cIiApWyAwIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTZWxlY3Qgb25seSB0aGUgZmlyc3QgZWxlbWVudCBmb3IgZWFjaCBuYW1lLCBhbmQgb25seSB0aG9zZSB3aXRoIHJ1bGVzIHNwZWNpZmllZFxuXHRcdFx0XHRpZiAoIG5hbWUgaW4gcnVsZXNDYWNoZSB8fCAhdmFsaWRhdG9yLm9iamVjdExlbmd0aCggJCggdGhpcyApLnJ1bGVzKCkgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRydWxlc0NhY2hlWyBuYW1lIF0gPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gKTtcblx0XHR9LFxuXG5cdFx0Y2xlYW46IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiAkKCBzZWxlY3RvciApWyAwIF07XG5cdFx0fSxcblxuXHRcdGVycm9yczogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZXJyb3JDbGFzcyA9IHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcy5zcGxpdCggXCIgXCIgKS5qb2luKCBcIi5cIiApO1xuXHRcdFx0cmV0dXJuICQoIHRoaXMuc2V0dGluZ3MuZXJyb3JFbGVtZW50ICsgXCIuXCIgKyBlcnJvckNsYXNzLCB0aGlzLmVycm9yQ29udGV4dCApO1xuXHRcdH0sXG5cblx0XHRyZXNldEludGVybmFsczogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnN1Y2Nlc3NMaXN0ID0gW107XG5cdFx0XHR0aGlzLmVycm9yTGlzdCA9IFtdO1xuXHRcdFx0dGhpcy5lcnJvck1hcCA9IHt9O1xuXHRcdFx0dGhpcy50b1Nob3cgPSAkKCBbXSApO1xuXHRcdFx0dGhpcy50b0hpZGUgPSAkKCBbXSApO1xuXHRcdH0sXG5cblx0XHRyZXNldDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG5cdFx0XHR0aGlzLmN1cnJlbnRFbGVtZW50cyA9ICQoIFtdICk7XG5cdFx0fSxcblxuXHRcdHByZXBhcmVGb3JtOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMucmVzZXQoKTtcblx0XHRcdHRoaXMudG9IaWRlID0gdGhpcy5lcnJvcnMoKS5hZGQoIHRoaXMuY29udGFpbmVycyApO1xuXHRcdH0sXG5cblx0XHRwcmVwYXJlRWxlbWVudDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0XHR0aGlzLnRvSGlkZSA9IHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICk7XG5cdFx0fSxcblxuXHRcdGVsZW1lbnRWYWx1ZTogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR2YXIgJGVsZW1lbnQgPSAkKCBlbGVtZW50ICksXG5cdFx0XHRcdHR5cGUgPSBlbGVtZW50LnR5cGUsXG5cdFx0XHRcdHZhbCwgaWR4O1xuXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwicmFkaW9cIiB8fCB0eXBlID09PSBcImNoZWNrYm94XCIgKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmZpbmRCeU5hbWUoIGVsZW1lbnQubmFtZSApLmZpbHRlciggXCI6Y2hlY2tlZFwiICkudmFsKCk7XG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBlbGVtZW50LnZhbGlkaXR5ICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbWVudC52YWxpZGl0eS5iYWRJbnB1dCA/IFwiTmFOXCIgOiAkZWxlbWVudC52YWwoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBlbGVtZW50Lmhhc0F0dHJpYnV0ZSggXCJjb250ZW50ZWRpdGFibGVcIiApICkge1xuXHRcdFx0XHR2YWwgPSAkZWxlbWVudC50ZXh0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWwgPSAkZWxlbWVudC52YWwoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB0eXBlID09PSBcImZpbGVcIiApIHtcblxuXHRcdFx0XHQvLyBNb2Rlcm4gYnJvd3NlciAoY2hyb21lICYgc2FmYXJpKVxuXHRcdFx0XHRpZiAoIHZhbC5zdWJzdHIoIDAsIDEyICkgPT09IFwiQzpcXFxcZmFrZXBhdGhcXFxcXCIgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbC5zdWJzdHIoIDEyICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMZWdhY3kgYnJvd3NlcnNcblx0XHRcdFx0Ly8gVW5peC1iYXNlZCBwYXRoXG5cdFx0XHRcdGlkeCA9IHZhbC5sYXN0SW5kZXhPZiggXCIvXCIgKTtcblx0XHRcdFx0aWYgKCBpZHggPj0gMCApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsLnN1YnN0ciggaWR4ICsgMSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gV2luZG93cy1iYXNlZCBwYXRoXG5cdFx0XHRcdGlkeCA9IHZhbC5sYXN0SW5kZXhPZiggXCJcXFxcXCIgKTtcblx0XHRcdFx0aWYgKCBpZHggPj0gMCApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsLnN1YnN0ciggaWR4ICsgMSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSnVzdCB0aGUgZmlsZSBuYW1lXG5cdFx0XHRcdHJldHVybiB2YWw7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggdHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0cmV0dXJuIHZhbC5yZXBsYWNlKCAvXFxyL2csIFwiXCIgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fSxcblxuXHRcdGNoZWNrOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdGVsZW1lbnQgPSB0aGlzLnZhbGlkYXRpb25UYXJnZXRGb3IoIHRoaXMuY2xlYW4oIGVsZW1lbnQgKSApO1xuXG5cdFx0XHR2YXIgcnVsZXMgPSAkKCBlbGVtZW50ICkucnVsZXMoKSxcblx0XHRcdFx0cnVsZXNDb3VudCA9ICQubWFwKCBydWxlcywgZnVuY3Rpb24oIG4sIGkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdH0gKS5sZW5ndGgsXG5cdFx0XHRcdGRlcGVuZGVuY3lNaXNtYXRjaCA9IGZhbHNlLFxuXHRcdFx0XHR2YWwgPSB0aGlzLmVsZW1lbnRWYWx1ZSggZWxlbWVudCApLFxuXHRcdFx0XHRyZXN1bHQsIG1ldGhvZCwgcnVsZTtcblxuXHRcdFx0Ly8gSWYgYSBub3JtYWxpemVyIGlzIGRlZmluZWQgZm9yIHRoaXMgZWxlbWVudCwgdGhlblxuXHRcdFx0Ly8gY2FsbCBpdCB0byByZXRyZWl2ZSB0aGUgY2hhbmdlZCB2YWx1ZSBpbnN0ZWFkXG5cdFx0XHQvLyBvZiB1c2luZyB0aGUgcmVhbCBvbmUuXG5cdFx0XHQvLyBOb3RlIHRoYXQgYHRoaXNgIGluIHRoZSBub3JtYWxpemVyIGlzIGBlbGVtZW50YC5cblx0XHRcdGlmICggdHlwZW9mIHJ1bGVzLm5vcm1hbGl6ZXIgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0XHRcdFx0dmFsID0gcnVsZXMubm9ybWFsaXplci5jYWxsKCBlbGVtZW50LCB2YWwgKTtcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YWwgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggXCJUaGUgbm9ybWFsaXplciBzaG91bGQgcmV0dXJuIGEgc3RyaW5nIHZhbHVlLlwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBEZWxldGUgdGhlIG5vcm1hbGl6ZXIgZnJvbSBydWxlcyB0byBhdm9pZCB0cmVhdGluZ1xuXHRcdFx0XHQvLyBpdCBhcyBhIHByZS1kZWZpbmVkIG1ldGhvZC5cblx0XHRcdFx0ZGVsZXRlIHJ1bGVzLm5vcm1hbGl6ZXI7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIG1ldGhvZCBpbiBydWxlcyApIHtcblx0XHRcdFx0cnVsZSA9IHsgbWV0aG9kOiBtZXRob2QsIHBhcmFtZXRlcnM6IHJ1bGVzWyBtZXRob2QgXSB9O1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdCA9ICQudmFsaWRhdG9yLm1ldGhvZHNbIG1ldGhvZCBdLmNhbGwoIHRoaXMsIHZhbCwgZWxlbWVudCwgcnVsZS5wYXJhbWV0ZXJzICk7XG5cblx0XHRcdFx0XHQvLyBJZiBhIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdCB0aGUgZmllbGQgaXMgb3B0aW9uYWwgYW5kIHRoZXJlZm9yZSB2YWxpZCxcblx0XHRcdFx0XHQvLyBkb24ndCBtYXJrIGl0IGFzIHZhbGlkIHdoZW4gdGhlcmUgYXJlIG5vIG90aGVyIHJ1bGVzXG5cdFx0XHRcdFx0aWYgKCByZXN1bHQgPT09IFwiZGVwZW5kZW5jeS1taXNtYXRjaFwiICYmIHJ1bGVzQ291bnQgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRkZXBlbmRlbmN5TWlzbWF0Y2ggPSB0cnVlO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlcGVuZGVuY3lNaXNtYXRjaCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCByZXN1bHQgPT09IFwicGVuZGluZ1wiICkge1xuXHRcdFx0XHRcdFx0dGhpcy50b0hpZGUgPSB0aGlzLnRvSGlkZS5ub3QoIHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICkgKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoICFyZXN1bHQgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZvcm1hdEFuZEFkZCggZWxlbWVudCwgcnVsZSApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmRlYnVnICYmIHdpbmRvdy5jb25zb2xlICkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coIFwiRXhjZXB0aW9uIG9jY3VycmVkIHdoZW4gY2hlY2tpbmcgZWxlbWVudCBcIiArIGVsZW1lbnQuaWQgKyBcIiwgY2hlY2sgdGhlICdcIiArIHJ1bGUubWV0aG9kICsgXCInIG1ldGhvZC5cIiwgZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIGUgaW5zdGFuY2VvZiBUeXBlRXJyb3IgKSB7XG5cdFx0XHRcdFx0XHRlLm1lc3NhZ2UgKz0gXCIuICBFeGNlcHRpb24gb2NjdXJyZWQgd2hlbiBjaGVja2luZyBlbGVtZW50IFwiICsgZWxlbWVudC5pZCArIFwiLCBjaGVjayB0aGUgJ1wiICsgcnVsZS5tZXRob2QgKyBcIicgbWV0aG9kLlwiO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggZGVwZW5kZW5jeU1pc21hdGNoICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMub2JqZWN0TGVuZ3RoKCBydWxlcyApICkge1xuXHRcdFx0XHR0aGlzLnN1Y2Nlc3NMaXN0LnB1c2goIGVsZW1lbnQgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm4gdGhlIGN1c3RvbSBtZXNzYWdlIGZvciB0aGUgZ2l2ZW4gZWxlbWVudCBhbmQgdmFsaWRhdGlvbiBtZXRob2Rcblx0XHQvLyBzcGVjaWZpZWQgaW4gdGhlIGVsZW1lbnQncyBIVE1MNSBkYXRhIGF0dHJpYnV0ZVxuXHRcdC8vIHJldHVybiB0aGUgZ2VuZXJpYyBtZXNzYWdlIGlmIHByZXNlbnQgYW5kIG5vIG1ldGhvZCBzcGVjaWZpYyBtZXNzYWdlIGlzIHByZXNlbnRcblx0XHRjdXN0b21EYXRhTWVzc2FnZTogZnVuY3Rpb24oIGVsZW1lbnQsIG1ldGhvZCApIHtcblx0XHRcdHJldHVybiAkKCBlbGVtZW50ICkuZGF0YSggXCJtc2dcIiArIG1ldGhvZC5jaGFyQXQoIDAgKS50b1VwcGVyQ2FzZSgpICtcblx0XHRcdFx0bWV0aG9kLnN1YnN0cmluZyggMSApLnRvTG93ZXJDYXNlKCkgKSB8fCAkKCBlbGVtZW50ICkuZGF0YSggXCJtc2dcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm4gdGhlIGN1c3RvbSBtZXNzYWdlIGZvciB0aGUgZ2l2ZW4gZWxlbWVudCBuYW1lIGFuZCB2YWxpZGF0aW9uIG1ldGhvZFxuXHRcdGN1c3RvbU1lc3NhZ2U6IGZ1bmN0aW9uKCBuYW1lLCBtZXRob2QgKSB7XG5cdFx0XHR2YXIgbSA9IHRoaXMuc2V0dGluZ3MubWVzc2FnZXNbIG5hbWUgXTtcblx0XHRcdHJldHVybiBtICYmICggbS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nID8gbSA6IG1bIG1ldGhvZCBdICk7XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybiB0aGUgZmlyc3QgZGVmaW5lZCBhcmd1bWVudCwgYWxsb3dpbmcgZW1wdHkgc3RyaW5nc1xuXHRcdGZpbmREZWZpbmVkOiBmdW5jdGlvbigpIHtcblx0XHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBhcmd1bWVudHNbIGkgXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBhcmd1bWVudHNbIGkgXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9LFxuXG5cdFx0ZGVmYXVsdE1lc3NhZ2U6IGZ1bmN0aW9uKCBlbGVtZW50LCBydWxlICkge1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSB0aGlzLmZpbmREZWZpbmVkKFxuXHRcdFx0XHRcdHRoaXMuY3VzdG9tTWVzc2FnZSggZWxlbWVudC5uYW1lLCBydWxlLm1ldGhvZCApLFxuXHRcdFx0XHRcdHRoaXMuY3VzdG9tRGF0YU1lc3NhZ2UoIGVsZW1lbnQsIHJ1bGUubWV0aG9kICksXG5cblx0XHRcdFx0XHQvLyAndGl0bGUnIGlzIG5ldmVyIHVuZGVmaW5lZCwgc28gaGFuZGxlIGVtcHR5IHN0cmluZyBhcyB1bmRlZmluZWRcblx0XHRcdFx0XHQhdGhpcy5zZXR0aW5ncy5pZ25vcmVUaXRsZSAmJiBlbGVtZW50LnRpdGxlIHx8IHVuZGVmaW5lZCxcblx0XHRcdFx0XHQkLnZhbGlkYXRvci5tZXNzYWdlc1sgcnVsZS5tZXRob2QgXSxcblx0XHRcdFx0XHRcIjxzdHJvbmc+V2FybmluZzogTm8gbWVzc2FnZSBkZWZpbmVkIGZvciBcIiArIGVsZW1lbnQubmFtZSArIFwiPC9zdHJvbmc+XCJcblx0XHRcdFx0KSxcblx0XHRcdFx0dGhlcmVnZXggPSAvXFwkP1xceyhcXGQrKVxcfS9nO1xuXHRcdFx0aWYgKCB0eXBlb2YgbWVzc2FnZSA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5jYWxsKCB0aGlzLCBydWxlLnBhcmFtZXRlcnMsIGVsZW1lbnQgKTtcblx0XHRcdH0gZWxzZSBpZiAoIHRoZXJlZ2V4LnRlc3QoIG1lc3NhZ2UgKSApIHtcblx0XHRcdFx0bWVzc2FnZSA9ICQudmFsaWRhdG9yLmZvcm1hdCggbWVzc2FnZS5yZXBsYWNlKCB0aGVyZWdleCwgXCJ7JDF9XCIgKSwgcnVsZS5wYXJhbWV0ZXJzICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtZXNzYWdlO1xuXHRcdH0sXG5cblx0XHRmb3JtYXRBbmRBZGQ6IGZ1bmN0aW9uKCBlbGVtZW50LCBydWxlICkge1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSB0aGlzLmRlZmF1bHRNZXNzYWdlKCBlbGVtZW50LCBydWxlICk7XG5cblx0XHRcdHRoaXMuZXJyb3JMaXN0LnB1c2goIHtcblx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZSxcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0bWV0aG9kOiBydWxlLm1ldGhvZFxuXHRcdFx0fSApO1xuXG5cdFx0XHR0aGlzLmVycm9yTWFwWyBlbGVtZW50Lm5hbWUgXSA9IG1lc3NhZ2U7XG5cdFx0XHR0aGlzLnN1Ym1pdHRlZFsgZWxlbWVudC5uYW1lIF0gPSBtZXNzYWdlO1xuXHRcdH0sXG5cblx0XHRhZGRXcmFwcGVyOiBmdW5jdGlvbiggdG9Ub2dnbGUgKSB7XG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3Mud3JhcHBlciApIHtcblx0XHRcdFx0dG9Ub2dnbGUgPSB0b1RvZ2dsZS5hZGQoIHRvVG9nZ2xlLnBhcmVudCggdGhpcy5zZXR0aW5ncy53cmFwcGVyICkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0b1RvZ2dsZTtcblx0XHR9LFxuXG5cdFx0ZGVmYXVsdFNob3dFcnJvcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGksIGVsZW1lbnRzLCBlcnJvcjtcblx0XHRcdGZvciAoIGkgPSAwOyB0aGlzLmVycm9yTGlzdFsgaSBdOyBpKysgKSB7XG5cdFx0XHRcdGVycm9yID0gdGhpcy5lcnJvckxpc3RbIGkgXTtcblx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmhpZ2hsaWdodCApIHtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmhpZ2hsaWdodC5jYWxsKCB0aGlzLCBlcnJvci5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MsIHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2hvd0xhYmVsKCBlcnJvci5lbGVtZW50LCBlcnJvci5tZXNzYWdlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMuZXJyb3JMaXN0Lmxlbmd0aCApIHtcblx0XHRcdFx0dGhpcy50b1Nob3cgPSB0aGlzLnRvU2hvdy5hZGQoIHRoaXMuY29udGFpbmVycyApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLnN1Y2Nlc3MgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyB0aGlzLnN1Y2Nlc3NMaXN0WyBpIF07IGkrKyApIHtcblx0XHRcdFx0XHR0aGlzLnNob3dMYWJlbCggdGhpcy5zdWNjZXNzTGlzdFsgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodCApIHtcblx0XHRcdFx0Zm9yICggaSA9IDAsIGVsZW1lbnRzID0gdGhpcy52YWxpZEVsZW1lbnRzKCk7IGVsZW1lbnRzWyBpIF07IGkrKyApIHtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0LmNhbGwoIHRoaXMsIGVsZW1lbnRzWyBpIF0sIHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcywgdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMudG9IaWRlID0gdGhpcy50b0hpZGUubm90KCB0aGlzLnRvU2hvdyApO1xuXHRcdFx0dGhpcy5oaWRlRXJyb3JzKCk7XG5cdFx0XHR0aGlzLmFkZFdyYXBwZXIoIHRoaXMudG9TaG93ICkuc2hvdygpO1xuXHRcdH0sXG5cblx0XHR2YWxpZEVsZW1lbnRzOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmN1cnJlbnRFbGVtZW50cy5ub3QoIHRoaXMuaW52YWxpZEVsZW1lbnRzKCkgKTtcblx0XHR9LFxuXG5cdFx0aW52YWxpZEVsZW1lbnRzOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiAkKCB0aGlzLmVycm9yTGlzdCApLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XG5cdFx0XHR9ICk7XG5cdFx0fSxcblxuXHRcdHNob3dMYWJlbDogZnVuY3Rpb24oIGVsZW1lbnQsIG1lc3NhZ2UgKSB7XG5cdFx0XHR2YXIgcGxhY2UsIGdyb3VwLCBlcnJvcklELCB2LFxuXHRcdFx0XHRlcnJvciA9IHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICksXG5cdFx0XHRcdGVsZW1lbnRJRCA9IHRoaXMuaWRPck5hbWUoIGVsZW1lbnQgKSxcblx0XHRcdFx0ZGVzY3JpYmVkQnkgPSAkKCBlbGVtZW50ICkuYXR0ciggXCJhcmlhLWRlc2NyaWJlZGJ5XCIgKTtcblxuXHRcdFx0aWYgKCBlcnJvci5sZW5ndGggKSB7XG5cblx0XHRcdFx0Ly8gUmVmcmVzaCBlcnJvci9zdWNjZXNzIGNsYXNzXG5cdFx0XHRcdGVycm9yLnJlbW92ZUNsYXNzKCB0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MgKS5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzICk7XG5cblx0XHRcdFx0Ly8gUmVwbGFjZSBtZXNzYWdlIG9uIGV4aXN0aW5nIGxhYmVsXG5cdFx0XHRcdGVycm9yLmh0bWwoIG1lc3NhZ2UgKTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gQ3JlYXRlIGVycm9yIGVsZW1lbnRcblx0XHRcdFx0ZXJyb3IgPSAkKCBcIjxcIiArIHRoaXMuc2V0dGluZ3MuZXJyb3JFbGVtZW50ICsgXCI+XCIgKVxuXHRcdFx0XHRcdC5hdHRyKCBcImlkXCIsIGVsZW1lbnRJRCArIFwiLWVycm9yXCIgKVxuXHRcdFx0XHRcdC5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzIClcblx0XHRcdFx0XHQuaHRtbCggbWVzc2FnZSB8fCBcIlwiICk7XG5cblx0XHRcdFx0Ly8gTWFpbnRhaW4gcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IHRvIGJlIHBsYWNlZCBpbnRvIHRoZSBET01cblx0XHRcdFx0cGxhY2UgPSBlcnJvcjtcblx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLndyYXBwZXIgKSB7XG5cblx0XHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSwgZXZlbiBpbiBJRVxuXHRcdFx0XHRcdC8vIGFjdHVhbGx5IHNob3dpbmcgdGhlIHdyYXBwZWQgZWxlbWVudCBpcyBoYW5kbGVkIGVsc2V3aGVyZVxuXHRcdFx0XHRcdHBsYWNlID0gZXJyb3IuaGlkZSgpLnNob3coKS53cmFwKCBcIjxcIiArIHRoaXMuc2V0dGluZ3Mud3JhcHBlciArIFwiLz5cIiApLnBhcmVudCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggdGhpcy5sYWJlbENvbnRhaW5lci5sZW5ndGggKSB7XG5cdFx0XHRcdFx0dGhpcy5sYWJlbENvbnRhaW5lci5hcHBlbmQoIHBsYWNlICk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHRoaXMuc2V0dGluZ3MuZXJyb3JQbGFjZW1lbnQgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5lcnJvclBsYWNlbWVudCggcGxhY2UsICQoIGVsZW1lbnQgKSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHBsYWNlLmluc2VydEFmdGVyKCBlbGVtZW50ICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMaW5rIGVycm9yIGJhY2sgdG8gdGhlIGVsZW1lbnRcblx0XHRcdFx0aWYgKCBlcnJvci5pcyggXCJsYWJlbFwiICkgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiB0aGUgZXJyb3IgaXMgYSBsYWJlbCwgdGhlbiBhc3NvY2lhdGUgdXNpbmcgJ2Zvcidcblx0XHRcdFx0XHRlcnJvci5hdHRyKCBcImZvclwiLCBlbGVtZW50SUQgKTtcblxuXHRcdFx0XHRcdC8vIElmIHRoZSBlbGVtZW50IGlzIG5vdCBhIGNoaWxkIG9mIGFuIGFzc29jaWF0ZWQgbGFiZWwsIHRoZW4gaXQncyBuZWNlc3Nhcnlcblx0XHRcdFx0XHQvLyB0byBleHBsaWNpdGx5IGFwcGx5IGFyaWEtZGVzY3JpYmVkYnlcblx0XHRcdFx0fSBlbHNlIGlmICggZXJyb3IucGFyZW50cyggXCJsYWJlbFtmb3I9J1wiICsgdGhpcy5lc2NhcGVDc3NNZXRhKCBlbGVtZW50SUQgKSArIFwiJ11cIiApLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdFx0XHRlcnJvcklEID0gZXJyb3IuYXR0ciggXCJpZFwiICk7XG5cblx0XHRcdFx0XHQvLyBSZXNwZWN0IGV4aXN0aW5nIG5vbi1lcnJvciBhcmlhLWRlc2NyaWJlZGJ5XG5cdFx0XHRcdFx0aWYgKCAhZGVzY3JpYmVkQnkgKSB7XG5cdFx0XHRcdFx0XHRkZXNjcmliZWRCeSA9IGVycm9ySUQ7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggIWRlc2NyaWJlZEJ5Lm1hdGNoKCBuZXcgUmVnRXhwKCBcIlxcXFxiXCIgKyB0aGlzLmVzY2FwZUNzc01ldGEoIGVycm9ySUQgKSArIFwiXFxcXGJcIiApICkgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEFkZCB0byBlbmQgb2YgbGlzdCBpZiBub3QgYWxyZWFkeSBwcmVzZW50XG5cdFx0XHRcdFx0XHRkZXNjcmliZWRCeSArPSBcIiBcIiArIGVycm9ySUQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCQoIGVsZW1lbnQgKS5hdHRyKCBcImFyaWEtZGVzY3JpYmVkYnlcIiwgZGVzY3JpYmVkQnkgKTtcblxuXHRcdFx0XHRcdC8vIElmIHRoaXMgZWxlbWVudCBpcyBncm91cGVkLCB0aGVuIGFzc2lnbiB0byBhbGwgZWxlbWVudHMgaW4gdGhlIHNhbWUgZ3JvdXBcblx0XHRcdFx0XHRncm91cCA9IHRoaXMuZ3JvdXBzWyBlbGVtZW50Lm5hbWUgXTtcblx0XHRcdFx0XHRpZiAoIGdyb3VwICkge1xuXHRcdFx0XHRcdFx0diA9IHRoaXM7XG5cdFx0XHRcdFx0XHQkLmVhY2goIHYuZ3JvdXBzLCBmdW5jdGlvbiggbmFtZSwgdGVzdGdyb3VwICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIHRlc3Rncm91cCA9PT0gZ3JvdXAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0JCggXCJbbmFtZT0nXCIgKyB2LmVzY2FwZUNzc01ldGEoIG5hbWUgKSArIFwiJ11cIiwgdi5jdXJyZW50Rm9ybSApXG5cdFx0XHRcdFx0XHRcdFx0XHQuYXR0ciggXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIGVycm9yLmF0dHIoIFwiaWRcIiApICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggIW1lc3NhZ2UgJiYgdGhpcy5zZXR0aW5ncy5zdWNjZXNzICkge1xuXHRcdFx0XHRlcnJvci50ZXh0KCBcIlwiICk7XG5cdFx0XHRcdGlmICggdHlwZW9mIHRoaXMuc2V0dGluZ3Muc3VjY2VzcyA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0XHRlcnJvci5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5zdWNjZXNzICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5zdWNjZXNzKCBlcnJvciwgZWxlbWVudCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnRvU2hvdyA9IHRoaXMudG9TaG93LmFkZCggZXJyb3IgKTtcblx0XHR9LFxuXG5cdFx0ZXJyb3JzRm9yOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdHZhciBuYW1lID0gdGhpcy5lc2NhcGVDc3NNZXRhKCB0aGlzLmlkT3JOYW1lKCBlbGVtZW50ICkgKSxcblx0XHRcdFx0ZGVzY3JpYmVyID0gJCggZWxlbWVudCApLmF0dHIoIFwiYXJpYS1kZXNjcmliZWRieVwiICksXG5cdFx0XHRcdHNlbGVjdG9yID0gXCJsYWJlbFtmb3I9J1wiICsgbmFtZSArIFwiJ10sIGxhYmVsW2Zvcj0nXCIgKyBuYW1lICsgXCInXSAqXCI7XG5cblx0XHRcdC8vICdhcmlhLWRlc2NyaWJlZGJ5JyBzaG91bGQgZGlyZWN0bHkgcmVmZXJlbmNlIHRoZSBlcnJvciBlbGVtZW50XG5cdFx0XHRpZiAoIGRlc2NyaWJlciApIHtcblx0XHRcdFx0c2VsZWN0b3IgPSBzZWxlY3RvciArIFwiLCAjXCIgKyB0aGlzLmVzY2FwZUNzc01ldGEoIGRlc2NyaWJlciApXG5cdFx0XHRcdFx0LnJlcGxhY2UoIC9cXHMrL2csIFwiLCAjXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRcdFx0LmVycm9ycygpXG5cdFx0XHRcdC5maWx0ZXIoIHNlbGVjdG9yICk7XG5cdFx0fSxcblxuXHRcdC8vIFNlZSBodHRwczovL2FwaS5qcXVlcnkuY29tL2NhdGVnb3J5L3NlbGVjdG9ycy8sIGZvciBDU1Ncblx0XHQvLyBtZXRhLWNoYXJhY3RlcnMgdGhhdCBzaG91bGQgYmUgZXNjYXBlZCBpbiBvcmRlciB0byBiZSB1c2VkIHdpdGggSlF1ZXJ5XG5cdFx0Ly8gYXMgYSBsaXRlcmFsIHBhcnQgb2YgYSBuYW1lL2lkIG9yIGFueSBzZWxlY3Rvci5cblx0XHRlc2NhcGVDc3NNZXRhOiBmdW5jdGlvbiggc3RyaW5nICkge1xuXHRcdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCAvKFtcXFxcIVwiIyQlJicoKSorLC4vOjs8PT4/QFxcW1xcXV5ge3x9fl0pL2csIFwiXFxcXCQxXCIgKTtcblx0XHR9LFxuXG5cdFx0aWRPck5hbWU6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ3JvdXBzWyBlbGVtZW50Lm5hbWUgXSB8fCAoIHRoaXMuY2hlY2thYmxlKCBlbGVtZW50ICkgPyBlbGVtZW50Lm5hbWUgOiBlbGVtZW50LmlkIHx8IGVsZW1lbnQubmFtZSApO1xuXHRcdH0sXG5cblx0XHR2YWxpZGF0aW9uVGFyZ2V0Rm9yOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblxuXHRcdFx0Ly8gSWYgcmFkaW8vY2hlY2tib3gsIHZhbGlkYXRlIGZpcnN0IGVsZW1lbnQgaW4gZ3JvdXAgaW5zdGVhZFxuXHRcdFx0aWYgKCB0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApICkge1xuXHRcdFx0XHRlbGVtZW50ID0gdGhpcy5maW5kQnlOYW1lKCBlbGVtZW50Lm5hbWUgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWx3YXlzIGFwcGx5IGlnbm9yZSBmaWx0ZXJcblx0XHRcdHJldHVybiAkKCBlbGVtZW50ICkubm90KCB0aGlzLnNldHRpbmdzLmlnbm9yZSApWyAwIF07XG5cdFx0fSxcblxuXHRcdGNoZWNrYWJsZTogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gKCAvcmFkaW98Y2hlY2tib3gvaSApLnRlc3QoIGVsZW1lbnQudHlwZSApO1xuXHRcdH0sXG5cblx0XHRmaW5kQnlOYW1lOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRcdHJldHVybiAkKCB0aGlzLmN1cnJlbnRGb3JtICkuZmluZCggXCJbbmFtZT0nXCIgKyB0aGlzLmVzY2FwZUNzc01ldGEoIG5hbWUgKSArIFwiJ11cIiApO1xuXHRcdH0sXG5cblx0XHRnZXRMZW5ndGg6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCApIHtcblx0XHRcdHN3aXRjaCAoIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSApIHtcblx0XHRcdGNhc2UgXCJzZWxlY3RcIjpcblx0XHRcdFx0cmV0dXJuICQoIFwib3B0aW9uOnNlbGVjdGVkXCIsIGVsZW1lbnQgKS5sZW5ndGg7XG5cdFx0XHRjYXNlIFwiaW5wdXRcIjpcblx0XHRcdFx0aWYgKCB0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApICkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmZpbmRCeU5hbWUoIGVsZW1lbnQubmFtZSApLmZpbHRlciggXCI6Y2hlY2tlZFwiICkubGVuZ3RoO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoO1xuXHRcdH0sXG5cblx0XHRkZXBlbmQ6IGZ1bmN0aW9uKCBwYXJhbSwgZWxlbWVudCApIHtcblx0XHRcdHJldHVybiB0aGlzLmRlcGVuZFR5cGVzWyB0eXBlb2YgcGFyYW0gXSA/IHRoaXMuZGVwZW5kVHlwZXNbIHR5cGVvZiBwYXJhbSBdKCBwYXJhbSwgZWxlbWVudCApIDogdHJ1ZTtcblx0XHR9LFxuXG5cdFx0ZGVwZW5kVHlwZXM6IHtcblx0XHRcdFwiYm9vbGVhblwiOiBmdW5jdGlvbiggcGFyYW0gKSB7XG5cdFx0XHRcdHJldHVybiBwYXJhbTtcblx0XHRcdH0sXG5cdFx0XHRcInN0cmluZ1wiOiBmdW5jdGlvbiggcGFyYW0sIGVsZW1lbnQgKSB7XG5cdFx0XHRcdHJldHVybiAhISQoIHBhcmFtLCBlbGVtZW50LmZvcm0gKS5sZW5ndGg7XG5cdFx0XHR9LFxuXHRcdFx0XCJmdW5jdGlvblwiOiBmdW5jdGlvbiggcGFyYW0sIGVsZW1lbnQgKSB7XG5cdFx0XHRcdHJldHVybiBwYXJhbSggZWxlbWVudCApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRvcHRpb25hbDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR2YXIgdmFsID0gdGhpcy5lbGVtZW50VmFsdWUoIGVsZW1lbnQgKTtcblx0XHRcdHJldHVybiAhJC52YWxpZGF0b3IubWV0aG9kcy5yZXF1aXJlZC5jYWxsKCB0aGlzLCB2YWwsIGVsZW1lbnQgKSAmJiBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtcblx0XHR9LFxuXG5cdFx0c3RhcnRSZXF1ZXN0OiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdGlmICggIXRoaXMucGVuZGluZ1sgZWxlbWVudC5uYW1lIF0gKSB7XG5cdFx0XHRcdHRoaXMucGVuZGluZ1JlcXVlc3QrKztcblx0XHRcdFx0JCggZWxlbWVudCApLmFkZENsYXNzKCB0aGlzLnNldHRpbmdzLnBlbmRpbmdDbGFzcyApO1xuXHRcdFx0XHR0aGlzLnBlbmRpbmdbIGVsZW1lbnQubmFtZSBdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c3RvcFJlcXVlc3Q6IGZ1bmN0aW9uKCBlbGVtZW50LCB2YWxpZCApIHtcblx0XHRcdHRoaXMucGVuZGluZ1JlcXVlc3QtLTtcblxuXHRcdFx0Ly8gU29tZXRpbWVzIHN5bmNocm9uaXphdGlvbiBmYWlscywgbWFrZSBzdXJlIHBlbmRpbmdSZXF1ZXN0IGlzIG5ldmVyIDwgMFxuXHRcdFx0aWYgKCB0aGlzLnBlbmRpbmdSZXF1ZXN0IDwgMCApIHtcblx0XHRcdFx0dGhpcy5wZW5kaW5nUmVxdWVzdCA9IDA7XG5cdFx0XHR9XG5cdFx0XHRkZWxldGUgdGhpcy5wZW5kaW5nWyBlbGVtZW50Lm5hbWUgXTtcblx0XHRcdCQoIGVsZW1lbnQgKS5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy5wZW5kaW5nQ2xhc3MgKTtcblx0XHRcdGlmICggdmFsaWQgJiYgdGhpcy5wZW5kaW5nUmVxdWVzdCA9PT0gMCAmJiB0aGlzLmZvcm1TdWJtaXR0ZWQgJiYgdGhpcy5mb3JtKCkgKSB7XG5cdFx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKS5zdWJtaXQoKTtcblx0XHRcdFx0dGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XG5cdFx0XHR9IGVsc2UgaWYgKCAhdmFsaWQgJiYgdGhpcy5wZW5kaW5nUmVxdWVzdCA9PT0gMCAmJiB0aGlzLmZvcm1TdWJtaXR0ZWQgKSB7XG5cdFx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKS50cmlnZ2VySGFuZGxlciggXCJpbnZhbGlkLWZvcm1cIiwgWyB0aGlzIF0gKTtcblx0XHRcdFx0dGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHByZXZpb3VzVmFsdWU6IGZ1bmN0aW9uKCBlbGVtZW50LCBtZXRob2QgKSB7XG5cdFx0XHRyZXR1cm4gJC5kYXRhKCBlbGVtZW50LCBcInByZXZpb3VzVmFsdWVcIiApIHx8ICQuZGF0YSggZWxlbWVudCwgXCJwcmV2aW91c1ZhbHVlXCIsIHtcblx0XHRcdFx0b2xkOiBudWxsLFxuXHRcdFx0XHR2YWxpZDogdHJ1ZSxcblx0XHRcdFx0bWVzc2FnZTogdGhpcy5kZWZhdWx0TWVzc2FnZSggZWxlbWVudCwgeyBtZXRob2Q6IG1ldGhvZCB9IClcblx0XHRcdH0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gQ2xlYW5zIHVwIGFsbCBmb3JtcyBhbmQgZWxlbWVudHMsIHJlbW92ZXMgdmFsaWRhdG9yLXNwZWNpZmljIGV2ZW50c1xuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5yZXNldEZvcm0oKTtcblxuXHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApXG5cdFx0XHRcdC5vZmYoIFwiLnZhbGlkYXRlXCIgKVxuXHRcdFx0XHQucmVtb3ZlRGF0YSggXCJ2YWxpZGF0b3JcIiApXG5cdFx0XHRcdC5maW5kKCBcIi52YWxpZGF0ZS1lcXVhbFRvLWJsdXJcIiApXG5cdFx0XHRcdFx0Lm9mZiggXCIudmFsaWRhdGUtZXF1YWxUb1wiIClcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoIFwidmFsaWRhdGUtZXF1YWxUby1ibHVyXCIgKTtcblx0XHR9XG5cblx0fSxcblxuXHRjbGFzc1J1bGVTZXR0aW5nczoge1xuXHRcdHJlcXVpcmVkOiB7IHJlcXVpcmVkOiB0cnVlIH0sXG5cdFx0ZW1haWw6IHsgZW1haWw6IHRydWUgfSxcblx0XHR1cmw6IHsgdXJsOiB0cnVlIH0sXG5cdFx0ZGF0ZTogeyBkYXRlOiB0cnVlIH0sXG5cdFx0ZGF0ZUlTTzogeyBkYXRlSVNPOiB0cnVlIH0sXG5cdFx0bnVtYmVyOiB7IG51bWJlcjogdHJ1ZSB9LFxuXHRcdGRpZ2l0czogeyBkaWdpdHM6IHRydWUgfSxcblx0XHRjcmVkaXRjYXJkOiB7IGNyZWRpdGNhcmQ6IHRydWUgfVxuXHR9LFxuXG5cdGFkZENsYXNzUnVsZXM6IGZ1bmN0aW9uKCBjbGFzc05hbWUsIHJ1bGVzICkge1xuXHRcdGlmICggY2xhc3NOYW1lLmNvbnN0cnVjdG9yID09PSBTdHJpbmcgKSB7XG5cdFx0XHR0aGlzLmNsYXNzUnVsZVNldHRpbmdzWyBjbGFzc05hbWUgXSA9IHJ1bGVzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkLmV4dGVuZCggdGhpcy5jbGFzc1J1bGVTZXR0aW5ncywgY2xhc3NOYW1lICk7XG5cdFx0fVxuXHR9LFxuXG5cdGNsYXNzUnVsZXM6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdHZhciBydWxlcyA9IHt9LFxuXHRcdFx0Y2xhc3NlcyA9ICQoIGVsZW1lbnQgKS5hdHRyKCBcImNsYXNzXCIgKTtcblxuXHRcdGlmICggY2xhc3NlcyApIHtcblx0XHRcdCQuZWFjaCggY2xhc3Nlcy5zcGxpdCggXCIgXCIgKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyBpbiAkLnZhbGlkYXRvci5jbGFzc1J1bGVTZXR0aW5ncyApIHtcblx0XHRcdFx0XHQkLmV4dGVuZCggcnVsZXMsICQudmFsaWRhdG9yLmNsYXNzUnVsZVNldHRpbmdzWyB0aGlzIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdH1cblx0XHRyZXR1cm4gcnVsZXM7XG5cdH0sXG5cblx0bm9ybWFsaXplQXR0cmlidXRlUnVsZTogZnVuY3Rpb24oIHJ1bGVzLCB0eXBlLCBtZXRob2QsIHZhbHVlICkge1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgdmFsdWUgdG8gYSBudW1iZXIgZm9yIG51bWJlciBpbnB1dHMsIGFuZCBmb3IgdGV4dCBmb3IgYmFja3dhcmRzIGNvbXBhYmlsaXR5XG5cdFx0Ly8gYWxsb3dzIHR5cGU9XCJkYXRlXCIgYW5kIG90aGVycyB0byBiZSBjb21wYXJlZCBhcyBzdHJpbmdzXG5cdFx0aWYgKCAvbWlufG1heHxzdGVwLy50ZXN0KCBtZXRob2QgKSAmJiAoIHR5cGUgPT09IG51bGwgfHwgL251bWJlcnxyYW5nZXx0ZXh0Ly50ZXN0KCB0eXBlICkgKSApIHtcblx0XHRcdHZhbHVlID0gTnVtYmVyKCB2YWx1ZSApO1xuXG5cdFx0XHQvLyBTdXBwb3J0IE9wZXJhIE1pbmksIHdoaWNoIHJldHVybnMgTmFOIGZvciB1bmRlZmluZWQgbWlubGVuZ3RoXG5cdFx0XHRpZiAoIGlzTmFOKCB2YWx1ZSApICkge1xuXHRcdFx0XHR2YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlIHx8IHZhbHVlID09PSAwICkge1xuXHRcdFx0cnVsZXNbIG1ldGhvZCBdID0gdmFsdWU7XG5cdFx0fSBlbHNlIGlmICggdHlwZSA9PT0gbWV0aG9kICYmIHR5cGUgIT09IFwicmFuZ2VcIiApIHtcblxuXHRcdFx0Ly8gRXhjZXB0aW9uOiB0aGUganF1ZXJ5IHZhbGlkYXRlICdyYW5nZScgbWV0aG9kXG5cdFx0XHQvLyBkb2VzIG5vdCB0ZXN0IGZvciB0aGUgaHRtbDUgJ3JhbmdlJyB0eXBlXG5cdFx0XHRydWxlc1sgbWV0aG9kIF0gPSB0cnVlO1xuXHRcdH1cblx0fSxcblxuXHRhdHRyaWJ1dGVSdWxlczogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dmFyIHJ1bGVzID0ge30sXG5cdFx0XHQkZWxlbWVudCA9ICQoIGVsZW1lbnQgKSxcblx0XHRcdHR5cGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSxcblx0XHRcdG1ldGhvZCwgdmFsdWU7XG5cblx0XHRmb3IgKCBtZXRob2QgaW4gJC52YWxpZGF0b3IubWV0aG9kcyApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydCBmb3IgPGlucHV0IHJlcXVpcmVkPiBpbiBib3RoIGh0bWw1IGFuZCBvbGRlciBicm93c2Vyc1xuXHRcdFx0aWYgKCBtZXRob2QgPT09IFwicmVxdWlyZWRcIiApIHtcblx0XHRcdFx0dmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSggbWV0aG9kICk7XG5cblx0XHRcdFx0Ly8gU29tZSBicm93c2VycyByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIGZvciB0aGUgcmVxdWlyZWQgYXR0cmlidXRlXG5cdFx0XHRcdC8vIGFuZCBub24tSFRNTDUgYnJvd3NlcnMgbWlnaHQgaGF2ZSByZXF1aXJlZD1cIlwiIG1hcmt1cFxuXHRcdFx0XHRpZiAoIHZhbHVlID09PSBcIlwiICkge1xuXHRcdFx0XHRcdHZhbHVlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIG5vbi1IVE1MNSBicm93c2VycyB0byByZXR1cm4gYm9vbFxuXHRcdFx0XHR2YWx1ZSA9ICEhdmFsdWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWx1ZSA9ICRlbGVtZW50LmF0dHIoIG1ldGhvZCApO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLm5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGUoIHJ1bGVzLCB0eXBlLCBtZXRob2QsIHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0Ly8gJ21heGxlbmd0aCcgbWF5IGJlIHJldHVybmVkIGFzIC0xLCAyMTQ3NDgzNjQ3ICggSUUgKSBhbmQgNTI0Mjg4ICggc2FmYXJpICkgZm9yIHRleHQgaW5wdXRzXG5cdFx0aWYgKCBydWxlcy5tYXhsZW5ndGggJiYgLy0xfDIxNDc0ODM2NDd8NTI0Mjg4Ly50ZXN0KCBydWxlcy5tYXhsZW5ndGggKSApIHtcblx0XHRcdGRlbGV0ZSBydWxlcy5tYXhsZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdGRhdGFSdWxlczogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dmFyIHJ1bGVzID0ge30sXG5cdFx0XHQkZWxlbWVudCA9ICQoIGVsZW1lbnQgKSxcblx0XHRcdHR5cGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSxcblx0XHRcdG1ldGhvZCwgdmFsdWU7XG5cblx0XHRmb3IgKCBtZXRob2QgaW4gJC52YWxpZGF0b3IubWV0aG9kcyApIHtcblx0XHRcdHZhbHVlID0gJGVsZW1lbnQuZGF0YSggXCJydWxlXCIgKyBtZXRob2QuY2hhckF0KCAwICkudG9VcHBlckNhc2UoKSArIG1ldGhvZC5zdWJzdHJpbmcoIDEgKS50b0xvd2VyQ2FzZSgpICk7XG5cdFx0XHR0aGlzLm5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGUoIHJ1bGVzLCB0eXBlLCBtZXRob2QsIHZhbHVlICk7XG5cdFx0fVxuXHRcdHJldHVybiBydWxlcztcblx0fSxcblxuXHRzdGF0aWNSdWxlczogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dmFyIHJ1bGVzID0ge30sXG5cdFx0XHR2YWxpZGF0b3IgPSAkLmRhdGEoIGVsZW1lbnQuZm9ybSwgXCJ2YWxpZGF0b3JcIiApO1xuXG5cdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3MucnVsZXMgKSB7XG5cdFx0XHRydWxlcyA9ICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoIHZhbGlkYXRvci5zZXR0aW5ncy5ydWxlc1sgZWxlbWVudC5uYW1lIF0gKSB8fCB7fTtcblx0XHR9XG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdG5vcm1hbGl6ZVJ1bGVzOiBmdW5jdGlvbiggcnVsZXMsIGVsZW1lbnQgKSB7XG5cblx0XHQvLyBIYW5kbGUgZGVwZW5kZW5jeSBjaGVja1xuXHRcdCQuZWFjaCggcnVsZXMsIGZ1bmN0aW9uKCBwcm9wLCB2YWwgKSB7XG5cblx0XHRcdC8vIElnbm9yZSBydWxlIHdoZW4gcGFyYW0gaXMgZXhwbGljaXRseSBmYWxzZSwgZWcuIHJlcXVpcmVkOmZhbHNlXG5cdFx0XHRpZiAoIHZhbCA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdGRlbGV0ZSBydWxlc1sgcHJvcCBdO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHZhbC5wYXJhbSB8fCB2YWwuZGVwZW5kcyApIHtcblx0XHRcdFx0dmFyIGtlZXBSdWxlID0gdHJ1ZTtcblx0XHRcdFx0c3dpdGNoICggdHlwZW9mIHZhbC5kZXBlbmRzICkge1xuXHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdFx0a2VlcFJ1bGUgPSAhISQoIHZhbC5kZXBlbmRzLCBlbGVtZW50LmZvcm0gKS5sZW5ndGg7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJmdW5jdGlvblwiOlxuXHRcdFx0XHRcdGtlZXBSdWxlID0gdmFsLmRlcGVuZHMuY2FsbCggZWxlbWVudCwgZWxlbWVudCApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgga2VlcFJ1bGUgKSB7XG5cdFx0XHRcdFx0cnVsZXNbIHByb3AgXSA9IHZhbC5wYXJhbSAhPT0gdW5kZWZpbmVkID8gdmFsLnBhcmFtIDogdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkLmRhdGEoIGVsZW1lbnQuZm9ybSwgXCJ2YWxpZGF0b3JcIiApLnJlc2V0RWxlbWVudHMoICQoIGVsZW1lbnQgKSApO1xuXHRcdFx0XHRcdGRlbGV0ZSBydWxlc1sgcHJvcCBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdFx0Ly8gRXZhbHVhdGUgcGFyYW1ldGVyc1xuXHRcdCQuZWFjaCggcnVsZXMsIGZ1bmN0aW9uKCBydWxlLCBwYXJhbWV0ZXIgKSB7XG5cdFx0XHRydWxlc1sgcnVsZSBdID0gJC5pc0Z1bmN0aW9uKCBwYXJhbWV0ZXIgKSAmJiBydWxlICE9PSBcIm5vcm1hbGl6ZXJcIiA/IHBhcmFtZXRlciggZWxlbWVudCApIDogcGFyYW1ldGVyO1xuXHRcdH0gKTtcblxuXHRcdC8vIENsZWFuIG51bWJlciBwYXJhbWV0ZXJzXG5cdFx0JC5lYWNoKCBbIFwibWlubGVuZ3RoXCIsIFwibWF4bGVuZ3RoXCIgXSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHJ1bGVzWyB0aGlzIF0gKSB7XG5cdFx0XHRcdHJ1bGVzWyB0aGlzIF0gPSBOdW1iZXIoIHJ1bGVzWyB0aGlzIF0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdFx0JC5lYWNoKCBbIFwicmFuZ2VsZW5ndGhcIiwgXCJyYW5nZVwiIF0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHBhcnRzO1xuXHRcdFx0aWYgKCBydWxlc1sgdGhpcyBdICkge1xuXHRcdFx0XHRpZiAoICQuaXNBcnJheSggcnVsZXNbIHRoaXMgXSApICkge1xuXHRcdFx0XHRcdHJ1bGVzWyB0aGlzIF0gPSBbIE51bWJlciggcnVsZXNbIHRoaXMgXVsgMCBdICksIE51bWJlciggcnVsZXNbIHRoaXMgXVsgMSBdICkgXTtcblx0XHRcdFx0fSBlbHNlIGlmICggdHlwZW9mIHJ1bGVzWyB0aGlzIF0gPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0cGFydHMgPSBydWxlc1sgdGhpcyBdLnJlcGxhY2UoIC9bXFxbXFxdXS9nLCBcIlwiICkuc3BsaXQoIC9bXFxzLF0rLyApO1xuXHRcdFx0XHRcdHJ1bGVzWyB0aGlzIF0gPSBbIE51bWJlciggcGFydHNbIDAgXSApLCBOdW1iZXIoIHBhcnRzWyAxIF0gKSBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdFx0aWYgKCAkLnZhbGlkYXRvci5hdXRvQ3JlYXRlUmFuZ2VzICkge1xuXG5cdFx0XHQvLyBBdXRvLWNyZWF0ZSByYW5nZXNcblx0XHRcdGlmICggcnVsZXMubWluICE9IG51bGwgJiYgcnVsZXMubWF4ICE9IG51bGwgKSB7XG5cdFx0XHRcdHJ1bGVzLnJhbmdlID0gWyBydWxlcy5taW4sIHJ1bGVzLm1heCBdO1xuXHRcdFx0XHRkZWxldGUgcnVsZXMubWluO1xuXHRcdFx0XHRkZWxldGUgcnVsZXMubWF4O1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBydWxlcy5taW5sZW5ndGggIT0gbnVsbCAmJiBydWxlcy5tYXhsZW5ndGggIT0gbnVsbCApIHtcblx0XHRcdFx0cnVsZXMucmFuZ2VsZW5ndGggPSBbIHJ1bGVzLm1pbmxlbmd0aCwgcnVsZXMubWF4bGVuZ3RoIF07XG5cdFx0XHRcdGRlbGV0ZSBydWxlcy5taW5sZW5ndGg7XG5cdFx0XHRcdGRlbGV0ZSBydWxlcy5tYXhsZW5ndGg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdC8vIENvbnZlcnRzIGEgc2ltcGxlIHN0cmluZyB0byBhIHtzdHJpbmc6IHRydWV9IHJ1bGUsIGUuZy4sIFwicmVxdWlyZWRcIiB0byB7cmVxdWlyZWQ6dHJ1ZX1cblx0bm9ybWFsaXplUnVsZTogZnVuY3Rpb24oIGRhdGEgKSB7XG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHZhciB0cmFuc2Zvcm1lZCA9IHt9O1xuXHRcdFx0JC5lYWNoKCBkYXRhLnNwbGl0KCAvXFxzLyApLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dHJhbnNmb3JtZWRbIHRoaXMgXSA9IHRydWU7XG5cdFx0XHR9ICk7XG5cdFx0XHRkYXRhID0gdHJhbnNmb3JtZWQ7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9qUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZC9cblx0YWRkTWV0aG9kOiBmdW5jdGlvbiggbmFtZSwgbWV0aG9kLCBtZXNzYWdlICkge1xuXHRcdCQudmFsaWRhdG9yLm1ldGhvZHNbIG5hbWUgXSA9IG1ldGhvZDtcblx0XHQkLnZhbGlkYXRvci5tZXNzYWdlc1sgbmFtZSBdID0gbWVzc2FnZSAhPT0gdW5kZWZpbmVkID8gbWVzc2FnZSA6ICQudmFsaWRhdG9yLm1lc3NhZ2VzWyBuYW1lIF07XG5cdFx0aWYgKCBtZXRob2QubGVuZ3RoIDwgMyApIHtcblx0XHRcdCQudmFsaWRhdG9yLmFkZENsYXNzUnVsZXMoIG5hbWUsICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoIG5hbWUgKSApO1xuXHRcdH1cblx0fSxcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvalF1ZXJ5LnZhbGlkYXRvci5tZXRob2RzL1xuXHRtZXRob2RzOiB7XG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvcmVxdWlyZWQtbWV0aG9kL1xuXHRcdHJlcXVpcmVkOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXG5cdFx0XHQvLyBDaGVjayBpZiBkZXBlbmRlbmN5IGlzIG1ldFxuXHRcdFx0aWYgKCAhdGhpcy5kZXBlbmQoIHBhcmFtLCBlbGVtZW50ICkgKSB7XG5cdFx0XHRcdHJldHVybiBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtcblx0XHRcdH1cblx0XHRcdGlmICggZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInNlbGVjdFwiICkge1xuXG5cdFx0XHRcdC8vIENvdWxkIGJlIGFuIGFycmF5IGZvciBzZWxlY3QtbXVsdGlwbGUgb3IgYSBzdHJpbmcsIGJvdGggYXJlIGZpbmUgdGhpcyB3YXlcblx0XHRcdFx0dmFyIHZhbCA9ICQoIGVsZW1lbnQgKS52YWwoKTtcblx0XHRcdFx0cmV0dXJuIHZhbCAmJiB2YWwubGVuZ3RoID4gMDtcblx0XHRcdH1cblx0XHRcdGlmICggdGhpcy5jaGVja2FibGUoIGVsZW1lbnQgKSApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0TGVuZ3RoKCB2YWx1ZSwgZWxlbWVudCApID4gMDtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZW1haWwtbWV0aG9kL1xuXHRcdGVtYWlsOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cblx0XHRcdC8vIEZyb20gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCN2YWxpZC1lLW1haWwtYWRkcmVzc1xuXHRcdFx0Ly8gUmV0cmlldmVkIDIwMTQtMDEtMTRcblx0XHRcdC8vIElmIHlvdSBoYXZlIGEgcHJvYmxlbSB3aXRoIHRoaXMgaW1wbGVtZW50YXRpb24sIHJlcG9ydCBhIGJ1ZyBhZ2FpbnN0IHRoZSBhYm92ZSBzcGVjXG5cdFx0XHQvLyBPciB1c2UgY3VzdG9tIG1ldGhvZHMgdG8gaW1wbGVtZW50IHlvdXIgb3duIGVtYWlsIHZhbGlkYXRpb25cblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgL15bYS16QS1aMC05LiEjJCUmJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykqJC8udGVzdCggdmFsdWUgKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3VybC1tZXRob2QvXG5cdFx0dXJsOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cblx0XHRcdC8vIENvcHlyaWdodCAoYykgMjAxMC0yMDEzIERpZWdvIFBlcmluaSwgTUlUIGxpY2Vuc2VkXG5cdFx0XHQvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9kcGVyaW5pLzcyOTI5NFxuXHRcdFx0Ly8gc2VlIGFsc28gaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL2RlbW8vdXJsLXJlZ2V4XG5cdFx0XHQvLyBtb2RpZmllZCB0byBhbGxvdyBwcm90b2NvbC1yZWxhdGl2ZSBVUkxzXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eKD86KD86KD86aHR0cHM/fGZ0cCk6KT9cXC9cXC8pKD86XFxTKyg/OjpcXFMqKT9AKT8oPzooPyEoPzoxMHwxMjcpKD86XFwuXFxkezEsM30pezN9KSg/ISg/OjE2OVxcLjI1NHwxOTJcXC4xNjgpKD86XFwuXFxkezEsM30pezJ9KSg/ITE3MlxcLig/OjFbNi05XXwyXFxkfDNbMC0xXSkoPzpcXC5cXGR7MSwzfSl7Mn0pKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswMV1cXGR8MjJbMC0zXSkoPzpcXC4oPzoxP1xcZHsxLDJ9fDJbMC00XVxcZHwyNVswLTVdKSl7Mn0oPzpcXC4oPzpbMS05XVxcZD98MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC00XSkpfCg/Oig/OlthLXpcXHUwMGExLVxcdWZmZmYwLTldLSopKlthLXpcXHUwMGExLVxcdWZmZmYwLTldKykoPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKig/OlxcLig/OlthLXpcXHUwMGExLVxcdWZmZmZdezIsfSkpLj8pKD86OlxcZHsyLDV9KT8oPzpbLz8jXVxcUyopPyQvaS50ZXN0KCB2YWx1ZSApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZGF0ZS1tZXRob2QvXG5cdFx0ZGF0ZTogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAhL0ludmFsaWR8TmFOLy50ZXN0KCBuZXcgRGF0ZSggdmFsdWUgKS50b1N0cmluZygpICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9kYXRlSVNPLW1ldGhvZC9cblx0XHRkYXRlSVNPOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eXFxkezR9W1xcL1xcLV0oMD9bMS05XXwxWzAxMl0pW1xcL1xcLV0oMD9bMS05XXxbMTJdWzAtOV18M1swMV0pJC8udGVzdCggdmFsdWUgKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL251bWJlci1tZXRob2QvXG5cdFx0bnVtYmVyOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eKD86LT9cXGQrfC0/XFxkezEsM30oPzosXFxkezN9KSspPyg/OlxcLlxcZCspPyQvLnRlc3QoIHZhbHVlICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9kaWdpdHMtbWV0aG9kL1xuXHRcdGRpZ2l0czogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAvXlxcZCskLy50ZXN0KCB2YWx1ZSApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvbWlubGVuZ3RoLW1ldGhvZC9cblx0XHRtaW5sZW5ndGg6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHR2YXIgbGVuZ3RoID0gJC5pc0FycmF5KCB2YWx1ZSApID8gdmFsdWUubGVuZ3RoIDogdGhpcy5nZXRMZW5ndGgoIHZhbHVlLCBlbGVtZW50ICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IGxlbmd0aCA+PSBwYXJhbTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21heGxlbmd0aC1tZXRob2QvXG5cdFx0bWF4bGVuZ3RoOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0dmFyIGxlbmd0aCA9ICQuaXNBcnJheSggdmFsdWUgKSA/IHZhbHVlLmxlbmd0aCA6IHRoaXMuZ2V0TGVuZ3RoKCB2YWx1ZSwgZWxlbWVudCApO1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCBsZW5ndGggPD0gcGFyYW07XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9yYW5nZWxlbmd0aC1tZXRob2QvXG5cdFx0cmFuZ2VsZW5ndGg6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHR2YXIgbGVuZ3RoID0gJC5pc0FycmF5KCB2YWx1ZSApID8gdmFsdWUubGVuZ3RoIDogdGhpcy5nZXRMZW5ndGgoIHZhbHVlLCBlbGVtZW50ICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8ICggbGVuZ3RoID49IHBhcmFtWyAwIF0gJiYgbGVuZ3RoIDw9IHBhcmFtWyAxIF0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21pbi1tZXRob2QvXG5cdFx0bWluOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCB2YWx1ZSA+PSBwYXJhbTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21heC1tZXRob2QvXG5cdFx0bWF4OiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCB2YWx1ZSA8PSBwYXJhbTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3JhbmdlLW1ldGhvZC9cblx0XHRyYW5nZTogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgKCB2YWx1ZSA+PSBwYXJhbVsgMCBdICYmIHZhbHVlIDw9IHBhcmFtWyAxIF0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3N0ZXAtbWV0aG9kL1xuXHRcdHN0ZXA6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHR2YXIgdHlwZSA9ICQoIGVsZW1lbnQgKS5hdHRyKCBcInR5cGVcIiApLFxuXHRcdFx0XHRlcnJvck1lc3NhZ2UgPSBcIlN0ZXAgYXR0cmlidXRlIG9uIGlucHV0IHR5cGUgXCIgKyB0eXBlICsgXCIgaXMgbm90IHN1cHBvcnRlZC5cIixcblx0XHRcdFx0c3VwcG9ydGVkVHlwZXMgPSBbIFwidGV4dFwiLCBcIm51bWJlclwiLCBcInJhbmdlXCIgXSxcblx0XHRcdFx0cmUgPSBuZXcgUmVnRXhwKCBcIlxcXFxiXCIgKyB0eXBlICsgXCJcXFxcYlwiICksXG5cdFx0XHRcdG5vdFN1cHBvcnRlZCA9IHR5cGUgJiYgIXJlLnRlc3QoIHN1cHBvcnRlZFR5cGVzLmpvaW4oKSApO1xuXG5cdFx0XHQvLyBXb3JrcyBvbmx5IGZvciB0ZXh0LCBudW1iZXIgYW5kIHJhbmdlIGlucHV0IHR5cGVzXG5cdFx0XHQvLyBUT0RPIGZpbmQgYSB3YXkgdG8gc3VwcG9ydCBpbnB1dCB0eXBlcyBkYXRlLCBkYXRldGltZSwgZGF0ZXRpbWUtbG9jYWwsIG1vbnRoLCB0aW1lIGFuZCB3ZWVrXG5cdFx0XHRpZiAoIG5vdFN1cHBvcnRlZCApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBlcnJvck1lc3NhZ2UgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgKCB2YWx1ZSAlIHBhcmFtID09PSAwICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9lcXVhbFRvLW1ldGhvZC9cblx0XHRlcXVhbFRvOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXG5cdFx0XHQvLyBCaW5kIHRvIHRoZSBibHVyIGV2ZW50IG9mIHRoZSB0YXJnZXQgaW4gb3JkZXIgdG8gcmV2YWxpZGF0ZSB3aGVuZXZlciB0aGUgdGFyZ2V0IGZpZWxkIGlzIHVwZGF0ZWRcblx0XHRcdHZhciB0YXJnZXQgPSAkKCBwYXJhbSApO1xuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLm9uZm9jdXNvdXQgJiYgdGFyZ2V0Lm5vdCggXCIudmFsaWRhdGUtZXF1YWxUby1ibHVyXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHRhcmdldC5hZGRDbGFzcyggXCJ2YWxpZGF0ZS1lcXVhbFRvLWJsdXJcIiApLm9uKCBcImJsdXIudmFsaWRhdGUtZXF1YWxUb1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkKCBlbGVtZW50ICkudmFsaWQoKTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB0YXJnZXQudmFsKCk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9yZW1vdGUtbWV0aG9kL1xuXHRcdHJlbW90ZTogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSwgbWV0aG9kICkge1xuXHRcdFx0aWYgKCB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgKSB7XG5cdFx0XHRcdHJldHVybiBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtcblx0XHRcdH1cblxuXHRcdFx0bWV0aG9kID0gdHlwZW9mIG1ldGhvZCA9PT0gXCJzdHJpbmdcIiAmJiBtZXRob2QgfHwgXCJyZW1vdGVcIjtcblxuXHRcdFx0dmFyIHByZXZpb3VzID0gdGhpcy5wcmV2aW91c1ZhbHVlKCBlbGVtZW50LCBtZXRob2QgKSxcblx0XHRcdFx0dmFsaWRhdG9yLCBkYXRhLCBvcHRpb25EYXRhU3RyaW5nO1xuXG5cdFx0XHRpZiAoICF0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXSApIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF0gPSB7fTtcblx0XHRcdH1cblx0XHRcdHByZXZpb3VzLm9yaWdpbmFsTWVzc2FnZSA9IHByZXZpb3VzLm9yaWdpbmFsTWVzc2FnZSB8fCB0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXVsgbWV0aG9kIF07XG5cdFx0XHR0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXVsgbWV0aG9kIF0gPSBwcmV2aW91cy5tZXNzYWdlO1xuXG5cdFx0XHRwYXJhbSA9IHR5cGVvZiBwYXJhbSA9PT0gXCJzdHJpbmdcIiAmJiB7IHVybDogcGFyYW0gfSB8fCBwYXJhbTtcblx0XHRcdG9wdGlvbkRhdGFTdHJpbmcgPSAkLnBhcmFtKCAkLmV4dGVuZCggeyBkYXRhOiB2YWx1ZSB9LCBwYXJhbS5kYXRhICkgKTtcblx0XHRcdGlmICggcHJldmlvdXMub2xkID09PSBvcHRpb25EYXRhU3RyaW5nICkge1xuXHRcdFx0XHRyZXR1cm4gcHJldmlvdXMudmFsaWQ7XG5cdFx0XHR9XG5cblx0XHRcdHByZXZpb3VzLm9sZCA9IG9wdGlvbkRhdGFTdHJpbmc7XG5cdFx0XHR2YWxpZGF0b3IgPSB0aGlzO1xuXHRcdFx0dGhpcy5zdGFydFJlcXVlc3QoIGVsZW1lbnQgKTtcblx0XHRcdGRhdGEgPSB7fTtcblx0XHRcdGRhdGFbIGVsZW1lbnQubmFtZSBdID0gdmFsdWU7XG5cdFx0XHQkLmFqYXgoICQuZXh0ZW5kKCB0cnVlLCB7XG5cdFx0XHRcdG1vZGU6IFwiYWJvcnRcIixcblx0XHRcdFx0cG9ydDogXCJ2YWxpZGF0ZVwiICsgZWxlbWVudC5uYW1lLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGNvbnRleHQ6IHZhbGlkYXRvci5jdXJyZW50Rm9ybSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oIHJlc3BvbnNlICkge1xuXHRcdFx0XHRcdHZhciB2YWxpZCA9IHJlc3BvbnNlID09PSB0cnVlIHx8IHJlc3BvbnNlID09PSBcInRydWVcIixcblx0XHRcdFx0XHRcdGVycm9ycywgbWVzc2FnZSwgc3VibWl0dGVkO1xuXG5cdFx0XHRcdFx0dmFsaWRhdG9yLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXVsgbWV0aG9kIF0gPSBwcmV2aW91cy5vcmlnaW5hbE1lc3NhZ2U7XG5cdFx0XHRcdFx0aWYgKCB2YWxpZCApIHtcblx0XHRcdFx0XHRcdHN1Ym1pdHRlZCA9IHZhbGlkYXRvci5mb3JtU3VibWl0dGVkO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnJlc2V0SW50ZXJuYWxzKCk7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3IudG9IaWRlID0gdmFsaWRhdG9yLmVycm9yc0ZvciggZWxlbWVudCApO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLmZvcm1TdWJtaXR0ZWQgPSBzdWJtaXR0ZWQ7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3Iuc3VjY2Vzc0xpc3QucHVzaCggZWxlbWVudCApO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLmludmFsaWRbIGVsZW1lbnQubmFtZSBdID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3Iuc2hvd0Vycm9ycygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlcnJvcnMgPSB7fTtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPSByZXNwb25zZSB8fCB2YWxpZGF0b3IuZGVmYXVsdE1lc3NhZ2UoIGVsZW1lbnQsIHsgbWV0aG9kOiBtZXRob2QsIHBhcmFtZXRlcnM6IHZhbHVlIH0gKTtcblx0XHRcdFx0XHRcdGVycm9yc1sgZWxlbWVudC5uYW1lIF0gPSBwcmV2aW91cy5tZXNzYWdlID0gbWVzc2FnZTtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5pbnZhbGlkWyBlbGVtZW50Lm5hbWUgXSA9IHRydWU7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3Iuc2hvd0Vycm9ycyggZXJyb3JzICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHByZXZpb3VzLnZhbGlkID0gdmFsaWQ7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLnN0b3BSZXF1ZXN0KCBlbGVtZW50LCB2YWxpZCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBwYXJhbSApICk7XG5cdFx0XHRyZXR1cm4gXCJwZW5kaW5nXCI7XG5cdFx0fVxuXHR9XG5cbn0gKTtcblxyXG4vLyBBamF4IG1vZGU6IGFib3J0XG4vLyB1c2FnZTogJC5hamF4KHsgbW9kZTogXCJhYm9ydFwiWywgcG9ydDogXCJ1bmlxdWVwb3J0XCJdfSk7XG4vLyBpZiBtb2RlOlwiYWJvcnRcIiBpcyB1c2VkLCB0aGUgcHJldmlvdXMgcmVxdWVzdCBvbiB0aGF0IHBvcnQgKHBvcnQgY2FuIGJlIHVuZGVmaW5lZCkgaXMgYWJvcnRlZCB2aWEgWE1MSHR0cFJlcXVlc3QuYWJvcnQoKVxuXG52YXIgcGVuZGluZ1JlcXVlc3RzID0ge30sXG5cdGFqYXg7XG5cbi8vIFVzZSBhIHByZWZpbHRlciBpZiBhdmFpbGFibGUgKDEuNSspXG5pZiAoICQuYWpheFByZWZpbHRlciApIHtcblx0JC5hamF4UHJlZmlsdGVyKCBmdW5jdGlvbiggc2V0dGluZ3MsIF8sIHhociApIHtcblx0XHR2YXIgcG9ydCA9IHNldHRpbmdzLnBvcnQ7XG5cdFx0aWYgKCBzZXR0aW5ncy5tb2RlID09PSBcImFib3J0XCIgKSB7XG5cdFx0XHRpZiAoIHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdICkge1xuXHRcdFx0XHRwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXS5hYm9ydCgpO1xuXHRcdFx0fVxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzWyBwb3J0IF0gPSB4aHI7XG5cdFx0fVxuXHR9ICk7XG59IGVsc2Uge1xuXG5cdC8vIFByb3h5IGFqYXhcblx0YWpheCA9ICQuYWpheDtcblx0JC5hamF4ID0gZnVuY3Rpb24oIHNldHRpbmdzICkge1xuXHRcdHZhciBtb2RlID0gKCBcIm1vZGVcIiBpbiBzZXR0aW5ncyA/IHNldHRpbmdzIDogJC5hamF4U2V0dGluZ3MgKS5tb2RlLFxuXHRcdFx0cG9ydCA9ICggXCJwb3J0XCIgaW4gc2V0dGluZ3MgPyBzZXR0aW5ncyA6ICQuYWpheFNldHRpbmdzICkucG9ydDtcblx0XHRpZiAoIG1vZGUgPT09IFwiYWJvcnRcIiApIHtcblx0XHRcdGlmICggcGVuZGluZ1JlcXVlc3RzWyBwb3J0IF0gKSB7XG5cdFx0XHRcdHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdLmFib3J0KCk7XG5cdFx0XHR9XG5cdFx0XHRwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXSA9IGFqYXguYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0cmV0dXJuIHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdO1xuXHRcdH1cblx0XHRyZXR1cm4gYWpheC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdH07XG59XG5cclxufSkpO1xyXG4iLCIvKmpzaGludCBicm93c2VyOnRydWUgKi9cbi8qIVxuKiBGaXRWaWRzIDEuMVxuKlxuKiBDb3B5cmlnaHQgMjAxMywgQ2hyaXMgQ295aWVyIC0gaHR0cDovL2Nzcy10cmlja3MuY29tICsgRGF2ZSBSdXBlcnQgLSBodHRwOi8vZGF2ZXJ1cGVydC5jb21cbiogQ3JlZGl0IHRvIFRoaWVycnkgS29ibGVudHogLSBodHRwOi8vd3d3LmFsaXN0YXBhcnQuY29tL2FydGljbGVzL2NyZWF0aW5nLWludHJpbnNpYy1yYXRpb3MtZm9yLXZpZGVvL1xuKiBSZWxlYXNlZCB1bmRlciB0aGUgV1RGUEwgbGljZW5zZSAtIGh0dHA6Ly9zYW0uem95Lm9yZy93dGZwbC9cbipcbiovXG5cbjsoZnVuY3Rpb24oICQgKXtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgJC5mbi5maXRWaWRzID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG4gICAgdmFyIHNldHRpbmdzID0ge1xuICAgICAgY3VzdG9tU2VsZWN0b3I6IG51bGwsXG4gICAgICBpZ25vcmU6IG51bGxcbiAgICB9O1xuXG4gICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXQtdmlkcy1zdHlsZScpKSB7XG4gICAgICAvLyBhcHBlbmRTdHlsZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS90b2RkbW90dG8vZmx1aWR2aWRzL2Jsb2IvbWFzdGVyL2Rpc3QvZmx1aWR2aWRzLmpzXG4gICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgIHZhciBjc3MgPSAnLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXJ7d2lkdGg6MTAwJTtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjA7fS5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIGlmcmFtZSwuZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlciBvYmplY3QsLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXIgZW1iZWQge3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO30nO1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gJzxwPng8L3A+PHN0eWxlIGlkPVwiZml0LXZpZHMtc3R5bGVcIj4nICsgY3NzICsgJzwvc3R5bGU+JztcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoZGl2LmNoaWxkTm9kZXNbMV0pO1xuICAgIH1cblxuICAgIGlmICggb3B0aW9ucyApIHtcbiAgICAgICQuZXh0ZW5kKCBzZXR0aW5ncywgb3B0aW9ucyApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciBzZWxlY3RvcnMgPSBbXG4gICAgICAgICdpZnJhbWVbc3JjKj1cInBsYXllci52aW1lby5jb21cIl0nLFxuICAgICAgICAnaWZyYW1lW3NyYyo9XCJ5b3V0dWJlLmNvbVwiXScsXG4gICAgICAgICdpZnJhbWVbc3JjKj1cInlvdXR1YmUtbm9jb29raWUuY29tXCJdJyxcbiAgICAgICAgJ2lmcmFtZVtzcmMqPVwia2lja3N0YXJ0ZXIuY29tXCJdW3NyYyo9XCJ2aWRlby5odG1sXCJdJyxcbiAgICAgICAgJ29iamVjdCcsXG4gICAgICAgICdlbWJlZCdcbiAgICAgIF07XG5cbiAgICAgIGlmIChzZXR0aW5ncy5jdXN0b21TZWxlY3Rvcikge1xuICAgICAgICBzZWxlY3RvcnMucHVzaChzZXR0aW5ncy5jdXN0b21TZWxlY3Rvcik7XG4gICAgICB9XG5cbiAgICAgIHZhciBpZ25vcmVMaXN0ID0gJy5maXR2aWRzaWdub3JlJztcblxuICAgICAgaWYoc2V0dGluZ3MuaWdub3JlKSB7XG4gICAgICAgIGlnbm9yZUxpc3QgPSBpZ25vcmVMaXN0ICsgJywgJyArIHNldHRpbmdzLmlnbm9yZTtcbiAgICAgIH1cblxuICAgICAgdmFyICRhbGxWaWRlb3MgPSAkKHRoaXMpLmZpbmQoc2VsZWN0b3JzLmpvaW4oJywnKSk7XG4gICAgICAkYWxsVmlkZW9zID0gJGFsbFZpZGVvcy5ub3QoJ29iamVjdCBvYmplY3QnKTsgLy8gU3dmT2JqIGNvbmZsaWN0IHBhdGNoXG4gICAgICAkYWxsVmlkZW9zID0gJGFsbFZpZGVvcy5ub3QoaWdub3JlTGlzdCk7IC8vIERpc2FibGUgRml0VmlkcyBvbiB0aGlzIHZpZGVvLlxuXG4gICAgICAkYWxsVmlkZW9zLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgaWYoJHRoaXMucGFyZW50cyhpZ25vcmVMaXN0KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuOyAvLyBEaXNhYmxlIEZpdFZpZHMgb24gdGhpcyB2aWRlby5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdlbWJlZCcgJiYgJHRoaXMucGFyZW50KCdvYmplY3QnKS5sZW5ndGggfHwgJHRoaXMucGFyZW50KCcuZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlcicpLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKCghJHRoaXMuY3NzKCdoZWlnaHQnKSAmJiAhJHRoaXMuY3NzKCd3aWR0aCcpKSAmJiAoaXNOYU4oJHRoaXMuYXR0cignaGVpZ2h0JykpIHx8IGlzTmFOKCR0aGlzLmF0dHIoJ3dpZHRoJykpKSlcbiAgICAgICAge1xuICAgICAgICAgICR0aGlzLmF0dHIoJ2hlaWdodCcsIDkpO1xuICAgICAgICAgICR0aGlzLmF0dHIoJ3dpZHRoJywgMTYpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoZWlnaHQgPSAoIHRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnb2JqZWN0JyB8fCAoJHRoaXMuYXR0cignaGVpZ2h0JykgJiYgIWlzTmFOKHBhcnNlSW50KCR0aGlzLmF0dHIoJ2hlaWdodCcpLCAxMCkpKSApID8gcGFyc2VJbnQoJHRoaXMuYXR0cignaGVpZ2h0JyksIDEwKSA6ICR0aGlzLmhlaWdodCgpLFxuICAgICAgICAgICAgd2lkdGggPSAhaXNOYU4ocGFyc2VJbnQoJHRoaXMuYXR0cignd2lkdGgnKSwgMTApKSA/IHBhcnNlSW50KCR0aGlzLmF0dHIoJ3dpZHRoJyksIDEwKSA6ICR0aGlzLndpZHRoKCksXG4gICAgICAgICAgICBhc3BlY3RSYXRpbyA9IGhlaWdodCAvIHdpZHRoO1xuICAgICAgICBpZighJHRoaXMuYXR0cignbmFtZScpKXtcbiAgICAgICAgICB2YXIgdmlkZW9OYW1lID0gJ2ZpdHZpZCcgKyAkLmZuLmZpdFZpZHMuX2NvdW50O1xuICAgICAgICAgICR0aGlzLmF0dHIoJ25hbWUnLCB2aWRlb05hbWUpO1xuICAgICAgICAgICQuZm4uZml0Vmlkcy5fY291bnQrKztcbiAgICAgICAgfVxuICAgICAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwiZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlclwiPjwvZGl2PicpLnBhcmVudCgnLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXInKS5jc3MoJ3BhZGRpbmctdG9wJywgKGFzcGVjdFJhdGlvICogMTAwKSsnJScpO1xuICAgICAgICAkdGhpcy5yZW1vdmVBdHRyKCdoZWlnaHQnKS5yZW1vdmVBdHRyKCd3aWR0aCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gSW50ZXJuYWwgY291bnRlciBmb3IgdW5pcXVlIHZpZGVvIG5hbWVzLlxuICAkLmZuLmZpdFZpZHMuX2NvdW50ID0gMDtcbn0pKCBqUXVlcnkgKTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICQud2lkZ2V0KFwidWkuY2hlY2tMaXN0XCIsIHtcclxuICAgIG9wdGlvbnM6IHtcclxuICAgICAgbGlzdEl0ZW1zIDogW10sXHJcbiAgICAgIHNlbGVjdGVkSXRlbXM6IFtdLFxyXG4gICAgICBlZmZlY3Q6ICdibGluaycsXHJcbiAgICAgIG9uQ2hhbmdlOiB7fSxcclxuICAgICAgb2JqTGlzdDogJycsXHJcbiAgICAgIGljb3VudDogMCxcclxuICAgIH0sXHJcblxyXG4gICAgX2NyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcywgbyA9IHNlbGYub3B0aW9ucywgZWwgPSBzZWxmLmVsZW1lbnQ7XHJcbiAgICAgIHZhciBwbGFjZWhvbGRlciA9IFwiU2VhcmNoIExpc3RcIjtcclxuXHJcbiAgICAgIC8vIGdlbmVyYXRlIG91dGVyIGRpdlxyXG4gICAgICB2YXIgY29udGFpbmVyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3NlYXJjaC1saXN0Jyk7XHJcblxyXG4gICAgICAvLyBnZW5lcmF0ZSB0b29sYmFyXHJcbiAgICAgIHZhciB0b29sYmFyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3Rvb2xiYXInKTtcclxuXHJcbiAgICAgIHZhciB0eHRmaWx0ZXIgPSAkKCc8aW5wdXQvPicpLmF0dHIoe3R5cGU6J3RleHQnLCBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXJ9KS5hZGRDbGFzcygndHh0RmlsdGVyJykua2V5dXAoZnVuY3Rpb24oKXtcclxuICAgICAgICBzZWxmLl9maWx0ZXIoJCh0aGlzKS52YWwoKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdG9vbGJhci5hcHBlbmQoJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ2ZpbHRlcmJveCcpLmFwcGVuZCh0eHRmaWx0ZXIpKTtcclxuXHJcbiAgICAgIC8vIGdlbmVyYXRlIGxpc3QgdGFibGUgb2JqZWN0XHJcbiAgICAgIG8ub2JqTGlzdCA9ICQoJzx1bCByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsbGVkYnk9XCJjaGVja2JveEdyb3VwMVwiLz4nKS5hZGRDbGFzcygnYW1hX19saXN0IGZpbHRlcicpO1xyXG5cclxuICAgICAgY29udGFpbmVyLmFwcGVuZCh0b29sYmFyKTtcclxuICAgICAgY29udGFpbmVyLmFwcGVuZChvLm9iakxpc3QpO1xyXG4gICAgICBlbC5hcHBlbmQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgIHNlbGYubG9hZExpc3QoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2FkZEl0ZW06IGZ1bmN0aW9uKGxpc3RJdGVtKXtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLCBvID0gc2VsZi5vcHRpb25zLCBlbCA9IHNlbGYuZWxlbWVudDtcclxuXHJcbiAgICAgIHZhciBpdGVtSWQgPSAnaXRtJyArIChvLmljb3VudCsrKTtcdC8vIGdlbmVyYXRlIGl0ZW0gaWRcclxuICAgICAgdmFyIGl0bSA9ICQoJzxsaSByb2xlPVwibWVudWl0ZW1cIiAvPicpO1xyXG4gICAgICB2YXIgY2hrID0gJCgnPGlucHV0IHJvbGU9XCJjaGVja2JveFwiIC8+JykuYXR0cigndHlwZScsJ2NoZWNrYm94JykuYXR0cignaWQnLGl0ZW1JZClcclxuICAgICAgICAuYWRkQ2xhc3MoJ2NoaycpXHJcbiAgICAgICAgLmF0dHIoJ2RhdGEtdGV4dCcsbGlzdEl0ZW0udGV4dClcclxuICAgICAgICAuYXR0cignZGF0YS12YWx1ZScsbGlzdEl0ZW0udmFsdWUpO1xyXG4gICAgICB2YXIgbGFiZWwgPSAkKCc8bGFiZWwgLz4nKS5hdHRyKCdmb3InLGl0ZW1JZCkudGV4dChsaXN0SXRlbS50ZXh0KTtcclxuXHJcbiAgICAgIGl0bS5hcHBlbmQoY2hrLCBsYWJlbCk7XHJcbiAgICAgIG8ub2JqTGlzdC5hcHBlbmQoaXRtKTtcclxuXHJcbiAgICAgIC8vIGJpbmQgc2VsZWN0aW9uLWNoYW5nZVxyXG4gICAgICBlbC5kZWxlZ2F0ZSgnLmNoaycsJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBzZWxmLl9zZWxDaGFuZ2UoKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBsb2FkTGlzdDogZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLCBvID0gc2VsZi5vcHRpb25zLCBlbCA9IHNlbGYuZWxlbWVudDtcclxuXHJcbiAgICAgIG8ub2JqTGlzdC5lbXB0eSgpLmhpZGUoKTtcclxuXHJcbiAgICAgICQuZWFjaChvLmxpc3RJdGVtcyxmdW5jdGlvbigpe1xyXG4gICAgICAgIHNlbGYuX2FkZEl0ZW0odGhpcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc2VsQ2hhbmdlOiBmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsIG8gPSBzZWxmLm9wdGlvbnMsIGVsID0gc2VsZi5lbGVtZW50O1xyXG5cclxuICAgICAgLy8gZW1wdHkgc2VsZWN0aW9uXHJcbiAgICAgIG8uc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG5cclxuICAgICAgLy8gc2NhbiBlbGVtZW50cywgZmluZCBjaGVja2VkIG9uZXNcclxuICAgICAgby5vYmpMaXN0LmZpbmQoJy5jaGsnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIGlmKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKXtcclxuICAgICAgICAgIG8uc2VsZWN0ZWRJdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgdGV4dDogJCh0aGlzKS5hdHRyKCdkYXRhLXRleHQnKSxcclxuICAgICAgICAgICAgdmFsdWU6ICQodGhpcykuYXR0cignZGF0YS12YWx1ZScpXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdoaWdobGlnaHQnKS5zaWJsaW5ncygpLmFkZENsYXNzKCdoaWdobGlnaHQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlnaGxpZ2h0Jykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnaGlnaGxpZ2h0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGZpcmUgb25DaGFuZ2UgZXZlbnRcclxuICAgICAgby5vbkNoYW5nZS5jYWxsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9maWx0ZXI6IGZ1bmN0aW9uKGZpbHRlcil7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcywgbyA9IHNlbGYub3B0aW9ucztcclxuXHJcbiAgICAgIG8ub2JqTGlzdC5maW5kKCcuY2hrJykuZWFjaChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBpZigkKHRoaXMpLmF0dHIoJ2RhdGEtdGV4dCcpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudG9Mb3dlckNhc2UoKSkgPiAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnNob3coKTtcclxuICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XHJcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgZ2V0U2VsZWN0aW9uOiBmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbyA9IHNlbGYub3B0aW9uc1xyXG4gICAgICByZXR1cm4gby5zZWxlY3RlZEl0ZW1zO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXREYXRhOiBmdW5jdGlvbihkYXRhTW9kZWwpe1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgbyA9IHNlbGYub3B0aW9uc1xyXG4gICAgICBvLmxpc3RJdGVtcyA9IGRhdGFNb2RlbDtcclxuICAgICAgc2VsZi5sb2FkTGlzdCgpO1xyXG4gICAgICBzZWxmLl9zZWxDaGFuZ2UoKTtcclxuICAgIH1cclxuICB9KTtcclxufSkoJCk7XHJcbiIsIi8qXG4qXHRqUXVlcnlVSS5BY2NvcmRpb24uTXVsdGlwbGUsIHYxLjAuMVxuKlx0KGMpIDIwMTTigJMyMDE3IEFydHlvbSBcIlNsZWVwd2Fsa2VyXCIgRmVkb3NvdiA8bWFpbEBhc2xlZXB3YWxrZXIucnU+XG4qXHRodHRwczovL2dpdGh1Yi5jb20vYXNsZWVwd2Fsa2VyL2pxdWVyeS11aS50YWJzLm5laWdoYm9ycy5qc1xuKi9cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyb290LCBqUXVlcnkpIHtcblx0XHRcdGlmIChqUXVlcnkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRqUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRqUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKShyb290KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZmFjdG9yeShqUXVlcnkpO1xuXHRcdFx0cmV0dXJuIGpRdWVyeTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGZhY3RvcnkoalF1ZXJ5KTtcblx0fVxufShmdW5jdGlvbiAoJCkge1xuXG5cdHZhciBvcmlnaW5hbFRvZ2dsZSA9ICQudWkuYWNjb3JkaW9uLnByb3RvdHlwZS5fdG9nZ2xlO1xuXG5cdCQuZXh0ZW5kKCQudWkuYWNjb3JkaW9uLnByb3RvdHlwZSwge1xuXHRcdG11bHRpcGxlOiBmYWxzZSxcblx0XHRfdG9nZ2xlOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5tdWx0aXBsZSAmJiBkYXRhLm5ld1BhbmVsLmxlbmd0aCkge1xuXHRcdFx0XHRkYXRhLm9sZFBhbmVsID0gZGF0YS5vbGRIZWFkZXIgPSB0aGlzLnByZXZTaG93ID0gJCgnJyk7XG5cblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5jb2xsYXBzaWJsZSAmJiBkYXRhLm5ld1BhbmVsLmlzKCc6dmlzaWJsZScpKSB7XG5cdFx0XHRcdFx0ZGF0YS5vbGRQYW5lbCA9IGRhdGEubmV3UGFuZWw7XG5cdFx0XHRcdFx0ZGF0YS5uZXdQYW5lbCA9ICQoJycpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvcmlnaW5hbFRvZ2dsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0fSk7XG5cbn0pKTtcbiIsIi8qPT09PT09IGpRdWVyeSBVSSBhY2NvcmRpb24gPT09PT09Ki9cblxuKGZ1bmN0aW9uKCQpIHtcbiAgICAkKCBcIi5hbWFfX2FjY29yZGlvblwiICkuYWNjb3JkaW9uKHtcbiAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiLFxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZVxuICAgIH0pO1xufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbigkKSB7XG4gICQoJy5hbWFfX3N1YmNhdGVnb3J5LWZlYXR1cmVkLWNvbnRlbnQtYXMtY2Fyb3VzZWwgLmFtYV9fY2F0ZWdvcnktcGFnZS1hcnRpY2xlLXN0dWJfX2NvbnRhaW5lcicpLnNsaWNrKHtcbiAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgc2xpZGVzVG9TY3JvbGw6IDIsXG4gICAgaW5maW5pdGU6IGZhbHNlLFxuICAgIGRvdHM6IHRydWUsXG4gICAgYXJyb3dzOiB0cnVlLFxuICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDIsXG4gICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgZG90czogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA3MDAsXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAyLFxuICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA0ODAsXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBZb3UgY2FuIHVuc2xpY2sgYXQgYSBnaXZlbiBicmVha3BvaW50IG5vdyBieSBhZGRpbmc6XG4gICAgICAvLyBzZXR0aW5nczogXCJ1bnNsaWNrXCJcbiAgICAgIC8vIGluc3RlYWQgb2YgYSBzZXR0aW5ncyBvYmplY3RcbiAgICBdXG4gIH0pO1xufSkoalF1ZXJ5KTtcbiIsIiQoJy5hbWFfX2Rpc3BsYXktc3dpdGNoJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgJCgnLmFtYV9fZGlzcGxheS1zd2l0Y2gtLWFjdGl2ZScpLnRvZ2dsZUNsYXNzKCdhbWFfX2Rpc3BsYXktc3dpdGNoLS1hY3RpdmUnKTtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcygnYW1hX19kaXNwbGF5LXN3aXRjaC0tYWN0aXZlJyk7XG59KTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEZvcm0gZmllbGRzIG1hc2tpbmdcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmZvcm1JdGVtcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAkKCcubXVsdGlzZWxlY3QnKS5tdWx0aXNlbGVjdCgpO1xuXG4gICAgICAgICAgJCgnLmFtYV9fdG9vbHRpcCcpLnRvb2x0aXAoe1xuICAgICAgICAgICAgdG9vbHRpcENsYXNzOiBcImFtYV9fdG9vbHRpcC1idWJibGVcIlxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gY291bnRfcmVtYWluaW5nX2NoYXJhY3RlcigpIHtcbiAgICAgICAgICAgIHZhciBtYXhfbGVuZ3RoID0gMTUwO1xuICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9lbnRlcmVkID0gJCgnLnRleHRhcmVhJykudmFsKCkubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9yZW1haW5pbmcgPSBtYXhfbGVuZ3RoIC0gY2hhcmFjdGVyX2VudGVyZWQ7XG4gICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuaHRtbChjaGFyYWN0ZXJfcmVtYWluaW5nKTtcbiAgICAgICAgICAgIGlmIChtYXhfbGVuZ3RoIDwgY2hhcmFjdGVyX2VudGVyZWQpIHtcbiAgICAgICAgICAgICAgJCgnLnRleHRhcmVhJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlclxuXG4gICAgICAgICAgdmFyIGF2YWlsYWJsZVRhZ3MgPSBbXG4gICAgICAgICAgICBcIkFsYWJhbWFcIixcbiAgICAgICAgICAgIFwiQWxhc2thXCIsXG4gICAgICAgICAgICBcIkFtZXJpY2FuIFNhbW9hXCIsXG4gICAgICAgICAgICBcIkFyaXpvbmFcIixcbiAgICAgICAgICAgIFwiQXJrYW5zYXNcIixcbiAgICAgICAgICAgIFwiQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgICAgXCJDb2xvcmFkb1wiLFxuICAgICAgICAgICAgXCJDb25uZWN0aWN1dFwiLFxuICAgICAgICAgICAgXCJEZWxhd2FyZVwiLFxuICAgICAgICAgICAgXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxuICAgICAgICAgICAgXCJGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWFcIixcbiAgICAgICAgICAgIFwiRmxvcmlkYVwiLFxuICAgICAgICAgICAgXCJHZW9yZ2lhXCIsXG4gICAgICAgICAgICBcIkd1YW1cIixcbiAgICAgICAgICAgIFwiSGF3YWlpXCIsXG4gICAgICAgICAgICBcIklkYWhvXCIsXG4gICAgICAgICAgICBcIklsbGlub2lzXCIsXG4gICAgICAgICAgICBcIkluZGlhbmFcIixcbiAgICAgICAgICAgIFwiSW93YVwiLFxuICAgICAgICAgICAgXCJLYW5zYXNcIixcbiAgICAgICAgICAgIFwiS2VudHVja3lcIixcbiAgICAgICAgICAgIFwiTG91aXNpYW5hXCIsXG4gICAgICAgICAgICBcIk1haW5lXCIsXG4gICAgICAgICAgICBcIk1hcnNoYWxsIElzbGFuZHNcIixcbiAgICAgICAgICAgIFwiTWFyeWxhbmRcIixcbiAgICAgICAgICAgIFwiTWFzc2FjaHVzZXR0c1wiLFxuICAgICAgICAgICAgXCJNaWNoaWdhblwiLFxuICAgICAgICAgICAgXCJNaW5uZXNvdGFcIixcbiAgICAgICAgICAgIFwiTWlzc2lzc2lwcGlcIixcbiAgICAgICAgICAgIFwiTWlzc291cmlcIixcbiAgICAgICAgICAgIFwiTW9udGFuYVwiLFxuICAgICAgICAgICAgXCJOZWJyYXNrYVwiLFxuICAgICAgICAgICAgXCJOZXZhZGFcIixcbiAgICAgICAgICAgIFwiTmV3IEhhbXBzaGlyZVwiLFxuICAgICAgICAgICAgXCJOZXcgSmVyc2V5XCIsXG4gICAgICAgICAgICBcIk5ldyBNZXhpY29cIixcbiAgICAgICAgICAgIFwiTmV3IFlvcmtcIixcbiAgICAgICAgICAgIFwiTm9ydGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICAgIFwiTm9ydGggRGFrb3RhXCIsXG4gICAgICAgICAgICBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuICAgICAgICAgICAgXCJPaGlvXCIsXG4gICAgICAgICAgICBcIk9rbGFob21hXCIsXG4gICAgICAgICAgICBcIk9yZWdvblwiLFxuICAgICAgICAgICAgXCJQYWxhdVwiLFxuICAgICAgICAgICAgXCJQZW5uc3lsdmFuaWFcIixcbiAgICAgICAgICAgIFwiUHVlcnRvIFJpY29cIixcbiAgICAgICAgICAgIFwiUmhvZGUgSXNsYW5kXCIsXG4gICAgICAgICAgICBcIlNvdXRoIENhcm9saW5hXCIsXG4gICAgICAgICAgICBcIlNvdXRoIERha290YVwiLFxuICAgICAgICAgICAgXCJUZW5uZXNzZWVcIixcbiAgICAgICAgICAgIFwiVGV4YXNcIixcbiAgICAgICAgICAgIFwiVXRhaFwiLFxuICAgICAgICAgICAgXCJWZXJtb250XCIsXG4gICAgICAgICAgICBcIlZpcmdpbiBJc2xhbmRzXCIsXG4gICAgICAgICAgICBcIlZpcmdpbmlhXCIsXG4gICAgICAgICAgICBcIldhc2hpbmd0b25cIixcbiAgICAgICAgICAgIFwiV2VzdCBWaXJnaW5pYVwiLFxuICAgICAgICAgICAgXCJXaXNjb25zaW5cIixcbiAgICAgICAgICAgIFwiV3lvbWluZ1wiXG4gICAgICAgICAgXTtcblxuICAgICAgICAgICQoIFwiI3NlYXJjaF9maWx0ZXJcIiApLmF1dG9jb21wbGV0ZSh7XG4gICAgICAgICAgICBzb3VyY2U6IGF2YWlsYWJsZVRhZ3NcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQudWkuYXV0b2NvbXBsZXRlLnByb3RvdHlwZS5fcmVzaXplTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB1bCA9IHRoaXMubWVudS5lbGVtZW50O1xuICAgICAgICAgICAgdWwub3V0ZXJXaWR0aCh0aGlzLmVsZW1lbnQub3V0ZXJXaWR0aCgpKTtcbiAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAvLyBTdGFydCBzZWFyY2ggZmlsdGVyIHdpdGggY2hlY2tib3hlc1xuXG4gICAgICAgICAgdmFyIGRhdGFNb2RlbCA9IFtcbiAgICAgICAgICAgIHt0ZXh0OiAnQWxhYmFtYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdBbGFza2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQW1lcmljYW4gU2Ftb2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQXJpem9uYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdBcmthbnNhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdDYWxpZm9ybmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0NvbG9yYWRvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0Nvbm5lY3RpY3V0JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0RlbGF3YXJlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdGbG9yaWRhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0dlb3JnaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnR3VhbScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdIYXdhaWknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSWRhaG8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSWxsaW5vaXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSW5kaWFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdJb3dhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0thbnNhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdLZW50dWNreScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdMb3Vpc2lhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFpbmUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFyc2hhbGwgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNYXJ5bGFuZCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNYXNzYWNodXNldHRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01pY2hpZ2FuJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01pbm5lc290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaXNzaXNzaXBwaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaXNzb3VyaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNb250YW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05lYnJhc2thJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldmFkYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXcgSGFtcHNoaXJlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldyBKZXJzZXknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV3IE1leGljbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXcgWW9yaycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBDYXJvbGluYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBEYWtvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ09oaW8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnT2tsYWhvbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnT3JlZ29uJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1BhbGF1JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1Blbm5zeWx2YW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdQdWVydG8gUmljbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdSaG9kZSBJc2xhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnU291dGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnU291dGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1Rlbm5lc3NlZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdUZXhhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdVdGFoJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1Zlcm1vbnQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnV2FzaGluZ3RvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdXZXN0IFZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1dpc2NvbnNpbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdXeW9taW5nJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJycsIHZhbHVlOiAnJ31cbiAgICAgICAgICBdO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2VsQ2hhbmdlKCl7XG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gJCgnI215Q2hlY2tMaXN0JykuY2hlY2tMaXN0KCdnZXRTZWxlY3Rpb24nKTtcblxuICAgICAgICAgICAgJCgnI3NlbGVjdGVkSXRlbXMnKS50ZXh0KEpTT04uc3RyaW5naWZ5KHNlbGVjdGlvbikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQoJyNmaWx0ZXJMaXN0JykuY2hlY2tMaXN0KHtcbiAgICAgICAgICAgIGxpc3RJdGVtczogZGF0YU1vZGVsLFxuICAgICAgICAgICAgb25DaGFuZ2U6IHNlbENoYW5nZVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJCgnW3R5cGU9Y2hlY2tib3hdJykuY2hlY2tib3hyYWRpbygpO1xuICAgICAgICAgICQoJ1t0eXBlPXJhZGlvXScpLmNoZWNrYm94cmFkaW8oKS5idXR0b25zZXQoKS5maW5kKCdsYWJlbCcpLmNzcygnd2lkdGgnLCAnMTkuNCUnKTtcbiAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0Jykuc2VsZWN0bWVudSgpO1xuXG5cbiAgICAgICAgICAkKCcudGV4dGFyZWEnKS5rZXl1cChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFJhbmdlIEZpZWxkXG4gICAgICAgICAgdmFyIGxlZ2VuZCA9ICQoJy5hbWFfX3JhbmdlLWZpZWxkX19sZWdlbmQnKTtcbiAgICAgICAgICB2YXIgaGFuZGxlID0gJCggXCIjY3VycmVudFZhbHVlXCIgKTtcblxuICAgICAgICAgICQoXCIuYW1hX19yYW5nZS1maWVsZFwiKS5zbGlkZXIoe1xuICAgICAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHJhbmdlOiAnbWluJyxcbiAgICAgICAgICAgIHZhbHVlOiAxLFxuICAgICAgICAgICAgbWluOiAyMDAwLFxuICAgICAgICAgICAgbWF4OiA1MDAwLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGpRdWVyeSh0aGlzKS5maW5kKCcudWktc2xpZGVyLWhhbmRsZScpO1xuICAgICAgICAgICAgICB2YXIgYnViYmxlID0galF1ZXJ5KCc8ZGl2IGNsYXNzPVwiYW1hX19yYW5nZS1maWVsZF9fdmFsdWVib3hcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgaGFuZGxlLmFwcGVuZChidWJibGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldnQsIHVpKSB7XG4gICAgICAgICAgICAgIHVpLmhhbmRsZS5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCA9ICckJyArIHVpLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmFwcGVuZChsZWdlbmQpO1xuXG4gICAgICAgICAgLy8gRm9ybSBhY2NvcmRpb25cbiAgICAgICAgICAkKCBcIi50YWJsaXN0XCIgKS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgaGVhZGVyOiBcIi5hbWFfX2Zvcm0tc3RlcHNfX3N0ZXBcIixcbiAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIlxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gRXhwYW5kIGxpc3RcbiAgICAgICAgICAkKCBcIi5hbWFfX2V4cGFuZC1saXN0XCIgKS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgbXVsdGlwbGU6IHRydWUsXG4gICAgICAgICAgICBpY29uczogZmFsc2UsXG4gICAgICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCIsXG4gICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBhbmltYXRlOiA1MDAsXG4gICAgICAgICAgICBhY3RpdmF0ZSA6IGZ1bmN0aW9uIChldmVudCwgdWkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlmKCQodWkubmV3UGFuZWwpLmhhc0NsYXNzKCd1aS1hY2NvcmRpb24tY29udGVudC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQodWkubmV3UGFuZWwpLnByZXYoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh1aS5vbGRQYW5lbCkucHJldigpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gQ29sbGFwc2UgYWxsIGFjY29yZGlvbiBwYW5lbHNcbiAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX2NvbGxhcHNlLXBhbmVscyBidXR0b24nKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QgLnVpLWFjY29yZGlvbi1oZWFkZXInKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygndWktc3RhdGUtYWN0aXZlJykgfHwgJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gT3BlbiBhY2NvcmRpb24gcGFuZWxzIGZvciBtb2JpbGVcbiAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcuYW1hX19leHBhbmQtbGlzdCwgLmFtYV9fYXBwbGllZC1maWx0ZXJzX190YWdzJykuc2xpZGVEb3duKCk7XG4gICAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX3NlZS1yZXN1bHRzJykuZmFkZUluKCk7XG4gICAgICAgICAgICAkKHRoaXMpLmZhZGVPdXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIENsb3NlIGFjY29yZGlvbiBwYW5lbHNcbiAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX3NlZS1yZXN1bHRzJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0LCAuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3RhZ3MnKS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCh0aGlzKS5mYWRlT3V0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBzZWFyY2ggZmlsdGVyXG4gICAgICAgICAgZnVuY3Rpb24gbGlzdEZpbHRlcihpbnB1dCwgbGlzdCkgeyAvLyBoZWFkZXIgaXMgYW55IGVsZW1lbnQsIGxpc3QgaXMgYW4gdW5vcmRlcmVkIGxpc3RcbiAgICAgICAgICAgIC8vIGN1c3RvbSBjc3MgZXhwcmVzc2lvbiBmb3IgYSBjYXNlLWluc2Vuc2l0aXZlIGNvbnRhaW5zKClcbiAgICAgICAgICAgIGpRdWVyeS5leHByWyc6J10uQ29udGFpbnMgPSBmdW5jdGlvbihhLGksbSl7XG4gICAgICAgICAgICAgIHJldHVybiAoYS50ZXh0Q29udGVudCB8fCBhLmlubmVyVGV4dCB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpLmluZGV4T2YobVszXS50b1VwcGVyQ2FzZSgpKT49MDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICQoaW5wdXQpLmNoYW5nZSggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXIgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICAgIGlmKGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBmaW5kcyBhbGwgbGlua3MgaW4gYSBsaXN0IHRoYXQgY29udGFpbiB0aGUgaW5wdXQsXG4gICAgICAgICAgICAgICAgICAvLyBhbmQgaGlkZSB0aGUgb25lcyBub3QgY29udGFpbmluZyB0aGUgaW5wdXQgd2hpbGUgc2hvd2luZyB0aGUgb25lcyB0aGF0IGRvXG4gICAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJzcGFuOm5vdCg6Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIikpXCIpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcInNwYW46Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIilcIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJsYWJlbFwiKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHNob3cgcmVzdWx0cyBhZnRlciAzIGNoYXJhY3RlcnMgYXJlIGVudGVyZWRcbiAgICAgICAgICAgICAgfSkua2V5dXAoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnZhbHVlLmxlbmd0aCA8IDQgKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoYW5nZSgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0RmlsdGVyKCQoXCIjYW1hX19zZWFyY2hfX2xvY2F0aW9uXCIpLCAkKFwiLmFtYV9fZm9ybS1ncm91cFwiKSk7XG5cbiAgICAgICAgfSk7XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuZm9ybVZhbGlkYXRlID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCcjdGVzdC1mb3JtJykudmFsaWRhdGUoe1xuICAgICAgICAgICAgcnVsZXM6IHtcbiAgICAgICAgICAgICAgdGV4dGZpZWxkOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgIGRvYjogXCJyZXF1aXJlZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgdGV4dGZpZWxkOiBcIlRoaXMgZmllbGQgaXMgcmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgZG9iOiBcIkRhdGUgb2YgYmlydGggaXMgcmVxdWlyZWRcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogUmVzcG9uc2l2ZSBUYWJsZXMuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucmVzcG9uc2l2ZUdhdGUgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgaWYgKCQoJy5hbWFfX2dhdGUnLCBjb250ZXh0KS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGhlaWdodEdhdGUgPSAkKCcuYW1hX190YWdzJykub2Zmc2V0KCkudG9wIC0gJCgnLmFtYV9fZ2F0ZScpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCgnLmFtYV9fZ2F0ZScsIGNvbnRleHQpLmhlaWdodChoZWlnaHRHYXRlKTtcbiAgICAgICAgJCgnLmFtYV9fZ2F0ZScpLm5leHRVbnRpbCgnLmFtYV9fdGFncycpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJhbWFfX2dhdGVfX2JsdXJyeVwiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogSW5pdGlhbGl6YXRpb24gc2NyaXB0IGZvciBnbG9iYWwgcHJvY2Vzc2VzXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblxuLyoqXG4gKlxuICogSW5pdGlhbGl6ZSBmaXRWaWQgZm9yIFlvdVR1YmUgdmllb3MuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cblxuXHREcnVwYWwuYmVoYXZpb3JzLmZpdHZpZGluaXQgPSB7XG5cdCBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXHRcdFx0KGZ1bmN0aW9uICgkKSB7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCgnLnZpZGVvLWNvbnRhaW5lcicpLmZpdFZpZHMoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KShqUXVlcnkpO1xuXHRcdH1cblx0fTtcblxuXHREcnVwYWwuYmVoYXZpb3JzLmp1bXBNZW51ID0ge1xuXHRcdGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cdFx0XHQkKCcuanMtZHJvcGRvd24tc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gJCh0aGlzKS5maW5kKCc6c2VsZWN0ZWQnKS5kYXRhKCd1cmwnKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogUmliYm9uIG5hdiB1c2VyIGludGVyYWN0aW9ucy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblxuICBEcnVwYWwuYmVoYXZpb3JzLnJpYmJvbm5hdiA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc19hY3RpdmUgPSAnaXMtYWN0aXZlJztcblxuICAgICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duX190cmlnZ2VyJywgdGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgLy8gVW5mb2N1cyBvbiB0aGUgZHJvcGRvd24uXG4gICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyBmb3IgQ1NTLlxuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIHRvIHRoZSBkcm9wZG93biBVTC5cbiAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCkudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bl9fdHJpZ2dlcicsIHRoaXMpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSkuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIiQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zaG93LW1vcmUnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX2xpc3QnKS50b2dnbGVDbGFzcygnYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fbGlzdC0tZXhwYW5kZWQnKTtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcygnYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc2hvdy1tb3JlLS1leHBhbmRlZCcpO1xufSk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBTdWJjYXRlZ29yeVxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnN1YmNhdGVnb3JpZXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICBmdW5jdGlvbiBjaGVja1NpemUoKXtcbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5V3JhcHBlciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzJykub3V0ZXJXaWR0aCgpO1xuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlUaXRsZSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX190aXRsZScpLm91dGVyV2lkdGgoKTtcbiAgICAgICAgc3ViY2F0ZWdvcnkgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc3ViY2F0ZWdvcnknKTtcbiAgICAgICAgc3ViY2F0ZWdvcnkuaGlkZSgpO1xuXG4gICAgICAgIGlmIChzdWJjYXRlZ29yeVdyYXBwZXIgPiAwICYmIHN1YmNhdGVnb3J5V3JhcHBlciA8IDI5MCAmJiBzdWJjYXRlZ29yeVRpdGxlID4gMjAwICkge1xuICAgICAgICAgIHN1YmNhdGVnb3J5LnNsaWNlKDAsIDIpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9IGVsc2UgaWYgKHN1YmNhdGVnb3J5V3JhcHBlciA+IDI5MCAmJiBzdWJjYXRlZ29yeVdyYXBwZXIgPCA2MDAgJiYgc3ViY2F0ZWdvcnlUaXRsZSA+IDIwMCApIHtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5zbGljZSgwLCAzKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfSBlbHNlIGlmICgoc3ViY2F0ZWdvcnlXcmFwcGVyID4gMzAwICYmIHN1YmNhdGVnb3J5V3JhcHBlciA8IDcwMCkgJiYgc3ViY2F0ZWdvcnlUaXRsZSA8IDIwMCkge1xuICAgICAgICAgIHN1YmNhdGVnb3J5LnNsaWNlKDAsIDIpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9IGVsc2UgaWYgKChzdWJjYXRlZ29yeVdyYXBwZXIgPiA3MDAgJiYgc3ViY2F0ZWdvcnlXcmFwcGVyIDwgMTAwMCkgJiYgc3ViY2F0ZWdvcnlUaXRsZSA8IDIwMCkge1xuICAgICAgICAgIHN1YmNhdGVnb3J5LnNsaWNlKDAsIDMpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9IGVsc2UgaWYgKChzdWJjYXRlZ29yeVdyYXBwZXIgPiAxMDAwICYmIHN1YmNhdGVnb3J5V3JhcHBlciA8IDEyMDApICYmIHN1YmNhdGVnb3J5VGl0bGUgPCAyMDApIHtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5zbGljZSgwLCA0KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5zbGljZSgwLCA1KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB2aWV3TW9yZSgpIHtcbiAgICAgICAgJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctbGVzcycpLmhpZGUoKTtcbiAgICAgICAgJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctYWxsJykuc2hvdygpO1xuXG4gICAgICAgICQoJy52aWV3QWxsJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3ViY2F0ZWdvcnkuZmFkZUluKCk7XG4gICAgICAgICAgJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctYWxsJykuaGlkZSgpO1xuICAgICAgICAgICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWxlc3MnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy52aWV3TGVzcycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN1YmNhdGVnb3J5LmhpZGUoKTtcbiAgICAgICAgICBjaGVja1NpemUoKTtcbiAgICAgICAgICAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdmlldy1sZXNzJykuaGlkZSgpO1xuICAgICAgICAgICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWFsbCcpLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJ1biB0ZXN0IG9uIGluaXRpYWwgcGFnZSBsb2FkXG4gICAgICBjaGVja1NpemUoKTtcbiAgICAgIHZpZXdNb3JlKCk7XG5cbiAgICAgIC8vIHJ1biB0ZXN0IG9uIHJlc2l6ZSBvZiB0aGUgd2luZG93XG4gICAgICAkKCB3aW5kb3cgKS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNoZWNrU2l6ZSgpO1xuICAgICAgICB2aWV3TW9yZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogUmVzcG9uc2l2ZSBUYWJsZXMuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucmVzcG9uc2l2ZVRhYmxlcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAkKFwidGhcIiwgY29udGV4dCkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlcSA9ICQodGhpcykuaW5kZXgoKTtcbiAgICAgICAgdmFyIGNoaWxkID0gZXEgKyAxO1xuICAgICAgICB2YXIgbGFiZWwgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgJChcInRkOm50aC1jaGlsZChcIiArIGNoaWxkICsgXCIpXCIpLmFwcGVuZChcIiZuYnNwO1wiKS5hdHRyKFwiZGF0YS10aXRsZVwiLCBsYWJlbCkuYWRkQ2xhc3MoXCJyZXNwb25zaXZlXCIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyo9PT09PT09UmVzb3VyY2UgVGFicz09PT09PT0qL1xuXG4kKCcqW2RhdGEtcmVzb3VyY2VdJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgLy8gRmlndXJlIG91dCB3aGljaCB0YWIgdG8gZGlzcGxheS5cbiAgJHRhYiA9IGZpbmRUYWIoJCh0aGlzKSk7XG4gIC8vIFNob3cgdGhlIHRhYi5cbiAgc2hvd1RhYigkdGFiKTtcbn0pO1xuXG4vLyBmdW5jdGlvbiBzaG93VGFiKCkgLSBzaG93cyBhbmQgaGlkZXMgdGhlIHRhYi5cbmZ1bmN0aW9uIHNob3dUYWIoJHRhYikge1xuICAkKCcuLS1pcy1hY3RpdmUnKS5yZW1vdmVDbGFzcygnLS1pcy1hY3RpdmUnKTtcbiAgLy8gU2hvdyB0aGUgc2VjdGlvbi5cbiAgJCgnLmFtYV9fcmVzb3VyY2UtdGFic19fY29udGVudCBzZWN0aW9uIycgKyAkdGFiLmF0dHIoJ2lkJykpLmFkZENsYXNzKCctLWlzLWFjdGl2ZScpO1xuICAvLyBQdXQgYW4gYWN0aXZlIHN0YXRlIG9uIHRoZSB0YWIuXG4gICQoJy5hbWFfX3Jlc291cmNlLXRhYnNfX25hdiBsaVtkYXRhLXJlc291cmNlPVwiJyArICR0YWIuYXR0cignaWQnKSArICdcIl0nKS5hZGRDbGFzcygnLS1pcy1hY3RpdmUnKTtcbn1cblxuLy8gZnVuY3Rpb24gZmluZFRhYigpIC0gcmV0dXJuIG9iamVjdCB0aGF0IGlzIHRoZSBzZWN0aW9uIHRvIGJlIGRpc3BsYXllZC5cbmZ1bmN0aW9uIGZpbmRUYWIoJG9iaikge1xuICAvLyBHZXQgdGhlIElEIGZvciB0aGUgc2VjdGlvbiB0byBkaXNwbGF5LlxuICB2YXIgcmVzb3VyY2VEYXRhID1fZ2V0U2VjdGlvbklEKCRvYmopO1xuICAvLyBGaW5kIG91dCB3aGljaCB0YWIgdGhlIHNlY3Rpb25JRCBjb3JyZXNwb25kcyB0by5cbiAgJCgnLmFtYV9fcmVzb3VyY2UtdGFicyBzZWN0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgYXR0cklEID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgIGlmKGF0dHJJRC5pbmRleE9mKHJlc291cmNlRGF0YVsnc2VjdGlvbklEJ10pID49IDApIHtcbiAgICAgICR0YWIgPSAkKHRoaXMpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiAkdGFiO1xufVxuXG4vLyBmdW5jdGlvbiBfZ2V0U2VjdGlvbklEKCkgLSByZXR1cm4gYXJyYXkgY29udGFpbmluZyB0aGUgc3BlY2lmaWMgcmVzb3VyY2UgdG8gc2hvdyBhbmQgdGhlIHNlY3Rpb24gZWxlbWVudCdzIElEIGF0dHJpYnV0ZS5cbmZ1bmN0aW9uIF9nZXRTZWN0aW9uSUQoJG9iaikge1xuICAvLyBQYXJzZSBvdXQgdGhlIHNlY3Rpb24gSUQgZnJvbSB0aGUgY2xpY2tlZCBvYmplY3QuXG4gIHZhciByZXNvdXJjZURhdGEgPSBbXTtcbiAgcmVzb3VyY2VEYXRhWydyZXNvdXJjZUlEJ10gPSAkb2JqLmF0dHIoJ2RhdGEtcmVzb3VyY2UnKTtcbiAgcmVzb3VyY2VEYXRhWydzZWN0aW9uSUQnXSA9IHJlc291cmNlRGF0YVsncmVzb3VyY2VJRCddXG4gICAgLnN1YnN0cigwLCByZXNvdXJjZURhdGFbJ3Jlc291cmNlSUQnXS5pbmRleE9mKCctJykpO1xuICBpZiAoIXJlc291cmNlRGF0YVsnc2VjdGlvbklEJ10pIHtcbiAgICByZXNvdXJjZURhdGFbJ3NlY3Rpb25JRCddID0gcmVzb3VyY2VEYXRhWydyZXNvdXJjZUlEJ107XG4gIH1cbiAgcmV0dXJuIHJlc291cmNlRGF0YTtcbn1cbi8qPT09PT09IGpRdWVyeSBVSSB0YWJzID09PT09PSovXG5cblxuKGZ1bmN0aW9uKCQpIHtcbiAgICAkKCBcIi5hbWFfX3RhYnNcIiApLnRhYnMoe1xuICAgICAgICBhY3RpdmF0ZTogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gdWkubmV3UGFuZWwuYXR0cignaWQnKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy9TaW11bGF0ZSBjbGljayBldmVudCBvbiBhY3R1YWwgc2ltcGxlVGFicyB0YWIgZnJvbSBtb2JpbGUgZHJvcCBkb3duLlxuICAgICQoJy5hbWFfX3RhYnMtbmF2aWdhdGlvbi0tbW9iaWxlIHNlbGVjdCcpLm9uKCBcInNlbGVjdG1lbnVjaGFuZ2VcIiwgZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSB1aS5pdGVtLnZhbHVlO1xuICAgICAgICAkKCdhW2hyZWY9XCIjJytzZWxlY3RlZFZhbHVlKydcIl0nKS5jbGljaygpO1xuICAgIH0gKTtcbn0pKGpRdWVyeSk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBJbnRlcmFjdGlvbnMgZm9yIHdheWZpbmRlci5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy53YXlmaW5kZXIgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICBpZigkLmNvb2tpZSgnYW1hX3dheWZpbmRlcl9jb29raWUnKSkge1xuICAgICAgICAgICQuY29va2llLmpzb24gPSB0cnVlO1xuICAgICAgICAgIC8vIFJlYWQgd2F5ZmluZGVyIGNvb2tpZXMgc2V0IGZyb20gYW1hLWFzc24gZG9tYWluc1xuICAgICAgICAgIHZhciBhbWFfd2F5ZmluZGVyX2Nvb2tpZSA9ICQuY29va2llKCdhbWFfd2F5ZmluZGVyX2Nvb2tpZScpO1xuICAgICAgICAgIGlmICh0eXBlb2YgYW1hX3dheWZpbmRlcl9jb29raWUgIT09ICd1bmRlZmluZWQnIHx8ICQoJy5yZWZlcnJlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLmZhZGVJbigpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG4gICAgICAgICAgICAkKCcuYW1hX193YXlmaW5kZXItLXJlZmVycmVyIGEnKS5hdHRyKFwiaHJlZlwiLCBhbWFfd2F5ZmluZGVyX2Nvb2tpZVsxXSk7XG4gICAgICAgICAgICAkKCcuYW1hX193YXlmaW5kZXItLXJlZmVycmVyIGEnKS50ZXh0KGFtYV93YXlmaW5kZXJfY29va2llWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmFtYV93YXlmaW5kZXJfcmVmZXJyZXItLWxpbmstYmFjaycpLmZhZGVPdXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyohXG4gKiBqUXVlcnkgQ29va2llIFBsdWdpbiB2MS40LjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXJoYXJ0bC9qcXVlcnktY29va2llXG4gKlxuICogQ29weXJpZ2h0IDIwMTMgS2xhdXMgSGFydGxcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEJyb3dzZXIgZ2xvYmFsc1xuXHRcdGZhY3RvcnkoalF1ZXJ5KTtcblx0fVxufShmdW5jdGlvbiAoJCkge1xuXG5cdHZhciBwbHVzZXMgPSAvXFwrL2c7XG5cblx0ZnVuY3Rpb24gZW5jb2RlKHMpIHtcblx0XHRyZXR1cm4gY29uZmlnLnJhdyA/IHMgOiBlbmNvZGVVUklDb21wb25lbnQocyk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZWNvZGUocykge1xuXHRcdHJldHVybiBjb25maWcucmF3ID8gcyA6IGRlY29kZVVSSUNvbXBvbmVudChzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0cmluZ2lmeUNvb2tpZVZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIGVuY29kZShjb25maWcuanNvbiA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IFN0cmluZyh2YWx1ZSkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VDb29raWVWYWx1ZShzKSB7XG5cdFx0aWYgKHMuaW5kZXhPZignXCInKSA9PT0gMCkge1xuXHRcdFx0Ly8gVGhpcyBpcyBhIHF1b3RlZCBjb29raWUgYXMgYWNjb3JkaW5nIHRvIFJGQzIwNjgsIHVuZXNjYXBlLi4uXG5cdFx0XHRzID0gcy5zbGljZSgxLCAtMSkucmVwbGFjZSgvXFxcXFwiL2csICdcIicpLnJlcGxhY2UoL1xcXFxcXFxcL2csICdcXFxcJyk7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIFJlcGxhY2Ugc2VydmVyLXNpZGUgd3JpdHRlbiBwbHVzZXMgd2l0aCBzcGFjZXMuXG5cdFx0XHQvLyBJZiB3ZSBjYW4ndCBkZWNvZGUgdGhlIGNvb2tpZSwgaWdub3JlIGl0LCBpdCdzIHVudXNhYmxlLlxuXHRcdFx0Ly8gSWYgd2UgY2FuJ3QgcGFyc2UgdGhlIGNvb2tpZSwgaWdub3JlIGl0LCBpdCdzIHVudXNhYmxlLlxuXHRcdFx0cyA9IGRlY29kZVVSSUNvbXBvbmVudChzLnJlcGxhY2UocGx1c2VzLCAnICcpKTtcblx0XHRcdHJldHVybiBjb25maWcuanNvbiA/IEpTT04ucGFyc2UocykgOiBzO1xuXHRcdH0gY2F0Y2goZSkge31cblx0fVxuXG5cdGZ1bmN0aW9uIHJlYWQocywgY29udmVydGVyKSB7XG5cdFx0dmFyIHZhbHVlID0gY29uZmlnLnJhdyA/IHMgOiBwYXJzZUNvb2tpZVZhbHVlKHMpO1xuXHRcdHJldHVybiAkLmlzRnVuY3Rpb24oY29udmVydGVyKSA/IGNvbnZlcnRlcih2YWx1ZSkgOiB2YWx1ZTtcblx0fVxuXG5cdHZhciBjb25maWcgPSAkLmNvb2tpZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zKSB7XG5cblx0XHQvLyBXcml0ZVxuXG5cdFx0aWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgISQuaXNGdW5jdGlvbih2YWx1ZSkpIHtcblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgY29uZmlnLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdHZhciBkYXlzID0gb3B0aW9ucy5leHBpcmVzLCB0ID0gb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoKTtcblx0XHRcdFx0dC5zZXRUaW1lKCt0ICsgZGF5cyAqIDg2NGUrNSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0gW1xuXHRcdFx0XHRlbmNvZGUoa2V5KSwgJz0nLCBzdHJpbmdpZnlDb29raWVWYWx1ZSh2YWx1ZSksXG5cdFx0XHRcdG9wdGlvbnMuZXhwaXJlcyA/ICc7IGV4cGlyZXM9JyArIG9wdGlvbnMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJycsIC8vIHVzZSBleHBpcmVzIGF0dHJpYnV0ZSwgbWF4LWFnZSBpcyBub3Qgc3VwcG9ydGVkIGJ5IElFXG5cdFx0XHRcdG9wdGlvbnMucGF0aCAgICA/ICc7IHBhdGg9JyArIG9wdGlvbnMucGF0aCA6ICcnLFxuXHRcdFx0XHRvcHRpb25zLmRvbWFpbiAgPyAnOyBkb21haW49JyArIG9wdGlvbnMuZG9tYWluIDogJycsXG5cdFx0XHRcdG9wdGlvbnMuc2VjdXJlICA/ICc7IHNlY3VyZScgOiAnJ1xuXHRcdFx0XS5qb2luKCcnKSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVhZFxuXG5cdFx0dmFyIHJlc3VsdCA9IGtleSA/IHVuZGVmaW5lZCA6IHt9O1xuXG5cdFx0Ly8gVG8gcHJldmVudCB0aGUgZm9yIGxvb3AgaW4gdGhlIGZpcnN0IHBsYWNlIGFzc2lnbiBhbiBlbXB0eSBhcnJheVxuXHRcdC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLiBBbHNvIHByZXZlbnRzIG9kZCByZXN1bHQgd2hlblxuXHRcdC8vIGNhbGxpbmcgJC5jb29raWUoKS5cblx0XHR2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZSA/IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBjb29raWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0dmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuXHRcdFx0dmFyIG5hbWUgPSBkZWNvZGUocGFydHMuc2hpZnQoKSk7XG5cdFx0XHR2YXIgY29va2llID0gcGFydHMuam9pbignPScpO1xuXG5cdFx0XHRpZiAoa2V5ICYmIGtleSA9PT0gbmFtZSkge1xuXHRcdFx0XHQvLyBJZiBzZWNvbmQgYXJndW1lbnQgKHZhbHVlKSBpcyBhIGZ1bmN0aW9uIGl0J3MgYSBjb252ZXJ0ZXIuLi5cblx0XHRcdFx0cmVzdWx0ID0gcmVhZChjb29raWUsIHZhbHVlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFByZXZlbnQgc3RvcmluZyBhIGNvb2tpZSB0aGF0IHdlIGNvdWxkbid0IGRlY29kZS5cblx0XHRcdGlmICgha2V5ICYmIChjb29raWUgPSByZWFkKGNvb2tpZSkpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmVzdWx0W25hbWVdID0gY29va2llO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0Y29uZmlnLmRlZmF1bHRzID0ge307XG5cblx0JC5yZW1vdmVDb29raWUgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG5cdFx0aWYgKCQuY29va2llKGtleSkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIE11c3Qgbm90IGFsdGVyIG9wdGlvbnMsIHRodXMgZXh0ZW5kaW5nIGEgZnJlc2ggb2JqZWN0Li4uXG5cdFx0JC5jb29raWUoa2V5LCAnJywgJC5leHRlbmQoe30sIG9wdGlvbnMsIHsgZXhwaXJlczogLTEgfSkpO1xuXHRcdHJldHVybiAhJC5jb29raWUoa2V5KTtcblx0fTtcblxufSkpO1xuIl19
