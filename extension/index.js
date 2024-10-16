const inputButton = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
let unorderedList = document.getElementById('ul-el');
let myLeads = [];

function renderLeads() {
    let listItems = "";
    for (let i = 0; i < myLeads.length; i++) {
        listItems += "<li>" + myLeads[i] + "</li>";

        // unorderedList.innerHTML += "<li>" + myLeads[i] + "</li>"
        // const li = document.createElement("li");
        // li.textContent = myLeads[i];
        // unorderedList.append(li)
    }
    unorderedList.innerHTML = listItems;
}

inputButton.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    renderLeads();
})
