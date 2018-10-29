/**
* name
*/
var module;
(function (module) {
    var ResRoadProbilityData = /** @class */ (function () {
        function ResRoadProbilityData() {
            //--------------------------------static over--------------------------------//	
            /**二维字典  字典中存储字典2*2 */
            this.probabilityDic = new Laya.Dictionary();
        }
        /**
         * 通过游戏进行时间获取概率分布数据
         * @param time 时间 秒
         */
        ResRoadProbilityData.getDataByCurTime = function (time) {
            var data;
            if (time >= ResRoadProbilityData.TIME_500) {
                data = this.dataDic.get("500");
            }
            else if (time >= ResRoadProbilityData.TIME_300) {
                data = this.dataDic.get("300");
            }
            else if (time >= ResRoadProbilityData.TIME_200) {
                data = this.dataDic.get("200");
            }
            else if (time >= ResRoadProbilityData.TIME_100) {
                data = this.dataDic.get("100");
            }
            else if (time >= ResRoadProbilityData.TIME_50) {
                data = this.dataDic.get("50");
            }
            else if (time >= ResRoadProbilityData.TIME_10) {
                data = this.dataDic.get("10");
            }
            else {
                data = this.dataDic.get("0");
            }
            return data;
        };
        ResRoadProbilityData.onLoadComplete = function () {
            if (ResRoadProbilityData.isLoaded) {
                return;
            }
            ResRoadProbilityData.isLoaded = true;
            var resource = Laya.loader.getRes(ResRoadProbilityData.URL);
            for (var i = 0; i < ResRoadProbilityData.DATA_KEY.length; i++) {
                var configData = resource[ResRoadProbilityData.DATA_KEY[i]];
                var data = new ResRoadProbilityData();
                var cur_s_dic = new Laya.Dictionary();
                cur_s_dic.set(ResRoadProbilityData.ATTR_NEXT_C, configData[ResRoadProbilityData.ATTR_CUR_S][ResRoadProbilityData.ATTR_NEXT_C]);
                cur_s_dic.set(ResRoadProbilityData.ATTR_NEXT_S, configData[ResRoadProbilityData.ATTR_CUR_S][ResRoadProbilityData.ATTR_NEXT_S]);
                var cur_c_dic = new Laya.Dictionary();
                cur_c_dic.set(ResRoadProbilityData.ATTR_NEXT_C, configData[ResRoadProbilityData.ATTR_CUR_C][ResRoadProbilityData.ATTR_NEXT_C]);
                cur_c_dic.set(ResRoadProbilityData.ATTR_NEXT_S, configData[ResRoadProbilityData.ATTR_CUR_C][ResRoadProbilityData.ATTR_NEXT_S]);
                data.probabilityDic.set(ResRoadProbilityData.ATTR_CUR_S, cur_s_dic);
                data.probabilityDic.set(ResRoadProbilityData.ATTR_CUR_C, cur_c_dic);
                ResRoadProbilityData.dataDic.set(ResRoadProbilityData.DATA_KEY[i], data);
            }
        };
        /**资源路径 */
        ResRoadProbilityData.URL = "res/config/ResRoadProbabilityData.json";
        /**数据集合 */
        ResRoadProbilityData.dataDic = new Laya.Dictionary();
        ResRoadProbilityData.ATTR_CUR_S = "cur_s";
        ResRoadProbilityData.ATTR_CUR_C = "cur_c";
        ResRoadProbilityData.ATTR_NEXT_S = "next_s";
        ResRoadProbilityData.ATTR_NEXT_C = "next_c";
        ResRoadProbilityData.TIME_0 = 0;
        ResRoadProbilityData.TIME_10 = 10;
        ResRoadProbilityData.TIME_50 = 50;
        ResRoadProbilityData.TIME_100 = 100;
        ResRoadProbilityData.TIME_200 = 200;
        ResRoadProbilityData.TIME_300 = 300;
        ResRoadProbilityData.TIME_500 = 500;
        ResRoadProbilityData.DATA_KEY = [
            "0", "10", "50", "100", "200", "300", "500"
        ];
        /**是否加载完成 */
        ResRoadProbilityData.isLoaded = false;
        return ResRoadProbilityData;
    }());
    module.ResRoadProbilityData = ResRoadProbilityData;
})(module || (module = {}));
//# sourceMappingURL=ResRoadProbilityData.js.map