const mainContent = document.querySelector('.maincontent');

const country = new URLSearchParams(window.location.search).get('name');
console.log(country);

const fetchCountry = async () => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
        const data = await response.json();

        // Check if data exists
        if (data && Array.isArray(data)) {
            data.forEach((detail) => {
                const specificCountry = document.createElement('div');
                specificCountry.classList.add('specific-country');

                specificCountry.innerHTML = `
                <div class="flag"><img src="${detail.flags.svg}" alt="flag"></div>
                <div class="country-name">
                    <h2>${detail.name.common}</h2>
                    <p><b>Native Name: </b>${detail.name.nativeName ? Object.values(detail.name.nativeName)[0].common : detail.name.common}</p>
                    <p><b>Population: </b>${detail.population.toLocaleString('en-in')}</p>
                    <p><b>Region: </b>${detail.region}</p>
                    <p><b>Sub Region: </b>${detail.subregion ? detail.subregion : 'No Sub Region'}</p>
                    <p><b>Capital: </b>${detail.capital ? detail.capital[0] : 'N/A'}</p>
                </div>
                <div class="more-detail">
                    <p><b>Top Level Domain: </b>${detail.tld ? detail.tld[0] : 'N/A'}</p>
                    <p><b>Currency: </b>${detail.currencies ? Object.values(detail.currencies).map((currency) => currency.name).join(', ') : 'N/A'}</p>
                    <p><b>Languages: </b>${detail.languages ? Object.values(detail.languages).join(', ') : 'N/A'}</p>
                </div>
                `;

                const borderCountries = document.createElement('div')
                borderCountries.classList.add('border-countries')

                if(detail.borders && detail.borders.length > 0){
                    const borderHeading = document.createElement('p')
                    borderHeading.innerHTML = `<b>Border Countries: </b>`
                    borderCountries.appendChild(borderHeading)
                

                Object.values(detail.borders).forEach ((ele) => {
                        fetch(`https://restcountries.com/v3.1/alpha/${ele}`).then((res) => res.json()).then(([borderCountry]) => {
                            const countriesList = document.createElement('a')
                            countriesList.href = `?name=${borderCountry.name.common}`
                            countriesList.innerText = borderCountry.name.common
                            borderHeading.appendChild(countriesList);
                            console.log(borderCountry.name.common)
                        })
                    })
                }

                // Append the dynamically created element to the main container
                specificCountry.appendChild(borderCountries);
                mainContent.appendChild(specificCountry);
               
            });
        } else {
            console.error('No data found for the specified country.');
        }
    } catch (error) {
        console.error('Error fetching country data:', error);
        mainContent.innerHTML = `<p>Failed to fetch data. Please try again later.</p>`;
    }
};

fetchCountry();

