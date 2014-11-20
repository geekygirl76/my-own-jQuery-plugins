$.Carousel = function(el){

    this.$el = $(el);
    this.$items = this.$el.find(".items").children();
    this.activeIdx = 0;
    this.$items.eq(0).addClass("active");
    // console.log(this.$items);
    this.transitioning = false;

    this.$el.on('click', '.slide-left', this.slideLeft.bind(this));
    this.$el.on('click', '.slide-right', this.slideRight.bind(this));
}

$.Carousel.prototype.slide = function(dir){
    if (this.transitioning){
        return;
    }
    this.transitioning = true;

    var $oldItem = this.$items.eq(this.activeIdx);
    this.activeIdx = (this.activeIdx + dir + this.$items.length) % this.$items.length;
    var $newItem = this.$items.eq(this.activeIdx);

    var oldSide, newSide;
    if (dir == -1){
        oldSide ="right";
        newSide = "left";
    } else {
        oldSide = "left";
        newSide = "right";
    };

    $newItem.addClass("active " + newSide);
    setTimeout((function(){
        $oldItem.addClass(oldSide);
        $newItem.removeClass(newSide);
    }),0);

    var that = this;
    $newItem.one("transitionend", function(){
        that.transitioning = false;
        $oldItem.removeClass("active " + oldSide);
    });


}

$.Carousel.prototype.slideLeft = function(){this.slide(-1)};
$.Carousel.prototype.slideRight = function(){this.slide(1)};


$.fn.carousel = function(){
    return this.each(function(){
        new $.Carousel(this);
    });
}