// function unsetCurrentImage() {
//     this.$emit("close");
// }

Vue.component("image-modal", {
    template: "#image-template",
    data: function() {
        return {
            comments: [],
            url: "",
            title: "",
            description: "",
            username: "",
            comment: "",
            commentname: "",
            created: ""
        };
    },
    props: ["id"],
    mounted: function() {
        var me = this;
        axios
            .get("/current-image/" + this.id)
            .then(function(res) {
                me.this = res.data;
                me.url = res.data.image.url;
                me.title = res.data.image.title;
                me.description = res.data.image.description;
                me.username = res.data.image.username;
                me.created = res.data.image.created_at;
                me.comments = res.data.comments;
            })
            .catch(function(err) {
                console.log("Error on the GET image rout: ", err);
                me.$emit("close");
            });
    },
    methods: {
        unsetCurrentImage: function() {
            this.$emit("close");
        },
        commentClick: function() {
            var me = this;
            var myObj = {
                comment: this.comment,
                username: this.commentname,
                id: this.id
            };
            axios
                .post("/comment", myObj)
                .then(function(res) {
                    me.comments.unshift(res.data.comments);
                })
                .catch(function(err) {
                    console.log("Error in the post upload", err);
                });
        }
    },
    watch: {
        id: function() {
            var me = this;
            axios
                .get("/current-image/" + this.id)
                .then(function(res) {
                    console.log("res data, ", res.data);
                    if (!res.data.comments.length) {
                        console.log("no results");
                        me.$emit("close");
                    } else {
                        me.this = res.data;
                        me.url = res.data.image.url;
                        me.title = res.data.image.title;
                        me.description = res.data.image.description;
                        me.username = res.data.image.username;
                        me.created = res.data.image.created_at;
                        me.comments = res.data.comments;
                    }
                })
                .catch(function(err) {
                    console.log("Error on the GET Watcher rout: ", err);
                    me.$emit("close");
                });
        }
    }
});
