React tutorial
-------------------------------------------------------------
Following the official React tutorial - creating Tic-tac-toe game
-
I added a few rules to this well known game.

Rules of the Alterative Tic-tac-toe: 
- you can overwrite cells
- overwriting possible only after 2 steps of the game were completed
- you can't overwrite if the overwritten symbol makes the game over
- you can overwrite the spot that was yours, effectively just playing nothing
- you can overwrite it with a blank simbol, effectively creating a new spot (using right mouse click)
- you can use "freeze cell" button, meaning that if your opponent chooses to place their figure in that spot you just froze, he would just waste his move as his move would be denied
---------------------------------------------------------------
Try the game in this enviroment: [Link](https://codesandbox.io/p/devbox/react-dev-forked-lt5p89?file=%2Fsrc%2FApp.jsx%3A253%2C1&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clwb4mxzs0006356i7tf9qi2k%2522%252C%2522sizes%2522%253A%255B100%252C0%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clwb4mxzs0002356i3m042cfq%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clwb4mxzs0004356iltdkbguc%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clwb4mxzs0005356ilxhcplka%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B45.74723933575701%252C54.25276066424299%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clwb4mxzs0002356i3m042cfq%2522%253A%257B%2522id%2522%253A%2522clwb4mxzs0002356i3m042cfq%2522%252C%2522activeTabId%2522%253A%2522clwb4qwyh00vb356ixlaafdse%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clwb4mxzr0001356ilmtwyswr%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fpackage.json%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252FApp.jsx%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A253%252C%2522startColumn%2522%253A1%252C%2522endLineNumber%2522%253A253%252C%2522endColumn%2522%253A1%257D%255D%252C%2522id%2522%253A%2522clwb4qwyh00vb356ixlaafdse%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%257D%252C%2522clwb4mxzs0005356ilxhcplka%2522%253A%257B%2522id%2522%253A%2522clwb4mxzs0005356ilxhcplka%2522%252C%2522activeTabId%2522%253A%2522clwg3121m0097356ihgqalnqg%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522port%2522%253A5173%252C%2522taskId%2522%253A%2522Development%2522%252C%2522id%2522%253A%2522clwg3121m0097356ihgqalnqg%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%252C%2522clwb4mxzs0004356iltdkbguc%2522%253A%257B%2522id%2522%253A%2522clwb4mxzs0004356iltdkbguc%2522%252C%2522activeTabId%2522%253A%2522clwg30hdn004e356isjl9n54w%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clwb4mxzs0003356iv0t3a9d0%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clwb4mylg000odjf8c0nfezvy%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522Development%2522%252C%2522id%2522%253A%2522clwg30hdn004e356isjl9n54w%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Afalse%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A17.252604166666657%257D)

TODO: Adding another rule: overwriting can be done a certain amount of times for a player
