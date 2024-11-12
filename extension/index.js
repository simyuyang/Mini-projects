let myLeads = [];
let oldLeads = [];
const inputButton = document.getElementById('input-btn');
const tabButton = document.getElementById('tab-btn');
const deleteButton = document.getElementById('delete-btn'); 
const inputEl = document.getElementById('input-el');
const unorderedList = document.getElementById('ul-el');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

function render(listOfLeads) {
    let listItems = [];
    for (let i = 0; i < listOfLeads.length; i++) {
        // listItems += "<li><a href='https://" + myLeads[i] + "' target='_blank' rel='noopener noreferrer'>" + myLeads[i] + "</a></li>";
        listItems += `
                    <li>
                        <a href=${listOfLeads[i]} target='_blank' rel='noopener noreferrer'>
                            ${listOfLeads[i]}
                        </a>
                    </li>
                    `;
        // unorderedList.innerHTML += "<li>" + myLeads[i] + "</li>"
        // const li = document.createElement("li");
        // li.textContent = myLeads[i];
        // unorderedList.append(li)
    }
    unorderedList.innerHTML = listItems;
}

// Allows loading of leads saved in the local storage
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// Input button to save input lead and render all leads out into a clickable list of links below
inputButton.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})

// Delete button to remove all saved leads
deleteButton.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

tabButton.addEventListener("click", function() {
    browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
        let tab = tabs[0];
        myLeads.push(tab.url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }, console.error)
})