class Game {
    constructor() {
        this.tank = new Tank();
        this.obstaclesArr = [];
        this.projectilesArr = [];
        this.bulletCollision = [];
        this.score = 0; // Initialize the score
        this.scoreElement = document.getElementById("score"); // Get the score element
    
    }

    start() {

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
                this.removeObstacleIfOutside(obstacleInstance); // remove if outside
                this.collisionPlayerObstacle(obstacleInstance); // detect collision
                // this.collisionProjectile(projectileInstance)
            });
        }, 200);

        setInterval(()=> {
            this.projectilesArr.forEach((projectileInstance)=>{
                projectileInstance.moveSide();
                this.collisionProjectile(projectileInstance);
            })
        },8)
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


    collisionProjectile(projectileInstance) {
            const obstaclesToRemove = [];
            const projectilesToRemove = [];
        
            this.obstaclesArr.forEach((obstacleInstance, obstacleIndex) => {
                if (
                    projectileInstance.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                    projectileInstance.positionX + projectileInstance.width > obstacleInstance.positionX &&
                    projectileInstance.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                    projectileInstance.positionY + projectileInstance.height > obstacleInstance.positionY
                ) {
                    obstaclesToRemove.push(obstacleInstance);
                    projectilesToRemove.push(projectileInstance);

                    this.score += 10;
                    this.scoreElement.textContent = (this.score) 
                }
            });
        
            obstaclesToRemove.forEach(obstacleToRemove => {
                obstacleToRemove.domElement.remove();
            });
        
            projectilesToRemove.forEach(projectileToRemove => {
                projectileToRemove.domElement.remove();
            });
        
            this.obstaclesArr = this.obstaclesArr.filter(obstacle => !obstaclesToRemove.includes(obstacle));
            this.projectilesArr = this.projectilesArr.filter(projectile => !projectilesToRemove.includes(projectile));
        }
        
        
    

    shoot() {
        const banana = new Projectile(this.tank.positionX, this.tank.positionY)
        this.projectilesArr.push(banana)
        
    }

    removeObstacleIfOutside(obstacleInstance){
        if (obstacleInstance.positionX < 0 - obstacleInstance.width) {
            obstacleInstance.domElement.remove(); //remove from the dom
            this.obstaclesArr.shift(); // remove from the array
        }
    }
    attachEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft" && this.tank.positionX > 0) {
                this.tank.moveLeft();
            } else if (event.key === "ArrowRight" && this.tank.positionX < 100) {
                this.tank.moveRight();
            } else if (event.key === "ArrowUp" && this.tank.positionY > 0) {
                this.tank.moveUp();
            } else if (event.key === "ArrowDown" && this.tank.positionY < 90) {
                this.tank.moveDown();
            } else if (event.key === " ") {
                this.shoot();
            }
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
        this.positionX--; 
            this.domElement.style.left = this.positionX + "vw";
        
    }
    moveRight() {
        this.positionX++; 
            this.domElement.style.left = this.positionX + "vw";
        
    }
    moveUp() {
        if (this.positionY > 50) {
            this.positionY--;
            this.domElement.style.top = this.positionY + "vh";
        }
    }

    moveDown() {
        if (this.positionY < 200) { // Adjust the limit as needed
            this.positionY++;
            this.domElement.style.top = this.positionY + "vh";
        }
    }
}

class Projectile {
    constructor(playerX, playerY) {
        this.width = 2;
        this.height = 2;
        this.positionX = playerX;
        this.positionY = playerY;
        this.domElement = null
        this.createDomElement()
        
    }
    createDomElement() { // Use pixels for positioning
        this.domElement = document.createElement("img");
        this.domElement.setAttribute("src","images/bulletGold.avif");

        this.domElement.className = "projectile";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.position = "absolute";
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
    moveSide() {
    const acceleration = 0.1; // Adjust the acceleration rate as needed
    this.positionX += acceleration;
    this.domElement.style.left = this.positionX + "vw";
    // Remove projectile if it's off the screen
    if (this.positionX > 100) {
        this.domElement.remove();
        // Remove the projectile from the projectilesArr array (you need to implement this)
    }
}


}

class Obstacle {
    constructor() {
        this.width = 5;
        this.height = 5; // Adjust the height range as needed
        // ... (other properties)
        this.positionX = 100; // Start from the right side of the screen
        const maxHeight = 90 - this.height; // Adjusted max height
        const minHeight = 60; // Minimum Y position (adjust as needed)

        this.positionY = Math.random() * (maxHeight - minHeight) + minHeight;


        this.createDomElement();
        this.moveLeftRandomly();
    }


    createDomElement() {// Use pixels for positioning
        this.domElement = document.createElement("img");
        this.domElement.setAttribute("src", "images/Tank_moving.webp");

        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.position = "absolute";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.top = this.positionY + "vh";

        const parentElm = document.getElementById("boardgame");
        parentElm.appendChild(this.domElement);
    }

    moveLeftRandomly() {
        const randomSpeed = Math.random() * 5 + 1;
        this.positionX -= randomSpeed;
        this.threshold = -5; // Adjust this value based on your game design
        this.domElement.style.left = this.positionX + "vw";
    
        if (this.positionX <= this.threshold) {
            this.domElement.remove();
            console.log("Game Over!"); // Display a game over message
            // Implement further game over logic or screen transition here
            location.href = "./gameover.html";
        }
    }
    
    moveDown() {
        this.positionX += 10;
        this.domElement.style.right = this.positionX + "vw";
    }

}


const game = new Game()
game.start();



