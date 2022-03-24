class Input { 
	static keys = { 
		ArrowUp: false, 
		ArrowDown: false, 
		ArrowLeft: false, 
		ArrowRight: false 
	};

	static mouse = {
		x: 0,
		y: 0
	} 
};

onkeydown = e => Input.keys[e.code] = true;

onkeyup   = e => Input.keys[e.code] = false;

onmousemove = e => {  
  Input.mouse.x =  2 * e.screenX / window.innerWidth  - 1; 
  Input.mouse.y = -2 * e.screenY / window.innerHeight + 1;
}
