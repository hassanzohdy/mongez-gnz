export function welcome() {
  console.log(
    // cyan color
    "\x1b[36m%s\x1b[0m",
    `
                          .----------------.  .-----------------. .----------------. 
                          | .--------------. || .--------------. || .--------------. |
                          | |    ______    | || | ____  _____  | || |   ________   | |
                          | |  .' ___  |   | || ||_   |_   _|  | || |  |  __   _|  | |
                          | | / .'   _|    | || |  |    | |    | || |  |_/  / /    | |
                          | | | |    ____  | || |  | |  | |    | || |     .'.' _   | |
                          | |  \`.___]  _|  | || | _| |_   |_   | || |   _/ /__/ |  | |
                          | |  \`._____.'   | || ||_____|____|  | || |  |________|  | |
                          | |              | || |              | || |              | |
                          | '--------------' || '--------------' || '--------------' |
                          '----------------'  '----------------'  '----------------'  
  `,
    // write down `GENERATOR` in new line with color green
  );

  console.log(
    // green color
    "\x1b[32m%s\x1b[0m",
    ` 
        .d8888b.  8888888888 888b    888 8888888888 8888888b.         d8888 88888888888 .d88888b.  8888888b.  
        d88P  Y88b 888        8888b   888 888        888   Y88b       d88888     888    d88P" "Y88b 888   Y88b 
        888    888 888        88888b  888 888        888    888      d88P888     888    888     888 888    888 
        888        8888888    888Y88b 888 8888888    888   d88P     d88P 888     888    888     888 888   d88P 
        888  88888 888        888 Y88b888 888        8888888P"     d88P  888     888    888     888 8888888P"  
        888    888 888        888  Y88888 888        888 T88b     d88P   888     888    888     888 888 T88b   
        Y88b  d88P 888        888   Y8888 888        888  T88b   d8888888888     888    Y88b. .d88P 888  T88b  
        "Y8888P88 8888888888 888    Y888 8888888888 888   T88b d88P     888     888     "Y88888P"  888   T88b
        
        `,
  );
}
