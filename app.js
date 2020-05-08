
//Variabili generali
var coordX = 0;
var coordY = 0;
var noAllowed = [];
var impostaPuffo = false;
var setIntervalRef = null;
var limiteMassimo =0;
var qVolte = 0;

var direction = Math.floor(Math.random() * 4) + 1;
//-----------

function init(){
    
     var labirinto = [
         ['X','X','X','X','X','X','X','X','X','X'],
         ['X','O','O','O','O','O','O','O','O','X'],
         ['X','O','X','X','X','X','O','X','O','X'],
         ['X','O','X','O','O','O','O','O','O','X'],
         ['U','O','X','O','X','X','X','X','O','X'],
         ['X','O','X','O','X','O','X','O','O','X'],
         ['X','O','X','O','O','O','X','X','O','X'],
         ['X','O','O','O','X','O','O','O','O','X'],
         ['X','O','X','O','O','O','X','O','O','X'],
         ['X','X','X','X','U','X','X','X','X','X']
     ];

     var wrapper = document.getElementById('wrapper');
    
    for(var i= 0; i<labirinto[0].length; i++){
        var divOrr = document.createElement('div');
        divOrr.classList.add('alt_10');
        for(var j= 0; j<labirinto[1].length; j++){
            if(labirinto[i][j] == 'X'){
                var cas = document.createElement('div');
                cas.classList.add('casella','sfondoNero');
                //Setta le coordinate e id
                cas.setAttribute('_coordX',j);
                cas.setAttribute('_coordY',i);
                cas.setAttribute('id',j+ '_' +i)
                cas.setAttribute('typeCas',labirinto[i][j]);
                divOrr.appendChild(cas);
                //Inserisci coordinate caselle non ammesse
                noAllowed.push([j,i]);
            }else{
                var cas = document.createElement('div');
                cas.classList.add('casella','sfondoBianco');
                //Setta le coordinate e id
                cas.setAttribute('_coordX',j);
                cas.setAttribute('_coordY',i);
                cas.setAttribute('id',j+ '_' +i);
                cas.setAttribute('typeCas',labirinto[i][j]);  
                //Aggiungi immagine
                    var dv = document.createElement('div');
                    var im = document.createElement('img');
                    im.src ='img/puffo.ico';
                    im.height = 45;
                    dv.appendChild(im);
                    cas.appendChild(dv);
                //-------------------
                cas.style.opacity =0;
                cas.onclick = function(){
                    if(!impostaPuffo){
                        this.style.opacity =1;
                        coordX = parseInt(this.getAttribute('_coordX'));
                        coordY = parseInt(this.getAttribute('_coordY'));
                    }
                    impostaPuffo = true;
                };
                divOrr.appendChild(cas);
            }
        }
        //Attacca il divOrr al wrapper
        wrapper.appendChild(divOrr);
    }

}

function isAllowed(x, y){
    for(i=0; i<noAllowed.length; i++){
         if(x == noAllowed[i][0] && y == noAllowed[i][1]){
            return false;
         }
    }
    return true;
}



function quanteVolte(){
    //Controlla il numero di volte concesso
    if(qVolte < limiteMassimo){
        qVolte +=1;
    }else{
        clearInterval(setIntervalRef);
        document.getElementById('warning').value = 'Maximum number of steps reached!';
    }
}


function avanza(tempX, tempY){
    try{
//Fai il passo
        var c = document.getElementById(tempX +'_' + tempY);
        c.style.opacity =1;
        
        var p = document.getElementById(coordX + '_' + coordY);
        p.style.opacity = 0;

        // verifica che il puffo non sia uscito
        var exit = document.getElementById(tempX + '_' + tempY);
        if(exit.getAttribute('typeCas') === 'U'){
            clearInterval(setIntervalRef);
            var u = document.getElementById('warning');
            u.style.color = "red";
            u.value = 'You have reached the exit!';

        }
        //------

        //Metti le coordinate temporanee in quelle principali
        coordX = tempX;
        coordY = tempY;
    //-----
    }catch{
        return;
    }

}


function turn(dir){
  switch(direction){

      case 1:
          //
          if(dir=='right'){
              direction = 2;
          }else if(dir=='left'){
              direction = 4;    
          }else{
              direction = 3;  
          }
      break;

      case 2:
          //
          if(dir=='right'){
              direction = 3;
          }else if(dir=='left'){
              direction = 1;    
          }else{
              direction = 4;  
          }
      break;

      case 3:
          //
          if(dir=='right'){
              direction = 4;
          }else if(dir=='left'){
              direction = 2;    
          }else{
              direction = 1;  
          }
      break;

      case 4:
          //
          if(dir=='right'){
              direction = 1;
          }else if(dir=='left'){
              direction = 3;    
          }else{
              direction = 2;  
          }
      break;
      
  }
}

function gioca(){

  switch(direction){
      case 1:
          var fx = coordX;
          var fy = coordY -1;
          //
          var rx = coordX +1;
          var ry = coordY;
          //
          var lx = coordX -1;
          var ly = coordY;
          //
          var bx = coordX;
          var by = coordY +1;
      break;

      case 2:
          var fx = coordX +1;
          var fy = coordY;
          //
          var rx = coordX;
          var ry = coordY +1;
          //
          var lx = coordX;
          var ly = coordY -1;
          //
          var bx = coordX -1;
          var by = coordY; 
      break;

      case 3:
          var fx = coordX ;
          var fy = coordY +1;
          //
          var rx = coordX -1;
          var ry = coordY ;
          //
          var lx = coordX +1;
          var ly = coordY;
          //
          var bx = coordX ;
          var by = coordY -1;
      break;

      case 4:
          var fx = coordX -1;
          var fy = coordY;
          //
          var rx = coordX;
          var ry = coordY -1;
          //
          var lx = coordX;
          var ly = coordY +1;
          //
          var bx = coordX +1;
          var by = coordY ;
      break;
  }

  //Metti il codice qui
  
  if(!isAllowed(fx,fy)){

      if(!isAllowed(lx,ly) && !isAllowed(rx,ry)){
          //
          avanza(bx,by);
          quanteVolte()
          turn('back');

      }else if(!isAllowed(lx,ly) && isAllowed(rx,ry)){
          //
          avanza(rx,ry);
          quanteVolte()
          turn('right');

      }else if(isAllowed(lx,ly) && !isAllowed(rx,ry)){
          //
          avanza(lx,ly);
          quanteVolte()
          turn('left');

      }else{
          //
          var d = Math.floor(Math.random() * 2) + 1;
          if(d===1){
              avanza(rx,ry);
              quanteVolte()
              turn('right');
          }else{
              avanza(lx,ly);
              quanteVolte()
              turn('left');
          }

      }

  }else{


      if(!isAllowed(lx,ly) && !isAllowed(rx,ry)){
          //
          avanza(fx,fy);
          quanteVolte()
          
      }else if(!isAllowed(lx,ly) && isAllowed(rx,ry)){
          //
          var d = Math.floor(Math.random() * 2) + 1;
          if(d===1){
              avanza(fx,fy);
              quanteVolte()
          }else{
              avanza(rx,ry);
              quanteVolte()
              turn('right');
          }
      
      }else if(isAllowed(lx,ly) && !isAllowed(rx,ry)){
          //
          var d = Math.floor(Math.random() * 2) + 1;
          if(d===1){
              avanza(fx,fy);
              quanteVolte()
          }else{
              avanza(lx,ly);
              quanteVolte()
              turn('left');
          }

      }else{
         //
         var d = Math.floor(Math.random() * 3) + 1;
         if(d===1){
              avanza(fx,fy);
              quanteVolte()
         }else if(d===2){
              avanza(rx,ry);
              quanteVolte()
              turn('right');
         }else{
              avanza(lx,ly);
              quanteVolte()
              turn('left');
         }

      }

  }
         
  
}

function principale(){
  if (!impostaPuffo) {
      document.getElementById('warning').value = 'Put the smurf in the labyrinth!';
      return;
  }
  document.getElementById('warning').value = '';
  limiteMassimo = parseInt(document.getElementById('impostaPassi').value);

  if(!Number.isInteger(limiteMassimo)) {
    document.getElementById('warning').value = 'Enter a valid number of steps!';
      return;
  }
  setIntervalRef = setInterval(gioca,500);
  

}

init();