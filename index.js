let toDoTitle = 'Список дел'
let task = 'Дело'
let toDoElemInputs;

let toDos = [
    { id:1, value: task, status:'not done'},
    { id:2, value: task, status:'not done'},
    { id:3, value: task, status:'not done'},
]

const toHTML = toDo => `
    <label class="toDo-elem list-group-item" id="elem-${toDo.id || 'newId'}" data-id="${toDo.id}">
        <div class="toDo-elem-item">
            <input class="toDo-elem-check-input form-check-input me-1" type="checkbox" ${toDo.status === 'done'?'checked':''}>
            <input class="toDo-elem-text" type="text" value="${toDo.value || task}" disabled="disabled">
        </div>
        <a href="#" class="btn btn-default" style="padding: 5px; font-size: 12px;">
            <img src="svg/bucket-fill.svg" class="toDo-elem-bucket" data-btn="elem-del" data-id="${toDo.id}" alt="del">   
        </a>
        </button>
    </label>
`

function render() {
    const toDoList = toDos.map((toDos) => toHTML(toDos)).join('')
    document.querySelector('#toDo-list').innerHTML = toDoList
}

render()

const toDoList = {
    addToDo() {
        if(toDos.length === 0){
            document.querySelector('hr').classList.remove("hide")
        }
        
        let arrId = toDos.map(function(el) {
            return el.id
        })
        let maxId = Math.max(...arrId)
        let toDo = {id:+`${(maxId>0) ? (maxId+1) : 1}`, value: task, status:'not done'}
        
        toDos.push(toDo)
        document.querySelector('#toDo-list').insertAdjacentHTML('beforeend', toHTML(toDo))
        render()
    },
    delToDo() {
        const toDo = document.querySelectorAll('.toDo-elem')[toDos.length-1]
        toDos.pop(toDo)
        render()
        if(toDos.length === 0){
            document.querySelector('hr').classList.add("hide")
        }
    },
    clearToDo() {
        toDos = []
        render()
        document.querySelector('hr').classList.add("hide")
    },
    setToDoTitle(title) {
        document.querySelector('.toDo-title').value = title
    },
    setToDoTasks(text) {
        task = text
        toDos.map(item => item.value = text)
        render()
    }
}

const plus = document.querySelector('[data-btn="list-add"]');
plus.addEventListener('click', toDoList.addToDo)

const minus = document.querySelector('[data-btn="list-del"]');
minus.addEventListener('click', toDoList.delToDo)

const clear = document.querySelector('[data-btn="list-clear"]');
clear.addEventListener('click', toDoList.clearToDo)

document.querySelector('.toDo-title').innerText = toDoTitle


document.addEventListener('click', event => {
    const id = +event.target.dataset.id
    const toDo = toDos.find(e => e.id === id)
    if (event.target.dataset.btn === 'elem-del') {
        event.preventDefault()
        $.confirm({
            title: 'Хотите удалить дело?',
        }).then(() => {
            toDos = toDos.filter(e => e.id !== id)
            render()
            console.log(toDos);
        }).catch(() => {
            console.log('Cancel')
        })
    }
    if (event.target.dataset.btn === 'sort') {
        upDownSort()
    }
    // if (event.target.dataset.btn === 'list-clear') {
    //     upDownSort()
    // }
    if (event.target.type === "checkbox" && event.target.checked) {
        let elemId = event.target.parentNode.parentNode.dataset.id
        for (let elem of toDos) {
            if (elem.id === +elemId) {
                elem.status = 'done'
            }
        }
    } else if (event.target.type === "checkbox" && !event.target.checked) {
        let elemId = event.target.parentNode.parentNode.dataset.id
        for (let elem of toDos) {
            if (elem.id === +elemId) {
                elem.status = 'not done'
            }
        }
    }
})
function upDownSort() {
    toDoElemCheckboxInputs = Array.from(document.querySelectorAll('input[type="checkbox"]'))
    toDoElemCheckboxInputs.sort((a,b) => a.checked < b.checked ? -1 : 1)
    console.log(toDoElemCheckboxInputs);

    let arrCheckbox = toDoElemCheckboxInputs.map(elem => +elem.parentNode.parentNode.dataset.id)
    toDos = arrCheckbox.map(function(el) {
        for (let i=0; i < toDos.length; i++) {
            if (toDos[i].id === el) {
                return toDos[i]
            }
        }
    })      
    console.log(toDos);
    render()
    return toDos
}

document.addEventListener('dblclick', toInput)

function toInput() {
    if (event.target.disabled) {
        event.target.removeAttribute('disabled')
        event.target.value = ''
        event.target.focus()
    
        function toDosChange() {
            let value = event.target.value;
            
            let toDoElemTextInputs = Array.from(document.querySelectorAll('input[class="toDo-elem-text"]:not([disabled="disabled"])'))
            let arrText = toDoElemTextInputs.map(elem => +elem.parentNode.parentNode.dataset.id)
            
            for (let i=0; i < toDos.length; i++) {
                if (toDos[i].id === arrText[0]) {
                    toDos[i].value = value
                }
            }
            console.log(toDos);
        }
        
        event.target.onblur = function() {
            toDosChange()
            event.target.setAttribute('disabled','disabled')
        }
        
        document.onkeydown = function(e) {
            if (e.keyCode === 13 ||e.keyCode === 27) {
                toDosChange()
                event.target.setAttribute('disabled','disabled')
            }
        }
    }
}