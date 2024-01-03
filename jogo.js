const playButton = document.getElementById('playButton');
const telaInicio = document.getElementById('telaInicio')
const scoreEl = document.querySelector('#scoreEl');
const canvas = document.querySelector('canvas');
const scoreElement = document.getElementById('score');
const contagemRegressivaElemento = document.getElementById('contagemRegressiva');
const body = document.querySelector('body')

const ctx = canvas.getContext('2d');
Object.assign(telaMorte.style, {
    display: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

novacor = 'black';

document.addEventListener("DOMContentLoaded", function() {
    var telaControles = document.getElementById("Telacontroles");
    var botaoControles = document.getElementById("controles");

    // Adiciona um ouvinte de evento ao botão "Controles"
    botaoControles.addEventListener("click", function() {
        // Alterna a visibilidade da tela de controles
        telaControles.style.display = 'block'
        telaInicio.style.display = 'none'


    });
});

document.addEventListener("DOMContentLoaded", function() {
    const backgroundMusic = document.getElementById('somDeFundo');
    const somButton = document.getElementById('som');

    // Adiciona um ouvinte de evento ao botão "som"
    somButton.addEventListener('click', function() {
        // Adiciona uma verificação para impedir a reprodução ao clicar no botão de jogar

        toggleSom(backgroundMusic);
        toggleImagemSom();
    });

    function toggleSom(audio) {
        // Verifica se o áudio está pausado e se o jogo está ativo ou se o jogo está encerrado
        if (audio.paused && (game.active || game.over)) {
            audio.play();
        } else {
            // Se estiver reproduzindo, pausa o áudio
            audio.pause();
        }
    }
});



canvas.width = 1024;
canvas.height = 576;

class Jogador {
    constructor() {
        this.velocidade = {
            x: 0,
            y: 0
        };

        this.rotacao = 0
        this.opacidade = 1

        const imagem = new Image();
        imagem.src = 'img/sapo.png';
        imagem.onload = () => {
            const scale = 0.15;
            this.imagem = imagem;
            this.width = imagem.width * scale;
            this.height = imagem.height * scale;
            this.posicao = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            };
        };
    }
    draw() {

        ctx.save()
        ctx.globalAlpha = this.opacidade
        ctx.translate(jogador.posicao.x + jogador.width / 2, jogador.posicao.y + jogador.height / 2 )

        ctx.rotate(this.rotacao)

        ctx.translate(
            -jogador.posicao.x - jogador.width / 2, 
            -jogador.posicao.y - jogador.height / 2 )


        ctx.drawImage(this.imagem,
            this.posicao.x,
            this.posicao.y,
            this.width,
            this.height);

        ctx.restore()
    }
    atualizacao() {
        if (this.imagem) {
            this.draw();
            this.posicao.x += this.velocidade.x;
        }
    }
}

class Tiro{
    constructor({posicao , velocidade}){
        this.posicao = posicao
        this.velocidade = velocidade
        this.radius = 4
        this.somTiro = document.getElementById('somTiro');
    }
    reproduzirSomTiro() {
        this.somTiro.currentTime = 0; // Reinicia o som, permitindo a reprodução simultânea
        this.somTiro.play();
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.posicao.x , this.posicao.y , this.radius, 0 ,Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()

    }

    atualizacao(){
        this.draw()
        this.posicao.x += this.velocidade.x
        this.posicao.y += this.velocidade.y
    }
}
class Particula{
    constructor({posicao , velocidade , radius , color , fades}){
        this.posicao = posicao
        this.velocidade = velocidade
        this.radius = radius
        this.color = color
        this.opacidade = 1 
        this.fades = fades
    }

    draw(){
        ctx.save()
        ctx.globalAlpha = this.opacidade
        ctx.beginPath()
        ctx.arc(this.posicao.x , this.posicao.y , this.radius, 0 ,Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    atualizacao(){
        this.draw()
        this.posicao.x += this.velocidade.x
        this.posicao.y += this.velocidade.y
        if(this.fades)this.opacidade -= 0.01
    }
}

class TiroAlien{
    constructor({posicao , velocidade}){
        this.posicao = posicao
        this.velocidade = velocidade
        this.width = 3
        this.height = 10
    }

    draw(){
        ctx.fillStyle = 'white'
        ctx.fillRect(this.posicao.x ,this.posicao.y, this.width,this.height)
    }

    atualizacao(){
        this.draw()
        this.posicao.x += this.velocidade.x
        this.posicao.y += this.velocidade.y
    }
}

class Alien {
    constructor({posicao}) {
        this.velocidade = {
            x: 0,
            y: 0
        };

        const imagem = new Image();
        imagem.src = 'img/invader.png';
        imagem.onload = () => {
            const scale = 1;
            this.imagem = imagem;
            this.width = imagem.width * scale;
            this.height = imagem.height * scale;
            this.posicao = {
                x: posicao.x,
                y: posicao.y
            };
        };
    }
    draw() {

        ctx.drawImage(this.imagem,
            this.posicao.x,
            this.posicao.y,
            this.width,
            this.height);

    }
    atualizacao({velocidade}) {
        if (this.imagem) {
            this.draw();
            this.posicao.x += velocidade.x;
            this.posicao.y += velocidade.y;
        }
    }

    bala(TiroAlienArray) {
        if (this.posicao) {
            const novoTiroAlien = new TiroAlien({
                posicao: {
                    x: this.posicao.x + this.width / 2,
                    y: this.posicao.y + this.height
                },
                velocidade: {
                    x: 0,
                    y: 5
                }
            });
            TiroAlienArray.push(novoTiroAlien);
        }
    }
}

// ... (seu código anterior)

class linha {
    constructor() {
        this.posicao = {
            x: 0,
            y: 0
        }
        this.velocidade = {
            x: 2, // Defina a velocidade inicial
            y: 0
        }

        this.alien = []
        const coluns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = coluns * 30

        for (let x = 0; x < coluns; x++) {
            for (let y = 0; y < rows; y++) {
                this.alien.push(new Alien({
                    posicao: {
                        x: x * 30,
                        y: y * 30
                    }
                }))
            }
        }
    };
    atualizacao() {
        this.posicao.x += this.velocidade.x
        this.posicao.y += this.velocidade.y

        this.velocidade.y = 0

        if (this.posicao.x + this.width >= canvas.width || this.posicao.x <= 0) {
            this.velocidade.x = -this.velocidade.x
            this.velocidade.y = 30
        }
    }
}


const jogador = new Jogador();
const Tiros = []
const linhas = [new linha()]
const TiroAliens = []
const Particulas = []

const contr = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    space:{
        pressed: false
    },

}

let frames = 0
let randomInterval = Math.floor(Math.random() * 500  + 500 )
let game = {
    over:false,
    active : true
}


let score = 0

for(let  i = 0 ; i < 100 ; i++){
    Particulas.push(new Particula({
        posicao:{
            x: Math.random()  * canvas.width, 
            y: Math.random() * canvas.height
        }, 
        velocidade :{
            x:0,
            y:0.3
        },
        radius:Math.random() * 2,
        color: 'white'
    }))

}

function criaParticulas({objeto , color , fades}){
    for(let  i = 0 ; i < 15 ; i++){
        Particulas.push(new Particula({
            posicao:{
                x: objeto.posicao.x  + objeto.width / 2, 
                y: objeto.posicao.y + objeto.height / 2
            }, 
            velocidade :{
                x:(Math.random() - 0.5) * 2,
                y:(Math.random() - 0.5) * 2
            },
            radius:Math.random() * 3,
            color: color || 'yellow',
            fades : true
        }))

    }
}
function gameOver(scoreEl) {
    // Acesse diretamente o elemento 'scoreFinal' e defina seu texto
    var scoreFinal = document.getElementById('scoreFinal');
    if (scoreFinal) {
        scoreFinal.textContent = score;
    } else {
        console.error("Elemento 'scoreFinal' não encontrado no HTML.");
    }
    if (game.over) {
        // Pausa a música quando o jogo termina
        const somJogo = document.getElementById('somJogo');
        const somMorte = document.getElementById('somMorte')
        somJogo.pause();
        somMorte.play()
    }


}


function animacao() {
    if(!game.active) return
    requestAnimationFrame(animacao);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    jogador.atualizacao();
    Particulas.forEach((Particula , i) =>{

        if(Particula.posicao.y - Particula.radius >= canvas.height){
            Particula.posicao.x = Math.random() * canvas.width
            Particula.posicao.y =  - Particula.radius
        }


        if(Particula.opacidade <=0 ){
            setTimeout(() =>{
                Particulas.splice(i , 1 )
            },0)
        } else{
            Particula.atualizacao()
        }
    })
    TiroAliens.forEach((TiroAlien, index) => { // Correção: Adicionando os parâmetros corretos
        if (TiroAlien.posicao.y + TiroAlien.height >= canvas.height) {
            setTimeout(() => {
                TiroAliens.splice(index, 1);
            }, 0);
        } else {
            TiroAlien.atualizacao();

            // Verificação se o tiro alienígena atingiu o jogador
            if (
                TiroAlien.posicao.y + TiroAlien.height >= jogador.posicao.y &&
                TiroAlien.posicao.x + TiroAlien.width >= jogador.posicao.x &&
                TiroAlien.posicao.x <= jogador.posicao.x + jogador.width
            ) {
                setTimeout(() =>{
                    Particulas.splice(index , 1 )
                    jogador.opacidade = 0 
                    game.over = true

                    telaMorte.style.display = 'block'
                },0)
                setTimeout(() =>{
                    game.active = false
                },20)
                criaParticulas({
                    objeto : jogador,
                    color : "white",
                    fades : true
                  })
            }
        }
    });
    Tiros.forEach((tiro, index) => { // Corrigido aqui

        if (tiro.posicao.y + tiro.radius <= 0) { // Corrigido aqui
            setTimeout(() => {
                Tiros.splice(index, 1);
            }, 0);
        } else {
            tiro.atualizacao(); // Corrigido aqui
        }
    });

    linhas.forEach((linha, linhaIndex)=> {
        linha.atualizacao();
        if (frames % 100 == 0 && linha.alien.length > 0) {
            linha.alien[Math.floor(Math.random() * linha.alien.length)].bala(TiroAliens);
        }
        linha.alien.forEach((Alien, i) => {
            Alien.atualizacao({ velocidade: linha.velocidade });
    
            Tiros.forEach((Tiro, j) => {
                if (
                    Tiro.posicao.y + Tiro.radius >= Alien.posicao.y &&
                    Tiro.posicao.y - Tiro.radius <= Alien.posicao.y + Alien.height &&
                    Tiro.posicao.x + Tiro.radius >= Alien.posicao.x &&
                    Tiro.posicao.x - Tiro.radius <= Alien.posicao.x + Alien.width && Tiro.posicao.y + Tiro.radius >= Alien.posicao.y
                ) {
 
                    setTimeout(() => {
                        const invaderFound = linha.alien.find(Alien2 =>Alien2 === Alien
                        )
                        const tiroFound = Tiros.find(Tiro2 => Tiro2 === Tiro)
                        if(invaderFound && tiroFound){
                            score += 10         // pontuação
                            scoreEl.innerHTML = score
                            criaParticulas({
                              objeto : Alien ,
                              fades : true
                            })
                            linha.alien.splice(i, 1);
                            Tiros.splice(j, 1);

                            if(linha.alien.length > 0){
                                const primAlien = linha.alien[0]
                                const ultAlien = linha.alien[linha.alien.length - 1]

                                linha.width = ultAlien.posicao.x - primAlien.posicao.x + ultAlien.width
                                linha.posicao.x = primAlien.posicao.x
                            }else{
                                linhas.splice(linhaIndex , 1)
                            }
                        }
                        
                    }, 0);
                }
            });
        });
    });
    
    

    if (contr.a.pressed && jogador.posicao.x >= 0 ){
        jogador.velocidade.x = -7
        jogador.rotacao = -0.15
    }else if(contr.d.pressed && jogador.posicao.x + jogador.width <= canvas.width){
        jogador.velocidade.x = 7
        jogador.rotacao = 0.15
    }else{
        jogador.velocidade.x = 0
        jogador.rotacao = 0
    }

    if ( frames % randomInterval === 0){
        linhas.push(new linha())
        randomInterval = Math.floor(Math.random() * 500  + 500 )
        frames = 0
    }


    gameOver(scoreEl)
    frames++;
}

// Dentro da função que é chamada quando o jogo termina

let contagemRegressiva = 3; // Defina o tempo da contagem regressiva em segundos
let contagemRegressivaInterval;
let mensagemFinalTimeout;


function atualizarContagemRegressiva() {
    contagemRegressivaElemento.textContent = contagemRegressiva;

    if (contagemRegressiva === 0) {
        // Inicia o jogo quando a contagem regressiva chegar a zero
        const mensagemFinalElemento = document.getElementById('mensagemFinal');
        mensagemFinalElemento.style.display = 'block';
        mensagemFinalElemento.textContent = 'GO!';


        body.style.backgroundColor = novacor;
        canvas.style.display = 'block';
        scoreEl.style.display = 'block';
        scoreElement.style.display = 'inline';
        telaInicio.style.display = 'none';
        animacao();
        clearInterval(contagemRegressivaInterval); // Para a contagem regressiva
        contagemRegressivaElemento.style.display = 'none';

        mensagemFinalTimeout = setTimeout(() => {
            mensagemFinalElemento.style.display = 'none';
        }, 200);

 
    }
    
    contagemRegressiva--;
}


playButton.addEventListener('click', () => {
    // Mostrar elementos ao clicar no botão
    contagemRegressivaElemento.style.display = 'block';
    contagemRegressivaInterval = setInterval(atualizarContagemRegressiva, 1000);
    body.style.backgroundColor = novacor;
    canvas.style.display = 'block';
    scoreEl.style.display = 'block';
    scoreElement.style.display = 'inline';
    telaInicio.style.display = 'none'

    const backgroundMusic = document.getElementById('somDeFundo');

    if (!backgroundMusic.paused) {
        backgroundMusic.pause();
    }

    const musicaSom = document.getElementById('somJogo');

    if (backgroundMusic.paused) {
        musicaSom.play();
    }

    

});


addEventListener('keydown', ({ key }) => {
    if(game.over) return 
    switch (key) {
        case 'a':
            contr.a.pressed = true
            break;
        case 'd':
            jogador.velocidade.x = -5;
            contr.d.pressed = true
            
            break;
            case ' ':
                Tiros.push(new Tiro({
                    posicao: {
                        x: jogador.posicao.x + jogador.width / 2,
                        y: jogador.posicao.y
                    },
                    velocidade: {
                        x: 0,
                        y: -10
                    }
                }));
                Tiros[Tiros.length - 1].reproduzirSomTiro();
                
                break;

    }
});
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            contr.a.pressed = false
            break;
        case 'd':
            jogador.velocidade.x = -5;
            contr.d.pressed = false
            
            break;
        case 'space':
            // faça alguma coisa
            break;

    }
});