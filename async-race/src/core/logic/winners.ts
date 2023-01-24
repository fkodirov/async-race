import { TWinners } from "../types";
  async function getWinners(page:number,sort:string,order:string){
      let data:TWinners;
      const response = await fetch(
        `http://127.0.0.1:3000/winners?_page=1&_sort=${sort}&_order=${order}`,
        {
          method: 'GET',
        }
      );
       return data = await response.json();
  }

export default getWinners;