let currentVersion = null;

async function checkForNewVersion() {
  try {
    const response = await fetch('/version.txt', { cache: 'no-store' });
    if (!response.ok) throw new Error('No se pudo obtener version.txt');

    const latestVersion = await response.text();

    if (currentVersion && latestVersion.trim() !== currentVersion.trim()) {
      console.log('Nueva versión detectada. Recargando...');
      location.reload(true);
    }

    currentVersion = latestVersion.trim();
  } catch (error) {
    console.error('Error al comprobar la versión:', error);
  }
}

// Revisa la versión cada 10 segundos (puedes ajustarlo si lo deseas)
setInterval(checkForNewVersion, 10000);

// También revisa justo al cargar la página
checkForNewVersion();