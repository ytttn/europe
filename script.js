function switchPage(pageId, buttonElement) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    const tabs = document.querySelectorAll('.tab-menu .tab-item');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    buttonElement.classList.add('active');
}

function switchShoppingTab(categoryName, listId, tabElement) {
    document.querySelectorAll('.sub-tab').forEach(tab => tab.classList.remove('active'));
    tabElement.classList.add('active');
    document.getElementById('shopping-title').innerText = categoryName + '清單';
    const inputField = document.getElementById('new-item-input');
    inputField.placeholder = '新增至 ' + categoryName + '...';
    inputField.dataset.target = listId; 
    document.querySelectorAll('.shopping-list-container').forEach(list => list.classList.remove('active'));
    document.getElementById(listId).classList.add('active');
}

function toggleCheck(itemElement) {
    itemElement.classList.toggle('checked');
    saveShoppingLists(); 
}

function addNewShoppingItem() {
    const inputField = document.getElementById('new-item-input');
    const itemName = inputField.value.trim();
    const targetListId = inputField.dataset.target; 
    
    if (itemName !== "") {
        const listContainer = document.getElementById(targetListId);
        const newItemHTML = `
            <div class="shopping-item" onclick="toggleCheck(this)">
                <div class="checkbox"></div>
                <div class="item-text"><h4>${itemName}</h4><p>自行新增</p></div>
                <button class="delete-btn" onclick="deleteShoppingItem(this, event)">✖</button>
            </div>
        `;
        listContainer.insertAdjacentHTML('beforeend', newItemHTML);
        inputField.value = ""; 
        saveShoppingLists(); 
    }
}

function deleteShoppingItem(btnElement, event) {
    event.stopPropagation();
    btnElement.closest('.shopping-item').remove();
    saveShoppingLists();
}

function saveShoppingLists() {
    const lists = ['europe-list-fashion', 'europe-list-beauty', 'europe-list-souvenir'];
    lists.forEach(listId => {
        const listContainer = document.getElementById(listId);
        localStorage.setItem(listId, listContainer.innerHTML);
    });
}

function loadShoppingLists() {
    const lists = ['europe-list-fashion', 'europe-list-beauty', 'europe-list-souvenir'];
    lists.forEach(listId => {
        const savedData = localStorage.getItem(listId);
        if (savedData) {
            document.getElementById(listId).innerHTML = savedData;
        }
    });
}

window.onload = function() {
    loadShoppingLists();
};