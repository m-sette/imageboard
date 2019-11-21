new Vue({
    el: "#main",
    data: {
        images: [],
        title: "",
        description: "",
        username: "",
        file: null,
        lastid: "",
        currentImage: null //location.hash.slice(1)
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
        //addEventListener("hashchange", function() {
        //something
        //do some check
        //get response, if no image, hide the modal
        //});
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
            //add hash functionality
        },
        handleClickResults: function() {
            var me = this;
            me.lastid = me.images.slice(-1)[0].id;
            console.log("client more images request ", me.lastid);
            axios
                .get("/images/" + me.lastid)
                .then(function(res) {
                    console.log("This is the more data ", res.data);
                    //me.images.push(data);
                    me.images = me.images.concat(res.data);
                })
                .catch(function(err) {
                    console.log("Error on more buttom", err);
                });
        }
    }
});
// checkScrollPos: function() {
//     var me = this;
//     me.lastid = me.images.slice(-1)[0].id;
//     var bottomOfWindow =
//         document.documentElement.scrollTop + window.innerHeight ===
//         document.documentElement.offsetHeight;
//     console.log(bottomOfWindow);
//     if (bottomOfWindow) {
//         axios
//             .get("/images/" + me.lastid)
//             .then(function(res) {
//                 console.log("This is the more data ", res.data);
//                 //me.images.push(data);
//                 me.images = me.images.concat(res.data);
//             })
//             .catch(function(err) {
//                 console.log("Error on more buttom", err);
//             });
//     }
// }
// $(document).scrollTop() + $(window).height() ===
// $(document).height()
