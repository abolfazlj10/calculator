let $ = document
let Theme = $.getElementById('Theme')
let Calculator = $.querySelector('.Calculator') 
let ResultNumber = $.querySelector('.Result') 
let NumerOperation = $.querySelector('.NumberOperation') 
let ButtonCalculator = $.querySelectorAll('.ButtonCalculator') 
let ButtonOperation = $.querySelectorAll('.ButtonOperation') 
let ButtonResult = $.querySelector('.BtnResult') 


Theme.addEventListener('click' , swichTheme)

function swichTheme (){
    Theme.className = 'fa-regular fa-lightbulb'
    Calculator.style.backgroundColor = '#243441'
    ResultNumber.style.color = '#fffeff'
    NumerOperation.style.color = '#7c8a95'
    ButtonCalculator.forEach(function (color){
        color.style.backgroundColor = '#243441'
        color.style.color = '#818f9a'
        color.style.boxShadow = '0 -2px 3px #fff1'
        color.style.filter = 'drop-shadow(0 4px 4px rgba(0, 0, 0, 0.3))'
    })
    ButtonOperation.forEach(function (color){
        color.style.color = '#d58c61'
    })
    ButtonResult.style.backgroundColor = '#ed802e'
    ButtonResult.style.boxShadow = 'none'
    ButtonResult.style.filter = 'drop-shadow(0)'
    ButtonResult.style.color = '#ffefc9'
}
