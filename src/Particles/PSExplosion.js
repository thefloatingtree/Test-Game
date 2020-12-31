import { ParticleSystem, random } from "../../lib/Trengine/src";
import { Particle } from "../../lib/Trengine/src/Particles";


export class PSExplosion extends ParticleSystem {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y
        Array.from(Array(50)).map(() => {
            this.particles.push(this.generateParticle());
        });
        this.size = 6
    }

    generateParticle() {
        const magnitude = random(0.2, 0.5);
        const direction = random(0, Math.PI * 2);
        const xSpread = random(-25, 25);
        const ySpread = random(-10, 10);
        return new Particle({ 
            x: this.x + xSpread, 
            y: this.y + ySpread, 
            vx: magnitude * Math.cos(direction),
            vy: magnitude * Math.sin(direction) - 1.5, 
            life: random(5, Math.abs(xSpread)) 
        });
    }

    update() {
        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.life >= 0;
        });
        return this.particles.length !== 0;
    }

    draw(ctx) {
        this.particles.forEach(particle => {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255)`;
            const quantizedX = Math.floor(particle.x / this.size) * this.size;
            const quantizedY = Math.floor(particle.y / this.size) * this.size;
            ctx.moveTo(quantizedX, quantizedY);
            ctx.rect(quantizedX, quantizedY, this.size, this.size);
            ctx.fill();
        });
    }
}