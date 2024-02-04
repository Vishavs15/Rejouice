function ScrollTrigger(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

ScrollTrigger()

function PointerEffect(){
    var page1Content = document.querySelector("#page1-content")
    var Play = document.querySelector(".play")

    // dets give all details about mouse movement or if i write click instad of mousemove it give info about click 
    //  you can write anyting instad of dets like var ,abc
    page1Content.addEventListener("mousemove",function(abc){
        gsap.to(Play,{
            x:abc.x,
            y:abc.y
        })
    })
    page1Content.addEventListener("mouseenter",function(){
        gsap.to(Play,{
            scale:1
        })
    })
    page1Content.addEventListener("mouseleave",function(){
        gsap.to(Play,{
            scale:0
        })
    })
}

PointerEffect()


function page2(){
    gsap.from(".element .page2 h2 p",{
        y:120,
        stagger:0.2,
        duration:1,
        scrollTrigger:{
            trigger:"page2",
            scroller:"body",
            start:"top 47%",
            end:"top 46%",
            // markers:true,
            scrub:2
        }
    })
}

page2()

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });