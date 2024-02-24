import{i as c,S as u}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();class m{constructor(s){this.BASE_URL="https://pixabay.com",this.ENDPOINT="/api/",this.KEY="key=42471766-4e6ef41ee0191e88bcacb27c7",this.parameters={q:`&q=${s}`,image_type:"&image_type=photo",orientation:"&orientation=horizontal",safesearch:"&safesearch=true"},this.PARAMS="";for(const a of Object.values(this.parameters))this.PARAMS+=a;const o=`${this.BASE_URL}${this.ENDPOINT}?${this.KEY}${this.PARAMS}`;this.URL=o}getImages(){return fetch(this.URL).then(s=>s.json())}}const d=document.querySelector(".gallery");function p(e){return`<li class="gallery-card">
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
</li>`}function h(e){const o=e.map(a=>p(a)).join("");f(o)}function f(e){d.insertAdjacentHTML("afterbegin",e)}const n={message:"The search field must be filled!",messageColor:"white",backgroundColor:"red",close:!1,position:"topRight",progressBar:!1,animateInside:!1,timeout:3e3},i={form:document.querySelector(".form"),inputSearch:document.querySelector('[type="search"]'),searchButton:document.querySelector('[type="submit"]'),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadButton:document.querySelector(".btn-load-more")};i.form.addEventListener("submit",g);function g(e){e.preventDefault(),i.gallery.innerHTML="",i.loader.classList.remove("hidden");const s=i.inputSearch.value.trim(),o=s.split(" ").join("+");if(s!==""){const a=new m(o);i.loader.classList.remove("hidden"),a.getImages().then(t=>{i.form.reset(),y(t.hits)}).catch(t=>{console.log(t),c.show({...n,message:"Request error"})}).finally(()=>{i.loader.classList.add("hidden")})}else i.loader.classList.add("hidden"),c.show(n)}function y(e){e.length!==0?(h(e),b()):c.show({...n,message:"Sorry, there are no images matching your search query. Please try again!"})}function b(){const e=new u(".gallery a",{captionSelector:"img",captionsData:"alt",captionDelay:250});e.on("show.simplelightbox"),e.refresh()}
//# sourceMappingURL=commonHelpers.js.map
