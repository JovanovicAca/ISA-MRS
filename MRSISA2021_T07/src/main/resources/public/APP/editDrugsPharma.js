Vue.component("EditDrugsPharma", {
    data: function() {
        return {
            drug: {
                code: "",
                quantity: "",
                price: "",
            },
            deleteCode: "",
            headers: ['Drug code', 'Drug name', 'Instruction', 'Shape', 'Ingredients', 'Contradictions', 'Taking Dose', 'Add'],
            headersPharma: ['Drug code', 'Drug name', 'Instruction', 'Shape', 'Ingredients', 'Contradictions', 'Taking Dose', 'Quantity', 'Delete', 'Change quantity'],
            drugItems: [],
            pharmaDrugs: [],
            searchQuery: "",
            searchQuery2: "",
            quantyit: "",
            checkQuan: false,
        }
    },

    template: ` 
<div>
<div class="headline-main">
            <h1 id="headline">All available drugs</h1>
        </div>
    <div class="wrapEditDrugs">
		
        <div class="search">
            <p id="searchH">Search by name: 
            <input type="text" v-model="searchQuery" placeholder="Search by name"/></p>
        </div>
        <div class="table1-main-drug-wrap">
            <div class="table1-main-drug">     
                <table id="table1allDrugs">
                <thead>
                    <tr>
                        <th v-for="header in headers">
                            {{header}}
                        </th>
                    </tr>
                </thead>
                <tbody>           
                    <tr v-for="item in resultQuery">
                        <td>{{item.drugCode}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.instruction}}</td>
                        <td>{{item.shape}}</td>
                        <td>{{item.ingredients}}</td>
                        <td>{{item.contradiction}}</td>
                        <td>{{item.takingDose}}</td>
                        <td><button v-on:click="addDrug(item.drugCode)">Add</button></td>
                    </tr>  
                </tbody>      
                </table>
            </div>    
        </div>    
            <div class="wrap">
            <div class="div1">
                <div class="adddrug">
                    <h2>Add drug to your pharmacy</h2>
                </div>
                <div class="addcode">
                    <h4>Enter drug code: </h4>
                    <input type="text" v-model="drug.code">       
                    <button v-on:click="addDrug(null)" id="button">Add</button>
                    <br>
                    <br>
                </div>   
            </div>
             
         </div>
         

        <div class="healine-second">
            <h2>Pharmacy drugs</h2>
        </div>

        <div class="search2">
            <p id="searchH2">Search by name: 
            <input type="text" v-model="searchQuery2" placeholder="Search by name"/></p>

           
        </div>
        <div class="newQuan" v-show="checkQuan">
            <p id="changeQuantity">Enter new quantity:
            <input type="text" v-model="quantyit"/>
            <button v-on:click="changeQuantityBase()">Change</button></p>
        </div>
        <div class="table2-main-drug-wrap">
            <div class="table2-main-drug">
                <table id="table2pharmaDrugs">
                <thead>
                    <tr>
                        <th v-for="header in headersPharma">
                            {{header}}
                        </th>
                    </tr>
                </thead>
                <tbody>                   
                    <tr v-for="item in resultQuery2">
                        <td>{{item.drugCode}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.instruction}}</td>
                        <td>{{item.shape}}</td>
                        <td>{{item.ingredients}}</td>
                        <td>{{item.contradiction}}</td>
                        <td>{{item.takingDose}}</td>
                        <td>{{item.quantity}}</td>
                        <td><button v-if="item.drugCode" v-on:click="deleteDrug(item.drugCode)">Delete</button></td>
                        <td><button v-if="item.drugCode" v-on:click="changeQuantity(item.drugCode)">Change</button></td>
                    </tr> 
                </tbody>    
                </table>
                
            </div>     
           
        </div>


        <div class="backedtButton">
            <button type = "submit" v-on:click="back" class="backedtD">Back</button>
        </div>
    </div>      
</div>		  
`,
    methods: {
        add: function(item, items) {
            for (var i = 0; i < items.length; i++) {
                if (item.drugCode === items[i].drugCode) {
                    swal("Error!", "Drug already in pharmacy!", "error");
                    return
                }
            }
            items.push(item);
        },
        changeQuantity: function(drugCode) {
            this.checkQuan = true

            if (drugCode)
                this.drug.code = drugCode

        },
        changeQuantityBase: async function() {
            var bool = false
            var id = JSON.parse(localStorage.getItem('user')).works
            await axios
                .put("/drugPharma/changeQuantity/" + this.drug.code + "/" + id + "/" + this.quantyit)
                .then(response => {

                    swal("Succes!", response.data, "success");
                    bool = true
                }).catch((error) => {
                    swal("Error!", "Error with changing quantity! Try again!", "error");
                })

            if (bool) {
                for (var i = 0; i < this.pharmaDrugs.length; i++) {
                    if (this.drug.code === this.pharmaDrugs[i].drugCode) {
                        this.pharmaDrugs[i].quantity = this.quantyit
                        return
                    }
                }
            }

        },
        addDrug: function(drugCode) {
            if (drugCode)
                this.drug.code = drugCode
            var id = JSON.parse(localStorage.getItem('user')).id
            var bool = false;
            var checkCode = false;
            if (!this.drug.code) {
                swal("Error!", "Please input all the values!", "error");
                return false;
            }
            for (var i = 0; i < this.drugItems.length; i++) {
                if (this.drugItems[i].drugCode === this.drug.code) {
                    checkCode = true;
                }
            }
            if (!checkCode) {
                swal("Error!", "Wrong code!", "error");
                return false;
            }
            checkCode = false;
            axios
                .post("/drugPharma/addNewDrugPharmacy/" + id + "/" + this.drug.code + "/")
                .then(response => {
                    if (this.pharmaDrugs.length === 0) {
                        bool = true;
                    } else {
                        for (var i = 0; i < this.pharmaDrugs.length; i++) {
                            if (this.pharmaDrugs[i].drugCode !== response.data.drugCode) {
                                //console.log(this.pharmaDrugs[i].drugCode);
                                bool = true;

                            }
                        }
                    }
                    if (bool) {
                        var insert = response.data
                        insert.quantity = 0
                            //    insert.price = this.drug.price
                        this.add(insert, this.pharmaDrugs)
                        swal("Succes!", "Drug added", "success");
                    }
                })
        },
        deleteDrug: function(drugCode) {
            var id = JSON.parse(localStorage.getItem('user')).id
            swal({
                    title: "Are you sure?",
                    //text: "Password will be changed on next login!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {

                        axios
                            .delete("drugPharma/deleteDrug/" + drugCode + "/" + id)
                            .then(response => {
                                if (response.data === "Drug deleted!") {
                                    for (var i = 0; i < this.pharmaDrugs.length; i++) {
                                        if (this.pharmaDrugs[i].drugCode === drugCode) {
                                            this.pharmaDrugs.splice(i, 1);
                                        }
                                    }
                                }

                                swal("Succes!", "Drug deleted", "success");
                            })
                            .catch((error) => {
                                swal("Error!", error.response.data, "error");
                            })

                    } else {

                        swal("Drug not deleted!");
                    }
                });

        },
        back: function() {
            this.$router.push("/editDrugsHome")
        },

    },

    computed: {
        resultQuery() {
            if (this.searchQuery !== "") {
                return this.drugItems.filter((item) => {
                    return this.searchQuery && this.searchQuery.toLowerCase().split(' ').every(i => item.name.toLowerCase().includes(i))
                })
            } else {
                return this.drugItems;
            }
        },
        resultQuery2() {
            if (this.searchQuery2 !== "") {
                return this.pharmaDrugs.filter((item) => {
                    return this.searchQuery2 && this.searchQuery2.toLowerCase().split(' ').every(i => item.name.toLowerCase().includes(i))
                })
            } else {
                return this.pharmaDrugs;
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
                this.drugItems = response.data;
            })

    },
    mounted() {
        var id = JSON.parse(localStorage.getItem('user')).id
        axios
            .get("/drug/getDrugsFromPharmacy/" + id)
            .then(response => {
                //console.log(response.data)
                response.data.forEach(element => {
                    //console.log(element)
                    for (var i = 0; i < this.drugItems.length; i++) {
                        //console.log(this.drugItems[i].drugCode + "  AAAAAAAA  " + element.drugCode)
                        if (this.drugItems[i].drugCode == element.drugCode) {
                            var insert = new Object();
                            //console.log(element.drug.drugCode + element.amount)
                            insert.drugCode = this.drugItems[i].drugCode
                            insert.name = this.drugItems[i].name
                            insert.instruction = this.drugItems[i].instruction
                            insert.shape = this.drugItems[i].shape
                            insert.ingredients = this.drugItems[i].ingredients
                            insert.contradiction = this.drugItems[i].contradiction
                            insert.takingDose = this.drugItems[i].takingDose
                            insert.quantity = element.amount
                            insert.price = this.drugItems[i].price
                            this.add(insert, this.pharmaDrugs)
                        }
                    }
                });
            })
            .catch(error => {
                swal("Error!", "Wrong data", "error");
            })
    }
});