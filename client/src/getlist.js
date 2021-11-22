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

function getListUID(uid) {
    let params = "?uid=" + uid
    let url = "http://127.0.0.1:5005/list" + params
    fetch(url)
    .then(d => d.json())
    .then(d => {
        list = [d]; 
        let person = list[0]
        if (person['astro'] == 'gemini') {
            console.log("HI");
            person['astropic'] = geminiLink;
        }
        if (person['astro'] == 'virgo') {
            person['astropic'] = virgoLink;
        } 
        
        return list;
    })
}

module.exports = getlist;
module.exports = getListUID;