new Vue({
    el: "#main",
    data: {
        images: [],
        title: "",
        description: "",
        username: "",
        file: null,
        lastid: "",
        firstid: "",
        showButton: true,
        currentImage: location.hash.slice(1)
    },
    mounted: function() {
        var me = this;
        axios
            .get("/images")
            .then(function(res) {
                me.images = res.data;
            })
            .catch(err => {
                console.log("Error on the GET images Route: ", err);
            });
        window.addEventListener(
            "hashchange",
            function() {
                me.currentImage = location.hash.slice(1);
            },
            false
        );
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
            location.hash = "";
        },
        handleClickResults: function() {
            var me = this;
            me.lastid = me.images.slice(-1)[0].id;
            axios
                .get("/images/" + me.lastid)
                .then(function(res) {
                    me.firstid = res.data.firstId[0].id;
                    me.images = me.images.concat(res.data.moreImages);
                    me.lastid = me.images.slice(-1)[0].id;
                    if (me.firstid === me.lastid) {
                        console.log("This is the end");
                        me.showButton = false;
                    }
                })
                .catch(function(err) {
                    console.log("Error on more buttom", err);
                });
        }
    }
});
