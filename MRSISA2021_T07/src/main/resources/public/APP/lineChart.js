Vue.component("LineChart", {
    extends: VueChartJs.Bar,
    props: ["data", "options", "labels"],
    mounted() {
        this.renderLineChart();
    },
    computed: {
        chartData: function() {
            return this.data;
        },
        makeLabels: function() {
            return this.labels
        }

    },
    methods: {
        renderLineChart: function() {
            this.renderChart({
                labels: this.makeLabels,
                datasets: [{
                    label: "Data One",
                    backgroundColor: "#4351e8",
                    data: this.chartData

                }]
            }, { responsive: true, maintainAspectRatio: false });
        }
    },
    watch: {
        data: function() {
            //this._chart.destroy();
            // console.log(this.data);
            // console.log(this.options);
            //this.renderChart(this.data, this.options);
            this.renderLineChart();
        }
    }
});

// var vm = new Vue({
//     el: "LineChart",
//     data: {
//         message: "Hello World",
//         dataChart: [10, 39, 10, 40, 39, 0, 0],
//         test: [4, 4, 4, 4, 4, 4]
//     },
//     methods: {
//         changeData: function() {
//             this.dataChart = [6, 6, 3, 5, 5, 6, 6, 6, 3, 5, 5, 6];
//         }
//     }
// });