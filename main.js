
import {slideData} from '/slideData.js'

window.onload=()=>{
    const slider = document.getElementById('slider')
    const leftBtn = document.getElementById('leftBtn')
    const rightBtn = document.getElementById('rightBtn')
    const pagination = document.getElementById('pagination')
    const firstDisplay = slideData[0]
    const lastDisplay = slideData[slideData.length - 1]

    firstDisplay.unqClass = 'first-slide'
    lastDisplay.unqClass = 'last-slide'

    slideData.forEach(slide => {
        slide.id = slide.backgroundColour
        const slideEl = document.createElement('div')
        slideEl.className = 'slide'
        slideEl.innerHTML = `<h1>This slide has a ${slide.backgroundColour} background</h1>`
        slideEl.style.backgroundColor = slide.backgroundColour

        const slidePagination = document.createElement('button')
        slidePagination.className = 'pag-btn'

        slider.appendChild(slideEl)
        pagination.appendChild(slidePagination)
    });

    const sliderChildren = document.getElementById('slider').children
    const paginationChildren = document.getElementById('pagination').children

    sliderChildren[0].classList.add(firstDisplay.unqClass)
    sliderChildren[sliderChildren.length - 1].classList.add(lastDisplay.unqClass)

    paginationChildren[0].classList.add('active')

    const firstSlide = document.querySelector(`.${firstDisplay.unqClass}`)
    const lastSlide = document.querySelector(`.${lastDisplay.unqClass}`)

    const firstSlideClone = firstSlide.cloneNode(true)
    const lastSlideClone = lastSlide.cloneNode(true)
    slider.appendChild(firstSlideClone)
    slider.prepend(lastSlideClone)

    let offset = 100
    let index = 1
    const slides = sliderChildren.length
    if (index === 1) {
        offset = index * 100
        slider.style.transform = `translateX(-${offset}%)`
    }
    
    function removePagBtnActive(){
        document.querySelectorAll('.pag-btn').forEach((pag)=>{
            pag.classList.remove('active')
        })
    }
    function addPagBtnActive(){
        document.querySelectorAll('.pag-btn').forEach((pag)=>{
            if (pag.id == index) {
                pag.classList.add('active')
            }
            
        })
    }

    document.querySelectorAll('.pag-btn').forEach((pag, index)=>{
        pag.id = index+1

        pag.addEventListener('click', ()=>{
            index = parseInt(pag.id) % slides
            offset = index * 100
            slider.style.transition = 'transform 0.5s ease'
            slider.style.transform = `translateX(-${offset}%)`

            removePagBtnActive()
            pag.classList.add('active')
        })
    })

    function rightSlide() {
        document.querySelectorAll('.pag-btn').forEach((pag)=>{
            if (pag.classList.contains('active')) {
                index = (parseInt(pag.id) + 1) % slides
            }
        })
        offset = index * 100
        slider.style.transition = 'transform 0.5s ease'
        slider.style.transform = `translateX(-${offset}%)`

        // when we hit the last real slide, snap back to the first one
        if (index === slides - 1) {
            setTimeout(() => {
                index = 1
                offset = index * 100
                slider.style.transition = 'none'
                slider.style.transform  = `translateX(-${offset}%)`
                removePagBtnActive()
                addPagBtnActive()
            }, 500)

        }
        removePagBtnActive()
        addPagBtnActive()
    }
    function leftSlide() {
        // go to the previous slide, wrapping from 0 → last slide
        document.querySelectorAll('.pag-btn').forEach((pag)=>{
            if (pag.classList.contains('active')) {
                index = (parseInt(pag.id) - 1 + slides) % slides
            }
        })
        offset = index * 100  
        slider.style.transition = 'transform 0.5s ease'
        slider.style.transform  = `translateX(-${offset}%)`

        if (index === 0) {
            setTimeout(() => {
                index = slides - 2
                offset = index * 100
                slider.style.transition = 'none'
                slider.style.transform  = `translateX(-${offset}%)`
                removePagBtnActive()
                addPagBtnActive()
            }, 500)
        }

        removePagBtnActive()
        addPagBtnActive()
    }

    rightBtn.addEventListener('click', ()=>{
        setTimeout(() => {
            rightBtn.disabled = true
        }, 500);
        setTimeout(() => {
            rightBtn.disabled = false
        }, 700);
        rightSlide()
    })
    leftBtn.addEventListener('click', ()=>{
        setTimeout(() => {
            rightBtn.disabled = true
        }, 500);
        setTimeout(() => {
            rightBtn.disabled = false
        }, 700);
        leftSlide()
    })
}