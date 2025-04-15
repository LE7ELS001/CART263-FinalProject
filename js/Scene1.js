class Scene1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'scene1'
        });
    }


    create({ gameStatus }) {

        // //creat background
        // this.background = this.add.image(0, 0, "forest-bg")
        //     .setOrigin(0, 0)
        //     .setDepth(-1)
        //     .setScrollFactor(0); // fix the background



        //creat background
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'forest-bg');
        this.background.setOrigin(0, 0)
        this.background.setDepth(-1)
        this.background.setScrollFactor(0); // fix the background













        //create map
        const map = this.createMap();

        //create layers
        const layers = this.createLayers(map);

        //create collectables
        const collectables = this.createCollectables(layers.collectables, upgradeCollectables, 1.5);

        //get playerZones
        const playerZones = this.getPlayerZones(layers.playerZones);

        // create player
        const player = this.createPlayer(playerZones.start);
        this.player = player;

        //create player StartPosition
        if (this.getCurrentLevel() === 1) {
            const startPoint = this.add.image(playerZones.start.x - 35, playerZones.start.y + 5, 'bonfire')
                .setOrigin(0.5, 1)
                .setScale(0.08)
                .setFlipX(true)
                .setDepth(-1)

        }
        else if (this.getCurrentLevel() === 2) {
            const startPoint = this.add.sprite(playerZones.start.x - 35, playerZones.start.y + 5, 'portal-2')
                .setOrigin(0.5, 1)
                .setScale(2)
                .setDepth(-1);
            startPoint.play("portal_2");
        }


        //create start Effect 
        //Fade out background
        this.tweens.add({
            targets: this.background,
            alpha: 0.3,
            duration: 400,
            ease: 'Power1'
        });



        const levelText = this.add.text(playerZones.start.x + 175, playerZones.start.y - 50, `LEVEL ${this.getCurrentLevel()}`, {
            fontSize: '80px',
            fontFamily: 'PixelFont',
            color: '#ffffff'
        }).setOrigin(0.5).setAlpha(0).setDepth(10);

        this.tweens.add({
            targets: levelText,
            alpha: 1,
            duration: 400,
            yoyo: true,
            hold: 800,
            ease: 'Power1',
            onComplete: () => {

                this.tweens.add({
                    targets: this.background,
                    alpha: 1,
                    duration: 400
                });
            }
        });








        // create an end zone
        this.createEndOfLevel(playerZones.end, player);


        //create BGM
        this.playBgMusic();

        //create soundeffect 
        this.healSound = this.sound.add('heal', { volume: 0.2 });
        //create enemies
        const enemies = this.createEnemies(layers.enemySpawns, layers.platformCollider);




        //set player collider
        player.addCollider(layers.platformCollider);
        player.addCollider(enemies.getProjectiles(), (player, projectile) => {
            if (projectile.tryHitPlayer) {
                projectile.tryHitPlayer(player);
            }
        });
        player.addOverlap(collectables, (entity, collectable) => {
            this.onCollect(entity, collectable);
        });
        player.addOverlap(layers.traps, this.onTrapsHit);




        // set enemy collider
        this.enemyCollider = this.physics.add.collider(player, enemies, this.onPlayerCollision);

        enemies.getChildren().forEach(enemy => {
            enemy.addCollider(layers.platformCollider, (enemy, platform) => {

            });
            enemy.addCollider(this.player.ProjectilesPool, this.onHit);
            enemy.addOverlap(this.player.attackBox, this.onHit);


        });

        //debug
        //this.physics.world.createDebugGraphic();
        // const debugGraphics = this.add.graphics().setAlpha(0.7);
        // layers.traps.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255), // 红色高亮
        //     faceColor: new Phaser.Display.Color(0, 255, 0, 255) // 绿色边缘
        // });


        //camera
        this.setupFollowupCameraOn(player);


        if (gameStatus === 'PLAYER_LOOSE') {
            return;
        }
        //create game event 
        this.createGameEvent();
    }

    update() {
        const cameraScrollX = this.cameras.main.scrollX;
        this.background.tilePositionX = cameraScrollX * 0.8;

        const cameraScrollY = this.cameras.main.scrollY;
        this.background.tilePositionY = cameraScrollY * 0.5;
        //console.log(this.player.x, this.player.y);
    }


    onHit(entity, source) {
        entity.takesHit(source);

    }

    onCollect(entity, collectable) {
        collectable.disableBody(true, true);
        this.healSound.play();
        //this.sound.play('heal', { volume: 0.2 });
        if (!entity) return;
        switch (collectable.itemName) {
            case "redDiamond":
                if (entity.health && entity.maxHealth && entity.hp) {
                    entity.increaseMaxHealth(Number(collectable.number));
                }
                break;

            case "blueDiamond":
                if (typeof entity.currentMana === 'number' &&
                    typeof entity.maxMana === 'number' &&
                    entity.mana) {
                    console.log('trigger');
                    entity.increaseMaxMana(Number(collectable.number));
                }
                break;

            case "redPotion":
                if (entity.health && entity.maxHealth && entity.hp) {
                    entity.pickUpHealthPotion(Number(collectable.number));

                }
                break;
            case "bluePotion":
                if (typeof entity.currentMana === 'number' &&
                    typeof entity.maxMana === 'number' &&
                    entity.mana) {
                    entity.pickUpManaPotion(Number(collectable.number));
                }
                break;
        }

    }

    onPlayerCollision(player, enemy) {
        //player.takesHit(enemy);
        enemy.tryHitPlayer(player);
    }



    createMap() {
        const map = this.make.tilemap({ key: `level_${this.getCurrentLevel()}` });
        map.addTilesetImage("ForestTiles", "tiles-1");
        map.addTilesetImage("ForestTiles2", "tiles-2");
        return map;
    }

    getCurrentLevel() {
        return this.registry.get('level') || 1;
    }

    createLayers(map) {

        const tileset = map.getTileset('ForestTiles');
        const tileset2 = map.getTileset('ForestTiles2');
        const traps = map.createLayer('traps', tileset2);
        const platformCollider = map.createLayer('Platform_collider', tileset);
        const tree = map.createLayer('Tree', tileset);
        const platforms = map.createLayer('Platforms', tileset);
        const platforms2 = map.createLayer('Platforms2', tileset);
        const environment = map.createLayer('Environment', tileset);
        const playerZones = map.getObjectLayer('Player_zones');
        const enemySpawns = map.getObjectLayer('Enemy_spawns')
        const collectables = map.getObjectLayer('Collectables');


        platformCollider.setCollisionByExclusion(-1, true);
        traps.setCollisionByProperty({ isTrap: true }, true);

        //modify it if player is in front of the envrionment(water)
        environment.setDepth(5);






        return {
            tree,
            platforms,
            platforms2,
            environment,
            platformCollider,
            playerZones,
            enemySpawns,
            collectables,
            traps,
        };
    }

    // createCollectables(collectablesLayer) {
    //     //const collectables = this.physics.add.staticGroup();
    //     const collectables = new collectablesGroup(this, upgradeCollectables);

    //     collectablesLayer.objects.forEach(collectable => {
    //         const item = new upgradeCollectables(this, collectable.x, collectable.y, 'redDiamond');
    //         item.setDepth(-1).setScale(1.5);
    //         collectables.add(item);
    //     })

    //     return collectables;
    // }

    createCollectables(collectablesLayer, classType, scale) {
        //const collectables = this.physics.add.staticGroup();
        const collectables = new collectablesGroup(this, classType);

        // collectablesLayer.objects.forEach(collectable => {
        //     const item = new classType(this, collectable.x, collectable.y, name);
        //     item.setDepth(-1).setScale(scale);
        //     collectables.add(item);
        // })
        collectables.addFromLayer(collectablesLayer, classType, scale);

        return collectables;
    }

    createPlayer(start) {

        //first time load 
        // const savedStats = this.registry.get('playerStats') || {};
        const player = new Player(this, start.x, start.y);

        // player.maxHealth = savedStats.playerMaxHealth || 100;
        // player.health = player.maxHealth;

        // player.maxMana = savedStats.playerMaxMana || 100;
        // player.currentMana = player.maxMana;

        // console.log('playerHP ', player.maxHealth, player.health)
        return player;
    }

    createEnemies(enemiesSpawnPoint, platformColliders) {
        const enemies = new Enemies();
        const enemyTypes = getEnemyTypes();
        enemiesSpawnPoint.objects.forEach(spawnPoint => {
            const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y);
            enemy.setPlatformColliders(platformColliders);
            enemies.add(enemy);
        });
        return enemies;
    }

    setupFollowupCameraOn(player) {
        const gameConfig = this.registry.get("gameConfig");
        const { height, width, mapOffset, ZoomFactor } = gameConfig;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
        this.cameras.main.setBounds(0, 0, width + mapOffset, height + 50).setZoom(ZoomFactor);
        //console.log(mapOffset);
        this.cameras.main.startFollow(player);
    }



    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;
        return {
            start: playerZones.find(zone => zone.name === "Spawn_point"),
            end: playerZones.find(zone => zone.name === "End_point")
        }
    }

    createEndOfLevel(end, player) {
        portalAnimation(this.anims);
        const portal = this.add.sprite(end.x, end.y, `portal-${this.getCurrentLevel()}`).setOrigin(0.5, 1);
        portal.setScale(2);
        portal.setDepth(-1);
        portal.play(`portal_${this.getCurrentLevel()}`);
        const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end').setAlpha(0).setSize(25, 60).setOrigin(0.5, 1).setOffset(5, -30);


        const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            //this.savePlayerData();
            eolOverlap.active = false;
            if (this.getCurrentLevel() === 1) {

                this.registry.inc('level', 1);
                this.scene.restart({ gameStatus: 'LEVEL_COMPLETED' });
            }
            else if (this.getCurrentLevel() === 2) {
                window.location.href = "end.html";
            }
        })
    }

    onTrapsHit(entity, source) {
        if (source && source.properties.isTrap) {
            if (!entity.invincible) {

                entity.takesHit(source);
            }
        }
    }

    createGameEvent() {
        window.EventEmitter.on('PLAYER_LOOSE', () => {
          const bgm = this.sound.get('bgm-forest');
          if (bgm && bgm.isPlaying) {
            bgm.stop(); 
          }
          this.scene.restart({ gameStatus: 'PLAYER_LOOSE' });
        });
      }
      

    playBgMusic() {
        const bgm = this.sound.get('bgm-forest');
        if (bgm && bgm.isPlaying) return; 
      
        if (!bgm) {
          this.sound.add('bgm-forest', { loop: true, volume: 0.5 }).play();
        } else {
          bgm.play(); 
        }
      }
      
      

    savePlayerData() {
        if (this.player) {
            this.registry.set('playerStats', {
                playerMaxHealth: this.player.maxHealth,
                playerMaxMana: this.player.maxMana
            });
        }

    }

}


