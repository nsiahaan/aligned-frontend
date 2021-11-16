import fetch from "node-fetch";

function getlist() {
    fetch("http://127.0.0.1:5005/list")
    .then(d => d.json())
    .then(d => {
        list = d; 
        list = list.slice(0, 7);
        for (let person in list) {
            if (person['astro'] == 'gemini') {
                console.log("HI");
                person['astropic'] = geminiLink;
            }
            if (person['astro'] == 'virgo') {
                person['astropic'] = virgoLink;
            } 
        }
        return list;
    })
    .then(d=>console.log(d))
}

module.exports = getlist;