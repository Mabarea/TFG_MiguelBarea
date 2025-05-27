async function checkForNewVersion() {
  try {
    const response = await fetch('/version.txt', { cache: 'no-store' });
    const latestVersion = await response.text();

    const currentVersion = localStorage.getItem('currentVersion');

    if (currentVersion && currentVersion !== latestVersion) {
      localStorage.setItem('currentVersion', latestVersion);

      // Forzar recarga sin caché
      window.location.href = window.location.pathname + '?v=' + new Date().getTime();
    } else if (!currentVersion) {
      localStorage.setItem('currentVersion', latestVersion);
    }
  } catch (error) {
    console.error('Error checking version:', error);
  }
}

// Ejecutar cada 10 segundos (ajustable)
setInterval(checkForNewVersion, 10000);