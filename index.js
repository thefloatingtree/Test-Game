const { app, BrowserWindow } = require('electron')
const debug = require('electron-debug')

function createWindow () {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.setMenu(null)

  win.loadFile('./build/index.html')
}

debug({ showDevTools: false })

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})