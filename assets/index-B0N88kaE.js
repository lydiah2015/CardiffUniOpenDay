(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const i="/CUOpenDayTest/cu-logo.svg";async function d(){const e=await(await fetch("/CUOpenDayTest/api/OpenDay.json")).json();return console.log(e),e}function l(a){const o=document.querySelector("#app");if(!a.topics){o.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}o.innerHTML=`
      <h1 class="text-3xl sm:text-5xl font-bold text-cardiff-red mb-12 text-center">Cardiff University Open Day</h1>
      <div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        ${a.topics.map(e=>e&&e.name?`
          <div class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-cardiff-red/20 transform hover:-translate-y-1">
            <div class="overflow-hidden">
              <img src="${e.cover_image||i}" alt="${e.name}" class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div class="p-6 flex flex-col h-full">
              <div class="flex-grow">
                <h2 class="text-xl font-bold text-cardiff-red mb-3">${e.name}</h2>
                <p class="text-gray-600 mb-4 line-clamp-3">
               ${e.description||""}
                </p>
                ${e.programs&&e.programs.length?`
                  <div class="mt-auto">
                    <div class="flex items-center justify-between">
                      <h3 class="font-semibold text-gray-800 text-sm uppercase tracking-wide">Upcoming Events</h3>
                      <span class="bg-cardiff-red/90 text-white text-xs px-2 py-1 rounded-full">${e.programs.length}</span>
                    </div>
                    <div class="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                      ${e.programs.map(r=>r&&r.title?`
                        <div class="bg-gray-50 rounded-lg p-3 border-l-4 border-cardiff-red/30 hover:border-cardiff-red transition-colors duration-200">
                          <div class="font-medium text-gray-800 text-sm mb-1">${r.title}</div>
                          <div class="flex flex-wrap gap-2 text-xs">
                            ${r.start_time?`<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium">
                                  ${new Date(r.start_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}${r.end_time?" - "+new Date(r.end_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""}
                                </span>`:""}
                            ${r.room?`<span class="bg-green-100 text-green-800 px-2 py-1 rounded-md font-medium">📍 ${r.room}</span>`:""}
                            ${r.programType?.type?`<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-md font-medium">${r.programType.type}</span>`:""}
                          </div>
                        </div>
                      `:"").join("")}
                    </div>
                  </div>
                `:`
                  <div class="mt-auto pt-4">
                    <div class="bg-gray-100 rounded-lg p-4 text-center">
                      <span class="text-gray-500 text-sm">
                      
                      No events scheduled
                      
                      </span>
                    </div>
                  </div>
                `}
              </div>
            </div>
          </div>
        `:"").join("")}
      </div>
    </div>
  `}d().then(l);
