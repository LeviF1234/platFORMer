
gravity(700);
const center = [width()/2, height()/2];
// keeps track of platform collisions
const jumpCounts = {};
const JUMP_LIMIT = 3;

layers([
	"bg",
	"obj",
	"ui",
], "obj");

function uuid(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const player = add([
	sprite("player"),
  pos(center[0], center[1]),
	scale(2.5),
	body()
])


const COIN_SPAWN_TIME = 1.5;

function randBetween(min, max) {
    return Math.random() * (max - min) + min;
}
	// every 3 seconds add a coin
loop(COIN_SPAWN_TIME, () => {
	const s = sprite("coin");
	console.log(s.width)
	const coin = add([
		s,
		pos(width(), randBetween(height()*0.2, height()*0.8)),
		scale(0.5),
		"coin"
	])
})

// global action
action(() => {	
	// move all the platforms
	every("platform", (obj) => {
		// out of bounds
		if(obj.pos.x < (-1*obj.width)) {
			destroy(obj)
		} else {
			obj.pos.x -= 3
		}
	});

		// move all the coins
		every("coin", (obj) => {
			// out of bounds
			if(obj.pos.x < (-1*obj.width)) {
				destroy(obj)
			} else {
				obj.pos.x -= 2
			}
		});

	if(player.pos.y > height()) {
		go("lost", { score: score.value });
	}
});


// player.on("grounded", () => {
// 		player.velX = Math.random()
//     player.jump();
// });

player.action(() => {
    // player.move(player.velX, 0);
});

// display score
const score = add([
	text("0", 16),
	layer("ui"),
	pos(16, 16),
	{
		value: 0,
	},
]);

function addScore() {
	score.value++;
	score.text = score.value;
	play("score");
}

player.collides("platform", (c) => {
		jumpCounts[c.id] += 1;
		const jumpsLeft = JUMP_LIMIT - jumpCounts[c.id] + 1;
		if(jumpCounts[c.id] > JUMP_LIMIT) {
			destroy(c);
			delete jumpCounts[c.id];
		} else {
			player.jump(jumpsLeft * 100)
			// player.velX = jumpsLeft * Math.random() * 2
			c.color.a -= 0.25
		}
});

player.collides("coin", (c) => {
	addScore()
	destroy(c);
})

mouseClick(() => {
	const { x, y } = mousePos();
	// create an ID for every new platform
	const id = uuid();
	const l = Math.random() * 10 + 30
	
	const platform = add([
		rect(l, 5),
		pos(x, y),
		solid(),
		color(0, 1, 1, 1),
		"platform",
		{ id }
	])
	// start to keep track of the amount of collisions on every platform.
	jumpCounts[id] = 0;
})