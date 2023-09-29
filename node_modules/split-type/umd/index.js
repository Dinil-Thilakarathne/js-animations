/**
 * SplitType
 * https://github.com/lukePeavey/SplitType
 * @version 0.3.3
 * @author Luke Peavey <lwpeavey@gmail.com>
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SplitType = factory());
})(this, (function () { 'use strict';

  // Polyfill the following DOM methods that are not supported in IE 11.

  (() => {
    function append(...nodes) {
      const length = nodes.length;

      for (let i = 0; i < length; i++) {
        const node = nodes[i];
        if (node.nodeType === 1 || node.nodeType === 11) this.appendChild(node);else this.appendChild(document.createTextNode(String(node)));
      }
    }

    function replaceChildren(...nodes) {
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }

      if (nodes.length) this.append(...nodes);
    }

    function replaceWith(...nodes) {
      const parent = this.parentNode;
      let i = nodes.length;
      if (!parent) return;
      if (!i) parent.removeChild(this);

      while (i--) {
        let node = nodes[i];

        if (typeof node !== 'object') {
          node = this.ownerDocument.createTextNode(node);
        } else if (node.parentNode) {
          node.parentNode.removeChild(node);
        }

        if (!i) {
          parent.replaceChild(node, this);
        } else {
          parent.insertBefore(this.previousSibling, node);
        }
      }
    }

    if (typeof Element !== 'undefined') {
      if (!Element.prototype.append) {
        Element.prototype.append = append;
        DocumentFragment.prototype.append = append;
      }

      if (!Element.prototype.replaceChildren) {
        Element.prototype.replaceChildren = replaceChildren;
        DocumentFragment.prototype.replaceChildren = replaceChildren;
      }

      if (!Element.prototype.replaceWith) {
        Element.prototype.replaceWith = replaceWith;
        DocumentFragment.prototype.replaceWith = replaceWith;
      }
    }
  })();

  /**
   * Shallow merges the properties of an object with the target object. Only
   * includes properties that exist on the target object. Non-writable properties
   * on the target object will not be over-written.
   *
   * @param {Object} target
   * @param {Object} object
   */
  function extend(target, object) {
    return Object.getOwnPropertyNames(Object(target)).reduce((extended, key) => {
      const currentValue = Object.getOwnPropertyDescriptor(Object(target), key);
      const newValue = Object.getOwnPropertyDescriptor(Object(object), key);
      return Object.defineProperty(extended, key, newValue || currentValue);
    }, {});
  }

  /**
   * Checks if given value is a string
   *
   * @param {any} value
   * @return {boolean} `true` if `value` is a string, else `false`
   */
  function isString(value) {
    return typeof value === 'string';
  }

  function isArray(value) {
    return Array.isArray(value);
  }

  /**
   * Parses user supplied settings objects.
   */

  function parseSettings(settings = {}) {
    const object = extend(settings); // `split` may be used as an alias for the `types` option
    // Parse the `types` settings into an array of valid split types.
    // If `types` is explicitly set to an empty string or array, text will not be
    // split at all.

    let types;

    if (object.types !== undefined) {
      types = object.types;
    } else if (object.split !== undefined) {
      types = object.split;
    }

    if (types !== undefined) {
      object.types = (isString(types) || isArray(types) ? String(types) : '').split(',').map(type => String(type).trim()).filter(type => /((line)|(word)|(char))/i.test(type));
    } // Support `position: absolute` as an alias for `absolute: true`


    if (object.absolute || object.position) {
      object.absolute = object.absolute || /absolute/.test(settings.position);
    }

    return object;
  }

  /**
   * Takes a list of `types` and returns an object
   *
   * @param {string | string[]} value a comma separated list of split types
   * @return {{lines: boolean, words: boolean, chars: boolean}}
   */

  function parseTypes(value) {
    const types = isString(value) || isArray(value) ? String(value) : '';
    return {
      none: !types,
      lines: /line/i.test(types),
      words: /word/i.test(types),
      chars: /char/i.test(types)
    };
  }

  /**
   * Returns true if `value` is a non-null object.
   * @param {any} value
   * @return {boolean}
   */
  function isObject(value) {
    return value !== null && typeof value === 'object';
  }

  /**
   * Returns true if `input` is one of the following:
   * - `Element`
   * - `Text`
   * - `DocumentFragment`
   */

  function isNode(input) {
    return isObject(input) && /^(1|3|11)$/.test(input.nodeType);
  }

  /**
   * Checks if `value` is a valid array-like length.
   * Original source: Lodash
   *
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3)
   * // => true
   *
   * _.isLength(Number.MIN_VALUE)
   * // => false
   *
   * _.isLength(Infinity)
   * // => false
   *
   * _.isLength('3')
   * // => false
   */

  function isLength(value) {
    return typeof value === 'number' && value > -1 && value % 1 === 0;
  }
  /**
   * Checks if `value` is an array-like object
   * @param {any} value
   * @return {boolean} true if `value` is array-like`, else `false`
   * @example
   * isArrayLike(new Array())
   * // => true
   *
   * isArrayLike(document.querySelectorAll('div'))
   * // => true
   *
   * isArrayLike(document.getElementsByTagName('div'))
   * // => true
   *
   * isArrayLike(() => {})
   * // => false
   *
   * isArrayLike({foo: 'bar'})
   * // => false
   *
   * * isArrayLike(null)
   * // => false
   */


  function isArrayLike(value) {
    return isObject(value) && isLength(value.length);
  }

  /**
   * Coerces `value` to an `Array`.
   *
   * @param {any} value
   * @return {any[]}
   * @example
   * // If `value` is any `Array`, returns original `Array`
   * let arr = [1, 2]
   * toArray(arr)
   * // => arr
   *
   * // If `value` is an `ArrayLike`, its equivalent to `Array.from(value)`
   * let nodeList = document.querySelectorAll('div')
   * toArray(nodeList)
   * // => HTMLElement[] s
   *
   * // If value is falsy, returns empty array
   * toArray(null)
   * // => []
   *
   * // For any other type of value, its equivalent to `Array.of(value)`
   * let element = document.createElement('div')
   * toArray(element)
   * // => [element]
   *
   */

  function toArray(value) {
    if (isArray(value)) return value;
    if (value == null) return [];
    return isArrayLike(value) ? Array.prototype.slice.call(value) : [value];
  }

  /**
   * Processes target elements for the splitType function.
   *
   * @param {any} target Can be one of the following:
   * 1. `string` - A css selector
   * 2. `HTMLElement` - A single element
   * 3. `NodeList` - A nodeList
   * 4. `Element[]` - An array of elements
   * 5. `Array<NodeList|Element[]>` - An nested array of elements
   * @returns {Element[]} A flat array HTML elements
   * @return A flat array of elements or empty array if no elements are found
   */

  function getTargetElements(target) {
    let elements = target; // If `target` is a selector string...

    if (isString(target)) {
      if (/^(#[a-z]\w+)$/.test(target.trim())) {
        // If `target` is an ID, use `getElementById`
        elements = document.getElementById(target.trim().slice(1));
      } else {
        // Else use `querySelectorAll`
        elements = document.querySelectorAll(target);
      }
    } // Return a flattened array of elements


    return toArray(elements).reduce((result, element) => {
      return [...result, ...toArray(element).filter(isNode)];
    }, []);
  }

  const {
    entries,
    keys,
    values
  } = Object;

  const expando = `_splittype`;
  const cache = {};
  let uid = 0;
  /**
   * Stores data associated with DOM elements or other objects. This is a
   * simplified version of jQuery's data method.
   *
   * @signature Data(owner)
   * @description Get the data store object for the given owner.
   * @param {Object} owner the object that data will be associated with.
   * @return {Object} the data object for given `owner`. If no data exists
   *     for the given object, creates a new data store and returns it.
   *
   * @signature Data(owner, key)
   * @description Get the value
   * @param {Object} owner
   * @param {string} key
   * @return {any} the value of the provided key. If key does not exist, returns
   *     undefined.
   *
   * @signature Data(owner, key, value)
   * @description Sets the given key/value pair in data store
   * @param {Object} owner
   * @param {string} key
   * @param {any} value
   */

  function set(owner, key, value) {
    if (!isObject(owner)) {
      console.warn('[data.set] owner is not an object');
      return null;
    }

    const id = owner[expando] || (owner[expando] = ++uid);
    const data = cache[id] || (cache[id] = {});

    if (value === undefined) {
      if (!!key && Object.getPrototypeOf(key) === Object.prototype) {
        cache[id] = { ...data,
          ...key
        };
      }
    } else if (key !== undefined) {
      data[key] = value;
    }

    return value;
  }
  function get(owner, key) {
    const id = isObject(owner) ? owner[expando] : null;
    const data = id && cache[id] || {};

    if (key === undefined) {
      return data;
    }

    return data[key];
  }
  /**
   * Remove all data associated with the given element
   */

  function remove(element) {
    const id = element && element[expando];

    if (id) {
      delete element[id];
      delete cache[id];
    }
  }
  /**
   * Remove all temporary data from the store.
   */

  function cleanup() {
    entries(cache).forEach(([id, {
      isRoot,
      isSplit
    }]) => {
      if (!isRoot || !isSplit) {
        cache[id] = null;
        delete cache[id];
      }
    });
  }

  /**
   * Splits a string into an array of words.
   *
   * @param {string} string
   * @param {string | RegExp} [separator = ' ']
   * @return {string[]} Array of words
   */
  function toWords(value, separator = ' ') {
    const string = value ? String(value) : '';
    return string.trim().replace(/\s+/g, ' ').split(separator);
  }

  /**
   * Based on lodash#split <https://lodash.com/license>
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters &
   * Editors
   */
  const rsAstralRange = '\\ud800-\\udfff';
  const rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
  const rsComboSymbolsRange = '\\u20d0-\\u20f0';
  const rsVarRange = '\\ufe0e\\ufe0f';
  /** Used to compose unicode capture groups. */

  const rsAstral = `[${rsAstralRange}]`;
  const rsCombo = `[${rsComboMarksRange}${rsComboSymbolsRange}]`;
  const rsFitz = '\\ud83c[\\udffb-\\udfff]';
  const rsModifier = `(?:${rsCombo}|${rsFitz})`;
  const rsNonAstral = `[^${rsAstralRange}]`;
  const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
  const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
  const rsZWJ = '\\u200d';
  /** Used to compose unicode regexes. */

  const reOptMod = `${rsModifier}?`;
  const rsOptVar = `[${rsVarRange}]?`;
  const rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
  const rsSeq = rsOptVar + reOptMod + rsOptJoin;
  const rsSymbol = `(?:${[`${rsNonAstral}${rsCombo}?`, rsCombo, rsRegional, rsSurrPair, rsAstral].join('|')}
)`;
  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

  const reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol}${rsSeq}`, 'g');
  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

  const unicodeRange = [rsZWJ, rsAstralRange, rsComboMarksRange, rsComboSymbolsRange, rsVarRange];
  const reHasUnicode = RegExp(`[${unicodeRange.join('')}]`);
  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */

  function asciiToArray(string) {
    return string.split('');
  }
  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */


  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */


  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */


  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }
  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values.
   *
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */

  function toString(value) {
    return value == null ? '' : String(value);
  }
  /**
   * Splits `string` into an array of characters. If `separator` is omitted,
   * it behaves likes split.split('').
   *
   * Unlike native string.split(''), it can split strings that contain unicode
   * characters like emojis and symbols.
   *
   * @param {string} [string=''] The string to split.
   * @param {RegExp|string} [separator=''] The separator pattern to split by.
   * @returns {Array} Returns the string segments.
   * @example
   * toChars('foo');
   * // => ['f', 'o', 'o']
   *
   * toChars('foo bar');
   * // => ["f", "o", "o", " ", "b", "a", "r"]
   *
   * toChars('f😀o');
   * // => ['f', '😀', 'o']
   *
   * toChars('f-😀-o', /-/);
   * // => ['f', '😀', 'o']
   *
   */


  function toChars(string, separator = '') {
    string = toString(string);

    if (string && isString(string)) {
      if (!separator && hasUnicode(string)) {
        return stringToArray(string);
      }
    }

    return string.split(separator);
  }

  /**
   * Create an HTML element with the the given attributes
   *
   * attributes can include standard HTML attribute, as well as the following
   * "special" properties:
   *   - children: HTMLElement | ArrayLike<HTMLElement>
   *   - textContent: string
   *   - innerHTML: string
   *
   * @param {string} name
   * @param  {Object} [attributes]
   * @returns {HTMLElement}
   */

  function createElement(name, attributes) {
    const element = document.createElement(name);

    if (!attributes) {
      // When called without the second argument, its just return the result
      // of `document.createElement`
      return element;
    }

    Object.keys(attributes).forEach(attribute => {
      const rawValue = attributes[attribute];
      const value = isString(rawValue) ? rawValue.trim() : rawValue; // Ignore attribute if the value is `null` or an empty string

      if (value === null || value === '') return;

      if (attribute === 'children') {
        // Children can be one or more Elements or DOM strings
        element.append(...toArray(value));
      } else {
        // Handle standard HTML attributes
        element.setAttribute(attribute, value);
      }
    });
    return element;
  }

  var defaults = {
    splitClass: '',
    lineClass: 'line',
    wordClass: 'word',
    charClass: 'char',
    types: ['lines', 'words', 'chars'],
    absolute: false,
    tagName: 'div'
  };

  /**
   * Splits the text content of a single TextNode into words and/or characters.
   *
   * This functions gets called for every text node inside the target element. It
   * replaces the text node with a document fragment containing the split text.
   * Returns an array of the split word and character elements from this node.
   *
   * @param {TextNode} textNode
   * @param {Object} settings
   * @return {{words: Element[], chars: Element[]}}
   */

  function splitWordsAndChars(textNode, settings) {
    settings = extend(defaults, settings); // The split types

    const types = parseTypes(settings.types); // the tag name for split text nodes

    const TAG_NAME = settings.tagName; // value of the text node

    const VALUE = textNode.nodeValue; // `splitText` is a wrapper to hold the HTML structure

    const splitText = document.createDocumentFragment(); // Arrays of split word and character elements

    let words = [];
    let chars = [];

    if (/^\s/.test(VALUE)) {
      splitText.append(' ');
    } // Create an array of wrapped word elements.


    words = toWords(VALUE).reduce((result, WORD, idx, arr) => {
      // Let `wordElement` be the wrapped element for the current word
      let wordElement;
      let characterElementsForCurrentWord; // -> If splitting text into characters...

      if (types.chars) {
        // Iterate through the characters in the current word
        characterElementsForCurrentWord = toChars(WORD).map(CHAR => {
          const characterElement = createElement(TAG_NAME, {
            class: `${settings.splitClass} ${settings.charClass}`,
            style: 'display: inline-block;',
            children: CHAR
          });
          set(characterElement, 'isChar', true);
          chars = [...chars, characterElement];
          return characterElement;
        });
      } // END IF;


      if (types.words || types.lines) {
        // -> If Splitting Text Into Words...
        //    Create an element to wrap the current word. If we are also
        //    splitting text into characters, the word element will contain the
        //    wrapped character nodes for this word. If not, it will contain the
        //    plain text content (WORD)
        wordElement = createElement(TAG_NAME, {
          class: `${settings.wordClass} ${settings.splitClass}`,
          style: `display: inline-block; ${types.words && settings.absolute ? `position: relative;` : ''}`,
          children: types.chars ? characterElementsForCurrentWord : WORD
        });
        set(wordElement, {
          isWord: true,
          isWordStart: true,
          isWordEnd: true
        });
        splitText.appendChild(wordElement);
      } else {
        // -> If NOT splitting into words OR lines...
        //    Append the characters elements directly to splitText.
        characterElementsForCurrentWord.forEach(characterElement => {
          splitText.appendChild(characterElement);
        });
      }

      if (idx < arr.length - 1) {
        // Add a space after the word.
        splitText.append(' ');
      } // If not splitting text into words, we return an empty array


      return types.words ? result.concat(wordElement) : result;
    }, []); // END LOOP;
    // Add a trailing white space to maintain word spacing

    if (/\s$/.test(VALUE)) {
      splitText.append(' ');
    }

    textNode.replaceWith(splitText);
    return {
      words,
      chars
    };
  }

  /**
   * Splits the text content of a target element into words and/or characters.
   * The function is recursive, it will also split the text content of any child
   * elements into words/characters, while preserving the nested elements.
   *
   * @param {Node} node an HTML Element or Text Node
   * @param {Object} setting splitType settings
   */

  function split(node, settings) {
    const type = node.nodeType; // Arrays of split words and characters

    const wordsAndChars = {
      words: [],
      chars: []
    }; // Only proceed if `node` is an `Element`, `Fragment`, or `Text`

    if (!/(1|3|11)/.test(type)) {
      return wordsAndChars;
    } // A) IF `node` is TextNode that contains characters other than white space...
    //    Split the text content of the node into words and/or characters
    //    return an object containing the split word and character elements


    if (type === 3 && /\S/.test(node.nodeValue)) {
      return splitWordsAndChars(node, settings);
    } // B) ELSE `node` is an 'Element'
    //    Iterate through its child nodes, calling the `split` function
    //    recursively for each child node.


    const childNodes = toArray(node.childNodes);

    if (childNodes.length) {
      set(node, 'isSplit', true); // we need to set a few styles on nested html elements

      if (!get(node).isRoot) {
        node.style.display = 'inline-block';
        node.style.position = 'relative'; // To maintain original spacing around nested elements when we are
        // splitting text into lines, we need to check if the element should
        // have a space before and after, and store that value for later.
        // Note: this was necessary to maintain the correct spacing when nested
        // elements do not align with word boundaries. For example, a nested
        // element only wraps part of a word.

        const nextSibling = node.nextSibling;
        const prevSibling = node.previousSibling;
        const text = node.textContent || '';
        const textAfter = nextSibling ? nextSibling.textContent : ' ';
        const textBefore = prevSibling ? prevSibling.textContent : ' ';
        set(node, {
          isWordEnd: /\s$/.test(text) || /^\s/.test(textAfter),
          isWordStart: /^\s/.test(text) || /\s$/.test(textBefore)
        });
      }
    } // Iterate through child nodes, calling `split` recursively
    // Returns an object containing all split words and chars


    return childNodes.reduce((result, child) => {
      const {
        words,
        chars
      } = split(child, settings);
      return {
        words: [...result.words, ...words],
        chars: [...result.chars, ...chars]
      };
    }, wordsAndChars);
  }

  /**
   * Gets the height and position of an element relative to offset parent.
   * Should be equivalent to offsetTop and offsetHeight, but with sub-pixel
   * precision.
   *
   * TODO needs work
   */
  function getPosition(node, isWord, settings, scrollPos) {
    if (!settings.absolute) {
      return {
        top: isWord ? node.offsetTop : null
      };
    }

    const parent = node.offsetParent;
    const [scrollX, scrollY] = scrollPos;
    let parentX = 0;
    let parentY = 0;

    if (parent && parent !== document.body) {
      const parentRect = parent.getBoundingClientRect();
      parentX = parentRect.x + scrollX;
      parentY = parentRect.y + scrollY;
    }

    const {
      width,
      height,
      x,
      y
    } = node.getBoundingClientRect();
    const top = y + scrollY - parentY;
    const left = x + scrollX - parentX;
    return {
      width,
      height,
      top,
      left
    };
  }

  /**
   * Recursively "un-splits" text into words.
   * This is used when splitting text into lines but not words.
   * We initially split the text into words so we can maintain the correct line
   * breaks. Once text has been split into lines, we "un-split" the words...
   * @param {Element}
   * @return {void}
   */

  function unSplitWords(element) {
    if (!get(element).isWord) {
      toArray(element.children).forEach(child => unSplitWords(child));
    } else {
      remove(element);
      element.replaceWith(...element.childNodes);
    }
  }

  const createFragment = () => document.createDocumentFragment();

  function repositionAfterSplit(element, settings, scrollPos) {
    const types = parseTypes(settings.types);
    const TAG_NAME = settings.tagName;
    const nodes = element.getElementsByTagName('*');
    const wordsInEachLine = [];
    let wordsInCurrentLine = [];
    let lineOffsetY = null;
    let elementHeight;
    let elementWidth;
    let contentBox;
    let lines = [];
    /**------------------------------------------------
     ** GET STYLES AND POSITIONS
     **-----------------------------------------------*/
    // There is no built-in way to detect natural line breaks in text (when a
    // block of text wraps to fit its container). To split text into lines, we
    // have to detect line breaks by checking the top offset of words. This is
    // why text was split into words first. To apply absolute
    // positioning, its also necessary to record the size and position of every
    // split node (lines, words, characters).
    // To consolidate DOM getting/settings, this is all done at the same time,
    // before actually splitting text into lines, which involves restructuring
    // the DOM again.
    // Cache the element's parent and next sibling (for DOM removal).

    const parent = element.parentElement;
    const nextSibling = element.nextElementSibling; // a wrapper for the new HTML structure

    const splitText = createFragment(); // get the computed style object for the element

    const cs = window.getComputedStyle(element);
    const align = cs.textAlign;
    const fontSize = parseFloat(cs.fontSize);
    const lineThreshold = fontSize * 0.2; // IF using absolute position...

    if (settings.absolute) {
      // Let contentBox be an object containing the width and offset position of
      // the element's content box (the area inside padding box). This is needed
      // (for absolute positioning) to set the width and position of line
      // elements, which have not been created yet.
      contentBox = {
        left: element.offsetLeft,
        top: element.offsetTop,
        width: element.offsetWidth
      }; // Let elementWidth and elementHeight be the actual width/height of the
      // element. Also check if the element has inline height or width styles
      // already set. If it does, cache those values for later.

      elementWidth = element.offsetWidth;
      elementHeight = element.offsetHeight; // Store the original inline height and width of the element

      set(element, {
        cssWidth: element.style.width,
        cssHeight: element.style.height
      });
    } // Iterate over every node in the target element


    toArray(nodes).forEach(node => {
      // node is a word element or custom html element
      const isWordLike = node.parentElement === element; // TODO needs work
      // Get te size and position of split text nodes

      const {
        width,
        height,
        top,
        left
      } = getPosition(node, isWordLike, settings, scrollPos); // If element is a `<br>` tag return here

      if (/^br$/i.test(node.nodeName)) return;

      if (types.lines && isWordLike) {
        // We compare the top offset of the current word to the top offset of
        // previous words on the current line. If the difference is greater than
        // our defined threshold (20%), we assume this word is on a new line.
        if (lineOffsetY === null || top - lineOffsetY >= lineThreshold) {
          lineOffsetY = top;
          wordsInEachLine.push(wordsInCurrentLine = []);
        } // Add the current word node to the line array


        wordsInCurrentLine.push(node);
      } // END IF


      if (settings.absolute) {
        // Store the size and position split text nodes
        set(node, {
          top,
          left,
          width,
          height
        });
      }
    }); // END LOOP
    // Remove the element from the DOM

    if (parent) {
      parent.removeChild(element);
    }
    /**------------------------------------------------
     ** SPLIT LINES
     **-----------------------------------------------*/


    if (types.lines) {
      // Iterate over lines of text (see 11 b)
      // Let `line` be the array of words in the current line.
      // Return an array of the wrapped line elements (lineElements)
      lines = wordsInEachLine.map(wordsInThisLine => {
        // Create an element to wrap the current line.
        const lineElement = createElement(TAG_NAME, {
          class: `${settings.splitClass} ${settings.lineClass}`,
          style: `display: block; text-align: ${align}; width: 100%;`
        });
        set(lineElement, 'isLine', true);
        const lineDimensions = {
          height: 0,
          top: 1e4
        }; // Append the `lineElement` to `container`

        splitText.appendChild(lineElement); // Iterate over the word-level elements in the current line.
        // Note: wordOrElement can either be a word node or nested element

        wordsInThisLine.forEach((wordOrElement, idx, arr) => {
          const {
            isWordEnd,
            top,
            height
          } = get(wordOrElement);
          const next = arr[idx + 1]; // Determine line height / y-position
          // we use the height and offsetTop of the words which we already
          // recorded. Because custom nested elements could have their own
          // styles, the words on a line may not all be the same height or
          // y position. So we take the greatest height / y - offset of the
          // words on this line.

          lineDimensions.height = Math.max(lineDimensions.height, height);
          lineDimensions.top = Math.min(lineDimensions.top, top); // append the current word/element

          lineElement.appendChild(wordOrElement); // Determine if there should space after the current element...
          // If this is not the last word on the current line.
          // TODO - logic for handing spacing can be improved

          if (isWordEnd && get(next).isWordStart) {
            lineElement.append(' ');
          }
        }); // END LOOP

        if (settings.absolute) {
          set(lineElement, {
            height: lineDimensions.height,
            top: lineDimensions.top
          });
        }

        return lineElement;
      }); // END LOOP

      if (!types.words) {
        unSplitWords(splitText);
      } // 10. Insert the new container


      element.replaceChildren(splitText);
    }
    /**------------------------------------------------
     **  SET ABSOLUTE POSITION
     **-----------------------------------------------*/
    // Apply absolute positioning to all child elements of the target element.
    // This includes split lines, words, chars, and custom HTML elements that were
    // included by the user. The size and position of child elements has already
    // been recorded before splitting text into lines.


    if (settings.absolute) {
      // Set the width/height of the parent element so it does not collapse
      // when its children are set to absolute position.
      element.style.width = `${element.style.width || elementWidth}px`;
      element.style.height = `${elementHeight}px`; // Iterate over all child elements

      toArray(nodes).forEach(node => {
        const {
          isLine,
          top,
          left,
          width,
          height
        } = get(node);
        const parentData = get(node.parentElement);
        const isChildOfLineNode = !isLine && parentData.isLine; // Set the top position of the current node.
        // -> If `node` a line element, we use the top offset of its first child
        // -> If `node` the child of line element, then its top offset is zero

        node.style.top = `${isChildOfLineNode ? top - parentData.top : top}px`; // Set the left position of the current node.
        // -> IF `node` is a line element, this is equal to the position left of
        //    the content box of the parent element
        // -> IF `node` is the child of a line element, the value has to adjusted
        //    so its relative to the line element

        node.style.left = isLine ? `${contentBox.left}px` : `${left - (isChildOfLineNode ? contentBox.left : 0)}px`; // Set the height of the current node to the cached value.

        node.style.height = `${height}px`; //  Set the width of the current node.
        //  If its a line element, width is equal to the width of the contentBox.

        node.style.width = isLine ? `${contentBox.width}px` : `${width}px`; // Finally, set the node's position to absolute.

        node.style.position = 'absolute';
      });
    } // end if;
    // 14. Re-attach the element to the DOM


    if (parent) {
      if (nextSibling) parent.insertBefore(element, nextSibling);else parent.appendChild(element);
    }

    return lines;
  }

  let _defaults = extend(defaults, {});

  class SplitType {
    /**
     * The internal data store
     */
    static get data() {
      return cache;
    }
    /**
     * The default settings for all splitType instances
     * @static
     */


    static get defaults() {
      return _defaults;
    }
    /**
     * Sets the default settings for all SplitType instances.
     *
     * Setting `SplitType.defaults` to an object will merge that object with the
     * existing defaults.
     *
     * @param {Object} settings an object containing the settings to override
     * @deprecated
     * @static
     * @example
     * SplitType.defaults = { "position": "absolute" }
     */


    static set defaults(options) {
      _defaults = extend(_defaults, parseSettings(options));
    }
    /**
     * Sets the default settings for all SplitType instances.
     * The provided object will be merged with the existing defaults objects.
     *
     * @param {Object} settings an object containing the settings to override
     * @returns {Object} the new default settings
     * @public
     * @static
     * @example
     * SplitType.setDefaults({ "position": "absolute" })
     */


    static setDefaults(options) {
      _defaults = extend(_defaults, parseSettings(options));
      return defaults;
    }
    /**
     * Revert target elements to their original html content
     * Has no effect on that
     *
     * @param {any} elements The target elements to revert. One of:
     *  - {string} A css selector
     *  - {HTMLElement} A single element
     * -  {NodeList} A NodeList or collection
     *  - {HTMLElement[]} An array of Elements
     * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
     * @static
     */


    static revert(elements) {
      getTargetElements(elements).forEach(element => {
        const {
          isSplit,
          html,
          cssWidth,
          cssHeight
        } = get(element);

        if (isSplit) {
          element.innerHTML = html;
          element.style.width = cssWidth || '';
          element.style.height = cssHeight || '';
          remove(element);
        }
      });
    }
    /**
     * Creates a new SplitType instance
     * This static method provides a way to create a `SplitType` instance without
     * using the `new` keyword.
     *
     * @param {any} target The target elements to split. One of:
     *  - {string} A css selector
     *  - {HTMLElement} A single element
     * -  {NodeList} A NodeList or collection
     *  - {HTMLElement[]} An array of Elements
     * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
     * @param {Object} [options] Settings for the SplitType instance
     * @return {SplitType} the SplitType instance
     * @static
     */


    static create(target, options) {
      return new SplitType(target, options);
    }
    /**
     * Creates a new `SplitType` instance
     *
     * @param {any} elements The target elements to split. One of:
     *  - {string} A css selector
     *  - {HTMLElement} A single element
     * -  {NodeList} A NodeList or collection
     *  - {HTMLElement[]} An array of Elements
     * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
     * @param {Object} [options] Settings for the SplitType instance
     */


    constructor(elements, options) {
      this.isSplit = false;
      this.settings = extend(_defaults, parseSettings(options));
      this.elements = getTargetElements(elements); // Start the split process

      this.split();
    }
    /**
     * Splits the text in all target elements. This method is called
     * automatically when a new SplitType instance is created. It can also be
     * called manually to re-split text with new options.
     * @param {Object} options
     * @public
     */


    split(options) {
      // Revert target elements (if they are already split)
      // Note: revert was already called once in the constructor. However, we
      // need to call it again here so text is reverted when the user manually
      // calls the `split` method to re-split text.
      this.revert(); // Store the original html content of each target element

      this.elements.forEach(element => {
        set(element, 'html', element.innerHTML);
      }); // Create arrays to hold the split lines, words, and characters

      this.lines = [];
      this.words = [];
      this.chars = []; // cache vertical scroll position before splitting

      const scrollPos = [window.pageXOffset, window.pageYOffset]; // If new options were passed into the `split()` method, update settings

      if (options !== undefined) {
        this.settings = extend(this.settings, parseSettings(options));
      }

      const types = parseTypes(this.settings.types); // If the `types` option is set to an empty array, text will not be split.
      // @example new SplitType('#target', { types: [] })

      if (types.none) {
        return;
      } // Split text in each target element


      this.elements.forEach(element => {
        // Add the split text nodes from this element to the arrays of all split
        // text nodes for this instance.
        set(element, 'isRoot', true);
        const {
          words,
          chars
        } = split(element, this.settings);
        this.words = [...this.words, ...words];
        this.chars = [...this.chars, ...chars];
      });
      this.elements.forEach(element => {
        if (types.lines || this.settings.absolute) {
          const lines = repositionAfterSplit(element, this.settings, scrollPos);
          this.lines = [...this.lines, ...lines];
        }
      }); // Set isSplit to true for the SplitType instance

      this.isSplit = true; // Set scroll position to cached value.

      window.scrollTo(scrollPos[0], scrollPos[1]); // Clean up stored data

      cleanup();
    }
    /**
     * Reverts target element(s) back to their original html content
     * Deletes all stored data associated with the target elements
     * Resets the properties on the splitType instance
     *
     * @public
     */


    revert() {
      if (this.isSplit) {
        // Reset instance properties if necessary
        this.lines = null;
        this.words = null;
        this.chars = null;
        this.isSplit = false;
      }

      SplitType.revert(this.elements);
    }

  }

  return SplitType;

}));
