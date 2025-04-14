const CollisionMixin = {
    addCollider(otherGameObject, callback) {
        this.scene.physics.add.collider(this, otherGameObject, callback, null, this);
    },
    addOverlap(otherGameObject, callback) {
        this.scene.physics.add.overlap(this, otherGameObject, callback, null, this);
    },

    bodyPositionDifferenceX: 0,
    prevRay: null,
    prevHasHit: null,

    raycast(body, layer, { rayLength = 30, precision = 0, steepnes = 1 }) {
        const { x, y, width, halfHeight } = body;

        this.bodyPositionDifferenceX += body.x - body.prev.x;

        if ((Math.abs(this.bodyPositionDifferenceX) <= precision) && this.prevHasHit !== null) {
            return {
                ray: this.prevRay,
                hitTheLayer: this.prevHasHit,

            }
        }

        //console.log("hit the floor");
        const edgeLine = new Phaser.Geom.Line();
        const wallLine = new Phaser.Geom.Line();
        let hitTheLayer = false;
        let hitWall = false;

        switch (body.facing) {
            case Phaser.Physics.Arcade.FACING_RIGHT: {
                edgeLine.x1 = x + width;
                edgeLine.y1 = y + halfHeight;
                edgeLine.x2 = edgeLine.x1 + rayLength * steepnes;
                edgeLine.y2 = edgeLine.y1 + rayLength;

                wallLine.x1 = x + width;
                wallLine.y1 = y + halfHeight;
                wallLine.x2 = wallLine.x1 + rayLength / 2;
                wallLine.y2 = wallLine.y1;
                break;
            }
            case Phaser.Physics.Arcade.FACING_LEFT: {
                edgeLine.x1 = x;
                edgeLine.y1 = y + halfHeight;
                edgeLine.x2 = edgeLine.x1 - rayLength * steepnes;
                edgeLine.y2 = edgeLine.y1 + rayLength;

                wallLine.x1 = x;
                wallLine.y1 = y + halfHeight;
                wallLine.x2 = wallLine.x1 - rayLength / 2;
                wallLine.y2 = wallLine.y1;
                break;
            }
        }

        const hits = layer.getTilesWithinShape(edgeLine);
        const wallHits = layer.getTilesWithinShape(wallLine);

        hitEdge = hits.some(hit => hit.collides);
        hitWall = wallHits.some(hit => hit.collides);

        // if (hits.length > 0) {
        //     // hit at least one colliable platform 
        //     hitTheLayer = this.prevHasHit = hits.some(hit => hit.index !== -1);
        // }

        const shouldTurn = !hitEdge || hitWall;

        this.prevRay = { edgeLine, wallLine };
        this.bodyPositionDifferenceX = 0;

        return {
            ray: { edgeLine, wallLine },
            hitTheLayer: !shouldTurn
        };


    }

};

window.CollisionMixin = CollisionMixin;