class Pipe {
    constructor() {
        // How big is the empty space
        let spacing = 125;
        // Where is th center of the empty space
        let centery = random(spacing, height - spacing);

        // Top and bottom of pipe
        this.top = centery - spacing / 2;
        this.bottom = height - (centery + spacing / 2);
        // Starts at the edge
        this.x = width;
        // Width of pipe
        this.w = 80;
        // How fast
        this.speed = 6;
    }

    show() {
        fill(255);
        stroke(255);
        // if (this.highlight) {
        //     fill (255, 0, 0);
        // }
        //rect(this.x, 0, this.w, this.top);
        image(pipeTop,this.x, 0, this.w, this.top);
        //rect(this.x, height-this.bottom, this.w, this.bottom);
        image(pipeBottom, this.x, height-this.bottom, this.w, this.bottom);
    }

    update() {
        this.x -= this.speed;
    }

    offscreen() {
        return this.x < -this.w;
    }

    hits(bird) {
        // if (bird.x > this.x && bird.x < this.x + this.w) {
        //     if (bird.y < this.top || bird.y > height - this.bottom) {
        //         // this.highlight = true;
        //         return true;
        //     }
        // }
        if ((bird.y - bird.r) < this.top || (bird.y + bird.r) > (height - this.bottom)) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                return true;
            }
        }
    }
}