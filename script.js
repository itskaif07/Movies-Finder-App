const warning = document.querySelector('#warning')
const box = document.querySelector('#box')
const search = document.querySelector('#search')
const input = document.querySelector('#input')


search.addEventListener('click', movie)


function toggleButtons() {
  document.querySelector('#subscribe').classList.toggle('hidden');
  document.querySelector('#subscribed').classList.toggle('hidden');
}

document.querySelector('#subscribe').addEventListener('click', toggleButtons);
document.querySelector('#subscribed').addEventListener('click', toggleButtons);

async function movie() {


  try {

    if (input.value === '') {
      warning.classList.remove('hidden')
      warning.innerHTML = 'Please Enter a Name'
      box.classList.add('hidden')
      return
    }
    else{
      warning.classList.add('hidden')
      box.classList.remove('hidden')
    }


    const response = await fetch(
      `https://www.omdbapi.com/?s=${input.value}&apikey=7ef3e7bd`,
    )

    if (response.ok) {
      warning.classList.add('hidden')
    }
    else{
      if(!(box.classList.contains('hidden'))){
        box.classList.add('hidden')
    }
      throw new Error('Movies not found!')
    }

    const data = await response.json()
    console.log(data)


    box.innerHTML = ''

    data.Search.forEach((element) => {

      const poster = element.Poster === 'N/A' ? 'https://akeia.in/wp-content/uploads/2021/09/noimg.jpg' : element.Poster

      box.innerHTML += `<div class="w-[90%] sm:w-[40%] lg:w-[26%] 2xl:w-[22%] h-full rounded-xl bg-[url('${poster}')] bg-cover bg-center shadow-lg hover:shadow-[#222222] mb-4 relative cursor-pointer" onclick = "viewDetails('${element.imdbID}')">
    <div class="h-[15%] bg-[#222222] text-white p-4 overflow-hidden absolute bottom-0 w-full rounded-br-md rounded-bl-md">
        <h1 class="text-lg font-bold text-center">${element.Title}</h1>
        <div class = "flex justify-evenly items-center mt-2">
          <h1 class = "font-semi-bold text-md">Year: ${element.Year}</h1>
          <h1 class = "font-semi-bold text-md">Type: ${element.Type}</h1>
        </div>
</div>
</div>`

      
    })
  } catch (e) {
    warning.classList.remove('hidden')
    warning.innerHTML = "Movie not found!"
    return;
  }
}

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    movie()
  }
})
