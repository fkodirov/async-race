import GaragePage from "../../pages/garage";
import { Winners } from "../..";
import mark from "../cars/mark";
import model from "../cars/mark";
import colors from "../cars/colors";
import { json } from "body-parser";

function getAction(e:Event){
  const count=document.querySelectorAll(`[value="${(<HTMLInputElement>e.target).value}"]`);
    const index=Array.from(count).indexOf(<HTMLElement>e.target);
    // console.log(count.length);
    // console.log(index);
  if((<HTMLInputElement>e.target).value=='start'){
    (<HTMLInputElement>e.target).setAttribute('disabled','disabled');
    (<HTMLInputElement>document.querySelectorAll('[value="remove"]')[index]).setAttribute('disabled','disabled');
    (<HTMLInputElement>document.querySelectorAll('[value="select"]')[index]).setAttribute('disabled','disabled');
    if(!(<HTMLInputElement>document.querySelector('[value="next"]')).hasAttribute('disabled')){
      (<HTMLInputElement>document.querySelector('[value="next"]')).setAttribute('disabled','disabled');
      (<HTMLInputElement>document.querySelector('[value="prev"]')).setAttribute('disabled','disabled');
    }
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
  deletewinner(Number((<HTMLElement>e.target).id)).finally(()=>{Winners.renderWinners(1,'id','ASC');});
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
          (<HTMLInputElement>document.querySelectorAll('[value="start"]')[index]).removeAttribute('disabled');
          (<HTMLInputElement>document.querySelectorAll('[value="remove"]')[index]).removeAttribute('disabled');
          (<HTMLInputElement>document.querySelectorAll('[value="select"]')[index]).removeAttribute('disabled');

          if((<HTMLInputElement>document.querySelector('[value="prev"]')).hasAttribute('disabled')){
            (<HTMLInputElement>document.querySelector('[value="next"]')).removeAttribute('disabled');
            (<HTMLInputElement>document.querySelector('[value="prev"]')).removeAttribute('disabled');
          }
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
            createwinner(Number(document.querySelectorAll('[value="remove"]')[index].id),1,Number((endtime/1000).toFixed(2)));
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
    const stopbuttons=document.querySelectorAll('[value="stop"]');
    const selectbuttons=document.querySelectorAll('[value="select"]');
    const removebuttons=document.querySelectorAll('[value="remove"]');
    const index=Array.from(count).indexOf(<HTMLElement>e.target);
    // (<HTMLInputElement>count[1]).click();

  await Promise.allSettled([count.forEach((e)=>(<HTMLInputElement>e).click())])
  // count.forEach((e)=>(<HTMLInputElement>e).setAttribute('disabled','disabled'))
  // selectbuttons.forEach((e)=>(<HTMLInputElement>e).setAttribute('disabled','disabled'))
  // removebuttons.forEach((e)=>(<HTMLInputElement>e).setAttribute('disabled','disabled'))
   stopbuttons.forEach((e)=>(<HTMLInputElement>e).setAttribute('disabled','disabled'))
  
}
else if((<HTMLInputElement>e.target).value=='reset'){
    const stopbuttons=document.querySelectorAll('[value="stop"]');
    const selectbuttons=document.querySelectorAll('[value="select"]');
    const removebuttons=document.querySelectorAll('[value="remove"]');
    const startbuttons=document.querySelectorAll('[value="start"]');
      // selectbuttons.forEach((e)=>(<HTMLInputElement>e).removeAttribute('disabled'));
      // removebuttons.forEach((e)=>(<HTMLInputElement>e).removeAttribute('disabled'));
      stopbuttons.forEach((e)=>(<HTMLInputElement>e).removeAttribute('disabled'));
      // startbuttons.forEach((e)=>(<HTMLInputElement>e).removeAttribute('disabled'));
  await Promise.allSettled([stopbuttons.forEach((e)=>(<HTMLInputElement>e).click())])
  .then(()=>{
    setTimeout(()=>{
      (<HTMLElement>document.querySelector('.wow')).style.display='none';
      (<HTMLInputElement>document.querySelector('[value="race"]')).removeAttribute('disabled');
      (<HTMLInputElement>document.querySelector('#winnername')).value='';
  },2000)})
}
else if((<HTMLInputElement>e.target).value=='generate-cars'){
  generateCar();}
}
async function generateCar(){
  for(let i:number=0;i<100;i++){
    let rand=Math.floor(Math.random() * mark.length);
    let rand2=Math.floor(Math.random() * model.length);
    let rand3=Math.floor(Math.random() * colors.length);

    let data={name: `${mark[rand]} ${model[rand2]}`, color: `${colors[rand3]}`};
    await fetch(
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

async function createwinner(id:number,wins:number,time:number){
  getwinner(id).then((result)=>{
    setTimeout(()=>{Winners.renderWinners(1,'id','ASC');
      if(result.id){
        if(time<result.time){
          updatewinner(id,result.wins+1,time);
        }
        else{
          updatewinner(id,result.wins+1,result.time);
        }
      }
      else{
        (async()=>{let data={id: id, wins: wins,time:time};
        const response = await fetch(
          `http://127.0.0.1:3000/winners`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
            }
        )
          })();
      }
    },2000)
  })
    
}

async function getwinner(id:number){
  let data:{id:number,wins:number,time:number};
    const response = await fetch(
      `http://127.0.0.1:3000/winners/${id}`,
      {
        method: 'GET',
      }
    )
    data= await response.json();
    return data;
}

async function updatewinner(id:number,wins:number,time:number){
  let data={wins: wins,time:time};
    const response = await fetch(
      `http://127.0.0.1:3000/winners/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }
    )
    
}
async function deletewinner(id:number){
  await fetch(
    `http://127.0.0.1:3000/winners/${id}`,
    {
      method: 'DELETE',
    }
  );
}







export  {getAction};
export  {startrace};
export  {createcar};
export  {updatecar};
export  {generateCar};

