$(()=>{
    // $('#thinking').on('click',function(){
    //     $('#card1').attr('class','image1 visible');
    //     $('#card2').attr('class','image2 visible');
    //     $('#card3').attr('class','image3 visible');
    //     $('#card4').attr('class','image4 visible');
    //     $('#card5').attr('class','image5 visible');
    // });
    // food = ['pizza','三明治','小火鍋','牛肉麵','自助餐','沙拉','咖哩飯','泡麵','便當','烏龍麵','乾麵','御飯糰','速食套餐','微波食品','義大利麵','壽司','滷肉飯','關東煮','麵包'];
    
    // let random1 = (Math.floor(Math.random()*100))%19;
    // let random2 = (Math.floor(Math.random()*100))%19;
    // let random3 = (Math.floor(Math.random()*100))%19;
    // let random4 = (Math.floor(Math.random()*100))%19;
    // let random5 = (Math.floor(Math.random()*100))%19;
    // let firstFood = food[random1];
    // let secondFood = food[random2];
    // let thirdFood = food[random3];
    // let forthFood = food[random4];
    // let fifthFood = food[random5];

    // $('#card1').on('click',function(){
    //     $(this).attr('src','./pic/card/'+firstFood+'.png')
    // });
    // $('#card2').on('click',function(){
    //     $(this).attr('src','./pic/card/'+secondFood+'.png')
    // });
    // $('#card3').on('click',function(){
    //     $(this).attr('src','./pic/card/'+thirdFood+'.png')
    // });
    // $('#card4').on('click',function(){
    //     $(this).attr('src','./pic/card/'+forthFood+'.png')
    // });
    // $('#card5').on('click',function(){
    //     $(this).attr('src','./pic/card/'+fifthFood+'.png')
    // });

    food = ['pizza','三明治','小火鍋','牛肉麵','自助餐','沙拉','咖哩飯','泡麵','便當','烏龍麵','乾麵','御飯糰','速食套餐','微波食品','義大利麵','壽司','滷肉飯','關東煮','麵包'];

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

    // 在畫面中產生一張食物卡片
    var dealCard = (v,i) => {

        

        $img = $('<img>').attr('class', 'image'+i)
            .attr('src', './pic/back.png')
            .attr('id', 'card'+i)
            
        $img.on('click', function() {
            

            $(this).attr('src', './pic/card/' + food[v] + '.png')
        })

        $col = $('<div>').attr('class', 'col').append($img)

        $('#start').append($col)
    }

    // 發五張牌
    var dealFive = () => {

        
        // 牌值的編號為 0~18
        var allPoker = []
        for (var i = 0; i <= 18; i++) {
            allPoker.push(i)
        }
        //========================================

        // 洗牌 ==================================
        var n = rand(100, 500)
        for (var i = 0; i < n; i++) {
            var r = rand(0, 18)
            var temp = allPoker[r]
            allPoker[r] = allPoker[0]
            allPoker[0] = temp
        }

        //========================================

        // 將前五張牌顯示在畫面上
        for (var i = 0; i < 5; i++) {
            dealCard(allPoker[i],i+1)
        }
    }
    // 使用者按下發牌按鈕
    $('#thinking').on('click', function() {
        // 發牌前先把桌面清空
        $('#start').empty()

        // 發牌
        dealFive()
    })
    $('#start').empty();
})