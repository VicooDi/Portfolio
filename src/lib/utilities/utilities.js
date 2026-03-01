import console from "node:console";

/** function to genrate a random color hex code */
export function generate_random_color () {
    const hex = "0123456879ABCDEFG";
    let color = "";
    for (let i = 0; i < 6; i++) {
        color += hex.charAt(Math.random() * hex.length - 1);
    }
    return '#' + color;
}