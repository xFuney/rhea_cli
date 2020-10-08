'use strict'

// Rhea command line
// Funey 2020

const socket = require('socket.io-client')('http://localhost:63228');

const readline = require('readline');




function getInput() {
    
    let temp_rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    temp_rl.question('Rhea > ', cmd => {
        let tmp = cmd.split(' ');

        if (tmp[0] == "exit") {
            socket.emit('goodbye')
            process.exit();
        }

        socket.emit('command', {
            cmd: tmp[0],
            args: tmp.splice(1)
        })

        temp_rl.close();
    });

}

socket.on('connect_OK', (botinfo) => {
    // Connected!
    console.log("Rhea CLI on Bot " + botinfo.clientTag)
    console.log(`Running Rhea Version ` + botinfo.version);
    
    getInput()
})

socket.on('command_output', (data) => {
    console.log(data);
});

socket.on('command_error', (data) => {
    console.error(data);
});

socket.on('command_done', () => {
    getInput();
})

socket.on('goodbye', () => {
    console.log("Connection terminated - Rhea is going away.");
    socket.disconnect(); 
    process.exit(0);
})
