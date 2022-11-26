let today = moment();
let saveData = [];

$('currentDay').text(today.format('MMMM Do YYYY, h:mm a'));

const containerEl = $('.container');

const hours = [
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
];

var inputEl = $('input').val();

function renderedInput() {
    for (var i = 0; i < hours.length; i++) {
        var hourlyDiv = $('<div>').addClass('row');
        containerEl.append(hourlyDiv);
 
        const currentDate =  moment(hours[i], 'H')

        const formattedHour = currentDate.format('hha')

        var hourEl = $('<span>').text(formattedHour).addClass('col-1 text-center hour pt-2').data({hours: [i]});
        hourlyDiv.append(hourEl);

        var textInput = $('<input>', {type: 'text', id: i, placeholder: 'write daily task here'}).addClass('col-10 textarea');
        hourlyDiv.append(textInput);

        var saveBtn = $('<button>', {id: i}).text('Save').addClass('col-1 btn saveBtn').attr('data-uid', i);
        hourlyDiv.append(saveBtn);

        presentColor(i);
    }

    const localStorageData =  JSON.parse(localStorage.getItem('tasks'));
    if(localStorageData){
        saveData = localStorageData;
    }

    localStorageData.forEach((item, index) => {
        const textData = localStorageData[index];
        $(`input[id=${index}]`).val(textData);
    })

    $('button').on('click', function(event){
        const value = $(event.target).siblings('input').val();
        const index = parseInt($(event.target).attr('data-uid'));
        saveData[index] = value;
        saveToLocalStorage();
    });

}

function presentColor(i) {
    let currentHour = moment().format('H');
    console.log(currentHour)
    if (currentHour == hours[i]) {
        $(`input[id=${i}]`).addClass('present')
    } else if (currentHour < hours[i]) { 
        $(`input[id=${i}]`).addClass('future')
    } else {
        $(`input[id=${i}]`).addClass('past')
    }
}
function saveToLocalStorage() {
   localStorage.setItem('tasks', JSON.stringify(saveData));
}

renderedInput();