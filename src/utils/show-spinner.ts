export function showSpinner(initialMessage: string) {
  const spinner = ["-", "\\", "|", "/"];
  let i = 0;

  const intervalId = setInterval(() => {
    process.stdout.write(`\r${spinner[i]} ${initialMessage}`); // Write initial message and spinner character
    i = (i + 1) % spinner.length;
  }, 100);

  const setMessage = (newMessage: string) => {
    initialMessage = newMessage; // Update initial message
  };

  const stop = (message?: string) => {
    clearInterval(intervalId);
    process.stdout.write(`\r${" ".repeat(initialMessage.length + 2)}`); // Clear line

    if (message) {
      process.stdout.write(`\r${message}\n`); // Print message
    } else {
      process.stdout.write(`\r${initialMessage}\n`); // Print initial message if no message provided
    }
  };

  return { update: setMessage, stop };
}
