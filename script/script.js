let $ = document
let Theme = $.querySelectorAll('#Theme')[0]
let BtnHIstori = $.querySelectorAll('.BtnHIstori')[0]
let ClearHistori = $.querySelectorAll('.ClearHistori')[0]
let HistoriModal = $.querySelectorAll('.HistoriModal')[0]
let CloseHistoriModal = $.querySelectorAll('.iconCloseHistori')[0]
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

CloseHistoriModal.addEventListener('click' , CloseHIstoriModalBox)

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
        NumerOperation.innerHTML += opera.value
    })
})


ButtonAllClear.addEventListener('click' , function (){
    if (NumerOperation.innerHTML == "0"){
      
    }else {
        NumerOperation.innerHTML = '0'
        ResultNumber.innerHTML = '0'
        AddNextOperation()
        StarOperationModal()
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
    if (NumerOperation.innerHTML[InptClcMaxlength] === "+" || NumerOperation.innerHTML[InptClcMaxlength] === "-" || NumerOperation.innerHTML[InptClcMaxlength] === "*" || NumerOperation.innerHTML[InptClcMaxlength] === "/"){
        return false
    
    }else if ( testoperation('-') == -1 && testoperation('+') == -1 && testoperation('*') == -1 && testoperation('/') == -1   ) {
        return false
    } else if (NumerOperation.innerHTML == "0"){
        NumerOperation.innerHTML = ""
        return false
    } else {
        ResultNumber.innerHTML = eval(NumerOperation.innerHTML)
        ObjResult = {
            Id : HistoriOperation.length + 1 ,
            Result : ResultNumber.innerHTML ,
            Operation :  NumerOperation.innerHTML , 
        }
        HistoriOperation.push(ObjResult)
        localHistori('historiCalculator' , HistoriOperation)
        NumerOperation.innerHTML = ResultNumber.innerHTML
        AddItemHistori()
        addItemHistoriModal()
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
var itemHistoriModal , itemHistoriModalDark , itemHistoriDark
function SwichTheme (){
    itemHistoriModal = $.querySelectorAll('.itemHistoriModal')
    itemHistoriModalDark = $.querySelectorAll('.itemHistoriModalDark')
    ItemHistori = $.querySelectorAll('.HistoriItem')
    itemHistoriDark = $.querySelectorAll('.HistoriItemDark')
    Calculator.classList.toggle('CalculatorDark')
    CalculatorHome.classList.toggle('CalculatorDark')
    ResultNumber.classList.toggle('ResultDark')
    NumerOperation.classList.toggle('NumberOperationDark')
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

        itemHistoriModal.forEach( function (Histori){
            Histori.className = 'itemHistoriModalDark'
        })
    }else {
        Theme.className = 'fa-regular fa-moon'
        Theme.classList.remove('IconDark')
        itemHistoriModalDark.forEach( function (Histori){
            Histori.className = 'itemHistoriModal'
        })
        itemHistoriDark.forEach( function (Histori){
            Histori.className = 'HistoriItem'
        })
    }
    HistoriModal.classList.toggle('HistoriModalDark')
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
            BoxDropOrClose = true
            CloseHistoriModal.style.display = 'block'
            CloseHistoriModal.style.animation = 'DropModal 1.2s forwards ease-in-out'
            HistoriModal.style.display = 'block'
            HistoriModal.style.animation = 'DropModal 1s forwards ease-in-out'
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
                var itemhistoriModalmmdark = $.querySelectorAll('.itemHistoriModalDark')
                itemhistoriModalmmdark.forEach(function (dark){
                    dark.style.display = 'none'
                })
    
                var itemRemoveHistori = $.querySelectorAll('.HistoriItemDark')
                itemRemoveHistori.forEach(function (item){
                    item.style.display = 'none'
                })
            }else {
                var itemhistoriModalmm = $.querySelectorAll('.itemHistoriModal')
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
        counterinIndexArryModalHistori = 0
        CloseBox()
        CloseHIstoriModalBox()
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
        addItemHistoriModal()
    }
}

function LoadBody (){
    if (localStorage.getItem('ThemeCalculator') == 'Dark'){
            SwichTheme()
            Theme.className = 'fa-regular fa-sun'
            Theme.classList.add('IconDark')
    }
}

function CloseHIstoriModalBox (){
    BoxDropOrClose = false
    HistoriModal.style.animation = 'CloseHistori 1s forwards ease-in-out'
    CloseHistoriModal.style.animation = 'CloseHistori 0.8s forwards ease-in-out'
}

let widthBrowser

function sizeBrowser (){
    widthBrowser = window.innerWidth

    if (widthBrowser < 840 ){
        CloseBox()
    }else {
        CloseHIstoriModalBox()
    }
}


let createDivItemHistoriModal , createNumHistoriModal , createDivResultModal , createDivImagesHistoriMOdal , createImageCopyModal , createImageDeleteModal

let counterinIndexArryModalHistori = 0


function addItemHistoriModal (){
    if (localStorage.getItem('ThemeCalculator') == 'Dark'){
        createDivItemHistoriModal = $.createElement('div')
        createDivItemHistoriModal.className = 'itemHistoriModalDark'
        HistoriModal.prepend(createDivItemHistoriModal)
    }else{
        createDivItemHistoriModal = $.createElement('div')
        createDivItemHistoriModal.className = 'itemHistoriModal'
        HistoriModal.prepend(createDivItemHistoriModal)
    }

    createNumHistoriModal = $.createElement('div')
    createNumHistoriModal.className = 'NumHistoriModal'
    createDivItemHistoriModal.append(createNumHistoriModal)

    createDivResultModal = $.createElement('div')
    createDivResultModal.className = 'text-center'
    createDivResultModal.style.fontSize = '22px'
    createDivResultModal.innerHTML = HistoriOperation[counterinIndexArryModalHistori].Operation + ' = ' + HistoriOperation[counterinIndexArryModalHistori].Result
    createDivResultModal.setAttribute('data-result' , HistoriOperation[counterinIndexArryModalHistori].Result )
    createDivResultModal.setAttribute('data-operation' , HistoriOperation[counterinIndexArryModalHistori].Operation )
    createNumHistoriModal.append(createDivResultModal)


    createDivImagesHistoriMOdal = $.createElement('div')
    createDivImagesHistoriMOdal.className = 'imageHistoriModal'
    createDivItemHistoriModal.append(createDivImagesHistoriMOdal)

    createImageCopyModal = $.createElement('i')
    createImageCopyModal.className = 'fa-regular fa-copy'
    createImageCopyModal.title = 'Copy Result'
    createDivImagesHistoriMOdal.append(createImageCopyModal)

    createImageDeleteModal = $.createElement('i')
    createImageDeleteModal.className = 'fa-regular fa-trash-can'
    createImageDeleteModal.title = 'Remove Item Histor'
    createImageDeleteModal.setAttribute('data-remove' ,  HistoriOperation[counterinIndexArryModalHistori].Operation)
    createDivImagesHistoriMOdal.append(createImageDeleteModal)

    //reomve 
    var indexRemoveModal
    createImageDeleteModal.addEventListener("click" , (event) => {
        var shortParentModal = event.target.parentElement.parentElement.children[0].children[0].getAttribute('data-operation')
        var shortThisModal = event.target.getAttribute('data-remove')
        if ( shortParentModal == shortThisModal ){
            counterinIndexArryModalHistori--
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
                CloseHIstoriModalBox()
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

    counterinIndexArryModalHistori++
}

var createDivStartOperatinModal

function StarOperationModal(){

    if (localStorage.getItem('ThemeCalculator' ) == 'Dark'){
        createDivItemHistoriModal = $.createElement('div')
        createDivItemHistoriModal.className = 'itemHistoriModalDark'
        HistoriModal.prepend(createDivItemHistoriModal)
    }else {
        createDivItemHistoriModal = $.createElement('div')
        createDivItemHistoriModal.className = 'itemHistoriModal'
        HistoriModal.prepend(createDivItemHistoriModal)

    }

    createDivStartOperatinModal = $.createElement('div')
    createDivStartOperatinModal.className = 'startOperationModal'
    createDivStartOperatinModal.innerHTML = 'Start New Operation'
    createDivItemHistoriModal.append(createDivStartOperatinModal)

}