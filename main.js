song = ""
object = [] 
status = ""

function preload() {
    img = loadSound("alert.mp3")
}

function setup() {
    canvas = createCanvas(380, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting objects"
}
function modelLoaded() {
    console.log("Model Loaded!")
    status = true
    
}

function gotResults(error , results) {
    if (error) {
        console.error(error)
    } 
    console.log(results)
    object = results
}

function draw() {
    image(video, 0, 0, 380, 380)
    
    if (status |= "") {
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(img,gotResults)
        for (i = 0; i < object.length ; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected"
            fill(r,g,b)
            percent = floor(object[i].confidence * 100)
            text(object[i].label +" "+ percent+ "%",object[i].x + 15,object[i].y + 15)
            noFill()
            stroke(r,g,b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
            if (object[i].label == "person") {
                document.getElementById("Number_of_objects").innerHTML = "Baby Found"
                song.stop()
            } else {
                document.getElementById("Number_of_objects").innerHTML = "Baby Not Found"
                song.play()
            }
        }
        if(object.length == 0) {
            document.getElementById("Number_of_objects").innerHTML = "Baby Not Found"
            song.play()
        }
    }
}