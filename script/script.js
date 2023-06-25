let $ = document
let Theme = $.querySelectorAll('#Theme')[0]
let BtnHIstori = $.querySelectorAll('.BtnHIstori')[0]
let HistoriPhone = $.querySelectorAll('.HistoriPhone')[0]
let ClearHistori = $.querySelectorAll('.ClearHistori')[0]
let clcHome = $.querySelectorAll('.DropHistori')[0]
let CalculatorHome = $.querySelectorAll('.CalculatorPosition')[0]
let Version = $.querySelectorAll('.Version')[0]
let Calculator = $.querySelector('.Calculator') 
let ResultNumber = $.querySelector('.Result') 
let NumerOperation = $.querySelector('.NumberOperation') 
let ButtonCalculator = $.querySelectorAll('.ButtonCalculator') 
let ButtonOperation = $.querySelectorAll('.BtnOperation') 
let ButtonOperationAll = $.querySelectorAll('.ButtonOperation') 
let ButtonResult = $.querySelector('.BtnResult') 
let BtnNumber = $.querySelectorAll('.ButtonNumber') 
let ButtonAllClear = $.querySelector('.BtnAc') 
let ButtonBackSpace = $.querySelector('.BtnBakcspac') 


let ValueOperation
let ItemHistori


let HistoriOperation = []
let ObjResult


Theme.addEventListener('click' , DarkOrLight)

BtnHIstori.addEventListener('click' , DropCalculator)

ClearHistori.addEventListener('click' , ClearlocalHistori)

window.addEventListener('load' , loaderhistori) 

window.addEventListener('resize' , sizeBrowser)



const c = (p) => {
    console.log(p);
}

function localHistori (one , two){
    localStorage.setItem(one , JSON.stringify(two))
}

BtnNumber.forEach((BtnNum) =>{
    
    BtnNum.addEventListener('click' , function (){
        ValueOperation = BtnNum.value
        if (NumerOperation.innerHTML == 0){
            NumerOperation.innerHTML = ValueOperation
        }else {
            NumerOperation.innerHTML += ValueOperation
        }
    })
})


ButtonOperation.forEach((opera) => {
    opera.addEventListener('click' , function (){
        var MaxLength = NumerOperation.innerHTML.length - 1
        if (NumerOperation.innerHTML[MaxLength] == "+" || NumerOperation.innerHTML[MaxLength] == "-" || NumerOperation.innerHTML[MaxLength] == "*" || NumerOperation.innerHTML[MaxLength] == "/" || NumerOperation.innerHTML[MaxLength] == "%"){
            return false
        }else {
            NumerOperation.innerHTML += opera.value
        }
    })
})


ButtonAllClear.addEventListener('click' , function (){
    if (NumerOperation.innerHTML == "0" || BoxDropOrClose == true){
      
    }else {
        NumerOperation.innerHTML = '0'
        ResultNumber.innerHTML = '0'
        AddNextOperation()
        StartOperationPhone()
    }
})

ButtonBackSpace.addEventListener('click' , function (){
    if (NumerOperation.innerHTML.length == 1){
        NumerOperation.innerHTML = '0'
    }else {
        NumerOperation.innerHTML = NumerOperation.innerHTML.slice(0 , -1)
    }
    
})

ButtonResult.addEventListener('click' , function (){
    var InptClcMaxlength = NumerOperation.innerHTML.length - 1
    if (NumerOperation.innerHTML[InptClcMaxlength] == "+" || NumerOperation.innerHTML[InptClcMaxlength] == "-" || NumerOperation.innerHTML[InptClcMaxlength] == "*" || NumerOperation.innerHTML[InptClcMaxlength] == "/" || NumerOperation.innerHTML[InptClcMaxlength] == "%"){
        return false
    
    }else if ( testoperation('-') == -1 && testoperation('+') == -1 && testoperation('*') == -1 && testoperation('/') == -1   ) {
        return false
    } else if (NumerOperation.innerHTML == "0"){
        NumerOperation.innerHTML = ""
        return false
    } else {
        ResultNumber.innerHTML = eval(NumerOperation.innerHTML)
        ObjResult = {
            Result : ResultNumber.innerHTML ,
            Operation :  NumerOperation.innerHTML , 
        }
        HistoriOperation.push(ObjResult)
        localHistori('historiCalculator' , HistoriOperation)
        NumerOperation.innerHTML = ResultNumber.innerHTML
        AddItemHistori()
        AddItemHIstoriPhone()
    }
})

const testoperation = (opera) => {
    return NumerOperation.innerHTML.indexOf(opera) 
}


function DarkOrLight (){
    SwichTheme()
    if (Calculator.className.includes('CalculatorDark')){
        localStorage.setItem('ThemeCalculator' , 'Dark')
    }else { 
        localStorage.setItem('ThemeCalculator' , 'Light')
    }
}
var ItemHistoriPhone , ItemHistoriPhoneDark , itemHistoriDark
function SwichTheme (){
    ItemHistoriPhone = $.querySelectorAll('.ItemHistoriPhone')
    ItemHistoriPhoneDark = $.querySelectorAll('.ItemHistoriPhoneDark')
    ItemHistori = $.querySelectorAll('.HistoriItem')
    itemHistoriDark = $.querySelectorAll('.HistoriItemDark')
    Calculator.classList.toggle('CalculatorDark')
    CalculatorHome.classList.toggle('CalculatorDark')
    ResultNumber.classList.toggle('ResultDark')
    NumerOperation.classList.toggle('NumberOperationDark')
    HistoriPhone.classList.toggle('HistoriPhoneDark')
    ButtonCalculator.forEach(function (theme){
        theme.classList.toggle('ButtonCalculatorDark')
    })
    ButtonOperationAll.forEach(function (Btn){
        Btn.classList.toggle('ButtonOperationDark')
    })
    Version.classList.toggle('VersionDark')
    BtnHIstori.classList.toggle('IconDark')
    ClearHistori.classList.toggle('IconDark')
    ItemHistori.forEach(function (Item){
        Item.classList.toggle('HistoriItemDark')
    })
    if (localStorage.getItem('ThemeCalculator') == 'Light'){
        Theme.className = 'fa-regular fa-sun'
        Theme.classList.add('IconDark')
        
        ItemHistori.forEach( function (Histori){
            Histori.className = 'HistoriItemDark'
        })

        ItemHistoriPhone.forEach( function (Histori){
            Histori.className = 'ItemHistoriPhoneDark'
        })
    }else {
        Theme.className = 'fa-regular fa-moon'
        Theme.classList.remove('IconDark')
        ItemHistoriPhoneDark.forEach( function (Histori){
            Histori.className = 'ItemHistoriPhone'
        })
        itemHistoriDark.forEach( function (Histori){
            Histori.className = 'HistoriItem'
        })
    }
}

let createDivHome , CreateDivImage , CreateDivNum , CreateDivOperation , CreateDivResult , CreateImgCopy , CreateImgRemove 


var counterinIndexArry = 0
function AddItemHistori () {
    if (localStorage.getItem('ThemeCalculator' ) == 'Dark'){
        createDivHome = $.createElement('div')
        createDivHome.className = 'HistoriItemDark'
        clcHome.prepend(createDivHome) 
        setTimeout(function (){
            createDivHome.style.opacity = '1'
        } , 100)
    }else {
        createDivHome = $.createElement('div')
        createDivHome.className = 'HistoriItem'
        clcHome.prepend(createDivHome)  
        setTimeout(function (){
            createDivHome.style.opacity = '1'
        } , 100)
    }

    CreateDivNum = $.createElement('div')
    CreateDivNum.className = 'NumberHistori'
    CreateDivNum.style.opacity = '0'
    setTimeout(function (){
        CreateDivNum.style.opacity = '1'
    } , 600)
    createDivHome.append(CreateDivNum)
    
    CreateDivImage = $.createElement('div')
    CreateDivImage.className = 'IconHistori'
    CreateDivImage.style.opacity = '0'
    setTimeout(function (){
        CreateDivImage.style.opacity = '1'
    } , 600)
    createDivHome.append(CreateDivImage)
    
    CreateDivResult = $.createElement('div')
    CreateDivResult.className = 'Num'
    CreateDivResult.innerHTML = HistoriOperation[counterinIndexArry].Operation + ' = ' +  HistoriOperation[counterinIndexArry].Result
    CreateDivResult.setAttribute('data-result' , HistoriOperation[counterinIndexArry].Result )
    CreateDivResult.setAttribute('data-operation' , HistoriOperation[counterinIndexArry].Operation )
    CreateDivNum.append(CreateDivResult)

    CreateImgCopy = $.createElement('i')
    CreateImgCopy.className = 'fa-regular fa-copy'
    CreateImgCopy.title = 'Copy Result'
    CreateDivImage.append(CreateImgCopy)
    
    CreateImgRemove = $.createElement('i')
    CreateImgRemove.className = 'fa-regular fa-trash-can'
    CreateImgRemove.title = 'Remove Item Histori'
    CreateDivImage.append(CreateImgRemove)
    CreateImgRemove.setAttribute('data-remove' ,  HistoriOperation[counterinIndexArry].Operation)


    let indexRemove 
    
    CreateImgRemove.addEventListener('click' , (event) => {
        var shortParent = event.target.parentElement.parentElement.children[0].children[0].getAttribute('data-operation')
        var shortThis = event.target.getAttribute('data-remove')
        if ( shortParent == shortThis ){
            counterinIndexArry--
            var testSome = HistoriOperation.some(function (item){
                return item.Operation == shortParent
            })
            if (testSome){
                indexRemove = HistoriOperation.findIndex(function (ind){
                    return ind.Operation == shortParent
                })
                HistoriOperation.splice(indexRemove , 1)
                localStorage.setItem('historiCalculator' , JSON.stringify(HistoriOperation))
            }
            event.target.parentElement.parentElement.style.opacity = '0'
            var bf = event.target.parentElement.parentElement
            setTimeout(function (){
                bf.remove()
            } , 500)
        }
        IsItemHistori()
    })


        // copy item 
        var itemCopy = document.querySelectorAll('.fa-copy')
    
        itemCopy.forEach(function (item){
            item.addEventListener('click' , copyText)
        })
        
        function copyText (){
            let chlidernAndParent1 = this.parentElement.parentElement.children[0].children[0].getAttribute('data-result')
            
            navigator.clipboard.writeText(chlidernAndParent1);
        }

    counterinIndexArry++


}

let BoxDropOrClose  = false

function DropCalculator (){
    if (window.innerWidth < 840){
        if (!HistoriOperation.length == '0'){
            if (BoxDropOrClose){
                CloseBoxHistoriPhone()
            }else {
                DropBoxHistoriPhone()
            }

        }
    }else {
        if (!HistoriOperation.length == '0'){
            if (BoxDropOrClose){
                CloseBox()
            }else {
                DropBox()
            }
        }else{

        }
    }
}

function CloseBox (){
    BoxDropOrClose = false
    CloseBoxHistori()
    setTimeout(function (){
        CalculatorHome.classList.remove('DropCalCulator')
    } , 1000)
}

function DropBox (){
    CalculatorHome.classList.add('DropCalCulator')
    BoxDropOrClose = true
    DropBoxHistori()
}

function DropBoxHistori (){
        var operationopacity= $.querySelectorAll('.NextOperation')
        var HistoriItem 
        var imagHistori = $.querySelectorAll('.IconHistori')
        var NumHistori = $.querySelectorAll('.NumberHistori')
        if (localStorage.getItem('ThemeCalculator' ) == 'Dark'){
            HistoriItem = $.querySelectorAll('.HistoriItemDark')
    
            imagHistori.forEach((image) => {
                image.style.opacity = '0'
                setTimeout(function (){
                    image.style.opacity = '1'
                } , 1500)
            })
    
            NumHistori.forEach((Num) => {
                Num.style.opacity = '0'
                setTimeout(function (){
                    Num.style.opacity = '1'
                } , 1500)
            })
    
            operationopacity.forEach((item) => {
    
                item.style.opacity = '0'
                setTimeout(function (){
                    item.style.opacity = '1'
                } , 1500)
            })
            HistoriItem.forEach((item) => {
                item.style.opacity = '0'
                setTimeout( function () {
                    item.style.opacity = '1'
                    
                } , 1000)
            })
    
    
    
        }else {
            HistoriItem = $.querySelectorAll('.HistoriItem')
    
            imagHistori.forEach((image) => {
                image.style.opacity = '0'
                setTimeout(function (){
                    image.style.opacity = '1'
                } , 1500)
            })
    
            NumHistori.forEach((Num) => {
                Num.style.opacity = '0'
                setTimeout(function (){
                    Num.style.opacity = '1'
                } , 1500)
            })
            operationopacity.forEach((item) => {
    
                item.style.opacity = '0'
                setTimeout(function (){
                    item.style.opacity = '1'
                } , 1500)
            })
    
            HistoriItem.forEach((item) => {
                item.style.opacity = '0'
                setTimeout( function () {
                    item.style.opacity = '1'
                    
                } , 1000)
            })
            
        }
    
}


const CloseBoxHistori = () => {
    var HistoriItem 
    var operationopacity= $.querySelectorAll('.NextOperation')
    var imagHistori = $.querySelectorAll('.IconHistori')
    var NumHistori = $.querySelectorAll('.NumberHistori')
    if (localStorage.getItem('ThemeCalculator' ) == 'Dark'){
        HistoriItem = $.querySelectorAll('.HistoriItemDark')

        imagHistori.forEach((image) => {
            image.style.opacity = '0'
        })

        NumHistori.forEach((Num) => {
            Num.style.opacity = '0'
        })

        operationopacity.forEach((item) => {
            item.style.opacity = '0'
        })
        HistoriItem.forEach((item) => {
            setTimeout( function () {
                item.style.opacity = '0'
                
            } , 500)
        })
        

    }else {
        HistoriItem = $.querySelectorAll('.HistoriItem')
        imagHistori.forEach((image) => {
            image.style.opacity = '0'
        })

        NumHistori.forEach((Num) => {
            Num.style.opacity = '0'
        })
        operationopacity.forEach((item) => {
            item.style.opacity = '0'
        })

        HistoriItem.forEach((item) => {
            setTimeout( function () {
                item.style.opacity = '0'
                
            } , 500)
        })
        
    }

}

var createDivStart , ItemNextStart

const AddNextOperation = () => {

        if (localStorage.getItem('ThemeCalculator' ) == 'Dark'){
            ItemNextStart = $.createElement('div')
            ItemNextStart.className = 'HistoriItemDark'
            clcHome.prepend(ItemNextStart)
            setTimeout(function (){
                ItemNextStart.style.opacity = '1'
            } , 100)
        }else {
            ItemNextStart = $.createElement('div')
            ItemNextStart.className = 'HistoriItem'
            clcHome.prepend(ItemNextStart)
            setTimeout(function (){
                ItemNextStart.style.opacity = '1'
            } , 100)
        }
    
        createDivStart = $.createElement('div')
        createDivStart.className = 'NextOperation'
        createDivStart.innerHTML = 'Start New Operation'
        ItemNextStart.prepend(createDivStart)
}

function IsItemHistori (){
    if (HistoriOperation.length == '0'){
        CloseBox()
    }
}

function ClearlocalHistori (){
        setTimeout(function (){
            if (localStorage.getItem("ThemeCalculator") == 'Dark'){
                var itemhistoriModalmmdark = $.querySelectorAll('.ItemHistoriPhoneDark')
                itemhistoriModalmmdark.forEach(function (dark){
                    dark.style.display = 'none'
                })
    
                var itemRemoveHistori = $.querySelectorAll('.HistoriItemDark')
                itemRemoveHistori.forEach(function (item){
                    item.style.display = 'none'
                })
            }else {
                var itemhistoriModalmm = $.querySelectorAll('.ItemHistoriPhone')
                itemhistoriModalmm.forEach(function (dark){
                    dark.style.display = 'none'
                })
    
                var itemRemoveHistori = $.querySelectorAll('.HistoriItem')
                itemRemoveHistori.forEach(function (item){
                    item.style.display = 'none'
                })
        
            }
        } , 2000)
        localStorage.removeItem('historiCalculator')
        HistoriOperation.splice(0)
        counterinIndexArry = 0
        CounterHistoriPhone = 0
        CloseBox()
        CloseBoxHistoriPhone()
}


function loaderhistori (){
    let ishistorilocal = JSON.parse(localStorage.getItem('historiCalculator'))
    if (ishistorilocal){
        HistoriOperation = ishistorilocal
    } else {
        HistoriOperation = []
    }
    
    let counterlengthHistoriStorage = HistoriOperation.length
    
    for(var i = 0 ; i <counterlengthHistoriStorage ; i++){
        AddItemHistori()
        AddItemHIstoriPhone()
    }
}

function LoadBody (){
    if (localStorage.getItem('ThemeCalculator') == 'Dark'){
            SwichTheme()
            Theme.className = 'fa-regular fa-sun'
            Theme.classList.add('IconDark')
    }
}


let widthBrowser

function sizeBrowser (){
    widthBrowser = window.innerWidth

    if (widthBrowser < 840 ){
        CloseBox()
    }else {
        CloseBoxHistoriPhone()
    }
}


let createItemHistoriPhone , createaNumberHistoriPhone , createResultPhone , createImagePhonw , createIconCopy , createIconDelete

let CounterHistoriPhone = 0


function AddItemHIstoriPhone (){
    if (localStorage.getItem('ThemeCalculator') == 'Dark'){
        createItemHistoriPhone = $.createElement('div')
        createItemHistoriPhone.className = 'ItemHistoriPhoneDark'
        HistoriPhone.prepend(createItemHistoriPhone)
    }else{
        createItemHistoriPhone = $.createElement('div')
        createItemHistoriPhone.className = 'ItemHistoriPhone'
        HistoriPhone.prepend(createItemHistoriPhone)
    }

    createaNumberHistoriPhone = $.createElement('div')
    createaNumberHistoriPhone.className = 'NumberItem'
    createItemHistoriPhone.append(createaNumberHistoriPhone)

    createResultPhone = $.createElement('div')
    createResultPhone.className = 'ResultOperation'
    createResultPhone.innerHTML = HistoriOperation[CounterHistoriPhone].Operation + ' = ' + HistoriOperation[CounterHistoriPhone].Result
    createResultPhone.setAttribute('data-result' , HistoriOperation[CounterHistoriPhone].Result )
    createResultPhone.setAttribute('data-operation' , HistoriOperation[CounterHistoriPhone].Operation )
    createaNumberHistoriPhone.append(createResultPhone)


    createImagePhonw = $.createElement('div')
    createImagePhonw.className = 'iconItem'
    createItemHistoriPhone.append(createImagePhonw)

    
    createIconDelete = $.createElement('i')
    createIconDelete.className = 'fa-regular fa-trash-can'
    createIconDelete.title = 'Remove Item Histor'
    createIconDelete.setAttribute('data-remove' ,  HistoriOperation[CounterHistoriPhone].Operation)
    createImagePhonw.append(createIconDelete)
    
    createIconCopy = $.createElement('i')
    createIconCopy.className = 'fa-regular fa-copy'
    createIconCopy.title = 'Copy Result'
    createImagePhonw.append(createIconCopy)
    //reomve 
    var indexRemoveModal
    createIconDelete.addEventListener("click" , (event) => {
        var shortParentModal = event.target.parentElement.parentElement.children[0].children[0].getAttribute('data-operation')
        var shortThisModal = event.target.getAttribute('data-remove')
        if ( shortParentModal == shortThisModal ){
            CounterHistoriPhone--
            counterinIndexArry--
            var testSomeModal = HistoriOperation.some(function (item){
                return item.Operation == shortParentModal
            })
            if (testSomeModal){
                indexRemoveModal = HistoriOperation.findIndex(function (ind){
                    return ind.Operation == shortParentModal
                })
                HistoriOperation.splice(indexRemoveModal , 1)
                localStorage.setItem('historiCalculator' , JSON.stringify(HistoriOperation))
            }
            event.target.parentElement.parentElement.style.opacity = '0'
            var bff = event.target.parentElement.parentElement
            setTimeout(function (){
        
                bff.remove()
            } , 500)
            if (HistoriOperation.length == '0'){
                CloseBoxHistoriPhone()
            }

        }

    })
    
        // copy item 
        var itemCopyModal = document.querySelectorAll('.fa-copy')
    
        itemCopyModal.forEach(function (item){
            item.addEventListener('click' , copyTextModal)
        })
        
        function copyTextModal (){
            let chlidernAndParent1Modal = this.parentElement.parentElement.children[0].children[0].getAttribute('data-result')
            
            navigator.clipboard.writeText(chlidernAndParent1Modal);
        }

    CounterHistoriPhone++
}

let mapbtnCalculator = $.querySelectorAll('.btnCalculator')[0]

function DropBoxHistoriPhone () {
    BoxDropOrClose = true
    HistoriPhone.classList.add('HistoriPhoneDrop')
    Version.style.filter = "blur(2px)"
    mapbtnCalculator.style.filter = "blur(2px)"
    setTimeout(function (){
        showitemHistoriModal()
    },300)
}
function CloseBoxHistoriPhone () {
    BoxDropOrClose = false
    closeBoxHistoriModal()
    setTimeout(function (){
        HistoriPhone.classList.remove('HistoriPhoneDrop')
        Version.style.filter = "blur(0)"
        mapbtnCalculator.style.filter = "blur(0)"
    } , 1100)
}

let CreateDivItemStartOperation , createStartOperation

function StartOperationPhone (){
    if (localStorage.getItem('ThemeCalculator') == 'Dark'){
        CreateDivItemStartOperation = $.createElement('div')
        CreateDivItemStartOperation.className = 'ItemHistoriPhoneDark'
        HistoriPhone.prepend(CreateDivItemStartOperation)
    }else {
        CreateDivItemStartOperation = $.createElement('div')
        CreateDivItemStartOperation.className = 'ItemHistoriPhone'
        HistoriPhone.prepend(CreateDivItemStartOperation)
    }
    createStartOperation = $.createElement('div')
    createStartOperation.className = 'StartOperationPhone'
    createStartOperation.innerHTML = 'Start New Operation'
    CreateDivItemStartOperation.append(createStartOperation)
}


var NumHistoriModalClsoe , ImageHistoriModalClosr , itemHistoriModalCloseDark  , itemHistoriModalClose , StartOperationHistoriModal

function closeBoxHistoriModal (){
    StartOperationHistoriModal = $.querySelectorAll('.StartOperationPhone')
    NumHistoriModalClsoe = $.querySelectorAll('.NumberItem')
    ImageHistoriModalClosr = $.querySelectorAll('.iconItem')
    
    if (localStorage.getItem('ThemeCalculator' ) == 'Dark'){
        itemHistoriModalCloseDark = $.querySelectorAll('.ItemHistoriPhoneDark')

        NumHistoriModalClsoe.forEach(function (Num){
            Num.style.opacity = '0'
        })

        StartOperationHistoriModal.forEach(function (item){
            item.style.opacity = '0'
        })

        ImageHistoriModalClosr.forEach(function (Image){
            Image.style.opacity = '0'
        })
        
        itemHistoriModalCloseDark.forEach(function (itemclose){
            setTimeout(function(){
                itemclose.style.opacity = '0'
            } , 500 )
        })

    }else {
        itemHistoriModalClose = $.querySelectorAll('.ItemHistoriPhone ')  

        NumHistoriModalClsoe.forEach(function (Num){
            Num.style.opacity = '0'
        })

        ImageHistoriModalClosr.forEach(function (Image){
            Image.style.opacity = '0'
        })

        StartOperationHistoriModal.forEach(function (item){
            item.style.opacity = '0'
        })

        itemHistoriModalClose.forEach(function (Close){
            setTimeout(function (){

                Close.style.opacity = '0'
            } , 500 )
        })
    }
}

function showitemHistoriModal (){
    StartOperationHistoriModal = $.querySelectorAll('.StartOperationPhone')
    NumHistoriModalClsoe = $.querySelectorAll('.NumberItem')
    ImageHistoriModalClosr = $.querySelectorAll('.iconItem')
    if (localStorage.getItem('ThemeCalculator' ) == 'Dark'){
        itemHistoriModalCloseDark = $.querySelectorAll('.ItemHistoriPhoneDark')
        itemHistoriModalCloseDark.forEach(function (item){
            item.style.opacity = '0'
            setTimeout(function (){
                item.style.opacity = '1'
            } , 1000 )

            NumHistoriModalClsoe.forEach(function (item){
                item.style.opacity = '0'
                setTimeout(function (){
                    item.style.opacity = '1'
                } , 1400 )
            })
            StartOperationHistoriModal.forEach(function (item){
                item.style.opacity = '0'
                setTimeout(function (){
                    item.style.opacity = '1'
                } , 1400)
            })
            ImageHistoriModalClosr.forEach(function (item){
                item.style.opacity = '0'
                setTimeout(function (){
                    item.style.opacity = '1'
                } , 1400 )
            })
        
        })
    }else{
        itemHistoriModalCloseDark = $.querySelectorAll('.ItemHistoriPhone ')
        itemHistoriModalCloseDark.forEach(function (item){
            item.style.opacity = '0'
            setTimeout(function (){
                item.style.opacity = '1'
            } , 1000 )

            NumHistoriModalClsoe.forEach(function (item){
                item.style.opacity = '0'
                setTimeout(function (){
                    item.style.opacity = '1'
                } , 1400 )
            })

            StartOperationHistoriModal.forEach(function (item){
                item.style.opacity = '0'
                setTimeout(function (){
                    item.style.opacity = '1'
                } , 1400)
            })

            ImageHistoriModalClosr.forEach(function (item){
                item.style.opacity = '0'
                setTimeout(function (){
                    item.style.opacity = '1'
                } , 1400 )
            })
        
        })
    }
}
