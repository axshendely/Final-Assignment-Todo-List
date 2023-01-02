const check_duplicates = function (string_to_match) {
    const h3s = document.getElementsByName('inner_tekst')
    for (const h3skeys in h3s) {
        if (h3s[h3skeys].innerText === string_to_match) {
            return true
        }
    }return false
}

const get_task_api = function (data_to_post) {
    if (check_duplicates(data_to_post.toLowerCase(), data_to_post.toLowerCase())) {
        alert("YOU ARE ADDING A DUPLICATE TO THE LIST")
        return false
    }
    else {
        return Posting(make_data(data_to_post))
    }
}

const make_data = function (data_info) {
    return JSON.stringify({
        "description": data_info,
        "done": false,
    })
}
const Gettings = function () {
    return fetch('http://127.0.0.1:3000/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => data)
}

Gettings().then(data => data.forEach(element => {
    if (check_duplicates(element.description) === false) {
        append_task_to_task_list(element.description, element._id)
        return true
    }
    return false
}))

const remove_all = function () {
    return Gettings().then(data => data.map(elements => DELETE_FUNCTION(elements._id)))
        .catch(err => err)
}

const remove_one = function (id_to_remove) {
    return DELETE_FUNCTION(id_to_remove)
}

const DELETE_FUNCTION = function (id_to_remove) {
    return fetch(`http://127.0.0.1:3000/${id_to_remove}`, {
        method: 'DELETE',
    }).then(r => grab_cataloge.removeChild(document.getElementById(id_to_remove)))
}

const Posting = function (json_data) {
    return fetch('http://127.0.0.1:3000', {
         method: 'POST',
         headers: {'Content-type': 'application/json'},
         body: json_data
     }).then(get_info => get_info.json().then(get_id => api_status(get_info.status, JSON.parse(json_data).description, get_id._id)))
}

const Update = function (id_to_update, text_to_update) {
    return fetch(`http://127.0.0.1:3000/${id_to_update}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: make_data(text_to_update)
    }).then(r => document.location.reload())
}

const api_status = function (numbers, text, id_to_stores) {
    if (numbers === 201) {
        return append_task_to_task_list(text, id_to_stores)
    }
}