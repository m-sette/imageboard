new Vue({
    el: "#main",
    data: {
        name: "habanero!",
        seen: false,
        images: []
    },
    mounted: function() {
        //console.log("my Vue component is mounted");
        //console.log("This is my images in the function: ", this.images);
        var me = this;
        axios.get("/images").then(function(res) {
            console.log("resposne from images ", res.data);
            me.images = res.data;
            console.log(me.images);
        });
    }
    // methods: {
    //     sortedImages: function(a) {
    //         console.log("date a: ", a);
    //         //this.name = name;
    //     }
    // }
});
