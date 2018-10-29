var module;
(function (module) {
    var Calculator = /** @class */ (function () {
        function Calculator() {
        }
        //获取一个矩形对象四个角的坐标
        //center 坐标是否是矩形中心点
        Calculator.GetRecPoint = function (comp) {
            var xDir = 1;
            if (-1 == comp.scaleX) {
                xDir = -1;
            }
            //根据中心点计算旋转前的坐标
            var A = new laya.maths.Point(comp.x - comp.pivotX, comp.y - comp.pivotY);
            var B = new laya.maths.Point(A.x + comp.width * xDir, A.y);
            var C = new laya.maths.Point(A.x, A.y + comp.height);
            var D = new laya.maths.Point(A.x + comp.width * xDir, A.y + comp.height);
            var roatation = comp.rotation;
            //根据pivot坐标旋转后的4角坐标
            var rA = new laya.maths.Point(Calculator.CalXRoatation(A.x, A.y, comp.x, comp.y, roatation), Calculator.CalYRoatation(A.x, A.y, comp.x, comp.y, roatation));
            var rB = new laya.maths.Point(Calculator.CalXRoatation(B.x, B.y, comp.x, comp.y, roatation), Calculator.CalYRoatation(B.x, B.y, comp.x, comp.y, roatation));
            var rC = new laya.maths.Point(Calculator.CalXRoatation(C.x, C.y, comp.x, comp.y, roatation), Calculator.CalYRoatation(C.x, C.y, comp.x, comp.y, roatation));
            var rD = new laya.maths.Point(Calculator.CalXRoatation(D.x, D.y, comp.x, comp.y, roatation), Calculator.CalYRoatation(D.x, D.y, comp.x, comp.y, roatation));
            var result = new Array();
            result.push(rA, rB, rD, rC);
            return result;
        };
        Calculator.CalXRoatation = function (x, y, pivotX, pivotY, roatation) {
            return Math.round((x - pivotX) * Math.cos(roatation / 180 * Math.PI) - (y - pivotY) * Math.sin(roatation / 180 * Math.PI) + pivotX);
        };
        Calculator.CalYRoatation = function (x, y, pivotX, pivotY, roatation) {
            return Math.round(((x - pivotX) * Math.sin(roatation / 180 * Math.PI) + (y - pivotY) * Math.cos(roatation / 180 * Math.PI) + pivotY));
        };
        //true:相交
        //false:不相交
        Calculator.SATCollide = function (recA, recB) {
            var dirAArray = Calculator._CalDir(recA);
            for (var i = 0; i < dirAArray.length; i++) {
                var axis = Calculator._Normalize(dirAArray[i]);
                //计算投影
                var dotA = Calculator._GetDotRange(recA, axis);
                var dotB = Calculator._GetDotRange(recB, axis);
                if (false == Calculator._CheckOverlap(dotA, dotB)) {
                    return false;
                }
            }
            var dirBArray = Calculator._CalDir(recB);
            for (var i = 0; i < dirBArray.length; i++) {
                var axis = Calculator._Normalize(dirBArray[i]);
                //计算投影
                var dotA = Calculator._GetDotRange(recA, axis);
                var dotB = Calculator._GetDotRange(recB, axis);
                if (false == Calculator._CheckOverlap(dotA, dotB)) {
                    return false;
                }
            }
            return true;
        };
        //计算每条边的法向量
        Calculator._CalDir = function (pointArr) {
            var result = new Array();
            for (var i = 0; i < pointArr.length - 1; i++) {
                var dir = new laya.maths.Point(pointArr[i + 1].y - pointArr[i].y, pointArr[i].x - pointArr[i + 1].x);
                result.push(dir);
            }
            var dir = new laya.maths.Point(pointArr[0].y - pointArr[pointArr.length - 1].y, pointArr[pointArr.length - 1].x - pointArr[0].x);
            result.push(dir);
            return result;
        };
        Calculator._Normalize = function (dir) {
            var mag = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
            return new laya.maths.Point(dir.x / mag, dir.y / mag);
        };
        Calculator._GetDotRange = function (pointArr, axis) {
            var min = pointArr[0].x * axis.x + pointArr[0].y * axis.y;
            var max = min;
            for (var i = 0; i < pointArr.length; i++) {
                var proj = pointArr[i].x * axis.x + pointArr[i].y * axis.y;
                if (proj < min) {
                    min = proj;
                }
                if (proj > max) {
                    max = proj;
                }
            }
            var result = new Array();
            if (min > max) {
                var tmp = min;
                min = max;
                max = tmp;
            }
            result.push(min);
            result.push(max);
            return result;
        };
        Calculator._CheckOverlap = function (rangeA, rangeB) {
            if (rangeA[0] >= rangeB[0] && rangeA[0] <= rangeB[1]) {
                return true;
            }
            if (rangeA[1] >= rangeB[0] && rangeA[1] <= rangeB[1]) {
                return true;
            }
            if (rangeB[0] >= rangeA[0] && rangeB[0] <= rangeA[1]) {
                return true;
            }
            if (rangeB[1] >= rangeA[0] && rangeB[1] <= rangeA[1]) {
                return true;
            }
            return false;
        };
        Calculator.getPointByRotate = function (spos, rotate, length) {
            if (length === void 0) { length = 100; }
            var epos = new laya.maths.Point();
            epos.x = spos.x + Math.cos(rotate / 180 * Math.PI - Math.PI / 2) * length;
            epos.y = spos.y + Math.sin(rotate / 180 * Math.PI - Math.PI / 2) * length;
            return epos;
        };
        return Calculator;
    }());
    module.Calculator = Calculator;
})(module || (module = {}));
//# sourceMappingURL=Calculator.js.map