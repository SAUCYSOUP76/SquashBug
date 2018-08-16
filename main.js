const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

//SET ICON

//SET ENV
process.env.NODE_ENV = '';

let mainWindow;

//Listen for app to be ready
app.on('ready', function(){
//Create new window
mainWindow = new BrowserWindow({icon: path.join(__dirname, 'assets/icons/icon.png')});
//Load html into window
mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
}));
//Quit app when closed
mainWindow.on('closed', function(){
    app.quit();
});

// Build menu from temmmlate
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
// Insert menu
Menu.setApplicationMenu(mainMenu); 
});

//create menu template
const mainMenuTemplate = [

{
    label:'File',
    submenu:[
        {
        label: 'Exit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
            app.quit();
        }
        }
    ]
}
];

//If mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}