var s=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function l(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var a,f={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/a=f,function(){var t={}.hasOwnProperty;function r(){for(var n="",e=0;e<arguments.length;e++){var o=arguments[e];o&&(n=i(n,u(o)))}return n}function u(n){if(typeof n=="string"||typeof n=="number")return n;if(typeof n!="object")return"";if(Array.isArray(n))return r.apply(null,n);if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]"))return n.toString();var e="";for(var o in n)t.call(n,o)&&n[o]&&(e=i(e,o));return e}function i(n,e){return e?n?n+" "+e:n+e:n}a.exports?(r.default=r,a.exports=r):window.classNames=r}();const p=l(f.exports);export{s as a,p as c,l as g};
