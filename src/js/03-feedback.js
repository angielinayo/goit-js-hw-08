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
const userInfo = {};

const fillContactFormFields = () => {
  try {
    const userInfoFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    if (userInfoFromLS === null) {
      return;
    }

    // console.log(contactForm.elements.email);
    // console.log(contactForm.elements.message);

    for (const prop in userInfoFromLS) {
      console.log();
      contactForm.elements[prop].value = userInfoFromLS[prop];
    }
  } catch (error) {
    console.log(error);
  }
};

fillContactFormFields();

const onInputChange = event => {
  const { target } = event;

  const name = target.name;
  const value = target.value;

  userInfo[name] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(userInfo));
};

const onContactFormSubmit = event => {
  event.preventDefault();
  console.log(userInfo);
  contactForm.reset();
  localStorage.removeItem('feedback-form-state');
};

contactForm.addEventListener('input', throttle(onInputChange, 500));
contactForm.addEventListener('submit', onContactFormSubmit);
