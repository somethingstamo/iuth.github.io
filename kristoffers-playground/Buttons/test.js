var indexer = 2;
var audio = new Audio('trueLICK.wav');

window.onload = function() {addNewEl()};

function Click(element) {
    SpawnParticleEffect(element);
    setTimeout(move, 100, element.id);
}

function move(element_id) {
    var element = document.getElementById(element_id);
    audio.play();
    element.innerHTML = parseInt(element.innerHTML) + 1;
    RandomizeSettings(element)
    //let rand = 5;
    let rand = Math.floor(Math.random() * 10)
    if (rand == 5) {
        addNewEl();
    }
}

function ClearParticles(particleHolder) {
    particleHolder.remove();
}

function SpawnParticleEffect(element) {
    let particleHolder = document.createElement("div");
    particleHolder.className = "particleHolder"
    particleHolder.style.position = "absolute";
    particleHolder.style.top = element.style.top;
    particleHolder.style.left = element.style.left;
    particleHolder.style.width = element.style.width;
    particleHolder.style.height = element.style.height;
    particleHolder.style.zIndex;
    let particles = PopulateEffectHolder(particleHolder, element);
    setTimeout(AnimateParticles, 0, particles, element);
    setTimeout(ClearParticles, 450, particleHolder);
    document.getElementById("holder").appendChild(particleHolder);
}

function PopulateEffectHolder(holderElement, element) {
    particles = [];
    for (let i = 0; i < Math.floor(parseInt(holderElement.style.width)/4); i++) {
        let particle = document.createElement("div");
        particle.className = "particle";
        particle.style.position = "absolute";
        particle.style.left = (parseFloat(holderElement.style.width)/2) + "px";
        particle.style.top = (parseFloat(holderElement.style.height)/2) + "px";
        particle.style.width = (Math.random() * 20 + 20) + "px";
        particle.style.height = (Math.random() * 20 + 20) + "px";
        particle.style.backgroundColor = element.style.color;
        particle.style.zIndex = -99;
        particles.push(particle);
        holderElement.appendChild(particle);
    }
    return particles;
}

function AnimateParticles(particles, element) {

    for (let i = 0; i < particles.length; i++) {
        particles[i].style.left = (((Math.random() * 2) - 1)*100) + "px";
        particles[i].style.top = (((Math.random() * 2) - 1)*100) + "px";
        particles[i].style.width = 5 + "px";
        particles[i].style.height = 5 + "px";
        particles[i].style.backgroundColor = "rgb(255, 234, 196)";
        particles[i].style.transform = "rotate(" + Math.random() * 360 + "deg)";
    }
}

function addNewEl() {
    let newEl = document.createElement("div");
    newEl.id = String(indexer);
    indexer++;
    newEl.onclick  = function() {Click(this)};
    newEl.style.position = "absolute"
    newEl.innerHTML = 0;
    newEl.className = "boxes";
    newEl.style.top = Math.random() * 93 + '%';
    newEl.style.left = Math.random() * 93 + '%';
    RandomizeSettings(newEl);
    document.getElementById("holder").appendChild(newEl);
}

function RandomizeSettings(element) {
    let preSize = (Math.random() * 40 + 30);
    let size = preSize + "px";
    element.style.width = size
    element.style.height = size
    element.style.top = Math.random() * 93 + '%';
    element.style.left = Math.random() * 93 + '%';
    element.style.lineHeight = size;
    element.style.fontSize = ((preSize - Math.floor(preSize/4)) + "px");
    let r = Math.random()*255
    let g = Math.random()*255
    let b = Math.random()*255
    element.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    let darkener = 40;
    element.style.color = "rgb(" + (r - darkener) + "," + (g - darkener) + "," + (b - darkener) + ")";
}
