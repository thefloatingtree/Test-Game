export class Player {
    constructor() {
        this.jumpVelocity = 17
        this.moveForce = 4
        this.downForceTriggerVelocity = 0.6
        this.downForceMultiplier = 0.6
        this.jumpPeakUpForce = 0.24
        this.jumpPeakWidth = 0.4
        this.velocityXConstraint = 13
        this.velocityYConstraint = 25

        this.resetFloor = 4000
        this.spawnPosition = { x: 0, y: 0 }

        this.floorFriction = 0.84

        this.jumpBufferLength = 5
        this.coyoteTimeLength = 5

        // Not for configuration
        this.justLanded = false
        this.didJump = false
        this.onGround = false
        this.jumpBuffer = 0
        this.coyoteTime = 0

        this.previousVelocities = []
    }
}