const { dialog, app, nativeImage } = require("electron");
const fs = require("fs");
const path = require("path");

module.exports = { showMessage, showSaveDialog, showOpenDialog };

function showMessage(browserWindow) {
  dialog.showMessageBox(
    browserWindow,
    {
      type: "info",
      icon: nativeImage.createFromPath("./alertImage.jpeg"),
      message: "hello",
      detail: "testing alerts in electron",
      buttons: ["hello", "close"],
      defaultId: 0
    },
    clickedIndex => {
      console.log(clickedIndex);
    }
  );
}

function showSaveDialog(browserWindow) {
  dialog.showSaveDialog(
    browserWindow,
    {
      defaultPath: path.join(app.getPath("downloads"), "memory-info.txt")
    },
    filename => {
      if (filename) {
        const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
        fs.writeFile(filename, memInfo, "utf8", err => {
          if (err) {
            dialog.showErrorBox("Save failed.", err.message);
          }
        });
      }
    }
  );
}

function showOpenDialog(browserWindow) {
  dialog.showOpenDialog(
    browserWindow,
    {
      defaultPath: app.getPath("downloads"),
      filters: [{ name: "Text Files", extensions: ["txt"] }] //"Text Files" displays on Windows in lower right, but not on Mac
    },
    filepaths => {
      if (filepaths) {
        console.log(filepaths, fs.readFileSync(filepaths[0], "utf8"));
      }
    }
  );
}
