'use strict'
window.addEventListener('load', ()=> {
    // Header Fixed Menu
    let header = document.querySelector('.header'),
        headerMenu = header.querySelector('.header__menu'),
        headerMenuTop = headerMenu.offsetTop,
        headerPhone = header.querySelector('.header__phone'),
        headerMedia = header.querySelector('.header__media')

    window.addEventListener('scroll', ()=>{
        if(window.pageYOffset > headerMenuTop){
            header.classList.add('fixed')
        }
        else{
            header.classList.remove('fixed')
        }
    })


    // Start Page Overview | Results
    let startpage = document.querySelector('.startpage'),
        startpageResults = document.querySelector('.startpage__results'),
        startpageResultsItems = startpageResults.querySelectorAll('.startpage__results-item'),
        startpageOverview = document.querySelector('.startpage__overview'),
        startpageOverviewItems = startpageOverview.querySelectorAll('.startpage__overview__item');

    startpageResultsItems.forEach(i => {
        i.addEventListener('mouseover', ()=>{
            startpageResultsItems.forEach(i => i.classList.remove('active'))
            startpageOverviewItems.forEach(i => i.classList.remove('active'))
            for (let n = 0; n < startpageResultsItems.length; n++){
                if (startpageResultsItems[n] == i){
                    i.classList.add('active')
                    startpageOverview.classList.add('active')
                    startpageOverviewItems[n].classList.add('active')

                    if (startpageOverviewItems[n].classList.contains('slider')){
                        startpageOverviewSliderLine = startpageOverviewItems[n].querySelector('.startpage__overview__tabs-item>span')
                    }

                    if (startpageOverviewItems[n].classList.contains('list')){
                        new OverviewItemTabs(startpageOverviewItems[n])
                    }
                }
            }
        })
    })
    startpage.querySelector('.startpage__body').addEventListener('mouseleave', ()=>{
        startpageOverview.classList.remove('active')
        startpageResultsItems.forEach(i => {
            i.classList.remove('active')
        })
        startpageOverviewItems.forEach(i => {
            i.classList.remove('active')
        })
    })

    // Start Page Overview Item Tabs
    class OverviewItemTabs{
        constructor(item) {
            this.content = item.querySelector('.startpage__overview__content')
            this.tabs = item.querySelectorAll('.startpage__overview__tabs-item')
            this.lists = item.querySelectorAll('.startpage__overview__list')

            this.tabs.forEach(i => {
                i.addEventListener('click', ()=>{
                    for (let n = 0; n < this.tabs.length; n++){
                        if(i == this.tabs[n]){
                            this.tabs.forEach(i => {
                                i.classList.remove('active')
                            })
                            this.lists.forEach(i => {
                                i.classList.remove('active')
                            })

                            i.classList.add('active')
                            this.lists[n].classList.add('active')

                            if (this.content.classList.contains('maps')){
                                this.maps = item.querySelectorAll('.startpage__overview__maps-item')
                                this.maps.forEach(i => i.classList.remove('active'))
                                this.maps[n].classList.add('active')
                            }
                        }
                    }
                })
            })
        }
    }

    // Start Page Overview Item Slider
    let startpageOverviewSlider = startpageOverview.querySelector('.startpage__overview__slider'),
        startpageOverviewSliderRow = startpageOverviewSlider.querySelector('.startpage__overview__slider__row'),
        startpageOverviewSliderItems = startpageOverviewSlider.querySelectorAll('.startpage__overview__slider__item'),
        startpageOverviewSliderPrev = startpageOverviewSlider.querySelector('.startpage__overview__slider__switcher.prev'),
        startpageOverviewSliderNext = startpageOverviewSlider.querySelector('.startpage__overview__slider__switcher.next'),
        startpageOverviewSliderItemIndents = getComputedStyle(startpageOverviewSlider).getPropertyValue('--indents').split('px')[0]*1,
        startpageOverviewSliderAmountAll = startpageOverviewSliderItems.length,
        startpageOverviewSliderAmountShown = getComputedStyle(startpageOverviewSlider).getPropertyValue('--amount')*1,
        startpageOverviewSliderLine = '', // Указано в "startpageResultsItems.forEach(i => { ..."
        startpageOverviewSliderIndex = 0;

    function startpageOverviewSliderToggle() {
        if (startpageOverviewSliderIndex > startpageOverviewSliderAmountAll - startpageOverviewSliderAmountShown){
            startpageOverviewSliderIndex = 0
        }
        if (startpageOverviewSliderIndex < 0){
            startpageOverviewSliderIndex = startpageOverviewSliderAmountAll - startpageOverviewSliderAmountShown
        }
        startpageOverviewSliderLine.style.width = 100 / startpageOverviewSliderAmountAll * startpageOverviewSliderAmountShown + (100/startpageOverviewSliderAmountAll * startpageOverviewSliderIndex) + '%'
        startpageOverviewSliderRow.style.left = -startpageOverviewSliderIndex*(startpageOverviewSlider.querySelectorAll('.startpage__overview__slider__item')[0].offsetWidth + startpageOverviewSliderItemIndents) + 'px'
    }
    startpageOverviewSliderPrev.addEventListener('click', ()=>{
        startpageOverviewSliderIndex--
        startpageOverviewSliderToggle()
    })
    startpageOverviewSliderNext.addEventListener('click', ()=>{
        startpageOverviewSliderIndex++
        startpageOverviewSliderToggle()
    })
    startpageOverviewSliderItems.forEach(i => {
        i.addEventListener('click', (e)=>{
            for (let n = 0; n < startpageOverviewSliderItems.length; n++){
                if (e.target == startpageOverviewSliderItems[n].querySelector('.startpage__overview__slider__item__certificate_fade')){
                    startpageOverviewSliderBigIndex = n
                    startpageOverviewSliderBig.classList.add('active')
                    document.body.style.overflow = 'hidden'
                    startpageOverviewSliderBigContent.style.width = startpageOverviewSliderBigRow.offsetHeight * 0.7 + 'px'
                    startpageOverviewSliderBigToggle()
                }
            }

        })
    })

    // Start Page Overview Item Slider Big
    let startpageOverviewSliderBig = startpageOverview.querySelector('.startpage__overview__slider_big'),
        startpageOverviewSliderBigContent = startpageOverviewSliderBig.querySelector('.startpage__overview__slider_big__content'),
        startpageOverviewSliderBigRow = startpageOverviewSliderBig.querySelector('.startpage__overview__slider_big__row'),
        startpageOverviewSliderBigItems = startpageOverviewSliderBig.querySelectorAll('.startpage__overview__slider_big__item'),
        startpageOverviewSliderBigPrev = startpageOverviewSliderBig.querySelector('.startpage__overview__slider_big__switch.prev'),
        startpageOverviewSliderBigNext = startpageOverviewSliderBig.querySelector('.startpage__overview__slider_big__switch.next'),
        startpageOverviewSliderBigCounter = document.querySelector('.startpage__overview__slider_big__counter'),
        startpageOverviewSliderBigIndex = 0;

    startpageOverviewSliderBigCounter.querySelector('.all').innerHTML = startpageOverviewSliderBigItems.length

    function startpageOverviewSliderBigToggle() {
        if (startpageOverviewSliderBigIndex > startpageOverviewSliderBigItems.length - 1){
            startpageOverviewSliderBigIndex = 0
        }
        if (startpageOverviewSliderBigIndex < 0){
            startpageOverviewSliderBigIndex = startpageOverviewSliderBigItems.length - 1
        }
        startpageOverviewSliderBigCounter.querySelector('.actual').innerHTML = startpageOverviewSliderBigIndex + 1
        startpageOverviewSliderBigRow.style.left = -startpageOverviewSliderBigIndex * 100 + '%'

    }

    startpageOverviewSliderBigPrev.addEventListener('click', ()=> {
        startpageOverviewSliderBigIndex--
        startpageOverviewSliderBigToggle()
    })
    startpageOverviewSliderBigNext.addEventListener('click', ()=> {
        startpageOverviewSliderBigIndex++
        startpageOverviewSliderBigToggle()
    })
    startpageOverviewSliderBig.addEventListener('click', (e)=>{
        if (e.target == startpageOverviewSliderBig){
            startpageOverviewSliderBig.classList.remove('active')
            document.body.style.overflow = ''
        }
    })

    // Startpage Overview Close
    let startpageOverviewClose = startpageOverview.querySelector('.startpage__overview__close')

    startpageOverviewClose.addEventListener('click', ()=>{
            startpageOverview.classList.remove('active')
            startpageResultsItems.forEach(i => {
                i.classList.remove('active')
            })
            startpageOverviewItems.forEach(i => {
                i.classList.remove('active')
            })
    })

    // Projects Filter
    let projectsMenu = document.querySelector('.projects__menu'),
        projectsListMenu = document.querySelector('.projects__mainmenu'),
        projectsListContentPics = document.querySelector('.projects__content-pics'),
        projectsListItemsData =  [
            {
                category: 'По отраслям',
                subcategories: [
                    {
                        name: 'Безопасность',
                    },
                    {
                        name: 'Деятельность по организации конференций и выставок',
                    },
                    {
                        name: 'Интернет-торговля',
                    },
                    {
                        name: 'ИТ-Сфера',
                    },
                    {
                        name: 'Недвижимость',
                    },
                    {
                        name: 'Производство',
                    },
                    {
                        name: 'Производство / Оптовая торговля',
                    },
                    {
                        name: 'Судостроение',
                    },
                    {
                        name: 'Телекоммуникации',
                    },
                    {
                        name: 'Торговля',
                    },
                    {
                        name: 'Оптовая и розничная торговля',
                    },
                    {
                        name: 'Транспортная экспедиция',
                    },
                ],
            },
            {
                category: 'Интеграция с механизмами',
                subcategories: [
                    {
                        name: 'Кадровый учет',
                    },
                    {
                        name: 'Регламентированный учет',
                    },
                    {
                        name: 'Управленческий учет',
                    },
                    {
                        name: 'Оперативный учет',
                    },
                    {
                        name: 'Складской учет',
                    },
                    {
                        name: 'Производство и складской учет',
                    },
                    {
                        name: 'Производство',
                    },
                    {
                        name: 'Бюджетирование',
                    },
                ],
            },
            {
                category: 'Интеграция с программами',
                subcategories: [
                    {
                        name: '1С:Бухгалтерия и 1С:Зарплата и управление персоналом',
                    },
                    {
                        name: '1С:TMS Логистика. Управление перевозками',
                    },
                    {
                        name: 'внедрение модуля для 1С:ERP «1С:Аренда и управление недвижимостью»',
                    },
                    {
                        name: 'внедрение модуля NIRAX, внедрение механизма «Интеркампани», синхронизация с 1С Бухгалтерия',
                    },
                    {
                        name: 'синхронизация с 1С:Бухгалтерия',
                    },
                    {
                        name: 'ST - Чикаго',
                    },
                ],
            },
            {
                category: 'По заданиям',
                subcategories: [
                    {
                        name: '1С: Управление производственным предприятием, 1.3.5 и «Автоматизированная система управления предприятием» на базе конфигурации 1С: Бухгалтерия предприятия КОРП, 3.0',
                    },
                    {
                        name: '1С: Управление торговлей',
                    },
                    {
                        name: '1С: Управление торговлей, 1С: Управление нашей фирмой',
                    },
                    {
                        name: '1С:Бухгалтерия 8, 1С:Зарплата и Управление Персоналом 8',
                    },
                    {
                        name: 'Автоматизация реглментированного учета в ERP',
                    },
                    {
                        name: 'внедрение 1С:Управление производственным предприятием',
                    },
                    {
                        name: 'внедрение 1С: Предприятие 8. ERP Управление строительной организацией',
                    },
                    {
                        name: 'Внедрение 1С: Управление торговлей',
                    },
                    {
                        name: 'Внедрение и сопровождение ЕРП',
                    },
                    {
                        name: 'Донастройка и сопровождение ЕРП',
                    },
                ],
            },
        ],
        projectsListLogosData =  [
            {
                name: 'rd',
                categories: [
                    {category: '', subcategory:['', '']},
                ],
                src: 'img/attachements/projects_item-1.png'
            },
            {
                name: 'sber',
                categories: [
                    {category: '', subcategory:['', '']},
                ],
                src: 'img/attachements/projects_item-2.png'
            },
            {
                name: 'tui',
                categories: [
                    {category: 'По отраслям', subcategory:['Интернет-торговля', 'Безопасность']},
                    {category: 'Интеграция с механизмами', subcategory:['Кадровый учет, Регламентированный учет, Управленческий учет, Оперативный учет']},
                ],
                src: 'img/attachements/projects_item-3.png'
            },
            {
                name: 'interpaoec',
                categories: [
                    {category: '', subcategory:['', '']},
                ],
                src: 'img/attachements/projects_item-4.png'
            },
            {
                name: 'ttk',
                categories: [
                    {category: 'По заданиям', subcategory:['1С: Управление производственным предприятием, 1.3.5 и «Автоматизированная система управления предприятием» на базе конфигурации 1С: Бухгалтерия предприятия КОРП, 3.0']},
                    {category: 'Интеграция с механизмами', subcategory:['Производство, реглментированнй учет']},
                    {category: 'По отраслям', subcategory:['Телекоммуникации']},
                ],
                src: 'img/attachements/projects_item-5.png'
            },
            {
                name: 'angel',
                categories: [
                    {category: 'По отраслям', subcategory:['Интернет-торговля', 'Безопасность']},
                    {category: 'Интеграция с механизмами', subcategory:['Кадровый учет, Регламентированный учет, Управленческий учет, Оперативный учет', 'Регламентированный учет, управленческий учет']},
                    {category: 'Интеграция с программами', subcategory:['1С:Бухгалтерия и 1С:Зарплата и управление персоналом']},
                    {category: 'По заданиям', subcategory:['Внедрение и сопровождение ЕРП']},
                ],
                src: 'img/attachements/projects_item-6.png'
            }
        ]

    let projectsMenuTitle = projectsMenu.querySelector('.projects__content-title'),
        projectsContent = projectsMenu.querySelector('.projects__content'),
        projectsContentMarginLeft = getComputedStyle(projectsContent).marginLeft.split('px')[0]*1

    // Создание пунктов и подпунктов меню
    projectsListMenu.innerHTML = ''
    projectsListItemsData.forEach(i => {
        projectsListMenu.insertAdjacentHTML('beforeend', `
        <li class="projects__mainmenu-item">
            ${i.category}
            <div class="projects__mainmenu-item__burger"> 
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul class="projects__submenu">
            </ul>
        </li>
        `)
    })
    let projectsListItems = document.querySelectorAll('.projects__mainmenu-item')
    let projectsListSubmenus = document.querySelectorAll('.projects__submenu')
    let projectsListItemsBurgers = document.querySelectorAll('.projects__mainmenu-item__burger')

    projectsListItems.forEach(mainItem => {
        let mainItemText = mainItem.outerText.toString().split('\n')[0]

        projectsListItemsData.forEach(mainItemData => {
            if (mainItemData.category == mainItemText){
                mainItemData.subcategories.forEach(subItem => {
                    mainItem.querySelector('.projects__submenu').insertAdjacentHTML('beforeend', `
                        <li class="projects__submenu-item"><span>${subItem.name}</span></li>
                 `)
                    
                })
            }
        })
    })

    // Клик по основным пунктам меню - вывод подменю
    function submenuToggle(elements, target) {
        for (let n = 0; n < elements.length; n++){
            if (elements[n] == target){
                if (!projectsListItems[n].classList.contains('active')){
                    projectsListItems.forEach(i => {i.classList.remove('active')})
                    projectsListSubmenus.forEach(i => {i.classList.remove('active')})
                    
                    projectsContent.classList.add('active')
                    projectsListItems[n].classList.add('active')
                    projectsListSubmenus[n].classList.add('active')
                }
                else{
                    projectsContent.classList.remove('active')
                    projectsListItems[n].classList.remove('active')
                    projectsListSubmenus[n].classList.remove('active')
                }
            }
        }
    }

    projectsListMenu.addEventListener('click', (e)=>{
        submenuToggle(projectsListItems, e.target)
    })
    projectsListItemsBurgers.forEach(i => {
        i.addEventListener('click', ()=>{
            submenuToggle(projectsListItemsBurgers, i)
        })
    })

    // Клик по пунктам подменю - вывод логотипов
    projectsListItems.forEach(mainItem => {
        mainItem.querySelectorAll('.projects__submenu-item>span').forEach(subItem => {
            subItem.addEventListener('click', ()=> {
                projectsListItems.forEach(mainItem => mainItem.classList.remove('active'))
                projectsListSubmenus.forEach(mainItem => mainItem.classList.remove('active'))
                projectsContent.classList.remove('active')

                projectsListContentPics.innerHTML = ''
                projectsMenuTitle.innerHTML = subItem.textContent
                projectsListLogosData.map(logo => {
                    logo.categories.map(i => {
                        if (i.category == mainItem.outerText && i.subcategory.includes(subItem.textContent)){
                            projectsListContentPics.insertAdjacentHTML('beforeend', `
                            <div class="projects__content-item"><img src="${logo.src}" alt=""></div>
                            `)
                        }
                    })
                })
            })
        })
    })

    // Настройки width и left подменю
    projectsListSubmenus.forEach(i => {
        i.style.width = projectsMenu.offsetWidth - projectsMenu.querySelector('.projects__mainmenu').offsetWidth - projectsContentMarginLeft + 'px'
    })
    projectsMenu.style.setProperty('--offsetLeft', projectsMenu.querySelector('.projects__mainmenu').offsetWidth + 'px')
    

    // Sliders
    class Slider1{
        constructor(slider, index = 0){
            this.slider = slider
            this.content = slider.querySelector('.slider__content')
            this.row = slider.querySelector('.slider__row')
            this.items = slider.querySelectorAll('.slider__item')
            this.itemsIndents = getComputedStyle(slider).getPropertyValue('--sliderIndents').split('px')[0]*1
            this.itemsNumShow = getComputedStyle(slider).getPropertyValue('--sliderNum').split('px')[0]*1
            this.itemsNumAll = this.items.length
            this.prev = slider.querySelector('.slider__switch.prev')
            this.next = slider.querySelector('.slider__switch.next')
            this.index = index

            this.width = (this.content.offsetWidth - this.itemsIndents*(this.itemsNumShow-1))/this.itemsNumShow 
            slider.style.setProperty('--sliderItemWidth', this.width + 'px')

            this.prev.addEventListener('click', ()=> {
                this.index--
                this.sliderSwitcher()
            })
            this.next.addEventListener('click', ()=> {
                this.index++
                this.sliderSwitcher()
            })
        }
        sliderSwitcher() {
            if(this.index > this.itemsNumAll - this.itemsNumShow){
                this.index = 0
            }
            if(this.index < 0){
                this.index = this.itemsNumAll - this.itemsNumShow
            }
            this.row.style.left = -(this.width+this.itemsIndents)*this.index + 'px'
        }
    }
    let sliderCases = new Slider1(document.querySelector('.cases__slider.slider')),
        sliderReviews = new Slider1(document.querySelector('.reviews__slider.slider')),
        sliderServices = new Slider1(document.querySelector('.services__slider.slider'))

    class Slider2{
        constructor(slider, index = 0){
            this.slider = slider
            this.content = slider.querySelector('.slider__content')
            this.row = slider.querySelector('.slider__row')
            this.rowWidth = 0,
            this.items = slider.querySelectorAll('.slider__item'),
            this.itemsIndents = getComputedStyle(slider).getPropertyValue('--sliderIndents').split('px')[0]*1,
            this.itemsNumShow = getComputedStyle(slider).getPropertyValue('--sliderNum').split('px')[0]*1,
            this.itemsNumAll = this.items.length,
            this.prev = slider.querySelector('.slider__switch.prev'),
            this.next = slider.querySelector('.slider__switch.next'),
            this.index = 0,

            this.items.forEach(i=>{
                this.rowWidth += i.offsetWidth + this.itemsIndents
            }),
            this.prev.addEventListener('click', ()=> {
                this.index--
                this.sliderSwitcher()
            }),
            this.next.addEventListener('click', ()=> {
                this.index++
                this.sliderSwitcher()
            });
        }
        sliderSwitcher() {
            let attempts = this.itemsNumAll - this.itemsNumShow,
                allWidth = this.rowWidth - this.itemsIndents,
                remainingWidth = allWidth - this.content.offsetWidth 

            if(this.index > attempts){
                this.index = 0
            }
            if(this.index < 0){
                this.index = this.itemsNumAll - this.itemsNumShow
            }

            this.row.style.left = -((remainingWidth)/attempts)*this.index + 'px'
        }
    }
    let sliderEmployees = new Slider2(document.querySelector('.employees__slider.slider'))

    // Cases rolled answer
    let casesRollItems = document.querySelectorAll('.cases__description__info')

    casesRollItems.forEach(i => {
        if (i.classList.contains('roll-up')){
            i.addEventListener('click', ()=>{
                if(i.classList.contains('rolled')){
                    i.classList.remove('rolled')
                }
                else{
                    i.classList.add('rolled')
                }
            })
        }
        // else{
        //     i.style.cursor = 'default'
        // }
    })
    // casesRollClasses.map(i => {
    //     if ()
    // })

    // Cost Tabs
    let costTabs = document.querySelector('.cost__tabs'),
        costTabsBtns = document.querySelectorAll('.cost__tabs-btn'),
        costTabsItems = document.querySelectorAll('.cost__tabs-item')

    costTabs.addEventListener('click', (e)=> {
            for (let n = 0; n < costTabsBtns.length; n++){
                if(e.target == costTabsBtns[n] ){
                    costTabsBtns[n].classList.add('active')
                    costTabsItems[n].classList.add('active')
                }
                else{
                    costTabsBtns[n].classList.remove('active')
                    costTabsItems[n].classList.remove('active')
                }
            }
    })

    // Benefits Subheader Size

    // FAQ rolled answer
    let faq = document.querySelector('.faq'),
        faqQuestions = document.querySelectorAll('.faq__question'),
        faqHeaders = document.querySelectorAll('.faq__question__header')

    faq.addEventListener('click', (e)=> {
            for(let n = 0; n < faqHeaders.length; n++){
                if(e.target == faqHeaders[n]){
                    faqQuestions[n].classList.contains('rolled') ?
                    faqQuestions[n].classList.remove('rolled') :
                    faqQuestions[n].classList.add('rolled')
                }
            }
        })
    
    // To Up Button
    let upButton = document.querySelector('.up')

    window.addEventListener('scroll', ()=> {
        if(window.pageYOffset > window.innerHeight){
            upButton.style.bottom = '16px'
        }
        else{
            upButton.style.bottom = '-48px'
        }
    })

    // Media Queries
    let mediaList = [
        window.matchMedia('(max-width: 1024px)'),
        window.matchMedia('(max-width: 768px)'),
        window.matchMedia('(max-width: 480px)')
    ]
    
    function handleTabletChange(e) {
        if (e.matches) {

          if (e.media == '(max-width: 1024px)'){
              
          }

          if (e.media == '(max-width: 768px)'){
                headerMenu.insertAdjacentElement('beforeend', headerMedia)
          }

          if (e.media == '(max-width: 480px)'){
            let headerListLinks = document.querySelectorAll('.header__list-link'),
            headerBurgerBtn = document.querySelector('.header__burger');
            function burgerSwitcher() {
                if(header.classList.contains('active') ){
                    header.classList.remove('active')
                    document.body.style.overflow = ''
                }
                else{
                    header.classList.add('active')
                    document.body.style.overflow = 'hidden'
                }
            }

            headerBurgerBtn.addEventListener('click', burgerSwitcher)
            headerListLinks.forEach(i => {
                i.addEventListener('click', burgerSwitcher)
            })


            // Reviews Slider Switchers Position
            let reviewsSliderSwitchers = document.querySelectorAll('.reviews__slider__switch'),
                reviewsSliderItemLogo = document.querySelectorAll('.reviews__slider__item__logo')[0]

            function reviewsSlidersSwitchersTop() {
                reviewsSliderSwitchers.forEach(i => {
                    i.style.top = reviewsSliderItemLogo.clientHeight/2 - reviewsSliderSwitchers[0].clientHeight/2 + 'px'
                })
            }
            reviewsSlidersSwitchersTop()

            window.addEventListener('click', ()=>{
                reviewsSlidersSwitchersTop()
            })
          }

        }
    }

    function mediaStart() {
        mediaList.forEach(i => {
            i.addListener(handleTabletChange)
            handleTabletChange(i)
        })
    }; mediaStart()
    window.addEventListener('resize', mediaStart)
})