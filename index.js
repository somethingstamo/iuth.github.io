
/**
 * 
 * @param {HTMLElement} item 
 */
function expandItem(itemExpanding) {
    let allItems = itemExpanding.parentElement.children
    let primary;
    let secondaries = []
    for(let i = 0; i < allItems.length; i++) {
        if(allItems[i].classList.contains("primary")) { primary = allItems[i] }
        else if (allItems[i].classList.contains("secondary")) { secondaries.push(allItems[i]) }
    }

    itemExpanding.setAttribute("mouseover", true)

    for(let i = 0; i < secondaries.length; i++) {
        secondaries[i].classList.add("expanded")
    }
    primary.classList.add("expanded")

    if(secondaries.length == 0)      { 
        primary.style.borderRadius = "0px 0px 10px 10px" 
    } else if(secondaries.length == 1) { 
        primary.style.borderRadius = "0px 0px 10px 0px"
        secondaries[0].style.borderRadius = "0px 0px 10px 10px"
    } else if(secondaries.length == 2) { 
        primary.style.borderRadius = "0px 0px 0px 0px" 
        secondaries[0].style.borderRadius = "0px 0px 0px 10px"
        secondaries[1].style.borderRadius = "0px 0px 10px 0px"
    }
}

function dexpandItem(itemDexpanding) {
    let allItems = itemDexpanding.parentElement.children
    let primary;
    let secondaries = []

    itemDexpanding.setAttribute("mouseover", false)

    for(let i = 0; i < allItems.length; i++) {
        if(allItems[i].classList.contains("primary")) { primary = allItems[i] }
        else if (allItems[i].classList.contains("secondary")) { secondaries.push(allItems[i]) }
    }


    mouseOverAny = primary.getAttribute("mouseover") == "true" ? true : false
    for(let i = 0; i < secondaries.length; i++) {
        if(secondaries[i].getAttribute("mouseover") == true) { mouseOverAny = true }
    }
    primary.classList.remove("expanded")

    if(!mouseOverAny) {
        console.log("hi")
        for(let i = 0; i < secondaries.length; i++) {
            secondaries[i].classList.remove("expanded")
        }
        primary.style.borderRadius = "0px 0px 0px 0px"
    }
}