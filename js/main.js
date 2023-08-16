class Game {
    constructor() {
        this.tank = new Tank();
        // this.enemyTank = new EnemyTank();
        this.obstaclesArr = [];
        this.projectileHit = [];
        this.bulletCollision = [];
    }


    start() {
        // attach event listeners
        this.attachEventListeners();

        // create obstacles
        setInterval(() => {
            const newObstacle = new Obstacle();
            this.obstaclesArr.push(newObstacle);
        }, 3000);

        // moveLeft obstacles
        setInterval(() => {
            this.obstaclesArr.forEach((obstacleInstance) => {
                obstacleInstance.moveLeftRandomly(); // move
                // this.removeObstacleIfOutside(obstacleInstance); // remove if outside
                this.collisionPlayerObstacle(obstacleInstance); // detect collision
                // call bullet collision 
                // this.projectileHit(obstacleInstance);
            });
        }, 200);
    }

    collisionPlayerObstacle(obstacleInstance) {
        if (
            this.tank.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.tank.positionX + this.tank.width > obstacleInstance.positionX &&
            this.tank.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.tank.positionY + this.tank.height > obstacleInstance.positionY
        ) {
            // Collision detected!
            console.log('You hit a tank', obstacleInstance)
            console.log("game over BUDDY ");
            location.href = "./gameover.html";
        }

        // collision bullet-tobst () --> you want to check for each bullet
    }

    collisionPlayerObstacle(obstacleInstance) {
        if (
            this.tank.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.tank.positionX + this.tank.width > obstacleInstance.positionX &&
            this.tank.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.tank.positionY + this.tank.height > obstacleInstance.positionY
        ) {
            // Collision detected!
            console.log('You hit a tank', obstacleInstance)
            console.log("game over BUDDY ");
            location.href = "./gameover.html";
        }

        // collision bullet-tobst () --> you want to check for each bullet
    }


    attachEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft" && this.tank.positionX > 0) {
                this.tank.moveLeft();
            } else if (event.key === "ArrowRight" && this.tank.positionX < 100) {
                this.tank.moveRight();
            } else if (event.key === " ") {
                this.tank.shoot();
            }
            // } else if (event.key === "ArrowUp" && this.tank.positionY > 0) {
            //     this.tank.moveUp();
            // } else if (event.key === "ArrowDown" && this.tank.positionY > 100) {
            //     this.tank.moveDown();
            // }
        });
    }
}

class Tank {
    constructor() {
        this.width = 5;
        this.height = 5;
        this.positionX = 0;
        this.positionY = 70;
        this.domElement = null;

        this.createDomElement();
    }

    createDomElement() {
        this.domElement = document.createElement("img");
        this.domElement.setAttribute("src", "images/Tank_moving.webp")

        //id
        this.domElement.id = "tank";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.top = this.positionY + "vh";

        const parentElm = document.getElementById("boardgame");
        parentElm.appendChild(this.domElement);
    }
    moveLeft() {
        this.positionX--; {
            this.domElement.style.left = this.positionX + "vw";
        }
    }
    moveRight() {
        this.positionX++; {
            this.domElement.style.left = this.positionX + "vw";
        }
    }
    moveUp() {
        this.positionY--; {
            this.domElement.style.left = this.positionY + "vh";
        }
    }
    moveDown() {
        this.positionY++; {
            this.domElement.style.left = this.positionY + "vh";
        }
    }


    shoot() {
        const bullet = document.createElement("div");
        bullet.className = "bullet";


        // Set the initial position of the bullet
        bullet.style.left = this.positionX + this.width + "vw";
        bullet.style.bottom = 27.7 + "vh";

        // Append the bullet to the DOM
        const board = document.getElementById("boardgame");
        board.appendChild(bullet);

        // Move the bullet right with an interval
        const bulletInterval = setInterval(() => {
            const bulletLeft = parseFloat(bullet.style.left);
            bullet.style.left = bulletLeft + 1 + "vw";

            // Check if the bullet is out of the screen
            if (bulletLeft >= 110) {
                clearInterval(bulletInterval);
                board.removeChild(bullet);
                // Update tank's position when bullet goes off
            }
        }, 10);
        console.log(this.obstacleCount);
    }

}

class projectile {
    constructor(bullet) {
        this.width = 50;
        this.height = 200;
        this.position = 50;
        this.size = 100;
    }
    createDomElement() { // Use pixels for positioning
        this.domElement = document.createElement("img");
        this.domElement.setAttribute;

        this.domElement.classname = "projectile";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.position = "projectile";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.top = this.positionY + "vh";

        const parentElm = document.getElementById("boardgame");
        parentElm.appendChild(this.domElement);
    }

    moveLeftRandomly() {
        const randomSpeed = Math.random() * 3 + 1; // Adjust speed range as needed
        this.positionX -= 0.5  //randomSpeed;
        this.domElement.style.left = this.positionX + "vw"; // Use pixels for positioning
        // this.checkCollision();
    }
    moveDown() {
        this.positionX += 700;
        this.domElement.style.right = this.positionX + "vw";
    }

}


// store the shells in array
// GAME method

//2- interval to check shells

// collision projectiles-obst (game method)


class Obstacle {
    constructor() {
        this.width = 5;
        this.height = 5;
        this.positionX = 95;//window.innerWidth + this.width + 100; // Initial position on the right side
        this.positionY = 70; // Adjust as needed
        this.domElement = null;

        this.createDomElement();
        this.moveLeftRandomly();
    }


    createDomElement() {// Use pixels for positioning
        this.domElement = document.createElement("img");
        this.domElement.setAttribute("src", "images/Tank_moving.webp");

        this.domElement.classname = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.position = "absolute";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.top = this.positionY + "vh";

        const parentElm = document.getElementById("boardgame");
        parentElm.appendChild(this.domElement);
    }

    moveLeftRandomly() {
        const randomSpeed = Math.random() * 4 + 1; // Adjust speed range as needed
        this.positionX -= 1  //randomSpeed;
        this.domElement.style.left = this.positionX + "vw"; // Use pixels for positioning
        // this.checkCollision();
    }
    moveDown() {
        this.positionx += 200;
        this.domElement.style.right = this.positionx + "vw";
    }

}

const game = new Game()
game.start();



