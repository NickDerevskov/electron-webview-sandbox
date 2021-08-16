const {app, BrowserWindow, protocol, Menu} = require('electron')
const path = require('path')

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 1600,
    maximizable: true,
    minimizable: true,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      webSecurity: false,
      webviewTag: true
    }
  })


  mainWindow.loadURL('file://dist/index.html')
  mainWindow.webContents.openDevTools()
  mainWindow.webContents.session.clearStorageData()
}


app.whenReady().then(() => {
    protocol.interceptFileProtocol('file', (request, callback) => {
    const url = request.url.substr(7)
    callback({
      path: path.normalize(path.join(__dirname, url))
    })
  })
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
