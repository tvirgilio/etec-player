// Player de Música Sertaneja
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progress = document.getElementById('progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalTimeDisplay = document.getElementById('total-time');
    const currentSongDisplay = document.querySelector('.current-song');
    const playlist = document.querySelector('.playlist');
    const albumCover = document.getElementById('album-cover');
    
    // Dados completos dos artistas e músicas
    const artists = {
        'Jorge & Mateus': [
            { title: "Propaganda", src: "jorge-mateus-propaganda.mp3", duration: "3:45", album: "Os Anjos Cantam (2013)" },
            { title: "Amo Noite e Dia", src: "jorge-mateus-amo-noite-e-dia.mp3", duration: "3:12", album: "Os Anjos Cantam (2013)" },
            { title: "Voa Beija-Flor", src: "jorge-mateus-voa-beija-flor.mp3", duration: "3:30", album: "Os Anjos Cantam (2013)" },
            { title: "A Hora É Agora", src: "jorge-mateus-a-hora-e-agora.mp3", duration: "3:15", album: "Os Anjos Cantam (2013)" }
        ],
        'Marília Mendonça': [
            { title: "Infiel", src: "marilia-infiel.mp3", duration: "3:26", album: "Perfil (2019)" },
            { title: "Todo Mundo Vai Sofrer", src: "marilia-todo-mundo-vai-sofrer.mp3", duration: "3:48", album: "Perfil (2019)" },
            { title: "Bem Pior Que Eu", src: "marilia-bem-pior-que-eu.mp3", duration: "2:58", album: "Patroas (2020)" },
            { title: "Ciumeira", src: "marilia-ciumeira.mp3", duration: "3:22", album: "Decretos Reais (2019)" }
        ],
        'Maiara & Maraisa': [
            { title: "10%", src: "maiara-maraisa-10porcento.mp3", duration: "2:54", album: "10% (2021)" },
            { title: "Nem Doeu", src: "maiara-maraisa-nem-doeu.mp3", duration: "2:58", album: "10% (2021)" },
            { title: "Seu Namorado", src: "maiara-maraisa-seu-namorado.mp3", duration: "2:45", album: "10% (2021)" },
            { title: "Medo Bobo", src: "maiara-maraisa-medo-bobo.mp3", duration: "2:38", album: "Aqui em Casa (2018)" }
        ],
        'Gusttavo Lima': [
            { title: "Balada", src: "gusttavo-lima-balada.mp3", duration: "3:22", album: "Buteco do Gusttavo Lima (2012)" },
            { title: "Cem Mil", src: "gusttavo-lima-cem-mil.mp3", duration: "3:14", album: "Buteco do Gusttavo Lima (2012)" },
            { title: "Diz Pra Mim", src: "gusttavo-lima-diz-pra-mim.mp3", duration: "3:05", album: "Buteco do Gusttavo Lima (2012)" },
            { title: "Inventor dos Amores", src: "gusttavo-lima-inventor-dos-amores.mp3", duration: "3:18", album: "Inventor dos Amores (2010)" }
        ],
        'Zé Neto & Cristiano': [
            { title: "Bebi Minha Bicicleta", src: "ze-neto-cristiano-bebi-minha-bicicleta.mp3", duration: "2:39", album: "Por Mais Beijos Ao Vivo (2019)" },
            { title: "Notificação Preferida", src: "ze-neto-cristiano-notificacao-preferida.mp3", duration: "2:45", album: "Por Mais Beijos Ao Vivo (2019)" },
            { title: "Você Beberia Ou Não Beberia?", src: "ze-neto-cristiano-voce-beberia.mp3", duration: "2:51", album: "Por Mais Beijos Ao Vivo (2019)" },
            { title: "Estado Decadente", src: "ze-neto-cristiano-estado-decadente.mp3", duration: "2:58", album: "Chaaama (2018)" }
        ],
        'Henrique & Juliano': [
            { title: "Cuida Bem Dela", src: "henrique-juliano-cuida-bem-dela.mp3", duration: "3:22", album: "O Céu Explica Tudo (2016)" },
            { title: "Aquelas Coisas", src: "henrique-juliano-aquelas-coisas.mp3", duration: "2:45", album: "O Céu Explica Tudo (2016)" },
            { title: "Vira Homem", src: "henrique-juliano-vira-homem.mp3", duration: "2:38", album: "Novas Histórias (2021)" },
            { title: "Liberdade Provisória", src: "henrique-juliano-liberdade-provisoria.mp3", duration: "2:51", album: "Novas Histórias (2021)" }
        ],
        'Chitãozinho & Xororó': [
            { title: "Evidências", src: "chitao-xororo-evidencias.mp3", duration: "4:36", album: "Evidências (1990)" },
            { title: "Fio de Cabelo", src: "chitao-xororo-fio-de-cabelo.mp3", duration: "3:12", album: "Se For Amor (1992)" },
            { title: "No Rancho Fundo", src: "chitao-xororo-no-rancho-fundo.mp3", duration: "3:05", album: "Clássicos Sertanejos (1995)" },
            { title: "Sinônimos", src: "chitao-xororo-sinonimos.mp3", duration: "3:18", album: "Se For Amor (1992)" }
        ],
        'Luan Santana': [
            { title: "Meteoro", src: "luan-santana-meteoro.mp3", duration: "3:22", album: "1977 (2021)" },
            { title: "Escreve Aí", src: "luan-santana-escreve-ai.mp3", duration: "3:14", album: "Live (2014)" },
            { title: "Tudo Que Você Quiser", src: "luan-santana-tudo-que-voce-quiser.mp3", duration: "3:05", album: "1977 (2021)" },
            { title: "Morena", src: "luan-santana-morena.mp3", duration: "3:18", album: "Live (2014)" }
        ]
    };
    
    let currentSongIndex = 0;
    let currentArtist = null;
    let currentSongs = [];
    
    // Função para carregar as músicas de um artista
    function loadArtistSongs(artistName) {
        currentArtist = artistName;
        currentSongs = artists[artistName] || [];
        currentSongIndex = 0;
        
        // Atualiza a playlist
        updatePlaylist();
        
        // Se houver músicas, carrega a primeira
        if (currentSongs.length > 0) {
            loadSong(currentSongIndex);
        } else {
            currentSongDisplay.textContent = "Nenhuma música disponível para " + artistName;
            albumCover.src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
            totalTimeDisplay.textContent = "0:00";
            currentTimeDisplay.textContent = "0:00";
            progress.value = 0;
        }
    }
    
    // Função para atualizar a lista de músicas
    function updatePlaylist() {
        playlist.innerHTML = '';
        
        if (currentSongs.length === 0) {
            const li = document.createElement('li');
            li.textContent = "Nenhuma música disponível";
            playlist.appendChild(li);
            return;
        }
        
        currentSongs.forEach((song, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;
            
            const songInfo = document.createElement('div');
            songInfo.className = 'song-info';
            
            const songTitle = document.createElement('div');
            songTitle.className = 'song-title';
            songTitle.textContent = song.title;
            
            const songAlbum = document.createElement('div');
            songAlbum.className = 'song-duration';
            songAlbum.textContent = song.album;
            
            songInfo.appendChild(songTitle);
            songInfo.appendChild(songAlbum);
            
            const songDuration = document.createElement('div');
            songDuration.className = 'song-duration';
            songDuration.textContent = song.duration;
            
            li.appendChild(songInfo);
            li.appendChild(songDuration);
            
            li.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                audioPlayer.play();
            });
            
            playlist.appendChild(li);
        });
    }
    
    // Função para carregar uma música específica
    function loadSong(index) {
        if (currentSongs.length === 0 || index < 0 || index >= currentSongs.length) return;
        
        const song = currentSongs[index];
        audioPlayer.src = song.src;
        currentSongDisplay.textContent = `${currentArtist} - ${song.title}`;
        albumCover.src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
        totalTimeDisplay.textContent = song.duration;
        currentTimeDisplay.textContent = "0:00";
        progress.value = 0;
        
        // Atualiza a classe 'playing' na playlist
        const playlistItems = playlist.querySelectorAll('li');
        playlistItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('playing');
            } else {
                item.classList.remove('playing');
            }
        });
    }
    
    // Função para formatar o tempo
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Função para atualizar a barra de progresso
    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progress.value = progressPercent;
            currentTimeDisplay.textContent = formatTime(currentTime);
        }
    }
    
    // Event listeners
    playBtn.addEventListener('click', () => {
        if (currentSongs.length > 0) {
            audioPlayer.play();
        }
    });
    
    pauseBtn.addEventListener('click', () => {
        audioPlayer.pause();
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentSongs.length === 0) return;
        
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = currentSongs.length - 1;
        }
        loadSong(currentSongIndex);
        audioPlayer.play();
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSongs.length === 0) return;
        
        currentSongIndex++;
        if (currentSongIndex > currentSongs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        audioPlayer.play();
    });
    
    progress.addEventListener('click', (e) => {
        const width = progress.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    });
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        nextBtn.click();
    });
    
    // Adiciona evento de clique nos artistas para carregar suas músicas
    document.querySelectorAll('.artist-box').forEach(box => {
        box.addEventListener('click', function() {
            const artistName = this.querySelector('h3').textContent;
            loadArtistSongs(artistName);
        });
    });
    
    // Inicializa com nenhuma música selecionada
    currentSongDisplay.textContent = "Selecione um artista";
});