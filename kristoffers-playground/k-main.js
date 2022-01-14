var click_effect = new Audio("click.wav");

function OnButtonClick() {
    click_effect.play();
}

function OnMouseOver(element) {
    elements = document.getElementsByClassName(element.className[0]);
    
    for(let i = 0; i< elements.length; i++) {
        elements[i].style.boxShadow = "0px 15px currentColor";
        elements[i].style.marginTop = "-5px";
    }
}

function OnMouseLeave(element) {
    elements = document.getElementsByClassName(element.className[0]);
    
    for(let i = 0; i< elements.length; i++) {
        elements[i].style.boxShadow = "0px 10px currentColor";
        elements[i].style.marginTop = "0px";
    }
}