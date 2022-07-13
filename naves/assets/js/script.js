function start() {

    //oculta a div inicio
	$("#inicio").hide(); 
	
    // cria na div fundo game as seguintes divs
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

    //Principais variáveis do jogo
	
	var jogo = {};
    var velocidade=5;
    var posicaoY = parseInt(Math.random() * 334);
	var TECLA = {
        W: 87,
        S: 83,
        D: 68,
        A: 65,
        backspace: 8
    }
    
    jogo.pressionou = [];

    //Verifica se o usuário pressionou alguma tecla	
	
	$(document).keydown(function(e){
    jogo.pressionou[e.which] = true;
    });
    
    
    $(document).keyup(function(e){
       jogo.pressionou[e.which] = false;
    });

	//Game Loop
    //indica o tempo de execução da função loop
	jogo.timer = setInterval(loop,30);
	
	function loop() {
	
	movefundo();
    movejogador();
    moveinimigo1();
    moveinimigo2();
	
	} // Fim da função loop()

    //Função que movimenta o fundo do jogo
	
	function movefundo() {
        
        //pega a posiçãoa tual do fundo, armazena em equerda e da um passo pra traz
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
        
    } // fim da função movefundo()

    function movejogador() {
	
        //caso W seja pressionado
        if (jogo.pressionou[TECLA.W]) {
            //pega a posição atual
            var topo = parseInt($("#jogador").css("top"));
            //joga pra cima
            $("#jogador").css("top",topo-10);

            //põe um teto para o helicóptero
            if (topo<=0) {
		
                $("#jogador").css("top",topo=0);
            }
        }
            
        //caso S seja pressionado
        if (jogo.pressionou[TECLA.S]) {           
            //pega a posição atual
            var topo = parseInt($("#jogador").css("top"));
            //joga pra baixo
            $("#jogador").css("top",topo+10);	

            //o helicóptero só desce até o chão
            if (topo>=434) {	
                $("#jogador").css("top",topo=434);
                    
            }
        }

        //caso A seja pressionado
        if (jogo.pressionou[TECLA.A]) {
            //pega a posição atual
            var esquerda = parseInt($("#jogador").css("left"));
            //joga pra esquerda
            $("#jogador").css("left",esquerda-10);

            //põe um limite para o helicóptero
            if (esquerda<=0) {
		
                $("#jogador").css("left",esquerda=0);
            }
        }
            
        //caso D seja pressionado
        if (jogo.pressionou[TECLA.D]) {           
            //pega a posição atual
            var esquerda = parseInt($("#jogador").css("left"));
            //joga pra direita
            $("#jogador").css("left",esquerda+10);	

            //o helicóptero tem um limite até onde pode ir
            if (esquerda>=300) {	
                $("#jogador").css("left",esquerda=300);
                    
            }
        }
            
        //caso barra de espaço seja pressionado
        if (jogo.pressionou[TECLA.backspace]) {    
            //Chama função Disparo	
        }
        
    } // fim da função movejogador()

    function moveinimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);
            
            if (posicaoX<=0) {
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left",694);
                $("#inimigo1").css("top",posicaoY);
                
            }
    } //Fim da função moveinimigo1()

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	    $("#inimigo2").css("left",posicaoX-3);
				
		if (posicaoX<=0) {
			
		    $("#inimigo2").css("left",775);
					
		}
    } // Fim da função moveinimigo2()


    

} // Fim da função start