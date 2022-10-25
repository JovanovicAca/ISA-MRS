Vue.component("Reports", {
    data: function() {

        return {
            dataChart: [10, 39, 10, 40, 39, 0, 0],
            dataChart1: [10, 159, 10, 40, 39, 0, 0, 15],
            dataApp: [],
            labelApp: [],
            dataDrug: [],
            labelDrug: [],
            dataIncome: [],
            labelIncome: [],
            label1: ["1", "2", "3"],
            grade: "",
            headers: ['Name', 'Average grade'],
            dermas: [],
            pharmas: [],
            selectedApp: '',
            selectedAppYear: '',
            selectedDrug: '',
            selectedDrugYear: '',
            incomeYearFrom: '',
            incomeYearTo: '',
        }
    },
    template: ` 
    <div>
    
    <div class="main-wrapper">
    
    <h1 id="main-headline">Reports</h1>
    <h2 id="grade-headline">Average pharmacy rating: {{grade}}</h2>
    
        <div class="left-side">  
        
                <div class="table-grade-derma-wrap">
                    <h3 id="headline-derma">Dermatologists: </h3>    
                    <table id="table-grade-derma" ref="mainTable">
                    <thead>
                        <tr>
                            <th v-for="header in headers">
                                {{header}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in dermas">
                            <td>{{item.name}}</td>
                            <td>{{item.rate}}</td>
                        </tr>  
                    </tbody>   
                    </table>
                </div>


            <div class="chart1">

                <label for="headline-app" id="headline-app">Appointments done: </label>
                <select  v-model="selectedAppYear" name="headline-app" id="headline-app-select">
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                </select>
                <select  v-model="selectedApp" name="headline-app" id="headline-app-select">
                    <option value="mesecno">Per month</option>
                    <option value="kvartalno">Quarterly</option>
                    <option value="godisnje">Per year</option>
                </select>

                <button v-on:click="showApp()" id="button-show-app">Select</button>
  
                <LineChart :labels="labelApp" :data="dataApp" :options="{responsive: true, maintainAspectRatio: false}"></LineChart>
            
            </div>


        </div>

        <div class="right-side">

            <div class="table-grade-derma-wrap">
            <h3 id="headline-pharma">Pharmacists: </h3>    
                <table id="table-grade-pharma" ref="mainTable">
                <thead>
                    <tr>
                        <th v-for="header in headers">
                            {{header}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in pharmas">
                        <td>{{item.name}}</td>
                        <td>{{item.rate}}</td>
                    </tr>  
                </tbody>   
                </table>
            </div>


            <div class="chart2">
            <label for="headline-drugs" id="headline-drugs">Drug consumption: </label>
                <select v-model="selectedDrugYear" name="headline-drugs" id="headline-drugs-select">
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                </select>
                <select v-model="selectedDrug" name="headline-drugs" id="headline-drugs-select">
                    <option value="mesecno">Per month</option>
                    <option value="kvartalno">Quarterly</option>
                    <option value="godisnje">Per year</option>
                </select>

            <button v-on:click="showDrug()" id="button-show-drug">Select</button>

            <LineChart :labels="labelDrug" :data="dataDrug" :options="{responsive: true, maintainAspectRatio: false}"></LineChart>
        
            </div>
        </div>   
        
        <div class="bottom">
            <div class="chart3">
                <label for="date-from" id="headline-income-from">Incomes from: </label>
                <input v-model="incomeYearFrom" type="date" id="date-from" name="date-from">

                <label for="date-to" id="headline-income-to">Incomes to: </label>
                <input v-model="incomeYearTo" type="date" id="date-to" name="date-to">
                
                <button v-on:click="showIncome()">Select</button>
                
                <LineChart :labels="labelIncome" :data="dataIncome" :options="{responsive: true, maintainAspectRatio: false}"></LineChart>
        
            </div>
        </div>
        <div class="back-button-orders">
            <button v-on:click="goBack()">Home</button>
        </div>
    </div>
    </div>		  
    	`,
    methods: {
        goBack: function() {
            this.$router.push('/changePharmacy')
        },
        changeData: function() {
            this.dataChart = [6, 6, 3, 5, 5, 6, 6, 6, 3, 5, 5, 6];
        },
        showApp: function() {
            var id = JSON.parse(localStorage.getItem('user')).works
            if (this.selectedApp === "mesecno") {
                axios
                    .get('/report/monthReportsApp/' + id + "/" + this.selectedAppYear)
                    .then(response => {
                        this.labelApp = Object.keys(response.data);
                        this.dataApp = Object.values(response.data);
                    })
            }
            if (this.selectedApp === "kvartalno") {
                axios
                    .get('/report/quarterhReportsApp/' + id + "/" + this.selectedAppYear)
                    .then(response => {
                        this.labelApp = Object.keys(response.data);
                        this.dataApp = Object.values(response.data);
                    })
            }
            if (this.selectedApp === "godisnje") {
                axios
                    .get('/report/yearReportsApp/' + id + "/" + this.selectedAppYear)
                    .then(response => {
                        this.labelApp = Object.keys(response.data);
                        this.dataApp = Object.values(response.data);
                    })
            }

        },
        showDrug: function() {
            var id = JSON.parse(localStorage.getItem('user')).works
            if (this.selectedDrug === "mesecno") {
                axios
                    .get('/report/monthDrugs/' + id + "/" + this.selectedDrugYear)
                    .then(response => {
                        //console.log(response.data)
                        this.labelDrug = Object.keys(response.data);
                        this.dataDrug = Object.values(response.data);
                    })
            }
            if (this.selectedDrug === "kvartalno") {
                axios
                    .get('/report/quarterDrugs/' + id + "/" + this.selectedDrugYear)
                    .then(response => {
                        //console.log(response.data)
                        this.labelDrug = Object.keys(response.data);
                        this.dataDrug = Object.values(response.data);
                    })
            }
            if (this.selectedDrug === "godisnje") {
                axios
                    .get('/report/yearDrugs/' + id + "/" + this.selectedDrugYear)
                    .then(response => {
                        //console.log(response.data)
                        this.labelDrug = Object.keys(response.data);
                        this.dataDrug = Object.values(response.data);
                    })
            }
        },
        showIncome: function() {
            var id = JSON.parse(localStorage.getItem('user')).works
            console.log(this.incomeYearFrom + this.incomeYearTo)
            axios
                .get('/report/getIncomes/' + id + "/" + this.incomeYearFrom + "/" + this.incomeYearTo)
                .then(response => {
                    this.dataIncome.push(response.data)
                })
        },

        findAveragePharmacy: function() {
            var id = JSON.parse(localStorage.getItem('user')).works
            axios
                .get('/report/getAveragePharma/' + id)
                .then(response => {
                    //console.log(response.data)
                    this.grade = response.data
                })
        },
        findAverageDoctor: function() {
            var id = JSON.parse(localStorage.getItem('user')).works
            axios
                .get('/report/getAverageDoctor/' + id)
                .then(response => {
                    response.data.forEach(element => {
                        if (element.doctor.role === "DERMA") {
                            var insert = new Object()
                            insert.name = element.doctor.name + element.doctor.surname
                            insert.rate = element.rate
                            this.add(insert, this.dermas)
                        } else if (element.doctor.role === "PHARMA") {
                            var insert = new Object()
                            insert.name = element.doctor.name + element.doctor.surname
                            insert.rate = element.rate
                            this.add(insert, this.pharmas)
                        }
                    });
                })
        },
        add: function(item, items) {
            items.push(item);
        },
        changeDataApp: function(values, keys) {
            this.labelApp = values;
            this.dataApp = keys;
        }
    },
    computed: {

    },
    beforeMount() {
        this.user = JSON.parse(localStorage.getItem('user'))
        try {
            if (this.user.role != "ADMIN") {
                if (this.user.role === "SUPPLY") {
                    this.$router.push("/supplierHome")
                }
                if (this.user.role === "PATIENT") {
                    this.$router.push("/patientHome")

                }
                if (this.user.role === "PHARMA") {
                    this.$router.push("/employeeHome")
                }
                if (this.user.role === "DERMA") {
                    this.$router.push("/employeeHome")
                }
            } else {
                if (this.user.adminType === "SYSTEM") {
                    console.log('aa')
                    this.$router.push("/systemAdminHome")
                }
            }
        } catch {
            this.$router.push("/")
        }
    },
    mounted() {
        this.findAveragePharmacy()
        this.findAverageDoctor()
            // this.findAveragePharma()
    }

});