var ATN = (function() {
	
	//two urls per library: [local, CDN]
	var libraryUrls = {
		d3:["vendor/d3.v3.js","http://d3js.org/d3.v3.min.js"],
		jquery:["vendor/jquery",""],
		ng: ["vendor/???","https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"]
	}
	
	var isDev = (function () {
		var loc = window.location;
		if(loc.protocol==="file:") return true;
		if(loc.hostname==="localhost") return true;
		return false; //assume we are live
	}());


    function addScriptTag(src, onload) {
        var script = document.createElement("script");
        script.src = src;
        document.head.appendChild(script);
        script.onload = onload;        
    }
    
    function load(name, callback) {
		function getUrl(name) {
			var ua = libraryUrls[name];
			if(ua) {
				return (isDev) ? ua[0] : ua[1];
			} //else
			throw new Error("URL not found for library: "+name);
		}

        if(window[name]) {//already loaded
			callback(window[name]);
        } else {//load em first
			var src = getUrl(name);
            addScriptTag(src, function() { //assume name is valid...no checks!
                callback(window[name]);
            });
        }
    }
	
	
	return {};
}());
