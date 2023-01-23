import { TWinners } from "../types";
  async function getWinners(){
      let data:TWinners;
      const response = await fetch(
        `http://127.0.0.1:3000/winners`,
        {
          method: 'GET',
        }
      );
       return data = await response.json();
  }

export default getWinners;