Vue.component("MadeOrders", {
    data: function() {
        return {
            headers: ['Approved', 'Due date', 'Status', 'See drugs'],
            headersOrderDrugs: ['Drug name', 'Amount'],
            pastOrders: [],
            orderedDrugs: [],
        }
    },
    template: ` 
    <div>
        
        <div class="mainWrap">
           
            <div class="table1-main-made-order-wrap">
            <h2 id="made-orders-headline">All made orders by you</h2> 
            <div class="onlyOpened">
                <input type="checkbox" id="checkOpen" v-on:click="onlyOpen($event)">
                <label for="checkOpen">Only open orders</label>   
            </div>
                <table id="table1-main-made-order">
                <thead>
                    <tr>
                        <th v-for="header in headers">
                            {{header}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if v-for="item in pastOrders">
                        <td v-if="item.approved === false">Not Approved</td>
                        <td v-else>Approved</td>
                        <td>{{item.endTime}}</td>
                        <td>{{item.status}}</td>
                        <td style="display:none">{{item.poID}}</td>
                        <td><button v-on:click="seeDrugs(item.poID)">See ordered drugs</button></td>
                    </tr>  
                </tbody>      
                </table>
              
            </div>   

        
        <div class="right-wrapper">
        <h2 id="drugs-headline">Drugs in order</h2> 
            <div class="table-ordered-drugs">
                
                <table id="table1-ordered-drugs">
                    <thead>
                        <tr>
                        <th v-for="header in headersOrderDrugs">
                            {{header}}
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if v-for="item in orderedDrugs">
                            <td>{{item.drugName}}</td>
                            <td>{{item.amount}}</td>
                        </tr>  
                    </tbody>
                </table>
            </div>
                
            </div>

            <div class="backButton">
            <button v-on:click="home()">Back</button>
            </div>
        </div>    
    </div>		  
    	`,
    methods: {
        home: function() {
            this.$router.push('/orderDrugsHome')
        },
        onlyOpen: function() {
            var id = JSON.parse(localStorage.getItem('user')).id
            if (event.target.checked) {
                axios
                    .get("/purchaseOrder/getAllOpenPurchaseOrders/" + id)
                    .then(response => {
                        this.pastOrders = response.data
                    })
            } else {
                this.takeAll()
            }

        },
        seeDrugs: function(orderId) {
            axios
                .get("/purchaseOrder/getAllPurchaseOrdersDrugs/" + orderId)
                .then(response => {
                    this.orderedDrugs = response.data
                })

        },
        takeAll: function() {
            var id = JSON.parse(localStorage.getItem('user')).id
            axios
                .get("/purchaseOrder/getAllPurchaseOrders/" + id)
                .then(response => {
                    this.pastOrders = response.data
                })
        },
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
        this.takeAll()
    }
});