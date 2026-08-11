const fs = require('fs');
const path = require('path');

function cleanUnwantedAppFolders() {
  const appsDir = path.join(__dirname, '../apps');
  const unwantedFolders = ['family-app', 'fisherman-app', 'government-admin', 'portal-hub', 'rescue-dashboard'];

  unwantedFolders.forEach(folder => {
    const targetPath = path.join(appsDir, folder);
    if (fs.existsSync(targetPath)) {
      try {
        fs.rmSync(targetPath, { recursive: true, force: true });
        console.log(`Successfully removed unwanted app directory: ${folder}`);
      } catch (err) {
        console.error(`Error removing ${folder}: ${err.message}`);
      }
    }
  });
}

cleanUnwantedAppFolders();

module.exports = { cleanUnwantedAppFolders };
