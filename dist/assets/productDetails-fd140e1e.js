import{_ as y,u as I,a as k,r as i,c as D,o as a,b as c,d as t,t as d,e as l,f as b,g as p,p as w,h as x}from"./index-bbf74f1f.js";import C from"./notFound-cf726e11.js";const R=s=>(w("data-v-37f9c4d5"),s=s(),x(),s),S={key:0,id:"page-wrap"},B={id:"img-wrap"},$=["src"],A={id:"product-details"},N={id:"price"},T={key:1,class:"green-button",id:"add-to-cart"},U={key:2,class:"grey-button",id:"add-to-cart"},V=R(()=>t("h4",null,"Description",-1)),_="/api",E={__name:"productDetails",setup(s){const g=I(),h=k(),r=i(!1),v=i([]),u=g.params.id,e=i([]);(async()=>{const o=await p.get(`${_}/products/${u}`);e.value=o.data;const m=await p.get(`${_}/users/1459/cart`);v.value=m.data})();async function f(){await p.post(`${_}/users/1459/cart`,{productId:u}),r.value=!0,setTimeout(()=>{h.push("/products")},1500)}const n=D(()=>v.value.some(o=>o.id===u));return(o,m)=>e.value?(a(),c("div",S,[t("div",B,[t("img",{src:e.value.imageUrl},null,8,$)]),t("div",A,[t("h1",null,d(e.value.name),1),t("h3",N,d(e.value.price),1),t("p",null," Average Rating: "+d(e.value.averageRating),1),!r.value&&!n.value?(a(),c("button",{key:0,id:"add-to-cart",onClick:f},"Add to Cart")):l("",!0),r.value&&!n.value?(a(),c("button",T,"Successfully Added item to the cart!")):l("",!0),n.value?(a(),c("button",U,"Item is already added")):l("",!0),V,t("p",null,d(e.value.description),1)])])):(a(),b(C,{key:1}))}},q=y(E,[["__scopeId","data-v-37f9c4d5"]]);export{q as default};
