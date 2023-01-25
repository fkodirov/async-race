import { TWinners } from "../types";
  async function getWinners(page:number,sort:string,order:string){
      let result:TWinners;
      let total:string;
      const response = await fetch(
        `http://127.0.0.1:3000/winners?_page=${page}&_sort=${sort}&_order=${order}&_limit=10`,
        {
          method: 'GET',
        }
      );
      total=String(response.headers.get('X-Total-Count'));
      result = await response.json();
       return {result,total}
  }

export default getWinners;