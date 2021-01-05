ScratchMore.startService(function () {
	
})
function joinBools (ledLeft: number, ledRight: number, patrolLeft: number, patrolRight: number) {
    slot3Value = bit.lshift(ledLeft, 3) + bit.lshift(ledRight, 2) + bit.lshift(patrolLeft, 1) + bit.lshift(patrolRight, 0)
}
function splitToBools (value: number) {
    ledLeft = bit.and(bit.rshift(value, 3), 1)
    ledRight = bit.and(bit.rshift(value, 2), 1)
    patrolLeft = bit.and(bit.rshift(value, 1), 1)
    patrolRight = bit.and(bit.rshift(value, 0), 1)
}
let speedRight = 0
let speedLeft = 0
let ledRight = 0
let ledLeft = 0
let slot3Value = 0
let patrolRight = 0
let patrolLeft = 0
pins.digitalWritePin(DigitalPin.P0, 0)
if (carcotrol.getCarType() == carcotrol.car(carType.Tinybit)) {
    basic.showString("T")
} else if (carcotrol.getCarType() == carcotrol.car(carType.Maqueen)) {
    basic.showString("M")
} else if (carcotrol.getCarType() == carcotrol.car(carType.Porocar)) {
    basic.showString("P")
} else {
    basic.showIcon(IconNames.Confused)
}
patrolLeft = 0
patrolRight = 0
basic.forever(function () {
    speedLeft = ScratchMore.getSlot(Slot.SLOT0)
    speedRight = ScratchMore.getSlot(Slot.SLOT1)
    carcotrol.carCtrl(0, 0)
    ScratchMore.setSlot(Slot.SLOT2, carcotrol.getDistance())
    slot3Value = ScratchMore.getSlot(Slot.SLOT3)
    splitToBools(slot3Value)
    if (carcotrol.getCarType() == carcotrol.car(carType.Maqueen)) {
        if (ledLeft == 1) {
            carcotrol.setLED(Position.Left, carcotrol.colors(RGBColors.Red))
        } else {
            carcotrol.setLED(Position.Left, carcotrol.colors(RGBColors.Black))
        }
        if (ledRight == 1) {
            carcotrol.setLED(Position.Right, carcotrol.colors(RGBColors.Red))
        } else {
            carcotrol.setLED(Position.Right, carcotrol.colors(RGBColors.Black))
        }
    } else if (carcotrol.getCarType() == carcotrol.car(carType.Tinybit)) {
        if (ledLeft == 1 && ledRight == 0) {
            carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.Red))
        } else if (ledLeft == 0 && ledRight == 1) {
            carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.Green))
        } else if (ledLeft == 1 && ledRight == 1) {
            carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.Blue))
        } else {
            carcotrol.setLED(Position.Both, carcotrol.colors(RGBColors.Black))
        }
    }
    patrolLeft = carcotrol.getLineColorN(Position.Left)
    patrolRight = carcotrol.getLineColorN(Position.Right)
    joinBools(ledLeft, ledRight, patrolLeft, patrolRight)
    ScratchMore.setSlot(Slot.SLOT3, slot3Value)
})
