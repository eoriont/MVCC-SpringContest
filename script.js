window.onload = () => {
	var canvas, ctx;
	var trees = [];
	var clouds = [];
	var components = [];
	var tick = 0;
	setupCanvas();
	var maxTrees = 10;
	var maxClouds = 5;
	var groundHeight = 150;
	var moveSpeed = 3;
	loop();
	//makeScene();
	console.log(components)
	function makeScene() {
		make();
		render();
		moveComponents();
	}

	function loop() {
		clearcanvas();
		makeScene();
		tick++;
		window.requestAnimationFrame(loop);
	}

	function clearcanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);	
	}

	function moveComponents() {
		for (let i = 0; i < components.length; i++) {
			let item = components[i];
			item.x-=moveSpeed;

			if (item.x < -20) {
				components.splice(i, 1);
				for (let j = 0; j < trees.length; j++) {
					if (trees[j] == item) {
						trees.splice(j, 1);
						maxTrees++;
					}
				}
				for (let j = 0; j < clouds.length; j++) {
					if (clouds[j] == item) {
						clouds.splice(j, 1);
						maxClouds++;
					}
				}
			}
		}
	}

	function make() {
		makeTrees();
		makeClouds();
	}

	function render() {
		drawSky();
		drawGround();
		drawSun();
		drawTrees();
		drawClouds();
	}

	function drawTrees() {
		for (let i = 0; i < trees.length; i++) {
			let item = trees[i];
			let x = item.x;
			let y = canvas.height-item.y;

			//Trunk
			canvasDraw(() => {
				ctx.strokeStyle = "rgb(79,61,17)";
				ctx.moveTo(x, canvas.height);
				ctx.lineTo(x, y);
			}, true, false);

			//Leaves
			canvasDraw(() => {
				ctx.fillStyle = "rgb(74, 160, 54)";
				ctx.arc(x, y, 50, 0, Math.PI*2, true);
			}, false, true);
		}
	}

	function makeClouds() {
		if (tick==0) {
			for (let i = 0; i < canvas.width; i++) {
				if (maxClouds >= 1) {
					if (random(1, 200) == 1) {
						cloud(i);
						i+=400;
					}
				}
			}
		} else {
			if (maxClouds >= 1) {
				if (random(1, 100) == 1) {
					cloud(canvas.width+20);
				}
			}
		}
	}

	function cloud(x) {
		let y = random(30, 100);
		let cloud = new Component(x, y);
		cloud.type = "cloud";
		for (let j = 0; j < random(5, 10); j++) {
			let offset = 50;
			let baby = new Component(cloud.x+random(-offset, offset), cloud.y+random(-offset, offset));
			baby.type="babyCloud";
			baby.size = random(10, 35);
			cloud.children.push(baby);
		}
		clouds.push(cloud);
		maxClouds--;
	}

	function drawClouds() {
		for (let i = 0; i < clouds.length; i++) {

			let item = clouds[i];
			for (let j = 0; j < item.children.length; j++) {
				let child = item.children[j];
				canvasDraw(() => {
					ctx.fillStyle = "#FFFFFF";
					ctx.arc(child.x, child.y, child.size, 0, 2*Math.PI);
				}, false, true);
			}
		}
		
	}

	function drawGround() {
		canvasDraw(() => {
			ctx.fillStyle = "#43a026";
			ctx.rect(0, canvas.height-groundHeight, canvas.width, canvas.height)
		}, false, true);
	}

	function drawSky() {
		canvasDraw(() => {
			ctx.fillStyle = "#88e5fc"
			ctx.rect(0, 0, canvas.width, canvas.height-groundHeight);
		}, false, true);
	}

	function canvasDraw(func, stroke, fill) {
		ctx.beginPath();
		func();
		ctx.closePath();
		if (stroke) ctx.stroke();
		if (fill) ctx.fill();
	}

	function drawSun() {
		canvasDraw(() => {
			ctx.fillStyle = "#ffee5e";
			ctx.arc(canvas.width-250, 150, 50, 0, 2 * Math.PI);
		}, false, true);
	}

	function makeTrees() {
		if (tick==0) {
			for (let i = 0; i < canvas.width; i++) {
				if (maxTrees >= 1) {
					if (random(1, 100) == 1) {
						tree(i);
						i+=100;
					}
				}
			}
		} else {
			if (maxTrees >= 1) {
				if (random(1, 50) == 1) {
					tree(canvas.width+20);
				}
			}
		}
	}

	function tree(x) {
		let height = random(100, 300);
		let tree = new Component(x, height);
		tree.type="tree";
		trees.push(tree);
		maxTrees--;
	}

	function Component(x, y) {
		this.x = x;
		this.y = y;
		this.size;
		this.children = [];
		this.type = "";
		components.push(this);
	}

	function setupCanvas() {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		
		ctx.lineCap = "round";
		ctx.lineWidth = 45;
	}

	function random(min, max) {
		let rand = Math.floor(Math.random() * max) + min;
		return rand;
	}
}