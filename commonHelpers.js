import{a as g,i as l,S as f}from"./assets/vendor-527658dd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();class m{constructor(t,r){this.BASE_URL="https://pixabay.com",this.ENDPOINT="/api/",this.PARAMS={key:"42471766-4e6ef41ee0191e88bcacb27c7",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:15},this.URL=`${this.BASE_URL}${this.ENDPOINT}`}async getImages(){return(await g.get(this.URL,{params:this.PARAMS})).data}}const y=document.querySelector(".gallery");function L(e){return`<li class="gallery-card">
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
</li>`}function b(e){const r=e.map(o=>L(o)).join("");S(r)}function S(e){y.insertAdjacentHTML("beforeend",e)}function w(){return document.querySelector("ul > li").getBoundingClientRect().height}const n={message:"The search field must be filled!",messageColor:"white",backgroundColor:"red",close:!1,position:"topRight",progressBar:!1,animateInside:!1,timeout:3e3},i={form:document.querySelector(".form"),inputSearch:document.querySelector('[type="search"]'),searchButton:document.querySelector('[type="submit"]'),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadButton:document.querySelector(".btn-load-more")};i.form.addEventListener("submit",P);i.loadButton.addEventListener("click",I);let c=1,u;async function P(e){e.preventDefault(),i.loader.classList.remove("hidden");const t=i.inputSearch.value.trim(),r=t.split(" ").join("+");if(t===""){i.loader.classList.add("hidden"),l.show(n);return}v(r)||(i.loadButton.classList.add("hidden"),i.gallery.innerHTML="",c=1);const s=new m(r);i.form.reset();try{const a=await s.getImages();if(p(a.hits),!(a.totalHits<15)){h(a.totalHits,s.PARAMS.per_page);return}i.loadButton.classList.add("hidden")}catch(a){l.show({...n,message:a.message},console.log(a))}finally{i.loader.classList.add("hidden")}}function h(e,t){const r=Math.ceil(e/t);c<=r?i.loadButton.classList.remove("hidden"):(i.loadButton.classList.add("hidden"),l.show({...n,message:"We're sorry, but you've reached the end of search results.",backgroundColor:"blue"}))}function A(){const e=w();window.scrollBy(0,e*2)}async function I(){i.loadButton.classList.add("hidden"),i.loader.classList.remove("hidden"),i.loader.classList.toggle("under-btn"),c+=1;const e=new m(u,c);try{const t=await e.getImages();p(t.hits),h(t.totalHits,e.PARAMS.per_page),i.loader.classList.add("hidden"),i.loader.classList.toggle("under-btn"),A()}catch(t){l.show({...n,message:t.message}),i.loader.classList.add("hidden")}}function p(e){e.length!==0?(b(e),M()):l.show({...n,message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"red"})}function v(e){if(c===1){u=e;return}return u==e}function M(){const e=new f(".gallery a",{captionSelector:"img",captionsData:"alt",captionDelay:250});e.on("show.simplelightbox"),e.refresh()}
//# sourceMappingURL=commonHelpers.js.map
