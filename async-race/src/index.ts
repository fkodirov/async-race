import './styles.css';
// import './pages/main/mainPage.scss';
// import './core/components/footer/footer.scss';
import BaseComponent from './core/templates/component';
import Header from './core/components/header';
//import Footer from './core/components/footer';
import GaragePage from './pages/garage';
import WinnersPage from './pages/winners';
import Page from './core/templates/page';
import Link from './core/templates/link';

const Winners = new WinnersPage('Winners', 'Winners page content');
const routes: Record<string, Page> = {
  garage: new GaragePage('Garage', ''),
  winners: Winners,
};

const notFoundPage = new Page('404', 'Not found');

class App {
  private container: HTMLElement = <HTMLElement>document.getElementById('app');

  activePage?: Page;

  header: Header;

  constructor() {
    this.header = new Header();
  }

  handleRouteChange(): void {
    const hash = window.location.hash.slice(1).toLowerCase();
    const targetPage = hash ? routes[hash] || notFoundPage : routes.garage;
    // console.log(targetPage, this.activePage);

    if (targetPage === this.activePage) return;
    if (this.activePage) this.activePage.remove();
    this.activePage = targetPage;
    this.activePage.renderAfter(this.header);
  }

  start() {
    const nav = new BaseComponent('nav').setClass('nav');
    // // const footer = new Footer('footer', 'footer');

    Object.keys(routes).forEach((route) => {
      new Link(route).render(nav);
    });
    nav.render(this.header);
    this.header.render(this.container);

    this.handleRouteChange();
    window.onpopstate = () => this.handleRouteChange();
    // this.container.insertAdjacentElement('beforeend', footer.render());
  }
}

const app = new App();
app.start();
// console.log(app);
// alert(`
// Добрый день, проверяющий! Дай мне пожалуйста ещё 1 день допилить проект. Спасибо!
// `);
export { Winners };
