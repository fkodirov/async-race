import GaragePage from "../../pages/garage";
import { newApp } from "../..";
import mark from "../cars/mark";
import model from "../cars/mark";
import colors from "../cars/colors";

function getAction(e:Event){
  const count=document.querySelectorAll(`[value="${(<HTMLInputElement>e.target).value}"]`);
    const index=Array.from(count).indexOf(<HTMLElement>e.target);
    // console.log(count.length);
    // console.log(index);
  if((<HTMLInputElement>e.target).value=='start'){
    let data:{velocity:number,distance:number};
    async function start (){
      const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${index+1}&status=started`,
        {
          method: 'PATCH',
        }
      );
      data = await response.json();}
    if(!(<HTMLInputElement>document.querySelector('[value="race"]')).hasAttribute('disabled')){
      Promise.resolve((start)())
        .then(()=>{startAnimation(data.distance,data.velocity,index)});
    }
    else{
    (function getStart(){
    (start)();
    
    setTimeout(()=>{startAnimation(data.distance,data.velocity,index)},2000)
    
  })(); } 
}
else if((<HTMLInputElement>e.target).value=='remove'){
(async function deletecar(){
      await fetch(
        `http://127.0.0.1:3000/garage/${(<HTMLElement>e.target).id}`,
        {
          method: 'DELETE',
        }
      );
  })()
  
}
else if((<HTMLInputElement>e.target).value=='select'){
    (<HTMLInputElement>document.querySelector('[value="update"]')).setAttribute('active', document.querySelectorAll('[value="remove"]')[index].id);
    (<HTMLInputElement>document.querySelector('#newname')).value=document.querySelectorAll('.name')[index].innerHTML;
    (<HTMLInputElement>document.querySelector('#newcolor')).value=(<string>document.querySelectorAll('.car')[index].getAttribute('fill'));
  }
}
    function startAnimation(distance:number,velocity:number,index:number){
      const stops = document.querySelectorAll("[value='stop']");
        (<HTMLInputElement>(stops[index])).onclick=function(){
          (async ()=>{ await fetch(`http://127.0.0.1:3000/engine?id=${index+1}&status=stopped`, {
            method: 'PATCH'
            }).then(()=>{
              clearInterval(timer);
              (<HTMLElement>document.querySelectorAll('.car')[index]).style.left='';
            }

            )

          })();
          
        };

    (async function getDrive(){ fetch(`http://127.0.0.1:3000/engine?id=${index+1}&status=drive`, {
          method: 'PATCH'
          }).then(res => res.ok ? res : Promise.reject(res))
          // .then(data => console.log('+', data))
          .catch(() => {clearInterval(timer);});})();
      let endtime=distance/velocity;
      let sdvig=endtime/((<HTMLElement>document.querySelector('.track-go')).clientWidth-115);
      let start = Date.now();
      let timer = setInterval(function(){
        let timePassed = Date.now() - start;
        if (timePassed >= endtime) {
          clearInterval(timer);
          if((<HTMLInputElement>document.querySelector('#winnername')).value==''){
          (<HTMLInputElement>document.querySelector('#winnername')).value='qwerty';
          if((<HTMLInputElement>document.querySelector('[value="race"]')).hasAttribute('disabled')){
          (<HTMLElement>document.querySelector('.wow')).innerHTML=`${(<HTMLElement>document.querySelectorAll('.name')[index]).textContent} went 1st ${(endtime/1000).toFixed(2)}s`;
          (<HTMLElement>document.querySelector('.wow')).style.display='block';}
          // alert(`${(<HTMLElement>document.querySelectorAll('.name')[index]).textContent} ${endtime/1000}`);
          }
          (<HTMLElement>document.querySelectorAll('.car')[index]).style.left=`calc(${100}vw - ${(100-((<HTMLElement>document.querySelector('.track-go')).clientWidth-115)/window.innerWidth*100)/100*window.innerWidth}px)`;
          return;
        }
        draw(timePassed);
      
      }, 20);
      
      // в то время как timePassed идёт от 0 до timeend 
      // left изменяет значение от 0px до vw-115px
      function draw(timePassed:number) {
        (<HTMLElement>document.querySelectorAll('.car')[index]).style.left = (timePassed /sdvig).toFixed(4)  + 'px';
      }
    }

      

    

async function startrace(e:Event){
  if((<HTMLInputElement>e.target).value=='race'){
    (<HTMLInputElement>e.target).setAttribute('disabled','disabled');
    const count=document.querySelectorAll('#start');
    const index=Array.from(count).indexOf(<HTMLElement>e.target);
    // (<HTMLInputElement>count[1]).click();

  await Promise.allSettled([count.forEach((e)=>(<HTMLInputElement>e).click())])
  
}
else if((<HTMLInputElement>e.target).value=='reset'){
  const count=document.querySelectorAll('[value="stop"]');
  await Promise.allSettled([count.forEach((e)=>(<HTMLInputElement>e).click())])
  .then(()=>{(<HTMLElement>document.querySelector('.wow')).style.display='none';
    setTimeout(()=>{
      (<HTMLInputElement>document.querySelector('[value="race"]')).removeAttribute('disabled');
      (<HTMLInputElement>document.querySelector('#winnername')).value='';
  },2000)})
}
else if((<HTMLInputElement>e.target).value=='generate-cars'){
  generateCar();}
}
async function generateCar(){
  for(let i:number=0;i<10;i++){
    let rand=Math.floor(Math.random() * mark.length);
    let rand2=Math.floor(Math.random() * mark.length);
    let rand3=Math.floor(Math.random() * colors.length);

    let data={name: `${mark[rand]} ${model[rand2]}`, color: `${colors[rand3]}`};
    const response = await fetch(
      `http://127.0.0.1:3000/garage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }
    )
  }
}

async function createcar(e:Event){
    let data={name: (<HTMLInputElement>document.querySelector('#name')).value, color: (<HTMLInputElement>document.querySelector('#color')).value};
      const response = await fetch(
        `http://127.0.0.1:3000/garage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        }
      )
}

async function updatecar(e:Event){
    const count=document.querySelectorAll(`[value="${(<HTMLInputElement>e.target).value}"]`);
    const index=Array.from(count).indexOf(<HTMLElement>e.target);
    let data={name: (<HTMLInputElement>document.querySelector('#newname')).value, color: (<HTMLInputElement>document.querySelector('#newcolor')).value};
      const response = await fetch(
        `http://127.0.0.1:3000/garage/${(<HTMLElement>e.target).getAttribute('active')}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        }
      )
}






export  {getAction};
export  {startrace};
export  {createcar};
export  {updatecar};
export  {generateCar};

