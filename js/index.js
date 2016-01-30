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


define('model/fileURL',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var storage = localStorage.getItem('debaterData');
  var url = undefined;

  if (storage) {
    if (storage.indexOf('current') > -1) {
      url = JSON.parse(storage);
    } else {
      url = {
        current: storage,
        recent: {}
      };
    }
  }

  var fileURL = exports.fileURL = {
    getURL: function getURL() {
      if (url) {
        return url.current;
      } else {
        return null;
      }
    },
    setURL: function setURL(fileURL) {
      if (!url) {
        url = { current: '', recent: {} };
      } else if (!url.current) {
        url = { current: '', recent: {} };
      }
      url.current = fileURL;
      localStorage.setItem('debaterData', JSON.stringify(url));
      history.pushState({}, '', '?source=' + fileURL);
    },
    getHistory: function getHistory() {
      return url.recent;
    },
    setHistory: function setHistory(fileURL, docTitle) {
      if (!url) {
        url = { current: '', recent: {} };
      } else if (!url.recent) {
        url = { current: '', recent: {} };
      }
      url.recent[fileURL] = docTitle;
      localStorage.setItem('debaterData', JSON.stringify(url));
    },
    clearHistory: function clearHistory() {
      localStorage.removeItem('debaterData');
    }
  };
  exports.default = fileURL;
});


define('model/fileSource',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var source = '';
  var fileSource = exports.fileSource = {
    get: function get() {
      return source;
    },
    set: function set(fileSource) {
      source = fileSource;
    }
  };
  exports.default = fileSource;
});


define('model/fileUploaded',['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var uploaded = undefined;
  var result = undefined;
  var fileUploaded = exports.fileUploaded = {
    getResult: function getResult() {
      console.log(result);
      return result;
    },
    getUploaded: function getUploaded() {
      return uploaded;
    },
    load: function load(file) {
      var loadDeferred = new $.Deferred();
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.

        if (file) {
          var reader = new FileReader();
          reader.onload = function (event) {
            result = event.target.result;
            loadDeferred.resolve(result);
            //console.log(loadDeferred);
          };
          reader.readAsText(file);
          return loadDeferred;
        } else {
          return;
        }
      } else {
        alert('The File APIs are not fully supported in this browser.');
      }
    },
    set: function set(file) {
      uploaded = file;
    }
  };
  exports.default = fileUploaded;
});


define('model/recordData/file',['exports', 'model/fileURL', 'model/fileSource', 'model/fileUploaded'], function (exports, _fileURL, _fileSource, _fileUploaded) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.file = undefined;

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
  var file = exports.file = {
    get: function get(key) {
      return dataRef[key];
    },
    load: function load() {
      dataRef = {};
      var loadDeferred = new $.Deferred();
      if (_fileSource.fileSource.get() == 'web') {
        var url = _fileURL.fileURL.getURL();
        $.get(url).done(function (fileData) {
          var file = new File(fileData);
          dataRef = file.toJSON();
          loadDeferred.resolve(dataRef);
        });
        return loadDeferred;
      } else if (_fileSource.fileSource.get() == 'local') {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          // Great success! All the File APIs are supported.

          _fileUploaded.fileUploaded.load(_fileUploaded.fileUploaded.getUploaded()).done(function (result) {
            var file = new File(result);
            dataRef = file.toJSON();
            loadDeferred.resolve(dataRef);
          });
          return loadDeferred;
        } else {
          alert('The File APIs are not fully supported in this browser.');
        }
      }
    }
  };

  var File = (function () {
    function File(fileData) {
      _classCallCheck(this, File);

      this._data = getFileJSON(fileData);
      return this;
    }

    _createClass(File, [{
      key: 'toJSON',
      value: function toJSON() {
        var _this = this;

        var result = {};
        Object.keys(this._data).forEach(function (key) {
          result[key] = _this._data[key];
        });
        return result;
      }
    }]);

    return File;
  })();

  function getFileJSON(fileData) {
    var file = {
      title: "",
      authors: [],
      points: [],
      professions: [],
      relations: [],
      topics: {}
    };
    var lines = fileData.split("\n");
    var meta = '';
    var parents = [];

    function setParent(topic, level) {
      if (file.topics[topic]) {
        file.topics[topic].parent = parents[level];
      } else {
        file.topics[topic] = {
          name: topic,
          count: 0,
          parent: parents[level]
        };
      }

      parents[level + 1] = topic;
    }

    ;
    $.each(lines, function (index, line) {
      if (line) {
        if (file.title.length == 0 && line[0] != '#') {
          file.title = line;
        } else if (line.startsWith('# ')) {
          file.authors.push({
            name: line.substring(2)
          });
        } else if (line.startsWith('## 個人頁面')) {
          meta = 'profiles';
          file.authors[file.authors.length - 1][meta] = [];
        } else if (line.startsWith('## 關係')) {
          meta = 'relations';
          file.authors[file.authors.length - 1][meta] = [];
        } else if (line.startsWith('## 職業')) {
          meta = 'professions';
          file.authors[file.authors.length - 1][meta] = [];
        } else if (line.startsWith('## 文章')) {
          meta = 'posts';
          file.authors[file.authors.length - 1][meta] = [];
        } else if (line.startsWith('### ')) {
          var post = {
            timestamp: line.substring(4, line.indexOf('http')).trim(),
            url: line.substring(line.indexOf('http')).trim()
          };
          file.authors[file.authors.length - 1]['posts'].push(post);
        } else if (line.startsWith('___')) {
          meta = 'structure';
        } else if (line.startsWith('- ')) {
          if (meta == 'posts') {
            if (!line.includes('#')) {
              return;
            }

            var topics = [];

            if (line.indexOf('#') > 0) {
              topics = line.substring(line.indexOf('#') + 1).split('#').map(function (topic) {
                return topic.trim();
              });
            }

            var relations = file.authors[file.authors.length - 1]['relations'] || '';
            var professions = file.authors[file.authors.length - 1]['professions'] || '';
            var point = {
              author: file.authors[file.authors.length - 1].name,
              timestamp: file.authors[file.authors.length - 1]['posts'][file.authors[file.authors.length - 1]['posts'].length - 1].timestamp,
              url: file.authors[file.authors.length - 1]['posts'][file.authors[file.authors.length - 1]['posts'].length - 1].url,
              relations: relations,
              professions: professions,
              topics: topics,
              content: line.substring(2, line.indexOf('#'))
            };
            file.points.push(point);
            topics.forEach(function (topic) {
              if (file.topics[topic]) {
                file.topics[topic].count += 1;
              } else {
                file.topics[topic] = {
                  name: topic,
                  count: 1
                };
              }
            });
            file.relations = file.relations.concat(relations).filter(function (item, pos, self) {
              return self.indexOf(item) == pos;
            });
            ;
            file.professions = file.professions.concat(professions).filter(function (item, pos, self) {
              return self.indexOf(item) == pos;
            });
            ;
          } else if (meta == 'structure') {
            var current = line.replace('- ', '').trim();

            if (file.topics[current]) {
              file.topics[current].parent = '';
            } else {
              file.topics[current] = {
                name: current,
                count: 0,
                parent: ''
              };
            }

            parents[0] = current;
            return;
          } else {
            file.authors[file.authors.length - 1][meta].push(line.substring(2));
          }
        } else if (line.startsWith('  - ')) {
          if (meta == 'structure') {
            var current = line.replace('  - ', '').trim();
            setParent(current, 0);
          }
        } else if (line.startsWith('    - ')) {
          if (meta == 'structure') {
            var current = line.replace('    - ', '').trim();
            setParent(current, 1);
          }
        } else if (line.startsWith('      - ')) {
          if (meta == 'structure') {
            var current = line.replace('      - ', '').trim();
            setParent(current, 2);
          }
        } else if (line.startsWith('        - ')) {
          if (meta == 'structure') {
            var current = line.replace('        - ', '').trim();
            setParent(current, 3);
          }
        } else {}
      }
    });
    return file;
  }
});


define('model/recordData/authors',['exports', 'model/recordData/file'], function (exports, _file) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.authors = undefined;

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
  var authors = exports.authors = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      var loadDeferred = new $.Deferred();
      var waiting = [];
      waiting.push(_file.file.load());
      $.when.apply($.when, waiting).done(function () {
        dataRef = _file.file.authors.map(function (authorData) {
          var author = new Author(authorData);
          return author.toJSON();
        });
        loadDeferred.resolve(dataRef);
      });
      return loadDeferred;
    }
  };

  var Author = (function () {
    function Author(data) {
      _classCallCheck(this, Author);

      this._data = data;
      return this;
    }

    _createClass(Author, [{
      key: 'toJSON',
      value: function toJSON() {
        var _this = this;

        var result = {};
        Object.keys(this._data).forEach(function (key) {
          result[key] = _this[key] || "";
        });
        return result;
      }
    }, {
      key: 'name',
      get: function get() {
        return 'author name string';
      }
    }, {
      key: 'profiles',
      get: function get() {
        return 'author profiles array';
      }
    }, {
      key: 'professions',
      get: function get() {
        return 'author professions array';
      }
    }, {
      key: 'relations',
      get: function get() {
        return 'author relations array';
      }
    }, {
      key: 'posts',
      get: function get() {
        return 'author posts array';
      }
    }]);

    return Author;
  })();
});


define('model/recordData/professions',['exports', 'model/recordData/file'], function (exports, _file) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.professions = undefined;

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
  var professions = exports.professions = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      dataRef = [];
      $('#professions').html('<li class="active"><a data-profession="">所有職業</a></li>');
      var loadDeferred = new $.Deferred();
      var waiting = [];
      waiting.push(_file.file.load());
      $.when.apply($.when, waiting).done(function () {
        var professions = _file.file.get('professions') || [];
        function remove(arr, what) {
          var found = arr.indexOf(what);

          while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
          }
        }
        remove(professions, "");
        dataRef = professions.map(function (professionData) {
          var profession = new Profession(professionData);
          return profession.toHTML();
        });
        loadDeferred.resolve(dataRef);
        if (dataRef.length == 0) {
          $('#professions').html('');
        }
      });
      return loadDeferred;
    }
  };

  var Profession = (function () {
    function Profession(data) {
      _classCallCheck(this, Profession);

      this._data = data;
      return this;
    }

    _createClass(Profession, [{
      key: 'toHTML',
      value: function toHTML() {
        return '\n      <li>\n        <a data-profession=\'' + this._data + '\'>' + this._data + '\n        </a>\n      </li>';
      }
    }]);

    return Profession;
  })();
});


define('model/recordData/relations',['exports', 'model/recordData/file'], function (exports, _file) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.relations = undefined;

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
  var relations = exports.relations = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      dataRef = [];
      $('#relations').html('<li class="active"><a data-relation="">所有關係人</a></li>');
      var loadDeferred = new $.Deferred();
      var waiting = [];
      waiting.push(_file.file.load());
      $.when.apply($.when, waiting).done(function () {
        var relations = _file.file.get('relations') || [];
        function remove(arr, what) {
          var found = arr.indexOf(what);

          while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
          }
        }
        remove(relations, "");
        dataRef = relations.map(function (relationData) {
          var relation = new Relation(relationData);
          return relation.toHTML();
        });
        loadDeferred.resolve(dataRef);
        if (dataRef.length == 0) {
          $('#relations').html('');
        }
      });
      return loadDeferred;
    }
  };

  var Relation = (function () {
    function Relation(data) {
      _classCallCheck(this, Relation);

      this._data = data;
      return this;
    }

    _createClass(Relation, [{
      key: 'toHTML',
      value: function toHTML() {
        return '\n      <li>\n        <a data-relation=\'' + this._data + '\'>' + this._data + '\n        </a>\n      </li>';
      }
    }]);

    return Relation;
  })();
});


define('model/recordData/topics',['exports', 'model/recordData/file'], function (exports, _file) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.topics = undefined;

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
  var topics = exports.topics = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      dataRef = [];
      $('#topics').html('<li data-topic="" class="active"><a>所有主題 <span class="badge badge-light"></span></a></li>');
      var loadDeferred = new $.Deferred();
      var waiting = [];
      waiting.push(_file.file.load());
      $.when.apply($.when, waiting).done(function () {
        var topics = _file.file.get('topics');
        Object.keys(topics).forEach(function (topicName) {
          var topic = new Topic(topics[topicName].count, topics[topicName].name, topics[topicName].parent);
          dataRef.push(topic.toHTML());
        });
        loadDeferred.resolve(dataRef);
      });
      return loadDeferred;
    }
  };

  var Topic = (function () {
    function Topic(count, name, parent) {
      _classCallCheck(this, Topic);

      this._name = name;
      this._count = count;
      this._parent = parent || '';
      return this;
    }

    _createClass(Topic, [{
      key: 'toHTML',
      value: function toHTML() {
        return '\n      <li class=\'topic\' data-topic=\'' + this._name + '\' data-parent=\'' + this._parent + '\'>\n        <a>' + this._name + ' \n          <span class=\'badge badge-light\'>' + this._count + '</span>\n        </a>\n      </li>';
      }
    }]);

    return Topic;
  })();
});


define('model/recordData/points',['exports', 'model/recordData/file'], function (exports, _file) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.points = undefined;

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
  var points = exports.points = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      $('#points').html('');
      var loadDeferred = new $.Deferred();
      var waiting = [];
      waiting.push(_file.file.load());
      $.when.apply($.when, waiting).done(function () {
        dataRef = _file.file.get('points').map(function (pointData) {
          var point = new Point(pointData);
          return point.toHTML();
        });
        loadDeferred.resolve(dataRef);
      });
      return loadDeferred;
    }
  };

  var Point = (function () {
    function Point(data) {
      _classCallCheck(this, Point);

      this._data = data;
      return this;
    }

    _createClass(Point, [{
      key: 'toHTML',
      value: function toHTML() {
        var topics = this._data.topics || [];
        topics = topics.map(function (topic) {
          return '<span data-topic=\'' + topic + '\'></span>';
        }).join("");
        var relations = this._data.relations || [];
        relations = relations.map(function (relation) {
          return '<span data-relation=\'' + relation + '\'></span>';
        }).join("");
        var professions = this._data.professions || [];
        professions = professions.map(function (profession) {
          return '<span data-profession=\'' + profession + '\'></span>';
        }).join("");
        return '\n      <blockquote class=\'point\' data-timestamp="' + this._data.timestamp + '" cite="' + this._data.url + '">\n        <p>' + this._data.content + '</p>\n        <div class="align-right small">\n          <a href="' + this._data.url + '">' + this._data.timestamp + '</a> by <a href="">' + this._data.author + '</a>\n        </div>\n        <div class="align-right clear">\n          ' + topics + '\n          ' + relations + '\n          ' + professions + '\n        </div>\n      </blockquote>\n    ';
      }
    }]);

    return Point;
  })();
});


define('model/recordData/recordData',['exports', 'utils/events', 'model/recordData/file', 'model/recordData/authors', 'model/recordData/professions', 'model/recordData/relations', 'model/recordData/topics', 'model/recordData/points'], function (exports, _events, _file, _authors, _professions, _relations, _topics, _points) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.recordData = undefined;
  var recordData = exports.recordData = {
    loadFile: function loadFile() {
      var _this = this;

      this.trigger('load:file');
      return _file.file.load().done(function (fileData) {
        _this.trigger('loaded:file', fileData);
      });
    },
    loadAuthors: function loadAuthors() {
      var _this2 = this;

      this.trigger('load:authors');
      return _authors.authors.load().done(function (authorsData) {
        _this2.trigger('loaded:authors', authorsData);
      });
    },
    loadProfessions: function loadProfessions() {
      var _this3 = this;

      this.trigger('load:professions');
      return _professions.professions.load().done(function (professionsData) {
        _this3.trigger('loaded:professions', professionsData);
      });
    },
    loadRelations: function loadRelations() {
      var _this4 = this;

      this.trigger('load:relations');
      return _relations.relations.load().done(function (relationsData) {
        _this4.trigger('loaded:relations', relationsData);
      });
    },
    loadTopics: function loadTopics() {
      var _this5 = this;

      this.trigger('load:topics');
      return _topics.topics.load().done(function (topicsData) {
        _this5.trigger('loaded:topics', topicsData);
      });
    },
    loadPoints: function loadPoints() {
      var _this6 = this;

      this.trigger('load:points');
      return _points.points.load().done(function (pointsData) {
        _this6.trigger('loaded:points', pointsData);
      });
    }
  };
  exports.default = recordData;
  (0, _events.eventful)(recordData);
});


define('view/home',['exports', 'model/recordData/recordData', 'model/fileURL', 'model/fileSource', 'model/fileUploaded'], function (exports, _recordData, _fileURL, _fileSource, _fileUploaded) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.app = undefined;
  var app = exports.app = {
    initialize: function initialize() {
      // show saved fileURL
      var savedURL = _fileURL.fileURL.getURL();
      if (savedURL) {
        $('#fileURL #current').val(savedURL);
        this.drawHistory();
      }
      this.bindEvents();
    },
    drawHistory: function drawHistory() {
      $('#fileURL #recent').html(function () {
        var savedURLHistory = _fileURL.fileURL.getHistory();
        if (savedURLHistory) {
          var html = '';
          Object.keys(savedURLHistory).forEach(function (key) {
            html += '\n            <li>\n              <a data-url=\'' + key + '\'>' + savedURLHistory[key] + '</a>\n            </li>\n          ';
          });
          html += '\n            <li role="separator" class="divider"></li>\n            <li>\n              <a data-action="clear">Clear Hostory</a>\n            </li>\n        ';
          return html;
        }
      });
    },
    bindEvents: function bindEvents() {
      var _this = this;

      var newURL = undefined;
      function loadPage() {
        _recordData.recordData.loadFile();
        _recordData.recordData.loadTopics();
        _recordData.recordData.loadRelations();
        _recordData.recordData.loadProfessions();
        _recordData.recordData.loadPoints();
      }

      var matchQuery = undefined;
      if (matchQuery = location.href.match(/(s|source)=(http.*)/)) {
        _fileSource.fileSource.set('web');
        newURL = decodeURIComponent(matchQuery[2]);
        _fileURL.fileURL.setURL(newURL);
        loadPage();
      }

      // source: web
      $('#fileURL #current').keypress(function (e) {
        if (e.keyCode == 13) {
          _fileSource.fileSource.set('web');
          newURL = $(this).val();
          _fileURL.fileURL.setURL(newURL);
          loadPage();
        }
      });
      // retrive history
      $('#fileURL #recent').on('click tap', '[data-url]', function (e) {
        _fileSource.fileSource.set('web');
        newURL = $(this).attr('data-url');
        $('#fileURL #current').val(newURL);
        _fileURL.fileURL.setURL(newURL);
        loadPage();
      });
      // clear history
      $('#fileURL #recent').on('click tap', '[data-action="clear"]', function (e) {
        $('#fileURL #current').val('');
        _fileURL.fileURL.clearHistory();
        $('#fileURL #recent').html('<li><a>Hmmm. No history yet.</a></li>');
      });

      // source: local
      $('#fileChooser input').change(function (e) {
        _fileSource.fileSource.set('local');
        var file = e.target.files[0];
        _fileUploaded.fileUploaded.set(file);
        loadPage();
      });

      // data processing
      _recordData.recordData.on('loaded:file', function (file) {
        $('#title').html(file.title);
        $('title').prepend(file.title + ' | ');
        if (_fileSource.fileSource.get() == 'web') {
          _fileURL.fileURL.setHistory(newURL, file.title);
          _this.drawHistory();
        }
      });
      _recordData.recordData.on('loaded:topics', function (topics) {
        topics.forEach(function (topic) {
          $('#topics').append(topic);
        });
        //$('#topics .topic').sort(function(a,b) {
        //  return $(a).data('topic') > $(b).data('topic');
        //}).appendTo('#topics');
        $('#topics .topic').each(function (index, element) {
          var parent = $(element).data('parent');
          var selector = '#topics .topic[data-topic="' + parent + '"]';
          if ($(selector + ' ul').length == 0) {
            $(selector).append('<ul class="nav-pills-nested"></ul>');
          }
          $(selector + ' ul').append(element);
        });
      });
      _recordData.recordData.on('loaded:relations', function (relations) {
        relations.forEach(function (relation) {
          $('#relations').append(relation);
        });
      });
      _recordData.recordData.on('loaded:professions', function (professions) {
        professions.forEach(function (profession) {
          $('#professions').append(profession);
        });
      });
      _recordData.recordData.on('loaded:points', function (points) {
        points.forEach(function (point) {
          $('#points').append(point);
        });
        $('#points .point').sort(function (a, b) {
          return $(a).data('timestamp') > $(b).data('timestamp');
        }).appendTo('#points');
        $('#topics [data-topic=""] .badge').html($('#points .point').length);
      });
    }
  };
  $(function () {
    app.initialize();
  });
});


define('index.js',['view/home'], function (_home) {
  $(function () {
    $('#fileChooser').toggle();
    $('[data-click="toggleAbout"]').on('click tap', function () {
      $('#about').slideToggle();
    });
    $('[data-source]').on('click tap', function (e) {
      $('#fileURL, #fileChooser').toggle();
      $('[data-source]').toggleClass('btn-active');
    });

    function filterPoints(filters) {
      Object.keys(filters).forEach(function (key) {
        $('#points .point').has('[data-' + key + '="' + filters[key] + '"]').css('display', 'block');
        $('#points .point').not($('#points .point').has('[data-' + key + '="' + filters[key] + '"]')).css('display', 'none');
      });
    }

    var filters = {};
    $('#topics').on('click tap', '[data-topic]', function (e) {
      e.stopPropagation();
      var topic = $(this).attr('data-topic');

      if (topic.length > 0) {
        filters.topic = topic;
      } else {
        delete filters.topic;
      }

      $('#topics [data-topic]').removeClass('active');
      $(this).addClass('active');
      filterPoints(filters);
    });
    $('#relations').on('click tap', '[data-relation]', function () {
      var relation = $(this).attr('data-relation');

      if (relation.length > 0) {
        filters.relation = relation;
      } else {
        delete filters.relation;
      }

      $('#relations li').removeClass('active');
      $(this).parents('li').addClass('active');
      filterPoints(filters);
    });
    $('#professions').on('click tap', '[data-profession]', function () {
      var profession = $(this).attr('data-profession');

      if (profession.length > 0) {
        filters.profession = profession;
      } else {
        delete filters.profession;
      }

      $('#professions li').removeClass('active');
      $(this).parents('li').addClass('active');
      filterPoints(filters);
    });
  });
});

require(['index.js']);