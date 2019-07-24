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

/*
 * SmartMenus jQuery v1.1.0+
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com/
 *
 * Released under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global jQuery
		factory(jQuery);
	}
} (function($) {

	var menuTrees = [],
		mouse = false, // optimize for touch by default - we will detect for mouse input
		touchEvents = 'ontouchstart' in window, // we use this just to choose between toucn and pointer events, not for touch screen detection
		mouseDetectionEnabled = false,
		requestAnimationFrame = window.requestAnimationFrame || function(callback) { return setTimeout(callback, 1000 / 60); },
		cancelAnimationFrame = window.cancelAnimationFrame || function(id) { clearTimeout(id); },
		canAnimate = !!$.fn.animate;

	// Handle detection for mouse input (i.e. desktop browsers, tablets with a mouse, etc.)
	function initMouseDetection(disable) {
		var eNS = '.smartmenus_mouse';
		if (!mouseDetectionEnabled && !disable) {
			// if we get two consecutive mousemoves within 2 pixels from each other and within 300ms, we assume a real mouse/cursor is present
			// in practice, this seems like impossible to trick unintentianally with a real mouse and a pretty safe detection on touch devices (even with older browsers that do not support touch events)
			var firstTime = true,
				lastMove = null,
				events = {
					'mousemove': function(e) {
						var thisMove = { x: e.pageX, y: e.pageY, timeStamp: new Date().getTime() };
						if (lastMove) {
							var deltaX = Math.abs(lastMove.x - thisMove.x),
								deltaY = Math.abs(lastMove.y - thisMove.y);
		 					if ((deltaX > 0 || deltaY > 0) && deltaX <= 2 && deltaY <= 2 && thisMove.timeStamp - lastMove.timeStamp <= 300) {
								mouse = true;
								// if this is the first check after page load, check if we are not over some item by chance and call the mouseenter handler if yes
								if (firstTime) {
									var $a = $(e.target).closest('a');
									if ($a.is('a')) {
										$.each(menuTrees, function() {
											if ($.contains(this.$root[0], $a[0])) {
												this.itemEnter({ currentTarget: $a[0] });
												return false;
											}
										});
									}
									firstTime = false;
								}
							}
						}
						lastMove = thisMove;
					}
				};
			events[touchEvents ? 'touchstart' : 'pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut'] = function(e) {
				if (isTouchEvent(e.originalEvent)) {
					mouse = false;
				}
			};
			$(document).on(getEventsNS(events, eNS));
			mouseDetectionEnabled = true;
		} else if (mouseDetectionEnabled && disable) {
			$(document).off(eNS);
			mouseDetectionEnabled = false;
		}
	}

	function isTouchEvent(e) {
		return !/^(4|mouse)$/.test(e.pointerType);
	}

	// returns a jQuery on() ready object
	function getEventsNS(events, eNS) {
		if (!eNS) {
			eNS = '';
		}
		var eventsNS = {};
		for (var i in events) {
			eventsNS[i.split(' ').join(eNS + ' ') + eNS] = events[i];
		}
		return eventsNS;
	}

	$.SmartMenus = function(elm, options) {
		this.$root = $(elm);
		this.opts = options;
		this.rootId = ''; // internal
		this.accessIdPrefix = '';
		this.$subArrow = null;
		this.activatedItems = []; // stores last activated A's for each level
		this.visibleSubMenus = []; // stores visible sub menus UL's (might be in no particular order)
		this.showTimeout = 0;
		this.hideTimeout = 0;
		this.scrollTimeout = 0;
		this.clickActivated = false;
		this.focusActivated = false;
		this.zIndexInc = 0;
		this.idInc = 0;
		this.$firstLink = null; // we'll use these for some tests
		this.$firstSub = null; // at runtime so we'll cache them
		this.disabled = false;
		this.$disableOverlay = null;
		this.$touchScrollingSub = null;
		this.cssTransforms3d = 'perspective' in elm.style || 'webkitPerspective' in elm.style;
		this.wasCollapsible = false;
		this.init();
	};

	$.extend($.SmartMenus, {
		hideAll: function() {
			$.each(menuTrees, function() {
				this.menuHideAll();
			});
		},
		destroy: function() {
			while (menuTrees.length) {
				menuTrees[0].destroy();
			}
			initMouseDetection(true);
		},
		prototype: {
			init: function(refresh) {
				var self = this;

				if (!refresh) {
					menuTrees.push(this);

					this.rootId = (new Date().getTime() + Math.random() + '').replace(/\D/g, '');
					this.accessIdPrefix = 'sm-' + this.rootId + '-';

					if (this.$root.hasClass('sm-rtl')) {
						this.opts.rightToLeftSubMenus = true;
					}

					// init root (main menu)
					var eNS = '.smartmenus';
					this.$root
						.data('smartmenus', this)
						.attr('data-smartmenus-id', this.rootId)
						.dataSM('level', 1)
						.on(getEventsNS({
							'mouseover focusin': $.proxy(this.rootOver, this),
							'mouseout focusout': $.proxy(this.rootOut, this),
							'keydown': $.proxy(this.rootKeyDown, this)
						}, eNS))
						.on(getEventsNS({
							'mouseenter': $.proxy(this.itemEnter, this),
							'mouseleave': $.proxy(this.itemLeave, this),
							'mousedown': $.proxy(this.itemDown, this),
							'focus': $.proxy(this.itemFocus, this),
							'blur': $.proxy(this.itemBlur, this),
							'click': $.proxy(this.itemClick, this)
						}, eNS), 'a');

					// hide menus on tap or click outside the root UL
					eNS += this.rootId;
					if (this.opts.hideOnClick) {
						$(document).on(getEventsNS({
							'touchstart': $.proxy(this.docTouchStart, this),
							'touchmove': $.proxy(this.docTouchMove, this),
							'touchend': $.proxy(this.docTouchEnd, this),
							// for Opera Mobile < 11.5, webOS browser, etc. we'll check click too
							'click': $.proxy(this.docClick, this)
						}, eNS));
					}
					// hide sub menus on resize
					$(window).on(getEventsNS({ 'resize orientationchange': $.proxy(this.winResize, this) }, eNS));

					if (this.opts.subIndicators) {
						this.$subArrow = $('<span/>').addClass('sub-arrow');
						if (this.opts.subIndicatorsText) {
							this.$subArrow.html(this.opts.subIndicatorsText);
						}
					}

					// make sure mouse detection is enabled
					initMouseDetection();
				}

				// init sub menus
				this.$firstSub = this.$root.find('ul').each(function() { self.menuInit($(this)); }).eq(0);

				this.$firstLink = this.$root.find('a').eq(0);

				// find current item
				if (this.opts.markCurrentItem) {
					var reDefaultDoc = /(index|default)\.[^#\?\/]*/i,
						reHash = /#.*/,
						locHref = window.location.href.replace(reDefaultDoc, ''),
						locHrefNoHash = locHref.replace(reHash, '');
					this.$root.find('a:not(.mega-menu a)').each(function() {
						var href = this.href.replace(reDefaultDoc, ''),
							$this = $(this);
						if (href == locHref || href == locHrefNoHash) {
							$this.addClass('current');
							if (self.opts.markCurrentTree) {
								$this.parentsUntil('[data-smartmenus-id]', 'ul').each(function() {
									$(this).dataSM('parent-a').addClass('current');
								});
							}
						}
					});
				}

				// save initial state
				this.wasCollapsible = this.isCollapsible();
			},
			destroy: function(refresh) {
				if (!refresh) {
					var eNS = '.smartmenus';
					this.$root
						.removeData('smartmenus')
						.removeAttr('data-smartmenus-id')
						.removeDataSM('level')
						.off(eNS);
					eNS += this.rootId;
					$(document).off(eNS);
					$(window).off(eNS);
					if (this.opts.subIndicators) {
						this.$subArrow = null;
					}
				}
				this.menuHideAll();
				var self = this;
				this.$root.find('ul').each(function() {
						var $this = $(this);
						if ($this.dataSM('scroll-arrows')) {
							$this.dataSM('scroll-arrows').remove();
						}
						if ($this.dataSM('shown-before')) {
							if (self.opts.subMenusMinWidth || self.opts.subMenusMaxWidth) {
								$this.css({ width: '', minWidth: '', maxWidth: '' }).removeClass('sm-nowrap');
							}
							if ($this.dataSM('scroll-arrows')) {
								$this.dataSM('scroll-arrows').remove();
							}
							$this.css({ zIndex: '', top: '', left: '', marginLeft: '', marginTop: '', display: '' });
						}
						if (($this.attr('id') || '').indexOf(self.accessIdPrefix) == 0) {
							$this.removeAttr('id');
						}
					})
					.removeDataSM('in-mega')
					.removeDataSM('shown-before')
					.removeDataSM('scroll-arrows')
					.removeDataSM('parent-a')
					.removeDataSM('level')
					.removeDataSM('beforefirstshowfired')
					.removeAttr('role')
					.removeAttr('aria-hidden')
					.removeAttr('aria-labelledby')
					.removeAttr('aria-expanded');
				this.$root.find('a.has-submenu').each(function() {
						var $this = $(this);
						if ($this.attr('id').indexOf(self.accessIdPrefix) == 0) {
							$this.removeAttr('id');
						}
					})
					.removeClass('has-submenu')
					.removeDataSM('sub')
					.removeAttr('aria-haspopup')
					.removeAttr('aria-controls')
					.removeAttr('aria-expanded')
					.closest('li').removeDataSM('sub');
				if (this.opts.subIndicators) {
					this.$root.find('span.sub-arrow').remove();
				}
				if (this.opts.markCurrentItem) {
					this.$root.find('a.current').removeClass('current');
				}
				if (!refresh) {
					this.$root = null;
					this.$firstLink = null;
					this.$firstSub = null;
					if (this.$disableOverlay) {
						this.$disableOverlay.remove();
						this.$disableOverlay = null;
					}
					menuTrees.splice($.inArray(this, menuTrees), 1);
				}
			},
			disable: function(noOverlay) {
				if (!this.disabled) {
					this.menuHideAll();
					// display overlay over the menu to prevent interaction
					if (!noOverlay && !this.opts.isPopup && this.$root.is(':visible')) {
						var pos = this.$root.offset();
						this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>').css({
							position: 'absolute',
							top: pos.top,
							left: pos.left,
							width: this.$root.outerWidth(),
							height: this.$root.outerHeight(),
							zIndex: this.getStartZIndex(true),
							opacity: 0
						}).appendTo(document.body);
					}
					this.disabled = true;
				}
			},
			docClick: function(e) {
				if (this.$touchScrollingSub) {
					this.$touchScrollingSub = null;
					return;
				}
				// hide on any click outside the menu or on a menu link
				if (this.visibleSubMenus.length && !$.contains(this.$root[0], e.target) || $(e.target).closest('a').length) {
					this.menuHideAll();
				}
			},
			docTouchEnd: function(e) {
				if (!this.lastTouch) {
					return;
				}
				if (this.visibleSubMenus.length && (this.lastTouch.x2 === undefined || this.lastTouch.x1 == this.lastTouch.x2) && (this.lastTouch.y2 === undefined || this.lastTouch.y1 == this.lastTouch.y2) && (!this.lastTouch.target || !$.contains(this.$root[0], this.lastTouch.target))) {
					if (this.hideTimeout) {
						clearTimeout(this.hideTimeout);
						this.hideTimeout = 0;
					}
					// hide with a delay to prevent triggering accidental unwanted click on some page element
					var self = this;
					this.hideTimeout = setTimeout(function() { self.menuHideAll(); }, 350);
				}
				this.lastTouch = null;
			},
			docTouchMove: function(e) {
				if (!this.lastTouch) {
					return;
				}
				var touchPoint = e.originalEvent.touches[0];
				this.lastTouch.x2 = touchPoint.pageX;
				this.lastTouch.y2 = touchPoint.pageY;
			},
			docTouchStart: function(e) {
				var touchPoint = e.originalEvent.touches[0];
				this.lastTouch = { x1: touchPoint.pageX, y1: touchPoint.pageY, target: touchPoint.target };
			},
			enable: function() {
				if (this.disabled) {
					if (this.$disableOverlay) {
						this.$disableOverlay.remove();
						this.$disableOverlay = null;
					}
					this.disabled = false;
				}
			},
			getClosestMenu: function(elm) {
				var $closestMenu = $(elm).closest('ul');
				while ($closestMenu.dataSM('in-mega')) {
					$closestMenu = $closestMenu.parent().closest('ul');
				}
				return $closestMenu[0] || null;
			},
			getHeight: function($elm) {
				return this.getOffset($elm, true);
			},
			// returns precise width/height float values
			getOffset: function($elm, height) {
				var old;
				if ($elm.css('display') == 'none') {
					old = { position: $elm[0].style.position, visibility: $elm[0].style.visibility };
					$elm.css({ position: 'absolute', visibility: 'hidden' }).show();
				}
				var box = $elm[0].getBoundingClientRect && $elm[0].getBoundingClientRect(),
					val = box && (height ? box.height || box.bottom - box.top : box.width || box.right - box.left);
				if (!val && val !== 0) {
					val = height ? $elm[0].offsetHeight : $elm[0].offsetWidth;
				}
				if (old) {
					$elm.hide().css(old);
				}
				return val;
			},
			getStartZIndex: function(root) {
				var zIndex = parseInt(this[root ? '$root' : '$firstSub'].css('z-index'));
				if (!root && isNaN(zIndex)) {
					zIndex = parseInt(this.$root.css('z-index'));
				}
				return !isNaN(zIndex) ? zIndex : 1;
			},
			getTouchPoint: function(e) {
				return e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e;
			},
			getViewport: function(height) {
				var name = height ? 'Height' : 'Width',
					val = document.documentElement['client' + name],
					val2 = window['inner' + name];
				if (val2) {
					val = Math.min(val, val2);
				}
				return val;
			},
			getViewportHeight: function() {
				return this.getViewport(true);
			},
			getViewportWidth: function() {
				return this.getViewport();
			},
			getWidth: function($elm) {
				return this.getOffset($elm);
			},
			handleEvents: function() {
				return !this.disabled && this.isCSSOn();
			},
			handleItemEvents: function($a) {
				return this.handleEvents() && !this.isLinkInMegaMenu($a);
			},
			isCollapsible: function() {
				return this.$firstSub.css('position') == 'static';
			},
			isCSSOn: function() {
				return this.$firstLink.css('display') != 'inline';
			},
			isFixed: function() {
				var isFixed = this.$root.css('position') == 'fixed';
				if (!isFixed) {
					this.$root.parentsUntil('body').each(function() {
						if ($(this).css('position') == 'fixed') {
							isFixed = true;
							return false;
						}
					});
				}
				return isFixed;
			},
			isLinkInMegaMenu: function($a) {
				return $(this.getClosestMenu($a[0])).hasClass('mega-menu');
			},
			isTouchMode: function() {
				return !mouse || this.opts.noMouseOver || this.isCollapsible();
			},
			itemActivate: function($a, hideDeeperSubs) {
				var $ul = $a.closest('ul'),
					level = $ul.dataSM('level');
				// if for some reason the parent item is not activated (e.g. this is an API call to activate the item), activate all parent items first
				if (level > 1 && (!this.activatedItems[level - 2] || this.activatedItems[level - 2][0] != $ul.dataSM('parent-a')[0])) {
					var self = this;
					$($ul.parentsUntil('[data-smartmenus-id]', 'ul').get().reverse()).add($ul).each(function() {
						self.itemActivate($(this).dataSM('parent-a'));
					});
				}
				// hide any visible deeper level sub menus
				if (!this.isCollapsible() || hideDeeperSubs) {
					this.menuHideSubMenus(!this.activatedItems[level - 1] || this.activatedItems[level - 1][0] != $a[0] ? level - 1 : level);
				}
				// save new active item for this level
				this.activatedItems[level - 1] = $a;
				if (this.$root.triggerHandler('activate.smapi', $a[0]) === false) {
					return;
				}
				// show the sub menu if this item has one
				var $sub = $a.dataSM('sub');
				if ($sub && (this.isTouchMode() || (!this.opts.showOnClick || this.clickActivated))) {
					this.menuShow($sub);
				}
			},
			itemBlur: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				this.$root.triggerHandler('blur.smapi', $a[0]);
			},
			itemClick: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				if (this.$touchScrollingSub && this.$touchScrollingSub[0] == $a.closest('ul')[0]) {
					this.$touchScrollingSub = null;
					e.stopPropagation();
					return false;
				}
				if (this.$root.triggerHandler('click.smapi', $a[0]) === false) {
					return false;
				}
				var $sub = $a.dataSM('sub'),
					firstLevelSub = $sub ? $sub.dataSM('level') == 2 : false;
				if ($sub) {
					var subArrowClicked = $(e.target).is('.sub-arrow'),
						collapsible = this.isCollapsible(),
						behaviorToggle = /toggle$/.test(this.opts.collapsibleBehavior),
						behaviorLink = /link$/.test(this.opts.collapsibleBehavior),
						behaviorAccordion = /^accordion/.test(this.opts.collapsibleBehavior);
					// if the sub is hidden, try to show it
					if (!$sub.is(':visible')) {
						if (!behaviorLink || !collapsible || subArrowClicked) {
							if (this.opts.showOnClick && firstLevelSub) {
								this.clickActivated = true;
							}
							// try to activate the item and show the sub
							this.itemActivate($a, behaviorAccordion);
							// if "itemActivate" showed the sub, prevent the click so that the link is not loaded
							// if it couldn't show it, then the sub menus are disabled with an !important declaration (e.g. via mobile styles) so let the link get loaded
							if ($sub.is(':visible')) {
								this.focusActivated = true;
								return false;
							}
						}
					// if the sub is visible and we are in collapsible mode
					} else if (collapsible && (behaviorToggle || subArrowClicked)) {
						this.itemActivate($a, behaviorAccordion);
						this.menuHide($sub);
						if (behaviorToggle) {
							this.focusActivated = false;
						}
						return false;
					}
				}
				if (this.opts.showOnClick && firstLevelSub || $a.hasClass('disabled') || this.$root.triggerHandler('select.smapi', $a[0]) === false) {
					return false;
				}
			},
			itemDown: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				$a.dataSM('mousedown', true);
			},
			itemEnter: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				if (!this.isTouchMode()) {
					if (this.showTimeout) {
						clearTimeout(this.showTimeout);
						this.showTimeout = 0;
					}
					var self = this;
					this.showTimeout = setTimeout(function() { self.itemActivate($a); }, this.opts.showOnClick && $a.closest('ul').dataSM('level') == 1 ? 1 : this.opts.showTimeout);
				}
				this.$root.triggerHandler('mouseenter.smapi', $a[0]);
			},
			itemFocus: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				// fix (the mousedown check): in some browsers a tap/click produces consecutive focus + click events so we don't need to activate the item on focus
				if (this.focusActivated && (!this.isTouchMode() || !$a.dataSM('mousedown')) && (!this.activatedItems.length || this.activatedItems[this.activatedItems.length - 1][0] != $a[0])) {
					this.itemActivate($a, true);
				}
				this.$root.triggerHandler('focus.smapi', $a[0]);
			},
			itemLeave: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				if (!this.isTouchMode()) {
					$a[0].blur();
					if (this.showTimeout) {
						clearTimeout(this.showTimeout);
						this.showTimeout = 0;
					}
				}
				$a.removeDataSM('mousedown');
				this.$root.triggerHandler('mouseleave.smapi', $a[0]);
			},
			menuHide: function($sub) {
				if (this.$root.triggerHandler('beforehide.smapi', $sub[0]) === false) {
					return;
				}
				if (canAnimate) {
					$sub.stop(true, true);
				}
				if ($sub.css('display') != 'none') {
					var complete = function() {
						// unset z-index
						$sub.css('z-index', '');
					};
					// if sub is collapsible (mobile view)
					if (this.isCollapsible()) {
						if (canAnimate && this.opts.collapsibleHideFunction) {
							this.opts.collapsibleHideFunction.call(this, $sub, complete);
						} else {
							$sub.hide(this.opts.collapsibleHideDuration, complete);
						}
					} else {
						if (canAnimate && this.opts.hideFunction) {
							this.opts.hideFunction.call(this, $sub, complete);
						} else {
							$sub.hide(this.opts.hideDuration, complete);
						}
					}
					// deactivate scrolling if it is activated for this sub
					if ($sub.dataSM('scroll')) {
						this.menuScrollStop($sub);
						$sub.css({ 'touch-action': '', '-ms-touch-action': '', '-webkit-transform': '', transform: '' })
							.off('.smartmenus_scroll').removeDataSM('scroll').dataSM('scroll-arrows').hide();
					}
					// unhighlight parent item + accessibility
					$sub.dataSM('parent-a').removeClass('highlighted').attr('aria-expanded', 'false');
					$sub.attr({
						'aria-expanded': 'false',
						'aria-hidden': 'true'
					});
					var level = $sub.dataSM('level');
					this.activatedItems.splice(level - 1, 1);
					this.visibleSubMenus.splice($.inArray($sub, this.visibleSubMenus), 1);
					this.$root.triggerHandler('hide.smapi', $sub[0]);
				}
			},
			menuHideAll: function() {
				if (this.showTimeout) {
					clearTimeout(this.showTimeout);
					this.showTimeout = 0;
				}
				// hide all subs
				// if it's a popup, this.visibleSubMenus[0] is the root UL
				var level = this.opts.isPopup ? 1 : 0;
				for (var i = this.visibleSubMenus.length - 1; i >= level; i--) {
					this.menuHide(this.visibleSubMenus[i]);
				}
				// hide root if it's popup
				if (this.opts.isPopup) {
					if (canAnimate) {
						this.$root.stop(true, true);
					}
					if (this.$root.is(':visible')) {
						if (canAnimate && this.opts.hideFunction) {
							this.opts.hideFunction.call(this, this.$root);
						} else {
							this.$root.hide(this.opts.hideDuration);
						}
					}
				}
				this.activatedItems = [];
				this.visibleSubMenus = [];
				this.clickActivated = false;
				this.focusActivated = false;
				// reset z-index increment
				this.zIndexInc = 0;
				this.$root.triggerHandler('hideAll.smapi');
			},
			menuHideSubMenus: function(level) {
				for (var i = this.activatedItems.length - 1; i >= level; i--) {
					var $sub = this.activatedItems[i].dataSM('sub');
					if ($sub) {
						this.menuHide($sub);
					}
				}
			},
			menuInit: function($ul) {
				if (!$ul.dataSM('in-mega')) {
					// mark UL's in mega drop downs (if any) so we can neglect them
					if ($ul.hasClass('mega-menu')) {
						$ul.find('ul').dataSM('in-mega', true);
					}
					// get level (much faster than, for example, using parentsUntil)
					var level = 2,
						par = $ul[0];
					while ((par = par.parentNode.parentNode) != this.$root[0]) {
						level++;
					}
					// cache stuff for quick access
					var $a = $ul.prevAll('a').eq(-1);
					// if the link is nested (e.g. in a heading)
					if (!$a.length) {
						$a = $ul.prevAll().find('a').eq(-1);
					}
					$a.addClass('has-submenu').dataSM('sub', $ul);
					$ul.dataSM('parent-a', $a)
						.dataSM('level', level)
						.parent().dataSM('sub', $ul);
					// accessibility
					var aId = $a.attr('id') || this.accessIdPrefix + (++this.idInc),
						ulId = $ul.attr('id') || this.accessIdPrefix + (++this.idInc);
					$a.attr({
						id: aId,
						'aria-haspopup': 'true',
						'aria-controls': ulId,
						'aria-expanded': 'false'
					});
					$ul.attr({
						id: ulId,
						'role': 'group',
						'aria-hidden': 'true',
						'aria-labelledby': aId,
						'aria-expanded': 'false'
					});
					// add sub indicator to parent item
					if (this.opts.subIndicators) {
						$a[this.opts.subIndicatorsPos](this.$subArrow.clone());
					}
				}
			},
			menuPosition: function($sub) {
				var $a = $sub.dataSM('parent-a'),
					$li = $a.closest('li'),
					$ul = $li.parent(),
					level = $sub.dataSM('level'),
					subW = this.getWidth($sub),
					subH = this.getHeight($sub),
					itemOffset = $a.offset(),
					itemX = itemOffset.left,
					itemY = itemOffset.top,
					itemW = this.getWidth($a),
					itemH = this.getHeight($a),
					$win = $(window),
					winX = $win.scrollLeft(),
					winY = $win.scrollTop(),
					winW = this.getViewportWidth(),
					winH = this.getViewportHeight(),
					horizontalParent = $ul.parent().is('[data-sm-horizontal-sub]') || level == 2 && !$ul.hasClass('sm-vertical'),
					rightToLeft = this.opts.rightToLeftSubMenus && !$li.is('[data-sm-reverse]') || !this.opts.rightToLeftSubMenus && $li.is('[data-sm-reverse]'),
					subOffsetX = level == 2 ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
					subOffsetY = level == 2 ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY,
					x, y;
				if (horizontalParent) {
					x = rightToLeft ? itemW - subW - subOffsetX : subOffsetX;
					y = this.opts.bottomToTopSubMenus ? -subH - subOffsetY : itemH + subOffsetY;
				} else {
					x = rightToLeft ? subOffsetX - subW : itemW - subOffsetX;
					y = this.opts.bottomToTopSubMenus ? itemH - subOffsetY - subH : subOffsetY;
				}
				if (this.opts.keepInViewport) {
					var absX = itemX + x,
						absY = itemY + y;
					if (rightToLeft && absX < winX) {
						x = horizontalParent ? winX - absX + x : itemW - subOffsetX;
					} else if (!rightToLeft && absX + subW > winX + winW) {
						x = horizontalParent ? winX + winW - subW - absX + x : subOffsetX - subW;
					}
					if (!horizontalParent) {
						if (subH < winH && absY + subH > winY + winH) {
							y += winY + winH - subH - absY;
						} else if (subH >= winH || absY < winY) {
							y += winY - absY;
						}
					}
					// do we need scrolling?
					// 0.49 used for better precision when dealing with float values
					if (horizontalParent && (absY + subH > winY + winH + 0.49 || absY < winY) || !horizontalParent && subH > winH + 0.49) {
						var self = this;
						if (!$sub.dataSM('scroll-arrows')) {
							$sub.dataSM('scroll-arrows', $([$('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], $('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]])
								.on({
									mouseenter: function() {
										$sub.dataSM('scroll').up = $(this).hasClass('scroll-up');
										self.menuScroll($sub);
									},
									mouseleave: function(e) {
										self.menuScrollStop($sub);
										self.menuScrollOut($sub, e);
									},
									'mousewheel DOMMouseScroll': function(e) { e.preventDefault(); }
								})
								.insertAfter($sub)
							);
						}
						// bind scroll events and save scroll data for this sub
						var eNS = '.smartmenus_scroll';
						$sub.dataSM('scroll', {
								y: this.cssTransforms3d ? 0 : y - itemH,
								step: 1,
								// cache stuff for faster recalcs later
								itemH: itemH,
								subH: subH,
								arrowDownH: this.getHeight($sub.dataSM('scroll-arrows').eq(1))
							})
							.on(getEventsNS({
								'mouseover': function(e) { self.menuScrollOver($sub, e); },
								'mouseout': function(e) { self.menuScrollOut($sub, e); },
								'mousewheel DOMMouseScroll': function(e) { self.menuScrollMousewheel($sub, e); }
							}, eNS))
							.dataSM('scroll-arrows').css({ top: 'auto', left: '0', marginLeft: x + (parseInt($sub.css('border-left-width')) || 0), width: subW - (parseInt($sub.css('border-left-width')) || 0) - (parseInt($sub.css('border-right-width')) || 0), zIndex: $sub.css('z-index') })
								.eq(horizontalParent && this.opts.bottomToTopSubMenus ? 0 : 1).show();
						// when a menu tree is fixed positioned we allow scrolling via touch too
						// since there is no other way to access such long sub menus if no mouse is present
						if (this.isFixed()) {
							var events = {};
							events[touchEvents ? 'touchstart touchmove touchend' : 'pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp'] = function(e) {
								self.menuScrollTouch($sub, e);
							};
							$sub.css({ 'touch-action': 'none', '-ms-touch-action': 'none' }).on(getEventsNS(events, eNS));
						}
					}
				}
				$sub.css({ top: 'auto', left: '0', marginLeft: x, marginTop: y - itemH });
			},
			menuScroll: function($sub, once, step) {
				var data = $sub.dataSM('scroll'),
					$arrows = $sub.dataSM('scroll-arrows'),
					end = data.up ? data.upEnd : data.downEnd,
					diff;
				if (!once && data.momentum) {
					data.momentum *= 0.92;
					diff = data.momentum;
					if (diff < 0.5) {
						this.menuScrollStop($sub);
						return;
					}
				} else {
					diff = step || (once || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(data.step));
				}
				// hide any visible deeper level sub menus
				var level = $sub.dataSM('level');
				if (this.activatedItems[level - 1] && this.activatedItems[level - 1].dataSM('sub') && this.activatedItems[level - 1].dataSM('sub').is(':visible')) {
					this.menuHideSubMenus(level - 1);
				}
				data.y = data.up && end <= data.y || !data.up && end >= data.y ? data.y : (Math.abs(end - data.y) > diff ? data.y + (data.up ? diff : -diff) : end);
				$sub.css(this.cssTransforms3d ? { '-webkit-transform': 'translate3d(0, ' + data.y + 'px, 0)', transform: 'translate3d(0, ' + data.y + 'px, 0)' } : { marginTop: data.y });
				// show opposite arrow if appropriate
				if (mouse && (data.up && data.y > data.downEnd || !data.up && data.y < data.upEnd)) {
					$arrows.eq(data.up ? 1 : 0).show();
				}
				// if we've reached the end
				if (data.y == end) {
					if (mouse) {
						$arrows.eq(data.up ? 0 : 1).hide();
					}
					this.menuScrollStop($sub);
				} else if (!once) {
					if (this.opts.scrollAccelerate && data.step < this.opts.scrollStep) {
						data.step += 0.2;
					}
					var self = this;
					this.scrollTimeout = requestAnimationFrame(function() { self.menuScroll($sub); });
				}
			},
			menuScrollMousewheel: function($sub, e) {
				if (this.getClosestMenu(e.target) == $sub[0]) {
					e = e.originalEvent;
					var up = (e.wheelDelta || -e.detail) > 0;
					if ($sub.dataSM('scroll-arrows').eq(up ? 0 : 1).is(':visible')) {
						$sub.dataSM('scroll').up = up;
						this.menuScroll($sub, true);
					}
				}
				e.preventDefault();
			},
			menuScrollOut: function($sub, e) {
				if (mouse) {
					if (!/^scroll-(up|down)/.test((e.relatedTarget || '').className) && ($sub[0] != e.relatedTarget && !$.contains($sub[0], e.relatedTarget) || this.getClosestMenu(e.relatedTarget) != $sub[0])) {
						$sub.dataSM('scroll-arrows').css('visibility', 'hidden');
					}
				}
			},
			menuScrollOver: function($sub, e) {
				if (mouse) {
					if (!/^scroll-(up|down)/.test(e.target.className) && this.getClosestMenu(e.target) == $sub[0]) {
						this.menuScrollRefreshData($sub);
						var data = $sub.dataSM('scroll'),
							upEnd = $(window).scrollTop() - $sub.dataSM('parent-a').offset().top - data.itemH;
						$sub.dataSM('scroll-arrows').eq(0).css('margin-top', upEnd).end()
							.eq(1).css('margin-top', upEnd + this.getViewportHeight() - data.arrowDownH).end()
							.css('visibility', 'visible');
					}
				}
			},
			menuScrollRefreshData: function($sub) {
				var data = $sub.dataSM('scroll'),
					upEnd = $(window).scrollTop() - $sub.dataSM('parent-a').offset().top - data.itemH;
				if (this.cssTransforms3d) {
					upEnd = -(parseFloat($sub.css('margin-top')) - upEnd);
				}
				$.extend(data, {
					upEnd: upEnd,
					downEnd: upEnd + this.getViewportHeight() - data.subH
				});
			},
			menuScrollStop: function($sub) {
				if (this.scrollTimeout) {
					cancelAnimationFrame(this.scrollTimeout);
					this.scrollTimeout = 0;
					$sub.dataSM('scroll').step = 1;
					return true;
				}
			},
			menuScrollTouch: function($sub, e) {
				e = e.originalEvent;
				if (isTouchEvent(e)) {
					var touchPoint = this.getTouchPoint(e);
					// neglect event if we touched a visible deeper level sub menu
					if (this.getClosestMenu(touchPoint.target) == $sub[0]) {
						var data = $sub.dataSM('scroll');
						if (/(start|down)$/i.test(e.type)) {
							if (this.menuScrollStop($sub)) {
								// if we were scrolling, just stop and don't activate any link on the first touch
								e.preventDefault();
								this.$touchScrollingSub = $sub;
							} else {
								this.$touchScrollingSub = null;
							}
							// update scroll data since the user might have zoomed, etc.
							this.menuScrollRefreshData($sub);
							// extend it with the touch properties
							$.extend(data, {
								touchStartY: touchPoint.pageY,
								touchStartTime: e.timeStamp
							});
						} else if (/move$/i.test(e.type)) {
							var prevY = data.touchY !== undefined ? data.touchY : data.touchStartY;
							if (prevY !== undefined && prevY != touchPoint.pageY) {
								this.$touchScrollingSub = $sub;
								var up = prevY < touchPoint.pageY;
								// changed direction? reset...
								if (data.up !== undefined && data.up != up) {
									$.extend(data, {
										touchStartY: touchPoint.pageY,
										touchStartTime: e.timeStamp
									});
								}
								$.extend(data, {
									up: up,
									touchY: touchPoint.pageY
								});
								this.menuScroll($sub, true, Math.abs(touchPoint.pageY - prevY));
							}
							e.preventDefault();
						} else { // touchend/pointerup
							if (data.touchY !== undefined) {
								if (data.momentum = Math.pow(Math.abs(touchPoint.pageY - data.touchStartY) / (e.timeStamp - data.touchStartTime), 2) * 15) {
									this.menuScrollStop($sub);
									this.menuScroll($sub);
									e.preventDefault();
								}
								delete data.touchY;
							}
						}
					}
				}
			},
			menuShow: function($sub) {
				if (!$sub.dataSM('beforefirstshowfired')) {
					$sub.dataSM('beforefirstshowfired', true);
					if (this.$root.triggerHandler('beforefirstshow.smapi', $sub[0]) === false) {
						return;
					}
				}
				if (this.$root.triggerHandler('beforeshow.smapi', $sub[0]) === false) {
					return;
				}
				$sub.dataSM('shown-before', true);
				if (canAnimate) {
					$sub.stop(true, true);
				}
				if (!$sub.is(':visible')) {
					// highlight parent item
					var $a = $sub.dataSM('parent-a'),
						collapsible = this.isCollapsible();
					if (this.opts.keepHighlighted || collapsible) {
						$a.addClass('highlighted');
					}
					if (collapsible) {
						$sub.removeClass('sm-nowrap').css({ zIndex: '', width: 'auto', minWidth: '', maxWidth: '', top: '', left: '', marginLeft: '', marginTop: '' });
					} else {
						// set z-index
						$sub.css('z-index', this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1);
						// min/max-width fix - no way to rely purely on CSS as all UL's are nested
						if (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) {
							$sub.css({ width: 'auto', minWidth: '', maxWidth: '' }).addClass('sm-nowrap');
							if (this.opts.subMenusMinWidth) {
							 	$sub.css('min-width', this.opts.subMenusMinWidth);
							}
							if (this.opts.subMenusMaxWidth) {
							 	var noMaxWidth = this.getWidth($sub);
							 	$sub.css('max-width', this.opts.subMenusMaxWidth);
								if (noMaxWidth > this.getWidth($sub)) {
									$sub.removeClass('sm-nowrap').css('width', this.opts.subMenusMaxWidth);
								}
							}
						}
						this.menuPosition($sub);
					}
					var complete = function() {
						// fix: "overflow: hidden;" is not reset on animation complete in jQuery < 1.9.0 in Chrome when global "box-sizing: border-box;" is used
						$sub.css('overflow', '');
					};
					// if sub is collapsible (mobile view)
					if (collapsible) {
						if (canAnimate && this.opts.collapsibleShowFunction) {
							this.opts.collapsibleShowFunction.call(this, $sub, complete);
						} else {
							$sub.show(this.opts.collapsibleShowDuration, complete);
						}
					} else {
						if (canAnimate && this.opts.showFunction) {
							this.opts.showFunction.call(this, $sub, complete);
						} else {
							$sub.show(this.opts.showDuration, complete);
						}
					}
					// accessibility
					$a.attr('aria-expanded', 'true');
					$sub.attr({
						'aria-expanded': 'true',
						'aria-hidden': 'false'
					});
					// store sub menu in visible array
					this.visibleSubMenus.push($sub);
					this.$root.triggerHandler('show.smapi', $sub[0]);
				}
			},
			popupHide: function(noHideTimeout) {
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
				var self = this;
				this.hideTimeout = setTimeout(function() {
					self.menuHideAll();
				}, noHideTimeout ? 1 : this.opts.hideTimeout);
			},
			popupShow: function(left, top) {
				if (!this.opts.isPopup) {
					alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.');
					return;
				}
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
				this.$root.dataSM('shown-before', true);
				if (canAnimate) {
					this.$root.stop(true, true);
				}
				if (!this.$root.is(':visible')) {
					this.$root.css({ left: left, top: top });
					// show menu
					var self = this,
						complete = function() {
							self.$root.css('overflow', '');
						};
					if (canAnimate && this.opts.showFunction) {
						this.opts.showFunction.call(this, this.$root, complete);
					} else {
						this.$root.show(this.opts.showDuration, complete);
					}
					this.visibleSubMenus[0] = this.$root;
				}
			},
			refresh: function() {
				this.destroy(true);
				this.init(true);
			},
			rootKeyDown: function(e) {
				if (!this.handleEvents()) {
					return;
				}
				switch (e.keyCode) {
					case 27: // reset on Esc
						var $activeTopItem = this.activatedItems[0];
						if ($activeTopItem) {
							this.menuHideAll();
							$activeTopItem[0].focus();
							var $sub = $activeTopItem.dataSM('sub');
							if ($sub) {
								this.menuHide($sub);
							}
						}
						break;
					case 32: // activate item's sub on Space
						var $target = $(e.target);
						if ($target.is('a') && this.handleItemEvents($target)) {
							var $sub = $target.dataSM('sub');
							if ($sub && !$sub.is(':visible')) {
								this.itemClick({ currentTarget: e.target });
								e.preventDefault();
							}
						}
						break;
				}
			},
			rootOut: function(e) {
				if (!this.handleEvents() || this.isTouchMode() || e.target == this.$root[0]) {
					return;
				}
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
				if (!this.opts.showOnClick || !this.opts.hideOnClick) {
					var self = this;
					this.hideTimeout = setTimeout(function() { self.menuHideAll(); }, this.opts.hideTimeout);
				}
			},
			rootOver: function(e) {
				if (!this.handleEvents() || this.isTouchMode() || e.target == this.$root[0]) {
					return;
				}
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
			},
			winResize: function(e) {
				if (!this.handleEvents()) {
					// we still need to resize the disable overlay if it's visible
					if (this.$disableOverlay) {
						var pos = this.$root.offset();
	 					this.$disableOverlay.css({
							top: pos.top,
							left: pos.left,
							width: this.$root.outerWidth(),
							height: this.$root.outerHeight()
						});
					}
					return;
				}
				// hide sub menus on resize - on mobile do it only on orientation change
				if (!('onorientationchange' in window) || e.type == 'orientationchange') {
					var collapsible = this.isCollapsible();
					// if it was collapsible before resize and still is, don't do it
					if (!(this.wasCollapsible && collapsible)) { 
						if (this.activatedItems.length) {
							this.activatedItems[this.activatedItems.length - 1][0].blur();
						}
						this.menuHideAll();
					}
					this.wasCollapsible = collapsible;
				}
			}
		}
	});

	$.fn.dataSM = function(key, val) {
		if (val) {
			return this.data(key + '_smartmenus', val);
		}
		return this.data(key + '_smartmenus');
	};

	$.fn.removeDataSM = function(key) {
		return this.removeData(key + '_smartmenus');
	};

	$.fn.smartmenus = function(options) {
		if (typeof options == 'string') {
			var args = arguments,
				method = options;
			Array.prototype.shift.call(args);
			return this.each(function() {
				var smartmenus = $(this).data('smartmenus');
				if (smartmenus && smartmenus[method]) {
					smartmenus[method].apply(smartmenus, args);
				}
			});
		}
		return this.each(function() {
			// [data-sm-options] attribute on the root UL
			var dataOpts = $(this).data('sm-options') || null;
			if (dataOpts) {
				try {
					dataOpts = eval('(' + dataOpts + ')');
				} catch(e) {
					dataOpts = null;
					alert('ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.');
				};
			}
			new $.SmartMenus(this, $.extend({}, $.fn.smartmenus.defaults, options, dataOpts));
		});
	};

	// default settings
	$.fn.smartmenus.defaults = {
		isPopup:		false,		// is this a popup menu (can be shown via the popupShow/popupHide methods) or a permanent menu bar
		mainMenuSubOffsetX:	0,		// pixels offset from default position
		mainMenuSubOffsetY:	0,		// pixels offset from default position
		subMenusSubOffsetX:	0,		// pixels offset from default position
		subMenusSubOffsetY:	0,		// pixels offset from default position
		subMenusMinWidth:	'10em',		// min-width for the sub menus (any CSS unit) - if set, the fixed width set in CSS will be ignored
		subMenusMaxWidth:	'20em',		// max-width for the sub menus (any CSS unit) - if set, the fixed width set in CSS will be ignored
		subIndicators: 		true,		// create sub menu indicators - creates a SPAN and inserts it in the A
		subIndicatorsPos: 	'append',	// position of the SPAN relative to the menu item content ('append', 'prepend')
		subIndicatorsText:	'',		// [optionally] add text in the SPAN (e.g. '+') (you may want to check the CSS for the sub indicators too)
		scrollStep: 		30,		// pixels step when scrolling long sub menus that do not fit in the viewport height
		scrollAccelerate:	true,		// accelerate scrolling or use a fixed step
		showTimeout:		250,		// timeout before showing the sub menus
		hideTimeout:		500,		// timeout before hiding the sub menus
		showDuration:		0,		// duration for show animation - set to 0 for no animation - matters only if showFunction:null
		showFunction:		null,		// custom function to use when showing a sub menu (the default is the jQuery 'show')
							// don't forget to call complete() at the end of whatever you do
							// e.g.: function($ul, complete) { $ul.fadeIn(250, complete); }
		hideDuration:		0,		// duration for hide animation - set to 0 for no animation - matters only if hideFunction:null
		hideFunction:		function($ul, complete) { $ul.fadeOut(200, complete); },	// custom function to use when hiding a sub menu (the default is the jQuery 'hide')
							// don't forget to call complete() at the end of whatever you do
							// e.g.: function($ul, complete) { $ul.fadeOut(250, complete); }
		collapsibleShowDuration:0,		// duration for show animation for collapsible sub menus - matters only if collapsibleShowFunction:null
		collapsibleShowFunction:function($ul, complete) { $ul.slideDown(200, complete); },	// custom function to use when showing a collapsible sub menu
							// (i.e. when mobile styles are used to make the sub menus collapsible)
		collapsibleHideDuration:0,		// duration for hide animation for collapsible sub menus - matters only if collapsibleHideFunction:null
		collapsibleHideFunction:function($ul, complete) { $ul.slideUp(200, complete); },	// custom function to use when hiding a collapsible sub menu
							// (i.e. when mobile styles are used to make the sub menus collapsible)
		showOnClick:		false,		// show the first-level sub menus onclick instead of onmouseover (i.e. mimic desktop app menus) (matters only for mouse input)
		hideOnClick:		true,		// hide the sub menus on click/tap anywhere on the page
		noMouseOver:		false,		// disable sub menus activation onmouseover (i.e. behave like in touch mode - use just mouse clicks) (matters only for mouse input)
		keepInViewport:		true,		// reposition the sub menus if needed to make sure they always appear inside the viewport
		keepHighlighted:	true,		// keep all ancestor items of the current sub menu highlighted (adds the 'highlighted' class to the A's)
		markCurrentItem:	false,		// automatically add the 'current' class to the A element of the item linking to the current URL
		markCurrentTree:	true,		// add the 'current' class also to the A elements of all ancestor items of the current item
		rightToLeftSubMenus:	false,		// right to left display of the sub menus (check the CSS for the sub indicators' position)
		bottomToTopSubMenus:	false,		// bottom to top display of the sub menus
		collapsibleBehavior:	'default'	// parent items behavior in collapsible (mobile) view ('default', 'toggle', 'link', 'accordion', 'accordion-toggle', 'accordion-link')
							// 'default' - first tap on parent item expands sub, second tap loads its link
							// 'toggle' - the whole parent item acts just as a toggle button for its sub menu (expands/collapses on each tap)
							// 'link' - the parent item acts as a regular item (first tap loads its link), the sub menu can be expanded only via the +/- button
							// 'accordion' - like 'default' but on expand also resets any visible sub menus from deeper levels or other branches
							// 'accordion-toggle' - like 'toggle' but on expand also resets any visible sub menus from deeper levels or other branches
							// 'accordion-link' - like 'link' but on expand also resets any visible sub menus from deeper levels or other branches
	};

	return $;
}));
!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var o={};t(o),e.bodyScrollLock=o}}(this,function(exports){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}var d="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),c=[],u=!1,a=-1,s=void 0,v=void 0,f=function(t){return c.some(function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})},m=function(e){var t=e||window.event;return!!f(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))},o=function(){setTimeout(function(){void 0!==v&&(document.body.style.paddingRight=v,v=void 0),void 0!==s&&(document.body.style.overflow=s,s=void 0)})};exports.disableBodyScroll=function(i,e){if(d){if(!i)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(i&&!c.some(function(e){return e.targetElement===i})){var t={targetElement:i,options:e||{}};c=[].concat(r(c),[t]),i.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY)},i.ontouchmove=function(e){var t,o,n,r;1===e.targetTouches.length&&(o=i,r=(t=e).targetTouches[0].clientY-a,!f(t.target)&&(o&&0===o.scrollTop&&0<r?m(t):(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&r<0?m(t):t.stopPropagation()))},u||(document.addEventListener("touchmove",m,l?{passive:!1}:void 0),u=!0)}}else{n=e,setTimeout(function(){if(void 0===v){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(v=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===s&&(s=document.body.style.overflow,document.body.style.overflow="hidden")});var o={targetElement:i,options:e||{}};c=[].concat(r(c),[o])}var n},exports.clearAllBodyScrollLocks=function(){d?(c.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),u&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1),c=[],a=-1):(o(),c=[])},exports.enableBodyScroll=function(t){if(d){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,c=c.filter(function(e){return e.targetElement!==t}),u&&0===c.length&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1)}else 1===c.length&&c[0].targetElement===t?(o(),c=[]):c=c.filter(function(e){return e.targetElement!==t})}});

// Sticky Plugin v1.0.4 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 02/14/2011
// Date: 07/20/2015
// Website: http://stickyjs.com/
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var slice = Array.prototype.slice; // save ref to original slice()
    var splice = Array.prototype.splice; // save ref to original slice()

  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      widthFromWrapper: true, // works only when .getWidthFrom is empty
      responsiveWidth: false,
      zIndex: 'inherit'
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        //update height in case of dynamic content
        s.stickyWrapper.css('height', s.stickyElement.outerHeight());

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'z-index': ''
              });
            s.stickyElement.parent().removeClass(s.className);
            s.stickyElement.trigger('sticky-end', [s]);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop !== newTop) {
            var newWidth;
            if (s.getWidthFrom) {
                padding =  s.stickyElement.innerWidth() - s.stickyElement.width();
                newWidth = $(s.getWidthFrom).width() - padding || null;
            } else if (s.widthFromWrapper) {
                newWidth = s.stickyWrapper.width();
            }
            if (newWidth == null) {
                newWidth = s.stickyElement.width();
            }
            s.stickyElement
              .css('width', newWidth)
              .css('position', 'fixed')
              .css('top', newTop)
              .css('z-index', s.zIndex);

            s.stickyElement.parent().addClass(s.className);

            if (s.currentTop === null) {
              s.stickyElement.trigger('sticky-start', [s]);
            } else {
              // sticky is started but it have to be repositioned
              s.stickyElement.trigger('sticky-update', [s]);
            }

            if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
              // just reached bottom || just started to stick but bottom is already reached
              s.stickyElement.trigger('sticky-bottom-reached', [s]);
            } else if(s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
              // sticky is started && sticked at topSpacing && overflowing from top just finished
              s.stickyElement.trigger('sticky-bottom-unreached', [s]);
            }

            s.currentTop = newTop;
          }

          // Check if sticky has reached end of container and stop sticking
          var stickyWrapperContainer = s.stickyWrapper.parent();
          var unstick = (s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (s.stickyElement.offset().top <= s.topSpacing);

          if( unstick ) {
            s.stickyElement
              .css('position', 'absolute')
              .css('top', '')
              .css('bottom', 0)
              .css('z-index', '');
          } else {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop)
              .css('bottom', '')
              .css('z-index', s.zIndex);
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i];
        var newWidth = null;
        if (s.getWidthFrom) {
            if (s.responsiveWidth) {
                newWidth = $(s.getWidthFrom).width();
            }
        } else if(s.widthFromWrapper) {
            newWidth = s.stickyWrapper.width();
        }
        if (newWidth != null) {
            s.stickyElement.css('width', newWidth);
        }
      }
    },
    methods = {
      init: function(options) {
        return this.each(function() {
          var o = $.extend({}, defaults, options);
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
          var wrapper = $('<div></div>')
            .attr('id', wrapperId)
            .addClass(o.wrapperClassName);

          stickyElement.wrapAll(function() {
            if ($(this).parent("#" + wrapperId).length == 0) {
                    return wrapper;
            }
});

          var stickyWrapper = stickyElement.parent();

          if (o.center) {
            stickyWrapper.css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") === "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          o.stickyElement = stickyElement;
          o.stickyWrapper = stickyWrapper;
          o.currentTop    = null;

          sticked.push(o);

          methods.setWrapperHeight(this);
          methods.setupChangeListeners(this);
        });
      },

      setWrapperHeight: function(stickyElement) {
        var element = $(stickyElement);
        var stickyWrapper = element.parent();
        if (stickyWrapper) {
          stickyWrapper.css('height', element.outerHeight());
        }
      },

      setupChangeListeners: function(stickyElement) {
        if (window.MutationObserver) {
          var mutationObserver = new window.MutationObserver(function(mutations) {
            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
              methods.setWrapperHeight(stickyElement);
            }
          });
          mutationObserver.observe(stickyElement, {subtree: true, childList: true});
        } else {
          if (window.addEventListener) {
            stickyElement.addEventListener('DOMNodeInserted', function() {
              methods.setWrapperHeight(stickyElement);
            }, false);
            stickyElement.addEventListener('DOMNodeRemoved', function() {
              methods.setWrapperHeight(stickyElement);
            }, false);
          } else if (window.attachEvent) {
            stickyElement.attachEvent('onDOMNodeInserted', function() {
              methods.setWrapperHeight(stickyElement);
            });
            stickyElement.attachEvent('onDOMNodeRemoved', function() {
              methods.setWrapperHeight(stickyElement);
            });
          }
        }
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var that = this;
          var unstickyElement = $(that);

          var removeIdx = -1;
          var i = sticked.length;
          while (i-- > 0) {
            if (sticked[i].stickyElement.get(0) === that) {
                splice.call(sticked,i,1);
                removeIdx = i;
            }
          }
          if(removeIdx !== -1) {
            unstickyElement.unwrap();
            unstickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'float': '',
                'z-index': ''
              })
            ;
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function() {
    setTimeout(scroller, 0);
  });
}));

/*====== jQuery UI accordion ======*/

(function($) {
    $( ".ama__accordion" ).accordion({
        heightStyle: "content",
        collapsible: true,
        active: false
    });
})(jQuery);

/**
 * @file
 * alert.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
 (function ($, Drupal) {
   Drupal.behaviors.alert = {
     attach: function (context, settings) {
       $.cookie('ama__alert--hide');
       var alertCookie = $.cookie('ama__alert--hide');
       
       (function ($) {
         // If the 'hide cookie is not set we show the alert
         if (alertCookie !== '1') {
           $('.ama__alert__wrap').fadeIn("slow");
         }

         // Add the event that closes the popup and sets the cookie that tells us to
         // not show it again until one day has passed.
         $('.ama__alert__close').click(function() {
           $('.ama__alert__wrap').fadeOut();
           // set the cookie
           $.cookie('ama__alert--hide', '1', { expires: 1});
           return false;
         });
       })(jQuery);
     }
   };
 })(jQuery, Drupal);

/**
 * @file
 * bp calculator.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */

(function ($, Drupal) {
  Drupal.behaviors.bpCalculator = {
    attach: function (context, settings) {

      // Clone last row of table
      $('.add-bp-row').unbind('click').click(function(e){
        e.preventDefault();
        var $tableBody = $('#bpCalculator table').find('tbody'),
          $trLast = $tableBody.find('tr:last'),
          $trNew = $trLast.clone();

        // Append new class name to cloned row
        $trLast.before($trNew).addClass('cloned').find('input').val('');

        // Add new name with index
        $tableBody.find('tr:last input').each(function () {
          var $trInputClassIndex = $('#bpCalculator tbody>tr').length + 1,
              $trInputClassName = $(this).attr('class');

          $(this).attr('name', $trInputClassName + '-' + $trInputClassIndex);
        });

        $('td:eq(0)', $trLast).text($('#bpCalculator tbody>tr').length);
        return false;
      });

      // When clear/restart button is clicked return table to initial state
      $('.clear-restart').unbind('click').click(function(e){
        e.preventDefault();

        // Remove all cloned rows
        var $trCloned = $('.cloned');
        $trCloned.remove();

        // Reset to intial values
        $('#bpCalculator input').each(function () {
          $(this).val('');
        });

        // Reset form
        $('#bpCalculator ').validate().resetForm();

        // Hide output row
        $('.bpCalculator__table__output').hide();

        return false;
      });

      // Calculate average BP
      function calculcateBP(bpValue, bpOutput) {
        var bpInput = 0, // row count
            bpTotal = 0, // incremented input values
            bpAverage; // averaged bpTotal / bpInput

        bpValue.each(function () {
          // If Input values are greater than 0 then turn into a number and round
          var val = $(this).val() > 0 ? Math.round(parseInt($(this).val(), 10)) : false;

          if (val !== 0) {
            bpInput += 1;
            bpTotal += val;
          }
        });

        // Calculate average
        bpAverage = bpTotal / bpInput > 0 ? Math.round(bpTotal / bpInput) : 0;

        bpOutput.text(bpAverage);

        $('.bpCalculator__table__output').show();
      }

      // Validate BP Form
      $('#bpCalculator').validate({
        // Calculate BP when calculate is clicked
        submitHandler: function(form) {
          var sysBpValue = $('.bpCalculator__systolic-input'),
            sysBpOutput = $('.bpCalculator__systolic-output');

          var diaBpValue = $('.bpCalculator__diastolic-input'),
            diaBpOutput = $('.bpCalculator__diastolic-output');

          calculcateBP(sysBpValue, sysBpOutput);
          calculcateBP(diaBpValue, diaBpOutput);

          return false;
        }
      });
    }
  };
})(jQuery, Drupal);

(function($) {
  $('.ama__subcategory-featured-content-as-carousel .grid-container').slick({
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

/**
 * SmartMenus jQuery Plugin - v1.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */


jQuery('.ama_category_navigation_menu__group').smartmenus({
  subIndicatorsPos: 'append'
});

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

          // jQueryUI selectmenu method
          $('.ama__select-menu__select').selectmenu();

          // Submits the search form after a select menu items has been selected
          $('.ama__select-menu__select').on('selectmenuchange', function() {
            $('#block-exposedformacquia-searchpage').submit();
          });

          $('.ama__select-menu__select').on('selectmenuchange', function() {
            $(this).trigger('change');
          });

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

          if (typeof(jQuery.ui.checkList) != 'undefined'){
            $('#filterList').checkList({
              listItems: dataModel,
              onChange: selChange
            });
          }

          $('form:not([class*="layout-builder"]) [type=checkbox]').each( function() {
            $('[type=checkbox]').checkboxradio();
          });

          $('form:not([class*="layout-builder"]) [type=radio]').checkboxradio().buttonset().find('label').css('width', '19.4%');

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
          function expandListAccordion(element, open){
            $(element).accordion({
              multiple: true,
              icons: false,
              heightStyle: "content",
              collapsible: true,
              animate: 500,
              active: open,
              activate : function (event, ui) {
                if($(ui.newPanel).hasClass('ui-accordion-content-active')) {
                  $(ui.newPanel).prev().addClass('active');
                } else {
                  $(ui.oldPanel).siblings().removeClass('active');
                }
              }
            });
          }

          if($(".ama__expand-list").find('.ui-checkboxradio-checked').length) {
            expandListAccordion('.ama__expand-list', 0);
            $(".ama__expand-list .ama__expand-list__header").first().addClass('active');
          } else {
            expandListAccordion('.ama__expand-list', false);
            $(".ama__expand-list").children('.ama__expand-list__header').removeClass('active');
          }

          // Collapse all accordion panels
          $('.ama__filter__collapse-panels button').click(function(){
            $('.ama__expand-list .ui-accordion-header').each( function() {
              if($(this).hasClass('ui-state-active') || $(this).hasClass('active')) {
                $(this).click();
              }
            });
          });

          // Open accordion panels for mobile
          $('.ama__applied-filters__show-filters').unbind('click').click(function(){
            $('.ama__expand-list, .ama__applied-filters__tags').slideToggle(function() {
              $('.ama__applied-filters__show-filters').text($(this).is(':visible') ? 'Hide Filter' : 'Filter');
            });
          });

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
        $('.ama__gate', context).outerHeight(heightGate);
        $('.ama__gate').nextUntil('.ama__page--news__teasers').wrapAll('<div class="ama__gate__blurry" />');
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

})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.jumpMenu = {
    attach: function (context, settings) {
      $('.ama__jump_menu').on('selectmenuchange', function () {
        window.location = $(this).find(':selected').data('url');
      });
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {

  Drupal.behaviors.ama_mainNavigation = {
    attach: function (context, settings) {

      var $categoryNavWrapper = $('.ama_category_navigation_wrapper'),
          $categoryNavigationMenu = $('.ama_category_navigation_menu'),
          $categoryNavigationMenuGroup = $('.ama_category_navigation_menu__group'),
          $mobileSearchTrigger = $('.global-search-trigger'),
          $mobileSearch = $('.ama__global-search'),
          $mainNav = $('.ama__main-navigation '),
          $productNav = $('.ama__product-nav'),
          $subMenu = $('.ama_category_navigation_menu__submenu'),
          $subMenuArticle = $('.ama_category_navigation_menu__articles'),
          viewportHeight = 0,
          productNavHeight = 0,
          categoryNavMenuHeight = $('.ama_category_navigation_menu').outerHeight(),
          categoryNavMenuResizedHeight = 0,
          windowWidth = $(window).width();

      // Checks if user agent is a mobile device
      var deviceAgent = navigator.userAgent.toLowerCase();
      var agentID = deviceAgent.match(/(android|webos|iphone|ipod|blackberry)/) && windowWidth < 768;

      if($productNav.length && $productNav.is(':visible') ){
        productNavHeight = $productNav.height();
      } else {
        productNavHeight = 0;
      }

        // Calculate whether or not the category nav should have scrollbars
      function categoryNavHeight(resizeViewportHeight) {

        // Check to see if viewport height is passed back when the window gets resized
        if(typeof resizeViewportHeight !== 'undefined') {
          viewportHeight = resizeViewportHeight;
        } else {
          // Window height is used by default
          viewportHeight = window.innerHeight ? window.innerHeight : $(window).height();
        }

        // Subtract the navigation height from window height to assess content height
        categoryNavMenuResizedHeight = viewportHeight;
        // Check to see if main menu purple dropdown height is larger than viewport height
        if (categoryNavMenuHeight + $mainNav.outerHeight() + productNavHeight > viewportHeight && !agentID) {

          // Set the menu dropdown the same as viewport to enable scrolling
          var categoryNavMenuHeightResized = categoryNavMenuResizedHeight - $mainNav.outerHeight() - productNavHeight;
          $categoryNavigationMenuGroup.addClass('scroll').outerHeight(categoryNavMenuHeightResized);

          $categoryNavigationMenuGroup.on('show.smapi', function(e, menu) {
            if($('.ama_category_navigation_menu__submenu', menu).outerHeight() > categoryNavMenuHeightResized) {
              $('.ama_category_navigation_menu__submenu', menu).outerHeight(categoryNavMenuHeightResized);
            }

            if($('.ama_category_navigation_menu__articles', menu).outerHeight() > categoryNavMenuHeightResized) {
              $('.ama_category_navigation_menu__articles', menu).outerHeight(categoryNavMenuHeightResized).addClass('one_article');
            }
          });
        } else {
          $categoryNavigationMenuGroup.removeClass('scroll').outerHeight('auto');
          $subMenu.outerHeight('auto');
          $subMenuArticle.outerHeight('auto');
        }
      }


      // Hide/Show menu
      function hideShow() {
        if ($('#global-menu').prop('checked')) {
          $categoryNavigationMenu.slideDown(function () {
            if ((categoryNavMenuHeight +  $mainNav.outerHeight() + productNavHeight) > viewportHeight) {
              bodyScrollLock.disableBodyScroll($categoryNavigationMenuGroup, {
                allowTouchMove: function allowTouchMove(el) {
                  while (el && el !== document.body) {
                    if (el.getAttribute('body-scroll-lock-ignore') !== null) {
                      return true;
                    }
                    el = el.parentNode;
                  }
                }
              });
            }

            if (agentID) {
              // Only make the menu height same as viewport on mobile devices
              var mobileHeight = window.innerHeight ? window.innerHeight : $(window).height();
              $categoryNavWrapper.height(mobileHeight).addClass('scroll');

              $categoryNavigationMenuGroup.on('show.smapi', function(e, menu) {
                if($(menu).outerHeight() > mobileHeight) {
                  $(menu).outerHeight(mobileHeight);
                }

              });
            } else {
              $(this).parent().height('auto');
              categoryNavHeight();
            }
          });
        }
        else {
          $categoryNavigationMenu.slideUp(function () {
            $(this).parent().height(0);
            bodyScrollLock.clearAllBodyScrollLocks();
          });
        }
      }

      // Closes menu on doc load
      $('#global-menu').prop('checked', false);

      $('.ama__global-menu').click(function (e) {
        hideShow();
        e.stopPropagation();
      });

      // If a user clicks outside the menu then close it
      $(document).click(function (e) {
        if (!$categoryNavigationMenu.is(e.target) && $categoryNavigationMenu.has(e.target).length === 0) {
          $('#global-menu').prop('checked', false);
          hideShow();
        }
      });

      $($mobileSearchTrigger).unbind('click').click(function () {
        $mobileSearch.slideToggle();
      });

      function moveSocialSharePosition(){
        var mainNavPosition = $('.ama__main-navigation .container').offset().left;
        var $amaSocialShare = $('.ama__social-share');

        // Checks to see if there is enough for the sticky nav
        if(mainNavPosition > 60) {

          var socialStickyPosition = mainNavPosition - 60;
          var $socialIcons = $('.ama__masthead__content__share');

          // Check to see if viewport width is greater 850px then the social icons will be sticky
          if($socialIcons.length && $(window).width() > 850) {
            $socialIcons.sticky({
              wrapperClassName: 'ama__masthead__content__share-wrapper',
              zIndex: 501
            });

            $socialIcons.on('sticky-start', function () {
              $amaSocialShare.addClass('ama__social-share--fixed').css('left', socialStickyPosition).hide().fadeTo('slow', 1);
            });

            $socialIcons.on('sticky-update', function () {
              $amaSocialShare.addClass('ama__social-share--fixed').hide().fadeTo('slow', 1);
            });

            $socialIcons.on('sticky-end', function () {
              $('.ama__social-share--fixed').removeClass('ama__social-share--fixed');
            });
          }
        }
      }

      // Initialize getSocialShare()
      moveSocialSharePosition();

      // Onscroll check to see if social icon position is greater than footer position
      var debounce_timer;
      if($('.ama__masthead__content__share .ama__social-share').is(':visible')) {
        $(window).scroll(function() {
          var $socialIcons = $('.ama__masthead__content__share .ama__social-share');
          var socialIconPositionBottom = $socialIcons.offset().top + $socialIcons.outerHeight();
          var footerPosition = $('footer').offset().top;

          if(debounce_timer) {
            window.clearTimeout(debounce_timer);
          }

          debounce_timer = window.setTimeout(function() {
            if(socialIconPositionBottom > footerPosition) {
              $('.ama__masthead__content__share').fadeOut('fast');
            } else {
              $('.ama__masthead__content__share').fadeIn('fast');
            }
          }, 50);
        });
      }


      $(window).scroll(function() {
        var resizeViewportHeight = window.innerHeight ? window.innerHeight : $(window).height();
        categoryNavHeight(resizeViewportHeight);
      });

      //Checks the layout position of article on window resize and moves the social icons accordingly
      $( window ).resize(function() {
        if (!agentID) {
          var resizeViewportHeight = $(window).innerHeight();
          var mainNavPositionUpdate = $('.ama__main-navigation .container').offset().left - 100;

          categoryNavHeight(resizeViewportHeight);
          $('.ama__social-share.ama__social-share--fixed').css('left', mainNavPositionUpdate);
        }
      });
    }
  };
})(jQuery, Drupal);




/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {

  Drupal.behaviors.ribbonnav = {
    attach: function (context, settings) {

      // Needs doc ready because the admin toolbar needs to get loaded to determine the top spacing for sticky nav
      $(function() {
        var $bodyFixed = $('body').css('overflow');

        if($bodyFixed === 'hidden') {
          $('.ama__main-navigation').unstick();
          return;
        } else if($(window).width() < 768 ) { // If less than tablet
          $('.ama__main-navigation').sticky({zIndex: 501});
        } else if($('.toolbar-tray').hasClass('toolbar-tray-horizontal')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 72 });
        } else if($('.toolbar-tray').hasClass('toolbar-tray-vertical')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 39 });
        } else {
          $('.ama__main-navigation ').sticky({ zIndex: 501 });
        }
      });

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
          $('.ama__ribbon__dropdown__trigger', this).removeClass(class_active).children().removeClass(class_active);
        });
      });
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.peopeListing = {
    attach: function (context, settings) {
      if($('.ama__people-listing__card-container').length){
        var $cardHeight = 0;
        var $card = $('.ama__people-listing__card-container .ama__people-listing-card');

        $card.each(function() {
          $cardHeight = $(this).height() > $cardHeight ? $(this).height() : $cardHeight;
        });

        $card.height($cardHeight);
      }
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Sadly adds footer to left resource page column.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.resourcePageFooter = {
    attach: function(context, settings) {

      $(function() {
        if ($('body.ama__resource-page').length) {
          $('footer', context).clone().appendTo('.ama__layout--split__left').addClass('ama__footer ama__resource-page__desktop-footer');
        }
      });
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.ama_search_checkbox = {
    attach: function (context, settings) {

      var $categorySearchInput = $('#search_category');
      var $categorySearchList = $('.facets-widget-checkbox ul li');
      var $clearSearchFilter = $('#appliedFiltersRemove');

      // Filter list using jQuery filter
      function filterList(searchBox, list) {
        searchBox.keyup(function () {
          var $regex = new RegExp(this.value, 'i');
          list.hide().filter(function () {
            return $regex.test($.trim($(this).text()));
          }).show();
        });
      }

      // Clear filter
      function cleafFilterList(clearSearchFilter) {
        clearSearchFilter.click(function (e) {
          e.preventDefault();
          $categorySearchInput.val('');
          $categorySearchInput.trigger('keyup');

          $('.facets-widget-checkbox ul li [type=checkbox]').each( function() {
            $(this).prop("checked", false);
            $('#block-exposedformacquia-searchpage').submit();
          });
        });
      }

      // Invoke filter list
      filterList($categorySearchInput, $categorySearchList);

      // Invoke clear filter
      cleafFilterList($clearSearchFilter);
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.ama_signInMenu = {
    attach: function (context, settings) {
      var $signInDropdown = $('.ama__sign-in-dropdown');
      var $signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
      var $signInLink = $('.ama__sign-in-dropdown__text');
      var $exploreMenu = $('.ama__explore-menu');
      var $exploreMenuDropdown = $('.ama__explore-menu__menu');

      function dropdownDownMenu(parentElement, menuElement) {
       parentElement.unbind('click').click(function(e){
          e.stopPropagation();
          $(menuElement).slideToggle();
        });

        // Stop link from firing
        $signInLink.click(function(e) {
          e.preventDefault();
        });

        $(document).click(function(e) {
          // if the target of the click isn't the container nor a descendant of the container
          if (!parentElement.is(e.target) && parentElement.has(e.target).length === 0) {
            $(menuElement).slideUp();
          }

          // Set timeout for when a user mouses out of the menu
          parentElement.mouseenter(function(){
            clearTimeout();
          }).mouseleave(function(){
            setTimeout(function(){
              $(menuElement).slideUp();
            }, 2000);
          });
        });
      }

      dropdownDownMenu($signInDropdown, $signInDropdownMenu);
      dropdownDownMenu($exploreMenu, $exploreMenuDropdown);
    }
  };
})(jQuery, Drupal);

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
  Drupal.behaviors.subcategoriesExploration = {
    attach: function(context, settings) {

      var $subcategoryListContainer = $('.ama__subcategory-exploration__list');
      var $subcategoryList  = $('.ama__subcategory-exploration__list ul');
      var $subcategoryListExpander = $('.ama__subcategory-exploration__show-more');
      var $subcategoryListContainerHeight = $subcategoryListContainer.outerHeight() + 3;
      var $subcategoryListLinkText = $('.ama__subcategory-exploration__text');
      var $initialWindowWidth = $(window).width();

      // Determine when to show link based on window size.
      $(document).ready(function () {
        function showHideMoreLink () {
          // Set intial window width to 1024 pixel.
          // @todo: Check if this is an issue to set 1024 width limit.
          if ($initialWindowWidth <= 1024) {
            // If the unordered list outerHeight is greater than the parent container then show the show more link,
            // hide otherwise.
            if ($subcategoryList.outerHeight() > $subcategoryListContainerHeight) {
              $subcategoryListExpander.show();
            }
            if ($subcategoryList.outerHeight() < $subcategoryListContainerHeight) {
              $subcategoryListExpander.hide();
            }
          }
          if ($initialWindowWidth !== $(window).width()) {
            // If the unordered list outerHeight is greater than the parent container then show the show more link
            if ($subcategoryList.outerHeight() > $subcategoryListContainerHeight) {
              $subcategoryListExpander.show();

            } else {
              $subcategoryListExpander.hide();
            }
          }
        }

        showHideMoreLink();
          $(window).resize(showHideMoreLink);
      });


      // Drupal compels me to unbind clicks otherwise double clicks occur
      $subcategoryListExpander.unbind('click').click(function(e){
        e.stopPropagation();
        e.preventDefault();

        // Checks to see if the container has been expand or not by comparing initial outerHeight to current outerHeight
        if($subcategoryListContainer.outerHeight() > $subcategoryListContainerHeight) {
          $subcategoryListContainer.removeClass('ama__subcategory-exploration__list--expanded');
          $(this).removeClass('ama__subcategory-exploration__show-more--expanded');
          $subcategoryListLinkText.text('View all subcategories');
        }
        else {
          $subcategoryListContainer.addClass('ama__subcategory-exploration__list--expanded');
          $(this).addClass('ama__subcategory-exploration__show-more--expanded');
          $subcategoryListLinkText.text('View fewer subcategories');
        }
      });
    }
  };
})(jQuery, Drupal);


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
    attach: function (context, settings) {

      // Create static var for subcategory item count. To be used for determining whether recalculations are needed.
      var subcategoryExplorationColumns = 0;

      function checkSize() {
        var $subcategory = $('.ama__subcategory-exploration__subcategory');
        var $subcategoryContainer = $('.ama__subcategory-exploration-with-images__container');
        var $subcategoryTitle = $('.ama__subcategory-exploration-with-images__title');
        // We want the width minus padding so use width() instead of innerWidth().
        var subcategoryExplorationWidth = $('.ama__subcategory-exploration-with-images').width();
        // Subcategory items have max-width of 180px. This will be used for calculations instead of extracting it via jQuery calls.
        var subcategoryItemWidth = 180;
        var subcategoryTitleWidth = $subcategoryTitle.outerWidth();
        var totalGridItems = $subcategory.length + 1;
        // Start column count as lowest possible.
        var columnCount = 2;
        // Set subcategory row items to lowest that should display.
        var subcategoryItemsPerRow = Math.floor((subcategoryExplorationWidth - subcategoryTitleWidth) / subcategoryItemWidth);

        if (subcategoryItemsPerRow < 2) {
          // The minimum subcategory items per row should be two. If the variable computed to less, manually correct it.
          subcategoryItemsPerRow = 2;
          totalGridItems = totalGridItems - 1;
        } else {
          columnCount = subcategoryItemsPerRow + 1;
        }

        // Determine if changes in column count has occurred and act accordingly
        if (subcategoryExplorationColumns !== columnCount) {
          // Determine additional "filler-box" needed to create complete row
          var fillerBoxCount = columnCount - (totalGridItems % columnCount);
          fillGridRow($subcategoryContainer, fillerBoxCount);
          // Update persistent column count
          subcategoryExplorationColumns = columnCount;
        }

        // Update viewable subcategories.
        $subcategory.hide();
        $subcategory.slice(0, subcategoryItemsPerRow).css('display', 'inline-block');

        viewMore();
      }

      function viewMore() {
        var $viewLess = $('.ama__subcategory-exploration-with-images__view-less');
        var $viewMore = $('.ama__subcategory-exploration-with-images__view-all');
        var $subcategory = $('.ama__subcategory-exploration__subcategory');
        var $subcategoryContainer = $('.ama__subcategory-exploration-with-images__container');

        $viewLess.hide();
        $viewMore.show();

        $('.viewAll').click(function (e) {
          e.preventDefault();
          $subcategory.fadeIn();
          $viewMore.hide();
          $subcategoryContainer.addClass('expanded');
          $viewLess.show();

        });

        $('.viewLess').click(function (e) {
          e.preventDefault();
          $subcategory.hide();
          checkSize();
          $viewLess.hide();
          $subcategoryContainer.removeClass('expanded');
          $viewMore.show();
        });
      }


      function fillGridRow($container, count) {
        var fillerBox = '<div class="filler-box"></div>';
        // clear out current filler boxes
        var $fillerBoxes = $container.find('.filler-box');
        $fillerBoxes.remove();
        // fill out grid row
        for (var i = 0; i < count; i++) {
          $container.append(fillerBox);
        }
      }

      // run test on initial page load
      checkSize();

      // run test on resize of the window
      $(window).resize(function () {
        checkSize();
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

      // This conditional has been added to prevent basicTable plugin to selectively not run on tables
      if (!$('table').hasClass('simpleTable')) {
        $('table').basictable({
          breakpoint: 1024
        });
      }

      // this forces tables inside of the .ama__resource--schedules div to have mobile look and feel
      $('.ama__resource--schedules table').each( function() {
        $(this).basictable('start');
      });

    }
  };
})(jQuery, Drupal);

/*====== jQuery UI tabs ======*/


(function ($, Drupal) {
  Drupal.behaviors.ama_tabs = {
    attach: function (context, settings) {
      var defaultActiveTab = 0;
      var viewportWidth = window.innerWidth;
      if (viewportWidth >= 600 && $('.ama__resource-tabs').length > 0) {
        defaultActiveTab = 1;
      }

      $(".ama__tabs, .ama__resource-tabs").tabs({
        active: defaultActiveTab,
        activate: removeHighlights
      });

      // Prevent jump onclick
      $('.ui-tabs-anchor').on('click', function (e) {
        e.preventDefault();
        return false;
      });


      //Simulate click event on actual simpleTabs tab from mobile drop down.
      $('.ama__tabs-navigation--mobile select').on("selectmenuchange", function (event, ui) {
        var selectedValue = ui.item.value;
        $('a[href="#' + selectedValue + '"]').click();
      });

      // When clicking an inline resource page link referencing a tab, open referenced tab.
      $('.ama__resource-link--inline, .ama__page--resource__resource-link').on('click', function (e) {

        e.preventDefault();

        var $tabs = $('.ama__resource-tabs');
        switchTabs($tabs, this);
        // Stop bubbling and default actions
        return false;
      });

      function removeHighlights() {
        $('.ama_resource-header--highlight').removeClass('ama_resource-header--highlight');
      }

      /*
       * This function animates the browser scroll action with attention to keyboard only accessibility concerns
       *
       * @param {jQuery Object} $tabNav
       * @param {jQuery Object} $target
       */
      function smoothScroll($tabNav, tabHash, positionInTab) {
        var scrollTarget = window.innerWidth >= 1200 ? '.ama__resource-tabs__content' : 'html,body';

        // Remove previous highlights, if any
        removeHighlights();

        // Try to find target element offset, but default to zero
        var scrollPosition = 0;
        var $target;
        if (positionInTab !== undefined) {
          var tabElements = $(tabHash + ' .ama__resource-tabs__item');
          if (tabElements.length) {
            // If desired position is larger than the result set, use the last element
            if (tabElements.length <= positionInTab) {
              positionInTab = tabElements.length;
            }
            // Users are instructed to consider 1 as the first element
            var target = tabElements[positionInTab - 1];
            scrollPosition = target.offsetTop;
            // Add highlight to target
            $target = $(target).find('.ama_resource-header'); // save for use in animate() callback
            $target.addClass('ama_resource-header--highlight');
          }
        } else {
          $target = $(tabHash);
        }
        
        $(scrollTarget).animate({
          scrollTop: scrollPosition
        }, 850, function () {
          // Update focus for keyboard only navigation
          $target.attr('tabindex', '-1').focus();
        });

        // Stop bubbling and default actions
        return false;
      }

      /*
       * This function opens referenced tabs from inline links
       *
       * @param {jQuery Object} $tabObj The element which has the .tab() function attached.
       * @param {Element} link
       */
      function switchTabs($tabObj, link) {

        var linkHash = link.getAttribute("href");
        var widget = $tabObj.data('ui-tabs');

        var tabHash, positionInTab;
        var parts = linkHash.split('-');
        tabHash = parts[0];
        if (parts.length > 1) {
          positionInTab = parts[1];
        } else {
          // If old link, try to determine position from link text
          var matches = link.innerText.match(/([0-9]+)/g);
          if (matches) {
            positionInTab = matches.shift();
          }
        }

        // Ensure correct tab is active
        var tabIndex = widget._getIndex(tabHash);
        $tabObj.tabs({
          active: tabIndex
        });

        // Scroll to top of ui tabs navigation
        smoothScroll($tabObj, tabHash, positionInTab);

        // Stop bubbling and default actions
        return false;
      }
    }
  };
})(jQuery, Drupal);

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

(function ($, Drupal) {
  var verifyFields = function(form) {
    var $sections = form.find('section');
    var $inputs = $('.webform-submission-form section *').filter(':input');
    var $iconElement = $('.ama__form-steps__icon');
    var errorSections = [];

    $inputs.each(function(i, input) {
      $closestSection = $(this).closest('section').attr('data-drupal-selector').toString();
      if ($(this).prop('required') && $(this).hasClass('error')) {
        errorSections.push($closestSection);
      }
    });

    $sections.each(function(i, section) {
      if ($.inArray($(this).attr('data-drupal-selector').trim().toString(), errorSections) !== -1) {
        $(this).find($iconElement).removeClass('edit error completed').addClass('error');
      }
      else {
        $(this).find($iconElement).removeClass('edit error completed').addClass('completed');
      }
    });
    return this;
  };

  function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
  }

  function fieldIsRequired(input) {
    input.addClass('error');
    input.next().remove('.form-item--error-message');
    input.after('<div class="form-item--error-message">Field is required.</div>');
  }

  function checkField(input) {
    if (input.prop('required') && (input.val().length === 0 || input.val() === "")) {
      fieldIsRequired(input);
    }
    else {
      if (input.attr('type') === 'email' && !validateEmail(input.val())) {
        fieldIsRequired(input);
      }
      else {
        input.removeClass('error').next().remove('.form-item--error-message');
      }
    }
  }

  // Submits first page of Contact Us form on radio button selection
  $.fn.contactSubmit = function(){
    var $webform_buttons = $('.webform-submission-contact-us-form input[type="radio"]');
    $webform_buttons.bind('click', function(e) {
      $('.webform-submission-contact-us-form').submit();
    });
  }
  $.fn.contactSubmit();
  $( document ).ajaxComplete(function() {
    $.fn.contactSubmit();
  });

  // Go back to previous back is user clicks decline submit button
  $('.ama__button--decline').click(function(e) {
    e.preventDefault();

    if (document.referrer === "") {
      document.location.href='/';
    }
    else {
      history.back();
    }
  });

  var initialLoad = true;

  Drupal.behaviors.webForm = {
    detach: function (context, settings, trigger) {
      if (trigger === 'serialize') {
        initialLoad = false;
      }
    },
    attach: function (context, settings) {
      if (!initialLoad) {
        if (!context.innerText.match("Error message")) {
          $('.ama__sales-landing-page__form__heading').hide();
        }
      }

      $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
          return this.optional(element) || regexp.test(value);
        },
        "Please check your input."
      );

      // On webform submit check to see if all inputs are valid
      $('.webform-submission-form').validate({
        ignore: [],
        rules: {
          'email': {
            email: true
          },
          'telephone': {
            'regex': /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
          },
          'birth_year': {
            'regex': /^(19|20)\d{2}$/
          }
        },
        errorPlacement: function(error, element) {
          if (element.attr("type") === "checkbox") {
            error.insertAfter(element.parent().siblings().last());
          }
          else if (element.is("select")) {
            error.insertAfter(element.next());
          }
          else {
            error.insertAfter(element);
          }
        },
        invalidHandler: function(form, validator) {
          var errors = validator.numberOfInvalids();
          if (errors) {
            $('.ama__form-steps__icon').addClass('error');
          }

          if($('.js-form-type-radio').find('label.error').length !== 0) {
            $('.js-form-type-radio label.error').parents('.fieldset-wrapper').addClass('error');
          }
        }
      });

      // Check to see if inputs are valid
      $('.webform-submission-form input').change(function() {
        $('.webform-submission-form label.error').each(function() {
          if( $(this).text() !== '') {
            $('.ama__form-steps__icon').addClass('error');
          }
          else {
            $('.ama__form-steps__icon').removeClass('error');
          }
        });
      });

      // Add validation to select dropdown menus using jQuery UI
      $('.webform-submission-form select').selectmenu({
        style: 'dropdown',
        transferClasses: true,
        width: null,
        change: function() {
          $(".webform-submission-form").validate().element(this);
        }
      });

      // Copies email input values from email subscription and inserts into the other email subscription form on page
      $('.webform-submission-email-subscription-form').find('input[name=email]').keyup(function(e) {
        $('.webform-submission-email-subscription-form').find('input[name=email]').val($(this).val());
      });
    }
  };
})(jQuery, Drupal);

/*
 * @license jQuery Basictable | MIT | Jerry Low | https://www.github.com/jerrylow/basictable
 */
!function(t){t.fn.basictable=function(a){var e=function(a,e,n){a.children().each(function(){var a=t(this);if(""!==a.html()&&"&nbsp;"!==a.html()||n.showEmptyCells){for(var r=a.index(),i="",s=0;s<e.length;s++){0!=s&&(i+=": "),i+=e[s][r].text()}a.attr("data-th",i),n.contentWrap&&!a.children().hasClass("bt-content")&&a.wrapInner('<span class="bt-content" />')}else a.addClass("bt-hide")})},n=function(a,e){e.forceResponsive?null!==e.breakpoint&&t(window).width()<=e.breakpoint||null!==e.containerBreakpoint&&a.parent().width()<=e.containerBreakpoint?r(a,e):i(a,e):a.removeClass("bt").outerWidth()>a.parent().width()?r(a,e):i(a,e)},r=function(t,a){t.addClass("bt"),a.header||t.addClass("bt--no-header"),a.tableWrap&&t.parent(".bt-wrapper").addClass("active")},i=function(t,a){t.removeClass("bt bt--no-header"),a.tableWrap&&t.parent(".bt-wrapper").removeClass("active")},s=function(a,e){var n;a.removeClass("bt bt--no-header"),a.find("td").removeAttr("data-th"),e.tableWrap&&a.unwrap(),e.contentWrap&&(n=a,t.each(n.find("td"),function(){var a=t(this),e=a.children(".bt-content").html();a.html(e)})),a.removeData("basictable")};this.each(function(){var o=t(this);if(0===o.length||o.data("basictable"))return o.data("basictable")&&("destroy"==a?s(o,o.data("basictable")):"start"===a?r(o,o.data("basictable")):"stop"===a?i(o,o.data("basictable")):n(o,o.data("basictable"))),!1;var l=t.extend({},t.fn.basictable.defaults,a),b={breakpoint:l.breakpoint,containerBreakpoint:l.containerBreakpoint,contentWrap:l.contentWrap,forceResponsive:l.forceResponsive,noResize:l.noResize,tableWrap:l.tableWrap,showEmptyCells:l.showEmptyCells,header:l.header};null===b.breakpoint&&null===b.containerBreakpoint&&(b.breakpoint=568),o.data("basictable",b),function(a,n){var r=[];if(n.tableWrap&&a.wrap('<div class="bt-wrapper"></div>'),n.header){var i="";i=a.find("thead tr th").length?"thead th":a.find("tbody tr th").length?"tbody tr th":a.find("th").length?"tr:first th":"tr:first td",t.each(a.find(i),function(){var a=t(this),e=parseInt(a.attr("colspan"),10)||1,n=a.closest("tr").index();r[n]||(r[n]=[]);for(var i=0;i<e;i++)r[n].push(a)})}t.each(a.find("tbody tr"),function(){e(t(this),r,n)}),t.each(a.find("tfoot tr"),function(){e(t(this),r,n)})}(o,o.data("basictable")),b.noResize||(n(o,o.data("basictable")),t(window).bind("resize.basictable",function(){var t;(t=o).data("basictable")&&n(t,t.data("basictable"))}))})},t.fn.basictable.defaults={breakpoint:null,containerBreakpoint:null,contentWrap:!0,forceResponsive:!0,noResize:!1,tableWrap:!1,showEmptyCells:!1,header:!0}}(jQuery);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRydXBhbC1hdHRhY2gtYmVoYXZpb3JzLmpzIiwianF1ZXJ5LmlucHV0bWFzay5idW5kbGUuanMiLCJqcXVlcnkudmFsaWRhdGUuanMiLCJmaXR2aWRzLmpzIiwianF1ZXJ5LnVpLmNoZWNrTGlzdC5qcyIsImpxdWVyeS11aS5hY2NvcmRpb24ubXVsdGlwbGUuanMiLCJqcXVlcnkuc21hcnRtZW51cy5qcyIsImJvZHlTY3JvbGxMb2NrLm1pbi5qcyIsImpxdWVyeS5zdGlja3kuanMiLCJhY2NvcmRpb24uanMiLCJhbGVydC5qcyIsImJwLWNhbGN1bGF0b3IuanMiLCJjYXRlZ29yeS1jYXJvdXNlbC5qcyIsImNhdGVnb3J5LW1lbnUuanMiLCJkaXNwbGF5LXN3aXRjaC5qcyIsImZvcm0taXRlbXMuanMiLCJmb3JtLXZhbGlkYXRlLmpzIiwiZ2F0ZS5qcyIsImluaXQuanMiLCJqdW1wLW1lbnUuanMiLCJtYWluLW5hdmlnYXRpb24uanMiLCJuYXYuanMiLCJwZW9wbGUtbGlzdGluZy5qcyIsInJlc291cmNlLmpzIiwic2VhcmNoLWNoZWNrYm94LmpzIiwic2lnbi1pbi1kcm9wZG93bi5qcyIsInN1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLmpzIiwic3ViY2F0ZWdvcnkuanMiLCJ0YWJsZXMuanMiLCJ0YWJzLmpzIiwid2F5ZmluZGVyLmpzIiwid2ViZm9ybXMuanMiLCJ2ZW5kb3IvanF1ZXJ5LmJhc2ljdGFibGUubWluLmpzIiwidmVuZG9yL2pxdWVyeS5jb29raWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3ekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzUvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbHNDQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIGhlbHBlciBzY3JpcHQgdGhhdCBtaW1pY3MgdGhlIERydXBhbCBKYXZhc2NyaXB0IEFQSS5cbiAqXG4gKiBUaGlzIGFsbG93cyBmb3Igc2NyaXB0cyB0byBiZSB3cml0dGVuIGxpa2UgdGhleSB3b3VsZCBmb3IgRHJ1cGFsIChieVxuICogYXR0YWNoaW5nIGJlaGF2aW9ycykgaW4gdGhlIHN0eWxlZ3VpZGUuIEFzIGEgcmVzdWx0LCBzY3JpcHRzIGZ1bmN0aW9uXG4gKiBwcm9wZXJseSBmb3IgdGhlIHN0eWxlZ3VpZGUgYW5kIG1heSBzaW1wbHkgYmUgc3ltbGlua2VkIHRvIHRoZSAvdGhlbWVzXG4gKiBkaXJlY3RvcnkgaW4gRHJ1cGFsLlxuICpcbiAqIGZyb20gIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpcm5ldC9idXRsZXIvYmxvYi83YzBjZWE1ZjA0YmY5YWQzNzJmYmRmZmU2NGNjZWJjNDc3YjEzZGM0L1NUWUxFR1VJREVfVEVNUExBVEUvc291cmNlL2NvZGUvbGlicmFyaWVzL2RydXBhbC1hdHRhY2gtYmVoYXZpb3JzLmpzXG4gKi9cblxud2luZG93LkRydXBhbCA9IHtiZWhhdmlvcnM6IHt9LCBsb2NhbGU6IHt9fTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gIERydXBhbC5hdHRhY2hCZWhhdmlvcnMgPSBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICBjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzIHx8IHt9O1xuICAgIHZhciBiZWhhdmlvcnMgPSBEcnVwYWwuYmVoYXZpb3JzO1xuICAgIC8vIEV4ZWN1dGUgYWxsIG9mIHRoZW0uXG4gICAgZm9yICh2YXIgaSBpbiBiZWhhdmlvcnMpIHtcbiAgICAgIGlmIChiZWhhdmlvcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdHlwZW9mIGJlaGF2aW9yc1tpXS5hdHRhY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gRG9uJ3Qgc3RvcCB0aGUgZXhlY3V0aW9uIG9mIGJlaGF2aW9ycyBpbiBjYXNlIG9mIGFuIGVycm9yLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIGJlaGF2aW9yc1tpXS5hdHRhY2goY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gQXR0YWNoIGFsbCBiZWhhdmlvcnMuXG4gICQoJ2RvY3VtZW50JykucmVhZHkoZnVuY3Rpb24gKCkgeyBEcnVwYWwuYXR0YWNoQmVoYXZpb3JzKGRvY3VtZW50LCB7fSk7IH0pO1xufSkoalF1ZXJ5KTtcbiIsIi8qIVxuKiBqcXVlcnkuaW5wdXRtYXNrLmJ1bmRsZS5qc1xuKiBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuKiBDb3B5cmlnaHQgKGMpIDIwMTAgLSAyMDE4IFJvYmluIEhlcmJvdHNcbiogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocClcbiogVmVyc2lvbjogNC4wLjAtYmV0YS41MVxuKi9cblxuIWZ1bmN0aW9uKG1vZHVsZXMpIHtcbiAgICB2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuICAgIGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbiAgICAgICAgaWYgKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSByZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiAgICAgICAgdmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuICAgICAgICAgICAgaTogbW9kdWxlSWQsXG4gICAgICAgICAgICBsOiAhMSxcbiAgICAgICAgICAgIGV4cG9ydHM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSwgXG4gICAgICAgIG1vZHVsZS5sID0gITAsIG1vZHVsZS5leHBvcnRzO1xuICAgIH1cbiAgICBfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiAgICAgICAgX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpIHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6ICExLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICAgICAgICBnZXQ6IGdldHRlclxuICAgICAgICB9KTtcbiAgICB9LCBfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiAgICAgICAgdmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZS5kZWZhdWx0O1xuICAgICAgICB9IDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgXCJhXCIsIGdldHRlciksIGdldHRlcjtcbiAgICB9LCBfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgfSwgX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIiwgX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcbn0oWyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXywgZmFjdG9yeTtcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gICAgZmFjdG9yeSA9IGZ1bmN0aW9uKCQpIHtcbiAgICAgICAgcmV0dXJuICQ7XG4gICAgfSwgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXyA9IFsgX193ZWJwYWNrX3JlcXVpcmVfXygyKSBdLCB2b2lkIDAgPT09IChfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXyA9IGZhY3RvcnkpID8gX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLmFwcGx5KGV4cG9ydHMsIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18pIDogX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fKSB8fCAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyk7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXywgZmFjdG9yeSwgX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9IDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgICBmYWN0b3J5ID0gZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQsIG1vYmlsZSA9IGlzSW5wdXRFdmVudFN1cHBvcnRlZChcInRvdWNoc3RhcnRcIiksIGllbW9iaWxlID0gL2llbW9iaWxlL2kudGVzdCh1YSksIGlwaG9uZSA9IC9pcGhvbmUvaS50ZXN0KHVhKSAmJiAhaWVtb2JpbGU7XG4gICAgICAgIGZ1bmN0aW9uIElucHV0bWFzayhhbGlhcywgb3B0aW9ucywgaW50ZXJuYWwpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBJbnB1dG1hc2spKSByZXR1cm4gbmV3IElucHV0bWFzayhhbGlhcywgb3B0aW9ucywgaW50ZXJuYWwpO1xuICAgICAgICAgICAgdGhpcy5lbCA9IHVuZGVmaW5lZCwgdGhpcy5ldmVudHMgPSB7fSwgdGhpcy5tYXNrc2V0ID0gdW5kZWZpbmVkLCB0aGlzLnJlZnJlc2hWYWx1ZSA9ICExLCBcbiAgICAgICAgICAgICEwICE9PSBpbnRlcm5hbCAmJiAoJC5pc1BsYWluT2JqZWN0KGFsaWFzKSA/IG9wdGlvbnMgPSBhbGlhcyA6IChvcHRpb25zID0gb3B0aW9ucyB8fCB7fSwgXG4gICAgICAgICAgICBhbGlhcyAmJiAob3B0aW9ucy5hbGlhcyA9IGFsaWFzKSksIHRoaXMub3B0cyA9ICQuZXh0ZW5kKCEwLCB7fSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucyksIFxuICAgICAgICAgICAgdGhpcy5ub01hc2tzQ2FjaGUgPSBvcHRpb25zICYmIG9wdGlvbnMuZGVmaW5pdGlvbnMgIT09IHVuZGVmaW5lZCwgdGhpcy51c2VyT3B0aW9ucyA9IG9wdGlvbnMgfHwge30sIFxuICAgICAgICAgICAgdGhpcy5pc1JUTCA9IHRoaXMub3B0cy5udW1lcmljSW5wdXQsIHJlc29sdmVBbGlhcyh0aGlzLm9wdHMuYWxpYXMsIG9wdGlvbnMsIHRoaXMub3B0cykpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJlc29sdmVBbGlhcyhhbGlhc1N0ciwgb3B0aW9ucywgb3B0cykge1xuICAgICAgICAgICAgdmFyIGFsaWFzRGVmaW5pdGlvbiA9IElucHV0bWFzay5wcm90b3R5cGUuYWxpYXNlc1thbGlhc1N0cl07XG4gICAgICAgICAgICByZXR1cm4gYWxpYXNEZWZpbml0aW9uID8gKGFsaWFzRGVmaW5pdGlvbi5hbGlhcyAmJiByZXNvbHZlQWxpYXMoYWxpYXNEZWZpbml0aW9uLmFsaWFzLCB1bmRlZmluZWQsIG9wdHMpLCBcbiAgICAgICAgICAgICQuZXh0ZW5kKCEwLCBvcHRzLCBhbGlhc0RlZmluaXRpb24pLCAkLmV4dGVuZCghMCwgb3B0cywgb3B0aW9ucyksICEwKSA6IChudWxsID09PSBvcHRzLm1hc2sgJiYgKG9wdHMubWFzayA9IGFsaWFzU3RyKSwgXG4gICAgICAgICAgICAhMSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVNYXNrU2V0KG9wdHMsIG5vY2FjaGUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlTWFzayhtYXNrLCBtZXRhZGF0YSwgb3B0cykge1xuICAgICAgICAgICAgICAgIHZhciByZWdleE1hc2sgPSAhMTtcbiAgICAgICAgICAgICAgICBpZiAobnVsbCAhPT0gbWFzayAmJiBcIlwiICE9PSBtYXNrIHx8ICgocmVnZXhNYXNrID0gbnVsbCAhPT0gb3B0cy5yZWdleCkgPyBtYXNrID0gKG1hc2sgPSBvcHRzLnJlZ2V4KS5yZXBsYWNlKC9eKFxcXikoLiopKFxcJCkkLywgXCIkMlwiKSA6IChyZWdleE1hc2sgPSAhMCwgXG4gICAgICAgICAgICAgICAgbWFzayA9IFwiLipcIikpLCAxID09PSBtYXNrLmxlbmd0aCAmJiAhMSA9PT0gb3B0cy5ncmVlZHkgJiYgMCAhPT0gb3B0cy5yZXBlYXQgJiYgKG9wdHMucGxhY2Vob2xkZXIgPSBcIlwiKSwgXG4gICAgICAgICAgICAgICAgb3B0cy5yZXBlYXQgPiAwIHx8IFwiKlwiID09PSBvcHRzLnJlcGVhdCB8fCBcIitcIiA9PT0gb3B0cy5yZXBlYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcGVhdFN0YXJ0ID0gXCIqXCIgPT09IG9wdHMucmVwZWF0ID8gMCA6IFwiK1wiID09PSBvcHRzLnJlcGVhdCA/IDEgOiBvcHRzLnJlcGVhdDtcbiAgICAgICAgICAgICAgICAgICAgbWFzayA9IG9wdHMuZ3JvdXBtYXJrZXJbMF0gKyBtYXNrICsgb3B0cy5ncm91cG1hcmtlclsxXSArIG9wdHMucXVhbnRpZmllcm1hcmtlclswXSArIHJlcGVhdFN0YXJ0ICsgXCIsXCIgKyBvcHRzLnJlcGVhdCArIG9wdHMucXVhbnRpZmllcm1hcmtlclsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1hc2tzZXREZWZpbml0aW9uLCBtYXNrZGVmS2V5ID0gcmVnZXhNYXNrID8gXCJyZWdleF9cIiArIG9wdHMucmVnZXggOiBvcHRzLm51bWVyaWNJbnB1dCA/IG1hc2suc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiBtYXNrO1xuICAgICAgICAgICAgICAgIHJldHVybiBJbnB1dG1hc2sucHJvdG90eXBlLm1hc2tzQ2FjaGVbbWFza2RlZktleV0gPT09IHVuZGVmaW5lZCB8fCAhMCA9PT0gbm9jYWNoZSA/IChtYXNrc2V0RGVmaW5pdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgbWFzazogbWFzayxcbiAgICAgICAgICAgICAgICAgICAgbWFza1Rva2VuOiBJbnB1dG1hc2sucHJvdG90eXBlLmFuYWx5c2VNYXNrKG1hc2ssIHJlZ2V4TWFzaywgb3B0cyksXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkUG9zaXRpb25zOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgX2J1ZmZlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBidWZmZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgdGVzdHM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBleGNsdWRlczoge30sXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgbWFza0xlbmd0aDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSwgITAgIT09IG5vY2FjaGUgJiYgKElucHV0bWFzay5wcm90b3R5cGUubWFza3NDYWNoZVttYXNrZGVmS2V5XSA9IG1hc2tzZXREZWZpbml0aW9uLCBcbiAgICAgICAgICAgICAgICBtYXNrc2V0RGVmaW5pdGlvbiA9ICQuZXh0ZW5kKCEwLCB7fSwgSW5wdXRtYXNrLnByb3RvdHlwZS5tYXNrc0NhY2hlW21hc2tkZWZLZXldKSkpIDogbWFza3NldERlZmluaXRpb24gPSAkLmV4dGVuZCghMCwge30sIElucHV0bWFzay5wcm90b3R5cGUubWFza3NDYWNoZVttYXNrZGVmS2V5XSksIFxuICAgICAgICAgICAgICAgIG1hc2tzZXREZWZpbml0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRzLm1hc2spICYmIChvcHRzLm1hc2sgPSBvcHRzLm1hc2sob3B0cykpLCAkLmlzQXJyYXkob3B0cy5tYXNrKSkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLm1hc2subGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobnVsbCA9PT0gb3B0cy5rZWVwU3RhdGljKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmtlZXBTdGF0aWMgPSBcImF1dG9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0cy5tYXNrLmxlbmd0aDsgaSsrKSBpZiAob3B0cy5tYXNrW2ldLmNoYXJBdCgwKSAhPT0gb3B0cy5tYXNrWzBdLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMua2VlcFN0YXRpYyA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbHRNYXNrID0gb3B0cy5ncm91cG1hcmtlclswXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuZWFjaChvcHRzLmlzUlRMID8gb3B0cy5tYXNrLnJldmVyc2UoKSA6IG9wdHMubWFzaywgZnVuY3Rpb24obmR4LCBtc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdE1hc2subGVuZ3RoID4gMSAmJiAoYWx0TWFzayArPSBvcHRzLmdyb3VwbWFya2VyWzFdICsgb3B0cy5hbHRlcm5hdG9ybWFya2VyICsgb3B0cy5ncm91cG1hcmtlclswXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbXNrLm1hc2sgPT09IHVuZGVmaW5lZCB8fCAkLmlzRnVuY3Rpb24obXNrLm1hc2spID8gYWx0TWFzayArPSBtc2sgOiBhbHRNYXNrICs9IG1zay5tYXNrO1xuICAgICAgICAgICAgICAgICAgICB9KSwgZ2VuZXJhdGVNYXNrKGFsdE1hc2sgKz0gb3B0cy5ncm91cG1hcmtlclsxXSwgb3B0cy5tYXNrLCBvcHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0cy5tYXNrID0gb3B0cy5tYXNrLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9wdHMubWFzayAmJiBvcHRzLm1hc2subWFzayAhPT0gdW5kZWZpbmVkICYmICEkLmlzRnVuY3Rpb24ob3B0cy5tYXNrLm1hc2spID8gZ2VuZXJhdGVNYXNrKG9wdHMubWFzay5tYXNrLCBvcHRzLm1hc2ssIG9wdHMpIDogZ2VuZXJhdGVNYXNrKG9wdHMubWFzaywgb3B0cy5tYXNrLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpc0lucHV0RXZlbnRTdXBwb3J0ZWQoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiksIGV2TmFtZSA9IFwib25cIiArIGV2ZW50TmFtZSwgaXNTdXBwb3J0ZWQgPSBldk5hbWUgaW4gZWw7XG4gICAgICAgICAgICByZXR1cm4gaXNTdXBwb3J0ZWQgfHwgKGVsLnNldEF0dHJpYnV0ZShldk5hbWUsIFwicmV0dXJuO1wiKSwgaXNTdXBwb3J0ZWQgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGVsW2V2TmFtZV0pLCBcbiAgICAgICAgICAgIGVsID0gbnVsbCwgaXNTdXBwb3J0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbWFza1Njb3BlKGFjdGlvbk9iaiwgbWFza3NldCwgb3B0cykge1xuICAgICAgICAgICAgbWFza3NldCA9IG1hc2tzZXQgfHwgdGhpcy5tYXNrc2V0LCBvcHRzID0gb3B0cyB8fCB0aGlzLm9wdHM7XG4gICAgICAgICAgICB2YXIgdW5kb1ZhbHVlLCAkZWwsIG1heExlbmd0aCwgY29sb3JNYXNrLCBpbnB1dG1hc2sgPSB0aGlzLCBlbCA9IHRoaXMuZWwsIGlzUlRMID0gdGhpcy5pc1JUTCwgc2tpcEtleVByZXNzRXZlbnQgPSAhMSwgc2tpcElucHV0RXZlbnQgPSAhMSwgaWdub3JhYmxlID0gITEsIG1vdXNlRW50ZXIgPSAhMSwgdHJhY2tDYXJldCA9ICExO1xuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TWFza1RlbXBsYXRlKGJhc2VPbklucHV0LCBtaW5pbWFsUG9zLCBpbmNsdWRlTW9kZSwgbm9KaXQsIGNsZWFyT3B0aW9uYWxUYWlsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdyZWVkeSA9IG9wdHMuZ3JlZWR5O1xuICAgICAgICAgICAgICAgIGNsZWFyT3B0aW9uYWxUYWlsICYmIChvcHRzLmdyZWVkeSA9ICExKSwgbWluaW1hbFBvcyA9IG1pbmltYWxQb3MgfHwgMDtcbiAgICAgICAgICAgICAgICB2YXIgbmR4SW50bHpyLCB0ZXN0LCB0ZXN0UG9zLCBtYXNrVGVtcGxhdGUgPSBbXSwgcG9zID0gMCwgbHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gYmFzZU9uSW5wdXQgJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10pIHRlc3QgPSAodGVzdFBvcyA9ICFjbGVhck9wdGlvbmFsVGFpbCB8fCAhMCAhPT0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10ubWF0Y2gub3B0aW9uYWxpdHkgfHwgITAgIT09IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdLmdlbmVyYXRlZElucHV0ICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdLmlucHV0ICE9IG9wdHMuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciB8fCBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zICsgMV0gIT09IHVuZGVmaW5lZCA/IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdIDogZGV0ZXJtaW5lVGVzdFRlbXBsYXRlKHBvcywgZ2V0VGVzdHMocG9zLCBuZHhJbnRsenIsIHBvcyAtIDEpKSkubWF0Y2gsIFxuICAgICAgICAgICAgICAgICAgICBuZHhJbnRsenIgPSB0ZXN0UG9zLmxvY2F0b3Iuc2xpY2UoKSwgbWFza1RlbXBsYXRlLnB1c2goITAgPT09IGluY2x1ZGVNb2RlID8gdGVzdFBvcy5pbnB1dCA6ICExID09PSBpbmNsdWRlTW9kZSA/IHRlc3QubmF0aXZlRGVmIDogZ2V0UGxhY2Vob2xkZXIocG9zLCB0ZXN0KSk7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdCA9ICh0ZXN0UG9zID0gZ2V0VGVzdFRlbXBsYXRlKHBvcywgbmR4SW50bHpyLCBwb3MgLSAxKSkubWF0Y2gsIG5keEludGx6ciA9IHRlc3RQb3MubG9jYXRvci5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGppdE1hc2tpbmcgPSAhMCAhPT0gbm9KaXQgJiYgKCExICE9PSBvcHRzLmppdE1hc2tpbmcgPyBvcHRzLmppdE1hc2tpbmcgOiB0ZXN0LmppdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAoITEgPT09IGppdE1hc2tpbmcgfHwgaml0TWFza2luZyA9PT0gdW5kZWZpbmVkIHx8IHBvcyA8IGx2cCB8fCBcIm51bWJlclwiID09IHR5cGVvZiBqaXRNYXNraW5nICYmIGlzRmluaXRlKGppdE1hc2tpbmcpICYmIGppdE1hc2tpbmcgPiBwb3MpICYmIG1hc2tUZW1wbGF0ZS5wdXNoKCExID09PSBpbmNsdWRlTW9kZSA/IHRlc3QubmF0aXZlRGVmIDogZ2V0UGxhY2Vob2xkZXIocG9zLCB0ZXN0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXCJhdXRvXCIgPT09IG9wdHMua2VlcFN0YXRpYyAmJiB0ZXN0Lm5ld0Jsb2NrTWFya2VyICYmIG51bGwgIT09IHRlc3QuZm4gJiYgKG9wdHMua2VlcFN0YXRpYyA9IHBvcyAtIDEpLCBcbiAgICAgICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoKG1heExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IHBvcyA8IG1heExlbmd0aCkgJiYgKG51bGwgIT09IHRlc3QuZm4gfHwgXCJcIiAhPT0gdGVzdC5kZWYpIHx8IG1pbmltYWxQb3MgPiBwb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiID09PSBtYXNrVGVtcGxhdGVbbWFza1RlbXBsYXRlLmxlbmd0aCAtIDFdICYmIG1hc2tUZW1wbGF0ZS5wb3AoKSwgITEgPT09IGluY2x1ZGVNb2RlICYmIGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoICE9PSB1bmRlZmluZWQgfHwgKGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoID0gcG9zIC0gMSksIFxuICAgICAgICAgICAgICAgIG9wdHMuZ3JlZWR5ID0gZ3JlZWR5LCBtYXNrVGVtcGxhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRNYXNrU2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXNrc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcmVzZXRNYXNrU2V0KHNvZnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFza3NldCA9IGdldE1hc2tTZXQoKTtcbiAgICAgICAgICAgICAgICBtYXNrc2V0LmJ1ZmZlciA9IHVuZGVmaW5lZCwgITAgIT09IHNvZnQgJiYgKG1hc2tzZXQudmFsaWRQb3NpdGlvbnMgPSB7fSwgbWFza3NldC5wID0gMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRMYXN0VmFsaWRQb3NpdGlvbihjbG9zZXN0VG8sIHN0cmljdCwgdmFsaWRQb3NpdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmVmb3JlID0gLTEsIGFmdGVyID0gLTEsIHZhbGlkcyA9IHZhbGlkUG9zaXRpb25zIHx8IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwb3NOZHggaW4gY2xvc2VzdFRvID09PSB1bmRlZmluZWQgJiYgKGNsb3Nlc3RUbyA9IC0xKSwgdmFsaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwc05keCA9IHBhcnNlSW50KHBvc05keCk7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkc1twc05keF0gJiYgKHN0cmljdCB8fCAhMCAhPT0gdmFsaWRzW3BzTmR4XS5nZW5lcmF0ZWRJbnB1dCkgJiYgKHBzTmR4IDw9IGNsb3Nlc3RUbyAmJiAoYmVmb3JlID0gcHNOZHgpLCBcbiAgICAgICAgICAgICAgICAgICAgcHNOZHggPj0gY2xvc2VzdFRvICYmIChhZnRlciA9IHBzTmR4KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAtMSA9PT0gYmVmb3JlIHx8IGJlZm9yZSA9PSBjbG9zZXN0VG8gPyBhZnRlciA6IC0xID09IGFmdGVyID8gYmVmb3JlIDogY2xvc2VzdFRvIC0gYmVmb3JlIDwgYWZ0ZXIgLSBjbG9zZXN0VG8gPyBiZWZvcmUgOiBhZnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRldGVybWluZVRlc3RUZW1wbGF0ZShwb3MsIHRlc3RzLCBndWVzc05leHRCZXN0KSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdGVzdFBvcywgYWx0VGVzdCA9IGdldFRlc3QocG9zID0gcG9zID4gMCA/IHBvcyAtIDEgOiAwLCB0ZXN0cyksIGFsdEFyciA9IGFsdFRlc3QuYWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCA/IGFsdFRlc3QubG9jYXRvclthbHRUZXN0LmFsdGVybmF0aW9uXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKSA6IFtdLCBuZHggPSAwOyBuZHggPCB0ZXN0cy5sZW5ndGggJiYgKCEoKHRlc3RQb3MgPSB0ZXN0c1tuZHhdKS5tYXRjaCAmJiAob3B0cy5ncmVlZHkgJiYgITAgIT09IHRlc3RQb3MubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyIHx8ICghMSA9PT0gdGVzdFBvcy5tYXRjaC5vcHRpb25hbGl0eSB8fCAhMSA9PT0gdGVzdFBvcy5tYXRjaC5uZXdCbG9ja01hcmtlcikgJiYgITAgIT09IHRlc3RQb3MubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyKSAmJiAoYWx0VGVzdC5hbHRlcm5hdGlvbiA9PT0gdW5kZWZpbmVkIHx8IGFsdFRlc3QuYWx0ZXJuYXRpb24gIT09IHRlc3RQb3MuYWx0ZXJuYXRpb24gfHwgdGVzdFBvcy5sb2NhdG9yW2FsdFRlc3QuYWx0ZXJuYXRpb25dICE9PSB1bmRlZmluZWQgJiYgY2hlY2tBbHRlcm5hdGlvbk1hdGNoKHRlc3RQb3MubG9jYXRvclthbHRUZXN0LmFsdGVybmF0aW9uXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKSwgYWx0QXJyKSkpIHx8ICEwID09PSBndWVzc05leHRCZXN0ICYmIChudWxsICE9PSB0ZXN0UG9zLm1hdGNoLmZuIHx8IC9bMC05YS1iQS1aXS8udGVzdCh0ZXN0UG9zLm1hdGNoLmRlZikpKTsgbmR4KyspIDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVzdFBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldERlY2lzaW9uVGFrZXIodHN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlY2lzaW9uVGFrZXIgPSB0c3QubG9jYXRvclt0c3QuYWx0ZXJuYXRpb25dO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiID09IHR5cGVvZiBkZWNpc2lvblRha2VyICYmIGRlY2lzaW9uVGFrZXIubGVuZ3RoID4gMCAmJiAoZGVjaXNpb25UYWtlciA9IGRlY2lzaW9uVGFrZXIuc3BsaXQoXCIsXCIpWzBdKSwgXG4gICAgICAgICAgICAgICAgZGVjaXNpb25UYWtlciAhPT0gdW5kZWZpbmVkID8gZGVjaXNpb25UYWtlci50b1N0cmluZygpIDogXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldExvY2F0b3IodHN0LCBhbGlnbikge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGxvY2F0b3IgPSAodHN0LmFsdGVybmF0aW9uICE9IHVuZGVmaW5lZCA/IHRzdC5tbG9jW2dldERlY2lzaW9uVGFrZXIodHN0KV0gOiB0c3QubG9jYXRvcikuam9pbihcIlwiKTsgbG9jYXRvci5sZW5ndGggPCBhbGlnbjsgKSBsb2NhdG9yICs9IFwiMFwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VGVzdFRlbXBsYXRlKHBvcywgbmR4SW50bHpyLCB0c3RQcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSB8fCBkZXRlcm1pbmVUZXN0VGVtcGxhdGUocG9zLCBnZXRUZXN0cyhwb3MsIG5keEludGx6ciA/IG5keEludGx6ci5zbGljZSgpIDogbmR4SW50bHpyLCB0c3RQcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VGVzdChwb3MsIHRlc3RzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdID8gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10gOiAodGVzdHMgfHwgZ2V0VGVzdHMocG9zKSlbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBwb3NpdGlvbkNhbk1hdGNoRGVmaW5pdGlvbihwb3MsIGRlZikge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHZhbGlkID0gITEsIHRlc3RzID0gZ2V0VGVzdHMocG9zKSwgdG5keCA9IDA7IHRuZHggPCB0ZXN0cy5sZW5ndGg7IHRuZHgrKykgaWYgKHRlc3RzW3RuZHhdLm1hdGNoICYmIHRlc3RzW3RuZHhdLm1hdGNoLmRlZiA9PT0gZGVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gITA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRUZXN0cyhwb3MsIG5keEludGx6ciwgdHN0UHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGF0ZXN0TWF0Y2gsIG1hc2tUb2tlbnMgPSBnZXRNYXNrU2V0KCkubWFza1Rva2VuLCB0ZXN0UG9zID0gbmR4SW50bHpyID8gdHN0UHMgOiAwLCBuZHhJbml0aWFsaXplciA9IG5keEludGx6ciA/IG5keEludGx6ci5zbGljZSgpIDogWyAwIF0sIG1hdGNoZXMgPSBbXSwgaW5zZXJ0U3RvcCA9ICExLCBjYWNoZURlcGVuZGVuY3kgPSBuZHhJbnRsenIgPyBuZHhJbnRsenIuam9pbihcIlwiKSA6IFwiXCI7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZVRlc3RGcm9tVG9rZW4obWFza1Rva2VuLCBuZHhJbml0aWFsaXplciwgbG9vcE5keCwgcXVhbnRpZmllclJlY3Vyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlTWF0Y2gobWF0Y2gsIGxvb3BOZHgsIHF1YW50aWZpZXJSZWN1cnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIHRva2VuR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3RNYXRjaCA9IDAgPT09ICQuaW5BcnJheShsYXRlc3RNYXRjaCwgdG9rZW5Hcm91cC5tYXRjaGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlyc3RNYXRjaCB8fCAkLmVhY2godG9rZW5Hcm91cC5tYXRjaGVzLCBmdW5jdGlvbihuZHgsIG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gbWF0Y2guaXNRdWFudGlmaWVyID8gZmlyc3RNYXRjaCA9IGlzRmlyc3RNYXRjaChsYXRlc3RNYXRjaCwgdG9rZW5Hcm91cC5tYXRjaGVzW25keCAtIDFdKSA6ICEwID09PSBtYXRjaC5pc09wdGlvbmFsID8gZmlyc3RNYXRjaCA9IGlzRmlyc3RNYXRjaChsYXRlc3RNYXRjaCwgbWF0Y2gpIDogITAgPT09IG1hdGNoLmlzQWx0ZXJuYXRlICYmIChmaXJzdE1hdGNoID0gaXNGaXJzdE1hdGNoKGxhdGVzdE1hdGNoLCBtYXRjaCkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RNYXRjaCkgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBmaXJzdE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZU5keEluaXRpYWxpemVyKHBvcywgYWx0ZXJuYXRlTmR4LCB0YXJnZXRBbHRlcm5hdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZXN0TWF0Y2gsIGluZGV4UG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZ2V0TWFza1NldCgpLnRlc3RzW3Bvc10gfHwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10pICYmICQuZWFjaChnZXRNYXNrU2V0KCkudGVzdHNbcG9zXSB8fCBbIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdIF0sIGZ1bmN0aW9uKG5keCwgbG1udCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG1udC5tbG9jW2FsdGVybmF0ZU5keF0pIHJldHVybiBiZXN0TWF0Y2ggPSBsbW50LCAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsdGVybmF0aW9uID0gdGFyZ2V0QWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCA/IHRhcmdldEFsdGVybmF0aW9uIDogbG1udC5hbHRlcm5hdGlvbiwgbmR4UG9zID0gbG1udC5sb2NhdG9yW2FsdGVybmF0aW9uXSAhPT0gdW5kZWZpbmVkID8gbG1udC5sb2NhdG9yW2FsdGVybmF0aW9uXS50b1N0cmluZygpLmluZGV4T2YoYWx0ZXJuYXRlTmR4KSA6IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5kZXhQb3MgPT09IHVuZGVmaW5lZCB8fCBuZHhQb3MgPCBpbmRleFBvcykgJiYgLTEgIT09IG5keFBvcyAmJiAoYmVzdE1hdGNoID0gbG1udCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4UG9zID0gbmR4UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgYmVzdE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZXN0TWF0Y2hBbHRJbmRleCA9IGJlc3RNYXRjaC5sb2NhdG9yW2Jlc3RNYXRjaC5hbHRlcm5hdGlvbl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoYmVzdE1hdGNoLm1sb2NbYWx0ZXJuYXRlTmR4XSB8fCBiZXN0TWF0Y2gubWxvY1tiZXN0TWF0Y2hBbHRJbmRleF0gfHwgYmVzdE1hdGNoLmxvY2F0b3IpLnNsaWNlKCh0YXJnZXRBbHRlcm5hdGlvbiAhPT0gdW5kZWZpbmVkID8gdGFyZ2V0QWx0ZXJuYXRpb24gOiBiZXN0TWF0Y2guYWx0ZXJuYXRpb24pICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRBbHRlcm5hdGlvbiAhPT0gdW5kZWZpbmVkID8gcmVzb2x2ZU5keEluaXRpYWxpemVyKHBvcywgYWx0ZXJuYXRlTmR4KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlzU3Vic2V0T2Yoc291cmNlLCB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBleHBhbmQocGF0dGVybikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzdGFydCwgZW5kLCBleHBhbmRlZCA9IFtdLCBpID0gMCwgbCA9IHBhdHRlcm4ubGVuZ3RoOyBpIDwgbDsgaSsrKSBpZiAoXCItXCIgPT09IHBhdHRlcm4uY2hhckF0KGkpKSBmb3IgKGVuZCA9IHBhdHRlcm4uY2hhckNvZGVBdChpICsgMSk7ICsrc3RhcnQgPCBlbmQ7ICkgZXhwYW5kZWQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKHN0YXJ0KSk7IGVsc2Ugc3RhcnQgPSBwYXR0ZXJuLmNoYXJDb2RlQXQoaSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZC5wdXNoKHBhdHRlcm4uY2hhckF0KGkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4cGFuZGVkLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLnJlZ2V4ICYmIG51bGwgIT09IHNvdXJjZS5tYXRjaC5mbiAmJiBudWxsICE9PSB0YXJnZXQubWF0Y2guZm4gPyAtMSAhPT0gZXhwYW5kKHRhcmdldC5tYXRjaC5kZWYucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcIikpLmluZGV4T2YoZXhwYW5kKHNvdXJjZS5tYXRjaC5kZWYucmVwbGFjZSgvW1xcW1xcXV0vZywgXCJcIikpKSA6IHNvdXJjZS5tYXRjaC5kZWYgPT09IHRhcmdldC5tYXRjaC5uYXRpdmVEZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZXRNZXJnZUxvY2F0b3JzKHRhcmdldE1hdGNoLCBhbHRNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbHRNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldE1hdGNoLmFsdGVybmF0aW9uID09PSBhbHRNYXRjaC5hbHRlcm5hdGlvbiAmJiAtMSA9PT0gdGFyZ2V0TWF0Y2gubG9jYXRvclt0YXJnZXRNYXRjaC5hbHRlcm5hdGlvbl0udG9TdHJpbmcoKS5pbmRleE9mKGFsdE1hdGNoLmxvY2F0b3JbYWx0TWF0Y2guYWx0ZXJuYXRpb25dKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaC5tbG9jID0gdGFyZ2V0TWF0Y2gubWxvYyB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvY05keCA9IHRhcmdldE1hdGNoLmxvY2F0b3JbdGFyZ2V0TWF0Y2guYWx0ZXJuYXRpb25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jTmR4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBsb2NOZHggJiYgKGxvY05keCA9IGxvY05keC5zcGxpdChcIixcIilbMF0pLCB0YXJnZXRNYXRjaC5tbG9jW2xvY05keF0gPT09IHVuZGVmaW5lZCAmJiAodGFyZ2V0TWF0Y2gubWxvY1tsb2NOZHhdID0gdGFyZ2V0TWF0Y2gubG9jYXRvci5zbGljZSgpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRNYXRjaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbmR4IGluIGFsdE1hdGNoLm1sb2MpIFwic3RyaW5nXCIgPT0gdHlwZW9mIG5keCAmJiAobmR4ID0gbmR4LnNwbGl0KFwiLFwiKVswXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoLm1sb2NbbmR4XSA9PT0gdW5kZWZpbmVkICYmICh0YXJnZXRNYXRjaC5tbG9jW25keF0gPSBhbHRNYXRjaC5tbG9jW25keF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoLmxvY2F0b3JbdGFyZ2V0TWF0Y2guYWx0ZXJuYXRpb25dID0gT2JqZWN0LmtleXModGFyZ2V0TWF0Y2gubWxvYykuam9pbihcIixcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2guYWx0ZXJuYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UG9zID4gNWUzKSB0aHJvdyBcIklucHV0bWFzazogVGhlcmUgaXMgcHJvYmFibHkgYW4gZXJyb3IgaW4geW91ciBtYXNrIGRlZmluaXRpb24gb3IgaW4gdGhlIGNvZGUuIENyZWF0ZSBhbiBpc3N1ZSBvbiBnaXRodWIgd2l0aCBhbiBleGFtcGxlIG9mIHRoZSBtYXNrIHlvdSBhcmUgdXNpbmcuIFwiICsgZ2V0TWFza1NldCgpLm1hc2s7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFBvcyA9PT0gcG9zICYmIG1hdGNoLm1hdGNoZXMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG1hdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IG1hdGNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0b3I6IGxvb3BOZHgucmV2ZXJzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNkOiBjYWNoZURlcGVuZGVuY3ksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWxvYzoge31cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaC5tYXRjaGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2guaXNHcm91cCAmJiBxdWFudGlmaWVyUmVjdXJzZSAhPT0gbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoID0gaGFuZGxlTWF0Y2gobWFza1Rva2VuLm1hdGNoZXNbJC5pbkFycmF5KG1hdGNoLCBtYXNrVG9rZW4ubWF0Y2hlcykgKyAxXSwgbG9vcE5keCkpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoLmlzT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbmFsVG9rZW4gPSBtYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoID0gcmVzb2x2ZVRlc3RGcm9tVG9rZW4obWF0Y2gsIG5keEluaXRpYWxpemVyLCBsb29wTmR4LCBxdWFudGlmaWVyUmVjdXJzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXRlc3RNYXRjaCA9IG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGggLSAxXS5tYXRjaCwgcXVhbnRpZmllclJlY3Vyc2UgIT09IHVuZGVmaW5lZCB8fCAhaXNGaXJzdE1hdGNoKGxhdGVzdE1hdGNoLCBvcHRpb25hbFRva2VuKSkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0U3RvcCA9ICEwLCB0ZXN0UG9zID0gcG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaC5pc0FsdGVybmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hbHRNYXRjaGVzLCBhbHRlcm5hdGVUb2tlbiA9IG1hdGNoLCBtYWx0ZXJuYXRlTWF0Y2hlcyA9IFtdLCBjdXJyZW50TWF0Y2hlcyA9IG1hdGNoZXMuc2xpY2UoKSwgbG9vcE5keENudCA9IGxvb3BOZHgubGVuZ3RoLCBhbHRJbmRleCA9IG5keEluaXRpYWxpemVyLmxlbmd0aCA+IDAgPyBuZHhJbml0aWFsaXplci5zaGlmdCgpIDogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtMSA9PT0gYWx0SW5kZXggfHwgXCJzdHJpbmdcIiA9PSB0eXBlb2YgYWx0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbW5keCwgY3VycmVudFBvcyA9IHRlc3RQb3MsIG5keEluaXRpYWxpemVyQ2xvbmUgPSBuZHhJbml0aWFsaXplci5zbGljZSgpLCBhbHRJbmRleEFyciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGFsdEluZGV4KSBhbHRJbmRleEFyciA9IGFsdEluZGV4LnNwbGl0KFwiLFwiKTsgZWxzZSBmb3IgKGFtbmR4ID0gMDsgYW1uZHggPCBhbHRlcm5hdGVUb2tlbi5tYXRjaGVzLmxlbmd0aDsgYW1uZHgrKykgYWx0SW5kZXhBcnIucHVzaChhbW5keC50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRNYXNrU2V0KCkuZXhjbHVkZXNbcG9zXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGFsdEluZGV4QXJyQ2xvbmUgPSBhbHRJbmRleEFyci5zbGljZSgpLCBpID0gMCwgZWwgPSBnZXRNYXNrU2V0KCkuZXhjbHVkZXNbcG9zXS5sZW5ndGg7IGkgPCBlbDsgaSsrKSBhbHRJbmRleEFyci5zcGxpY2UoYWx0SW5kZXhBcnIuaW5kZXhPZihnZXRNYXNrU2V0KCkuZXhjbHVkZXNbcG9zXVtpXS50b1N0cmluZygpKSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCA9PT0gYWx0SW5kZXhBcnIubGVuZ3RoICYmIChnZXRNYXNrU2V0KCkuZXhjbHVkZXNbcG9zXSA9IHVuZGVmaW5lZCwgYWx0SW5kZXhBcnIgPSBhbHRJbmRleEFyckNsb25lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICghMCA9PT0gb3B0cy5rZWVwU3RhdGljIHx8IGlzRmluaXRlKHBhcnNlSW50KG9wdHMua2VlcFN0YXRpYykpICYmIGN1cnJlbnRQb3MgPj0gb3B0cy5rZWVwU3RhdGljKSAmJiAoYWx0SW5kZXhBcnIgPSBhbHRJbmRleEFyci5zbGljZSgwLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB1bk1hdGNoZWRBbHRlcm5hdGlvbiA9ICExLCBuZHggPSAwOyBuZHggPCBhbHRJbmRleEFyci5sZW5ndGg7IG5keCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1uZHggPSBwYXJzZUludChhbHRJbmRleEFycltuZHhdKSwgbWF0Y2hlcyA9IFtdLCBuZHhJbml0aWFsaXplciA9IFwic3RyaW5nXCIgPT0gdHlwZW9mIGFsdEluZGV4ICYmIHJlc29sdmVOZHhJbml0aWFsaXplcih0ZXN0UG9zLCBhbW5keCwgbG9vcE5keENudCkgfHwgbmR4SW5pdGlhbGl6ZXJDbG9uZS5zbGljZSgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdGVUb2tlbi5tYXRjaGVzW2FtbmR4XSAmJiBoYW5kbGVNYXRjaChhbHRlcm5hdGVUb2tlbi5tYXRjaGVzW2FtbmR4XSwgWyBhbW5keCBdLmNvbmNhdChsb29wTmR4KSwgcXVhbnRpZmllclJlY3Vyc2UpID8gbWF0Y2ggPSAhMCA6IDAgPT09IG5keCAmJiAodW5NYXRjaGVkQWx0ZXJuYXRpb24gPSAhMCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hbHRNYXRjaGVzID0gbWF0Y2hlcy5zbGljZSgpLCB0ZXN0UG9zID0gY3VycmVudFBvcywgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG5keDEgPSAwOyBuZHgxIDwgbWFsdE1hdGNoZXMubGVuZ3RoOyBuZHgxKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsdE1hdGNoID0gbWFsdE1hdGNoZXNbbmR4MV0sIGRyb3BNYXRjaCA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRNYXRjaC5tYXRjaC5qaXQgPSBhbHRNYXRjaC5tYXRjaC5qaXQgfHwgdW5NYXRjaGVkQWx0ZXJuYXRpb24sIGFsdE1hdGNoLmFsdGVybmF0aW9uID0gYWx0TWF0Y2guYWx0ZXJuYXRpb24gfHwgbG9vcE5keENudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lcmdlTG9jYXRvcnMoYWx0TWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuZHgyID0gMDsgbmR4MiA8IG1hbHRlcm5hdGVNYXRjaGVzLmxlbmd0aDsgbmR4MisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0TWF0Y2gyID0gbWFsdGVybmF0ZU1hdGNoZXNbbmR4Ml07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiAhPSB0eXBlb2YgYWx0SW5kZXggfHwgYWx0TWF0Y2guYWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCAmJiAtMSAhPT0gJC5pbkFycmF5KGFsdE1hdGNoLmxvY2F0b3JbYWx0TWF0Y2guYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCksIGFsdEluZGV4QXJyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbHRNYXRjaC5tYXRjaC5uYXRpdmVEZWYgPT09IGFsdE1hdGNoMi5tYXRjaC5uYXRpdmVEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE1hdGNoID0gITAsIHNldE1lcmdlTG9jYXRvcnMoYWx0TWF0Y2gyLCBhbHRNYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNTdWJzZXRPZihhbHRNYXRjaCwgYWx0TWF0Y2gyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXJnZUxvY2F0b3JzKGFsdE1hdGNoLCBhbHRNYXRjaDIpICYmIChkcm9wTWF0Y2ggPSAhMCwgbWFsdGVybmF0ZU1hdGNoZXMuc3BsaWNlKG1hbHRlcm5hdGVNYXRjaGVzLmluZGV4T2YoYWx0TWF0Y2gyKSwgMCwgYWx0TWF0Y2gpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1N1YnNldE9mKGFsdE1hdGNoMiwgYWx0TWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lcmdlTG9jYXRvcnMoYWx0TWF0Y2gyLCBhbHRNYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID0gYWx0TWF0Y2gyLCBudWxsID09PSAoc291cmNlID0gYWx0TWF0Y2gpLm1hdGNoLmZuICYmIG51bGwgIT09IHRhcmdldC5tYXRjaC5mbiAmJiB0YXJnZXQubWF0Y2guZm4udGVzdChzb3VyY2UubWF0Y2guZGVmLCBnZXRNYXNrU2V0KCksIHBvcywgITEsIG9wdHMsICExKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXJnZUxvY2F0b3JzKGFsdE1hdGNoLCBhbHRNYXRjaDIpICYmIChkcm9wTWF0Y2ggPSAhMCwgbWFsdGVybmF0ZU1hdGNoZXMuc3BsaWNlKG1hbHRlcm5hdGVNYXRjaGVzLmluZGV4T2YoYWx0TWF0Y2gyKSwgMCwgYWx0TWF0Y2gpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BNYXRjaCB8fCBtYWx0ZXJuYXRlTWF0Y2hlcy5wdXNoKGFsdE1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gY3VycmVudE1hdGNoZXMuY29uY2F0KG1hbHRlcm5hdGVNYXRjaGVzKSwgdGVzdFBvcyA9IHBvcywgaW5zZXJ0U3RvcCA9IG1hdGNoZXMubGVuZ3RoID4gMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IG1hbHRlcm5hdGVNYXRjaGVzLmxlbmd0aCA+IDAsIG5keEluaXRpYWxpemVyID0gbmR4SW5pdGlhbGl6ZXJDbG9uZS5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgbWF0Y2ggPSBoYW5kbGVNYXRjaChhbHRlcm5hdGVUb2tlbi5tYXRjaGVzW2FsdEluZGV4XSB8fCBtYXNrVG9rZW4ubWF0Y2hlc1thbHRJbmRleF0sIFsgYWx0SW5kZXggXS5jb25jYXQobG9vcE5keCksIHF1YW50aWZpZXJSZWN1cnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaC5pc1F1YW50aWZpZXIgJiYgcXVhbnRpZmllclJlY3Vyc2UgIT09IG1hc2tUb2tlbi5tYXRjaGVzWyQuaW5BcnJheShtYXRjaCwgbWFza1Rva2VuLm1hdGNoZXMpIC0gMV0pIGZvciAodmFyIHF0ID0gbWF0Y2gsIHFuZHggPSBuZHhJbml0aWFsaXplci5sZW5ndGggPiAwID8gbmR4SW5pdGlhbGl6ZXIuc2hpZnQoKSA6IDA7IHFuZHggPCAoaXNOYU4ocXQucXVhbnRpZmllci5tYXgpID8gcW5keCArIDEgOiBxdC5xdWFudGlmaWVyLm1heCkgJiYgdGVzdFBvcyA8PSBwb3M7IHFuZHgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5Hcm91cCA9IG1hc2tUb2tlbi5tYXRjaGVzWyQuaW5BcnJheShxdCwgbWFza1Rva2VuLm1hdGNoZXMpIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9IGhhbmRsZU1hdGNoKHRva2VuR3JvdXAsIFsgcW5keCBdLmNvbmNhdChsb29wTmR4KSwgdG9rZW5Hcm91cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGF0ZXN0TWF0Y2ggPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0ubWF0Y2gpLm9wdGlvbmFsUXVhbnRpZmllciA9IHFuZHggPiBxdC5xdWFudGlmaWVyLm1pbiAtIDEsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0TWF0Y2guaml0ID0gcW5keCArIHRva2VuR3JvdXAubWF0Y2hlcy5pbmRleE9mKGxhdGVzdE1hdGNoKSA+PSBxdC5xdWFudGlmaWVyLmppdCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIHRva2VuR3JvdXApICYmIHFuZHggPiBxdC5xdWFudGlmaWVyLm1pbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRTdG9wID0gITAsIHRlc3RQb3MgPSBwb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXQucXVhbnRpZmllci5qaXQgIT09IHVuZGVmaW5lZCAmJiBpc05hTihxdC5xdWFudGlmaWVyLm1heCkgJiYgbGF0ZXN0TWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3MgLSAxXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wb3AoKSwgaW5zZXJ0U3RvcCA9ICEwLCB0ZXN0UG9zID0gcG9zLCBjYWNoZURlcGVuZGVuY3kgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoID0gcmVzb2x2ZVRlc3RGcm9tVG9rZW4obWF0Y2gsIG5keEluaXRpYWxpemVyLCBsb29wTmR4LCBxdWFudGlmaWVyUmVjdXJzZSkpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB0ZXN0UG9zKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlLCB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdG5keCA9IG5keEluaXRpYWxpemVyLmxlbmd0aCA+IDAgPyBuZHhJbml0aWFsaXplci5zaGlmdCgpIDogMDsgdG5keCA8IG1hc2tUb2tlbi5tYXRjaGVzLmxlbmd0aDsgdG5keCsrKSBpZiAoITAgIT09IG1hc2tUb2tlbi5tYXRjaGVzW3RuZHhdLmlzUXVhbnRpZmllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gaGFuZGxlTWF0Y2gobWFza1Rva2VuLm1hdGNoZXNbdG5keF0sIFsgdG5keCBdLmNvbmNhdChsb29wTmR4KSwgcXVhbnRpZmllclJlY3Vyc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmIHRlc3RQb3MgPT09IHBvcykgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RQb3MgPiBwb3MpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwb3MgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmR4SW50bHpyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHRlc3QsIHByZXZpb3VzUG9zID0gcG9zIC0gMTsgKHRlc3QgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcHJldmlvdXNQb3NdIHx8IGdldE1hc2tTZXQoKS50ZXN0c1twcmV2aW91c1Bvc10pID09PSB1bmRlZmluZWQgJiYgcHJldmlvdXNQb3MgPiAtMTsgKSBwcmV2aW91c1Bvcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdCAhPT0gdW5kZWZpbmVkICYmIHByZXZpb3VzUG9zID4gLTEgJiYgKG5keEluaXRpYWxpemVyID0gZnVuY3Rpb24ocG9zLCB0ZXN0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2NhdG9yID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuaXNBcnJheSh0ZXN0cykgfHwgKHRlc3RzID0gWyB0ZXN0cyBdKSwgdGVzdHMubGVuZ3RoID4gMCAmJiAodGVzdHNbMF0uYWx0ZXJuYXRpb24gPT09IHVuZGVmaW5lZCA/IDAgPT09IChsb2NhdG9yID0gZGV0ZXJtaW5lVGVzdFRlbXBsYXRlKHBvcywgdGVzdHMuc2xpY2UoKSkubG9jYXRvci5zbGljZSgpKS5sZW5ndGggJiYgKGxvY2F0b3IgPSB0ZXN0c1swXS5sb2NhdG9yLnNsaWNlKCkpIDogJC5lYWNoKHRlc3RzLCBmdW5jdGlvbihuZHgsIHRzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiAhPT0gdHN0LmRlZikgaWYgKDAgPT09IGxvY2F0b3IubGVuZ3RoKSBsb2NhdG9yID0gdHN0LmxvY2F0b3Iuc2xpY2UoKTsgZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0b3IubGVuZ3RoOyBpKyspIHRzdC5sb2NhdG9yW2ldICYmIC0xID09PSBsb2NhdG9yW2ldLnRvU3RyaW5nKCkuaW5kZXhPZih0c3QubG9jYXRvcltpXSkgJiYgKGxvY2F0b3JbaV0gKz0gXCIsXCIgKyB0c3QubG9jYXRvcltpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCBsb2NhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfShwcmV2aW91c1BvcywgdGVzdCksIGNhY2hlRGVwZW5kZW5jeSA9IG5keEluaXRpYWxpemVyLmpvaW4oXCJcIiksIHRlc3RQb3MgPSBwcmV2aW91c1Bvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGdldE1hc2tTZXQoKS50ZXN0c1twb3NdICYmIGdldE1hc2tTZXQoKS50ZXN0c1twb3NdWzBdLmNkID09PSBjYWNoZURlcGVuZGVuY3kpIHJldHVybiBnZXRNYXNrU2V0KCkudGVzdHNbcG9zXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbXRuZHggPSBuZHhJbml0aWFsaXplci5zaGlmdCgpOyBtdG5keCA8IG1hc2tUb2tlbnMubGVuZ3RoOyBtdG5keCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZVRlc3RGcm9tVG9rZW4obWFza1Rva2Vuc1ttdG5keF0sIG5keEluaXRpYWxpemVyLCBbIG10bmR4IF0pICYmIHRlc3RQb3MgPT09IHBvcyB8fCB0ZXN0UG9zID4gcG9zKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKDAgPT09IG1hdGNoZXMubGVuZ3RoIHx8IGluc2VydFN0b3ApICYmIG1hdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsaXR5OiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0b3I6IFtdLFxuICAgICAgICAgICAgICAgICAgICBtbG9jOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgY2Q6IGNhY2hlRGVwZW5kZW5jeVxuICAgICAgICAgICAgICAgIH0pLCBuZHhJbnRsenIgIT09IHVuZGVmaW5lZCAmJiBnZXRNYXNrU2V0KCkudGVzdHNbcG9zXSA/ICQuZXh0ZW5kKCEwLCBbXSwgbWF0Y2hlcykgOiAoZ2V0TWFza1NldCgpLnRlc3RzW3Bvc10gPSAkLmV4dGVuZCghMCwgW10sIG1hdGNoZXMpLCBcbiAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkudGVzdHNbcG9zXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRCdWZmZXJUZW1wbGF0ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0TWFza1NldCgpLl9idWZmZXIgPT09IHVuZGVmaW5lZCAmJiAoZ2V0TWFza1NldCgpLl9idWZmZXIgPSBnZXRNYXNrVGVtcGxhdGUoITEsIDEpLCBcbiAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkuYnVmZmVyID09PSB1bmRlZmluZWQgJiYgKGdldE1hc2tTZXQoKS5idWZmZXIgPSBnZXRNYXNrU2V0KCkuX2J1ZmZlci5zbGljZSgpKSksIFxuICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS5fYnVmZmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QnVmZmVyKG5vQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0TWFza1NldCgpLmJ1ZmZlciAhPT0gdW5kZWZpbmVkICYmICEwICE9PSBub0NhY2hlIHx8IChnZXRNYXNrU2V0KCkuYnVmZmVyID0gZ2V0TWFza1RlbXBsYXRlKCEwLCBnZXRMYXN0VmFsaWRQb3NpdGlvbigpLCAhMCkpLCBcbiAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkuYnVmZmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcmVmcmVzaEZyb21CdWZmZXIoc3RhcnQsIGVuZCwgYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIHA7XG4gICAgICAgICAgICAgICAgaWYgKCEwID09PSBzdGFydCkgcmVzZXRNYXNrU2V0KCksIHN0YXJ0ID0gMCwgZW5kID0gYnVmZmVyLmxlbmd0aDsgZWxzZSBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSBkZWxldGUgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldO1xuICAgICAgICAgICAgICAgIGZvciAocCA9IHN0YXJ0LCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykgaWYgKHJlc2V0TWFza1NldCghMCksIGJ1ZmZlcltpXSAhPT0gb3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWxSZXN1bHQgPSBpc1ZhbGlkKHAsIGJ1ZmZlcltpXSwgITAsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgITEgIT09IHZhbFJlc3VsdCAmJiAocmVzZXRNYXNrU2V0KCEwKSwgcCA9IHZhbFJlc3VsdC5jYXJldCAhPT0gdW5kZWZpbmVkID8gdmFsUmVzdWx0LmNhcmV0IDogdmFsUmVzdWx0LnBvcyArIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrQWx0ZXJuYXRpb25NYXRjaChhbHRBcnIxLCBhbHRBcnIyLCBuYSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hTmR4LCBhbHRBcnJDID0gb3B0cy5ncmVlZHkgPyBhbHRBcnIyIDogYWx0QXJyMi5zbGljZSgwLCAxKSwgaXNNYXRjaCA9ICExLCBuYUFyciA9IG5hICE9PSB1bmRlZmluZWQgPyBuYS5zcGxpdChcIixcIikgOiBbXSwgaSA9IDA7IGkgPCBuYUFyci5sZW5ndGg7IGkrKykgLTEgIT09IChuYU5keCA9IGFsdEFycjEuaW5kZXhPZihuYUFycltpXSkpICYmIGFsdEFycjEuc3BsaWNlKG5hTmR4LCAxKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBhbG5keCA9IDA7IGFsbmR4IDwgYWx0QXJyMS5sZW5ndGg7IGFsbmR4KyspIGlmICgtMSAhPT0gJC5pbkFycmF5KGFsdEFycjFbYWxuZHhdLCBhbHRBcnJDKSkge1xuICAgICAgICAgICAgICAgICAgICBpc01hdGNoID0gITA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXNNYXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFsdGVybmF0ZShwb3MsIGMsIHN0cmljdCwgZnJvbVNldFZhbGlkLCByQWx0UG9zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3RBbHQsIGFsdGVybmF0aW9uLCBhbHRQb3MsIHByZXZBbHRQb3MsIGksIHZhbGlkUG9zLCBkZWNpc2lvblBvcywgdmFsaWRQc0Nsb25lID0gJC5leHRlbmQoITAsIHt9LCBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnMpLCBpc1ZhbGlkUnNsdCA9ICExLCBsQWx0UG9zID0gckFsdFBvcyAhPT0gdW5kZWZpbmVkID8gckFsdFBvcyA6IGdldExhc3RWYWxpZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKC0xID09PSBsQWx0UG9zICYmIHJBbHRQb3MgPT09IHVuZGVmaW5lZCkgYWx0ZXJuYXRpb24gPSAocHJldkFsdFBvcyA9IGdldFRlc3QobGFzdEFsdCA9IDApKS5hbHRlcm5hdGlvbjsgZWxzZSBmb3IgKDtsQWx0UG9zID49IDA7IGxBbHRQb3MtLSkgaWYgKChhbHRQb3MgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbEFsdFBvc10pICYmIGFsdFBvcy5hbHRlcm5hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2QWx0UG9zICYmIHByZXZBbHRQb3MubG9jYXRvclthbHRQb3MuYWx0ZXJuYXRpb25dICE9PSBhbHRQb3MubG9jYXRvclthbHRQb3MuYWx0ZXJuYXRpb25dKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgbGFzdEFsdCA9IGxBbHRQb3MsIGFsdGVybmF0aW9uID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2xhc3RBbHRdLmFsdGVybmF0aW9uLCBcbiAgICAgICAgICAgICAgICAgICAgcHJldkFsdFBvcyA9IGFsdFBvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjaXNpb25Qb3MgPSBwYXJzZUludChsYXN0QWx0KSwgZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXSA9IGdldE1hc2tTZXQoKS5leGNsdWRlc1tkZWNpc2lvblBvc10gfHwgW10sIFxuICAgICAgICAgICAgICAgICAgICAhMCAhPT0gcG9zICYmIGdldE1hc2tTZXQoKS5leGNsdWRlc1tkZWNpc2lvblBvc10ucHVzaChnZXREZWNpc2lvblRha2VyKHByZXZBbHRQb3MpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbGlkSW5wdXRzQ2xvbmUgPSBbXSwgc3RhdGljSW5wdXRzQmVmb3JlUG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gZGVjaXNpb25Qb3M7IGkgPCBnZXRMYXN0VmFsaWRQb3NpdGlvbih1bmRlZmluZWQsICEwKSArIDE7IGkrKykgKHZhbGlkUG9zID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldKSAmJiAhMCAhPT0gdmFsaWRQb3MuZ2VuZXJhdGVkSW5wdXQgPyB2YWxpZElucHV0c0Nsb25lLnB1c2godmFsaWRQb3MuaW5wdXQpIDogaSA8IHBvcyAmJiBzdGF0aWNJbnB1dHNCZWZvcmVQb3MrKywgXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAoO2dldE1hc2tTZXQoKS5leGNsdWRlc1tkZWNpc2lvblBvc10gJiYgZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXS5sZW5ndGggPCAxMDsgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zT2Zmc2V0ID0gLTEgKiBzdGF0aWNJbnB1dHNCZWZvcmVQb3MsIHZhbGlkSW5wdXRzID0gdmFsaWRJbnB1dHNDbG9uZS5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChnZXRNYXNrU2V0KCkudGVzdHNbZGVjaXNpb25Qb3NdID0gdW5kZWZpbmVkLCByZXNldE1hc2tTZXQoITApLCBpc1ZhbGlkUnNsdCA9ICEwOyB2YWxpZElucHV0cy5sZW5ndGggPiAwOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB2YWxpZElucHV0cy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGlzVmFsaWRSc2x0ID0gaXNWYWxpZChnZXRMYXN0VmFsaWRQb3NpdGlvbih1bmRlZmluZWQsICEwKSArIDEsIGlucHV0LCAhMSwgZnJvbVNldFZhbGlkLCAhMCkpKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkUnNsdCAmJiBjICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0THZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24ocG9zKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gZGVjaXNpb25Qb3M7IGkgPCBnZXRMYXN0VmFsaWRQb3NpdGlvbigpICsgMTsgaSsrKSAoKHZhbGlkUG9zID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldKSA9PT0gdW5kZWZpbmVkIHx8IG51bGwgPT0gdmFsaWRQb3MubWF0Y2guZm4pICYmIGkgPCBwb3MgKyBwb3NPZmZzZXQgJiYgcG9zT2Zmc2V0Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZFJzbHQgPSBpc1ZhbGlkKChwb3MgKz0gcG9zT2Zmc2V0KSA+IHRhcmdldEx2cCA/IHRhcmdldEx2cCA6IHBvcywgYywgc3RyaWN0LCBmcm9tU2V0VmFsaWQsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkUnNsdCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzZXRNYXNrU2V0KCksIHByZXZBbHRQb3MgPSBnZXRUZXN0KGRlY2lzaW9uUG9zKSwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zID0gJC5leHRlbmQoITAsIHt9LCB2YWxpZFBzQ2xvbmUpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICFnZXRNYXNrU2V0KCkuZXhjbHVkZXNbZGVjaXNpb25Qb3NdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZFJzbHQgPSBhbHRlcm5hdGUocG9zLCBjLCBzdHJpY3QsIGZyb21TZXRWYWxpZCwgZGVjaXNpb25Qb3MgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWNpc2lvblRha2VyID0gZ2V0RGVjaXNpb25UYWtlcihwcmV2QWx0UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtMSAhPT0gZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXS5pbmRleE9mKGRlY2lzaW9uVGFrZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZFJzbHQgPSBhbHRlcm5hdGUocG9zLCBjLCBzdHJpY3QsIGZyb21TZXRWYWxpZCwgZGVjaXNpb25Qb3MgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXS5wdXNoKGRlY2lzaW9uVGFrZXIpLCBpID0gZGVjaXNpb25Qb3M7IGkgPCBnZXRMYXN0VmFsaWRQb3NpdGlvbih1bmRlZmluZWQsICEwKSArIDE7IGkrKykgZGVsZXRlIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0TWFza1NldCgpLmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXSA9IHVuZGVmaW5lZCwgaXNWYWxpZFJzbHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBpc1ZhbGlkKHBvcywgYywgc3RyaWN0LCBmcm9tU2V0VmFsaWQsIGZyb21BbHRlcm5hdGUsIHZhbGlkYXRlT25seSkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlzU2VsZWN0aW9uKHBvc09iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNSVEwgPyBwb3NPYmouYmVnaW4gLSBwb3NPYmouZW5kID4gMSB8fCBwb3NPYmouYmVnaW4gLSBwb3NPYmouZW5kID09IDEgOiBwb3NPYmouZW5kIC0gcG9zT2JqLmJlZ2luID4gMSB8fCBwb3NPYmouZW5kIC0gcG9zT2JqLmJlZ2luID09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0cmljdCA9ICEwID09PSBzdHJpY3Q7XG4gICAgICAgICAgICAgICAgdmFyIG1hc2tQb3MgPSBwb3M7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gX2lzVmFsaWQocG9zaXRpb24sIGMsIHN0cmljdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcnNsdCA9ICExO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5lYWNoKGdldFRlc3RzKHBvc2l0aW9uKSwgZnVuY3Rpb24obmR4LCB0c3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0ID0gdHN0Lm1hdGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEJ1ZmZlcighMCksICExICE9PSAocnNsdCA9IG51bGwgIT0gdGVzdC5mbiA/IHRlc3QuZm4udGVzdChjLCBnZXRNYXNrU2V0KCksIHBvc2l0aW9uLCBzdHJpY3QsIG9wdHMsIGlzU2VsZWN0aW9uKHBvcykpIDogKGMgPT09IHRlc3QuZGVmIHx8IGMgPT09IG9wdHMuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlcikgJiYgXCJcIiAhPT0gdGVzdC5kZWYgJiYge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IGdldFBsYWNlaG9sZGVyKHBvc2l0aW9uLCB0ZXN0LCAhMCkgfHwgdGVzdC5kZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IHJzbHQuYyAhPT0gdW5kZWZpbmVkID8gcnNsdC5jIDogYywgdmFsaWRhdGVkUG9zID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0gPSBlbGVtID09PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgJiYgbnVsbCA9PT0gdGVzdC5mbiA/IGdldFBsYWNlaG9sZGVyKHBvc2l0aW9uLCB0ZXN0LCAhMCkgfHwgdGVzdC5kZWYgOiBlbGVtLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByc2x0LnJlbW92ZSAhPT0gdW5kZWZpbmVkICYmICgkLmlzQXJyYXkocnNsdC5yZW1vdmUpIHx8IChyc2x0LnJlbW92ZSA9IFsgcnNsdC5yZW1vdmUgXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChyc2x0LnJlbW92ZS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGIgLSBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBmdW5jdGlvbihuZHgsIGxtbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2YWxpZGF0ZU1hc2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IGxtbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGxtbnQgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSwgcnNsdC5pbnNlcnQgIT09IHVuZGVmaW5lZCAmJiAoJC5pc0FycmF5KHJzbHQuaW5zZXJ0KSB8fCAocnNsdC5pbnNlcnQgPSBbIHJzbHQuaW5zZXJ0IF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gocnNsdC5pbnNlcnQuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgZnVuY3Rpb24obmR4LCBsbW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQobG1udC5wb3MsIGxtbnQuYywgITAsIGZyb21TZXRWYWxpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCAhMCAhPT0gcnNsdCAmJiByc2x0LnBvcyAhPT0gdW5kZWZpbmVkICYmIHJzbHQucG9zICE9PSBwb3NpdGlvbiAmJiAodmFsaWRhdGVkUG9zID0gcnNsdC5wb3MpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhMCAhPT0gcnNsdCAmJiByc2x0LnBvcyA9PT0gdW5kZWZpbmVkICYmIHJzbHQuYyA9PT0gdW5kZWZpbmVkID8gITEgOiAocmV2YWxpZGF0ZU1hc2socG9zLCAkLmV4dGVuZCh7fSwgdHN0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbihlbGVtLCB0ZXN0LCBwb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3B0cy5jYXNpbmcgfHwgdGVzdC5jYXNpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVwcGVyXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibG93ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0aXRsZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3NCZWZvcmUgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IDAgPT09IHBvcyB8fCBwb3NCZWZvcmUgJiYgcG9zQmVmb3JlLmlucHV0ID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlKElucHV0bWFzay5rZXlDb2RlLlNQQUNFKSA/IGVsZW0udG9VcHBlckNhc2UoKSA6IGVsZW0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24ob3B0cy5jYXNpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucyksIGVsZW0gPSBvcHRzLmNhc2luZy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfShlbGVtLCB0ZXN0LCB2YWxpZGF0ZWRQb3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGZyb21TZXRWYWxpZCwgdmFsaWRhdGVkUG9zKSB8fCAocnNsdCA9ICExKSwgITEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSwgcnNsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zLmJlZ2luICE9PSB1bmRlZmluZWQgJiYgKG1hc2tQb3MgPSBpc1JUTCA/IHBvcy5lbmQgOiBwb3MuYmVnaW4pO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAhMCwgcG9zaXRpb25zQ2xvbmUgPSAkLmV4dGVuZCghMCwge30sIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucyk7XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRzLnByZVZhbGlkYXRpb24pICYmICFzdHJpY3QgJiYgITAgIT09IGZyb21TZXRWYWxpZCAmJiAhMCAhPT0gdmFsaWRhdGVPbmx5ICYmIChyZXN1bHQgPSBvcHRzLnByZVZhbGlkYXRpb24oZ2V0QnVmZmVyKCksIG1hc2tQb3MsIGMsIGlzU2VsZWN0aW9uKHBvcyksIG9wdHMsIGdldE1hc2tTZXQoKSkpLCBcbiAgICAgICAgICAgICAgICAhMCA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFja2JhY2tQb3NpdGlvbnModW5kZWZpbmVkLCBtYXNrUG9zLCAhMCksIChtYXhMZW5ndGggPT09IHVuZGVmaW5lZCB8fCBtYXNrUG9zIDwgbWF4TGVuZ3RoKSAmJiAocmVzdWx0ID0gX2lzVmFsaWQobWFza1BvcywgYywgc3RyaWN0KSwgXG4gICAgICAgICAgICAgICAgICAgICghc3RyaWN0IHx8ICEwID09PSBmcm9tU2V0VmFsaWQpICYmICExID09PSByZXN1bHQgJiYgITAgIT09IHZhbGlkYXRlT25seSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50UG9zVmFsaWQgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbWFza1Bvc107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRQb3NWYWxpZCB8fCBudWxsICE9PSBjdXJyZW50UG9zVmFsaWQubWF0Y2guZm4gfHwgY3VycmVudFBvc1ZhbGlkLm1hdGNoLmRlZiAhPT0gYyAmJiBjICE9PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG9wdHMuaW5zZXJ0TW9kZSB8fCBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbc2Vla05leHQobWFza1BvcyldID09PSB1bmRlZmluZWQpICYmICFpc01hc2sobWFza1BvcywgITApKSBmb3IgKHZhciBuUG9zID0gbWFza1BvcyArIDEsIHNuUG9zID0gc2Vla05leHQobWFza1Bvcyk7IG5Qb3MgPD0gc25Qb3M7IG5Qb3MrKykgaWYgKCExICE9PSAocmVzdWx0ID0gX2lzVmFsaWQoblBvcywgYywgc3RyaWN0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJhY2tiYWNrUG9zaXRpb25zKG1hc2tQb3MsIHJlc3VsdC5wb3MgIT09IHVuZGVmaW5lZCA/IHJlc3VsdC5wb3MgOiBuUG9zKSB8fCByZXN1bHQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrUG9zID0gblBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogc2Vla05leHQobWFza1BvcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgITEgIT09IHJlc3VsdCB8fCAhMSA9PT0gb3B0cy5rZWVwU3RhdGljIHx8IG51bGwgIT0gb3B0cy5yZWdleCAmJiAhaXNDb21wbGV0ZShnZXRCdWZmZXIoKSkgfHwgc3RyaWN0IHx8ICEwID09PSBmcm9tQWx0ZXJuYXRlIHx8IChyZXN1bHQgPSBhbHRlcm5hdGUobWFza1BvcywgYywgc3RyaWN0LCBmcm9tU2V0VmFsaWQpKSwgXG4gICAgICAgICAgICAgICAgICAgICEwID09PSByZXN1bHQgJiYgKHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczogbWFza1Bvc1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRzLnBvc3RWYWxpZGF0aW9uKSAmJiAhMSAhPT0gcmVzdWx0ICYmICFzdHJpY3QgJiYgITAgIT09IGZyb21TZXRWYWxpZCAmJiAhMCAhPT0gdmFsaWRhdGVPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3N0UmVzdWx0ID0gb3B0cy5wb3N0VmFsaWRhdGlvbihnZXRCdWZmZXIoITApLCByZXN1bHQsIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zdFJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zdFJlc3VsdC5yZWZyZXNoRnJvbUJ1ZmZlciAmJiBwb3N0UmVzdWx0LmJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZyZXNoID0gcG9zdFJlc3VsdC5yZWZyZXNoRnJvbUJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlcighMCA9PT0gcmVmcmVzaCA/IHJlZnJlc2ggOiByZWZyZXNoLnN0YXJ0LCByZWZyZXNoLmVuZCwgcG9zdFJlc3VsdC5idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gITAgPT09IHBvc3RSZXN1bHQgPyByZXN1bHQgOiBwb3N0UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgJiYgcmVzdWx0LnBvcyA9PT0gdW5kZWZpbmVkICYmIChyZXN1bHQucG9zID0gbWFza1BvcyksICExICE9PSByZXN1bHQgJiYgITAgIT09IHZhbGlkYXRlT25seSB8fCAocmVzZXRNYXNrU2V0KCEwKSwgXG4gICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zID0gJC5leHRlbmQoITAsIHt9LCBwb3NpdGlvbnNDbG9uZSkpLCByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB0cmFja2JhY2tQb3NpdGlvbnMob3JpZ2luYWxQb3MsIG5ld1BvcywgZmlsbE9ubHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFBvcyA9PT0gdW5kZWZpbmVkKSBmb3IgKG9yaWdpbmFsUG9zID0gbmV3UG9zIC0gMTsgb3JpZ2luYWxQb3MgPiAwICYmICFnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbb3JpZ2luYWxQb3NdOyBvcmlnaW5hbFBvcy0tKSA7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHMgPSBvcmlnaW5hbFBvczsgcHMgPCBuZXdQb3M7IHBzKyspIGlmIChnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcHNdID09PSB1bmRlZmluZWQgJiYgIWlzTWFzayhwcywgITApKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2cCA9IDAgPT0gcHMgPyBnZXRUZXN0KHBzKSA6IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twcyAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodnApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0c3RMb2NhdG9yLCB0YXJnZXRMb2NhdG9yID0gZ2V0TG9jYXRvcih2cCksIHRlc3RzID0gZ2V0VGVzdHMocHMpLnNsaWNlKCksIGNsb3Nlc3QgPSB1bmRlZmluZWQsIGJlc3RNYXRjaCA9IGdldFRlc3QocHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgPT09IHRlc3RzW3Rlc3RzLmxlbmd0aCAtIDFdLm1hdGNoLmRlZiAmJiB0ZXN0cy5wb3AoKSwgJC5lYWNoKHRlc3RzLCBmdW5jdGlvbihuZHgsIHRzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRzdExvY2F0b3IgPSBnZXRMb2NhdG9yKHRzdCwgdGFyZ2V0TG9jYXRvci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKHRzdExvY2F0b3IgLSB0YXJnZXRMb2NhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xvc2VzdCA9PT0gdW5kZWZpbmVkIHx8IGRpc3RhbmNlIDwgY2xvc2VzdCkgJiYgbnVsbCA9PT0gdHN0Lm1hdGNoLmZuICYmICEwICE9PSB0c3QubWF0Y2gub3B0aW9uYWxpdHkgJiYgITAgIT09IHRzdC5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgJiYgKGNsb3Nlc3QgPSBkaXN0YW5jZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoID0gdHN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCAoYmVzdE1hdGNoID0gJC5leHRlbmQoe30sIGJlc3RNYXRjaCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBnZXRQbGFjZWhvbGRlcihwcywgYmVzdE1hdGNoLm1hdGNoLCAhMCkgfHwgYmVzdE1hdGNoLm1hdGNoLmRlZlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpLmdlbmVyYXRlZElucHV0ID0gITAsIHJldmFsaWRhdGVNYXNrKHBzLCBiZXN0TWF0Y2gsICEwKSwgITAgIT09IGZpbGxPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN2cElucHV0ID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW25ld1Bvc10uaW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW25ld1Bvc10gPSB1bmRlZmluZWQsIHJlc3VsdCA9IGlzVmFsaWQobmV3UG9zLCBjdnBJbnB1dCwgITAsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcmV2YWxpZGF0ZU1hc2socG9zLCB2YWxpZFRlc3QsIGZyb21TZXRWYWxpZCwgdmFsaWRhdGVkUG9zKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gSXNFbmNsb3NlZFN0YXRpYyhwb3MsIHZhbGlkcywgc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3NNYXRjaCA9IHZhbGlkc1twb3NdO1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zTWF0Y2ggIT09IHVuZGVmaW5lZCAmJiAobnVsbCA9PT0gcG9zTWF0Y2gubWF0Y2guZm4gJiYgITAgIT09IHBvc01hdGNoLm1hdGNoLm9wdGlvbmFsaXR5IHx8IHBvc01hdGNoLmlucHV0ID09PSBvcHRzLnJhZGl4UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldk1hdGNoID0gc2VsZWN0aW9uLmJlZ2luIDw9IHBvcyAtIDEgPyB2YWxpZHNbcG9zIC0gMV0gJiYgbnVsbCA9PT0gdmFsaWRzW3BvcyAtIDFdLm1hdGNoLmZuICYmIHZhbGlkc1twb3MgLSAxXSA6IHZhbGlkc1twb3MgLSAxXSwgbmV4dE1hdGNoID0gc2VsZWN0aW9uLmVuZCA+IHBvcyArIDEgPyB2YWxpZHNbcG9zICsgMV0gJiYgbnVsbCA9PT0gdmFsaWRzW3BvcyArIDFdLm1hdGNoLmZuICYmIHZhbGlkc1twb3MgKyAxXSA6IHZhbGlkc1twb3MgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2TWF0Y2ggJiYgbmV4dE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGJlZ2luID0gcG9zLmJlZ2luICE9PSB1bmRlZmluZWQgPyBwb3MuYmVnaW4gOiBwb3MsIGVuZCA9IHBvcy5lbmQgIT09IHVuZGVmaW5lZCA/IHBvcy5lbmQgOiBwb3M7XG4gICAgICAgICAgICAgICAgaWYgKHBvcy5iZWdpbiA+IHBvcy5lbmQgJiYgKGJlZ2luID0gcG9zLmVuZCwgZW5kID0gcG9zLmJlZ2luKSwgdmFsaWRhdGVkUG9zID0gdmFsaWRhdGVkUG9zICE9PSB1bmRlZmluZWQgPyB2YWxpZGF0ZWRQb3MgOiBiZWdpbiwgXG4gICAgICAgICAgICAgICAgYmVnaW4gIT09IGVuZCB8fCBvcHRzLmluc2VydE1vZGUgJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3ZhbGlkYXRlZFBvc10gIT09IHVuZGVmaW5lZCAmJiBmcm9tU2V0VmFsaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25zQ2xvbmUgPSAkLmV4dGVuZCghMCwge30sIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucyksIGx2cCA9IGdldExhc3RWYWxpZFBvc2l0aW9uKHVuZGVmaW5lZCwgITApO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGdldE1hc2tTZXQoKS5wID0gYmVnaW4sIGkgPSBsdnA7IGkgPj0gYmVnaW47IGktLSkgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldICYmIFwiK1wiID09PSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV0ubWF0Y2gubmF0aXZlRGVmICYmIChvcHRzLmlzTmVnYXRpdmUgPSAhMSksIFxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWQgPSAhMCwgaiA9IHZhbGlkYXRlZFBvcywgbmVlZHNWYWxpZGF0aW9uID0gKGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucywgXG4gICAgICAgICAgICAgICAgICAgICExKSwgcG9zTWF0Y2ggPSBqLCBpID0gajtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YWxpZFRlc3QgJiYgKGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1t2YWxpZGF0ZWRQb3NdID0gJC5leHRlbmQoITAsIHt9LCB2YWxpZFRlc3QpLCBcbiAgICAgICAgICAgICAgICAgICAgcG9zTWF0Y2grKywgaisrLCBiZWdpbiA8IGVuZCAmJiBpKyspOyBpIDw9IGx2cDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHBvc2l0aW9uc0Nsb25lW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQgIT09IHVuZGVmaW5lZCAmJiAoaSA+PSBlbmQgfHwgaSA+PSBiZWdpbiAmJiAhMCAhPT0gdC5nZW5lcmF0ZWRJbnB1dCAmJiBJc0VuY2xvc2VkU3RhdGljKGksIHBvc2l0aW9uc0Nsb25lLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IGJlZ2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDtcIlwiICE9PSBnZXRUZXN0KHBvc01hdGNoKS5tYXRjaC5kZWY7ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITEgPT09IG5lZWRzVmFsaWRhdGlvbiAmJiBwb3NpdGlvbnNDbG9uZVtwb3NNYXRjaF0gJiYgcG9zaXRpb25zQ2xvbmVbcG9zTWF0Y2hdLm1hdGNoLm5hdGl2ZURlZiA9PT0gdC5tYXRjaC5uYXRpdmVEZWYpIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NNYXRjaF0gPSAkLmV4dGVuZCghMCwge30sIHBvc2l0aW9uc0Nsb25lW3Bvc01hdGNoXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zTWF0Y2hdLmlucHV0ID0gdC5pbnB1dCwgdHJhY2tiYWNrUG9zaXRpb25zKHVuZGVmaW5lZCwgcG9zTWF0Y2gsICEwKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSBwb3NNYXRjaCArIDEsIHZhbGlkID0gITA7IGVsc2UgaWYgKHBvc2l0aW9uQ2FuTWF0Y2hEZWZpbml0aW9uKHBvc01hdGNoLCB0Lm1hdGNoLmRlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBpc1ZhbGlkKHBvc01hdGNoLCB0LmlucHV0LCAhMCwgITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSAhMSAhPT0gcmVzdWx0LCBqID0gcmVzdWx0LmNhcmV0IHx8IHJlc3VsdC5pbnNlcnQgPyBnZXRMYXN0VmFsaWRQb3NpdGlvbigpIDogcG9zTWF0Y2ggKyAxLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRzVmFsaWRhdGlvbiA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCEodmFsaWQgPSAhMCA9PT0gdC5nZW5lcmF0ZWRJbnB1dCB8fCB0LmlucHV0ID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgITAgPT09IG9wdHMubnVtZXJpY0lucHV0KSAmJiBcIlwiID09PSBnZXRUZXN0KHBvc01hdGNoKS5tYXRjaC5kZWYpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWQpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NNYXRjaCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiID09IGdldFRlc3QocG9zTWF0Y2gpLm1hdGNoLmRlZiAmJiAodmFsaWQgPSAhMSksIHBvc01hdGNoID0gajtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsaWQpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsaWQpIHJldHVybiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnMgPSAkLmV4dGVuZCghMCwge30sIHBvc2l0aW9uc0Nsb25lKSwgXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0TWFza1NldCghMCksICExO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB2YWxpZFRlc3QgJiYgKGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1t2YWxpZGF0ZWRQb3NdID0gJC5leHRlbmQoITAsIHt9LCB2YWxpZFRlc3QpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzZXRNYXNrU2V0KCEwKSwgITA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBpc01hc2socG9zLCBzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IGdldFRlc3RUZW1wbGF0ZShwb3MpLm1hdGNoO1xuICAgICAgICAgICAgICAgIGlmIChcIlwiID09PSB0ZXN0LmRlZiAmJiAodGVzdCA9IGdldFRlc3QocG9zKS5tYXRjaCksIG51bGwgIT0gdGVzdC5mbikgcmV0dXJuIHRlc3QuZm47XG4gICAgICAgICAgICAgICAgaWYgKCEwICE9PSBzdHJpY3QgJiYgcG9zID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3RzID0gZ2V0VGVzdHMocG9zKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlc3RzLmxlbmd0aCA+IDEgKyAoXCJcIiA9PT0gdGVzdHNbdGVzdHMubGVuZ3RoIC0gMV0ubWF0Y2guZGVmID8gMSA6IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBzZWVrTmV4dChwb3MsIG5ld0Jsb2NrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcG9zaXRpb24gPSBwb3MgKyAxOyBcIlwiICE9PSBnZXRUZXN0KHBvc2l0aW9uKS5tYXRjaC5kZWYgJiYgKCEwID09PSBuZXdCbG9jayAmJiAoITAgIT09IGdldFRlc3QocG9zaXRpb24pLm1hdGNoLm5ld0Jsb2NrTWFya2VyIHx8ICFpc01hc2socG9zaXRpb24pKSB8fCAhMCAhPT0gbmV3QmxvY2sgJiYgIWlzTWFzayhwb3NpdGlvbikpOyApIHBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gc2Vla1ByZXZpb3VzKHBvcywgbmV3QmxvY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVzdHMsIHBvc2l0aW9uID0gcG9zO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8PSAwKSByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICBmb3IgKDstLXBvc2l0aW9uID4gMCAmJiAoITAgPT09IG5ld0Jsb2NrICYmICEwICE9PSBnZXRUZXN0KHBvc2l0aW9uKS5tYXRjaC5uZXdCbG9ja01hcmtlciB8fCAhMCAhPT0gbmV3QmxvY2sgJiYgIWlzTWFzayhwb3NpdGlvbikgJiYgKCh0ZXN0cyA9IGdldFRlc3RzKHBvc2l0aW9uKSkubGVuZ3RoIDwgMiB8fCAyID09PSB0ZXN0cy5sZW5ndGggJiYgXCJcIiA9PT0gdGVzdHNbMV0ubWF0Y2guZGVmKSk7ICkgO1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHdyaXRlQnVmZmVyKGlucHV0LCBidWZmZXIsIGNhcmV0UG9zLCBldmVudCwgdHJpZ2dlckV2ZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiAkLmlzRnVuY3Rpb24ob3B0cy5vbkJlZm9yZVdyaXRlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gb3B0cy5vbkJlZm9yZVdyaXRlLmNhbGwoaW5wdXRtYXNrLCBldmVudCwgYnVmZmVyLCBjYXJldFBvcywgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVmcmVzaEZyb21CdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmcmVzaCA9IHJlc3VsdC5yZWZyZXNoRnJvbUJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlcighMCA9PT0gcmVmcmVzaCA/IHJlZnJlc2ggOiByZWZyZXNoLnN0YXJ0LCByZWZyZXNoLmVuZCwgcmVzdWx0LmJ1ZmZlciB8fCBidWZmZXIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBnZXRCdWZmZXIoITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXRQb3MgIT09IHVuZGVmaW5lZCAmJiAoY2FyZXRQb3MgPSByZXN1bHQuY2FyZXQgIT09IHVuZGVmaW5lZCA/IHJlc3VsdC5jYXJldCA6IGNhcmV0UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQgIT09IHVuZGVmaW5lZCAmJiAoaW5wdXQuaW5wdXRtYXNrLl92YWx1ZVNldChidWZmZXIuam9pbihcIlwiKSksIGNhcmV0UG9zID09PSB1bmRlZmluZWQgfHwgZXZlbnQgIT09IHVuZGVmaW5lZCAmJiBcImJsdXJcIiA9PT0gZXZlbnQudHlwZSA/IHJlbmRlckNvbG9yTWFzayhpbnB1dCwgY2FyZXRQb3MsIDAgPT09IGJ1ZmZlci5sZW5ndGgpIDogY2FyZXQoaW5wdXQsIGNhcmV0UG9zKSwgXG4gICAgICAgICAgICAgICAgITAgPT09IHRyaWdnZXJFdmVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKGlucHV0KSwgbnB0VmFsID0gaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xuICAgICAgICAgICAgICAgICAgICBza2lwSW5wdXRFdmVudCA9ICEwLCAkaW5wdXQudHJpZ2dlcihcImlucHV0XCIpLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnB0VmFsID09PSBnZXRCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oXCJcIikgPyAkaW5wdXQudHJpZ2dlcihcImNsZWFyZWRcIikgOiAhMCA9PT0gaXNDb21wbGV0ZShidWZmZXIpICYmICRpbnB1dC50cmlnZ2VyKFwiY29tcGxldGVcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFBsYWNlaG9sZGVyKHBvcywgdGVzdCwgcmV0dXJuUEwpIHtcbiAgICAgICAgICAgICAgICBpZiAoKHRlc3QgPSB0ZXN0IHx8IGdldFRlc3QocG9zKS5tYXRjaCkucGxhY2Vob2xkZXIgIT09IHVuZGVmaW5lZCB8fCAhMCA9PT0gcmV0dXJuUEwpIHJldHVybiAkLmlzRnVuY3Rpb24odGVzdC5wbGFjZWhvbGRlcikgPyB0ZXN0LnBsYWNlaG9sZGVyKG9wdHMpIDogdGVzdC5wbGFjZWhvbGRlcjtcbiAgICAgICAgICAgICAgICBpZiAobnVsbCA9PT0gdGVzdC5mbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zID4gLTEgJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZUZXN0LCB0ZXN0cyA9IGdldFRlc3RzKHBvcyksIHN0YXRpY0FsdGVybmF0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RzLmxlbmd0aCA+IDEgKyAoXCJcIiA9PT0gdGVzdHNbdGVzdHMubGVuZ3RoIC0gMV0ubWF0Y2guZGVmID8gMSA6IDApKSBmb3IgKHZhciBpID0gMDsgaSA8IHRlc3RzLmxlbmd0aDsgaSsrKSBpZiAoITAgIT09IHRlc3RzW2ldLm1hdGNoLm9wdGlvbmFsaXR5ICYmICEwICE9PSB0ZXN0c1tpXS5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgJiYgKG51bGwgPT09IHRlc3RzW2ldLm1hdGNoLmZuIHx8IHByZXZUZXN0ID09PSB1bmRlZmluZWQgfHwgITEgIT09IHRlc3RzW2ldLm1hdGNoLmZuLnRlc3QocHJldlRlc3QubWF0Y2guZGVmLCBnZXRNYXNrU2V0KCksIHBvcywgITAsIG9wdHMpKSAmJiAoc3RhdGljQWx0ZXJuYXRpb25zLnB1c2godGVzdHNbaV0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgPT09IHRlc3RzW2ldLm1hdGNoLmZuICYmIChwcmV2VGVzdCA9IHRlc3RzW2ldKSwgc3RhdGljQWx0ZXJuYXRpb25zLmxlbmd0aCA+IDEgJiYgL1swLTlhLWJBLVpdLy50ZXN0KHN0YXRpY0FsdGVybmF0aW9uc1swXS5tYXRjaC5kZWYpKSkgcmV0dXJuIG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KHBvcyAlIG9wdHMucGxhY2Vob2xkZXIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVzdC5kZWY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdChwb3MgJSBvcHRzLnBsYWNlaG9sZGVyLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWVCdWZmZXIsIEV2ZW50UnVsZXIgPSB7XG4gICAgICAgICAgICAgICAgb246IGZ1bmN0aW9uKGlucHV0LCBldmVudE5hbWUsIGV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXYgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5pbnB1dG1hc2sgPT09IHVuZGVmaW5lZCAmJiBcIkZPUk1cIiAhPT0gdGhpcy5ub2RlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbU9wdHMgPSAkLmRhdGEodGhhdCwgXCJfaW5wdXRtYXNrX29wdHNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1PcHRzID8gbmV3IElucHV0bWFzayhpbU9wdHMpLm1hc2sodGhhdCkgOiBFdmVudFJ1bGVyLm9mZih0aGF0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwic2V0dmFsdWVcIiA9PT0gZS50eXBlIHx8IFwiRk9STVwiID09PSB0aGlzLm5vZGVOYW1lIHx8ICEodGhhdC5kaXNhYmxlZCB8fCB0aGF0LnJlYWRPbmx5ICYmICEoXCJrZXlkb3duXCIgPT09IGUudHlwZSAmJiBlLmN0cmxLZXkgJiYgNjcgPT09IGUua2V5Q29kZSB8fCAhMSA9PT0gb3B0cy50YWJUaHJvdWdoICYmIGUua2V5Q29kZSA9PT0gSW5wdXRtYXNrLmtleUNvZGUuVEFCKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5wdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gc2tpcElucHV0RXZlbnQpIHJldHVybiBza2lwSW5wdXRFdmVudCA9ICExLCBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tDYXJldCA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIuYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCksICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwia2V5ZG93blwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcEtleVByZXNzRXZlbnQgPSAhMSwgc2tpcElucHV0RXZlbnQgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImtleXByZXNzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgPT09IHNraXBLZXlQcmVzc0V2ZW50KSByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcEtleVByZXNzRXZlbnQgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNsaWNrXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWVtb2JpbGUgfHwgaXBob25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApLCAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuVmFsID0gZXZlbnRIYW5kbGVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFja0NhcmV0ICYmICh0cmFja0NhcmV0ID0gITEsIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldCh0aGF0LCB0aGF0LmlucHV0bWFzay5jYXJldFBvcywgdW5kZWZpbmVkLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSwgITEgPT09IHJldHVyblZhbCAmJiAoZS5wcmV2ZW50RGVmYXVsdCgpLCBlLnN0b3BQcm9wYWdhdGlvbigpKSwgcmV0dXJuVmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmlucHV0bWFzay5ldmVudHNbZXZlbnROYW1lXSA9IGlucHV0LmlucHV0bWFzay5ldmVudHNbZXZlbnROYW1lXSB8fCBbXSwgaW5wdXQuaW5wdXRtYXNrLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZXYpLCBcbiAgICAgICAgICAgICAgICAgICAgLTEgIT09ICQuaW5BcnJheShldmVudE5hbWUsIFsgXCJzdWJtaXRcIiwgXCJyZXNldFwiIF0pID8gbnVsbCAhPT0gaW5wdXQuZm9ybSAmJiAkKGlucHV0LmZvcm0pLm9uKGV2ZW50TmFtZSwgZXYpIDogJChpbnB1dCkub24oZXZlbnROYW1lLCBldik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvZmY6IGZ1bmN0aW9uKGlucHV0LCBldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnRzO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5pbnB1dG1hc2sgJiYgaW5wdXQuaW5wdXRtYXNrLmV2ZW50cyAmJiAoZXZlbnQgPyAoZXZlbnRzID0gW10pW2V2ZW50XSA9IGlucHV0LmlucHV0bWFzay5ldmVudHNbZXZlbnRdIDogZXZlbnRzID0gaW5wdXQuaW5wdXRtYXNrLmV2ZW50cywgXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChldmVudHMsIGZ1bmN0aW9uKGV2ZW50TmFtZSwgZXZBcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoO2V2QXJyLmxlbmd0aCA+IDA7ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldiA9IGV2QXJyLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0xICE9PSAkLmluQXJyYXkoZXZlbnROYW1lLCBbIFwic3VibWl0XCIsIFwicmVzZXRcIiBdKSA/IG51bGwgIT09IGlucHV0LmZvcm0gJiYgJChpbnB1dC5mb3JtKS5vZmYoZXZlbnROYW1lLCBldikgOiAkKGlucHV0KS5vZmYoZXZlbnROYW1lLCBldik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgaW5wdXQuaW5wdXRtYXNrLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgRXZlbnRIYW5kbGVycyA9IHtcbiAgICAgICAgICAgICAgICBrZXlkb3duRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcywgJGlucHV0ID0gJChpbnB1dCksIGsgPSBlLmtleUNvZGUsIHBvcyA9IGNhcmV0KGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT09IElucHV0bWFzay5rZXlDb2RlLkJBQ0tTUEFDRSB8fCBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEUgfHwgaXBob25lICYmIGsgPT09IElucHV0bWFzay5rZXlDb2RlLkJBQ0tTUEFDRV9TQUZBUkkgfHwgZS5jdHJsS2V5ICYmIGsgPT09IElucHV0bWFzay5rZXlDb2RlLlggJiYgIWlzSW5wdXRFdmVudFN1cHBvcnRlZChcImN1dFwiKSkgZS5wcmV2ZW50RGVmYXVsdCgpLCBcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGlucHV0LCBrLCBwb3MpLCB3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QnVmZmVyKCEwKSwgZ2V0TWFza1NldCgpLnAsIGUsIGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSk7IGVsc2UgaWYgKGsgPT09IElucHV0bWFzay5rZXlDb2RlLkVORCB8fCBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5QQUdFX0RPV04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IHNlZWtOZXh0KGdldExhc3RWYWxpZFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5pbnNlcnRNb2RlIHx8IGNhcmV0UG9zICE9PSBnZXRNYXNrU2V0KCkubWFza0xlbmd0aCB8fCBlLnNoaWZ0S2V5IHx8IGNhcmV0UG9zLS0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIGUuc2hpZnRLZXkgPyBwb3MuYmVnaW4gOiBjYXJldFBvcywgY2FyZXRQb3MsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGsgPT09IElucHV0bWFzay5rZXlDb2RlLkhPTUUgJiYgIWUuc2hpZnRLZXkgfHwgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuUEFHRV9VUCA/IChlLnByZXZlbnREZWZhdWx0KCksIFxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgMCwgZS5zaGlmdEtleSA/IHBvcy5iZWdpbiA6IDAsICEwKSkgOiAob3B0cy51bmRvT25Fc2NhcGUgJiYgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuRVNDQVBFIHx8IDkwID09PSBrICYmIGUuY3RybEtleSkgJiYgITAgIT09IGUuYWx0S2V5ID8gKGNoZWNrVmFsKGlucHV0LCAhMCwgITEsIHVuZG9WYWx1ZS5zcGxpdChcIlwiKSksIFxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQudHJpZ2dlcihcImNsaWNrXCIpKSA6IGsgIT09IElucHV0bWFzay5rZXlDb2RlLklOU0VSVCB8fCBlLnNoaWZ0S2V5IHx8IGUuY3RybEtleSA/ICEwID09PSBvcHRzLnRhYlRocm91Z2ggJiYgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuVEFCID8gKCEwID09PSBlLnNoaWZ0S2V5ID8gKG51bGwgPT09IGdldFRlc3QocG9zLmJlZ2luKS5tYXRjaC5mbiAmJiAocG9zLmJlZ2luID0gc2Vla05leHQocG9zLmJlZ2luKSksIFxuICAgICAgICAgICAgICAgICAgICBwb3MuZW5kID0gc2Vla1ByZXZpb3VzKHBvcy5iZWdpbiwgITApLCBwb3MuYmVnaW4gPSBzZWVrUHJldmlvdXMocG9zLmVuZCwgITApKSA6IChwb3MuYmVnaW4gPSBzZWVrTmV4dChwb3MuYmVnaW4sICEwKSwgXG4gICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBzZWVrTmV4dChwb3MuYmVnaW4sICEwKSwgcG9zLmVuZCA8IGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoICYmIHBvcy5lbmQtLSksIFxuICAgICAgICAgICAgICAgICAgICBwb3MuYmVnaW4gPCBnZXRNYXNrU2V0KCkubWFza0xlbmd0aCAmJiAoZS5wcmV2ZW50RGVmYXVsdCgpLCBjYXJldChpbnB1dCwgcG9zLmJlZ2luLCBwb3MuZW5kKSkpIDogZS5zaGlmdEtleSB8fCAhMSA9PT0gb3B0cy5pbnNlcnRNb2RlICYmIChrID09PSBJbnB1dG1hc2sua2V5Q29kZS5SSUdIVCA/IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3MgPSBjYXJldChpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY2FyZXRQb3MuYmVnaW4pO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKSA6IGsgPT09IElucHV0bWFzay5rZXlDb2RlLkxFRlQgJiYgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBpc1JUTCA/IGNhcmV0UG9zLmJlZ2luICsgMSA6IGNhcmV0UG9zLmJlZ2luIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApKSA6IChvcHRzLmluc2VydE1vZGUgPSAhb3B0cy5pbnNlcnRNb2RlLCBjYXJldChpbnB1dCwgb3B0cy5pbnNlcnRNb2RlIHx8IHBvcy5iZWdpbiAhPT0gZ2V0TWFza1NldCgpLm1hc2tMZW5ndGggPyBwb3MuYmVnaW4gOiBwb3MuYmVnaW4gLSAxKSk7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMub25LZXlEb3duLmNhbGwodGhpcywgZSwgZ2V0QnVmZmVyKCksIGNhcmV0KGlucHV0KS5iZWdpbiwgb3B0cyksIGlnbm9yYWJsZSA9IC0xICE9PSAkLmluQXJyYXkoaywgb3B0cy5pZ25vcmFibGVzKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGtleXByZXNzRXZlbnQ6IGZ1bmN0aW9uKGUsIGNoZWNrdmFsLCB3cml0ZU91dCwgc3RyaWN0LCBuZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcywgJGlucHV0ID0gJChpbnB1dCksIGsgPSBlLndoaWNoIHx8IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoISghMCA9PT0gY2hlY2t2YWwgfHwgZS5jdHJsS2V5ICYmIGUuYWx0S2V5KSAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSB8fCBpZ25vcmFibGUpKSByZXR1cm4gayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuRU5URVIgJiYgdW5kb1ZhbHVlICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpICYmICh1bmRvVmFsdWUgPSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKSksICEwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgNDYgPT09IGsgJiYgITEgPT09IGUuc2hpZnRLZXkgJiYgXCJcIiAhPT0gb3B0cy5yYWRpeFBvaW50ICYmIChrID0gb3B0cy5yYWRpeFBvaW50LmNoYXJDb2RlQXQoMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcndhcmRQb3NpdGlvbiwgcG9zID0gY2hlY2t2YWwgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IG5keCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IG5keFxuICAgICAgICAgICAgICAgICAgICAgICAgfSA6IGNhcmV0KGlucHV0KSwgYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoayksIG9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5fcmFkaXhEYW5jZSAmJiBvcHRzLm51bWVyaWNJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGdldEJ1ZmZlcigpLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50LmNoYXJBdCgwKSkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA8PSBjYXJldFBvcyAmJiAoayA9PT0gb3B0cy5yYWRpeFBvaW50LmNoYXJDb2RlQXQoMCkgJiYgKG9mZnNldCA9IDEpLCBwb3MuYmVnaW4gLT0gMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmVuZCAtPSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE1hc2tTZXQoKS53cml0ZU91dEJ1ZmZlciA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbFJlc3VsdCA9IGlzVmFsaWQocG9zLCBjLCBzdHJpY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCExICE9PSB2YWxSZXN1bHQgJiYgKHJlc2V0TWFza1NldCghMCksIGZvcndhcmRQb3NpdGlvbiA9IHZhbFJlc3VsdC5jYXJldCAhPT0gdW5kZWZpbmVkID8gdmFsUmVzdWx0LmNhcmV0IDogc2Vla05leHQodmFsUmVzdWx0LnBvcy5iZWdpbiA/IHZhbFJlc3VsdC5wb3MuYmVnaW4gOiB2YWxSZXN1bHQucG9zKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkucCA9IGZvcndhcmRQb3NpdGlvbiksIGZvcndhcmRQb3NpdGlvbiA9IChvcHRzLm51bWVyaWNJbnB1dCAmJiB2YWxSZXN1bHQuY2FyZXQgPT09IHVuZGVmaW5lZCA/IHNlZWtQcmV2aW91cyhmb3J3YXJkUG9zaXRpb24pIDogZm9yd2FyZFBvc2l0aW9uKSArIG9mZnNldCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAhMSAhPT0gd3JpdGVPdXQgJiYgKHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5vbktleVZhbGlkYXRpb24uY2FsbChpbnB1dCwgaywgdmFsUmVzdWx0LCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApLCBnZXRNYXNrU2V0KCkud3JpdGVPdXRCdWZmZXIgJiYgITEgIT09IHZhbFJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QnVmZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlciwgZm9yd2FyZFBvc2l0aW9uLCBlLCAhMCAhPT0gY2hlY2t2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQoKSwgY2hlY2t2YWwpIHJldHVybiAhMSAhPT0gdmFsUmVzdWx0ICYmICh2YWxSZXN1bHQuZm9yd2FyZFBvc2l0aW9uID0gZm9yd2FyZFBvc2l0aW9uKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhc3RlRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBWYWx1ZSwgZXYgPSBlLm9yaWdpbmFsRXZlbnQgfHwgZSwgaW5wdXRWYWx1ZSA9ICgkKHRoaXMpLCB0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoITApKSwgY2FyZXRQb3MgPSBjYXJldCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgaXNSVEwgJiYgKHRlbXBWYWx1ZSA9IGNhcmV0UG9zLmVuZCwgY2FyZXRQb3MuZW5kID0gY2FyZXRQb3MuYmVnaW4sIGNhcmV0UG9zLmJlZ2luID0gdGVtcFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlQmVmb3JlQ2FyZXQgPSBpbnB1dFZhbHVlLnN1YnN0cigwLCBjYXJldFBvcy5iZWdpbiksIHZhbHVlQWZ0ZXJDYXJldCA9IGlucHV0VmFsdWUuc3Vic3RyKGNhcmV0UG9zLmVuZCwgaW5wdXRWYWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVCZWZvcmVDYXJldCA9PT0gKGlzUlRMID8gZ2V0QnVmZmVyVGVtcGxhdGUoKS5yZXZlcnNlKCkgOiBnZXRCdWZmZXJUZW1wbGF0ZSgpKS5zbGljZSgwLCBjYXJldFBvcy5iZWdpbikuam9pbihcIlwiKSAmJiAodmFsdWVCZWZvcmVDYXJldCA9IFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVBZnRlckNhcmV0ID09PSAoaXNSVEwgPyBnZXRCdWZmZXJUZW1wbGF0ZSgpLnJldmVyc2UoKSA6IGdldEJ1ZmZlclRlbXBsYXRlKCkpLnNsaWNlKGNhcmV0UG9zLmVuZCkuam9pbihcIlwiKSAmJiAodmFsdWVBZnRlckNhcmV0ID0gXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBpc1JUTCAmJiAodGVtcFZhbHVlID0gdmFsdWVCZWZvcmVDYXJldCwgdmFsdWVCZWZvcmVDYXJldCA9IHZhbHVlQWZ0ZXJDYXJldCwgdmFsdWVBZnRlckNhcmV0ID0gdGVtcFZhbHVlKSwgXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGlwYm9hcmREYXRhICYmIHdpbmRvdy5jbGlwYm9hcmREYXRhLmdldERhdGEpIGlucHV0VmFsdWUgPSB2YWx1ZUJlZm9yZUNhcmV0ICsgd2luZG93LmNsaXBib2FyZERhdGEuZ2V0RGF0YShcIlRleHRcIikgKyB2YWx1ZUFmdGVyQ2FyZXQ7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFldi5jbGlwYm9hcmREYXRhIHx8ICFldi5jbGlwYm9hcmREYXRhLmdldERhdGEpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSB2YWx1ZUJlZm9yZUNhcmV0ICsgZXYuY2xpcGJvYXJkRGF0YS5nZXREYXRhKFwidGV4dC9wbGFpblwiKSArIHZhbHVlQWZ0ZXJDYXJldDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFzdGVWYWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24ob3B0cy5vbkJlZm9yZVBhc3RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCExID09PSAocGFzdGVWYWx1ZSA9IG9wdHMub25CZWZvcmVQYXN0ZS5jYWxsKGlucHV0bWFzaywgaW5wdXRWYWx1ZSwgb3B0cykpKSByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFzdGVWYWx1ZSB8fCAocGFzdGVWYWx1ZSA9IGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGVja1ZhbCh0aGlzLCAhMSwgITEsIGlzUlRMID8gcGFzdGVWYWx1ZS5zcGxpdChcIlwiKS5yZXZlcnNlKCkgOiBwYXN0ZVZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoXCJcIikpLCBcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIodGhpcywgZ2V0QnVmZmVyKCksIHNlZWtOZXh0KGdldExhc3RWYWxpZFBvc2l0aW9uKCkpLCBlLCB1bmRvVmFsdWUgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikpLCBcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXRGYWxsQmFja0V2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsIGlucHV0VmFsdWUgPSBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnZXRCdWZmZXIoKS5qb2luKFwiXCIpICE9PSBpbnB1dFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3MgPSBjYXJldChpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXRWYWx1ZSA9IGZ1bmN0aW9uKGlucHV0LCBpbnB1dFZhbHVlLCBjYXJldFBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZW1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXRDaGFyID0gaW5wdXRWYWx1ZS5yZXBsYWNlKGdldEJ1ZmZlcigpLmpvaW4oXCJcIiksIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMSA9PT0gaW5wdXRDaGFyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl2ID0gaW5wdXRWYWx1ZS5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl2LnNwbGljZShjYXJldFBvcy5iZWdpbiwgMCwgaW5wdXRDaGFyKSwgaW5wdXRWYWx1ZSA9IGl2LmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KDAsIGlucHV0VmFsdWUgPSBmdW5jdGlvbihpbnB1dCwgaW5wdXRWYWx1ZSwgY2FyZXRQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCIuXCIgPT09IGlucHV0VmFsdWUuY2hhckF0KGNhcmV0UG9zLmJlZ2luIC0gMSkgJiYgXCJcIiAhPT0gb3B0cy5yYWRpeFBvaW50ICYmICgoaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3BsaXQoXCJcIikpW2NhcmV0UG9zLmJlZ2luIC0gMV0gPSBvcHRzLnJhZGl4UG9pbnQuY2hhckF0KDApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5qb2luKFwiXCIpKSwgaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0oMCwgaW5wdXRWYWx1ZSwgY2FyZXRQb3MpLCBjYXJldFBvcyksIGdldEJ1ZmZlcigpLmpvaW4oXCJcIikgIT09IGlucHV0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSwgb2Zmc2V0ID0gIW9wdHMubnVtZXJpY0lucHV0ICYmIGlucHV0VmFsdWUubGVuZ3RoID4gYnVmZmVyLmxlbmd0aCA/IC0xIDogMCwgZnJvbnRQYXJ0ID0gaW5wdXRWYWx1ZS5zdWJzdHIoMCwgY2FyZXRQb3MuYmVnaW4pLCBiYWNrUGFydCA9IGlucHV0VmFsdWUuc3Vic3RyKGNhcmV0UG9zLmJlZ2luKSwgZnJvbnRCdWZmZXJQYXJ0ID0gYnVmZmVyLnN1YnN0cigwLCBjYXJldFBvcy5iZWdpbiArIG9mZnNldCksIGJhY2tCdWZmZXJQYXJ0ID0gYnVmZmVyLnN1YnN0cihjYXJldFBvcy5iZWdpbiArIG9mZnNldCksIHNlbGVjdGlvbiA9IGNhcmV0UG9zLCBlbnRyaWVzID0gXCJcIiwgaXNFbnRyeSA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmcm9udFBhcnQgIT09IGZyb250QnVmZmVyUGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBmcGwgPSAoaXNFbnRyeSA9IGZyb250UGFydC5sZW5ndGggPj0gZnJvbnRCdWZmZXJQYXJ0Lmxlbmd0aCkgPyBmcm9udFBhcnQubGVuZ3RoIDogZnJvbnRCdWZmZXJQYXJ0Lmxlbmd0aCwgaSA9IDA7IGZyb250UGFydC5jaGFyQXQoaSkgPT09IGZyb250QnVmZmVyUGFydC5jaGFyQXQoaSkgJiYgaSA8IGZwbDsgaSsrKSA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRW50cnkgJiYgKDAgPT09IG9mZnNldCAmJiAoc2VsZWN0aW9uLmJlZ2luID0gaSksIGVudHJpZXMgKz0gZnJvbnRQYXJ0LnNsaWNlKGksIHNlbGVjdGlvbi5lbmQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhY2tQYXJ0ICE9PSBiYWNrQnVmZmVyUGFydCAmJiAoYmFja1BhcnQubGVuZ3RoID4gYmFja0J1ZmZlclBhcnQubGVuZ3RoID8gZW50cmllcyArPSBiYWNrUGFydC5zbGljZSgwLCAxKSA6IGJhY2tQYXJ0Lmxlbmd0aCA8IGJhY2tCdWZmZXJQYXJ0Lmxlbmd0aCAmJiAoc2VsZWN0aW9uLmVuZCArPSBiYWNrQnVmZmVyUGFydC5sZW5ndGggLSBiYWNrUGFydC5sZW5ndGgsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRW50cnkgfHwgXCJcIiA9PT0gb3B0cy5yYWRpeFBvaW50IHx8IFwiXCIgIT09IGJhY2tQYXJ0IHx8IGZyb250UGFydC5jaGFyQXQoc2VsZWN0aW9uLmJlZ2luICsgb2Zmc2V0IC0gMSkgIT09IG9wdHMucmFkaXhQb2ludCB8fCAoc2VsZWN0aW9uLmJlZ2luLS0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXMgPSBvcHRzLnJhZGl4UG9pbnQpKSksIHdyaXRlQnVmZmVyKGlucHV0LCBnZXRCdWZmZXIoKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogc2VsZWN0aW9uLmJlZ2luICsgb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IHNlbGVjdGlvbi5lbmQgKyBvZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgZW50cmllcy5sZW5ndGggPiAwKSAkLmVhY2goZW50cmllcy5zcGxpdChcIlwiKSwgZnVuY3Rpb24obmR4LCBlbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5cHJlc3MgPSBuZXcgJC5FdmVudChcImtleXByZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlwcmVzcy53aGljaCA9IGVudHJ5LmNoYXJDb2RlQXQoMCksIGlnbm9yYWJsZSA9ICExLCBFdmVudEhhbmRsZXJzLmtleXByZXNzRXZlbnQuY2FsbChpbnB1dCwga2V5cHJlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmJlZ2luID09PSBzZWxlY3Rpb24uZW5kIC0gMSAmJiAoc2VsZWN0aW9uLmJlZ2luID0gc2Vla1ByZXZpb3VzKHNlbGVjdGlvbi5iZWdpbiArIDEpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmJlZ2luID09PSBzZWxlY3Rpb24uZW5kIC0gMSA/IGNhcmV0KGlucHV0LCBzZWxlY3Rpb24uYmVnaW4pIDogY2FyZXQoaW5wdXQsIHNlbGVjdGlvbi5iZWdpbiwgc2VsZWN0aW9uLmVuZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ZG93biA9IG5ldyAkLkV2ZW50KFwia2V5ZG93blwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ZG93bi5rZXlDb2RlID0gb3B0cy5udW1lcmljSW5wdXQgPyBJbnB1dG1hc2sua2V5Q29kZS5CQUNLU1BBQ0UgOiBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFdmVudEhhbmRsZXJzLmtleWRvd25FdmVudC5jYWxsKGlucHV0LCBrZXlkb3duKSwgITEgPT09IG9wdHMuaW5zZXJ0TW9kZSAmJiBjYXJldChpbnB1dCwgY2FyZXQoaW5wdXQpLmJlZ2luIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VmFsdWVFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0bWFzay5yZWZyZXNoVmFsdWUgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gKHZhbHVlID0gZSAmJiBlLmRldGFpbCA/IGUuZGV0YWlsWzBdIDogYXJndW1lbnRzWzFdKSB8fCB0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoITApO1xuICAgICAgICAgICAgICAgICAgICAkLmlzRnVuY3Rpb24ob3B0cy5vbkJlZm9yZU1hc2spICYmICh2YWx1ZSA9IG9wdHMub25CZWZvcmVNYXNrLmNhbGwoaW5wdXRtYXNrLCB2YWx1ZSwgb3B0cykgfHwgdmFsdWUpLCBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIlwiKSwgY2hlY2tWYWwodGhpcywgITAsICExLCBpc1JUTCA/IHZhbHVlLnJldmVyc2UoKSA6IHZhbHVlKSwgXG4gICAgICAgICAgICAgICAgICAgIHVuZG9WYWx1ZSA9IGdldEJ1ZmZlcigpLmpvaW4oXCJcIiksIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzIHx8IG9wdHMuY2xlYXJJbmNvbXBsZXRlKSAmJiB0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoKSA9PT0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpICYmIHRoaXMuaW5wdXRtYXNrLl92YWx1ZVNldChcIlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZvY3VzRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5wdFZhbHVlID0gdGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuc2hvd01hc2tPbkZvY3VzICYmICghb3B0cy5zaG93TWFza09uSG92ZXIgfHwgb3B0cy5zaG93TWFza09uSG92ZXIgJiYgXCJcIiA9PT0gbnB0VmFsdWUpICYmICh0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoKSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSA/IHdyaXRlQnVmZmVyKHRoaXMsIGdldEJ1ZmZlcigpLCBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKSkgOiAhMSA9PT0gbW91c2VFbnRlciAmJiBjYXJldCh0aGlzLCBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKSkpLCBcbiAgICAgICAgICAgICAgICAgICAgITAgPT09IG9wdHMucG9zaXRpb25DYXJldE9uVGFiICYmICExID09PSBtb3VzZUVudGVyICYmIEV2ZW50SGFuZGxlcnMuY2xpY2tFdmVudC5hcHBseSh0aGlzLCBbIGUsICEwIF0pLCBcbiAgICAgICAgICAgICAgICAgICAgdW5kb1ZhbHVlID0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1vdXNlbGVhdmVFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW91c2VFbnRlciA9ICExLCBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBnZXRCdWZmZXIoKS5zbGljZSgpLCBucHRWYWx1ZSA9IHRoaXMuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbnB0VmFsdWUgIT09IHRoaXMuZ2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIikgJiYgXCJcIiAhPT0gbnB0VmFsdWUgJiYgKC0xID09PSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpICYmIG5wdFZhbHVlID09PSBnZXRCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oXCJcIikgPyBidWZmZXIgPSBbXSA6IGNsZWFyT3B0aW9uYWxUYWlsKGJ1ZmZlciksIFxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIodGhpcywgYnVmZmVyKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQ6IGZ1bmN0aW9uKGUsIHRhYmJlZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkQ2FyZXQgPSBjYXJldChpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhYmJlZCAmJiAoaXNSVEwgPyBzZWxlY3RlZENhcmV0LmVuZCA9IHNlbGVjdGVkQ2FyZXQuYmVnaW4gOiBzZWxlY3RlZENhcmV0LmJlZ2luID0gc2VsZWN0ZWRDYXJldC5lbmQpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENhcmV0LmJlZ2luID09PSBzZWxlY3RlZENhcmV0LmVuZCkgc3dpdGNoIChvcHRzLnBvc2l0aW9uQ2FyZXRPbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibm9uZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgMCwgZ2V0QnVmZmVyKCkubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyYWRpeEZvY3VzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmdW5jdGlvbihjbGlja1Bvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgIT09IG9wdHMucmFkaXhQb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2cHMgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZwc1tjbGlja1Bvc10gPT09IHVuZGVmaW5lZCB8fCB2cHNbY2xpY2tQb3NdLmlucHV0ID09PSBnZXRQbGFjZWhvbGRlcihjbGlja1BvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrUG9zIDwgc2Vla05leHQoLTEpKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRpeFBvcyA9ICQuaW5BcnJheShvcHRzLnJhZGl4UG9pbnQsIGdldEJ1ZmZlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0xICE9PSByYWRpeFBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdnAgaW4gdnBzKSBpZiAocmFkaXhQb3MgPCB2cCAmJiB2cHNbdnBdLmlucHV0ICE9PSBnZXRQbGFjZWhvbGRlcih2cCkpIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfShzZWxlY3RlZENhcmV0LmJlZ2luKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGl4UG9zID0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKS5pbmRleE9mKG9wdHMucmFkaXhQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgb3B0cy5udW1lcmljSW5wdXQgPyBzZWVrTmV4dChyYWRpeFBvcykgOiByYWRpeFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWdub3JlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xpY2tQb3NpdGlvbiA9IHNlbGVjdGVkQ2FyZXQuYmVnaW4sIGx2Y2xpY2tQb3NpdGlvbiA9IGdldExhc3RWYWxpZFBvc2l0aW9uKGNsaWNrUG9zaXRpb24sICEwKSwgbGFzdFBvc2l0aW9uID0gc2Vla05leHQobHZjbGlja1Bvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrUG9zaXRpb24gPCBsYXN0UG9zaXRpb24pIGNhcmV0KGlucHV0LCBpc01hc2soY2xpY2tQb3NpdGlvbiwgITApIHx8IGlzTWFzayhjbGlja1Bvc2l0aW9uIC0gMSwgITApID8gY2xpY2tQb3NpdGlvbiA6IHNlZWtOZXh0KGNsaWNrUG9zaXRpb24pKTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbHZwID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2x2Y2xpY2tQb3NpdGlvbl0sIHR0ID0gZ2V0VGVzdFRlbXBsYXRlKGxhc3RQb3NpdGlvbiwgbHZwID8gbHZwLm1hdGNoLmxvY2F0b3IgOiB1bmRlZmluZWQsIGx2cCksIHBsYWNlaG9sZGVyID0gZ2V0UGxhY2Vob2xkZXIobGFzdFBvc2l0aW9uLCB0dC5tYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiAhPT0gcGxhY2Vob2xkZXIgJiYgZ2V0QnVmZmVyKClbbGFzdFBvc2l0aW9uXSAhPT0gcGxhY2Vob2xkZXIgJiYgITAgIT09IHR0Lm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciAmJiAhMCAhPT0gdHQubWF0Y2gubmV3QmxvY2tNYXJrZXIgfHwgIWlzTWFzayhsYXN0UG9zaXRpb24sIG9wdHMua2VlcFN0YXRpYykgJiYgdHQubWF0Y2guZGVmID09PSBwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdQb3MgPSBzZWVrTmV4dChsYXN0UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGlja1Bvc2l0aW9uID49IG5ld1BvcyB8fCBjbGlja1Bvc2l0aW9uID09PSBsYXN0UG9zaXRpb24pICYmIChsYXN0UG9zaXRpb24gPSBuZXdQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIGxhc3RQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGJsY2xpY2tFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIDAsIHNlZWtOZXh0KGdldExhc3RWYWxpZFBvc2l0aW9uKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjdXRFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gY2FyZXQodGhpcyksIGV2ID0gZS5vcmlnaW5hbEV2ZW50IHx8IGUsIGNsaXBib2FyZERhdGEgPSB3aW5kb3cuY2xpcGJvYXJkRGF0YSB8fCBldi5jbGlwYm9hcmREYXRhLCBjbGlwRGF0YSA9IGlzUlRMID8gZ2V0QnVmZmVyKCkuc2xpY2UocG9zLmVuZCwgcG9zLmJlZ2luKSA6IGdldEJ1ZmZlcigpLnNsaWNlKHBvcy5iZWdpbiwgcG9zLmVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGNsaXBib2FyZERhdGEuc2V0RGF0YShcInRleHRcIiwgaXNSVEwgPyBjbGlwRGF0YS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IGNsaXBEYXRhLmpvaW4oXCJcIikpLCBcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQgJiYgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpLCBoYW5kbGVSZW1vdmUodGhpcywgSW5wdXRtYXNrLmtleUNvZGUuREVMRVRFLCBwb3MpLCBcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIodGhpcywgZ2V0QnVmZmVyKCksIGdldE1hc2tTZXQoKS5wLCBlLCB1bmRvVmFsdWUgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYmx1ckV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dG1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBucHRWYWx1ZSA9IHRoaXMuaW5wdXRtYXNrLl92YWx1ZUdldCgpLCBidWZmZXIgPSBnZXRCdWZmZXIoKS5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiA9PT0gbnB0VmFsdWUgJiYgY29sb3JNYXNrID09PSB1bmRlZmluZWQgfHwgKG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgJiYgKC0xID09PSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpICYmIG5wdFZhbHVlID09PSBnZXRCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oXCJcIikgPyBidWZmZXIgPSBbXSA6IGNsZWFyT3B0aW9uYWxUYWlsKGJ1ZmZlcikpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICExID09PSBpc0NvbXBsZXRlKGJ1ZmZlcikgJiYgKHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJpbmNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCksIG9wdHMuY2xlYXJJbmNvbXBsZXRlICYmIChyZXNldE1hc2tTZXQoKSwgYnVmZmVyID0gb3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyA/IFtdIDogZ2V0QnVmZmVyVGVtcGxhdGUoKS5zbGljZSgpKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIodGhpcywgYnVmZmVyLCB1bmRlZmluZWQsIGUpKSwgdW5kb1ZhbHVlICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpICYmICh1bmRvVmFsdWUgPSBidWZmZXIuam9pbihcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudHJpZ2dlcihcImNoYW5nZVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1vdXNlZW50ZXJFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBtb3VzZUVudGVyID0gITAsIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMgJiYgb3B0cy5zaG93TWFza09uSG92ZXIgJiYgdGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikgJiYgd3JpdGVCdWZmZXIodGhpcywgZ2V0QnVmZmVyKCkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VibWl0RXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5kb1ZhbHVlICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpICYmICRlbC50cmlnZ2VyKFwiY2hhbmdlXCIpLCBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzICYmIC0xID09PSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpICYmIGVsLmlucHV0bWFzay5fdmFsdWVHZXQgJiYgZWwuaW5wdXRtYXNrLl92YWx1ZUdldCgpID09PSBnZXRCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oXCJcIikgJiYgZWwuaW5wdXRtYXNrLl92YWx1ZVNldChcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuY2xlYXJJbmNvbXBsZXRlICYmICExID09PSBpc0NvbXBsZXRlKGdldEJ1ZmZlcigpKSAmJiBlbC5pbnB1dG1hc2suX3ZhbHVlU2V0KFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5yZW1vdmVNYXNrT25TdWJtaXQgJiYgKGVsLmlucHV0bWFzay5fdmFsdWVTZXQoZWwuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSwgITApLCBcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGVsLCBnZXRCdWZmZXIoKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlc2V0RXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuaW5wdXRtYXNrLnJlZnJlc2hWYWx1ZSA9ICEwLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLnRyaWdnZXIoXCJzZXR2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrVmFsKGlucHV0LCB3cml0ZU91dCwgc3RyaWN0LCBucHR2bCwgaW5pdGlhdGluZ0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0VmFsdWUgPSBucHR2bC5zbGljZSgpLCBjaGFyQ29kZXMgPSBcIlwiLCBpbml0aWFsTmR4ID0gLTEsIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBpZiAocmVzZXRNYXNrU2V0KCksIHN0cmljdCB8fCAhMCA9PT0gb3B0cy5hdXRvVW5tYXNrKSBpbml0aWFsTmR4ID0gc2Vla05leHQoaW5pdGlhbE5keCk7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGljSW5wdXQgPSBnZXRCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKDAsIHNlZWtOZXh0KC0xKSkuam9pbihcIlwiKSwgbWF0Y2hlcyA9IGlucHV0VmFsdWUuam9pbihcIlwiKS5tYXRjaChuZXcgUmVnRXhwKFwiXlwiICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KHN0YXRpY0lucHV0KSwgXCJnXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+IDAgJiYgKGlucHV0VmFsdWUuc3BsaWNlKDAsIG1hdGNoZXMubGVuZ3RoICogc3RhdGljSW5wdXQubGVuZ3RoKSwgXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxOZHggPSBzZWVrTmV4dChpbml0aWFsTmR4KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC0xID09PSBpbml0aWFsTmR4ID8gKGdldE1hc2tTZXQoKS5wID0gc2Vla05leHQoaW5pdGlhbE5keCksIGluaXRpYWxOZHggPSAwKSA6IGdldE1hc2tTZXQoKS5wID0gaW5pdGlhbE5keCwgXG4gICAgICAgICAgICAgICAgJC5lYWNoKGlucHV0VmFsdWUsIGZ1bmN0aW9uKG5keCwgY2hhckNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlICE9PSB1bmRlZmluZWQpIGlmIChnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbmR4XSA9PT0gdW5kZWZpbmVkICYmIGlucHV0VmFsdWVbbmR4XSA9PT0gZ2V0UGxhY2Vob2xkZXIobmR4KSAmJiBpc01hc2sobmR4LCAhMCkgJiYgITEgPT09IGlzVmFsaWQobmR4LCBpbnB1dFZhbHVlW25keF0sICEwLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgITApKSBnZXRNYXNrU2V0KCkucCsrOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlwcmVzcyA9IG5ldyAkLkV2ZW50KFwiX2NoZWNrdmFsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cHJlc3Mud2hpY2ggPSBjaGFyQ29kZS5jaGFyQ29kZUF0KDApLCBjaGFyQ29kZXMgKz0gY2hhckNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24odW5kZWZpbmVkLCAhMCksIHByZXZUZXN0ID0gZ2V0VGVzdChsdnApLCBuZXh0VGVzdCA9IGdldFRlc3RUZW1wbGF0ZShsdnAgKyAxLCBwcmV2VGVzdCA/IHByZXZUZXN0LmxvY2F0b3Iuc2xpY2UoKSA6IHVuZGVmaW5lZCwgbHZwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZnVuY3Rpb24obmR4LCBjaGFyQ29kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTEgIT09IGdldE1hc2tUZW1wbGF0ZSghMCwgMCwgITEpLnNsaWNlKG5keCwgc2Vla05leHQobmR4KSkuam9pbihcIlwiKS5pbmRleE9mKGNoYXJDb2RlcykgJiYgIWlzTWFzayhuZHgpICYmIChnZXRUZXN0KG5keCkubWF0Y2gubmF0aXZlRGVmID09PSBjaGFyQ29kZXMuY2hhckF0KDApIHx8IFwiIFwiID09PSBnZXRUZXN0KG5keCkubWF0Y2gubmF0aXZlRGVmICYmIGdldFRlc3QobmR4ICsgMSkubWF0Y2gubmF0aXZlRGVmID09PSBjaGFyQ29kZXMuY2hhckF0KDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0oaW5pdGlhbE5keCwgY2hhckNvZGVzKSB8fCBzdHJpY3QgfHwgb3B0cy5hdXRvVW5tYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IHN0cmljdCA/IG5keCA6IG51bGwgPT0gbmV4dFRlc3QubWF0Y2guZm4gJiYgbmV4dFRlc3QubWF0Y2gub3B0aW9uYWxpdHkgJiYgbHZwICsgMSA8IGdldE1hc2tTZXQoKS5wID8gbHZwICsgMSA6IGdldE1hc2tTZXQoKS5wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQgPSBFdmVudEhhbmRsZXJzLmtleXByZXNzRXZlbnQuY2FsbChpbnB1dCwga2V5cHJlc3MsICEwLCAhMSwgc3RyaWN0LCBwb3MpKSAmJiAoaW5pdGlhbE5keCA9IHBvcyArIDEsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlcyA9IFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHJlc3VsdCA9IEV2ZW50SGFuZGxlcnMua2V5cHJlc3NFdmVudC5jYWxsKGlucHV0LCBrZXlwcmVzcywgITAsICExLCAhMCwgbHZwICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcih1bmRlZmluZWQsIGdldEJ1ZmZlcigpLCByZXN1bHQuZm9yd2FyZFBvc2l0aW9uLCBrZXlwcmVzcywgITEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIHdyaXRlT3V0ICYmIHdyaXRlQnVmZmVyKGlucHV0LCBnZXRCdWZmZXIoKSwgcmVzdWx0ID8gcmVzdWx0LmZvcndhcmRQb3NpdGlvbiA6IHVuZGVmaW5lZCwgaW5pdGlhdGluZ0V2ZW50IHx8IG5ldyAkLkV2ZW50KFwiY2hlY2t2YWxcIiksIGluaXRpYXRpbmdFdmVudCAmJiBcImlucHV0XCIgPT09IGluaXRpYXRpbmdFdmVudC50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHVubWFza2VkdmFsdWUoaW5wdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LmlucHV0bWFzayA9PT0gdW5kZWZpbmVkKSByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmlucHV0bWFzayAmJiBpbnB1dC5pbnB1dG1hc2sucmVmcmVzaFZhbHVlICYmIEV2ZW50SGFuZGxlcnMuc2V0VmFsdWVFdmVudC5jYWxsKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHVtVmFsdWUgPSBbXSwgdnBzID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHBuZHggaW4gdnBzKSB2cHNbcG5keF0ubWF0Y2ggJiYgbnVsbCAhPSB2cHNbcG5keF0ubWF0Y2guZm4gJiYgdW1WYWx1ZS5wdXNoKHZwc1twbmR4XS5pbnB1dCk7XG4gICAgICAgICAgICAgICAgdmFyIHVubWFza2VkVmFsdWUgPSAwID09PSB1bVZhbHVlLmxlbmd0aCA/IFwiXCIgOiAoaXNSVEwgPyB1bVZhbHVlLnJldmVyc2UoKSA6IHVtVmFsdWUpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRzLm9uVW5NYXNrKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyVmFsdWUgPSAoaXNSVEwgPyBnZXRCdWZmZXIoKS5zbGljZSgpLnJldmVyc2UoKSA6IGdldEJ1ZmZlcigpKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB1bm1hc2tlZFZhbHVlID0gb3B0cy5vblVuTWFzay5jYWxsKGlucHV0bWFzaywgYnVmZmVyVmFsdWUsIHVubWFza2VkVmFsdWUsIG9wdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdW5tYXNrZWRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVBvc2l0aW9uKHBvcykge1xuICAgICAgICAgICAgICAgIHJldHVybiAhaXNSVEwgfHwgXCJudW1iZXJcIiAhPSB0eXBlb2YgcG9zIHx8IG9wdHMuZ3JlZWR5ICYmIFwiXCIgPT09IG9wdHMucGxhY2Vob2xkZXIgfHwgKHBvcyA9IGVsLmlucHV0bWFzay5fdmFsdWVHZXQoKS5sZW5ndGggLSBwb3MpLCBcbiAgICAgICAgICAgICAgICBwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBjYXJldChpbnB1dCwgYmVnaW4sIGVuZCwgbm90cmFuc2xhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2U7XG4gICAgICAgICAgICAgICAgaWYgKGJlZ2luID09PSB1bmRlZmluZWQpIHJldHVybiBpbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSA/IChiZWdpbiA9IGlucHV0LnNlbGVjdGlvblN0YXJ0LCBcbiAgICAgICAgICAgICAgICBlbmQgPSBpbnB1dC5zZWxlY3Rpb25FbmQpIDogd2luZG93LmdldFNlbGVjdGlvbiA/IChyYW5nZSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApKS5jb21tb25BbmNlc3RvckNvbnRhaW5lci5wYXJlbnROb2RlICE9PSBpbnB1dCAmJiByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lciAhPT0gaW5wdXQgfHwgKGJlZ2luID0gcmFuZ2Uuc3RhcnRPZmZzZXQsIFxuICAgICAgICAgICAgICAgIGVuZCA9IHJhbmdlLmVuZE9mZnNldCkgOiBkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlICYmIChlbmQgPSAoYmVnaW4gPSAwIC0gKHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkpLmR1cGxpY2F0ZSgpLm1vdmVTdGFydChcImNoYXJhY3RlclwiLCAtaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCkpICsgcmFuZ2UudGV4dC5sZW5ndGgpLCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luOiBub3RyYW5zbGF0ZSA/IGJlZ2luIDogdHJhbnNsYXRlUG9zaXRpb24oYmVnaW4pLFxuICAgICAgICAgICAgICAgICAgICBlbmQ6IG5vdHJhbnNsYXRlID8gZW5kIDogdHJhbnNsYXRlUG9zaXRpb24oZW5kKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNBcnJheShiZWdpbikgJiYgKGVuZCA9IGlzUlRMID8gYmVnaW5bMF0gOiBiZWdpblsxXSwgYmVnaW4gPSBpc1JUTCA/IGJlZ2luWzFdIDogYmVnaW5bMF0pLCBcbiAgICAgICAgICAgICAgICBiZWdpbi5iZWdpbiAhPT0gdW5kZWZpbmVkICYmIChlbmQgPSBpc1JUTCA/IGJlZ2luLmJlZ2luIDogYmVnaW4uZW5kLCBiZWdpbiA9IGlzUlRMID8gYmVnaW4uZW5kIDogYmVnaW4uYmVnaW4pLCBcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiID09IHR5cGVvZiBiZWdpbikge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbiA9IG5vdHJhbnNsYXRlID8gYmVnaW4gOiB0cmFuc2xhdGVQb3NpdGlvbihiZWdpbiksIGVuZCA9IFwibnVtYmVyXCIgPT0gdHlwZW9mIChlbmQgPSBub3RyYW5zbGF0ZSA/IGVuZCA6IHRyYW5zbGF0ZVBvc2l0aW9uKGVuZCkpID8gZW5kIDogYmVnaW47XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxDYWxjID0gcGFyc2VJbnQoKChpbnB1dC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IHx8IHdpbmRvdykuZ2V0Q29tcHV0ZWRTdHlsZSA/IChpbnB1dC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IHx8IHdpbmRvdykuZ2V0Q29tcHV0ZWRTdHlsZShpbnB1dCwgbnVsbCkgOiBpbnB1dC5jdXJyZW50U3R5bGUpLmZvbnRTaXplKSAqIGVuZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnNjcm9sbExlZnQgPSBzY3JvbGxDYWxjID4gaW5wdXQuc2Nyb2xsV2lkdGggPyBzY3JvbGxDYWxjIDogMCwgaXBob25lIHx8ICExICE9PSBvcHRzLmluc2VydE1vZGUgfHwgYmVnaW4gIT09IGVuZCB8fCBlbmQrKywgXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmlucHV0bWFzay5jYXJldFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBiZWdpbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogZW5kXG4gICAgICAgICAgICAgICAgICAgIH0sIGlucHV0LnNldFNlbGVjdGlvblJhbmdlKSBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IGJlZ2luLCBpbnB1dC5zZWxlY3Rpb25FbmQgPSBlbmQ7IGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCksIGlucHV0LmZpcnN0Q2hpbGQgPT09IHVuZGVmaW5lZCB8fCBudWxsID09PSBpbnB1dC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoaW5wdXQuZmlyc3RDaGlsZCwgYmVnaW4gPCBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoID8gYmVnaW4gOiBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zZXRFbmQoaW5wdXQuZmlyc3RDaGlsZCwgZW5kIDwgaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCA/IGVuZCA6IGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKS5sZW5ndGgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKCEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCksIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpbnB1dC5jcmVhdGVUZXh0UmFuZ2UgJiYgKChyYW5nZSA9IGlucHV0LmNyZWF0ZVRleHRSYW5nZSgpKS5jb2xsYXBzZSghMCksIFxuICAgICAgICAgICAgICAgICAgICByYW5nZS5tb3ZlRW5kKFwiY2hhcmFjdGVyXCIsIGVuZCksIHJhbmdlLm1vdmVTdGFydChcImNoYXJhY3RlclwiLCBiZWdpbiksIHJhbmdlLnNlbGVjdCgpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ29sb3JNYXNrKGlucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogYmVnaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGVuZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBkZXRlcm1pbmVMYXN0UmVxdWlyZWRQb3NpdGlvbihyZXR1cm5EZWZpbml0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvcywgdGVzdFBvcywgYnVmZmVyID0gZ2V0TWFza1RlbXBsYXRlKCEwLCBnZXRMYXN0VmFsaWRQb3NpdGlvbigpLCAhMCwgITApLCBibCA9IGJ1ZmZlci5sZW5ndGgsIGx2cCA9IGdldExhc3RWYWxpZFBvc2l0aW9uKCksIHBvc2l0aW9ucyA9IHt9LCBsdlRlc3QgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbHZwXSwgbmR4SW50bHpyID0gbHZUZXN0ICE9PSB1bmRlZmluZWQgPyBsdlRlc3QubG9jYXRvci5zbGljZSgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGZvciAocG9zID0gbHZwICsgMTsgcG9zIDwgYnVmZmVyLmxlbmd0aDsgcG9zKyspIG5keEludGx6ciA9ICh0ZXN0UG9zID0gZ2V0VGVzdFRlbXBsYXRlKHBvcywgbmR4SW50bHpyLCBwb3MgLSAxKSkubG9jYXRvci5zbGljZSgpLCBcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNbcG9zXSA9ICQuZXh0ZW5kKCEwLCB7fSwgdGVzdFBvcyk7XG4gICAgICAgICAgICAgICAgdmFyIGx2VGVzdEFsdCA9IGx2VGVzdCAmJiBsdlRlc3QuYWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCA/IGx2VGVzdC5sb2NhdG9yW2x2VGVzdC5hbHRlcm5hdGlvbl0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgZm9yIChwb3MgPSBibCAtIDE7IHBvcyA+IGx2cCAmJiAoKCh0ZXN0UG9zID0gcG9zaXRpb25zW3Bvc10pLm1hdGNoLm9wdGlvbmFsaXR5IHx8IHRlc3RQb3MubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICYmIHRlc3RQb3MubWF0Y2gubmV3QmxvY2tNYXJrZXIgfHwgbHZUZXN0QWx0ICYmIChsdlRlc3RBbHQgIT09IHBvc2l0aW9uc1twb3NdLmxvY2F0b3JbbHZUZXN0LmFsdGVybmF0aW9uXSAmJiBudWxsICE9IHRlc3RQb3MubWF0Y2guZm4gfHwgbnVsbCA9PT0gdGVzdFBvcy5tYXRjaC5mbiAmJiB0ZXN0UG9zLmxvY2F0b3JbbHZUZXN0LmFsdGVybmF0aW9uXSAmJiBjaGVja0FsdGVybmF0aW9uTWF0Y2godGVzdFBvcy5sb2NhdG9yW2x2VGVzdC5hbHRlcm5hdGlvbl0udG9TdHJpbmcoKS5zcGxpdChcIixcIiksIGx2VGVzdEFsdC50b1N0cmluZygpLnNwbGl0KFwiLFwiKSkgJiYgXCJcIiAhPT0gZ2V0VGVzdHMocG9zKVswXS5kZWYpKSAmJiBidWZmZXJbcG9zXSA9PT0gZ2V0UGxhY2Vob2xkZXIocG9zLCB0ZXN0UG9zLm1hdGNoKSk7IHBvcy0tKSBibC0tO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5EZWZpbml0aW9uID8ge1xuICAgICAgICAgICAgICAgICAgICBsOiBibCxcbiAgICAgICAgICAgICAgICAgICAgZGVmOiBwb3NpdGlvbnNbYmxdID8gcG9zaXRpb25zW2JsXS5tYXRjaCA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0gOiBibDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsZWFyT3B0aW9uYWxUYWlsKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGxtbnQsIHRlbXBsYXRlID0gZ2V0TWFza1RlbXBsYXRlKCEwLCAwLCAhMCwgdW5kZWZpbmVkLCAhMCk7IChsbW50ID0gdGVtcGxhdGUuc2hpZnQoKSkgIT09IHVuZGVmaW5lZDsgKSBidWZmZXIucHVzaChsbW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaXNDb21wbGV0ZShidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9wdHMuaXNDb21wbGV0ZSkpIHJldHVybiBvcHRzLmlzQ29tcGxldGUoYnVmZmVyLCBvcHRzKTtcbiAgICAgICAgICAgICAgICBpZiAoXCIqXCIgPT09IG9wdHMucmVwZWF0KSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHZhciBjb21wbGV0ZSA9ICExLCBscnAgPSBkZXRlcm1pbmVMYXN0UmVxdWlyZWRQb3NpdGlvbighMCksIGFtbCA9IHNlZWtQcmV2aW91cyhscnAubCk7XG4gICAgICAgICAgICAgICAgaWYgKGxycC5kZWYgPT09IHVuZGVmaW5lZCB8fCBscnAuZGVmLm5ld0Jsb2NrTWFya2VyIHx8IGxycC5kZWYub3B0aW9uYWxpdHkgfHwgbHJwLmRlZi5vcHRpb25hbFF1YW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGUgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gYW1sOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0ID0gZ2V0VGVzdFRlbXBsYXRlKGkpLm1hdGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IHRlc3QuZm4gJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldID09PSB1bmRlZmluZWQgJiYgITAgIT09IHRlc3Qub3B0aW9uYWxpdHkgJiYgITAgIT09IHRlc3Qub3B0aW9uYWxRdWFudGlmaWVyIHx8IG51bGwgPT09IHRlc3QuZm4gJiYgYnVmZmVyW2ldICE9PSBnZXRQbGFjZWhvbGRlcihpLCB0ZXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVtb3ZlKGlucHV0LCBrLCBwb3MsIHN0cmljdCwgZnJvbUlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoKG9wdHMubnVtZXJpY0lucHV0IHx8IGlzUlRMKSAmJiAoayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuQkFDS1NQQUNFID8gayA9IElucHV0bWFzay5rZXlDb2RlLkRFTEVURSA6IGsgPT09IElucHV0bWFzay5rZXlDb2RlLkRFTEVURSAmJiAoayA9IElucHV0bWFzay5rZXlDb2RlLkJBQ0tTUEFDRSksIFxuICAgICAgICAgICAgICAgIGlzUlRMKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZCA9IHBvcy5lbmQ7XG4gICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW4sIHBvcy5iZWdpbiA9IHBlbmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChrID09PSBJbnB1dG1hc2sua2V5Q29kZS5CQUNLU1BBQ0UgJiYgKHBvcy5lbmQgLSBwb3MuYmVnaW4gPCAxIHx8ICExID09PSBvcHRzLmluc2VydE1vZGUpID8gKHBvcy5iZWdpbiA9IHNlZWtQcmV2aW91cyhwb3MuYmVnaW4pLCBcbiAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zLmJlZ2luXSAhPT0gdW5kZWZpbmVkICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3MuYmVnaW5dLmlucHV0ID09PSBvcHRzLmdyb3VwU2VwYXJhdG9yICYmIHBvcy5iZWdpbi0tLCBcbiAgICAgICAgICAgICAgICAhMSA9PT0gb3B0cy5pbnNlcnRNb2RlICYmIHBvcy5lbmQgIT09IGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoICYmIHBvcy5lbmQtLSkgOiBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEUgJiYgcG9zLmJlZ2luID09PSBwb3MuZW5kICYmIChwb3MuZW5kID0gaXNNYXNrKHBvcy5lbmQsICEwKSAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zLmVuZF0gJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvcy5lbmRdLmlucHV0ICE9PSBvcHRzLnJhZGl4UG9pbnQgPyBwb3MuZW5kICsgMSA6IHNlZWtOZXh0KHBvcy5lbmQpICsgMSwgXG4gICAgICAgICAgICAgICAgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvcy5iZWdpbl0gIT09IHVuZGVmaW5lZCAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zLmJlZ2luXS5pbnB1dCA9PT0gb3B0cy5ncm91cFNlcGFyYXRvciAmJiBwb3MuZW5kKyspLCBcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlTWFzayhwb3MpLCAhMCAhPT0gc3RyaWN0ICYmICExICE9PSBvcHRzLmtlZXBTdGF0aWMgfHwgbnVsbCAhPT0gb3B0cy5yZWdleCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gYWx0ZXJuYXRlKCEwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BvcyA9IHJlc3VsdC5jYXJldCAhPT0gdW5kZWZpbmVkID8gcmVzdWx0LmNhcmV0IDogcmVzdWx0LnBvcyA/IHNlZWtOZXh0KHJlc3VsdC5wb3MuYmVnaW4gPyByZXN1bHQucG9zLmJlZ2luIDogcmVzdWx0LnBvcykgOiBnZXRMYXN0VmFsaWRQb3NpdGlvbigtMSwgITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgKGsgIT09IElucHV0bWFzay5rZXlDb2RlLkRFTEVURSB8fCBwb3MuYmVnaW4gPiBuZXdQb3MpICYmIHBvcy5iZWdpbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24ocG9zLmJlZ2luLCAhMCk7XG4gICAgICAgICAgICAgICAgaWYgKGx2cCA8IHBvcy5iZWdpbiB8fCAtMSA9PT0gcG9zLmJlZ2luKSBnZXRNYXNrU2V0KCkucCA9IHNlZWtOZXh0KGx2cCk7IGVsc2UgaWYgKCEwICE9PSBzdHJpY3QgJiYgKGdldE1hc2tTZXQoKS5wID0gcG9zLmJlZ2luLCBcbiAgICAgICAgICAgICAgICAhMCAhPT0gZnJvbUlzVmFsaWQpKSBmb3IgKDtnZXRNYXNrU2V0KCkucCA8IGx2cCAmJiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbZ2V0TWFza1NldCgpLnBdID09PSB1bmRlZmluZWQ7ICkgZ2V0TWFza1NldCgpLnArKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVDb2xvck1hc2soaW5wdXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IChpbnB1dC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IHx8IHdpbmRvdykuZ2V0Q29tcHV0ZWRTdHlsZShpbnB1dCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5zdHlsZS53aWR0aCA9IGNvbXB1dGVkU3R5bGUud2lkdGgsIHRlbXBsYXRlLnN0eWxlLnRleHRBbGlnbiA9IGNvbXB1dGVkU3R5bGUudGV4dEFsaWduLCBcbiAgICAgICAgICAgICAgICBjb2xvck1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLCBpbnB1dC5pbnB1dG1hc2suY29sb3JNYXNrID0gY29sb3JNYXNrLCBcbiAgICAgICAgICAgICAgICBjb2xvck1hc2suY2xhc3NOYW1lID0gXCJpbS1jb2xvcm1hc2tcIiwgaW5wdXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY29sb3JNYXNrLCBpbnB1dCksIFxuICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW5wdXQpLCBjb2xvck1hc2suYXBwZW5kQ2hpbGQoaW5wdXQpLCBjb2xvck1hc2suYXBwZW5kQ2hpbGQodGVtcGxhdGUpLCBcbiAgICAgICAgICAgICAgICBpbnB1dC5zdHlsZS5sZWZ0ID0gdGVtcGxhdGUub2Zmc2V0TGVmdCArIFwicHhcIiwgJChjb2xvck1hc2spLm9uKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBFdmVudEhhbmRsZXJzLm1vdXNlbGVhdmVFdmVudC5jYWxsKGlucHV0LCBbIGUgXSk7XG4gICAgICAgICAgICAgICAgfSksICQoY29sb3JNYXNrKS5vbihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRXZlbnRIYW5kbGVycy5tb3VzZWVudGVyRXZlbnQuY2FsbChpbnB1dCwgWyBlIF0pO1xuICAgICAgICAgICAgICAgIH0pLCAkKGNvbG9yTWFzaykub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXJldChpbnB1dCwgZnVuY3Rpb24oY2xpZW50eCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zLCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzdHlsZSBpbiBjb21wdXRlZFN0eWxlKSBpc05hTihzdHlsZSkgJiYgLTEgIT09IHN0eWxlLmluZGV4T2YoXCJmb250XCIpICYmIChlLnN0eWxlW3N0eWxlXSA9IGNvbXB1dGVkU3R5bGVbc3R5bGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3R5bGUudGV4dFRyYW5zZm9ybSA9IGNvbXB1dGVkU3R5bGUudGV4dFRyYW5zZm9ybSwgZS5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gY29tcHV0ZWRTdHlsZS5sZXR0ZXJTcGFjaW5nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCIsIGUuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCIsIGUuc3R5bGUud2lkdGggPSBcImF1dG9cIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiLCBlLnN0eWxlLndoaXRlU3BhY2UgPSBcIm5vd3JhcFwiLCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0bCwgaW5wdXRUZXh0ID0gaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpLCBwcmV2aW91c1dpZHRoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY2FyZXRQb3MgPSAwLCBpdGwgPSBpbnB1dFRleHQubGVuZ3RoOyBjYXJldFBvcyA8PSBpdGw7IGNhcmV0UG9zKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5pbm5lckhUTUwgKz0gaW5wdXRUZXh0LmNoYXJBdChjYXJldFBvcykgfHwgXCJfXCIsIGUub2Zmc2V0V2lkdGggPj0gY2xpZW50eCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0MSA9IGNsaWVudHggLSBwcmV2aW91c1dpZHRoLCBvZmZzZXQyID0gZS5vZmZzZXRXaWR0aCAtIGNsaWVudHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuaW5uZXJIVE1MID0gaW5wdXRUZXh0LmNoYXJBdChjYXJldFBvcyksIGNhcmV0UG9zID0gKG9mZnNldDEgLT0gZS5vZmZzZXRXaWR0aCAvIDMpIDwgb2Zmc2V0MiA/IGNhcmV0UG9zIC0gMSA6IGNhcmV0UG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNXaWR0aCA9IGUub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlKSwgY2FyZXRQb3M7XG4gICAgICAgICAgICAgICAgICAgIH0oZS5jbGllbnRYKSksIEV2ZW50SGFuZGxlcnMuY2xpY2tFdmVudC5jYWxsKGlucHV0LCBbIGUgXSk7XG4gICAgICAgICAgICAgICAgfSksICQoaW5wdXQpLm9uKFwia2V5ZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc2hpZnRLZXkgfHwgITEgPT09IG9wdHMuaW5zZXJ0TW9kZSB8fCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ29sb3JNYXNrKGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiByZW5kZXJDb2xvck1hc2soaW5wdXQsIGNhcmV0UG9zLCBjbGVhcikge1xuICAgICAgICAgICAgICAgIHZhciB0ZXN0LCB0ZXN0UG9zLCBuZHhJbnRsenIsIG1hc2tUZW1wbGF0ZSA9IFtdLCBpc1N0YXRpYyA9ICExLCBwb3MgPSAwO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldEVudHJ5KGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkICYmIChlbnRyeSA9IFwiXCIpLCBpc1N0YXRpYyB8fCBudWxsICE9PSB0ZXN0LmZuICYmIHRlc3RQb3MuaW5wdXQgIT09IHVuZGVmaW5lZCkgaWYgKGlzU3RhdGljICYmIChudWxsICE9PSB0ZXN0LmZuICYmIHRlc3RQb3MuaW5wdXQgIT09IHVuZGVmaW5lZCB8fCBcIlwiID09PSB0ZXN0LmRlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU3RhdGljID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXRsID0gbWFza1RlbXBsYXRlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tUZW1wbGF0ZVttdGwgLSAxXSA9IG1hc2tUZW1wbGF0ZVttdGwgLSAxXSArIFwiPC9zcGFuPlwiLCBtYXNrVGVtcGxhdGUucHVzaChlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBtYXNrVGVtcGxhdGUucHVzaChlbnRyeSk7IGVsc2UgaXNTdGF0aWMgPSAhMCwgbWFza1RlbXBsYXRlLnB1c2goXCI8c3BhbiBjbGFzcz0naW0tc3RhdGljJz5cIiArIGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbG9yTWFzayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBnZXRCdWZmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmV0UG9zID09PSB1bmRlZmluZWQgPyBjYXJldFBvcyA9IGNhcmV0KGlucHV0KSA6IGNhcmV0UG9zLmJlZ2luID09PSB1bmRlZmluZWQgJiYgKGNhcmV0UG9zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IGNhcmV0UG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBjYXJldFBvc1xuICAgICAgICAgICAgICAgICAgICB9KSwgITAgIT09IGNsZWFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSA/ICh0ZXN0UG9zID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3QgPSB0ZXN0UG9zLm1hdGNoLCBuZHhJbnRsenIgPSB0ZXN0UG9zLmxvY2F0b3Iuc2xpY2UoKSwgc2V0RW50cnkoYnVmZmVyW3Bvc10pKSA6ICh0ZXN0UG9zID0gZ2V0VGVzdFRlbXBsYXRlKHBvcywgbmR4SW50bHpyLCBwb3MgLSAxKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdCA9IHRlc3RQb3MubWF0Y2gsIG5keEludGx6ciA9IHRlc3RQb3MubG9jYXRvci5zbGljZSgpLCAhMSA9PT0gb3B0cy5qaXRNYXNraW5nIHx8IHBvcyA8IGx2cCB8fCBcIm51bWJlclwiID09IHR5cGVvZiBvcHRzLmppdE1hc2tpbmcgJiYgaXNGaW5pdGUob3B0cy5qaXRNYXNraW5nKSAmJiBvcHRzLmppdE1hc2tpbmcgPiBwb3MgPyBzZXRFbnRyeShnZXRQbGFjZWhvbGRlcihwb3MsIHRlc3QpKSA6IGlzU3RhdGljID0gITEpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKChtYXhMZW5ndGggPT09IHVuZGVmaW5lZCB8fCBwb3MgPCBtYXhMZW5ndGgpICYmIChudWxsICE9PSB0ZXN0LmZuIHx8IFwiXCIgIT09IHRlc3QuZGVmKSB8fCBsdnAgPiBwb3MgfHwgaXNTdGF0aWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNTdGF0aWMgJiYgc2V0RW50cnkoKSwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaW5wdXQgJiYgKG1hc2tUZW1wbGF0ZS5zcGxpY2UoY2FyZXRQb3MuYmVnaW4sIDAsIGNhcmV0UG9zLmJlZ2luID09PSBjYXJldFBvcy5lbmQgfHwgY2FyZXRQb3MuZW5kID4gZ2V0TWFza1NldCgpLm1hc2tMZW5ndGggPyAnPG1hcmsgY2xhc3M9XCJpbS1jYXJldFwiIHN0eWxlPVwiYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7Ym9yZGVyLXJpZ2h0LXN0eWxlOiBzb2xpZDtcIj4nIDogJzxtYXJrIGNsYXNzPVwiaW0tY2FyZXQtc2VsZWN0XCI+JyksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza1RlbXBsYXRlLnNwbGljZShjYXJldFBvcy5lbmQgKyAxLCAwLCBcIjwvbWFyaz5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IGNvbG9yTWFzay5nZXRFbGVtZW50c0J5VGFnTmFtZShcImRpdlwiKVswXTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gbWFza1RlbXBsYXRlLmpvaW4oXCJcIiksIGlucHV0LmlucHV0bWFzay5wb3NpdGlvbkNvbG9yTWFzayhpbnB1dCwgdGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChJbnB1dG1hc2sucHJvdG90eXBlLnBvc2l0aW9uQ29sb3JNYXNrID0gZnVuY3Rpb24oaW5wdXQsIHRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUubGVmdCA9IHRlbXBsYXRlLm9mZnNldExlZnQgKyBcInB4XCI7XG4gICAgICAgICAgICB9LCBhY3Rpb25PYmogIT09IHVuZGVmaW5lZCkgc3dpdGNoIChhY3Rpb25PYmouYWN0aW9uKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJpc0NvbXBsZXRlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsID0gYWN0aW9uT2JqLmVsLCBpc0NvbXBsZXRlKGdldEJ1ZmZlcigpKTtcblxuICAgICAgICAgICAgICBjYXNlIFwidW5tYXNrZWR2YWx1ZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBlbCAhPT0gdW5kZWZpbmVkICYmIGFjdGlvbk9iai52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8ICh2YWx1ZUJ1ZmZlciA9IGFjdGlvbk9iai52YWx1ZSwgXG4gICAgICAgICAgICAgICAgdmFsdWVCdWZmZXIgPSAoJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVNYXNrKSAmJiBvcHRzLm9uQmVmb3JlTWFzay5jYWxsKGlucHV0bWFzaywgdmFsdWVCdWZmZXIsIG9wdHMpIHx8IHZhbHVlQnVmZmVyKS5zcGxpdChcIlwiKSwgXG4gICAgICAgICAgICAgICAgY2hlY2tWYWwodW5kZWZpbmVkLCAhMSwgITEsIGlzUlRMID8gdmFsdWVCdWZmZXIucmV2ZXJzZSgpIDogdmFsdWVCdWZmZXIpLCAkLmlzRnVuY3Rpb24ob3B0cy5vbkJlZm9yZVdyaXRlKSAmJiBvcHRzLm9uQmVmb3JlV3JpdGUuY2FsbChpbnB1dG1hc2ssIHVuZGVmaW5lZCwgZ2V0QnVmZmVyKCksIDAsIG9wdHMpKSwgXG4gICAgICAgICAgICAgICAgdW5tYXNrZWR2YWx1ZShlbCk7XG5cbiAgICAgICAgICAgICAgY2FzZSBcIm1hc2tcIjpcbiAgICAgICAgICAgICAgICAhZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9mZihlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzU3VwcG9ydGVkID0gZnVuY3Rpb24oaW5wdXQsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50VHlwZSA9IGlucHV0LmdldEF0dHJpYnV0ZShcInR5cGVcIiksIGlzU3VwcG9ydGVkID0gXCJJTlBVVFwiID09PSBpbnB1dC50YWdOYW1lICYmIC0xICE9PSAkLmluQXJyYXkoZWxlbWVudFR5cGUsIG9wdHMuc3VwcG9ydHNJbnB1dFR5cGUpIHx8IGlucHV0LmlzQ29udGVudEVkaXRhYmxlIHx8IFwiVEVYVEFSRUFcIiA9PT0gaW5wdXQudGFnTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNTdXBwb3J0ZWQpIGlmIChcIklOUFVUXCIgPT09IGlucHV0LnRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBlbGVtZW50VHlwZSksIGlzU3VwcG9ydGVkID0gXCJ0ZXh0XCIgPT09IGVsLnR5cGUsIGVsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpc1N1cHBvcnRlZCA9IFwicGFydGlhbFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICExICE9PSBpc1N1cHBvcnRlZCA/IGZ1bmN0aW9uKG5wdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZUdldCwgdmFsdWVTZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0dGVyKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dG1hc2sgPyB0aGlzLmlucHV0bWFzay5vcHRzLmF1dG9Vbm1hc2sgPyB0aGlzLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCkgOiAtMSAhPT0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSB8fCAhMCAhPT0gb3B0cy5udWxsYWJsZSA/IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMgJiYgb3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyA/IChpc1JUTCA/IGNsZWFyT3B0aW9uYWxUYWlsKGdldEJ1ZmZlcigpLnNsaWNlKCkpLnJldmVyc2UoKSA6IGNsZWFyT3B0aW9uYWxUYWlsKGdldEJ1ZmZlcigpLnNsaWNlKCkpKS5qb2luKFwiXCIpIDogdmFsdWVHZXQuY2FsbCh0aGlzKSA6IFwiXCIgOiB2YWx1ZUdldC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZXR0ZXIodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXQuY2FsbCh0aGlzLCB2YWx1ZSksIHRoaXMuaW5wdXRtYXNrICYmICQodGhpcykudHJpZ2dlcihcInNldHZhbHVlXCIsIFsgdmFsdWUgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbnB0LmlucHV0bWFzay5fX3ZhbHVlR2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCAhPT0gb3B0cy5ub1ZhbHVlUGF0Y2hpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdW5jdGlvblwiICE9IHR5cGVvZiBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgKE9iamVjdC5nZXRQcm90b3R5cGVPZiA9IFwib2JqZWN0XCIgPT09IF90eXBlb2YoXCJ0ZXN0XCIuX19wcm90b19fKSA/IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0Ll9fcHJvdG9fXztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3QuY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVByb3BlcnR5ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YobnB0KSwgXCJ2YWx1ZVwiKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVByb3BlcnR5ICYmIHZhbHVlUHJvcGVydHkuZ2V0ICYmIHZhbHVlUHJvcGVydHkuc2V0ID8gKHZhbHVlR2V0ID0gdmFsdWVQcm9wZXJ0eS5nZXQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0ID0gdmFsdWVQcm9wZXJ0eS5zZXQsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucHQsIFwidmFsdWVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGdldHRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBzZXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkgOiBcIklOUFVUXCIgIT09IG5wdC50YWdOYW1lICYmICh2YWx1ZUdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB2YWx1ZVNldCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBPYmplY3QuZGVmaW5lUHJvcGVydHkobnB0LCBcInZhbHVlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldDogc2V0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgbnB0Ll9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSAmJiAodmFsdWVHZXQgPSBucHQuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0ID0gbnB0Ll9fbG9va3VwU2V0dGVyX18oXCJ2YWx1ZVwiKSwgbnB0Ll9fZGVmaW5lR2V0dGVyX18oXCJ2YWx1ZVwiLCBnZXR0ZXIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5fX2RlZmluZVNldHRlcl9fKFwidmFsdWVcIiwgc2V0dGVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBucHQuaW5wdXRtYXNrLl9fdmFsdWVHZXQgPSB2YWx1ZUdldCwgbnB0LmlucHV0bWFzay5fX3ZhbHVlU2V0ID0gdmFsdWVTZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnB0LmlucHV0bWFzay5fdmFsdWVHZXQgPSBmdW5jdGlvbihvdmVycnVsZVJUTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzUlRMICYmICEwICE9PSBvdmVycnVsZVJUTCA/IHZhbHVlR2V0LmNhbGwodGhpcy5lbCkuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiB2YWx1ZUdldC5jYWxsKHRoaXMuZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBucHQuaW5wdXRtYXNrLl92YWx1ZVNldCA9IGZ1bmN0aW9uKHZhbHVlLCBvdmVycnVsZVJUTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXQuY2FsbCh0aGlzLmVsLCBudWxsID09PSB2YWx1ZSB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6ICEwICE9PSBvdmVycnVsZVJUTCAmJiBpc1JUTCA/IHZhbHVlLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB2YWx1ZUdldCA9PT0gdW5kZWZpbmVkICYmICh2YWx1ZUdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHZhbHVlU2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudmFsSG9va3MgJiYgKCQudmFsSG9va3NbdHlwZV0gPT09IHVuZGVmaW5lZCB8fCAhMCAhPT0gJC52YWxIb29rc1t0eXBlXS5pbnB1dG1hc2twYXRjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaG9va0dldCA9ICQudmFsSG9va3NbdHlwZV0gJiYgJC52YWxIb29rc1t0eXBlXS5nZXQgPyAkLnZhbEhvb2tzW3R5cGVdLmdldCA6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdmFsaG9va1NldCA9ICQudmFsSG9va3NbdHlwZV0gJiYgJC52YWxIb29rc1t0eXBlXS5zZXQgPyAkLnZhbEhvb2tzW3R5cGVdLnNldCA6IGZ1bmN0aW9uKGVsZW0sIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLnZhbHVlID0gdmFsdWUsIGVsZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLnZhbEhvb2tzW3R5cGVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLmlucHV0bWFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLmlucHV0bWFzay5vcHRzLmF1dG9Vbm1hc2spIHJldHVybiBlbGVtLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbGhvb2tHZXQoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xICE9PSBnZXRMYXN0VmFsaWRQb3NpdGlvbih1bmRlZmluZWQsIHVuZGVmaW5lZCwgZWxlbS5pbnB1dG1hc2subWFza3NldC52YWxpZFBvc2l0aW9ucykgfHwgITAgIT09IG9wdHMubnVsbGFibGUgPyByZXN1bHQgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbGhvb2tHZXQoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24oZWxlbSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQsICRlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgPSB2YWxob29rU2V0KGVsZW0sIHZhbHVlKSwgZWxlbS5pbnB1dG1hc2sgJiYgJGVsZW0udHJpZ2dlcihcInNldHZhbHVlXCIsIFsgdmFsdWUgXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dG1hc2twYXRjaDogITBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KG5wdC50eXBlKSwgZnVuY3Rpb24obnB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKG5wdCwgXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikgJiYgJGlucHV0LnRyaWdnZXIoXCJzZXR2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KG5wdCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0oaW5wdXQpIDogaW5wdXQuaW5wdXRtYXNrID0gdW5kZWZpbmVkLCBpc1N1cHBvcnRlZDtcbiAgICAgICAgICAgICAgICAgICAgfShlbGVtLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCExICE9PSBpc1N1cHBvcnRlZCAmJiAoJGVsID0gJChlbCA9IGVsZW0pLCAtMSA9PT0gKG1heExlbmd0aCA9IGVsICE9PSB1bmRlZmluZWQgPyBlbC5tYXhMZW5ndGggOiB1bmRlZmluZWQpICYmIChtYXhMZW5ndGggPSB1bmRlZmluZWQpLCBcbiAgICAgICAgICAgICAgICAgICAgITAgPT09IG9wdHMuY29sb3JNYXNrICYmIGluaXRpYWxpemVDb2xvck1hc2soZWwpLCBtb2JpbGUgJiYgKFwiaW5wdXRtb2RlXCIgaW4gZWwgJiYgKGVsLmlucHV0bW9kZSA9IG9wdHMuaW5wdXRtb2RlLCBcbiAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwiaW5wdXRtb2RlXCIsIG9wdHMuaW5wdXRtb2RlKSksICEwID09PSBvcHRzLmRpc2FibGVQcmVkaWN0aXZlVGV4dCAmJiAoXCJhdXRvY29ycmVjdFwiIGluIGVsID8gZWwuYXV0b2NvcnJlY3QgPSAhMSA6ICghMCAhPT0gb3B0cy5jb2xvck1hc2sgJiYgaW5pdGlhbGl6ZUNvbG9yTWFzayhlbCksIFxuICAgICAgICAgICAgICAgICAgICBlbC50eXBlID0gXCJwYXNzd29yZFwiKSkpLCAhMCA9PT0gaXNTdXBwb3J0ZWQgJiYgKEV2ZW50UnVsZXIub24oZWwsIFwic3VibWl0XCIsIEV2ZW50SGFuZGxlcnMuc3VibWl0RXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJyZXNldFwiLCBFdmVudEhhbmRsZXJzLnJlc2V0RXZlbnQpLCBFdmVudFJ1bGVyLm9uKGVsLCBcImJsdXJcIiwgRXZlbnRIYW5kbGVycy5ibHVyRXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJmb2N1c1wiLCBFdmVudEhhbmRsZXJzLmZvY3VzRXZlbnQpLCAhMCAhPT0gb3B0cy5jb2xvck1hc2sgJiYgKEV2ZW50UnVsZXIub24oZWwsIFwiY2xpY2tcIiwgRXZlbnRIYW5kbGVycy5jbGlja0V2ZW50KSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwibW91c2VsZWF2ZVwiLCBFdmVudEhhbmRsZXJzLm1vdXNlbGVhdmVFdmVudCksIEV2ZW50UnVsZXIub24oZWwsIFwibW91c2VlbnRlclwiLCBFdmVudEhhbmRsZXJzLm1vdXNlZW50ZXJFdmVudCkpLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJkYmxjbGlja1wiLCBFdmVudEhhbmRsZXJzLmRibGNsaWNrRXZlbnQpLCBFdmVudFJ1bGVyLm9uKGVsLCBcInBhc3RlXCIsIEV2ZW50SGFuZGxlcnMucGFzdGVFdmVudCksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcImRyYWdkcm9wXCIsIEV2ZW50SGFuZGxlcnMucGFzdGVFdmVudCksIEV2ZW50UnVsZXIub24oZWwsIFwiZHJvcFwiLCBFdmVudEhhbmRsZXJzLnBhc3RlRXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJjdXRcIiwgRXZlbnRIYW5kbGVycy5jdXRFdmVudCksIEV2ZW50UnVsZXIub24oZWwsIFwiY29tcGxldGVcIiwgb3B0cy5vbmNvbXBsZXRlKSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwiaW5jb21wbGV0ZVwiLCBvcHRzLm9uaW5jb21wbGV0ZSksIEV2ZW50UnVsZXIub24oZWwsIFwiY2xlYXJlZFwiLCBvcHRzLm9uY2xlYXJlZCksIFxuICAgICAgICAgICAgICAgICAgICBtb2JpbGUgfHwgITAgPT09IG9wdHMuaW5wdXRFdmVudE9ubHkgPyBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJtYXhMZW5ndGhcIikgOiAoRXZlbnRSdWxlci5vbihlbCwgXCJrZXlkb3duXCIsIEV2ZW50SGFuZGxlcnMua2V5ZG93bkV2ZW50KSwgXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50UnVsZXIub24oZWwsIFwia2V5cHJlc3NcIiwgRXZlbnRIYW5kbGVycy5rZXlwcmVzc0V2ZW50KSksIEV2ZW50UnVsZXIub24oZWwsIFwiY29tcG9zaXRpb25zdGFydFwiLCAkLm5vb3ApLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJjb21wb3NpdGlvbnVwZGF0ZVwiLCAkLm5vb3ApLCBFdmVudFJ1bGVyLm9uKGVsLCBcImNvbXBvc2l0aW9uZW5kXCIsICQubm9vcCksIFxuICAgICAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9uKGVsLCBcImtleXVwXCIsICQubm9vcCksIEV2ZW50UnVsZXIub24oZWwsIFwiaW5wdXRcIiwgRXZlbnRIYW5kbGVycy5pbnB1dEZhbGxCYWNrRXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRSdWxlci5vbihlbCwgXCJiZWZvcmVpbnB1dFwiLCAkLm5vb3ApKSwgRXZlbnRSdWxlci5vbihlbCwgXCJzZXR2YWx1ZVwiLCBFdmVudEhhbmRsZXJzLnNldFZhbHVlRXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgdW5kb1ZhbHVlID0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpLCBcIlwiICE9PSBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSB8fCAhMSA9PT0gb3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbml0aWFsVmFsdWUgPSAkLmlzRnVuY3Rpb24ob3B0cy5vbkJlZm9yZU1hc2spICYmIG9wdHMub25CZWZvcmVNYXNrLmNhbGwoaW5wdXRtYXNrLCBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSwgb3B0cykgfHwgZWwuaW5wdXRtYXNrLl92YWx1ZUdldCghMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIlwiICE9PSBpbml0aWFsVmFsdWUgJiYgY2hlY2tWYWwoZWwsICEwLCAhMSwgaXNSVEwgPyBpbml0aWFsVmFsdWUuc3BsaXQoXCJcIikucmV2ZXJzZSgpIDogaW5pdGlhbFZhbHVlLnNwbGl0KFwiXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBnZXRCdWZmZXIoKS5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5kb1ZhbHVlID0gYnVmZmVyLmpvaW4oXCJcIiksICExID09PSBpc0NvbXBsZXRlKGJ1ZmZlcikgJiYgb3B0cy5jbGVhckluY29tcGxldGUgJiYgcmVzZXRNYXNrU2V0KCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbCAmJiAoLTEgPT09IGdldExhc3RWYWxpZFBvc2l0aW9uKCkgPyBidWZmZXIgPSBbXSA6IGNsZWFyT3B0aW9uYWxUYWlsKGJ1ZmZlcikpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICghMSA9PT0gb3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyB8fCBvcHRzLnNob3dNYXNrT25Gb2N1cyAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlbCB8fCBcIlwiICE9PSBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSkgJiYgd3JpdGVCdWZmZXIoZWwsIGJ1ZmZlciksIFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZWwgJiYgY2FyZXQoZWwsIHNlZWtOZXh0KGdldExhc3RWYWxpZFBvc2l0aW9uKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0oZWwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJmb3JtYXRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVCdWZmZXIgPSAoJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVNYXNrKSAmJiBvcHRzLm9uQmVmb3JlTWFzay5jYWxsKGlucHV0bWFzaywgYWN0aW9uT2JqLnZhbHVlLCBvcHRzKSB8fCBhY3Rpb25PYmoudmFsdWUpLnNwbGl0KFwiXCIpLCBcbiAgICAgICAgICAgICAgICBjaGVja1ZhbCh1bmRlZmluZWQsICEwLCAhMSwgaXNSVEwgPyB2YWx1ZUJ1ZmZlci5yZXZlcnNlKCkgOiB2YWx1ZUJ1ZmZlciksIGFjdGlvbk9iai5tZXRhZGF0YSA/IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGlzUlRMID8gZ2V0QnVmZmVyKCkuc2xpY2UoKS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IGdldEJ1ZmZlcigpLmpvaW4oXCJcIiksXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiZ2V0bWV0YWRhdGFcIlxuICAgICAgICAgICAgICAgICAgICB9LCBtYXNrc2V0LCBvcHRzKVxuICAgICAgICAgICAgICAgIH0gOiBpc1JUTCA/IGdldEJ1ZmZlcigpLnNsaWNlKCkucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiBnZXRCdWZmZXIoKS5qb2luKFwiXCIpO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJpc1ZhbGlkXCI6XG4gICAgICAgICAgICAgICAgYWN0aW9uT2JqLnZhbHVlID8gKHZhbHVlQnVmZmVyID0gYWN0aW9uT2JqLnZhbHVlLnNwbGl0KFwiXCIpLCBjaGVja1ZhbCh1bmRlZmluZWQsICEwLCAhMCwgaXNSVEwgPyB2YWx1ZUJ1ZmZlci5yZXZlcnNlKCkgOiB2YWx1ZUJ1ZmZlcikpIDogYWN0aW9uT2JqLnZhbHVlID0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBidWZmZXIgPSBnZXRCdWZmZXIoKSwgcmwgPSBkZXRlcm1pbmVMYXN0UmVxdWlyZWRQb3NpdGlvbigpLCBsbWliID0gYnVmZmVyLmxlbmd0aCAtIDE7IGxtaWIgPiBybCAmJiAhaXNNYXNrKGxtaWIpOyBsbWliLS0pIDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyLnNwbGljZShybCwgbG1pYiArIDEgLSBybCksIGlzQ29tcGxldGUoYnVmZmVyKSAmJiBhY3Rpb25PYmoudmFsdWUgPT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIik7XG5cbiAgICAgICAgICAgICAgY2FzZSBcImdldGVtcHR5bWFza1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oXCJcIik7XG5cbiAgICAgICAgICAgICAgY2FzZSBcInJlbW92ZVwiOlxuICAgICAgICAgICAgICAgIGlmIChlbCAmJiBlbC5pbnB1dG1hc2spICQuZGF0YShlbCwgXCJfaW5wdXRtYXNrX29wdHNcIiwgbnVsbCksICRlbCA9ICQoZWwpLCBlbC5pbnB1dG1hc2suX3ZhbHVlU2V0KG9wdHMuYXV0b1VubWFzayA/IHVubWFza2VkdmFsdWUoZWwpIDogZWwuaW5wdXRtYXNrLl92YWx1ZUdldCghMCkpLCBcbiAgICAgICAgICAgICAgICBFdmVudFJ1bGVyLm9mZihlbCksIGVsLmlucHV0bWFzay5jb2xvck1hc2sgJiYgKChjb2xvck1hc2sgPSBlbC5pbnB1dG1hc2suY29sb3JNYXNrKS5yZW1vdmVDaGlsZChlbCksIFxuICAgICAgICAgICAgICAgIGNvbG9yTWFzay5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgY29sb3JNYXNrKSwgY29sb3JNYXNrLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY29sb3JNYXNrKSksIFxuICAgICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YoZWwpLCBcInZhbHVlXCIpICYmIGVsLmlucHV0bWFzay5fX3ZhbHVlR2V0ICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwgXCJ2YWx1ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogZWwuaW5wdXRtYXNrLl9fdmFsdWVHZXQsXG4gICAgICAgICAgICAgICAgICAgIHNldDogZWwuaW5wdXRtYXNrLl9fdmFsdWVTZXQsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgICAgICAgICAgICB9KSA6IGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgZWwuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpICYmIGVsLmlucHV0bWFzay5fX3ZhbHVlR2V0ICYmIChlbC5fX2RlZmluZUdldHRlcl9fKFwidmFsdWVcIiwgZWwuaW5wdXRtYXNrLl9fdmFsdWVHZXQpLCBcbiAgICAgICAgICAgICAgICBlbC5fX2RlZmluZVNldHRlcl9fKFwidmFsdWVcIiwgZWwuaW5wdXRtYXNrLl9fdmFsdWVTZXQpKSwgZWwuaW5wdXRtYXNrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbDtcblxuICAgICAgICAgICAgICBjYXNlIFwiZ2V0bWV0YWRhdGFcIjpcbiAgICAgICAgICAgICAgICBpZiAoJC5pc0FycmF5KG1hc2tzZXQubWV0YWRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXNrVGFyZ2V0ID0gZ2V0TWFza1RlbXBsYXRlKCEwLCAwLCAhMSkuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuZWFjaChtYXNrc2V0Lm1ldGFkYXRhLCBmdW5jdGlvbihuZHgsIG10ZHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtdGR0Lm1hc2sgPT09IG1hc2tUYXJnZXQpIHJldHVybiBtYXNrVGFyZ2V0ID0gbXRkdCwgITE7XG4gICAgICAgICAgICAgICAgICAgIH0pLCBtYXNrVGFyZ2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWFza3NldC5tZXRhZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSW5wdXRtYXNrLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGRhdGFBdHRyaWJ1dGU6IFwiZGF0YS1pbnB1dG1hc2tcIixcbiAgICAgICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiX1wiLFxuICAgICAgICAgICAgICAgIG9wdGlvbmFsbWFya2VyOiBbIFwiW1wiLCBcIl1cIiBdLFxuICAgICAgICAgICAgICAgIHF1YW50aWZpZXJtYXJrZXI6IFsgXCJ7XCIsIFwifVwiIF0sXG4gICAgICAgICAgICAgICAgZ3JvdXBtYXJrZXI6IFsgXCIoXCIsIFwiKVwiIF0sXG4gICAgICAgICAgICAgICAgYWx0ZXJuYXRvcm1hcmtlcjogXCJ8XCIsXG4gICAgICAgICAgICAgICAgZXNjYXBlQ2hhcjogXCJcXFxcXCIsXG4gICAgICAgICAgICAgICAgbWFzazogbnVsbCxcbiAgICAgICAgICAgICAgICByZWdleDogbnVsbCxcbiAgICAgICAgICAgICAgICBvbmNvbXBsZXRlOiAkLm5vb3AsXG4gICAgICAgICAgICAgICAgb25pbmNvbXBsZXRlOiAkLm5vb3AsXG4gICAgICAgICAgICAgICAgb25jbGVhcmVkOiAkLm5vb3AsXG4gICAgICAgICAgICAgICAgcmVwZWF0OiAwLFxuICAgICAgICAgICAgICAgIGdyZWVkeTogITEsXG4gICAgICAgICAgICAgICAgYXV0b1VubWFzazogITEsXG4gICAgICAgICAgICAgICAgcmVtb3ZlTWFza09uU3VibWl0OiAhMSxcbiAgICAgICAgICAgICAgICBjbGVhck1hc2tPbkxvc3RGb2N1czogITAsXG4gICAgICAgICAgICAgICAgaW5zZXJ0TW9kZTogITAsXG4gICAgICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiAhMSxcbiAgICAgICAgICAgICAgICBhbGlhczogbnVsbCxcbiAgICAgICAgICAgICAgICBvbktleURvd246ICQubm9vcCxcbiAgICAgICAgICAgICAgICBvbkJlZm9yZU1hc2s6IG51bGwsXG4gICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogZnVuY3Rpb24ocGFzdGVkVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlTWFzaykgPyBvcHRzLm9uQmVmb3JlTWFzay5jYWxsKHRoaXMsIHBhc3RlZFZhbHVlLCBvcHRzKSA6IHBhc3RlZFZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25CZWZvcmVXcml0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBvblVuTWFzazogbnVsbCxcbiAgICAgICAgICAgICAgICBzaG93TWFza09uRm9jdXM6ICEwLFxuICAgICAgICAgICAgICAgIHNob3dNYXNrT25Ib3ZlcjogITAsXG4gICAgICAgICAgICAgICAgb25LZXlWYWxpZGF0aW9uOiAkLm5vb3AsXG4gICAgICAgICAgICAgICAgc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlcjogXCIgXCIsXG4gICAgICAgICAgICAgICAgbnVtZXJpY0lucHV0OiAhMSxcbiAgICAgICAgICAgICAgICByaWdodEFsaWduOiAhMSxcbiAgICAgICAgICAgICAgICB1bmRvT25Fc2NhcGU6ICEwLFxuICAgICAgICAgICAgICAgIHJhZGl4UG9pbnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgX3JhZGl4RGFuY2U6ICExLFxuICAgICAgICAgICAgICAgIGdyb3VwU2VwYXJhdG9yOiBcIlwiLFxuICAgICAgICAgICAgICAgIGtlZXBTdGF0aWM6IG51bGwsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25DYXJldE9uVGFiOiAhMCxcbiAgICAgICAgICAgICAgICB0YWJUaHJvdWdoOiAhMSxcbiAgICAgICAgICAgICAgICBzdXBwb3J0c0lucHV0VHlwZTogWyBcInRleHRcIiwgXCJ0ZWxcIiwgXCJwYXNzd29yZFwiLCBcInNlYXJjaFwiIF0sXG4gICAgICAgICAgICAgICAgaWdub3JhYmxlczogWyA4LCA5LCAxMywgMTksIDI3LCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsIDQ1LCA0NiwgOTMsIDExMiwgMTEzLCAxMTQsIDExNSwgMTE2LCAxMTcsIDExOCwgMTE5LCAxMjAsIDEyMSwgMTIyLCAxMjMsIDAsIDIyOSBdLFxuICAgICAgICAgICAgICAgIGlzQ29tcGxldGU6IG51bGwsXG4gICAgICAgICAgICAgICAgcHJlVmFsaWRhdGlvbjogbnVsbCxcbiAgICAgICAgICAgICAgICBwb3N0VmFsaWRhdGlvbjogbnVsbCxcbiAgICAgICAgICAgICAgICBzdGF0aWNEZWZpbml0aW9uU3ltYm9sOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaml0TWFza2luZzogITEsXG4gICAgICAgICAgICAgICAgbnVsbGFibGU6ICEwLFxuICAgICAgICAgICAgICAgIGlucHV0RXZlbnRPbmx5OiAhMSxcbiAgICAgICAgICAgICAgICBub1ZhbHVlUGF0Y2hpbmc6ICExLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uQ2FyZXRPbkNsaWNrOiBcImx2cFwiLFxuICAgICAgICAgICAgICAgIGNhc2luZzogbnVsbCxcbiAgICAgICAgICAgICAgICBpbnB1dG1vZGU6IFwidmVyYmF0aW1cIixcbiAgICAgICAgICAgICAgICBjb2xvck1hc2s6ICExLFxuICAgICAgICAgICAgICAgIGRpc2FibGVQcmVkaWN0aXZlVGV4dDogITEsXG4gICAgICAgICAgICAgICAgaW1wb3J0RGF0YUF0dHJpYnV0ZXM6ICEwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcbiAgICAgICAgICAgICAgICA5OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC0577yRLe+8mV1cIixcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvblN5bWJvbDogXCIqXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIltBLVphLXrQkC3Rj9CB0ZHDgC3Dv8K1XVwiLFxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uU3ltYm9sOiBcIipcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCIqXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTnvvJEt77yZQS1aYS160JAt0Y/QgdGRw4Atw7/CtV1cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGlhc2VzOiB7fSxcbiAgICAgICAgICAgIG1hc2tzQ2FjaGU6IHt9LFxuICAgICAgICAgICAgbWFzazogZnVuY3Rpb24oZWxlbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCIgPT0gdHlwZW9mIGVsZW1zICYmIChlbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1zKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1zKSksIFxuICAgICAgICAgICAgICAgIGVsZW1zID0gZWxlbXMubm9kZU5hbWUgPyBbIGVsZW1zIF0gOiBlbGVtcywgJC5lYWNoKGVsZW1zLCBmdW5jdGlvbihuZHgsIGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY29wZWRPcHRzID0gJC5leHRlbmQoITAsIHt9LCB0aGF0Lm9wdHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnVuY3Rpb24obnB0LCBvcHRzLCB1c2VyT3B0aW9ucywgZGF0YUF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwID09PSBvcHRzLmltcG9ydERhdGFBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiwgZGF0YW9wdGlvbnMsIG9wdGlvbkRhdGEsIHAsIGltcG9ydE9wdGlvbiA9IGZ1bmN0aW9uKG9wdGlvbiwgb3B0aW9uRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsICE9PSAob3B0aW9uRGF0YSA9IG9wdGlvbkRhdGEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbkRhdGEgOiBucHQuZ2V0QXR0cmlidXRlKGRhdGFBdHRyaWJ1dGUgKyBcIi1cIiArIG9wdGlvbikpICYmIChcInN0cmluZ1wiID09IHR5cGVvZiBvcHRpb25EYXRhICYmICgwID09PSBvcHRpb24uaW5kZXhPZihcIm9uXCIpID8gb3B0aW9uRGF0YSA9IHdpbmRvd1tvcHRpb25EYXRhXSA6IFwiZmFsc2VcIiA9PT0gb3B0aW9uRGF0YSA/IG9wdGlvbkRhdGEgPSAhMSA6IFwidHJ1ZVwiID09PSBvcHRpb25EYXRhICYmIChvcHRpb25EYXRhID0gITApKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJPcHRpb25zW29wdGlvbl0gPSBvcHRpb25EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBhdHRyT3B0aW9ucyA9IG5wdC5nZXRBdHRyaWJ1dGUoZGF0YUF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJPcHRpb25zICYmIFwiXCIgIT09IGF0dHJPcHRpb25zICYmIChhdHRyT3B0aW9ucyA9IGF0dHJPcHRpb25zLnJlcGxhY2UoLycvZywgJ1wiJyksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFvcHRpb25zID0gSlNPTi5wYXJzZShcIntcIiArIGF0dHJPcHRpb25zICsgXCJ9XCIpKSwgZGF0YW9wdGlvbnMpIGZvciAocCBpbiBvcHRpb25EYXRhID0gdW5kZWZpbmVkLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhb3B0aW9ucykgaWYgKFwiYWxpYXNcIiA9PT0gcC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkRhdGEgPSBkYXRhb3B0aW9uc1twXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAob3B0aW9uIGluIGltcG9ydE9wdGlvbihcImFsaWFzXCIsIG9wdGlvbkRhdGEpLCB1c2VyT3B0aW9ucy5hbGlhcyAmJiByZXNvbHZlQWxpYXModXNlck9wdGlvbnMuYWxpYXMsIHVzZXJPcHRpb25zLCBvcHRzKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YW9wdGlvbnMpIGZvciAocCBpbiBvcHRpb25EYXRhID0gdW5kZWZpbmVkLCBkYXRhb3B0aW9ucykgaWYgKHAudG9Mb3dlckNhc2UoKSA9PT0gb3B0aW9uLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkRhdGEgPSBkYXRhb3B0aW9uc1twXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcG9ydE9wdGlvbihvcHRpb24sIG9wdGlvbkRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLmV4dGVuZCghMCwgb3B0cywgdXNlck9wdGlvbnMpLCAoXCJydGxcIiA9PT0gbnB0LmRpciB8fCBvcHRzLnJpZ2h0QWxpZ24pICYmIChucHQuc3R5bGUudGV4dEFsaWduID0gXCJyaWdodFwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJydGxcIiA9PT0gbnB0LmRpciB8fCBvcHRzLm51bWVyaWNJbnB1dCkgJiYgKG5wdC5kaXIgPSBcImx0clwiLCBucHQucmVtb3ZlQXR0cmlidXRlKFwiZGlyXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuaXNSVEwgPSAhMCksIE9iamVjdC5rZXlzKHVzZXJPcHRpb25zKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH0oZWwsIHNjb3BlZE9wdHMsICQuZXh0ZW5kKCEwLCB7fSwgdGhhdC51c2VyT3B0aW9ucyksIHRoYXQuZGF0YUF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXNrc2V0ID0gZ2VuZXJhdGVNYXNrU2V0KHNjb3BlZE9wdHMsIHRoYXQubm9NYXNrc0NhY2hlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXQgIT09IHVuZGVmaW5lZCAmJiAoZWwuaW5wdXRtYXNrICE9PSB1bmRlZmluZWQgJiYgKGVsLmlucHV0bWFzay5vcHRzLmF1dG9Vbm1hc2sgPSAhMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2sucmVtb3ZlKCkpLCBlbC5pbnB1dG1hc2sgPSBuZXcgSW5wdXRtYXNrKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCAhMCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuaW5wdXRtYXNrLm9wdHMgPSBzY29wZWRPcHRzLCBlbC5pbnB1dG1hc2subm9NYXNrc0NhY2hlID0gdGhhdC5ub01hc2tzQ2FjaGUsIGVsLmlucHV0bWFzay51c2VyT3B0aW9ucyA9ICQuZXh0ZW5kKCEwLCB7fSwgdGhhdC51c2VyT3B0aW9ucyksIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuaW5wdXRtYXNrLmlzUlRMID0gc2NvcGVkT3B0cy5pc1JUTCB8fCBzY29wZWRPcHRzLm51bWVyaWNJbnB1dCwgZWwuaW5wdXRtYXNrLmVsID0gZWwsIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuaW5wdXRtYXNrLm1hc2tzZXQgPSBtYXNrc2V0LCAkLmRhdGEoZWwsIFwiX2lucHV0bWFza19vcHRzXCIsIHNjb3BlZE9wdHMpLCBtYXNrU2NvcGUuY2FsbChlbC5pbnB1dG1hc2ssIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwibWFza1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSwgZWxlbXMgJiYgZWxlbXNbMF0gJiYgZWxlbXNbMF0uaW5wdXRtYXNrIHx8IHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3B0aW9uOiBmdW5jdGlvbihvcHRpb25zLCBub3JlbWFzaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiID09IHR5cGVvZiBvcHRpb25zID8gdGhpcy5vcHRzW29wdGlvbnNdIDogXCJvYmplY3RcIiA9PT0gKHZvaWQgMCA9PT0gb3B0aW9ucyA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9wdGlvbnMpKSA/ICgkLmV4dGVuZCh0aGlzLnVzZXJPcHRpb25zLCBvcHRpb25zKSwgXG4gICAgICAgICAgICAgICAgdGhpcy5lbCAmJiAhMCAhPT0gbm9yZW1hc2sgJiYgdGhpcy5tYXNrKHRoaXMuZWwpLCB0aGlzKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bm1hc2tlZHZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgZ2VuZXJhdGVNYXNrU2V0KHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpLCBcbiAgICAgICAgICAgICAgICBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJ1bm1hc2tlZHZhbHVlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tTY29wZS5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcInJlbW92ZVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0ZW1wdHltYXNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8IGdlbmVyYXRlTWFza1NldCh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgbWFza1Njb3BlLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiZ2V0ZW1wdHltYXNrXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNNYXNrZWRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLm9wdHMuYXV0b1VubWFzaztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0NvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8IGdlbmVyYXRlTWFza1NldCh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgbWFza1Njb3BlLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiaXNDb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0bWV0YWRhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgZ2VuZXJhdGVNYXNrU2V0KHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpLCBcbiAgICAgICAgICAgICAgICBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJnZXRtZXRhZGF0YVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNWYWxpZDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8IGdlbmVyYXRlTWFza1NldCh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgbWFza1Njb3BlLmNhbGwodGhpcywge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiaXNWYWxpZFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKHZhbHVlLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgZ2VuZXJhdGVNYXNrU2V0KHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpLCBcbiAgICAgICAgICAgICAgICBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJmb3JtYXRcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsICYmICQodGhpcy5lbCkudHJpZ2dlcihcInNldHZhbHVlXCIsIFsgdmFsdWUgXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5hbHlzZU1hc2s6IGZ1bmN0aW9uKG1hc2ssIHJlZ2V4TWFzaywgb3B0cykge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCwgbSwgb3BlbmluZ1Rva2VuLCBjdXJyZW50T3BlbmluZ1Rva2VuLCBhbHRlcm5hdG9yLCBsYXN0TWF0Y2gsIHRva2VuaXplciA9IC8oPzpbPyorXXxcXHtbMC05XFwrXFwqXSsoPzosWzAtOVxcK1xcKl0qKT8oPzpcXHxbMC05XFwrXFwqXSopP1xcfSl8W14uPyorXiR7W10oKXxcXFxcXSt8Li9nLCByZWdleFRva2VuaXplciA9IC9cXFtcXF4/XT8oPzpbXlxcXFxcXF1dK3xcXFxcW1xcU1xcc10/KSpdP3xcXFxcKD86MCg/OlswLTNdWzAtN117MCwyfXxbNC03XVswLTddPyk/fFsxLTldWzAtOV0qfHhbMC05QS1GYS1mXXsyfXx1WzAtOUEtRmEtZl17NH18Y1tBLVphLXpdfFtcXFNcXHNdPyl8XFwoKD86XFw/Wzo9IV0/KT98KD86Wz8qK118XFx7WzAtOV0rKD86LFswLTldKik/XFx9KVxcPz98W14uPyorXiR7WygpfFxcXFxdK3wuL2csIGVzY2FwZWQgPSAhMSwgY3VycmVudFRva2VuID0gbmV3IE1hc2tUb2tlbigpLCBvcGVuZW5pbmdzID0gW10sIG1hc2tUb2tlbnMgPSBbXTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBNYXNrVG9rZW4oaXNHcm91cCwgaXNPcHRpb25hbCwgaXNRdWFudGlmaWVyLCBpc0FsdGVybmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVzID0gW10sIHRoaXMub3Blbkdyb3VwID0gaXNHcm91cCB8fCAhMSwgdGhpcy5hbHRlcm5hdG9yR3JvdXAgPSAhMSwgdGhpcy5pc0dyb3VwID0gaXNHcm91cCB8fCAhMSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcHRpb25hbCA9IGlzT3B0aW9uYWwgfHwgITEsIHRoaXMuaXNRdWFudGlmaWVyID0gaXNRdWFudGlmaWVyIHx8ICExLCB0aGlzLmlzQWx0ZXJuYXRvciA9IGlzQWx0ZXJuYXRvciB8fCAhMSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVhbnRpZmllciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heDogMVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpbnNlcnRUZXN0RGVmaW5pdGlvbihtdG9rZW4sIGVsZW1lbnQsIHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gIT09IHVuZGVmaW5lZCA/IHBvc2l0aW9uIDogbXRva2VuLm1hdGNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJldk1hdGNoID0gbXRva2VuLm1hdGNoZXNbcG9zaXRpb24gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ2V4TWFzaykgMCA9PT0gZWxlbWVudC5pbmRleE9mKFwiW1wiKSB8fCBlc2NhcGVkICYmIC9cXFxcZHxcXFxcc3xcXFxcd10vaS50ZXN0KGVsZW1lbnQpIHx8IFwiLlwiID09PSBlbGVtZW50ID8gbXRva2VuLm1hdGNoZXMuc3BsaWNlKHBvc2l0aW9uKyssIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBuZXcgUmVnRXhwKGVsZW1lbnQsIG9wdHMuY2FzaW5nID8gXCJpXCIgOiBcIlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsaXR5OiBtdG9rZW4uaXNPcHRpb25hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyOiBwcmV2TWF0Y2ggPT09IHVuZGVmaW5lZCB8fCBwcmV2TWF0Y2guZGVmICE9PSBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmOiBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZURlZjogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KSA6IChlc2NhcGVkICYmIChlbGVtZW50ID0gZWxlbWVudFtlbGVtZW50Lmxlbmd0aCAtIDFdKSwgJC5lYWNoKGVsZW1lbnQuc3BsaXQoXCJcIiksIGZ1bmN0aW9uKG5keCwgbG1udCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldk1hdGNoID0gbXRva2VuLm1hdGNoZXNbcG9zaXRpb24gLSAxXSwgbXRva2VuLm1hdGNoZXMuc3BsaWNlKHBvc2l0aW9uKyssIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbGl0eTogbXRva2VuLmlzT3B0aW9uYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXI6IHByZXZNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IHByZXZNYXRjaC5kZWYgIT09IGxtbnQgJiYgbnVsbCAhPT0gcHJldk1hdGNoLmZuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWY6IG9wdHMuc3RhdGljRGVmaW5pdGlvblN5bWJvbCB8fCBsbW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBvcHRzLnN0YXRpY0RlZmluaXRpb25TeW1ib2wgIT09IHVuZGVmaW5lZCA/IGxtbnQgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlRGVmOiBsbW50XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkpLCBlc2NhcGVkID0gITE7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tkZWYgPSAob3B0cy5kZWZpbml0aW9ucyA/IG9wdHMuZGVmaW5pdGlvbnNbZWxlbWVudF0gOiB1bmRlZmluZWQpIHx8IElucHV0bWFzay5wcm90b3R5cGUuZGVmaW5pdGlvbnNbZWxlbWVudF07XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrZGVmICYmICFlc2NhcGVkID8gbXRva2VuLm1hdGNoZXMuc3BsaWNlKHBvc2l0aW9uKyssIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogbWFza2RlZi52YWxpZGF0b3IgPyBcInN0cmluZ1wiID09IHR5cGVvZiBtYXNrZGVmLnZhbGlkYXRvciA/IG5ldyBSZWdFeHAobWFza2RlZi52YWxpZGF0b3IsIG9wdHMuY2FzaW5nID8gXCJpXCIgOiBcIlwiKSA6IG5ldyBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0ID0gbWFza2RlZi52YWxpZGF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSgpIDogbmV3IFJlZ0V4cChcIi5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxpdHk6IG10b2tlbi5pc09wdGlvbmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyOiBwcmV2TWF0Y2ggPT09IHVuZGVmaW5lZCB8fCBwcmV2TWF0Y2guZGVmICE9PSAobWFza2RlZi5kZWZpbml0aW9uU3ltYm9sIHx8IGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogbWFza2RlZi5jYXNpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmOiBtYXNrZGVmLmRlZmluaXRpb25TeW1ib2wgfHwgZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogbWFza2RlZi5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVEZWY6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIDogKG10b2tlbi5tYXRjaGVzLnNwbGljZShwb3NpdGlvbisrLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxpdHk6IG10b2tlbi5pc09wdGlvbmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyOiBwcmV2TWF0Y2ggPT09IHVuZGVmaW5lZCB8fCBwcmV2TWF0Y2guZGVmICE9PSBlbGVtZW50ICYmIG51bGwgIT09IHByZXZNYXRjaC5mbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmOiBvcHRzLnN0YXRpY0RlZmluaXRpb25TeW1ib2wgfHwgZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogb3B0cy5zdGF0aWNEZWZpbml0aW9uU3ltYm9sICE9PSB1bmRlZmluZWQgPyBlbGVtZW50IDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZURlZjogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksIGVzY2FwZWQgPSAhMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVmYXVsdENhc2UoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVuZW5pbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnNlcnRUZXN0RGVmaW5pdGlvbihjdXJyZW50T3BlbmluZ1Rva2VuID0gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdLCBtKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50T3BlbmluZ1Rva2VuLmlzQWx0ZXJuYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0b3IgPSBvcGVuZW5pbmdzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1uZHggPSAwOyBtbmR4IDwgYWx0ZXJuYXRvci5tYXRjaGVzLmxlbmd0aDsgbW5keCsrKSBhbHRlcm5hdG9yLm1hdGNoZXNbbW5keF0uaXNHcm91cCAmJiAoYWx0ZXJuYXRvci5tYXRjaGVzW21uZHhdLmlzR3JvdXAgPSAhMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVuaW5ncy5sZW5ndGggPiAwID8gKGN1cnJlbnRPcGVuaW5nVG9rZW4gPSBvcGVuZW5pbmdzW29wZW5lbmluZ3MubGVuZ3RoIC0gMV0pLm1hdGNoZXMucHVzaChhbHRlcm5hdG9yKSA6IGN1cnJlbnRUb2tlbi5tYXRjaGVzLnB1c2goYWx0ZXJuYXRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpbnNlcnRUZXN0RGVmaW5pdGlvbihjdXJyZW50VG9rZW4sIG0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBncm91cGlmeShtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBncm91cFRva2VuID0gbmV3IE1hc2tUb2tlbighMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBncm91cFRva2VuLm9wZW5Hcm91cCA9ICExLCBncm91cFRva2VuLm1hdGNoZXMgPSBtYXRjaGVzLCBncm91cFRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHJlZ2V4TWFzayAmJiAob3B0cy5vcHRpb25hbG1hcmtlclswXSA9IHVuZGVmaW5lZCwgb3B0cy5vcHRpb25hbG1hcmtlclsxXSA9IHVuZGVmaW5lZCk7IG1hdGNoID0gcmVnZXhNYXNrID8gcmVnZXhUb2tlbml6ZXIuZXhlYyhtYXNrKSA6IHRva2VuaXplci5leGVjKG1hc2spOyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG0gPSBtYXRjaFswXSwgcmVnZXhNYXNrKSBzd2l0Y2ggKG0uY2hhckF0KDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIj9cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG0gPSBcInswLDF9XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCIrXCI6XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIipcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG0gPSBcIntcIiArIG0gKyBcIn1cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZXNjYXBlZCkgZGVmYXVsdENhc2UoKTsgZWxzZSBzd2l0Y2ggKG0uY2hhckF0KDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLmVzY2FwZUNoYXI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gITAsIHJlZ2V4TWFzayAmJiBkZWZhdWx0Q2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9wdHMub3B0aW9uYWxtYXJrZXJbMV06XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLmdyb3VwbWFya2VyWzFdOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChvcGVuaW5nVG9rZW4gPSBvcGVuZW5pbmdzLnBvcCgpKS5vcGVuR3JvdXAgPSAhMSwgb3BlbmluZ1Rva2VuICE9PSB1bmRlZmluZWQpIGlmIChvcGVuZW5pbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGN1cnJlbnRPcGVuaW5nVG9rZW4gPSBvcGVuZW5pbmdzW29wZW5lbmluZ3MubGVuZ3RoIC0gMV0pLm1hdGNoZXMucHVzaChvcGVuaW5nVG9rZW4pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50T3BlbmluZ1Rva2VuLmlzQWx0ZXJuYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdG9yID0gb3BlbmVuaW5ncy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbW5keCA9IDA7IG1uZHggPCBhbHRlcm5hdG9yLm1hdGNoZXMubGVuZ3RoOyBtbmR4KyspIGFsdGVybmF0b3IubWF0Y2hlc1ttbmR4XS5pc0dyb3VwID0gITEsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdG9yLm1hdGNoZXNbbW5keF0uYWx0ZXJuYXRvckdyb3VwID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lbmluZ3MubGVuZ3RoID4gMCA/IChjdXJyZW50T3BlbmluZ1Rva2VuID0gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdKS5tYXRjaGVzLnB1c2goYWx0ZXJuYXRvcikgOiBjdXJyZW50VG9rZW4ubWF0Y2hlcy5wdXNoKGFsdGVybmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBjdXJyZW50VG9rZW4ubWF0Y2hlcy5wdXNoKG9wZW5pbmdUb2tlbik7IGVsc2UgZGVmYXVsdENhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLm9wdGlvbmFsbWFya2VyWzBdOlxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVuaW5ncy5wdXNoKG5ldyBNYXNrVG9rZW4oITEsICEwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5ncm91cG1hcmtlclswXTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lbmluZ3MucHVzaChuZXcgTWFza1Rva2VuKCEwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5xdWFudGlmaWVybWFya2VyWzBdOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHF1YW50aWZpZXIgPSBuZXcgTWFza1Rva2VuKCExLCAhMSwgITApLCBtcWogPSAobSA9IG0ucmVwbGFjZSgvW3t9XS9nLCBcIlwiKSkuc3BsaXQoXCJ8XCIpLCBtcSA9IG1xalswXS5zcGxpdChcIixcIiksIG1xMCA9IGlzTmFOKG1xWzBdKSA/IG1xWzBdIDogcGFyc2VJbnQobXFbMF0pLCBtcTEgPSAxID09PSBtcS5sZW5ndGggPyBtcTAgOiBpc05hTihtcVsxXSkgPyBtcVsxXSA6IHBhcnNlSW50KG1xWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKlwiICE9PSBtcTEgJiYgXCIrXCIgIT09IG1xMSB8fCAobXEwID0gXCIqXCIgPT09IG1xMSA/IDAgOiAxKSwgcXVhbnRpZmllci5xdWFudGlmaWVyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogbXEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogbXExLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGppdDogbXFqWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSBvcGVuZW5pbmdzLmxlbmd0aCA+IDAgPyBvcGVuZW5pbmdzW29wZW5lbmluZ3MubGVuZ3RoIC0gMV0ubWF0Y2hlcyA6IGN1cnJlbnRUb2tlbi5tYXRjaGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChtYXRjaCA9IG1hdGNoZXMucG9wKCkpLmlzQWx0ZXJuYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChtYXRjaCksIG1hdGNoZXMgPSBtYXRjaC5tYXRjaGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncm91cFRva2VuID0gbmV3IE1hc2tUb2tlbighMCksIHRtcE1hdGNoID0gbWF0Y2hlcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2goZ3JvdXBUb2tlbiksIG1hdGNoZXMgPSBncm91cFRva2VuLm1hdGNoZXMsIG1hdGNoID0gdG1wTWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaC5pc0dyb3VwIHx8IChtYXRjaCA9IGdyb3VwaWZ5KFsgbWF0Y2ggXSkpLCBtYXRjaGVzLnB1c2gobWF0Y2gpLCBtYXRjaGVzLnB1c2gocXVhbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5hbHRlcm5hdG9ybWFya2VyOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwUXVhbnRpZmllciA9IGZ1bmN0aW9uKG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdE1hdGNoID0gbWF0Y2hlcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGFzdE1hdGNoLmlzUXVhbnRpZmllciAmJiAobGFzdE1hdGNoID0gZ3JvdXBpZnkoWyBtYXRjaGVzLnBvcCgpLCBsYXN0TWF0Y2ggXSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZW5lbmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJUb2tlbiA9IChjdXJyZW50T3BlbmluZ1Rva2VuID0gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdKS5tYXRjaGVzW2N1cnJlbnRPcGVuaW5nVG9rZW4ubWF0Y2hlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2ggPSBjdXJyZW50T3BlbmluZ1Rva2VuLm9wZW5Hcm91cCAmJiAoc3ViVG9rZW4ubWF0Y2hlcyA9PT0gdW5kZWZpbmVkIHx8ICExID09PSBzdWJUb2tlbi5pc0dyb3VwICYmICExID09PSBzdWJUb2tlbi5pc0FsdGVybmF0b3IpID8gb3BlbmVuaW5ncy5wb3AoKSA6IGdyb3VwUXVhbnRpZmllcihjdXJyZW50T3BlbmluZ1Rva2VuLm1hdGNoZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGxhc3RNYXRjaCA9IGdyb3VwUXVhbnRpZmllcihjdXJyZW50VG9rZW4ubWF0Y2hlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdE1hdGNoLmlzQWx0ZXJuYXRvcikgb3BlbmVuaW5ncy5wdXNoKGxhc3RNYXRjaCk7IGVsc2UgaWYgKGxhc3RNYXRjaC5hbHRlcm5hdG9yR3JvdXAgPyAoYWx0ZXJuYXRvciA9IG9wZW5lbmluZ3MucG9wKCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE1hdGNoLmFsdGVybmF0b3JHcm91cCA9ICExKSA6IGFsdGVybmF0b3IgPSBuZXcgTWFza1Rva2VuKCExLCAhMSwgITEsICEwKSwgYWx0ZXJuYXRvci5tYXRjaGVzLnB1c2gobGFzdE1hdGNoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZW5pbmdzLnB1c2goYWx0ZXJuYXRvciksIGxhc3RNYXRjaC5vcGVuR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2gub3Blbkdyb3VwID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsdGVybmF0b3JHcm91cCA9IG5ldyBNYXNrVG9rZW4oITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0b3JHcm91cC5hbHRlcm5hdG9yR3JvdXAgPSAhMCwgb3BlbmVuaW5ncy5wdXNoKGFsdGVybmF0b3JHcm91cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoO29wZW5lbmluZ3MubGVuZ3RoID4gMDsgKSBvcGVuaW5nVG9rZW4gPSBvcGVuZW5pbmdzLnBvcCgpLCBjdXJyZW50VG9rZW4ubWF0Y2hlcy5wdXNoKG9wZW5pbmdUb2tlbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRUb2tlbi5tYXRjaGVzLmxlbmd0aCA+IDAgJiYgKCFmdW5jdGlvbiB2ZXJpZnlHcm91cE1hcmtlcihtYXNrVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbWFza1Rva2VuICYmIG1hc2tUb2tlbi5tYXRjaGVzICYmICQuZWFjaChtYXNrVG9rZW4ubWF0Y2hlcywgZnVuY3Rpb24obmR4LCB0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRUb2tlbiA9IG1hc2tUb2tlbi5tYXRjaGVzW25keCArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgKG5leHRUb2tlbiA9PT0gdW5kZWZpbmVkIHx8IG5leHRUb2tlbi5tYXRjaGVzID09PSB1bmRlZmluZWQgfHwgITEgPT09IG5leHRUb2tlbi5pc1F1YW50aWZpZXIpICYmIHRva2VuICYmIHRva2VuLmlzR3JvdXAgJiYgKHRva2VuLmlzR3JvdXAgPSAhMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleE1hc2sgfHwgKGluc2VydFRlc3REZWZpbml0aW9uKHRva2VuLCBvcHRzLmdyb3VwbWFya2VyWzBdLCAwKSwgITAgIT09IHRva2VuLm9wZW5Hcm91cCAmJiBpbnNlcnRUZXN0RGVmaW5pdGlvbih0b2tlbiwgb3B0cy5ncm91cG1hcmtlclsxXSkpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJpZnlHcm91cE1hcmtlcih0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0oY3VycmVudFRva2VuKSwgbWFza1Rva2Vucy5wdXNoKGN1cnJlbnRUb2tlbikpLCAob3B0cy5udW1lcmljSW5wdXQgfHwgb3B0cy5pc1JUTCkgJiYgZnVuY3Rpb24gcmV2ZXJzZVRva2VucyhtYXNrVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbWF0Y2ggaW4gbWFza1Rva2VuLm1hdGNoZXMgPSBtYXNrVG9rZW4ubWF0Y2hlcy5yZXZlcnNlKCksIG1hc2tUb2tlbi5tYXRjaGVzKSBpZiAobWFza1Rva2VuLm1hdGNoZXMuaGFzT3duUHJvcGVydHkobWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW50TWF0Y2ggPSBwYXJzZUludChtYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdLmlzUXVhbnRpZmllciAmJiBtYXNrVG9rZW4ubWF0Y2hlc1tpbnRNYXRjaCArIDFdICYmIG1hc2tUb2tlbi5tYXRjaGVzW2ludE1hdGNoICsgMV0uaXNHcm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBxdCA9IG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrVG9rZW4ubWF0Y2hlcy5zcGxpY2UobWF0Y2gsIDEpLCBtYXNrVG9rZW4ubWF0Y2hlcy5zcGxpY2UoaW50TWF0Y2ggKyAxLCAwLCBxdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF0ubWF0Y2hlcyAhPT0gdW5kZWZpbmVkID8gbWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdID0gcmV2ZXJzZVRva2VucyhtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF0pIDogbWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdID0gKChzdCA9IG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXSkgPT09IG9wdHMub3B0aW9uYWxtYXJrZXJbMF0gPyBzdCA9IG9wdHMub3B0aW9uYWxtYXJrZXJbMV0gOiBzdCA9PT0gb3B0cy5vcHRpb25hbG1hcmtlclsxXSA/IHN0ID0gb3B0cy5vcHRpb25hbG1hcmtlclswXSA6IHN0ID09PSBvcHRzLmdyb3VwbWFya2VyWzBdID8gc3QgPSBvcHRzLmdyb3VwbWFya2VyWzFdIDogc3QgPT09IG9wdHMuZ3JvdXBtYXJrZXJbMV0gJiYgKHN0ID0gb3B0cy5ncm91cG1hcmtlclswXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tUb2tlbjtcbiAgICAgICAgICAgICAgICB9KG1hc2tUb2tlbnNbMF0pLCBtYXNrVG9rZW5zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBJbnB1dG1hc2suZXh0ZW5kRGVmYXVsdHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAkLmV4dGVuZCghMCwgSW5wdXRtYXNrLnByb3RvdHlwZS5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICAgIH0sIElucHV0bWFzay5leHRlbmREZWZpbml0aW9ucyA9IGZ1bmN0aW9uKGRlZmluaXRpb24pIHtcbiAgICAgICAgICAgICQuZXh0ZW5kKCEwLCBJbnB1dG1hc2sucHJvdG90eXBlLmRlZmluaXRpb25zLCBkZWZpbml0aW9uKTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLmV4dGVuZEFsaWFzZXMgPSBmdW5jdGlvbihhbGlhcykge1xuICAgICAgICAgICAgJC5leHRlbmQoITAsIElucHV0bWFzay5wcm90b3R5cGUuYWxpYXNlcywgYWxpYXMpO1xuICAgICAgICB9LCBJbnB1dG1hc2suZm9ybWF0ID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMsIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gSW5wdXRtYXNrKG9wdGlvbnMpLmZvcm1hdCh2YWx1ZSwgbWV0YWRhdGEpO1xuICAgICAgICB9LCBJbnB1dG1hc2sudW5tYXNrID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBJbnB1dG1hc2sob3B0aW9ucykudW5tYXNrZWR2YWx1ZSh2YWx1ZSk7XG4gICAgICAgIH0sIElucHV0bWFzay5pc1ZhbGlkID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBJbnB1dG1hc2sob3B0aW9ucykuaXNWYWxpZCh2YWx1ZSk7XG4gICAgICAgIH0sIElucHV0bWFzay5yZW1vdmUgPSBmdW5jdGlvbihlbGVtcykge1xuICAgICAgICAgICAgXCJzdHJpbmdcIiA9PSB0eXBlb2YgZWxlbXMgJiYgKGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbXMpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbXMpKSwgXG4gICAgICAgICAgICBlbGVtcyA9IGVsZW1zLm5vZGVOYW1lID8gWyBlbGVtcyBdIDogZWxlbXMsICQuZWFjaChlbGVtcywgZnVuY3Rpb24obmR4LCBlbCkge1xuICAgICAgICAgICAgICAgIGVsLmlucHV0bWFzayAmJiBlbC5pbnB1dG1hc2sucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLnNldFZhbHVlID0gZnVuY3Rpb24oZWxlbXMsIHZhbHVlKSB7XG4gICAgICAgICAgICBcInN0cmluZ1wiID09IHR5cGVvZiBlbGVtcyAmJiAoZWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtcykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtcykpLCBcbiAgICAgICAgICAgIGVsZW1zID0gZWxlbXMubm9kZU5hbWUgPyBbIGVsZW1zIF0gOiBlbGVtcywgJC5lYWNoKGVsZW1zLCBmdW5jdGlvbihuZHgsIGVsKSB7XG4gICAgICAgICAgICAgICAgZWwuaW5wdXRtYXNrID8gZWwuaW5wdXRtYXNrLnNldFZhbHVlKHZhbHVlKSA6ICQoZWwpLnRyaWdnZXIoXCJzZXR2YWx1ZVwiLCBbIHZhbHVlIF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIElucHV0bWFzay5lc2NhcGVSZWdleCA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXFxcXFwiICsgWyBcIi9cIiwgXCIuXCIsIFwiKlwiLCBcIitcIiwgXCI/XCIsIFwifFwiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIsIFwifVwiLCBcIlxcXFxcIiwgXCIkXCIsIFwiXlwiIF0uam9pbihcInxcXFxcXCIpICsgXCIpXCIsIFwiZ2ltXCIpLCBcIlxcXFwkMVwiKTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLmtleUNvZGUgPSB7XG4gICAgICAgICAgICBCQUNLU1BBQ0U6IDgsXG4gICAgICAgICAgICBCQUNLU1BBQ0VfU0FGQVJJOiAxMjcsXG4gICAgICAgICAgICBERUxFVEU6IDQ2LFxuICAgICAgICAgICAgRE9XTjogNDAsXG4gICAgICAgICAgICBFTkQ6IDM1LFxuICAgICAgICAgICAgRU5URVI6IDEzLFxuICAgICAgICAgICAgRVNDQVBFOiAyNyxcbiAgICAgICAgICAgIEhPTUU6IDM2LFxuICAgICAgICAgICAgSU5TRVJUOiA0NSxcbiAgICAgICAgICAgIExFRlQ6IDM3LFxuICAgICAgICAgICAgUEFHRV9ET1dOOiAzNCxcbiAgICAgICAgICAgIFBBR0VfVVA6IDMzLFxuICAgICAgICAgICAgUklHSFQ6IDM5LFxuICAgICAgICAgICAgU1BBQ0U6IDMyLFxuICAgICAgICAgICAgVEFCOiA5LFxuICAgICAgICAgICAgVVA6IDM4LFxuICAgICAgICAgICAgWDogODgsXG4gICAgICAgICAgICBDT05UUk9MOiAxN1xuICAgICAgICB9LCBJbnB1dG1hc2s7XG4gICAgfSwgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXyA9IFsgX193ZWJwYWNrX3JlcXVpcmVfXygwKSwgX193ZWJwYWNrX3JlcXVpcmVfXyg1KSwgX193ZWJwYWNrX3JlcXVpcmVfXyg2KSBdLCBcbiAgICB2b2lkIDAgPT09IChfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXyA9IGZhY3RvcnkpID8gX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLmFwcGx5KGV4cG9ydHMsIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18pIDogX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fKSB8fCAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyk7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTtcbn0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIF9fd2VicGFja19yZXF1aXJlX18oNCksIF9fd2VicGFja19yZXF1aXJlX18oNyksIF9fd2VicGFja19yZXF1aXJlX18oOCksIF9fd2VicGFja19yZXF1aXJlX18oOSk7XG4gICAgdmFyIF9pbnB1dG1hc2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSwgX2lucHV0bWFzazQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMCkpLCBfanF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXygyKSk7XG4gICAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICB9O1xuICAgIH1cbiAgICBfaW5wdXRtYXNrNC5kZWZhdWx0ID09PSBfanF1ZXJ5Mi5kZWZhdWx0ICYmIF9fd2VicGFja19yZXF1aXJlX18oMTApLCB3aW5kb3cuSW5wdXRtYXNrID0gX2lucHV0bWFzazIuZGVmYXVsdDtcbn0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fLCBmYWN0b3J5O1xuICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgICBmYWN0b3J5ID0gZnVuY3Rpb24oJCwgSW5wdXRtYXNrKSB7XG4gICAgICAgIHZhciBmb3JtYXRDb2RlID0ge1xuICAgICAgICAgICAgZDogWyBcIlsxLTldfFsxMl1bMC05XXwzWzAxXVwiLCBEYXRlLnByb3RvdHlwZS5zZXREYXRlLCBcImRheVwiLCBEYXRlLnByb3RvdHlwZS5nZXREYXRlIF0sXG4gICAgICAgICAgICBkZDogWyBcIjBbMS05XXxbMTJdWzAtOV18M1swMV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0RGF0ZSwgXCJkYXlcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXREYXRlLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgZGRkOiBbIFwiXCIgXSxcbiAgICAgICAgICAgIGRkZGQ6IFsgXCJcIiBdLFxuICAgICAgICAgICAgbTogWyBcIlsxLTldfDFbMDEyXVwiLCBEYXRlLnByb3RvdHlwZS5zZXRNb250aCwgXCJtb250aFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZS5wcm90b3R5cGUuZ2V0TW9udGguY2FsbCh0aGlzKSArIDE7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBtbTogWyBcIjBbMS05XXwxWzAxMl1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TW9udGgsIFwibW9udGhcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRNb250aC5jYWxsKHRoaXMpICsgMSwgMik7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBtbW06IFsgXCJcIiBdLFxuICAgICAgICAgICAgbW1tbTogWyBcIlwiIF0sXG4gICAgICAgICAgICB5eTogWyBcIlswLTldezJ9XCIsIERhdGUucHJvdG90eXBlLnNldEZ1bGxZZWFyLCBcInllYXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRGdWxsWWVhci5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIHl5eXk6IFsgXCJbMC05XXs0fVwiLCBEYXRlLnByb3RvdHlwZS5zZXRGdWxsWWVhciwgXCJ5ZWFyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0RnVsbFllYXIuY2FsbCh0aGlzKSwgNCk7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBoOiBbIFwiWzEtOV18MVswLTJdXCIsIERhdGUucHJvdG90eXBlLnNldEhvdXJzLCBcImhvdXJzXCIsIERhdGUucHJvdG90eXBlLmdldEhvdXJzIF0sXG4gICAgICAgICAgICBoaDogWyBcIjBbMS05XXwxWzAtMl1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0SG91cnMsIFwiaG91cnNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRIb3Vycy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIGhoaDogWyBcIlswLTldK1wiLCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBEYXRlLnByb3RvdHlwZS5nZXRIb3VycyBdLFxuICAgICAgICAgICAgSDogWyBcIjE/WzAtOV18MlswLTNdXCIsIERhdGUucHJvdG90eXBlLnNldEhvdXJzLCBcImhvdXJzXCIsIERhdGUucHJvdG90eXBlLmdldEhvdXJzIF0sXG4gICAgICAgICAgICBISDogWyBcIlswMV1bMC05XXwyWzAtM11cIiwgRGF0ZS5wcm90b3R5cGUuc2V0SG91cnMsIFwiaG91cnNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRIb3Vycy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIEhISDogWyBcIlswLTldK1wiLCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBEYXRlLnByb3RvdHlwZS5nZXRIb3VycyBdLFxuICAgICAgICAgICAgTTogWyBcIlsxLTVdP1swLTldXCIsIERhdGUucHJvdG90eXBlLnNldE1pbnV0ZXMsIFwibWludXRlc1wiLCBEYXRlLnByb3RvdHlwZS5nZXRNaW51dGVzIF0sXG4gICAgICAgICAgICBNTTogWyBcIlswLTVdWzAtOV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TWludXRlcywgXCJtaW51dGVzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0TWludXRlcy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIHM6IFsgXCJbMS01XT9bMC05XVwiLCBEYXRlLnByb3RvdHlwZS5zZXRTZWNvbmRzLCBcInNlY29uZHNcIiwgRGF0ZS5wcm90b3R5cGUuZ2V0U2Vjb25kcyBdLFxuICAgICAgICAgICAgc3M6IFsgXCJbMC01XVswLTldXCIsIERhdGUucHJvdG90eXBlLnNldFNlY29uZHMsIFwic2Vjb25kc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldFNlY29uZHMuY2FsbCh0aGlzKSwgMik7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBsOiBbIFwiWzAtOV17M31cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TWlsbGlzZWNvbmRzLCBcIm1pbGxpc2Vjb25kc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldE1pbGxpc2Vjb25kcy5jYWxsKHRoaXMpLCAzKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIEw6IFsgXCJbMC05XXsyfVwiLCBEYXRlLnByb3RvdHlwZS5zZXRNaWxsaXNlY29uZHMsIFwibWlsbGlzZWNvbmRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0TWlsbGlzZWNvbmRzLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgdDogWyBcIlthcF1cIiBdLFxuICAgICAgICAgICAgdHQ6IFsgXCJbYXBdbVwiIF0sXG4gICAgICAgICAgICBUOiBbIFwiW0FQXVwiIF0sXG4gICAgICAgICAgICBUVDogWyBcIltBUF1NXCIgXSxcbiAgICAgICAgICAgIFo6IFsgXCJcIiBdLFxuICAgICAgICAgICAgbzogWyBcIlwiIF0sXG4gICAgICAgICAgICBTOiBbIFwiXCIgXVxuICAgICAgICB9LCBmb3JtYXRBbGlhcyA9IHtcbiAgICAgICAgICAgIGlzb0RhdGU6IFwieXl5eS1tbS1kZFwiLFxuICAgICAgICAgICAgaXNvVGltZTogXCJISDpNTTpzc1wiLFxuICAgICAgICAgICAgaXNvRGF0ZVRpbWU6IFwieXl5eS1tbS1kZCdUJ0hIOk1NOnNzXCIsXG4gICAgICAgICAgICBpc29VdGNEYXRlVGltZTogXCJVVEM6eXl5eS1tbS1kZCdUJ0hIOk1NOnNzJ1onXCJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0VG9rZW5pemVyKG9wdHMpIHtcbiAgICAgICAgICAgIGlmICghb3B0cy50b2tlbml6ZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmR4IGluIGZvcm1hdENvZGUpIC0xID09PSB0b2tlbnMuaW5kZXhPZihuZHhbMF0pICYmIHRva2Vucy5wdXNoKG5keFswXSk7XG4gICAgICAgICAgICAgICAgb3B0cy50b2tlbml6ZXIgPSBcIihcIiArIHRva2Vucy5qb2luKFwiK3xcIikgKyBcIikrP3wuXCIsIG9wdHMudG9rZW5pemVyID0gbmV3IFJlZ0V4cChvcHRzLnRva2VuaXplciwgXCJnXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9wdHMudG9rZW5pemVyO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlKGZvcm1hdCwgZGF0ZU9ialZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBtYXRjaCwgbWFzayA9IFwiXCI7IG1hdGNoID0gZ2V0VG9rZW5pemVyKG9wdHMpLmV4ZWMoZm9ybWF0KTsgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gZGF0ZU9ialZhbHVlKSBpZiAoZm9ybWF0Q29kZVttYXRjaFswXV0pIG1hc2sgKz0gXCIoXCIgKyBmb3JtYXRDb2RlW21hdGNoWzBdXVswXSArIFwiKVwiOyBlbHNlIHN3aXRjaCAobWF0Y2hbMF0pIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJbXCI6XG4gICAgICAgICAgICAgICAgICAgIG1hc2sgKz0gXCIoXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIFwiXVwiOlxuICAgICAgICAgICAgICAgICAgICBtYXNrICs9IFwiKT9cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIG1hc2sgKz0gSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG1hdGNoWzBdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdENvZGVbbWF0Y2hbMF1dKSBtYXNrICs9IGZvcm1hdENvZGVbbWF0Y2hbMF1dWzNdLmNhbGwoZGF0ZU9ialZhbHVlLmRhdGUpOyBlbHNlIG1hc2sgKz0gbWF0Y2hbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWFzaztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwYWQodmFsLCBsZW4pIHtcbiAgICAgICAgICAgIGZvciAodmFsID0gU3RyaW5nKHZhbCksIGxlbiA9IGxlbiB8fCAyOyB2YWwubGVuZ3RoIDwgbGVuOyApIHZhbCA9IFwiMFwiICsgdmFsO1xuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhbmFseXNlTWFzayhtYXNrU3RyaW5nLCBmb3JtYXQsIG9wdHMpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRQcm9wLCBtYXRjaCwgZGF0ZU9wZXJhdGlvbiwgZGF0ZU9iaiA9IHtcbiAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgxLCAwLCAxKVxuICAgICAgICAgICAgfSwgbWFzayA9IG1hc2tTdHJpbmc7XG4gICAgICAgICAgICBmdW5jdGlvbiBleHRlbmRZZWFyKHllYXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ycmVjdGVkeWVhciA9IDQgPT09IHllYXIubGVuZ3RoID8geWVhciA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLnN1YnN0cigwLCA0IC0geWVhci5sZW5ndGgpICsgeWVhcjtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5taW4gJiYgb3B0cy5taW4ueWVhciAmJiBvcHRzLm1heCAmJiBvcHRzLm1heC55ZWFyID8gKGNvcnJlY3RlZHllYXIgPSBjb3JyZWN0ZWR5ZWFyLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgY29ycmVjdGVkeWVhciArPSBvcHRzLm1pbi55ZWFyID09IG9wdHMubWF4LnllYXIgPyBvcHRzLm1pbi55ZWFyLnN1YnN0cihjb3JyZWN0ZWR5ZWFyLmxlbmd0aCkgOiAoXCJcIiAhPT0gY29ycmVjdGVkeWVhciAmJiAwID09IG9wdHMubWF4LnllYXIuaW5kZXhPZihjb3JyZWN0ZWR5ZWFyKSA/IHBhcnNlSW50KG9wdHMubWF4LnllYXIpIC0gMSA6IHBhcnNlSW50KG9wdHMubWluLnllYXIpICsgMSkudG9TdHJpbmcoKS5zdWJzdHIoY29ycmVjdGVkeWVhci5sZW5ndGgpKSA6IGNvcnJlY3RlZHllYXIgPSBjb3JyZWN0ZWR5ZWFyLnJlcGxhY2UoL1teMC05XS9nLCBcIjBcIiksIFxuICAgICAgICAgICAgICAgIGNvcnJlY3RlZHllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRWYWx1ZShkYXRlT2JqLCB2YWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgIFwieWVhclwiID09PSB0YXJnZXRQcm9wID8gKGRhdGVPYmpbdGFyZ2V0UHJvcF0gPSBleHRlbmRZZWFyKHZhbHVlKSwgZGF0ZU9ialtcInJhd1wiICsgdGFyZ2V0UHJvcF0gPSB2YWx1ZSkgOiBkYXRlT2JqW3RhcmdldFByb3BdID0gb3B0cy5taW4gJiYgdmFsdWUubWF0Y2goL1teMC05XS8pID8gb3B0cy5taW5bdGFyZ2V0UHJvcF0gOiB2YWx1ZSwgXG4gICAgICAgICAgICAgICAgdm9pZCAwICE9PSBkYXRlT3BlcmF0aW9uICYmIGRhdGVPcGVyYXRpb24uY2FsbChkYXRlT2JqLmRhdGUsIFwibW9udGhcIiA9PSB0YXJnZXRQcm9wID8gcGFyc2VJbnQoZGF0ZU9ialt0YXJnZXRQcm9wXSkgLSAxIDogZGF0ZU9ialt0YXJnZXRQcm9wXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgbWFzaykge1xuICAgICAgICAgICAgICAgIGZvciAoO21hdGNoID0gZ2V0VG9rZW5pemVyKG9wdHMpLmV4ZWMoZm9ybWF0KTsgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IG1hc2suc2xpY2UoMCwgbWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0Q29kZS5oYXNPd25Qcm9wZXJ0eShtYXRjaFswXSkgJiYgKHRhcmdldFByb3AgPSBmb3JtYXRDb2RlW21hdGNoWzBdXVsyXSwgZGF0ZU9wZXJhdGlvbiA9IGZvcm1hdENvZGVbbWF0Y2hbMF1dWzFdLCBcbiAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWUoZGF0ZU9iaiwgdmFsdWUsIG9wdHMpKSwgbWFzayA9IG1hc2suc2xpY2UodmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVPYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIElucHV0bWFzay5leHRlbmRBbGlhc2VzKHtcbiAgICAgICAgICAgIGRhdGV0aW1lOiB7XG4gICAgICAgICAgICAgICAgbWFzazogZnVuY3Rpb24ob3B0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0Q29kZS5TID0gb3B0cy5pMThuLm9yZGluYWxTdWZmaXguam9pbihcInxcIiksIG9wdHMuaW5wdXRGb3JtYXQgPSBmb3JtYXRBbGlhc1tvcHRzLmlucHV0Rm9ybWF0XSB8fCBvcHRzLmlucHV0Rm9ybWF0LCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5kaXNwbGF5Rm9ybWF0ID0gZm9ybWF0QWxpYXNbb3B0cy5kaXNwbGF5Rm9ybWF0XSB8fCBvcHRzLmRpc3BsYXlGb3JtYXQgfHwgb3B0cy5pbnB1dEZvcm1hdCwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMub3V0cHV0Rm9ybWF0ID0gZm9ybWF0QWxpYXNbb3B0cy5vdXRwdXRGb3JtYXRdIHx8IG9wdHMub3V0cHV0Rm9ybWF0IHx8IG9wdHMuaW5wdXRGb3JtYXQsIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBsYWNlaG9sZGVyID0gXCJcIiAhPT0gb3B0cy5wbGFjZWhvbGRlciA/IG9wdHMucGxhY2Vob2xkZXIgOiBvcHRzLmlucHV0Rm9ybWF0LnJlcGxhY2UoL1tcXFtcXF1dLywgXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLm1pbiA9IGFuYWx5c2VNYXNrKG9wdHMubWluLCBvcHRzLmlucHV0Rm9ybWF0LCBvcHRzKSwgb3B0cy5tYXggPSBhbmFseXNlTWFzayhvcHRzLm1heCwgb3B0cy5pbnB1dEZvcm1hdCwgb3B0cyksIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLnJlZ2V4ID0gcGFyc2Uob3B0cy5pbnB1dEZvcm1hdCwgdm9pZCAwLCBvcHRzKSwgbnVsbDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlwiLFxuICAgICAgICAgICAgICAgIGlucHV0Rm9ybWF0OiBcImlzb0RhdGVUaW1lXCIsXG4gICAgICAgICAgICAgICAgZGlzcGxheUZvcm1hdDogdm9pZCAwLFxuICAgICAgICAgICAgICAgIG91dHB1dEZvcm1hdDogdm9pZCAwLFxuICAgICAgICAgICAgICAgIG1pbjogbnVsbCxcbiAgICAgICAgICAgICAgICBtYXg6IG51bGwsXG4gICAgICAgICAgICAgICAgaTE4bjoge1xuICAgICAgICAgICAgICAgICAgICBkYXlOYW1lczogWyBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiLCBcIlN1blwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCIsIFwiU3VuZGF5XCIgXSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lczogWyBcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiLCBcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCIgXSxcbiAgICAgICAgICAgICAgICAgICAgb3JkaW5hbFN1ZmZpeDogWyBcInN0XCIsIFwibmRcIiwgXCJyZFwiLCBcInRoXCIgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zdFZhbGlkYXRpb246IGZ1bmN0aW9uKGJ1ZmZlciwgY3VycmVudFJlc3VsdCwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY3VycmVudFJlc3VsdCwgZGF0ZVBhcnRzID0gYW5hbHlzZU1hc2soYnVmZmVyLmpvaW4oXCJcIiksIG9wdHMuaW5wdXRGb3JtYXQsIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICYmIGRhdGVQYXJ0cy5kYXRlLmdldFRpbWUoKSA9PSBkYXRlUGFydHMuZGF0ZS5nZXRUaW1lKCkgJiYgKHJlc3VsdCA9IChyZXN1bHQgPSBmdW5jdGlvbihkYXRlUGFydHMsIGN1cnJlbnRSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoIWlzRmluaXRlKGRhdGVQYXJ0cy5kYXkpIHx8IFwiMjlcIiA9PSBkYXRlUGFydHMuZGF5ICYmICFpc0Zpbml0ZShkYXRlUGFydHMucmF3eWVhcikgfHwgbmV3IERhdGUoZGF0ZVBhcnRzLmRhdGUuZ2V0RnVsbFllYXIoKSwgaXNGaW5pdGUoZGF0ZVBhcnRzLm1vbnRoKSA/IGRhdGVQYXJ0cy5tb250aCA6IGRhdGVQYXJ0cy5kYXRlLmdldE1vbnRoKCkgKyAxLCAwKS5nZXREYXRlKCkgPj0gZGF0ZVBhcnRzLmRheSkgJiYgY3VycmVudFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfShkYXRlUGFydHMsIHJlc3VsdCkpICYmIGZ1bmN0aW9uKGRhdGVQYXJ0cywgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMubWluICYmIG9wdHMubWluLmRhdGUuZ2V0VGltZSgpID09IG9wdHMubWluLmRhdGUuZ2V0VGltZSgpICYmIChyZXN1bHQgPSBvcHRzLm1pbi5kYXRlLmdldFRpbWUoKSA8PSBkYXRlUGFydHMuZGF0ZS5nZXRUaW1lKCkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCAmJiBvcHRzLm1heCAmJiBvcHRzLm1heC5kYXRlLmdldFRpbWUoKSA9PSBvcHRzLm1heC5kYXRlLmdldFRpbWUoKSAmJiAocmVzdWx0ID0gb3B0cy5tYXguZGF0ZS5nZXRUaW1lKCkgPj0gZGF0ZVBhcnRzLmRhdGUuZ2V0VGltZSgpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH0oZGF0ZVBhcnRzLCBvcHRzKSksIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uS2V5RG93bjogZnVuY3Rpb24oZSwgYnVmZmVyLCBjYXJldFBvcywgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5jdHJsS2V5ICYmIGUua2V5Q29kZSA9PT0gSW5wdXRtYXNrLmtleUNvZGUuUklHSFQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1hdGNoLCB0b2RheSA9IG5ldyBEYXRlKCksIGRhdGUgPSBcIlwiOyBtYXRjaCA9IGdldFRva2VuaXplcihvcHRzKS5leGVjKG9wdHMuaW5wdXRGb3JtYXQpOyApIFwiZFwiID09PSBtYXRjaFswXS5jaGFyQXQoMCkgPyBkYXRlICs9IHBhZCh0b2RheS5nZXREYXRlKCksIG1hdGNoWzBdLmxlbmd0aCkgOiBcIm1cIiA9PT0gbWF0Y2hbMF0uY2hhckF0KDApID8gZGF0ZSArPSBwYWQodG9kYXkuZ2V0TW9udGgoKSArIDEsIG1hdGNoWzBdLmxlbmd0aCkgOiBcInl5eXlcIiA9PT0gbWF0Y2hbMF0gPyBkYXRlICs9IHRvZGF5LmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKSA6IFwieVwiID09PSBtYXRjaFswXS5jaGFyQXQoMCkgJiYgKGRhdGUgKz0gcGFkKHRvZGF5LmdldFllYXIoKSwgbWF0Y2hbMF0ubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0bWFzay5fdmFsdWVTZXQoZGF0ZSksICQodGhpcykudHJpZ2dlcihcInNldHZhbHVlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuTWFzazogZnVuY3Rpb24obWFza2VkVmFsdWUsIHVubWFza2VkVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlKG9wdHMub3V0cHV0Rm9ybWF0LCBhbmFseXNlTWFzayhtYXNrZWRWYWx1ZSwgb3B0cy5pbnB1dEZvcm1hdCwgb3B0cyksIG9wdHMpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2FzaW5nOiBmdW5jdGlvbihlbGVtLCB0ZXN0LCBwb3MsIHZhbGlkUG9zaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwID09IHRlc3QubmF0aXZlRGVmLmluZGV4T2YoXCJbYXBdXCIpID8gZWxlbS50b0xvd2VyQ2FzZSgpIDogMCA9PSB0ZXN0Lm5hdGl2ZURlZi5pbmRleE9mKFwiW0FQXVwiKSA/IGVsZW0udG9VcHBlckNhc2UoKSA6IGVsZW07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnNlcnRNb2RlOiAhMVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgSW5wdXRtYXNrO1xuICAgIH0sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18gPSBbIF9fd2VicGFja19yZXF1aXJlX18oMCksIF9fd2VicGFja19yZXF1aXJlX18oMSkgXSwgXG4gICAgdm9pZCAwID09PSAoX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIChfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18gPSBmYWN0b3J5KSA/IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXy5hcHBseShleHBvcnRzLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fKSA6IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXykgfHwgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pO1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fO1xuICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgICB2b2lkIDAgPT09IChfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH0uY2FsbChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fLCBleHBvcnRzLCBtb2R1bGUpKSB8fCAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyk7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX187XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICAgIHZvaWQgMCA9PT0gKF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICB9LmNhbGwoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXywgZXhwb3J0cywgbW9kdWxlKSkgfHwgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pO1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18sIGZhY3Rvcnk7XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICAgIGZhY3RvcnkgPSBmdW5jdGlvbigkLCBJbnB1dG1hc2spIHtcbiAgICAgICAgcmV0dXJuIElucHV0bWFzay5leHRlbmREZWZpbml0aW9ucyh7XG4gICAgICAgICAgICBBOiB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIltBLVphLXrQkC3Rj9CB0ZHDgC3Dv8K1XVwiLFxuICAgICAgICAgICAgICAgIGNhc2luZzogXCJ1cHBlclwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCImXCI6IHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtWmEtetCQLdGP0IHRkcOALcO/wrVdXCIsXG4gICAgICAgICAgICAgICAgY2FzaW5nOiBcInVwcGVyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIiNcIjoge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1GYS1mXVwiLFxuICAgICAgICAgICAgICAgIGNhc2luZzogXCJ1cHBlclwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCBJbnB1dG1hc2suZXh0ZW5kQWxpYXNlcyh7XG4gICAgICAgICAgICBjc3N1bml0OiB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiWystXT9bMC05XStcXFxcLj8oWzAtOV0rKT8ocHh8ZW18cmVtfGV4fCV8aW58Y218bW18cHR8cGMpXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cmw6IHtcbiAgICAgICAgICAgICAgICByZWdleDogXCIoaHR0cHM/fGZ0cCkvLy4qXCIsXG4gICAgICAgICAgICAgICAgYXV0b1VubWFzazogITFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpcDoge1xuICAgICAgICAgICAgICAgIG1hc2s6IFwiaVtpW2ldXS5pW2lbaV1dLmlbaVtpXV0uaVtpW2ldXVwiLFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24oY2hycywgbWFza3NldCwgcG9zLCBzdHJpY3QsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zIC0gMSA+IC0xICYmIFwiLlwiICE9PSBtYXNrc2V0LmJ1ZmZlcltwb3MgLSAxXSA/IChjaHJzID0gbWFza3NldC5idWZmZXJbcG9zIC0gMV0gKyBjaHJzLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJzID0gcG9zIC0gMiA+IC0xICYmIFwiLlwiICE9PSBtYXNrc2V0LmJ1ZmZlcltwb3MgLSAyXSA/IG1hc2tzZXQuYnVmZmVyW3BvcyAtIDJdICsgY2hycyA6IFwiMFwiICsgY2hycykgOiBjaHJzID0gXCIwMFwiICsgY2hycywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcIjI1WzAtNV18MlswLTRdWzAtOV18WzAxXVswLTldWzAtOV1cIikudGVzdChjaHJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Vbk1hc2s6IGZ1bmN0aW9uKG1hc2tlZFZhbHVlLCB1bm1hc2tlZFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNrZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0bW9kZTogXCJudW1lcmljXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbWFpbDoge1xuICAgICAgICAgICAgICAgIG1hc2s6IFwiKnsxLDY0fVsuKnsxLDY0fV1bLip7MSw2NH1dWy4qezEsNjN9XUAtezEsNjN9Li17MSw2M31bLi17MSw2M31dWy4tezEsNjN9XVwiLFxuICAgICAgICAgICAgICAgIGdyZWVkeTogITEsXG4gICAgICAgICAgICAgICAgY2FzaW5nOiBcImxvd2VyXCIsXG4gICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogZnVuY3Rpb24ocGFzdGVkVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChwYXN0ZWRWYWx1ZSA9IHBhc3RlZFZhbHVlLnRvTG93ZXJDYXNlKCkpLnJlcGxhY2UoXCJtYWlsdG86XCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCIqXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC0577yRLe+8mUEtWmEtetCQLdGP0IHRkcOALcO/wrUhIyQlJicqKy89P15fYHt8fX4tXVwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiLVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtWmEtei1dXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Vbk1hc2s6IGZ1bmN0aW9uKG1hc2tlZFZhbHVlLCB1bm1hc2tlZFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNrZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0bW9kZTogXCJlbWFpbFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFjOiB7XG4gICAgICAgICAgICAgICAgbWFzazogXCIjIzojIzojIzojIzojIzojI1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmluOiB7XG4gICAgICAgICAgICAgICAgbWFzazogXCJWezEzfTl7NH1cIixcbiAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBWOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiW0EtSEotTlBSLVphLWhqLW5wci16XFxcXGRdXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IFwidXBwZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbGVhckluY29tcGxldGU6ICEwLFxuICAgICAgICAgICAgICAgIGF1dG9Vbm1hc2s6ICEwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCBJbnB1dG1hc2s7XG4gICAgfSwgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXyA9IFsgX193ZWJwYWNrX3JlcXVpcmVfXygwKSwgX193ZWJwYWNrX3JlcXVpcmVfXygxKSBdLCBcbiAgICB2b2lkIDAgPT09IChfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXyA9IGZhY3RvcnkpID8gX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLmFwcGx5KGV4cG9ydHMsIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18pIDogX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fKSB8fCAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyk7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXywgZmFjdG9yeTtcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gICAgZmFjdG9yeSA9IGZ1bmN0aW9uKCQsIElucHV0bWFzaywgdW5kZWZpbmVkKSB7XG4gICAgICAgIGZ1bmN0aW9uIGF1dG9Fc2NhcGUodHh0LCBvcHRzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBlc2NhcGVkVHh0ID0gXCJcIiwgaSA9IDA7IGkgPCB0eHQubGVuZ3RoOyBpKyspIElucHV0bWFzay5wcm90b3R5cGUuZGVmaW5pdGlvbnNbdHh0LmNoYXJBdChpKV0gfHwgb3B0cy5kZWZpbml0aW9uc1t0eHQuY2hhckF0KGkpXSB8fCBvcHRzLm9wdGlvbmFsbWFya2VyLnN0YXJ0ID09PSB0eHQuY2hhckF0KGkpIHx8IG9wdHMub3B0aW9uYWxtYXJrZXIuZW5kID09PSB0eHQuY2hhckF0KGkpIHx8IG9wdHMucXVhbnRpZmllcm1hcmtlci5zdGFydCA9PT0gdHh0LmNoYXJBdChpKSB8fCBvcHRzLnF1YW50aWZpZXJtYXJrZXIuZW5kID09PSB0eHQuY2hhckF0KGkpIHx8IG9wdHMuZ3JvdXBtYXJrZXIuc3RhcnQgPT09IHR4dC5jaGFyQXQoaSkgfHwgb3B0cy5ncm91cG1hcmtlci5lbmQgPT09IHR4dC5jaGFyQXQoaSkgfHwgb3B0cy5hbHRlcm5hdG9ybWFya2VyID09PSB0eHQuY2hhckF0KGkpID8gZXNjYXBlZFR4dCArPSBcIlxcXFxcIiArIHR4dC5jaGFyQXQoaSkgOiBlc2NhcGVkVHh0ICs9IHR4dC5jaGFyQXQoaSk7XG4gICAgICAgICAgICByZXR1cm4gZXNjYXBlZFR4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSW5wdXRtYXNrLmV4dGVuZEFsaWFzZXMoe1xuICAgICAgICAgICAgbnVtZXJpYzoge1xuICAgICAgICAgICAgICAgIG1hc2s6IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgIT09IG9wdHMucmVwZWF0ICYmIGlzTmFOKG9wdHMuaW50ZWdlckRpZ2l0cykgJiYgKG9wdHMuaW50ZWdlckRpZ2l0cyA9IG9wdHMucmVwZWF0KSwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucmVwZWF0ID0gMCwgb3B0cy5ncm91cFNlcGFyYXRvciA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIG9wdHMuZGlnaXRzICYmIFwiMFwiICE9PSBvcHRzLmRpZ2l0cyAmJiAoXCIuXCIgPT09IG9wdHMucmFkaXhQb2ludCA/IG9wdHMuZ3JvdXBTZXBhcmF0b3IgPSBcIixcIiA6IFwiLFwiID09PSBvcHRzLnJhZGl4UG9pbnQgPyBvcHRzLmdyb3VwU2VwYXJhdG9yID0gXCIuXCIgOiBvcHRzLmdyb3VwU2VwYXJhdG9yID0gXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBcIiBcIiA9PT0gb3B0cy5ncm91cFNlcGFyYXRvciAmJiAob3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyID0gdW5kZWZpbmVkKSwgb3B0cy5hdXRvR3JvdXAgPSBvcHRzLmF1dG9Hcm91cCAmJiBcIlwiICE9PSBvcHRzLmdyb3VwU2VwYXJhdG9yLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5hdXRvR3JvdXAgJiYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIG9wdHMuZ3JvdXBTaXplICYmIGlzRmluaXRlKG9wdHMuZ3JvdXBTaXplKSAmJiAob3B0cy5ncm91cFNpemUgPSBwYXJzZUludChvcHRzLmdyb3VwU2l6ZSkpLCBcbiAgICAgICAgICAgICAgICAgICAgaXNGaW5pdGUob3B0cy5pbnRlZ2VyRGlnaXRzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXBzID0gTWF0aC5mbG9vcihvcHRzLmludGVnZXJEaWdpdHMgLyBvcHRzLmdyb3VwU2l6ZSksIG1vZCA9IG9wdHMuaW50ZWdlckRpZ2l0cyAlIG9wdHMuZ3JvdXBTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5pbnRlZ2VyRGlnaXRzID0gcGFyc2VJbnQob3B0cy5pbnRlZ2VyRGlnaXRzKSArICgwID09PSBtb2QgPyBzZXBzIC0gMSA6IHNlcHMpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuaW50ZWdlckRpZ2l0cyA8IDEgJiYgKG9wdHMuaW50ZWdlckRpZ2l0cyA9IFwiKlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBsYWNlaG9sZGVyLmxlbmd0aCA+IDEgJiYgKG9wdHMucGxhY2Vob2xkZXIgPSBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSksIFxuICAgICAgICAgICAgICAgICAgICBcInJhZGl4Rm9jdXNcIiA9PT0gb3B0cy5wb3NpdGlvbkNhcmV0T25DbGljayAmJiBcIlwiID09PSBvcHRzLnBsYWNlaG9sZGVyICYmICExID09PSBvcHRzLmludGVnZXJPcHRpb25hbCAmJiAob3B0cy5wb3NpdGlvbkNhcmV0T25DbGljayA9IFwibHZwXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5kZWZpbml0aW9uc1tcIjtcIl0gPSBvcHRzLmRlZmluaXRpb25zW1wiflwiXSwgb3B0cy5kZWZpbml0aW9uc1tcIjtcIl0uZGVmaW5pdGlvblN5bWJvbCA9IFwiflwiLCBcbiAgICAgICAgICAgICAgICAgICAgITAgPT09IG9wdHMubnVtZXJpY0lucHV0ICYmIChvcHRzLnBvc2l0aW9uQ2FyZXRPbkNsaWNrID0gXCJyYWRpeEZvY3VzXCIgPT09IG9wdHMucG9zaXRpb25DYXJldE9uQ2xpY2sgPyBcImx2cFwiIDogb3B0cy5wb3NpdGlvbkNhcmV0T25DbGljaywgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGlnaXRzT3B0aW9uYWwgPSAhMSwgaXNOYU4ob3B0cy5kaWdpdHMpICYmIChvcHRzLmRpZ2l0cyA9IDIpLCBvcHRzLmRlY2ltYWxQcm90ZWN0ID0gITEpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFzayA9IFwiWytdXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXNrICs9IGF1dG9Fc2NhcGUob3B0cy5wcmVmaXgsIG9wdHMpLCAhMCA9PT0gb3B0cy5pbnRlZ2VyT3B0aW9uYWwgPyBtYXNrICs9IFwifnsxLFwiICsgb3B0cy5pbnRlZ2VyRGlnaXRzICsgXCJ9XCIgOiBtYXNrICs9IFwifntcIiArIG9wdHMuaW50ZWdlckRpZ2l0cyArIFwifVwiLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5kaWdpdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGl4RGVmID0gb3B0cy5kZWNpbWFsUHJvdGVjdCA/IFwiOlwiIDogb3B0cy5yYWRpeFBvaW50LCBkcSA9IG9wdHMuZGlnaXRzLnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNGaW5pdGUoZHFbMF0pICYmIGRxWzFdICYmIGlzRmluaXRlKGRxWzFdKSA/IG1hc2sgKz0gcmFkaXhEZWYgKyBcIjt7XCIgKyBvcHRzLmRpZ2l0cyArIFwifVwiIDogKGlzTmFOKG9wdHMuZGlnaXRzKSB8fCBwYXJzZUludChvcHRzLmRpZ2l0cykgPiAwKSAmJiAob3B0cy5kaWdpdHNPcHRpb25hbCA/IG1hc2sgKz0gXCJbXCIgKyByYWRpeERlZiArIFwiO3sxLFwiICsgb3B0cy5kaWdpdHMgKyBcIn1dXCIgOiBtYXNrICs9IHJhZGl4RGVmICsgXCI7e1wiICsgb3B0cy5kaWdpdHMgKyBcIn1cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2sgKz0gYXV0b0VzY2FwZShvcHRzLnN1ZmZpeCwgb3B0cyksIG1hc2sgKz0gXCJbLV1cIiwgb3B0cy5ncmVlZHkgPSAhMSwgbWFzaztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlwiLFxuICAgICAgICAgICAgICAgIGdyZWVkeTogITEsXG4gICAgICAgICAgICAgICAgZGlnaXRzOiBcIipcIixcbiAgICAgICAgICAgICAgICBkaWdpdHNPcHRpb25hbDogITAsXG4gICAgICAgICAgICAgICAgZW5mb3JjZURpZ2l0c09uQmx1cjogITEsXG4gICAgICAgICAgICAgICAgcmFkaXhQb2ludDogXCIuXCIsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25DYXJldE9uQ2xpY2s6IFwicmFkaXhGb2N1c1wiLFxuICAgICAgICAgICAgICAgIGdyb3VwU2l6ZTogMyxcbiAgICAgICAgICAgICAgICBncm91cFNlcGFyYXRvcjogXCJcIixcbiAgICAgICAgICAgICAgICBhdXRvR3JvdXA6ICExLFxuICAgICAgICAgICAgICAgIGFsbG93TWludXM6ICEwLFxuICAgICAgICAgICAgICAgIG5lZ2F0aW9uU3ltYm9sOiB7XG4gICAgICAgICAgICAgICAgICAgIGZyb250OiBcIi1cIixcbiAgICAgICAgICAgICAgICAgICAgYmFjazogXCJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW50ZWdlckRpZ2l0czogXCIrXCIsXG4gICAgICAgICAgICAgICAgaW50ZWdlck9wdGlvbmFsOiAhMCxcbiAgICAgICAgICAgICAgICBwcmVmaXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgc3VmZml4OiBcIlwiLFxuICAgICAgICAgICAgICAgIHJpZ2h0QWxpZ246ICEwLFxuICAgICAgICAgICAgICAgIGRlY2ltYWxQcm90ZWN0OiAhMCxcbiAgICAgICAgICAgICAgICBtaW46IG51bGwsXG4gICAgICAgICAgICAgICAgbWF4OiBudWxsLFxuICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgaW5zZXJ0TW9kZTogITAsXG4gICAgICAgICAgICAgICAgYXV0b1VubWFzazogITEsXG4gICAgICAgICAgICAgICAgdW5tYXNrQXNOdW1iZXI6ICExLFxuICAgICAgICAgICAgICAgIGlucHV0bW9kZTogXCJudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcHJlVmFsaWRhdGlvbjogZnVuY3Rpb24oYnVmZmVyLCBwb3MsIGMsIGlzU2VsZWN0aW9uLCBvcHRzLCBtYXNrc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcIi1cIiA9PT0gYyB8fCBjID09PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KSByZXR1cm4gITAgPT09IG9wdHMuYWxsb3dNaW51cyAmJiAob3B0cy5pc05lZ2F0aXZlID0gb3B0cy5pc05lZ2F0aXZlID09PSB1bmRlZmluZWQgfHwgIW9wdHMuaXNOZWdhdGl2ZSwgXG4gICAgICAgICAgICAgICAgICAgIFwiXCIgPT09IGJ1ZmZlci5qb2luKFwiXCIpIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBwb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3Bvc3Q6ICEwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoITEgPT09IGlzU2VsZWN0aW9uICYmIGMgPT09IG9wdHMucmFkaXhQb2ludCAmJiBvcHRzLmRpZ2l0cyAhPT0gdW5kZWZpbmVkICYmIChpc05hTihvcHRzLmRpZ2l0cykgfHwgcGFyc2VJbnQob3B0cy5kaWdpdHMpID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRpeFBvcyA9ICQuaW5BcnJheShvcHRzLnJhZGl4UG9pbnQsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgIT09IHJhZGl4UG9zICYmIG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcmFkaXhQb3NdICE9PSB1bmRlZmluZWQpIHJldHVybiAhMCA9PT0gb3B0cy5udW1lcmljSW5wdXQgPyBwb3MgPT09IHJhZGl4UG9zIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiByYWRpeFBvcyArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zdFZhbGlkYXRpb246IGZ1bmN0aW9uKGJ1ZmZlciwgY3VycmVudFJlc3VsdCwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VmZml4ID0gb3B0cy5zdWZmaXguc3BsaXQoXCJcIiksIHByZWZpeCA9IG9wdHMucHJlZml4LnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFJlc3VsdC5wb3MgPT09IHVuZGVmaW5lZCAmJiBjdXJyZW50UmVzdWx0LmNhcmV0ICE9PSB1bmRlZmluZWQgJiYgITAgIT09IGN1cnJlbnRSZXN1bHQuZG9wb3N0KSByZXR1cm4gY3VycmVudFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gY3VycmVudFJlc3VsdC5jYXJldCAhPT0gdW5kZWZpbmVkID8gY3VycmVudFJlc3VsdC5jYXJldCA6IGN1cnJlbnRSZXN1bHQucG9zLCBtYXNrZWRWYWx1ZSA9IGJ1ZmZlci5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRzLm51bWVyaWNJbnB1dCAmJiAoY2FyZXRQb3MgPSBtYXNrZWRWYWx1ZS5sZW5ndGggLSBjYXJldFBvcyAtIDEsIG1hc2tlZFZhbHVlID0gbWFza2VkVmFsdWUucmV2ZXJzZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoYXJBdFBvcyA9IG1hc2tlZFZhbHVlW2NhcmV0UG9zXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJBdFBvcyA9PT0gb3B0cy5ncm91cFNlcGFyYXRvciAmJiAoY2hhckF0UG9zID0gbWFza2VkVmFsdWVbY2FyZXRQb3MgKz0gMV0pLCBcbiAgICAgICAgICAgICAgICAgICAgY2FyZXRQb3MgPT09IG1hc2tlZFZhbHVlLmxlbmd0aCAtIG9wdHMuc3VmZml4Lmxlbmd0aCAtIDEgJiYgY2hhckF0UG9zID09PSBvcHRzLnJhZGl4UG9pbnQpIHJldHVybiBjdXJyZW50UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBjaGFyQXRQb3MgIT09IHVuZGVmaW5lZCAmJiBjaGFyQXRQb3MgIT09IG9wdHMucmFkaXhQb2ludCAmJiBjaGFyQXRQb3MgIT09IG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQgJiYgY2hhckF0UG9zICE9PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2sgJiYgKG1hc2tlZFZhbHVlW2NhcmV0UG9zXSA9IFwiP1wiLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wcmVmaXgubGVuZ3RoID4gMCAmJiBjYXJldFBvcyA+PSAoITEgPT09IG9wdHMuaXNOZWdhdGl2ZSA/IDEgOiAwKSAmJiBjYXJldFBvcyA8IG9wdHMucHJlZml4Lmxlbmd0aCAtIDEgKyAoITEgPT09IG9wdHMuaXNOZWdhdGl2ZSA/IDEgOiAwKSA/IHByZWZpeFtjYXJldFBvcyAtICghMSA9PT0gb3B0cy5pc05lZ2F0aXZlID8gMSA6IDApXSA9IFwiP1wiIDogb3B0cy5zdWZmaXgubGVuZ3RoID4gMCAmJiBjYXJldFBvcyA+PSBtYXNrZWRWYWx1ZS5sZW5ndGggLSBvcHRzLnN1ZmZpeC5sZW5ndGggLSAoITEgPT09IG9wdHMuaXNOZWdhdGl2ZSA/IDEgOiAwKSAmJiAoc3VmZml4W2NhcmV0UG9zIC0gKG1hc2tlZFZhbHVlLmxlbmd0aCAtIG9wdHMuc3VmZml4Lmxlbmd0aCAtICghMSA9PT0gb3B0cy5pc05lZ2F0aXZlID8gMSA6IDApKV0gPSBcIj9cIikpLCBcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4ID0gcHJlZml4LmpvaW4oXCJcIiksIHN1ZmZpeCA9IHN1ZmZpeC5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc1ZhbHVlID0gbWFza2VkVmFsdWUuam9pbihcIlwiKS5yZXBsYWNlKHByZWZpeCwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzVmFsdWUgPSAocHJvY2Vzc1ZhbHVlID0gKHByb2Nlc3NWYWx1ZSA9IChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShzdWZmaXgsIFwiXCIpKS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMuZ3JvdXBTZXBhcmF0b3IpLCBcImdcIiksIFwiXCIpKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJbLVwiICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQpICsgXCJdXCIsIFwiZ1wiKSwgXCJcIikpLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrKSArIFwiJFwiKSwgXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBpc05hTihvcHRzLnBsYWNlaG9sZGVyKSAmJiAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5wbGFjZWhvbGRlciksIFwiZ1wiKSwgXCJcIikpLCBcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlLmxlbmd0aCA+IDEgJiYgMSAhPT0gcHJvY2Vzc1ZhbHVlLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KSAmJiAoXCIwXCIgPT09IGNoYXJBdFBvcyAmJiAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UoL15cXD8vZywgXCJcIikpLCBcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UoL14wL2csIFwiXCIpKSwgcHJvY2Vzc1ZhbHVlLmNoYXJBdCgwKSA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIFwiXCIgIT09IG9wdHMucmFkaXhQb2ludCAmJiAhMCAhPT0gb3B0cy5udW1lcmljSW5wdXQgJiYgKHByb2Nlc3NWYWx1ZSA9IFwiMFwiICsgcHJvY2Vzc1ZhbHVlKSwgXG4gICAgICAgICAgICAgICAgICAgIFwiXCIgIT09IHByb2Nlc3NWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5zcGxpdChcIlwiKSwgKCFvcHRzLmRpZ2l0c09wdGlvbmFsIHx8IG9wdHMuZW5mb3JjZURpZ2l0c09uQmx1ciAmJiBcImJsdXJcIiA9PT0gY3VycmVudFJlc3VsdC5ldmVudCkgJiYgaXNGaW5pdGUob3B0cy5kaWdpdHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGl4UG9zaXRpb24gPSAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBwcm9jZXNzVmFsdWUpLCBycGIgPSAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBtYXNrZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLTEgPT09IHJhZGl4UG9zaXRpb24gJiYgKHByb2Nlc3NWYWx1ZS5wdXNoKG9wdHMucmFkaXhQb2ludCksIHJhZGl4UG9zaXRpb24gPSBwcm9jZXNzVmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gb3B0cy5kaWdpdHM7IGkrKykgb3B0cy5kaWdpdHNPcHRpb25hbCAmJiAoIW9wdHMuZW5mb3JjZURpZ2l0c09uQmx1ciB8fCBcImJsdXJcIiAhPT0gY3VycmVudFJlc3VsdC5ldmVudCkgfHwgcHJvY2Vzc1ZhbHVlW3JhZGl4UG9zaXRpb24gKyBpXSAhPT0gdW5kZWZpbmVkICYmIHByb2Nlc3NWYWx1ZVtyYWRpeFBvc2l0aW9uICsgaV0gIT09IG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KDApID8gLTEgIT09IHJwYiAmJiBtYXNrZWRWYWx1ZVtycGIgKyBpXSAhPT0gdW5kZWZpbmVkICYmIChwcm9jZXNzVmFsdWVbcmFkaXhQb3NpdGlvbiArIGldID0gcHJvY2Vzc1ZhbHVlW3JhZGl4UG9zaXRpb24gKyBpXSB8fCBtYXNrZWRWYWx1ZVtycGIgKyBpXSkgOiBwcm9jZXNzVmFsdWVbcmFkaXhQb3NpdGlvbiArIGldID0gY3VycmVudFJlc3VsdC5wbGFjZWhvbGRlciB8fCBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCAhPT0gb3B0cy5hdXRvR3JvdXAgfHwgXCJcIiA9PT0gb3B0cy5ncm91cFNlcGFyYXRvciB8fCBjaGFyQXRQb3MgPT09IG9wdHMucmFkaXhQb2ludCAmJiBjdXJyZW50UmVzdWx0LnBvcyA9PT0gdW5kZWZpbmVkICYmICFjdXJyZW50UmVzdWx0LmRvcG9zdCkgcHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLmpvaW4oXCJcIik7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZGRSYWRpeCA9IHByb2Nlc3NWYWx1ZVtwcm9jZXNzVmFsdWUubGVuZ3RoIC0gMV0gPT09IG9wdHMucmFkaXhQb2ludCAmJiBjdXJyZW50UmVzdWx0LmMgPT09IG9wdHMucmFkaXhQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzVmFsdWUgPSBJbnB1dG1hc2soZnVuY3Rpb24oYnVmZmVyLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3N0TWFzayA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3N0TWFzayArPSBcIihcIiArIG9wdHMuZ3JvdXBTZXBhcmF0b3IgKyBcIip7XCIgKyBvcHRzLmdyb3VwU2l6ZSArIFwifSl7Kn1cIiwgXCJcIiAhPT0gb3B0cy5yYWRpeFBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhTcGxpdCA9IGJ1ZmZlci5qb2luKFwiXCIpLnNwbGl0KG9wdHMucmFkaXhQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpeFNwbGl0WzFdICYmIChwb3N0TWFzayArPSBvcHRzLnJhZGl4UG9pbnQgKyBcIip7XCIgKyByYWRpeFNwbGl0WzFdLm1hdGNoKC9eXFxkKlxcPz9cXGQqLylbMF0ubGVuZ3RoICsgXCJ9XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb3N0TWFzaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KHByb2Nlc3NWYWx1ZSwgb3B0cyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJpY0lucHV0OiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaml0TWFza2luZzogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIipcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05P11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZm9ybWF0KHByb2Nlc3NWYWx1ZS5qb2luKFwiXCIpKSwgYWRkUmFkaXggJiYgKHByb2Nlc3NWYWx1ZSArPSBvcHRzLnJhZGl4UG9pbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzVmFsdWUuY2hhckF0KDApID09PSBvcHRzLmdyb3VwU2VwYXJhdG9yICYmIHByb2Nlc3NWYWx1ZS5zdWJzdHIoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuaXNOZWdhdGl2ZSAmJiBcImJsdXJcIiA9PT0gY3VycmVudFJlc3VsdC5ldmVudCAmJiAob3B0cy5pc05lZ2F0aXZlID0gXCIwXCIgIT09IHByb2Nlc3NWYWx1ZSksIFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzVmFsdWUgPSBwcmVmaXggKyBwcm9jZXNzVmFsdWUsIHByb2Nlc3NWYWx1ZSArPSBzdWZmaXgsIG9wdHMuaXNOZWdhdGl2ZSAmJiAocHJvY2Vzc1ZhbHVlID0gb3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCArIHByb2Nlc3NWYWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NWYWx1ZSArPSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2spLCBwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUuc3BsaXQoXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBjaGFyQXRQb3MgIT09IHVuZGVmaW5lZCkgaWYgKGNoYXJBdFBvcyAhPT0gb3B0cy5yYWRpeFBvaW50ICYmIGNoYXJBdFBvcyAhPT0gb3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCAmJiBjaGFyQXRQb3MgIT09IG9wdHMubmVnYXRpb25TeW1ib2wuYmFjaykgKGNhcmV0UG9zID0gJC5pbkFycmF5KFwiP1wiLCBwcm9jZXNzVmFsdWUpKSA+IC0xID8gcHJvY2Vzc1ZhbHVlW2NhcmV0UG9zXSA9IGNoYXJBdFBvcyA6IGNhcmV0UG9zID0gY3VycmVudFJlc3VsdC5jYXJldCB8fCAwOyBlbHNlIGlmIChjaGFyQXRQb3MgPT09IG9wdHMucmFkaXhQb2ludCB8fCBjaGFyQXRQb3MgPT09IG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQgfHwgY2hhckF0UG9zID09PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdDYXJldFBvcyA9ICQuaW5BcnJheShjaGFyQXRQb3MsIHByb2Nlc3NWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAtMSAhPT0gbmV3Q2FyZXRQb3MgJiYgKGNhcmV0UG9zID0gbmV3Q2FyZXRQb3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9wdHMubnVtZXJpY0lucHV0ICYmIChjYXJldFBvcyA9IHByb2Nlc3NWYWx1ZS5sZW5ndGggLSBjYXJldFBvcyAtIDEsIHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcnNsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBjaGFyQXRQb3MgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50UmVzdWx0LnBvcyAhPT0gdW5kZWZpbmVkID8gY2FyZXRQb3MgKyAob3B0cy5udW1lcmljSW5wdXQgPyAtMSA6IDEpIDogY2FyZXRQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXI6IHByb2Nlc3NWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hGcm9tQnVmZmVyOiBjdXJyZW50UmVzdWx0LmRvcG9zdCB8fCBidWZmZXIuam9pbihcIlwiKSAhPT0gcHJvY2Vzc1ZhbHVlLmpvaW4oXCJcIilcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJzbHQucmVmcmVzaEZyb21CdWZmZXIgPyByc2x0IDogY3VycmVudFJlc3VsdDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlV3JpdGU6IGZ1bmN0aW9uKGUsIGJ1ZmZlciwgY2FyZXRQb3MsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUpIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImtleWRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLnBvc3RWYWxpZGF0aW9uKGJ1ZmZlciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBjYXJldFBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3Bvc3Q6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvcHRzKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJibHVyXCI6XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNoZWNrdmFsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5tYXNrZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnVuY3Rpb24ob3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMucGFyc2VNaW5NYXhPcHRpb25zID09PSB1bmRlZmluZWQgJiYgKG51bGwgIT09IG9wdHMubWluICYmIChvcHRzLm1pbiA9IG9wdHMubWluLnRvU3RyaW5nKCkucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLmdyb3VwU2VwYXJhdG9yKSwgXCJnXCIpLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIsXCIgPT09IG9wdHMucmFkaXhQb2ludCAmJiAob3B0cy5taW4gPSBvcHRzLm1pbi5yZXBsYWNlKG9wdHMucmFkaXhQb2ludCwgXCIuXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5taW4gPSBpc0Zpbml0ZShvcHRzLm1pbikgPyBwYXJzZUZsb2F0KG9wdHMubWluKSA6IE5hTiwgaXNOYU4ob3B0cy5taW4pICYmIChvcHRzLm1pbiA9IE51bWJlci5NSU5fVkFMVUUpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCAhPT0gb3B0cy5tYXggJiYgKG9wdHMubWF4ID0gb3B0cy5tYXgudG9TdHJpbmcoKS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMuZ3JvdXBTZXBhcmF0b3IpLCBcImdcIiksIFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIixcIiA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIChvcHRzLm1heCA9IG9wdHMubWF4LnJlcGxhY2Uob3B0cy5yYWRpeFBvaW50LCBcIi5cIikpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLm1heCA9IGlzRmluaXRlKG9wdHMubWF4KSA/IHBhcnNlRmxvYXQob3B0cy5tYXgpIDogTmFOLCBpc05hTihvcHRzLm1heCkgJiYgKG9wdHMubWF4ID0gTnVtYmVyLk1BWF9WQUxVRSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLnBhcnNlTWluTWF4T3B0aW9ucyA9IFwiZG9uZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0ob3B0cyksIG51bGwgIT09IG9wdHMubWluIHx8IG51bGwgIT09IG9wdHMubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVubWFza2VkID0gb3B0cy5vblVuTWFzayhidWZmZXIuam9pbihcIlwiKSwgdW5kZWZpbmVkLCAkLmV4dGVuZCh7fSwgb3B0cywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bm1hc2tBc051bWJlcjogITBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksIG51bGwgIT09IG9wdHMubWluICYmIHVubWFza2VkIDwgb3B0cy5taW4pIHJldHVybiBvcHRzLmlzTmVnYXRpdmUgPSBvcHRzLm1pbiA8IDAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMucG9zdFZhbGlkYXRpb24ob3B0cy5taW4udG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBvcHRzLnJhZGl4UG9pbnQpLnNwbGl0KFwiXCIpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBjYXJldFBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9wb3N0OiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IG9wdHMubWF4ICYmIHVubWFza2VkID4gb3B0cy5tYXgpIHJldHVybiBvcHRzLmlzTmVnYXRpdmUgPSBvcHRzLm1heCA8IDAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMucG9zdFZhbGlkYXRpb24ob3B0cy5tYXgudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBvcHRzLnJhZGl4UG9pbnQpLnNwbGl0KFwiXCIpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBjYXJldFBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9wb3N0OiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5wb3N0VmFsaWRhdGlvbihidWZmZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogY2FyZXRQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBcImJsdXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgb3B0cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiX2NoZWNrdmFsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBjYXJldFBvc1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZWdlclBhcnQ6IGZ1bmN0aW9uKG9wdHMsIGVtcHR5Q2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eUNoZWNrID8gbmV3IFJlZ0V4cChcIltcIiArIElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KSArIFwiK10/XCIpIDogbmV3IFJlZ0V4cChcIltcIiArIElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KSArIFwiK10/XFxcXGQrXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbnRlZ2VyTlBhcnQ6IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiW1xcXFxkXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5ncm91cFNlcGFyYXRvcikgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5wbGFjZWhvbGRlci5jaGFyQXQoMCkpICsgXCJdK1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ+XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24oY2hycywgbWFza3NldCwgcG9zLCBzdHJpY3QsIG9wdHMsIGlzU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwia1wiID09PSBjaHJzIHx8IFwibVwiID09PSBjaHJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnQ6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IFwia1wiID09PSBjaHJzID8gMiA6IDU7IGkgPCBsOyBpKyspIGlzVmFsaWQuaW5zZXJ0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBwb3MgKyBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWQucG9zID0gcG9zICsgbCwgaXNWYWxpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwID09PSAoaXNWYWxpZCA9IHN0cmljdCA/IG5ldyBSZWdFeHAoXCJbMC05XCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5ncm91cFNlcGFyYXRvcikgKyBcIl1cIikudGVzdChjaHJzKSA6IG5ldyBSZWdFeHAoXCJbMC05XVwiKS50ZXN0KGNocnMpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgIT09IG9wdHMubnVtZXJpY0lucHV0ICYmIG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcG9zXSAhPT0gdW5kZWZpbmVkICYmIFwiflwiID09PSBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Bvc10ubWF0Y2guZGVmICYmICFpc1NlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NWYWx1ZSA9IG1hc2tzZXQuYnVmZmVyLmpvaW4oXCJcIiksIHB2UmFkaXhTcGxpdCA9IChwcm9jZXNzVmFsdWUgPSAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChcIlstXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCkgKyBcIl1cIiwgXCJnXCIpLCBcIlwiKSkucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2spICsgXCIkXCIpLCBcIlwiKSkuc3BsaXQob3B0cy5yYWRpeFBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB2UmFkaXhTcGxpdC5sZW5ndGggPiAxICYmIChwdlJhZGl4U3BsaXRbMV0gPSBwdlJhZGl4U3BsaXRbMV0ucmVwbGFjZSgvMC9nLCBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiMFwiID09PSBwdlJhZGl4U3BsaXRbMF0gJiYgKHB2UmFkaXhTcGxpdFswXSA9IHB2UmFkaXhTcGxpdFswXS5yZXBsYWNlKC8wL2csIG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KDApKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlID0gcHZSYWRpeFNwbGl0WzBdICsgb3B0cy5yYWRpeFBvaW50ICsgcHZSYWRpeFNwbGl0WzFdIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyVGVtcGxhdGUgPSBtYXNrc2V0Ll9idWZmZXIuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAocHJvY2Vzc1ZhbHVlID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgKHByb2Nlc3NWYWx1ZSA9IGJ1ZmZlclRlbXBsYXRlKTsgbnVsbCA9PT0gcHJvY2Vzc1ZhbHVlLm1hdGNoKElucHV0bWFzay5lc2NhcGVSZWdleChidWZmZXJUZW1wbGF0ZSkgKyBcIiRcIik7ICkgYnVmZmVyVGVtcGxhdGUgPSBidWZmZXJUZW1wbGF0ZS5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSAocHJvY2Vzc1ZhbHVlID0gKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKGJ1ZmZlclRlbXBsYXRlLCBcIlwiKSkuc3BsaXQoXCJcIikpW3Bvc10gPT09IHVuZGVmaW5lZCA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmU6IHBvc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBzdHJpY3QgfHwgY2hycyAhPT0gb3B0cy5yYWRpeFBvaW50IHx8IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcG9zIC0gMV0gIT09IHVuZGVmaW5lZCB8fCAoaXNWYWxpZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBwb3MgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCIrXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24oY2hycywgbWFza3NldCwgcG9zLCBzdHJpY3QsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5hbGxvd01pbnVzICYmIChcIi1cIiA9PT0gY2hycyB8fCBjaHJzID09PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiLVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKGNocnMsIG1hc2tzZXQsIHBvcywgc3RyaWN0LCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMuYWxsb3dNaW51cyAmJiBjaHJzID09PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcIjpcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRpeCA9IFwiW1wiICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMucmFkaXhQb2ludCkgKyBcIl1cIiwgaXNWYWxpZCA9IG5ldyBSZWdFeHAocmFkaXgpLnRlc3QoY2hycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWQgJiYgbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3NdICYmIG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcG9zXS5tYXRjaC5wbGFjZWhvbGRlciA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIChpc1ZhbGlkID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogcG9zICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5yYWRpeFBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuTWFzazogZnVuY3Rpb24obWFza2VkVmFsdWUsIHVubWFza2VkVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgPT09IHVubWFza2VkVmFsdWUgJiYgITAgPT09IG9wdHMubnVsbGFibGUpIHJldHVybiB1bm1hc2tlZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc1ZhbHVlID0gbWFza2VkVmFsdWUucmVwbGFjZShvcHRzLnByZWZpeCwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzVmFsdWUgPSAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2Uob3B0cy5zdWZmaXgsIFwiXCIpKS5yZXBsYWNlKG5ldyBSZWdFeHAoSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMuZ3JvdXBTZXBhcmF0b3IpLCBcImdcIiksIFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gb3B0cy5wbGFjZWhvbGRlci5jaGFyQXQoMCkgJiYgKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAob3B0cy5wbGFjZWhvbGRlci5jaGFyQXQoMCksIFwiZ1wiKSwgXCIwXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMudW5tYXNrQXNOdW1iZXIgPyAoXCJcIiAhPT0gb3B0cy5yYWRpeFBvaW50ICYmIC0xICE9PSBwcm9jZXNzVmFsdWUuaW5kZXhPZihvcHRzLnJhZGl4UG9pbnQpICYmIChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShJbnB1dG1hc2suZXNjYXBlUmVnZXguY2FsbCh0aGlzLCBvcHRzLnJhZGl4UG9pbnQpLCBcIi5cIikpLCBcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlID0gKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCkpLCBcIi1cIikpLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrKSArIFwiJFwiKSwgXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBOdW1iZXIocHJvY2Vzc1ZhbHVlKSkgOiBwcm9jZXNzVmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpc0NvbXBsZXRlOiBmdW5jdGlvbihidWZmZXIsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tlZFZhbHVlID0gYnVmZmVyLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIuc2xpY2UoKS5qb2luKFwiXCIpICE9PSBtYXNrZWRWYWx1ZSkgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc1ZhbHVlID0gbWFza2VkVmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKFwiXlwiICsgSW5wdXRtYXNrLmVzY2FwZVJlZ2V4KG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQpKSwgXCItXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc1ZhbHVlID0gKHByb2Nlc3NWYWx1ZSA9IChwcm9jZXNzVmFsdWUgPSAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrKSArIFwiJFwiKSwgXCJcIikpLnJlcGxhY2Uob3B0cy5wcmVmaXgsIFwiXCIpKS5yZXBsYWNlKG9wdHMuc3VmZml4LCBcIlwiKSkucmVwbGFjZShuZXcgUmVnRXhwKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLmdyb3VwU2VwYXJhdG9yKSArIFwiKFswLTldezN9KVwiLCBcImdcIiksIFwiJDFcIiksIFxuICAgICAgICAgICAgICAgICAgICBcIixcIiA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIChwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5yYWRpeFBvaW50KSwgXCIuXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIGlzRmluaXRlKHByb2Nlc3NWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkJlZm9yZU1hc2s6IGZ1bmN0aW9uKGluaXRpYWxWYWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5pc05lZ2F0aXZlID0gdW5kZWZpbmVkLCBcIm51bWJlclwiID09IHR5cGVvZiBpbml0aWFsVmFsdWUgJiYgXCJcIiAhPT0gb3B0cy5yYWRpeFBvaW50ICYmIChpbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBvcHRzLnJhZGl4UG9pbnQpKSwgXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZS50b1N0cmluZygpLmNoYXJBdChpbml0aWFsVmFsdWUubGVuZ3RoIC0gMSkgPT09IG9wdHMucmFkaXhQb2ludCA/IGluaXRpYWxWYWx1ZS50b1N0cmluZygpLnN1YnN0cigwLCBpbml0aWFsVmFsdWUubGVuZ3RoIC0gMSkgOiBpbml0aWFsVmFsdWUudG9TdHJpbmcoKSwgXG4gICAgICAgICAgICAgICAgICAgIFwiXCIgIT09IG9wdHMucmFkaXhQb2ludCAmJiBpc0Zpbml0ZShpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdnMgPSBpbml0aWFsVmFsdWUuc3BsaXQoXCIuXCIpLCBncm91cFNpemUgPSBcIlwiICE9PSBvcHRzLmdyb3VwU2VwYXJhdG9yID8gcGFyc2VJbnQob3B0cy5ncm91cFNpemUpIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIDIgPT09IHZzLmxlbmd0aCAmJiAodnNbMF0ubGVuZ3RoID4gZ3JvdXBTaXplIHx8IHZzWzFdLmxlbmd0aCA+IGdyb3VwU2l6ZSB8fCB2c1swXS5sZW5ndGggPD0gZ3JvdXBTaXplICYmIHZzWzFdLmxlbmd0aCA8IGdyb3VwU2l6ZSkgJiYgKGluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZS5yZXBsYWNlKFwiLlwiLCBvcHRzLnJhZGl4UG9pbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIga29tbWFNYXRjaGVzID0gaW5pdGlhbFZhbHVlLm1hdGNoKC8sL2cpLCBkb3RNYXRjaGVzID0gaW5pdGlhbFZhbHVlLm1hdGNoKC9cXC4vZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsVmFsdWUgPSBkb3RNYXRjaGVzICYmIGtvbW1hTWF0Y2hlcyA/IGRvdE1hdGNoZXMubGVuZ3RoID4ga29tbWFNYXRjaGVzLmxlbmd0aCA/IChpbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWUucmVwbGFjZSgvXFwuL2csIFwiXCIpKS5yZXBsYWNlKFwiLFwiLCBvcHRzLnJhZGl4UG9pbnQpIDoga29tbWFNYXRjaGVzLmxlbmd0aCA+IGRvdE1hdGNoZXMubGVuZ3RoID8gKGluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZS5yZXBsYWNlKC8sL2csIFwiXCIpKS5yZXBsYWNlKFwiLlwiLCBvcHRzLnJhZGl4UG9pbnQpIDogaW5pdGlhbFZhbHVlLmluZGV4T2YoXCIuXCIpIDwgaW5pdGlhbFZhbHVlLmluZGV4T2YoXCIsXCIpID8gaW5pdGlhbFZhbHVlLnJlcGxhY2UoL1xcLi9nLCBcIlwiKSA6IGluaXRpYWxWYWx1ZS5yZXBsYWNlKC8sL2csIFwiXCIpIDogaW5pdGlhbFZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChJbnB1dG1hc2suZXNjYXBlUmVnZXgob3B0cy5ncm91cFNlcGFyYXRvciksIFwiZ1wiKSwgXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICAwID09PSBvcHRzLmRpZ2l0cyAmJiAoLTEgIT09IGluaXRpYWxWYWx1ZS5pbmRleE9mKFwiLlwiKSA/IGluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZS5zdWJzdHJpbmcoMCwgaW5pdGlhbFZhbHVlLmluZGV4T2YoXCIuXCIpKSA6IC0xICE9PSBpbml0aWFsVmFsdWUuaW5kZXhPZihcIixcIikgJiYgKGluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZS5zdWJzdHJpbmcoMCwgaW5pdGlhbFZhbHVlLmluZGV4T2YoXCIsXCIpKSkpLCBcbiAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gb3B0cy5yYWRpeFBvaW50ICYmIGlzRmluaXRlKG9wdHMuZGlnaXRzKSAmJiAtMSAhPT0gaW5pdGlhbFZhbHVlLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlY1BhcnQgPSBpbml0aWFsVmFsdWUuc3BsaXQob3B0cy5yYWRpeFBvaW50KVsxXS5tYXRjaChuZXcgUmVnRXhwKFwiXFxcXGQqXCIpKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChvcHRzLmRpZ2l0cykgPCBkZWNQYXJ0LnRvU3RyaW5nKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpZ2l0c0ZhY3RvciA9IE1hdGgucG93KDEwLCBwYXJzZUludChvcHRzLmRpZ2l0cykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZS5yZXBsYWNlKElucHV0bWFzay5lc2NhcGVSZWdleChvcHRzLnJhZGl4UG9pbnQpLCBcIi5cIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZSA9IChpbml0aWFsVmFsdWUgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoaW5pdGlhbFZhbHVlKSAqIGRpZ2l0c0ZhY3RvcikgLyBkaWdpdHNGYWN0b3IpLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgb3B0cy5yYWRpeFBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5pdGlhbFZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiBmdW5jdGlvbihlLCBidWZmZXIsIGNhcmV0UG9zLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5jdHJsS2V5KSBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSW5wdXRtYXNrLmtleUNvZGUuVVA6XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudmFsKHBhcnNlRmxvYXQodGhpcy5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpKSArIHBhcnNlSW50KG9wdHMuc3RlcCkpLCAkaW5wdXQudHJpZ2dlcihcInNldHZhbHVlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIElucHV0bWFzay5rZXlDb2RlLkRPV046XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudmFsKHBhcnNlRmxvYXQodGhpcy5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpKSAtIHBhcnNlSW50KG9wdHMuc3RlcCkpLCAkaW5wdXQudHJpZ2dlcihcInNldHZhbHVlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGN1cnJlbmN5OiB7XG4gICAgICAgICAgICAgICAgcHJlZml4OiBcIiQgXCIsXG4gICAgICAgICAgICAgICAgZ3JvdXBTZXBhcmF0b3I6IFwiLFwiLFxuICAgICAgICAgICAgICAgIGFsaWFzOiBcIm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCIwXCIsXG4gICAgICAgICAgICAgICAgYXV0b0dyb3VwOiAhMCxcbiAgICAgICAgICAgICAgICBkaWdpdHM6IDIsXG4gICAgICAgICAgICAgICAgZGlnaXRzT3B0aW9uYWw6ICExLFxuICAgICAgICAgICAgICAgIGNsZWFyTWFza09uTG9zdEZvY3VzOiAhMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlY2ltYWw6IHtcbiAgICAgICAgICAgICAgICBhbGlhczogXCJudW1lcmljXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnRlZ2VyOiB7XG4gICAgICAgICAgICAgICAgYWxpYXM6IFwibnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIGRpZ2l0czogMCxcbiAgICAgICAgICAgICAgICByYWRpeFBvaW50OiBcIlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGVyY2VudGFnZToge1xuICAgICAgICAgICAgICAgIGFsaWFzOiBcIm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICBkaWdpdHM6IDIsXG4gICAgICAgICAgICAgICAgZGlnaXRzT3B0aW9uYWw6ICEwLFxuICAgICAgICAgICAgICAgIHJhZGl4UG9pbnQ6IFwiLlwiLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIjBcIixcbiAgICAgICAgICAgICAgICBhdXRvR3JvdXA6ICExLFxuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgICAgICBzdWZmaXg6IFwiICVcIixcbiAgICAgICAgICAgICAgICBhbGxvd01pbnVzOiAhMVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgSW5wdXRtYXNrO1xuICAgIH0sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18gPSBbIF9fd2VicGFja19yZXF1aXJlX18oMCksIF9fd2VicGFja19yZXF1aXJlX18oMSkgXSwgXG4gICAgdm9pZCAwID09PSAoX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIChfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18gPSBmYWN0b3J5KSA/IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXy5hcHBseShleHBvcnRzLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fKSA6IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXykgfHwgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pO1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18sIGZhY3Rvcnk7XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICAgIGZhY3RvcnkgPSBmdW5jdGlvbigkLCBJbnB1dG1hc2spIHtcbiAgICAgICAgZnVuY3Rpb24gbWFza1NvcnQoYSwgYikge1xuICAgICAgICAgICAgdmFyIG1hc2thID0gKGEubWFzayB8fCBhKS5yZXBsYWNlKC8jL2csIFwiMFwiKS5yZXBsYWNlKC9cXCkvLCBcIjBcIikucmVwbGFjZSgvWysoKSMtXS9nLCBcIlwiKSwgbWFza2IgPSAoYi5tYXNrIHx8IGIpLnJlcGxhY2UoLyMvZywgXCIwXCIpLnJlcGxhY2UoL1xcKS8sIFwiMFwiKS5yZXBsYWNlKC9bKygpIy1dL2csIFwiXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG1hc2thLmxvY2FsZUNvbXBhcmUobWFza2IpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbmFseXNlTWFza0Jhc2UgPSBJbnB1dG1hc2sucHJvdG90eXBlLmFuYWx5c2VNYXNrO1xuICAgICAgICByZXR1cm4gSW5wdXRtYXNrLnByb3RvdHlwZS5hbmFseXNlTWFzayA9IGZ1bmN0aW9uKG1hc2ssIHJlZ2V4TWFzaywgb3B0cykge1xuICAgICAgICAgICAgdmFyIG1hc2tHcm91cHMgPSB7fTtcbiAgICAgICAgICAgIHJldHVybiBvcHRzLnBob25lQ29kZXMgJiYgKG9wdHMucGhvbmVDb2RlcyAmJiBvcHRzLnBob25lQ29kZXMubGVuZ3RoID4gMWUzICYmIChmdW5jdGlvbiByZWR1Y2VWYXJpYXRpb25zKG1hc2tzLCBwcmV2aW91c1ZhcmlhdGlvbiwgcHJldmlvdXNtYXNrR3JvdXApIHtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1ZhcmlhdGlvbiA9IHByZXZpb3VzVmFyaWF0aW9uIHx8IFwiXCIsIHByZXZpb3VzbWFza0dyb3VwID0gcHJldmlvdXNtYXNrR3JvdXAgfHwgbWFza0dyb3VwcywgXG4gICAgICAgICAgICAgICAgXCJcIiAhPT0gcHJldmlvdXNWYXJpYXRpb24gJiYgKHByZXZpb3VzbWFza0dyb3VwW3ByZXZpb3VzVmFyaWF0aW9uXSA9IHt9KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB2YXJpYXRpb24gPSBcIlwiLCBtYXNrR3JvdXAgPSBwcmV2aW91c21hc2tHcm91cFtwcmV2aW91c1ZhcmlhdGlvbl0gfHwgcHJldmlvdXNtYXNrR3JvdXAsIGkgPSBtYXNrcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgbWFza0dyb3VwW3ZhcmlhdGlvbiA9IChtYXNrID0gbWFza3NbaV0ubWFzayB8fCBtYXNrc1tpXSkuc3Vic3RyKDAsIDEpXSA9IG1hc2tHcm91cFt2YXJpYXRpb25dIHx8IFtdLCBcbiAgICAgICAgICAgICAgICBtYXNrR3JvdXBbdmFyaWF0aW9uXS51bnNoaWZ0KG1hc2suc3Vic3RyKDEpKSwgbWFza3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5keCBpbiBtYXNrR3JvdXApIG1hc2tHcm91cFtuZHhdLmxlbmd0aCA+IDUwMCAmJiByZWR1Y2VWYXJpYXRpb25zKG1hc2tHcm91cFtuZHhdLnNsaWNlKCksIG5keCwgbWFza0dyb3VwKTtcbiAgICAgICAgICAgIH0oKG1hc2sgPSBtYXNrLnN1YnN0cigxLCBtYXNrLmxlbmd0aCAtIDIpKS5zcGxpdChvcHRzLmdyb3VwbWFya2VyWzFdICsgb3B0cy5hbHRlcm5hdG9ybWFya2VyICsgb3B0cy5ncm91cG1hcmtlclswXSkpLCBcbiAgICAgICAgICAgIG1hc2sgPSBmdW5jdGlvbiByZWJ1aWxkKG1hc2tHcm91cCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXNrID0gXCJcIiwgc3VibWFza3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuZHggaW4gbWFza0dyb3VwKSAkLmlzQXJyYXkobWFza0dyb3VwW25keF0pID8gMSA9PT0gbWFza0dyb3VwW25keF0ubGVuZ3RoID8gc3VibWFza3MucHVzaChuZHggKyBtYXNrR3JvdXBbbmR4XSkgOiBzdWJtYXNrcy5wdXNoKG5keCArIG9wdHMuZ3JvdXBtYXJrZXJbMF0gKyBtYXNrR3JvdXBbbmR4XS5qb2luKG9wdHMuZ3JvdXBtYXJrZXJbMV0gKyBvcHRzLmFsdGVybmF0b3JtYXJrZXIgKyBvcHRzLmdyb3VwbWFya2VyWzBdKSArIG9wdHMuZ3JvdXBtYXJrZXJbMV0pIDogc3VibWFza3MucHVzaChuZHggKyByZWJ1aWxkKG1hc2tHcm91cFtuZHhdKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgPT09IHN1Ym1hc2tzLmxlbmd0aCA/IG1hc2sgKz0gc3VibWFza3NbMF0gOiBtYXNrICs9IG9wdHMuZ3JvdXBtYXJrZXJbMF0gKyBzdWJtYXNrcy5qb2luKG9wdHMuZ3JvdXBtYXJrZXJbMV0gKyBvcHRzLmFsdGVybmF0b3JtYXJrZXIgKyBvcHRzLmdyb3VwbWFya2VyWzBdKSArIG9wdHMuZ3JvdXBtYXJrZXJbMV0sIFxuICAgICAgICAgICAgICAgIG1hc2s7XG4gICAgICAgICAgICB9KG1hc2tHcm91cHMpKSwgbWFzayA9IG1hc2sucmVwbGFjZSgvOS9nLCBcIlxcXFw5XCIpKSwgYW5hbHlzZU1hc2tCYXNlLmNhbGwodGhpcywgbWFzaywgcmVnZXhNYXNrLCBvcHRzKTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLmV4dGVuZEFsaWFzZXMoe1xuICAgICAgICAgICAgYWJzdHJhY3RwaG9uZToge1xuICAgICAgICAgICAgICAgIGdyb3VwbWFya2VyOiBbIFwiPFwiLCBcIj5cIiBdLFxuICAgICAgICAgICAgICAgIGNvdW50cnljb2RlOiBcIlwiLFxuICAgICAgICAgICAgICAgIHBob25lQ29kZXM6IFtdLFxuICAgICAgICAgICAgICAgIGtlZXBTdGF0aWM6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgIG1hc2s6IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMuZGVmaW5pdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIiNcIjogSW5wdXRtYXNrLnByb3RvdHlwZS5kZWZpbml0aW9uc1s5XVxuICAgICAgICAgICAgICAgICAgICB9LCBvcHRzLnBob25lQ29kZXMuc29ydChtYXNrU29ydCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkJlZm9yZU1hc2s6IGZ1bmN0aW9uKHZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzZWRWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoL14wezEsMn0vLCBcIlwiKS5yZXBsYWNlKC9bXFxzXS9nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChwcm9jZXNzZWRWYWx1ZS5pbmRleE9mKG9wdHMuY291bnRyeWNvZGUpID4gMSB8fCAtMSA9PT0gcHJvY2Vzc2VkVmFsdWUuaW5kZXhPZihvcHRzLmNvdW50cnljb2RlKSkgJiYgKHByb2Nlc3NlZFZhbHVlID0gXCIrXCIgKyBvcHRzLmNvdW50cnljb2RlICsgcHJvY2Vzc2VkVmFsdWUpLCBcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkVmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuTWFzazogZnVuY3Rpb24obWFza2VkVmFsdWUsIHVubWFza2VkVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tlZFZhbHVlLnJlcGxhY2UoL1soKSMtXS9nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0bW9kZTogXCJ0ZWxcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgSW5wdXRtYXNrO1xuICAgIH0sIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18gPSBbIF9fd2VicGFja19yZXF1aXJlX18oMCksIF9fd2VicGFja19yZXF1aXJlX18oMSkgXSwgXG4gICAgdm9pZCAwID09PSAoX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIChfX1dFQlBBQ0tfQU1EX0RFRklORV9GQUNUT1JZX18gPSBmYWN0b3J5KSA/IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXy5hcHBseShleHBvcnRzLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fKSA6IF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXykgfHwgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pO1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXywgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18sIGZhY3RvcnksIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfSA6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gICAgZmFjdG9yeSA9IGZ1bmN0aW9uKCQsIElucHV0bWFzaykge1xuICAgICAgICByZXR1cm4gdm9pZCAwID09PSAkLmZuLmlucHV0bWFzayAmJiAoJC5mbi5pbnB1dG1hc2sgPSBmdW5jdGlvbihmbiwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIG5wdG1hc2ssIGlucHV0ID0gdGhpc1swXTtcbiAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IG9wdGlvbnMgJiYgKG9wdGlvbnMgPSB7fSksIFwic3RyaW5nXCIgPT0gdHlwZW9mIGZuKSBzd2l0Y2ggKGZuKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJ1bm1hc2tlZHZhbHVlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0ICYmIGlucHV0LmlucHV0bWFzayA/IGlucHV0LmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCkgOiAkKGlucHV0KS52YWwoKTtcblxuICAgICAgICAgICAgICBjYXNlIFwicmVtb3ZlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dG1hc2sgJiYgdGhpcy5pbnB1dG1hc2sucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSBcImdldGVtcHR5bWFza1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dCAmJiBpbnB1dC5pbnB1dG1hc2sgPyBpbnB1dC5pbnB1dG1hc2suZ2V0ZW1wdHltYXNrKCkgOiBcIlwiO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJoYXNNYXNrZWRWYWx1ZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiAhKCFpbnB1dCB8fCAhaW5wdXQuaW5wdXRtYXNrKSAmJiBpbnB1dC5pbnB1dG1hc2suaGFzTWFza2VkVmFsdWUoKTtcblxuICAgICAgICAgICAgICBjYXNlIFwiaXNDb21wbGV0ZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiAhaW5wdXQgfHwgIWlucHV0LmlucHV0bWFzayB8fCBpbnB1dC5pbnB1dG1hc2suaXNDb21wbGV0ZSgpO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJnZXRtZXRhZGF0YVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dCAmJiBpbnB1dC5pbnB1dG1hc2sgPyBpbnB1dC5pbnB1dG1hc2suZ2V0bWV0YWRhdGEoKSA6IHZvaWQgMDtcblxuICAgICAgICAgICAgICBjYXNlIFwic2V0dmFsdWVcIjpcbiAgICAgICAgICAgICAgICBJbnB1dG1hc2suc2V0VmFsdWUoaW5wdXQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgXCJvcHRpb25cIjpcbiAgICAgICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiAhPSB0eXBlb2Ygb3B0aW9ucykgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gdGhpcy5pbnB1dG1hc2spIHJldHVybiB0aGlzLmlucHV0bWFzay5vcHRpb24ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0ICYmIHZvaWQgMCAhPT0gaW5wdXQuaW5wdXRtYXNrKSByZXR1cm4gaW5wdXQuaW5wdXRtYXNrLm9wdGlvbihvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmFsaWFzID0gZm4sIG5wdG1hc2sgPSBuZXcgSW5wdXRtYXNrKG9wdGlvbnMpLCB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG5wdG1hc2subWFzayh0aGlzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKFwib2JqZWN0XCIgPT0gKHZvaWQgMCA9PT0gZm4gPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihmbikpKSByZXR1cm4gbnB0bWFzayA9IG5ldyBJbnB1dG1hc2soZm4pLCBcbiAgICAgICAgICAgICAgICB2b2lkIDAgPT09IGZuLm1hc2sgJiYgdm9pZCAwID09PSBmbi5hbGlhcyA/IHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gdGhpcy5pbnB1dG1hc2spIHJldHVybiB0aGlzLmlucHV0bWFzay5vcHRpb24oZm4pO1xuICAgICAgICAgICAgICAgICAgICBucHRtYXNrLm1hc2sodGhpcyk7XG4gICAgICAgICAgICAgICAgfSkgOiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG5wdG1hc2subWFzayh0aGlzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodm9pZCAwID09PSBmbikgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgKG5wdG1hc2sgPSBuZXcgSW5wdXRtYXNrKG9wdGlvbnMpKS5tYXNrKHRoaXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgJC5mbi5pbnB1dG1hc2s7XG4gICAgfSwgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXyA9IFsgX193ZWJwYWNrX3JlcXVpcmVfXygyKSwgX193ZWJwYWNrX3JlcXVpcmVfXygxKSBdLCBcbiAgICB2b2lkIDAgPT09IChfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKF9fV0VCUEFDS19BTURfREVGSU5FX0ZBQ1RPUllfXyA9IGZhY3RvcnkpID8gX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fLmFwcGx5KGV4cG9ydHMsIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18pIDogX19XRUJQQUNLX0FNRF9ERUZJTkVfRkFDVE9SWV9fKSB8fCAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyk7XG59IF0pOyIsIi8qIVxyXG4gKiBqUXVlcnkgVmFsaWRhdGlvbiBQbHVnaW4gdjEuMTUuMFxyXG4gKlxyXG4gKiBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvXHJcbiAqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNiBKw7ZybiBaYWVmZmVyZXJcclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4oZnVuY3Rpb24oIGZhY3RvcnkgKSB7XHJcblx0aWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcclxuXHRcdGRlZmluZSggW1wianF1ZXJ5XCJdLCBmYWN0b3J5ICk7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoIHJlcXVpcmUoIFwianF1ZXJ5XCIgKSApO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRmYWN0b3J5KCBqUXVlcnkgKTtcclxuXHR9XHJcbn0oZnVuY3Rpb24oICQgKSB7XHJcblxyXG4kLmV4dGVuZCggJC5mbiwge1xuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy92YWxpZGF0ZS9cblx0dmFsaWRhdGU6IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdFx0Ly8gSWYgbm90aGluZyBpcyBzZWxlY3RlZCwgcmV0dXJuIG5vdGhpbmc7IGNhbid0IGNoYWluIGFueXdheVxuXHRcdGlmICggIXRoaXMubGVuZ3RoICkge1xuXHRcdFx0aWYgKCBvcHRpb25zICYmIG9wdGlvbnMuZGVidWcgJiYgd2luZG93LmNvbnNvbGUgKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybiggXCJOb3RoaW5nIHNlbGVjdGVkLCBjYW4ndCB2YWxpZGF0ZSwgcmV0dXJuaW5nIG5vdGhpbmcuXCIgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBpZiBhIHZhbGlkYXRvciBmb3IgdGhpcyBmb3JtIHdhcyBhbHJlYWR5IGNyZWF0ZWRcblx0XHR2YXIgdmFsaWRhdG9yID0gJC5kYXRhKCB0aGlzWyAwIF0sIFwidmFsaWRhdG9yXCIgKTtcblx0XHRpZiAoIHZhbGlkYXRvciApIHtcblx0XHRcdHJldHVybiB2YWxpZGF0b3I7XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIG5vdmFsaWRhdGUgdGFnIGlmIEhUTUw1LlxuXHRcdHRoaXMuYXR0ciggXCJub3ZhbGlkYXRlXCIsIFwibm92YWxpZGF0ZVwiICk7XG5cblx0XHR2YWxpZGF0b3IgPSBuZXcgJC52YWxpZGF0b3IoIG9wdGlvbnMsIHRoaXNbIDAgXSApO1xuXHRcdCQuZGF0YSggdGhpc1sgMCBdLCBcInZhbGlkYXRvclwiLCB2YWxpZGF0b3IgKTtcblxuXHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLm9uc3VibWl0ICkge1xuXG5cdFx0XHR0aGlzLm9uKCBcImNsaWNrLnZhbGlkYXRlXCIsIFwiOnN1Ym1pdFwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLnN1Ym1pdEhhbmRsZXIgKSB7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLnN1Ym1pdEJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFsbG93IHN1cHByZXNzaW5nIHZhbGlkYXRpb24gYnkgYWRkaW5nIGEgY2FuY2VsIGNsYXNzIHRvIHRoZSBzdWJtaXQgYnV0dG9uXG5cdFx0XHRcdGlmICggJCggdGhpcyApLmhhc0NsYXNzKCBcImNhbmNlbFwiICkgKSB7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLmNhbmNlbFN1Ym1pdCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBbGxvdyBzdXBwcmVzc2luZyB2YWxpZGF0aW9uIGJ5IGFkZGluZyB0aGUgaHRtbDUgZm9ybW5vdmFsaWRhdGUgYXR0cmlidXRlIHRvIHRoZSBzdWJtaXQgYnV0dG9uXG5cdFx0XHRcdGlmICggJCggdGhpcyApLmF0dHIoIFwiZm9ybW5vdmFsaWRhdGVcIiApICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLmNhbmNlbFN1Ym1pdCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblxuXHRcdFx0Ly8gVmFsaWRhdGUgdGhlIGZvcm0gb24gc3VibWl0XG5cdFx0XHR0aGlzLm9uKCBcInN1Ym1pdC52YWxpZGF0ZVwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLmRlYnVnICkge1xuXG5cdFx0XHRcdFx0Ly8gUHJldmVudCBmb3JtIHN1Ym1pdCB0byBiZSBhYmxlIHRvIHNlZSBjb25zb2xlIG91dHB1dFxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZnVuY3Rpb24gaGFuZGxlKCkge1xuXHRcdFx0XHRcdHZhciBoaWRkZW4sIHJlc3VsdDtcblx0XHRcdFx0XHRpZiAoIHZhbGlkYXRvci5zZXR0aW5ncy5zdWJtaXRIYW5kbGVyICkge1xuXHRcdFx0XHRcdFx0aWYgKCB2YWxpZGF0b3Iuc3VibWl0QnV0dG9uICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEluc2VydCBhIGhpZGRlbiBpbnB1dCBhcyBhIHJlcGxhY2VtZW50IGZvciB0aGUgbWlzc2luZyBzdWJtaXQgYnV0dG9uXG5cdFx0XHRcdFx0XHRcdGhpZGRlbiA9ICQoIFwiPGlucHV0IHR5cGU9J2hpZGRlbicvPlwiIClcblx0XHRcdFx0XHRcdFx0XHQuYXR0ciggXCJuYW1lXCIsIHZhbGlkYXRvci5zdWJtaXRCdXR0b24ubmFtZSApXG5cdFx0XHRcdFx0XHRcdFx0LnZhbCggJCggdmFsaWRhdG9yLnN1Ym1pdEJ1dHRvbiApLnZhbCgpIClcblx0XHRcdFx0XHRcdFx0XHQuYXBwZW5kVG8oIHZhbGlkYXRvci5jdXJyZW50Rm9ybSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdmFsaWRhdG9yLnNldHRpbmdzLnN1Ym1pdEhhbmRsZXIuY2FsbCggdmFsaWRhdG9yLCB2YWxpZGF0b3IuY3VycmVudEZvcm0sIGV2ZW50ICk7XG5cdFx0XHRcdFx0XHRpZiAoIHZhbGlkYXRvci5zdWJtaXRCdXR0b24gKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQW5kIGNsZWFuIHVwIGFmdGVyd2FyZHM7IHRoYW5rcyB0byBuby1ibG9jay1zY29wZSwgaGlkZGVuIGNhbiBiZSByZWZlcmVuY2VkXG5cdFx0XHRcdFx0XHRcdGhpZGRlbi5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICggcmVzdWx0ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUHJldmVudCBzdWJtaXQgZm9yIGludmFsaWQgZm9ybXMgb3IgY3VzdG9tIHN1Ym1pdCBoYW5kbGVyc1xuXHRcdFx0XHRpZiAoIHZhbGlkYXRvci5jYW5jZWxTdWJtaXQgKSB7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLmNhbmNlbFN1Ym1pdCA9IGZhbHNlO1xuXHRcdFx0XHRcdHJldHVybiBoYW5kbGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIHZhbGlkYXRvci5mb3JtKCkgKSB7XG5cdFx0XHRcdFx0aWYgKCB2YWxpZGF0b3IucGVuZGluZ1JlcXVlc3QgKSB7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3IuZm9ybVN1Ym1pdHRlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBoYW5kbGUoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuZm9jdXNJbnZhbGlkKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbGlkYXRvcjtcblx0fSxcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvdmFsaWQvXG5cdHZhbGlkOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgdmFsaWQsIHZhbGlkYXRvciwgZXJyb3JMaXN0O1xuXG5cdFx0aWYgKCAkKCB0aGlzWyAwIF0gKS5pcyggXCJmb3JtXCIgKSApIHtcblx0XHRcdHZhbGlkID0gdGhpcy52YWxpZGF0ZSgpLmZvcm0oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXJyb3JMaXN0ID0gW107XG5cdFx0XHR2YWxpZCA9IHRydWU7XG5cdFx0XHR2YWxpZGF0b3IgPSAkKCB0aGlzWyAwIF0uZm9ybSApLnZhbGlkYXRlKCk7XG5cdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YWxpZCA9IHZhbGlkYXRvci5lbGVtZW50KCB0aGlzICkgJiYgdmFsaWQ7XG5cdFx0XHRcdGlmICggIXZhbGlkICkge1xuXHRcdFx0XHRcdGVycm9yTGlzdCA9IGVycm9yTGlzdC5jb25jYXQoIHZhbGlkYXRvci5lcnJvckxpc3QgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdFx0dmFsaWRhdG9yLmVycm9yTGlzdCA9IGVycm9yTGlzdDtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbGlkO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9ydWxlcy9cblx0cnVsZXM6IGZ1bmN0aW9uKCBjb21tYW5kLCBhcmd1bWVudCApIHtcblxuXHRcdC8vIElmIG5vdGhpbmcgaXMgc2VsZWN0ZWQsIHJldHVybiBub3RoaW5nOyBjYW4ndCBjaGFpbiBhbnl3YXlcblx0XHRpZiAoICF0aGlzLmxlbmd0aCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgZWxlbWVudCA9IHRoaXNbIDAgXSxcblx0XHRcdHNldHRpbmdzLCBzdGF0aWNSdWxlcywgZXhpc3RpbmdSdWxlcywgZGF0YSwgcGFyYW0sIGZpbHRlcmVkO1xuXG5cdFx0aWYgKCBjb21tYW5kICkge1xuXHRcdFx0c2V0dGluZ3MgPSAkLmRhdGEoIGVsZW1lbnQuZm9ybSwgXCJ2YWxpZGF0b3JcIiApLnNldHRpbmdzO1xuXHRcdFx0c3RhdGljUnVsZXMgPSBzZXR0aW5ncy5ydWxlcztcblx0XHRcdGV4aXN0aW5nUnVsZXMgPSAkLnZhbGlkYXRvci5zdGF0aWNSdWxlcyggZWxlbWVudCApO1xuXHRcdFx0c3dpdGNoICggY29tbWFuZCApIHtcblx0XHRcdGNhc2UgXCJhZGRcIjpcblx0XHRcdFx0JC5leHRlbmQoIGV4aXN0aW5nUnVsZXMsICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoIGFyZ3VtZW50ICkgKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgbWVzc2FnZXMgZnJvbSBydWxlcywgYnV0IGFsbG93IHRoZW0gdG8gYmUgc2V0IHNlcGFyYXRlbHlcblx0XHRcdFx0ZGVsZXRlIGV4aXN0aW5nUnVsZXMubWVzc2FnZXM7XG5cdFx0XHRcdHN0YXRpY1J1bGVzWyBlbGVtZW50Lm5hbWUgXSA9IGV4aXN0aW5nUnVsZXM7XG5cdFx0XHRcdGlmICggYXJndW1lbnQubWVzc2FnZXMgKSB7XG5cdFx0XHRcdFx0c2V0dGluZ3MubWVzc2FnZXNbIGVsZW1lbnQubmFtZSBdID0gJC5leHRlbmQoIHNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXSwgYXJndW1lbnQubWVzc2FnZXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJyZW1vdmVcIjpcblx0XHRcdFx0aWYgKCAhYXJndW1lbnQgKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHN0YXRpY1J1bGVzWyBlbGVtZW50Lm5hbWUgXTtcblx0XHRcdFx0XHRyZXR1cm4gZXhpc3RpbmdSdWxlcztcblx0XHRcdFx0fVxuXHRcdFx0XHRmaWx0ZXJlZCA9IHt9O1xuXHRcdFx0XHQkLmVhY2goIGFyZ3VtZW50LnNwbGl0KCAvXFxzLyApLCBmdW5jdGlvbiggaW5kZXgsIG1ldGhvZCApIHtcblx0XHRcdFx0XHRmaWx0ZXJlZFsgbWV0aG9kIF0gPSBleGlzdGluZ1J1bGVzWyBtZXRob2QgXTtcblx0XHRcdFx0XHRkZWxldGUgZXhpc3RpbmdSdWxlc1sgbWV0aG9kIF07XG5cdFx0XHRcdFx0aWYgKCBtZXRob2QgPT09IFwicmVxdWlyZWRcIiApIHtcblx0XHRcdFx0XHRcdCQoIGVsZW1lbnQgKS5yZW1vdmVBdHRyKCBcImFyaWEtcmVxdWlyZWRcIiApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdFx0XHRyZXR1cm4gZmlsdGVyZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZGF0YSA9ICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGVzKFxuXHRcdCQuZXh0ZW5kKFxuXHRcdFx0e30sXG5cdFx0XHQkLnZhbGlkYXRvci5jbGFzc1J1bGVzKCBlbGVtZW50ICksXG5cdFx0XHQkLnZhbGlkYXRvci5hdHRyaWJ1dGVSdWxlcyggZWxlbWVudCApLFxuXHRcdFx0JC52YWxpZGF0b3IuZGF0YVJ1bGVzKCBlbGVtZW50ICksXG5cdFx0XHQkLnZhbGlkYXRvci5zdGF0aWNSdWxlcyggZWxlbWVudCApXG5cdFx0KSwgZWxlbWVudCApO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHJlcXVpcmVkIGlzIGF0IGZyb250XG5cdFx0aWYgKCBkYXRhLnJlcXVpcmVkICkge1xuXHRcdFx0cGFyYW0gPSBkYXRhLnJlcXVpcmVkO1xuXHRcdFx0ZGVsZXRlIGRhdGEucmVxdWlyZWQ7XG5cdFx0XHRkYXRhID0gJC5leHRlbmQoIHsgcmVxdWlyZWQ6IHBhcmFtIH0sIGRhdGEgKTtcblx0XHRcdCQoIGVsZW1lbnQgKS5hdHRyKCBcImFyaWEtcmVxdWlyZWRcIiwgXCJ0cnVlXCIgKTtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgcmVtb3RlIGlzIGF0IGJhY2tcblx0XHRpZiAoIGRhdGEucmVtb3RlICkge1xuXHRcdFx0cGFyYW0gPSBkYXRhLnJlbW90ZTtcblx0XHRcdGRlbGV0ZSBkYXRhLnJlbW90ZTtcblx0XHRcdGRhdGEgPSAkLmV4dGVuZCggZGF0YSwgeyByZW1vdGU6IHBhcmFtIH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxufSApO1xuXG4vLyBDdXN0b20gc2VsZWN0b3JzXG4kLmV4dGVuZCggJC5leHByWyBcIjpcIiBdLCB7XG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2JsYW5rLXNlbGVjdG9yL1xuXHRibGFuazogZnVuY3Rpb24oIGEgKSB7XG5cdFx0cmV0dXJuICEkLnRyaW0oIFwiXCIgKyAkKCBhICkudmFsKCkgKTtcblx0fSxcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZmlsbGVkLXNlbGVjdG9yL1xuXHRmaWxsZWQ6IGZ1bmN0aW9uKCBhICkge1xuXHRcdHZhciB2YWwgPSAkKCBhICkudmFsKCk7XG5cdFx0cmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhISQudHJpbSggXCJcIiArIHZhbCApO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy91bmNoZWNrZWQtc2VsZWN0b3IvXG5cdHVuY2hlY2tlZDogZnVuY3Rpb24oIGEgKSB7XG5cdFx0cmV0dXJuICEkKCBhICkucHJvcCggXCJjaGVja2VkXCIgKTtcblx0fVxufSApO1xuXG4vLyBDb25zdHJ1Y3RvciBmb3IgdmFsaWRhdG9yXG4kLnZhbGlkYXRvciA9IGZ1bmN0aW9uKCBvcHRpb25zLCBmb3JtICkge1xuXHR0aGlzLnNldHRpbmdzID0gJC5leHRlbmQoIHRydWUsIHt9LCAkLnZhbGlkYXRvci5kZWZhdWx0cywgb3B0aW9ucyApO1xuXHR0aGlzLmN1cnJlbnRGb3JtID0gZm9ybTtcblx0dGhpcy5pbml0KCk7XG59O1xuXG4vLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQvXG4kLnZhbGlkYXRvci5mb3JtYXQgPSBmdW5jdGlvbiggc291cmNlLCBwYXJhbXMgKSB7XG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgYXJncyA9ICQubWFrZUFycmF5KCBhcmd1bWVudHMgKTtcblx0XHRcdGFyZ3MudW5zaGlmdCggc291cmNlICk7XG5cdFx0XHRyZXR1cm4gJC52YWxpZGF0b3IuZm9ybWF0LmFwcGx5KCB0aGlzLCBhcmdzICk7XG5cdFx0fTtcblx0fVxuXHRpZiAoIHBhcmFtcyA9PT0gdW5kZWZpbmVkICkge1xuXHRcdHJldHVybiBzb3VyY2U7XG5cdH1cblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBwYXJhbXMuY29uc3RydWN0b3IgIT09IEFycmF5ICApIHtcblx0XHRwYXJhbXMgPSAkLm1ha2VBcnJheSggYXJndW1lbnRzICkuc2xpY2UoIDEgKTtcblx0fVxuXHRpZiAoIHBhcmFtcy5jb25zdHJ1Y3RvciAhPT0gQXJyYXkgKSB7XG5cdFx0cGFyYW1zID0gWyBwYXJhbXMgXTtcblx0fVxuXHQkLmVhY2goIHBhcmFtcywgZnVuY3Rpb24oIGksIG4gKSB7XG5cdFx0c291cmNlID0gc291cmNlLnJlcGxhY2UoIG5ldyBSZWdFeHAoIFwiXFxcXHtcIiArIGkgKyBcIlxcXFx9XCIsIFwiZ1wiICksIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIG47XG5cdFx0fSApO1xuXHR9ICk7XG5cdHJldHVybiBzb3VyY2U7XG59O1xuXG4kLmV4dGVuZCggJC52YWxpZGF0b3IsIHtcblxuXHRkZWZhdWx0czoge1xuXHRcdG1lc3NhZ2VzOiB7fSxcblx0XHRncm91cHM6IHt9LFxuXHRcdHJ1bGVzOiB7fSxcblx0XHRlcnJvckNsYXNzOiBcImVycm9yXCIsXG5cdFx0cGVuZGluZ0NsYXNzOiBcInBlbmRpbmdcIixcblx0XHR2YWxpZENsYXNzOiBcInZhbGlkXCIsXG5cdFx0ZXJyb3JFbGVtZW50OiBcImxhYmVsXCIsXG5cdFx0Zm9jdXNDbGVhbnVwOiBmYWxzZSxcblx0XHRmb2N1c0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JDb250YWluZXI6ICQoIFtdICksXG5cdFx0ZXJyb3JMYWJlbENvbnRhaW5lcjogJCggW10gKSxcblx0XHRvbnN1Ym1pdDogdHJ1ZSxcblx0XHRpZ25vcmU6IFwiOmhpZGRlblwiLFxuXHRcdGlnbm9yZVRpdGxlOiBmYWxzZSxcblx0XHRvbmZvY3VzaW46IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0dGhpcy5sYXN0QWN0aXZlID0gZWxlbWVudDtcblxuXHRcdFx0Ly8gSGlkZSBlcnJvciBsYWJlbCBhbmQgcmVtb3ZlIGVycm9yIGNsYXNzIG9uIGZvY3VzIGlmIGVuYWJsZWRcblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5mb2N1c0NsZWFudXAgKSB7XG5cdFx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodCApIHtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0LmNhbGwoIHRoaXMsIGVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcywgdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5oaWRlVGhlc2UoIHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICkgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdG9uZm9jdXNvdXQ6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0aWYgKCAhdGhpcy5jaGVja2FibGUoIGVsZW1lbnQgKSAmJiAoIGVsZW1lbnQubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZCB8fCAhdGhpcy5vcHRpb25hbCggZWxlbWVudCApICkgKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudCggZWxlbWVudCApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0b25rZXl1cDogZnVuY3Rpb24oIGVsZW1lbnQsIGV2ZW50ICkge1xuXG5cdFx0XHQvLyBBdm9pZCByZXZhbGlkYXRlIHRoZSBmaWVsZCB3aGVuIHByZXNzaW5nIG9uZSBvZiB0aGUgZm9sbG93aW5nIGtleXNcblx0XHRcdC8vIFNoaWZ0ICAgICAgID0+IDE2XG5cdFx0XHQvLyBDdHJsICAgICAgICA9PiAxN1xuXHRcdFx0Ly8gQWx0ICAgICAgICAgPT4gMThcblx0XHRcdC8vIENhcHMgbG9jayAgID0+IDIwXG5cdFx0XHQvLyBFbmQgICAgICAgICA9PiAzNVxuXHRcdFx0Ly8gSG9tZSAgICAgICAgPT4gMzZcblx0XHRcdC8vIExlZnQgYXJyb3cgID0+IDM3XG5cdFx0XHQvLyBVcCBhcnJvdyAgICA9PiAzOFxuXHRcdFx0Ly8gUmlnaHQgYXJyb3cgPT4gMzlcblx0XHRcdC8vIERvd24gYXJyb3cgID0+IDQwXG5cdFx0XHQvLyBJbnNlcnQgICAgICA9PiA0NVxuXHRcdFx0Ly8gTnVtIGxvY2sgICAgPT4gMTQ0XG5cdFx0XHQvLyBBbHRHciBrZXkgICA9PiAyMjVcblx0XHRcdHZhciBleGNsdWRlZEtleXMgPSBbXG5cdFx0XHRcdDE2LCAxNywgMTgsIDIwLCAzNSwgMzYsIDM3LFxuXHRcdFx0XHQzOCwgMzksIDQwLCA0NSwgMTQ0LCAyMjVcblx0XHRcdF07XG5cblx0XHRcdGlmICggZXZlbnQud2hpY2ggPT09IDkgJiYgdGhpcy5lbGVtZW50VmFsdWUoIGVsZW1lbnQgKSA9PT0gXCJcIiB8fCAkLmluQXJyYXkoIGV2ZW50LmtleUNvZGUsIGV4Y2x1ZGVkS2V5cyApICE9PSAtMSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIGlmICggZWxlbWVudC5uYW1lIGluIHRoaXMuc3VibWl0dGVkIHx8IGVsZW1lbnQubmFtZSBpbiB0aGlzLmludmFsaWQgKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudCggZWxlbWVudCApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0b25jbGljazogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cblx0XHRcdC8vIENsaWNrIG9uIHNlbGVjdHMsIHJhZGlvYnV0dG9ucyBhbmQgY2hlY2tib3hlc1xuXHRcdFx0aWYgKCBlbGVtZW50Lm5hbWUgaW4gdGhpcy5zdWJtaXR0ZWQgKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudCggZWxlbWVudCApO1xuXG5cdFx0XHQvLyBPciBvcHRpb24gZWxlbWVudHMsIGNoZWNrIHBhcmVudCBzZWxlY3QgaW4gdGhhdCBjYXNlXG5cdFx0XHR9IGVsc2UgaWYgKCBlbGVtZW50LnBhcmVudE5vZGUubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZCApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50LnBhcmVudE5vZGUgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGhpZ2hsaWdodDogZnVuY3Rpb24oIGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MgKSB7XG5cdFx0XHRpZiAoIGVsZW1lbnQudHlwZSA9PT0gXCJyYWRpb1wiICkge1xuXHRcdFx0XHR0aGlzLmZpbmRCeU5hbWUoIGVsZW1lbnQubmFtZSApLmFkZENsYXNzKCBlcnJvckNsYXNzICkucmVtb3ZlQ2xhc3MoIHZhbGlkQ2xhc3MgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoIGVsZW1lbnQgKS5hZGRDbGFzcyggZXJyb3JDbGFzcyApLnJlbW92ZUNsYXNzKCB2YWxpZENsYXNzICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR1bmhpZ2hsaWdodDogZnVuY3Rpb24oIGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MgKSB7XG5cdFx0XHRpZiAoIGVsZW1lbnQudHlwZSA9PT0gXCJyYWRpb1wiICkge1xuXHRcdFx0XHR0aGlzLmZpbmRCeU5hbWUoIGVsZW1lbnQubmFtZSApLnJlbW92ZUNsYXNzKCBlcnJvckNsYXNzICkuYWRkQ2xhc3MoIHZhbGlkQ2xhc3MgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoIGVsZW1lbnQgKS5yZW1vdmVDbGFzcyggZXJyb3JDbGFzcyApLmFkZENsYXNzKCB2YWxpZENsYXNzICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9qUXVlcnkudmFsaWRhdG9yLnNldERlZmF1bHRzL1xuXHRzZXREZWZhdWx0czogZnVuY3Rpb24oIHNldHRpbmdzICkge1xuXHRcdCQuZXh0ZW5kKCAkLnZhbGlkYXRvci5kZWZhdWx0cywgc2V0dGluZ3MgKTtcblx0fSxcblxuXHRtZXNzYWdlczoge1xuXHRcdHJlcXVpcmVkOiBcIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCIsXG5cdFx0cmVtb3RlOiBcIlBsZWFzZSBmaXggdGhpcyBmaWVsZC5cIixcblx0XHRlbWFpbDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiLFxuXHRcdHVybDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwuXCIsXG5cdFx0ZGF0ZTogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlLlwiLFxuXHRcdGRhdGVJU086IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZSAoIElTTyApLlwiLFxuXHRcdG51bWJlcjogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBudW1iZXIuXCIsXG5cdFx0ZGlnaXRzOiBcIlBsZWFzZSBlbnRlciBvbmx5IGRpZ2l0cy5cIixcblx0XHRlcXVhbFRvOiBcIlBsZWFzZSBlbnRlciB0aGUgc2FtZSB2YWx1ZSBhZ2Fpbi5cIixcblx0XHRtYXhsZW5ndGg6ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgbm8gbW9yZSB0aGFuIHswfSBjaGFyYWN0ZXJzLlwiICksXG5cdFx0bWlubGVuZ3RoOiAkLnZhbGlkYXRvci5mb3JtYXQoIFwiUGxlYXNlIGVudGVyIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiICksXG5cdFx0cmFuZ2VsZW5ndGg6ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9IGNoYXJhY3RlcnMgbG9uZy5cIiApLFxuXHRcdHJhbmdlOiAkLnZhbGlkYXRvci5mb3JtYXQoIFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgYmV0d2VlbiB7MH0gYW5kIHsxfS5cIiApLFxuXHRcdG1heDogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIgKSxcblx0XHRtaW46ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gezB9LlwiICksXG5cdFx0c3RlcDogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBhIG11bHRpcGxlIG9mIHswfS5cIiApXG5cdH0sXG5cblx0YXV0b0NyZWF0ZVJhbmdlczogZmFsc2UsXG5cblx0cHJvdG90eXBlOiB7XG5cblx0XHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMubGFiZWxDb250YWluZXIgPSAkKCB0aGlzLnNldHRpbmdzLmVycm9yTGFiZWxDb250YWluZXIgKTtcblx0XHRcdHRoaXMuZXJyb3JDb250ZXh0ID0gdGhpcy5sYWJlbENvbnRhaW5lci5sZW5ndGggJiYgdGhpcy5sYWJlbENvbnRhaW5lciB8fCAkKCB0aGlzLmN1cnJlbnRGb3JtICk7XG5cdFx0XHR0aGlzLmNvbnRhaW5lcnMgPSAkKCB0aGlzLnNldHRpbmdzLmVycm9yQ29udGFpbmVyICkuYWRkKCB0aGlzLnNldHRpbmdzLmVycm9yTGFiZWxDb250YWluZXIgKTtcblx0XHRcdHRoaXMuc3VibWl0dGVkID0ge307XG5cdFx0XHR0aGlzLnZhbHVlQ2FjaGUgPSB7fTtcblx0XHRcdHRoaXMucGVuZGluZ1JlcXVlc3QgPSAwO1xuXHRcdFx0dGhpcy5wZW5kaW5nID0ge307XG5cdFx0XHR0aGlzLmludmFsaWQgPSB7fTtcblx0XHRcdHRoaXMucmVzZXQoKTtcblxuXHRcdFx0dmFyIGdyb3VwcyA9ICggdGhpcy5ncm91cHMgPSB7fSApLFxuXHRcdFx0XHRydWxlcztcblx0XHRcdCQuZWFjaCggdGhpcy5zZXR0aW5ncy5ncm91cHMsIGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnNwbGl0KCAvXFxzLyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCQuZWFjaCggdmFsdWUsIGZ1bmN0aW9uKCBpbmRleCwgbmFtZSApIHtcblx0XHRcdFx0XHRncm91cHNbIG5hbWUgXSA9IGtleTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fSApO1xuXHRcdFx0cnVsZXMgPSB0aGlzLnNldHRpbmdzLnJ1bGVzO1xuXHRcdFx0JC5lYWNoKCBydWxlcywgZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdHJ1bGVzWyBrZXkgXSA9ICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoIHZhbHVlICk7XG5cdFx0XHR9ICk7XG5cblx0XHRcdGZ1bmN0aW9uIGRlbGVnYXRlKCBldmVudCApIHtcblx0XHRcdFx0dmFyIHZhbGlkYXRvciA9ICQuZGF0YSggdGhpcy5mb3JtLCBcInZhbGlkYXRvclwiICksXG5cdFx0XHRcdFx0ZXZlbnRUeXBlID0gXCJvblwiICsgZXZlbnQudHlwZS5yZXBsYWNlKCAvXnZhbGlkYXRlLywgXCJcIiApLFxuXHRcdFx0XHRcdHNldHRpbmdzID0gdmFsaWRhdG9yLnNldHRpbmdzO1xuXHRcdFx0XHRpZiAoIHNldHRpbmdzWyBldmVudFR5cGUgXSAmJiAhJCggdGhpcyApLmlzKCBzZXR0aW5ncy5pZ25vcmUgKSApIHtcblx0XHRcdFx0XHRzZXR0aW5nc1sgZXZlbnRUeXBlIF0uY2FsbCggdmFsaWRhdG9yLCB0aGlzLCBldmVudCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKVxuXHRcdFx0XHQub24oIFwiZm9jdXNpbi52YWxpZGF0ZSBmb2N1c291dC52YWxpZGF0ZSBrZXl1cC52YWxpZGF0ZVwiLFxuXHRcdFx0XHRcdFwiOnRleHQsIFt0eXBlPSdwYXNzd29yZCddLCBbdHlwZT0nZmlsZSddLCBzZWxlY3QsIHRleHRhcmVhLCBbdHlwZT0nbnVtYmVyJ10sIFt0eXBlPSdzZWFyY2gnXSwgXCIgK1xuXHRcdFx0XHRcdFwiW3R5cGU9J3RlbCddLCBbdHlwZT0ndXJsJ10sIFt0eXBlPSdlbWFpbCddLCBbdHlwZT0nZGF0ZXRpbWUnXSwgW3R5cGU9J2RhdGUnXSwgW3R5cGU9J21vbnRoJ10sIFwiICtcblx0XHRcdFx0XHRcIlt0eXBlPSd3ZWVrJ10sIFt0eXBlPSd0aW1lJ10sIFt0eXBlPSdkYXRldGltZS1sb2NhbCddLCBbdHlwZT0ncmFuZ2UnXSwgW3R5cGU9J2NvbG9yJ10sIFwiICtcblx0XHRcdFx0XHRcIlt0eXBlPSdyYWRpbyddLCBbdHlwZT0nY2hlY2tib3gnXSwgW2NvbnRlbnRlZGl0YWJsZV1cIiwgZGVsZWdhdGUgKVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSwgb2xkSUVcblx0XHRcdFx0Ly8gXCJzZWxlY3RcIiBpcyBwcm92aWRlZCBhcyBldmVudC50YXJnZXQgd2hlbiBjbGlja2luZyBhIG9wdGlvblxuXHRcdFx0XHQub24oIFwiY2xpY2sudmFsaWRhdGVcIiwgXCJzZWxlY3QsIG9wdGlvbiwgW3R5cGU9J3JhZGlvJ10sIFt0eXBlPSdjaGVja2JveCddXCIsIGRlbGVnYXRlICk7XG5cblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5pbnZhbGlkSGFuZGxlciApIHtcblx0XHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApLm9uKCBcImludmFsaWQtZm9ybS52YWxpZGF0ZVwiLCB0aGlzLnNldHRpbmdzLmludmFsaWRIYW5kbGVyICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBhcmlhLXJlcXVpcmVkIHRvIGFueSBTdGF0aWMvRGF0YS9DbGFzcyByZXF1aXJlZCBmaWVsZHMgYmVmb3JlIGZpcnN0IHZhbGlkYXRpb25cblx0XHRcdC8vIFNjcmVlbiByZWFkZXJzIHJlcXVpcmUgdGhpcyBhdHRyaWJ1dGUgdG8gYmUgcHJlc2VudCBiZWZvcmUgdGhlIGluaXRpYWwgc3VibWlzc2lvbiBodHRwOi8vd3d3LnczLm9yZy9UUi9XQ0FHLVRFQ0hTL0FSSUEyLmh0bWxcblx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKS5maW5kKCBcIltyZXF1aXJlZF0sIFtkYXRhLXJ1bGUtcmVxdWlyZWRdLCAucmVxdWlyZWRcIiApLmF0dHIoIFwiYXJpYS1yZXF1aXJlZFwiLCBcInRydWVcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvVmFsaWRhdG9yLmZvcm0vXG5cdFx0Zm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmNoZWNrRm9ybSgpO1xuXHRcdFx0JC5leHRlbmQoIHRoaXMuc3VibWl0dGVkLCB0aGlzLmVycm9yTWFwICk7XG5cdFx0XHR0aGlzLmludmFsaWQgPSAkLmV4dGVuZCgge30sIHRoaXMuZXJyb3JNYXAgKTtcblx0XHRcdGlmICggIXRoaXMudmFsaWQoKSApIHtcblx0XHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApLnRyaWdnZXJIYW5kbGVyKCBcImludmFsaWQtZm9ybVwiLCBbIHRoaXMgXSApO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zaG93RXJyb3JzKCk7XG5cdFx0XHRyZXR1cm4gdGhpcy52YWxpZCgpO1xuXHRcdH0sXG5cblx0XHRjaGVja0Zvcm06IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5wcmVwYXJlRm9ybSgpO1xuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBlbGVtZW50cyA9ICggdGhpcy5jdXJyZW50RWxlbWVudHMgPSB0aGlzLmVsZW1lbnRzKCkgKTsgZWxlbWVudHNbIGkgXTsgaSsrICkge1xuXHRcdFx0XHR0aGlzLmNoZWNrKCBlbGVtZW50c1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy52YWxpZCgpO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvVmFsaWRhdG9yLmVsZW1lbnQvXG5cdFx0ZWxlbWVudDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR2YXIgY2xlYW5FbGVtZW50ID0gdGhpcy5jbGVhbiggZWxlbWVudCApLFxuXHRcdFx0XHRjaGVja0VsZW1lbnQgPSB0aGlzLnZhbGlkYXRpb25UYXJnZXRGb3IoIGNsZWFuRWxlbWVudCApLFxuXHRcdFx0XHR2ID0gdGhpcyxcblx0XHRcdFx0cmVzdWx0ID0gdHJ1ZSxcblx0XHRcdFx0cnMsIGdyb3VwO1xuXG5cdFx0XHRpZiAoIGNoZWNrRWxlbWVudCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRkZWxldGUgdGhpcy5pbnZhbGlkWyBjbGVhbkVsZW1lbnQubmFtZSBdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5wcmVwYXJlRWxlbWVudCggY2hlY2tFbGVtZW50ICk7XG5cdFx0XHRcdHRoaXMuY3VycmVudEVsZW1lbnRzID0gJCggY2hlY2tFbGVtZW50ICk7XG5cblx0XHRcdFx0Ly8gSWYgdGhpcyBlbGVtZW50IGlzIGdyb3VwZWQsIHRoZW4gdmFsaWRhdGUgYWxsIGdyb3VwIGVsZW1lbnRzIGFscmVhZHlcblx0XHRcdFx0Ly8gY29udGFpbmluZyBhIHZhbHVlXG5cdFx0XHRcdGdyb3VwID0gdGhpcy5ncm91cHNbIGNoZWNrRWxlbWVudC5uYW1lIF07XG5cdFx0XHRcdGlmICggZ3JvdXAgKSB7XG5cdFx0XHRcdFx0JC5lYWNoKCB0aGlzLmdyb3VwcywgZnVuY3Rpb24oIG5hbWUsIHRlc3Rncm91cCApIHtcblx0XHRcdFx0XHRcdGlmICggdGVzdGdyb3VwID09PSBncm91cCAmJiBuYW1lICE9PSBjaGVja0VsZW1lbnQubmFtZSApIHtcblx0XHRcdFx0XHRcdFx0Y2xlYW5FbGVtZW50ID0gdi52YWxpZGF0aW9uVGFyZ2V0Rm9yKCB2LmNsZWFuKCB2LmZpbmRCeU5hbWUoIG5hbWUgKSApICk7XG5cdFx0XHRcdFx0XHRcdGlmICggY2xlYW5FbGVtZW50ICYmIGNsZWFuRWxlbWVudC5uYW1lIGluIHYuaW52YWxpZCApIHtcblx0XHRcdFx0XHRcdFx0XHR2LmN1cnJlbnRFbGVtZW50cy5wdXNoKCBjbGVhbkVsZW1lbnQgKTtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQgJiYgdi5jaGVjayggY2xlYW5FbGVtZW50ICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRycyA9IHRoaXMuY2hlY2soIGNoZWNrRWxlbWVudCApICE9PSBmYWxzZTtcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0ICYmIHJzO1xuXHRcdFx0XHRpZiAoIHJzICkge1xuXHRcdFx0XHRcdHRoaXMuaW52YWxpZFsgY2hlY2tFbGVtZW50Lm5hbWUgXSA9IGZhbHNlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuaW52YWxpZFsgY2hlY2tFbGVtZW50Lm5hbWUgXSA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoICF0aGlzLm51bWJlck9mSW52YWxpZHMoKSApIHtcblxuXHRcdFx0XHRcdC8vIEhpZGUgZXJyb3IgY29udGFpbmVycyBvbiBsYXN0IGVycm9yXG5cdFx0XHRcdFx0dGhpcy50b0hpZGUgPSB0aGlzLnRvSGlkZS5hZGQoIHRoaXMuY29udGFpbmVycyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9ycygpO1xuXG5cdFx0XHRcdC8vIEFkZCBhcmlhLWludmFsaWQgc3RhdHVzIGZvciBzY3JlZW4gcmVhZGVyc1xuXHRcdFx0XHQkKCBlbGVtZW50ICkuYXR0ciggXCJhcmlhLWludmFsaWRcIiwgIXJzICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3Iuc2hvd0Vycm9ycy9cblx0XHRzaG93RXJyb3JzOiBmdW5jdGlvbiggZXJyb3JzICkge1xuXHRcdFx0aWYgKCBlcnJvcnMgKSB7XG5cdFx0XHRcdHZhciB2YWxpZGF0b3IgPSB0aGlzO1xuXG5cdFx0XHRcdC8vIEFkZCBpdGVtcyB0byBlcnJvciBsaXN0IGFuZCBtYXBcblx0XHRcdFx0JC5leHRlbmQoIHRoaXMuZXJyb3JNYXAsIGVycm9ycyApO1xuXHRcdFx0XHR0aGlzLmVycm9yTGlzdCA9ICQubWFwKCB0aGlzLmVycm9yTWFwLCBmdW5jdGlvbiggbWVzc2FnZSwgbmFtZSApIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZSxcblx0XHRcdFx0XHRcdGVsZW1lbnQ6IHZhbGlkYXRvci5maW5kQnlOYW1lKCBuYW1lIClbIDAgXVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgaXRlbXMgZnJvbSBzdWNjZXNzIGxpc3Rcblx0XHRcdFx0dGhpcy5zdWNjZXNzTGlzdCA9ICQuZ3JlcCggdGhpcy5zdWNjZXNzTGlzdCwgZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuICEoIGVsZW1lbnQubmFtZSBpbiBlcnJvcnMgKTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLnNob3dFcnJvcnMgKSB7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3Muc2hvd0Vycm9ycy5jYWxsKCB0aGlzLCB0aGlzLmVycm9yTWFwLCB0aGlzLmVycm9yTGlzdCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5kZWZhdWx0U2hvd0Vycm9ycygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvVmFsaWRhdG9yLnJlc2V0Rm9ybS9cblx0XHRyZXNldEZvcm06IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAkLmZuLnJlc2V0Rm9ybSApIHtcblx0XHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApLnJlc2V0Rm9ybSgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5pbnZhbGlkID0ge307XG5cdFx0XHR0aGlzLnN1Ym1pdHRlZCA9IHt9O1xuXHRcdFx0dGhpcy5wcmVwYXJlRm9ybSgpO1xuXHRcdFx0dGhpcy5oaWRlRXJyb3JzKCk7XG5cdFx0XHR2YXIgZWxlbWVudHMgPSB0aGlzLmVsZW1lbnRzKClcblx0XHRcdFx0LnJlbW92ZURhdGEoIFwicHJldmlvdXNWYWx1ZVwiIClcblx0XHRcdFx0LnJlbW92ZUF0dHIoIFwiYXJpYS1pbnZhbGlkXCIgKTtcblxuXHRcdFx0dGhpcy5yZXNldEVsZW1lbnRzKCBlbGVtZW50cyApO1xuXHRcdH0sXG5cblx0XHRyZXNldEVsZW1lbnRzOiBmdW5jdGlvbiggZWxlbWVudHMgKSB7XG5cdFx0XHR2YXIgaTtcblxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0ICkge1xuXHRcdFx0XHRmb3IgKCBpID0gMDsgZWxlbWVudHNbIGkgXTsgaSsrICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQuY2FsbCggdGhpcywgZWxlbWVudHNbIGkgXSxcblx0XHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcywgXCJcIiApO1xuXHRcdFx0XHRcdHRoaXMuZmluZEJ5TmFtZSggZWxlbWVudHNbIGkgXS5uYW1lICkucmVtb3ZlQ2xhc3MoIHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50c1xuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzIClcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoIHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRudW1iZXJPZkludmFsaWRzOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm9iamVjdExlbmd0aCggdGhpcy5pbnZhbGlkICk7XG5cdFx0fSxcblxuXHRcdG9iamVjdExlbmd0aDogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRcdC8qIGpzaGludCB1bnVzZWQ6IGZhbHNlICovXG5cdFx0XHR2YXIgY291bnQgPSAwLFxuXHRcdFx0XHRpO1xuXHRcdFx0Zm9yICggaSBpbiBvYmogKSB7XG5cdFx0XHRcdGlmICggb2JqWyBpIF0gKSB7XG5cdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNvdW50O1xuXHRcdH0sXG5cblx0XHRoaWRlRXJyb3JzOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaGlkZVRoZXNlKCB0aGlzLnRvSGlkZSApO1xuXHRcdH0sXG5cblx0XHRoaWRlVGhlc2U6IGZ1bmN0aW9uKCBlcnJvcnMgKSB7XG5cdFx0XHRlcnJvcnMubm90KCB0aGlzLmNvbnRhaW5lcnMgKS50ZXh0KCBcIlwiICk7XG5cdFx0XHR0aGlzLmFkZFdyYXBwZXIoIGVycm9ycyApLmhpZGUoKTtcblx0XHR9LFxuXG5cdFx0dmFsaWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc2l6ZSgpID09PSAwO1xuXHRcdH0sXG5cblx0XHRzaXplOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmVycm9yTGlzdC5sZW5ndGg7XG5cdFx0fSxcblxuXHRcdGZvY3VzSW52YWxpZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3MuZm9jdXNJbnZhbGlkICkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdCQoIHRoaXMuZmluZExhc3RBY3RpdmUoKSB8fCB0aGlzLmVycm9yTGlzdC5sZW5ndGggJiYgdGhpcy5lcnJvckxpc3RbIDAgXS5lbGVtZW50IHx8IFtdIClcblx0XHRcdFx0XHQuZmlsdGVyKCBcIjp2aXNpYmxlXCIgKVxuXHRcdFx0XHRcdC5mb2N1cygpXG5cblx0XHRcdFx0XHQvLyBNYW51YWxseSB0cmlnZ2VyIGZvY3VzaW4gZXZlbnQ7IHdpdGhvdXQgaXQsIGZvY3VzaW4gaGFuZGxlciBpc24ndCBjYWxsZWQsIGZpbmRMYXN0QWN0aXZlIHdvbid0IGhhdmUgYW55dGhpbmcgdG8gZmluZFxuXHRcdFx0XHRcdC50cmlnZ2VyKCBcImZvY3VzaW5cIiApO1xuXHRcdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRcdC8vIElnbm9yZSBJRSB0aHJvd2luZyBlcnJvcnMgd2hlbiBmb2N1c2luZyBoaWRkZW4gZWxlbWVudHNcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRmaW5kTGFzdEFjdGl2ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbGFzdEFjdGl2ZSA9IHRoaXMubGFzdEFjdGl2ZTtcblx0XHRcdHJldHVybiBsYXN0QWN0aXZlICYmICQuZ3JlcCggdGhpcy5lcnJvckxpc3QsIGZ1bmN0aW9uKCBuICkge1xuXHRcdFx0XHRyZXR1cm4gbi5lbGVtZW50Lm5hbWUgPT09IGxhc3RBY3RpdmUubmFtZTtcblx0XHRcdH0gKS5sZW5ndGggPT09IDEgJiYgbGFzdEFjdGl2ZTtcblx0XHR9LFxuXG5cdFx0ZWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHZhbGlkYXRvciA9IHRoaXMsXG5cdFx0XHRcdHJ1bGVzQ2FjaGUgPSB7fTtcblxuXHRcdFx0Ly8gU2VsZWN0IGFsbCB2YWxpZCBpbnB1dHMgaW5zaWRlIHRoZSBmb3JtIChubyBzdWJtaXQgb3IgcmVzZXQgYnV0dG9ucylcblx0XHRcdHJldHVybiAkKCB0aGlzLmN1cnJlbnRGb3JtIClcblx0XHRcdC5maW5kKCBcImlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbY29udGVudGVkaXRhYmxlXVwiIClcblx0XHRcdC5ub3QoIFwiOnN1Ym1pdCwgOnJlc2V0LCA6aW1hZ2UsIDpkaXNhYmxlZFwiIClcblx0XHRcdC5ub3QoIHRoaXMuc2V0dGluZ3MuaWdub3JlIClcblx0XHRcdC5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgbmFtZSA9IHRoaXMubmFtZSB8fCAkKCB0aGlzICkuYXR0ciggXCJuYW1lXCIgKTsgLy8gRm9yIGNvbnRlbnRlZGl0YWJsZVxuXHRcdFx0XHRpZiAoICFuYW1lICYmIHZhbGlkYXRvci5zZXR0aW5ncy5kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSApIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCBcIiVvIGhhcyBubyBuYW1lIGFzc2lnbmVkXCIsIHRoaXMgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNldCBmb3JtIGV4cGFuZG8gb24gY29udGVudGVkaXRhYmxlXG5cdFx0XHRcdGlmICggdGhpcy5oYXNBdHRyaWJ1dGUoIFwiY29udGVudGVkaXRhYmxlXCIgKSApIHtcblx0XHRcdFx0XHR0aGlzLmZvcm0gPSAkKCB0aGlzICkuY2xvc2VzdCggXCJmb3JtXCIgKVsgMCBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2VsZWN0IG9ubHkgdGhlIGZpcnN0IGVsZW1lbnQgZm9yIGVhY2ggbmFtZSwgYW5kIG9ubHkgdGhvc2Ugd2l0aCBydWxlcyBzcGVjaWZpZWRcblx0XHRcdFx0aWYgKCBuYW1lIGluIHJ1bGVzQ2FjaGUgfHwgIXZhbGlkYXRvci5vYmplY3RMZW5ndGgoICQoIHRoaXMgKS5ydWxlcygpICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cnVsZXNDYWNoZVsgbmFtZSBdID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9ICk7XG5cdFx0fSxcblxuXHRcdGNsZWFuOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0XHRyZXR1cm4gJCggc2VsZWN0b3IgKVsgMCBdO1xuXHRcdH0sXG5cblx0XHRlcnJvcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGVycm9yQ2xhc3MgPSB0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3Muc3BsaXQoIFwiIFwiICkuam9pbiggXCIuXCIgKTtcblx0XHRcdHJldHVybiAkKCB0aGlzLnNldHRpbmdzLmVycm9yRWxlbWVudCArIFwiLlwiICsgZXJyb3JDbGFzcywgdGhpcy5lcnJvckNvbnRleHQgKTtcblx0XHR9LFxuXG5cdFx0cmVzZXRJbnRlcm5hbHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5zdWNjZXNzTGlzdCA9IFtdO1xuXHRcdFx0dGhpcy5lcnJvckxpc3QgPSBbXTtcblx0XHRcdHRoaXMuZXJyb3JNYXAgPSB7fTtcblx0XHRcdHRoaXMudG9TaG93ID0gJCggW10gKTtcblx0XHRcdHRoaXMudG9IaWRlID0gJCggW10gKTtcblx0XHR9LFxuXG5cdFx0cmVzZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5yZXNldEludGVybmFscygpO1xuXHRcdFx0dGhpcy5jdXJyZW50RWxlbWVudHMgPSAkKCBbXSApO1xuXHRcdH0sXG5cblx0XHRwcmVwYXJlRm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0XHR0aGlzLnRvSGlkZSA9IHRoaXMuZXJyb3JzKCkuYWRkKCB0aGlzLmNvbnRhaW5lcnMgKTtcblx0XHR9LFxuXG5cdFx0cHJlcGFyZUVsZW1lbnQ6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0dGhpcy5yZXNldCgpO1xuXHRcdFx0dGhpcy50b0hpZGUgPSB0aGlzLmVycm9yc0ZvciggZWxlbWVudCApO1xuXHRcdH0sXG5cblx0XHRlbGVtZW50VmFsdWU6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0dmFyICRlbGVtZW50ID0gJCggZWxlbWVudCApLFxuXHRcdFx0XHR0eXBlID0gZWxlbWVudC50eXBlLFxuXHRcdFx0XHR2YWwsIGlkeDtcblxuXHRcdFx0aWYgKCB0eXBlID09PSBcInJhZGlvXCIgfHwgdHlwZSA9PT0gXCJjaGVja2JveFwiICkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5maW5kQnlOYW1lKCBlbGVtZW50Lm5hbWUgKS5maWx0ZXIoIFwiOmNoZWNrZWRcIiApLnZhbCgpO1xuXHRcdFx0fSBlbHNlIGlmICggdHlwZSA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgZWxlbWVudC52YWxpZGl0eSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdFx0cmV0dXJuIGVsZW1lbnQudmFsaWRpdHkuYmFkSW5wdXQgPyBcIk5hTlwiIDogJGVsZW1lbnQudmFsKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZWxlbWVudC5oYXNBdHRyaWJ1dGUoIFwiY29udGVudGVkaXRhYmxlXCIgKSApIHtcblx0XHRcdFx0dmFsID0gJGVsZW1lbnQudGV4dCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFsID0gJGVsZW1lbnQudmFsKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggdHlwZSA9PT0gXCJmaWxlXCIgKSB7XG5cblx0XHRcdFx0Ly8gTW9kZXJuIGJyb3dzZXIgKGNocm9tZSAmIHNhZmFyaSlcblx0XHRcdFx0aWYgKCB2YWwuc3Vic3RyKCAwLCAxMiApID09PSBcIkM6XFxcXGZha2VwYXRoXFxcXFwiICkge1xuXHRcdFx0XHRcdHJldHVybiB2YWwuc3Vic3RyKCAxMiApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTGVnYWN5IGJyb3dzZXJzXG5cdFx0XHRcdC8vIFVuaXgtYmFzZWQgcGF0aFxuXHRcdFx0XHRpZHggPSB2YWwubGFzdEluZGV4T2YoIFwiL1wiICk7XG5cdFx0XHRcdGlmICggaWR4ID49IDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbC5zdWJzdHIoIGlkeCArIDEgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFdpbmRvd3MtYmFzZWQgcGF0aFxuXHRcdFx0XHRpZHggPSB2YWwubGFzdEluZGV4T2YoIFwiXFxcXFwiICk7XG5cdFx0XHRcdGlmICggaWR4ID49IDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbC5zdWJzdHIoIGlkeCArIDEgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEp1c3QgdGhlIGZpbGUgbmFtZVxuXHRcdFx0XHRyZXR1cm4gdmFsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdHJldHVybiB2YWwucmVwbGFjZSggL1xcci9nLCBcIlwiICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsO1xuXHRcdH0sXG5cblx0XHRjaGVjazogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRlbGVtZW50ID0gdGhpcy52YWxpZGF0aW9uVGFyZ2V0Rm9yKCB0aGlzLmNsZWFuKCBlbGVtZW50ICkgKTtcblxuXHRcdFx0dmFyIHJ1bGVzID0gJCggZWxlbWVudCApLnJ1bGVzKCksXG5cdFx0XHRcdHJ1bGVzQ291bnQgPSAkLm1hcCggcnVsZXMsIGZ1bmN0aW9uKCBuLCBpICkge1xuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHR9ICkubGVuZ3RoLFxuXHRcdFx0XHRkZXBlbmRlbmN5TWlzbWF0Y2ggPSBmYWxzZSxcblx0XHRcdFx0dmFsID0gdGhpcy5lbGVtZW50VmFsdWUoIGVsZW1lbnQgKSxcblx0XHRcdFx0cmVzdWx0LCBtZXRob2QsIHJ1bGU7XG5cblx0XHRcdC8vIElmIGEgbm9ybWFsaXplciBpcyBkZWZpbmVkIGZvciB0aGlzIGVsZW1lbnQsIHRoZW5cblx0XHRcdC8vIGNhbGwgaXQgdG8gcmV0cmVpdmUgdGhlIGNoYW5nZWQgdmFsdWUgaW5zdGVhZFxuXHRcdFx0Ly8gb2YgdXNpbmcgdGhlIHJlYWwgb25lLlxuXHRcdFx0Ly8gTm90ZSB0aGF0IGB0aGlzYCBpbiB0aGUgbm9ybWFsaXplciBpcyBgZWxlbWVudGAuXG5cdFx0XHRpZiAoIHR5cGVvZiBydWxlcy5ub3JtYWxpemVyID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cdFx0XHRcdHZhbCA9IHJ1bGVzLm5vcm1hbGl6ZXIuY2FsbCggZWxlbWVudCwgdmFsICk7XG5cblx0XHRcdFx0aWYgKCB0eXBlb2YgdmFsICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoIFwiVGhlIG5vcm1hbGl6ZXIgc2hvdWxkIHJldHVybiBhIHN0cmluZyB2YWx1ZS5cIiApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRGVsZXRlIHRoZSBub3JtYWxpemVyIGZyb20gcnVsZXMgdG8gYXZvaWQgdHJlYXRpbmdcblx0XHRcdFx0Ly8gaXQgYXMgYSBwcmUtZGVmaW5lZCBtZXRob2QuXG5cdFx0XHRcdGRlbGV0ZSBydWxlcy5ub3JtYWxpemVyO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKCBtZXRob2QgaW4gcnVsZXMgKSB7XG5cdFx0XHRcdHJ1bGUgPSB7IG1ldGhvZDogbWV0aG9kLCBwYXJhbWV0ZXJzOiBydWxlc1sgbWV0aG9kIF0gfTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXN1bHQgPSAkLnZhbGlkYXRvci5tZXRob2RzWyBtZXRob2QgXS5jYWxsKCB0aGlzLCB2YWwsIGVsZW1lbnQsIHJ1bGUucGFyYW1ldGVycyApO1xuXG5cdFx0XHRcdFx0Ly8gSWYgYSBtZXRob2QgaW5kaWNhdGVzIHRoYXQgdGhlIGZpZWxkIGlzIG9wdGlvbmFsIGFuZCB0aGVyZWZvcmUgdmFsaWQsXG5cdFx0XHRcdFx0Ly8gZG9uJ3QgbWFyayBpdCBhcyB2YWxpZCB3aGVuIHRoZXJlIGFyZSBubyBvdGhlciBydWxlc1xuXHRcdFx0XHRcdGlmICggcmVzdWx0ID09PSBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIiAmJiBydWxlc0NvdW50ID09PSAxICkge1xuXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeU1pc21hdGNoID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZXBlbmRlbmN5TWlzbWF0Y2ggPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICggcmVzdWx0ID09PSBcInBlbmRpbmdcIiApIHtcblx0XHRcdFx0XHRcdHRoaXMudG9IaWRlID0gdGhpcy50b0hpZGUubm90KCB0aGlzLmVycm9yc0ZvciggZWxlbWVudCApICk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCAhcmVzdWx0ICkge1xuXHRcdFx0XHRcdFx0dGhpcy5mb3JtYXRBbmRBZGQoIGVsZW1lbnQsIHJ1bGUgKTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSApIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCBcIkV4Y2VwdGlvbiBvY2N1cnJlZCB3aGVuIGNoZWNraW5nIGVsZW1lbnQgXCIgKyBlbGVtZW50LmlkICsgXCIsIGNoZWNrIHRoZSAnXCIgKyBydWxlLm1ldGhvZCArIFwiJyBtZXRob2QuXCIsIGUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBlIGluc3RhbmNlb2YgVHlwZUVycm9yICkge1xuXHRcdFx0XHRcdFx0ZS5tZXNzYWdlICs9IFwiLiAgRXhjZXB0aW9uIG9jY3VycmVkIHdoZW4gY2hlY2tpbmcgZWxlbWVudCBcIiArIGVsZW1lbnQuaWQgKyBcIiwgY2hlY2sgdGhlICdcIiArIHJ1bGUubWV0aG9kICsgXCInIG1ldGhvZC5cIjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGRlcGVuZGVuY3lNaXNtYXRjaCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLm9iamVjdExlbmd0aCggcnVsZXMgKSApIHtcblx0XHRcdFx0dGhpcy5zdWNjZXNzTGlzdC5wdXNoKCBlbGVtZW50ICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJuIHRoZSBjdXN0b20gbWVzc2FnZSBmb3IgdGhlIGdpdmVuIGVsZW1lbnQgYW5kIHZhbGlkYXRpb24gbWV0aG9kXG5cdFx0Ly8gc3BlY2lmaWVkIGluIHRoZSBlbGVtZW50J3MgSFRNTDUgZGF0YSBhdHRyaWJ1dGVcblx0XHQvLyByZXR1cm4gdGhlIGdlbmVyaWMgbWVzc2FnZSBpZiBwcmVzZW50IGFuZCBubyBtZXRob2Qgc3BlY2lmaWMgbWVzc2FnZSBpcyBwcmVzZW50XG5cdFx0Y3VzdG9tRGF0YU1lc3NhZ2U6IGZ1bmN0aW9uKCBlbGVtZW50LCBtZXRob2QgKSB7XG5cdFx0XHRyZXR1cm4gJCggZWxlbWVudCApLmRhdGEoIFwibXNnXCIgKyBtZXRob2QuY2hhckF0KCAwICkudG9VcHBlckNhc2UoKSArXG5cdFx0XHRcdG1ldGhvZC5zdWJzdHJpbmcoIDEgKS50b0xvd2VyQ2FzZSgpICkgfHwgJCggZWxlbWVudCApLmRhdGEoIFwibXNnXCIgKTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJuIHRoZSBjdXN0b20gbWVzc2FnZSBmb3IgdGhlIGdpdmVuIGVsZW1lbnQgbmFtZSBhbmQgdmFsaWRhdGlvbiBtZXRob2Rcblx0XHRjdXN0b21NZXNzYWdlOiBmdW5jdGlvbiggbmFtZSwgbWV0aG9kICkge1xuXHRcdFx0dmFyIG0gPSB0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBuYW1lIF07XG5cdFx0XHRyZXR1cm4gbSAmJiAoIG0uY29uc3RydWN0b3IgPT09IFN0cmluZyA/IG0gOiBtWyBtZXRob2QgXSApO1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm4gdGhlIGZpcnN0IGRlZmluZWQgYXJndW1lbnQsIGFsbG93aW5nIGVtcHR5IHN0cmluZ3Ncblx0XHRmaW5kRGVmaW5lZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGlmICggYXJndW1lbnRzWyBpIF0gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzWyBpIF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fSxcblxuXHRcdGRlZmF1bHRNZXNzYWdlOiBmdW5jdGlvbiggZWxlbWVudCwgcnVsZSApIHtcblx0XHRcdHZhciBtZXNzYWdlID0gdGhpcy5maW5kRGVmaW5lZChcblx0XHRcdFx0XHR0aGlzLmN1c3RvbU1lc3NhZ2UoIGVsZW1lbnQubmFtZSwgcnVsZS5tZXRob2QgKSxcblx0XHRcdFx0XHR0aGlzLmN1c3RvbURhdGFNZXNzYWdlKCBlbGVtZW50LCBydWxlLm1ldGhvZCApLFxuXG5cdFx0XHRcdFx0Ly8gJ3RpdGxlJyBpcyBuZXZlciB1bmRlZmluZWQsIHNvIGhhbmRsZSBlbXB0eSBzdHJpbmcgYXMgdW5kZWZpbmVkXG5cdFx0XHRcdFx0IXRoaXMuc2V0dGluZ3MuaWdub3JlVGl0bGUgJiYgZWxlbWVudC50aXRsZSB8fCB1bmRlZmluZWQsXG5cdFx0XHRcdFx0JC52YWxpZGF0b3IubWVzc2FnZXNbIHJ1bGUubWV0aG9kIF0sXG5cdFx0XHRcdFx0XCI8c3Ryb25nPldhcm5pbmc6IE5vIG1lc3NhZ2UgZGVmaW5lZCBmb3IgXCIgKyBlbGVtZW50Lm5hbWUgKyBcIjwvc3Ryb25nPlwiXG5cdFx0XHRcdCksXG5cdFx0XHRcdHRoZXJlZ2V4ID0gL1xcJD9cXHsoXFxkKylcXH0vZztcblx0XHRcdGlmICggdHlwZW9mIG1lc3NhZ2UgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0XHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2UuY2FsbCggdGhpcywgcnVsZS5wYXJhbWV0ZXJzLCBlbGVtZW50ICk7XG5cdFx0XHR9IGVsc2UgaWYgKCB0aGVyZWdleC50ZXN0KCBtZXNzYWdlICkgKSB7XG5cdFx0XHRcdG1lc3NhZ2UgPSAkLnZhbGlkYXRvci5mb3JtYXQoIG1lc3NhZ2UucmVwbGFjZSggdGhlcmVnZXgsIFwieyQxfVwiICksIHJ1bGUucGFyYW1ldGVycyApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWVzc2FnZTtcblx0XHR9LFxuXG5cdFx0Zm9ybWF0QW5kQWRkOiBmdW5jdGlvbiggZWxlbWVudCwgcnVsZSApIHtcblx0XHRcdHZhciBtZXNzYWdlID0gdGhpcy5kZWZhdWx0TWVzc2FnZSggZWxlbWVudCwgcnVsZSApO1xuXG5cdFx0XHR0aGlzLmVycm9yTGlzdC5wdXNoKCB7XG5cdFx0XHRcdG1lc3NhZ2U6IG1lc3NhZ2UsXG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdG1ldGhvZDogcnVsZS5tZXRob2Rcblx0XHRcdH0gKTtcblxuXHRcdFx0dGhpcy5lcnJvck1hcFsgZWxlbWVudC5uYW1lIF0gPSBtZXNzYWdlO1xuXHRcdFx0dGhpcy5zdWJtaXR0ZWRbIGVsZW1lbnQubmFtZSBdID0gbWVzc2FnZTtcblx0XHR9LFxuXG5cdFx0YWRkV3JhcHBlcjogZnVuY3Rpb24oIHRvVG9nZ2xlICkge1xuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLndyYXBwZXIgKSB7XG5cdFx0XHRcdHRvVG9nZ2xlID0gdG9Ub2dnbGUuYWRkKCB0b1RvZ2dsZS5wYXJlbnQoIHRoaXMuc2V0dGluZ3Mud3JhcHBlciApICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdG9Ub2dnbGU7XG5cdFx0fSxcblxuXHRcdGRlZmF1bHRTaG93RXJyb3JzOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpLCBlbGVtZW50cywgZXJyb3I7XG5cdFx0XHRmb3IgKCBpID0gMDsgdGhpcy5lcnJvckxpc3RbIGkgXTsgaSsrICkge1xuXHRcdFx0XHRlcnJvciA9IHRoaXMuZXJyb3JMaXN0WyBpIF07XG5cdFx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5oaWdobGlnaHQgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5oaWdobGlnaHQuY2FsbCggdGhpcywgZXJyb3IuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLCB0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnNob3dMYWJlbCggZXJyb3IuZWxlbWVudCwgZXJyb3IubWVzc2FnZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLmVycm9yTGlzdC5sZW5ndGggKSB7XG5cdFx0XHRcdHRoaXMudG9TaG93ID0gdGhpcy50b1Nob3cuYWRkKCB0aGlzLmNvbnRhaW5lcnMgKTtcblx0XHRcdH1cblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5zdWNjZXNzICkge1xuXHRcdFx0XHRmb3IgKCBpID0gMDsgdGhpcy5zdWNjZXNzTGlzdFsgaSBdOyBpKysgKSB7XG5cdFx0XHRcdFx0dGhpcy5zaG93TGFiZWwoIHRoaXMuc3VjY2Vzc0xpc3RbIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwLCBlbGVtZW50cyA9IHRoaXMudmFsaWRFbGVtZW50cygpOyBlbGVtZW50c1sgaSBdOyBpKysgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodC5jYWxsKCB0aGlzLCBlbGVtZW50c1sgaSBdLCB0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MsIHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnRvSGlkZSA9IHRoaXMudG9IaWRlLm5vdCggdGhpcy50b1Nob3cgKTtcblx0XHRcdHRoaXMuaGlkZUVycm9ycygpO1xuXHRcdFx0dGhpcy5hZGRXcmFwcGVyKCB0aGlzLnRvU2hvdyApLnNob3coKTtcblx0XHR9LFxuXG5cdFx0dmFsaWRFbGVtZW50czogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jdXJyZW50RWxlbWVudHMubm90KCB0aGlzLmludmFsaWRFbGVtZW50cygpICk7XG5cdFx0fSxcblxuXHRcdGludmFsaWRFbGVtZW50czogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gJCggdGhpcy5lcnJvckxpc3QgKS5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50O1xuXHRcdFx0fSApO1xuXHRcdH0sXG5cblx0XHRzaG93TGFiZWw6IGZ1bmN0aW9uKCBlbGVtZW50LCBtZXNzYWdlICkge1xuXHRcdFx0dmFyIHBsYWNlLCBncm91cCwgZXJyb3JJRCwgdixcblx0XHRcdFx0ZXJyb3IgPSB0aGlzLmVycm9yc0ZvciggZWxlbWVudCApLFxuXHRcdFx0XHRlbGVtZW50SUQgPSB0aGlzLmlkT3JOYW1lKCBlbGVtZW50ICksXG5cdFx0XHRcdGRlc2NyaWJlZEJ5ID0gJCggZWxlbWVudCApLmF0dHIoIFwiYXJpYS1kZXNjcmliZWRieVwiICk7XG5cblx0XHRcdGlmICggZXJyb3IubGVuZ3RoICkge1xuXG5cdFx0XHRcdC8vIFJlZnJlc2ggZXJyb3Ivc3VjY2VzcyBjbGFzc1xuXHRcdFx0XHRlcnJvci5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICkuYWRkQ2xhc3MoIHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyApO1xuXG5cdFx0XHRcdC8vIFJlcGxhY2UgbWVzc2FnZSBvbiBleGlzdGluZyBsYWJlbFxuXHRcdFx0XHRlcnJvci5odG1sKCBtZXNzYWdlICk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIENyZWF0ZSBlcnJvciBlbGVtZW50XG5cdFx0XHRcdGVycm9yID0gJCggXCI8XCIgKyB0aGlzLnNldHRpbmdzLmVycm9yRWxlbWVudCArIFwiPlwiIClcblx0XHRcdFx0XHQuYXR0ciggXCJpZFwiLCBlbGVtZW50SUQgKyBcIi1lcnJvclwiIClcblx0XHRcdFx0XHQuYWRkQ2xhc3MoIHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyApXG5cdFx0XHRcdFx0Lmh0bWwoIG1lc3NhZ2UgfHwgXCJcIiApO1xuXG5cdFx0XHRcdC8vIE1haW50YWluIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCB0byBiZSBwbGFjZWQgaW50byB0aGUgRE9NXG5cdFx0XHRcdHBsYWNlID0gZXJyb3I7XG5cdFx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy53cmFwcGVyICkge1xuXG5cdFx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoZSBlbGVtZW50IGlzIHZpc2libGUsIGV2ZW4gaW4gSUVcblx0XHRcdFx0XHQvLyBhY3R1YWxseSBzaG93aW5nIHRoZSB3cmFwcGVkIGVsZW1lbnQgaXMgaGFuZGxlZCBlbHNld2hlcmVcblx0XHRcdFx0XHRwbGFjZSA9IGVycm9yLmhpZGUoKS5zaG93KCkud3JhcCggXCI8XCIgKyB0aGlzLnNldHRpbmdzLndyYXBwZXIgKyBcIi8+XCIgKS5wYXJlbnQoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIHRoaXMubGFiZWxDb250YWluZXIubGVuZ3RoICkge1xuXHRcdFx0XHRcdHRoaXMubGFiZWxDb250YWluZXIuYXBwZW5kKCBwbGFjZSApO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCB0aGlzLnNldHRpbmdzLmVycm9yUGxhY2VtZW50ICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuZXJyb3JQbGFjZW1lbnQoIHBsYWNlLCAkKCBlbGVtZW50ICkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwbGFjZS5pbnNlcnRBZnRlciggZWxlbWVudCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTGluayBlcnJvciBiYWNrIHRvIHRoZSBlbGVtZW50XG5cdFx0XHRcdGlmICggZXJyb3IuaXMoIFwibGFiZWxcIiApICkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIGVycm9yIGlzIGEgbGFiZWwsIHRoZW4gYXNzb2NpYXRlIHVzaW5nICdmb3InXG5cdFx0XHRcdFx0ZXJyb3IuYXR0ciggXCJmb3JcIiwgZWxlbWVudElEICk7XG5cblx0XHRcdFx0XHQvLyBJZiB0aGUgZWxlbWVudCBpcyBub3QgYSBjaGlsZCBvZiBhbiBhc3NvY2lhdGVkIGxhYmVsLCB0aGVuIGl0J3MgbmVjZXNzYXJ5XG5cdFx0XHRcdFx0Ly8gdG8gZXhwbGljaXRseSBhcHBseSBhcmlhLWRlc2NyaWJlZGJ5XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGVycm9yLnBhcmVudHMoIFwibGFiZWxbZm9yPSdcIiArIHRoaXMuZXNjYXBlQ3NzTWV0YSggZWxlbWVudElEICkgKyBcIiddXCIgKS5sZW5ndGggPT09IDAgKSB7XG5cdFx0XHRcdFx0ZXJyb3JJRCA9IGVycm9yLmF0dHIoIFwiaWRcIiApO1xuXG5cdFx0XHRcdFx0Ly8gUmVzcGVjdCBleGlzdGluZyBub24tZXJyb3IgYXJpYS1kZXNjcmliZWRieVxuXHRcdFx0XHRcdGlmICggIWRlc2NyaWJlZEJ5ICkge1xuXHRcdFx0XHRcdFx0ZGVzY3JpYmVkQnkgPSBlcnJvcklEO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoICFkZXNjcmliZWRCeS5tYXRjaCggbmV3IFJlZ0V4cCggXCJcXFxcYlwiICsgdGhpcy5lc2NhcGVDc3NNZXRhKCBlcnJvcklEICkgKyBcIlxcXFxiXCIgKSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBBZGQgdG8gZW5kIG9mIGxpc3QgaWYgbm90IGFscmVhZHkgcHJlc2VudFxuXHRcdFx0XHRcdFx0ZGVzY3JpYmVkQnkgKz0gXCIgXCIgKyBlcnJvcklEO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkKCBlbGVtZW50ICkuYXR0ciggXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIGRlc2NyaWJlZEJ5ICk7XG5cblx0XHRcdFx0XHQvLyBJZiB0aGlzIGVsZW1lbnQgaXMgZ3JvdXBlZCwgdGhlbiBhc3NpZ24gdG8gYWxsIGVsZW1lbnRzIGluIHRoZSBzYW1lIGdyb3VwXG5cdFx0XHRcdFx0Z3JvdXAgPSB0aGlzLmdyb3Vwc1sgZWxlbWVudC5uYW1lIF07XG5cdFx0XHRcdFx0aWYgKCBncm91cCApIHtcblx0XHRcdFx0XHRcdHYgPSB0aGlzO1xuXHRcdFx0XHRcdFx0JC5lYWNoKCB2Lmdyb3VwcywgZnVuY3Rpb24oIG5hbWUsIHRlc3Rncm91cCApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCB0ZXN0Z3JvdXAgPT09IGdyb3VwICkge1xuXHRcdFx0XHRcdFx0XHRcdCQoIFwiW25hbWU9J1wiICsgdi5lc2NhcGVDc3NNZXRhKCBuYW1lICkgKyBcIiddXCIsIHYuY3VycmVudEZvcm0gKVxuXHRcdFx0XHRcdFx0XHRcdFx0LmF0dHIoIFwiYXJpYS1kZXNjcmliZWRieVwiLCBlcnJvci5hdHRyKCBcImlkXCIgKSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoICFtZXNzYWdlICYmIHRoaXMuc2V0dGluZ3Muc3VjY2VzcyApIHtcblx0XHRcdFx0ZXJyb3IudGV4dCggXCJcIiApO1xuXHRcdFx0XHRpZiAoIHR5cGVvZiB0aGlzLnNldHRpbmdzLnN1Y2Nlc3MgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0ZXJyb3IuYWRkQ2xhc3MoIHRoaXMuc2V0dGluZ3Muc3VjY2VzcyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3Muc3VjY2VzcyggZXJyb3IsIGVsZW1lbnQgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy50b1Nob3cgPSB0aGlzLnRvU2hvdy5hZGQoIGVycm9yICk7XG5cdFx0fSxcblxuXHRcdGVycm9yc0ZvcjogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR2YXIgbmFtZSA9IHRoaXMuZXNjYXBlQ3NzTWV0YSggdGhpcy5pZE9yTmFtZSggZWxlbWVudCApICksXG5cdFx0XHRcdGRlc2NyaWJlciA9ICQoIGVsZW1lbnQgKS5hdHRyKCBcImFyaWEtZGVzY3JpYmVkYnlcIiApLFxuXHRcdFx0XHRzZWxlY3RvciA9IFwibGFiZWxbZm9yPSdcIiArIG5hbWUgKyBcIiddLCBsYWJlbFtmb3I9J1wiICsgbmFtZSArIFwiJ10gKlwiO1xuXG5cdFx0XHQvLyAnYXJpYS1kZXNjcmliZWRieScgc2hvdWxkIGRpcmVjdGx5IHJlZmVyZW5jZSB0aGUgZXJyb3IgZWxlbWVudFxuXHRcdFx0aWYgKCBkZXNjcmliZXIgKSB7XG5cdFx0XHRcdHNlbGVjdG9yID0gc2VsZWN0b3IgKyBcIiwgI1wiICsgdGhpcy5lc2NhcGVDc3NNZXRhKCBkZXNjcmliZXIgKVxuXHRcdFx0XHRcdC5yZXBsYWNlKCAvXFxzKy9nLCBcIiwgI1wiICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0XHRcdC5lcnJvcnMoKVxuXHRcdFx0XHQuZmlsdGVyKCBzZWxlY3RvciApO1xuXHRcdH0sXG5cblx0XHQvLyBTZWUgaHR0cHM6Ly9hcGkuanF1ZXJ5LmNvbS9jYXRlZ29yeS9zZWxlY3RvcnMvLCBmb3IgQ1NTXG5cdFx0Ly8gbWV0YS1jaGFyYWN0ZXJzIHRoYXQgc2hvdWxkIGJlIGVzY2FwZWQgaW4gb3JkZXIgdG8gYmUgdXNlZCB3aXRoIEpRdWVyeVxuXHRcdC8vIGFzIGEgbGl0ZXJhbCBwYXJ0IG9mIGEgbmFtZS9pZCBvciBhbnkgc2VsZWN0b3IuXG5cdFx0ZXNjYXBlQ3NzTWV0YTogZnVuY3Rpb24oIHN0cmluZyApIHtcblx0XHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSggLyhbXFxcXCFcIiMkJSYnKCkqKywuLzo7PD0+P0BcXFtcXF1eYHt8fX5dKS9nLCBcIlxcXFwkMVwiICk7XG5cdFx0fSxcblxuXHRcdGlkT3JOYW1lOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdHJldHVybiB0aGlzLmdyb3Vwc1sgZWxlbWVudC5uYW1lIF0gfHwgKCB0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApID8gZWxlbWVudC5uYW1lIDogZWxlbWVudC5pZCB8fCBlbGVtZW50Lm5hbWUgKTtcblx0XHR9LFxuXG5cdFx0dmFsaWRhdGlvblRhcmdldEZvcjogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cblx0XHRcdC8vIElmIHJhZGlvL2NoZWNrYm94LCB2YWxpZGF0ZSBmaXJzdCBlbGVtZW50IGluIGdyb3VwIGluc3RlYWRcblx0XHRcdGlmICggdGhpcy5jaGVja2FibGUoIGVsZW1lbnQgKSApIHtcblx0XHRcdFx0ZWxlbWVudCA9IHRoaXMuZmluZEJ5TmFtZSggZWxlbWVudC5uYW1lICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFsd2F5cyBhcHBseSBpZ25vcmUgZmlsdGVyXG5cdFx0XHRyZXR1cm4gJCggZWxlbWVudCApLm5vdCggdGhpcy5zZXR0aW5ncy5pZ25vcmUgKVsgMCBdO1xuXHRcdH0sXG5cblx0XHRjaGVja2FibGU6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuICggL3JhZGlvfGNoZWNrYm94L2kgKS50ZXN0KCBlbGVtZW50LnR5cGUgKTtcblx0XHR9LFxuXG5cdFx0ZmluZEJ5TmFtZTogZnVuY3Rpb24oIG5hbWUgKSB7XG5cdFx0XHRyZXR1cm4gJCggdGhpcy5jdXJyZW50Rm9ybSApLmZpbmQoIFwiW25hbWU9J1wiICsgdGhpcy5lc2NhcGVDc3NNZXRhKCBuYW1lICkgKyBcIiddXCIgKTtcblx0XHR9LFxuXG5cdFx0Z2V0TGVuZ3RoOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cdFx0XHRzd2l0Y2ggKCBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKSB7XG5cdFx0XHRjYXNlIFwic2VsZWN0XCI6XG5cdFx0XHRcdHJldHVybiAkKCBcIm9wdGlvbjpzZWxlY3RlZFwiLCBlbGVtZW50ICkubGVuZ3RoO1xuXHRcdFx0Y2FzZSBcImlucHV0XCI6XG5cdFx0XHRcdGlmICggdGhpcy5jaGVja2FibGUoIGVsZW1lbnQgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5maW5kQnlOYW1lKCBlbGVtZW50Lm5hbWUgKS5maWx0ZXIoIFwiOmNoZWNrZWRcIiApLmxlbmd0aDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHZhbHVlLmxlbmd0aDtcblx0XHR9LFxuXG5cdFx0ZGVwZW5kOiBmdW5jdGlvbiggcGFyYW0sIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kZXBlbmRUeXBlc1sgdHlwZW9mIHBhcmFtIF0gPyB0aGlzLmRlcGVuZFR5cGVzWyB0eXBlb2YgcGFyYW0gXSggcGFyYW0sIGVsZW1lbnQgKSA6IHRydWU7XG5cdFx0fSxcblxuXHRcdGRlcGVuZFR5cGVzOiB7XG5cdFx0XHRcImJvb2xlYW5cIjogZnVuY3Rpb24oIHBhcmFtICkge1xuXHRcdFx0XHRyZXR1cm4gcGFyYW07XG5cdFx0XHR9LFxuXHRcdFx0XCJzdHJpbmdcIjogZnVuY3Rpb24oIHBhcmFtLCBlbGVtZW50ICkge1xuXHRcdFx0XHRyZXR1cm4gISEkKCBwYXJhbSwgZWxlbWVudC5mb3JtICkubGVuZ3RoO1xuXHRcdFx0fSxcblx0XHRcdFwiZnVuY3Rpb25cIjogZnVuY3Rpb24oIHBhcmFtLCBlbGVtZW50ICkge1xuXHRcdFx0XHRyZXR1cm4gcGFyYW0oIGVsZW1lbnQgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0b3B0aW9uYWw6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0dmFyIHZhbCA9IHRoaXMuZWxlbWVudFZhbHVlKCBlbGVtZW50ICk7XG5cdFx0XHRyZXR1cm4gISQudmFsaWRhdG9yLm1ldGhvZHMucmVxdWlyZWQuY2FsbCggdGhpcywgdmFsLCBlbGVtZW50ICkgJiYgXCJkZXBlbmRlbmN5LW1pc21hdGNoXCI7XG5cdFx0fSxcblxuXHRcdHN0YXJ0UmVxdWVzdDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRpZiAoICF0aGlzLnBlbmRpbmdbIGVsZW1lbnQubmFtZSBdICkge1xuXHRcdFx0XHR0aGlzLnBlbmRpbmdSZXF1ZXN0Kys7XG5cdFx0XHRcdCQoIGVsZW1lbnQgKS5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5wZW5kaW5nQ2xhc3MgKTtcblx0XHRcdFx0dGhpcy5wZW5kaW5nWyBlbGVtZW50Lm5hbWUgXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHN0b3BSZXF1ZXN0OiBmdW5jdGlvbiggZWxlbWVudCwgdmFsaWQgKSB7XG5cdFx0XHR0aGlzLnBlbmRpbmdSZXF1ZXN0LS07XG5cblx0XHRcdC8vIFNvbWV0aW1lcyBzeW5jaHJvbml6YXRpb24gZmFpbHMsIG1ha2Ugc3VyZSBwZW5kaW5nUmVxdWVzdCBpcyBuZXZlciA8IDBcblx0XHRcdGlmICggdGhpcy5wZW5kaW5nUmVxdWVzdCA8IDAgKSB7XG5cdFx0XHRcdHRoaXMucGVuZGluZ1JlcXVlc3QgPSAwO1xuXHRcdFx0fVxuXHRcdFx0ZGVsZXRlIHRoaXMucGVuZGluZ1sgZWxlbWVudC5uYW1lIF07XG5cdFx0XHQkKCBlbGVtZW50ICkucmVtb3ZlQ2xhc3MoIHRoaXMuc2V0dGluZ3MucGVuZGluZ0NsYXNzICk7XG5cdFx0XHRpZiAoIHZhbGlkICYmIHRoaXMucGVuZGluZ1JlcXVlc3QgPT09IDAgJiYgdGhpcy5mb3JtU3VibWl0dGVkICYmIHRoaXMuZm9ybSgpICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkuc3VibWl0KCk7XG5cdFx0XHRcdHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICggIXZhbGlkICYmIHRoaXMucGVuZGluZ1JlcXVlc3QgPT09IDAgJiYgdGhpcy5mb3JtU3VibWl0dGVkICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkudHJpZ2dlckhhbmRsZXIoIFwiaW52YWxpZC1mb3JtXCIsIFsgdGhpcyBdICk7XG5cdFx0XHRcdHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRwcmV2aW91c1ZhbHVlOiBmdW5jdGlvbiggZWxlbWVudCwgbWV0aG9kICkge1xuXHRcdFx0cmV0dXJuICQuZGF0YSggZWxlbWVudCwgXCJwcmV2aW91c1ZhbHVlXCIgKSB8fCAkLmRhdGEoIGVsZW1lbnQsIFwicHJldmlvdXNWYWx1ZVwiLCB7XG5cdFx0XHRcdG9sZDogbnVsbCxcblx0XHRcdFx0dmFsaWQ6IHRydWUsXG5cdFx0XHRcdG1lc3NhZ2U6IHRoaXMuZGVmYXVsdE1lc3NhZ2UoIGVsZW1lbnQsIHsgbWV0aG9kOiBtZXRob2QgfSApXG5cdFx0XHR9ICk7XG5cdFx0fSxcblxuXHRcdC8vIENsZWFucyB1cCBhbGwgZm9ybXMgYW5kIGVsZW1lbnRzLCByZW1vdmVzIHZhbGlkYXRvci1zcGVjaWZpYyBldmVudHNcblx0XHRkZXN0cm95OiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMucmVzZXRGb3JtKCk7XG5cblx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKVxuXHRcdFx0XHQub2ZmKCBcIi52YWxpZGF0ZVwiIClcblx0XHRcdFx0LnJlbW92ZURhdGEoIFwidmFsaWRhdG9yXCIgKVxuXHRcdFx0XHQuZmluZCggXCIudmFsaWRhdGUtZXF1YWxUby1ibHVyXCIgKVxuXHRcdFx0XHRcdC5vZmYoIFwiLnZhbGlkYXRlLWVxdWFsVG9cIiApXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCBcInZhbGlkYXRlLWVxdWFsVG8tYmx1clwiICk7XG5cdFx0fVxuXG5cdH0sXG5cblx0Y2xhc3NSdWxlU2V0dGluZ3M6IHtcblx0XHRyZXF1aXJlZDogeyByZXF1aXJlZDogdHJ1ZSB9LFxuXHRcdGVtYWlsOiB7IGVtYWlsOiB0cnVlIH0sXG5cdFx0dXJsOiB7IHVybDogdHJ1ZSB9LFxuXHRcdGRhdGU6IHsgZGF0ZTogdHJ1ZSB9LFxuXHRcdGRhdGVJU086IHsgZGF0ZUlTTzogdHJ1ZSB9LFxuXHRcdG51bWJlcjogeyBudW1iZXI6IHRydWUgfSxcblx0XHRkaWdpdHM6IHsgZGlnaXRzOiB0cnVlIH0sXG5cdFx0Y3JlZGl0Y2FyZDogeyBjcmVkaXRjYXJkOiB0cnVlIH1cblx0fSxcblxuXHRhZGRDbGFzc1J1bGVzOiBmdW5jdGlvbiggY2xhc3NOYW1lLCBydWxlcyApIHtcblx0XHRpZiAoIGNsYXNzTmFtZS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nICkge1xuXHRcdFx0dGhpcy5jbGFzc1J1bGVTZXR0aW5nc1sgY2xhc3NOYW1lIF0gPSBydWxlcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5leHRlbmQoIHRoaXMuY2xhc3NSdWxlU2V0dGluZ3MsIGNsYXNzTmFtZSApO1xuXHRcdH1cblx0fSxcblxuXHRjbGFzc1J1bGVzOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHR2YXIgcnVsZXMgPSB7fSxcblx0XHRcdGNsYXNzZXMgPSAkKCBlbGVtZW50ICkuYXR0ciggXCJjbGFzc1wiICk7XG5cblx0XHRpZiAoIGNsYXNzZXMgKSB7XG5cdFx0XHQkLmVhY2goIGNsYXNzZXMuc3BsaXQoIFwiIFwiICksIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgaW4gJC52YWxpZGF0b3IuY2xhc3NSdWxlU2V0dGluZ3MgKSB7XG5cdFx0XHRcdFx0JC5leHRlbmQoIHJ1bGVzLCAkLnZhbGlkYXRvci5jbGFzc1J1bGVTZXR0aW5nc1sgdGhpcyBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdG5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGU6IGZ1bmN0aW9uKCBydWxlcywgdHlwZSwgbWV0aG9kLCB2YWx1ZSApIHtcblxuXHRcdC8vIENvbnZlcnQgdGhlIHZhbHVlIHRvIGEgbnVtYmVyIGZvciBudW1iZXIgaW5wdXRzLCBhbmQgZm9yIHRleHQgZm9yIGJhY2t3YXJkcyBjb21wYWJpbGl0eVxuXHRcdC8vIGFsbG93cyB0eXBlPVwiZGF0ZVwiIGFuZCBvdGhlcnMgdG8gYmUgY29tcGFyZWQgYXMgc3RyaW5nc1xuXHRcdGlmICggL21pbnxtYXh8c3RlcC8udGVzdCggbWV0aG9kICkgJiYgKCB0eXBlID09PSBudWxsIHx8IC9udW1iZXJ8cmFuZ2V8dGV4dC8udGVzdCggdHlwZSApICkgKSB7XG5cdFx0XHR2YWx1ZSA9IE51bWJlciggdmFsdWUgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydCBPcGVyYSBNaW5pLCB3aGljaCByZXR1cm5zIE5hTiBmb3IgdW5kZWZpbmVkIG1pbmxlbmd0aFxuXHRcdFx0aWYgKCBpc05hTiggdmFsdWUgKSApIHtcblx0XHRcdFx0dmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCB2YWx1ZSB8fCB2YWx1ZSA9PT0gMCApIHtcblx0XHRcdHJ1bGVzWyBtZXRob2QgXSA9IHZhbHVlO1xuXHRcdH0gZWxzZSBpZiAoIHR5cGUgPT09IG1ldGhvZCAmJiB0eXBlICE9PSBcInJhbmdlXCIgKSB7XG5cblx0XHRcdC8vIEV4Y2VwdGlvbjogdGhlIGpxdWVyeSB2YWxpZGF0ZSAncmFuZ2UnIG1ldGhvZFxuXHRcdFx0Ly8gZG9lcyBub3QgdGVzdCBmb3IgdGhlIGh0bWw1ICdyYW5nZScgdHlwZVxuXHRcdFx0cnVsZXNbIG1ldGhvZCBdID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cblx0YXR0cmlidXRlUnVsZXM6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdHZhciBydWxlcyA9IHt9LFxuXHRcdFx0JGVsZW1lbnQgPSAkKCBlbGVtZW50ICksXG5cdFx0XHR0eXBlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICksXG5cdFx0XHRtZXRob2QsIHZhbHVlO1xuXG5cdFx0Zm9yICggbWV0aG9kIGluICQudmFsaWRhdG9yLm1ldGhvZHMgKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQgZm9yIDxpbnB1dCByZXF1aXJlZD4gaW4gYm90aCBodG1sNSBhbmQgb2xkZXIgYnJvd3NlcnNcblx0XHRcdGlmICggbWV0aG9kID09PSBcInJlcXVpcmVkXCIgKSB7XG5cdFx0XHRcdHZhbHVlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoIG1ldGhvZCApO1xuXG5cdFx0XHRcdC8vIFNvbWUgYnJvd3NlcnMgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyBmb3IgdGhlIHJlcXVpcmVkIGF0dHJpYnV0ZVxuXHRcdFx0XHQvLyBhbmQgbm9uLUhUTUw1IGJyb3dzZXJzIG1pZ2h0IGhhdmUgcmVxdWlyZWQ9XCJcIiBtYXJrdXBcblx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gXCJcIiApIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGb3JjZSBub24tSFRNTDUgYnJvd3NlcnMgdG8gcmV0dXJuIGJvb2xcblx0XHRcdFx0dmFsdWUgPSAhIXZhbHVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFsdWUgPSAkZWxlbWVudC5hdHRyKCBtZXRob2QgKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5ub3JtYWxpemVBdHRyaWJ1dGVSdWxlKCBydWxlcywgdHlwZSwgbWV0aG9kLCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdC8vICdtYXhsZW5ndGgnIG1heSBiZSByZXR1cm5lZCBhcyAtMSwgMjE0NzQ4MzY0NyAoIElFICkgYW5kIDUyNDI4OCAoIHNhZmFyaSApIGZvciB0ZXh0IGlucHV0c1xuXHRcdGlmICggcnVsZXMubWF4bGVuZ3RoICYmIC8tMXwyMTQ3NDgzNjQ3fDUyNDI4OC8udGVzdCggcnVsZXMubWF4bGVuZ3RoICkgKSB7XG5cdFx0XHRkZWxldGUgcnVsZXMubWF4bGVuZ3RoO1xuXHRcdH1cblxuXHRcdHJldHVybiBydWxlcztcblx0fSxcblxuXHRkYXRhUnVsZXM6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdHZhciBydWxlcyA9IHt9LFxuXHRcdFx0JGVsZW1lbnQgPSAkKCBlbGVtZW50ICksXG5cdFx0XHR0eXBlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICksXG5cdFx0XHRtZXRob2QsIHZhbHVlO1xuXG5cdFx0Zm9yICggbWV0aG9kIGluICQudmFsaWRhdG9yLm1ldGhvZHMgKSB7XG5cdFx0XHR2YWx1ZSA9ICRlbGVtZW50LmRhdGEoIFwicnVsZVwiICsgbWV0aG9kLmNoYXJBdCggMCApLnRvVXBwZXJDYXNlKCkgKyBtZXRob2Quc3Vic3RyaW5nKCAxICkudG9Mb3dlckNhc2UoKSApO1xuXHRcdFx0dGhpcy5ub3JtYWxpemVBdHRyaWJ1dGVSdWxlKCBydWxlcywgdHlwZSwgbWV0aG9kLCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gcnVsZXM7XG5cdH0sXG5cblx0c3RhdGljUnVsZXM6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdHZhciBydWxlcyA9IHt9LFxuXHRcdFx0dmFsaWRhdG9yID0gJC5kYXRhKCBlbGVtZW50LmZvcm0sIFwidmFsaWRhdG9yXCIgKTtcblxuXHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLnJ1bGVzICkge1xuXHRcdFx0cnVsZXMgPSAkLnZhbGlkYXRvci5ub3JtYWxpemVSdWxlKCB2YWxpZGF0b3Iuc2V0dGluZ3MucnVsZXNbIGVsZW1lbnQubmFtZSBdICkgfHwge307XG5cdFx0fVxuXHRcdHJldHVybiBydWxlcztcblx0fSxcblxuXHRub3JtYWxpemVSdWxlczogZnVuY3Rpb24oIHJ1bGVzLCBlbGVtZW50ICkge1xuXG5cdFx0Ly8gSGFuZGxlIGRlcGVuZGVuY3kgY2hlY2tcblx0XHQkLmVhY2goIHJ1bGVzLCBmdW5jdGlvbiggcHJvcCwgdmFsICkge1xuXG5cdFx0XHQvLyBJZ25vcmUgcnVsZSB3aGVuIHBhcmFtIGlzIGV4cGxpY2l0bHkgZmFsc2UsIGVnLiByZXF1aXJlZDpmYWxzZVxuXHRcdFx0aWYgKCB2YWwgPT09IGZhbHNlICkge1xuXHRcdFx0XHRkZWxldGUgcnVsZXNbIHByb3AgXTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB2YWwucGFyYW0gfHwgdmFsLmRlcGVuZHMgKSB7XG5cdFx0XHRcdHZhciBrZWVwUnVsZSA9IHRydWU7XG5cdFx0XHRcdHN3aXRjaCAoIHR5cGVvZiB2YWwuZGVwZW5kcyApIHtcblx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdGtlZXBSdWxlID0gISEkKCB2YWwuZGVwZW5kcywgZWxlbWVudC5mb3JtICkubGVuZ3RoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZnVuY3Rpb25cIjpcblx0XHRcdFx0XHRrZWVwUnVsZSA9IHZhbC5kZXBlbmRzLmNhbGwoIGVsZW1lbnQsIGVsZW1lbnQgKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGtlZXBSdWxlICkge1xuXHRcdFx0XHRcdHJ1bGVzWyBwcm9wIF0gPSB2YWwucGFyYW0gIT09IHVuZGVmaW5lZCA/IHZhbC5wYXJhbSA6IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JC5kYXRhKCBlbGVtZW50LmZvcm0sIFwidmFsaWRhdG9yXCIgKS5yZXNldEVsZW1lbnRzKCAkKCBlbGVtZW50ICkgKTtcblx0XHRcdFx0XHRkZWxldGUgcnVsZXNbIHByb3AgXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdC8vIEV2YWx1YXRlIHBhcmFtZXRlcnNcblx0XHQkLmVhY2goIHJ1bGVzLCBmdW5jdGlvbiggcnVsZSwgcGFyYW1ldGVyICkge1xuXHRcdFx0cnVsZXNbIHJ1bGUgXSA9ICQuaXNGdW5jdGlvbiggcGFyYW1ldGVyICkgJiYgcnVsZSAhPT0gXCJub3JtYWxpemVyXCIgPyBwYXJhbWV0ZXIoIGVsZW1lbnQgKSA6IHBhcmFtZXRlcjtcblx0XHR9ICk7XG5cblx0XHQvLyBDbGVhbiBudW1iZXIgcGFyYW1ldGVyc1xuXHRcdCQuZWFjaCggWyBcIm1pbmxlbmd0aFwiLCBcIm1heGxlbmd0aFwiIF0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBydWxlc1sgdGhpcyBdICkge1xuXHRcdFx0XHRydWxlc1sgdGhpcyBdID0gTnVtYmVyKCBydWxlc1sgdGhpcyBdICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdCQuZWFjaCggWyBcInJhbmdlbGVuZ3RoXCIsIFwicmFuZ2VcIiBdLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBwYXJ0cztcblx0XHRcdGlmICggcnVsZXNbIHRoaXMgXSApIHtcblx0XHRcdFx0aWYgKCAkLmlzQXJyYXkoIHJ1bGVzWyB0aGlzIF0gKSApIHtcblx0XHRcdFx0XHRydWxlc1sgdGhpcyBdID0gWyBOdW1iZXIoIHJ1bGVzWyB0aGlzIF1bIDAgXSApLCBOdW1iZXIoIHJ1bGVzWyB0aGlzIF1bIDEgXSApIF07XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBydWxlc1sgdGhpcyBdID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdHBhcnRzID0gcnVsZXNbIHRoaXMgXS5yZXBsYWNlKCAvW1xcW1xcXV0vZywgXCJcIiApLnNwbGl0KCAvW1xccyxdKy8gKTtcblx0XHRcdFx0XHRydWxlc1sgdGhpcyBdID0gWyBOdW1iZXIoIHBhcnRzWyAwIF0gKSwgTnVtYmVyKCBwYXJ0c1sgMSBdICkgXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdGlmICggJC52YWxpZGF0b3IuYXV0b0NyZWF0ZVJhbmdlcyApIHtcblxuXHRcdFx0Ly8gQXV0by1jcmVhdGUgcmFuZ2VzXG5cdFx0XHRpZiAoIHJ1bGVzLm1pbiAhPSBudWxsICYmIHJ1bGVzLm1heCAhPSBudWxsICkge1xuXHRcdFx0XHRydWxlcy5yYW5nZSA9IFsgcnVsZXMubWluLCBydWxlcy5tYXggXTtcblx0XHRcdFx0ZGVsZXRlIHJ1bGVzLm1pbjtcblx0XHRcdFx0ZGVsZXRlIHJ1bGVzLm1heDtcblx0XHRcdH1cblx0XHRcdGlmICggcnVsZXMubWlubGVuZ3RoICE9IG51bGwgJiYgcnVsZXMubWF4bGVuZ3RoICE9IG51bGwgKSB7XG5cdFx0XHRcdHJ1bGVzLnJhbmdlbGVuZ3RoID0gWyBydWxlcy5taW5sZW5ndGgsIHJ1bGVzLm1heGxlbmd0aCBdO1xuXHRcdFx0XHRkZWxldGUgcnVsZXMubWlubGVuZ3RoO1xuXHRcdFx0XHRkZWxldGUgcnVsZXMubWF4bGVuZ3RoO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBydWxlcztcblx0fSxcblxuXHQvLyBDb252ZXJ0cyBhIHNpbXBsZSBzdHJpbmcgdG8gYSB7c3RyaW5nOiB0cnVlfSBydWxlLCBlLmcuLCBcInJlcXVpcmVkXCIgdG8ge3JlcXVpcmVkOnRydWV9XG5cdG5vcm1hbGl6ZVJ1bGU6IGZ1bmN0aW9uKCBkYXRhICkge1xuXHRcdGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHR2YXIgdHJhbnNmb3JtZWQgPSB7fTtcblx0XHRcdCQuZWFjaCggZGF0YS5zcGxpdCggL1xccy8gKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRyYW5zZm9ybWVkWyB0aGlzIF0gPSB0cnVlO1xuXHRcdFx0fSApO1xuXHRcdFx0ZGF0YSA9IHRyYW5zZm9ybWVkO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fSxcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvalF1ZXJ5LnZhbGlkYXRvci5hZGRNZXRob2QvXG5cdGFkZE1ldGhvZDogZnVuY3Rpb24oIG5hbWUsIG1ldGhvZCwgbWVzc2FnZSApIHtcblx0XHQkLnZhbGlkYXRvci5tZXRob2RzWyBuYW1lIF0gPSBtZXRob2Q7XG5cdFx0JC52YWxpZGF0b3IubWVzc2FnZXNbIG5hbWUgXSA9IG1lc3NhZ2UgIT09IHVuZGVmaW5lZCA/IG1lc3NhZ2UgOiAkLnZhbGlkYXRvci5tZXNzYWdlc1sgbmFtZSBdO1xuXHRcdGlmICggbWV0aG9kLmxlbmd0aCA8IDMgKSB7XG5cdFx0XHQkLnZhbGlkYXRvci5hZGRDbGFzc1J1bGVzKCBuYW1lLCAkLnZhbGlkYXRvci5ub3JtYWxpemVSdWxlKCBuYW1lICkgKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2pRdWVyeS52YWxpZGF0b3IubWV0aG9kcy9cblx0bWV0aG9kczoge1xuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3JlcXVpcmVkLW1ldGhvZC9cblx0XHRyZXF1aXJlZDogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgZGVwZW5kZW5jeSBpcyBtZXRcblx0XHRcdGlmICggIXRoaXMuZGVwZW5kKCBwYXJhbSwgZWxlbWVudCApICkge1xuXHRcdFx0XHRyZXR1cm4gXCJkZXBlbmRlbmN5LW1pc21hdGNoXCI7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzZWxlY3RcIiApIHtcblxuXHRcdFx0XHQvLyBDb3VsZCBiZSBhbiBhcnJheSBmb3Igc2VsZWN0LW11bHRpcGxlIG9yIGEgc3RyaW5nLCBib3RoIGFyZSBmaW5lIHRoaXMgd2F5XG5cdFx0XHRcdHZhciB2YWwgPSAkKCBlbGVtZW50ICkudmFsKCk7XG5cdFx0XHRcdHJldHVybiB2YWwgJiYgdmFsLmxlbmd0aCA+IDA7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMuY2hlY2thYmxlKCBlbGVtZW50ICkgKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldExlbmd0aCggdmFsdWUsIGVsZW1lbnQgKSA+IDA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2VtYWlsLW1ldGhvZC9cblx0XHRlbWFpbDogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXG5cdFx0XHQvLyBGcm9tIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjdmFsaWQtZS1tYWlsLWFkZHJlc3Ncblx0XHRcdC8vIFJldHJpZXZlZCAyMDE0LTAxLTE0XG5cdFx0XHQvLyBJZiB5b3UgaGF2ZSBhIHByb2JsZW0gd2l0aCB0aGlzIGltcGxlbWVudGF0aW9uLCByZXBvcnQgYSBidWcgYWdhaW5zdCB0aGUgYWJvdmUgc3BlY1xuXHRcdFx0Ly8gT3IgdXNlIGN1c3RvbSBtZXRob2RzIHRvIGltcGxlbWVudCB5b3VyIG93biBlbWFpbCB2YWxpZGF0aW9uXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eW2EtekEtWjAtOS4hIyQlJicqK1xcLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKiQvLnRlc3QoIHZhbHVlICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy91cmwtbWV0aG9kL1xuXHRcdHVybDogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXG5cdFx0XHQvLyBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMyBEaWVnbyBQZXJpbmksIE1JVCBsaWNlbnNlZFxuXHRcdFx0Ly8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZHBlcmluaS83MjkyOTRcblx0XHRcdC8vIHNlZSBhbHNvIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9kZW1vL3VybC1yZWdleFxuXHRcdFx0Ly8gbW9kaWZpZWQgdG8gYWxsb3cgcHJvdG9jb2wtcmVsYXRpdmUgVVJMc1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAvXig/Oig/Oig/Omh0dHBzP3xmdHApOik/XFwvXFwvKSg/OlxcUysoPzo6XFxTKik/QCk/KD86KD8hKD86MTB8MTI3KSg/OlxcLlxcZHsxLDN9KXszfSkoPyEoPzoxNjlcXC4yNTR8MTkyXFwuMTY4KSg/OlxcLlxcZHsxLDN9KXsyfSkoPyExNzJcXC4oPzoxWzYtOV18MlxcZHwzWzAtMV0pKD86XFwuXFxkezEsM30pezJ9KSg/OlsxLTldXFxkP3wxXFxkXFxkfDJbMDFdXFxkfDIyWzAtM10pKD86XFwuKD86MT9cXGR7MSwyfXwyWzAtNF1cXGR8MjVbMC01XSkpezJ9KD86XFwuKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNF0pKXwoPzooPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKD86XFwuKD86W2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0tKikqW2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0rKSooPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmXXsyLH0pKS4/KSg/OjpcXGR7Miw1fSk/KD86Wy8/I11cXFMqKT8kL2kudGVzdCggdmFsdWUgKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2RhdGUtbWV0aG9kL1xuXHRcdGRhdGU6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgIS9JbnZhbGlkfE5hTi8udGVzdCggbmV3IERhdGUoIHZhbHVlICkudG9TdHJpbmcoKSApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZGF0ZUlTTy1tZXRob2QvXG5cdFx0ZGF0ZUlTTzogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAvXlxcZHs0fVtcXC9cXC1dKDA/WzEtOV18MVswMTJdKVtcXC9cXC1dKDA/WzEtOV18WzEyXVswLTldfDNbMDFdKSQvLnRlc3QoIHZhbHVlICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9udW1iZXItbWV0aG9kL1xuXHRcdG51bWJlcjogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAvXig/Oi0/XFxkK3wtP1xcZHsxLDN9KD86LFxcZHszfSkrKT8oPzpcXC5cXGQrKT8kLy50ZXN0KCB2YWx1ZSApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZGlnaXRzLW1ldGhvZC9cblx0XHRkaWdpdHM6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgL15cXGQrJC8udGVzdCggdmFsdWUgKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21pbmxlbmd0aC1tZXRob2QvXG5cdFx0bWlubGVuZ3RoOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0dmFyIGxlbmd0aCA9ICQuaXNBcnJheSggdmFsdWUgKSA/IHZhbHVlLmxlbmd0aCA6IHRoaXMuZ2V0TGVuZ3RoKCB2YWx1ZSwgZWxlbWVudCApO1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCBsZW5ndGggPj0gcGFyYW07XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9tYXhsZW5ndGgtbWV0aG9kL1xuXHRcdG1heGxlbmd0aDogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblx0XHRcdHZhciBsZW5ndGggPSAkLmlzQXJyYXkoIHZhbHVlICkgPyB2YWx1ZS5sZW5ndGggOiB0aGlzLmdldExlbmd0aCggdmFsdWUsIGVsZW1lbnQgKTtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgbGVuZ3RoIDw9IHBhcmFtO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvcmFuZ2VsZW5ndGgtbWV0aG9kL1xuXHRcdHJhbmdlbGVuZ3RoOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0dmFyIGxlbmd0aCA9ICQuaXNBcnJheSggdmFsdWUgKSA/IHZhbHVlLmxlbmd0aCA6IHRoaXMuZ2V0TGVuZ3RoKCB2YWx1ZSwgZWxlbWVudCApO1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAoIGxlbmd0aCA+PSBwYXJhbVsgMCBdICYmIGxlbmd0aCA8PSBwYXJhbVsgMSBdICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9taW4tbWV0aG9kL1xuXHRcdG1pbjogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgdmFsdWUgPj0gcGFyYW07XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9tYXgtbWV0aG9kL1xuXHRcdG1heDogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgdmFsdWUgPD0gcGFyYW07XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9yYW5nZS1tZXRob2QvXG5cdFx0cmFuZ2U6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8ICggdmFsdWUgPj0gcGFyYW1bIDAgXSAmJiB2YWx1ZSA8PSBwYXJhbVsgMSBdICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9zdGVwLW1ldGhvZC9cblx0XHRzdGVwOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0dmFyIHR5cGUgPSAkKCBlbGVtZW50ICkuYXR0ciggXCJ0eXBlXCIgKSxcblx0XHRcdFx0ZXJyb3JNZXNzYWdlID0gXCJTdGVwIGF0dHJpYnV0ZSBvbiBpbnB1dCB0eXBlIFwiICsgdHlwZSArIFwiIGlzIG5vdCBzdXBwb3J0ZWQuXCIsXG5cdFx0XHRcdHN1cHBvcnRlZFR5cGVzID0gWyBcInRleHRcIiwgXCJudW1iZXJcIiwgXCJyYW5nZVwiIF0sXG5cdFx0XHRcdHJlID0gbmV3IFJlZ0V4cCggXCJcXFxcYlwiICsgdHlwZSArIFwiXFxcXGJcIiApLFxuXHRcdFx0XHRub3RTdXBwb3J0ZWQgPSB0eXBlICYmICFyZS50ZXN0KCBzdXBwb3J0ZWRUeXBlcy5qb2luKCkgKTtcblxuXHRcdFx0Ly8gV29ya3Mgb25seSBmb3IgdGV4dCwgbnVtYmVyIGFuZCByYW5nZSBpbnB1dCB0eXBlc1xuXHRcdFx0Ly8gVE9ETyBmaW5kIGEgd2F5IHRvIHN1cHBvcnQgaW5wdXQgdHlwZXMgZGF0ZSwgZGF0ZXRpbWUsIGRhdGV0aW1lLWxvY2FsLCBtb250aCwgdGltZSBhbmQgd2Vla1xuXHRcdFx0aWYgKCBub3RTdXBwb3J0ZWQgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggZXJyb3JNZXNzYWdlICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8ICggdmFsdWUgJSBwYXJhbSA9PT0gMCApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZXF1YWxUby1tZXRob2QvXG5cdFx0ZXF1YWxUbzogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblxuXHRcdFx0Ly8gQmluZCB0byB0aGUgYmx1ciBldmVudCBvZiB0aGUgdGFyZ2V0IGluIG9yZGVyIHRvIHJldmFsaWRhdGUgd2hlbmV2ZXIgdGhlIHRhcmdldCBmaWVsZCBpcyB1cGRhdGVkXG5cdFx0XHR2YXIgdGFyZ2V0ID0gJCggcGFyYW0gKTtcblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5vbmZvY3Vzb3V0ICYmIHRhcmdldC5ub3QoIFwiLnZhbGlkYXRlLWVxdWFsVG8tYmx1clwiICkubGVuZ3RoICkge1xuXHRcdFx0XHR0YXJnZXQuYWRkQ2xhc3MoIFwidmFsaWRhdGUtZXF1YWxUby1ibHVyXCIgKS5vbiggXCJibHVyLnZhbGlkYXRlLWVxdWFsVG9cIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JCggZWxlbWVudCApLnZhbGlkKCk7XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdGFyZ2V0LnZhbCgpO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvcmVtb3RlLW1ldGhvZC9cblx0XHRyZW1vdGU6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0sIG1ldGhvZCApIHtcblx0XHRcdGlmICggdGhpcy5vcHRpb25hbCggZWxlbWVudCApICkge1xuXHRcdFx0XHRyZXR1cm4gXCJkZXBlbmRlbmN5LW1pc21hdGNoXCI7XG5cdFx0XHR9XG5cblx0XHRcdG1ldGhvZCA9IHR5cGVvZiBtZXRob2QgPT09IFwic3RyaW5nXCIgJiYgbWV0aG9kIHx8IFwicmVtb3RlXCI7XG5cblx0XHRcdHZhciBwcmV2aW91cyA9IHRoaXMucHJldmlvdXNWYWx1ZSggZWxlbWVudCwgbWV0aG9kICksXG5cdFx0XHRcdHZhbGlkYXRvciwgZGF0YSwgb3B0aW9uRGF0YVN0cmluZztcblxuXHRcdFx0aWYgKCAhdGhpcy5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF0gKSB7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MubWVzc2FnZXNbIGVsZW1lbnQubmFtZSBdID0ge307XG5cdFx0XHR9XG5cdFx0XHRwcmV2aW91cy5vcmlnaW5hbE1lc3NhZ2UgPSBwcmV2aW91cy5vcmlnaW5hbE1lc3NhZ2UgfHwgdGhpcy5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF1bIG1ldGhvZCBdO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF1bIG1ldGhvZCBdID0gcHJldmlvdXMubWVzc2FnZTtcblxuXHRcdFx0cGFyYW0gPSB0eXBlb2YgcGFyYW0gPT09IFwic3RyaW5nXCIgJiYgeyB1cmw6IHBhcmFtIH0gfHwgcGFyYW07XG5cdFx0XHRvcHRpb25EYXRhU3RyaW5nID0gJC5wYXJhbSggJC5leHRlbmQoIHsgZGF0YTogdmFsdWUgfSwgcGFyYW0uZGF0YSApICk7XG5cdFx0XHRpZiAoIHByZXZpb3VzLm9sZCA9PT0gb3B0aW9uRGF0YVN0cmluZyApIHtcblx0XHRcdFx0cmV0dXJuIHByZXZpb3VzLnZhbGlkO1xuXHRcdFx0fVxuXG5cdFx0XHRwcmV2aW91cy5vbGQgPSBvcHRpb25EYXRhU3RyaW5nO1xuXHRcdFx0dmFsaWRhdG9yID0gdGhpcztcblx0XHRcdHRoaXMuc3RhcnRSZXF1ZXN0KCBlbGVtZW50ICk7XG5cdFx0XHRkYXRhID0ge307XG5cdFx0XHRkYXRhWyBlbGVtZW50Lm5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0JC5hamF4KCAkLmV4dGVuZCggdHJ1ZSwge1xuXHRcdFx0XHRtb2RlOiBcImFib3J0XCIsXG5cdFx0XHRcdHBvcnQ6IFwidmFsaWRhdGVcIiArIGVsZW1lbnQubmFtZSxcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRjb250ZXh0OiB2YWxpZGF0b3IuY3VycmVudEZvcm0sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCByZXNwb25zZSApIHtcblx0XHRcdFx0XHR2YXIgdmFsaWQgPSByZXNwb25zZSA9PT0gdHJ1ZSB8fCByZXNwb25zZSA9PT0gXCJ0cnVlXCIsXG5cdFx0XHRcdFx0XHRlcnJvcnMsIG1lc3NhZ2UsIHN1Ym1pdHRlZDtcblxuXHRcdFx0XHRcdHZhbGlkYXRvci5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF1bIG1ldGhvZCBdID0gcHJldmlvdXMub3JpZ2luYWxNZXNzYWdlO1xuXHRcdFx0XHRcdGlmICggdmFsaWQgKSB7XG5cdFx0XHRcdFx0XHRzdWJtaXR0ZWQgPSB2YWxpZGF0b3IuZm9ybVN1Ym1pdHRlZDtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5yZXNldEludGVybmFscygpO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnRvSGlkZSA9IHZhbGlkYXRvci5lcnJvcnNGb3IoIGVsZW1lbnQgKTtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5mb3JtU3VibWl0dGVkID0gc3VibWl0dGVkO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnN1Y2Nlc3NMaXN0LnB1c2goIGVsZW1lbnQgKTtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5pbnZhbGlkWyBlbGVtZW50Lm5hbWUgXSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnNob3dFcnJvcnMoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXJyb3JzID0ge307XG5cdFx0XHRcdFx0XHRtZXNzYWdlID0gcmVzcG9uc2UgfHwgdmFsaWRhdG9yLmRlZmF1bHRNZXNzYWdlKCBlbGVtZW50LCB7IG1ldGhvZDogbWV0aG9kLCBwYXJhbWV0ZXJzOiB2YWx1ZSB9ICk7XG5cdFx0XHRcdFx0XHRlcnJvcnNbIGVsZW1lbnQubmFtZSBdID0gcHJldmlvdXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3IuaW52YWxpZFsgZWxlbWVudC5uYW1lIF0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnNob3dFcnJvcnMoIGVycm9ycyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwcmV2aW91cy52YWxpZCA9IHZhbGlkO1xuXHRcdFx0XHRcdHZhbGlkYXRvci5zdG9wUmVxdWVzdCggZWxlbWVudCwgdmFsaWQgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgcGFyYW0gKSApO1xuXHRcdFx0cmV0dXJuIFwicGVuZGluZ1wiO1xuXHRcdH1cblx0fVxuXG59ICk7XG5cclxuLy8gQWpheCBtb2RlOiBhYm9ydFxuLy8gdXNhZ2U6ICQuYWpheCh7IG1vZGU6IFwiYWJvcnRcIlssIHBvcnQ6IFwidW5pcXVlcG9ydFwiXX0pO1xuLy8gaWYgbW9kZTpcImFib3J0XCIgaXMgdXNlZCwgdGhlIHByZXZpb3VzIHJlcXVlc3Qgb24gdGhhdCBwb3J0IChwb3J0IGNhbiBiZSB1bmRlZmluZWQpIGlzIGFib3J0ZWQgdmlhIFhNTEh0dHBSZXF1ZXN0LmFib3J0KClcblxudmFyIHBlbmRpbmdSZXF1ZXN0cyA9IHt9LFxuXHRhamF4O1xuXG4vLyBVc2UgYSBwcmVmaWx0ZXIgaWYgYXZhaWxhYmxlICgxLjUrKVxuaWYgKCAkLmFqYXhQcmVmaWx0ZXIgKSB7XG5cdCQuYWpheFByZWZpbHRlciggZnVuY3Rpb24oIHNldHRpbmdzLCBfLCB4aHIgKSB7XG5cdFx0dmFyIHBvcnQgPSBzZXR0aW5ncy5wb3J0O1xuXHRcdGlmICggc2V0dGluZ3MubW9kZSA9PT0gXCJhYm9ydFwiICkge1xuXHRcdFx0aWYgKCBwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXSApIHtcblx0XHRcdFx0cGVuZGluZ1JlcXVlc3RzWyBwb3J0IF0uYWJvcnQoKTtcblx0XHRcdH1cblx0XHRcdHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdID0geGhyO1xuXHRcdH1cblx0fSApO1xufSBlbHNlIHtcblxuXHQvLyBQcm94eSBhamF4XG5cdGFqYXggPSAkLmFqYXg7XG5cdCQuYWpheCA9IGZ1bmN0aW9uKCBzZXR0aW5ncyApIHtcblx0XHR2YXIgbW9kZSA9ICggXCJtb2RlXCIgaW4gc2V0dGluZ3MgPyBzZXR0aW5ncyA6ICQuYWpheFNldHRpbmdzICkubW9kZSxcblx0XHRcdHBvcnQgPSAoIFwicG9ydFwiIGluIHNldHRpbmdzID8gc2V0dGluZ3MgOiAkLmFqYXhTZXR0aW5ncyApLnBvcnQ7XG5cdFx0aWYgKCBtb2RlID09PSBcImFib3J0XCIgKSB7XG5cdFx0XHRpZiAoIHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdICkge1xuXHRcdFx0XHRwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXS5hYm9ydCgpO1xuXHRcdFx0fVxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzWyBwb3J0IF0gPSBhamF4LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdHJldHVybiBwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXTtcblx0XHR9XG5cdFx0cmV0dXJuIGFqYXguYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHR9O1xufVxuXHJcbn0pKTtcclxuIiwiLypqc2hpbnQgYnJvd3Nlcjp0cnVlICovXG4vKiFcbiogRml0VmlkcyAxLjFcbipcbiogQ29weXJpZ2h0IDIwMTMsIENocmlzIENveWllciAtIGh0dHA6Ly9jc3MtdHJpY2tzLmNvbSArIERhdmUgUnVwZXJ0IC0gaHR0cDovL2RhdmVydXBlcnQuY29tXG4qIENyZWRpdCB0byBUaGllcnJ5IEtvYmxlbnR6IC0gaHR0cDovL3d3dy5hbGlzdGFwYXJ0LmNvbS9hcnRpY2xlcy9jcmVhdGluZy1pbnRyaW5zaWMtcmF0aW9zLWZvci12aWRlby9cbiogUmVsZWFzZWQgdW5kZXIgdGhlIFdURlBMIGxpY2Vuc2UgLSBodHRwOi8vc2FtLnpveS5vcmcvd3RmcGwvXG4qXG4qL1xuXG47KGZ1bmN0aW9uKCAkICl7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gICQuZm4uZml0VmlkcyA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgIHZhciBzZXR0aW5ncyA9IHtcbiAgICAgIGN1c3RvbVNlbGVjdG9yOiBudWxsLFxuICAgICAgaWdub3JlOiBudWxsXG4gICAgfTtcblxuICAgIGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZml0LXZpZHMtc3R5bGUnKSkge1xuICAgICAgLy8gYXBwZW5kU3R5bGVzOiBodHRwczovL2dpdGh1Yi5jb20vdG9kZG1vdHRvL2ZsdWlkdmlkcy9ibG9iL21hc3Rlci9kaXN0L2ZsdWlkdmlkcy5qc1xuICAgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICB2YXIgY3NzID0gJy5mbHVpZC13aWR0aC12aWRlby13cmFwcGVye3dpZHRoOjEwMCU7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowO30uZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlciBpZnJhbWUsLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXIgb2JqZWN0LC5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIGVtYmVkIHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt9JztcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGl2LmlubmVySFRNTCA9ICc8cD54PC9wPjxzdHlsZSBpZD1cImZpdC12aWRzLXN0eWxlXCI+JyArIGNzcyArICc8L3N0eWxlPic7XG4gICAgICBoZWFkLmFwcGVuZENoaWxkKGRpdi5jaGlsZE5vZGVzWzFdKTtcbiAgICB9XG5cbiAgICBpZiAoIG9wdGlvbnMgKSB7XG4gICAgICAkLmV4dGVuZCggc2V0dGluZ3MsIG9wdGlvbnMgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgc2VsZWN0b3JzID0gW1xuICAgICAgICAnaWZyYW1lW3NyYyo9XCJwbGF5ZXIudmltZW8uY29tXCJdJyxcbiAgICAgICAgJ2lmcmFtZVtzcmMqPVwieW91dHViZS5jb21cIl0nLFxuICAgICAgICAnaWZyYW1lW3NyYyo9XCJ5b3V0dWJlLW5vY29va2llLmNvbVwiXScsXG4gICAgICAgICdpZnJhbWVbc3JjKj1cImtpY2tzdGFydGVyLmNvbVwiXVtzcmMqPVwidmlkZW8uaHRtbFwiXScsXG4gICAgICAgICdvYmplY3QnLFxuICAgICAgICAnZW1iZWQnXG4gICAgICBdO1xuXG4gICAgICBpZiAoc2V0dGluZ3MuY3VzdG9tU2VsZWN0b3IpIHtcbiAgICAgICAgc2VsZWN0b3JzLnB1c2goc2V0dGluZ3MuY3VzdG9tU2VsZWN0b3IpO1xuICAgICAgfVxuXG4gICAgICB2YXIgaWdub3JlTGlzdCA9ICcuZml0dmlkc2lnbm9yZSc7XG5cbiAgICAgIGlmKHNldHRpbmdzLmlnbm9yZSkge1xuICAgICAgICBpZ25vcmVMaXN0ID0gaWdub3JlTGlzdCArICcsICcgKyBzZXR0aW5ncy5pZ25vcmU7XG4gICAgICB9XG5cbiAgICAgIHZhciAkYWxsVmlkZW9zID0gJCh0aGlzKS5maW5kKHNlbGVjdG9ycy5qb2luKCcsJykpO1xuICAgICAgJGFsbFZpZGVvcyA9ICRhbGxWaWRlb3Mubm90KCdvYmplY3Qgb2JqZWN0Jyk7IC8vIFN3Zk9iaiBjb25mbGljdCBwYXRjaFxuICAgICAgJGFsbFZpZGVvcyA9ICRhbGxWaWRlb3Mubm90KGlnbm9yZUxpc3QpOyAvLyBEaXNhYmxlIEZpdFZpZHMgb24gdGhpcyB2aWRlby5cblxuICAgICAgJGFsbFZpZGVvcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIGlmKCR0aGlzLnBhcmVudHMoaWdub3JlTGlzdCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybjsgLy8gRGlzYWJsZSBGaXRWaWRzIG9uIHRoaXMgdmlkZW8uXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZW1iZWQnICYmICR0aGlzLnBhcmVudCgnb2JqZWN0JykubGVuZ3RoIHx8ICR0aGlzLnBhcmVudCgnLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXInKS5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICgoISR0aGlzLmNzcygnaGVpZ2h0JykgJiYgISR0aGlzLmNzcygnd2lkdGgnKSkgJiYgKGlzTmFOKCR0aGlzLmF0dHIoJ2hlaWdodCcpKSB8fCBpc05hTigkdGhpcy5hdHRyKCd3aWR0aCcpKSkpXG4gICAgICAgIHtcbiAgICAgICAgICAkdGhpcy5hdHRyKCdoZWlnaHQnLCA5KTtcbiAgICAgICAgICAkdGhpcy5hdHRyKCd3aWR0aCcsIDE2KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGVpZ2h0ID0gKCB0aGlzLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ29iamVjdCcgfHwgKCR0aGlzLmF0dHIoJ2hlaWdodCcpICYmICFpc05hTihwYXJzZUludCgkdGhpcy5hdHRyKCdoZWlnaHQnKSwgMTApKSkgKSA/IHBhcnNlSW50KCR0aGlzLmF0dHIoJ2hlaWdodCcpLCAxMCkgOiAkdGhpcy5oZWlnaHQoKSxcbiAgICAgICAgICAgIHdpZHRoID0gIWlzTmFOKHBhcnNlSW50KCR0aGlzLmF0dHIoJ3dpZHRoJyksIDEwKSkgPyBwYXJzZUludCgkdGhpcy5hdHRyKCd3aWR0aCcpLCAxMCkgOiAkdGhpcy53aWR0aCgpLFxuICAgICAgICAgICAgYXNwZWN0UmF0aW8gPSBoZWlnaHQgLyB3aWR0aDtcbiAgICAgICAgaWYoISR0aGlzLmF0dHIoJ25hbWUnKSl7XG4gICAgICAgICAgdmFyIHZpZGVvTmFtZSA9ICdmaXR2aWQnICsgJC5mbi5maXRWaWRzLl9jb3VudDtcbiAgICAgICAgICAkdGhpcy5hdHRyKCduYW1lJywgdmlkZW9OYW1lKTtcbiAgICAgICAgICAkLmZuLmZpdFZpZHMuX2NvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cImZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXJcIj48L2Rpdj4nKS5wYXJlbnQoJy5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyJykuY3NzKCdwYWRkaW5nLXRvcCcsIChhc3BlY3RSYXRpbyAqIDEwMCkrJyUnKTtcbiAgICAgICAgJHRoaXMucmVtb3ZlQXR0cignaGVpZ2h0JykucmVtb3ZlQXR0cignd2lkdGgnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEludGVybmFsIGNvdW50ZXIgZm9yIHVuaXF1ZSB2aWRlbyBuYW1lcy5cbiAgJC5mbi5maXRWaWRzLl9jb3VudCA9IDA7XG59KSggalF1ZXJ5ICk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAkLndpZGdldChcInVpLmNoZWNrTGlzdFwiLCB7XHJcbiAgICBvcHRpb25zOiB7XHJcbiAgICAgIGxpc3RJdGVtcyA6IFtdLFxyXG4gICAgICBzZWxlY3RlZEl0ZW1zOiBbXSxcclxuICAgICAgZWZmZWN0OiAnYmxpbmsnLFxyXG4gICAgICBvbkNoYW5nZToge30sXHJcbiAgICAgIG9iakxpc3Q6ICcnLFxyXG4gICAgICBpY291bnQ6IDAsXHJcbiAgICB9LFxyXG5cclxuICAgIF9jcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsIG8gPSBzZWxmLm9wdGlvbnMsIGVsID0gc2VsZi5lbGVtZW50O1xyXG4gICAgICB2YXIgcGxhY2Vob2xkZXIgPSBcIlNlYXJjaCBMaXN0XCI7XHJcblxyXG4gICAgICAvLyBnZW5lcmF0ZSBvdXRlciBkaXZcclxuICAgICAgdmFyIGNvbnRhaW5lciA9ICQoJzxkaXYvPicpLmFkZENsYXNzKCdzZWFyY2gtbGlzdCcpO1xyXG5cclxuICAgICAgLy8gZ2VuZXJhdGUgdG9vbGJhclxyXG4gICAgICB2YXIgdG9vbGJhciA9ICQoJzxkaXYvPicpLmFkZENsYXNzKCd0b29sYmFyJyk7XHJcblxyXG4gICAgICB2YXIgdHh0ZmlsdGVyID0gJCgnPGlucHV0Lz4nKS5hdHRyKHt0eXBlOid0ZXh0JywgcGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyfSkuYWRkQ2xhc3MoJ3R4dEZpbHRlcicpLmtleXVwKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2VsZi5fZmlsdGVyKCQodGhpcykudmFsKCkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRvb2xiYXIuYXBwZW5kKCQoJzxkaXYvPicpLmFkZENsYXNzKCdmaWx0ZXJib3gnKS5hcHBlbmQodHh0ZmlsdGVyKSk7XHJcblxyXG4gICAgICAvLyBnZW5lcmF0ZSBsaXN0IHRhYmxlIG9iamVjdFxyXG4gICAgICBvLm9iakxpc3QgPSAkKCc8dWwgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbGxlZGJ5PVwiY2hlY2tib3hHcm91cDFcIi8+JykuYWRkQ2xhc3MoJ2FtYV9fbGlzdCBmaWx0ZXInKTtcclxuXHJcbiAgICAgIGNvbnRhaW5lci5hcHBlbmQodG9vbGJhcik7XHJcbiAgICAgIGNvbnRhaW5lci5hcHBlbmQoby5vYmpMaXN0KTtcclxuICAgICAgZWwuYXBwZW5kKGNvbnRhaW5lcik7XHJcblxyXG4gICAgICBzZWxmLmxvYWRMaXN0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9hZGRJdGVtOiBmdW5jdGlvbihsaXN0SXRlbSl7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcywgbyA9IHNlbGYub3B0aW9ucywgZWwgPSBzZWxmLmVsZW1lbnQ7XHJcblxyXG4gICAgICB2YXIgaXRlbUlkID0gJ2l0bScgKyAoby5pY291bnQrKyk7XHQvLyBnZW5lcmF0ZSBpdGVtIGlkXHJcbiAgICAgIHZhciBpdG0gPSAkKCc8bGkgcm9sZT1cIm1lbnVpdGVtXCIgLz4nKTtcclxuICAgICAgdmFyIGNoayA9ICQoJzxpbnB1dCByb2xlPVwiY2hlY2tib3hcIiAvPicpLmF0dHIoJ3R5cGUnLCdjaGVja2JveCcpLmF0dHIoJ2lkJyxpdGVtSWQpXHJcbiAgICAgICAgLmFkZENsYXNzKCdjaGsnKVxyXG4gICAgICAgIC5hdHRyKCdkYXRhLXRleHQnLGxpc3RJdGVtLnRleHQpXHJcbiAgICAgICAgLmF0dHIoJ2RhdGEtdmFsdWUnLGxpc3RJdGVtLnZhbHVlKTtcclxuICAgICAgdmFyIGxhYmVsID0gJCgnPGxhYmVsIC8+JykuYXR0cignZm9yJyxpdGVtSWQpLnRleHQobGlzdEl0ZW0udGV4dCk7XHJcblxyXG4gICAgICBpdG0uYXBwZW5kKGNoaywgbGFiZWwpO1xyXG4gICAgICBvLm9iakxpc3QuYXBwZW5kKGl0bSk7XHJcblxyXG4gICAgICAvLyBiaW5kIHNlbGVjdGlvbi1jaGFuZ2VcclxuICAgICAgZWwuZGVsZWdhdGUoJy5jaGsnLCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2VsZi5fc2VsQ2hhbmdlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgbG9hZExpc3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcywgbyA9IHNlbGYub3B0aW9ucywgZWwgPSBzZWxmLmVsZW1lbnQ7XHJcblxyXG4gICAgICBvLm9iakxpc3QuZW1wdHkoKS5oaWRlKCk7XHJcblxyXG4gICAgICAkLmVhY2goby5saXN0SXRlbXMsZnVuY3Rpb24oKXtcclxuICAgICAgICBzZWxmLl9hZGRJdGVtKHRoaXMpO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgX3NlbENoYW5nZTogZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLCBvID0gc2VsZi5vcHRpb25zLCBlbCA9IHNlbGYuZWxlbWVudDtcclxuXHJcbiAgICAgIC8vIGVtcHR5IHNlbGVjdGlvblxyXG4gICAgICBvLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuXHJcbiAgICAgIC8vIHNjYW4gZWxlbWVudHMsIGZpbmQgY2hlY2tlZCBvbmVzXHJcbiAgICAgIG8ub2JqTGlzdC5maW5kKCcuY2hrJykuZWFjaChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBpZigkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSl7XHJcbiAgICAgICAgICBvLnNlbGVjdGVkSXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgIHRleHQ6ICQodGhpcykuYXR0cignZGF0YS10ZXh0JyksXHJcbiAgICAgICAgICAgIHZhbHVlOiAkKHRoaXMpLmF0dHIoJ2RhdGEtdmFsdWUnKVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlnaGxpZ2h0Jykuc2libGluZ3MoKS5hZGRDbGFzcygnaGlnaGxpZ2h0Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZ2hsaWdodCcpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2hpZ2hsaWdodCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBmaXJlIG9uQ2hhbmdlIGV2ZW50XHJcbiAgICAgIG8ub25DaGFuZ2UuY2FsbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfZmlsdGVyOiBmdW5jdGlvbihmaWx0ZXIpe1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsIG8gPSBzZWxmLm9wdGlvbnM7XHJcblxyXG4gICAgICBvLm9iakxpc3QuZmluZCgnLmNoaycpLmVhY2goZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgaWYoJCh0aGlzKS5hdHRyKCdkYXRhLXRleHQnKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyLnRvTG93ZXJDYXNlKCkpID4gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5zaG93KCk7XHJcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xyXG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGdldFNlbGVjdGlvbjogZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG8gPSBzZWxmLm9wdGlvbnNcclxuICAgICAgcmV0dXJuIG8uc2VsZWN0ZWRJdGVtcztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0RGF0YTogZnVuY3Rpb24oZGF0YU1vZGVsKXtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIG8gPSBzZWxmLm9wdGlvbnNcclxuICAgICAgby5saXN0SXRlbXMgPSBkYXRhTW9kZWw7XHJcbiAgICAgIHNlbGYubG9hZExpc3QoKTtcclxuICAgICAgc2VsZi5fc2VsQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pKCQpO1xyXG4iLCIvKlxuKlx0alF1ZXJ5VUkuQWNjb3JkaW9uLk11bHRpcGxlLCB2MS4wLjFcbipcdChjKSAyMDE04oCTMjAxNyBBcnR5b20gXCJTbGVlcHdhbGtlclwiIEZlZG9zb3YgPG1haWxAYXNsZWVwd2Fsa2VyLnJ1PlxuKlx0aHR0cHM6Ly9naXRodWIuY29tL2FzbGVlcHdhbGtlci9qcXVlcnktdWkudGFicy5uZWlnaGJvcnMuanNcbiovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocm9vdCwgalF1ZXJ5KSB7XG5cdFx0XHRpZiAoalF1ZXJ5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0alF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0alF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jykocm9vdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGZhY3RvcnkoalF1ZXJ5KTtcblx0XHRcdHJldHVybiBqUXVlcnk7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRmYWN0b3J5KGpRdWVyeSk7XG5cdH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuXHR2YXIgb3JpZ2luYWxUb2dnbGUgPSAkLnVpLmFjY29yZGlvbi5wcm90b3R5cGUuX3RvZ2dsZTtcblxuXHQkLmV4dGVuZCgkLnVpLmFjY29yZGlvbi5wcm90b3R5cGUsIHtcblx0XHRtdWx0aXBsZTogZmFsc2UsXG5cdFx0X3RvZ2dsZTogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMubXVsdGlwbGUgJiYgZGF0YS5uZXdQYW5lbC5sZW5ndGgpIHtcblx0XHRcdFx0ZGF0YS5vbGRQYW5lbCA9IGRhdGEub2xkSGVhZGVyID0gdGhpcy5wcmV2U2hvdyA9ICQoJycpO1xuXG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuY29sbGFwc2libGUgJiYgZGF0YS5uZXdQYW5lbC5pcygnOnZpc2libGUnKSkge1xuXHRcdFx0XHRcdGRhdGEub2xkUGFuZWwgPSBkYXRhLm5ld1BhbmVsO1xuXHRcdFx0XHRcdGRhdGEubmV3UGFuZWwgPSAkKCcnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b3JpZ2luYWxUb2dnbGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9XG5cdH0pO1xuXG59KSk7XG4iLCIvKlxuICogU21hcnRNZW51cyBqUXVlcnkgdjEuMS4wK1xuICogaHR0cDovL3d3dy5zbWFydG1lbnVzLm9yZy9cbiAqXG4gKiBDb3B5cmlnaHQgVmFzaWwgRGlua292LCBWYWRpa29tIFdlYiBMdGQuXG4gKiBodHRwOi8vdmFkaWtvbS5jb20vXG4gKlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4oZnVuY3Rpb24oZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIGpRdWVyeVxuXHRcdGZhY3RvcnkoalF1ZXJ5KTtcblx0fVxufSAoZnVuY3Rpb24oJCkge1xuXG5cdHZhciBtZW51VHJlZXMgPSBbXSxcblx0XHRtb3VzZSA9IGZhbHNlLCAvLyBvcHRpbWl6ZSBmb3IgdG91Y2ggYnkgZGVmYXVsdCAtIHdlIHdpbGwgZGV0ZWN0IGZvciBtb3VzZSBpbnB1dFxuXHRcdHRvdWNoRXZlbnRzID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93LCAvLyB3ZSB1c2UgdGhpcyBqdXN0IHRvIGNob29zZSBiZXR3ZWVuIHRvdWNuIGFuZCBwb2ludGVyIGV2ZW50cywgbm90IGZvciB0b3VjaCBzY3JlZW4gZGV0ZWN0aW9uXG5cdFx0bW91c2VEZXRlY3Rpb25FbmFibGVkID0gZmFsc2UsXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBmdW5jdGlvbihjYWxsYmFjaykgeyByZXR1cm4gc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTsgfSxcblx0XHRjYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCBmdW5jdGlvbihpZCkgeyBjbGVhclRpbWVvdXQoaWQpOyB9LFxuXHRcdGNhbkFuaW1hdGUgPSAhISQuZm4uYW5pbWF0ZTtcblxuXHQvLyBIYW5kbGUgZGV0ZWN0aW9uIGZvciBtb3VzZSBpbnB1dCAoaS5lLiBkZXNrdG9wIGJyb3dzZXJzLCB0YWJsZXRzIHdpdGggYSBtb3VzZSwgZXRjLilcblx0ZnVuY3Rpb24gaW5pdE1vdXNlRGV0ZWN0aW9uKGRpc2FibGUpIHtcblx0XHR2YXIgZU5TID0gJy5zbWFydG1lbnVzX21vdXNlJztcblx0XHRpZiAoIW1vdXNlRGV0ZWN0aW9uRW5hYmxlZCAmJiAhZGlzYWJsZSkge1xuXHRcdFx0Ly8gaWYgd2UgZ2V0IHR3byBjb25zZWN1dGl2ZSBtb3VzZW1vdmVzIHdpdGhpbiAyIHBpeGVscyBmcm9tIGVhY2ggb3RoZXIgYW5kIHdpdGhpbiAzMDBtcywgd2UgYXNzdW1lIGEgcmVhbCBtb3VzZS9jdXJzb3IgaXMgcHJlc2VudFxuXHRcdFx0Ly8gaW4gcHJhY3RpY2UsIHRoaXMgc2VlbXMgbGlrZSBpbXBvc3NpYmxlIHRvIHRyaWNrIHVuaW50ZW50aWFuYWxseSB3aXRoIGEgcmVhbCBtb3VzZSBhbmQgYSBwcmV0dHkgc2FmZSBkZXRlY3Rpb24gb24gdG91Y2ggZGV2aWNlcyAoZXZlbiB3aXRoIG9sZGVyIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgdG91Y2ggZXZlbnRzKVxuXHRcdFx0dmFyIGZpcnN0VGltZSA9IHRydWUsXG5cdFx0XHRcdGxhc3RNb3ZlID0gbnVsbCxcblx0XHRcdFx0ZXZlbnRzID0ge1xuXHRcdFx0XHRcdCdtb3VzZW1vdmUnOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHR2YXIgdGhpc01vdmUgPSB7IHg6IGUucGFnZVgsIHk6IGUucGFnZVksIHRpbWVTdGFtcDogbmV3IERhdGUoKS5nZXRUaW1lKCkgfTtcblx0XHRcdFx0XHRcdGlmIChsYXN0TW92ZSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgZGVsdGFYID0gTWF0aC5hYnMobGFzdE1vdmUueCAtIHRoaXNNb3ZlLngpLFxuXHRcdFx0XHRcdFx0XHRcdGRlbHRhWSA9IE1hdGguYWJzKGxhc3RNb3ZlLnkgLSB0aGlzTW92ZS55KTtcblx0XHQgXHRcdFx0XHRcdGlmICgoZGVsdGFYID4gMCB8fCBkZWx0YVkgPiAwKSAmJiBkZWx0YVggPD0gMiAmJiBkZWx0YVkgPD0gMiAmJiB0aGlzTW92ZS50aW1lU3RhbXAgLSBsYXN0TW92ZS50aW1lU3RhbXAgPD0gMzAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0bW91c2UgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdC8vIGlmIHRoaXMgaXMgdGhlIGZpcnN0IGNoZWNrIGFmdGVyIHBhZ2UgbG9hZCwgY2hlY2sgaWYgd2UgYXJlIG5vdCBvdmVyIHNvbWUgaXRlbSBieSBjaGFuY2UgYW5kIGNhbGwgdGhlIG1vdXNlZW50ZXIgaGFuZGxlciBpZiB5ZXNcblx0XHRcdFx0XHRcdFx0XHRpZiAoZmlyc3RUaW1lKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgJGEgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCdhJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoJGEuaXMoJ2EnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkLmVhY2gobWVudVRyZWVzLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoJC5jb250YWlucyh0aGlzLiRyb290WzBdLCAkYVswXSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuaXRlbUVudGVyKHsgY3VycmVudFRhcmdldDogJGFbMF0gfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGZpcnN0VGltZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bGFzdE1vdmUgPSB0aGlzTW92ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHRldmVudHNbdG91Y2hFdmVudHMgPyAndG91Y2hzdGFydCcgOiAncG9pbnRlcm92ZXIgcG9pbnRlcm1vdmUgcG9pbnRlcm91dCBNU1BvaW50ZXJPdmVyIE1TUG9pbnRlck1vdmUgTVNQb2ludGVyT3V0J10gPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmIChpc1RvdWNoRXZlbnQoZS5vcmlnaW5hbEV2ZW50KSkge1xuXHRcdFx0XHRcdG1vdXNlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQkKGRvY3VtZW50KS5vbihnZXRFdmVudHNOUyhldmVudHMsIGVOUykpO1xuXHRcdFx0bW91c2VEZXRlY3Rpb25FbmFibGVkID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKG1vdXNlRGV0ZWN0aW9uRW5hYmxlZCAmJiBkaXNhYmxlKSB7XG5cdFx0XHQkKGRvY3VtZW50KS5vZmYoZU5TKTtcblx0XHRcdG1vdXNlRGV0ZWN0aW9uRW5hYmxlZCA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGlzVG91Y2hFdmVudChlKSB7XG5cdFx0cmV0dXJuICEvXig0fG1vdXNlKSQvLnRlc3QoZS5wb2ludGVyVHlwZSk7XG5cdH1cblxuXHQvLyByZXR1cm5zIGEgalF1ZXJ5IG9uKCkgcmVhZHkgb2JqZWN0XG5cdGZ1bmN0aW9uIGdldEV2ZW50c05TKGV2ZW50cywgZU5TKSB7XG5cdFx0aWYgKCFlTlMpIHtcblx0XHRcdGVOUyA9ICcnO1xuXHRcdH1cblx0XHR2YXIgZXZlbnRzTlMgPSB7fTtcblx0XHRmb3IgKHZhciBpIGluIGV2ZW50cykge1xuXHRcdFx0ZXZlbnRzTlNbaS5zcGxpdCgnICcpLmpvaW4oZU5TICsgJyAnKSArIGVOU10gPSBldmVudHNbaV07XG5cdFx0fVxuXHRcdHJldHVybiBldmVudHNOUztcblx0fVxuXG5cdCQuU21hcnRNZW51cyA9IGZ1bmN0aW9uKGVsbSwgb3B0aW9ucykge1xuXHRcdHRoaXMuJHJvb3QgPSAkKGVsbSk7XG5cdFx0dGhpcy5vcHRzID0gb3B0aW9ucztcblx0XHR0aGlzLnJvb3RJZCA9ICcnOyAvLyBpbnRlcm5hbFxuXHRcdHRoaXMuYWNjZXNzSWRQcmVmaXggPSAnJztcblx0XHR0aGlzLiRzdWJBcnJvdyA9IG51bGw7XG5cdFx0dGhpcy5hY3RpdmF0ZWRJdGVtcyA9IFtdOyAvLyBzdG9yZXMgbGFzdCBhY3RpdmF0ZWQgQSdzIGZvciBlYWNoIGxldmVsXG5cdFx0dGhpcy52aXNpYmxlU3ViTWVudXMgPSBbXTsgLy8gc3RvcmVzIHZpc2libGUgc3ViIG1lbnVzIFVMJ3MgKG1pZ2h0IGJlIGluIG5vIHBhcnRpY3VsYXIgb3JkZXIpXG5cdFx0dGhpcy5zaG93VGltZW91dCA9IDA7XG5cdFx0dGhpcy5oaWRlVGltZW91dCA9IDA7XG5cdFx0dGhpcy5zY3JvbGxUaW1lb3V0ID0gMDtcblx0XHR0aGlzLmNsaWNrQWN0aXZhdGVkID0gZmFsc2U7XG5cdFx0dGhpcy5mb2N1c0FjdGl2YXRlZCA9IGZhbHNlO1xuXHRcdHRoaXMuekluZGV4SW5jID0gMDtcblx0XHR0aGlzLmlkSW5jID0gMDtcblx0XHR0aGlzLiRmaXJzdExpbmsgPSBudWxsOyAvLyB3ZSdsbCB1c2UgdGhlc2UgZm9yIHNvbWUgdGVzdHNcblx0XHR0aGlzLiRmaXJzdFN1YiA9IG51bGw7IC8vIGF0IHJ1bnRpbWUgc28gd2UnbGwgY2FjaGUgdGhlbVxuXHRcdHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHR0aGlzLiRkaXNhYmxlT3ZlcmxheSA9IG51bGw7XG5cdFx0dGhpcy4kdG91Y2hTY3JvbGxpbmdTdWIgPSBudWxsO1xuXHRcdHRoaXMuY3NzVHJhbnNmb3JtczNkID0gJ3BlcnNwZWN0aXZlJyBpbiBlbG0uc3R5bGUgfHwgJ3dlYmtpdFBlcnNwZWN0aXZlJyBpbiBlbG0uc3R5bGU7XG5cdFx0dGhpcy53YXNDb2xsYXBzaWJsZSA9IGZhbHNlO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9O1xuXG5cdCQuZXh0ZW5kKCQuU21hcnRNZW51cywge1xuXHRcdGhpZGVBbGw6IGZ1bmN0aW9uKCkge1xuXHRcdFx0JC5lYWNoKG1lbnVUcmVlcywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRoaXMubWVudUhpZGVBbGwoKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24oKSB7XG5cdFx0XHR3aGlsZSAobWVudVRyZWVzLmxlbmd0aCkge1xuXHRcdFx0XHRtZW51VHJlZXNbMF0uZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdFx0aW5pdE1vdXNlRGV0ZWN0aW9uKHRydWUpO1xuXHRcdH0sXG5cdFx0cHJvdG90eXBlOiB7XG5cdFx0XHRpbml0OiBmdW5jdGlvbihyZWZyZXNoKSB7XG5cdFx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0XHRpZiAoIXJlZnJlc2gpIHtcblx0XHRcdFx0XHRtZW51VHJlZXMucHVzaCh0aGlzKTtcblxuXHRcdFx0XHRcdHRoaXMucm9vdElkID0gKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgTWF0aC5yYW5kb20oKSArICcnKS5yZXBsYWNlKC9cXEQvZywgJycpO1xuXHRcdFx0XHRcdHRoaXMuYWNjZXNzSWRQcmVmaXggPSAnc20tJyArIHRoaXMucm9vdElkICsgJy0nO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuJHJvb3QuaGFzQ2xhc3MoJ3NtLXJ0bCcpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wdHMucmlnaHRUb0xlZnRTdWJNZW51cyA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gaW5pdCByb290IChtYWluIG1lbnUpXG5cdFx0XHRcdFx0dmFyIGVOUyA9ICcuc21hcnRtZW51cyc7XG5cdFx0XHRcdFx0dGhpcy4kcm9vdFxuXHRcdFx0XHRcdFx0LmRhdGEoJ3NtYXJ0bWVudXMnLCB0aGlzKVxuXHRcdFx0XHRcdFx0LmF0dHIoJ2RhdGEtc21hcnRtZW51cy1pZCcsIHRoaXMucm9vdElkKVxuXHRcdFx0XHRcdFx0LmRhdGFTTSgnbGV2ZWwnLCAxKVxuXHRcdFx0XHRcdFx0Lm9uKGdldEV2ZW50c05TKHtcblx0XHRcdFx0XHRcdFx0J21vdXNlb3ZlciBmb2N1c2luJzogJC5wcm94eSh0aGlzLnJvb3RPdmVyLCB0aGlzKSxcblx0XHRcdFx0XHRcdFx0J21vdXNlb3V0IGZvY3Vzb3V0JzogJC5wcm94eSh0aGlzLnJvb3RPdXQsIHRoaXMpLFxuXHRcdFx0XHRcdFx0XHQna2V5ZG93bic6ICQucHJveHkodGhpcy5yb290S2V5RG93biwgdGhpcylcblx0XHRcdFx0XHRcdH0sIGVOUykpXG5cdFx0XHRcdFx0XHQub24oZ2V0RXZlbnRzTlMoe1xuXHRcdFx0XHRcdFx0XHQnbW91c2VlbnRlcic6ICQucHJveHkodGhpcy5pdGVtRW50ZXIsIHRoaXMpLFxuXHRcdFx0XHRcdFx0XHQnbW91c2VsZWF2ZSc6ICQucHJveHkodGhpcy5pdGVtTGVhdmUsIHRoaXMpLFxuXHRcdFx0XHRcdFx0XHQnbW91c2Vkb3duJzogJC5wcm94eSh0aGlzLml0ZW1Eb3duLCB0aGlzKSxcblx0XHRcdFx0XHRcdFx0J2ZvY3VzJzogJC5wcm94eSh0aGlzLml0ZW1Gb2N1cywgdGhpcyksXG5cdFx0XHRcdFx0XHRcdCdibHVyJzogJC5wcm94eSh0aGlzLml0ZW1CbHVyLCB0aGlzKSxcblx0XHRcdFx0XHRcdFx0J2NsaWNrJzogJC5wcm94eSh0aGlzLml0ZW1DbGljaywgdGhpcylcblx0XHRcdFx0XHRcdH0sIGVOUyksICdhJyk7XG5cblx0XHRcdFx0XHQvLyBoaWRlIG1lbnVzIG9uIHRhcCBvciBjbGljayBvdXRzaWRlIHRoZSByb290IFVMXG5cdFx0XHRcdFx0ZU5TICs9IHRoaXMucm9vdElkO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdHMuaGlkZU9uQ2xpY2spIHtcblx0XHRcdFx0XHRcdCQoZG9jdW1lbnQpLm9uKGdldEV2ZW50c05TKHtcblx0XHRcdFx0XHRcdFx0J3RvdWNoc3RhcnQnOiAkLnByb3h5KHRoaXMuZG9jVG91Y2hTdGFydCwgdGhpcyksXG5cdFx0XHRcdFx0XHRcdCd0b3VjaG1vdmUnOiAkLnByb3h5KHRoaXMuZG9jVG91Y2hNb3ZlLCB0aGlzKSxcblx0XHRcdFx0XHRcdFx0J3RvdWNoZW5kJzogJC5wcm94eSh0aGlzLmRvY1RvdWNoRW5kLCB0aGlzKSxcblx0XHRcdFx0XHRcdFx0Ly8gZm9yIE9wZXJhIE1vYmlsZSA8IDExLjUsIHdlYk9TIGJyb3dzZXIsIGV0Yy4gd2UnbGwgY2hlY2sgY2xpY2sgdG9vXG5cdFx0XHRcdFx0XHRcdCdjbGljayc6ICQucHJveHkodGhpcy5kb2NDbGljaywgdGhpcylcblx0XHRcdFx0XHRcdH0sIGVOUykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBoaWRlIHN1YiBtZW51cyBvbiByZXNpemVcblx0XHRcdFx0XHQkKHdpbmRvdykub24oZ2V0RXZlbnRzTlMoeyAncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJzogJC5wcm94eSh0aGlzLndpblJlc2l6ZSwgdGhpcykgfSwgZU5TKSk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5vcHRzLnN1YkluZGljYXRvcnMpIHtcblx0XHRcdFx0XHRcdHRoaXMuJHN1YkFycm93ID0gJCgnPHNwYW4vPicpLmFkZENsYXNzKCdzdWItYXJyb3cnKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wdHMuc3ViSW5kaWNhdG9yc1RleHQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy4kc3ViQXJyb3cuaHRtbCh0aGlzLm9wdHMuc3ViSW5kaWNhdG9yc1RleHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIG1ha2Ugc3VyZSBtb3VzZSBkZXRlY3Rpb24gaXMgZW5hYmxlZFxuXHRcdFx0XHRcdGluaXRNb3VzZURldGVjdGlvbigpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gaW5pdCBzdWIgbWVudXNcblx0XHRcdFx0dGhpcy4kZmlyc3RTdWIgPSB0aGlzLiRyb290LmZpbmQoJ3VsJykuZWFjaChmdW5jdGlvbigpIHsgc2VsZi5tZW51SW5pdCgkKHRoaXMpKTsgfSkuZXEoMCk7XG5cblx0XHRcdFx0dGhpcy4kZmlyc3RMaW5rID0gdGhpcy4kcm9vdC5maW5kKCdhJykuZXEoMCk7XG5cblx0XHRcdFx0Ly8gZmluZCBjdXJyZW50IGl0ZW1cblx0XHRcdFx0aWYgKHRoaXMub3B0cy5tYXJrQ3VycmVudEl0ZW0pIHtcblx0XHRcdFx0XHR2YXIgcmVEZWZhdWx0RG9jID0gLyhpbmRleHxkZWZhdWx0KVxcLlteI1xcP1xcL10qL2ksXG5cdFx0XHRcdFx0XHRyZUhhc2ggPSAvIy4qLyxcblx0XHRcdFx0XHRcdGxvY0hyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKHJlRGVmYXVsdERvYywgJycpLFxuXHRcdFx0XHRcdFx0bG9jSHJlZk5vSGFzaCA9IGxvY0hyZWYucmVwbGFjZShyZUhhc2gsICcnKTtcblx0XHRcdFx0XHR0aGlzLiRyb290LmZpbmQoJ2E6bm90KC5tZWdhLW1lbnUgYSknKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIGhyZWYgPSB0aGlzLmhyZWYucmVwbGFjZShyZURlZmF1bHREb2MsICcnKSxcblx0XHRcdFx0XHRcdFx0JHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHRcdFx0aWYgKGhyZWYgPT0gbG9jSHJlZiB8fCBocmVmID09IGxvY0hyZWZOb0hhc2gpIHtcblx0XHRcdFx0XHRcdFx0JHRoaXMuYWRkQ2xhc3MoJ2N1cnJlbnQnKTtcblx0XHRcdFx0XHRcdFx0aWYgKHNlbGYub3B0cy5tYXJrQ3VycmVudFRyZWUpIHtcblx0XHRcdFx0XHRcdFx0XHQkdGhpcy5wYXJlbnRzVW50aWwoJ1tkYXRhLXNtYXJ0bWVudXMtaWRdJywgJ3VsJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykuZGF0YVNNKCdwYXJlbnQtYScpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHNhdmUgaW5pdGlhbCBzdGF0ZVxuXHRcdFx0XHR0aGlzLndhc0NvbGxhcHNpYmxlID0gdGhpcy5pc0NvbGxhcHNpYmxlKCk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVzdHJveTogZnVuY3Rpb24ocmVmcmVzaCkge1xuXHRcdFx0XHRpZiAoIXJlZnJlc2gpIHtcblx0XHRcdFx0XHR2YXIgZU5TID0gJy5zbWFydG1lbnVzJztcblx0XHRcdFx0XHR0aGlzLiRyb290XG5cdFx0XHRcdFx0XHQucmVtb3ZlRGF0YSgnc21hcnRtZW51cycpXG5cdFx0XHRcdFx0XHQucmVtb3ZlQXR0cignZGF0YS1zbWFydG1lbnVzLWlkJylcblx0XHRcdFx0XHRcdC5yZW1vdmVEYXRhU00oJ2xldmVsJylcblx0XHRcdFx0XHRcdC5vZmYoZU5TKTtcblx0XHRcdFx0XHRlTlMgKz0gdGhpcy5yb290SWQ7XG5cdFx0XHRcdFx0JChkb2N1bWVudCkub2ZmKGVOUyk7XG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9mZihlTlMpO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdHMuc3ViSW5kaWNhdG9ycykge1xuXHRcdFx0XHRcdFx0dGhpcy4kc3ViQXJyb3cgPSBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLm1lbnVIaWRlQWxsKCk7XG5cdFx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdFx0dGhpcy4kcm9vdC5maW5kKCd1bCcpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHRcdFx0aWYgKCR0aGlzLmRhdGFTTSgnc2Nyb2xsLWFycm93cycpKSB7XG5cdFx0XHRcdFx0XHRcdCR0aGlzLmRhdGFTTSgnc2Nyb2xsLWFycm93cycpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCR0aGlzLmRhdGFTTSgnc2hvd24tYmVmb3JlJykpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNlbGYub3B0cy5zdWJNZW51c01pbldpZHRoIHx8IHNlbGYub3B0cy5zdWJNZW51c01heFdpZHRoKSB7XG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMuY3NzKHsgd2lkdGg6ICcnLCBtaW5XaWR0aDogJycsIG1heFdpZHRoOiAnJyB9KS5yZW1vdmVDbGFzcygnc20tbm93cmFwJyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCR0aGlzLmRhdGFTTSgnc2Nyb2xsLWFycm93cycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMuZGF0YVNNKCdzY3JvbGwtYXJyb3dzJykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0JHRoaXMuY3NzKHsgekluZGV4OiAnJywgdG9wOiAnJywgbGVmdDogJycsIG1hcmdpbkxlZnQ6ICcnLCBtYXJnaW5Ub3A6ICcnLCBkaXNwbGF5OiAnJyB9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICgoJHRoaXMuYXR0cignaWQnKSB8fCAnJykuaW5kZXhPZihzZWxmLmFjY2Vzc0lkUHJlZml4KSA9PSAwKSB7XG5cdFx0XHRcdFx0XHRcdCR0aGlzLnJlbW92ZUF0dHIoJ2lkJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQucmVtb3ZlRGF0YVNNKCdpbi1tZWdhJylcblx0XHRcdFx0XHQucmVtb3ZlRGF0YVNNKCdzaG93bi1iZWZvcmUnKVxuXHRcdFx0XHRcdC5yZW1vdmVEYXRhU00oJ3Njcm9sbC1hcnJvd3MnKVxuXHRcdFx0XHRcdC5yZW1vdmVEYXRhU00oJ3BhcmVudC1hJylcblx0XHRcdFx0XHQucmVtb3ZlRGF0YVNNKCdsZXZlbCcpXG5cdFx0XHRcdFx0LnJlbW92ZURhdGFTTSgnYmVmb3JlZmlyc3RzaG93ZmlyZWQnKVxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdyb2xlJylcblx0XHRcdFx0XHQucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4nKVxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdhcmlhLWxhYmVsbGVkYnknKVxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdhcmlhLWV4cGFuZGVkJyk7XG5cdFx0XHRcdHRoaXMuJHJvb3QuZmluZCgnYS5oYXMtc3VibWVudScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHRcdFx0aWYgKCR0aGlzLmF0dHIoJ2lkJykuaW5kZXhPZihzZWxmLmFjY2Vzc0lkUHJlZml4KSA9PSAwKSB7XG5cdFx0XHRcdFx0XHRcdCR0aGlzLnJlbW92ZUF0dHIoJ2lkJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2hhcy1zdWJtZW51Jylcblx0XHRcdFx0XHQucmVtb3ZlRGF0YVNNKCdzdWInKVxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdhcmlhLWhhc3BvcHVwJylcblx0XHRcdFx0XHQucmVtb3ZlQXR0cignYXJpYS1jb250cm9scycpXG5cdFx0XHRcdFx0LnJlbW92ZUF0dHIoJ2FyaWEtZXhwYW5kZWQnKVxuXHRcdFx0XHRcdC5jbG9zZXN0KCdsaScpLnJlbW92ZURhdGFTTSgnc3ViJyk7XG5cdFx0XHRcdGlmICh0aGlzLm9wdHMuc3ViSW5kaWNhdG9ycykge1xuXHRcdFx0XHRcdHRoaXMuJHJvb3QuZmluZCgnc3Bhbi5zdWItYXJyb3cnKS5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5vcHRzLm1hcmtDdXJyZW50SXRlbSkge1xuXHRcdFx0XHRcdHRoaXMuJHJvb3QuZmluZCgnYS5jdXJyZW50JykucmVtb3ZlQ2xhc3MoJ2N1cnJlbnQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXJlZnJlc2gpIHtcblx0XHRcdFx0XHR0aGlzLiRyb290ID0gbnVsbDtcblx0XHRcdFx0XHR0aGlzLiRmaXJzdExpbmsgPSBudWxsO1xuXHRcdFx0XHRcdHRoaXMuJGZpcnN0U3ViID0gbnVsbDtcblx0XHRcdFx0XHRpZiAodGhpcy4kZGlzYWJsZU92ZXJsYXkpIHtcblx0XHRcdFx0XHRcdHRoaXMuJGRpc2FibGVPdmVybGF5LnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0dGhpcy4kZGlzYWJsZU92ZXJsYXkgPSBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtZW51VHJlZXMuc3BsaWNlKCQuaW5BcnJheSh0aGlzLCBtZW51VHJlZXMpLCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKG5vT3ZlcmxheSkge1xuXHRcdFx0XHRpZiAoIXRoaXMuZGlzYWJsZWQpIHtcblx0XHRcdFx0XHR0aGlzLm1lbnVIaWRlQWxsKCk7XG5cdFx0XHRcdFx0Ly8gZGlzcGxheSBvdmVybGF5IG92ZXIgdGhlIG1lbnUgdG8gcHJldmVudCBpbnRlcmFjdGlvblxuXHRcdFx0XHRcdGlmICghbm9PdmVybGF5ICYmICF0aGlzLm9wdHMuaXNQb3B1cCAmJiB0aGlzLiRyb290LmlzKCc6dmlzaWJsZScpKSB7XG5cdFx0XHRcdFx0XHR2YXIgcG9zID0gdGhpcy4kcm9vdC5vZmZzZXQoKTtcblx0XHRcdFx0XHRcdHRoaXMuJGRpc2FibGVPdmVybGF5ID0gJCgnPGRpdiBjbGFzcz1cInNtLWpxdWVyeS1kaXNhYmxlLW92ZXJsYXlcIi8+JykuY3NzKHtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHRcdFx0XHRcdHRvcDogcG9zLnRvcCxcblx0XHRcdFx0XHRcdFx0bGVmdDogcG9zLmxlZnQsXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiB0aGlzLiRyb290Lm91dGVyV2lkdGgoKSxcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiB0aGlzLiRyb290Lm91dGVySGVpZ2h0KCksXG5cdFx0XHRcdFx0XHRcdHpJbmRleDogdGhpcy5nZXRTdGFydFpJbmRleCh0cnVlKSxcblx0XHRcdFx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0XHRcdFx0fSkuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZG9jQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0aWYgKHRoaXMuJHRvdWNoU2Nyb2xsaW5nU3ViKSB7XG5cdFx0XHRcdFx0dGhpcy4kdG91Y2hTY3JvbGxpbmdTdWIgPSBudWxsO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBoaWRlIG9uIGFueSBjbGljayBvdXRzaWRlIHRoZSBtZW51IG9yIG9uIGEgbWVudSBsaW5rXG5cdFx0XHRcdGlmICh0aGlzLnZpc2libGVTdWJNZW51cy5sZW5ndGggJiYgISQuY29udGFpbnModGhpcy4kcm9vdFswXSwgZS50YXJnZXQpIHx8ICQoZS50YXJnZXQpLmNsb3Nlc3QoJ2EnKS5sZW5ndGgpIHtcblx0XHRcdFx0XHR0aGlzLm1lbnVIaWRlQWxsKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkb2NUb3VjaEVuZDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZiAoIXRoaXMubGFzdFRvdWNoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLnZpc2libGVTdWJNZW51cy5sZW5ndGggJiYgKHRoaXMubGFzdFRvdWNoLngyID09PSB1bmRlZmluZWQgfHwgdGhpcy5sYXN0VG91Y2gueDEgPT0gdGhpcy5sYXN0VG91Y2gueDIpICYmICh0aGlzLmxhc3RUb3VjaC55MiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubGFzdFRvdWNoLnkxID09IHRoaXMubGFzdFRvdWNoLnkyKSAmJiAoIXRoaXMubGFzdFRvdWNoLnRhcmdldCB8fCAhJC5jb250YWlucyh0aGlzLiRyb290WzBdLCB0aGlzLmxhc3RUb3VjaC50YXJnZXQpKSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmhpZGVUaW1lb3V0KSB7XG5cdFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5oaWRlVGltZW91dCk7XG5cdFx0XHRcdFx0XHR0aGlzLmhpZGVUaW1lb3V0ID0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gaGlkZSB3aXRoIGEgZGVsYXkgdG8gcHJldmVudCB0cmlnZ2VyaW5nIGFjY2lkZW50YWwgdW53YW50ZWQgY2xpY2sgb24gc29tZSBwYWdlIGVsZW1lbnRcblx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRcdFx0dGhpcy5oaWRlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHNlbGYubWVudUhpZGVBbGwoKTsgfSwgMzUwKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmxhc3RUb3VjaCA9IG51bGw7XG5cdFx0XHR9LFxuXHRcdFx0ZG9jVG91Y2hNb3ZlOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICghdGhpcy5sYXN0VG91Y2gpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIHRvdWNoUG9pbnQgPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXTtcblx0XHRcdFx0dGhpcy5sYXN0VG91Y2gueDIgPSB0b3VjaFBvaW50LnBhZ2VYO1xuXHRcdFx0XHR0aGlzLmxhc3RUb3VjaC55MiA9IHRvdWNoUG9pbnQucGFnZVk7XG5cdFx0XHR9LFxuXHRcdFx0ZG9jVG91Y2hTdGFydDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHR2YXIgdG91Y2hQb2ludCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdO1xuXHRcdFx0XHR0aGlzLmxhc3RUb3VjaCA9IHsgeDE6IHRvdWNoUG9pbnQucGFnZVgsIHkxOiB0b3VjaFBvaW50LnBhZ2VZLCB0YXJnZXQ6IHRvdWNoUG9pbnQudGFyZ2V0IH07XG5cdFx0XHR9LFxuXHRcdFx0ZW5hYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKHRoaXMuZGlzYWJsZWQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy4kZGlzYWJsZU92ZXJsYXkpIHtcblx0XHRcdFx0XHRcdHRoaXMuJGRpc2FibGVPdmVybGF5LnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0dGhpcy4kZGlzYWJsZU92ZXJsYXkgPSBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRnZXRDbG9zZXN0TWVudTogZnVuY3Rpb24oZWxtKSB7XG5cdFx0XHRcdHZhciAkY2xvc2VzdE1lbnUgPSAkKGVsbSkuY2xvc2VzdCgndWwnKTtcblx0XHRcdFx0d2hpbGUgKCRjbG9zZXN0TWVudS5kYXRhU00oJ2luLW1lZ2EnKSkge1xuXHRcdFx0XHRcdCRjbG9zZXN0TWVudSA9ICRjbG9zZXN0TWVudS5wYXJlbnQoKS5jbG9zZXN0KCd1bCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAkY2xvc2VzdE1lbnVbMF0gfHwgbnVsbDtcblx0XHRcdH0sXG5cdFx0XHRnZXRIZWlnaHQ6IGZ1bmN0aW9uKCRlbG0pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0T2Zmc2V0KCRlbG0sIHRydWUpO1xuXHRcdFx0fSxcblx0XHRcdC8vIHJldHVybnMgcHJlY2lzZSB3aWR0aC9oZWlnaHQgZmxvYXQgdmFsdWVzXG5cdFx0XHRnZXRPZmZzZXQ6IGZ1bmN0aW9uKCRlbG0sIGhlaWdodCkge1xuXHRcdFx0XHR2YXIgb2xkO1xuXHRcdFx0XHRpZiAoJGVsbS5jc3MoJ2Rpc3BsYXknKSA9PSAnbm9uZScpIHtcblx0XHRcdFx0XHRvbGQgPSB7IHBvc2l0aW9uOiAkZWxtWzBdLnN0eWxlLnBvc2l0aW9uLCB2aXNpYmlsaXR5OiAkZWxtWzBdLnN0eWxlLnZpc2liaWxpdHkgfTtcblx0XHRcdFx0XHQkZWxtLmNzcyh7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB2aXNpYmlsaXR5OiAnaGlkZGVuJyB9KS5zaG93KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGJveCA9ICRlbG1bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICYmICRlbG1bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHRcdFx0dmFsID0gYm94ICYmIChoZWlnaHQgPyBib3guaGVpZ2h0IHx8IGJveC5ib3R0b20gLSBib3gudG9wIDogYm94LndpZHRoIHx8IGJveC5yaWdodCAtIGJveC5sZWZ0KTtcblx0XHRcdFx0aWYgKCF2YWwgJiYgdmFsICE9PSAwKSB7XG5cdFx0XHRcdFx0dmFsID0gaGVpZ2h0ID8gJGVsbVswXS5vZmZzZXRIZWlnaHQgOiAkZWxtWzBdLm9mZnNldFdpZHRoO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvbGQpIHtcblx0XHRcdFx0XHQkZWxtLmhpZGUoKS5jc3Mob2xkKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsO1xuXHRcdFx0fSxcblx0XHRcdGdldFN0YXJ0WkluZGV4OiBmdW5jdGlvbihyb290KSB7XG5cdFx0XHRcdHZhciB6SW5kZXggPSBwYXJzZUludCh0aGlzW3Jvb3QgPyAnJHJvb3QnIDogJyRmaXJzdFN1YiddLmNzcygnei1pbmRleCcpKTtcblx0XHRcdFx0aWYgKCFyb290ICYmIGlzTmFOKHpJbmRleCkpIHtcblx0XHRcdFx0XHR6SW5kZXggPSBwYXJzZUludCh0aGlzLiRyb290LmNzcygnei1pbmRleCcpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gIWlzTmFOKHpJbmRleCkgPyB6SW5kZXggOiAxO1xuXHRcdFx0fSxcblx0XHRcdGdldFRvdWNoUG9pbnQ6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0cmV0dXJuIGUudG91Y2hlcyAmJiBlLnRvdWNoZXNbMF0gfHwgZS5jaGFuZ2VkVG91Y2hlcyAmJiBlLmNoYW5nZWRUb3VjaGVzWzBdIHx8IGU7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0Vmlld3BvcnQ6IGZ1bmN0aW9uKGhlaWdodCkge1xuXHRcdFx0XHR2YXIgbmFtZSA9IGhlaWdodCA/ICdIZWlnaHQnIDogJ1dpZHRoJyxcblx0XHRcdFx0XHR2YWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbJ2NsaWVudCcgKyBuYW1lXSxcblx0XHRcdFx0XHR2YWwyID0gd2luZG93Wydpbm5lcicgKyBuYW1lXTtcblx0XHRcdFx0aWYgKHZhbDIpIHtcblx0XHRcdFx0XHR2YWwgPSBNYXRoLm1pbih2YWwsIHZhbDIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2YWw7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0Vmlld3BvcnRIZWlnaHQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWaWV3cG9ydCh0cnVlKTtcblx0XHRcdH0sXG5cdFx0XHRnZXRWaWV3cG9ydFdpZHRoOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0Vmlld3BvcnQoKTtcblx0XHRcdH0sXG5cdFx0XHRnZXRXaWR0aDogZnVuY3Rpb24oJGVsbSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRPZmZzZXQoJGVsbSk7XG5cdFx0XHR9LFxuXHRcdFx0aGFuZGxlRXZlbnRzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICF0aGlzLmRpc2FibGVkICYmIHRoaXMuaXNDU1NPbigpO1xuXHRcdFx0fSxcblx0XHRcdGhhbmRsZUl0ZW1FdmVudHM6IGZ1bmN0aW9uKCRhKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmhhbmRsZUV2ZW50cygpICYmICF0aGlzLmlzTGlua0luTWVnYU1lbnUoJGEpO1xuXHRcdFx0fSxcblx0XHRcdGlzQ29sbGFwc2libGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy4kZmlyc3RTdWIuY3NzKCdwb3NpdGlvbicpID09ICdzdGF0aWMnO1xuXHRcdFx0fSxcblx0XHRcdGlzQ1NTT246IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy4kZmlyc3RMaW5rLmNzcygnZGlzcGxheScpICE9ICdpbmxpbmUnO1xuXHRcdFx0fSxcblx0XHRcdGlzRml4ZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgaXNGaXhlZCA9IHRoaXMuJHJvb3QuY3NzKCdwb3NpdGlvbicpID09ICdmaXhlZCc7XG5cdFx0XHRcdGlmICghaXNGaXhlZCkge1xuXHRcdFx0XHRcdHRoaXMuJHJvb3QucGFyZW50c1VudGlsKCdib2R5JykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmICgkKHRoaXMpLmNzcygncG9zaXRpb24nKSA9PSAnZml4ZWQnKSB7XG5cdFx0XHRcdFx0XHRcdGlzRml4ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGlzRml4ZWQ7XG5cdFx0XHR9LFxuXHRcdFx0aXNMaW5rSW5NZWdhTWVudTogZnVuY3Rpb24oJGEpIHtcblx0XHRcdFx0cmV0dXJuICQodGhpcy5nZXRDbG9zZXN0TWVudSgkYVswXSkpLmhhc0NsYXNzKCdtZWdhLW1lbnUnKTtcblx0XHRcdH0sXG5cdFx0XHRpc1RvdWNoTW9kZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhbW91c2UgfHwgdGhpcy5vcHRzLm5vTW91c2VPdmVyIHx8IHRoaXMuaXNDb2xsYXBzaWJsZSgpO1xuXHRcdFx0fSxcblx0XHRcdGl0ZW1BY3RpdmF0ZTogZnVuY3Rpb24oJGEsIGhpZGVEZWVwZXJTdWJzKSB7XG5cdFx0XHRcdHZhciAkdWwgPSAkYS5jbG9zZXN0KCd1bCcpLFxuXHRcdFx0XHRcdGxldmVsID0gJHVsLmRhdGFTTSgnbGV2ZWwnKTtcblx0XHRcdFx0Ly8gaWYgZm9yIHNvbWUgcmVhc29uIHRoZSBwYXJlbnQgaXRlbSBpcyBub3QgYWN0aXZhdGVkIChlLmcuIHRoaXMgaXMgYW4gQVBJIGNhbGwgdG8gYWN0aXZhdGUgdGhlIGl0ZW0pLCBhY3RpdmF0ZSBhbGwgcGFyZW50IGl0ZW1zIGZpcnN0XG5cdFx0XHRcdGlmIChsZXZlbCA+IDEgJiYgKCF0aGlzLmFjdGl2YXRlZEl0ZW1zW2xldmVsIC0gMl0gfHwgdGhpcy5hY3RpdmF0ZWRJdGVtc1tsZXZlbCAtIDJdWzBdICE9ICR1bC5kYXRhU00oJ3BhcmVudC1hJylbMF0pKSB7XG5cdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0XHRcdCQoJHVsLnBhcmVudHNVbnRpbCgnW2RhdGEtc21hcnRtZW51cy1pZF0nLCAndWwnKS5nZXQoKS5yZXZlcnNlKCkpLmFkZCgkdWwpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRzZWxmLml0ZW1BY3RpdmF0ZSgkKHRoaXMpLmRhdGFTTSgncGFyZW50LWEnKSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gaGlkZSBhbnkgdmlzaWJsZSBkZWVwZXIgbGV2ZWwgc3ViIG1lbnVzXG5cdFx0XHRcdGlmICghdGhpcy5pc0NvbGxhcHNpYmxlKCkgfHwgaGlkZURlZXBlclN1YnMpIHtcblx0XHRcdFx0XHR0aGlzLm1lbnVIaWRlU3ViTWVudXMoIXRoaXMuYWN0aXZhdGVkSXRlbXNbbGV2ZWwgLSAxXSB8fCB0aGlzLmFjdGl2YXRlZEl0ZW1zW2xldmVsIC0gMV1bMF0gIT0gJGFbMF0gPyBsZXZlbCAtIDEgOiBsZXZlbCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gc2F2ZSBuZXcgYWN0aXZlIGl0ZW0gZm9yIHRoaXMgbGV2ZWxcblx0XHRcdFx0dGhpcy5hY3RpdmF0ZWRJdGVtc1tsZXZlbCAtIDFdID0gJGE7XG5cdFx0XHRcdGlmICh0aGlzLiRyb290LnRyaWdnZXJIYW5kbGVyKCdhY3RpdmF0ZS5zbWFwaScsICRhWzBdKSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gc2hvdyB0aGUgc3ViIG1lbnUgaWYgdGhpcyBpdGVtIGhhcyBvbmVcblx0XHRcdFx0dmFyICRzdWIgPSAkYS5kYXRhU00oJ3N1YicpO1xuXHRcdFx0XHRpZiAoJHN1YiAmJiAodGhpcy5pc1RvdWNoTW9kZSgpIHx8ICghdGhpcy5vcHRzLnNob3dPbkNsaWNrIHx8IHRoaXMuY2xpY2tBY3RpdmF0ZWQpKSkge1xuXHRcdFx0XHRcdHRoaXMubWVudVNob3coJHN1Yik7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpdGVtQmx1cjogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHR2YXIgJGEgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0XHRcdGlmICghdGhpcy5oYW5kbGVJdGVtRXZlbnRzKCRhKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLiRyb290LnRyaWdnZXJIYW5kbGVyKCdibHVyLnNtYXBpJywgJGFbMF0pO1xuXHRcdFx0fSxcblx0XHRcdGl0ZW1DbGljazogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHR2YXIgJGEgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0XHRcdGlmICghdGhpcy5oYW5kbGVJdGVtRXZlbnRzKCRhKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy4kdG91Y2hTY3JvbGxpbmdTdWIgJiYgdGhpcy4kdG91Y2hTY3JvbGxpbmdTdWJbMF0gPT0gJGEuY2xvc2VzdCgndWwnKVswXSkge1xuXHRcdFx0XHRcdHRoaXMuJHRvdWNoU2Nyb2xsaW5nU3ViID0gbnVsbDtcblx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy4kcm9vdC50cmlnZ2VySGFuZGxlcignY2xpY2suc21hcGknLCAkYVswXSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciAkc3ViID0gJGEuZGF0YVNNKCdzdWInKSxcblx0XHRcdFx0XHRmaXJzdExldmVsU3ViID0gJHN1YiA/ICRzdWIuZGF0YVNNKCdsZXZlbCcpID09IDIgOiBmYWxzZTtcblx0XHRcdFx0aWYgKCRzdWIpIHtcblx0XHRcdFx0XHR2YXIgc3ViQXJyb3dDbGlja2VkID0gJChlLnRhcmdldCkuaXMoJy5zdWItYXJyb3cnKSxcblx0XHRcdFx0XHRcdGNvbGxhcHNpYmxlID0gdGhpcy5pc0NvbGxhcHNpYmxlKCksXG5cdFx0XHRcdFx0XHRiZWhhdmlvclRvZ2dsZSA9IC90b2dnbGUkLy50ZXN0KHRoaXMub3B0cy5jb2xsYXBzaWJsZUJlaGF2aW9yKSxcblx0XHRcdFx0XHRcdGJlaGF2aW9yTGluayA9IC9saW5rJC8udGVzdCh0aGlzLm9wdHMuY29sbGFwc2libGVCZWhhdmlvciksXG5cdFx0XHRcdFx0XHRiZWhhdmlvckFjY29yZGlvbiA9IC9eYWNjb3JkaW9uLy50ZXN0KHRoaXMub3B0cy5jb2xsYXBzaWJsZUJlaGF2aW9yKTtcblx0XHRcdFx0XHQvLyBpZiB0aGUgc3ViIGlzIGhpZGRlbiwgdHJ5IHRvIHNob3cgaXRcblx0XHRcdFx0XHRpZiAoISRzdWIuaXMoJzp2aXNpYmxlJykpIHtcblx0XHRcdFx0XHRcdGlmICghYmVoYXZpb3JMaW5rIHx8ICFjb2xsYXBzaWJsZSB8fCBzdWJBcnJvd0NsaWNrZWQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMub3B0cy5zaG93T25DbGljayAmJiBmaXJzdExldmVsU3ViKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5jbGlja0FjdGl2YXRlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Ly8gdHJ5IHRvIGFjdGl2YXRlIHRoZSBpdGVtIGFuZCBzaG93IHRoZSBzdWJcblx0XHRcdFx0XHRcdFx0dGhpcy5pdGVtQWN0aXZhdGUoJGEsIGJlaGF2aW9yQWNjb3JkaW9uKTtcblx0XHRcdFx0XHRcdFx0Ly8gaWYgXCJpdGVtQWN0aXZhdGVcIiBzaG93ZWQgdGhlIHN1YiwgcHJldmVudCB0aGUgY2xpY2sgc28gdGhhdCB0aGUgbGluayBpcyBub3QgbG9hZGVkXG5cdFx0XHRcdFx0XHRcdC8vIGlmIGl0IGNvdWxkbid0IHNob3cgaXQsIHRoZW4gdGhlIHN1YiBtZW51cyBhcmUgZGlzYWJsZWQgd2l0aCBhbiAhaW1wb3J0YW50IGRlY2xhcmF0aW9uIChlLmcuIHZpYSBtb2JpbGUgc3R5bGVzKSBzbyBsZXQgdGhlIGxpbmsgZ2V0IGxvYWRlZFxuXHRcdFx0XHRcdFx0XHRpZiAoJHN1Yi5pcygnOnZpc2libGUnKSkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZm9jdXNBY3RpdmF0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGlmIHRoZSBzdWIgaXMgdmlzaWJsZSBhbmQgd2UgYXJlIGluIGNvbGxhcHNpYmxlIG1vZGVcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGNvbGxhcHNpYmxlICYmIChiZWhhdmlvclRvZ2dsZSB8fCBzdWJBcnJvd0NsaWNrZWQpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLml0ZW1BY3RpdmF0ZSgkYSwgYmVoYXZpb3JBY2NvcmRpb24pO1xuXHRcdFx0XHRcdFx0dGhpcy5tZW51SGlkZSgkc3ViKTtcblx0XHRcdFx0XHRcdGlmIChiZWhhdmlvclRvZ2dsZSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmZvY3VzQWN0aXZhdGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLm9wdHMuc2hvd09uQ2xpY2sgJiYgZmlyc3RMZXZlbFN1YiB8fCAkYS5oYXNDbGFzcygnZGlzYWJsZWQnKSB8fCB0aGlzLiRyb290LnRyaWdnZXJIYW5kbGVyKCdzZWxlY3Quc21hcGknLCAkYVswXSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aXRlbURvd246IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0dmFyICRhID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0XHRpZiAoIXRoaXMuaGFuZGxlSXRlbUV2ZW50cygkYSkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0JGEuZGF0YVNNKCdtb3VzZWRvd24nLCB0cnVlKTtcblx0XHRcdH0sXG5cdFx0XHRpdGVtRW50ZXI6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0dmFyICRhID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0XHRpZiAoIXRoaXMuaGFuZGxlSXRlbUV2ZW50cygkYSkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCF0aGlzLmlzVG91Y2hNb2RlKCkpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5zaG93VGltZW91dCkge1xuXHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuc2hvd1RpbWVvdXQpO1xuXHRcdFx0XHRcdFx0dGhpcy5zaG93VGltZW91dCA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdFx0XHR0aGlzLnNob3dUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHsgc2VsZi5pdGVtQWN0aXZhdGUoJGEpOyB9LCB0aGlzLm9wdHMuc2hvd09uQ2xpY2sgJiYgJGEuY2xvc2VzdCgndWwnKS5kYXRhU00oJ2xldmVsJykgPT0gMSA/IDEgOiB0aGlzLm9wdHMuc2hvd1RpbWVvdXQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuJHJvb3QudHJpZ2dlckhhbmRsZXIoJ21vdXNlZW50ZXIuc21hcGknLCAkYVswXSk7XG5cdFx0XHR9LFxuXHRcdFx0aXRlbUZvY3VzOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHZhciAkYSA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdFx0aWYgKCF0aGlzLmhhbmRsZUl0ZW1FdmVudHMoJGEpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGZpeCAodGhlIG1vdXNlZG93biBjaGVjayk6IGluIHNvbWUgYnJvd3NlcnMgYSB0YXAvY2xpY2sgcHJvZHVjZXMgY29uc2VjdXRpdmUgZm9jdXMgKyBjbGljayBldmVudHMgc28gd2UgZG9uJ3QgbmVlZCB0byBhY3RpdmF0ZSB0aGUgaXRlbSBvbiBmb2N1c1xuXHRcdFx0XHRpZiAodGhpcy5mb2N1c0FjdGl2YXRlZCAmJiAoIXRoaXMuaXNUb3VjaE1vZGUoKSB8fCAhJGEuZGF0YVNNKCdtb3VzZWRvd24nKSkgJiYgKCF0aGlzLmFjdGl2YXRlZEl0ZW1zLmxlbmd0aCB8fCB0aGlzLmFjdGl2YXRlZEl0ZW1zW3RoaXMuYWN0aXZhdGVkSXRlbXMubGVuZ3RoIC0gMV1bMF0gIT0gJGFbMF0pKSB7XG5cdFx0XHRcdFx0dGhpcy5pdGVtQWN0aXZhdGUoJGEsIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuJHJvb3QudHJpZ2dlckhhbmRsZXIoJ2ZvY3VzLnNtYXBpJywgJGFbMF0pO1xuXHRcdFx0fSxcblx0XHRcdGl0ZW1MZWF2ZTogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHR2YXIgJGEgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0XHRcdGlmICghdGhpcy5oYW5kbGVJdGVtRXZlbnRzKCRhKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXRoaXMuaXNUb3VjaE1vZGUoKSkge1xuXHRcdFx0XHRcdCRhWzBdLmJsdXIoKTtcblx0XHRcdFx0XHRpZiAodGhpcy5zaG93VGltZW91dCkge1xuXHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuc2hvd1RpbWVvdXQpO1xuXHRcdFx0XHRcdFx0dGhpcy5zaG93VGltZW91dCA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCRhLnJlbW92ZURhdGFTTSgnbW91c2Vkb3duJyk7XG5cdFx0XHRcdHRoaXMuJHJvb3QudHJpZ2dlckhhbmRsZXIoJ21vdXNlbGVhdmUuc21hcGknLCAkYVswXSk7XG5cdFx0XHR9LFxuXHRcdFx0bWVudUhpZGU6IGZ1bmN0aW9uKCRzdWIpIHtcblx0XHRcdFx0aWYgKHRoaXMuJHJvb3QudHJpZ2dlckhhbmRsZXIoJ2JlZm9yZWhpZGUuc21hcGknLCAkc3ViWzBdKSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNhbkFuaW1hdGUpIHtcblx0XHRcdFx0XHQkc3ViLnN0b3AodHJ1ZSwgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCRzdWIuY3NzKCdkaXNwbGF5JykgIT0gJ25vbmUnKSB7XG5cdFx0XHRcdFx0dmFyIGNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQvLyB1bnNldCB6LWluZGV4XG5cdFx0XHRcdFx0XHQkc3ViLmNzcygnei1pbmRleCcsICcnKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdC8vIGlmIHN1YiBpcyBjb2xsYXBzaWJsZSAobW9iaWxlIHZpZXcpXG5cdFx0XHRcdFx0aWYgKHRoaXMuaXNDb2xsYXBzaWJsZSgpKSB7XG5cdFx0XHRcdFx0XHRpZiAoY2FuQW5pbWF0ZSAmJiB0aGlzLm9wdHMuY29sbGFwc2libGVIaWRlRnVuY3Rpb24pIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5vcHRzLmNvbGxhcHNpYmxlSGlkZUZ1bmN0aW9uLmNhbGwodGhpcywgJHN1YiwgY29tcGxldGUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0JHN1Yi5oaWRlKHRoaXMub3B0cy5jb2xsYXBzaWJsZUhpZGVEdXJhdGlvbiwgY29tcGxldGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAoY2FuQW5pbWF0ZSAmJiB0aGlzLm9wdHMuaGlkZUZ1bmN0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMub3B0cy5oaWRlRnVuY3Rpb24uY2FsbCh0aGlzLCAkc3ViLCBjb21wbGV0ZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQkc3ViLmhpZGUodGhpcy5vcHRzLmhpZGVEdXJhdGlvbiwgY29tcGxldGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBkZWFjdGl2YXRlIHNjcm9sbGluZyBpZiBpdCBpcyBhY3RpdmF0ZWQgZm9yIHRoaXMgc3ViXG5cdFx0XHRcdFx0aWYgKCRzdWIuZGF0YVNNKCdzY3JvbGwnKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5tZW51U2Nyb2xsU3RvcCgkc3ViKTtcblx0XHRcdFx0XHRcdCRzdWIuY3NzKHsgJ3RvdWNoLWFjdGlvbic6ICcnLCAnLW1zLXRvdWNoLWFjdGlvbic6ICcnLCAnLXdlYmtpdC10cmFuc2Zvcm0nOiAnJywgdHJhbnNmb3JtOiAnJyB9KVxuXHRcdFx0XHRcdFx0XHQub2ZmKCcuc21hcnRtZW51c19zY3JvbGwnKS5yZW1vdmVEYXRhU00oJ3Njcm9sbCcpLmRhdGFTTSgnc2Nyb2xsLWFycm93cycpLmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gdW5oaWdobGlnaHQgcGFyZW50IGl0ZW0gKyBhY2Nlc3NpYmlsaXR5XG5cdFx0XHRcdFx0JHN1Yi5kYXRhU00oJ3BhcmVudC1hJykucmVtb3ZlQ2xhc3MoJ2hpZ2hsaWdodGVkJykuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXHRcdFx0XHRcdCRzdWIuYXR0cih7XG5cdFx0XHRcdFx0XHQnYXJpYS1leHBhbmRlZCc6ICdmYWxzZScsXG5cdFx0XHRcdFx0XHQnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR2YXIgbGV2ZWwgPSAkc3ViLmRhdGFTTSgnbGV2ZWwnKTtcblx0XHRcdFx0XHR0aGlzLmFjdGl2YXRlZEl0ZW1zLnNwbGljZShsZXZlbCAtIDEsIDEpO1xuXHRcdFx0XHRcdHRoaXMudmlzaWJsZVN1Yk1lbnVzLnNwbGljZSgkLmluQXJyYXkoJHN1YiwgdGhpcy52aXNpYmxlU3ViTWVudXMpLCAxKTtcblx0XHRcdFx0XHR0aGlzLiRyb290LnRyaWdnZXJIYW5kbGVyKCdoaWRlLnNtYXBpJywgJHN1YlswXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRtZW51SGlkZUFsbDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICh0aGlzLnNob3dUaW1lb3V0KSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuc2hvd1RpbWVvdXQpO1xuXHRcdFx0XHRcdHRoaXMuc2hvd1RpbWVvdXQgPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGhpZGUgYWxsIHN1YnNcblx0XHRcdFx0Ly8gaWYgaXQncyBhIHBvcHVwLCB0aGlzLnZpc2libGVTdWJNZW51c1swXSBpcyB0aGUgcm9vdCBVTFxuXHRcdFx0XHR2YXIgbGV2ZWwgPSB0aGlzLm9wdHMuaXNQb3B1cCA/IDEgOiAwO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gdGhpcy52aXNpYmxlU3ViTWVudXMubGVuZ3RoIC0gMTsgaSA+PSBsZXZlbDsgaS0tKSB7XG5cdFx0XHRcdFx0dGhpcy5tZW51SGlkZSh0aGlzLnZpc2libGVTdWJNZW51c1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gaGlkZSByb290IGlmIGl0J3MgcG9wdXBcblx0XHRcdFx0aWYgKHRoaXMub3B0cy5pc1BvcHVwKSB7XG5cdFx0XHRcdFx0aWYgKGNhbkFuaW1hdGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuJHJvb3Quc3RvcCh0cnVlLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMuJHJvb3QuaXMoJzp2aXNpYmxlJykpIHtcblx0XHRcdFx0XHRcdGlmIChjYW5BbmltYXRlICYmIHRoaXMub3B0cy5oaWRlRnVuY3Rpb24pIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5vcHRzLmhpZGVGdW5jdGlvbi5jYWxsKHRoaXMsIHRoaXMuJHJvb3QpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy4kcm9vdC5oaWRlKHRoaXMub3B0cy5oaWRlRHVyYXRpb24pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmFjdGl2YXRlZEl0ZW1zID0gW107XG5cdFx0XHRcdHRoaXMudmlzaWJsZVN1Yk1lbnVzID0gW107XG5cdFx0XHRcdHRoaXMuY2xpY2tBY3RpdmF0ZWQgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5mb2N1c0FjdGl2YXRlZCA9IGZhbHNlO1xuXHRcdFx0XHQvLyByZXNldCB6LWluZGV4IGluY3JlbWVudFxuXHRcdFx0XHR0aGlzLnpJbmRleEluYyA9IDA7XG5cdFx0XHRcdHRoaXMuJHJvb3QudHJpZ2dlckhhbmRsZXIoJ2hpZGVBbGwuc21hcGknKTtcblx0XHRcdH0sXG5cdFx0XHRtZW51SGlkZVN1Yk1lbnVzOiBmdW5jdGlvbihsZXZlbCkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gdGhpcy5hY3RpdmF0ZWRJdGVtcy5sZW5ndGggLSAxOyBpID49IGxldmVsOyBpLS0pIHtcblx0XHRcdFx0XHR2YXIgJHN1YiA9IHRoaXMuYWN0aXZhdGVkSXRlbXNbaV0uZGF0YVNNKCdzdWInKTtcblx0XHRcdFx0XHRpZiAoJHN1Yikge1xuXHRcdFx0XHRcdFx0dGhpcy5tZW51SGlkZSgkc3ViKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRtZW51SW5pdDogZnVuY3Rpb24oJHVsKSB7XG5cdFx0XHRcdGlmICghJHVsLmRhdGFTTSgnaW4tbWVnYScpKSB7XG5cdFx0XHRcdFx0Ly8gbWFyayBVTCdzIGluIG1lZ2EgZHJvcCBkb3ducyAoaWYgYW55KSBzbyB3ZSBjYW4gbmVnbGVjdCB0aGVtXG5cdFx0XHRcdFx0aWYgKCR1bC5oYXNDbGFzcygnbWVnYS1tZW51JykpIHtcblx0XHRcdFx0XHRcdCR1bC5maW5kKCd1bCcpLmRhdGFTTSgnaW4tbWVnYScsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBnZXQgbGV2ZWwgKG11Y2ggZmFzdGVyIHRoYW4sIGZvciBleGFtcGxlLCB1c2luZyBwYXJlbnRzVW50aWwpXG5cdFx0XHRcdFx0dmFyIGxldmVsID0gMixcblx0XHRcdFx0XHRcdHBhciA9ICR1bFswXTtcblx0XHRcdFx0XHR3aGlsZSAoKHBhciA9IHBhci5wYXJlbnROb2RlLnBhcmVudE5vZGUpICE9IHRoaXMuJHJvb3RbMF0pIHtcblx0XHRcdFx0XHRcdGxldmVsKys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGNhY2hlIHN0dWZmIGZvciBxdWljayBhY2Nlc3Ncblx0XHRcdFx0XHR2YXIgJGEgPSAkdWwucHJldkFsbCgnYScpLmVxKC0xKTtcblx0XHRcdFx0XHQvLyBpZiB0aGUgbGluayBpcyBuZXN0ZWQgKGUuZy4gaW4gYSBoZWFkaW5nKVxuXHRcdFx0XHRcdGlmICghJGEubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQkYSA9ICR1bC5wcmV2QWxsKCkuZmluZCgnYScpLmVxKC0xKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JGEuYWRkQ2xhc3MoJ2hhcy1zdWJtZW51JykuZGF0YVNNKCdzdWInLCAkdWwpO1xuXHRcdFx0XHRcdCR1bC5kYXRhU00oJ3BhcmVudC1hJywgJGEpXG5cdFx0XHRcdFx0XHQuZGF0YVNNKCdsZXZlbCcsIGxldmVsKVxuXHRcdFx0XHRcdFx0LnBhcmVudCgpLmRhdGFTTSgnc3ViJywgJHVsKTtcblx0XHRcdFx0XHQvLyBhY2Nlc3NpYmlsaXR5XG5cdFx0XHRcdFx0dmFyIGFJZCA9ICRhLmF0dHIoJ2lkJykgfHwgdGhpcy5hY2Nlc3NJZFByZWZpeCArICgrK3RoaXMuaWRJbmMpLFxuXHRcdFx0XHRcdFx0dWxJZCA9ICR1bC5hdHRyKCdpZCcpIHx8IHRoaXMuYWNjZXNzSWRQcmVmaXggKyAoKyt0aGlzLmlkSW5jKTtcblx0XHRcdFx0XHQkYS5hdHRyKHtcblx0XHRcdFx0XHRcdGlkOiBhSWQsXG5cdFx0XHRcdFx0XHQnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJyxcblx0XHRcdFx0XHRcdCdhcmlhLWNvbnRyb2xzJzogdWxJZCxcblx0XHRcdFx0XHRcdCdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdCR1bC5hdHRyKHtcblx0XHRcdFx0XHRcdGlkOiB1bElkLFxuXHRcdFx0XHRcdFx0J3JvbGUnOiAnZ3JvdXAnLFxuXHRcdFx0XHRcdFx0J2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuXHRcdFx0XHRcdFx0J2FyaWEtbGFiZWxsZWRieSc6IGFJZCxcblx0XHRcdFx0XHRcdCdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vIGFkZCBzdWIgaW5kaWNhdG9yIHRvIHBhcmVudCBpdGVtXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0cy5zdWJJbmRpY2F0b3JzKSB7XG5cdFx0XHRcdFx0XHQkYVt0aGlzLm9wdHMuc3ViSW5kaWNhdG9yc1Bvc10odGhpcy4kc3ViQXJyb3cuY2xvbmUoKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bWVudVBvc2l0aW9uOiBmdW5jdGlvbigkc3ViKSB7XG5cdFx0XHRcdHZhciAkYSA9ICRzdWIuZGF0YVNNKCdwYXJlbnQtYScpLFxuXHRcdFx0XHRcdCRsaSA9ICRhLmNsb3Nlc3QoJ2xpJyksXG5cdFx0XHRcdFx0JHVsID0gJGxpLnBhcmVudCgpLFxuXHRcdFx0XHRcdGxldmVsID0gJHN1Yi5kYXRhU00oJ2xldmVsJyksXG5cdFx0XHRcdFx0c3ViVyA9IHRoaXMuZ2V0V2lkdGgoJHN1YiksXG5cdFx0XHRcdFx0c3ViSCA9IHRoaXMuZ2V0SGVpZ2h0KCRzdWIpLFxuXHRcdFx0XHRcdGl0ZW1PZmZzZXQgPSAkYS5vZmZzZXQoKSxcblx0XHRcdFx0XHRpdGVtWCA9IGl0ZW1PZmZzZXQubGVmdCxcblx0XHRcdFx0XHRpdGVtWSA9IGl0ZW1PZmZzZXQudG9wLFxuXHRcdFx0XHRcdGl0ZW1XID0gdGhpcy5nZXRXaWR0aCgkYSksXG5cdFx0XHRcdFx0aXRlbUggPSB0aGlzLmdldEhlaWdodCgkYSksXG5cdFx0XHRcdFx0JHdpbiA9ICQod2luZG93KSxcblx0XHRcdFx0XHR3aW5YID0gJHdpbi5zY3JvbGxMZWZ0KCksXG5cdFx0XHRcdFx0d2luWSA9ICR3aW4uc2Nyb2xsVG9wKCksXG5cdFx0XHRcdFx0d2luVyA9IHRoaXMuZ2V0Vmlld3BvcnRXaWR0aCgpLFxuXHRcdFx0XHRcdHdpbkggPSB0aGlzLmdldFZpZXdwb3J0SGVpZ2h0KCksXG5cdFx0XHRcdFx0aG9yaXpvbnRhbFBhcmVudCA9ICR1bC5wYXJlbnQoKS5pcygnW2RhdGEtc20taG9yaXpvbnRhbC1zdWJdJykgfHwgbGV2ZWwgPT0gMiAmJiAhJHVsLmhhc0NsYXNzKCdzbS12ZXJ0aWNhbCcpLFxuXHRcdFx0XHRcdHJpZ2h0VG9MZWZ0ID0gdGhpcy5vcHRzLnJpZ2h0VG9MZWZ0U3ViTWVudXMgJiYgISRsaS5pcygnW2RhdGEtc20tcmV2ZXJzZV0nKSB8fCAhdGhpcy5vcHRzLnJpZ2h0VG9MZWZ0U3ViTWVudXMgJiYgJGxpLmlzKCdbZGF0YS1zbS1yZXZlcnNlXScpLFxuXHRcdFx0XHRcdHN1Yk9mZnNldFggPSBsZXZlbCA9PSAyID8gdGhpcy5vcHRzLm1haW5NZW51U3ViT2Zmc2V0WCA6IHRoaXMub3B0cy5zdWJNZW51c1N1Yk9mZnNldFgsXG5cdFx0XHRcdFx0c3ViT2Zmc2V0WSA9IGxldmVsID09IDIgPyB0aGlzLm9wdHMubWFpbk1lbnVTdWJPZmZzZXRZIDogdGhpcy5vcHRzLnN1Yk1lbnVzU3ViT2Zmc2V0WSxcblx0XHRcdFx0XHR4LCB5O1xuXHRcdFx0XHRpZiAoaG9yaXpvbnRhbFBhcmVudCkge1xuXHRcdFx0XHRcdHggPSByaWdodFRvTGVmdCA/IGl0ZW1XIC0gc3ViVyAtIHN1Yk9mZnNldFggOiBzdWJPZmZzZXRYO1xuXHRcdFx0XHRcdHkgPSB0aGlzLm9wdHMuYm90dG9tVG9Ub3BTdWJNZW51cyA/IC1zdWJIIC0gc3ViT2Zmc2V0WSA6IGl0ZW1IICsgc3ViT2Zmc2V0WTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR4ID0gcmlnaHRUb0xlZnQgPyBzdWJPZmZzZXRYIC0gc3ViVyA6IGl0ZW1XIC0gc3ViT2Zmc2V0WDtcblx0XHRcdFx0XHR5ID0gdGhpcy5vcHRzLmJvdHRvbVRvVG9wU3ViTWVudXMgPyBpdGVtSCAtIHN1Yk9mZnNldFkgLSBzdWJIIDogc3ViT2Zmc2V0WTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5vcHRzLmtlZXBJblZpZXdwb3J0KSB7XG5cdFx0XHRcdFx0dmFyIGFic1ggPSBpdGVtWCArIHgsXG5cdFx0XHRcdFx0XHRhYnNZID0gaXRlbVkgKyB5O1xuXHRcdFx0XHRcdGlmIChyaWdodFRvTGVmdCAmJiBhYnNYIDwgd2luWCkge1xuXHRcdFx0XHRcdFx0eCA9IGhvcml6b250YWxQYXJlbnQgPyB3aW5YIC0gYWJzWCArIHggOiBpdGVtVyAtIHN1Yk9mZnNldFg7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICghcmlnaHRUb0xlZnQgJiYgYWJzWCArIHN1YlcgPiB3aW5YICsgd2luVykge1xuXHRcdFx0XHRcdFx0eCA9IGhvcml6b250YWxQYXJlbnQgPyB3aW5YICsgd2luVyAtIHN1YlcgLSBhYnNYICsgeCA6IHN1Yk9mZnNldFggLSBzdWJXO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIWhvcml6b250YWxQYXJlbnQpIHtcblx0XHRcdFx0XHRcdGlmIChzdWJIIDwgd2luSCAmJiBhYnNZICsgc3ViSCA+IHdpblkgKyB3aW5IKSB7XG5cdFx0XHRcdFx0XHRcdHkgKz0gd2luWSArIHdpbkggLSBzdWJIIC0gYWJzWTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoc3ViSCA+PSB3aW5IIHx8IGFic1kgPCB3aW5ZKSB7XG5cdFx0XHRcdFx0XHRcdHkgKz0gd2luWSAtIGFic1k7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGRvIHdlIG5lZWQgc2Nyb2xsaW5nP1xuXHRcdFx0XHRcdC8vIDAuNDkgdXNlZCBmb3IgYmV0dGVyIHByZWNpc2lvbiB3aGVuIGRlYWxpbmcgd2l0aCBmbG9hdCB2YWx1ZXNcblx0XHRcdFx0XHRpZiAoaG9yaXpvbnRhbFBhcmVudCAmJiAoYWJzWSArIHN1YkggPiB3aW5ZICsgd2luSCArIDAuNDkgfHwgYWJzWSA8IHdpblkpIHx8ICFob3Jpem9udGFsUGFyZW50ICYmIHN1YkggPiB3aW5IICsgMC40OSkge1xuXHRcdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0XHRcdFx0aWYgKCEkc3ViLmRhdGFTTSgnc2Nyb2xsLWFycm93cycpKSB7XG5cdFx0XHRcdFx0XHRcdCRzdWIuZGF0YVNNKCdzY3JvbGwtYXJyb3dzJywgJChbJCgnPHNwYW4gY2xhc3M9XCJzY3JvbGwtdXBcIj48c3BhbiBjbGFzcz1cInNjcm9sbC11cC1hcnJvd1wiPjwvc3Bhbj48L3NwYW4+JylbMF0sICQoJzxzcGFuIGNsYXNzPVwic2Nyb2xsLWRvd25cIj48c3BhbiBjbGFzcz1cInNjcm9sbC1kb3duLWFycm93XCI+PC9zcGFuPjwvc3Bhbj4nKVswXV0pXG5cdFx0XHRcdFx0XHRcdFx0Lm9uKHtcblx0XHRcdFx0XHRcdFx0XHRcdG1vdXNlZW50ZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkc3ViLmRhdGFTTSgnc2Nyb2xsJykudXAgPSAkKHRoaXMpLmhhc0NsYXNzKCdzY3JvbGwtdXAnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZi5tZW51U2Nyb2xsKCRzdWIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdG1vdXNlbGVhdmU6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZi5tZW51U2Nyb2xsU3RvcCgkc3ViKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZi5tZW51U2Nyb2xsT3V0KCRzdWIsIGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJzogZnVuY3Rpb24oZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH1cblx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdC5pbnNlcnRBZnRlcigkc3ViKVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYmluZCBzY3JvbGwgZXZlbnRzIGFuZCBzYXZlIHNjcm9sbCBkYXRhIGZvciB0aGlzIHN1YlxuXHRcdFx0XHRcdFx0dmFyIGVOUyA9ICcuc21hcnRtZW51c19zY3JvbGwnO1xuXHRcdFx0XHRcdFx0JHN1Yi5kYXRhU00oJ3Njcm9sbCcsIHtcblx0XHRcdFx0XHRcdFx0XHR5OiB0aGlzLmNzc1RyYW5zZm9ybXMzZCA/IDAgOiB5IC0gaXRlbUgsXG5cdFx0XHRcdFx0XHRcdFx0c3RlcDogMSxcblx0XHRcdFx0XHRcdFx0XHQvLyBjYWNoZSBzdHVmZiBmb3IgZmFzdGVyIHJlY2FsY3MgbGF0ZXJcblx0XHRcdFx0XHRcdFx0XHRpdGVtSDogaXRlbUgsXG5cdFx0XHRcdFx0XHRcdFx0c3ViSDogc3ViSCxcblx0XHRcdFx0XHRcdFx0XHRhcnJvd0Rvd25IOiB0aGlzLmdldEhlaWdodCgkc3ViLmRhdGFTTSgnc2Nyb2xsLWFycm93cycpLmVxKDEpKVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQub24oZ2V0RXZlbnRzTlMoe1xuXHRcdFx0XHRcdFx0XHRcdCdtb3VzZW92ZXInOiBmdW5jdGlvbihlKSB7IHNlbGYubWVudVNjcm9sbE92ZXIoJHN1YiwgZSk7IH0sXG5cdFx0XHRcdFx0XHRcdFx0J21vdXNlb3V0JzogZnVuY3Rpb24oZSkgeyBzZWxmLm1lbnVTY3JvbGxPdXQoJHN1YiwgZSk7IH0sXG5cdFx0XHRcdFx0XHRcdFx0J21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnOiBmdW5jdGlvbihlKSB7IHNlbGYubWVudVNjcm9sbE1vdXNld2hlZWwoJHN1YiwgZSk7IH1cblx0XHRcdFx0XHRcdFx0fSwgZU5TKSlcblx0XHRcdFx0XHRcdFx0LmRhdGFTTSgnc2Nyb2xsLWFycm93cycpLmNzcyh7IHRvcDogJ2F1dG8nLCBsZWZ0OiAnMCcsIG1hcmdpbkxlZnQ6IHggKyAocGFyc2VJbnQoJHN1Yi5jc3MoJ2JvcmRlci1sZWZ0LXdpZHRoJykpIHx8IDApLCB3aWR0aDogc3ViVyAtIChwYXJzZUludCgkc3ViLmNzcygnYm9yZGVyLWxlZnQtd2lkdGgnKSkgfHwgMCkgLSAocGFyc2VJbnQoJHN1Yi5jc3MoJ2JvcmRlci1yaWdodC13aWR0aCcpKSB8fCAwKSwgekluZGV4OiAkc3ViLmNzcygnei1pbmRleCcpIH0pXG5cdFx0XHRcdFx0XHRcdFx0LmVxKGhvcml6b250YWxQYXJlbnQgJiYgdGhpcy5vcHRzLmJvdHRvbVRvVG9wU3ViTWVudXMgPyAwIDogMSkuc2hvdygpO1xuXHRcdFx0XHRcdFx0Ly8gd2hlbiBhIG1lbnUgdHJlZSBpcyBmaXhlZCBwb3NpdGlvbmVkIHdlIGFsbG93IHNjcm9sbGluZyB2aWEgdG91Y2ggdG9vXG5cdFx0XHRcdFx0XHQvLyBzaW5jZSB0aGVyZSBpcyBubyBvdGhlciB3YXkgdG8gYWNjZXNzIHN1Y2ggbG9uZyBzdWIgbWVudXMgaWYgbm8gbW91c2UgaXMgcHJlc2VudFxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuaXNGaXhlZCgpKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBldmVudHMgPSB7fTtcblx0XHRcdFx0XHRcdFx0ZXZlbnRzW3RvdWNoRXZlbnRzID8gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kJyA6ICdwb2ludGVyZG93biBwb2ludGVybW92ZSBwb2ludGVydXAgTVNQb2ludGVyRG93biBNU1BvaW50ZXJNb3ZlIE1TUG9pbnRlclVwJ10gPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VsZi5tZW51U2Nyb2xsVG91Y2goJHN1YiwgZSk7XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdCRzdWIuY3NzKHsgJ3RvdWNoLWFjdGlvbic6ICdub25lJywgJy1tcy10b3VjaC1hY3Rpb24nOiAnbm9uZScgfSkub24oZ2V0RXZlbnRzTlMoZXZlbnRzLCBlTlMpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHN1Yi5jc3MoeyB0b3A6ICdhdXRvJywgbGVmdDogJzAnLCBtYXJnaW5MZWZ0OiB4LCBtYXJnaW5Ub3A6IHkgLSBpdGVtSCB9KTtcblx0XHRcdH0sXG5cdFx0XHRtZW51U2Nyb2xsOiBmdW5jdGlvbigkc3ViLCBvbmNlLCBzdGVwKSB7XG5cdFx0XHRcdHZhciBkYXRhID0gJHN1Yi5kYXRhU00oJ3Njcm9sbCcpLFxuXHRcdFx0XHRcdCRhcnJvd3MgPSAkc3ViLmRhdGFTTSgnc2Nyb2xsLWFycm93cycpLFxuXHRcdFx0XHRcdGVuZCA9IGRhdGEudXAgPyBkYXRhLnVwRW5kIDogZGF0YS5kb3duRW5kLFxuXHRcdFx0XHRcdGRpZmY7XG5cdFx0XHRcdGlmICghb25jZSAmJiBkYXRhLm1vbWVudHVtKSB7XG5cdFx0XHRcdFx0ZGF0YS5tb21lbnR1bSAqPSAwLjkyO1xuXHRcdFx0XHRcdGRpZmYgPSBkYXRhLm1vbWVudHVtO1xuXHRcdFx0XHRcdGlmIChkaWZmIDwgMC41KSB7XG5cdFx0XHRcdFx0XHR0aGlzLm1lbnVTY3JvbGxTdG9wKCRzdWIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkaWZmID0gc3RlcCB8fCAob25jZSB8fCAhdGhpcy5vcHRzLnNjcm9sbEFjY2VsZXJhdGUgPyB0aGlzLm9wdHMuc2Nyb2xsU3RlcCA6IE1hdGguZmxvb3IoZGF0YS5zdGVwKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gaGlkZSBhbnkgdmlzaWJsZSBkZWVwZXIgbGV2ZWwgc3ViIG1lbnVzXG5cdFx0XHRcdHZhciBsZXZlbCA9ICRzdWIuZGF0YVNNKCdsZXZlbCcpO1xuXHRcdFx0XHRpZiAodGhpcy5hY3RpdmF0ZWRJdGVtc1tsZXZlbCAtIDFdICYmIHRoaXMuYWN0aXZhdGVkSXRlbXNbbGV2ZWwgLSAxXS5kYXRhU00oJ3N1YicpICYmIHRoaXMuYWN0aXZhdGVkSXRlbXNbbGV2ZWwgLSAxXS5kYXRhU00oJ3N1YicpLmlzKCc6dmlzaWJsZScpKSB7XG5cdFx0XHRcdFx0dGhpcy5tZW51SGlkZVN1Yk1lbnVzKGxldmVsIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGF0YS55ID0gZGF0YS51cCAmJiBlbmQgPD0gZGF0YS55IHx8ICFkYXRhLnVwICYmIGVuZCA+PSBkYXRhLnkgPyBkYXRhLnkgOiAoTWF0aC5hYnMoZW5kIC0gZGF0YS55KSA+IGRpZmYgPyBkYXRhLnkgKyAoZGF0YS51cCA/IGRpZmYgOiAtZGlmZikgOiBlbmQpO1xuXHRcdFx0XHQkc3ViLmNzcyh0aGlzLmNzc1RyYW5zZm9ybXMzZCA/IHsgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDAsICcgKyBkYXRhLnkgKyAncHgsIDApJywgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgJyArIGRhdGEueSArICdweCwgMCknIH0gOiB7IG1hcmdpblRvcDogZGF0YS55IH0pO1xuXHRcdFx0XHQvLyBzaG93IG9wcG9zaXRlIGFycm93IGlmIGFwcHJvcHJpYXRlXG5cdFx0XHRcdGlmIChtb3VzZSAmJiAoZGF0YS51cCAmJiBkYXRhLnkgPiBkYXRhLmRvd25FbmQgfHwgIWRhdGEudXAgJiYgZGF0YS55IDwgZGF0YS51cEVuZCkpIHtcblx0XHRcdFx0XHQkYXJyb3dzLmVxKGRhdGEudXAgPyAxIDogMCkuc2hvdygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGlmIHdlJ3ZlIHJlYWNoZWQgdGhlIGVuZFxuXHRcdFx0XHRpZiAoZGF0YS55ID09IGVuZCkge1xuXHRcdFx0XHRcdGlmIChtb3VzZSkge1xuXHRcdFx0XHRcdFx0JGFycm93cy5lcShkYXRhLnVwID8gMCA6IDEpLmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5tZW51U2Nyb2xsU3RvcCgkc3ViKTtcblx0XHRcdFx0fSBlbHNlIGlmICghb25jZSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdHMuc2Nyb2xsQWNjZWxlcmF0ZSAmJiBkYXRhLnN0ZXAgPCB0aGlzLm9wdHMuc2Nyb2xsU3RlcCkge1xuXHRcdFx0XHRcdFx0ZGF0YS5zdGVwICs9IDAuMjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0XHRcdHRoaXMuc2Nyb2xsVGltZW91dCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHsgc2VsZi5tZW51U2Nyb2xsKCRzdWIpOyB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdG1lbnVTY3JvbGxNb3VzZXdoZWVsOiBmdW5jdGlvbigkc3ViLCBlKSB7XG5cdFx0XHRcdGlmICh0aGlzLmdldENsb3Nlc3RNZW51KGUudGFyZ2V0KSA9PSAkc3ViWzBdKSB7XG5cdFx0XHRcdFx0ZSA9IGUub3JpZ2luYWxFdmVudDtcblx0XHRcdFx0XHR2YXIgdXAgPSAoZS53aGVlbERlbHRhIHx8IC1lLmRldGFpbCkgPiAwO1xuXHRcdFx0XHRcdGlmICgkc3ViLmRhdGFTTSgnc2Nyb2xsLWFycm93cycpLmVxKHVwID8gMCA6IDEpLmlzKCc6dmlzaWJsZScpKSB7XG5cdFx0XHRcdFx0XHQkc3ViLmRhdGFTTSgnc2Nyb2xsJykudXAgPSB1cDtcblx0XHRcdFx0XHRcdHRoaXMubWVudVNjcm9sbCgkc3ViLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSxcblx0XHRcdG1lbnVTY3JvbGxPdXQ6IGZ1bmN0aW9uKCRzdWIsIGUpIHtcblx0XHRcdFx0aWYgKG1vdXNlKSB7XG5cdFx0XHRcdFx0aWYgKCEvXnNjcm9sbC0odXB8ZG93bikvLnRlc3QoKGUucmVsYXRlZFRhcmdldCB8fCAnJykuY2xhc3NOYW1lKSAmJiAoJHN1YlswXSAhPSBlLnJlbGF0ZWRUYXJnZXQgJiYgISQuY29udGFpbnMoJHN1YlswXSwgZS5yZWxhdGVkVGFyZ2V0KSB8fCB0aGlzLmdldENsb3Nlc3RNZW51KGUucmVsYXRlZFRhcmdldCkgIT0gJHN1YlswXSkpIHtcblx0XHRcdFx0XHRcdCRzdWIuZGF0YVNNKCdzY3JvbGwtYXJyb3dzJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdG1lbnVTY3JvbGxPdmVyOiBmdW5jdGlvbigkc3ViLCBlKSB7XG5cdFx0XHRcdGlmIChtb3VzZSkge1xuXHRcdFx0XHRcdGlmICghL15zY3JvbGwtKHVwfGRvd24pLy50ZXN0KGUudGFyZ2V0LmNsYXNzTmFtZSkgJiYgdGhpcy5nZXRDbG9zZXN0TWVudShlLnRhcmdldCkgPT0gJHN1YlswXSkge1xuXHRcdFx0XHRcdFx0dGhpcy5tZW51U2Nyb2xsUmVmcmVzaERhdGEoJHN1Yik7XG5cdFx0XHRcdFx0XHR2YXIgZGF0YSA9ICRzdWIuZGF0YVNNKCdzY3JvbGwnKSxcblx0XHRcdFx0XHRcdFx0dXBFbmQgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgLSAkc3ViLmRhdGFTTSgncGFyZW50LWEnKS5vZmZzZXQoKS50b3AgLSBkYXRhLml0ZW1IO1xuXHRcdFx0XHRcdFx0JHN1Yi5kYXRhU00oJ3Njcm9sbC1hcnJvd3MnKS5lcSgwKS5jc3MoJ21hcmdpbi10b3AnLCB1cEVuZCkuZW5kKClcblx0XHRcdFx0XHRcdFx0LmVxKDEpLmNzcygnbWFyZ2luLXRvcCcsIHVwRW5kICsgdGhpcy5nZXRWaWV3cG9ydEhlaWdodCgpIC0gZGF0YS5hcnJvd0Rvd25IKS5lbmQoKVxuXHRcdFx0XHRcdFx0XHQuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRtZW51U2Nyb2xsUmVmcmVzaERhdGE6IGZ1bmN0aW9uKCRzdWIpIHtcblx0XHRcdFx0dmFyIGRhdGEgPSAkc3ViLmRhdGFTTSgnc2Nyb2xsJyksXG5cdFx0XHRcdFx0dXBFbmQgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgLSAkc3ViLmRhdGFTTSgncGFyZW50LWEnKS5vZmZzZXQoKS50b3AgLSBkYXRhLml0ZW1IO1xuXHRcdFx0XHRpZiAodGhpcy5jc3NUcmFuc2Zvcm1zM2QpIHtcblx0XHRcdFx0XHR1cEVuZCA9IC0ocGFyc2VGbG9hdCgkc3ViLmNzcygnbWFyZ2luLXRvcCcpKSAtIHVwRW5kKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkLmV4dGVuZChkYXRhLCB7XG5cdFx0XHRcdFx0dXBFbmQ6IHVwRW5kLFxuXHRcdFx0XHRcdGRvd25FbmQ6IHVwRW5kICsgdGhpcy5nZXRWaWV3cG9ydEhlaWdodCgpIC0gZGF0YS5zdWJIXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdG1lbnVTY3JvbGxTdG9wOiBmdW5jdGlvbigkc3ViKSB7XG5cdFx0XHRcdGlmICh0aGlzLnNjcm9sbFRpbWVvdXQpIHtcblx0XHRcdFx0XHRjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnNjcm9sbFRpbWVvdXQpO1xuXHRcdFx0XHRcdHRoaXMuc2Nyb2xsVGltZW91dCA9IDA7XG5cdFx0XHRcdFx0JHN1Yi5kYXRhU00oJ3Njcm9sbCcpLnN0ZXAgPSAxO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bWVudVNjcm9sbFRvdWNoOiBmdW5jdGlvbigkc3ViLCBlKSB7XG5cdFx0XHRcdGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG5cdFx0XHRcdGlmIChpc1RvdWNoRXZlbnQoZSkpIHtcblx0XHRcdFx0XHR2YXIgdG91Y2hQb2ludCA9IHRoaXMuZ2V0VG91Y2hQb2ludChlKTtcblx0XHRcdFx0XHQvLyBuZWdsZWN0IGV2ZW50IGlmIHdlIHRvdWNoZWQgYSB2aXNpYmxlIGRlZXBlciBsZXZlbCBzdWIgbWVudVxuXHRcdFx0XHRcdGlmICh0aGlzLmdldENsb3Nlc3RNZW51KHRvdWNoUG9pbnQudGFyZ2V0KSA9PSAkc3ViWzBdKSB7XG5cdFx0XHRcdFx0XHR2YXIgZGF0YSA9ICRzdWIuZGF0YVNNKCdzY3JvbGwnKTtcblx0XHRcdFx0XHRcdGlmICgvKHN0YXJ0fGRvd24pJC9pLnRlc3QoZS50eXBlKSkge1xuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5tZW51U2Nyb2xsU3RvcCgkc3ViKSkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGlmIHdlIHdlcmUgc2Nyb2xsaW5nLCBqdXN0IHN0b3AgYW5kIGRvbid0IGFjdGl2YXRlIGFueSBsaW5rIG9uIHRoZSBmaXJzdCB0b3VjaFxuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLiR0b3VjaFNjcm9sbGluZ1N1YiA9ICRzdWI7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy4kdG91Y2hTY3JvbGxpbmdTdWIgPSBudWxsO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdC8vIHVwZGF0ZSBzY3JvbGwgZGF0YSBzaW5jZSB0aGUgdXNlciBtaWdodCBoYXZlIHpvb21lZCwgZXRjLlxuXHRcdFx0XHRcdFx0XHR0aGlzLm1lbnVTY3JvbGxSZWZyZXNoRGF0YSgkc3ViKTtcblx0XHRcdFx0XHRcdFx0Ly8gZXh0ZW5kIGl0IHdpdGggdGhlIHRvdWNoIHByb3BlcnRpZXNcblx0XHRcdFx0XHRcdFx0JC5leHRlbmQoZGF0YSwge1xuXHRcdFx0XHRcdFx0XHRcdHRvdWNoU3RhcnRZOiB0b3VjaFBvaW50LnBhZ2VZLFxuXHRcdFx0XHRcdFx0XHRcdHRvdWNoU3RhcnRUaW1lOiBlLnRpbWVTdGFtcFxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoL21vdmUkL2kudGVzdChlLnR5cGUpKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBwcmV2WSA9IGRhdGEudG91Y2hZICE9PSB1bmRlZmluZWQgPyBkYXRhLnRvdWNoWSA6IGRhdGEudG91Y2hTdGFydFk7XG5cdFx0XHRcdFx0XHRcdGlmIChwcmV2WSAhPT0gdW5kZWZpbmVkICYmIHByZXZZICE9IHRvdWNoUG9pbnQucGFnZVkpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLiR0b3VjaFNjcm9sbGluZ1N1YiA9ICRzdWI7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHVwID0gcHJldlkgPCB0b3VjaFBvaW50LnBhZ2VZO1xuXHRcdFx0XHRcdFx0XHRcdC8vIGNoYW5nZWQgZGlyZWN0aW9uPyByZXNldC4uLlxuXHRcdFx0XHRcdFx0XHRcdGlmIChkYXRhLnVwICE9PSB1bmRlZmluZWQgJiYgZGF0YS51cCAhPSB1cCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0JC5leHRlbmQoZGF0YSwge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0b3VjaFN0YXJ0WTogdG91Y2hQb2ludC5wYWdlWSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG91Y2hTdGFydFRpbWU6IGUudGltZVN0YW1wXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0JC5leHRlbmQoZGF0YSwge1xuXHRcdFx0XHRcdFx0XHRcdFx0dXA6IHVwLFxuXHRcdFx0XHRcdFx0XHRcdFx0dG91Y2hZOiB0b3VjaFBvaW50LnBhZ2VZXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5tZW51U2Nyb2xsKCRzdWIsIHRydWUsIE1hdGguYWJzKHRvdWNoUG9pbnQucGFnZVkgLSBwcmV2WSkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7IC8vIHRvdWNoZW5kL3BvaW50ZXJ1cFxuXHRcdFx0XHRcdFx0XHRpZiAoZGF0YS50b3VjaFkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChkYXRhLm1vbWVudHVtID0gTWF0aC5wb3coTWF0aC5hYnModG91Y2hQb2ludC5wYWdlWSAtIGRhdGEudG91Y2hTdGFydFkpIC8gKGUudGltZVN0YW1wIC0gZGF0YS50b3VjaFN0YXJ0VGltZSksIDIpICogMTUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMubWVudVNjcm9sbFN0b3AoJHN1Yik7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm1lbnVTY3JvbGwoJHN1Yik7XG5cdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBkYXRhLnRvdWNoWTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdG1lbnVTaG93OiBmdW5jdGlvbigkc3ViKSB7XG5cdFx0XHRcdGlmICghJHN1Yi5kYXRhU00oJ2JlZm9yZWZpcnN0c2hvd2ZpcmVkJykpIHtcblx0XHRcdFx0XHQkc3ViLmRhdGFTTSgnYmVmb3JlZmlyc3RzaG93ZmlyZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRpZiAodGhpcy4kcm9vdC50cmlnZ2VySGFuZGxlcignYmVmb3JlZmlyc3RzaG93LnNtYXBpJywgJHN1YlswXSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLiRyb290LnRyaWdnZXJIYW5kbGVyKCdiZWZvcmVzaG93LnNtYXBpJywgJHN1YlswXSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRzdWIuZGF0YVNNKCdzaG93bi1iZWZvcmUnLCB0cnVlKTtcblx0XHRcdFx0aWYgKGNhbkFuaW1hdGUpIHtcblx0XHRcdFx0XHQkc3ViLnN0b3AodHJ1ZSwgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCEkc3ViLmlzKCc6dmlzaWJsZScpKSB7XG5cdFx0XHRcdFx0Ly8gaGlnaGxpZ2h0IHBhcmVudCBpdGVtXG5cdFx0XHRcdFx0dmFyICRhID0gJHN1Yi5kYXRhU00oJ3BhcmVudC1hJyksXG5cdFx0XHRcdFx0XHRjb2xsYXBzaWJsZSA9IHRoaXMuaXNDb2xsYXBzaWJsZSgpO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdHMua2VlcEhpZ2hsaWdodGVkIHx8IGNvbGxhcHNpYmxlKSB7XG5cdFx0XHRcdFx0XHQkYS5hZGRDbGFzcygnaGlnaGxpZ2h0ZWQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGNvbGxhcHNpYmxlKSB7XG5cdFx0XHRcdFx0XHQkc3ViLnJlbW92ZUNsYXNzKCdzbS1ub3dyYXAnKS5jc3MoeyB6SW5kZXg6ICcnLCB3aWR0aDogJ2F1dG8nLCBtaW5XaWR0aDogJycsIG1heFdpZHRoOiAnJywgdG9wOiAnJywgbGVmdDogJycsIG1hcmdpbkxlZnQ6ICcnLCBtYXJnaW5Ub3A6ICcnIH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBzZXQgei1pbmRleFxuXHRcdFx0XHRcdFx0JHN1Yi5jc3MoJ3otaW5kZXgnLCB0aGlzLnpJbmRleEluYyA9ICh0aGlzLnpJbmRleEluYyB8fCB0aGlzLmdldFN0YXJ0WkluZGV4KCkpICsgMSk7XG5cdFx0XHRcdFx0XHQvLyBtaW4vbWF4LXdpZHRoIGZpeCAtIG5vIHdheSB0byByZWx5IHB1cmVseSBvbiBDU1MgYXMgYWxsIFVMJ3MgYXJlIG5lc3RlZFxuXHRcdFx0XHRcdFx0aWYgKHRoaXMub3B0cy5zdWJNZW51c01pbldpZHRoIHx8IHRoaXMub3B0cy5zdWJNZW51c01heFdpZHRoKSB7XG5cdFx0XHRcdFx0XHRcdCRzdWIuY3NzKHsgd2lkdGg6ICdhdXRvJywgbWluV2lkdGg6ICcnLCBtYXhXaWR0aDogJycgfSkuYWRkQ2xhc3MoJ3NtLW5vd3JhcCcpO1xuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRzLnN1Yk1lbnVzTWluV2lkdGgpIHtcblx0XHRcdFx0XHRcdFx0IFx0JHN1Yi5jc3MoJ21pbi13aWR0aCcsIHRoaXMub3B0cy5zdWJNZW51c01pbldpZHRoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRzLnN1Yk1lbnVzTWF4V2lkdGgpIHtcblx0XHRcdFx0XHRcdFx0IFx0dmFyIG5vTWF4V2lkdGggPSB0aGlzLmdldFdpZHRoKCRzdWIpO1xuXHRcdFx0XHRcdFx0XHQgXHQkc3ViLmNzcygnbWF4LXdpZHRoJywgdGhpcy5vcHRzLnN1Yk1lbnVzTWF4V2lkdGgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChub01heFdpZHRoID4gdGhpcy5nZXRXaWR0aCgkc3ViKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0JHN1Yi5yZW1vdmVDbGFzcygnc20tbm93cmFwJykuY3NzKCd3aWR0aCcsIHRoaXMub3B0cy5zdWJNZW51c01heFdpZHRoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMubWVudVBvc2l0aW9uKCRzdWIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgY29tcGxldGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdC8vIGZpeDogXCJvdmVyZmxvdzogaGlkZGVuO1wiIGlzIG5vdCByZXNldCBvbiBhbmltYXRpb24gY29tcGxldGUgaW4galF1ZXJ5IDwgMS45LjAgaW4gQ2hyb21lIHdoZW4gZ2xvYmFsIFwiYm94LXNpemluZzogYm9yZGVyLWJveDtcIiBpcyB1c2VkXG5cdFx0XHRcdFx0XHQkc3ViLmNzcygnb3ZlcmZsb3cnLCAnJyk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQvLyBpZiBzdWIgaXMgY29sbGFwc2libGUgKG1vYmlsZSB2aWV3KVxuXHRcdFx0XHRcdGlmIChjb2xsYXBzaWJsZSkge1xuXHRcdFx0XHRcdFx0aWYgKGNhbkFuaW1hdGUgJiYgdGhpcy5vcHRzLmNvbGxhcHNpYmxlU2hvd0Z1bmN0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMub3B0cy5jb2xsYXBzaWJsZVNob3dGdW5jdGlvbi5jYWxsKHRoaXMsICRzdWIsIGNvbXBsZXRlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdCRzdWIuc2hvdyh0aGlzLm9wdHMuY29sbGFwc2libGVTaG93RHVyYXRpb24sIGNvbXBsZXRlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKGNhbkFuaW1hdGUgJiYgdGhpcy5vcHRzLnNob3dGdW5jdGlvbikge1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9wdHMuc2hvd0Z1bmN0aW9uLmNhbGwodGhpcywgJHN1YiwgY29tcGxldGUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0JHN1Yi5zaG93KHRoaXMub3B0cy5zaG93RHVyYXRpb24sIGNvbXBsZXRlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gYWNjZXNzaWJpbGl0eVxuXHRcdFx0XHRcdCRhLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuXHRcdFx0XHRcdCRzdWIuYXR0cih7XG5cdFx0XHRcdFx0XHQnYXJpYS1leHBhbmRlZCc6ICd0cnVlJyxcblx0XHRcdFx0XHRcdCdhcmlhLWhpZGRlbic6ICdmYWxzZSdcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvLyBzdG9yZSBzdWIgbWVudSBpbiB2aXNpYmxlIGFycmF5XG5cdFx0XHRcdFx0dGhpcy52aXNpYmxlU3ViTWVudXMucHVzaCgkc3ViKTtcblx0XHRcdFx0XHR0aGlzLiRyb290LnRyaWdnZXJIYW5kbGVyKCdzaG93LnNtYXBpJywgJHN1YlswXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRwb3B1cEhpZGU6IGZ1bmN0aW9uKG5vSGlkZVRpbWVvdXQpIHtcblx0XHRcdFx0aWYgKHRoaXMuaGlkZVRpbWVvdXQpIHtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5oaWRlVGltZW91dCk7XG5cdFx0XHRcdFx0dGhpcy5oaWRlVGltZW91dCA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0XHR0aGlzLmhpZGVUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRzZWxmLm1lbnVIaWRlQWxsKCk7XG5cdFx0XHRcdH0sIG5vSGlkZVRpbWVvdXQgPyAxIDogdGhpcy5vcHRzLmhpZGVUaW1lb3V0KTtcblx0XHRcdH0sXG5cdFx0XHRwb3B1cFNob3c6IGZ1bmN0aW9uKGxlZnQsIHRvcCkge1xuXHRcdFx0XHRpZiAoIXRoaXMub3B0cy5pc1BvcHVwKSB7XG5cdFx0XHRcdFx0YWxlcnQoJ1NtYXJ0TWVudXMgalF1ZXJ5IEVycm9yOlxcblxcbklmIHlvdSB3YW50IHRvIHNob3cgdGhpcyBtZW51IHZpYSB0aGUgXCJwb3B1cFNob3dcIiBtZXRob2QsIHNldCB0aGUgaXNQb3B1cDp0cnVlIG9wdGlvbi4nKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMuaGlkZVRpbWVvdXQpIHtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5oaWRlVGltZW91dCk7XG5cdFx0XHRcdFx0dGhpcy5oaWRlVGltZW91dCA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy4kcm9vdC5kYXRhU00oJ3Nob3duLWJlZm9yZScsIHRydWUpO1xuXHRcdFx0XHRpZiAoY2FuQW5pbWF0ZSkge1xuXHRcdFx0XHRcdHRoaXMuJHJvb3Quc3RvcCh0cnVlLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXRoaXMuJHJvb3QuaXMoJzp2aXNpYmxlJykpIHtcblx0XHRcdFx0XHR0aGlzLiRyb290LmNzcyh7IGxlZnQ6IGxlZnQsIHRvcDogdG9wIH0pO1xuXHRcdFx0XHRcdC8vIHNob3cgbWVudVxuXHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0XHRcdGNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHNlbGYuJHJvb3QuY3NzKCdvdmVyZmxvdycsICcnKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0aWYgKGNhbkFuaW1hdGUgJiYgdGhpcy5vcHRzLnNob3dGdW5jdGlvbikge1xuXHRcdFx0XHRcdFx0dGhpcy5vcHRzLnNob3dGdW5jdGlvbi5jYWxsKHRoaXMsIHRoaXMuJHJvb3QsIGNvbXBsZXRlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy4kcm9vdC5zaG93KHRoaXMub3B0cy5zaG93RHVyYXRpb24sIGNvbXBsZXRlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy52aXNpYmxlU3ViTWVudXNbMF0gPSB0aGlzLiRyb290O1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cmVmcmVzaDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRoaXMuZGVzdHJveSh0cnVlKTtcblx0XHRcdFx0dGhpcy5pbml0KHRydWUpO1xuXHRcdFx0fSxcblx0XHRcdHJvb3RLZXlEb3duOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICghdGhpcy5oYW5kbGVFdmVudHMoKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRzd2l0Y2ggKGUua2V5Q29kZSkge1xuXHRcdFx0XHRcdGNhc2UgMjc6IC8vIHJlc2V0IG9uIEVzY1xuXHRcdFx0XHRcdFx0dmFyICRhY3RpdmVUb3BJdGVtID0gdGhpcy5hY3RpdmF0ZWRJdGVtc1swXTtcblx0XHRcdFx0XHRcdGlmICgkYWN0aXZlVG9wSXRlbSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLm1lbnVIaWRlQWxsKCk7XG5cdFx0XHRcdFx0XHRcdCRhY3RpdmVUb3BJdGVtWzBdLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdHZhciAkc3ViID0gJGFjdGl2ZVRvcEl0ZW0uZGF0YVNNKCdzdWInKTtcblx0XHRcdFx0XHRcdFx0aWYgKCRzdWIpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm1lbnVIaWRlKCRzdWIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDMyOiAvLyBhY3RpdmF0ZSBpdGVtJ3Mgc3ViIG9uIFNwYWNlXG5cdFx0XHRcdFx0XHR2YXIgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xuXHRcdFx0XHRcdFx0aWYgKCR0YXJnZXQuaXMoJ2EnKSAmJiB0aGlzLmhhbmRsZUl0ZW1FdmVudHMoJHRhcmdldCkpIHtcblx0XHRcdFx0XHRcdFx0dmFyICRzdWIgPSAkdGFyZ2V0LmRhdGFTTSgnc3ViJyk7XG5cdFx0XHRcdFx0XHRcdGlmICgkc3ViICYmICEkc3ViLmlzKCc6dmlzaWJsZScpKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5pdGVtQ2xpY2soeyBjdXJyZW50VGFyZ2V0OiBlLnRhcmdldCB9KTtcblx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cm9vdE91dDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZiAoIXRoaXMuaGFuZGxlRXZlbnRzKCkgfHwgdGhpcy5pc1RvdWNoTW9kZSgpIHx8IGUudGFyZ2V0ID09IHRoaXMuJHJvb3RbMF0pIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMuaGlkZVRpbWVvdXQpIHtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5oaWRlVGltZW91dCk7XG5cdFx0XHRcdFx0dGhpcy5oaWRlVGltZW91dCA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCF0aGlzLm9wdHMuc2hvd09uQ2xpY2sgfHwgIXRoaXMub3B0cy5oaWRlT25DbGljaykge1xuXHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdFx0XHR0aGlzLmhpZGVUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHsgc2VsZi5tZW51SGlkZUFsbCgpOyB9LCB0aGlzLm9wdHMuaGlkZVRpbWVvdXQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cm9vdE92ZXI6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0aWYgKCF0aGlzLmhhbmRsZUV2ZW50cygpIHx8IHRoaXMuaXNUb3VjaE1vZGUoKSB8fCBlLnRhcmdldCA9PSB0aGlzLiRyb290WzBdKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLmhpZGVUaW1lb3V0KSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpbWVvdXQpO1xuXHRcdFx0XHRcdHRoaXMuaGlkZVRpbWVvdXQgPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0d2luUmVzaXplOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICghdGhpcy5oYW5kbGVFdmVudHMoKSkge1xuXHRcdFx0XHRcdC8vIHdlIHN0aWxsIG5lZWQgdG8gcmVzaXplIHRoZSBkaXNhYmxlIG92ZXJsYXkgaWYgaXQncyB2aXNpYmxlXG5cdFx0XHRcdFx0aWYgKHRoaXMuJGRpc2FibGVPdmVybGF5KSB7XG5cdFx0XHRcdFx0XHR2YXIgcG9zID0gdGhpcy4kcm9vdC5vZmZzZXQoKTtcblx0IFx0XHRcdFx0XHR0aGlzLiRkaXNhYmxlT3ZlcmxheS5jc3Moe1xuXHRcdFx0XHRcdFx0XHR0b3A6IHBvcy50b3AsXG5cdFx0XHRcdFx0XHRcdGxlZnQ6IHBvcy5sZWZ0LFxuXHRcdFx0XHRcdFx0XHR3aWR0aDogdGhpcy4kcm9vdC5vdXRlcldpZHRoKCksXG5cdFx0XHRcdFx0XHRcdGhlaWdodDogdGhpcy4kcm9vdC5vdXRlckhlaWdodCgpXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGhpZGUgc3ViIG1lbnVzIG9uIHJlc2l6ZSAtIG9uIG1vYmlsZSBkbyBpdCBvbmx5IG9uIG9yaWVudGF0aW9uIGNoYW5nZVxuXHRcdFx0XHRpZiAoISgnb25vcmllbnRhdGlvbmNoYW5nZScgaW4gd2luZG93KSB8fCBlLnR5cGUgPT0gJ29yaWVudGF0aW9uY2hhbmdlJykge1xuXHRcdFx0XHRcdHZhciBjb2xsYXBzaWJsZSA9IHRoaXMuaXNDb2xsYXBzaWJsZSgpO1xuXHRcdFx0XHRcdC8vIGlmIGl0IHdhcyBjb2xsYXBzaWJsZSBiZWZvcmUgcmVzaXplIGFuZCBzdGlsbCBpcywgZG9uJ3QgZG8gaXRcblx0XHRcdFx0XHRpZiAoISh0aGlzLndhc0NvbGxhcHNpYmxlICYmIGNvbGxhcHNpYmxlKSkgeyBcblx0XHRcdFx0XHRcdGlmICh0aGlzLmFjdGl2YXRlZEl0ZW1zLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmFjdGl2YXRlZEl0ZW1zW3RoaXMuYWN0aXZhdGVkSXRlbXMubGVuZ3RoIC0gMV1bMF0uYmx1cigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGhpcy5tZW51SGlkZUFsbCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLndhc0NvbGxhcHNpYmxlID0gY29sbGFwc2libGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdCQuZm4uZGF0YVNNID0gZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHRpZiAodmFsKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKGtleSArICdfc21hcnRtZW51cycsIHZhbCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmRhdGEoa2V5ICsgJ19zbWFydG1lbnVzJyk7XG5cdH07XG5cblx0JC5mbi5yZW1vdmVEYXRhU00gPSBmdW5jdGlvbihrZXkpIHtcblx0XHRyZXR1cm4gdGhpcy5yZW1vdmVEYXRhKGtleSArICdfc21hcnRtZW51cycpO1xuXHR9O1xuXG5cdCQuZm4uc21hcnRtZW51cyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ3N0cmluZycpIHtcblx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzLFxuXHRcdFx0XHRtZXRob2QgPSBvcHRpb25zO1xuXHRcdFx0QXJyYXkucHJvdG90eXBlLnNoaWZ0LmNhbGwoYXJncyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc21hcnRtZW51cyA9ICQodGhpcykuZGF0YSgnc21hcnRtZW51cycpO1xuXHRcdFx0XHRpZiAoc21hcnRtZW51cyAmJiBzbWFydG1lbnVzW21ldGhvZF0pIHtcblx0XHRcdFx0XHRzbWFydG1lbnVzW21ldGhvZF0uYXBwbHkoc21hcnRtZW51cywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gW2RhdGEtc20tb3B0aW9uc10gYXR0cmlidXRlIG9uIHRoZSByb290IFVMXG5cdFx0XHR2YXIgZGF0YU9wdHMgPSAkKHRoaXMpLmRhdGEoJ3NtLW9wdGlvbnMnKSB8fCBudWxsO1xuXHRcdFx0aWYgKGRhdGFPcHRzKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0ZGF0YU9wdHMgPSBldmFsKCcoJyArIGRhdGFPcHRzICsgJyknKTtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0ZGF0YU9wdHMgPSBudWxsO1xuXHRcdFx0XHRcdGFsZXJ0KCdFUlJPUlxcblxcblNtYXJ0TWVudXMgalF1ZXJ5IGluaXQ6XFxuSW52YWxpZCBcImRhdGEtc20tb3B0aW9uc1wiIGF0dHJpYnV0ZSB2YWx1ZSBzeW50YXguJyk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRuZXcgJC5TbWFydE1lbnVzKHRoaXMsICQuZXh0ZW5kKHt9LCAkLmZuLnNtYXJ0bWVudXMuZGVmYXVsdHMsIG9wdGlvbnMsIGRhdGFPcHRzKSk7XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gZGVmYXVsdCBzZXR0aW5nc1xuXHQkLmZuLnNtYXJ0bWVudXMuZGVmYXVsdHMgPSB7XG5cdFx0aXNQb3B1cDpcdFx0ZmFsc2UsXHRcdC8vIGlzIHRoaXMgYSBwb3B1cCBtZW51IChjYW4gYmUgc2hvd24gdmlhIHRoZSBwb3B1cFNob3cvcG9wdXBIaWRlIG1ldGhvZHMpIG9yIGEgcGVybWFuZW50IG1lbnUgYmFyXG5cdFx0bWFpbk1lbnVTdWJPZmZzZXRYOlx0MCxcdFx0Ly8gcGl4ZWxzIG9mZnNldCBmcm9tIGRlZmF1bHQgcG9zaXRpb25cblx0XHRtYWluTWVudVN1Yk9mZnNldFk6XHQwLFx0XHQvLyBwaXhlbHMgb2Zmc2V0IGZyb20gZGVmYXVsdCBwb3NpdGlvblxuXHRcdHN1Yk1lbnVzU3ViT2Zmc2V0WDpcdDAsXHRcdC8vIHBpeGVscyBvZmZzZXQgZnJvbSBkZWZhdWx0IHBvc2l0aW9uXG5cdFx0c3ViTWVudXNTdWJPZmZzZXRZOlx0MCxcdFx0Ly8gcGl4ZWxzIG9mZnNldCBmcm9tIGRlZmF1bHQgcG9zaXRpb25cblx0XHRzdWJNZW51c01pbldpZHRoOlx0JzEwZW0nLFx0XHQvLyBtaW4td2lkdGggZm9yIHRoZSBzdWIgbWVudXMgKGFueSBDU1MgdW5pdCkgLSBpZiBzZXQsIHRoZSBmaXhlZCB3aWR0aCBzZXQgaW4gQ1NTIHdpbGwgYmUgaWdub3JlZFxuXHRcdHN1Yk1lbnVzTWF4V2lkdGg6XHQnMjBlbScsXHRcdC8vIG1heC13aWR0aCBmb3IgdGhlIHN1YiBtZW51cyAoYW55IENTUyB1bml0KSAtIGlmIHNldCwgdGhlIGZpeGVkIHdpZHRoIHNldCBpbiBDU1Mgd2lsbCBiZSBpZ25vcmVkXG5cdFx0c3ViSW5kaWNhdG9yczogXHRcdHRydWUsXHRcdC8vIGNyZWF0ZSBzdWIgbWVudSBpbmRpY2F0b3JzIC0gY3JlYXRlcyBhIFNQQU4gYW5kIGluc2VydHMgaXQgaW4gdGhlIEFcblx0XHRzdWJJbmRpY2F0b3JzUG9zOiBcdCdhcHBlbmQnLFx0Ly8gcG9zaXRpb24gb2YgdGhlIFNQQU4gcmVsYXRpdmUgdG8gdGhlIG1lbnUgaXRlbSBjb250ZW50ICgnYXBwZW5kJywgJ3ByZXBlbmQnKVxuXHRcdHN1YkluZGljYXRvcnNUZXh0Olx0JycsXHRcdC8vIFtvcHRpb25hbGx5XSBhZGQgdGV4dCBpbiB0aGUgU1BBTiAoZS5nLiAnKycpICh5b3UgbWF5IHdhbnQgdG8gY2hlY2sgdGhlIENTUyBmb3IgdGhlIHN1YiBpbmRpY2F0b3JzIHRvbylcblx0XHRzY3JvbGxTdGVwOiBcdFx0MzAsXHRcdC8vIHBpeGVscyBzdGVwIHdoZW4gc2Nyb2xsaW5nIGxvbmcgc3ViIG1lbnVzIHRoYXQgZG8gbm90IGZpdCBpbiB0aGUgdmlld3BvcnQgaGVpZ2h0XG5cdFx0c2Nyb2xsQWNjZWxlcmF0ZTpcdHRydWUsXHRcdC8vIGFjY2VsZXJhdGUgc2Nyb2xsaW5nIG9yIHVzZSBhIGZpeGVkIHN0ZXBcblx0XHRzaG93VGltZW91dDpcdFx0MjUwLFx0XHQvLyB0aW1lb3V0IGJlZm9yZSBzaG93aW5nIHRoZSBzdWIgbWVudXNcblx0XHRoaWRlVGltZW91dDpcdFx0NTAwLFx0XHQvLyB0aW1lb3V0IGJlZm9yZSBoaWRpbmcgdGhlIHN1YiBtZW51c1xuXHRcdHNob3dEdXJhdGlvbjpcdFx0MCxcdFx0Ly8gZHVyYXRpb24gZm9yIHNob3cgYW5pbWF0aW9uIC0gc2V0IHRvIDAgZm9yIG5vIGFuaW1hdGlvbiAtIG1hdHRlcnMgb25seSBpZiBzaG93RnVuY3Rpb246bnVsbFxuXHRcdHNob3dGdW5jdGlvbjpcdFx0bnVsbCxcdFx0Ly8gY3VzdG9tIGZ1bmN0aW9uIHRvIHVzZSB3aGVuIHNob3dpbmcgYSBzdWIgbWVudSAodGhlIGRlZmF1bHQgaXMgdGhlIGpRdWVyeSAnc2hvdycpXG5cdFx0XHRcdFx0XHRcdC8vIGRvbid0IGZvcmdldCB0byBjYWxsIGNvbXBsZXRlKCkgYXQgdGhlIGVuZCBvZiB3aGF0ZXZlciB5b3UgZG9cblx0XHRcdFx0XHRcdFx0Ly8gZS5nLjogZnVuY3Rpb24oJHVsLCBjb21wbGV0ZSkgeyAkdWwuZmFkZUluKDI1MCwgY29tcGxldGUpOyB9XG5cdFx0aGlkZUR1cmF0aW9uOlx0XHQwLFx0XHQvLyBkdXJhdGlvbiBmb3IgaGlkZSBhbmltYXRpb24gLSBzZXQgdG8gMCBmb3Igbm8gYW5pbWF0aW9uIC0gbWF0dGVycyBvbmx5IGlmIGhpZGVGdW5jdGlvbjpudWxsXG5cdFx0aGlkZUZ1bmN0aW9uOlx0XHRmdW5jdGlvbigkdWwsIGNvbXBsZXRlKSB7ICR1bC5mYWRlT3V0KDIwMCwgY29tcGxldGUpOyB9LFx0Ly8gY3VzdG9tIGZ1bmN0aW9uIHRvIHVzZSB3aGVuIGhpZGluZyBhIHN1YiBtZW51ICh0aGUgZGVmYXVsdCBpcyB0aGUgalF1ZXJ5ICdoaWRlJylcblx0XHRcdFx0XHRcdFx0Ly8gZG9uJ3QgZm9yZ2V0IHRvIGNhbGwgY29tcGxldGUoKSBhdCB0aGUgZW5kIG9mIHdoYXRldmVyIHlvdSBkb1xuXHRcdFx0XHRcdFx0XHQvLyBlLmcuOiBmdW5jdGlvbigkdWwsIGNvbXBsZXRlKSB7ICR1bC5mYWRlT3V0KDI1MCwgY29tcGxldGUpOyB9XG5cdFx0Y29sbGFwc2libGVTaG93RHVyYXRpb246MCxcdFx0Ly8gZHVyYXRpb24gZm9yIHNob3cgYW5pbWF0aW9uIGZvciBjb2xsYXBzaWJsZSBzdWIgbWVudXMgLSBtYXR0ZXJzIG9ubHkgaWYgY29sbGFwc2libGVTaG93RnVuY3Rpb246bnVsbFxuXHRcdGNvbGxhcHNpYmxlU2hvd0Z1bmN0aW9uOmZ1bmN0aW9uKCR1bCwgY29tcGxldGUpIHsgJHVsLnNsaWRlRG93bigyMDAsIGNvbXBsZXRlKTsgfSxcdC8vIGN1c3RvbSBmdW5jdGlvbiB0byB1c2Ugd2hlbiBzaG93aW5nIGEgY29sbGFwc2libGUgc3ViIG1lbnVcblx0XHRcdFx0XHRcdFx0Ly8gKGkuZS4gd2hlbiBtb2JpbGUgc3R5bGVzIGFyZSB1c2VkIHRvIG1ha2UgdGhlIHN1YiBtZW51cyBjb2xsYXBzaWJsZSlcblx0XHRjb2xsYXBzaWJsZUhpZGVEdXJhdGlvbjowLFx0XHQvLyBkdXJhdGlvbiBmb3IgaGlkZSBhbmltYXRpb24gZm9yIGNvbGxhcHNpYmxlIHN1YiBtZW51cyAtIG1hdHRlcnMgb25seSBpZiBjb2xsYXBzaWJsZUhpZGVGdW5jdGlvbjpudWxsXG5cdFx0Y29sbGFwc2libGVIaWRlRnVuY3Rpb246ZnVuY3Rpb24oJHVsLCBjb21wbGV0ZSkgeyAkdWwuc2xpZGVVcCgyMDAsIGNvbXBsZXRlKTsgfSxcdC8vIGN1c3RvbSBmdW5jdGlvbiB0byB1c2Ugd2hlbiBoaWRpbmcgYSBjb2xsYXBzaWJsZSBzdWIgbWVudVxuXHRcdFx0XHRcdFx0XHQvLyAoaS5lLiB3aGVuIG1vYmlsZSBzdHlsZXMgYXJlIHVzZWQgdG8gbWFrZSB0aGUgc3ViIG1lbnVzIGNvbGxhcHNpYmxlKVxuXHRcdHNob3dPbkNsaWNrOlx0XHRmYWxzZSxcdFx0Ly8gc2hvdyB0aGUgZmlyc3QtbGV2ZWwgc3ViIG1lbnVzIG9uY2xpY2sgaW5zdGVhZCBvZiBvbm1vdXNlb3ZlciAoaS5lLiBtaW1pYyBkZXNrdG9wIGFwcCBtZW51cykgKG1hdHRlcnMgb25seSBmb3IgbW91c2UgaW5wdXQpXG5cdFx0aGlkZU9uQ2xpY2s6XHRcdHRydWUsXHRcdC8vIGhpZGUgdGhlIHN1YiBtZW51cyBvbiBjbGljay90YXAgYW55d2hlcmUgb24gdGhlIHBhZ2Vcblx0XHRub01vdXNlT3ZlcjpcdFx0ZmFsc2UsXHRcdC8vIGRpc2FibGUgc3ViIG1lbnVzIGFjdGl2YXRpb24gb25tb3VzZW92ZXIgKGkuZS4gYmVoYXZlIGxpa2UgaW4gdG91Y2ggbW9kZSAtIHVzZSBqdXN0IG1vdXNlIGNsaWNrcykgKG1hdHRlcnMgb25seSBmb3IgbW91c2UgaW5wdXQpXG5cdFx0a2VlcEluVmlld3BvcnQ6XHRcdHRydWUsXHRcdC8vIHJlcG9zaXRpb24gdGhlIHN1YiBtZW51cyBpZiBuZWVkZWQgdG8gbWFrZSBzdXJlIHRoZXkgYWx3YXlzIGFwcGVhciBpbnNpZGUgdGhlIHZpZXdwb3J0XG5cdFx0a2VlcEhpZ2hsaWdodGVkOlx0dHJ1ZSxcdFx0Ly8ga2VlcCBhbGwgYW5jZXN0b3IgaXRlbXMgb2YgdGhlIGN1cnJlbnQgc3ViIG1lbnUgaGlnaGxpZ2h0ZWQgKGFkZHMgdGhlICdoaWdobGlnaHRlZCcgY2xhc3MgdG8gdGhlIEEncylcblx0XHRtYXJrQ3VycmVudEl0ZW06XHRmYWxzZSxcdFx0Ly8gYXV0b21hdGljYWxseSBhZGQgdGhlICdjdXJyZW50JyBjbGFzcyB0byB0aGUgQSBlbGVtZW50IG9mIHRoZSBpdGVtIGxpbmtpbmcgdG8gdGhlIGN1cnJlbnQgVVJMXG5cdFx0bWFya0N1cnJlbnRUcmVlOlx0dHJ1ZSxcdFx0Ly8gYWRkIHRoZSAnY3VycmVudCcgY2xhc3MgYWxzbyB0byB0aGUgQSBlbGVtZW50cyBvZiBhbGwgYW5jZXN0b3IgaXRlbXMgb2YgdGhlIGN1cnJlbnQgaXRlbVxuXHRcdHJpZ2h0VG9MZWZ0U3ViTWVudXM6XHRmYWxzZSxcdFx0Ly8gcmlnaHQgdG8gbGVmdCBkaXNwbGF5IG9mIHRoZSBzdWIgbWVudXMgKGNoZWNrIHRoZSBDU1MgZm9yIHRoZSBzdWIgaW5kaWNhdG9ycycgcG9zaXRpb24pXG5cdFx0Ym90dG9tVG9Ub3BTdWJNZW51czpcdGZhbHNlLFx0XHQvLyBib3R0b20gdG8gdG9wIGRpc3BsYXkgb2YgdGhlIHN1YiBtZW51c1xuXHRcdGNvbGxhcHNpYmxlQmVoYXZpb3I6XHQnZGVmYXVsdCdcdC8vIHBhcmVudCBpdGVtcyBiZWhhdmlvciBpbiBjb2xsYXBzaWJsZSAobW9iaWxlKSB2aWV3ICgnZGVmYXVsdCcsICd0b2dnbGUnLCAnbGluaycsICdhY2NvcmRpb24nLCAnYWNjb3JkaW9uLXRvZ2dsZScsICdhY2NvcmRpb24tbGluaycpXG5cdFx0XHRcdFx0XHRcdC8vICdkZWZhdWx0JyAtIGZpcnN0IHRhcCBvbiBwYXJlbnQgaXRlbSBleHBhbmRzIHN1Yiwgc2Vjb25kIHRhcCBsb2FkcyBpdHMgbGlua1xuXHRcdFx0XHRcdFx0XHQvLyAndG9nZ2xlJyAtIHRoZSB3aG9sZSBwYXJlbnQgaXRlbSBhY3RzIGp1c3QgYXMgYSB0b2dnbGUgYnV0dG9uIGZvciBpdHMgc3ViIG1lbnUgKGV4cGFuZHMvY29sbGFwc2VzIG9uIGVhY2ggdGFwKVxuXHRcdFx0XHRcdFx0XHQvLyAnbGluaycgLSB0aGUgcGFyZW50IGl0ZW0gYWN0cyBhcyBhIHJlZ3VsYXIgaXRlbSAoZmlyc3QgdGFwIGxvYWRzIGl0cyBsaW5rKSwgdGhlIHN1YiBtZW51IGNhbiBiZSBleHBhbmRlZCBvbmx5IHZpYSB0aGUgKy8tIGJ1dHRvblxuXHRcdFx0XHRcdFx0XHQvLyAnYWNjb3JkaW9uJyAtIGxpa2UgJ2RlZmF1bHQnIGJ1dCBvbiBleHBhbmQgYWxzbyByZXNldHMgYW55IHZpc2libGUgc3ViIG1lbnVzIGZyb20gZGVlcGVyIGxldmVscyBvciBvdGhlciBicmFuY2hlc1xuXHRcdFx0XHRcdFx0XHQvLyAnYWNjb3JkaW9uLXRvZ2dsZScgLSBsaWtlICd0b2dnbGUnIGJ1dCBvbiBleHBhbmQgYWxzbyByZXNldHMgYW55IHZpc2libGUgc3ViIG1lbnVzIGZyb20gZGVlcGVyIGxldmVscyBvciBvdGhlciBicmFuY2hlc1xuXHRcdFx0XHRcdFx0XHQvLyAnYWNjb3JkaW9uLWxpbmsnIC0gbGlrZSAnbGluaycgYnV0IG9uIGV4cGFuZCBhbHNvIHJlc2V0cyBhbnkgdmlzaWJsZSBzdWIgbWVudXMgZnJvbSBkZWVwZXIgbGV2ZWxzIG9yIG90aGVyIGJyYW5jaGVzXG5cdH07XG5cblx0cmV0dXJuICQ7XG59KSk7IiwiIWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJleHBvcnRzXCJdLHQpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpdChleHBvcnRzKTtlbHNle3ZhciBvPXt9O3QobyksZS5ib2R5U2Nyb2xsTG9jaz1vfX0odGhpcyxmdW5jdGlvbihleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLG89QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKW9bdF09ZVt0XTtyZXR1cm4gb31yZXR1cm4gQXJyYXkuZnJvbShlKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbD0hMTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXt2YXIgZT17Z2V0IHBhc3NpdmUoKXtsPSEwfX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSl9dmFyIGQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lm5hdmlnYXRvciYmd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSYmL2lQKGFkfGhvbmV8b2QpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0pLGM9W10sdT0hMSxhPS0xLHM9dm9pZCAwLHY9dm9pZCAwLGY9ZnVuY3Rpb24odCl7cmV0dXJuIGMuc29tZShmdW5jdGlvbihlKXtyZXR1cm4hKCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmV8fCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmUodCkpfSl9LG09ZnVuY3Rpb24oZSl7dmFyIHQ9ZXx8d2luZG93LmV2ZW50O3JldHVybiEhZih0LnRhcmdldCl8fCgxPHQudG91Y2hlcy5sZW5ndGh8fCh0LnByZXZlbnREZWZhdWx0JiZ0LnByZXZlbnREZWZhdWx0KCksITEpKX0sbz1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt2b2lkIDAhPT12JiYoZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dix2PXZvaWQgMCksdm9pZCAwIT09cyYmKGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9cyxzPXZvaWQgMCl9KX07ZXhwb3J0cy5kaXNhYmxlQm9keVNjcm9sbD1mdW5jdGlvbihpLGUpe2lmKGQpe2lmKCFpKXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJkaXNhYmxlQm9keVNjcm9sbCB1bnN1Y2Nlc3NmdWwgLSB0YXJnZXRFbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgd2hlbiBjYWxsaW5nIGRpc2FibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTtpZihpJiYhYy5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQ9PT1pfSkpe3ZhciB0PXt0YXJnZXRFbGVtZW50Omksb3B0aW9uczplfHx7fX07Yz1bXS5jb25jYXQocihjKSxbdF0pLGkub250b3VjaHN0YXJ0PWZ1bmN0aW9uKGUpezE9PT1lLnRhcmdldFRvdWNoZXMubGVuZ3RoJiYoYT1lLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSl9LGkub250b3VjaG1vdmU9ZnVuY3Rpb24oZSl7dmFyIHQsbyxuLHI7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJihvPWkscj0odD1lKS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFktYSwhZih0LnRhcmdldCkmJihvJiYwPT09by5zY3JvbGxUb3AmJjA8cj9tKHQpOihuPW8pJiZuLnNjcm9sbEhlaWdodC1uLnNjcm9sbFRvcDw9bi5jbGllbnRIZWlnaHQmJnI8MD9tKHQpOnQuc3RvcFByb3BhZ2F0aW9uKCkpKX0sdXx8KGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMCl9fWVsc2V7bj1lLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZih2b2lkIDA9PT12KXt2YXIgZT0hIW4mJiEwPT09bi5yZXNlcnZlU2Nyb2xsQmFyR2FwLHQ9d2luZG93LmlubmVyV2lkdGgtZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO2UmJjA8dCYmKHY9ZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQsZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dCtcInB4XCIpfXZvaWQgMD09PXMmJihzPWRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3csZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiKX0pO3ZhciBvPXt0YXJnZXRFbGVtZW50Omksb3B0aW9uczplfHx7fX07Yz1bXS5jb25jYXQocihjKSxbb10pfXZhciBufSxleHBvcnRzLmNsZWFyQWxsQm9keVNjcm9sbExvY2tzPWZ1bmN0aW9uKCl7ZD8oYy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UudGFyZ2V0RWxlbWVudC5vbnRvdWNoc3RhcnQ9bnVsbCxlLnRhcmdldEVsZW1lbnQub250b3VjaG1vdmU9bnVsbH0pLHUmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsbSxsP3twYXNzaXZlOiExfTp2b2lkIDApLHU9ITEpLGM9W10sYT0tMSk6KG8oKSxjPVtdKX0sZXhwb3J0cy5lbmFibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKHQpe2lmKGQpe2lmKCF0KXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJlbmFibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZW5hYmxlQm9keVNjcm9sbCBvbiBJT1MgZGV2aWNlcy5cIik7dC5vbnRvdWNoc3RhcnQ9bnVsbCx0Lm9udG91Y2htb3ZlPW51bGwsYz1jLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50IT09dH0pLHUmJjA9PT1jLmxlbmd0aCYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMSl9ZWxzZSAxPT09Yy5sZW5ndGgmJmNbMF0udGFyZ2V0RWxlbWVudD09PXQ/KG8oKSxjPVtdKTpjPWMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSl9fSk7XG4iLCIvLyBTdGlja3kgUGx1Z2luIHYxLjAuNCBmb3IgalF1ZXJ5XG4vLyA9PT09PT09PT09PT09XG4vLyBBdXRob3I6IEFudGhvbnkgR2FyYW5kXG4vLyBJbXByb3ZlbWVudHMgYnkgR2VybWFuIE0uIEJyYXZvIChLcm9udXopIGFuZCBSdXVkIEthbXBodWlzIChydXVkaylcbi8vIEltcHJvdmVtZW50cyBieSBMZW9uYXJkbyBDLiBEYXJvbmNvIChkYXJvbmNvKVxuLy8gQ3JlYXRlZDogMDIvMTQvMjAxMVxuLy8gRGF0ZTogMDcvMjAvMjAxNVxuLy8gV2Vic2l0ZTogaHR0cDovL3N0aWNreWpzLmNvbS9cbi8vIERlc2NyaXB0aW9uOiBNYWtlcyBhbiBlbGVtZW50IG9uIHRoZSBwYWdlIHN0aWNrIG9uIHRoZSBzY3JlZW4gYXMgeW91IHNjcm9sbFxuLy8gICAgICAgICAgICAgIEl0IHdpbGwgb25seSBzZXQgdGhlICd0b3AnIGFuZCAncG9zaXRpb24nIG9mIHlvdXIgZWxlbWVudCwgeW91XG4vLyAgICAgICAgICAgICAgbWlnaHQgbmVlZCB0byBhZGp1c3QgdGhlIHdpZHRoIGluIHNvbWUgY2FzZXMuXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAvLyBOb2RlL0NvbW1vbkpTXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KGZ1bmN0aW9uICgkKSB7XG4gICAgdmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlOyAvLyBzYXZlIHJlZiB0byBvcmlnaW5hbCBzbGljZSgpXG4gICAgdmFyIHNwbGljZSA9IEFycmF5LnByb3RvdHlwZS5zcGxpY2U7IC8vIHNhdmUgcmVmIHRvIG9yaWdpbmFsIHNsaWNlKClcblxuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICB0b3BTcGFjaW5nOiAwLFxuICAgICAgYm90dG9tU3BhY2luZzogMCxcbiAgICAgIGNsYXNzTmFtZTogJ2lzLXN0aWNreScsXG4gICAgICB3cmFwcGVyQ2xhc3NOYW1lOiAnc3RpY2t5LXdyYXBwZXInLFxuICAgICAgY2VudGVyOiBmYWxzZSxcbiAgICAgIGdldFdpZHRoRnJvbTogJycsXG4gICAgICB3aWR0aEZyb21XcmFwcGVyOiB0cnVlLCAvLyB3b3JrcyBvbmx5IHdoZW4gLmdldFdpZHRoRnJvbSBpcyBlbXB0eVxuICAgICAgcmVzcG9uc2l2ZVdpZHRoOiBmYWxzZSxcbiAgICAgIHpJbmRleDogJ2luaGVyaXQnXG4gICAgfSxcbiAgICAkd2luZG93ID0gJCh3aW5kb3cpLFxuICAgICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpLFxuICAgIHN0aWNrZWQgPSBbXSxcbiAgICB3aW5kb3dIZWlnaHQgPSAkd2luZG93LmhlaWdodCgpLFxuICAgIHNjcm9sbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gJHdpbmRvdy5zY3JvbGxUb3AoKSxcbiAgICAgICAgZG9jdW1lbnRIZWlnaHQgPSAkZG9jdW1lbnQuaGVpZ2h0KCksXG4gICAgICAgIGR3aCA9IGRvY3VtZW50SGVpZ2h0IC0gd2luZG93SGVpZ2h0LFxuICAgICAgICBleHRyYSA9IChzY3JvbGxUb3AgPiBkd2gpID8gZHdoIC0gc2Nyb2xsVG9wIDogMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdGlja2VkLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcyA9IHN0aWNrZWRbaV0sXG4gICAgICAgICAgZWxlbWVudFRvcCA9IHMuc3RpY2t5V3JhcHBlci5vZmZzZXQoKS50b3AsXG4gICAgICAgICAgZXRzZSA9IGVsZW1lbnRUb3AgLSBzLnRvcFNwYWNpbmcgLSBleHRyYTtcblxuICAgICAgICAvL3VwZGF0ZSBoZWlnaHQgaW4gY2FzZSBvZiBkeW5hbWljIGNvbnRlbnRcbiAgICAgICAgcy5zdGlja3lXcmFwcGVyLmNzcygnaGVpZ2h0Jywgcy5zdGlja3lFbGVtZW50Lm91dGVySGVpZ2h0KCkpO1xuXG4gICAgICAgIGlmIChzY3JvbGxUb3AgPD0gZXRzZSkge1xuICAgICAgICAgIGlmIChzLmN1cnJlbnRUb3AgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudFxuICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAnJyxcbiAgICAgICAgICAgICAgICAncG9zaXRpb24nOiAnJyxcbiAgICAgICAgICAgICAgICAndG9wJzogJycsXG4gICAgICAgICAgICAgICAgJ3otaW5kZXgnOiAnJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC5wYXJlbnQoKS5yZW1vdmVDbGFzcyhzLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICBzLnN0aWNreUVsZW1lbnQudHJpZ2dlcignc3RpY2t5LWVuZCcsIFtzXSk7XG4gICAgICAgICAgICBzLmN1cnJlbnRUb3AgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgbmV3VG9wID0gZG9jdW1lbnRIZWlnaHQgLSBzLnN0aWNreUVsZW1lbnQub3V0ZXJIZWlnaHQoKVxuICAgICAgICAgICAgLSBzLnRvcFNwYWNpbmcgLSBzLmJvdHRvbVNwYWNpbmcgLSBzY3JvbGxUb3AgLSBleHRyYTtcbiAgICAgICAgICBpZiAobmV3VG9wIDwgMCkge1xuICAgICAgICAgICAgbmV3VG9wID0gbmV3VG9wICsgcy50b3BTcGFjaW5nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdUb3AgPSBzLnRvcFNwYWNpbmc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzLmN1cnJlbnRUb3AgIT09IG5ld1RvcCkge1xuICAgICAgICAgICAgdmFyIG5ld1dpZHRoO1xuICAgICAgICAgICAgaWYgKHMuZ2V0V2lkdGhGcm9tKSB7XG4gICAgICAgICAgICAgICAgcGFkZGluZyA9ICBzLnN0aWNreUVsZW1lbnQuaW5uZXJXaWR0aCgpIC0gcy5zdGlja3lFbGVtZW50LndpZHRoKCk7XG4gICAgICAgICAgICAgICAgbmV3V2lkdGggPSAkKHMuZ2V0V2lkdGhGcm9tKS53aWR0aCgpIC0gcGFkZGluZyB8fCBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzLndpZHRoRnJvbVdyYXBwZXIpIHtcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCA9IHMuc3RpY2t5V3JhcHBlci53aWR0aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1dpZHRoID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCA9IHMuc3RpY2t5RWxlbWVudC53aWR0aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50XG4gICAgICAgICAgICAgIC5jc3MoJ3dpZHRoJywgbmV3V2lkdGgpXG4gICAgICAgICAgICAgIC5jc3MoJ3Bvc2l0aW9uJywgJ2ZpeGVkJylcbiAgICAgICAgICAgICAgLmNzcygndG9wJywgbmV3VG9wKVxuICAgICAgICAgICAgICAuY3NzKCd6LWluZGV4Jywgcy56SW5kZXgpO1xuXG4gICAgICAgICAgICBzLnN0aWNreUVsZW1lbnQucGFyZW50KCkuYWRkQ2xhc3Mocy5jbGFzc05hbWUpO1xuXG4gICAgICAgICAgICBpZiAocy5jdXJyZW50VG9wID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC50cmlnZ2VyKCdzdGlja3ktc3RhcnQnLCBbc10pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gc3RpY2t5IGlzIHN0YXJ0ZWQgYnV0IGl0IGhhdmUgdG8gYmUgcmVwb3NpdGlvbmVkXG4gICAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC50cmlnZ2VyKCdzdGlja3ktdXBkYXRlJywgW3NdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHMuY3VycmVudFRvcCA9PT0gcy50b3BTcGFjaW5nICYmIHMuY3VycmVudFRvcCA+IG5ld1RvcCB8fCBzLmN1cnJlbnRUb3AgPT09IG51bGwgJiYgbmV3VG9wIDwgcy50b3BTcGFjaW5nKSB7XG4gICAgICAgICAgICAgIC8vIGp1c3QgcmVhY2hlZCBib3R0b20gfHwganVzdCBzdGFydGVkIHRvIHN0aWNrIGJ1dCBib3R0b20gaXMgYWxyZWFkeSByZWFjaGVkXG4gICAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC50cmlnZ2VyKCdzdGlja3ktYm90dG9tLXJlYWNoZWQnLCBbc10pO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHMuY3VycmVudFRvcCAhPT0gbnVsbCAmJiBuZXdUb3AgPT09IHMudG9wU3BhY2luZyAmJiBzLmN1cnJlbnRUb3AgPCBuZXdUb3ApIHtcbiAgICAgICAgICAgICAgLy8gc3RpY2t5IGlzIHN0YXJ0ZWQgJiYgc3RpY2tlZCBhdCB0b3BTcGFjaW5nICYmIG92ZXJmbG93aW5nIGZyb20gdG9wIGp1c3QgZmluaXNoZWRcbiAgICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50LnRyaWdnZXIoJ3N0aWNreS1ib3R0b20tdW5yZWFjaGVkJywgW3NdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcy5jdXJyZW50VG9wID0gbmV3VG9wO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENoZWNrIGlmIHN0aWNreSBoYXMgcmVhY2hlZCBlbmQgb2YgY29udGFpbmVyIGFuZCBzdG9wIHN0aWNraW5nXG4gICAgICAgICAgdmFyIHN0aWNreVdyYXBwZXJDb250YWluZXIgPSBzLnN0aWNreVdyYXBwZXIucGFyZW50KCk7XG4gICAgICAgICAgdmFyIHVuc3RpY2sgPSAocy5zdGlja3lFbGVtZW50Lm9mZnNldCgpLnRvcCArIHMuc3RpY2t5RWxlbWVudC5vdXRlckhlaWdodCgpID49IHN0aWNreVdyYXBwZXJDb250YWluZXIub2Zmc2V0KCkudG9wICsgc3RpY2t5V3JhcHBlckNvbnRhaW5lci5vdXRlckhlaWdodCgpKSAmJiAocy5zdGlja3lFbGVtZW50Lm9mZnNldCgpLnRvcCA8PSBzLnRvcFNwYWNpbmcpO1xuXG4gICAgICAgICAgaWYoIHVuc3RpY2sgKSB7XG4gICAgICAgICAgICBzLnN0aWNreUVsZW1lbnRcbiAgICAgICAgICAgICAgLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKVxuICAgICAgICAgICAgICAuY3NzKCd0b3AnLCAnJylcbiAgICAgICAgICAgICAgLmNzcygnYm90dG9tJywgMClcbiAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsICcnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50XG4gICAgICAgICAgICAgIC5jc3MoJ3Bvc2l0aW9uJywgJ2ZpeGVkJylcbiAgICAgICAgICAgICAgLmNzcygndG9wJywgbmV3VG9wKVxuICAgICAgICAgICAgICAuY3NzKCdib3R0b20nLCAnJylcbiAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIHMuekluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHJlc2l6ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3RpY2tlZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIHMgPSBzdGlja2VkW2ldO1xuICAgICAgICB2YXIgbmV3V2lkdGggPSBudWxsO1xuICAgICAgICBpZiAocy5nZXRXaWR0aEZyb20pIHtcbiAgICAgICAgICAgIGlmIChzLnJlc3BvbnNpdmVXaWR0aCkge1xuICAgICAgICAgICAgICAgIG5ld1dpZHRoID0gJChzLmdldFdpZHRoRnJvbSkud2lkdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKHMud2lkdGhGcm9tV3JhcHBlcikge1xuICAgICAgICAgICAgbmV3V2lkdGggPSBzLnN0aWNreVdyYXBwZXIud2lkdGgoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3V2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50LmNzcygnd2lkdGgnLCBuZXdXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbml0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG8gPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICAgIHZhciBzdGlja3lFbGVtZW50ID0gJCh0aGlzKTtcblxuICAgICAgICAgIHZhciBzdGlja3lJZCA9IHN0aWNreUVsZW1lbnQuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgd3JhcHBlcklkID0gc3RpY2t5SWQgPyBzdGlja3lJZCArICctJyArIGRlZmF1bHRzLndyYXBwZXJDbGFzc05hbWUgOiBkZWZhdWx0cy53cmFwcGVyQ2xhc3NOYW1lO1xuICAgICAgICAgIHZhciB3cmFwcGVyID0gJCgnPGRpdj48L2Rpdj4nKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgd3JhcHBlcklkKVxuICAgICAgICAgICAgLmFkZENsYXNzKG8ud3JhcHBlckNsYXNzTmFtZSk7XG5cbiAgICAgICAgICBzdGlja3lFbGVtZW50LndyYXBBbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoXCIjXCIgKyB3cmFwcGVySWQpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgICAgICAgICAgfVxufSk7XG5cbiAgICAgICAgICB2YXIgc3RpY2t5V3JhcHBlciA9IHN0aWNreUVsZW1lbnQucGFyZW50KCk7XG5cbiAgICAgICAgICBpZiAoby5jZW50ZXIpIHtcbiAgICAgICAgICAgIHN0aWNreVdyYXBwZXIuY3NzKHt3aWR0aDpzdGlja3lFbGVtZW50Lm91dGVyV2lkdGgoKSxtYXJnaW5MZWZ0OlwiYXV0b1wiLG1hcmdpblJpZ2h0OlwiYXV0b1wifSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN0aWNreUVsZW1lbnQuY3NzKFwiZmxvYXRcIikgPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5jc3Moe1wiZmxvYXRcIjpcIm5vbmVcIn0pLnBhcmVudCgpLmNzcyh7XCJmbG9hdFwiOlwicmlnaHRcIn0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG8uc3RpY2t5RWxlbWVudCA9IHN0aWNreUVsZW1lbnQ7XG4gICAgICAgICAgby5zdGlja3lXcmFwcGVyID0gc3RpY2t5V3JhcHBlcjtcbiAgICAgICAgICBvLmN1cnJlbnRUb3AgICAgPSBudWxsO1xuXG4gICAgICAgICAgc3RpY2tlZC5wdXNoKG8pO1xuXG4gICAgICAgICAgbWV0aG9kcy5zZXRXcmFwcGVySGVpZ2h0KHRoaXMpO1xuICAgICAgICAgIG1ldGhvZHMuc2V0dXBDaGFuZ2VMaXN0ZW5lcnModGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgc2V0V3JhcHBlckhlaWdodDogZnVuY3Rpb24oc3RpY2t5RWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9ICQoc3RpY2t5RWxlbWVudCk7XG4gICAgICAgIHZhciBzdGlja3lXcmFwcGVyID0gZWxlbWVudC5wYXJlbnQoKTtcbiAgICAgICAgaWYgKHN0aWNreVdyYXBwZXIpIHtcbiAgICAgICAgICBzdGlja3lXcmFwcGVyLmNzcygnaGVpZ2h0JywgZWxlbWVudC5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgc2V0dXBDaGFuZ2VMaXN0ZW5lcnM6IGZ1bmN0aW9uKHN0aWNreUVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XG4gICAgICAgICAgICBpZiAobXV0YXRpb25zWzBdLmFkZGVkTm9kZXMubGVuZ3RoIHx8IG11dGF0aW9uc1swXS5yZW1vdmVkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIG1ldGhvZHMuc2V0V3JhcHBlckhlaWdodChzdGlja3lFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoc3RpY2t5RWxlbWVudCwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlSW5zZXJ0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgbWV0aG9kcy5zZXRXcmFwcGVySGVpZ2h0KHN0aWNreUVsZW1lbnQpO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlUmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBtZXRob2RzLnNldFdyYXBwZXJIZWlnaHQoc3RpY2t5RWxlbWVudCk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgIHN0aWNreUVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uRE9NTm9kZUluc2VydGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIG1ldGhvZHMuc2V0V3JhcHBlckhlaWdodChzdGlja3lFbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5hdHRhY2hFdmVudCgnb25ET01Ob2RlUmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBtZXRob2RzLnNldFdyYXBwZXJIZWlnaHQoc3RpY2t5RWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGRhdGU6IHNjcm9sbGVyLFxuICAgICAgdW5zdGljazogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICB2YXIgdW5zdGlja3lFbGVtZW50ID0gJCh0aGF0KTtcblxuICAgICAgICAgIHZhciByZW1vdmVJZHggPSAtMTtcbiAgICAgICAgICB2YXIgaSA9IHN0aWNrZWQubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgICAgICBpZiAoc3RpY2tlZFtpXS5zdGlja3lFbGVtZW50LmdldCgwKSA9PT0gdGhhdCkge1xuICAgICAgICAgICAgICAgIHNwbGljZS5jYWxsKHN0aWNrZWQsaSwxKTtcbiAgICAgICAgICAgICAgICByZW1vdmVJZHggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZW1vdmVJZHggIT09IC0xKSB7XG4gICAgICAgICAgICB1bnN0aWNreUVsZW1lbnQudW53cmFwKCk7XG4gICAgICAgICAgICB1bnN0aWNreUVsZW1lbnRcbiAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogJycsXG4gICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJycsXG4gICAgICAgICAgICAgICAgJ3RvcCc6ICcnLFxuICAgICAgICAgICAgICAgICdmbG9hdCc6ICcnLFxuICAgICAgICAgICAgICAgICd6LWluZGV4JzogJydcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgLy8gc2hvdWxkIGJlIG1vcmUgZWZmaWNpZW50IHRoYW4gdXNpbmcgJHdpbmRvdy5zY3JvbGwoc2Nyb2xsZXIpIGFuZCAkd2luZG93LnJlc2l6ZShyZXNpemVyKTpcbiAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbGVyLCBmYWxzZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZXIsIGZhbHNlKTtcbiAgfSBlbHNlIGlmICh3aW5kb3cuYXR0YWNoRXZlbnQpIHtcbiAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ29uc2Nyb2xsJywgc2Nyb2xsZXIpO1xuICAgIHdpbmRvdy5hdHRhY2hFdmVudCgnb25yZXNpemUnLCByZXNpemVyKTtcbiAgfVxuXG4gICQuZm4uc3RpY2t5ID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgaWYgKG1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCApIHtcbiAgICAgIHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgIH0gZWxzZSB7XG4gICAgICAkLmVycm9yKCdNZXRob2QgJyArIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnN0aWNreScpO1xuICAgIH1cbiAgfTtcblxuICAkLmZuLnVuc3RpY2sgPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBpZiAobWV0aG9kc1ttZXRob2RdKSB7XG4gICAgICByZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kICkge1xuICAgICAgcmV0dXJuIG1ldGhvZHMudW5zdGljay5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc3RpY2t5Jyk7XG4gICAgfVxuICB9O1xuICAkKGZ1bmN0aW9uKCkge1xuICAgIHNldFRpbWVvdXQoc2Nyb2xsZXIsIDApO1xuICB9KTtcbn0pKTtcbiIsIi8qPT09PT09IGpRdWVyeSBVSSBhY2NvcmRpb24gPT09PT09Ki9cblxuKGZ1bmN0aW9uKCQpIHtcbiAgICAkKCBcIi5hbWFfX2FjY29yZGlvblwiICkuYWNjb3JkaW9uKHtcbiAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiLFxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgIH0pO1xufSkoalF1ZXJ5KTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIGFsZXJ0LlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4gKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgIERydXBhbC5iZWhhdmlvcnMuYWxlcnQgPSB7XG4gICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgJC5jb29raWUoJ2FtYV9fYWxlcnQtLWhpZGUnKTtcbiAgICAgICB2YXIgYWxlcnRDb29raWUgPSAkLmNvb2tpZSgnYW1hX19hbGVydC0taGlkZScpO1xuICAgICAgIFxuICAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAgLy8gSWYgdGhlICdoaWRlIGNvb2tpZSBpcyBub3Qgc2V0IHdlIHNob3cgdGhlIGFsZXJ0XG4gICAgICAgICBpZiAoYWxlcnRDb29raWUgIT09ICcxJykge1xuICAgICAgICAgICAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmZhZGVJbihcInNsb3dcIik7XG4gICAgICAgICB9XG5cbiAgICAgICAgIC8vIEFkZCB0aGUgZXZlbnQgdGhhdCBjbG9zZXMgdGhlIHBvcHVwIGFuZCBzZXRzIHRoZSBjb29raWUgdGhhdCB0ZWxscyB1cyB0b1xuICAgICAgICAgLy8gbm90IHNob3cgaXQgYWdhaW4gdW50aWwgb25lIGRheSBoYXMgcGFzc2VkLlxuICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX2Nsb3NlJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICQoJy5hbWFfX2FsZXJ0X193cmFwJykuZmFkZU91dCgpO1xuICAgICAgICAgICAvLyBzZXQgdGhlIGNvb2tpZVxuICAgICAgICAgICAkLmNvb2tpZSgnYW1hX19hbGVydC0taGlkZScsICcxJywgeyBleHBpcmVzOiAxfSk7XG4gICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgIH0pO1xuICAgICAgIH0pKGpRdWVyeSk7XG4gICAgIH1cbiAgIH07XG4gfSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogYnAgY2FsY3VsYXRvci5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5icENhbGN1bGF0b3IgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgLy8gQ2xvbmUgbGFzdCByb3cgb2YgdGFibGVcbiAgICAgICQoJy5hZGQtYnAtcm93JykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciAkdGFibGVCb2R5ID0gJCgnI2JwQ2FsY3VsYXRvciB0YWJsZScpLmZpbmQoJ3Rib2R5JyksXG4gICAgICAgICAgJHRyTGFzdCA9ICR0YWJsZUJvZHkuZmluZCgndHI6bGFzdCcpLFxuICAgICAgICAgICR0ck5ldyA9ICR0ckxhc3QuY2xvbmUoKTtcblxuICAgICAgICAvLyBBcHBlbmQgbmV3IGNsYXNzIG5hbWUgdG8gY2xvbmVkIHJvd1xuICAgICAgICAkdHJMYXN0LmJlZm9yZSgkdHJOZXcpLmFkZENsYXNzKCdjbG9uZWQnKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XG5cbiAgICAgICAgLy8gQWRkIG5ldyBuYW1lIHdpdGggaW5kZXhcbiAgICAgICAgJHRhYmxlQm9keS5maW5kKCd0cjpsYXN0IGlucHV0JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICR0cklucHV0Q2xhc3NJbmRleCA9ICQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGggKyAxLFxuICAgICAgICAgICAgICAkdHJJbnB1dENsYXNzTmFtZSA9ICQodGhpcykuYXR0cignY2xhc3MnKTtcblxuICAgICAgICAgICQodGhpcykuYXR0cignbmFtZScsICR0cklucHV0Q2xhc3NOYW1lICsgJy0nICsgJHRySW5wdXRDbGFzc0luZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgndGQ6ZXEoMCknLCAkdHJMYXN0KS50ZXh0KCQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgLy8gV2hlbiBjbGVhci9yZXN0YXJ0IGJ1dHRvbiBpcyBjbGlja2VkIHJldHVybiB0YWJsZSB0byBpbml0aWFsIHN0YXRlXG4gICAgICAkKCcuY2xlYXItcmVzdGFydCcpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgY2xvbmVkIHJvd3NcbiAgICAgICAgdmFyICR0ckNsb25lZCA9ICQoJy5jbG9uZWQnKTtcbiAgICAgICAgJHRyQ2xvbmVkLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIFJlc2V0IHRvIGludGlhbCB2YWx1ZXNcbiAgICAgICAgJCgnI2JwQ2FsY3VsYXRvciBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykudmFsKCcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzZXQgZm9ybVxuICAgICAgICAkKCcjYnBDYWxjdWxhdG9yICcpLnZhbGlkYXRlKCkucmVzZXRGb3JtKCk7XG5cbiAgICAgICAgLy8gSGlkZSBvdXRwdXQgcm93XG4gICAgICAgICQoJy5icENhbGN1bGF0b3JfX3RhYmxlX19vdXRwdXQnKS5oaWRlKCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlIEJQXG4gICAgICBmdW5jdGlvbiBjYWxjdWxjYXRlQlAoYnBWYWx1ZSwgYnBPdXRwdXQpIHtcbiAgICAgICAgdmFyIGJwSW5wdXQgPSAwLCAvLyByb3cgY291bnRcbiAgICAgICAgICAgIGJwVG90YWwgPSAwLCAvLyBpbmNyZW1lbnRlZCBpbnB1dCB2YWx1ZXNcbiAgICAgICAgICAgIGJwQXZlcmFnZTsgLy8gYXZlcmFnZWQgYnBUb3RhbCAvIGJwSW5wdXRcblxuICAgICAgICBicFZhbHVlLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIElmIElucHV0IHZhbHVlcyBhcmUgZ3JlYXRlciB0aGFuIDAgdGhlbiB0dXJuIGludG8gYSBudW1iZXIgYW5kIHJvdW5kXG4gICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkgPiAwID8gTWF0aC5yb3VuZChwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCkpIDogZmFsc2U7XG5cbiAgICAgICAgICBpZiAodmFsICE9PSAwKSB7XG4gICAgICAgICAgICBicElucHV0ICs9IDE7XG4gICAgICAgICAgICBicFRvdGFsICs9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlXG4gICAgICAgIGJwQXZlcmFnZSA9IGJwVG90YWwgLyBicElucHV0ID4gMCA/IE1hdGgucm91bmQoYnBUb3RhbCAvIGJwSW5wdXQpIDogMDtcblxuICAgICAgICBicE91dHB1dC50ZXh0KGJwQXZlcmFnZSk7XG5cbiAgICAgICAgJCgnLmJwQ2FsY3VsYXRvcl9fdGFibGVfX291dHB1dCcpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gVmFsaWRhdGUgQlAgRm9ybVxuICAgICAgJCgnI2JwQ2FsY3VsYXRvcicpLnZhbGlkYXRlKHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIEJQIHdoZW4gY2FsY3VsYXRlIGlzIGNsaWNrZWRcbiAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICAgIHZhciBzeXNCcFZhbHVlID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtaW5wdXQnKSxcbiAgICAgICAgICAgIHN5c0JwT3V0cHV0ID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtb3V0cHV0Jyk7XG5cbiAgICAgICAgICB2YXIgZGlhQnBWYWx1ZSA9ICQoJy5icENhbGN1bGF0b3JfX2RpYXN0b2xpYy1pbnB1dCcpLFxuICAgICAgICAgICAgZGlhQnBPdXRwdXQgPSAkKCcuYnBDYWxjdWxhdG9yX19kaWFzdG9saWMtb3V0cHV0Jyk7XG5cbiAgICAgICAgICBjYWxjdWxjYXRlQlAoc3lzQnBWYWx1ZSwgc3lzQnBPdXRwdXQpO1xuICAgICAgICAgIGNhbGN1bGNhdGVCUChkaWFCcFZhbHVlLCBkaWFCcE91dHB1dCk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbigkKSB7XG4gICQoJy5hbWFfX3N1YmNhdGVnb3J5LWZlYXR1cmVkLWNvbnRlbnQtYXMtY2Fyb3VzZWwgLmdyaWQtY29udGFpbmVyJykuc2xpY2soe1xuICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICBzbGlkZXNUb1Njcm9sbDogMixcbiAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgZG90czogdHJ1ZSxcbiAgICBhcnJvd3M6IHRydWUsXG4gICAgcmVzcG9uc2l2ZTogW1xuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMixcbiAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICBkb3RzOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDcwMCxcbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDIsXG4gICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcbiAgICAgIC8vIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxuICAgIF1cbiAgfSk7XG59KShqUXVlcnkpO1xuIiwiLyoqXG4gKiBTbWFydE1lbnVzIGpRdWVyeSBQbHVnaW4gLSB2MS4xLjAgLSBTZXB0ZW1iZXIgMTcsIDIwMTdcbiAqIGh0dHA6Ly93d3cuc21hcnRtZW51cy5vcmcvXG4gKlxuICogQ29weXJpZ2h0IFZhc2lsIERpbmtvdiwgVmFkaWtvbSBXZWIgTHRkLlxuICogaHR0cDovL3ZhZGlrb20uY29tXG4gKlxuICogTGljZW5zZWQgTUlUXG4gKi9cblxuXG5qUXVlcnkoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19ncm91cCcpLnNtYXJ0bWVudXMoe1xuICBzdWJJbmRpY2F0b3JzUG9zOiAnYXBwZW5kJ1xufSk7XG4iLCIkKCcuYW1hX19kaXNwbGF5LXN3aXRjaCcpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICQoJy5hbWFfX2Rpc3BsYXktc3dpdGNoLS1hY3RpdmUnKS50b2dnbGVDbGFzcygnYW1hX19kaXNwbGF5LXN3aXRjaC0tYWN0aXZlJyk7XG4gICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FtYV9fZGlzcGxheS1zd2l0Y2gtLWFjdGl2ZScpO1xufSk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBGb3JtIGZpZWxkcyBtYXNraW5nXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5mb3JtSXRlbXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG4gICAgICAgICAgJCgnLm11bHRpc2VsZWN0JykubXVsdGlzZWxlY3QoKTtcblxuICAgICAgICAgICQoJy5hbWFfX3Rvb2x0aXAnKS50b29sdGlwKHtcbiAgICAgICAgICAgIHRvb2x0aXBDbGFzczogXCJhbWFfX3Rvb2x0aXAtYnViYmxlXCJcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKSB7XG4gICAgICAgICAgICB2YXIgbWF4X2xlbmd0aCA9IDE1MDtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfZW50ZXJlZCA9ICQoJy50ZXh0YXJlYScpLnZhbCgpLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfcmVtYWluaW5nID0gbWF4X2xlbmd0aCAtIGNoYXJhY3Rlcl9lbnRlcmVkO1xuICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLmh0bWwoY2hhcmFjdGVyX3JlbWFpbmluZyk7XG4gICAgICAgICAgICBpZiAobWF4X2xlbmd0aCA8IGNoYXJhY3Rlcl9lbnRlcmVkKSB7XG4gICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGpRdWVyeVVJIHNlbGVjdG1lbnUgbWV0aG9kXG4gICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLnNlbGVjdG1lbnUoKTtcblxuICAgICAgICAgIC8vIFN1Ym1pdHMgdGhlIHNlYXJjaCBmb3JtIGFmdGVyIGEgc2VsZWN0IG1lbnUgaXRlbXMgaGFzIGJlZW4gc2VsZWN0ZWRcbiAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0Jykub24oJ3NlbGVjdG1lbnVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2hwYWdlJykuc3VibWl0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0Jykub24oJ3NlbGVjdG1lbnVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBTdGFydCBzZWFyY2ggZmlsdGVyXG5cbiAgICAgICAgICB2YXIgYXZhaWxhYmxlVGFncyA9IFtcbiAgICAgICAgICAgIFwiQWxhYmFtYVwiLFxuICAgICAgICAgICAgXCJBbGFza2FcIixcbiAgICAgICAgICAgIFwiQW1lcmljYW4gU2Ftb2FcIixcbiAgICAgICAgICAgIFwiQXJpem9uYVwiLFxuICAgICAgICAgICAgXCJBcmthbnNhc1wiLFxuICAgICAgICAgICAgXCJDYWxpZm9ybmlhXCIsXG4gICAgICAgICAgICBcIkNvbG9yYWRvXCIsXG4gICAgICAgICAgICBcIkNvbm5lY3RpY3V0XCIsXG4gICAgICAgICAgICBcIkRlbGF3YXJlXCIsXG4gICAgICAgICAgICBcIkRpc3RyaWN0IE9mIENvbHVtYmlhXCIsXG4gICAgICAgICAgICBcIkZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYVwiLFxuICAgICAgICAgICAgXCJGbG9yaWRhXCIsXG4gICAgICAgICAgICBcIkdlb3JnaWFcIixcbiAgICAgICAgICAgIFwiR3VhbVwiLFxuICAgICAgICAgICAgXCJIYXdhaWlcIixcbiAgICAgICAgICAgIFwiSWRhaG9cIixcbiAgICAgICAgICAgIFwiSWxsaW5vaXNcIixcbiAgICAgICAgICAgIFwiSW5kaWFuYVwiLFxuICAgICAgICAgICAgXCJJb3dhXCIsXG4gICAgICAgICAgICBcIkthbnNhc1wiLFxuICAgICAgICAgICAgXCJLZW50dWNreVwiLFxuICAgICAgICAgICAgXCJMb3Vpc2lhbmFcIixcbiAgICAgICAgICAgIFwiTWFpbmVcIixcbiAgICAgICAgICAgIFwiTWFyc2hhbGwgSXNsYW5kc1wiLFxuICAgICAgICAgICAgXCJNYXJ5bGFuZFwiLFxuICAgICAgICAgICAgXCJNYXNzYWNodXNldHRzXCIsXG4gICAgICAgICAgICBcIk1pY2hpZ2FuXCIsXG4gICAgICAgICAgICBcIk1pbm5lc290YVwiLFxuICAgICAgICAgICAgXCJNaXNzaXNzaXBwaVwiLFxuICAgICAgICAgICAgXCJNaXNzb3VyaVwiLFxuICAgICAgICAgICAgXCJNb250YW5hXCIsXG4gICAgICAgICAgICBcIk5lYnJhc2thXCIsXG4gICAgICAgICAgICBcIk5ldmFkYVwiLFxuICAgICAgICAgICAgXCJOZXcgSGFtcHNoaXJlXCIsXG4gICAgICAgICAgICBcIk5ldyBKZXJzZXlcIixcbiAgICAgICAgICAgIFwiTmV3IE1leGljb1wiLFxuICAgICAgICAgICAgXCJOZXcgWW9ya1wiLFxuICAgICAgICAgICAgXCJOb3J0aCBDYXJvbGluYVwiLFxuICAgICAgICAgICAgXCJOb3J0aCBEYWtvdGFcIixcbiAgICAgICAgICAgIFwiTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzXCIsXG4gICAgICAgICAgICBcIk9oaW9cIixcbiAgICAgICAgICAgIFwiT2tsYWhvbWFcIixcbiAgICAgICAgICAgIFwiT3JlZ29uXCIsXG4gICAgICAgICAgICBcIlBhbGF1XCIsXG4gICAgICAgICAgICBcIlBlbm5zeWx2YW5pYVwiLFxuICAgICAgICAgICAgXCJQdWVydG8gUmljb1wiLFxuICAgICAgICAgICAgXCJSaG9kZSBJc2xhbmRcIixcbiAgICAgICAgICAgIFwiU291dGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICAgIFwiU291dGggRGFrb3RhXCIsXG4gICAgICAgICAgICBcIlRlbm5lc3NlZVwiLFxuICAgICAgICAgICAgXCJUZXhhc1wiLFxuICAgICAgICAgICAgXCJVdGFoXCIsXG4gICAgICAgICAgICBcIlZlcm1vbnRcIixcbiAgICAgICAgICAgIFwiVmlyZ2luIElzbGFuZHNcIixcbiAgICAgICAgICAgIFwiVmlyZ2luaWFcIixcbiAgICAgICAgICAgIFwiV2FzaGluZ3RvblwiLFxuICAgICAgICAgICAgXCJXZXN0IFZpcmdpbmlhXCIsXG4gICAgICAgICAgICBcIldpc2NvbnNpblwiLFxuICAgICAgICAgICAgXCJXeW9taW5nXCJcbiAgICAgICAgICBdO1xuXG4gICAgICAgICAgJCggXCIjc2VhcmNoX2ZpbHRlclwiICkuYXV0b2NvbXBsZXRlKHtcbiAgICAgICAgICAgIHNvdXJjZTogYXZhaWxhYmxlVGFnc1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJC51aS5hdXRvY29tcGxldGUucHJvdG90eXBlLl9yZXNpemVNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHVsID0gdGhpcy5tZW51LmVsZW1lbnQ7XG4gICAgICAgICAgICB1bC5vdXRlcldpZHRoKHRoaXMuZWxlbWVudC5vdXRlcldpZHRoKCkpO1xuICAgICAgICAgIH07XG5cblxuICAgICAgICAgIC8vIFN0YXJ0IHNlYXJjaCBmaWx0ZXIgd2l0aCBjaGVja2JveGVzXG5cbiAgICAgICAgICB2YXIgZGF0YU1vZGVsID0gW1xuICAgICAgICAgICAge3RleHQ6ICdBbGFiYW1hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0FsYXNrYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdBbWVyaWNhbiBTYW1vYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdBcml6b25hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0Fya2Fuc2FzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0NhbGlmb3JuaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQ29sb3JhZG8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQ29ubmVjdGljdXQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnRGVsYXdhcmUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnRGlzdHJpY3QgT2YgQ29sdW1iaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0Zsb3JpZGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnR2VvcmdpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdHdWFtJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0hhd2FpaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdJZGFobycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdJbGxpbm9pcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdJbmRpYW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0lvd2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnS2Fuc2FzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0tlbnR1Y2t5JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0xvdWlzaWFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNYWluZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNYXJzaGFsbCBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01hcnlsYW5kJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01hc3NhY2h1c2V0dHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWljaGlnYW4nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWlubmVzb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01pc3Npc3NpcHBpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01pc3NvdXJpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01vbnRhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmVicmFza2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV2YWRhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldyBIYW1wc2hpcmUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEplcnNleScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXcgTWV4aWNvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldyBZb3JrJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05vcnRoIENhcm9saW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05vcnRoIERha290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnT2hpbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdPa2xhaG9tYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdPcmVnb24nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnUGFsYXUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnUGVubnN5bHZhbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1B1ZXJ0byBSaWNvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1Job2RlIElzbGFuZCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdTb3V0aCBDYXJvbGluYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdTb3V0aCBEYWtvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVGVubmVzc2VlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1RleGFzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1V0YWgnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVmVybW9udCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdWaXJnaW4gSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdWaXJnaW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdXYXNoaW5ndG9uJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1dlc3QgVmlyZ2luaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnV2lzY29uc2luJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1d5b21pbmcnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnJywgdmFsdWU6ICcnfVxuICAgICAgICAgIF07XG5cbiAgICAgICAgICBmdW5jdGlvbiBzZWxDaGFuZ2UoKXtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSAkKCcjbXlDaGVja0xpc3QnKS5jaGVja0xpc3QoJ2dldFNlbGVjdGlvbicpO1xuXG4gICAgICAgICAgICAkKCcjc2VsZWN0ZWRJdGVtcycpLnRleHQoSlNPTi5zdHJpbmdpZnkoc2VsZWN0aW9uKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZihqUXVlcnkudWkuY2hlY2tMaXN0KSAhPSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAkKCcjZmlsdGVyTGlzdCcpLmNoZWNrTGlzdCh7XG4gICAgICAgICAgICAgIGxpc3RJdGVtczogZGF0YU1vZGVsLFxuICAgICAgICAgICAgICBvbkNoYW5nZTogc2VsQ2hhbmdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkKCdmb3JtOm5vdChbY2xhc3MqPVwibGF5b3V0LWJ1aWxkZXJcIl0pIFt0eXBlPWNoZWNrYm94XScpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnW3R5cGU9Y2hlY2tib3hdJykuY2hlY2tib3hyYWRpbygpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJCgnZm9ybTpub3QoW2NsYXNzKj1cImxheW91dC1idWlsZGVyXCJdKSBbdHlwZT1yYWRpb10nKS5jaGVja2JveHJhZGlvKCkuYnV0dG9uc2V0KCkuZmluZCgnbGFiZWwnKS5jc3MoJ3dpZHRoJywgJzE5LjQlJyk7XG5cbiAgICAgICAgICAkKCcudGV4dGFyZWEnKS5rZXl1cChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFJhbmdlIEZpZWxkXG4gICAgICAgICAgdmFyIGxlZ2VuZCA9ICQoJy5hbWFfX3JhbmdlLWZpZWxkX19sZWdlbmQnKTtcbiAgICAgICAgICB2YXIgaGFuZGxlID0gJCggXCIjY3VycmVudFZhbHVlXCIgKTtcblxuICAgICAgICAgICQoXCIuYW1hX19yYW5nZS1maWVsZFwiKS5zbGlkZXIoe1xuICAgICAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHJhbmdlOiAnbWluJyxcbiAgICAgICAgICAgIHZhbHVlOiAxLFxuICAgICAgICAgICAgbWluOiAyMDAwLFxuICAgICAgICAgICAgbWF4OiA1MDAwLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGpRdWVyeSh0aGlzKS5maW5kKCcudWktc2xpZGVyLWhhbmRsZScpO1xuICAgICAgICAgICAgICB2YXIgYnViYmxlID0galF1ZXJ5KCc8ZGl2IGNsYXNzPVwiYW1hX19yYW5nZS1maWVsZF9fdmFsdWVib3hcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgaGFuZGxlLmFwcGVuZChidWJibGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldnQsIHVpKSB7XG4gICAgICAgICAgICAgIHVpLmhhbmRsZS5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCA9ICckJyArIHVpLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmFwcGVuZChsZWdlbmQpO1xuXG4gICAgICAgICAgLy8gRm9ybSBhY2NvcmRpb25cbiAgICAgICAgICAkKCBcIi50YWJsaXN0XCIgKS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgaGVhZGVyOiBcIi5hbWFfX2Zvcm0tc3RlcHNfX3N0ZXBcIixcbiAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIlxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gRXhwYW5kIGxpc3RcbiAgICAgICAgICBmdW5jdGlvbiBleHBhbmRMaXN0QWNjb3JkaW9uKGVsZW1lbnQsIG9wZW4pe1xuICAgICAgICAgICAgJChlbGVtZW50KS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgaWNvbnM6IGZhbHNlLFxuICAgICAgICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCIsXG4gICAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBhbmltYXRlOiA1MDAsXG4gICAgICAgICAgICAgIGFjdGl2ZTogb3BlbixcbiAgICAgICAgICAgICAgYWN0aXZhdGUgOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgaWYoJCh1aS5uZXdQYW5lbCkuaGFzQ2xhc3MoJ3VpLWFjY29yZGlvbi1jb250ZW50LWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAkKHVpLm5ld1BhbmVsKS5wcmV2KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKHVpLm9sZFBhbmVsKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCQoXCIuYW1hX19leHBhbmQtbGlzdFwiKS5maW5kKCcudWktY2hlY2tib3hyYWRpby1jaGVja2VkJykubGVuZ3RoKSB7XG4gICAgICAgICAgICBleHBhbmRMaXN0QWNjb3JkaW9uKCcuYW1hX19leHBhbmQtbGlzdCcsIDApO1xuICAgICAgICAgICAgJChcIi5hbWFfX2V4cGFuZC1saXN0IC5hbWFfX2V4cGFuZC1saXN0X19oZWFkZXJcIikuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4cGFuZExpc3RBY2NvcmRpb24oJy5hbWFfX2V4cGFuZC1saXN0JywgZmFsc2UpO1xuICAgICAgICAgICAgJChcIi5hbWFfX2V4cGFuZC1saXN0XCIpLmNoaWxkcmVuKCcuYW1hX19leHBhbmQtbGlzdF9faGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENvbGxhcHNlIGFsbCBhY2NvcmRpb24gcGFuZWxzXG4gICAgICAgICAgJCgnLmFtYV9fZmlsdGVyX19jb2xsYXBzZS1wYW5lbHMgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0IC51aS1hY2NvcmRpb24taGVhZGVyJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ3VpLXN0YXRlLWFjdGl2ZScpIHx8ICQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jbGljaygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIE9wZW4gYWNjb3JkaW9uIHBhbmVscyBmb3IgbW9iaWxlXG4gICAgICAgICAgJCgnLmFtYV9fYXBwbGllZC1maWx0ZXJzX19zaG93LWZpbHRlcnMnKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0LCAuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3RhZ3MnKS5zbGlkZVRvZ2dsZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fYXBwbGllZC1maWx0ZXJzX19zaG93LWZpbHRlcnMnKS50ZXh0KCQodGhpcykuaXMoJzp2aXNpYmxlJykgPyAnSGlkZSBGaWx0ZXInIDogJ0ZpbHRlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBsaXN0RmlsdGVyKGlucHV0LCBsaXN0KSB7IC8vIGhlYWRlciBpcyBhbnkgZWxlbWVudCwgbGlzdCBpcyBhbiB1bm9yZGVyZWQgbGlzdFxuICAgICAgICAgICAgLy8gY3VzdG9tIGNzcyBleHByZXNzaW9uIGZvciBhIGNhc2UtaW5zZW5zaXRpdmUgY29udGFpbnMoKVxuICAgICAgICAgICAgalF1ZXJ5LmV4cHJbJzonXS5Db250YWlucyA9IGZ1bmN0aW9uKGEsaSxtKXtcbiAgICAgICAgICAgICAgcmV0dXJuIChhLnRleHRDb250ZW50IHx8IGEuaW5uZXJUZXh0IHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihtWzNdLnRvVXBwZXJDYXNlKCkpPj0wO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJChpbnB1dCkuY2hhbmdlKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHZhciBmaWx0ZXIgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBpZihmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGZpbmRzIGFsbCBsaW5rcyBpbiBhIGxpc3QgdGhhdCBjb250YWluIHRoZSBpbnB1dCxcbiAgICAgICAgICAgICAgICAvLyBhbmQgaGlkZSB0aGUgb25lcyBub3QgY29udGFpbmluZyB0aGUgaW5wdXQgd2hpbGUgc2hvd2luZyB0aGUgb25lcyB0aGF0IGRvXG4gICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3Bhbjpub3QoOkNvbnRhaW5zKFwiICsgZmlsdGVyICsgXCIpKVwiKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3BhbjpDb250YWlucyhcIiArIGZpbHRlciArIFwiKVwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwibGFiZWxcIikuc2hvdygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgLy8gb25seSBzaG93IHJlc3VsdHMgYWZ0ZXIgMyBjaGFyYWN0ZXJzIGFyZSBlbnRlcmVkXG4gICAgICAgICAgICB9KS5rZXl1cCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmKCB0aGlzLnZhbHVlLmxlbmd0aCA8IDQgKSByZXR1cm47XG4gICAgICAgICAgICAgICQodGhpcykuY2hhbmdlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0RmlsdGVyKCQoXCIjYW1hX19zZWFyY2hfX2xvY2F0aW9uXCIpLCAkKFwiLmFtYV9fZm9ybS1ncm91cFwiKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkoalF1ZXJ5KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmZvcm1WYWxpZGF0ZSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnI3Rlc3QtZm9ybScpLnZhbGlkYXRlKHtcbiAgICAgICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgICAgIHRleHRmaWVsZDogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICBkb2I6IFwicmVxdWlyZWRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgIHRleHRmaWVsZDogXCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgIGRvYjogXCJEYXRlIG9mIGJpcnRoIGlzIHJlcXVpcmVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFJlc3BvbnNpdmUgVGFibGVzLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnJlc3BvbnNpdmVHYXRlID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIGlmICgkKCcuYW1hX19nYXRlJywgY29udGV4dCkubGVuZ3RoKSB7XG4gICAgICAgIHZhciBoZWlnaHRHYXRlID0gJCgnLmFtYV9fdGFncycpLm9mZnNldCgpLnRvcCAtICQoJy5hbWFfX2dhdGUnKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJy5hbWFfX2dhdGUnLCBjb250ZXh0KS5vdXRlckhlaWdodChoZWlnaHRHYXRlKTtcbiAgICAgICAgJCgnLmFtYV9fZ2F0ZScpLm5leHRVbnRpbCgnLmFtYV9fcGFnZS0tbmV3c19fdGVhc2VycycpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJhbWFfX2dhdGVfX2JsdXJyeVwiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogSW5pdGlhbGl6YXRpb24gc2NyaXB0IGZvciBnbG9iYWwgcHJvY2Vzc2VzXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblxuLyoqXG4gKlxuICogSW5pdGlhbGl6ZSBmaXRWaWQgZm9yIFlvdVR1YmUgdmllb3MuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cblxuXHREcnVwYWwuYmVoYXZpb3JzLmZpdHZpZGluaXQgPSB7XG5cdCBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXHRcdFx0KGZ1bmN0aW9uICgkKSB7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCgnLnZpZGVvLWNvbnRhaW5lcicpLmZpdFZpZHMoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KShqUXVlcnkpO1xuXHRcdH1cblx0fTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5qdW1wTWVudSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgJCgnLmFtYV9fanVtcF9tZW51Jykub24oJ3NlbGVjdG1lbnVjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICQodGhpcykuZmluZCgnOnNlbGVjdGVkJykuZGF0YSgndXJsJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX21haW5OYXZpZ2F0aW9uID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciAkY2F0ZWdvcnlOYXZXcmFwcGVyID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX3dyYXBwZXInKSxcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudSA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51JyksXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19ncm91cCcpLFxuICAgICAgICAgICRtb2JpbGVTZWFyY2hUcmlnZ2VyID0gJCgnLmdsb2JhbC1zZWFyY2gtdHJpZ2dlcicpLFxuICAgICAgICAgICRtb2JpbGVTZWFyY2ggPSAkKCcuYW1hX19nbG9iYWwtc2VhcmNoJyksXG4gICAgICAgICAgJG1haW5OYXYgPSAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJyksXG4gICAgICAgICAgJHByb2R1Y3ROYXYgPSAkKCcuYW1hX19wcm9kdWN0LW5hdicpLFxuICAgICAgICAgICRzdWJNZW51ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnKSxcbiAgICAgICAgICAkc3ViTWVudUFydGljbGUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnKSxcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IDAsXG4gICAgICAgICAgcHJvZHVjdE5hdkhlaWdodCA9IDAsXG4gICAgICAgICAgY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKS5vdXRlckhlaWdodCgpLFxuICAgICAgICAgIGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgPSAwLFxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cbiAgICAgIC8vIENoZWNrcyBpZiB1c2VyIGFnZW50IGlzIGEgbW9iaWxlIGRldmljZVxuICAgICAgdmFyIGRldmljZUFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIGFnZW50SUQgPSBkZXZpY2VBZ2VudC5tYXRjaCgvKGFuZHJvaWR8d2Vib3N8aXBob25lfGlwb2R8YmxhY2tiZXJyeSkvKSAmJiB3aW5kb3dXaWR0aCA8IDc2ODtcblxuICAgICAgaWYoJHByb2R1Y3ROYXYubGVuZ3RoICYmICRwcm9kdWN0TmF2LmlzKCc6dmlzaWJsZScpICl7XG4gICAgICAgIHByb2R1Y3ROYXZIZWlnaHQgPSAkcHJvZHVjdE5hdi5oZWlnaHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2R1Y3ROYXZIZWlnaHQgPSAwO1xuICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgY2F0ZWdvcnkgbmF2IHNob3VsZCBoYXZlIHNjcm9sbGJhcnNcbiAgICAgIGZ1bmN0aW9uIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KSB7XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHZpZXdwb3J0IGhlaWdodCBpcyBwYXNzZWQgYmFjayB3aGVuIHRoZSB3aW5kb3cgZ2V0cyByZXNpemVkXG4gICAgICAgIGlmKHR5cGVvZiByZXNpemVWaWV3cG9ydEhlaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHJlc2l6ZVZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFdpbmRvdyBoZWlnaHQgaXMgdXNlZCBieSBkZWZhdWx0XG4gICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdWJ0cmFjdCB0aGUgbmF2aWdhdGlvbiBoZWlnaHQgZnJvbSB3aW5kb3cgaGVpZ2h0IHRvIGFzc2VzcyBjb250ZW50IGhlaWdodFxuICAgICAgICBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBtYWluIG1lbnUgcHVycGxlIGRyb3Bkb3duIGhlaWdodCBpcyBsYXJnZXIgdGhhbiB2aWV3cG9ydCBoZWlnaHRcbiAgICAgICAgaWYgKGNhdGVnb3J5TmF2TWVudUhlaWdodCArICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgKyBwcm9kdWN0TmF2SGVpZ2h0ID4gdmlld3BvcnRIZWlnaHQgJiYgIWFnZW50SUQpIHtcblxuICAgICAgICAgIC8vIFNldCB0aGUgbWVudSBkcm9wZG93biB0aGUgc2FtZSBhcyB2aWV3cG9ydCB0byBlbmFibGUgc2Nyb2xsaW5nXG4gICAgICAgICAgdmFyIGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQgPSBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0IC0gJG1haW5OYXYub3V0ZXJIZWlnaHQoKSAtIHByb2R1Y3ROYXZIZWlnaHQ7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cC5hZGRDbGFzcygnc2Nyb2xsJykub3V0ZXJIZWlnaHQoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCk7XG5cbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLm9uKCdzaG93LnNtYXBpJywgZnVuY3Rpb24oZSwgbWVudSkge1xuICAgICAgICAgICAgaWYoJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnLCBtZW51KS5vdXRlckhlaWdodCgpID4gY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkge1xuICAgICAgICAgICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc3VibWVudScsIG1lbnUpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZigkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnLCBtZW51KS5vdXRlckhlaWdodCgpID4gY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkge1xuICAgICAgICAgICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnLCBtZW51KS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKS5hZGRDbGFzcygnb25lX2FydGljbGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLnJlbW92ZUNsYXNzKCdzY3JvbGwnKS5vdXRlckhlaWdodCgnYXV0bycpO1xuICAgICAgICAgICRzdWJNZW51Lm91dGVySGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgJHN1Yk1lbnVBcnRpY2xlLm91dGVySGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICAvLyBIaWRlL1Nob3cgbWVudVxuICAgICAgZnVuY3Rpb24gaGlkZVNob3coKSB7XG4gICAgICAgIGlmICgkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZURvd24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKChjYXRlZ29yeU5hdk1lbnVIZWlnaHQgKyAgJG1haW5OYXYub3V0ZXJIZWlnaHQoKSArIHByb2R1Y3ROYXZIZWlnaHQpID4gdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgYm9keVNjcm9sbExvY2suZGlzYWJsZUJvZHlTY3JvbGwoJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCwge1xuICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmdW5jdGlvbiBhbGxvd1RvdWNoTW92ZShlbCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGVsICYmIGVsICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2JvZHktc2Nyb2xsLWxvY2staWdub3JlJykgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFnZW50SUQpIHtcbiAgICAgICAgICAgICAgLy8gT25seSBtYWtlIHRoZSBtZW51IGhlaWdodCBzYW1lIGFzIHZpZXdwb3J0IG9uIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgICAgIHZhciBtb2JpbGVIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdldyYXBwZXIuaGVpZ2h0KG1vYmlsZUhlaWdodCkuYWRkQ2xhc3MoJ3Njcm9sbCcpO1xuXG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAub24oJ3Nob3cuc21hcGknLCBmdW5jdGlvbihlLCBtZW51KSB7XG4gICAgICAgICAgICAgICAgaWYoJChtZW51KS5vdXRlckhlaWdodCgpID4gbW9iaWxlSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAkKG1lbnUpLm91dGVySGVpZ2h0KG1vYmlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZVVwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGVpZ2h0KDApO1xuICAgICAgICAgICAgYm9keVNjcm9sbExvY2suY2xlYXJBbGxCb2R5U2Nyb2xsTG9ja3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDbG9zZXMgbWVudSBvbiBkb2MgbG9hZFxuICAgICAgJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgJCgnLmFtYV9fZ2xvYmFsLW1lbnUnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBoaWRlU2hvdygpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIGEgdXNlciBjbGlja3Mgb3V0c2lkZSB0aGUgbWVudSB0aGVuIGNsb3NlIGl0XG4gICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoISRjYXRlZ29yeU5hdmlnYXRpb25NZW51LmlzKGUudGFyZ2V0KSAmJiAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgaGlkZVNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJG1vYmlsZVNlYXJjaFRyaWdnZXIpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2JpbGVTZWFyY2guc2xpZGVUb2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpe1xuICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICB2YXIgJGFtYVNvY2lhbFNoYXJlID0gJCgnLmFtYV9fc29jaWFsLXNoYXJlJyk7XG5cbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBlbm91Z2ggZm9yIHRoZSBzdGlja3kgbmF2XG4gICAgICAgIGlmKG1haW5OYXZQb3NpdGlvbiA+IDYwKSB7XG5cbiAgICAgICAgICB2YXIgc29jaWFsU3RpY2t5UG9zaXRpb24gPSBtYWluTmF2UG9zaXRpb24gLSA2MDtcbiAgICAgICAgICB2YXIgJHNvY2lhbEljb25zID0gJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJyk7XG5cbiAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdmlld3BvcnQgd2lkdGggaXMgZ3JlYXRlciA4NTBweCB0aGVuIHRoZSBzb2NpYWwgaWNvbnMgd2lsbCBiZSBzdGlja3lcbiAgICAgICAgICBpZigkc29jaWFsSWNvbnMubGVuZ3RoICYmICQod2luZG93KS53aWR0aCgpID4gODUwKSB7XG4gICAgICAgICAgICAkc29jaWFsSWNvbnMuc3RpY2t5KHtcbiAgICAgICAgICAgICAgd3JhcHBlckNsYXNzTmFtZTogJ2FtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlLXdyYXBwZXInLFxuICAgICAgICAgICAgICB6SW5kZXg6IDUwMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRzb2NpYWxJY29ucy5vbignc3RpY2t5LXN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmNzcygnbGVmdCcsIHNvY2lhbFN0aWNreVBvc2l0aW9uKS5oaWRlKCkuZmFkZVRvKCdzbG93JywgMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktdXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmhpZGUoKS5mYWRlVG8oJ3Nsb3cnLCAxKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc29jaWFsSWNvbnMub24oJ3N0aWNreS1lbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5yZW1vdmVDbGFzcygnYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSW5pdGlhbGl6ZSBnZXRTb2NpYWxTaGFyZSgpXG4gICAgICBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpO1xuXG4gICAgICAvLyBPbnNjcm9sbCBjaGVjayB0byBzZWUgaWYgc29jaWFsIGljb24gcG9zaXRpb24gaXMgZ3JlYXRlciB0aGFuIGZvb3RlciBwb3NpdGlvblxuICAgICAgdmFyIGRlYm91bmNlX3RpbWVyO1xuICAgICAgaWYoJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlIC5hbWFfX3NvY2lhbC1zaGFyZScpLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyICRzb2NpYWxJY29ucyA9ICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZSAuYW1hX19zb2NpYWwtc2hhcmUnKTtcbiAgICAgICAgICB2YXIgc29jaWFsSWNvblBvc2l0aW9uQm90dG9tID0gJHNvY2lhbEljb25zLm9mZnNldCgpLnRvcCArICRzb2NpYWxJY29ucy5vdXRlckhlaWdodCgpO1xuICAgICAgICAgIHZhciBmb290ZXJQb3NpdGlvbiA9ICQoJ2Zvb3RlcicpLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgIGlmKGRlYm91bmNlX3RpbWVyKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGRlYm91bmNlX3RpbWVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWJvdW5jZV90aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoc29jaWFsSWNvblBvc2l0aW9uQm90dG9tID4gZm9vdGVyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJykuZmFkZU91dCgnZmFzdCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJykuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuXG4gICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVzaXplVmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL0NoZWNrcyB0aGUgbGF5b3V0IHBvc2l0aW9uIG9mIGFydGljbGUgb24gd2luZG93IHJlc2l6ZSBhbmQgbW92ZXMgdGhlIHNvY2lhbCBpY29ucyBhY2NvcmRpbmdseVxuICAgICAgJCggd2luZG93ICkucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWFnZW50SUQpIHtcbiAgICAgICAgICB2YXIgcmVzaXplVmlld3BvcnRIZWlnaHQgPSAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKTtcbiAgICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uVXBkYXRlID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0IC0gMTAwO1xuXG4gICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQocmVzaXplVmlld3BvcnRIZWlnaHQpO1xuICAgICAgICAgICQoJy5hbWFfX3NvY2lhbC1zaGFyZS5hbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5jc3MoJ2xlZnQnLCBtYWluTmF2UG9zaXRpb25VcGRhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG5cblxuXG4iLCIvKipcbiAqIEBmaWxlXG4gKiBSaWJib24gbmF2IHVzZXIgaW50ZXJhY3Rpb25zLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiAnYW5vbnltb3VzIGNsb3N1cmUnLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblxuICBEcnVwYWwuYmVoYXZpb3JzLnJpYmJvbm5hdiA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAvLyBOZWVkcyBkb2MgcmVhZHkgYmVjYXVzZSB0aGUgYWRtaW4gdG9vbGJhciBuZWVkcyB0byBnZXQgbG9hZGVkIHRvIGRldGVybWluZSB0aGUgdG9wIHNwYWNpbmcgZm9yIHN0aWNreSBuYXZcbiAgICAgICQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkYm9keUZpeGVkID0gJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnKTtcblxuICAgICAgICBpZigkYm9keUZpeGVkID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbicpLnVuc3RpY2soKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZigkKHdpbmRvdykud2lkdGgoKSA8IDc2OCApIHsgLy8gSWYgbGVzcyB0aGFuIHRhYmxldFxuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbicpLnN0aWNreSh7ekluZGV4OiA1MDF9KTtcbiAgICAgICAgfSBlbHNlIGlmKCQoJy50b29sYmFyLXRyYXknKS5oYXNDbGFzcygndG9vbGJhci10cmF5LWhvcml6b250YWwnKSkge1xuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAnKS5zdGlja3koeyB6SW5kZXg6IDUwMSwgdG9wU3BhY2luZzogNzIgfSk7XG4gICAgICAgIH0gZWxzZSBpZigkKCcudG9vbGJhci10cmF5JykuaGFzQ2xhc3MoJ3Rvb2xiYXItdHJheS12ZXJ0aWNhbCcpKSB7XG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLnN0aWNreSh7IHpJbmRleDogNTAxLCB0b3BTcGFjaW5nOiAzOSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJykuc3RpY2t5KHsgekluZGV4OiA1MDEgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc19hY3RpdmUgPSAnaXMtYWN0aXZlJztcblxuICAgICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duX190cmlnZ2VyJywgdGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgLy8gVW5mb2N1cyBvbiB0aGUgZHJvcGRvd24uXG4gICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyBmb3IgQ1NTLlxuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIHRvIHRoZSBkcm9wZG93biBVTC5cbiAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCkudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bl9fdHJpZ2dlcicsIHRoaXMpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSkuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucGVvcGVMaXN0aW5nID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICBpZigkKCcuYW1hX19wZW9wbGUtbGlzdGluZ19fY2FyZC1jb250YWluZXInKS5sZW5ndGgpe1xuICAgICAgICB2YXIgJGNhcmRIZWlnaHQgPSAwO1xuICAgICAgICB2YXIgJGNhcmQgPSAkKCcuYW1hX19wZW9wbGUtbGlzdGluZ19fY2FyZC1jb250YWluZXIgLmFtYV9fcGVvcGxlLWxpc3RpbmctY2FyZCcpO1xuXG4gICAgICAgICRjYXJkLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJGNhcmRIZWlnaHQgPSAkKHRoaXMpLmhlaWdodCgpID4gJGNhcmRIZWlnaHQgPyAkKHRoaXMpLmhlaWdodCgpIDogJGNhcmRIZWlnaHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjYXJkLmhlaWdodCgkY2FyZEhlaWdodCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogU2FkbHkgYWRkcyBmb290ZXIgdG8gbGVmdCByZXNvdXJjZSBwYWdlIGNvbHVtbi5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5yZXNvdXJjZVBhZ2VGb290ZXIgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAkKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCgnYm9keS5hbWFfX3Jlc291cmNlLXBhZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAkKCdmb290ZXInLCBjb250ZXh0KS5jbG9uZSgpLmFwcGVuZFRvKCcuYW1hX19sYXlvdXQtLXNwbGl0X19sZWZ0JykuYWRkQ2xhc3MoJ2FtYV9fZm9vdGVyIGFtYV9fcmVzb3VyY2UtcGFnZV9fZGVza3RvcC1mb290ZXInKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfc2VhcmNoX2NoZWNrYm94ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciAkY2F0ZWdvcnlTZWFyY2hJbnB1dCA9ICQoJyNzZWFyY2hfY2F0ZWdvcnknKTtcbiAgICAgIHZhciAkY2F0ZWdvcnlTZWFyY2hMaXN0ID0gJCgnLmZhY2V0cy13aWRnZXQtY2hlY2tib3ggdWwgbGknKTtcbiAgICAgIHZhciAkY2xlYXJTZWFyY2hGaWx0ZXIgPSAkKCcjYXBwbGllZEZpbHRlcnNSZW1vdmUnKTtcblxuICAgICAgLy8gRmlsdGVyIGxpc3QgdXNpbmcgalF1ZXJ5IGZpbHRlclxuICAgICAgZnVuY3Rpb24gZmlsdGVyTGlzdChzZWFyY2hCb3gsIGxpc3QpIHtcbiAgICAgICAgc2VhcmNoQm94LmtleXVwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnZhbHVlLCAnaScpO1xuICAgICAgICAgIGxpc3QuaGlkZSgpLmZpbHRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHJlZ2V4LnRlc3QoJC50cmltKCQodGhpcykudGV4dCgpKSk7XG4gICAgICAgICAgfSkuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xlYXIgZmlsdGVyXG4gICAgICBmdW5jdGlvbiBjbGVhZkZpbHRlckxpc3QoY2xlYXJTZWFyY2hGaWx0ZXIpIHtcbiAgICAgICAgY2xlYXJTZWFyY2hGaWx0ZXIuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJGNhdGVnb3J5U2VhcmNoSW5wdXQudmFsKCcnKTtcbiAgICAgICAgICAkY2F0ZWdvcnlTZWFyY2hJbnB1dC50cmlnZ2VyKCdrZXl1cCcpO1xuXG4gICAgICAgICAgJCgnLmZhY2V0cy13aWRnZXQtY2hlY2tib3ggdWwgbGkgW3R5cGU9Y2hlY2tib3hdJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2hwYWdlJykuc3VibWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnZva2UgZmlsdGVyIGxpc3RcbiAgICAgIGZpbHRlckxpc3QoJGNhdGVnb3J5U2VhcmNoSW5wdXQsICRjYXRlZ29yeVNlYXJjaExpc3QpO1xuXG4gICAgICAvLyBJbnZva2UgY2xlYXIgZmlsdGVyXG4gICAgICBjbGVhZkZpbHRlckxpc3QoJGNsZWFyU2VhcmNoRmlsdGVyKTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9zaWduSW5NZW51ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICB2YXIgJHNpZ25JbkRyb3Bkb3duID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bicpO1xuICAgICAgdmFyICRzaWduSW5Ecm9wZG93bk1lbnUgPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duX19tZW51Jyk7XG4gICAgICB2YXIgJHNpZ25JbkxpbmsgPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duX190ZXh0Jyk7XG4gICAgICB2YXIgJGV4cGxvcmVNZW51ID0gJCgnLmFtYV9fZXhwbG9yZS1tZW51Jyk7XG4gICAgICB2YXIgJGV4cGxvcmVNZW51RHJvcGRvd24gPSAkKCcuYW1hX19leHBsb3JlLW1lbnVfX21lbnUnKTtcblxuICAgICAgZnVuY3Rpb24gZHJvcGRvd25Eb3duTWVudShwYXJlbnRFbGVtZW50LCBtZW51RWxlbWVudCkge1xuICAgICAgIHBhcmVudEVsZW1lbnQudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3RvcCBsaW5rIGZyb20gZmlyaW5nXG4gICAgICAgICRzaWduSW5MaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IG9mIHRoZSBjbGljayBpc24ndCB0aGUgY29udGFpbmVyIG5vciBhIGRlc2NlbmRhbnQgb2YgdGhlIGNvbnRhaW5lclxuICAgICAgICAgIGlmICghcGFyZW50RWxlbWVudC5pcyhlLnRhcmdldCkgJiYgcGFyZW50RWxlbWVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVVcCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFNldCB0aW1lb3V0IGZvciB3aGVuIGEgdXNlciBtb3VzZXMgb3V0IG9mIHRoZSBtZW51XG4gICAgICAgICAgcGFyZW50RWxlbWVudC5tb3VzZWVudGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoKTtcbiAgICAgICAgICB9KS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVXAoKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZHJvcGRvd25Eb3duTWVudSgkc2lnbkluRHJvcGRvd24sICRzaWduSW5Ecm9wZG93bk1lbnUpO1xuICAgICAgZHJvcGRvd25Eb3duTWVudSgkZXhwbG9yZU1lbnUsICRleHBsb3JlTWVudURyb3Bkb3duKTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBTdWJjYXRlZ29yeVxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnN1YmNhdGVnb3JpZXNFeHBsb3JhdGlvbiA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVyID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX2xpc3QnKTtcbiAgICAgIHZhciAkc3ViY2F0ZWdvcnlMaXN0ICA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19saXN0IHVsJyk7XG4gICAgICB2YXIgJHN1YmNhdGVnb3J5TGlzdEV4cGFuZGVyID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3Nob3ctbW9yZScpO1xuICAgICAgdmFyICRzdWJjYXRlZ29yeUxpc3RDb250YWluZXJIZWlnaHQgPSAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVyLm91dGVySGVpZ2h0KCkgKyAzO1xuICAgICAgdmFyICRzdWJjYXRlZ29yeUxpc3RMaW5rVGV4dCA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX190ZXh0Jyk7XG4gICAgICB2YXIgJGluaXRpYWxXaW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG4gICAgICAvLyBEZXRlcm1pbmUgd2hlbiB0byBzaG93IGxpbmsgYmFzZWQgb24gd2luZG93IHNpemUuXG4gICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlTW9yZUxpbmsgKCkge1xuICAgICAgICAgIC8vIFNldCBpbnRpYWwgd2luZG93IHdpZHRoIHRvIDEwMjQgcGl4ZWwuXG4gICAgICAgICAgLy8gQHRvZG86IENoZWNrIGlmIHRoaXMgaXMgYW4gaXNzdWUgdG8gc2V0IDEwMjQgd2lkdGggbGltaXQuXG4gICAgICAgICAgaWYgKCRpbml0aWFsV2luZG93V2lkdGggPD0gMTAyNCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVub3JkZXJlZCBsaXN0IG91dGVySGVpZ2h0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgcGFyZW50IGNvbnRhaW5lciB0aGVuIHNob3cgdGhlIHNob3cgbW9yZSBsaW5rLFxuICAgICAgICAgICAgLy8gaGlkZSBvdGhlcndpc2UuXG4gICAgICAgICAgICBpZiAoJHN1YmNhdGVnb3J5TGlzdC5vdXRlckhlaWdodCgpID4gJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lckhlaWdodCkge1xuICAgICAgICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0RXhwYW5kZXIuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCRzdWJjYXRlZ29yeUxpc3Qub3V0ZXJIZWlnaHQoKSA8ICRzdWJjYXRlZ29yeUxpc3RDb250YWluZXJIZWlnaHQpIHtcbiAgICAgICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdEV4cGFuZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRpbml0aWFsV2luZG93V2lkdGggIT09ICQod2luZG93KS53aWR0aCgpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdW5vcmRlcmVkIGxpc3Qgb3V0ZXJIZWlnaHQgaXMgZ3JlYXRlciB0aGFuIHRoZSBwYXJlbnQgY29udGFpbmVyIHRoZW4gc2hvdyB0aGUgc2hvdyBtb3JlIGxpbmtcbiAgICAgICAgICAgIGlmICgkc3ViY2F0ZWdvcnlMaXN0Lm91dGVySGVpZ2h0KCkgPiAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICRzdWJjYXRlZ29yeUxpc3RFeHBhbmRlci5zaG93KCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzdWJjYXRlZ29yeUxpc3RFeHBhbmRlci5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2hvd0hpZGVNb3JlTGluaygpO1xuICAgICAgICAgICQod2luZG93KS5yZXNpemUoc2hvd0hpZGVNb3JlTGluayk7XG4gICAgICB9KTtcblxuXG4gICAgICAvLyBEcnVwYWwgY29tcGVscyBtZSB0byB1bmJpbmQgY2xpY2tzIG90aGVyd2lzZSBkb3VibGUgY2xpY2tzIG9jY3VyXG4gICAgICAkc3ViY2F0ZWdvcnlMaXN0RXhwYW5kZXIudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGUgY29udGFpbmVyIGhhcyBiZWVuIGV4cGFuZCBvciBub3QgYnkgY29tcGFyaW5nIGluaXRpYWwgb3V0ZXJIZWlnaHQgdG8gY3VycmVudCBvdXRlckhlaWdodFxuICAgICAgICBpZigkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVyLm91dGVySGVpZ2h0KCkgPiAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVySGVpZ2h0KSB7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lci5yZW1vdmVDbGFzcygnYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fbGlzdC0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zaG93LW1vcmUtLWV4cGFuZGVkJyk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdExpbmtUZXh0LnRleHQoJ1ZpZXcgYWxsIHN1YmNhdGVnb3JpZXMnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVyLmFkZENsYXNzKCdhbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19saXN0LS1leHBhbmRlZCcpO1xuICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3Nob3ctbW9yZS0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0TGlua1RleHQudGV4dCgnVmlldyBmZXdlciBzdWJjYXRlZ29yaWVzJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcblxuIiwiLyoqXG4gKiBAZmlsZVxuICogU3ViY2F0ZWdvcnlcbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5zdWJjYXRlZ29yaWVzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIC8vIENyZWF0ZSBzdGF0aWMgdmFyIGZvciBzdWJjYXRlZ29yeSBpdGVtIGNvdW50LiBUbyBiZSB1c2VkIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHJlY2FsY3VsYXRpb25zIGFyZSBuZWVkZWQuXG4gICAgICB2YXIgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgPSAwO1xuXG4gICAgICBmdW5jdGlvbiBjaGVja1NpemUoKSB7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnkgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc3ViY2F0ZWdvcnknKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeUNvbnRhaW5lciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX19jb250YWluZXInKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeVRpdGxlID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3RpdGxlJyk7XG4gICAgICAgIC8vIFdlIHdhbnQgdGhlIHdpZHRoIG1pbnVzIHBhZGRpbmcgc28gdXNlIHdpZHRoKCkgaW5zdGVhZCBvZiBpbm5lcldpZHRoKCkuXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUV4cGxvcmF0aW9uV2lkdGggPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlcycpLndpZHRoKCk7XG4gICAgICAgIC8vIFN1YmNhdGVnb3J5IGl0ZW1zIGhhdmUgbWF4LXdpZHRoIG9mIDE4MHB4LiBUaGlzIHdpbGwgYmUgdXNlZCBmb3IgY2FsY3VsYXRpb25zIGluc3RlYWQgb2YgZXh0cmFjdGluZyBpdCB2aWEgalF1ZXJ5IGNhbGxzLlxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlJdGVtV2lkdGggPSAxODA7XG4gICAgICAgIHZhciBzdWJjYXRlZ29yeVRpdGxlV2lkdGggPSAkc3ViY2F0ZWdvcnlUaXRsZS5vdXRlcldpZHRoKCk7XG4gICAgICAgIHZhciB0b3RhbEdyaWRJdGVtcyA9ICRzdWJjYXRlZ29yeS5sZW5ndGggKyAxO1xuICAgICAgICAvLyBTdGFydCBjb2x1bW4gY291bnQgYXMgbG93ZXN0IHBvc3NpYmxlLlxuICAgICAgICB2YXIgY29sdW1uQ291bnQgPSAyO1xuICAgICAgICAvLyBTZXQgc3ViY2F0ZWdvcnkgcm93IGl0ZW1zIHRvIGxvd2VzdCB0aGF0IHNob3VsZCBkaXNwbGF5LlxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyA9IE1hdGguZmxvb3IoKHN1YmNhdGVnb3J5RXhwbG9yYXRpb25XaWR0aCAtIHN1YmNhdGVnb3J5VGl0bGVXaWR0aCkgLyBzdWJjYXRlZ29yeUl0ZW1XaWR0aCk7XG5cbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgPCAyKSB7XG4gICAgICAgICAgLy8gVGhlIG1pbmltdW0gc3ViY2F0ZWdvcnkgaXRlbXMgcGVyIHJvdyBzaG91bGQgYmUgdHdvLiBJZiB0aGUgdmFyaWFibGUgY29tcHV0ZWQgdG8gbGVzcywgbWFudWFsbHkgY29ycmVjdCBpdC5cbiAgICAgICAgICBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93ID0gMjtcbiAgICAgICAgICB0b3RhbEdyaWRJdGVtcyA9IHRvdGFsR3JpZEl0ZW1zIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW5Db3VudCA9IHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIGNoYW5nZXMgaW4gY29sdW1uIGNvdW50IGhhcyBvY2N1cnJlZCBhbmQgYWN0IGFjY29yZGluZ2x5XG4gICAgICAgIGlmIChzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyAhPT0gY29sdW1uQ291bnQpIHtcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgYWRkaXRpb25hbCBcImZpbGxlci1ib3hcIiBuZWVkZWQgdG8gY3JlYXRlIGNvbXBsZXRlIHJvd1xuICAgICAgICAgIHZhciBmaWxsZXJCb3hDb3VudCA9IGNvbHVtbkNvdW50IC0gKHRvdGFsR3JpZEl0ZW1zICUgY29sdW1uQ291bnQpO1xuICAgICAgICAgIGZpbGxHcmlkUm93KCRzdWJjYXRlZ29yeUNvbnRhaW5lciwgZmlsbGVyQm94Q291bnQpO1xuICAgICAgICAgIC8vIFVwZGF0ZSBwZXJzaXN0ZW50IGNvbHVtbiBjb3VudFxuICAgICAgICAgIHN1YmNhdGVnb3J5RXhwbG9yYXRpb25Db2x1bW5zID0gY29sdW1uQ291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgdmlld2FibGUgc3ViY2F0ZWdvcmllcy5cbiAgICAgICAgJHN1YmNhdGVnb3J5LmhpZGUoKTtcbiAgICAgICAgJHN1YmNhdGVnb3J5LnNsaWNlKDAsIHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcblxuICAgICAgICB2aWV3TW9yZSgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB2aWV3TW9yZSgpIHtcbiAgICAgICAgdmFyICR2aWV3TGVzcyA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWxlc3MnKTtcbiAgICAgICAgdmFyICR2aWV3TW9yZSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWFsbCcpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5ID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3N1YmNhdGVnb3J5Jyk7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnlDb250YWluZXIgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fY29udGFpbmVyJyk7XG5cbiAgICAgICAgJHZpZXdMZXNzLmhpZGUoKTtcbiAgICAgICAgJHZpZXdNb3JlLnNob3coKTtcblxuICAgICAgICAkKCcudmlld0FsbCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeS5mYWRlSW4oKTtcbiAgICAgICAgICAkdmlld01vcmUuaGlkZSgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeUNvbnRhaW5lci5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAkdmlld0xlc3Muc2hvdygpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy52aWV3TGVzcycpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeS5oaWRlKCk7XG4gICAgICAgICAgY2hlY2tTaXplKCk7XG4gICAgICAgICAgJHZpZXdMZXNzLmhpZGUoKTtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgJHZpZXdNb3JlLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgZnVuY3Rpb24gZmlsbEdyaWRSb3coJGNvbnRhaW5lciwgY291bnQpIHtcbiAgICAgICAgdmFyIGZpbGxlckJveCA9ICc8ZGl2IGNsYXNzPVwiZmlsbGVyLWJveFwiPjwvZGl2Pic7XG4gICAgICAgIC8vIGNsZWFyIG91dCBjdXJyZW50IGZpbGxlciBib3hlc1xuICAgICAgICB2YXIgJGZpbGxlckJveGVzID0gJGNvbnRhaW5lci5maW5kKCcuZmlsbGVyLWJveCcpO1xuICAgICAgICAkZmlsbGVyQm94ZXMucmVtb3ZlKCk7XG4gICAgICAgIC8vIGZpbGwgb3V0IGdyaWQgcm93XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKGZpbGxlckJveCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcnVuIHRlc3Qgb24gaW5pdGlhbCBwYWdlIGxvYWRcbiAgICAgIGNoZWNrU2l6ZSgpO1xuXG4gICAgICAvLyBydW4gdGVzdCBvbiByZXNpemUgb2YgdGhlIHdpbmRvd1xuICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrU2l6ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogUmVzcG9uc2l2ZSBUYWJsZXMuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucmVzcG9uc2l2ZVRhYmxlcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIC8vIFRoaXMgY29uZGl0aW9uYWwgaGFzIGJlZW4gYWRkZWQgdG8gcHJldmVudCBiYXNpY1RhYmxlIHBsdWdpbiB0byBzZWxlY3RpdmVseSBub3QgcnVuIG9uIHRhYmxlc1xuICAgICAgaWYgKCEkKCd0YWJsZScpLmhhc0NsYXNzKCdzaW1wbGVUYWJsZScpKSB7XG4gICAgICAgICQoJ3RhYmxlJykuYmFzaWN0YWJsZSh7XG4gICAgICAgICAgYnJlYWtwb2ludDogMTAyNFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyBmb3JjZXMgdGFibGVzIGluc2lkZSBvZiB0aGUgLmFtYV9fcmVzb3VyY2UtLXNjaGVkdWxlcyBkaXYgdG8gaGF2ZSBtb2JpbGUgbG9vayBhbmQgZmVlbFxuICAgICAgJCgnLmFtYV9fcmVzb3VyY2UtLXNjaGVkdWxlcyB0YWJsZScpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmJhc2ljdGFibGUoJ3N0YXJ0Jyk7XG4gICAgICB9KTtcblxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qPT09PT09IGpRdWVyeSBVSSB0YWJzID09PT09PSovXG5cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfdGFicyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIGRlZmF1bHRBY3RpdmVUYWIgPSAwO1xuICAgICAgdmFyIHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGlmICh2aWV3cG9ydFdpZHRoID49IDYwMCAmJiAkKCcuYW1hX19yZXNvdXJjZS10YWJzJykubGVuZ3RoID4gMCkge1xuICAgICAgICBkZWZhdWx0QWN0aXZlVGFiID0gMTtcbiAgICAgIH1cblxuICAgICAgJChcIi5hbWFfX3RhYnMsIC5hbWFfX3Jlc291cmNlLXRhYnNcIikudGFicyh7XG4gICAgICAgIGFjdGl2ZTogZGVmYXVsdEFjdGl2ZVRhYixcbiAgICAgICAgYWN0aXZhdGU6IHJlbW92ZUhpZ2hsaWdodHNcbiAgICAgIH0pO1xuXG4gICAgICAvLyBQcmV2ZW50IGp1bXAgb25jbGlja1xuICAgICAgJCgnLnVpLXRhYnMtYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuXG4gICAgICAvL1NpbXVsYXRlIGNsaWNrIGV2ZW50IG9uIGFjdHVhbCBzaW1wbGVUYWJzIHRhYiBmcm9tIG1vYmlsZSBkcm9wIGRvd24uXG4gICAgICAkKCcuYW1hX190YWJzLW5hdmlnYXRpb24tLW1vYmlsZSBzZWxlY3QnKS5vbihcInNlbGVjdG1lbnVjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IHVpLml0ZW0udmFsdWU7XG4gICAgICAgICQoJ2FbaHJlZj1cIiMnICsgc2VsZWN0ZWRWYWx1ZSArICdcIl0nKS5jbGljaygpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdoZW4gY2xpY2tpbmcgYW4gaW5saW5lIHJlc291cmNlIHBhZ2UgbGluayByZWZlcmVuY2luZyBhIHRhYiwgb3BlbiByZWZlcmVuY2VkIHRhYi5cbiAgICAgICQoJy5hbWFfX3Jlc291cmNlLWxpbmstLWlubGluZSwgLmFtYV9fcGFnZS0tcmVzb3VyY2VfX3Jlc291cmNlLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgJHRhYnMgPSAkKCcuYW1hX19yZXNvdXJjZS10YWJzJyk7XG4gICAgICAgIHN3aXRjaFRhYnMoJHRhYnMsIHRoaXMpO1xuICAgICAgICAvLyBTdG9wIGJ1YmJsaW5nIGFuZCBkZWZhdWx0IGFjdGlvbnNcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZUhpZ2hsaWdodHMoKSB7XG4gICAgICAgICQoJy5hbWFfcmVzb3VyY2UtaGVhZGVyLS1oaWdobGlnaHQnKS5yZW1vdmVDbGFzcygnYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0Jyk7XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgKiBUaGlzIGZ1bmN0aW9uIGFuaW1hdGVzIHRoZSBicm93c2VyIHNjcm9sbCBhY3Rpb24gd2l0aCBhdHRlbnRpb24gdG8ga2V5Ym9hcmQgb25seSBhY2Nlc3NpYmlsaXR5IGNvbmNlcm5zXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFiTmF2XG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YXJnZXRcbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKCR0YWJOYXYsIHRhYkhhc2gsIHBvc2l0aW9uSW5UYWIpIHtcbiAgICAgICAgdmFyIHNjcm9sbFRhcmdldCA9IHdpbmRvdy5pbm5lcldpZHRoID49IDEyMDAgPyAnLmFtYV9fcmVzb3VyY2UtdGFic19fY29udGVudCcgOiAnaHRtbCxib2R5JztcblxuICAgICAgICAvLyBSZW1vdmUgcHJldmlvdXMgaGlnaGxpZ2h0cywgaWYgYW55XG4gICAgICAgIHJlbW92ZUhpZ2hsaWdodHMoKTtcblxuICAgICAgICAvLyBUcnkgdG8gZmluZCB0YXJnZXQgZWxlbWVudCBvZmZzZXQsIGJ1dCBkZWZhdWx0IHRvIHplcm9cbiAgICAgICAgdmFyIHNjcm9sbFBvc2l0aW9uID0gMDtcbiAgICAgICAgdmFyICR0YXJnZXQ7XG4gICAgICAgIGlmIChwb3NpdGlvbkluVGFiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgdGFiRWxlbWVudHMgPSAkKHRhYkhhc2ggKyAnIC5hbWFfX3Jlc291cmNlLXRhYnNfX2l0ZW0nKTtcbiAgICAgICAgICBpZiAodGFiRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBJZiBkZXNpcmVkIHBvc2l0aW9uIGlzIGxhcmdlciB0aGFuIHRoZSByZXN1bHQgc2V0LCB1c2UgdGhlIGxhc3QgZWxlbWVudFxuICAgICAgICAgICAgaWYgKHRhYkVsZW1lbnRzLmxlbmd0aCA8PSBwb3NpdGlvbkluVGFiKSB7XG4gICAgICAgICAgICAgIHBvc2l0aW9uSW5UYWIgPSB0YWJFbGVtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVc2VycyBhcmUgaW5zdHJ1Y3RlZCB0byBjb25zaWRlciAxIGFzIHRoZSBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGFiRWxlbWVudHNbcG9zaXRpb25JblRhYiAtIDFdO1xuICAgICAgICAgICAgc2Nyb2xsUG9zaXRpb24gPSB0YXJnZXQub2Zmc2V0VG9wO1xuICAgICAgICAgICAgLy8gQWRkIGhpZ2hsaWdodCB0byB0YXJnZXRcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKHRhcmdldCkuZmluZCgnLmFtYV9yZXNvdXJjZS1oZWFkZXInKTsgLy8gc2F2ZSBmb3IgdXNlIGluIGFuaW1hdGUoKSBjYWxsYmFja1xuICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICR0YXJnZXQgPSAkKHRhYkhhc2gpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAkKHNjcm9sbFRhcmdldCkuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxQb3NpdGlvblxuICAgICAgICB9LCA4NTAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBVcGRhdGUgZm9jdXMgZm9yIGtleWJvYXJkIG9ubHkgbmF2aWdhdGlvblxuICAgICAgICAgICR0YXJnZXQuYXR0cigndGFiaW5kZXgnLCAnLTEnKS5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9wIGJ1YmJsaW5nIGFuZCBkZWZhdWx0IGFjdGlvbnNcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICogVGhpcyBmdW5jdGlvbiBvcGVucyByZWZlcmVuY2VkIHRhYnMgZnJvbSBpbmxpbmUgbGlua3NcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YWJPYmogVGhlIGVsZW1lbnQgd2hpY2ggaGFzIHRoZSAudGFiKCkgZnVuY3Rpb24gYXR0YWNoZWQuXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGxpbmtcbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gc3dpdGNoVGFicygkdGFiT2JqLCBsaW5rKSB7XG5cbiAgICAgICAgdmFyIGxpbmtIYXNoID0gbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICB2YXIgd2lkZ2V0ID0gJHRhYk9iai5kYXRhKCd1aS10YWJzJyk7XG5cbiAgICAgICAgdmFyIHRhYkhhc2gsIHBvc2l0aW9uSW5UYWI7XG4gICAgICAgIHZhciBwYXJ0cyA9IGxpbmtIYXNoLnNwbGl0KCctJyk7XG4gICAgICAgIHRhYkhhc2ggPSBwYXJ0c1swXTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBwb3NpdGlvbkluVGFiID0gcGFydHNbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgb2xkIGxpbmssIHRyeSB0byBkZXRlcm1pbmUgcG9zaXRpb24gZnJvbSBsaW5rIHRleHRcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IGxpbmsuaW5uZXJUZXh0Lm1hdGNoKC8oWzAtOV0rKS9nKTtcbiAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgcG9zaXRpb25JblRhYiA9IG1hdGNoZXMuc2hpZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbnN1cmUgY29ycmVjdCB0YWIgaXMgYWN0aXZlXG4gICAgICAgIHZhciB0YWJJbmRleCA9IHdpZGdldC5fZ2V0SW5kZXgodGFiSGFzaCk7XG4gICAgICAgICR0YWJPYmoudGFicyh7XG4gICAgICAgICAgYWN0aXZlOiB0YWJJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdG9wIG9mIHVpIHRhYnMgbmF2aWdhdGlvblxuICAgICAgICBzbW9vdGhTY3JvbGwoJHRhYk9iaiwgdGFiSGFzaCwgcG9zaXRpb25JblRhYik7XG5cbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBJbnRlcmFjdGlvbnMgZm9yIHdheWZpbmRlci5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy53YXlmaW5kZXIgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICBpZigkLmNvb2tpZSgnYW1hX3dheWZpbmRlcl9jb29raWUnKSkge1xuICAgICAgICAgICQuY29va2llLmpzb24gPSB0cnVlO1xuICAgICAgICAgIC8vIFJlYWQgd2F5ZmluZGVyIGNvb2tpZXMgc2V0IGZyb20gYW1hLWFzc24gZG9tYWluc1xuICAgICAgICAgIHZhciBhbWFfd2F5ZmluZGVyX2Nvb2tpZSA9ICQuY29va2llKCdhbWFfd2F5ZmluZGVyX2Nvb2tpZScpO1xuICAgICAgICAgIGlmICh0eXBlb2YgYW1hX3dheWZpbmRlcl9jb29raWUgIT09ICd1bmRlZmluZWQnIHx8ICQoJy5yZWZlcnJlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLmZhZGVJbigpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG4gICAgICAgICAgICAkKCcuYW1hX193YXlmaW5kZXItLXJlZmVycmVyIGEnKS5hdHRyKFwiaHJlZlwiLCBhbWFfd2F5ZmluZGVyX2Nvb2tpZVsxXSk7XG4gICAgICAgICAgICAkKCcuYW1hX193YXlmaW5kZXItLXJlZmVycmVyIGEnKS50ZXh0KGFtYV93YXlmaW5kZXJfY29va2llWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmFtYV93YXlmaW5kZXJfcmVmZXJyZXItLWxpbmstYmFjaycpLmZhZGVPdXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgdmFyIHZlcmlmeUZpZWxkcyA9IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICB2YXIgJHNlY3Rpb25zID0gZm9ybS5maW5kKCdzZWN0aW9uJyk7XG4gICAgdmFyICRpbnB1dHMgPSAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gc2VjdGlvbiAqJykuZmlsdGVyKCc6aW5wdXQnKTtcbiAgICB2YXIgJGljb25FbGVtZW50ID0gJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpO1xuICAgIHZhciBlcnJvclNlY3Rpb25zID0gW107XG5cbiAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24oaSwgaW5wdXQpIHtcbiAgICAgICRjbG9zZXN0U2VjdGlvbiA9ICQodGhpcykuY2xvc2VzdCgnc2VjdGlvbicpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudG9TdHJpbmcoKTtcbiAgICAgIGlmICgkKHRoaXMpLnByb3AoJ3JlcXVpcmVkJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXJyb3InKSkge1xuICAgICAgICBlcnJvclNlY3Rpb25zLnB1c2goJGNsb3Nlc3RTZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRzZWN0aW9ucy5lYWNoKGZ1bmN0aW9uKGksIHNlY3Rpb24pIHtcbiAgICAgIGlmICgkLmluQXJyYXkoJCh0aGlzKS5hdHRyKCdkYXRhLWRydXBhbC1zZWxlY3RvcicpLnRyaW0oKS50b1N0cmluZygpLCBlcnJvclNlY3Rpb25zKSAhPT0gLTEpIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCRpY29uRWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2VkaXQgZXJyb3IgY29tcGxldGVkJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCRpY29uRWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2VkaXQgZXJyb3IgY29tcGxldGVkJykuYWRkQ2xhc3MoJ2NvbXBsZXRlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcbiAgICB2YXIgZW1haWxSZWcgPSAvXihbXFx3LVxcLl0rQChbXFx3LV0rXFwuKStbXFx3LV17Miw0fSk/JC87XG4gICAgcmV0dXJuIGVtYWlsUmVnLnRlc3QoZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmllbGRJc1JlcXVpcmVkKGlucHV0KSB7XG4gICAgaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgaW5wdXQubmV4dCgpLnJlbW92ZSgnLmZvcm0taXRlbS0tZXJyb3ItbWVzc2FnZScpO1xuICAgIGlucHV0LmFmdGVyKCc8ZGl2IGNsYXNzPVwiZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlXCI+RmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0ZpZWxkKGlucHV0KSB7XG4gICAgaWYgKGlucHV0LnByb3AoJ3JlcXVpcmVkJykgJiYgKGlucHV0LnZhbCgpLmxlbmd0aCA9PT0gMCB8fCBpbnB1dC52YWwoKSA9PT0gXCJcIikpIHtcbiAgICAgIGZpZWxkSXNSZXF1aXJlZChpbnB1dCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKGlucHV0LmF0dHIoJ3R5cGUnKSA9PT0gJ2VtYWlsJyAmJiAhdmFsaWRhdGVFbWFpbChpbnB1dC52YWwoKSkpIHtcbiAgICAgICAgZmllbGRJc1JlcXVpcmVkKGlucHV0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKS5uZXh0KCkucmVtb3ZlKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU3VibWl0cyBmaXJzdCBwYWdlIG9mIENvbnRhY3QgVXMgZm9ybSBvbiByYWRpbyBidXR0b24gc2VsZWN0aW9uXG4gICQuZm4uY29udGFjdFN1Ym1pdCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyICR3ZWJmb3JtX2J1dHRvbnMgPSAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWNvbnRhY3QtdXMtZm9ybSBpbnB1dFt0eXBlPVwicmFkaW9cIl0nKTtcbiAgICAkd2ViZm9ybV9idXR0b25zLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1jb250YWN0LXVzLWZvcm0nKS5zdWJtaXQoKTtcbiAgICB9KTtcbiAgfVxuICAkLmZuLmNvbnRhY3RTdWJtaXQoKTtcbiAgJCggZG9jdW1lbnQgKS5hamF4Q29tcGxldGUoZnVuY3Rpb24oKSB7XG4gICAgJC5mbi5jb250YWN0U3VibWl0KCk7XG4gIH0pO1xuXG4gIC8vIEdvIGJhY2sgdG8gcHJldmlvdXMgYmFjayBpcyB1c2VyIGNsaWNrcyBkZWNsaW5lIHN1Ym1pdCBidXR0b25cbiAgJCgnLmFtYV9fYnV0dG9uLS1kZWNsaW5lJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciA9PT0gXCJcIikge1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZj0nLyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgaW5pdGlhbExvYWQgPSB0cnVlO1xuXG4gIERydXBhbC5iZWhhdmlvcnMud2ViRm9ybSA9IHtcbiAgICBkZXRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncywgdHJpZ2dlcikge1xuICAgICAgaWYgKHRyaWdnZXIgPT09ICdzZXJpYWxpemUnKSB7XG4gICAgICAgIGluaXRpYWxMb2FkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgaWYgKCFpbml0aWFsTG9hZCkge1xuICAgICAgICBpZiAoIWNvbnRleHQuaW5uZXJUZXh0Lm1hdGNoKFwiRXJyb3IgbWVzc2FnZVwiKSkge1xuICAgICAgICAgICQoJy5hbWFfX3NhbGVzLWxhbmRpbmctcGFnZV9fZm9ybV9faGVhZGluZycpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAkLnZhbGlkYXRvci5hZGRNZXRob2QoXG4gICAgICAgIFwicmVnZXhcIixcbiAgICAgICAgZnVuY3Rpb24odmFsdWUsIGVsZW1lbnQsIHJlZ2V4cCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIHx8IHJlZ2V4cC50ZXN0KHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJQbGVhc2UgY2hlY2sgeW91ciBpbnB1dC5cIlxuICAgICAgKTtcblxuICAgICAgLy8gT24gd2ViZm9ybSBzdWJtaXQgY2hlY2sgdG8gc2VlIGlmIGFsbCBpbnB1dHMgYXJlIHZhbGlkXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0nKS52YWxpZGF0ZSh7XG4gICAgICAgIGlnbm9yZTogW10sXG4gICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgJ2VtYWlsJzoge1xuICAgICAgICAgICAgZW1haWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgICd0ZWxlcGhvbmUnOiB7XG4gICAgICAgICAgICAncmVnZXgnOiAvXihcXCtcXGR7MSwyfVxccyk/XFwoP1xcZHszfVxcKT9bXFxzLi1dP1xcZHszfVtcXHMuLV0/XFxkezR9JC9cbiAgICAgICAgICB9LFxuICAgICAgICAgICdiaXJ0aF95ZWFyJzoge1xuICAgICAgICAgICAgJ3JlZ2V4JzogL14oMTl8MjApXFxkezJ9JC9cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xuICAgICAgICAgIGlmIChlbGVtZW50LmF0dHIoXCJ0eXBlXCIpID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQucGFyZW50KCkuc2libGluZ3MoKS5sYXN0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChlbGVtZW50LmlzKFwic2VsZWN0XCIpKSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50Lm5leHQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkSGFuZGxlcjogZnVuY3Rpb24oZm9ybSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRvci5udW1iZXJPZkludmFsaWRzKCk7XG4gICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCQoJy5qcy1mb3JtLXR5cGUtcmFkaW8nKS5maW5kKCdsYWJlbC5lcnJvcicpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgJCgnLmpzLWZvcm0tdHlwZS1yYWRpbyBsYWJlbC5lcnJvcicpLnBhcmVudHMoJy5maWVsZHNldC13cmFwcGVyJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGlucHV0cyBhcmUgdmFsaWRcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIGxhYmVsLmVycm9yJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiggJCh0aGlzKS50ZXh0KCkgIT09ICcnKSB7XG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQWRkIHZhbGlkYXRpb24gdG8gc2VsZWN0IGRyb3Bkb3duIG1lbnVzIHVzaW5nIGpRdWVyeSBVSVxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIHNlbGVjdCcpLnNlbGVjdG1lbnUoe1xuICAgICAgICBzdHlsZTogJ2Ryb3Bkb3duJyxcbiAgICAgICAgdHJhbnNmZXJDbGFzc2VzOiB0cnVlLFxuICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKFwiLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtXCIpLnZhbGlkYXRlKCkuZWxlbWVudCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIENvcGllcyBlbWFpbCBpbnB1dCB2YWx1ZXMgZnJvbSBlbWFpbCBzdWJzY3JpcHRpb24gYW5kIGluc2VydHMgaW50byB0aGUgb3RoZXIgZW1haWwgc3Vic2NyaXB0aW9uIGZvcm0gb24gcGFnZVxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1lbWFpbC1zdWJzY3JpcHRpb24tZm9ybScpLmZpbmQoJ2lucHV0W25hbWU9ZW1haWxdJykua2V5dXAoZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWVtYWlsLXN1YnNjcmlwdGlvbi1mb3JtJykuZmluZCgnaW5wdXRbbmFtZT1lbWFpbF0nKS52YWwoJCh0aGlzKS52YWwoKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKlxuICogQGxpY2Vuc2UgalF1ZXJ5IEJhc2ljdGFibGUgfCBNSVQgfCBKZXJyeSBMb3cgfCBodHRwczovL3d3dy5naXRodWIuY29tL2plcnJ5bG93L2Jhc2ljdGFibGVcbiAqL1xuIWZ1bmN0aW9uKHQpe3QuZm4uYmFzaWN0YWJsZT1mdW5jdGlvbihhKXt2YXIgZT1mdW5jdGlvbihhLGUsbil7YS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oKXt2YXIgYT10KHRoaXMpO2lmKFwiXCIhPT1hLmh0bWwoKSYmXCImbmJzcDtcIiE9PWEuaHRtbCgpfHxuLnNob3dFbXB0eUNlbGxzKXtmb3IodmFyIHI9YS5pbmRleCgpLGk9XCJcIixzPTA7czxlLmxlbmd0aDtzKyspezAhPXMmJihpKz1cIjogXCIpLGkrPWVbc11bcl0udGV4dCgpfWEuYXR0cihcImRhdGEtdGhcIixpKSxuLmNvbnRlbnRXcmFwJiYhYS5jaGlsZHJlbigpLmhhc0NsYXNzKFwiYnQtY29udGVudFwiKSYmYS53cmFwSW5uZXIoJzxzcGFuIGNsYXNzPVwiYnQtY29udGVudFwiIC8+Jyl9ZWxzZSBhLmFkZENsYXNzKFwiYnQtaGlkZVwiKX0pfSxuPWZ1bmN0aW9uKGEsZSl7ZS5mb3JjZVJlc3BvbnNpdmU/bnVsbCE9PWUuYnJlYWtwb2ludCYmdCh3aW5kb3cpLndpZHRoKCk8PWUuYnJlYWtwb2ludHx8bnVsbCE9PWUuY29udGFpbmVyQnJlYWtwb2ludCYmYS5wYXJlbnQoKS53aWR0aCgpPD1lLmNvbnRhaW5lckJyZWFrcG9pbnQ/cihhLGUpOmkoYSxlKTphLnJlbW92ZUNsYXNzKFwiYnRcIikub3V0ZXJXaWR0aCgpPmEucGFyZW50KCkud2lkdGgoKT9yKGEsZSk6aShhLGUpfSxyPWZ1bmN0aW9uKHQsYSl7dC5hZGRDbGFzcyhcImJ0XCIpLGEuaGVhZGVyfHx0LmFkZENsYXNzKFwiYnQtLW5vLWhlYWRlclwiKSxhLnRhYmxlV3JhcCYmdC5wYXJlbnQoXCIuYnQtd3JhcHBlclwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKX0saT1mdW5jdGlvbih0LGEpe3QucmVtb3ZlQ2xhc3MoXCJidCBidC0tbm8taGVhZGVyXCIpLGEudGFibGVXcmFwJiZ0LnBhcmVudChcIi5idC13cmFwcGVyXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpfSxzPWZ1bmN0aW9uKGEsZSl7dmFyIG47YS5yZW1vdmVDbGFzcyhcImJ0IGJ0LS1uby1oZWFkZXJcIiksYS5maW5kKFwidGRcIikucmVtb3ZlQXR0cihcImRhdGEtdGhcIiksZS50YWJsZVdyYXAmJmEudW53cmFwKCksZS5jb250ZW50V3JhcCYmKG49YSx0LmVhY2gobi5maW5kKFwidGRcIiksZnVuY3Rpb24oKXt2YXIgYT10KHRoaXMpLGU9YS5jaGlsZHJlbihcIi5idC1jb250ZW50XCIpLmh0bWwoKTthLmh0bWwoZSl9KSksYS5yZW1vdmVEYXRhKFwiYmFzaWN0YWJsZVwiKX07dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIG89dCh0aGlzKTtpZigwPT09by5sZW5ndGh8fG8uZGF0YShcImJhc2ljdGFibGVcIikpcmV0dXJuIG8uZGF0YShcImJhc2ljdGFibGVcIikmJihcImRlc3Ryb3lcIj09YT9zKG8sby5kYXRhKFwiYmFzaWN0YWJsZVwiKSk6XCJzdGFydFwiPT09YT9yKG8sby5kYXRhKFwiYmFzaWN0YWJsZVwiKSk6XCJzdG9wXCI9PT1hP2kobyxvLmRhdGEoXCJiYXNpY3RhYmxlXCIpKTpuKG8sby5kYXRhKFwiYmFzaWN0YWJsZVwiKSkpLCExO3ZhciBsPXQuZXh0ZW5kKHt9LHQuZm4uYmFzaWN0YWJsZS5kZWZhdWx0cyxhKSxiPXticmVha3BvaW50OmwuYnJlYWtwb2ludCxjb250YWluZXJCcmVha3BvaW50OmwuY29udGFpbmVyQnJlYWtwb2ludCxjb250ZW50V3JhcDpsLmNvbnRlbnRXcmFwLGZvcmNlUmVzcG9uc2l2ZTpsLmZvcmNlUmVzcG9uc2l2ZSxub1Jlc2l6ZTpsLm5vUmVzaXplLHRhYmxlV3JhcDpsLnRhYmxlV3JhcCxzaG93RW1wdHlDZWxsczpsLnNob3dFbXB0eUNlbGxzLGhlYWRlcjpsLmhlYWRlcn07bnVsbD09PWIuYnJlYWtwb2ludCYmbnVsbD09PWIuY29udGFpbmVyQnJlYWtwb2ludCYmKGIuYnJlYWtwb2ludD01NjgpLG8uZGF0YShcImJhc2ljdGFibGVcIixiKSxmdW5jdGlvbihhLG4pe3ZhciByPVtdO2lmKG4udGFibGVXcmFwJiZhLndyYXAoJzxkaXYgY2xhc3M9XCJidC13cmFwcGVyXCI+PC9kaXY+Jyksbi5oZWFkZXIpe3ZhciBpPVwiXCI7aT1hLmZpbmQoXCJ0aGVhZCB0ciB0aFwiKS5sZW5ndGg/XCJ0aGVhZCB0aFwiOmEuZmluZChcInRib2R5IHRyIHRoXCIpLmxlbmd0aD9cInRib2R5IHRyIHRoXCI6YS5maW5kKFwidGhcIikubGVuZ3RoP1widHI6Zmlyc3QgdGhcIjpcInRyOmZpcnN0IHRkXCIsdC5lYWNoKGEuZmluZChpKSxmdW5jdGlvbigpe3ZhciBhPXQodGhpcyksZT1wYXJzZUludChhLmF0dHIoXCJjb2xzcGFuXCIpLDEwKXx8MSxuPWEuY2xvc2VzdChcInRyXCIpLmluZGV4KCk7cltuXXx8KHJbbl09W10pO2Zvcih2YXIgaT0wO2k8ZTtpKyspcltuXS5wdXNoKGEpfSl9dC5lYWNoKGEuZmluZChcInRib2R5IHRyXCIpLGZ1bmN0aW9uKCl7ZSh0KHRoaXMpLHIsbil9KSx0LmVhY2goYS5maW5kKFwidGZvb3QgdHJcIiksZnVuY3Rpb24oKXtlKHQodGhpcykscixuKX0pfShvLG8uZGF0YShcImJhc2ljdGFibGVcIikpLGIubm9SZXNpemV8fChuKG8sby5kYXRhKFwiYmFzaWN0YWJsZVwiKSksdCh3aW5kb3cpLmJpbmQoXCJyZXNpemUuYmFzaWN0YWJsZVwiLGZ1bmN0aW9uKCl7dmFyIHQ7KHQ9bykuZGF0YShcImJhc2ljdGFibGVcIikmJm4odCx0LmRhdGEoXCJiYXNpY3RhYmxlXCIpKX0pKX0pfSx0LmZuLmJhc2ljdGFibGUuZGVmYXVsdHM9e2JyZWFrcG9pbnQ6bnVsbCxjb250YWluZXJCcmVha3BvaW50Om51bGwsY29udGVudFdyYXA6ITAsZm9yY2VSZXNwb25zaXZlOiEwLG5vUmVzaXplOiExLHRhYmxlV3JhcDohMSxzaG93RW1wdHlDZWxsczohMSxoZWFkZXI6ITB9fShqUXVlcnkpO1xuIiwiLyohXG4gKiBqUXVlcnkgQ29va2llIFBsdWdpbiB2MS40LjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXJoYXJ0bC9qcXVlcnktY29va2llXG4gKlxuICogQ29weXJpZ2h0IDIwMTMgS2xhdXMgSGFydGxcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEJyb3dzZXIgZ2xvYmFsc1xuXHRcdGZhY3RvcnkoalF1ZXJ5KTtcblx0fVxufShmdW5jdGlvbiAoJCkge1xuXG5cdHZhciBwbHVzZXMgPSAvXFwrL2c7XG5cblx0ZnVuY3Rpb24gZW5jb2RlKHMpIHtcblx0XHRyZXR1cm4gY29uZmlnLnJhdyA/IHMgOiBlbmNvZGVVUklDb21wb25lbnQocyk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZWNvZGUocykge1xuXHRcdHJldHVybiBjb25maWcucmF3ID8gcyA6IGRlY29kZVVSSUNvbXBvbmVudChzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0cmluZ2lmeUNvb2tpZVZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIGVuY29kZShjb25maWcuanNvbiA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IFN0cmluZyh2YWx1ZSkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VDb29raWVWYWx1ZShzKSB7XG5cdFx0aWYgKHMuaW5kZXhPZignXCInKSA9PT0gMCkge1xuXHRcdFx0Ly8gVGhpcyBpcyBhIHF1b3RlZCBjb29raWUgYXMgYWNjb3JkaW5nIHRvIFJGQzIwNjgsIHVuZXNjYXBlLi4uXG5cdFx0XHRzID0gcy5zbGljZSgxLCAtMSkucmVwbGFjZSgvXFxcXFwiL2csICdcIicpLnJlcGxhY2UoL1xcXFxcXFxcL2csICdcXFxcJyk7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIFJlcGxhY2Ugc2VydmVyLXNpZGUgd3JpdHRlbiBwbHVzZXMgd2l0aCBzcGFjZXMuXG5cdFx0XHQvLyBJZiB3ZSBjYW4ndCBkZWNvZGUgdGhlIGNvb2tpZSwgaWdub3JlIGl0LCBpdCdzIHVudXNhYmxlLlxuXHRcdFx0Ly8gSWYgd2UgY2FuJ3QgcGFyc2UgdGhlIGNvb2tpZSwgaWdub3JlIGl0LCBpdCdzIHVudXNhYmxlLlxuXHRcdFx0cyA9IGRlY29kZVVSSUNvbXBvbmVudChzLnJlcGxhY2UocGx1c2VzLCAnICcpKTtcblx0XHRcdHJldHVybiBjb25maWcuanNvbiA/IEpTT04ucGFyc2UocykgOiBzO1xuXHRcdH0gY2F0Y2goZSkge31cblx0fVxuXG5cdGZ1bmN0aW9uIHJlYWQocywgY29udmVydGVyKSB7XG5cdFx0dmFyIHZhbHVlID0gY29uZmlnLnJhdyA/IHMgOiBwYXJzZUNvb2tpZVZhbHVlKHMpO1xuXHRcdHJldHVybiAkLmlzRnVuY3Rpb24oY29udmVydGVyKSA/IGNvbnZlcnRlcih2YWx1ZSkgOiB2YWx1ZTtcblx0fVxuXG5cdHZhciBjb25maWcgPSAkLmNvb2tpZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zKSB7XG5cblx0XHQvLyBXcml0ZVxuXG5cdFx0aWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgISQuaXNGdW5jdGlvbih2YWx1ZSkpIHtcblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgY29uZmlnLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdHZhciBkYXlzID0gb3B0aW9ucy5leHBpcmVzLCB0ID0gb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoKTtcblx0XHRcdFx0dC5zZXRUaW1lKCt0ICsgZGF5cyAqIDg2NGUrNSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0gW1xuXHRcdFx0XHRlbmNvZGUoa2V5KSwgJz0nLCBzdHJpbmdpZnlDb29raWVWYWx1ZSh2YWx1ZSksXG5cdFx0XHRcdG9wdGlvbnMuZXhwaXJlcyA/ICc7IGV4cGlyZXM9JyArIG9wdGlvbnMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJycsIC8vIHVzZSBleHBpcmVzIGF0dHJpYnV0ZSwgbWF4LWFnZSBpcyBub3Qgc3VwcG9ydGVkIGJ5IElFXG5cdFx0XHRcdG9wdGlvbnMucGF0aCAgICA/ICc7IHBhdGg9JyArIG9wdGlvbnMucGF0aCA6ICcnLFxuXHRcdFx0XHRvcHRpb25zLmRvbWFpbiAgPyAnOyBkb21haW49JyArIG9wdGlvbnMuZG9tYWluIDogJycsXG5cdFx0XHRcdG9wdGlvbnMuc2VjdXJlICA/ICc7IHNlY3VyZScgOiAnJ1xuXHRcdFx0XS5qb2luKCcnKSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVhZFxuXG5cdFx0dmFyIHJlc3VsdCA9IGtleSA/IHVuZGVmaW5lZCA6IHt9O1xuXG5cdFx0Ly8gVG8gcHJldmVudCB0aGUgZm9yIGxvb3AgaW4gdGhlIGZpcnN0IHBsYWNlIGFzc2lnbiBhbiBlbXB0eSBhcnJheVxuXHRcdC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLiBBbHNvIHByZXZlbnRzIG9kZCByZXN1bHQgd2hlblxuXHRcdC8vIGNhbGxpbmcgJC5jb29raWUoKS5cblx0XHR2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZSA/IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBjb29raWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0dmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuXHRcdFx0dmFyIG5hbWUgPSBkZWNvZGUocGFydHMuc2hpZnQoKSk7XG5cdFx0XHR2YXIgY29va2llID0gcGFydHMuam9pbignPScpO1xuXG5cdFx0XHRpZiAoa2V5ICYmIGtleSA9PT0gbmFtZSkge1xuXHRcdFx0XHQvLyBJZiBzZWNvbmQgYXJndW1lbnQgKHZhbHVlKSBpcyBhIGZ1bmN0aW9uIGl0J3MgYSBjb252ZXJ0ZXIuLi5cblx0XHRcdFx0cmVzdWx0ID0gcmVhZChjb29raWUsIHZhbHVlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFByZXZlbnQgc3RvcmluZyBhIGNvb2tpZSB0aGF0IHdlIGNvdWxkbid0IGRlY29kZS5cblx0XHRcdGlmICgha2V5ICYmIChjb29raWUgPSByZWFkKGNvb2tpZSkpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmVzdWx0W25hbWVdID0gY29va2llO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0Y29uZmlnLmRlZmF1bHRzID0ge307XG5cblx0JC5yZW1vdmVDb29raWUgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG5cdFx0aWYgKCQuY29va2llKGtleSkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIE11c3Qgbm90IGFsdGVyIG9wdGlvbnMsIHRodXMgZXh0ZW5kaW5nIGEgZnJlc2ggb2JqZWN0Li4uXG5cdFx0JC5jb29raWUoa2V5LCAnJywgJC5leHRlbmQoe30sIG9wdGlvbnMsIHsgZXhwaXJlczogLTEgfSkpO1xuXHRcdHJldHVybiAhJC5jb29raWUoa2V5KTtcblx0fTtcblxufSkpO1xuIl19
