interface Data {
    wind: {
        speed: number,
        deg: number
    },
    name: string,
    main: {
        feels_like: number,
        humidity: number,
        pressure: number,
        temp: number,
        temp_min: number,
        temp_max: number,
    },
    weather: {id: number, main: string, description: string, icon: string}[]
}

const card = (cardItem: Data, index: number) => {
    const {main, name, weather, wind} = cardItem
    let tempStringHTML = `<div class="card" id="${index}">
	<div class="main">
        <h5 class="city">${name}</h5>
        <div class="content">
            <div>
                <h5>Icon</h5>
                <h5>${weather[0].description}</h5>		
            </div>
            <div>
                <h5>Temp: ${Math.floor(main.temp)}&deg;C</h5>
                <h5>Feel: ${Math.floor(main.feels_like)}&deg;C</h5>
            </div>
        </div>
        <button class="info" id="infoBtn" data-card-number="${index}"></button>
	</div>
        <div class="additional" id="additional">
            <div>
                <h5>Wind</h5>
                <p>${wind.speed}</p>
            </div>
            <div>
                <h5>Humidity</h5>
                <p>${main.humidity}</p>
            </div>
            <div>
                <h5>Pressure</h5>
                <p>${main.pressure}hPa</p>
            </div>
        </div>
    </div>`;
    
    return tempStringHTML
}

export class App {
    keyAPI = 'ba6ffd1501fe941bdb28f64bef15f7a9';
    city: string;
    cities: any[] = []

    showInputValue = (e: any) => this.city = e.target.value

    saveDataToStorage = (data: Data): void => {
        const { wind, name, main, weather } = data;
        
        this.cities.push({wind, name, main, weather});
        localStorage.setItem('weatherData', JSON.stringify(data));
        localStorage.setItem('cities', JSON.stringify(this.cities));
    };

    async getWeatherData(city: string): Promise<any> {
        if (city) {
            const URI = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.keyAPI}`
            const response = await fetch(URI)
            const data = await response.json();
            await this.saveDataToStorage(data)
            await this.renderCards();
            return data;   
        } else {
            alert("please enter a city")
        }      
    }
    
    renderCards = (): void => {
        const wrapper: HTMLElement = document.querySelector(".cards");
        if (this.cities.length > 0 && wrapper.childElementCount === 0) {
            this.cities.forEach((element, index) => wrapper.innerHTML += card(element, index))
        } else if (wrapper.childElementCount > 0) {
            for (let i = this.cities.length - 1; i <= this.cities.length; i++){
                wrapper.innerHTML += card(this.cities[i], i);
            }
        }
        else {
            wrapper.innerHTML = 'Add cities that u like to know weather';
        }
    }

    handleMoreInfoBtn = (index: string): void => {
        const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card');
        const card: HTMLElement = cards[Number(index)].children[1] as HTMLElement;

        if (card.style.top === '225px') {
            card.style.top = '0';
        } else {
            card.style.top = '225px';
        }

    }
}

