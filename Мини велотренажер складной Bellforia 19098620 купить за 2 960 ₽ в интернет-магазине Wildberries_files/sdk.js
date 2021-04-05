!function(){"use strict";var t=function(){return(t=Object.assign||function(t){for(var e,r=1,i=arguments.length;r<i;r++)for(var n in e=arguments[r])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)},e="_wbauid",r="user_id",i="goal_reach",n="purchase",o="refund",c=new RegExp("^[A-Z]{3}$");(new(function(){function s(){this._ecCurrency=null,this._ecProductItems=null,this._debugMode=!1}return s.prototype.init=function(){var t=this;this.initTime=window.wba.l;var e=window.wba.q;Array.isArray(e)&&e.forEach((function(e){t.HandleCmd(e[0],e[1])})),window.wba=this.HandleCmd.bind(this)},s.prototype.initUserId=function(t){var e=this.getUserID();(""===e||t)&&(e=this.genNewUserID(),this.isNewUser=!0),this.userId=e},s.prototype.getUserID=function(){return document.cookie.split(";").map((function(t){return t.trim()})).filter((function(t){return"_wbauid="===t.substring(0,e.length+1)})).map((function(t){return t.substring(e.length+1)}))[0]||""},s.prototype.genNewUserID=function(){var t=Math.floor((new Date).getTime()/1e3),e=Math.floor(Math.random()*Math.pow(2,30)).toString()+t.toString(),r=new Date;return r.setTime(r.getTime()+31536e6),document.cookie="_wbauid="+e+"; expires="+r.toUTCString()+"; path=/; domain="+this._cookieDomain,e},s.prototype.ECGetCurrency=function(){return this._ecCurrency},s.prototype.ECSetCurrency=function(t){if(null==t)throw new Error("Unexpected nullish currency");if(!c.test(t))throw new Error("Currency code '"+t+"' is not valid.");this._ecCurrency=t,null!=this._ecAction&&null==this._ecAction.currency&&(this._ecAction.currency=t)},s.prototype.ECGetAction=function(){return this._ecAction},s.prototype.ECSetAction=function(e,r,i,s,a,d,u,h,p,l){if(void 0===r&&(r=""),void 0===i&&(i=""),void 0===s&&(s=""),void 0===a&&(a=0),void 0===d&&(d=""),void 0===u&&(u=0),void 0===h&&(h=0),void 0===p&&(p=""),void 0===l&&(l=""),0===e.length)throw new Error("'type' cannot be an emtpty string.");if((e===n||e===o)&&0===i.length)throw new Error("'txID' cannot be an emtpty string when 'type' is one of: 'purchase', 'refund'.");if(r.length>0&&!c.test(r))throw new Error("currency code '"+r+"' is not valid.");if(a<0)throw new Error("'value' (monetary value of e-commerce action) cannot be less than zero.");if(u<0)throw new Error("'tax' cannot be less than zero.");if(h<0)throw new Error("'shipping' cannot be less than zero.");0===r.length&&null!=this._ecCurrency&&(r=this._ecCurrency);var f=t(t(t(t(t(t(t(t(t({type:e},""!==i.trim()&&{txID:i}),""!==s.trim()&&{affiliation:s}),r.length>0&&{currency:r}),0!==a&&{value:a}),""!==d.trim()&&{coupon:d}),0!==u&&{tax:u}),0!==h&&{shipping:h}),""!==p.trim()&&{itemListID:p}),""!==l.trim()&&{itemListName:l});this._ecAction=f},s.prototype.ECAddProduct=function(e,r,i,n,o,c,s,a,d,u,h,p,l,f,g,m,y,w,v){if(void 0===r&&(r=""),void 0===i&&(i=""),void 0===n&&(n=""),void 0===o&&(o=""),void 0===c&&(c=""),void 0===s&&(s=""),void 0===a&&(a=""),void 0===d&&(d=""),void 0===u&&(u=""),void 0===h&&(h=""),void 0===p&&(p=0),void 0===l&&(l=0),void 0===f&&(f=0),void 0===g&&(g=0),void 0===m&&(m=""),void 0===y&&(y=""),void 0===w&&(w=""),void 0===v&&(v=0),0===e.length)throw new Error("'id' cannot be an emtpty string.");if(l<=0)throw new Error("'quantity' cannot be less than zero.");if(p<0)throw new Error("'price' cannot be less than zero.");if(f<0)throw new Error("'discount' cannot be less than zero.");if(g<0)throw new Error("'tax' cannot be less than zero.");if(v<0)throw new Error("'inListIndex' cannot be less than zero.");null==this._ecProductItems&&(this._ecProductItems=new Array);var C=t(t(t(t(t(t(t(t(t(t(t(t(t(t(t(t(t(t({id:e},""!==r.trim()&&{name:r}),""!==i.trim()&&{category:i}),""!==n.trim()&&{category2:n}),""!==o.trim()&&{category3:o}),""!==c.trim()&&{category4:c}),""!==s.trim()&&{category5:s}),""!==a.trim()&&{category6:a}),""!==d.trim()&&{brand:d}),""!==u.trim()&&{variant:u}),""!==h.trim()&&{coupon:h}),0!==p&&{price:p}),0!==l&&{quantity:l}),0!==f&&{discount:f}),0!==g&&{tax:g}),""!==m.trim()&&{affiliation:m}),""!==y.trim()&&{listID:y}),""!==w.trim()&&{listName:w}),0!==v&&{inListIndex:v});this._ecProductItems.push(C)},s.prototype.ECClear=function(){this._ecAction=null,this._ecProductItems=null},s.prototype.ECPrepareJSON=function(){var e={};if(null==this._ecAction){var r=this._ecCurrency;e.action=t({type:"unspecified"},null!=r&&{currency:r})}else e.action=this._ecAction;return null!=this._ecProductItems&&this._ecProductItems.length>0&&(e.products=this._ecProductItems),e},s.prototype.ECHandleAddProductCmd=function(t){if("object"!=typeof t)throw new Error("Invalid type '"+typeof t+"' of arg 'opts': object expected");var e=this.getStrProp(t,"list",!1),r=this.getStrProp(t,"listID",!1),i=this.getStrProp(t,"listName",!1),n=this.getNumProp(t,"position",!1),o=this.getNumProp(t,"inListIndex",!1);this.ECAddProduct(this.getStrProp(t,"id",!0),this.getStrProp(t,"name",!1),this.getStrProp(t,"category",!1),this.getStrProp(t,"category2",!1),this.getStrProp(t,"category3",!1),this.getStrProp(t,"category4",!1),this.getStrProp(t,"category5",!1),this.getStrProp(t,"category6",!1),this.getStrProp(t,"brand",!1),this.getStrProp(t,"variant",!1),this.getStrProp(t,"coupon",!1),this.getNumProp(t,"price",!1),this.getNumProp(t,"quantity",!1),this.getNumProp(t,"discount",!1),this.getNumProp(t,"tax",!1),this.getStrProp(t,"affiliation",!1),""===r?e:r,""===i?e:i,0===o?n:o)},s.prototype.ECHandleSetCurrencyCmd=function(t){if("string"!=typeof t)throw new Error("Invalid type of 'opts': string expected.");this.ECSetCurrency(t)},s.prototype.ECHandleSetActionCmd=function(t){if("object"!=typeof t){if("string"!=typeof t)throw new Error("Invalid type '"+typeof t+"' of 'opts': object expected.");this.ECSetAction(t,"string"==typeof this._ecCurrency?this._ecCurrency:"","unspecified")}else{var e=this.getStrProp(t,"currency",!1);this.ECSetAction(this.getStrProp(t,"type",!0),""===e&&"string"==typeof this._ecCurrency?this._ecCurrency:e,this.getStrProp(t,"txID",!1),this.getStrProp(t,"affiliation",!1),this.getNumProp(t,"value",!1),this.getStrProp(t,"coupon",!1),this.getNumProp(t,"tax",!1),this.getNumProp(t,"shipping",!1),this.getStrProp(t,"itemListID",!1),this.getStrProp(t,"itemListName",!1))}},s.prototype.HandleCmd=function(t,e){try{switch(t){case"init":var n=e;this.HandleInitCmd(n.counterId,n.clientId,n.debugMode,n.cookieDomain,n.resetUserId);break;case"pageview":this.HandlePageViewCmd();break;case r:n=e;this.HandleSetClientIdCmd(n.clientId);break;case i:n=e;this.HandleGoalReachCmd(n.name,n.price100,n.currency);break;case"ec:send":this.SendEvent("ec",this.BuildStatParams());break;case"ec:addProduct":this.ECHandleAddProductCmd(e);break;case"ec:setCurrency":this.ECHandleSetCurrencyCmd(e);break;case"ec:setAction":this.ECHandleSetActionCmd(e);break;case"ec:clear":this.ECClear();break;default:throw new Error("Unknown command '"+t+"'.")}}catch(e){if(this.isDebugMode())try{console.error("An error occurred while handling '"+t+"' command:\n\t"+e)}catch(t){}}},s.prototype.HandleSetClientIdCmd=function(t){this.clientId=t,this.SendEvent(r,this.BuildStatParams())},s.prototype.HandleInitCmd=function(t,e,r,i,n){if(this.counterId=t,this.clientId=e,this._debugMode=!0===r,"string"==typeof i&&0!==i.length?this._cookieDomain=i:this._cookieDomain=window.location.hostname,this.initUserId("boolean"==typeof n&&n),!0===r)try{console.log("Initialization done:\n\tthis.counterId='"+this.counterId+"'\n\tthis.userId='"+this.userId+"'\n\tthis.clientId='"+this.clientId+"'\n\tthis._debugMode='"+this._debugMode+"'\n\tthis._cookieDomain='"+this._cookieDomain+"'\n\tSDKVersionBuildNum='258'")}catch(t){}},s.prototype.HandlePageViewCmd=function(){this.SendEvent("pageview",this.BuildStatParams())},s.prototype.HandleGoalReachCmd=function(t,e,r){var n=this.BuildStatParams();n.gn=t,n.gp100=e,n.gcr=r,this.SendEvent(i,n)},s.prototype.BuildStatParams=function(){var t={};t.t=document.title.substring(0,500),t.u=document.URL,t.cid=this.counterId,t.s=this.GetScreenInfo(),t.w=this.GetWindowInfo(),t.user_id=this.userId,t.vbn="258",this.clientId&&(t.client_id=this.clientId);var e=document.referrer;return"string"==typeof e&&(e=e.trim()).length>1&&(t.r=e),this.isNewUser&&(t.nu=1),t},s.prototype.GetScreenInfo=function(){return(0|window.screen.width*(window.devicePixelRatio||1))+"x"+(0|window.screen.height*(window.devicePixelRatio||1))+"x"+(0|window.screen.colorDepth)},s.prototype.GetWindowInfo=function(){return(0|(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth))+"x"+(0|(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight))},s.prototype.SendEvent=function(t,e){var r=new XMLHttpRequest,i=new Array;Object.keys(e).forEach((function(t){var r=e[t];null!=r&&i.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}));var n="https://a.wb.ru/e/"+t+"?"+i.join("&");switch(r.open("POST",n),r.setRequestHeader("Content-Type","text/plain"),this.isDebugMode()&&(r.onload=function(){200===r.status?console.log("successfully event send"):console.log("non 200 response code from backend")}),t){case"ec":r.send(JSON.stringify(this.ECPrepareJSON())),this.ECClear();break;default:r.send(JSON.stringify({}))}},s.prototype.isDebugMode=function(){if(this._debugMode)return!0;try{return window.location.href.indexOf("_adebug=1")>=0}catch(t){return!1}},s.prototype.getStrProp=function(t,e,r){var i=t[e];if("string"==typeof i)return i;if(!r&&void 0===i)return"";throw new Error("Invalid type '"+typeof i+"' of '"+e+'\': expected "string".')},s.prototype.getNumProp=function(t,e,r){var i=t[e];if("number"==typeof i)return i;if(!r&&void 0===i)return 0;throw new Error("Invalid type '"+typeof i+"' of '"+e+'\': expected "number".')},s}())).init()}();
