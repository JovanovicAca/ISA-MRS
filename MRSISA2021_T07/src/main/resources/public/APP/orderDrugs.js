Vue.component("OrderDrugs", {
    data: function() {
        return {
            headers: ['Drug code', 'Drug name', 'Current quantity', 'Enter amount for order', 'Order drug'],
            headersPurchase: ['Drug code', 'Quantity', 'Remove'],
            searchOrder: "",
            drugs: [],
            pharmaDrugs: [],
            orderedDrugs: [{}],
            drug: {
                amount: "",
                code: "",
            },
            date: null,
            checkDrug: false,
            drugCodes: [],
        }
    },
    template: ` 
    <div>
    <div class="main-wrap-order">
        <div class="headline-main">
            <h1 id="headline">Order drugs</h1>
        </div>
        <div class="wrap1">
            <div class="search-header-left">
                
                <p id="search-order">Search by name: 
                <input type="text" v-model="searchOrder" placeholder="Search by name"/></p>
                
            </div>  
        <div class="table1-main-order-wrap">
            
            
                <table id="table1orderDrugs">
                <thead>
                    <tr>
                        <th v-for="header in headers">
                            {{header}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="drugs.length === 0">
                        <td>No data</td>          
                    </tr>
                    <tr v-else v-for="item in resultQuery">
                        <td>{{item.drugCode}}</td>
                        <td>{{item.name}}</td>
                        <td v-if="!item.amount">0</td>
                        <td v-else >{{item.amount}}</td>
                        <td><input type="number" min="1" v-model="item.orderQuantity"></td>
                        <td><button v-on:click="addToOrder(item.drugCode,item.orderQuantity)">Add to order list</button></td>
                    </tr>  
                </tbody>      
                </table>
               
        </div> 
        </div>  
       
        <div class="right-wrap">
        <h2 id="headline-purchase-order">Purchase order</h2>
                
        <div class="table2-main-order-wrap">
                <div class="table2-main-order">  
                    <table id="table2orderDrugs">
                    <thead>
                        <tr>
                            <th v-for="header in headersPurchase">
                                {{header}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in orderedDrugs">
                            <td>{{item.drugCode}}</td>
                            <td>{{item.amount}}</td>
                            <td><button v-if="item.drugCode" v-on:click="deleteFromOrder(item.drugCode)">Remove from order</button></td>
                        </tr>  
                    </tbody>      
                    </table>
                </div>         
            </div>
                <h4>Due date: </h4>
                <input v-model="date" type="date"/> 

                <div v-show="checkDrug" class="add-drug">
                    <h3 id="register-headline">Register drug: {{drug.code}}</h3>
                    <button v-on:click="addDrug()">Register</button>
                </div>
      
       </div>
        <div class="back-finish-button">
        <button id="button-finish" v-on:click="makePurchaseOrder()">Finish order</button>
        <button id="button-back" v-on:click="goBack()">Back</button>
        </div>
   
        
       
    </div>
    </div>		  
    	`,
    methods: {
        add: function(item, items) {
            for (var i = 0; i < items.length; i++) {
                if (item.drugCode === items[i].drugCode) {
                    items[i].amount = item.amount
                }
            }
            items.splice(items.length, 1);
        },
        addToOrder: function(drugCode, orderQuantity) {
            var check = false

            if (!orderQuantity) {
                swal("Error!", "Quantity can't be empty!", "error");
                // orderQuantity = 1
                return
            }

            for (var i = 0; i < this.orderedDrugs.length; i++) {
                if (this.orderedDrugs[i].drugCode === drugCode) {
                    this.orderedDrugs[i].amount = +this.orderedDrugs[i].amount + +orderQuantity
                    return
                }

            }

            for (var i = 0; i < this.pharmaDrugs.length; i++) {
                //console.log(this.pharmaDrugs[i].drugCode, drugCode)
                if (this.pharmaDrugs[i].drugCode === drugCode) {
                    var item = new Object()
                    item.drugCode = drugCode
                    item.amount = orderQuantity
                    this.orderedDrugs.push(item)
                    check = true
                    return;
                    //console.log("a")
                }
            }
            if (!this.drugCodes.includes(drugCode)) {
                swal("Error!", "Not registered. Add it to the pharmacy first!", "error");
                this.checkDrug = true
                this.drug.code = drugCode
                this.drug.amount = orderQuantity
                return;
            } else {
                for (var i = 0; i < this.drugs.length; i++) {
                    //console.log(this.pharmaDrugs[i].drugCode, drugCode)
                    if (this.drugs[i].drugCode === drugCode) {
                        var item = new Object()
                        item.drugCode = drugCode
                        item.amount = orderQuantity
                        this.orderedDrugs.push(item)
                        check = true
                            //console.log("a")
                    }
                }
                return;
            }

        },
        deleteFromOrder: function(drugCode) {
            for (var i = 0; i < this.orderedDrugs.length; i++) {
                if (this.orderedDrugs[i].drugCode === drugCode) {
                    this.orderedDrugs.splice(i, 1)
                }
            }
        },
        makePurchaseOrder: function() {
            if (!this.orderedDrugs.length) {
                swal("Error!", "Choose some drugs!", "error");
                return;
            }
            var id = JSON.parse(localStorage.getItem('user')).id
            for (var i = 0; i < this.orderedDrugs.length; i++) {
                console.log(this.orderedDrugs[i].amount)
            }
            if (this.orderedDrugs.length === 0) {
                swal("Error!", "Ordered drugs can't be empty!", "error");
                return
            }
            if (!this.date) {
                swal("Error!", "Enter date!", "error");
                return
            }

            axios
                .post("/purchaseOrder/saveDateAdmin/" + this.date + "/" + id)
            axios
                .post("/purchaseOrder/makePurchaseOrder/", this.orderedDrugs.splice(1, this.orderedDrugs.length))
            swal("Succes!", "Purchase order made!", "success")
                //location.reload();
        },
        goBack: function() {
            this.$router.push("/orderDrugsHome")
        },
        addDrug: async function() {
            var element;
            var id = JSON.parse(localStorage.getItem('user')).id
            await axios
                .post("/drugPharma/addNewDrugPharmacy/" + id + "/" + this.drug.code + "/")
                .then(response => {
                    element = response.data.drugCode
                        //console.log(element)
                    this.drugCodes.push(element)
                })
            this.checkDrug = false
            this.addToOrder(element, 1)
                //location.reload()
        },

    },
    computed: {
        resultQuery() {
            if (this.searchOrder !== "") {
                return this.drugs.filter((item) => {
                    return this.searchOrder && this.searchOrder.toLowerCase().split(' ').every(i => item.name.toLowerCase().includes(i))
                })
            } else {
                return this.drugs;
            }
        }
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
        axios
            .get("/drug/getAllDrugs")
            .then(response => {
                this.drugs = response.data;
                this.drugs.amount = 0
            })

    },
    mounted() {
        var id = JSON.parse(localStorage.getItem('user')).id
        axios
            .get("/drug/getDrugsFromPharmacy/" + id)
            .then(response => {
                this.pharmaDrugs = response.data
                    //console.log(this.pharmaDrugs)
                response.data.forEach(element => {
                    for (var i = 0; i < this.drugs.length; i++) {
                        if (this.drugs[i].drugCode === element.drugCode) {
                            this.drugCodes.push(element.drugCode)
                                //console.log(element.drugCode)
                            var insert = new Object();
                            insert.amount = element.amount;
                            insert.drugCode = element.drugCode;
                            this.add(insert, this.drugs)
                        }
                    }
                });
            })
            .catch(error => {
                swal("Error!", "Try again later!", "error");
            })


    },

});