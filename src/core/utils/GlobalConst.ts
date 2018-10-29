/**方向 */
enum DIRECTION{
    /**正上 */
    UP,
    /**正下 */
    DOWN,
    /**左 */
    LEFT,
    /**右 */
    RIGHT,
    /**左上 */
    LEFT_UP,
    /**左下 */
    LEFT_DOW,
    /**右上 */
    RIGHT_UP,
    /**右下 */
    RIGHT_DOWN
}
    
/**数字布尔值 */
enum BOOLEAN{
    FALSE,
    TRUE
}


/**旋转 */
enum ROTATION{
    NONE,
    ROTATE_90,
    ROTATE_180,
    ROTATE_270
}

/**道路类型 */
enum ROAD_STYLE{
    STYLE0,
    STYLE1,
    STYLE2,
    STYLE3,
    STYLE4,
    STYLE5
}

/**道路特性 */
enum ROAD_ATTR{
    /**开始第一块路 0 */
    BEGIN0,
    /**开始第二块路 1*/
    BEGIN1,
    /**结束路段 2*/
    END,
    /**普通路段 3*/
    NORMAL
}
