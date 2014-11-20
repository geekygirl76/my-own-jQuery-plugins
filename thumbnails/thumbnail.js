$.Thumbnails = function(el){
    this.$el = $(el);
    this.$activeDiv = this.$el.find("div.active");
    this.$gutterImages = this.$el.find(".gutter-images");

    this.$activeImg = this.$gutterImages.children().eq(0);
    this.activate(this.$activeImg);

    this.$images = this.$gutterImages.children();
    this.activeIdx = 0;
    this.fillGutterImages();

    this.$gutterImages.on('click','img',(function(event){
        this.$activeImg = $(event.currentTarget);
        this.activate(this.$activeImg);
    }).bind(this));

    this.$el.on("click",'a.nav.left',(function(event){
        if (this.activeIdx >0){
            this.activeIdx -= 1;
        }



        this.fillGutterImages();
    }).bind(this));

    this.$el.on("click",'a.nav.right',(function(event){
        if( this.activeIdx + 5 < this.$images.length ){
            this.activeIdx += 1;
        }


        this.fillGutterImages();
    }).bind(this));

    this.$gutterImages.on('mouseenter','img',(function(event){
        this.activate($(event.currentTarget));
    }).bind(this));

    this.$gutterImages.on("mouseleave",'img',(function(event){
        this.activate(this.$activeImg);
    }).bind(this));

}

$.Thumbnails.prototype.fillGutterImages = function(){

    this.$gutterImages.children().remove();

    this.$images.each((function(idx, element){
        if(idx >=this.activeIdx+0 && idx < this.activeIdx+5){
            this.$gutterImages.append(element);
        }
    }).bind(this));

}

$.Thumbnails.prototype.activate = function($img){
    var $bigImage = $img.clone();
    this.$activeDiv.html($bigImage);
}

$.fn.thumbnails = function(){
    return this.each(function(){
        new $.Thumbnails(this);
    });
}