import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import NewsList from "./components/NewsList";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <NewsList />
    </div>
  );
};

export default App;
