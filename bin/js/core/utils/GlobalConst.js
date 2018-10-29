/**方向 */
var DIRECTION;
(function (DIRECTION) {
    /**正上 */
    DIRECTION[DIRECTION["UP"] = 0] = "UP";
    /**正下 */
    DIRECTION[DIRECTION["DOWN"] = 1] = "DOWN";
    /**左 */
    DIRECTION[DIRECTION["LEFT"] = 2] = "LEFT";
    /**右 */
    DIRECTION[DIRECTION["RIGHT"] = 3] = "RIGHT";
    /**左上 */
    DIRECTION[DIRECTION["LEFT_UP"] = 4] = "LEFT_UP";
    /**左下 */
    DIRECTION[DIRECTION["LEFT_DOW"] = 5] = "LEFT_DOW";
    /**右上 */
    DIRECTION[DIRECTION["RIGHT_UP"] = 6] = "RIGHT_UP";
    /**右下 */
    DIRECTION[DIRECTION["RIGHT_DOWN"] = 7] = "RIGHT_DOWN";
})(DIRECTION || (DIRECTION = {}));
/**数字布尔值 */
var BOOLEAN;
(function (BOOLEAN) {
    BOOLEAN[BOOLEAN["FALSE"] = 0] = "FALSE";
    BOOLEAN[BOOLEAN["TRUE"] = 1] = "TRUE";
})(BOOLEAN || (BOOLEAN = {}));
/**旋转 */
var ROTATION;
(function (ROTATION) {
    ROTATION[ROTATION["NONE"] = 0] = "NONE";
    ROTATION[ROTATION["ROTATE_90"] = 1] = "ROTATE_90";
    ROTATION[ROTATION["ROTATE_180"] = 2] = "ROTATE_180";
    ROTATION[ROTATION["ROTATE_270"] = 3] = "ROTATE_270";
})(ROTATION || (ROTATION = {}));
/**道路类型 */
var ROAD_STYLE;
(function (ROAD_STYLE) {
    ROAD_STYLE[ROAD_STYLE["STYLE0"] = 0] = "STYLE0";
    ROAD_STYLE[ROAD_STYLE["STYLE1"] = 1] = "STYLE1";
    ROAD_STYLE[ROAD_STYLE["STYLE2"] = 2] = "STYLE2";
    ROAD_STYLE[ROAD_STYLE["STYLE3"] = 3] = "STYLE3";
    ROAD_STYLE[ROAD_STYLE["STYLE4"] = 4] = "STYLE4";
    ROAD_STYLE[ROAD_STYLE["STYLE5"] = 5] = "STYLE5";
})(ROAD_STYLE || (ROAD_STYLE = {}));
/**道路特性 */
var ROAD_ATTR;
(function (ROAD_ATTR) {
    /**开始第一块路 0 */
    ROAD_ATTR[ROAD_ATTR["BEGIN0"] = 0] = "BEGIN0";
    /**开始第二块路 1*/
    ROAD_ATTR[ROAD_ATTR["BEGIN1"] = 1] = "BEGIN1";
    /**结束路段 2*/
    ROAD_ATTR[ROAD_ATTR["END"] = 2] = "END";
    /**普通路段 3*/
    ROAD_ATTR[ROAD_ATTR["NORMAL"] = 3] = "NORMAL";
})(ROAD_ATTR || (ROAD_ATTR = {}));
//# sourceMappingURL=GlobalConst.js.map