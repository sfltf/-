!function() {
	"use strict";
	var index = 0;
    var DataPicker = {

    };

    

    var virtualDataPicker = {
        nowDate: new Date().getDate(), //当前天数
        nowYear: new Date().getFullYear(), //当前年份
        nowMonth: new Date().getMonth() + 1, //当前月份
        preDay: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate(), //上个月总天数
        nowDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(), //本月总天数
        firstDayWeakDay: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay(), //当月第一天对应周几
    };



    DataPicker.render = function(opt) {
        DataPicker.width = opt.width || 300;
        DataPicker.height = opt.height || 200;
        DataPicker.elm = opt.elm;
        ++index;

        var dayDate = [];
        
        var dataWH = function(width,height) {
        	if(DataPicker.width !== 300 || DataPicker.height !== 200) {

        	}
        }
        var dataDate = function(year, month) {

            if (year == "") {
                year = virtualDataPicker.nowYear;
            } else if (month == "") {
                month = virtualDataPicker.nowMonth;
            }

            var preDayNm = virtualDataPicker.firstDayWeakDay - 2;
            if (preDayNm >= 0) {
                for (var i = virtualDataPicker.preDay - preDayNm; i <= virtualDataPicker.preDay; i++) {
                    dayDate.push(i);
                }
            }

            for (var j = 1; j <= virtualDataPicker.nowDay; j++) {
                dayDate.push(j);
            }

            var nowDayDateNm = dayDate.length;

            for (var k = 1; k <= 42 - nowDayDateNm; k++) {
                dayDate.push(k);
            }

            return dayDate;
        }();
        var elem = function(e,i) {
        	
        }
        var init = function(year, mouth) {
            if (virtualDataPicker.nowMonth < 10) {
                var nowMonth1 = "0" + virtualDataPicker.nowMonth;
            }
            var CD = '<div class="ui-datapicker"></div>';
            var id = 'ui-datapicker' + index;
            document.body.innerHTML += CD;
            console.log(document.querySelector('.ui-datapicker'));
            document.querySelector('.ui-datapicker').setAttribute('id',id);
            
            setTimeout(function() {
            	console.log(document.querySelector("#ui-datapicker1"));
            },200)
            
            var htmlTop = '<div class="ui-datapicker-header">' +
                '<a href="javascript:;" class="ui-datapicker-btn ui-datapicker-preBtn">&lt;</a>' +
                '<span>' + virtualDataPicker.nowYear + '-' + nowMonth1 + '</span>' +
                '<a href="javascript:;" class="ui-datapicker-btn ui-datapicker-nextBtn">&gt;</a>' +
                '</div>';
          	console.log(document.querySelector('#ui-datapicker1'));
          	document.querySelector('#ui-datapicker' + index).innerHTML += htmlTop;
            var htmlBody =
                '<div class="ui-datapicker-body ui-datapicker-content">' +
                '<table>' +
                '<thead>' +
                '<tr>' +
                '<td>一</td>' +
                '<td>二</td>' +
                '<td>三</td>' +
                '<td>四</td>' +
                '<td>五</td>' +
                '<td>六</td>' +
                '<td>日</td>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '</tbody>' +
                '</table>' +
                '</div>';
            document.querySelector('#ui-datapicker' + index).innerHTML += htmlBody;
            var prePatchDay = virtualDataPicker.firstDayWeakDay - 1;
            console.log(prePatchDay);

            for (var i = 0; i < 7 * 6; i++) {
                if (i % 7 == 0) {
                    var tr = document.createElement("tr");
                    document.querySelector('tbody').appendChild(tr);
                }

                var td = document.createElement("td");
                
                var dateNode = document.createTextNode(dayDate[i]);
                td.appendChild(dateNode);
                tr.appendChild(td);

            }
        }() //初始化立即执行
        var preMonth = function(year,month) {

        }

        /*document.querySelector('.ui-datapicker-preBtn').addEventListener('click',preMonth,false);*/

    };
    window.DataPicker = DataPicker;
}();

/*var a = new DataPicker1({
	width: 200,
	height: 300,
	elm: "#dataPicker" //必要
});*/
DataPicker.render({
    elm: "#test1",
    width: 300,
    height: 200
})


console.log(DataPicker)

/*function Gadget(name,color) {
	this.name = name;
	this.color = color;
	this.whatAreYou = function() {
		return 'I am a ' + this.color + ' ' + this.name;
	}
}

Gadget('123','456');*/