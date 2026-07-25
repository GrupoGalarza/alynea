import{r as v}from"./index.DBy5LfQW.js";var l={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x;function R(){if(x)return s;x=1;var i=Symbol.for("react.transitional.element"),u=Symbol.for("react.fragment");function o(a,e,t){var n=null;if(t!==void 0&&(n=""+t),e.key!==void 0&&(n=""+e.key),"key"in e){t={};for(var r in e)r!=="key"&&(t[r]=e[r])}else t=e;return e=t.ref,{$$typeof:i,type:a,key:n,ref:e!==void 0?e:null,props:t}}return s.Fragment=u,s.jsx=o,s.jsxs=o,s}var c;function p(){return c||(c=1,l.exports=R()),l.exports}var m=p();function M({children:i,strength:u=.3}){const o=v.useRef(null);function a(t){const n=o.current;if(!n)return;const r=n.getBoundingClientRect(),d=t.clientX-(r.left+r.width/2),f=t.clientY-(r.top+r.height/2);n.style.transform=`translate(${(d*u).toFixed(1)}px, ${(f*u).toFixed(1)}px)`}function e(){const t=o.current;t&&(t.style.transform="translate(0, 0)")}return m.jsx("div",{ref:o,className:"magnet",onMouseMove:a,onMouseLeave:e,children:i})}export{M as default};
