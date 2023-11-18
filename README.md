# **Космическая бургерная**

![img](logo.svg)

## Содержание
 - [О проекте](#О-проекте)
 - [Технологии](#Технологии)
 - [Особенности](#Особенности)
 - [Адрес проекта](#Адрес-проекта)

## О проекте
Веб приложение **Космическая бургерная**. Разработано на курсе [React-разработчик](https://praktikum.yandex.ru/react/). 

Представляет собой приложение интернет-магазин с возможностью регистрации, авторизации, онлайн-заказа, просмотра истории заказов, а так же возможностью узнать состав ингредиентов. 
Бэкенд, база данных пользователей и заказов, API разработано командой Яндекса и хранится на сервере компании отдельно от данного пректа. 
Некоторые страницы защищены авторизацией, передача данных с API проходит через защищенное соединение с валидацией запросов.

## Технологии

- Шаблон приложения развернут с помощью create-react-app
- Использована библиотека UI-компонентов [Яндекс.Практикум.Реакт](https://github.com/yandex-praktikum/react-developer-burger-ui-components)
- Frontend приложения написан с использованием библиотеки [React](https://reactjs.org/)
- Хранилище данных в браузере разработано на Redux
- Лента заказов отражается при помощи Web Sockets
- Для верстки использовался flex, css размещен в виде CSS Modules
- Для тестирования приложения использовани Jest и Cypress

## Особенности
  Проект запускается локально по адресу http://localhost:3000/ путем клонирования данного репозитория и 
  последовательного запуска команд в терминале (должны быть установлены программы Git, NodeJS и менеджер пакетов npm):

```bash
git clone https://github.com/BogdanovSergey/react-burger.git

cd react-burger

npm install

npm run start

npm test //для тестирования:

npm run cypress:open //для тестирования:
```

<a name="technologies"><h2> Стек технологий</h2></a>
<span>
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="html5" alt="html5" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original.svg" title="css" alt="css" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="javascript" alt="javascript" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="typescript" alt="typescript" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="reactjs" alt="reactjs" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="redux" alt="redux" width="40" height="40"/>
</span>


## Адрес проекта
https://artur766.github.io/react-burger/
