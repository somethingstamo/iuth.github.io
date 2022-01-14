
/**
 * 
 * @param {HTMLElement} item 
 */
function initializeItems() {
    let navbar = document.getElementById("navbar")
    for(let i = 0; i < navbar.children.length; i++) {
        let li = navbar.children[i].children
        let secondaries = [], primary
        for(let k = 0; k < li.length; k++) { 
            li[k].onmouseenter = function() {expandItem(li[k])}
            li[k].onmouseleave = function() {dexpandItem(li[k])}
            if(li[k].classList.contains("secondary")) { secondaries.push(li[k]) }
            else if(li[k].classList.contains("primary")) { primary = li[k] }
        }
        let numSecondaries;
        if(navbar.children[i].hasAttribute("items")) { numSecondaries = navbar.children[i].getAttribute("items") } 
        else { numSecondaries = (secondaries.length == 1) ? 2 : secondaries.length }
        for(let l = 0; l < secondaries.length; l++) {
            secondaries[l].style.width = primary.offsetWidth / numSecondaries + "px"
            secondaries[l].classList.add("left")
            secondaries[l].classList.add("right")
        }
        if(secondaries.length == 0) { 
            primary.classList.add("left") 
        } else {
            secondaries[0].classList.add("presistentleft")
            secondaries[secondaries.length - 1].classList.add("persistentright")
        }
        if(secondaries.length < numSecondaries) {
            primary.classList.add("right")
        }
        if(i == navbar.children.length - 1) {
            primary.classList.add("persistentright")
        }
    }
}
initializeItems()

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

    // if(secondaries.length == 0)      { 
    //     primary.style.borderRadius = "0px 0px 10px 10px" 
    // } else if(secondaries.length == 1) { 
    //     primary.style.borderRadius = "0px 0px 10px 0px"
    //     secondaries[0].style.borderRadius = "0px 0px 10px 10px"
    // } else if(secondaries.length == 2) { 
    //     primary.style.borderRadius = "0px 0px 0px 0px" 
    //     secondaries[0].style.borderRadius = "0px 0px 0px 10px"
    //     secondaries[1].style.borderRadius = "0px 0px 10px 0px"
    // }
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
        for(let i = 0; i < secondaries.length; i++) {
            secondaries[i].classList.remove("expanded")
        }
        // primary.style.borderRadius = "0px 0px 0px 0px"
    }
}