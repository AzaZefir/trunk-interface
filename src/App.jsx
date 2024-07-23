import style from "./App.module.scss";
import InventoryInterface from "./components/InventoryInterface";

import logo from "./assets/logo.svg";
import { InventoryProvider } from "./app/context/InventoryContext";

function App() {
  return (
    <InventoryProvider>
      <section className={style.wrapper}>
        <img src={logo} alt="GTA-5" className={style.logo} />
        <InventoryInterface />
      </section>
    </InventoryProvider>
  );
}

export default App;
