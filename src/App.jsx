import style from "./App.module.scss";
import InventoryInterface from "./components/InventoryInterface";

import logo from "./assets/logo.svg";

function App() {
  return (
    <section className={style.wrapper}>
      <img src={logo} alt="GTA-5" className={style.logo} />
      <InventoryInterface />
    </section>
  );
}

export default App;
