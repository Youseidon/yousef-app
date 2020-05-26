const checkEmail = (email, callback) => {
    const url = '/checkEmail?email=' + email;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.result.error) {
                callback(data.result.error, undefined)
            } else {
                callback(undefined, data.result)
            }
        })
    })
}

const emailCheckedForm = document.querySelector('form');
const resultForm = document.querySelector('#result');
const inputForm = document.querySelector('input')

emailCheckedForm.addEventListener('submit', (e) => {
    e.preventDefault();
    resultForm.textContent = "";
    const email = inputForm.value;

    checkEmail(email, (error, { success, email } = {}) => {
        if (error) {
            resultForm.textContent = error;
        } else {
            resultForm.textContent = success + ' ' + email;
        }
    })
})