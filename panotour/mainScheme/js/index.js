let svg, floorRect, headerFooterHeight, img, w, h;
let header = document.querySelector('.header');
let footer = document.querySelector('.footer');
let resizeDebounce = debounce(resizeFn, 250);
let obj = document.getElementById('svg');

window.onload = function() {
    resizeFn();
    window.addEventListener('resize', () => {
        document.body.style.opacity = 0;
        resizeDebounce();
    });
    obj.onload = function () {
        let svgDocument = obj.contentDocument;
        svg = svgDocument;
        img = svgDocument.querySelector('.floor');
        img.setAttribute('width', '100%')
        if(w>600) {
            let g18 = svg.querySelector('#g18');
            let {height: imgHeight} = img.getBoundingClientRect();
            g18.setAttribute('transform', `translate(0, -${(h - imgHeight)/3})`)
        } else {

        }
        floorRect = [...svgDocument.querySelectorAll('.block')];
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
    h = window.innerHeight || document.documentElement.clientHeight ||
        document.body.clientHeight;
    w = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (w < 600 && w < h) {
        obj.setAttribute('data', './img/all_mini.svg')
    } else {
        obj.setAttribute('data', './img/allFloorsScheme.svg')
    }   
    let hSVG = h - headerFooterHeight;
    obj.style.height = hSVG + 'px';
    document.body.style.opacity = 1;
}

function mouseLeave() {
    this.style.fill = 'none';
    this.style.stroke = 'none'
}

function mouseOverFloor() {
    this.style.fill = 'rgba(0,0,0,0.2)';
    this.style.stroke = '#FFF773'
    this.style.strokeWidth = 8;
    this.style.cursor = 'pointer';
}

function clickBack() {
    setTimeout(function(){document.location.href = `../../index.html`},250);
}

function clickFloor(e) {
    let level = e.target.id;
    console.log('goTo: ', level);
    setTimeout(function(){document.location.href = `../levels/sitemap.html?level=${level}`},250);
}