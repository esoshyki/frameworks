import Alpine, { Alpine as AlpineType } from 'alpinejs';
import newsList from './components/newsList';
import './style.css'

export type Store = AlpineType['store'];

declare global {
  interface Window {
    Alpine : AlpineType
  }
}

const App = {
  start: () => {
    window.Alpine = Alpine;
    newsList();
    Alpine.start();
  }
};

App.start();