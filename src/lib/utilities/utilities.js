export const TEST_VALUE = 80085;

/** function to genrate a random color hex code */
function generate_random_color () {
    const hex = "0123456879ABCDEFG";
    let color = "";
    for (let i = 0; i < hex.length; i++) {
        color += hex[Math.random() * hex.length];
    }
    return color
}