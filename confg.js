document.getElementById('submit').addEventListener('click', () => {
  const artista = document.getElementById('artistaName').value.trim();
  const resultados = document.getElementById('resultados');
  
  if (!artista) {
    resultados.innerHTML = '<p>Por favor, digite o nome do artista.</p>';
    return;
  }

  resultados.innerHTML = '<p>Buscando músicas...</p>';

  fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artista)}&media=music&limit=10`)
    .then(res => res.json())
    .then(data => {
      resultados.innerHTML = '';

      if (!data.results.length) {
        resultados.innerHTML = '<p>Nenhuma música encontrada.</p>';
        return;
      }

      data.results.forEach(musica => {
        const container = document.createElement('div');
        container.style.marginBottom = '20px';
        container.style.padding = '10px';
        container.style.backgroundColor = '#222';
        container.style.borderRadius = '10px';
        container.style.color = '#fff';

        container.innerHTML = `
          <strong>${musica.trackName}</strong><br>
          Álbum: ${musica.collectionName}<br>
          <audio controls style="margin-top: 8px;">
            <source src="${musica.previewUrl}" type="audio/mpeg">
            Seu navegador não suporta áudio :(
          </audio><br>
          <a href="${musica.trackViewUrl}" target="_blank" rel="noopener noreferrer" style="color:#1DB954; font-weight:bold;">
            Ouça no iTunes
          </a>
        `;

        resultados.appendChild(container);
      });
    })
    .catch(() => {
      resultados.innerHTML = '<p>Erro ao buscar músicas.</p>';
    });
});
