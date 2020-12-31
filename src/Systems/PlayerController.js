import { ParticleManager, SceneManager, System } from "../../lib/Trengine/src";
import { MatterBody } from "../../lib/Trengine/src/Components/MatterBody";
import { Player } from "../Components/Player";
import { Body, Vector, Common, Events } from 'matter-js'
import { TwoSprite } from "../../lib/Trengine/src/Components/TwoSprite";
import { Camera } from "../../lib/Trengine/src/Components/Camera";
import { PSExplosion } from "../Particles/PSExplosion";
import { MatterEngine } from "../../lib/Trengine/src/Components/MatterEngine";

export class PlayerController extends System {
    init(scene) {
        this.input = SceneManager.getInputManager()
        scene.registerQuery('player', [Player, MatterBody, TwoSprite])

        Events.on(scene.singletonComponents.getComponent(MatterEngine).engine, 'collisionActive', SceneManager.getEventManager().registerAsyncEvent('MatterCollisionActive'))
        Events.on(scene.singletonComponents.getComponent(MatterEngine).engine, 'collisionEnd', SceneManager.getEventManager().registerAsyncEvent('MatterCollisionEnd'))

        this.counter = 0
    }

    update(delta) {

        const eventManager = SceneManager.getEventManager()

        const camera = this.queries.singleton.getComponent(Camera)
        const particleManager = this.queries.singleton.getComponent(ParticleManager)
        const player = this.queries.player.firstOrDefault
        const playerComponent = player.getComponent(Player)
        const twoSprite = player.getComponent(TwoSprite)
        const matterBody = player.getComponent(MatterBody).body

        camera.target = matterBody.position
        camera.zoom = 1

        this.counter++

        Body.set(matterBody, 'angle', 0)

        if (matterBody.velocity.y > playerComponent.downForceTriggerVelocity) {
            const downForce = Common.clamp(matterBody.velocity.y * playerComponent.downForceMultiplier, 0, 0.4)
            Body.applyForce(matterBody, matterBody.position, Vector.create(0, downForce))
        }

        // Right left movement
        if (this.input.getInput('right')) {
            twoSprite.texture = SceneManager.getAssetStore().images['RDRight.png']
            Body.applyForce(matterBody, matterBody.position, Vector.create(playerComponent.moveForce, 0))
        }
        if (this.input.getInput('left')) {
            twoSprite.texture = SceneManager.getAssetStore().images['RDLeft.png']
            Body.applyForce(matterBody, matterBody.position, Vector.create(-playerComponent.moveForce, 0))
        }
        if (!this.input.getInput('right') && !this.input.getInput('left') && playerComponent.onGround) {
            Body.setVelocity(matterBody, Vector.create(matterBody.velocity.x * playerComponent.floorFriction, matterBody.velocity.y))
        }

        // Jumping
        if (
            (this.input.getInput('jump') && playerComponent.onGround) || // Regular jump
            (this.input.getInput('jump') && playerComponent.coyoteTime >= 0 && !playerComponent.didJump) || // Coyote time
            (this.input.getInput('heldJump') && playerComponent.jumpBuffer >= 0 && playerComponent.onGround)
        ) {
            playerComponent.didJump = true
            Body.setVelocity(matterBody, Vector.create(matterBody.velocity.x, -playerComponent.jumpVelocity))
            particleManager.addSystem(new PSExplosion(matterBody.position.x, matterBody.position.y + twoSprite.scaledHeight / 3))
        }
        // Decreased Gravity Top
        if (this.input.getInput('heldJump')) {
            if (matterBody.velocity.y > -playerComponent.jumpPeakWidth && matterBody.velocity.y < playerComponent.jumpPeakWidth) {
                Body.applyForce(matterBody, matterBody.position, Vector.create(0, -playerComponent.jumpPeakUpForce))
            }
        }
        if (this.input.getInput('jump')) {
            playerComponent.jumpBuffer = playerComponent.jumpBufferLength
        }

        // Not-Ground check
        if (eventManager.any('MatterCollisionEnd')) {
            eventManager.receive('MatterCollisionEnd').forEach(event => {
                event.pairs.forEach(collision => {
                    if (this.collisionContains(collision, 'PlayerFloorSensor')) {
                        playerComponent.onGround = false
                        playerComponent.coyoteTime = playerComponent.coyoteTimeLength
                    }
                })
            })
        }

        // Ground check
        if (eventManager.any('MatterCollisionActive')) {
            eventManager.receive('MatterCollisionActive').forEach(event => {
                event.pairs.forEach(collision => {
                    if (this.collisionContains(collision, 'PlayerFloorSensor')) {
                        playerComponent.justLanded = !playerComponent.onGround
                        playerComponent.onGround = true
                    }
                })
            })
        }

        if (matterBody.position.y >= playerComponent.resetFloor) {
            Body.setPosition(matterBody, playerComponent.spawnPosition)
        }

        const averageYSpeed = playerComponent.previousVelocities.reduce((acc, next) => acc + Math.abs(next.y), 0) / playerComponent.previousVelocities.length

        if ((playerComponent.justLanded && averageYSpeed > 10) || (playerComponent.justLanded && playerComponent.didJump)) {
            particleManager.addSystem(new PSExplosion(matterBody.position.x, matterBody.position.y + twoSprite.scaledHeight / 3))
        }

        if (playerComponent.justLanded && playerComponent.didJump) playerComponent.didJump = false

        const clampedX = Common.clamp(matterBody.velocity.x, -playerComponent.velocityXConstraint, playerComponent.velocityXConstraint)
        const clampedY = Common.clamp(matterBody.velocity.y, -playerComponent.velocityYConstraint, playerComponent.velocityYConstraint)
        Body.setVelocity(matterBody, Vector.create(clampedX, clampedY))

        playerComponent.previousVelocities.push({ ...matterBody.velocity })
        if (playerComponent.previousVelocities.length > 3) playerComponent.previousVelocities.shift()

        playerComponent.coyoteTime--
        playerComponent.jumpBuffer--
    }

    collisionContains(collision, label) {
        return collision.bodyA.label === label || collision.bodyB.label === label
    }
}