const grab_cataloge = document.getElementById('Task_listCatalog')
document.getElementById('add_task_button').addEventListener("click", function () {
    if (document.getElementById('input_textbox').value !== "") {
        return get_task_api(document.getElementById('input_textbox').value)
    }else {
        alert('YOU ARE TYING TO INPUT A EMPTY STRING!')
        return false
    }
})

const append_task_to_task_list = function (task_text, id_to_store) {
    const make_li = document.createElement('li')
    make_li.setAttribute('name', 'li_holders')
    make_li.setAttribute('id', id_to_store)
    const make_paraaf = document.createElement('h3')
    make_paraaf.append(task_text)
    make_paraaf.setAttribute('name', 'inner_tekst')
    make_li.append(make_paraaf)
    const update_button = document.createElement("button")
    update_button.setAttribute('type', 'button')
    update_button.setAttribute('name', 'update_button')
    update_button.setAttribute('value', 'update_task')
    update_button.setAttribute('class', 'btn update_task')
    update_button.innerText = "Update Task"
    make_li.appendChild(update_button)
    const remove_button = document.createElement("button")
    remove_button.setAttribute('type', 'button')
    remove_button.setAttribute('name', 'remove_button')
    remove_button.setAttribute('value', 'remove_task')
    remove_button.setAttribute('class', 'btn remove_task')
    remove_button.innerText = "Remove Task"
    make_li.appendChild(remove_button)
    make_li.addEventListener("click", function (change_value) {
            const button_pressed = change_value.target.value
            switch (button_pressed) {
                case 'remove_task':
                    return remove_one(id_to_store)
                case 'update_task':
                    id_to_store = change_value.currentTarget.id
                    const create_div = document.createElement('div')
                    create_div.setAttribute('id', 'update_div')
                    const inputs = document.createElement('input')
                    inputs.setAttribute('type', 'text')
                    inputs.setAttribute('placeholder', 'input the text to update')
                    inputs.setAttribute('id', 'update_textbox')
                    const up_button = document.createElement("button")
                    up_button.setAttribute('type', 'button')
                    up_button.setAttribute('value', 'text_button')
                    up_button.setAttribute('id', 'text_button')
                    up_button.innerText = "Update Your Task"
                    up_button.addEventListener("click", function () {
                        if (document.getElementById('update_textbox').value !== "") {
                            const text_to_check = document.getElementById('update_textbox').value
                            return Update(id_to_store, text_to_check)
                        }else {
                            alert('YOU ARE TYING TO INPUT A EMPTY STRING!')
                            return false
                        }
                    })
                    create_div.append(inputs)
                    create_div.append(up_button)
                    document.getElementById(change_value.currentTarget.id).replaceChildren(create_div)
            }
    })
    grab_cataloge.appendChild(make_li)
    return grab_cataloge
}
