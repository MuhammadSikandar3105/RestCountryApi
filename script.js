let countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter');
const searchInput = document.querySelector('.search input');

let allcountriesData

// fetch('https://restcountries.com/v3.1/all')
//     .then((res) => res.json())
//     .then((data) => {
//         data.forEach(country => {
//             let card = `
// <a href="#" class="cards">
//                     <img src=${country.flags.svg} alt="flag">
//                     <div class="detail">
//                         <h3>${country.name.common}</h3>
//                         <p><b>Population: </b>${country.population}</p>
//                         <p><b>Region: </b>${country.region}</p>
//                         <p><b>Capital: </b>${country.capital}</p>
//                     </div>
//                 </a>
// `
//             countriesContainer.innerHTML += card
//             // console.log(country.flags.svg)
//         });
//     }).catch((err) => {
//         console.log(err)
//     })

// ======== Async await by using function
// const fetchcards = async () => {
//     const response = await fetch('https://restcountries.com/v3.1/all')
//     try {
//         const data = await response.json()
//         data.map((country) => {
//             let card = `
//         <a href="#" class="cards">
//                             <img src=${country.flags.svg} alt="flag">
//                             <div class="detail">
//                                 <h3>${country.name.common}</h3>
//                                 <p><b>Population: </b>${country.population}</p>
//                                 <p><b>Region: </b>${country.region}</p>
//                                 <p><b>Capital: </b>${country.capital}</p>
//                             </div>
//                         </a>
//         `

//             countriesContainer.innerHTML += card
//         })
//     } catch (error) {
//         console.log(error)
//         alert('An error accur')
//     }

// }

// fetchcards()


// ======= by creating element
const fetchcards = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all')
    try {
        const data = await response.json()
        renderCountriesData(data)
        allcountriesData = data
    } catch (error) {
        console.log(error)
        alert('An error accur')
    }

}

fetchcards()


filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
        .then((res) => res.json())
        .then(renderCountriesData)
})


const renderCountriesData = (data) => {
    countriesContainer.innerHTML = ''
    data.map((country) => {
        const countryCard = document.createElement('a')
        countryCard.classList.add('cards')
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.innerHTML = `
                        <img src=${country.flags.svg} alt=${country.name.common}>
                        <div class="detail">
                            <h3>${country.name.common}</h3>
                            <p><b>Population: </b>${country.population.toLocaleString('en-in')}</p>
                            <p><b>Region: </b>${country.region}</p>
                            <p><b>Capital: </b>${country.capital}</p>
                        </div>
    `

        countriesContainer.append(countryCard)
    })
}

searchInput.addEventListener('input', (e) => {
    const filterdCountry = allcountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value))
    renderCountriesData(filterdCountry)
})