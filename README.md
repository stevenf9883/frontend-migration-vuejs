# Assignment - Migrate legacy frontend to Vue

## Environment

- Node.js: 12.13.1
- npm: 6.14.9
- vue: 2.6.12

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Scenario

There is a legacy website written in PHP without any framework and the codes are quite messy.  
After a long deliberation, team leader decides to use __Vue__ as the frontend framework for better development experience.  

You are now an employee of the company, as a frontend engineer, your first mission is to do the code refactoring and try to migrate the existed functions written in JavaScript / jQuery to __Vue__.

## Target

1. __(OK)__ Extract CSS and JavaScript __into external files__. You can decide folder structure to store them.
<br/>I use frontend tools __(Item 5)__ npm to manage bootstrap and jQuery. Only bootstrap css is additionally add, because js and css verion is different.
2. __(OK)__ Migrate existed JavaScript / jQuery functions to __Vue__ with version __2.__.
<br/>Vue version 2.6.12.
3. __(OK)__ Use __Vue__ to perform API call in order to get movie data instead of loading local JSON file.
   * API Endpoint - https://hw-web-api.herokuapp.com/api/movie/list.php
   <br/>Only this to call jQuery api, but I personally like to use __axios and vuex without jQuery API__, because vuex has a store like React-Redux
4. __(OK)__ *(Optional)* Use __Vue__ to implement form validation. Make sure each textbox meet its requirement, otherwise show error message in __Red__ under it.  
   * __Title in Chinese__ - *Required*. String length must between 1 to 50.
   * __Title in English__ - *Required*. String length must between 1 to 100 and cannot include the symbols `$`, `%`, `^`, `&`, `*`.
   * __Intro__ - *Required*. String length must between 10 to 255 and need to start with `Intro`. e.g. `Intro: This is ...`, `Intro, Once upon...`.
   <br/>Trigger __on button click then watch__
5. __(OK)__ *(Optional)* Use one of the frontend tools to manage static files. For example, use __Webpack__ or __Bower__ to manage __bootstrap__ and __jQuery__. Describe what tool you use and how you setup.
<br/>Use __npm__
6. *(Optional)* Find any weakness/risk in this application, describe the weakness/risk and how you fix it.
<br/>XSS script injection
Content is automatically escaped. That means in this template:
```html
<h1>{{ userProvidedString }}</h1>
```
if userProvidedString contained:
```javascript
'<script>alert("hi")</script>'
```
then it would be escaped to the following HTML:
```html
&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;
```
