let $ = document
let Theme = $.querySelectorAll('#Theme')[0]
let BtnHIstori = $.querySelectorAll('.BtnHIstori')[0]
let HistoriPhone = $.querySelectorAll('.HistoriSectionMobile')[0]
let ClearHistoriDesktop = $.querySelectorAll('.ClearHistoriDesktop')[0]
let ClearHistoriPhone = $.querySelectorAll('.ClearHistoriPhone')[0]
let clcHome = $.querySelectorAll('.HistoriSection')[0]
let CalculatorHome = $.querySelectorAll('.CalculatorPosition')[0]
let Version = $.querySelectorAll('.Version')[0] 
let NumberResultOperationDiv = $.querySelectorAll('.NumberResult-Operation')[0]
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
var iconClearAllHistoriPhone = $.querySelector('.iconClearAllHistoriPhone')
var iconClearAllHistoriDesktop = $.querySelector('.iconClearAllHistoriDesktop')
let mapbtnCalculator = $.querySelectorAll('.btnCalculator')[0]
let HistoriSectionMobile = $.querySelector('.HistoriPhone')

let NumberOfOperation = 0
let valueKeyUserResult = 0
let valueKeyUserAfter = 0
let valueKeyUserBefore = 0
let ValueOperation , ItemHistori , TypeOperation 


let HistoriOperation = []
var ObjResult


Theme.addEventListener('click' , DarkOrLight)

BtnHIstori.addEventListener('click' , DropCalculator)

ClearHistoriDesktop.addEventListener('click' , ClearlocalHistori)

ClearHistoriPhone.addEventListener('click' , ClearlocalHistori)

window.addEventListener('load' , loaderhistori) 

window.addEventListener('resize' , sizeBrowser)



const c = (p) => {
    console.log(p);
}

function localHistori (one , two){
    localStorage.setItem(one , JSON.stringify(two))
}

function displayNumber (number){
    if (TypeOperation == '+' || TypeOperation == '-' || TypeOperation == '*' ||TypeOperation == '/' ||TypeOperation == '%' ){
        if (valueKeyUserAfter == 0){
            valueKeyUserAfter = number
            NumerOperation.innerHTML += number
        }else {
            valueKeyUserAfter += number
            NumerOperation.innerHTML += number
        }
        switch (TypeOperation){
            case '+':
                SumValueOpera()
                break;
            case '-':
                SubMission()
                break;
            case '*':
                Multiplication()
                break;
            case '/':
                DivisionOperation()
                break;
            case '%':
                PercentOperation()
                break;

        }
    }else{
        if (valueKeyUserBefore == 0){
            valueKeyUserBefore = number
            NumerOperation.innerHTML = number
        }else {
            valueKeyUserBefore += number
            NumerOperation.innerHTML += number
        }
    }
}

function OperationResultAdd (Opera){
    var MaxLength = NumerOperation.innerHTML.length - 1
    if (NumerOperation.innerHTML[MaxLength] == "+" || NumerOperation.innerHTML[MaxLength] == "-" || NumerOperation.innerHTML[MaxLength] == "*" || NumerOperation.innerHTML[MaxLength] == "/" || NumerOperation.innerHTML[MaxLength] == "%"){
        NumerOperation.innerHTML = NumerOperation.innerHTML.slice(0 , -1)
        NumerOperation.innerHTML += Opera
        TypeOperation = Opera
        return false
    }else if (NumerOperation.innerHTML == 0){
        return false
    }else {
        if (NumberOfOperation > 0){
            valueKeyUserAfter = 0
            valueKeyUserBefore = valueKeyUserResult
        }
        NumberOfOperation += 1
        TypeOperation = Opera
        NumerOperation.innerHTML += Opera
    }
}

function SumValueOpera (){
    valueKeyUserResult = Number(valueKeyUserBefore) + Number(valueKeyUserAfter)
}

function SubMission (){
    valueKeyUserResult = valueKeyUserBefore - valueKeyUserAfter
}

function Multiplication (){
    valueKeyUserResult = valueKeyUserBefore * valueKeyUserAfter
}

function DivisionOperation (){
    valueKeyUserResult = valueKeyUserBefore / valueKeyUserAfter
}
function PercentOperation (){
    valueKeyUserResult = (valueKeyUserBefore/100) * valueKeyUserAfter
}


function BackSpaceOperation (){
    MaxLengthNumberOperation = NumerOperation.innerHTML.length - 1

    if (NumerOperation.innerHTML[MaxLengthNumberOperation] == '+' || NumerOperation.innerHTML[MaxLengthNumberOperation] == '-' || NumerOperation.innerHTML[MaxLengthNumberOperation] == '*' || NumerOperation.innerHTML[MaxLengthNumberOperation] == '/' || NumerOperation.innerHTML[MaxLengthNumberOperation] == '%'){
        NumerOperation.innerHTML = NumerOperation.innerHTML.slice(0 , -1)
        
        if (NumberOfOperation == 1){
            TypeOperation = undefined
            NumberOfOperation = 0
        }else {
            NumberOfOperation = NumberOfOperation - 1
            BackSpaceOperationNotOne()
            MoveBeforeToAfter()
        }
        
    }else {

        if (valueKeyUserAfter == 0){
            valueKeyUserAfterZero()
        }else {
            valueKeyUserAfterNotZero()
        }
        OperationWhithBacspace()
    }

}

var indexOperation 
function BackSpaceOperationNotOne (){

    indexPlus = NumerOperation.innerHTML.lastIndexOf('+')
    indexSubMission = NumerOperation.innerHTML.lastIndexOf('-')
    indexMultiplication = NumerOperation.innerHTML.lastIndexOf('*')
    indexDivision = NumerOperation.innerHTML.lastIndexOf('/')
    indexPercent = NumerOperation.innerHTML.lastIndexOf('%')
    
    if (indexPlus > indexSubMission && indexPlus > indexMultiplication && indexPlus > indexDivision && indexPlus > indexPercent){
        indexOperation = indexPlus
        TypeOperation = '+'
        return false
    }else if (indexSubMission > indexPlus && indexSubMission > indexMultiplication && indexSubMission > indexDivision && indexSubMission > indexPercent){
        indexOperation = indexSubMission
        TypeOperation = '-'
        return false
    }else if (indexMultiplication > indexPlus && indexMultiplication > indexSubMission && indexMultiplication > indexDivision && indexMultiplication > indexPercent){
        indexOperation = indexMultiplication
        TypeOperation = '*'
        return false
    }else if (indexDivision > indexPlus && indexDivision > indexSubMission && indexDivision > indexMultiplication && indexDivision > indexPercent){
        indexOperation = indexDivision
        TypeOperation = '/'
        return false
    }else if (indexPercent > indexPlus && indexPercent > indexSubMission && indexPercent > indexMultiplication && indexPercent > indexDivision){
        indexOperation = indexPercent
        TypeOperation = '%'
        return false
    }

}

function valueKeyUserAfterNotZero (){
    valueKeyUserAfter = valueKeyUserAfter.toString().slice(0 , -1)
    NumerOperation.innerHTML = NumerOperation.innerHTML.slice(0 , -1)
    if (valueKeyUserAfter == ''){
         valueKeyUserAfter = 0
    }
}

function valueKeyUserAfterZero(){
    NumerOperation.innerHTML = NumerOperation.innerHTML.slice(0 , -1)
}

function OperationWhithBacspace (){
    indexPlus = NumerOperation.innerHTML.lastIndexOf('+')
    indexSubMission = NumerOperation.innerHTML.lastIndexOf('-')
    indexMultiplication = NumerOperation.innerHTML.lastIndexOf('*')
    indexDivision = NumerOperation.innerHTML.lastIndexOf('/')
    indexPercent = NumerOperation.innerHTML.lastIndexOf('%')
    
    MaxLengthNumberOperation = NumerOperation.innerHTML.length -1

    if (indexPlus > indexSubMission && indexPlus > indexMultiplication && indexPlus > indexDivision && indexPlus > indexPercent){

        SumValueOpera()
        return false
        
    }else if (indexSubMission > indexPlus && indexSubMission > indexMultiplication && indexSubMission > indexDivision && indexSubMission > indexPercent){

        SubMission() 
        return false

    }else if (indexMultiplication > indexPlus && indexMultiplication > indexSubMission && indexMultiplication > indexDivision && indexMultiplication > indexPercent){

        Multiplication()
        return false

    }else if (indexDivision > indexPlus && indexDivision > indexSubMission && indexDivision > indexMultiplication && indexDivision > indexPercent){

        DivisionOperation()
        return false

    }else if (indexPercent > indexPlus && indexPercent > indexSubMission && indexPercent > indexMultiplication && indexPercent > indexDivision){

        PercentOperation()
        return false

    }else {
        valueKeyUserBefore = valueKeyUserBefore.toString().slice(0 , -1)
        if (valueKeyUserBefore == ''){
            valueKeyUserBefore = 0
            NumerOperation.innerHTML = 0
        }
    }
}

var CutLastValueForBefore
function MoveBeforeToAfter (){
    indexOperation += 1
    CutLastValueForBefore = NumerOperation.innerHTML.slice(indexOperation)
    valueKeyUserAfter = Number(CutLastValueForBefore)
    switch (TypeOperation) {
        case '+' : 
        returnBeforeOperationSubMission()
            break ;
        case '-' : 
        returnBeforeOperationSum()
            break ;
        case '*' : 
        returnBeforeOperationDivision()
            break ;
        case '/' : 
        returnBeforeOperationMultiplication()
            break ;
        case '%' : 
        returnBeforeOperationPercent()
            break ;
    }

}

function returnBeforeOperationSubMission (){
    valueKeyUserBefore =  valueKeyUserBefore - valueKeyUserAfter
    SumValueOpera()
}
function returnBeforeOperationSum (){
    valueKeyUserBefore = Number(valueKeyUserBefore) + Number(valueKeyUserAfter)
    SubMission()
}
function returnBeforeOperationDivision (){
    valueKeyUserBefore = valueKeyUserBefore / valueKeyUserAfter
    Multiplication()
}
function returnBeforeOperationMultiplication (){
    valueKeyUserBefore = valueKeyUserBefore * valueKeyUserAfter
    DivisionOperation()
}
function returnBeforeOperationPercent (){
    valueKeyUserBefore = valueKeyUserAfter * 100
    PercentOperation()
}

function AllClear (){
    if (NumerOperation.innerHTML == "0"){
      
    }else {
        NumerOperation.innerHTML = '0'
        ResultNumber.innerHTML = '0'
        valueKeyUserAfter = 0 
        valueKeyUserBefore = 0 
        valueKeyUserResult = 0 
        TypeOperation = undefined
        NumberOfOperation = 0
        AddNextOperation()
        StartOperationPhone()
    }

    if (window.innerWidth < 531){
        FontsizeResultNumber1()
    }else {
        FontsizeResultNumber2()
    } 
}

function ResultOpration (){
    var InptClcMaxlength = NumerOperation.innerHTML.length - 1
    if (NumerOperation.innerHTML[InptClcMaxlength] == "+" || NumerOperation.innerHTML[InptClcMaxlength] == "-" || NumerOperation.innerHTML[InptClcMaxlength] == "*" || NumerOperation.innerHTML[InptClcMaxlength] == "/" || NumerOperation.innerHTML[InptClcMaxlength] == "%"){
        return false
    }else if ( testoperation('-') == -1 && testoperation('+') == -1 && testoperation('*') == -1 && testoperation('/') == -1 && testoperation('%') == -1  ) {
        return false
    } else if (NumerOperation.innerHTML == "0"){
        NumerOperation.innerHTML = ""
        return false
    } else {
        ResultNumber.innerHTML = valueKeyUserResult
        ObjResult = {
            Result : ResultNumber.innerHTML ,
            Operation :  NumerOperation.innerHTML , 
        }
        HistoriOperation.push(ObjResult)
        localHistori('historiCalculator' , HistoriOperation)
        NumerOperation.innerHTML = ResultNumber.innerHTML
        AddItemHistori()
        AddItemHIstoriPhone()
        TypeOperation = undefined
        NumberOfOperation = 0
    }
    if (window.innerWidth < 531){
        FontsizeResultNumber1()
    }else {
        FontsizeResultNumber2()
    }
}
function testoperation(opera){
    return NumerOperation.innerHTML.indexOf(opera) 
} 

document.body.addEventListener('keyup' , function (event) {
    switch (event.key){
        case '.':
            displayNumber(event.key)
            break;
        case '1':
            displayNumber(event.key)
            break;
        case '2':
            displayNumber(event.key)
            break;
        case '3':
            displayNumber(event.key)
        break;
        case '5':
            displayNumber(event.key)
            break;
        case '4':
            displayNumber(event.key)
        break;
        case '6':
            displayNumber(event.key)
        break;
        case '7':
            displayNumber(event.key)
        break;
        case '8':
            displayNumber(event.key)
            break;
        case '9':
            displayNumber(event.key)
        break;
        case '0':
            displayNumber(event.key)
            break;
        case '-':
            OperationResultAdd(event.key)
            break;
        case '+':
            OperationResultAdd(event.key)
            break;
        case '%':
            OperationResultAdd(event.key)
            break;
        case '*':
            OperationResultAdd(event.key)
            break;
        case '/':
            OperationResultAdd(event.key)
            break;
        case '=':
            ResultOpration()
            break;
        case 'Enter':
            ResultOpration()
            break;
        case 'Backspace':
            BackSpaceOperation()
            break;
    }
} )
var lengthResultNumber
function FontsizeResultNumber1 (){
    lengthResultNumber = ResultNumber.innerHTML.length
    
    if (window.innerWidth < 320){

        innerWidth320() 

    }else if (window.innerWidth <= 360){

        innerWidth360()

    }else if (window.innerWidth <= 395){

        innerWidth395()

    }else if (window.innerWidth <= 421){

        innerWidth421()

    }else if (window.innerWidth <= 440){

        innerWidth440()

    }else if (window.innerWidth <= 460){

        innerWidth460()

    }else if (window.innerWidth <= 488){

        innerWidth488()

    }else if (window.innerWidth <= 510){

        innerWidth510()

    }else if (window.innerWidth <= 530){

        innerWidth530()

    }
}

function FontsizeResultNumber2(){
    lengthResultNumber = ResultNumber.innerHTML.length
    if (lengthResultNumber <= 6){

        EditFontSizeShortCut('164.976px' , '110px')
        
    }else if (lengthResultNumber == 7){

        EditFontSizeShortCut('164.976px' , '90px')
        
    }else if (lengthResultNumber == 8){

        EditFontSizeShortCut('164.976px' , '80px')
        
    }else if (lengthResultNumber == 9){

        EditFontSizeShortCut('164.976px' , '70px')
        
    }else if (lengthResultNumber == 10){

        EditFontSizeShortCut('164.976px' , '65px')
        
    }else if (lengthResultNumber == 11){

        EditFontSizeShortCut('164.976px' , '60px')
        
    }else if (lengthResultNumber == 12){

        EditFontSizeShortCut('164.976px' , '55px')
        
    }else if (lengthResultNumber == 13){

        EditFontSizeShortCut('164.976px' , '50px')
        
    }else if (lengthResultNumber >= 14){

        EditFontSizeShortCut('164.976px' , '45px')
    
    }
}

function EditFontSizeShortCut (editheight , fontsresult){
    ResultNumber.style.height = editheight
    ResultNumber.style.fontSize = fontsresult
}

function innerWidth530 (){

    if (lengthResultNumber <= 6){
        
        EditFontSizeShortCut('150px' , '100px')
        
    }else if (lengthResultNumber == 7){

        EditFontSizeShortCut('150px' , '90px')
        
    }else if (lengthResultNumber == 8){

        EditFontSizeShortCut('150px' , '80px')
        
    }else if (lengthResultNumber == 9){

        EditFontSizeShortCut('150px' , '70px')
        
    }else if (lengthResultNumber == 10){

        EditFontSizeShortCut('150px' , '65px')
        
    }else if (lengthResultNumber == 11){

        EditFontSizeShortCut('150px' , '60px')
        
    }else if (lengthResultNumber == 12){

        EditFontSizeShortCut('150px' , '55px')
        
    }else if (lengthResultNumber == 13){

        EditFontSizeShortCut('150px' , '50px')
        
    }else if (lengthResultNumber >= 14){

        EditFontSizeShortCut('150px' , '45px')
    
    }
}
function innerWidth510 (){

    if (lengthResultNumber <= 6){
        
        EditFontSizeShortCut('150px' , '100px')
        
    }else if (lengthResultNumber == 7){

        EditFontSizeShortCut('150px' , '90px')
        
    }else if (lengthResultNumber == 8){

        EditFontSizeShortCut('150px' , '80px')
        
    }else if (lengthResultNumber == 9){

        EditFontSizeShortCut('150px' , '70px')
        
    }else if (lengthResultNumber == 10){

        EditFontSizeShortCut('150px' , '62px')
        
    }else if (lengthResultNumber == 11){

        EditFontSizeShortCut('150px' , '58px')
        
    }else if (lengthResultNumber == 12){

        EditFontSizeShortCut('150px' , '53px')
        
    }else if (lengthResultNumber == 13){

        EditFontSizeShortCut('150px' , '48px')
        
    }else if (lengthResultNumber >= 14){

        EditFontSizeShortCut('150px' , '45px')
    
    }
}
function innerWidth488 (){

    if (lengthResultNumber <= 6){
        
        EditFontSizeShortCut('135px' , '90px')
        
    }else if (lengthResultNumber == 7){

        EditFontSizeShortCut('135px' , '80px')
        
    }else if (lengthResultNumber == 8){

        EditFontSizeShortCut('135px' , '70px')
        
    }else if (lengthResultNumber == 9){

        EditFontSizeShortCut('135px' , '60px')
        
    }else if (lengthResultNumber == 10){

        EditFontSizeShortCut('135px' , '58px')
        
    }else if (lengthResultNumber == 11){

        EditFontSizeShortCut('135px' , '52px')
        
    }else if (lengthResultNumber == 12){

        EditFontSizeShortCut('135px' , '48px')
        
    }else if (lengthResultNumber == 13){

        EditFontSizeShortCut('135px' , '44px')
        
    }else if (lengthResultNumber >= 14){

        EditFontSizeShortCut('135px' , '40px')
    
    }
}
function innerWidth460 (){

    if (lengthResultNumber <= 6){
        
        EditFontSizeShortCut('135px' , '90px')
        
    }else if (lengthResultNumber == 7){

        EditFontSizeShortCut('135px' , '75px')
        
    }else if (lengthResultNumber == 8){

        EditFontSizeShortCut('135px' , '68px')
        
    }else if (lengthResultNumber == 9){

        EditFontSizeShortCut('135px' , '60px')
        
    }else if (lengthResultNumber == 10){

        EditFontSizeShortCut('135px' , '53px')
        
    }else if (lengthResultNumber == 11){

        EditFontSizeShortCut('135px' , '48px')
        
    }else if (lengthResultNumber == 12){

        EditFontSizeShortCut('135px' , '43px')
        
    }else if (lengthResultNumber == 13){

        EditFontSizeShortCut('135px' , '40px')
        
    }else if (lengthResultNumber >= 14){

        EditFontSizeShortCut('135px' , '38px')
    
    }
}
function innerWidth440 (){

    if (lengthResultNumber <= 6){
        
        EditFontSizeShortCut('120px' , '80px')
        
    }else if (lengthResultNumber == 7){

        EditFontSizeShortCut('120px' , '70px')
        
    }else if (lengthResultNumber == 8){

        EditFontSizeShortCut('120px' , '64px')
        
    }else if (lengthResultNumber == 9){

        EditFontSizeShortCut('120px' , '56px')
        
    }else if (lengthResultNumber == 10){

        EditFontSizeShortCut('120px' , '50px')
        
    }else if (lengthResultNumber == 11){

        EditFontSizeShortCut('120px' , '46px')
        
    }else if (lengthResultNumber == 12){

        EditFontSizeShortCut('120px' , '41px')
        
    }else if (lengthResultNumber == 13){

        EditFontSizeShortCut('120px' , '38px')
        
    }else if (lengthResultNumber >= 14){

        EditFontSizeShortCut('120px' , '36px')
    
    }
}
function innerWidth421 (){

    if (lengthResultNumber <= 6){
        
        EditFontSizeShortCut('90px' , '60px')
        
    }else if (lengthResultNumber == 7){

        EditFontSizeShortCut('90px' , '60px')
        
    }else if (lengthResultNumber == 8){

        EditFontSizeShortCut('90px' , '60px')
        
    }else if (lengthResultNumber == 9){

        EditFontSizeShortCut('90px' , '54px')
        
    }else if (lengthResultNumber == 10){

        EditFontSizeShortCut('90px' , '48px')
        
    }else if (lengthResultNumber == 11){

        EditFontSizeShortCut('90px' , '45px')
        
    }else if (lengthResultNumber == 12){

        EditFontSizeShortCut('90px' , '41px')
        
    }else if (lengthResultNumber == 13){

        EditFontSizeShortCut('90px' , '37px')
        
    }else if (lengthResultNumber >= 14){

        EditFontSizeShortCut('90px' , '34px')
    
    }
}
function innerWidth395(){

    if (lengthResultNumber <= 6){
        
        EditFontSizeShortCut('82.500px' , '55px')
        
    }else if (lengthResultNumber == 7){

        EditFontSizeShortCut('82.500px' , '54px')
        
    }else if (lengthResultNumber == 8){

        EditFontSizeShortCut('82.500px' , '50px')
        
    }else if (lengthResultNumber == 9){

        EditFontSizeShortCut('82.500px' , '49px')
        
    }else if (lengthResultNumber == 10){

        EditFontSizeShortCut('82.500px' , '42px')
        
    }else if (lengthResultNumber == 11){

        EditFontSizeShortCut('82.500px' , '40px')
        
    }else if (lengthResultNumber == 12){

        EditFontSizeShortCut('82.500px' , '35px')
        
    }else if (lengthResultNumber == 13){

        EditFontSizeShortCut('82.500px' , '33px')
        
    }else if (lengthResultNumber >= 14){

        EditFontSizeShortCut('82.500px' , '30px')
    
    }
}
function innerWidth360(){

    if (lengthResultNumber <= 6){
        
        EditFontSizeShortCut('75px' , '50px')
        
    }else if (lengthResultNumber == 7){

        EditFontSizeShortCut('75px' , '50px')
        
    }else if (lengthResultNumber == 8){

        EditFontSizeShortCut('75px' , '45px')
        
    }else if (lengthResultNumber == 9){

        EditFontSizeShortCut('75px' , '42px')
        
    }else if (lengthResultNumber == 10){

        EditFontSizeShortCut('75px' , '37px')
        
    }else if (lengthResultNumber == 11){

        EditFontSizeShortCut('75px' , '32px')
        
    }else if (lengthResultNumber == 12){

        EditFontSizeShortCut('75px' , '30px')
        
    }else if (lengthResultNumber == 13){

        EditFontSizeShortCut('75px' , '29px')
        
    }else if (lengthResultNumber >= 14){

        EditFontSizeShortCut('75px' , '25px')
    
    }
}
function innerWidth320(){

    if (lengthResultNumber <= 6){
        
        EditFontSizeShortCut('60px' , '40px')
        
    }else if (lengthResultNumber == 7){

        EditFontSizeShortCut('60px' , '40px')
        
    }else if (lengthResultNumber == 8){

        EditFontSizeShortCut('60px' , '40px')
        
    }else if (lengthResultNumber == 9){

        EditFontSizeShortCut('60px' , '37px')
        
    }else if (lengthResultNumber == 10){

        EditFontSizeShortCut('60px' , '34px')
        
    }else if (lengthResultNumber == 11){

        EditFontSizeShortCut('60px' , '32px')
        
    }else if (lengthResultNumber == 12){

        EditFontSizeShortCut('60px' , '28px')
        
    }else if (lengthResultNumber == 13){

        EditFontSizeShortCut('60px' , '25px')
        
    }else if (lengthResultNumber >= 14){

        EditFontSizeShortCut('60px' , '24px')
    
    }
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
var ValedElementHistoriPhone = $.querySelectorAll('.HistoriPhone ')[0]
function SwichTheme (){
    CounterPageClickHistori = 0
    
    ItemHistoriPhone = $.querySelectorAll('.ItemHistoriPhone')
    ItemHistoriPhoneDark = $.querySelectorAll('.ItemHistoriPhoneDark')
    ItemHistori = $.querySelectorAll('.HistoriItem')
    itemHistoriDark = $.querySelectorAll('.HistoriItemDark')
    
    iconClearAllHistoriPhone.classList.toggle('iconClearAllHistoriPhoneDark')
    iconClearAllHistoriDesktop.classList.toggle('iconClearAllHistoriDesktopDark')
    Calculator.classList.toggle('CalculatorDark')
    CalculatorHome.classList.toggle('CalculatorDark')
    ResultNumber.classList.toggle('ResultDark')
    NumerOperation.classList.toggle('NumberOperationDark')
    ValedElementHistoriPhone.classList.toggle('HistoriPhoneDark')
    ButtonCalculator.forEach(function (theme){
        theme.classList.toggle('ButtonCalculatorDark')
    })
    ButtonOperationAll.forEach(function (Btn){
        Btn.classList.toggle('ButtonOperationDark')
    })
    Version.classList.toggle('VersionDark')
    BtnHIstori.classList.toggle('IconDark')
    ClearHistoriPhone.classList.toggle('IconDark')
    ClearHistoriDesktop.classList.toggle('IconDark')
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
    } , 300)
    createDivHome.append(CreateDivNum)
    
    CreateDivImage = $.createElement('div')
    CreateDivImage.className = 'IconHistori'
    CreateDivImage.style.opacity = '0'
    setTimeout(function (){
        CreateDivImage.style.opacity = '1'
    } , 300)
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
        }
    }
}

var iconClearAllHistoriPhoneAnimeLight , iconClearAllHistoriPhoneAnimeDark , iconClearAllHistoriDesktopLight , iconClearAllHistoriDesktopDark

function CloseBox (){
    BoxDropOrClose = false
    CloseBoxHistori()
    setTimeout(function (){
        CalculatorHome.classList.remove('DropCalCulator')
    } , 500)
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
        iconClearAllHistoriDesktopDark = $.querySelector('.iconClearAllHistoriDesktopDark')

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

        iconClearAllHistoriDesktopDark.style.opacity = '0'
        setTimeout(function (){
            iconClearAllHistoriDesktopDark.style.opacity = '1'
        } , 1500)

        HistoriItem.forEach((item) => {
            item.style.opacity = '0'
            setTimeout( function () {
                item.style.opacity = '1'
                
            } , 1000)
        })



    }else {
        HistoriItem = $.querySelectorAll('.HistoriItem')
        iconClearAllHistoriDesktopLight = $.querySelector('.iconClearAllHistoriDesktop ')


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

        iconClearAllHistoriDesktopLight.style.opacity = '0'
        setTimeout(function (){
            iconClearAllHistoriDesktopLight.style.opacity = '1'
        } , 1500)

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
        iconClearAllHistoriDesktopDark = $.querySelector('.iconClearAllHistoriDesktopDark')

        imagHistori.forEach((image) => {
            image.style.opacity = '0'
        })

        NumHistori.forEach((Num) => {
            Num.style.opacity = '0'
        })

        operationopacity.forEach((item) => {
            item.style.opacity = '0'
        })
        iconClearAllHistoriDesktopDark.style.opacity = '0'
        

        HistoriItem.forEach((item) => {
            setTimeout( function () {
                item.style.opacity = '0'
                
            } , 500)
        })
        

    }else {
        HistoriItem = $.querySelectorAll('.HistoriItem')
        iconClearAllHistoriDesktopLight = $.querySelector('.iconClearAllHistoriDesktop')


        imagHistori.forEach((image) => {
            image.style.opacity = '0'
        })

        NumHistori.forEach((Num) => {
            Num.style.opacity = '0'
        })
        operationopacity.forEach((item) => {
            item.style.opacity = '0'
        })

        iconClearAllHistoriDesktopLight.style.opacity = '0'

        

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
                    dark.remove()
                })
    
                var itemRemoveHistori = $.querySelectorAll('.HistoriItemDark')
                itemRemoveHistori.forEach(function (item){
                    item.remove()
                })
            }else {
                var itemhistoriModalmm = $.querySelectorAll('.ItemHistoriPhone')
                itemhistoriModalmm.forEach(function (dark){
                    dark.remove()
                })
    
                var itemRemoveHistori = $.querySelectorAll('.HistoriItem')
                itemRemoveHistori.forEach(function (item){
                    item.remove()
                })
        
            }
        } , 2000)
        localStorage.removeItem('historiCalculator')
        HistoriOperation.splice(0)
        counterinIndexArry = 0
        CounterHistoriPhone = 0
        CounterPageClickHistori = 0
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



function DropBoxHistoriPhone () {
    BoxDropOrClose = true
    HistoriSectionMobile.classList.add('HistoriPhoneDrop')
    Version.style.filter = "blur(2px)"
    mapbtnCalculator.style.filter = "blur(2px)"
    NumberResultOperationDiv.style.filter = "blur(2px)"
    setTimeout(function (){
        showitemHistoriModal()
    },300)
}
function CloseBoxHistoriPhone () {
    BoxDropOrClose = false
    CounterPageClickHistori = 0
    closeBoxHistoriModal()
    setTimeout(function (){
        HistoriSectionMobile.classList.remove('HistoriPhoneDrop')
        Version.style.filter = "blur(0)"
        NumberResultOperationDiv.style.filter = "blur(0)"
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
        iconClearAllHistoriPhoneAnimeDark = $.querySelector('.iconClearAllHistoriPhoneDark')

        NumHistoriModalClsoe.forEach(function (Num){
            Num.style.opacity = '0'
        })

        StartOperationHistoriModal.forEach(function (item){
            item.style.opacity = '0'
        })

        ImageHistoriModalClosr.forEach(function (Image){
            Image.style.opacity = '0'
        })

        iconClearAllHistoriPhoneAnimeDark.style.opacity = '0'
        
        itemHistoriModalCloseDark.forEach(function (itemclose){
            setTimeout(function(){
                itemclose.style.opacity = '0'
            } , 500 )
        })

    }else {
        itemHistoriModalClose = $.querySelectorAll('.ItemHistoriPhone ')  
        iconClearAllHistoriPhoneAnimeLight = $.querySelector('.iconClearAllHistoriPhone')


        NumHistoriModalClsoe.forEach(function (Num){
            Num.style.opacity = '0'
        })

        ImageHistoriModalClosr.forEach(function (Image){
            Image.style.opacity = '0'
        })

        StartOperationHistoriModal.forEach(function (item){
            item.style.opacity = '0'
        })

        iconClearAllHistoriPhoneAnimeLight.style.opacity = '0'


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
        iconClearAllHistoriPhoneAnimeDark = $.querySelector('.iconClearAllHistoriPhoneDark')
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

            iconClearAllHistoriPhoneAnimeDark.style.opacity = '0'
            setTimeout(function (){
                iconClearAllHistoriPhoneAnimeDark.style.opacity = '1'
            } , 1400)

            ImageHistoriModalClosr.forEach(function (item){
                item.style.opacity = '0'
                setTimeout(function (){
                    item.style.opacity = '1'
                } , 1400 )
            })
        
        })
    }else{
        itemHistoriModalCloseDark = $.querySelectorAll('.ItemHistoriPhone ')
        iconClearAllHistoriPhoneAnimeLight = $.querySelector('.iconClearAllHistoriPhone')
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
            iconClearAllHistoriPhoneAnimeLight.style.opacity = '0'
            setTimeout(function (){
                iconClearAllHistoriPhoneAnimeLight.style.opacity = '1'
            } , 1400)
        
        })
    }
}

var CounterPageClickHistori = 0
document.body.addEventListener('click' , function (event){

    var  HeightHistoriPhoneMobile , LastMapHeightHistori, FirsiMapHeightHistori , FirsiMapHistoriMobile , lastMapHistoriMobile , widthcalculatoriHistoriPage
    
    
    
    // page X Operation
    widthcalculatoriHistoriPage = (window.innerWidth -  Number(window.getComputedStyle(Calculator).width.slice(0 , -2))) / 2
    FirsiMapHistoriMobile = (Number(window.getComputedStyle(Calculator).width.slice(0 , -2)) - Number(window.getComputedStyle(HistoriPhone).width.slice(0 , -2)) ) + widthcalculatoriHistoriPage
    lastMapHistoriMobile = widthcalculatoriHistoriPage + Number(window.getComputedStyle(Calculator).width.slice(0 , -2))
    
    // page Y Operation 
    HeightHistoriPhoneMobile = (window.innerHeight - Number(window.getComputedStyle(Calculator).height.slice(0 , -2))) / 2 // 117
    FirsiMapHeightHistori = (Number(window.getComputedStyle(Calculator).height.slice(0 , -2)) - Number(window.getComputedStyle(HistoriPhone).height.slice(0 , -2))) / 2 + HeightHistoriPhoneMobile // 164
    LastMapHeightHistori =  Number(window.getComputedStyle(HistoriPhone).height.slice(0 , -2)) + FirsiMapHeightHistori


    if (window.innerWidth < 840 && BoxDropOrClose == true){
        if (event.pageY < FirsiMapHeightHistori || event.pageY > LastMapHeightHistori || event.pageX < FirsiMapHistoriMobile || event.pageX > lastMapHistoriMobile ){
            if (CounterPageClickHistori != 0){
                DropCalculator()
            }else {
                CounterPageClickHistori++
            }
        }

    }
})