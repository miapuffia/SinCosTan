//PLEASE NOTE!!!
//Sin and cos are swapped throughout the program by accident.
//Text is accurate but variable names are not.

function degToRad(deg) {
	return deg * (Math.PI / 180);
}

function init() {
	//FPS counter
	filterStrength = 20;
	frameTime = 0;
	lastLoop = new Date;
	thisLoop = new Date;
	
	//Constants
	canvas = document.getElementById('canvas');
	width = canvas.getAttribute("width");
	height = canvas.getAttribute("height");
	ctx = canvas.getContext('2d');
	speedInput = document.getElementById('speedInput');
	
	//Mutables
	circlePointAngle = 0;
	sinImage = null;
	cosImage = null;
	tanImage = null;
	
	//Transitives
	previousTanY = height / 2;
	verticalPurpleLineCounter = height / 12;
	
	window.requestAnimationFrame(draw);
}

function draw() {
	ctx.clearRect(0, 0, 800, 400); // clear canvas
	
	ctx.fillStyle = 'black';
	
	//Draw background lines
	ctx.strokeStyle = 'grey';
	ctx.lineWidth = 2.0;
	
	//Grey lines
	
	//Horizontal line 1
	ctx.beginPath();
	ctx.moveTo(0, height / 3);
	ctx.lineTo((width / 2) + ((height / 2) - (height / 3)), height / 3);
	ctx.stroke();
	
	//Horizontal line 2
	ctx.beginPath();
	ctx.moveTo(0, 2 * (height / 3));
	ctx.lineTo((width / 2) + ((height / 2) - (height / 3)), 2 * (height / 3));
	ctx.stroke();
	
	//Vertical line 1
	var verticalLine1X = (width / 2) - ((height / 2) - (height / 3));
	
	ctx.beginPath();
	ctx.moveTo(verticalLine1X, 0);
	ctx.lineTo((width / 2) - ((height / 2) - (height / 3)), height);
	ctx.stroke();
	
	//Vertical line 2
	var verticalLine2X = (width / 2) + ((height / 2) - (height / 3));
	
	ctx.beginPath();
	ctx.moveTo(verticalLine2X, 0);
	ctx.lineTo((width / 2) + ((height / 2) - (height / 3)), height);
	ctx.stroke();
	
	//Horizontal red lines
	
	ctx.strokeStyle = 'rgba(255, 0, 0, 0.33)';
	ctx.lineWidth = 1.0;
	
	for(var i = 1; i < 4; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i * (height / 12));
		ctx.lineTo((width / 2) - ((height / 2) - (height / 3)), i * (height / 12));
		ctx.stroke();
	}
	
	//Horizontal blue lines
	
	ctx.strokeStyle = 'rgba(0, 0, 255, 0.33)';
	
	for(var i = 5; i < 8; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i * (height / 12));
		ctx.lineTo((width / 2) + ((height / 2) - (height / 3)), i * (height / 12));
		ctx.stroke();
	}
	
	//Vertical red lines
	
	ctx.strokeStyle = 'rgba(255, 0, 0, 0.33)';
	
	for(var i = 11; i < 14; i++) {
		ctx.beginPath();
		ctx.moveTo(i * (height / 12), height / 3);
		ctx.lineTo(i * (height / 12), 2 * (height / 3));
		ctx.stroke();
	}
	
	//Red stationary arcs
	
	//Arc 1
	ctx.beginPath();
	ctx.moveTo(verticalLine1X, height / 12);
	ctx.arcTo(
		13 * (height / 12),
		height / 12,
		13 * (height / 12),
		height / 3,
		3 * (height / 12)
	);
	ctx.stroke();
	
	//Arc 1
	ctx.beginPath();
	ctx.moveTo(verticalLine1X, 2 * (height / 12));
	ctx.arcTo(
		12 * (height / 12),
		2 * (height / 12),
		12 * (height / 12),
		height / 3,
		2 * (height / 12)
	);
	ctx.stroke();
	
	//Arc 3
	ctx.beginPath();
	ctx.moveTo(verticalLine1X, 3 * (height / 12));
	ctx.arcTo(
		11 * (height / 12),
		3 * (height / 12),
		11 * (height / 12),
		height / 3,
		height / 12
	);
	ctx.stroke();
	
	//Horizontal purple lines
	
	ctx.strokeStyle = 'rgba(128, 0, 128, 0.33)';
	ctx.lineWidth = 1.0;
	
	for(var i = 1; i < 12; i++) {
		ctx.beginPath();
		ctx.moveTo(verticalLine2X, i * (height / 12));
		ctx.lineTo(width, i * (height / 12));
		ctx.stroke();
	}
	
	ctx.strokeStyle = 'black';
	
	//Center circle
	var circleRadius = height / 12;
	
	ctx.beginPath();
	ctx.arc(width / 2, height / 2, circleRadius, 0, 2 * Math.PI);
	ctx.stroke();
	
	//Center grey moving arc
	ctx.fillStyle = 'grey';
	
	ctx.beginPath();
	ctx.arc(width / 2, height / 2, circleRadius / 2, 0, degToRad(circlePointAngle) % (2 * Math.PI));
	ctx.lineTo(width / 2, height / 2);
	ctx.closePath();
	ctx.fill();
	
	//Top grey moving arc
	ctx.beginPath();
	ctx.arc(440, 20, circleRadius / 2, 0, degToRad(circlePointAngle) % (2 * Math.PI));
	ctx.lineTo(440, 20);
	ctx.closePath();
	ctx.fill();
	
	ctx.fillStyle = 'black';
	
	//Top grey moving arc stroke circle
	ctx.beginPath();
	ctx.arc(440, 20, circleRadius / 2, 0, 2 * Math.PI);
	ctx.stroke();
	
	//Top grey moving arc dot
	ctx.beginPath();
	ctx.arc(440, 20, 3, 0, 2 * Math.PI);
	ctx.fill();
	
	//Top grey moving arc text
	ctx.font = "22px Verdana ";
	ctx.fillText("\u{03B8} = ", 375, 27);
	
	//Center dot
	ctx.beginPath();
	ctx.arc(width / 2, height / 2, 4, 0, 2 * Math.PI);
	ctx.fill();
	
	//Circle dot filled variables
	var circleDotX = (width / 2) + (circleRadius * Math.cos(degToRad(circlePointAngle)));
	var circleDotY = (height / 2) + (circleRadius * Math.sin(degToRad(circlePointAngle)));
	
	//Circle dot lines
	
	ctx.setLineDash([6, 5]);
	
	//Vertical dashed line
	ctx.strokeStyle = 'red';
	
	ctx.beginPath();
	ctx.moveTo(circleDotX, height / 3);
	ctx.lineTo(circleDotX, circleDotY);
	ctx.stroke();
	
	//Red horizontal dot
	ctx.fillStyle = 'red';
	
	ctx.beginPath();
	ctx.arc(circleDotX, height / 3, 4, 0, 2 * Math.PI);
	ctx.fill();
	
	//Red moving arc variables
	var movingArcStartY = (2 * (height / 12)) - (circleRadius * Math.cos(degToRad(circlePointAngle)));
	
	//Red vertical dot
	ctx.beginPath();
	ctx.arc(verticalLine1X, movingArcStartY, 4, 0, 2 * Math.PI);
	ctx.fill();
	
	ctx.fillStyle = 'black';
	
	//Horizontal dashed line
	ctx.strokeStyle = 'blue';
	
	ctx.beginPath();
	ctx.moveTo((width / 2) - ((height / 2) - (height / 3)), circleDotY);
	ctx.lineTo(circleDotX, circleDotY);
	ctx.stroke();
	
	//Blue vertical dot
	ctx.fillStyle = 'blue';
	
	ctx.beginPath();
	ctx.arc(verticalLine1X, circleDotY, 4, 0, 2 * Math.PI);
	ctx.fill();
	
	ctx.fillStyle = 'black';
	
	//Tan line
	ctx.setLineDash([]);
	
	ctx.strokeStyle = 'purple';
	
	var startX = (width / 2) + (1000 * Math.cos(degToRad(circlePointAngle)));
	var startY = (height / 2) + (1000 * Math.sin(degToRad(circlePointAngle)));
	var endX = (width / 2) - (1000 * Math.cos(degToRad(circlePointAngle)));
	var endY = (height / 2) - (1000 * Math.sin(degToRad(circlePointAngle)));
	
	var slope = (endY - startY) / (endX - startX);
	var b = startY - (slope * startX);
	
	if(startX < verticalLine1X) {
		startX = verticalLine1X;
		startY = (slope * startX) + b;
	} else if(endX < verticalLine1X) {
		endX = verticalLine1X;
		endY = (slope * endX) + b;
	}
	
	if(startX > verticalLine2X) {
		startX = verticalLine2X;
		startY = (slope * startX) + b;
	} else if(endX > verticalLine2X) {
		endX = verticalLine2X;
		endY = (slope * endX) + b;
	}
	
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
	
	//Circle dot filled
	ctx.beginPath();
	ctx.arc(circleDotX, circleDotY, 4, 0, 2 * Math.PI);
	ctx.fill();
	
	//Circle dot stroke
	ctx.fillStyle = 'white';
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	ctx.arc((width / 2) - (circleRadius * Math.cos(degToRad(circlePointAngle))), (height / 2) - (circleRadius * Math.sin(degToRad(circlePointAngle))), 4, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
	
	//Red moving arc
	ctx.setLineDash([6, 5]);
	
	ctx.strokeStyle = 'red';
	
	ctx.beginPath();
	ctx.moveTo(verticalLine1X, movingArcStartY);
	ctx.arcTo(
		circleDotX,
		movingArcStartY,
		circleDotX,
		height / 3,
		circleDotX - verticalLine1X
	);
	ctx.stroke();
	
	ctx.setLineDash([]);
	
	//Sin curve
	if(sinImage !== null) {
		ctx.putImageData(sinImage, -1, 0);
	}
	
	ctx.fillStyle = 'red';
	
	ctx.fillRect(verticalLine1X - 5, movingArcStartY - 1, 2, 2);
	
	sinImage = ctx.getImageData(0, 0, verticalLine1X - 4, height / 3);
	
	//Sin text
	ctx.fillText("cos", 5, 22);
	
	ctx.fillStyle = 'black';
	
	ctx.fillText("(\u{03B8})", 50, 22);
	
	//Cos curve
	if(cosImage !== null) {
		ctx.putImageData(cosImage, -1, (height / 3) + 1);
	}
	
	ctx.fillStyle = 'blue';
	
	ctx.fillRect(verticalLine1X - 5, circleDotY - 1, 2, 2);
	
	cosImage = ctx.getImageData(0, (height / 3) + 1, verticalLine1X - 4, 2 * (height / 3));
	
	//Cos text
	ctx.fillText("sin", 5, (height / 3) + 23);
	
	ctx.fillStyle = 'black';
	
	ctx.fillText("(\u{03B8})", 50, (height / 3) + 23);
	
	//Tan curve
	ctx.fillStyle = 'purple';
	
	if(tanImage !== null) {
		ctx.putImageData(tanImage, verticalLine2X + 5, 0);
	}
	
	ctx.strokeStyle = 'purple';
	ctx.lineWidth = 3.0;
	
	if(startX < endX) {
		ctx.beginPath();
		ctx.moveTo(verticalLine2X + 4, previousTanY);
		
		ctx.lineTo(verticalLine2X + 4, endY - 1);
		
		if(endY >= previousTanY) {
			ctx.stroke();
			
			//Purple vertical dot
			ctx.beginPath();
			ctx.arc(verticalLine2X, endY, 4, 0, 2 * Math.PI);
			ctx.fill();
		}
		
		previousTanY = endY - 1;
	} else if(endX < startX) {
		ctx.beginPath();
		ctx.moveTo(verticalLine2X + 4, previousTanY);
		
		ctx.lineTo(verticalLine2X + 4, startY - 1);
		
		if(startY >= previousTanY) {
			ctx.stroke();
			
			//Purple vertical dot
			ctx.beginPath();
			ctx.arc(verticalLine2X, startY, 4, 0, 2 * Math.PI);
			ctx.fill();
		}
		
		previousTanY = startY - 1;
	}
	
	ctx.fillStyle = 'black';
	
	//Vertical purple lines
	ctx.strokeStyle = 'rgba(128, 0, 128, 0.33)';
	
	if(verticalPurpleLineCounter >= height / 12) {
		ctx.lineWidth = 1.0;
		
		ctx.beginPath();
		ctx.moveTo(verticalLine2X + 4, 0);
		ctx.lineTo(verticalLine2X + 4, height);
		ctx.stroke();
		
		verticalPurpleLineCounter = 0;
	}
	
	verticalPurpleLineCounter++;
	
	tanImage = ctx.getImageData(verticalLine2X + 4, 0, width, height);
	
	//Tan text
	ctx.clearRect(705, 0, 800, 30);
	
	ctx.fillStyle = 'purple';
	
	ctx.fillText("-tan", 708, 22);
	
	ctx.fillStyle = 'black';
	
	ctx.fillText("(\u{03B8})", 762, 22);
	
	//Created by text
	ctx.fillText("Created by Robert D. Rioja", 5, height - 10);
	
	//Control animation speed as a function of FPS and speed input
	circlePointAngle += (frameTime / Math.abs(speedInput.value));
	
	//FPS
	var thisFrameTime = (thisLoop = new Date) - lastLoop;
	frameTime += (thisFrameTime - frameTime) / filterStrength;
	lastLoop = thisLoop;
	
	window.requestAnimationFrame(draw);
}

window.onload = function(e){
	init();
	
	setInterval(function(){
		document.getElementById("fps").innerText = (1000 / frameTime).toFixed(2);
	}, 100);
}