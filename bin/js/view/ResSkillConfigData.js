/**
* name
*/
var module;
(function (module) {
    var ResSkillConfigData = /** @class */ (function () {
        function ResSkillConfigData() {
        }
        /**通过数据id获取数据 */
        ResSkillConfigData.getDataByID = function (id) {
            return this.dataDic.get(id);
        };
        /**获取所有数据 */
        ResSkillConfigData.getAllDatas = function () {
            return this.dataDic;
        };
        /**加载完成回调 */
        ResSkillConfigData.onLoadComplete = function () {
            if (ResSkillConfigData.isLoaded) {
                return;
            }
            ResSkillConfigData.isLoaded = true;
            var resource = Laya.loader.getRes(ResSkillConfigData.URL);
            for (var i = 1; i <= ResSkillConfigData.SKILL_NUM; i++) {
                var configData = resource[i];
                var skillData = new ResSkillConfigData();
                skillData.id = configData[ResSkillConfigData.ATTR_ID];
                skillData.url_big_lock = configData[ResSkillConfigData.ATTR_URL_BIG_LOCK];
                skillData.url_big_unlock = configData[ResSkillConfigData.ATTR_URL_BIG_UNLOCK];
                skillData.url_small_lock = configData[ResSkillConfigData.ATTR_URL_SMALL_LOCK];
                skillData.url_small_unlock = configData[ResSkillConfigData.ATTR_URL_SMALL_UNLOCK];
                skillData.price = configData[ResSkillConfigData.ATTR_PRICE];
                skillData.name = ResSkillConfigData.NAME[skillData.id - 1];
                ResSkillConfigData.dataDic.set(skillData.id, skillData);
            }
        };
        /**技能数量 */
        ResSkillConfigData.SKILL_NUM = 4;
        /**资源路径 */
        ResSkillConfigData.URL = "res/config/ResSkillConfigData.json";
        /**数据集合 */
        ResSkillConfigData.dataDic = new Laya.Dictionary();
        //数据属性定义
        ResSkillConfigData.ATTR_ID = "id";
        ResSkillConfigData.ATTR_URL_BIG_LOCK = "url_big_lock";
        ResSkillConfigData.ATTR_URL_BIG_UNLOCK = "url_big_unlock";
        ResSkillConfigData.ATTR_URL_SMALL_LOCK = "url_small_lock";
        ResSkillConfigData.ATTR_URL_SMALL_UNLOCK = "url_small_unlock";
        ResSkillConfigData.ATTR_PRICE = "price";
        ResSkillConfigData.ATTR_NAME = "name";
        ResSkillConfigData.NAME = ["闪电弹", "电锯", "速度降低", "僵尸群"];
        /**闪电技能 */
        ResSkillConfigData.SKILL_LIGHT = 1;
        /**电锯技能 */
        ResSkillConfigData.SKILL_SAW = 2;
        /**时间减速 */
        ResSkillConfigData.SKILL_TIME_SLOW = 3;
        /**生成僵尸数量翻倍 */
        ResSkillConfigData.SKILL_ZOMBIES = 4;
        /**是否加载完成 */
        ResSkillConfigData.isLoaded = false;
        return ResSkillConfigData;
    }());
    module.ResSkillConfigData = ResSkillConfigData;
})(module || (module = {}));
//# sourceMappingURL=ResSkillConfigData.js.map