import{a as p,i as c,S as y}from"./assets/vendor-c493984e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}})();let i=1;const f=40;let d="";document.getElementById("search-form").addEventListener("submit",async n=>{n.preventDefault();const s=document.getElementById("search-query").value;s!==d&&(d=s,i=1,document.querySelector(".gallery").innerHTML="",g()),await u(s)});document.getElementById("load-more").addEventListener("click",async()=>{await u(d)});async function u(n){const s=document.querySelector(".loader"),r=document.getElementById("load-more");s.classList.remove("hidden"),s.style.display="block",r.classList.add("hidden");const t=`https://pixabay.com/api/?key=44974018-ca766bb5bf44f97c206908e6f&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${i}&per_page=${f}`;try{const e=await p.get(t);s.classList.add("hidden"),s.style.display="none",e.data.hits.length===0&&i===1?c.error({title:"Error",message:"Przepraszamy, nie ma obrazów zgodnych z wyszukiwaniem. Spróbuj ponownie!"}):(h(e.data.hits),i++,m())}catch(e){s.classList.add("hidden"),s.style.display="none",c.error({title:"Error",message:`There was a problem with the fetch operation: ${e}`}),console.log(e)}}function h(n){const s=document.querySelector(".gallery"),r=n.map(o=>{const t=document.createElement("li");t.classList.add("gallery-item");const e=document.createElement("a");e.classList.add("gallery-link"),e.href=o.largeImageURL,e.setAttribute("data-lightbox","gallery"),e.setAttribute("data-title",`❤️ ${o.likes} 👁️ ${o.views} 💬 ${o.comments} ⬇️ ${o.downloads}`);const a=document.createElement("img");a.classList.add("gallery-image"),a.src=o.webformatURL,a.alt=o.tags;const l=document.createElement("div");return l.classList.add("image-info"),l.innerHTML=`
            <div class="info"><span>Likes</span> ${o.likes}</div>
            <div class="info"><span>Views</span> ${o.views}</div>
            <div class="info"><span>Comments</span> ${o.comments}</div>
            <div class="info"><span>Downloads</span> ${o.downloads}</div>
        `,e.appendChild(a),t.appendChild(e),t.appendChild(l),t});r.forEach(o=>s.appendChild(o)),new y(".gallery a",{captionType:"attr",captionsData:"alt",captionDelay:250}),r.length>0&&m()}function m(){document.getElementById("load-more").classList.remove("hidden")}function g(){document.getElementById("load-more").classList.add("hidden")}
//# sourceMappingURL=commonHelpers.js.map
