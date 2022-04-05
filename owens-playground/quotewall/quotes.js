
function initializeQuotes() {
    let quotes = document.getElementsByTagName("quote")

    for(let i = 0; i < quotes.length; i++) {
        let docSize = quotes[i].parentElement.getBoundingClientRect()
        let quoteSize = quotes[i].getBoundingClientRect()

        getNewPos = () => {return {x: Math.random() * (docSize.width - quoteSize.width),
                                   y: Math.random() * (docSize.height - quoteSize.height)}}

        let posIsValid = false, newPos
        let attempts = 0, maxAttempts = 10
        while(!posIsValid) {
            posIsValid = true
            newPos = getNewPos()
            for(let j = 0; j < i; j++) {
                if(i != j) {
                    quotes[i].style.left = newPos.x + "px"
                    quotes[i].style.top = newPos.y + "px"
                    quoteSize = quotes[i].getBoundingClientRect()
                    otherQuoteSize = quotes[j].getBoundingClientRect()

                    if((quoteSize.right  > otherQuoteSize.left && quoteSize.left < otherQuoteSize.right && 
                        quoteSize.bottom > otherQuoteSize.top  && quoteSize.top  < otherQuoteSize.bottom)) {
                        console.log(i, "AHHHH")
                        posIsValid = false
                        break
                    }
                    
                }
            }
            attempts++
            if(attempts >= maxAttempts) {
                if(!posIsValid) quotes[i].style.visibility = "hidden"
                break
            }
        }

        quotes[i].style.left = newPos.x + "px"
        quotes[i].style.top = newPos.y + "px"
    }
}
initializeQuotes()