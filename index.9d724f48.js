function r(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=Array(e);t<e;t++)n[t]=r[t];return n}function e(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(e)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}}(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var t,n=e(document.querySelectorAll(".field-cell")),o=document.querySelector(".button.start"),a=document.querySelector(".game-field"),i=document.querySelector(".game-score"),c=document.querySelectorAll(".message"),s=document.querySelector(".message.message-lose"),u=document.querySelector(".message.message-win"),f=0,l=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];function d(){if(!g()&&!h()){s.classList.remove("hidden");return}for(var r=[],e=0;e<4;e++)for(var t=0;t<4;t++)0===l[e][t]&&r.push({x:e,y:t});if(r.length){var n=r[Math.floor(Math.random()*r.length)];l[n.x][n.y]=.9>Math.random()?2:4}}function m(){for(var r=0;r<4;r++)for(var e=0;e<4;e++){var t=a.rows[r].cells[e];t.className="field-cell field-cell--".concat(l[r][e]),t.textContent=l[r][e]||""}}function v(r){for(var e=y(r),t=0;t<e.length-1;t++)e[t]===e[t+1]&&(e[t]*=2,e[t+1]=0,f+=e[t]);for(e=y(e);e.length<4;)e.push(0);return e}function y(r){return r.filter(function(r){return 0!==r})}function h(){for(var r=0;r<4;r++)for(var e=0;e<4;e++)if(e<3&&l[r][e]===l[r][e+1]||r<3&&l[r][e]===l[r+1][e])return!0;return!1}function g(){for(var r=0;r<4;r++)for(var e=0;e<4;e++)if(0===l[r][e])return!0;return!1}function A(r,e){return JSON.stringify(r)!==JSON.stringify(e)}o.addEventListener("click",function(){o.classList.contains("start")&&(o.classList.remove("start"),o.classList.add("restart"),o.textContent="Restart"),e(c).forEach(function(r){return r.classList.add("hidden")});for(var r=0;r<4;r++)for(var t=0;t<4;t++)l[r][t]=0;e(n).forEach(function(r){r.className="field-cell",r.textContent=""}),f=0,i.textContent=f,d(),d(),m()}),document.addEventListener("keydown",function(r){clearTimeout(t),t=setTimeout(function(){(function(r){if(n.some(function(r){return r.classList.contains("field-cell--".concat(2048))})){u.classList.remove("hidden");return}if(!g()&&!h()){s.classList.remove("hidden");return}switch(r.key){case"ArrowUp":case"ArrowDown":(function(r){for(var t=!1,n=0;n<4;n++){var o=[l[0][n],l[1][n],l[2][n],l[3][n]],a=e(o);"ArrowDown"===r&&o.reverse(),o=v(o),"ArrowDown"===r&&o.reverse();for(var i=0;i<4;i++)l[i][n]=o[i];A(a,o)&&(t=!0)}t&&(d(),m())})(r.key);break;case"ArrowLeft":case"ArrowRight":(function(r){for(var t=!1,n=0;n<4;n++){var o=e(l[n]),a=l[n];"ArrowRight"===r&&a.reverse(),a=v(a),"ArrowRight"===r&&a.reverse(),l[n]=a,A(o,a)&&(t=!0)}t&&(d(),m())})(r.key)}})(r)},100)});
//# sourceMappingURL=index.9d724f48.js.map
