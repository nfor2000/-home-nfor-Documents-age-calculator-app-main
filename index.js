const [log, doc] = [console.log, document];

const months = [
  { id: 1, days: 31 },
  { id: 2, days: 28 },
  { id: 3, days: 31 },
  { id: 4, days: 30 },
  { id: 5, days: 31 },
  { id: 6, days: 30 },
  { id: 7, days: 31 },
  { id: 8, days: 31 },
  { id: 9, days: 30 },
  { id: 10, days: 31 },
  { id: 11, days: 30 },
  { id: 12, days: 31 },
];

const date = new Date();
const [currentYear, currentMonth, currentDay] = [
  parseInt(date.getFullYear()),
  parseInt(date.getMonth()) + 1,
  parseInt(date.getDate()),
];

const circularBtn = doc.querySelector('.circle');
const [Year, Month, Day] = [
  doc.querySelector('#year'),
  doc.querySelector('#month'),
  doc.querySelector('#day'),
];

const [yearEl, monthEl, dayEl] = [
  doc.querySelector('#year-value'),
  doc.querySelector('#month-value'),
  doc.querySelector('#day-value'),
];

const inputFields = doc.querySelectorAll('.input-box input');

log(currentYear, currentMonth, currentDay);

function handleClick() {
  const month = months.find((m) => m.id === currentMonth);
  const day = currentDay < Day.value ? month.days + currentDay - Day.value : currentDay - Day.value;
  dayEl.innerText = day;
  const m = currentMonth - 1 < Month.value ? currentMonth - 1 + 12 - Month.value : currentMonth - 1 - Month.value;
  const y = m < 0 ? currentYear - 1 - Year.value : currentYear - Year.value;
  monthEl.innerText = m;
  yearEl.innerText = y;
}

function checkInput(array) {
  array.forEach((element) => {
    const re = /^[0-9]+$/;
    if (element.value.trim() === '') {
      const parent = element.parentElement;
      const error = parent.querySelector('#error');
      parent.className = 'input-box error';
      error.innerText = 'This field is required';
    } else if (!re.test(element.value.trim())) {
      const parent = element.parentElement;
      const error = parent.querySelector('#error');
      parent.className = 'input-box error';
      error.innerText = 'Input must be numerical';
    } else {
      const parent = element.parentElement;
      parent.className = 'input-box success';
      element.dataset.verified = 'true';
    }
  });
}

function checkValue(input, max) {
  if (input.value > max || input.value < 1) {
    const parent = input.parentElement;
    const error = parent.querySelector('#error');
    if (input.id === 'year') {
      parent.className = 'input-box error';
      error.innerText = `Must be in the past`;
    } else {
      parent.className = 'input-box error';
      error.innerText = `Must be a valid ${input.id}`;
    }
    input.dataset.verified = 'false';
  }
}

function checkLength(input, minLength) {
  if (input.value.length < minLength) {
    const parent = input.parentElement;
    const error = parent.querySelector('#error');
    parent.className = 'input-box error';
    error.innerText = 'Input not valid';
    input.dataset.verified = 'false';
  }
}

function checkDaysInMonth() {
  const month = months.find((m) => m.id === parseInt(Month.value));
  if (month && parseInt(Day.value) > month.days) {
    const parent = Day.parentElement;
    const error = parent.querySelector('#error');
    parent.className = 'input-box error';
    error.innerText = 'Must be a valid date';
    Day.dataset.verified = 'false';
    for(let i = 1; i < inputFields.length;i++){
      const parent = inputFields[i].parentElement;
      const error = parent.querySelector('#error');
      parent.className = 'input-box error';
      error.innerText = '';
    }
  }
}

circularBtn.addEventListener('click', () => {
  checkInput([Year, Day, Month]);
  checkValue(Day, 31);
  checkLength(Year, 4);
  checkValue(Year, currentYear);
  checkValue(Month, 12);
  checkDaysInMonth();
  if (inputFields[0].dataset.verified === 'true' && inputFields[1].dataset.verified === 'true' && inputFields[2].dataset.verified === 'true') {
    handleClick();
  }
  inputFields.forEach((input) => {
    if (input.value === '') {
      const parent = input.parentElement;
        const error = parent.querySelector('#error')
        parent.className = 'input-box error'
        error.innerText = "This field is required"
      }
    })
});
document.addEventListener("keydown",function (e) {
  if(e.key ==="Delete"){
    inputFields.forEach(element=>{
      element.value = ""
    })
  } 
})
function getId(input){
    
    if (input.id === 'year'){
        return "past"
    }else{
        return input.id
    }
}
