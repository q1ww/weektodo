const buttonAddListBtn = document.querySelector('.buttonAddList__btn'),
      overZadachInput = document.querySelector('.overZadach__input'),
      ulLists = document.querySelector('.ulLists')

      
let mas = []
let weekDays = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
]


if(localStorage.getItem('ToDo')){
    mas = JSON.parse(localStorage.getItem('ToDo'))
    renderLists()
}

buttonAddListBtn.addEventListener('click', function(e){
    let date = new Date()
let weekDayss = date.getDay()
let days = weekDays[weekDayss]
let hours = date.getHours()
let minurts = date.getMinutes();
minurts = minurts < 10 ? "0" + minurts : minurts;

let sbor = days + " - " + hours + ":" + minurts;


   e.preventDefault()
    if(!overZadachInput.value) return
    const obj = {
        myText: overZadachInput.value,
        doit: false,
        dates: sbor
    }
    
    mas.push(obj)
    renderLists()
    overZadachInput.value = ""
})



function renderLists(e){
    let renderText = "";
    mas.forEach((item,i) =>{
        console.log(item)
        renderText += `
        <li class="ulList">
        
        <div class="ulList__flex">
         <div class="ulList__in"><p  class="${item.doit ? "impot" : ''}">${item.myText}</p></div>
           <div class="imgOverBloks">
               <div class="ulList__galochka">
              <img src="https://s1.iconbird.com/ico/2013/12/517/w512h5121386955471success.png" data-sdelano="${i}" class="ulList__galochka-img" alt="sdelano">
           </div>
           <div class="ulList__remove" >
              <img src="https://www.freeiconspng.com/thumbs/x-png/x-png-15.png" data-index="${i}" alt="remove" class="ulList__remove-img">
           </div>
           </div>
          </div>
          <div class="ulList__data">${item.dates}</div>
       </li>       
        `;
        
    })
        ulLists.innerHTML = renderText
        localStorage.setItem('ToDo', JSON.stringify(mas))
}


function justDela(e){
    e.preventDefault()
    let target = e.target;
    if(target.classList.contains('ulList__galochka-img')){
        mas.filter((item,ind) =>{
            let doiting = target.dataset.sdelano;
            if(ind == doiting){
                item.doit = !item.impot;
                renderLists()
            }
                
        })
        
        
    }
    
}


function notDela(e){
    e.preventDefault()
    let target = e.target;
     if(target.classList.contains('ulList__remove-img')){
        let index = target.dataset.index 
        console.log(index);
        mas = mas.filter((item, idx) => idx != index );
        renderLists()
     }
    
    
}

ulLists.addEventListener('click', justDela)
ulLists.addEventListener('click', notDela)
   
    

















