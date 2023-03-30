import{d as z,_ as E,o as m,c as p,b as r,n as A,w as ne,e as H,t as V,f as L,g as _,r as q,h as U,i as O,j as P,k as se,v as oe,l as ae,m as re,p as X,q as b,s as S,u as F,x,F as D,y as w,z as W}from"./app.3c21c709.js";const le=z({name:"Switch",props:{modelValue:Boolean},emits:["update:modelValue"]}),ue=["aria-checked"];function de(i,e,t,s,o,l){return m(),p("div",{tabindex:"0",role:"checkbox","aria-checked":i.modelValue,class:"transition-all cursor-pointer flex justify-between items-center rounded-full focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ring-offset-1",onKeydown:e[0]||(e[0]=ne(H(a=>i.$emit("update:modelValue",!i.modelValue),["prevent"]),["space"])),onClick:e[1]||(e[1]=a=>i.$emit("update:modelValue",!i.modelValue))},[r("div",{class:A(["w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out",{"bg-primary":i.modelValue}])},[r("div",{class:A(["bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out",{"translate-x-4":i.modelValue}])},null,2)],2)],40,ue)}var J=E(le,[["render",de]]);const ce={name:"OptionSection",components:{Switch:J},props:{label:{type:String,required:!0},description:{type:String,default:void 0},modelValue:{type:Boolean,default:void 0}},emits:["update:modelValue"]},me={class:"mb-12 min-w-0"},ge={class:"flex items-center justify-between mb-3"},pe={class:"text-xl font-medium"},he={key:0,class:"mb-3"};function fe(i,e,t,s,o,l){const a=J;return m(),p("section",me,[r("div",ge,[r("span",pe,V(t.label),1),t.modelValue!==void 0?(m(),L(a,{key:0,"model-value":t.modelValue,"onUpdate:modelValue":e[0]||(e[0]=d=>i.$emit("update:modelValue",d))},null,8,["model-value"])):_("",!0)]),t.description?(m(),p("div",he,V(t.description),1)):_("",!0),q(i.$slots,"default")])}var Y=E(ce,[["render",fe]]);const be={name:"Dialog",props:{modelValue:Boolean},emits:["update:modelValue"]},ye={class:"max-w-md md:relative m-auto p-8 bg-white rounded w-full h-auto shadow"};function ve(i,e,t,s,o,l){return t.modelValue?(m(),p("div",{key:0,class:"w-screen h-screen fixed z-50 inset-0 flex bg-gray-600 bg-opacity-50",onClick:e[0]||(e[0]=H(a=>i.$emit("update:modelValue",!1),["self"]))},[r("div",ye,[q(i.$slots,"default")])])):_("",!0)}var K=E(be,[["render",ve]]);const Ve={name:"Checkbox",props:{modelValue:Boolean,disabled:{type:Boolean,default:!1},label:{type:String,required:!0}},emits:["update:modelValue"]},Fe=["checked","disabled"];function Se(i,e,t,s,o,l){return m(),p("label",{class:A(["flex items-center",{"text-gray-300 cursor-not-allowed":t.disabled,"cursor-pointer":!t.disabled}])},[r("input",{checked:t.modelValue,disabled:t.disabled,type:"checkbox",class:"w-5 h-5 mr-2 rounded rounded border-gray-300 shadow-sm disabled:text-gray-300 disabled:cursor-not-allowed not-disabled:text-primary not-disabled:cursor-pointer focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50",onInput:e[0]||(e[0]=a=>i.$emit("update:modelValue",a.target.checked))},null,40,Fe),r("span",null,V(t.label),1)],2)}var Z=E(Ve,[["render",Se]]),N=(i=>(i.symbol="symbol",i.narrowSymbol="narrowSymbol",i.code="code",i.name="name",i.hidden="hidden",i))(N||{}),R=(i=>(i.precision="precision",i.thousands="thousands",i.millions="millions",i.billions="billions",i))(R||{});const I=i=>i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Q=i=>i.replace(/^0+(0$|[^0])/,"$1"),G=(i,e)=>(i.match(new RegExp(I(e),"g"))||[]).length,De=(i,e)=>i.substring(0,i.indexOf(e)),ee=[",",".","\u066B"],j="(0|[1-9]\\d*)";class xe{constructor(e){var f,y,v,M,C,k;const{currency:t,currencyDisplay:s,locale:o,precision:l,accountingSign:a,useGrouping:d}=e;this.locale=o,this.options={currency:t,useGrouping:d,style:"currency",currencySign:a?"accounting":void 0,currencyDisplay:s!==N.hidden?s:void 0};const u=new Intl.NumberFormat(o,this.options),c=u.formatToParts(123456);this.currency=(f=c.find(({type:g})=>g==="currency"))==null?void 0:f.value,this.digits=[0,1,2,3,4,5,6,7,8,9].map(g=>g.toLocaleString(o)),this.decimalSymbol=(y=c.find(({type:g})=>g==="decimal"))==null?void 0:y.value,this.groupingSymbol=(v=c.find(({type:g})=>g==="group"))==null?void 0:v.value,this.minusSign=(M=u.formatToParts(-1).find(({type:g})=>g==="minusSign"))==null?void 0:M.value,this.decimalSymbol===void 0?this.minimumFractionDigits=this.maximumFractionDigits=0:typeof l=="number"?this.minimumFractionDigits=this.maximumFractionDigits=l:(this.minimumFractionDigits=(C=l==null?void 0:l.min)!=null?C:u.resolvedOptions().minimumFractionDigits,this.maximumFractionDigits=(k=l==null?void 0:l.max)!=null?k:u.resolvedOptions().maximumFractionDigits);const n=g=>De(g,this.digits[1]),h=g=>g.substring(g.lastIndexOf(this.decimalSymbol?this.digits[0]:this.digits[1])+1);this.prefix=n(u.format(1)),this.suffix=h(u.format(1)),this.negativePrefix=n(u.format(-1)),this.negativeSuffix=h(u.format(-1))}parse(e){if(e){const t=this.isNegative(e);e=this.normalizeDigits(e),e=this.stripCurrency(e,t),e=this.stripSignLiterals(e);const s=this.decimalSymbol?`(?:${I(this.decimalSymbol)}(\\d*))?`:"",o=this.stripGroupingSeparator(e).match(new RegExp(`^${j}${s}$`));if(o&&this.isValidIntegerFormat(this.decimalSymbol?e.split(this.decimalSymbol)[0]:e,Number(o[1])))return Number(`${t?"-":""}${this.onlyDigits(o[1])}.${this.onlyDigits(o[2]||"")}`)}return null}isValidIntegerFormat(e,t){const s={...this.options,minimumFractionDigits:0};return[this.stripCurrency(this.normalizeDigits(t.toLocaleString(this.locale,{...s,useGrouping:!0})),!1),this.stripCurrency(this.normalizeDigits(t.toLocaleString(this.locale,{...s,useGrouping:!1})),!1)].includes(e)}format(e,t={minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits}){return e!=null?e.toLocaleString(this.locale,{...this.options,...t}):""}toFraction(e){return`${this.digits[0]}${this.decimalSymbol}${this.onlyLocaleDigits(e.substr(1)).substr(0,this.maximumFractionDigits)}`}isFractionIncomplete(e){return!!this.normalizeDigits(this.stripGroupingSeparator(e)).match(new RegExp(`^${j}${I(this.decimalSymbol)}$`))}isNegative(e){return e.startsWith(this.negativePrefix)||this.minusSign===void 0&&(e.startsWith("(")||e.startsWith("-"))||this.minusSign!==void 0&&e.replace("-",this.minusSign).startsWith(this.minusSign)}insertCurrency(e,t){return`${t?this.negativePrefix:this.prefix}${e}${t?this.negativeSuffix:this.suffix}`}stripGroupingSeparator(e){return this.groupingSymbol!==void 0?e.replace(new RegExp(I(this.groupingSymbol),"g"),""):e}stripSignLiterals(e){return this.minusSign!==void 0?e.replace("-",this.minusSign).replace(this.minusSign,""):e.replace(/[-()]/g,"")}stripCurrency(e,t){return e.replace(t?this.negativePrefix:this.prefix,"").replace(t?this.negativeSuffix:this.suffix,"")}normalizeDecimalSeparator(e,t){return ee.forEach(s=>{e=e.substr(0,t)+e.substr(t).replace(s,this.decimalSymbol)}),e}normalizeDigits(e){return this.digits[0]!=="0"&&this.digits.forEach((t,s)=>{e=e.replace(new RegExp(t,"g"),String(s))}),e}onlyDigits(e){return this.normalizeDigits(e).replace(/\D+/g,"")}onlyLocaleDigits(e){return e.replace(new RegExp(`[^${this.digits.join("")}]*`,"g"),"")}}class ie{constructor(e){this.currencyFormat=e}}class we extends ie{conformToMask(e,t=""){const s=this.currencyFormat.isNegative(e),o=v=>v===""&&s&&!(this.currencyFormat.minusSign===void 0?t===this.currencyFormat.negativePrefix+this.currencyFormat.negativeSuffix:t===this.currencyFormat.negativePrefix),l=v=>{if(o(v))return"";if(this.currencyFormat.maximumFractionDigits>0){if(this.currencyFormat.isFractionIncomplete(v))return v;if(v.startsWith(this.currencyFormat.decimalSymbol))return this.currencyFormat.toFraction(v)}return null};let a=e;a=this.currencyFormat.stripCurrency(a,s),a=this.currencyFormat.stripSignLiterals(a);const d=l(a);if(d!=null)return this.currencyFormat.insertCurrency(d,s);const[u,...c]=a.split(this.currencyFormat.decimalSymbol),n=Q(this.currencyFormat.onlyDigits(u)),h=this.currencyFormat.onlyDigits(c.join("")).substr(0,this.currencyFormat.maximumFractionDigits),f=c.length>0&&h.length===0,y=n===""&&s&&(this.currencyFormat.minusSign===void 0?t===e.slice(0,-2)+this.currencyFormat.negativeSuffix:t===e.slice(0,-1));return f||y||o(n)?t:n.match(/\d+/)?{numberValue:Number(`${s?"-":""}${n}.${h}`),fractionDigits:h}:""}}class Ee extends ie{conformToMask(e,t=""){if(e===""||this.currencyFormat.parse(t)===0&&this.currencyFormat.stripCurrency(t,!0).slice(0,-1)===this.currencyFormat.stripCurrency(e,!0))return"";const s=this.currencyFormat.isNegative(e),o=this.currencyFormat.stripSignLiterals(e)===""?-0:Number(`${s?"-":""}${Q(this.currencyFormat.onlyDigits(e))}`)/Math.pow(10,this.currencyFormat.maximumFractionDigits);return{numberValue:o,fractionDigits:o.toFixed(this.currencyFormat.maximumFractionDigits).slice(-this.currencyFormat.maximumFractionDigits)}}}const $e={locale:void 0,currency:void 0,currencyDisplay:void 0,hideGroupingSeparatorOnFocus:!0,hideCurrencySymbolOnFocus:!0,hideNegligibleDecimalDigitsOnFocus:!0,precision:void 0,autoDecimalDigits:!1,valueRange:void 0,useGrouping:void 0,valueScaling:void 0};class Oe{constructor(e){this.el=e.el,this.onInput=e.onInput,this.onChange=e.onChange,this.addEventListener(),this.init(e.options)}setOptions(e){this.init(e),this.format(this.currencyFormat.format(this.validateValueRange(this.numberValue))),this.onChange(this.getValue())}getValue(){return{number:this.valueScaling&&this.numberValue!=null?this.toInteger(this.numberValue,this.valueScaling):this.numberValue,formatted:this.formattedValue}}setValue(e){const t=this.valueScaling!==void 0&&e!=null?this.toFloat(e,this.valueScaling):e;t!==this.numberValue&&(this.format(this.currencyFormat.format(this.validateValueRange(t))),this.onChange(this.getValue()))}init(e){this.options={...$e,...e},this.options.autoDecimalDigits&&(this.options.hideNegligibleDecimalDigitsOnFocus=!1),this.el.getAttribute("inputmode")||this.el.setAttribute("inputmode",this.options.autoDecimalDigits?"numeric":"decimal"),this.currencyFormat=new xe(this.options),this.numberMask=this.options.autoDecimalDigits?new Ee(this.currencyFormat):new we(this.currencyFormat);const t={[R.precision]:this.currencyFormat.maximumFractionDigits,[R.thousands]:3,[R.millions]:6,[R.billions]:9};this.valueScaling=this.options.valueScaling?t[this.options.valueScaling]:void 0,this.valueScalingFractionDigits=this.valueScaling!==void 0&&this.options.valueScaling!==R.precision?this.valueScaling+this.currencyFormat.maximumFractionDigits:this.currencyFormat.maximumFractionDigits,this.minValue=this.getMinValue(),this.maxValue=this.getMaxValue()}getMinValue(){var t,s;let e=this.toFloat(-Number.MAX_SAFE_INTEGER);return((t=this.options.valueRange)==null?void 0:t.min)!==void 0&&(e=Math.max((s=this.options.valueRange)==null?void 0:s.min,this.toFloat(-Number.MAX_SAFE_INTEGER))),e}getMaxValue(){var t,s;let e=this.toFloat(Number.MAX_SAFE_INTEGER);return((t=this.options.valueRange)==null?void 0:t.max)!==void 0&&(e=Math.min((s=this.options.valueRange)==null?void 0:s.max,this.toFloat(Number.MAX_SAFE_INTEGER))),e}toFloat(e,t){return e/Math.pow(10,t!=null?t:this.valueScalingFractionDigits)}toInteger(e,t){return Number(e.toFixed(t!=null?t:this.valueScalingFractionDigits).split(".").join(""))}validateValueRange(e){return e!=null?Math.min(Math.max(e,this.minValue),this.maxValue):e}format(e,t=!1){if(e!=null){this.decimalSymbolInsertedAt!==void 0&&(e=this.currencyFormat.normalizeDecimalSeparator(e,this.decimalSymbolInsertedAt),this.decimalSymbolInsertedAt=void 0);const s=this.numberMask.conformToMask(e,this.formattedValue);let o;if(typeof s=="object"){const{numberValue:l,fractionDigits:a}=s;let{maximumFractionDigits:d,minimumFractionDigits:u}=this.currencyFormat;this.focus?u=t?a.replace(/0+$/,"").length:Math.min(d,a.length):Number.isInteger(l)&&!this.options.autoDecimalDigits&&(this.options.precision===void 0||u===0)&&(u=d=0),o=this.toInteger(Math.abs(l))>Number.MAX_SAFE_INTEGER?this.formattedValue:this.currencyFormat.format(l,{useGrouping:this.options.useGrouping!==!1&&!(this.focus&&this.options.hideGroupingSeparatorOnFocus),minimumFractionDigits:u,maximumFractionDigits:d})}else o=s;this.maxValue<=0&&!this.currencyFormat.isNegative(o)&&this.currencyFormat.parse(o)!==0&&(o=o.replace(this.currencyFormat.prefix,this.currencyFormat.negativePrefix)),this.minValue>=0&&(o=o.replace(this.currencyFormat.negativePrefix,this.currencyFormat.prefix)),(this.options.currencyDisplay===N.hidden||this.focus&&this.options.hideCurrencySymbolOnFocus)&&(o=o.replace(this.currencyFormat.negativePrefix,this.currencyFormat.minusSign!==void 0?this.currencyFormat.minusSign:"(").replace(this.currencyFormat.negativeSuffix,this.currencyFormat.minusSign!==void 0?"":")").replace(this.currencyFormat.prefix,"").replace(this.currencyFormat.suffix,"")),this.el.value=o,this.numberValue=this.currencyFormat.parse(o)}else this.el.value="",this.numberValue=null;this.formattedValue=this.el.value,this.onInput(this.getValue())}addEventListener(){this.el.addEventListener("input",e=>{const{value:t,selectionStart:s}=this.el,o=e;if(s&&o.data&&ee.includes(o.data)&&(this.decimalSymbolInsertedAt=s-1),this.format(t),this.focus&&s!=null){const l=()=>{const{prefix:a,suffix:d,decimalSymbol:u,maximumFractionDigits:c,groupingSymbol:n}=this.currencyFormat;let h=t.length-s;const f=this.formattedValue.length;if(this.currencyFormat.minusSign===void 0&&(t.startsWith("(")||t.startsWith("-"))&&!t.endsWith(")"))return f-this.currencyFormat.negativeSuffix.length>1?this.formattedValue.substring(s).length:1;if(this.formattedValue.substr(s,1)===n&&G(this.formattedValue,n)===G(t,n)+1)return f-h-1;if(f<h)return s;if(u!==void 0&&t.indexOf(u)!==-1){const y=t.indexOf(u)+1;if(Math.abs(f-t.length)>1&&s<=y)return this.formattedValue.indexOf(u)+1;!this.options.autoDecimalDigits&&s>y&&this.currencyFormat.onlyDigits(t.substr(y)).length-1===c&&(h-=1)}return this.options.hideCurrencySymbolOnFocus||this.options.currencyDisplay===N.hidden?f-h:Math.max(f-Math.max(h,d.length),a.length)};this.setCaretPosition(l())}}),this.el.addEventListener("focus",()=>{this.focus=!0,this.numberValueOnFocus=this.numberValue,setTimeout(()=>{const{value:e,selectionStart:t,selectionEnd:s}=this.el;if(this.format(e,this.options.hideNegligibleDecimalDigitsOnFocus),t!=null&&s!=null&&Math.abs(t-s)>0)this.setCaretPosition(0,this.el.value.length);else if(t!=null){const o=this.getCaretPositionOnFocus(e,t);this.setCaretPosition(o)}})}),this.el.addEventListener("blur",()=>{this.focus=!1,this.format(this.currencyFormat.format(this.validateValueRange(this.numberValue))),this.numberValueOnFocus!==this.numberValue&&this.onChange(this.getValue())})}getCaretPositionOnFocus(e,t){if(this.numberValue==null)return t;const{prefix:s,negativePrefix:o,suffix:l,negativeSuffix:a,groupingSymbol:d,currency:u}=this.currencyFormat,c=this.numberValue<0,n=c?o:s,h=n.length;if(this.options.hideCurrencySymbolOnFocus||this.options.currencyDisplay===N.hidden){if(c){if(t<=1)return 1;if(e.endsWith(")")&&t>e.indexOf(")"))return this.formattedValue.length-1}}else{const y=c?a.length:l.length;if(t>=e.length-y)return this.formattedValue.length-y;if(t<h)return h}let f=t;return this.options.hideCurrencySymbolOnFocus&&this.options.currencyDisplay!==N.hidden&&t>=h&&u!==void 0&&n.includes(u)&&(f-=h,c&&(f+=1)),this.options.hideGroupingSeparatorOnFocus&&d!==void 0&&(f-=G(e.substring(0,t),d)),f}setCaretPosition(e,t=e){this.el.setSelectionRange(e,t)}}const Re=i=>i!=null&&i.matches("input")?i:i==null?void 0:i.querySelector("input");function Ne(i,e){var v,M,C,k;let t;const s=U(null),o=U(null),l=U(null),a=se(),d=(a==null?void 0:a.emit)||((M=(v=a==null?void 0:a.proxy)==null?void 0:v.$emit)==null?void 0:M.bind(a==null?void 0:a.proxy)),u=(a==null?void 0:a.props)||((C=a==null?void 0:a.proxy)==null?void 0:C.$props),c=oe.startsWith("3"),n=c&&((k=a==null?void 0:a.attrs.modelModifiers)==null?void 0:k.lazy),h=O(()=>u==null?void 0:u[c?"modelValue":"value"]),f=c?"update:modelValue":"input",y=n?"update:modelValue":"change";return P(s,g=>{var T;if(g){const B=Re((T=g==null?void 0:g.$el)!=null?T:g);B?(t=new Oe({el:B,options:i,onInput:$=>{!n&&e!==!1&&h.value!==$.number&&(d==null||d(f,$.number)),l.value=$.number,o.value=$.formatted},onChange:$=>{d==null||d(y,$.number)}}),t.setValue(h.value)):console.error('No input element found. Please make sure that the "inputRef" template ref is properly assigned.')}else t=null}),{inputRef:s,numberValue:l,formattedValue:o,setValue:g=>t==null?void 0:t.setValue(g),setOptions:g=>t==null?void 0:t.setOptions(g)}}const Me=z({name:"CurrencyInput",props:{modelValue:{type:Number,default:null},options:{type:Object,required:!0}},setup(i){const{inputRef:e,setOptions:t,setValue:s}=Ne(i.options);return P(()=>i.options,o=>{t(o)}),P(()=>i.modelValue,o=>{s(o)}),{inputRef:e}}}),Ce={ref:"inputRef",type:"text"};function ke(i,e,t,s,o,l){return m(),p("input",Ce,null,512)}var te=E(Me,[["render",ke]]);const Ie=z({name:"Demo",components:{Checkbox:Z,OptionSection:Y,Dialog:K,CurrencyInput:te},setup(){const i=(t,s)=>Array(s-t).fill(t).map((o,l)=>o+l),e=ae({exportDialogVisible:!1,lazy:!1,value:1234.5,localeEnabled:!1,locale:"de-DE",locales:["de-DE","de-CH","en-US","en-IN","nl-NL","sv-SE","fr-FR","es-ES","pt-PT","pt-BR","zh-ZH","ja-JP","ar-SA","fa-IR","bg-BG"],currency:"EUR",currencyDisplay:"symbol",currencies:["EUR","USD","JPY","GBP","BRL","INR","CNY","JPY","SAR","IRR","BGN"],currencyDisplays:[{value:"symbol",label:"Symbol"},{value:"narrowSymbol",label:"Narrow symbol"},{value:"code",label:"Code"},{value:"name",label:"Name"},{value:"hidden",label:"Hidden"}],valueScalingEnabled:!1,valueScaling:"precision",valueScalingOptions:[{value:"precision",label:"Precision"},{value:"thousands",label:"Thousands"},{value:"millions",label:"Millions"},{value:"billions",label:"Billions"}],hideCurrencySymbolOnFocus:!0,hideGroupingSeparatorOnFocus:!0,hideNegligibleDecimalDigitsOnFocusEnabled:!0,hideNegligibleDecimalDigitsOnFocus:!0,precisionEnabled:!1,precisionRangeEnabled:!1,precisionRangeMinValue:2,precisionRangeMaxValue:5,precision:2,precisionOptions:O(()=>i(1,16)),precisionRangeMinOptions:O(()=>i(1,e.precisionRangeMaxValue+1)),precisionRangeMaxOptions:O(()=>i(e.precisionRangeMinValue,16)),valueRangeEnabled:!1,minValue:void 0,maxValue:void 0,autoDecimalDigitsEnabled:!0,autoDecimalDigits:!1,accountingSign:!1,useGrouping:!0,options:O(()=>({locale:e.localeEnabled?e.locale:void 0,currency:e.currency,currencyDisplay:e.currencyDisplay,valueRange:e.valueRangeEnabled?{min:e.minValue===""?void 0:e.minValue,max:e.maxValue===""?void 0:e.maxValue}:void 0,precision:e.precisionEnabled?e.precisionRangeEnabled?{min:e.precisionRangeMinValue,max:e.precisionRangeMaxValue}:e.precision:void 0,hideCurrencySymbolOnFocus:e.hideCurrencySymbolOnFocus,hideGroupingSeparatorOnFocus:e.hideGroupingSeparatorOnFocus,hideNegligibleDecimalDigitsOnFocus:e.hideNegligibleDecimalDigitsOnFocus,autoDecimalDigits:e.autoDecimalDigits,valueScaling:e.valueScalingEnabled?e.valueScaling:void 0,useGrouping:e.useGrouping,accountingSign:e.accountingSign})),stringifiedOptions:O(()=>JSON.stringify(e.options,null,2))});return P(()=>e.autoDecimalDigits,t=>{e.hideNegligibleDecimalDigitsOnFocusEnabled=!t,e.hideNegligibleDecimalDigitsOnFocus=!t}),re(e)}}),Pe={class:"grid gap-y-4 md:grid-cols-2 md:gap-x-8 items-center mt-8 mb-4"},Ue={class:"ml-2"},Ge={class:"mb-8"},Ae={class:"flex items-center justify-between mb-2"},Le=r("span",{class:"text-2xl font-bold"},"Options",-1),_e={class:"white--text m-0",style:{margin:"0"}},ze=r("hr",{class:"mb-8"},null,-1),Te={class:"grid grid-cols-1 md:grid-cols-2 gap-x-8"},Be=["disabled"],We=["value"],je={class:"flex items-center space-x-4"},He=["disabled"],qe=r("span",{class:"text-center"},"to",-1),Xe=["disabled"],Je={key:0,class:"flex items-center space-x-4"},Ye=["disabled"],Ke=["value"],Ze=r("span",{class:"text-center"},"to",-1),Qe=["disabled"],ei=["value"],ii=["disabled"],ti=["value"],ni=["disabled"],si=["value"];function oi(i,e,t,s,o,l){const a=te,d=Z,u=K,c=Y;return m(),p(D,null,[r("div",Pe,[i.lazy?(m(),L(a,{key:0,modelValue:i.value,"onUpdate:modelValue":e[0]||(e[0]=n=>i.value=n),modelModifiers:{lazy:!0},options:i.options,class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50"},null,8,["modelValue","options"])):(m(),L(a,{key:1,modelValue:i.value,"onUpdate:modelValue":e[1]||(e[1]=n=>i.value=n),options:i.options,class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50"},null,8,["modelValue","options"])),r("div",null,[X(" Number value: "),r("code",Ue,V(i.value!=null?i.value:"null"),1)])]),r("div",Ge,[b(d,{modelValue:i.lazy,"onUpdate:modelValue":e[2]||(e[2]=n=>i.lazy=n),label:"Use lazy value binding"},null,8,["modelValue"])]),r("div",Ae,[Le,r("div",null,[r("button",{class:"transition-all bg-white hover:bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-4 border border-gray-300 rounded shadow focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",onClick:e[3]||(e[3]=n=>i.exportDialogVisible=!0)}," Export "),b(u,{modelValue:i.exportDialogVisible,"onUpdate:modelValue":e[4]||(e[4]=n=>i.exportDialogVisible=n)},{default:S(()=>[r("pre",_e,V(i.stringifiedOptions),1)]),_:1},8,["modelValue"])])]),ze,r("div",Te,[r("div",null,[b(c,{modelValue:i.localeEnabled,"onUpdate:modelValue":e[6]||(e[6]=n=>i.localeEnabled=n),label:"Locale"},{default:S(()=>[F(r("select",{"onUpdate:modelValue":e[5]||(e[5]=n=>i.locale=n),disabled:!i.localeEnabled,class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50 cursor-pointer w-full py-2 px-3"},[(m(!0),p(D,null,w(i.locales,n=>(m(),p("option",{key:n},V(n),1))),128))],8,Be),[[x,i.locale]])]),_:1},8,["modelValue"]),b(c,{label:"Currency"},{default:S(()=>[F(r("select",{"onUpdate:modelValue":e[7]||(e[7]=n=>i.currency=n),class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50 cursor-pointer w-full py-2 px-3"},[(m(!0),p(D,null,w(i.currencies,n=>(m(),p("option",{key:n},V(n),1))),128))],512),[[x,i.currency]])]),_:1}),b(c,{label:"Currency Display",description:"How to display the currency in the formatting."},{default:S(()=>[F(r("select",{"onUpdate:modelValue":e[8]||(e[8]=n=>i.currencyDisplay=n),class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50 cursor-pointer w-full py-2 px-3"},[(m(!0),p(D,null,w(i.currencyDisplays,n=>(m(),p("option",{key:n.value,value:n.value},V(n.label),9,We))),128))],512),[[x,i.currencyDisplay]])]),_:1}),b(c,{modelValue:i.accountingSign,"onUpdate:modelValue":e[9]||(e[9]=n=>i.accountingSign=n),label:"Accounting Sign",description:"Whether to use accounting sign formatting."},null,8,["modelValue"]),b(c,{modelValue:i.useGrouping,"onUpdate:modelValue":e[10]||(e[10]=n=>i.useGrouping=n),label:"Use Grouping",description:"Whether to use grouping separators such as thousands/lakh/crore separators."},null,8,["modelValue"]),b(c,{label:"Distraction Free Input",description:"Hide various parts of the formatting on focus for easier input."},{default:S(()=>[b(d,{modelValue:i.hideCurrencySymbolOnFocus,"onUpdate:modelValue":e[11]||(e[11]=n=>i.hideCurrencySymbolOnFocus=n),label:"Hide currency symbol",class:"mb-1"},null,8,["modelValue"]),b(d,{modelValue:i.hideGroupingSeparatorOnFocus,"onUpdate:modelValue":e[12]||(e[12]=n=>i.hideGroupingSeparatorOnFocus=n),label:"Hide grouping separator",class:"mb-1"},null,8,["modelValue"]),b(d,{modelValue:i.hideNegligibleDecimalDigitsOnFocus,"onUpdate:modelValue":e[13]||(e[13]=n=>i.hideNegligibleDecimalDigitsOnFocus=n),disabled:!i.hideNegligibleDecimalDigitsOnFocusEnabled,label:"Hide negligible decimal digits"},null,8,["modelValue","disabled"])]),_:1})]),r("div",null,[b(c,{modelValue:i.valueRangeEnabled,"onUpdate:modelValue":e[16]||(e[16]=n=>i.valueRangeEnabled=n),label:"Value Range",description:"The validation is triggered on blur and automatically sets the respective threshold if out of range."},{default:S(()=>[r("div",je,[F(r("input",{"onUpdate:modelValue":e[14]||(e[14]=n=>i.minValue=n),disabled:!i.valueRangeEnabled,type:"number",placeholder:"Min",class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50 min-w-0"},null,8,He),[[W,i.minValue,void 0,{lazy:!0}]]),qe,F(r("input",{"onUpdate:modelValue":e[15]||(e[15]=n=>i.maxValue=n),disabled:!i.valueRangeEnabled,type:"number",placeholder:"Max",class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50 min-w-0"},null,8,Xe),[[W,i.maxValue,void 0,{lazy:!0}]])])]),_:1},8,["modelValue"]),b(c,{modelValue:i.precisionEnabled,"onUpdate:modelValue":e[21]||(e[21]=n=>i.precisionEnabled=n),label:"Precision",description:"Override the number of displayed decimal digits. Can only be applied for currencies that support decimal digits."},{default:S(()=>[r("div",null,[b(d,{modelValue:i.precisionRangeEnabled,"onUpdate:modelValue":e[17]||(e[17]=n=>i.precisionRangeEnabled=n),label:"Use range",disabled:!i.precisionEnabled,class:"mb-2"},null,8,["modelValue","disabled"]),i.precisionRangeEnabled?(m(),p("div",Je,[F(r("select",{"onUpdate:modelValue":e[18]||(e[18]=n=>i.precisionRangeMinValue=n),disabled:!i.precisionEnabled,class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50 cursor-pointer w-full py-2 px-3"},[(m(!0),p(D,null,w(i.precisionRangeMinOptions,n=>(m(),p("option",{key:n,value:n},V(n),9,Ke))),128))],8,Ye),[[x,i.precisionRangeMinValue]]),Ze,F(r("select",{"onUpdate:modelValue":e[19]||(e[19]=n=>i.precisionRangeMaxValue=n),disabled:!i.precisionEnabled,class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50 cursor-pointer w-full py-2 px-3"},[(m(!0),p(D,null,w(i.precisionRangeMaxOptions,n=>(m(),p("option",{key:n,value:n},V(n),9,ei))),128))],8,Qe),[[x,i.precisionRangeMaxValue]])])):F((m(),p("select",{key:1,"onUpdate:modelValue":e[20]||(e[20]=n=>i.precision=n),disabled:!i.precisionEnabled,class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50 cursor-pointer w-full py-2 px-3"},[(m(!0),p(D,null,w(i.precisionOptions,n=>(m(),p("option",{key:n,value:n},V(n),9,ti))),128))],8,ii)),[[x,i.precision]])])]),_:1},8,["modelValue"]),b(c,{modelValue:i.valueScalingEnabled,"onUpdate:modelValue":e[23]||(e[23]=n=>i.valueScalingEnabled=n),label:"Value Scaling",description:"Applies a scaling on the exported value."},{default:S(()=>[F(r("select",{"onUpdate:modelValue":e[22]||(e[22]=n=>i.valueScaling=n),disabled:!i.valueScalingEnabled,class:"shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50 cursor-pointer w-full py-2 px-3"},[(m(!0),p(D,null,w(i.valueScalingOptions,n=>(m(),p("option",{key:n.value,value:n.value},V(n.label),9,si))),128))],8,ni),[[x,i.valueScaling]])]),_:1},8,["modelValue"]),b(c,{modelValue:i.autoDecimalDigits,"onUpdate:modelValue":e[24]||(e[24]=n=>i.autoDecimalDigits=n),label:"Auto Decimal Digits",description:"Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits."},null,8,["modelValue"])])])],64)}var ai=E(Ie,[["render",oi]]);const ci='{"title":"Playground","description":"","frontmatter":{},"headers":[],"relativePath":"playground.md"}',ri={},li=r("h1",{id:"playground",tabindex:"-1"},[X("Playground "),r("a",{class:"header-anchor",href:"#playground","aria-hidden":"true"},"#")],-1);function ui(i,e,t,s,o,l){const a=ai;return m(),p("div",null,[li,b(a)])}var mi=E(ri,[["render",ui]]);export{ci as __pageData,mi as default};
