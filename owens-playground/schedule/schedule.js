colors = {
    primary: [255, 255, 255],
    secondary: [235, 235, 235],
    header: [220, 220, 220],
    sidebar: [220, 220, 220],
    background: [200, 200, 200]
}

function getColorCss(arr) {
    return `rgb(${arr[0]},${arr[1]},${arr[2]})`
}

$(".column div").css("background-color", getColorCss(colors.primary))
$(".column div.break").css("background-color", getColorCss(colors.secondary))
$(".column div.header").css("background-color", getColorCss(colors.header))
$(".column div.header.sidebar").css("background-color", getColorCss(colors.background))

numberOfDays = 7
sidebarWidthRatio = 0.75

columns = $("#schedule").children()
activeColumnsArr = []
for(let i = 0; i < columns.length; i++) {
    let column = columns[i]
    if(column.children.length > 1 || column.classList.contains("sidebar")) {
        activeColumnsArr.push(column)
    }
}
console.log(activeColumnsArr)

columns.css("visibility", "hidden")
leftOffset = 0;
scheduleWidth = $("#schedule").width()
totalColumns = activeColumnsArr.length - 2 + 2 * sidebarWidthRatio
for(let i = 0; i < activeColumnsArr.length; i++) {
    let column = activeColumnsArr[i]
    column.style.visibility = "visible"
    column.style["margin-left"] = `${leftOffset}px`

    width = scheduleWidth / totalColumns * (column.classList.contains("sidebar") ? sidebarWidthRatio : 1)
    topOffset = 0
    for(let j = 0; j < column.children.length; j++) {
        element = column.children[j]
        element.style.width = `${width}px`
        element.style["margin-top"] = `${topOffset}px`
        topOffset += 100
    }

    leftOffset += width
}
