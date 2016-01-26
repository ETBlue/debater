/*
 RequireJS 2.1.20 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(ba){function G(b){return"[object Function]"===K.call(b)}function H(b){return"[object Array]"===K.call(b)}function v(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function T(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function t(b,c){return fa.call(b,c)}function n(b,c){return t(b,c)&&b[c]}function A(b,c){for(var d in b)if(t(b,d)&&c(b[d],d))break}function U(b,c,d,e){c&&A(c,function(c,i){if(d||!t(b,i))e&&"object"===typeof c&&c&&!H(c)&&!G(c)&&!(c instanceof
RegExp)?(b[i]||(b[i]={}),U(b[i],c,d,e)):b[i]=c});return b}function u(b,c){return function(){return c.apply(b,arguments)}}function ca(b){throw b;}function da(b){if(!b)return b;var c=ba;v(b.split("."),function(b){c=c[b]});return c}function B(b,c,d,e){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=e;d&&(c.originalError=d);return c}function ga(b){function c(a,j,b){var f,l,c,d,h,e,g,i,j=j&&j.split("/"),p=k.map,m=p&&p["*"];if(a){a=a.split("/");l=a.length-1;k.nodeIdCompat&&
Q.test(a[l])&&(a[l]=a[l].replace(Q,""));"."===a[0].charAt(0)&&j&&(l=j.slice(0,j.length-1),a=l.concat(a));l=a;for(c=0;c<l.length;c++)if(d=l[c],"."===d)l.splice(c,1),c-=1;else if(".."===d&&!(0===c||1===c&&".."===l[2]||".."===l[c-1])&&0<c)l.splice(c-1,2),c-=2;a=a.join("/")}if(b&&p&&(j||m)){l=a.split("/");c=l.length;a:for(;0<c;c-=1){h=l.slice(0,c).join("/");if(j)for(d=j.length;0<d;d-=1)if(b=n(p,j.slice(0,d).join("/")))if(b=n(b,h)){f=b;e=c;break a}!g&&(m&&n(m,h))&&(g=n(m,h),i=c)}!f&&g&&(f=g,e=i);f&&(l.splice(0,
e,f),a=l.join("/"))}return(f=n(k.pkgs,a))?f:a}function d(a){z&&v(document.getElementsByTagName("script"),function(j){if(j.getAttribute("data-requiremodule")===a&&j.getAttribute("data-requirecontext")===h.contextName)return j.parentNode.removeChild(j),!0})}function p(a){var j=n(k.paths,a);if(j&&H(j)&&1<j.length)return j.shift(),h.require.undef(a),h.makeRequire(null,{skipMap:!0})([a]),!0}function g(a){var j,c=a?a.indexOf("!"):-1;-1<c&&(j=a.substring(0,c),a=a.substring(c+1,a.length));return[j,a]}function i(a,
j,b,f){var l,d,e=null,i=j?j.name:null,k=a,p=!0,m="";a||(p=!1,a="_@r"+(K+=1));a=g(a);e=a[0];a=a[1];e&&(e=c(e,i,f),d=n(q,e));a&&(e?m=d&&d.normalize?d.normalize(a,function(a){return c(a,i,f)}):-1===a.indexOf("!")?c(a,i,f):a:(m=c(a,i,f),a=g(m),e=a[0],m=a[1],b=!0,l=h.nameToUrl(m)));b=e&&!d&&!b?"_unnormalized"+(O+=1):"";return{prefix:e,name:m,parentMap:j,unnormalized:!!b,url:l,originalName:k,isDefine:p,id:(e?e+"!"+m:m)+b}}function r(a){var j=a.id,b=n(m,j);b||(b=m[j]=new h.Module(a));return b}function s(a,
j,b){var f=a.id,c=n(m,f);if(t(q,f)&&(!c||c.defineEmitComplete))"defined"===j&&b(q[f]);else if(c=r(a),c.error&&"error"===j)b(c.error);else c.on(j,b)}function w(a,b){var c=a.requireModules,f=!1;if(b)b(a);else if(v(c,function(b){if(b=n(m,b))b.error=a,b.events.error&&(f=!0,b.emit("error",a))}),!f)e.onError(a)}function x(){R.length&&(v(R,function(a){var b=a[0];"string"===typeof b&&(h.defQueueMap[b]=!0);C.push(a)}),R=[])}function y(a){delete m[a];delete V[a]}function F(a,b,c){var f=a.map.id;a.error?a.emit("error",
a.error):(b[f]=!0,v(a.depMaps,function(f,d){var e=f.id,h=n(m,e);h&&(!a.depMatched[d]&&!c[e])&&(n(b,e)?(a.defineDep(d,q[e]),a.check()):F(h,b,c))}),c[f]=!0)}function D(){var a,b,c=(a=1E3*k.waitSeconds)&&h.startTime+a<(new Date).getTime(),f=[],l=[],e=!1,i=!0;if(!W){W=!0;A(V,function(a){var h=a.map,g=h.id;if(a.enabled&&(h.isDefine||l.push(a),!a.error))if(!a.inited&&c)p(g)?e=b=!0:(f.push(g),d(g));else if(!a.inited&&(a.fetched&&h.isDefine)&&(e=!0,!h.prefix))return i=!1});if(c&&f.length)return a=B("timeout",
"Load timeout for modules: "+f,null,f),a.contextName=h.contextName,w(a);i&&v(l,function(a){F(a,{},{})});if((!c||b)&&e)if((z||ea)&&!X)X=setTimeout(function(){X=0;D()},50);W=!1}}function E(a){t(q,a[0])||r(i(a[0],null,!0)).init(a[1],a[2])}function I(a){var a=a.currentTarget||a.srcElement,b=h.onScriptLoad;a.detachEvent&&!Y?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=h.onScriptError;(!a.detachEvent||Y)&&a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}
function J(){var a;for(x();C.length;){a=C.shift();if(null===a[0])return w(B("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));E(a)}h.defQueueMap={}}var W,Z,h,L,X,k={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},m={},V={},$={},C=[],q={},S={},aa={},K=1,O=1;L={require:function(a){return a.require?a.require:a.require=h.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?q[a.map.id]=a.exports:a.exports=q[a.map.id]={}},
module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return n(k.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}};Z=function(a){this.events=n($,a.id)||{};this.map=a;this.shim=n(k.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};Z.prototype={init:function(a,b,c,f){f=f||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=u(this,function(a){this.emit("error",a)}));
this.depMaps=a&&a.slice(0);this.errback=c;this.inited=!0;this.ignore=f.ignore;f.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;h.startTime=(new Date).getTime();var a=this.map;if(this.shim)h.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],u(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?
this.callPlugin():this.load()}},load:function(){var a=this.map.url;S[a]||(S[a]=!0,h.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var f=this.exports,l=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(G(l)){if(this.events.error&&this.map.isDefine||e.onError!==ca)try{f=h.execCb(c,l,b,f)}catch(d){a=d}else f=h.execCb(c,l,b,f);this.map.isDefine&&
void 0===f&&((b=this.module)?f=b.exports:this.usingExports&&(f=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",w(this.error=a)}else f=l;this.exports=f;if(this.map.isDefine&&!this.ignore&&(q[c]=f,e.onResourceLoad))e.onResourceLoad(h,this.map,this.depMaps);y(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=
!0)}}else t(h.defQueueMap,c)||this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=i(a.prefix);this.depMaps.push(d);s(d,"defined",u(this,function(f){var l,d;d=n(aa,this.map.id);var g=this.map.name,P=this.map.parentMap?this.map.parentMap.name:null,p=h.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(f.normalize&&(g=f.normalize(g,function(a){return c(a,P,!0)})||""),f=i(a.prefix+"!"+g,this.map.parentMap),s(f,"defined",u(this,function(a){this.init([],function(){return a},
null,{enabled:!0,ignore:!0})})),d=n(m,f.id)){this.depMaps.push(f);if(this.events.error)d.on("error",u(this,function(a){this.emit("error",a)}));d.enable()}}else d?(this.map.url=h.nameToUrl(d),this.load()):(l=u(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),l.error=u(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];A(m,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&y(a.map.id)});w(a)}),l.fromText=u(this,function(f,c){var d=a.name,g=i(d),P=M;c&&(f=c);P&&
(M=!1);r(g);t(k.config,b)&&(k.config[d]=k.config[b]);try{e.exec(f)}catch(m){return w(B("fromtexteval","fromText eval for "+b+" failed: "+m,m,[b]))}P&&(M=!0);this.depMaps.push(g);h.completeLoad(d);p([d],l)}),f.load(a.name,p,l,k))}));h.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){V[this.map.id]=this;this.enabling=this.enabled=!0;v(this.depMaps,u(this,function(a,b){var c,f;if("string"===typeof a){a=i(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=
n(L,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;s(a,"defined",u(this,function(a){this.undefed||(this.defineDep(b,a),this.check())}));this.errback?s(a,"error",u(this,this.errback)):this.events.error&&s(a,"error",u(this,function(a){this.emit("error",a)}))}c=a.id;f=m[c];!t(L,c)&&(f&&!f.enabled)&&h.enable(a,this)}));A(this.pluginMaps,u(this,function(a){var b=n(m,a.id);b&&!b.enabled&&h.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=
[]);c.push(b)},emit:function(a,b){v(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};h={config:k,contextName:b,registry:m,defined:q,urlFetched:S,defQueue:C,defQueueMap:{},Module:Z,makeModuleMap:i,nextTick:e.nextTick,onError:w,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=k.shim,c={paths:!0,bundles:!0,config:!0,map:!0};A(a,function(a,b){c[b]?(k[b]||(k[b]={}),U(k[b],a,!0,!0)):k[b]=a});a.bundles&&A(a.bundles,function(a,b){v(a,
function(a){a!==b&&(aa[a]=b)})});a.shim&&(A(a.shim,function(a,c){H(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=h.makeShimExports(a);b[c]=a}),k.shim=b);a.packages&&v(a.packages,function(a){var b,a="string"===typeof a?{name:a}:a;b=a.name;a.location&&(k.paths[b]=a.location);k.pkgs[b]=a.name+"/"+(a.main||"main").replace(ha,"").replace(Q,"")});A(m,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=i(b,null,!0))});if(a.deps||a.callback)h.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;
a.init&&(b=a.init.apply(ba,arguments));return b||a.exports&&da(a.exports)}},makeRequire:function(a,j){function g(c,d,p){var k,n;j.enableBuildCallback&&(d&&G(d))&&(d.__requireJsBuild=!0);if("string"===typeof c){if(G(d))return w(B("requireargs","Invalid require call"),p);if(a&&t(L,c))return L[c](m[a.id]);if(e.get)return e.get(h,c,a,g);k=i(c,a,!1,!0);k=k.id;return!t(q,k)?w(B("notloaded",'Module name "'+k+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):q[k]}J();h.nextTick(function(){J();
n=r(i(null,a));n.skipMap=j.skipMap;n.init(c,d,p,{enabled:!0});D()});return g}j=j||{};U(g,{isBrowser:z,toUrl:function(b){var d,e=b.lastIndexOf("."),j=b.split("/")[0];if(-1!==e&&(!("."===j||".."===j)||1<e))d=b.substring(e,b.length),b=b.substring(0,e);return h.nameToUrl(c(b,a&&a.id,!0),d,!0)},defined:function(b){return t(q,i(b,a,!1,!0).id)},specified:function(b){b=i(b,a,!1,!0).id;return t(q,b)||t(m,b)}});a||(g.undef=function(b){x();var c=i(b,a,!0),e=n(m,b);e.undefed=!0;d(b);delete q[b];delete S[c.url];
delete $[b];T(C,function(a,c){a[0]===b&&C.splice(c,1)});delete h.defQueueMap[b];e&&(e.events.defined&&($[b]=e.events),y(b))});return g},enable:function(a){n(m,a.id)&&r(a).enable()},completeLoad:function(a){var b,c,d=n(k.shim,a)||{},e=d.exports;for(x();C.length;){c=C.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}h.defQueueMap={};c=n(m,a);if(!b&&!t(q,a)&&c&&!c.inited){if(k.enforceDefine&&(!e||!da(e)))return p(a)?void 0:w(B("nodefine","No define call for "+a,null,[a]));E([a,
d.deps||[],d.exportsFn])}D()},nameToUrl:function(a,b,c){var d,g,i;(d=n(k.pkgs,a))&&(a=d);if(d=n(aa,a))return h.nameToUrl(d,b,c);if(e.jsExtRegExp.test(a))d=a+(b||"");else{d=k.paths;a=a.split("/");for(g=a.length;0<g;g-=1)if(i=a.slice(0,g).join("/"),i=n(d,i)){H(i)&&(i=i[0]);a.splice(0,g,i);break}d=a.join("/");d+=b||(/^data\:|\?/.test(d)||c?"":".js");d=("/"===d.charAt(0)||d.match(/^[\w\+\.\-]+:/)?"":k.baseUrl)+d}return k.urlArgs?d+((-1===d.indexOf("?")?"?":"&")+k.urlArgs):d},load:function(a,b){e.load(h,
a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ia.test((a.currentTarget||a.srcElement).readyState))N=null,a=I(a),h.completeLoad(a.id)},onScriptError:function(a){var b=I(a);if(!p(b.id))return w(B("scripterror","Script error for: "+b.id,a,[b.id]))}};h.require=h.makeRequire();return h}var e,x,y,D,I,E,N,J,r,O,ja=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ka=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,Q=/\.js$/,ha=/^\.\//;x=Object.prototype;var K=
x.toString,fa=x.hasOwnProperty,z=!!("undefined"!==typeof window&&"undefined"!==typeof navigator&&window.document),ea=!z&&"undefined"!==typeof importScripts,ia=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,Y="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),F={},s={},R=[],M=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(G(requirejs))return;s=requirejs;requirejs=void 0}"undefined"!==typeof require&&!G(require)&&(s=require,require=
void 0);e=requirejs=function(b,c,d,p){var g,i="_";!H(b)&&"string"!==typeof b&&(g=b,H(c)?(b=c,c=d,d=p):b=[]);g&&g.context&&(i=g.context);(p=n(F,i))||(p=F[i]=e.s.newContext(i));g&&p.configure(g);return p.require(b,c,d)};e.config=function(b){return e(b)};e.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=e);e.version="2.1.20";e.jsExtRegExp=/^\/|:|\?|\.js$/;e.isBrowser=z;x=e.s={contexts:F,newContext:ga};e({});v(["toUrl","undef","defined","specified"],
function(b){e[b]=function(){var c=F._;return c.require[b].apply(c,arguments)}});if(z&&(y=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0]))y=x.head=D.parentNode;e.onError=ca;e.createNode=function(b){var c=b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};e.load=function(b,c,d){var p=b&&b.config||{},g;if(z){g=e.createNode(p,
c,d);if(p.onNodeCreated)p.onNodeCreated(g,p,c,d);g.setAttribute("data-requirecontext",b.contextName);g.setAttribute("data-requiremodule",c);g.attachEvent&&!(g.attachEvent.toString&&0>g.attachEvent.toString().indexOf("[native code"))&&!Y?(M=!0,g.attachEvent("onreadystatechange",b.onScriptLoad)):(g.addEventListener("load",b.onScriptLoad,!1),g.addEventListener("error",b.onScriptError,!1));g.src=d;J=g;D?y.insertBefore(g,D):y.appendChild(g);J=null;return g}if(ea)try{importScripts(d),b.completeLoad(c)}catch(i){b.onError(B("importscripts",
"importScripts failed for "+c+" at "+d,i,[c]))}};z&&!s.skipDataMain&&T(document.getElementsByTagName("script"),function(b){y||(y=b.parentNode);if(I=b.getAttribute("data-main"))return r=I,s.baseUrl||(E=r.split("/"),r=E.pop(),O=E.length?E.join("/")+"/":"./",s.baseUrl=O),r=r.replace(Q,""),e.jsExtRegExp.test(r)&&(r=I),s.deps=s.deps?s.deps.concat(r):[r],!0});define=function(b,c,d){var e,g;"string"!==typeof b&&(d=c,c=b,b=null);H(c)||(d=c,c=null);!c&&G(d)&&(c=[],d.length&&(d.toString().replace(ja,"").replace(ka,
function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));if(M){if(!(e=J))N&&"interactive"===N.readyState||T(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return N=b}),e=N;e&&(b||(b=e.getAttribute("data-requiremodule")),g=F[e.getAttribute("data-requirecontext")])}g?(g.defQueue.push([b,c,d]),g.defQueueMap[b]=!0):R.push([b,c,d])};define.amd={jQuery:!0};e.exec=function(b){return eval(b)};e(s)}})(this);




define('utils/events',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.eventful = eventful;

  function _typeof(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  }

  function eventful() {
    for (var _len = arguments.length, objList = Array(_len), _key = 0; _key < _len; _key++) {
      objList[_key] = arguments[_key];
    }

    objList.forEach(function (obj) {
      obj.on = Events.on;
      obj.off = Events.off;
      obj.trigger = Events.trigger;
      obj.bind = Events.bind;
      obj.unbind = Events.unbind;
      obj.once = Events.once;
      obj.listeningTo = Events.listeningTo;
      obj.listenToOnce = Events.listenToOnce;
      obj.stopListening = Events.stopListening;
    });
  }

  var Events = {};
  var eventSplitter = /\s+/;

  var eventsApi = function eventsApi(iteratee, events, name, callback, opts) {
    var i = 0,
        names;

    if (name && (typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;

      for (names = _.keys(name); i < names.length; i++) {
        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
      }
    } else if (name && eventSplitter.test(name)) {
      for (names = name.split(eventSplitter); i < names.length; i++) {
        events = iteratee(events, names[i], callback, opts);
      }
    } else {
      events = iteratee(events, name, callback, opts);
    }

    return events;
  };

  Events.on = function (name, callback, context) {
    return internalOn(this, name, callback, context);
  };

  var internalOn = function internalOn(obj, name, callback, context, listening) {
    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
      context: context,
      ctx: obj,
      listening: listening
    });

    if (listening) {
      var listeners = obj._listeners || (obj._listeners = {});
      listeners[listening.id] = listening;
    }

    return obj;
  };

  Events.listenTo = function (obj, name, callback) {
    if (!obj) return this;

    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));

    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];

    if (!listening) {
      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));

      listening = listeningTo[id] = {
        obj: obj,
        objId: id,
        id: thisId,
        listeningTo: listeningTo,
        count: 0
      };
    }

    internalOn(obj, name, callback, this, listening);
    return this;
  };

  var onApi = function onApi(events, name, callback, options) {
    if (callback) {
      var handlers = events[name] || (events[name] = []);
      var context = options.context,
          ctx = options.ctx,
          listening = options.listening;
      if (listening) listening.count++;
      handlers.push({
        callback: callback,
        context: context,
        ctx: context || ctx,
        listening: listening
      });
    }

    return events;
  };

  Events.off = function (name, callback, context) {
    if (!this._events) return this;
    this._events = eventsApi(offApi, this._events, name, callback, {
      context: context,
      listeners: this._listeners
    });
    return this;
  };

  Events.stopListening = function (obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;
    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

    for (var i = 0; i < ids.length; i++) {
      var listening = listeningTo[ids[i]];
      if (!listening) break;
      listening.obj.off(name, callback, this);
    }

    if (_.isEmpty(listeningTo)) this._listeningTo = void 0;
    return this;
  };

  var offApi = function offApi(events, name, callback, options) {
    if (!events) return;
    var i = 0,
        listening;
    var context = options.context,
        listeners = options.listeners;

    if (!name && !callback && !context) {
      var ids = _.keys(listeners);

      for (; i < ids.length; i++) {
        listening = listeners[ids[i]];
        delete listeners[listening.id];
        delete listening.listeningTo[listening.objId];
      }

      return;
    }

    var names = name ? [name] : _.keys(events);

    for (; i < names.length; i++) {
      name = names[i];
      var handlers = events[name];
      if (!handlers) break;
      var remaining = [];

      for (var j = 0; j < handlers.length; j++) {
        var handler = handlers[j];

        if (callback && callback !== handler.callback && callback !== handler.callback._callback || context && context !== handler.context) {
          remaining.push(handler);
        } else {
          listening = handler.listening;

          if (listening && --listening.count === 0) {
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
          }
        }
      }

      if (remaining.length) {
        events[name] = remaining;
      } else {
        delete events[name];
      }
    }

    if (_.size(events)) return events;
  };

  Events.once = function (name, callback, context) {
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
    return this.on(events, void 0, context);
  };

  Events.listenToOnce = function (obj, name, callback) {
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
    return this.listenTo(obj, events);
  };

  var onceMap = function onceMap(map, name, callback, offer) {
    if (callback) {
      var once = map[name] = _.once(function () {
        offer(name, once);
        callback.apply(this, arguments);
      });

      once._callback = callback;
    }

    return map;
  };

  Events.trigger = function (name) {
    if (!this._events) return this;
    var length = Math.max(0, arguments.length - 1);
    var args = Array(length);

    for (var i = 0; i < length; i++) {
      args[i] = arguments[i + 1];
    }

    eventsApi(triggerApi, this._events, name, void 0, args);
    return this;
  };

  var triggerApi = function triggerApi(objEvents, name, cb, args) {
    if (objEvents) {
      var events = objEvents[name];
      var allEvents = objEvents.all;
      if (events && allEvents) allEvents = allEvents.slice();
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }

    return objEvents;
  };

  var triggerEvents = function triggerEvents(events, args) {
    var ev,
        i = -1,
        l = events.length,
        a1 = args[0],
        a2 = args[1],
        a3 = args[2];

    switch (args.length) {
      case 0:
        while (++i < l) {
          (ev = events[i]).callback.call(ev.ctx);
        }

        return;

      case 1:
        while (++i < l) {
          (ev = events[i]).callback.call(ev.ctx, a1);
        }

        return;

      case 2:
        while (++i < l) {
          (ev = events[i]).callback.call(ev.ctx, a1, a2);
        }

        return;

      case 3:
        while (++i < l) {
          (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
        }

        return;

      default:
        while (++i < l) {
          (ev = events[i]).callback.apply(ev.ctx, args);
        }

        return;
    }
  };

  Events.bind = Events.on;
  Events.unbind = Events.off;
});


define('model/apiKey',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var key = localStorage.getItem('gw2apikey');
  var apiKey = exports.apiKey = {
    getKey: function getKey() {
      return key;
    },
    setKey: function setKey(apiKey) {
      key = apiKey;
      localStorage.setItem('gw2apikey', key);
    }
  };
  exports.default = apiKey;
});


define('model/gw2Data/worlds',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dataRef = {};
  var loadingRef = undefined;
  var worlds = exports.worlds = {
    get: function get(id) {
      return dataRef[id];
    },
    load: function load() {
      if (!loadingRef) {
        var params = {
          ids: 'all',
          lang: 'en'
        };
        loadingRef = $.get('https://api.guildwars2.com/v2/worlds?' + $.param(params)).done(function (worldsData) {
          worldsData.forEach(function (worldData) {
            dataRef[worldData.id] = worldData;
          });
        });
      }
      return loadingRef;
    }
  };
});


define('model/gw2Data/account',['exports', 'model/apiKey', 'model/gw2Data/worlds'], function (exports, _apiKey, _worlds) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.account = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var dataRef = undefined;
  var account = exports.account = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      var loadDeferred = new $.Deferred();
      var params = {
        access_token: _apiKey.apiKey.getKey(),
        lang: 'en'
      };
      var waiting = [];
      $.get('https://api.guildwars2.com/v2/account?' + $.param(params)).done(function (accountData) {
        //載入worlds
        waiting.push(_worlds.worlds.load());

        //全部載入完畢後才resolve loadDeferred
        $.when.apply($.when, waiting).done(function () {
          var account = new Account(accountData);
          dataRef = account.toJSON();
          loadDeferred.resolve(dataRef);
        });
      });
      return loadDeferred;
    }
  };

  var Account = (function () {
    function Account(data) {
      _classCallCheck(this, Account);

      this._data = data;
      return this;
    }

    _createClass(Account, [{
      key: 'toJSON',
      value: function toJSON() {
        var _this = this;

        var result = {};
        Object.keys(this._data).forEach(function (key) {
          result[key] = _this[key];
        });
        return result;
      }
    }, {
      key: 'id',
      get: function get() {
        return this._data.id || '';
      }
    }, {
      key: 'name',
      get: function get() {
        return this._data.name || '';
      }
    }, {
      key: 'world',
      get: function get() {
        var worldData = _worlds.worlds.get(this._data.world);

        return '' + worldData.name;
      }
    }, {
      key: 'created',
      get: function get() {
        var created = this._data.created;
        return created.slice(0, created.indexOf('T')) || '';
      }
    }, {
      key: 'access',
      get: function get() {
        return this._data.access || '';
      }
    }, {
      key: 'fractal_level',
      get: function get() {
        return this._data.fractal_level || '';
      }
    }]);

    return Account;
  })();
});


define('model/gw2Data/guilds',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dataRef = {};
  var loadingRef = {};
  var guilds = exports.guilds = {
    get: function get(id) {
      return dataRef[id];
    },
    load: function load(id) {
      if (!loadingRef[id]) {
        var params = {
          guild_id: id
        };
        loadingRef[id] = $.get('https://api.guildwars2.com/v1/guild_details.json?' + $.param(params)).done(function (guildData) {
          dataRef[guildData.guild_id] = guildData;
        });
      }
      return loadingRef[id];
    },
    loadByCharacterList: function loadByCharacterList(characterList) {
      var _this = this;

      var waiting = [];
      characterList.forEach(function (characterData) {
        if (characterData.guild) {
          waiting.push(_this.load(characterData.guild));
        }
      });
      return $.when.apply($.when, waiting);
    }
  };
});


define('model/gw2Data/specializations',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dataRef = {};
  var loadingRef = undefined;
  var specializations = exports.specializations = {
    get: function get(id) {
      return dataRef[id];
    },
    load: function load() {
      if (!loadingRef) {
        var params = {
          ids: 'all',
          lang: 'en'
        };
        loadingRef = $.get('https://api.guildwars2.com/v2/specializations?' + $.param(params)).done(function (specializationData) {
          specializationData.forEach(function (specialization) {
            dataRef[specialization.id] = specialization;
          });
        });
      }
      return loadingRef;
    }
  };
});


define('model/gw2Data/traits',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var dataRef = {};
  var traits = exports.traits = {
    get: function get(id) {
      return dataRef[id];
    },
    load: function load(ids) {
      var result = new $.Deferred();
      ids = [].concat(_toConsumableArray(new Set(ids)));
      var params = {
        lang: 'en'
      };
      var waiting = [1];
      while (ids.length > 0) {
        params.ids = ids.splice(0, 200).join(',');
        waiting.push($.get('https://api.guildwars2.com/v2/traits?' + $.param(params)));
      }
      $.when.apply($.when, waiting).done(function (one) {
        for (var _len = arguments.length, deferrerResponse = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          deferrerResponse[_key - 1] = arguments[_key];
        }

        deferrerResponse.forEach(function (response) {
          var traitList = response[0];
          traitList.forEach(function (trait) {
            dataRef[trait.id] = trait;
          });
        });
        result.resolve(dataRef);
      });
      return result;
    },
    loadByCharacterList: function loadByCharacterList(characterList) {
      var needTraitsIdList = [];
      characterList.forEach(function (characterData) {
        if (characterData.specializations) {
          $.each(characterData.specializations, function (key, subSpecialization) {
            if (subSpecialization) {
              subSpecialization.forEach(function (specialization) {
                if (specialization && specialization.traits) {
                  specialization.traits.forEach(function (trait) {
                    needTraitsIdList.push(trait);
                  });
                }
              });
            }
          });
        }
      });
      return this.load(needTraitsIdList);
    }
  };
});


define('model/gw2Data/items',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var dataRef = {};
  var items = exports.items = {
    get: function get(id) {
      return dataRef[id];
    },
    load: function load(ids) {
      var result = new $.Deferred();
      ids = [].concat(_toConsumableArray(new Set(ids)));
      var params = {
        lang: 'en'
      };
      var waiting = [1];
      while (ids.length > 0) {
        params.ids = ids.splice(0, 200).join(',');
        waiting.push($.get('https://api.guildwars2.com/v2/items?' + $.param(params)));
      }
      $.when.apply($.when, waiting).done(function (one) {
        for (var _len = arguments.length, deferrerResponse = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          deferrerResponse[_key - 1] = arguments[_key];
        }

        deferrerResponse.forEach(function (response) {
          var itemList = response[0];
          itemList.forEach(function (item) {
            dataRef[item.id] = item;
          });
        });
        result.resolve(dataRef);
      });
      return result;
    },
    loadByCharacterList: function loadByCharacterList(characterList) {
      var needItemIdList = [];
      characterList.forEach(function (characterData) {
        if (characterData.bags) {
          characterData.bags.forEach(function (bag) {
            if (bag) {
              needItemIdList.push(bag.id);
              if (bag.inventory) {
                bag.inventory.forEach(function (item) {
                  if (item) {
                    needItemIdList.push(item.id);
                    if (item.upgrades) {
                      item.upgrades.forEach(function (upgradeId) {
                        needItemIdList.push(upgradeId);
                      });
                    }
                    if (item.infusions) {
                      item.infusions.forEach(function (infusionId) {
                        needItemIdList.push(infusionId);
                      });
                    }
                  }
                });
              }
            }
          });
        }
        if (characterData.equipment) {
          characterData.equipment.forEach(function (equipment) {
            if (equipment) {
              needItemIdList.push(equipment.id);
              if (equipment.upgrades) {
                equipment.upgrades.forEach(function (upgradeId) {
                  needItemIdList.push(upgradeId);
                });
              }
              if (equipment.infusions) {
                equipment.infusions.forEach(function (infusionId) {
                  needItemIdList.push(infusionId);
                });
              }
            }
          });
        }
      });
      return this.load(needItemIdList);
    },
    loadByCharacterInventory: function loadByCharacterInventory(characterList) {
      var needItemIdList = [];
      characterList.forEach(function (characterData) {
        if (characterData.bags) {
          characterData.bags.forEach(function (bag) {
            if (bag) {
              if (bag.inventory) {
                bag.inventory.forEach(function (item) {
                  if (item) {
                    needItemIdList.push(item.id);
                    if (item.upgrades) {
                      item.upgrades.forEach(function (upgradeId) {
                        needItemIdList.push(upgradeId);
                      });
                    }
                    if (item.infusions) {
                      item.infusions.forEach(function (infusionId) {
                        needItemIdList.push(infusionId);
                      });
                    }
                  }
                });
              }
            }
          });
        }
      });
      return this.load(needItemIdList);
    },
    loadByBankList: function loadByBankList(bankData) {
      var needItemIdList = [];
      bankData.forEach(function (itemData) {
        if (itemData) {
          needItemIdList.push(itemData.id);
        }
      });
      return this.load(needItemIdList);
    },
    loadByVaultList: function loadByVaultList(vaultData) {
      var needItemIdList = [];
      vaultData.forEach(function (itemData) {
        if (itemData) {
          needItemIdList.push(itemData.id);
        }
      });
      return this.load(needItemIdList);
    }
  };
});


define('model/gw2Data/characters',['exports', 'model/apiKey', 'model/gw2Data/guilds', 'model/gw2Data/specializations', 'model/gw2Data/traits', 'model/gw2Data/items'], function (exports, _apiKey, _guilds, _specializations, _traits, _items) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.characters = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var dataRef = undefined;
  var characters = exports.characters = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      var loadDeferred = new $.Deferred();
      var params = {
        access_token: _apiKey.apiKey.getKey(),
        lang: 'en',
        page: 0
      };
      var waiting = [];
      //載入specializations
      waiting.push(_specializations.specializations.load());
      $.get('https://api.guildwars2.com/v2/characters?' + $.param(params)).done(function (characterList) {
        //載入guild
        waiting.push(_guilds.guilds.loadByCharacterList(characterList));
        //載入traits
        waiting.push(_traits.traits.loadByCharacterList(characterList));
        //載入items
        waiting.push(_items.items.loadByCharacterList(characterList));

        //全部載入完畢後才resolve loadDeferred
        $.when.apply($.when, waiting).done(function () {
          dataRef = characterList.map(function (characterData) {
            var character = new Character(characterData);
            return character.toJSON();
          });
          loadDeferred.resolve(dataRef);
        });
      });
      return loadDeferred;
    }
  };

  var Character = (function () {
    function Character(data) {
      _classCallCheck(this, Character);

      this._data = data;
      return this;
    }

    _createClass(Character, [{
      key: 'toJSON',
      value: function toJSON() {
        var _this = this;

        var result = {};
        Object.keys(this._data).forEach(function (key) {
          result[key] = _this[key];
        });
        result.inventory = this.inventory;
        result._data = this._data;
        return result;
      }
    }, {
      key: 'name',
      get: function get() {
        return this._data.name || '';
      }
    }, {
      key: 'race',
      get: function get() {
        return this._data.race || '';
      }
    }, {
      key: 'gender',
      get: function get() {
        return this._data.gender || '';
      }
    }, {
      key: 'profession',
      get: function get() {
        return this._data.profession || '';
      }
    }, {
      key: 'level',
      get: function get() {
        return this._data.level || '';
      }
    }, {
      key: 'created',
      get: function get() {
        var created = this._data.created;
        return created.slice(0, created.indexOf('T')) || '';
      }
    }, {
      key: 'age',
      get: function get() {
        var age = this._data.age;
        var seconds = age % 60;
        var minutes = Math.floor(age / 60) % 60;
        var hours = Math.floor(age / 3600);
        return hours + ':' + minutes + ':' + seconds;
      }
    }, {
      key: 'deaths',
      get: function get() {
        return this._data.deaths || '';
      }
    }, {
      key: 'guild',
      get: function get() {
        if (this._data.guild) {
          var guildData = _guilds.guilds.get(this._data.guild);

          return guildData.guild_name + '<br />[' + guildData.tag + ']';
        } else {
          return '';
        }
      }
    }, {
      key: 'crafting',
      get: function get() {
        var crafting = this._data.crafting;

        if (crafting && crafting.reduce) {
          return crafting.reduce(function (html, craftData) {
            return html + (craftData.rating + '|' + craftData.discipline + ' <br />');
          }, '');
        }
      }
    }, {
      key: 'specializations',
      get: function get() {
        var specializations = this._data.specializations;
        return {
          pve: getSpecializationHtml(specializations.pve),
          pvp: getSpecializationHtml(specializations.pvp),
          wvw: getSpecializationHtml(specializations.wvw)
        };
      }
    }, {
      key: 'equipment',
      get: function get() {
        var equipmentArray = this._data.equipment;
        var equipment = {};
        equipmentArray.forEach(function (element) {
          equipment[element.slot] = {};
          equipment[element.slot].id = element.id;
          equipment[element.slot].upgrades = element.upgrades;
          equipment[element.slot].infusions = element.infusions;
        });
        return {
          Helm: getEquipmentItemHtml(equipment.Helm),
          Shoulders: getEquipmentItemHtml(equipment.Shoulders),
          Gloves: getEquipmentItemHtml(equipment.Gloves),
          Coat: getEquipmentItemHtml(equipment.Coat),
          Leggings: getEquipmentItemHtml(equipment.Leggings),
          Boots: getEquipmentItemHtml(equipment.Boots),
          Backpack: getEquipmentItemHtml(equipment.Backpack),
          HelmAquatic: getEquipmentItemHtml(equipment.HelmAquatic),
          Amulet: getEquipmentItemHtml(equipment.Amulet),
          Accessory1: getEquipmentItemHtml(equipment.Accessory1),
          Accessory2: getEquipmentItemHtml(equipment.Accessory2),
          Ring1: getEquipmentItemHtml(equipment.Ring1),
          Ring2: getEquipmentItemHtml(equipment.Ring2),
          WeaponA1: getEquipmentItemHtml(equipment.WeaponA1),
          WeaponA2: getEquipmentItemHtml(equipment.WeaponA2),
          WeaponB1: getEquipmentItemHtml(equipment.WeaponB1),
          WeaponB2: getEquipmentItemHtml(equipment.WeaponB2),
          WeaponAquaticA: getEquipmentItemHtml(equipment.WeaponAquaticA),
          WeaponAquaticB: getEquipmentItemHtml(equipment.WeaponAquaticB),
          Sickle: getEquipmentItemHtml(equipment.Sickle),
          Axe: getEquipmentItemHtml(equipment.Axe),
          Pick: getEquipmentItemHtml(equipment.Pick)
        };
      }
    }, {
      key: 'bags',
      get: function get() {
        var bags = this._data.bags;
        return getBagHtml(bags);
      }
    }, {
      key: 'inventory',
      get: function get() {
        var bags = this._data.bags;
        var inventory = {
          services: [],
          special: [],
          boosts: [],
          misc: []
        };
        bags.forEach(function (bag) {
          if (bag) {
            bag.inventory.forEach(function (item) {
              if (item) {
                var itemData = _items.items.get(item.id);

                if (itemData) {
                  itemData.count = item.count || "";
                  itemData.binding = item.binding || "";
                  itemData.bound_to = item.bound_to || "";

                  if (itemData.type == "Consumable") {
                    if (itemData.details.type == "Booze") {}

                    if (itemData.details.type == "Food") {
                      inventory.boosts.push(itemData);
                    }

                    if (itemData.details.type == "Generic") {
                      inventory.misc.push(itemData);
                    }

                    if (itemData.details.type == "Halloween") {
                      inventory.boosts.push(itemData);
                    }

                    if (itemData.details.type == "Immediate") {
                      inventory.misc.push(itemData);
                    }

                    if (itemData.details.type == "Unlock") {
                      inventory.misc.push(itemData);
                    }

                    if (itemData.details.type == "Utility") {
                      inventory.boosts.push(itemData);
                    }
                  }

                  if (itemData.type == "Gizmo") {
                    if (itemData.details.type == "Default") {
                      inventory.misc.push(itemData);
                    }
                  }
                }
              }
            });
          }
        });
        return {
          boosts: getInventoryHtml(inventory.boosts),
          misc: getInventoryHtml(inventory.misc)
        };
      }
    }]);

    return Character;
  })();

  function getSpecializationHtml(dataList) {
    return dataList.reduce(function (html, specializationData) {
      if (specializationData) {
        var specialization = _specializations.specializations.get(specializationData.id);

        var traitHtml = '';

        if (specializationData.traits) {
          traitHtml = specializationData.traits.reduce(function (traitHtml, traitId) {
            var trait = _traits.traits.get(traitId);

            if (trait) {
              return traitHtml + ('\n              <div class="table-item">\n                <img class="small icon" data-toggle="tooltip" data-placement="left" title="' + trait.description + '" src="' + trait.icon + '">\n                <span>' + trait.name + '</span>\n              </div>\n            ');
            } else {
              return traitHtml;
            }
          }, '');
        }

        return html + ('\n        <div class="table-item">\n          <img class="medium icon spec" src="' + specialization.icon + '" />\n          <span>' + specialization.name + '</span>\n        </div>\n        ' + traitHtml + '\n      ');
      } else {
        return html;
      }
    }, '');
  }

  function getEquipmentItemHtml(data) {
    var html = '';

    if (data) {
      var equipment = _items.items.get(data.id);

      var upgradeHtml = '';

      if (data.upgrades) {
        upgradeHtml = data.upgrades.reduce(function (upgradeHtml, upgradeId) {
          var upgrade = _items.items.get(upgradeId);

          if (upgrade) {
            return upgradeHtml + ('\n            <div class="table-item">\n              <img class="small icon item ' + upgrade.rarity + '" data-toggle="tooltip" data-placement="left" title=\'\' src="' + upgrade.icon + '">\n              <span class="bold ' + upgrade.rarity + '">' + upgrade.name + '\n                <small>(' + upgrade.level + ')</small>\n              </span>\n            </div>\n          ');
          } else {
            return upgradeHtml;
          }
        }, '');
      }

      var infusionHtml = '';

      if (data.infusions) {
        infusionHtml = data.infusions.reduce(function (infusionHtml, infusionId) {
          var infusion = _items.items.get(infusionId);

          if (infusion) {
            return infusionHtml + ('\n            <div class="table-item">\n              <img class="small icon item ' + infusion.rarity + '" data-toggle="tooltip" data-placement="left" title=\'\' src="' + infusion.icon + '">\n              <span>' + infusion.name + '</span>\n            </div>\n          ');
          } else {
            return infusionHtml;
          }
        }, '');
      }

      return html + ('\n      <div class="table-item">\n        <img data-toggle="tooltip" data-placement="left" title="" class="icon medium item ' + equipment.rarity + '" src="' + equipment.icon + '" />\n        <span class="bold ' + equipment.rarity + '">' + equipment.name + '\n          <small>(' + equipment.level + ')</small>\n        </span>\n      </div>\n      ' + upgradeHtml + '\n      ' + infusionHtml + '\n    ');
    } else {
      return html;
    }
  }

  function getBagHtml(dataList) {
    return dataList.reduce(function (html, bagData) {
      if (bagData) {
        var bag = _items.items.get(bagData.id);

        return html + ('\n        <div class="table-item">\n          <img data-toggle="tooltip" data-placement="left" title="" class="icon medium item ' + bag.rarity + '" src="' + bag.icon + '" />\n          <span class="bold ' + bag.rarity + '">' + bag.name + ' \n            <small>(' + bag.details.size + ' slots)</small>\n          </span>\n        </div>\n      ');
      } else {
        return html;
      }
    }, '');
  }

  function getInventoryHtml(dataList) {
    return dataList.reduce(function (html, item) {
      if (item) {
        return html + ('\n        <div class="table-item">\n          <img data-toggle="tooltip" data-placement="left" title="" class="icon medium item ' + item.rarity + '" src="' + item.icon + '" />\n          <span class="bold ' + item.rarity + '">' + item.name + ' \n            <small>(' + item.count + ')</small>\n          </span>\n        </div>\n      ');
      } else {
        return html;
      }
    }, '');
  }
});


define('model/gw2Data/materials',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dataRef = {};
  var loadingRef = undefined;
  var materials = exports.materials = {
    get: function get(id) {
      return dataRef[id];
    },
    load: function load() {
      if (!loadingRef) {
        var params = {
          ids: 'all',
          lang: 'en'
        };
        loadingRef = $.get('https://api.guildwars2.com/v2/materials?' + $.param(params)).done(function (categories) {
          categories.forEach(function (category) {
            dataRef[category.id] = category;
          });
        });
      }
      return loadingRef;
    }
  };
});


define('model/gw2Data/vault',['exports', 'model/apiKey'], function (exports, _apiKey) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.vault = undefined;
  var dataRef = undefined;
  var vault = exports.vault = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      var loadDeferred = new $.Deferred();
      var params = {
        access_token: _apiKey.apiKey.getKey(),
        lang: 'en'
      };
      //載入倉庫
      $.get('https://api.guildwars2.com/v2/account/materials?' + $.param(params)).done(function (materialList) {
        dataRef = materialList;
        loadDeferred.resolve(dataRef);
      });
      return loadDeferred;
    }
  };
});


define('model/gw2Data/bank',['exports', 'model/apiKey'], function (exports, _apiKey) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.bank = undefined;
  var dataRef = undefined;
  var bank = exports.bank = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      var loadDeferred = new $.Deferred();
      var params = {
        access_token: _apiKey.apiKey.getKey(),
        lang: 'en',
        page: 0
      };

      //載入銀行
      $.get('https://api.guildwars2.com/v2/account/bank?' + $.param(params)).done(function (bankData) {
        dataRef = bankData;
        loadDeferred.resolve(dataRef);
      });
      return loadDeferred;
    }
  };
});


define('model/gw2Data/inventory',['exports', 'model/apiKey', 'model/gw2Data/items', 'model/gw2Data/characters', 'model/gw2Data/materials', 'model/gw2Data/vault', 'model/gw2Data/bank'], function (exports, _apiKey, _items, _characters, _materials, _vault, _bank) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.inventory = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var dataRef = undefined;
  var inventory = exports.inventory = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      var loadDeferred = new $.Deferred();
      var params = {
        access_token: _apiKey.apiKey.getKey(),
        lang: 'en',
        page: 0
      };
      var waiting = [];

      // 載入材料分類表
      waiting.push(_materials.materials.load());

      // 載入角色包包與物品資料
      waiting.push(_characters.characters.load());

      // 載入倉庫與物品資料
      waiting.push(_vault.vault.load());

      //載入銀行
      waiting.push(_bank.bank.load());

      $.when.apply($.when, waiting).done(function () {
        var waitingLoadItems = [];
        //載入銀行物品資料
        waitingLoadItems.push(_items.items.loadByBankList(_bank.bank.get()));
        waitingLoadItems.push(_items.items.loadByVaultList(_vault.vault.get()));

        //全部載入完畢後才 merge
        $.when.apply($.when, waitingLoadItems).done(function () {

          dataRef = [];

          var characterDataRef = [];
          _characters.characters.get().forEach(function (character) {
            character._data.bags.forEach(function (bag) {
              if (bag) {
                bag.inventory.forEach(function (bagItem) {
                  if (bagItem) {
                    var itemInfo = _items.items.get(bagItem.id);
                    var position = character.name;
                    var item = new Item(position, bagItem, itemInfo);
                    characterDataRef.push(item.toJSON());
                  }
                });
              }
            });
          });
          $.merge(dataRef, characterDataRef);

          var bankDataRef = _bank.bank.get().map(function (bankItem, index) {
            if (bankItem) {
              var itemInfo = _items.items.get(bankItem.id);
              var position = 'Bank|' + (index + 1);
              var item = new Item(position, bankItem, itemInfo);
              return item.toJSON();
            }
          });
          $.merge(dataRef, bankDataRef);

          var vaultDataRef = _vault.vault.get().map(function (material, index) {
            if (material) {
              var itemInfo = _items.items.get(material.id);
              var position = 'Vault|' + (index + 1);
              var item = new Item(position, material, itemInfo);
              return item.toJSON();
            }
          });
          $.merge(dataRef, vaultDataRef);

          loadDeferred.resolve(dataRef);
        });
      });
      return loadDeferred;
    }
  };

  var Item = (function () {
    function Item(position, data, itemInfo) {
      _classCallCheck(this, Item);

      this._data = data || {};
      this._data.position = position || '';
      this._ref = itemInfo || {};
      return this;
    }

    _createClass(Item, [{
      key: 'toJSON',
      value: function toJSON() {
        var _this = this;

        var result = {};
        var keys = ['icon', 'name', 'count', 'type', 'level', 'rarity', 'position', 'binding', 'description', 'category'];
        keys.forEach(function (key) {
          result[key] = _this[key];
        });
        return result;
      }
    }, {
      key: 'icon',
      get: function get() {
        var icon = this._ref.icon || '';
        var rarity = this._ref.rarity || '';
        var description = this._ref.description || '';
        return '<img class=\'large solo item icon ' + rarity + '\' data-toggle=\'tooltip\' data-placement=\'right\' title=\'\' src=\'' + icon + '\' />';
      }
    }, {
      key: 'name',
      get: function get() {
        var name = this._ref.name || '';
        var rarity = this._ref.rarity || '';
        return '<span class="bold ' + rarity + '">' + name + '</span>';
      }
    }, {
      key: 'count',
      get: function get() {
        return parseInt(this._data.count, 10);
      }
    }, {
      key: 'type',
      get: function get() {
        return this._ref.type || '';
      }
    }, {
      key: 'level',
      get: function get() {
        return this._ref.level || '';
      }
    }, {
      key: 'rarity',
      get: function get() {
        return this._ref.rarity || '';
      }
    }, {
      key: 'position',
      get: function get() {
        return this._data.position || '';
      }
    }, {
      key: 'binding',
      get: function get() {
        var binding = this._data.binding;
        var bound_to = this._data.bound_to;

        if (binding) {
          if (bound_to) {
            return bound_to;
          } else {
            return binding;
          }
        } else {
          return '';
        }
      }
    }, {
      key: 'description',
      get: function get() {
        return this._ref.description || '';
      }
    }, {
      key: 'category',
      get: function get() {
        if (this._data.category) {
          return _materials.materials.get(this._data.category).name || '';
        } else {
          return '';
        }
      }
    }]);

    return Item;
  })();
});


define('model/gw2Data/currencies',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dataRef = {};
  var loadingRef = undefined;
  var currencies = exports.currencies = {
    get: function get(id) {
      return dataRef[id];
    },
    load: function load() {
      if (!loadingRef) {
        var params = {
          ids: 'all',
          lang: 'en'
        };
        loadingRef = $.get('https://api.guildwars2.com/v2/currencies?' + $.param(params)).done(function (currenciesData) {
          currenciesData.forEach(function (currency) {
            dataRef[currency.id] = currency;
          });
        });
      }
      return loadingRef;
    }
  };
});


define('model/gw2Data/wallet',['exports', 'model/apiKey', 'model/gw2Data/currencies'], function (exports, _apiKey, _currencies) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.wallet = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var dataRef = undefined;
  var wallet = exports.wallet = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      var loadDeferred = new $.Deferred();
      var params = {
        access_token: _apiKey.apiKey.getKey(),
        lang: 'en'
      };
      var waiting = [];
      $.get('https://api.guildwars2.com/v2/account/wallet?' + $.param(params)).done(function (walletData) {
        //載入currencies
        waiting.push(_currencies.currencies.load());

        //全部載入完畢後才resolve loadDeferred
        $.when.apply($.when, waiting).done(function () {
          dataRef = walletData.map(function (walletItem) {
            var item = new Wallet(walletItem);
            return item.toJSON();
          });
          loadDeferred.resolve(dataRef);
        });
      });
      return loadDeferred;
    }
  };

  var Wallet = (function () {
    function Wallet(data) {
      _classCallCheck(this, Wallet);

      this._data = data;
      return this;
    }

    _createClass(Wallet, [{
      key: 'toJSON',
      value: function toJSON() {
        var _this = this;

        var result = {};
        Object.keys(this._data).forEach(function (key) {
          result[key] = _this[key];
        });
        ['name', 'description', 'icon', 'order'].forEach(function (key) {
          result[key] = _this[key] || '';
        });
        return result;
      }
    }, {
      key: 'icon',
      get: function get() {
        var iconUrl = _currencies.currencies.get(this._data.id).icon || '';
        return '<img class=\'large solo icon\' src=\'' + iconUrl + '\' />';
      }
    }, {
      key: 'name',
      get: function get() {
        var name = _currencies.currencies.get(this._data.id).name || '';
        return '<span class="bold">' + name + '</span>';
      }
    }, {
      key: 'value',
      get: function get() {
        var value = this._data.value || '';

        var name = _currencies.currencies.get(this._data.id).name;

        if (name == 'Coin') {
          return getCoinHtml(value);
        } else if (name == 'Gem') {
          return '<span class=\'currency gem\'>' + value + '</span>';
        } else if (name == 'Karma') {
          return '<span class=\'currency karma\'>' + value + '</span>';
        } else if (name == 'Laurel') {
          return '<span class=\'currency laurel\'>' + value + '</span>';
        } else {
          return value;
        }
      }
    }, {
      key: 'description',
      get: function get() {
        return _currencies.currencies.get(this._data.id).description || '';
      }
    }, {
      key: 'order',
      get: function get() {
        return _currencies.currencies.get(this._data.id).order || '';
      }
    }]);

    return Wallet;
  })();

  function getCoinHtml(value) {
    var copper = value % 100;
    var silver = Math.floor(value / 100) % 100;
    var gold = Math.floor(value / 10000);
    return '\n    <div class="gold coin">\n      ' + gold + '\n      <img class="icon inline" title="gold" src="https://wiki.guildwars2.com/images/d/d1/Gold_coin.png" />\n    </div>\n    <div class="silver coin">\n      ' + silver + '\n      <img class="icon inline" title="silver" src="https://wiki.guildwars2.com/images/3/3c/Silver_coin.png" />\n    </div>\n    <div class="copper coin">\n      ' + copper + '\n      <img class="icon inline" title="copper" src="https://wiki.guildwars2.com/images/e/eb/Copper_coin.png" />\n    </div>\n  ';
  }
});


define('model/gw2Data/gw2Data',['exports', 'utils/events', 'model/apiKey', 'model/gw2Data/account', 'model/gw2Data/characters', 'model/gw2Data/inventory', 'model/gw2Data/wallet'], function (exports, _events, _apiKey, _account, _characters, _inventory, _wallet) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.gw2Data = undefined;
  var gw2Data = exports.gw2Data = {
    loadAccount: function loadAccount() {
      var _this = this;

      this.trigger('load:account');
      return _account.account.load().done(function (accountData) {
        _this.trigger('loaded:account', accountData);
      });
    },
    loadCharacters: function loadCharacters() {
      var _this2 = this;

      this.trigger('load:characters');
      return _characters.characters.load().done(function (characterList) {
        _this2.trigger('loaded:characters', characterList);
      });
    },
    loadInventory: function loadInventory() {
      var _this3 = this;

      this.trigger('load:inventory');
      return _inventory.inventory.load().done(function (inventoryData) {
        _this3.trigger('loaded:inventory', inventoryData);
      });
    },
    loadWallet: function loadWallet() {
      var _this4 = this;

      this.trigger('load:wallet');
      return _wallet.wallet.load().done(function (walletData) {
        _this4.trigger('loaded:wallet', walletData);
      });
    }
  };
  exports.default = gw2Data;
  (0, _events.eventful)(gw2Data);
});


define('view/account',['exports', 'model/gw2Data/gw2Data', 'model/apiKey'], function (exports, _gw2Data, _apiKey) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.app = undefined;
  var app = exports.app = {
    initialize: function initialize() {
      // show saved apiKey
      var savedKey = _apiKey.apiKey.getKey();
      if (savedKey) {
        $('#api_key').val(savedKey);
      }
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      $('#api_key').keypress(function (e) {
        if (e.keyCode == 13) {
          var newKey = $(this).val();
          _apiKey.apiKey.setKey(newKey);
          app.showLoading();
          _gw2Data.gw2Data.loadAccount();
          _gw2Data.gw2Data.loadCharacters();
          _gw2Data.gw2Data.loadInventory();
          _gw2Data.gw2Data.loadWallet();
        }
      });

      _gw2Data.gw2Data.on('loaded:characters', function () {
        $('#characters-status').html('Characters loaded <span class="glyphicon glyphicon-ok text-success"></span>');
      });
      _gw2Data.gw2Data.on('loaded:account', function (account) {
        $('.accountname').text(account.name);
        $('.accountid').text(account.id);
        $('.accountcreated').text(account.created);
        $('.worldname').html(account.world);
        $('.fractal_level').html(account.fractal_level);
        $('.access').html(account.access);

        $('#account-status').html('Account loaded <span class="glyphicon glyphicon-ok text-success"></span>');
      });
      _gw2Data.gw2Data.on('loaded:wallet', function () {
        $('#wallet-status').html('Wallet loaded <span class="glyphicon glyphicon-ok text-success"></span>');
      });
      _gw2Data.gw2Data.on('loaded:inventory', function () {
        $('#inventory-status').html('Inventory loaded <span class="glyphicon glyphicon-ok text-success"></span>');
      });
    },
    showLoading: function showLoading() {
      $('#account-status').parent().empty().html('\n      <p id="account-status" class="status" style="display: block;">\n        Loading account...\n      </p>\n      <p id="characters-status" class="status" style="display: block;">\n        Loading characters...\n      </p>\n      <p id="inventory-status" class="status" style="display: block;">\n        Loading inventory...\n      </p>\n      <p id="wallet-status" class="status" style="display: block;">\n        Loading wallet...\n      </p>\n    ');
    }
  };
  $(function () {
    app.initialize();
  });
});


define('view/characters',['exports', 'model/gw2Data/gw2Data'], function (exports, _gw2Data) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.characters = undefined;
  var characters = exports.characters = {
    initialize: function initialize() {
      $('#characters [data-click]').button('reset');
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      _gw2Data.gw2Data.on('loaded:characters', function (characterList) {
        var dataSet = characterList.map(function (character) {
          return [character.name, character.level, character.profession, character.race, character.gender, character.age, character.deaths, character.created, character.guild, character.crafting, character.specializations.pve, character.specializations.pvp, character.specializations.wvw, character.equipment.Helm, character.equipment.Shoulders, character.equipment.Gloves, character.equipment.Coat, character.equipment.Leggings, character.equipment.Boots, character.equipment.Backpack, character.equipment.HelmAquatic, character.equipment.Amulet, character.equipment.Accessory1, character.equipment.Accessory2, character.equipment.Ring1, character.equipment.Ring2, character.equipment.WeaponA1, character.equipment.WeaponA2, character.equipment.WeaponB1, character.equipment.WeaponB2, character.equipment.WeaponAquaticA, character.equipment.WeaponAquaticB, character.bags,
          //character.inventory.services,
          //character.inventory.special,
          character.inventory.boosts,
          //character.inventory.style,
          character.inventory.misc, character.equipment.Sickle, character.equipment.Axe, character.equipment.Pick];
        });
        $('#characters-table').DataTable({
          data: dataSet,
          destroy: true,
          pageLength: 50,
          columnDefs: [{
            targets: 0,
            render: function render(data, type, row) {
              if (data) {
                return '<span class="bold">' + data + '</span>';
              } else {
                return data;
              }
            }
          }, {
            targets: 3,
            render: function render(data, type, row) {
              return data + '<br />' + row[4];
            }
          }, {
            targets: [1, 5, 6],
            type: 'natural'
          }, {
            targets: [4, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
            visible: false
          }]
        });
        $('#characters .loading').hide();
        var table = $('#characters-table').DataTable();
        $('#characters [data-subset]').on('click tap', function () {
          table.columns('[data-toggle]').visible(false);
          table.columns('[data-toggle="' + $(this).attr('data-subset') + '"]').visible(true);
        });
        $('#characters [data-click]').on('click tap', function () {
          $(this).button('loading');
          $(this).parents('.tab-pane').children('.loading').show();
          var action = $(this).attr('data-click');
          if (action == 'refreshcharacters') {
            get_render_characters();
          }
        });
        $('#characters [data-option]').on('click tap', function () {
          var searchValue = $(this).attr("data-option");
          table.column([2]).search(searchValue).draw();
        });
      });
    }
  };
  $(function () {
    characters.initialize();
  });
  exports.default = characters;
});


define('view/inventory',['exports', 'model/gw2Data/gw2Data'], function (exports, _gw2Data) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.inventory = undefined;
  var inventory = exports.inventory = {
    initialize: function initialize() {
      $('#inventory [data-click]').button('reset');
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      _gw2Data.gw2Data.on('loaded:inventory', function (itemList) {
        var fullList = itemList.filter(function (n) {
          return n != undefined;
        });
        var dataSet = fullList.map(function (item) {
          return [item.icon, item.name, item.count, item.type, item.level, item.rarity, item.position, item.binding, 'item.description', item.category];
        });
        var table = $('#inventory-table').DataTable({
          data: dataSet,
          "destroy": true,
          "pageLength": 50,
          "order": [[6, 'asc']],
          "columnDefs": [{
            type: 'natural',
            targets: [2, 4, 6]
          }, {
            visible: false,
            targets: [8, 9]
          }],
          drawCallback: function drawCallback() {
            var api = this.api();
            $('.dataTables_length #sum').remove();
            $('.dataTables_length').append("<span id='sum'>. Current amount: " + api.column(2, { page: 'current' }).data().sum() + '</span>');
          }
        });
        $('#inventory .loading').hide();

        var searchValue = "";
        var searchCollection = "";
        // enable table search by nav bar click
        $('#inventory [data-subset]').on('click tap', function () {
          searchCollection = $(this).attr("data-subset");
          if (searchCollection == "rarity") {} else {
            if (searchCollection == "equipment") {
              searchValue = "Armor|Weapon|Trinket|UpgradeComponent|Back";
            } else if (searchCollection == "utilities") {
              searchValue = "Bag|Gathering|Tool";
            } else if (searchCollection == "toys") {
              searchValue = "";
            } else if (searchCollection == "materials") {
              searchValue = "CraftingMaterial";
            } else if (searchCollection == "misc") {
              searchValue = "Container|Trophy|Trait|Consumable|Gizmo|Minipet";
            } else if (searchCollection == "all") {
              searchValue = "";
            }
            table.column([9]).search('').column([3]).search(searchValue, true).draw();
          }
        });
        $('#inventory [data-option]').on('click tap', function () {
          searchValue = $(this).attr("data-option");
          var searchTarget = $(this).attr("data-target");
          if (searchTarget == 'rarity') {
            table.column([5]).search(searchValue).draw();
          } else if (searchTarget == 'category') {
            table.column([3]).search('').column([9]).search(searchValue).draw();
          } else {
            table.column([9]).search('').column([3]).search(searchValue).draw();
          }
        });
        // TODO: enable table refresh by navbar click
        $('#inventory [data-click]').on('click tap', function () {
          $(this).button('loading');
          $(this).parents('.tab-pane').children('.subset').removeClass('active');
          $(this).parents('.tab-pane').children('.loading').show();
          var action = $(this).attr('data-click');
          if (action == 'refreshinventory') {
            //get_render_inventory();
          }
        });
      });
    }
  };
  $(function () {
    inventory.initialize();
  });
  exports.default = inventory;
});


define('view/wallet',['exports', 'model/gw2Data/gw2Data'], function (exports, _gw2Data) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.wallet = undefined;
  var wallet = exports.wallet = {
    initialize: function initialize() {
      $('#wallet [data-click]').button('reset');
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      _gw2Data.gw2Data.on('loaded:wallet', function (walletData) {
        var dataSet = walletData.map(function (walletItem) {
          return [walletItem.icon, walletItem.name, walletItem.value, walletItem.description, walletItem.order];
        });
        $('#wallet-table').DataTable({
          data: dataSet,
          destroy: true,
          pageLength: 50,
          "order": [[4, 'asc']],
          "dom": '',
          "columnDefs": [{ type: 'natural', targets: 2 }]
        });
        $('#wallet .loading').hide();
        var table = $('#wallet-table').DataTable();
        $('#wallet [data-click]').on('click tap', function () {
          $(this).button('loading');
          $(this).parents('.tab-pane').children('.loading').show();
          var action = $(this).attr('data-click');
          if (action == 'refreshwallet') {
            get_render_wallet();
          }
        });
      });
    }
  };
  $(function () {
    wallet.initialize();
  });
  exports.default = wallet;
});


define('index.js',['view/account', 'view/characters', 'view/inventory', 'view/wallet'], function (_account, _characters, _inventory, _wallet) {
  $(function () {
    $('#tabs').tab();
    $('body').on('mouseenter', '*[data-toggle="tooltip"]', function () {
      $(this).tooltip('show');
    });
    $('body').on('mouseleave', '*[data-toggle="tooltip"]', function () {
      $(this).tooltip('hide');
    });
    $('.tab-pane [data-subset]').on('click tap', function () {
      $(this).parents('.tab-pane').children('.subset').removeClass('active').filter('#' + $(this).attr('data-subset')).addClass('active');
    });
    $('[data-click="toggleAbout"]').on('click tap', function () {
      $('#about').slideToggle();
    });
  });
});

require(['index.js']);