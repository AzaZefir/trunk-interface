import style from "./App.module.scss";
import InventoryInterface from "./components/InventoryInterface";

function App() {
  return (
    <section className={style.wrapper} >
      <InventoryInterface />
    </section>
  );
}

export default App;
