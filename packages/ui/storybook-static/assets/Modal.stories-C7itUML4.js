import{r as s,j as a}from"./iframe-BXdc-fV8.js";import{u as Bt,P as _,a as Ee,d as Ft,c as Ot,b as ue,e as K,f as ye,D as _t,g as jt}from"./index-CaNmm0S7.js";import{j as v,u as le,a as Lt,B as w}from"./Button-B7D7_xWV.js";import{R as zt}from"./index-BLp4wRRv.js";import{c as tt,a as G}from"./createLucideIcon-DNeJQIBI.js";import{X as Wt}from"./x-UZvcusfn.js";import{B as Ht}from"./Badge-DGz86kPQ.js";import{A as Ce}from"./alert-circle-DXE1f9ib.js";import{S as Ut}from"./settings-CL2ww7nT.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=tt("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=tt("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);var Kt="Portal",nt=s.forwardRef((e,t)=>{var l;const{container:n,...r}=e,[o,i]=s.useState(!1);Bt(()=>i(!0),[]);const u=n||o&&((l=globalThis==null?void 0:globalThis.document)==null?void 0:l.body);return u?zt.createPortal(v.jsx(_.div,{...r,ref:t}),u):null});nt.displayName=Kt;var de="focusScope.autoFocusOnMount",fe="focusScope.autoFocusOnUnmount",ke={bubbles:!1,cancelable:!0},qt="FocusScope",rt=s.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:o,onUnmountAutoFocus:i,...u}=e,[l,p]=s.useState(null),g=Ee(o),h=Ee(i),f=s.useRef(null),b=le(t,c=>p(c)),y=s.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;s.useEffect(()=>{if(r){let c=function(M){if(y.paused||!l)return;const N=M.target;l.contains(N)?f.current=N:A(f.current,{select:!0})},d=function(M){if(y.paused||!l)return;const N=M.relatedTarget;N!==null&&(l.contains(N)||A(f.current,{select:!0}))},m=function(M){if(document.activeElement===document.body)for(const S of M)S.removedNodes.length>0&&A(l)};document.addEventListener("focusin",c),document.addEventListener("focusout",d);const x=new MutationObserver(m);return l&&x.observe(l,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",c),document.removeEventListener("focusout",d),x.disconnect()}}},[r,l,y.paused]),s.useEffect(()=>{if(l){Ae.add(y);const c=document.activeElement;if(!l.contains(c)){const m=new CustomEvent(de,ke);l.addEventListener(de,g),l.dispatchEvent(m),m.defaultPrevented||(Xt(Jt(at(l)),{select:!0}),document.activeElement===c&&A(l))}return()=>{l.removeEventListener(de,g),setTimeout(()=>{const m=new CustomEvent(fe,ke);l.addEventListener(fe,h),l.dispatchEvent(m),m.defaultPrevented||A(c??document.body,{select:!0}),l.removeEventListener(fe,h),Ae.remove(y)},0)}}},[l,g,h,y]);const E=s.useCallback(c=>{if(!n&&!r||y.paused)return;const d=c.key==="Tab"&&!c.altKey&&!c.ctrlKey&&!c.metaKey,m=document.activeElement;if(d&&m){const x=c.currentTarget,[M,N]=Yt(x);M&&N?!c.shiftKey&&m===N?(c.preventDefault(),n&&A(M,{select:!0})):c.shiftKey&&m===M&&(c.preventDefault(),n&&A(N,{select:!0})):m===x&&c.preventDefault()}},[n,r,y.paused]);return v.jsx(_.div,{tabIndex:-1,...u,ref:b,onKeyDown:E})});rt.displayName=qt;function Xt(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(A(r,{select:t}),document.activeElement!==n)return}function Yt(e){const t=at(e),n=De(t,e),r=De(t.reverse(),e);return[n,r]}function at(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const o=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||o?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function De(e,t){for(const n of e)if(!$t(n,{upTo:t}))return n}function $t(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function Zt(e){return e instanceof HTMLInputElement&&"select"in e}function A(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&Zt(e)&&t&&e.select()}}var Ae=Qt();function Qt(){let e=[];return{add(t){const n=e[0];t!==n&&(n==null||n.pause()),e=Te(e,t),e.unshift(t)},remove(t){var n;e=Te(e,t),(n=e[0])==null||n.resume()}}}function Te(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Jt(e){return e.filter(t=>t.tagName!=="A")}var me=0;function en(){s.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??Re()),document.body.insertAdjacentElement("beforeend",e[1]??Re()),me++,()=>{me===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),me--}},[])}function Re(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}var k=function(){return k=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},k.apply(this,arguments)};function ot(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n}function tn(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,i;r<o;r++)(i||!(r in t))&&(i||(i=Array.prototype.slice.call(t,0,r)),i[r]=t[r]);return e.concat(i||Array.prototype.slice.call(t))}var ae="right-scroll-bar-position",oe="width-before-scroll-bar",nn="with-scroll-bars-hidden",rn="--removed-body-scroll-bar-size";function ve(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function an(e,t){var n=s.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var o=n.value;o!==r&&(n.value=r,n.callback(r,o))}}}})[0];return n.callback=t,n.facade}var on=typeof window<"u"?s.useLayoutEffect:s.useEffect,Ie=new WeakMap;function ln(e,t){var n=an(null,function(r){return e.forEach(function(o){return ve(o,r)})});return on(function(){var r=Ie.get(n);if(r){var o=new Set(r),i=new Set(e),u=n.current;o.forEach(function(l){i.has(l)||ve(l,null)}),i.forEach(function(l){o.has(l)||ve(l,u)})}Ie.set(n,e)},[e]),n}function sn(e){return e}function cn(e,t){t===void 0&&(t=sn);var n=[],r=!1,o={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(i){var u=t(i,r);return n.push(u),function(){n=n.filter(function(l){return l!==u})}},assignSyncMedium:function(i){for(r=!0;n.length;){var u=n;n=[],u.forEach(i)}n={push:function(l){return i(l)},filter:function(){return n}}},assignMedium:function(i){r=!0;var u=[];if(n.length){var l=n;n=[],l.forEach(i),u=n}var p=function(){var h=u;u=[],h.forEach(i)},g=function(){return Promise.resolve().then(p)};g(),n={push:function(h){u.push(h),g()},filter:function(h){return u=u.filter(h),n}}}};return o}function un(e){e===void 0&&(e={});var t=cn(null);return t.options=k({async:!0,ssr:!1},e),t}var it=function(e){var t=e.sideCar,n=ot(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return s.createElement(r,k({},n))};it.isSideCarExport=!0;function dn(e,t){return e.useMedium(t),it}var lt=un(),ge=function(){},se=s.forwardRef(function(e,t){var n=s.useRef(null),r=s.useState({onScrollCapture:ge,onWheelCapture:ge,onTouchMoveCapture:ge}),o=r[0],i=r[1],u=e.forwardProps,l=e.children,p=e.className,g=e.removeScrollBar,h=e.enabled,f=e.shards,b=e.sideCar,y=e.noRelative,E=e.noIsolation,c=e.inert,d=e.allowPinchZoom,m=e.as,x=m===void 0?"div":m,M=e.gapMode,N=ot(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),S=b,L=ln([n,t]),D=k(k({},N),o);return s.createElement(s.Fragment,null,h&&s.createElement(S,{sideCar:lt,removeScrollBar:g,shards:f,noRelative:y,noIsolation:E,inert:c,setCallbacks:i,allowPinchZoom:!!d,lockRef:n,gapMode:M}),u?s.cloneElement(s.Children.only(l),k(k({},D),{ref:L})):s.createElement(x,k({},D,{className:p,ref:L}),l))});se.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};se.classNames={fullWidth:oe,zeroRight:ae};var fn=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function mn(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=fn();return t&&e.setAttribute("nonce",t),e}function vn(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function gn(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var pn=function(){var e=0,t=null;return{add:function(n){e==0&&(t=mn())&&(vn(t,n),gn(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},hn=function(){var e=pn();return function(t,n){s.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},st=function(){var e=hn(),t=function(n){var r=n.styles,o=n.dynamic;return e(r,o),null};return t},bn={left:0,top:0,right:0,gap:0},pe=function(e){return parseInt(e||"",10)||0},yn=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],o=t[e==="padding"?"paddingRight":"marginRight"];return[pe(n),pe(r),pe(o)]},xn=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return bn;var t=yn(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},Mn=st(),U="data-scroll-locked",Nn=function(e,t,n,r){var o=e.left,i=e.top,u=e.right,l=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(nn,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(l,"px ").concat(r,`;
  }
  body[`).concat(U,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(i,`px;
    padding-right: `).concat(u,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(l,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(l,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(ae,` {
    right: `).concat(l,"px ").concat(r,`;
  }
  
  .`).concat(oe,` {
    margin-right: `).concat(l,"px ").concat(r,`;
  }
  
  .`).concat(ae," .").concat(ae,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(oe," .").concat(oe,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(U,`] {
    `).concat(rn,": ").concat(l,`px;
  }
`)},Pe=function(){var e=parseInt(document.body.getAttribute(U)||"0",10);return isFinite(e)?e:0},wn=function(){s.useEffect(function(){return document.body.setAttribute(U,(Pe()+1).toString()),function(){var e=Pe()-1;e<=0?document.body.removeAttribute(U):document.body.setAttribute(U,e.toString())}},[])},Sn=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,o=r===void 0?"margin":r;wn();var i=s.useMemo(function(){return xn(o)},[o]);return s.createElement(Mn,{styles:Nn(i,!t,o,n?"":"!important")})},be=!1;if(typeof window<"u")try{var X=Object.defineProperty({},"passive",{get:function(){return be=!0,!0}});window.addEventListener("test",X,X),window.removeEventListener("test",X,X)}catch{be=!1}var z=be?{passive:!1}:!1,En=function(e){return e.tagName==="TEXTAREA"},ct=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!En(e)&&n[t]==="visible")},Cn=function(e){return ct(e,"overflowY")},kn=function(e){return ct(e,"overflowX")},Be=function(e,t){var n=t.ownerDocument,r=t;do{typeof ShadowRoot<"u"&&r instanceof ShadowRoot&&(r=r.host);var o=ut(e,r);if(o){var i=dt(e,r),u=i[1],l=i[2];if(u>l)return!0}r=r.parentNode}while(r&&r!==n.body);return!1},Dn=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},An=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},ut=function(e,t){return e==="v"?Cn(t):kn(t)},dt=function(e,t){return e==="v"?Dn(t):An(t)},Tn=function(e,t){return e==="h"&&t==="rtl"?-1:1},Rn=function(e,t,n,r,o){var i=Tn(e,window.getComputedStyle(t).direction),u=i*r,l=n.target,p=t.contains(l),g=!1,h=u>0,f=0,b=0;do{if(!l)break;var y=dt(e,l),E=y[0],c=y[1],d=y[2],m=c-d-i*E;(E||m)&&ut(e,l)&&(f+=m,b+=E);var x=l.parentNode;l=x&&x.nodeType===Node.DOCUMENT_FRAGMENT_NODE?x.host:x}while(!p&&l!==document.body||p&&(t.contains(l)||t===l));return(h&&Math.abs(f)<1||!h&&Math.abs(b)<1)&&(g=!0),g},Y=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Fe=function(e){return[e.deltaX,e.deltaY]},Oe=function(e){return e&&"current"in e?e.current:e},In=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Pn=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Bn=0,W=[];function Fn(e){var t=s.useRef([]),n=s.useRef([0,0]),r=s.useRef(),o=s.useState(Bn++)[0],i=s.useState(st)[0],u=s.useRef(e);s.useEffect(function(){u.current=e},[e]),s.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var c=tn([e.lockRef.current],(e.shards||[]).map(Oe),!0).filter(Boolean);return c.forEach(function(d){return d.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),c.forEach(function(d){return d.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var l=s.useCallback(function(c,d){if("touches"in c&&c.touches.length===2||c.type==="wheel"&&c.ctrlKey)return!u.current.allowPinchZoom;var m=Y(c),x=n.current,M="deltaX"in c?c.deltaX:x[0]-m[0],N="deltaY"in c?c.deltaY:x[1]-m[1],S,L=c.target,D=Math.abs(M)>Math.abs(N)?"h":"v";if("touches"in c&&D==="h"&&L.type==="range")return!1;var q=Be(D,L);if(!q)return!0;if(q?S=D:(S=D==="v"?"h":"v",q=Be(D,L)),!q)return!1;if(!r.current&&"changedTouches"in c&&(M||N)&&(r.current=S),!S)return!0;var Se=r.current||S;return Rn(Se,d,c,Se==="h"?M:N)},[]),p=s.useCallback(function(c){var d=c;if(!(!W.length||W[W.length-1]!==i)){var m="deltaY"in d?Fe(d):Y(d),x=t.current.filter(function(S){return S.name===d.type&&(S.target===d.target||d.target===S.shadowParent)&&In(S.delta,m)})[0];if(x&&x.should){d.cancelable&&d.preventDefault();return}if(!x){var M=(u.current.shards||[]).map(Oe).filter(Boolean).filter(function(S){return S.contains(d.target)}),N=M.length>0?l(d,M[0]):!u.current.noIsolation;N&&d.cancelable&&d.preventDefault()}}},[]),g=s.useCallback(function(c,d,m,x){var M={name:c,delta:d,target:m,should:x,shadowParent:On(m)};t.current.push(M),setTimeout(function(){t.current=t.current.filter(function(N){return N!==M})},1)},[]),h=s.useCallback(function(c){n.current=Y(c),r.current=void 0},[]),f=s.useCallback(function(c){g(c.type,Fe(c),c.target,l(c,e.lockRef.current))},[]),b=s.useCallback(function(c){g(c.type,Y(c),c.target,l(c,e.lockRef.current))},[]);s.useEffect(function(){return W.push(i),e.setCallbacks({onScrollCapture:f,onWheelCapture:f,onTouchMoveCapture:b}),document.addEventListener("wheel",p,z),document.addEventListener("touchmove",p,z),document.addEventListener("touchstart",h,z),function(){W=W.filter(function(c){return c!==i}),document.removeEventListener("wheel",p,z),document.removeEventListener("touchmove",p,z),document.removeEventListener("touchstart",h,z)}},[]);var y=e.removeScrollBar,E=e.inert;return s.createElement(s.Fragment,null,E?s.createElement(i,{styles:Pn(o)}):null,y?s.createElement(Sn,{noRelative:e.noRelative,gapMode:e.gapMode}):null)}function On(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const _n=dn(lt,Fn);var ft=s.forwardRef(function(e,t){return s.createElement(se,k({},e,{ref:t,sideCar:_n}))});ft.classNames=se.classNames;var jn=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},H=new WeakMap,$=new WeakMap,Z={},he=0,mt=function(e){return e&&(e.host||mt(e.parentNode))},Ln=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=mt(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return!!n})},zn=function(e,t,n,r){var o=Ln(t,Array.isArray(e)?e:[e]);Z[n]||(Z[n]=new WeakMap);var i=Z[n],u=[],l=new Set,p=new Set(o),g=function(f){!f||l.has(f)||(l.add(f),g(f.parentNode))};o.forEach(g);var h=function(f){!f||p.has(f)||Array.prototype.forEach.call(f.children,function(b){if(l.has(b))h(b);else try{var y=b.getAttribute(r),E=y!==null&&y!=="false",c=(H.get(b)||0)+1,d=(i.get(b)||0)+1;H.set(b,c),i.set(b,d),u.push(b),c===1&&E&&$.set(b,!0),d===1&&b.setAttribute(n,"true"),E||b.setAttribute(r,"true")}catch(m){console.error("aria-hidden: cannot operate on ",b,m)}})};return h(t),l.clear(),he++,function(){u.forEach(function(f){var b=H.get(f)-1,y=i.get(f)-1;H.set(f,b),i.set(f,y),b||($.has(f)||f.removeAttribute(r),$.delete(f)),y||f.removeAttribute(n)}),he--,he||(H=new WeakMap,H=new WeakMap,$=new WeakMap,Z={})}},Wn=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),o=jn(e);return o?(r.push.apply(r,Array.from(o.querySelectorAll("[aria-live], script"))),zn(r,o,n,"aria-hidden")):function(){return null}},ce="Dialog",[vt,dr]=Ot(ce),[Hn,C]=vt(ce),gt=e=>{const{__scopeDialog:t,children:n,open:r,defaultOpen:o,onOpenChange:i,modal:u=!0}=e,l=s.useRef(null),p=s.useRef(null),[g,h]=Ft({prop:r,defaultProp:o??!1,onChange:i,caller:ce});return v.jsx(Hn,{scope:t,triggerRef:l,contentRef:p,contentId:ue(),titleId:ue(),descriptionId:ue(),open:g,onOpenChange:h,onOpenToggle:s.useCallback(()=>h(f=>!f),[h]),modal:u,children:n})};gt.displayName=ce;var pt="DialogTrigger",ht=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=C(pt,n),i=le(t,o.triggerRef);return v.jsx(_.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":Ne(o.open),...r,ref:i,onClick:K(e.onClick,o.onOpenToggle)})});ht.displayName=pt;var xe="DialogPortal",[Un,bt]=vt(xe,{forceMount:void 0}),yt=e=>{const{__scopeDialog:t,forceMount:n,children:r,container:o}=e,i=C(xe,t);return v.jsx(Un,{scope:t,forceMount:n,children:s.Children.map(r,u=>v.jsx(ye,{present:n||i.open,children:v.jsx(nt,{asChild:!0,container:o,children:u})}))})};yt.displayName=xe;var ie="DialogOverlay",xt=s.forwardRef((e,t)=>{const n=bt(ie,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,i=C(ie,e.__scopeDialog);return i.modal?v.jsx(ye,{present:r||i.open,children:v.jsx(Vn,{...o,ref:t})}):null});xt.displayName=ie;var Gn=Lt("DialogOverlay.RemoveScroll"),Vn=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=C(ie,n);return v.jsx(ft,{as:Gn,allowPinchZoom:!0,shards:[o.contentRef],children:v.jsx(_.div,{"data-state":Ne(o.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),O="DialogContent",Mt=s.forwardRef((e,t)=>{const n=bt(O,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,i=C(O,e.__scopeDialog);return v.jsx(ye,{present:r||i.open,children:i.modal?v.jsx(Kn,{...o,ref:t}):v.jsx(qn,{...o,ref:t})})});Mt.displayName=O;var Kn=s.forwardRef((e,t)=>{const n=C(O,e.__scopeDialog),r=s.useRef(null),o=le(t,n.contentRef,r);return s.useEffect(()=>{const i=r.current;if(i)return Wn(i)},[]),v.jsx(Nt,{...e,ref:o,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:K(e.onCloseAutoFocus,i=>{var u;i.preventDefault(),(u=n.triggerRef.current)==null||u.focus()}),onPointerDownOutside:K(e.onPointerDownOutside,i=>{const u=i.detail.originalEvent,l=u.button===0&&u.ctrlKey===!0;(u.button===2||l)&&i.preventDefault()}),onFocusOutside:K(e.onFocusOutside,i=>i.preventDefault())})}),qn=s.forwardRef((e,t)=>{const n=C(O,e.__scopeDialog),r=s.useRef(!1),o=s.useRef(!1);return v.jsx(Nt,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:i=>{var u,l;(u=e.onCloseAutoFocus)==null||u.call(e,i),i.defaultPrevented||(r.current||(l=n.triggerRef.current)==null||l.focus(),i.preventDefault()),r.current=!1,o.current=!1},onInteractOutside:i=>{var p,g;(p=e.onInteractOutside)==null||p.call(e,i),i.defaultPrevented||(r.current=!0,i.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const u=i.target;((g=n.triggerRef.current)==null?void 0:g.contains(u))&&i.preventDefault(),i.detail.originalEvent.type==="focusin"&&o.current&&i.preventDefault()}})}),Nt=s.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:o,onCloseAutoFocus:i,...u}=e,l=C(O,n),p=s.useRef(null),g=le(t,p);return en(),v.jsxs(v.Fragment,{children:[v.jsx(rt,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:o,onUnmountAutoFocus:i,children:v.jsx(_t,{role:"dialog",id:l.contentId,"aria-describedby":l.descriptionId,"aria-labelledby":l.titleId,"data-state":Ne(l.open),...u,ref:g,onDismiss:()=>l.onOpenChange(!1)})}),v.jsxs(v.Fragment,{children:[v.jsx(Xn,{titleId:l.titleId}),v.jsx($n,{contentRef:p,descriptionId:l.descriptionId})]})]})}),Me="DialogTitle",wt=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=C(Me,n);return v.jsx(_.h2,{id:o.titleId,...r,ref:t})});wt.displayName=Me;var St="DialogDescription",Et=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=C(St,n);return v.jsx(_.p,{id:o.descriptionId,...r,ref:t})});Et.displayName=St;var Ct="DialogClose",kt=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=C(Ct,n);return v.jsx(_.button,{type:"button",...r,ref:t,onClick:K(e.onClick,()=>o.onOpenChange(!1))})});kt.displayName=Ct;function Ne(e){return e?"open":"closed"}var Dt="DialogTitleWarning",[fr,At]=jt(Dt,{contentName:O,titleName:Me,docsSlug:"dialog"}),Xn=({titleId:e})=>{const t=At(Dt),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return s.useEffect(()=>{e&&(document.getElementById(e)||console.error(n))},[n,e]),null},Yn="DialogDescriptionWarning",$n=({contentRef:e,descriptionId:t})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${At(Yn).contentName}}.`;return s.useEffect(()=>{var i;const o=(i=e.current)==null?void 0:i.getAttribute("aria-describedby");t&&o&&(document.getElementById(t)||console.warn(r))},[r,e,t]),null},Zn=gt,Qn=ht,Jn=yt,Tt=xt,Rt=Mt,It=wt,Pt=Et,er=kt;function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(null,arguments)}const j=Zn,V=Qn,tr=Jn,we=s.forwardRef(({className:e,...t},n)=>a(Tt,T({ref:n,className:G("fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e)},t)));we.displayName=Tt.displayName;const R=s.forwardRef(({className:e,children:t,...n},r)=>a(tr,null,a(we,null),a(Rt,T({ref:r,className:G("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",e)},n),t,a(er,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"},a(Wt,{className:"h-4 w-4"}),a("span",{className:"sr-only"},"Schließen")))));R.displayName=Rt.displayName;const I=({className:e,...t})=>a("div",T({className:G("flex flex-col space-y-1.5 text-center sm:text-left",e)},t));I.displayName="ModalHeader";const P=({className:e,...t})=>a("div",T({className:G("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",e)},t));P.displayName="ModalFooter";const B=s.forwardRef(({className:e,...t},n)=>a(It,T({ref:n,className:G("text-lg font-semibold leading-none tracking-tight",e)},t)));B.displayName=It.displayName;const F=s.forwardRef(({className:e,...t},n)=>a(Pt,T({ref:n,className:G("text-sm text-muted-foreground",e)},t)));F.displayName=Pt.displayName;we.__docgenInfo={description:"",methods:[]};R.__docgenInfo={description:"",methods:[]};I.__docgenInfo={description:"",methods:[],displayName:"ModalHeader"};P.__docgenInfo={description:"",methods:[],displayName:"ModalFooter"};B.__docgenInfo={description:"",methods:[]};F.__docgenInfo={description:"",methods:[]};const mr={title:"Molecules/Modal",component:j,parameters:{layout:"centered",docs:{description:{component:"Ein flexibles Modal/Dialog-Component für Overlays und Popups."}}},tags:["autodocs"]},Q={render:()=>a(j,null,a(V,{asChild:!0},a(w,null,"Modal öffnen")),a(R,null,a(I,null,a(B,null,"Modal Titel"),a(F,null,"Dies ist eine Beschreibung des Modals. Hier können Sie weitere Informationen hinzufügen.")),a("div",{className:"py-4"},a("p",{className:"text-sm text-muted-foreground"},"Der Inhalt des Modals kann beliebig gestaltet werden. Sie können hier Formulare, Informationen oder andere Komponenten einfügen.")),a(P,null,a(w,{variant:"outline"},"Abbrechen"),a(w,null,"Speichern"))))},J={render:()=>a(j,null,a(V,{asChild:!0},a(w,{variant:"destructive"},a(Gt,{className:"mr-2 h-4 w-4"}),"Löschen")),a(R,null,a(I,null,a(B,null,"Sind Sie sicher?"),a(F,null,"Diese Aktion kann nicht rückgängig gemacht werden. Das Element wird permanent gelöscht.")),a(P,null,a(w,{variant:"outline"},"Abbrechen"),a(w,{variant:"destructive"},"Endgültig löschen"))))},ee={render:()=>a(j,null,a(V,{asChild:!0},a(w,null,a(Vt,{className:"mr-2 h-4 w-4"}),"Benutzer hinzufügen")),a(R,{className:"sm:max-w-md"},a(I,null,a(B,null,"Neuen Benutzer hinzufügen"),a(F,null,"Fügen Sie einen neuen Benutzer zu Ihrem Team hinzu.")),a("div",{className:"grid gap-4 py-4"},a("div",{className:"grid gap-2"},a("label",{htmlFor:"name",className:"text-sm font-medium"},"Name"),a("input",{id:"name",type:"text",placeholder:"Max Mustermann",className:"h-9 rounded-md border border-input bg-background px-3 text-sm"})),a("div",{className:"grid gap-2"},a("label",{htmlFor:"email",className:"text-sm font-medium"},"E-Mail"),a("input",{id:"email",type:"email",placeholder:"max@beispiel.de",className:"h-9 rounded-md border border-input bg-background px-3 text-sm"})),a("div",{className:"grid gap-2"},a("label",{htmlFor:"role",className:"text-sm font-medium"},"Rolle"),a("select",{id:"role",className:"h-9 rounded-md border border-input bg-background px-3 text-sm"},a("option",null,"Mitglied"),a("option",null,"Administrator"),a("option",null,"Gast")))),a(P,null,a(w,{variant:"outline"},"Abbrechen"),a(w,null,"Benutzer hinzufügen"))))},te={render:()=>a(j,null,a(V,{asChild:!0},a(w,{variant:"outline"},a(Ce,{className:"mr-2 h-4 w-4"}),"Warnung anzeigen")),a(R,null,a(I,null,a("div",{className:"flex items-center gap-2"},a("div",{className:"flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100"},a(Ce,{className:"h-5 w-5 text-yellow-600"})),a("div",null,a(B,null,"Achtung erforderlich"),a(F,null,"Es gibt ein Problem, das Ihre Aufmerksamkeit erfordert.")))),a("div",{className:"py-4"},a("p",{className:"text-sm"},"Ihr Speicherplatz ist fast voll. Sie haben nur noch 15% freien Speicherplatz. Bitte löschen Sie einige Dateien oder upgraden Sie Ihren Plan."),a("div",{className:"mt-4 flex items-center gap-2"},a(Ht,{variant:"warning"},"15% verfügbar"),a("span",{className:"text-sm text-muted-foreground"},"850 MB von 1 GB verwendet"))),a(P,null,a(w,{variant:"outline"},"Später"),a(w,null,"Speicher verwalten"))))},ne={render:()=>a(j,null,a(V,{asChild:!0},a(w,{variant:"ghost",size:"icon"},a(Ut,{className:"h-4 w-4"}))),a(R,{className:"sm:max-w-2xl"},a(I,null,a(B,null,"Einstellungen"),a(F,null,"Verwalten Sie Ihre Anwendungseinstellungen und Präferenzen.")),a("div",{className:"py-4"},a("div",{className:"space-y-4"},a("div",{className:"flex items-center justify-between"},a("div",null,a("p",{className:"font-medium"},"Benachrichtigungen"),a("p",{className:"text-sm text-muted-foreground"},"Erhalten Sie Benachrichtigungen über wichtige Updates")),a("input",{type:"checkbox",className:"h-4 w-4 rounded",defaultChecked:!0})),a("div",{className:"flex items-center justify-between"},a("div",null,a("p",{className:"font-medium"},"Dark Mode"),a("p",{className:"text-sm text-muted-foreground"},"Aktivieren Sie das dunkle Farbschema")),a("input",{type:"checkbox",className:"h-4 w-4 rounded"})),a("div",{className:"flex items-center justify-between"},a("div",null,a("p",{className:"font-medium"},"Automatische Updates"),a("p",{className:"text-sm text-muted-foreground"},"Installieren Sie Updates automatisch")),a("input",{type:"checkbox",className:"h-4 w-4 rounded",defaultChecked:!0})))),a(P,null,a(w,{variant:"outline"},"Abbrechen"),a(w,null,"Änderungen speichern"))))},re={render:()=>a(j,null,a(V,{asChild:!0},a(w,null,"Große Inhalte anzeigen")),a(R,{className:"max-h-[80vh] sm:max-w-4xl"},a(I,null,a(B,null,"Nutzungsbedingungen"),a(F,null,"Bitte lesen Sie unsere Nutzungsbedingungen sorgfältig durch.")),a("div",{className:"overflow-y-auto py-4"},Array.from({length:10},(e,t)=>a("div",{key:t,className:"mb-4"},a("h3",{className:"mb-2 font-medium"},"§ ",t+1," Abschnitt ",t+1),a("p",{className:"text-sm text-muted-foreground"},"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")))),a(P,null,a(w,{variant:"outline"},"Ablehnen"),a(w,null,"Akzeptieren"))))};var _e,je,Le;Q.parameters={...Q.parameters,docs:{...(_e=Q.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button>Modal öffnen</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Titel</ModalTitle>
          <ModalDescription>
            Dies ist eine Beschreibung des Modals. Hier können Sie weitere Informationen hinzufügen.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Der Inhalt des Modals kann beliebig gestaltet werden. Sie können hier Formulare,
            Informationen oder andere Komponenten einfügen.
          </p>
        </div>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button>Speichern</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,...(Le=(je=Q.parameters)==null?void 0:je.docs)==null?void 0:Le.source}}};var ze,We,He;J.parameters={...J.parameters,docs:{...(ze=J.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Löschen
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Sind Sie sicher?</ModalTitle>
          <ModalDescription>
            Diese Aktion kann nicht rückgängig gemacht werden. Das Element wird permanent gelöscht.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button variant="destructive">Endgültig löschen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,...(He=(We=J.parameters)==null?void 0:We.docs)==null?void 0:He.source}}};var Ue,Ge,Ve;ee.parameters={...ee.parameters,docs:{...(Ue=ee.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Benutzer hinzufügen
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <ModalTitle>Neuen Benutzer hinzufügen</ModalTitle>
          <ModalDescription>
            Fügen Sie einen neuen Benutzer zu Ihrem Team hinzu.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input id="name" type="text" placeholder="Max Mustermann" className="h-9 rounded-md border border-input bg-background px-3 text-sm" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-Mail
            </label>
            <input id="email" type="email" placeholder="max@beispiel.de" className="h-9 rounded-md border border-input bg-background px-3 text-sm" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="role" className="text-sm font-medium">
              Rolle
            </label>
            <select id="role" className="h-9 rounded-md border border-input bg-background px-3 text-sm">
              <option>Mitglied</option>
              <option>Administrator</option>
              <option>Gast</option>
            </select>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button>Benutzer hinzufügen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,...(Ve=(Ge=ee.parameters)==null?void 0:Ge.docs)==null?void 0:Ve.source}}};var Ke,qe,Xe;te.parameters={...te.parameters,docs:{...(Ke=te.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">
          <AlertCircle className="mr-2 h-4 w-4" />
          Warnung anzeigen
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <ModalTitle>Achtung erforderlich</ModalTitle>
              <ModalDescription>
                Es gibt ein Problem, das Ihre Aufmerksamkeit erfordert.
              </ModalDescription>
            </div>
          </div>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm">
            Ihr Speicherplatz ist fast voll. Sie haben nur noch 15% freien Speicherplatz.
            Bitte löschen Sie einige Dateien oder upgraden Sie Ihren Plan.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="warning">15% verfügbar</Badge>
            <span className="text-sm text-muted-foreground">850 MB von 1 GB verwendet</span>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">Später</Button>
          <Button>Speicher verwalten</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,...(Xe=(qe=te.parameters)==null?void 0:qe.docs)==null?void 0:Xe.source}}};var Ye,$e,Ze;ne.parameters={...ne.parameters,docs:{...(Ye=ne.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-2xl">
        <ModalHeader>
          <ModalTitle>Einstellungen</ModalTitle>
          <ModalDescription>
            Verwalten Sie Ihre Anwendungseinstellungen und Präferenzen.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Benachrichtigungen</p>
                <p className="text-sm text-muted-foreground">
                  Erhalten Sie Benachrichtigungen über wichtige Updates
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Aktivieren Sie das dunkle Farbschema
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Automatische Updates</p>
                <p className="text-sm text-muted-foreground">
                  Installieren Sie Updates automatisch
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
            </div>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button>Änderungen speichern</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,...(Ze=($e=ne.parameters)==null?void 0:$e.docs)==null?void 0:Ze.source}}};var Qe,Je,et;re.parameters={...re.parameters,docs:{...(Qe=re.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button>Große Inhalte anzeigen</Button>
      </ModalTrigger>
      <ModalContent className="max-h-[80vh] sm:max-w-4xl">
        <ModalHeader>
          <ModalTitle>Nutzungsbedingungen</ModalTitle>
          <ModalDescription>
            Bitte lesen Sie unsere Nutzungsbedingungen sorgfältig durch.
          </ModalDescription>
        </ModalHeader>
        <div className="overflow-y-auto py-4">
          {Array.from({
          length: 10
        }, (_, i) => <div key={i} className="mb-4">
              <h3 className="mb-2 font-medium">§ {i + 1} Abschnitt {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>)}
        </div>
        <ModalFooter>
          <Button variant="outline">Ablehnen</Button>
          <Button>Akzeptieren</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,...(et=(Je=re.parameters)==null?void 0:Je.docs)==null?void 0:et.source}}};const vr=["Default","Confirmation","FormModal","Alert","SettingsModal","LargeContent"];export{te as Alert,J as Confirmation,Q as Default,ee as FormModal,re as LargeContent,ne as SettingsModal,vr as __namedExportsOrder,mr as default};
