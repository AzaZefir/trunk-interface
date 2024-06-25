import React from "react";

import style from "./InventoryCloseBtn.module.scss";

const InventoryCloseBtn = () => {
  return (
    <button className={style.inventoryclose}>
      <span className={style.closeBadge}></span>ВЫЙТИ
    </button>
  );
};

export default InventoryCloseBtn;
