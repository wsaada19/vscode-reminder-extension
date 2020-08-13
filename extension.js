const vscode = require('vscode');

let message = "Spend some time outside you fool!";
let savesToShowMessage = 3;
let savesCounter = 0;



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "save-reminder" is now active!');

	if(context.globalState.get('message')){
		message = context.globalState.get('message');
	} else {
		context.globalState.update('message', message);
	}

	if(context.globalState.get('savesToShowMessage')){
		savesToShowMessage = context.globalState.get('savesToShowMessage');
	} else {
		context.globalState.update('savesToShowMessage', savesToShowMessage);
	}

	context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(() => {
		savesCounter++;
		if(savesCounter >= savesToShowMessage){
			vscode.window.showInformationMessage(message);
			savesCounter = 0;
		}
	}));
	
	context.subscriptions.push(vscode.commands.registerCommand('save-reminder.setMessage', async function () {
		const input = await vscode.window.showInputBox();
		message = input;
		context.globalState.update('message', input)
		vscode.window.showInformationMessage(`The message has been change to ${input}`);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('save-reminder.setSavesToShowMessage', async function () {
		const input = await vscode.window.showInputBox();
		savesToShowMessage = input;
		context.globalState.update('savesToShowMessage', input);
		vscode.window.showInformationMessage(`The number of saves to display a message has been changed to ${input}`);
	}));

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
