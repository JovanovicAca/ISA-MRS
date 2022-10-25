Vue.component("Promotion", {
    data: function() {
        return {
            drug: {
                code: "",
                actionEndTime: "",
                actionStartTime: "",
                actionPrice: "",
            },
            headers: ['Drug code', 'Drug name', 'Quantity', 'Start date of price', 'Price', 'End date of price', 'Promote'],
            headersPromo: ['Drug code', 'Price'],

            drugs: [],
            searchPrice: "",
            promotedDrugs: [],
            promo: [],

        }
    },
    template: ` 
    <div>
        <div class="main-wrap-promotion">
            <div class="main-header-pricelist">
                <h1>Current drugs and their prices</h1>
            </div>

            <div class="wrap-first">
                <div class="search-pricelist">
                    <p id="searchPrice">Search by name: 
                    <input type="text" v-model="searchPrice" placeholder="Search by name"/></p>
                </div>
                
            
                <div class="table1-pricelist-wrap">
                
                    <table id="table1-pricelist-table" ref="mainTable">
                    <thead>
                        <tr>
                            <th v-for="header in headers">
                                {{header}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-for="item in result">
                            <td>{{item.drugCode}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.quantity}}</td>
                            <td>{{item.startPrice}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.endPrice}}</td>
                            <td><button v-if="item.drugCode" v-on:click="promote(item.drugCode, item.price)">Promote</button></td>
                        </tr>  
                    </tbody>   
                    </table>
                </div>

                <div class="table2-pricelist-wrap">
                    <h2>Promoted drugs</h2>
                    <table id="table2-pricelist-table" >
                        <thead>
                            <tr>
                                <th v-for="header in headersPromo">
                                    {{header}}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="item in promo">
                                <td>{{item.drugCode}}</td>
                        
                                <td>{{item.price}}</td>
                            </tr>  
                        </tbody>   
                        </table>
                </div>

            </div>



        <div class="wrap-right">   
            <div class="wrap-right-price">
            <h2 id="headline-promotion">Make a promotion for a drug</h2>
                <div class="changePriceDiv">
                    <h4>Drug Code: {{drug.code}}</h4>
                    <h4>Current price: {{drug.actionPrice}}</h4>
                    <h4>Enter promo price:</h4>
                    <input v-model="drug.actionPrice" type="number" min="1" step="10">
                    <button v-on:click="promoteDrug(drug.code,drug.actionPrice)">Promote drug</button>
                </div>
            
            </div>
            <div class="wrap-right-bottom">
            <h2 id="headline-promotion-date">Enter date for promotion</h2>
                <div class="changePriceDivDate">
                    <h4>Choose start date for promotion:</h4>
                    <input v-model="drug.actionStartTime" type="date"/>
                    <h4>Choose end date for promotion:</h4>
                    <input v-model="drug.actionEndTime" type="date"/><br>
                    
                </div>
            </div>
        </div>
      
        <div class="back-finish-button">
            <button id="button-finish" v-on:click="finish()">Finish</button>
            <button id="button-back" v-on:click="goBack()">Back</button>
        </div>
        </div>
    </div>		  
    	`,
    methods: {
        goBack: function() {
            this.$router.push('editDrugsHome')
        },
        add: function(item, items) {
            for (var i = 0; i < items.length; i++) {
                if (item.drugCode === items[i].drugCode) {
                    //items[i].price = this.drug.price
                    return
                }
            }
            items.push(item);
        },
        promote: function(drugCode, price) {
            this.drug.code = drugCode
            this.drug.actionPrice = price


        },
        finish: function() {
            var id = JSON.parse(localStorage.getItem('user')).id
            var bool = false;
            var newDP = new Object()
            newDP.actionPrice = this.drug.actionPrice
            newDP.startActionPrice = this.drug.actionStartTime
            newDP.endActionPrice = this.drug.actionEndTime
            if (this.drug.actionEndTime <= this.drug.actionStartTime) {
                swal("Error!", "Date end can't be before or even with date start!", "error");

                return false;
            }
            if (!this.drug.actionPrice || !this.drug.actionStartTime || !this.drug.actionEndTime) {
                swal("Error!", "Please input all the values!", "error");

                return false;
            }
            if (!this.promotedDrugs.length) {
                swal("Error!", "Choose some drugs!", "error");
                return;
            }
            axios
                .put("/drugPharma/makePromotePrice/" + id + "/" + this.promotedDrugs, newDP)
                .then(response => {
                    //this.add(response.data, this.drugs)
                })
            swal({
                title: "Success!",
                text: "Promotion made!",
                type: "success"
            }).then(function() {
                location.reload()
            });

        },

        promoteDrug: async function(drugCode, actionPrice) {
            this.promotedDrugs.push(drugCode)
            await axios
                .get("drugPharma/saveCodePrice/" + drugCode + "/" + actionPrice)
            var item = new Object()

            item.drugCode = drugCode
            item.price = actionPrice
                //console.log(item.drugCode, item.price)
            this.add(item, this.promo)
        },
        back: function() {
            this.$router.push("/editDrugsHome")
        },
    },
    computed: {
        result() {
            if (this.searchPrice !== "") {
                return this.drugs.filter((item) => {
                    return this.searchPrice && this.searchPrice.toLowerCase().split(' ').every(i => item.name.toLowerCase().includes(i))
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
    },
    mounted() {
        var id = JSON.parse(localStorage.getItem('user')).id
        axios
            .get("/drug/getDrugsFromPharmacy/" + id)
            .then(response => {
                response.data.forEach(element => {
                    var insert = new Object();
                    insert.drugCode = element.drugCode
                    insert.name = element.drugName
                    insert.quantity = element.amount
                    if (!element.actionStartPrice) {
                        insert.startPrice = element.startPrice
                    } else {
                        insert.startPrice = element.actionStartPrice

                    }
                    if (element.actionPrice === 0 || !element.actionPrice) {
                        insert.price = element.price
                    } else {
                        insert.price = element.actionPrice
                    }
                    if (!element.actionEndPrice) {
                        insert.endPrice = element.endPrice
                    } else {
                        insert.endPrice = element.actionEndPrice
                    }
                    this.add(insert, this.drugs)

                });


            })
            .catch(error => {
                swal("Error!", "Something went wrong!", "error");
            })
    }
});