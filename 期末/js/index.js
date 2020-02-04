// 當網頁內容載入至記憶體後執行
$(() => {
    var rand = (start, end) => {
        // 決定範圍
        var n = Math.abs(end - start) + 1

        // 放大 n 倍
        var r = Math.random() * n

        // 去除小數點
        r = Math.floor(r)

        // 做位移
        r = r + ((start <= end) ? start : end)

        return r
    }

    // 在畫面中產生一張值為 v 的撲克牌
    var dealCard = (v) => {

        var point = Math.floor(v / 4)
        var color = v % 4

        $img = $('<img>').attr('class', 'image')
            .attr('src', './poker/back.png')
            .attr('poker-value', v)
            .attr('poker-point', point)
            .attr('poker-color', color)

        $img.on('click', function() {
            var val = (+$(this).attr('poker-value')) + 1

            $(this).attr('src', './poker/pic' + val + '.png')
        })

        $col = $('<div>').attr('class', 'col').append($img)

        $('#data').append($col)
    }

    // 發五張牌
    var dealFive = () => {

        // 產成 52張新的撲克牌 ====================
        // 撲克牌值的編號為 0~51
        var allPoker = []
        for (var i = 0; i <= 51; i++) {
            allPoker.push(i)
        }
        //========================================

        // 洗牌 ==================================
        var n = rand(100, 500)
        for (var i = 0; i < n; i++) {
            var r = rand(0, 51)
            var temp = allPoker[r]
            allPoker[r] = allPoker[0]
            allPoker[0] = temp
        }

        //========================================

        // 將前五張牌顯示在畫面上
        for (var i = 0; i < 5; i++) {
            dealCard(allPoker[i])
        }
    }

    // 使用者按下發牌按鈕
    $('#deal').on('click', function() {
        // 發牌前先把桌面清空
        $('#data').empty()

        // 發牌
        dealFive()
    })

    // 複製陣列
    var ArrayClone = (array) => {
        var returnArray = []
        for (let i = 0; i < array.length; i++) {
            returnArray.push(array[i])
        }
        return returnArray
    }

    // 判斷牌型是否為順子
    var checkStraight = (point) => {
        // 對點數做排序
        point.sort();

        var isStraight = true
        for (let i = 1; i < point.length; i++) {
            if (point[i] - point[i - 1] != 1) {
                isStraight = false
                break
            }
        }
        return isStraight
    }

    // 使用者按下判斷牌型
    $('#check').on('click', function() {
        var color = ['梅花', '方塊', '愛心', '黑桃']
        var point = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']


        // 取得目前撲克牌的值、點數及花色
        var poker = []
        var poker_point = []
        var poker_color = []
        poker_imglist = $('img.image')
        for (let i = 0; i < poker_imglist.length; i++) {
            let $img = $(poker_imglist[i]);
            poker.push(+$img.attr('poker-value'))
            poker_point.push(+$img.attr('poker-point'))
            poker_color.push(+$img.attr('poker-color'))
        }

        // 對點數出現的次數做統計
        var point_count = []
        for (let i = 0; i < 13; i++) {
            point_count.push(0)
        }
        for (let i = 0; i < poker_point.length; i++) {
            point_count[poker_point[i]]++
        }

        // 對花色出現的次數做統計
        var color_count = []
        for (let i = 0; i < 4; i++) {
            color_count.push(0)
        }
        for (let i = 0; i < poker_color.length; i++) {
            color_count[poker_color[i]]++
        }

        // 對點數出現次數做排序 (大到小)
        var point_count_sort = ArrayClone(point_count)
        point_count_sort.sort();
        point_count_sort.reverse();

        // 對點數出現次數做排序 (大到小)
        var color_count_sort = ArrayClone(color_count)
        color_count_sort.sort();
        color_count_sort.reverse();

        var str = ''

        // 判斷是否同花
        var isFlush = false
        if (color_count_sort[0] == 5) {
            isFlush = true
            str += '同花 '
        }

        // 判斷是否是鐵支
        if (point_count_sort[0] == 4) {
            str += '鐵支 '
        }

        // 判斷是否是葫蘆
        if (point_count_sort[0] == 3 &&
            point_count_sort[1] == 2) {
            str += '葫蘆 '
        }
        // 判斷是否是三條
        if (point_count_sort[0] == 3 &&
            point_count_sort[1] == 1) {
            str += '三條 '
        }
        // 判斷是否是兩對
        if (point_count_sort[0] == 2 &&
            point_count_sort[1] == 2) {
            str += '兩對 '
        }
        // 判斷是否是一對
        if (point_count_sort[0] == 2 &&
            point_count_sort[1] == 1) {
            str += '一對 '
        }
        // 判斷是否是散牌
        if (point_count_sort[0] == 1 &&
            point_count_sort[1] == 1 &&
            point_count_sort[2] == 1 &&
            point_count_sort[3] == 1 &&
            point_count_sort[4] == 1) {
            // 判斷順子

            str += '散牌或順子未知 '
        }
        console.dir(point_count_sort)



        for (let i = 0; i < poker.length; i++) {
            str += color[poker_color[i]]
            str += point[poker_point[i]]
            str += ' '
        }

        $('#output').val(str)




        // console.dir(poker_point)
        // console.dir(poker_color)
    })

    $('#data').empty()
})