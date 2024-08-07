# React + Vite. Inventory Management System.

Этот проект представляет собой интерфейс системы управления багажником на базе React с реализацией функции drag-and-drop для управления предметами в различных секциях.
Задание размещено на gh-pages по
адрресу : [GitHub Pages](https://azazefir.github.io/trunk-interface/).

![app](https://res.cloudinary.com/drdqjr8r6/image/upload/v1719754159/gta_cqgefm.jpg)

## Оглавление

- [Установка](#установка)
- [Запуск проекта](#Запуск-проекта)
- [Структура проекта](#структура-проекта)
- [Структура данных](#cтруктура-данных)
- [Компоненты и Страницы](#компоненты-и-страницы)

## Установка

1. Клонируйте репозиторий: `https://github.com/AzaZefir/trunk-interface.git`
2. Перейдите в каталог проекта: `cd trunk-interface`
3. Установите зависимости: `npm install`

## Запуск проекта

Выполните команду: `npm run dev`

Приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173).

## Структура проекта

- **app**: Папка с контекстом..
    - **context**: Контексты для управления состоянием приложения
        - **InventoryContext.jsx**: Контекст для управления состоянием инвентаря
- **assets**: Папка для хранения ресурсов, таких как изображения, шрифты и т.д..
- **components**: Содержит компоненты, используемые в проекте.
    - **bag**:
        - **Bag.jsx**: Компонент для отображения и управления портфелем
    - **pocket**:
        - **Pocket.jsx**: Компонент для отображения и управления карманом
    - **trunk**:
        - **Trunk.jsx**: Компонент для отображения и управления багажником
    - **InventoryInterface.jsx**: Компонент для общего интерфейса инвентаря
- **data**: Папка с данными используемые для начальной загрузки инвентаря
    - **index.jsx**: Начальные данные инвентаря для кармана, портфеля и багажника
- **shared**: Папка с общими компонентами, хуки и утилитами.
    - **components**: 
        - **hiddingPlace**:
            - **HiddingPlace.jsx**: Компонент для отображения скрытого инвентаря
        - **inventoryCloseBtn**: 
            - **InventoryCloseBtn.jsx**: Компонент кнопки для закрытия интерфейса инвентаря
        - **inventorySlot**: 
            - **InventorySlot.jsx**: Компонент для отображения и взаимодействия с ячейками 
    - **hooks**: Хуки для работы с состоянием и логикой
        - **useInventoryDragDrop.jsx**: Хук для управления перетаскиванием предметов
    - **inventoryItemTypes**: Папка с типами предметов инвентаря
        - **InventoryItemTypes.jsx**: Типы предметов, используемые в инвентаре
- **utils**: Папка с утилитарными функциями и вспомогательными скриптами.
    - **CalculateTotalSlots.jsx**: Функция для расчета общего количества слотов
    - **CalculateWeight.jsx**: Функция для расчета веса предметов
    - **CheckHidingPlaceWeight.jsx**: Функция для проверки веса предметов в скрытом инвентаре
    - **WeightLimitCheck.jsx**: Функция для проверки ограничения веса
- **App.css**: Файл стилей для основного компонента приложения.
- **App.jsx**: Основной файл компонента приложения на JSX.
- **index.css**: Файл стилей для корневого HTML-элемента.
- **main.jsx**: Основной файл, отвечающий за запуск приложения.

## Структура данных

- **inventoryData, bagData, trunkData**
  ```jsx
  [
   {
     "itemId": 1,
     "name": "Apple",
     "quantity": 3,
     "data": "https://example.com/apple.svg",
     "width": 1,
     "height": 1,
     "weight": 0.5,
     "type": "food"
   },
   ...
  ]   
```

## Компоненты и Страницы
