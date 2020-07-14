let header, footer, container;
let firstZoom = true;
let currentRatio;
let level, floorSrc, coverSrc, headerFooterHeight, wHeight, set1, wWidth, cover, set, svg, svgHeight, floorLayer, mainLayer;
let currentScale;
let setFlagObj = {
    cover: false,
    set1: false,
    set2: false
}


window.onload = onloadFn;

function defineData4Floor() {
    let paramsString = window.location.search;
    let searchParams = new URLSearchParams(paramsString);
    level = searchParams.get("level");
    floorSrc = `./img/${level}.png`
    coverSrc = new Image();
    coverSrc.src = `./img/${level}_coverGrey.gif`;
    set1 = dataPin[level];
}

function onloadFn() {
    defineData4Floor();
    
    header = document.querySelector(".header");
    footer = document.querySelector(".footer");
    container = document.getElementById('container');
    window.addEventListener("resize", resize);
    currentRatio = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth/3000;
    resize();
    buildSvg();
    buildDefault();
    document.body.style.opacity = 1;
}

function getScreenWidthHeight() {
    headerFooterHeight = header.offsetHeight + footer.offsetHeight;
    wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    svgHeight = wHeight - headerFooterHeight;
    
}


function resize() {
    getScreenWidthHeight();
    container.style.height = `${svgHeight}px`;
    container.style.width = `${wWidth}px`;


    if(mainLayer) {
        mainLayer
        .attr("transform", `scale(${wWidth/3000})`) 
    }

    
}

function buildDefault() {
    let checkBoxArr = [...document.querySelectorAll(".form-check-input")];
    checkBoxArr.forEach(box => {
    setFlagObj[box.id] = box.checked; 
    checkBoxListener(box.id, box.checked);
    box.addEventListener("change", (e) => checkBoxListener(e.target.id, e.target.checked))
    });
}

function buildSvg() {
    svg = d3.select("#container").append("svg");
    svg
        .attr("height", "100%")
        .attr("width", "100%")
        
    mainLayer = svg.append("g");
    mainLayer
        .attr("class", "mainLayer")
        .attr("transform", `scale(${wWidth/3000})`)        

    floorLayer = mainLayer.append("g")
    floorLayer
        .attr("class", "floorLayer")

    let floor = floorLayer.append("image");
    floor.attr("class", "currentFloor")
    floor.attr("xlink:href", floorSrc)
    const zoom = d3
    .zoom()
    .scaleExtent([0.2, 3])
    .on("zoom", zoomed);

    svg.call(zoom);    
}   



function checkBoxListener(itemToShow, isChecked) {

    switch(itemToShow) {
        case "cover":
            drawCover(itemToShow, isChecked);
            break;
        case "set1":
        case "set2":
            drawSet(itemToShow, isChecked);
            break;
        default:
            console.log("--nothing to draw");            
    }
}

function drawSet(itemToShow, isChecked) {
    if (isChecked) {
        set = mainLayer.append("g")
        set.attr("class", "set")
        //.attr("transform", `scale(${Math.min(wHeight/1850/1.1, wWidth/3000)})`)
        .selectAll("g")        
        .data(set1)
        .join("g")
        .attr("pointer-events", "visible")
        .attr("cursor", "pointer")
        .attr("id", d => d.id)
        .append("circle")
            .attr("fill", "red")
            .attr("cx", d => {
                return d.x
            })
            .attr("cy", d => {
                return (d.y + 165)
            })
            .attr("r", 30)
            .on("click", clickedOnPin)        

        set
        .selectAll("g")        
        .data(set1)
        .join("g")
        .append("text")
        .attr("x", d => {
            return d.x
        })
        .attr("y", d => {
            return (d.y + 165)
        })
        .attr("text-anchor", "middle")
        .attr("font-size", 30)
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("dy", "10")
        .attr("pointer-events", "none")
        .text(d => d.id);        
        
    } else {
        if(set) svg.select(".set").remove();
    }
}

function clickedOnPin(d) {
    console.log("clicked pin:", d);    
};


function drawCover(itemToShow, isChecked) {
    console.log("cover to build:", itemToShow, isChecked);

    if (isChecked) {
        cover = floorLayer.append("image");
        cover.attr("xlink:href", coverSrc.src)
        //.attr("transform", `scale(${Math.min(wHeight/1850/1.1, wWidth/3000)})`)
    } else {
        if(cover) cover.remove();
    }
}



function zoomed() {
    


    const {transform} = d3.event;    
    let {k,x,y} = transform;
    var transform2 = d3Transform()
        .translate([x, y])
        .scale(k*wWidth/3000);
    mainLayer.attr("transform", transform2);    
}




