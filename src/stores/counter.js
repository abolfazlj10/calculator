import { defineStore } from 'pinia'
import { onBeforeMount } from 'vue'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    ResultNumberShow : 0 ,
    valueKeyUserResult : 0,
    NumberOperation : 0,
    valueKeyUserBefore : 0,
    valueKeyUserAfter : 0,
    NumberOfOperation : 0,
    typeOperation : '',
    MaxLength : null,
    lengthResultNumber : null, 
    indexOperation : null ,
    indexPlus : null , 
    indexSubMission : null ,
    indexMultiplication : null ,
    indexDivision : null ,
    indexPercent : null,
    ObjResult : null ,
    HistoriOperation : [],
    mode : 'Light',
    styleobject : {}, // Size Result
    BoxDropOrClose : false ,
    classDropCalculator : false,
    HistoriSectionMobileStyleDrop : false,
  }),

  actions: {

    displayNumber (numberDis){
      if (this.typeOperation == '+' || this.typeOperation == '-' || this.typeOperation == '*' ||this.typeOperation == '/' ||this.typeOperation == '%' ){
        if (this.valueKeyUserAfter == 0){
          this.valueKeyUserAfter = numberDis
          this.NumberOperation += numberDis
        }else {
          this.valueKeyUserAfter += numberDis
          this.NumberOperation += numberDis
        }
        switch (this.typeOperation){
          case '+':
            this.SumValueOpera()
            break;
          case '-':
            this.SubMission()
            break;
          case '*':
            this.Multiplication()
            break;
          case '/':
            this.DivisionOperation()
            break;
          case '%':
            this.PercentOperation()
            break;
        }
      }else{
        if (this.valueKeyUserBefore == 0){
          this.valueKeyUserBefore = numberDis
          this.NumberOperation = numberDis
        }else {
          this.valueKeyUserBefore += numberDis
          this.NumberOperation += numberDis
        }
      }
    },

    SumValueOpera(){
      this.valueKeyUserResult = Number(this.valueKeyUserBefore) + Number(this.valueKeyUserAfter)
    },

    SubMission () {
      this.valueKeyUserResult = this.valueKeyUserBefore - this.valueKeyUserAfter
    },

    Multiplication () {
      this.valueKeyUserResult = this.valueKeyUserBefore * this.valueKeyUserAfter
    },

    DivisionOperation () {
      this.valueKeyUserResult = this.valueKeyUserBefore / this.valueKeyUserAfter
    },

    PercentOperation () {
      this.valueKeyUserResult = (this.valueKeyUserBefore / 100) * this.valueKeyUserAfter
    },

    OperationResult (opera){
      this.MaxLength = this.NumberOperation.length -1
      if (this.NumberOperation[this.MaxLength] == '+' || this.NumberOperation[this.MaxLength] == '-' || this.NumberOperation[this.MaxLength] == '*' || this.NumberOperation[this.MaxLength] == '/' || this.NumberOperation[this.MaxLength] == '%'){
        this.NumberOperation = this.NumberOperation.toString().slice(0 , -1)
        this.NumberOperation += opera
        this.typeOperation = opera
      }else if (this.NumberOperation == 0){
        return false
      }else {
        if (this.NumberOfOperation > 0){
          this.valueKeyUserAfter = 0
          this.valueKeyUserBefore = Number(this.valueKeyUserResult)
        }
        this.NumberOfOperation += 1
        this.typeOperation = opera
        this.NumberOperation += opera
      }
    },


    BackSpaceOperation (){
      this.MaxLength = this.NumberOperation.length -1
      if (this.NumberOperation[this.MaxLength] == '+' ||this.NumberOperation[this.MaxLength] == '-' ||this.NumberOperation[this.MaxLength] == '*' ||this.NumberOperation[this.MaxLength] == '/' ||this.NumberOperation[this.MaxLength] == '%'){
        this.NumberOperation = this.NumberOperation.toString().slice(0, -1)
        if (this.NumberOfOperation == 1 ){
          this.typeOperation = undefined
          this.NumberOfOperation = 0
        }else {
          this.NumberOfOperation = this.NumberOfOperation - 1
          this.BackSpaceOperationNotOne()
          this.MoveBeforeToAfter()
        }
      }else {
        if (this.valueKeyUserAfter == 0){
          this.NumberOperation = this.NumberOperation.toString().slice(0 , -1)
        }else {
          this.valueKeyUserAfterNotZero()
        }
        this.OperationWhithBacspace()
      }
    },

    BackSpaceOperationNotOne (){
      this.indexPlus = this.NumberOperation.lastIndexOf('+')
      this.indexSubMission = this.NumberOperation.lastIndexOf('-')
      this.indexMultiplication = this.NumberOperation.lastIndexOf('*')
      this.indexDivision = this.NumberOperation.lastIndexOf('/')
      this.indexPercent = this.NumberOperation.lastIndexOf('%')
      if (this.indexPlus > this.indexSubMission && this.indexPlus > this.indexMultiplication && this.indexPlus > this.indexDivision && this.indexPlus > this.indexPercent){
        this.indexOperation = this.indexPlus
        this.typeOperation = '+'
        return false
    }else if (this.indexSubMission > this.indexPlus && this.indexSubMission > this.indexMultiplication && this.indexSubMission > this.indexDivision && this.indexSubMission > this.indexPercent){
        this.indexOperation = this.indexSubMission
        this.typeOperation = '-'
        return false
    }else if (this.indexMultiplication > this.indexPlus && this.indexMultiplication > this.indexSubMission && this.indexMultiplication > this.indexDivision && this.indexMultiplication > this.indexPercent){
        this.indexOperation = this.indexMultiplication
        this.typeOperation = '*'
        return false
    }else if (this.indexDivision > this.indexPlus && this.indexDivision > this.indexSubMission && this.indexDivision > this.indexMultiplication && this.indexDivision > this.indexPercent){
        this.indexOperation = this.indexDivision
        this.typeOperation = '/'
        return false
    }else if (this.indexPercent > this.indexPlus && this.indexPercent > this.indexSubMission && this.indexPercent > this.indexMultiplication && this.indexPercent > this.indexDivision){
        this.indexOperation = this.indexPercent
        this.typeOperation = '%'
        return false
    }
    },

    MoveBeforeToAfter(){
      this.indexOperation += 1
      this.MaxLength = this.NumberOperation.toString().slice(this.indexOperation)
      this.valueKeyUserAfter = Number(this.MaxLength)
      switch(this.typeOperation){
        case '+' : 
          this.returnBeforeOperationSubMission()
          break ;
        case '-' : 
          this.returnBeforeOperationSum()
          break ;
        case '*' : 
          this.returnBeforeOperationDivision()
          break ;
        case '/' : 
          this.returnBeforeOperationMultiplication()
          break ;
        case '%' : 
          this.returnBeforeOperationPercent()
          break ;
      }
    },

    returnBeforeOperationSubMission (){
      this.valueKeyUserBefore =  this.valueKeyUserBefore - this.valueKeyUserAfter
      this.SumValueOpera()
    },
    returnBeforeOperationSum (){
      this.valueKeyUserBefore = Number(this.valueKeyUserBefore) + Number(this.valueKeyUserAfter)
      this.SubMission()
    },
    returnBeforeOperationDivision (){
      this.valueKeyUserBefore = this.valueKeyUserBefore / this.valueKeyUserAfter
      this.Multiplication()
    },
    returnBeforeOperationMultiplication (){
      this.valueKeyUserBefore = this.valueKeyUserBefore * this.valueKeyUserAfter
      this.DivisionOperation()
    },
    returnBeforeOperationPercent (){
      this.valueKeyUserBefore = this.valueKeyUserAfter * 100
      this.PercentOperation()
    },

    valueKeyUserAfterNotZero(){
      this.valueKeyUserAfter = this.valueKeyUserAfter.toString().slice(0 , -1)
      this.NumberOperation = this.NumberOperation.toString().slice(0 , -1)
      if (this.valueKeyUserAfter == ''){
        this.valueKeyUserAfter = 0
      }
    },

    OperationWhithBacspace(){
      this.indexPlus = this.NumberOperation.lastIndexOf('+')
      this.indexSubMission = this.NumberOperation.lastIndexOf('-')
      this.indexMultiplication = this.NumberOperation.lastIndexOf('*')
      this.indexDivision = this.NumberOperation.lastIndexOf('/')
      this.indexPercent = this.NumberOperation.lastIndexOf('%')

      this.MaxLength = this.NumberOperation.length - 1

      if (this.indexPlus > this.indexSubMission && this.indexPlus > this.indexMultiplication && this.indexPlus > this.indexDivision && this.indexPlus > this.indexPercent){

        this.SumValueOpera()
        return false
        
    }else if (this.indexSubMission > this.indexPlus && this.indexSubMission > this.indexMultiplication && this.indexSubMission > this.indexDivision && this.indexSubMission > this.indexPercent){

        this.SubMission() 
        return false

    }else if (this.indexMultiplication > this.indexPlus && this.indexMultiplication > this.indexSubMission && this.indexMultiplication > this.indexDivision && this.indexMultiplication > this.indexPercent){

        this.Multiplication()
        return false

    }else if (this.indexDivision > this.indexPlus && this.indexDivision > this.indexSubMission && this.indexDivision > this.indexMultiplication && this.indexDivision > this.indexPercent){

        this.DivisionOperation()
        return false

    }else if (this.indexPercent > this.indexPlus && this.indexPercent > this.indexSubMission && this.indexPercent > this.indexMultiplication && this.indexPercent > this.indexDivision){

        this.PercentOperation()
        return false

    }else {
        this.valueKeyUserBefore = this.valueKeyUserBefore.toString().slice(0 , -1)
        if (this.valueKeyUserBefore == ''){
            this.valueKeyUserBefore = 0
            this.NumberOperation = 0
        }
    }
  },


  AllClear (){
    if (this.NumberOperation == "0"){
      
    }else {
        this.NumberOperation = 0
        this.ResultNumberShow = 0 
        this.valueKeyUserAfter = 0 
        this.valueKeyUserBefore = 0 
        this.valueKeyUserResult = 0 
        this.typeOperation = undefined
        this.NumberOfOperation = 0
    }

    if (window.innerWidth < 531){
        this.FontsizeResultNumber1()
    }else {
        this.FontsizeResultNumber2()
    } 
  },

  ResultOpera(){
    this.MaxLength = this.NumberOperation.length - 1
    if (this.NumberOperation[this.MaxLength] == '+' || this.NumberOperation[this.MaxLength] == '-' || this.NumberOperation[this.MaxLength] == '*' || this.NumberOperation[this.MaxLength] == '/' || this.NumberOperation[this.MaxLength] == '%' ){
      return false
    }else if ( this.testoperation('-') == -1 && this.testoperation('+') == -1 && this.testoperation('*') == -1 && this.testoperation('/') == -1 && this.testoperation('%') == -1  ){
      return false 
    }else if (this.NumberOperation == '0'){
      this.NumberOperation = ''
      return false 
    }else {
      this.ResultNumberShow = this.valueKeyUserResult
      this.valueKeyUserResult = this.valueKeyUserAfter
      this.ObjResult = {
        Result : this.ResultNumberShow ,
        Operation :  this.NumberOperation , 
      }
      this.HistoriOperation.unshift(this.ObjResult)
      localStorage.setItem('historiCalculator' , JSON.stringify(this.HistoriOperation))
      this.NumberOperation = this.ResultNumberShow
      this.NumberOfOperation = 0
      this.valueKeyUserAfter = 0 
      this.valueKeyUserBefore = this.ResultNumberShow
      this.typeOperation = undefined

    }
    if (window.innerWidth < 531){
      console.log(2);
      this.FontsizeResultNumber1()
    }else {
      this.FontsizeResultNumber2()
      console.log(3);
    }
  } ,

  testoperation (opera){
    return this.NumberOperation.toString().indexOf(opera) 
  },

  KeyboardPress(event){
    switch (event.key){
      case '.':
          this.displayNumber(event.key)
          break;
      case '1':
          this.displayNumber(event.key)
          break;
      case '2':
          this.displayNumber(event.key)
          break;
      case '3':
          this.displayNumber(event.key)
      break;
      case '5':
          this.displayNumber(event.key)
          break;
      case '4':
          this.displayNumber(event.key)
      break;
      case '6':
          this.displayNumber(event.key)
      break;
      case '7':
          this.displayNumber(event.key)
      break;
      case '8':
          this.displayNumber(event.key)
          break;
      case '9':
          this.displayNumber(event.key)
      break;
      case '0':
          this.displayNumber(event.key)
          break;
      case '-':
          this.OperationResult(event.key)
          break;
      case '+':
          this.OperationResult(event.key)
          break;
      case '%':
          this.OperationResult(event.key)
          break;
      case '*':
          this.OperationResult(event.key)
          break;
      case '/':
          this.OperationResult(event.key)
          break;
      case '=':
          this.ResultOpera()
          break;
      case 'Enter':
          this.ResultOpera()
          break;
      case 'Backspace':
        this.BackSpaceOperation()
          break;
    }
  },

  FontsizeResultNumber2(){
    this.lengthResultNumber = this.ResultNumberShow.toString().length
    if (this.lengthResultNumber == 6){
        this.EditFontSizeShortCut('164.976px' , '110px')
        
    }else if (this.lengthResultNumber == 7){

      this.EditFontSizeShortCut('164.976px' , '90px')

    }else if (this.lengthResultNumber == 8){

        this.EditFontSizeShortCut('164.976px' , '80px')

    }else if (this.lengthResultNumber == 9){

        this.EditFontSizeShortCut('164.976px' , '70px')
        
    }else if (this.lengthResultNumber == 10){

        this.EditFontSizeShortCut('164.976px' , '65px')
        
    }else if (this.lengthResultNumber == 11){

        this.EditFontSizeShortCut('164.976px' , '60px')
        
    }else if (this.lengthResultNumber == 12){

        this.EditFontSizeShortCut('164.976px' , '55px')
        
    }else if (this.lengthResultNumber == 13){

        this.EditFontSizeShortCut('164.976px' , '50px')
        
    }else if (this.lengthResultNumber >= 14){

        this.EditFontSizeShortCut('164.976px' , '45px')
    
    }
  },
  FontsizeResultNumber1 (){
    this.lengthResultNumber = this.valueKeyUserResult.toString().length
    if (window.innerWidth < 320){

      this.innerWidth320() 

  }else if (window.innerWidth <= 360){

      this.innerWidth360()

  }else if (window.innerWidth <= 395){

      this.innerWidth395()

  }else if (window.innerWidth <= 421){

      this.innerWidth421()

  }else if (window.innerWidth <= 440){

      this.innerWidth440()

  }else if (window.innerWidth <= 460){

      this.innerWidth460()

  }else if (window.innerWidth <= 488){

      this.innerWidth488()

  }else if (window.innerWidth <= 510){

      this.innerWidth510()

  }else if (window.innerWidth <= 530){

      this.innerWidth530()

  }
  },
  EditFontSizeShortCut (editheight , fontsresult){
    this.styleobject = {
      height : editheight,
      fontSize : fontsresult ,
    }
  },
  innerWidth530 (){

    if (this.lengthResultNumber <= 6){
        
        this.EditFontSizeShortCut('150px' , '100px')
        
    }else if (this.lengthResultNumber == 7){

        this.EditFontSizeShortCut('150px' , '90px')
        
    }else if (this.lengthResultNumber == 8){

        this.EditFontSizeShortCut('150px' , '80px')
        
    }else if (this.lengthResultNumber == 9){

        this.EditFontSizeShortCut('150px' , '70px')
        
    }else if (this.lengthResultNumber == 10){

        this.EditFontSizeShortCut('150px' , '65px')
        
    }else if (this.lengthResultNumber == 11){

        this.EditFontSizeShortCut('150px' , '60px')
        
    }else if (this.lengthResultNumber == 12){

        this.EditFontSizeShortCut('150px' , '55px')
        
    }else if (this.lengthResultNumber == 13){

        this.EditFontSizeShortCut('150px' , '50px')
        
    }else if (this.lengthResultNumber >= 14){

        this.EditFontSizeShortCut('150px' , '45px')
    
    }
  },
  innerWidth510 (){

    if (this.lengthResultNumber <= 6){
        
        this.EditFontSizeShortCut('150px' , '100px')
        
    }else if (this.lengthResultNumber == 7){

        this.EditFontSizeShortCut('150px' , '90px')
        
    }else if (this.lengthResultNumber == 8){

        this.EditFontSizeShortCut('150px' , '80px')
        
    }else if (this.lengthResultNumber == 9){

        this.EditFontSizeShortCut('150px' , '70px')
        
    }else if (this.lengthResultNumber == 10){

        this.EditFontSizeShortCut('150px' , '62px')
        
    }else if (this.lengthResultNumber == 11){

        this.EditFontSizeShortCut('150px' , '58px')
        
    }else if (this.lengthResultNumber == 12){

        this.EditFontSizeShortCut('150px' , '53px')
        
    }else if (this.lengthResultNumber == 13){

        this.EditFontSizeShortCut('150px' , '48px')
        
    }else if (this.lengthResultNumber >= 14){

        this.EditFontSizeShortCut('150px' , '45px')
    
    }
  },
  innerWidth488 (){

    if (this.lengthResultNumber <= 6){
        
        this.EditFontSizeShortCut('135px' , '90px')
        
    }else if (this.lengthResultNumber == 7){

        this.EditFontSizeShortCut('135px' , '80px')
        
    }else if (this.lengthResultNumber == 8){

        this.EditFontSizeShortCut('135px' , '70px')
        
    }else if (this.lengthResultNumber == 9){

        this.EditFontSizeShortCut('135px' , '60px')
        
    }else if (this.lengthResultNumber == 10){

        this.EditFontSizeShortCut('135px' , '58px')
        
    }else if (this.lengthResultNumber == 11){

        this.EditFontSizeShortCut('135px' , '52px')
        
    }else if (this.lengthResultNumber == 12){

        this.EditFontSizeShortCut('135px' , '48px')
        
    }else if (this.lengthResultNumber == 13){

        this.EditFontSizeShortCut('135px' , '44px')
        
    }else if (this.lengthResultNumber >= 14){

        this.EditFontSizeShortCut('135px' , '40px')
    
    }
  },
  innerWidth460 (){

    if (this.lengthResultNumber <= 6){
        
        this.EditFontSizeShortCut('135px' , '90px')
        
    }else if (this.lengthResultNumber == 7){

        this.EditFontSizeShortCut('135px' , '75px')
        
    }else if (this.lengthResultNumber == 8){

        this.EditFontSizeShortCut('135px' , '68px')
        
    }else if (this.lengthResultNumber == 9){

        this.EditFontSizeShortCut('135px' , '60px')
        
    }else if (this.lengthResultNumber == 10){

        this.EditFontSizeShortCut('135px' , '53px')
        
    }else if (this.lengthResultNumber == 11){

        this.EditFontSizeShortCut('135px' , '48px')
        
    }else if (this.lengthResultNumber == 12){

        this.EditFontSizeShortCut('135px' , '43px')
        
    }else if (this.lengthResultNumber == 13){

        this.EditFontSizeShortCut('135px' , '40px')
        
    }else if (this.lengthResultNumber >= 14){

        this.EditFontSizeShortCut('135px' , '38px')
    
    }
  },
  innerWidth440 (){

    if (this.lengthResultNumber <= 6){
        
        this.EditFontSizeShortCut('120px' , '80px')
        
    }else if (this.lengthResultNumber == 7){

        this.EditFontSizeShortCut('120px' , '70px')
        
    }else if (this.lengthResultNumber == 8){

        this.EditFontSizeShortCut('120px' , '64px')
        
    }else if (this.lengthResultNumber == 9){

        this.EditFontSizeShortCut('120px' , '56px')
        
    }else if (this.lengthResultNumber == 10){

        this.EditFontSizeShortCut('120px' , '50px')
        
    }else if (this.lengthResultNumber == 11){

        this.EditFontSizeShortCut('120px' , '46px')
        
    }else if (this.lengthResultNumber == 12){

        this.EditFontSizeShortCut('120px' , '41px')
        
    }else if (this.lengthResultNumber == 13){

        this.EditFontSizeShortCut('120px' , '38px')
        
    }else if (this.lengthResultNumber >= 14){

        this.EditFontSizeShortCut('120px' , '36px')
    
    }
  },
  innerWidth421 (){

    if (this.lengthResultNumber <= 6){
        
        this.EditFontSizeShortCut('90px' , '60px')
        
    }else if (this.lengthResultNumber == 7){

        this.EditFontSizeShortCut('90px' , '60px')
        
    }else if (this.lengthResultNumber == 8){

        this.EditFontSizeShortCut('90px' , '60px')
        
    }else if (this.lengthResultNumber == 9){

        this.EditFontSizeShortCut('90px' , '54px')
        
    }else if (this.lengthResultNumber == 10){

        this.EditFontSizeShortCut('90px' , '48px')
        
    }else if (this.lengthResultNumber == 11){

        this.EditFontSizeShortCut('90px' , '45px')
        
    }else if (this.lengthResultNumber == 12){

        this.EditFontSizeShortCut('90px' , '41px')
        
    }else if (this.lengthResultNumber == 13){

        this.EditFontSizeShortCut('90px' , '37px')
        
    }else if (this.lengthResultNumber >= 14){

        this.EditFontSizeShortCut('90px' , '34px')
    
    }
  },
  innerWidth395(){

    if (this.lengthResultNumber <= 6){
        
        this.EditFontSizeShortCut('82.500px' , '55px')
        
    }else if (this.lengthResultNumber == 7){

        this.EditFontSizeShortCut('82.500px' , '54px')
        
    }else if (this.lengthResultNumber == 8){

        this.EditFontSizeShortCut('82.500px' , '50px')
        
    }else if (this.lengthResultNumber == 9){

        this.EditFontSizeShortCut('82.500px' , '49px')
        
    }else if (this.lengthResultNumber == 10){

        this.EditFontSizeShortCut('82.500px' , '42px')
        
    }else if (this.lengthResultNumber == 11){

        this.EditFontSizeShortCut('82.500px' , '40px')
        
    }else if (this.lengthResultNumber == 12){

        this.EditFontSizeShortCut('82.500px' , '35px')
        
    }else if (this.lengthResultNumber == 13){

        this.EditFontSizeShortCut('82.500px' , '33px')
        
    }else if (this.lengthResultNumber >= 14){

        this.EditFontSizeShortCut('82.500px' , '30px')
    
    }
  },
  innerWidth360(){

    if (this.lengthResultNumber <= 6){
        
        this.EditFontSizeShortCut('75px' , '50px')
        
    }else if (this.lengthResultNumber == 7){

        this.EditFontSizeShortCut('75px' , '50px')
        
    }else if (this.lengthResultNumber == 8){

        this.EditFontSizeShortCut('75px' , '45px')
        
    }else if (this.lengthResultNumber == 9){

        this.EditFontSizeShortCut('75px' , '42px')
        
    }else if (this.lengthResultNumber == 10){

        this.EditFontSizeShortCut('75px' , '37px')
        
    }else if (this.lengthResultNumber == 11){

        this.EditFontSizeShortCut('75px' , '32px')
        
    }else if (this.lengthResultNumber == 12){

        this.EditFontSizeShortCut('75px' , '30px')
        
    }else if (this.lengthResultNumber == 13){

        this.EditFontSizeShortCut('75px' , '29px')
        
    }else if (this.lengthResultNumber >= 14){

        this.EditFontSizeShortCut('75px' , '25px')
    
    }
  },
  innerWidth320(){

    if (this.lengthResultNumber <= 6){
        
        this.EditFontSizeShortCut('60px' , '40px')
        
    }else if (this.lengthResultNumber == 7){

        this.EditFontSizeShortCut('60px' , '40px')
        
    }else if (this.lengthResultNumber == 8){

        this.EditFontSizeShortCut('60px' , '40px')
        
    }else if (this.lengthResultNumber == 9){

        this.EditFontSizeShortCut('60px' , '37px')
        
    }else if (this.lengthResultNumber == 10){

        this.EditFontSizeShortCut('60px' , '34px')
        
    }else if (this.lengthResultNumber == 11){

        this.EditFontSizeShortCut('60px' , '32px')
        
    }else if (this.lengthResultNumber == 12){

        this.EditFontSizeShortCut('60px' , '28px')
        
    }else if (this.lengthResultNumber == 13){

        this.EditFontSizeShortCut('60px' , '25px')
        
    }else if (this.lengthResultNumber >= 14){

        this.EditFontSizeShortCut('60px' , '24px')
    
    }
  },
  DarkOrLight (){
    this.SwichTheme()
    if (this.mode == 'Light'){
      localStorage.setItem('mode' , 'Light')
    }else {
      localStorage.setItem('mode' , 'Dark')
    }

  },
  SwichTheme (){
    if (this.mode == 'Light'){
      this.mode = 'Dark'
    }else {
      this.mode = 'Light'
    }
  },

  DropCalculator (){
    if (window.innerWidth < 840){
        if (!this.HistoriOperation.length == '0'){
            if (this.BoxDropOrClose){
                this.CloseBoxHistoriPhone()
            }else {
                this.DropBoxHistoriPhone()
            }

        }
    }else {
        if (!this.HistoriOperation.length == '0'){
            if (this.BoxDropOrClose){
                this.CloseBox()
            }else {
                this.DropBox()
            }
        }
    }
  },

  CloseBox (){
    this.CloseBoxHistori()
    setTimeout(() => {
      this.classDropCalculator = false
    } , 300)
    this.BoxDropOrClose = false
  },

  DropBox (){
    this.classDropCalculator = true
    this.BoxDropOrClose = true
    this.DropBoxHistori()
  },

  RemoveElementHistoriDeskTop (event){
    var RemoveElementParent , RemoveElement, indexRemove 
    RemoveElementParent = event.target.parentElement.parentElement.children[0].children[0].getAttribute('data-operation')
    RemoveElement = event.target.getAttribute('data-Remove')
    if (RemoveElement == RemoveElementParent){
      var testSome = this.HistoriOperation.some( (item) => {
        return item.Operation == RemoveElementParent
      })
      indexRemove = this.HistoriOperation.findIndex( (ind) => {
          return ind.Operation == RemoveElementParent
      })
      if (testSome){
        this.HistoriOperation.splice(indexRemove , 1)
        localStorage.setItem('historiCalculator' , JSON.stringify(this.HistoriOperation))
        this.IsItemHistori()
      }
      
    }
    
  },

  CopyResult (event){
    var ElementTOCopy
    ElementTOCopy = event.target.parentElement.parentElement.children[0].children[0].getAttribute('data-Result')
    navigator.clipboard.writeText(ElementTOCopy);
  },

  IsItemHistori(){
    if (this.HistoriOperation.length == '0'){
      if (window.innerWidth < 840 ){
        this.CloseBoxHistoriPhone()
      }else {
        this.CloseBox()
      }
    }
  },
  DropBoxHistori (){
    var imagHistori = document.querySelectorAll('.IconHistori')
    var NumHistori = document.querySelectorAll('.NumberHistori')
    var iconParent = document.querySelectorAll('.iconClearAllHistoriDesktop')
    
    imagHistori.forEach((image) => {
      image.style.opacity = '0'
      setTimeout(() => {
          image.style.opacity = '1'
      } , 1100)
    })

    NumHistori.forEach((Num) => {
      Num.style.opacity = '0'
      setTimeout(() => {
          Num.style.opacity = '1'
      } , 1100)
    })

    iconParent[0].style.opacity = '0'
    setTimeout(() => {
      iconParent[0].style.opacity = '1'
    }, 1100);

  },

  CloseBoxHistori (){
    var imagHistori = document.querySelectorAll('.IconHistori')
    var NumHistori = document.querySelectorAll('.NumberHistori')
    var iconParent = document.querySelectorAll('.iconClearAllHistoriDesktop')
    
    imagHistori.forEach((image) => {
      image.style.opacity = '0'
    })

    NumHistori.forEach((Num) => {
      Num.style.opacity = '0'
    })
    
    iconParent[0].style.opacity = '0'
  },

  ClearlocalHistori (){
    setTimeout(() => {
      if (localStorage.getItem('mode') == 'Dark'){
        var ItemHIstoriDesktopDark , ItemHistoriPhoneDark
        ItemHIstoriDesktopDark = document.querySelectorAll('.HistoriItemDark')

        ItemHIstoriDesktopDark.forEach((dark) => {
          dark.remove()
        })

        ItemHistoriPhoneDark = document.querySelectorAll('.ItemHistoriPhoneDark')
        ItemHistoriPhoneDark.forEach((dark) => {
          dark.remove()
        })

      }else {
        var ItemHIstoriDesktopLight , ItemHistoriPhoneLight

        ItemHIstoriDesktopLight = document.querySelectorAll('.HistoriItem')

        ItemHIstoriDesktopLight.forEach((Light) => {
          Light.remove()
        })

        ItemHistoriPhoneLight = document.querySelectorAll('.ItemHistoriPhone')
        ItemHistoriPhoneLight.forEach((Light) => {
          Light.remove()
        })
      }
  }, 2000);
  localStorage.removeItem('historiCalculator')
  this.HistoriOperation.splice(0)
  this.CloseBox()
  this.CloseBoxHistoriPhone()


    
  },
  PageLoadInforamtion(){
    let ishistorilocal = JSON.parse(localStorage.getItem('historiCalculator'))
    if (ishistorilocal)    {
      this.HistoriOperation = ishistorilocal
    }else{
      this.HistoriOperation = []
    }

    if (localStorage.getItem('mode') == 'Dark'){
      this.mode = 'Dark'
    }else {
      this.mode = 'Light'
    }

  },

  sizeBrowser (){
    if (window.innerWidth < 840 ){
      
      this.CloseBox()
    }else {
        this.CloseBoxHistoriPhone()
    }
  } ,

  DropBoxHistoriPhone (){
    this.HistoriSectionMobileStyleDrop = true 
    this.BoxDropOrClose = true
    setTimeout(() => {
      this.FadeInItemHistoriPhone ()
    }, 300);
  },
  
  CloseBoxHistoriPhone (){
    this.BoxDropOrClose = false
    this.FadeOutHistoriPhone ()
    setTimeout(() => {
      this.HistoriSectionMobileStyleDrop = false      
    }, 400);
  },
  FadeOutHistoriPhone (){
    var imagHistori = document.querySelectorAll('.iconItem')
    var NumHistori = document.querySelectorAll('.NumberItem')
    var iconParent = document.querySelectorAll('.iconClearAllHistoriPhone')
    
    imagHistori.forEach((image) => {
      image.style.opacity = '0'
    })

    NumHistori.forEach((Num) => {
      Num.style.opacity = '0'
    })
    
    iconParent[0].style.opacity = '0'
    
  },
  
  FadeInItemHistoriPhone (){
    var imagHistori = document.querySelectorAll('.iconItem')
    var NumHistori = document.querySelectorAll('.NumberItem')
    var iconParent = document.querySelectorAll('.iconClearAllHistoriPhone')
    
    imagHistori.forEach((image) => {
      image.style.opacity = '0'
      setTimeout(() => {
          image.style.opacity = '1'
      } , 800)
    })

    NumHistori.forEach((Num) => {
      Num.style.opacity = '0'
      setTimeout(() => {
          Num.style.opacity = '1'
      } , 800)
    })

    iconParent[0].style.opacity = '0'
    setTimeout(() => {
      iconParent[0].style.opacity = '1'
    }, 800);

  },
  },

  getters: {},

})
