 const loadSport = (searchText, dataLimit) =>{   
    fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?s=${searchText}`)
    .then(response => response.json())
    .then(data => displayPlayer(data.teams, dataLimit))
}

const displayPlayer = (players, dataLimit)=>{
    const sportContainer = document.getElementById('sport-container');
    const showAll = document.getElementById('show-all')
    if(dataLimit && players.length > 9){
      players = players.slice(0, 9);
      showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }
    players.forEach(player =>{
        const sportDIv = document.createElement("div");
        sportDIv.classList.add("col")
        sportDIv.innerHTML = `
        <div class="card text-center p-4 container">
        <img src="${player.strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title pt-3">Title: ${player.strAlternate ? player.strAlternate:"No title found"}</h5>
          <p class="card-text">Gender : ${player.strGender}</p>
          <p class="card-text">League : ${player.strLeague}</p>         
          <p class="card-text">Description : ${player.strDescriptionEN.slice(0, 50)}</p>
          <button onclick="playerDetails()" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#playerModal">
            Show Details
          </button>
        </div>
      </div>
        `
        sportContainer.appendChild(sportDIv);
    })
}
const processField = (dataLimit)=>{
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadSport(searchText, dataLimit) 
}
document.getElementById("btn-search").addEventListener('click', function(){
  processField(10);
})

const playerDetails = ()=>{
  fetch (`https://www.thesportsdb.com/api/v1/json/2/searchevents.php?e=Arsenal_vs_Chelsea`)
  .then(response => response.json())
  .then(data => displayPlayerDetails(data.event[0]))
}

const displayPlayerDetails = modal =>{
  const playerModal = document.getElementById('playerModalLabel');
 
  const relaseDate = document.getElementById('realise-date')
  relaseDate.innerHTML = `
  <p>IdLeague : ${modal.idLeague}</p>
  <p>FileName : ${modal.strFilename}</p>
  <p>Video : ${modal.strVideo}</p>

  `
}

document.getElementById('show-all-btn').addEventListener('click', function(){
  processField();
})
 

