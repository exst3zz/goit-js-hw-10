import{e as a}from"./assets/error-abb912b1.js";import{i as n}from"./assets/vendor-77e16229.js";const i="/goit-js-hw-10/assets/success-22cb1cf7.svg",t=document.querySelector(".form");function c(r,s=0){const e={theme:"dark",position:"topRight",messageColor:"#ffffff"};switch(r){case"success":return{title:"OK",message:`Fulfilled promise in ${s}ms`,backgroundColor:"#59a10d",iconUrl:i,...e};case"error":return{title:"Error",message:`Rejected promise in ${s}ms`,backgroundColor:"#ef4040",iconUrl:a,...e};case"warning":return{title:"Caution",message:"Make choice more than 0",backgroundColor:"#ffa000",...e};default:return{title:"Error",message:"Unknown problem",backgroundColor:"#ef4040",...e}}}t.addEventListener("submit",r=>{r.preventDefault();const s=Number(t.delay.value),e=t.state.value;if(s<=0){n.warning(c("warning")),t.reset();return}u(s,e).then(o=>n.success(c("success",o))).catch(o=>n.error(c("error",o))),t.reset()});function u(r,s){return new Promise((e,o)=>{setTimeout(()=>{s==="fulfilled"?e(r):o(r)},r)})}
//# sourceMappingURL=commonHelpers2.js.map
