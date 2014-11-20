$.Zoomable = function(el){

    this.$el = $(el);
    this.boxSize = 100;

    this.$el.on("mousemove", this.showFocusBox.bind(this));
    this.$el.on("mouseleave",this.removeFocusBox.bind(this));
}

$.Zoomable.prototype.showFocusBox = function(event){
    if(!this.mouseOver){
        this.mouseOver = true;
        this.$focusBox = $("<div class='focus-box'></div>");

        this.$focusBox.css("height", this.boxSize).css("width", this.boxSize);
        this.$el.append(this.$focusBox);

        this.$img = this.$el.find("img");
        this.imgHeight = this.$img.innerHeight();
        this.imgWidth = this.$img.innerWidth();

    }

    this.offX = this.$el.offset().left;
    this.offY = this.$el.offset().top;

    var boxLeft = event.pageX - this.offX - (this.boxSize/2);
    var boxTop = event.pageY - this.offY - (this.boxSize /2);
    if(boxLeft<0){
        boxLeft = 0;
    }

    if(boxTop<0){
        boxTop =0;
    }

    if(boxTop + this.boxSize > this.imgHeight){
        boxTop = this.imgHeight - this.boxSize;
    }

    if(boxLeft + this.boxSize > this.imgWidth){
        boxLeft = this.imgWidth - this.boxSize;
    }

    this.$focusBox.css("left", boxLeft).css("top", boxTop);
    this.showZoom(boxLeft, boxTop);
}

$.Zoomable.prototype.removeFocusBox = function(event){
    this.mouseOver = false;
    this.$focusBox.remove();
    this.zoomed = false;
    this.$zoomDiv.remove();
}

$.Zoomable.prototype.showZoom = function(xDiff,yDiff){
    if(!this.zoomed){
        this.zoomed = true;
        this.$zoomDiv = $('<div class="zoomed-image"></div>');
        $("body").append(this.$zoomDiv);
        this.$zoomDiv.css("width",window.innerHeight);


        this.$zoomDiv.css("background-image","url(" +this.$el.find("img").attr("src")+ ")");
        var scale = (this.imgWidth / this.boxSize)*100;
        this.$zoomDiv.css("background-size", scale+"% auto");
    }



    var ratio = window.innerHeight / this.boxSize;
    var x = xDiff * ratio;
    var y = yDiff * ratio;

    this.$zoomDiv.css("background-position", "-"+x +"px -"+ y+"px");
}

$.fn.zoomable =function(){
    return this.each(function(){

        new $.Zoomable(this);
    });
}

$(function(){

    $(".zoomable").zoomable();
})