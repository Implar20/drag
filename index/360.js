        var aLi = document.querySelectorAll('li');
        var aUl = document.querySelector('.nav');
        var oNavL = aUl.offsetLeft;
        var oNavT = aUl.offsetTop;
        var aPs = [];
        for (let i = 0, len = aLi.length; i < len; i ++) {
            aPs.push([aLi[i].offsetTop, aLi[i].offsetLeft]);
            setTimeout(function() {
                aLi[i].style.position = "absolute";
                aLi[i].style.top = aPs[i][0] + "px";
                aLi[i].style.left = aPs[i][1] + "px";
                aLi[i].style.margin = 0;
            }, 0)
        }

        aUl.addEventListener("mousedown", drag);
        document.addEventListener("mousemove",drag);
        document.addEventListener("mouseup",drag);

        var toggle = false; //开关
        var x1, y1, sX, sY, ele, z = 1, golEle = null;
        function drag(ev) {
            ev.preventDefault();
            switch(ev.type) {
                case "mousedown":
                    if (ev.target.parentNode.tagName === "LI") {
                        ele = ev.target.parentNode; //点中的li元素
                        //层级设置最高
                        ele.style.zIndex = z ++;
                        //点击li元素时鼠标的位置
                        x1 = ev.clientX;
                        y1 = ev.clientY;
                        //点击li元素时元素的位置
                        sX = ele.offsetLeft;
                        sY = ele.offsetTop;
                        toggle = true; 
                    }
                    break;
                case "mousemove":
                    if (toggle) {
                        //获取鼠标滑动的位置
                        var x2 = ev.clientX;
                        var y2 = ev.clientY;
                        //计算元素的新位置
                        var nowX = sX + x2 - x1;
                        var nowY = sY + y2 - y1;
                        //给元素设置新位置
                        ele.style.left = nowX + "px";
                        ele.style.top = nowY + "px";
                        var xr = x2 - oNavL;
                        var yr = y2 - oNavT;
                        for (var n = 0, len = aLi.length; n < len; n ++) {
                            aLi[n].style.transform = "";
                            if (ele != aLi[n] && xr > aLi[n].offsetLeft && xr < aLi[n].offsetLeft + 200 && yr > aLi[n].offsetTop && yr < aLi[n].offsetTop + 120) {
                                aLi[n].style.transform = "scale(1.05)";
                                golEle = aLi[n];
                            }
                        }
                    }
                    break;
                case "mouseup":
                    toggle = false;
                    if(golEle) {
                        ele.style.left = golEle.offsetLeft + "px";
                        ele.style.top = golEle.offsetTop + "px";
                        golEle.style.left = sX + "px";
                        golEle.style.top = sY + "px";
                        golEle.style.transform = "";
                        golEle = null;
                    } else {
                        ele.style.left = sX + "px";
                        ele.style.top = sY + "px";
                    }
                    break;
            }
        }