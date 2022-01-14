var num = 1
var size = 20
function add() {
    num ++
    document.getElementById("bruh").innerHTML = "bruh " + num;
}

function subtract() {
    num --
    document.getElementById("bruh").innerHTML = "bruh " + num;
}

function expand() {
    size ++
    document.getElementById("bruh").style.fontSize = size + "px";
}

function dexpand() {
    size --
    document.getElementById("bruh").style.fontSize = size + "px";
}

var rainbowActive = false
var o = 0
var rainbowCount = 18
var rainbowIndicesActive = new Array(rainbowCount).fill(false)
var rainbowIndicesDrawn = new Array(rainbowCount).fill(true)

var colors = [], colorsUnsaturated = []
for(let i = 0; i < 7; i++) {
    colors.push("hsl(" + 360 / 8 * i + ", 100%, 50%)")
    colorsUnsaturated.push("hsl(" + 360 / 8 * i + ", 0%, 50%)")
}

function initializeRainbow() {
    let target = document.getElementById("rainbowbase")
    let size = {w: parseInt(target.style.width, 10), 
                h: parseInt(target.style.height, 10)}
    margin = 10

    for(let i = 1; i < rainbowCount; i++) {
        const newSpan = document.createElement("span")
        newSpan.className = "rainbow " + i
        size.w -= margin * 2 
        size.h -= margin * 2
        newSpan.style.width = size.w + "px"
        newSpan.style.height = size.h + "px"
        
        target.appendChild(newSpan)
        target = newSpan
    }
}

function startRainbow() {
    rainbowActive = true
}

function stopRainbow() {
    rainbowActive = false
}

function moveRainbow() {
    o += 10
    if(rainbowActive) {
        rainbowIndicesActive.unshift(true)
        rainbowIndicesActive.pop()
    } else {
        rainbowIndicesActive.unshift(false)
        rainbowIndicesActive.pop()
    }
    for(let i = 0; i < rainbowCount; i++) {
        if(rainbowIndicesActive[i]) {
            document.getElementsByClassName(i)[0].style.backgroundColor = 
                "hsl(" + (360 / 8 * (i - 1) - o)%360 + ", 100%, 50%)"
            rainbowIndicesDrawn[i] = true
        } else if(rainbowIndicesDrawn[i]) {
            document.getElementsByClassName(i)[0].style.backgroundColor = 
            "hsl(360, 0%, " + String(50 + i / rainbowCount * 50) + "%)"
            rainbowIndicesDrawn[i] = false
        }
    }
}

var slidePercents = []
function slide() {
    let slides = document.getElementsByTagName("slide")
    for(let i = 0; i < slides.length; i++) {
        if(!slides[i].hasAttribute("index")) {
            slides[i].setAttribute("index", slidePercents.length)
            slidePercents.push(-10)
        }
        slidePercents[i] += 0.2
        if(slidePercents[i] >= 100) {
            slidePercents[i] = -10
        }
        slides[i].style.left = slidePercents + "%"
    }
}

function smile() {
    smile_span = document.getElementById("smile")
    if(!smile_span.hasAttribute("state")) {
        smile_span.setAttribute("state", 0)
    } 

    const faces = [":)", ":D", ";)", ":>"]
    state = smile_span.getAttribute("state")
    state = (parseInt(state) + 1) % (faces.length)
    smile_span.setAttribute("state", state)
    smile_span.innerHTML = faces[state]

}

var sidebarOpen = false
function toggleSidebar() {
    sidebarElements = document.getElementById("sidebarlist").children
    let newClassName
        
    if(!sidebarOpen) {
        document.getElementById("sidebar").style.left = "0px"
        document.getElementById("sidebarline").style.width = "100%"
        document.getElementById("menuimg").src = "x.png"
        newClassName = "clickable"
    } else {
        document.getElementById("sidebar").style.left = "-300px"
        document.getElementById("sidebarline").style.width = "calc(100% - 50px)"
        document.getElementById("menuimg").src = "menu.png"
        newClassName = ""
    }
    
    for(let i = 0; i < sidebarElements.length; i++) {
        sidebarElements[i].className = newClassName
    }
    sidebarOpen = !sidebarOpen
}

var pong = {
    ballActive: false,
    mouseInPong: false,
    ballVel: {x: -1, y: 1},
    ballRect: undefined,
    paddleRect: undefined,
    divSize: undefined
}

function resetPongBall() {
    pong.ballRect.x = pong.divSize.w / 2 - pong.ballRect.w / 2
    pong.ballRect.y = pong.divSize.h / 2 - pong.ballRect.h / 2
}

function initializePong() {
    paddle = document.getElementById("leftpaddle")
    divPos = document.getElementById("pong").getBoundingClientRect()
    ball = document.getElementById("ball")

    pong.divSize = {w: divPos.width, h: divPos.height}
    if(pong.paddleRect == undefined) {
        pong.paddleRect = {x: parseInt(paddle.style.left), y: parseInt(paddle.style.top),
                          w: parseInt(paddle.style.width), h: parseInt(paddle.style.height)};
    }
    if(pong.ballRect == undefined) {
        pong.ballRect = {x: 0, y: 0, w: parseInt(ball.style.width), h: parseInt(ball.style.height)}
    }

    resetPongBall()

    ball.style.left = pong.ballRect.x + "px"
    ball.style.top = pong.ballRect.y + "px"
}

function mouseEnterPong() {
    pong.mouseInPong = true
}

function mouseExitPong() {
    pong.mouseInPong = false
}

function manuallyMovePongPaddle(event) {
    divPos = document.getElementById("pong").getBoundingClientRect()
    
    relativePos = {x: event.clientX - divPos.x, y: event.clientY - divPos.y}

    pong.paddleRect.y = relativePos.y - pong.paddleRect.h / 2
    pong.paddleRect.y = Math.min(Math.max(pong.paddleRect.y, 0), divPos.height - pong.paddleRect.h)
    
    document.getElementById("leftpaddle").style.top = pong.paddleRect.y + "px"
}

function autoMovePongPaddle() {
    
}

function movePongBall() {
    pong.ballRect.x += pong.ballVel.x
    pong.ballRect.y += pong.ballVel.y

    if(pong.ballRect.y <= 0 || pong.ballRect.y >= pong.divSize.h - pong.ballRect.h) {
        pong.ballVel.y = -pong.ballVel.y
    }
    if(pong.ballRect.x <= 0) {
        resetPongBall()
    }
    if(pong.ballRect.x >= pong.divSize.w - pong.ballRect.w) {
        pong.ballVel.x = -pong.ballVel.x
    }
    if(pong.ballRect.x <= pong.paddleRect.x + pong.paddleRect.w && pong.ballRect.x + pong.ballRect.w >= pong.paddleRect.x &&
        pong.ballRect.y <= pong.paddleRect.y + pong.paddleRect.h && pong.ballRect.y + pong.ballRect.h >= pong.paddleRect.y) {
        pong.ballVel.x = Math.abs(pong.ballVel.x)
    }

    ball = document.getElementById("ball")
    ball.style.left = pong.ballRect.x + "px"
    ball.style.top = pong.ballRect.y + "px"
}

function updatePong() {
    movePongBall()
    if(!pong.mouseInPong) {
        autoMovePongPaddle()
    }
}

function onResize() {
    rectElements = document.getElementsByClassName("rect")
    width = document.getElementById("body").clientWidth
    numBoxes = Math.min( Math.floor(width / 350), rectElements.length)
    for(let i = 0; i < rectElements.length; i++) {
        rectElement = rectElements[i].getBoundingClientRect()
        newMargin = Math.max((width - 350 * numBoxes) / (2 * numBoxes), 0)
        rectElements[i].style.marginLeft = newMargin + "px"
        rectElements[i].style.marginRight = newMargin + "px"
    }
    for(let i = numBoxes - 1; i < rectElements.length; i += numBoxes) {
        rectElements[i].style.marginRight = "0px"
    }
}

function randomizeLink() {
    link = document.getElementById("wimtwitter")
    tweets = [
        "https://twitter.com/wim96020542/status/1219684895422701568",
        "https://twitter.com/wim96020542/status/1219684238934458368",
        "https://twitter.com/wim96020542/status/1113308566444593153",
        "https://twitter.com/wim96020542/status/1136469760743317504",
        "https://twitter.com/wim96020542/status/1102037301335482368"
    ]
    link.href = tweets[Math.floor(Math.random() * tweets.length)];
}

window.addEventListener('resize', onResize);

initializeRainbow()
initializePong()
randomizeLink()
onResize()
setInterval(moveRainbow, 50)
setInterval(slide, 10)
setInterval(movePongBall, 10)