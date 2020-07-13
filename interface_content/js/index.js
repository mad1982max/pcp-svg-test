window.onload = function() {
    document.body.style.opacity = 1;
    console.log("---");
    
    // window.addEventListener('resize', resizeFn)
    // document.body.style.opacity = 1;
    // let blockObj = [...document.querySelectorAll('.wrapperObject')];
    // let footer = document.querySelector('.footer');
    // let header = document.querySelector('.header');

    
    // let bodyMain = document.querySelector('.body-main');
    // let textBlock = document.querySelector('.text-block');  
    // window.addEventListener('resize', resizeFn);
    // resizeFn();

    // function resizeFn() {

    //     let w = window.innerWidth || document.documentElement.clientWidth
    //     || document.body.clientWidth;
    //     console.log(w);

    //     let h = window.innerHeight || document.documentElement.clientHeight
    //         || document.body.clientHeight;

    //     let ratio = w/h;
    //     console.log('ratio', ratio, 100/ratio, h);
        
    //     if (w > 991) {
    //         footer.style.position = "absolute";

    //     } else {
    //         footer.style.position = "static";
    //     }
    //     if (w > 991 && h < 908) {
    //         var headerFooterHeight = header.offsetHeight + footer.offsetHeight + document.querySelector('.main-title').offsetHeight;            
    
    //         let blockHeight = `${h/3 - headerFooterHeight/3}px`;
    
    //         blockObj.forEach(item => {
    //             item.style.height = blockHeight;
    //             item.children[0].style.width = `${92}%`;
    //             item.children[0].style.margin = 'auto';
    //             item.children[1].style.width = `${92}%`;
    //             item.children[1].style.margin = 'auto';
    //             item.children[1].style.fontSize = '20px';
    //             item.children[1].style.padding = '5% 10px';
  
    //         });


    //         footer.style.position = "absolute";
    //     } else {
    //         blockObj.forEach(item => {
    //             item.style.height = "";
    //             item.children[0].style.width = '100%';
    //             item.children[1].style.width = '100%';
    //             item.children[1].style.fontSize = ""
    //         });
    //         footer.style.position = "static";
    //     }
    //  }

}

