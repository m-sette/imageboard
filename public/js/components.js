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
            me.this = res.data;
            me.url = res.data.image.url;
            me.title = res.data.image.title;
            me.description = res.data.image.description;
            me.username = res.data.image.username;
            me.created = res.data.image.created_at;
            me.comments = res.data.comments;
        });

        // var boxModal = document.querySelector(".pop-up");
        // document.addEventListener("open", function(e) {
        //     console.log(e.pageY);
        //     boxModal.style.top = e.pageY + "px";
        // });
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
            axios.get("/current-image/" + this.id).then(function(res) {
                me.this = res.data;
                me.url = res.data.image.url;
                me.title = res.data.image.title;
                me.description = res.data.image.description;
                me.username = res.data.image.username;
                me.created = res.data.image.created_at;
                me.comments = res.data.comments;
            });
        }
    }
});
