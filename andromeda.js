var config = {
    type: Phaser.AUTO,
    parent: 'phaser-exapmle',
    //backgroundColor: '#000000',
    width: 600,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var spacebar;
var leftArrow;
var rightArrow;
var ship;
var bullets;
var arrow;

var game = new Phaser.Game(config);

function preload ()
{
    //this.load.image('space', 'assets/starfield.png');
    this.load.image('bullet', 'assets/tingsdatgopew-1.png');
    this.load.image('ship', 'assets/andromeh.png');
    this.load.image('boss', 'assets/bossman.png');
}

function create ()
{
    var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.speed = Phaser.Math.GetSpeed(600, 1);
        },

        fire: function (x, y)
        {
            this.setPosition(x, y);

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
            this.y -= this.speed * delta;

            if (this.y > 820)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: Infinity,
        runChildUpdate: true
    });

    //this.add.image(400, 300, 'space');
    boss = this.add.image(300,365, 'boss');
    ship = this.add.image(300, 765, 'ship');

    //this.arrow = this.input.keyboard.createCursorKeys();
   // fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    leftArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}

function update () {
  /*  if (Phaser.Input.Keyboard.JustDown && this.player.x <= 580) {
            this.player.x += 3;
        }
    if (cursors.left.isDown && this.player.x >= 20)
        {
            this.player.x -= 3;
        }
    */

    if (Phaser.Input.Keyboard.JustDown(spacebar))
    {
        var bullet = bullets.get();

        if (bullet)
        {
            bullet.fire(ship.x, ship.y);
        }
    }
    else if (Phaser.Input.Keyboard.JustDown(leftArrow) && ship.x >= 50){
        ship.x -= 3;
        console.log("To the left");
        console.log(ship.x);
    }
     else if (Phaser.Input.Keyboard.JustDown(rightArrow) && ship.x <= 550){
        ship.x += 3;
         console.log("To the right");
         console.log(ship.x);
    }
}
