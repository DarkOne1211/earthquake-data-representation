
var mapimg;
var earthquake;
// 31.2304° N, 121.4737° E - Shanghai
var zoom = 1;
var height = 512;
var width = 1024;

function preload(){
  // Preload image
  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoiZGFya29uZTEyMTEiLCJhIjoiY2plMGg3NmdhNXhpbTJ4cWhwemJjejNobSJ9.zisRyUmWtcNIammbTRjfng");
  earthquake = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv")
}

function converttoX(longitude){
  longitude = radians(longitude);
  return ((256 / PI) * pow(2,zoom) * (longitude + PI));
}

function converttoY(latitude){
  latitude = radians(latitude);
  return ((256 / PI) * pow(2,zoom) * (PI - (log(tan((PI / 4) + (latitude / 2))))));
}

function setup() {
  // put setup code here
  createCanvas(1024,512);
  image(mapimg,0,0);
  for (var i = 0; i < earthquake.length; i++){
    var data = earthquake[i].split(',');
    var dataLat = data[1];
    var dataLon = data[2];
    var dataMag = data[4];
    x = converttoX(dataLat);
    y = converttoY(dataLon) - 256;
    var mag = pow(10, dataMag / 2);
    var magmax = sqrt(pow(10,10));
    var d = map(mag,0,magmax,0,2000);
    fill(245,143,100);
    ellipse(x,y,d,d);
  }
  
}

function draw() {
  // put drawing code here
}