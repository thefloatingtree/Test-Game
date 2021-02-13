import { Position, SceneManager, Velocity } from "../lib/Trengine/src"
import { Shapes, TwoPrimitiveShape } from "../lib/Trengine/src/Components/TwoPrimitiveShape"
import { Property, Type } from "../lib/Trengine/src/EntityStore"

export function registerEntities() {
    SceneManager.getEntityStore()
    .registerEntity('Moving Rectangle')
    .addComponent(Position, [
        new Property('x', Type.Number, 0),
        new Property('y', Type.Number, 0)
    ])
    .addComponent(Velocity, [
        new Property('x', Type.Number, 1),
        new Property('y', Type.Number, 0)
    ])
    .addComponent(TwoPrimitiveShape, [
        new Property('width', Type.Number, 10),
        new Property('height', Type.Number, 10),
        new Property('shape', Type.Number, Shapes.rectangle),
        new Property('color', Type.Color, '#FFFFFF'),
    ])

SceneManager.getEntityStore()
    .registerEntity('Rectangle')
    .addComponent(Position, [
        new Property('x', Type.Number, 0),
        new Property('y', Type.Number, 0)
    ])
    .addComponent(TwoPrimitiveShape, [
        new Property('width', Type.Number, 10),
        new Property('height', Type.Number, 10),
        new Property('shape', Type.Number, Shapes.rectangle),
        new Property('color', Type.Color, '#FFFFFF'),
    ])
}