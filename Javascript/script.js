// ERROR HENDLING
// error hendling yaitu untuk mengatasi error pada code kita kali ini kita akan menggunakan code yang sebelumnya yaitu project api film dengan menggunakan fetch


const tombolSearch = document.querySelector(".tombol-search");
const show = document.querySelector(".show");

tombolSearch.addEventListener('click', async function(){
  const inputSearch = document.querySelector("#search");
  console.log(inputSearch.value);
  try{
    const inputSearch = document.querySelector("#search");
    const movie = await getMovie(inputSearch.value);
    updateUI(movie)
  } catch(err){
   alert(err)
  }

})

function getMovie(keyword){
  return fetch(`http://www.omdbapi.com/?apikey=abeb2402&s=${keyword}`)
  .then(response => {
    if( !response.ok ){
      throw new Error(response.statusText)
    }
    return response.json();
  })
  .then(m => {
    if(m.Response === "False"){
      throw new Error(m.Error)
    }
    return m.Search;
  });
}

function updateUI(movie){
  const cards = document.querySelector('.cards')
  const footer = document.querySelector('footer')
  let card = ''
  movie.forEach(m =>{
    card += showFilm(m);
  })
  cards.innerHTML = card;
  footer.classList.add('footer-bottom')
}

// untuk popup detail di klick
document.addEventListener('click', async function(e){
  if(e.target.className === 'show-details'){
    try{
      const imdbid = e.target.dataset.imdbid;
      const details = await getDetail(imdbid)
      updateDetail(details)
    } catch(err){
      alert(err)
    }
  }
})

function getDetail(imdbid){
  return fetch(`http://www.omdbapi.com/?apikey=abeb2402&i=${imdbid}`)
  .then(response =>{
    if ( !response.ok ){
      throw new Error(response.Response)
    }
    return response.json()
  })
  .then(m => m);
}
function updateDetail(m){
  show.innerHTML = popUP(m)
}



// struktur HTML untuk card
function showFilm(m) {
  return `<div class="card">
  <img src="${m.Poster}" class="gambar" />
  <div class="deskripsi">
  <h4>${m.Title}</h4>
  <h6>${m.Year}</h6>
  <button class="show-details" data-imdbid="${m.imdbID}">Show Details</button>
  </div>
  </div>`;
}

// struktur HTML untuk pop up details
function popUP(m) {
  return `
    <div class="background">
      <div class="pop-up">
        <div class="atas">
          <h5>Movie Details</h5>
        </div>
        <div class="gambar-popUp"><img src="${m.Poster}" /></div>
        <div class="deskripsi-popUp">
          <h2 class="judul">${m.Title} (${m.Year})</h2>
          <div class="director">
            <strong>director : </strong>${m.Director}
          </div>
          <div class="actiors"><strong>actiors : </strong>${m.Actors}</div>
          <div class="writer"><strong>writer : </strong>${m.Writer}</div>
          <div class="plot"><strong>plot : </strong>${m.Plot}</div>
        </div>
        <div class="bawah">
          <button class="button">close</button>
        </div>
      </div>
    </div>
  `;
              }
              
// untuk menghilangkan pop-up
show.addEventListener("click", function (a) {
  if (a.target.className == "button") {
    a.target.parentElement.parentElement.parentElement.style.display = "none";
  } else if (a.target.className == "background") {
    a.target.parentElement.style.display = "none";
  }
});
