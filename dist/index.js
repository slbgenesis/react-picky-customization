'use strict';
function _interopDefault(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
var React = require('react'),
  React__default = _interopDefault(React);
require('prop-types');
var debounce = function(r, n) {
  var l = null;
  return function() {
    clearTimeout(l);
    var e = arguments,
      t = this;
    l = setTimeout(function() {
      r.apply(t, e);
    }, n);
  };
};
function includes(e, t, r) {
  var searchByStartLetter = new RegExp('\\b' + String(t), 'i');
  var result = String(e).search(searchByStartLetter); // return r?(-1<(((String(e).indexOf(String(t)))==0)?(String(e).indexOf(String(t))):-2)):
  // (-1<(((String(e).toLowerCase().indexOf(String(t).toLowerCase()))==0)?(String(e).toLowerCase().indexOf(String(t).toLowerCase())):-2))
  return r ? -1 < result : -1 < result;
}
function _typeof(e) {
  return (_typeof =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(e) {
          return typeof e;
        }
      : function(e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        })(e);
}
var isDataObject = function(e, t, r) {
    return (
      'object' === _typeof(e) && e.hasOwnProperty(t) && e.hasOwnProperty(r)
    );
  },
  generateGuid = function() {
    function e() {
      return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1);
    }
    return (
      e() + e() + '-' + e() + '-' + e() + '-' + e() + '-' + e() + e() + e()
    );
  },
  hasItem = function(e, t, r, n, l) {
    if (!e || !t) return !1;
    if (Array.isArray(e)) {
      if (isDataObject(t, r, n)) {
        var o = e.findIndex(function(e) {
          return e[r] === t[r];
        });
        return l ? o : -1 < o;
      }
      var i = e.indexOf(t);
      return l ? i : -1 < i;
    }
    return isDataObject(t, r, n) ? e[r] === t[r] : e === t;
  },
  hasItemIndex = function(e, t, r, n) {
    return hasItem(e, t, r, n, !0);
  },
  keyExtractor = function(e, t, r) {
    return isDataObject(e, t, r) ? e[t] : e;
  },
  sortCollection = function(e, r) {
    return r
      ? e.sort(function(e, t) {
          return e[r] < t[r] ? -1 : 1;
        })
      : e.sort(function(e, t) {
          return e < t ? -1 : 1;
        });
  };
function arraysEqual(e, t) {
  if (e.length !== t.length) return !1;
  for (var r = e.length; r; ) {
    if (e[r] !== t[r]) return !1;
    r--;
  }
  return !0;
}
function split(e) {
  var t = 1,
    r = '',
    n = e.split('%'),
    l = n.length;
  0 < l && (r += n[0]);
  for (var o = 1; o < l; o++) {
    if ('s' === n[o][0] || 'd' === n[o][0]) {
      var i = arguments[t++];
      r += 'd' === n[o][0] ? Math.floor(i) : i;
    } else n[o][0] ? (r += '%' + n[o][0]) : (r += '%' + n[++o][0]);
    r += n[o].substring(1);
  }
  return r;
}
var regex = /%[sdj]/;
function format(e) {
  return regex.test(e)
    ? split.apply(null, arguments)
    : Array.from(arguments).join(' ');
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function is(e, t) {
  return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t;
}
function shallowEqual(e, t) {
  if (is(e, t)) return !0;
  if ('object' != typeof e || null === e || 'object' != typeof t || null === t)
    return !1;
  var r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (var l = 0; l < r.length; l++)
    if (!hasOwnProperty.call(t, r[l]) || !is(e[r[l]], t[r[l]])) return !1;
  return !0;
}
var shallowEqual_1 = shallowEqual;
function _inheritsLoose(e, t) {
  (e.prototype = Object.create(t.prototype)),
    ((e.prototype.constructor = e).__proto__ = t);
}
function unwrapExports(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
function createCommonjsModule(e, t) {
  return e((t = { exports: {} }), t.exports), t.exports;
}
var lib = createCommonjsModule(function(e, t) {
  Object.defineProperty(t, '__esModule', { value: !0 });
  t.createChangeEmitter = function() {
    var r = [],
      n = r;
    function l() {
      n === r && (n = r.slice());
    }
    return {
      listen: function(t) {
        if ('function' != typeof t)
          throw new Error('Expected listener to be a function.');
        var r = !0;
        return (
          l(),
          n.push(t),
          function() {
            if (r) {
              (r = !1), l();
              var e = n.indexOf(t);
              n.splice(e, 1);
            }
          }
        );
      },
      emit: function() {
        for (var e = (r = n), t = 0; t < e.length; t++)
          e[t].apply(e, arguments);
      },
    };
  };
});
unwrapExports(lib);
var root,
  lib_1 = lib.createChangeEmitter;
function symbolObservablePonyfill(e) {
  var t,
    r = e.Symbol;
  return (
    'function' == typeof r
      ? r.observable
        ? (t = r.observable)
        : ((t = r('observable')), (r.observable = t))
      : (t = '@@observable'),
    t
  );
}
var result = symbolObservablePonyfill(
    (root =
      'undefined' != typeof self
        ? self
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof module
        ? module
        : Function('return this')())
  ),
  setStatic = function(t, r) {
    return function(e) {
      return (e[t] = r), e;
    };
  },
  setDisplayName = function(e) {
    return setStatic('displayName', e);
  },
  getDisplayName = function(e) {
    return 'string' == typeof e
      ? e
      : e
      ? e.displayName || e.name || 'Component'
      : void 0;
  },
  wrapDisplayName = function(e, t) {
    return t + '(' + getDisplayName(e) + ')';
  },
  pick = function(e, t) {
    for (var r = {}, n = 0; n < t.length; n++) {
      var l = t[n];
      e.hasOwnProperty(l) && (r[l] = e[l]);
    }
    return r;
  },
  shouldUpdate = function(l) {
    return function(e) {
      var n = React.createFactory(e),
        t = (function(e) {
          function t() {
            return e.apply(this, arguments) || this;
          }
          _inheritsLoose(t, e);
          var r = t.prototype;
          return (
            (r.shouldComponentUpdate = function(e) {
              return l(this.props, e);
            }),
            (r.render = function() {
              return n(this.props);
            }),
            t
          );
        })(React.Component);
      return 'production' !== process.env.NODE_ENV
        ? setDisplayName(wrapDisplayName(e, 'shouldUpdate'))(t)
        : t;
    };
  },
  onlyUpdateForKeys = function(r) {
    var t = shouldUpdate(function(e, t) {
      return !shallowEqual_1(pick(t, r), pick(e, r));
    });
    return 'production' !== process.env.NODE_ENV
      ? function(e) {
          return setDisplayName(wrapDisplayName(e, 'onlyUpdateForKeys'))(t(e));
        }
      : t;
  },
  isEmptyValue = function(e) {
    return null == e || (Array.isArray(e) && !e.length);
  },
  Placeholder = function(e) {
    var t = e.placeholder,
      r = e.value,
      n = e.numberDisplayed,
      l = e.multiple,
      o = e.valueKey,
      i = e.labelKey,
      a = e.manySelectedPlaceholder,
      s = e.allSelectedPlaceholder,
      u = e.allSelected,
      c = '';
    if (isEmptyValue(r)) c = t;
    else if (Array.isArray(r) && l)
      r.length <= n
        ? (c = r
            .map(function(e) {
              return isDataObject(e, o, i) ? e[i] : e;
            })
            .join(', '))
        : a && !u
        ? (c = includes(a, '%s') ? format(a, r.length) : a)
        : u && s && (c = includes(s, '%s') ? format(s, r.length) : s);
    else {
      var p = Array.isArray(r) ? r[0] : r;
      c = isDataObject(p, o, i) ? p[i] : p;
    }
    return React__default.createElement(
      'span',
      { className: 'picky__placeholder' },
      c
    );
  };
Placeholder.defaultProps = {
  placeholder: 'None selected',
  allSelectedPlaceholder: '%s selected',
  manySelectedPlaceholder: '%s selected',
  allSelected: !1,
};
var Placeholder$1 = onlyUpdateForKeys([
  'multiple',
  'value',
  'numberDisplayed',
  'allSelected',
  'allSelectedPlaceholder',
])(Placeholder);
function _typeof$1(e) {
  return (_typeof$1 =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(e) {
          return typeof e;
        }
      : function(e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        })(e);
}
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function _createClass(e, t, r) {
  return (
    t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e
  );
}
function _possibleConstructorReturn(e, t) {
  return !t || ('object' !== _typeof$1(t) && 'function' != typeof t)
    ? _assertThisInitialized(e)
    : t;
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function _getPrototypeOf(e) {
  return (_getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
}
function _inherits(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError('Super expression must either be null or a function');
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    t && _setPrototypeOf(e, t);
}
function _setPrototypeOf(e, t) {
  return (_setPrototypeOf =
    Object.setPrototypeOf ||
    function(e, t) {
      return (e.__proto__ = t), e;
    })(e, t);
}
var Filter = (function(e) {
  function t() {
    return (
      _classCallCheck(this, t),
      _possibleConstructorReturn(
        this,
        _getPrototypeOf(t).apply(this, arguments)
      )
    );
  }
  return (
    _inherits(t, React.Component),
    _createClass(t, [
      {
        key: 'shouldComponentUpdate',
        value: function(e) {
          return (
            this.props.placeholder !== e.placeholder ||
            this.props.tabIndex !== e.tabIndex
          );
        },
      },
      {
        key: 'render',
        value: function() {
          var t = this;
          return React__default.createElement(
            'div',
            { className: 'picky__filter' },
            React__default.createElement('input', {
              type: 'text',
              ref: function(e) {
                return (t.filterInput = e);
              },
              className: 'picky__filter__input',
              placeholder: this.props.placeholder,
              tabIndex: this.props.tabIndex,
              'aria-label': 'filter options',
              onChange: function(e) {
                return t.props.onFilterChange(e.target.value);
              },
            })
          );
        },
      },
    ]),
    t
  );
})();
Filter.defaultProps = { placeholder: 'Filter...' };
var Option = function(e) {
    var t = e.id,
      r = e.item,
      n = e.isSelected,
      l = e.labelKey,
      o = e.valueKey,
      i = e.selectValue,
      a = e.style,
      s = e.multiple,
      u = e.tabIndex,
      c = e.disabled,
      p = n ? 'option selected' : 'option',
      d = isDataObject(r, l, o) ? r[l] : r,
      f = s ? 'checkbox' : 'radio';
    return React__default.createElement(
      'div',
      {
        tabIndex: u,
        id: t,
        role: 'option',
        style: a,
        'data-selected': n ? 'selected' : '',
        'aria-selected': n,
        className: d!=="Clear all "?p:"Clearall",
        onClick: function() {
          return !c && i(r);
        },
        onKeyPress: function(e) {
          e.preventDefault(), c || i(r);
        },
      },
      React__default.createElement('input', {
        type: f,
        readOnly: !0,
        tabIndex: -1,
        disabled: c,
        checked: n,
        'aria-label': d,
      }),
      d
    );
  },
  Option$1 = onlyUpdateForKeys([
    'multiple',
    'isSelected',
    'id',
    'item',
    'tabIndex',
  ])(Option);
function SelectAll(e) {
  var t = e.tabIndex,
    r = e.disabled,
    n = e.allSelected,
    l = e.id,
    o = e.selectAllText,
    i = e.toggleSelectAll;
  return e.visible
    ? React__default.createElement(
        'div',
        {
          tabIndex: t,
          role: 'option',
          id: l + '-option-selectall',
          'data-selectall': 'true',
          'aria-selected': n,
          className: n ? 'option selected' : 'option',
          onClick: i,
          disabled: r,
          onKeyPress: i,
        },
        React__default.createElement('input', {
          type: 'checkbox',
          readOnly: !0,
          tabIndex: -1,
          checked: n,
          'aria-label': 'select all',
          disabled: r,
        }),
        React__default.createElement('span', null, o)
      )
    : null;
}
var SelectAll$1 = onlyUpdateForKeys([
  'tabIndex',
  'disabled',
  'allSelected',
  'selectAllText',
  'visible',
])(SelectAll);
function _extends() {
  return (_extends =
    Object.assign ||
    function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r)
          Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
      return e;
    }).apply(this, arguments);
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var r,
    n,
    l = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (n = 0; n < o.length; n++)
      (r = o[n]),
        0 <= t.indexOf(r) ||
          (Object.prototype.propertyIsEnumerable.call(e, r) && (l[r] = e[r]));
  }
  return l;
}
function _objectWithoutPropertiesLoose(e, t) {
  if (null == e) return {};
  var r,
    n,
    l = {},
    o = Object.keys(e);
  for (n = 0; n < o.length; n++) (r = o[n]), 0 <= t.indexOf(r) || (l[r] = e[r]);
  return l;
}
function Button(e) {
  var t = e.id,
    r = e.disabled,
    n = e.onClick,
    l = e.children,
    o = e.className,
    i = _objectWithoutProperties(e, [
      'id',
      'disabled',
      'onClick',
      'children',
      'className',
    ]),
    a = ''.concat(t, '__button'),
    s = ['picky__input', r ? 'picky__input--disabled' : '', o].join(' ');
  return React__default.createElement(
    'button',
    _extends({ id: a, type: 'button', className: s, onClick: n }, i),
    l
  );
}
Button.displayName = 'Button';
var Button$1 = onlyUpdateForKeys(['disabled', 'children'])(Button);
function _typeof$2(e) {
  return (_typeof$2 =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(e) {
          return typeof e;
        }
      : function(e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        })(e);
}
function _extends$1() {
  return (_extends$1 =
    Object.assign ||
    function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r)
          Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
      return e;
    }).apply(this, arguments);
}
function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {},
      n = Object.keys(r);
    'function' == typeof Object.getOwnPropertySymbols &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })
      )),
      n.forEach(function(e) {
        _defineProperty(t, e, r[e]);
      });
  }
  return t;
}
function _defineProperty(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function _toConsumableArray(e) {
  return _arrayWithoutHoles(e) || _iterableToArray(e) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}
function _iterableToArray(e) {
  if (
    Symbol.iterator in Object(e) ||
    '[object Arguments]' === Object.prototype.toString.call(e)
  )
    return Array.from(e);
}
function _arrayWithoutHoles(e) {
  if (Array.isArray(e)) {
    for (var t = 0, r = new Array(e.length); t < e.length; t++) r[t] = e[t];
    return r;
  }
}
function _classCallCheck$1(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function _defineProperties$1(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function _createClass$1(e, t, r) {
  return (
    t && _defineProperties$1(e.prototype, t), r && _defineProperties$1(e, r), e
  );
}
function _possibleConstructorReturn$1(e, t) {
  return !t || ('object' !== _typeof$2(t) && 'function' != typeof t)
    ? _assertThisInitialized$1(e)
    : t;
}
function _getPrototypeOf$1(e) {
  return (_getPrototypeOf$1 = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
}
function _assertThisInitialized$1(e) {
  console.log('testt' + e);
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );

  return e;
}
function _inherits$1(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError('Super expression must either be null or a function');
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    t && _setPrototypeOf$1(e, t);
}
function _setPrototypeOf$1(e, t) {
  return (_setPrototypeOf$1 =
    Object.setPrototypeOf ||
    function(e, t) {
      return (e.__proto__ = t), e;
    })(e, t);
}
var Picky = (function(e) {
  function r(e) {
    var t;
    return (
      _classCallCheck$1(this, r),
      ((t = _possibleConstructorReturn$1(
        this,
        _getPrototypeOf$1(r).call(this, e)
      )).state = {
        selectedValue: e.value || (e.multiple ? [] : null),
        open: e.open,
        filtered: !1,
        filteredOptions: [],
        id: generateGuid(),
        allSelected: !1,
      }),
      (t.toggleDropDown = t.toggleDropDown.bind(_assertThisInitialized$1(t))),
      (t.toggleSelectAll = t.toggleSelectAll.bind(_assertThisInitialized$1(t))),
      (t.onFilterChange = t.onFilterChange.bind(_assertThisInitialized$1(t))),
      (t.selectValue = t.selectValue.bind(_assertThisInitialized$1(t))),
      (t.allSelected = t.allSelected.bind(_assertThisInitialized$1(t))),
      (t.handleOutsideClick = t.handleOutsideClick.bind(
        _assertThisInitialized$1(t)
      )),
      (t.isItemSelected = t.isItemSelected.bind(_assertThisInitialized$1(t))),
      (t.focusFilterInput = t.focusFilterInput.bind(
        _assertThisInitialized$1(t)
      )),
      (t.getValue = t.getValue.bind(_assertThisInitialized$1(t))),
      t
    );
  }
  return (
    _inherits$1(r, React__default.PureComponent),
    _createClass$1(r, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function() {
          this.setState({ allSelected: this.allSelected() });
        },
      },
      {
        key: 'componentDidMount',
        value: function() {
          this.focusFilterInput(this.state.open);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function() {
          document.removeEventListener('click', this.handleOutsideClick, !1);
        },
      },
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function(e) {
          if (
            this.props.options !== e.options ||
            this.props.value !== e.value
          ) {
            var t = Array.isArray(e.value)
                ? arraysEqual(e.value, this.props.value)
                : e.value === this.props.value,
              r = arraysEqual(e.options, this.props.options);
            this.setState({
              allSelected:
                t && r
                  ? this.allSelected()
                  : this.allSelected(e.value, e.options),
            });
          }
        },
      },
      {
        key: 'selectValue',
        value: function(e) {
          var t = this,
            r = this.props.value;
          if (this.props.multiple && Array.isArray(r)) {
            var n = hasItemIndex(
                r,
                e,
                this.props.valueKey,
                this.props.labelKey
              ),
              l = [];
            (l =
              -1 < n
                ? [].concat(
                    _toConsumableArray(r.slice(0, n)),
                    _toConsumableArray(r.slice(n + 1))
                  )
                : [].concat(_toConsumableArray(this.props.value), [e])),
              this.setState({ allSelected: this.allSelected(l) }, function() {
                t.props.onChange(l);
              });
          } else this.props.onChange(e);
        },
      },
      {
        key: 'getValue',
        value: function(e) {
          return void 0 !== this.props.valueKey ? e[this.props.valueKey] : e;
        },
      },
      {
        key: 'allSelected',
        value: function(e, t) {
          var r = this.props,
            n = r.value,
            l = r.options,
            o = e || n,
            i = t || l;
          if (i && 0 === i.length) return !1;
          var a = i.map(this.getValue),
            s = Array.isArray(o) ? o.map(this.getValue) : [];
          return arraysEqual(sortCollection(s), sortCollection(a));
        },
      },
      {
        key: 'toggleSelectAll',
        value: function() {
          var t = this;
          this.props.disabled ||
            this.setState(
              function(e) {
                return _objectSpread({}, e, {
                  allSelected: !t.state.allSelected,
                });
              },
              function() {
                t.state.allSelected
                  ? t.props.onChange(t.props.options)
                  : t.props.onChange([]);
              }
            );
        },
      },
      {
        key: 'isItemSelected',
        value: function(e) {
          return hasItem(
            this.props.value,
            e,
            this.props.valueKey,
            this.props.labelKey
          );
        },
      },
      {
        key: 'renderOptions',
        value: function() {
          var l = this,
            e = this.state.filtered
              ? this.state.filteredOptions
              : this.props.options,
            t = this.props,
            o = t.labelKey,
            i = t.valueKey,
            a = t.multiple,
            s = t.render,
            u = t.tabIndex,
            r = t.renderList,
            c = t.disabled;
          return r
            ? r({
                items: e,
                selected: this.props.value,
                multiple: a,
                tabIndex: u,
                getIsSelected: this.isItemSelected,
                selectValue: this.selectValue,
                disabled: c,
              })
            : e.map(function(e, t) {
                var r = keyExtractor(e, i, o),
                  n = l.isItemSelected(e);
                return 'function' == typeof s
                  ? s({
                      index: t,
                      item: e,
                      isSelected: n,
                      selectValue: l.selectValue,
                      labelKey: o,
                      valueKey: i,
                      multiple: a,
                      disabled: c,
                    })
                  : React__default.createElement(Option$1, {
                      key: r,
                      item: e,
                      isSelected: n,
                      selectValue: l.selectValue,
                      labelKey: o,
                      valueKey: i,
                      multiple: a,
                      tabIndex: u,
                      disabled: c,
                      id: l.state.id + '-option-' + t,
                    });
              });
        },
      },
      {
        key: 'onFilterChange',
        value: function(t) {
          var r = this;
          if (
            (this.props.getFilterValue && this.props.getFilterValue(t),
            !t.trim())
          )
            return this.setState({ filtered: !1, filteredOptions: [] });
          var n = isDataObject(
              this.props.options && this.props.options[0],
              this.props.valueKey,
              this.props.labelKey
            ),
            e = this.props.options.filter(function(e) {
              return includes(
                n ? e[r.props.labelKey] : e,
                t,
                r.props.caseSensitiveFilter
              );
            });
          this.setState({ filtered: !0, filteredOptions: e }, function() {
            r.props.onFiltered && r.props.onFiltered(e);
          });
        },
      },
      {
        key: 'handleOutsideClick',
        value: function(e) {
          var t = this.props.keepOpen || this.props.multiple;
          (this.node && this.node.contains(e.target) && t) ||
            (this.filter &&
              this.filter.filterInput &&
              this.filter.filterInput.contains(e.target)) ||
            this.toggleDropDown();
        },
      },
      {
        key: 'focusFilterInput',
        value: function(e) {
          e &&
            this.props.defaultFocusFilter &&
            this.filter &&
            this.filter.filterInput &&
            this.filter.filterInput.focus();
        },
      },
      {
        key: 'toggleDropDown',
        value: function() {
          var t = this;
          this.state.open
            ? document.removeEventListener('click', this.handleOutsideClick, !1)
            : document.addEventListener('click', this.handleOutsideClick, !1),
            this.setState(
              function(e) {
                return _objectSpread({}, e, { open: !e.open });
              },
              function() {
                var e = t.state.open;
                t.focusFilterInput(e),
                  e && t.props.onOpen
                    ? t.props.onOpen()
                    : !e && t.props.onClose && t.props.onClose();
              }
            );
        },
      },
      {
        key: 'render',
        value: function() {
          var t = this,
            e = this.props,
            r = e.className,
            n = e.placeholder,
            l = e.value,
            o = e.multiple,
            i = e.numberDisplayed,
            a = e.includeFilter,
            s = e.valueKey,
            u = e.labelKey,
            c = e.tabIndex,
            p = e.dropdownHeight,
            d = e.renderSelectAll,
            f = e.filterPlaceholder,
            y = e.disabled,
            h = e.buttonProps,
            b = this.state.open,
            _ = '';
          b && (_ += this.state.id + '-list');
          var m = ''.concat(this.state.id, '__button'),
            v = { maxHeight: p, overflowY: 'scroll' };
          return React__default.createElement(
            'div',
            {
              ref: function(e) {
                t.node = e;
              },
              className: ['picky', r].join(' '),
              id: this.state.id,
              role: 'combobox',
              'aria-controls': m,
              'aria-expanded': b,
              'aria-haspopup': b,
              'aria-owns': _,
              tabIndex: c,
            },
            React__default.createElement(
              Button$1,
              _extends$1(
                {
                  id: ''.concat(this.state.id, '__button'),
                  disabled: y,
                  onClick: this.toggleDropDown,
                },
                h
              ),
              React__default.createElement(Placeholder$1, {
                allSelected: this.state.allSelected,
                placeholder: n,
                manySelectedPlaceholder: this.props.manySelectedPlaceholder,
                allSelectedPlaceholder: this.props.allSelectedPlaceholder,
                value: l,
                multiple: o,
                numberDisplayed: i,
                valueKey: s,
                labelKey: u,
              })
            ),
            React__default.createElement(
              'div',
              {
                className: 'picky__dropdown',
                id: this.state.id + '-list',
                'aria-hidden': !b,
                hidden: !b,
                style: b ? v : { visibility: 'hidden' },
              },
              React__default.createElement('span', {
                className: 'fa fa-close',
                onClick:this.toggleDropDown,
                style:{
                        float: "right",
                        background:'rgb(221, 221, 221)',
                        background: "#dddddd",
                        border: "2px solid #dddddd",
                        color: "#5f7082",
                        borderRadius: "30px"
                }

              }),
              a &&
                React__default.createElement(Filter, {
                  ref: function(e) {
                    return (t.filter = e);
                  },
                  placeholder: f,
                  onFilterChange: this.filterDebounce,
                }),
                
              d
                ? d({
                    filtered: this.state.filtered,
                    allSelected: this.state.allSelected,
                    toggleSelectAll: this.toggleSelectAll,
                    tabIndex: c,
                    multiple: o,
                    disabled: y,
                  })
                : React__default.createElement(SelectAll$1, {
                    visible: this.showSelectAll,
                    tabIndex: c,
                    disabled: y,
                    allSelected: this.state.allSelected,
                    id: this.state.id,
                    selectAllText: this.props.selectAllText,
                    toggleSelectAll: this.toggleSelectAll,
                  }),
              b &&
                React__default.createElement('div', null, this.renderOptions())
            )
          );
        },
      },
      {
        key: 'filterDebounce',
        get: function() {
          var e = this.props.filterDebounce;
          return 0 < e ? debounce(this.onFilterChange, e) : this.onFilterChange;
        },
      },
      {
        key: 'showSelectAll',
        get: function() {
          var e = this.props,
            t = e.renderSelectAll,
            r = e.multiple,
            n = e.includeSelectAll;
          return !t && n && r && !this.state.filtered;
        },
      },
    ]),
    r
  );
})();
(Picky.defaultProps = {
  numberDisplayed: 3,
  options: [],
  filterDebounce: 150,
  dropdownHeight: 300,
  onChange: function() {},
  tabIndex: 0,
  keepOpen: !0,
  selectAllText: 'Select all',
}),
  Array.prototype.findIndex ||
    Object.defineProperty(Array.prototype, 'findIndex', {
      value: function(e) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var t = Object(this),
          r = t.length >>> 0;
        if ('function' != typeof e)
          throw new TypeError('predicate must be a function');
        for (var n = arguments[1], l = 0; l < r; ) {
          var o = t[l];
          if (e.call(n, o, l, t)) return l;
          l++;
        }
        return -1;
      },
    }),
  (module.exports = Picky);
