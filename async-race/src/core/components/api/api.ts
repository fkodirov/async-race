import { options, props, TWinners, TGarage } from "../../types";
class Api {
  private static instance: Api;
  private url = "http://127.0.0.1:3000";
  constructor() {
    if (Api.instance) {
      return Api.instance;
    }
    Api.instance = this;
  }

  async start(id: number): Promise<options> {
    const response = await fetch(`${this.url}/engine?id=${id}&status=started`, {
      method: "PATCH",
    });
    return await response.json();
  }

  async delete(id: number): Promise<void> {
    await fetch(`${this.url}/garage/${id}`, {
      method: "DELETE",
    });
  }
  async stop(id: number): Promise<void> {
    await fetch(`${this.url}/engine?id=${id}&status=stopped`, {
      method: "PATCH",
    });
  }

  async getDrive(id: number): Promise<Response> {
    const response = fetch(`${this.url}/engine?id=${id}&status=drive`, {
      method: "PATCH",
    });
    return response;
  }

  async generate(data: { name: string; color: string }) {
    await fetch(`${this.url}/garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async create(data: props) {
    await fetch(`${this.url}/garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async update(id: number, data: props) {
    await fetch(`${this.url}/garage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  async createWinner(data: { id: number; wins: number; time: number }) {
    const response = await fetch(`${this.url}/winners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async getWinner(id: number) {
    const response = await fetch(`${this.url}/winners/${id}`, {
      method: "GET",
    });
    return await response.json();
  }

  async updateWinner(id: number, wins: number, time: number) {
    const data = { wins: wins, time: time };
    const response = await fetch(`${this.url}/winners/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  async deleteWinner(id: number) {
    await fetch(`${this.url}/winners/${id}`, {
      method: "DELETE",
    });
  }
  async getWinners(page: number, sort: string, order: string) {
    let result: TWinners;
    let total: string;
    const response = await fetch(
      `${this.url}/winners?_page=${page}&_sort=${sort}&_order=${order}&_limit=10`,
      {
        method: "GET",
      }
    );
    total = String(response.headers.get("X-Total-Count"));
    result = await response.json();
    return { result, total };
  }

  async getGarage(page: number) {
    const response = await fetch(
      `${this.url}/garage?_page=${Number(page)}&_limit=7`,
      {
        method: "GET",
      }
    );
    return response;
  }

  async getAllCars(): Promise<TGarage[]> {
    const response = await fetch(`${this.url}/garage`, {
      method: "GET",
    });
    return await response.json();
  }
}
export default Api;
