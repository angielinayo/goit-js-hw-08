// HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.
// form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>
// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
import throttle from 'lodash.throttle';
const contactForm = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

fillContactFormFields();

contactForm.addEventListener('submit', onContactFormSubmit);
contactForm.addEventListener('input', throttle(onInputChange, 500));

function onInputChange(event) {
  let userInfoFromLS = localStorage.getItem(LOCALSTORAGE_KEY);
  userInfoFromLS = userInfoFromLS ? JSON.parse(userInfoFromLS) : {};
  userInfoFromLS[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(userInfoFromLS));
}

function onContactFormSubmit(event) {
  let userInfoFromLS = localStorage.getItem(LOCALSTORAGE_KEY);
  event.preventDefault();
  if (userInfoFromLS) {
    console.log(userInfoFromLS);
    contactForm.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
  } else {
    alert('Please enter all the fields');
    return false;
  }
}

function fillContactFormFields() {
  let userInfoFromLS = localStorage.getItem(LOCALSTORAGE_KEY);
  if (userInfoFromLS) {
    userInfoFromLS = JSON.parse(userInfoFromLS);
    Object.entries(userInfoFromLS).forEach(([name, value]) => {
      contactForm.elements[name].value = value;
    });
  }
}

// import throttle from 'lodash.throttle';
// const contactForm = document.querySelector('.feedback-form');
// const userInfo = {};

// const fillContactFormFields = () => {
//   try {
//     const userInfoFromLS = JSON.parse(
//       localStorage.getItem('feedback-form-state')
//     );

//     if (userInfoFromLS === null) {
//       return;
//     }

//     for (const prop in userInfoFromLS) {
//       console.log();
//       contactForm.elements[prop].value = userInfoFromLS[prop];
//       userInfo[prop] = userInfoFromLS[prop];
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// fillContactFormFields();

// const onInputChange = event => {
//   const { target } = event;

//   const name = target.name;
//   const value = target.value;

//   userInfo[name] = value;
//   localStorage.setItem('feedback-form-state', JSON.stringify(userInfo));
// };

// const onContactFormSubmit = event => {
//   event.preventDefault();
//   if (userInfo.email && userInfo.message) {
//     console.log(userInfo);
//     contactFormEl.reset();
//     localStorage.removeItem('feedback-form-state');
//     userInfo = {};
//   } else {
//     alert('Please fill all the fields');
//     return false;
//   }
// };

// contactForm.addEventListener('input', throttle(onInputChange, 500));
// contactForm.addEventListener('submit', onContactFormSubmit);
