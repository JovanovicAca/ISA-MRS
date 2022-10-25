Vue.component("PriceList", {
    data: function() {
        return {
            drug: {
                code: "",
                endTime: "",
                startTime: "",
                price: "",
            },
            check: false,
            headers: ['Drug code', 'Drug name', 'Quantity', 'Start date of price', 'Price', 'End date of price', 'Change price'],
            drugs: [],
            searchPrice: "",
        }
    },

    template: ` 
<div>
        <div class="main-wrap">
            <div class="main-header-pricelist">
                <h1>Current drugs and their prices</h1>
            </div>
            <div class="wrap-first">
                <div class="search-pricelist">
                    <p id="searchPrice">Search by name: 
                    <input type="text" v-model="searchPrice" placeholder="Search by name"/></p>
                </div>
                
               
                <div class="table1-pricelist-wrap">
                
                    <table id="table1-pricelist" ref="mainTable">
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
                            <td><button v-if="item.drugCode" v-on:click="changePrice(item.drugCode, item.price)">Change price</button></td>
                        </tr>  
                    </tbody>   
                    </table>
                
                </div>
            </div>    
            <div class="wrap-right">
                <h2 id="headline-price">Make a new price for a drug</h2>
                <div class="changePrice">
                    <h4>Drug Code: {{drug.code}}</h4>
                    <h4>Current price: {{drug.price}}</h4>
                    <h4>Enter new price:</h4>
                    <input v-model="drug.price" type="number" min="1" step="10">
                    <h4>Choose start date for price:</h4>
                    <input v-model="drug.startTime" type="date"/>
                    <h4>Choose end date for price:</h4>
                    <input v-model="drug.endTime" type="date"/><br>
                    <button v-on:click="makePrice()">Make price</button>
                    
                </div>
            </div>
        <div class="back-button">
            <button v-on:click="back()" id="back-button">Back</button>
        </div>
        </div>
</div>
`,
    methods: {
        add: function(item, items) {
            for (var i = 0; i < items.length; i++) {
                if (item.drugCode === items[i].drugCode) {
                    items[i].price = this.drug.price
                    return
                }
            }
            items.push(item);
        },
        changePrice: function(drugCode, price) {
            this.drug.code = drugCode
            this.drug.price = price
            this.check = true
        },

        makePrice: function() {
            var id = JSON.parse(localStorage.getItem('user')).id
            var newDP = new Object()
            newDP.price = this.drug.price
            newDP.startPrice = this.drug.startTime
            newDP.endPrice = this.drug.endTime

            if (this.drug.endTime <= this.drug.startTime) {
                swal("Error!", "Date end can't be before or even with date start!", "error");
                return false;
            }
            if (!this.drug.price || !this.drug.startTime || !this.drug.endTime) {
                swal("Error!", "Please input all the values!", "error");
                return false;
            }
            axios
                .put("/drugPharma/makePrice/" + id + "/" + this.drug.code, newDP)
                .then(response => {
                    this.add(response.data, this.drugs)
                })

            swal({
                title: "Success!",
                text: "Price made!",
                type: "success"
            }).then(function() {
                location.reload()
            });
        },
        back: function() {
            this.$router.push("/editDrugsHome")
        },
    },

    computed: {
        result() {
            if (this.searchPrice !== "") {
                //console.log("AA")
                return this.drugs.filter((item) => {
                    return this.searchPrice && this.searchPrice.toLowerCase().split(' ').every(i => item.name.toLowerCase().includes(i))
                })
            } else {
                return this.drugs;
            }
        }
    },
    mounted() {
        var id = JSON.parse(localStorage.getItem('user')).id
        axios
            .get("/drug/getDrugsFromPharmacy/" + id)
            .then(response => {
                console.log(response.data)
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
                swal("Error!", "Try again later", "error");
            })
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
});