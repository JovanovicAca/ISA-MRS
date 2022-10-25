Vue.component("AcceptOrder", {
    data: function() {
        return {
            headersMain: ['Order id', 'Due date', 'Status', 'See offers', 'Delete order'],
            headers: ['Supplier email', 'Price offered', 'See drugs', 'Accept offer'],
            headersOrderDrugs: ['Drug name', 'Amount'],
            pastOrders: [],
            offers: [],
            orderedDrugs: [],
            opened: [],
        }
    },
    template: ` 
    <div>
        <div class="main-wrapper-accept-order">
        
        <div class="table-open-orders-wrap">
        <h2 id="main-header">All open orders for pharmacy</h2> 
        
            <table id="tableOpenOrder">
            <thead>
                <tr>
                    <th v-for="header in headersMain">
                        {{header}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="item in pastOrders">
                    <tr>
                        <td>{{item.poID}}</td>
                        <td>{{item.endTime}}</td>
                        <td>{{item.status}}</td> 
                        <td><button v-on:click="seeOffers(item.poID)">See offers</button></td>
                        <td><button v-on:click="deleteOrder(item.poID)">Delete order</button></td>
                        
                    </tr>  
                </template>
            </tbody>      
            </table>
        </div>   

            <div class="right-side-wrap">
            <div class="right-side-first-wrap">
                <h2 id="headline-offers">Offers</h2> 
                <div class="table-open-offers-wrap" >
 
                    <table id="tableOpenOffers">
                    <thead>
                        <tr>
                            <th v-for="header in headers">
                                {{header}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="!offers">No Data!</tr>
                        <template v-for="item in offers">
                            <tr>
                                <td>{{item.email}}</td>
                                <td>{{item.price}}</td>
                                <td><button v-on:click="seeDrugs(item.orderId,1)">See drugs</button></td>
                                <td><button v-on:click="acceptOffer(item.orderId,item.email)">Accept offer</button></td>
                            </tr>              
                        </template>
                    </tbody>      
                    </table>
                 
                </div> 

            </div>
            <div class="right-side-second-wrap">    
                <h2 id="headline-drugs">Drugs</h2>
                    <div class="table-open-orders-drugs-wrap">
                    <table id="table1-open-orders-drugs" >
                        <thead>
                            <tr>
                            <th v-for="header in headersOrderDrugs">
                                {{header}}
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="item in orderedDrugs">   
                                <td>{{item.drugName}}</td>
                                <td>{{item.amount}}</td>
                                <td style="display:none">{{item.drugId}}</td>
                            </tr>  
    
                        </tbody>
                    </table>
                    </div>
                
            </div> 
            
            
        
            </div>
            <div class="dugmeaccept11">
            <button id="dugmeaccept"v-on:click="goBack()">Finish</button>
            </div>
        </div>
       
    </div>		  
    	`,
    methods: {
        seeDrugs: async function(orderId, flag) {
            //console.log(orderId)
            await axios
                .get("/purchaseOrder/getAllPurchaseOrdersDrugs/" + orderId)
                .then(response => {
                    //console.log(response.data)
                    this.orderedDrugs = response.data
                })


        },
        deleteOrder: async function(orderId) {
            var id = JSON.parse(localStorage.getItem('user')).id
            var bool = false
            await axios
                .delete("/purchaseOrder/deleteOrder/" + id + "/" + orderId)
                .then(response => {
                    //console.log(response.data)
                    bool = true
                }).catch((error) => {
                    swal("Error!", error.response.data, "error");
                })
            if (bool) {
                swal("Succes!", "Successfully deleted!", "success");
                for (var i = 0; i < this.pastOrders.length; i++) {
                    if (this.pastOrders[i].poID === orderId) {
                        this.pastOrders.splice(i, 1);
                    }
                }
            }

        },
        goBack: function() {
            this.$router.push("/orderDrugsHome")
        },
        sendToBack: function() {

        },
        acceptOffer: function(orderId, email) {
            var id = JSON.parse(localStorage.getItem('user')).id
            this.seeDrugs(orderId, 0)
            this.sendToBack(orderId, email)
                //console.log(id + " " + orderId)
            console.log(this.orderedDrugs.length)
            axios
                .put("/purchaseOrder/acceptOffer/" + orderId + "/" + id + "/" + email, this.orderedDrugs)
                .then(response => {
                    console.log(response.data)
                    if (response.data === "success") {
                        swal({
                            title: "Success!",
                            text: "Accepted!",
                            type: "success"
                        }).then(function() {
                            location.reload()
                        });
                    }

                }).catch((error) => {
                    //console.log(error.response.data)
                    swal("Error!", error.response.data, "error");
                })
        },
        seeOffers: function(poID) {
            axios
                .get("/purchaseOrder/getOffers/" + poID)
                .then(response => {
                    this.offers = (response.data)
                        //console.log(this.offers)
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

        var id = JSON.parse(localStorage.getItem('user')).works
        axios
            .get("/purchaseOrder/allPurchaseOrdersForPharmacy/" + id)
            .then(response => {
                this.pastOrders = response.data
                    //console.log(response.data)
            })
    }
});