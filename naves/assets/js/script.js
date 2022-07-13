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
	var TECLA = {
        W: 87,
        S: 83,
        D: 68
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
            
        }
            
        //caso S seja pressionado
        if (jogo.pressionou[TECLA.S]) {           
            //pega a posição atual
            var topo = parseInt($("#jogador").css("top"));
            //joga pra baixo
            $("#jogador").css("top",topo+10);	
        }
            
        //caso D seja pressionado
        if (jogo.pressionou[TECLA.D]) {    
            //Chama função Disparo	
        }
        
    } // fim da função movejogador()

} // Fim da função start