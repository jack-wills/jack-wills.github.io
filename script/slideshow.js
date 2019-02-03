// JavaScript Document

var slideIndex = 0;
var images = ["mountains", "goldengate", "ferriswheel", "lake"];
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}


function showSlides(n) {
	if (slideIndex >= images.length) {
		slideIndex = 0;
	}
	if (slideIndex < 0) {
		slideIndex = images.length-1;
	}
	document.getElementById("welSlide").style.backgroundImage = "-webkit-linear-gradient(90deg,rgba(23, 23, 23, 0.53),rgba(240, 240, 240, 0.2)), url(images/" + images[slideIndex] + ".jpg)";
}
