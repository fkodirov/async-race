import GaragePage from "../../pages/garage";
import { Winners } from "../..";
import mark from "../constants/mark";
import model from "../constants/mark";
import colors from "../constants/colors";
import Api from "../components/api/api";
// import { json } from "body-parser";

let api = new Api();
function getAction(e: Event) {
  const count = document.querySelectorAll(
    `[value="${(<HTMLInputElement>e.target).value}"]`
  );
  const index = Array.from(count).indexOf(<HTMLElement>e.target);
  if ((<HTMLInputElement>e.target).value == "start") {
    (<HTMLInputElement>e.target).setAttribute("disabled", "disabled");
    (<HTMLInputElement>(
      document.querySelectorAll('[value="remove"]')[index]
    )).setAttribute("disabled", "disabled");
    (<HTMLInputElement>(
      document.querySelectorAll('[value="select"]')[index]
    )).setAttribute("disabled", "disabled");
    if (
      !(<HTMLInputElement>(
        document.querySelector('[value="next"]')
      )).hasAttribute("disabled")
    ) {
      (<HTMLInputElement>document.querySelector('[value="next"]')).setAttribute(
        "disabled",
        "disabled"
      );
      (<HTMLInputElement>document.querySelector('[value="prev"]')).setAttribute(
        "disabled",
        "disabled"
      );
    }

    let id = Number(document.querySelectorAll('[value="remove"]')[index].id);
    if (
      !(<HTMLInputElement>(
        document.querySelector('[value="race"]')
      )).hasAttribute("disabled")
    ) {
      api.start(id).then((data) => {
        startAnimation(data.distance, data.velocity, index);
      });
    } else {
      (function getStart() {
        let data: { velocity: number; distance: number };
        api.start(id).then((r) => {
          data = r;
        });

        setTimeout(() => {
          startAnimation(data.distance, data.velocity, index);
        }, 2000);
      })();
    }
  } else if ((<HTMLInputElement>e.target).value == "remove") {
    api.deleteWinner(Number((<HTMLElement>e.target).id)).finally(() => {
      Winners.renderWinners(1, "id", "ASC");
    });

    api.delete(Number((<HTMLElement>e.target).id));
  } else if ((<HTMLInputElement>e.target).value == "select") {
    (<HTMLInputElement>document.querySelector('[value="update"]')).setAttribute(
      "active",
      document.querySelectorAll('[value="remove"]')[index].id
    );
    (<HTMLInputElement>document.querySelector("#newname")).value =
      document.querySelectorAll(".name")[index].innerHTML;
    (<HTMLInputElement>document.querySelector("#newcolor")).value = <string>(
      document.querySelectorAll(".car")[index].getAttribute("fill")
    );
  }
}
function startAnimation(distance: number, velocity: number, index: number) {
  let id = Number(document.querySelectorAll('[value="remove"]')[index].id);
  const stops = document.querySelectorAll("[value='stop']");
  (<HTMLInputElement>stops[index]).onclick = function () {
    // (<HTMLInputElement>document.querySelectorAll('[value="start"]')[index]).removeAttribute('disabled');
    // (<HTMLInputElement>document.querySelectorAll('[value="remove"]')[index]).removeAttribute('disabled');
    // (<HTMLInputElement>document.querySelectorAll('[value="select"]')[index]).removeAttribute('disabled');

    if (
      (<HTMLInputElement>document.querySelector('[value="prev"]')).hasAttribute(
        "disabled"
      )
    ) {
      (<HTMLInputElement>(
        document.querySelector('[value="next"]')
      )).removeAttribute("disabled");
      (<HTMLInputElement>(
        document.querySelector('[value="prev"]')
      )).removeAttribute("disabled");
    }
    api.stop(id).then(() => {
      clearInterval(timer);
      (<HTMLElement>document.querySelectorAll(".car")[index]).style.left = "";
    });
  };

  api
    .getDrive(id)
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .catch(() => {
      clearInterval(timer);
    });
  const endtime = distance / velocity;
  const sdvig =
    endtime /
    ((<HTMLElement>document.querySelector(".track-go")).clientWidth - 115);
  const start = Date.now();
  const timer = setInterval(function () {
    const timePassed = Date.now() - start;
    if (timePassed >= endtime) {
      clearInterval(timer);
      if (
        (<HTMLInputElement>document.querySelector("#winnername")).value == ""
      ) {
        (<HTMLInputElement>document.querySelector("#winnername")).value =
          "qwerty";
        if (
          (<HTMLInputElement>(
            document.querySelector('[value="race"]')
          )).hasAttribute("disabled")
        ) {
          createWinner(
            Number(document.querySelectorAll('[value="remove"]')[index].id),
            1,
            Number((endtime / 1000).toFixed(2))
          );
          (<HTMLElement>document.querySelector(".wow")).innerHTML = `${
            (<HTMLElement>document.querySelectorAll(".name")[index]).textContent
          } went 1st ${(endtime / 1000).toFixed(2)}s`;
          (<HTMLElement>document.querySelector(".wow")).style.display = "block";
        }
        // alert(`${(<HTMLElement>document.querySelectorAll('.name')[index]).textContent} ${endtime/1000}`);
      }
      (<HTMLElement>(
        document.querySelectorAll(".car")[index]
      )).style.left = `calc(${100}vw - ${
        ((100 -
          (((<HTMLElement>document.querySelector(".track-go")).clientWidth -
            115) /
            window.innerWidth) *
            100) /
          100) *
        window.innerWidth
      }px)`;
      return;
    }
    draw(timePassed);
  }, 20);

  // в то время как timePassed идёт от 0 до timeend
  // left изменяет значение от 0px до vw-115px
  function draw(timePassed: number) {
    (<HTMLElement>document.querySelectorAll(".car")[index]).style.left =
      (timePassed / sdvig).toFixed(4) + "px";
  }
}

async function startRace(e: Event) {
  if ((<HTMLInputElement>e.target).value == "race") {
    (<HTMLInputElement>e.target).setAttribute("disabled", "disabled");
    const count = document.querySelectorAll("#start");
    const stopbuttons = document.querySelectorAll('[value="stop"]');
    const selectbuttons = document.querySelectorAll('[value="select"]');
    const removebuttons = document.querySelectorAll('[value="remove"]');
    const index = Array.from(count).indexOf(<HTMLElement>e.target);
    // (<HTMLInputElement>count[1]).click();

    await Promise.allSettled([
      count.forEach((e) => (<HTMLInputElement>e).click()),
    ]);
    // count.forEach((e)=>(<HTMLInputElement>e).setAttribute('disabled','disabled'))
    // selectbuttons.forEach((e)=>(<HTMLInputElement>e).setAttribute('disabled','disabled'))
    // removebuttons.forEach((e)=>(<HTMLInputElement>e).setAttribute('disabled','disabled'))
    stopbuttons.forEach((e) =>
      (<HTMLInputElement>e).setAttribute("disabled", "disabled")
    );
  } else if ((<HTMLInputElement>e.target).value == "reset") {
    const stopbuttons = document.querySelectorAll('[value="stop"]');
    const selectbuttons = document.querySelectorAll('[value="select"]');
    const removebuttons = document.querySelectorAll('[value="remove"]');
    const startbuttons = document.querySelectorAll('[value="start"]');
    selectbuttons.forEach((e) =>
      (<HTMLInputElement>e).removeAttribute("disabled")
    );
    removebuttons.forEach((e) =>
      (<HTMLInputElement>e).removeAttribute("disabled")
    );
    stopbuttons.forEach((e) =>
      (<HTMLInputElement>e).removeAttribute("disabled")
    );
    startbuttons.forEach((e) =>
      (<HTMLInputElement>e).removeAttribute("disabled")
    );
    await Promise.allSettled([
      stopbuttons.forEach((e) => (<HTMLInputElement>e).click()),
    ]).then(() => {
      setTimeout(() => {
        (<HTMLElement>document.querySelector(".wow")).style.display = "none";
        (<HTMLInputElement>(
          document.querySelector('[value="race"]')
        )).removeAttribute("disabled");
        (<HTMLInputElement>document.querySelector("#winnername")).value = "";
      }, 2300);
    });
  } else if ((<HTMLInputElement>e.target).value == "generate-cars") {
    generateCar();
  }
}
async function generateCar() {
  for (let i = 0; i < 100; i++) {
    const rand = Math.floor(Math.random() * mark.length);
    const rand2 = Math.floor(Math.random() * model.length);
    const rand3 = Math.floor(Math.random() * colors.length);

    const data = {
      name: `${mark[rand]} ${model[rand2]}`,
      color: `${colors[rand3]}`,
    };

    api.generate(data);
  }
}

async function createCar(e: Event) {
  const data = {
    name: (<HTMLInputElement>document.querySelector("#name")).value,
    color: (<HTMLInputElement>document.querySelector("#color")).value,
  };

  await api.create(data);
}

async function updateCar(e: Event) {
  const count = document.querySelectorAll(
    `[value="${(<HTMLInputElement>e.target).value}"]`
  );
  const index = Array.from(count).indexOf(<HTMLElement>e.target);
  const data = {
    name: (<HTMLInputElement>document.querySelector("#newname")).value,
    color: (<HTMLInputElement>document.querySelector("#newcolor")).value,
  };

  await api.update(
    Number((<HTMLElement>e.target).getAttribute("active")),
    data
  );
}

async function createWinner(id: number, wins: number, time: number) {
  api.getWinner(id).then((result) => {
    setTimeout(() => {
      Winners.renderWinners(1, "id", "ASC");
      if (result.id) {
        if (time < result.time) {
          api.updateWinner(id, result.wins + 1, time);
        } else {
          api.updateWinner(id, result.wins + 1, result.time);
        }
      } else {
        const data = { id: id, wins: wins, time: time };
        api.createWinner(data);
      }
    }, 2000);
  });
}

export { getAction };
export { startRace };
export { createCar };
export { updateCar };
export { generateCar };
