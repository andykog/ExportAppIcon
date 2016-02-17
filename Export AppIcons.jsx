/*
 * Export AppIcon v0.0.1
 * Get the latest version at https://github.com/andykog/ExportAppIcon
 */

var document = app.activeDocument;

var exportableArtboards = {};
var exportableArtboardsCount = 0;

var defaultExport = function(selectedFolder) {
  var expFolder = selectedFolder;

  for (var i = 0; i < document.artboards.length; i++) {
    if (exportableArtboards[i] !== true) continue;

    document.artboards.setActiveArtboardIndex(i);
    var artboard = document.artboards[i];

    if (exportableArtboardsCount > 1) {
      var artboardFolderName = (artboard.name.match(/[\w-]/g) || ['Artboard ' + i]).join('');
      expFolder = new Folder(selectedFolder.fsName + '/' + artboardFolderName);
      if (!expFolder.exists) expFolder.create();
    }

    var artboardWidth = artboard.artboardRect[2] - artboard.artboardRect[0]; // Don't ask me why
    var artboardHeight = artboard.artboardRect[1] - artboard.artboardRect[3];

    var fileName = this.tip.replace(/[();]/g, '').replace(/\s/g, '_') + '_' + this.name + '.png';
    var file = new File(expFolder.fsName + '/' + fileName);
    var options = new ExportOptionsPNG24();
    options.transparency = true;
    options.artBoardClipping = true;
    options.antiAliasing = true;
    options.verticalScale = this.size / artboardHeight * 100;
    options.horizontalScale = this.size / artboardWidth * 100;
    document.exportFile(file, ExportType.PNG24, options);
  };
};


var exportGroups = [
  {
    groupName: 'iPhone',
    options: [
      {
        name: '29pt @2x',
        tip: 'iPhone Spotlight iOS 5,6; Settings iOS 5–9',
        size: 58,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '29pt @3x',
        tip: 'iPhone Spotlight iOS 5,6; Settings iOS 5–9',
        size: 87,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '40pt @2x',
        tip: 'iPhone Spotlight iOS 7–9',
        size: 80,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '40pt @3x',
        tip: 'iPhone Spotlight iOS 7–9',
        size: 120,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '60pt @2x',
        tip: 'iPhone App iOS 7–9',
        size: 120,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '60pt @3x',
        tip: 'iPhone App iOS 7–9',
        size: 180,
        enabled: true,
        handleExport: defaultExport
      }
    ]
  },
  {
    groupName: 'iPad',
    options: [
      {
        name: '29pt @1x',
        tip: 'iPad Settings iOS 5–9',
        size: 29,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '29pt @2x',
        tip: 'iPad Settings iOS 5–9',
        size: 58,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '40pt @1x',
        tip: 'iPad Spotlight iOS 7–9',
        size: 40,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '40pt @2x',
        tip: 'iPad Spotlight iOS 7–9',
        size: 80,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '76pt @1x',
        tip: 'iPad App iOS 7–9',
        size: 76,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '76pt @2x',
        tip: 'iPad App iOS 7–9',
        size: 152,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '83.5pt @2x',
        tip: 'iPad Pro App iOS 7–9',
        size: 167,
        enabled: true,
        handleExport: defaultExport
      }
    ]
  },
  {
    groupName: 'Apple Watch',
    options: [
      {
        name: '24pt @2x',
        tip: 'Apple Watch Notification Center 38 mm',
        size: 48,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '27.5pt @2x',
        tip: 'Apple Watch Notification Center 42 mm',
        size: 55,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '29pt @2x',
        tip: 'Apple Watch Companion Settings',
        size: 58,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '29pt @3x',
        tip: 'Apple Watch Companion Settings',
        size: 87,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '40pt @2x',
        tip: 'Apple Watch Home Screen (All), Long Look (38 mm)',
        size: 80,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '44pt @2x',
        tip: 'Apple Watch Long Look 42 mm',
        size: 88,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '86pt @2x',
        tip: 'Apple Watch Short Look 38 mm',
        size: 172,
        enabled: true,
        handleExport: defaultExport
      },
      {
        name: '98pt @2x',
        tip: 'Apple Watch Short Look 42 mm',
        size: 176,
        enabled: true,
        handleExport: defaultExport
      }
    ]
  }
];



if (document && document.artboards.length > 0) {
  var dialog = new Window('dialog', 'Export for iOS');
  var group = dialog.add('group')
    group.alignChildren = 'top';

  if (document.artboards.length > 1) {
    var panel = group.add('panel', undefined, "Artboards");
    panel.alignChildren = 'left';
    for (var i = 0; i < document.artboards.length; i++) {
      exportableArtboards[i] = true;
      var artboard = document.artboards[i];
      var checkbox = panel.add('checkbox', undefined, '\u00A0' + artboard.name);
      checkbox.value = exportableArtboards[i];
      checkbox._i = i;
      checkbox.onClick = function() { exportableArtboards[this._i] = !exportableArtboards[this._i]; };
    }
  } else if (document.artboards.length === 1) {
    exportableArtboards[0] = true;
  }


  for (var i = 0; i < exportGroups.length; i++) {
    var array = exportGroups[i].options;
    var panel = group.add('panel', undefined, exportGroups[i].groupName);
    panel.alignChildren = 'left';
    for(var ii = 0; ii < array.length;  ii++) {
      var checkbox = panel.add('checkbox', undefined, '\u00A0' + array[ii].name);
      checkbox.value = array[ii].enabled || false;
      checkbox.helpTip = array[ii].tip
        checkbox._option = array[ii];
      checkbox.onClick = function() { this._option.enabled = !this._option.enabled; };
    }
  }

  var okButton = dialog.add('group').add('button', undefined, 'Export');
  okButton.onClick = function() {
    try {
    for (var i = 0; i < document.artboards.length; i++) {
      if (exportableArtboards[i]) exportableArtboardsCount++;
    }
    if (exportableArtboardsCount > 0) {
      var selectedFolder = Folder.selectDialog('Where to handleExport the exported files?');
      if (selectedFolder) {
          for (var i = 0; i < exportGroups.length; i++) {
            var options = exportGroups[i].options;
            for (var ii = 0; ii < options.length; ii++) {
              var option = options[ii];
              if (option.enabled) option.handleExport(selectedFolder);
            }
          }
      }
    }
    dialog.close();
    } catch (e) {
      alert(e.message)
    }
  };

  dialog.show();
}

