let svg, floorRect, headerFooterHeight, obj, img;
let header = document.querySelector('.header');
let footer = document.querySelector('.footer');
let myEfficientFn = debounce(resizeFn, 250);
obj = document.getElementById('svg');

window.onload = function() {
    resizeFn();
    window.addEventListener('resize', () => {
        document.body.style.opacity = 0;
        myEfficientFn();
    });
    obj.onload = function () {
        let svgDocument = obj.contentDocument;
        svg = svgDocument;
        img = svgDocument.querySelector('.floor');
        img.setAttribute("height", "100%")
        img.setAttribute("width", "100%")
        floorRect = [...svgDocument.querySelectorAll(".block")];
        floorRect.forEach(singleBlock => {
            singleBlock.addEventListener('click', clickFloor)
            singleBlock.addEventListener('mouseenter', mouseOverFloor)
            singleBlock.addEventListener('mouseleave', mouseLeave)
        })
    };
}

function debounce(func, wait, immediate) {    
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);        
    };    
};


function resizeFn() {
    document.body.style.opacity = 0;
    headerFooterHeight = header.offsetHeight + footer.offsetHeight;

    let h = window.innerHeight || document.documentElement.clientHeight ||
        document.body.clientHeight;
    let w = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (w < 600) {
        obj.setAttribute('data', "./img/all_mini.svg")
    } else {
        obj.setAttribute('data', "./img/allFloorsScheme_.svg")
    }   

    // let hwRatio = h / w;
    // let multer = hwRatio > 1.8 ? 0.7 : hwRatio <= 1 ? 1.2 : 0.8;
    let hSVG = h - headerFooterHeight;
    obj.style.height = hSVG + "px";
    document.body.style.opacity = 1;
}

function mouseLeave() {
    this.style.fill = "none";
    this.style.stroke = "none"
}

function mouseOverFloor() {
    this.style.fill = "rgba(0,0,0,0.2)";
    this.style.stroke = "#FFF773"
    this.style.strokeWidth = 8;
    this.style.cursor = "pointer";
}

function clickBack() {
    setTimeout(function(){document.location.href = `../../index.html?v=${01}`},250);
}

function clickFloor(e) {
    let level = e.target.id;
    console.log('goTo: ', level);
    setTimeout(function(){document.location.href = `../levels/sitemap.html?level=${level}`},250);
}