
class collectablesGroup extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene, classType) {
        super(scene.physics.world, scene);

        this.createFromConfig({
            classType: classType
        })
    }

    addFromLayer(layer, classType, scale) {
        //same name in tiled properties 
        const { addNumber: defaultnumber, itemName: defaultString } = this.mapProperties(layer.properties);
        layer.objects.forEach(collectable => {
            const props = this.mapProperties(collectable.properties)
            const item = new classType(this.scene, collectable.x, collectable.y, props.itemName || defaultString);
            item.setDepth(-1).setScale(scale);
            this.add(item);

            item.number = props.addNumber || defaultnumber;
            item.itemName = props.itemName || defaultString

        })

        //debug
        const a = this.getChildren().map(collectable => collectable.number);
        console.log(a);
    }

    mapProperties(propertiesList) {
        if (!propertiesList || propertiesList.length === 0) { return {}; }

        return propertiesList.reduce((map, obj) => {
            map[obj.name] = obj.value;
            return map;
        }, {})
    }
}

window.collectablesGroup = collectablesGroup;