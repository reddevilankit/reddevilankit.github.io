var mainWrapper = document.getElementById('main-wrapper');
var mainWrapper = document.getElementById('main-wrapper');
var wide = 800;
var tall = 500;
// var directionListHorizontal = ['right','left'];
var directionListHorizontal = [true, false];
// directionListVertical = ['up','down'];
directionListVertical = [true, false];
mainWrapper.style.width = wide + 'px';
mainWrapper.style.height = tall + 'px';
mainWrapper.style.backgroundColor = 'gray';
// console.log(mainWrapper.style.width);
mainWrapper.style.position = 'relative';
// colors = ['white', 'green', 'blue', 'yellow']

function randomFunction(a,b){
    return Math.ceil(a + Math.random()*(b-a));
}

function CreateAnts(){
    // this.directionListHorizontal = ['right','left'];
    this.directionListHorizontal = [true, false];  // true=right and false = left
    // this.directionListVertical = ['up','down'];
    this.directionListVertical = [true, false];  // true = up and false = down
    this.element = document.createElement('div');
    // this.element.antId = antsSoFar;
    mainWrapper.appendChild(this.element);
    this.element.width = 20;
    this.element.height = 20;
    this.element.style.width = this.element.width + 'px';
    this.element.style.height = this.element.height + 'px';
    this.element.style.backgroundColor = 'pink';
    this.element.style.position = 'absolute'
    this.element.left = randomFunction(0,wide-this.element.width-5);
    this.element.top = randomFunction(0,tall-this.element.height-5);
    // this.element.right = this.element.left + parseInt(this.element.style.width);
    // this.element.right = this.element.left + 20;
    // this.element.bottom = this.element.top + parseInt(this.element.style.height);
    // this.element.bottom = this.element.top + 20;
    // using right and bottom like this won't work as right and bottom are fixed after creating while left and top are
    // constantly being updated in the move function.
    this.element.directionHor = this.directionListHorizontal[Math.floor(Math.random()*2)];
    this.element.directionVer = this.directionListVertical[Math.floor(Math.random()*2)];
    var that = this;

    this.element.moveAnt = function(){
        //checkCollision
        for(var iterator=0; iterator<antArray.length; iterator++){
            if(that.element == antArray[iterator]){
                continue;
            }
            if((that.element.left < antArray[iterator].left+antArray[iterator].width) &&
              (that.element.left+that.element.width > antArray[iterator].left) &&
              (that.element.top < antArray[iterator].top+antArray[iterator].height) &&
              (that.element.top+that.element.height > antArray[iterator].top))
            {
                // that.element.style.backgroundColor = 'blue';
                // console.log('collision detected!!')
                // console.log('before collision H');
                // console.log(that.element.directionHor);
                that.element.directionHor = !(that.element.directionHor);
                that.element.directionVer = !(that.element.directionVer);
                // console.log('after collision H');
                // console.log(that.element.directionHor);

                // antArray[iterator].directionHor = !(antArray[iterator].directionHor);
                // antArray[iterator].directionVer = !(antArray[iterator].directionVer);
            }
        }

        if(that.element.directionHor == false){
            //move left
            if(!(that.element.left<1)){
                that.element.left -= 1;
                that.element.style.left = that.element.left + 'px';
                // console.log(that.element.style.left);
            }else{
                that.element.directionHor = true;
            }
        }
        else if(that.element.directionHor == true){
            if(!(that.element.left>wide-that.element.width-1)){
                //move right
                that.element.left += 1;
                that.element.style.left = that.element.left +'px';
                // console.log(that.element.style.left);
            }else{
                that.element.directionHor = false;
            }
        }
        if(that.element.directionVer == true){
            if(!(that.element.top<1)){
                //move up
                that.element.top -= 1;
                that.element.style.top = that.element.top +'px';
                // console.log(that.element.style.top);
            }else{
                that.element.directionVer = false;
            }

        }
        else if(that.element.directionVer == false){
            if(!(that.element.top>tall-that.element.height-1)){
                //move down
                that.element.top += 1;
                that.element.style.top = that.element.top +'px';
                // console.log(that.element.style.top);
            }else{
                that.element.directionVer = true;
            }
        }

    };
}

var messageDiv = document.createElement('div');
mainWrapper.appendChild(messageDiv);
messageDiv.style.fontSize = '40px';
messageDiv.style.color = 'rgb(48, 222, 180)';
messageDiv.style.position = 'absolute';
// messageDiv.style.display = 'none';
messageDiv.style.top = '40px';
messageDiv.style.left = '60px';
messageDiv.innerHTML = 'gracious!!';


var startButton = document.createElement('button');
document.getElementsByTagName('body')[0].appendChild(startButton);
startButton.innerText = 'Start the Game';
// startButton.style.display = 'none';
startButton.onclick = function(){
    startButton.style.display = 'none';
    messageDiv.style.display = 'none';
    startGame();
}



var antArray = [];

function startGame(){
    antArray = [];
    // antsSoFar = 0;
    // antsRightNow = 0;
    for(var i=0; i<Math.round(randomFunction(8,20)); i++){
        var temp = new CreateAnts();
        antArray[i] = temp.element;
        antArray[i].style.top = randomFunction(4,276) + 'px';
        antArray[i].style.left = randomFunction(4,376) + 'px';
        // antsSoFar++;
        // antsRightNow++;
        mainWrapper.appendChild(antArray[i]);

        antArray[i].onclick = function(){
            //  antsRightNow--;
            //  console.log('no of ants: ' + antsRightNow);
            //  console.log('antId ' + this.antId + ' i ' + i);
             var index = antArray.indexOf(this);
             antArray.splice(index,1);
             console.log('no of ants: ' + antArray.length);
             mainWrapper.removeChild(this);
             if(antArray.length==0){
                 console.log('game-over');
                 messageDiv.innerText = 'did well !!!';
                 messageDiv.style.display = 'block';
                 clearInterval(counterPromise);
                 startButton.style.display  ='block';
                 startButton.innerText = 'Wanna Play Again';
             }
        }
    }
    var counterPromise = setInterval(function(){
        // console.log('running');
        for(var i = 0; i<antArray.length; i++){
            antArray[i].moveAnt();
        }
    },10);
}
