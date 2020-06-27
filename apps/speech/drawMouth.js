(function(global) {

const drawS = (opt) => {
	opt.ctx.fillStyle = "white";
	drawM(opt, 0.9, 0.20, 0.90);
	opt.ctx.fillStyle = "black";
}

const drawF = (opt, size) => {
	opt.ctx.fillStyle = "white";
	drawM(opt, 0.45, 0.5, -0.25)
	opt.ctx.fillStyle = "black";
}

const drawTng = ({ctx, dim}, w, u, d) => {
	const dx1 = dim.xw * w * 0.5;
	const dx2 = dx1 / 3;
	const dx3 = dx1 / 2;
	const dy1 = dim.yh * u * 0.5;
	const dy2 = dim.yh * d * 0.5;

	const x4 = dim.xc + dx2;
	const x5 = dim.xc + dx3;
	const x6 = dim.xc - dx3;
	const x7 = dim.xc - dx2;

	const y1 = dim.yc - dy1		//Upper lip
	const y2 = dim.yc;			//neutral
	const y3 = dim.yc + dy2;	//top of lower lip
	
	ctx.fillStyle = "red";	
	ctx.beginPath();
	ctx.moveTo(x5, y3); //right dn
	ctx.lineTo(x4, y2);
	ctx.lineTo(x7, y2);
	ctx.lineTo(x6, y3); //left dn
	//ctx.lineTo(x5, y3); //right dn
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "black";
}

const drawM = ({ctx, dim}, w, u, d) => {
	const dx1 = dim.xw * w * 0.5;
	const dx2 = dx1 / 1.6;
	const dx3 = dx1 / 2;
	const dy1 = dim.yh * u * 0.5;
	const dy2 = dim.yh * d * 0.5;

	const x1 = dim.xc - dx1;	//leftmost corner
	const x2 = dim.xc - dx2;	//left upper/lower
	const x3 = dim.xc + dx2;	//right upper/lower
	const x4 = dim.xc + dx1;	//rightmost corner
	const x5 = dim.xc + dx3;
	const x6 = dim.xc - dx3;

	const y1 = dim.yc - dy1		//Upper lip
	const y2 = dim.yc;			//neutral
	const y3 = dim.yc + dy2;	//top of lower lip
	const y4 = dim.yc + dy2 + (dim.yh/5);	//bottom of lower lip
		
	ctx.beginPath();
	ctx.moveTo(x1, y2); //left corner
	ctx.lineTo(x2, y1); //left up
	ctx.lineTo(x3, y1); //right up
	ctx.lineTo(x4, y2); //right corner
	ctx.lineTo(x5, y3); //right dn
	ctx.lineTo(x6, y3); //left dn
	ctx.lineTo(x1, y2); //left corner
	ctx.fill();
	
	ctx.moveTo(x2, y4);
	ctx.lineTo(x3, y4); //bottom of lower lip
	ctx.stroke();
}

const clear = ({dim, ctx}) => {
	ctx.clearRect(dim.x1, dim.y1, dim.xw, dim.yh);
}

const doSwitch = (opt) => (type) => {
	clear(opt);
	switch(type.toUpperCase()) {
		case "W":
		case "U":
			return drawM(opt, 0.3, 0.25, 0.25);
		case "F":
		case "V":
			return drawF(opt);
		case "P":
		case "B":
			return drawM(opt, 0.88, 0.10, -0.10);
		case "A":
			return drawM(opt, 0.9, 0.60, 0.90);
		case "E":
		case "Y":
		case "K":
		case "C":
		case "R":
			return drawM(opt, 0.9, 0.20, 0.90);
		case "L":
		case "N":
			drawM(opt, 0.9, 0.20, 0.90);
			drawTng(opt, 0.9, 0.20, 0.90);
			break;
		case "S":
		case "Z":
		case "T":
		case "D":
			return drawS(opt);
		case "H":
		case "I":
		case "G":
			return drawM(opt, 1.0, 0, 0.90);
		case "O":
			return drawM(opt, 0.6, 0.60, 0.90);
		default:
			return drawM(opt, 0.9, 0, 0);
	}
};

global.getDrawMouth = ctx => {
	const { width, height } = ctx.canvas;
	const dim = { x1: 0, y1: 0 };
	dim.x2 = width;
	dim.y2 = height;
	dim.xw = dim.x2 - dim.x1;
	dim.yh = dim.y2 - dim.y1;
	dim.xc = dim.x1 + (dim.xw/2);
	dim.yc = dim.y1 + (dim.yh/2);
	return doSwitch({dim, ctx});
};

}(window));
