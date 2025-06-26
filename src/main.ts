// Utility to fetch and display Open Day data from public/OpenDay14.json
import './style.css'
import viteLogo from '/vite.svg'
import tailwindLogo from '/tailwindcss-mark.svg'
import typeScriptLogo from '/typescript.svg'
import cuLogo from '/cu-logo.svg'

async function loadOpenDay() {
  // Use the correct base path for GitHub Pages
 const base = import.meta.env.BASE_URL || "/";
  const res = await fetch(`${base}api/OpenDay.json`);
  const data = await res.json();
  console.log(data)
  return data;
}

function renderOpenDay(data: any) {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  if (!data.topics) {
    app.innerHTML = '<p class="text-red-600">No Open Day data found.</p>';
    return;
  }
  app.innerHTML = `
      <h1 class="text-3xl sm:text-5xl font-bold text-cardiff-red mb-12 text-center">Cardiff University Open Day</h1>
      <div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        ${data.topics
          .map((topic: any) =>
            topic && topic.name
              ? `
          <div class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-cardiff-red/20 transform hover:-translate-y-1">
            <div class="overflow-hidden">
              <img src="${topic.cover_image || cuLogo}" alt="${
                  topic.name
                }" class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div class="p-6 flex flex-col h-full">
              <div class="flex-grow">
                <h2 class="text-xl font-bold text-cardiff-red mb-3">${
                  topic.name
                }</h2>
                <p class="text-gray-600 mb-4 line-clamp-3">
               ${topic.description || ""}
                </p>
                ${
                  topic.programs && topic.programs.length
                    ? `
                  <div class="mt-auto">
                    <div class="flex items-center justify-between">
                      <h3 class="font-semibold text-gray-800 text-sm uppercase tracking-wide">Upcoming Events</h3>
                      <span class="bg-cardiff-red/90 text-white text-xs px-2 py-1 rounded-full">${
                        topic.programs.length
                      }</span>
                    </div>
                    <div class="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                      ${topic.programs
                        .map((prog: any) =>
                          prog && prog.title
                            ? `
                        <div class="bg-gray-50 rounded-lg p-3 border-l-4 border-cardiff-red/30 hover:border-cardiff-red transition-colors duration-200">
                          <div class="font-medium text-gray-800 text-sm mb-1">${
                            prog.title
                          }</div>
                          <div class="flex flex-wrap gap-2 text-xs">
                            ${
                              prog.start_time
                                ? `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium">
                                  ${new Date(
                                    prog.start_time
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}${
                                    prog.end_time
                                      ? " - " +
                                        new Date(
                                          prog.end_time
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })
                                      : ""
                                  }
                                </span>`
                                : ""
                            }
                            ${
                              prog.room
                                ? `<span class="bg-green-100 text-green-800 px-2 py-1 rounded-md font-medium">📍 ${prog.room}</span>`
                                : ""
                            }
                            ${
                              prog.programType?.type
                                ? `<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-md font-medium">${prog.programType.type}</span>`
                                : ""
                            }
                          </div>
                        </div>
                      `
                            : ""
                        )
                        .join("")}
                    </div>
                  </div>
                `
                    : `
                  <div class="mt-auto pt-4">
                    <div class="bg-gray-100 rounded-lg p-4 text-center">
                      <span class="text-gray-500 text-sm">
                      
                      No events scheduled
                      
                      </span>
                    </div>
                  </div>
                `
                }
              </div>
            </div>
          </div>
        `
              : ""
          )
          .join("")}
      </div>
    </div>
  `;
}

loadOpenDay().then(renderOpenDay);
