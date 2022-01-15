var audio = new Audio("./kristoffers-playground/click.wav")

function resizeSecondaries() {
    let navbar = document.getElementById("navbar")
    var primaries = []
    for(let i = 0; i < navbar.children.length; i++) {
        let li = navbar.children[i].children
        let secondaries = [], primary, numSecondaries
        for(let k = 0; k < li.length; k++) { 
            if(li[k].classList.contains("secondary")) { secondaries.push(li[k]) }
            else if(li[k].classList.contains("primary")) { primary = li[k]; primaries.push(li[k]) }
        }

        if(navbar.children[i].hasAttribute("items")) { numSecondaries = navbar.children[i].getAttribute("items") } 
        else { numSecondaries = (secondaries.length == 1) ? 2 : secondaries.length }
        secondaryWidth = primary.offsetWidth / numSecondaries
        for(let j = 0; j < secondaries.length; j++) {
            secondaries[j].style.width = secondaryWidth + "px"
            secondaries[j].style.left = j * secondaryWidth + "px"
        }
    }
    divHeight = 1
    divWidth = 0
    maxWidth = navbar.offsetWidth
    for(let i = 0; i < primaries.length; i++) {
        if(divWidth + primaries[i].offsetWidth > maxWidth) {
            divHeight ++
            divWidth = primaries[i].offsetWidth
        } else {
            divWidth += primaries[i].offsetWidth
        }
    } 
    navbar.style.height = divHeight * navbar.offsetHeight
    console.log(divHeight)
}

function initializeItems() {
    let navbar = document.getElementById("navbar")
    for(let i = 0; i < navbar.children.length; i++) {
        navbar.children[i].style.setProperty("--id", i)
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
            secondaries[l].classList.add("left")
            secondaries[l].classList.add("right")
        }
        if(secondaries.length == 0) { 
            primary.classList.add("left") 
            primary.classList.add("right") 
        } else {
            secondaries[0].classList.add("presistentleft")
            secondaries[secondaries.length - 1].classList.add("persistentright")
        }
        if(secondaries.length < numSecondaries) {
            primary.classList.add("right")
        }
        if(navbar.getAttribute("shape") == "full") {
            navbar.style.width = "100%"
            navbar.style.backgroundColor = "gray"
        } else if(navbar.getAttribute("shape") != "hard") {
            if(i == navbar.children.length - 1) {
                primary.classList.add("persistentright")
            }
        }
    }
    resizeSecondaries()

}
initializeItems()
window.addEventListener('resize', resizeSecondaries);

function expandItem(itemExpanding) {
    let allItems = itemExpanding.parentElement.children
    let primary;
    let secondaries = []
    for(let i = 0; i < allItems.length; i++) {
        if(allItems[i].classList.contains("primary")) { primary = allItems[i] }
        else if (allItems[i].classList.contains("secondary")) {  secondaries.push(allItems[i]) }
    }

    itemExpanding.setAttribute("mouseover", true)

    for(let i = 0; i < secondaries.length; i++) {
        secondaries[i].classList.add("expanded")
    }
    primary.classList.add("expanded")
    
    if(itemExpanding.parentElement.parentElement.getAttribute("sound") == "true") {
        const newAudio = audio.cloneNode()
        newAudio.play()
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
        if(secondaries[i].getAttribute("mouseover") == "true") { mouseOverAny = true }
    }
    primary.classList.remove("expanded")

    if(!mouseOverAny) {
        for(let i = 0; i < secondaries.length; i++) {
            secondaries[i].classList.remove("expanded")
        }
        // primary.style.borderRadius = "0px 0px 0px 0px"
    }
}

function badFun() {
    window.open("oops.html", "_blank")
}

setInterval(function() {
    const invisible = document.getElementById("invisible");
    // decrease invisable opacity by 1% every second
    // invisable.style.opacity = invisable.style.opacity - 0.01
    // if(invisable.style.opacity <= 0) {
    //     invisable.style.opacity = 0
    //     invisable.style.display = "none"
    // }
    // console.log(invisible.style.opacity)
}, 1000)