export const existeEmLocalStorage = function(data) {
    return localStorage.getItem(data) !== null;
};

export const existeEmLocalStorageEEHRepo = function(data) {
    if(existeEmLocalStorage(data)) {
        //se existir, verifica se é repositório
        var ehRepo = false;
        
        var itemCache = localStorage.getItem(data);

        Object.entries(JSON.parse(itemCache)).forEach(([key, value]) => {
            if(key === "full_name") {
                ehRepo = true;
            }
        })

        return ehRepo;
    } else
        return false;
};

export const existeEmLocalStorageEEHUser = function(data) {
    if(existeEmLocalStorage(data) && !(existeEmLocalStorageEEHRepo(data)))
        return true;
    else
        return false;    
};

export const renderDados = function(repo) {
    var tbody = document.querySelector('table tbody');
    Object.entries(repo).forEach(([key, value]) => {
        var tr = document.createElement('tr');
        
        var td = document.createElement('td');
        td.textContent = key;
        tr.appendChild(td);

        td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);

        tbody.appendChild(tr);
    })

}

export const limparTabelaRepos = function() {
    var tbody = document.querySelector('table tbody');
    tbody.innerHTML = "";
}