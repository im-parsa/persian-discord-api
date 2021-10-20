const searchUserForms = document.querySelector('.form-findUser');

const hideAlert = () =>
{
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) =>
{
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

if (searchUserForms)
  searchUserForms.addEventListener('submit', async e =>
  {
    e.preventDefault();

    const searchTutorialFormElements = searchUserForms.elements,
      keyWord = searchTutorialFormElements['keyWord'];

    if (!keyWord.value) return showAlert('warning', `please type a discord-user-id to find it`);
    window.location.href = `/user?id=${keyWord.value}`;
  });
