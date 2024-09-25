const shortcuts = [
    {
        command: ["Control", "r"],
        description: "Change text color to red",
        action: () => {
            document.body.style.color = 'red';
        }
    },
    {
        command: ["Control", "f"],
        action: () => {
            document.querySelector("input").focus();
        }
    },
    {
        command: ["Control", "shift", "n"],
        description: "Open a new incognito window",
        action: () => {
            // Note: This action is browser-specific and might not work due to security policies
            window.open('', '_blank', 'noopener,noreferrer');
        }
    },
    {
        command: ["Control", "shift", "c"],
        description: "Open the browser's developer tools",
        action: () => {
            // Note: This action is typically browser-specific and not achievable via script
            console.log('Open the browser\'s developer tools manually.');
        }
    },
    {
        command: ["Control", "d"],
        description: "Bookmark the current page",
        action: () => {
            // Note: This action is browser-specific and may not be achievable via script
                customAlert('Bookmark the current page');
        }
    },
    {
        command: ["z"],
        description: "set video speed to 2.2x",
        action: function ()  {
            document.getElementsByTagName('video')[0].playbackRate = 2.2;
        }
    },
    {
        command: ["Control", "a"],
        description: "set video speed to .5x",
        action: function () {
            document.getElementsByTagName('video')[0].playbackRate = .5;
        }
    },
    {
        command: ["Alt", "ArrowLeft"],
        description: "decrease video speed by .2x",
        action: function () {
            document.getElementsByTagName('video')[0].playbackRate -= .2;
        }
    },
    {
        command: ["Alt", "ArrowRight"],
        description: "increase video speed by .2x",
        action: function () {
            document.getElementsByTagName('video')[0].playbackRate += .2;
        }
    },
    

];


const allKeysUsedInShortcuts = new Set();
shortcuts.forEach(shortcut => {
    shortcut.command.forEach(key => {
        allKeysUsedInShortcuts.add(key);
    })
})


const currentLyHeldKeys = new Set();



function executeShortcuts() {
    shortcuts.forEach(shortcut => {
        if (shortcut.command.every(key => currentLyHeldKeys.has(key))) {
            if (shortcut.confirm) {
                if (!confirm(shortcut.confirm)) {
                    return;
                }
            }
            shortcut.action();
        }
    })
}










window.addEventListener("keydown", (e) => { 
    currentLyHeldKeys.add(e.key);
    if (allKeysUsedInShortcuts.has(e.key)) {
        executeShortcuts();
    }
})


window.addEventListener("keyup", (e) => { 
    currentLyHeldKeys.delete(e.key);
})





alert_box_style = /*html*/`
alert-box{
    padding: 10px;
    border-radius: 5px;
    background-color: red;
    color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
`

document.head.insertAdjacentHTML('beforeend', alert_box_style);


function customAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.setAttribute('id', 'alert-box');
    alertBox.textContent = `${message}`;
    document.body.appendChild(alertBox);
}

