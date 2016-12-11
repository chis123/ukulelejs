!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(1),o=n(2),a=n(3),l=n(13),u=n(16),s=n(10),c=n(14),p=n(15),f=function(e){function t(){var t=e.apply(this,arguments)||this;return t.asyncCaller=new o.AsyncCaller,t}return r(t,e),t.prototype.init=function(){var e=this;this.asyncCaller.exec(function(){e.manageApplication()})},t.prototype.handleElement=function(e){var t=this;this.analyizeElement(e,function(e){t.dispatchEvent(new p.Event(c.UkuEventType.HANDLE_ELEMENT_COMPLETED,e))})},t.prototype.registerController=function(e,t){this._internal_getDefinitionManager().addControllerDefinition(e,t)},t.prototype.getController=function(e){return this._internal_getDefinitionManager().getControllerDefinition(e).controllerInstance},t.prototype.registerComponent=function(e,t,n){this._internal_getDefinitionManager().addComponentDefinition(e,t,n,this.asyncCaller)},t.prototype.getComponent=function(e){return this._internal_getDefinitionManager().getComponent(e)},t.prototype.getComponentController=function(e){return this._internal_getDefinitionManager().getControllerInstByDomId(e)},t.prototype.refresh=function(e,t){this.dirtyChecker||(this.dirtyChecker=new l.DirtyChecker(this)),this.dirtyChecker.runDirtyChecking(e,t)},t.prototype._internal_getDefinitionManager=function(){return this.defMgr||(this.defMgr=new a.DefinitionManager(this)),this.defMgr},t.prototype._internal_dealWithElement=function(e,t){this.analyizeElement(e,t)},t.prototype.manageApplication=function(){var e=this,t=s.Selector.querySelectorAll(document,"[uku-application]");if(1!==t.length)throw new Error("Only one 'uku-application' can be declared in a whole html.");this.analyizeElement(t[0],function(t){e.dispatchEvent(new p.Event(c.UkuEventType.INITIALIZED,t))})},t.prototype.analyizeElement=function(e,t){var n=new u.Analyzer(this);t&&!function(e){n.addListener(u.Analyzer.ANALYIZE_COMPLETED,function(t){e(t.element)})}(t),n.analyizeElement(e)},t}(i.EventEmitter);f.INITIALIZED="initialized",f.REFRESH="refresh",f.HANDLE_ELEMENT_COMPLETED="handle_element_completed",t.Ukulele=f},function(e,t){"use strict";var n=function(){function e(){this.eventsPool={}}return e.prototype.getEventsPool=function(){return this.eventsPool},e.prototype.addListener=function(e,t){this.eventsPool[e]||(this.eventsPool[e]=[]),this.eventsPool[e].push(t)},e.prototype.removeListener=function(e,t){if(this.eventsPool[e])for(var n=this.eventsPool[e].length-1;n>=0;n--)if(this.eventsPool[e][n]===t){this.eventsPool[e].splice(n,1);break}},e.prototype.hasListener=function(e){return!!(this.eventsPool[e]&&this.eventsPool[e].length>0)},e.prototype.dispatchEvent=function(e){if(e&&e.eventType){var t=this.eventsPool[e.eventType];if(t)for(var n=0;n<t.length;n++)t[n].call(this,e)}},e}();t.EventEmitter=n},function(e,t){"use strict";var n=function(){function e(e,t){this.func=e,this.argu=t}return e}(),r=function(){function e(){this.allTasksPool=[],this.queueTasksPool=[],this.execType="queue",this.errorMsg="Only one type of task can be executed at same time",Function.prototype.resolve=function(e){e.aysncFunRunOver.call(e,this)}}return e.prototype.pushAll=function(e,t){if(0===this.queueTasksPool.length){var r=new n(e,t);this.allTasksPool.push(r)}else console.error(this.errorMsg);return this},e.prototype.pushQueue=function(e,t){if(0===this.allTasksPool.length){var r=new n(e,t);this.queueTasksPool.push(r)}else console.error(this.errorMsg);return this},e.prototype.aysncFunRunOver=function(e){if("queue"===this.execType)if(0===this.queueTasksPool.length)this.finalFunc&&this.finalFunc();else{var t=this.queueTasksPool[0];this.queueTasksPool.shift(),t.func.apply(t,t.argu)}else if("all"===this.execType){for(var n=0;n<this.allTasksPool.length;n++){var r=this.allTasksPool[n];if(e===r.func){this.allTasksPool.splice(n,1);break}}0===this.allTasksPool.length&&this.finalFunc&&this.finalFunc()}},e.prototype.exec=function(e){this.finalFunc=e,this.allTasksPool.length>0?(this.execType="all",this.executeAll()):this.queueTasksPool.length>0?(this.execType="queue",this.executeQueue()):this.finalFunc&&this.finalFunc()},e.prototype.executeQueue=function(){var e=this.queueTasksPool[0];this.queueTasksPool.shift(),e.func.apply(e,e.argu)},e.prototype.executeAll=function(){for(var e=0;e<this.allTasksPool.length;e++){var t=this.allTasksPool[e];t.func.apply(t,t.argu)}},e}();t.AsyncCaller=r},function(module,exports,__webpack_require__){"use strict";var ObjectUtil_1=__webpack_require__(4),Ajax_1=__webpack_require__(5),ControllerModel_1=__webpack_require__(6),AsyncCaller_1=__webpack_require__(2),ComponentModel_1=__webpack_require__(7),ComponentPoolItem_1=__webpack_require__(8),UkuleleUtil_1=__webpack_require__(9),DefinitionManager=function(){function DefinitionManager(e){this.controllersDefinition={},this.componentsDefinition={},this.componentsPool={},this.copyControllers={},this.dependentScriptsCache={},this.ajax=new Ajax_1.Ajax,this.uku=e}return DefinitionManager.prototype.getComponentsDefinition=function(){return this.componentsDefinition},DefinitionManager.prototype.getComponentsPool=function(){return this.componentsPool},DefinitionManager.prototype.setComponentsPool=function(e){this.componentsPool=e},DefinitionManager.prototype.setComponentsDefinition=function(e){this.componentsDefinition=e},DefinitionManager.prototype.getComponentDefinition=function(e){return this.componentsDefinition[e]},DefinitionManager.prototype.getControllerDefinition=function(e){return this.controllersDefinition[e]},DefinitionManager.prototype.getControllersDefinition=function(){return this.controllersDefinition},DefinitionManager.prototype.getComponent=function(e){return this.componentsPool[e]},DefinitionManager.prototype.getCopyControllers=function(){return this.copyControllers},DefinitionManager.prototype.copyAllController=function(){for(var e in this.controllersDefinition){var t=this.controllersDefinition[e],n=t.controllerInstance;this.copyControllerInstance(n,e)}},DefinitionManager.prototype.copyControllerInstance=function(e,t){var n=ObjectUtil_1.ObjectUtil.deepClone(e);delete this.copyControllers[t],this.copyControllers[t]=n},DefinitionManager.prototype.addControllerDefinition=function(e,t){var n=new ControllerModel_1.ControllerModel(e,t);t._alias=e,this.controllersDefinition[e]=n},DefinitionManager.prototype.getControllerInstByDomId=function(e){for(var t in this.controllersDefinition){var n=this.controllersDefinition[t],r=n.controllerInstance;if(r._dom&&r._dom.id===e)return r}},DefinitionManager.prototype.addComponentDefinition=function(e,t,n,r){function i(e,n){o.ajax.get(t,function(t){var n=UkuleleUtil_1.UkuleleUtil.getComponentConfiguration(t);o.analyizeComponent(e,n,function(){i.resolve(r)})})}var o=this;n?(this.componentsPool[e]=new ComponentPoolItem_1.ComponentPoolItem(e,t,!1),r.pushAll(i,[e,t])):this.componentsPool[e]=new ComponentPoolItem_1.ComponentPoolItem(e,t,!0)},DefinitionManager.prototype.addLazyComponentDefinition=function(e,t){var n=this;return new Promise(function(r,i){n.ajax.get(t,function(i){var o=UkuleleUtil_1.UkuleleUtil.getComponentConfiguration(i);n.analyizeComponent(e,o,function(){n.componentsPool[e]={tagName:e,templateUrl:t,lazy:!1},r()})})})},DefinitionManager.prototype.getBoundAttributeValue=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=this.getBoundControllerModelByName(e),i=r.controllerInstance,o=[this.uku,i,e];o=o.concat(t);var a=UkuleleUtil_1.UkuleleUtil.getFinalValue.apply(null,o);return a},DefinitionManager.prototype.getControllerModelByName=function(e){return this.getBoundControllerModelByName(e)},DefinitionManager.prototype.getFinalValueByExpression=function(e){var t=this.getControllerModelByName(e).controllerInstance;return UkuleleUtil_1.UkuleleUtil.getFinalValue(this.uku,t,e)},DefinitionManager.prototype.getBoundControllerModelByName=function(e){var t=UkuleleUtil_1.UkuleleUtil.getBoundModelInstantName(e),n=this.controllersDefinition[t];if(!n){var r=e.split("."),i=r[0];if("parent"===i&&this.uku.parentUku)return r.shift(),e=r.join("."),this.uku.parentUku._internal_getDefinitionManager().getControllerModelByName(e)}return n},DefinitionManager.prototype.analyizeComponent=function(e,t,n){function r(e,t){if(a.dependentScriptsCache[t])r.resolve(e);else{var n=document.getElementsByTagName("HEAD")[0],i=document.createElement("script");i.type="text/javascript",i.charset="utf-8",i.async=!0,i.src=t,i.onload=function(t){a.dependentScriptsCache[t.target.src]=!0,r.resolve(e)},n.appendChild(i)}}var i=this,o=t.dependentScripts,a=this;if(o&&o.length>0){var l,u=new AsyncCaller_1.AsyncCaller;"function"==typeof window.define&&window.define.amd&&(l=window.define,window.define=void 0);for(var s=0;s<o.length;s++){var c=o[s];u.pushAll(r,[u,c])}u.exec(function(){l&&(window.define=l),i.buildeComponentModel(e,t.template,t.componentControllerScript,t.stylesheet),n()})}else this.buildeComponentModel(e,t.template,t.componentControllerScript,t.stylesheet),n()},DefinitionManager.prototype.buildeComponentModel=function(tag,template,script,style){function dealWithShadowStyle(e,t){var n=document.getElementsByTagName("HEAD")[0],r=document.createElement("style");r.type="text/css";var i=t.split("}"),o=[];i.forEach(function(e,t){var n=e.replace(/^\s*/,"");n&&o.push(n)}),t=o.join("}\n."+e+" "),t="."+e+" "+t+"}",r.innerHTML=t,n.appendChild(r)}var debugComment="//# sourceURL="+tag+".js";try{var controllerClazz=void 0;script&&(script+=debugComment,controllerClazz=eval(script));var newComp=new ComponentModel_1.ComponentModel(tag,template,controllerClazz);this.componentsDefinition[tag]=newComp,style&&dealWithShadowStyle(tag,style)}catch(e){console.error(e)}},DefinitionManager}();exports.DefinitionManager=DefinitionManager},function(e,t){"use strict";var n=function(){function e(){}return e.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)},e.getType=function(t){var n=typeof t;return"object"===n&&e.isArray(t)?"array":n},e.compare=function(t,n){var r=e.getType(t),i=e.getType(n),o=!0;if(r!==i)return!1;switch(r){case"object":for(var a in t){var l=t[a],u=n[a],s=e.compare(l,u);if(!s){o=!1;break}}break;case"array":if(t.length===n.length)for(var c=0;c<t.length;c++){var p=t[c],f=n[c],h=e.compare(p,f);if(!h){o=!1;break}}else o=!1;break;case"function":o=t.toString()===n.toString();break;default:o=t===n}return o},e.deepClone=function(t){var n,r,i;if("object"!=typeof t||null===t)return t;if(t instanceof Array)for(n=[],r=0,i=t.length;i>r;r++)"object"==typeof t[r]&&null!==t[r]?n[r]=e.deepClone(t[r]):n[r]=t[r];else{n={};for(r in t)"object"==typeof t[r]&&null!==t[r]&&"_dom"!==r?n[r]=e.deepClone(t[r]):n[r]=t[r]}return n},e}();t.ObjectUtil=n},function(e,t){"use strict";var n=function(){function e(){}return e.prototype.get=function(e,t,n){var r=new XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&(200===r.status?t(r.responseText):n&&n())},r.open("GET",e,!0),r.send(null)},e}();t.Ajax=n},function(e,t){"use strict";var n=function(){function e(e,t){this.alias=e,this.controllerInstance=t,this.boundItems=[]}return e.prototype.addBoundItem=function(e){this.boundItems.push(e)},e.prototype.getBoundItemsByName=function(e){for(var t=[],n=0;n<this.boundItems.length;n++){var r=this.boundItems[n];r.attributeName===e&&t.push(r)}return t},e}();t.ControllerModel=n},function(e,t){"use strict";var n=function(){function e(e,t,n){this.tagName=e,this.template=t,this.controllerClazz=n}return e}();t.ComponentModel=n},function(e,t){"use strict";var n=function(){function e(e,t,n){this.tagName=e,this.templateUrl=t,this.lazy=n}return e}();t.ComponentPoolItem=n},function(e,t,n){"use strict";var r=n(10),i=n(11),o=n(12),a=function(){function e(e,t){this.value=e,this.parent=t}return e}(),l=function(){function e(){}return e.getFinalAttribute=function(t){var n=t.split("."),r=n.shift();return"parent"===r?e.getFinalAttribute(n.join(".")):n.join(".")},e.searchHtmlTag=function(e,t){var n="^<"+t+"[\\s\\S]*>[\\s\\S]*</"+t+">$",r=new RegExp(n),i=e.search(r);return i},e.getInnerHtml=function(e,t){var n="<"+t+"[\\s\\S]*>[\\s\\S]*</"+t+">",r=new RegExp(n),i=e.match(r);if(i.index>-1){var o=i[0],a=o.search(">"),l=o.substr(a+1),u=l.lastIndexOf("</");return l=l.substring(0,u),l=l.replace(/(^\s*)|(\s*$)/g,""),console.log(l),l}return null},e.getComponentConfiguration=function(e){var t=document.createElement("div");t.innerHTML=e;for(var n=r.Selector.querySelectorAll(t,"template"),i=r.Selector.querySelectorAll(t,"script"),a=r.Selector.querySelectorAll(t,"style"),l=[],u=null,s=0;s<i.length;s++){var c=i[s];""!==c.src?l.push(c.src):u=c.innerHTML}return a&&a[0]?new o.ComponentConfiguration(n[0].innerHTML,l,u,a[0].innerHTML):new o.ComponentConfiguration(n[0].innerHTML,l,u)},e.searchUkuAttrTag=function(e){var t=/^uku\-.*/,n=e.search(t);return n},e.getAttrFromUkuTag=function(t,n){if(void 0===n&&(n=!1),0===e.searchUkuAttrTag(t)&&(t=t.replace("uku-","")),n){var r=t.split("-");t=r[0];for(var i=1;i<r.length;i++){var o=r[i].charAt(0).toUpperCase();t=t+o+r[i].substr(1)}}return t},e.searchUkuExpTag=function(e){var t=/^\{\{.*\}\}$/,n=e.search(t);return n},e.searchUkuFuncArg=function(e){var t=/\(.*\)$/,n=e.search(t);return n},e.isRepeat=function(e){return!!e.getAttribute("uku-repeat")},e.isInRepeat=function(e){for(var t=r.Selector.parents(e),n=0;n<t.length;n++){var i=t[n];if(9!==i.nodeType){var o=i.getAttribute("uku-repeat");if(o)return!0}}return!1},e.getBoundModelInstantName=function(e){var t=e.split(".")[0];return t?t:void 0},e.getAttributeFinalValue=function(t,n){var r=e.getAttributeFinalValueAndParent(t,n),i=r.value;return i},e.getAttributeFinalValueAndParent=function(t,n){var r,i=t;if("string"==typeof n){var o=e.getFinalAttribute(n),l=o.split(".");if(""!==o&&i)for(var u=0;u<l.length;u++){var s=l[u];if(r=i,i=i[s],void 0===i||null===i)break}else i=t.hasOwnProperty("_alias")&&t._alias===n?t:n}return new a(i,r)},e.getFinalValue=function(t,n,r){for(var o=[],a=3;a<arguments.length;a++)o[a-3]=arguments[a];var l=-1;if("string"==typeof r&&(l=e.searchUkuFuncArg(r)),-1===l)return e.getAttributeFinalValue(n,r);var u=r.substring(0,l),s=e.getAttributeFinalValueAndParent(n,u),c=s.value;if(void 0===c)return c;var p=[],f=r.substring(l+1,r.length-1);if(""!==f)for(var h=i.ArgumentUtil.analyze(f,t),d=0;d<h.length;d++){var g=void 0,m=h[d],v=typeof m,y=null;if("string"===v){if(y=t._internal_getDefinitionManager().getControllerModelByName(m),y&&y.controllerInstance){var k=y.controllerInstance;g=1===m.split(".").length?k:e.getFinalValue(t,k,m)}else g=e.getFinalValue(t,n,m);p.push(g)}else p.push(m)}if(o){var b=Array.prototype.slice.call(o);p=p.concat(b)}return c=c.apply(s.parent,p)},e}();t.UkuleleUtil=l},function(e,t){"use strict";var n=function(){function e(){}return e.querySelectorAll=function(e,t){return window.hasOwnProperty("jQuery")&&"undefined"!=typeof window.jQuery?window.jQuery(e).find(t):e.querySelectorAll(t)},e.fuzzyFind=function(e,t){if(e&&e.attributes)for(var n=0;n<e.attributes.length;n++){var r=e.attributes[n];if(r.nodeName.search(t)>-1)return e}return null},e.directText=function(e,t){for(var n="",r=e.childNodes,i=0;i<=r.length-1;i++){var o=r[i];if(3===o.nodeType){if(t||""===t||0===t||t===!1)return void(o.nodeValue=t);n+=o.nodeValue}}return n.trim()},e.parents=function(e){for(var t=[];e.parentNode&&"BODY"!==e.parentNode.tagName;)t.push(e.parentNode),e=e.parentNode;return t},e}();t.Selector=n},function(e,t){"use strict";var n=function(){function e(){}return e.analyze=function(e,t){e=e.replace(/'/g,'"');for(var n=e.split(","),r=0;r<n.length;r++){var i=n[r];for(var o in t._internal_getDefinitionManager().getControllersDefinition()){var a=i.search(o),l=i.search("parent.");(a>-1||l>-1)&&(n[r]='"'+i+'"')}}e=n.join(","),e="["+e+"]";try{var u=JSON.parse(e);return u}catch(s){return console.error(s),null}},e}();t.ArgumentUtil=n},function(e,t){"use strict";var n=function(){function e(e,t,n,r){void 0===r&&(r=void 0),this.template=e,this.dependentScripts=t,this.componentControllerScript=n,this.stylesheet=r}return e}();t.ComponentConfiguration=n},function(e,t,n){"use strict";var r=n(9),i=n(4),o=n(14),a=n(15),l=function(){function e(e){this.uku=e,this.defMgr=this.uku._internal_getDefinitionManager()}return e.prototype.runDirtyChecking=function(e,t){function n(e){var n=l.defMgr.getControllersDefinition()[e];if(!n)return void(l.uku.parentUku&&l.uku.parentUku.refresh(e));for(var u=n.controllerInstance,s=l.defMgr.getCopyControllers()[e],c=0,p=0;p<n.boundItems.length;p++){var f=n.boundItems[p],h=f.attributeName;if(h.search("parent.")>-1)return;if(s){f.hasOwnProperty("ukuTag")&&"selected"===f.ukuTag&&(h=h.split("|")[0]);var d=r.UkuleleUtil.getFinalValue(l.uku,u,h),g=r.UkuleleUtil.getFinalValue(l.uku,s,h);if(!i.ObjectUtil.compare(g,d)){h=f.attributeName;for(var m=n.getBoundItemsByName(h),v=0;v<m.length;v++){var y=m[v];(y.element!==t||f.hasOwnProperty("ukuTag")&&"value"!==y.ukuTag)&&(c++,y.render(u))}}}}c>0&&l.uku.hasListener(o.UkuEventType.REFRESH)&&l.uku.dispatchEvent(new a.Event(o.UkuEventType.REFRESH)),l.defMgr.copyControllerInstance(u,e)}var l=this;if(e){if("string"==typeof e)n(e);else if(i.ObjectUtil.isArray(e))for(var u=0;u<e.length;u++)n(e[u])}else for(var s in this.defMgr.getControllersDefinition())n(s)},e}();t.DirtyChecker=l},function(e,t){"use strict";var n=function(){function e(){}return e}();n.INITIALIZED="initialized",n.REFRESH="refresh",n.HANDLE_ELEMENT_COMPLETED="handle_element_completed",t.UkuEventType=n},function(e,t){"use strict";var n=function(){function e(e,t){this.eventType=e,this.element=t}return e}();t.Event=n},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,o){function a(e){try{u(r.next(e))}catch(t){o(t)}}function l(e){try{u(r["throw"](e))}catch(t){o(t)}}function u(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(a,l)}u((r=r.apply(e,t)).next())})},o=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(i)throw new TypeError("Generator is already executing.");for(;l;)try{if(i=1,o&&(a=o[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(o,n[1])).done)return a;switch(o=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return l.label++,{value:n[1],done:!1};case 5:l.label++,o=n[1],n=[0];continue;case 7:n=l.ops.pop(),l.trys.pop();continue;default:if(a=l.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){l=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){l.label=n[1];break}if(6===n[0]&&l.label<a[1]){l.label=a[1],a=n;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(n);break}a[2]&&l.ops.pop(),l.trys.pop();continue}n=t.call(e,l)}catch(r){n=[6,r],o=0}finally{i=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,o,a,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return{next:n(0),"throw":n(1),"return":n(2)}},a=n(1),l=n(9),u=n(17),s=n(28),c=n(29),p=n(30),f=n(31),h=n(32),d=n(33),g=n(10),m=n(15),v=function(e){function t(t){var n=e.call(this)||this;return n.dealWithAttribute=function(e,t){var n=e.getAttribute("uku-"+t),r=this.defMgr.getControllerModelByName(n);if(r){var i=u.BoundItemAttributeFactory.getInstance().generateInstance(n,t,e,this.uku);r.addBoundItem(i),i.render(r.controllerInstance),h.elementChangedBinder(e,t,r,this.uku.refresh,this.uku)}},n.uku=t,n.defMgr=n.uku._internal_getDefinitionManager(),n}return r(t,e),t.prototype.analyizeElement=function(e){var n=this;this.searchComponent(e).then(function(e){n.searchExpression(e),n.searchUkuAttribute(e),n.defMgr.copyAllController(),n.hasListener(t.ANALYIZE_COMPLETED)&&n.dispatchEvent(new m.Event(t.ANALYIZE_COMPLETED,e))})},t.prototype.sortAttributes=function(e){for(var t=[],n=0;n<e.attributes.length;n++){var r=e.attributes[n];-1!==r.nodeName.search("uku-on")?t.push(r):t.unshift(r)}return t},t.prototype.searchUkuAttribute=function(e){var t=[],n=g.Selector.fuzzyFind(e,"uku-");n&&t.push(n);for(var r=g.Selector.querySelectorAll(e,"*"),i=0;i<r.length;i++){var o=r[i],a=g.Selector.fuzzyFind(o,"uku-");a&&!l.UkuleleUtil.isInRepeat(a)&&t.push(a)}for(var u=0;u<t.length;u++)for(var s=t[u],c=this.sortAttributes(s),p=0;p<c.length;p++){var f=c[p];if(l.UkuleleUtil.searchUkuAttrTag(f.nodeName)>-1){var h=f.nodeName.split("-");h.shift();var d=h.join("-");"application"!==d&&(0===d.search("on")?l.UkuleleUtil.isRepeat(s)||l.UkuleleUtil.isInRepeat(s)||this.dealWithEvent(s,d):-1!==d.search("repeat")?this.dealWithRepeat(s):l.UkuleleUtil.isRepeat(s)||l.UkuleleUtil.isInRepeat(s)||("text"!==d?this.dealWithAttribute(s,d):this.dealWithInnerText(s)))}}},t.prototype.searchComponent=function(e){return i(this,void 0,void 0,function(){var t,n,r,n,r,i,a;return o(this,function(o){switch(o.label){case 0:return(t=this.defMgr.getComponent(e.localName))?t.lazy?[3,1]:(n=e.attributes,r=this.defMgr.getComponentsDefinition()[t.tagName],l.UkuleleUtil.isRepeat(e)||l.UkuleleUtil.isInRepeat(e)?[2,e]:[3,3]):[3,4];case 1:return[4,this.defMgr.addLazyComponentDefinition(t.tagName,t.templateUrl)];case 2:return o.sent(),n=e.attributes,r=this.defMgr.getComponentsDefinition()[t.tagName],l.UkuleleUtil.isRepeat(e)||l.UkuleleUtil.isInRepeat(e)?[2,e]:[2,this.dealWithComponent(e,r.template,r.controllerClazz,n)];case 3:return[3,10];case 4:if(!(e.children&&e.children.length>0))return[3,9];i=0,o.label=5;case 5:return i<e.children.length?(a=e.children[i],[4,this.searchComponent(a)]):[3,8];case 6:o.sent(),o.label=7;case 7:return i++,[3,5];case 8:return[2,e];case 9:return[2,e];case 10:return[2]}})})},t.prototype.dealWithComponent=function(e,t,n,r){return i(this,void 0,void 0,function(){var i,a,u,s,c,p,h,d,g,c,p,m,v;return o(this,function(o){switch(o.label){case 0:if(i="cc_"+Math.floor(1e4*Math.random()).toString(),t=t.replace(new RegExp("'cc\\.","gm"),"'"+i+"."),t=t.replace(new RegExp('"cc\\.',"gm"),'"'+i+"."),t=t.replace(new RegExp("{{cc\\.","gm"),"{{"+i+"."),t=t.replace(new RegExp(" cc\\.","gm")," "+i+"."),t=t.replace(new RegExp("\\.cc\\.","gm"),"."+i+"."),a=document.createElement("div"),a.insertAdjacentHTML("afterBegin",t),a.children.length>1&&(t=a.outerHTML),e.insertAdjacentHTML("beforeBegin",t),u=e.previousElementSibling,u.classList.add(e.localName),n)for(s=new n(this.uku),s._dom=u,s.fire=function(e,t,n,r){void 0===n&&(n=!1),void 0===r&&(r=!0);var i=new Event(e.toLowerCase(),{bubbles:n,cancelable:r});i.data=t,s._dom.dispatchEvent(i)},this.uku.registerController(i,s),c=0;c<r.length;c++)p=r[c],0!==l.UkuleleUtil.searchUkuAttrTag(p.nodeName)||-1!==p.nodeName.search("uku-on")||"uku-render"===p.nodeName||"uku-visible"===p.nodeName?u.setAttribute(p.nodeName,p.nodeValue):(h=l.UkuleleUtil.getAttrFromUkuTag(p.nodeName,!0),d=this.defMgr.getControllerModelByName(p.nodeValue),d&&(g=new f.BoundItemComponentAttribute(p.nodeValue,h,s,this.uku),d.addBoundItem(g),g.render(d.controllerInstance)));else for(c=0;c<r.length;c++)p=r[c],0===l.UkuleleUtil.searchUkuAttrTag(p.nodeName)&&-1===p.nodeName.search("uku-on")&&"uku-render"!==p.nodeName&&"uku-visible"!==p.nodeName||u.setAttribute(p.nodeName,p.nodeValue);if(e.parentNode.removeChild(e),!(u.children&&u.children.length>0))return[3,5];m=0,o.label=1;case 1:return m<u.children.length?(v=u.children[m],[4,this.searchComponent(v)]):[3,4];case 2:o.sent(),o.label=3;case 3:return m++,[3,1];case 4:return s&&s._initialized&&"function"==typeof s._initialized&&s._initialized(),[2,u];case 5:return s&&s._initialized&&"function"==typeof s._initialized&&s._initialized(),[2,u]}})})},t.prototype.searchExpression=function(e){-1!==l.UkuleleUtil.searchUkuExpTag(g.Selector.directText(e))&&(l.UkuleleUtil.isRepeat(e)||l.UkuleleUtil.isInRepeat(e)||this.dealWithExpression(e));for(var t=0;t<e.children.length;t++)this.searchExpression(e.children[t])},t.prototype.dealWithExpression=function(e){var t=g.Selector.directText(e);if(-1!==l.UkuleleUtil.searchUkuExpTag(t)){var n=t.slice(2,-2),r=this.defMgr.getControllerModelByName(n);if(r){var i=new s.BoundItemExpression(n,t,e,this.uku);r.addBoundItem(i),i.render(r.controllerInstance)}}},t.prototype.dealWithInnerText=function(e){var t=e.getAttribute("uku-text");if(t){var n=this.defMgr.getControllerModelByName(t);if(n){var r=new c.BoundItemInnerText(t,e,this.uku);n.addBoundItem(r),r.render(n.controllerInstance)}}},t.prototype.dealWithEvent=function(e,t){var n=this,r=e.getAttribute("uku-"+t),i=t.substring(2);i=i.toLowerCase();var o=this.defMgr.getControllerModelByName(r);if(o){var a,l=o.controllerInstance,u=r.split(".");a="parent"===u[0]?u[1]:u[0],d.EventListener.addEventListener(e,i,function(t){n.defMgr.copyControllerInstance(l,a),n.defMgr.getBoundAttributeValue(r,t),n.uku.refresh(a,e)})}},t.prototype.dealWithRepeat=function(e){var t=e.getAttribute("uku-repeat"),n=t.split(" in "),r=n[0],i=n[1],o=this.defMgr.getControllerModelByName(i);if(o){var a=o.controllerInstance,l=new p.BoundItemRepeat(i,r,e,this.uku);o.addBoundItem(l),l.render(a)}},t}(a.EventEmitter);v.ANALYIZE_COMPLETED="analyizeCompleted",t.Analyzer=v},function(e,t,n){"use strict";var r=n(18),i=n(21),o=n(22),a=n(23),l=n(24),u=n(25),s=n(26),c=n(27),p=n(19),f=function(){function e(){if(e._instance)throw new Error("Error: Instantiation failed: Use BoundItemAttributeFactory.getInstance() instead of new.");e._instance=this}return e.getInstance=function(){return e._instance},e.prototype.generateInstance=function(e,t,n,f){var h;switch(t){case"selected":h=new r.BountItemAttrSelected(e,t,n,f);break;case"data-item":h=new i.BoundItemAttrDataItem(e,t,n,f);break;case"src":h=new o.BoundItemAttrSrc(e,t,n,f);break;case"disabled":h=new a.BoundItemAttrDisabled(e,t,n,f);break;case"render":h=new l.BoundItemAttrRender(e,t,n,f);break;case"style":h=new u.BoundItemAttrStyle(e,t,n,f);break;case"value":h=new s.BoundItemAttrValue(e,t,n,f);break;case"visible":h=new c.BoundItemAttrVisible(e,t,n,f);break;default:h=new p.BoundItemAttribute(e,t,n,f)}return h},e}();f._instance=new f,t.BoundItemAttributeFactory=f},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(19),o=n(9),a=function(e){function t(t,n,r,i){var o;if("selected"!==n)throw new TypeError("it doesn't use uku-selected");return o=e.call(this,t,n,r,i)||this}return r(t,e),t.prototype.render=function(e){var t,n=this.attributeName,r=this.element.tagName;if("SELECT"===r){var i=this.attributeName.split("|");n=i[0],t=i[1];var a=o.UkuleleUtil.getFinalValue(this.uku,e,n),l=void 0;l=t?a[t]:a,this.element.value=l}if("INPUT"===r&&"radio"===this.element.getAttribute("type")){var a=o.UkuleleUtil.getFinalValue(this.uku,e,n);this.element.value===a&&this.element.setAttribute("checked","true")}},t}(i.BoundItemAttribute);t.BountItemAttrSelected=a},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(20),o=n(9),a=function(e){function t(t,n,r,i){var o=e.call(this,t,r,i)||this;return o.ukuTag=n,o}return r(t,e),t.prototype.render=function(e){var t=this.attributeName,n=o.UkuleleUtil.getFinalValue(this.uku,e,t);this.element.setAttribute(this.ukuTag,n)},t}(i.BoundItemBase);t.BoundItemAttribute=a},function(e,t){"use strict";var n=function(){function e(e,t,n){this.attributeName=e,this.element=t,this.uku=n}return e.prototype.render=function(e){},e}();t.BoundItemBase=n},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(19),o=n(9),a=function(e){function t(t,n,r,i){var o;if("data-item"!==n)throw new TypeError("it doesn't use uku-item");return o=e.call(this,t,n,r,i)||this}return r(t,e),t.prototype.render=function(e){var t=this.attributeName,n=this.element.tagName,r=o.UkuleleUtil.getFinalValue(this.uku,e,t);"OPTION"===n&&(r=JSON.stringify(r),this.element.setAttribute("data-item",r))},t}(i.BoundItemAttribute);t.BoundItemAttrDataItem=a},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(19),o=n(9),a=function(e){function t(t,n,r,i){var o;if("src"!==n)throw new TypeError("it doesn't use uku-src");return o=e.call(this,t,n,r,i)||this}return r(t,e),t.prototype.render=function(e){var t=this.attributeName,n=this.element.tagName,r=o.UkuleleUtil.getFinalValue(this.uku,e,t);if("IMG"!==n)throw new Error("uku-src doesn't work with current dom");r&&this.element.setAttribute(this.ukuTag,r)},t}(i.BoundItemAttribute);t.BoundItemAttrSrc=a},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(19),o=n(9),a=function(e){function t(t,n,r,i){var o;if("disabled"!==n)throw new TypeError("it doesn't use uku-disabled");return o=e.call(this,t,n,r,i)||this}return r(t,e),t.prototype.render=function(e){var t=this.attributeName,n=(this.element.tagName,o.UkuleleUtil.getFinalValue(this.uku,e,t));this.element.disabled=n},t}(i.BoundItemAttribute);t.BoundItemAttrDisabled=a},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(19),o=n(9),a=function(e){function t(t,n,r,i){var o;if("render"!==n)throw new TypeError("it doesn't use uku-render");return o=e.call(this,t,n,r,i)||this}return r(t,e),t.prototype.render=function(e){var t=this.attributeName,n=(this.element.tagName,o.UkuleleUtil.getFinalValue(this.uku,e,t));if(n){var r=this.element.getAttribute("data-old-display");null!==r&&(this.element.style.display=r)}else{var r=this.element.getAttribute("data-old-display");null===r&&(r=this.element.style.display,this.element.setAttribute("data-old-display",r)),this.element.style.display="none"}},t}(i.BoundItemAttribute);t.BoundItemAttrRender=a},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(19),o=n(9),a=function(e){function t(t,n,r,i){var o;if("style"!==n)throw new TypeError("it doesn't use uku-style");return o=e.call(this,t,n,r,i)||this}return r(t,e),t.prototype.render=function(e){var t=this.attributeName,n=(this.element.tagName,o.UkuleleUtil.getFinalValue(this.uku,e,t));for(var r in n)this.element.style[r]=n[r]},t}(i.BoundItemAttribute);t.BoundItemAttrStyle=a},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(19),o=n(9),a=function(e){function t(t,n,r,i){var o;if("value"!==n)throw new TypeError("it doesn't use uku-value");return o=e.call(this,t,n,r,i)||this}return r(t,e),t.prototype.render=function(e){var t=this.attributeName,n=this.element.tagName,r=o.UkuleleUtil.getFinalValue(this.uku,e,t);"INPUT"===n&&"checkbox"===this.element.getAttribute("type")?this.element.checked=r:this.element.value=r;
},t}(i.BoundItemAttribute);t.BoundItemAttrValue=a},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(19),o=n(9),a=function(e){function t(t,n,r,i){var o;if("visible"!==n)throw new TypeError("it doesn't use uku-visible");return o=e.call(this,t,n,r,i)||this}return r(t,e),t.prototype.render=function(e){var t=this.attributeName,n=(this.element.tagName,o.UkuleleUtil.getFinalValue(this.uku,e,t));n?this.element.style.visibility="visible":this.element.style.visibility="hidden"},t}(i.BoundItemAttribute);t.BoundItemAttrVisible=a},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(20),o=n(9),a=n(10),l=function(e){function t(t,n,r,i){var o=e.call(this,t,r,i)||this;return o.expression=n,o}return r(t,e),t.prototype.render=function(e){var t=o.UkuleleUtil.getFinalValue(this.uku,e,this.attributeName);a.Selector.directText(this.element,t)},t}(i.BoundItemBase);t.BoundItemExpression=l},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(20),o=n(9),a=function(e){function t(t,n,r){var i=e.call(this,t,n,r)||this;return i.tagName="text",i}return r(t,e),t.prototype.render=function(e){var t=o.UkuleleUtil.getFinalValue(this.uku,e,this.attributeName);this.element.innerHTML=t},t}(i.BoundItemBase);t.BoundItemInnerText=a},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(20),o=n(9),a=function(e){function t(t,n,r,i){var o=e.call(this,t,r,i)||this;return o.expression=n,o.renderTemplate=r.outerHTML,o.parentElement=r.parentNode,o.beginCommentString=void 0,o.endCommentString=void 0,o}return r(t,e),t.prototype.render=function(e){function t(){var e=o.UkuleleUtil.searchHtmlTag(i.renderTemplate,"tr");return-1===e?document.createElement("div"):document.createElement("tbody")}var n=this,r=o.UkuleleUtil.getFinalValue(this.uku,e,this.attributeName);if(r){var i=this;if(this.element&&this.element.parentNode){this.beginCommentString="begin uku-repeat: "+this.expression+" in "+this.attributeName;var a=document.createComment(this.beginCommentString);this.element.parentNode.insertBefore(a,this.element),this.endCommentString="end uku-repeat: "+this.expression+" in "+this.attributeName;var l=document.createComment(this.endCommentString);this.element.parentNode.insertBefore(l,this.element.nextSibling),this.element.parentNode.removeChild(this.element)}for(var u=document.createTreeWalker(this.parentElement,NodeFilter.SHOW_COMMENT,{acceptNode:function(e){return e.nodeValue===i.beginCommentString?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}},!1);u.nextNode();){var s=u.currentNode;if(s&&s.nodeValue===this.beginCommentString){for(;s.nextSibling&&s.nextSibling.nodeValue!==this.endCommentString;)s.parentNode.removeChild(s.nextSibling);var c=t(),p=t();s.parentNode.insertBefore(p,s.nextSibling);for(var f=0;f<r.length;f++)if(c.insertAdjacentHTML("beforeEnd",this.renderTemplate),f===r.length-1){var h=c.innerHTML;p.insertAdjacentHTML("beforeBegin",h),s.parentNode.removeChild(p),c=null,p=null}for(var d=s.nextSibling,g=0;g<r.length;g++){d.removeAttribute("uku-repeat");var m=this.uku.constructor,v=new m;v.parentUku=this.uku;var y=v.parentUku._internal_getDefinitionManager().getComponentsDefinition(),k=v.parentUku._internal_getDefinitionManager().getComponentsPool();v._internal_getDefinitionManager().setComponentsDefinition(y),v._internal_getDefinitionManager().setComponentsPool(k);var b=d.nextSibling,C=typeof r[g];if("object"===C)v.registerController(this.expression,r[g]);else{v.registerController(this.expression,{value:r[g]});var _=d.outerHTML.replace(new RegExp(this.expression,"gm"),this.expression+".value");d.insertAdjacentHTML("afterend",_);var w=d.nextSibling;d.parentNode.removeChild(d),d=w}v._internal_dealWithElement(d,function(e){if("OPTION"===n.element.tagName){var t=n.parentElement.getAttribute("uku-selected"),r=t.split("|");t=r[0];var i=r[1],o=n.uku._internal_getDefinitionManager().getFinalValueByExpression(t);i?n.parentElement.value=o[i]:n.parentElement.value=o}}),d=b}}}}},t}(i.BoundItemBase);t.BoundItemRepeat=a},function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},i=n(20),o=n(9),a=function(e){function t(t,n,r,i){var o=e.call(this,t,null,i)||this;return o.ukuTag=n,o.componentController=r,o}return r(t,e),t.prototype.render=function(e){var t=o.UkuleleUtil.getFinalValue(this.uku,e,this.attributeName);this.componentController[this.ukuTag]=t,this.uku.refresh(this.componentController._alias)},t}(i.BoundItemBase);t.BoundItemComponentAttribute=a},function(e,t,n){"use strict";function r(e,t,n,r,o){for(var c=[i,a,l,u,s],p=0;p<c.length;p++){var f=c[p],h=f.apply(this,arguments);if(h)break}}function i(e,t,n,r,i){var a=e.tagName;if("INPUT"===a&&o(e)&&"value"===t){var l="change",u=e.getAttribute("type");return"text"===u&&(l="input"),p.EventListener.addEventListener(e,l,function(o){var a=e.getAttribute("uku-"+t);a=c.UkuleleUtil.getFinalAttribute(a);for(var l=a.split("."),u=n.controllerInstance,s=0;s<l.length-1;s++)u=u[l[s]];u[l[l.length-1]]=e.value,r&&r.call(i,n.alias,e)}),!0}return!1}function o(e){var t=e.getAttribute("type");return"checkbox"!==t&&"radio"!==t}function a(e,t,n,r,i){var o=e.tagName;return"TEXTAREA"===o&&"value"===t?(p.EventListener.addEventListener(e,"input",function(o){var a=e.getAttribute("uku-"+t);a=c.UkuleleUtil.getFinalAttribute(a);for(var l=a.split("."),u=n.controllerInstance,s=0;s<l.length-1;s++)u=u[l[s]];u[l[l.length-1]]=e.value,r&&r.call(i,n.alias,e)}),!0):!1}function l(e,t,n,r,i){var o=e.tagName;return"SELECT"===o&&"selected"===t?(p.EventListener.addEventListener(e,"change",function(o){var a,l=e.getAttribute("uku-"+t),u=l.split("|");l=u[0],a=u[1],l=c.UkuleleUtil.getFinalAttribute(l);for(var s=l.split("."),p=n.controllerInstance,h=0;h<s.length-1;h++)p=p[s[h]];for(var d=f.Selector.querySelectorAll(e,"option"),g=0;g<d.length;g++){var m=d[g];if(m.selected){var v=JSON.parse(m.getAttribute("data-item"));p[s[s.length-1]]=v}}r&&r.call(i,n.alias,e)}),!0):!1}function u(e,t,n,r,i){var o=e.tagName;return"INPUT"===o&&"value"===t&&"checkbox"===e.getAttribute("type")?(p.EventListener.addEventListener(e,"change",function(o){var a=e.getAttribute("uku-"+t);a=c.UkuleleUtil.getFinalAttribute(a);for(var l=a.split("."),u=n.controllerInstance,s=0;s<l.length-1;s++)u=u[l[s]];u[l[l.length-1]]=e.checked,r&&r.call(i,n.alias,e)}),!0):!1}function s(e,t,n,r,i){var o=e.tagName;return"INPUT"===o&&"selected"===t&&"radio"===e.getAttribute("type")?(p.EventListener.addEventListener(e,"change",function(o){var a=e.getAttribute("uku-"+t);a=c.UkuleleUtil.getFinalAttribute(a);for(var l=a.split("."),u=n.controllerInstance,s=0;s<l.length-1;s++)u=u[l[s]];e.checked&&(u[l[l.length-1]]=e.value,r&&r.call(i,n.alias,e))}),!0):!1}var c=n(9),p=n(33),f=n(10);t.elementChangedBinder=r},function(e,t){"use strict";var n=function(){function e(){}return e.addEventListener=function(e,t,n){return window.hasOwnProperty("jQuery")&&void 0!==typeof window.jQuery?window.jQuery(e).on(t,function(e){n&&n(e)}):e.addEventListener(t,n)},e}();t.EventListener=n}])});
//# sourceMappingURL=uku.js.map