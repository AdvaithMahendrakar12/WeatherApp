const weatherContainer = document.querySelector('.weather-container');
const temperature = document.querySelector('.temperature');
const Location = document.querySelector('.location');
const time = document.querySelector('.time');
const conditionIcon = document.querySelector('.condition-icon');
const conditionText = document.querySelector('.condition-text');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

const weatherImages = {
    'Sunny': 'https://images.pexels.com/photos/681336/pexels-photo-681336.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Clear': 'https://images.pexels.com/photos/681336/pexels-photo-681336.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Partly cloudy': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80&w=1920&h=1080',
    'Cloudy': 'https://images.pexels.com/photos/18950022/pexels-photo-18950022/free-photo-of-smooth.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Overcast': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80&w=1920&h=1080',
    'Mist': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80&w=1920&h=1080',
    'Fog': 'https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&q=80&w=1920&h=1080',
    'Light rain': 'https://images.pexels.com/photos/2078870/pexels-photo-2078870.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Moderate rain': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80&w=1920&h=1080',
    'Heavy rain': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80&w=1920&h=1080',
    'Light snow': 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?auto=format&fit=crop&q=80&w=1920&h=1080',
    'Moderate snow': 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?auto=format&fit=crop&q=80&w=1920&h=1080',
    'Heavy snow': 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?auto=format&fit=crop&q=80&w=1920&h=1080',
    'Thunderstorm': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80&w=1920&h=1080'
};

function updateBackgroundImage(condition) {
    const imageUrl = weatherImages[condition] || 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&q=80&w=1920&h=1080'; // default image
    
    const img = new Image();
    img.src = imageUrl;
    
    document.body.classList.add('loading');

    img.onload = function() {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 300);
    };
    
    img.onerror = function() {
        document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&q=80&w=1920&h=1080')`;
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 300);
    };
}

let target = "Hyderabad";

const fetchData = async () => {
    try {
        document.body.classList.add('loading');
        const url = `https://api.weatherapi.com/v1/current.json?key=099c21419da74701a1394938242408&q=${target}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        temperature.textContent = `${data.current.temp_c} °`;
        Location.textContent = data.location.name;
        time.textContent = `${data.location.localtime}`;
        conditionIcon.src = data.current.condition.icon;
        conditionText.textContent = data.current.condition.text;
        updateBackgroundImage(data.current.condition.text);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Please try again.");
        document.body.classList.remove('loading');
    }
}

fetchData();

searchButton.addEventListener('click', () => {
    target = searchInput.value.trim();
    if (target) {
        fetchData();
    } else {
        alert("Please enter a location to search.");
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        target = searchInput.value.trim();
        if (target) {
            fetchData();
        } else {
            alert("Please enter a location to search.");
        }
    }
});