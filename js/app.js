'use strict';

let
    calendar = document.querySelector('.calendar'),
    calendarHeader = document.querySelector('.calendar-header div span'),
    [buttonToPreviousMonth, buttonToNextMonth] = document.querySelectorAll('.triangle'),
    currentDate = new Date(),
    year = currentDate.getFullYear(),
    month = currentDate.getMonth();


function createCalendar(year, month) {
    const date = new Date(year, month);
    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    createHeader(date);

    for (let i = 0; i < 7; i++) {
        let gridElem = document.createElement('div');
        gridElem.classList.add('calendar-item', 'calendar-item-days-of-week');
        gridElem.textContent += daysOfWeek[i];
        calendar.appendChild(gridElem);
    }

    for (let i = 0; i < getDay(date); i++) {
        let lastDayOfPreviousMonth = new Date(year, month);
        lastDayOfPreviousMonth.setDate(lastDayOfPreviousMonth.getDate() - getDay(date) + i);
        let gridElem = document.createElement('div');
        gridElem.classList.add('calendar-item', 'calendar-item-last-month');
        gridElem.textContent += lastDayOfPreviousMonth.getDate();
        calendar.appendChild(gridElem);
    }

    while (date.getMonth() == month) {
        let gridElem = document.createElement('div');
        gridElem.classList.add('calendar-item', 'calendar-item-this-month');
        calendar.appendChild(gridElem);
        gridElem.textContent += date.getDate();
        date.setDate(date.getDate() + 1);
    }

    let numberOfGridElements = calendar.children.length;

    if (numberOfGridElements < 49) {
        let counter = 1;
        for (let i = numberOfGridElements; i < 49; i++) {
            let gridElem = document.createElement('div');
            gridElem.classList.add('calendar-item', 'calendar-item-next-month');
            gridElem.textContent += counter++;
            calendar.appendChild(gridElem);
        }
    }
}

function getDay(date) {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

function createHeader(date) {
    calendarHeader.textContent = `${date.toLocaleString('ru', {
        year: 'numeric',
        month: 'long'
    })}`;
}

createCalendar(year, month);

buttonToPreviousMonth.addEventListener('click', () => {
    if (month === 0) {
        year--;
        month = 11;
    } else {
        month--;
    }

    calendar.innerHTML = ` `;
    createCalendar(year, month);
});

buttonToNextMonth.addEventListener('click', () => {
    if (month === 11) {
        year++;
        month = 0;
    } else {
        month++;
    }

    calendar.innerHTML = ` `;
    createCalendar(year, month);
});