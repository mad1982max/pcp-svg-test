let svg, floorRect, headerFooterHeight, obj;

window.onload = function() {
    resizeFn();
    window.addEventListener('resize', () => {
        document.body.style.opacity = 0;
        myEfficientFn();
    });
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
 

let myEfficientFn = debounce(resizeFn, 250);
obj = document.getElementById('svg');

obj.onload = function () {
    let svgDocument = obj.contentDocument;
    svg = svgDocument;
    floorRect = [...svgDocument.querySelectorAll(".block")];
    floorRect.forEach(singleBlock => {
        singleBlock.addEventListener('click', clickFloor)
        singleBlock.addEventListener('mouseenter', mouseOverFloor)
        singleBlock.addEventListener('mouseleave', mouseLeave)
    })
};

function resizeFn() {
    document.body.style.opacity = 0;
    headerFooterHeight = document.querySelector('.header').offsetHeight + document.querySelector('.footer').offsetHeight;

    let h = window.innerHeight || document.documentElement.clientHeight ||
        document.body.clientHeight;

    let w = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;

    if (w < 600) {
        obj.setAttribute('data', "./img/all_mini.svg")
    } else {
        obj.setAttribute('data', "./img/allFloorsScheme_.svg")
    }

    let hwRatio = h / w;
    let multer = hwRatio > 1.8 ? 0.7 : hwRatio <= 1 ? 1.2 : 0.8;
    obj.style.height = `${h*multer - headerFooterHeight*multer}px`;
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
    console.log('**b**');
    //window.history.go(-1)
    //document.location.href="../../index.html";
    //window.location.pathname = "../../index.html";
    setTimeout(function(){document.location.href = `../../index.html?v=${01}`},250);
}

function clickFloor(e) {
    let level = e.target.id;
    console.log('goTo: ', level);
    //window.location.href = `../levels/SITEMAP.html?level=${level}`; 
    //document.location.href = `../levels/SITEMAP.html?level=${level}`;
    // setTimeout(function(){document.location.href = `../levels/sitemap.html?level=${level}`},250);
    setTimeout(function(){document.location.href = `../levels/sitemap.html?level=${level}`},250);
    //window.open(`../levels/SITEMAP.html?level=${level}`, "_self")
}