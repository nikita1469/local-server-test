window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    function req(e) {
        e.preventDefault();

        let person = new FormData(form);
        person.append('id', Math.random());

        let obj = {};
        person.forEach((value, key) => {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        // const request = new XMLHttpRequest();
        // request.open('POST', 'http://localhost:3000/people');
        // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        // request.send(json);   // посылаем запрос на сервер
        // request.addEventListener('load', function() {   // отслеживает стадии обработки запроса

        //     if(request.status == 200) {
        //         let data = JSON.parse(request.response);   // содержит ответ от сервера
        //         console.log(data); 
        //         createCards(data);

        //     } else {
        //         console.error('Что-то пошло не так..');
        //     }
        // });


    // fetch('http://localhost:3000/people')
    //     .then(data => data.json())

        getResource('http://localhost:3000/people', obj)
        .then(data => createCards(data))
        .catch(err => console.error(err));

        // this.remove();
    };

    form.addEventListener('submit', (e) => req(e), {'once': true});  

    async function getResource(url, data) {
        const res = await fetch(`${url}`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        });

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        };

        return await res.json();
    };

    function createCards(resData) {
        resData.forEach(item => {
            let card = document.createElement('div');

            card.classList.add('card');

            let icon;

            if(item.sex === 'male') {
                icon = 'icons/mars.png'
            } else {
                icon = 'icons/female.png'
            };

            card.innerHTML = `
                <img src="${item.photo}" alt="">
                <div class="name">${item.name} ${item.surname}</div>
                <div class="sex">
                <img src="${icon}" alt="male">
                </div>
                <div class="age">${item.age}</div>
            `;

            document.querySelector('.app').appendChild(card);
        });
    };

});