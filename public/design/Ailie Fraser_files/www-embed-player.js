(function(){var l;function aa(a,b){function c(){}
c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]}
for(var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ca="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,da=["String",
"prototype","startsWith"],ga=0;ga<da.length-1;ga++){var ha=da[ga];ha in ca||(ca[ha]={});ca=ca[ha]}
var ia=da[da.length-1],ja=ca[ia],ka=ja?ja:function(a,b){var c;if(null==this)throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");if(a instanceof RegExp)throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");c=this+"";a+="";for(var d=c.length,e=a.length,f=Math.max(0,Math.min(b|0,c.length)),g=0;g<e&&f<d;)if(c[f++]!=a[g++])return!1;return g>=e};
ka!=ja&&null!=ka&&ba(ca,ia,{configurable:!0,writable:!0,value:ka});var n=this;function p(a){return void 0!==a}
function q(a,b,c){a=a.split(".");c=c||n;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&p(b)?c[d]=b:c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}}
function r(a,b){for(var c=a.split("."),d=b||n,e;e=c.shift();)if(null!=d[e])d=d[e];else return null;return d}
function t(){}
function la(a){a.ma=void 0;a.getInstance=function(){return a.ma?a.ma:a.ma=new a}}
function ma(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function na(a){return"array"==ma(a)}
function oa(a){var b=ma(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function u(a){return"string"==typeof a}
function pa(a){return"function"==ma(a)}
function qa(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function ra(a){return a[sa]||(a[sa]=++ua)}
var sa="closure_uid_"+(1E9*Math.random()>>>0),ua=0;function va(a,b,c){return a.call.apply(a.bind,arguments)}
function wa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function v(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?v=va:v=wa;return v.apply(null,arguments)}
function w(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}}
var x=Date.now||function(){return+new Date};
function z(a,b){function c(){}
c.prototype=b.prototype;a.A=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.ob=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}}
;var xa=document,A=window;function B(a){if(Error.captureStackTrace)Error.captureStackTrace(this,B);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
z(B,Error);B.prototype.name="CustomError";var ya=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function za(a,b){return a<b?-1:a>b?1:0}
function Aa(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var Ba=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;
if(u(a))return u(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},C=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=u(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ca=Array.prototype.map?function(a,b,c){return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=u(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));
return e};
function Da(a,b){var c;a:{c=a.length;for(var d=u(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:u(a)?a.charAt(c):a[c]}
function Ea(a,b){var c=Ba(a,b);0<=c&&Array.prototype.splice.call(a,c,1)}
function Fa(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Ga(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(oa(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function Ha(a,b){this.b=p(a)?a:0;this.f=p(b)?b:0}
Ha.prototype.equals=function(a){return a instanceof Ha&&(this==a?!0:this&&a?this.b==a.b&&this.f==a.f:!1)};
Ha.prototype.ceil=function(){this.b=Math.ceil(this.b);this.f=Math.ceil(this.f);return this};
Ha.prototype.floor=function(){this.b=Math.floor(this.b);this.f=Math.floor(this.f);return this};
Ha.prototype.round=function(){this.b=Math.round(this.b);this.f=Math.round(this.f);return this};function Ia(a,b){this.width=a;this.height=b}
l=Ia.prototype;l.aspectRatio=function(){return this.width/this.height};
l.isEmpty=function(){return!(this.width*this.height)};
l.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
l.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
l.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function Ja(a){Ja[" "](a);return a}
Ja[" "]=t;function Ka(a,b){var c=La;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)}
;function Ma(){var a=Na;try{var b;if(b=!!a&&null!=a.location.href)a:{try{Ja(a.foo);b=!0;break a}catch(c){}b=!1}return b}catch(c){return!1}}
;var Oa=function(){var a=!1;try{var b=Object.defineProperty({},"passive",{get:function(){a=!0}});
n.addEventListener("test",null,b)}catch(c){}return a}();var Pa=!1,Qa="";function Ra(a){a=a.match(/[\d]+/g);if(!a)return"";a.length=3;return a.join(".")}
(function(){if(navigator.plugins&&navigator.plugins.length){var a=navigator.plugins["Shockwave Flash"];if(a&&(Pa=!0,a.description)){Qa=Ra(a.description);return}if(navigator.plugins["Shockwave Flash 2.0"]){Pa=!0;Qa="2.0.0.11";return}}if(navigator.mimeTypes&&navigator.mimeTypes.length&&(a=navigator.mimeTypes["application/x-shockwave-flash"],Pa=!(!a||!a.enabledPlugin))){Qa=Ra(a.enabledPlugin.description);return}try{var b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");Pa=!0;Qa=Ra(b.GetVariable("$version"));
return}catch(c){}try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");Pa=!0;Qa="6.0.21";return}catch(c){}try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),Pa=!0,Qa=Ra(b.GetVariable("$version"))}catch(c){}})();
var Sa=Pa,Ta=Qa;var D;a:{var Ua=n.navigator;if(Ua){var Va=Ua.userAgent;if(Va){D=Va;break a}}D=""}function F(a){return-1!=D.indexOf(a)}
;function Wa(a){var b=Xa,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function Ya(){var a=H,b;for(b in a)return!1;return!0}
function Za(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function $a(a){var b={},c;for(c in a)b[c]=a[c];return b}
var ab="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function bb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ab.length;f++)c=ab[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;function cb(){return(F("Chrome")||F("CriOS"))&&!F("Edge")}
;function db(){return F("iPhone")&&!F("iPod")&&!F("iPad")}
;var eb=F("Opera"),I=F("Trident")||F("MSIE"),fb=F("Edge"),gb=F("Gecko")&&!(-1!=D.toLowerCase().indexOf("webkit")&&!F("Edge"))&&!(F("Trident")||F("MSIE"))&&!F("Edge"),hb=-1!=D.toLowerCase().indexOf("webkit")&&!F("Edge"),ib=F("Macintosh"),jb=F("Windows"),kb=F("Android"),lb=db(),mb=F("iPad"),nb=F("iPod");function ob(){var a=n.document;return a?a.documentMode:void 0}
var pb;a:{var qb="",rb=function(){var a=D;if(gb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(fb)return/Edge\/([\d\.]+)/.exec(a);if(I)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(hb)return/WebKit\/(\S+)/.exec(a);if(eb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
rb&&(qb=rb?rb[1]:"");if(I){var sb=ob();if(null!=sb&&sb>parseFloat(qb)){pb=String(sb);break a}}pb=qb}var tb=pb,La={};
function J(a){return Ka(a,function(){for(var b=0,c=ya(String(tb)).split("."),d=ya(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;b=za(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||za(0==g[2].length,0==h[2].length)||za(g[2],h[2]);g=g[3];h=h[3]}while(0==b)}return 0<=b})}
var ub;var vb=n.document;ub=vb&&I?ob()||("CSS1Compat"==vb.compatMode?parseInt(tb,10):5):void 0;(function(){var a;return jb?(a=/Windows NT ([0-9.]+)/,(a=a.exec(D))?a[1]:"0"):ib?(a=/10[_.][0-9_.]+/,(a=a.exec(D))?a[0].replace(/_/g,"."):"10"):kb?(a=/Android\s+([^\);]+)(\)|;)/,(a=a.exec(D))?a[1]:""):lb||mb||nb?(a=/(?:iPhone|CPU)\s+OS\s+(\S+)/,(a=a.exec(D))?a[1].replace(/_/g,"."):""):""})();var wb=F("Firefox"),xb=db()||F("iPod"),yb=F("iPad"),zb=F("Android")&&!(cb()||F("Firefox")||F("Opera")||F("Silk")),Ab=cb(),Bb=F("Safari")&&!(cb()||F("Coast")||F("Opera")||F("Edge")||F("Silk")||F("Android"))&&!(db()||F("iPad")||F("iPod"));function Cb(a){return(a=a.exec(D))?a[1]:""}
(function(){if(wb)return Cb(/Firefox\/([0-9.]+)/);if(I||fb||eb)return tb;if(Ab)return db()||F("iPad")||F("iPod")?Cb(/CriOS\/([0-9.]+)/):Cb(/Chrome\/([0-9.]+)/);if(Bb&&!(db()||F("iPad")||F("iPod")))return Cb(/Version\/([0-9.]+)/);if(xb||yb){var a=/Version\/(\S+).*Mobile\/(\S+)/.exec(D);if(a)return a[1]+"."+a[2]}else if(zb)return(a=Cb(/Android\s+([0-9.]+)/))?a:Cb(/Version\/([0-9.]+)/);return""})();!gb&&!I||I&&9<=Number(ub)||gb&&J("1.9.1");I&&J("9");function Db(){this.b="";this.f=Eb}
Db.prototype.la=!0;Db.prototype.ka=function(){return this.b};
var Eb={};function Fb(){this.b="";this.f=Gb}
Fb.prototype.la=!0;Fb.prototype.ka=function(){return this.b};
function Hb(a){return a instanceof Fb&&a.constructor===Fb&&a.f===Gb?a.b:"type_error:SafeUrl"}
var Ib=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;function Jb(a){if(a instanceof Fb)return a;a=a.la?a.ka():String(a);Ib.test(a)||(a="about:invalid#zClosurez");return Kb(a)}
var Gb={};function Kb(a){var b=new Fb;b.b=a;return b}
Kb("about:blank");function Lb(){this.b=""}
Lb.prototype.la=!0;Lb.prototype.ka=function(){return this.b};
function Mb(a){var b=new Lb;b.b=a;return b}
Mb("<!DOCTYPE html>");Mb("");Mb("<br>");function Nb(a,b){var c;c=b instanceof Fb?b:Jb(b);a.href=Hb(c)}
;function Ob(a){var b=document;return u(a)?b.getElementById(a):a}
function Pb(a){if(!a)return null;if(a.firstChild)return a.firstChild;for(;a&&!a.nextSibling;)a=a.parentNode;return a?a.nextSibling:null}
function Qb(a){if(!a)return null;if(!a.previousSibling)return a.parentNode;for(a=a.previousSibling;a&&a.lastChild;)a=a.lastChild;return a}
function Rb(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;function Sb(a){Tb();var b=new Db;b.b=a;return b}
var Tb=t;function Ub(a){"number"==typeof a&&(a=Math.round(a)+"px");return a}
;var Vb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function K(a){return a.match(Vb)}
function Wb(a){return a?decodeURI(a):a}
function Xb(a){if(a[1]){var b=a[0],c=b.indexOf("#");0<=c&&(a.push(b.substr(c)),a[0]=b=b.substr(0,c));c=b.indexOf("?");0>c?a[1]="?":c==b.length-1&&(a[1]=void 0)}return a.join("")}
function Yb(a,b,c){if(na(b))for(var d=0;d<b.length;d++)Yb(a,String(b[d]),c);else null!=b&&c.push("&",a,""===b?"":"=",encodeURIComponent(String(b)))}
function Zb(a,b){for(var c in b)Yb(c,b[c],a);return a}
;var $b=!!window.google_async_iframe_id,Na=$b&&window.parent||window;function ac(a,b){var c=bc();this.label=a;this.type=b;this.value=c;this.duration=0;this.uniqueId=this.label+"_"+this.type+"_"+Math.random()}
;function cc(a,b){this.events=[];this.f=b||n;var c=null;b&&(b.google_js_reporting_queue=b.google_js_reporting_queue||[],this.events=b.google_js_reporting_queue,c=b.b);this.b=null!=c?c:Math.random()<a}
function bc(){var a=n.performance;return a&&a.now?a.now():x()}
cc.prototype.g=function(a){var b=this.f.performance;a&&b&&b.clearMarks&&(b.clearMarks("goog_"+a.uniqueId+"_start"),b.clearMarks("goog_"+a.uniqueId+"_end"))};
cc.prototype.start=function(a,b){if(!this.b)return null;var c=new ac(a,b),d=this.f.performance;d&&d.mark&&d.mark("goog_"+c.uniqueId+"_start");return c};
cc.prototype.end=function(a){if(this.b){a.duration=bc()-a.value;var b=this.f.performance;b&&b.mark&&b.mark("goog_"+a.uniqueId+"_end");this.b&&this.events.push(a)}};var dc;if($b&&!Ma()){var ec="."+xa.domain;try{for(;2<ec.split(".").length&&!Ma();)xa.domain=ec=ec.substr(ec.indexOf(".")+1),Na=window.parent}catch(a){}Ma()||(Na=window)}dc=Na;var fc=new cc(1,dc);function gc(){dc.b||(C(fc.events,fc.g,fc),fc.events.length=0,fc.b=!1)}
if("complete"==dc.document.readyState)gc();else if(fc.b){var hc=function(){gc()};
dc.addEventListener?dc.addEventListener("load",hc,Oa?void 0:!1):dc.attachEvent&&dc.attachEvent("onload",hc)};var ic=(new Date).getTime();function jc(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a&&"android-app"!==a&&"chrome-search"!==a)throw Error("Invalid URI scheme in origin");var c="",d=b.indexOf(":");if(-1!=d){var e=b.substring(d+
1),b=b.substring(0,d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c}
;/*
 gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
var kc=window,lc=document,mc=kc.location;function nc(){}
var oc=/\[native code\]/;function L(a,b,c){return a[b]=a[b]||c}
function pc(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1}
function qc(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a.length;d++){var e=a[d];e!=c&&b.push(e);c=e}return b}
function M(){var a;if((a=Object.create)&&oc.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a}
var rc=L(kc,"gapi",{});var N;N=L(kc,"___jsl",M());L(N,"I",0);L(N,"hel",10);function sc(){var a=mc.href,b;if(N.dpo)b=N.h;else{b=N.h;var c=RegExp("([#].*&|[#])jsh=([^&#]*)","g"),d=RegExp("([?#].*&|[?#])jsh=([^&#]*)","g");if(a=a&&(c.exec(a)||d.exec(a)))try{b=decodeURIComponent(a[2])}catch(e){}}return b}
function tc(a){var b=L(N,"PQ",[]);N.PQ=[];var c=b.length;if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)}
function uc(a){return L(L(N,"H",M()),a,M())}
;function vc(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;y=m=0}
function b(a){for(var b=g,c=0;64>c;c+=4)b[c/4]=a[c]<<24|a[c+1]<<16|a[c+2]<<8|a[c+3];for(c=16;80>c;c++)a=b[c-3]^b[c-8]^b[c-14]^b[c-16],b[c]=(a<<1|a>>>31)&4294967295;a=e[0];for(var d=e[1],f=e[2],h=e[3],k=e[4],m,E,c=0;80>c;c++)40>c?20>c?(m=h^d&(f^h),E=1518500249):(m=d^f^h,E=1859775393):60>c?(m=d&f|h&(d|f),E=2400959708):(m=d^f^h,E=3395469782),m=((a<<5|a>>>27)&4294967295)+m+k+E+b[c]&4294967295,k=h,h=f,f=(d<<30|d>>>2)&4294967295,d=a,a=m;e[0]=e[0]+a&4294967295;e[1]=e[1]+d&4294967295;e[2]=e[2]+f&4294967295;
e[3]=e[3]+h&4294967295;e[4]=e[4]+k&4294967295}
function c(a,c){if("string"===typeof a){a=unescape(encodeURIComponent(a));for(var d=[],e=0,g=a.length;e<g;++e)d.push(a.charCodeAt(e));a=d}c||(c=a.length);d=0;if(0==m)for(;d+64<c;)b(a.slice(d,d+64)),d+=64,y+=64;for(;d<c;)if(f[m++]=a[d++],y++,64==m)for(m=0,b(f);d+64<c;)b(a.slice(d,d+64)),d+=64,y+=64}
function d(){var a=[],d=8*y;56>m?c(h,56-m):c(h,64-(m-56));for(var g=63;56<=g;g--)f[g]=d&255,d>>>=8;b(f);for(g=d=0;5>g;g++)for(var k=24;0<=k;k-=8)a[d++]=e[g]>>k&255;return a}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var m,y;a();return{reset:a,update:c,digest:d,Fa:function(){for(var a=d(),b="",c=0;c<a.length;c++)b+="0123456789ABCDEF".charAt(Math.floor(a[c]/16))+"0123456789ABCDEF".charAt(a[c]%16);return b}}}
;function wc(a,b,c){var d=[],e=[];if(1==(na(c)?2:1))return e=[b,a],C(d,function(a){e.push(a)}),xc(e.join(" "));
var f=[],g=[];C(c,function(a){g.push(a.key);f.push(a.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];C(d,function(a){e.push(a)});
a=xc(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function xc(a){var b=vc();b.update(a);return b.Fa().toLowerCase()}
;function yc(a){this.b=a||{cookie:""}}
l=yc.prototype;l.isEnabled=function(){return navigator.cookieEnabled};
l.set=function(a,b,c,d,e,f){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');p(c)||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";c=0>c?"":0==c?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(x()+1E3*c)).toUTCString();this.b.cookie=a+"="+b+e+d+c+f};
l.get=function(a,b){for(var c=a+"=",d=(this.b.cookie||"").split(";"),e=0,f;e<d.length;e++){f=ya(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
l.remove=function(a,b,c){var d=p(this.get(a));this.set(a,"",0,b,c);return d};
l.isEmpty=function(){return!this.b.cookie};
l.clear=function(){for(var a=(this.b.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=ya(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var zc=new yc("undefined"==typeof document?null:document);zc.f=3950;var Ac=L(N,"perf",M());L(Ac,"g",M());var Cc=L(Ac,"i",M());L(Ac,"r",[]);M();M();function Dc(a,b,c){b&&0<b.length&&(b=Ec(b),c&&0<c.length&&(b+="___"+Ec(c)),28<b.length&&(b=b.substr(0,28)+(b.length-28)),c=b,b=L(Cc,"_p",M()),L(b,c,M())[a]=(new Date).getTime(),b=Ac.r,"function"===typeof b?b(a,"_p",c):b.push([a,"_p",c]))}
function Ec(a){return a.join("__").replace(/\./g,"_").replace(/\-/g,"_").replace(/\,/g,"_")}
;var Fc=M(),Gc=[];function O(a){throw Error("Bad hint"+(a?": "+a:""));}
Gc.push(["jsl",function(a){for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b];"object"==typeof c?N[b]=L(N,b,[]).concat(c):L(N,b,c)}if(b=a.u)a=L(N,"us",[]),a.push(b),(b=/^https:(.*)$/.exec(b))&&a.push("http:"+b[1])}]);
var Hc=/^(\/[a-zA-Z0-9_\-]+)+$/,Ic=[/\/amp\//,/\/amp$/,/^\/amp$/],Jc=/^[a-zA-Z0-9\-_\.,!]+$/,Kc=/^gapi\.loaded_[0-9]+$/,Lc=/^[a-zA-Z0-9,._-]+$/;function Mc(a,b,c,d){var e=a.split(";"),f=e.shift(),g=Fc[f],h=null;g?h=g(e,b,c,d):O("no hint processor for: "+f);h||O("failed to generate load url");b=h;c=b.match(Nc);(d=b.match(Oc))&&1===d.length&&Pc.test(b)&&c&&1===c.length||O("failed sanity: "+a);return h}
function Qc(a,b,c,d){function e(a){return encodeURIComponent(a).replace(/%2C/g,",")}
a=Rc(a);Kc.test(c)||O("invalid_callback");b=Sc(b);d=d&&d.length?Sc(d):null;return[encodeURIComponent(a.Ya).replace(/%2C/g,",").replace(/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.qa?"/am="+e(a.qa):"",a.ya?"/rs="+e(a.ya):"",a.Ba?"/t="+e(a.Ba):"","/cb=",e(c)].join("")}
function Rc(a){"/"!==a.charAt(0)&&O("relative path");for(var b=a.substring(1).split("/"),c=[];b.length;){a=b.shift();if(!a.length||0==a.indexOf("."))O("empty/relative directory");else if(0<a.indexOf("=")){b.unshift(a);break}c.push(a)}a={};for(var d=0,e=b.length;d<e;++d){var f=b[d].split("="),g=decodeURIComponent(f[0]),h=decodeURIComponent(f[1]);2==f.length&&g&&h&&(a[g]=a[g]||h)}b="/"+c.join("/");Hc.test(b)||O("invalid_prefix");c=0;for(d=Ic.length;c<d;++c)Ic[c].test(b)&&O("invalid_prefix");c=Tc(a,
"k",!0);d=Tc(a,"am");e=Tc(a,"rs");a=Tc(a,"t");return{Ya:b,version:c,qa:d,ya:e,Ba:a}}
function Sc(a){for(var b=[],c=0,d=a.length;c<d;++c){var e=a[c].replace(/\./g,"_").replace(/-/g,"_");Lc.test(e)&&b.push(e)}return b.join(",")}
function Tc(a,b,c){a=a[b];!a&&c&&O("missing: "+b);if(a){if(Jc.test(a))return a;O("invalid: "+b)}return null}
var Pc=/^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,Oc=/\/cb=/g,Nc=/\/\//g;function Uc(){var a=sc();if(!a)throw Error("Bad hint");return a}
Fc.m=function(a,b,c,d){(a=a[0])||O("missing_hint");return"https://apis.google.com"+Qc(a,b,c,d)};
var Vc=decodeURI("%73cript"),Wc=/^[-+_0-9\/A-Za-z]+={0,2}$/;function Xc(a,b){for(var c=[],d=0;d<a.length;++d){var e=a[d];e&&0>pc.call(b,e)&&c.push(e)}return c}
function Yc(){var a=N.nonce;if(void 0!==a)return a&&a===String(a)&&a.match(Wc)?a:N.nonce=null;var b=L(N,"us",[]);if(!b||!b.length)return N.nonce=null;for(var c=lc.getElementsByTagName(Vc),d=0,e=c.length;d<e;++d){var f=c[d];if(f.src&&(a=String(f.nonce||f.getAttribute("nonce")||"")||null)){for(var g=0,h=b.length;g<h&&b[g]!==f.src;++g);if(g!==h&&a&&a===String(a)&&a.match(Wc))return N.nonce=a}}return null}
function Zc(a){if("loading"!=lc.readyState)$c(a);else{var b=Yc(),c="";null!==b&&(c=' nonce="'+b+'"');lc.write("<"+Vc+' src="'+encodeURI(a)+'"'+c+"></"+Vc+">")}}
function $c(a){var b=lc.createElement(Vc);b.setAttribute("src",a);a=Yc();null!==a&&b.setAttribute("nonce",a);b.async="true";(a=lc.getElementsByTagName(Vc)[0])?a.parentNode.insertBefore(b,a):(lc.head||lc.body||lc.documentElement).appendChild(b)}
function ad(a,b){var c=b&&b._c;if(c)for(var d=0;d<Gc.length;d++){var e=Gc[d][0],f=Gc[d][1];f&&Object.prototype.hasOwnProperty.call(c,e)&&f(c[e],a,b)}}
function bd(a,b,c){cd(function(){var c;c=b===sc()?L(rc,"_",M()):M();c=L(uc(b),"_",c);a(c)},c)}
function dd(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);ad(a,c);var d=a?a.split(":"):[],e=c.h||Uc(),f=L(N,"ah",M());if(f["::"]&&d.length){for(var g=[],h=null;h=d.shift();){var k=h.split("."),k=f[h]||f[k[1]&&"ns:"+k[0]||""]||e,m=g.length&&g[g.length-1]||null,y=m;m&&m.hint==k||(y={hint:k,features:[]},g.push(y));y.features.push(h)}var E=g.length;if(1<E){var Z=c.callback;Z&&(c.callback=function(){0==--E&&Z()})}for(;d=g.shift();)ed(d.features,c,d.hint)}else ed(d||[],c,e)}
function ed(a,b,c){function d(a,b){if(E)return 0;kc.clearTimeout(y);Z.push.apply(Z,G);var d=((rc||{}).config||{}).update;d?d(f):f&&L(N,"cu",[]).push(f);if(b){Dc("me0",a,ta);try{bd(b,c,m)}finally{Dc("me1",a,ta)}}return 1}
a=qc(a)||[];var e=b.callback,f=b.config,g=b.timeout,h=b.ontimeout,k=b.onerror,m=void 0;"function"==typeof k&&(m=k);var y=null,E=!1;if(g&&!h||!g&&h)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var k=L(uc(c),"r",[]).sort(),Z=L(uc(c),"L",[]).sort(),ta=[].concat(k);0<g&&(y=kc.setTimeout(function(){E=!0;h()},g));
var G=Xc(a,Z);if(G.length){var G=Xc(a,k),ea=L(N,"CP",[]),fa=ea.length;ea[fa]=function(a){function b(){var a=ea[fa+1];a&&a()}
function c(b){ea[fa]=null;d(G,a)&&tc(function(){e&&e();b()})}
if(!a)return 0;Dc("ml1",G,ta);0<fa&&ea[fa-1]?ea[fa]=function(){c(b)}:c(b)};
if(G.length){var Bc="loaded_"+N.I++;rc[Bc]=function(a){ea[fa](a);rc[Bc]=null};
a=Mc(c,G,"gapi."+Bc,k);k.push.apply(k,G);Dc("ml0",G,ta);b.sync||kc.___gapisync?Zc(a):$c(a)}else ea[fa](nc)}else d(G)&&e&&e()}
function cd(a,b){if(N.hee&&0<N.hel)try{return a()}catch(c){b&&b(c),N.hel--,dd("debug_error",function(){try{window.___jsl.hefn(c)}catch(d){throw c;}})}else try{return a()}catch(c){throw b&&b(c),c;
}}
rc.load=function(a,b){return cd(function(){return dd(a,b)})};function fd(a,b,c){this.i=c;this.g=a;this.j=b;this.f=0;this.b=null}
fd.prototype.get=function(){var a;0<this.f?(this.f--,a=this.b,this.b=a.next,a.next=null):a=this.g();return a};
function gd(a,b){a.j(b);a.f<a.i&&(a.f++,b.next=a.b,a.b=b)}
;function hd(a){n.setTimeout(function(){throw a;},0)}
var id;
function jd(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!F("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=v(function(a){if(("*"==d||a.origin==d)&&a.data==
c)this.port1.onmessage()},this);
b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});
if("undefined"!==typeof a&&!F("Trident")&&!F("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.sa;c.sa=null;a()}};
return function(a){d.next={sa:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};
document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}}
;function kd(){this.f=this.b=null}
var md=new fd(function(){return new ld},function(a){a.reset()},100);
kd.prototype.remove=function(){var a=null;this.b&&(a=this.b,this.b=this.b.next,this.b||(this.f=null),a.next=null);return a};
function ld(){this.next=this.scope=this.b=null}
ld.prototype.set=function(a,b){this.b=a;this.scope=b;this.next=null};
ld.prototype.reset=function(){this.next=this.scope=this.b=null};function nd(a,b){od||pd();qd||(od(),qd=!0);var c=rd,d=md.get();d.set(a,b);c.f?c.f.next=d:c.b=d;c.f=d}
var od;function pd(){if(-1!=String(n.Promise).indexOf("[native code]")){var a=n.Promise.resolve(void 0);od=function(){a.then(sd)}}else od=function(){var a=sd;
!pa(n.setImmediate)||n.Window&&n.Window.prototype&&!F("Edge")&&n.Window.prototype.setImmediate==n.setImmediate?(id||(id=jd()),id(a)):n.setImmediate(a)}}
var qd=!1,rd=new kd;function sd(){for(var a;a=rd.remove();){try{a.b.call(a.scope)}catch(b){hd(b)}gd(md,a)}qd=!1}
;var td="StopIteration"in n?n.StopIteration:{message:"StopIteration",stack:""};function ud(){}
ud.prototype.next=function(){throw td;};
ud.prototype.ca=function(){return this};
function vd(a){if(a instanceof ud)return a;if("function"==typeof a.ca)return a.ca(!1);if(oa(a)){var b=0,c=new ud;c.next=function(){for(;;){if(b>=a.length)throw td;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function wd(a,b){if(oa(a))try{C(a,b,void 0)}catch(c){if(c!==td)throw c;}else{a=vd(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==td)throw c;}}}
function xd(a){if(oa(a))return Fa(a);a=vd(a);var b=[];wd(a,function(a){b.push(a)});
return b}
;function P(){this.f=this.f;this.F=this.F}
P.prototype.f=!1;P.prototype.dispose=function(){this.f||(this.f=!0,this.o())};
function yd(a,b){a.f?p(void 0)?b.call(void 0):b():(a.F||(a.F=[]),a.F.push(p(void 0)?v(b,void 0):b))}
P.prototype.o=function(){if(this.F)for(;this.F.length;)this.F.shift()()};
function zd(a){a&&"function"==typeof a.dispose&&a.dispose()}
function Ad(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];oa(d)?Ad.apply(null,d):zd(d)}}
;I&&J("9");!hb||J("528");gb&&J("1.9b")||I&&J("8")||eb&&J("9.5")||hb&&J("528");gb&&!J("8")||I&&J("9");function Bd(a){return/^\s*$/.test(a)?!1:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,""))}
function Cd(a){a=String(a);if(Bd(a))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}
function Dd(a){return eval("("+a+")")}
function Ed(a){var b=[];Fd(new Gd,a,b);return b.join("")}
function Gd(){}
function Fd(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(na(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),Fd(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),Hd(d,c),c.push(":"),Fd(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":Hd(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var Id={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Jd=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;function Hd(a,b){b.push('"',a.replace(Jd,function(a){var b=Id[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),Id[a]=b);return b}),'"')}
;function Kd(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0}
;function Q(a,b){this.b=0;this.w=void 0;this.i=this.f=this.g=null;this.j=this.l=!1;if(a!=t)try{var c=this;a.call(b,function(a){Ld(c,2,a)},function(a){Ld(c,3,a)})}catch(d){Ld(this,3,d)}}
function Md(){this.next=this.context=this.f=this.g=this.b=null;this.i=!1}
Md.prototype.reset=function(){this.context=this.f=this.g=this.b=null;this.i=!1};
var Nd=new fd(function(){return new Md},function(a){a.reset()},100);
function Od(a,b,c){var d=Nd.get();d.g=a;d.f=b;d.context=c;return d}
function Pd(a){if(a instanceof Q)return a;var b=new Q(t);Ld(b,2,a);return b}
function Qd(a){return new Q(function(b,c){c(a)})}
Q.prototype.then=function(a,b,c){return Rd(this,pa(a)?a:null,pa(b)?b:null,c)};
Kd(Q);Q.prototype.cancel=function(a){0==this.b&&nd(function(){var b=new Sd(a);Td(this,b)},this)};
function Td(a,b){if(0==a.b)if(a.g){var c=a.g;if(c.f){for(var d=0,e=null,f=null,g=c.f;g&&(g.i||(d++,g.b==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.b&&1==d?Td(c,b):(f?(d=f,d.next==c.i&&(c.i=d),d.next=d.next.next):Ud(c),Vd(c,e,3,b)))}a.g=null}else Ld(a,3,b)}
function Wd(a,b){a.f||2!=a.b&&3!=a.b||Xd(a);a.i?a.i.next=b:a.f=b;a.i=b}
function Rd(a,b,c,d){var e=Od(null,null,null);e.b=new Q(function(a,g){e.g=b?function(c){try{var e=b.call(d,c);a(e)}catch(m){g(m)}}:a;
e.f=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof Sd?g(b):a(e)}catch(m){g(m)}}:g});
e.b.g=a;Wd(a,e);return e.b}
Q.prototype.B=function(a){this.b=0;Ld(this,2,a)};
Q.prototype.F=function(a){this.b=0;Ld(this,3,a)};
function Ld(a,b,c){if(0==a.b){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.b=1;var d;a:{var e=c,f=a.B,g=a.F;if(e instanceof Q)Wd(e,Od(f||t,g||null,a)),d=!0;else{var h;if(e)try{h=!!e.$goog_Thenable}catch(m){h=!1}else h=!1;if(h)e.then(f,g,a),d=!0;else{if(qa(e))try{var k=e.then;if(pa(k)){Yd(e,k,f,g,a);d=!0;break a}}catch(m){g.call(a,m);d=!0;break a}d=!1}}}d||(a.w=c,a.b=b,a.g=null,Xd(a),3!=b||c instanceof Sd||Zd(a,c))}}
function Yd(a,b,c,d,e){function f(a){h||(h=!0,d.call(e,a))}
function g(a){h||(h=!0,c.call(e,a))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function Xd(a){a.l||(a.l=!0,nd(a.C,a))}
function Ud(a){var b=null;a.f&&(b=a.f,a.f=b.next,b.next=null);a.f||(a.i=null);return b}
Q.prototype.C=function(){for(var a;a=Ud(this);)Vd(this,a,this.b,this.w);this.l=!1};
function Vd(a,b,c,d){if(3==c&&b.f&&!b.i)for(;a&&a.j;a=a.g)a.j=!1;if(b.b)b.b.g=null,$d(b,c,d);else try{b.i?b.g.call(b.context):$d(b,c,d)}catch(e){ae.call(null,e)}gd(Nd,b)}
function $d(a,b,c){2==b?a.g.call(a.context,c):a.f&&a.f.call(a.context,c)}
function Zd(a,b){a.j=!0;nd(function(){a.j&&ae.call(null,b)})}
var ae=hd;function Sd(a){B.call(this,a)}
z(Sd,B);Sd.prototype.name="cancel";function R(a){P.call(this);this.l=1;this.i=[];this.j=0;this.b=[];this.g={};this.w=!!a}
z(R,P);l=R.prototype;l.subscribe=function(a,b,c){var d=this.g[a];d||(d=this.g[a]=[]);var e=this.l;this.b[e]=a;this.b[e+1]=b;this.b[e+2]=c;this.l=e+3;d.push(e);return e};
function be(a,b,c,d){if(b=a.g[b]){var e=a.b;(b=Da(b,function(a){return e[a+1]==c&&e[a+2]==d}))&&a.K(b)}}
l.K=function(a){var b=this.b[a];if(b){var c=this.g[b];0!=this.j?(this.i.push(a),this.b[a+1]=t):(c&&Ea(c,a),delete this.b[a],delete this.b[a+1],delete this.b[a+2])}return!!b};
l.V=function(a,b){var c=this.g[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.w)for(e=0;e<c.length;e++){var g=c[e];ce(this.b[g+1],this.b[g+2],d)}else{this.j++;try{for(e=0,f=c.length;e<f;e++)g=c[e],this.b[g+1].apply(this.b[g+2],d)}finally{if(this.j--,0<this.i.length&&0==this.j)for(;c=this.i.pop();)this.K(c)}}return 0!=e}return!1};
function ce(a,b,c){nd(function(){a.apply(b,c)})}
l.clear=function(a){if(a){var b=this.g[a];b&&(C(b,this.K,this),delete this.g[a])}else this.b.length=0,this.g={}};
l.o=function(){R.A.o.call(this);this.clear();this.i.length=0};function de(a){this.b=a}
de.prototype.set=function(a,b){p(b)?this.b.set(a,Ed(b)):this.b.remove(a)};
de.prototype.get=function(a){var b;try{b=this.b.get(a)}catch(c){return}if(null!==b)try{return Cd(b)}catch(c){throw"Storage: Invalid value was encountered";}};
de.prototype.remove=function(a){this.b.remove(a)};function ee(a){this.b=a}
z(ee,de);function fe(a){this.data=a}
function ge(a){return!p(a)||a instanceof fe?a:new fe(a)}
ee.prototype.set=function(a,b){ee.A.set.call(this,a,ge(b))};
ee.prototype.f=function(a){a=ee.A.get.call(this,a);if(!p(a)||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
ee.prototype.get=function(a){if(a=this.f(a)){if(a=a.data,!p(a))throw"Storage: Invalid value was encountered";}else a=void 0;return a};function he(a){this.b=a}
z(he,ee);he.prototype.set=function(a,b,c){if(b=ge(b)){if(c){if(c<x()){he.prototype.remove.call(this,a);return}b.expiration=c}b.creation=x()}he.A.set.call(this,a,b)};
he.prototype.f=function(a,b){var c=he.A.f.call(this,a);if(c){var d;if(d=!b){d=c.creation;var e=c.expiration;d=!!e&&e<x()||!!d&&d>x()}if(d)he.prototype.remove.call(this,a);else return c}};function ie(a){this.b=a}
z(ie,he);function je(){}
;function ke(){}
z(ke,je);ke.prototype.clear=function(){var a=xd(this.ca(!0)),b=this;C(a,function(a){b.remove(a)})};function le(a){this.b=a}
z(le,ke);l=le.prototype;l.isAvailable=function(){if(!this.b)return!1;try{return this.b.setItem("__sak","1"),this.b.removeItem("__sak"),!0}catch(a){return!1}};
l.set=function(a,b){try{this.b.setItem(a,b)}catch(c){if(0==this.b.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
l.get=function(a){a=this.b.getItem(a);if(!u(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
l.remove=function(a){this.b.removeItem(a)};
l.ca=function(a){var b=0,c=this.b,d=new ud;d.next=function(){if(b>=c.length)throw td;var d=c.key(b++);if(a)return d;d=c.getItem(d);if(!u(d))throw"Storage mechanism: Invalid value was encountered";return d};
return d};
l.clear=function(){this.b.clear()};
l.key=function(a){return this.b.key(a)};function me(){var a=null;try{a=window.localStorage||null}catch(b){}this.b=a}
z(me,le);function ne(){var a=null;try{a=window.sessionStorage||null}catch(b){}this.b=a}
z(ne,le);var oe=window.performance&&window.performance.timing&&window.performance.now?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()},pe="Microsoft Internet Explorer"==navigator.appName;
function qe(a,b){if(1<b.length)a[b[0]]=b[1];else{var c=b[0],d;for(d in c)a[d]=c[d]}}
;var re=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};q("yt.config_",re,void 0);function S(a){qe(re,arguments)}
function T(a,b){return a in re?re[a]:b}
;var se={};function te(a){return se[a]||(se[a]=String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()}))}
function ue(a,b){return a?a.dataset?a.dataset[te(b)]:a.getAttribute("data-"+b):null}
function ve(a){a&&(a.dataset?a.dataset[te("loaded")]="true":a.setAttribute("data-loaded","true"))}
;function U(a,b){var c=r("yt.logging.errors.log");c?c(a,b,void 0,void 0,void 0):(c=T("ERRORS",[]),c.push([a,b,void 0,void 0,void 0]),S("ERRORS",c))}
function we(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){U(b)}}:a}
;function V(a,b){pa(a)&&(a=we(a));return window.setTimeout(a,b)}
;var xe=r("yt.pubsub.pubsub.instance_")||r("yt.pubsub.instance_")||new R;R.prototype.subscribe=R.prototype.subscribe;R.prototype.unsubscribeByKey=R.prototype.K;R.prototype.publish=R.prototype.V;R.prototype.clear=R.prototype.clear;q("yt.pubsub.instance_",xe,void 0);q("yt.pubsub.pubsub.instance_",xe,void 0);var ye=r("yt.pubsub.pubsub.subscribedKeys_")||r("yt.pubsub.subscribedKeys_")||{};q("yt.pubsub.subscribedKeys_",ye,void 0);q("yt.pubsub.pubsub.subscribedKeys_",ye,void 0);
var ze=r("yt.pubsub.pubsub.topicToKeys_")||r("yt.pubsub.topicToKeys_")||{};q("yt.pubsub.topicToKeys_",ze,void 0);q("yt.pubsub.pubsub.topicToKeys_",ze,void 0);var Ae=r("yt.pubsub.pubsub.isSynchronous_")||r("yt.pubsub.isSynchronous_")||{};q("yt.pubsub.isSynchronous_",Ae,void 0);q("yt.pubsub.pubsub.isSynchronous_",Ae,void 0);function Be(a,b){var c=Ce();if(c){var d=c.subscribe(a,function(){var c=arguments,f;f=function(){ye[d]&&b.apply(window,c)};
try{Ae[a]?f():V(f,0)}catch(g){U(g)}},void 0);
ye[d]=!0;ze[a]||(ze[a]=[]);ze[a].push(d);return d}return 0}
function Ce(){return r("yt.pubsub.pubsub.instance_")||r("yt.pubsub.instance_")}
function De(a){ze[a]&&(a=ze[a],C(a,function(a){ye[a]&&delete ye[a]}),a.length=0)}
;function Ee(a){var b=Ce();b&&("number"==typeof a?a=[a]:u(a)&&(a=[parseInt(a,10)]),C(a,function(a){b.unsubscribeByKey(a);delete ye[a]}))}
function Fe(a,b){var c=Ce();return c?c.publish.apply(c,arguments):!1}
function Ge(a){var b=Ce();if(b)if(b.clear(a),a)De(a);else for(var c in ze)De(c)}
;var He=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,Ie=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function Je(a,b){var c=Ke(a),d=document.getElementById(c),e=d&&ue(d,"loaded"),f=d&&!e;if(e)b&&b();else{if(b){var e=Be(c,b),g=""+ra(b);Le[g]=e}f||(d=Me(a,c,function(){ue(d,"loaded")||(ve(d),Fe(c),V(w(Ge,c),0))}))}}
function Me(a,b,c){var d=document.createElement("script");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
d.onreadystatechange=function(){switch(d.readyState){case "loaded":case "complete":d.onload()}};
d.src=a;a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(d,a.firstChild);return d}
function Ne(a,b){if(a&&b){var c=""+ra(b);(c=Le[c])&&Ee(c)}}
function Ke(a){var b=document.createElement("a");Nb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+Aa(a)}
var Le={};function Oe(a,b){if(window.spf){var c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(He,""),c=c.replace(Ie,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else Je(a,b)}
;var Pe=null;function Qe(){var a=T("BG_I",null),b=T("BG_IU",null),c=T("BG_P",void 0);b?Oe(b,function(){Pe=new botguard.bg(c)}):a&&(eval(a),Pe=new botguard.bg(c))}
function Re(){return null!=Pe}
function Se(){return Pe?Pe.invoke():null}
;var Te=p(XMLHttpRequest)?function(){return new XMLHttpRequest}:p(ActiveXObject)?function(){return new ActiveXObject("Microsoft.XMLHTTP")}:null;
function Ue(){if(!Te)return null;var a=Te();return"open"in a?a:null}
function Ve(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function We(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length){var f=decodeURIComponent((e[0]||"").replace(/\+/g," ")),e=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?na(b[f])?Ga(b[f],e):b[f]=[b[f],e]:b[f]=e}}return b}
function Xe(a,b){var c=a.split("#",2);a=c[0];var c=1<c.length?"#"+c[1]:"",d=a.split("?",2);a=d[0];var d=We(d[1]||""),e;for(e in b)d[e]=b[e];return Xb(Zb([a],d))+c}
function Ye(a){a=Zb([],a);a[0]="";return a.join("")}
;var Ze={"X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"};
function $e(a,b){b=void 0===b?{}:b;var c=void 0;c=window.location.href;var d=K(a)[1]||null,e=Wb(K(a)[3]||null);d&&e?(d=c,c=K(a),d=K(d),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?Wb(K(c)[3]||null)==e&&(Number(K(c)[4]||null)||null)==(Number(K(a)[4]||null)||null):!0;for(var f in Ze){if((e=d=T(Ze[f]))&&!(e=c)){var g=a,e=f,h=T("CORS_HEADER_WHITELIST")||{};e=(g=Wb(K(g)[3]||null))?(h=h[g])?0<=Ba(h,e):!1:!0}e&&(b[f]=d)}return b}
function af(a,b){var c=T("XSRF_FIELD_NAME",void 0),d;b.headers&&(d=b.headers["Content-Type"]);return!b.qb&&(!Wb(K(a)[3]||null)||b.withCredentials||Wb(K(a)[3]||null)==document.location.hostname)&&"POST"==b.method&&(!d||"application/x-www-form-urlencoded"==d)&&!(b.D&&b.D[c])}
function bf(a,b){var c=b.format||"JSON";b.Ka&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var d=T("XSRF_FIELD_NAME",void 0),e=T("XSRF_TOKEN",void 0),f=b.jb;f&&(f[d]&&delete f[d],a=Xe(a,f||{}));var g=b.postBody||"",f=b.D;af(a,b)&&(f||(f={}),f[d]=e);f&&u(g)&&(d=We(g),bb(d,f),g=b.wa&&"JSON"==b.wa?JSON.stringify(d):Ye(d));var h=!1,k,m=cf(a,function(a){if(!h){h=!0;k&&window.clearTimeout(k);var d=Ve(a),e=null;if(d||400<=a.status&&
500>a.status)e=df(c,a,b.pb);if(d)a:if(204==a.status)d=!0;else{switch(c){case "XML":d=0==parseInt(e&&e.return_code,10);break a;case "RAW":d=!0;break a}d=!!e}var e=e||{},f=b.context||n;d?b.N&&b.N.call(f,a,e):b.onError&&b.onError.call(f,a,e);b.Pa&&b.Pa.call(f,a,e)}},b.method,g,b.headers,b.responseType,b.withCredentials);
b.O&&0<b.timeout&&(k=V(function(){h||(h=!0,m.abort(),window.clearTimeout(k),b.O.call(b.context||n,m))},b.timeout))}
function df(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=Dd(a));break;case "XML":if(b=(b=b.responseXML)?ef(b):null)d={},C(b.getElementsByTagName("*"),function(a){d[a.tagName]=ff(a)})}c&&gf(d);
return d}
function gf(a){if(qa(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d;d=Mb(a[b]);a[c]=d}else gf(a[b])}}
function ef(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function ff(a){var b="";C(a.childNodes,function(a){b+=a.nodeValue});
return b}
function hf(a,b){b.method="POST";b.D||(b.D={});bf(a,b)}
function cf(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&we(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=Ue();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);c="POST"==c;if(e=$e(a,e))for(var m in e)k.setRequestHeader(m,e[m]),"content-type"==m.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);return k}
;function jf(a,b,c,d,e){c={name:c||T("INNERTUBE_CONTEXT_CLIENT_NAME",1),version:d||T("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0)};e=window&&window.yterr||e||!1;if(a&&e&&!(5<=kf)){e=a.stacktrace;d=a.columnNumber;var f=r("window.location.href");if(u(a))a={message:a,name:"Unknown error",lineNumber:"Not available",fileName:f,stack:"Not available"};else{var g,h,k=!1;try{g=a.lineNumber||a.line||"Not available"}catch(E){g="Not available",k=!0}try{h=a.fileName||a.filename||a.sourceURL||n.$googDebugFname||f}catch(E){h=
"Not available",k=!0}a=!k&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:{message:a.message||"Not available",name:a.name||"UnknownError",lineNumber:g,fileName:h,stack:a.stack||"Not available"}}e=e||a.stack;g=a.lineNumber.toString();isNaN(g)||isNaN(d)||(g=g+":"+d);if(!(lf[a.message]||0<=e.indexOf("/YouTubeCenter.js")||0<=e.indexOf("/mytube.js"))){h=a.fileName;b={jb:{a:"logerror",t:"jserror",type:a.name,msg:a.message.substr(0,1E3),line:g,level:b||"ERROR"},D:{url:T("PAGE_NAME",window.location.href),
file:h},method:"POST"};e&&(b.D.stack=e);for(var m in c)b.D["client."+m]=c[m];if(m=T("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(var y in m)b.D[y]=m[y];bf("/error_204",b);lf[a.message]=!0;kf++}}}
var lf={},kf=0;var mf=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};q("yt.msgs_",mf,void 0);function nf(a){qe(mf,arguments)}
;function of(a,b){var c=5E3;isNaN(c)&&(c=void 0);var d=r("yt.scheduler.instance.addJob");return d?d(a,b,c):void 0===c?(a(),NaN):V(a,c||0)}
;var pf=[],qf=!1;function rf(){function a(){qf=!0;"google_ad_status"in window?S("DCLKSTAT",1):S("DCLKSTAT",2)}
Oe("//static.doubleclick.net/instream/ad_status.js",a);pf.push(of(function(){qf||"google_ad_status"in window||(Ne("//static.doubleclick.net/instream/ad_status.js",a),S("DCLKSTAT",3))},1))}
function sf(){return parseInt(T("DCLKSTAT",0),10)}
;function tf(a){a=a||{};this.url=a.url||"";this.urlV9As2=a.url_v9as2||"";this.args=a.args||$a(uf);this.assets=a.assets||{};this.attrs=a.attrs||$a(vf);this.params=a.params||$a(wf);this.minVersion=a.min_version||"8.0.0";this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
var uf={enablejsapi:1},vf={},wf={allowscriptaccess:"always",allowfullscreen:"true",bgcolor:"#000000"};function xf(a){a instanceof tf||(a=new tf(a));return a}
function yf(a){var b=new tf,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];b[c]="object"==ma(d)?$a(d):d}return b}
;var zf=0,Af=r("yt.dom.dom.getNextId")||function(){return++zf};
q("yt.dom.dom.getNextId",Af,void 0);var Bf={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function Cf(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;if(a=a||window.event){this.event=a;for(var b in a)b in Bf||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?b=a.fromElement:
"mouseout"==this.type&&(b=a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey}}
Cf.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
Cf.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
Cf.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var Xa=r("ytEventsEventsListeners")||{};q("ytEventsEventsListeners",Xa,void 0);var Df=r("ytEventsEventsCounter")||{count:0};q("ytEventsEventsCounter",Df,void 0);function Ef(a,b,c,d){d=void 0===d?!1:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return Wa(function(e){return e[0]==a&&e[1]==b&&e[2]==c&&e[4]==!!d})}
function Ff(a,b,c){var d;d=void 0===d?!1:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=Ef(a,b,c,d);if(e)return e;var e=++Df.count+"",f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document),g;g=f?function(d){d=new Cf(d);if(!Rb(d.relatedTarget,function(b){return b==a}))return d.currentTarget=a,d.type=b,c.call(a,d)}:function(b){b=new Cf(b);
b.currentTarget=a;return c.call(a,b)};
g=we(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),a.addEventListener(b,g,d)):a.attachEvent("on"+b,g);Xa[e]=[a,b,c,g,d];return e}
function Gf(a){a&&("string"==typeof a&&(a=[a]),C(a,function(a){if(a in Xa){var b=Xa[a],d=b[0],e=b[1],f=b[3],b=b[4];d.removeEventListener?d.removeEventListener(e,f,b):d.detachEvent&&d.detachEvent("on"+e,f);delete Xa[a]}}))}
;function Hf(){this.g=this.f=this.b=0;this.i="";var a=r("window.navigator.plugins"),b=r("window.navigator.mimeTypes"),a=a&&a["Shockwave Flash"],b=b&&b["application/x-shockwave-flash"],b=a&&b&&b.enabledPlugin&&a.description||"";if(a=b){var c=a.indexOf("Shockwave Flash");0<=c&&(a=a.substr(c+15));for(var c=a.split(" "),d="",a="",e=0,f=c.length;e<f;e++)if(d)if(a)break;else a=c[e];else d=c[e];d=d.split(".");c=parseInt(d[0],10)||0;d=parseInt(d[1],10)||0;e=0;if("r"==a.charAt(0)||"d"==a.charAt(0))e=parseInt(a.substr(1),
10)||0;a=[c,d,e]}else a=[0,0,0];this.i=b;b=a;this.b=b[0];this.f=b[1];this.g=b[2];if(0>=this.b){var g,h,k,m;if(pe)try{g=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(y){g=null}else k=document.body,m=document.createElement("object"),m.setAttribute("type","application/x-shockwave-flash"),g=k.appendChild(m);if(g&&"GetVariable"in g)try{h=g.GetVariable("$version")}catch(y){h=""}k&&m&&k.removeChild(m);(g=h||"")?(g=g.split(" ")[1].split(","),g=[parseInt(g[0],10)||0,parseInt(g[1],10)||0,parseInt(g[2],
10)||0]):g=[0,0,0];this.b=g[0];this.f=g[1];this.g=g[2]}}
la(Hf);function If(a,b,c,d){b="string"==typeof b?b.split("."):[b,c,d];b[0]=parseInt(b[0],10)||0;b[1]=parseInt(b[1],10)||0;b[2]=parseInt(b[2],10)||0;return a.b>b[0]||a.b==b[0]&&a.f>b[1]||a.b==b[0]&&a.f==b[1]&&a.g>=b[2]}
;var Jf=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;function Kf(a){if(window.spf){var b=a.match(Jf);spf.style.load(a,b?b[1]:"",void 0)}else Lf(a)}
function Lf(a){var b=Mf(a),c=document.getElementById(b),d=c&&ue(c,"loaded");d||c&&!d||(c=Nf(a,b,function(){ue(c,"loaded")||(ve(c),Fe(b),V(w(Ge,b),0))}))}
function Nf(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=Sb(a);d.rel="stylesheet";d.href=a instanceof Db&&a.constructor===Db&&a.f===Eb?a.b:"type_error:TrustedResourceUrl";(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function Mf(a){var b=document.createElement("a");Nb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+Aa(a)}
;var Of;var Pf=D,Qf=Pf.match(/\((iPad|iPhone|iPod)( Simulator)?;/);if(!Qf||2>Qf.length)Of=void 0;else{var Rf=Pf.match(/\((iPad|iPhone|iPod)( Simulator)?; (U; )?CPU (iPhone )?OS (\d+_\d)[_ ]/);Of=Rf&&6==Rf.length?Number(Rf[5].replace("_",".")):0}0<=Of&&0<=D.search("Safari")&&D.search("Version");var Sf={"api.invalidparam":2,auth:150,"drm.auth":150,"heartbeat.net":150,"heartbeat.servererror":150,"heartbeat.stop":150,"html5.unsupportedads":5,"fmt.noneavailable":5,"fmt.decode":5,"fmt.unplayable":5,"html5.missingapi":5,"html5.unsupportedlive":5,"drm.unavailable":5};var Tf;var Uf=D,Uf=Uf.toLowerCase();if(-1!=Uf.indexOf("android")){var Vf=Uf.match(/android\D*(\d\.\d)[^\;|\)]*[\;\)]/);if(Vf)Tf=Number(Vf[1]);else{var Wf={cupcake:1.5,donut:1.6,eclair:2,froyo:2.2,gingerbread:2.3,honeycomb:3,"ice cream sandwich":4,jellybean:4.1,kitkat:4.4,lollipop:5.1,marshmallow:6,nougat:7.1},Xf=[],Yf=0,Zf;for(Zf in Wf)Xf[Yf++]=Zf;var $f=Uf.match("("+Xf.join("|")+")");Tf=$f?Wf[$f[0]]:0}}else Tf=void 0;var ag=['video/mp4; codecs="avc1.42001E, mp4a.40.2"','video/webm; codecs="vp8.0, vorbis"'],bg=['audio/mp4; codecs="mp4a.40.2"'];function cg(a){P.call(this);this.b=[];this.g=a||this}
z(cg,P);function dg(a,b,c,d){d=we(v(d,a.g));d={target:b,name:c,ra:d};b.addEventListener(c,d.ra,void 0);a.b.push(d)}
function eg(a){for(;a.b.length;){var b=a.b.pop();b.target.removeEventListener(b.name,b.ra)}}
cg.prototype.o=function(){eg(this);cg.A.o.call(this)};function W(a){return T("EXPERIMENT_FLAGS",{})[a]}
;function fg(a,b,c,d){this.f=a;this.i=b;this.g=c;this.b=d}
var gg=1;function hg(a){var b={};void 0!==a.f?b.trackingParams=a.f:(b.veType=a.i,null!=a.g&&(b.veCounter=a.g));void 0!==a.b&&(b.dataElement=hg(a.b));return b}
;var ig={log_event:"events",log_interaction:"interactions"},jg={},kg={},lg=0,H=r("yt.logging.transport.logPayloadsQueue_")||{};q("yt.logging.transport.logPayloadsQueue_",H,void 0);var mg=r("yt.logging.transport.tokensToCttTargetIds_")||{};q("yt.logging.transport.tokensToCttTargetIds_",mg,void 0);
function ng(a,b){kg[a.endpoint]=b;var c;if(a.da){c=a.da;var d={};c.videoId?d.videoId=c.videoId:c.playlistId&&(d.playlistId=c.playlistId);mg[a.da.token]=d;c=og(a.endpoint,a.da.token)}else c=og(a.endpoint);c.push(a.va);d=Number(W("web_logging_max_batch")||0)||20;c.length>=d?pg():qg()}
function pg(){window.clearTimeout(lg);if(!Ya()){for(var a in H){var b=jg[a];if(!b){var c=kg[a];if(!c)continue;b=new c;jg[a]=b}var c=void 0,d=a,e=ig[d];for(c in H[d]){var f=b.f();f[e]=og(d,c);f.requestTimeMs=Math.round(oe());var g=mg[c];if(g)a:{var h,k=f,m=c;if(g.videoId)h="VIDEO";else if(g.playlistId)h="PLAYLIST";else break a;k.credentialTransferTokenTargetId=g;k.context=k.context||{};k.context.user=k.context.user||{};k.context.user.credentialTransferTokens=[{token:m,scope:h}]}delete mg[c];b.g(d,
f,{})}delete H[a]}Ya()||qg()}}
function qg(){window.clearTimeout(lg);lg=V(pg,T("LOGGING_BATCH_TIMEOUT",1E4))}
function og(a,b){b||(b="");H[a]=H[a]||{};H[a][b]=H[a][b]||[];return H[a][b]}
;function rg(){if(null==r("_lact",window)){var a=parseInt(T("LACT"),10),a=isFinite(a)?x()-Math.max(a,0):-1;q("_lact",a,window);-1==a&&sg();Ff(document,"keydown",sg);Ff(document,"keyup",sg);Ff(document,"mousedown",sg);Ff(document,"mouseup",sg);Be("page-mouse",sg);Be("page-scroll",sg);Be("page-resize",sg)}}
function sg(){null==r("_lact",window)&&(rg(),r("_lact",window));var a=x();q("_lact",a,window);Fe("USER_ACTIVE")}
function tg(){var a=r("_lact",window);return null==a?-1:Math.max(x()-a,0)}
;function ug(a,b,c,d,e){var f={};f.eventTimeMs=Math.round(d||oe());f[a]=b;W("web_gel_lact")&&(f.context={lastActivityMs:tg()});ng({endpoint:"log_event",va:f,da:e},c)}
;function vg(a){a={client:{hl:a.Na,gl:a.Ma,clientName:a.La,clientVersion:a.innertubeContextClientVersion}};T("DELEGATED_SESSION_ID")&&(a.user={onBehalfOfUser:T("DELEGATED_SESSION_ID")});return a}
function wg(){return{apiaryHost:T("APIARY_HOST",void 0),Da:T("APIARY_HOST_FIRSTPARTY",void 0),gapiHintOverride:!!T("GAPI_HINT_OVERRIDE",void 0),gapiHintParams:T("GAPI_HINT_PARAMS",void 0),innertubeApiKey:T("INNERTUBE_API_KEY",void 0),innertubeApiVersion:T("INNERTUBE_API_VERSION",void 0),La:T("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:T("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),Na:T("INNERTUBE_CONTEXT_HL",void 0),Ma:T("INNERTUBE_CONTEXT_GL",void 0),mb:T("XHR_APIARY_HOST",
void 0)}}
;function xg(){this.b=wg()}
xg.prototype.f=function(){return{context:vg(this.b)}};
xg.prototype.g=function(a,b,c){T("VISITOR_DATA")||U(Error("Missing VISITOR_DATA when sending innertube request."));b={headers:{"Content-Type":"application/json","X-Goog-Visitor-Id":T("VISITOR_DATA","")},D:b,wa:"JSON",O:c.O,N:c.N,onError:c.onError,timeout:c.timeout,withCredentials:!0};a:{c=[];var d=jc(String(n.location.href)),e=n.__OVERRIDE_SID;null==e&&(e=(new yc(document)).get("SID"));if(e&&(d=(e=0==d.indexOf("https:")||0==d.indexOf("chrome-extension:"))?n.__SAPISID:n.__APISID,null==d&&(d=(new yc(document)).get(e?
"SAPISID":"APISID")),d)){var e=e?"SAPISIDHASH":"APISIDHASH",f=String(n.location.href);c=f&&d&&e?[e,wc(jc(f),d,c||null)].join(" "):null;break a}c=null}c&&(b.headers.Authorization=c,b.headers["X-Goog-AuthUser"]=T("SESSION_INDEX",0));c=this.b.mb;c.startsWith("http")||(c="//"+c);W("youtubei_for_web")&&(c="");hf(""+c+("/youtubei/"+this.b.innertubeApiVersion+"/"+a)+"?alt=json&key="+this.b.innertubeApiKey,b)};var yg=r("yt.logging.latency.usageStats_")||{};q("yt.logging.latency.usageStats_",yg,void 0);var zg=0;function Ag(a){yg[a]=yg[a]||{count:0};var b=yg[a];b.count++;b.time=oe();zg||(zg=of(Bg,0));return 10<b.count?(11==b.count&&jf(Error("CSI data exceeded logging limit with key: "+a)),!0):!1}
function Bg(){var a=oe(),b;for(b in yg)6E4<a-yg[b].time&&delete yg[b];zg=0}
;function Cg(a,b,c,d){Dg(a,{attachChild:{csn:b,parentVisualElement:hg(c),visualElements:[hg(d)]}},void 0)}
function Eg(a,b,c){c=Ca(c,function(a){return hg(a)});
Dg(a,{visibilityUpdate:{csn:b,visualElements:c}})}
function Dg(a,b,c){b.eventTimeMs=Math.round(oe());b.lactMs=tg();c&&(b.clientData=Fg(c));ng({endpoint:"log_interaction",va:b},a)}
function Fg(a){var b={};a.analyticsChannelData&&(b.analyticsDatas=Ca(a.analyticsChannelData,function(a){return{tabName:a.tabName,cardName:a.cardName,isChannelScreen:a.isChannelScreen,insightId:a.insightId,externalChannelId:a.externalChannelId,externalContentOwnerId:a.externalContentOwnerId}}));
return{playbackData:{clientPlaybackNonce:a.clientPlaybackNonce},analyticsChannelData:b,externalLinkData:a.externalLinkData}}
;function Gg(){if(!Hg&&!Ig||!window.JSON)return null;var a;try{a=Hg.get("yt-player-two-stage-token")}catch(b){}if(!u(a))try{a=Ig.get("yt-player-two-stage-token")}catch(b){}if(!u(a))return null;try{a=JSON.parse(a,void 0)}catch(b){}return a}
var Ig,Jg=new me;Ig=Jg.isAvailable()?new ie(Jg):null;var Hg,Kg=new ne;Hg=Kg.isAvailable()?new ie(Kg):null;function Lg(){var a=T("ROOT_VE_TYPE",void 0);return a?new fg(void 0,a,void 0):null}
function Mg(){var a=T("client-screen-nonce",void 0);a||(a=T("EVENT_ID",void 0));return a}
;var Ng={},Og=0;function Pg(a,b){a&&(T("USE_NET_AJAX_FOR_PING_TRANSPORT",!1)?cf(a,b):Qg(a,b))}
function Qg(a,b){var c=new Image,d=""+Og++;Ng[d]=c;c.onload=c.onerror=function(){b&&Ng[d]&&b();delete Ng[d]};
c.src=a}
;function Rg(a,b){this.version=a;this.args=b}
;function Sg(a){this.topic=a}
Sg.prototype.toString=function(){return this.topic};var Tg=r("yt.pubsub2.pubsub2.instance_")||new R;R.prototype.subscribe=R.prototype.subscribe;R.prototype.unsubscribeByKey=R.prototype.K;R.prototype.publish=R.prototype.V;R.prototype.clear=R.prototype.clear;q("yt.pubsub2.pubsub2.instance_",Tg,void 0);var Ug=r("yt.pubsub2.pubsub2.subscribedKeys_")||{};q("yt.pubsub2.pubsub2.subscribedKeys_",Ug,void 0);var Vg=r("yt.pubsub2.pubsub2.topicToKeys_")||{};q("yt.pubsub2.pubsub2.topicToKeys_",Vg,void 0);var Wg=r("yt.pubsub2.pubsub2.isAsync_")||{};
q("yt.pubsub2.pubsub2.isAsync_",Wg,void 0);q("yt.pubsub2.pubsub2.skipSubKey_",null,void 0);function Xg(a){var b=Yg,c=r("yt.pubsub2.pubsub2.instance_");c&&c.publish.call(c,b.toString(),b,a)}
;var X=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance||{};function Zg(a,b){Rg.call(this,1,arguments)}
z(Zg,Rg);var Yg=new Sg("timing-sent");var $g=x().toString();var ah={vc:!0},bh={ad_at:"adType",cpn:"clientPlaybackNonce",csn:"clientScreenNonce",is_nav:"isNavigation",yt_lt:"loadType",yt_ad:"isMonetized",yt_ad_pr:"prerollAllowed",yt_red:"isRedSubscriber",yt_vis:"isVisible",docid:"videoId",plid:"videoId"},ch="ap c cver ei yt_fss yt_li".split(" "),dh=["isNavigation","isMonetized","prerollAllowed","isRedSubscriber","isVisible"],eh=v(X.clearResourceTimings||X.webkitClearResourceTimings||X.mozClearResourceTimings||X.msClearResourceTimings||X.oClearResourceTimings||
t,X);
function fh(a){if("_"!=a[0]){var b=a;X.mark&&(0==b.lastIndexOf("mark_",0)||(b="mark_"+b),X.mark(b))}var b=gh(),c=oe();b[a]&&(b["_"+a]=b["_"+a]||[b[a]],b["_"+a].push(c));b[a]=c;hh()["tick_"+a]=void 0;oe();W("csi_on_gel")?(b=ih(),"_start"==a?Ag("baseline_"+b)||ug("latencyActionBaselined",{clientActionNonce:b},xg,void 0):Ag("tick_"+a+"_"+b)||ug("latencyActionTicked",{tickName:a,clientActionNonce:b},xg,void 0),a=!0):a=!1;if(a=!a)a=!r("yt.timing.pingSent_");if(a&&(b=T("TIMING_ACTION",void 0),a=gh(),r("yt.timing.ready_")&&
b&&a._start&&jh())){b=!0;c=T("TIMING_WAIT",[]);if(c.length)for(var d=0,e=c.length;d<e;++d)if(!(c[d]in a)){b=!1;break}b&&kh()}}
function lh(){var a=mh().info.yt_lt="hot_bg";hh().info_yt_lt=a;if(W("csi_on_gel"))if("yt_lt"in bh){var b={},c=bh.yt_lt;0<=Ba(dh,c)&&(a=!!a);b[c]=a;a=ih();c=Object.keys(b).join("");Ag("info_"+c+"_"+a)||(b.clientActionNonce=a,ug("latencyActionInfo",b,xg))}else"yt_lt"in ch||U(Error("Unknown label yt_lt logged with GEL CSI."))}
function jh(){var a=gh();if(a.aft)return a.aft;for(var b=T("TIMING_AFT_KEYS",["ol"]),c=b.length,d=0;d<c;d++){var e=a[b[d]];if(e)return e}return NaN}
function kh(){if(!W("csi_on_gel")){var a=gh(),b=mh().info,c=a._start,d;for(d in a)if(0==d.lastIndexOf("_",0)&&na(a[d])){var e=d.slice(1);if(e in ah){var f=Ca(a[d],function(a){return Math.round(a-c)});
b["all_"+e]=f.join()}delete a[d]}e=!!b.ap;if(f=r("yt.timing.reportbuilder_")){if(f=f(a,b,void 0))nh(f,e),oh(),eh(),ph(!1,void 0),T("TIMING_ACTION")&&S("PREVIOUS_ACTION",T("TIMING_ACTION")),S("TIMING_ACTION","")}else{var g=T("CSI_SERVICE_NAME","youtube"),f={v:2,s:g,action:T("TIMING_ACTION",void 0)},h=b.srt;void 0!==a.srt&&delete b.srt;if(b.h5jse){var k=window.location.protocol+r("ytplayer.config.assets.js");(k=X.getEntriesByName?X.getEntriesByName(k)[0]:null)?b.h5jse=Math.round(b.h5jse-k.responseEnd):
delete b.h5jse}a.aft=jh();qh()&&"youtube"==g&&(lh(),g=a.vc,k=a.pbs,delete a.aft,b.aft=Math.round(k-g));for(var m in b)"_"!=m.charAt(0)&&(f[m]=b[m]);a.ps=oe();b={};m=[];for(d in a)"_"!=d.charAt(0)&&(g=Math.round(a[d]-c),b[d]=g,m.push(d+"."+g));f.rt=m.join(",");(a=r("ytdebug.logTiming"))&&a(f,b);nh(f,e,void 0);Xg(new Zg(b.aft+(h||0),void 0))}}}
function nh(a,b,c){if(W("debug_csi_data")){var d=r("yt.timing.csiData");d||(d=[],q("yt.timing.csiData",d,void 0));d.push({page:location.href,time:new Date,args:a})}var d="",e;for(e in a)d+="&"+e+"="+a[e];a="/csi_204?"+d.substring(1);if(window.navigator&&window.navigator.sendBeacon&&b)try{window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,"")||Pg(a,void 0)}catch(f){Pg(a,void 0)}else Pg(a);ph(!0,c)}
function ih(){var a=mh().nonce;if(!a){var b;a:{if(window.crypto&&window.crypto.getRandomValues)try{var c=Array(16),d=new Uint8Array(16);window.crypto.getRandomValues(d);for(a=0;a<c.length;a++)c[a]=d[a];b=c;break a}catch(e){}b=Array(16);for(c=0;16>c;c++){d=x();for(a=0;a<d%23;a++)b[c]=Math.random();b[c]=Math.floor(256*Math.random())}if($g)for(c=1,d=0;d<$g.length;d++)b[c%16]=b[c%16]^b[(c-1)%16]/4^$g.charCodeAt(d),c++}c=[];for(d=0;d<b.length;d++)c.push("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".charAt(b[d]&
63));a=c.join("");mh().nonce=a}return a}
function gh(){return mh().tick}
function hh(){var a=mh();"gel"in a||(a.gel={});return a.gel}
function mh(){return r("ytcsi.data_")||oh()}
function oh(){var a={tick:{},info:{}};q("ytcsi.data_",a,void 0);return a}
function ph(a,b){q("yt.timing."+(b||"")+"pingSent_",a,void 0)}
function qh(){var a=gh(),b=a.pbr,c=a.vc,a=a.pbs;return b&&c&&a&&b<c&&c<a&&1==mh().info.yt_pvis}
;function rh(a,b){P.call(this);this.w=this.l=a;this.T=b;this.B=!1;this.g={};this.Z=this.S=null;this.U=new R;yd(this,w(zd,this.U));this.j={};this.J=this.aa=this.i=this.ha=this.b=null;this.W=!1;this.L=this.C=this.H=this.R=null;this.ba={};this.Ca=["onReady"];this.X=new cg(this);yd(this,w(zd,this.X));this.fa=null;this.oa=NaN;this.Y={};sh(this);this.G("onDetailedError",v(this.Sa,this));this.G("onTabOrderChange",v(this.Ea,this));this.G("onTabAnnounce",v(this.pa,this));this.G("WATCH_LATER_VIDEO_ADDED",v(this.Ta,
this));this.G("WATCH_LATER_VIDEO_REMOVED",v(this.Ua,this));wb||(this.G("onMouseWheelCapture",v(this.Qa,this)),this.G("onMouseWheelRelease",v(this.Ra,this)));this.G("onAdAnnounce",v(this.pa,this));this.M=new cg(this);yd(this,w(zd,this.M));this.ga=!1;this.ea=null}
z(rh,P);var th=["drm.unavailable","fmt.noneavailable","html5.missingapi","html5.unsupportedads","html5.unsupportedlive"];l=rh.prototype;l.na=function(a,b){this.f||(uh(this,a),vh(this,b),this.B&&wh(this))};
function uh(a,b){a.ha=b;a.b=yf(b);a.i=a.b.attrs.id||a.i;"video-player"==a.i&&(a.i=a.T,a.b.attrs.id=a.T);a.w.id==a.i&&(a.i+="-player",a.b.attrs.id=a.i);a.b.args.enablejsapi="1";a.b.args.playerapiid=a.T;a.aa||(a.aa=xh(a,a.b.args.jsapicallback||"onYouTubePlayerReady"));a.b.args.jsapicallback=null;var c=a.b.attrs.width;c&&(a.w.style.width=Ub(Number(c)||c));if(c=a.b.attrs.height)a.w.style.height=Ub(Number(c)||c)}
l.Ha=function(){return this.ha};
function wh(a){a.b.loaded||(a.b.loaded=!0,"0"!=a.b.args.autoplay?a.g.loadVideoByPlayerVars(a.b.args):a.g.cueVideoByPlayerVars(a.b.args))}
function yh(a){if(!p(a.b.disable.flash)){var b=a.b.disable,c;c=If(Hf.getInstance(),a.b.minVersion);b.flash=!c}return!a.b.disable.flash}
function zh(a,b){if((!b||(5!=(Sf[b.errorCode]||5)?0:-1!=th.indexOf(b.errorCode)))&&yh(a)){var c=Ah(a);c&&c.stopVideo&&c.stopVideo();var d=a.b;c&&c.getUpdatedConfigurationData&&(c=c.getUpdatedConfigurationData(),d=xf(c));d.args.autoplay=1;d.args.html5_unavailable="1";uh(a,d);vh(a,"flash")}}
function vh(a,b){if(!a.f){if(!b){var c;if(!(c=!a.b.html5&&yh(a))){if(!p(a.b.disable.html5)){var d;c=!0;void 0!=a.b.args.deviceHasDisplay&&(c=a.b.args.deviceHasDisplay);if(2.2==Tf)d=!0;else{a:{var e=c;c=r("yt.player.utils.videoElement_");c||(c=document.createElement("VIDEO"),q("yt.player.utils.videoElement_",c,void 0));try{if(c.canPlayType)for(var e=e?ag:bg,f=0;f<e.length;f++)if(c.canPlayType(e[f])){d=null;break a}d="fmt.noneavailable"}catch(g){d="html5.missingapi"}}d=!d}d&&(d=Bh(a)||a.b.assets.js);
a.b.disable.html5=!d;d||(a.b.args.html5_unavailable="1")}c=!!a.b.disable.html5}b=c?yh(a)?"flash":"unsupported":"html5"}("flash"==b?a.kb:a.lb).call(a)}}
function Bh(a){var b=!0,c=Ah(a);c&&a.b&&(a=a.b,b=ue(c,"version")==a.assets.js);return b&&!!r("yt.player.Application.create")}
l.lb=function(){if(!this.W){var a=Bh(this);if(a&&"html5"==Ch(this))this.J="html5",this.B||this.P();else if(Dh(this),this.J="html5",a&&this.H)this.l.appendChild(this.H),this.P();else{this.b.loaded=!0;var b=!1;this.R=v(function(){b=!0;var a=this.l,d=yf(this.b);r("yt.player.Application.create")(a,d);this.P()},this);
this.W=!0;a?this.R():(Oe(this.b.assets.js,this.R),Kf(this.b.assets.css),Eh(this)&&!b&&q("yt.player.Application.create",null,void 0))}}};
l.kb=function(){var a=yf(this.b);if(!this.C){var b=Ah(this);b&&(this.C=document.createElement("SPAN"),this.C.tabIndex=0,dg(this.X,this.C,"focus",this.ta),this.L=document.createElement("SPAN"),this.L.tabIndex=0,dg(this.X,this.L,"focus",this.ta),b.parentNode&&b.parentNode.insertBefore(this.C,b),b.parentNode&&b.parentNode.insertBefore(this.L,b.nextSibling))}a.attrs.width=a.attrs.width||"100%";a.attrs.height=a.attrs.height||"100%";if("flash"==Ch(this))this.J="flash",this.B||this.P();else{Dh(this);this.J=
"flash";this.b.loaded=!0;var b=Hf.getInstance(),c=(-1<b.i.indexOf("Gnash")&&-1==b.i.indexOf("AVM2")||9==b.b&&1==b.f||9==b.b&&0==b.f&&1==b.g?0:9<=b.b)||-1<navigator.userAgent.indexOf("Sony/COM2")&&!If(b,9,1,58)?a.url:a.urlV9As2;window!=window.top&&document.referrer&&(a.args.framer=document.referrer.substring(0,128));b=this.l;if(c){var b=u(b)?Ob(b):b,d=$a(a.attrs);d.tabindex=0;var e=$a(a.params);e.flashvars=Ye(a.args);if(pe){d.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";e.movie=c;var a=document.createElement("object"),
f;for(f in d)a.setAttribute(f,d[f]);for(var g in e)f=document.createElement("param"),f.setAttribute("name",g),f.setAttribute("value",e[g]),a.appendChild(f)}else{d.type="application/x-shockwave-flash";d.src=c;a=document.createElement("embed");a.setAttribute("name",d.id);for(var h in d)a.setAttribute(h,d[h]);for(var k in e)a.setAttribute(k,e[k])}g=document.createElement("div");g.appendChild(a);b.innerHTML=g.innerHTML}this.P()}};
l.ta=function(){Ah(this).focus()};
function Ah(a){var b=Ob(a.i);!b&&a.w&&a.w.querySelector&&(b=a.w.querySelector("#"+a.i));return b}
l.P=function(){if(!this.f){var a=Ah(this),b=!1;try{a&&a.getApiInterface&&a.getApiInterface()&&(b=!0)}catch(f){}if(b)if(this.W=!1,a.isNotServable&&a.isNotServable(this.b.args.video_id))zh(this);else{sh(this);this.B=!0;a=Ah(this);a.addEventListener&&(this.S=Fh(this,a,"addEventListener"));a.removeEventListener&&(this.Z=Fh(this,a,"removeEventListener"));for(var b=a.getApiInterface(),b=b.concat(a.getInternalApiInterface()),c=0;c<b.length;c++){var d=b[c];this.g[d]||(this.g[d]=Fh(this,a,d))}for(var e in this.j)this.S(e,
this.j[e]);wh(this);this.aa&&this.aa(this.g);this.U.V("onReady",this.g)}else this.oa=V(v(this.P,this),50)}};
function Fh(a,b,c){var d=b[c];return function(){try{return a.fa=null,d.apply(b,arguments)}catch(e){"Bad NPObject as private data!"!=e.message&&"sendAbandonmentPing"!=c&&(e.message+=" ("+c+")",a.fa=e,U(e,"WARNING"))}}}
function sh(a){a.B=!1;if(a.Z)for(var b in a.j)a.Z(b,a.j[b]);for(var c in a.Y)window.clearTimeout(parseInt(c,10));a.Y={};a.S=null;a.Z=null;for(var d in a.g)a.g[d]=null;a.g.addEventListener=v(a.G,a);a.g.removeEventListener=v(a.ab,a);a.g.destroy=v(a.dispose,a);a.g.getLastError=v(a.Ia,a);a.g.getPlayerType=v(a.Ja,a);a.g.getCurrentVideoConfig=v(a.Ha,a);a.g.loadNewVideoConfig=v(a.na,a);a.g.isReady=v(a.nb,a)}
l.nb=function(){return this.B};
l.G=function(a,b){if(!this.f){var c=xh(this,b);if(c){if(!(0<=Ba(this.Ca,a)||this.j[a])){var d=Gh(this,a);this.S&&this.S(a,d)}this.U.subscribe(a,c);"onReady"==a&&this.B&&V(w(c,this.g),0)}}};
l.ab=function(a,b){if(!this.f){var c=xh(this,b);c&&be(this.U,a,c)}};
function xh(a,b){var c=b;if("string"==typeof b){if(a.ba[b])return a.ba[b];c=function(){var a=r(b);a&&a.apply(n,arguments)};
a.ba[b]=c}return c?c:null}
function Gh(a,b){var c="ytPlayer"+b+a.T;a.j[b]=c;n[c]=function(c){var d=V(function(){if(!a.f){a.U.V(b,c);var e=a.Y,g=String(d);g in e&&delete e[g]}},0);
Za(a.Y,String(d))};
return c}
l.Ea=function(a){a=a?Qb:Pb;for(var b=a(document.activeElement);b&&(1!=b.nodeType||b==this.C||b==this.L||(b.focus(),b!=document.activeElement));)b=a(b)};
l.pa=function(a){Fe("a11y-announce",a)};
l.Sa=function(a){zh(this,a)};
l.Ta=function(a){Fe("WATCH_LATER_VIDEO_ADDED",a)};
l.Ua=function(a){Fe("WATCH_LATER_VIDEO_REMOVED",a)};
l.Qa=function(){if(!this.ga){if(Ab){var a=document,b=a.scrollingElement?a.scrollingElement:hb||"CSS1Compat"!=a.compatMode?a.body||a.documentElement:a.documentElement,a=a.parentWindow||a.defaultView;this.ea=I&&J("10")&&a.pageYOffset!=b.scrollTop?new Ha(b.scrollLeft,b.scrollTop):new Ha(a.pageXOffset||b.scrollLeft,a.pageYOffset||b.scrollTop);dg(this.M,window,"scroll",this.Xa);dg(this.M,this.l,"touchmove",this.Wa)}else dg(this.M,this.l,"mousewheel",this.ua),dg(this.M,this.l,"wheel",this.ua);this.ga=!0}};
l.Ra=function(){eg(this.M);this.ga=!1};
l.ua=function(a){a=a||window.event;a.returnValue=!1;a.preventDefault&&a.preventDefault()};
l.Xa=function(){window.scrollTo(this.ea.b,this.ea.f)};
l.Wa=function(a){a.preventDefault()};
l.Ja=function(){return this.J||Ch(this)};
l.Ia=function(){return this.fa};
function Ch(a){return(a=Ah(a))?"div"==a.tagName.toLowerCase()?"html5":"flash":null}
function Dh(a){fh("dcp");a.cancel();sh(a);a.J=null;a.b&&(a.b.loaded=!1);var b=Ah(a);"html5"==Ch(a)?Bh(a)||!Eh(a)?a.H=b:(b&&b.destroy&&b.destroy(),a.H=null):b&&b.destroy&&b.destroy();for(var b=a.l,c;c=b.firstChild;)b.removeChild(c);eg(a.X);a.C=null;a.L=null}
l.cancel=function(){this.R&&Ne(this.b.assets.js,this.R);window.clearTimeout(this.oa);this.W=!1};
l.o=function(){Dh(this);if(this.H&&this.b)try{this.H.destroy()}catch(b){U(b)}this.ba=null;for(var a in this.j)n[this.j[a]]=null;this.ha=this.b=this.g=null;delete this.l;delete this.w;rh.A.o.call(this)};
function Eh(a){return a.b&&a.b.args&&a.b.args.fflags?-1!=a.b.args.fflags.indexOf("player_destroy_old_version=true"):!1}
;var Hh={},Ih="player_uid_"+(1E9*Math.random()>>>0);function Jh(a,b){a=u(a)?Ob(a):a;b=xf(b);var c=Ih+"_"+ra(a),d=Hh[c];if(d)return d.na(b),d.g;d=new rh(a,c);Hh[c]=d;Fe("player-added",d.g);yd(d,w(Kh,d));V(function(){d.na(b)},0);
return d.g}
function Kh(a){Hh[a.T]=null}
function Lh(a){a=Ob(a);if(!a)return null;var b=Ih+"_"+ra(a),c=Hh[b];c||(c=new rh(a,b),Hh[b]=c);return c.g}
;function Mh(a,b,c){b=void 0===b?{}:b;c=void 0===c?!1:c;var d=T("EVENT_ID");d&&(b.ei||(b.ei=d));if(b){var d=a,e=T("VALID_SESSION_TEMPDATA_DOMAINS",[]),f=Wb(K(window.location.href)[3]||null);f&&e.push(f);f=Wb(K(d)[3]||null);if(0<=Ba(e,f)||!f&&0==d.lastIndexOf("/",0))if(W("autoescape_tempdata_url")&&(e=document.createElement("a"),Nb(e,d),d=e.href),d){var f=K(d),d=f[5],e=f[6],f=f[7],g="";d&&(g+=d);e&&(g+="?"+e);f&&(g+="#"+f);d=g;e=d.indexOf("#");if(d=0>e?d:d.substr(0,e)){if(b.itct||b.ved)b.csn=b.csn||
Mg();d="ST-"+Aa(d).toString(36);e=b?Ye(b):"";zc.set(""+d,e,5,"/","youtube.com");b&&(b=b.itct||b.ved,d=r("yt.logging.screen.storeParentElement"),b&&d&&d(new fg(b)))}}}if(c)return!1;if((window.ytspf||{}).enabled)spf.navigate(a);else{var h,k,m;h=void 0===h?{}:h;k=void 0===k?"":k;m=void 0===m?window:m;c=m.location;a=Xb(Zb([a],h))+k;a=a instanceof Fb?a:Jb(a);c.href=Hb(a)}return!0}
;var Nh=r("yt.abuse.botguardInitialized")||Re;q("yt.abuse.botguardInitialized",Nh,void 0);var Oh=r("yt.abuse.invokeBotguard")||Se;q("yt.abuse.invokeBotguard",Oh,void 0);var Ph=r("yt.abuse.dclkstatus.checkDclkStatus")||sf;q("yt.abuse.dclkstatus.checkDclkStatus",Ph,void 0);var Qh=r("yt.player.exports.navigate")||Mh;q("yt.player.exports.navigate",Qh,void 0);var Rh=r("yt.player.embed")||Jh;q("yt.player.embed",Rh,void 0);var Sh=r("yt.player.getPlayerByElement")||Lh;q("yt.player.getPlayerByElement",Sh,void 0);
var Th=r("yt.util.activity.init")||rg;q("yt.util.activity.init",Th,void 0);var Uh=r("yt.util.activity.getTimeSinceActive")||tg;q("yt.util.activity.getTimeSinceActive",Uh,void 0);var Vh=r("yt.util.activity.setTimestamp")||sg;q("yt.util.activity.setTimestamp",Vh,void 0);function Wh(a){this.b=a||wg();Xh||(Xh=Yh(this.b))}
function Yh(a){return(new Q(function(b){try{var c={gapiHintOverride:a.gapiHintOverride,_c:{jsl:{h:a.gapiHintParams}},callback:b},d=pa(c)?{callback:c}:c||{};d._c&&d._c.jsl&&d._c.jsl.h||bb(d,{_c:{jsl:{h:T("GAPI_HINT_PARAMS",void 0)}}});if(d.gapiHintOverride||T("GAPI_HINT_OVERRIDE")){var e;var f=document.location.href;if(-1!=f.indexOf("?")){var f=(f||"").split("#")[0],g=f.split("?",2);e=We(1<g.length?g[1]:g[0])}else e={};var h=e.gapi_jsh;h&&bb(d,{_c:{jsl:{h:h}}})}dd("client",d)}catch(k){U(k)}})).then(function(){})}
Wh.prototype.i=function(){var a=r("gapi.config.update");a("googleapis.config/auth/useFirstPartyAuth",!0);var b=this.b.apiaryHost;/^[\s\xa0]*$/.test(null==b?"":String(b))||a("googleapis.config/root",(-1==b.indexOf("://")?"//":"")+b);b=this.b.Da;/^[\s\xa0]*$/.test(null==b?"":String(b))||a("googleapis.config/root-1p",(-1==b.indexOf("://")?"//":"")+b);b=T("SESSION_INDEX");a("googleapis.config/sessionIndex",b);r("gapi.client.setApiKey")(this.b.innertubeApiKey)};
Wh.prototype.f=function(){return{context:vg(this.b)}};
Wh.prototype.g=function(a,b,c){var d,e=!1;0<c.timeout&&(d=V(function(){e||(e=!0,c.O&&c.O())},c.timeout));
Zh(this,a,b,function(a){if(!e)if(e=!0,d&&window.clearTimeout(d),a)c.N&&c.N(a);else if(c.onError)c.onError()})};
function Zh(a,b,c,d){var e={path:"/youtubei/"+a.b.innertubeApiVersion+"/"+b,headers:{"X-Goog-Visitor-Id":T("VISITOR_DATA")},method:"POST",body:Ed(c)},f=v(a.i,a);Xh.then(function(){f();r("gapi.client.request")(e).execute(d||t)})}
var Xh=null;function $h(){return W("enable_youtubei_innertube")?xg:Wh}
;function ai(a){return(0==a.search("cue")||0==a.search("load"))&&"loadModule"!=a}
function bi(a,b,c){u(a)&&(a={mediaContentUrl:a,startSeconds:b,suggestedQuality:c});b=/\/([ve]|embed)\/([^#?]+)/.exec(a.mediaContentUrl);a.videoId=b&&b[2]?b[2]:null;return ci(a)}
function ci(a,b,c){if(qa(a)){b="endSeconds startSeconds mediaContentUrl suggestedQuality videoId two_stage_token".split(" ");c={};for(var d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}return{videoId:a,startSeconds:b,suggestedQuality:c}}
function di(a,b,c,d){if(qa(a)&&!na(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}c={index:b,startSeconds:c,suggestedQuality:d};u(a)&&16==a.length?c.list="PL"+a:c.playlist=a;return c}
function ei(a){var b=a.video_id||a.videoId;if(u(b)){var c=Gg()||{},d=Gg()||{};p(void 0)?d[b]=void 0:delete d[b];var e=x()+3E5,f=Ig;if(f&&window.JSON){u(d)||(d=JSON.stringify(d,void 0));try{f.set("yt-player-two-stage-token",d,e)}catch(g){f.remove("yt-player-two-stage-token")}}(b=c[b])&&(a.two_stage_token=b)}}
;function fi(a){P.call(this);this.g=a;this.g.subscribe("command",this.xa,this);this.i={};this.j=!1}
z(fi,P);l=fi.prototype;l.start=function(){this.j||this.f||(this.j=!0,gi(this.g,"RECEIVING"))};
l.xa=function(a,b){if(this.j&&!this.f){var c=b||{};switch(a){case "addEventListener":if(u(c.event)&&(c=c.event,!(c in this.i))){var d=v(this.cb,this,c);this.i[c]=d;this.addEventListener(c,d)}break;case "removeEventListener":u(c.event)&&hi(this,c.event);break;default:this.b.isReady()&&this.b[a]&&(c=ii(a,b||{}),c=this.b[a].apply(this.b,c),(c=ji(a,c))&&this.j&&!this.f&&gi(this.g,a,c))}}};
l.cb=function(a,b){this.j&&!this.f&&gi(this.g,a,this.ia(a,b))};
l.ia=function(a,b){if(null!=b)return{value:b}};
function hi(a,b){b in a.i&&(a.removeEventListener(b,a.i[b]),delete a.i[b])}
l.o=function(){var a=this.g;a.f||be(a.b,"command",this.xa,this);this.g=null;for(var b in this.i)hi(this,b);fi.A.o.call(this)};function ki(a,b){fi.call(this,b);this.b=a;this.start()}
z(ki,fi);ki.prototype.addEventListener=function(a,b){this.b.addEventListener(a,b)};
ki.prototype.removeEventListener=function(a,b){this.b.removeEventListener(a,b)};
function ii(a,b){switch(a){case "loadVideoById":return b=ci(b),ei(b),[b];case "cueVideoById":return b=ci(b),ei(b),[b];case "loadVideoByPlayerVars":return ei(b),[b];case "cueVideoByPlayerVars":return ei(b),[b];case "loadPlaylist":return b=di(b),ei(b),[b];case "cuePlaylist":return b=di(b),ei(b),[b];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];
case "setLoop":return[b.loopPlaylists];case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey]}return[]}
function ji(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
ki.prototype.ia=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return ki.A.ia.call(this,a,b)};
ki.prototype.o=function(){ki.A.o.call(this);delete this.b};function li(a,b,c,d){P.call(this);this.i=b||null;this.B="*";this.j=c||null;this.b=null;this.channel=d||null;this.J=!!a;this.C=v(this.H,this);window.addEventListener("message",this.C)}
aa(li,P);li.prototype.H=function(a){if(!("*"!=this.j&&a.origin!=this.j||this.i&&a.source!=this.i)&&u(a.data)){var b;try{b=Cd(a.data)}catch(c){return}if(!(null==b||this.J&&(this.b&&this.b!=b.id||this.channel&&this.channel!=b.channel))&&b)switch(b.event){case "listening":"null"!=a.origin?this.j=this.B=a.origin:U(Error("MessageEvent origin is null"),"WARNING");this.i=a.source;this.b=b.id;this.g&&(this.g(),this.g=null);break;case "command":this.l&&(this.w&&!(0<=Ba(this.w,b.func))||this.l(b.func,b.args))}}};
li.prototype.sendMessage=function(a,b){var c=b||this.i;if(c){this.b&&(a.id=this.b);this.channel&&(a.channel=this.channel);try{var d=Ed(a);c.postMessage(d,this.B)}catch(e){U(e,"WARNING")}}};
li.prototype.o=function(){window.removeEventListener("message",this.C);P.prototype.o.call(this)};function mi(a,b,c){li.call(this,a,b,c||T("POST_MESSAGE_ORIGIN",void 0)||window.document.location.protocol+"//"+window.document.location.hostname,"widget");this.w=this.g=this.l=null}
aa(mi,li);function ni(){var a=!!T("WIDGET_ID_ENFORCE"),a=this.f=new mi(a),b=v(this.Za,this);a.l=b;a.w=null;this.f.channel="widget";if(a=T("WIDGET_ID"))this.f.b=a;this.i=[];this.l=!1;this.j={}}
l=ni.prototype;l.Za=function(a,b){if("addEventListener"==a&&b){var c=b[0];this.j[c]||"onReady"==c||(this.addEventListener(c,oi(this,c)),this.j[c]=!0)}else this.Aa(a,b)};
l.Aa=function(){};
function oi(a,b){return v(function(a){this.sendMessage(b,a)},a)}
l.addEventListener=function(){};
l.Ga=function(){this.l=!0;this.sendMessage("initialDelivery",this.ja());this.sendMessage("onReady");C(this.i,this.za,this);this.i=[]};
l.ja=function(){return null};
function pi(a,b){a.sendMessage("infoDelivery",b)}
l.za=function(a){this.l?this.f.sendMessage(a):this.i.push(a)};
l.sendMessage=function(a,b){this.za({event:a,info:void 0==b?null:b})};
l.dispose=function(){this.f=null};function qi(a){ni.call(this);this.b=a;this.g=[];this.addEventListener("onReady",v(this.Va,this));this.addEventListener("onVideoProgress",v(this.hb,this));this.addEventListener("onVolumeChange",v(this.ib,this));this.addEventListener("onApiChange",v(this.bb,this));this.addEventListener("onPlaybackQualityChange",v(this.eb,this));this.addEventListener("onPlaybackRateChange",v(this.fb,this));this.addEventListener("onStateChange",v(this.gb,this))}
z(qi,ni);l=qi.prototype;l.Aa=function(a,b){if(this.b[a]){b=b||[];if(0<b.length&&ai(a)){var c;c=b;if(qa(c[0])&&!na(c[0]))c=c[0];else{var d={};switch(a){case "loadVideoById":case "cueVideoById":d=ci.apply(window,c);break;case "loadVideoByUrl":case "cueVideoByUrl":d=bi.apply(window,c);break;case "loadPlaylist":case "cuePlaylist":d=di.apply(window,c)}c=d}ei(c);b.length=1;b[0]=c}this.b[a].apply(this.b,b);ai(a)&&pi(this,this.ja())}};
l.Va=function(){var a=v(this.Ga,this);this.f.g=a};
l.addEventListener=function(a,b){this.g.push({eventType:a,listener:b});this.b.addEventListener(a,b)};
l.ja=function(){if(!this.b)return null;var a=this.b.getApiInterface();Ea(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c],f=e;if(0==f.search("get")||0==f.search("is")){var f=e,g=0;0==f.search("get")?g=3:0==f.search("is")&&(g=2);f=f.charAt(g).toLowerCase()+f.substr(g+1);try{var h=this.b[e]();b[f]=h}catch(k){}}}b.videoData=this.b.getVideoData();b.currentTimeLastUpdated_=x()/1E3;return b};
l.gb=function(a){a={playerState:a,currentTime:this.b.getCurrentTime(),duration:this.b.getDuration(),videoData:this.b.getVideoData(),videoStartBytes:0,videoBytesTotal:this.b.getVideoBytesTotal(),videoLoadedFraction:this.b.getVideoLoadedFraction(),playbackQuality:this.b.getPlaybackQuality(),availableQualityLevels:this.b.getAvailableQualityLevels(),videoUrl:this.b.getVideoUrl(),playlist:this.b.getPlaylist(),playlistIndex:this.b.getPlaylistIndex(),currentTimeLastUpdated_:x()/1E3,playbackRate:this.b.getPlaybackRate(),
mediaReferenceTime:this.b.getMediaReferenceTime()};this.b.getProgressState&&(a.progressState=this.b.getProgressState());this.b.getStoryboardFormat&&(a.storyboardFormat=this.b.getStoryboardFormat());pi(this,a)};
l.eb=function(a){pi(this,{playbackQuality:a})};
l.fb=function(a){pi(this,{playbackRate:a})};
l.bb=function(){for(var a=this.b.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.b.getOptions(e);b[e]={options:f};for(var g=0,h=f.length;g<h;g++){var k=f[g],m=this.b.getOption(e,k);b[e][k]=m}}this.sendMessage("apiInfoDelivery",b)};
l.ib=function(){pi(this,{muted:this.b.isMuted(),volume:this.b.getVolume()})};
l.hb=function(a){a={currentTime:a,videoBytesLoaded:this.b.getVideoBytesLoaded(),videoLoadedFraction:this.b.getVideoLoadedFraction(),currentTimeLastUpdated_:x()/1E3,playbackRate:this.b.getPlaybackRate(),mediaReferenceTime:this.b.getMediaReferenceTime()};this.b.getProgressState&&(a.progressState=this.b.getProgressState());pi(this,a)};
l.dispose=function(){qi.A.dispose.call(this);for(var a=0;a<this.g.length;a++){var b=this.g[a];this.b.removeEventListener(b.eventType,b.listener)}this.g=[]};function ri(){P.call(this);this.b=new R;yd(this,w(zd,this.b))}
z(ri,P);ri.prototype.subscribe=function(a,b,c){return this.f?0:this.b.subscribe(a,b,c)};
ri.prototype.K=function(a){return this.f?!1:this.b.K(a)};
ri.prototype.l=function(a,b){this.f||this.b.V.apply(this.b,arguments)};function si(a,b,c){ri.call(this);this.g=a;this.i=b;this.j=c}
z(si,ri);function gi(a,b,c){if(!a.f){var d=a.g;d.f||a.i!=d.b||(a={id:a.j,command:b},c&&(a.data=c),d.b.postMessage(Ed(a),d.i))}}
si.prototype.o=function(){this.i=this.g=null;si.A.o.call(this)};function ti(a,b,c){P.call(this);this.b=a;this.i=c;this.j=Ff(window,"message",v(this.l,this));this.g=new si(this,a,b);yd(this,w(zd,this.g))}
z(ti,P);ti.prototype.l=function(a){var b;if(b=!this.f)if(b=a.origin==this.i)a:{b=this.b;do{var c;b:{c=a.source;do{if(c==b){c=!0;break b}if(c==c.parent)break;c=c.parent}while(null!=c);c=!1}if(c){b=!0;break a}b=b.opener}while(null!=b);b=!1}if(b&&(a=a.data,u(a))){try{a=Cd(a)}catch(d){return}a.command&&(b=this.g,b.f||b.l("command",a.command,a.data))}};
ti.prototype.o=function(){Gf(this.j);this.b=null;ti.A.o.call(this)};function ui(){var a=$a(vi);return new Q(function(b,c){a.N=function(a){Ve(a)?b(a):c(new wi("Request failed, status="+a.status,"net.badstatus"))};
a.onError=function(){c(new wi("Unknown request error","net.unknown"))};
a.O=function(){c(new wi("Request timed out","net.timeout"))};
bf("//googleads.g.doubleclick.net/pagead/id",a)})}
function wi(a,b){B.call(this,a+", errorCode="+b);this.errorCode=b;this.name="PromiseAjaxError"}
aa(wi,B);function xi(a){B.call(this,a.message||a.description||a.name);this.Oa=a instanceof yi;this.b=a instanceof Sd}
z(xi,B);xi.prototype.name="BiscottiError";function yi(){B.call(this,"Biscotti ID is missing from server")}
z(yi,B);yi.prototype.name="BiscottiMissingError";function zi(a,b){this.f=a;this.b=b}
zi.prototype.then=function(a,b,c){try{if(p(this.f))return a?Pd(a.call(c,this.f)):Pd(this.f);if(p(this.b)){if(!b)return Qd(this.b);var d=b.call(c,this.b);return!p(d)&&this.b.b?Qd(this.b):Pd(d)}throw Error("Invalid Result_ state");}catch(e){return Qd(e)}};
Kd(zi);var vi={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},Ai=null;function Bi(){if(!Ai){var a=v(Ci,n,2),b=ui().then(Di);Ai=Rd(b,null,a,void 0)}return Ai}
function Di(a){a=a.responseText;if(0!=a.lastIndexOf(")]}'",0))throw new yi;a=JSON.parse(a.substr(4)).id;Ei(a);Ai=new zi(a);Fi(18E5,2);return a}
function Ci(a,b){var c=new xi(b);Ei("");Ai=new zi(void 0,c);0<a&&Fi(12E4,a-1);throw c;}
function Fi(a,b){V(function(){var a=v(Ci,n,b),a=ui().then(Di,a);Rd(a,null,t,void 0)},a)}
function Ei(a){q("yt.ads.biscotti.lastId_",a,void 0)}
;function Gi(a){a.Oa&&Hi("")}
function Ii(a){!a||r("yt.ads.biscotti.getId_")||r("yt.www.ads.biscotti.getId_")||q("yt.ads.biscotti.getId_",Bi,void 0);try{var b;try{var c=r("yt.ads.biscotti.getId_")||r("yt.www.ads.biscotti.getId_");b=c?c():Bi()}catch(d){b=Qd(d)}b.then(Hi,Gi);V(Ii,18E5)}catch(d){U(d)}}
var Ji=0;
function Hi(a){var b;a:{try{b=window.top.location.href}catch(G){b=2;break a}b=null!=b?b==window.document.location.href?0:1:2}b={dt:ic,flash:Ta||"0",frm:b};b.u_tz=-(new Date).getTimezoneOffset();var c;try{c=A.history.length}catch(G){c=0}b.u_his=c;b.u_java=!!A.navigator&&"unknown"!==typeof A.navigator.javaEnabled&&!!A.navigator.javaEnabled&&A.navigator.javaEnabled();A.screen&&(b.u_h=A.screen.height,b.u_w=A.screen.width,b.u_ah=A.screen.availHeight,b.u_aw=A.screen.availWidth,b.u_cd=A.screen.colorDepth);A.navigator&&
A.navigator.plugins&&(b.u_nplug=A.navigator.plugins.length);A.navigator&&A.navigator.mimeTypes&&(b.u_nmime=A.navigator.mimeTypes.length);b.bid=a;b.ca_type=Sa?"flash":"image";if(W("enable_server_side_search_pyv")||W("enable_server_side_mweb_search_pyv")){var d,e;a=window;try{e=a.screenX;var f=a.screenY}catch(G){}try{var g=a.outerWidth,h=a.outerHeight}catch(G){}try{var k=a.innerWidth,m=a.innerHeight}catch(G){}e=[a.screenLeft,a.screenTop,e,f,a.screen?a.screen.availWidth:void 0,a.screen?a.screen.availTop:
void 0,g,h,k,m];f=window.top||A;try{var y;if(f.document&&!f.document.body)y=new Ia(-1,-1);else{var E=(f||window).document,Z="CSS1Compat"==E.compatMode?E.documentElement:E.body;y=(new Ia(Z.clientWidth,Z.clientHeight)).round()}d=y}catch(G){d=new Ia(-12245933,-12245933)}y=0;window.SVGElement&&document.createElementNS&&(y|=1);d={bc:y,bih:d.height,biw:d.width,brdim:e.join(),vis:{visible:1,hidden:2,prerender:3,preview:4}[xa.webkitVisibilityState||xa.mozVisibilityState||xa.visibilityState||""]||0,wgl:!!A.WebGLRenderingContext};
for(var ta in d)b[ta]=d[ta]}b.bsq=Ji++;hf("//www.youtube.com/ad_data_204",{Ka:!1,D:b})}
;function Ki(){this.b=T("ALT_PREF_COOKIE_NAME","PREF");var a=zc.get(""+this.b,void 0);if(a)for(var a=unescape(a).split("&"),b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(Y[d]=c.toString())}}
la(Ki);var Y=r("yt.prefs.UserPrefs.prefs_")||{};q("yt.prefs.UserPrefs.prefs_",Y,void 0);function Li(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function Mi(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function Ni(a){a=void 0!==Y[a]?Y[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
Ki.prototype.get=function(a,b){Mi(a);Li(a);var c=void 0!==Y[a]?Y[a].toString():null;return null!=c?c:b?b:""};
Ki.prototype.set=function(a,b){Mi(a);Li(a);if(null==b)throw Error("ExpectedNotNull");Y[a]=b.toString()};
Ki.prototype.remove=function(a){Mi(a);Li(a);delete Y[a]};
Ki.prototype.clear=function(){Y={}};q("yt.pubsub.publish",Fe,void 0);var Oi=null,Pi=null,Qi=null,Ri={};function Si(a){ug(a.payload_name,a.payload,W("enable_youtubei_innertube")?xg:Wh,void 0,void 0)}
function Ti(a){var b=a.id;a=a.ve_type;var c=gg++;a=new fg(void 0,a,c,void 0);Ri[b]=a;b=Mg();c=Lg();b&&c&&Cg($h(),b,c,a)}
function Ui(a){var b=a.csn;a=a.root_ve_type;if(b&&a&&(S("client-screen-nonce",b),S("ROOT_VE_TYPE",a),a=Lg()))for(var c in Ri){var d=b,e=a,f=Ri[c];Cg($h(),d,e,f)}}
function Vi(a){Ri[a.id]=new fg(a.tracking_params)}
function Wi(a){var b=Mg();a=Ri[a.id];if(b&&a){var c=$h();Dg(c,{click:{csn:b,visualElement:hg(a)}},void 0)}}
function Xi(a){a=a.ids;var b=Mg();if(b){for(var c=[],d=0;d<a.length;d++){var e=Ri[a[d]];e&&c.push(e)}c.length&&Eg($h(),b,c)}}
function Yi(){var a=Oi;a&&a.startInteractionLogging&&a.startInteractionLogging()}
;q("yt.setConfig",S,void 0);q("yt.config.set",S,void 0);q("yt.setMsg",nf,void 0);q("yt.msgs.set",nf,void 0);q("yt.logging.errors.log",jf,void 0);
q("writeEmbed",function(){var a=T("PLAYER_CONFIG",void 0);"1"!=a.privembed&&Ii(!0);"gvn"==a.args.ps&&(document.body.style.backgroundColor="transparent");var b=document.referrer,c=T("POST_MESSAGE_ORIGIN");window!=window.top&&b&&b!=document.URL&&(a.args.loaderUrl=b);T("LIGHTWEIGHT_AUTOPLAY")&&(a.args.autoplay="1");a.args.autoplay&&ei(a.args);Oi=a=Jh("player",a);a.addEventListener("onScreenChanged",Ui);a.addEventListener("onLogClientVeCreated",Ti);a.addEventListener("onLogServerVeCreated",Vi);a.addEventListener("onLogToGel",
Si);a.addEventListener("onLogVeClicked",Wi);a.addEventListener("onLogVesShown",Xi);a.addEventListener("onReady",Yi);b=T("POST_MESSAGE_ID","player");T("ENABLE_JS_API")?Qi=new qi(a):T("ENABLE_POST_API")&&u(b)&&u(c)&&(Pi=new ti(window.parent,b,c),Qi=new ki(a,Pi.g));T("BG_P")&&(T("BG_I")||T("BG_IU"))&&Qe();rf()},void 0);
q("yt.www.watch.ads.restrictioncookie.spr",function(a){Pg(a+"mac_204?action_fcts=1");return!0},void 0);
var Zi=we(function(){fh("ol");var a=Ki.getInstance(),b=1<window.devicePixelRatio;if(!!((Ni("f"+(Math.floor(119/31)+1))||0)&67108864)!=b){var c="f"+(Math.floor(119/31)+1),d=Ni(c)||0,d=b?d|67108864:d&-67108865;0==d?delete Y[c]:Y[c]=d.toString(16).toString();var a=a.b,b=[],e;for(e in Y)b.push(e+"="+escape(Y[e]));zc.set(""+a,b.join("&"),63072E3,"/","youtube.com")}}),$i=we(function(){var a=Oi;
a&&a.sendAbandonmentPing&&a.sendAbandonmentPing();T("PL_ATT")&&(Pe=null);for(var a=0,b=pf.length;a<b;a++){var c=pf[a];if(!isNaN(c)){var d=r("yt.scheduler.instance.cancelJob");d?d(c):window.clearTimeout(c)}}pf.length=0;a=Ke("//static.doubleclick.net/instream/ad_status.js");if(b=document.getElementById(a))Ge(a),b.parentNode.removeChild(b);qf=!1;S("DCLKSTAT",0);Ad(Qi,Pi);if(a=Oi)a.removeEventListener("onScreenChanged",Ui),a.removeEventListener("onLogClientVeCreated",Ti),a.removeEventListener("onLogServerVeCreated",
Vi),a.removeEventListener("onLogToGel",Si),a.removeEventListener("onLogVeClicked",Wi),a.removeEventListener("onLogVesShown",Xi),a.removeEventListener("onReady",Yi),a.destroy();Ri={}});
window.addEventListener?(window.addEventListener("load",Zi),window.addEventListener("unload",$i)):window.attachEvent&&(window.attachEvent("onload",Zi),window.attachEvent("onunload",$i));}).call(this);
