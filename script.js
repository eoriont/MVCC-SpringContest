window.onload = () => {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	setupCanvas();
	var maxTrees = 5;
	var trees = [];
	drawTrees();

	function drawTrees() {

		for (var i = 0; i < canvas.width; i++) {
			if (maxTrees >= 1) {
				if (random(1, 100) == 1) {
					tree(i);
					maxTrees--;
					i+=100;
				}
			}
		}
		ctx.fillStyle = "rgb(74, 160, 54)";
		ctx.beginPath();
		for (var i = 0; i < trees.length; i++) {
			var item = trees[i];
			ctx.arc(item.x, item.y, 50, 0, Math.PI*2, true);
		}
		ctx.closePath();
		ctx.fill();
	}

	function tree(x) {
		ctx.beginPath();
		ctx.moveTo(x, canvas.height);
		ctx.lineTo(x, canvas.height-100);
		ctx.stroke();
		trees.push({x: x, y: canvas.height-100});
	}

	function setupCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		ctx.strokeStyle = "rgb(79,61,17)";
		ctx.lineCap = "round";
		ctx.lineWidth = 45;
	}

	function random(min, max) {
		var rand = Math.floor(Math.random() * max) + min;
		return rand;
	}
}