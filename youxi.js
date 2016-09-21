/**
 * Created by Administrator on 2016/7/18 0018.
 */
function game(){
    this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.imgs={     A:"img/A.png", B:"img/B.png", C:"img/C.png", D:"img/D.png", E:"img/E.png", F:"img/F.png",
                    G:"img/G.png", H:"img/H.png",I:"img/I.png",J:"img/J.png", K:"img/K.png", E:"img/E.png",
                    L:"img/L.png",M:"img/M.png",N:"img/N.png", O:"img/O.png", P:"img/P.png", Q:"img/Q.png",
                    R:"img/R.png",S:"img/S.png",T:"img/T.png", U:"img/U.png", V:"img/V.png", W:"img/W.png",
                    X:"img/X.png",Y:"img/Y.png",Z:"img/Z.png"  
                };
    //console.log(imgs.A)
    this.len=3;
    this.clientW=document.documentElement.clientWidth;
    this.clientH=document.documentElement.clientHeight;
    this.huoquarr=[];
    this.spanarr=[];
    this.speed=3;
    this.guanqia=1;
    this.guanqias=document.getElementById("guanqias");
    this.shengming=3;
    this.shengmings=document.getElementById("shengmings");
    this.bscroe=0;
    this.bscroes=document.getElementById("bscroes");
    this.zscroe=0;
    this.zscroes=document.getElementById("zscroes");
    this.step=10;
    this.t;
    this.mp3="5080.mp3";

}
game.prototype={
    play:function(){
        //创建随机字母
        this._getRand(this.len);
        //console.log(this._getRand(this.len))
        //将字母打印到页面当中
        var aa=this._createSpan(this._getRand(this.len));
       //console.log(aa)
        this._move();
        this._key();
    },
    _move:function(){
        var that=this;
        t=setInterval(xialuo,60);
        function xialuo(){
            for(var i=0;i<that.spanarr.length;i++){
                var tops=that.spanarr[i].offsetTop+that.speed;
                that.spanarr[i].style.top=tops+"px";
                if(that.spanarr[i].offsetTop>that.clientH){
                    document.body.removeChild(that.spanarr[i]);
                    that.huoquarr.splice(i,1);
                    that.spanarr.splice(i,1);
                    that._createSpan(that._getRand(1));
                    that.shengming--;
                    that.shengmings.innerHTML=that.shengming;
                    if(that.shengming<0){
                        alert("GAVE OVER");
                        clearInterval(t);
                        document.body.removeChild(that.spanarr[i]);
                        that.huoquarr=[];
                        that.spanarr=[];
                    }
                }
            }
        }
    },
    _key:function(){
        var that=this;
        document.onkeydown=function(e){
            var ev=e||window.event;
            var shuchu=String.fromCharCode(ev.keyCode);
            var divs=document.createElement("div");
            divs.style.opacity=0;
            for (var i=0;i<that.spanarr.length;i++){
                if(that.spanarr[i].latter==shuchu){
                    //"<img src="+this.imgs[arr[i]]+">"
                    divs.innerHTML="<embed src="+that.mp3+">";
                    document.body.appendChild(divs);
                    console.log(divs)
                    document.body.removeChild(that.spanarr[i]);
                    that.huoquarr.splice(i,1);
                    that.spanarr.splice(i,1);
                    that._createSpan(that._getRand(1));
                    that.bscroe++;
                    that.bscroes.innerHTML=that.bscroe;
                    that.zscroe++;
                    that.zscroes.innerHTML=that.zscroe;
                    if(that.bscroe==that.step){
                        alert("恭喜通关，点击确定进入下一关");
                        that.bscroes.innerHTML=0;
                        that.bscroe=0;
                        that._next();
                    }

                }
            }
        }
    },
    _next:function(){
        this.speed++;
        if(this.speed>=10){
            this.speed=10;
        }
        this.step++;
        console.log(this.step);
        if(this.step>=20){
            this. step=20;
        }
        this.len++;
        if(this.len>=15){
            this.len=15;
        }
        this.guanqia++;
        this.guanqias.innerHTML=this.guanqia;
        clearInterval(t);
        for(var i=0;i<this.spanarr.length;i++){
            document.body.removeChild(this.spanarr[i]);
        }
        this.spanarr=[];
        this.huoquarr=[];
        this._createSpan(this. _getRand(this.len));
        this._move();
        this._key();
    },
    _getRand:function(num){
        var newarr=[];
        for (var i=0;i<num;i++){
            var letter=this.arr[Math.floor(Math.random()*this.arr.length)];
            while (this._checkRand(letter,this.huoquarr)){
                letter=this.arr[Math.floor(Math.random()*this.arr.length)];
            }
            newarr.push(letter);
            this.huoquarr.push(letter);
        }
        return newarr;
    },
    _checkRand : function(val,arr){
        for(var i=0;i<arr.length;i++){
            if(val==arr[i]){
                return true;
            }
        }
        return false;
    },
    _createSpan : function(arr){
        var newarr=[];
        for(var i=0;i<arr.length;i++){
            var spans=document.createElement("span");
            spans.innerHTML="<img src="+this.imgs[arr[i]]+">";
            spans.latter=arr[i];
            var lefts=100+Math.random()*(this.clientW-200);
            spans.lefts=lefts;
           var tops=(Math.random()*200)-100;
            while (this._checkPos(spans,this.spanarr)){
                lefts=100+Math.random()*(this.clientW-200);
                spans.lefts=lefts;
            }
            spans.style.cssText="position:absolute;left:"+lefts+"px;top:"+tops+"px;";
            document.body.appendChild(spans);
            newarr.push(spans);
            this.spanarr.push(spans);
        }
        return newarr;
    },
    _checkPos:function(ele,arr){
        for(var i=0;i<arr.length;i++){
            if((ele.lefts>arr[i].lefts-100)&&(ele.lefts<arr[i].lefts+100)){
                return true;
            }
        }
        return false;
    }
}