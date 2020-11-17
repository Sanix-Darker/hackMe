let payload = {};

var client = new ClientJS();

payload = {
    "getBrowserData": JSON.stringify(client.getBrowserData(), null, 4),
    "getFingerprint": client.getFingerprint(),
    
    "getUserAgent": client.getUserAgent(),
    "getUserAgentLowerCase": client.getUserAgentLowerCase(),
    
    "getBrowser": client.getBrowser(),
    "getBrowserVersion": client.getBrowserVersion(),
    "getBrowserMajorVersion": client.getBrowserMajorVersion(),
    "isIE": client.isIE(),
    "isChrome": client.isChrome(),
    "isFirefox": client.isFirefox(),
    "isSafari": client.isSafari(),
    "isOpera": client.isOpera(),
    
    "getEngine": client.getEngine(),
    "getEngineVersion": client.getEngineVersion(),
    
    "getOS": client.getOS(),
    "getOSVersion": client.getOSVersion(),
    "isWindows": client.isWindows(),
    "isMac": client.isMac(),
    "isLinux": client.isLinux(),
    "isUbuntu": client.isUbuntu(),
    "isSolaris": client.isSolaris(),
    
    "getDevice": client.getDevice(),
    "getDeviceType": client.getDeviceType(),
    "getDeviceVendor": client.getDeviceVendor(),
    
    "getCPU": client.getCPU(),
    
    "isMobile": client.isMobile(),
    "isMobileMajor": client.isMobileMajor(),
    "isMobileAndroid": client.isMobileAndroid(),
    "isMobileOpera": client.isMobileOpera(),
    "isMobileWindows": client.isMobileWindows(),
    "isMobileBlackBerry": client.isMobileBlackBerry(),
    
    "isMobileIOS": client.isMobileIOS(),
    "isIphone": client.isIphone(),
    "isIpad": client.isIpad(),
    "isIpod": client.isIpod(),
    
    "getScreenPrint": client.getScreenPrint(),
    "getColorDepth": client.getColorDepth(),
    "getCurrentResolution": client.getCurrentResolution(),
    "getAvailableResolution": client.getAvailableResolution(),
    "getDeviceXDPI": client.getDeviceXDPI(),
    "getDeviceYDPI": client.getDeviceYDPI(),
    
    "getPlugins": client.getPlugins(),
    "isJava": client.isJava(),
    "getJavaVersion": client.getJavaVersion(),
    "isFlash": client.isFlash(),
    "getFlashVersion": client.getFlashVersion(),
    "isSilverlight": client.isSilverlight(),
    "getSilverlightVersion": client.getSilverlightVersion(),
    
    "getMimeTypes": client.getMimeTypes(),
    "isMimeTypes": client.isMimeTypes(),
    
    "isFont": client.isFont(),
    "getFonts": client.getFonts(),
    
    "isLocalStorage": client.isLocalStorage(),
    "isSessionStorage": client.isSessionStorage(),
    "isCookie": client.isCookie(),
    
    "getTimeZone": client.getTimeZone(),
    
    "getLanguage": client.getLanguage(),
    "getSystemLanguage": client.getSystemLanguage(),
    
    "isCanvas": client.isCanvas(),
    "getCanvasPrint": client.getCanvasPrint()
}

fetch('https://ipapi.co/json/')
.then((response) => {
    return response.json();
})
.then(data1 => {

    fetch('http://ip-api.com/json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        payload = {
            ...payload,
            ...data,
            ...data1,
        }

        iHTML = "<div>";
        for(kk in payload){
            iHTML += "<b>" + kk + " :</b> " + payload[kk] + "<br><hr>"
        }
        iHTML += "</div>";
        // document.getElementById("result").innerHTML = iHTML;
        const toSend = {
            "payload": {
                "json": payload,
                "html": iHTML
            }
        }

        console.log(">> posting to the server");
        fetch('/payload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toSend)
        }).then((response) => {
            return response.json();
        }).then((content) => {;
            console.log(content);
        });
    });
});
