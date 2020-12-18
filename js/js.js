const buttonAddListBtn = document.querySelector('.buttonAddList__btn'),
      overZadachInput = document.querySelector('.overZadach__input'),
      ulLists = document.querySelector('.ulLists')

      
let mas = []

if(localStorage.getItem('ToDo')){
    mas = JSON.parse(localStorage.getItem('ToDo'))
    renderLists()
}

buttonAddListBtn.addEventListener('click', function(e){
    
    if(!overZadachInput.value) return
    
    const obj = {
        myText: overZadachInput.value,
        doit: false
    }
    
    mas.push(obj)
    renderLists()
    overZadachInput.value = ""
})


function renderLists(){
    let renderText = "";
    mas.forEach((item,i) =>{
        renderText += `
        <li class="ulList">
           <p  class="${item.doit ? "impot" : ''}">${item.myText}</p>
           <div class="imgOverBloks">
               <div class="ulList__galochka">
              <img src="https://s1.iconbird.com/ico/2013/12/517/w512h5121386955471success.png" data-sdelano="${i}" class="ulList__galochka-img" alt="sdelano">
           </div>
           <div class="ulList__remove" >
              <img src="https://www.freeiconspng.com/thumbs/x-png/x-png-15.png" data-index="${i}" alt="remove" class="ulList__remove-img">
           </div>
           </div>
       </li>       
        `;
        
    })
        ulLists.innerHTML = renderText
        localStorage.setItem('ToDo', JSON.stringify(mas))
}


function justDela(e){
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
   
    

















