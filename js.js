

const day = document.querySelector('#daily'); 
const week = document.querySelector('#weekly'); 
const month = document.querySelector('#monthly'); 
const card = document.querySelector('.card');
const buttons = document.querySelectorAll('button');

function addActiveClass(btn){

    buttons.forEach(button => button.classList.remove('active'))
    btn.classList.add('active');


}

document.addEventListener('DOMContentLoaded', fetchFile)

addActiveClass(week);
loader(fetchedData,'daily','week')

day.addEventListener('click',() => 
{
    loader(fetchedData,'daily','today')
    addActiveClass(day);

});

    week.addEventListener('click',()=>
    {
        addActiveClass(week);
        loader(fetchedData,'weekly','week')});
        
        month.addEventListener('click',()=>{
            addActiveClass(month);
    
            loader(fetchedData,'monthly','month')});

let fetchedData = []; 


function fetchFile(){
    fetch('http://localhost:3000/data.json')
    .then(response=>{
    if(!response.ok){
        throw new Error(  `HTTP Status: ${response.status}`)
    }
    return response.json()
}
)
    .then(data=>
        fetchedData = data,
        
    ).then(fetchedData=>
        loader(fetchedData, 'weekly', 'week')
    )
   
    .catch(error=>console.error('Error Fetching File', error))
}

function daily(){
    if(fetchedData && fetchedData.length > 0){
        console.log(fetchedData[1].title)

        console.log(fetchedData[1].timeframes.daily)
    }
}
function weekly(){
    if(fetchedData && fetchedData.length > 0){

        console.log(fetchedData[1].timeframes.weekly)
    }
}
function monthly(){
    if(fetchedData && fetchedData.length > 0){

        console.log(fetchedData[1].timeframes.monthly)
    }
}

function loader(fetchedData,time,period){
    if(fetchedData && fetchedData.length > 0){
       
        fetchedData.forEach((item,index) =>{
            const cardIndex = index + 2;
            const existingCard = document.querySelector(`.card__${cardIndex}`);

   if(!existingCard){

        
     card.insertAdjacentHTML('beforeend',`
            
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
<span> ${period === 'today' ? 'Today' : 'Last ' + period} - ${item.timeframes[time].previous} hrs</span>
          </div>
        </div>
      </div>
    </div>
            
            `);
     }else{
        const duration = existingCard.querySelector('.session__type__duration h5');
        const previousSpan = existingCard.querySelector('.session__type__duration span');

        duration.textContent = `${item.timeframes[time].current} hrs`;
        previousSpan.textContent =` ${period === 'today' ? 'Today' : 'Last ' + period} - ${item.timeframes[time].previous} hrs`;

     }
     
     

        });
    }
}
