/**
* name
*/
var module;
(function (module) {
    /**商店展示技能item */
    var ExibitionSkillItem = /** @class */ (function () {
        function ExibitionSkillItem(root) {
            this._root = root;
        }
        ExibitionSkillItem.prototype.changeSkill = function (id) {
            var configData = module.ResSkillConfigData.getDataByID(id);
            this._root.imgLock.skin = configData.url_big_lock;
            this._root.imgUnlock.skin = configData.url_big_unlock;
            var isHave = module.GameDataManager.instance.isUnlockSkill(id);
            if (isHave) {
                this._root.imgLock.visible = false;
                this._root.imgUnlock.visible = true;
            }
            else {
                this._root.imgLock.visible = true;
                this._root.imgUnlock.visible = false;
            }
        };
        /**释放 */
        ExibitionSkillItem.prototype.destroy = function () {
            this._root = null;
        };
        return ExibitionSkillItem;
    }());
    module.ExibitionSkillItem = ExibitionSkillItem;
})(module || (module = {}));
//# sourceMappingURL=ExibitionSkillItem.js.map