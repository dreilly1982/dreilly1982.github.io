class Bird {
    constructor(brain) {
        this.y = height / 2;
        this.x = 64;
        this.r = 12;
        this.gravity = 0.8;
        this.velocity = 0;
        this.lift = -12;
        this.fitness = 0;
        this.score = 0;
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 10, 2);
        }

        var randNum = Math.floor(Math.random()*3);
        switch (randNum) {
            case 0:
                this.birdImg = birdRed;
                break;
            case 1:
                this.birdImg = birdBlue;
                break;
            case 2:
                this.birdImg = birdYellow;
                break;
            default:
                console.log('ERROR PICKING COLOR')
        }
    }

    show() {
        stroke(255);
        fill(255, 100);
        //ellipse(this.x, this.y, this.r * 2, this.r * 2);
        image(this.birdImg, this.x, this.y);
    }

    update() {
        loadPixels();
        this.velocity += this.gravity;
        this.velocity *= 0.9
        this.y += this.velocity;
        this.score++;
    }

    up() {
        this.velocity += this.lift;
    }

    mutate() {
        function mutate(x) {
            if (Math.random(1) < 0.1) {
                var offset = randomGaussian() * 0.5;
                var newx = x + offset;
                return newx;
            } else {
                return x;
            }
        }
        this.brain.mutate(mutate)
    }

    offScreen() {
        return (this.y > height || this.y < 0);
    }

    think(pipes) {
        let closest = null;
        let closestD = Infinity;
        let nextClosest = null;
        for (let i = 0; i < pipes .length; i++) {
            let d = (pipes[i].x + pipes[i].w) - this.x;
            if (d < closestD && d > 0) {
                closest = pipes[i];
                closestD = d;
                nextClosest = pipes[i+1];
            }
        }

        if (closest != null) {
            let inputs = [];
            inputs[0] = map(closest.x, this.x, width, 0, 1);
            inputs[1] = map(closest.top, 0, height, 0, 1);
            inputs[2] = map(closest.bottom, 0, height, 0, 1);
            inputs[3] = map(this.y, 0, height, 0, 1);
            inputs[4] = map(this.velocity, -5, 5, 0, 1);
            // if (nextClosest != null) {
            //     inputs[5] = map(nextClosest.x, this.x, width, 0, 1);
            //     inputs[6] = map(nextClosest.top, 0, height, 0, 1);
            //     inputs[7] = map(nextClosest.bottom, 0, height, 0, 1);
            // } else {
            //     inputs[5] = map(closest.x, this.x, width, 0, 1);
            //     inputs[6] = map(closest.top, 0, height, 0, 1);
            //     inputs[7] = map(closest.bottom, 0, height, 0, 1);
            // }
            // inputs[0] = this.y/height;
            // inputs[1] = closest.top/height;
            // inputs[2] = closest.bottom/height;
            // inputs[3] = closest.x/width;
            // inputs[4] = this.velocity / 10;

            let output = this.brain.predict(inputs);
            if (output[1] > output[0]) {
                this.up();
            }
        }
    }
}