function start() {

    //oculta a div inicio
	$("#inicio").hide(); 
	
    // cria na div fundo game as seguintes divs
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    //Principais variáveis do jogo
	var jogo = {};
    var velocidade = 5;
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var energiaAtual = 3;
    var posicaoY = parseInt(Math.random() * 334);
    var podeAtirar = true;
    var fimdejogo = false;
    jogo.pressionou = [];

	var TECLA = {
        W: 87,
        S: 83,
        D: 68,
        A: 65,
        Q: 81
    } 
    
    //Verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function(e){
    jogo.pressionou[e.which] = true;
    });  
    
    $(document).keyup(function(e){
       jogo.pressionou[e.which] = false;
    });

    //indica o tempo de execução da função loop
	jogo.timer = setInterval(loop,30);
	
	function loop() {
	
	movefundo();
    movejogador();
    moveinimigo1();
    moveinimigo2();
	moveamigo();
    colisao();
    placar();
    energia();

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
        if (jogo.pressionou[TECLA.Q]) {
            disparo();	
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

    function moveamigo() {
	
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+1);
                    
            if (posicaoX>906) {
                
                $("#amigo").css("left",0);
                        
            }
    
    } // fim da função moveamigo()
    
    function disparo() {
        if (podeAtirar == true) {
            
            podeAtirar = false;
            
            topo = parseInt($("#jogador").css("top"))
            posicaoX= parseInt($("#jogador").css("left"))
            //coordenadas de onde o tiro vai sair
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            //cria a div disparo
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top",topoTiro);
            $("#disparo").css("left",tiroX);
            
            var tempoDisparo = window.setInterval(executaDisparo, 30);
        
        } //Fecha podeAtirar
     
        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+15); 
    
            if (posicaoX>900) {
                            
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
                        
            }
        } // Fecha executaDisparo()
    } // Fecha disparo()

    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        
        // jogador com o inimigo1    
        if (colisao1.length>0) {
            
            energiaAtual--;
            //explosão
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao(inimigo1X,inimigo1Y);
        
            //reposiciona o inimigo
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }

        // jogador com o inimigo2 
        if (colisao2.length>0) {
	
            energiaAtual--;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao(inimigo2X,inimigo2Y);
                    
            $("#inimigo2").remove();
                
            reposicionaInimigo2();  
        }

        // Disparo com o inimigo1
        if (colisao3.length>0) {

            pontos=pontos+100;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
                
            //o disparo some após colisão
            explosao(inimigo1X,inimigo1Y);
            $("#disparo").css("left",950);
            
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY); 
        }

        // Disparo com o inimigo2
	    if (colisao4.length>0) {

		    pontos=pontos+50;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();
        
            explosao(inimigo2X,inimigo2Y);
            $("#disparo").css("left",950);
            
            reposicionaInimigo2();
        }

        // jogador com o amigo
	    if (colisao5.length>0) {
		
            salvos++;
            reposicionaAmigo();
            $("#amigo").remove();
        }
        
        //Inimigo2 com o amigo
        if (colisao6.length>0) {
            
            perdidos++;
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosaoAmigo(amigoX,amigoY);
            $("#amigo").remove();
                    
            reposicionaAmigo();   
        }

    } //Fim da função colisao()

    function explosao(inimigo1X,inimigo1Y) {
        $("#fundoGame").append("<div id='explosao'></div");
        $("#explosao").css("background-image", "url(assets/imgs/explosao.png)");
        var div = $("#explosao");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao = window.setInterval(removeExplosao, 1000);
	
		function removeExplosao() {
			
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
			
		}
		
	} // Fim da função explosao()

    function explosaoAmigo(amigoX,amigoY) {
        $("#fundoGame").append("<div id='explosaoAmigo' class='anima4'></div");
        $("#explosaoAmigo").css("top",amigoY);
        $("#explosaoAmigo").css("left",amigoX);
        
        var tempoExplosaoAmigo = window.setInterval(resetaExplosaoAmigo, 1000);
        
        function resetaExplosaoAmigo() {
            $("#explosaoAmigo").remove();
            window.clearInterval(tempoExplosaoAmigo);
            tempoExplosaoAmigo = null;       
        }
        
    } // Fim da função explosaoAmigo()

	function reposicionaInimigo2() {
	
        var tempoColisao4=window.setInterval(reposiciona4, 5000);
            
        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;
                
            if (fimdejogo == false) {
                
                $("#fundoGame").append("<div id=inimigo2></div");
                
            }
                
        }	
    } // Fim da dunção reposicioInimigo2()	
	
	function reposicionaAmigo() {
	
        var tempoAmigo=window.setInterval(reposiciona6, 6000);
        
        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo  =null;
                
            if (fimdejogo == false) {
                
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
                
            }
            
        }
        
    } // Fim da função reposicionaAmigo()

    function placar() {
	
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
        
    } //fim da função placar()

    function energia() {
	
		if (energiaAtual==3) {
			
			$("#energia").css("background-image", "url(assets/imgs/energia3.png)");
		}
	
		if (energiaAtual==2) {
			
			$("#energia").css("background-image", "url(assets/imgs/energia2.png)");
		}
	
		if (energiaAtual==1) {
			
			$("#energia").css("background-image", "url(assets/imgs/energia1.png)");
		}
	
		if (energiaAtual==0) {
			
			$("#energia").css("background-image", "url(assets/imgs/energia0.png)");
			
			//Game Over
		}
	
	} // Fim da função energia()

} // Fim da função start()