class Game {
    constructor() {
        this.tank = new Tank();
        // this.enemyTank = new EnemyTank();
        this.obstaclesArr = [];

    }

    increaseScore() {
        this.score += 10; // Increase the score by 10 for each obstacle removed
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = this.score; // Update the scoreboard text
    }

    start() {
        // attach event listeners
        this.attachEventListeners();   

        // create obstacles
        setInterval(() => {
            const newObstacle = new Obstacle();
            this.obstaclesArr.push(newObstacle);
        }, 3500);

        // move all obstacles
        // setInterval(() => {
        //     this.obstaclesArr.forEach((obstacleInstance) => {
        //         obstacleInstance.moveDown(); // move
        //         // this.removeObstacleIfOutside(obstacleInstance); // remove if outside
        // //         this.detectCollision(obstacleInstance); // detect collision

        //     });
        // }, 100);
    }

    attachEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft" && this.tank.positionX > 0) {
                this.tank.moveLeft();
            } else if (event.key === "ArrowRight" && this.tank.positionX < 130) {
                this.tank.moveRight();
            } else if (event.key === " ") {
                this.tank.shoot();
            }
        });
    }
}

class Tank {
    constructor() {
        this.width = 5;
        this.height = 5;
        this.positionX = 0;
        this.positionY = -15;
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
        this.domElement.style.top = this.positionY + 86 + "vh";

        const parentElm = document.getElementById("boardgame");
        this.domElement.setAttribute("src", "images/backgroundcity-destroy-war.avif")
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

    shoot() {
        const bullet = document.createElement("div");
        bullet.className = "bullet";


        // Set the initial position of the bullet
        bullet.style.left = this.positionX + this.width + "vw";
        bullet.style.bottom = 24.5 + "vh";

        // Append the bullet to the DOM
        const board = document.getElementById("boardgame");
        board.appendChild(bullet);

        // Move the bullet right with an interval
        const bulletInterval = setInterval(() => {
            const bulletLeft = parseFloat(bullet.style.left);
            bullet.style.left = bulletLeft + 1 + "vw";

            // Check for collisions with obstacles
            const obstacles = document.querySelectorAll(".obstacle");
            let countExplosion = 0;
            obstacles.forEach((obstacle) => {  
                if (checkCollision(bullet, obstacle)) {
                    clearInterval(bulletInterval);
                    board.removeChild(bullet);
                    board.removeChild(obstacle);
                    this.increaseObstacleCount();
                }

                const explosion = document.createElement("img");
                explosion.setAttribute("src", "./images/superbullet.svg");
                explosion.className = "explosion";

                // Set the position of the explosion
                const explosionLeft = parseFloat(obstacle.style.left);
                const explosionRight = parseFloat(obstacle.style.bottom);
                explosion.style.left = explosionLeft + "vw";
                explosion.style.bottom = explosionRight + "vh";

                // Append the explosion to the DOM
                board.appendChild(explosion);

                // count explosion

                // Remove the explosion after a delay
                setTimeout(() => {
                    board.removeChild(explosion);
                }, 1000);
            });  
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

class Obstacle {
    constructor() {
        this.width = 5;
        this.height = 5;
        this.positionX = window.innerWidth + this.width + 100; // Initial position on the right side
        this.positionY = 73; // Adjust as needed
        this.domElement = null;

        this.createDomElement();
        this.moveLeftRandomly();
    }


    createDomElement() {
        this.domElement = document.createElement("img");
        this.domElement.setAttribute("src", "images/Tank_moving.webp");

        this.domElement.classname = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.position = "absolute";
        this.domElement.style.left = this.positionX + "px"; // Use pixels for positioning
        this.domElement.style.top = this.positionY + "vh";

        const parentElm = document.getElementById("boardgame");
        parentElm.appendChild(this.domElement);
    }

    moveLeftRandomly() {
        const randomSpeed = Math.random() * 1    + 0.3; // Adjust speed range as needed
        this.positionX -= randomSpeed;
        this.domElement.style.left = this.positionX + "px"; // Use pixels for positioning
        // this.checkCollision();

        // Schedule the next movement
        setTimeout(() => {
            this.moveLeftRandomly();
        },); // Adjust the delay as needed
    }
    moveDown() {
        this.positionx += 1;
        this.domElement.style.right = this.positionx + "vw";
    }

}

const game = new Game()
game.start();



