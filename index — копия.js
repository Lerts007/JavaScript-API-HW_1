const tableEl = document.querySelector('.table');
const btnBlock = document.querySelector('.btn-block');
const singUp = () => {
    console.log('asdw');
}
const scheduleOfClasses ={}

async function readJSON() {
    try{
        const responce = await fetch('data.json');
        if (!responce.ok) {
        throw new Error('Не удалось получить данныес data JSON');
        }

        const data = await responce.json();

        for (const key1 in data) {
            for (const key in data[key1]) {
                if (key === 'name') {
                    // Добавление в таблицу
                    const html = `
                    <th id='${key1}'>${data[key1][key]}</th>
                    `
                    nameEl.insertAdjacentHTML('beforeend', html);

                    // Добавление в объект
                    if(!scheduleOfClasses[data[key1][key]]){
                        scheduleOfClasses[data[key1][key]] = false
                    }else {
                        console.log('Уже имеется ' + data[key1][key]);
                    }
                }else if(key === 'time'){
                    // Добавление в таблицу
                    const html = `
                    <td>${data[key1][key]}</td>
                    `
                    timeEl.insertAdjacentHTML('beforeend', html);
                }else if(key === 'maxParticipants'){
                    // Добавление в таблицу
                    const html = `
                    <td>${data[key1][key]}</td>
                    `
                    maxParticipantsEl.insertAdjacentHTML('beforeend', html);
                }else if(key === 'currentParticipants'){
                    // Добавление в таблицу
                    const html = `
                    <td>${data[key1][key]}</td>
                    `
                    currentParticipantsEl.insertAdjacentHTML('beforeend', html);
                }
            }

            //Добавление кнопки
            const html = `
                <td><button class='btn'>Записаться</button></td>
            `
            btnBlock.insertAdjacentHTML('beforeend', html);

            // Событие click на кнопку
            const btn = document.querySelectorAll('.btn');
            btn.forEach(el => {
                el.addEventListener('click', singUp)
            })

            localStorage.setItem('schedule', JSON.stringify(scheduleOfClasses))
        }
        console.log(data)
        console.log(scheduleOfClasses);
    }catch(error){
        console.log(`Ошибка: ${error}`);
    }
}



readJSON();