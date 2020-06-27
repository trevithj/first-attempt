(function (global) {
	const drawEye = (ctx) => {
		const { width, height } = ctx.canvas;
		const cx = width / 2;
		const cy = height / 2;
		const oldStyle = ctx.fillStyle;
		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.ellipse(cx, cy, cx-1, cy-1, 0, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.fillStyle = oldStyle;
	};
	const drawPupil = (ctx, v = 0, h = 0, sz = 0.2) => {
		const { width, height } = ctx.canvas;
		const cx = width / 2;
		const cy = height / 2;
		const r = Math.min(cx * sz, cy * sz);
		const oldStyle = ctx.fillStyle;
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(cx + cx * v, cy + cy * h, r, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.fillStyle = oldStyle;
	};
	global.testEyes = (ctxL, ctxR) => {
		drawEye(ctxL);
		drawEye(ctxR);
		drawPupil(ctxL);
		drawPupil(ctxR);
	}
  //   drawEye(ctx, 0.8, 1);
  // 	drawEye(ctx, 0.8, 0.9);
  // 	drawPupil(ctx, 0.2, -0.4);
})(window);
