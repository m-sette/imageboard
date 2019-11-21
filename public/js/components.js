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

        axios.get("/current-image/" + this.id).then(function({ data }) {
            me.this = data;
            me.url = data.image.url;
            me.title = data.image.title;
            me.description = data.image.description;
            me.username = data.image.username;
            me.created = data.image.created_at;
            me.comments = data.comments;
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

            // console.log(myObj);
            axios
                .post("/comment", myObj)
                .then(function(res) {
                    //console.log("res.data.image...", res.data.image);
                    me.comments.unshift(res.data.image);
                    //me.commentname = res.data.image.username;
                    //me.comment = res.data.image.comment_text;
                })
                .catch(function(err) {
                    console.log("Error in the post upload", err);
                });
        }
    }
});
