(function() { 
    document.onmousemove = handleMouseMove;
    
    var animation = new TimelineMax();
    
    animation.add(intro(), '-=1')
        .add(section3(), '-=1');
    
    function intro() {
        var tl = new TimelineLite();
        
        tl.to('.page-title', 1, {top: 0, ease: Linear.easeIn})
            .to('.page-subtitle', 1, {marginBottom: 0, opacity: 1, ease: Linear.easeOut})
            .to('.section--1', 1, {opacity: 0, ease: Linear.easeIn})
            .to('.section--1', 0, {display: 'none'})
            .to('.section--2', 1, {opacity: 1, ease: Linear.easeIn})
            .to('.section--3, .section--4, .footer', 0, {display: 'block', ease: Linear.easeIn})
            .to('.section--3, .section--4, .footer', 1, {opacity: 1, ease: Linear.easeIn});
            
        return tl;
    }
    
    function section3() {
        var tl = new TimelineLite();
        tl.to('.section--3', 1,{opacity: 1, ease: Linear.easeIn});
        tl.from('.bb8-desc', 1, {opacity: 0, bottom: '-20px', ease: Linear.easeIn});
        tl.to('.bb8-desc', 1, {opacity: 1, bottom: '0', ease: Linear.easeIn});
        
        return tl;
    }
    
    function handleMouseMove(event) {
        var wWidth = window.innerWidth;
        var wHeight = window.innerHeight;
        
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        
        var rotateX = (event.pageY - wHeight / 2) * 0.08 ;
        var rotateY = (event.pageX - wWidth / 2) * 0.08 ;
       
        rotateX = rotateX > 20 ? 20 : (rotateX < -20 ? -20 : rotateX);
        rotateY = rotateY > 20 ? 20 : (rotateY < -20 ? -20 : rotateY);
           
        var base = 10;
        
        var baseX =  (wWidth / 2) / base;
        var baseY =  (wHeight / 2) / base;
        
        var coorX = (event.pageX - wWidth / 2);
        var coorY = (event.pageY - wHeight / 2);
        
        var translateX = (coorX > 0) ? coorX / baseX : -(-coorX / baseX);
        var translateY = (coorY > 0) ? coorY / baseY : -(-coorY / baseY);
        var translateZ = (Math.sqrt(coorX * coorX + coorY * coorY));
                
        TweenMax.to('.absolute-center', 2, {perspective: '400px', rotationX: -rotateX, rotationY: rotateY, ease:Linear.easeIn});
        TweenMax.to('.section--bg', 10, {left: translateX + 'px ', top: translateY + 'px', ease:Linear.easeIn});
    }
})();