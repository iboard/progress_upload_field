var bytesUploaded = 0;
var bytesTotal = 0;
var previousBytesLoaded = 0;
var intervalTimer = 0;
var div_id = "";
var post_action = "";
var form_div_id = "form1";

function fileSelected(form_id,id,action) {
  var file = document.getElementById(id).files[0];
  var fileSize = 0;
  div_id = id;
  post_action = action;
  form_div_id = form_id;
  if (file.size > 1024 * 1024)
    fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
  else
    fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
  document.getElementById(div_id+'Info').style.display = 'block';
  document.getElementById(div_id+'Name').innerHTML = 'Name: ' + file.name;
  document.getElementById(div_id+'Size').innerHTML = 'Size: ' + fileSize;
  document.getElementById(div_id+'Type').innerHTML = 'Type: ' + file.type;
}

function uploadFile(formName) {
  previousBytesLoaded = 0;
  document.getElementById(div_id+'Response').style.display = 'none';
  document.getElementById(div_id+'Number').innerHTML = '';
  var progressBar = document.getElementById(div_id+'Bar');
  progressBar.style.display = 'block';
  progressBar.style.width = '0px';        
  
  var myform = document.forms[formName];
  var fd = new FormData(myform);
  
  var xhr = new XMLHttpRequest();        
  xhr.upload.addEventListener("progress", uploadProgress, false);
  xhr.addEventListener("load", uploadComplete, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);
  xhr.open("POST", post_action);
  xhr.send(fd);

  intervalTimer = setInterval(updateTransferSpeed, 500);
}

function updateTransferSpeed() {
  var currentBytes = bytesUploaded;
  var bytesDiff = currentBytes - previousBytesLoaded;
  if (bytesDiff == 0) return;
  previousBytesLoaded = currentBytes;
  bytesDiff = bytesDiff * 2;
  var bytesRemaining = bytesTotal - previousBytesLoaded;
  var secondsRemaining = bytesRemaining / bytesDiff;

  var speed = "";
  if (bytesDiff > 1024 * 1024)
    speed = (Math.round(bytesDiff * 100/(1024*1024))/100).toString() + 'MBps';
  else if (bytesDiff > 1024)
    speed =  (Math.round(bytesDiff * 100/1024)/100).toString() + 'KBps';
  else
    speed = bytesDiff.toString() + 'Bps';
  document.getElementById(div_id+'TransferSpeedInfo').innerHTML = speed;
  document.getElementById(div_id+'TimeRemainingInfo').innerHTML = ' | ' + secondsToString(secondsRemaining);        
}

function secondsToString(seconds) {        
  var h = Math.floor(seconds / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 3600 % 60);
  return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
}

function uploadProgress(evt) {
  if (evt.lengthComputable) {
    bytesUploaded = evt.loaded;
    bytesTotal = evt.total;
    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    var bytesTransfered = '';
    if (bytesUploaded > 1024*1024)
      bytesTransfered = (Math.round(bytesUploaded * 100/(1024*1024))/100).toString() + 'MB';
    else if (bytesUploaded > 1024)
      bytesTransfered = (Math.round(bytesUploaded * 100/1024)/100).toString() + 'KB';
    else
      bytesTransfered = (Math.round(bytesUploaded * 100)/100).toString() + 'Bytes';

    document.getElementById(div_id+'Number').innerHTML = percentComplete.toString() + '%';
    document.getElementById(div_id+'Bar').style.width = percentComplete.toString() + '%';
    document.getElementById(div_id+'BytesInfo').innerHTML = ' | ' + bytesTransfered;
    if (percentComplete == 100) {
      $('#'+div_id+'Info').hide();
      var uploadResponse = document.getElementById(div_id+'Response');
      uploadResponse.innerHTML = '<span style="font-size: 10pt; font-weight: bold;">Please wait...</span>';
      uploadResponse.style.display = 'block';
    }
  }
  else {
    document.getElementById(div_id+'Bar').innerHTML = 'unable to process upload';
  }  
}

function uploadComplete(evt) {
  clearInterval(intervalTimer);
  var uploadResponse = document.getElementById(div_id+'Response');
  eval(evt.target.responseText);
  uploadResponse.style.display = 'block';
}  

function uploadFailed(evt) {
  clearInterval(intervalTimer);
  alert("An error occurred while uploading the file.");  
}  

function uploadCanceled(evt) {
  clearInterval(intervalTimer);
  alert("The upload has been canceled by the user or your browser dropped the connection.");  
}  
