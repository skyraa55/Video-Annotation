export default function escapeText(text) {
    return (
        text.replace(/'/g,"\\'").
        replace(/:/g,"//:")
        .replace(/%/g,"//%")
        .replace(/,/g,"//,")
        .replace(/\n/g,"//\n")

    );
}