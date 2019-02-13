!(function() {

    var Calendar = {

    };

    function CD() {
        this.index = 0;
        this.week = ['一', '二', '三', '四', '五', '六', '日'];
        this.elemArr = [];
        this.elemObj = [];
    }



    // 日期框位置（跟随input框）
    CD.prototype.position = function(elem) {
        var marginL = document.querySelector(this.elem).offsetLeft;
        var marginT = document.querySelector(this.elem).offsetTop;
        var inputW = document.querySelector(this.elem).offsetWidth;
        var inputH = document.querySelector(this.elem).offsetHeight;
        document.querySelector(elem).style.left = marginL + 'px';
        document.querySelector(elem).style.top = marginT + inputH + 'px';
        return this;
    }

    /*
     * type: 标签的类型 
     * className 标签元素所拥有的属性
     * father 标签的父元素 
     * textNode 标签的文本类容
     * index1 为了让节点更精确（对于一个页面有多个日期框的情况，知道当前input框对应的是哪个日期框很重要）
     * number 针对某些标签是数组的情况
     * addStyle 添加标签的方式 (默认appendChild)
     * siblingTag 要添加的兄弟标签
     */
    CD.prototype.elems = function(type, className, father, textNode, index1, number, addStyle, siblingTag) {
        var tag = document.createElement(type);
        // 节点属性添加
        var addS = addStyle ? addStyle : 1;
        var siblingTag = siblingTag ? siblingTag : '';
        if (className) {
            if (typeof className == 'object') {
                Object.keys(className).forEach(function(item, index) {
                    tag.setAttribute(item, className[item]);
                })
            } else {
                throw new Error('请输入对象');
            }
        }
        // 文本节点添加
        if (textNode) {
            var tagNode = document.createTextNode(textNode);
            tag.appendChild(tagNode);
        }
        // 元素节点添加

        switch (addS) {
            case 1:
                if (index1) {
                    document.querySelector('#ui-datapicker' + index1 + ' ' + father).appendChild(tag);
                } else if (number) {
                    document.querySelectorAll(father)[number].appendChild(tag);
                } else {
                    document.querySelector(father).appendChild(tag);
                }
                break;
            case 2:
                if (index1) {
                    document.querySelector('#ui-datapicker' + index1 + ' ' + father).insertBefore(tag, document.querySelector(siblingTag));
                } else if (number) {
                    document.querySelectorAll(father)[number].insertBefore(tag, document.querySelector(siblingTag));
                } else {
                    document.querySelector(father).insertBefore(tag, document.querySelector(siblingTag));
                }
                break;
        }


        return this;
    }

    // 日期初始化
    CD.prototype.init = function() {
        this.nowYear = new Date().getFullYear();
        this.nowMonth = new Date().getMonth() + 1;
        this.elems('div', { 'class': 'ui-datapicker', 'id': 'ui-datapicker' + this.index }, 'body');
        var uid = '#ui-datapicker' + this.index;
        this.position(uid);
        this.elems('div', { 'class': 'ui-datapicker-header' }, '#ui-datapicker' + this.index);
        this.elems('a', { 'class': 'ui-datapicker-btn ui-datapicker-preYBtn', 'href': 'javascript:;' }, '.ui-datapicker-header', '<<', this.index);
        this.elems('a', { 'class': 'ui-datapicker-btn ui-datapicker-preBtn', 'href': 'javascript:;' }, '.ui-datapicker-header', '<', this.index);
        this.elems('a', { 'class': 'ui-datapicker-btn ui-datapicker-nextBtn', 'href': 'javascript:;' }, '.ui-datapicker-header', '>', this.index);
        this.elems('a', { 'class': 'ui-datapicker-btn ui-datapicker-nextYBtn', 'href': 'javascript:;' }, '.ui-datapicker-header', '>>', this.index);
        this.elems('div', { 'class': 'ui-datapicker-content' }, '#ui-datapicker' + this.index);
        this.elems('table', {}, '.ui-datapicker-content', '', this.index);
        this.elems('thead', {}, 'table', '', this.index);
        this.elems('tr', {}, 'thead', '', this.index);
        for (var i = 0; i < 7; i++) {
            this.elems('td', {}, 'tr', this.week[i], this.index);
        }

        this.elems('tbody', {}, 'table', '', this.index);
        var number = -1;
        for (var i = 0; i < 6 * 7; i++) {
            if (i % 7 == 0) {
                ++number;
                this.elems('tr', {}, 'tbody', '', this.index);
            }
            this.elems('td', {}, '#ui-datapicker' + this.index + ' tbody tr', '', '', number);
            document.querySelectorAll('#ui-datapicker' + this.index + ' tbody tr')[number];

        }
        return this;
    }

    // 日期数组
    CD.prototype.dateArray = function(year, month) {
        var dayDate = [];
        var currentYear = year ? year : new Date().getFullYear();
        var currentMonth = month ? month : new Date().getMonth() + 1;
        var currentDate = new Date().getDate(); //当前日期
        var currentPreDay = new Date(currentYear, currentMonth - 1, 0).getDate(); //上个月总天数
        var currentDay = new Date(currentYear, currentMonth, 0).getDate(); //当月总天数
        var currentFirstDayWeakDay = new Date(currentYear, currentMonth - 1, 1).getDay(); //当月第一天对应星期几
        // 上个月应有天数
        var preDayNm = currentFirstDayWeakDay - 2;
        if (preDayNm >= 0) {
            for (var i = currentPreDay - preDayNm; i <= currentPreDay; i++) {
                dayDate.push(i);
            }
        }
        //本月
        for (var i = 1; i <= currentDay; i++) {
            dayDate.push(i);
        }
        //已存在天数
        var nowDayDateNm = dayDate.length;

        //下月
        for (var i = 1; i <= 6 * 7 - nowDayDateNm; i++) {
            dayDate.push(i);
        }

        Array.prototype.slice.call(document.querySelectorAll('#ui-datapicker' + this.index + ' td')).forEach(function(item, index) {
            if (index > 6) {
                item.innerHTML = dayDate[index - 7];
                item.setAttribute('data-day', currentYear + '-' + currentMonth + '-' + dayDate[index - 7]);
            }
            // 换页去除相应class
            try {
                item.classList.remove('ui-datapicker-grayFont');
                item.classList.remove('ui-datapicker-nowBg');
            } catch (e) {}

            if (preDayNm >= 0) {
                if (index > 6 && index <= 7 + preDayNm) {
                    item.classList.add('ui-datapicker-grayFont');
                    item.setAttribute('data-day', currentYear + '-' + (currentMonth - 1) + '-' + dayDate[index - 7]);
                }
            }


            if (index > 6 + nowDayDateNm) {
                item.classList.add('ui-datapicker-grayFont');
                item.setAttribute('data-day', currentYear + '-' + (currentMonth + 1) + '-' + dayDate[index - 7]);
            }

            if (item.innerHTML == currentDate) {
                if (item.className == '') {
                    item.classList.add('ui-datapicker-nowBg');
                }

            }

        })
    }

    // 日期传值
    CD.prototype.passValue = function(year, month) {
        //日期传值
        this.elems('span', {}, '.ui-datapicker-header', this.nowYear + '年' + this.nowMonth + '月', this.index, '', 2, '#ui-datapicker' + this.index + ' .ui-datapicker-nextBtn');
        return this;
    }

    CD.prototype.bindEvents = function() {
        document.querySelector('#ui-datapicker' + this.index + ' .ui-datapicker-preYBtn').addEventListener('click', this.reduceYear.bind(this), false);
        document.querySelector('#ui-datapicker' + this.index + ' .ui-datapicker-nextYBtn').addEventListener('click', this.addYear.bind(this), false);
        document.querySelector('#ui-datapicker' + this.index + ' .ui-datapicker-preBtn').addEventListener('click', this.reduceMonth.bind(this), false);
        document.querySelector('#ui-datapicker' + this.index + ' .ui-datapicker-nextBtn').addEventListener('click', this.addMonth.bind(this), false);
    }

    CD.prototype.reduceYear = function() {
        --this.nowYear;
        this.dateArray(this.nowYear, this.nowMonth);
        document.querySelector('#ui-datapicker' + this.index + ' .ui-datapicker-header span').innerHTML = this.nowYear + '年' + this.nowMonth + '月';
    }

    CD.prototype.addYear = function() {
        ++this.nowYear;
        this.dateArray(this.nowYear, this.nowMonth);
        document.querySelector('#ui-datapicker' + this.index + ' .ui-datapicker-header span').innerHTML = this.nowYear + '年' + this.nowMonth + '月';
    }

    CD.prototype.reduceMonth = function(year, Month) {
        --this.nowMonth;
        if (this.nowMonth < 1) {
            this.nowMonth = 12;
            --this.nowYear;
        }
        this.dateArray(this.nowYear, this.nowMonth);
        document.querySelector('#ui-datapicker' + this.index + ' .ui-datapicker-header span').innerHTML = this.nowYear + '年' + this.nowMonth + '月';
    }

    CD.prototype.addMonth = function(year, Month) {
        ++this.nowMonth;
        if (this.nowMonth > 12) {
            this.nowMonth = 1;
            ++this.nowYear;
        }
        this.dateArray(this.nowYear, this.nowMonth);
        document.querySelector('#ui-datapicker' + this.index + ' .ui-datapicker-header span').innerHTML = this.nowYear + '年' + this.nowMonth + '月';
    }

    CD.prototype.remove = function(elem) {
        document.querySelector('body').removeChild(elem);
    }

    // 对象或数组拷贝
    function deepClone(source) {
        // 递归终止条件
        if (!source || typeof source !== 'object') {
            return source;
        }
        var targetObj = source.constructor === Array ? [] : {};
        for (var key in source) {
            if (source[key] && typeof source[key] === 'object') {
                targetObj[key] = deepClone(source[key]);
            } else {
                targetObj[key] = source[key];
            }

        }
        return targetObj;
    }

    CD.prototype.render = function(opt) {
        ++this.index;
        Calendar.elem = opt.elem;
        this.elemArr.push(Calendar.elem);
        this.elemObj.push(deepClone(this));
        console.log(this.elemObj);
        this.dateArray();
        var self1 = this;
        document.querySelector(Calendar.elem).onfocus = function() {
            var self = this;
            try {
                Array.prototype.slice.call(document.querySelectorAll('.ui-datapicker')).forEach(function(item, index) {
                    document.querySelector('body').removeChild(item);
                })
            } catch (e) {}
            var id = this.id;
            self1.elemArr.forEach(function(item, index) {
                if (item.replace('#', '') == id) {
                    if (!document.querySelector('#ui-datapicker' + self1.elemObj[index].index)) {
                        self1.elemObj[index].init();
                        self1.elemObj[index].passValue();
                        self1.elemObj[index].bindEvents();
                        self1.elemObj[index].dateArray();
                        Array.prototype.slice.call(document.querySelectorAll('#ui-datapicker' + self1.elemObj[index].index + ' tbody' + ' td')).forEach(function(item) {
                            item.onclick = function() {
                                self.value = this.getAttribute('data-day');
                                //document.querySelector('body').removeChild(document.querySelector('#ui-datapicker' + elemObj[index].index))
                                self1.remove(document.querySelector('#ui-datapicker' + self1.elemObj[index].index));
                            }
                        })
                    }

                }
            })
        }
    }



    Calendar = new CD();
    window.Calendar = Calendar; //暴露接口
})()

Calendar.render({
    elem: '#test1'
});

Calendar.render({
    elem: '#test2'
});

Calendar.render({
    elem: '#test4'
});