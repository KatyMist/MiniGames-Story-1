var ia=Object.defineProperty;var oa=(t,e,n)=>e in t?ia(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Rn=(t,e,n)=>oa(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const Mr="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAABCNJREFUeAG1V91rXEUU/83szeazNj5YTRVJQWoEg1YqKD6of4KKL2KxD4qPPuiLltpabKlatUIefFFEQQT7KAhFSAVfRKFSQQShXbWUZrMJCdm0m9175/TM1/3YvR9J0x52mLkzc875na+ZHcAREU1yO6KI5rnRbWrnQ6KDSJFwyqcJmOfhNMqIPMe2qcFinhVCNIw4RnapUvmtR6SV76uRdcnBm5Mryhn8dP7yJE9vCB0X/ngUt4y25JVzGgBtT8b2MMjcWVEhnTGTUuh2Q9PrJtKsWwAvsSUi81OK8MHps9j/9EnMPnEcn8z9pBM5DvdWKD8EfjEWmPKpViQE9swexq5dO3mW0Gyu4eKfx7JQDUt1LEo9QBko2WGnG9k9/N3rRYM8pbGgzQHwm3u9EKFWYtxshX564gV4BB+ffD7ZrXOD96soyYvBuCTASkNgmQkX/rqMA699g4iFs1yjZGJiGEGtZmSFoUK73UEgJfjH8xJfff4yHpm9vzIngirlmu69507U6wFqtRyHkVU4uXMsmWKUU1OTsa2UsptSfHqiPATOU2NjdWNlpr6LeqZeFOGOidFYT1pnv+xyAI5jZDiwNS98dts1kTbJR5Lnuhuh8ZjZg/I6CNKAKFaqjDwpLT5ddpGiRJDKyStfdowy5L1SJmqV+87LB5nmt9p0nUu8+fYZ7H3sKO6bOYSvv/sVE+PDzgNkeo2GPPI+C3aMj+DbM79h94Pv4IF9R/DWoe8NiDzKVoEbdrnkHn/mFEZHAqNM5PGKxGg9ZkFQukdiqYQGKzgkEX45+wbGR0cs+BQFGR+6oJIWpnTMa1ZgfKWm71fbKQeQZAqM26EMC7FBG2xMPTcZZMYk19frNbx64Ek0F9Zx+f8lzH34ojmMtALhDiPh8Eple0HJUa2T8PSJ53D1ygoWFtt4/ZWnjNy8g7nwINKHjU9CTXv3H+Nat6VllPHSUusaJ2eEu+/aYYSTuSeA1dXr+Pv3d2NepW9LmVOvKClDwcpNwhGZBBoyh5CznIcPz+zGP+cP49KF9/DQzFRGrD4RtVJjiJNVVJCDAHL80dnoYWgoMO7XMpoLbXwx95IpT01f8ri1vB6fCwGHsNMJE4HWPcijQQA5ibKyeg31wGcbIRjqY2HNxmIX5HpQQ3u9k5VZcBrJEr2uKoB//1vG4lKbLV9Ds7XGNx3h+Ec/WPsY0PunfuRkgllb5P8GreU2LjZaiRwq1LCJ27AAILlw+NX+deX+uFSRzKIsIB/GuFHsHX+ymIRN7ckop2IdGsA5WCOKSRSggj8mU4DK+Ae3/CGZ9edc2aXks4pQfd8VE6fNZ8I8SgH9OJmuYkjfvv3z6FsTJd9u3JBC7OEmVvRDkecaqCDa5Foe0L4/Jg2ns28TvxP1U+02Ps/nI6Kj2ute5w08AKp+H2eCQgAAAABJRU5ErkJggg==",xr="Player",ca=2,Ur=30;function Fr(t){const e=t.indexOf("@");return(e===-1?t:t.slice(0,e)).trim()}function It(t){const e=t.displayName.trim();if(e)return e;const n=Fr(t.email);return n||xr}function Ln(t){const e=/[\p{L}\p{N}]/u.exec(t);return e?e[0].toUpperCase():""}function la(t){const e=t.trim().split(/\s+/).filter(Boolean);return e.length===1?Ln(e[0]??""):e.slice(0,2).map(n=>Ln(n)).join("")}function On(t){return t.length>=ca&&t.length<=Ur}function da(t){const e=t.displayName.trim();if(On(e))return e;const n=Fr(t.email).slice(0,Ur);return On(n)?n:xr}function Br(t){const[e=""]=[...t.trim()];return e.toUpperCase()}function ua(t){const e=la(t),n=document.createElement("span");return e?(n.className="user-avatar__initials",n.textContent=e):(n.className="material-symbols-outlined user-avatar__fallback",n.translate=!1,n.textContent="person"),n}function ha(t,e=""){const n=document.createElement("span");n.className=`user-avatar ${e}`.trim(),n.setAttribute("aria-hidden","true");const r=It(t),s=()=>{n.classList.remove("user-avatar--photo"),n.replaceChildren(ua(r))};if(!t.avatarUrl)return s(),n;const a=document.createElement("img");return a.className="user-avatar__image",a.alt="",a.referrerPolicy="no-referrer",a.addEventListener("error",s,{once:!0}),a.src=t.avatarUrl,n.classList.add("user-avatar--photo"),n.append(a),n}function Hr(t,e){const n=document.createElement("div");n.className=e;const r=document.createElement("span");return r.className=`${e}-name`,r.textContent=It(t),n.append(r,ha(t,`${e}-avatar`)),n}const lt="/MiniGames-Story-1/".replace(/\/+$/,""),ma={"/":"home","/home":"home","/library":"library"};function fa(t){let e=t;return lt&&e.startsWith(lt)&&(e=e.slice(lt.length)),e=e.replace(/\/index\.html$/,"/").replace(/\/+$/,""),e===""?"/":e}function cn(){const t=fa(window.location.pathname);return{page:ma[t]??"not-found",path:t,query:new URLSearchParams(window.location.search)}}function Ye(t,e){const n=t.startsWith("/")?t:`/${t}`,r=e&&e.toString()?`?${e.toString()}`:"";return`${lt}${n}${r}`}const qt=new Set;let je;function $r(){const t=je,e=cn();if(!(t&&t.path===e.path&&t.query.toString()===e.query.toString())){je=e;for(const n of qt)n(e,t)}}function Ce(){return je??(je=cn()),je}function Wr(t){return qt.add(t),()=>{qt.delete(t)}}function Xe(t,e,n={}){const r=`${Ye(t,e)}${n.hash??""}`,s=window.history.state??{},i=n.dialog??(n.replace?!!s.dialog:!1)?{dialog:!0}:{},{pathname:c,search:o,hash:l}=window.location;!n.replace&&r===`${c}${o}${n.hash===void 0?"":l}`||(n.replace?window.history.replaceState(i,"",r):window.history.pushState(i,"",r),$r())}function J(t,e={}){const n=Ce(),r=new URLSearchParams(n.query);for(const[s,a]of Object.entries(t))a===void 0||a===""?r.delete(s):r.set(s,String(a));Xe(n.path,r,{hash:window.location.hash,...e})}const pa=300;function Mt(t){if((window.history.state??{}).dialog){const n=window.location.href;window.history.back(),window.setTimeout(()=>{const r=new URLSearchParams(window.location.search).has(t);window.location.href===n&&r&&J({[t]:void 0},{replace:!0,dialog:!1})},pa);return}J({[t]:void 0},{replace:!0})}function ga(t){if(t.defaultPrevented||t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||!(t.target instanceof Element))return;const e=t.target.closest("a[data-route]");if(!e)return;t.preventDefault();const n=e.dataset.route??"/",[r="/",s=""]=n.split("?");Xe(r,new URLSearchParams(s)),window.scrollTo({top:0})}function _a(){const{hash:t}=window.location;if(!t.startsWith("#/"))return;const e=new URL(t.slice(1),window.location.origin);window.history.replaceState({},"",Ye(e.pathname,e.searchParams))}function ba(){_a(),je=cn(),window.addEventListener("popstate",$r),document.addEventListener("click",ga)}const Gr=[{label:"Home",route:"/",page:"home"},{label:"Library",route:"/library",page:"library"},{label:"Tournaments"},{label:"Community"}];function Vr(t,e){e.route?(t.href=Ye(e.route),t.dataset.route=e.route):t.href="#"}function va(){const t=document.createElement("div");t.className="mobile-menu__logo";const e=document.createElement("img");e.className="mobile-menu__logo-icon",e.src=Mr,e.alt="",e.width=32,e.height=32;const n=document.createElement("span");return n.className="mobile-menu__logo-text",n.textContent="MiniGames",t.append(e,n),t}function ya(t){const e=document.createElement("button");e.type="button",e.className="mobile-menu__close",e.setAttribute("aria-label","Close menu");const n=document.createElement("span");return n.className="material-symbols-outlined",n.translate=!1,n.setAttribute("aria-hidden","true"),n.textContent="close",e.append(n),e.addEventListener("click",t),e}function Ea(t,e){const n=document.createElement("ul");n.className="mobile-menu__links";const r=Ce().page;for(const s of t){const a=document.createElement("li"),i=document.createElement("a");i.className="mobile-menu__link",Vr(i,s),i.textContent=s.label,s.page&&s.page===r&&(i.classList.add("mobile-menu__link--active"),i.setAttribute("aria-current","page")),i.addEventListener("click",e),a.append(i),n.append(a)}return n}function wa(t,e){const n=document.createElement("div");if(n.className="mobile-menu__actions",e!=null&&e.session){const{onLogout:a}=e,i=document.createElement("button");return i.type="button",i.className="btn btn--outline-light",i.textContent="Log Out",i.addEventListener("click",()=>{t(),a()}),n.append(Hr(e.session,"mobile-menu__user"),i),n}const r=document.createElement("button");r.type="button",r.className="btn btn--outline-light",r.textContent="Log In",r.addEventListener("click",()=>{t(),e==null||e.onAuthRequest("login")});const s=document.createElement("button");return s.type="button",s.className="btn btn--primary",s.textContent="Sign Up",s.addEventListener("click",()=>{t(),e==null||e.onAuthRequest("register")}),n.append(r,s),n}function Aa(t,e,n){const r=document.createElement("div");r.className="mobile-menu";const s=document.createElement("div");s.className="mobile-menu__backdrop";const a=document.createElement("div");a.className="mobile-menu__panel",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Mobile menu");let i=!1;const c=()=>{i&&(i=!1,r.classList.remove("mobile-menu--open"),document.body.style.removeProperty("overflow"),e==null||e(!1))},o=()=>{i||(i=!0,r.classList.add("mobile-menu--open"),document.body.style.overflow="hidden",e==null||e(!0))},l=()=>(i?c():o(),i),d=document.createElement("div");return d.className="mobile-menu__top",d.append(va(),ya(c)),a.append(d,Ea(t,c),wa(c,n)),r.append(s,a),s.addEventListener("click",c),document.addEventListener("keydown",u=>{u.key==="Escape"&&c()}),window.matchMedia("(min-width: 1440px)").addEventListener("change",u=>{u.matches&&c()}),{element:r,toggle:l,close:c}}const Ia=4e3,Ca=200,Sa=3,Na={success:"check_circle",error:"error",warning:"warning",info:"info"};let W;function Ta(){return W!=null&&W.isConnected||(W=document.createElement("div"),W.className="snackbar-stack",W.setAttribute("aria-live","polite"),W.setAttribute("aria-atomic","false"),document.body.append(W)),W}function xt(t){!t.isConnected||t.classList.contains("snackbar--leaving")||(t.classList.add("snackbar--leaving"),window.setTimeout(()=>t.remove(),Ca))}function C(t,e={}){const n=e.variant??"info",r=Ta();for(const h of r.querySelectorAll(".snackbar"))if(h.dataset.message===t&&!h.classList.contains("snackbar--leaving"))return;const s=document.createElement("div");s.className=`snackbar snackbar--${n}`,s.dataset.message=t,s.setAttribute("role",n==="error"||n==="warning"?"alert":"status");const a=document.createElement("span");a.className="material-symbols-outlined snackbar__icon",a.translate=!1,a.setAttribute("aria-hidden","true"),a.textContent=Na[n];const i=document.createElement("p");i.className="snackbar__message",i.textContent=t;const c=document.createElement("button");c.type="button",c.className="snackbar__close",c.setAttribute("aria-label","Dismiss notification");const o=document.createElement("span");o.className="material-symbols-outlined",o.translate=!1,o.setAttribute("aria-hidden","true"),o.textContent="close",c.append(o),s.append(a,i,c),r.append(s);const l=r.querySelectorAll(".snackbar:not(.snackbar--leaving)");l.length>Sa&&l[0]&&xt(l[0]);const d=window.setTimeout(()=>xt(s),e.duration??Ia);c.addEventListener("click",()=>{window.clearTimeout(d),xt(s)})}const Ct="minigames:katymist-minigames:app-session",ka=5*60*1e3;function Pa(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function Ra(t){if(!Pa(t))return;const{displayName:e,email:n,authenticatedAt:r,avatarUrl:s}=t;if(typeof e!="string"||typeof n!="string"||n.trim()===""||typeof r!="number"||!Number.isFinite(r)||r<=0||s!==void 0&&typeof s!="string")return;const a={displayName:e,email:n,authenticatedAt:r};return s&&(a.avatarUrl=s),a}function La(t,e=Date.now()){var s,a;const n=((s=t.email)==null?void 0:s.trim())??"";if(!n)throw new Error("The account has no email address.");const r={displayName:((a=t.displayName)==null?void 0:a.trim())??"",email:n,authenticatedAt:e};return t.photoURL&&(r.avatarUrl=t.photoURL),r}function jr(t){return t.authenticatedAt+ka}function Oa(t,e=Date.now()){return e>=jr(t)||t.authenticatedAt>e}function Da(t,e=window.localStorage){e.setItem(Ct,JSON.stringify(t))}function Ma(t=window.localStorage){try{t.removeItem(Ct)}catch{}}function xa(t=Date.now(),e=window.localStorage){let n;try{n=e.getItem(Ct)}catch{return{status:"none"}}if(n===null)return{status:"none"};let r;try{r=JSON.parse(n)}catch{return{status:"invalid"}}const s=Ra(r);return s?Oa(s,t)?{status:"expired",session:s}:{status:"active",session:s}:{status:"invalid"}}const Ua="Your session has expired. Please log in again.",Jt=new Set;let L,$e,Kr=()=>Promise.resolve();function Fa(){for(const t of Jt)t(L)}function zr(){$e!==void 0&&(window.clearTimeout($e),$e=void 0)}function Ba(t){zr();const e=Math.max(0,jr(t)-Date.now());$e=window.setTimeout(()=>{$e=void 0,ve()},e)}function ln(t){const e=(L==null?void 0:L.email)!==(t==null?void 0:t.email)||(L==null?void 0:L.authenticatedAt)!==(t==null?void 0:t.authenticatedAt)||(L==null?void 0:L.displayName)!==(t==null?void 0:t.displayName)||(L==null?void 0:L.avatarUrl)!==(t==null?void 0:t.avatarUrl);L=t,t?Ba(t):zr(),e&&Fa()}function oe(){return L}function Ha(){return L!==void 0}function qr(t){return Jt.add(t),()=>{Jt.delete(t)}}function $a(t){const e=La(t);return Da(e),ln(e),e}async function dt(t){Ma(),ln(void 0),t==="expired"&&C(Ua,{variant:"warning"});try{await Kr(),t==="logout"&&C("You have been logged out.",{variant:"success"})}catch{C("Could not sign out from Firebase. You are now in guest mode.",{variant:"error"})}}function ve(){const t=xa();switch(t.status){case"active":return ln(t.session),t.session;case"expired":{dt("expired");return}case"invalid":{dt("invalid");return}default:{L&&dt("removed");return}}}function Dn(){document.visibilityState==="visible"&&ve()}function Mn(t){(t.key===Ct||t.key===null)&&ve()}function Wa(t){return Kr=t.signOut,document.removeEventListener("visibilitychange",Dn),document.addEventListener("visibilitychange",Dn),window.removeEventListener("storage",Mn),window.addEventListener("storage",Mn),ve()}function Ga(){const t=document.createElement("a");t.className="header__logo",t.href=Ye("/"),t.dataset.route="/",t.setAttribute("aria-label","MiniGames — home");const e=document.createElement("img");e.className="header__logo-icon",e.src=Mr,e.alt="",e.width=32,e.height=32;const n=document.createElement("span");return n.className="header__logo-text",n.textContent="MiniGames",t.append(e,n),t}function Va(){const t=document.createElement("ul");t.className="header__links";const e=Ce().page;for(const n of Gr){const r=document.createElement("li"),s=document.createElement("a");s.className="header__link",Vr(s,n),s.textContent=n.label,n.page&&n.page===e&&(s.classList.add("header__link--active"),s.setAttribute("aria-current","page")),r.append(s),t.append(r)}return t}function Jr(t){const e=document.createElement("button");return e.type="button",e.className="btn btn--outline",e.textContent="Log Out",e.addEventListener("click",t),e}function ja(t,{onAuthRequest:e,onLogout:n}){const r=document.createElement("div");if(r.className="header__actions",t)return r.append(Hr(t,"header__user"),Jr(n)),r;const s=document.createElement("button");s.type="button",s.className="btn btn--outline",s.textContent="Log In",s.addEventListener("click",()=>e("login"));const a=document.createElement("button");return a.type="button",a.className="btn btn--primary",a.textContent="Sign Up",a.addEventListener("click",()=>e("register")),r.append(s,a),r}function Ka(t,{onAuthRequest:e,onLogout:n}){const r=document.createElement("div");if(r.className="header__cta",t)return r.append(Jr(n)),r;const s=document.createElement("button");return s.type="button",s.className="btn btn--primary",s.textContent="Sign Up",s.addEventListener("click",()=>e("register")),r.append(s),r}function za(t,e){const n=document.createElement("nav");return n.className="header__nav",n.setAttribute("aria-label","Main navigation"),n.append(Va(),ja(t,e)),n}function qa(t,e,n){const r=document.createElement("div");return r.className="header__mobile-controls",r.append(Ka(e,n),t),r}function Ja(){const t=document.createElement("button");t.type="button",t.className="header__burger",t.setAttribute("aria-label","Open menu"),t.setAttribute("aria-expanded","false");for(let e=0;e<3;e+=1){const n=document.createElement("span");n.className="header__burger-line",t.append(n)}return t}function Ut(t){const e=oe(),n=document.createElement("header");n.className="header";const r=document.createElement("div");r.className="header__inner";const s=Ja(),a=Aa(Gr,i=>{s.setAttribute("aria-expanded",String(i)),s.setAttribute("aria-label",i?"Close menu":"Open menu")},{session:e,...t});return s.addEventListener("click",()=>{a.toggle()}),r.append(Ga(),za(e,t),qa(s,e,t)),n.append(r,a.element),n}function Ya(){const t=document.createElement("button");return t.type="button",t.className="btn btn--primary btn--lg hero__cta",t.textContent="Browse Library",t.addEventListener("click",()=>{Xe("/library"),window.scrollTo({top:0})}),t}function Xa(){const t=document.createElement("section");t.className="hero",t.setAttribute("aria-label","Welcome");const e=document.createElement("div");e.className="hero__inner";const n=document.createElement("div");n.className="hero__card";const r=document.createElement("h1");r.className="hero__title",r.textContent="Take a Short Break & Have Fun";const s=document.createElement("p");s.className="hero__subtitle",s.textContent="Discover hundreds of curated casual mini-games. Play instantly in your browser — puzzle, match 3, farm, and board classics.";const a=document.createElement("div");return a.className="hero__actions",a.append(Ya()),n.append(r,s,a),e.append(n),t.append(e),t}const Za="You are already logged in.";function Yr(){return ve()?(C(Za,{variant:"info"}),!0):!1}function dn(t){Yr()||J({auth:t},{dialog:!0})}function Xr(t){J({game:t},{dialog:!0})}function un(t){const e=document.createElement("div");e.className=`state-banner state-banner--${t.modifier}`,e.setAttribute("role",t.modifier==="error"?"alert":"status");const n=document.createElement("span");n.className="material-symbols-outlined state-banner__icon",n.translate=!1,n.setAttribute("aria-hidden","true"),n.textContent=t.icon;const r=document.createElement("p");r.className="state-banner__title",r.textContent=t.title;const s=document.createElement("p");if(s.className="state-banner__message",s.textContent=t.message,e.append(n,r,s),t.action){const{label:a,onClick:i}=t.action,c=document.createElement("button");c.type="button",c.className="btn btn--primary state-banner__action",c.textContent=a,c.addEventListener("click",i),e.append(c)}return e}function Ze(t,e){return un({title:"Something went wrong",message:t,icon:"cloud_off",modifier:"error",action:{label:"Try again",onClick:e}})}function St(t,e,n){return un({title:t,message:e,icon:"inbox",modifier:"empty",action:n})}function Zr(t,e,n){return un({title:t,message:e,icon:"search_off",modifier:"not-found",action:n})}function M(t,e="div"){const n=document.createElement(e);return n.className=`skeleton ${t}`,n.setAttribute("aria-hidden","true"),n}function Qr(t,...e){const n=document.createElement("div");return n.className="loading-region",n.setAttribute("role","status"),n.setAttribute("aria-busy","true"),n.setAttribute("aria-label",t),n.append(...e),n}const Qa="https://faxb76kxra.execute-api.eu-central-1.amazonaws.com/api";class Y extends Error{constructor(n,r){super(n);Rn(this,"status");this.name="ApiError",this.status=r}get isNotFound(){return this.status===404}get isClientError(){return this.status>=400&&this.status<500}get isUnknownOutcome(){return this.status===0||this.status>=500}}function ge(t){return t instanceof DOMException&&t.name==="AbortError"}const hn=15e3;function xn(t){return typeof t=="object"&&t!==null}async function ei(t){const e=`Request failed with status ${t.status}`;try{const n=await t.json();if(xn(n)){const r=xn(n.error)?n.error:n;if(typeof r.message=="string"&&r.message)return r.message}}catch{}return e}async function ee(t,e={}){const{method:n="GET",body:r,signal:s,timeoutMs:a}=e,i={Accept:"application/json"},c=new AbortController,o=()=>c.abort();let l=!1;s!=null&&s.aborted&&c.abort(),s==null||s.addEventListener("abort",o,{once:!0});const d=a===void 0?void 0:window.setTimeout(()=>{l=!0,c.abort()},a);r!==void 0&&(i["Content-Type"]="application/json");let h;try{h=await fetch(`${Qa}${t}`,{method:n,headers:i,body:r===void 0?void 0:JSON.stringify(r),signal:c.signal})}catch(u){throw l?new Y("The server did not respond in time.",0):ge(u)?u:new Y("Network error. Check your connection and try again.",0)}finally{window.clearTimeout(d),s==null||s.removeEventListener("abort",o)}if(!h.ok)throw new Y(await ei(h),h.status);return await h.json()}function es(t,e){return e&&t.set("userEmail",e),t}function ti(t){const e=t.toString();return e?`?${e}`:""}function ni(t){return ee("/games?featured=true",{signal:t})}function ri(t,e){const n=new URLSearchParams({category:t.category,sort:t.sort,page:String(t.page),limit:String(t.limit)});return ee(`/games?${n.toString()}`,{signal:e})}async function si(t){return(await ee("/categories",{signal:t})).data}async function ai(t){return(await ee("/leaderboard",{signal:t})).data}async function Un(t,e,n){const r=ti(es(new URLSearchParams,n));return(await ee(`/games/${encodeURIComponent(t)}${r}`,{signal:e})).data}function ii(t,e,n){const r=es(new URLSearchParams({limit:"3",sort:"newest"}),n);return ee(`/games/${encodeURIComponent(t)}/comments?${r.toString()}`,{signal:e})}async function oi(t,e){return(await ee(`/games/${encodeURIComponent(t)}/favorite`,{method:"POST",body:{userEmail:e},timeoutMs:hn})).data}async function ci(t,e){return(await ee(`/games/${encodeURIComponent(t)}/comments`,{method:"POST",body:e,timeoutMs:hn})).data}async function li(t,e){return(await ee(`/comments/${encodeURIComponent(t)}/like`,{method:"POST",body:{userEmail:e},timeoutMs:hn})).data}function Nt(t){return t>=1e6?`${Fn((t/1e6).toFixed(1))}M`:t>=1e3?`${Fn((t/1e3).toFixed(1))}K`:String(t)}function Fn(t){return t.endsWith(".0")?t.slice(0,-2):t}function ts(t){return t.toLocaleString("en-US")}const Yt=60,Xt=60*Yt,Ke=24*Xt,Ft=7*Ke,di=30*Ke,Bn=365*Ke;function Ue(t,e){return`${t} ${e}${t===1?"":"s"} ago`}function ui(t,e=Date.now()){const n=Date.parse(t);if(Number.isNaN(n))return"";const r=Math.max(0,Math.floor((e-n)/1e3));return r<Yt?"just now":r<Xt?`${Math.floor(r/Yt)} min ago`:r<Ke?Ue(Math.floor(r/Xt),"hour"):r<Ft?Ue(Math.floor(r/Ke),"day"):r<4*Ft?Ue(Math.floor(r/Ft),"week"):r<Bn?Ue(Math.min(Math.max(Math.floor(r/di),1),11),"month"):Ue(Math.floor(r/Bn),"year")}function hi(t){return t&&`${t.charAt(0).toUpperCase()}${t.slice(1)}`}function pt(t){return`/MiniGames-Story-1/${t.replace(/^\/+/,"")}`}function mi(t){return`/assets/images/games/${t}-card.jpg`}function fi(t){return t.replace(/-card(\.\w+)$/,"-card-peek$1")}function pi(t,e,n){let r=0;const s=()=>{const a=e[r];if(r+=1,a===void 0){t.removeEventListener("error",s),n();return}t.src=a};t.addEventListener("error",s),s()}function gi(t){const e=pt(t.cardImage);return{slug:t.slug,title:t.name,imageUrl:e,peekImageUrl:fi(e),rating:t.rating.toFixed(1),likes:Nt(t.likesCount)}}const _i=5,bi=[218,56],Hn=8,$n=40,vi=288,Wn=4e3,yi=[{query:"(min-width: 1440px)",widths:[816,288,120]},{query:"(min-width: 768px)",widths:[448,105]}];function Ei(){for(const{query:t,widths:e}of yi)if(window.matchMedia(t).matches)return e;return bi}function Gn(t,e){const n=document.createElement("span");return n.className=`material-symbols-outlined new-games__icon ${e}`,n.translate=!1,n.setAttribute("aria-hidden","true"),n.textContent=t,n}function wi(t,e){const n=document.createElement("li");n.className="new-games__card",n.setAttribute("role","button"),n.tabIndex=0,n.setAttribute("aria-label",`View details for ${t.title}`),n.addEventListener("click",()=>e(t.slug)),n.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),e(t.slug))});const r=document.createElement("div");r.className="new-games__image-clip";const s=document.createElement("img");s.className="new-games__card-image",s.src=t.imageUrl,s.alt=t.title,s.loading="lazy",s.dataset.fullSrc=t.imageUrl,s.dataset.peekSrc=t.peekImageUrl,s.addEventListener("error",()=>{if(s.dataset.peekSrc!==t.imageUrl&&s.src.endsWith(t.peekImageUrl)){s.dataset.peekSrc=t.imageUrl,s.src=t.imageUrl;return}const u=document.createElement("div");u.className="new-games__card-image new-games__card-image--placeholder",u.setAttribute("role","img"),u.setAttribute("aria-label",t.title),s.replaceWith(u)}),r.append(s);const a=document.createElement("div");a.className="new-games__overlay";const i=document.createElement("h3");i.className="new-games__card-title",i.textContent=t.title;const c=document.createElement("div");c.className="new-games__card-meta";const o=document.createElement("div");o.className="new-games__card-rating";const l=document.createElement("span");l.className="new-games__card-value",l.textContent=t.rating,o.append(Gn("star","new-games__icon--star"),l);const d=document.createElement("div");d.className="new-games__card-likes";const h=document.createElement("span");return h.className="new-games__card-value",h.textContent=t.likes,d.append(Gn("favorite","new-games__icon--like"),h),c.append(o,d),a.append(i,c),n.append(r,a),n}function Ai(){const t=document.createElement("li");return t.className="new-games__card new-games__card--skeleton",t.setAttribute("aria-hidden","true"),t.append(M("new-games__skeleton")),t}function Vn(t){const e=document.createElement("button");e.type="button",e.className=`new-games__arrow new-games__arrow--${t}`,e.setAttribute("aria-label",t==="prev"?"Previous game":"Next game");const n=document.createElement("span");return n.className="material-symbols-outlined new-games__arrow-icon",n.translate=!1,n.setAttribute("aria-hidden","true"),n.textContent=t==="prev"?"arrow_back":"arrow_forward",e.append(n),e}function Ii(){const t=document.createElement("section");t.className="new-games",t.setAttribute("aria-label","New games");const e=document.createElement("div");e.className="new-games__header";const n=document.createElement("div");n.className="new-games__title-group";const r=document.createElement("span");r.className="new-games__accent",r.setAttribute("aria-hidden","true");const s=document.createElement("h2");s.className="new-games__title",s.textContent="New Games",n.append(r,s);const a=document.createElement("div");a.className="new-games__arrows";const i=Vn("prev"),c=Vn("next");a.append(i,c),e.append(n,a);const o=document.createElement("div");o.className="new-games__track";const l=document.createElement("ul");l.className="new-games__rail";let d=0;function h(k){Math.abs(d)>$n||Xr(k)}let u=[];o.append(l);const m=document.createElement("div");m.className="new-games__status",m.hidden=!0,t.append(e,m,o);let f=0;function p(){const k=Ei();let Le=0,me=0;for(const[De]of u.entries()){const j=Math.abs(De-f);j<k.length&&(Le+=1,me+=k[j]??0)}const Oe=Math.max(Le-1,0)*Hn,ea=Math.max(o.clientWidth-Oe,0),ta=me>0&&o.clientWidth>0?ea/me:1;let it=0,kn=0;for(const[De,j]of u.entries()){const Me=Math.abs(De-f),ot=Me<k.length?(k[Me]??0)*ta:0;j.style.width=`${ot}px`,j.classList.toggle("new-games__card--collapsed",Me>=k.length),j.classList.toggle("new-games__card--active",Me===0);const Pn=Me>=k.length-1;j.classList.toggle("new-games__card--peek",Pn),j.classList.toggle("new-games__card--no-info",ot<vi);const xe=j.querySelector("img.new-games__card-image");if(xe){const Dt=Pn?xe.dataset.peekSrc:xe.dataset.fullSrc;Dt&&xe.getAttribute("src")!==Dt&&(xe.src=Dt)}De>0&&(it+=Hn),De===f&&(kn=it+ot/2),it+=ot}const na=it,ra=o.clientWidth/2-kn,sa=Math.min(o.clientWidth-na,0),aa=Math.max(sa,Math.min(0,ra));l.style.transform=`translateX(${aa}px)`}function g(){u.length!==0&&(f=(f+1)%u.length,p())}function E(){u.length!==0&&(f=(f-1+u.length)%u.length,p())}let A,T=0,_,b=!1;function I(){A!==void 0&&(clearTimeout(A),A=void 0)}function v(k=Wn){I(),_=void 0,!(!b||u.length<2)&&(T=Date.now()+k,A=setTimeout(()=>{if(!t.isConnected){I();return}g(),v()},k))}function N(){A!==void 0&&(_=Math.max(0,T-Date.now()),I())}i.addEventListener("click",()=>{E(),v()}),c.addEventListener("click",()=>{g(),v()});let O=!1,V=0;o.addEventListener("pointerdown",k=>{O=!0,V=k.clientX,d=0,N()}),o.addEventListener("pointermove",k=>{O&&(d=k.clientX-V)});function $(){if(O){if(O=!1,Math.abs(d)>$n){d<0?g():E(),v();return}v(_??Wn)}}o.addEventListener("pointerup",$),o.addEventListener("pointercancel",$),o.addEventListener("pointerleave",$),new ResizeObserver(()=>{p()}).observe(o);function w(k){u=k,f=0,l.replaceChildren(...u),p()}function P(k){i.disabled=!k,c.disabled=!k}function R(){b=!1,I(),P(!1),m.hidden=!0,m.replaceChildren(),o.hidden=!1,o.setAttribute("aria-busy","true"),w(Array.from({length:_i},()=>Ai()))}function D(k){b=!1,I(),P(!1),o.removeAttribute("aria-busy"),o.hidden=!0,w([]),m.replaceChildren(k),m.hidden=!1}let Re,Ot=!1;async function Tn(){Re==null||Re.abort(),Re=new AbortController;const{signal:k}=Re;R();try{const me=(await ni(k)).data.map(Oe=>gi(Oe));if(me.length===0){D(St("No new games yet","Featured games will appear here soon."));return}o.removeAttribute("aria-busy"),b=!0,w(me.map(Oe=>wi(Oe,h))),P(me.length>1),v(),Ot&&C("New games loaded successfully.",{variant:"success"}),Ot=!1}catch(Le){if(ge(Le))return;Ot=!0,D(Ze("We couldn't load new games. Please try again.",()=>{Tn()})),C("Failed to load new games.",{variant:"error"})}}return Tn(),t}const jn=["primary","mint","sky","pink","lavender"],Ci=5;function Si(t){const e=t.match(/[A-Z]/g)??[];return e.length>=2?e.slice(0,2).join(""):(t.replaceAll(/[^a-z]/gi,"").slice(0,2)||t.slice(0,2)).toUpperCase()}function Ni(t,e){return{rank:t.rank,initials:Si(t.playerName),avatarColor:jn[e%jn.length]??"primary",name:t.playerName,gamesPlayed:t.gamesPlayed,totalScore:ts(t.totalScore),streakDays:t.streakDays,favoriteGame:t.favoriteGameName}}const ns=[{label:"Rank",align:"left"},{label:"Player",align:"left"},{label:"Games Played",align:"center"},{label:"Total Score",align:"center"},{label:"Streak",align:"center"},{label:"Favorite Game",align:"center"}];function Ti(){const t=document.createElement("tr");for(const e of ns){const n=document.createElement("th");n.scope="col",n.className=`leaderboard__heading leaderboard__heading--${e.align}`,n.textContent=e.label,t.append(n)}return t}function ki(t){const e=document.createElement("tr");e.className="leaderboard__row";const n=document.createElement("td");n.className="leaderboard__cell leaderboard__cell--left";const r=document.createElement("span");r.className="leaderboard__rank",r.classList.toggle("leaderboard__rank--top",t.rank===1),r.textContent=`#${t.rank}`,n.append(r);const s=document.createElement("td");s.className="leaderboard__cell leaderboard__cell--left";const a=document.createElement("span");a.className=`leaderboard__avatar leaderboard__avatar--${t.avatarColor}`,a.textContent=t.initials,a.setAttribute("aria-hidden","true");const i=document.createElement("span");i.className="leaderboard__name",i.textContent=t.name,s.append(a,i);const c=document.createElement("td");c.className="leaderboard__cell leaderboard__cell--center",c.textContent=String(t.gamesPlayed);const o=document.createElement("td");o.className="leaderboard__cell leaderboard__cell--center",o.textContent=t.totalScore;const l=document.createElement("td");l.className="leaderboard__cell leaderboard__cell--center";const d=document.createElement("span");d.className="leaderboard__streak";const h=document.createElement("span");h.className="leaderboard__streak-icon",h.setAttribute("aria-hidden","true"),h.textContent="🔥";const u=document.createElement("span");u.textContent=`${t.streakDays} days`,d.append(h,u),l.append(d);const m=document.createElement("td");m.className="leaderboard__cell leaderboard__cell--center";const f=document.createElement("span");return f.className="leaderboard__badge",f.textContent=t.favoriteGame,m.append(f),e.append(n,s,c,o,l,m),e}function Pi(){const t=document.createElement("tr");t.className="leaderboard__row leaderboard__row--skeleton",t.setAttribute("aria-hidden","true");for(const e of ns){const n=document.createElement("td");n.className=`leaderboard__cell leaderboard__cell--${e.align}`,n.append(M("leaderboard__skeleton")),t.append(n)}return t}function Ri(){const t=document.createElement("section");t.className="leaderboard",t.setAttribute("aria-label","Leaderboard");const e=document.createElement("div");e.className="leaderboard__header";const n=document.createElement("span");n.className="leaderboard__accent",n.setAttribute("aria-hidden","true");const r=document.createElement("h2");r.className="leaderboard__title",r.textContent="Top Players This Week",e.append(n,r);const s=document.createElement("div");s.className="leaderboard__table-wrapper";const a=document.createElement("table");a.className="leaderboard__table";const i=document.createElement("thead");i.append(Ti());const c=document.createElement("tbody");a.append(i,c),s.append(a);const o=document.createElement("div");o.className="leaderboard__status",o.hidden=!0,t.append(e,o,s);function l(m){s.hidden=!0,a.removeAttribute("aria-busy"),o.replaceChildren(m),o.hidden=!1}let d,h=!1;async function u(){d==null||d.abort(),d=new AbortController;const{signal:m}=d;o.hidden=!0,o.replaceChildren(),s.hidden=!1,a.setAttribute("aria-busy","true"),c.replaceChildren(...Array.from({length:Ci},()=>Pi()));try{const f=await ai(m);if(f.length===0){l(St("No players yet","Play a few games to appear on the leaderboard."));return}a.removeAttribute("aria-busy"),c.replaceChildren(...f.map((p,g)=>ki(Ni(p,g)))),h&&C("Leaderboard loaded successfully.",{variant:"success"}),h=!1}catch(f){if(ge(f))return;h=!0,l(Ze("We couldn't load the leaderboard. Please try again.",()=>{u()})),C("Failed to load the leaderboard.",{variant:"error"})}}return u(),t}const Li="/MiniGames-Story-1/assets/game-developer-desk-DWiLMqCH.png";function Oi(){const t=document.createElement("span");return t.className="material-symbols-outlined game-developer__cta-icon",t.translate=!1,t.setAttribute("aria-hidden","true"),t.textContent="upload",t}function Di(){const t=document.createElement("section");t.className="game-developer",t.setAttribute("aria-label","Game developer invitation");const e=document.createElement("img");e.className="game-developer__image",e.src=Li,e.alt="",e.setAttribute("aria-hidden","true"),e.loading="lazy";const n=document.createElement("div");n.className="game-developer__card";const r=document.createElement("h2");r.className="game-developer__title",r.textContent="Are You a Game Developer?";const s=document.createElement("p");s.className="game-developer__text",s.textContent="Want to see your game on MiniGames? We're always looking for fun, engaging mini games to add to our platform. Submit your game and reach thousands of players!";const a=document.createElement("button");a.type="button",a.className="btn btn--primary btn--lg game-developer__cta",a.append(Oi(),document.createTextNode("Submit Form"));const i=document.createElement("p");return i.className="game-developer__contact",i.textContent="or contact us at developers@minigames.com",n.append(r,s,a,i),t.append(e,n),t}const Mi="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAABCNJREFUeAG1V91rXEUU/83szeazNj5YTRVJQWoEg1YqKD6of4KKL2KxD4qPPuiLltpabKlatUIefFFEQQT7KAhFSAVfRKFSQQShXbWUZrMJCdm0m9175/TM1/3YvR9J0x52mLkzc875na+ZHcAREU1yO6KI5rnRbWrnQ6KDSJFwyqcJmOfhNMqIPMe2qcFinhVCNIw4RnapUvmtR6SV76uRdcnBm5Mryhn8dP7yJE9vCB0X/ngUt4y25JVzGgBtT8b2MMjcWVEhnTGTUuh2Q9PrJtKsWwAvsSUi81OK8MHps9j/9EnMPnEcn8z9pBM5DvdWKD8EfjEWmPKpViQE9swexq5dO3mW0Gyu4eKfx7JQDUt1LEo9QBko2WGnG9k9/N3rRYM8pbGgzQHwm3u9EKFWYtxshX564gV4BB+ffD7ZrXOD96soyYvBuCTASkNgmQkX/rqMA699g4iFs1yjZGJiGEGtZmSFoUK73UEgJfjH8xJfff4yHpm9vzIngirlmu69507U6wFqtRyHkVU4uXMsmWKUU1OTsa2UsptSfHqiPATOU2NjdWNlpr6LeqZeFOGOidFYT1pnv+xyAI5jZDiwNS98dts1kTbJR5Lnuhuh8ZjZg/I6CNKAKFaqjDwpLT5ddpGiRJDKyStfdowy5L1SJmqV+87LB5nmt9p0nUu8+fYZ7H3sKO6bOYSvv/sVE+PDzgNkeo2GPPI+C3aMj+DbM79h94Pv4IF9R/DWoe8NiDzKVoEbdrnkHn/mFEZHAqNM5PGKxGg9ZkFQukdiqYQGKzgkEX45+wbGR0cs+BQFGR+6oJIWpnTMa1ZgfKWm71fbKQeQZAqM26EMC7FBG2xMPTcZZMYk19frNbx64Ek0F9Zx+f8lzH34ojmMtALhDiPh8Eple0HJUa2T8PSJ53D1ygoWFtt4/ZWnjNy8g7nwINKHjU9CTXv3H+Nat6VllPHSUusaJ2eEu+/aYYSTuSeA1dXr+Pv3d2NepW9LmVOvKClDwcpNwhGZBBoyh5CznIcPz+zGP+cP49KF9/DQzFRGrD4RtVJjiJNVVJCDAHL80dnoYWgoMO7XMpoLbXwx95IpT01f8ri1vB6fCwGHsNMJE4HWPcijQQA5ibKyeg31wGcbIRjqY2HNxmIX5HpQQ3u9k5VZcBrJEr2uKoB//1vG4lKbLV9Ds7XGNx3h+Ec/WPsY0PunfuRkgllb5P8GreU2LjZaiRwq1LCJ27AAILlw+NX+deX+uFSRzKIsIB/GuFHsHX+ymIRN7ckop2IdGsA5WCOKSRSggj8mU4DK+Ae3/CGZ9edc2aXks4pQfd8VE6fNZ8I8SgH9OJmuYkjfvv3z6FsTJd9u3JBC7OEmVvRDkecaqCDa5Foe0L4/Jg2ns28TvxP1U+02Ps/nI6Kj2ute5w08AKp+H2eCQgAAAABJRU5ErkJggg==",xi=[{label:"Home",href:"#",route:"/"},{label:"Library",href:"#",route:"/library"},{label:"Categories",href:"#"},{label:"Tournaments",href:"#"}],Ui=[{label:"About Us",href:"#"},{label:"Contact",href:"#"},{label:"Privacy Policy",href:"#"},{label:"Terms of Service",href:"#"}],Fi=[{title:"Explore",links:xi},{title:"Company",links:Ui}],Bi=["share","chat","rss_feed"];function Hi(t){const e=document.createElement("div");e.className="footer__column";const n=document.createElement("h3");n.className="footer__column-title",n.textContent=t.title,e.append(n);for(const r of t.links){const s=document.createElement("a");s.className="footer__link",s.href=r.route?Ye(r.route):r.href,r.route&&(s.dataset.route=r.route),s.textContent=r.label,e.append(s)}return e}function $i(t){const e=document.createElement("a");e.className="footer__social-link",e.href="#",e.setAttribute("aria-label",t);const n=document.createElement("span");return n.className="material-symbols-outlined",n.translate=!1,n.setAttribute("aria-hidden","true"),n.textContent=t,e.append(n),e}function Wi(){const t=document.createElement("div");t.className="footer__community";const e=document.createElement("h3");e.className="footer__column-title",e.textContent="Community";const n=document.createElement("div");return n.className="footer__social",n.append(...Bi.map(r=>$i(r))),t.append(e,n),t}function Gi(){const t=document.createElement("div");t.className="footer__brand";const e=document.createElement("div");e.className="footer__logo";const n=document.createElement("img");n.className="footer__logo-icon",n.src=Mi,n.alt="",n.setAttribute("aria-hidden","true"),e.append(n,document.createTextNode("MiniGames"));const r=document.createElement("p");return r.className="footer__text",r.textContent="Take a short break and have fun. Hundreds of curated casual mini-games right in your web browser. No download required.",t.append(e,r),t}function Vi(){const t=document.createElement("div");t.className="footer__bottom";const e=document.createElement("span");e.className="footer__bottom-item",e.textContent=`© ${new Date().getFullYear()} MiniGames. All rights reserved.`;const n=document.createElement("a");n.className="footer__bottom-item footer__link",n.href="https://rs.school/";const r=document.createElement("span");r.className="footer__bottom-icon",r.setAttribute("aria-hidden","true"),r.textContent="RS",n.append(r,document.createTextNode("RS School"));const s=document.createElement("a");s.className="footer__bottom-item footer__link",s.href="https://github.com/KatyMist";const a=document.createElement("span");a.className="material-symbols-outlined footer__nickname-icon",a.translate=!1,a.setAttribute("aria-hidden","true"),a.textContent="code",s.append(a,document.createTextNode("@KatyMist"));const i=document.createElement("span");return i.className="footer__bottom-item",i.textContent="Designed with love",t.append(e,n,s,i),t}function ji(){const t=document.createElement("footer");t.className="footer";const e=document.createElement("div");e.className="footer__top";const n=document.createElement("div");return n.className="footer__columns",n.append(...Fi.map(r=>Hi(r)),Wi()),e.append(Gi(),n),t.append(e,Vi()),t}function Ki(){const t=document.createElement("section");t.className="library-header";const e=document.createElement("h1");e.className="library-header__title",e.textContent="Game Library";const n=document.createElement("p");return n.className="library-header__subtitle",n.textContent="Browse our collection of casual mini-games",t.append(e,n),t}const zi=7,Bt=[{value:"rating-desc",label:"Rating (High to Low)"},{value:"rating-asc",label:"Rating (Low to High)"},{value:"name-asc",label:"Name (A to Z)"},{value:"name-desc",label:"Name (Z to A)"}];function qi(t,e){const n=document.createElement("button");return n.type="button",n.className="library-filters__chip",n.dataset.category=t.slug,n.setAttribute("aria-pressed","false"),n.textContent=t.label,n.addEventListener("click",e),n}function Ji(t){let e="",n="rating-desc";const r=document.createElement("div");r.className="library-filters";const s=document.createElement("div");s.className="library-filters__categories",s.setAttribute("role","group"),s.setAttribute("aria-label","Game categories");function a(){for(const _ of s.querySelectorAll(".library-filters__chip")){const b=_.dataset.category===e;_.classList.toggle("library-filters__chip--active",b),_.setAttribute("aria-pressed",String(b))}}function i(){s.setAttribute("aria-busy","true"),s.replaceChildren(...Array.from({length:zi},()=>M("library-filters__chip-skeleton")))}function c(){s.removeAttribute("aria-busy");const _=document.createElement("p");_.className="library-filters__error",_.textContent="Couldn't load categories.";const b=document.createElement("button");b.type="button",b.className="library-filters__chip",b.textContent="Try again",b.addEventListener("click",t.onRetryCategories),s.replaceChildren(_,b)}function o(_){s.removeAttribute("aria-busy"),s.replaceChildren(..._.map(b=>qi(b,()=>{b.slug!==e&&t.onCategoryChange(b.slug)}))),a()}function l(_){e=_,a()}const d=document.createElement("div");d.className="library-filters__sort-wrap";const h=document.createElement("button");h.type="button",h.className="library-filters__sort",h.id="library-sort-button",h.setAttribute("aria-haspopup","listbox"),h.setAttribute("aria-expanded","false"),h.setAttribute("aria-controls","library-sort-menu");const u=document.createElement("span"),m=document.createElement("span");m.className="material-symbols-outlined library-filters__sort-icon",m.translate=!1,m.setAttribute("aria-hidden","true");const f=document.createElement("ul");f.className="library-filters__sort-menu",f.id="library-sort-menu",f.setAttribute("role","listbox"),f.setAttribute("aria-labelledby",h.id),f.hidden=!0;const p=Bt.map(_=>{const b=document.createElement("li");return b.className="library-filters__sort-option",b.setAttribute("role","option"),b.tabIndex=-1,b.dataset.sort=_.value,b.textContent=_.label,b.addEventListener("click",()=>A(_.value)),b.addEventListener("keydown",I=>{(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),A(_.value))}),f.append(b),b});function g(){const _=Bt.find(b=>b.value===n)??Bt[0];u.textContent=`Sort by: ${(_==null?void 0:_.label)??""}`,m.textContent=n.endsWith("asc")?"arrow_upward":"arrow_downward";for(const b of p){const I=b.dataset.sort===n;b.setAttribute("aria-selected",String(I)),b.classList.toggle("library-filters__sort-option--active",I)}}function E(_){if(f.hidden=!_,h.setAttribute("aria-expanded",String(_)),_){const b=p.find(I=>I.dataset.sort===n)??p[0];b==null||b.focus()}}function A(_){E(!1),h.focus(),_!==n&&t.onSortChange(_)}function T(_){n=_,g()}return g(),h.append(u,m),h.addEventListener("click",()=>E(f.hidden)),f.addEventListener("keydown",_=>{var I;const b=p.indexOf(document.activeElement);if(_.key==="ArrowDown"||_.key==="ArrowUp"){_.preventDefault();const v=_.key==="ArrowDown"?1:-1;(I=p[(b+v+p.length)%p.length])==null||I.focus()}else _.key==="Escape"&&(_.stopPropagation(),E(!1),h.focus())}),document.addEventListener("click",_=>{!f.hidden&&_.target instanceof Node&&!d.contains(_.target)&&E(!1)}),d.append(h,f),r.append(s,d),{element:r,showCategoriesLoading:i,showCategoriesError:c,setCategories:o,setActiveCategory:l,setSort:T}}function Yi(t,e){return{slug:t.slug,title:t.name,imageUrl:pt(t.cardImage),categoryLabel:e,price:t.price,rating:t.rating,likes:Nt(t.likesCount),description:t.shortDescription}}function Kn(t,e,n){const r=document.createElement("div");r.className=`library-results__stat ${e}`;const s=document.createElement("span");s.className="material-symbols-outlined library-results__stat-icon",s.translate=!1,s.setAttribute("aria-hidden","true"),s.textContent=t;const a=document.createElement("span");return a.className="library-results__stat-value",a.textContent=n,r.append(s,a),r}function Xi(t,e){const n=document.createElement("button");return n.type="button",n.className="library-results__details",n.textContent="Details",n.setAttribute("aria-label",`Details for ${t}`),n.addEventListener("click",e),n}function Zi(t){const e=document.createElement("div");e.className="library-results__image library-results__image--placeholder",e.setAttribute("role","img"),e.setAttribute("aria-label",t.title);const n=document.createElement("span");return n.className="library-results__image-title",n.textContent=t.title,e.append(n),e}function Qi(t){const e=document.createElement("img");return e.className="library-results__image",e.alt=t.title,e.loading="lazy",e.addEventListener("error",()=>e.replaceWith(Zi(t)),{once:!0}),e.src=t.imageUrl,e}function eo(t,e){const n=document.createElement("li");n.className="library-results__card";const r=document.createElement("div");r.className="library-results__content";const s=document.createElement("div");s.className="library-results__top";const a=document.createElement("div");a.className="library-results__title-group";const i=document.createElement("h2");i.className="library-results__title",i.textContent=t.title;const c=document.createElement("span");c.className="library-results__badge",c.textContent=t.categoryLabel,a.append(i,c);const o=document.createElement("span");o.className="library-results__price",t.price==="Free"&&o.classList.add("library-results__price--free"),o.textContent=t.price,s.append(a,o);const l=document.createElement("p");l.className="library-results__description",l.textContent=t.description;const d=document.createElement("div");d.className="library-results__stats",d.append(Kn("star","library-results__stat--rating",t.rating.toFixed(1)),Kn("favorite","library-results__stat--likes",t.likes));const h=document.createElement("div");return h.className="library-results__bottom",h.append(d,Xi(t.title,()=>e(t.slug))),r.append(s,l,h),n.append(Qi(t),r),n}function to(){const t=document.createElement("li");t.className="library-results__card library-results__card--skeleton",t.setAttribute("aria-hidden","true");const e=document.createElement("div");return e.className="library-results__skeleton-content",e.append(M("library-results__skeleton-line library-results__skeleton-line--title"),M("library-results__skeleton-line"),M("library-results__skeleton-line library-results__skeleton-line--short"),M("library-results__skeleton-line library-results__skeleton-line--button")),t.append(M("library-results__image library-results__skeleton-image"),e),t}function Ht(t,e){const n=document.createElement("button");if(n.type="button",n.className="library-results__page",e){const r=document.createElement("span");r.className="material-symbols-outlined library-results__page-icon",r.translate=!1,r.setAttribute("aria-hidden","true"),r.textContent=e,n.append(r),n.setAttribute("aria-label",t)}else n.textContent=t,n.setAttribute("aria-label",`Page ${t}`);return n}const no=6,ro="(max-width: 767px)",so=4,ao=3;function io(t,e,n){const r=Math.min(n,e),s=t-Math.floor((r-1)/2),a=Math.min(Math.max(s,1),e-r+1);return Array.from({length:r},(i,c)=>a+c)}function oo(t){const e=document.createElement("section");e.className="library-results",e.setAttribute("aria-label","Game search results");const n=document.createElement("ul");n.className="library-results__grid";const r=document.createElement("div");r.className="library-results__status",r.hidden=!0;const s=document.createElement("nav");s.className="library-results__pagination",s.setAttribute("aria-label","Pagination");let a={page:1,totalPages:1},i=!1;const c=window.matchMedia(ro);function o(p=!1){i=p;const{page:g,totalPages:E}=a,A=Math.max(E,1),T=c.matches?ao:so,_=Ht("Previous page","arrow_back");_.classList.add("library-results__page--nav"),_.disabled=p||g<=1,_.addEventListener("click",()=>t.onPageChange(g-1));const b=[];for(const v of io(g,A,T)){const N=Ht(String(v));v===g&&(N.classList.add("library-results__page--active"),N.setAttribute("aria-current","page")),N.disabled=p,N.addEventListener("click",()=>{v!==g&&t.onPageChange(v)}),b.push(N)}const I=Ht("Next page","arrow_forward");I.classList.add("library-results__page--nav"),I.disabled=p||g>=A,I.addEventListener("click",()=>t.onPageChange(g+1)),s.replaceChildren(_,...b,I)}function l(p){e.removeAttribute("aria-busy"),n.hidden=!0,n.replaceChildren(),r.replaceChildren(p),r.hidden=!1}function d(p){a=p,e.setAttribute("aria-busy","true"),r.hidden=!0,r.replaceChildren(),n.hidden=!1,n.replaceChildren(...Array.from({length:no},()=>to())),s.hidden=!1,o(!0)}function h(p,g){a=g,e.removeAttribute("aria-busy"),r.hidden=!0,r.replaceChildren(),n.hidden=!1,n.replaceChildren(...p.map(E=>eo(E,t.onDetailsClick))),s.hidden=!1,o()}function u(p){l(St("Data Not Found","No games match the selected filters.",{label:"Reset filters",onClick:p})),a={page:1,totalPages:1},s.hidden=!1,o(!0)}function m(p,g){l(Ze(p,g)),s.hidden=!0}function f(p,g,E){l(Zr(p,g,{label:"Reset filters",onClick:E})),a={page:1,totalPages:1},s.hidden=!1,o(!0)}return c.addEventListener("change",()=>{e.isConnected&&o(i)}),e.append(n,r,s),{element:e,showLoading:d,showGames:h,showEmpty:u,showError:m,showNotFound:f}}const co=6,zn="all",qn="rating-desc",lo=["rating-desc","rating-asc","name-asc","name-desc"];function uo(t){return lo.includes(t)}function Jn(t){return["category","sort","page"].map(e=>t.get(e)??"").join("|")}function Yn(t){return t===null?1:/^[1-9]\d*$/.test(t)?Number(t):void 0}function Fe(){Xe("/library")}function ho(){const t=oo({onDetailsClick:Xr,onPageChange:p=>{J({page:p}),e.element.scrollIntoView({block:"start",behavior:"smooth"})}}),e=Ji({onCategoryChange:p=>J({category:p,page:1}),onSortChange:p=>J({sort:p,page:1}),onRetryCategories:()=>{a()}});let n=[],r=zn,s=!1;async function a(){var p;e.showCategoriesLoading();try{n=await si(),r=((p=n.find(g=>g.isDefault))==null?void 0:p.slug)??zn,e.setCategories(n),s&&C("Categories loaded successfully.",{variant:"success"}),s=!1}catch{s=!0,e.showCategoriesError(),C("Failed to load categories.",{variant:"error"})}}function i(p){var g;return((g=n.find(E=>E.slug===p))==null?void 0:g.label)??hi(p)}const c=a();let o,l=!1;async function d(p){o==null||o.abort(),o=new AbortController;const{signal:g}=o;t.showLoading({page:p.page,totalPages:1});try{const E=await ri(p,g),{meta:A}=E;E.data.length===0&&A.totalPages>0&&p.page>A.totalPages?t.showNotFound("Data Not Found",`Page ${p.page} doesn't exist. There are only ${A.totalPages} pages for these filters.`,Fe):E.data.length===0?t.showEmpty(Fe):t.showGames(E.data.map(T=>Yi(T,i(T.category))),{page:A.page,totalPages:A.totalPages}),l&&C("Games loaded successfully.",{variant:"success"}),l=!1}catch(E){if(ge(E))return;if(E instanceof Y&&E.isClientError){t.showNotFound("Data Not Found","There are no games for these filters. Check the link or reset the filters.",Fe),C("No data found for the requested filters.",{variant:"error"});return}l=!0,t.showError("We couldn't load games. Please try again.",()=>{d(p)}),C("Failed to load games.",{variant:"error"})}}async function h(p){const g=p.query.get("category"),E=p.query.get("sort")??qn;g||(t.showLoading({page:Yn(p.query.get("page"))??1,totalPages:1}),await c);const A=g??r;if(e.setActiveCategory(A),!uo(E)){e.setSort(qn),t.showNotFound("Data Not Found",`Sort option "${E}" doesn't exist. Reset the filters to see all games.`,Fe);return}e.setSort(E);const T=Yn(p.query.get("page"));if(T===void 0){t.showNotFound("Data Not Found",`Page "${p.query.get("page")??""}" doesn't exist. Reset the filters to see all games.`,Fe);return}await d({category:A,sort:E,page:T,limit:co})}const u=Ki();let m=Jn(Ce().query);const f=Wr(p=>{if(p.page!=="library"||!t.element.isConnected){f();return}const g=Jn(p.query);g!==m&&(m=g,h(p))});return h(Ce()),[u,e.element,t.element]}function mo(){const t=document.createElement("section");t.className="not-found",t.setAttribute("aria-labelledby","not-found-title");const e=document.createElement("p");e.className="not-found__code",e.setAttribute("aria-hidden","true"),e.textContent="404";const n=document.createElement("h1");n.className="not-found__title",n.id="not-found-title",n.textContent="Page Not Found";const r=document.createElement("p");r.className="not-found__message",r.textContent="Sorry, the page you requested doesn't exist. Check the URL or go back to the home page.";const s=document.createElement("p");s.className="not-found__path",s.textContent=window.location.pathname;const a=document.createElement("button");return a.type="button",a.className="btn btn--primary btn--lg not-found__action",a.textContent="Return to Home Page",a.addEventListener("click",()=>{Xe("/"),window.scrollTo({top:0})}),t.append(e,n,r,s,a),t}const fo=()=>{};var Xn={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},po=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const a=t[n++];e[r++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){const a=t[n++],i=t[n++],c=t[n++],o=((s&7)<<18|(a&63)<<12|(i&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(o>>10)),e[r++]=String.fromCharCode(56320+(o&1023))}else{const a=t[n++],i=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(a&63)<<6|i&63)}}return e.join("")},ss={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const a=t[s],i=s+1<t.length,c=i?t[s+1]:0,o=s+2<t.length,l=o?t[s+2]:0,d=a>>2,h=(a&3)<<4|c>>4;let u=(c&15)<<2|l>>6,m=l&63;o||(m=64,i||(u=64)),r.push(n[d],n[h],n[u],n[m])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(rs(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):po(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const a=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,a==null||c==null||l==null||h==null)throw new go;const u=a<<2|c>>4;if(r.push(u),l!==64){const m=c<<4&240|l>>2;if(r.push(m),h!==64){const f=l<<6&192|h;r.push(f)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class go extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const _o=function(t){const e=rs(t);return ss.encodeByteArray(e,!0)},as=function(t){return _o(t).replace(/\./g,"")},is=function(t){try{return ss.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bo(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo=()=>bo().__FIREBASE_DEFAULTS__,yo=()=>{if(typeof process>"u"||typeof Xn>"u")return;const t=Xn.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Eo=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&is(t[1]);return e&&JSON.parse(e)},mn=()=>{try{return fo()||vo()||yo()||Eo()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},wo=t=>{var e,n;return(n=(e=mn())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},os=()=>{var t;return(t=mn())===null||t===void 0?void 0:t.config},cs=t=>{var e;return(e=mn())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Io(t){return(await fetch(t,{credentials:"include"})).ok}const We={};function Co(){const t={prod:[],emulator:[]};for(const e of Object.keys(We))We[e]?t.emulator.push(e):t.prod.push(e);return t}function So(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Zn=!1;function No(t,e){if(typeof window>"u"||typeof document>"u"||!Tt(window.location.host)||We[t]===e||We[t]||Zn)return;We[t]=e;function n(u){return`__firebase__banner__${u}`}const r="__firebase__banner",a=Co().prod.length>0;function i(){const u=document.getElementById(r);u&&u.remove()}function c(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function o(u,m){u.setAttribute("width","24"),u.setAttribute("id",m),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function l(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{Zn=!0,i()},u}function d(u,m){u.setAttribute("id",m),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function h(){const u=So(r),m=n("text"),f=document.getElementById(m)||document.createElement("span"),p=n("learnmore"),g=document.getElementById(p)||document.createElement("a"),E=n("preprendIcon"),A=document.getElementById(E)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const T=u.element;c(T),d(g,p);const _=l();o(A,E),T.append(A,f,g,_),document.body.appendChild(T)}a?(f.innerText="Preview backend disconnected.",A.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(A.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,f.innerText="Preview backend running in this workspace."),f.setAttribute("id",m)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function To(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(x())}function ko(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Po(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ro(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Lo(){const t=x();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Oo(){try{return typeof indexedDB=="object"}catch{return!1}}function Do(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var a;e(((a=s.error)===null||a===void 0?void 0:a.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo="FirebaseError";class de extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Mo,Object.setPrototypeOf(this,de.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Qe.prototype.create)}}class Qe{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,a=this.errors[e],i=a?xo(a,r):"Error",c=`${this.serviceName}: ${i} (${s}).`;return new de(s,c,r)}}function xo(t,e){return t.replace(Uo,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Uo=/\{\$([^}]+)}/g;function Fo(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Se(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const a=t[s],i=e[s];if(Qn(a)&&Qn(i)){if(!Se(a,i))return!1}else if(a!==i)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Qn(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Be(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,a]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(a)}}),e}function He(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Bo(t,e){const n=new Ho(t,e);return n.subscribe.bind(n)}class Ho{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");$o(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=$t),s.error===void 0&&(s.error=$t),s.complete===void 0&&(s.complete=$t);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function $o(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function $t(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(t){return t&&t._delegate?t._delegate:t}class Ne{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Ao;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Vo(e))try{this.getOrInitializeService({instanceIdentifier:fe})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const a=this.getOrInitializeService({instanceIdentifier:s});r.resolve(a)}catch{}}}}clearInstance(e=fe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=fe){return this.instances.has(e)}getOptions(e=fe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[a,i]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(a);r===c&&i.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),a=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;a.add(e),this.onInitCallbacks.set(s,a);const i=this.instances.get(s);return i&&e(i,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Go(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=fe){return this.component?this.component.multipleInstances?e:fe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Go(t){return t===fe?void 0:t}function Vo(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Wo(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var S;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(S||(S={}));const Ko={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},zo=S.INFO,qo={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},Jo=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=qo[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ls{constructor(e){this.name=e,this._logLevel=zo,this._logHandler=Jo,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ko[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}}const Yo=(t,e)=>e.some(n=>t instanceof n);let er,tr;function Xo(){return er||(er=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Zo(){return tr||(tr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ds=new WeakMap,Zt=new WeakMap,us=new WeakMap,Wt=new WeakMap,fn=new WeakMap;function Qo(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",a),t.removeEventListener("error",i)},a=()=>{n(ce(t.result)),s()},i=()=>{r(t.error),s()};t.addEventListener("success",a),t.addEventListener("error",i)});return e.then(n=>{n instanceof IDBCursor&&ds.set(n,t)}).catch(()=>{}),fn.set(e,t),e}function ec(t){if(Zt.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",i),t.removeEventListener("abort",i)},a=()=>{n(),s()},i=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",a),t.addEventListener("error",i),t.addEventListener("abort",i)});Zt.set(t,e)}let Qt={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Zt.get(t);if(e==="objectStoreNames")return t.objectStoreNames||us.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ce(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function tc(t){Qt=t(Qt)}function nc(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Gt(this),e,...n);return us.set(r,e.sort?e.sort():[e]),ce(r)}:Zo().includes(t)?function(...e){return t.apply(Gt(this),e),ce(ds.get(this))}:function(...e){return ce(t.apply(Gt(this),e))}}function rc(t){return typeof t=="function"?nc(t):(t instanceof IDBTransaction&&ec(t),Yo(t,Xo())?new Proxy(t,Qt):t)}function ce(t){if(t instanceof IDBRequest)return Qo(t);if(Wt.has(t))return Wt.get(t);const e=rc(t);return e!==t&&(Wt.set(t,e),fn.set(e,t)),e}const Gt=t=>fn.get(t);function sc(t,e,{blocked:n,upgrade:r,blocking:s,terminated:a}={}){const i=indexedDB.open(t,e),c=ce(i);return r&&i.addEventListener("upgradeneeded",o=>{r(ce(i.result),o.oldVersion,o.newVersion,ce(i.transaction),o)}),n&&i.addEventListener("blocked",o=>n(o.oldVersion,o.newVersion,o)),c.then(o=>{a&&o.addEventListener("close",()=>a()),s&&o.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const ac=["get","getKey","getAll","getAllKeys","count"],ic=["put","add","delete","clear"],Vt=new Map;function nr(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Vt.get(e))return Vt.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=ic.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ac.includes(n)))return;const a=async function(i,...c){const o=this.transaction(i,s?"readwrite":"readonly");let l=o.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),s&&o.done]))[0]};return Vt.set(e,a),a}tc(t=>({...t,get:(e,n,r)=>nr(e,n)||t.get(e,n,r),has:(e,n)=>!!nr(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(cc(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function cc(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const en="@firebase/app",rr="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z=new ls("@firebase/app"),lc="@firebase/app-compat",dc="@firebase/analytics-compat",uc="@firebase/analytics",hc="@firebase/app-check-compat",mc="@firebase/app-check",fc="@firebase/auth",pc="@firebase/auth-compat",gc="@firebase/database",_c="@firebase/data-connect",bc="@firebase/database-compat",vc="@firebase/functions",yc="@firebase/functions-compat",Ec="@firebase/installations",wc="@firebase/installations-compat",Ac="@firebase/messaging",Ic="@firebase/messaging-compat",Cc="@firebase/performance",Sc="@firebase/performance-compat",Nc="@firebase/remote-config",Tc="@firebase/remote-config-compat",kc="@firebase/storage",Pc="@firebase/storage-compat",Rc="@firebase/firestore",Lc="@firebase/ai",Oc="@firebase/firestore-compat",Dc="firebase",Mc="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn="[DEFAULT]",xc={[en]:"fire-core",[lc]:"fire-core-compat",[uc]:"fire-analytics",[dc]:"fire-analytics-compat",[mc]:"fire-app-check",[hc]:"fire-app-check-compat",[fc]:"fire-auth",[pc]:"fire-auth-compat",[gc]:"fire-rtdb",[_c]:"fire-data-connect",[bc]:"fire-rtdb-compat",[vc]:"fire-fn",[yc]:"fire-fn-compat",[Ec]:"fire-iid",[wc]:"fire-iid-compat",[Ac]:"fire-fcm",[Ic]:"fire-fcm-compat",[Cc]:"fire-perf",[Sc]:"fire-perf-compat",[Nc]:"fire-rc",[Tc]:"fire-rc-compat",[kc]:"fire-gcs",[Pc]:"fire-gcs-compat",[Rc]:"fire-fst",[Oc]:"fire-fst-compat",[Lc]:"fire-vertex","fire-js":"fire-js",[Dc]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt=new Map,Uc=new Map,nn=new Map;function sr(t,e){try{t.container.addComponent(e)}catch(n){Z.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ze(t){const e=t.name;if(nn.has(e))return Z.debug(`There were multiple attempts to register component ${e}.`),!1;nn.set(e,t);for(const n of gt.values())sr(n,t);for(const n of Uc.values())sr(n,t);return!0}function hs(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function U(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},le=new Qe("app","Firebase",Fc);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ne("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw le.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt=Mc;function ms(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:tn,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw le.create("bad-app-name",{appName:String(s)});if(n||(n=os()),!n)throw le.create("no-options");const a=gt.get(s);if(a){if(Se(n,a.options)&&Se(r,a.config))return a;throw le.create("duplicate-app",{appName:s})}const i=new jo(s);for(const o of nn.values())i.addComponent(o);const c=new Bc(n,r,i);return gt.set(s,c),c}function Hc(t=tn){const e=gt.get(t);if(!e&&t===tn&&os())return ms();if(!e)throw le.create("no-app",{appName:t});return e}function Ee(t,e,n){var r;let s=(r=xc[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const a=s.match(/\s|\//),i=e.match(/\s|\//);if(a||i){const c=[`Unable to register library "${s}" with version "${e}":`];a&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&i&&c.push("and"),i&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Z.warn(c.join(" "));return}ze(new Ne(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c="firebase-heartbeat-database",Wc=1,qe="firebase-heartbeat-store";let jt=null;function fs(){return jt||(jt=sc($c,Wc,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(qe)}catch(n){console.warn(n)}}}}).catch(t=>{throw le.create("idb-open",{originalErrorMessage:t.message})})),jt}async function Gc(t){try{const n=(await fs()).transaction(qe),r=await n.objectStore(qe).get(ps(t));return await n.done,r}catch(e){if(e instanceof de)Z.warn(e.message);else{const n=le.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Z.warn(n.message)}}}async function ar(t,e){try{const r=(await fs()).transaction(qe,"readwrite");await r.objectStore(qe).put(e,ps(t)),await r.done}catch(n){if(n instanceof de)Z.warn(n.message);else{const r=le.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Z.warn(r.message)}}}function ps(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vc=1024,jc=30;class Kc{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new qc(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=ir();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(i=>i.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>jc){const i=Jc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Z.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ir(),{heartbeatsToSend:r,unsentEntries:s}=zc(this._heartbeatsCache.heartbeats),a=as(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return Z.warn(n),""}}}function ir(){return new Date().toISOString().substring(0,10)}function zc(t,e=Vc){const n=[];let r=t.slice();for(const s of t){const a=n.find(i=>i.agent===s.agent);if(a){if(a.dates.push(s.date),or(n)>e){a.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),or(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class qc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Oo()?Do().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Gc(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return ar(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return ar(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function or(t){return as(JSON.stringify({version:2,heartbeats:t})).length}function Jc(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yc(t){ze(new Ne("platform-logger",e=>new oc(e),"PRIVATE")),ze(new Ne("heartbeat",e=>new Kc(e),"PRIVATE")),Ee(en,rr,t),Ee(en,rr,"esm2017"),Ee("fire-js","")}Yc("");var Xc="firebase",Zc="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ee(Xc,Zc,"app");function pn(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function gs(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Qc=gs,_s=new Qe("auth","Firebase",gs());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t=new ls("@firebase/auth");function el(t,...e){_t.logLevel<=S.WARN&&_t.warn(`Auth (${tt}): ${t}`,...e)}function ut(t,...e){_t.logLevel<=S.ERROR&&_t.error(`Auth (${tt}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(t,...e){throw _n(t,...e)}function H(t,...e){return _n(t,...e)}function gn(t,e,n){const r=Object.assign(Object.assign({},Qc()),{[e]:n});return new Qe("auth","Firebase",r).create(e,{appName:t.name})}function X(t){return gn(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function tl(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&F(t,"argument-error"),gn(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function _n(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return _s.create(t,...e)}function y(t,e,...n){if(!t)throw _n(e,...n)}function z(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ut(e),new Error(e)}function Q(t,e){t||z(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function nl(){return cr()==="http:"||cr()==="https:"}function cr(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rl(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(nl()||Po()||"connection"in navigator)?navigator.onLine:!0}function sl(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,n){this.shortDelay=e,this.longDelay=n,Q(n>e,"Short delay should be less than long delay!"),this.isMobile=To()||Ro()}get(){return rl()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(t,e){Q(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;z("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;z("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;z("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ol=new nt(3e4,6e4);function ue(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ne(t,e,n,r,s={}){return vs(t,s,async()=>{let a={},i={};r&&(e==="GET"?i=r:a={body:JSON.stringify(r)});const c=et(Object.assign({key:t.config.apiKey},i)).slice(1),o=await t._getAdditionalHeaders();o["Content-Type"]="application/json",t.languageCode&&(o["X-Firebase-Locale"]=t.languageCode);const l=Object.assign({method:e,headers:o},a);return ko()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&Tt(t.emulatorConfig.host)&&(l.credentials="include"),bs.fetch()(await ys(t,t.config.apiHost,n,c),l)})}async function vs(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},al),e);try{const s=new ll(t),a=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const i=await a.json();if("needConfirmation"in i)throw ct(t,"account-exists-with-different-credential",i);if(a.ok&&!("errorMessage"in i))return i;{const c=a.ok?i.errorMessage:i.error.message,[o,l]=c.split(" : ");if(o==="FEDERATED_USER_ID_ALREADY_LINKED")throw ct(t,"credential-already-in-use",i);if(o==="EMAIL_EXISTS")throw ct(t,"email-already-in-use",i);if(o==="USER_DISABLED")throw ct(t,"user-disabled",i);const d=r[o]||o.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw gn(t,d,l);F(t,d)}}catch(s){if(s instanceof de)throw s;F(t,"network-request-failed",{message:String(s)})}}async function rt(t,e,n,r,s={}){const a=await ne(t,e,n,r,s);return"mfaPendingCredential"in a&&F(t,"multi-factor-auth-required",{_serverResponse:a}),a}async function ys(t,e,n,r){const s=`${e}${n}?${r}`,a=t,i=a.config.emulator?bn(t.config,s):`${t.config.apiScheme}://${s}`;return il.includes(n)&&(await a._persistenceManagerAvailable,a._getPersistenceType()==="COOKIE")?a._getPersistence()._getFinalTarget(i).toString():i}function cl(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ll{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(H(this.auth,"network-request-failed")),ol.get())})}}function ct(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=H(t,e,r);return s.customData._tokenResponse=n,s}function lr(t){return t!==void 0&&t.enterprise!==void 0}class dl{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return cl(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function ul(t,e){return ne(t,"GET","/v2/recaptchaConfig",ue(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hl(t,e){return ne(t,"POST","/v1/accounts:delete",e)}async function bt(t,e){return ne(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ml(t,e=!1){const n=te(t),r=await n.getIdToken(e),s=vn(r);y(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const a=typeof s.firebase=="object"?s.firebase:void 0,i=a==null?void 0:a.sign_in_provider;return{claims:s,token:r,authTime:Ge(Kt(s.auth_time)),issuedAtTime:Ge(Kt(s.iat)),expirationTime:Ge(Kt(s.exp)),signInProvider:i||null,signInSecondFactor:(a==null?void 0:a.sign_in_second_factor)||null}}function Kt(t){return Number(t)*1e3}function vn(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return ut("JWT malformed, contained fewer than 3 sections"),null;try{const s=is(n);return s?JSON.parse(s):(ut("Failed to decode base64 JWT payload"),null)}catch(s){return ut("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function dr(t){const e=vn(t);return y(e,"internal-error"),y(typeof e.exp<"u","internal-error"),y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Te(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof de&&fl(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function fl({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ge(this.lastLoginAt),this.creationTime=Ge(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vt(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Te(t,bt(n,{idToken:r}));y(s==null?void 0:s.users.length,n,"internal-error");const a=s.users[0];t._notifyReloadListener(a);const i=!((e=a.providerUserInfo)===null||e===void 0)&&e.length?Es(a.providerUserInfo):[],c=_l(t.providerData,i),o=t.isAnonymous,l=!(t.email&&a.passwordHash)&&!(c!=null&&c.length),d=o?l:!1,h={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:c,metadata:new sn(a.createdAt,a.lastLoginAt),isAnonymous:d};Object.assign(t,h)}async function gl(t){const e=te(t);await vt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _l(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Es(t){return t.map(e=>{var{providerId:n}=e,r=pn(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bl(t,e){const n=await vs(t,{},async()=>{const r=et({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:a}=t.config,i=await ys(t,s,"/v1/token",`key=${a}`),c=await t._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const o={method:"POST",headers:c,body:r};return t.emulatorConfig&&Tt(t.emulatorConfig.host)&&(o.credentials="include"),bs.fetch()(i,o)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function vl(t,e){return ne(t,"POST","/v2/accounts:revokeToken",ue(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){y(e.idToken,"internal-error"),y(typeof e.idToken<"u","internal-error"),y(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):dr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){y(e.length!==0,"internal-error");const n=dr(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:a}=await bl(e,n);this.updateTokensAndExpiration(r,s,Number(a))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:a}=n,i=new we;return r&&(y(typeof r=="string","internal-error",{appName:e}),i.refreshToken=r),s&&(y(typeof s=="string","internal-error",{appName:e}),i.accessToken=s),a&&(y(typeof a=="number","internal-error",{appName:e}),i.expirationTime=a),i}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new we,this.toJSON())}_performRefresh(){return z("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function re(t,e){y(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class B{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,a=pn(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new pl(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new sn(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const n=await Te(this,this.stsTokenManager.getToken(this.auth,e));return y(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ml(this,e)}reload(){return gl(this)}_assign(e){this!==e&&(y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new B(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await vt(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(U(this.auth.app))return Promise.reject(X(this.auth));const e=await this.getIdToken();return await Te(this,hl(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,a,i,c,o,l,d;const h=(r=n.displayName)!==null&&r!==void 0?r:void 0,u=(s=n.email)!==null&&s!==void 0?s:void 0,m=(a=n.phoneNumber)!==null&&a!==void 0?a:void 0,f=(i=n.photoURL)!==null&&i!==void 0?i:void 0,p=(c=n.tenantId)!==null&&c!==void 0?c:void 0,g=(o=n._redirectEventId)!==null&&o!==void 0?o:void 0,E=(l=n.createdAt)!==null&&l!==void 0?l:void 0,A=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:T,emailVerified:_,isAnonymous:b,providerData:I,stsTokenManager:v}=n;y(T&&v,e,"internal-error");const N=we.fromJSON(this.name,v);y(typeof T=="string",e,"internal-error"),re(h,e.name),re(u,e.name),y(typeof _=="boolean",e,"internal-error"),y(typeof b=="boolean",e,"internal-error"),re(m,e.name),re(f,e.name),re(p,e.name),re(g,e.name),re(E,e.name),re(A,e.name);const O=new B({uid:T,auth:e,email:u,emailVerified:_,displayName:h,isAnonymous:b,photoURL:f,phoneNumber:m,tenantId:p,stsTokenManager:N,createdAt:E,lastLoginAt:A});return I&&Array.isArray(I)&&(O.providerData=I.map(V=>Object.assign({},V))),g&&(O._redirectEventId=g),O}static async _fromIdTokenResponse(e,n,r=!1){const s=new we;s.updateFromServerResponse(n);const a=new B({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await vt(a),a}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];y(s.localId!==void 0,"internal-error");const a=s.providerUserInfo!==void 0?Es(s.providerUserInfo):[],i=!(s.email&&s.passwordHash)&&!(a!=null&&a.length),c=new we;c.updateFromIdToken(r);const o=new B({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:i}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new sn(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(a!=null&&a.length)};return Object.assign(o,l),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=new Map;function q(t){Q(t instanceof Function,"Expected a class definition");let e=ur.get(t);return e?(Q(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,ur.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}ws.type="NONE";const hr=ws;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(t,e,n){return`firebase:${t}:${e}:${n}`}class Ae{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:a}=this.auth;this.fullUserKey=ht(this.userKey,s.apiKey,a),this.fullPersistenceKey=ht("persistence",s.apiKey,a),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await bt(this.auth,{idToken:e}).catch(()=>{});return n?B._fromGetAccountInfoResponse(this.auth,n,e):null}return B._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Ae(q(hr),e,r);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let a=s[0]||q(hr);const i=ht(r,e.config.apiKey,e.name);let c=null;for(const l of n)try{const d=await l._get(i);if(d){let h;if(typeof d=="string"){const u=await bt(e,{idToken:d}).catch(()=>{});if(!u)break;h=await B._fromGetAccountInfoResponse(e,u,d)}else h=B._fromJSON(e,d);l!==a&&(c=h),a=l;break}}catch{}const o=s.filter(l=>l._shouldAllowMigration);return!a._shouldAllowMigration||!o.length?new Ae(a,e,r):(a=o[0],c&&await a._set(i,c.toJSON()),await Promise.all(n.map(async l=>{if(l!==a)try{await l._remove(i)}catch{}})),new Ae(a,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ss(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(As(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ts(e))return"Blackberry";if(ks(e))return"Webos";if(Is(e))return"Safari";if((e.includes("chrome/")||Cs(e))&&!e.includes("edge/"))return"Chrome";if(Ns(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function As(t=x()){return/firefox\//i.test(t)}function Is(t=x()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Cs(t=x()){return/crios\//i.test(t)}function Ss(t=x()){return/iemobile/i.test(t)}function Ns(t=x()){return/android/i.test(t)}function Ts(t=x()){return/blackberry/i.test(t)}function ks(t=x()){return/webos/i.test(t)}function yn(t=x()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function yl(t=x()){var e;return yn(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function El(){return Lo()&&document.documentMode===10}function Ps(t=x()){return yn(t)||Ns(t)||ks(t)||Ts(t)||/windows phone/i.test(t)||Ss(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rs(t,e=[]){let n;switch(t){case"Browser":n=mr(x());break;case"Worker":n=`${mr(x())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${tt}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=a=>new Promise((i,c)=>{try{const o=e(a);i(o)}catch(o){c(o)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Al(t,e={}){return ne(t,"GET","/v2/passwordPolicy",ue(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il=6;class Cl{constructor(e){var n,r,s,a;const i=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=i.minPasswordLength)!==null&&n!==void 0?n:Il,i.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=i.maxPasswordLength),i.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=i.containsLowercaseCharacter),i.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=i.containsUppercaseCharacter),i.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=i.containsNumericCharacter),i.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=i.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(a=e.forceUpgradeOnSignin)!==null&&a!==void 0?a:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,a,i,c;const o={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,o),this.validatePasswordCharacterOptions(e,o),o.isValid&&(o.isValid=(n=o.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),o.isValid&&(o.isValid=(r=o.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),o.isValid&&(o.isValid=(s=o.containsLowercaseLetter)!==null&&s!==void 0?s:!0),o.isValid&&(o.isValid=(a=o.containsUppercaseLetter)!==null&&a!==void 0?a:!0),o.isValid&&(o.isValid=(i=o.containsNumericCharacter)!==null&&i!==void 0?i:!0),o.isValid&&(o.isValid=(c=o.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),o}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new fr(this),this.idTokenSubscription=new fr(this),this.beforeStateQueue=new wl(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=_s,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(a=>this._resolvePersistenceManagerAvailable=a)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=q(n)),this._initializationPromise=this.queue(async()=>{var r,s,a;if(!this._deleted&&(this.persistenceManager=await Ae.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((a=this.currentUser)===null||a===void 0?void 0:a.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await bt(this,{idToken:e}),r=await B._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(U(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,c=s==null?void 0:s._redirectEventId,o=await this.tryRedirectSignIn(e);(!i||i===c)&&(o!=null&&o.user)&&(s=o.user,a=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(s)}catch(i){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await vt(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=sl()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(U(this.app))return Promise.reject(X(this));const n=e?te(e):null;return n&&y(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return U(this.app)?Promise.reject(X(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return U(this.app)?Promise.reject(X(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(q(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Al(this),n=new Cl(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Qe("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await vl(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&q(e)||this._popupRedirectResolver;y(n,this,"argument-error"),this.redirectPersistenceManager=await Ae.create(this,[q(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const a=typeof n=="function"?n:n.next.bind(n);let i=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(y(c,this,"internal-error"),c.then(()=>{i||a(this.currentUser)}),typeof n=="function"){const o=e.addObserver(n,r,s);return()=>{i=!0,o()}}else{const o=e.addObserver(n);return()=>{i=!0,o()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Rs(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;if(U(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&el(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function he(t){return te(t)}class fr{constructor(e){this.auth=e,this.observer=null,this.addObserver=Bo(n=>this.observer=n)}get next(){return y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kt={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Nl(t){kt=t}function Ls(t){return kt.loadJS(t)}function Tl(){return kt.recaptchaEnterpriseScript}function kl(){return kt.gapiScript}function Pl(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class Rl{constructor(){this.enterprise=new Ll}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class Ll{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const Ol="recaptcha-enterprise",Os="NO_RECAPTCHA";class Dl{constructor(e){this.type=Ol,this.auth=he(e)}async verify(e="verify",n=!1){async function r(a){if(!n){if(a.tenantId==null&&a._agentRecaptchaConfig!=null)return a._agentRecaptchaConfig.siteKey;if(a.tenantId!=null&&a._tenantRecaptchaConfigs[a.tenantId]!==void 0)return a._tenantRecaptchaConfigs[a.tenantId].siteKey}return new Promise(async(i,c)=>{ul(a,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(o=>{if(o.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new dl(o);return a.tenantId==null?a._agentRecaptchaConfig=l:a._tenantRecaptchaConfigs[a.tenantId]=l,i(l.siteKey)}}).catch(o=>{c(o)})})}function s(a,i,c){const o=window.grecaptcha;lr(o)?o.enterprise.ready(()=>{o.enterprise.execute(a,{action:e}).then(l=>{i(l)}).catch(()=>{i(Os)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Rl().execute("siteKey",{action:"verify"}):new Promise((a,i)=>{r(this.auth).then(c=>{if(!n&&lr(window.grecaptcha))s(c,a,i);else{if(typeof window>"u"){i(new Error("RecaptchaVerifier is only supported in browser"));return}let o=Tl();o.length!==0&&(o+=c),Ls(o).then(()=>{s(c,a,i)}).catch(l=>{i(l)})}}).catch(c=>{i(c)})})}}async function pr(t,e,n,r=!1,s=!1){const a=new Dl(t);let i;if(s)i=Os;else try{i=await a.verify(n)}catch{i=await a.verify(n,!0)}const c=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const o=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:o,recaptchaToken:l,captchaResponse:i,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const o=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:o,captchaResponse:i,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:i}):Object.assign(c,{captchaResponse:i}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function an(t,e,n,r,s){var a;if(!((a=t._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await pr(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await pr(t,e,n,n==="getOobCode");return r(t,c)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ml(t,e){const n=hs(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),a=n.getOptions();if(Se(a,e??{}))return s;F(s,"already-initialized")}return n.initialize({options:e})}function xl(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(q);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ul(t,e,n){const r=he(t);y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,a=Ds(e),{host:i,port:c}=Fl(e),o=c===null?"":`:${c}`,l={url:`${a}//${i}${o}/`},d=Object.freeze({host:i,port:c,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),y(Se(l,r.config.emulator)&&Se(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Tt(i)?(Io(`${a}//${i}${o}`),No("Auth",!0)):Bl()}function Ds(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Fl(t){const e=Ds(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const a=s[1];return{host:a,port:gr(r.substr(a.length+1))}}else{const[a,i]=r.split(":");return{host:a,port:gr(i)}}}function gr(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Bl(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return z("not implemented")}_getIdTokenResponse(e){return z("not implemented")}_linkToIdToken(e,n){return z("not implemented")}_getReauthenticationResolver(e){return z("not implemented")}}async function Hl(t,e){return ne(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $l(t,e){return rt(t,"POST","/v1/accounts:signInWithPassword",ue(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wl(t,e){return rt(t,"POST","/v1/accounts:signInWithEmailLink",ue(t,e))}async function Gl(t,e){return rt(t,"POST","/v1/accounts:signInWithEmailLink",ue(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je extends En{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Je(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Je(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return an(e,n,"signInWithPassword",$l);case"emailLink":return Wl(e,{email:this._email,oobCode:this._password});default:F(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return an(e,r,"signUpPassword",Hl);case"emailLink":return Gl(e,{idToken:n,email:this._email,oobCode:this._password});default:F(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ie(t,e){return rt(t,"POST","/v1/accounts:signInWithIdp",ue(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vl="http://localhost";class _e extends En{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new _e(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):F("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,a=pn(n,["providerId","signInMethod"]);if(!r||!s)return null;const i=new _e(r,s);return i.idToken=a.idToken||void 0,i.accessToken=a.accessToken||void 0,i.secret=a.secret,i.nonce=a.nonce,i.pendingToken=a.pendingToken||null,i}_getIdTokenResponse(e){const n=this.buildRequest();return Ie(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ie(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ie(e,n)}buildRequest(){const e={requestUri:Vl,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=et(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jl(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Kl(t){const e=Be(He(t)).link,n=e?Be(He(e)).deep_link_id:null,r=Be(He(t)).deep_link_id;return(r?Be(He(r)).link:null)||r||n||e||t}class wn{constructor(e){var n,r,s,a,i,c;const o=Be(He(e)),l=(n=o.apiKey)!==null&&n!==void 0?n:null,d=(r=o.oobCode)!==null&&r!==void 0?r:null,h=jl((s=o.mode)!==null&&s!==void 0?s:null);y(l&&d&&h,"argument-error"),this.apiKey=l,this.operation=h,this.code=d,this.continueUrl=(a=o.continueUrl)!==null&&a!==void 0?a:null,this.languageCode=(i=o.lang)!==null&&i!==void 0?i:null,this.tenantId=(c=o.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const n=Kl(e);try{return new wn(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(){this.providerId=ke.PROVIDER_ID}static credential(e,n){return Je._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=wn.parseLink(n);return y(r,"argument-error"),Je._fromEmailAndCode(e,r.code,r.tenantId)}}ke.PROVIDER_ID="password";ke.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ke.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st extends An{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se extends st{constructor(){super("facebook.com")}static credential(e){return _e._fromParams({providerId:se.PROVIDER_ID,signInMethod:se.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return se.credentialFromTaggedObject(e)}static credentialFromError(e){return se.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return se.credential(e.oauthAccessToken)}catch{return null}}}se.FACEBOOK_SIGN_IN_METHOD="facebook.com";se.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K extends st{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return _e._fromParams({providerId:K.PROVIDER_ID,signInMethod:K.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return K.credentialFromTaggedObject(e)}static credentialFromError(e){return K.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return K.credential(n,r)}catch{return null}}}K.GOOGLE_SIGN_IN_METHOD="google.com";K.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae extends st{constructor(){super("github.com")}static credential(e){return _e._fromParams({providerId:ae.PROVIDER_ID,signInMethod:ae.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ae.credentialFromTaggedObject(e)}static credentialFromError(e){return ae.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ae.credential(e.oauthAccessToken)}catch{return null}}}ae.GITHUB_SIGN_IN_METHOD="github.com";ae.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie extends st{constructor(){super("twitter.com")}static credential(e,n){return _e._fromParams({providerId:ie.PROVIDER_ID,signInMethod:ie.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ie.credentialFromTaggedObject(e)}static credentialFromError(e){return ie.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return ie.credential(n,r)}catch{return null}}}ie.TWITTER_SIGN_IN_METHOD="twitter.com";ie.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zl(t,e){return rt(t,"POST","/v1/accounts:signUp",ue(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const a=await B._fromIdTokenResponse(e,r,s),i=_r(r);return new be({user:a,providerId:i,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=_r(r);return new be({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function _r(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends de{constructor(e,n,r,s){var a;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,yt.prototype),this.customData={appName:e.name,tenantId:(a=e.tenantId)!==null&&a!==void 0?a:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new yt(e,n,r,s)}}function Ms(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?yt._fromErrorAndOperation(t,a,e,r):a})}async function ql(t,e,n=!1){const r=await Te(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return be._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jl(t,e,n=!1){const{auth:r}=t;if(U(r.app))return Promise.reject(X(r));const s="reauthenticate";try{const a=await Te(t,Ms(r,s,e,t),n);y(a.idToken,r,"internal-error");const i=vn(a.idToken);y(i,r,"internal-error");const{sub:c}=i;return y(t.uid===c,r,"user-mismatch"),be._forOperation(t,s,a)}catch(a){throw(a==null?void 0:a.code)==="auth/user-not-found"&&F(r,"user-mismatch"),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xs(t,e,n=!1){if(U(t.app))return Promise.reject(X(t));const r="signIn",s=await Ms(t,r,e),a=await be._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(a.user),a}async function Yl(t,e){return xs(he(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Us(t){const e=he(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Xl(t,e,n){if(U(t.app))return Promise.reject(X(t));const r=he(t),i=await an(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",zl).catch(o=>{throw o.code==="auth/password-does-not-meet-requirements"&&Us(t),o}),c=await be._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(c.user),c}function Zl(t,e,n){return U(t.app)?Promise.reject(X(t)):Yl(te(t),ke.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Us(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ql(t,e){return ne(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ed(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=te(t),a={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},i=await Te(r,Ql(r.auth,a));r.displayName=i.displayName||null,r.photoURL=i.photoUrl||null;const c=r.providerData.find(({providerId:o})=>o==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(i)}function td(t,e,n,r){return te(t).onIdTokenChanged(e,n,r)}function nd(t,e,n){return te(t).beforeAuthStateChanged(e,n)}function rd(t){return te(t).signOut()}const Et="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Et,"1"),this.storage.removeItem(Et),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sd=1e3,ad=10;class Bs extends Fs{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ps(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((i,c,o)=>{this.notifyListeners(i,o)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const i=this.storage.getItem(r);!n&&this.localCache[r]===i||this.notifyListeners(r,i)},a=this.storage.getItem(r);El()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ad):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},sd)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Bs.type="LOCAL";const id=Bs;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs extends Fs{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Hs.type="SESSION";const $s=Hs;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function od(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Pt(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:a}=n.data,i=this.handlersMap[s];if(!(i!=null&&i.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(i).map(async l=>l(n.origin,a)),o=await od(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:o})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Pt.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function In(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let a,i;return new Promise((c,o)=>{const l=In("",20);s.port1.start();const d=setTimeout(()=>{o(new Error("unsupported_event"))},r);i={messageChannel:s,onMessage(h){const u=h;if(u.data.eventId===l)switch(u.data.status){case"ack":clearTimeout(d),a=setTimeout(()=>{o(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),c(u.data.response);break;default:clearTimeout(d),clearTimeout(a),o(new Error("invalid_response"));break}}},this.handlers.add(i),s.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(){return window}function ld(t){G().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ws(){return typeof G().WorkerGlobalScope<"u"&&typeof G().importScripts=="function"}async function dd(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ud(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function hd(){return Ws()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs="firebaseLocalStorageDb",md=1,wt="firebaseLocalStorage",Vs="fbase_key";class at{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Rt(t,e){return t.transaction([wt],e?"readwrite":"readonly").objectStore(wt)}function fd(){const t=indexedDB.deleteDatabase(Gs);return new at(t).toPromise()}function on(){const t=indexedDB.open(Gs,md);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(wt,{keyPath:Vs})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(wt)?e(r):(r.close(),await fd(),e(await on()))})})}async function br(t,e,n){const r=Rt(t,!0).put({[Vs]:e,value:n});return new at(r).toPromise()}async function pd(t,e){const n=Rt(t,!1).get(e),r=await new at(n).toPromise();return r===void 0?null:r.value}function vr(t,e){const n=Rt(t,!0).delete(e);return new at(n).toPromise()}const gd=800,_d=3;class js{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await on(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>_d)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ws()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Pt._getInstance(hd()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await dd(),!this.activeServiceWorker)return;this.sender=new cd(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ud()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await on();return await br(e,Et,"1"),await vr(e,Et),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>br(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>pd(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>vr(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const a=Rt(s,!1).getAll();return new at(a).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:a}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(a)&&(this.notifyListeners(s,a),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),gd)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}js.type="LOCAL";const bd=js;new nt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ks(t,e){return e?q(e):(y(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn extends En{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ie(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ie(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ie(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function vd(t){return xs(t.auth,new Cn(t),t.bypassAuthState)}function yd(t){const{auth:e,user:n}=t;return y(n,e,"internal-error"),Jl(n,new Cn(t),t.bypassAuthState)}async function Ed(t){const{auth:e,user:n}=t;return y(n,e,"internal-error"),ql(n,new Cn(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e,n,r,s,a=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:a,error:i,type:c}=e;if(i){this.reject(i);return}const o={auth:this.auth,requestUri:n,sessionId:r,tenantId:a||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(o))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return vd;case"linkViaPopup":case"linkViaRedirect":return Ed;case"reauthViaPopup":case"reauthViaRedirect":return yd;default:F(this.auth,"internal-error")}}resolve(e){Q(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Q(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd=new nt(2e3,1e4);async function Ad(t,e,n){if(U(t.app))return Promise.reject(H(t,"operation-not-supported-in-this-environment"));const r=he(t);tl(t,e,An);const s=Ks(r,n);return new pe(r,"signInViaPopup",e,s).executeNotNull()}class pe extends zs{constructor(e,n,r,s,a){super(e,n,s,a),this.provider=r,this.authWindow=null,this.pollId=null,pe.currentPopupAction&&pe.currentPopupAction.cancel(),pe.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return y(e,this.auth,"internal-error"),e}async onExecution(){Q(this.filter.length===1,"Popup operations only handle one event");const e=In();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(H(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(H(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,pe.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(H(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,wd.get())};e()}}pe.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id="pendingRedirect",mt=new Map;class Cd extends zs{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=mt.get(this.auth._key());if(!e){try{const r=await Sd(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}mt.set(this.auth._key(),e)}return this.bypassAuthState||mt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Sd(t,e){const n=kd(e),r=Td(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Nd(t,e){mt.set(t._key(),e)}function Td(t){return q(t._redirectPersistence)}function kd(t){return ht(Id,t.config.apiKey,t.name)}async function Pd(t,e,n=!1){if(U(t.app))return Promise.reject(X(t));const r=he(t),s=Ks(r,e),i=await new Cd(r,s,n).execute();return i&&!n&&(delete i.user._redirectEventId,await r._persistUserIfCurrent(i.user),await r._setRedirectUser(null,e)),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd=10*60*1e3;class Ld{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Od(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!qs(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(H(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Rd&&this.cachedEventUids.clear(),this.cachedEventUids.has(yr(e))}saveEventToCache(e){this.cachedEventUids.add(yr(e)),this.lastProcessedEventTime=Date.now()}}function yr(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function qs({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Od(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return qs(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dd(t,e={}){return ne(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,xd=/^https?/;async function Ud(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Dd(t);for(const n of e)try{if(Fd(n))return}catch{}F(t,"unauthorized-domain")}function Fd(t){const e=rn(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const i=new URL(t);return i.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&i.hostname===r}if(!xd.test(n))return!1;if(Md.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bd=new nt(3e4,6e4);function Er(){const t=G().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Hd(t){return new Promise((e,n)=>{var r,s,a;function i(){Er(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Er(),n(H(t,"network-request-failed"))},timeout:Bd.get()})}if(!((s=(r=G().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((a=G().gapi)===null||a===void 0)&&a.load)i();else{const c=Pl("iframefcb");return G()[c]=()=>{gapi.load?i():n(H(t,"network-request-failed"))},Ls(`${kl()}?onload=${c}`).catch(o=>n(o))}}).catch(e=>{throw ft=null,e})}let ft=null;function $d(t){return ft=ft||Hd(t),ft}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd=new nt(5e3,15e3),Gd="__/auth/iframe",Vd="emulator/auth/iframe",jd={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Kd=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function zd(t){const e=t.config;y(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?bn(e,Vd):`https://${t.config.authDomain}/${Gd}`,r={apiKey:e.apiKey,appName:t.name,v:tt},s=Kd.get(t.config.apiHost);s&&(r.eid=s);const a=t._getFrameworks();return a.length&&(r.fw=a.join(",")),`${n}?${et(r).slice(1)}`}async function qd(t){const e=await $d(t),n=G().gapi;return y(n,t,"internal-error"),e.open({where:document.body,url:zd(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:jd,dontclear:!0},r=>new Promise(async(s,a)=>{await r.restyle({setHideOnLeave:!1});const i=H(t,"network-request-failed"),c=G().setTimeout(()=>{a(i)},Wd.get());function o(){G().clearTimeout(c),s(r)}r.ping(o).then(o,()=>{a(i)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jd={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Yd=500,Xd=600,Zd="_blank",Qd="http://localhost";class wr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function eu(t,e,n,r=Yd,s=Xd){const a=Math.max((window.screen.availHeight-s)/2,0).toString(),i=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const o=Object.assign(Object.assign({},Jd),{width:r.toString(),height:s.toString(),top:a,left:i}),l=x().toLowerCase();n&&(c=Cs(l)?Zd:n),As(l)&&(e=e||Qd,o.scrollbars="yes");const d=Object.entries(o).reduce((u,[m,f])=>`${u}${m}=${f},`,"");if(yl(l)&&c!=="_self")return tu(e||"",c),new wr(null);const h=window.open(e||"",c,d);y(h,t,"popup-blocked");try{h.focus()}catch{}return new wr(h)}function tu(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nu="__/auth/handler",ru="emulator/auth/handler",su=encodeURIComponent("fac");async function Ar(t,e,n,r,s,a){y(t.config.authDomain,t,"auth-domain-config-required"),y(t.config.apiKey,t,"invalid-api-key");const i={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:tt,eventId:s};if(e instanceof An){e.setDefaultLanguage(t.languageCode),i.providerId=e.providerId||"",Fo(e.getCustomParameters())||(i.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,h]of Object.entries({}))i[d]=h}if(e instanceof st){const d=e.getScopes().filter(h=>h!=="");d.length>0&&(i.scopes=d.join(","))}t.tenantId&&(i.tid=t.tenantId);const c=i;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const o=await t._getAppCheckToken(),l=o?`#${su}=${encodeURIComponent(o)}`:"";return`${au(t)}?${et(c).slice(1)}${l}`}function au({config:t}){return t.emulator?bn(t,ru):`https://${t.authDomain}/${nu}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt="webStorageSupport";class iu{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=$s,this._completeRedirectFn=Pd,this._overrideRedirectResult=Nd}async _openPopup(e,n,r,s){var a;Q((a=this.eventManagers[e._key()])===null||a===void 0?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await Ar(e,n,r,rn(),s);return eu(e,i,In())}async _openRedirect(e,n,r,s){await this._originValidation(e);const a=await Ar(e,n,r,rn(),s);return ld(a),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:a}=this.eventManagers[n];return s?Promise.resolve(s):(Q(a,"If manager is not set, promise should be"),a)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await qd(e),r=new Ld(e);return n.register("authEvent",s=>(y(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(zt,{type:zt},s=>{var a;const i=(a=s==null?void 0:s[0])===null||a===void 0?void 0:a[zt];i!==void 0&&n(!!i),F(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Ud(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ps()||Is()||yn()}}const ou=iu;var Ir="@firebase/auth",Cr="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lu(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function du(t){ze(new Ne("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:i,authDomain:c}=r.options;y(i&&!i.includes(":"),"invalid-api-key",{appName:r.name});const o={apiKey:i,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Rs(t)},l=new Sl(r,s,a,o);return xl(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),ze(new Ne("auth-internal",e=>{const n=he(e.getProvider("auth").getImmediate());return(r=>new cu(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ee(Ir,Cr,lu(t)),Ee(Ir,Cr,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uu=5*60,hu=cs("authIdTokenMaxAge")||uu;let Sr=null;const mu=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>hu)return;const s=n==null?void 0:n.token;Sr!==s&&(Sr=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function fu(t=Hc()){const e=hs(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Ml(t,{popupRedirectResolver:ou,persistence:[bd,id,$s]}),r=cs("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(r,location.origin);if(location.origin===a.origin){const i=mu(a.toString());nd(n,i,()=>i(n.currentUser)),td(n,c=>i(c))}}const s=wo("auth");return s&&Ul(n,`http://${s}`),n}function pu(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Nl({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const a=H("internal-error");a.customData=s,n(a)},r.type="text/javascript",r.charset="UTF-8",pu().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});du("Browser");const gu={apiKey:"AIzaSyCR4spMsTHghB145CVccsAbJqcybImuQ9Q",authDomain:"minigames-katymist.firebaseapp.com",projectId:"minigames-katymist",storageBucket:"minigames-katymist.firebasestorage.app",messagingSenderId:"691708875841",appId:"1:691708875841:web:1e66ca085bb8409d2122c0"};let Nr;function Lt(){return Nr??(Nr=fu(ms(gu))),Nr}async function _u(t,e){return(await Zl(Lt(),t,e)).user}async function bu(t,e,n){const r=await Xl(Lt(),e,n);return await ed(r.user,{displayName:t}),r.user}async function vu(){const t=new K;return t.setCustomParameters({prompt:"select_account"}),(await Ad(Lt(),t)).user}function Js(){return rd(Lt())}async function Sn(t){try{return $a({displayName:t.displayName,email:t.email,photoURL:t.photoURL})}catch(e){throw await Js().catch(()=>{}),e}}async function yu(t,e){const n=await _u(t.trim(),e);return Sn(n)}async function Eu(t,e,n){const r=await bu(t,e.trim(),n);return Sn(r)}async function wu(){const t=await vu();return Sn(t)}const Au={"auth/invalid-credential":"Incorrect email or password.","auth/invalid-login-credentials":"Incorrect email or password.","auth/wrong-password":"Incorrect email or password.","auth/user-not-found":"Incorrect email or password.","auth/invalid-email":"The email address is not valid.","auth/user-disabled":"This account has been disabled.","auth/email-already-in-use":"An account with this email already exists.","auth/weak-password":"The password is too weak.","auth/too-many-requests":"Too many attempts. Please wait a moment and try again.","auth/network-request-failed":"Network error. Check your connection and try again.","auth/popup-blocked":"The sign-in popup was blocked by the browser. Allow popups and try again.","auth/popup-closed-by-user":"Google sign-in was canceled.","auth/cancelled-popup-request":"Google sign-in was canceled.","auth/user-cancelled":"Google sign-in was canceled.","auth/account-exists-with-different-credential":"An account with this email already exists. Sign in with email and password.","auth/operation-not-allowed":"This sign-in method is not enabled.","auth/unauthorized-domain":"Sign-in is not allowed from this domain.","auth/configuration-not-found":"Authentication is not configured for this project yet. Please try again later.","auth/api-key-not-valid.-please-pass-a-valid-api-key.":"Authentication is not configured correctly. Please try again later."},Iu=new Set(["auth/popup-closed-by-user","auth/cancelled-popup-request","auth/user-cancelled"]),Tr="Authentication failed. Please try again.";function Ys(t){if(typeof t=="object"&&t!==null&&"code"in t){const{code:e}=t;if(typeof e=="string")return e}return""}function Cu(t){const e=Ys(t),n=Au[e];return n||(e?`${Tr} (${e})`:Tr)}function Su(t){return Iu.has(Ys(t))}const Nu={login:["email","password"],register:["username","email","password","confirmPassword"]},kr=2,Pr=30,At=6,Tu=/^[\w%+.-]+@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*\.[A-Za-z]{2,}$/,ku=/^[A-Z]/,Pu=/^[\dA-Za-z]+$/,Ru=/^[!-~]+$/,Lu=/[A-Z]/,Ou=/\d/,Du=/[^\dA-Za-z]/;function Mu(t){const e=t.trim();return e===""?"Email is required.":Tu.test(e)?"":"Enter a valid email address, e.g. alex@minigames.com."}function xu(t){return t===""?"Username is required.":t.length<kr||t.length>Pr?`Username must be ${kr}–${Pr} characters long.`:ku.test(t)?Pu.test(t)?"":"Username may contain only English letters and digits.":"Username must start with an uppercase English letter."}function Uu(t){return t===""?"Password is required.":t.length<At?`Password must be at least ${At} characters long.`:Ru.test(t)?Lu.test(t)?Ou.test(t)?Du.test(t)?"":"Password must contain a special character.":"Password must contain a digit.":"Password must contain an uppercase letter.":"Password may contain only English letters, digits and special characters."}function Fu(t){return t===""?"Password is required.":t.length<At?`Password must be at least ${At} characters long.`:""}function Bu(t,e){return t===""?"Please confirm your password.":t!==e?"Passwords do not match.":""}function Xs(t,e,n){const r=n[e]??"";switch(e){case"email":return Mu(r);case"username":return xu(r);case"password":return t==="register"?Uu(r):Fu(r);default:return Bu(r,n.password??"")}}function Zs(t,e){const n={};for(const r of Nu[t]){const s=Xs(t,r,e);s&&(n[r]=s)}return n}function Hu(t,e){return Object.keys(Zs(t,e)).length===0}const Ve=500;function $u(t){const e=t.trim();return e===""?"Comment cannot be empty.":e.length>Ve?`Comment must be ${Ve} characters or fewer.`:""}const Wu=`
<svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true" focusable="false">
  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.4-6 7.5-11.3 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z"/>
  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3 16.1 3 9.3 7.5 6.3 14.7z"/>
  <path fill="#4CAF50" d="M24 45c5.4 0 10.3-1.8 14.1-5l-6.5-5.5C29.6 36.6 26.9 37.5 24 37.5c-5.3 0-9.8-3.4-11.4-8.1l-6.5 5C9.1 40.5 15.9 45 24 45z"/>
  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.1 5.4-5.7 7l6.5 5.5C40.5 36.9 44 31 44 24c0-1.4-.1-2.7-.4-3.5z"/>
</svg>
`.trim();function Gu(t){const e=document.createElement("span");return e.className="material-symbols-outlined auth-dialog__input-icon",e.translate=!1,e.setAttribute("aria-hidden","true"),e.textContent=t,e}function ye(t){const e=document.createElement("div");e.className="auth-dialog__field";const n=document.createElement("label");n.className="auth-dialog__label",n.htmlFor=t.id,n.textContent=t.label;const r=document.createElement("div");r.className="auth-dialog__input-wrap";const s=document.createElement("input");s.className="auth-dialog__input",s.id=t.id,s.name=t.name,s.type=t.type,s.placeholder=t.placeholder,s.required=!0,t.autocomplete&&(s.autocomplete=t.autocomplete);const a=document.createElement("p");return a.className="auth-dialog__error",a.id=`${t.id}-error`,s.setAttribute("aria-describedby",a.id),r.append(Gu(t.icon),s),e.append(n,r,a),{name:t.name,element:e,input:s,error:a,touched:!1}}function Vu(t){const e=ye({...t,type:"password",icon:"lock"}),{input:n}=e;n.classList.add("auth-dialog__input--with-toggle");const r=document.createElement("button");r.type="button",r.className="auth-dialog__input-toggle",r.setAttribute("aria-label","Show password");const s=document.createElement("span");return s.className="material-symbols-outlined",s.translate=!1,s.setAttribute("aria-hidden","true"),s.textContent="visibility",r.append(s),r.addEventListener("click",()=>{const a=n.type==="password";n.type=a?"text":"password",s.textContent=a?"visibility_off":"visibility",r.setAttribute("aria-label",a?"Hide password":"Show password")}),n.after(r),e}function ju(){const t=document.createElement("div");t.className="auth-dialog__divider";const e=document.createElement("span");e.className="auth-dialog__divider-line";const n=document.createElement("span");n.className="auth-dialog__divider-text",n.textContent="OR";const r=document.createElement("span");return r.className="auth-dialog__divider-line",t.append(e,n,r),t}function Ku(t){const e=document.createElement("button");e.type="button",e.className="btn btn--outline btn--lg auth-dialog__google";const n=document.createElement("span");n.className="auth-dialog__google-icon",n.innerHTML=Wu;const r=document.createElement("span");return r.textContent=t,e.append(n,r),e}function zu(){const t=document.createElement("span");return t.className="material-symbols-outlined spinner",t.translate=!1,t.setAttribute("aria-hidden","true"),t.textContent="progress_activity",t}function qu(t){const e=document.createElement("button");return e.type="submit",e.className="btn btn--primary btn--lg auth-dialog__submit",e.textContent=t,e}function Ju(t,e,n){const r=document.createElement("p");r.className="auth-dialog__switch",r.append(document.createTextNode(`${t} `));const s=document.createElement("button");return s.type="button",s.className="auth-dialog__switch-link",s.textContent=e,s.addEventListener("click",n),r.append(s),r}const Yu={login:{heading:"Welcome Back!",subtitle:"Sign in to resume your games and progress.",submitLabel:"Login",googleLabel:"Continue with Google",switchText:"Don't have an account?",switchLabel:"Register"},register:{heading:"Create Account",subtitle:"Join MiniGames to track your score & streak.",submitLabel:"Create Account",googleLabel:"Sign up with Google",switchText:"Already have an account?",switchLabel:"Login"}};function Xu(){return[ye({name:"email",id:"login-email",label:"Email Address",type:"email",placeholder:"e.g. alex@minigames.com",icon:"mail",autocomplete:"email"}),Vu({name:"password",id:"login-password",label:"Password",placeholder:"••••••••",autocomplete:"current-password"})]}function Zu(){return[ye({name:"username",id:"register-username",label:"Username",type:"text",placeholder:"e.g. CozyGamer99",icon:"person",autocomplete:"username"}),ye({name:"email",id:"register-email",label:"Email Address",type:"email",placeholder:"your.email@domain.com",icon:"mail",autocomplete:"email"}),ye({name:"password",id:"register-password",label:"Password",type:"password",placeholder:"Min. 6 characters",icon:"lock",autocomplete:"new-password"}),ye({name:"confirmPassword",id:"register-confirm-password",label:"Confirm Password",type:"password",placeholder:"Repeat your password",icon:"lock",autocomplete:"new-password"})]}function Rr(t,e){t.error.textContent=e,t.input.setAttribute("aria-invalid",String(!!e)),t.element.classList.toggle("auth-dialog__field--invalid",!!e)}function Qu(t,e){const n=Yu[t],r=document.createElement("form");r.className="auth-dialog__form",r.noValidate=!0;const s=document.createElement("h2");s.className="auth-dialog__heading",s.textContent=n.heading;const a=document.createElement("p");a.className="auth-dialog__subtitle",a.textContent=n.subtitle;const i=document.createElement("p");i.className="auth-dialog__form-error",i.setAttribute("role","alert");const c=t==="login"?Xu():Zu(),o=qu(n.submitLabel),l=Ku(n.googleLabel);l.addEventListener("click",()=>e.onGoogle(l));const d=()=>{const f={};for(const p of c)f[p.name]=p.input.value;return f},h=()=>{o.disabled=!Hu(t,d())},u=f=>{f.touched&&Rr(f,Xs(t,f.name,d()))};for(const f of c){const p=()=>{if(f.touched=!0,u(f),f.name==="password"){const g=c.find(E=>E.name==="confirmPassword");g&&u(g)}h()};f.input.addEventListener("input",p),f.input.addEventListener("blur",p)}r.addEventListener("submit",f=>{f.preventDefault();const p=d(),g=Zs(t,p);for(const E of c)E.touched=!0,Rr(E,g[E.name]??"");Object.keys(g).length===0&&e.onSubmit(p)});const m=[];if(t==="login"){const f=document.createElement("button");f.type="button",f.className="auth-dialog__forgot",f.textContent="Forgot Password?",m.push(f)}return r.append(s,a,i,...c.map(f=>f.element),...m,o,ju(),l,Ju(n.switchText,n.switchLabel,e.onSwitchMode)),h(),{form:r,fields:c,submitButton:o,googleButton:l,formError:i,getValues:d,updateSubmitState:h}}function eh(t={}){const e=document.createElement("div");e.className="auth-dialog";const n=document.createElement("div");n.className="auth-dialog__backdrop";const r=document.createElement("div");r.className="auth-dialog__panel",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-label","Authentication");const s=document.createElement("div");s.className="auth-dialog__tabs",s.setAttribute("role","tablist");const a=document.createElement("button");a.type="button",a.id="auth-dialog-tab-login",a.className="auth-dialog__tab",a.setAttribute("role","tab"),a.textContent="Login";const i=document.createElement("button");i.type="button",i.id="auth-dialog-tab-register",i.className="auth-dialog__tab",i.setAttribute("role","tab"),i.textContent="Register",s.append(a,i);const c=document.createElement("div");c.id="auth-dialog-panel",c.className="auth-dialog__content",c.setAttribute("role","tabpanel"),a.setAttribute("aria-controls","auth-dialog-panel"),i.setAttribute("aria-controls","auth-dialog-panel");let o=!1,l="login",d=!1,h;function u(v){d=v,e.classList.toggle("auth-dialog--pending",v),r.setAttribute("aria-busy",String(v));for(const N of r.querySelectorAll("input, button"))N.disabled=v;v||h==null||h.updateSubmitState()}async function m(v,N,O){var w;if(d||!h)return;const V=h,$=[...N.childNodes],Pe=()=>{N.replaceChildren(...$),u(!1)};V.formError.textContent="",N.replaceChildren(zu(),document.createTextNode(O)),u(!0);try{const P=await v();Pe(),C(`Welcome, ${It(P)}!`,{variant:"success"}),o&&((w=t.onAuthenticated)==null||w.call(t,P))}catch(P){Pe();const R=Cu(P);if(Su(P)){C(R,{variant:"info"});return}V.formError.textContent=R,C(R,{variant:"error"})}}function f(v){if(!h)return;const N=v.email??"",O=v.password??"";l==="login"?m(()=>yu(N,O),h.submitButton,"Logging in…"):m(()=>Eu(v.username??"",N,O),h.submitButton,"Creating account…")}const p=()=>{c.replaceChildren();const v=l==="login";a.classList.toggle("auth-dialog__tab--active",v),a.setAttribute("aria-selected",String(v)),i.classList.toggle("auth-dialog__tab--active",!v),i.setAttribute("aria-selected",String(!v)),c.setAttribute("aria-labelledby",v?a.id:i.id),h=Qu(l,{onSwitchMode:()=>E(v?"register":"login"),onSubmit:f,onGoogle:N=>{m(wu,N,"Connecting to Google…")}}),c.append(h.form)},g=v=>{l=v,p()};function E(v){var N;v!==l&&(g(v),(N=t.onModeChange)==null||N.call(t,v))}a.addEventListener("click",()=>E("login")),i.addEventListener("click",()=>E("register"));const A=()=>{o&&(o=!1,e.classList.remove("auth-dialog--open"),document.body.style.removeProperty("overflow"))},T=v=>{o&&v===l||o&&d||(o=!0,g(v),e.classList.add("auth-dialog--open"),document.body.style.overflow="hidden")},_=()=>{!o||d||(t.onDismiss?t.onDismiss():A())};n.addEventListener("click",_),document.addEventListener("keydown",v=>{v.key==="Escape"&&_()}),p();const b=document.createElement("button");b.type="button",b.className="auth-dialog__close",b.setAttribute("aria-label","Close authentication dialog");const I=document.createElement("span");return I.className="material-symbols-outlined",I.translate=!1,I.setAttribute("aria-hidden","true"),I.textContent="close",b.append(I),b.addEventListener("click",_),r.append(b,s,c),e.append(n,r),{element:e,open:T,close:A}}function Nn(t){const e=Ha(),n=ve();if(n)return n;e||C(t,{variant:"warning"}),dn("login")}const th="Log in to post comments.",Lr=88;function nh(t){return t instanceof Y&&t.isUnknownOutcome?"We couldn't confirm whether your comment was posted. Check the comments before sending it again.":t instanceof Y&&t.isClientError?`Your comment was not posted: ${t.message}`:"Failed to post your comment. Please try again."}function rh(t){const e=document.createElement("form");e.className="game-details__comment-form",e.noValidate=!0;const n=document.createElement("span");n.className="game-details__comment-avatar game-details__comment-form-avatar",n.setAttribute("aria-hidden","true");const r=document.createElement("div");r.className="game-details__comment-field";const s=document.createElement("textarea");s.className="game-details__comment-input",s.name="comment",s.rows=1,s.setAttribute("aria-label","Write a comment");const a=document.createElement("p");a.className="game-details__comment-status",a.setAttribute("role","status"),a.id="game-details-comment-status",s.setAttribute("aria-describedby",a.id),r.append(s,a);const i=document.createElement("button");i.type="submit",i.className="btn btn--primary game-details__comment-submit",e.append(n,r,i);let c=!1;const o=()=>{s.style.height="auto";const m=Math.min(s.scrollHeight,Lr);s.style.height=`${m}px`,s.style.overflowY=s.scrollHeight>Lr?"auto":"hidden"},l=(m,f=!1)=>{a.textContent=m,a.classList.toggle("game-details__comment-status--error",f)};function d(){if(c){const m=document.createElement("span");m.className="material-symbols-outlined spinner",m.translate=!1,m.setAttribute("aria-hidden","true"),m.textContent="progress_activity",i.replaceChildren(m,document.createTextNode("Sending…"));return}i.textContent=oe()?"Send":"Log In"}function h(){const m=oe(),f=!m;e.classList.toggle("game-details__comment-form--guest",f),s.disabled=f||c,s.placeholder=f?"Log in to share your thoughts about this game...":"Share your thoughts about this game...",i.disabled=c,e.setAttribute("aria-busy",String(c)),n.hidden=f,n.textContent=m?Br(It(m)):"",d()}async function u(){if(c)return;const m=Nn(th);if(!m)return;const f=$u(s.value);if(f){l(f,!0);return}c=!0,l(""),h();try{await ci(t.slug,{userEmail:m.email,authorName:da(m),text:s.value.trim()}),c=!1,s.value="",h(),o(),C("Your comment has been posted.",{variant:"success"}),t.onPosted()}catch(p){c=!1,h();const g=nh(p);l(g,!0),C(g,{variant:"error"})}}return s.addEventListener("input",()=>{o();const{length:m}=s.value.trim();l(m>Ve?`${m}/${Ve} characters`:"",m>Ve)}),s.addEventListener("keydown",m=>{m.key!=="Enter"||m.shiftKey||m.isComposing||(m.preventDefault(),u())}),e.addEventListener("submit",m=>{if(m.preventDefault(),!oe()){dn("login");return}u()}),h(),{element:e,refresh:h}}const sh="Log in to like comments.";function ah(t){return t instanceof Y&&t.isUnknownOutcome?"We couldn't confirm whether your like was saved. Reopen the game to check.":"Failed to update the like. Please try again."}function ih(t){const e=document.createElement("button");e.type="button",e.className="game-details__comment-like";const n=document.createElement("span");n.className="material-symbols-outlined",n.translate=!1,n.setAttribute("aria-hidden","true");const r=document.createElement("span");r.setAttribute("aria-hidden","true"),e.append(n,r);let s=t.isLikedByCurrentUser,a=t.likesCount,i=!1;function c(){e.disabled=i,e.setAttribute("aria-pressed",String(s)),e.setAttribute("aria-busy",String(i)),e.setAttribute("aria-label",`${s?"Unlike":"Like"} comment (${a} likes)`),e.classList.toggle("game-details__comment-like--active",s),n.classList.toggle("spinner",i),n.textContent=i?"progress_activity":"favorite",r.textContent=String(a)}async function o(){if(i)return;const l=Nn(sh);if(l){i=!0,c();try{const d=await li(t.commentId,l.email);s=d.isLikedByCurrentUser,a=d.likesCount}catch(d){C(ah(d),{variant:"error"})}finally{i=!1,c()}}}return e.addEventListener("click",()=>{o()}),c(),e}const Or=5;function oh(t=Math.random){const e=new Map;return{getTone(n){const r=n.trim().toLowerCase();let s=e.get(r);return s===void 0&&(s=Math.min(Math.floor(t()*Or),Or-1)+1,e.set(r,s)),s}}}const ch=3;function lh(t,e){const n=document.createElement("li");n.className="game-details__comment";const r=document.createElement("div");r.className=`game-details__comment-avatar game-details__comment-avatar--tone-${e.getTone(t.authorName)}`,r.textContent=Br(t.authorName),r.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="game-details__comment-body";const a=document.createElement("div");a.className="game-details__comment-meta";const i=document.createElement("p");i.className="game-details__comment-author",i.textContent=t.authorName;const c=document.createElement("time");c.className="game-details__comment-time",c.dateTime=t.createdAt,c.textContent=ui(t.createdAt),c.title=new Date(t.createdAt).toLocaleString("en-US"),a.append(i,c);const o=document.createElement("p");return o.className="game-details__comment-text",o.textContent=t.text,s.append(a,o),n.append(r,s,ih(t)),n}function dh(){const t=document.createElement("div");return t.className="game-details__comment",t.append(M("game-details__comment-avatar game-details__skeleton-avatar"),M("game-details__skeleton-comment")),t}function uh(t){const e=document.createElement("section");e.className="game-details__comments",e.setAttribute("aria-labelledby","game-details-comments-heading");const n=document.createElement("h3");n.className="game-details__section-heading",n.id="game-details-comments-heading",n.textContent="Comments";const r=document.createElement("div");r.className="game-details__comments-content";const s=rh({slug:t,onPosted:()=>{o()}});e.append(n,s.element,r);let a,i=!1;const c=oh();async function o(){var d;a==null||a.abort(),a=new AbortController;const{signal:l}=a;n.textContent="Comments",r.replaceChildren(Qr("Loading comments",...Array.from({length:ch},()=>dh())));try{const h=await ii(t,l,(d=oe())==null?void 0:d.email);if(n.textContent=`Comments (${h.meta.totalComments})`,h.data.length===0)r.replaceChildren(St("No comments yet","Be the first to share your thoughts about this game."));else{const u=document.createElement("ul");u.className="game-details__comments-list",u.append(...h.data.map(m=>lh(m,c))),r.replaceChildren(u)}i&&C("Comments loaded successfully.",{variant:"success"}),i=!1}catch(h){if(ge(h))return;i=!0,r.replaceChildren(Ze("We couldn't load comments. Please try again.",()=>{o()})),C("Failed to load comments.",{variant:"error"})}}return o(),{element:e,abort:()=>a==null?void 0:a.abort(),refresh:()=>{s.refresh(),o()}}}const hh="Log in to add games to your favorites.";function mh(t){return t instanceof Y&&t.isUnknownOutcome?"We couldn't confirm whether your favorites were updated. Reopen the game to check.":"Failed to update favorites. Please try again."}function fh(t){const e=document.createElement("button");e.type="button",e.className="btn btn--outline btn--lg game-details__favorite";const n=document.createElement("span");n.className="material-symbols-outlined",n.translate=!1,n.setAttribute("aria-hidden","true");const r=document.createElement("span");e.append(n,r);let s=t.isFavorited,a=!1;function i(){e.disabled=a,e.setAttribute("aria-pressed",String(s)),e.setAttribute("aria-busy",String(a)),e.classList.toggle("game-details__favorite--active",s),n.classList.toggle("spinner",a),n.textContent=a?"progress_activity":"favorite",r.textContent=s?"Added to Favorites":"Add to Favorites"}function c(l){var d;s=l.isFavorited,(d=t.onLikesChange)==null||d.call(t,l.likesCount)}async function o(){if(a)return;const l=Nn(hh);if(l){a=!0,i();try{const d=await oi(t.slug,l.email);c(d),C(d.isFavorited?"Added to favorites.":"Removed from favorites.",{variant:"success"})}catch(d){C(mh(d),{variant:"error"})}finally{a=!1,i()}}}return e.addEventListener("click",()=>{o()}),i(),{element:e,setFavorited:l=>{s=l,i()},isPending:()=>a}}const Qs="game-details-title";function Dr(t,e,n){const r=document.createElement("div");r.className=`game-details__stat ${e}`;const s=document.createElement("span");s.className="material-symbols-outlined game-details__stat-icon",s.translate=!1,s.setAttribute("aria-hidden","true"),s.textContent=t;const a=document.createElement("span");return a.className="game-details__stat-value",a.textContent=n,r.append(s,a),r}function ph(t){const e=document.createElement("span");return e.className="game-details__chip",e.textContent=t,e}function gh(t){const e=document.createElement("div");e.className="game-details__actions";const n=document.createElement("button");return n.type="button",n.className="btn btn--primary btn--lg game-details__play",n.textContent="Play Now",e.append(n,t.element),e}function _h(t,e){const n=document.createElement("div");n.className="game-details__info";const r=document.createElement("div");r.className="game-details__title-row";const s=document.createElement("h2");s.className="game-details__title",s.id=Qs,s.textContent=t.name;const a=document.createElement("div");a.className="game-details__stats";const i=Dr("favorite","game-details__stat--likes",Nt(t.likesCount));a.append(Dr("star","game-details__stat--rating",t.rating.toFixed(1)),i),r.append(s,a);const c=document.createElement("div");c.className="game-details__chips",c.append(...[t.specs.genre,t.specs.players,t.specs.duration,t.specs.price].filter(Boolean).map(l=>ph(l)));const o=document.createElement("p");return o.className="game-details__description",o.textContent=t.fullDescription,n.append(r,c,o,gh(e)),{element:n,likesValue:i.querySelector(".game-details__stat-value")??i}}function bh(t){const e=document.createElement("section");e.className="game-details__records",e.setAttribute("aria-label","Top records");const n=document.createElement("h3");if(n.className="game-details__section-heading",n.textContent="Top Records",e.append(n),t.length===0){const s=document.createElement("p");return s.className="game-details__empty",s.textContent="No records yet. Be the first to set one!",e.append(s),e}const r=document.createElement("ol");r.className="game-details__records-list";for(const s of t){const a=document.createElement("li");a.className="game-details__record";const i=document.createElement("span");i.className="game-details__record-rank",i.textContent=`#${s.position}`;const c=document.createElement("span");c.className="game-details__record-name",c.textContent=s.playerName;const o=document.createElement("span");o.className="game-details__record-score",o.textContent=ts(s.score),a.append(i,c,o),r.append(a)}return e.append(r),e}function vh(){const t=document.createElement("div");t.className="game-details__info",t.append(M("game-details__skeleton-line game-details__skeleton-line--title"),M("game-details__skeleton-line game-details__skeleton-line--chips"),M("game-details__skeleton-line"),M("game-details__skeleton-line game-details__skeleton-line--short"));const e=document.createElement("div");return e.className="game-details__records",e.append(...Array.from({length:3},()=>M("game-details__skeleton-record"))),Qr("Loading game details",t,e)}function yh(t={}){const e=document.createElement("div");e.className="game-details";const n=document.createElement("div");n.className="game-details__backdrop";const r=document.createElement("div");r.className="game-details__panel",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-label","Game details");const s=document.createElement("div");s.className="game-details__hero";const a=document.createElement("div");a.className="game-details__hero-media";const i=document.createElement("button");i.type="button",i.className="game-details__close",i.setAttribute("aria-label","Close game details");const c=document.createElement("span");c.className="material-symbols-outlined",c.translate=!1,c.setAttribute("aria-hidden","true"),c.textContent="close",i.append(c),s.append(a,i);const o=document.createElement("div");o.className="game-details__body",r.append(s,o),e.append(n,r);let l=!1,d="",h,u,m=!1,f=!1,p,g;function E(w){const P=()=>{const D=document.createElement("span");D.className="game-details__hero-placeholder-title",D.textContent=w.name,a.replaceChildren(D)},R=document.createElement("img");R.className="game-details__hero-image",R.alt=w.name,a.replaceChildren(R),pi(R,[pt(w.heroImage),pt(mi(w.slug))],P)}function A(w){w?(r.setAttribute("aria-labelledby",Qs),r.removeAttribute("aria-label")):(r.removeAttribute("aria-labelledby"),r.setAttribute("aria-label","Game details"))}function T(){A(!1),s.classList.add("game-details__hero--loading"),a.replaceChildren(M("game-details__hero-skeleton")),o.replaceChildren(vh())}function _(w){s.classList.remove("game-details__hero--loading"),E(w),p=fh({slug:w.slug,isFavorited:!!oe()&&w.isLikedByCurrentUser,onLikesChange:R=>{P.likesValue.textContent=Nt(R)}});const P=_h(w,p);u=uh(w.slug),o.replaceChildren(P.element,bh(w.topRecords),u.element),A(!0)}function b(w){A(!1),s.classList.remove("game-details__hero--loading"),a.replaceChildren(),o.replaceChildren(w)}function I(){h==null||h.abort(),g==null||g.abort(),p=void 0,u==null||u.abort(),u=void 0}async function v(w){var R;I(),h=new AbortController;const{signal:P}=h;T();try{const D=await Un(w,P,(R=oe())==null?void 0:R.email);_(D),m&&C("Game details loaded successfully.",{variant:"success"}),m=!1}catch(D){if(ge(D))return;if(D instanceof Y&&D.isNotFound){b(Zr("Game Not Found","The game you're looking for doesn't exist or has been removed.",{label:"Close",onClick:$})),C("Game not found.",{variant:"error"});return}m=!0,b(Ze("We couldn't load this game. Please try again.",()=>{v(w)})),C("Failed to load game details.",{variant:"error"})}}const N=w=>{f=w&&l,e.classList.toggle("game-details--suspended",f),l&&!f&&(document.body.style.overflow="hidden")},O=()=>{l&&(l=!1,f=!1,e.classList.remove("game-details--suspended"),d="",I(),e.classList.remove("game-details--open"),document.body.style.removeProperty("overflow"))},V=w=>{l&&w===d||(l=!0,d=w,e.classList.add("game-details--open"),document.body.style.overflow="hidden",v(w))};function $(){!l||f||(t.onDismiss?t.onDismiss():O())}async function Pe(){var R;const w=p;if(!l||!w)return;const P=(R=oe())==null?void 0:R.email;P||w.setFavorited(!1),u==null||u.refresh(),g==null||g.abort(),g=new AbortController;try{const D=await Un(d,g.signal,P);p===w&&!w.isPending()&&w.setFavorited(!!P&&D.isLikedByCurrentUser)}catch(D){if(ge(D))return;C("Failed to refresh your favorites state.",{variant:"error"})}}return qr(()=>{Pe()}),i.addEventListener("click",$),n.addEventListener("click",$),document.addEventListener("keydown",w=>{w.key==="Escape"&&$()}),{element:e,open:V,close:O,setSuspended:N}}function Eh(t){t.append(Xa(),Ii(),Ri(),Di())}function wh(t){t.append(...ho())}const Ah="MiniGames",Ih={home:Ah,library:"Game Library — MiniGames","not-found":"Page Not Found — MiniGames"};function Ch(t){return t==="login"||t==="register"}function Sh(){Wa({signOut:Js}),ba();const t=document.createElement("div");t.id="app",document.body.append(t);const e=eh({onDismiss:()=>Mt("auth"),onModeChange:o=>J({auth:o},{replace:!0}),onAuthenticated:()=>Mt("auth")}),n=yh({onDismiss:()=>Mt("game")}),r={onAuthRequest:dn,onLogout:()=>{dt("logout")}};let s=Ut(r);function a(o){const l=document.createElement("main");switch(document.title=Ih[o.page],o.page){case"library":{wh(l);break}case"not-found":{l.append(mo());break}default:{Eh(l);break}}s=Ut(r),t.replaceChildren(s,l,ji(),n.element,e.element)}function i(o){const l=o.query.get("game"),d=o.query.get("auth"),h=Ch(d)?d:void 0;if(h&&Yr()){J({auth:void 0},{replace:!0});return}h?e.open(h):e.close(),l?(n.open(l),n.setSuspended(!!h)):n.close()}Wr((o,l)=>{ve(),(!l||l.path!==o.path)&&a(o),i(o)}),qr(()=>{const o=Ut(r);s.replaceWith(o),s=o});const c=Ce();a(c),i(c)}document.addEventListener("DOMContentLoaded",Sh);
