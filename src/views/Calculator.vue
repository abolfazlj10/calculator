<template>
    <div id="body">
        <div :class="[(store.mode == 'Light' ? 'CalculatorPosition' : 'CalculatorPositionDark') , (store.classDropCalculator == true ? 'DropCalCulator' : '')]">
            <div :class="(store.mode == 'Light') ? 'Calculator' : 'CalculatorDark'">
                <div class="iconNav">
                    <i @click="store.DarkOrLight()" id="Theme"  :class="(store.mode == 'Light') ? 'fa-regular fa-moon' : 'fa-regular fa-sun IconDark'" title="Swich Theme"></i>
                    <i @click="store.DropCalculator()"  :class="(store.mode == 'Light') ? '' : ' IconDark'" class="fa-solid fa-clock-rotate-left BtnHIstori" title="Histori"></i>
                </div>
                <div class="NumberResult-Operation" :class="(store.HistoriSectionMobileStyleDrop) ? 'blurClc' : ''">
                <p  :class="(store.mode == 'Light') ? 'Result' : 'ResultDark' " :style="store.styleobject" >
                    {{store.ResultNumberShow}}
                </p>
                <p :class="(store.mode == 'Light') ? 'NumberOperation' : 'NumberOperationDark'">
                    {{store.NumberOperation || 0}}
                </p>
            </div>
            <div class="btnCalculator" :class=" (store.HistoriSectionMobileStyleDrop) ? 'blurClc' : ''">
                <button @mousedown="store.AllClear()"  :class="(store.mode == 'Light') ? 'ButtonCalculator ButtonOperation' : 'ButtonCalculatorDark ButtonOperationDark'" class=" BtnAc"> AC </button>
                <button @mousedown="store.BackSpaceOperation()" :class="(store.mode == 'Light') ? 'ButtonCalculator ButtonOperation' : 'ButtonCalculatorDark ButtonOperationDark'" class=" BtnBakcspac"><i class="fa-solid fa-delete-left"></i></button>
                <button value="%" @mousedown="store.OperationResult('%')" :class="(store.mode == 'Light') ? 'ButtonCalculator ButtonOperation' : 'ButtonCalculatorDark ButtonOperationDark'" class=" BtnOperation"><i class="fa-solid fa-percent"></i></button>
                <button value="/" @mousedown="store.OperationResult('/')" :class="(store.mode == 'Light') ? 'ButtonCalculator ButtonOperation' : 'ButtonCalculatorDark ButtonOperationDark'" class=" BtnOperation"><i class="fa-solid fa-divide"></i></button>
                <button value="7" @mousedown="store.displayNumber('7')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">7</button>
                <button value="8" @mousedown="store.displayNumber('8')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">8</button>
                <button value="9" @mousedown="store.displayNumber('9')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">9</button>
                <button value="*" @mousedown="store.OperationResult('*')"  :class="(store.mode == 'Light') ? 'ButtonCalculator ButtonOperation' : 'ButtonCalculatorDark ButtonOperationDark'" class=" BtnOperation"><i class="fa-solid fa-xmark"></i></button>
                <button value="4" @mousedown="store.displayNumber('4')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">4</button>
                <button value="5" @mousedown="store.displayNumber('5')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">5</button>
                <button value="6" @mousedown="store.displayNumber('6')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">6</button>
                <button value="-" @mousedown="store.OperationResult('-')"  :class="(store.mode == 'Light') ? 'ButtonCalculator ButtonOperation' : 'ButtonCalculatorDark ButtonOperationDark'" class=" BtnOperation"><i class="fa-solid fa-minus"></i></button>
                <button value="1" @mousedown="store.displayNumber('1')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">1</button>
                <button value="2" @mousedown="store.displayNumber('2')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">2</button>
                <button value="3" @mousedown="store.displayNumber('3')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">3</button>
                <button value="+" @mousedown="store.OperationResult('+')"  :class="(store.mode == 'Light') ? 'ButtonCalculator ButtonOperation' : 'ButtonCalculatorDark ButtonOperationDark'" class=" BtnOperation"><i class="fa-solid fa-plus"></i></button>
                <button value="0" @mousedown="store.displayNumber('0')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">0</button>
                <button value="." @mousedown="store.displayNumber('.')" :class="(store.mode == 'Light') ? 'ButtonCalculator' : 'ButtonCalculatorDark'">.</button>
                <button @mousedown="store.ResultOpera()"  :class="(store.mode == 'Light') ? '' : ''" class="ButtonCalculator BtnResult"><i class="fa-solid fa-equals"></i></button>
            </div>
            <div :class="(store.mode == 'Light') ? 'Version' : 'VersionDark' ">
                <p :class=" (store.HistoriSectionMobileStyleDrop) ? 'blurClc' : ''">
                v2.0.0
                </p>
            </div>
            <div class="HistoriPhone" :class="(store.HistoriSectionMobileStyleDrop) ? 'HistoriPhoneDrop' : '' , (store.mode == 'Light') ? 'HistoriPhone' : 'HistoriPhoneDark'">

                <div @click="store.ClearlocalHistori" class="iconClearAllHistoriPhone" :class="(store.mode == 'Light') ? 'iconClearAllHistoriPhone' : 'iconClearAllHistoriPhoneDark' " >
                    <i class="fa-solid fa-trash ClearHistoriPhone "  title="Clear All Histori"></i>
                </div>

                <div class="HistoriSectionMobile" >
                    <div :class="(store.mode == 'Light') ? 'ItemHistoriPhone' : 'ItemHistoriPhoneDark'" v-for="HistoriMobile in store.HistoriOperation" v-if="store.HistoriOperation.length != 0">

                        <div class="NumberItem">
                            <div class="ResultOperation" :data-Result="HistoriMobile.Result" :data-Operation="HistoriMobile.Operation">
                                {{HistoriMobile.Operation}} = {{HistoriMobile.Result}}

                            </div>
                        </div>

                        <div class="iconItem">
                            <i @click="store.RemoveElementHistoriDeskTop" class="fa-regular fa-trash-can" title="Remove Item Histor" :data-Remove="HistoriMobile.Operation"></i>
                            <i @click="store.CopyResult" class="fa-regular fa-copy" title="Copy Result"></i>
                        </div>

                    </div>
                </div>
            </div>
            </div>

            <div class="DropHistori">
                
                <div @click="store.ClearlocalHistori" class="iconClearAllHistoriDesktop" :class="(store.mode == 'Light') ? 'iconClearAllHistoriDesktop' : 'iconClearAllHistoriDesktopDark '">
                    <i :class="(store.mode == 'Light') ? 'ClearHistoriDesktop' : 'IconDark'" class="fa-solid fa-trash  " title="Clear All Histori"></i>
                </div>

                <div class="HistoriSection">
                    <div :class="(store.mode == 'Light') ? 'HistoriItem' : 'HistoriItemDark'" v-for="Histori in store.HistoriOperation" v-if="store.HistoriOperation.length != 0">
                        <div class="NumberHistori">
                        <div :data-Result="Histori.Result" :data-Operation="Histori.Operation" class="Num">
                            {{Histori.Operation}} = {{Histori.Result}}
                        </div>
                        </div>
                        <div class="IconHistori">
                            <i @click="store.RemoveElementHistoriDeskTop" :data-Remove="Histori.Operation" class="fa-regular fa-trash-can" title="Remove Item Histor"></i>
                            <i @click="store.CopyResult" class="fa-regular fa-copy" title="Copy Result"></i>
                        </div>


                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue';
import {useCounterStore} from '../stores/counter'
const store = useCounterStore()

    document.body.addEventListener('keyup' , store.KeyboardPress)
    window.addEventListener('resize' , store.sizeBrowser)

    onBeforeMount(() => {
        store.PageLoadInforamtion()
    })

</script>


<style>
@import url(../components/style/style.css);
</style>

