let value = document.getElementById('searchTextField').value;

const outputs = ['.com', '.fm', '.info', '.shop', '.ir', '.io', '.net'];
const inputs = ['https://', 'http://', 'file://']

document.getElementById("searchTextField").addEventListener("keypress", myFunction);

function myFunction(e) {
    value = document.getElementById('searchTextField').value;
    for (let i = 0; i < outputs.length; i++) {
        if (value.endsWith(outputs[i])) {
            if (value.split(".").length - 1 > 1) {
                window.open(`https://${value}`, "_self");
            }else {
                window.open(`https://www.${value}`, "_self");
            }
        }

        if (value.startsWith(inputs[i])) {
            window.open(`${value}`, "_self");
        }
    }
}