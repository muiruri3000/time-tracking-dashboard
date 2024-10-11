const day = document.querySelector('#daily'); 
const week = document.querySelector('#weekly'); 
const month = document.querySelector('#monthly'); 
const card = document.querySelector('.card');
const buttons = document.querySelectorAll('button');

let fetchedData = [];  // Initialize fetchedData

function addActiveClass(btn){
    buttons.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Fetch the data only once the DOM is fully loaded
    fetchFile();
});

// Event listeners for the buttons
day.addEventListener('click', () => {
    if (fetchedData.length > 0) {
        loader(fetchedData, 'daily', 'today');
        addActiveClass(day);
    } else {
        console.error('Data not loaded yet.');
    }
});

week.addEventListener('click', () => {
    if (fetchedData.length > 0) {
        loader(fetchedData, 'weekly', 'week');
        addActiveClass(week);
    } else {
        console.error('Data not loaded yet.');
    }
});

month.addEventListener('click', () => {
    if (fetchedData.length > 0) {
        loader(fetchedData, 'monthly', 'month');
        addActiveClass(month);
    } else {
        console.error('Data not loaded yet.');
    }
});

// Fetch data from JSON and call the loader after data is fetched
function fetchFile(){
    fetch('http://localhost:3000/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        fetchedData = data;
        console.log('Data fetched successfully:', fetchedData);  // Debug: See fetched data
        // Activate week by default and load weekly data
        addActiveClass(week); 
        loader(fetchedData, 'weekly', 'week');  // Load weekly data as default
    })
    .catch(error => console.error('Error Fetching File', error));
}

// Function to dynamically load data into cards
function loader(fetchedData, time, period) {
    if (fetchedData && fetchedData.length > 0) {
        fetchedData.forEach((item, index) => {
            const cardIndex = index + 2;
            const existingCard = document.querySelector(`.card__${cardIndex}`);

            if (!existingCard) {
                // Insert new card content
                card.insertAdjacentHTML('beforeend', `
                    <div class="card-grid card__${cardIndex} card__design">
                        <div class="session" id="session${cardIndex}">
                            <div class="image">
                                <img src="./images/icon-play.svg" alt="">
                            </div>
                            <div class="session__type">
                                <div class="session__type__activity">
                                    <h4>${item.title}</h4>
                                    <span>...</span>
                                </div>
                                <div class="session__type__duration">
                                    <h5>${item.timeframes[time].current} hrs</h5>
                                    <span>${period === 'today' ? 'Today' : 'Last ' + period} - ${item.timeframes[time].previous} hrs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            } else {
                // Update existing card content
                const duration = existingCard.querySelector('.session__type__duration h5');
                const previousSpan = existingCard.querySelector('.session__type__duration span');

                duration.textContent = `${item.timeframes[time].current} hrs`;
                previousSpan.textContent = `${period === 'today' ? 'Today' : 'Last ' + period} - ${item.timeframes[time].previous} hrs`;
            }
        });
    } else {
        console.error('No data available for loader');
    }
}
