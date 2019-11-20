new Vue({
    el: "#main",
    data: {
        images: [],
        title: "",
        description: "",
        username: "",
        file: null,
        currentImage: null
    },
    mounted: function() {
        var me = this;
        axios.get("/images").then(function(res) {
            me.images = res.data;
        });
    },
    methods: {
        handleClick: function() {
            var me = this;
            var fd = new FormData();
            fd.append("file", this.file);
            fd.append("title", this.title);
            fd.append("username", this.username);
            fd.append("description", this.description);
            axios
                .post("/upload", fd)
                .then(function(res) {
                    //console.log("res POST from upload", res);
                    me.images.unshift(res.data.image);
                })
                .catch(function(err) {
                    console.log("Error in the post upload", err);
                });
        },
        handleChanges: function(e) {
            this.file = e.target.files[0];
        },
        setCurrentImage: function(e) {
            this.currentImage = e;
        },
        unsetCurrentImage: function() {
            this.currentImage = null;
        }
    }
});

//axios.post("/comment", {
// id: this.id,
// username: this.username,
// commet: this.commet
// })
