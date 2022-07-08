define(["exports"],(function(t){"use strict";try{self["workbox:core:6.5.2"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.5.2"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class r{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class i extends r{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=i&&i.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:r})}catch(t){c=Promise.reject(t)}const h=i&&i.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:r})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const r=this.t.get(s.method)||[];for(const i of r){let r;const a=i.match({url:t,sameOrigin:e,request:s,event:n});if(a)return r=a,(Array.isArray(r)&&0===r.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let o;const c=()=>(o||(o=new a,o.addFetchListener(),o.addCacheListener()),o);function h(t,e,n){let a;if("string"==typeof t){const s=new URL(t,location.href);a=new r((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)a=new i(t,e,n);else if("function"==typeof t)a=new r(t,e,n);else{if(!(t instanceof r))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=t}return c().registerRoute(a),a}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=t=>[u.prefix,t,u.suffix].filter((t=>t&&t.length>0)).join("-"),f=t=>t||l(u.precache),w=t=>t||l(u.runtime);function d(t){t.then((()=>{}))}const y=new Set;function p(){return p=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},p.apply(this,arguments)}let m,g;const b=new WeakMap,D=new WeakMap,R=new WeakMap,q=new WeakMap,v=new WeakMap;let I={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return D.get(t);if("objectStoreNames"===e)return t.objectStoreNames||R.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return x(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function B(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(g||(g=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(k(this),e),x(b.get(this))}:function(...e){return x(t.apply(k(this),e))}:function(e,...s){const n=t.call(k(this),e,...s);return R.set(n,e.sort?e.sort():[e]),x(n)}}function E(t){return"function"==typeof t?B(t):(t instanceof IDBTransaction&&function(t){if(D.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),n()},i=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)}));D.set(t,e)}(t),e=t,(m||(m=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((t=>e instanceof t))?new Proxy(t,I):t);var e}function x(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",r),t.removeEventListener("error",i)},r=()=>{e(x(t.result)),n()},i=()=>{s(t.error),n()};t.addEventListener("success",r),t.addEventListener("error",i)}));return e.then((e=>{e instanceof IDBCursor&&b.set(e,t)})).catch((()=>{})),v.set(e,t),e}(t);if(q.has(t))return q.get(t);const e=E(t);return e!==t&&(q.set(t,e),v.set(e,t)),e}const k=t=>v.get(t);const U=["get","getKey","getAll","getAllKeys","count"],C=["put","add","delete","clear"],N=new Map;function L(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(N.get(e))return N.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,r=C.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!r&&!U.includes(s))return;const i=async function(t,...e){const i=this.transaction(t,r?"readwrite":"readonly");let a=i.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),r&&i.done]))[0]};return N.set(e,i),i}I=(t=>p({},t,{get:(e,s,n)=>L(e,s)||t.get(e,s,n),has:(e,s)=>!!L(e,s)||t.has(e,s)}))(I);try{self["workbox:expiration:6.5.2"]&&_()}catch(t){}const O="cache-entries",T=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class M{constructor(t){this.h=null,this.u=t}l(t){const e=t.createObjectStore(O,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}p(t){this.l(t),this.u&&function(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);e&&s.addEventListener("blocked",(()=>e())),x(s).then((()=>{}))}(this.u)}async setTimestamp(t,e){const s={url:t=T(t),timestamp:e,cacheName:this.u,id:this.m(t)},n=(await this.getDb()).transaction(O,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(t){const e=await this.getDb(),s=await e.get(O,this.m(t));return null==s?void 0:s.timestamp}async expireEntries(t,e){const s=await this.getDb();let n=await s.transaction(O).store.index("timestamp").openCursor(null,"prev");const r=[];let i=0;for(;n;){const s=n.value;s.cacheName===this.u&&(t&&s.timestamp<t||e&&i>=e?r.push(n.value):i++),n=await n.continue()}const a=[];for(const t of r)await s.delete(O,t.id),a.push(t.url);return a}m(t){return this.u+"|"+T(t)}async getDb(){return this.h||(this.h=await function(t,e,{blocked:s,upgrade:n,blocking:r,terminated:i}={}){const a=indexedDB.open(t,e),o=x(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(x(a.result),t.oldVersion,t.newVersion,x(a.transaction))})),s&&a.addEventListener("blocked",(()=>s())),o.then((t=>{i&&t.addEventListener("close",(()=>i())),r&&t.addEventListener("versionchange",(()=>r()))})).catch((()=>{})),o}("workbox-expiration",1,{upgrade:this.p.bind(this)})),this.h}}class j{constructor(t,e={}){this.g=!1,this.D=!1,this.R=e.maxEntries,this.q=e.maxAgeSeconds,this.v=e.matchOptions,this.u=t,this.I=new M(t)}async expireEntries(){if(this.g)return void(this.D=!0);this.g=!0;const t=this.q?Date.now()-1e3*this.q:0,e=await this.I.expireEntries(t,this.R),s=await self.caches.open(this.u);for(const t of e)await s.delete(t,this.v);this.g=!1,this.D&&(this.D=!1,d(this.expireEntries()))}async updateTimestamp(t){await this.I.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.q){const e=await this.I.getTimestamp(t),s=Date.now()-1e3*this.q;return void 0===e||e<s}return!1}async delete(){this.D=!1,await this.I.expireEntries(1/0)}}try{self["workbox:cacheable-response:6.5.2"]&&_()}catch(t){}class P{constructor(t={}){this.B=t.statuses,this.k=t.headers}isResponseCacheable(t){let e=!0;return this.B&&(e=this.B.includes(t.status)),this.k&&e&&(e=Object.keys(this.k).some((e=>t.headers.get(e)===this.k[e]))),e}}function S(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class W{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}function A(t){return new Promise((e=>setTimeout(e,t)))}try{self["workbox:strategies:6.5.2"]&&_()}catch(t){}function K(t){return"string"==typeof t?new Request(t):t}class F{constructor(t,e){this._={},Object.assign(this,e),this.event=e.event,this.U=t,this.C=new W,this.N=[],this.L=[...t.plugins],this.O=new Map;for(const t of this.L)this.O.set(t,{});this.event.waitUntil(this.C.promise)}async fetch(t){const{event:e}=this;let n=K(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const i=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.U.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:i,response:t});return t}catch(t){throw r&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:r.clone(),request:i.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=K(t);let s;const{cacheName:n,matchOptions:r}=this.U,i=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(t,e){const n=K(t);await A(0);const r=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(i=r.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const a=await this.T(e);if(!a)return!1;const{cacheName:o,matchOptions:c}=this.U,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),l=u?await async function(t,e,s,n){const r=S(e.url,s);if(e.url===r)return t.match(e,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,i);for(const e of a)if(r===S(e.url,s))return t.match(e,n)}(h,r.clone(),["__WB_REVISION__"],c):null;try{await h.put(r,u?a.clone():a)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of y)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:l,newResponse:a.clone(),request:r,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this._[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=K(await t({mode:e,request:n,event:this.event,params:this.params}));this._[s]=n}return this._[s]}hasCallback(t){for(const e of this.U.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.U.plugins)if("function"==typeof e[t]){const s=this.O.get(e),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return e[t](r)};yield n}}waitUntil(t){return this.N.push(t),t}async doneWaiting(){let t;for(;t=this.N.shift();)await t}destroy(){this.C.resolve(null)}async T(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class ${constructor(t={}){this.cacheName=w(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,r=new F(this,{event:e,request:s,params:n}),i=this.M(r,s,e);return[i,this.j(i,r,s,e)]}async M(t,e,n){let r;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(r=await this.P(e,t),!r||"error"===r.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const i of t.iterateCallbacks("handlerDidError"))if(r=await i({error:s,event:n,request:e}),r)break;if(!r)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))r=await s({event:n,request:e,response:r});return r}async j(t,e,s,n){let r,i;try{r=await t}catch(i){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await e.doneWaiting()}catch(t){t instanceof Error&&(i=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),e.destroy(),i)throw i}}let H,Q;const G=new WeakMap,z=new WeakMap,V=new WeakMap,J=new WeakMap,X=new WeakMap;let Y={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return z.get(t);if("objectStoreNames"===e)return t.objectStoreNames||V.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return et(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function Z(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(Q||(Q=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(st(this),e),et(G.get(this))}:function(...e){return et(t.apply(st(this),e))}:function(e,...s){const n=t.call(st(this),e,...s);return V.set(n,e.sort?e.sort():[e]),et(n)}}function tt(t){return"function"==typeof t?Z(t):(t instanceof IDBTransaction&&function(t){if(z.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),n()},i=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)}));z.set(t,e)}(t),e=t,(H||(H=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((t=>e instanceof t))?new Proxy(t,Y):t);var e}function et(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",r),t.removeEventListener("error",i)},r=()=>{e(et(t.result)),n()},i=()=>{s(t.error),n()};t.addEventListener("success",r),t.addEventListener("error",i)}));return e.then((e=>{e instanceof IDBCursor&&G.set(e,t)})).catch((()=>{})),X.set(e,t),e}(t);if(J.has(t))return J.get(t);const e=tt(t);return e!==t&&(J.set(t,e),X.set(e,t)),e}const st=t=>X.get(t);const nt=["get","getKey","getAll","getAllKeys","count"],rt=["put","add","delete","clear"],it=new Map;function at(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(it.get(e))return it.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,r=rt.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!r&&!nt.includes(s))return;const i=async function(t,...e){const i=this.transaction(t,r?"readwrite":"readonly");let a=i.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),r&&i.done]))[0]};return it.set(e,i),i}!function(t){Y=t(Y)}((t=>p({},t,{get:(e,s,n)=>at(e,s)||t.get(e,s,n),has:(e,s)=>!!at(e,s)||t.has(e,s)})));try{self["workbox:background-sync:6.5.2"]&&_()}catch(t){}const ot="requests",ct="queueName";class ht{constructor(){this.h=null}async addEntry(t){const e=(await this.getDb()).transaction(ot,"readwrite",{durability:"relaxed"});await e.store.add(t),await e.done}async getFirstEntryId(){const t=await this.getDb(),e=await t.transaction(ot).store.openCursor();return null==e?void 0:e.value.id}async getAllEntriesByQueueName(t){const e=await this.getDb(),s=await e.getAllFromIndex(ot,ct,IDBKeyRange.only(t));return s||new Array}async getEntryCountByQueueName(t){return(await this.getDb()).countFromIndex(ot,ct,IDBKeyRange.only(t))}async deleteEntry(t){const e=await this.getDb();await e.delete(ot,t)}async getFirstEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"next")}async getLastEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"prev")}async getEndEntryFromIndex(t,e){const s=await this.getDb(),n=await s.transaction(ot).store.index(ct).openCursor(t,e);return null==n?void 0:n.value}async getDb(){return this.h||(this.h=await function(t,e,{blocked:s,upgrade:n,blocking:r,terminated:i}={}){const a=indexedDB.open(t,e),o=et(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(et(a.result),t.oldVersion,t.newVersion,et(a.transaction))})),s&&a.addEventListener("blocked",(()=>s())),o.then((t=>{i&&t.addEventListener("close",(()=>i())),r&&t.addEventListener("versionchange",(()=>r()))})).catch((()=>{})),o}("workbox-background-sync",3,{upgrade:this.l})),this.h}l(t,e){e>0&&e<3&&t.objectStoreNames.contains(ot)&&t.deleteObjectStore(ot);t.createObjectStore(ot,{autoIncrement:!0,keyPath:"id"}).createIndex(ct,ct,{unique:!1})}}class ut{constructor(t){this.S=t,this.W=new ht}async pushEntry(t){delete t.id,t.queueName=this.S,await this.W.addEntry(t)}async unshiftEntry(t){const e=await this.W.getFirstEntryId();e?t.id=e-1:delete t.id,t.queueName=this.S,await this.W.addEntry(t)}async popEntry(){return this.A(await this.W.getLastEntryByQueueName(this.S))}async shiftEntry(){return this.A(await this.W.getFirstEntryByQueueName(this.S))}async getAll(){return await this.W.getAllEntriesByQueueName(this.S)}async size(){return await this.W.getEntryCountByQueueName(this.S)}async deleteEntry(t){await this.W.deleteEntry(t)}async A(t){return t&&await this.deleteEntry(t.id),t}}const lt=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class ft{constructor(t){"navigate"===t.mode&&(t.mode="same-origin"),this.K=t}static async fromRequest(t){const e={url:t.url,headers:{}};"GET"!==t.method&&(e.body=await t.clone().arrayBuffer());for(const[s,n]of t.headers.entries())e.headers[s]=n;for(const s of lt)void 0!==t[s]&&(e[s]=t[s]);return new ft(e)}toObject(){const t=Object.assign({},this.K);return t.headers=Object.assign({},this.K.headers),t.body&&(t.body=t.body.slice(0)),t}toRequest(){return new Request(this.K.url,this.K)}clone(){return new ft(this.toObject())}}const wt="workbox-background-sync",dt=new Set,yt=t=>{const e={request:new ft(t.requestData).toRequest(),timestamp:t.timestamp};return t.metadata&&(e.metadata=t.metadata),e};class pt{constructor(t,{forceSyncFallback:e,onSync:n,maxRetentionTime:r}={}){if(this.F=!1,this.$=!1,dt.has(t))throw new s("duplicate-queue-name",{name:t});dt.add(t),this.H=t,this.G=n||this.replayRequests,this.V=r||10080,this.J=Boolean(e),this.X=new ut(this.H),this.Y()}get name(){return this.H}async pushRequest(t){await this.Z(t,"push")}async unshiftRequest(t){await this.Z(t,"unshift")}async popRequest(){return this.tt("pop")}async shiftRequest(){return this.tt("shift")}async getAll(){const t=await this.X.getAll(),e=Date.now(),s=[];for(const n of t){const t=60*this.V*1e3;e-n.timestamp>t?await this.X.deleteEntry(n.id):s.push(yt(n))}return s}async size(){return await this.X.size()}async Z({request:t,metadata:e,timestamp:s=Date.now()},n){const r={requestData:(await ft.fromRequest(t.clone())).toObject(),timestamp:s};switch(e&&(r.metadata=e),n){case"push":await this.X.pushEntry(r);break;case"unshift":await this.X.unshiftEntry(r)}this.F?this.$=!0:await this.registerSync()}async tt(t){const e=Date.now();let s;switch(t){case"pop":s=await this.X.popEntry();break;case"shift":s=await this.X.shiftEntry()}if(s){const n=60*this.V*1e3;return e-s.timestamp>n?this.tt(t):yt(s)}}async replayRequests(){let t;for(;t=await this.shiftRequest();)try{await fetch(t.request.clone())}catch(e){throw await this.unshiftRequest(t),new s("queue-replay-failed",{name:this.H})}}async registerSync(){if("sync"in self.registration&&!this.J)try{await self.registration.sync.register(`${wt}:${this.H}`)}catch(t){}}Y(){"sync"in self.registration&&!this.J?self.addEventListener("sync",(t=>{if(t.tag===`${wt}:${this.H}`){const e=async()=>{let e;this.F=!0;try{await this.G({queue:this})}catch(t){if(t instanceof Error)throw e=t,e}finally{!this.$||e&&!t.lastChance||await this.registerSync(),this.F=!1,this.$=!1}};t.waitUntil(e())}})):this.G({queue:this})}static get et(){return dt}}function mt(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:6.5.2"]&&_()}catch(t){}function gt(t){if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const r=new URL(n,location.href),i=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",e),{cacheKey:r.href,url:i.href}}class bt{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class Dt{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.st.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.st=t}}let Rt,qt;async function vt(t,e){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new s("cross-origin-copy-response",{origin:n});const r=t.clone(),i={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},a=e?e(i):i,o=function(){if(void 0===Rt){const t=new Response("");if("body"in t)try{new Response(t.body),Rt=!0}catch(t){Rt=!1}Rt=!1}return Rt}()?r.body:await r.blob();return new Response(o,a)}class It extends ${constructor(t={}){t.cacheName=f(t.cacheName),super(t),this.nt=!1!==t.fallbackToNetwork,this.plugins.push(It.copyRedirectedCacheableResponsesPlugin)}async P(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.rt(t,e):await this.it(t,e))}async it(t,e){let n;const r=e.params||{};if(!this.nt)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const s=r.integrity,i=t.integrity,a=!i||i===s;n=await e.fetch(new Request(t,{integrity:i||s})),s&&a&&(this.ot(),await e.cachePut(t,n.clone()))}return n}async rt(t,e){this.ot();const n=await e.fetch(t);if(!await e.cachePut(t,n.clone()))throw new s("bad-precaching-response",{url:t.url,status:n.status});return n}ot(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==It.copyRedirectedCacheableResponsesPlugin&&(n===It.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(It.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}It.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},It.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await vt(t):t};class Bt{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.ct=new Map,this.ht=new Map,this.ut=new Map,this.U=new It({cacheName:f(t),plugins:[...e,new Dt({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.U}precache(t){this.addToCacheList(t),this.lt||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.lt=!0)}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:r}=gt(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this.ct.has(r)&&this.ct.get(r)!==t)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.ct.get(r),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.ut.has(t)&&this.ut.get(t)!==n.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:r});this.ut.set(t,n.integrity)}if(this.ct.set(r,t),this.ht.set(r,i),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return mt(t,(async()=>{const e=new bt;this.strategy.plugins.push(e);for(const[e,s]of this.ct){const n=this.ut.get(s),r=this.ht.get(e),i=new Request(e,{integrity:n,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return mt(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.ct.values()),n=[];for(const r of e)s.has(r.url)||(await t.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.ct}getCachedURLs(){return[...this.ct.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.ct.get(e.href)}getIntegrityForCacheKey(t){return this.ut.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new s("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}const Et=()=>(qt||(qt=new Bt),qt);class xt extends r{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const r of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const i=new URL(t,location.href);i.hash="",yield i.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(i,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(r){const t=r({url:i});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(r);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}t.BackgroundSyncPlugin=class{constructor(t,e){this.fetchDidFail=async({request:t})=>{await this.ft.pushRequest({request:t})},this.ft=new pt(t,e)}},t.CacheFirst=class extends ${async P(t,e){let n,r=await e.cacheMatch(t);if(!r)try{r=await e.fetchAndCachePut(t)}catch(t){t instanceof Error&&(n=t)}if(!r)throw new s("no-response",{url:t.url,error:n});return r}},t.CacheableResponsePlugin=class{constructor(t){this.cacheWillUpdate=async({response:t})=>this.wt.isResponseCacheable(t)?t:null,this.wt=new P(t)}},t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=async({event:t,request:e,cacheName:s,cachedResponse:n})=>{if(!n)return null;const r=this.dt(n),i=this.yt(s);d(i.expireEntries());const a=i.updateTimestamp(e.url);if(t)try{t.waitUntil(a)}catch(t){}return r?n:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const s=this.yt(t);await s.updateTimestamp(e.url),await s.expireEntries()},this.gt=t,this.q=t.maxAgeSeconds,this.bt=new Map,t.purgeOnQuotaError&&function(t){y.add(t)}((()=>this.deleteCacheAndMetadata()))}yt(t){if(t===w())throw new s("expire-custom-caches-only");let e=this.bt.get(t);return e||(e=new j(t,this.gt),this.bt.set(t,e)),e}dt(t){if(!this.q)return!0;const e=this.Dt(t);if(null===e)return!0;return e>=Date.now()-1e3*this.q}Dt(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[t,e]of this.bt)await self.caches.delete(t),await e.delete();this.bt=new Map}},t.NavigationRoute=class extends r{constructor(t,{allowlist:e=[/./],denylist:s=[]}={}){super((t=>this.Rt(t)),t),this.qt=e,this.vt=s}Rt({url:t,request:e}){if(e&&"navigate"!==e.mode)return!1;const s=t.pathname+t.search;for(const t of this.vt)if(t.test(s))return!1;return!!this.qt.some((t=>t.test(s)))}},t.NetworkOnly=class extends ${constructor(t={}){super(t),this.It=t.networkTimeoutSeconds||0}async P(t,e){let n,r;try{const s=[e.fetch(t)];if(this.It){const t=A(1e3*this.It);s.push(t)}if(r=await Promise.race(s),!r)throw new Error(`Timed out the network response after ${this.It} seconds.`)}catch(t){t instanceof Error&&(n=t)}if(!r)throw new s("no-response",{url:t.url,error:n});return r}},t.cleanupOutdatedCaches=function(){self.addEventListener("activate",(t=>{const e=f();t.waitUntil((async(t,e="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t));return await Promise.all(s.map((t=>self.caches.delete(t)))),s})(e).then((t=>{})))}))},t.createHandlerBoundToURL=function(t){return Et().createHandlerBoundToURL(t)},t.precacheAndRoute=function(t,e){!function(t){Et().precache(t)}(t),function(t){const e=Et();h(new xt(e,t))}(e)},t.registerRoute=h}));