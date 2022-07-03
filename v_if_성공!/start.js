var start = new Vue({
    el: '#title',
    data: {
        show: true
    },
    methods: {
        Start_Show(){
            this.show = !this.show;
        }
    }
});