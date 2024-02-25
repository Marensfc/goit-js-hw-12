import{a as f,i as n,S as y}from"./assets/vendor-527658dd.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();class h{constructor(s,r){this.BASE_URL="https://pixabay.com",this.ENDPOINT="/api/",this.PARAMS={key:"42471766-4e6ef41ee0191e88bcacb27c7",q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:15},this.URL=`${this.BASE_URL}${this.ENDPOINT}`}async getImages(){try{return(await f.get(this.URL,{params:this.PARAMS})).data}catch(s){console.log(s.message)}}}const L=document.querySelector(".gallery");function b(e){return`<li class="gallery-card">
  <div class="gallery-card-wrapper">
    <div class="thumb">
      <a href="${e.largeImageURL}" class="gallery-link-image"><img class="gallery-img" src="${e.webformatURL}" data-original-size="${e.largeImageURL}" alt="${e.tags}" /></a>
    </div>
    <ul class="statistic-list">
      <li class="statistic-item">
        <p class="statistic-name">Likes</p>
        <p class="statistic-numbers">${e.likes}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-name">Views</p>
        <p class="statistic-numbers">${e.views}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-name">Comments</p>
        <p class="statistic-numbers">${e.comments}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-name">Downloads</p>
        <p class="statistic-numbers">${e.downloads}</p>
      </li>
    </ul>
  </div>
</li>`}function S(e){const r=e.map(o=>b(o)).join("");w(r)}function w(e){L.insertAdjacentHTML("beforeend",e)}function I(){return document.querySelector("ul > li").getBoundingClientRect().height}const c={message:"The search field must be filled!",messageColor:"white",backgroundColor:"red",close:!1,position:"topRight",progressBar:!1,animateInside:!1,timeout:3e3},a={form:document.querySelector(".form"),inputSearch:document.querySelector('[type="search"]'),searchButton:document.querySelector('[type="submit"]'),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadButton:document.querySelector(".btn-load-more")};a.form.addEventListener("submit",P);a.loadButton.addEventListener("click",A);let l=1,d,m;function P(e){e.preventDefault(),a.loader.classList.remove("hidden");const s=a.inputSearch.value.trim(),r=s.split(" ").join("+");if(s===""){a.loader.classList.add("hidden"),n.show(c);return}m=B(r),m||(a.loadButton.classList.add("hidden"),a.gallery.innerHTML="",l=1);const o=new h(r);a.form.reset(),o.getImages().then(t=>{p(t.hits),t.totalHits<15||(d=r,g(t.totalHits)),d=r}).catch(t=>n.show({...c,message:"Bad request"})).finally(()=>{a.loader.classList.add("hidden")})}function g(e){const s=Math.ceil(e/15);l<=s?a.loadButton.classList.remove("hidden"):(a.loadButton.classList.add("hidden"),n.show({...c,message:"We're sorry, but you've reached the end of search results.",backgroundColor:"blue"}))}function v(){const e=I();window.scrollBy(0,e*2)}async function A(){a.loadButton.classList.add("hidden"),a.loader.classList.remove("hidden"),a.loader.classList.toggle("under-btn"),l+=1,new h(d,l).getImages().then(s=>{p(s.hits),g(s.totalHits),a.loader.classList.add("hidden"),a.loader.classList.toggle("under-btn"),v()})}function p(e){e.length!==0?(S(e),E()):n.show({...c,message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"red"})}function B(e){if(l>1)return d==e}function E(){const e=new y(".gallery a",{captionSelector:"img",captionsData:"alt",captionDelay:250});e.on("show.simplelightbox"),e.refresh()}
//# sourceMappingURL=commonHelpers.js.map
