const slider =document.querySelector('[input-slider]');
const passwordDisplay=document.querySelector("[password-display]");

const allCheckbox= document.querySelectorAll('input[type=checkbox]');
const copybtn=document.querySelector('[copy-btn]');
const msg=document.querySelector('[data-msg]');
const copy_msg=document.querySelector('[copy-msg]');
const strength =  document.querySelector('.strength1');
const uppercase=document.querySelector('#uppercase')
const numbers=document.querySelector('#numbers')
const symbols=document.querySelector('#symbols')
const lowercase=document.querySelector('#lowercase')
const generate_btn=document.querySelector('[generate-button]');

let Symbols=`!@#$%^&*()_-+=/?.,><;:'"|`;


let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("gray");

function handleSlider(){
    slider.value=passwordLength;
    passwordDisplay.innerText=slider.value;
    
    
}

slider.addEventListener('input',(input)=>{
    passwordLength=input.target.value;
    handleSlider();
});


async function copy(){
    try{
        await navigator.clipboard.writeText(msg.value);
        copy_msg.innerText='copied';
    }
    catch(e){
        copy_msg.innerText='failed';
    }

    copy_msg.classList.add('active')
    setTimeout(()=>{
        copy_msg.classList.remove('active');
    },2000);
    
}
copybtn.addEventListener('click',()=>{
    copy();
});


function setIndicator(color){
    strength.style.backgroundColor=color;
}


function getRndInteger(min, max){
    return Math.floor(Math.random()*(max+1-min))+min;
}

function genRandomNumber(){
    return getRndInteger(0,9);
}
function genRandomSymbol(){
    let rndSymbol=getRndInteger(0,Symbols.length-1);
    return Symbols.charAt(rndSymbol);
}

function genUpper(){
    return String.fromCharCode(getRndInteger(65,90));
}

function genLower(){
    return String.fromCharCode(getRndInteger(97,122));
}

function calcStrength(){

    let hasUpper=false;
    let hasLower=false;
    let hasSymbol=false;
    let hasNumber=false;

    if(uppercase.checked) hasUpper=true;
    if(symbols.checked) hasSymbol=true;
    if(lowercase.checked) hasLower=true;
    if(numbers.checked) hasNumber=true;
    console.log(hasLower);
    console.log(hasNumber)
    console.log(hasSymbol)
    console.log(hasUpper)

    if(hasUpper && hasLower &&(hasSymbol||hasNumber) && passwordLength>8){
        console.log("strength")
        setIndicator("green");
    }
    else if(hasUpper && hasLower && passwordLength>6){
        setIndicator("lightGreen");
    }else{
        setIndicator('red');
    }


}
function count(){
    allCheckbox.forEach((box)=>{
        if(box.checked){
            checkCount++;
        }
    })
}

allCheckbox.forEach((box)=>{
    box.addEventListener('change',()=>{
        checkCount=0;
        count();
        

    })
})

function shuffle(array){
    str="";
    for(let i=array.length-1;i>0;i--){
        let randstr=array[Math.random()*i];
        //swapping
        let temp=randstr;
        randstr=array[i];
        array[i]=temp;
        str+=randstr;
    }
    return str;
}


generate_btn.addEventListener('click',()=>{
    //base case
    if(checkCount==0){
        return;
    }

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    let password="";

    let funcArr=[];
    if(uppercase.checked){
        funcArr.push(genUpper);
    }
    if(lowercase.checked){
        funcArr.push(genLower);
    }
    if(symbols.checked){
        funcArr.push(genRandomSymbol);
    }
    if(numbers.checked){
        funcArr.push(genRandomNumber);
    }
  
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    for(let i=1;i<=passwordLength-funcArr.length;i++){
        let randfun=getRndInteger(0,funcArr.length-1);
        password+=funcArr[randfun]();
    }
    password=shuffle(Array.from(password));
  
    msg.value=password;
    
    calcStrength();
  





});




