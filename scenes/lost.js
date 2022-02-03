add([
	text(`${args.score}`, 32),
	pos(width() / 2, height() / 2 - 32),
	origin("center"),
]);

add([
	text("press space to restart", 6),
	pos(width() / 2, height() / 2), 
	origin("center"),
]);

add([
	text("instructions:", 6),
	pos(width() / 2, height() / 2 + 24), 
	origin("center"),
]);

add([
	text("click to create platforms", 6),
	pos(width() / 2, height() / 2 + 48), 
	origin("center"),
]);

keyPress("space", () => {
	go("main");
});
