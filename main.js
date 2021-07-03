//setting the properties of the webcam on the screen
Webcam.set({
    width : 350,
    height  : 300, 
    image_format : 'png',
    png_quality : 90
});
//variable that stores camera element
camera = document.getElementById("camera");
//attaching the camera to the webcam
Webcam.attach( camera );
//taking snapshot 
function take_snapshot()
{
    //calling function taking snap on the webcam
    //setting the url of the image on a variable data_uri
    Webcam.snap(function(data_uri) {
        //placing the photo taken on the screen
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}
//checking to see if the ml5 library is working by using command, ml5.version
console.log('ml5 version:', ml5.version);
//storing the model into a variable
//calling function imageClassifier, input is the link to the model and the model.json at the end is taking the data from the model
//output is the function modelLoaded
classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/6C-X2D1Xi/model.json', modelLoaded);
//this is the function modelLoaded where it checks to see if the model is working
function modelLoaded() {
    console.log('Model Loaded')
}
//this is the function called when the button, identify, is pressed
function check()
{
    //storing the image in the variable, img
    img = document.getElementById('captured_image');
    //classify is a function inside the image classifier used to run the trained model
    //we are passing img and calling gotResult function
    classifier.classify(img, gotResult);
}
//called inside the check function
function gotResult(error, results)
{
    //if there is an error it will display that there is an error in the console
    if (error) {
        console.error(error);
    }
    //if there is no error it will show the results in the console
    else {
        console.log(results);
        //the object that the results are most confident about will show the name on a span beside Object:
        document.getElementById("result_object_name").innerHTML = results[0].label;
        //the object that the results are most confident about will take the accuracy but then remove all the decimal places except for 3 to show the accuracy
        //it will then display the accuracy on a span beside Accuracy:
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}