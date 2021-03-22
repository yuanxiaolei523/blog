async function getPerson() {
    let name = await getNamePromise();
    console.log(1);
    console.log(name);
}


function getNamePromise () {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(0);
            reject({name: 'li'}) 
        }, 1000);
    })
    
}

function getName () {
    setTimeout(() => {
        console.log(0);
    }, 1000)
    return 10;
}

getPerson().then((res) => {console.log(res);}, (rej) => {console.log(rej);})