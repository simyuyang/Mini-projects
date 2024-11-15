let dropdownBtn = document.getElementsByClassName('button');
let section = document.getElementsByClassName('answer-dropdown')
const plusIcon = "assets/images/icon-plus.svg"
const minusIcon = "assets/images/icon-minus.svg"
console.log(section[0])
// Function to swap image of the dropdown button when clicked
function dropdownFn(buttonElement, answerElement) {
    if (buttonElement.src.endsWith("assets/images/icon-plus.svg")) {
        buttonElement.src = `${minusIcon}`;
        answerElement.classList.toggle('open');
    } else {
        buttonElement.src = `${plusIcon}`;
        answerElement.classList.toggle('open');
    }
}

// Apply icon swap by changing src tag in html element for all buttons
for (let i = 0; i < dropdownBtn.length; i++) {
    dropdownBtn[i].addEventListener("click", function() {
        dropdownFn(dropdownBtn[i], section[i]);
    })
}
