const versionUrl = '/version.txt';
let currentVersion = null;

async function checkVersion() {
  try {
    const response = await fetch(`${versionUrl}?_=${Date.now()}`, { cache: 'no-store' });

    if (!response.ok) {
      console.warn('No se pudo obtener la versión actual');
      return;
    }

    const newVersion = await response.text();

    if (currentVersion === null) {
      currentVersion = newVersion.trim();
    } else if (newVersion.trim() !== currentVersion) {
      console.log('Nueva versión detectada. Recargando sin caché...');
      window.location.href = window.location.href.split('?')[0] + '?v=' + new Date().getTime();
    }
  } catch (error) {
    console.error('Error al comprobar versión:', error);
  }
}

// Comprobar cada 10 segundos (ajustable)
setInterval(checkVersion, 10000);
checkVersion(); // Primera comprobación inmediata