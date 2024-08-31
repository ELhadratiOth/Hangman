let categorie = document.getElementById('cat');
let setAlpha = document.querySelector('.list-alpha');
let Tries = document.getElementById('Tries') ;
let imgHang = document.querySelector('.hangman');        
let parent = document.getElementById('parent') ;
let cat = document.getElementById('cat') ;
let time = document.getElementById('timer');
let timersto ;
let hint =document.getElementById('lamp');
let credit = document.getElementById('credit');
let interval ;

if( localStorage.credit == undefined){
    localStorage.credit = 100 ;
}
credit.innerText = localStorage.credit  ;
console.log(localStorage.credit)






let  counter = 0;
let changeImg = 0 ;
let  test ;
let  array0 ;
let empty = 0 ;




console.log(categorie.value);

function getRandomWord(i) {
    i = cat.value;
    if(i == "info" ){
        array0 = ["PYTHON", "JAVA", "JAVASCRIPT", "PHP", "RUBY", "SWIFT", "GO", "KOTLIN"];
    }
    else if ( i == 'animals'){
         array0 = ["CAT", "DOG", "ELEPHANT", "LION", "TIGER", "GIRAFFE", "ZEBRA", "HORSE", "PANDA", "KANGAROO"];
    } else if ( i == 'fruits'){
         array0 = ["APPLE", "BANANA", "CHERRY", "AVOCADO", "STRAWBERRY", "ORANGE", "MANGO", "PEAR", "WATERMELON", "BLUEBERRY"];
    } else if ( i == 'brands'){
        array0 = ["BALENCIAGA", "NIKE", "CHANEL", "CARTIER", "GUCCI", "ADIDAS", "ZARA",  "PRADA", "VERSACE"];
    } else{
         array0 = ["MERCEDES", "BENTLEY", "FORD", "DACIA", "BMW", "AUDI", "TESLA", "FERRARI", "LAMBORGHINI", "PORSCHE"];
    }
    const randomIndex = Math.floor(Math.random() * array0.length);
    test = array0[randomIndex];
    console.log('chosen one : ' , test);
}
getRandomWord('info');


function validateOneWord(input){
          if(input.value.trim().split(' ').length > 1){
                    return false ;
          }
          return true ;
}

function setAlphabets(){
          const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
          let  i = 1 ;
          alphabets.forEach(letter => {
                    let letterDiv = document.createElement('button');
                    letterDiv.textContent = letter;
                    letterDiv.setAttribute('id', `btn${i}`);
                    letterDiv.setAttribute('class', 'btn-alpha');
                    letterDiv.setAttribute('onclick', `getData(${i})`);
                    setAlpha.appendChild(letterDiv);
                    i++;
                });
}
setAlphabets();

function checkEndGame(){
    empty = 0 ;
    counter = 0 ;
    new Promise((resolve)=>{
        for( let i =0 ; i< test.length ; i++ ){      

            if(document.getElementById(`case${i}`).innerText != "")    
            {
                empty++ ;
            }  
        };
        resolve() ;
    }).then(()=>{
        if( empty == test.length ){

            localStorage.credit = parseInt( localStorage.credit) +  10 ;
            localStorage.trophy = parseInt( localStorage.trophy) + 1 ;
            clearInterval(timersto);
            throphies();

            new Promise( resolve =>{
                console.log("boucle");
                interval = setInterval(()=>{  
                    console.log("boucle");      
                    credit.innerText  = parseInt(credit.innerText) + 1 ;
                    credit.classList.add('credit-effect2');
                    
                    setTimeout(() => {
                      credit.classList.remove('credit-effect2');
                    }, 100);
                    console.log("couter valier : " + counter);
                    if(counter == 9){
                            console.log("condition checked");
                            clearInterval(interval);
                        }
                        counter++;
                   } ,100) ;
                   resolve() ;})
                   .then(()=>{          
                                        setTimeout(()=>{
                                            stopgame();
                                           clipBoard();
                                        } , 2000);
                                           
                                       })


}})
}


function getData(i){
    if( parseInt(Tries.innerText ) > 0  ){
          let checked = true ;
          let selectedBtn = document.getElementById(`btn${i}`);

          for( let j =0 ; j< test.length ; j++ ){
            let btn = document.getElementById(`case${j}`) ;
            if(btn.innerText == selectedBtn.innerText) {
                        alert("Already clicked");
                        return ;
          }}

          
          for( let i =0 ; i< test.length ; i++ ){      
                    if ( test[i] == selectedBtn.innerText ){
                              document.getElementById(`case${i}`).innerText = test[i] ;
                              checked = false ;
                    } }
          if(checked){
                    Tries.innerText = parseFloat( Tries.innerText)  - 1 ;
                    imgHang.style.background = `url(image${Tries.innerText}${Tries.innerText}.gif)`     ;
                    imgHang.style.backgroundRepeat = `no-repeat`;
                    imgHang.style.backgroundSize = `100% 100%`     ;
                    
                    }


        checkEndGame() ;

        setTimeout(()=>{
                if(parseFloat( Tries.innerText) <=0){
                    clearInterval(timersto);
                    stopgame()
                    clipBoard()          
                    return ;
          }} , 500 );

    }
    else{
        stopgame()
        clipBoard()
        }
}


function createCase(){
         let nmr = test.length ;
         console.log(nmr);
         parent.innerHTML ="";
         for (let i = 0 ; i < nmr ; i++){
          let content = `<p class="alpahbet"  id="case${i}" ></p>`
          parent.innerHTML += content ;
         }
}
createCase();

function defaultvals(){
    
    parent.innerHTML = "";
    Tries.innerText = 7 ;
    imgHang.style.background = `url(image77.gif)`;
    imgHang.style.backgroundRepeat = `no-repeat`;
    imgHang.style.backgroundSize = `100% 100%`     ;
    getRandomWord();
    createCase();
    startgame() ;
    checkEndGame();
}






function clearNav(){

    let  headr = document.querySelector('.headr');
    console.log(headr);
    headr.classList.add('decalage');
    document.getElementById('start').classList.add('start-deplaced');
    document.querySelector('.main').classList.add('decalagemain');

    setTimeout( ()=>{
        document.querySelector('.quick').classList.add('decalage-quick') }
        , 1000    );
    
};

function returnElement(){
    document.querySelector('.quick').classList.remove('decalage-quick') 
    let  headr = document.querySelector('.headr');
    headr.classList.remove('decalage');
    document.querySelector('.main').classList.remove('decalagemain');
    document.getElementById('start').classList.remove('start-deplaced');


       
        
}

function  timer(){
    timersto = setInterval(()=>{
        time.innerText = parseInt(time.innerText) + 1 ;

    } ,1030  )
  
}


function  startgame(){
    document.getElementById('start').classList.add('hide');
    document.getElementById('main').classList.remove('hide');
    time.innerText = '0';
    clearInterval(timersto);
    timer();
    document.querySelector('.settings').classList.remove('hide');
    


}

function  stopgame(){
    document.getElementById('start').classList.remove('hide');
    document.getElementById('start').classList.remove('hide');
    document.getElementById('main').classList.add('hide');
}

function clipBoard(){
    document.getElementById('stats').classList.remove('hide') ;

    document.getElementById('startbtn').classList.add('hide2') ;
    document.querySelector('.instruction').classList.add('hide2') ;



    let score = document.getElementById('score')
    score.innerText = parseInt((empty / test.length) *100 ) +'%' ;
    if ( parseInt(score.innerText) == 100){

        document.getElementById('imgwinLose').setAttribute('src' , 'win.png') ;
        document.getElementById('imgwinLose').classList.add('winshape') ;
        document.getElementById('word').classList.add('hide2') ;

    }
    else{
        document.getElementById('imgwinLose').setAttribute('src' , 'game-over.png') ;
        document.getElementById('imgwinLose').classList.remove('winshape') ;
        document.getElementById('word').classList.add('hide2') ;
    }

    document.getElementById('imgwinLose').classList.remove('hide');
    document.getElementById('imgwinLose').classList.remove('hide2');

    document.getElementById('word').innerText = test ;    
    document.getElementById('triesM').innerText = 7 - Tries.innerText;
    document.getElementById('time').innerText = time.innerText+"s";
    if(localStorage.length == 3){
        document.getElementById('Hscore').innerText = parseInt((empty / test.length) *100 )+'%' ;
        localStorage.highScore = parseInt((empty / test.length) *100 ) ;
    }
    else if(localStorage.highScore < parseInt((empty / test.length) *100 || localStorage.highScore == undefined )){
            localStorage.highScore = parseInt((empty / test.length) *100 ) ;
            document.getElementById('Hscore').innerText = parseInt((empty / test.length) *100 )+'%' ;
            
    }else{
        document.getElementById('Hscore').innerText = localStorage.highScore+'%' ;
    }
}


function resetTopScore(){
    localStorage.highScore = 0 ;
    document.getElementById('Hscore').innerText = '0%' ;
}


function givAhint(){
    if(  credit.innerText >=10 ){
        localStorage.credit = localStorage.credit-10 ;
        let counter = 1 ;
        console.log("Value :  " + credit.innerText ) ;
        let interval = setInterval(()=>{        
        credit.innerText  = parseInt(credit.innerText) - 1 ;

        credit.classList.add('credit-effect');
        
        setTimeout(() => {
          credit.classList.remove('credit-effect');
        }, 300);
            if(counter == 10 ){
                clearInterval(interval) ;
            }
            counter++;
       } , 100   ) ;

       

       while (true){
        let rand  = Math.floor(Math.random() * test.length);
        let car = test[rand] ;
        if(document.getElementById(`case${rand}`).innerText  == ""){
            for( let i =0 ; i< test.length ; i++ ){      
                if ( car == test[i] ){
                          document.getElementById(`case${i}`).innerText = car ;
                } } break;  }
       }
       checkEndGame() ;

    }else{
        alert("You don't have enough credits") ;
    }
        

}






hint.onmouseover = function () {
    if (hint) {
      hint.style.opacity = '0'; 
  
      setTimeout(() => {
        hint.src = "light-bulb2png.png"; 
        hint.style.opacity = '1'; 
        document.querySelector('.cost').classList.add('cost2') ;
        document.querySelector('.cost-img').classList.add('cost-img2') ;
        console.log( document.querySelector('.cost')) ;
        console.log( document.querySelector('.cost-img')) ;


      }, 200); 
    }
  }
  
  hint.onmouseleave = function () {
    if (hint) {
      hint.style.opacity = '0'; 
  
      setTimeout(() => {
        hint.src = "light-bulb.png"; 
        hint.style.opacity = '1'; 
        document.querySelector('.cost').classList.remove('cost2') ;
        document.querySelector('.cost-img').classList.remove('cost-img2') ;
      }, 200); 
    }
  }
    
function throphies(){
    if(localStorage.trophy == undefined){
        localStorage.trophy = 0 ;
    }
    document.querySelector('.throphytext').innerText = "0" + localStorage.trophy ;
}
throphies() ;
