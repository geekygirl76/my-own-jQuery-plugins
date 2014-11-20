$.Tabs = function(el){
    this.$el = $(el);
    this.$contentTabs = $(this.$el.data("content-tabs"));
    this.$activeTab = this.$contentTabs.find(".active");
    this.$el.on('click', 'a', this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function(event){
    event.preventDefault();

    this.$el.find("a.active").removeClass("active");
    $(event.currentTarget).addClass("active");


    var link= $(event.currentTarget).attr("href");
    var $newActiveTab = this.$contentTabs.find(link);

    this.$activeTab.removeClass("active").addClass("transitioning");
    var that = this;
    this.$activeTab.one('transitionend', function(){
        that.$activeTab.removeClass("transitioning");
        $newActiveTab.addClass("active");
        that.$activeTab = $newActiveTab;

    });
};

$.fn.tabs = function(){
    return this.each(function(){
        new $.Tabs(this);
    });
}
