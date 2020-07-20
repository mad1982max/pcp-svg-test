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
let curPos = {
    x: 0,
    y: 0,
    initPicW: 3000,
    initPicH: 1850,
    k: 0
}


window.onload = onloadFn;

function defineData4Floor() {
    let paramsString = window.location.search;
    let searchParams = new URLSearchParams(paramsString);
    level = searchParams.get('level');
    floorSrc = `./img/${level}.png`
    coverSrc = new Image();
    coverSrc.src = `./img/${level}_coverGrey.gif`;
    set1 = dataPin[level];
}

function onloadFn() {
    defineData4Floor();
    
    header = document.querySelector('.header');
    footer = document.querySelector('.footer');
    container = document.getElementById('container');
    window.addEventListener('resize', resize);    
    
    buildSvg();
    resize();
    let checkBoxArr = [...document.querySelectorAll('.form-check-input')];
    checkBoxArr.forEach(box => {
    setFlagObj[box.id] = box.checked; 
    checkBoxListener(box.id, box.checked);
    box.addEventListener('change', (e) => checkBoxListener(e.target.id, e.target.checked))
    });
    document.body.style.opacity = 1;
}

function getScreenWidthHeight() {
    headerFooterHeight = header.offsetHeight + footer.offsetHeight;
    wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    svgHeight = wHeight - headerFooterHeight;

    if(wWidth > wHeight*curPos.initPicW/curPos.initPicH) {
        curPos.k = svgHeight/curPos.initPicH;
        let picW = curPos.initPicW*curPos.k;
        curPos.x = (wWidth/curPos.k - picW/curPos.k)/2;
        curPos.y = 0;

    } else {
        curPos.k = wWidth/curPos.initPicW
        let picH = curPos.initPicH*curPos.k;
        curPos.x = 0;
        curPos.y = 0;
        curPos.y = (wHeight/curPos.k - picH/curPos.k)/5;;
        
    }
      
    console.log('curPos.k',curPos.k);   
}


function resize() {
    getScreenWidthHeight();
    container.style.height = `${svgHeight}px`;
    container.style.width = `${wWidth}px`;

    if(mainLayer) {
        mainLayer
        .attr('transform', `scale(${curPos.k}) translate(${curPos.x},${curPos.y})`) 
    }

    
}

function buildSvg() {

    svg = d3.select('#container').append('svg');
    svg
        .attr('class', 'svgContainer')
        .attr('height', '100%')
        .attr('width', '100%')
        
    mainLayer = svg.append('g');
    mainLayer
        .attr('class', 'mainLayer')
        .attr('transform', `scale(${curPos.k}) translate(${curPos.x},${curPos.y})`)        

    floorLayer = mainLayer.append('g')
    floorLayer
        .attr('class', 'floorLayer')

    let floor = floorLayer.append('image');
    floor.attr('class', 'currentFloor');
    floor.attr('xlink:href', floorSrc);

    const zoom = d3
        .zoom()
        .scaleExtent([0.2, 3])
        .on('zoom', zoomed);
    svg.call(zoom);  
}  

function checkBoxListener(itemToShow, isChecked) {

    switch(itemToShow) {
        case 'cover':
            drawCover(itemToShow, isChecked);
            break;
        case 'set1':
        case 'set2':
            drawSet(itemToShow, isChecked);
            break;
        default:
            console.log('--nothing to draw');            
    }
}

function drawSet(itemToShow, isChecked) {
    if (isChecked) {
        set = mainLayer.append('g')
        set.attr('class', 'set')
            .selectAll('g')        
            .data(set1)
            .join('g')
            .attr('pointer-events', 'visible')
            .attr('cursor', 'pointer')
            .attr('id', d => d.id)
            .append('circle')
                .attr('fill', '#ff0066')
                .attr('cx', d => {
                    return d.x
                })
                .attr('cy', d => {
                    return (d.y + 165)
                })
                .attr('r', 30)
                .on('click', clickedOnPin)        

        set
            .selectAll('g')        
            .data(set1)
            .join('g')
            .append('text')
            .attr('x', d => {
                return d.x
            })
            .attr('y', d => {
                return (d.y + 165)
            })
            .attr('text-anchor', 'middle')
            .attr('font-size', 30)
            .attr('fill', 'white')
            .attr('font-family', 'sans-serif')
            .attr('dy', '10')
            .attr('pointer-events', 'none')
            .text(d => d.id);          
    } else {
        if(set) svg.select('.set').remove();
    }
}

function clickedOnPin(d) {
    console.log('clicked pin:', d);    
};


function drawCover(itemToShow, isChecked) {
    console.log('cover to build:', itemToShow, isChecked);
    if (isChecked) {
        cover = floorLayer.append('image');
        cover.attr('xlink:href', coverSrc.src)
    } else {
        if(cover) cover.remove();
    }
}

function zoomed() {
    const {transform} = d3.event;  
    let {k,x,y} = transform;
    let transform2 = d3Transform() 
        .translate([x, y])
        .scale(k*curPos.k)
        .translate([curPos.x, curPos.y])
    mainLayer.attr('transform', transform2);    
}




