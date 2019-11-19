new Vue({
    el: "#main",
    data: {
        images: [],
        title: "",
        description: "",
        username: "",
        file: null
    },
    mounted: function() {
        var me = this;
        axios.get("/images").then(function(res) {
            me.images = res.data;
            //console.log("unsorted: ", me.images);
            me.images.sort(function(a, b) {
                return b.created_at - a.created_at;
            });
            //console.log("sorted: ", me.images);
        });
    },
    methods: {
        handleClick: function() {
            var fd = new FormData();
            fd.append("file", this.file);
            fd.append("title", this.title);
            fd.append("username", this.username);
            fd.append("description", this.description);
            axios
                .post("/upload", fd)
                .then(function(res) {
                    console.log("res POST from upload", res);
                })
                .catch(function(err) {
                    console.log("Error in the post upload", err);
                });
        },
        handleChanges: function(e) {
            console.log("handleChanges");
            console.log("traget files", e.target.files[0]);
            this.file = e.target.files[0];
        }
    }
});
