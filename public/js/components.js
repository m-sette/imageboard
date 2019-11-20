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

        axios.get("/current-image/" + this.id).then(function(res) {
            //me.this = res.data[0];
            me.url = res.data[0].url;
            me.title = res.data[0].title;
            me.description = res.data[0].description;
            me.username = res.data[0].username;
            me.created = res.data[0].created_at;
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

            console.log(myObj);
            axios
                .post("/upload-comment", myObj)
                .then(function(res) {
                    console.log("res.data.image...", res.data.image);
                    me.commentname = res.data.image.username;
                    me.comment = res.data.image.comment_text;
                })
                .catch(function(err) {
                    console.log("Error in the post upload", err);
                });
        }
    }
});
