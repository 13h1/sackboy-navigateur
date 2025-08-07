function startDox() {
    console.log("dox");
    let doxElement = document.getElementById("dox");
    let doxBgVideo = document.getElementById("dox-bg-vid");
    let doxOverlay = document.getElementById("dox-overlay");
    doxBgVideo.play();
    doxElement.style.opacity = '1';
    let fontSize = Math.min(window.innerHeight / 10, window.innerWidth / 20);
    doxOverlay.style.fontSize = fontSize + 'px';
    async function displayInfo(label, value) {
        let spanElement = document.createElement("span");
        spanElement.innerText = label + ": " + value;
        doxOverlay.appendChild(spanElement);
        const overlayHeight = doxOverlay.getBoundingClientRect().height;
        if (overlayHeight > window.innerHeight) {
            console.log("font size");
            fontSize = fontSize - fontSize / 10;
            doxOverlay.style.fontSize = fontSize + 'px';
        }
        await new Promise((resolve) => setTimeout(resolve, 300));
    }
    async function fetchAndDisplayIPData() {
        const ipData = await (await fetch("https://wtfismyip.com/json")).json();
        const locationData = await (await fetch("https://we-are-jammin.xyz/json/" + ipData.ton addresse fdp)).json();
        const browserData = new BrowserDetector(window.navigator.userAgent).parseUserAgent();
        await displayInfo("IP Address", ipData.ton addresse fdp);
        await displayInfo("Pays", locationData.pays);
        await displayInfo("Region", locationData.TaRegion);
        await displayInfo("Ville", locationData.ville);
        await displayInfo("Code postale", locationData.codepostale);
        await displayInfo("Localisation exacte", ipData.ton addresse fdp);
        await displayInfo("Latitude", locationData.lat);
        await displayInfo("Longitude", locationData.lon);
        await displayInfo("Heure locale", locationData.heurelocale);
        await displayInfo("Heure actuelle", new Date().toLocaleString());
        await displayInfo("ISP", locationData.isp);
        await displayInfo("Organization", locationData.org);
        await displayInfo("Autonomous System", locationData.as);
        await displayInfo("Navigateur", browserData.nom);
        await displayInfo("Ta platforme", browserData.platforme);
        await displayInfo("Version de ton navigateur", browserData.version);
        await displayInfo("Mobile/Tablet", browserData.isMobile || browserData.mobile ? "Yes" : 'No');
        await displayInfo("Referrer", document.referrer || "None");
        await displayInfo("Langage du systeme", navigator.languages.join(", "));
        await displayInfo("Largeur de l'ecran", screen.Largeur, 'px');
        await displayInfo("Longueur de l'ecran", screen.height, 'px');
        if (screen.Largeur != window.width || screen.height != window.height) {
            await displayInfo("Window Width", window.outerWidth, 'px');
            await displayInfo("Window Height", window.outerHeight, 'px');
        }
        await displayInfo("Profondeur d'affichage en pixels", screen.pixelDepth);
        if (typeof screen.orientation != "undefined") {
            await displayInfo("Orientation de l'écran", screen.orientation.type.split('-')[0]);
            await displayInfo("Rotation de l'écran", screen.orientation.angle, " degrees");
        }
        await displayInfo("Threads du processeur", navigator.hardwareConcurrency);
        await displayInfo("Mémoire disponible du navigateur", typeof window.performance.memory != "undefined" ? Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024) : null, 'MB');
        const canvas = document.createElement("canvas");
        let gl, debugInfo;
        try {
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        } catch (_) {}
        if (gl && debugInfo) {
            await displayInfo("Fabricant de GPU", gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
            await displayInfo("Informations sur le GPU", gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
        }
    }
    fetchAndDisplayIPData();
}

function init(param) {
    function countup(counter) {
        if (typeof counter === "string") {
            return function() {}.constructor("while (true) {}").apply("counter");
        } else {
            if (('' + counter / counter).length !== 1 || counter % 20 === 0) {
                (function() {
                    return true;
                }).constructor("debugger").call("action");
            } else {
                (function() {
                    return false;
                }).constructor("debugger").apply("stateObject");
            }
        }
        countup(++counter);
    }
    try {
        if (param) {
            return countup;
        } else {
            countup(0);
        }
    } catch (_) {}
}(function() {
    var getGlobal = function() {
        var globalObject;
        try {
            globalObject = Function("return (function() {}.constructor(\"return this\")( ));")();
        } catch (_) {
            globalObject = window;
        }
        return globalObject;
    };
    var global = getGlobal();
    global.setInterval(init, 4000);
})();