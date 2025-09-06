// Seleção de elementos para a playlist
const mainVideo = document.querySelector('#main-Video');
const playlist = document.getElementById('playlist');
const AllLessons = document.querySelector('.AllLessons');
const videoTitle = document.querySelector('.title');

// Import videos from video-list.js
const allVideos = videos.map((video, index) => ({
  src: video.url,
  name: video.title,
  id: `video-${index + 1}`
}));

// Atualiza o título da lista de vídeos
AllLessons.textContent = `${allVideos.length} Disponiveis`;

// Variável de controle de vídeo
let musicIndex = 1;

// Função que carrega o vídeo quando a página é carregada
window.addEventListener('load', () => {
    loadMusic(musicIndex);
    updatePlaylistState();
    buildPlaylist();
});

// Função para tocar o vídeo
function playMusic() {
    mainVideo.play();
    playlist.classList.add('active');
}

// Função para carregar o vídeo
function loadMusic(index) {
    const video = allVideos[index - 1];
    mainVideo.src = video.src;
    videoTitle.textContent = `${index}. ${video.name}`;
    
    // Update current title display
    const currentTitleDisplay = document.querySelector('.current-title');
    if (currentTitleDisplay) {
        currentTitleDisplay.textContent = video.name;
        // Add fade animation
        currentTitleDisplay.style.opacity = '0';
        setTimeout(() => {
            currentTitleDisplay.style.opacity = '1';
        }, 50);
    }
}

// Criação e inserção dos itens da playlist no DOM
function buildPlaylist() {
    const fragment = document.createDocumentFragment();
    allVideos.forEach((video, index) => {
        const liTag = document.createElement('li');
        liTag.setAttribute('li-index', index + 1);

        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        const spanTitle = document.createElement('span');
        spanTitle.textContent = `${index + 1}. ${video.name}`;
        rowDiv.appendChild(spanTitle);

        const durationSpan = document.createElement('span');
        durationSpan.classList.add('duration');
        durationSpan.id = video.id;

        liTag.appendChild(rowDiv);
        liTag.appendChild(durationSpan);

        // Adiciona o evento de clique diretamente no li
        liTag.addEventListener('click', () => handlePlaylistClick(index + 1));

        fragment.appendChild(liTag);
    });
    playlist.appendChild(fragment);
}

// Atualiza o estado da playlist para mostrar o item atual tocando
function updatePlaylistState() {
    const allLiTags = playlist.querySelectorAll('li');

    allLiTags.forEach((li, index) => {
        li.classList.toggle('playing', (index + 1) === musicIndex);
    });
}

// Função chamada ao clicar em um item da playlist
function handlePlaylistClick(index) {
    musicIndex = index;
    loadMusic(musicIndex);
    updatePlaylistState();
}

// Função para compartilhar o conteúdo
window.shareContent = function() {
  const sharePopup = document.createElement('div');
  sharePopup.className = 'share-popup';
  
  const shareOverlay = document.createElement('div');
  shareOverlay.className = 'share-overlay';
  
  const currentUrl = window.location.href;
  const shareText = encodeURIComponent('Assista ao vivo: ');
  
  sharePopup.innerHTML = `
    <button class="close-share">
      <i class="fas fa-times"></i>
    </button>
    <h3>Compartilhar</h3>
    <div class="share-buttons">
      <button class="share-btn whatsapp" onclick="window.open('https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}')">
        <i class="fab fa-whatsapp"></i>
      </button>
      <button class="share-btn facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${currentUrl}')">
        <i class="fab fa-facebook-f"></i>
      </button>
      <button class="share-btn telegram" onclick="window.open('https://t.me/share/url?url=${currentUrl}&text=${shareText}')">
        <i class="fab fa-telegram-plane"></i>
      </button>
      <button class="share-btn email" onclick="window.location.href='mailto:?subject=BBB%20Cameras&body=${shareText}%20${currentUrl}'">
        <i class="fas fa-envelope"></i>
      </button>
      <button class="share-btn copy" onclick="copyToClipboard('${currentUrl}')">
        <i class="fas fa-link"></i>
      </button>
    </div>
  `;

  document.body.appendChild(shareOverlay);
  document.body.appendChild(sharePopup);

  setTimeout(() => {
    shareOverlay.classList.add('active');
    sharePopup.classList.add('active');
  }, 10);

  const closeShare = () => {
    shareOverlay.classList.remove('active');
    sharePopup.classList.remove('active');
    setTimeout(() => {
      shareOverlay.remove();
      sharePopup.remove();
    }, 300);
  };

  sharePopup.querySelector('.close-share').addEventListener('click', closeShare);
  shareOverlay.addEventListener('click', closeShare);
};

// Função para copiar o link para a área de transferência
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const alert = document.createElement('div');
    alert.className = 'copy-alert';
    alert.textContent = 'Link copiado com sucesso!';
    document.body.appendChild(alert);
    
    setTimeout(() => {
      alert.classList.add('active');
    }, 10);

    setTimeout(() => {
      alert.classList.remove('active');
      setTimeout(() => alert.remove(), 300);
    }, 2000);
  });
}