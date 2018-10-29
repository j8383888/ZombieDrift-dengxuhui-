/**
* name
*/
var module;
(function (module) {
    /**怪物配置数据 */
    var MonsterConfig = /** @class */ (function () {
        function MonsterConfig() {
        }
        /**
         * 获取随机配置数据
         * id clipX clipY crushSkin
         */
        MonsterConfig.getRandomConfig = function () {
            var randomID = (Math.floor(Math.random() * MonsterConfig.MAX_NUM) + 1).toString();
            return MonsterConfig.CONFIG[randomID];
        };
        /**资源根节点 */
        MonsterConfig.ROOT_PATH = "monster/";
        MonsterConfig.MONSTER_PREFIX = "clip_monster_";
        MonsterConfig.MONSTER_SUFFIX = ".png";
        /**怪物最大数量 */
        MonsterConfig.MAX_NUM = 8;
        MonsterConfig.CLIP_X = "clipX";
        MonsterConfig.ID = "id";
        MonsterConfig.CLIP_Y = "clipY";
        MonsterConfig.CRUSH_SKIN = "crushSkin";
        MonsterConfig.COLLISION_RADIUS = "collisionRadius";
        /**配置数据 */
        MonsterConfig.CONFIG = {
            "1": {
                id: 1,
                clipX: 5,
                clipY: 1,
                collisionRadius: 40,
                crushSkin: "crush_monster1,2.png"
            },
            "2": {
                id: 2,
                clipX: 5,
                clipY: 1,
                collisionRadius: 40,
                crushSkin: "crush_monster1,2.png"
            },
            "3": {
                id: 3,
                clipX: 3,
                clipY: 1,
                collisionRadius: 30,
                crushSkin: "crush_monster3.png"
            },
            "4": {
                id: 4,
                clipX: 6,
                clipY: 1,
                collisionRadius: 50,
                crushSkin: "crush_monster4,5.png"
            },
            "5": {
                id: 5,
                clipX: 6,
                clipY: 1,
                collisionRadius: 50,
                crushSkin: "crush_monster4,5.png"
            },
            "6": {
                id: 6,
                clipX: 5,
                clipY: 1,
                collisionRadius: 40,
                crushSkin: "crush_monster6.png"
            },
            "7": {
                id: 7,
                clipX: 4,
                clipY: 1,
                collisionRadius: 50,
                crushSkin: "crush_monster7-9.png"
            },
            "8": {
                id: 8,
                clipX: 4,
                clipY: 1,
                collisionRadius: 30,
                crushSkin: "crush_monster7-9.png"
            },
            "9": {
                id: 9,
                clipX: 4,
                clipY: 1,
                collisionRadius: 40,
                crushSkin: "crush_monster7-9.png"
            }
        };
        return MonsterConfig;
    }());
    module.MonsterConfig = MonsterConfig;
})(module || (module = {}));
//# sourceMappingURL=MonsterConfig.js.map