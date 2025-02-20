import readline from 'readline';

// Create a readline interface for user input
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false // Disables the terminal's automatic echo
});

function askForConfirmation(question) {
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
		});
	});
}

// Function to properly close readline
function closeReadLine() {
	if (!rl.closed) {
		rl.close();
	}
}

export { rl, closeReadLine, askForConfirmation };
