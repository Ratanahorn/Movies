 const url = "https://api.themoviedb.org/3/movie/popular";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjgwYTUyM2E0ZTUxOWQ0NWUyNmZlZjNlY2U1NzJkNCIsIm5iZiI6MTc2OTU4NDA4NS4wODMwMDAyLCJzdWIiOiI2OTc5YjVkNTVjNTdiZmU4N2ExNGU3Y2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.O2gPPxrNLAlXl_mmaNzVcMs5AiBfMaMAFItyxbrvC80`,
  },
};
const filter = [
  { title: "All" },
  { title: "Movies" },
  { title: "TV Show" },
  { title: "2024" },
  { title: "Action" },
];
const filterList = document.getElementById("filter");
filterList.innerHTML = filter
  .map((f) => {
    return `
  <li class="flex justify-center py-1 px-1 sm:py-1.5 sm:px-4 text-white bg-gray-700 rounded-2xl hover:bg-blue-600">${f.title}</li>

  `;
  })
  .join("");

let allMovies;
  const cardsList = document.getElementById("card");
function getMovie(page){
  cardsList.innerHTML=``;
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options)
  .then((res) => res.json())
  .then((res)=>{
    console.log(res);
    allMovies=res.results;
    
    allMovies.forEach((m) =>{
      console.log(res.results);
      cardsList.innerHTML+=`
      <div class="h-130 mt-2.5 border border-white rounded-xl hover:border-red-500 hover:-translate-y-2.5 cursor-pointer transition-all duration-200 overflow-hidden">
          <img class="w-full h-[60%] object-cover" src="https://image.tmdb.org/t/p/w500//${m['backdrop_path']}" alt="">
          <div class="px-4 text-white flex flex-col gap-2.5">
            <h1 class="font-bold text-2xl mt-2.5 line-clamp-1">${m.title}</h1>
            <span>${m.vote_average.toFixed(1)}/10</span>
            <span class="line-clamp-2">${m.overview}</span>
            <div class="w-full flex justify-between mt-3">
              <button class="w-[49%] border p-2 rounded-xl  bg-red-500 hover:-translate-y-2 hover:bg-blue-400 cursor-pointer"> watch</button>
              <button class="w-[49%] border p-2 rounded-xl hover:-translate-y-2 cursor-pointer">save</button>
            </div>
          </div>
  </div>
      `;
    });
  });


}
let page=1;
getMovie(page);
const pages=document.getElementById("page");
pages.innerHTML=page;
document.getElementById("btn_next").addEventListener("click",function(){
page++;
getMovie(page);
pages.textContent=page;
});

document.getElementById("btn_previous").addEventListener("click", function(){
  page--
  if(page<1){
    page=1
  }
  getMovie(page)
  pages.textContent=page;
});
const search = document.getElementById("search");
search.addEventListener("input", function() {
  cardsList.innerHTML="";
  const searching = allMovies.filter(p=>
    p.title.toLowerCase().includes(search.value.toLowerCase())
  );
  searching.forEach(m=>{
    cardsList.innerHTML+=`
    <div class="h-130 mt-2.5 border border-white rounded-xl hover:border-red-500 hover:-translate-y-2.5 cursor-pointer transition-all duration-200 overflow-hidden">
          <img class="w-full h-[60%] object-cover" src="https://image.tmdb.org/t/p/w500//${m['backdrop_path']}" alt="">
          <div class="px-4 text-white flex flex-col gap-2.5">
            <h1 class="font-bold text-2xl mt-2.5 line-clamp-1">${m.title}</h1>
            <span>${m.vote_average.toFixed(1)}/10</span>
            <span class="line-clamp-2">${m.overview}</span>
            <div class="w-full flex justify-between mt-3">
              <button class="w-[49%] border p-2 rounded-xl  bg-red-500 hover:-translate-y-2 hover:bg-blue-400 cursor-pointer"> watch</button>
              <button class="w-[49%] border p-2 rounded-xl hover:-translate-y-2 cursor-pointer">save</button>
            </div>
          </div>
  </div>
    `;
  })
})


const btn_menu = document.getElementById("menuBtn");
const mobile = document.getElementById("mobile");

btn_menu.addEventListener("click", ()=>{
  mobile.classList.toggle("hidden")
});
