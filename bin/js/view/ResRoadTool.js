/**
* name
*/
var module;
(function (module) {
    var ResRoadTool = /** @class */ (function () {
        function ResRoadTool() {
        }
        /**获取禁用方向 */
        ResRoadTool.getDisableDir = function (curDir, curRoadID) {
            switch (curRoadID) {
                case "begin0_rotation0":
                case "begin1_rotation0":
                case "s_rotation0":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_UP) {
                            return module.ResRoadConfigData.RELATIVE_DOWN;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_DOWN) {
                            return module.ResRoadConfigData.RELATIVE_UP;
                        }
                    }
                case "s_rotation90":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_LEFT) {
                            return module.ResRoadConfigData.RELATIVE_RIGHT;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_RIGHT) {
                            return module.ResRoadConfigData.RELATIVE_LEFT;
                        }
                    }
                case "turn90_rotation0":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_LEFT) {
                            return module.ResRoadConfigData.RELATIVE_RIGHT;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_DOWN) {
                            return module.ResRoadConfigData.RELATIVE_UP;
                        }
                    }
                case "turn90_rotation90":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_UP) {
                            return module.ResRoadConfigData.RELATIVE_DOWN;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_LEFT) {
                            return module.ResRoadConfigData.RELATIVE_RIGHT;
                        }
                    }
                case "turn90_rotation180":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_UP) {
                            return module.ResRoadConfigData.RELATIVE_DOWN;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_RIGHT) {
                            return module.ResRoadConfigData.RELATIVE_LEFT;
                        }
                    }
                case "turn90_rotation270":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_DOWN) {
                            return module.ResRoadConfigData.RELATIVE_UP;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_RIGHT) {
                            return module.ResRoadConfigData.RELATIVE_LEFT;
                        }
                    }
                case "turn45_rotation0":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_RIGHT_UP) {
                            return module.ResRoadConfigData.RELATIVE_LEFT_DOWN;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_DOWN) {
                            return module.ResRoadConfigData.RELATIVE_UP;
                        }
                    }
                case "turn45_rotation90":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_RIGHT_DOWN) {
                            return module.ResRoadConfigData.RELATIVE_LEFT_UP;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_LEFT) {
                            return module.ResRoadConfigData.RELATIVE_RIGHT;
                        }
                    }
                case "turn45_rotation180":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_UP) {
                            return module.ResRoadConfigData.RELATIVE_DOWN;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_LEFT_DOWN) {
                            return module.ResRoadConfigData.RELATIVE_RIGHT_UP;
                        }
                    }
                case "turn45_rotation270":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_RIGHT) {
                            return module.ResRoadConfigData.RELATIVE_LEFT;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_LEFT_UP) {
                            return module.ResRoadConfigData.RELATIVE_RIGHT_DOWN;
                        }
                    }
                case "side_rotation0":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_RIGHT_UP) {
                            return module.ResRoadConfigData.RELATIVE_LEFT_DOWN;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_LEFT_DOWN) {
                            return module.ResRoadConfigData.RELATIVE_RIGHT_UP;
                        }
                    }
                case "side_rotation90":
                    {
                        if (curDir == module.ResRoadConfigData.RELATIVE_RIGHT_DOWN) {
                            return module.ResRoadConfigData.RELATIVE_LEFT_UP;
                        }
                        else if (curDir == module.ResRoadConfigData.RELATIVE_LEFT_UP) {
                            return module.ResRoadConfigData.RELATIVE_RIGHT_DOWN;
                        }
                    }
            }
            return "error";
        };
        /**数据key集合 */
        ResRoadTool.DATA_KEY = [
            "begin0_rotation0", "begin1_rotation0",
            "s_rotation0", "s_rotation90",
            "turn90_rotation0", "turn90_rotation90", "turn90_rotation180", "turn90_rotation270",
            "turn45_rotation0", "turn45_rotation90", "turn45_rotation180", "turn45_rotation270",
            "side_rotation0", "side_rotation90"
        ];
        return ResRoadTool;
    }());
    module.ResRoadTool = ResRoadTool;
})(module || (module = {}));
//# sourceMappingURL=ResRoadTool.js.map