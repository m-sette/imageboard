new Vue({
    el: "#main",
    data: {
        name: "habanero!",
        seen: false,
        //array: [],
        images: []
    },
    mounted: function() {
        //console.log("my Vue component is mounted");
        //console.log("This is my images in the function: ", this.images);
        var me = this;
        axios.get("/images").then(function(res) {
            //console.log("resposne from images ", res.data);
            //console.log("tis ", me.images);
            me.images = res.data;
        });
    },
    methods: {
        myFunction: function(name) {
            console.log("function is running");
            console.log("name: ", name);
            this.name = name;
        }
    }
});
